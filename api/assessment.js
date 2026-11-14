/**
 * /api/assessment - server-authoritative quizzes, final exams and credentials.
 *
 *   GET  ?course_id=...                         learner's assessment status for a course
 *   POST { action:'start',   course_id, quiz_id } -> session + questions (no answers)
 *   POST { action:'submit',  session_id, answers:{questionId: optionId} } -> graded result
 *   POST { action:'forfeit', session_id, reason }  (proctoring strike 3: attempt void + 24h lock)
 *
 * Policy: 3 attempts per window; the 3rd failure locks the quiz for 24 hours, after
 * which a new window opens. The final assessment unlocks only when every module
 * quiz of the course has a recorded pass. Passing the final issues a signed credential.
 */
import { sql, json, cors, serverError } from './_db.js';
import { requireUser, audit } from './_auth.js';
import { checkCourseAccess } from './_lib/access.js';
import proctorHandler from './_proctor.js';
import violationHandler from './_violation.js';
import quizHandler from './_quiz.js';
import {
  getCourseSpec,
  findQuiz,
  generateQuestions,
  publicQuestions,
  MAX_ATTEMPTS,
  LOCKOUT_HOURS,
  GRACE_SECONDS,
} from './_lib/courseRegistry.js';
import { ensureEnrolment, awardTokens, issueCredential, publicCredential, randomId, tokenBalance } from './_lib/learning.js';

async function getWindow(userId, courseId, quizId) {
  const rows = await sql`
    SELECT * FROM assessment_windows WHERE user_id = ${userId} AND course_id = ${courseId} AND quiz_id = ${quizId} LIMIT 1
  `;
  let w = rows[0] || { attempts_used: 0, locked_until: null };
  // an expired lock opens a fresh window of attempts
  if (w.locked_until && new Date(w.locked_until) <= new Date()) {
    await sql`
      UPDATE assessment_windows SET attempts_used = 0, locked_until = NULL, updated_at = NOW()
      WHERE user_id = ${userId} AND course_id = ${courseId} AND quiz_id = ${quizId}
    `;
    w = { attempts_used: 0, locked_until: null };
  }
  return w;
}

function attemptsView(w) {
  const used = Number(w.attempts_used || 0);
  const lockedUntil = w.locked_until && new Date(w.locked_until) > new Date() ? new Date(w.locked_until).toISOString() : null;
  return { used, remaining: Math.max(0, MAX_ATTEMPTS - used), max: MAX_ATTEMPTS, locked_until: lockedUntil };
}

/** Records a failed attempt; locks the quiz after MAX_ATTEMPTS failures. */
async function recordFailure(userId, courseId, quizId) {
  const lockAt = new Date(Date.now() + LOCKOUT_HOURS * 3600 * 1000).toISOString();
  const rows = await sql`
    INSERT INTO assessment_windows (user_id, course_id, quiz_id, attempts_used, locked_until, updated_at)
    VALUES (${userId}, ${courseId}, ${quizId}, 1, ${MAX_ATTEMPTS <= 1 ? lockAt : null}, NOW())
    ON CONFLICT (user_id, course_id, quiz_id) DO UPDATE SET
      attempts_used = assessment_windows.attempts_used + 1,
      locked_until = CASE WHEN assessment_windows.attempts_used + 1 >= ${MAX_ATTEMPTS} THEN ${lockAt}::timestamptz ELSE NULL END,
      updated_at = NOW()
    RETURNING *
  `;
  return rows[0];
}

async function expireStaleSessions(userId, courseId, quizId) {
  const stale = await sql`
    UPDATE assessment_sessions SET status = 'expired', submitted_at = NOW(), is_passed = false, score_percentage = 0
    WHERE user_id = ${userId} AND course_id = ${courseId} AND quiz_id = ${quizId}
      AND status = 'in_progress' AND expires_at < NOW() - make_interval(secs => ${GRACE_SECONDS})
    RETURNING id
  `;
  for (let i = 0; i < stale.length; i++) await recordFailure(userId, courseId, quizId);
  return stale.length;
}

