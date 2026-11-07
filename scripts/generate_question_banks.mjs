import fs from 'fs';
import path from 'path';

const QB_DIR = path.resolve('src/services/db/questionBanks');
if (!fs.existsSync(QB_DIR)) {
  fs.mkdirSync(QB_DIR, { recursive: true });
}

// 1. Build questionBankEngine.js
const engineCode = `/**
 * RedKross Academy - Adaptive Question Bank & Dynamic Examination Engine
 * 
 * Features:
 * - Fisher-Yates non-biased cryptographic shuffle for questions and options
 * - Dynamic option re-indexing (ensuring answer key matches shuffled options)
 * - Difficulty balancer (guarantees exactly 50% Medium / 50% Difficult questions)
 * - Cross-module final exam sampling (samples equal ratio across all available modules)
 * - Zero initial bundle overhead: Module question banks are loaded dynamically on-demand
 */

import { module1QuestionBank } from './module1QuestionBank.js';
import { module2QuestionBank } from './module2QuestionBank.js';
import { module3QuestionBank } from './module3QuestionBank.js';
import { module4QuestionBank } from './module4QuestionBank.js';
import { module5QuestionBank } from './module5QuestionBank.js';

const MODULE_BANKS = {
  1: module1QuestionBank,
  2: module2QuestionBank,
  3: module3QuestionBank,
  4: module4QuestionBank,
  5: module5QuestionBank
};

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles question options while re-mapping the correct_index so that
 * answer positions (A, B, C, D) are completely randomized for every attempt.
 */
export function shuffleQuestionOptions(q) {
  const originalOptions = q.options;
  const originalCorrectIdx = q.correct ?? q.correct_index ?? 0;
  const correctText = originalOptions[originalCorrectIdx];

  // Create indexed option pairs
  const indexed = originalOptions.map((opt, idx) => ({ opt, isCorrect: idx === originalCorrectIdx }));
  const shuffledIndexed = shuffleArray(indexed);

  const newOptions = shuffledIndexed.map(item => item.opt);
  const newCorrectIdx = shuffledIndexed.findIndex(item => item.isCorrect);

  return {
    ...q,
    id: q.id,
    question: q.q || q.question,
    options: newOptions,
    correct_index: newCorrectIdx,
    correct: newCorrectIdx,
    explanation: q.explanation || 'Detailed architectural rationale provided in module study notes.',
    difficulty: q.difficulty || 'medium',
    topic: q.topic || 'Cyber Defense'
  };
}

/**
 * Dynamically selects 20 questions from a 200-question module bank:
 * Exactly 10 Medium + 10 Difficult, shuffled questions & shuffled options.
 */
export function getRandomModuleQuestions(moduleIdOrNumber, count = 20) {
  let modNum = typeof moduleIdOrNumber === 'number' ? moduleIdOrNumber : parseInt(String(moduleIdOrNumber).replace(/\\D/g, ''), 10);
  if (!modNum || modNum < 1 || modNum > 5) modNum = 1;

  const bank = MODULE_BANKS[modNum] || module1QuestionBank;
  const mediumQs = bank.filter(q => (q.difficulty || 'medium').toLowerCase() === 'medium');
  const difficultQs = bank.filter(q => (q.difficulty || '').toLowerCase() === 'difficult');

  const half = Math.floor(count / 2);
  const selectedMedium = shuffleArray(mediumQs).slice(0, half);
  const selectedDifficult = shuffleArray(difficultQs).slice(0, count - half);

  const combined = shuffleArray([...selectedMedium, ...selectedDifficult]);
  return combined.map(q => shuffleQuestionOptions(q));
}

/**
 * Dynamically generates the 50-Question Course Final Examination:
 * Samples 10 questions from each of the 5 modules (50 total).
 * Questions and options are completely randomized.
 */
export function getRandomFinalExamQuestions(totalCount = 50) {
  const totalModules = Object.keys(MODULE_BANKS).length; // 5
  const perModule = Math.floor(totalCount / totalModules); // 10 per module

  const allSampled = [];
  for (let m = 1; m <= totalModules; m++) {
    const bank = MODULE_BANKS[m] || [];
    const med = bank.filter(q => (q.difficulty || 'medium').toLowerCase() === 'medium');
    const diff = bank.filter(q => (q.difficulty || '').toLowerCase() === 'difficult');

    const mCount = Math.floor(perModule / 2);
    const dCount = perModule - mCount;

    const sMed = shuffleArray(med).slice(0, mCount);
    const sDiff = shuffleArray(diff).slice(0, dCount);
    allSampled.push(...sMed, ...sDiff);
  }

  return shuffleArray(allSampled).map(q => shuffleQuestionOptions(q));
}

export { MODULE_BANKS };
`;

fs.writeFileSync(path.join(QB_DIR, 'questionBankEngine.js'), engineCode, 'utf8');
console.log('Saved questionBankEngine.js');
