import fs from 'fs';

const inv = JSON.parse(fs.readFileSync('scripts/course03_complete_inventory_96.json', 'utf8'));

export function getModuleFigures(m) {
  return inv.filter(x => x.moduleIndex === m);
}

const modNum = parseInt(process.argv[2] || '2', 10);
const figs = getModuleFigures(modNum);

console.log(`=== MODULE ${modNum} FIGURES (${figs.length}) ===`);
figs.forEach(x => {
  console.log(`\nLesson ${x.lessonNum} (Fig ${x.imageIndexInLesson}): ${x.figureId}`);
  console.log(`  Title: ${x.title}`);
  console.log(`  File: ${x.filename}`);
  console.log(`  Caption: ${x.caption}`);
});
