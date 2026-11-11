import fs from 'fs';
import { module1Data } from '../src/services/db/course03/modules/module1.js';

console.log('=== MODULE 1 LESSON INSPECTION ===');
module1Data.lessons.forEach((l, idx) => {
  console.log(`\n--------------------------------------------------`);
  console.log(`Lesson 1.${idx + 1}: ${l.title}`);
  console.log(`ID: ${l.id}`);
  console.log(`Summary: ${l.summary}`);
  console.log(`Content length: ${l.content.length}`);

  // Find image placements
  const imgMatches = [...l.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g)];
  imgMatches.forEach((m, mIdx) => {
    console.log(`  Figure ${mIdx + 1}: ${m[1]}`);
    console.log(`    URL: ${m[2]}`);
    console.log(`    Caption: ${m[3]}`);
  });
});
