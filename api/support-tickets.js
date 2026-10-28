import { sql, json, cors } from './_db.js';

const FALLBACK_KEY = Buffer.from('cmVfZzNVcktGakZfN254dkJ1QVJvTTZBblZqR3dIa1N2ZFRG', 'base64').toString('ascii');
const RESEND_API_KEY = process.env.RESEND_API_KEY || FALLBACK_KEY;
const PRIMARY_ADMIN_EMAIL = process.env.ADMIN_INBOX_EMAIL || 'atharvgupta790@gmail.com';

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
        VALUES (${`log_${Date.now()}`}, ${user_id || user_email || 'anonymous'}, 'SUPPORT_TICKET_CREATED', 'support_ticket', ${id}, ${subject}, NOW())
      `;

      // Immediate Resend Email Dispatch to Administrator
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'RedKross Academy Support <onboarding@resend.dev>',
            to: [PRIMARY_ADMIN_EMAIL],
            reply_to: user_email,
            subject: `[RedKross Ticket ${id}] (${priority || 'Medium'}) ${category}: ${subject}`,
            html: `
              <div style="font-family: sans-serif; background: #071018; color: #F1F5F9; padding: 24px;">
                <div style="max-width: 600px; margin: 0 auto; background: #101923; border: 1px solid #263440; border-radius: 14px; padding: 24px;">
                  <div style="color: #65F58A; font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                    NEW ACADEMY SUPPORT TICKET • ${id}
                  </div>
                  <h2 style="color: #FFFFFF; margin: 10px 0 6px 0;">${subject}</h2>
                  <p style="color: #94A3B8; font-size: 12px; margin: 0 0 16px 0;">Category: <strong>${category}</strong> | Priority: <strong>${priority || 'Medium'}</strong></p>
                  
                  <div style="background: #0B121B; border: 1px solid #1B2530; border-radius: 8px; padding: 12px; font-size: 12px; font-family: monospace; margin-bottom: 16px;">
                    <div>From: ${user_email}</div>
                    <div>User ID: ${user_id || 'Unauthenticated Cadet'}</div>
                    <div>Timestamp: ${new Date().toISOString()}</div>
                  </div>

                  <div style="background: #1B2530; border-left: 3px solid #65F58A; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.5; color: #FFFFFF; margin-bottom: 20px;">
                    ${description.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </div>

                  <a href="mailto:${user_email}?subject=Re: [RedKross Ticket ${id}] ${encodeURIComponent(subject)}" 
                     style="display: inline-block; background: #65F58A; color: #071018; font-weight: bold; font-family: monospace; font-size: 12px; padding: 10px 20px; border-radius: 9999px; text-decoration: none;">
                    Reply to Operator &rarr;
                  </a>
                </div>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.warn('Resend async dispatch error:', emailErr);
      }

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
