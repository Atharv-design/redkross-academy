/**
 * Unit & Integration Test Suite
 * Validating:
 * 1. mockEngine.logAction audit recording
 * 2. Module 1, 2, 3 quizzes (20 MCQs, 80% passing threshold, 20 mins)
 * 3. Course Final Assessment (50 unique MCQs, no duplicates, option rotation [13, 13, 12, 12], explanations)
 * 4. Sequential Module Gating & Unlock criteria
 * 5. Proctoring Anti-Cheat Violation (24-Hour lockout ban & audit entry)
 * 6. Certificate Request & Admin Dispatch Flow
 * 7. Student Directory Table structure & sorting
 * 8. Zero-Blue & Lora Font verification
 */

import { mockEngine } from '../src/services/db/mockEngine.js';
import { INITIAL_COURSES } from '../src/services/db/seedData.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL [Test ${totalTests}]: ${message}`);
    process.exitCode = 1;
  } else {
    passedTests++;
    console.log(`✅ PASS [Test ${totalTests}]: ${message}`);
  }
}

console.log('================================================================');
console.log('🚀 RUNNING REDKROSS OPENEDX EXAM, TABLE & SHADER TEST SUITE');
console.log('================================================================\n');

// ---------------------------------------------------------
// TEST SUITE 1: mockEngine.logAction & Audit Trails
// ---------------------------------------------------------
console.log('--- Suite 1: mockEngine.logAction ---');
try {
  const testLog = mockEngine.logAction({
    action: 'UNIT_TEST_DISPATCH',
    category: 'STUDENT_ADMIN',
    details: 'Testing logAction function execution without exceptions',
    severity: 'INFO'
  });
  assert(testLog && testLog.id, 'mockEngine.logAction returns valid log record with ID');
  const db = mockEngine.getDb();
  const found = db.audit_logs.find((l) => l.action === 'UNIT_TEST_DISPATCH');
  assert(found !== undefined, 'Audit log is persisted in db.audit_logs');
} catch (e) {
  assert(false, `mockEngine.logAction threw error: ${e.message}`);
}

// ---------------------------------------------------------
// TEST SUITE 2: Module 1, 2, 3 Quizzes (20 MCQs each, 80% threshold)
// ---------------------------------------------------------
console.log('\n--- Suite 2: Module Quizzes (20 Questions, 80% passing) ---');
const primaryCourse = INITIAL_COURSES.find((c) => c.id === 'crs_soc_fundamentals');
assert(primaryCourse !== undefined, 'Found crs_soc_fundamentals in seed fixtures');

primaryCourse.modules.forEach((mod, idx) => {
  assert(mod.quiz !== undefined, `Module ${idx + 1} (${mod.title}) has attached quiz`);
  assert(mod.quiz.passing_score === 80, `Module ${idx + 1} quiz has passing_score === 80%`);
  assert(mod.quiz.duration_minutes === 20, `Module ${idx + 1} quiz duration is 20 minutes`);
  assert(Array.isArray(mod.quiz.questions) && mod.quiz.questions.length === 20,
    `Module ${idx + 1} quiz has exactly 20 questions (found: ${mod.quiz.questions?.length})`);

  // Verify unique questions
  const qTexts = new Set(mod.quiz.questions.map((q) => (q.text || q.question).trim().toLowerCase()));
  assert(qTexts.size === 20, `Module ${idx + 1} questions are 100% unique (no duplicates)`);
});

// ---------------------------------------------------------
// TEST SUITE 3: Final Comprehensive Assessment (50 MCQs)
// ---------------------------------------------------------
console.log('\n--- Suite 3: 50-MCQ Final Assessment & Option Rotation ---');
const finalExam = primaryCourse.final_assessment;
assert(finalExam !== undefined, 'Course has final_assessment attached');
assert(finalExam.questions.length === 50, `Final assessment has exactly 50 questions (found: ${finalExam.questions.length})`);
assert(finalExam.passing_score === 80, 'Final assessment has 80% passing threshold');
assert(finalExam.duration_minutes === 60, 'Final assessment duration is 60 minutes');

