/**
 * In-memory fixed-window rate limiting, designed for traffic that arrives through a
 * Cloudflare tunnel (every request reaches Node from 127.0.0.1).
 *
 * Buckets per request:
 *  - per user  (signed-in requests, keyed on the token's uid): the main limit; stops
 *    one account from hammering the API.
 *  - per IP, anonymous: a low ceiling for callers without a token.
 *  - per IP, total: a very high ceiling. A whole college batch shares one NAT address
 *    (500 students starting an exam = ~1,500 calls in seconds), so it must not bite
 *    real classes.
 *  - per IP, rejected tokens: requests that end in 401 count here. Rotating fake uids
 *    to dodge the user bucket produces 401s, so that IP is blocked quickly.
 *
 * Runs in one process. If the API is ever scaled to several processes, move the
 * counters to Redis (or rely on Cloudflare rate-limiting rules).
 */
import crypto from 'crypto';

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

/**
 * Real client IP. Cloudflare's CF-Connecting-IP is only believed when the
 * connection itself comes from the local tunnel (cloudflared) or a trusted proxy,
 * so a direct caller cannot spoof it.
 */
export function clientIp(req) {
  const peer = req.socket?.remoteAddress || '';
  const cf = req.headers?.['cf-connecting-ip'];
  if (cf && (LOOPBACK.has(peer) || process.env.TRUST_CF_CONNECTING_IP === '1')) {
    return String(cf).trim().slice(0, 64);
  }
  return req.ip || peer || 'unknown';
}

/**
 * Bucket key for a signed-in caller: the uid from the JWT payload, read WITHOUT
 * verification. That is fine for counting (forging a uid only moves the caller into
 * another user bucket, and the per-IP bucket still applies); identity checks happen
 * in the handlers.
 */
export function tokenSubject(req) {
  const h = req.headers?.authorization || '';
  if (!h.startsWith('Bearer ')) return null;
  const parts = h.slice(7).split('.');
  if (parts.length === 3) {
    try {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
      const sub = payload.user_id || payload.sub;
      if (typeof sub === 'string' && sub.length <= 128) return sub;
    } catch {
      // fall through
    }
  }
  // Not a readable JWT: count by a hash of it (still per-caller, never the raw token).
  // Junk tokens end in 401 and trip the per-IP rejected-token limit.
  return `h:${crypto.createHash('sha256').update(h).digest('hex').slice(0, 16)}`;
}

export function createRateLimiter({ name, windowMs = 60000, perUser, perIp, perAnonIp, perIpRejected = 60, message = 'Too many requests. Please slow down.' }) {
  const buckets = new Map();

  const hit = (key, max, now) => {
    let rec = buckets.get(key);
    if (!rec || now - rec.start >= windowMs) {
      rec = { start: now, count: 0 };
      buckets.set(key, rec);
    }
    rec.count += 1;
    return rec.count > max ? Math.ceil((rec.start + windowMs - now) / 1000) : 0;
  };

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [k, rec] of buckets) if (now - rec.start >= windowMs) buckets.delete(k);
  }, Math.max(windowMs, 60000));
  sweep.unref?.();

  return function rateLimit(req, res, next) {
    const now = Date.now();
    const ip = clientIp(req);
    const badKey = `${name}:bad:${ip}`;
    const bad = buckets.get(badKey);
    if (bad && now - bad.start < windowMs && bad.count >= perIpRejected) {
      const wait = Math.ceil((bad.start + windowMs - now) / 1000);
      res.setHeader('Retry-After', String(wait));
      return res.status(429).json({ error: message, retryAfterSeconds: wait });
    }
    let retry = hit(`${name}:ip:${ip}`, perIp, now);
    const sub = tokenSubject(req);
    if (!retry && sub && perUser) retry = hit(`${name}:u:${sub}`, perUser, now);
    if (!retry && !sub && perAnonIp) retry = hit(`${name}:anon:${ip}`, perAnonIp, now);
    if (retry) {
      res.setHeader('Retry-After', String(retry));
      return res.status(429).json({ error: message, retryAfterSeconds: retry });
    }
    if (sub) {
      res.on?.('finish', () => {
        if (res.statusCode === 401) hit(badKey, Number.MAX_SAFE_INTEGER, Date.now());
      });
    }
    return next();
  };
}
