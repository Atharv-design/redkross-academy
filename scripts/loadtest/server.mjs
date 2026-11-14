// LOAD TEST ONLY - never run against production data.
// Starts the real server on :3100 with Firebase verification replaced by a stub
// (token "tok-<name>" = a verified student <name>@loadtest.test).
//   LOADTEST_DATABASE_URL=postgresql://... node scripts/loadtest/server.mjs
if (!process.env.LOADTEST_DATABASE_URL) {
  console.error('Set LOADTEST_DATABASE_URL to a throwaway database (schema + migrations applied).');
  process.exit(1);
}
process.env.DATABASE_URL = process.env.LOADTEST_DATABASE_URL;
process.env.DB_ENGINE = 'pg';
process.env.CREDENTIAL_SIGNING_SECRET = 'load-secret-'.padEnd(48, 'x');
process.env.NODE_ENV = 'production';
process.env.PORT = '3100';
process.env.HOST = '127.0.0.1';
process.env.ACCESS_LOG = '0';
const { setTokenVerifier } = await import('../../api/_auth.js');
setTokenVerifier(async (t) => {
  const name = String(t).replace(/^tok-/, '');
  if (!/^[a-z0-9_]{1,40}$/.test(name)) throw new Error('bad');
  return { uid: `lt_${name}`, email: `${name}@loadtest.test`, email_verified: true, name: `Load ${name}` };
});
await import('../../server/productionServer.js');
