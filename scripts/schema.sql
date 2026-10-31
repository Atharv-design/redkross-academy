-- ========================================================================
-- REDKROSS ACADEMY — PRODUCTION POSTGRESQL DATABASE SCHEMA (DDL)
-- Compatible with PostgreSQL 14, 15, 16+
-- ========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & IDENTITY
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar TEXT,
    headline TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'student', -- 'student', 'instructor', 'admin', 'super_admin'
    cadet_id VARCHAR(50) UNIQUE,
    token_balance INTEGER NOT NULL DEFAULT 100,
    streak_days INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure columns exist if table was created in an older migration
ALTER TABLE users ADD COLUMN IF NOT EXISTS cadet_id VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_balance INTEGER NOT NULL DEFAULT 100;
ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_days INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN IF NOT EXISTS headline TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_cadet_id ON users(cadet_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. LEARNING PATHS (TRACKS)
CREATE TABLE IF NOT EXISTS learning_paths (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_desc TEXT,
    difficulty VARCHAR(50) DEFAULT 'Beginner',
    estimated_weeks INTEGER DEFAULT 8,
    total_hours INTEGER DEFAULT 40,
    courses_count INTEGER DEFAULT 3,
    milestone_cert VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    skills JSONB DEFAULT '[]'::jsonb,
    course_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. COURSES
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    version VARCHAR(50) DEFAULT '1.0',
    category VARCHAR(100) DEFAULT 'Defensive Cyber Operations',
    difficulty VARCHAR(50) DEFAULT 'Beginner',
    price NUMERIC DEFAULT 0,
    cert_price NUMERIC DEFAULT 0,
    estimated_duration VARCHAR(50) DEFAULT '40 Hours',
    rating NUMERIC DEFAULT 4.8,
    enrolled_count INTEGER DEFAULT 0,
    overview TEXT,
    learning_objectives JSONB DEFAULT '[]'::jsonb,
    what_you_will_learn JSONB DEFAULT '[]'::jsonb,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    lead_author JSONB DEFAULT '{}'::jsonb,
    total_tokens_reward INTEGER DEFAULT 300,
    card_variant VARCHAR(50) DEFAULT 'variant-01',
    final_assessment JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure course columns exist if updated
ALTER TABLE courses ADD COLUMN IF NOT EXISTS card_variant VARCHAR(50) DEFAULT 'variant-01';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS final_assessment JSONB DEFAULT NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS what_you_will_learn JSONB DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS learning_objectives JSONB DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS prerequisites JSONB DEFAULT '[]'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);

-- 4. MODULES
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(100) PRIMARY KEY,
    course_id VARCHAR(100) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);

-- 5. LESSONS
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(100) PRIMARY KEY,
    module_id VARCHAR(100) NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50) DEFAULT '15 mins',
    type VARCHAR(50) DEFAULT 'lecture', -- 'lecture', 'assignment', 'lab'
    video_url TEXT,
    videos JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    content_markdown TEXT,
    pdf_attachment_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure lesson columns exist
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS videos JSONB DEFAULT '[]'::jsonb;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS pdf_attachment_url TEXT;

CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);

-- 6. QUIZZES & ASSESSMENTS
CREATE TABLE IF NOT EXISTS quizzes (
    id VARCHAR(100) PRIMARY KEY,
    module_id VARCHAR(100) REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    passing_score INTEGER DEFAULT 80,
    token_bounty INTEGER DEFAULT 100,
    time_limit_minutes INTEGER DEFAULT 20,
    is_final_exam BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_module_id ON quizzes(module_id);

-- 7. QUESTIONS
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(100) PRIMARY KEY,
    quiz_id VARCHAR(100) NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    explanation TEXT,
    points NUMERIC DEFAULT 1.0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);

-- 8. OPTIONS
CREATE TABLE IF NOT EXISTS options (
    id VARCHAR(100) PRIMARY KEY,
    question_id VARCHAR(100) NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);

-- 9. STUDENT ENROLMENTS
CREATE TABLE IF NOT EXISTS enrolments (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(100) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    completed_mandatory_lessons JSONB DEFAULT '[]'::jsonb,
    passed_quizzes JSONB DEFAULT '[]'::jsonb,
    passed_assignments JSONB DEFAULT '[]'::jsonb,
    quiz_scores JSONB DEFAULT '{}'::jsonb,
    final_assessment_score INTEGER DEFAULT NULL,
    final_assessment_passed BOOLEAN DEFAULT false,
    exam_lockout_until TIMESTAMPTZ DEFAULT NULL,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enrolments_user_id ON enrolments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrolments_course_id ON enrolments(course_id);

-- 10. ASSESSMENT RETRY WINDOWS (3 Attempts per 24-Hour Cooldown)
CREATE TABLE IF NOT EXISTS quiz_retry_windows (
    id SERIAL PRIMARY KEY,
    enrolment_id VARCHAR(100) NOT NULL,
    quiz_id VARCHAR(100) NOT NULL,
    window_number INTEGER NOT NULL DEFAULT 1,
    attempts_used INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ DEFAULT NULL,
    reason TEXT DEFAULT NULL,
    last_violation_at TIMESTAMPTZ DEFAULT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_enrolment_quiz UNIQUE(enrolment_id, quiz_id)
);

CREATE INDEX IF NOT EXISTS idx_retry_windows_enrolment ON quiz_retry_windows(enrolment_id);

-- 11. QUIZ ATTEMPTS HISTORY
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id VARCHAR(100) PRIMARY KEY,
    enrolment_id VARCHAR(100) NOT NULL,
    quiz_id VARCHAR(100) NOT NULL,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    score_percentage INTEGER NOT NULL DEFAULT 0,
    is_passed BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(50) NOT NULL DEFAULT 'submitted', -- 'in_progress', 'submitted', 'terminated'
    focus_strikes INTEGER NOT NULL DEFAULT 0,
    user_answers JSONB DEFAULT '{}'::jsonb,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ DEFAULT NULL
);

