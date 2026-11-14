/**
 * API integration tests: authentication, authorisation, server-graded assessments
 * and signed credentials. Runs the real handlers against a real PostgreSQL database.
 *
 *   TEST_DATABASE_URL=postgresql://... node tests/api_security_and_assessment.test.mjs
 *
 * The database must already have scripts/schema.sql + scripts/migrations applied
 * (node scripts/runMigrations.js). Token verification is stubbed via setTokenVerifier.
 * Skips (exit 0) when TEST_DATABASE_URL is not set.
 */
if (!process.env.TEST_DATABASE_URL) {
  console.log('SKIP api tests: TEST_DATABASE_URL not set');
  process.exit(0);
}
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.DB_ENGINE = 'pg';
process.env.NODE_ENV = 'test';
process.env.CREDENTIAL_SIGNING_SECRET = 'test-secret-'.padEnd(48, 'x');
process.env.ADMIN_EMAILS = '';
delete process.env.N8N_WEBHOOK_URL;
delete process.env.RESEND_API_KEY;

import fs from 'fs';
const { sql } = await import('../api/_db.js');
const { setTokenVerifier } = await import('../api/_auth.js');
const handlers = {};
for (const name of ['auth', 'admin', 'assessment', 'verify', 'wallet', 'progress', 'enrol', 'support-tickets', 'send-email', 'quiz', 'courses', 'violation']) {
  const importName = fs.existsSync(new URL(`../api/${name}.js`, import.meta.url)) ? name : `_${name}`;
  handlers[name] = (await import(`../api/${importName}.js`)).default;
}

const RUN = Date.now().toString(36);
const people = {
  alice: { uid: `alice${RUN}`, email: `alice.${RUN}@example.com`, email_verified: true, name: 'Alice Test' },
  bob: { uid: `bob${RUN}`, email: `bob.${RUN}@example.com`, email_verified: true, name: 'Bob Admin' },
  mallory: { uid: `mal${RUN}`, email: `alice.${RUN}@example.com`, email_verified: false, name: 'Mallory' },
};
setTokenVerifier(async (token) => {
  const who = token.replace(/^tok-/, '');
  if (!people[who]) throw new Error('bad token');
  return people[who];
});

let passed = 0;
let failed = 0;
function check(cond, label, extra) {
  if (cond) {
    passed++;
    console.log(`[PASS] ${label}`);
  } else {
    failed++;
    console.log(`[FAIL] ${label}`, extra !== undefined ? JSON.stringify(extra).slice(0, 300) : '');
  }
}

