/**
 * RedKross Academy — Asynchronous Webhook Dispatcher
 * Dispatches non-blocking event telemetry to the active n8n automation hub.
 * Zero-touch resilience: Failures in network or n8n will NEVER affect user flow.
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://atharv-design.app.n8n.cloud/webhook/redkross-academy-events';

export async function dispatchWebhook(eventType, data) {
  if (!N8N_WEBHOOK_URL) return;

  const payload = {
    event: eventType,
    timestamp: new Date().toISOString(),
    data: data || {}
  };

  try {
    // Fire-and-forget: timeout after 4 seconds to never block serverless lambda execution
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RedKross-Source': 'academy-production-gateway',
        'X-RedKross-Sender': 'contact@redkross.org.in'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeout);
        if (!res.ok) {
          console.warn(`[n8n Webhook] Warning: status ${res.status} for event ${eventType}`);
        }
      })
      .catch((err) => {
        clearTimeout(timeout);
        console.warn(`[n8n Webhook] Non-critical delivery failure for ${eventType}:`, err.message);
      });
  } catch (err) {
    console.warn(`[n8n Webhook] Dispatch guard caught error for ${eventType}:`, err.message);
  }
}
