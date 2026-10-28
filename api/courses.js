import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const { id, slug } = req.query;

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
          // Fetch questions
          const questions = await sql`
            SELECT id, quiz_id, question_text, question_type, points, explanation, question_order 
            FROM questions 
            WHERE quiz_id = ${q.id} 
            ORDER BY question_order ASC
          `;
          for (const quest of questions) {
            // Do NOT leak is_correct to the public course syllabus
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

      // Check for final exam
      const finalExams = await sql`
        SELECT id, course_id, title, passing_score, token_bounty, is_final_exam, duration_minutes 
        FROM quizzes 
        WHERE course_id = ${course.id} AND is_final_exam = true 
        LIMIT 1
      `;
      if (finalExams.length > 0) {
        const fe = finalExams[0];
        const feQuestions = await sql`
          SELECT id, quiz_id, question_text, question_type, points, explanation, question_order 
          FROM questions 
          WHERE quiz_id = ${fe.id} 
          ORDER BY question_order ASC
        `;
        for (const quest of feQuestions) {
          const options = await sql`
            SELECT id, question_id, option_text, option_order 
            FROM question_options 
            WHERE question_id = ${quest.id} 
            ORDER BY option_order ASC
          `;
          quest.options = options;
        }
        fe.questions = feQuestions;
        course.final_exam = fe;
      }

      return json(res, { course });
    }

    // List all courses
    const allCourses = await sql`
      SELECT id, slug, title, version, category, difficulty, price, cert_price, estimated_duration, rating, enrolled_count, overview, lead_author, total_tokens_reward, created_at 
      FROM courses 
      ORDER BY rating DESC, enrolled_count DESC
    `;

    return json(res, { courses: allCourses });
  } catch (error) {
    console.error('API /courses error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
