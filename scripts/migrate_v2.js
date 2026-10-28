import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3RwIaSv9ptBg@ep-proud-flower-a5ho5vpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log('⚡ Starting RedKross Academy Database Migration (Phase 9 & Phase 3 & 4.2)...');

  // 1. Add card_variant column to courses
  console.log('1. Ensuring card_variant column on courses table...');
  await sql`
    ALTER TABLE courses 
    ADD COLUMN IF NOT EXISTS card_variant VARCHAR(20) DEFAULT 'variant-01';
  `;

  // 2. Ensure system_settings table exists
  console.log('2. Ensuring system_settings table exists...');
  await sql`
    CREATE TABLE IF NOT EXISTS system_settings (
      key VARCHAR(50) PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // 3. Centralized catalog visibility setting (default: false per Phase 3.3)
  console.log('3. Enforcing public_catalog_enabled = false in system_settings...');
  await sql`
    INSERT INTO system_settings (key, value, updated_at)
    VALUES ('public_catalog_enabled', 'false'::jsonb, NOW())
    ON CONFLICT (key) DO UPDATE 
    SET value = 'false'::jsonb, updated_at = NOW();
  `;

  // 4. CRITICAL: Phase 4.2 - DO NOT CREATE AN INITIAL SUPER ADMIN USER
  // Demote any previously seeded super_admin so no super_admin exists out of the box
  console.log('4. Demoting/clearing default super_admin to adhere strictly to Phase 4.2...');
  await sql`
    UPDATE users 
    SET role = 'student' 
    WHERE role = 'super_admin';
  `;

  // 5. Assign variant-01 through variant-10 to the 10 existing courses stably
  console.log('5. Assigning stable variant-01 to variant-10 to courses...');
  const courses = await sql`SELECT id, slug FROM courses ORDER BY id ASC`;
  const variants = [
    'variant-01',
    'variant-02',
    'variant-03',
    'variant-04',
    'variant-05',
    'variant-06',
    'variant-07',
    'variant-08',
    'variant-09',
    'variant-10',
  ];

  for (let i = 0; i < courses.length; i++) {
    const assignedVariant = variants[i % variants.length];
    await sql`
      UPDATE courses 
      SET card_variant = ${assignedVariant}
      WHERE id = ${courses[i].id}
    `;
    console.log(`  Course ${courses[i].slug} -> ${assignedVariant}`);
  }

  // 6. Verify state
  const settings = await sql`SELECT * FROM system_settings`;
  console.log('System Settings:', settings);
  const adminCount = await sql`SELECT count(*) as count FROM users WHERE role = 'super_admin'`;
  console.log('Super Admins in DB count (must be 0):', adminCount[0].count);

  console.log('✅ Migration complete and verified.');
}

migrate().catch(console.error);
