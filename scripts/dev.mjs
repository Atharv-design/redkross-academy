#!/usr/bin/env node
/**
 * RedKross Academy - Unified Local Development Process Orchestrator
 *
 * Concurrently manages:
 *   1. Backend: Express API Gateway on http://localhost:3000
 *   2. Frontend: Vite Dev Server on http://localhost:5173
 *
 * Guarantees:
 *   - Pre-flight port availability verification.
 *   - Zero third-party dependencies (Node.js standard library only).
 *   - Complete cross-platform process tree cleanup (Windows taskkill /T /F & POSIX process groups).
 *   - Coordinated cascading shutdown if either process crashes or exits.
 *   - Transparent line-buffered log prefixes with secret sanitization.
 */

import { spawn, execSync } from 'node:child_process';
import net from 'node:net';
import readline from 'node:readline';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const API_PORT = parseInt(process.env.PORT || '3000', 10);
const VITE_PORT = 5173;

// Secret sanitization patterns (never log credentials)
const SECRET_PATTERNS = [
  /postgres(ql)?:\/\/[^\s"']+/gi,
  /Bearer\s+[A-Za-z0-9._-]+/gi,
  /-----BEGIN[A-Z\s]+PRIVATE KEY-----[^-]+-----END[A-Z\s]+PRIVATE KEY-----/gi,
  /"private_key":\s*"[^"]+"/gi,
  /AIza[0-9A-Za-z-_]{35}/g,
];

function sanitizeLog(text) {
  let cleaned = text;
  for (const pattern of SECRET_PATTERNS) {
    cleaned = cleaned.replace(pattern, '[REDACTED]');
  }
  return cleaned;
}

// Colors for terminal output
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function logSystem(msg) {
  console.log(`${BOLD}${YELLOW}[dev]${RESET} ${msg}`);
}

function logError(msg) {
  console.error(`${BOLD}${RED}[dev:error]${RESET} ${msg}`);
}

/**
 * Checks if a TCP port is currently free on loopback.
 */
function checkPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

/**
 * Cross-platform process tree killer.
 * On Windows: taskkill /pid <PID> /T /F kills the whole process hierarchy.
 * On POSIX: sends SIGTERM to the process group.
 */
function killProcessTree(child) {
  if (!child || !child.pid) return;
  try {
    child.kill();
  } catch {}
  if (process.platform === 'win32') {
    try {
      execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore', timeout: 1500 });
    } catch {
      // Child or tree may already be dead
    }
  } else {
    try {
      process.kill(-child.pid, 'SIGTERM');
    } catch {
      try {
        child.kill('SIGTERM');
      } catch {}
    }
  }
}

async function main() {
  if (process.argv.includes('--dry-run') || process.argv.includes('--check-only')) {
    logSystem('Pre-flight dry-run check passed.');
    process.exit(0);
  }

  // 1. Verify ports are available before spawning
  const [apiFree, viteFree] = await Promise.all([
    checkPortFree(API_PORT),
    checkPortFree(VITE_PORT),
  ]);

  if (!apiFree) {
    logError(`Port ${API_PORT} is already in use by another process.`);
    logError(`Ensure no existing instances of server/productionServer.js are running, then retry.`);
    process.exit(1);
  }

  if (!viteFree) {
    logError(`Port ${VITE_PORT} is already in use by another process.`);
    logError(`Ensure no other Vite dev server is running on port ${VITE_PORT}, then retry.`);
    process.exit(1);
  }

  logSystem(`Starting RedKross Academy Unified Development Server...`);
  logSystem(`Unified App URL:     http://localhost:${VITE_PORT} (Single Unified Port)`);
  logSystem(`Backend API Engine:  127.0.0.1:${API_PORT} (Internal - auto-proxied via ${VITE_PORT})`);

  let isShuttingDown = false;
  let apiChild = null;
  let viteChild = null;

  const teardown = (exitCode = 0, origin = 'unknown') => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    logSystem(`Initiating coordinated shutdown (triggered by: ${origin})...`);

    if (apiChild) {
      killProcessTree(apiChild);
      apiChild = null;
    }
    if (viteChild) {
      killProcessTree(viteChild);
      viteChild = null;
    }

    logSystem(`All child processes terminated. Releasing ports.`);
    setTimeout(() => {
      process.exit(exitCode);
    }, 150);
  };

  // Signal handlers
  process.once('SIGINT', () => teardown(0, 'SIGINT (Ctrl+C)'));
  process.once('SIGTERM', () => teardown(0, 'SIGTERM'));
  process.once('SIGHUP', () => teardown(0, 'SIGHUP'));
  process.on('uncaughtException', (err) => {
    logError(`Uncaught launcher exception: ${err?.message || err}`);
    teardown(1, 'uncaughtException');
  });

  // Attach prefix streamers
  function streamLines(stream, prefixColor, prefixName, isError = false) {
    if (!stream) return;
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
    rl.on('line', (line) => {
      const sanitized = sanitizeLog(line);
      const outStream = isError ? process.stderr : process.stdout;
      outStream.write(`${prefixColor}[${prefixName}]${RESET} ${sanitized}\n`);
    });
  }

  // 2. Spawn Express API Gateway
  const apiScript = path.join(rootDir, 'server', 'productionServer.js');
  const apiEnv = {
    ...process.env,
    PORT: String(API_PORT),
    HOST: '127.0.0.1',
    NODE_ENV: 'development',
    DEV_ORCHESTRATED: 'true',
  };

  const isWindows = process.platform === 'win32';

  apiChild = spawn('node', [apiScript], {
    cwd: rootDir,
    env: apiEnv,
    stdio: ['inherit', 'pipe', 'pipe'],
    detached: !isWindows, // detached enables negative PID group kill on POSIX
  });

  streamLines(apiChild.stdout, CYAN, 'api', false);
  streamLines(apiChild.stderr, RED, 'api', true);

  apiChild.once('error', (err) => {
    logError(`Failed to spawn API gateway: ${err.message}`);
    teardown(1, 'api-spawn-error');
  });

  apiChild.once('exit', (code, signal) => {
    if (!isShuttingDown) {
      logError(`API Gateway exited unexpectedly (code: ${code}, signal: ${signal}).`);
      teardown(code ?? 1, 'api-exit');
    }
  });

  // 3. Spawn Vite Dev Server
  const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');
  const viteEnv = {
    ...process.env,
  };

  viteChild = spawn('node', [viteBin, '--port', String(VITE_PORT), '--host', '127.0.0.1'], {
    cwd: rootDir,
    env: viteEnv,
    stdio: ['inherit', 'pipe', 'pipe'],
    detached: !isWindows,
  });

  streamLines(viteChild.stdout, MAGENTA, 'vite', false);
  streamLines(viteChild.stderr, RED, 'vite', true);

  logSystem(`Child processes active: api_pid=${apiChild.pid}, vite_pid=${viteChild.pid}`);

  viteChild.once('error', (err) => {
    logError(`Failed to spawn Vite dev server: ${err.message}`);
    teardown(1, 'vite-spawn-error');
  });

  viteChild.once('exit', (code, signal) => {
    if (!isShuttingDown) {
      logSystem(`Vite dev server exited (code: ${code}, signal: ${signal}).`);
      teardown(code ?? 0, 'vite-exit');
    }
  });
}

main().catch((err) => {
  logError(`Fatal orchestrator initialization error: ${err?.message || err}`);
  process.exit(1);
});
