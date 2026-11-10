/**
 * RedKross Academy - Course 03 Verification Suite
 */

import { course03Data } from '../src/services/db/course03/index.js';
import { 
  getRandomModuleQuestions, 
  getCourse03FinalExam, 
  getOrCreateCourse03ExamSession 
} from '../src/services/db/course03/course03Engine.js';

console.log('=== VERIFYING COURSE 03 INTEGRATION ===');

// 1. Verify Course Metadata
console.log('Course ID:', course03Data.id);
console.log('Course Title:', course03Data.title);
console.log('Total Modules:', course03Data.modules.length);
if (course03Data.modules.length !== 8) throw new Error('Expected 8 modules');

// 2. Verify Lessons and Images
let totalLessons = 0;
let totalImages = 0;
let totalQuizQuestions = 0;

course03Data.modules.forEach((mod, idx) => {
  console.log(`\n--- Module ${idx + 1}: ${mod.title} ---`);
  console.log(`Lessons count: ${mod.lessons.length}`);
  if (mod.lessons.length !== 6) throw new Error(`Module ${idx + 1} does not have 6 lessons`);
  totalLessons += mod.lessons.length;

  console.log(`Quiz Questions: ${mod.quiz.questions.length} (Passing: ${mod.quiz.pass_threshold}%)`);
  if (mod.quiz.questions.length < 20) throw new Error(`Module ${idx + 1} quiz has less than 20 questions`);
  totalQuizQuestions += mod.quiz.questions.length;

  mod.lessons.forEach(les => {
    totalImages += les.images.length;
    if (les.images.length < 2) {
      throw new Error(`Lesson ${les.title} has fewer than 2 images (${les.images.length})`);
    }
    // Check if content contains :::math-steps in relevant lessons
    if (les.content.includes(':::math-steps')) {
      console.log(`  [KaTeX Math-Steps Verified] in ${les.title}`);
    }
  });
});

console.log(`\nTotal Course 03 Lessons: ${totalLessons}`);
console.log(`Total Diagram Images Attached: ${totalImages}`);
if (totalImages < 96) throw new Error('Expected at least 96 diagram images');

// 3. Test Examination Engine
console.log('\n--- Testing Exam Engine ---');
const sampleModuleQuiz = getRandomModuleQuestions(1, 20);
console.log('Sample Module 1 Quiz count:', sampleModuleQuiz.length);
if (sampleModuleQuiz.length !== 20) throw new Error('Expected 20 questions in module quiz');

const sampleFinalExam = getCourse03FinalExam(60);
console.log('Sample Final Certification Exam count:', sampleFinalExam.length);
if (sampleFinalExam.length !== 60) throw new Error('Expected 60 questions in final exam');

const session = getOrCreateCourse03ExamSession('cadet_test_session_1', 'final_certification', 0);
console.log('Active session created questions count:', session.questions.length);

console.log('\n=== ALL COURSE 03 VERIFICATION CHECKS PASSED PERFECTLY! ===');
