import fs from 'fs';
import path from 'path';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { CYBER_COURSES } from '../src/services/db/cyberCourses.js';

console.log('================================================================');
console.log('=== EMPIRICAL CHALLENGER STRESS HARNESS: MILESTONE 3 VERIFIER ===');
console.log('================================================================\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  } else {
    console.log(`[PASS] ${message}`);
    passedTests++;
  }
}

const BASE_DIR = 'C:\\Users\\athar\\RedKross Academy Website';
const APP_PATH = path.join(BASE_DIR, 'src', 'App.jsx');
const DETAIL_PATH = path.join(BASE_DIR, 'src', 'pages', 'public', 'CyberCourseDetailPage.jsx');
const DASHBOARD_PATH = path.join(BASE_DIR, 'src', 'pages', 'student', 'CyberStudentDashboard.jsx');
const CARD_PATH = path.join(BASE_DIR, 'src', 'components', 'cyber', 'CyberLearningCard.jsx');

// ============================================================================
// SUITE 1: FILE EXISTENCE & CODEBASE REPOSITORY VERIFICATION
// ============================================================================
console.log('--- SUITE 1: FILE INTEGRITY ---');
assert(fs.existsSync(APP_PATH), 'App.jsx exists');
assert(fs.existsSync(DETAIL_PATH), 'CyberCourseDetailPage.jsx exists in src/pages/public/');
assert(fs.existsSync(DASHBOARD_PATH), 'CyberStudentDashboard.jsx exists in src/pages/student/');
assert(fs.existsSync(CARD_PATH), 'CyberLearningCard.jsx exists in src/components/cyber/');

const appSrc = fs.readFileSync(APP_PATH, 'utf-8');
const detailSrc = fs.readFileSync(DETAIL_PATH, 'utf-8');
const dashboardSrc = fs.readFileSync(DASHBOARD_PATH, 'utf-8');
const cardSrc = fs.readFileSync(CARD_PATH, 'utf-8');

// ============================================================================
// SUITE 2: EMPIRICAL DATA ISOLATION HARNESS (CRUCIAL M3 CONTRACT)
// ============================================================================
console.log('\n--- SUITE 2: EMPIRICAL DATA ISOLATION & QUERY PARTITIONING ---');
const testCadetId = 'usr_cadet_challenger_m3_' + Date.now();

// Enroll cadet in both cyber and psych courses
const cyberEnr = mockEngine.enrolStudent(testCadetId, 'crs_full_stack_web_dev');
const psychEnr = mockEngine.enrolStudent(testCadetId, 'crs_psych_cbt');

assert(cyberEnr && cyberEnr.id, 'Enrolled cadet in crs_full_stack_web_dev (Cybersecurity)');
assert(psychEnr && psychEnr.id, 'Enrolled cadet in crs_psych_cbt (Psychology)');

// Strict partition queries
const cyberEnrolments = mockEngine.getEnrolmentsForUser(testCadetId, 'cybersecurity');
const psychEnrolments = mockEngine.getEnrolmentsForUser(testCadetId, 'psychology');
const allEnrolments = mockEngine.getEnrolmentsForUser(testCadetId);

assert(cyberEnrolments.length === 1, `Cybersecurity query returns exactly 1 enrollment (found ${cyberEnrolments.length})`);
assert(cyberEnrolments[0].course_id === 'crs_full_stack_web_dev', 'Cyber enrollment is strictly crs_full_stack_web_dev');

// Check that 0 psychology courses are returned in cyber query
const psychLeakedInCyber = cyberEnrolments.filter(e => {
  const c = mockEngine.getCourseById(e.course_id);
  return c?.division === 'psychology' || e.course_id === 'crs_psych_cbt';
});
assert(psychLeakedInCyber.length === 0, 'ZERO psychology courses returned in cybersecurity enrollment query');

assert(psychEnrolments.length === 1, `Psychology query returns exactly 1 enrollment (found ${psychEnrolments.length})`);
assert(psychEnrolments[0].course_id === 'crs_psych_cbt', 'Psychology enrollment is strictly crs_psych_cbt');

