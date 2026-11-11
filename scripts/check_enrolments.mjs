import { mockEngine } from '../src/services/db/mockEngine.js';

const db = mockEngine.getDb();
console.log('Enrolments:');
(db.enrolments || []).forEach(e => {
  console.log(`- Enrolment: ${e.id}, user: ${e.user_id}, course: ${e.course_id}`);
  console.log(`  completed_mandatory_lessons:`, e.completed_mandatory_lessons);
  console.log(`  passed_quizzes:`, e.passed_quizzes);
});
