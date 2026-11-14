/**
 * Outbound mail via Resend. RESEND_API_KEY must come from the environment; there is
 * no fallback key. Mail from the public forms always goes to ADMIN_INBOX_EMAIL -
 * callers cannot choose the recipient (that made /api/send-email an open relay).
 */
export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function adminInbox() {
  return process.env.ADMIN_INBOX_EMAIL || '';
}

export function isEmail(s) {
  return typeof s === 'string' && s.length <= 254 && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(s);
}

export async function sendAdminMail({ subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const to = adminInbox();
  if (!key || !to) return { sent: false, reason: 'MAIL_NOT_CONFIGURED' };
  const from = process.env.MAIL_FROM || 'RedKross Academy <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      ...(isEmail(replyTo) ? { reply_to: replyTo } : {}),
      subject: String(subject).replace(/[\r\n]+/g, ' ').slice(0, 200),
      html,
    }),
  });
  if (!res.ok) {
    console.error('[mail] Resend error', res.status, await res.text().catch(() => ''));
    return { sent: false, reason: 'MAIL_PROVIDER_ERROR' };
  }
  const data = await res.json().catch(() => ({}));
  return { sent: true, id: data.id };
}
