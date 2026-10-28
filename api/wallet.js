import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const { userId } = req.query;

    if (!userId) {
      return json(res, { error: 'userId parameter required' }, 400);
    }

    const ledger = await sql`
      SELECT * FROM reward_ledger 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    const totalBalance = ledger.reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0);

    return json(res, {
      balance: Math.max(0, totalBalance),
      total_earned: ledger.filter((l) => l.amount > 0).reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0),
      total_spent: Math.abs(ledger.filter((l) => l.amount < 0).reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0)),
      transactions: ledger
    });
  } catch (error) {
    console.error('API /wallet error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
