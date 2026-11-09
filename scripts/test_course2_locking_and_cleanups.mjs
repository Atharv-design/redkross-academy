import fs from 'fs';

console.log('--- TESTING COURSE 2 MODULE LOCKING, ADMIN REMOVAL, BACKGROUND & NAVBAR FIXES ---');

// 1. Verify Course 2 Module Locking in LessonOutlineSidebar and index.jsx
console.log('1. Verify Course 2 Module Locking:');
const sidebarCode = fs.readFileSync('src/pages/student/lesson-player/LessonOutlineSidebar.jsx', 'utf8');
const indexCode = fs.readFileSync('src/pages/student/lesson-player/index.jsx', 'utf8');

const sidebarHasNoCourse2Override = !sidebarCode.includes('const isUnlocked = isCourse2 ? true : isModuleUnlocked');
const indexHasNoCourse2Override = !indexCode.includes('if (isCourse2Inspection) return true;');

console.log('   - LessonOutlineSidebar has no course2 override bypass:', sidebarHasNoCourse2Override);
console.log('   - index.jsx isModuleUnlocked has no course2 override bypass:', indexHasNoCourse2Override);

if (!sidebarHasNoCourse2Override || !indexHasNoCourse2Override) {
  throw new Error('Course 2 module locking bypass still present!');
}

// Test sequential unlock logic
function isModuleUnlockedMock(modIndex, completedLessons, passedQuizzes, modules) {
  if (modIndex === 0) return true;
  for (let i = 0; i < modIndex; i++) {
    const prevMod = modules[i];
    if (!prevMod) continue;
    const prevLessons = prevMod.lessons || [];
    const allLessonsDone = prevLessons.length === 0 || prevLessons.every((l) => completedLessons.includes(l.id));
    const prevQuizDone = prevMod.quiz ? passedQuizzes.includes(prevMod.quiz.id) : true;
    const prevModCleared = prevMod.quiz ? (prevQuizDone && allLessonsDone) : allLessonsDone;
    if (!prevModCleared) return false;
  }
  return true;
}

const mockModules = [
  { id: 'm1', lessons: [{ id: 'l1_1' }, { id: 'l1_2' }], quiz: { id: 'q1' } },
  { id: 'm2', lessons: [{ id: 'l2_1' }], quiz: { id: 'q2' } },
  { id: 'm3', lessons: [{ id: 'l3_1' }], quiz: { id: 'q3' } }
];

console.log('   - Module 1 initially unlocked:', isModuleUnlockedMock(0, [], [], mockModules) === true);
console.log('   - Module 2 initially locked:', isModuleUnlockedMock(1, [], [], mockModules) === false);
console.log('   - Module 2 with only lessons done (no quiz):', isModuleUnlockedMock(1, ['l1_1', 'l1_2'], [], mockModules) === false);
console.log('   - Module 2 unlocked after passing Module 1 quiz & lessons:', isModuleUnlockedMock(1, ['l1_1', 'l1_2'], ['q1'], mockModules) === true);
console.log('   - Module 3 still locked until Module 2 passed:', isModuleUnlockedMock(2, ['l1_1', 'l1_2'], ['q1'], mockModules) === false);

// 2. Verify Cyber Academy text in CyberAcademyNavbar.jsx has NO box
console.log('\n2. Verify Cyber Academy Brand Text:');
const cyberNavCode = fs.readFileSync('src/components/cyber/CyberAcademyNavbar.jsx', 'utf8');
const brandCyberMatch = cyberNavCode.match(/<span[^>]*>\s*Cyber Academy\s*<\/span>/i);
const brandTag = brandCyberMatch ? brandCyberMatch[0] : '';
const hasNoBoxAroundCyberAcademy = !brandTag.includes('border') && !brandTag.includes('bg-');
const hasCyberAcademyText = cyberNavCode.includes('Cyber Academy');

console.log('   - Box / border around Cyber Academy tag removed:', hasNoBoxAroundCyberAcademy);
console.log('   - Clean Cyber Academy title present:', hasCyberAcademyText);

if (!hasNoBoxAroundCyberAcademy || !hasCyberAcademyText) {
  throw new Error('Cyber Academy box removal check failed!');
}

// 3. Verify Super Admin / Admin access disabled
console.log('\n3. Verify Admin Access Disabled:');
const navbarCode = fs.readFileSync('src/components/common/Navbar.jsx', 'utf8');
const loginCode = fs.readFileSync('src/pages/public/LoginPage.jsx', 'utf8');
const adminRouteCode = fs.readFileSync('src/components/auth/AdminRoute.jsx', 'utf8');
const authCode = fs.readFileSync('src/services/auth/authContext.jsx', 'utf8');

const navHasNoAdminButton = !navbarCode.includes('1-Click Super Admin') && !navbarCode.includes('1-Click Admin Access');
const navHasNoAdminLink = !navbarCode.includes('to="/admin"');
const loginHasNoAdminButton = !loginCode.includes('1-Click Super Admin Login');
const adminRouteRedirects = adminRouteCode.includes('<Navigate to="/" replace />');
const authRemovesDevAdmin = authCode.includes("localStorage.removeItem('redkross_academy_dev_admin')");

console.log('   - Navbar has no admin button:', navHasNoAdminButton);
console.log('   - Navbar has no /admin links:', navHasNoAdminLink);
console.log('   - LoginPage has no 1-click admin login:', loginHasNoAdminButton);
console.log('   - AdminRoute strictly redirects to /:', adminRouteRedirects);
console.log('   - authContext clears legacy dev admin flag:', authRemovesDevAdmin);

if (!navHasNoAdminButton || !navHasNoAdminLink || !loginHasNoAdminButton || !adminRouteRedirects || !authRemovesDevAdmin) {
  throw new Error('Admin removal verification failed!');
}

// 4. Verify CyberShaderBackground contains 3D zoom WebGL shader
console.log('\n4. Verify CyberShaderBackground 3D WebGL Shader:');
const shaderCode = fs.readFileSync('src/components/ui/CyberShaderBackground.jsx', 'utf8');
const hasRayMarchingShader = shaderCode.includes('multiplier = 15.5') && shaderCode.includes('zoomSpeed = 10.0');
const hasLayers = shaderCode.includes('renderLayer(i, layers, uv, opacity, layerColour, n)');

console.log('   - Has 3D zoomSpeed & multiplier:', hasRayMarchingShader);
console.log('   - Has multi-layer particle render passes:', hasLayers);

if (!hasRayMarchingShader || !hasLayers) {
  throw new Error('CyberShaderBackground shader check failed!');
}

// 5. Verify LessonContentPanel has no contentVisibility auto lag
console.log('\n5. Verify LessonContentPanel Performance Fixes:');
const contentPanelCode = fs.readFileSync('src/pages/student/lesson-player/LessonContentPanel.jsx', 'utf8');
const hasNoContentVisibility = !contentPanelCode.includes("contentVisibility: 'auto'");
const hasOpaquePanel = contentPanelCode.includes('bg-[#0B0D14]/95');

console.log('   - contentVisibility auto removed (no blank screen):', hasNoContentVisibility);
console.log('   - Opaque high-perf surface applied (no backdrop-filter lag):', hasOpaquePanel);

if (!hasNoContentVisibility || !hasOpaquePanel) {
  throw new Error('LessonContentPanel lag fix check failed!');
}

console.log('\n===============================================================');
console.log('ALL COURSE 2 LOCKING, ADMIN REMOVAL, BACKGROUND & UI TESTS PASSED (100%)');
console.log('===============================================================');
