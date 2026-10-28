import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method !== 'POST') {
      return json(res, { error: 'Method not allowed' }, 405);
    }

    const { attempt_id, enrolment_id, quiz_id, strike_count, reason, user_id } = req.body || {};

    if (!enrolment_id || !quiz_id || !strike_count) {
      return json(res, { error: 'enrolment_id, quiz_id, and strike_count are required' }, 400);
    }

    const violationId = `vio_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    await sql`
      INSERT INTO exam_violation_events (id, attempt_id, enrolment_id, quiz_id, strike_count, reason, status, created_at)
      VALUES (${violationId}, ${attempt_id || null}, ${enrolment_id}, ${quiz_id}, ${strike_count}, ${reason || 'Focus loss/tab switch detected'}, 'Flagged', NOW())
    `;

    // Action according to strike level
    let tokenPenalty = 0;
    let examTerminated = false;
    let lockedUntil = null;

    if (strike_count === 2 && user_id) {
      // Strike 2: 50 Token fine
      tokenPenalty = -50;
      const rewardId = `rw_pen_${Date.now()}`;
      await sql`
        INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
        VALUES (${rewardId}, ${user_id}, -50, 'penalty_strike_2', 'Proctoring Penalty: Tab switch / focus loss Strike 2', ${rewardId}, NOW())
      `;
    } else if (strike_count >= 3) {
      // Strike 3: Immediate exam termination and 24h lockout
      examTerminated = true;
      const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      lockedUntil = lockDate.toISOString();

      if (attempt_id) {
        await sql`
          UPDATE quiz_attempts 
          SET status = 'terminated', focus_strikes = ${strike_count}
          WHERE id = ${attempt_id}
        `;
      }

      // Set 24h lockout in quiz retry window
      const windowId = `qrw_${enrolment_id}_${quiz_id}`;
      await sql`
        INSERT INTO quiz_retry_windows (id, enrolment_id, quiz_id, window_number, attempts_used, locked_until)
        VALUES (${windowId}, ${enrolment_id}, ${quiz_id}, 1, 3, ${lockedUntil})
        ON CONFLICT (id) DO UPDATE SET
          attempts_used = 3,
          locked_until = ${lockedUntil}
      `;

      // Log critical audit log for proctor escalation queue
      await sql`
        INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
        VALUES (
          ${`log_${Date.now()}`}, ${user_id || 'system'}, 'EXAM_TERMINATED_STRIKE_3', 'quiz_attempt',
          ${attempt_id || quiz_id}, ${JSON.stringify({ reason, strikes: 3, locked_until: lockedUntil })}, NOW()
        )
      `;
    }

    return json(res, {
      success: true,
      violation_id: violationId,
      strike_count,
      token_penalty: tokenPenalty,
      exam_terminated: examTerminated,
      locked_until: lockedUntil
    });
  } catch (error) {
    console.error('API /violation error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
