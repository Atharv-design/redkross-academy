import { sql, json, cors, serverError } from './_db.js';
import { requireUser } from './_auth.js';
import { getCourseSpec } from './_lib/courseRegistry.js';
import { ensureEnrolment } from './_lib/learning.js';

const LESSON_ID = /^[A-Za-z0-9_.:-]{1,150}$/;

/**
 * /api/progress - the caller's lesson completions, keyed by (user, course).
 *   GET  ?course_id=...                              completed lesson ids
 *   POST { course_id, lesson_id }                     mark one lesson complete
 *   POST { course_id, lesson_ids: [...] }             bulk (used once to migrate
 *                                                     progress saved in the browser)
 * Lesson completion is study progress only; certification depends solely on the
 * server-graded assessments in /api/assessment.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const userId = ctx.user.id;
    const courseId = String((req.method === 'GET' ? req.query?.course_id : req.body?.course_id) || '');
    const spec = await getCourseSpec(courseId);
    if (!spec) return json(res, { error: 'Unknown course' }, 404);

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT lesson_id, completed_at FROM lesson_completions WHERE user_id = ${userId} AND course_id = ${courseId}
      `;
      return json(res, { course_id: courseId, completed_lessons: rows.map((r) => r.lesson_id) });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const ids = (Array.isArray(body.lesson_ids) ? body.lesson_ids : [body.lesson_id])
        .filter((x) => typeof x === 'string' && LESSON_ID.test(x))
        .slice(0, 500);
      if (!ids.length) return json(res, { error: 'lesson_id required' }, 400);
      await ensureEnrolment(ctx.user, spec);
      for (const lessonId of ids) {
        await sql`
          INSERT INTO lesson_completions (user_id, course_id, lesson_id, completed_at)
          VALUES (${userId}, ${courseId}, ${lessonId}, NOW())
          ON CONFLICT DO NOTHING
        `;
      }
      const count = await sql`SELECT COUNT(*)::int AS n FROM lesson_completions WHERE user_id = ${userId} AND course_id = ${courseId}`;
      return json(res, { success: true, recorded: ids.length, completed_count: count[0].n });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    return serverError(res, error, 'api/progress');
  }
}
