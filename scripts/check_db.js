import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_3RwIaSv9ptBg@ep-proud-flower-a5ho5vpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const users = await sql`SELECT id, email, role FROM users`;
  console.log('Users in DB:', users);
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  console.log('Tables in DB:', tables.map(t => t.table_name));
}

main().catch(console.error);
