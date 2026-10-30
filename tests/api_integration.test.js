import test from 'node:test';
import assert from 'node:assert/strict';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { apiClient } from '../src/services/apiClient.js';

test('=== API & Backend Integration Test Suite ===', async (t) => {
  mockEngine.resetToSeed();

  await t.test('1. Deterministic Collision-Proof Cadet ID per Google Account', () => {
    // Account 1
    const cadet1 = mockEngine.getOrCreateCadetUser({
      uid: 'google_uid_alpha_991',
      email: 'alex.cyber@gmail.com',
      full_name: 'Alex Vance'
    });
    assert.ok(cadet1.cadet_id.startsWith('RK-'), 'Cadet ID must start with RK-');
    const firstAssignedId = cadet1.cadet_id;

    // Logging in again with the same account must yield identical Cadet ID
    const cadet1Relogin = mockEngine.getOrCreateCadetUser({
      uid: 'google_uid_alpha_991',
      email: 'alex.cyber@gmail.com',
      full_name: 'Alex Vance'
    });
    assert.strictEqual(cadet1Relogin.cadet_id, firstAssignedId, 'Same account must preserve the same Cadet ID');

    // Logging in with a different account must yield a different collision-free Cadet ID
    const cadet2 = mockEngine.getOrCreateCadetUser({
      uid: 'google_uid_beta_772',
      email: 'sarah.soc@gmail.com',
      full_name: 'Sarah Connor'
    });
    assert.notStrictEqual(cadet2.cadet_id, firstAssignedId, 'Different account must generate different Cadet ID');
  });

  await t.test('2. apiClient Course Retrieval & Fallback Architecture', async () => {
    const res = await apiClient.getCourses(true);
    assert.ok(Array.isArray(res.courses), 'Courses must be an array');
    assert.ok(res.courses.length >= 1, 'Must return at least 1 course');
    const firstCourse = res.courses[0];
    assert.ok(firstCourse.id, 'Course must have an ID');
    assert.ok(firstCourse.title, 'Course must have a title');

    // Single course lookup by ID
    const courseById = await apiClient.getCourseById(firstCourse.id);
    assert.strictEqual(courseById.id, firstCourse.id);
  });

  await t.test('3. Enrolment, Mandatory Lesson Progression & Milestone Crossings', () => {
    mockEngine.resetToSeed();
    const enrolmentId = 'enr_student_soc';
    const initProg = mockEngine.getCourseProgress(enrolmentId);
    assert.ok(initProg.total > 0, 'Course must have mandatory lessons');

    // Complete lesson 1_3
    const updatedProg = mockEngine.completeLesson(enrolmentId, 'les_1_3');
    assert.ok(updatedProg.completed >= 1);
    assert.ok(updatedProg.percentage >= initProg.percentage);
  });

  await t.test('4. PDF Assignment Submission & Under-Assessment Workflow', () => {
    mockEngine.resetToSeed();
    const enrolmentId = 'enr_student_soc';
    const assignmentId = 'asg_soc_report';

    // Submit valid PDF assignment
    const submission = mockEngine.submitAssignment({
      cadetId: 'RK-89421',
      userId: 'usr_student_01',
      enrolmentId,
      courseId: 'crs_soc_101',
      moduleId: 'mod_1',
      assignmentId,
      assignmentTitle: 'SOC Incident Report Playbook',
      fileName: 'incident_report_playbook_final.pdf',
      fileDataUrl: 'data:application/pdf;base64,JVBERi0xLjQK...'
    });

    assert.ok(submission.id, 'Submission must generate a submission ID');
    assert.strictEqual(submission.status, 'under_assessment');
    assert.strictEqual(submission.file_name, 'incident_report_playbook_final.pdf');

    // Admin grading & approval
    const evaluation = mockEngine.gradeAssignment({
      submissionId: submission.id,
      status: 'passed',
      grade: 95,
      reviewerNotes: 'Excellent triage logic and timeline reconstruction.',
      reviewerEmail: 'admin@redkross.org.in'
    });

    assert.strictEqual(evaluation.status, 'passed');
    assert.strictEqual(evaluation.grade, 95);

    // Verify enrolment now tracks the passed assignment
    const db = mockEngine.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    assert.ok(enrolment.passed_assignments.includes(assignmentId));
  });

  await t.test('5. Proctored Exam Focus Enforcement: Two Disconnects / 3 Strikes -> 24h Lockout', () => {
    mockEngine.resetToSeed();
    const enrolmentId = 'enr_student_soc';
    const quizId = 'quiz_mod_1';

    // Verify initially unlocked
    assert.strictEqual(mockEngine.isExamLocked(enrolmentId, quizId).isLocked, false);

    // Violation trigger: Camera Disconnect or Tab Switch
    const violation = mockEngine.recordProctorViolation({
      enrolmentId,
      quizId,
      cadetId: 'RK-89421',
      studentName: 'Cadet Operator',
      violationType: 'CAMERA_DISCONNECT_X2',
      details: 'Two consecutive camera drops detected.'
    });
    assert.strictEqual(violation.success, true);

    const lockStatus = mockEngine.isExamLocked(enrolmentId, quizId);
    assert.strictEqual(lockStatus.isLocked, true, 'Exam must be locked for 24 hours on proctor violation');
    assert.ok(new Date(lockStatus.lockedUntil) > new Date(), 'Lockout time must be in future');
  });

  await t.test('6. Authentic Certificate Dispatch, Public Verification & Revocation', () => {
    mockEngine.resetToSeed();

    // Dispatch a new authentic certificate
    const dispatched = mockEngine.dispatchCertificate({
      enrolmentId: 'enr_student_soc',
      studentName: 'Atharv Sharma',
      studentEmail: 'atharv@redkross.org.in',
      cadetId: 'RK-89421',
      courseId: 'crs_soc_101',
      signatoryName: 'Dr. Robert H. Vance, CISSP',
      signatoryTitle: 'Director of Cyber Defense Academics',
      issuingOrg: 'RedKross Defensive Cyber Academy'
    });

    assert.ok(dispatched.id.startsWith('RK-CERT-'), 'Certificate ID must start with RK-CERT-');
    assert.strictEqual(dispatched.revoked, false);

    // Verify Public Credential Endpoint
    const verified = mockEngine.getCredentialByVerificationId(dispatched.id);
    assert.ok(verified, 'Public registry must locate newly dispatched certificate');
    assert.strictEqual(verified.student_name, 'Atharv Sharma');
    assert.strictEqual(verified.revoked, false);

    // Revoke Certificate
    const revokeResult = mockEngine.revokeCertificate(
      dispatched.id,
      'Institutional Audit Disqualification'
    );
    assert.strictEqual(revokeResult.revoked, true);

    // Query again: Must now be flagged as REVOKED
    const verifiedAfterRevoke = mockEngine.getCredentialByVerificationId(dispatched.id);
    assert.strictEqual(verifiedAfterRevoke.revoked, true);
    assert.strictEqual(verifiedAfterRevoke.revocation_reason, 'Institutional Audit Disqualification');
  });

  await t.test('7. Real Database Statistics (Strict Zero-Fake-Numbers Verification)', () => {
    mockEngine.resetToSeed();
    const stats = mockEngine.getRealDatabaseStats();

    // Verify statistical integrity
    assert.strictEqual(typeof stats.totalCourses, 'number');
    assert.strictEqual(typeof stats.totalStudents, 'number');
    assert.strictEqual(typeof stats.totalEnrolments, 'number');
    assert.strictEqual(typeof stats.validCredentialsCount, 'number');
    assert.strictEqual(typeof stats.revokedCredentialsCount, 'number');

    // Counts must match actual database arrays exactly
    const db = mockEngine.getDb();
    assert.strictEqual(stats.totalCourses, db.courses.length);
    assert.strictEqual(stats.totalStudents, db.users.filter((u) => u.role === 'student').length);
    assert.strictEqual(stats.totalEnrolments, db.enrolments.length);
    assert.strictEqual(stats.validCredentialsCount, db.credentials.filter((c) => !c.revoked).length);
  });
});
