import fs from 'fs';

for (const modNum of [3, 4, 5]) {
  const filePath = `src/services/db/course03/modules/module${modNum}.js`;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`=== MODULE ${modNum} ===`);
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // 1. Bullet with em-dash without bold: "- Term — definition"
    if (/^[-*]\s+[^*-`]+?—\s+/.test(trimmed)) {
      console.log(`  [Line ${idx+1}] Em-dash: ${trimmed.slice(0, 90)}`);
    }
    // 2. Bullet with arrow: "- **Term:** -> definition"
    else if (/^[-*]\s+\*\*[^*]+?\*\*:\s*->\s*/.test(trimmed)) {
      console.log(`  [Line ${idx+1}] Arrow def: ${trimmed.slice(0, 90)}`);
    }
    // 3. Bullet with plain text term colon: "- Term: Definition" (not bolded, not backticked)
    else if (/^[-*]\s+[A-Za-z0-9_.\-\/\s]{2,30}:\s+[A-Za-z]/.test(trimmed) && !trimmed.startsWith('- **') && !trimmed.startsWith('- `') && !trimmed.startsWith('- *')) {
      console.log(`  [Line ${idx+1}] Plain colon: ${trimmed.slice(0, 90)}`);
    }
    // 4. Colon outside bold: "- **Term**: Definition"
    else if (/^[-*]\s+\*\*[^*]+?\*\*:\s+/.test(trimmed) && !trimmed.match(/^[-*]\s+\*\*[^*:]+?:\*\*/)) {
      // this is **Term**: Def
      console.log(`  [Line ${idx+1}] Colon outside bold: ${trimmed.slice(0, 90)}`);
    }
  });
}
