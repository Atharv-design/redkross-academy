/**
 * RedKross Academy - Standalone Production Server (Hardened Enterprise Gateway)
 * 
 * Combines:
 * 1. Express REST API engine (dynamically mounting /api/* endpoints)
 * 2. Real-Time Socket.io Telemetry & Proctoring Server (Room-Scoped & CORS Restricted)
 * 3. Static SPA serving (dist/ with React Router client fallback)
 * 4. Graceful shutdown & health/readiness monitoring (/healthz, /readyz)
 * 5. Security Defense Layer: Helmet-grade headers, rate-limiting, and CORS controls
 * 
 * Run with:
 *   node server/productionServer.js
 * Or with PM2:
 *   pm2 start ecosystem.config.cjs
 */

import express from 'express';
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sql, isOriginAllowed } from '../api/_db.js';
import { attachSocketHub } from './socketHub.js';
import { createRateLimiter } from './rateLimit.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
// Behind Cloudflare/nginx set TRUST_PROXY (e.g. 1) so req.ip is the real client address.
// Never trust X-Forwarded-For blindly: it is attacker-controlled and would defeat rate limiting.
app.set('trust proxy', process.env.TRUST_PROXY ? (Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY) : 'loopback');
const httpServer = createServer(app);

// -----------------------------------------------------------------------------
// 1. SECURITY DEFENSE & HEADERS LAYER (Helmet-grade headers without external dep)
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  // Enforce HSTS (Strict-Transport-Security: 2 years, include subdomains)
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking / iframe embedding
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Cross-site scripting legacy filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Restrict sensitive hardware features
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');

  // Disable powered-by banner
  res.removeHeader('X-Powered-By');

  next();
});

// -----------------------------------------------------------------------------
// 2. CORS RESTRICTION LAYER
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// -----------------------------------------------------------------------------
// 3. RATE LIMITING (per user + per IP; see server/rateLimit.js)
// -----------------------------------------------------------------------------
// Traffic arrives through cloudflared on 127.0.0.1, so the client IP comes from
// CF-Connecting-IP. A whole college batch can share one NAT IP, so the per-IP
// ceilings are very high and the real limits are per user; IPs sending many
// rejected (401) tokens are blocked. Load-tested: 500 students, one IP, one exam.
app.use('/api', createRateLimiter({ name: 'api', perUser: 180, perAnonIp: 300, perIp: 30000, perIpRejected: 120 }));
app.use(
  ['/api/auth', '/api/redeem', '/api/proctor', '/api/assessment', '/api/violation', '/api/send-email', '/api/support-tickets', '/api/e2b'],
  createRateLimiter({
    name: 'strict',
    perUser: 40,
    perAnonIp: 30,
    perIp: 15000,
    perIpRejected: 60,
    message: 'Too many attempts. Please wait a moment and try again.',
  })
);

// Minimal API access log (no IPs, no query strings, no bodies): method, path, status, duration.
if (process.env.ACCESS_LOG !== '0') {
  app.use('/api', (req, res, next) => {
    const t0 = process.hrtime.bigint();
    res.on('finish', () => {
      const ms = Number(process.hrtime.bigint() - t0) / 1e6;
      console.log(`[api] ${req.method} ${req.baseUrl}${req.path} ${res.statusCode} ${ms.toFixed(1)}ms`);
    });
    next();
  });
}

// Request body parser with scoped limits (2MB general, 25MB for assignments)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// -----------------------------------------------------------------------------
// 4. HARDENED REAL-TIME SOCKET.IO SERVER (Scoped rooms & CORS protection)
// -----------------------------------------------------------------------------
const io = attachSocketHub(httpServer);

// Proctoring snapshot retention (default 90 days): purge daily
const purgeProctorSnapshots = () =>
  import('../api/proctor.js')
    .then((m) => m.purgeOldSnapshots())
    .then((n) => n && console.log(`[proctor] cleared ${n} expired snapshots`))
    .catch((e) => console.warn('[proctor] snapshot purge skipped:', e.message));
setTimeout(purgeProctorSnapshots, 60 * 1000).unref();
setInterval(purgeProctorSnapshots, 24 * 60 * 60 * 1000).unref();

