import { sql, json, cors, serverError } from './_db.js';
import { requireAdmin, audit } from './_auth.js';
import adminHandler from './_admin.js';
import { getCourseSpec } from './_lib/courseRegistry.js';
import { issueCredential, publicCredential, randomId, publicBaseUrl } from './_lib/learning.js';
import {
  VISIBILITIES,
  courseCatalog,
  courseSettingsMap,
  isKnownCourse,
  normaliseDomains,
  normaliseEmails,
  addCohortMember,
  cohortCourseIds,
  generateCode,
  generateLinkToken,
  normaliseCode,
  isValidCustomCode,
  codeCourseIds,
  codeState,
  grantedCourseIds,
} from './_lib/access.js';
import { profileView } from './profile.js';

/**
 * /api/manage - the admin console API (one place to run the academy).
 *
 *   GET  ?resource=<name>&...      read  (me, overview, students, student, cohorts, cohort,
 *                                         codes, code, courses, name_requests, certificates,
 *                                         tickets, audit, admins, export)
 *   POST { action: <name>, ... }   write (see ACTIONS below)
 *
 * Every call requires a verified Firebase token for a user whose role is admin or
 * super_admin (ADMIN_EMAILS bootstrap admins count as super_admin). Role changes
 * and other destructive operations are super_admin only. Every write is audited.
 */

const PAGE = 50;

function isSuper(ctx) {
  return ctx.user.role === 'super_admin' || (ctx.isAdmin && ctx.user.role !== 'admin');
}

function str(v, max = 200) {
  if (v === null || v === undefined) return '';
  return String(v).trim().slice(0, max);
}

function intOrNull(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : NaN;
}

function dateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function page(q) {
  const p = Math.max(0, intOrNull(q.page) || 0);
  return { limit: PAGE, offset: p * PAGE, page: p };
}

function like(q) {
  const s = str(q, 120).replace(/[%_\\]/g, (m) => `\\${m}`);
  return s ? `%${s}%` : '';
}

/** CSV with spreadsheet formula-injection protection. */
function toCsv(rows, columns) {
  const cell = (v) => {
    let s = v === null || v === undefined ? '' : v instanceof Date ? v.toISOString() : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns.map((c) => cell(c[0])).join(','), ...rows.map((r) => columns.map((c) => cell(r[c[1]])).join(','))].join('\r\n');
}

async function titleMap() {
  return Object.fromEntries((await courseCatalog()).map((c) => [c.id, c.title]));
}

async function moduleCount(courseId) {
  const spec = await getCourseSpec(courseId);
  return spec?.modules?.length || 0;
}

// ======================================================================= READS

