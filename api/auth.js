import { sql, json, cors, serverError } from './_db.js';
import { verifyRequest, resolveUser, isAdminUser, audit } from './_auth.js';
import { dispatchWebhook } from './_webhooks.js';

/**
 * POST /api/auth - session sync.
 * Identity (uid, email) comes ONLY from the verified Firebase ID token. The body may
 * carry display fields (full_name, avatar) and nothing else is honoured.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);

  try {
    const identity = await verifyRequest(req);
    if (!identity) return json(res, { error: 'Authentication required' }, 401);

    const banned = await sql`SELECT 1 FROM system_settings WHERE key = ${`banned_email_${identity.email}`} LIMIT 1`;
    if (banned.length) return json(res, { error: 'This account has been closed.' }, 403);

    const body = req.body || {};
    const profile = {
      full_name: typeof body.full_name === 'string' ? body.full_name.slice(0, 120) : undefined,
      avatar: typeof body.avatar === 'string' && /^https:\/\//.test(body.avatar) ? body.avatar.slice(0, 500) : undefined,
    };

    let user;
    try {
      user = await resolveUser(identity, { create: true, profile });
    } catch (err) {
      if (err.status) return json(res, { error: err.message }, err.status);
      throw err;
    }

    if (user.__created) {
      await sql`
        INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
        VALUES (${`rw_welcome_${user.id}`}, ${user.id}, 150, 'welcome_grant', 'Welcome grant on registration', ${`welcome_${user.id}`}, NOW())
        ON CONFLICT (idempotency_key) DO NOTHING
      `.catch((e) => console.warn('[auth] welcome grant:', e.message));
      await audit(user.id, 'USER_REGISTERED', 'users', user.id, identity.email);
      dispatchWebhook('user.registered', {
        userId: user.id,
        email: user.email,
        fullName: user.full_name,
        cadetId: user.cadet_id,
        tokenBalance: 150,
      });
    } else {
      // The profile page owns name and photo after sign-up: a sign-in only fills gaps
      // (it must never overwrite a name the student edited, or one an admin approved).
      const rows = await sql`
        UPDATE users
        SET full_name = CASE WHEN COALESCE(TRIM(full_name), '') = '' THEN COALESCE(${profile.full_name || null}, full_name) ELSE full_name END,
            avatar = COALESCE(avatar, ${profile.avatar || null}),
            last_seen_at = NOW()
        WHERE id = ${user.id}
        RETURNING full_name, avatar
      `;
      if (rows[0]) {
        user.full_name = rows[0].full_name;
        user.avatar = rows[0].avatar;
      }
    }

    const balanceRows = await sql`SELECT COALESCE(SUM(amount), 0) AS balance FROM reward_ledger WHERE user_id = ${user.id}`;
    const balance = parseInt(balanceRows[0]?.balance ?? 0, 10) || 0;

    return json(res, {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar: user.avatar,
        headline: user.headline,
        role: isAdminUser(user, identity) ? (user.role === 'student' ? 'admin' : user.role) : 'student',
        cadet_id: user.cadet_id,
        status: user.status || 'ACTIVE',
        streak_days: user.streak_days || 1,
        created_at: user.created_at,
        token_balance: balance,
      },
    });
  } catch (error) {
    return serverError(res, error, 'api/auth');
  }
}
