/**
 * RedKross Academy - Pre-flight Environment Verification Script
 * Validates that all required runtime secrets and configuration keys are configured.
 * 
 * Run with: node scripts/verify-env.js
 */

import dotenv from 'dotenv';
dotenv.config();

const requiredProductionVars = [
  'DATABASE_URL'
];

const requiredClientVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID'
];

const optionalRecommendedVars = [
  'RESEND_API_KEY',
  'CREDENTIAL_SIGNING_SECRET',
  'ADMIN_INBOX_EMAIL'
];

console.log('--- REDKROSS ACADEMY: PRE-FLIGHT ENVIRONMENT CHECK ---');
let hasError = false;

// Check Server Required Variables
for (const varName of requiredProductionVars) {
  const val = process.env[varName];
  if (!val) {
    console.error(`[CRITICAL MISSING] Required environment variable "${varName}" is NOT set.`);
    hasError = true;
  } else {
    // Security check for deprecated hardcoded credentials
    if (val.includes('npg_3RwIaSv9ptBg')) {
      console.warn(`[SECURITY WARNING] "${varName}" appears to contain deprecated/exposed credential signature. Rotation recommended.`);
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
