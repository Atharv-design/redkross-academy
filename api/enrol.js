import { sql, json, cors } from './_db.js';
import { dispatchWebhook } from './_webhooks.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const body = req.body || {};
      const { user_id, course_id, email, full_name, cadet_id } = body;

      if (!user_id || !course_id) {
        return json(res, { error: 'user_id and course_id are required' }, 400);
      }

      // 1. Ensure user profile exists in Postgres to prevent foreign key violations
      try {
        const studentEmail = email ? email.trim().toLowerCase() : `${user_id}@cadet.redkross.org.in`;
        const studentName = full_name || 'Cadet Operator';
        const assignedCadetId = cadet_id || 'RK-CADET';

        await sql`
          INSERT INTO users (id, email, full_name, cadet_id, role, status, token_balance, created_at, updated_at)
          VALUES (
            ${user_id},
            ${studentEmail},
            ${studentName},
            ${assignedCadetId},
            'student',
            'ACTIVE',
            150,
            NOW(),
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            email = COALESCE(EXCLUDED.email, users.email),
            full_name = COALESCE(EXCLUDED.full_name, users.full_name),
            cadet_id = COALESCE(EXCLUDED.cadet_id, users.cadet_id),
            updated_at = NOW()
        `;
      } catch (userUpsertErr) {
        console.warn('[User Upsert Warning]:', userUpsertErr.message);
      }

      // 2. Check if already enrolled
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

      // 3. Update course enrolled_count
      await sql`
        UPDATE courses 
        SET enrolled_count = enrolled_count + 1 
        WHERE id = ${course_id}
      `;

      // 4. Award 50 onboarding tokens for first enrolment if applicable
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

      // 5. Asynchronously trigger n8n onboarding automation directly to the student's exact email address
      (async () => {
        try {
          const userRes = await sql`SELECT full_name, email, cadet_id FROM users WHERE id = ${user_id} LIMIT 1`;
          const courseRes = await sql`SELECT title FROM courses WHERE id = ${course_id} LIMIT 1`;
          const userObj = userRes[0] || {};
          const courseObj = courseRes[0] || {};
          const recipientEmail = email || userObj.email;

          if (recipientEmail) {
            dispatchWebhook('student.enrolled', {
              userId: user_id,
              email: recipientEmail.trim().toLowerCase(),
              fullName: full_name || userObj.full_name || 'Cadet Operator',
              cadetId: cadet_id || userObj.cadet_id || 'RK-UNKNOWN',
              courseTitle: courseObj.title || 'Defensive Cyber Curriculum',
              enrolledAt: new Date().toISOString(),
              tokenBalance: 150
            });
          }
        } catch (hookErr) {
          console.warn('[Webhook Hook Error]:', hookErr.message);
        }
      })();

      return json(res, { enrolment: newEnrolment[0], success: true });
    }

    if (req.method === 'DELETE') {
      const body = req.body || {};
      const { enrolment_id, user_id, course_id } = body;

      if (!enrolment_id && (!user_id || !course_id)) {
        return json(res, { error: 'enrolment_id or (user_id and course_id) required' }, 400);
      }

      // Find enrolment and check course pricing policy
      const enrRes = enrolment_id
        ? await sql`SELECT e.*, c.price FROM enrolments e JOIN courses c ON e.course_id = c.id WHERE e.id = ${enrolment_id} LIMIT 1`
        : await sql`SELECT e.*, c.price FROM enrolments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ${user_id} AND e.course_id = ${course_id} LIMIT 1`;

      if (enrRes.length === 0) {
        return json(res, { error: 'Enrolment not found' }, 404);
      }

      const activeEnr = enrRes[0];

      // Strict Institutional Guard: Paid courses are non-refundable
      if (typeof activeEnr.price === 'number' && activeEnr.price > 0) {
        return json(res, {
          error: 'Institutional Policy: Paid course tracks are non-refundable and cannot be cancelled.',
          non_refundable: true
        }, 400);
      }

      // Delete the free enrolment
      await sql`DELETE FROM enrolments WHERE id = ${activeEnr.id}`;

      // Decrement enrolled_count
      await sql`UPDATE courses SET enrolled_count = GREATEST(0, enrolled_count - 1) WHERE id = ${activeEnr.course_id}`;

      return json(res, { success: true, message: 'Free course enrolment cancelled successfully' });
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
