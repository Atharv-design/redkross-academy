import { sql, json, cors, serverError } from './_db.js';
import { requireUser } from './_auth.js';

/** GET /api/wallet - the caller's token ledger (admins may pass ?userId= to inspect another account). */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'GET') return json(res, { error: 'Method not allowed' }, 405);
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;
    const target = ctx.isAdmin && req.query?.userId ? String(req.query.userId) : ctx.user.id;
    const ledger = await sql`
      SELECT id, amount, COALESCE(transaction_type, 'reward') AS transaction_type, description, created_at
      FROM reward_ledger WHERE user_id = ${target} ORDER BY created_at DESC LIMIT 500
    `;
    const amounts = ledger.map((l) => parseInt(l.amount, 10) || 0);
    return json(res, {
      balance: Math.max(0, amounts.reduce((a, b) => a + b, 0)),
      total_earned: amounts.filter((a) => a > 0).reduce((a, b) => a + b, 0),
      total_spent: Math.abs(amounts.filter((a) => a < 0).reduce((a, b) => a + b, 0)),
      transactions: ledger,
    });
  } catch (error) {
    return serverError(res, error, 'api/wallet');
  }
}