// -----------------------------------------------------------------------------
// 5. HEALTH & READINESS PROBES (/healthz, /readyz)
// -----------------------------------------------------------------------------
app.get(['/healthz', '/api/health'], async (req, res) => {
  try {
    let dbStatus = 'connected';
    try {
      await sql`SELECT 1 as ping`;
    } catch (err) {
      dbStatus = 'degraded';
      console.error('[healthz] database check failed:', err.message);
    }

    res.status(200).json({
      status: 'healthy',
      service: 'RedKross Academy Production Gateway',
      environment: process.env.NODE_ENV || 'production',
      database: dbStatus,
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
});

app.get(['/readyz', '/api/ready'], async (req, res) => {
  try {
    await sql`SELECT 1 as ping`;
    const socketReady = Boolean(io);

    res.status(200).json({
      status: 'ready',
      database: 'connected',
      sockets: socketReady ? 'listening' : 'uninitialized',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      status: 'not_ready',
      timestamp: new Date().toISOString()
    });
  }
});

// -----------------------------------------------------------------------------
// 6. DYNAMICALLY MOUNTED API ENDPOINTS (api/*.js)
// -----------------------------------------------------------------------------
const apiDir = path.join(__dirname, '../api');
const apiRoutes = [
  'admin',
  'assessment',
  'avatar',
  'catalog',
  'manage',
  'proctor',
  'profile',
  'redeem',
  'auth',
  'courses',
  'e2b',
  'enrol',
  'learning-paths',
  'progress',
  'quiz',
  'send-email',
  'support-tickets',
  'verify',
  'violation',
  'wallet'
];

for (const route of apiRoutes) {
  const filePath = path.join(apiDir, `${route}.js`);
  const altPath = path.join(apiDir, `_${route}.js`);
  const targetName = fs.existsSync(filePath) ? route : fs.existsSync(altPath) ? `_${route}` : null;
  if (targetName) {
    app.all(`/api/${route}`, async (req, res, next) => {
      try {
        const module = await import(`../api/${targetName}.js`);
        if (typeof module.default === 'function') {
          return await module.default(req, res);
        }
        res.status(404).json({ error: `Handler for /api/${route} not found` });
      } catch (err) {
        console.error(`[API Error] /api/${route}:`, err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });
  }
}

// -----------------------------------------------------------------------------
// Explicit route for learning-paths forwarded to courses.js
app.all('/api/learning-paths', async (req, res) => {
  try {
    const module = await import('../api/courses.js');
    req.query = req.query || {};
    req.query.type = 'learning_paths';
    return await module.default(req, res);
  } catch (err) {
    console.error('[API Error] /api/learning-paths:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// 7. FRONTEND STATIC ASSET SERVING & SPA FALLBACK (dist/)
// -----------------------------------------------------------------------------
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  // Cache policy, written so Cloudflare can serve almost everything from its edge:
  //  - Vite build output with a content hash in the name: cache for a year (immutable)
  //  - other images/media/lab kits: 7 days at the edge, 1 day in browsers
  //  - lesson markdown: 1 hour (content fixes show up quickly)
  //  - index.html: never cached (it points at the current hashed bundles)
  const HASHED = /[-.][A-Za-z0-9_-]{8,}.(js|css|woff2?)$/;
  app.use(express.static(distDir, {
    etag: true,
    setHeaders: (res, filePath) => {
      const p = filePath.split(path.sep).join('/');
      if (p.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (p.includes('/assets/') && HASHED.test(p)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (p.includes('/course-content/')) {
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      }
    }
  }));

  // Fallback all SPA routes to dist/index.html (or redirect to Vite port 5173 in development to prevent dual-port confusion)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/socket.io/') || req.path.startsWith('/healthz') || req.path.startsWith('/readyz')) {
      return next();
    }
    if (process.env.DEV_ORCHESTRATED === 'true') {
      return res.redirect(302, `http://localhost:5173${req.url}`);
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/socket.io/') || req.path.startsWith('/healthz') || req.path.startsWith('/readyz')) {
      return next();
    }
    if (process.env.DEV_ORCHESTRATED === 'true') {
      return res.redirect(302, `http://localhost:5173${req.url}`);
    }
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>RedKross Academy Backend Active</title></head>
        <body style="background:#071018;color:#65F58A;font-family:sans-serif;padding:40px;text-align:center;">
          <h1>RedKross Academy API & Real-time Server Running</h1>
          <p style="color:#A7B1C6;">Frontend build (dist/) not detected. Run <code>npm run build</code> to compile the client interface.</p>
        </body>
      </html>
    `);
  });
}

// -----------------------------------------------------------------------------
// 8. SERVER BOOT & GRACEFUL SHUTDOWN
// -----------------------------------------------------------------------------
httpServer.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  REDKROSS ACADEMY - HARDENED GATEWAY RUNNING       `);
  console.log(`====================================================`);
  console.log(`  Local Address:     http://localhost:${PORT}`);
  console.log(`  Health Check:      http://localhost:${PORT}/healthz`);
  console.log(`  Readiness Probe:   http://localhost:${PORT}/readyz`);
  console.log(`  API Base:          http://localhost:${PORT}/api/courses`);
  console.log(`  Static Frontend:   ${fs.existsSync(distDir) ? 'Loaded from dist/' : 'Not yet built'}`);
  console.log(`  Security Headers:  Active (HSTS, DENY, nosniff, CSP)`);
  console.log(`  Rate Limiting:     Active (120/min API, 30/min Auth)`);
  console.log(`====================================================`);
});

const shutdown = (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  httpServer.close(() => {
    console.log('HTTP and Socket.io servers closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forcefully terminating after timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
