import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('public/assets/courses/cyber-03');
const diskFiles = new Set(fs.readdirSync(imgDir));

async function generateFullAudit() {
  const fullInventory = [];

  for (let m = 1; m <= 8; m++) {
    const mod = await import(`../src/services/db/course03/modules/module${m}.js`);
    const modData = mod[`module${m}Data`];

    for (let l = 0; l < modData.lessons.length; l++) {
      const lesson = modData.lessons[l];
      const lessonNum = `${m}.${l + 1}`;
      const structImgs = lesson.images || [];

      // Parse markdown images
      const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g;
      let match;
      const contentImgs = [];
      while ((match = mdRegex.exec(lesson.content)) !== null) {
        contentImgs.push({
          fullMatch: match[0],
          alt: match[1],
          url: match[2],
          caption: match[3] || '',
          index: match.index
        });
      }

      structImgs.forEach((sImg, sIdx) => {
        const basename = path.basename(sImg.url);
        const exists = diskFiles.has(basename);

        // Find if in content
        const cImg = contentImgs.find(ci => ci.url === sImg.url || ci.url.includes(basename));
        const inContent = !!cImg;

        let placement = 'Section 2 (Conceptual / Architectural Overview)';
        if (sIdx === 1) {
          placement = 'Section 3 / Section 5 (Technical Deep-Dive / Mathematical Specification)';
        }

        // Surrounding context analysis
        let wordsAfter = 0;
        let immediateNextHeading = 'None';
        let currentStatus = 'Only 1-line italic caption; no dedicated walkthrough';

        if (cImg) {
          const afterText = lesson.content.substring(cImg.index + cImg.fullMatch.length).trim();
          const nextHeading = afterText.match(/^(#{2,5})\s+(.+)$/m);
          immediateNextHeading = nextHeading ? nextHeading[0] : 'None';

          const cutIdx = nextHeading && nextHeading.index !== undefined ? nextHeading.index : afterText.length;
          const immediateText = afterText.substring(0, cutIdx).trim();
          wordsAfter = immediateText ? immediateText.split(/\s+/).filter(Boolean).length : 0;
        } else {
          currentStatus = 'MISSING from lesson.content markdown (present only in lesson.images metadata array)';
        }

        // Classification
        let classification = 'Needs explanation enhancement';
        let notes = '';

        if (!inContent) {
          classification = 'Needs technical verification';
          notes = 'Image is registered in module structured metadata array but missing markdown tag in lesson.content body.';
        } else if (wordsAfter === 0) {
          classification = 'Needs explanation enhancement';
          notes = 'Zero explanatory words between caption and subsequent major heading. Lacks architectural step-by-step walkthrough.';
        } else if (wordsAfter < 40) {
          classification = 'Needs explanation enhancement';
          notes = `Only ${wordsAfter} words of high-level text; lacks systematic breakdown of visual components, flows, and decision branches.`;
        } else {
          classification = 'Adequately explained';
          notes = 'Has substantive accompanying text.';
        }

        fullInventory.push({
          globalId: fullInventory.length + 1,
          moduleIndex: m,
          moduleTitle: modData.title,
          lessonNum,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          imageIndexInLesson: sIdx + 1,
          imageId: sImg.id,
          figureId: (sImg.title.match(/([A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+)/) || [])[1] || sImg.id,
          title: sImg.title,
          url: sImg.url,
          filename: basename,
          alt: sImg.alt,
          caption: sImg.caption,
          existsOnDisk: exists,
          inContent,
          placement,
          immediateNextHeading,
          wordsAfter,
          currentStatus,
          classification,
          notes
        });
      });
    }
  }

  fs.writeFileSync('scripts/course03_complete_inventory_96.json', JSON.stringify(fullInventory, null, 2));
  console.log(`Generated complete inventory of ${fullInventory.length} visuals.`);
}

generateFullAudit().catch(console.error);
