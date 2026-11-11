import fs from 'fs';

const inv = JSON.parse(fs.readFileSync('scripts/course03_complete_inventory_96.json', 'utf8'));

for (let m = 1; m <= 8; m++) {
  const modItems = inv.filter(x => x.moduleIndex === m);
  console.log(`\n### Module ${m}: ${modItems[0].moduleTitle} (${modItems.length} visuals)`);
  modItems.forEach(item => {
    console.log(`- **Lesson ${item.lessonNum} (Fig ${item.imageIndexInLesson}):** \`${item.figureId}\` — *${item.title}*`);
    console.log(`  - File: \`${item.filename}\` | Exists: ${item.existsOnDisk} | In Content: ${item.inContent}`);
    console.log(`  - Placement: ${item.placement}`);
    console.log(`  - Classification: **${item.classification}**`);
    console.log(`  - Audit Note: ${item.notes}`);
  });
}
