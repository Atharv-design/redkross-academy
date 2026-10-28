import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const { id, enrolmentId } = req.query;

      if (!id) {
        return json(res, { error: 'quiz id parameter required' }, 400);
      }

      // Check quiz metadata
      const quizzes = await sql`
        SELECT * FROM quizzes WHERE id = ${id} LIMIT 1
      `;
      if (!quizzes || quizzes.length === 0) {
        return json(res, { error: 'Quiz not found' }, 404);
      }
      const quiz = quizzes[0];

      // Check lock status if enrolmentId is provided
      let retryWindow = null;
      if (enrolmentId) {
        const windows = await sql`
          SELECT * FROM quiz_retry_windows 
          WHERE enrolment_id = ${enrolmentId} AND quiz_id = ${id} 
          LIMIT 1
        `;
        if (windows.length > 0) {
          retryWindow = windows[0];
          if (retryWindow.locked_until && new Date(retryWindow.locked_until) > new Date()) {
            return json(res, {
              locked: true,
              locked_until: retryWindow.locked_until,
              message: '24-hour retake cooldown active. Please review course materials before re-attempting.',
              quiz: {
                id: quiz.id,
                title: quiz.title,
                passing_score: quiz.passing_score,
                duration_minutes: quiz.duration_minutes
              }
            });
          }
        }
      }

      // Fetch questions and options WITHOUT is_correct
      const questions = await sql`
        SELECT id, quiz_id, question_text, question_type, points, question_order 
        FROM questions 
        WHERE quiz_id = ${id} 
        ORDER BY question_order ASC
      `;

      for (const quest of questions) {
        const options = await sql`
          SELECT id, question_id, option_text, option_order 
          FROM question_options 
          WHERE question_id = ${quest.id} 
          ORDER BY option_order ASC
        `;
        quest.options = options;
      }

      return json(res, {
        quiz: {
          ...quiz,
          questions,
          retry_window: retryWindow
        }
      });
    }

    if (req.method === 'POST') {
      const { enrolment_id, quiz_id, answers, user_id } = req.body || {};

      if (!enrolment_id || !quiz_id || !answers) {
        return json(res, { error: 'enrolment_id, quiz_id, and answers are required' }, 400);
      }

      // 1. Fetch Quiz Details
      const quizzes = await sql`SELECT * FROM quizzes WHERE id = ${quiz_id} LIMIT 1`;
      if (!quizzes || quizzes.length === 0) {
        return json(res, { error: 'Quiz not found' }, 404);
      }
      const quiz = quizzes[0];

      // 2. Check 24-hour lockout
      const windows = await sql`
        SELECT * FROM quiz_retry_windows 
        WHERE enrolment_id = ${enrolment_id} AND quiz_id = ${quiz_id} 
        LIMIT 1
      `;
      let currentWindow = windows.length > 0 ? windows[0] : null;

      if (currentWindow && currentWindow.locked_until && new Date(currentWindow.locked_until) > new Date()) {
        return json(res, {
          error: '24-hour retake lockout is active for this assessment.',
          locked_until: currentWindow.locked_until
        }, 403);
      }

      // 3. Grade the submission securely
      const questions = await sql`
        SELECT q.id, q.points, q.explanation, qo.id as correct_option_id, qo.option_text as correct_option_text 
        FROM questions q 
        JOIN question_options qo ON qo.question_id = q.id 
        WHERE q.quiz_id = ${quiz_id} AND qo.is_correct = true
      `;

      let totalPoints = 0;
      let earnedPoints = 0;
      const questionBreakdown = [];

      for (const q of questions) {
        const points = q.points || 10;
        totalPoints += points;
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correct_option_id;

        if (isCorrect) {
          earnedPoints += points;
        }

        questionBreakdown.push({
          question_id: q.id,
          user_answer: userAnswer,
          correct_option_id: q.correct_option_id,
          is_correct: isCorrect,
          points_earned: isCorrect ? points : 0,
          total_points: points,
          explanation: q.explanation
        });
      }

      const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      const isPassed = scorePercentage >= (quiz.passing_score || 80);

      // 4. Update or Insert Retry Window State
      const currentAttemptsUsed = currentWindow ? (currentWindow.attempts_used || 0) + 1 : 1;
      let lockedUntil = null;

      if (!isPassed && currentAttemptsUsed >= 3) {
        // 3 strikes: lock for 24 hours
        const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        lockedUntil = lockDate.toISOString();
      }

      const windowId = currentWindow ? currentWindow.id : `qrw_${enrolment_id}_${quiz_id}`;
      await sql`
        INSERT INTO quiz_retry_windows (id, enrolment_id, quiz_id, window_number, attempts_used, locked_until)
        VALUES (${windowId}, ${enrolment_id}, ${quiz_id}, ${currentWindow ? currentWindow.window_number : 1}, ${currentAttemptsUsed}, ${lockedUntil})
        ON CONFLICT (id) DO UPDATE SET
          attempts_used = ${currentAttemptsUsed},
          locked_until = ${lockedUntil}
      `;

      // 5. Record Attempt
      const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      await sql`
        INSERT INTO quiz_attempts (id, enrolment_id, quiz_id, attempt_number, window_number, started_at, submitted_at, score_percentage, is_passed, status, focus_strikes, user_answers)
        VALUES (
          ${attemptId}, ${enrolment_id}, ${quiz_id}, ${currentAttemptsUsed},
          ${currentWindow ? currentWindow.window_number : 1}, NOW(), NOW(),
          ${scorePercentage}, ${isPassed}, 'submitted', 0, ${JSON.stringify(answers)}
        )
      `;

      // 6. If passed, award token bounty
      let tokensAwarded = 0;
      if (isPassed && quiz.token_bounty > 0 && user_id) {
        tokensAwarded = quiz.token_bounty;
        const rewardId = `rw_${Date.now()}_${quiz_id}`;
        await sql`
          INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
          VALUES (
            ${rewardId}, ${user_id}, ${tokensAwarded}, 'assessment_bounty',
            ${`Passed ${quiz.title} (${scorePercentage}%)`}, ${rewardId}, NOW()
          )
          ON CONFLICT (idempotency_key) DO NOTHING
        `;
      }

      // 7. If passed and it is a final exam, issue verified credential!
      let credentialIssued = null;
      if (isPassed && quiz.is_final_exam && user_id) {
        const student = await sql`SELECT full_name FROM users WHERE id = ${user_id} LIMIT 1`;
        const studentName = student.length > 0 ? student[0].full_name : 'Verified Candidate';
        const course = await sql`SELECT id, title FROM courses WHERE id = ${quiz.course_id} LIMIT 1`;
        const courseTitle = course.length > 0 ? course[0].title : 'RedKross Professional Certification';

        const verificationId = `RK-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase()}`;
        const credId = `crd_${Date.now()}`;
        const digitalSig = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

        const credRes = await sql`
          INSERT INTO credentials (
            id, verification_id, student_name, user_id, course_id, course_title, credential_title,
            credential_type, issue_date, expiration_date, grade_percentage, status, digital_signature,
            verification_url, skills_validated
          )
          VALUES (
            ${credId}, ${verificationId}, ${studentName}, ${user_id}, ${quiz.course_id}, ${courseTitle},
            ${`Certified ${courseTitle} Specialist`}, 'Professional Certification', CURRENT_DATE, 'Never (Immutable)',
            ${scorePercentage}, 'Active', ${digitalSig}, ${`https://redkross-academy.vercel.app/verify/${verificationId}`},
            ${JSON.stringify(['Incident Triage', 'Log Correlation', 'Defensive Response', 'Packet Analysis'])}
          )
          RETURNING *
        `;
        credentialIssued = credRes[0];
      }

      return json(res, {
        success: true,
        attempt_id: attemptId,
        score_percentage: scorePercentage,
        is_passed: isPassed,
        passing_score: quiz.passing_score,
        attempts_used: currentAttemptsUsed,
        locked_until: lockedUntil,
        tokens_awarded: tokensAwarded,
        credential: credentialIssued,
        breakdown: questionBreakdown
      });
    }

    return json(res, { error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('API /quiz error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
