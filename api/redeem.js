import { sql, json, cors, serverError } from './_db.js';
import { requireUser, audit } from './_auth.js';
import { getCourseSpec } from './_lib/courseRegistry.js';
import { ensureEnrolment, awardTokens } from './_lib/learning.js';
import { evaluateCode, redeemCode, describeCode, codeErrorMessage, findCode, codeState } from './_lib/access.js';

/**
 * /api/redeem - access codes and batch registration links (signed-in students).
 *   GET  ?code=XXXX[&course_id=]               preview: what the code does and whether I can use it
 *   POST { code, course_id?, via?: 'LINK' }    redeem: unlock courses / join the batch / enrol
 *
 * Failed lookups are counted per user (and the Express server rate-limits this
 * route), so codes cannot be brute-forced.
 */
const MAX_FAILURES_PER_HOUR = 10;

async function tooManyFailures(userId) {
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM audit_logs
    WHERE actor_id = ${userId} AND action = 'CODE_REJECTED' AND created_at > NOW() - INTERVAL '1 hour'
  `;
  return Number(rows[0]?.n || 0) >= MAX_FAILURES_PER_HOUR;
}

/** Courses this code enrols the student in (bundle codes enrol in everything; "all courses" codes only in the requested one). */
function enrolTargets(code, courseIds, courseId) {
  if (code.course_scope === 'ALL') return courseId ? [courseId] : [];
  return courseIds;
}

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const userId = ctx.user.id;
    const input = req.method === 'GET' ? req.query || {} : req.body || {};
    const rawCode = String(input.code || '').slice(0, 80);
    const courseId = input.course_id ? String(input.course_id) : null;
    if (!rawCode) return json(res, { error: 'Enter a code' }, 400);

    if (await tooManyFailures(userId)) {
      return json(res, { error: 'Too many invalid codes. Try again in an hour.', reason: 'RATE_LIMITED' }, 429);
    }

    const reject = async (reason, status = 400, extra = {}) => {
      // Only unknown codes count towards the brute-force limit.
      if (reason === 'INVALID') await audit(userId, 'CODE_REJECTED', 'access_codes', null, { reason });
      return json(res, { error: codeErrorMessage(reason), reason, ...extra }, status);
    };

    if (req.method === 'GET') {
      const ev = await evaluateCode(ctx, rawCode, { courseId });
      if (!ev.code) return reject('INVALID', 404);
      const details = await describeCode(ev.code);
      if (!ev.ok) return reject(ev.reason, 400, { details: codeState(ev.code) === 'INVALID' ? null : details });
      return json(res, { valid: true, already_redeemed: ev.alreadyRedeemed, details });
    }

    if (req.method === 'POST') {
      const via = input.via === 'LINK' ? 'LINK' : 'CODE';
      const result = await redeemCode(ctx, rawCode, { courseId, via });
      if (!result.ok) {
        const code = await findCode(rawCode);
        const extra = result.reason === 'PAYMENT_NOT_AVAILABLE' ? { discount_percent: result.discount_percent } : {};
        if (!code) return reject('INVALID', 404);
        return reject(result.reason, result.status || 400, extra);
      }

      const enrolled = [];
      for (const cid of enrolTargets(result.code, result.courseIds, courseId)) {
        const spec = await getCourseSpec(cid);
        if (!spec) continue; // psychology/coming-soon courses have no classroom yet
        const { created } = await ensureEnrolment(ctx.user, spec);
        if (created) {
          await awardTokens(userId, 50, 'enrolment_bonus', `Enrolled in ${spec.title}`, `enrol:${userId}:${spec.id}`);
        }
        enrolled.push(cid);
      }
      if (result.firstTime) {
        await audit(userId, 'CODE_REDEEMED', 'access_codes', result.code.id, {
          code: result.code.code,
          via,
          courses: result.courseIds,
          cohort_id: result.code.cohort_id,
        });
      }
      return json(res, {
        success: true,
        first_time: result.firstTime,
        joined_cohort: result.joinedCohort,
        details: await describeCode(result.code),
        enrolled_course_ids: enrolled,
      });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    return serverError(res, error, 'api/redeem');
  }
}
