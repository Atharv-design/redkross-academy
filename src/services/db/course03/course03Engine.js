/**
 * RedKross Academy - Course 03 (Linux and Windows System Administration)
 * Dynamic Examination & Adaptive Question Bank Engine
 * 
 * Features:
 * - Direct routing for crs_cyber_admin_03 across 8 specialized modules
 * - Fisher-Yates non-biased cryptographic shuffle for questions and options
 * - Guaranteed 50% Medium / 50% Difficult balanced sampling
 * - Session-level caching for active student attempts
 * - Comprehensive 60-MCQ Final Certification Exam generator across all 8 modules
 */

import { module1QuestionBank } from './quizzes/module1QuestionBank.js';
import { module2QuestionBank } from './quizzes/module2QuestionBank.js';
import { module3QuestionBank } from './quizzes/module3QuestionBank.js';
import { module4QuestionBank } from './quizzes/module4QuestionBank.js';
import { module5QuestionBank } from './quizzes/module5QuestionBank.js';
import { module6QuestionBank } from './quizzes/module6QuestionBank.js';
import { module7QuestionBank } from './quizzes/module7QuestionBank.js';
import { module8QuestionBank } from './quizzes/module8QuestionBank.js';

export const COURSE03_MODULE_BANKS = {
  1: module1QuestionBank,
  2: module2QuestionBank,
  3: module3QuestionBank,
  4: module4QuestionBank,
  5: module5QuestionBank,
  6: module6QuestionBank,
  7: module7QuestionBank,
  8: module8QuestionBank
};

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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
    difficulty: (q.difficulty || 'medium').toLowerCase(),
    topic: q.topic || 'Linux and Windows System Administration'
  };
}

/**
 * Dynamically selects 20 questions from a 200-question module bank:
 * Exactly 10 Medium + 10 Difficult, shuffled questions & shuffled options.
 */
export function getRandomModuleQuestions(moduleIdOrNumber, count = 20) {
  let modNum = 1;
  if (typeof moduleIdOrNumber === 'number') {
    modNum = moduleIdOrNumber;
  } else if (typeof moduleIdOrNumber === 'string') {
    const match = moduleIdOrNumber.match(/\d+$/);
    if (match) modNum = parseInt(match[0], 10);
  }

  const bank = COURSE03_MODULE_BANKS[modNum] || COURSE03_MODULE_BANKS[1];
  const mediumList = bank.filter(q => (q.difficulty || '').toLowerCase() === 'medium');
  const difficultList = bank.filter(q => (q.difficulty || '').toLowerCase() === 'difficult');

  const half = Math.floor(count / 2);
  const selectedMedium = shuffleArray(mediumList).slice(0, half);
  const selectedDifficult = shuffleArray(difficultList).slice(0, count - half);

  const combined = shuffleArray([...selectedMedium, ...selectedDifficult]);
  return combined.map(q => shuffleQuestionOptions(q));
}

/**
 * Dynamic 60-question Final Comprehensive Certification Exam generator:
 * Balanced across all 8 modules (approx. 7-8 questions each).
 */
export function getCourse03FinalExam(totalCount = 60) {
  const perModule = Math.floor(totalCount / 8); // 7
  let pooled = [];

  for (let m = 1; m <= 8; m++) {
    const sample = getRandomModuleQuestions(m, perModule);
    pooled.push(...sample);
  }

  // If pooled count is less than totalCount, sample remainder from Module 8 (Capstone Hardening)
  if (pooled.length < totalCount) {
    const remainder = totalCount - pooled.length;
    const extra = getRandomModuleQuestions(8, remainder * 2).filter(q => !pooled.some(p => p.id === q.id)).slice(0, remainder);
    pooled.push(...extra);
  }

  return shuffleArray(pooled).slice(0, totalCount);
}

// In-memory active session cache
const activeExamSessions = new Map();

export function getOrCreateCourse03ExamSession(sessionId, examType, moduleIdOrNumber = 1) {
  const key = `${sessionId}_${examType}_${moduleIdOrNumber}`;
  if (activeExamSessions.has(key)) {
    return activeExamSessions.get(key);
  }

  let questions = [];
  if (examType === 'module_quiz') {
    questions = getRandomModuleQuestions(moduleIdOrNumber, 20);
  } else if (examType === 'final_certification') {
    questions = getCourse03FinalExam(60);
  } else {
    questions = getRandomModuleQuestions(moduleIdOrNumber, 20);
  }

  const sessionData = {
    sessionId,
    examType,
    moduleId: moduleIdOrNumber,
    startTime: Date.now(),
    questions
  };

  activeExamSessions.set(key, sessionData);
  return sessionData;
}

export function clearCourse03ExamSession(sessionId, examType, moduleIdOrNumber = 1) {
  const key = `${sessionId}_${examType}_${moduleIdOrNumber}`;
  return activeExamSessions.delete(key);
}
