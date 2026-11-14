# RedKross Academy — Launch Readiness (audit of 2026-11-13)

Target: public launch by 30 November 2026. This file records what was wrong, what was
changed in this branch, and what still has to be done by the team (mostly secrets and
configuration that cannot be done in code).

## 1. Do these before launch (owner action required)

| # | Action | Why |
|---|--------|-----|
| 1 | **Rotate the Neon database password** | The full production connection string (`neondb_owner:npg_3Rw…`) was hard-coded in 5 scripts. Treat it as public. |
| 2 | **Revoke the Resend API key** `re_g3Ur…` | It was in `api/support-tickets.js` (base64 is not encryption). |
| 3 | **Revoke the E2B key** `e2b_5fc0…` | Hard-coded in `api/e2b.js`. |
| 4 | **Change the n8n webhook URL** and set `N8N_WEBHOOK_SECRET` | The URL was in client JavaScript, so anyone could post fake "enrolled"/"certificate" events that send emails. Verify `X-RedKross-Signature` in n8n. |
| 5 | **Purge secrets from git history** (`git filter-repo` or BFG) on the real GitHub repo, then force-push | Rotating is mandatory; purging stops casual discovery. |
| 6 | Set `CREDENTIAL_SIGNING_SECRET` (`openssl rand -hex 32`) | Certificates are signed with it. There is no default any more. Keep it stable: changing it invalidates every issued certificate. |
| 7 | Run `node scripts/runMigrations.js` against production | Adds the server-side learning-record tables and reconciles columns the code writes. Idempotent. |
| 8 | Make your admin account `role='super_admin'` in `users` (or set `ADMIN_EMAILS`) | The old hard-coded admin ids no longer work. |
| 9 | Choose ONE hosting model (see §5) and set the env vars in `.env.example` | |

## 2. Critical security flaws found and fixed

| Flaw | Impact | Fix |
|------|--------|-----|
| `Authorization: Bearer usr_super_admin_dev` (or `usr_admin_01`) granted admin on `/api/admin` and `/api/courses` | Anyone could list every student (names, emails), delete users, mint certificates, reset progress | Removed. All endpoints verify a **Firebase ID token** server-side (`api/_auth.js`); admin = DB role |
| `/api/auth`, `/api/enrol` trusted `uid`/`email` from the request body | Log in as any user by email | Identity comes only from the verified token; email-linking requires a provider-verified email |
| Fake "Google account chooser" + `localStorage` keys logged in as any email without Firebase | Same | Removed from `authContext.jsx` |
| `/api/quiz`, `/api/progress`, `/api/wallet`, `/api/violation`, `/api/support-tickets` had no auth | Read/alter anyone's data; all support tickets were public | Auth + ownership on all; `/api/quiz` retired (410) |
| `/api/send-email` let the caller choose the recipient | Open relay on your Resend account (spam/phishing under your brand) | Recipient fixed to `ADMIN_INBOX_EMAIL` |
| Certificates minted in the browser (`localStorage`) with `Math.random()` "signatures" | Any certificate could be forged; `/verify` could not find real ones | Issued only by the server after a server-graded final; HMAC-SHA256; CSPRNG ids like `RK-C05-7KQ2-M9XA`; revocation supported |
| All quiz answer keys (≈7,000 questions) shipped in the JS bundle | Every exam answer visible in DevTools | Banks are server-only; build strips answer fields; `npm run audit:bundle` fails CI if any return |
| `/verify` back-filled signatures on unsigned rows and checked the viewer's own `localStorage` first | Forged records showed as genuine | Server-only verification; unsigned/tampered → "could not be verified"; public fields only |
| Socket.io: any client could join `admin:*` rooms and broadcast `user:purged` (logs everyone out) | Data leak + DoS | Authenticated hub (`server/socketHub.js`), room and event authorisation |
| Raw HTML in lesson text was injected with `innerHTML` | Stored XSS via admin-edited lessons; also `/proc/<pid>/maps` rendered as `/proc//maps` | Parser escapes tags in prose |
| `X-Forwarded-For` trusted for rate limiting; raw DB errors returned to clients; wildcard CORS | Bypass limits; information leak | `trust proxy` setting, generic errors, origin allow-list |

## 3. Functional bugs fixed

- Passing the final exam ended in an error alert (`apiClient.requestCertificate` did not exist) — now the credential is issued and shown with a verify link.
- Progress, quiz passes and certificates lived only in one browser — now stored server-side per user and course (`lesson_completions`, `assessment_*` tables) and mirrored locally.
- Lockouts were disabled for Courses 02 and 03 ("inspection mode" left in), and a lockout on one quiz locked every quiz in the course.
- Tab-switch handling ran two conflicting policies (instant forfeit vs 3 strikes). Now one: 3 strikes → attempt void + 24-hour lock, enforced on the server.
- Quiz routing by substring (`quizId.includes('c2')`) would have served Course 02 questions to Courses 20–22.
- Exam counts were wrong on course pages (C01 advertised 60 MCQs, served 50; C03 advertised 50, served 60) — now data-driven and served exactly as published.
- Fabricated values removed: "92%" certificate score fallback, "95%"/"2026-10-15" on the verify page, a demo cadet (RK-89421) auto-shown at `/verify`, fake "ticket submitted" on API failure.
- `schema.sql` did not match the code (`transaction_type`, `actor_id`, `users.status`, `question_options`…): a fresh database would have failed. The migration reconciles it.

## 4. Courses

