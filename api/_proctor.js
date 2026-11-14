import { sql, json, cors, serverError } from './_db.js';
import { requireUser } from './_auth.js';
import { randomId } from './_lib/learning.js';

/**
 * POST /api/proctor - proctoring evidence for the caller's own exam session.
 *   { session_id, kind, detail?, snapshot? (data:image/jpeg;base64,...) }
 *
 * Only records evidence for admin review. Consequences (losing the attempt) are
 * applied by /api/assessment { action: 'forfeit' } and by admins in the console.
 * Limits per session keep storage bounded even if a client misbehaves.
 */
export const KINDS = {
  phone: 'high',
  multiple_faces: 'high',
  face_absent: 'medium',
  looking_away: 'medium',
  focus: 'medium',
  periodic: 'info',
};
const MAX_EVENTS_PER_SESSION = 300;
const MAX_SNAPSHOTS_PER_SESSION = 40;
const MAX_SNAPSHOT_BYTES = 60 * 1024;
const SNAPSHOT_RE = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/;

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const body = req.body || {};
    const kind = String(body.kind || '');
    if (!KINDS[kind]) return json(res, { error: 'Unknown event' }, 400);

    const sessionId = typeof body.session_id === 'string' ? body.session_id.slice(0, 64) : '';
    const rows = await sql`
      SELECT id, course_id, quiz_id, status FROM assessment_sessions
      WHERE id = ${sessionId} AND user_id = ${ctx.user.id} LIMIT 1
    `;
    const session = rows[0];
    if (!session) return json(res, { error: 'Session not found' }, 404);

    const [counts] = await sql`
      SELECT COUNT(*)::int AS events, COUNT(snapshot)::int AS snapshots
      FROM proctor_events WHERE session_id = ${session.id}
    `;
    if (counts.events >= MAX_EVENTS_PER_SESSION) return json(res, { success: true, stored: false });

    let snapshot = null;
    if (typeof body.snapshot === 'string' && counts.snapshots < MAX_SNAPSHOTS_PER_SESSION) {
      const m = SNAPSHOT_RE.exec(body.snapshot);
      if (m) {
        const bytes = Buffer.from(m[1], 'base64');
        // must really be a JPEG and small
        if (bytes.length <= MAX_SNAPSHOT_BYTES && bytes[0] === 0xff && bytes[1] === 0xd8) snapshot = body.snapshot;
      }
    }

    await sql`
      INSERT INTO proctor_events (id, session_id, user_id, course_id, quiz_id, kind, severity, detail, snapshot, created_at)
      VALUES (${randomId('pe')}, ${session.id}, ${ctx.user.id}, ${session.course_id}, ${session.quiz_id}, ${kind},
              ${KINDS[kind]}, ${String(body.detail || '').replace(/[\u0000-\u001f]/g, ' ').slice(0, 300) || null}, ${snapshot}, NOW())
    `;
    return json(res, { success: true, stored: true, snapshot_stored: Boolean(snapshot) });
  } catch (error) {
    return serverError(res, error, 'api/proctor');
  }
}

/** Clears snapshot images older than the retention period (events are kept). */
export async function purgeOldSnapshots() {
  const days = Math.max(7, parseInt(process.env.PROCTOR_SNAPSHOT_RETENTION_DAYS || '90', 10) || 90);
  const rows = await sql`
    UPDATE proctor_events SET snapshot = NULL
    WHERE snapshot IS NOT NULL AND created_at < NOW() - (${days} || ' days')::interval
    RETURNING id
  `;
  return rows.length;
}
