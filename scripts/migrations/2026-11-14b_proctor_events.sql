-- Exam proctoring evidence: on-device detections (phone, extra faces, head turned
-- away, face absent), focus/fullscreen strikes and periodic identity snapshots.
-- Snapshots are small JPEG data URLs, cleared after the retention period
-- (PROCTOR_SNAPSHOT_RETENTION_DAYS, default 90) by the API server.
CREATE TABLE IF NOT EXISTS proctor_events (
    id          VARCHAR(64)  PRIMARY KEY,
    session_id  VARCHAR(64)  NOT NULL,
    user_id     VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   VARCHAR(100) NOT NULL,
    quiz_id     VARCHAR(150) NOT NULL,
    kind        VARCHAR(30)  NOT NULL, -- phone | multiple_faces | looking_away | face_absent | focus | periodic
    severity    VARCHAR(10)  NOT NULL, -- high | medium | info
    detail      VARCHAR(300),
    snapshot    TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_proctor_events_session ON proctor_events(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_proctor_events_created ON proctor_events(created_at DESC);

-- Admin review outcome for a session
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS review_status VARCHAR(20); -- NULL | CLEARED | VOIDED
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS reviewed_by   VARCHAR(100);
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS reviewed_at   TIMESTAMPTZ;
ALTER TABLE assessment_sessions ADD COLUMN IF NOT EXISTS review_note   TEXT;
