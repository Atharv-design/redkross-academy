import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('--- RUNNING TEST: MODULE PROGRESSION & EXAM UNLOCKING ---');

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
  const db = mockEngine.getDb();
  const course = (db.courses || []).find((c) => c.id === 'crs_cyber_intro_01') || (db.courses || [])[0];
  assert(Boolean(course), 'Found primary course');

  // Create isolated test student
  const testUserId = `usr_test_${Date.now()}`;
  const testCadet = {
    id: testUserId,
    email: `cadet_unlock_${Date.now()}@redkross.org.in`,
    full_name: 'Progression Test Cadet',
    role: 'student'
  };
  db.users.push(testCadet);
  mockEngine.saveDb(db);

  const enrolment = mockEngine.enrolStudent(testCadet.id, course.id);
  assert(Boolean(enrolment), `Enrolled test cadet: ${enrolment.id}`);

  // Test 1: Module 1 is unlocked initially, Module 2 is locked initially
  const mod1UnlockedInitial = mockEngine.isModuleUnlocked(enrolment.id, course.id, 0);
  const mod2UnlockedInitial = mockEngine.isModuleUnlocked(enrolment.id, course.id, 1);
  assert(mod1UnlockedInitial === true, 'Module 1 is unlocked initially');
  assert(mod2UnlockedInitial === false, 'Module 2 is locked initially before passing Module 1 quiz');

  // Test 2: Pass Module 1 quiz (score >= 80%)
  const mod1Quiz = course.modules[0].quiz;
  assert(Boolean(mod1Quiz), `Module 1 has quiz: ${mod1Quiz?.id}`);

  const attemptResult = mockEngine.recordQuizAttemptSubmission({
    enrolmentId: enrolment.id,
    quizId: mod1Quiz.id,
    scorePercentage: 90,
    isPassed: true
  });

  assert(attemptResult.isPassed === true, 'Quiz attempt recorded as passed');

  // Verify that all lessons in Module 1 were automatically marked complete
  const enrAfterPass = mockEngine.getEnrolment(enrolment.id);
  const mod1Lessons = course.modules[0].lessons || [];
  const allMod1LessonsComplete = mod1Lessons.every((l) =>
    enrAfterPass.completed_mandatory_lessons?.includes(l.id)
  );
  assert(allMod1LessonsComplete, 'All Module 1 lessons auto-completed on quiz pass');

  // Verify Module 2 is now unlocked!
  const mod2UnlockedAfterPass = mockEngine.isModuleUnlocked(enrolment.id, course.id, 1);
  assert(mod2UnlockedAfterPass === true, 'Module 2 is immediately unlocked after passing Module 1 quiz');

  // Test 3: Pass quizzes for modules 2 through 12
  for (let i = 1; i < course.modules.length; i++) {
    const mod = course.modules[i];
    if (mod.quiz) {
      mockEngine.recordQuizAttemptSubmission({
        enrolmentId: enrolment.id,
        quizId: mod.quiz.id,
        scorePercentage: 95,
        isPassed: true
      });
    }
  }

  // Verify all modules are now unlocked
  let allModulesUnlocked = true;
  for (let i = 0; i < course.modules.length; i++) {
    if (!mockEngine.isModuleUnlocked(enrolment.id, course.id, i)) {
      allModulesUnlocked = false;
      break;
    }
  }
  assert(allModulesUnlocked, 'All 12 modules unlocked after passing their respective quizzes');

  // Verify all lessons across the course are completed
  const enrAfterAll = mockEngine.getEnrolment(enrolment.id);
  const allCourseLessonsComplete = course.modules.every((mod) =>
    (mod.lessons || []).every((l) => enrAfterAll.completed_mandatory_lessons?.includes(l.id))
  );
  assert(allCourseLessonsComplete, 'All lessons across all 12 modules marked complete');

  // Final Assessment Lock check
  const isFinalLocked = mockEngine.isExamLocked(enrolment.id, course.final_assessment.id).isLocked;
  assert(!isFinalLocked, 'Final assessment is ready and not locked out');

  console.log(`\n--- TEST RUN SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ---`);
  if (failedTests > 0) process.exit(1);
} catch (e) {
  console.error('Test execution exception:', e);
  process.exit(1);
}
