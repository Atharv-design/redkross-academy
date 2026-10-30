import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\Users\\athar\\RedKross Academy Website';

console.log('=== REDKROSS ACADEMY VERIFICATION SUITE ===');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. PixelCard & PixelBackground files
const pixelCardPath = path.join(projectRoot, 'src', 'components', 'ui', 'PixelCard.jsx');
const pixelBgPath = path.join(projectRoot, 'src', 'components', 'ui', 'PixelBackground.jsx');

assert(fs.existsSync(pixelCardPath), 'PixelCard.jsx component exists');
assert(fs.existsSync(pixelBgPath), 'PixelBackground.jsx component exists');

const pixelBgContent = fs.readFileSync(pixelBgPath, 'utf8');
assert(pixelBgContent.includes('#65F58A') && pixelBgContent.includes('#35E6B5'), 'PixelBackground uses RedKross Emerald and Mint tokens');
assert(!pixelBgContent.includes('#fecdd3') && !pixelBgContent.includes('#38bdf8'), 'PixelBackground has 0% rose and 0% blue');

// 2. Background mounting across layouts
const appContent = fs.readFileSync(path.join(projectRoot, 'src', 'App.jsx'), 'utf8');
assert(appContent.includes('<PixelBackground'), 'App.jsx PublicLayout mounts PixelBackground');

const adminLayoutContent = fs.readFileSync(path.join(projectRoot, 'src', 'pages', 'admin', 'AdminLayout.jsx'), 'utf8');
assert(adminLayoutContent.includes('<PixelBackground'), 'AdminLayout.jsx mounts PixelBackground');

const lessonPlayerContent = fs.readFileSync(path.join(projectRoot, 'src', 'pages', 'student', 'LessonPlayerPage.jsx'), 'utf8');
assert(lessonPlayerContent.includes('<PixelBackground'), 'LessonPlayerPage.jsx mounts PixelBackground');

const quizContent = fs.readFileSync(path.join(projectRoot, 'src', 'pages', 'student', 'QuizAssessmentPage.jsx'), 'utf8');
assert(quizContent.includes('<PixelBackground'), 'QuizAssessmentPage.jsx mounts PixelBackground');

// 3. Footer Doodle box removal & transparent styling
const footerContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'common', 'Footer.jsx'), 'utf8');
assert(!footerContent.includes('border-t border-white/5\n          <DoodleCrewFooter') && footerContent.includes('palette={{\n              background: "transparent"'), 'Footer.jsx has no box border and uses transparent palette');

const doodleContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'ui', 'doodle-crew-footer-academy.tsx'), 'utf8');
assert(!doodleContent.includes('#8fdcff'), 'doodle-crew-footer has zero #8fdcff blue sparkle');
assert(doodleContent.includes("'Lora',serif"), 'doodle-crew-footer enforces Lora typography');

// 4. Admin Embargo / Live toggle button
const dashboardContent = fs.readFileSync(path.join(projectRoot, 'src', 'pages', 'admin', 'AdminDashboardPage.jsx'), 'utf8');
assert(dashboardContent.includes('EMBARGO CATALOG'), 'AdminDashboardPage includes exact "EMBARGO CATALOG" lock pill');
assert(dashboardContent.includes('LIVE') && dashboardContent.includes('CheckCircle2'), 'AdminDashboardPage includes radiant "LIVE" green pill');

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.`);
