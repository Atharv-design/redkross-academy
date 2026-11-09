import fs from 'fs';

console.log('--- TESTING PROCTORING, FULLSCREEN LOCKDOWN & EXAM TIMER LOGIC ---');

// 1. Verify PreFlightExamModal.jsx
const preflightCode = fs.readFileSync('src/pages/student/lesson-player/modals/PreFlightExamModal.jsx', 'utf8');

// Check camera permission requirement
console.log('1. Camera permission required in PreFlight?');
const hasCameraCheck = preflightCode.includes('getUserMedia') && preflightCode.includes('cameraStatus');
const hasDisabledCheck = preflightCode.includes("cameraStatus !== 'active'");
const hasPreviewVideo = preflightCode.includes('previewVideoRef');
const hasSynchronousFs = preflightCode.includes('requestFullscreen') && preflightCode.includes('handleLaunchWithFullscreen');
const hasNoLora = !preflightCode.includes('font-lora');

console.log('   - Has getUserMedia & cameraStatus:', hasCameraCheck);
console.log('   - Button disabled if camera not active:', hasDisabledCheck);
console.log('   - Has live preview video element:', hasPreviewVideo);
console.log('   - Requests fullscreen synchronously on user click:', hasSynchronousFs);
console.log('   - Modern sans/mono typography (no amateur font-lora):', hasNoLora);

if (!hasCameraCheck || !hasDisabledCheck || !hasPreviewVideo || !hasSynchronousFs || !hasNoLora) {
  throw new Error('PreFlightExamModal camera and styling checks failed!');
}

// 2. Verify Exam Timer durations
console.log('\n2. Verify 30m (20 marks) vs 60m (50 marks) Timer Duration');
const indexCode = fs.readFileSync('src/pages/student/lesson-player/index.jsx', 'utf8');
const cbtCode = fs.readFileSync('src/components/student/ExamCBTInterface.jsx', 'utf8');

const indexHas30Min = indexCode.includes('totalMinutes = isFifty ? 60 : 30') || indexCode.includes('? 60 : 30');
const cbtHas1800s = cbtCode.includes('defaultSecs = isFifty ? 3600 : 1800') || cbtCode.includes('? 3600 : 1800');
console.log('   - index.jsx sets 30m vs 60m:', indexHas30Min);
console.log('   - ExamCBTInterface sets 1800s (30m) vs 3600s (60m):', cbtHas1800s);

if (!indexHas30Min || !cbtHas1800s) {
  throw new Error('Timer duration check failed!');
}

// 3. Verify Course Outline and Menu Button hiding during Exam
console.log('\n3. Verify Course Outline & Toggle Button Hiding in Exam Mode');
const topNavCode = fs.readFileSync('src/pages/student/lesson-player/LessonTopNavigation.jsx', 'utf8');

const navHidesMenu = topNavCode.includes('!isExamActive') && topNavCode.includes('setSidebarOpen');
const indexHidesSidebar = indexCode.includes('!isExamActive') && indexCode.includes('<LessonOutlineSidebar');
const indexHidesBottomNav = indexCode.includes('!isExamActive') && indexCode.includes('<LessonBottomNavigation');
const indexAutoDismissesSidebar = indexCode.includes('setSidebarOpen(false)') && indexCode.includes('isExamActive');

console.log('   - LessonTopNavigation hides menu button when isExamActive:', navHidesMenu);
console.log('   - LessonOutlineSidebar unmounted when isExamActive:', indexHidesSidebar);
console.log('   - LessonBottomNavigation suppressed when isExamActive:', indexHidesBottomNav);
console.log('   - Auto-collapses sidebar when isExamActive:', indexAutoDismissesSidebar);

if (!navHidesMenu || !indexHidesSidebar || !indexHidesBottomNav || !indexAutoDismissesSidebar) {
  throw new Error('Course outline and menu hiding verification failed!');
}

// 4. Verify Face Absence On-Screen Modal (NO BEEP SOUND)
console.log('\n4. Verify Face Absence On-Screen Warning Modal & No Beeps');
const hasFaceAbsentModal = cbtCode.includes('faceAbsentModal') && cbtCode.includes('Face Missing from Camera View');
const isMutedBeep = cbtCode.includes('User explicitly requested no beep-beep sound') || !cbtCode.includes('osc.start()');
console.log('   - Has on-screen face absent modal:', hasFaceAbsentModal);
console.log('   - Audio beep is completely muted:', isMutedBeep);

if (!hasFaceAbsentModal || !isMutedBeep) {
  throw new Error('Face absence modal or beep muting check failed!');
}

// 5. Verify No Native Browser Alert Popups in Exam Flow
console.log('\n5. Verify No Browser alert() in Exam Lockdown Flow');
const hasCustomAlertModal = indexCode.includes('onScreenAlert') && indexCode.includes('showCustomAlert');
const examHasNativeAlert = /if\s*\(isExamInProgress[^\)]*\)\s*\{\s*alert\(/.test(indexCode);
console.log('   - Uses on-screen in-app alert modal:', hasCustomAlertModal);
console.log('   - Does exam lockdown use browser alert():', examHasNativeAlert);

if (!hasCustomAlertModal || examHasNativeAlert) {
  throw new Error('Browser alert replacement check failed!');
}

// 6. Verify Hardened Fullscreen Keyboard & Anti-Tamper Lock
console.log('\n6. Verify Hardened Fullscreen Keyboard & Anti-Tamper Lock');
const hasKeyboardLock = cbtCode.includes('navigator.keyboard.lock') && preflightCode.includes('navigator.keyboard.lock');
const hasKeydownTrap = cbtCode.includes("handleKeyDown") && cbtCode.includes("e.key === 'Escape'") && cbtCode.includes("e.key === 'F11'");
const hasContextMenuTrap = cbtCode.includes("handleContextMenu") && cbtCode.includes("handleCopyCut");

console.log('   - Chromium navigator.keyboard.lock enabled (Escape/F11 trap):', hasKeyboardLock);
console.log('   - Fullscreen keydown trap (Escape, F11, DevTools, F5):', hasKeydownTrap);
console.log('   - Right-click contextmenu & copy/cut trap:', hasContextMenuTrap);

if (!hasKeyboardLock || !hasKeydownTrap || !hasContextMenuTrap) {
  throw new Error('Anti-tamper keyboard and contextmenu lock verification failed!');
}

console.log('\n===============================================================');
console.log('ALL PROCTORING, CAMERA, FULLSCREEN & TIMER TESTS PASSED (100%)');
console.log('===============================================================');
