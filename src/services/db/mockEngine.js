/**
 * RedKross Academy — Core Relational State & Simulation Engine
 * Directly implements PRD Sections 5, 6, 7, 8, 9, 13, and Appendix A
 */

import {
  INITIAL_USERS,
  INITIAL_LEARNING_PATHS,
  INITIAL_COURSES,
  INITIAL_VERIFIED_CREDENTIALS,
  INITIAL_ENROLMENTS,
  INITIAL_REWARD_LEDGER,
  INITIAL_AUDIT_LOGS,
} from './seedData';

const STORAGE_KEY = 'redkross_academy_db_v1';

class MockEngine {
  constructor() {
    this.initDatabase();
  }

  initDatabase(forceReset = false) {
    if (forceReset || !localStorage.getItem(STORAGE_KEY)) {
      const initialDb = {
        users: INITIAL_USERS,
        learning_paths: INITIAL_LEARNING_PATHS,
        courses: INITIAL_COURSES,
        enrolments: INITIAL_ENROLMENTS,
        credentials: INITIAL_VERIFIED_CREDENTIALS,
        reward_ledger: INITIAL_REWARD_LEDGER,
        audit_logs: INITIAL_AUDIT_LOGS,
        quiz_retry_windows: {}, // { `${enrolmentId}_${quizId}`: { window_num: 1, attempts_used: 1, locked_until: null } }
        quiz_attempts: [],
        exam_violation_events: [],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
    }
  }

  getDb() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to parse database, resetting...', e);
      this.initDatabase(true);
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
  }

  saveDb(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }

  resetToSeed() {
    this.initDatabase(true);
    return this.getDb();
  }

  // ==========================================
  // USERS & IDENTITY
  // ==========================================
  getUsers() {
    return this.getDb().users;
  }

  getUserById(id) {
    return this.getDb().users.find((u) => u.id === id);
  }

