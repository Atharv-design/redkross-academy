/**
 * RedKross Academy - server-side identity.
 *
 * Every protected endpoint derives the caller's identity from a Firebase ID
 * token (Authorization: Bearer <JWT>) verified here. Request bodies and query
 * strings are never trusted for identity (user_id, email, role).
 *
 * Environment:
 *   FIREBASE_PROJECT_ID            project whose tokens are accepted (falls back to
 *                                  VITE_FIREBASE_PROJECT_ID, then 'academy-redkross')
 *   FIREBASE_SERVICE_ACCOUNT_JSON  optional; enables revoked-token checks
 *   ADMIN_EMAILS                   optional comma-separated bootstrap admin list
 *                                  (Google-verified emails only)
 */
import crypto from 'crypto';
import { sql, json } from './_db.js';

let injectedVerifier = null;
let firebaseVerify = null;

/** Test hook: replace token verification with a stub. Never used in production code paths. */
export function setTokenVerifier(fn) {
  injectedVerifier = fn;
}

async function getFirebaseVerifier() {
  if (firebaseVerify) return firebaseVerify;
  const { initializeApp, getApps, cert } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');
  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'academy-redkross';
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!getApps().length) {
    initializeApp(saJson ? { credential: cert(JSON.parse(saJson)), projectId } : { projectId });
  }
  const checkRevoked = Boolean(saJson);
  firebaseVerify = (token) => getAuth().verifyIdToken(token, checkRevoked);
  return firebaseVerify;
}

function bearerToken(req) {
  const header = req.headers?.authorization || req.headers?.Authorization || '';
  if (typeof header !== 'string' || !header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  // Firebase ID tokens are JWTs (three base64url segments). Anything else is rejected
  // outright, which also kills the old "Bearer <user id>" scheme.
  if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(token) && !injectedVerifier) return null;
  return token;
}

/** Verifies the bearer token. Returns { uid, email, emailVerified, name, picture } or null. */
export async function verifyRequest(req) {
  const token = bearerToken(req);
  if (!token) return null;
  try {
    const verify = injectedVerifier || (await getFirebaseVerifier());
    const decoded = await verify(token);
    if (!decoded?.uid) return null;
    return {
      uid: decoded.uid,
      email: (decoded.email || '').trim().toLowerCase(),
      emailVerified: Boolean(decoded.email_verified),
      name: decoded.name || null,
      picture: decoded.picture || null,
    };
  } catch (err) {
    console.warn('[auth] token rejected:', err?.code || err?.message);
    return null;
  }
}

/** Stable database id for a Firebase uid (matches the id scheme already in production). */
export function userIdForUid(uid) {
  return uid.startsWith('usr_') ? uid : `usr_${uid.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 30)}`;
}

function adminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function generateCadetId(email = '', uid = '') {
  const seed = `${(email || '').toLowerCase()}::${uid || ''}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `RK-CADET-${(Math.abs(hash) % 90000) + 10000}`;
}

async function isBanned(email) {
  if (!email) return false;
  try {
    const rows = await sql`SELECT 1 FROM system_settings WHERE key = ${`banned_email_${email}`} LIMIT 1`;
    return rows.length > 0;
  } catch {
    return false;
  }
}

/**
 * Finds (or, with create=true, creates) the users row for a verified identity.
 * Linking an existing row by email is only allowed when the provider has verified
 * the email, so nobody can claim another person's account by registering an
 * unverified email/password login with their address.
 */
export async function resolveUser(identity, { create = false, profile = {} } = {}) {
  const id = userIdForUid(identity.uid);
  let rows = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  if (rows.length) return rows[0];

  if (identity.email) {
    const byEmail = await sql`SELECT * FROM users WHERE LOWER(email) = ${identity.email} LIMIT 1`;
    if (byEmail.length) {
      if (identity.emailVerified) return byEmail[0];
      const err = new Error('EMAIL_NOT_VERIFIED');
      err.status = 409;
      throw err;
    }
  }

  if (!create) return null;
  if (!identity.email) {
    const err = new Error('EMAIL_REQUIRED');
    err.status = 400;
    throw err;
  }

  const fullName = String(profile.full_name || identity.name || identity.email.split('@')[0] || 'Cadet')
    .trim()
    .slice(0, 120);
  const avatar = profile.avatar || identity.picture || null;
  // The email-derived cadet id has only 90,000 values, so clashes are common (and two
  // sign-ups can race). Insert, and on a cadet_id clash retry with a random 7-digit id.
  for (let attempt = 0; attempt < 6; attempt++) {
    const cadetId =
      attempt === 0 ? generateCadetId(identity.email, identity.uid) : `RK-CADET-${crypto.randomInt(1000000, 10000000)}`;
    try {
      rows = await sql`
        INSERT INTO users (id, email, full_name, avatar, headline, role, cadet_id, status, streak_days, token_balance, created_at, updated_at)
        VALUES (${id}, ${identity.email}, ${fullName}, ${avatar}, NULL, 'student', ${cadetId}, 'ACTIVE', 1, 0, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
        RETURNING *, (xmax = 0) AS __inserted
      `;
      const user = rows[0];
      // Only the request that actually created the row runs the sign-up side effects.
      user.__created = Boolean(user.__inserted);
      delete user.__inserted;
      return user;
    } catch (err) {
      if (err?.code === '23505' && /cadet_id/.test(err.constraint || err.message || '')) continue;
      throw err;
    }
  }
  throw new Error('Could not allocate a cadet id');
}

export function isAdminUser(user, identity) {
  if (!user) return false;
  if (user.role === 'super_admin' || user.role === 'admin') return true;
  return Boolean(identity?.emailVerified && identity.email && adminEmails().includes(identity.email));
}

/**
 * Authenticates the request. On failure it sends the response and returns null,
 * so handlers can do: const ctx = await requireUser(req, res); if (!ctx) return;
 */
export async function requireUser(req, res, { create = true } = {}) {
  const identity = await verifyRequest(req);
  if (!identity) {
    json(res, { error: 'Authentication required' }, 401);
    return null;
  }
  try {
    if (await isBanned(identity.email)) {
      json(res, { error: 'This account has been closed.' }, 403);
      return null;
    }
    const user = await resolveUser(identity, { create });
    if (!user) {
      json(res, { error: 'Account not found' }, 404);
      return null;
    }
    if (String(user.status || '').toUpperCase() === 'SUSPENDED') {
      json(res, { error: 'Account suspended', status: 'SUSPENDED' }, 403);
      return null;
    }
    return { identity, user, isAdmin: isAdminUser(user, identity) };
  } catch (err) {
    if (err.status) {
      json(res, { error: err.message }, err.status);
      return null;
    }
    throw err;
  }
}

export async function requireAdmin(req, res) {
  const ctx = await requireUser(req, res, { create: false });
  if (!ctx) return null;
  if (!ctx.isAdmin) {
    json(res, { error: 'Forbidden: administrator role required' }, 403);
    return null;
  }
  return ctx;
}

/** Optional auth: returns the context when a valid token is present, otherwise null (no response sent). */
export async function optionalUser(req) {
  const identity = await verifyRequest(req);
  if (!identity) return null;
  try {
    const user = await resolveUser(identity, { create: false });
    if (!user) return null;
    return { identity, user, isAdmin: isAdminUser(user, identity) };
  } catch {
    return null;
  }
}

export async function audit(actorId, action, entityType, entityId, details) {
  try {
    await sql`
      INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
      VALUES (${`aud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`}, ${actorId}, ${action},
              ${entityType}, ${entityId}, ${typeof details === 'string' ? details : JSON.stringify(details)}, NOW())
    `;
  } catch (err) {
    console.warn('[audit] write failed:', err.message);
  }
}
