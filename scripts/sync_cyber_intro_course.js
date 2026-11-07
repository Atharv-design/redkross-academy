import 'dotenv/config';
import { sql } from '../api/_db.js';
import { CYBER_INTRO_COURSE_01 } from '../src/services/db/cyberCourses.js';

async function syncCourse() {
  console.log('--- SYNC COURSE 01: INTRODUCTION TO CYBERSECURITY TO NEON ---');
  const c = CYBER_INTRO_COURSE_01;

  // 1. Upsert course record
  await sql`
    INSERT INTO courses (
      id, slug, title, version, category, difficulty, price, cert_price,
      estimated_duration, rating, enrolled_count, overview, learning_objectives,
      what_you_will_learn, prerequisites, lead_author, total_tokens_reward,
      card_variant, created_at, updated_at
    ) VALUES (
      ${c.id}, ${c.slug}, ${c.title}, ${c.version}, ${c.category}, ${c.difficulty},
      ${c.price}, ${c.cert_price}, ${c.estimated_duration}, ${c.rating},
      ${c.enrolled_count}, ${c.overview}, ${JSON.stringify(c.learning_objectives)}::jsonb,
      ${JSON.stringify(c.what_you_will_learn)}::jsonb, ${JSON.stringify(c.prerequisites)}::jsonb,
      ${JSON.stringify(c.lead_author)}::jsonb, ${c.total_tokens_reward},
      ${c.card_variant}, NOW(), NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      overview = EXCLUDED.overview,
      learning_objectives = EXCLUDED.learning_objectives,
      what_you_will_learn = EXCLUDED.what_you_will_learn,
      prerequisites = EXCLUDED.prerequisites,
      lead_author = EXCLUDED.lead_author,
      card_variant = EXCLUDED.card_variant,
      updated_at = NOW()
  `;
  console.log('✓ Course record upserted:', c.id, c.title);

  // 2. Upsert modules and lessons
  for (let mIdx = 0; mIdx < c.modules.length; mIdx++) {
    const mod = c.modules[mIdx];
    await sql`
      INSERT INTO modules (id, course_id, title, description, module_order)
      VALUES (${mod.id}, ${c.id}, ${mod.title}, ${mod.description || ''}, ${mIdx + 1})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        module_order = EXCLUDED.module_order
    `;

    for (let lIdx = 0; lIdx < (mod.lessons || []).length; lIdx++) {
      const les = mod.lessons[lIdx];
      await sql`
        INSERT INTO lessons (
          id, module_id, title, duration, content, content_markdown,
          summary, video_url, is_mandatory, videos, images, lesson_order
        ) VALUES (
          ${les.id}, ${mod.id}, ${les.title}, ${les.duration || '45 mins'},
          ${les.content || ''}, ${les.content || ''},
          ${les.summary || ''}, ${les.video_url || null},
          ${les.is_mandatory !== false}, '[]'::jsonb, '[]'::jsonb, ${lIdx + 1}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          duration = EXCLUDED.duration,
          content = EXCLUDED.content,
          content_markdown = EXCLUDED.content_markdown,
          summary = EXCLUDED.summary,
          video_url = EXCLUDED.video_url,
          is_mandatory = EXCLUDED.is_mandatory,
          lesson_order = EXCLUDED.lesson_order
      `;
    }
  }

  console.log(`✓ Synchronized ${c.modules.length} modules and all lessons successfully.`);
  process.exit(0);
}

syncCourse().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
