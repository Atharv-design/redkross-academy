import { sql, json, cors, serverError } from './_db.js';
import { requireUser } from './_auth.js';
import { getCourseSpec } from './_lib/courseRegistry.js';
import { ensureEnrolment, awardTokens } from './_lib/learning.js';
import { dispatchWebhook } from './_webhooks.js';
import { checkCourseAccess } from './_lib/access.js';

/**
 * /api/enrol - the caller's own enrolments only (identity from the ID token).
 *   GET                       list my enrolments
 *   POST   { course_id }      enrol me (idempotent)
 *   DELETE { course_id }      cancel my enrolment in a free course
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const userId = ctx.user.id;

    if (req.method === 'GET') {
      const enrolments = await sql`
        SELECT e.id, e.course_id, e.status, e.enrolled_at, c.title AS course_title
        FROM enrolments e LEFT JOIN courses c ON c.id = e.course_id
        WHERE e.user_id = ${userId}
        ORDER BY e.enrolled_at DESC
      `;
      return json(res, { enrolments });
    }

    const courseId = String(req.body?.course_id || '');
    const spec = await getCourseSpec(courseId);
    if (!spec) return json(res, { error: 'Unknown course' }, 404);

    if (req.method === 'POST') {
      const access = await checkCourseAccess(ctx, spec.id);
      if (!access.allowed) {
        const messages = {
          COMING_SOON: 'This course is coming soon.',
          NOT_AVAILABLE: 'This course is not open for enrolment.',
          PAYMENT_REQUIRED: 'This course needs an access code or purchase.',
        };
        return json(res, { error: messages[access.reason] || 'Enrolment not allowed', reason: access.reason, price_inr: access.setting.price_inr }, 403);
      }
      const { enrolment, created } = await ensureEnrolment(ctx.user, spec);
      if (created) {
        await awardTokens(userId, 50, 'enrolment_bonus', `Enrolled in ${spec.title}`, `enrol:${userId}:${spec.id}`);
        dispatchWebhook('student.enrolled', {
          userId,
          email: ctx.user.email,
          fullName: ctx.user.full_name,
          cadetId: ctx.user.cadet_id,
          courseTitle: spec.title,
          enrolledAt: enrolment.enrolled_at,
        });
      }
      return json(res, { enrolment, created });
    }

    if (req.method === 'DELETE') {
      const rows = await sql`
        SELECT e.id, COALESCE(cs.price_inr, 0) AS price FROM enrolments e LEFT JOIN course_settings cs ON cs.course_id = e.course_id
        WHERE e.user_id = ${userId} AND e.course_id = ${courseId} LIMIT 1
      `;
      if (!rows.length) return json(res, { error: 'Enrolment not found' }, 404);
      if (Number(rows[0].price) > 0) {
        return json(res, { error: 'Paid course enrolments cannot be cancelled here.', non_refundable: true }, 400);
      }
      await sql`DELETE FROM enrolments WHERE id = ${rows[0].id} AND user_id = ${userId}`;
      await sql`UPDATE courses SET enrolled_count = GREATEST(0, COALESCE(enrolled_count, 0) - 1) WHERE id = ${courseId}`;
      return json(res, { success: true });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    return serverError(res, error, 'api/enrol');
  }
}
