import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required to run check_db.js');
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const users = await sql`SELECT id, email, role FROM users`;
  console.log('Users in DB:', users);
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  console.log('Tables in DB:', tables.map(t => t.table_name));
}

main().catch(console.error);
