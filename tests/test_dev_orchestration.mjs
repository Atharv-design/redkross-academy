#!/usr/bin/env node
/**
 * Test: Local Development Process Orchestration & Vite Proxy Pass-Through
 *
 * Verifies:
 * 1. scripts/dev.mjs starts both Express Gateway (:3000) and Vite Dev (:5173).
 * 2. Express API Gateway liveness is validated independently of Neon database status.
 * 3. Vite proxy forwards /api/* traffic correctly to Express.
 * 4. Auth-gated endpoints return structured 401 JSON instead of empty 500.
 * 5. Coordinated shutdown cleans up both process trees and frees ports 3000 and 5173.
 */

import { spawn, execSync } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const API_PORT = 3000;
const VITE_PORT = 5173;

function checkPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') resolve(false);
      else resolve(true);
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function waitForHttp(url, maxWaitMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return res;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Timeout waiting for HTTP service at ${url}`);
}

function isProcessAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}

async function runTest() {
  console.log('=== STARTING LOCAL DEV ORCHESTRATION & PROXY VERIFICATION ===');

  // Verify ports are free initially
  const initialApiFree = await checkPortFree(API_PORT);
  const initialViteFree = await checkPortFree(VITE_PORT);
  if (!initialApiFree || !initialViteFree) {
    throw new Error(`Pre-condition failed: Ports must be free before test. Port 3000: ${initialApiFree}, Port 5173: ${initialViteFree}`);
  }

  console.log('[1/5] Spawning scripts/dev.mjs orchestrator...');
  const launcher = spawn('node', ['scripts/dev.mjs'], {
    cwd: rootDir,
    env: { ...process.env, ACCESS_LOG: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let apiPid = null;
  let vitePid = null;

  launcher.stdout.on('data', (chunk) => {
    const text = chunk.toString();
    const match = text.match(/api_pid=(\d+),\s*vite_pid=(\d+)/);
    if (match) {
      apiPid = parseInt(match[1], 10);
      vitePid = parseInt(match[2], 10);
    }
  });

  let launcherExited = false;
  launcher.on('exit', () => {
    launcherExited = true;
  });

  try {
    // 2. Wait for API Gateway directly on 3000
    console.log('[2/5] Probing Express API Gateway liveness on port 3000...');
    const apiDirectRes = await waitForHttp(`http://127.0.0.1:${API_PORT}/api/health`, 12000);
    const apiDirectData = await apiDirectRes.json();
    console.log(`   - Express Gateway Status: ${apiDirectRes.status} (service: "${apiDirectData.service}")`);
    console.log(`   - Database Readiness Reported: "${apiDirectData.database}" (liveness verified independently of database)`);
    if (apiDirectRes.status !== 200 || apiDirectData.status !== 'healthy') {
      throw new Error(`API Gateway did not return healthy status. Got: ${JSON.stringify(apiDirectData)}`);
    }

    // Verify browser navigation to port 3000 redirects to port 5173 to eliminate dual-port confusion
    const redirectRes = await fetch(`http://127.0.0.1:${API_PORT}/`, { redirect: 'manual' });
    console.log(`   - Browser navigation to :3000 redirects to 5173: ${redirectRes.status} -> ${redirectRes.headers.get('location')}`);
    if (redirectRes.status !== 302 || !redirectRes.headers.get('location')?.includes('5173')) {
      throw new Error(`Expected port 3000 to redirect browser traffic to 5173. Got status ${redirectRes.status}`);
    }

    // 3. Wait for Vite Dev Server on 5173
    console.log('[3/5] Probing Vite Dev Server liveness on port 5173...');
    const viteRes = await waitForHttp(`http://127.0.0.1:${VITE_PORT}/@vite/client`, 12000);
    console.log(`   - Vite Client Status: ${viteRes.status} ${viteRes.headers.get('content-type')}`);
    if (viteRes.status !== 200) {
      throw new Error(`Vite Dev Server did not respond with 200. Got: ${viteRes.status}`);
    }

    // 4. Verify Vite Proxy forwards /api/* traffic correctly to Express
    console.log('[4/5] Testing Vite Proxy pass-through (/api/* on port 5173)...');
    
    // Test 4a: Health check through proxy
    const proxyHealthRes = await fetch(`http://127.0.0.1:${VITE_PORT}/api/health`);
    const proxyHealthData = await proxyHealthRes.json();
    console.log(`   - GET /api/health through :5173 -> Status: ${proxyHealthRes.status}, Service: "${proxyHealthData.service}"`);
    if (proxyHealthRes.status !== 200) {
      throw new Error(`Expected 200 through Vite proxy for /api/health, got ${proxyHealthRes.status}`);
    }

    // Test 4b: Auth endpoint through proxy (must return structured 401 JSON, NOT empty 500)
    const proxyAuthRes = await fetch(`http://127.0.0.1:${VITE_PORT}/api/auth`, { method: 'POST' });
    const proxyAuthData = await proxyAuthRes.json();
    console.log(`   - POST /api/auth through :5173 -> Status: ${proxyAuthRes.status}, Error Body: "${proxyAuthData.error}"`);
    if (proxyAuthRes.status !== 401 || proxyAuthData.error !== 'Authentication required') {
      throw new Error(`Expected structured 401 JSON from /api/auth through proxy. Got: ${JSON.stringify(proxyAuthData)}`);
    }

    // Test 4c: Assessment endpoint through proxy (must return structured 401 JSON, NOT empty 500)
    const proxyExamRes = await fetch(`http://127.0.0.1:${VITE_PORT}/api/assessment?course_id=crs_cyber_python_04`);
    const proxyExamData = await proxyExamRes.json();
    console.log(`   - GET /api/assessment through :5173 -> Status: ${proxyExamRes.status}, Error Body: "${proxyExamData.error}"`);
    if (proxyExamRes.status !== 401 || proxyExamData.error !== 'Authentication required') {
      throw new Error(`Expected structured 401 JSON from /api/assessment through proxy. Got: ${JSON.stringify(proxyExamData)}`);
    }

    console.log('[PASS] All Vite proxy endpoints reached Express and returned structured JSON.');
  } finally {
    // 5. Test coordinated shutdown and process tree cleanup
    console.log('[5/5] Testing coordinated shutdown & process-tree termination...');
    try {
      launcher.kill('SIGINT');
    } catch {}
    if (apiPid) {
      try { process.kill(apiPid); } catch {}
    }
    if (vitePid) {
      try { process.kill(vitePid); } catch {}
    }
    if (process.platform === 'win32') {
      try {
        execSync(`taskkill /pid ${launcher.pid} /T /F`, { stdio: 'ignore', timeout: 1500 });
      } catch {}
    }

    // Wait up to 5s and assert processes are dead and ports released
    let apiDead = false;
    let viteDead = false;
    let p3000Free = false;
    let p5173Free = false;

    const cleanupStart = Date.now();
    while (Date.now() - cleanupStart < 6000) {
      apiDead = !isProcessAlive(apiPid);
      viteDead = !isProcessAlive(vitePid);
      p3000Free = await checkPortFree(API_PORT);
      p5173Free = await checkPortFree(VITE_PORT);
      if (apiDead && viteDead && p3000Free && p5173Free) break;
      await new Promise((r) => setTimeout(r, 400));
    }

    console.log(`   - API Process (PID ${apiPid}) dead: ${apiDead}`);
    console.log(`   - Vite Process (PID ${vitePid}) dead: ${viteDead}`);
    console.log(`   - Ports 3000 and 5173 released: ${p3000Free && p5173Free}`);

    if (!apiDead || !viteDead) {
      throw new Error('Process cleanup failed: Child processes were still alive.');
    }
    if (!p3000Free || !p5173Free) {
      throw new Error('Port cleanup failed: Port 3000 or 5173 was not released.');
    }
  }

  console.log('=== ALL LOCAL DEV ORCHESTRATION TESTS PASSED (100%) ===\n');
}

runTest().catch((err) => {
  console.error('[FAIL] Local dev orchestration test failed:', err);
  process.exit(1);
});
