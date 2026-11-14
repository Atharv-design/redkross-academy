/**
 * Proctoring evidence API + admin review (real handlers, real PostgreSQL).
 *   TEST_DATABASE_URL=postgresql://... node tests/api_proctoring.test.mjs
 */
if (!process.env.TEST_DATABASE_URL) {
  console.log('SKIP proctoring tests: TEST_DATABASE_URL not set');
  process.exit(0);
}
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.DB_ENGINE = 'pg';
process.env.NODE_ENV = 'test';
process.env.CREDENTIAL_SIGNING_SECRET = 'test-secret-'.padEnd(48, 'x');
process.env.ADMIN_EMAILS = '';

const { sql } = await import('../api/_db.js');
const { setTokenVerifier } = await import('../api/_auth.js');
const handlers = {};
for (const name of ['auth', 'assessment', 'proctor', 'manage']) handlers[name] = (await import(`../api/${name}.js`)).default;

const RUN = Date.now().toString(36);
const people = {
  cand: { uid: `pc${RUN}`, email: `cand.${RUN}@example.com`, email_verified: true, name: 'Proctor Candidate' },
  other: { uid: `po${RUN}`, email: `other.${RUN}@example.com`, email_verified: true, name: 'Other Student' },
  boss: { uid: `pb${RUN}`, email: `boss.${RUN}@example.com`, email_verified: true, name: 'Proctor Admin' },
};
setTokenVerifier(async (t) => {
  const p = people[t.replace(/^tok-/, '')];
  if (!p) throw new Error('bad');
  return p;
});

let passed = 0;
let failed = 0;
const check = (c, label, extra) => {
  if (c) {
    passed++;
    console.log(`[PASS] ${label}`);
  } else {
    failed++;
    console.log(`[FAIL] ${label}`, extra !== undefined ? JSON.stringify(extra).slice(0, 300) : '');
  }
};
async function call(name, { method = 'GET', token, query = {}, body } = {}) {
  const res = {
    statusCode: 200,
    body: undefined,
    setHeader() {},
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(d) {
      this.body = d;
      return this;
    },
    end() {
      return this;
    },
  };
  await handlers[name]({ method, headers: token ? { authorization: `Bearer tok-${token}` } : {}, query, body }, res);
  return res;
}

for (const w of Object.keys(people)) await call('auth', { method: 'POST', token: w });
const bossId = (await sql`SELECT id FROM users WHERE email = ${people.boss.email}`)[0].id;
await sql`UPDATE users SET role = 'admin' WHERE id = ${bossId}`;

const COURSE = 'crs_cyber_soc_08';
const QUIZ = 'quiz_c08_m2';
let r = await call('assessment', { method: 'POST', token: 'cand', body: { action: 'start', course_id: COURSE, quiz_id: QUIZ } });
check(r.statusCode === 200 && r.body.session_id, 'candidate starts a quiz', r.body);
const sessionId = r.body.session_id;

// a tiny real JPEG (SOI marker + padding is enough for the type check)
const jpeg = `data:image/jpeg;base64,${Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(200, 1)]).toString('base64')}`;

r = await call('proctor', { method: 'POST', token: 'cand', body: { session_id: sessionId, kind: 'phone', detail: 'phone detected (confidence 72%)', snapshot: jpeg } });
check(r.statusCode === 200 && r.body.snapshot_stored === true, 'phone event with snapshot stored for own session', r.body);
r = await call('proctor', { method: 'POST', token: 'cand', body: { session_id: sessionId, kind: 'looking_away', detail: 'head turned' } });
check(r.statusCode === 200, 'looking-away event stored', r.body);
r = await call('proctor', { method: 'POST', token: 'other', body: { session_id: sessionId, kind: 'phone', snapshot: jpeg } });
check(r.statusCode === 404, "another student cannot add evidence to someone else's session", r.statusCode);
r = await call('proctor', { method: 'POST', token: 'cand', body: { session_id: sessionId, kind: 'hacked' } });
check(r.statusCode === 400, 'unknown event kind rejected', r.statusCode);
const png = `data:image/jpeg;base64,${Buffer.from('<svg onload=alert(1)>').toString('base64')}`;
r = await call('proctor', { method: 'POST', token: 'cand', body: { session_id: sessionId, kind: 'periodic', snapshot: png } });
check(r.statusCode === 200 && r.body.snapshot_stored === false, 'non-JPEG data disguised as a snapshot is not stored', r.body);
r = await call('proctor', { method: 'POST', body: { session_id: sessionId, kind: 'phone' } });
check(r.statusCode === 401, 'anonymous evidence rejected', r.statusCode);

// pass the quiz, then void it on review
const [sess] = await sql`SELECT questions FROM assessment_sessions WHERE id = ${sessionId}`;
const answers = Object.fromEntries(sess.questions.map((q) => [q.id, q.correctOptionId]));
r = await call('assessment', { method: 'POST', token: 'cand', body: { action: 'submit', session_id: sessionId, answers } });
check(r.body.is_passed === true, 'candidate passes the quiz', r.body);

r = await call('manage', { token: 'cand', query: { resource: 'proctor_sessions' } });
check(r.statusCode === 403, 'students cannot read proctoring evidence', r.statusCode);
r = await call('manage', { token: 'boss', query: { resource: 'proctor_sessions', q: people.cand.email } });
const row = r.body.sessions?.find((s) => s.id === sessionId);
check(row && row.phone === 1 && row.looking_away === 1 && !row.review_status, 'admin sees the flagged attempt with counts', r.body);
r = await call('manage', { token: 'boss', query: { resource: 'proctor_session', id: sessionId } });
check(r.body.events?.some((e) => e.kind === 'phone' && e.snapshot?.startsWith('data:image/jpeg')), 'admin sees the snapshot timeline', r.body.events?.length);

r = await call('manage', { method: 'POST', token: 'boss', body: { action: 'proctor_review', session_id: sessionId, decision: 'VOIDED', note: 'phone visible in 3 frames' } });
check(r.statusCode === 200, 'admin voids the attempt', r.body);
const passes = await sql`SELECT 1 FROM assessment_passes WHERE session_id = ${sessionId}`;
check(passes.length === 0, 'voiding removes the pass earned in that session');
r = await call('manage', { token: 'boss', query: { resource: 'proctor_sessions', q: people.cand.email } });
check(!r.body.sessions?.some((s) => s.id === sessionId), 'voided attempt leaves the review queue');

console.log(`\n--- PROCTORING TESTS: ${passed} PASSED, ${failed} FAILED ---`);
if (sql.pool) await sql.pool.end();
process.exit(failed ? 1 : 0);
