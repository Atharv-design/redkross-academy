import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('[FATAL] DATABASE_URL environment variable is required. Please set DATABASE_URL in your environment or .env file.');
}

// Detect whether connection string is Neon or standard self-hosted PostgreSQL
const isNeon = (DATABASE_URL.includes('neon.tech') || process.env.DB_ENGINE === 'neon') && process.env.DB_ENGINE !== 'pg';

let sqlExecutor;

if (isNeon) {
  sqlExecutor = neon(DATABASE_URL);
} else {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: (process.env.PGSSL === 'true' || DATABASE_URL.includes('sslmode=require'))
      ? { rejectUnauthorized: false }
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

export function json(res, data, status = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.status(status).json(data);
}

export function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}
