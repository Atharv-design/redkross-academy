/**
 * Course access control, cohorts (college batches) and access codes.
 *
 * Access rule for a course:
 *   - admins: always
 *   - visibility COMING_SOON: nobody else
 *   - an active grant (course_access) or membership of an ACTIVE cohort whose bundle
 *     contains the course: allowed (this is how HIDDEN "private" courses are unlocked)
 *   - otherwise: allowed only when the course is PUBLISHED and free (price 0)
 *   - students already enrolled keep access if a course is later hidden or priced
 */
import crypto from 'crypto';
import { sql } from '../_db.js';
import { allCourseIds, getCourseSpec } from './courseRegistry.js';

export const VISIBILITIES = ['PUBLISHED', 'HIDDEN', 'COMING_SOON'];

const PSYCHOLOGY_COURSES = [
  ['crs_psych_cbt', 'Foundations of Cognitive Behavioral Therapy'],
  ['crs_psych_crisis', 'Psychological First Aid & Immediate Crisis Intervention'],
  ['crs_psych_neuro', 'Affective Neuroscience & Neuropsychology of Emotional Regulation'],
  ['crs_psych_forensic', 'Forensic Psychology & Criminal Profiling Methodologies'],
  ['crs_psych_adolescent', 'Adolescent Mental Health, Exam Anxiety & Academic Burnout'],
  ['crs_psych_mindfulness', 'Applied Mindfulness-Based Stress Reduction'],
];

let catalogPromise = null;
/** Every course the admin can manage: [{ id, code, title, division }]. */
export function courseCatalog() {
  if (!catalogPromise) {
    catalogPromise = (async () => {
      const list = [];
      for (const id of allCourseIds()) {
        const spec = await getCourseSpec(id);
        list.push({ id, code: spec?.code || '', title: spec?.title || id, division: 'cybersecurity' });
      }
      for (const [id, title] of PSYCHOLOGY_COURSES) list.push({ id, code: '', title, division: 'psychology' });
      return list;
    })();
  }
  return catalogPromise;
}

export async function isKnownCourse(courseId) {
  return (await courseCatalog()).some((c) => c.id === courseId);
}

/** { [course_id]: { visibility, price_inr } } with defaults applied for every known course. */
export async function courseSettingsMap() {
  const rows = await sql`SELECT course_id, visibility, price_inr FROM course_settings`;
  const byId = Object.fromEntries(rows.map((r) => [r.course_id, r]));
  const out = {};
  for (const c of await courseCatalog()) {
    const r = byId[c.id];
    out[c.id] = { visibility: r?.visibility || 'PUBLISHED', price_inr: Number(r?.price_inr || 0) };
  }
  return out;
}

export async function courseSetting(courseId) {
  const rows = await sql`SELECT visibility, price_inr FROM course_settings WHERE course_id = ${courseId} LIMIT 1`;
  return { visibility: rows[0]?.visibility || 'PUBLISHED', price_inr: Number(rows[0]?.price_inr || 0) };
}

/** Course ids the user has been granted (individual grants + active cohort bundles). */
export async function grantedCourseIds(userId) {
  const rows = await sql`
    SELECT course_id FROM course_access WHERE user_id = ${userId} AND revoked_at IS NULL
    UNION
    SELECT cc.course_id
    FROM cohort_members m
    JOIN cohorts c ON c.id = m.cohort_id AND c.status = 'ACTIVE'
    JOIN cohort_courses cc ON cc.cohort_id = m.cohort_id
    WHERE m.user_id = ${userId} AND m.removed_at IS NULL
  `;
  return rows.map((r) => r.course_id);
}

/**
 * Decides whether a user may enrol in / study a course.
 * Returns { allowed, reason, setting } where reason is one of
 * OK_FREE | OK_GRANTED | OK_ENROLLED | OK_ADMIN | COMING_SOON | NOT_AVAILABLE | PAYMENT_REQUIRED.
 */
