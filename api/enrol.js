import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const body = req.body || {};
      const { user_id, course_id } = body;

      if (!user_id || !course_id) {
        return json(res, { error: 'user_id and course_id are required' }, 400);
      }

      // Check if already enrolled
      const existing = await sql`
        SELECT * FROM enrolments 
        WHERE user_id = ${user_id} AND course_id = ${course_id}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return json(res, { enrolment: existing[0], message: 'Already enrolled' });
      }

      const id = `enr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newEnrolment = await sql`
        INSERT INTO enrolments (id, user_id, course_id, course_version, enrolled_at, status)
        VALUES (${id}, ${user_id}, ${course_id}, '1.2', NOW(), 'Active')
        RETURNING *
      `;

      // Update course enrolled_count
      await sql`
        UPDATE courses 
        SET enrolled_count = enrolled_count + 1 
        WHERE id = ${course_id}
      `;

      // Award 50 onboarding tokens for first enrolment if applicable
      const ledgerCount = await sql`
        SELECT count(*) as count FROM reward_ledger WHERE user_id = ${user_id}
      `;
      if (parseInt(ledgerCount[0].count) === 0) {
        const rewardId = `rw_${Date.now()}`;
        await sql`
          INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
          VALUES (${rewardId}, ${user_id}, 50, 'welcome_bonus', 'Initial Academy Enrolment Welcome Bonus', ${rewardId}, NOW())
        `;
      }

      return json(res, { enrolment: newEnrolment[0], success: true });
    }

    if (req.method === 'GET') {
      const { userId, courseId } = req.query;

      if (!userId) {
        return json(res, { error: 'userId query parameter required' }, 400);
      }

      let enrolments;
      if (courseId) {
        enrolments = await sql`
          SELECT e.*, c.title as course_title, c.category, c.difficulty, c.lead_author, c.total_tokens_reward 
          FROM enrolments e 
          JOIN courses c ON e.course_id = c.id 
          WHERE e.user_id = ${userId} AND e.course_id = ${courseId}
        `;
      } else {
        enrolments = await sql`
          SELECT e.*, c.title as course_title, c.category, c.difficulty, c.lead_author, c.total_tokens_reward 
          FROM enrolments e 
          JOIN courses c ON e.course_id = c.id 
          WHERE e.user_id = ${userId}
          ORDER BY e.enrolled_at DESC
        `;
      }

      // Compute progress for each enrolment
      for (const enr of enrolments) {
        // Count total mandatory lessons
        const totalMandatoryRes = await sql`
          SELECT count(l.id) as total 
          FROM lessons l 
          JOIN modules m ON l.module_id = m.id 
          WHERE m.course_id = ${enr.course_id} AND l.is_mandatory = true
        `;
        const totalMandatory = parseInt(totalMandatoryRes[0].total) || 1;

        // Count completed mandatory lessons
        const completedRes = await sql`
          SELECT count(lp.id) as completed 
          FROM lesson_progress lp 
          JOIN lessons l ON lp.lesson_id = l.id 
          WHERE lp.enrolment_id = ${enr.id} AND l.is_mandatory = true
        `;
        const completed = parseInt(completedRes[0].completed) || 0;

        enr.completed_lessons_count = completed;
        enr.total_mandatory_lessons = totalMandatory;
        enr.progress_percentage = Math.min(100, Math.round((completed / totalMandatory) * 100));
      }

      return json(res, { enrolments });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('API /enrol error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