async function passedQuizIds(userId, courseId) {
  const rows = await sql`SELECT quiz_id, score_percentage FROM assessment_passes WHERE user_id = ${userId} AND course_id = ${courseId}`;
  return rows;
}

async function status(ctx, courseId) {
  const spec = await getCourseSpec(courseId);
  if (!spec) return { error: 'Unknown course', status: 404 };
  const passes = await passedQuizIds(ctx.user.id, courseId);
  const windows = await sql`SELECT * FROM assessment_windows WHERE user_id = ${ctx.user.id} AND course_id = ${courseId}`;
  const cred = await sql`
    SELECT * FROM credentials WHERE user_id = ${ctx.user.id} AND course_id = ${courseId} AND status = 'Active' LIMIT 1
  `;
  const locks = {};
  for (const w of windows) locks[w.quiz_id] = attemptsView(w);
  const passedIds = passes.map((p) => p.quiz_id);
  return {
    course_id: courseId,
    passed_quizzes: passedIds,
    scores: Object.fromEntries(passes.map((p) => [p.quiz_id, p.score_percentage])),
    attempts: locks,
    final_quiz_id: spec.final.id,
    final_unlocked: spec.modules.every((m) => passedIds.includes(m.quizId)),
    final_passed: passedIds.includes(spec.final.id),
    credential: publicCredential(cred[0]),
  };
}

async function start(ctx, body, res) {
  const spec = await getCourseSpec(String(body.course_id || ''));
  if (!spec) return json(res, { error: 'Unknown course' }, 404);
  const quiz = findQuiz(spec, String(body.quiz_id || ''));
  if (!quiz) return json(res, { error: 'Unknown assessment for this course' }, 404);
  const userId = ctx.user.id;

  const passes = await passedQuizIds(userId, spec.id);
  if (passes.some((p) => p.quiz_id === quiz.quizId)) {
    return json(res, { error: 'ALREADY_PASSED', already_passed: true }, 409);
  }
  if (quiz.kind === 'final') {
    const missing = spec.modules.filter((m) => !passes.some((p) => p.quiz_id === m.quizId)).map((m) => m.quizId);
    if (missing.length) return json(res, { error: 'FINAL_LOCKED', missing_quizzes: missing }, 403);
  }

  await expireStaleSessions(userId, spec.id, quiz.quizId);
  const w = await getWindow(userId, spec.id, quiz.quizId);
  const attempts = attemptsView(w);
  if (attempts.locked_until) return json(res, { error: 'LOCKED', attempts }, 423);

  const access = await checkCourseAccess(ctx, spec.id);
  if (!access.allowed) return json(res, { error: 'COURSE_LOCKED', reason: access.reason }, 403);
  await ensureEnrolment(ctx.user, spec);

  // resume an unfinished session instead of re-rolling questions
  const open = await sql`
    SELECT * FROM assessment_sessions
    WHERE user_id = ${userId} AND course_id = ${spec.id} AND quiz_id = ${quiz.quizId} AND status = 'in_progress'
    ORDER BY started_at DESC LIMIT 1
  `;
  let session = open[0];
  if (!session) {
    const questions = await generateQuestions(spec, quiz);
    if (!questions.length) return serverError(res, new Error(`empty bank for ${spec.id}/${quiz.quizId}`), 'api/assessment');
    const expires = new Date(Date.now() + quiz.timeLimitMinutes * 60 * 1000).toISOString();
    const rows = await sql`
      INSERT INTO assessment_sessions (id, user_id, course_id, quiz_id, kind, questions, status, started_at, expires_at)
      VALUES (${randomId('as')}, ${userId}, ${spec.id}, ${quiz.quizId}, ${quiz.kind}, ${JSON.stringify(questions)},
              'in_progress', NOW(), ${expires})
      RETURNING *
    `;
    session = rows[0];
  }
  const questions = typeof session.questions === 'string' ? JSON.parse(session.questions) : session.questions;
  return json(res, {
    session_id: session.id,
    resumed: Boolean(open[0]),
    quiz: {
      id: quiz.quizId,
      kind: quiz.kind,
      title: quiz.title,
      passing_score: quiz.passingScore,
      time_limit_minutes: quiz.timeLimitMinutes,
      total_questions: questions.length,
    },
    started_at: session.started_at,
    expires_at: session.expires_at,
    server_time: new Date().toISOString(),
    attempts,
    questions: publicQuestions(questions),
  });
}