const READS = {
  async me(ctx) {
    return { user: profileView(ctx.user), is_super_admin: isSuper(ctx) };
  },

  async overview() {
    const [counts] = await sql`
      SELECT
        (SELECT COUNT(*)::int FROM users WHERE COALESCE(role, 'student') = 'student') AS students,
        (SELECT COUNT(*)::int FROM users WHERE COALESCE(role, 'student') = 'student' AND created_at > NOW() - INTERVAL '7 days') AS new_students_7d,
        (SELECT COUNT(DISTINCT user_id)::int FROM lesson_completions WHERE completed_at > NOW() - INTERVAL '7 days') AS active_learners_7d,
        (SELECT COUNT(*)::int FROM enrolments) AS enrolments,
        (SELECT COUNT(*)::int FROM credentials WHERE status = 'Active') AS certificates,
        (SELECT COUNT(*)::int FROM cohorts WHERE status = 'ACTIVE') AS active_cohorts,
        (SELECT COUNT(*)::int FROM access_codes WHERE is_active AND (expires_at IS NULL OR expires_at > NOW())) AS active_codes,
        (SELECT COUNT(*)::int FROM access_code_redemptions) AS redemptions,
        (SELECT COUNT(*)::int FROM access_code_redemptions WHERE redeemed_at > NOW() - INTERVAL '7 days') AS redemptions_7d,
        (SELECT COUNT(*)::int FROM name_change_requests WHERE status = 'PENDING') AS pending_name_requests,
        (SELECT COUNT(*)::int FROM support_tickets WHERE status IN ('Open', 'In Progress')) AS open_tickets,
        (SELECT COUNT(*)::int FROM assessment_windows WHERE locked_until > NOW()) AS locked_assessments,
        (SELECT COUNT(DISTINCT e.session_id)::int FROM proctor_events e
           JOIN assessment_sessions s ON s.id = e.session_id
          WHERE e.severity = 'high' AND s.review_status IS NULL) AS proctor_flags
    `;
    const recentStudents = await sql`
      SELECT id, full_name, email, college, avatar, created_at FROM users
      WHERE COALESCE(role, 'student') = 'student' ORDER BY created_at DESC LIMIT 6
    `;
    const recentRedemptions = await sql`
      SELECT r.redeemed_at, u.full_name, u.email, c.code, c.kind, c.discount_percent, co.name AS cohort_name
      FROM access_code_redemptions r
      JOIN users u ON u.id = r.user_id
      JOIN access_codes c ON c.id = r.code_id
      LEFT JOIN cohorts co ON co.id = c.cohort_id
      ORDER BY r.redeemed_at DESC LIMIT 8
    `;
    const recentCertificates = await sql`
      SELECT verification_id, student_name, course_title, issue_date FROM credentials
      WHERE status = 'Active' ORDER BY issue_date DESC LIMIT 6
    `;
    const titles = await titleMap();
    const byCourse = await sql`
      SELECT e.course_id, COUNT(*)::int AS enrolments,
             COUNT(cr.id)::int AS certificates
      FROM enrolments e
      LEFT JOIN credentials cr ON cr.user_id = e.user_id AND cr.course_id = e.course_id AND cr.status = 'Active'
      GROUP BY e.course_id ORDER BY enrolments DESC LIMIT 10
    `;
    return {
      counts,
      recent_students: recentStudents,
      recent_redemptions: recentRedemptions,
      recent_certificates: recentCertificates,
      top_courses: byCourse.map((r) => ({ ...r, title: titles[r.course_id] || r.course_id })),
    };
  },

  async students(ctx, q) {
    const { limit, offset, page: p } = page(q);
    const term = like(q.q);
    const cohort = str(q.cohort_id, 64);
    const status = str(q.status, 20).toUpperCase();
    const role = str(q.role, 20);
    const rows = await sql`
      SELECT u.id, u.full_name, u.email, u.avatar, u.college, u.status, u.role, u.cadet_id, u.created_at, u.last_seen_at,
        (SELECT COUNT(*)::int FROM enrolments e WHERE e.user_id = u.id) AS enrolments,
        (SELECT COUNT(*)::int FROM credentials c WHERE c.user_id = u.id AND c.status = 'Active') AS certificates,
        (SELECT string_agg(co.name, ', ' ORDER BY co.name) FROM cohort_members m JOIN cohorts co ON co.id = m.cohort_id
          WHERE m.user_id = u.id AND m.removed_at IS NULL) AS cohorts,
        COUNT(*) OVER()::int AS total
      FROM users u
      WHERE (${term} = '' OR u.email ILIKE ${term} OR u.full_name ILIKE ${term} OR u.college ILIKE ${term} OR u.cadet_id ILIKE ${term})
        AND (${cohort} = '' OR EXISTS (SELECT 1 FROM cohort_members m WHERE m.user_id = u.id AND m.cohort_id = ${cohort} AND m.removed_at IS NULL))
        AND (${status} = '' OR UPPER(COALESCE(u.status, 'ACTIVE')) = ${status})
        AND (${role} = '' OR COALESCE(u.role, 'student') = ${role})
      ORDER BY u.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return { students: rows.map(({ total, ...r }) => r), total: rows[0]?.total || 0, page: p, page_size: PAGE };
  },

  async student(ctx, q) {
    const id = str(q.id, 100);
    const [u] = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
    if (!u) return { __status: 404, error: 'Student not found' };
    const titles = await titleMap();
    const enrolments = await sql`
      SELECT e.id, e.course_id, e.status, e.enrolled_at,
        (SELECT COUNT(*)::int FROM lesson_completions l WHERE l.user_id = e.user_id AND l.course_id = e.course_id) AS lessons_completed,
        (SELECT COUNT(*)::int FROM assessment_passes p WHERE p.user_id = e.user_id AND p.course_id = e.course_id) AS assessments_passed
      FROM enrolments e WHERE e.user_id = ${id} ORDER BY e.enrolled_at DESC
    `;
    for (const e of enrolments) {
      e.title = titles[e.course_id] || e.course_id;
      e.modules = await moduleCount(e.course_id);
    }
    const credentials = await sql`SELECT * FROM credentials WHERE user_id = ${id} ORDER BY issue_date DESC`;
    const cohorts = await sql`
      SELECT c.id, c.name, c.organisation, m.joined_via, m.joined_at, m.removed_at
      FROM cohort_members m JOIN cohorts c ON c.id = m.cohort_id WHERE m.user_id = ${id} ORDER BY m.joined_at
    `;
    const grants = await sql`
      SELECT course_id, source, source_ref, granted_by, granted_at, revoked_at FROM course_access
      WHERE user_id = ${id} ORDER BY granted_at DESC
    `;
    const locks = await sql`
      SELECT course_id, quiz_id, attempts_used, locked_until FROM assessment_windows
      WHERE user_id = ${id} AND (locked_until > NOW() OR attempts_used > 0) ORDER BY updated_at DESC
    `;
    const redemptions = await sql`
      SELECT r.redeemed_at, c.code, c.kind, c.discount_percent FROM access_code_redemptions r
      JOIN access_codes c ON c.id = r.code_id WHERE r.user_id = ${id} ORDER BY r.redeemed_at DESC
    `;
    return {
      profile: { ...profileView(u), last_seen_at: u.last_seen_at },
      enrolments,
      certificates: credentials.map(publicCredential),
      cohorts,
      grants: grants.map((g) => ({ ...g, title: titles[g.course_id] || g.course_id })),
      unlocked_course_ids: await grantedCourseIds(id),
      locks: locks.map((l) => ({ ...l, title: titles[l.course_id] || l.course_id })),
      redemptions,
    };
  },

  async cohorts(ctx, q) {
    const status = str(q.status, 20).toUpperCase();
    const rows = await sql`
      SELECT c.*,
        (SELECT COUNT(*)::int FROM cohort_members m WHERE m.cohort_id = c.id AND m.removed_at IS NULL) AS members,
        (SELECT COUNT(*)::int FROM cohort_allowed_emails a WHERE a.cohort_id = c.id) AS allowed_emails,
        (SELECT COUNT(*)::int FROM cohort_courses cc WHERE cc.cohort_id = c.id) AS courses,
        (SELECT COUNT(*)::int FROM access_codes ac WHERE ac.cohort_id = c.id) AS codes
      FROM cohorts c
      WHERE (${status} = '' OR c.status = ${status})
      ORDER BY c.created_at DESC
    `;
    return { cohorts: rows };
  },

  async cohort(ctx, q) {
    const id = str(q.id, 64);
    const [c] = await sql`SELECT * FROM cohorts WHERE id = ${id} LIMIT 1`;
    if (!c) return { __status: 404, error: 'Batch not found' };
    const titles = await titleMap();
    const courseIds = await cohortCourseIds(id);
    const allowed = await sql`SELECT email FROM cohort_allowed_emails WHERE cohort_id = ${id} ORDER BY email`;
    const members = await sql`
      SELECT u.id, u.full_name, u.email, u.college, u.avatar, m.joined_via, m.joined_at,
        (SELECT COUNT(*)::int FROM lesson_completions l WHERE l.user_id = u.id AND l.course_id = ANY(${courseIds})) AS lessons_completed,
        (SELECT COUNT(*)::int FROM assessment_passes p WHERE p.user_id = u.id AND p.course_id = ANY(${courseIds})) AS assessments_passed,
        (SELECT COUNT(*)::int FROM credentials cr WHERE cr.user_id = u.id AND cr.course_id = ANY(${courseIds}) AND cr.status = 'Active') AS certificates
      FROM cohort_members m JOIN users u ON u.id = m.user_id
      WHERE m.cohort_id = ${id} AND m.removed_at IS NULL
      ORDER BY m.joined_at DESC
    `;
    const memberEmails = new Set(members.map((m) => (m.email || '').toLowerCase()));
    const codes = await sql`SELECT * FROM access_codes WHERE cohort_id = ${id} ORDER BY created_at DESC`;
    return {
      cohort: { ...c, allowed_domains: normaliseDomains(c.allowed_domains) },
      courses: courseIds.map((cid) => ({ id: cid, title: titles[cid] || cid })),
      allowed_emails: allowed.map((a) => ({ email: a.email, joined: memberEmails.has(a.email) })),
      members,
      codes: codes.map(codeView),
    };
  },

  async codes(ctx, q) {
    const { limit, offset, page: p } = page(q);
    const term = like(q.q);
    const cohort = str(q.cohort_id, 64);
    const kind = str(q.kind, 10).toUpperCase();
    const rows = await sql`
      SELECT ac.*, co.name AS cohort_name, COUNT(*) OVER()::int AS total
      FROM access_codes ac LEFT JOIN cohorts co ON co.id = ac.cohort_id
      WHERE (${term} = '' OR ac.code ILIKE ${term} OR ac.label ILIKE ${term} OR co.name ILIKE ${term})
        AND (${cohort} = '' OR ac.cohort_id = ${cohort})
        AND (${kind} = '' OR ac.kind = ${kind})
      ORDER BY ac.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const titles = await titleMap();
    const out = [];
    for (const r of rows) {
      const ids = r.course_scope === 'SELECTED' ? await codeCourseIds(r) : [];
      out.push({ ...codeView(r), cohort_name: r.cohort_name, courses: ids.map((id) => ({ id, title: titles[id] || id })) });
    }
    return { codes: out, total: rows[0]?.total || 0, page: p, page_size: PAGE };
  },

  async code(ctx, q) {
    const id = str(q.id, 64);
    const [c] = await sql`SELECT ac.*, co.name AS cohort_name FROM access_codes ac LEFT JOIN cohorts co ON co.id = ac.cohort_id WHERE ac.id = ${id} LIMIT 1`;
    if (!c) return { __status: 404, error: 'Code not found' };
    const titles = await titleMap();
    const ids = await codeCourseIds(c);
    const redemptions = await sql`
      SELECT r.redeemed_at, r.course_ids, u.id AS user_id, u.full_name, u.email, u.college
      FROM access_code_redemptions r JOIN users u ON u.id = r.user_id
      WHERE r.code_id = ${id} ORDER BY r.redeemed_at DESC LIMIT 1000
    `;
    return {
      code: { ...codeView(c), cohort_name: c.cohort_name, courses: ids.map((cid) => ({ id: cid, title: titles[cid] || cid })) },
      redemptions,
    };
  },

  async courses() {
    const catalog = await courseCatalog();
    const settings = await courseSettingsMap();
    const stats = await sql`
      SELECT e.course_id, COUNT(*)::int AS enrolments FROM enrolments e GROUP BY e.course_id
    `;
    const certs = await sql`SELECT course_id, COUNT(*)::int AS certificates FROM credentials WHERE status = 'Active' GROUP BY course_id`;
    const s = Object.fromEntries(stats.map((r) => [r.course_id, r.enrolments]));
    const c = Object.fromEntries(certs.map((r) => [r.course_id, r.certificates]));
    return {
      courses: catalog.map((x) => ({
        ...x,
        ...settings[x.id],
        enrolments: s[x.id] || 0,
        certificates: c[x.id] || 0,
      })),
    };
  },

  async name_requests(ctx, q) {
    const status = str(q.status, 20).toUpperCase() || 'PENDING';
    const rows = await sql`
      SELECT n.*, u.email, u.full_name AS name_now,
        (SELECT COUNT(*)::int FROM credentials c WHERE c.user_id = n.user_id AND c.status = 'Active') AS certificates
      FROM name_change_requests n JOIN users u ON u.id = n.user_id
      WHERE n.status = ${status}
      ORDER BY n.created_at DESC LIMIT 200
    `;
    return { requests: rows };
  },

  async certificates(ctx, q) {
    const { limit, offset, page: p } = page(q);
    const term = like(q.q);
    const rows = await sql`
      SELECT cr.*, u.email, COUNT(*) OVER()::int AS total
      FROM credentials cr LEFT JOIN users u ON u.id = cr.user_id
      WHERE (${term} = '' OR cr.verification_id ILIKE ${term} OR cr.student_name ILIKE ${term} OR u.email ILIKE ${term} OR cr.course_title ILIKE ${term})
      ORDER BY cr.issue_date DESC LIMIT ${limit} OFFSET ${offset}
    `;
    return {
      certificates: rows.map((r) => ({ ...publicCredential(r), email: r.email, user_id: r.user_id })),
      total: rows[0]?.total || 0,
      page: p,
      page_size: PAGE,
    };
  },

  async tickets(ctx, q) {
    const status = str(q.status, 20);
    const rows = await sql`
      SELECT * FROM support_tickets WHERE (${status} = '' OR status = ${status})
      ORDER BY created_at DESC LIMIT 200
    `;
    return { tickets: rows };
  },

  async audit(ctx, q) {
    const { limit, offset, page: p } = page(q);
    const term = like(q.q);
    const rows = await sql`
      SELECT a.id, a.action, a.actor_id, a.entity_type, a.entity_id, a.details, a.created_at, u.email AS actor_email,
             COUNT(*) OVER()::int AS total
      FROM audit_logs a LEFT JOIN users u ON u.id = a.actor_id
      WHERE (${term} = '' OR a.action ILIKE ${term} OR u.email ILIKE ${term} OR a.entity_id ILIKE ${term} OR a.details ILIKE ${term})
        AND a.action <> 'CODE_REJECTED'
      ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${offset}
    `;
    return { entries: rows.map(({ total, ...r }) => r), total: rows[0]?.total || 0, page: p, page_size: PAGE };
  },

  /** Exam sessions with proctoring flags, most serious first. */
  async proctor_sessions(ctx, q) {
    const { limit, offset, page: p } = page(q);
    const filter = str(q.filter, 20) || 'flagged'; // flagged | all | reviewed
    const term = like(q.q);
    const rows = await sql`
      SELECT s.id, s.user_id, s.course_id, s.quiz_id, s.kind, s.status, s.score_percentage, s.is_passed,
             s.started_at, s.submitted_at, s.review_status,
             u.full_name, u.email, u.avatar,
             COUNT(e.id) FILTER (WHERE e.kind = 'phone')::int AS phone,
             COUNT(e.id) FILTER (WHERE e.kind = 'multiple_faces')::int AS multiple_faces,
             COUNT(e.id) FILTER (WHERE e.kind = 'looking_away')::int AS looking_away,
             COUNT(e.id) FILTER (WHERE e.kind = 'face_absent')::int AS face_absent,
             COUNT(e.id) FILTER (WHERE e.kind = 'focus')::int AS focus,
             COUNT(e.id) FILTER (WHERE e.severity = 'high')::int AS high,
             COUNT(*) OVER()::int AS total
      FROM assessment_sessions s
      JOIN users u ON u.id = s.user_id
      LEFT JOIN proctor_events e ON e.session_id = s.id
      WHERE (${term} = '' OR u.email ILIKE ${term} OR u.full_name ILIKE ${term} OR s.id ILIKE ${term})
      GROUP BY s.id, u.id
      HAVING (${filter} = 'all')
          OR (${filter} = 'reviewed' AND s.review_status IS NOT NULL)
          OR (${filter} = 'flagged' AND s.review_status IS NULL
              AND COUNT(e.id) FILTER (WHERE e.severity IN ('high', 'medium')) > 0)
      ORDER BY COUNT(e.id) FILTER (WHERE e.severity = 'high') DESC, s.started_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const titles = await titleMap();
    return {
      sessions: rows.map(({ total, ...r }) => ({ ...r, course_title: titles[r.course_id] || r.course_id })),
      total: rows[0]?.total || 0,
      page: p,
      page_size: PAGE,
    };
  },

  /** One session: evidence timeline with snapshots. */
  async proctor_session(ctx, q) {
    const id = str(q.id, 64);
    const [s] = await sql`
      SELECT s.id, s.user_id, s.course_id, s.quiz_id, s.kind, s.status, s.score_percentage, s.is_passed,
             s.started_at, s.submitted_at, s.review_status, s.review_note, s.reviewed_at,
             u.full_name, u.email, u.avatar, u.cadet_id
      FROM assessment_sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ${id} LIMIT 1
    `;
    if (!s) return { __status: 404, error: 'Session not found' };
    const events = await sql`
      SELECT id, kind, severity, detail, snapshot, created_at FROM proctor_events
      WHERE session_id = ${id} ORDER BY created_at ASC
    `;
    const titles = await titleMap();
    return { session: { ...s, course_title: titles[s.course_id] || s.course_id }, events };
  },

  async admins() {
    const rows = await sql`
      SELECT id, full_name, email, role, avatar, last_seen_at FROM users
      WHERE role IN ('admin', 'super_admin') ORDER BY role DESC, full_name
    `;
    return { admins: rows };
  },

  async export(ctx, q) {
    const type = str(q.type, 40);
    const id = str(q.id, 64);
    if (type === 'cohort_members') {
      const data = await READS.cohort(ctx, { id });
      if (data.__status) return data;
      const csv = toCsv(data.members, [
        ['Name', 'full_name'], ['Email', 'email'], ['College', 'college'], ['Joined via', 'joined_via'],
        ['Joined at', 'joined_at'], ['Lessons completed', 'lessons_completed'], ['Assessments passed', 'assessments_passed'],
        ['Certificates', 'certificates'],
      ]);
      return { __csv: csv, filename: `batch-${slug(data.cohort.name)}.csv` };
    }
    if (type === 'code_redemptions') {
      const data = await READS.code(ctx, { id });
      if (data.__status) return data;
      const csv = toCsv(data.redemptions, [['Name', 'full_name'], ['Email', 'email'], ['College', 'college'], ['Redeemed at', 'redeemed_at']]);
      return { __csv: csv, filename: `code-${slug(data.code.code)}-redemptions.csv` };
    }
    if (type === 'codes') {
      const rows = await sql`
        SELECT ac.*, co.name AS cohort_name FROM access_codes ac LEFT JOIN cohorts co ON co.id = ac.cohort_id
        WHERE (${id} = '' OR ac.cohort_id = ${id}) ORDER BY ac.created_at DESC
      `;
      const out = rows.map((r) => ({ ...codeView(r), cohort_name: r.cohort_name }));
      const csv = toCsv(out, [
        ['Code', 'code'], ['Type', 'kind'], ['Registration link', 'link'], ['Label', 'label'], ['Discount %', 'discount_percent'],
        ['Scope', 'course_scope'], ['Batch', 'cohort_name'], ['Used', 'redemption_count'], ['Max uses', 'max_redemptions'],
        ['Active', 'is_active'], ['State', 'state'], ['Expires', 'expires_at'],
      ]);
      return { __csv: csv, filename: 'access-codes.csv' };
    }
    if (type === 'students') {
      const rows = await sql`
        SELECT u.full_name, u.email, u.college, u.degree, u.graduation_year, u.city, u.linkedin_url, u.status, u.created_at,
          (SELECT COUNT(*)::int FROM enrolments e WHERE e.user_id = u.id) AS enrolments,
          (SELECT COUNT(*)::int FROM credentials c WHERE c.user_id = u.id AND c.status = 'Active') AS certificates
        FROM users u WHERE COALESCE(u.role, 'student') = 'student' ORDER BY u.created_at DESC
      `;
      const csv = toCsv(rows, [
        ['Name', 'full_name'], ['Email', 'email'], ['College', 'college'], ['Degree', 'degree'], ['Graduation year', 'graduation_year'],
        ['City', 'city'], ['LinkedIn', 'linkedin_url'], ['Status', 'status'], ['Joined', 'created_at'], ['Enrolments', 'enrolments'],
        ['Certificates', 'certificates'],
      ]);
      return { __csv: csv, filename: 'students.csv' };
    }
    return { __status: 400, error: 'Unknown export' };
  },
};

function slug(s) {
  return String(s || 'export').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'export';
}

function codeView(c) {
  return {
    id: c.id,
    code: c.code,
    kind: c.kind,
    label: c.label,
    discount_percent: c.discount_percent,
    course_scope: c.course_scope,
    cohort_id: c.cohort_id,
    max_redemptions: c.max_redemptions,
    redemption_count: c.redemption_count,
    starts_at: c.starts_at,
    expires_at: c.expires_at,
    is_active: c.is_active,
    state: codeState(c),
    created_at: c.created_at,
    link: c.kind === 'LINK' ? `${publicBaseUrl()}/join/${c.code}` : null,
  };
}

// ======================================================================= WRITES

async function validCourseIds(ids) {
  const list = Array.isArray(ids) ? ids.map((x) => str(x, 100)) : [];
  const out = [];
  for (const id of [...new Set(list)]) if (await isKnownCourse(id)) out.push(id);
  return out;
}

async function addAllowedEmails(cohortId, emails) {
  for (const email of emails) {
    await sql`INSERT INTO cohort_allowed_emails (cohort_id, email) VALUES (${cohortId}, ${email}) ON CONFLICT DO NOTHING`;
  }
}

/** Parses and validates code settings shared by create and update. */
async function codeSettings(b, existing = null) {
  const errors = {};
  const out = {};
  const pick = (k) => (k in b ? b[k] : existing ? existing[k] : undefined);

  const discount = intOrNull(pick('discount_percent') ?? 100);
  if (!(discount >= 1 && discount <= 100)) errors.discount_percent = 'Discount must be 1-100%';
  out.discount_percent = discount;

  const scope = str(pick('course_scope') || 'SELECTED', 20).toUpperCase();
  if (!['ALL', 'SELECTED', 'COHORT'].includes(scope)) errors.course_scope = 'Choose all courses, selected courses or the batch bundle';
  out.course_scope = scope;

  const cohortId = str(pick('cohort_id'), 64) || null;
  if (cohortId) {
    const rows = await sql`SELECT id FROM cohorts WHERE id = ${cohortId} LIMIT 1`;
    if (!rows.length) errors.cohort_id = 'Unknown batch';
  }
  if (scope === 'COHORT' && !cohortId) errors.cohort_id = 'Pick the batch whose bundle this code unlocks';
  out.cohort_id = cohortId;

  if (scope === 'SELECTED' && 'course_ids' in b) {
    out.course_ids = await validCourseIds(b.course_ids);
    if (!out.course_ids.length) errors.course_ids = 'Pick at least one course';
  } else if (scope === 'SELECTED' && !existing) {
    errors.course_ids = 'Pick at least one course';
  }

  const max = intOrNull(pick('max_redemptions'));
  if (Number.isNaN(max) || (max !== null && max < 1)) errors.max_redemptions = 'Usage limit must be empty or at least 1';
  out.max_redemptions = max;

  const starts = dateOrNull(pick('starts_at'));
  const expires = dateOrNull(pick('expires_at'));
  if (starts === undefined) errors.starts_at = 'Invalid start date';
  if (expires === undefined) errors.expires_at = 'Invalid expiry date';
  if (starts && expires && new Date(expires) <= new Date(starts)) errors.expires_at = 'Expiry must be after the start';
  out.starts_at = starts ?? null;
  out.expires_at = expires ?? null;
  out.label = str(pick('label'), 160) || null;
  return { out, errors };
}

async function setCodeCourses(codeId, ids) {
  await sql`DELETE FROM access_code_courses WHERE code_id = ${codeId}`;
  for (const id of ids) await sql`INSERT INTO access_code_courses (code_id, course_id) VALUES (${codeId}, ${id}) ON CONFLICT DO NOTHING`;
}

async function insertCode(code, kind, s, adminId) {
  const id = randomId('acc');
  const rows = await sql`
    INSERT INTO access_codes (id, code, kind, label, discount_percent, course_scope, cohort_id, max_redemptions,
                              starts_at, expires_at, is_active, created_by, created_at, updated_at)
    VALUES (${id}, ${code}, ${kind}, ${s.label}, ${s.discount_percent}, ${s.course_scope}, ${s.cohort_id}, ${s.max_redemptions},
            ${s.starts_at}, ${s.expires_at}, TRUE, ${adminId}, NOW(), NOW())
    ON CONFLICT (code) DO NOTHING
    RETURNING *
  `;
  if (!rows.length) return null;
  if (s.course_scope === 'SELECTED') await setCodeCourses(id, s.course_ids || []);
  return rows[0];
}

const ACTIONS = {
  /**
   * Proctoring review. CLEARED keeps the result. VOIDED cancels the attempt: a pass
   * from this session is removed and, for a final exam, the certificate is revoked.
   */
  async proctor_review(ctx, b) {
    const id = str(b.session_id, 64);
    const decision = str(b.decision, 10).toUpperCase();
    if (!['CLEARED', 'VOIDED'].includes(decision)) return { __status: 400, error: 'Choose clear or void' };
    const note = str(b.note, 500) || null;
    const [s] = await sql`SELECT * FROM assessment_sessions WHERE id = ${id} LIMIT 1`;
    if (!s) return { __status: 404, error: 'Session not found' };
    let revoked = null;
    if (decision === 'VOIDED') {
      await sql`
        DELETE FROM assessment_passes
        WHERE user_id = ${s.user_id} AND course_id = ${s.course_id} AND quiz_id = ${s.quiz_id} AND session_id = ${s.id}
      `;
      if (s.kind === 'final') {
        const rows = await sql`
          UPDATE credentials SET status = 'Revoked'
          WHERE user_id = ${s.user_id} AND course_id = ${s.course_id} AND status = 'Active'
          RETURNING verification_id
        `;
        revoked = rows.map((r) => r.verification_id);
      }
    }
    await sql`
      UPDATE assessment_sessions SET review_status = ${decision}, reviewed_by = ${ctx.user.id}, reviewed_at = NOW(), review_note = ${note}
      WHERE id = ${id}
    `;
    await audit(ctx.user.id, decision === 'VOIDED' ? 'EXAM_ATTEMPT_VOIDED' : 'EXAM_ATTEMPT_CLEARED', 'assessment_sessions', id, {
      user_id: s.user_id,
      course_id: s.course_id,
      quiz_id: s.quiz_id,
      revoked_credentials: revoked,
      note,
    });
    return { success: true, revoked_credentials: revoked || [] };
  },

  // ---------------------------------------------------------------- courses
  async course_update(ctx, b) {
    const courseId = str(b.course_id, 100);
    if (!(await isKnownCourse(courseId))) return { __status: 404, error: 'Unknown course' };
    const visibility = str(b.visibility, 20).toUpperCase();
    const price = intOrNull(b.price_inr);
    if (!VISIBILITIES.includes(visibility)) return { __status: 400, error: 'Invalid visibility' };
    if (!(price >= 0 && price <= 1000000)) return { __status: 400, error: 'Price must be 0 or more (in rupees)' };
    await sql`
      INSERT INTO course_settings (course_id, visibility, price_inr, updated_by, updated_at)
      VALUES (${courseId}, ${visibility}, ${price}, ${ctx.user.id}, NOW())
      ON CONFLICT (course_id) DO UPDATE SET visibility = ${visibility}, price_inr = ${price}, updated_by = ${ctx.user.id}, updated_at = NOW()
    `;
    await audit(ctx.user.id, 'COURSE_SETTINGS_UPDATED', 'courses', courseId, { visibility, price_inr: price });
    return { success: true };
  },

  // ---------------------------------------------------------------- cohorts
  async cohort_save(ctx, b) {
    const name = str(b.name, 160);
    if (name.length < 2) return { __status: 400, error: 'Batch name is required', fields: { name: 'Required' } };
    const organisation = str(b.organisation, 160) || null;
    const description = str(b.description, 1000) || null;
    const domains = normaliseDomains(b.allowed_domains).join(',');
    const courseIds = 'course_ids' in b ? await validCourseIds(b.course_ids) : null;
    let id = str(b.id, 64);
    if (id) {
      const rows = await sql`
        UPDATE cohorts SET name = ${name}, organisation = ${organisation}, description = ${description},
          allowed_domains = ${domains}, updated_at = NOW()
        WHERE id = ${id} RETURNING id
      `;
      if (!rows.length) return { __status: 404, error: 'Batch not found' };
    } else {
      id = randomId('coh');
      await sql`
        INSERT INTO cohorts (id, name, organisation, description, allowed_domains, status, created_by, created_at, updated_at)
        VALUES (${id}, ${name}, ${organisation}, ${description}, ${domains}, 'ACTIVE', ${ctx.user.id}, NOW(), NOW())
      `;
    }
    if (courseIds) {
      await sql`DELETE FROM cohort_courses WHERE cohort_id = ${id}`;
      for (const cid of courseIds) await sql`INSERT INTO cohort_courses (cohort_id, course_id) VALUES (${id}, ${cid}) ON CONFLICT DO NOTHING`;
    }
    if ('allowed_emails' in b) {
      const emails = normaliseEmails(b.allowed_emails);
      if (b.replace_emails) await sql`DELETE FROM cohort_allowed_emails WHERE cohort_id = ${id}`;
      await addAllowedEmails(id, emails);
    }
    await audit(ctx.user.id, b.id ? 'COHORT_UPDATED' : 'COHORT_CREATED', 'cohorts', id, { name, domains, courses: courseIds });
    return { success: true, id };
  },

  async cohort_set_status(ctx, b) {
    const id = str(b.id, 64);
    const status = b.archived ? 'ARCHIVED' : 'ACTIVE';
    const rows = await sql`UPDATE cohorts SET status = ${status}, updated_at = NOW() WHERE id = ${id} RETURNING id`;
    if (!rows.length) return { __status: 404, error: 'Batch not found' };
    await audit(ctx.user.id, status === 'ARCHIVED' ? 'COHORT_ARCHIVED' : 'COHORT_RESTORED', 'cohorts', id, null);
    return { success: true };
  },

  /** Adds people by email: existing accounts join now; everyone is put on the allow-list so they can join via the batch link. */
  async cohort_add_members(ctx, b) {
    const id = str(b.cohort_id, 64);
    const [c] = await sql`SELECT id FROM cohorts WHERE id = ${id} LIMIT 1`;
    if (!c) return { __status: 404, error: 'Batch not found' };
    const emails = normaliseEmails(b.emails);
    if (!emails.length) return { __status: 400, error: 'Paste at least one valid email address' };
    await addAllowedEmails(id, emails);
    const users = await sql`SELECT id, email FROM users WHERE LOWER(email) = ANY(${emails})`;
    let added = 0;
    for (const u of users) if (await addCohortMember(id, u.id, 'ADMIN', { addedBy: ctx.user.id })) added++;
    await audit(ctx.user.id, 'COHORT_MEMBERS_ADDED', 'cohorts', id, { emails: emails.length, existing_accounts: users.length });
    return { success: true, allow_listed: emails.length, added_now: added, waiting_for_signup: emails.length - users.length };
  },

  async cohort_remove_member(ctx, b) {
    const cohortId = str(b.cohort_id, 64);
    const userId = str(b.user_id, 100);
    const rows = await sql`
      UPDATE cohort_members SET removed_at = NOW() WHERE cohort_id = ${cohortId} AND user_id = ${userId} AND removed_at IS NULL
      RETURNING user_id
    `;
    if (!rows.length) return { __status: 404, error: 'Member not found' };
    if (b.remove_from_allow_list) {
      await sql`
        DELETE FROM cohort_allowed_emails WHERE cohort_id = ${cohortId}
          AND email = (SELECT LOWER(email) FROM users WHERE id = ${userId})
      `;
    }
    await audit(ctx.user.id, 'COHORT_MEMBER_REMOVED', 'cohorts', cohortId, { user_id: userId });
    return { success: true };
  },

  async cohort_remove_allowed_email(ctx, b) {
    const cohortId = str(b.cohort_id, 64);
    const email = str(b.email, 255).toLowerCase();
    await sql`DELETE FROM cohort_allowed_emails WHERE cohort_id = ${cohortId} AND email = ${email}`;
    await audit(ctx.user.id, 'COHORT_ALLOWED_EMAIL_REMOVED', 'cohorts', cohortId, { email });
    return { success: true };
  },

  // ---------------------------------------------------------------- access codes
  /**
   * kind CODE: a typed code. Custom text (e.g. SRM-DEC26) or generated; quantity > 1
   * generates that many unique single-use codes (individual codes for a list of people).
   * kind LINK: a registration link with an unguessable token.
   */
  async code_create(ctx, b) {
    const kind = str(b.kind, 10).toUpperCase() === 'LINK' ? 'LINK' : 'CODE';
    const { out: s, errors } = await codeSettings(b);
    const quantity = Math.max(1, Math.min(500, intOrNull(b.quantity) || 1));
    const custom = normaliseCode(b.code);
    if (kind === 'CODE' && custom) {
      if (!isValidCustomCode(custom)) errors.code = 'Use 4-40 letters, digits or dashes';
      if (quantity > 1) errors.quantity = 'A custom code is a single code; leave it blank to generate many';
    }
    const prefix = normaliseCode(b.prefix).replace(/[^A-Z0-9]/g, '').slice(0, 12);
    if (Object.keys(errors).length) return { __status: 400, error: 'Please fix the highlighted fields', fields: errors };

    if (quantity > 1) s.max_redemptions = 1; // individual codes are single-use
    const created = [];
    for (let i = 0; i < quantity; i++) {
      let row = null;
      for (let attempt = 0; attempt < 5 && !row; attempt++) {
        const code = kind === 'LINK' ? generateLinkToken() : custom || generateCode(8, prefix);
        row = await insertCode(code, kind, s, ctx.user.id);
        if (!row && custom) return { __status: 409, error: 'That code already exists', fields: { code: 'Already exists' } };
      }
      if (row) created.push(codeView(row));
    }
    await audit(ctx.user.id, 'ACCESS_CODES_CREATED', 'access_codes', created[0]?.id || null, {
      kind,
      count: created.length,
      discount_percent: s.discount_percent,
      course_scope: s.course_scope,
      cohort_id: s.cohort_id,
    });
    return { success: true, codes: created };
  },

  async code_update(ctx, b) {
    const id = str(b.id, 64);
    const [existing] = await sql`SELECT * FROM access_codes WHERE id = ${id} LIMIT 1`;
    if (!existing) return { __status: 404, error: 'Code not found' };
    // What a code grants is fixed once someone has used it (so records stay truthful);
    // label, limits, dates and the on/off switch can always change.
    if (existing.redemption_count > 0) {
      const changed =
        ('discount_percent' in b && Number(b.discount_percent) !== existing.discount_percent) ||
        ('course_scope' in b && str(b.course_scope, 20).toUpperCase() !== existing.course_scope) ||
        ('cohort_id' in b && (str(b.cohort_id, 64) || null) !== (existing.cohort_id || null));
      if (changed) return { __status: 409, error: 'This code has been used; create a new code to change what it grants.' };
    }
    const { out: s, errors } = await codeSettings(b, existing);
    if (s.max_redemptions !== null && s.max_redemptions < existing.redemption_count) {
      errors.max_redemptions = `Already used ${existing.redemption_count} times`;
    }
    if (Object.keys(errors).length) return { __status: 400, error: 'Please fix the highlighted fields', fields: errors };
    await sql`
      UPDATE access_codes SET label = ${s.label}, discount_percent = ${s.discount_percent}, course_scope = ${s.course_scope},
        cohort_id = ${s.cohort_id}, max_redemptions = ${s.max_redemptions}, starts_at = ${s.starts_at}, expires_at = ${s.expires_at},
        updated_at = NOW()
      WHERE id = ${id}
    `;
    if (s.course_scope === 'SELECTED' && s.course_ids) {
      if (existing.redemption_count > 0) {
        for (const cid of s.course_ids) await sql`INSERT INTO access_code_courses (code_id, course_id) VALUES (${id}, ${cid}) ON CONFLICT DO NOTHING`;
      } else await setCodeCourses(id, s.course_ids);
    }
    await audit(ctx.user.id, 'ACCESS_CODE_UPDATED', 'access_codes', id, { code: existing.code });
    return { success: true };
  },

  async code_set_active(ctx, b) {
    const id = str(b.id, 64);
    const active = Boolean(b.active);
    const rows = await sql`UPDATE access_codes SET is_active = ${active}, updated_at = NOW() WHERE id = ${id} RETURNING code`;
    if (!rows.length) return { __status: 404, error: 'Code not found' };
    await audit(ctx.user.id, active ? 'ACCESS_CODE_ACTIVATED' : 'ACCESS_CODE_DEACTIVATED', 'access_codes', id, { code: rows[0].code });
    return { success: true };
  },

  async code_delete(ctx, b) {
    const id = str(b.id, 64);
    const rows = await sql`DELETE FROM access_codes WHERE id = ${id} AND redemption_count = 0 RETURNING code`;
    if (!rows.length) return { __status: 409, error: 'Only unused codes can be deleted. Deactivate it instead.' };
    await audit(ctx.user.id, 'ACCESS_CODE_DELETED', 'access_codes', id, { code: rows[0].code });
    return { success: true };
  },

  // ---------------------------------------------------------------- students
  async grant_access(ctx, b) {
    const userId = str(b.user_id, 100);
    const courseIds = await validCourseIds(b.course_ids || [b.course_id]);
    const [u] = await sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`;
    if (!u || !courseIds.length) return { __status: 404, error: 'Unknown student or course' };
    for (const cid of courseIds) {
      await sql`
        INSERT INTO course_access (user_id, course_id, source, granted_by, discount_percent, granted_at)
        VALUES (${userId}, ${cid}, 'ADMIN', ${ctx.user.id}, 100, NOW())
        ON CONFLICT (user_id, course_id) DO UPDATE SET revoked_at = NULL, source = 'ADMIN', granted_by = ${ctx.user.id}, granted_at = NOW()
      `;
    }
    await audit(ctx.user.id, 'COURSE_ACCESS_GRANTED', 'users', userId, { courses: courseIds });
    return { success: true };
  },

  async revoke_access(ctx, b) {
    const userId = str(b.user_id, 100);
    const courseId = str(b.course_id, 100);
    await sql`UPDATE course_access SET revoked_at = NOW() WHERE user_id = ${userId} AND course_id = ${courseId} AND revoked_at IS NULL`;
    if (b.remove_enrolment) await sql`DELETE FROM enrolments WHERE user_id = ${userId} AND course_id = ${courseId}`;
    await audit(ctx.user.id, 'COURSE_ACCESS_REVOKED', 'users', userId, { course_id: courseId, remove_enrolment: Boolean(b.remove_enrolment) });
    return { success: true };
  },

  async set_status(ctx, b) {
    const userId = str(b.user_id, 100);
    const status = str(b.status, 20).toUpperCase() === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE';
    if (userId === ctx.user.id) return { __status: 400, error: 'You cannot suspend yourself' };
    const rows = await sql`UPDATE users SET status = ${status}, updated_at = NOW() WHERE id = ${userId} RETURNING id`;
    if (!rows.length) return { __status: 404, error: 'Student not found' };
    await audit(ctx.user.id, status === 'SUSPENDED' ? 'USER_SUSPENDED' : 'USER_REACTIVATED', 'users', userId, { reason: str(b.reason, 300) || null });
    return { success: true };
  },

  async reset_lock(ctx, b) {
    const userId = str(b.user_id, 100);
    const courseId = str(b.course_id, 100);
    const quizId = str(b.quiz_id, 150);
    const rows = await sql`
      UPDATE assessment_windows SET attempts_used = 0, locked_until = NULL, updated_at = NOW()
      WHERE user_id = ${userId} AND course_id = ${courseId} AND quiz_id = ${quizId} RETURNING quiz_id
    `;
    if (!rows.length) return { __status: 404, error: 'No attempts recorded for that assessment' };
    await audit(ctx.user.id, 'ASSESSMENT_LOCK_RESET', 'users', userId, { course_id: courseId, quiz_id: quizId, reason: str(b.reason, 300) || null });
    return { success: true };
  },

  async update_student_profile(ctx, b) {
    const userId = str(b.user_id, 100);
    const [u] = await sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`;
    if (!u) return { __status: 404, error: 'Student not found' };
    const name = str(b.full_name, 80);
    if (name.length < 2) return { __status: 400, error: 'Name must be 2-80 characters' };
    const college = 'college' in b ? str(b.college, 160) || null : u.college;
    await sql`UPDATE users SET full_name = ${name}, college = ${college}, updated_at = NOW() WHERE id = ${userId}`;
    await audit(ctx.user.id, 'PROFILE_EDITED_BY_ADMIN', 'users', userId, { from: u.full_name, to: name });
    return { success: true };
  },

  // ---------------------------------------------------------------- names & certificates
  async name_request_decide(ctx, b) {
    const id = str(b.id, 64);
    const approve = Boolean(b.approve);
    const [r] = await sql`SELECT * FROM name_change_requests WHERE id = ${id} AND status = 'PENDING' LIMIT 1`;
    if (!r) return { __status: 404, error: 'Request not found or already decided' };
    const note = str(b.note, 500) || null;
    await sql`
      UPDATE name_change_requests SET status = ${approve ? 'APPROVED' : 'REJECTED'}, reviewed_by = ${ctx.user.id},
        review_note = ${note}, reviewed_at = NOW()
      WHERE id = ${id}
    `;
    const reissued = [];
    if (approve) {
      await sql`UPDATE users SET full_name = ${r.requested_name}, updated_at = NOW() WHERE id = ${r.user_id}`;
      if (b.reissue_certificates) {
        const [user] = await sql`SELECT * FROM users WHERE id = ${r.user_id} LIMIT 1`;
        const creds = await sql`SELECT * FROM credentials WHERE user_id = ${r.user_id} AND status = 'Active'`;
        for (const cred of creds) {
          const spec = await getCourseSpec(cred.course_id);
          if (!spec) continue;
          await sql`UPDATE credentials SET status = 'Revoked' WHERE id = ${cred.id}`;
          const { credential } = await issueCredential(user, spec, Number(cred.grade_percentage), `reissue:${cred.verification_id}`);
          reissued.push({ old: cred.verification_id, new: credential.verification_id });
        }
      }
    }
    await audit(ctx.user.id, approve ? 'NAME_CHANGE_APPROVED' : 'NAME_CHANGE_REJECTED', 'users', r.user_id, {
      from: r.current_name,
      to: r.requested_name,
      reissued,
    });
    return { success: true, reissued };
  },

  async revoke_credential(ctx, b) {
    const vid = str(b.verification_id, 100);
    const rows = await sql`UPDATE credentials SET status = 'Revoked' WHERE UPPER(verification_id) = UPPER(${vid}) AND status = 'Active' RETURNING id`;
    if (!rows.length) return { __status: 404, error: 'Active certificate not found' };
    await audit(ctx.user.id, 'CREDENTIAL_REVOKED', 'credentials', rows[0].id, { verification_id: vid, reason: str(b.reason, 300) || null });
    return { success: true };
  },

  async ticket_update(ctx, b) {
    const id = str(b.id, 100);
    const status = str(b.status, 20);
    if (!['Open', 'In Progress', 'Resolved', 'Closed'].includes(status)) return { __status: 400, error: 'Invalid status' };
    const rows = await sql`UPDATE support_tickets SET status = ${status}, updated_at = NOW() WHERE id = ${id} RETURNING id`;
    if (!rows.length) return { __status: 404, error: 'Ticket not found' };
    await audit(ctx.user.id, 'TICKET_STATUS_CHANGED', 'support_tickets', id, { status });
    return { success: true };
  },

  // ---------------------------------------------------------------- admins (super admin only)
  async set_role(ctx, b) {
    if (!isSuper(ctx)) return { __status: 403, error: 'Only a super admin can change roles' };
    const role = str(b.role, 20);
    if (!['student', 'admin', 'super_admin'].includes(role)) return { __status: 400, error: 'Invalid role' };
    let userId = str(b.user_id, 100);
    if (!userId && b.email) {
      const rows = await sql`SELECT id FROM users WHERE LOWER(email) = ${str(b.email, 255).toLowerCase()} LIMIT 1`;
      if (!rows.length) return { __status: 404, error: 'No account with that email. Ask them to sign in once first.' };
      userId = rows[0].id;
    }
    if (userId === ctx.user.id) return { __status: 400, error: 'You cannot change your own role' };
    const rows = await sql`UPDATE users SET role = ${role}, updated_at = NOW() WHERE id = ${userId} RETURNING email`;
    if (!rows.length) return { __status: 404, error: 'User not found' };
    await audit(ctx.user.id, 'ROLE_CHANGED', 'users', userId, { role, email: rows[0].email });
    return { success: true };
  },
};

export default async function handler(req, res) {
  if (req.query?.route === 'admin' || (req.url && req.url.includes('/api/admin'))) {
    return adminHandler(req, res);
  }
  if (cors(req, res)) return;
  try {
    const ctx = await requireAdmin(req, res);
    if (!ctx) return;

    let result;
    if (req.method === 'GET') {
      const resource = str(req.query?.resource, 40);
      const fn = Object.prototype.hasOwnProperty.call(READS, resource) ? READS[resource] : null;
      if (!fn) return json(res, { error: 'Unknown resource' }, 404);
      result = await fn(ctx, req.query || {});
      if (result?.__csv !== undefined) {
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.setHeader('Cache-Control', 'no-store');
        res.status(200);
        if (typeof res.send === 'function') return res.send(`﻿${result.__csv}`);
        return res.end(`﻿${result.__csv}`);
      }
    } else if (req.method === 'POST') {
      const body = req.body || {};
      const action = str(body.action, 40);
      const fn = Object.prototype.hasOwnProperty.call(ACTIONS, action) ? ACTIONS[action] : null;
      if (!fn) return json(res, { error: 'Unknown action' }, 400);
      result = await fn(ctx, body);
    } else {
      return json(res, { error: 'Method not allowed' }, 405);
    }

    const status = result?.__status || 200;
    if (result && '__status' in result) delete result.__status;
    res.setHeader('Cache-Control', 'no-store');
    return json(res, result, status);
  } catch (error) {
    return serverError(res, error, 'api/manage');
  }
}
