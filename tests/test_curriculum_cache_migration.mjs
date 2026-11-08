import assert from 'node:assert';
const storage = new Map();
globalThis.localStorage = {
  getItem: (k) => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k)
};

import { mockEngine } from '../src/services/db/mockEngine.js';

// Setup stale db in storage simulating user who already has redkross_academy_db_v1 in localStorage
const staleDb = {
  _initialized: true,
  _curriculum_version: '2026.11.07.v8',
  users: [{ id: 'usr_cadet_test', name: 'Cadet Tester', email: 'cadet@redkross.edu', role: 'student' }],
  enrolments: [{ id: 'enr_test_1', user_id: 'usr_cadet_test', course_id: 'crs_cyber_intro_01', progress: 42, completed_lessons: ['les_c1_m1_l1'] }],
  courses: [{
    id: 'crs_cyber_intro_01',
    title: 'Old Stale Title',
    modules: [{
      id: 'mod_1',
      lessons: [{ id: 'les_c1_m1_l1', title: 'Old Lesson', content: 'Old content' }]
    }]
  }],
  quiz_attempts: [{ id: 'qa_test_1', user_id: 'usr_cadet_test', score: 100 }],
  reward_ledger: [{ id: 'rw_1', user_id: 'usr_cadet_test', amount: 50 }],
  credentials: [{ id: 'cred_1', user_id: 'usr_cadet_test', title: 'Foundations' }]
};

// Set in safeStorage via localStorage
globalThis.localStorage.setItem('redkross_academy_db_v1', JSON.stringify(staleDb));
mockEngine._cachedDb = null;

const db = mockEngine.getDb();

assert.strictEqual(db._curriculum_version, '2026.11.09.v19_module6_complete_visual_diagrams', 'Curriculum version must be updated to latest');
const cyberCourse = db.courses.find(c => c.id === 'crs_cyber_intro_01');
assert.ok(cyberCourse, 'crs_cyber_intro_01 must exist');
assert.strictEqual(cyberCourse.modules.length, 6, 'crs_cyber_intro_01 must have all 6 modules from INITIAL_COURSES');
assert.strictEqual(db.users[0].name, 'Cadet Tester', 'User account must be preserved');
assert.strictEqual(db.enrolments[0].progress, 42, 'Cadet enrolment progress must be preserved');
assert.strictEqual(db.quiz_attempts[0].score, 100, 'Quiz attempts must be preserved');
assert.strictEqual(db.reward_ledger[0].amount, 50, 'Reward ledger must be preserved');

console.log('✓ Cache migration test passed successfully');
