import { neon } from '@neondatabase/serverless';
import {
  INITIAL_USERS,
  INITIAL_LEARNING_PATHS,
  INITIAL_COURSES,
  INITIAL_VERIFIED_CREDENTIALS,
  INITIAL_ENROLMENTS,
  INITIAL_REWARD_LEDGER,
  INITIAL_AUDIT_LOGS,
} from '../src/services/db/seedData.js';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3RwIaSv9ptBg@ep-proud-flower-a5ho5vpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function seed() {
  console.log('⚡ Starting PostgreSQL Seeding for RedKross Academy...');

  // 1. Seed Users
  console.log(`👤 Seeding ${INITIAL_USERS.length} Users...`);
  for (const u of INITIAL_USERS) {
    await sql`
      INSERT INTO users (id, email, full_name, avatar, headline, role, streak_days, created_at)
      VALUES (${u.id}, ${u.email}, ${u.full_name}, ${u.avatar || null}, ${u.headline || null}, ${u.role}, ${u.streak_days || 0}, ${u.created_at || new Date().toISOString()})
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role;
    `;
  }

  // 2. Seed Learning Paths
  console.log(`🛤️ Seeding ${INITIAL_LEARNING_PATHS.length} Learning Paths...`);
  for (const lp of INITIAL_LEARNING_PATHS) {
    await sql`
      INSERT INTO learning_paths (id, slug, title, short_desc, difficulty, estimated_weeks, total_hours, courses_count, milestone_cert, featured, skills, course_ids)
      VALUES (${lp.id}, ${lp.slug}, ${lp.title}, ${lp.short_desc}, ${lp.difficulty}, ${lp.estimated_weeks}, ${lp.total_hours}, ${lp.courses_count}, ${lp.milestone_cert}, ${lp.featured}, ${JSON.stringify(lp.skills)}, ${JSON.stringify(lp.course_ids)})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        skills = EXCLUDED.skills,
        course_ids = EXCLUDED.course_ids;
    `;
  }

  // 3. Seed Courses, Modules, Lessons, Quizzes, Questions, Options
  console.log(`📚 Seeding ${INITIAL_COURSES.length} Courses with Modules, Lessons & Quizzes...`);
  for (const c of INITIAL_COURSES) {
    await sql`
      INSERT INTO courses (id, slug, title, version, category, difficulty, price, cert_price, estimated_duration, rating, enrolled_count, overview, learning_objectives, prerequisites, lead_author, total_tokens_reward)
      VALUES (
        ${c.id}, ${c.slug}, ${c.title}, ${c.version || '1.0'}, ${c.category}, ${c.difficulty}, ${c.price || 0}, ${c.cert_price || 0}, ${c.estimated_duration},
        ${c.rating || 4.8}, ${c.enrolled_count || 100}, ${c.overview}, ${JSON.stringify(c.learning_objectives || [])}, ${JSON.stringify(c.prerequisites || [])},
        ${JSON.stringify(c.lead_author || {})}, ${c.total_tokens_reward || 300}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        overview = EXCLUDED.overview,
        learning_objectives = EXCLUDED.learning_objectives;
    `;

    // Process modules
    if (c.modules && Array.isArray(c.modules)) {
      for (const m of c.modules) {
        await sql`
          INSERT INTO modules (id, course_id, title, module_order)
          VALUES (${m.id}, ${c.id}, ${m.title}, ${m.order || 1})
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            module_order = EXCLUDED.module_order;
        `;

        // Process lessons
        if (m.lessons && Array.isArray(m.lessons)) {
          let lessonOrder = 1;
          for (const l of m.lessons) {
            await sql`
              INSERT INTO lessons (id, module_id, title, duration, is_mandatory, lesson_type, summary, content, resources, lesson_order)
              VALUES (
                ${l.id}, ${m.id}, ${l.title}, ${l.duration || '15 mins'}, ${l.is_mandatory !== false}, ${l.type || 'text'},
                ${l.summary || ''}, ${l.content || ''}, ${JSON.stringify(l.resources || [])}, ${lessonOrder++}
              )
              ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                summary = EXCLUDED.summary,
                content = EXCLUDED.content;
            `;
          }
        }

        // Process module quiz if present
        if (m.quiz) {
          const q = m.quiz;
          await sql`
            INSERT INTO quizzes (id, module_id, course_id, title, passing_score, token_bounty, is_final_exam, duration_minutes)
            VALUES (${q.id}, ${m.id}, ${c.id}, ${q.title}, ${q.passing_score || 80}, ${q.token_bounty || 100}, false, ${q.duration_minutes || 20})
            ON CONFLICT (id) DO UPDATE SET
              title = EXCLUDED.title,
              passing_score = EXCLUDED.passing_score;
          `;

          if (q.questions && Array.isArray(q.questions)) {
            let qOrder = 1;
            for (const quest of q.questions) {
              await sql`
                INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order)
                VALUES (${quest.id}, ${q.id}, ${quest.text}, ${quest.type || 'single_choice'}, ${quest.points || 10}, ${quest.explanation || ''}, ${qOrder++})
                ON CONFLICT (id) DO UPDATE SET
                  question_text = EXCLUDED.question_text,
                  explanation = EXCLUDED.explanation;
              `;

              if (quest.options && Array.isArray(quest.options)) {
                let optOrder = 1;
                for (const opt of quest.options) {
                  await sql`
                    INSERT INTO question_options (id, question_id, option_text, is_correct, option_order)
                    VALUES (${opt.id}, ${quest.id}, ${opt.text}, ${opt.is_correct || false}, ${optOrder++})
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

    // Process final exam if present on course
    if (c.final_exam) {
      const fe = c.final_exam;
      await sql`
        INSERT INTO quizzes (id, module_id, course_id, title, passing_score, token_bounty, is_final_exam, duration_minutes)
        VALUES (${fe.id}, null, ${c.id}, ${fe.title}, ${fe.passing_score || 85}, ${fe.token_bounty || 250}, true, ${fe.duration_minutes || 45})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          passing_score = EXCLUDED.passing_score;
      `;

      if (fe.questions && Array.isArray(fe.questions)) {
        let qOrder = 1;
        for (const quest of fe.questions) {
          await sql`
            INSERT INTO questions (id, quiz_id, question_text, question_type, points, explanation, question_order)
            VALUES (${quest.id}, ${fe.id}, ${quest.text}, ${quest.type || 'single_choice'}, ${quest.points || 10}, ${quest.explanation || ''}, ${qOrder++})
            ON CONFLICT (id) DO UPDATE SET
              question_text = EXCLUDED.question_text,
              explanation = EXCLUDED.explanation;
          `;

          if (quest.options && Array.isArray(quest.options)) {
            let optOrder = 1;
            for (const opt of quest.options) {
              await sql`
                INSERT INTO question_options (id, question_id, option_text, is_correct, option_order)
                VALUES (${opt.id}, ${quest.id}, ${opt.text}, ${opt.is_correct || false}, ${optOrder++})
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

  // 4. Seed Enrolments
  console.log(`🎓 Seeding ${INITIAL_ENROLMENTS.length} Enrolments...`);
  for (const en of INITIAL_ENROLMENTS) {
    await sql`
      INSERT INTO enrolments (id, user_id, course_id, course_version, enrolled_at, status)
      VALUES (${en.id}, ${en.user_id}, ${en.course_id}, ${en.course_version || '1.0'}, ${en.enrolled_at || new Date().toISOString()}, ${en.status || 'Active'})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  // 5. Seed Reward Ledger
  console.log(`🪙 Seeding ${INITIAL_REWARD_LEDGER.length} Reward Ledger Entries...`);
  for (const r of INITIAL_REWARD_LEDGER) {
    await sql`
      INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
      VALUES (${r.id}, ${r.user_id}, ${r.amount}, ${r.type || r.transaction_type || 'reward'}, ${r.description}, ${r.idempotency_key || r.id}, ${r.created_at || new Date().toISOString()})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  // 6. Seed Credentials
  console.log(`📜 Seeding ${INITIAL_VERIFIED_CREDENTIALS.length} Credentials...`);
  for (const cred of INITIAL_VERIFIED_CREDENTIALS) {
    await sql`
      INSERT INTO credentials (id, verification_id, student_name, user_id, course_id, course_title, credential_title, credential_type, issue_date, expiration_date, grade_percentage, status, digital_signature, verification_url, skills_validated)
      VALUES (
        ${cred.id}, ${cred.verification_id}, ${cred.student_name}, ${cred.user_id}, ${cred.course_id}, ${cred.course_title},
        ${cred.credential_title}, ${cred.credential_type || 'Professional Certificate'}, ${cred.issue_date}, ${cred.expiration_date || 'Never'},
        ${cred.grade_percentage || 90}, ${cred.status || 'Active'}, ${cred.digital_signature}, ${cred.verification_url}, ${JSON.stringify(cred.skills_validated || [])}
      )
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  // 7. Seed Audit Logs
  console.log(`🛡️ Seeding ${INITIAL_AUDIT_LOGS.length} Audit Logs...`);
  for (const log of INITIAL_AUDIT_LOGS) {
    await sql`
      INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
      VALUES (${log.id}, ${log.actor_id}, ${log.action}, ${log.entity_type}, ${log.entity_id}, ${typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}, ${log.created_at || new Date().toISOString()})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log('✅ PostgreSQL Database Seeding Finished Successfully!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed with error:', err);
  process.exit(1);
});