-- 12. EXAM PROCTORING VIOLATION INCIDENTS
CREATE TABLE IF NOT EXISTS exam_violation_events (
    id VARCHAR(100) PRIMARY KEY,
    enrolment_id VARCHAR(100) NOT NULL,
    quiz_id VARCHAR(100) NOT NULL,
    cadet_id VARCHAR(50),
    student_name VARCHAR(255),
    violation_type VARCHAR(100) NOT NULL,
    details TEXT,
    locked_until TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'pending_review',
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_violation_enrolment ON exam_violation_events(enrolment_id);

-- 13. TOKEN REWARD LEDGER (AUDITABLE WALLET BALANCES)
CREATE TABLE IF NOT EXISTS reward_ledger (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    idempotency_key VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reward_user_id ON reward_ledger(user_id);

-- 14. INSTITUTIONAL AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    user_email VARCHAR(255),
    details TEXT,
    severity VARCHAR(50) DEFAULT 'INFO',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- 15. PDF ASSIGNMENT SUBMISSIONS
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id VARCHAR(100) PRIMARY KEY,
    cadet_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    enrolment_id VARCHAR(100) NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    course_title VARCHAR(255),
    lesson_id VARCHAR(100) NOT NULL,
    assignment_title VARCHAR(255),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending_review', -- 'pending_review', 'graded', 'rejected'
    score NUMERIC DEFAULT NULL,
    feedback TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assignment_enrolment ON assignment_submissions(enrolment_id);

-- 16. CERTIFICATE DISPATCH REQUESTS
CREATE TABLE IF NOT EXISTS certificate_requests (
    id VARCHAR(100) PRIMARY KEY,
    enrolment_id VARCHAR(100) NOT NULL,
    cadet_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending_dispatch', -- 'pending_dispatch', 'dispatched', 'revoked'
    cadet_notes TEXT,
    cert_hash VARCHAR(255),
    dispatched_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cert_requests_enrolment ON certificate_requests(enrolment_id);

-- 17. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS system_settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default catalog visibility (Phase 3.3)
INSERT INTO system_settings (key, value, updated_at)
VALUES ('public_catalog_enabled', 'false'::jsonb, NOW())
ON CONFLICT (key) DO NOTHING;

-- 18. CREDENTIALS & CERTIFICATES ISSUED
CREATE TABLE IF NOT EXISTS credentials (
    id VARCHAR(100) PRIMARY KEY,
    verification_id VARCHAR(100) UNIQUE NOT NULL,
    student_name VARCHAR(255),
    user_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(100) REFERENCES courses(id) ON DELETE CASCADE,
    course_title VARCHAR(255),
    credential_title VARCHAR(255) NOT NULL DEFAULT 'Certified Cybersecurity Specialist',
    credential_type VARCHAR(100) DEFAULT 'Executive Certification',
    type VARCHAR(100) DEFAULT 'Executive Certification',
    issue_date TIMESTAMPTZ DEFAULT NOW(),
    expiration_date TIMESTAMPTZ,
    grade_percentage NUMERIC DEFAULT 100,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Revoked'
    digital_signature TEXT,
    verification_url TEXT,
    skills_validated JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credentials_verification ON credentials(verification_id);
CREATE INDEX IF NOT EXISTS idx_credentials_user ON credentials(user_id);
CREATE INDEX IF NOT EXISTS idx_credentials_course ON credentials(course_id);

-- 19. COURSE VIDEO & MEDIA ASSETS
CREATE TABLE IF NOT EXISTS course_video_assets (
    id VARCHAR(100) PRIMARY KEY,
    course_id VARCHAR(100) REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    file_name VARCHAR(255),
    file_size BIGINT,
    lesson_id VARCHAR(100),
    visibility VARCHAR(50) DEFAULT 'public',
    url TEXT NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_video_assets_course ON course_video_assets(course_id);
CREATE INDEX IF NOT EXISTS idx_video_assets_lesson ON course_video_assets(lesson_id);

-- 20. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS lesson_progress (
    id VARCHAR(150) PRIMARY KEY, -- lp_{enrolment_id}_{lesson_id}
    enrolment_id VARCHAR(100) REFERENCES enrolments(id) ON DELETE CASCADE,
    lesson_id VARCHAR(100) REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrolment ON lesson_progress(enrolment_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON lesson_progress(lesson_id);

-- 21. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Open', -- 'Open', 'In Progress', 'Resolved', 'Closed'
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Urgent'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON support_tickets(created_at DESC);