async function call(name, { method = 'GET', token, auth, query = {}, body } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer tok-${token}`;
  if (auth) headers.authorization = auth;
  const res = {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v;
    },
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
  await handlers[name]({ method, headers, query, body }, res);
  return res;
}

const COURSE = 'crs_cyber_soc_08';

// ---------------------------------------------------------------- authentication
let r = await call('auth', { method: 'POST', body: { uid: 'usr_admin_01', email: 'admin@redkross.org.in' } });
check(r.statusCode === 401, 'POST /api/auth with identity only in the body is rejected (401)', r.statusCode);

r = await call('auth', { method: 'POST', token: 'alice', body: { full_name: 'Alice Test', role: 'super_admin' } });
check(r.statusCode === 200 && r.body.user.role === 'student', 'token sign-up creates a student (body role ignored)', r.body);
check(r.body.user.token_balance === 150, 'welcome grant credited once (150)', r.body.user.token_balance);
const aliceId = r.body.user.id;

r = await call('auth', { method: 'POST', token: 'alice' });
check(r.body.user.token_balance === 150, 'second sign-in does not re-grant welcome tokens', r.body.user.token_balance);

r = await call('auth', { method: 'POST', token: 'mallory' });
check(r.statusCode === 409, 'unverified login with an existing email cannot take over the account (409)', r.statusCode);

// ---------------------------------------------------------------- admin backdoors
for (const fake of ['Bearer usr_super_admin_dev', 'Bearer usr_admin_01', `Bearer ${aliceId}`]) {
  r = await call('admin', { auth: fake });
  check(r.statusCode === 401, `admin API rejects legacy "${fake.slice(0, 30)}" bearer`, r.statusCode);
}
r = await call('admin', { token: 'alice' });
check(r.statusCode === 403, 'admin API rejects an authenticated student (403)', r.statusCode);

await call('auth', { method: 'POST', token: 'bob' });
const bobId = (await sql`SELECT id FROM users WHERE email = ${people.bob.email}`)[0].id;
await sql`UPDATE users SET role = 'super_admin' WHERE id = ${bobId}`;
r = await call('admin', { token: 'bob' });
check(r.statusCode === 200 && Array.isArray(r.body.students), 'admin API allows a verified super_admin', r.statusCode);

r = await call('courses', { query: { preview: 'admin' } });
check(r.statusCode === 200 && r.body.courses.length === 0, '?preview=admin no longer bypasses the catalog embargo', r.body);

// ---------------------------------------------------------------- assessments
r = await call('assessment', { method: 'POST', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m1' } });
check(r.statusCode === 401, 'assessment requires authentication', r.statusCode);

r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'exam_c08_final' } });
check(r.statusCode === 403 && r.body.error === 'FINAL_LOCKED', 'final assessment locked until module quizzes are passed', r.body);

r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m1' } });
check(r.statusCode === 200 && r.body.questions.length === 10, 'module quiz starts with 10 questions', r.body);
const raw = JSON.stringify(r.body);
check(!/"(correct|correctOptionId|correct_option_id|is_correct|explanation)"\s*:/.test(raw), 'start response contains no answer fields', raw.slice(0, 200));
const s1 = r.body.session_id;

r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m1' } });
check(r.body.session_id === s1 && r.body.resumed, 'restarting resumes the open session (no question re-rolling)', r.body.session_id);

r = await call('assessment', { method: 'POST', token: 'bob', body: { action: 'submit', session_id: s1, answers: {} } });
check(r.statusCode === 404, "another user cannot submit Alice's session", r.statusCode);

r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'submit', session_id: s1, answers: {} } });
check(r.statusCode === 200 && r.body.is_passed === false && r.body.attempts.used === 1, 'blank submission fails and uses 1 attempt', r.body);
check(!JSON.stringify(r.body.review).includes('correct_option_id'), 'failed attempt does not reveal answers', r.body.review?.[0]);

r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'submit', session_id: s1, answers: {} } });
check(r.statusCode === 409, 'double submit is rejected', r.statusCode);

for (let i = 2; i <= 3; i++) {
  const st = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m1' } });
  r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'submit', session_id: st.body.session_id, answers: {} } });
}
check(r.body.attempts.remaining === 0 && r.body.attempts.locked_until, 'third failure locks the quiz for 24h', r.body.attempts);
r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m1' } });
check(r.statusCode === 423, 'locked quiz cannot be started (423)', r.statusCode);

// expire the lock, then pass every module quiz with the server-held answers
await sql`UPDATE assessment_windows SET locked_until = NOW() - INTERVAL '1 minute' WHERE user_id = ${aliceId}`;
async function passQuiz(quizId) {
  const st = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: quizId } });
  const row = (await sql`SELECT questions FROM assessment_sessions WHERE id = ${st.body.session_id}`)[0];
  const answers = Object.fromEntries(row.questions.map((q) => [q.id, q.correctOptionId]));
  return call('assessment', { method: 'POST', token: 'alice', body: { action: 'submit', session_id: st.body.session_id, answers } });
}
r = await passQuiz('quiz_c08_m1');
check(r.body.is_passed && r.body.score_percentage === 100 && r.body.tokens_awarded === 100, 'correct answers pass, award 100 tokens', r.body);
check(r.body.review.every((x) => x.correct_option_id), 'passed attempt includes the full review', r.body.review?.[0]);

// proctoring forfeit uses an attempt
let st = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: COURSE, quiz_id: 'quiz_c08_m2' } });
r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'forfeit', session_id: st.body.session_id, reason: 'TAB_SWITCH' } });
check(r.body.forfeited && r.body.attempts.locked_until, 'proctoring forfeit (strike 3) locks the assessment for 24h', r.body);
await sql`UPDATE assessment_windows SET locked_until = NOW() - INTERVAL '1 minute' WHERE user_id = ${aliceId}`;

for (let m = 2; m <= 8; m++) await passQuiz(`quiz_c08_m${m}`);
r = await call('assessment', { token: 'alice', query: { course_id: COURSE } });
check(r.body.final_unlocked === true && r.body.passed_quizzes.length === 8, 'status shows 8 passes and final unlocked', r.body);

r = await passQuiz('exam_c08_final');
check(r.body.is_passed && r.body.total_questions === 40, 'final assessment (40 questions) passed', r.body);
const cred = r.body.credential;
check(cred && /^RK-C08-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(cred.verification_id), 'signed credential issued with CSPRNG verification id', cred);

r = await call('verify', { query: { id: cred.verification_id } });
check(r.body.cryptographic_verification?.status === 'VERIFIED_AUTHENTIC', 'public verify: VERIFIED_AUTHENTIC', r.body);
check(r.body.credential && !('user_id' in r.body.credential) && !('email' in r.body.credential), 'public verify exposes no user id or email', r.body.credential);

await sql`UPDATE credentials SET grade_percentage = 55 WHERE verification_id = ${cred.verification_id}`;
r = await call('verify', { query: { id: cred.verification_id } });
check(r.body.cryptographic_verification?.status === 'SIGNATURE_INVALID', 'tampered credential detected (SIGNATURE_INVALID)', r.body.cryptographic_verification);

await sql`INSERT INTO credentials (id, verification_id, student_name, credential_title, status) VALUES (${`cred_forged_${RUN}`}, ${`RK-FAKE-${RUN}`}, 'Forger', 'Fake', 'Active')`;
r = await call('verify', { query: { id: `RK-FAKE-${RUN}` } });
check(r.body.cryptographic_verification?.verified === false, 'row inserted without a signature is not reported as authentic', r.body.cryptographic_verification);

r = await call('admin', { method: 'POST', token: 'bob', body: { action: 'REVOKE_CREDENTIAL', verification_id: cred.verification_id } });
r = await call('verify', { query: { id: cred.verification_id } });
check(r.body.cryptographic_verification?.status === 'REVOKED', 'revoked credential reported as REVOKED', r.body.cryptographic_verification);

// legacy course still served by the server-side banks
r = await call('assessment', { method: 'POST', token: 'alice', body: { action: 'start', course_id: 'crs_cyber_python_04', quiz_id: 'quiz_mod_c4_1' } });
check(r.statusCode === 200 && r.body.questions.length === 20 && !/is_correct/.test(JSON.stringify(r.body)), 'legacy course quiz served without answers (20 Qs)', r.statusCode);

// ---------------------------------------------------------------- other endpoints
r = await call('wallet', { token: 'alice' });
check(r.body.balance === 150 + 8 * 100 + 300, 'wallet = welcome 150 + 8 module passes x100 + final 300', r.body.balance);

r = await call('progress', { method: 'POST', token: 'alice', body: { course_id: COURSE, lesson_id: 'les_c08_m1_l01' } });
r = await call('progress', { token: 'alice', query: { course_id: COURSE } });
check(r.body.completed_lessons?.includes('les_c08_m1_l01'), 'lesson completion recorded server-side', r.body);

r = await call('support-tickets', {});
check(r.statusCode === 401, 'listing support tickets requires auth (was public)', r.statusCode);
await call('support-tickets', { method: 'POST', token: 'alice', body: { category: 'Billing', subject: 'Hi', description: 'Help' } });
await call('support-tickets', { method: 'POST', body: { user_email: 'guest@example.com', category: 'General', subject: 'Guest', description: 'Q' } });
r = await call('support-tickets', { token: 'alice' });
check(r.body.tickets.length === 1 && r.body.tickets[0].user_email === people.alice.email, 'users only see their own tickets', r.body.tickets?.length);

r = await call('send-email', { method: 'POST', body: { sender_email: 'x@example.com', message: 'hi', to: 'victim@example.com' } });
check(r.statusCode === 503, 'send-email without mail config refuses (and never takes a caller-chosen recipient)', r.statusCode);

r = await call('quiz', { method: 'POST', body: { enrolment_id: 'x', quiz_id: 'y', answers: {}, user_id: aliceId } });
check(r.statusCode === 410, 'legacy unauthenticated /api/quiz retired (410)', r.statusCode);

r = await call('enrol', { auth: 'Bearer usr_super_admin_dev', query: { userId: aliceId } });
check(r.statusCode === 401, "enrolments can't be read with someone's user id", r.statusCode);

console.log(`\n--- API TESTS: ${passed} PASSED, ${failed} FAILED ---`);
if (sql.pool) await sql.pool.end();
process.exit(failed ? 1 : 0);
