import fs from 'fs';

async function scanModules() {
  for (const modNum of [3, 4, 5]) {
    const mod = await import(`../src/services/db/course03/modules/module${modNum}.js`);
    const data = mod[`module${modNum}Data`];
    const lessons = data.lessons;
    console.log(`\n================ MODULE ${modNum} (${lessons.length} lessons) ================`);
    lessons.forEach(lesson => {
      const lines = lesson.content.split('\n');
      const anomalies = [];
      lines.forEach((line, idx) => {
        const t = line.trim();
        // Em dash
        if (/^[-*]\s+[A-Za-z0-9_.\-\/\s]{2,30}\s*—\s+/.test(t) && !t.startsWith('- **') && !t.startsWith('- `')) {
          anomalies.push({ line: idx + 1, type: 'em-dash', text: t });
        }
        // Plain colon
        if (/^[-*]\s+[A-Za-z0-9_.\-\/]{2,25}:\s+[A-Za-z]/.test(t) && !t.startsWith('- **') && !t.startsWith('- `') && !t.startsWith('- *')) {
          anomalies.push({ line: idx + 1, type: 'plain-colon', text: t });
        }
        // Colon outside asterisks: **Term**:
        if (/^[-*]\s+\*\*[^*:]+\*\*:\s+/.test(t)) {
          anomalies.push({ line: idx + 1, type: 'colon-outside-bold', text: t });
        }
        // Unbulleted term definitions, e.g. UID 0: root
        if (/^(?:UID|GID|\d{3,4})\s*[:—]\s+/.test(t)) {
          anomalies.push({ line: idx + 1, type: 'unbulleted-id', text: t });
        }
      });
      if (anomalies.length > 0) {
        console.log(`Lesson ${lesson.id} (${anomalies.length} anomalies):`);
        anomalies.forEach(a => console.log(`  [L${a.line}] [${a.type}] ${a.text.slice(0, 85)}`));
      }
    });
  }
}

scanModules().catch(console.error);