export async function checkCourseAccess(ctx, courseId) {
  const setting = await courseSetting(courseId);
  if (ctx?.isAdmin) return { allowed: true, reason: 'OK_ADMIN', setting };
  if (setting.visibility === 'COMING_SOON') return { allowed: false, reason: 'COMING_SOON', setting };
  const userId = ctx?.user?.id;
  if (userId) {
    const granted = await grantedCourseIds(userId);
    if (granted.includes(courseId)) return { allowed: true, reason: 'OK_GRANTED', setting };
    const enrolled = await sql`SELECT 1 FROM enrolments WHERE user_id = ${userId} AND course_id = ${courseId} LIMIT 1`;
    if (enrolled.length) return { allowed: true, reason: 'OK_ENROLLED', setting };
  }
  if (setting.visibility !== 'PUBLISHED') return { allowed: false, reason: 'NOT_AVAILABLE', setting };
  if (setting.price_inr > 0) return { allowed: false, reason: 'PAYMENT_REQUIRED', setting };
  return { allowed: true, reason: 'OK_FREE', setting };
}

// ---------------------------------------------------------------- cohorts

export function normaliseDomains(input) {
  const list = (Array.isArray(input) ? input : String(input || '').split(/[,\s;]+/))
    .map((d) => d.trim().toLowerCase().replace(/^@+/, ''))
    .filter((d) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d));
  return [...new Set(list)].slice(0, 50);
}

export function normaliseEmails(input) {
  const list = (Array.isArray(input) ? input : String(input || '').split(/[,\s;]+/))
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) && e.length <= 255);
  return [...new Set(list)].slice(0, 5000);
}

/** Domain match includes sub-domains: student@cs.srmist.edu.in matches srmist.edu.in. */
function domainMatches(email, domains) {
  const host = email.split('@')[1] || '';
  return domains.some((d) => host === d || host.endsWith(`.${d}`));
}

/**
 * Whether an identity may join a cohort. Requires a provider-verified email whenever
 * the cohort restricts by domain or list (otherwise anyone could type a college address).
 */
export async function cohortEligibility(cohort, identity) {
  if (!cohort || cohort.status !== 'ACTIVE') return { eligible: false, reason: 'COHORT_CLOSED' };
  const domains = normaliseDomains(cohort.allowed_domains);
  const listCount = Number(
    (await sql`SELECT COUNT(*)::int AS n FROM cohort_allowed_emails WHERE cohort_id = ${cohort.id}`)[0]?.n || 0
  );
  if (!domains.length && !listCount) return { eligible: true };
  const email = String(identity?.email || '').toLowerCase();
  if (!email || !identity?.emailVerified) return { eligible: false, reason: 'EMAIL_NOT_VERIFIED' };
  if (domains.length && domainMatches(email, domains)) return { eligible: true };
  if (listCount) {
    const hit = await sql`SELECT 1 FROM cohort_allowed_emails WHERE cohort_id = ${cohort.id} AND email = ${email} LIMIT 1`;
    if (hit.length) return { eligible: true };
  }
  return { eligible: false, reason: 'NOT_ELIGIBLE', domains };
}

/** Adds a member. Admin adds also restore a removed member; self-joins never do. */
export async function addCohortMember(cohortId, userId, via, { codeId = null, addedBy = null } = {}) {
  if (via === 'ADMIN') {
    const rows = await sql`
      INSERT INTO cohort_members (cohort_id, user_id, joined_via, added_by, joined_at)
      VALUES (${cohortId}, ${userId}, 'ADMIN', ${addedBy}, NOW())
      ON CONFLICT (cohort_id, user_id) DO UPDATE SET removed_at = NULL, added_by = ${addedBy}
      RETURNING cohort_id
    `;
    return rows.length > 0;
  }
  const rows = await sql`
    INSERT INTO cohort_members (cohort_id, user_id, joined_via, code_id, added_by, joined_at)
    VALUES (${cohortId}, ${userId}, ${via}, ${codeId}, ${addedBy}, NOW())
    ON CONFLICT (cohort_id, user_id) DO NOTHING
    RETURNING cohort_id
  `;
  return rows.length > 0;
}

export async function cohortCourseIds(cohortId) {
  const rows = await sql`SELECT course_id FROM cohort_courses WHERE cohort_id = ${cohortId} ORDER BY course_id`;
  return rows.map((r) => r.course_id);
}

// ---------------------------------------------------------------- access codes

const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateCode(length = 10, prefix = '') {
  const bytes = crypto.randomBytes(length);
  let s = '';
  for (let i = 0; i < length; i++) s += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return prefix ? `${prefix}-${s}` : s;
}

