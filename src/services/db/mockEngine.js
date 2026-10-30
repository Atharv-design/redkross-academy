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
} from './seedData.js';
import { socketClient } from '../socket/socketClient.js';

const STORAGE_KEY = 'redkross_academy_db_v1';
const BROADCAST_BUS_CHANNEL = 'redkross_academy_bus';

const memoryStore = new Map();
const safeStorage = {
  getItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      try { return localStorage.getItem(key); } catch (e) { return memoryStore.get(key) || null; }
    }
    return memoryStore.get(key) || null;
  },
  setItem: (key, val) => {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem(key, String(val)); } catch (e) { memoryStore.set(key, String(val)); }
    }
    memoryStore.set(key, String(val));
  },
  removeItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.removeItem(key); } catch (e) {}
    }
    memoryStore.delete(key);
  }
};

export function generateDeterministicCadetId(email = '', uid = '', existingUsers = []) {
  const seedString = `${(email || '').trim().toLowerCase()}::${(uid || '').trim()}`;

  let hash = 2166136261;
  for (let i = 0; i < seedString.length; i++) {
    hash ^= seedString.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const baseNumber = (Math.abs(hash) % 90000) + 10000; // 10000 to 99999 (5 digits)

  const takenIds = new Set(
    existingUsers
      .filter((u) => u && u.cadet_id && u.email?.toLowerCase() !== email?.toLowerCase() && u.id !== uid)
      .map((u) => u.cadet_id)
  );

  let candidate = `RK-${baseNumber}`;
  let offset = 0;
  while (takenIds.has(candidate) && offset < 90000) {
    offset++;
    const nextNumber = ((baseNumber - 10000 + offset) % 90000) + 10000;
    candidate = `RK-${nextNumber}`;
  }

  return candidate;
}

let globalBroadcastChannel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    globalBroadcastChannel = new BroadcastChannel(BROADCAST_BUS_CHANNEL);
  } catch (e) {
    console.warn('BroadcastChannel not supported in this runtime environment:', e);
  }
}

class MockEngine {
  constructor() {
    this.listeners = new Set();
    this.initDatabase();
    this.initBusListener();
  }

