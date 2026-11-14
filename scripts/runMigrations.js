/**
 * RedKross Academy - Database Migration Runner
 * 
 * Executes scripts/schema.sql against the target PostgreSQL database
 * (Local, VPS, AWS RDS, Neon, Supabase, or Docker).
 * 
 * Usage:
 *   DATABASE_URL="postgresql://user:password@localhost:5432/redkross_db" node scripts/runMigrations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Export it (never hard-code credentials in source).');
  process.exit(1);
}

async function runMigrations() {
  console.log('====================================================');
  console.log('   REDKROSS ACADEMY - POSTGRESQL SCHEMA MIGRATION   ');
  console.log('====================================================');
  
  const targetHost = DATABASE_URL.split('@')[1]?.split('/')[0] || 'Unknown Target';
  console.log(`Connecting to: ${targetHost}...`);

  const { Pool } = pg;
  const isSsl = DATABASE_URL.includes('sslmode=require') || DATABASE_URL.includes('neon.tech') || process.env.PGSSL === 'true';
  
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: isSsl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
  });

  try {
    const client = await pool.connect();
    console.log('?" Successfully connected to PostgreSQL instance.');

    const schemaPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at: ${schemaPath}`);
    }

    const sqlScript = fs.readFileSync(schemaPath, 'utf8');
    console.log(`Applying DDL schema (${sqlScript.length} bytes)...`);

    await client.query(sqlScript);
    console.log('?" DDL schema execution completed successfully.');

    // Incremental, idempotent migrations in lexical (date-prefixed) order
    const migrationsDir = path.join(__dirname, 'migrations');
    if (fs.existsSync(migrationsDir)) {
      for (const file of fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()) {
        console.log(`Applying migration ${file}...`);
        await client.query(fs.readFileSync(path.join(migrationsDir, file), 'utf8'));
      }
    }

    // Query information_schema to verify created tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name ASC;
    `);

    console.log('\nVerified Active Tables in "public" schema:');
    res.rows.forEach((r, idx) => {
      console.log(`  [${String(idx + 1).padStart(2, '0')}] ${r.table_name}`);
    });

    client.release();
    await pool.end();

    console.log('\n?" Migration finished with ZERO errors.');
  } catch (err) {
    console.error('\n? Migration failed:', err.message);
    if (pool) await pool.end();
    process.exit(1);
  }
}

runMigrations();
