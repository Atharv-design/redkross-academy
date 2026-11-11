import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';
import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const allMods = [module1Data, module2Data, module3Data, module4Data, module5Data, module6Data, module7Data, module8Data];

let totalMathSpans = 0;
let totalDisplayMath = 0;
let rawTokensFound = 0;

for (const mod of allMods) {
  for (const les of mod.lessons) {
    const html = renderMarkdownToHtml(les.content);
    // Count katex elements
    const inlineMath = [...html.matchAll(/class="katex"/g)].length;
    const displayMath = [...html.matchAll(/class="katex-display"/g)].length;
    totalMathSpans += inlineMath;
    totalDisplayMath += displayMath;

    // Check if there are any unparsed raw LaTeX commands outside code blocks
    const noCode = html.replace(/<pre[\s\S]*?<\/pre>/gi, '').replace(/<code[\s\S]*?<\/code>/gi, '');
    const rawTokens = [...noCode.matchAll(/\\[a-zA-Z]{4,}/g)].map(m => m[0]);
    if (rawTokens.length > 0) {
      // Filter out harmless HTML entities or known attributes
      const filtered = rawTokens.filter(t => !['\\SYSTEM'].includes(t));
      if (filtered.length > 0) {
        console.log(`Potential raw tokens in ${les.id}:`, filtered);
        rawTokensFound += filtered.length;
      }
    }
  }
}

console.log(`\nTotal KaTeX spans rendered: ${totalMathSpans}`);
console.log(`Total KaTeX display blocks rendered: ${totalDisplayMath}`);
console.log(`Unrendered raw LaTeX tokens outside code: ${rawTokensFound}`);