/** Registration-link tokens are long and unguessable. */
export function generateLinkToken() {
  return generateCode(20);
}

export function normaliseCode(code) {
  return String(code || '').trim().toUpperCase().replace(/\s+/g, '');
}

export function isValidCustomCode(code) {
  return /^[A-Z0-9][A-Z0-9-]{3,39}$/.test(code);
}

/** The course ids a code applies to (resolved live for ALL and COHORT scopes). */
export async function codeCourseIds(code) {
  if (code.course_scope === 'ALL') {
    const settings = await courseSettingsMap();
    return Object.keys(settings).filter((id) => settings[id].visibility !== 'COMING_SOON');
  }
  if (code.course_scope === 'COHORT') return code.cohort_id ? cohortCourseIds(code.cohort_id) : [];
  const rows = await sql`SELECT course_id FROM access_code_courses WHERE code_id = ${code.id} ORDER BY course_id`;
  return rows.map((r) => r.course_id);
}

export async function findCode(rawCode) {
  const code = normaliseCode(rawCode);
  if (!code || code.length > 64) return null;
  const rows = await sql`SELECT * FROM access_codes WHERE code = ${code} LIMIT 1`;
  return rows[0] || null;
}

/** Validity independent of the user (active, dates, remaining uses). */
export function codeState(code, now = new Date()) {
  if (!code) return 'INVALID';
  if (!code.is_active) return 'INACTIVE';
  if (code.starts_at && new Date(code.starts_at) > now) return 'NOT_STARTED';
  if (code.expires_at && new Date(code.expires_at) <= now) return 'EXPIRED';
  if (code.max_redemptions && code.redemption_count >= code.max_redemptions) return 'USED_UP';
  return 'VALID';
}

const CODE_ERRORS = {
  INVALID: 'This code is not valid.',
  INACTIVE: 'This code is no longer active.',
  NOT_STARTED: 'This code is not active yet.',
  EXPIRED: 'This code has expired.',
  USED_UP: 'This code has reached its usage limit.',
  COHORT_CLOSED: 'This batch is closed.',
  EMAIL_NOT_VERIFIED: 'Sign in with your verified college email to use this code.',
  NOT_ELIGIBLE: 'This code is reserved for a specific batch and your email is not on it.',
  REMOVED_FROM_COHORT: 'You were removed from this batch. Contact the academy if this is a mistake.',
  NOT_FOR_COURSE: 'This code does not apply to this course.',
  PAYMENT_NOT_AVAILABLE: 'Discount noted, but online payment is not open yet. Contact the academy to complete enrolment.',
};
export function codeErrorMessage(reason) {
  return CODE_ERRORS[reason] || 'This code cannot be used.';
}

/** Public description of a code for the student (never includes counts or internal notes). */
export async function describeCode(code) {
  const courseIds = await codeCourseIds(code);
  const catalog = await courseCatalog();
  let cohort = null;
  if (code.cohort_id) {
    const rows = await sql`SELECT id, name, organisation FROM cohorts WHERE id = ${code.cohort_id} LIMIT 1`;
    cohort = rows[0] || null;
  }
  return {
    kind: code.kind,
    label: code.label || null,
    discount_percent: code.discount_percent,
    free: code.discount_percent === 100,
    course_scope: code.course_scope,
    courses: courseIds.map((id) => ({ id, title: catalog.find((c) => c.id === id)?.title || id })),
    cohort: cohort ? { name: cohort.name, organisation: cohort.organisation } : null,
    expires_at: code.expires_at,
  };
}

/**
 * Validates a code for a user without consuming it.
 * Returns { ok, reason, code, courseIds }.
 */
