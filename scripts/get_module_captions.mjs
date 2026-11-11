import fs from 'fs';

const modNum = parseInt(process.argv[2] || '2', 10);
const text = fs.readFileSync(`src/services/db/course03/modules/module${modNum}.js`, 'utf8');

const regex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\\n+\*([^*]+)\*)?/g;
// In JS source text where newlines are \n:
const matches = [...text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)(?:\\n\s*\\n\*([^*]+)\*)?/g)];

console.log(`Module ${modNum}: found ${matches.length} image matches in source`);
matches.forEach((m, idx) => {
  console.log(`[${idx + 1}] Alt: ${m[1]}`);
  console.log(`    URL: ${m[2]}`);
  console.log(`    Caption: *${m[3]}*`);
});
