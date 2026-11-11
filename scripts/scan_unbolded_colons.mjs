import fs from 'fs';

async function scanColons() {
  for (let modNum = 1; modNum <= 8; modNum++) {
    const mod = await import(`../src/services/db/course03/modules/module${modNum}.js`);
    const data = mod[`module${modNum}Data`];
    const lessons = data.lessons;
    lessons.forEach(lesson => {
      const lines = lesson.content.split('\n');
      lines.forEach((line, idx) => {
        const t = line.trim();
        // check if bullet starts with "- word(s): " without bold
        const match = t.match(/^[-*]\s+([A-Za-z0-9_.\-\/]{1,30}):\s+(.+)$/);
        if (match && !t.startsWith('- **') && !t.startsWith('- `') && !t.startsWith('- *')) {
          console.log(`[Mod ${modNum} | ${lesson.id} | L${idx+1}] Potential unbolded def: "${match[1]}": ${match[2].slice(0, 70)}`);
        }
      });
    });
  }
}

scanColons().catch(console.error);
