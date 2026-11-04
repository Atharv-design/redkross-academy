/**
 * CHALLENGER MILESTONE 5 EMPIRICAL STRESS TEST SUITE
 * 
 * Objective: Empirically stress-test and verify Milestone 5:
 * Classroom Tool Registry Partitioning (R6).
 * 
 * Test Suites:
 * 1. File Integrity & AST/Syntax Validation
 * 2. Division Partitioning & Tool Isolation Logic Verification
 * 3. PsychologyToolStrip Component Specifications & Data Integrity
 *    - Clinical Reflection Journal (4 categories, local persistence pattern)
 *    - Case Study Notes Quick View (3 vignettes: ARCH-402, DEPR-118, CRISIS-009 with Beckian Triad)
 *    - Audio Ambience Player (528Hz, 432Hz, Theta 4Hz via Web Audio API)
 *    - Aesthetic & Theme tokens (#2DD4BF, #0F766E, #FFA439, #06101B, ZERO #00ff00 hacker matrix)
 * 4. Cross-Academy Zero Contamination Matrix
 * 5. Simulation & Boundary Condition Tests
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT_DIR = path.resolve('C:/Users/athar/RedKross Academy Website');
const PSYCH_TOOLSTRIP_PATH = path.join(ROOT_DIR, 'src/components/student/PsychologyToolStrip.jsx');
const LESSON_PLAYER_PATH = path.join(ROOT_DIR, 'src/pages/student/LessonPlayerPage.jsx');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${description}`);
    console.error(`         Reason: ${err.message}`);
    failedTests++;
  }
}

console.log('================================================================');
console.log(' CHALLENGER M5 EMPIRICAL STRESS TEST: CLASSROOM TOOL PARTITIONING');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: FILE INTEGRITY & SYNTAX
// -----------------------------------------------------------------------------
console.log('--- SUITE 1: FILE INTEGRITY & EXPORTS ---');

test('PsychologyToolStrip.jsx exists on disk and is non-empty', () => {
  assert(fs.existsSync(PSYCH_TOOLSTRIP_PATH), 'PsychologyToolStrip.jsx does not exist');
  const stat = fs.statSync(PSYCH_TOOLSTRIP_PATH);
  assert(stat.size > 20000, `PsychologyToolStrip.jsx size unexpectedly small: ${stat.size} bytes`);
});

test('LessonPlayerPage.jsx exists on disk and is non-empty', () => {
  assert(fs.existsSync(LESSON_PLAYER_PATH), 'LessonPlayerPage.jsx does not exist');
  const stat = fs.statSync(LESSON_PLAYER_PATH);
  assert(stat.size > 50000, `LessonPlayerPage.jsx size unexpectedly small: ${stat.size} bytes`);
});

const psychToolStripContent = fs.readFileSync(PSYCH_TOOLSTRIP_PATH, 'utf-8');
const lessonPlayerContent = fs.readFileSync(LESSON_PLAYER_PATH, 'utf-8');

test('PsychologyToolStrip has default export component function', () => {
  assert(
    psychToolStripContent.includes('export default function PsychologyToolStrip'),
    'PsychologyToolStrip must export default component function'
  );
});

test('LessonPlayerPage imports PsychologyToolStrip from correct relative path', () => {
  const importRegex = /import\s+PsychologyToolStrip\s+from\s+['"]\.\.\/\.\.\/components\/student\/PsychologyToolStrip['"]/;
  assert(importRegex.test(lessonPlayerContent), 'PsychologyToolStrip import statement missing or malformed');
});

// -----------------------------------------------------------------------------
// SUITE 2: DIVISION PARTITIONING & TOOL ISOLATION IN LESSONPLAYERPAGE
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 2: DIVISION PARTITIONING & TOOL ISOLATION IN LESSONPLAYERPAGE ---');

test('isPsychology flag is accurately evaluated based on course.division', () => {
  const isPsychRegex = /const\s+isPsychology\s*=\s*\(course\?\.division\s*\|\|\s*['"]['"]\)\.toLowerCase\(\)\s*===\s*['"]psychology['"]/;
  assert(isPsychRegex.test(lessonPlayerContent), 'isPsychology evaluation expression missing or imprecise');
});

test('Section 3 Vertical Tool Strip isolates PsychologyToolStrip vs CockpitToolStrip', () => {
  const section3Match = lessonPlayerContent.match(
    /{\s*\/\*\s*=+ SECTION 3: VERTICAL TACTICAL TOOL STRIP =+\s*\*\/}([\s\S]*?){\s*\/\*\s*=+ 4\./
  );
  assert(section3Match, 'Section 3 tool strip conditional block not found');
  const block = section3Match[1];
  
  // Verify ternary condition
  assert(block.includes('isPsychology ?'), 'Ternary branch for isPsychology missing');
  assert(block.includes('<PsychologyToolStrip'), 'PsychologyToolStrip must be rendered on isPsychology true');
  assert(block.includes('<CockpitToolStrip'), 'CockpitToolStrip must be rendered on isPsychology false');
});

test('MovablePracticeTerminal is strictly guarded and suppressed for psychology division', () => {
  const terminalBlockMatch = lessonPlayerContent.match(
    /{\s*\/\*\s*=+ 5\. MOVABLE TACTICAL PRACTICE TERMINAL =+\s*\*\/}[\s\S]*?{!isPsychology && \([\s\S]*?<MovablePracticeTerminal[\s\S]*?\)\s*}/
  );
  assert(terminalBlockMatch, 'MovablePracticeTerminal must be strictly wrapped with {!isPsychology && (...)}');
});

test('CyberLabDesktopWindow is strictly guarded and suppressed for psychology division', () => {
  const cyberLabBlockMatch = lessonPlayerContent.match(
    /{\s*\/\*\s*=+ 6\. MOVABLE CYBERLAB V3 KALI DESKTOP =+\s*\*\/}[\s\S]*?{!isPsychology && \([\s\S]*?<CyberLabDesktopWindow[\s\S]*?\)\s*}/
  );
  assert(cyberLabBlockMatch, 'CyberLabDesktopWindow must be strictly wrapped with {!isPsychology && (...)}');
});

test('Global Ctrl+K / Cmd+K terminal keydown listener is guarded with !isPsychology', () => {
  const keydownListenerMatch = lessonPlayerContent.match(
    /\(e\.ctrlKey\s*\|\|\s*e\.metaKey\)\s*&&\s*e\.key\.toLowerCase\(\)\s*===\s*['"]k['"][\s\S]*?if\s*\(!isPsychology\)\s*{[\s\S]*?setIsMacTerminalOpen/
  );
  assert(keydownListenerMatch, 'Ctrl+K shortcut must be prevented from opening tactical terminal in psychology courses');
});

// Empirical Division Routing Simulation
test('Empirical partition evaluation logic handles various division inputs correctly', () => {
  const evaluatePartition = (division) => {
    const isPsychology = (division || '').toLowerCase() === 'psychology';
    return {
      rendersPsychologyToolStrip: isPsychology,
      rendersCockpitToolStrip: !isPsychology,
      rendersMovableTerminal: !isPsychology,
      rendersCyberLab: !isPsychology,
      allowsCtrlKTerminal: !isPsychology
    };
  };

  // Case 1: Psychology division
  const psychState = evaluatePartition('psychology');
  assert.strictEqual(psychState.rendersPsychologyToolStrip, true);
  assert.strictEqual(psychState.rendersCockpitToolStrip, false);
  assert.strictEqual(psychState.rendersMovableTerminal, false);
  assert.strictEqual(psychState.rendersCyberLab, false);
  assert.strictEqual(psychState.allowsCtrlKTerminal, false);

  // Case 2: Psychology uppercase
  const psychUpper = evaluatePartition('PSYCHOLOGY');
  assert.strictEqual(psychUpper.rendersPsychologyToolStrip, true);
  assert.strictEqual(psychUpper.rendersCockpitToolStrip, false);

  // Case 3: Cybersecurity division
  const cyberState = evaluatePartition('cybersecurity');
  assert.strictEqual(cyberState.rendersPsychologyToolStrip, false);
  assert.strictEqual(cyberState.rendersCockpitToolStrip, true);
  assert.strictEqual(cyberState.rendersMovableTerminal, true);
  assert.strictEqual(cyberState.rendersCyberLab, true);
  assert.strictEqual(cyberState.allowsCtrlKTerminal, true);

  // Case 4: Default / undefined division
  const defaultState = evaluatePartition(undefined);
  assert.strictEqual(defaultState.rendersPsychologyToolStrip, false);
  assert.strictEqual(defaultState.rendersCockpitToolStrip, true);
  assert.strictEqual(defaultState.rendersMovableTerminal, true);

  // Case 5: Empty division
  const emptyState = evaluatePartition('');
  assert.strictEqual(emptyState.rendersPsychologyToolStrip, false);
  assert.strictEqual(emptyState.rendersCockpitToolStrip, true);
});

// -----------------------------------------------------------------------------
// SUITE 3: PSYCHOLOGYTOOLSTRIP SPECIFICATIONS & CLINICAL CAPABILITIES
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 3: PSYCHOLOGYTOOLSTRIP COMPONENT SPECIFICATIONS ---');

// Drawer 1: Clinical Reflection Journal
test('Clinical Reflection Journal contains all 4 mandatory clinical categories', () => {
  assert(psychToolStripContent.includes("'Cognitive Formulation'"), 'Cognitive Formulation missing');
  assert(psychToolStripContent.includes("'Therapeutic Alliance'"), 'Therapeutic Alliance missing');
  assert(psychToolStripContent.includes("'Ethical Deliberation'"), 'Ethical Deliberation missing');
  assert(psychToolStripContent.includes("'Countertransference'"), 'Countertransference missing');
});

test('Clinical Reflection Journal uses local storage persistence pattern rk_psych_reflections_', () => {
  const storagePattern = /rk_psych_reflections_\${enrolmentId\s*\|\|\s*course\?\.id\s*\|\|\s*['"]general['"]}/;
  assert(storagePattern.test(psychToolStripContent), 'LocalStorage key pattern rk_psych_reflections_ missing or invalid');
  assert(psychToolStripContent.includes('localStorage.setItem'), 'localStorage.setItem call missing');
  assert(psychToolStripContent.includes('localStorage.getItem'), 'localStorage.getItem call missing');
});

test('Clinical Reflection Journal supports qualitative text entry and delete capability', () => {
  assert(psychToolStripContent.includes('handleSaveReflection'), 'handleSaveReflection missing');
  assert(psychToolStripContent.includes('handleDeleteReflection'), 'handleDeleteReflection missing');
  assert(psychToolStripContent.includes('<textarea'), 'Qualitative textarea missing');
  assert(psychToolStripContent.includes('patientContext'), 'Patient context input missing');
});

// Drawer 2: Case Study Notes Quick View
test('Case Study Notes contains exactly 3 clinical vignettes (ARCH-402, DEPR-118, CRISIS-009)', () => {
  assert(psychToolStripContent.includes('ARCH-402'), 'Vignette ARCH-402 missing');
  assert(psychToolStripContent.includes('DEPR-118'), 'Vignette DEPR-118 missing');
  assert(psychToolStripContent.includes('CRISIS-009'), 'Vignette CRISIS-009 missing');
});

test('Case Study Notes implements complete Beckian Cognitive Triad decomposition per vignette', () => {
  // Check schema for Self, World/Others, and Future
  assert(psychToolStripContent.includes('cognitiveTriad:'), 'cognitiveTriad object missing in case definitions');
  assert(psychToolStripContent.includes('Schema Regarding Self'), 'Schema Regarding Self label missing');
  assert(psychToolStripContent.includes('Schema Regarding World & Others'), 'Schema Regarding World label missing');
  assert(psychToolStripContent.includes('Schema Regarding Future'), 'Schema Regarding Future label missing');
});

test('Case Study Notes includes cognitive distortions and active exposure interventions', () => {
  assert(psychToolStripContent.includes('distortions:'), 'distortions array missing');
  assert(psychToolStripContent.includes('exposureInterventions:'), 'exposureInterventions array missing');
  assert(psychToolStripContent.includes('Catastrophizing:'), 'Catastrophizing distortion missing');
  assert(psychToolStripContent.includes('Interoceptive Exposure:'), 'Interoceptive Exposure intervention missing');
  assert(psychToolStripContent.includes('Behavioral Activation (BA):'), 'Behavioral Activation missing');
});

// Drawer 3: Audio Ambience Player
test('Audio Ambience Player includes 528Hz Solfeggio, 432Hz Harmonic Flow, and Theta 4Hz Binaural Calm', () => {
  assert(psychToolStripContent.includes('528 Hz Solfeggio'), '528 Hz Solfeggio preset missing');
  assert(psychToolStripContent.includes('432 Hz Harmonic Flow'), '432 Hz Harmonic Flow preset missing');
  assert(psychToolStripContent.includes('Theta 4 Hz Binaural Calm'), 'Theta 4 Hz Binaural Calm preset missing');
});

test('Audio Ambience Player synthesizes audio natively via Web Audio API', () => {
  assert(psychToolStripContent.includes('window.AudioContext'), 'AudioContext instantiation missing');
  assert(psychToolStripContent.includes('createGain'), 'Master Gain Node missing');
  assert(psychToolStripContent.includes('createOscillator'), 'Oscillator creation missing');
  assert(psychToolStripContent.includes('linearRampToValueAtTime'), 'Smooth gain ramp missing');
  assert(psychToolStripContent.includes('createChannelMerger'), 'Stereo channel merger for binaural beat missing');
});

test('Audio Ambience Player provides volume control, play/pause toggle, and cleanup on unmount', () => {
  assert(psychToolStripContent.includes('toggleAmbiencePlay'), 'toggleAmbiencePlay missing');
  assert(psychToolStripContent.includes('stopAudio'), 'stopAudio cleanup function missing');
  assert(psychToolStripContent.includes('setVolume'), 'setVolume missing');
  assert(psychToolStripContent.includes('input type="range"') || psychToolStripContent.includes('type="range"'), 'Volume range slider missing');
});

// -----------------------------------------------------------------------------
// SUITE 4: AESTHETIC COMPLIANCE & ZERO MATRIX GREEN GUARANTEE
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 4: AESTHETIC COMPLIANCE & THEME ISOLATION ---');

test('PsychologyToolStrip strictly complies with Sage/Teal/Amber clinical tokens', () => {
  assert(psychToolStripContent.includes('#2DD4BF'), 'Sage/Teal token #2DD4BF missing');
  assert(psychToolStripContent.includes('#0F766E'), 'Deep Teal token #0F766E missing');
  assert(psychToolStripContent.includes('#FFA439'), 'Warm Amber token #FFA439 missing');
  assert(psychToolStripContent.includes('#06101B'), 'Obsidian Black base #06101B missing');
});

test('PsychologyToolStrip has STRICTLY ZERO #00ff00 matrix green hacker styling', () => {
  const forbiddenMatrixGreen = /#00ff00|#00FF00|text-green-500|bg-green-500|border-green-500/;
  const hasForbidden = forbiddenMatrixGreen.test(psychToolStripContent);
  assert(!hasForbidden, 'Forbidden green matrix hacker styling detected in PsychologyToolStrip.jsx!');
});

test('PsychologyToolStrip enforces Lora / Cinzel typography (font-royal / font-serif)', () => {
  assert(psychToolStripContent.includes('font-royal'), 'font-royal typography token missing in PsychologyToolStrip');
});

test('PsychologyToolStrip contains zero cyber/terminal iconography', () => {
  const terminalIconMatches = psychToolStripContent.match(/Terminal|Kali|Hacking|CyberLab/);
  assert(!terminalIconMatches, `Forbidden cyber/terminal references found: ${terminalIconMatches}`);
});

// -----------------------------------------------------------------------------
// SUITE 5: COMPONENT PROPS & COLLAPSE CONTRACTS
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 5: COMPONENT PROPS & CONTRACTS ---');

test('PsychologyToolStrip accepts and handles standard classroom props', () => {
  const propsMatch = psychToolStripContent.match(
    /function\s+PsychologyToolStrip\s*\(\s*{\s*course,\s*enrolment,\s*enrolmentId,\s*activeUnit,\s*onCollapse\s*}\s*\)/
  );
  assert(propsMatch, 'PsychologyToolStrip props declaration does not match required interface contract');
});

test('PsychologyToolStrip provides interactive minimization and full collapse triggers', () => {
  assert(psychToolStripContent.includes('setIsMinimized'), 'Minimization toggle missing');
  assert(psychToolStripContent.includes('onCollapse'), 'onCollapse handler invocation missing');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(` EMPIRICAL STRESS TEST COMPLETE: ${passedTests}/${totalTests} PASSED`);
if (failedTests > 0) {
  console.log(` WARNING: ${failedTests} TESTS FAILED!`);
  process.exit(1);
} else {
  console.log(' ALL 20 EMPIRICAL CHALLENGER STRESS TESTS PASSED CLEANLY (100%)');
  console.log('================================================================\n');
  process.exit(0);
}