const cyberLeakedInPsych = psychEnrolments.filter(e => {
  const c = mockEngine.getCourseById(e.course_id);
  return c?.division === 'cybersecurity' || e.course_id === 'crs_full_stack_web_dev';
});
assert(cyberLeakedInPsych.length === 0, 'ZERO cybersecurity courses returned in psychology enrollment query');

assert(allEnrolments.length === 2, `Unpartitioned query preserves backwards compatibility (found ${allEnrolments.length})`);

// Division stats isolation
const cyberStats = mockEngine.getStudentStatsByDivision(testCadetId, 'cybersecurity');
const psychStats = mockEngine.getStudentStatsByDivision(testCadetId, 'psychology');

assert(cyberStats.activeCourses === 1, `Cyber stats activeCourses is strictly 1 (found ${cyberStats.activeCourses})`);
assert(psychStats.activeCourses === 1, `Psych stats activeCourses is strictly 1 (found ${psychStats.activeCourses})`);

// Non-existent division stress test
const emptyStats = mockEngine.getStudentStatsByDivision(testCadetId, 'non_existent_division');
assert(emptyStats.activeCourses === 0, 'Query for non-existent division returns 0 activeCourses safely');

// ============================================================================
// SUITE 3: CYBER COURSE DETAIL PAGE (HUD TELEMETRY TABS & FEATURES)
// ============================================================================
console.log('\n--- SUITE 3: CYBER COURSE DETAIL PAGE SPECIFICATION ---');

// Check all 6 HUD Telemetry Tabs
const requiredTabIds = ['overview', 'outcomes', 'syllabus', 'eligibility', 'certification', 'faqs'];
requiredTabIds.forEach(tabId => {
  assert(detailSrc.includes(`id: '${tabId}'`), `HUD Tab definition contains id: '${tabId}'`);
  assert(detailSrc.includes(`activeTab === '${tabId}'`), `HUD Tab render branch exists for: '${tabId}'`);
});

assert(detailSrc.includes('01 // OVERVIEW'), 'Tab 1 label matches: 01 // OVERVIEW');
assert(detailSrc.includes('02 // OUTCOMES'), 'Tab 2 label matches: 02 // OUTCOMES');
assert(detailSrc.includes('03 // SYLLABUS OUTLINE'), 'Tab 3 label matches: 03 // SYLLABUS OUTLINE');
assert(detailSrc.includes('04 // ELIGIBILITY'), 'Tab 4 label matches: 04 // ELIGIBILITY');
assert(detailSrc.includes('05 // CERTIFICATION'), 'Tab 5 label matches: 05 // CERTIFICATION');
assert(detailSrc.includes('06 // FAQS'), 'Tab 6 label matches: 06 // FAQS');

// Check features
assert(detailSrc.includes('expandAllModules'), 'Syllabus accordion includes expandAllModules');
assert(detailSrc.includes('collapseAllModules'), 'Syllabus accordion includes collapseAllModules');
assert(detailSrc.includes('sampleSha256'), 'Cryptographic SHA-256 proof spec is declared');
assert(detailSrc.includes('copyHashToClipboard'), 'Copy hash to clipboard feature implemented');
assert(detailSrc.includes('handleEnrol'), 'Cadet instant enrolment handler implemented');
assert(detailSrc.includes('#FF7A00'), 'Amber Orange token (#FF7A00) present in styling');
assert(detailSrc.includes('#FFA439'), 'Amber Gold token (#FFA439) present in styling');
assert(detailSrc.includes('data-academy-theme="cybersecurity"'), 'Theme root token attribute data-academy-theme="cybersecurity" present');

// Course resolution verification
const resolvedBySlug = mockEngine.getCourseBySlug('full-stack-web-development-fundamentals-to-deployment');
assert(resolvedBySlug && resolvedBySlug.id === 'crs_full_stack_web_dev', 'mockEngine resolves course by exact slug');
const resolvedById = mockEngine.getCourseById('crs_full_stack_web_dev');
assert(resolvedById && resolvedById.title.includes('Full Stack Web Development'), 'mockEngine resolves course by id');