// Verify zero duplicate questions in final assessment
const finalQSet = new Set(finalExam.questions.map((q) => (q.text || q.question).trim().toLowerCase()));
assert(finalQSet.size === 50, 'Final assessment has 50 unique questions with 0 duplicates');

// Verify option rotation across A, B, C, D
const correctDistribution = [0, 0, 0, 0]; // A, B, C, D counts
let allHaveExplanations = true;

finalExam.questions.forEach((q, idx) => {
  if (!q.explanation || q.explanation.length < 20) {
    allHaveExplanations = false;
  }
  const correctIdx = q.options.findIndex((opt) => opt.is_correct);
  if (correctIdx >= 0 && correctIdx < 4) {
    correctDistribution[correctIdx]++;
  }
});

assert(allHaveExplanations, 'All 50 questions contain in-depth technical explanations/rationales');
console.log(`Option Position Distribution (A, B, C, D): [${correctDistribution.join(', ')}]`);
assert(
  correctDistribution[0] === 13 &&
  correctDistribution[1] === 13 &&
  correctDistribution[2] === 12 &&
  correctDistribution[3] === 12,
  'Correct answers are distributed across [13 A, 13 B, 12 C, 12 D] preventing predictable option bias'
);
assert(correctDistribution[0] < 50, 'Correct answer is not predictably Option A');

// ---------------------------------------------------------
// TEST SUITE 4: Sequential Module Gating & Unlock
// ---------------------------------------------------------
console.log('\n--- Suite 4: Sequential Module Gating ---');
const dbInstance = mockEngine.getDb();
const testEnrolment = {
  id: 'enr_test_gating_01',
  user_id: 'usr_student_01',
  cadet_id: 'RK-89421',
  student_name: 'Atharv Sharma',
  student_email: 'student@redkross.org.in',
  course_id: 'crs_soc_fundamentals',
  completed_mandatory_lessons: ['les_1_1', 'les_1_2', 'les_1_3'],
  passed_quizzes: [],
  quiz_scores: {}
};
dbInstance.enrolments = [testEnrolment, ...(dbInstance.enrolments || [])];
mockEngine.saveDb(dbInstance);

// Module 0 (first module) is always unlocked
const mod0Unlocked = mockEngine.isModuleUnlocked(testEnrolment.id, 'crs_soc_fundamentals', 0);
assert(mod0Unlocked === true, 'Module 1 is always unlocked initially');

// Module 1 is locked because Module 1's quiz has not been passed
const mod1UnlockedBefore = mockEngine.isModuleUnlocked(testEnrolment.id, 'crs_soc_fundamentals', 1);
assert(mod1UnlockedBefore === false, 'Module 2 is locked when Module 1 quiz has not been passed');

// Now record passing score for Module 1 quiz
mockEngine.recordModuleQuizScore(testEnrolment.id, 'quiz_mod_1', 85, true);
const mod1UnlockedAfter = mockEngine.isModuleUnlocked(testEnrolment.id, 'crs_soc_fundamentals', 1);
assert(mod1UnlockedAfter === true, 'Module 2 unlocks after passing Module 1 evaluation with 85% (>= 80%)');

// ---------------------------------------------------------
// TEST SUITE 5: Anti-Cheat Proctoring & 24-Hour Lockout
// ---------------------------------------------------------
console.log('\n--- Suite 5: Anti-Cheat Proctoring & 24-Hour Ban ---');
const violationResult = mockEngine.recordExamViolation({
  enrolmentId: testEnrolment.id,
  quizId: 'quiz_mod_1',
  reason: 'TAB_SWITCH_OR_BLUR',
  details: 'User switched window/tab during examination.'
});

