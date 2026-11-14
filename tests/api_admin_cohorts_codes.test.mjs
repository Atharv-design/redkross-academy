/**
 * API integration tests: admin console, batches (cohorts), access codes,
 * registration links, course access control and student profiles.
 *
 *   TEST_DATABASE_URL=postgresql://... node tests/api_admin_cohorts_codes.test.mjs
 *
 * Needs scripts/schema.sql + scripts/migrations applied. Skips when TEST_DATABASE_URL is unset.
 */
if (!process.env.TEST_DATABASE_URL) {
  console.log('SKIP admin/cohort/code tests: TEST_DATABASE_URL not set');
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
for (const name of ['auth', 'manage', 'redeem', 'enrol', 'catalog', 'profile', 'avatar', 'assessment']) {
  const importName = fs.existsSync(new URL(`../api/${name}.js`, import.meta.url)) ? name : `_${name}`;
  handlers[name] = (await import(`../api/${importName}.js`)).default;
}

const RUN = Date.now().toString(36);
const DOMAIN = `college${RUN}.edu.in`;
const people = {
  admin: { uid: `adm${RUN}`, email: `admin.${RUN}@example.com`, email_verified: true, name: 'Ada Admin' },
  helper: { uid: `hlp${RUN}`, email: `helper.${RUN}@example.com`, email_verified: true, name: 'Hal Helper' },
  stu1: { uid: `s1${RUN}`, email: `s1@cs.${DOMAIN}`, email_verified: true, name: 'Student One' },
  stu2: { uid: `s2${RUN}`, email: `s2.${RUN}@gmail.com`, email_verified: true, name: 'Student Two' },
  listed: { uid: `ls${RUN}`, email: `listed.${RUN}@gmail.com`, email_verified: true, name: 'Listed Student' },
  fake: { uid: `fk${RUN}`, email: `fake@${DOMAIN}`, email_verified: false, name: 'Unverified' },
  outsider: { uid: `out${RUN}`, email: `outsider.${RUN}@example.com`, email_verified: true, name: 'Out Sider' },
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
    console.log(`[FAIL] ${label}`, extra !== undefined ? JSON.stringify(extra).slice(0, 400) : '');
  }
}

