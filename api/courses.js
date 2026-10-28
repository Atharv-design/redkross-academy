import { sql, json, cors } from './_db.js';

/**
 * Course Catalog API Endpoint (Phase 2, Phase 3, Phase 7, Phase 9)
 * 
 * Rules:
 * - Phase 3: When public_catalog_enabled is false, returns empty courses list for public visitors.
 * - Phase 7: Automatically assigns a random variant from variant-01 to variant-10 upon course creation.
 * - Stores & preserves card_variant persistently in Neon PostgreSQL.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    // 1. Fetch centralized catalog visibility setting (Phase 3.3)
    const settings = await sql`
      SELECT value FROM system_settings 
      WHERE key = 'public_catalog_enabled' 
      LIMIT 1
    `;
    const isCatalogEnabled = settings.length > 0 ? (settings[0].value === true || settings[0].value === 'true') : false;

    // Check authorization header for super_admin bypass (e.g. for Admin Course Management)
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const tokenUserId = authHeader.replace('Bearer ', '').trim();
      const userCheck = await sql`SELECT role FROM users WHERE id = ${tokenUserId} LIMIT 1`;
      if (userCheck.length > 0 && userCheck[0].role === 'super_admin') {
        isAdmin = true;
      }
    }

    // 2. Handle POST (Create Course by Super Admin - Phase 7.4)
    if (req.method === 'POST') {
      if (!isAdmin) {
        return json(res, { error: 'Unauthorized: Super Admin role required to create courses' }, 403);
      }

      const body = req.body || {};
      const {
        title,
        slug,
        category = 'Defensive Operations',
        difficulty = 'Intermediate',
        price = 0,
        cert_price = 3999,
        estimated_duration = '12 Hours',
        overview = '',
        learning_objectives = [],
        lead_author = {}
      } = body;

      if (!title || !slug) {
        return json(res, { error: 'Missing title or slug' }, 400);
      }

      // Random variant selection from the 10 designs (Phase 7.2 & 7.4)
      const variants = [
        'variant-01', 'variant-02', 'variant-03', 'variant-04', 'variant-05',
        'variant-06', 'variant-07', 'variant-08', 'variant-09', 'variant-10'
      ];
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];

      const newId = `crs_${Date.now()}`;
      await sql`
        INSERT INTO courses (
          id, slug, title, version, category, difficulty, price, cert_price,
          estimated_duration, rating, enrolled_count, overview,
          learning_objectives, lead_author, total_tokens_reward, card_variant, created_at
        ) VALUES (
          ${newId}, ${slug}, ${title}, '1.0', ${category}, ${difficulty},
          ${price}, ${cert_price}, ${estimated_duration}, 5.0, 0, ${overview},
          ${JSON.stringify(learning_objectives)}, ${JSON.stringify(lead_author)},
          300, ${randomVariant}, NOW()
        )
      `;

      return json(res, { success: true, course_id: newId, card_variant: randomVariant }, 201);
    }

    // 3. Handle PUT (Catalog Toggle or Course Edit - Phase 3.3 & 4.1)
    if (req.method === 'PUT') {
      if (!isAdmin) {
        return json(res, { error: 'Unauthorized: Super Admin role required' }, 403);
      }

      const { action, public_catalog_enabled } = req.body || {};

      if (action === 'TOGGLE_CATALOG_VISIBILITY') {
        const newValue = Boolean(public_catalog_enabled);
        await sql`
          INSERT INTO system_settings (key, value, updated_at)
          VALUES ('public_catalog_enabled', ${JSON.stringify(newValue)}::jsonb, NOW())
          ON CONFLICT (key) DO UPDATE 
          SET value = ${JSON.stringify(newValue)}::jsonb, updated_at = NOW()
        `;
        return json(res, { success: true, public_catalog_enabled: newValue });
      }

      return json(res, { error: 'Unsupported action' }, 400);
    }

    // 4. Handle GET (Course by ID/Slug or Course List)
    const { id, slug, preview } = req.query;

    if (id || slug) {
      // Fetch specific course
      const courses = id
        ? await sql`SELECT * FROM courses WHERE id = ${id} LIMIT 1`
        : await sql`SELECT * FROM courses WHERE slug = ${slug} LIMIT 1`;

      if (!courses || courses.length === 0) {
        return json(res, { error: 'Course not found' }, 404);
      }

      const course = courses[0];

      // Fetch modules for this course
      const modules = await sql`
        SELECT * FROM modules 
        WHERE course_id = ${course.id} 
        ORDER BY module_order ASC
      `;

      // Fetch lessons for these modules
      for (const mod of modules) {
        const lessons = await sql`
          SELECT id, module_id, title, duration, is_mandatory, lesson_type, summary, content, resources, lesson_order 
          FROM lessons 
          WHERE module_id = ${mod.id} 
          ORDER BY lesson_order ASC
        `;
        mod.lessons = lessons;

        // Fetch quiz for this module if any
        const quizzes = await sql`
          SELECT id, module_id, course_id, title, passing_score, token_bounty, is_final_exam, duration_minutes 
          FROM quizzes 
          WHERE module_id = ${mod.id} 
          LIMIT 1
        `;
        if (quizzes.length > 0) {
          const q = quizzes[0];
          const questions = await sql`
            SELECT id, quiz_id, question_text, question_type, points, explanation, question_order 
            FROM questions 
            WHERE quiz_id = ${q.id} 
            ORDER BY question_order ASC
          `;
          for (const quest of questions) {
            const options = await sql`
              SELECT id, question_id, option_text, option_order 
              FROM question_options 
              WHERE question_id = ${quest.id} 
              ORDER BY option_order ASC
            `;
            quest.options = options;
          }
          q.questions = questions;
          mod.quiz = q;
        }
      }

      course.modules = modules;

      // Final exam check
      const finalExams = await sql`
        SELECT id, course_id, title, passing_score, token_bounty, is_final_exam, duration_minutes 
        FROM quizzes 
        WHERE course_id = ${course.id} AND is_final_exam = true 
        LIMIT 1
      `;
      if (finalExams.length > 0) {
        course.final_exam = finalExams[0];
      }

      return json(res, { course, public_catalog_enabled: isCatalogEnabled });
    }

    // 5. List courses: STRICT Phase 3.1 & 3.3 Check
    // If public catalog is disabled and requester is not authenticated Super Admin, return empty list!
    if (!isCatalogEnabled && !isAdmin && preview !== 'admin') {
      return json(res, {
        courses: [],
        public_catalog_enabled: false,
        message: 'Courses will be out soon'
      });
    }

    // List all courses with their stored card_variant (Phase 7.4)
    const allCourses = await sql`
      SELECT id, slug, title, version, category, difficulty, price, cert_price,
             estimated_duration, rating, enrolled_count, overview, lead_author,
             total_tokens_reward, card_variant, created_at 
      FROM courses 
      ORDER BY rating DESC, enrolled_count DESC
    `;

    return json(res, {
      courses: allCourses,
      public_catalog_enabled: isCatalogEnabled
    });
  } catch (error) {
    console.error('API /courses error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