- Catalog: **22 courses** (01–04 existing + 05–22 imported) and 3 new phase learning paths.
- `npm run import:library` regenerates courses 05–22 from the library TXT files: 110 lessons per course
  (orientation, module overview, 6 lessons, deep dive, case studies, practicals, visual guide with SVG figures,
  scenario practice with model answers, revision & references, plus a completion module with revision guide,
  glossary, course tasks, capstone and checklist), lab-kit ZIPs, 10-question module quizzes and a
  40-question final (20 course-level + 20 sampled). Pass marks are 70% as published in each course.
- The instructor-only sections and all answer keys never reach `src/` or `public/` (`npm run check:library`).
- Lab kits exclude the 53 MB MITRE dataset (C14; download note included) and the inert `.exe/.elf`
  specimens (C10; rebuild with `make_specimen.py`) to avoid Safe Browsing flags on a new domain.

## 5. Decisions for the team

1. **Hosting**: the repo has Vercel, Firebase Hosting, PM2 and a Cloudflare guide. Recommended: Express server
   (`npm run start:prod`) on one VM behind Cloudflare/nginx with `TRUST_PROXY=1` — it serves the SPA, the API and
   Socket.io, and its rate limiter works. On Vercel the API works but there is no rate limiting or Socket.io.
2. **Psychology courses** are empty shells (0-length lessons, no quizzes). Hide them or mark "Coming soon" before launch.
3. **Ratings/enrolment counts** on Courses 01–04 are hard-coded (e.g. "1,420 enrolled") before any student exists.
   That is misleading advertising; show real numbers or nothing. New courses show none.
4. **Paid vs free**: library Part A marks some courses "PAID advanced labs; free foundations"; everything is imported as free.
5. **Existing testers** who passed quizzes before this change must re-take them (old passes were browser-only and unverifiable). Lesson progress is migrated automatically.
6. Course credential names for 05–22 are neutral ("Certificate of Completion: <course>"); add branded names if wanted.

## 6. Known remaining work (not launch-blocking)

- Course content for 01–04 still loads in the main bundle (~2.6 MB JS); lazy-load per course for faster first paint.
- Assignment PDF uploads are still stored only in the browser; there is no server endpoint.
- Admin console is disabled by design (`AdminRoute`); admin API is secured and ready if it is re-enabled.
- No Content-Security-Policy header yet (needs testing against Firebase sign-in popups).
- Pre-existing failing tests unrelated to this work: `challenger_m*` (hard-coded paths on another machine),
  `unit_test_cockpit_terminal_and_icons` (6), `unit_test_cyber_lab_v3` (1), `test_course04_no_references_policy` (missing lab file).

## 7. Admin console, batches, access codes and profiles (added 2026-11-14)

**Admin console** (`/admin`, server-backed through `/api/manage`; the old browser-storage admin pages were removed):
Overview (live counts) · Students (search, progress, unlock/revoke courses, reset assessment locks, suspend,
add to batch, correct name/college) · Batches · Codes & links · Courses (visibility + price) · Name requests ·
Certificates (search, revoke) · Support tickets · Audit log · Admins (super admin adds/removes admins).
Only users with `role` admin/super_admin (or in `ADMIN_EMAILS`) can open it; every write is audited.

**Batches (college cohorts)**: name + college, eligibility (verified email domains such as `srmist.edu.in`,
including sub-domains, and/or an uploaded email list; both empty = anyone with the link), a free **course bundle**
(courses added later unlock for existing members; hidden courses act as private college-only courses),
a **registration link** `/join/<token>` that signs the student in, checks eligibility, adds them to the batch and
enrols them in the whole bundle, batch-only codes, progress export (CSV), remove member (cannot re-join), archive.

**Access codes**: typed code (custom like `SRM-DEC26` or generated) or many single-use codes at once (with
prefix, CSV download); free (100%) or percentage discount; all courses / selected courses / batch bundle;
optional batch restriction; usage limit (enforced atomically), start/expiry dates; on/off switch at any time
(students who already used it keep access); what a used code grants cannot be changed; used codes cannot be
deleted. Wrong-code guessing is limited to 10 per hour per account plus the server rate limiter.
The old hard-coded `GRANT100` / `REDKROSS2026` browser codes are gone.

**Course access rule** (server-enforced on enrol and on starting assessments): admins always; Coming soon = no
one; unlocked by batch/code/admin = yes; otherwise only Published + free. Enrolled students keep access if a
course is later priced or hidden. Psychology courses are seeded as Coming soon.

**Payments are not live**: a priced course is locked until a free code, batch or admin unlocks it; percentage codes
are validated and show the discounted price but cannot be completed until a payment gateway (e.g. Razorpay) is added.
Note: lesson text for courses 05-22 is served as static files, so pricing gates enrolment, progress and
certificates, not raw lesson files. Serve content through an authenticated endpoint before charging money.

**Student profile** (`/student/profile`): photo (resized in the browser, type-checked on the server, served from
`/api/avatar`), name, headline, college, degree, graduation year, city, bio, LinkedIn/GitHub/website (validated).
The name is free to edit until the first certificate; after that a change is a request an admin approves, with
optional certificate reissue under the new name. Signing in no longer overwrites an edited name.
**LinkedIn**: every certificate has "Add to LinkedIn profile" (LinkedIn's official add-certification link, prefilled
with name, issuer, date, credential ID and verify URL) and "Share on LinkedIn". No LinkedIn developer app needed;
set `VITE_LINKEDIN_ORG_ID` to show the company logo.

Tests: `tests/api_admin_cohorts_codes.test.mjs` (72 checks, included in `npm run test:api`).

## 8. How to verify

```bash
npm ci
DATABASE_URL=... node scripts/runMigrations.js
npm test                                 # unit + library integrity
TEST_DATABASE_URL=... npm run test:api   # 41 auth/assessment/credential checks on real Postgres
npm run build && npm run audit:bundle    # no answer keys or secrets in the client
```
