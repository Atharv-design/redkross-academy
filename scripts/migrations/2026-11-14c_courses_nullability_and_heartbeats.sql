-- ==========================================================================
-- RedKross Academy - Course schema nullability & Assessment heartbeats
-- ==========================================================================

-- 1. courses: ensure estimated_duration and lead_author have defaults and are nullable
ALTER TABLE courses ADD COLUMN IF NOT EXISTS estimated_duration VARCHAR(50) DEFAULT '40 Hours';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lead_author JSONB DEFAULT '{}'::jsonb;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'courses' AND column_name = 'estimated_duration' AND is_nullable = 'NO') THEN
    ALTER TABLE courses ALTER COLUMN estimated_duration SET DEFAULT '40 Hours';
    ALTER TABLE courses ALTER COLUMN estimated_duration DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'courses' AND column_name = 'lead_author' AND is_nullable = 'NO') THEN
    ALTER TABLE courses ALTER COLUMN lead_author SET DEFAULT '{}'::jsonb;
    ALTER TABLE courses ALTER COLUMN lead_author DROP NOT NULL;
  END IF;
END $$;

-- 2. enrolments: ensure course_version is nullable with default
ALTER TABLE enrolments ADD COLUMN IF NOT EXISTS course_version VARCHAR(20) DEFAULT '1.0';
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'enrolments' AND column_name = 'course_version' AND is_nullable = 'NO') THEN
    ALTER TABLE enrolments ALTER COLUMN course_version SET DEFAULT '1.0';
    ALTER TABLE enrolments ALTER COLUMN course_version DROP NOT NULL;
  END IF;
END $$;

-- 3. credentials: ensure type column exists, course_title and expiration_date are nullable, and issue_date is TIMESTAMPTZ with DEFAULT NOW()
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS type VARCHAR(100) DEFAULT 'Course Certificate';
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS credential_type VARCHAR(100) DEFAULT 'Course Certificate';
ALTER TABLE credentials ALTER COLUMN issue_date TYPE TIMESTAMPTZ USING issue_date::TIMESTAMPTZ;
ALTER TABLE credentials ALTER COLUMN issue_date SET DEFAULT NOW();
ALTER TABLE credentials ALTER COLUMN issue_date DROP NOT NULL;
ALTER TABLE credentials ALTER COLUMN grade_percentage SET DEFAULT 100;
ALTER TABLE credentials ALTER COLUMN grade_percentage DROP NOT NULL;
ALTER TABLE credentials ALTER COLUMN digital_signature DROP NOT NULL;
ALTER TABLE credentials ALTER COLUMN verification_url DROP NOT NULL;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'credentials' AND column_name = 'expiration_date' AND is_nullable = 'NO') THEN
    ALTER TABLE credentials ALTER COLUMN expiration_date DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'credentials' AND column_name = 'course_title' AND is_nullable = 'NO') THEN
    ALTER TABLE credentials ALTER COLUMN course_title DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'credentials' AND column_name = 'credential_type' AND is_nullable = 'NO') THEN
    ALTER TABLE credentials ALTER COLUMN credential_type SET DEFAULT 'Course Certificate';
    ALTER TABLE credentials ALTER COLUMN credential_type DROP NOT NULL;
  END IF;
END $$;

-- 4. exam_violation_events: remove legacy foreign keys referencing obsolete tables/columns
ALTER TABLE exam_violation_events DROP CONSTRAINT IF EXISTS exam_violation_events_attempt_id_fkey;
ALTER TABLE exam_violation_events DROP CONSTRAINT IF EXISTS exam_violation_events_enrolment_id_fkey;
ALTER TABLE exam_violation_events DROP CONSTRAINT IF EXISTS exam_violation_events_quiz_id_fkey;

-- 5. assessment_sessions: heartbeat timestamp and server-side strike accumulation
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS last_heartbeat_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS strike_count INTEGER DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_heartbeat ON assessment_sessions(id, last_heartbeat_at);
