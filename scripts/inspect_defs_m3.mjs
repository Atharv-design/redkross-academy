import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';

console.log('=== MODULE 3 DEFINITION INSPECTION ===');
module3Data.lessons.forEach((l, i) => {
  console.log(`\n--- Lesson 3.${i+1}: ${l.title} ---`);
  const lines = l.content.split('\n');
  lines.forEach(line => {
    if (line.match(/^[-*]\s+\*\*/)) {
      console.log('  Bullet:', line.slice(0, 90));
    } else if (line.match(/^###\s+/) && (line.includes(':') || line.toLowerCase().includes('term') || line.toLowerCase().includes('concept'))) {
      console.log('  Heading:', line.slice(0, 90));
    }
  });
});
