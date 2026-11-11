import fs from 'fs';

async function scanAll() {
  for (let modNum = 1; modNum <= 8; modNum++) {
    const mod = await import(`../src/services/db/course03/modules/module${modNum}.js`);
    const data = mod[`module${modNum}Data`];
    const lessons = data.lessons;
    let modAnomalies = 0;
    lessons.forEach(lesson => {
      const lines = lesson.content.split('\n');
      lines.forEach((line, idx) => {
        const t = line.trim();
        // Colon outside asterisks
        if (/^[-*]\s+\*\*[^*:]+\*\*:\s+/.test(t)) {
          console.log(`[Mod ${modNum} | ${lesson.id} | L${idx+1}] Colon outside: ${t.slice(0, 80)}`);
          modAnomalies++;
        }
        // Em dash without bold
        if (/^[-*]\s+[A-Za-z0-9_.\-\/\s]{2,25}\s*—\s+/.test(t) && !t.startsWith('- **') && !t.startsWith('- `')) {
          console.log(`[Mod ${modNum} | ${lesson.id} | L${idx+1}] Em-dash: ${t.slice(0, 80)}`);
          modAnomalies++;
        }
      });
    });
    if (modAnomalies === 0) {
      console.log(`Module ${modNum}: 0 formatting anomalies.`);
    }
  }
}

scanAll().catch(console.error);
