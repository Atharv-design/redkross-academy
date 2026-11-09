import assert from 'node:assert';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { getOrGenerateQuizQuestions } from '../src/services/db/questionBanks/questionBankEngine.js';

console.log('--- TESTING COURSE 02 CURRICULUM, NOTES & QUIZ INTEGRATION ---');

// 1. Verify Course 02 is retrieved by ID and by Slug
const courseById = mockEngine.getCourseById('crs_cyber_net_02');
assert.ok(courseById, 'Course 02 must exist by ID');
assert.strictEqual(courseById.title, 'Computer Networking for Cybersecurity');
assert.strictEqual(courseById.modules.length, 8, 'Course 02 must have exactly 8 modules');

const courseBySlug = mockEngine.getCourseBySlug('computer-networking-for-cybersecurity');
assert.ok(courseBySlug, 'Course 02 must exist by Slug');
assert.strictEqual(courseBySlug.id, 'crs_cyber_net_02');

// 2. Audit all 8 modules and 48 lessons
let totalLessons = 0;
let totalChars = 0;
courseById.modules.forEach((mod, mIdx) => {
  assert.ok(mod.title.includes(`Module ${mIdx + 1}`), `Module ${mIdx + 1} must have valid title: ${mod.title}`);
  assert.strictEqual(mod.lessons.length, 6, `Module ${mIdx + 1} must have exactly 6 lessons`);
  assert.ok(mod.quiz, `Module ${mIdx + 1} must have a quiz`);
  assert.strictEqual(mod.quiz.questions.length, 20, `Module ${mIdx + 1} quiz must have 20 questions`);
  
  mod.lessons.forEach((les, lIdx) => {
    totalLessons++;
    assert.ok(les.id.startsWith('les_c2_'), `Lesson ${les.id} must have valid Course 02 prefix`);
    assert.ok(les.title, `Lesson ${les.id} must have a title`);
    assert.ok(les.content && les.content.length > 500, `Lesson ${les.id} must contain detailed content (found ${les.content?.length})`);
    totalChars += les.content.length;
  });
});

console.log(`✓ All 8 modules and ${totalLessons} lessons verified successfully (${totalChars} characters of content).`);

// 3. Test Student Enrolment in Course 02
const testCadet = mockEngine.getDb().users[0] || { id: 'usr_student_01' };
const enrolment = mockEngine.enrolStudent(testCadet.id, 'crs_cyber_net_02');
assert.ok(enrolment, 'Cadet must be successfully enrolled in Course 02');
assert.strictEqual(enrolment.course_id, 'crs_cyber_net_02');

// 4. Test Lesson Completion in Course 02
const firstLessonId = courseById.modules[0].lessons[0].id;
mockEngine.recordLessonCompletion(enrolment.id, firstLessonId);
const updatedEnr = mockEngine.getEnrolment(enrolment.id);
assert.ok(updatedEnr.completed_mandatory_lessons.includes(firstLessonId), 'First lesson must be marked completed');

// 5. Test Dynamic Question Sampling for Course 02
const m1Questions = getOrGenerateQuizQuestions(enrolment.id, 'quiz_mod_c2_1', 1, false, 'crs_cyber_net_02');
assert.strictEqual(m1Questions.length, 20, 'Sampled 20 questions for Module 1 Quiz');
assert.ok(m1Questions[0].options.length === 4, 'Question must have 4 options');

const finalExamQuestions = getOrGenerateQuizQuestions(enrolment.id, 'exam_cyber_net_final', 8, true, 'crs_cyber_net_02');
assert.strictEqual(finalExamQuestions.length, 50, 'Final Exam must sample 50 questions across Course 02');

console.log('✓ Course 02 dynamic examination sampling passed cleanly.');
console.log('===============================================================');
console.log('ALL COURSE 02 CURRICULUM & NOTES INTEGRATION TESTS PASSED 100%');
console.log('===============================================================');
