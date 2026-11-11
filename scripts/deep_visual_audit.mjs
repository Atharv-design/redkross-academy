import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('public/assets/courses/cyber-03');
const diskFiles = new Set(fs.readdirSync(imgDir));

async function run() {
  const auditReport = [];
  let totalMermaid = 0;
  let totalSvgInline = 0;
  let totalImgHtml = 0;

  for (let m = 1; m <= 8; m++) {
    const mod = await import(`../src/services/db/course03/modules/module${m}.js`);
    const modData = mod[`module${m}Data`];

    for (let l = 0; l < modData.lessons.length; l++) {
      const lesson = modData.lessons[l];
      const lessonNum = `${m}.${l + 1}`;
      const content = lesson.content;

      // Count code/diagram blocks
      const mermaidMatches = content.match(/```mermaid[\s\S]*?```/g) || [];
      const svgMatches = content.match(/<svg[\s\S]*?<\/svg>/gi) || [];
      const imgHtmlMatches = content.match(/<img[^>]*>/gi) || [];

      totalMermaid += mermaidMatches.length;
      totalSvgInline += svgMatches.length;
      totalImgHtml += imgHtmlMatches.length;

      // Match markdown images
      const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g;
      let match;
      const foundImages = [];

      while ((match = mdRegex.exec(content)) !== null) {
        const fullTag = match[0];
        const alt = match[1];
        const url = match[2];
        const caption = match[3] ? match[3].trim() : '';
        const imgIndex = match.index;
        const afterIndex = imgIndex + fullTag.length;

        // Extract preceding heading
        const textBefore = content.substring(0, imgIndex);
        const headingMatches = [...textBefore.matchAll(/^(#{2,5})\s+(.+)$/gm)];
        const precedingHeading = headingMatches.length > 0 ? headingMatches[headingMatches.length - 1][0] : 'None';

        // Extract text after until next heading or next image
        const restOfText = content.substring(afterIndex);
        const nextHeadingMatch = restOfText.match(/^(#{2,5})\s+(.+)$/m);
        const nextImgMatch = restOfText.match(/!\[([^\]]*)\]\(([^)]+)\)/);

        let cutEnd = restOfText.length;
        if (nextHeadingMatch && nextHeadingMatch.index !== undefined) {
          cutEnd = Math.min(cutEnd, nextHeadingMatch.index);
        }
        if (nextImgMatch && nextImgMatch.index !== undefined) {
          cutEnd = Math.min(cutEnd, nextImgMatch.index);
        }

        const immediateAfterBlock = restOfText.substring(0, cutEnd).trim();
        const wordsInImmediateBlock = immediateAfterBlock ? immediateAfterBlock.split(/\s+/).filter(Boolean).length : 0;

        // Check if there's an explanation subsection or bullet points
        const hasWalkthrough = /walkthrough|breakdown|flow|step\s*\d|key\s+components|architecture|analysis|operation/i.test(immediateAfterBlock);
        const hasBullets = /^\s*[-*]\s+/m.test(immediateAfterBlock);
        const hasNumberedSteps = /^\s*\d+\.\s+/m.test(immediateAfterBlock);

        // Classification
        let classification = 'Adequately explained';
        let rationale = '';

        if (!caption && wordsInImmediateBlock < 30) {
          classification = 'Needs explanation enhancement';
          rationale = 'Missing caption and has less than 30 words immediately explaining diagram components.';
        } else if (wordsInImmediateBlock < 50 && !hasBullets && !hasNumberedSteps) {
          classification = 'Needs explanation enhancement';
          rationale = 'Has brief generic text/caption but lacks deep-dive breakdown of individual stages/boxes in the diagram.';
        } else if (wordsInImmediateBlock >= 50 && (hasBullets || hasNumberedSteps || hasWalkthrough)) {
          classification = 'Adequately explained';
          rationale = 'Has dedicated explanatory paragraph and structured points linking diagram elements to core concepts.';
        } else {
          classification = 'Needs explanation enhancement';
          rationale = 'Text exists but is high-level prose rather than an explicit element-by-element architectural breakdown.';
        }

        foundImages.push({
          order: foundImages.length + 1,
          alt,
          url,
          filename: path.basename(url),
          caption,
          existsOnDisk: diskFiles.has(path.basename(url)),
          precedingHeading,
          wordsInImmediateBlock,
          hasWalkthrough,
          hasBullets,
          hasNumberedSteps,
          classification,
          rationale,
          immediateAfterBlockPreview: immediateAfterBlock.substring(0, 300)
        });
      }

      auditReport.push({
        moduleIndex: m,
        moduleTitle: modData.title,
        lessonIndex: l + 1,
        lessonNum,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        structuredImagesCount: (lesson.images || []).length,
        structuredImages: lesson.images || [],
        contentImagesCount: foundImages.length,
        contentImages: foundImages,
        hasMermaid: mermaidMatches.length > 0,
        hasSvg: svgMatches.length > 0
      });
    }
  }

  console.log(`Total Mermaid blocks: ${totalMermaid}`);
  console.log(`Total Inline SVG blocks: ${totalSvgInline}`);
  console.log(`Total HTML img tags: ${totalImgHtml}`);

  fs.writeFileSync('scripts/course03_analyzed_visual_report.json', JSON.stringify(auditReport, null, 2));
  console.log('Saved analyzed report to scripts/course03_analyzed_visual_report.json');
}

run().catch(console.error);