async function loadOwnSession(ctx, sessionId) {
  if (!sessionId || typeof sessionId !== 'string') return null;
  const rows = await sql`SELECT * FROM assessment_sessions WHERE id = ${sessionId} AND user_id = ${ctx.user.id} LIMIT 1`;
  return rows[0] || null;
}

async function submit(ctx, body, res) {
  const session = await loadOwnSession(ctx, body.session_id);
  if (!session) return json(res, { error: 'Session not found' }, 404);
  if (session.status !== 'in_progress') return json(res, { error: 'SESSION_CLOSED', status: session.status }, 409);
  const spec = await getCourseSpec(session.course_id);
  const quiz = findQuiz(spec, session.quiz_id);
  if (!spec || !quiz) return json(res, { error: 'Assessment no longer available' }, 410);

  const answers = body.answers && typeof body.answers === 'object' ? body.answers : {};
  const questions = typeof session.questions === 'string' ? JSON.parse(session.questions) : session.questions;
  const late = Date.now() > new Date(session.expires_at).getTime() + GRACE_SECONDS * 1000;

  let correct = 0;
  const review = questions.map((q) => {
    const chosen = typeof answers[q.id] === 'string' ? answers[q.id] : null;
    const ok = chosen !== null && chosen === q.correctOptionId;
    if (ok) correct++;
    return { question_id: q.id, topic: q.topic, is_correct: ok, chosen_option_id: chosen, correct_option_id: q.correctOptionId, explanation: q.explanation };
  });
  const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  const passed = !late && score >= quiz.passingScore;

  // close the session atomically: a double submit cannot grade twice
  const closed = await sql`
    UPDATE assessment_sessions
    SET status = ${late ? 'expired' : 'submitted'}, answers = ${JSON.stringify(answers)}, score_percentage = ${score},
        is_passed = ${passed}, submitted_at = NOW()
    WHERE id = ${session.id} AND status = 'in_progress'
    RETURNING id
  `;
  if (!closed.length) return json(res, { error: 'SESSION_CLOSED' }, 409);

  let window = null;
  let tokensAwarded = 0;
  let credential = null;
  if (passed) {
    await sql`
      INSERT INTO assessment_passes (user_id, course_id, quiz_id, score_percentage, session_id, passed_at)
      VALUES (${ctx.user.id}, ${spec.id}, ${quiz.quizId}, ${score}, ${session.id}, NOW())
      ON CONFLICT (user_id, course_id, quiz_id) DO NOTHING
    `;
    tokensAwarded = await awardTokens(
      ctx.user.id,
      quiz.tokenBounty || 0,
      'assessment_bounty',
      `Passed ${quiz.title} (${score}%)`,
      `pass:${ctx.user.id}:${spec.id}:${quiz.quizId}`
    );
    if (quiz.kind === 'final') {
      credential = (await issueCredential(ctx.user, spec, score, session.id)).credential;
    }
    window = { attempts_used: 0, locked_until: null };
  } else {
    window = await recordFailure(ctx.user.id, spec.id, quiz.quizId);
  }
  await audit(ctx.user.id, passed ? 'ASSESSMENT_PASSED' : 'ASSESSMENT_FAILED', 'assessment_session', session.id, {
    course_id: spec.id,
    quiz_id: quiz.quizId,
    score,
    late,
  });

  // Full answer review only after a pass. After a fail, show which topics to revisit,
  // never the answers (otherwise the next attempt is a lookup exercise).
  const reveal = passed;
  return json(res, {
    session_id: session.id,
    quiz_id: quiz.quizId,
    kind: quiz.kind,
    score_percentage: score,
    correct_count: correct,
    total_questions: questions.length,
    passing_score: quiz.passingScore,
    is_passed: passed,
    late,
    attempts: attemptsView(window),
    tokens_awarded: tokensAwarded,
    token_balance: await tokenBalance(ctx.user.id),
    credential: publicCredential(credential),
    review: reveal
      ? review
      : review.map((r) => ({ question_id: r.question_id, topic: r.topic, is_correct: r.is_correct })),
    topics_to_review: [...new Set(review.filter((r) => !r.is_correct).map((r) => r.topic).filter(Boolean))],
  });
}

