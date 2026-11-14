import { sql, json, cors, serverError } from './_db.js';
import { requireUser, optionalUser, audit } from './_auth.js';
import { escapeHtml, isEmail, sendAdminMail } from './_mail.js';
import { randomId } from './_lib/learning.js';

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

/**
 *   POST  create a ticket (signed-in users are bound to their account; guests must give an email)
 *   GET   signed-in users see their own tickets; admins may list all (?status=Open)
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    if (req.method === 'POST') {
      const ctx = await optionalUser(req);
      const b = req.body || {};
      const email = ctx ? ctx.user.email : String(b.user_email || '').trim().toLowerCase();
      const category = String(b.category || '').slice(0, 100);
      const subject = String(b.subject || '').slice(0, 200);
      const description = String(b.description || '').slice(0, 5000);
      if (!isEmail(email) || !category || !subject || !description) {
        return json(res, { error: 'email, category, subject and description are required' }, 400);
      }
      const priority = PRIORITIES.includes(b.priority) ? b.priority : 'Medium';
      const id = randomId('tkt');
      const rows = await sql`
        INSERT INTO support_tickets (id, user_id, user_email, category, subject, description, status, priority, created_at, updated_at)
        VALUES (${id}, ${ctx?.user.id || null}, ${email}, ${category}, ${subject}, ${description}, 'Open', ${priority}, NOW(), NOW())
        RETURNING id, category, subject, status, priority, created_at
      `;
      await audit(ctx?.user.id || email, 'SUPPORT_TICKET_CREATED', 'support_ticket', id, subject);
      sendAdminMail({
        subject: `[RedKross Ticket ${id}] (${priority}) ${category}: ${subject}`,
        replyTo: email,
        html: `<div style="font-family:Arial,sans-serif"><h3>${escapeHtml(subject)}</h3>
          <p><b>From:</b> ${escapeHtml(email)} ${ctx ? `(user ${escapeHtml(ctx.user.id)})` : '(guest)'}<br>
          <b>Category:</b> ${escapeHtml(category)} | <b>Priority:</b> ${escapeHtml(priority)}</p>
          <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(description)}</pre></div>`,
      }).catch((e) => console.warn('[tickets] mail:', e.message));
      return json(res, { success: true, ticket: rows[0] });
    }

    if (req.method === 'GET') {
      const ctx = await requireUser(req, res, { create: false });
      if (!ctx) return;
      let tickets;
      if (ctx.isAdmin && req.query?.scope === 'all') {
        tickets = req.query.status
          ? await sql`SELECT * FROM support_tickets WHERE status = ${String(req.query.status)} ORDER BY created_at DESC LIMIT 200`
          : await sql`SELECT * FROM support_tickets ORDER BY created_at DESC LIMIT 200`;
      } else {
        tickets = await sql`SELECT * FROM support_tickets WHERE user_id = ${ctx.user.id} ORDER BY created_at DESC LIMIT 200`;
      }
      return json(res, { tickets });
    }
    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    return serverError(res, error, 'api/support-tickets');
  }
}
