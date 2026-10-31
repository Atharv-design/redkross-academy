import { sql } from '../api/_db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('--- PURGE LEGACY COURSES & SYNC FULLSTACK COURSE ---');

  // Step 0: Ensure public catalog is ENABLED
  await sql`
    INSERT INTO system_settings (key, value, updated_at)
    VALUES ('public_catalog_enabled', 'true'::jsonb, NOW())
    ON CONFLICT (key) DO UPDATE SET value = 'true'::jsonb, updated_at = NOW();
  `;
  console.log('✓ public_catalog_enabled is set to TRUE.');

  const fullstackCourseData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/services/db/fullstackCourse.json'), 'utf8')
  );

  const c = fullstackCourseData;
  console.log('Target Flagship Course:', c.id, c.title);

  // 1. Fetch all current courses in Neon
  const existingCourses = await sql`SELECT id, slug, title FROM courses`;
  console.log(`Found ${existingCourses.length} courses currently in Neon:`);
  existingCourses.forEach(cr => console.log(` - [${cr.id}] ${cr.title}`));

  // 2. Identify legacy courses to purge (exclude our flagship and any custom admin-created course)
  const legacyCourses = existingCourses.filter(cr => 
    cr.id !== c.id && 
    cr.slug !== c.slug &&
    !cr.id.startsWith('crs_admin_custom_')
  );

  if (legacyCourses.length > 0) {
    console.log(`Purging ${legacyCourses.length} legacy courses from Neon database...`);
    for (const leg of legacyCourses) {
      const courseId = leg.id;
      try {
        await sql`DELETE FROM quiz_attempts WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM quiz_retry_windows WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM lesson_progress WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM certificate_requests WHERE course_id = ${courseId}`;
        await sql`DELETE FROM credentials WHERE course_id = ${courseId}`;
        await sql`DELETE FROM enrolments WHERE course_id = ${courseId}`;
        await sql`DELETE FROM options WHERE question_id IN (
          SELECT q.id FROM questions q 
          JOIN quizzes z ON q.quiz_id = z.id 
          WHERE z.course_id = ${courseId} OR z.module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})
        )`;
        await sql`DELETE FROM questions WHERE quiz_id IN (
          SELECT id FROM quizzes WHERE course_id = ${courseId} OR module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})
        )`;
        await sql`DELETE FROM quizzes WHERE course_id = ${courseId} OR module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})`;
        await sql`DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})`;
        await sql`DELETE FROM modules WHERE course_id = ${courseId}`;
        await sql`DELETE FROM courses WHERE id = ${courseId}`;
        console.log(`✓ Purged legacy course ${courseId}`);
      } catch (purgeErr) {
        console.warn(`Warning purging ${courseId}:`, purgeErr.message);
      }
    }
  }

  // 3. Insert or update the Full Stack Web Development course
  console.log('Inserting/Updating Full Stack Web Development course into Neon...');
  await sql`
    INSERT INTO courses (
      id, slug, title, category, difficulty, price, cert_price, estimated_duration, 
      rating, enrolled_count, overview, card_variant, lead_author, what_you_will_learn, 
      learning_objectives, prerequisites, total_tokens_reward, created_at, updated_at
    ) VALUES (
      ${c.id}, ${c.slug}, ${c.title}, ${c.category}, ${c.difficulty}, ${c.price}, 
      ${c.cert_price}, ${c.estimated_duration}, ${c.rating}, ${c.enrolled_count}, 
      ${c.overview}, ${c.card_variant || 'variant-01'}, 
      ${JSON.stringify(c.lead_author)}::jsonb, 
      ${JSON.stringify(c.what_you_will_learn || [])}::jsonb, 
      ${JSON.stringify(c.learning_objectives || [])}::jsonb, 
      ${JSON.stringify(c.prerequisites || [])}::jsonb, 
      ${c.total_tokens_reward || 1200},
      NOW(), NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      slug = EXCLUDED.slug,
      overview = EXCLUDED.overview,
      lead_author = EXCLUDED.lead_author,
      what_you_will_learn = EXCLUDED.what_you_will_learn,
      learning_objectives = EXCLUDED.learning_objectives,
      prerequisites = EXCLUDED.prerequisites,
      card_variant = EXCLUDED.card_variant,
      total_tokens_reward = EXCLUDED.total_tokens_reward,
      updated_at = NOW();
  `;

  // 4. Insert Modules, Lessons, and Quizzes matching the exact schema
  if (Array.isArray(c.modules)) {
    console.log(`Syncing ${c.modules.length} modules, 78 lessons, and 240 MCQs into Neon...`);
    for (let mIdx = 0; mIdx < c.modules.length; mIdx++) {
      const mod = c.modules[mIdx];
      const modId = mod.id || `mod_${c.id}_${mIdx + 1}`;
      
      await sql`
        INSERT INTO modules (id, course_id, title, description, module_order, sort_order, "order")
        VALUES (${modId}, ${c.id}, ${mod.title}, ${mod.description || ''}, ${mIdx + 1}, ${mIdx + 1}, ${mIdx + 1})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          module_order = EXCLUDED.module_order,
          sort_order = EXCLUDED.sort_order,
          "order" = EXCLUDED."order";
      `;

      if (Array.isArray(mod.lessons)) {
        for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
          const les = mod.lessons[lIdx];
          const lesId = les.id || `les_${modId}_${lIdx + 1}`;
          const videoList = Array.isArray(les.videos) ? les.videos : [];
          const imageList = Array.isArray(les.images) ? les.images : [];
          const pdfUrl = les.pdf_attachment_url || null;
          const markdownContent = les.content || les.content_markdown || '';

          await sql`
            INSERT INTO lessons (
              id, module_id, title, duration, lesson_type, is_mandatory, summary, content,
              content_markdown, video_url, videos, images, pdf_attachment_url, lesson_order, sort_order
            ) VALUES (
              ${lesId}, ${modId}, ${les.title}, ${les.duration || '20 mins'},
              ${les.lesson_type || 'theory'}, ${les.is_mandatory !== false}, ${les.summary || ''}, ${markdownContent},
              ${markdownContent}, ${les.video_url || null}, ${JSON.stringify(videoList)}::jsonb, ${JSON.stringify(imageList)}::jsonb, 
              ${pdfUrl}, ${lIdx + 1}, ${lIdx + 1}
            )
            ON CONFLICT (id) DO UPDATE SET
              title = EXCLUDED.title,
              duration = EXCLUDED.duration,
              summary = EXCLUDED.summary,
              content = EXCLUDED.content,
              content_markdown = EXCLUDED.content_markdown,
              video_url = EXCLUDED.video_url,
              videos = EXCLUDED.videos,
              images = EXCLUDED.images,
              pdf_attachment_url = EXCLUDED.pdf_attachment_url,
              lesson_order = EXCLUDED.lesson_order,
              sort_order = EXCLUDED.sort_order;
          `;
        }
      }

      // Module Quiz
      if (mod.quiz) {
        const qz = mod.quiz;
        const qzId = qz.id || `quiz_${modId}`;
        await sql`
          INSERT INTO quizzes (id, module_id, course_id, title, passing_score, duration_minutes, is_final_exam, token_bounty)
          VALUES (${qzId}, ${modId}, ${c.id}, ${qz.title}, ${qz.passing_score || 80}, ${qz.duration_minutes || 20}, false, 50)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            passing_score = EXCLUDED.passing_score,
            duration_minutes = EXCLUDED.duration_minutes;
        `;

        if (Array.isArray(qz.questions)) {
          for (let qIdx = 0; qIdx < qz.questions.length; qIdx++) {
            const quest = qz.questions[qIdx];
            const questId = quest.id || `q_${qzId}_${qIdx + 1}`;
            await sql`
              INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order)
              VALUES (${questId}, ${qzId}, ${quest.text}, 'single_choice', 1, ${quest.explanation || ''}, ${qIdx + 1})
              ON CONFLICT (id) DO UPDATE SET
                question_text = EXCLUDED.question_text,
                explanation = EXCLUDED.explanation,
                question_order = EXCLUDED.question_order;
            `;

            if (Array.isArray(quest.options)) {
              for (let oIdx = 0; oIdx < quest.options.length; oIdx++) {
                const opt = quest.options[oIdx];
                const optId = opt.id || `opt_${questId}_${oIdx + 1}`;
                await sql`
                  INSERT INTO options (id, question_id, text, is_correct, sort_order)
                  VALUES (${optId}, ${questId}, ${opt.text}, ${Boolean(opt.is_correct)}, ${oIdx + 1})
                  ON CONFLICT (id) DO UPDATE SET
                    text = EXCLUDED.text,
                    is_correct = EXCLUDED.is_correct,
                    sort_order = EXCLUDED.sort_order;
                `;
              }
            }
          }
        }
      }
    }
  }

  // 5. Insert Final Capstone Exam if present
  if (c.final_assessment) {
    const fa = c.final_assessment;
    const faId = fa.id || `exam_${c.id}`;
    console.log(`Syncing Final Comprehensive Exam [${faId}] with ${fa.questions?.length || 50} MCQs...`);
    await sql`
      INSERT INTO quizzes (id, module_id, course_id, title, passing_score, duration_minutes, is_final_exam, token_bounty)
      VALUES (${faId}, NULL, ${c.id}, ${fa.title}, ${fa.passing_score || 80}, ${fa.duration_minutes || 60}, true, 1000)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        passing_score = EXCLUDED.passing_score,
        duration_minutes = EXCLUDED.duration_minutes;
    `;

    if (Array.isArray(fa.questions)) {
      for (let qIdx = 0; qIdx < fa.questions.length; qIdx++) {
        const quest = fa.questions[qIdx];
        const questId = quest.id || `q_${faId}_${qIdx + 1}`;
        await sql`
          INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order)
          VALUES (${questId}, ${faId}, ${quest.text}, 'single_choice', 1, ${quest.explanation || ''}, ${qIdx + 1})
          ON CONFLICT (id) DO UPDATE SET
            question_text = EXCLUDED.question_text,
            explanation = EXCLUDED.explanation,
            question_order = EXCLUDED.question_order;
        `;

        if (Array.isArray(quest.options)) {
          for (let oIdx = 0; oIdx < quest.options.length; oIdx++) {
            const opt = quest.options[oIdx];
            const optId = opt.id || `opt_${questId}_${oIdx + 1}`;
            await sql`
              INSERT INTO options (id, question_id, text, is_correct, sort_order)
              VALUES (${optId}, ${questId}, ${opt.text}, ${Boolean(opt.is_correct)}, ${oIdx + 1})
              ON CONFLICT (id) DO UPDATE SET
                text = EXCLUDED.text,
                is_correct = EXCLUDED.is_correct,
                sort_order = EXCLUDED.sort_order;
            `;
          }
        }
      }
    }
  }

  // 6. Verification
  const finalCourses = await sql`SELECT id, slug, title, enrolled_count, card_variant FROM courses`;
  const modulesCount = await sql`SELECT count(*)::int as count FROM modules WHERE course_id = ${c.id}`;
  const lessonsCount = await sql`SELECT count(*)::int as count FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = ${c.id})`;
  const quizzesCount = await sql`SELECT count(*)::int as count FROM quizzes WHERE course_id = ${c.id}`;
  const questionsCount = await sql`SELECT count(*)::int as count FROM questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id = ${c.id})`;

  console.log('\n====================================');
  console.log(`FINAL COURSES IN NEON DATABASE: ${finalCourses.length}`);
  finalCourses.forEach(fc => console.log(` - [${fc.id}] ${fc.title} (Slug: ${fc.slug})`));
  console.log(`MODULES: ${modulesCount[0].count}`);
  console.log(`LESSONS: ${lessonsCount[0].count}`);
  console.log(`QUIZZES/EXAMS: ${quizzesCount[0].count}`);
  console.log(`ASSESSMENT QUESTIONS: ${questionsCount[0].count}`);
  console.log('====================================\n');

  if (finalCourses.length !== 1 || finalCourses[0].id !== c.id) {
    throw new Error(`Expected exactly 1 course (${c.id}) in Neon, but found ${finalCourses.length}`);
  }
}

run().then(() => {
  console.log('✓ Successfully synced flagship course and verified zero legacy courses in Neon.');
  process.exit(0);
}).catch(err => {
  console.error('Purge and sync error:', err);
  process.exit(1);
});