  updateUserProfile(id, updates) {
    const db = this.getDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      db.users[idx] = { ...db.users[idx], ...updates };
      this.saveDb(db);
      return db.users[idx];
    }
    return null;
  }

  // ==========================================
  // CATALOGUE & LEARNING PATHS
  // ==========================================
  getLearningPaths() {
    return this.getDb().learning_paths;
  }

  getCourses() {
    return this.getDb().courses;
  }

  getCourseBySlug(slug) {
    return this.getDb().courses.find((c) => c.slug === slug);
  }

  getCourseById(id) {
    return this.getDb().courses.find((c) => c.id === id);
  }

  // ==========================================
  // ENROLMENTS & LESSON PROGRESSION
  // ==========================================
  getEnrolmentsForUser(userId) {
    return this.getDb().enrolments.filter((e) => e.user_id === userId);
  }

  getEnrolment(enrolmentId) {
    return this.getDb().enrolments.find((e) => e.id === enrolmentId);
  }

  enrolStudent(userId, courseId) {
    const db = this.getDb();
    const existing = db.enrolments.find((e) => e.user_id === userId && e.course_id === courseId);
    if (existing) return existing;

    const course = db.courses.find((c) => c.id === courseId);
    const newEnrolment = {
      id: `enr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      user_id: userId,
      course_id: courseId,
      course_version: course?.version || '1.0',
      enrolled_at: new Date().toISOString(),
      status: 'active',
      completed_mandatory_lessons: [],
      passed_quizzes: [],
      final_assessment_attempt_id: null,
      credential_id: null,
    };

    db.enrolments.push(newEnrolment);

    // Audit log
    db.audit_logs.push({
      id: `aud_${Date.now()}`,
      actor_id: userId,
      action: 'COURSE_ENROLMENT',
      entity_type: 'enrolments',
      entity_id: newEnrolment.id,
      details: `Student enrolled in ${course?.title || courseId}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return newEnrolment;
  }

  /**
   * PRD Section 5: Progress % = (Completed Mandatory Lessons / Total Mandatory Lessons) * 100
   */
  getCourseProgress(enrolmentId) {
    const enrolment = this.getEnrolment(enrolmentId);
    if (!enrolment) return { percentage: 0, completed: 0, total: 0 };

    const course = this.getCourseById(enrolment.course_id);
    if (!course || !course.modules) return { percentage: 0, completed: 0, total: 0 };

    let totalMandatory = 0;
    course.modules.forEach((mod) => {
      (mod.lessons || []).forEach((les) => {
        if (les.is_mandatory) totalMandatory++;
      });
    });

    if (totalMandatory === 0) return { percentage: 100, completed: 0, total: 0 };

    const completed = enrolment.completed_mandatory_lessons.length;
    const percentage = Math.min(100, Math.round((completed / totalMandatory) * 100));

    return { percentage, completed, total: totalMandatory };
  }

  completeLesson(enrolmentId, lessonId) {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    if (!enrolment) throw new Error('Enrolment not found');

    if (!enrolment.completed_mandatory_lessons.includes(lessonId)) {
      const prevProgress = this.getCourseProgress(enrolmentId).percentage;
      enrolment.completed_mandatory_lessons.push(lessonId);

      const newProgress = this.getCourseProgress(enrolmentId).percentage;

      // PRD Section 8: Check for Milestone crossings: 20%, 50%, 80%, 100%
      const milestones = [20, 50, 80, 100];
      milestones.forEach((m) => {
        if (prevProgress < m && newProgress >= m) {
          const idempotencyKey = `idemp_milestone_${enrolmentId}_${m}`;
          const existing = db.reward_ledger.find((tx) => tx.idempotency_key === idempotencyKey);
          if (!existing) {
            db.reward_ledger.push({
              id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
              user_id: enrolment.user_id,
              amount: 50,
              type: 'milestone_reward',
              description: `Reached ${m}% Course Completion Milestone!`,
              idempotency_key: idempotencyKey,
              created_at: new Date().toISOString(),
            });
          }
        }
      });

      this.saveDb(db);
    }

    return this.getCourseProgress(enrolmentId);
  }

  // ==========================================
  // ASSESSMENT & 24H RETRY WINDOW ENGINE
  // ==========================================
  getRetryWindow(enrolmentId, quizId) {
    const db = this.getDb();
    const key = `${enrolmentId}_${quizId}`;
    let windowData = db.quiz_retry_windows[key];

    if (!windowData) {
      windowData = {
        enrolment_id: enrolmentId,
        quiz_id: quizId,
        window_number: 1,
        attempts_used: 0,
        locked_until: null,
      };
      db.quiz_retry_windows[key] = windowData;
      this.saveDb(db);
    } else {
      // Check if cooldown has expired
      if (windowData.locked_until && new Date() >= new Date(windowData.locked_until)) {
        // Automatically start fresh evaluation window
        windowData.window_number += 1;
        windowData.attempts_used = 0;
        windowData.locked_until = null;
        this.saveDb(db);
      }
    }

    return windowData;
  }

  startQuizAttempt(enrolmentId, quizId) {
    const db = this.getDb();
    const windowData = this.getRetryWindow(enrolmentId, quizId);

    // PRD Appendix A.1 Step 4: Check if in cooldown
    if (windowData.locked_until && new Date() < new Date(windowData.locked_until)) {
      const remainingMs = new Date(windowData.locked_until).getTime() - Date.now();
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
      throw new Error(`COOLDOWN_ACTIVE: Evaluation locked for ${remainingHours} more hours due to consecutive failed attempts.`);
    }

    // PRD Appendix A.1 Step 5: Check max attempts per window
    if (windowData.attempts_used >= 3) {
      throw new Error('ATTEMPT_LIMIT: Maximum 3 attempts used in current window.');
    }

    // Atomically increment attempts used
    windowData.attempts_used += 1;
    db.quiz_retry_windows[`${enrolmentId}_${quizId}`] = windowData;

    const attempt = {
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      enrolment_id: enrolmentId,
      quiz_id: quizId,
      attempt_number: windowData.attempts_used,
      window_number: windowData.window_number,
      started_at: new Date().toISOString(),
      submitted_at: null,
      score_percentage: 0,
      is_passed: false,
      status: 'in_progress', // 'in_progress', 'submitted', 'terminated'
      focus_strikes: 0,
      user_answers: {},
    };

    db.quiz_attempts.push(attempt);
    this.saveDb(db);
    return attempt;
  }

  /**
   * PRD Section 7 & Appendix A.3: Exam Focus Violation Engine (3-Strike System)
   */
  recordFocusViolation(attemptId) {
    const db = this.getDb();
    const attempt = db.quiz_attempts.find((a) => a.id === attemptId);
    if (!attempt || attempt.status !== 'in_progress') return null;

    attempt.focus_strikes = (attempt.focus_strikes || 0) + 1;
    const currentStrike = attempt.focus_strikes;

    let result = {
      strike: currentStrike,
      action: 'warning',
      message: 'Focus loss detected. Please keep exam window active.',
    };

    if (currentStrike === 1) {
      result = {
        strike: 1,
        action: 'warning',
        message: 'STRIKE 1: Tab switch / focus loss detected. Timer paused. Please acknowledge to resume.',
      };
    } else if (currentStrike === 2) {
      // PRD Rule: Strike 2 = 50 Token deduction logged to ledger
      const enrolment = db.enrolments.find((e) => e.id === attempt.enrolment_id);
      const idempotencyKey = `idemp_penalty_strike2_${attemptId}`;

      const alreadyDeducted = db.reward_ledger.find((tx) => tx.idempotency_key === idempotencyKey);
      if (!alreadyDeducted && enrolment) {
        db.reward_ledger.push({
          id: `tx_${Date.now()}_penalty`,
          user_id: enrolment.user_id,
          amount: -50,
          type: 'focus_penalty',
          description: `Strike 2 Proctoring Infraction Penalty on Attempt #${attempt.attempt_number}`,
          idempotency_key: idempotencyKey,
          created_at: new Date().toISOString(),
        });
      }

      result = {
        strike: 2,
        action: 'penalty',
        penalty_amount: 50,
        message: 'STRIKE 2: Second focus loss detected! 50 RedKross Tokens have been deducted from your wallet.',
      };
    } else if (currentStrike >= 3) {
      // PRD Rule: Strike 3 = Immediate termination, failed attempt, 24h lockout
      attempt.status = 'terminated';
      attempt.submitted_at = new Date().toISOString();
      attempt.is_passed = false;

      // Lock current window for 24 hours
      const key = `${attempt.enrolment_id}_${attempt.quiz_id}`;
      if (db.quiz_retry_windows[key]) {
        db.quiz_retry_windows[key].attempts_used = 3;
        db.quiz_retry_windows[key].locked_until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      }

      // Log incident to Admin queue
      db.exam_violation_events.push({
        id: `inc_${Date.now()}`,
        attempt_id: attemptId,
        enrolment_id: attempt.enrolment_id,
        quiz_id: attempt.quiz_id,
        strike_count: 3,
        reason: 'Repeated focus loss and browser switching (Strike 3)',
        terminated_at: new Date().toISOString(),
        status: 'pending_review',
      });

      result = {
        strike: 3,
        action: 'terminate',
        message: 'STRIKE 3: Proctoring threshold violated. Exam terminated immediately. 24-hour evaluation lockout applied.',
      };
    }

    this.saveDb(db);
    return result;
  }

  submitQuizAttempt(attemptId, userAnswers, questions, passingScore = 75, tokenBounty = 100) {
    const db = this.getDb();
    const attempt = db.quiz_attempts.find((a) => a.id === attemptId);
    if (!attempt || attempt.status !== 'in_progress') {
      throw new Error('Attempt cannot be submitted: invalid state or already evaluated.');
    }

    // Grade attempt against answer keys
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((q) => {
      totalPoints += q.points || 25;
      const selectedOptionId = userAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.is_correct);
      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        earnedPoints += q.points || 25;
      }
    });

    const scorePercentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const isPassed = scorePercentage >= passingScore;

    attempt.user_answers = userAnswers;
    attempt.score_percentage = scorePercentage;
    attempt.is_passed = isPassed;
    attempt.status = 'submitted';
    attempt.submitted_at = new Date().toISOString();

    const enrolment = db.enrolments.find((e) => e.id === attempt.enrolment_id);

    // If passed, record quiz in enrolment passed list
    if (isPassed && enrolment) {
      if (!enrolment.passed_quizzes.includes(attempt.quiz_id)) {
        enrolment.passed_quizzes.push(attempt.quiz_id);

        // One-time passing Token Reward (+100 Tokens)
        const idempotencyKey = `idemp_quiz_pass_${attempt.quiz_id}_${enrolment.id}`;
        if (!db.reward_ledger.some((tx) => tx.idempotency_key === idempotencyKey)) {
          db.reward_ledger.push({
            id: `tx_${Date.now()}_quiz`,
            user_id: enrolment.user_id,
            amount: tokenBounty,
            type: 'quiz_passed',
            description: `First-time Pass Reward for Quiz`,
            idempotency_key: idempotencyKey,
            created_at: new Date().toISOString(),
          });

          // Bonus +50 Tokens if scored >= 90%
          if (scorePercentage >= 90) {
            db.reward_ledger.push({
              id: `tx_${Date.now()}_bonus`,
              user_id: enrolment.user_id,
              amount: 50,
              type: 'high_score_bonus',
              description: `High-Scorer Bonus (${scorePercentage}%)`,
              idempotency_key: `${idempotencyKey}_high_score`,
              created_at: new Date().toISOString(),
            });
          }
        }
      }
    } else {
      // If failed and attempts_used == 3, lock for 24 hours
      const key = `${attempt.enrolment_id}_${attempt.quiz_id}`;
      const windowData = db.quiz_retry_windows[key];
      if (windowData && windowData.attempts_used >= 3) {
        windowData.locked_until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      }
    }

    this.saveDb(db);
    return attempt;
  }

  // ==========================================
  // FINAL ASSESSMENT UNLOCK GATE (PRD Section 5 & 21)
  // ==========================================
  checkFinalAssessmentUnlock(enrolmentId) {
    const enrolment = this.getEnrolment(enrolmentId);
    if (!enrolment) return { is_unlocked: false, reasons: ['Enrolment not found'] };

    const course = this.getCourseById(enrolment.course_id);
    if (!course) return { is_unlocked: false, reasons: ['Course not found'] };

    const reasons = [];

    // Gate 1: 100% Mandatory Lessons Complete
    const progress = this.getCourseProgress(enrolmentId);
    if (progress.percentage < 100) {
      reasons.push(`Incomplete Lessons: Course progress is currently ${progress.percentage}%. 100% required.`);
    }

    // Gate 2: All Required Chapter Quizzes Passed
    const requiredQuizIds = (course.modules || [])
      .filter((m) => m.quiz)
      .map((m) => m.quiz.id);

    const unpassedQuizzes = requiredQuizIds.filter((qid) => !enrolment.passed_quizzes.includes(qid));
    if (unpassedQuizzes.length > 0) {
      reasons.push(`Unpassed Quizzes: ${unpassedQuizzes.length} required chapter evaluation(s) pending.`);
    }

    // Gate 3: 80% Course Quiz Tokens Earned
    const totalPossibleQuizTokens = (course.modules || []).reduce(
      (sum, m) => sum + (m.quiz?.token_bounty || 100),
      0
    );
    const requiredTokens = Math.round(totalPossibleQuizTokens * 0.8);
    const earnedQuizTokens = enrolment.passed_quizzes.length * 100;

    if (earnedQuizTokens < requiredTokens) {
      reasons.push(`Token Quota: Earned ${earnedQuizTokens}/${totalPossibleQuizTokens} quiz tokens. Minimum 80% (${requiredTokens}) required.`);
    }

    return {
      is_unlocked: reasons.length === 0,
      reasons,
      progress_pct: progress.percentage,
      passed_quizzes_count: enrolment.passed_quizzes.length,
      total_quizzes_count: requiredQuizIds.length,
    };
  }

  // ==========================================
  // CREDENTIALS & PUBLIC VERIFICATION
  // ==========================================
  issueCredential(enrolmentId, studentName, finalScore) {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    if (!enrolment) throw new Error('Enrolment not found');

    const course = db.courses.find((c) => c.id === enrolment.course_id);
    const examMeta = course.final_assessment;

    const randomSerial = Math.floor(10000 + Math.random() * 90000);
    const verificationId = `RK-SOC-${randomSerial}`;
    const issueDate = new Date().toISOString().split('T')[0];

    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 2);
    const expirationDate = expDate.toISOString().split('T')[0];

    const newCredential = {
      id: `cred_${Date.now()}`,
      verification_id: verificationId,
      student_name: studentName,
      user_id: enrolment.user_id,
      course_id: course.id,
      course_title: course.title,
      credential_title: examMeta.credential_title || 'Certificate of Completion',
      type: 'Professional Certification',
      issue_date: issueDate,
      expiration_date: expirationDate,
      grade_percentage: finalScore,
      status: 'Active',
      digital_signature: `0x${Math.random().toString(16).substr(2)}${Math.random().toString(16).substr(2)}`,
      verification_url: `https://academy.redkross.org.in/verify/${verificationId}`,
      skills_validated: examMeta.skills_validated || ['Defensive Security Operations'],
    };

    db.credentials.push(newCredential);
    enrolment.credential_id = newCredential.id;

    // Audit log
    db.audit_logs.push({
      id: `aud_${Date.now()}`,
      actor_id: enrolment.user_id,
      action: 'CREDENTIAL_ISSUED',
      entity_type: 'credentials',
      entity_id: newCredential.id,
      details: `Issued verified credential ${verificationId} with score ${finalScore}%`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return newCredential;
  }

  getCredentialByVerificationId(verificationId) {
    const db = this.getDb();
    return db.credentials.find(
      (c) => c.verification_id.toUpperCase() === verificationId.trim().toUpperCase()
    );
  }

  // ==========================================
  // TOKEN ECONOMY
  // ==========================================
  getTokenBalance(userId) {
    const db = this.getDb();
    return db.reward_ledger
      .filter((tx) => tx.user_id === userId)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  getTokenTransactions(userId) {
    const db = this.getDb();
    return db.reward_ledger
      .filter((tx) => tx.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // ==========================================
  // ADMIN & OPERATIONS CONSOLE
  // ==========================================
  getOperationsMetrics() {
    const db = this.getDb();
    const totalStudents = db.users.filter((u) => u.role === 'student').length;
    const totalEnrolments = db.enrolments.length;
    const credentialsIssued = db.credentials.length;
    const activeIncidents = db.exam_violation_events.filter((i) => i.status === 'pending_review').length;

    const totalTokensInCirculation = db.reward_ledger.reduce((sum, tx) => sum + tx.amount, 0);

    return {
      total_students: totalStudents,
      total_enrolments: totalEnrolments,
      credentials_issued: credentialsIssued,
      active_incidents: activeIncidents,
      tokens_circulation: totalTokensInCirculation,
    };
  }

  getIncidents() {
    return this.getDb().exam_violation_events;
  }

  resolveIncident(incidentId, action, reviewerNotes, adminEmail) {
    const db = this.getDb();
    const inc = db.exam_violation_events.find((i) => i.id === incidentId);
    if (!inc) return null;

    inc.status = action; // 'approved_appeal', 'upheld'
    inc.reviewed_by = adminEmail;
    inc.reviewer_notes = reviewerNotes;
    inc.resolved_at = new Date().toISOString();

    db.audit_logs.push({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'INCIDENT_RESOLVED',
      entity_type: 'exam_violation_events',
      entity_id: incidentId,
      details: `Incident marked as ${action}: ${reviewerNotes}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return inc;
  }

  adminResetCooldown(enrolmentId, quizId, reason, adminEmail) {
    const db = this.getDb();
    const key = `${enrolmentId}_${quizId}`;
    if (db.quiz_retry_windows[key]) {
      db.quiz_retry_windows[key].locked_until = null;
      db.quiz_retry_windows[key].attempts_used = 0;
      db.quiz_retry_windows[key].window_number += 1;

      db.audit_logs.push({
        id: `aud_${Date.now()}`,
        actor_id: adminEmail,
        action: 'COOLDOWN_RESET_OVERRIDE',
        entity_type: 'quiz_retry_windows',
        entity_id: key,
        details: `Manual administrative reset of 24h lockout. Reason: ${reason}`,
        created_at: new Date().toISOString(),
      });

      this.saveDb(db);
      return true;
    }
    return false;
  }

  getAuditLogs() {
    return this.getDb().audit_logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

export const mockEngine = new MockEngine();