async function call(name, { method = 'GET', token, query = {}, body } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer tok-${token}`;
  const res = {
    statusCode: 200,
    body: undefined,
    raw: undefined,
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
    send(d) {
      this.raw = d;
      return this;
    },
    end(d) {
      if (d !== undefined) this.raw = d;
      return this;
    },
  };
  await handlers[name]({ method, headers, query, body }, res);
  return res;
}
const manage = (token, body) => call('manage', { method: 'POST', token, body });
const read = (token, resource, q = {}) => call('manage', { token, query: { resource, ...q } });

const PAID = 'crs_cyber_cloud_11';
const PAID2 = 'crs_cyber_ad_13';
const PRIVATE = 'crs_cyber_k8s_21';
const FREE = 'crs_cyber_intro_01';

for (const who of Object.keys(people)) if (who !== 'fake') await call('auth', { method: 'POST', token: who });
const id = async (who) => (await sql`SELECT id FROM users WHERE email = ${people[who].email}`)[0].id;
const adminId = await id('admin');
await sql`UPDATE users SET role = 'super_admin' WHERE id = ${adminId}`;
const helperId = await id('helper');
const s1 = await id('stu1');
const s2 = await id('stu2');

// ------------------------------------------------------------------ admin gate
let r = await read('stu1', 'overview');
check(r.statusCode === 403, 'admin console API rejects students (403)', r.statusCode);
r = await call('manage', { query: { resource: 'overview' } });
check(r.statusCode === 401, 'admin console API rejects anonymous callers (401)', r.statusCode);
r = await read('admin', 'me');
check(r.statusCode === 200 && r.body.is_super_admin === true, 'super admin recognised', r.body);
r = await read('admin', 'overview');
check(r.statusCode === 200 && typeof r.body.counts.students === 'number', 'overview returns live counts', r.body);

// ------------------------------------------------------------------ roles
r = await manage('admin', { action: 'set_role', email: people.helper.email, role: 'admin' });
check(r.statusCode === 200, 'super admin promotes a user to admin', r.body);
r = await manage('helper', { action: 'set_role', user_id: s1, role: 'super_admin' });
check(r.statusCode === 403, 'plain admin cannot change roles', r.statusCode);
r = await manage('admin', { action: 'set_role', user_id: adminId, role: 'student' });
check(r.statusCode === 400, 'admin cannot demote themself', r.statusCode);

// ------------------------------------------------------------------ course settings + access control
r = await manage('admin', { action: 'course_update', course_id: PAID, visibility: 'PUBLISHED', price_inr: 4999 });
check(r.statusCode === 200, 'course price set to 4999', r.body);
await manage('admin', { action: 'course_update', course_id: PAID2, visibility: 'PUBLISHED', price_inr: 2999 });
await manage('admin', { action: 'course_update', course_id: PRIVATE, visibility: 'HIDDEN', price_inr: 0 });
r = await manage('admin', { action: 'course_update', course_id: 'crs_nope', visibility: 'PUBLISHED', price_inr: 0 });
check(r.statusCode === 404, 'unknown course rejected', r.statusCode);
r = await manage('admin', { action: 'course_update', course_id: PAID, visibility: 'EVERYONE', price_inr: -1 });
check(r.statusCode === 400, 'invalid visibility/price rejected', r.statusCode);

r = await call('catalog', {});
check(r.body.settings[PAID].price_inr === 4999 && r.body.settings.crs_psych_cbt.visibility === 'COMING_SOON', 'public catalog exposes price and psychology "coming soon"', r.body.settings?.[PAID]);

r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: PAID } });
check(r.statusCode === 403 && r.body.reason === 'PAYMENT_REQUIRED', 'paid course cannot be enrolled without a code', r.body);
r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: PRIVATE } });
check(r.statusCode === 403 && r.body.reason === 'NOT_AVAILABLE', 'hidden course cannot be enrolled', r.body);
r = await call('assessment', { method: 'POST', token: 'stu2', body: { action: 'start', course_id: PAID, quiz_id: 'quiz_c11_m1' } });
check(r.statusCode === 403 && r.body.error === 'COURSE_LOCKED', 'assessments of a locked course cannot be started', r.body);
r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: FREE } });
check(r.statusCode === 200, 'free published course still enrols normally', r.body);

// ------------------------------------------------------------------ individual codes
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `free-${RUN}`, discount_percent: 100, course_scope: 'SELECTED', course_ids: [PAID], max_redemptions: 1, label: 'Scholarship' });
check(r.statusCode === 200 && r.body.codes[0].code === `FREE-${RUN}`.toUpperCase(), 'custom 100% code created (normalised upper-case)', r.body);
const freeCode = r.body.codes[0];
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `free-${RUN}`, discount_percent: 100, course_scope: 'SELECTED', course_ids: [PAID] });
check(r.statusCode === 409, 'duplicate custom code rejected', r.statusCode);
r = await manage('admin', { action: 'code_create', kind: 'CODE', discount_percent: 100, course_scope: 'SELECTED', course_ids: [] });
check(r.statusCode === 400 && r.body.fields?.course_ids, 'code without courses rejected with a field error', r.body);

r = await call('redeem', { token: 'stu2', query: { code: freeCode.code.toLowerCase(), course_id: PAID } });
check(r.statusCode === 200 && r.body.details.free && r.body.details.courses[0].id === PAID, 'preview describes the code (case-insensitive)', r.body);
r = await call('redeem', { token: 'stu2', query: { code: freeCode.code, course_id: FREE } });
check(r.statusCode === 400 && r.body.reason === 'NOT_FOR_COURSE', 'code does not apply to other courses', r.body);
r = await call('redeem', { method: 'POST', token: 'stu2', body: { code: freeCode.code, course_id: PAID } });
check(r.statusCode === 200 && r.body.enrolled_course_ids.includes(PAID), 'redeeming unlocks and enrols the paid course', r.body);
r = await call('redeem', { method: 'POST', token: 'stu2', body: { code: freeCode.code, course_id: PAID } });
check(r.statusCode === 200 && r.body.first_time === false, 're-redeeming by the same student is idempotent', r.body);
r = await call('redeem', { method: 'POST', token: 'outsider', body: { code: freeCode.code, course_id: PAID } });
check(r.statusCode === 400 && r.body.reason === 'USED_UP', 'single-use code cannot be used by a second student', r.body);
r = await call('assessment', { method: 'POST', token: 'stu2', body: { action: 'start', course_id: PAID, quiz_id: 'quiz_c11_m1' } });
check(r.statusCode === 200 && r.body.questions?.length === 10, 'unlocked student can start the paid course quiz', r.statusCode);

// percent discount (no payment gateway yet)
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `half-${RUN}`, discount_percent: 50, course_scope: 'ALL' });
const halfCode = r.body.codes[0];
r = await call('redeem', { method: 'POST', token: 'outsider', body: { code: halfCode.code, course_id: PAID2 } });
check(r.statusCode === 402 && r.body.reason === 'PAYMENT_NOT_AVAILABLE' && r.body.discount_percent === 50, '50% code is validated but does not unlock without payment', r.body);
r = await read('admin', 'code', { id: halfCode.id });
check(r.body.code.redemption_count === 0, 'partial-discount validation does not consume a use', r.body.code);

// activate / deactivate
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `toggle-${RUN}`, discount_percent: 100, course_scope: 'SELECTED', course_ids: [PAID2] });
const toggle = r.body.codes[0];
await manage('admin', { action: 'code_set_active', id: toggle.id, active: false });
r = await call('redeem', { method: 'POST', token: 'outsider', body: { code: toggle.code, course_id: PAID2 } });
check(r.statusCode === 400 && r.body.reason === 'INACTIVE', 'deactivated code is refused', r.body);
await manage('admin', { action: 'code_set_active', id: toggle.id, active: true });
r = await call('redeem', { method: 'POST', token: 'outsider', body: { code: toggle.code, course_id: PAID2 } });
check(r.statusCode === 200, 'reactivated code works again', r.body);
r = await manage('admin', { action: 'code_set_active', id: toggle.id, active: false });
r = await call('enrol', { method: 'POST', token: 'outsider', body: { course_id: PAID2 } });
check(r.statusCode === 200, 'deactivating a code later does not take access away from students who used it', r.body);
r = await manage('admin', { action: 'code_update', id: toggle.id, discount_percent: 20 });
check(r.statusCode === 409, 'what a used code grants cannot be changed', r.statusCode);
r = await manage('admin', { action: 'code_delete', id: toggle.id });
check(r.statusCode === 409, 'used code cannot be deleted', r.statusCode);

// expiry
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `old-${RUN}`, discount_percent: 100, course_scope: 'ALL', starts_at: '2020-01-01', expires_at: '2020-02-01' });
r = await call('redeem', { method: 'POST', token: 'outsider', body: { code: `old-${RUN}` } });
check(r.statusCode === 400 && r.body.reason === 'EXPIRED', 'expired code refused', r.body);

// bulk single-use codes
r = await manage('admin', { action: 'code_create', kind: 'CODE', quantity: 25, prefix: 'rk', discount_percent: 100, course_scope: 'SELECTED', course_ids: [PAID2] });
check(r.statusCode === 200 && r.body.codes.length === 25 && new Set(r.body.codes.map((c) => c.code)).size === 25 && r.body.codes.every((c) => c.max_redemptions === 1 && c.code.startsWith('RK-')), '25 unique single-use codes generated', r.body.codes?.length);

// usage limit under concurrency
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `race-${RUN}`, discount_percent: 100, course_scope: 'SELECTED', course_ids: [PAID2], max_redemptions: 2 });
const racers = [];
for (let i = 0; i < 6; i++) {
  people[`r${i}`] = { uid: `r${i}${RUN}`, email: `r${i}.${RUN}@example.com`, email_verified: true, name: `Racer ${i}` };
  await call('auth', { method: 'POST', token: `r${i}` });
  racers.push(`r${i}`);
}
const results = await Promise.all(racers.map((t) => call('redeem', { method: 'POST', token: t, body: { code: `race-${RUN}`, course_id: PAID2 } })));
const wins = results.filter((x) => x.statusCode === 200).length;
const count = (await sql`SELECT redemption_count FROM access_codes WHERE code = ${`RACE-${RUN}`.toUpperCase()}`)[0].redemption_count;
check(wins === 2 && count === 2, 'usage limit of 2 holds with 6 simultaneous redemptions', { wins, count });

// brute force
for (let i = 0; i < 10; i++) await call('redeem', { token: 'outsider', query: { code: `GUESS${i}${RUN}` } });
r = await call('redeem', { token: 'outsider', query: { code: halfCode.code } });
check(r.statusCode === 429, 'ten wrong codes in an hour locks out further guesses', r.statusCode);

// ------------------------------------------------------------------ batches (cohorts) + registration links
r = await manage('admin', {
  action: 'cohort_save',
  name: `Test College Dec ${RUN}`,
  organisation: 'Test College',
  allowed_domains: `@${DOMAIN}, not a domain`,
  course_ids: [PAID, PRIVATE, 'crs_unknown'],
  allowed_emails: `${people.listed.email}\nbad-email`,
});
check(r.statusCode === 200 && r.body.id, 'batch created', r.body);
const cohortId = r.body.id;
r = await read('admin', 'cohort', { id: cohortId });
check(
  r.body.cohort.allowed_domains.length === 1 && r.body.courses.length === 2 && r.body.allowed_emails.length === 1,
  'batch keeps only valid domains, known courses and valid emails',
  r.body
);

r = await manage('admin', { action: 'code_create', kind: 'LINK', discount_percent: 100, course_scope: 'COHORT', cohort_id: cohortId, label: 'Dec intake link' });
check(r.statusCode === 200 && r.body.codes[0].link?.includes('/join/') && r.body.codes[0].code.length >= 20, 'registration link created with a long token', r.body);
const link = r.body.codes[0];

r = await call('redeem', { token: 'outsider', query: { code: link.code } });
// outsider is rate-limited from the brute-force test; use a fresh account for eligibility
people.out2 = { uid: `o2${RUN}`, email: `o2.${RUN}@example.com`, email_verified: true, name: 'Out Two' };
await call('auth', { method: 'POST', token: 'out2' });
r = await call('redeem', { method: 'POST', token: 'out2', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 400 && r.body.reason === 'NOT_ELIGIBLE', 'student outside the college domain/list cannot join via the link', r.body);
r = await call('redeem', { method: 'POST', token: 'fake', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 401 || r.body.reason === 'EMAIL_NOT_VERIFIED', 'unverified college email cannot join', r.body);

r = await call('redeem', { method: 'POST', token: 'stu1', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 200 && r.body.joined_cohort && r.body.enrolled_course_ids.length === 2, 'college-domain student (sub-domain) joins and is enrolled in the whole bundle', r.body);
r = await call('redeem', { method: 'POST', token: 'listed', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 200 && r.body.joined_cohort, 'allow-listed email (gmail) joins the batch', r.body);
r = await call('enrol', { method: 'POST', token: 'stu1', body: { course_id: PRIVATE } });
check(r.statusCode === 200, 'batch member can use the hidden (private) bundle course', r.body);

r = await call('catalog', { token: 'stu1' });
check(r.body.unlocked_course_ids.includes(PAID) && r.body.unlocked_course_ids.includes(PRIVATE), 'catalog lists the unlocked bundle for the member', r.body.unlocked_course_ids);

// course added to the bundle later is unlocked for existing members
await manage('admin', { action: 'cohort_save', id: cohortId, name: `Test College Dec ${RUN}`, organisation: 'Test College', allowed_domains: DOMAIN, course_ids: [PAID, PRIVATE, PAID2] });
r = await call('catalog', { token: 'stu1' });
check(r.body.unlocked_course_ids.includes(PAID2), 'course added to the bundle later is unlocked for existing members', r.body.unlocked_course_ids);

// admin adds by email
people.late = { uid: `lt${RUN}`, email: `late.${RUN}@yahoo.com`, email_verified: true, name: 'Late Joiner' };
r = await manage('admin', { action: 'cohort_add_members', cohort_id: cohortId, emails: `${people.stu2.email}, ${people.late.email}` });
check(r.statusCode === 200 && r.body.added_now === 1 && r.body.waiting_for_signup === 1, 'admin adds members by email (existing joins now, new is allow-listed)', r.body);
await call('auth', { method: 'POST', token: 'late' });
r = await call('redeem', { method: 'POST', token: 'late', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 200, 'allow-listed person signs up later and joins via the link', r.body);

// removal sticks
r = await manage('admin', { action: 'cohort_remove_member', cohort_id: cohortId, user_id: s2 });
check(r.statusCode === 200, 'admin removes a member', r.body);
r = await call('redeem', { method: 'POST', token: 'stu2', body: { code: link.code, via: 'LINK' } });
check(r.statusCode === 400 && r.body.reason === 'REMOVED_FROM_COHORT', 'removed member cannot re-join through the link', r.body);
r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: PRIVATE } });
check(r.statusCode === 403, 'removed member loses bundle access to courses they never started', r.body);

// cohort-only coupon: only batch-eligible students may use it
r = await manage('admin', { action: 'code_create', kind: 'CODE', code: `batch-${RUN}`, discount_percent: 100, course_scope: 'SELECTED', course_ids: [FREE], cohort_id: cohortId });
r = await call('redeem', { method: 'POST', token: 'out2', body: { code: `batch-${RUN}` } });
check(r.statusCode === 400 && r.body.reason === 'NOT_ELIGIBLE', 'batch-restricted code refused for outsiders', r.body);

// archive closes the batch
await manage('admin', { action: 'cohort_set_status', id: cohortId, archived: true });
r = await call('catalog', { token: 'listed' });
check(!r.body.unlocked_course_ids.includes(PAID2), 'archiving a batch closes its bundle', r.body.unlocked_course_ids);
await manage('admin', { action: 'cohort_set_status', id: cohortId, archived: false });

// exports
r = await read('admin', 'export', { type: 'cohort_members', id: cohortId });
check(r.headers['content-type']?.startsWith('text/csv') && String(r.raw).includes(people.stu1.email), 'batch members export as CSV', r.headers);
await sql`UPDATE users SET college = '=HYPERLINK("http://evil")' WHERE id = ${s1}`;
r = await read('admin', 'export', { type: 'cohort_members', id: cohortId });
check(String(r.raw).includes(`"'=HYPERLINK(""http://evil"")"`), 'CSV export neutralises spreadsheet formulas', String(r.raw).slice(0, 300));

// ------------------------------------------------------------------ admin student tools
r = await read('admin', 'students', { q: people.stu1.email });
check(r.body.students.length === 1 && r.body.students[0].cohorts?.includes('Test College'), 'student search shows batch membership', r.body);
r = await read('admin', 'student', { id: s1 });
check(r.body.enrolments.length >= 2 && r.body.cohorts.length === 1, 'student detail shows enrolments and batches', r.body);
r = await manage('admin', { action: 'grant_access', user_id: s2, course_ids: [PRIVATE] });
r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: PRIVATE } });
check(r.statusCode === 200, 'admin grants a single course to a student', r.body);
r = await manage('admin', { action: 'revoke_access', user_id: s2, course_id: PRIVATE, remove_enrolment: true });
r = await call('enrol', { method: 'POST', token: 'stu2', body: { course_id: PRIVATE } });
check(r.statusCode === 403, 'admin revokes access (and enrolment)', r.body);
r = await manage('admin', { action: 'set_status', user_id: s2, status: 'SUSPENDED' });
r = await call('profile', { token: 'stu2' });
check(r.statusCode === 403, 'suspended student is blocked', r.statusCode);
await manage('admin', { action: 'set_status', user_id: s2, status: 'ACTIVE' });

// ------------------------------------------------------------------ profiles
r = await call('profile', { method: 'PUT', token: 'stu1', body: {
  full_name: 'Student One Renamed', college: 'Test College', degree: 'B.Tech CSE', graduation_year: 2027, city: 'Chennai',
  linkedin_url: 'linkedin.com/in/student-one?trk=x', github_url: 'https://github.com/student-one', bio: 'Hi', role: 'super_admin',
} });
check(r.statusCode === 200 && r.body.profile.full_name === 'Student One Renamed' && r.body.profile.linkedin_url === 'https://linkedin.com/in/student-one' && r.body.profile.role === 'student', 'student edits profile (URL normalised, role ignored)', r.body);
r = await call('profile', { method: 'PUT', token: 'stu1', body: { linkedin_url: 'https://evil.example/in/x', graduation_year: 1800 } });
check(r.statusCode === 400 && r.body.fields.linkedin_url && r.body.fields.graduation_year, 'invalid LinkedIn URL and year rejected', r.body);
r = await call('auth', { method: 'POST', token: 'stu1', body: { full_name: 'Google Name' } });
check(r.body.user.full_name === 'Student One Renamed', 'signing in again does not overwrite the edited name', r.body.user);

const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000001e221bc330000000049454e44ae426082', 'hex');
r = await call('profile', { method: 'POST', token: 'stu1', body: { action: 'avatar', data_url: `data:image/png;base64,${png.toString('base64')}` } });
check(r.statusCode === 200 && r.body.profile.avatar.startsWith('/api/avatar?u='), 'photo upload stored and served from /api/avatar', r.body.profile);
r = await call('avatar', { query: { u: s1 } });
check(r.statusCode === 200 && r.headers['content-type'] === 'image/png' && r.headers['x-content-type-options'] === 'nosniff', 'avatar served as image with nosniff', r.headers);
r = await call('profile', { method: 'POST', token: 'stu1', body: { action: 'avatar', data_url: `data:image/png;base64,${Buffer.from('<script>alert(1)</script>').toString('base64')}` } });
check(r.statusCode === 400, 'non-image upload disguised as PNG rejected', r.statusCode);

// name lock after a certificate
await sql`
  INSERT INTO credentials (id, verification_id, student_name, user_id, course_id, course_title, credential_title, status, issue_date, grade_percentage, created_at)
  VALUES (${`cred_t_${RUN}`}, ${`RK-T-${RUN}`}, 'Student One Renamed', ${s1}, ${FREE}, 'Intro', 'Certificate', 'Active', NOW(), 90, NOW())
  ON CONFLICT DO NOTHING
`;
r = await call('profile', { method: 'PUT', token: 'stu1', body: { full_name: 'Totally Different' } });
check(r.statusCode === 400 && r.body.fields.full_name, 'name cannot be edited directly once a certificate exists', r.body);
r = await call('profile', { method: 'POST', token: 'stu1', body: { action: 'name_request', requested_name: 'Student Q. One', reason: 'Spelling' } });
check(r.statusCode === 200 && r.body.pending_name_request?.requested_name === 'Student Q. One', 'name-change request submitted', r.body);
r = await call('profile', { method: 'POST', token: 'stu1', body: { action: 'name_request', requested_name: 'Another' } });
check(r.statusCode === 409, 'only one pending name request at a time', r.statusCode);
r = await read('admin', 'name_requests');
const reqRow = r.body.requests.find((x) => x.user_id === s1);
check(Boolean(reqRow), 'admin sees the pending name request', r.body);
r = await manage('admin', { action: 'name_request_decide', id: reqRow.id, approve: true, reissue_certificates: true });
check(r.statusCode === 200 && r.body.reissued.length === 1, 'approval renames and reissues the certificate', r.body);
r = await call('profile', { token: 'stu1' });
check(r.body.profile.full_name === 'Student Q. One' && r.body.certificates[0]?.student_name === 'Student Q. One', 'new name on profile and on the reissued certificate', r.body.certificates?.[0]);

// ------------------------------------------------------------------ audit
r = await read('admin', 'audit', { q: 'ACCESS_CODE' });
check(r.body.entries.some((e) => e.action === 'ACCESS_CODE_DEACTIVATED'), 'code activation changes are in the audit log', r.body.entries?.length);

console.log(`\n--- ADMIN/COHORT/CODE TESTS: ${passed} PASSED, ${failed} FAILED ---`);
if (sql.pool) await sql.pool.end();
process.exit(failed ? 1 : 0);