  initBusListener() {
    if (globalBroadcastChannel) {
      globalBroadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type) {
          this.notifyListeners(event.data.type, event.data.payload);
        }
      };
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY) {
          this.notifyListeners('STORAGE_SYNC', { newValue: event.newValue });
        }
      });
    }
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.add(callback);
      return () => this.listeners.delete(callback);
    }
    return () => {};
  }

  emit(type, payload = {}) {
    this.notifyListeners(type, payload);

    if (socketClient) {
      try {
        socketClient.emit(type, payload);
      } catch (err) {
        // Ignored
      }
    }

    if (globalBroadcastChannel) {
      try {
        globalBroadcastChannel.postMessage({ type, payload, timestamp: Date.now() });
      } catch (err) {
        console.warn('Failed to broadcast event:', err);
      }
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('redkross:db_updated', {
            detail: { type, payload, timestamp: Date.now() }
          })
        );
      } catch (err) {
        console.warn('Failed to dispatch CustomEvent:', err);
      }
    }
  }

  notifyListeners(type, payload) {
    this.listeners.forEach((fn) => {
      try {
        fn({ type, payload });
      } catch (e) {
        console.error('Error in mockEngine listener:', e);
      }
    });
  }

  initDatabase(forceReset = false) {
    if (forceReset || !safeStorage.getItem(STORAGE_KEY)) {
      const initialDb = {
        _initialized: true,
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
        assignment_submissions: [],
        certificate_requests: [],
        banned_emails: [],
      };
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
    }
  }

  getDb() {
    try {
      const data = safeStorage.getItem(STORAGE_KEY);
      let parsed = data ? JSON.parse(data) : null;
      // PERMANENT PERSISTENCE FIX: Never re-initialize if courses or users are empty.
      // An empty array is a valid user mutation (e.g. admin deleted all courses).
      if (!parsed || !parsed._initialized) {
        this.initDatabase(true);
        parsed = JSON.parse(safeStorage.getItem(STORAGE_KEY));
      }

      // Ensure all core collections exist as arrays
      parsed.courses = parsed.courses || [];
      parsed.users = parsed.users || [];
      parsed.enrolments = parsed.enrolments || [];
      parsed.learning_paths = parsed.learning_paths || [];
      parsed.credentials = parsed.credentials || [];
      parsed.reward_ledger = parsed.reward_ledger || [];
      parsed.audit_logs = parsed.audit_logs || [];
      parsed.assignment_submissions = parsed.assignment_submissions || [];
      parsed.exam_violation_events = parsed.exam_violation_events || [];
      parsed.certificate_requests = parsed.certificate_requests || [];
      parsed.quiz_retry_windows = parsed.quiz_retry_windows || {};
      parsed.banned_emails = parsed.banned_emails || [];

      // Ensure all course lessons have a playable video_url (repair missing, BigBuckBunny 403, or expired blob URLs)
      let modified = false;
      if (parsed.courses) {
        for (const course of parsed.courses) {
          if (course.modules) {
            for (const mod of course.modules) {
              if (mod.lessons) {
                for (const les of mod.lessons) {
                  if (!les.video_url || les.video_url.includes('BigBuckBunny')) {
                    les.video_url = '/assets/sample-lesson.mp4';
                    les.video_title = les.video_title || les.title;
                    les.video_duration = les.video_duration || les.duration || '15:00';
                    modified = true;
                  }
                }
              }
            }
          }
        }
      }

      // Ensure all users have a deterministic, collision-proof Cadet ID (RK-XXXXX)
      if (parsed.users) {
        for (const user of parsed.users) {
          if (!user.cadet_id) {
            user.cadet_id = generateDeterministicCadetId(user.email, user.id, parsed.users);
            modified = true;
          }
        }
      }

      // Ensure all enrolments have required array properties
      if (parsed.enrolments) {
        for (const enr of parsed.enrolments) {
          if (!enr.status) {
            enr.status = 'active';
            modified = true;
          }
          if (!Array.isArray(enr.passed_quizzes)) {
            enr.passed_quizzes = [];
            modified = true;
          }
          if (!Array.isArray(enr.completed_mandatory_lessons)) {
            enr.completed_mandatory_lessons = [];
            modified = true;
          }
          if (!Array.isArray(enr.passed_assignments)) {
            enr.passed_assignments = [];
            modified = true;
          }
        }
      }

      if (modified) {
        this.saveDb(parsed);
      }

      return parsed;
    } catch (e) {
      console.error('Failed to parse database, resetting...', e);
      this.initDatabase(true);
      return JSON.parse(safeStorage.getItem(STORAGE_KEY));
    }
  }

  saveDb(db, eventMetadata = { type: 'DB_MUTATED', payload: {} }) {
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    this.emit(eventMetadata.type || 'DB_MUTATED', eventMetadata.payload || {});
  }

  // ==========================================
  // ATOMIC BUSINESS LOGIC METHODS
  // ==========================================
  grantTokens(userId, amount, reason = 'Administrative grant') {
    const db = this.getDb();
    const user = (db.users || []).find((u) => u.id === userId);
    if (!user) return null;

    const currentBalance = user.token_balance || 0;
    const newBalance = Math.max(0, currentBalance + parseInt(amount));
    user.token_balance = newBalance;

    // Record in reward ledger
    if (!db.reward_ledger) db.reward_ledger = [];
    const ledgerEntry = {
      id: `led_${Date.now()}`,
      user_id: userId,
      event_type: amount >= 0 ? 'BONUS_REWARD' : 'ADMIN_DEDUCTION',
      amount: parseInt(amount),
      reason,
      created_at: new Date().toISOString()
    };
    db.reward_ledger.unshift(ledgerEntry);

    // Record audit log
    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'TOKEN_ADJUSTMENT',
      category: 'STUDENT_ADMIN',
      user_email: user.email,
      details: `Admin adjusted balance by ${amount > 0 ? '+' : ''}${amount} tokens. Reason: ${reason}. New balance: ${newBalance}`,
      severity: 'INFO',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'TOKEN_MUTATED',
      payload: { userId, amount, newBalance, ledgerEntry }
    });
    return user;
  }

  setUserAccountStatus(userId, status, reason = 'Administrative intervention') {
    const db = this.getDb();
    const user = (db.users || []).find((u) => u.id === userId);
    if (!user) return null;

    user.status = status;
    user.is_suspended = status === 'SUSPENDED';

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'USER_ACCOUNT_STATUS_CHANGE',
      category: 'STUDENT_ADMIN',
      user_email: user.email,
      details: `User account status set to ${status}. Reason: ${reason}`,
      severity: status === 'SUSPENDED' ? 'WARN' : 'INFO',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'USER_STATUS_MUTATED',
      payload: { userId, status, is_suspended: user.is_suspended, reason }
    });
    return user;
  }

  isEmailBanned(email) {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    const db = this.getDb();
    return Boolean(db.banned_emails && db.banned_emails.includes(cleanEmail));
  }

  permanentlyDeleteStudent(userId, email, reason = 'Permanent administrative purge') {
    const db = this.getDb();
    const student = (db.users || []).find((u) => u.id === userId || (email && u.email?.toLowerCase() === email.toLowerCase()));
    const targetEmail = (email || student?.email || '').trim().toLowerCase();
    const targetName = student?.name || student?.full_name || 'Cadet';

    // 1. Remove user from users array
    db.users = (db.users || []).filter((u) => u.id !== userId && (targetEmail ? u.email?.toLowerCase() !== targetEmail : true));

    // 2. Cascade delete enrolments
    db.enrolments = (db.enrolments || []).filter((e) => e.user_id !== userId && (student?.cadet_id ? e.cadet_id !== student.cadet_id : true));

    // 3. Delete or revoke credentials
    if (db.credentials) {
      db.credentials = db.credentials.filter((c) => c.student_email?.toLowerCase() !== targetEmail && (student?.cadet_id ? c.cadet_id !== student.cadet_id : true));
    }

    // 4. Blacklist email permanently so user cannot re-register
    if (!db.banned_emails) db.banned_emails = [];
    if (targetEmail && !db.banned_emails.includes(targetEmail)) {
      db.banned_emails.push(targetEmail);
    }

    // 5. Audit log
    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'STUDENT_ACCOUNT_PURGED',
      category: 'STUDENT_ADMIN',
      user_email: targetEmail,
      details: `Permanent deletion of cadet ${targetName} (${targetEmail}). Email permanently blacklisted from re-registration. Reason: ${reason}`,
      severity: 'CRITICAL',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'USER_PURGED',
      payload: { userId, email: targetEmail, studentName: targetName }
    });

    return { success: true, userId, email: targetEmail, studentName: targetName };
  }

  updateCourseCurriculum(courseId, curriculumData) {
    const db = this.getDb();
    const idx = (db.courses || []).findIndex((c) => c.id === courseId);
    if (idx !== -1) {
      db.courses[idx] = { ...db.courses[idx], ...curriculumData };
      this.saveDb(db, {
        type: 'CURRICULUM_MUTATED',
        payload: { courseId, course: db.courses[idx] }
      });
      return db.courses[idx];
    }
    return null;
  }

  isUserSuspended(userId) {
    const user = this.getUserById(userId);
    return user ? Boolean(user.is_suspended || user.status === 'SUSPENDED') : false;
  }

  resetToSeed() {
    this.initDatabase(true);
    return this.getDb();
  }

  // ==========================================
  // USERS & CADET IDENTITY
  // ==========================================
  getUsers() {
    return this.getDb().users;
  }

  getUserById(id) {
    if (!id) return null;
    const cleanId = String(id).trim().toUpperCase();
    return this.getDb().users.find(
      (u) =>
        u.id === id ||
        (u.cadet_id && u.cadet_id.toUpperCase() === cleanId) ||
        (u.email && u.email.toUpperCase() === cleanId)
    );
  }

  getOrCreateCadetUser(userData = {}) {
    const db = this.getDb();
    if (!db.users) db.users = [];

    const email = (userData.email || '').trim().toLowerCase();
    const uid = userData.uid || userData.id;

    if (email && this.isEmailBanned(email)) {
      const err = new Error('BANNED_EMAIL / BANNED_ACCOUNT: This email address has been permanently blacklisted and banned from RedKross Academy.');
      err.code = 'BANNED_EMAIL';
      throw err;
    }

    // Check if user already exists
    let existing = db.users.find((u) =>
      (uid && u.id === uid) ||
      (email && u.email?.toLowerCase() === email)
    );

    if (existing) {
      if (!existing.cadet_id) {
        existing.cadet_id = generateDeterministicCadetId(existing.email, existing.id, db.users);
        this.saveDb(db, { type: 'USER_UPDATED', payload: { user: existing } });
      }
      return existing;
    }

    // Create new cadet user with deterministic collision-proof ID
    const cadetId = generateDeterministicCadetId(email, uid, db.users);
    const newUser = {
      id: uid || `usr_${Date.now()}`,
      cadet_id: cadetId,
      email: userData.email,
      full_name: userData.full_name || userData.displayName || (email.split('@')[0]) || 'Cadet Operator',
      avatar: userData.avatar || userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name || userData.displayName || 'Cadet')}&background=101923&color=65F58A&bold=true`,
      role: 'student',
      status: 'ACTIVE',
      token_balance: 150,
      streak_days: 1,
      headline: 'Certified Cyber Defense Cadet',
      created_at: new Date().toISOString()
    };

    db.users.push(newUser);

    // Auto-enroll cadet in initial foundation course
    if (db.courses && db.courses.length > 0) {
      if (!db.enrolments) db.enrolments = [];
      const primaryCourse = db.courses[0];
      const newEnrolment = {
        id: `enr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        user_id: newUser.id,
        cadet_id: cadetId,
        course_id: primaryCourse.id,
        status: 'in_progress',
        progress: 0,
        completed_mandatory_lessons: [],
        passed_quizzes: [],
        current_lesson_id: primaryCourse.modules?.[0]?.lessons?.[0]?.id || null,
        enrolled_at: new Date().toISOString()
      };
      db.enrolments.push(newEnrolment);
    }

    this.saveDb(db, {
      type: 'USER_CREATED',
      payload: { user: newUser }
    });

    return newUser;
  }

  getCadetDossier(identifier) {
    if (!identifier) return null;
    const cleanId = String(identifier).trim().toUpperCase();
    const db = this.getDb();

    // Find cadet by cadet_id, email, or user id
    const cadet = (db.users || []).find((u) =>
      (u.cadet_id && u.cadet_id.toUpperCase() === cleanId) ||
      (u.email && u.email.toUpperCase() === cleanId) ||
      (u.id && u.id.toUpperCase() === cleanId)
    );

    if (!cadet) return null;

    // Check if cadet account is suspended: redact and withhold all personal data and credentials
    if (cadet.status === 'SUSPENDED' || cadet.is_suspended) {
      return {
        isSuspended: true,
        cadet: {
          id: cadet.id,
          cadet_id: cadet.cadet_id || 'RK-89421',
          status: 'SUSPENDED',
          message: 'This cadet account is under official administrative suspension by RedKross Academy Administration. All accreditations, diplomas, course progress, and telemetry are withheld and invalid for public verification.'
        },
        enrolments: [],
        credentials: [],
        metrics: {
          totalEnrolled: 0,
          totalCompleted: 0,
          totalCredentials: 0,
          tokensEarned: 0
        }
      };
    }

    // Get all enrollments for this cadet
    const enrolments = (db.enrolments || []).filter((e) => e.user_id === cadet.id);
    const enrichedEnrolments = enrolments.map((enr) => {
      const course = (db.courses || []).find((c) => c.id === enr.course_id);
      const progress = this.getCourseProgress(enr.id);
      return {
        ...enr,
        course_title: course?.title || 'Defensive Cyber Operations Track',
        course_category: course?.category || 'Specialist Training',
        progress_percentage: progress.percentage || 0,
        completed: progress.percentage >= 100
      };
    });

    // Get all credentials / certificates issued to this cadet
    const credentials = (db.credentials || []).filter((c) =>
      c.student_email?.toLowerCase() === cadet.email?.toLowerCase() ||
      c.student_name?.toLowerCase() === cadet.full_name?.toLowerCase() ||
      c.student_name?.toLowerCase() === cadet.name?.toLowerCase() ||
      c.cadet_id === cadet.cadet_id
    );

    return {
      cadet: {
        id: cadet.id,
        cadet_id: cadet.cadet_id || 'RK-89421',
        full_name: cadet.full_name || cadet.name || 'Cadet Operator',
        email: cadet.email,
        avatar: cadet.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(cadet.full_name || 'Cadet')}&background=101923&color=65F58A&bold=true`,
        headline: cadet.headline || 'Verified Cyber Defense Specialist',
        status: cadet.is_suspended ? 'SUSPENDED' : 'ACTIVE_VERIFIED',
        token_balance: cadet.token_balance || 150,
        created_at: cadet.created_at || '2026-10-01',
      },
      enrolments: enrichedEnrolments,
      credentials,
      metrics: {
        totalEnrolled: enrichedEnrolments.length,
        totalCompleted: enrichedEnrolments.filter((e) => e.completed).length,
        totalCredentials: credentials.filter((c) => !c.revoked).length,
        tokensEarned: cadet.token_balance || 150
      }
    };
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
  isPublicCatalogEnabled() {
    const db = this.getDb();
    if (typeof db.public_catalog_enabled === 'boolean') {
      return db.public_catalog_enabled;
    }
    return false; // Embargoed by default: renders "Courses will be out soon"
  }

  setPublicCatalogEnabled(enabled) {
    const db = this.getDb();
    db.public_catalog_enabled = Boolean(enabled);
    this.saveDb(db);
    return db.public_catalog_enabled;
  }

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

  createCourse(coursePayload) {
    const db = this.getDb();

    // If course with this exact ID already exists (e.g. from background API sync), return it safely
    if (coursePayload.id) {
      const byId = (db.courses || []).find((c) => c.id === coursePayload.id);
      if (byId) return byId;
    }

    // DUPLICATE COURSE GUARD: Prevent duplicate course creation
    const trimmedTitle = (coursePayload.title || '').trim().toLowerCase();
    const candidateSlug = (coursePayload.slug || (coursePayload.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')).trim().toLowerCase();
    
    if (trimmedTitle) {
      const existing = (db.courses || []).find(
        (c) => (c.title?.trim().toLowerCase() === trimmedTitle || (candidateSlug && c.slug?.toLowerCase() === candidateSlug)) && c.id !== coursePayload.id
      );
      if (existing) {
        const err = new Error(`DUPLICATE_COURSE: A course titled "${coursePayload.title}" or with slug "${candidateSlug}" already exists in the catalog.`);
        err.code = 'DUPLICATE_COURSE';
        throw err;
      }
    }

    const variantNum = Math.floor(Math.random() * 10) + 1;
    const variantId = `variant-${String(variantNum).padStart(2, '0')}`;
    const defaultPreset = {
      art: `/assets/course-art/art-${String(variantNum).padStart(2, '0')}.jpg`,
      artPos: '75% 30%',
    };

    const newCourse = {
      id: coursePayload.id || `crs_${Date.now()}`,
      slug: coursePayload.slug || candidateSlug || `course-${Date.now()}`,
      title: coursePayload.title || 'Specialist Cyber Operations Track',
      version: coursePayload.version || '1.0',
      status: coursePayload.status || 'PUBLISHED',
      category: coursePayload.category || 'Specialist Operations',
      difficulty: coursePayload.difficulty || coursePayload.level || 'Intermediate',
      level: coursePayload.level || coursePayload.difficulty || 'Intermediate',
      price: typeof coursePayload.price === 'number' ? coursePayload.price : 0,
      cert_price: typeof coursePayload.cert_price === 'number' ? coursePayload.cert_price : 2999,
      estimated_duration: coursePayload.estimated_duration || coursePayload.duration || '4 Weeks',
      duration: coursePayload.duration || coursePayload.estimated_duration || '4 Weeks',
      estimated_weeks: coursePayload.estimated_weeks || 8,
      rating: 5.0,
      enrolled_count: 0,
      card_variant: coursePayload.card_variant || variantId,
      art: coursePayload.art || defaultPreset.art,
      artPos: coursePayload.artPos || defaultPreset.artPos,
      milestone_cert: coursePayload.milestone_cert || `Certified ${(coursePayload.title || 'Cyber').split(' ')[0]} Specialist`,
      skills: coursePayload.skills && coursePayload.skills.length > 0
        ? coursePayload.skills
        : (coursePayload.learning_objectives && coursePayload.learning_objectives.length > 0
            ? coursePayload.learning_objectives.slice(0, 4)
            : ['Defensive Operations', 'Threat Triage', 'Log Inspection']),
      overview: coursePayload.overview || coursePayload.description || `Comprehensive curriculum designed by RedKross Academy for ${coursePayload.title}.`,
      description: coursePayload.description || coursePayload.overview || `Comprehensive curriculum designed by RedKross Academy for ${coursePayload.title}.`,
      learning_objectives: coursePayload.learning_objectives || [],
      lead_author: coursePayload.lead_author || {
        name: 'Sarah Chen, CISSP',
        title: 'Principal Incident Handler, RedKross Lab',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
      },
      prerequisites: coursePayload.prerequisites || ['Basic Cybersecurity Fundamentals'],
      total_tokens_reward: coursePayload.total_tokens_reward || coursePayload.xp_reward || 350,
      xp_reward: coursePayload.xp_reward || coursePayload.total_tokens_reward || 350,
      modules: coursePayload.modules && coursePayload.modules.length > 0 ? coursePayload.modules : [
        {
          id: `mod_${Date.now()}_1`,
          title: 'Module 1: Architecture & Defensive Fundamentals',
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}_1_1`,
              title: '1.1 System Initialization & Telemetry',
              duration: '20 mins',
              is_mandatory: true,
              summary: 'Core foundational architecture and telemetry pipelines.',
              content: `### Telemetry Ingestion & Core Objectives\n\nDefensive operators must maintain 100% visibility over host and network telemetry.\n\n\`\`\`bash\n# Inspect listening telemetry sockets\nss -tulpn\n\`\`\``
            }
          ]
        }
      ],
      created_at: new Date().toISOString(),
    };

    if (!db.courses) db.courses = [];
    db.courses.unshift(newCourse);

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: 'usr_admin',
      action: 'COURSE_PUBLISHED',
      entity_type: 'courses',
      entity_id: newCourse.id,
      details: `Published Course: ${newCourse.title} with 3D design ${newCourse.card_variant}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db, {
      type: 'CURRICULUM_MUTATED',
      payload: { courseId: newCourse.id, course: newCourse, courses: db.courses }
    });
    return newCourse;
  }

  addModuleAssignment(courseId, moduleId, assignmentPayload) {
    const db = this.getDb();
    const course = (db.courses || []).find((c) => c.id === courseId);
    if (!course) return null;
    const mod = (course.modules || []).find((m) => m.id === moduleId);
    if (!mod) return null;

    if (!mod.lessons) mod.lessons = [];
    const assignmentItem = {
      id: assignmentPayload.id || `asn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: assignmentPayload.title || 'Module Capstone Practical Assignment',
      type: 'assignment',
      duration: assignmentPayload.duration || '45 mins',
      points: Number(assignmentPayload.points) || 100,
      due_days: Number(assignmentPayload.due_days) || 7,
      instructions: assignmentPayload.instructions || 'Download the lab template, complete your investigation, and upload your PDF submission.',
      template_name: assignmentPayload.template_name || 'Lab_Investigation_Brief.pdf',
      allowed_file_types: assignmentPayload.allowed_file_types || 'PDF (.pdf)',
      is_mandatory: true,
      created_at: new Date().toISOString()
    };

    mod.lessons.push(assignmentItem);

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'COURSE_ASSIGNMENT_ADDED',
      category: 'COURSE_MUTATION',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Added practical assignment "${assignmentItem.title}" to module "${mod.title}"`,
      severity: 'INFO',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'CURRICULUM_MUTATED',
      payload: { courseId, moduleId, assignment: assignmentItem }
    });

    return assignmentItem;
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

    const completedList = Array.isArray(enrolment.completed_mandatory_lessons)
      ? enrolment.completed_mandatory_lessons
      : [];
    const completed = completedList.length;
    const percentage = Math.min(100, Math.round((completed / totalMandatory) * 100));

    return { percentage, completed, total: totalMandatory };
  }

  completeLesson(enrolmentId, lessonId) {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    if (!enrolment) throw new Error('Enrolment not found');

    if (!Array.isArray(enrolment.completed_mandatory_lessons)) {
      enrolment.completed_mandatory_lessons = [];
    }

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
    if (!verificationId) return null;
    const cleanId = String(verificationId).trim().toUpperCase();
    const db = this.getDb();
    return (db.credentials || []).find((c) => {
      const vId = (c.verification_id || c.id || '').toUpperCase();
      const cId = (c.id || '').toUpperCase();
      return vId === cleanId || cId === cleanId;
    });
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

  // ==========================================
  // SUPER ADMIN CURRICULUM STUDIO MUTATIONS
  // ==========================================
  reorderModulesAndLessons(courseId, modulesPayload, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return null;

    course.modules = modulesPayload;
    course.updated_at = new Date().toISOString();

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'CURRICULUM_REORDERED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Reordered hierarchy for course ${course.title} (${modulesPayload.length} modules)`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return course;
  }

  saveLessonContent(courseId, moduleId, lessonId, updates, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return null;

    const mod = (course.modules || []).find((m) => m.id === moduleId);
    if (!mod) return null;

    const lessonIdx = (mod.lessons || []).findIndex((l) => l.id === lessonId);
    if (lessonIdx === -1) return null;

    mod.lessons[lessonIdx] = { ...mod.lessons[lessonIdx], ...updates };
    course.updated_at = new Date().toISOString();

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'LESSON_CONTENT_UPDATED',
      entity_type: 'lessons',
      entity_id: lessonId,
      details: `Updated lesson ${mod.lessons[lessonIdx].title} content in ${course.title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return mod.lessons[lessonIdx];
  }

  saveQuizQuestions(courseId, moduleId, quizId, quizPayload, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return null;

    const mod = (course.modules || []).find((m) => m.id === moduleId);
    if (!mod) return null;

    if (!mod.quiz) {
      mod.quiz = { id: quizId || `q_${Date.now()}`, title: 'Module Assessment', questions: [] };
    }
    mod.quiz = { ...mod.quiz, ...quizPayload };
    course.updated_at = new Date().toISOString();

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'QUIZ_CONFIGURED',
      entity_type: 'quizzes',
      entity_id: mod.quiz.id,
      details: `Updated quiz questions and scoring parameters for ${course.title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return mod.quiz;
  }

  uploadVideoAsset(courseId, assetPayload, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return null;

    if (!course.video_assets) {
      course.video_assets = [];
    }

    const newAsset = {
      id: assetPayload.id || `vid_${Date.now()}`,
      title: assetPayload.title || 'Untitled Video Lesson',
      duration: assetPayload.duration || '15:00',
      file_name: assetPayload.file_name || 'lesson-video.mp4',
      file_size: assetPayload.file_size || '45 MB',
      lesson_id: assetPayload.lesson_id || null,
      lesson_title: assetPayload.lesson_title || 'Unassigned',
      visibility: assetPayload.visibility || 'Enrolled Only',
      thumbnail: assetPayload.thumbnail || course.art || '/assets/course-art/art-01.jpg',
      url: assetPayload.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      uploaded_at: new Date().toISOString(),
    };

    // If associated with a lesson, also attach it to that lesson object directly
    if (newAsset.lesson_id && course.modules) {
      for (const m of course.modules) {
        const targetLesson = (m.lessons || []).find((l) => l.id === newAsset.lesson_id);
        if (targetLesson) {
          targetLesson.video_url = newAsset.url;
          targetLesson.video_title = newAsset.title;
          targetLesson.video_duration = newAsset.duration;
          targetLesson.video_asset_id = newAsset.id;
          break;
        }
      }
    }

    course.video_assets.unshift(newAsset);

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'VIDEO_ASSET_UPLOADED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Uploaded video "${newAsset.title}" attached to ${newAsset.lesson_title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return newAsset;
  }

  deleteVideoAsset(courseId, assetId, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course || !course.video_assets) return false;

    course.video_assets = course.video_assets.filter((a) => a.id !== assetId);

    // Unlink from lessons if bound
    if (course.modules) {
      for (const m of course.modules) {
        for (const l of m.lessons || []) {
          if (l.video_asset_id === assetId) {
            delete l.video_url;
            delete l.video_title;
            delete l.video_duration;
            delete l.video_asset_id;
          }
        }
      }
    }

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'VIDEO_ASSET_DELETED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Deleted video asset ${assetId} from ${course.title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return true;
  }

  rebindVideoAsset(courseId, assetId, newLessonId, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course || !course.video_assets) return null;

    const asset = course.video_assets.find((a) => a.id === assetId);
    if (!asset) return null;

    // Unbind from previous lesson
    if (course.modules) {
      for (const m of course.modules) {
        for (const l of m.lessons || []) {
          if (l.video_asset_id === assetId) {
            delete l.video_url;
            delete l.video_title;
            delete l.video_duration;
            delete l.video_asset_id;
          }
        }
      }
    }

    asset.lesson_id = newLessonId || null;
    let targetLessonName = 'Unassigned';

    // Bind to new target lesson
    if (newLessonId && course.modules) {
      for (const m of course.modules) {
        const targetLesson = (m.lessons || []).find((l) => l.id === newLessonId);
        if (targetLesson) {
          targetLesson.video_url = asset.url;
          targetLesson.video_title = asset.title;
          targetLesson.video_duration = asset.duration;
          targetLesson.video_asset_id = asset.id;
          targetLessonName = targetLesson.title;
          break;
        }
      }
    }

    asset.lesson_title = targetLessonName;
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'VIDEO_ASSET_REATTACHED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Rebound video "${asset.title}" to lesson "${targetLessonName}"`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return asset;
  }

  publishCourseVersion(courseId, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return null;

    // Bump version: 1.0 -> 1.1, 1.1 -> 1.2
    const currentVer = parseFloat(course.version || '1.0');
    const newVer = (currentVer + 0.1).toFixed(1);
    course.version = newVer;
    course.is_published = true;
    course.published_at = new Date().toISOString();

    if (!course.version_history) course.version_history = [];
    course.version_history.unshift({
      version: newVer,
      published_at: course.published_at,
      published_by: adminEmail,
      notes: 'Live Curriculum Publication & Reorder Sync',
    });

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'COURSE_VERSION_PUBLISHED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Published live course version ${newVer} for ${course.title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return course;
  }

  // ==========================================
  // SUPER ADMIN STUDENT LIFECYCLE MANAGEMENT
  // ==========================================
  resetStudentProgress(userId, courseId, lessonId = null, reason = '', adminEmail = 'usr_admin') {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.user_id === userId && e.course_id === courseId);
    if (!enrolment) return false;

    if (lessonId) {
      // Reset specific lesson
      enrolment.completed_mandatory_lessons = (enrolment.completed_mandatory_lessons || []).filter(
        (id) => id !== lessonId
      );
    } else {
      // Full course progress reset
      enrolment.completed_mandatory_lessons = [];
      enrolment.passed_quizzes = [];
      enrolment.final_assessment_attempt_id = null;
    }

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'STUDENT_PROGRESS_RESET',
      entity_type: 'enrolments',
      entity_id: enrolment.id,
      details: `Progress reset for student ${userId} in course ${courseId}. Scope: ${lessonId || 'Full Course'}. Reason: ${reason || 'Technical Override'}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return true;
  }

  rebindVideoAsset(courseId, assetId, newLessonId, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course || !course.video_assets) return null;

    const asset = course.video_assets.find((a) => a.id === assetId);
    if (!asset) return null;

    // Unbind from previous lesson
    if (course.modules) {
      for (const m of course.modules) {
        for (const l of m.lessons || []) {
          if (l.video_asset_id === assetId) {
            delete l.video_url;
            delete l.video_title;
            delete l.video_duration;
            delete l.video_asset_id;
          }
        }
      }
    }

    asset.lesson_id = newLessonId || null;
    let targetLessonName = 'Unassigned';

    // Bind to new target lesson
    if (newLessonId && course.modules) {
      for (const m of course.modules) {
        const targetLesson = (m.lessons || []).find((l) => l.id === newLessonId);
        if (targetLesson) {
          targetLesson.video_url = asset.url;
          targetLesson.video_title = asset.title;
          targetLesson.video_duration = asset.duration;
          targetLesson.video_asset_id = asset.id;
          targetLessonName = targetLesson.title;
          break;
        }
      }
    }

    asset.lesson_title = targetLessonName;
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'VIDEO_ASSET_REATTACHED',
      entity_type: 'courses',
      entity_id: courseId,
      details: `Rebound video "${asset.title}" to lesson "${targetLessonName}"`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return asset;
  }

  adjustStudentTokens(userId, amount, reason, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;

    const numAmount = parseInt(amount, 10);
    const tx = {
      id: `tx_${Date.now()}`,
      user_id: userId,
      amount: numAmount,
      type: numAmount >= 0 ? 'admin_credit' : 'admin_debit',
      description: `Manual adjustment by Super Admin: ${reason}`,
      created_at: new Date().toISOString(),
    };

    db.reward_ledger.unshift(tx);

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'TOKEN_ADJUSTMENT',
      entity_type: 'reward_ledger',
      entity_id: tx.id,
      details: `${numAmount >= 0 ? 'Credited' : 'Debited'} ${Math.abs(numAmount)} tokens for ${user.full_name}. Reason: ${reason}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return tx;
  }

  forceIssueCredential(userId, courseId, adminEmail = 'usr_admin') {
    const db = this.getDb();
    const user = db.users.find((u) => u.id === userId);
    const course = db.courses.find((c) => c.id === courseId);
    if (!user || !course) return null;

    let enrolment = db.enrolments.find((e) => e.user_id === userId && e.course_id === courseId);
    if (!enrolment) {
      enrolment = this.enrolStudent(userId, courseId);
    }

    const verificationId = `RK-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const issueDate = new Date().toISOString().split('T')[0];
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 2);

    const credential = {
      id: `cred_${Date.now()}`,
      verification_id: verificationId,
      student_name: user.full_name,
      user_id: user.id,
      course_id: course.id,
      course_title: course.title,
      credential_title: course.milestone_cert || `Certified ${course.title.split(' ')[0]} Specialist`,
      type: 'Executive Certification (Admin Issued)',
      issue_date: issueDate,
      expiration_date: expDate.toISOString().split('T')[0],
      grade_percentage: 100,
      status: 'Active',
      digital_signature: `0x${Math.random().toString(16).substr(2)}${Math.random().toString(16).substr(2)}`,
      verification_url: `https://academy.redkross.org.in/verify/${verificationId}`,
      skills_validated: course.skills || ['Administrative Command Clearance', 'Enterprise Defense'],
    };

    db.credentials.unshift(credential);
    enrolment.credential_id = credential.id;

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'CREDENTIAL_FORCE_ISSUED',
      entity_type: 'credentials',
      entity_id: credential.id,
      details: `Force-issued verified credential ${verificationId} to ${user.full_name} for ${course.title}`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return credential;
  }

  // ==========================================
  // GLOBAL SECURITY POLICY & TRACKING
  // ==========================================
  getGlobalSecurityPolicy() {
    const db = this.getDb();
    return db.security_policy || {
      strike_threshold: 3,
      lockout_duration_hours: 24,
      strike2_token_penalty: 50,
      auto_kill_on_blur: true,
      last_updated: new Date().toISOString(),
    };
  }

  updateGlobalSecurityPolicy(updates, adminEmail = 'usr_admin') {
    const db = this.getDb();
    db.security_policy = {
      ...(db.security_policy || {}),
      ...updates,
      last_updated: new Date().toISOString(),
    };

    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      actor_id: adminEmail,
      action: 'SECURITY_POLICY_UPDATED',
      entity_type: 'settings',
      entity_id: 'global_security_policy',
      details: `Updated security thresholds: Strikes=${db.security_policy.strike_threshold}, Lockout=${db.security_policy.lockout_duration_hours}h`,
      created_at: new Date().toISOString(),
    });

    this.saveDb(db);
    return db.security_policy;
  }

  getLiveStudentTracking() {
    const db = this.getDb();
    const students = db.users.filter((u) => u.role === 'student');

    return students.map((s) => {
      // Check if student has an active strike-3 lockout
      let isLockedOut = false;
      let lockoutUntil = null;
      for (const [key, windowData] of Object.entries(db.quiz_retry_windows || {})) {
        if (key.startsWith(s.id) && windowData.locked_until) {
          if (new Date(windowData.locked_until) > new Date()) {
            isLockedOut = true;
            lockoutUntil = windowData.locked_until;
            break;
          }
        }
      }

      // Check if student has in-progress quiz attempts
      const inExam = (db.quiz_attempts || []).some(
        (a) => a.user_id === s.id && a.state === 'in_progress'
      );

      let operationalStatus = 'active_learner';
      if (isLockedOut) operationalStatus = 'locked_out';
      else if (inExam) operationalStatus = 'in_exam';

      return {
        ...s,
        operational_status: operationalStatus,
        lockout_until: lockoutUntil,
      };
    });
  }

  // ==========================================
  // REAL-TIME PROCTORING & STRICT 24-HOUR LOCKOUT ENGINE
  // ==========================================
  recordProctorViolation({ enrolmentId, quizId, attemptId, cadetId, studentName, violationType, details }) {
    const db = this.getDb();
    const lockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // 1. Lock retry window for this quiz & enrolment for 24 hours
    const windowKey = `${enrolmentId}_${quizId}`;
    if (!db.quiz_retry_windows) db.quiz_retry_windows = {};
    db.quiz_retry_windows[windowKey] = {
      enrolment_id: enrolmentId,
      quiz_id: quizId,
      locked_until: lockedUntil,
      attempts_used: 3, // Exhaust attempts for current window to prevent bypass
      reason: `STRICT_PROCTOR_VIOLATION: ${violationType}`,
      last_violation_at: new Date().toISOString()
    };

    // 2. Lock enrolment object
    const enrolment = (db.enrolments || []).find((e) => e.id === enrolmentId);
    if (enrolment) {
      enrolment.exam_lockout_until = lockedUntil;
      enrolment.last_violation = {
        violationType,
        details,
        timestamp: new Date().toISOString()
      };
    }

    // 3. Mark attempt as terminated
    if (attemptId && db.quiz_attempts) {
      const attempt = db.quiz_attempts.find((a) => a.id === attemptId);
      if (attempt) {
        attempt.status = 'terminated';
        attempt.termination_reason = violationType;
        attempt.terminated_at = new Date().toISOString();
      }
    }

    // 4. Log incident to exam_violation_events
    if (!db.exam_violation_events) db.exam_violation_events = [];
    const eventId = `viol_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const violationEvent = {
      id: eventId,
      enrolment_id: enrolmentId,
      quiz_id: quizId,
      cadet_id: cadetId || 'RK-UNKNOWN',
      student_name: studentName || 'Cadet Operator',
      violation_type: violationType, // 'CAMERA_DISCONNECT_X2' | 'TAB_SWITCH_BLUR'
      details: details || 'Proctor security violation during timed assessment.',
      locked_until: lockedUntil,
      status: 'pending_review',
      timestamp: new Date().toISOString()
    };
    db.exam_violation_events.unshift(violationEvent);

    // 5. Audit log
    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'PROCTOR_VIOLATION_TERMINATION',
      category: 'EXAM_SECURITY',
      user_email: cadetId || studentName,
      details: `Student terminated in quiz ${quizId}. Reason: ${violationType}. 24-Hour Lockout enforced until ${lockedUntil}.`,
      severity: 'CRITICAL',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'EXAM_VIOLATION',
      payload: violationEvent
    });

    return { success: true, lockedUntil, violationEvent };
  }

  isExamLocked(enrolmentId, quizId) {
    const db = this.getDb();
    const windowKey = `${enrolmentId}_${quizId}`;
    const windowData = db.quiz_retry_windows?.[windowKey];
    const enrolment = (db.enrolments || []).find((e) => e.id === enrolmentId);

    const lockoutTarget = windowData?.locked_until || enrolment?.exam_lockout_until;
    if (!lockoutTarget) return { isLocked: false, remainingHours: 0, remainingMinutes: 0, lockedUntil: null };

    const lockDate = new Date(lockoutTarget);
    const now = new Date();
    if (now >= lockDate) {
      return { isLocked: false, remainingHours: 0, remainingMinutes: 0, lockedUntil: null };
    }

    const diffMs = lockDate.getTime() - now.getTime();
    const remainingHours = Math.floor(diffMs / (1000 * 60 * 60));
    const remainingMinutes = Math.ceil((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      isLocked: true,
      lockedUntil: lockoutTarget,
      remainingHours,
      remainingMinutes,
      diffMs
    };
  }

  // ==========================================
  // MANDATORY PDF ASSIGNMENT SUBMISSION & ASSESSMENT
  // ==========================================
  submitAssignment({
    cadetId,
    userId,
    enrolmentId,
    courseId,
    moduleId,
    assignmentId,
    assignmentTitle,
    fileName,
    fileDataUrl
  }) {
    const db = this.getDb();
    if (!db.assignment_submissions) db.assignment_submissions = [];

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const submission = {
      id: submissionId,
      cadet_id: cadetId,
      user_id: userId,
      enrolment_id: enrolmentId,
      course_id: courseId,
      module_id: moduleId,
      assignment_id: assignmentId,
      assignment_title: assignmentTitle || 'Course Technical Assignment',
      file_name: fileName,
      file_url: fileDataUrl,
      status: 'under_assessment', // 'under_assessment' | 'passed' | 'rejected'
      grade: null,
      reviewer_notes: null,
      reviewed_at: null,
      submitted_at: new Date().toISOString()
    };

    db.assignment_submissions = db.assignment_submissions.filter(
      (s) => !(s.enrolment_id === enrolmentId && s.assignment_id === assignmentId && s.status === 'under_assessment')
    );
    db.assignment_submissions.unshift(submission);

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'ASSIGNMENT_SUBMISSION',
      category: 'ACADEMIC',
      user_email: cadetId || userId,
      details: `Cadet submitted PDF assignment "${assignmentTitle || assignmentId}" (${fileName}). Status: Under Assessment.`,
      severity: 'INFO',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'ASSIGNMENT_SUBMITTED',
      payload: submission
    });

    return submission;
  }

  getAssignmentSubmissions(filter = {}) {
    const db = this.getDb();
    let submissions = db.assignment_submissions || [];
    if (filter.status) submissions = submissions.filter((s) => s.status === filter.status);
    if (filter.enrolment_id) submissions = submissions.filter((s) => s.enrolment_id === filter.enrolment_id);
    if (filter.cadet_id) submissions = submissions.filter((s) => s.cadet_id === filter.cadet_id);
    return submissions;
  }

  gradeAssignment({ submissionId, status, grade, reviewerNotes, reviewerEmail = 'admin@redkross.org.in' }) {
    const db = this.getDb();
    const submission = (db.assignment_submissions || []).find((s) => s.id === submissionId);
    if (!submission) throw new Error('Submission not found');

    submission.status = status;
    submission.grade = grade;
    submission.reviewer_notes = reviewerNotes;
    submission.reviewer_email = reviewerEmail;
    submission.reviewed_at = new Date().toISOString();

    if (status === 'passed' && submission.enrolment_id) {
      const enrolment = (db.enrolments || []).find((e) => e.id === submission.enrolment_id);
      if (enrolment) {
        if (!Array.isArray(enrolment.passed_assignments)) enrolment.passed_assignments = [];
        if (!enrolment.passed_assignments.includes(submission.assignment_id)) {
          enrolment.passed_assignments.push(submission.assignment_id);
        }
      }
    }

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'ASSIGNMENT_EVALUATED',
      category: 'ACADEMIC_GRADING',
      user_email: reviewerEmail,
      details: `Graded assignment "${submission.assignment_title}" for cadet ${submission.cadet_id}: ${status.toUpperCase()} (${grade}%). Notes: ${reviewerNotes || 'Approved'}.`,
      severity: status === 'passed' ? 'INFO' : 'WARN',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'ASSIGNMENT_EVALUATED',
      payload: { submissionId, status, grade, cadetId: submission.cadet_id }
    });

    return submission;
  }

  // ==========================================
  // COMPLETE COURSE COMPLETION & CERTIFICATION LIFECYCLE
  // ==========================================
  checkCourseCompletion(enrolmentId) {
    const enrolment = this.getEnrolment(enrolmentId);
    if (!enrolment) return { isComplete: false, reason: 'Enrolment not found' };

    const course = this.getCourseById(enrolment.course_id);
    if (!course) return { isComplete: false, reason: 'Course not found' };

    let mandatoryLessons = [];
    (course.modules || []).forEach((mod) => {
      (mod.lessons || []).forEach((les) => {
        if (les.is_mandatory) mandatoryLessons.push(les.id);
      });
    });
    const completedLessons = enrolment.completed_mandatory_lessons || [];
    const lessonsComplete = mandatoryLessons.length === 0 || mandatoryLessons.every((id) => completedLessons.includes(id));

    const passedQuizzes = enrolment.passed_quizzes || [];
    const requiredQuizzes = [];
    (course.modules || []).forEach((mod) => {
      if (mod.quiz_id) requiredQuizzes.push(mod.quiz_id);
      else if (mod.quiz) requiredQuizzes.push(mod.quiz.id || `quiz_${mod.id}`);
    });
    const quizzesComplete = requiredQuizzes.length === 0 || requiredQuizzes.every((qId) => passedQuizzes.includes(qId));

    const requiredAssignments = [];
    (course.modules || []).forEach((mod) => {
      if (mod.assignment) requiredAssignments.push(mod.assignment.id || `asg_${mod.id}`);
      (mod.lessons || []).forEach((les) => {
        if (les.has_assignment) requiredAssignments.push(les.assignment_id || `asg_${les.id}`);
      });
    });
    const passedAssignments = enrolment.passed_assignments || [];
    const assignmentsComplete = requiredAssignments.length === 0 || requiredAssignments.every((aId) => passedAssignments.includes(aId));

    const isComplete = lessonsComplete && quizzesComplete && assignmentsComplete;

    return {
      isComplete,
      lessonsComplete,
      quizzesComplete,
      assignmentsComplete,
      mandatoryLessonsCount: mandatoryLessons.length,
      completedLessonsCount: completedLessons.length,
      requiredQuizzesCount: requiredQuizzes.length,
      passedQuizzesCount: passedQuizzes.length,
      requiredAssignmentsCount: requiredAssignments.length,
      passedAssignmentsCount: passedAssignments.length,
      courseTitle: course.title,
      enrolmentStatus: enrolment.status,
      certificateRequestStatus: enrolment.certificate_request_status || 'none',
      credentialId: enrolment.credential_id || null
    };
  }

  requestCertificate(enrolmentId, cadetNotes = '') {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    if (!enrolment) throw new Error('Enrolment not found');

    const completion = this.checkCourseCompletion(enrolmentId);
    if (!completion.isComplete) {
      throw new Error('PREREQUISITES_INCOMPLETE: All mandatory lessons, chapter evaluations, and PDF assignments must be passed before requesting certification.');
    }

    const cadet = db.users.find((u) => u.id === enrolment.user_id);
    const course = db.courses.find((c) => c.id === enrolment.course_id);

    enrolment.certificate_requested = true;
    enrolment.certificate_request_status = 'pending_review';
    enrolment.certificate_requested_at = new Date().toISOString();
    enrolment.cadet_request_notes = cadetNotes;

    if (!db.certificate_requests) db.certificate_requests = [];
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const certRequest = {
      id: requestId,
      enrolment_id: enrolmentId,
      cadet_id: cadet?.cadet_id || enrolment.cadet_id || 'RK-UNKNOWN',
      user_id: enrolment.user_id,
      student_name: cadet?.full_name || 'Cadet Operator',
      student_email: cadet?.email || 'student@redkross.org.in',
      course_id: enrolment.course_id,
      course_title: course?.title || 'Defensive Cyber Operations',
      cadet_notes: cadetNotes,
      status: 'pending_review',
      submitted_at: new Date().toISOString()
    };

    db.certificate_requests = db.certificate_requests.filter(
      (r) => !(r.enrolment_id === enrolmentId && r.status === 'pending_review')
    );
    db.certificate_requests.unshift(certRequest);

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'CERTIFICATE_REQUESTED',
      category: 'CERTIFICATION',
      user_email: cadet?.email || enrolment.user_id,
      details: `Cadet ${cadet?.full_name} (${cadet?.cadet_id}) requested official certification for "${course?.title}". Queue status: PENDING REVIEW.`,
      severity: 'INFO',
      timestamp: new Date().toISOString()
    });

    this.saveDb(db, {
      type: 'CERTIFICATE_REQUESTED',
      payload: certRequest
    });

    return certRequest;
  }

  getCertificateRequests() {
    const db = this.getDb();
    return db.certificate_requests || [];
  }

  dispatchCertificate({
    enrolmentId,
    studentName,
    studentEmail,
    courseId,
    cadetId,
    signatoryName = 'Dr. Robert H. Vance, CISSP',
    signatoryTitle = 'Director of Cyber Defense Academics',
    issuingOrg = 'RedKross Defensive Cyber Academy'
  }) {
    const db = this.getDb();
    const enrolment = db.enrolments.find((e) => e.id === enrolmentId);
    const course = db.courses.find((c) => c.id === (courseId || enrolment?.course_id));
    const user = db.users.find((u) => u.id === enrolment?.user_id || (u.cadet_id && u.cadet_id === cadetId));

    const finalCadetId = cadetId || user?.cadet_id || enrolment?.cadet_id || 'RK-89421';
    const finalStudentName = studentName || user?.full_name || 'Cadet Operator';
    const finalEmail = studentEmail || user?.email || 'student@redkross.org.in';
    const finalCourseTitle = course?.title || 'Certified Defensive Cyber Specialist';

    const randomSerial = Math.floor(10000 + Math.random() * 90000);
    const credentialId = `RK-CERT-${randomSerial}`;
    const issueDate = new Date().toISOString();

    const newCredential = {
      id: credentialId,
      cadet_id: finalCadetId,
      student_name: finalStudentName,
      student_email: finalEmail,
      course_id: course?.id || courseId,
      course_title: finalCourseTitle,
      issue_date: issueDate,
      issuing_institution: issuingOrg,
      signatory_name: signatoryName,
      signatory_title: signatoryTitle,
      revoked: false,
      revocation_reason: null,
      revoked_at: null,
      verification_url: `/verify/${credentialId}`,
      verification_hash: `sha256_${Math.random().toString(36).substring(2, 14)}`
    };

    if (!db.credentials) db.credentials = [];
    db.credentials.unshift(newCredential);

    if (enrolment) {
      enrolment.certificate_request_status = 'approved';
      enrolment.credential_id = credentialId;
      enrolment.status = 'completed';
    }

    if (db.certificate_requests) {
      const req = db.certificate_requests.find((r) => r.enrolment_id === enrolmentId && r.status === 'pending_review');
      if (req) {
        req.status = 'approved';
        req.credential_id = credentialId;
        req.dispatched_at = issueDate;
      }
    }

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'CERTIFICATE_DISPATCHED',
      category: 'CERTIFICATION',
      user_email: finalEmail,
      details: `Official Certificate ${credentialId} dispatched to ${finalStudentName} (${finalCadetId}) for "${finalCourseTitle}".`,
      severity: 'INFO',
      timestamp: issueDate
    });

    this.saveDb(db, {
      type: 'CERTIFICATE_DISPATCHED',
      payload: { credential: newCredential, enrolmentId, cadetId: finalCadetId }
    });

    return newCredential;
  }

  revokeCertificate(credentialId, reason = 'Academic Integrity Violation / Proctor Audit') {
    const db = this.getDb();
    const credential = (db.credentials || []).find((c) => c.id === credentialId);
    if (!credential) throw new Error('Credential not found');

    const revokedAt = new Date().toISOString();
    credential.revoked = true;
    credential.revocation_reason = reason;
    credential.revoked_at = revokedAt;

    if (!db.audit_logs) db.audit_logs = [];
    db.audit_logs.unshift({
      id: `aud_${Date.now()}`,
      action: 'CERTIFICATE_REVOKED',
      category: 'CERTIFICATION_SECURITY',
      user_email: credential.student_email || credential.cadet_id,
      details: `Official Certificate ${credentialId} has been revoked by Academy Admin. Reason: "${reason}". Public credential invalid.`,
      severity: 'CRITICAL',
      timestamp: revokedAt
    });

    this.saveDb(db, {
      type: 'CERTIFICATE_REVOKED',
      payload: { credentialId, revoked: true, reason, revokedAt }
    });

    return credential;
  }

  // ==========================================
  // REAL-TIME DATABASE TELEMETRY & STATS (NO FAKE DATA)
  // ==========================================
  getRealDatabaseStats() {
    const db = this.getDb();
    const users = db.users || [];
    const courses = db.courses || [];
    const enrolments = db.enrolments || [];
    const credentials = db.credentials || [];
    const submissions = db.assignment_submissions || [];
    const certRequests = db.certificate_requests || [];
    const violations = db.exam_violation_events || [];

    // Count only active, non-suspended students for real platform metrics
    const realActiveStudents = users.filter((u) => (u.role === 'student' || !u.role) && u.status !== 'SUSPENDED' && !u.is_suspended);
    const suspendedStudents = users.filter((u) => u.status === 'SUSPENDED' || u.is_suspended);
    const validCredentials = credentials.filter((c) => !c.revoked);
    const revokedCredentials = credentials.filter((c) => c.revoked);
    const pendingAssignments = submissions.filter((s) => s.status === 'under_assessment');
    const pendingCertificates = certRequests.filter((r) => r.status === 'pending_review');
    const activeLockouts = Object.values(db.quiz_retry_windows || {}).filter(
      (w) => w.locked_until && new Date(w.locked_until) > new Date()
    );

    return {
      totalStudents: realActiveStudents.length,
      totalSuspendedStudents: suspendedStudents.length,
      totalCourses: courses.length,
      totalEnrolments: enrolments.length,
      validCredentialsCount: validCredentials.length,
      revokedCredentialsCount: revokedCredentials.length,
      pendingAssignmentsCount: pendingAssignments.length,
      pendingCertificatesCount: pendingCertificates.length,
      activeLockoutsCount: activeLockouts.length,
      proctorViolationsCount: violations.length,
      lastAuditTimestamp: db.audit_logs?.[0]?.timestamp || new Date().toISOString()
    };
  }
}

export const mockEngine = new MockEngine();
