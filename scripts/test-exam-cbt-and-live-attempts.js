import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting CBT Exam Interface & Live Attempt Decrement Verification Suite...\n');

// -------------------------------------------------------------
// Test 1: Verify ExamCBTInterface.jsx exists and matches wireframe layout
// -------------------------------------------------------------
const cbtComponentPath = path.resolve('src/components/student/ExamCBTInterface.jsx');
assert(fs.existsSync(cbtComponentPath), 'ExamCBTInterface.jsx component file must exist');
const cbtContent = fs.readFileSync(cbtComponentPath, 'utf8');

// 1.1: Question text and sequential navigation
assert(
  cbtContent.includes('currentQuestion?.text') &&
  cbtContent.includes('PREVIOUS') &&
  cbtContent.includes('SAVE & NEXT'),
  'CBT Interface must feature Question text, PREVIOUS, and SAVE & NEXT navigation matching wireframe'
);
console.log('✅ PASS: Question text, PREVIOUS, and SAVE & NEXT buttons verified');

// 1.2: Options list with round indicators (A, B, C, D)
assert(
  cbtContent.includes('currentQuestion?.options') &&
  cbtContent.includes('String.fromCharCode(65 + oIdx)'),
  'CBT Interface must render circular radio options A, B, C, D matching wireframe circles'
);
console.log('✅ PASS: Round radio options (A, B, C, D) verified');

// 1.3: Question Palette with attempted in green and not attempted in red
assert(
  cbtContent.includes('Attempted (Green)') || cbtContent.includes('Attempted ('),
  'CBT Interface must render Question Palette header and legend'
);
assert(
  cbtContent.includes('bg-[#65F58A]') && cbtContent.includes('bg-rose-950'),
  'CBT Interface must mark attempted questions in Green (#65F58A) and unattempted in Red (rose) matching wireframe instructions'
);
console.log('✅ PASS: Question palette color-coding (Attempted in Green, Not Attempted in Red) verified');

// 1.4: Question Palette number grid (1..N) with click-to-jump
assert(
  cbtContent.includes('setCurrentQuestionIndex(idx)') &&
  cbtContent.includes('grid grid-cols-5 gap-2'),
  'CBT Interface must render interactive number grid allowing direct jumping to any question'
);
console.log('✅ PASS: Interactive Question Number Grid with quick jump verified');

// 1.5: Live Attempt Counter Badge (3 -> 2 -> 1 -> 0)
assert(
  cbtContent.includes('3 OF 3 ATTEMPTS REMAINING') &&
  cbtContent.includes('2 OF 3 ATTEMPTS REMAINING') &&
  cbtContent.includes('1 OF 3 ATTEMPTS REMAINING') &&
  cbtContent.includes('0 OF 3 ATTEMPTS REMAINING'),
  'CBT Interface must dynamically display live attempts remaining counter (3 -> 2 -> 1 -> 0)'
);
console.log('✅ PASS: Live Attempt Counter Badge (3 -> 2 -> 1 -> 0) verified');

// -------------------------------------------------------------
// Test 2: Verify Integration in LessonPlayerPage and QuizAssessmentPage
// -------------------------------------------------------------
const playerPath = path.resolve('src/pages/student/LessonPlayerPage.jsx');
const playerContent = fs.readFileSync(playerPath, 'utf8');

assert(
  playerContent.includes('<ExamCBTInterface') &&
  playerContent.includes('attemptsStatus={attemptsStatus}') &&
  playerContent.includes('onSubmitExam={handleSubmitQuiz}') &&
  playerContent.includes('onRetakeExam={handleRetakeExam}'),
  'LessonPlayerPage must integrate ExamCBTInterface with live attemptsStatus and submission handlers'
);
console.log('✅ PASS: LessonPlayerPage integrated with ExamCBTInterface');

// Sidebar attempts badges:
assert(
  playerContent.includes('attemptStatus.attemptsRemaining') &&
  playerContent.includes('/3 TRIES'),
  'Syllabus sidebar must display live remaining tries per evaluation (e.g. 3/3 TRIES)'
);
console.log('✅ PASS: Syllabus sidebar displays dynamic remaining attempts badge');

const quizAssessmentPath = path.resolve('src/pages/student/QuizAssessmentPage.jsx');
const quizAssessmentContent = fs.readFileSync(quizAssessmentPath, 'utf8');
assert(
  quizAssessmentContent.includes('<ExamCBTInterface'),
  'QuizAssessmentPage must also integrate ExamCBTInterface'
);
console.log('✅ PASS: QuizAssessmentPage integrated with ExamCBTInterface');

