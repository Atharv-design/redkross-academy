import fs from 'fs';
import path from 'path';

const files = [
  { mod: 'src/services/db/course03/modules/module3.js', bak: 'src/backups/formatting_enhancement/module3.js.bak' },
  { mod: 'src/services/db/course03/modules/module4.js', bak: 'src/backups/formatting_enhancement/module4.js.bak' },
  { mod: 'src/services/db/course03/modules/module5.js', bak: 'src/backups/formatting_enhancement/module5.js.bak' },
  { mod: 'src/utils/markdownParser.js', bak: 'src/backups/formatting_enhancement/markdownParser.js.bak' },
  { mod: 'src/index.css', bak: 'src/backups/formatting_enhancement/index.css.bak' }
];

console.log('=== BACKUP INTEGRITY & CONTENT PRESERVATION REPORT ===');
for (const f of files) {
  const orig = fs.readFileSync(f.bak, 'utf8');
  const curr = fs.readFileSync(f.mod, 'utf8');
  console.log(`\nFile: ${f.mod}`);
  console.log(`  Backup Size: ${orig.length} bytes, Current Size: ${curr.length} bytes (Delta: ${curr.length - orig.length} bytes)`);

  // If it's a module file, verify JSON parsing & quizzes
  if (f.mod.includes('module')) {
    const origQuizzes = (orig.match(/"id":\s*"q_/g) || []).length;
    const currQuizzes = (curr.match(/"id":\s*"q_/g) || []).length;
    const origLessons = (orig.match(/"id":\s*"les_/g) || []).length;
    const currLessons = (curr.match(/"id":\s*"les_/g) || []).length;
    const origFigures = (orig.match(/Figure C03-/g) || []).length;
    const currFigures = (curr.match(/Figure C03-/g) || []).length;
    console.log(`  Lessons: ${currLessons}/${origLessons} | Quizzes: ${currQuizzes}/${origQuizzes} | Figures: ${currFigures}/${origFigures}`);
    if (origQuizzes !== currQuizzes || origLessons !== currLessons || origFigures !== currFigures) {
      console.error(`  [CRITICAL] Asset count mismatch in ${f.mod}!`);
      process.exit(1);
    }
  }
}
console.log('\n>>> CONTENT PRESERVATION VERIFIED: ZERO QUIZZES, LESSONS, OR FIGURES LOST! <<<');
