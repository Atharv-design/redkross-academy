import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const { user_id, user_email, category, subject, description, priority } = req.body || {};

      if (!user_email || !category || !subject || !description) {
        return json(res, { error: 'user_email, category, subject, and description are required' }, 400);
      }

      const id = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newTicket = await sql`
        INSERT INTO support_tickets (id, user_id, user_email, category, subject, description, status, priority, created_at, updated_at)
        VALUES (${id}, ${user_id || null}, ${user_email}, ${category}, ${subject}, ${description}, 'Open', ${priority || 'Medium'}, NOW(), NOW())
        RETURNING *
      `;

      // Log ticket creation in audit logs
      await sql`
        INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
        VALUES (${`log_${Date.now()}`}, ${user_id || 'anonymous'}, 'SUPPORT_TICKET_CREATED', 'support_ticket', ${id}, ${subject}, NOW())
      `;

      return json(res, { success: true, ticket: newTicket[0] });
    }

    if (req.method === 'GET') {
      const { userId, status } = req.query;

      let tickets;
      if (userId) {
        tickets = await sql`
          SELECT * FROM support_tickets 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
      } else if (status) {
        tickets = await sql`
          SELECT * FROM support_tickets 
          WHERE status = ${status} 
          ORDER BY created_at DESC
        `;
      } else {
        tickets = await sql`
          SELECT * FROM support_tickets 
          ORDER BY created_at DESC
        `;
      }

      return json(res, { tickets });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('API /support-tickets error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
