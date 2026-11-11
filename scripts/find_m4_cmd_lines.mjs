import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  const t = l.trim();
  if (/^[a-z0-9_\-]+\s+-[a-zA-Z0-9]/.test(t) && !t.startsWith('```') && !t.startsWith('-') && !t.startsWith('*')) {
    console.log(`Line ${i + 1}: ${t}`);
  }
});
