import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('--- STARTING COMPREHENSIVE UNIT TESTING FOR STUDENT FEATURES ---');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failedTests++;
  }
}

try {
  // Test 1: Course Normalization & Active Courses in Cybersecurity Division
  const courses = mockEngine.getCourses();
  const cyberCourses = courses.filter(c => (c.division || 'cybersecurity') === 'cybersecurity');
  assert(cyberCourses.length >= 2, `Cybersecurity division contains at least 2 courses: found ${cyberCourses.length}`);
  assert(cyberCourses.some(c => c.id === 'crs_cyber_intro_01'), `Catalog course has Introduction to Cybersecurity (crs_cyber_intro_01)`);
  assert(cyberCourses.some(c => c.id === 'crs_cyber_net_02'), `Catalog course has Computer Networking for Cybersecurity (crs_cyber_net_02)`);
  const c1 = cyberCourses.find(c => c.id === 'crs_cyber_intro_01');
  assert(c1.modules.length === 6, `Course 01 has 6 comprehensive modules`);

  // Test 2: Enrolment initialization
  const db = mockEngine.getDb();
  let testUser = db.users.find(u => u.role === 'student');
  if (!testUser) {
    testUser = mockEngine.createUser({ email: 'cadet_test@redkross.org.in', full_name: 'Test Cadet' });
  }
  let enrolment = (db.enrolments || []).find(e => e.user_id === testUser.id && e.course_id === 'crs_cyber_intro_01');
  if (!enrolment) {
    enrolment = mockEngine.enrolStudent(testUser.id, 'crs_cyber_intro_01');
  }
  assert(Boolean(enrolment), `Cadet enrolment is active: ${enrolment?.id}`);

  // Test 3: Mark Lesson Complete works and updates completed_mandatory_lessons
  const initialCompletedCount = (enrolment.completed_mandatory_lessons || []).length;
  const targetLessonId = 'les_m1_l1';
  
  mockEngine.recordLessonCompletion(enrolment.id, targetLessonId);
  const updatedEnrolment = mockEngine.getEnrolment(enrolment.id);
  assert(
    updatedEnrolment.completed_mandatory_lessons.includes(targetLessonId),
    `recordLessonCompletion marks lesson '${targetLessonId}' complete`
  );
  assert(
    updatedEnrolment.last_visited_unit_id === targetLessonId,
    `completeLesson saves last_visited_unit_id automatically`
  );

  // Test 4: Save and restore reading progress midway
  const readingLessonId = 'les_m2_l3';
  mockEngine.saveLastVisitedUnit(enrolment.id, readingLessonId);
  const enrAfterReading = mockEngine.getEnrolment(enrolment.id);
  assert(
    enrAfterReading.last_visited_unit_id === readingLessonId,
    `saveLastVisitedUnit updates last_visited_unit_id to '${readingLessonId}' persistently`
  );

  // Test 5: Mid-Exam Abandonment and Attempt Decrementing
  const testQuizId = 'q_m1';
  // Ensure clean retry window state for test
  if (db.quiz_retry_windows) {
    delete db.quiz_retry_windows[`${enrolment.id}_${testQuizId}`];
    mockEngine.saveDb(db);
  }

  // Initial status should be 3 attempts
  let attemptStatus = mockEngine.getQuizAttemptStatus(enrolment.id, testQuizId);
  assert(attemptStatus.attemptsRemaining === 3, `Initial attempts remaining is 3`);

  // First abandonment -> drops from 3 to 2
  let forfeit1 = mockEngine.forfeitQuizAttempt({ enrolmentId: enrolment.id, quizId: testQuizId, reason: 'ABANDONED_TEST_1' });
  assert(forfeit1.attemptsRemaining === 2, `After 1st mid-exam abandonment, attempts remaining is 2 (found ${forfeit1.attemptsRemaining})`);
  assert(!forfeit1.isLocked, `Exam is not locked after 1st abandonment`);

  // Second abandonment -> drops from 2 to 1
  let forfeit2 = mockEngine.forfeitQuizAttempt({ enrolmentId: enrolment.id, quizId: testQuizId, reason: 'ABANDONED_TEST_2' });
  assert(forfeit2.attemptsRemaining === 1, `After 2nd mid-exam abandonment, attempts remaining is 1 (found ${forfeit2.attemptsRemaining})`);
  assert(!forfeit2.isLocked, `Exam is not locked after 2nd abandonment`);

  // Third abandonment -> drops to 0 and ENFORCES 24-HOUR LOCKOUT!
  let forfeit3 = mockEngine.forfeitQuizAttempt({ enrolmentId: enrolment.id, quizId: testQuizId, reason: 'ABANDONED_TEST_3' });
  assert(forfeit3.attemptsRemaining === 0, `After 3rd mid-exam abandonment, attempts remaining is 0 (found ${forfeit3.attemptsRemaining})`);
  assert(forfeit3.isLocked === true, `24-Hour Lockout is activated immediately upon exhausting 3 attempts`);
  
  const lockCheck = mockEngine.isExamLocked(enrolment.id, testQuizId);
  assert(lockCheck.isLocked === true, `isExamLocked confirms active 24-hour lockout`);
  assert(lockCheck.remainingHours >= 23, `Lockout remaining hours is 23h-24h (found ${lockCheck.remainingHours}h)`);

  console.log(`\n--- TEST RUN SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ---`);
  if (failedTests > 0) {
    process.exit(1);
  }
} catch (err) {
  console.error('Fatal test error:', err);
  process.exit(1);
}