async function forfeit(ctx, body, res) {
  const session = await loadOwnSession(ctx, body.session_id);
  if (!session) return json(res, { error: 'Session not found' }, 404);
  if (session.status !== 'in_progress') return json(res, { error: 'SESSION_CLOSED', status: session.status }, 409);
  const reason = String(body.reason || 'Proctoring violation').slice(0, 200);
  const closed = await sql`
    UPDATE assessment_sessions SET status = 'forfeited', is_passed = false, score_percentage = 0, submitted_at = NOW()
    WHERE id = ${session.id} AND status = 'in_progress' RETURNING id
  `;
  if (!closed.length) return json(res, { error: 'SESSION_CLOSED' }, 409);
  // Proctoring policy (strike 3): the attempt is void and the assessment locks for 24 hours
  const lockAt = new Date(Date.now() + LOCKOUT_HOURS * 3600 * 1000).toISOString();
  const w = (await sql`
    INSERT INTO assessment_windows (user_id, course_id, quiz_id, attempts_used, locked_until, updated_at)
    VALUES (${ctx.user.id}, ${session.course_id}, ${session.quiz_id}, ${MAX_ATTEMPTS}, ${lockAt}, NOW())
    ON CONFLICT (user_id, course_id, quiz_id) DO UPDATE SET attempts_used = ${MAX_ATTEMPTS}, locked_until = ${lockAt}::timestamptz, updated_at = NOW()
    RETURNING *
  `)[0];
  await sql`
    INSERT INTO exam_violation_events (id, attempt_id, enrolment_id, quiz_id, user_id, course_id, strike_count, reason, status, created_at)
    VALUES (${randomId('vio')}, ${session.id}, ${session.course_id}, ${session.quiz_id}, ${ctx.user.id}, ${session.course_id},
            ${Number(w.attempts_used) || 1}, ${reason}, 'Flagged', NOW())
  `.catch((e) => console.warn('[assessment] violation log:', e.message));
  await audit(ctx.user.id, 'ASSESSMENT_FORFEITED', 'assessment_session', session.id, { reason });
  return json(res, { forfeited: true, attempts: attemptsView(w) });
}

export default async function handler(req, res) {
  if (req.query?.route === 'proctor' || (req.url && req.url.includes('/api/proctor'))) {
    return proctorHandler(req, res);
  }
  if (req.query?.route === 'violation' || (req.url && req.url.includes('/api/violation'))) {
    return violationHandler(req, res);
  }
  if (req.query?.route === 'quiz' || (req.url && req.url.includes('/api/quiz'))) {
    return quizHandler(req, res);
  }
  if (cors(req, res)) return;
  try {
    const ctx = await requireUser(req, res);
    if (!ctx) return;

    if (req.method === 'GET') {
      const result = await status(ctx, String(req.query?.course_id || ''));
      if (result.error) return json(res, { error: result.error }, result.status);
      return json(res, result);
    }
    if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);

    const body = req.body || {};
    if (body.action === 'start') return await start(ctx, body, res);
    if (body.action === 'submit') return await submit(ctx, body, res);
    if (body.action === 'forfeit') return await forfeit(ctx, body, res);
    return json(res, { error: 'Unknown action' }, 400);
  } catch (error) {
    return serverError(res, error, 'api/assessment');
  }
}
