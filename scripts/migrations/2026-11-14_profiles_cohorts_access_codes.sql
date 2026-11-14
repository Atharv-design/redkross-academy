-- RedKross Academy - student profiles, cohorts (college batches), access codes and
-- course access control. Idempotent: safe to run more than once.

-- ---------------------------------------------------------------- student profile
ALTER TABLE users ADD COLUMN IF NOT EXISTS college         VARCHAR(160);
ALTER TABLE users ADD COLUMN IF NOT EXISTS degree          VARCHAR(120);
ALTER TABLE users ADD COLUMN IF NOT EXISTS graduation_year INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city            VARCHAR(80);
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio             TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin_url    VARCHAR(300);
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_url      VARCHAR(300);
ALTER TABLE users ADD COLUMN IF NOT EXISTS portfolio_url   VARCHAR(300);
-- Uploaded photo (small JPEG/PNG/WebP data URL, resized in the browser). users.avatar
-- then points at /api/avatar?u=<id> so lists never carry image bytes.
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_data     TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen_at    TIMESTAMPTZ;

-- Name changes after a certificate has been issued go through an admin.
CREATE TABLE IF NOT EXISTS name_change_requests (
    id              VARCHAR(64)  PRIMARY KEY,
    user_id         VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_name    VARCHAR(255),
    requested_name  VARCHAR(120) NOT NULL,
    reason          TEXT,
    status          VARCHAR(20)  NOT NULL DEFAULT 'PENDING', -- PENDING | APPROVED | REJECTED
    reviewed_by     VARCHAR(100),
    review_note     TEXT,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    reviewed_at     TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_name_change_pending ON name_change_requests(user_id) WHERE status = 'PENDING';

-- ---------------------------------------------------------------- course settings
-- Server-side authority for catalog visibility and price (the course content itself
-- ships with the app). Missing row = PUBLISHED and free.
CREATE TABLE IF NOT EXISTS course_settings (
    course_id   VARCHAR(100) PRIMARY KEY,
    visibility  VARCHAR(20)  NOT NULL DEFAULT 'PUBLISHED', -- PUBLISHED | HIDDEN | COMING_SOON
    price_inr   INTEGER      NOT NULL DEFAULT 0 CHECK (price_inr >= 0),
    updated_by  VARCHAR(100),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- cohorts (batches)
CREATE TABLE IF NOT EXISTS cohorts (
    id               VARCHAR(64)  PRIMARY KEY,
    name             VARCHAR(160) NOT NULL,
    organisation     VARCHAR(160),
    description      TEXT,
    -- Eligibility: comma-separated email domains and/or the allow-list below.
    -- Both empty = anyone holding a code/link for this cohort may join.
    allowed_domains  TEXT         NOT NULL DEFAULT '',
    status           VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE', -- ACTIVE | ARCHIVED
    created_by       VARCHAR(100),
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cohort_allowed_emails (
    cohort_id  VARCHAR(64)  NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    email      VARCHAR(255) NOT NULL,
    PRIMARY KEY (cohort_id, email)
);

-- The course bundle a cohort unlocks.
CREATE TABLE IF NOT EXISTS cohort_courses (
    cohort_id  VARCHAR(64)  NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    course_id  VARCHAR(100) NOT NULL,
    PRIMARY KEY (cohort_id, course_id)
);

CREATE TABLE IF NOT EXISTS cohort_members (
    cohort_id  VARCHAR(64)  NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    user_id    VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_via VARCHAR(30)  NOT NULL DEFAULT 'ADMIN', -- ADMIN | CODE | LINK
    code_id    VARCHAR(64),
    added_by   VARCHAR(100),
    joined_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    removed_at TIMESTAMPTZ,              -- set when an admin removes the student (re-joining is blocked)
    PRIMARY KEY (cohort_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_cohort_members_user ON cohort_members(user_id);

-- ---------------------------------------------------------------- access codes
-- One table for typed coupon codes and registration-link tokens (kind = LINK).
CREATE TABLE IF NOT EXISTS access_codes (
    id                VARCHAR(64)  PRIMARY KEY,
    code              VARCHAR(64)  NOT NULL UNIQUE,       -- stored upper-case
    kind              VARCHAR(20)  NOT NULL DEFAULT 'CODE', -- CODE | LINK
    label             VARCHAR(160),
    discount_percent  INTEGER      NOT NULL CHECK (discount_percent BETWEEN 1 AND 100),
    course_scope      VARCHAR(20)  NOT NULL DEFAULT 'SELECTED', -- ALL | SELECTED | COHORT
    cohort_id         VARCHAR(64)  REFERENCES cohorts(id) ON DELETE SET NULL,
    max_redemptions   INTEGER      CHECK (max_redemptions IS NULL OR max_redemptions > 0),
    redemption_count  INTEGER      NOT NULL DEFAULT 0,
    starts_at         TIMESTAMPTZ,
    expires_at        TIMESTAMPTZ,
    is_active         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_by        VARCHAR(100),
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_access_codes_cohort ON access_codes(cohort_id);

CREATE TABLE IF NOT EXISTS access_code_courses (
    code_id    VARCHAR(64)  NOT NULL REFERENCES access_codes(id) ON DELETE CASCADE,
    course_id  VARCHAR(100) NOT NULL,
    PRIMARY KEY (code_id, course_id)
);

CREATE TABLE IF NOT EXISTS access_code_redemptions (
    id               VARCHAR(64)  PRIMARY KEY,
    code_id          VARCHAR(64)  NOT NULL REFERENCES access_codes(id) ON DELETE CASCADE,
    user_id          VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    discount_percent INTEGER      NOT NULL,
    course_ids       JSONB        NOT NULL DEFAULT '[]'::jsonb,
    redeemed_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE (code_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_code_redemptions_user ON access_code_redemptions(user_id);

-- ---------------------------------------------------------------- course access
-- Individual entitlements (from a code or granted by an admin). Cohort bundles are
-- resolved live from cohort_members + cohort_courses, so adding a course to a
-- bundle unlocks it for every member.
CREATE TABLE IF NOT EXISTS course_access (
    user_id          VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id        VARCHAR(100) NOT NULL,
    source           VARCHAR(20)  NOT NULL, -- CODE | ADMIN | PURCHASE
    source_ref       VARCHAR(100),
    discount_percent INTEGER,
    granted_by       VARCHAR(100),
    granted_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    revoked_at       TIMESTAMPTZ,
    PRIMARY KEY (user_id, course_id)
);

-- Psychology courses have no content yet: launch them as "Coming soon".
INSERT INTO course_settings (course_id, visibility, price_inr, updated_by)
SELECT c, 'COMING_SOON', 0, 'migration'
FROM unnest(ARRAY['crs_psych_cbt','crs_psych_crisis','crs_psych_neuro','crs_psych_forensic','crs_psych_adolescent','crs_psych_mindfulness']) AS c
ON CONFLICT (course_id) DO NOTHING;

-- Brute-force counter for /api/redeem reads recent CODE_REJECTED rows per user.
CREATE INDEX IF NOT EXISTS idx_audit_actor_action_time ON audit_logs(actor_id, action, created_at);
