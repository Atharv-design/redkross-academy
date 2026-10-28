import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const { enrolment_id, lesson_id } = req.body || {};

      if (!enrolment_id || !lesson_id) {
        return json(res, { error: 'enrolment_id and lesson_id are required' }, 400);
      }

      // Record lesson progress
      const id = `lp_${enrolment_id}_${lesson_id}`;
      await sql`
        INSERT INTO lesson_progress (id, enrolment_id, lesson_id, completed_at)
        VALUES (${id}, ${enrolment_id}, ${lesson_id}, NOW())
        ON CONFLICT (id) DO NOTHING
      `;

      // Find enrolment to get course_id
      const enrolment = await sql`
        SELECT * FROM enrolments WHERE id = ${enrolment_id} LIMIT 1
      `;
      if (!enrolment || enrolment.length === 0) {
        return json(res, { error: 'Enrolment not found' }, 404);
      }
      const courseId = enrolment[0].course_id;

      // Calculate progress percentage via PRD formula
      const totalMandatoryRes = await sql`
        SELECT count(l.id) as total 
        FROM lessons l 
        JOIN modules m ON l.module_id = m.id 
        WHERE m.course_id = ${courseId} AND l.is_mandatory = true
      `;
      const totalMandatory = parseInt(totalMandatoryRes[0].total) || 1;

      const completedRes = await sql`
        SELECT count(lp.id) as completed 
        FROM lesson_progress lp 
        JOIN lessons l ON lp.lesson_id = l.id 
        WHERE lp.enrolment_id = ${enrolment_id} AND l.is_mandatory = true
      `;
      const completed = parseInt(completedRes[0].completed) || 0;
      const progressPercentage = Math.min(100, Math.round((completed / totalMandatory) * 100));

      return json(res, {
        success: true,
        progress_percentage: progressPercentage,
        completed_count: completed,
        total_mandatory: totalMandatory,
        lesson_id
      });
    }

    if (req.method === 'GET') {
      const { enrolmentId } = req.query;

      if (!enrolmentId) {
        return json(res, { error: 'enrolmentId query parameter required' }, 400);
      }

      const completed = await sql`
        SELECT lesson_id, completed_at 
        FROM lesson_progress 
        WHERE enrolment_id = ${enrolmentId}
      `;

      return json(res, {
        completed_lessons: completed.map((r) => r.lesson_id),
        records: completed
      });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('API /progress error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