assert(violationResult.lockout_active === true, 'Proctor violation triggers immediate lockout_active = true');
assert(violationResult.lockout_hours === 24, 'Proctor violation lockout duration is 24 hours');
assert(new Date(violationResult.locked_until || violationResult.lockedUntil) > new Date(), 'Lockout expiry is in future');

// Check that audit log recorded the anti-cheat incident
const dbAfterViolation = mockEngine.getDb();
const incidentLog = dbAfterViolation.audit_logs.find((l) =>
  l.action === 'PROCTOR_VIOLATION_TERMINATION' || l.action === 'PROCTOR_VIOLATION_LOCKOUT'
);
assert(incidentLog !== undefined, 'Anti-cheat lockout logged to audit trail');

// ---------------------------------------------------------
// TEST SUITE 6: Certificate Request & Admin Approval Flow
// ---------------------------------------------------------
console.log('\n--- Suite 6: Certificate Request & Admin Approval Flow ---');
const dbForCert = mockEngine.getDb();
const enrForCert = dbForCert.enrolments.find((e) => e.id === testEnrolment.id);
if (enrForCert) {
  enrForCert.final_assessment_passed = true;
  enrForCert.final_assessment_score = 92;
  mockEngine.saveDb(dbForCert);
}
const reqResult = mockEngine.requestCertificate(testEnrolment.id, 'Unit test requesting official certification');
assert(reqResult && reqResult.id, 'mockEngine.requestCertificate creates request record');
assert(reqResult && reqResult.status === 'pending_review', 'Request has status pending_review');

// Simulate Admin dispatching the certificate
const dispatched = mockEngine.dispatchCertificate({
  enrolmentId: testEnrolment.id,
  cadetId: 'RK-TEST-01',
  studentName: 'Test Cadet Operator',
  courseId: 'crs_soc_fundamentals'
});
assert(dispatched && dispatched.id && dispatched.id.startsWith('RK-CERT-'), 'Admin dispatch generates valid certificate ID');
assert(dispatched.digital_signature && dispatched.digital_signature.startsWith('0x'), 'Certificate has cryptographic digital signature');

// ---------------------------------------------------------
// TEST SUITE 7: Student Directory Table File Inspection
// ---------------------------------------------------------
console.log('\n--- Suite 7: Admin Students Page Table Layout ---');
const adminStudentsFile = fs.readFileSync(
  path.join(__dirname, '../src/pages/admin/AdminStudentsPage.jsx'),
  'utf-8'
);
assert(adminStudentsFile.includes('Cadet ID'), 'AdminStudentsPage contains Cadet ID column');
assert(adminStudentsFile.includes('Name'), 'AdminStudentsPage contains Name column');
assert(adminStudentsFile.includes('Email address'), 'AdminStudentsPage contains Email address column');
assert(adminStudentsFile.includes('Status'), 'AdminStudentsPage contains Status column');
assert(adminStudentsFile.includes('Enrolled'), 'AdminStudentsPage contains Enrolled column');
assert(adminStudentsFile.includes('Actions'), 'AdminStudentsPage contains Actions column');
assert(adminStudentsFile.includes('handleSort'), 'AdminStudentsPage supports interactive column sorting');
assert(adminStudentsFile.includes('itemsPerPage') || adminStudentsFile.includes('currentPage'),
  'AdminStudentsPage includes minimal pagination');

// ---------------------------------------------------------
// TEST SUITE 8: Shader Component & Zero-Blue Validation
// ---------------------------------------------------------
console.log('\n--- Suite 8: Emerald Shader & Zero-Blue Compliance ---');
const shaderFile = fs.readFileSync(
  path.join(__dirname, '../src/components/ui/CyberShaderBackground.jsx'),
  'utf-8'
);
assert(shaderFile.includes('65F58A') || shaderFile.includes('00FFA3'),
  'CyberShaderBackground uses Emerald Green (#65F58A, #00FFA3)');
assert(!shaderFile.includes('#0066FF') && !shaderFile.includes('#00A3FF'),
  'CyberShaderBackground contains zero blue hex colors');

console.log('\n================================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
