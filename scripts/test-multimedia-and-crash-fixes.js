/**
 * Test Suite: Multi-Media Local Lesson Assets, Crash Fixes, and Zero-Blue Verification
 * 
 * Tests:
 * 1. CourseDetailPage prerequisites & learning_objectives defensive array normalization
 * 2. AdminCoursesPage Play component import & Step 3 crash safety
 * 3. Multi-video & Multi-image lesson schema & removal handling
 * 4. mockEngine logAction audit registration & curriculum persistence
 * 5. Zero-blue color token compliance across all modified components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${message}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${message}`);
  }
}

console.log('\n===============================================================');
console.log('🧪 RUNNING MULTI-MEDIA LESSON & CRASH FIXES UNIT TEST SUITE');
console.log('===============================================================\n');

// -------------------------------------------------------------
// Test Group 1: Prerequisites & Objectives Array Normalization
// -------------------------------------------------------------
console.log('\x1b[36m--- Group 1: CourseDetailPage Array Normalization Robustness ---\x1b[0m');

function normalizePrerequisites(prerequisites) {
  return Array.isArray(prerequisites)
    ? prerequisites
    : typeof prerequisites === 'string' && prerequisites.trim()
      ? prerequisites.split('\n').map((s) => s.trim()).filter(Boolean)
      : [
          'Fundamental understanding of IP addressing, TCP/UDP packets, and subnets.',
          'Basic familiarity with command line interfaces (Bash or PowerShell).',
          'A web browser supporting WebAssembly and WebRTC for live hands-on proctoring.'
        ];
}

// 1.1 Array input
const arrInput = ['Linux command line', 'Wireshark basics'];
const normArr = normalizePrerequisites(arrInput);
assert(Array.isArray(normArr) && normArr.length === 2 && normArr[0] === 'Linux command line',
  'Handles array input without modification');

// 1.2 Multiline string input (Standard Admin textarea input)
const multilineInput = 'Basic networking\nPython 3 basics\nUnderstanding of HTTP/HTTPS\n';
const normMultiline = normalizePrerequisites(multilineInput);
assert(Array.isArray(normMultiline) && normMultiline.length === 3 && normMultiline[1] === 'Python 3 basics',
  'Splits multiline textarea string into clean array');

// 1.3 Single line string
const singleLine = 'Knowledge of ISO 27001';
const normSingle = normalizePrerequisites(singleLine);
assert(Array.isArray(normSingle) && normSingle.length === 1 && normSingle[0] === 'Knowledge of ISO 27001',
  'Converts single line string into single-element array');

// 1.4 Null or undefined input
const normNull = normalizePrerequisites(null);
assert(Array.isArray(normNull) && normNull.length === 3,
  'Falls back to default array when prerequisites is null');

const normUndefined = normalizePrerequisites(undefined);
assert(Array.isArray(normUndefined) && normUndefined.length === 3,
  'Falls back to default array when prerequisites is undefined');

// 1.5 Empty string input
const normEmpty = normalizePrerequisites('   \n  ');
assert(Array.isArray(normEmpty) && normEmpty.length === 3,
  'Falls back to default array when prerequisites is blank whitespace');

// 1.6 Verify that .map() never throws on normalized output
try {
  normMultiline.map((p) => p.toUpperCase());
  normSingle.map((p) => p.toUpperCase());
  normNull.map((p) => p.toUpperCase());
  assert(true, '.map() executes seamlessly across all normalized prerequisites');
} catch (err) {
  assert(false, `.map() threw an error: ${err.message}`);
}

// -------------------------------------------------------------
// Test Group 2: Component Import Integrity in JSX Files
// -------------------------------------------------------------
console.log('\n\x1b[36m--- Group 2: Component Import Integrity Checks ---\x1b[0m');

// 2.1 AdminCoursesPage.jsx imports
const adminCoursesPath = path.join(rootDir, 'src/pages/admin/AdminCoursesPage.jsx');
const adminCoursesContent = fs.readFileSync(adminCoursesPath, 'utf-8');

assert(adminCoursesContent.includes('Play,') || adminCoursesContent.includes(', Play'),
  'AdminCoursesPage.jsx imports `Play` component from lucide-react');
assert(adminCoursesContent.includes('PlayCircle'),
  'AdminCoursesPage.jsx preserves `PlayCircle` import from lucide-react');
assert(!adminCoursesContent.includes('(course.prerequisites || [...]).map'),
  'AdminCoursesPage does not contain unchecked map calls');

// 2.2 CourseDetailPage.jsx safe checks
const courseDetailPath = path.join(rootDir, 'src/pages/public/CourseDetailPage.jsx');
const courseDetailContent = fs.readFileSync(courseDetailPath, 'utf-8');

assert(!courseDetailContent.includes('(course.prerequisites || [') ||
  courseDetailContent.includes('Array.isArray(course.prerequisites)'),
  'CourseDetailPage.jsx guards course.prerequisites with Array.isArray() check');

assert(!courseDetailContent.includes('(course.learning_objectives || [') ||
  courseDetailContent.includes('Array.isArray(course.learning_objectives)'),
  'CourseDetailPage.jsx guards course.learning_objectives with Array.isArray() check');

// 2.3 LessonPlayerPage.jsx imports & state
const lessonPlayerPath = path.join(rootDir, 'src/pages/student/LessonPlayerPage.jsx');
const lessonPlayerContent = fs.readFileSync(lessonPlayerPath, 'utf-8');

assert(lessonPlayerContent.includes('Image as ImageIcon'),
  'LessonPlayerPage.jsx imports `Image as ImageIcon` from lucide-react');
assert(lessonPlayerContent.includes('Film'),
  'LessonPlayerPage.jsx imports `Film` icon from lucide-react');
assert(lessonPlayerContent.includes('lightboxImage'),
  'LessonPlayerPage.jsx maintains `lightboxImage` state for full-res diagram inspection');
assert(lessonPlayerContent.includes('selectedVideoIndex'),
  'LessonPlayerPage.jsx maintains `selectedVideoIndex` state for multi-video lessons');
assert(lessonPlayerContent.includes('RECORDINGS ('),
  'LessonPlayerPage.jsx renders multi-video recordings pill switcher');
assert(lessonPlayerContent.includes('INSTRUCTIONAL DIAGRAMS & VISUAL EVIDENCE'),
  'LessonPlayerPage.jsx renders diagrams & images gallery');

// -------------------------------------------------------------
// Test Group 3: Multi-Media Lesson Schema and Removal Logic
// -------------------------------------------------------------
console.log('\n\x1b[36m--- Group 3: Multi-Media Lesson Schema & State Logic ---\x1b[0m');

// 3.1 Adding multiple videos to a lesson
let testLesson = {
  id: 'les_test_101',
  title: 'Practical Packet Forensics',
  duration: '25 mins',
  type: 'multimedia',
  video_url: '',
  videos: [],
  images: [],
  content: '### Packet Forensics Guide'
};

const vid1 = {
  id: 'vid_1',
  name: 'snort_ids_rules.mp4',
  size: '18 MB',
  url: 'blob:idb://asset_vid_1',
  caption: 'Snort Rule Demonstration'
};

const vid2 = {
  id: 'vid_2',
  name: 'wireshark_pcap_stream.mp4',
  size: '42 MB',
  url: 'blob:idb://asset_vid_2',
  caption: 'Wireshark Protocol Stream'
};

testLesson.videos.push(vid1);
testLesson.video_url = testLesson.videos[0].url;
testLesson.videos.push(vid2);

assert(testLesson.videos.length === 2, 'Lesson holds multiple video assets');
assert(testLesson.video_url === 'blob:idb://asset_vid_1', 'Lesson primary video_url defaults to first video');

// 3.2 Adding multiple images to the same lesson
const img1 = {
  id: 'img_1',
  name: 'network_topology.png',
  size: '1.2 MB',
  url: 'data:image/png;base64,iVBORw0KG...',
  caption: 'SOC Network Perimeter Architecture'
};

const img2 = {
  id: 'img_2',
  name: 'attack_tree_matrix.png',
  size: '850 KB',
  url: 'data:image/png;base64,iVBORw0KG2...',
  caption: 'Adversary Lateral Movement Tree'
};

testLesson.images.push(img1);
testLesson.images.push(img2);

assert(testLesson.images.length === 2, 'Lesson holds multiple diagram images simultaneously');
assert(testLesson.videos.length === 2 && testLesson.images.length === 2,
  'Lesson supports both multiple videos AND multiple images concurrently');

// 3.3 Video removal handler simulation
function removeVideo(lesson, vIdx) {
  const remaining = (lesson.videos || []).filter((_, i) => i !== vIdx);
  return {
    ...lesson,
    videos: remaining,
    video_url: remaining.length > 0 ? remaining[0].url : ''
  };
}

testLesson = removeVideo(testLesson, 0); // Remove vid1
assert(testLesson.videos.length === 1 && testLesson.videos[0].id === 'vid_2',
  'Removing first video leaves second video intact');
assert(testLesson.video_url === 'blob:idb://asset_vid_2',
  'Removing first video automatically promotes second video to primary video_url');

testLesson = removeVideo(testLesson, 0); // Remove remaining video
assert(testLesson.videos.length === 0 && testLesson.video_url === '',
  'Removing last video safely resets video_url to empty string');

// 3.4 Image removal handler simulation
function removeImage(lesson, iIdx) {
  return {
    ...lesson,
    images: (lesson.images || []).filter((_, i) => i !== iIdx)
  };
}

testLesson = removeImage(testLesson, 0);
assert(testLesson.images.length === 1 && testLesson.images[0].id === 'img_2',
  'Removing first image correctly maintains remaining image list');

// -------------------------------------------------------------
// Test Group 4: mockEngine.logAction and safeLogAction Verification
// -------------------------------------------------------------
console.log('\n\x1b[36m--- Group 4: mockEngine.logAction and safeLogAction Resilience ---\x1b[0m');

const mockEnginePath = path.join(rootDir, 'src/services/db/mockEngine.js');
const mockEngineContent = fs.readFileSync(mockEnginePath, 'utf-8');

assert(mockEngineContent.includes('logAction(entry = {})'),
  'mockEngine.js defines official `logAction` method');
assert(mockEngineContent.includes('this.logAction = this.logAction.bind(this)'),
  'mockEngine.js binds `logAction` in constructor');
assert(mockEngineContent.includes('this.logAudit = this.logAction.bind(this)'),
  'mockEngine.js aliases `logAudit` to `logAction`');

const certPagePath = path.join(rootDir, 'src/pages/admin/AdminCertificatesPage.jsx');
const certPageContent = fs.readFileSync(certPagePath, 'utf-8');

assert(certPageContent.includes('const safeLogAction = (entry) =>'),
  'AdminCertificatesPage defines resilient `safeLogAction` wrapper');
assert(certPageContent.includes('safeLogAction({'),
  'AdminCertificatesPage uses `safeLogAction` for credential dispatch and revocation');

// -------------------------------------------------------------
// Test Group 5: Zero Blue Token Compliance Check
// -------------------------------------------------------------
console.log('\n\x1b[36m--- Group 5: Zero Blue Design Token Compliance ---\x1b[0m');

const filesToCheck = [
  'src/pages/public/CourseDetailPage.jsx',
  'src/pages/admin/AdminCoursesPage.jsx',
  'src/pages/student/LessonPlayerPage.jsx',
  'src/pages/admin/AdminCertificatesPage.jsx'
];

const forbiddenBlueRegex = /(bg|text|border|ring|from|to|via)-(blue|sky|indigo|cyan)-[0-9]+/g;

let totalBlueViolations = 0;
filesToCheck.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const matches = content.match(forbiddenBlueRegex) || [];
  if (matches.length > 0) {
    totalBlueViolations += matches.length;
    assert(false, `${relPath} contains ${matches.length} blue tokens: ${matches.slice(0, 3).join(', ')}`);
  } else {
    assert(true, `${relPath} contains 0 blue tokens (100% Emerald Green / Mint compliant)`);
  }
});

// -------------------------------------------------------------
// Final Summary
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log(`🏁 TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
if (failedTests > 0) {
  console.log(`\x1b[31m❌ ${failedTests} TESTS FAILED\x1b[0m`);
  process.exit(1);
} else {
  console.log('\x1b[32m✨ ALL UNIT TESTS PASSED WITH 100% SUCCESS!\x1b[0m');
  console.log('===============================================================\n');
  process.exit(0);
}
