/**
 * Server-side learning records shared by the assessment, progress and enrolment APIs.
 */
import crypto from 'crypto';
import { sql } from '../_db.js';
import { audit } from '../_auth.js';
import { signCredential, newVerificationId } from '../_crypto.js';
import { dispatchWebhook } from '../_webhooks.js';

export function randomId(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString('hex')}`;
}

export function publicBaseUrl() {
  return (process.env.PUBLIC_BASE_URL || 'https://academy.redkross.org.in').replace(/\/+$/, '');
}

/** Makes sure a courses row exists (credentials and enrolments reference it). */
export async function ensureCourseRow(spec, extra = {}) {
  const slug = extra.slug || spec.id.replace(/^crs_/, '').replace(/_/g, '-');
  await sql`
    INSERT INTO courses (id, slug, title, category, difficulty, price, estimated_duration, lead_author, created_at, updated_at)
    VALUES (${spec.id}, ${slug}, ${spec.title}, ${extra.category || 'Cybersecurity'}, ${extra.difficulty || 'Intermediate'}, 0, '40 Hours', '{}'::jsonb, NOW(), NOW())
    ON CONFLICT DO NOTHING
  `;
}

export async function ensureEnrolment(user, spec, extra = {}) {
  await ensureCourseRow(spec, extra);
  const existing = await sql`SELECT * FROM enrolments WHERE user_id = ${user.id} AND course_id = ${spec.id} LIMIT 1`;
  if (existing.length) return { enrolment: existing[0], created: false };
  const id = randomId('enr');
  const rows = await sql`
    INSERT INTO enrolments (id, user_id, course_id, course_version, status, enrolled_at)
    VALUES (${id}, ${user.id}, ${spec.id}, ${spec.version || '1.0'}, 'Active', NOW())
    ON CONFLICT DO NOTHING
    RETURNING *
  `;
  if (!rows.length) {
    const again = await sql`SELECT * FROM enrolments WHERE user_id = ${user.id} AND course_id = ${spec.id} LIMIT 1`;
    return { enrolment: again[0], created: false };
  }
  await sql`UPDATE courses SET enrolled_count = COALESCE(enrolled_count, 0) + 1 WHERE id = ${spec.id}`.catch(() => {});
  return { enrolment: rows[0], created: true };
}

/** Idempotent token award; the idempotency key guarantees one grant per event. */
export async function awardTokens(userId, amount, type, description, idempotencyKey) {
  if (!amount) return 0;
  const rows = await sql`
    INSERT INTO reward_ledger (id, user_id, amount, transaction_type, description, idempotency_key, created_at)
    VALUES (${randomId('rw')}, ${userId}, ${amount}, ${type}, ${description}, ${idempotencyKey}, NOW())
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id
  `;
  return rows.length ? amount : 0;
}

export async function tokenBalance(userId) {
  const rows = await sql`SELECT COALESCE(SUM(amount), 0) AS balance FROM reward_ledger WHERE user_id = ${userId}`;
  return parseInt(rows[0]?.balance ?? 0, 10) || 0;
}

export function publicCredential(cred) {
  if (!cred) return null;
  return {
    id: cred.id,
    verification_id: cred.verification_id,
    student_name: cred.student_name,
    course_id: cred.course_id,
    course_title: cred.course_title,
    credential_title: cred.credential_title,
    credential_type: cred.credential_type || cred.type,
    issue_date: cred.issue_date,
    grade_percentage: Number(cred.grade_percentage),
    status: cred.status,
    digital_signature: cred.digital_signature,
    verification_url: cred.verification_url,
    skills_validated: cred.skills_validated,
  };
}

/**
 * Issues (once) the signed credential for a user who passed a course's final
 * assessment. Only ever called after server-side grading.
 */
export async function issueCredential(user, spec, scorePercentage, sessionId) {
  const existing = await sql`
    SELECT * FROM credentials WHERE user_id = ${user.id} AND course_id = ${spec.id} AND status = 'Active' LIMIT 1
  `;
  if (existing.length) return { credential: existing[0], created: false };

  await ensureCourseRow(spec);
  const issueDate = new Date();
  for (let attempt = 0; attempt < 5; attempt++) {
    const verificationId = newVerificationId(spec.code);
    const cred = {
      id: randomId('cred'),
      verification_id: verificationId,
      student_name: user.full_name || user.email,
      user_id: user.id,
      course_id: spec.id,
      course_title: spec.title,
      credential_title: spec.final.credentialTitle,
      credential_type: 'Course Certificate',
      issue_date: issueDate.toISOString(),
      grade_percentage: scorePercentage,
      status: 'Active',
      verification_url: `${publicBaseUrl()}/verify/${verificationId}`,
      skills_validated: spec.final.skills || [],
    };
    cred.digital_signature = signCredential(cred);
    try {
      const rows = await sql`
        INSERT INTO credentials (id, verification_id, student_name, user_id, course_id, course_title, credential_title,
                                 credential_type, type, issue_date, grade_percentage, status, digital_signature,
                                 verification_url, skills_validated, created_at)
        VALUES (${cred.id}, ${cred.verification_id}, ${cred.student_name}, ${cred.user_id}, ${cred.course_id},
                ${cred.course_title}, ${cred.credential_title}, ${cred.credential_type}, ${cred.credential_type},
                ${cred.issue_date}, ${cred.grade_percentage}, 'Active', ${cred.digital_signature},
                ${cred.verification_url}, ${JSON.stringify(cred.skills_validated)}, NOW())
        RETURNING *
      `;
      await audit(user.id, 'CREDENTIAL_ISSUED', 'credentials', cred.id, {
        verification_id: verificationId,
        course_id: spec.id,
        score: scorePercentage,
        session_id: sessionId,
      });
      dispatchWebhook('credential.issued', {
        userId: user.id,
        email: user.email,
        studentName: cred.student_name,
        courseTitle: spec.title,
        credentialTitle: cred.credential_title,
        verificationId,
        verificationUrl: cred.verification_url,
        gradePercentage: scorePercentage,
      });
      return { credential: rows[0], created: true };
    } catch (err) {
      if (err.code === '23505' && /verification/.test(err.detail || err.message || '')) continue; // id collision
      throw err;
    }
  }
  throw new Error('Could not allocate a unique verification id');
}
