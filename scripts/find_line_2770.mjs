import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module3.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('- 2770:')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
