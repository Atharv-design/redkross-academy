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

let totalIssues = 0;
let totalLessons = 0;

for (const mod of allMods) {
  console.log(`=== ${mod.title} ===`);
  for (const les of mod.lessons) {
    totalLessons++;
    const issues = [];
    try {
      const html = renderMarkdownToHtml(les.content);
      if (html.includes('katex-error') || html.includes('KaTeX parse error')) {
        issues.push('KaTeX parse error in rendered HTML');
      }
    } catch (e) {
      issues.push('Render exception: ' + e.message);
    }
    // Strip code blocks first to check prose
    const withoutCode = les.content.replace(/```[\s\S]*?```/g, '');
    if (/-------{5,}/.test(withoutCode)) {
      issues.push('Dashed banner line found in prose');
    }
    if (/^[0-9]\.[0-9]\s+Explanation/m.test(withoutCode)) {
      issues.push('Unheaded numbered Explanation (missing ###)');
    }
    if (withoutCode.includes('+--') || withoutCode.includes('+==')) {
      issues.push('ASCII table found in prose');
    }

    if (issues.length > 0) {
      console.log(`  ✗ ${les.id} (${les.title}): ${issues.join('; ')}`);
      totalIssues += issues.length;
    } else {
      console.log(`  ✓ ${les.id}: clean`);
    }
  }
}
console.log(`\nVerified ${totalLessons} lessons across 8 modules.`);
console.log(`Total issues detected: ${totalIssues}`);
