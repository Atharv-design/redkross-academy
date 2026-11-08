import assert from 'node:assert';
import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('--- RUNNING TEST: STRICT LINEAR CURRICULUM PROGRESSION FLOW ---');

const db = mockEngine.getDb();
const course = db.courses.find((c) => c.id === 'crs_cyber_intro_01');
assert.ok(course, 'Primary course must exist');

// Create a fresh test student
const testUserId = `usr_cadet_linear_${Date.now()}`;
const testCadet = {
  id: testUserId,
  email: `cadet_linear_${Date.now()}@redkross.edu`,
  full_name: 'Linear Flow Cadet',
  role: 'student'
};
db.users.push(testCadet);
mockEngine.saveDb(db);

const enrolment = mockEngine.enrolStudent(testCadet.id, course.id);
assert.ok(enrolment, 'Student must be enrolled successfully');

// Helper to simulate the exact player unlock check
function isModUnlocked(enr, modIndex) {
  if (modIndex === 0) return true;
  const completedLessons = enr?.completed_mandatory_lessons || [];
  const passedQuizzes = enr?.passed_quizzes || [];
  for (let i = 0; i < modIndex; i++) {
    const prevMod = course?.modules?.[i];
    if (!prevMod) continue;
    const prevLessons = prevMod.lessons || [];
    const allLessonsDone = prevLessons.length === 0 || prevLessons.every((l) => completedLessons.includes(l.id));
    const prevQuizDone = prevMod.quiz ? passedQuizzes.includes(prevMod.quiz.id) : true;
    const prevModCleared = prevMod.quiz ? (prevQuizDone && allLessonsDone) : allLessonsDone;
    if (!prevModCleared) return false;
  }
  return true;
}

function isQuizUnlocked(enr, modIndex) {
  const mod = course.modules[modIndex];
  if (!mod || !mod.quiz) return false;
  if (!isModUnlocked(enr, modIndex)) return false;
  const completedLessons = enr?.completed_mandatory_lessons || [];
  const modLessons = mod.lessons || [];
  return modLessons.length === 0 || modLessons.every((l) => completedLessons.includes(l.id));
}

let freshEnr = mockEngine.getEnrolment(enrolment.id);

// 1. Initial State
assert.strictEqual(isModUnlocked(freshEnr, 0), true, 'Module 1 must be unlocked initially');
assert.strictEqual(isModUnlocked(freshEnr, 1), false, 'Module 2 must be LOCKED initially');
assert.strictEqual(isModUnlocked(freshEnr, 2), false, 'Module 3 must be LOCKED initially');
assert.strictEqual(isQuizUnlocked(freshEnr, 0), false, 'Module 1 Knowledge Check must be LOCKED initially before reading lessons');

console.log('✓ Stage 1 Passed: Module 1 unlocked, Module 2 locked, Module 1 Quiz locked');

// 2. Complete partial lessons in Module 1 (e.g. lesson 0 and 1)
const mod1Lessons = course.modules[0].lessons;
mockEngine.recordLessonCompletion(enrolment.id, mod1Lessons[0].id);
mockEngine.recordLessonCompletion(enrolment.id, mod1Lessons[1].id);
freshEnr = mockEngine.getEnrolment(enrolment.id);

assert.strictEqual(isQuizUnlocked(freshEnr, 0), false, 'Module 1 Knowledge Check must remain LOCKED with partial lessons read');
assert.strictEqual(isModUnlocked(freshEnr, 1), false, 'Module 2 must remain LOCKED');

console.log('✓ Stage 2 Passed: Partial reading keeps Module 1 Quiz and Module 2 locked');

// 3. Complete all lessons in Module 1
for (const l of mod1Lessons) {
  mockEngine.recordLessonCompletion(enrolment.id, l.id);
}
freshEnr = mockEngine.getEnrolment(enrolment.id);

assert.strictEqual(isQuizUnlocked(freshEnr, 0), true, 'Module 1 Knowledge Check must UNLOCK once all Module 1 lessons are completed');
assert.strictEqual(isModUnlocked(freshEnr, 1), false, 'Module 2 must still be LOCKED until Module 1 exam is passed');

console.log('✓ Stage 3 Passed: All Module 1 lessons completed -> Module 1 Quiz unlocked, Module 2 still locked');

// 4. Pass Module 1 Knowledge Check (score 90%)
const mod1QuizId = course.modules[0].quiz.id;
mockEngine.recordQuizAttemptSubmission({
  enrolmentId: enrolment.id,
  quizId: mod1QuizId,
  scorePercentage: 90,
  isPassed: true
});
freshEnr = mockEngine.getEnrolment(enrolment.id);

