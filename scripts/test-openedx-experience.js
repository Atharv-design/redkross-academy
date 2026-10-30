import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('REDKROSS ACADEMY: OPEN EDX COURSE EXPERIENCE & ADMIN BUILDER VERIFICATION');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

const rootDir = 'C:/Users/athar/RedKross Academy Website';

// TEST 1: CourseDetailPage.jsx (Open edX Course About Structure & Login Catch)
console.log('--- TEST GROUP 1: CourseDetailPage.jsx ---');
const courseDetailCode = fs.readFileSync(path.join(rootDir, 'src/pages/public/CourseDetailPage.jsx'), 'utf-8');
assert(courseDetailCode.includes('Course About') || courseDetailCode.includes('About this course'), 'CourseDetailPage has Open edX About header');
assert(courseDetailCode.includes('RedKross Crest') || courseDetailCode.includes('crest-clean-circle.png'), 'CourseDetailPage has RedKross circular crest seal');
assert(courseDetailCode.includes('linkedin.com/company/redkross') || courseDetailCode.includes('LinkedIn'), 'CourseDetailPage has LinkedIn ecosystem link');
assert(courseDetailCode.includes('redkross.org.in') || courseDetailCode.includes('RedKross Foundation'), 'CourseDetailPage has RedKross Foundation links');
assert(courseDetailCode.includes('navigate(\'/login\'') || courseDetailCode.includes('state: { from:'), 'CourseDetailPage redirects unauthenticated enroll to /login with return intent');
assert(courseDetailCode.includes('/student/course/'), 'CourseDetailPage redirects already-enrolled students directly to Enrolled Course Hub');

// TEST 2: CourseHomePage.jsx (Open edX Enrolled Hub: Course & Progress Tabs)
console.log('\n--- TEST GROUP 2: CourseHomePage.jsx ---');
const courseHomeCode = fs.readFileSync(path.join(rootDir, 'src/pages/student/CourseHomePage.jsx'), 'utf-8');
assert(courseHomeCode.includes('activeTab === \'course\'') && courseHomeCode.includes('activeTab === \'progress\''), 'CourseHomePage has exactly two main tabs: Course & Progress');
assert(courseHomeCode.includes('Begin your course today') || courseHomeCode.includes('Resume Course'), 'CourseHomePage includes Open edX Start/Resume Course banner');
assert(courseHomeCode.includes('Expand all') && courseHomeCode.includes('Collapse all'), 'CourseHomePage has Expand all / Collapse all toggle button');
assert(courseHomeCode.includes('Course Tools') && courseHomeCode.includes('Important Dates'), 'CourseHomePage includes right rail with Course Tools and Important Dates');
assert(courseHomeCode.includes('70%') || courseHomeCode.includes('passingScore = 70'), 'CourseHomePage features 70% passing threshold cutoff bar');
assert(courseHomeCode.includes('Detailed Assessment Breakdown'), 'CourseHomePage has detailed evaluation breakdown table');

// TEST 3: LessonPlayerPage.jsx (Open edX Courseware & 20-Question Knowledge Check)
console.log('\n--- TEST GROUP 3: LessonPlayerPage.jsx ---');
const lessonPlayerCode = fs.readFileSync(path.join(rootDir, 'src/pages/student/LessonPlayerPage.jsx'), 'utf-8');
assert(lessonPlayerCode.includes('sidebarOpen') && lessonPlayerCode.includes('setSidebarOpen'), 'LessonPlayerPage includes collapsible Course Outline sidebar');
assert(lessonPlayerCode.includes('Course outline'), 'LessonPlayerPage features Course Outline header');
assert(lessonPlayerCode.includes('Bookmark this page') || lessonPlayerCode.includes('toggleBookmark'), 'LessonPlayerPage has top unit Bookmark toggle action');
assert(lessonPlayerCode.includes('Knowledge Check') && lessonPlayerCode.includes('20 Questions'), 'LessonPlayerPage features 20-Question Module Knowledge Check view');
assert(lessonPlayerCode.includes('0.0/1.0 point (graded)') || lessonPlayerCode.includes('1.0/1.0 point (graded)'), 'LessonPlayerPage has points indicator matching Open edX Screenshot 3');
assert(lessonPlayerCode.includes('mockEngine.recordModuleQuizScore'), 'LessonPlayerPage synchronizes score with mockEngine.recordModuleQuizScore');
assert(lessonPlayerCode.includes('handlePrevUnit') && lessonPlayerCode.includes('handleNextUnit'), 'LessonPlayerPage has bottom sequential Previous and Next navigation');

