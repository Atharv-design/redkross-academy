import {
  module1QuestionBank
} from '../src/services/db/questionBanks/module1QuestionBank.js';
import {
  module2QuestionBank
} from '../src/services/db/questionBanks/module2QuestionBank.js';
import {
  module3QuestionBank
} from '../src/services/db/questionBanks/module3QuestionBank.js';
import {
  module4QuestionBank
} from '../src/services/db/questionBanks/module4QuestionBank.js';
import {
  module5QuestionBank
} from '../src/services/db/questionBanks/module5QuestionBank.js';
import {
  getRandomModuleQuestions,
  getRandomFinalExamQuestions,
  getOrGenerateQuizQuestions,
  clearQuizSessionQuestions,
  shuffleQuestionOptions
} from '../src/services/db/questionBanks/questionBankEngine.js';

console.log('--- STARTING COMPREHENSIVE QUESTION BANK & SAMPLING ENGINE TEST SUITE ---');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

const banks = [
  { name: 'Module 1', bank: module1QuestionBank },
  { name: 'Module 2', bank: module2QuestionBank },
  { name: 'Module 3', bank: module3QuestionBank },
  { name: 'Module 4', bank: module4QuestionBank },
  { name: 'Module 5', bank: module5QuestionBank }
];

// 1. Verify 200 questions per bank
banks.forEach(({ name, bank }) => {
  assert(bank.length === 200, `${name} question bank contains exactly 200 questions (Found ${bank.length})`);
  
  const mediumCount = bank.filter(q => (q.difficulty || '').toLowerCase() === 'medium').length;
  const difficultCount = bank.filter(q => (q.difficulty || '').toLowerCase() === 'difficult').length;
  const easyCount = bank.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length;

  assert(mediumCount === 100, `${name} has exactly 100 Medium questions (Found ${mediumCount})`);
  assert(difficultCount === 100, `${name} has exactly 100 Difficult questions (Found ${difficultCount})`);
  assert(easyCount === 0, `${name} has 0 Easy/recall questions (Found ${easyCount})`);

  const validStructure = bank.every(q => 
    q.id &&
    (q.q || q.question || q.text) &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    typeof q.correct === 'number' &&
    q.correct >= 0 &&
    q.correct < 4 &&
    q.explanation
  );
  assert(validStructure, `${name} all 200 questions have valid IDs, 4 options, valid correct index, and explanation`);
});

// Total questions verification
const totalQuestionsCount = banks.reduce((sum, b) => sum + b.bank.length, 0);
assert(totalQuestionsCount === 1000, `Total question bank count across Modules 1-5 is exactly 1,000 (Found ${totalQuestionsCount})`);

// 2. Test Dynamic 20-Question Sampler
const sampledM1 = getRandomModuleQuestions(1, 20);
assert(sampledM1.length === 20, `getRandomModuleQuestions(1, 20) returned exactly 20 questions`);

const sampleM1Medium = sampledM1.filter(q => q.difficulty.toLowerCase() === 'medium').length;
const sampleM1Difficult = sampledM1.filter(q => q.difficulty.toLowerCase() === 'difficult').length;
assert(sampleM1Medium === 10 && sampleM1Difficult === 10, `Sampled 20 questions have balanced 10 Medium and 10 Difficult questions (M:${sampleM1Medium}, D:${sampleM1Difficult})`);

// Verify option schema for ExamCBTInterface compatibility
const optionsValid = sampledM1.every(q => 
  q.text &&
  Array.isArray(q.options) &&
  q.options.length === 4 &&
  q.options.every(opt => opt.id && typeof opt.text === 'string' && typeof opt.is_correct === 'boolean') &&
  q.options.filter(opt => opt.is_correct).length === 1
);
assert(optionsValid, `All sampled question options match ExamCBTInterface schema ({ id, text, is_correct }) with exactly one correct answer`);

// 3. Test Randomization / Fisher-Yates non-determinism
const sampleM1_run2 = getRandomModuleQuestions(1, 20);
const firstIdsRun1 = sampledM1.slice(0, 5).map(q => q.id).join(',');
const firstIdsRun2 = sampleM1_run2.slice(0, 5).map(q => q.id).join(',');
assert(firstIdsRun1 !== firstIdsRun2, `Subsequent module sample runs have different question orders (non-deterministic shuffle)`);

// 4. Test Final Exam 50-Question Engine
const finalExamQs = getRandomFinalExamQuestions(50);
assert(finalExamQs.length === 50, `getRandomFinalExamQuestions(50) returned exactly 50 questions`);

const finalExamM1 = finalExamQs.filter(q => q.id.includes('m1_') || q.id.includes('c1_m1_') || q.id.startsWith('c1_m1')).length;
const finalExamM2 = finalExamQs.filter(q => q.id.includes('m2_') || q.id.includes('c1_m2_') || q.id.startsWith('c1_m2')).length;
const finalExamM3 = finalExamQs.filter(q => q.id.includes('m3_') || q.id.includes('c1_m3_') || q.id.startsWith('c1_m3')).length;
const finalExamM4 = finalExamQs.filter(q => q.id.includes('m4_') || q.id.includes('c1_m4_') || q.id.startsWith('c1_m4')).length;
const finalExamM5 = finalExamQs.filter(q => q.id.includes('m5_') || q.id.includes('c1_m5_') || q.id.startsWith('c1_m5')).length;

assert(
  finalExamM1 === 10 && finalExamM2 === 10 && finalExamM3 === 10 && finalExamM4 === 10 && finalExamM5 === 10,
  `Final Exam cleanly samples exactly 10 questions from each of the 5 modules (M1:${finalExamM1}, M2:${finalExamM2}, M3:${finalExamM3}, M4:${finalExamM4}, M5:${finalExamM5})`
);

// 5. Test Option Shuffling Integrity
const testQ = {
  id: 'q_test_1',
  q: 'Which component enforces access control decisions?',
  options: ['Policy Enforcement Point (PEP)', 'Policy Information Point (PIP)', 'Policy Decision Point (PDP)', 'Policy Administration Point (PAP)'],
  correct: 0,
  explanation: 'PEP enforces decisions made by PDP.',
  difficulty: 'medium',
  topic: 'IAM'
};
const shuffledQ = shuffleQuestionOptions(testQ);
const correctShuffledOpt = shuffledQ.options.find(o => o.is_correct);
assert(
  correctShuffledOpt.text === 'Policy Enforcement Point (PEP)',
  `Option shuffling accurately preserves the correct answer text ('Policy Enforcement Point (PEP)') regardless of randomized option position`
);

console.log(`\n--- TEST RUN SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ---`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('=== ALL QUESTION BANK & SAMPLING TESTS PASSED WITH 100% SUCCESS ===');
}
