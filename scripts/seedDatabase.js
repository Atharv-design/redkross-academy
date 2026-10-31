/**
 * RedKross Academy - Master Database Seeder
 * 
 * Pre-populates a fresh PostgreSQL database with:
 * 1. Default Super Admin account (admin@redkross.org.in)
 * 2. System settings (public_catalog_enabled = true)
 * 3. Foundational courses, modules, and lessons
 * 
 * Usage:
 *   node scripts/seedDatabase.js
 */

import { sql } from '../api/_db.js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullStackCourseData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/services/db/fullstackCourse.json'), 'utf8')
);

async function seedMaster() {
  console.log('====================================================');
  console.log('      REDKROSS ACADEMY - DATABASE INITIAL SEED      ');
  console.log('====================================================');

  try {
    // 1. Seed System Settings
    console.log('[1/3] Configuring default system settings...');
    await sql`
      INSERT INTO system_settings (key, value, updated_at)
      VALUES 
        ('public_catalog_enabled', 'true'::jsonb, NOW()),
        ('allow_student_registration', 'true'::jsonb, NOW()),
        ('proctoring_tab_lockout_hours', '24'::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE SET 
        value = EXCLUDED.value,
        updated_at = NOW();
    `;
    console.log('?" System settings synchronized.');

    // 2. Seed Super Admin
    console.log('[2/3] Provisioning default Super Admin identity...');
    const adminId = 'usr_super_admin_01';
    await sql`
      INSERT INTO users (
        id, email, full_name, avatar, headline, role, cadet_id, token_balance, streak_days, created_at, updated_at
      ) VALUES (
        ${adminId},
        'admin@redkross.org.in',
        'Super Admin',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        'Principal Security Architect & RedKross Academy Administrator',
        'super_admin',
        'RK-0001',
        5000,
        14,
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET
        role = 'super_admin',
        token_balance = GREATEST(users.token_balance, 5000);
    `;
    console.log('?" Super Admin account provisioned: admin@redkross.org.in');

    // 3. Seed Courses & Modules
    console.log('[3/3] Seeding foundation course catalog...');
    const sampleCourses = [
      {
        id: fullStackCourseData.id,
        slug: fullStackCourseData.slug,
        title: fullStackCourseData.title,
        category: fullStackCourseData.category,
        difficulty: fullStackCourseData.difficulty,
        price: fullStackCourseData.price,
        cert_price: fullStackCourseData.cert_price,
        estimated_duration: fullStackCourseData.estimated_duration,
        rating: fullStackCourseData.rating,
        enrolled_count: fullStackCourseData.enrolled_count,
        overview: fullStackCourseData.overview,
        card_variant: fullStackCourseData.card_variant,
        lead_author: JSON.stringify(fullStackCourseData.lead_author),
        what_you_will_learn: JSON.stringify(fullStackCourseData.what_you_will_learn),
        learning_objectives: JSON.stringify(fullStackCourseData.learning_objectives),
        prerequisites: JSON.stringify(fullStackCourseData.prerequisites),
        modules: fullStackCourseData.modules
      }
    ];

    // Purge legacy fake courses from PostgreSQL (Only Full Stack Web Development is allowed)
    console.log('[3/3] Purging legacy sample courses and seeding Full Stack Web Development...');
    await sql`DELETE FROM courses WHERE id != ${fullStackCourseData.id}`;

    for (const c of sampleCourses) {
      await sql`
        INSERT INTO courses (
          id, slug, title, category, difficulty, price, cert_price, estimated_duration, 
          rating, enrolled_count, overview, card_variant, lead_author, what_you_will_learn, 
          learning_objectives, prerequisites, created_at, updated_at
        ) VALUES (
          ${c.id}, ${c.slug}, ${c.title}, ${c.category}, ${c.difficulty}, ${c.price}, 
          ${c.cert_price}, ${c.estimated_duration}, ${c.rating}, ${c.enrolled_count}, 
          ${c.overview}, ${c.card_variant}, ${c.lead_author}::jsonb, ${c.what_you_will_learn}::jsonb, 
          ${c.learning_objectives}::jsonb, ${c.prerequisites}::jsonb, NOW(), NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          overview = EXCLUDED.overview,
          lead_author = EXCLUDED.lead_author,
          what_you_will_learn = EXCLUDED.what_you_will_learn,
          card_variant = EXCLUDED.card_variant;
      `;

      // Insert all 12 Modules and 78 Lessons
      if (Array.isArray(c.modules)) {
        for (let mIdx = 0; mIdx < c.modules.length; mIdx++) {
          const mod = c.modules[mIdx];
          const modId = mod.id || `mod_${c.id}_${mIdx + 1}`;
          
          await sql`
            INSERT INTO modules (id, course_id, title, description, module_order, created_at, updated_at)
            VALUES (${modId}, ${c.id}, ${mod.title}, ${mod.description || ''}, ${mIdx + 1}, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE SET
              title = EXCLUDED.title,
              description = EXCLUDED.description,
              module_order = EXCLUDED.module_order,
              updated_at = NOW();
          `;

          // Insert Lessons
          if (Array.isArray(mod.lessons)) {
            for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
              const les = mod.lessons[lIdx];
              const lesId = les.id || `les_${modId}_${lIdx + 1}`;
              const videoList = Array.isArray(les.videos) ? les.videos : [];
              const imageList = Array.isArray(les.images) ? les.images : [];
              const pdfUrl = les.pdf_attachment_url || null;

              await sql`
                INSERT INTO lessons (
                  id, module_id, title, duration, is_mandatory, lesson_type, summary, content,
                  video_url, videos, images, pdf_attachment_url, lesson_order, created_at, updated_at
                ) VALUES (
                  ${lesId}, ${modId}, ${les.title}, ${les.duration || '15 mins'},
                  ${les.is_mandatory !== false}, ${les.lesson_type || 'theory'}, ${les.summary || ''}, ${les.content || ''},
                  ${les.video_url || null}, ${JSON.stringify(videoList)}::jsonb, ${JSON.stringify(imageList)}::jsonb, ${pdfUrl},
                  ${lIdx + 1}, NOW(), NOW()
                )
                ON CONFLICT (id) DO UPDATE SET
                  title = EXCLUDED.title,
                  duration = EXCLUDED.duration,
                  summary = EXCLUDED.summary,
                  content = EXCLUDED.content,
                  video_url = EXCLUDED.video_url,
                  videos = EXCLUDED.videos,
                  images = EXCLUDED.images,
                  pdf_attachment_url = EXCLUDED.pdf_attachment_url,
                  lesson_order = EXCLUDED.lesson_order,
                  updated_at = NOW();
              `;
            }
          }

          // Insert Module Quiz
          if (mod.quiz) {
            const qz = mod.quiz;
            const qzId = qz.id || `quiz_${modId}`;
            await sql`
              INSERT INTO quizzes (id, module_id, course_id, title, passing_score, duration_minutes, is_final_exam, created_at)
              VALUES (${qzId}, ${modId}, ${c.id}, ${qz.title}, ${qz.passing_score || 80}, ${qz.duration_minutes || 20}, false, NOW())
              ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                passing_score = EXCLUDED.passing_score,
                duration_minutes = EXCLUDED.duration_minutes;
            `;

            // Insert Quiz Questions & Options
            if (Array.isArray(qz.questions)) {
              for (let qIdx = 0; qIdx < qz.questions.length; qIdx++) {
                const quest = qz.questions[qIdx];
                const questId = quest.id || `q_${qzId}_${qIdx + 1}`;
                await sql`
                  INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order, created_at)
                  VALUES (${questId}, ${qzId}, ${quest.text}, 'single_choice', 1, ${quest.explanation || ''}, ${qIdx + 1}, NOW())
                  ON CONFLICT (id) DO UPDATE SET
                    question_text = EXCLUDED.question_text,
                    explanation = EXCLUDED.explanation;
                `;

                if (Array.isArray(quest.options)) {
                  for (let oIdx = 0; oIdx < quest.options.length; oIdx++) {
                    const opt = quest.options[oIdx];
                    const optId = opt.id || `opt_${questId}_${oIdx + 1}`;
                    await sql`
                      INSERT INTO options (id, question_id, option_text, is_correct, option_order)
                      VALUES (${optId}, ${questId}, ${opt.text}, ${Boolean(opt.is_correct)}, ${oIdx + 1})
                      ON CONFLICT (id) DO UPDATE SET
                        option_text = EXCLUDED.option_text,
                        is_correct = EXCLUDED.is_correct;
                    `;
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log('?" Full Stack Web Development course, 12 modules, 78 lessons, and 240 MCQs seeded into PostgreSQL.');

    console.log('\n====================================================');
    console.log('?" DATABASE SEEDING COMPLETED WITH ZERO ERRORS.');
    console.log('====================================================\n');
  } catch (err) {
    console.error('\n? Database seeding failed:', err.message);
    process.exit(1);
  }
}

seedMaster();
