import fs from 'fs';
import path from 'path';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { PSYCHOLOGY_COURSES } from '../src/services/db/psychologyCourses.js';
import { CYBER_COURSES } from '../src/services/db/cyberCourses.js';

console.log('================================================================');
console.log('=== EMPIRICAL CHALLENGER STRESS HARNESS: MILESTONE 4 VERIFIER ===');
console.log('===     CLINICAL PSYCHOLOGY IN-BRANCH PAGES & DATA ISOLATION  ===');
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
const DETAIL_PATH = path.join(BASE_DIR, 'src', 'pages', 'public', 'PsychologyCourseDetailPage.jsx');
const DASHBOARD_PATH = path.join(BASE_DIR, 'src', 'pages', 'student', 'PsychologyStudentDashboard.jsx');
const CARD_PATH = path.join(BASE_DIR, 'src', 'components', 'psychology', 'PsychologyThemedCard.jsx');

// ============================================================================
// SUITE 1: FILE EXISTENCE & CODEBASE REPOSITORY VERIFICATION
// ============================================================================
console.log('--- SUITE 1: FILE INTEGRITY ---');
assert(fs.existsSync(APP_PATH), 'App.jsx exists in src/');
assert(fs.existsSync(DETAIL_PATH), 'PsychologyCourseDetailPage.jsx exists in src/pages/public/');
assert(fs.existsSync(DASHBOARD_PATH), 'PsychologyStudentDashboard.jsx exists in src/pages/student/');
assert(fs.existsSync(CARD_PATH), 'PsychologyThemedCard.jsx exists in src/components/psychology/');

const appSrc = fs.readFileSync(APP_PATH, 'utf-8');
const detailSrc = fs.readFileSync(DETAIL_PATH, 'utf-8');
const dashboardSrc = fs.readFileSync(DASHBOARD_PATH, 'utf-8');
const cardSrc = fs.readFileSync(CARD_PATH, 'utf-8');

// ============================================================================
// SUITE 2: ACADEMIC DATA PARTITIONING & ZERO LEAKAGE
// ============================================================================
console.log('\n--- SUITE 2: ACADEMIC DATA PARTITIONING & ZERO LEAKAGE ---');
const testCadetId = 'usr_cadet_challenger_m4_' + Date.now();

// Enroll student in both cyber and psychology
const cyberEnr = mockEngine.enrolStudent(testCadetId, 'crs_cyber_intro_01');
const psychEnr = mockEngine.enrolStudent(testCadetId, 'crs_psych_cbt');

assert(cyberEnr && cyberEnr.id, 'Enrolled cadet in crs_cyber_intro_01 (Cybersecurity)');
assert(psychEnr && psychEnr.id, 'Enrolled cadet in crs_psych_cbt (Psychology)');

// Strict partition queries
const psychEnrolments = mockEngine.getEnrolmentsForUser(testCadetId, 'psychology');
const cyberEnrolments = mockEngine.getEnrolmentsForUser(testCadetId, 'cybersecurity');
const allEnrolments = mockEngine.getEnrolmentsForUser(testCadetId);

assert(psychEnrolments.length === 1, `Psychology query returns exactly 1 enrollment (found ${psychEnrolments.length})`);
assert(psychEnrolments[0].course_id === 'crs_psych_cbt', 'Psychology enrollment is strictly crs_psych_cbt');

// Verify ZERO cybersecurity courses leaked into psychology query
const cyberLeakedInPsych = psychEnrolments.filter(e => {
  const c = mockEngine.getCourseById(e.course_id);
  return c?.division === 'cybersecurity' || e.course_id === 'crs_cyber_intro_01';
});
assert(cyberLeakedInPsych.length === 0, 'ZERO cybersecurity courses returned in psychology enrollment query');

// Verify ZERO psychology courses leaked into cyber query
const psychLeakedInCyber = cyberEnrolments.filter(e => {
  const c = mockEngine.getCourseById(e.course_id);
  return c?.division === 'psychology' || e.course_id === 'crs_psych_cbt';
});
assert(psychLeakedInCyber.length === 0, 'ZERO psychology courses returned in cybersecurity enrollment query');

assert(allEnrolments.length === 2, `Unpartitioned query preserves backwards compatibility (found ${allEnrolments.length})`);

// Division stats isolation
const psychStats = mockEngine.getStudentStatsByDivision(testCadetId, 'psychology');
const cyberStats = mockEngine.getStudentStatsByDivision(testCadetId, 'cybersecurity');

