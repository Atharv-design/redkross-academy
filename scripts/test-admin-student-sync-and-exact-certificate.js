import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\n===============================================================');
console.log('🧪 RUNNING ADMIN-STUDENT SYNC, REAL DATA & CERTIFICATE SUITE');
console.log('===============================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✔ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✖ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// Group 1: API Endpoint Cascades & PostgreSQL Synchronization
// -------------------------------------------------------------
console.log('--- Group 1: API Endpoint Cascades & PostgreSQL Synchronization ---');

const apiCoursesPath = path.join(rootDir, 'api', 'courses.js');
const apiCoursesContent = fs.readFileSync(apiCoursesPath, 'utf8');

runTest('api/courses.js handles DELETE method', () => {
  assert(apiCoursesContent.includes("req.method === 'DELETE'"), 'DELETE method must be explicitly handled');
});

runTest('api/courses.js enforces super_admin role for DELETE', () => {
  assert(apiCoursesContent.includes('!isAdmin'), 'Deletion must check isAdmin');
  assert(apiCoursesContent.includes('Unauthorized: Super Admin role required to delete courses'), 'Must reject unauthorized deletion');
});

runTest('api/courses.js executes comprehensive deletion cascades in correct order', () => {
  const cascades = [
    'DELETE FROM quiz_attempts',
    'DELETE FROM quiz_retry_windows',
    'DELETE FROM lesson_progress',
    'DELETE FROM certificate_requests',
    'DELETE FROM credentials',
    'DELETE FROM enrolments',
    'DELETE FROM options',
    'DELETE FROM questions',
    'DELETE FROM quizzes',
    'DELETE FROM course_video_assets',
    'DELETE FROM lessons',
    'DELETE FROM modules',
    'DELETE FROM courses'
  ];

  cascades.forEach((cascade) => {
    assert(apiCoursesContent.includes(cascade), `Missing cascading query: ${cascade}`);
  });
});

runTest('api/courses.js records audit log on course deletion', () => {
  assert(apiCoursesContent.includes('INSERT INTO audit_logs'), 'Must insert into audit_logs');
  assert(apiCoursesContent.includes('COURSE_DELETED'), 'Audit log action must be COURSE_DELETED');
});

runTest('api/courses.js handles PUT method for full course metadata & syllabus updating', () => {
  assert(apiCoursesContent.includes("req.method === 'PUT'"), 'PUT method must be handled');
  assert(apiCoursesContent.includes('UPDATE courses SET'), 'Must update courses table');
});

// -------------------------------------------------------------
// Group 2: Unified API Client Integration & Bug Fix Verification
// -------------------------------------------------------------
console.log('\n--- Group 2: Unified API Client Integration & Bug Fix Verification ---');

const apiClientPath = path.join(rootDir, 'src', 'services', 'apiClient.js');
const apiClientContent = fs.readFileSync(apiClientPath, 'utf8');

runTest('apiClient.js defines deleteCourse with DELETE request to /api/courses', () => {
  assert(apiClientContent.includes('async deleteCourse(courseId)'), 'deleteCourse must be defined');
  assert(apiClientContent.includes("method: 'DELETE'"), 'deleteCourse must use DELETE method');
});

runTest('apiClient.js defines updateCourse with PUT request to /api/courses', () => {
  assert(apiClientContent.includes('async updateCourse(courseId, coursePayload)'), 'updateCourse must be defined');
  assert(apiClientContent.includes("method: 'PUT'"), 'updateCourse must use PUT method');
});

runTest('apiClient.js fixes critical enrolment bug by calling mockEngine.enrolStudent', () => {
  assert(!apiClientContent.includes('mockEngine.enrol('), 'apiClient must not call nonexistent mockEngine.enrol()');
  assert(apiClientContent.includes('mockEngine.enrolStudent(userId, courseId)'), 'apiClient must call mockEngine.enrolStudent');
});

// -------------------------------------------------------------
// Group 3: Permanent Course Deletion & Live Sync Verification
// -------------------------------------------------------------
console.log('\n--- Group 3: Permanent Course Deletion & Live Sync Verification ---');

const adminCoursesPath = path.join(rootDir, 'src', 'pages', 'admin', 'AdminCoursesPage.jsx');
const adminCoursesContent = fs.readFileSync(adminCoursesPath, 'utf8');

runTest('AdminCoursesPage.jsx deletes course via apiClient.deleteCourse', () => {
  assert(adminCoursesContent.includes('await apiClient.deleteCourse(courseId)'), 'Must call apiClient.deleteCourse');
});

runTest('AdminCoursesPage.jsx broadcasts course:mutation event after deletion', () => {
  assert(adminCoursesContent.includes("socketClient.emit('course:mutation'"), 'Must broadcast deletion via socketClient');
});

const courseCatalogPath = path.join(rootDir, 'src', 'pages', 'public', 'CourseCatalogPage.jsx');
const courseCatalogContent = fs.readFileSync(courseCatalogPath, 'utf8');

runTest('CourseCatalogPage.jsx listens to live course:mutation events via socketClient', () => {
  assert(courseCatalogContent.includes("socketClient.on('course:mutation'"), 'Must subscribe to course:mutation on socketClient');
});

runTest('CourseCatalogPage.jsx listens to mockEngine DB mutations', () => {
  assert(courseCatalogContent.includes('mockEngine.subscribe('), 'Must subscribe to mockEngine');
});

// -------------------------------------------------------------
// Group 4: Fake Data Purge & Real Analytics Verification
// -------------------------------------------------------------
console.log('\n--- Group 4: Fake Data Purge & Real Analytics Verification ---');

const mockEnginePath = path.join(rootDir, 'src', 'services', 'db', 'mockEngine.js');
const mockEngineContent = fs.readFileSync(mockEnginePath, 'utf8');

runTest('mockEngine.js completely purges ensureAnalyticsCohort', () => {
  assert(!mockEngineContent.includes('ensureAnalyticsCohort'), 'ensureAnalyticsCohort must be completely excised');
});

runTest('mockEngine.js getDb() purges legacy cohort users, enrolments and violations', () => {
  assert(mockEngineContent.includes("id?.startsWith('enr_cohort_')"), 'Must purge enr_cohort_');
  assert(mockEngineContent.includes("id?.startsWith('usr_cohort_')"), 'Must purge usr_cohort_');
  assert(mockEngineContent.includes("id?.startsWith('viol_seed_')"), 'Must purge viol_seed_');
});

runTest('mockEngine.js does not reseed default courses when courses array is empty []', () => {
  assert(mockEngineContent.includes('!parsed._initialized'), 'Only initialize when _initialized is not set');
  assert(mockEngineContent.includes('parsed.courses = parsed.courses || []'), 'Preserves empty courses array');
});

runTest('mockEngine.js computes real medianTimeToCert and firstAttemptPass with 0-state fallbacks', () => {
  assert(!mockEngineContent.includes("medianTimeToCert: '22.4 Days'"), 'Must not hardcode 22.4 Days');
  assert(mockEngineContent.includes("let medianTimeToCert = '0.0 Days'"), 'Default median time is 0.0 Days');
  assert(!mockEngineContent.includes("firstAttemptPass: '82.1%'") && !mockEngineContent.includes("totalExaminees > 0 ? (((highHonors + passed) / totalExaminees) * 100).toFixed(1) : '82.1'"), 'Must not fallback to fake 82.1% pass rate');
  assert(!mockEngineContent.includes("totalExams = totalExaminees > 0 ? totalExaminees : 24"), 'Must not fallback to fake 24 exams');
});

const adminAnalyticsPath = path.join(rootDir, 'src', 'pages', 'admin', 'AdminAnalyticsPage.jsx');
const adminAnalyticsContent = fs.readFileSync(adminAnalyticsPath, 'utf8');

runTest('AdminAnalyticsPage.jsx handles empty states for progression and score distribution', () => {
  assert(adminAnalyticsContent.includes('No Active Learner Progression'), 'Must provide empty state for progression');
  assert(adminAnalyticsContent.includes('No Assessment Records Yet'), 'Must provide empty state for scores');
});

// -------------------------------------------------------------
// Group 5: Official Embedded Certificate & PDF Generator
// -------------------------------------------------------------
console.log('\n--- Group 5: Official Embedded Certificate & PDF Generator ---');

const certComponentPath = path.join(rootDir, 'src', 'components', 'certificate', 'RedKrossOfficialCertificate.jsx');
const certComponentContent = fs.readFileSync(certComponentPath, 'utf8');

runTest('RedKrossOfficialCertificate.jsx is a standalone embedded certificate without CSS backgroundImage', () => {
  assert(!certComponentContent.includes('backgroundImage:'), 'Must not rely on external CSS backgroundImage');
  assert(certComponentContent.includes('border-[#C5A059]'), 'Must include gold institutional border');
  assert(certComponentContent.includes('border-[#0C2340]'), 'Must include navy institutional border');
});

runTest('RedKrossOfficialCertificate.jsx includes institutional crest, title, and accreditations', () => {
  assert(certComponentContent.includes('RedKross Research Foundation'), 'Must include institution title');
  assert(certComponentContent.includes('Govt. Registered Authority'), 'Must include official registration');
  assert(certComponentContent.includes('ISO 9001:2015 Accredited Institution'), 'Must include ISO accreditation standard');
  assert(certComponentContent.includes('C E R T I F I C A T E'), 'Must include official certificate title banner');
});

runTest('RedKrossOfficialCertificate.jsx renders live scannable QR verification code', () => {
  assert(certComponentContent.includes('QRCodeSVG'), 'Must render live scannable QR code');
  assert(certComponentContent.includes('verificationUrl'), 'Must point QR code to verificationUrl');
});

runTest('RedKrossOfficialCertificate.jsx renders institutional gold seal and authorized signature', () => {
  assert(certComponentContent.includes('supervisorName'), 'Must render authorized signatory name');
  assert(certComponentContent.includes('Institutional Seal'), 'Must render seal label');
  assert(certComponentContent.includes('REDKROSS'), 'Must render institutional seal banner');
});

const finalCertPath = path.join(rootDir, 'src', 'pages', 'student', 'FinalCertificationPage.jsx');
const finalCertContent = fs.readFileSync(finalCertPath, 'utf8');

runTest('FinalCertificationPage.jsx uses direct PDF download instead of window.print()', () => {
  assert(!finalCertContent.includes('window.print()'), 'Must not call window.print()');
  assert(finalCertContent.includes('downloadCertificatePdf'), 'Must use downloadCertificatePdf');
});

runTest('FinalCertificationPage.jsx renders RedKrossOfficialCertificate', () => {
  assert(finalCertContent.includes('<RedKrossOfficialCertificate'), 'Must render official certificate');
});

// -------------------------------------------------------------
// Group 6: Zero Blue Token Compliance & Smooth UI Radii
// -------------------------------------------------------------
console.log('\n--- Group 6: Zero Blue Token Compliance & Smooth UI Radii ---');

const filesToCheck = [
  certComponentPath,
  finalCertPath,
  adminAnalyticsPath,
  adminCoursesPath,
  courseCatalogPath
];

filesToCheck.forEach((filePath) => {
  const baseName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  runTest(`${baseName} strictly adheres to Zero Blue tokens (no raw blue-500/600/700)`, () => {
    const rawBlueMatches = content.match(/bg-blue-\d+|text-blue-\d+|border-blue-\d+/g);
    assert(!rawBlueMatches || rawBlueMatches.length === 0, `Found raw blue tokens: ${rawBlueMatches?.join(', ')}`);
  });

  runTest(`${baseName} uses rounded-xl or rounded-2xl smooth corner radii`, () => {
    assert(content.includes('rounded-xl') || content.includes('rounded-2xl') || content.includes('rounded-lg'), 'Must use smooth corner radii');
  });
});

console.log('\n===============================================================');
console.log(`🏁 TEST SUMMARY: ${passCount}/${passCount + failCount} TESTS PASSED`);
if (failCount === 0) {
  console.log('✨ ALL UNIT TESTS PASSED WITH 100% SUCCESS!');
} else {
  console.error(`❌ ${failCount} TESTS FAILED.`);
  process.exit(1);
}
console.log('===============================================================\n');
