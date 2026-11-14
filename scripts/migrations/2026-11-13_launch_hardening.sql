-- ==========================================================================
-- RedKross Academy - launch hardening migration (idempotent; safe to re-run)
--
-- 1. Server-authoritative learning records: assessment sessions, attempt
--    windows, passes and lesson completions, keyed by (user, course) so they do
--    not depend on browser-generated enrolment ids.
-- 2. Reconciles columns the API code writes with what schema.sql created, so a
--    fresh database and the existing production database behave the same.
-- ==========================================================================

CREATE TABLE IF NOT EXISTS assessment_sessions (
    id               VARCHAR(64) PRIMARY KEY,
    user_id          VARCHAR(100) NOT NULL,
    course_id        VARCHAR(100) NOT NULL,
    quiz_id          VARCHAR(150) NOT NULL,
    kind             VARCHAR(20)  NOT NULL,              -- 'module' | 'final'
    questions        JSONB        NOT NULL,              -- includes correct option ids: never sent to clients
    status           VARCHAR(20)  NOT NULL DEFAULT 'in_progress', -- in_progress|submitted|forfeited|expired
    answers          JSONB,
    score_percentage INTEGER,
    is_passed        BOOLEAN,
    started_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    expires_at       TIMESTAMPTZ  NOT NULL,
    submitted_at     TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_assess_sessions_user ON assessment_sessions(user_id, course_id, quiz_id);

CREATE TABLE IF NOT EXISTS assessment_windows (
    user_id        VARCHAR(100) NOT NULL,
    course_id      VARCHAR(100) NOT NULL,
    quiz_id        VARCHAR(150) NOT NULL,
    attempts_used  INTEGER      NOT NULL DEFAULT 0,
    locked_until   TIMESTAMPTZ,
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, course_id, quiz_id)
);

CREATE TABLE IF NOT EXISTS assessment_passes (
    user_id          VARCHAR(100) NOT NULL,
    course_id        VARCHAR(100) NOT NULL,
    quiz_id          VARCHAR(150) NOT NULL,
    score_percentage INTEGER      NOT NULL,
    session_id       VARCHAR(64),
    passed_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, course_id, quiz_id)
);

CREATE TABLE IF NOT EXISTS lesson_completions (
    user_id      VARCHAR(100) NOT NULL,
    course_id    VARCHAR(100) NOT NULL,
    lesson_id    VARCHAR(150) NOT NULL,
    completed_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, course_id, lesson_id)
);

-- users.status is read and written by the API but missing from schema.sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE';

-- reward_ledger: code writes transaction_type; schema.sql named it "type" (NOT NULL)
ALTER TABLE reward_ledger ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(50);
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'reward_ledger' AND column_name = 'type' AND is_nullable = 'NO') THEN
    ALTER TABLE reward_ledger ALTER COLUMN type DROP NOT NULL;
  END IF;
END $$;

-- audit_logs: code writes actor_id/entity_type/entity_id; schema.sql required category
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS actor_id VARCHAR(150);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS entity_type VARCHAR(100);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS entity_id VARCHAR(150);
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'audit_logs' AND column_name = 'category' AND is_nullable = 'NO') THEN
    ALTER TABLE audit_logs ALTER COLUMN category DROP NOT NULL;
  END IF;
END $$;

-- exam_violation_events: align with the columns the API writes
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS attempt_id VARCHAR(100);
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS strike_count INTEGER;
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS user_id VARCHAR(100);
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS course_id VARCHAR(100);
ALTER TABLE exam_violation_events ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'exam_violation_events' AND column_name = 'violation_type' AND is_nullable = 'NO') THEN
    ALTER TABLE exam_violation_events ALTER COLUMN violation_type DROP NOT NULL;
  END IF;
END $$;

ALTER TABLE credentials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS uq_credentials_verification_upper ON credentials (UPPER(verification_id));
EXCEPTION WHEN unique_violation THEN
  RAISE WARNING 'duplicates exist; index uq_credentials_verification_upper not created - clean up and re-run';
END $$;

ALTER TABLE enrolments ADD COLUMN IF NOT EXISTS course_version VARCHAR(20);
DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS uq_enrolments_user_course ON enrolments(user_id, course_id);
EXCEPTION WHEN unique_violation THEN
  RAISE WARNING 'duplicates exist; index uq_enrolments_user_course not created - clean up and re-run';
END $$;

ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS source_ip VARCHAR(64);