assert(psychStats.activeCourses === 1, `Psych stats activeCourses is strictly 1 (found ${psychStats.activeCourses})`);
assert(cyberStats.activeCourses === 1, `Cyber stats activeCourses is strictly 1 (found ${cyberStats.activeCourses})`);

// Non-existent division stress test
const emptyStats = mockEngine.getStudentStatsByDivision(testCadetId, 'non_existent_division');
assert(emptyStats.activeCourses === 0, 'Query for non-existent division returns 0 activeCourses safely');

// Adversarial Multi-enrollment test
const testMultiCadetId = 'usr_cadet_multi_m4_' + Date.now();
mockEngine.enrolStudent(testMultiCadetId, 'crs_cyber_intro_01');
mockEngine.enrolStudent(testMultiCadetId, 'crs_psych_cbt');
mockEngine.enrolStudent(testMultiCadetId, 'crs_psych_crisis');
const multiPsychEnrolments = mockEngine.getEnrolmentsForUser(testMultiCadetId, 'psychology');
assert(multiPsychEnrolments.length === 2, `Multi-psychology enrollment query returns exactly 2 psychology courses (found ${multiPsychEnrolments.length})`);
const multiCyberInPsych = multiPsychEnrolments.filter(e => e.course_id === 'crs_cyber_intro_01');
assert(multiCyberInPsych.length === 0, 'ZERO cyber courses leaked in multi-enrollment psychology query');

// ============================================================================
// SUITE 3: PSYCHOLOGY COURSE DETAIL PAGE SPECIFICATION
// ============================================================================
console.log('\n--- SUITE 3: PSYCHOLOGY COURSE DETAIL PAGE SPECIFICATION ---');

// Check all 6 HUD Telemetry Tabs
const requiredTabIds = ['overview', 'outcomes', 'syllabus', 'eligibility', 'certification', 'faqs'];
requiredTabIds.forEach(tabId => {
  assert(detailSrc.includes(`id: '${tabId}'`), `HUD Tab definition contains id: '${tabId}'`);
  assert(detailSrc.includes(`activeTab === '${tabId}'`), `HUD Tab render branch exists for: '${tabId}'`);
});

// Check exact Tab Labels
assert(detailSrc.includes('01 // CLINICAL OVERVIEW'), 'Tab 1 label matches: 01 // CLINICAL OVERVIEW');
assert(detailSrc.includes('02 // CLINICAL OUTCOMES'), 'Tab 2 label matches: 02 // CLINICAL OUTCOMES');
assert(detailSrc.includes('03 // PRACTICUM SYLLABUS'), 'Tab 3 label matches: 03 // PRACTICUM SYLLABUS');
assert(detailSrc.includes('04 // ETHICAL PREREQUISITES'), 'Tab 4 label matches: 04 // ETHICAL PREREQUISITES');
assert(detailSrc.includes('05 // PRACTITIONER CERTIFICATION'), 'Tab 5 label matches: 05 // PRACTITIONER CERTIFICATION');
assert(detailSrc.includes('06 // FAQS'), 'Tab 6 label matches: 06 // FAQS');

// Check syllabus accordion controls
assert(detailSrc.includes('expandAllModules'), 'Syllabus accordion includes expandAllModules function');
assert(detailSrc.includes('collapseAllModules'), 'Syllabus accordion includes collapseAllModules function');
assert(detailSrc.includes('Expand All'), 'Expand All UI trigger rendered in syllabus tab');
assert(detailSrc.includes('Collapse All'), 'Collapse All UI trigger rendered in syllabus tab');

// Check SHA-256 certificate proof and copy hash
assert(detailSrc.includes('sampleSha256'), 'Cryptographic SHA-256 proof spec is declared');
assert(detailSrc.includes('copyHashToClipboard'), 'Copy hash to clipboard feature implemented');
assert(detailSrc.includes('COPY HASH'), 'COPY HASH action button rendered');

// Check Instant Enrolment Handler
assert(detailSrc.includes('handleEnrol'), 'Cadet instant enrolment handler implemented');
assert(detailSrc.includes('mockEngine.enrolStudent'), 'handleEnrol calls mockEngine.enrolStudent');

// Check Theme Tokens (Clinical Sage / Teal / Amber)
assert(detailSrc.includes('#2DD4BF'), 'Clinical Sage/Teal token (#2DD4BF) present in styling');
assert(detailSrc.includes('#0F766E') || detailSrc.includes('teal-500') || detailSrc.includes('teal-600'), 'Clinical Deep Teal token present in styling');
assert(detailSrc.includes('#FFA439') || detailSrc.includes('amber-400') || detailSrc.includes('amber-500'), 'Warm Amber token present in styling');
assert(detailSrc.includes('data-academy-theme="psychology"'), 'Root theme token data-academy-theme="psychology" present');

