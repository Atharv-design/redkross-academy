import { sql, json, cors } from './_db.js';

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
    const { uid, email, full_name, avatar } = req.body || {};

    if (!uid || !email) {
      return json(res, { error: 'Missing required authentication identity fields' }, 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user in Neon DB
    const existing = await sql`
      SELECT id, email, full_name, avatar, headline, role, streak_days, created_at
      FROM users 
      WHERE id = ${uid} OR LOWER(email) = ${normalizedEmail}
      LIMIT 1
    `;

    let user;

    if (existing && existing.length > 0) {
      user = existing[0];
      // Update avatar or name if updated, but NEVER elevate role here
      await sql`
        UPDATE users 
        SET full_name = COALESCE(${full_name}, full_name),
            avatar = COALESCE(${avatar}, avatar)
        WHERE id = ${user.id}
      `;
    } else {
      // Create new user with strict student role
      const newId = uid.startsWith('usr_') ? uid : `usr_${uid.substring(0, 20)}`;
      const inserted = await sql`
        INSERT INTO users (id, email, full_name, avatar, headline, role, streak_days, created_at)
        VALUES (
          ${newId},
          ${normalizedEmail},
          ${full_name || 'Cadet Operator'},
          ${avatar || null},
          'Cadet Defensive Operator',
          'student',
          1,
          NOW()
        )
        RETURNING id, email, full_name, avatar, headline, role, streak_days, created_at
      `;
      user = inserted[0];

      // Give new student initial welcome tokens (PRD Section 8)
      await sql`
        INSERT INTO reward_ledger (id, user_id, amount, source_type, description)
        VALUES (${'rw_' + Date.now()}, ${user.id}, 100, 'WELCOME_GRANT', 'Enrolment readiness grant')
      `;
    }

    // Fetch token balance
    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance 
      FROM reward_ledger 
      WHERE user_id = ${user.id}
    `;

    return json(res, {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar: user.avatar,
        headline: user.headline,
        role: user.role, // 'student' or 'super_admin' (if manually provisioned)
        streak_days: user.streak_days || 1,
        created_at: user.created_at,
        token_balance: parseInt(balanceResult[0].balance || 0, 10)
      }
    });
  } catch (error) {
    console.error('API /auth error:', error);
    return json(res, { error: error.message || 'Authentication error' }, 500);
  }
}
