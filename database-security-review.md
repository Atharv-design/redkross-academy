## Bug Report

**Symptom**: N/A - This is a database security review audit, not a runtime bug.

**Root Cause**: Multiple security findings across the codebase that need to be addressed per the PRD requirements.

### 1. Database Schema - src/services/db/schema.js

**Entity definitions (32 entities):**
- USERS, AUTH_IDENTITIES, ROLES, USER_ROLES, LEARNING_PATHS, COURSES, COURSE_VERSIONS, MODULES, LESSONS, ENROLMENTS, LESSON_PROGRESS, QUIZZES, QUESTIONS, OPTIONS, QUIZ_ATTEMPTS, QUIZ_RETRY_WINDOWS, QUESTION_TOPIC_MAPPINGS, EXAM_VIOLATION_EVENTS, REWARD_LEDGER, MILESTONE_RULES, CREDENTIALS, CREDENTIAL_EVENTS, PAYMENTS_ENTITLEMENTS, AUDIT_LOGS, SUPPORT_TICKETS

**Role definitions:**
- SUPER_ADMIN: 'super_admin'
- COURSE_MANAGER: 'course_manager'
- STUDENT_SUPPORT: 'student_support'
- ASSESSMENT_REVIEWER: 'assessment_reviewer'
- STUDENT: 'student'

**Enums:**
- DifficultyLevels: BEGINNER, INTERMEDIATE, ADVANCED
- QuizAttemptStates: IN_PROGRESS, SUBMITTED, TIMED_OUT, TERMINATED
- FocusViolationLevels: STRIKE_1, STRIKE_2, STRIKE_3
- CredentialStatus: ACTIVE, REVOKED, EXPIRED

**Evidence**: `src/services/db/schema.js:6-65`

### 2. Seed Data - src/services/db/seedData.js

**Initial users:**
- usr_student_01 (student@redkross.org.in, role: student)
- usr_admin_01 (admin@redkross.org.in, role: student - with comment "Strict Phase 4.2: NO initial Super Admin user created or seeded")
- usr_support_01 (support@redkross.org.in, role: student_support)

**Initial verified credentials (2):**
- cred_rk_soc_89421: RCSA certification for Atharv Sharma, course crs_cyber_intro_01, grade 92%, expires 2028-10-15
- cred_rk_sec_10482: Course completion for Vikramaditya Roy, course crs_cyber_fund, grade 88%, lifetime expiration

**Initial enrolments (4): usr_student_01 enrolled in 4 cyber courses**

**Initial reward ledger (3):**
- Welcome grant: 100 tokens
- Quiz pass reward: 100 tokens (Module 1)
- 7-day streak bonus: 50 tokens

**Evidence**: `src/services/db/seedData.js:9-179`

### 3. API Database Usage - api/courses.js

**Cascading deletes (lines 278-297): Manual, no FK constraints**
The course deletion manually cascades deletes in sequence:
- quiz_attempts → enrolments WHERE course_id
- quiz_retry_windows → enrolments WHERE course_id
- lesson_progress → enrolments WHERE course_id
- certificate_requests WHERE course_id
- credentials WHERE course_id
- enrolments WHERE course_id
- options → questions JOIN quizzes → module_id
- questions → quizzes WHERE course_id OR module_id
- quizzes WHERE course_id OR module_id
- course_video_assets WHERE course_id
- lessons WHERE module_id → course_id
- modules WHERE course_id
- finally courses WHERE id

**Evidence**: `api/courses.js:278-297`

### 4. Mock Engine Database Simulation - src/services/db/mockEngine.js

**Full relational simulation in localStorage:**
- Map-based in-memory store with localStorage persistence
- BroadcastChannel for cross-tab sync
- Serialized dynamic state: _initialized, _curriculum_version, users, learning_paths, courses, enrolments, credentials, reward_ledger, audit_logs, quiz_retry_windows, quiz_attempts, exam_violation_events, assignment_submissions, certificate_requests, banned_emails, admin_deleted_course_ids, public_catalog_enabled

**Cross-tab sync via BroadcastChannel:**
- BROADCAST_BUS_CHANNEL = 'redkross_academy_bus'
- Storage event listener for localStorage sync
- CustomEvent 'redkross:db_updated' dispatch

**Admin mutation methods exposed client-side:**
- issueCredential(enrolmentId, studentName, finalScore) - line 1853
- getCredentialByVerificationId(verificationId) - line 1904
- forceIssueCredential(userId, courseId) - line 1893 (via apiClient.js:706)
- createCourse, deleteCourse, addModuleAssignment, deleteModule, deleteLesson, saveQuizQuestions
- reorderModulesAndLessons, publishCourseVersion, resetStudentProgress, adjustStudentTokens
- setUserAccountStatus, permanentlyDeleteStudent, getAssignmentSubmissions, gradeAssignment

**Evidence**: `src/services/db/mockEngine.js:1853-1913`

### 5. Credential System

**api/_crypto.js:3 - Weak default secret:**
```
const SIGNING_SECRET = process.env.CREDENTIAL_SIGNING_SECRET || 'redkross_academy_tamperproof_signing_key_2026_default';
```

**api/_crypto.js:22-28 - HMAC-SHA256 signing:**
```js
export function signCredential(cred) {
  const payload = computeCredentialPayload(cred);
  return crypto
    .createHmac('sha256', SIGNING_SECRET)
    .update(payload)
    .digest('hex');
}
```

**api/verify.js:30-34 - Signature backfill for older records:**
```js
if (!cred.digital_signature) {
  cred.digital_signature = signCredential(cred);
  sql`UPDATE credentials SET digital_signature = ${cred.digital_signature} WHERE id = ${cred.id}`.catch(console.error);
}
```

**api/verify.js:37-48 - Signature verification:**
```js
const verificationProof = verifyCredentialSignature(cred);
```
Returns { verified, algorithm, signature, status: 'VERIFIED_AUTHENTIC' | 'SIGNATURE_INVALID' }

**src/services/db/mockEngine.js:1853-1913 - issueCredential & getCredentialByVerificationId:**
- issueCredential: Generates verification_id as `RK-SOC-{randomSerial}`, sets 2-year expiration
- getCredentialByVerificationId: Searches db.credentials by verification_id or id, case-insensitive

**apiClient.js:487-500 - verifyCredential fallback:**
```js
async verifyCredential(verificationId) {
  // ... tries API first, falls back to mockEngine.verifyCredential
  const cred = mockEngine.verifyCredential(verificationId);
  return cred ? { found: true, credential: cred } : { found: false };
}
```

**Evidence**: `api/_crypto.js:3`, `api/verify.js:30-34`, `src/services/db/mockEngine.js:1853-1913`

---
## Build Error Resolution

**Initial Errors:** N/A (database security review, not build errors)

**Errors Fixed:** N/A

**Build Status:** N/A