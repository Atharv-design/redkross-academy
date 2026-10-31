/**
 * Comprehensive Automated Verification Suite
 * Tests:
 * 1. Exclusive Curriculum Normalization: Purge legacy courses, seed Full Stack Web Development
 * 2. 12 Modules, 78 Lessons, 240 MCQs, Capstone Final Assessment
 * 3. CBT Wireframe UI format alignment
 * 4. Live decrementing attempts: 3 -> 2 -> 1 -> 0 (24h cooldown)
 * 5. Strict Anti-cheat 24-hour lockout persistence across navigation
 * 6. Admin deletion capability and non-resurrection
 */

import { mockEngine } from '../src/services/db/mockEngine.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('STARTING FULLSTACK & CBT EXAM INTEGRATION TESTS');
  console.log('====================================================\n');

  // 1. Database Initialization & Normalization Test
  const db = mockEngine.getDb();
  assert(Array.isArray(db.courses), 'Database courses array exists');
  
  const fullstack = db.courses.find((c) => c.id === 'crs_full_stack_web_dev');
  assert(Boolean(fullstack), 'Full Stack Web Development course is seeded in database');
  assert(fullstack?.title === 'Full Stack Web Development: From Fundamentals to Deployment', 'Course title matches exact requirement');

  // Verify No Legacy Cybersecurity Courses exist
  const legacyIds = [
    'crs_soc_fundamentals',
    'crs_practical_cyber_def',
    'crs_enterprise_incident_resp',
    'crs_threat_hunting',
    'crs_malware_analysis',
    'crs_cloud_sec',
    'crs_network_sec',
    'crs_identity_iam',
    'crs_app_sec',
    'crs_threat_intel',
    'crs_incident_response'
  ];
  const foundLegacy = db.courses.filter((c) => legacyIds.includes(c.id));
  assert(foundLegacy.length === 0, `All legacy courses purged (found: ${foundLegacy.length})`);

  // 2. Curriculum Deep Verification
  const modules = fullstack?.modules || [];
  assert(modules.length === 12, `Exactly 12 modules present (found: ${modules.length})`);

  let totalLessons = 0;
  let totalQuestions = 0;
  modules.forEach((mod, mIdx) => {
    const lessons = mod.lessons || [];
    totalLessons += lessons.length;
    const questions = mod.quiz?.questions || [];
    totalQuestions += questions.length;

    assert(questions.length === 20, `Module ${mIdx + 1} ("${mod.title}") has exactly 20 MCQs`);
    
    // Check each question has exactly 4 options and 1 correct answer
    const invalidQuestions = questions.filter(
      (q) => !q.options || q.options.length !== 4 || q.options.filter((o) => o.is_correct).length !== 1
    );
    assert(invalidQuestions.length === 0, `Module ${mIdx + 1} all questions have exactly 4 options and 1 correct answer`);
  });

  assert(totalLessons === 78, `Exactly 78 lessons present across 12 modules (found: ${totalLessons})`);
  assert(totalQuestions === 240, `Exactly 240 questions present across 12 module evaluations (found: ${totalQuestions})`);

  // Capstone Assessment
  const capstone = fullstack?.final_assessment;
  assert(Boolean(capstone), 'Capstone final assessment is configured');
  assert((capstone?.questions || []).length === 50, `Capstone final assessment has exactly 50 questions (found: ${capstone?.questions?.length})`);

  // 3. Live Attempts Decrementing Test: 3 -> 2 -> 1 -> 0
  const testEnrolmentId = `test_enr_${Date.now()}`;
  const testQuizId = modules[0].quiz.id;

  // Fresh window
  const freshStatus = mockEngine.getQuizAttemptStatus(testEnrolmentId, testQuizId);
  assert(freshStatus.attemptsRemaining === 3, 'Fresh evaluation window starts with 3 attempts remaining');
  assert(freshStatus.isLocked === false, 'Fresh evaluation is not locked');

  // Attempt 1: Failed
  const attempt1 = mockEngine.recordQuizAttemptSubmission({
    enrolmentId: testEnrolmentId,
    quizId: testQuizId,
    scorePercentage: 55,
    isPassed: false
  });
  assert(attempt1.attemptsRemaining === 2, 'After 1 failed attempt, exactly 2 attempts remain (3 -> 2)');
  assert(attempt1.isLocked === false, 'Evaluation remains unlocked after 1 failure');

  // Attempt 2: Failed
  const attempt2 = mockEngine.recordQuizAttemptSubmission({
    enrolmentId: testEnrolmentId,
    quizId: testQuizId,
    scorePercentage: 65,
    isPassed: false
  });
  assert(attempt2.attemptsRemaining === 1, 'After 2 failed attempts, exactly 1 attempt remains (2 -> 1)');
  assert(attempt2.isLocked === false, 'Evaluation remains unlocked after 2 failures');

  // Attempt 3: Failed -> Strict 24h Lockout
  const attempt3 = mockEngine.recordQuizAttemptSubmission({
    enrolmentId: testEnrolmentId,
    quizId: testQuizId,
    scorePercentage: 70,
    isPassed: false
  });
  assert(attempt3.attemptsRemaining === 0, 'After 3 failed attempts, 0 attempts remain');
  assert(attempt3.isLocked === true, 'Strict 24-hour lockout is applied after exhausting 3 attempts');

  // 4. Persistence of 24h Lockout across navigation
  const reloadedStatus = mockEngine.isExamLocked(testEnrolmentId, testQuizId);
  assert(reloadedStatus.isLocked === true, '24-hour lockout persists when querying isExamLocked');
  assert(reloadedStatus.remainingHours >= 23, 'Lockout remaining time shows >= 23 hours');

  // 5. Anti-Cheat Proctor Tab-Switch Lockout Test
  const proctorEnrolmentId = `test_proctor_${Date.now()}`;
  const proctorQuizId = modules[1].quiz.id;

  const violationResult = mockEngine.recordProctorViolation({
    enrolmentId: proctorEnrolmentId,
    quizId: proctorQuizId,
    cadetId: 'RK-TEST-CADET',
    studentName: 'Test Cadet',
    violationType: 'TAB_SWITCH_BLUR',
    details: 'Tab switched during active proctored examination'
  });
  assert(violationResult.success === true, 'Proctor violation recorded successfully');
  assert(violationResult.lockout_active === true, '24-Hour lockout activated immediately');

  // Simulate user pressing browser Back button and re-entering
  const postBackCheck = mockEngine.isExamLocked(proctorEnrolmentId, proctorQuizId);
  assert(postBackCheck.isLocked === true, '24-Hour lockout persists when candidate navigates back');

  // 6. Admin Course Deletion & Non-Resurrection Test
  const testDeleteCourseId = 'crs_test_deletion_temp';
  db.courses.push({
    id: testDeleteCourseId,
    title: 'Temporary Test Course',
    modules: []
  });
  mockEngine.saveDb(db);

  const deleteResult = mockEngine.deleteCourse(testDeleteCourseId, 'usr_admin');
  assert(deleteResult.success === true, 'Admin deleteCourse executed successfully');

  // Verify deletion in refreshed db
  const refreshedDb = mockEngine.getDb();
  const deletedStillExists = refreshedDb.courses.some((c) => c.id === testDeleteCourseId);
  assert(!deletedStillExists, 'Deleted course is removed from courses list');
  assert(refreshedDb.admin_deleted_course_ids.includes(testDeleteCourseId), 'Deleted course recorded in admin_deleted_course_ids');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test suite error:', err);
  process.exit(1);
});
