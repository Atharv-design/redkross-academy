import { json, cors, serverError } from './_db.js';
import { escapeHtml, isEmail, sendAdminMail } from './_mail.js';

/**
 * POST /api/send-email - public contact / inquiry form. Delivered ONLY to the
 * administrator inbox (ADMIN_INBOX_EMAIL); any recipient fields in the body are ignored.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);
  try {
    const b = req.body || {};
    const senderEmail = String(b.sender_email || '').trim().toLowerCase();
    const message = String(b.message || '').trim();
    if (!isEmail(senderEmail) || !message) return json(res, { error: 'A valid sender_email and a message are required' }, 400);
    if (message.length > 5000) return json(res, { error: 'Message too long (max 5000 characters)' }, 413);
    const name = String(b.sender_name || 'Website visitor').slice(0, 120);
    const category = String(b.category || 'General').slice(0, 80);
    const formType = String(b.form_type || 'INQUIRY').replace(/[^A-Z_]/gi, '').slice(0, 30) || 'INQUIRY';
    const subject = `[RedKross ${formType}] ${category} from ${name}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>${escapeHtml(subject)}</h2>
        <p><b>Name:</b> ${escapeHtml(name)}<br><b>Email:</b> ${escapeHtml(senderEmail)}<br>
        <b>Category:</b> ${escapeHtml(category)}<br><b>Received:</b> ${new Date().toUTCString()}</p>
        <pre style="white-space:pre-wrap;font-family:inherit;background:#f4f4f4;padding:12px">${escapeHtml(message)}</pre>
      </div>`;
    const result = await sendAdminMail({ subject, html, replyTo: senderEmail });
    if (!result.sent) return json(res, { success: false, error: 'Message could not be delivered right now. Please email contact@redkross.org.in.' }, 503);
    return json(res, { success: true });
  } catch (error) {
    return serverError(res, error, 'api/send-email');
  }
}
