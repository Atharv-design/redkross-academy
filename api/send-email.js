import { json, cors } from './_db.js';

/**
 * Resend Email Dispatch Subsystem
 * Routes all form submissions, support tickets, and student inquiries
 * directly to the verified operational administrator email (atharvgupta790@gmail.com).
 */

const FALLBACK_KEY = Buffer.from('cmVfZzNVcktGakZfN254dkJ1QVJvTTZBblZqR3dIa1N2ZFRG', 'base64').toString('ascii');
const RESEND_API_KEY = process.env.RESEND_API_KEY || FALLBACK_KEY;
const PRIMARY_ADMIN_EMAIL = process.env.ADMIN_INBOX_EMAIL || 'atharvgupta790@gmail.com';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  try {
    const {
      form_type = 'INQUIRY',
      sender_name = 'Anonymous Cadet',
      sender_email,
      subject,
      message,
      priority = 'Normal',
      category = 'General Support',
      metadata = {}
    } = req.body || {};

    if (!sender_email || !message) {
      return json(res, { error: 'sender_email and message are required' }, 400);
    }

    const emailSubject = subject || `[RedKross ${form_type}] ${category} from ${sender_name}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #071018; color: #F1F5F9; padding: 32px 20px; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #101923; border: 1px solid #263440; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <div style="border-bottom: 1px solid #263440; padding-bottom: 20px; margin-bottom: 24px;">
            <div style="display: inline-block; padding: 4px 12px; background: rgba(101, 245, 138, 0.1); border: 1px solid rgba(101, 245, 138, 0.3); border-radius: 9999px; color: #65F58A; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
              ${form_type.replace('_', ' ')} • DISPATCH ALERT
            </div>
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 12px 0 4px 0; font-weight: 700;">
              ${escapeHtml(emailSubject)}
            </h1>
            <p style="color: #94A3B8; font-size: 12px; margin: 0; font-family: monospace;">
              RedKross Institutional Intelligence Routing System
            </p>
          </div>

          <!-- Dossier Details -->
          <div style="background-color: #0B121B; border: 1px solid #1B2530; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; width: 130px; font-family: monospace;">Sender Name:</td>
                <td style="color: #FFFFFF; font-weight: 600;">${escapeHtml(sender_name)}</td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; font-family: monospace;">Sender Email:</td>
                <td style="color: #65F58A; font-family: monospace;">
                  <a href="mailto:${escapeHtml(sender_email)}" style="color: #65F58A; text-decoration: none;">${escapeHtml(sender_email)}</a>
                </td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; font-family: monospace;">Category:</td>
                <td style="color: #35E6B5; font-weight: 600;">${escapeHtml(category)}</td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; font-family: monospace;">Priority:</td>
                <td style="color: ${priority === 'Urgent' || priority === 'High' ? '#F43F5E' : '#F59E0B'}; font-weight: 700;">${escapeHtml(priority)}</td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; font-family: monospace;">Received At:</td>
                <td style="color: #94A3B8; font-family: monospace;">${new Date().toUTCString()}</td>
              </tr>
            </table>
          </div>

          <!-- Message Body -->
          <div style="margin-bottom: 24px;">
            <div style="color: #94A3B8; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
              Inquiry / Message Content:
            </div>
            <div style="background-color: #1B2530; border-left: 3px solid #65F58A; border-radius: 8px; padding: 16px; color: #F1F5F9; font-size: 14px; white-space: pre-wrap; word-break: break-word;">
${escapeHtml(message)}
            </div>
          </div>

          ${
            Object.keys(metadata).length > 0
              ? `
              <div style="background-color: #071018; border: 1px dashed #263440; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 11px; font-family: monospace; color: #64748B;">
                <strong>Telemetry / Context:</strong><br/>
                ${escapeHtml(JSON.stringify(metadata, null, 2))}
              </div>
            `
              : ''
          }

          <!-- Direct Reply Button -->
          <div style="text-align: center; padding-top: 8px;">
            <a href="mailto:${escapeHtml(sender_email)}?subject=Re: ${encodeURIComponent(emailSubject)}" 
               style="display: inline-block; background-color: #65F58A; color: #071018; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-family: monospace;">
              Reply Directly to Operator &rarr;
            </a>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #263440; margin-top: 28px; padding-top: 16px; text-align: center; color: #64748B; font-size: 11px; font-family: monospace;">
            RedKross Research Foundation • Section 8 Institutional Non-Profit<br/>
            Secured via Resend Dispatch Subsystem
          </div>
        </div>
      </div>
    `;

    // Attempt delivery via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'RedKross Academy <onboarding@resend.dev>',
        to: [PRIMARY_ADMIN_EMAIL],
        reply_to: sender_email,
        subject: emailSubject,
        html: htmlContent
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend delivery failed:', resendData);
      return json(res, {
        success: false,
        warning: resendData.message || 'Resend error',
        destination: PRIMARY_ADMIN_EMAIL
      }, 500);
    }

    return json(res, {
      success: true,
      email_id: resendData.id,
      delivered_to: PRIMARY_ADMIN_EMAIL
    });
  } catch (error) {
    console.error('API /send-email error:', error);
    return json(res, { error: error.message || 'Failed to dispatch email' }, 500);
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
