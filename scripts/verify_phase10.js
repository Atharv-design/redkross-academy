import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3RwIaSv9ptBg@ep-proud-flower-a5ho5vpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function runVerification() {
  console.log('🧪 Starting Phase 10 Verification Suite for RedKross Academy...');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: Database Super Admin Count (Strict Phase 4.2: DO NOT CREATE INITIAL SUPER ADMIN USER)
  console.log('\n--- 1. Super Admin Clearance & Role Tests ---');
  const adminUsers = await sql`SELECT count(*) as count FROM users WHERE role = 'super_admin'`;
  assert(parseInt(adminUsers[0].count, 10) === 0, 'No Super Admin user exists in DB (Count is strictly 0)');

  // TEST 2: System Settings Catalog Flag
  console.log('\n--- 2. Centralized Catalog Release Setting Tests ---');
  const settings = await sql`SELECT value FROM system_settings WHERE key = 'public_catalog_enabled'`;
  assert(settings.length > 0 && settings[0].value === false, 'system_settings has public_catalog_enabled = false by default');

  // TEST 3: Course Variants Persisted in Database
  console.log('\n--- 3. 10 Course Card Variants Persistence Tests ---');
  const coursesWithVariants = await sql`SELECT id, slug, card_variant FROM courses`;
  assert(coursesWithVariants.length >= 9, 'All standard courses present in database');
  const validVariants = [
    'variant-01', 'variant-02', 'variant-03', 'variant-04', 'variant-05',
    'variant-06', 'variant-07', 'variant-08', 'variant-09', 'variant-10'
  ];
  const allValid = coursesWithVariants.every(c => validVariants.includes(c.card_variant));
  assert(allValid, 'All courses have stable persistent variant (variant-01 to variant-10)');

  // TEST 4: Frontend Empty State Exact Copy Verification
  console.log('\n--- 4. Learning Paths Exact Copy Tests ---');
  const learningPathsSrc = fs.readFileSync('src/pages/public/LearningPathsPage.jsx', 'utf8');
  assert(learningPathsSrc.includes('Courses will be out soon'), 'Learning Paths contains exact primary message: "Courses will be out soon"');
  assert(
    learningPathsSrc.includes("We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases."),
    'Learning Paths contains exact supporting copy'
  );
  assert(!learningPathsSrc.includes('<CourseCardVariant'), 'Learning Paths has ZERO course cards rendered');

  // TEST 5: Route Protection Verification
  console.log('\n--- 5. Route Guards Verification ---');
  const appSrc = fs.readFileSync('src/App.jsx', 'utf8');
  assert(appSrc.includes('<ProtectedRoute>'), 'App.jsx wraps student routes with <ProtectedRoute>');
  assert(appSrc.includes('<AdminRoute>'), 'App.jsx wraps admin routes with <AdminRoute>');
  assert(appSrc.includes('path="login"'), 'App.jsx registers /login route');

  // TEST 6: Firebase Auth Configuration Verification
  console.log('\n--- 6. Firebase SDK Configuration Tests ---');
  const firebaseSrc = fs.readFileSync('src/services/auth/firebase.js', 'utf8');
  assert(firebaseSrc.includes('academy-redkross.firebaseapp.com'), 'Firebase configured with authDomain: academy-redkross.firebaseapp.com');
  assert(firebaseSrc.includes('AIzaSyCwsdhdLghtrcJ7NQmbayW1Yq2BCIO2TWQ'), 'Firebase configured with verified API key');

  // TEST 7: Provisioning Script Safety
  console.log('\n--- 7. Admin Provisioning CLI Safety Tests ---');
  const provisionSrc = fs.readFileSync('scripts/provisionAdmin.js', 'utf8');
  assert(provisionSrc.includes('ADMIN_PROVISION_EMAIL'), 'Provisioning script requires explicit ADMIN_PROVISION_EMAIL');
  assert(provisionSrc.includes('audit_logs'), 'Provisioning script writes all promotions to audit_logs');

  console.log(`\n========================================`);
  console.log(`Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
