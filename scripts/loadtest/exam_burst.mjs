// Simulates N students starting the same exam at once, then all submitting at once.
// Each student: sign-in sync, assessment status, start exam; later: submit.
// usage: node scripts/loadtest/exam_burst.mjs <N> <runTag> [sameIp=1]   (against scripts/loadtest/server.mjs)
const N = Number(process.argv[2] || 500);
const TAG = process.argv[3] || 'r1';
const SAME_IP = process.argv[4] !== '0';
const BASE = 'http://127.0.0.1:3100/api';
const COURSE = 'crs_cyber_soc_08';
const QUIZ = 'quiz_c08_m1';

const stats = {};
async function call(step, i, path, opts = {}) {
  const t0 = performance.now();
  let status = 0;
  let body = null;
  try {
    const res = await fetch(BASE + path, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer tok-${TAG}_s${i}`,
        // one college NAT address, or a different address per student
        'CF-Connecting-IP': SAME_IP ? '203.0.113.10' : `10.${(i >> 8) & 255}.${i & 255}.7`,
      },
    });
    status = res.status;
    body = await res.json().catch(() => null);
  } catch {
    status = 'ERR';
  }
  const ms = performance.now() - t0;
  (stats[step] ||= { ms: [], codes: {} }).ms.push(ms);
  stats[step].codes[status] = (stats[step].codes[status] || 0) + 1;
  return { status, body };
}

function report(label, wall) {
  console.log(`\n== ${label} (wall ${wall.toFixed(0)} ms)`);
  for (const [step, s] of Object.entries(stats)) {
    const a = s.ms.sort((x, y) => x - y);
    const p = (q) => a[Math.min(a.length - 1, Math.floor(q * a.length))].toFixed(0);
    console.log(`${step.padEnd(8)} n=${a.length} p50=${p(0.5)}ms p95=${p(0.95)}ms max=${a[a.length - 1].toFixed(0)}ms codes=${JSON.stringify(s.codes)}`);
  }
  for (const k of Object.keys(stats)) delete stats[k];
}

// Phase 1: everyone opens the exam in the same instant
let t = performance.now();
const sessions = await Promise.all(
  Array.from({ length: N }, async (_, i) => {
    await call('auth', i, '/auth', { method: 'POST', body: '{}' });
    await call('status', i, `/assessment?course_id=${COURSE}`);
    const r = await call('start', i, '/assessment', { method: 'POST', body: JSON.stringify({ action: 'start', course_id: COURSE, quiz_id: QUIZ }) });
    return r.body?.session_id || null;
  })
);
report(`${N} students start the exam at once (${SAME_IP ? 'same college IP' : 'different IPs'})`, performance.now() - t);

// Phase 2: the timer ends and everyone submits in the same instant
t = performance.now();
await Promise.all(
  sessions.map((sid, i) => (sid ? call('submit', i, '/assessment', { method: 'POST', body: JSON.stringify({ action: 'submit', session_id: sid, answers: {} }) }) : null))
);
report(`${sessions.filter(Boolean).length} students submit at once`, performance.now() - t);