export async function evaluateCode(ctx, rawCode, { courseId = null } = {}) {
  const code = await findCode(rawCode);
  const state = codeState(code);
  const already = code
    ? (await sql`SELECT 1 FROM access_code_redemptions WHERE code_id = ${code.id} AND user_id = ${ctx.user.id} LIMIT 1`).length > 0
    : false;
  // A student who already redeemed may re-open the link (e.g. to pick up courses
  // added to the bundle later) even after the code filled up.
  if (state !== 'VALID' && !(already && state === 'USED_UP')) return { ok: false, reason: state, code };
  if (code.cohort_id) {
    const cohortRows = await sql`SELECT * FROM cohorts WHERE id = ${code.cohort_id} LIMIT 1`;
    const elig = await cohortEligibility(cohortRows[0], ctx.identity);
    if (!elig.eligible) return { ok: false, reason: elig.reason, code };
    const removed = await sql`
      SELECT 1 FROM cohort_members WHERE cohort_id = ${code.cohort_id} AND user_id = ${ctx.user.id} AND removed_at IS NOT NULL LIMIT 1
    `;
    if (removed.length) return { ok: false, reason: 'REMOVED_FROM_COHORT', code };
  }
  const courseIds = await codeCourseIds(code);
  if (courseId && !courseIds.includes(courseId)) return { ok: false, reason: 'NOT_FOR_COURSE', code };
  return { ok: true, reason: 'VALID', code, courseIds, alreadyRedeemed: already };
}

/**
 * Redeems a code. 100% codes unlock courses (and cohort membership); partial
 * discounts are validated only, because online payment is not wired up yet.
 * The usage counter is incremented atomically, so max_redemptions holds under load.
 */
export async function redeemCode(ctx, rawCode, { courseId = null, via = 'CODE' } = {}) {
  const ev = await evaluateCode(ctx, rawCode, { courseId });
  if (!ev.ok) return { ok: false, reason: ev.reason, status: ev.reason === 'INVALID' ? 404 : 400 };
  const { code, courseIds } = ev;

  if (code.discount_percent < 100) {
    return { ok: false, reason: 'PAYMENT_NOT_AVAILABLE', status: 402, discount_percent: code.discount_percent, courseIds };
  }

  const userId = ctx.user.id;
  let firstTime = false;
  if (!ev.alreadyRedeemed) {
    const inserted = await sql`
      INSERT INTO access_code_redemptions (id, code_id, user_id, discount_percent, course_ids, redeemed_at)
      VALUES (${`red_${crypto.randomBytes(10).toString('hex')}`}, ${code.id}, ${userId}, ${code.discount_percent},
              ${JSON.stringify(courseIds)}::jsonb, NOW())
      ON CONFLICT (code_id, user_id) DO NOTHING
      RETURNING id
    `;
    if (inserted.length) {
      const counted = await sql`
        UPDATE access_codes SET redemption_count = redemption_count + 1, updated_at = NOW()
        WHERE id = ${code.id} AND is_active = TRUE
          AND (max_redemptions IS NULL OR redemption_count < max_redemptions)
        RETURNING redemption_count
      `;
      if (!counted.length) {
        await sql`DELETE FROM access_code_redemptions WHERE id = ${inserted[0].id}`;
        return { ok: false, reason: 'USED_UP', status: 400 };
      }
      firstTime = true;
    }
  }

  let joinedCohort = false;
  if (code.cohort_id) {
    joinedCohort = await addCohortMember(code.cohort_id, userId, via === 'LINK' ? 'LINK' : 'CODE', { codeId: code.id });
  }
  // Cohort-scoped codes unlock through membership; other scopes get individual grants.
  // A first redemption may revive an earlier revoked grant; re-opening an already
  // redeemed code only adds courses that are new to its scope (it never undoes an
  // admin revocation).
  if (code.course_scope !== 'COHORT') {
    for (const cid of courseIds) {
      if (firstTime) {
        await sql`
          INSERT INTO course_access (user_id, course_id, source, source_ref, discount_percent, granted_at)
          VALUES (${userId}, ${cid}, 'CODE', ${code.id}, 100, NOW())
          ON CONFLICT (user_id, course_id) DO UPDATE
            SET revoked_at = NULL, source = 'CODE', source_ref = ${code.id}, discount_percent = 100, granted_at = NOW()
            WHERE course_access.revoked_at IS NOT NULL
        `;
      } else {
        await sql`
          INSERT INTO course_access (user_id, course_id, source, source_ref, discount_percent, granted_at)
          VALUES (${userId}, ${cid}, 'CODE', ${code.id}, 100, NOW())
          ON CONFLICT (user_id, course_id) DO NOTHING
        `;
      }
    }
  }
  return { ok: true, code, courseIds, firstTime, joinedCohort };
}
