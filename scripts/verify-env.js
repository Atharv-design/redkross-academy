/**
 * RedKross Academy - Pre-flight Environment Verification Script
 * Validates that all required runtime secrets and configuration keys are configured.
 * 
 * Run with: node scripts/verify-env.js
 */

import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const requiredProductionVars = [
  'DATABASE_URL',
  'CREDENTIAL_SIGNING_SECRET'
];

const requiredClientVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID'
];

const optionalRecommendedVars = [
  'FIREBASE_PROJECT_ID',
  'PUBLIC_BASE_URL',
  'RESEND_API_KEY',
  'ADMIN_INBOX_EMAIL',
  'N8N_WEBHOOK_URL',
  'N8N_WEBHOOK_SECRET',
  'E2B_API_KEY',
  'ALLOWED_ORIGINS',
  'TRUST_PROXY'
];

console.log('--- REDKROSS ACADEMY: PRE-FLIGHT ENVIRONMENT CHECK ---');
let hasError = false;

// The Neon password that was hard-coded in the original repository (rotated / to be
// rotated). Only its SHA-256 is kept here, so this check never re-publishes it.
const LEAKED_NEON_PASSWORD_SHA256 = 'd93a41d05b70f98edd5800611e6cdce0db994b677df511bb828afd96f1a1fd71';
function containsLeakedPassword(value) {
  const m = /:\/\/[^:/]+:([^@]+)@/.exec(String(value));
  return Boolean(m) && crypto.createHash('sha256').update(m[1]).digest('hex') === LEAKED_NEON_PASSWORD_SHA256;
}

// Check Server Required Variables
for (const varName of requiredProductionVars) {
  const val = process.env[varName];
  if (!val) {
    console.error(`[CRITICAL MISSING] Required environment variable "${varName}" is NOT set.`);
    hasError = true;
  } else {
    // Security check for deprecated hardcoded credentials
    if (containsLeakedPassword(val)) {
      console.warn(`[SECURITY WARNING] "${varName}" appears to contain deprecated/exposed credential signature. Rotation recommended.`);
    } else if (varName === 'CREDENTIAL_SIGNING_SECRET' && val.length < 32) {
      console.error('[CRITICAL] CREDENTIAL_SIGNING_SECRET must be at least 32 characters (openssl rand -hex 32).');
      hasError = true;
    } else {
      console.log(`[PASS] ${varName} is configured.`);
    }
  }
}

// Check Client Required Variables
for (const varName of requiredClientVars) {
  const val = process.env[varName];
  if (!val) {
    console.warn(`[WARN] Client variable "${varName}" is not set in local .env. (Required for Firebase OAuth in browser).`);
  } else {
    console.log(`[PASS] ${varName} is configured.`);
  }
}

// Check Recommended Variables
for (const varName of optionalRecommendedVars) {
  const val = process.env[varName];
  if (!val) {
    console.log(`[INFO] Recommended variable "${varName}" is omitted (features using it will gracefully degrade).`);
  } else {
    console.log(`[PASS] ${varName} is configured.`);
  }
}

console.log('------------------------------------------------------');
if (hasError) {
  console.error('FAILED: One or more critical environment variables are missing.');
  process.exit(1);
} else {
  console.log('SUCCESS: Core environment pre-flight checks passed cleanly.');
  process.exit(0);
}
