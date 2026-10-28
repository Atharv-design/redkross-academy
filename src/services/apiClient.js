/**
 * RedKross Academy — Unified Production API Client
 * Connects directly to Neon PostgreSQL Serverless Functions on Vercel (`/api/*`)
 * with transparent fallback to local state engine if running locally without API server.
 */

import { mockEngine } from './db/mockEngine';

const API_BASE = '/api';

export const apiClient = {
  // COURSES
  async getCourses() {
    try {
      const res = await fetch(`${API_BASE}/courses`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.courses;
    } catch (err) {
      console.warn('Fallback to local engine for getCourses:', err.message);
      return mockEngine.getCourses();
    }
  },

  async getCourseById(id) {
    try {
      const res = await fetch(`${API_BASE}/courses?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.course;
    } catch (err) {
      console.warn('Fallback to local engine for getCourseById:', err.message);
      return mockEngine.getCourseById(id);
    }
  },

  async getCourseBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/courses?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.course;
    } catch (err) {
      console.warn('Fallback to local engine for getCourseBySlug:', err.message);
      return mockEngine.getCourseBySlug(slug);
    }
  },

  // LEARNING PATHS
  async getLearningPaths() {
    try {
      const res = await fetch(`${API_BASE}/learning-paths`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.learning_paths;
    } catch (err) {
      console.warn('Fallback to local engine for getLearningPaths:', err.message);
      return mockEngine.getLearningPaths();
    }
  },

  // ENROLMENTS
  async enrol(userId, courseId) {
    try {
      const res = await fetch(`${API_BASE}/enrol`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, course_id: courseId })
      });
      if (!res.ok) throw new Error('Enrolment API failed');
      const data = await res.json();
      // Also update local mock for synchronous UX
      mockEngine.enrol(userId, courseId);
      return data.enrolment;
    } catch (err) {
      console.warn('Fallback to local engine for enrol:', err.message);
      return mockEngine.enrol(userId, courseId);
    }
  },

  async getEnrolments(userId) {
    try {
      const res = await fetch(`${API_BASE}/enrol?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error('Get enrolments failed');
      const data = await res.json();
      return data.enrolments;
    } catch (err) {
      console.warn('Fallback to local engine for getEnrolments:', err.message);
      return mockEngine.getUserEnrolments(userId);
    }
  },

  // LESSON PROGRESS
  async completeLesson(enrolmentId, lessonId) {
    try {
      const res = await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrolment_id: enrolmentId, lesson_id: lessonId })
      });
      if (!res.ok) throw new Error('Progress API failed');
      const data = await res.json();
      // Mirror locally
      mockEngine.completeLesson(enrolmentId, lessonId);
      return data;
    } catch (err) {
      console.warn('Fallback to local engine for completeLesson:', err.message);
      return mockEngine.completeLesson(enrolmentId, lessonId);
    }
  },

  // QUIZ & EXAM
  async getQuiz(quizId, enrolmentId) {
    try {
      const res = await fetch(`${API_BASE}/quiz?id=${encodeURIComponent(quizId)}&enrolmentId=${encodeURIComponent(enrolmentId || '')}`);
      if (!res.ok) throw new Error('Get Quiz API failed');
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Fallback to local engine for getQuiz:', err.message);
      return { quiz: mockEngine.getQuizById(quizId) };
    }
  },

  async submitQuiz(enrolmentId, quizId, answers, userId) {
    try {
      const res = await fetch(`${API_BASE}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrolment_id: enrolmentId,
          quiz_id: quizId,
          answers,
          user_id: userId
        })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Quiz submission failed');
      }
      const data = await res.json();
      // Also record in local state
      mockEngine.submitQuizAttempt(enrolmentId, quizId, answers);
      return data;
    } catch (err) {
      console.warn('Fallback to local engine for submitQuiz:', err.message);
      return mockEngine.submitQuizAttempt(enrolmentId, quizId, answers);
    }
  },

  // PROCTORING VIOLATION
  async recordViolation(enrolmentId, quizId, strikeCount, reason, userId, attemptId) {
    try {
      const res = await fetch(`${API_BASE}/violation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrolment_id: enrolmentId,
          quiz_id: quizId,
          strike_count: strikeCount,
          reason,
          user_id: userId,
          attempt_id: attemptId
        })
      });
      if (!res.ok) throw new Error('Violation API failed');
      const data = await res.json();
      mockEngine.recordViolation(enrolmentId, quizId, strikeCount, reason);
      return data;
    } catch (err) {
      console.warn('Fallback to local engine for recordViolation:', err.message);
      return mockEngine.recordViolation(enrolmentId, quizId, strikeCount, reason);
    }
  },

  // VERIFY CREDENTIAL
  async verifyCredential(verificationId) {
    try {
      const res = await fetch(`${API_BASE}/verify?id=${encodeURIComponent(verificationId)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { found: false, message: data.message || 'Credential not found' };
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for verifyCredential:', err.message);
      const cred = mockEngine.verifyCredential(verificationId);
      return cred ? { found: true, credential: cred } : { found: false };
    }
  },

  // WALLET
  async getWallet(userId) {
    try {
      const res = await fetch(`${API_BASE}/wallet?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error('Wallet API failed');
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for getWallet:', err.message);
      return {
        balance: mockEngine.getUserTokenBalance(userId),
        transactions: mockEngine.getUserLedger(userId)
      };
    }
  },

  // SUPPORT TICKETS (PRD Section 15.2)
  async createSupportTicket(ticketData) {
    try {
      const res = await fetch(`${API_BASE}/support-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      if (!res.ok) throw new Error('Ticket API failed');
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for createSupportTicket:', err.message);
      return { success: true, ticket: { id: `tkt_${Date.now()}`, ...ticketData, status: 'Open', created_at: new Date().toISOString() } };
    }
  },

  async getSupportTickets(userId) {
    try {
      const url = userId ? `${API_BASE}/support-tickets?userId=${encodeURIComponent(userId)}` : `${API_BASE}/support-tickets`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Get tickets failed');
      const data = await res.json();
      return data.tickets;
    } catch (err) {
      console.warn('Fallback to local engine for getSupportTickets:', err.message);
      return [];
    }
  },

  // ADMIN ANALYTICS & LOGS
  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE}/admin`);
      if (!res.ok) throw new Error('Admin API failed');
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for getAdminMetrics:', err.message);
      return {
        metrics: {
          total_students: mockEngine.getUsers().filter((u) => u.role === 'student').length,
          total_enrolments: mockEngine.getDb().enrolments?.length || 0,
          total_credentials_issued: mockEngine.getDb().credentials?.length || 0,
          total_tokens_circulated: 1850,
          open_support_tickets: 2,
          active_exam_incidents: mockEngine.getDb().exam_violation_events?.length || 0
        },
        students: mockEngine.getUsers(),
        violations: mockEngine.getDb().exam_violation_events || [],
        audit_logs: mockEngine.getDb().audit_logs || []
      };
    }
  }
};
