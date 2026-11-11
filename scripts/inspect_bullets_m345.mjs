import fs from 'fs';

async function inspectBulletsM345() {
  for (const modNum of [3, 4, 5]) {
    const mod = await import(`../src/services/db/course03/modules/module${modNum}.js`);
    const data = mod[`module${modNum}Data`];
    const lessons = data.lessons;
    console.log(`\n=== BULLET INSPECTION: MODULE ${modNum} ===`);
    lessons.forEach(l => {
      const lines = l.content.split('\n');
      lines.forEach((line, i) => {
        const t = line.trim();
        if (t.startsWith('- ') || t.startsWith('* ')) {
          // Check if it's a definition: has colon or em-dash or definition keywords
          if (t.includes('—') || (t.includes(':') && !t.startsWith('- **') && !t.startsWith('- `'))) {
            console.log(`[${l.id} L${i+1}] ${t.slice(0, 100)}`);
          }
        }
      });
    });
  }
}

inspectBulletsM345().catch(console.error);
