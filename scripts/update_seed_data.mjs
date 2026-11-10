import fs from 'fs';

let content = fs.readFileSync('src/services/db/seedData.js', 'utf8');
const search = `id: 'enr_student_net_02',
    user_id: 'usr_student_01',
    course_id: 'crs_cyber_net_02',
    course_version: '1.0',
    enrolled_at: '2026-10-10T10:00:00Z',
    status: 'active',
    completed_mandatory_lessons: [],
    passed_quizzes: [],
    final_assessment_attempt_id: null,
    credential_id: null,
  }`;

const addition = `${search},
  {
    id: 'enr_student_admin_03',
    user_id: 'usr_student_01',
    course_id: 'crs_cyber_admin_03',
    course_version: '1.0',
    enrolled_at: '2026-10-10T10:00:00Z',
    status: 'active',
    completed_mandatory_lessons: [],
    passed_quizzes: [],
    final_assessment_attempt_id: null,
    credential_id: null,
  }`;

if (content.includes(search)) {
  content = content.replace(search, addition);
  fs.writeFileSync('src/services/db/seedData.js', content, 'utf8');
  console.log('Successfully updated seedData.js with Course 03 enrollment!');
} else {
  console.error('Target not found in seedData.js');
}
