import { mockEngine } from '../src/services/db/mockEngine.js';

async function testPlayerSetup() {
  const user = mockEngine.getDb().users[0];
  console.log('Testing with user:', user.id, user.email);

  // Enrol user in crs_cyber_net_02
  const enrolment = mockEngine.enrolStudent(user.id, 'crs_cyber_net_02');
  console.log('Enrolment created:', enrolment.id, 'course_id:', enrolment.course_id);

  const course = mockEngine.getCourseById(enrolment.course_id);
  console.log('Course loaded:', course?.title, 'modules:', course?.modules?.length);

  const allUnits = [];
  if (course && course.modules) {
    course.modules.forEach((mod, modIdx) => {
      (mod.lessons || []).forEach((les) => {
        allUnits.push({
          id: les.id,
          type: 'lesson',
          lesson: les,
          moduleIndex: modIdx,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      });
      if (mod.quiz) {
        allUnits.push({
          id: mod.quiz.id,
          type: 'quiz',
          quiz: mod.quiz,
          moduleIndex: modIdx,
          moduleId: mod.id,
          moduleTitle: mod.title
        });
      }
    });

    if (course.final_assessment) {
      allUnits.push({
        id: course.final_assessment.id,
        type: 'final_exam',
        quiz: course.final_assessment,
        moduleIndex: course.modules.length,
        moduleId: 'mod_final',
        moduleTitle: 'Final Comprehensive Certification Assessment'
      });
    }
  }
  console.log('allUnits total count:', allUnits.length);

  // Check progress
  const progress = mockEngine.getCourseProgress(enrolment.id);
  console.log('Progress:', progress);

  // Check attempt status for all units
  for (const u of allUnits) {
    const status = mockEngine.getQuizAttemptStatus(enrolment.id, u.id);
    const locked = mockEngine.isExamLocked(enrolment.id, u.id);
  }
  console.log('All units statuses queried cleanly!');
}

testPlayerSetup();
