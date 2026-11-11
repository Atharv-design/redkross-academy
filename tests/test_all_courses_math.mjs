import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';
import { mockEngine } from '../src/services/db/mockEngine.js';

console.log('Auditing all courses in catalog via mockEngine...');
let errors = 0;
let totalLessons = 0;

const courses = mockEngine.getCourses();

courses.forEach(c => {
  console.log(`Checking Course: ${c.title} (${c.id})...`);
  (c.modules || []).forEach((m, mIdx) => {
    (m.lessons || []).forEach((l, lIdx) => {
      totalLessons++;
      const html = renderMarkdownToHtml(l.content);
      if (html.includes('katex-error') || html.includes('border-red-500/30')) {
        console.error(`  [FAIL] Module ${mIdx+1} Lesson ${lIdx+1} has KaTeX errors!`);
        errors++;
      }
    });
  });
});

console.log(`Total catalog lessons checked: ${totalLessons}, Errors: ${errors}`);
if (errors === 0) {
  console.log('>>> ZERO REGRESSIONS ACROSS ENTIRE CATALOG! <<<');
} else {
  process.exit(1);
}
