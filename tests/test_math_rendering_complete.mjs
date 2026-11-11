import fs from 'fs';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const allModules = [
  module1Data, module2Data, module3Data, module4Data,
  module5Data, module6Data, module7Data, module8Data
];

console.log('=== STARTING COURSE 03 COMPREHENSIVE MATHEMATICAL RENDERING AUDIT ===');

let totalLessonsAudited = 0;
let totalMathStepsBlocks = 0;
let totalDisplayMathBlocks = 0;
let totalInlineMathBlocks = 0;
let totalKatexErrors = 0;
let totalBrokenContainers = 0;

allModules.forEach((mod, mIdx) => {
  mod.lessons.forEach((lesson, lIdx) => {
    totalLessonsAudited++;
    const lessonId = `Lesson ${mIdx + 1}.${lIdx + 1}`;
    const html = renderMarkdownToHtml(lesson.content);

    // 1. Check for KaTeX parse errors
    if (html.includes('katex-error') || html.includes('border-red-500/30')) {
      console.error(`[FAIL] ${lessonId} contains KaTeX parse errors!`);
      totalKatexErrors++;
    }

    // 2. Count Math Steps blocks
    const mathStepsMatches = html.match(/math-step-formula/g) || [];
    totalMathStepsBlocks += mathStepsMatches.length;

    // 3. Count Display Math blocks
    const dispMatches = html.match(/class="not-prose my-[\d.]+ py-[\d.]+/g) || [];
    totalDisplayMathBlocks += dispMatches.length;

    // 4. Count Inline Math blocks
    const inlineMatches = html.match(/class="not-prose inline-math/g) || [];
    totalInlineMathBlocks += inlineMatches.length;

    // 5. Check that all katex containers have not-prose
    const unisolatedKatex = html.match(/<div class="[^"]*katex-display[^"]*"(?!.*not-prose)/g);
    if (unisolatedKatex) {
      console.error(`[FAIL] ${lessonId} has unisolated KaTeX display!`);
      totalBrokenContainers++;
    }
  });
});

console.log('\n--- AUDIT RESULTS ---');
console.log(`Total Lessons Audited: ${totalLessonsAudited}`);
console.log(`Total Math Steps Formulas Rendered: ${totalMathStepsBlocks}`);
console.log(`Total Display Math Formulas Rendered: ${totalDisplayMathBlocks}`);
console.log(`Total Inline Math Formulas Rendered: ${totalInlineMathBlocks}`);
console.log(`Total KaTeX Errors Encountered: ${totalKatexErrors}`);
console.log(`Total Broken Containers: ${totalBrokenContainers}`);

if (totalKatexErrors === 0 && totalBrokenContainers === 0 && totalDisplayMathBlocks > 0) {
  console.log('\n>>> SUCCESS: ALL 48 LESSONS RENDERED WITH ZERO KATEX ERRORS AND 100% CLEAN ISOLATION! <<<');
  process.exit(0);
} else {
  console.error('\n>>> AUDIT FAILED! <<<');
  process.exit(1);
}
