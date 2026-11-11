import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Improvement ideas for the practical')) {
    console.log(`Line ${i + 1}: ${l}`);
    lines.slice(i, i + 10).forEach((sub, j) => console.log(`  +${j}: ${sub}`));
  }
});
