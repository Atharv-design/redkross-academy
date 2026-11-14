import { sql, json, cors, serverError } from './_db.js';
import { requireUser } from './_auth.js';
import { randomId } from './_lib/learning.js';

/**
 * POST /api/violation - proctoring telemetry (tab switch, focus loss) for the
 * caller's own assessment session. This only records the event for review; the
 * consequence (losing the attempt) is applied by /api/assessment {action:'forfeit'}.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const body = req.body || {};
    const sessionId = typeof body.session_id === 'string' ? body.session_id : null;
    let session = null;
    if (sessionId) {
      const rows = await sql`SELECT id, course_id, quiz_id FROM assessment_sessions WHERE id = ${sessionId} AND user_id = ${ctx.user.id} LIMIT 1`;
      session = rows[0] || null;
      if (!session) return json(res, { error: 'Session not found' }, 404);
    }
    const strike = Math.max(1, Math.min(10, parseInt(body.strike_count, 10) || 1));
    const reason = String(body.reason || 'Focus loss / tab switch').slice(0, 200);
    await sql`
      INSERT INTO exam_violation_events (id, attempt_id, enrolment_id, quiz_id, user_id, course_id, strike_count, reason, status, created_at)
      VALUES (${randomId('vio')}, ${session?.id || null}, ${session?.course_id || String(body.course_id || 'unknown').slice(0, 100)},
              ${session?.quiz_id || String(body.quiz_id || 'unknown').slice(0, 150)}, ${ctx.user.id},
              ${session?.course_id || null}, ${strike}, ${reason}, 'Flagged', NOW())
    `;
    return json(res, { success: true, strike_count: strike });
  } catch (error) {
    return serverError(res, error, 'api/violation');
  }
}
