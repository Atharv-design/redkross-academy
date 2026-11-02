import { sql, json, cors } from './_db.js';
import { dispatchWebhook } from './_webhooks.js';

function generateDeterministicCadetId(email = '', uid = '') {
  const seed = `${(email || '').toLowerCase()}::${uid || ''}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const num = (Math.abs(hash) % 90000) + 10000;
  return `RK-CADET-${num}`;
}

/**
 * Authentication & Session Synchronization Endpoint (Phase 2 & Phase 5)
 * Securely synchronizes Firebase authenticated identity with Neon PostgreSQL.
 * Defaults new accounts to role: 'student' (Strict Phase 4.2 compliance: No auto-elevation).
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  try {
    const { uid, email, full_name, avatar, cadet_id } = req.body || {};

    if (!uid || !email) {
      return json(res, { error: 'Missing required authentication identity fields' }, 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const studentName = full_name || normalizedEmail.split('@')[0] || 'Cadet Operator';
    let assignedCadetId = cadet_id || generateDeterministicCadetId(normalizedEmail, uid);

    // Query user in Neon DB by ID OR by normalized email
    const existing = await sql`
      SELECT id, email, full_name, avatar, headline, role, cadet_id, status, streak_days, token_balance, created_at
      FROM users 
      WHERE id = ${uid} OR LOWER(email) = ${normalizedEmail}
      LIMIT 1
    `;

    let user;

    if (existing && existing.length > 0) {
      user = existing[0];
      const targetCadetId = user.cadet_id || assignedCadetId;

      await sql`
        UPDATE users 
        SET full_name = COALESCE(${studentName}, full_name),
            avatar = COALESCE(${avatar}, avatar),
            status = 'ACTIVE',
            cadet_id = COALESCE(cadet_id, ${targetCadetId}),
            updated_at = NOW()
        WHERE id = ${user.id}
      `;

      user.full_name = studentName || user.full_name;
      user.avatar = avatar || user.avatar;
      user.status = 'ACTIVE';
      user.cadet_id = targetCadetId;
    } else {
      // Check for collision on cadet_id
      const checkCadet = await sql`SELECT id FROM users WHERE cadet_id = ${assignedCadetId} LIMIT 1`;
      if (checkCadet.length > 0) {
        assignedCadetId = `RK-CADET-${Math.floor(10000 + Math.random() * 90000)}`;
      }

      const newId = uid.startsWith('usr_') ? uid : `usr_${uid.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 30)}`;

      const inserted = await sql`
        INSERT INTO users (
          id, email, full_name, avatar, headline, role, cadet_id, status, streak_days, token_balance, created_at, updated_at
        )
        VALUES (
          ${newId},
          ${normalizedEmail},
          ${studentName},
          ${avatar || null},
          'Cadet Defensive Operator',
          'student',
          ${assignedCadetId},
          'ACTIVE',
          1,
          150,
          NOW(),
          NOW()
        )
        RETURNING id, email, full_name, avatar, headline, role, cadet_id, status, streak_days, token_balance, created_at
      `;
      user = inserted[0];

      // Give new student initial welcome tokens in ledger
      try {
        const rewardId = `rw_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await sql`
          INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
          VALUES (
            ${rewardId},
            ${user.id},
            150,
            'welcome_grant',
            'Initial Cadet registration and enrolment bounty',
            ${'welcome_' + user.id},
            NOW()
          )
          ON CONFLICT (idempotency_key) DO NOTHING
        `;
      } catch (rwErr) {
        console.warn('Welcome grant note:', rwErr.message);
      }

      // Asynchronously trigger registration webhook to n8n from contact@redkross.org.in
      await dispatchWebhook('user.registered', {
        userId: user.id,
        email: user.email,
        studentEmail: user.email,
        fullName: user.full_name,
        cadetId: user.cadet_id,
        from: 'contact@redkross.org.in',
        to: user.email,
        tokenBalance: 150
      });
    }

    // Fetch live token balance
    let balance = 150;
    try {
      const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 150) as balance 
        FROM reward_ledger 
        WHERE user_id = ${user.id}
      `;
      if (balanceResult.length > 0 && balanceResult[0].balance !== null) {
        balance = parseInt(balanceResult[0].balance, 10);
      }
    } catch {}

    return json(res, {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar: user.avatar,
        headline: user.headline,
        role: user.role,
        cadet_id: user.cadet_id,
        status: user.status || 'ACTIVE',
        streak_days: user.streak_days || 1,
        created_at: user.created_at,
        token_balance: balance
      }
    });
  } catch (error) {
    console.error('API /auth error:', error);
    return json(res, { error: error.message || 'Authentication error' }, 500);
  }
}
