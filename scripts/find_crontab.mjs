import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('crontab -l for each user')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
