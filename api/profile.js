import { sql, json, cors, serverError } from './_db.js';
import { requireUser, audit } from './_auth.js';
import { publicCredential, randomId } from './_lib/learning.js';
import { courseCatalog, grantedCourseIds } from './_lib/access.js';

/**
 * /api/profile - the signed-in student's own profile.
 *   GET                                   profile, batches, certificates, pending name request
 *   PUT    { ...fields }                  update editable fields
 *   POST   { action: 'avatar', data_url } upload a photo (browser-resized; <= 300 KB)
 *   POST   { action: 'avatar', remove: true }
 *   POST   { action: 'name_request', requested_name, reason }
 *   DELETE { action: 'name_request' }     withdraw the pending request
 *
 * The name is printed on certificates. It can be edited freely until the first
 * certificate is issued; after that a change is a request an admin approves.
 */

const TEXT_FIELDS = {
  headline: 140,
  college: 160,
  degree: 120,
  city: 80,
  bio: 600,
};
const URL_FIELDS = {
  linkedin_url: /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9\-_%.]{2,100}\/?$/,
  github_url: /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9-]{1,39}\/?$/,
  portfolio_url: /^https:\/\/[^\s<>"']{4,290}$/,
};
const URL_HINT = {
  linkedin_url: 'LinkedIn URL must look like https://www.linkedin.com/in/your-name',
  github_url: 'GitHub URL must look like https://github.com/username',
  portfolio_url: 'Website must be a full https:// address',
};

export const MAX_AVATAR_BYTES = 300 * 1024;
const AVATAR_RE = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/;

