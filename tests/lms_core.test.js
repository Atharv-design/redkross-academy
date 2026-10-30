import test from 'node:test';
import assert from 'node:assert/strict';
import { mockEngine, generateDeterministicCadetId } from '../src/services/db/mockEngine.js';

test('1. Permanent State Persistence: Deleting all courses persists without re-seeding', () => {
  // Reset to seed first
  mockEngine.resetToSeed();
  const initialCourses = mockEngine.getCourses();
  assert.ok(initialCourses.length > 0, 'Database should initially have seeded courses');

  // Admin deletes all courses
  const db = mockEngine.getDb();
  db.courses = [];
  mockEngine.saveDb(db);

  // Reload database
  const reloadedDb = mockEngine.getDb();
  assert.strictEqual(reloadedDb.courses.length, 0, 'Courses must remain empty array (no automatic reseeding)');
  assert.strictEqual(mockEngine.getCourses().length, 0, 'getCourses() must reflect 0 courses after deletion');
});

test('2. Deterministic Cadet ID: Consistent for same account & unique across accounts', () => {
  const email1 = 'cadet.alpha@redkross.org.in';
  const uid1 = 'google_uid_alpha_123';

  // Test deterministic reproducibility
  const id1 = generateDeterministicCadetId(email1, uid1, []);
  const id1Duplicate = generateDeterministicCadetId(email1, uid1, []);
  assert.strictEqual(id1, id1Duplicate, 'Same user credentials must ALWAYS produce the exact same Cadet ID');
  assert.match(id1, /^RK-\d{5}$/, 'Cadet ID must match format RK-XXXXX');

  // Test uniqueness for a second cadet
  const email2 = 'cadet.beta@redkross.org.in';
  const uid2 = 'google_uid_beta_456';
  const existingUsers = [{ email: email1, id: uid1, cadet_id: id1 }];
  const id2 = generateDeterministicCadetId(email2, uid2, existingUsers);

  assert.notStrictEqual(id1, id2, 'Different user must produce a distinct Cadet ID');
  assert.match(id2, /^RK-\d{5}$/, 'Second Cadet ID must also match format RK-XXXXX');
});

test('3. Strict Proctoring Engine: Camera Disconnect & Tab Switch 24-Hour Lockout', () => {
  mockEngine.resetToSeed();
  const testEnrolmentId = 'enr_student_soc';
  const testQuizId = 'quiz_mod_1';

  // 1. Initial State: Exam is not locked
  let lockStatus = mockEngine.isExamLocked(testEnrolmentId, testQuizId);
  assert.strictEqual(lockStatus.isLocked, false, 'Exam should not be locked initially');

  // 2. Tab Switch Violation triggers immediate 24-hour lockout
  const tabViolation = mockEngine.recordProctorViolation({
    enrolmentId: testEnrolmentId,
    quizId: testQuizId,
    cadetId: 'RK-89421',
    studentName: 'Test Cadet',
    violationType: 'TAB_SWITCH_BLUR',
    details: 'User switched browser window during timed exam.'
  });

  assert.strictEqual(tabViolation.success, true, 'Violation must record successfully');
  assert.ok(tabViolation.lockedUntil, 'Lockout expiration timestamp must be returned');

  // 3. Verify Exam is now locked for 24 hours
  lockStatus = mockEngine.isExamLocked(testEnrolmentId, testQuizId);
  assert.strictEqual(lockStatus.isLocked, true, 'Exam must be locked after tab switch violation');
  assert.ok(lockStatus.remainingHours >= 23, 'Remaining hours must be ~24 hours');

  // 4. Verify lockout blocks exam attempt launch
  assert.throws(
    () => {
      mockEngine.startQuizAttempt(testEnrolmentId, testQuizId);
    },
    /COOLDOWN_ACTIVE/,
    'Attempting to start locked exam must throw COOLDOWN_ACTIVE error'
  );
});

