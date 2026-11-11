import fs from 'fs';
import path from 'path';

const modDir = path.resolve('src/services/db/course03/modules');
const imgDir = path.resolve('public/assets/courses/cyber-03');
const diskImages = fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : [];

console.log(`Disk images in public/assets/courses/cyber-03: ${diskImages.length}`);

async function run() {
  const auditReport = [];

  for (let i = 1; i <= 8; i++) {
    const modModule = await import(`../src/services/db/course03/modules/module${i}.js`);
    const modData = modModule[`module${i}Data`];

    console.log(`\n=================== MODULE ${i}: ${modData.title} ===================`);
    console.log(`Lessons count: ${modData.lessons.length}`);

    for (const [lIdx, lesson] of modData.lessons.entries()) {
      const lessonNum = `${i}.${lIdx + 1}`;
      console.log(`\nLesson ${lessonNum} [${lesson.id}]: ${lesson.title}`);
      console.log(`  - Lesson structured images: ${lesson.images ? lesson.images.length : 0}`);

      // Check markdown content images
      const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)(?:\s*\n+\*([^*]+)\*)?/g;
      let match;
      const contentImages = [];
      while ((match = imgRegex.exec(lesson.content)) !== null) {
        const alt = match[1];
        const url = match[2];
        const caption = match[3] ? match[3].trim() : '';
        const start = match.index;
        const end = start + match[0].length;

        // Context before & after
        const before = lesson.content.substring(Math.max(0, start - 400), start).trim();
        const after = lesson.content.substring(end, Math.min(lesson.content.length, end + 600)).trim();

        contentImages.push({
          alt,
          url,
          caption,
          filename: path.basename(url),
          existsOnDisk: diskImages.includes(path.basename(url)),
          beforeSnippet: before.split('\n').slice(-3).join(' | '),
          afterSnippet: after.split('\n').slice(0, 3).join(' | '),
          afterLength: after.length,
          afterFull: after
        });
      }

      console.log(`  - Content embedded images: ${contentImages.length}`);

      auditReport.push({
        moduleIndex: i,
        moduleTitle: modData.title,
        lessonIndex: lIdx + 1,
        lessonNum,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        structuredImages: lesson.images || [],
        contentImages
      });
    }
  }

  fs.writeFileSync('scripts/course03_full_visual_audit.json', JSON.stringify(auditReport, null, 2));
  console.log('\nWrote full visual audit to scripts/course03_full_visual_audit.json');
}

run().catch(console.error);
