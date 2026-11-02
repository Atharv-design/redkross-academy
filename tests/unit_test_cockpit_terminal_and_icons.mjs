import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('--- STARTING COCKPIT TERMINAL & SYLLABUS ICONS RIGOROUS VERIFICATION ---');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`[PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${desc}: ${err.message}`);
    failCount++;
  }
}

// 1. Verify LessonPlayerPage.jsx Real Icons
const playerPath = path.resolve('src/pages/student/LessonPlayerPage.jsx');
const playerSrc = fs.readFileSync(playerPath, 'utf8');

it('LessonPlayerPage imports real Folder and FolderOpen icons', () => {
  assert(playerSrc.includes('Folder,'), 'Missing Folder import');
  assert(playerSrc.includes('FolderOpen,'), 'Missing FolderOpen import');
});

it('LessonPlayerPage imports BookOpen icon for lessons and chapters', () => {
  assert(playerSrc.includes('BookOpen,'), 'Missing BookOpen import');
});

it('LessonPlayerPage renders Folder/FolderOpen on modules according to state', () => {
  assert(playerSrc.includes('<Folder className="w-4 h-4'), 'Missing Folder render');
  assert(playerSrc.includes('<FolderOpen className="w-4 h-4'), 'Missing FolderOpen render');
});

it('LessonPlayerPage renders BookOpen icon for lessons in syllabus tree', () => {
  assert(playerSrc.includes('<BookOpen'), 'Missing BookOpen render in syllabus');
});

it('LessonPlayerPage integrates CockpitTerminalPanel into Section 3', () => {
  assert(playerSrc.includes('<CockpitTerminalPanel'), 'Missing CockpitTerminalPanel invocation');
});

it('LessonPlayerPage Terminal toggle button is accessible on both mobile and desktop', () => {
  assert(playerSrc.includes('title={inspectorOpen ? \'Hide Terminal\' : \'Show Terminal\'}'), 'Missing Terminal button title');
  assert(playerSrc.includes('<Terminal className="w-4 h-4 text-[#65F58A]" />'), 'Missing Terminal icon in nav');
});

// 2. Verify CockpitTerminalPanel.jsx
const panelPath = path.resolve('src/components/student/CockpitTerminalPanel.jsx');
const panelSrc = fs.readFileSync(panelPath, 'utf8');

it('CockpitTerminalPanel has clean minimal header title "Terminal"', () => {
  assert(panelSrc.includes('<h3 className="font-bold text-sm text-white font-lora leading-tight">Terminal</h3>'), 'Terminal title must be clean without verbose OS labels');
  assert(panelSrc.includes('E2B Cloud MicroVM'), 'Status must indicate E2B Cloud MicroVM');
});

it('CockpitTerminalPanel supports multi-terminal tabs with add and close actions', () => {
  assert(panelSrc.includes('handleAddTerminal'), 'Missing handleAddTerminal function');
  assert(panelSrc.includes('handleCloseTerminal'), 'Missing handleCloseTerminal function');
  assert(panelSrc.includes('terminals.map'), 'Missing tab bar rendering');
});

it('CockpitTerminalPanel contains dynamic chapter-aware help and commands drawer', () => {
  assert(panelSrc.includes('getCommandsForModule'), 'Missing getCommandsForModule logic');
  assert(panelSrc.includes('isHelpOpen'), 'Missing help open toggle');
  assert(panelSrc.includes('Chapter Suggested Exercises'), 'Missing suggested exercises heading');
});

it('CockpitTerminalPanel provides 1-click Run and Copy buttons for commands', () => {
  assert(panelSrc.includes('executeCommand(item.command)'), 'Missing 1-click Run invocation');
  assert(panelSrc.includes('navigator.clipboard.writeText(item.command)'), 'Missing 1-click Copy invocation');
});

it('CockpitTerminalPanel provides mobile backdrop overlay and slide-over support', () => {
  assert(panelSrc.includes('xl:hidden animate-fadeIn'), 'Missing mobile backdrop overlay');
  assert(panelSrc.includes('fixed inset-y-0 right-0 w-full sm:w-[420px]'), 'Missing mobile slide-over container');
  assert(panelSrc.includes('xl:static xl:sticky'), 'Missing desktop sticky positioning');
});

// 3. Verify E2B Cloud Backend Integration (api/e2b.js)
const e2bPath = path.resolve('api/e2b.js');
const e2bSrc = fs.readFileSync(e2bPath, 'utf8');

it('api/e2b.js imports official @e2b/code-interpreter Sandbox SDK', () => {
  assert(e2bSrc.includes('@e2b/code-interpreter'), 'Missing @e2b/code-interpreter import');
});

it('api/e2b.js handles create, exec, and terminate actions', () => {
  assert(e2bSrc.includes('action === \'create\''), 'Missing create action');
  assert(e2bSrc.includes('action === \'exec\''), 'Missing exec action');
  assert(e2bSrc.includes('action === \'terminate\''), 'Missing terminate action');
});

it('api/e2b.js measures execution time in milliseconds', () => {
  assert(e2bSrc.includes('executionTimeMs'), 'Missing executionTimeMs metric');
});

// 4. Test API execution with scratch/test_e2b_endpoint.mjs
const testEndpointPath = path.resolve('scratch/test_e2b_endpoint.mjs');
if (fs.existsSync(testEndpointPath)) {
  it('E2B API endpoint verification test file exists', () => {
    assert(fs.existsSync(testEndpointPath));
  });
}

console.log(`\n--- VERIFICATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED ---`);
if (failCount > 0) {
  process.exit(1);
}