export function cleanName(v) {
  const s = String(v ?? '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim();
  if (s.length < 2 || s.length > 80) return null;
  return s;
}

function cleanText(v, max) {
  if (v === null || v === undefined) return null;
  const s = String(v).replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim();
  return s ? s.slice(0, max) : null;
}

function normaliseUrl(field, v) {
  if (v === null || v === undefined || String(v).trim() === '') return { value: null };
  let s = String(v).trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  s = s.replace(/^http:\/\//i, 'https://');
  if (field === 'linkedin_url') s = s.replace(/\?.*$/, '');
  if (!URL_FIELDS[field].test(s)) return { error: URL_HINT[field] };
  return { value: s };
}

async function hasCertificate(userId) {
  const rows = await sql`SELECT 1 FROM credentials WHERE user_id = ${userId} LIMIT 1`;
  return rows.length > 0;
}

export function profileView(u) {
  return {
    id: u.id,
    email: u.email,
    full_name: u.full_name,
    avatar: u.avatar,
    headline: u.headline,
    college: u.college,
    degree: u.degree,
    graduation_year: u.graduation_year,
    city: u.city,
    bio: u.bio,
    linkedin_url: u.linkedin_url,
    github_url: u.github_url,
    portfolio_url: u.portfolio_url,
    cadet_id: u.cadet_id,
    role: u.role,
    status: u.status || 'ACTIVE',
    created_at: u.created_at,
  };
}

async function loadProfile(userId) {
  const [user] = await sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`;
  const cohorts = await sql`
    SELECT c.id, c.name, c.organisation, m.joined_at
    FROM cohort_members m JOIN cohorts c ON c.id = m.cohort_id
    WHERE m.user_id = ${userId} AND m.removed_at IS NULL AND c.status = 'ACTIVE'
    ORDER BY m.joined_at
  `;
  const creds = await sql`
    SELECT * FROM credentials WHERE user_id = ${userId} AND status = 'Active' ORDER BY issue_date DESC
  `;
  const pending = await sql`
    SELECT id, requested_name, reason, created_at FROM name_change_requests
    WHERE user_id = ${userId} AND status = 'PENDING' LIMIT 1
  `;
  const lastDecision = await sql`
    SELECT requested_name, status, review_note, reviewed_at FROM name_change_requests
    WHERE user_id = ${userId} AND status <> 'PENDING' ORDER BY reviewed_at DESC NULLS LAST LIMIT 1
  `;
  const catalog = await courseCatalog();
  const granted = await grantedCourseIds(userId);
  return {
    profile: profileView(user),
    name_locked: creds.length > 0 || (await hasCertificate(userId)),
    cohorts,
    unlocked_courses: granted.map((id) => ({ id, title: catalog.find((c) => c.id === id)?.title || id })),
    certificates: creds.map(publicCredential),
    pending_name_request: pending[0] || null,
    last_name_decision: lastDecision[0] || null,
  };
}

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const userId = ctx.user.id;
    const body = req.body || {};

    if (req.method === 'GET') return json(res, await loadProfile(userId));

    if (req.method === 'PUT') {
      const updates = {};
      const errors = {};
      for (const [field, max] of Object.entries(TEXT_FIELDS)) {
        if (field in body) updates[field] = cleanText(body[field], max);
      }
      for (const field of Object.keys(URL_FIELDS)) {
        if (field in body) {
          const r = normaliseUrl(field, body[field]);
          if (r.error) errors[field] = r.error;
          else updates[field] = r.value;
        }
      }
      if ('graduation_year' in body) {
        const y = body.graduation_year === '' || body.graduation_year === null ? null : Number(body.graduation_year);
        if (y !== null && !(Number.isInteger(y) && y >= 1960 && y <= new Date().getFullYear() + 8)) {
          errors.graduation_year = 'Enter a valid year';
        } else updates.graduation_year = y;
      }
      if ('full_name' in body && body.full_name !== ctx.user.full_name) {
        const name = cleanName(body.full_name);
        if (!name) errors.full_name = 'Name must be 2-80 characters';
        else if (await hasCertificate(userId)) {
          errors.full_name = 'Your name appears on a certificate. Submit a name-change request instead.';
        } else updates.full_name = name;
      }
      if (Object.keys(errors).length) return json(res, { error: 'Please fix the highlighted fields', fields: errors }, 400);
      if (!Object.keys(updates).length) return json(res, await loadProfile(userId));

      const u = { ...ctx.user, ...updates };
      await sql`
        UPDATE users SET
          full_name = ${u.full_name}, headline = ${u.headline ?? null}, college = ${u.college ?? null},
          degree = ${u.degree ?? null}, graduation_year = ${u.graduation_year ?? null}, city = ${u.city ?? null},
          bio = ${u.bio ?? null}, linkedin_url = ${u.linkedin_url ?? null}, github_url = ${u.github_url ?? null},
          portfolio_url = ${u.portfolio_url ?? null}, updated_at = NOW()
        WHERE id = ${userId}
      `;
      await audit(userId, 'PROFILE_UPDATED', 'users', userId, { fields: Object.keys(updates) });
      return json(res, await loadProfile(userId));
    }

    if (req.method === 'POST' && body.action === 'avatar') {
      if (body.remove) {
        await sql`UPDATE users SET avatar_data = NULL, avatar = NULL, updated_at = NOW() WHERE id = ${userId}`;
        return json(res, await loadProfile(userId));
      }
      const m = AVATAR_RE.exec(String(body.data_url || ''));
      if (!m) return json(res, { error: 'Upload a JPEG, PNG or WebP image' }, 400);
      const bytes = Buffer.from(m[2], 'base64');
      if (bytes.length > MAX_AVATAR_BYTES) return json(res, { error: 'Image is too large (max 300 KB after resizing)' }, 413);
      const magicOk =
        (m[1] === 'jpeg' && bytes[0] === 0xff && bytes[1] === 0xd8) ||
        (m[1] === 'png' && bytes.slice(0, 4).toString('hex') === '89504e47') ||
        (m[1] === 'webp' && bytes.slice(8, 12).toString('ascii') === 'WEBP');
      if (!magicOk) return json(res, { error: 'The file is not a valid image' }, 400);
      const url = `/api/avatar?u=${encodeURIComponent(userId)}&v=${Date.now().toString(36)}`;
      await sql`UPDATE users SET avatar_data = ${body.data_url}, avatar = ${url}, updated_at = NOW() WHERE id = ${userId}`;
      return json(res, await loadProfile(userId));
    }

    if (req.method === 'POST' && body.action === 'name_request') {
      const name = cleanName(body.requested_name);
      if (!name) return json(res, { error: 'Name must be 2-80 characters' }, 400);
      if (name === ctx.user.full_name) return json(res, { error: 'That is already your name' }, 400);
      if (!(await hasCertificate(userId))) {
        return json(res, { error: 'You can edit your name directly until a certificate is issued.' }, 400);
      }
      const rows = await sql`
        INSERT INTO name_change_requests (id, user_id, current_name, requested_name, reason, status, created_at)
        VALUES (${randomId('ncr')}, ${userId}, ${ctx.user.full_name}, ${name}, ${cleanText(body.reason, 500)}, 'PENDING', NOW())
        ON CONFLICT DO NOTHING
        RETURNING id
      `;
      if (!rows.length) return json(res, { error: 'You already have a pending request' }, 409);
      await audit(userId, 'NAME_CHANGE_REQUESTED', 'users', userId, { requested_name: name });
      return json(res, await loadProfile(userId));
    }

    if (req.method === 'DELETE' && body.action === 'name_request') {
      await sql`DELETE FROM name_change_requests WHERE user_id = ${userId} AND status = 'PENDING'`;
      return json(res, await loadProfile(userId));
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    return serverError(res, error, 'api/profile');
  }
}
