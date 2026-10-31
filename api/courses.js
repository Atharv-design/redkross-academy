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
    let tokenUserId = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      tokenUserId = authHeader.replace('Bearer ', '').trim();
      if (tokenUserId.startsWith('{')) {
        try {
          const parsed = JSON.parse(tokenUserId);
          tokenUserId = parsed.id || tokenUserId;
        } catch {}
      }
      try {
        const userCheck = await sql`SELECT role FROM users WHERE id = ${tokenUserId} LIMIT 1`;
        if (userCheck.length > 0 && userCheck[0].role === 'super_admin') {
          isAdmin = true;
        }
      } catch (authErr) {
        console.warn('Auth check fallback in api/courses:', authErr);
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

      // Check for duplicate course
      const duplicateCheck = await sql`
        SELECT id FROM courses WHERE LOWER(title) = LOWER(${title}) OR slug = ${slug} LIMIT 1
      `;
      if (duplicateCheck.length > 0) {
        return json(res, { error: 'DUPLICATE_COURSE', message: `A course with title "${title}" or slug "${slug}" already exists.` }, 409);
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

      const { action, public_catalog_enabled, course, id } = req.body || {};

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

      // Course update
      const targetId = id || course?.id;
      if (targetId) {
        const c = course || req.body;
        await sql`
          UPDATE courses SET
            title = COALESCE(${c.title}, title),
            overview = COALESCE(${c.overview}, overview),
            category = COALESCE(${c.category}, category),
            difficulty = COALESCE(${c.difficulty}, difficulty),
            price = COALESCE(${c.price}, price),
            cert_price = COALESCE(${c.cert_price}, cert_price),
            estimated_duration = COALESCE(${c.estimated_duration}, estimated_duration),
            card_variant = COALESCE(${c.card_variant}, card_variant),
            what_you_will_learn = COALESCE(${JSON.stringify(c.what_you_will_learn || [])}::jsonb, what_you_will_learn),
            learning_objectives = COALESCE(${JSON.stringify(c.learning_objectives || [])}::jsonb, learning_objectives),
            prerequisites = COALESCE(${JSON.stringify(c.prerequisites || [])}::jsonb, prerequisites),
            updated_at = NOW()
          WHERE id = ${targetId}
        `;

        // Upsert deep syllabus: modules and lessons with multi-media assets
        if (Array.isArray(c.modules)) {
          for (let mIdx = 0; mIdx < c.modules.length; mIdx++) {
            const mod = c.modules[mIdx];
            const modId = mod.id || `mod_${targetId}_${mIdx + 1}`;
            try {
              await sql`
                INSERT INTO modules (id, course_id, title, description, module_order, created_at, updated_at)
                VALUES (${modId}, ${targetId}, ${mod.title || `Module ${mIdx + 1}`}, ${mod.description || ''}, ${mIdx + 1}, NOW(), NOW())
                ON CONFLICT (id) DO UPDATE SET
                  title = EXCLUDED.title,
                  description = EXCLUDED.description,
                  module_order = EXCLUDED.module_order,
                  updated_at = NOW()
              `;

              if (Array.isArray(mod.lessons)) {
                for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
                  const les = mod.lessons[lIdx];
                  const lesId = les.id || `les_${modId}_${lIdx + 1}`;
                  await sql`
                    INSERT INTO lessons (id, module_id, title, duration, is_mandatory, lesson_type, summary, content, videos, images, pdf_attachment_url, lesson_order, created_at, updated_at)
                    VALUES (
                      ${lesId}, ${modId}, ${les.title || `Lesson ${lIdx + 1}`}, ${les.duration || '15 mins'},
                      ${les.is_mandatory !== false}, ${les.lesson_type || 'theory'}, ${les.summary || ''}, ${les.content || ''},
                      ${JSON.stringify(les.videos || [])}::jsonb, ${JSON.stringify(les.images || [])}::jsonb, ${les.pdf_attachment_url || null},
                      ${lIdx + 1}, NOW(), NOW()
                    )
                    ON CONFLICT (id) DO UPDATE SET
                      title = EXCLUDED.title,
                      duration = EXCLUDED.duration,
                      is_mandatory = EXCLUDED.is_mandatory,
                      summary = EXCLUDED.summary,
                      content = EXCLUDED.content,
                      videos = EXCLUDED.videos,
                      images = EXCLUDED.images,
                      pdf_attachment_url = EXCLUDED.pdf_attachment_url,
                      lesson_order = EXCLUDED.lesson_order,
                      updated_at = NOW()
                  `;
                }
              }
            } catch (modErr) {
              console.warn('Module/lesson deep persistence notice:', modErr.message);
            }
          }
        }

        return json(res, { success: true, courseId: targetId });
      }

      return json(res, { error: 'Unsupported action or missing target course id' }, 400);
    }

    // 4. Handle DELETE (Course Deletion by Admin with Cascades)
    if (req.method === 'DELETE') {
      if (!isAdmin) {
        return json(res, { error: 'Unauthorized: Super Admin role required to delete courses' }, 403);
      }

      const courseId = req.query.id || req.body?.id || req.body?.courseId;
      if (!courseId) {
        return json(res, { error: 'Missing course id parameter' }, 400);
      }

      // Check course existence
      const target = await sql`SELECT id, title FROM courses WHERE id = ${courseId} LIMIT 1`;
      if (!target || target.length === 0) {
        return json(res, { error: 'Course not found' }, 404);
      }

      const courseTitle = target[0].title;

      try {
        // Cascade delete all dependent child entities in clean sequence
        await sql`DELETE FROM quiz_attempts WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM quiz_retry_windows WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM lesson_progress WHERE enrolment_id IN (SELECT id FROM enrolments WHERE course_id = ${courseId})`;
        await sql`DELETE FROM certificate_requests WHERE course_id = ${courseId}`;
        await sql`DELETE FROM credentials WHERE course_id = ${courseId}`;
        await sql`DELETE FROM enrolments WHERE course_id = ${courseId}`;

        // Cascade delete questions, options & quizzes
        await sql`DELETE FROM options WHERE question_id IN (SELECT q.id FROM questions q JOIN quizzes z ON q.quiz_id = z.id WHERE z.course_id = ${courseId} OR z.module_id IN (SELECT id FROM modules WHERE course_id = ${courseId}))`;
        await sql`DELETE FROM questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id = ${courseId} OR module_id IN (SELECT id FROM modules WHERE course_id = ${courseId}))`;
        await sql`DELETE FROM quizzes WHERE course_id = ${courseId} OR module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})`;

        // Delete assets, lessons & modules
        await sql`DELETE FROM course_video_assets WHERE course_id = ${courseId}`;
        await sql`DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = ${courseId})`;
        await sql`DELETE FROM modules WHERE course_id = ${courseId}`;

        // Finally delete the course
        await sql`DELETE FROM courses WHERE id = ${courseId}`;

        // Audit log
        const auditId = `aud_${Date.now()}`;
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (
            ${auditId}, 
            ${tokenUserId || 'admin'}, 
            'COURSE_DELETED', 
            'courses', 
            ${courseId}, 
            ${`Permanently deleted course "${courseTitle}" (${courseId}) and all associated modules, lessons and enrolments`}, 
            NOW()
          )
        `;
      } catch (cascadeErr) {
        console.error('Cascading course deletion error:', cascadeErr);
        return json(res, { error: 'Deletion cascade failed', details: cascadeErr.message }, 500);
      }

      return json(res, { success: true, message: `Course "${courseTitle}" deleted successfully`, courseId });
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
