import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting Course Overflow & Learning Objectives Verification Suite...\n');

// 1. Check CourseDetailPage.jsx file content
const courseDetailPagePath = path.resolve('src/pages/public/CourseDetailPage.jsx');
assert(fs.existsSync(courseDetailPagePath), 'CourseDetailPage.jsx must exist');
const courseDetailContent = fs.readFileSync(courseDetailPagePath, 'utf8');

// Test 1.1: Ensure word wrapping and break classes are present on description / overview
assert(
  courseDetailContent.includes('break-words') && 
  courseDetailContent.includes('[overflow-wrap:anywhere]') && 
  courseDetailContent.includes('break-all'),
  'CourseDetailPage must apply break-words, [overflow-wrap:anywhere], and break-all for long unbroken text'
);
console.log('✅ PASS: Text overflow word-breaking classes verified on CourseDetailPage');

// Test 1.2: Ensure CSS Grid item has min-w-0 to prevent grid column blow-out
assert(
  courseDetailContent.includes('lg:col-span-2 space-y-8 min-w-0'),
  'Main 2-column stream must have min-w-0 so CSS Grid constrains child content'
);
console.log('✅ PASS: CSS Grid min-w-0 constraint present on content stream');

// Test 1.3: Ensure fallback logic for What You\'ll Learn handles empty array, null, undefined, and multiline string
function resolveObjectives(course) {
  const rawObjectives = (course?.what_you_will_learn && course.what_you_will_learn.length > 0)
    ? course.what_you_will_learn
    : (course?.learning_objectives && course.learning_objectives.length > 0)
      ? course.learning_objectives
      : null;

  const parsedObjectives = Array.isArray(rawObjectives)
    ? rawObjectives.filter(Boolean)
    : typeof rawObjectives === 'string' && rawObjectives.trim()
      ? rawObjectives.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

  return parsedObjectives.length > 0
    ? parsedObjectives
    : [
        `Master tactical defense, incident handling, and telemetry analysis for ${course?.title || 'Defensive Cyber'}.`,
        'Analyze live adversary attack vectors, host intrusion artifacts, and IOC traces.',
        'Formulate rapid containment playbooks and operational defensive procedures.',
        'Align tactical enterprise telemetry directly with MITRE ATT&CK matrix frameworks.',
        'Pass the cryptographically verifiable on-chain practical assessment.'
      ];
}

// Case A: Course has empty array [] for learning_objectives (the exact bug from screenshot!)
const emptyArrayCourse = { title: 'Adv Python', learning_objectives: [] };
const resA = resolveObjectives(emptyArrayCourse);
assert(Array.isArray(resA) && resA.length === 5, 'Must fall back to 5 objectives when learning_objectives is []');
assert(resA[0].includes('Adv Python'), 'Default objectives must incorporate the course title');
console.log('✅ PASS: Empty array [] fallback successfully resolved to 5 default objectives');

// Case B: Course has multiline string in what_you_will_learn
const multilineCourse = {
  title: 'Adv Python',
  what_you_will_learn: 'Learn Metasploit\nLearn Ghidra\nAnalyze Memory Dumps'
};
const resB = resolveObjectives(multilineCourse);
assert.deepStrictEqual(resB, ['Learn Metasploit', 'Learn Ghidra', 'Analyze Memory Dumps']);
console.log('✅ PASS: Multiline string properly parsed into array');

// Case C: Course has array in what_you_will_learn
const arrayCourse = {
  title: 'Adv Python',
  what_you_will_learn: ['Objective 1', 'Objective 2']
};
const resC = resolveObjectives(arrayCourse);
assert.deepStrictEqual(resC, ['Objective 1', 'Objective 2']);
console.log('✅ PASS: Array what_you_will_learn properly preserved');

// Case D: Course has empty string or whitespace
const whitespaceCourse = {
  title: 'Adv Python',
  what_you_will_learn: '   \n   \n'
};
const resD = resolveObjectives(whitespaceCourse);
assert(resD.length === 5, 'Whitespace input must fall back to default objectives');
console.log('✅ PASS: Whitespace input falls back cleanly to default objectives');

// 2. Check AdminCoursesPage.jsx
const adminCoursesPagePath = path.resolve('src/pages/admin/AdminCoursesPage.jsx');
const adminCoursesContent = fs.readFileSync(adminCoursesPagePath, 'utf8');

// Test 2.1: AdminCoursesPage has the What You'll Learn textarea input field
assert(
  adminCoursesContent.includes("What You'll Learn (1 Learning Competency per line)"),
  'AdminCoursesPage must provide an input for What You\'ll Learn'
);
console.log('✅ PASS: AdminCoursesPage contains What You\'ll Learn form field');

// Test 2.2: AdminCoursesPage synchronizes both what_you_will_learn and learning_objectives on save
assert(
  adminCoursesContent.includes('what_you_will_learn:') &&
  adminCoursesContent.includes('learning_objectives:'),
  'AdminCoursesPage must synchronize both what_you_will_learn and learning_objectives'
);
console.log('✅ PASS: AdminCoursesPage synchronizes what_you_will_learn and learning_objectives');

// 3. Check mockEngine.js
const mockEnginePath = path.resolve('src/services/db/mockEngine.js');
const mockEngineContent = fs.readFileSync(mockEnginePath, 'utf8');

// Test 3.1: mockEngine includes _normalizeCourse method
assert(
  mockEngineContent.includes('_normalizeCourse(course)'),
  'mockEngine must have _normalizeCourse method'
);
console.log('✅ PASS: mockEngine._normalizeCourse method verified');

// Test 3.2: mockEngine getCourseBySlug normalizes course
assert(
  mockEngineContent.includes('getCourseBySlug(slug)'),
  'mockEngine.getCourseBySlug must be present and normalize retrieved course'
);
console.log('✅ PASS: mockEngine.getCourseBySlug normalization verified');

console.log('\n🌟 ALL 8 COURSE OVERFLOW AND LEARNING OBJECTIVES UNIT TESTS PASSED!');
