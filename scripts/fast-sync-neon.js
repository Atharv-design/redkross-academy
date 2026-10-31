import { sql } from '../api/_db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fastSync() {
  console.log('=== FAST BATCH SYNC FULLSTACK COURSE TO NEON ===');

  const fullstackCourseData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/services/db/fullstackCourse.json'), 'utf8')
  );
  const c = fullstackCourseData;

  // 1. Clean existing course data to ensure fresh, consistent state
  console.log('Cleaning existing questions, options, quizzes, lessons, modules for course...');
  await sql`DELETE FROM options WHERE question_id IN (
    SELECT q.id FROM questions q JOIN quizzes z ON q.quiz_id = z.id WHERE z.course_id = ${c.id}
  )`;
  await sql`DELETE FROM questions WHERE quiz_id IN (
    SELECT id FROM quizzes WHERE course_id = ${c.id}
  )`;
  await sql`DELETE FROM quizzes WHERE course_id = ${c.id}`;
  await sql`DELETE FROM lessons WHERE module_id IN (
    SELECT id FROM modules WHERE course_id = ${c.id}
  )`;
  await sql`DELETE FROM modules WHERE course_id = ${c.id}`;

  // 2. Insert Course Header
  console.log('Inserting Course Header...');
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

  // 3. Prepare Batch Data
  const modulesToInsert = [];
  const lessonsToInsert = [];
  const quizzesToInsert = [];
  const questionsToInsert = [];
  const optionsToInsert = [];

  for (let mIdx = 0; mIdx < c.modules.length; mIdx++) {
    const mod = c.modules[mIdx];
    const modId = mod.id || `mod_${c.id}_${mIdx + 1}`;
    modulesToInsert.push({
      id: modId,
      course_id: c.id,
      title: mod.title,
      description: mod.description || '',
      order: mIdx + 1
    });

    if (Array.isArray(mod.lessons)) {
      for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
        const les = mod.lessons[lIdx];
        const lesId = les.id || `les_${modId}_${lIdx + 1}`;
        lessonsToInsert.push({
          id: lesId,
          module_id: modId,
          title: les.title,
          duration: les.duration || '20 mins',
          lesson_type: les.lesson_type || 'theory',
          is_mandatory: les.is_mandatory !== false,
          summary: les.summary || '',
          content: les.content || les.content_markdown || '',
          content_markdown: les.content || les.content_markdown || '',
          video_url: les.video_url || null,
          videos: JSON.stringify(les.videos || []),
          images: JSON.stringify(les.images || []),
          pdf_attachment_url: les.pdf_attachment_url || null,
          order: lIdx + 1
        });
      }
    }

    if (mod.quiz) {
      const qz = mod.quiz;
      const qzId = qz.id || `quiz_${modId}`;
      quizzesToInsert.push({
        id: qzId,
        module_id: modId,
        course_id: c.id,
        title: qz.title,
        passing_score: qz.passing_score || 80,
        duration_minutes: qz.duration_minutes || 20,
        is_final_exam: false,
        token_bounty: 50
      });

      if (Array.isArray(qz.questions)) {
        for (let qIdx = 0; qIdx < qz.questions.length; qIdx++) {
          const quest = qz.questions[qIdx];
          const questId = `q_${modId}_${qIdx + 1}`;
          questionsToInsert.push({
            id: questId,
            quiz_id: qzId,
            question_text: quest.text,
            points: 1,
            explanation: quest.explanation || '',
            question_order: qIdx + 1
          });

          if (Array.isArray(quest.options)) {
            for (let oIdx = 0; oIdx < quest.options.length; oIdx++) {
              const opt = quest.options[oIdx];
              optionsToInsert.push({
                id: `opt_${questId}_${oIdx + 1}`,
                question_id: questId,
                text: opt.text,
                is_correct: Boolean(opt.is_correct),
                sort_order: oIdx + 1
              });
            }
          }
        }
      }
    }
  }

  // Final Capstone Exam
  if (c.final_assessment) {
    const fa = c.final_assessment;
    const faId = `exam_${c.id}`;
    quizzesToInsert.push({
      id: faId,
      module_id: null,
      course_id: c.id,
      title: fa.title,
      passing_score: fa.passing_score || 80,
      duration_minutes: fa.duration_minutes || 60,
      is_final_exam: true,
      token_bounty: 1000
    });

    if (Array.isArray(fa.questions)) {
      for (let qIdx = 0; qIdx < fa.questions.length; qIdx++) {
        const quest = fa.questions[qIdx];
        const questId = `q_${faId}_${qIdx + 1}`;
        questionsToInsert.push({
          id: questId,
          quiz_id: faId,
          question_text: quest.text,
          points: 1,
          explanation: quest.explanation || '',
          question_order: qIdx + 1
        });

        if (Array.isArray(quest.options)) {
          for (let oIdx = 0; oIdx < quest.options.length; oIdx++) {
            const opt = quest.options[oIdx];
            optionsToInsert.push({
              id: `opt_${questId}_${oIdx + 1}`,
              question_id: questId,
              text: opt.text,
              is_correct: Boolean(opt.is_correct),
              sort_order: oIdx + 1
            });
          }
        }
      }
    }
  }

  // 4. Batch Inserts
  console.log(`Inserting ${modulesToInsert.length} modules...`);
  for (const m of modulesToInsert) {
    await sql`
      INSERT INTO modules (id, course_id, title, description, module_order, sort_order, "order")
      VALUES (${m.id}, ${m.course_id}, ${m.title}, ${m.description}, ${m.order}, ${m.order}, ${m.order})
    `;
  }

  console.log(`Inserting ${lessonsToInsert.length} lessons...`);
  for (const l of lessonsToInsert) {
    await sql`
      INSERT INTO lessons (
        id, module_id, title, duration, lesson_type, is_mandatory, summary, content,
        content_markdown, video_url, videos, images, pdf_attachment_url, lesson_order, sort_order
      ) VALUES (
        ${l.id}, ${l.module_id}, ${l.title}, ${l.duration}, ${l.lesson_type}, ${l.is_mandatory},
        ${l.summary}, ${l.content}, ${l.content_markdown}, ${l.video_url}, ${l.videos}::jsonb,
        ${l.images}::jsonb, ${l.pdf_attachment_url}, ${l.order}, ${l.order}
      )
    `;
  }

  console.log(`Inserting ${quizzesToInsert.length} quizzes...`);
  for (const qz of quizzesToInsert) {
    await sql`
      INSERT INTO quizzes (id, module_id, course_id, title, passing_score, duration_minutes, is_final_exam, token_bounty)
      VALUES (${qz.id}, ${qz.module_id}, ${qz.course_id}, ${qz.title}, ${qz.passing_score}, ${qz.duration_minutes}, ${qz.is_final_exam}, ${qz.token_bounty})
    `;
  }

  console.log(`Batch inserting ${questionsToInsert.length} questions...`);
  // Insert questions in chunks of 50
  for (let i = 0; i < questionsToInsert.length; i += 50) {
    const chunk = questionsToInsert.slice(i, i + 50);
    await Promise.all(chunk.map(q => 
      sql`
        INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order)
        VALUES (${q.id}, ${q.quiz_id}, ${q.question_text}, 'single_choice', ${q.points}, ${q.explanation}, ${q.question_order})
      `
    ));
    console.log(` - Questions inserted: ${Math.min(i + 50, questionsToInsert.length)}/${questionsToInsert.length}`);
  }

  console.log(`Batch inserting ${optionsToInsert.length} options...`);
  // Insert options in chunks of 100
  for (let i = 0; i < optionsToInsert.length; i += 100) {
    const chunk = optionsToInsert.slice(i, i + 100);
    await Promise.all(chunk.map(o => 
      sql`
        INSERT INTO options (id, question_id, text, is_correct, sort_order)
        VALUES (${o.id}, ${o.question_id}, ${o.text}, ${o.is_correct}, ${o.sort_order})
      `
    ));
    console.log(` - Options inserted: ${Math.min(i + 100, optionsToInsert.length)}/${optionsToInsert.length}`);
  }

  // 5. Verification
  console.log('\n--- VERIFICATION STATS ---');
  const coursesRes = await sql`SELECT id, title, slug FROM courses`;
  const mRes = await sql`SELECT count(*)::int as count FROM modules WHERE course_id = ${c.id}`;
  const lRes = await sql`SELECT count(*)::int as count FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = ${c.id})`;
  const qzRes = await sql`SELECT count(*)::int as count FROM quizzes WHERE course_id = ${c.id}`;
  const qRes = await sql`SELECT count(*)::int as count FROM questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id = ${c.id})`;
  const oRes = await sql`SELECT count(*)::int as count FROM options WHERE question_id IN (SELECT id FROM questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id = ${c.id}))`;

  console.log('Total Courses in Neon:', coursesRes.length);
  coursesRes.forEach(cr => console.log(` * [${cr.id}] ${cr.title} (${cr.slug})`));
  console.log('Total Modules:', mRes[0].count);
  console.log('Total Lessons:', lRes[0].count);
  console.log('Total Quizzes:', qzRes[0].count);
  console.log('Total Questions:', qRes[0].count);
  console.log('Total Options:', oRes[0].count);
}

fastSync().then(() => {
  console.log('✓ Fast sync finished successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Fast sync error:', err);
  process.exit(1);
});