test('4. PDF Assignment Submission & Assessment Pipeline', () => {
  mockEngine.resetToSeed();
  const testEnrolmentId = 'enr_student_soc';
  const testModuleId = 'mod_01';
  const testAssignmentId = 'asg_soc_analysis';

  // 1. Student submits PDF assignment
  const submission = mockEngine.submitAssignment({
    cadetId: 'RK-89421',
    userId: 'usr_student_01',
    enrolmentId: testEnrolmentId,
    courseId: 'crs_soc_fundamentals',
    moduleId: testModuleId,
    assignmentId: testAssignmentId,
    assignmentTitle: 'SOC Incident Report',
    fileName: 'triage_report.pdf',
    fileDataUrl: 'data:application/pdf;base64,JVBERi0xLjQK...'
  });

  assert.strictEqual(submission.status, 'under_assessment', 'Initial status must be "under_assessment"');
  assert.strictEqual(submission.file_name, 'triage_report.pdf');

  // 2. Admin retrieves queue and grades the assignment
  const pendingQueue = mockEngine.getAssignmentSubmissions({ status: 'under_assessment' });
  const found = pendingQueue.find((s) => s.id === submission.id);
  assert.ok(found, 'Submitted assignment must appear in pending evaluation queue');

  // 3. Admin passes assignment with 95% score
  const graded = mockEngine.gradeAssignment({
    submissionId: submission.id,
    status: 'passed',
    grade: 95,
    reviewerNotes: 'Exemplary log triage analysis and IoC extraction.',
    reviewerEmail: 'director@redkross.org.in'
  });

  assert.strictEqual(graded.status, 'passed');
  assert.strictEqual(graded.grade, 95);

  // 4. Verify assignment added to enrolment passed_assignments
  const enrolment = mockEngine.getEnrolment(testEnrolmentId);
  assert.ok(enrolment.passed_assignments.includes(testAssignmentId), 'Passed assignment must be registered in enrolment');
});

test('5. Complete Certification Lifecycle: Request, Review, Dispatch, Verify & Revocation', () => {
  mockEngine.resetToSeed();
  const testEnrolmentId = 'enr_student_soc';
  const db = mockEngine.getDb();
  const enrolment = db.enrolments.find((e) => e.id === testEnrolmentId);

  // Ensure course completion prerequisites are met
  const course = db.courses.find((c) => c.id === enrolment.course_id);
  const mandatoryLessons = [];
  const requiredQuizzes = [];
  (course.modules || []).forEach((m) => {
    (m.lessons || []).forEach((l) => {
      if (l.is_mandatory) mandatoryLessons.push(l.id);
    });
    if (m.quiz) requiredQuizzes.push(m.quiz.id);
    else if (m.quiz_id) requiredQuizzes.push(m.quiz_id);
  });
  enrolment.completed_mandatory_lessons = mandatoryLessons;
  enrolment.passed_quizzes = requiredQuizzes;
  enrolment.passed_assignments = [];
  mockEngine.saveDb(db);

  // 1. Completion check
  const completion = mockEngine.checkCourseCompletion(testEnrolmentId);
  assert.strictEqual(completion.isComplete, true, 'Course prerequisites must evaluate to complete');

  // 2. Student requests certificate
  const certRequest = mockEngine.requestCertificate(testEnrolmentId, 'Ready for final credentials');
  assert.strictEqual(certRequest.status, 'pending_review');
  assert.strictEqual(certRequest.cadet_id, 'RK-89421');

  // 3. Admin reviews and dispatches official certificate
  const credential = mockEngine.dispatchCertificate({
    enrolmentId: testEnrolmentId,
    studentName: 'Atharv Sharma',
    studentEmail: 'student@redkross.org.in',
    courseId: enrolment.course_id,
    cadetId: 'RK-89421',
    signatoryName: 'Dr. Robert H. Vance, CISSP',
    signatoryTitle: 'Director of Cyber Defense Academics',
    issuingOrg: 'RedKross Defensive Cyber Academy'
  });

  assert.match(credential.id, /^RK-CERT-\d{5}$/, 'Credential ID must follow official format RK-CERT-XXXXX');
  assert.strictEqual(credential.revoked, false, 'Newly issued credential must not be revoked');

  // 4. Verify public lookup returns active credential
  const foundCred = mockEngine.getCredentialByVerificationId(credential.id);
  assert.ok(foundCred, 'Dispatched certificate must be publicly verifiable');
  assert.strictEqual(foundCred.student_name, 'Atharv Sharma');

  // 5. Admin revokes certificate for academic audit
  const revoked = mockEngine.revokeCertificate(credential.id, 'Academic Integrity Audit');
  assert.strictEqual(revoked.revoked, true, 'Credential must be marked as revoked');
  assert.strictEqual(revoked.revocation_reason, 'Academic Integrity Audit');
  assert.ok(revoked.revoked_at, 'Revocation timestamp must be recorded');
});

test('6. Real-Time Telemetry & Statistics (No Fake Numbers)', () => {
  mockEngine.resetToSeed();
  const stats = mockEngine.getRealDatabaseStats();

  assert.ok(typeof stats.totalStudents === 'number', 'totalStudents must be a real computed number');
  assert.ok(typeof stats.totalCourses === 'number', 'totalCourses must be a real computed number');
  assert.ok(typeof stats.validCredentialsCount === 'number', 'validCredentialsCount must be real');
  assert.ok(typeof stats.pendingAssignmentsCount === 'number', 'pendingAssignmentsCount must be real');
  assert.ok(typeof stats.pendingCertificatesCount === 'number', 'pendingCertificatesCount must be real');
  assert.ok(stats.totalStudents >= 1, 'Should have registered students');
  assert.ok(stats.totalCourses >= 1, 'Should have real curriculum courses');
});