// Verify ABSOLUTE ZERO green matrix hacker tint
assert(!detailSrc.includes('#00ff00') && !detailSrc.includes('#00FF00'), 'Strictly ZERO #00ff00 green matrix hacker tint in PsychologyCourseDetailPage');
assert(!detailSrc.includes('matrix-code') && !detailSrc.includes('matrix-rain'), 'Strictly ZERO matrix animation classes in PsychologyCourseDetailPage');

// Course Resolution Verification
const resolvedBySlug = mockEngine.getCourseBySlug('cognitive-behavioral-therapy-foundations-practice');
assert(resolvedBySlug && resolvedBySlug.id === 'crs_psych_cbt', 'mockEngine resolves psychology course by exact slug');
const resolvedById = mockEngine.getCourseById('crs_psych_cbt');
assert(resolvedById && resolvedById.title.includes('Cognitive Behavioral Therapy'), 'mockEngine resolves psychology course by id');

// ============================================================================
// SUITE 4: PSYCHOLOGY STUDENT DASHBOARD SPECIFICATION
// ============================================================================
console.log('\n--- SUITE 4: PSYCHOLOGY STUDENT DASHBOARD SPECIFICATION ---');

// Practitioner Telemetry Banner
assert(dashboardSrc.includes('PRACTITIONER WORKSTATION'), 'Banner displays PRACTITIONER WORKSTATION');
assert(dashboardSrc.includes('CLINICAL PSYCHOLOGY &amp; BEHAVIORAL HEALTH') || dashboardSrc.includes('CLINICAL PSYCHOLOGY & BEHAVIORAL HEALTH'), 'Banner displays Clinical Psychology verified division badge');
assert(dashboardSrc.includes('ACTIVE COURSES'), 'Banner metric: ACTIVE COURSES');
assert(dashboardSrc.includes('COMPLETED UNITS'), 'Banner metric: COMPLETED UNITS');
assert(dashboardSrc.includes('CLINICAL SCORE'), 'Banner metric: CLINICAL SCORE');
assert(dashboardSrc.includes('CREDENTIALS'), 'Banner metric: CREDENTIALS');

// Division-scoped queries
assert(dashboardSrc.includes("mockEngine.getEnrolmentsForUser(currentUser.id, 'psychology')"), "Dashboard explicitly filters enrollments with division='psychology'");
assert(dashboardSrc.includes("mockEngine.getStudentStatsByDivision(currentUser.id, 'psychology')"), "Dashboard explicitly scopes stats with division='psychology'");

// Active clinical course progress cards
assert(dashboardSrc.includes('Active Clinical Practicum Progress'), 'Active Clinical Practicum Progress section rendered');
assert(dashboardSrc.includes('Enter Classroom'), 'Enter Classroom trigger rendered');
assert(dashboardSrc.includes('Syllabus'), 'Syllabus trigger rendered');
assert(dashboardSrc.includes('Final Exam'), 'Final Exam trigger rendered');

// Reflection Journal
assert(dashboardSrc.includes('Clinical Reflection Journal'), 'Clinical Reflection Journal section rendered');
assert(dashboardSrc.includes('Cognitive Formulation'), 'Journal category: Cognitive Formulation available');
assert(dashboardSrc.includes('Therapeutic Alliance'), 'Journal category: Therapeutic Alliance available');
assert(dashboardSrc.includes('Ethical Deliberation'), 'Journal category: Ethical Deliberation available');
assert(dashboardSrc.includes('Countertransference'), 'Journal category: Countertransference available');
assert(dashboardSrc.includes('Save Clinical Note') || dashboardSrc.includes('handleAddReflection'), 'Journal save action implemented');

// Case Study Notes Organizer
assert(dashboardSrc.includes('Case Study Notes Organizer'), 'Case Study Notes Organizer section rendered');
assert(dashboardSrc.includes('Beckian Triad'), 'Case study Beckian Triad breakdown rendered');
assert(dashboardSrc.includes('De-Identified Vignette'), 'De-identified clinical vignette badge rendered');