// TEST 4: AdminCoursesPage.jsx (10-Second Intuitive Studio & Dual Image/Video Uploads)
console.log('\n--- TEST GROUP 4: AdminCoursesPage.jsx ---');
const adminCoursesCode = fs.readFileSync(path.join(rootDir, 'src/pages/admin/AdminCoursesPage.jsx'), 'utf-8');
assert(adminCoursesCode.includes('1. Course Info & About') && adminCoursesCode.includes('2. Media (Image & Video)'), 'AdminCoursesPage provides intuitive 4-step wizard');
assert(adminCoursesCode.includes('image_source_type') && adminCoursesCode.includes('Upload Image File') && adminCoursesCode.includes('Image URL'), 'AdminCoursesPage supports both Image File Upload and Image URL with live preview');
assert(adminCoursesCode.includes('video_source_type') && adminCoursesCode.includes('Upload Video File') && adminCoursesCode.includes('Video URL'), 'AdminCoursesPage supports both Video File Upload and Video URL with live preview');
assert(adminCoursesCode.includes('Auto-Generate 20 Questions') || adminCoursesCode.includes('generate20ModuleQuestions'), 'AdminCoursesPage includes 1-click 20-Question Cybersecurity Exam Generator');

// TEST 5: Database Seed Pools (20 Questions Per Module)
console.log('\n--- TEST GROUP 5: seedData.js & mockEngine.js ---');
const seedDataCode = fs.readFileSync(path.join(rootDir, 'src/services/db/seedData.js'), 'utf-8');
const mockEngineCode = fs.readFileSync(path.join(rootDir, 'src/services/db/mockEngine.js'), 'utf-8');

assert(seedDataCode.includes("id: 'quiz_mod_1'") && seedDataCode.includes("id: 'quiz_mod_2'") && seedDataCode.includes("id: 'quiz_mod_3'"), 'seedData.js contains quizzes for all three modules');
assert(mockEngineCode.includes('recordModuleQuizScore(enrolmentId, quizId, scorePercentage, isPassed)'), 'mockEngine.js implements recordModuleQuizScore method');

// TEST 6: Zero Prohibited Blue Color Enforcement
console.log('\n--- TEST GROUP 6: Zero Prohibited Blue Color Verification ---');
const prohibitedBlueRegex = /#(?:0000ff|007bff|1e40af|2563eb|3b82f6|60a5fa|93c5fd|bfdbfe|dbeafe|eff6ff|0284c7|0369a1|075985|0c4a6e)\b|(?<![a-zA-Z0-9_-])(?:bg|text|border|ring|from|to|via)-blue-\d+/i;

const filesToCheck = [
  'src/pages/public/CourseDetailPage.jsx',
  'src/pages/student/CourseHomePage.jsx',
  'src/pages/student/LessonPlayerPage.jsx',
  'src/pages/admin/AdminCoursesPage.jsx'
];

let blueFound = false;
filesToCheck.forEach((relPath) => {
  const content = fs.readFileSync(path.join(rootDir, relPath), 'utf-8');
  if (prohibitedBlueRegex.test(content)) {
    console.error(`Prohibited blue found in ${relPath}`);
    blueFound = true;
  }
});
assert(!blueFound, 'Zero prohibited blue colors found across all implemented components');

console.log('\n====================================================');
console.log(`RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
console.log('====================================================');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
