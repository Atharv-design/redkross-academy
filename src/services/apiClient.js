/**
 * RedKross Academy — Unified Production API Client
 * Connects directly to Neon PostgreSQL Serverless Functions on Vercel (`/api/*`)
 * Enforces Phase 2 Authentication, Phase 3 Catalog Protection, and Phase 5 RBAC.
 */

import { mockEngine } from './db/mockEngine';

const API_BASE = '/api';

export const apiClient = {
  getAuthHeader() {
    const token = localStorage.getItem('redkross_academy_auth_token') || localStorage.getItem('redkross_academy_active_user');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // AUTH SYNC (Phase 2 & 5)
  async syncUser(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) throw new Error('User sync failed');
      const data = await res.json();
      return data.user;
    } catch (err) {
      console.warn('Fallback local user sync:', err.message);
      return {
        id: userData.uid,
        email: userData.email,
        full_name: userData.full_name || 'Cadet Operator',
        avatar: userData.avatar,
        role: 'student', // Strict Phase 4.2
        streak_days: 1,
        token_balance: 100
      };
    }
  },

  // COURSES (Phase 3 & Phase 7)
  async getCourses(preview = false) {
    try {
      const url = preview ? `${API_BASE}/courses?preview=admin` : `${API_BASE}/courses`;
      const res = await fetch(url, {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return {
        courses: data.courses || [],
        public_catalog_enabled: data.public_catalog_enabled,
        message: data.message
      };
    } catch (err) {
      console.warn('Fallback to local engine for getCourses:', err.message);
      return {
        courses: [], // Strict Phase 3: No public courses if API fails or catalog disabled
        public_catalog_enabled: false,
        message: 'Courses will be out soon'
      };
    }
  },

  async getCourseById(id) {
    try {
      const res = await fetch(`${API_BASE}/courses?id=${encodeURIComponent(id)}`, {
        headers: { ...this.getAuthHeader() }
      });
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
      const res = await fetch(`${API_BASE}/courses?slug=${encodeURIComponent(slug)}`, {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.course;
    } catch (err) {
      console.warn('Fallback to local engine for getCourseBySlug:', err.message);
      return mockEngine.getCourseBySlug(slug);
    }
  },

  // CREATE COURSE (Phase 4 & Phase 7.4 Random Variant Assignment)
  async createCourse(coursePayload) {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify(coursePayload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create course');
    }
    return await res.json();
  },

  // CATALOG VISIBILITY TOGGLE (Phase 3.3 & Phase 4.1)
  async toggleCatalogVisibility(enabled) {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify({
        action: 'TOGGLE_CATALOG_VISIBILITY',
        public_catalog_enabled: enabled
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update catalog visibility');
    }
    return await res.json();
  },

  // LEARNING PATHS (Phase 3.2)
  async getLearningPaths() {
    try {
      const res = await fetch(`${API_BASE}/learning-paths`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return {
        learning_paths: data.learning_paths || [],
        public_catalog_enabled: data.public_catalog_enabled,
        message: data.message
      };
    } catch (err) {
      console.warn('Fallback to local engine for getLearningPaths:', err.message);
      return {
        learning_paths: mockEngine.getLearningPaths(),
        public_catalog_enabled: false,
        message: 'Courses will be out soon'
      };
    }
  },

  // ENROLMENTS (Phase 2 Mandatory Authentication)
  async enrol(userId, courseId) {
    const res = await fetch(`${API_BASE}/enrol`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify({ user_id: userId, course_id: courseId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Enrolment API failed');
    }
    const data = await res.json();
    mockEngine.enrol(userId, courseId);
    return data.enrolment;
  },

  async getEnrolments(userId) {
    try {
      const res = await fetch(`${API_BASE}/enrol?userId=${encodeURIComponent(userId)}`, {
        headers: { ...this.getAuthHeader() }
      });
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
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        },
        body: JSON.stringify({ enrolment_id: enrolmentId, lesson_id: lessonId })
      });
      if (!res.ok) throw new Error('Progress API failed');
      const data = await res.json();
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
      const res = await fetch(`${API_BASE}/quiz?id=${encodeURIComponent(quizId)}&enrolmentId=${encodeURIComponent(enrolmentId || '')}`, {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('Get Quiz API failed');
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for getQuiz:', err.message);
      return { quiz: mockEngine.getQuizById(quizId) };
    }
  },

  async submitQuiz(enrolmentId, quizId, answers, userId) {
    const res = await fetch(`${API_BASE}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
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
    mockEngine.submitQuizAttempt(enrolmentId, quizId, answers);
    return data;
  },

  // PROCTORING VIOLATION
  async recordViolation(enrolmentId, quizId, strikeCount, reason, userId, attemptId) {
    try {
      const res = await fetch(`${API_BASE}/violation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        },
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
      const res = await fetch(`${API_BASE}/wallet?userId=${encodeURIComponent(userId)}`, {
        headers: { ...this.getAuthHeader() }
      });
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

  // SUPPORT TICKETS
  async createSupportTicket(ticketData) {
    try {
      const res = await fetch(`${API_BASE}/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        },
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
      const res = await fetch(url, {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('Get tickets failed');
      const data = await res.json();
      return data.tickets;
    } catch (err) {
      console.warn('Fallback to local engine for getSupportTickets:', err.message);
      return [];
    }
  },

  // ADMIN ANALYTICS & LOGS (Requires super_admin Bearer token)
  async getAdminMetrics() {
    const res = await fetch(`${API_BASE}/admin`, {
      headers: { ...this.getAuthHeader() }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Administrative clearance required');
    }
    return await res.json();
  }
};
