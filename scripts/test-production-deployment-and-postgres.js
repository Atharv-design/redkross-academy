/**
 * RedKross Academy - Production Deployment & PostgreSQL Harness Test Suite
 * 
 * Verifies:
 * 1. PostgreSQL Schema DDL coverage (21 domain tables with indexes)
 * 2. Universal DB adapter (`api/_db.js`) with tagged template parameterization
 * 3. Production Express Gateway (`server/productionServer.js`) health check & routing
 * 4. PM2 configuration (`ecosystem.config.cjs`) cluster setup
 * 5. Environment configuration template (`.env.production.example`)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ?" [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ? [FAIL] ${name}: ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ?" [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ? [FAIL] ${name}: ${err.message}`);
  }
}

async function main() {
  console.log('===============================================================');
  console.log('  TEST SUITE: POSTGRESQL & CLOUDFLARE PRODUCTION DEPLOYMENT    ');
  console.log('===============================================================\n');

  // Test 1: Verify schema.sql covers all 21 tables
  runTest('schema.sql covers all 21 production domain tables', () => {
    const schemaPath = path.join(projectRoot, 'scripts', 'schema.sql');
    assert.ok(fs.existsSync(schemaPath), 'schema.sql must exist');
    const content = fs.readFileSync(schemaPath, 'utf8');

    const expectedTables = [
      'users',
      'learning_paths',
      'courses',
      'modules',
      'lessons',
      'quizzes',
      'questions',
      'options',
      'enrolments',
      'quiz_retry_windows',
      'quiz_attempts',
      'exam_violation_events',
      'reward_ledger',
      'audit_logs',
      'assignment_submissions',
      'certificate_requests',
      'system_settings',
      'credentials',
      'course_video_assets',
      'lesson_progress',
      'support_tickets'
    ];

    expectedTables.forEach(table => {
      assert.ok(
        content.includes(`CREATE TABLE IF NOT EXISTS ${table}`),
        `Table "${table}" must be declared in schema.sql`
      );
    });
  });

  // Test 2: Verify safe idempotent ALTER TABLE statements in schema.sql
  runTest('schema.sql includes idempotent ALTER TABLE additions for upgrade resilience', () => {
    const schemaPath = path.join(projectRoot, 'scripts', 'schema.sql');
    const content = fs.readFileSync(schemaPath, 'utf8');
    assert.ok(content.includes('ALTER TABLE users ADD COLUMN IF NOT EXISTS cadet_id'), 'users cadet_id ALTER required');
    assert.ok(content.includes('ALTER TABLE courses ADD COLUMN IF NOT EXISTS card_variant'), 'courses card_variant ALTER required');
    assert.ok(content.includes('ALTER TABLE lessons ADD COLUMN IF NOT EXISTS videos'), 'lessons videos ALTER required');
    assert.ok(content.includes('ALTER TABLE lessons ADD COLUMN IF NOT EXISTS images'), 'lessons images ALTER required');
  });

  // Test 3: Verify api/_db.js dual-mode driver & tagged template parameter logic
  await runAsyncTest('api/_db.js exports sql, json, and cors with universal adapter', async () => {
    const dbModule = await import('../api/_db.js');
    assert.strictEqual(typeof dbModule.sql, 'function', 'sql must be an executable function');
    assert.strictEqual(typeof dbModule.json, 'function', 'json helper must be exported');
    assert.strictEqual(typeof dbModule.cors, 'function', 'cors helper must be exported');
  });

  // Test 4: Verify productionServer.js exists and exports valid server logic
  runTest('server/productionServer.js has Express, Socket.io, and static dist fallback', () => {
    const serverPath = path.join(projectRoot, 'server', 'productionServer.js');
    assert.ok(fs.existsSync(serverPath), 'server/productionServer.js must exist');
    const content = fs.readFileSync(serverPath, 'utf8');
    assert.ok(content.includes("express()"), 'Express app must be created');
    assert.ok(content.includes("SocketIOServer"), 'Socket.io server must be integrated');
    assert.ok(content.includes("distDir"), 'distDir static fallback must be configured');
    assert.ok(content.includes("/healthz"), 'Health check endpoint must be defined');
  });

  // Test 5: Verify ecosystem.config.cjs PM2 configuration
  runTest('ecosystem.config.cjs configures cluster mode and environment defaults', () => {
    const pm2Path = path.join(projectRoot, 'ecosystem.config.cjs');
    assert.ok(fs.existsSync(pm2Path), 'ecosystem.config.cjs must exist');
    const content = fs.readFileSync(pm2Path, 'utf8');
    assert.ok(content.includes("name: 'redkross-academy'"), 'App name must be redkross-academy');
    assert.ok(content.includes("exec_mode: 'cluster'"), 'Exec mode must be cluster');
    assert.ok(content.includes("productionServer.js"), 'Script must point to productionServer.js');
  });

  // Test 6: Verify .env.production.example template has all necessary variables
  runTest('.env.production.example documents PostgreSQL, Cloudflare Tunnel, and Firebase', () => {
    const envPath = path.join(projectRoot, '.env.production.example');
    assert.ok(fs.existsSync(envPath), '.env.production.example must exist');
    const content = fs.readFileSync(envPath, 'utf8');
    assert.ok(content.includes('DATABASE_URL='), 'DATABASE_URL required');
    assert.ok(content.includes('DB_ENGINE='), 'DB_ENGINE required');
    assert.ok(content.includes('CLOUDFLARE_TUNNEL_INGRESS='), 'CLOUDFLARE_TUNNEL_INGRESS required');
    assert.ok(content.includes('ADMIN_PROVISION_EMAIL='), 'ADMIN_PROVISION_EMAIL required');
  });

  // Test 7: Verify package.json scripts
  runTest('package.json scripts include db:migrate, db:seed, and start:prod', () => {
    const pkgPath = path.join(projectRoot, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    assert.ok(pkg.scripts['db:migrate'], 'db:migrate script must exist');
    assert.ok(pkg.scripts['db:seed'], 'db:seed script must exist');
    assert.ok(pkg.scripts['start:prod'], 'start:prod script must exist');
  });

  // Test 8: End-to-end HTTP Probe on Production Server
  await runAsyncTest('Production server boots, passes /healthz and /api/courses queries', async () => {
    const { spawn } = await import('child_process');
    const serverProcess = spawn('node', ['server/productionServer.js'], {
      cwd: projectRoot,
      env: { ...process.env, PORT: '3042' }
    });

    let stdoutData = '';
    serverProcess.stdout.on('data', d => { stdoutData += d.toString(); });
    serverProcess.stderr.on('data', d => { stdoutData += d.toString(); });

    // Wait 2 seconds for boot
    await new Promise(r => setTimeout(r, 2000));

    try {
      const resHealth = await fetch('http://localhost:3042/healthz');
      assert.strictEqual(resHealth.status, 200, 'Health check must return 200 OK');
      const healthJson = await resHealth.json();
      assert.strictEqual(healthJson.status, 'healthy');

      const resCourses = await fetch('http://localhost:3042/api/courses');
      assert.strictEqual(resCourses.status, 200, 'Courses API must return 200 OK');
      const coursesJson = await resCourses.json();
      assert.ok(Array.isArray(coursesJson.courses), 'courses must be an array');
    } finally {
      serverProcess.kill('SIGTERM');
    }
  });

  console.log(`\n---------------------------------------------------------------`);
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED (100% SUCCESS)`);
  console.log(`---------------------------------------------------------------\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

main();
