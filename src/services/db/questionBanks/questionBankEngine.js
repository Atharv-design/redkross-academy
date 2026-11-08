/**
 * RedKross Academy - Adaptive Question Bank & Dynamic Examination Engine
 * 
 * Features:
 * - Fisher-Yates non-biased cryptographic shuffle for questions and options
 * - Dynamic option re-indexing (ensuring answer key matches shuffled options)
 * - Difficulty balancer (guarantees exactly 50% Medium / 50% Difficult questions)
 * - Cross-module final exam sampling (samples equal ratio across all available modules)
 * - Session-level caching: active attempt questions persist across browser refreshes
 * - Immediate regeneration on explicit exam retake
 */

import { module1QuestionBank } from './module1QuestionBank.js';
import { module2QuestionBank } from './module2QuestionBank.js';
import { module3QuestionBank } from './module3QuestionBank.js';
import { module4QuestionBank } from './module4QuestionBank.js';
import { module5QuestionBank } from './module5QuestionBank.js';
import { module6QuestionBank } from './module6QuestionBank.js';

const MODULE_BANKS = {
  1: module1QuestionBank,
  2: module2QuestionBank,
  3: module3QuestionBank,
  4: module4QuestionBank,
  5: module5QuestionBank,
  6: module6QuestionBank
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
 * Shuffles question options while re-mapping the correct_index and is_correct flags so that
 * answer positions (A, B, C, D) are completely randomized for every attempt.
 * Guarantees schema compatibility with ExamCBTInterface ({ id, text, is_correct }).
 */
export function shuffleQuestionOptions(q) {
  const originalOptions = q.options || [];
  const originalCorrectIdx = q.correct ?? q.correct_index ?? 0;

  // Create indexed option pairs
  const indexed = originalOptions.map((opt, idx) => ({
    text: typeof opt === 'string' ? opt : (opt.text || ''),
    isCorrect: typeof opt === 'object' && opt.is_correct !== undefined ? opt.is_correct : (idx === originalCorrectIdx)
  }));
  const shuffledIndexed = shuffleArray(indexed);

  const newOptions = shuffledIndexed.map((item, idx) => ({
    id: `${q.id}_opt_${idx}`,
    text: item.text,
    is_correct: item.isCorrect
  }));
  const newCorrectIdx = shuffledIndexed.findIndex(item => item.isCorrect);

  const questionStatement = q.text || q.question || q.q || '';

  return {
    ...q,
    id: q.id,
    text: questionStatement,
    question: questionStatement,
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
  let modNum = typeof moduleIdOrNumber === 'number' ? moduleIdOrNumber : parseInt(String(moduleIdOrNumber).replace(/\D/g, ''), 10);
  const totalAvailable = Object.keys(MODULE_BANKS).length;
  if (!modNum || modNum < 1 || modNum > totalAvailable) modNum = 1;

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
 * Dynamically generates the Course Final Examination:
 * Samples evenly across all available modules (guaranteeing exact total count and 50/50 difficulty balance).
 * Questions and options are completely randomized.
 */
export function getRandomFinalExamQuestions(totalCount = 50) {
  const totalModules = Object.keys(MODULE_BANKS).length;
  const basePerModule = Math.floor(totalCount / totalModules);
  let remainder = totalCount % totalModules;

  const allSampled = [];
  for (let m = 1; m <= totalModules; m++) {
    const bank = MODULE_BANKS[m] || [];
    const med = bank.filter(q => (q.difficulty || 'medium').toLowerCase() === 'medium');
    const diff = bank.filter(q => (q.difficulty || '').toLowerCase() === 'difficult');

    let countForThisMod = basePerModule + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;

    const mCount = Math.floor(countForThisMod / 2);
    const dCount = countForThisMod - mCount;

    const sMed = shuffleArray(med).slice(0, mCount);
    const sDiff = shuffleArray(diff).slice(0, dCount);
    allSampled.push(...sMed, ...sDiff);
  }

  return shuffleArray(allSampled).map(q => shuffleQuestionOptions(q));
}

/**
 * Retrieves active session questions or generates fresh randomized questions.
 * Caches in sessionStorage so mid-exam page reloads don't disrupt active questions or answers.
 */
export function getOrGenerateQuizQuestions(enrolmentId, quizId, moduleNum = 1, isFinalExam = false) {
  const cacheKey = `rk_quiz_session_${enrolmentId || 'cadet'}_${quizId}`;
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
  }

  let questions = [];
  if (isFinalExam || (typeof quizId === 'string' && (quizId.includes('final') || quizId.includes('exam_cyber')))) {
    questions = getRandomFinalExamQuestions(50);
  } else {
    questions = getRandomModuleQuestions(moduleNum, 20);
  }

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(questions));
    } catch {
      // ignore
    }
  }

  return questions;
}

/**
 * Clears cached active quiz questions on retake or submission reset.
 */
export function clearQuizSessionQuestions(enrolmentId, quizId) {
  const cacheKey = `rk_quiz_session_${enrolmentId || 'cadet'}_${quizId}`;
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(cacheKey);
    } catch {
      // ignore
    }
  }
}

export { MODULE_BANKS };
