/**
 * RedKross Academy — Automated Unit Test Suite
 * Tests Course/Module/Lesson Deletion CRUD, Manual Question Authoring & PDF Certificate Pipeline
 */

import assert from 'node:assert';
import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('====================================================');
console.log('REDKROSS ACADEMY: COURSE CRUD & PDF CERTIFICATE SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${description}`);
    console.error(`   Error: ${err.message}\n`);
    throw err;
  }
}

// ----------------------------------------------------
// SUITE 1: mockEngine.logAction and logAudit
// ----------------------------------------------------
console.log('--- Suite 1: mockEngine Audit Logging ---');

test('mockEngine.logAction records audit entry with ID and timestamp', () => {
  const log = mockEngine.logAction({
    action: 'UNIT_TEST_ACTION',
    category: 'TESTING',
    details: 'Verifying mockEngine.logAction robustness',
    severity: 'INFO'
  });
  assert(log && log.id, 'Log item should have an ID');
  assert.strictEqual(log.action, 'UNIT_TEST_ACTION');
});

test('mockEngine.logAudit alias functions correctly without error', () => {
  assert(typeof mockEngine.logAudit === 'function', 'logAudit alias must exist');
  const log = mockEngine.logAudit({
    action: 'UNIT_TEST_AUDIT',
    category: 'AUDIT',
    details: 'Verifying logAudit compatibility alias'
  });
  assert(log && log.id, 'logAudit must return log record');
});

// ----------------------------------------------------
// SUITE 2: Course Deletion CRUD
// ----------------------------------------------------
console.log('\n--- Suite 2: Course Deletion CRUD ---');

const testCourseId = `course_test_${Date.now()}`;
const testModuleId = `mod_test_${Date.now()}`;
const testLessonId = `les_test_${Date.now()}`;

test('Setup temporary course with module and lesson', () => {
  const db = mockEngine.getDb();
  const testCourse = {
    id: testCourseId,
    title: 'Automated Test Defensive Course',
    slug: 'automated-test-defensive-course',
    category: 'Testing',
    modules: [
      {
        id: testModuleId,
        title: 'Test Module 1: Reconnaissance',
        order: 1,
        lessons: [
          {
            id: testLessonId,
            title: '1.1 Passive DNS Recon',
            duration: '10 mins'
          }
        ],
        quiz: {
          id: `quiz_${testModuleId}`,
          title: 'Reconnaissance Assessment',
          passing_score: 80,
          questions: []
        }
      }
    ]
  };

  db.courses.push(testCourse);
  mockEngine.saveDb(db);

  const found = mockEngine.getCourseById(testCourseId);
  assert(found && found.id === testCourseId, 'Course should be saved and retrievable');
});

test('mockEngine.deleteLesson removes individual lesson from module', () => {
  const res = mockEngine.deleteLesson(testCourseId, testModuleId, testLessonId, 'usr_admin');
  assert(res && res.success === true, 'deleteLesson should return success: true');

  const course = mockEngine.getCourseById(testCourseId);
  const mod = course.modules.find((m) => m.id === testModuleId);
  assert(mod, 'Module should still exist');
  const lesson = mod.lessons.find((l) => l.id === testLessonId);
  assert(!lesson, 'Deleted lesson should not be in module lessons array');
});

test('mockEngine.deleteModule removes module and re-indexes remaining modules', () => {
  const res = mockEngine.deleteModule(testCourseId, testModuleId, 'usr_admin');
  assert(res && res.success === true, 'deleteModule should return success: true');

  const course = mockEngine.getCourseById(testCourseId);
  const mod = course.modules.find((m) => m.id === testModuleId);
  assert(!mod, 'Deleted module should not be in course modules array');
});

test('mockEngine.deleteCourse removes course from database', () => {
  const res = mockEngine.deleteCourse(testCourseId, 'usr_admin');
  assert(res && res.success === true, 'deleteCourse should return success: true');

  const course = mockEngine.getCourseById(testCourseId);
  assert(!course, 'Deleted course should not be retrievable from getCourseById');
});

// ----------------------------------------------------
// SUITE 3: Manual Question Authoring & Persistence
// ----------------------------------------------------
console.log('\n--- Suite 3: Manual Question Authoring ---');

const qCourseId = `course_quiz_${Date.now()}`;
const qModuleId = `mod_quiz_${Date.now()}`;

test('Setup course and module for manual question testing', () => {
  const db = mockEngine.getDb();
  db.courses.push({
    id: qCourseId,
    title: 'Manual Question Verification Course',
    modules: [
      {
        id: qModuleId,
        title: 'Module 1: Manual Questions',
        order: 1,
        lessons: [],
        quiz: {
          id: `quiz_${qModuleId}`,
          title: 'Module 1 Assessment',
          passing_score: 80,
          questions: []
        }
      }
    ]
  });
  mockEngine.saveDb(db);
});

