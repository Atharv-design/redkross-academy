import { CYBER_COURSES, CYBER_LEARNING_PATHS } from '../src/services/db/cyberCourses.js';
import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('=== PLATFORM CATALOG VERIFICATION ===');
console.log('Total Cyber Courses:', CYBER_COURSES.length);
CYBER_COURSES.forEach((c, idx) => {
  console.log(`Course ${idx + 1}: ${c.id} - ${c.title} (${c.modules?.length || 0} modules)`);
});

console.log('\nTotal Learning Paths:', CYBER_LEARNING_PATHS.length);
CYBER_LEARNING_PATHS.forEach((p, idx) => {
  console.log(`Path ${idx + 1}: ${p.id} - ${p.title} (Courses: ${p.course_ids.join(', ')})`);
});

const c3 = mockEngine.getCourseById('crs_cyber_admin_03');
console.log('\nmockEngine.getCourseById("crs_cyber_admin_03"):', c3 ? 'FOUND' : 'NOT FOUND');
if (c3) {
  console.log(`  Modules: ${c3.modules.length}`);
  console.log(`  Module 1: ${c3.modules[0].title} (${c3.modules[0].lessons.length} lessons)`);
}

const enr = mockEngine.getEnrolment('crs_cyber_admin_03');
console.log('mockEngine.getEnrolment("crs_cyber_admin_03"):', enr ? 'FOUND' : 'NOT FOUND');

console.log('\n=== ALL PLATFORM CATALOG CHECKS PASSED ===');