// ============================================================================
// SUITE 4: CYBER STUDENT DASHBOARD (KALI LAUNCHER & CERT PROOFS)
// ============================================================================
console.log('\n--- SUITE 4: CYBER STUDENT DASHBOARD SPECIFICATION ---');

assert(dashboardSrc.includes('CyberLabDesktopWindow'), 'CyberLabDesktopWindow component imported');
assert(dashboardSrc.includes('<CyberLabDesktopWindow'), 'CyberLabDesktopWindow mounted in JSX');
assert(dashboardSrc.includes('isLabOpen'), 'Kali CyberLab state modal toggle implemented (isLabOpen)');
assert(dashboardSrc.includes('handleLaunchLab'), '1-Click Kali CyberLab launcher handler implemented');
assert(dashboardSrc.includes('Launch Kali CyberLab V3'), '1-Click Kali CyberLab V3 action button rendered');

// Data scoping check
assert(dashboardSrc.includes("mockEngine.getEnrolmentsForUser(currentUser.id, 'cybersecurity')"), 'Dashboard explicitly filters enrollments with division="cybersecurity"');
assert(dashboardSrc.includes("mockEngine.getStudentStatsByDivision(currentUser.id, 'cybersecurity')"), 'Dashboard explicitly scopes stats with division="cybersecurity"');

// SHA-256 Certificate Proofs
assert(dashboardSrc.includes('Cryptographic SHA-256 Certificate Proofs'), 'SHA-256 Certificate Proofs section header present');
assert(dashboardSrc.includes('/verify/'), 'Public verification link (/verify/:id) integrated');
assert(dashboardSrc.includes('handleCopyHash'), 'SHA-256 hash copy function integrated');

// Guarantee zero psychology leakage
assert(!dashboardSrc.includes("'psychology'"), "CyberStudentDashboard contains zero 'psychology' division queries");

// ============================================================================
// SUITE 5: CYBER LEARNING CARD ROUTING
// ============================================================================
console.log('\n--- SUITE 5: CYBER LEARNING CARD IN-BRANCH LINKING ---');

assert(cardSrc.includes('/academy/cybersecurity/courses/'), 'CyberLearningCard links to /academy/cybersecurity/courses/${courseSlug}');
assert(cardSrc.includes('course || track'), 'CyberLearningCard supports both track and course props');

// ============================================================================
// SUITE 6: ROUTE REGISTRATIONS IN APP.JSX
// ============================================================================
console.log('\n--- SUITE 6: ROUTE REGISTRATIONS IN APP.JSX ---');

assert(appSrc.includes('import CyberCourseDetailPage from'), 'CyberCourseDetailPage imported in App.jsx');
assert(appSrc.includes('import CyberStudentDashboard from'), 'CyberStudentDashboard imported in App.jsx');
assert(appSrc.includes('path="academy/cybersecurity/courses/:slug"'), 'Route academy/cybersecurity/courses/:slug registered');
assert(appSrc.includes('element={<CyberCourseDetailPage />}'), 'CyberCourseDetailPage bound to course route');
assert(appSrc.includes('path="academy/cybersecurity/student"'), 'Route academy/cybersecurity/student registered');
assert(/path="academy\/cybersecurity\/student"[\s\S]*?<ProtectedRoute>[\s\S]*?<CyberStudentDashboard \/>[\s\S]*?<\/ProtectedRoute>/.test(appSrc), 'CyberStudentDashboard protected and bound to student route');

// Backwards compatibility aliases
assert(appSrc.includes('path="cyber/courses/:slug"'), 'Alias cyber/courses/:slug route registered');
assert(appSrc.includes('path="cyber/student"'), 'Alias cyber/student route registered');
assert(appSrc.includes('path="courses/:slug"'), 'Public backward compatible courses/:slug route preserved');
assert(appSrc.includes('path="student"'), 'Public backward compatible student route preserved');

// ============================================================================
// SUMMARY & VERDICT CALCULATION
// ============================================================================
console.log('\n================================================================');
console.log(`=== STRESS TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ===`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