// Calming Therapeutic Audio Ambience
assert(dashboardSrc.includes('Therapeutic Audio Ambience'), 'Therapeutic Audio Ambience section rendered');
assert(dashboardSrc.includes('528 Hz'), '528 Hz Solfeggio frequency option present');
assert(dashboardSrc.includes('432 Hz'), '432 Hz Harmonic Flow frequency option present');
assert(dashboardSrc.includes('Theta 4Hz'), 'Theta 4Hz Binaural Calm frequency option present');

// Cryptographic SHA-256 certificate proofs
assert(dashboardSrc.includes('Clinical Practitioner Credentials & Certifications'), 'Credentials & Certifications section rendered');
assert(dashboardSrc.includes('SHA-256 DIGITAL SIGNATURE PROOF') || dashboardSrc.includes('DETERMINISTIC SHA-256 SIGNATURE DEMO'), 'SHA-256 digital signature proof rendered');
assert(dashboardSrc.includes('/verify/'), 'Public verification link (/verify/:id) integrated');

// Zero Cybersecurity leakage in Psychology Dashboard
assert(!dashboardSrc.includes('Kali') && !dashboardSrc.includes('CyberLabDesktopWindow'), 'ZERO Kali references in PsychologyStudentDashboard');
assert(!dashboardSrc.includes('MovablePracticeTerminal'), 'ZERO MovablePracticeTerminal references in PsychologyStudentDashboard');
assert(!dashboardSrc.includes("'cybersecurity'"), "ZERO 'cybersecurity' division queries in PsychologyStudentDashboard");
assert(!dashboardSrc.includes('#00ff00') && !dashboardSrc.includes('#00FF00'), 'ZERO #00ff00 green matrix hacker tint in PsychologyStudentDashboard');

// ============================================================================
// SUITE 5: PSYCHOLOGY THEMED CARD LINKING
// ============================================================================
console.log('\n--- SUITE 5: PSYCHOLOGY THEMED CARD LINKING ---');

assert(cardSrc.includes('/academy/psychology/courses/${course.slug}') || cardSrc.includes('/academy/psychology/courses/'), 'PsychologyThemedCard links to /academy/psychology/courses/${course.slug}');
assert(cardSrc.includes('const resolvedLink = course?.slug ? `/academy/psychology/courses/${course.slug}` : ctaLink;'), 'PsychologyThemedCard uses clean resolvedLink with fallback');

// ============================================================================
// SUITE 6: ROUTE REGISTRATIONS IN APP.JSX
// ============================================================================
console.log('\n--- SUITE 6: ROUTE REGISTRATIONS IN APP.JSX ---');

assert(appSrc.includes('import PsychologyCourseDetailPage from'), 'PsychologyCourseDetailPage imported in App.jsx');
assert(appSrc.includes('import PsychologyStudentDashboard from'), 'PsychologyStudentDashboard imported in App.jsx');

// Verify In-Branch Routes
assert(appSrc.includes('path="academy/psychology/courses/:slug"'), 'Route academy/psychology/courses/:slug registered');
assert(appSrc.includes('element={<PsychologyCourseDetailPage />}'), 'PsychologyCourseDetailPage element bound');
assert(appSrc.includes('path="academy/psychology/student"'), 'Route academy/psychology/student registered');
assert(/path="academy\/psychology\/student"[\s\S]*?<ProtectedRoute>[\s\S]*?<PsychologyStudentDashboard \/>[\s\S]*?<\/ProtectedRoute>/.test(appSrc), 'PsychologyStudentDashboard protected with ProtectedRoute');

// Verify Backward Compatibility Redirects & Aliases
assert(appSrc.includes('path="psychology/courses/:slug"'), 'Alias psychology/courses/:slug route registered');
assert(appSrc.includes('to="/academy/psychology/courses/:slug"'), 'Redirects psychology/courses/:slug to /academy/psychology/courses/:slug');
assert(appSrc.includes('path="psychology/student"'), 'Alias psychology/student route registered');
assert(appSrc.includes('to="/academy/psychology/student"'), 'Redirects psychology/student to /academy/psychology/student');

// Verify Legacy and Peer Routes Preserved
assert(appSrc.includes('path="academy/cybersecurity/courses/:slug"'), 'Cybersecurity in-branch course route preserved');
assert(appSrc.includes('path="academy/cybersecurity/student"'), 'Cybersecurity student dashboard route preserved');
assert(appSrc.includes('path="courses/:slug"'), 'Legacy courses/:slug route preserved');
assert(appSrc.includes('path="student"'), 'Legacy student route preserved');
assert(appSrc.includes('path="admin"'), 'Admin workstation route preserved');

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
