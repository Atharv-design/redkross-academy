import { module1Data } from '../src/services/db/course03/modules/module1.js';

module1Data.lessons.forEach((l, idx) => {
  console.log(`\n======================================================================`);
  console.log(`LESSON 1.${idx + 1}: ${l.title}`);
  
  const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g;
  let match;
  let count = 0;
  while ((match = mdRegex.exec(l.content)) !== null) {
    count++;
    const start = match.index;
    const end = start + match[0].length;
    console.log(`\n--- Figure ${count}: ${match[1]} ---`);
    console.log(`[Before Image (-150 chars)]:`);
    console.log(l.content.substring(Math.max(0, start - 150), start).trim());
    console.log(`\n[Exact Image Tag & Caption]:`);
    console.log(match[0]);
    console.log(`\n[After Image (+200 chars)]:`);
    console.log(l.content.substring(end, Math.min(l.content.length, end + 200)).trim());
  }
});
