import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/course03_analyzed_visual_report.json', 'utf8'));

const queries = [
  'LSDOU',
  'GPT',
  'Patch',
  'CIS',
  'Safeguard',
  'CrowdStrike',
  'ASR',
  'Virtualization',
  'Defense-in-Depth',
  'Rubric'
];

queries.forEach(q => {
  console.log(`=== QUERY: ${q} ===`);
  data.forEach(l => {
    l.structuredImages.forEach(img => {
      const matchTarget = `${img.title} ${img.caption} ${img.alt} ${img.url}`.toLowerCase();
      if (matchTarget.includes(q.toLowerCase())) {
        console.log(`  Lesson ${l.lessonNum} [${l.lessonId}]: ${img.title}`);
        console.log(`    URL: ${img.url}`);
        console.log(`    Caption: ${img.caption}`);
      }
    });
  });
});
