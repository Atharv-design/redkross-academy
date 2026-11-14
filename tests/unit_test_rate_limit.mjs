/**
 * Rate limiter behaviour behind a Cloudflare tunnel (all traffic from 127.0.0.1).
 *   node tests/unit_test_rate_limit.mjs
 */
import { createRateLimiter, clientIp } from '../server/rateLimit.js';

let passed = 0;
let failed = 0;
const check = (cond, label, extra) => {
  if (cond) {
    passed++;
    console.log(`[PASS] ${label}`);
  } else {
    failed++;
    console.log(`[FAIL] ${label}`, extra ?? '');
  }
};

const jwt = (uid) =>
  `Bearer ${Buffer.from('{"alg":"RS256"}').toString('base64url')}.${Buffer.from(JSON.stringify({ user_id: uid })).toString('base64url')}.sig`;

function req({ peer = '127.0.0.1', cf, uid } = {}) {
  const headers = {};
  if (cf) headers['cf-connecting-ip'] = cf;
  if (uid) headers.authorization = jwt(uid);
  return { headers, socket: { remoteAddress: peer }, ip: peer };
}

/** Runs the limiter; if it passes, the "handler" answers handlerStatus (e.g. 401 for a fake token). */
function run(limiter, r, handlerStatus = 200) {
  let status = 200;
  const finish = [];
  const res = {
    statusCode: 200,
    setHeader() {},
    on(ev, fn) {
      if (ev === 'finish') finish.push(fn);
    },
    status(c) {
      status = c;
      this.statusCode = c;
      return this;
    },
    json() {
      return this;
    },
  };
  limiter(r, res, () => {
    res.statusCode = handlerStatus;
    status = handlerStatus;
  });
  finish.forEach((fn) => fn());
  return status;
}

// client IP resolution
check(clientIp(req({ cf: '203.0.113.7' })) === '203.0.113.7', 'CF-Connecting-IP is used when the request comes through the local tunnel');
check(clientIp(req({ peer: '198.51.100.9', cf: '203.0.113.7' })) === '198.51.100.9', 'CF-Connecting-IP from a direct (non-tunnel) caller is ignored');

// a whole batch behind one college NAT IP
{
  const lim = createRateLimiter({ name: 't1', perUser: 180, perAnonIp: 300, perIp: 1500 });
  let blocked = 0;
  for (let u = 0; u < 100; u++) for (let i = 0; i < 6; i++) if (run(lim, req({ cf: '203.0.113.50', uid: `student${u}` })) === 429) blocked++;
  check(blocked === 0, '100 signed-in students behind one NAT IP x 6 calls are not blocked', blocked);
}

// different visitors through the tunnel do not share one bucket
{
  const lim = createRateLimiter({ name: 't2', perUser: 180, perAnonIp: 5, perIp: 1500 });
  for (let i = 0; i < 5; i++) run(lim, req({ cf: '203.0.113.1' }));
  check(run(lim, req({ cf: '203.0.113.1' })) === 429, 'anonymous visitor over the limit is blocked');
  check(run(lim, req({ cf: '203.0.113.2' })) === 200, 'another visitor (different real IP, same tunnel) is not affected');
}

// per-user cap
{
  const lim = createRateLimiter({ name: 't3', perUser: 40, perAnonIp: 30, perIp: 600 });
  let last = 200;
  for (let i = 0; i < 41; i++) last = run(lim, req({ cf: '203.0.113.60', uid: 'heavy' }));
  check(last === 429, 'one account sending 41 strict requests in a minute is blocked');
  check(run(lim, req({ cf: '203.0.113.60', uid: 'classmate' })) === 200, 'a classmate on the same IP is still allowed');
}

// a whole college exam start on the strict limiter (auth + status + start per student)
{
  const lim = createRateLimiter({ name: 't5', perUser: 40, perAnonIp: 30, perIp: 15000, perIpRejected: 60 });
  let blocked = 0;
  for (let u = 0; u < 500; u++) for (let i = 0; i < 3; i++) if (run(lim, req({ cf: '203.0.113.20', uid: `exam${u}` })) === 429) blocked++;
  check(blocked === 0, '500 students from one college IP starting an exam (1,500 strict calls) are not blocked', blocked);
}

// rotating fake uids gets the IP blocked after 60 rejected tokens
{
  const lim = createRateLimiter({ name: 't4', perUser: 40, perAnonIp: 30, perIp: 15000, perIpRejected: 60 });
  let blocked = 0;
  for (let i = 0; i < 200; i++) if (run(lim, req({ cf: '203.0.113.99', uid: `fake${i}` }), 401) === 429) blocked++;
  check(blocked === 140, 'an IP rotating fake tokens is blocked after 60 rejections', blocked);
  check(run(lim, req({ cf: '203.0.113.98', uid: 'honest' })) === 200, 'other IPs are unaffected');
}

console.log(`\n--- TEST RUN SUMMARY: ${passed} PASSED, ${failed} FAILED ---`);
process.exit(failed ? 1 : 0);
