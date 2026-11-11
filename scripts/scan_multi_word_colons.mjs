import fs from 'fs';

async function scanMultiWordColons() {
  for (let modNum = 1; modNum <= 8; modNum++) {
    const mod = await import(`../src/services/db/course03/modules/module${modNum}.js`);
    const data = mod[`module${modNum}Data`];
    const lessons = data.lessons;
    lessons.forEach(lesson => {
      const lines = lesson.content.split('\n');
      lines.forEach((line, idx) => {
        const t = line.trim();
        const match = t.match(/^[-*]\s+([A-Za-z0-9_.\-\/\s]{1,40}):\s+(.+)$/);
        if (match && !t.startsWith('- **') && !t.startsWith('- `') && !t.startsWith('- *') && !t.startsWith('- http')) {
          console.log(`[Mod ${modNum} | ${lesson.id} | L${idx+1}] "${match[1]}": ${match[2].slice(0, 60)}`);
        }
      });
    });
  }
}

scanMultiWordColons().catch(console.error);
