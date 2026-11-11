import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module5.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('RID `500`') || l.includes('RID 500')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