assert.strictEqual(freshEnr.passed_quizzes.includes(mod1QuizId), true, 'Module 1 quiz must be in passed_quizzes');
assert.strictEqual(isModUnlocked(freshEnr, 1), true, 'Module 2 must now be UNLOCKED after passing Module 1 quiz');
assert.strictEqual(isModUnlocked(freshEnr, 2), false, 'Module 3 must still be LOCKED');
assert.strictEqual(isQuizUnlocked(freshEnr, 1), false, 'Module 2 Knowledge Check must be LOCKED until Module 2 lessons are completed');

console.log('✓ Stage 4 Passed: Module 1 exam passed -> Module 2 unlocked, Module 3 locked');

// 5. Progression through Module 2
const mod2Lessons = course.modules[1].lessons;
for (const l of mod2Lessons) {
  mockEngine.recordLessonCompletion(enrolment.id, l.id);
}
freshEnr = mockEngine.getEnrolment(enrolment.id);
assert.strictEqual(isQuizUnlocked(freshEnr, 1), true, 'Module 2 Knowledge Check must UNLOCK once Module 2 lessons are read');

const mod2QuizId = course.modules[1].quiz.id;
mockEngine.recordQuizAttemptSubmission({
  enrolmentId: enrolment.id,
  quizId: mod2QuizId,
  scorePercentage: 85,
  isPassed: true
});
freshEnr = mockEngine.getEnrolment(enrolment.id);

assert.strictEqual(isModUnlocked(freshEnr, 2), true, 'Module 3 must now be UNLOCKED after passing Module 2 quiz');
assert.strictEqual(isModUnlocked(freshEnr, 3), false, 'Module 4 must still be LOCKED');

console.log('✓ Stage 5 Passed: Module 2 completed and passed -> Module 3 unlocked');

// 6. Complete Modules 3, 4, 5
for (let mIdx = 2; mIdx <= 4; mIdx++) {
  const mod = course.modules[mIdx];
  for (const l of mod.lessons) {
    mockEngine.recordLessonCompletion(enrolment.id, l.id);
  }
  mockEngine.recordQuizAttemptSubmission({
    enrolmentId: enrolment.id,
    quizId: mod.quiz.id,
    scorePercentage: 90,
    isPassed: true
  });
}
freshEnr = mockEngine.getEnrolment(enrolment.id);

assert.strictEqual(isModUnlocked(freshEnr, 5), true, 'Module 6 must now be UNLOCKED after passing Modules 1-5');
assert.strictEqual(isQuizUnlocked(freshEnr, 5), false, 'Module 6 Quiz must be LOCKED until Module 6 lessons are completed');

console.log('✓ Stage 6 Passed: Modules 3, 4, 5 completed and passed -> Module 6 unlocked');

// 7. Complete Module 6 lessons and pass Module 6 exam
const mod6 = course.modules[5];
assert.strictEqual(mod6.lessons.length, 5, 'Module 6 must have 5 lessons');
for (const l of mod6.lessons) {
  mockEngine.recordLessonCompletion(enrolment.id, l.id);
}
freshEnr = mockEngine.getEnrolment(enrolment.id);
assert.strictEqual(isQuizUnlocked(freshEnr, 5), true, 'Module 6 Quiz must UNLOCK once all Module 6 lessons are read');

mockEngine.recordQuizAttemptSubmission({
  enrolmentId: enrolment.id,
  quizId: mod6.quiz.id,
  scorePercentage: 95,
  isPassed: true
});
freshEnr = mockEngine.getEnrolment(enrolment.id);

function areAllModulesCompleted(enr) {
  const completedLessons = enr?.completed_mandatory_lessons || [];
  const passedQuizzes = enr?.passed_quizzes || [];
  return course.modules.every((mod) => {
    const lessonsDone = (mod.lessons || []).every((l) => completedLessons.includes(l.id));
    const quizDone = mod.quiz ? passedQuizzes.includes(mod.quiz.id) : true;
    return quizDone && lessonsDone;
  });
}

assert.strictEqual(areAllModulesCompleted(freshEnr), true, 'All 6 modules must be cleared and Final Exam UNLOCKED');
console.log('✓ Stage 7 Passed: Module 6 completed and passed -> Final Exam unlocked');

console.log('================================================================');
console.log('ALL STRICT LINEAR CURRICULUM PROGRESSION TESTS PASSED CLEANLY (100%)');
console.log('================================================================');
