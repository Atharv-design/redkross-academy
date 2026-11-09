import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/course02_detailed_diagram_analysis.json', 'utf8'));

let out = '';
data.forEach(item => {
  if (item.asciiBlocks.length > 0) {
    out += `\n=======================================================\n`;
    out += `[Module ${item.moduleNumber}] Lesson ${item.lessonNumber}: ${item.lessonTitle}\n`;
    out += `Existing Images: ${item.existingImages.map(i => i.src).join(', ') || 'None'}\n`;
    out += `=======================================================\n`;

    item.asciiBlocks.forEach((ab, idx) => {
      out += `--- Diagram Candidate ${idx + 1} (Lang: ${ab.lang}) ---\n`;
      out += ab.snippet + '\n\n';
    });
  }
});

fs.writeFileSync('scripts/diagram_review.txt', out, 'utf8');
console.log('Saved diagram review to scripts/diagram_review.txt');
