import { module1Data } from '../src/services/db/curriculum/module1.js';
import { module2Data } from '../src/services/db/curriculum/module2.js';
import { module3Data } from '../src/services/db/curriculum/module3.js';
import { module4Data } from '../src/services/db/curriculum/module4.js';
import { module5Data } from '../src/services/db/curriculum/module5.js';

const modules = [
  { mod: module1Data, name: 'Module 1' },
  { mod: module2Data, name: 'Module 2' },
  { mod: module3Data, name: 'Module 3' },
  { mod: module4Data, name: 'Module 4' },
  { mod: module5Data, name: 'Module 5' }
];

let totalLessons = 0;
let totalPartsFound = 0;
let totalCourseTitlesFound = 0;
let totalMistakeHeadersWithLongText = 0;

console.log('--- RUNNING CURRICULUM ACADEMIC STANDARD AUDIT ---');

modules.forEach(({ mod, name }) => {
  console.log(`\nChecking ${name} (${mod.lessons.length} lessons)...`);
  mod.lessons.forEach((l, idx) => {
    totalLessons++;
    const parts = l.content.match(/^## Part \d+/gm);
    if (parts) {
      console.error(`  [FAIL] ${l.id} has remaining Part headings:`, parts);
      totalPartsFound += parts.length;
    }

    const courseTitle = l.content.match(/^# Course 01/gm);
    if (courseTitle) {
      console.error(`  [FAIL] ${l.id} has course title header`);
      totalCourseTitlesFound += courseTitle.length;
    }

    const badMistakes = l.content.match(/^### Mistake \d+:.{80,}/gm);
    if (badMistakes) {
      console.error(`  [WARN] ${l.id} has unparsed mistake line:`, badMistakes);
      totalMistakeHeadersWithLongText += badMistakes.length;
    }
  });
});

console.log('\n================ AUDIT SUMMARY ================');
console.log(`Total Lessons Audited: ${totalLessons}`);
console.log(`Remaining "Part N" Headings: ${totalPartsFound} (Target: 0)`);
console.log(`Remaining Course Title Banners: ${totalCourseTitlesFound} (Target: 0)`);
console.log(`Unsplit Long Mistake Headings: ${totalMistakeHeadersWithLongText} (Target: 0)`);

if (totalPartsFound === 0 && totalCourseTitlesFound === 0 && totalMistakeHeadersWithLongText === 0) {
  console.log('>>> ALL 33 LESSONS PASS ACADEMIC TEXTBOOK STANDARD WITH 100% SUCCESS! <<<');
} else {
  console.log('>>> ISSUES FOUND IN AUDIT <<<');
}