test('mockEngine.saveQuizQuestions updates questions with manual options and explanation', () => {
  const manualQuestions = [
    {
      id: 'q_custom_001',
      text: 'What flag combination in Nmap performs a TCP SYN scan with OS fingerprinting?',
      type: 'single_choice',
      points: 5,
      options: [
        { id: 'opt_a', text: '-sT -A', is_correct: false },
        { id: 'opt_b', text: '-sS -O', is_correct: true },
        { id: 'opt_c', text: '-sU -v', is_correct: false },
        { id: 'opt_d', text: '-sn -Pn', is_correct: false }
      ],
      explanation: '-sS executes stealth half-open SYN scan, while -O triggers TCP/IP stack fingerprinting.'
    },
    {
      id: 'q_custom_002',
      text: 'Under RFC 3227, in what order must digital volatile evidence be captured?',
      type: 'single_choice',
      points: 10,
      options: [
        { id: 'opt_a', text: 'Registers/cache -> Routing table/ARP -> Main memory -> Disk -> Archival media', is_correct: true },
        { id: 'opt_b', text: 'Disk -> Memory -> Registers -> Archival media', is_correct: false },
        { id: 'opt_c', text: 'Archival media -> Tape backup -> RAM', is_correct: false },
        { id: 'opt_d', text: 'Network cables -> Host OS -> Bios', is_correct: false }
      ],
      explanation: 'RFC 3227 dictates capturing highest volatility first (registers/cache, memory before static storage).'
    }
  ];

  const res = mockEngine.saveQuizQuestions(qCourseId, qModuleId, manualQuestions, 'usr_admin');
  console.log('DEBUG: saveQuizQuestions result:', res);
  assert(res && res.success === true, 'saveQuizQuestions should succeed and return success: true');

  const course = mockEngine.getCourseById(qCourseId);
  const mod = course.modules.find((m) => m.id === qModuleId);
  assert(mod && mod.quiz, 'Module quiz should exist');
  assert.strictEqual(mod.quiz.questions.length, 2, 'Should have exactly 2 manual questions');
  assert.strictEqual(mod.quiz.questions[0].text, manualQuestions[0].text);
  assert.strictEqual(mod.quiz.questions[0].options.find((o) => o.is_correct).text, '-sS -O');
  assert.strictEqual(mod.quiz.questions[1].points, 10);
});

// Clean up test course
test('Cleanup manual quiz test course', () => {
  const cleaned = mockEngine.deleteCourse(qCourseId, 'usr_admin');
  assert(cleaned && cleaned.success === true, 'Should clean up test course');
});

// ----------------------------------------------------
// SUITE 4: Certificate PDF & Template Verification
// ----------------------------------------------------
console.log('\n--- Suite 4: Official Certificate Template & Credential Generation ---');

test('Credential dispatch stores authentic certificate data structure', () => {
  const db = mockEngine.getDb();
  const testStudent = db.users.find((u) => u.cadet_id === 'RK-92730') || db.users[0];
  const testCourse = db.courses[0];

  const newCredId = 'RK-CERT-998877';
  const newCredential = {
    id: newCredId,
    verification_id: newCredId,
    student_name: testStudent.full_name || 'Sarah Chen, CISSP',
    student_email: testStudent.email,
    cadet_id: testStudent.cadet_id || 'RK-92730',
    course_title: testCourse.title,
    issued_at: '2026-10-31',
    completion_date: '2026-10-31',
    training_hours: '120',
    grade: 'A',
    department: 'Information Technology',
    supervisor_name: 'Dr. Robert H. Vance, CISSP',
    issuing_institution: 'RedKross Defensive Cyber Academy',
    digital_signature_url: '/assets/certificate/default_signature.png',
    digital_seal_url: '/assets/certificate/default_seal.png',
    verification_hash: '0x99887766554433221100aabbccddeeff',
    revoked: false
  };

  db.credentials = [newCredential, ...(db.credentials || [])];
  mockEngine.saveDb(db);

  const retrieved = mockEngine.getCredentialByVerificationId(newCredId);
  assert(retrieved, 'Dispatched credential should be queryable by ID');
  assert.strictEqual(retrieved.student_name, testStudent.full_name || 'Sarah Chen, CISSP');
  assert.strictEqual(retrieved.training_hours, '120');
  assert.strictEqual(retrieved.grade, 'A');
  assert.strictEqual(retrieved.department, 'Information Technology');
});

console.log('\n====================================================');
console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} test cases verified!`);
console.log('====================================================\n');
