/**
 * RedKross Academy — Relational Database Schema Specification
 * Directly implementing PRD Section 13: Database Model and Integrity Constraints
 */

export const EntityNames = {
  USERS: 'users',
  AUTH_IDENTITIES: 'auth_identities',
  ROLES: 'roles',
  USER_ROLES: 'user_roles',
  LEARNING_PATHS: 'learning_paths',
  COURSES: 'courses',
  COURSE_VERSIONS: 'course_versions',
  MODULES: 'modules',
  LESSONS: 'lessons',
  ENROLMENTS: 'enrolments',
  LESSON_PROGRESS: 'lesson_progress',
  QUIZZES: 'quizzes',
  QUESTIONS: 'questions',
  OPTIONS: 'options',
  QUIZ_ATTEMPTS: 'quiz_attempts',
  QUIZ_RETRY_WINDOWS: 'quiz_retry_windows',
  QUESTION_TOPIC_MAPPINGS: 'question_topic_mappings',
  EXAM_VIOLATION_EVENTS: 'exam_violation_events',
  REWARD_LEDGER: 'reward_ledger',
  MILESTONE_RULES: 'milestone_rules',
  CREDENTIALS: 'credentials',
  CREDENTIAL_EVENTS: 'credential_events',
  PAYMENTS_ENTITLEMENTS: 'payments_entitlements',
  AUDIT_LOGS: 'audit_logs',
  SUPPORT_TICKETS: 'support_tickets',
};

export const Roles = {
  SUPER_ADMIN: 'super_admin',
  COURSE_MANAGER: 'course_manager',
  STUDENT_SUPPORT: 'student_support',
  ASSESSMENT_REVIEWER: 'assessment_reviewer',
  STUDENT: 'student',
};

export const DifficultyLevels = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export const QuizAttemptStates = {
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  TIMED_OUT: 'timed_out',
  TERMINATED: 'terminated', // e.g. Strike 3 violation
};

export const FocusViolationLevels = {
  STRIKE_1: 'strike_1', // Warning only
  STRIKE_2: 'strike_2', // Warning + -50 Token penalty
  STRIKE_3: 'strike_3', // Immediate termination, failed attempt, 24h lockout
};

export const CredentialStatus = {
  ACTIVE: 'Active',
  REVOKED: 'Revoked',
  EXPIRED: 'Expired',
};
