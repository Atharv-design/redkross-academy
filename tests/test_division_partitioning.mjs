import { mockEngine } from '../src/services/db/mockEngine.js';

async function testDivisionPartitioning() {
  const uId = 'usr_test_cadet_' + Date.now();
  
  // Enrol in one cyber course and one psychology course
  mockEngine.enrolStudent(uId, 'crs_cyber_intro_01');
  mockEngine.enrolStudent(uId, 'crs_psych_cbt');
  
  const cyber = mockEngine.getEnrolmentsForUser(uId, 'cybersecurity');
  const psych = mockEngine.getEnrolmentsForUser(uId, 'psychology');
  const all = mockEngine.getEnrolmentsForUser(uId);
  const aliasEnrs = mockEngine.getUserEnrolments(uId, 'cybersecurity');
  
  const cyberStats = mockEngine.getStudentStatsByDivision(uId, 'cybersecurity');
  const psychStats = mockEngine.getStudentStatsByDivision(uId, 'psychology');
  
  console.log('Cyber count:', cyber.length);
  console.log('Psych count:', psych.length);
  console.log('All count:', all.length);
  console.log('Alias count:', aliasEnrs.length);
  console.log('Cyber activeCourses:', cyberStats.activeCourses);
  console.log('Psych activeCourses:', psychStats.activeCourses);

  if (cyber.length !== 1 || (cyber[0].course_id !== 'crs_cyber_intro_01' && cyber[0].course_id !== 'crs_full_stack_web_dev')) {
    throw new Error('Cyber division filtering failed!');
  }
  if (psych.length !== 1 || psych[0].course_id !== 'crs_psych_cbt') {
    throw new Error('Psychology division filtering failed!');
  }
  if (all.length !== 2) {
    throw new Error('Backwards compatibility for getEnrolmentsForUser failed!');
  }
  if (aliasEnrs.length !== 1) {
    throw new Error('getUserEnrolments alias failed!');
  }
  if (cyberStats.activeCourses !== 1 || psychStats.activeCourses !== 1) {
    throw new Error('getStudentStatsByDivision failed!');
  }

  console.log('=== ALL DIVISION PARTITIONING TESTS PASSED PERFECTLY ===');
}

testDivisionPartitioning().catch((err) => {
  console.error(err);
  process.exit(1);
});
