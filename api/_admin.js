import { sql, json, cors, serverError } from './_db.js';
import { dispatchWebhook } from './_webhooks.js';
import { requireAdmin, audit } from './_auth.js';
import { getCourseSpec } from './_lib/courseRegistry.js';
import { issueCredential } from './_lib/learning.js';

/**
 * Super Admin Management & Operations Endpoint (Phase 4 & Phase 5)
 * Server-side RBAC validation: strictly requires authenticated super_admin identity.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    // RBAC: verified Firebase ID token + admin role in the database (or ADMIN_EMAILS bootstrap)
    const adminCtx = await requireAdmin(req, res);
    if (!adminCtx) return;
    const adminUserId = adminCtx.user.id;

    // Handle administrative mutation actions
    if (req.method === 'POST') {
      const body = req.body || {};
      const { action } = body;

      if (action === 'TOGGLE_CATALOG_VISIBILITY') {
        const newValue = Boolean(body.public_catalog_enabled);
        await sql`
          INSERT INTO system_settings (key, value, updated_at)
          VALUES ('public_catalog_enabled', ${JSON.stringify(newValue)}::jsonb, NOW())
          ON CONFLICT (key) DO UPDATE 
          SET value = ${JSON.stringify(newValue)}::jsonb, updated_at = NOW()
        `;
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'CATALOG_TOGGLE', 'settings', 'public_catalog_enabled', ${`Catalog set to ${newValue ? 'RELEASED' : 'EMBARGOED'}`}, NOW())
        `;
        return json(res, { success: true, public_catalog_enabled: newValue });
      }

      if (action === 'ADJUST_TOKENS') {
        const { user_id, amount, reason } = body;
        const numAmount = parseInt(amount, 10);
        const txId = `tx_${Date.now()}`;
        await sql`
          INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
          VALUES (${txId}, ${user_id}, ${numAmount}, ${numAmount >= 0 ? 'admin_credit' : 'admin_debit'}, ${`Manual adjustment by Super Admin: ${reason}`}, ${txId}, NOW())
        `;
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'TOKEN_ADJUSTMENT', 'reward_ledger', ${txId}, ${`${numAmount >= 0 ? 'Credited' : 'Debited'} ${Math.abs(numAmount)} tokens. Reason: ${reason}`}, NOW())
        `;
        return json(res, { success: true, transaction_id: txId });
      }

      if (action === 'SET_USER_STATUS') {
        const { user_id, status, reason } = body;
        await sql`
          UPDATE users 
          SET status = ${status}, updated_at = NOW()
          WHERE id = ${user_id}
        `;
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'USER_STATUS_MUTATED', 'users', ${user_id}, ${`Set user status to ${status}. Reason: ${reason || 'Admin action'}`}, NOW())
        `;
        return json(res, { success: true, status });
      }

      if (action === 'PERMANENT_DELETE_USER') {
        const { user_id, email } = body;
        await sql`DELETE FROM quiz_attempts WHERE enrolment_id IN (SELECT id FROM enrolments WHERE user_id = ${user_id})`;
        await sql`DELETE FROM quiz_retry_windows WHERE enrolment_id IN (SELECT id FROM enrolments WHERE user_id = ${user_id})`;
        await sql`DELETE FROM lesson_progress WHERE enrolment_id IN (SELECT id FROM enrolments WHERE user_id = ${user_id})`;
        await sql`DELETE FROM assessment_sessions WHERE user_id = ${user_id}`;
        await sql`DELETE FROM assessment_windows WHERE user_id = ${user_id}`;
        await sql`DELETE FROM assessment_passes WHERE user_id = ${user_id}`;
        await sql`DELETE FROM lesson_completions WHERE user_id = ${user_id}`;
        await sql`DELETE FROM credentials WHERE user_id = ${user_id}`;
        await sql`DELETE FROM enrolments WHERE user_id = ${user_id}`;
        await sql`DELETE FROM reward_ledger WHERE user_id = ${user_id}`;
        await sql`DELETE FROM users WHERE id = ${user_id}`;
        if (email) {
          await sql`
            INSERT INTO system_settings (key, value, updated_at)
            VALUES (${`banned_email_${email.toLowerCase()}`}, 'true'::jsonb, NOW())
            ON CONFLICT (key) DO NOTHING
          `;
        }
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'USER_PERMANENTLY_DELETED', 'users', ${user_id}, ${`Permanently purged student account ${email || user_id} and blacklisted email`}, NOW())
        `;
        return json(res, { success: true });
      }

      if (action === 'RESET_PROGRESS') {
        const { user_id, course_id, lesson_id, reason } = body;
        if (lesson_id) {
          await sql`
            UPDATE enrolments 
            SET completed_mandatory_lessons = array_remove(completed_mandatory_lessons, ${lesson_id})
            WHERE user_id = ${user_id} AND course_id = ${course_id}
          `;
        } else {
          await sql`
            UPDATE enrolments 
            SET completed_mandatory_lessons = '{}', passed_quizzes = '{}', final_assessment_attempt_id = NULL
            WHERE user_id = ${user_id} AND course_id = ${course_id}
          `;
        }
        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'STUDENT_PROGRESS_RESET', 'enrolments', ${course_id}, ${`Reset progress for student ${user_id}. Scope: ${lesson_id || 'Full'}. Reason: ${reason}`}, NOW())
        `;
        return json(res, { success: true });
      }

      if (action === 'FORCE_ISSUE_CREDENTIAL' || action === 'DISPATCH_CREDENTIAL') {
        // Admin override: issues the same HMAC-signed credential as passing the final exam.
        const { user_id, course_id, grade_percentage, reason } = body;
        const spec = await getCourseSpec(String(course_id || ''));
        const target = await sql`SELECT * FROM users WHERE id = ${String(user_id || '')} LIMIT 1`;
        if (!spec || !target.length) return json(res, { error: 'Unknown user or course' }, 404);
        const grade = Math.max(0, Math.min(100, Math.round(Number(grade_percentage) || 100)));
        const { credential, created } = await issueCredential(target[0], spec, grade, `admin:${adminUserId}`);
        await audit(adminUserId, 'CREDENTIAL_FORCE_ISSUED', 'credentials', credential.id, { user_id, course_id, grade, reason: reason || null, created });
        return json(res, { success: true, created, credential_id: credential.id, verification_id: credential.verification_id });
      }

      if (action === 'REVOKE_CREDENTIAL') {
        const { verification_id, reason } = body;
        const rows = await sql`
          UPDATE credentials SET status = 'Revoked', updated_at = NOW()
          WHERE UPPER(verification_id) = UPPER(${String(verification_id || '')}) RETURNING id
        `;
        if (!rows.length) return json(res, { error: 'Credential not found' }, 404);
        await audit(adminUserId, 'CREDENTIAL_REVOKED', 'credentials', rows[0].id, { verification_id, reason: reason || null });
        return json(res, { success: true });
      }

      if (action === 'GRADE_ASSIGNMENT') {
        const { submission_id, grade, feedback, status } = body;
        await sql`
          UPDATE assignment_submissions 
          SET status = ${status || 'graded'}, grade = ${grade || 'Pass'}, feedback = ${feedback || 'Approved by Lead Instructor'}, updated_at = NOW()
          WHERE id = ${submission_id}
        `;
        return json(res, { success: true });
      }

      if (action === 'UPLOAD_VIDEO') {
        const { course_id, asset } = body;
        if (!course_id || !asset) {
          return json(res, { error: 'course_id and asset are required' }, 400);
        }
        const assetId = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        try {
          await sql`
            INSERT INTO course_video_assets (id, course_id, title, duration, file_name, file_size, lesson_id, visibility, url, thumbnail, created_at)
            VALUES (
              ${assetId},
              ${course_id},
              ${asset.title || 'Untitled Video'},
              ${asset.duration || '15:00'},
              ${asset.file_name || 'video.mp4'},
              ${asset.file_size || '48 MB'},
              ${asset.lesson_id || null},
              ${asset.visibility || 'Enrolled Only'},
              ${asset.url || ''},
              ${asset.thumbnail || ''},
              NOW()
            )
          `;
        } catch (dbErr) {
          console.warn('course_video_assets table insert fallback:', dbErr.message);
        }

        await sql`
          INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, created_at)
          VALUES (${`aud_${Date.now()}`}, ${adminUserId}, 'VIDEO_ASSET_UPLOADED', 'courses', ${course_id}, ${`Uploaded video "${asset.title}" bound to lesson ${asset.lesson_id || 'unassigned'}`}, NOW())
        `;

        return json(res, { success: true, asset_id: assetId });
      }

      return json(res, { success: true, message: 'Admin action accepted' });
    }

    // 1. Fetch Students CRM
    const students = await sql`
      SELECT u.id, u.full_name, u.email, u.avatar, u.headline, u.role, u.cadet_id, 
             COALESCE(u.status, 'ACTIVE') as status, 
             COALESCE(u.streak_days, 1) as streak_days, 
             u.created_at,
             count(DISTINCT e.id) as enrolled_courses_count,
             count(DISTINCT c.id) as credentials_count,
             coalesce(sum(rl.amount), COALESCE(u.token_balance, 150)) as token_balance
      FROM users u
      LEFT JOIN enrolments e ON e.user_id = u.id
      LEFT JOIN credentials c ON c.user_id = u.id
      LEFT JOIN reward_ledger rl ON rl.user_id = u.id
      GROUP BY u.id, u.full_name, u.email, u.avatar, u.headline, u.role, u.cadet_id, u.status, u.streak_days, u.token_balance, u.created_at
      ORDER BY u.created_at DESC
    `;

    // 2. Fetch Violations
    const violations = await sql`
      SELECT ev.*, u.full_name as student_name, u.email as student_email, q.title as quiz_title
      FROM exam_violation_events ev
      LEFT JOIN enrolments e ON ev.enrolment_id = e.id
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN quizzes q ON ev.quiz_id = q.id
      ORDER BY ev.created_at DESC
      LIMIT 50
    `;

    // 3. Fetch Audit Logs
    const auditLogs = await sql`
      SELECT * FROM audit_logs 
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    // 4. Fetch System Settings (Catalog Release Status)
    const settings = await sql`
      SELECT value FROM system_settings 
      WHERE key = 'public_catalog_enabled' 
      LIMIT 1
    `;
    const publicCatalogEnabled = settings.length > 0 ? (settings[0].value === true || settings[0].value === 'true') : false;

    // 5. Aggregate Metrics
    const totalStudents = await sql`SELECT count(*) as count FROM users WHERE role = 'student' OR role IS NULL`;
    const totalCourses = await sql`SELECT count(*) as count FROM courses`;
    const totalEnrolments = await sql`SELECT count(*) as count FROM enrolments`;
    const totalCredentials = await sql`SELECT count(*) as count FROM credentials WHERE status = 'Active'`;
    const totalTokens = await sql`SELECT coalesce(sum(amount), 0) as total FROM reward_ledger WHERE amount > 0`;
    const openTickets = await sql`SELECT count(*) as count FROM support_tickets WHERE status = 'Open'`;

    // 6. Fetch Pending Submissions
    let submissions = [];
    try {
      submissions = await sql`
        SELECT s.*, u.full_name as student_name, u.email as student_email
        FROM assignment_submissions s
        LEFT JOIN enrolments e ON s.enrolment_id = e.id
        LEFT JOIN users u ON e.user_id = u.id
        ORDER BY s.submitted_at DESC
        LIMIT 50
      `;
    } catch {}

    // 7. Fetch Certificate Requests & Credentials
    let certRequests = [];
    try {
      certRequests = await sql`
        SELECT cr.*, u.full_name as student_name, u.email as student_email
        FROM certificate_requests cr
        LEFT JOIN users u ON cr.user_id = u.id
        ORDER BY cr.created_at DESC
        LIMIT 50
      `;
    } catch {}

    let credentialsList = [];
    try {
      credentialsList = await sql`
        SELECT cd.*, u.full_name as student_name, u.email as student_email
        FROM credentials cd
        LEFT JOIN users u ON cd.user_id = u.id
        ORDER BY cd.created_at DESC
        LIMIT 50
      `;
    } catch {}

    return json(res, {
      metrics: {
        total_students: parseInt(totalStudents[0]?.count || 0, 10),
        total_courses: parseInt(totalCourses[0]?.count || 0, 10),
        total_enrolments: parseInt(totalEnrolments[0]?.count || 0, 10),
        total_credentials_issued: parseInt(totalCredentials[0]?.count || 0, 10),
        total_tokens_circulated: parseInt(totalTokens[0]?.total || 0, 10),
        open_support_tickets: parseInt(openTickets[0]?.count || 0, 10),
        active_exam_incidents: violations.length,
        public_catalog_enabled: publicCatalogEnabled
      },
      students,
      violations,
      audit_logs: auditLogs,
      submissions,
      certificate_requests: certRequests,
      credentials: credentialsList,
      public_catalog_enabled: publicCatalogEnabled
    });
  } catch (error) {
    return serverError(res, error, 'api/admin');
  }
}
