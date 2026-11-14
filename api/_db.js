import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import pg from 'pg';

// Parse PostgreSQL DATE (1082) as plain ISO string 'YYYY-MM-DD' to prevent local timezone drift
if (pg.types && typeof pg.types.setTypeParser === 'function') {
  pg.types.setTypeParser(1082, (str) => str);
}

const DATABASE_URL = process.env.DATABASE_URL;

// Fail on first use rather than at import, so handlers that never touch the database
// (and unit tests of them) still load; every query fails loudly when unconfigured.

// Detect whether connection string is Neon or standard self-hosted PostgreSQL
const isNeon = Boolean(DATABASE_URL) && (DATABASE_URL.includes('neon.tech') || process.env.DB_ENGINE === 'neon') && process.env.DB_ENGINE !== 'pg';

let sqlExecutor;

if (!DATABASE_URL) {
  sqlExecutor = async () => {
    throw new Error('[FATAL] DATABASE_URL environment variable is required.');
  };
} else if (isNeon) {
  sqlExecutor = neon(DATABASE_URL);
} else {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: (process.env.PGSSL === 'true' || DATABASE_URL.includes('sslmode=require'))
      ? { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== 'false' }
      : false,
    max: parseInt(process.env.PG_MAX_CLIENTS || '20', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  sqlExecutor = async function sql(strings, ...values) {
    if (typeof strings === 'string') {
      const res = await pool.query(strings, values[0] || []);
      return res.rows;
    }
    // Tagged template literal: sql`SELECT * FROM users WHERE id = ${id}`
    let text = '';
    const params = [];
    for (let i = 0; i < strings.length; i++) {
      text += strings[i];
      if (i < values.length) {
        params.push(values[i]);
        text += `$${params.length}`;
      }
    }
    const res = await pool.query(text, params);
    return res.rows;
  };

  sqlExecutor.pool = pool;
}

export const sql = sqlExecutor;

// ---------------------------------------------------------------------------
// CORS: only echo origins on the allow-list. A wildcard origin combined with
// bearer-token auth lets any website drive the API from a victim's browser.
// Extra origins can be supplied as a comma-separated ALLOWED_ORIGINS env var.
// ---------------------------------------------------------------------------
const DEFAULT_ORIGINS = [
  'https://academy.redkross.org.in',
  'https://redkross.org.in',
  'https://www.redkross.org.in',
  'https://redkross-academy.vercel.app',
];
const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export function allowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const base = process.env.NODE_ENV === 'production' ? DEFAULT_ORIGINS : [...DEFAULT_ORIGINS, ...DEV_ORIGINS];
  return [...base, ...extra];
}

export function isOriginAllowed(origin) {
  if (!origin) return true; // same-origin requests and server-to-server calls send no Origin
  return allowedOrigins().includes(origin);
}

function applyCors(req, res) {
  const origin = req?.headers?.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export function json(res, data, status = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(data);
}

export function cors(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

/**
 * Logs the real error server-side and returns a generic message to the client.
 * Raw database/driver error text must never reach the browser.
 */
export function serverError(res, err, tag = 'api') {
  console.error(`[${tag}]`, err);
  return json(res, { error: 'Internal server error' }, 500);
}

export function newId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
