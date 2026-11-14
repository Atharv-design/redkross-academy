import { sql } from './_db.js';

/**
 * GET /api/avatar?u=<user id> - serves an uploaded profile photo.
 * Photos are public (they appear next to names in the classroom), are only ever
 * stored after server-side type/size checks, and are served with a fixed image
 * content type plus nosniff so they can never be interpreted as HTML or script.
 */
const DATA_URL_RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).end();
      return;
    }
    const userId = String(req.query?.u || '');
    if (!/^usr_[A-Za-z0-9_]{1,40}$/.test(userId)) {
      res.status(404).end();
      return;
    }
    const rows = await sql`SELECT avatar_data FROM users WHERE id = ${userId} LIMIT 1`;
    const m = DATA_URL_RE.exec(rows[0]?.avatar_data || '');
    if (!m) {
      res.status(404).end();
      return;
    }
    const bytes = Buffer.from(m[2], 'base64');
    res.setHeader('Content-Type', m[1]);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'");
    // The URL carries a version (?v=) that changes on every upload.
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200);
    if (typeof res.send === 'function') res.send(bytes);
    else res.end(bytes);
  } catch (err) {
    console.error('[api/avatar]', err.message);
    res.status(500).end();
  }
}
