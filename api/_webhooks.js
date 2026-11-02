/**
 * RedKross Academy — Asynchronous Webhook Dispatcher
 * Dispatches non-blocking event telemetry to the active n8n automation hub.
 * Ensures all email-bound notifications originate from contact@redkross.org.in
 * and are addressed to the student's exact logged-in email.
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://atharv-design.app.n8n.cloud/webhook/redkross-academy-events';

export async function dispatchWebhook(eventType, data = {}) {
  if (!N8N_WEBHOOK_URL) return;

  const recipientEmail = (
    data.email ||
    data.recipientEmail ||
    data.to ||
    data.toEmail ||
    data.studentEmail ||
    ''
  ).trim().toLowerCase();

  const studentName = data.fullName || data.studentName || data.full_name || 'Cadet Operator';
  const courseTitle = data.courseTitle || data.course_title || 'Defensive Cyber Curriculum';
  const cadetId = data.cadetId || data.cadet_id || 'RK-CADET';

  const payload = {
    event: eventType,
    from: 'contact@redkross.org.in',
    fromEmail: 'contact@redkross.org.in',
    sender: 'contact@redkross.org.in',
    to: recipientEmail,
    toEmail: recipientEmail,
    email: recipientEmail,
    recipient: recipientEmail,
    studentEmail: recipientEmail,
    studentName,
    fullName: studentName,
    cadetId,
    courseTitle,
    timestamp: new Date().toISOString(),
    data: {
      ...data,
      from: 'contact@redkross.org.in',
      fromEmail: 'contact@redkross.org.in',
      sender: 'contact@redkross.org.in',
      to: recipientEmail,
      toEmail: recipientEmail,
      email: recipientEmail,
      studentEmail: recipientEmail,
      studentName,
      fullName: studentName,
      courseTitle,
      cadetId
    }
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RedKross-Source': 'academy-production-gateway',
        'X-RedKross-Sender': 'contact@redkross.org.in',
        'X-RedKross-Recipient': recipientEmail
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);
    if (!res.ok) {
      console.warn(`[n8n Webhook] Warning: status ${res.status} for ${eventType}`);
    } else {
      console.log(`[n8n Webhook] Successfully dispatched ${eventType} to ${recipientEmail} from contact@redkross.org.in`);
    }
  } catch (err) {
    console.warn(`[n8n Webhook] Delivery notice for ${eventType}:`, err.message);
  }
}
