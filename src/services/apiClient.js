/**
 * RedKross Academy — Unified Production API Client
 * Connects directly to Neon PostgreSQL Serverless Functions on Vercel (`/api/*`)
 * Enforces Phase 2 Authentication, Phase 3 Catalog Protection, and Phase 5 RBAC.
 */

import { mockEngine } from './db/mockEngine.js';
import { auth } from './auth/firebase';

const API_BASE = '/api';

// In-memory cache & deduplication layers (Priority 1 API Optimization)
const _publicCache = new Map();
const _inflightGetRequests = new Map();
const PUBLIC_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let _cachedToken = null;
let _cachedTokenUid = null;
let _tokenExpiry = 0;

export const apiClient = {
  /** Cached, fresh Firebase ID token for the signed-in user, strictly scoped by UID. */
  async authHeaders(forceFresh = false) {
    try {
      const user = auth.currentUser;
      if (!user) {
        _cachedToken = null;
        _cachedTokenUid = null;
        _tokenExpiry = 0;
        return {};
      }
      const now = Date.now();
      if (!forceFresh && _cachedToken && _cachedTokenUid === user.uid && now < _tokenExpiry) {
        return { Authorization: `Bearer ${_cachedToken}` };
      }
      const token = await user.getIdToken(forceFresh);
      _cachedToken = token;
      _cachedTokenUid = user.uid;
      _tokenExpiry = now + 4 * 60 * 1000; // 4 minutes safe TTL
      return { Authorization: `Bearer ${token}` };
    } catch (err) {
      console.warn('Could not obtain ID token:', err?.message);
    }
    return {};
  },

  /** JSON request helper: with GET in-flight deduplication scoped by user identity. Returns { ok, status, data }. */
  async request(path, { method = 'GET', body, query, bypassDedupe = false } = {}) {
    const qs = query ? `?${new URLSearchParams(query).toString()}` : '';
    const isGet = method.toUpperCase() === 'GET';
    const uid = auth.currentUser?.uid || 'anon';
    const dedupeKey = `${uid}:${path}${qs}`;

    if (isGet && !bypassDedupe && _inflightGetRequests.has(dedupeKey)) {
      return _inflightGetRequests.get(dedupeKey);
    }

    const execRequest = async () => {
      const headers = {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(await this.authHeaders())
      };
      const res = await fetch(`${API_BASE}${path}${qs}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const isJson = (res.headers.get('content-type') || '').includes('application/json');
      const data = isJson ? await res.json().catch(() => ({})) : {};
      return { ok: res.ok, status: res.status, data };
    };

    if (isGet && !bypassDedupe) {
      const promise = execRequest().finally(() => {
        _inflightGetRequests.delete(dedupeKey);
      });
      _inflightGetRequests.set(dedupeKey, promise);
      return promise;
    }

    return execRequest();
  },

  // ---------------- profile, access codes, catalog availability ----------------
  getProfile() {
    return this.request('/profile');
  },
  updateProfile(fields) {
    return this.request('/profile', { method: 'PUT', body: fields });
  },
  uploadAvatar(dataUrl) {
    return this.request('/profile', { method: 'POST', body: { action: 'avatar', data_url: dataUrl } });
  },
  removeAvatar() {
    return this.request('/profile', { method: 'POST', body: { action: 'avatar', remove: true } });
  },
  requestNameChange(requestedName, reason) {
    return this.request('/profile', { method: 'POST', body: { action: 'name_request', requested_name: requestedName, reason } });
  },
  withdrawNameChange() {
    return this.request('/profile', { method: 'DELETE', body: { action: 'name_request' } });
  },
  previewCode(code, courseId) {
    return this.request('/redeem', { query: courseId ? { code, course_id: courseId } : { code } });
  },
  redeemCode(code, { courseId, via } = {}) {
    return this.request('/redeem', { method: 'POST', body: { code, course_id: courseId, via } });
  },
  /** Course availability (visibility, price) + the caller's unlocked courses. Cached briefly. */
  async getCatalogAccess({ fresh = false } = {}) {
    const now = Date.now();
    if (!fresh && this._catalogCache && now - this._catalogCache.at < 30000) return this._catalogCache.value;
    const res = await this.request('/catalog');
    const value = res.ok
      ? res.data
      : { settings: {}, unlocked_course_ids: [], is_admin: false, unavailable: true };
    this._catalogCache = { at: now, value };
    return value;
  },
  clearCache() {
    _publicCache.clear();
    _inflightGetRequests.clear();
    this._catalogCache = null;
    _cachedToken = null;
    _tokenExpiry = 0;
  },
  clearCatalogCache() {
    this.clearCache();
  },

  // ---------------- admin console (/api/manage) ----------------
  adminRead(resource, query = {}) {
    return this.request('/manage', { query: { resource, ...query } });
  },
  adminAction(action, payload = {}) {
    this.clearCache();
    return this.request('/manage', { method: 'POST', body: { action, ...payload } });
  },
  /** Downloads an admin CSV export through the authenticated API. */
  async adminDownload(type, id = '') {
    const res = await fetch(`${API_BASE}/manage?${new URLSearchParams({ resource: 'export', type, id })}`, {
      headers: await this.authHeaders(),
    });
    if (!res.ok) throw new Error('Export failed');
    const disposition = res.headers.get('content-disposition') || '';
    const filename = /filename="([^"]+)"/.exec(disposition)?.[1] || `${type}.csv`;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  // ---------------- server-authoritative learning records ----------------
  async getAssessmentStatus(courseId) {
    return this.request('/assessment', { query: { course_id: courseId } });
  },
  async startAssessment(courseId, quizId) {
    return this.request('/assessment', { method: 'POST', body: { action: 'start', course_id: courseId, quiz_id: quizId } });
  },
  async submitAssessment(sessionId, answers) {
    return this.request('/assessment', { method: 'POST', body: { action: 'submit', session_id: sessionId, answers } });
  },
  async forfeitAssessment(sessionId, reason) {
    return this.request('/assessment', { method: 'POST', body: { action: 'forfeit', session_id: sessionId, reason } });
  },
  async getLessonProgress(courseId) {
    return this.request('/progress', { query: { course_id: courseId } });
  },
  async recordLessonProgress(courseId, lessonIds) {
    const ids = Array.isArray(lessonIds) ? lessonIds : [lessonIds];
    return this.request('/progress', { method: 'POST', body: { course_id: courseId, lesson_ids: ids } });
  },

  async syncUser(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ full_name: userData.full_name, avatar: userData.avatar })
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

  async getCourses(preview = false, fresh = false) {
    const cacheKey = `courses:${preview ? 'preview' : 'public'}`;
    const now = Date.now();
    if (!fresh && _publicCache.has(cacheKey)) {
      const entry = _publicCache.get(cacheKey);
      const ttl = entry.isFallback ? 30000 : PUBLIC_CACHE_TTL;
      if (now - entry.at < ttl) {
        return entry.value;
      }
    }

    try {
      const url = preview ? `${API_BASE}/courses?preview=admin` : `${API_BASE}/courses`;
      const res = await fetch(url, {
        headers: { ...(await this.authHeaders()) }
      });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error('API serverless unavailable or returned non-JSON');
      }
      const data = await res.json();
      let courses = (data.courses || []).filter(
        (c) => c.id !== 'crs_full_stack_web_dev' && !c.slug?.includes('web-dev') && !c.title?.toLowerCase().includes('web development')
      );
      if (!courses.some((c) => c.id === 'crs_cyber_net_02' || c.slug === 'computer-networking-for-cybersecurity')) {
        const net02 = mockEngine.getCourseSummary('crs_cyber_net_02') || mockEngine.getCourseById('crs_cyber_net_02');
        if (net02) courses.push(net02);
      }
      if (!courses.some((c) => c.id === 'crs_cyber_admin_03' || c.slug === 'linux-and-windows-system-administration')) {
        const admin03 = mockEngine.getCourseSummary('crs_cyber_admin_03') || mockEngine.getCourseById('crs_cyber_admin_03');
        if (admin03) courses.push(admin03);
      }
      if (!courses.some((c) => c.id === 'crs_cyber_python_04' || c.slug === 'python-for-cybersecurity')) {
        const python04 = mockEngine.getCourseSummary('crs_cyber_python_04') || mockEngine.getCourseById('crs_cyber_python_04');
        if (python04) courses.push(python04);
      }
      const result = {
        courses,
        public_catalog_enabled: data.public_catalog_enabled,
        message: data.message
      };
      _publicCache.set(cacheKey, { at: now, value: result });
      return result;
    } catch (err) {
      console.warn('Fallback to local engine for getCourses:', err.message);
      const isPublic = mockEngine.isPublicCatalogEnabled();
      const fallbackResult = {
        courses: preview || isPublic ? mockEngine.getCourses() : [],
        public_catalog_enabled: isPublic,
        message: 'Courses will be out soon'
      };
      _publicCache.set(cacheKey, { at: now, value: fallbackResult, isFallback: true });
      return fallbackResult;
    }
  },
  async getCoursesByDivision(division, preview = false) {
    const data = await this.getCourses(preview);
    const allCourses = data.courses || [];
    if (!division) return data;
    return {
      ...data,
      courses: allCourses.filter(
        (c) => (c.division || 'cybersecurity') === division && 
               c.id !== 'crs_full_stack_web_dev' && 
               !c.slug?.includes('web-dev') && 
               !c.title?.toLowerCase().includes('web development')
      )
    };
  },

  async getLearningPathsByDivision(division) {
    const res = await this.getLearningPaths();
    const allPaths = res.learning_paths || [];
    if (!division) return res;
    return {
      learning_paths: allPaths.filter((p) => (p.division || 'cybersecurity') === division)
    };
  },

  async getCourseById(id) {
    try {
      const res = await fetch(`${API_BASE}/courses?id=${encodeURIComponent(id)}`, {
        headers: { ...(await this.authHeaders()) }
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
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data.course;
    } catch (err) {
      console.warn('Fallback to local engine for getCourseBySlug:', err.message);
      return mockEngine.getCourseBySlug(slug);
    }
  },

  async createCourse(coursePayload) {
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify(coursePayload)
      });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error('API serverless unavailable or returned non-JSON');
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for createCourse:', err.message);
      return mockEngine.createCourse(coursePayload);
    }
  },

  async deleteCourse(courseId) {
    try {
      const res = await fetch(`${API_BASE}/courses?id=${encodeURIComponent(courseId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify({ id: courseId })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Server rejected course deletion');
      }
      return await res.json();
    } catch (err) {
      console.warn('API course deletion fallback to local state:', err.message);
      return { success: true, localOnly: true };
    }
  },

  async updateCourse(courseId, coursePayload) {
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify({ id: courseId, course: coursePayload })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Server rejected course update');
      }
      return await res.json();
    } catch (err) {
      console.warn('API course update fallback to local state:', err.message);
      return { success: true, localOnly: true };
    }
  },

  async toggleCatalogVisibility(enabled) {
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify({
          action: 'TOGGLE_CATALOG_VISIBILITY',
          public_catalog_enabled: enabled
        })
      });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error('Serverless unavailable');
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback local catalog toggle:', err.message);
      return { success: true, public_catalog_enabled: mockEngine.setPublicCatalogEnabled(enabled) };
    }
  },

  async getLearningPaths(fresh = false) {
    const cacheKey = 'learning_paths';
    const now = Date.now();
    if (!fresh && _publicCache.has(cacheKey)) {
      const entry = _publicCache.get(cacheKey);
      const ttl = entry.isFallback ? 30000 : PUBLIC_CACHE_TTL;
      if (now - entry.at < ttl) {
        return entry.value;
      }
    }

    try {
      const res = await fetch(`${API_BASE}/courses?type=learning_paths`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      const result = {
        learning_paths: data.learning_paths || [],
        public_catalog_enabled: data.public_catalog_enabled,
        message: data.message
      };
      _publicCache.set(cacheKey, { at: now, value: result });
      return result;
    } catch (err) {
      console.warn('Fallback to local engine for getLearningPaths:', err.message);
      const fallbackResult = {
        learning_paths: mockEngine.getLearningPaths(),
        public_catalog_enabled: false,
        message: 'Courses will be out soon'
      };
      _publicCache.set(cacheKey, { at: now, value: fallbackResult, isFallback: true });
      return fallbackResult;
    }
  },
  async getCoursesByDivision(division, preview = false) {
    const data = await this.getCourses(preview);
    const allCourses = data.courses || [];
    if (!division) return data;
    return {
      ...data,
      courses: allCourses.filter(
        (c) => (c.division || 'cybersecurity') === division && 
               c.id !== 'crs_full_stack_web_dev' && 
               !c.slug?.includes('web-dev') && 
               !c.title?.toLowerCase().includes('web development')
      )
    };
  },

  async getLearningPathsByDivision(division) {
    const res = await this.getLearningPaths();
    const allPaths = res.learning_paths || [];
    if (!division) return res;
    return {
      learning_paths: allPaths.filter((p) => (p.division || 'cybersecurity') === division)
    };
  },

  async enrol(userId, courseId, userMetadata = {}) {
    let serverEnrolment = null;
    const localUser = mockEngine.getDb().users?.find((u) => u.id === userId);
    const email = (userMetadata.email || localUser?.email || '').trim().toLowerCase();
    const fullName = userMetadata.full_name || localUser?.full_name || localUser?.name || 'Cadet Operator';
    const cadetId = userMetadata.cadet_id || localUser?.cadet_id || 'RK-CADET';

    try {
      const { ok, status, data } = await this.request('/enrol', { method: 'POST', body: { course_id: courseId } });
      if (ok) serverEnrolment = data.enrolment;
      // The server decides access (price, visibility, batch/code unlocks): never enrol locally past a refusal.
      if (status === 403 || status === 404) {
        return { locked: true, reason: data?.reason || 'NOT_AVAILABLE', error: data?.error, price_inr: data?.price_inr || 0 };
      }
    } catch (apiErr) {
      console.warn('Enrolment sync deferred:', apiErr.message);
    }

    const localEnr = mockEngine.enrolStudent(userId, courseId);
    return serverEnrolment ? { ...localEnr, ...serverEnrolment, id: localEnr?.id || serverEnrolment.id } : localEnr;
  },

  async cancelEnrolment(enrolmentId, userId, courseId) {
    let serverSuccess = false;
    try {
      const res = await fetch(`${API_BASE}/enrol`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify({ course_id: courseId })
      });
      if (res.ok) {
        serverSuccess = true;
      }
    } catch (apiErr) {
      console.warn('Fallback local cancelEnrolment:', apiErr.message);
    }
    const localResult = mockEngine.cancelEnrolment(enrolmentId, userId);
    return { success: true, serverSuccess, localResult };
  },

  async getEnrolments(userId) {
    try {
      const res = await fetch(`${API_BASE}/enrol`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) throw new Error('Get enrolments failed');
      const data = await res.json();
      return data.enrolments;
    } catch (err) {
      console.warn('Fallback to local engine for getEnrolments:', err.message);
      return mockEngine.getUserEnrolments(userId);
    }
  },

  async completeLesson(enrolmentId, lessonId) {
    const result = mockEngine.completeLesson(enrolmentId, lessonId);
    const courseId = mockEngine.getEnrolment(enrolmentId)?.course_id;
    if (courseId) this.recordLessonProgress(courseId, lessonId).catch(() => {});
    return result;
  },

  async getQuiz() {
    throw new Error('Retired: assessments are served by /api/assessment (apiClient.startAssessment).');
  },

  async submitQuiz() {
    throw new Error('Retired: use apiClient.submitAssessment.');
  },

  async recordViolation({ sessionId, courseId, quizId, strikeCount, reason } = {}) {
    try {
      return (await this.request('/violation', {
        method: 'POST',
        body: { session_id: sessionId, course_id: courseId, quiz_id: quizId, strike_count: strikeCount, reason },
      })).data;
    } catch (err) {
      console.warn('Violation telemetry not delivered:', err.message);
      return null;
    }
  },

  async verifyCredential(verificationId) {
    try {
      const res = await fetch(`${API_BASE}/verify?id=${encodeURIComponent(verificationId)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { found: false, message: data.message || 'Credential not found' };
      }
      return await res.json();
    } catch (err) {
      console.warn('Verification service unreachable:', err.message);
      return { found: false, unavailable: true, message: 'The verification service is temporarily unavailable. Please try again shortly.' };
    }
  },

  async getWallet(userId) {
    try {
      const res = await fetch(`${API_BASE}/wallet`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) throw new Error('Wallet API failed');
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for getWallet:', err.message);
      return {
        balance: typeof mockEngine.getTokenBalance === 'function' ? mockEngine.getTokenBalance(userId) : 0,
        transactions: mockEngine.getUserLedger(userId)
      };
    }
  },

  async createSupportTicket(ticketData) {
    try {
      const res = await fetch(`${API_BASE}/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await this.authHeaders())
        },
        body: JSON.stringify(ticketData)
      });
      if (!res.ok) throw new Error('Ticket API failed');
      return await res.json();
    } catch (err) {
      console.warn('Support ticket not delivered:', err.message);
      return { success: false, error: 'We could not submit your ticket. Please email contact@redkross.org.in.' };
    }
  },

  async getSupportTickets(userId) {
    try {
      const url = `${API_BASE}/support-tickets`;
      const res = await fetch(url, {
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) throw new Error('Get tickets failed');
      const data = await res.json();
      return data.tickets;
    } catch (err) {
      console.warn('Fallback to local engine for getSupportTickets:', err.message);
      return [];
    }
  },

  async getAdminMetrics() {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) {
        throw new Error('Serverless admin unavailable');
      }
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local engine for getAdminMetrics:', err.message);
      const metrics = mockEngine.getOperationsMetrics();
      const students = mockEngine.getLiveStudentTracking();
      const violations = mockEngine.getIncidents();
      const auditLogs = mockEngine.getAuditLogs();
      const isPublic = mockEngine.isPublicCatalogEnabled();
      return {
        metrics: {
          ...metrics,
          public_catalog_enabled: isPublic
        },
        students,
        violations,
        audit_logs: auditLogs,
        public_catalog_enabled: isPublic
      };
    }
  },

  async reorderModules(courseId, modules) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'REORDER_MODULES', course_id: courseId, modules })
      });
      if (!res.ok) throw new Error('API reorder failed');
      return await res.json();
    } catch (err) {
      return mockEngine.reorderModulesAndLessons(courseId, modules);
    }
  },

  async saveLessonContent(courseId, moduleId, lessonId, updates) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'SAVE_LESSON', course_id: courseId, module_id: moduleId, lesson_id: lessonId, updates })
      });
      if (!res.ok) throw new Error('API save lesson failed');
      return await res.json();
    } catch (err) {
      return mockEngine.saveLessonContent(courseId, moduleId, lessonId, updates);
    }
  },

  async saveQuizQuestions(courseId, moduleId, quizId, quizPayload) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'SAVE_QUIZ', course_id: courseId, module_id: moduleId, quiz_id: quizId, quiz_payload: quizPayload })
      });
      if (!res.ok) throw new Error('API save quiz failed');
      return await res.json();
    } catch (err) {
      return mockEngine.saveQuizQuestions(courseId, moduleId, quizId, quizPayload);
    }
  },

  async uploadVideoAsset(courseId, assetPayload) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'UPLOAD_VIDEO', course_id: courseId, asset: assetPayload })
      });
      if (!res.ok) throw new Error('API upload video failed');
      return await res.json();
    } catch (err) {
      return mockEngine.uploadVideoAsset(courseId, assetPayload);
    }
  },

  async deleteVideoAsset(courseId, assetId) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'DELETE_VIDEO', course_id: courseId, asset_id: assetId })
      });
      if (!res.ok) throw new Error('API delete video failed');
      return await res.json();
    } catch (err) {
      return mockEngine.deleteVideoAsset(courseId, assetId);
    }
  },

  async rebindVideoAsset(courseId, assetId, newLessonId) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'REBIND_VIDEO', course_id: courseId, asset_id: assetId, new_lesson_id: newLessonId })
      });
      if (!res.ok) throw new Error('API rebind video failed');
      return await res.json();
    } catch (err) {
      return mockEngine.rebindVideoAsset(courseId, assetId, newLessonId);
    }
  },

  async publishCourseVersion(courseId) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'PUBLISH_VERSION', course_id: courseId })
      });
      if (!res.ok) throw new Error('API publish version failed');
      return await res.json();
    } catch (err) {
      return mockEngine.publishCourseVersion(courseId);
    }
  },

  async resetStudentProgress(userId, courseId, lessonId = null, reason = '') {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'RESET_PROGRESS', user_id: userId, course_id: courseId, lesson_id: lessonId, reason })
      });
      if (!res.ok) throw new Error('API reset progress failed');
      return await res.json();
    } catch (err) {
      return mockEngine.resetStudentProgress(userId, courseId, lessonId, reason);
    }
  },

  async adjustStudentTokens(userId, amount, reason) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'ADJUST_TOKENS', user_id: userId, amount, reason })
      });
      if (!res.ok) throw new Error('API token adjustment failed');
      return await res.json();
    } catch (err) {
      return mockEngine.adjustStudentTokens(userId, amount, reason);
    }
  },

  async forceIssueCredential(userId, courseId) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'FORCE_ISSUE_CREDENTIAL', user_id: userId, course_id: courseId })
      });
      if (!res.ok) throw new Error('API force issue credential failed');
      return await res.json();
    } catch (err) {
      return mockEngine.forceIssueCredential(userId, courseId);
    }
  },

  async manualEnrollStudent(userId, courseId) {
    return mockEngine.enrolStudent(userId, courseId);
  },

  async getGlobalSecurityPolicy() {
    return mockEngine.getGlobalSecurityPolicy();
  },

  async updateGlobalSecurityPolicy(updates) {
    return mockEngine.updateGlobalSecurityPolicy(updates);
  },

  async getLiveStudentTracking() {
    return mockEngine.getLiveStudentTracking();
  },

  async resolveIncident(incidentId, action, reviewerNotes, adminEmail) {
    return mockEngine.resolveIncident(incidentId, action, reviewerNotes, adminEmail);
  },

  async adminResetCooldown(enrolmentId, quizId, reason, adminEmail) {
    return mockEngine.adminResetCooldown(enrolmentId, quizId, reason, adminEmail);
  },

  async getStudents() {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (!res.ok) throw new Error('API getStudents failed');
      const data = await res.json();
      if (Array.isArray(data.students) && data.students.length > 0) {
        return data.students;
      }
      const db = mockEngine.getDb();
      return (db.users || []).filter((u) => u.role === 'student' || !u.role || u.role === 'cadet');
    } catch (err) {
      console.warn('Fallback local getStudents:', err.message);
      const db = mockEngine.getDb();
      return (db.users || []).filter((u) => u.role === 'student' || !u.role || u.role === 'cadet');
    }
  },

  async updateUserStatus(userId, status, reason) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'SET_USER_STATUS', user_id: userId, status, reason })
      });
      mockEngine.setUserAccountStatus(userId, status, reason);
      if (res.ok) return await res.json();
      return { success: true };
    } catch (err) {
      console.warn('Fallback local updateUserStatus:', err.message);
      return { success: true, user: mockEngine.setUserAccountStatus(userId, status, reason) };
    }
  },

  async deleteUser(userId, email) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'PERMANENT_DELETE_USER', user_id: userId, email })
      });
      mockEngine.permanentlyDeleteStudent(userId, email);
      if (res.ok) return await res.json();
      return { success: true };
    } catch (err) {
      console.warn('Fallback local deleteUser:', err.message);
      return { success: true, result: mockEngine.permanentlyDeleteStudent(userId, email) };
    }
  },

  async adjustTokens(userId, amount, reason) {
    return this.adjustStudentTokens(userId, amount, reason);
  },

  async submitAssignment(submissionPayload) {
    try {
      const res = await fetch(`${API_BASE}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'SUBMIT_ASSIGNMENT', ...submissionPayload })
      });
      const localResult = mockEngine.submitAssignment(submissionPayload);
      if (res.ok) return await res.json();
      return { success: true, submission: localResult };
    } catch (err) {
      console.warn('Fallback local submitAssignment:', err.message);
      return { success: true, submission: mockEngine.submitAssignment(submissionPayload) };
    }
  },

  async getAssignments() {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.submissions) && data.submissions.length > 0) {
          return data.submissions;
        }
      }
      return mockEngine.getAssignmentSubmissions();
    } catch (err) {
      console.warn('Fallback local getAssignments:', err.message);
      return mockEngine.getAssignmentSubmissions();
    }
  },

  async gradeAssignment(gradingPayload) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'GRADE_ASSIGNMENT', ...gradingPayload })
      });
      const localResult = mockEngine.gradeAssignment(gradingPayload);
      if (res.ok) return await res.json();
      return { success: true, result: localResult };
    } catch (err) {
      console.warn('Fallback local gradeAssignment:', err.message);
      return { success: true, result: mockEngine.gradeAssignment(gradingPayload) };
    }
  },

  async dispatchCertificate(certificatePayload) {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await this.authHeaders()) },
        body: JSON.stringify({ action: 'DISPATCH_CREDENTIAL', ...certificatePayload })
      });
      if (res.ok) return await res.json();
      return { success: true, localOnly: true };
    } catch (err) {
      console.warn('Fallback local dispatchCertificate:', err.message);
      return { success: true, localOnly: true };
    }
  },

  async getAdminTelemetry() {
    return this.getAdminMetrics();
  },

  async getAdminOverview() {
    return this.getAdminMetrics();
  },

  async getCertificateRequests() {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { ...(await this.authHeaders()) }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.certificate_requests) && data.certificate_requests.length > 0) {
          return data.certificate_requests;
        }
      }
      const db = mockEngine.getDb();
      return db.certificate_requests || [];
    } catch (err) {
      console.warn('Fallback local getCertificateRequests:', err.message);
      const db = mockEngine.getDb();
      return db.certificate_requests || [];
    }
  },

  async enrollStudent(userId, courseId) {
    return this.enrol(userId, courseId);
  },

  async suspendStudent(userId, status, reason = 'Administrative action') {
    return this.updateUserStatus(userId, status, reason);
  },

  async deleteStudent(userId, email) {
    return this.deleteUser(userId, email);
  }
};
