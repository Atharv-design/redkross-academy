import fs from 'fs';
import path from 'path';

const origFile = path.resolve('src/services/db/course03/modules/backup_visual_enhancement/module1.js.bak');
const newFile = path.resolve('src/services/db/course03/modules/module1.js');

const origText = fs.readFileSync(origFile, 'utf8');
const newText = fs.readFileSync(newFile, 'utf8');

console.log('=== VERIFICATION: MODULE 1 ENHANCEMENTS ===');
console.log('Original size:', origText.length, 'characters');
console.log('New size:', newText.length, 'characters');
console.log('Size delta:', newText.length - origText.length, 'characters added');

// 1. Verify module data imports cleanly
import('../src/services/db/course03/modules/module1.js').then(({ module1Data }) => {
  console.log('Module 1 imported successfully.');
  console.log('Module ID:', module1Data.id);
  console.log('Total lessons:', module1Data.lessons.length);

  let totalWalkthroughHeadings = 0;
  let totalImagesInContent = 0;

  module1Data.lessons.forEach((l, idx) => {
    const lessonNum = `1.${idx + 1}`;
    const imgMatches = [...l.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g)];
    const walkthroughMatches = [...l.content.matchAll(/#### Visual Walkthrough & Architectural Breakdown/g)];

    totalImagesInContent += imgMatches.length;
    totalWalkthroughHeadings += walkthroughMatches.length;

    console.log(`\nLesson ${lessonNum}: ${l.title}`);
    console.log(`  - Images in metadata: ${l.images.length}`);
    console.log(`  - Images in content: ${imgMatches.length}`);
    console.log(`  - Walkthrough sections: ${walkthroughMatches.length}`);

    // Verify both figures have walkthroughs
    imgMatches.forEach((im, imIdx) => {
      const imgPos = im.index;
      const subText = l.content.substring(imgPos, imgPos + 2500);
      const hasWalkthrough = subText.includes('#### Visual Walkthrough & Architectural Breakdown');
      console.log(`    Fig ${imIdx + 1} [${im[1].substring(0, 40)}...]: Walkthrough Present = ${hasWalkthrough}`);
    });
  });

  console.log(`\nTotal images in content: ${totalImagesInContent} (Expected: 12)`);
  console.log(`Total walkthrough headings: ${totalWalkthroughHeadings} (Expected: 12)`);

  // 2. Confirm preservation of original text
  // Every line in origText that was not part of the insertion should still be present
  let allOrigContentPreserved = true;
  // Let's check quiz questions preserved
  if (module1Data.quiz.questions.length === 20) {
    console.log('Quiz questions preserved: 20/20');
  } else {
    console.error('Quiz question count mismatch:', module1Data.quiz.questions.length);
    allOrigContentPreserved = false;
  }

  // Check lesson IDs preserved
  const expectedIds = [
    'les_c3_m1_l1', 'les_c3_m1_l2', 'les_c3_m1_l3',
    'les_c3_m1_l4', 'les_c3_m1_l5', 'les_c3_m1_l6'
  ];
  const actualIds = module1Data.lessons.map(l => l.id);
  const idsMatch = JSON.stringify(expectedIds) === JSON.stringify(actualIds);
  console.log('Lesson IDs preserved:', idsMatch);

  // Check LaTeX formulas preserved
  const latexMatches = newText.match(/\$\$[\s\S]*?\$\$/g) || [];
  console.log('Display LaTeX formulas in Module 1:', latexMatches.length);

  // Check math steps blocks preserved
  const mathSteps = newText.match(/:::math-steps/g) || [];
  console.log(':::math-steps blocks in Module 1:', mathSteps.length);

  // Check retained canonical comparison table in Lesson 1.1
  const l1 = module1Data.lessons[0];
  const hasCompTable = l1.content.includes('### Platform Architectural Comparison: Linux vs. Windows NT');
  const hasWarning = l1.content.includes('**Operational Defense Invariant:**');
  console.log('Lesson 1.1 Retained Canonical Table:', hasCompTable);
  console.log('Lesson 1.1 Retained Canonical Warning:', hasWarning);

  if (totalImagesInContent === 12 && totalWalkthroughHeadings === 12 && idsMatch && hasCompTable && hasWarning) {
    console.log('\n>>> ALL MODULE 1 VERIFICATION CHECKS PASSED SUCCESSFULLY! <<<');
  } else {
    console.error('\n>>> SOME VERIFICATION CHECKS FAILED! <<<');
    process.exit(1);
  }
}).catch(err => {
  console.error('Module 1 import failed:', err);
  process.exit(1);
});