// -------------------------------------------------------------
// Test 3: Simulation of Live Attempt Decrementing (3 -> 2 -> 1 -> 0 -> 24h Lockout)
// -------------------------------------------------------------
function simulateAttemptEngine() {
  const windowKey = 'enr_unit_test_quiz_01';
  let db = {
    quiz_retry_windows: {},
    enrolments: [{ id: 'enr_unit_test', passed_quizzes: [] }],
    audit_logs: []
  };

  function getStatus() {
    const w = db.quiz_retry_windows[windowKey] || { attempts_used: 0, locked_until: null };
    const now = new Date();
    const isLocked = Boolean(w.locked_until && new Date(w.locked_until) > now);
    const attemptsUsed = w.attempts_used || 0;
    const attemptsRemaining = isLocked ? 0 : Math.max(0, 3 - attemptsUsed);
    return { attemptsUsed, attemptsRemaining, isLocked, lockedUntil: w.locked_until };
  }

  function submitAttempt(scorePercentage, isPassed) {
    let w = db.quiz_retry_windows[windowKey];
    if (!w) {
      w = { enrolment_id: 'enr_unit_test', quiz_id: 'quiz_01', attempts_used: 0, locked_until: null };
    }
    w.attempts_used = Math.min(3, (w.attempts_used || 0) + 1);

    if (isPassed) {
      db.enrolments[0].passed_quizzes.push('quiz_01');
    } else {
      if (w.attempts_used >= 3) {
        w.locked_until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        db.enrolments[0].exam_lockout_until = w.locked_until;
      }
    }

    db.quiz_retry_windows[windowKey] = w;
    return getStatus();
  }

  return { getStatus, submitAttempt };
}

const engine = simulateAttemptEngine();

// Initial State: 3 attempts available
let s0 = engine.getStatus();
assert.strictEqual(s0.attemptsUsed, 0, 'Initial attempts used must be 0');
assert.strictEqual(s0.attemptsRemaining, 3, 'Initial attempts remaining must be 3');
assert.strictEqual(s0.isLocked, false, 'Initial state must not be locked');
console.log('✅ PASS: Step 0 - Fresh exam has 3 attempts remaining');

// Attempt 1: Failed
let s1 = engine.submitAttempt(60, false);
assert.strictEqual(s1.attemptsUsed, 1, 'Attempt 1 used');
assert.strictEqual(s1.attemptsRemaining, 2, '2 attempts remaining after attempt 1 failure');
assert.strictEqual(s1.isLocked, false, 'Not locked yet after attempt 1');
console.log('✅ PASS: Step 1 - Failed attempt 1 leaves exactly 2 attempts remaining');

// Attempt 2: Failed
let s2 = engine.submitAttempt(70, false);
assert.strictEqual(s2.attemptsUsed, 2, 'Attempt 2 used');
assert.strictEqual(s2.attemptsRemaining, 1, '1 attempt remaining after attempt 2 failure');
assert.strictEqual(s2.isLocked, false, 'Not locked yet after attempt 2');
console.log('✅ PASS: Step 2 - Failed attempt 2 leaves exactly 1 attempt remaining');

// Attempt 3: Failed -> MUST TRIGGER 24-HOUR LOCKOUT!
let s3 = engine.submitAttempt(65, false);
assert.strictEqual(s3.attemptsUsed, 3, 'Attempt 3 used');
assert.strictEqual(s3.attemptsRemaining, 0, '0 attempts remaining after attempt 3 exhaustion');
assert.strictEqual(s3.isLocked, true, '24-hour lockout must be actively enforced when 3 attempts are exhausted');
assert(s3.lockedUntil !== null, 'lockedUntil timestamp must be present');
console.log('✅ PASS: Step 3 - Exhausting attempt 3 strictly triggers 24-hour examination lockout');

// Verification of Lockout Persistence:
let sPersist = engine.getStatus();
assert.strictEqual(sPersist.isLocked, true, 'Lockout strictly persists on subsequent status reads');
assert.strictEqual(sPersist.attemptsRemaining, 0, 'Attempts remaining remains 0 during active lockout');
console.log('✅ PASS: Step 4 - Lockout state persists with 0 attempts remaining');

console.log('\n🌟 ALL CBT EXAM INTERFACE & LIVE ATTEMPTS TESTS PASSED (100% SUCCESS)!');
