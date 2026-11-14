import { sql, json, cors, serverError } from './_db.js';
import { verifyCredentialSignature } from './_crypto.js';

/**
 * GET /api/verify?id=<verification id> - public credential verification.
 * Returns only the fields printed on the certificate (no user id, no email).
 * Unsigned or tampered records are reported as NOT verified; signatures are never
 * back-filled here, because that would make any row inserted into the table look
 * authentic.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'GET') return json(res, { error: 'Method not allowed' }, 405);

  try {
    const raw = String(req.query?.id || '').trim();
    if (!raw || raw.length > 64 || !/^[A-Za-z0-9_-]+$/.test(raw)) {
      return json(res, { found: false, error: 'A valid verification ID is required' }, 400);
    }

    const rows = await sql`
      SELECT * FROM credentials WHERE UPPER(verification_id) = UPPER(${raw}) LIMIT 1
    `;
    if (!rows.length) {
      return json(res, { found: false, message: 'No credential matches this verification identifier.' }, 404);
    }
    const cred = rows[0];
    const proof = verifyCredentialSignature(cred);
    const revoked = String(cred.status || '').toLowerCase() === 'revoked';

    return json(res, {
      found: true,
      credential: {
        verification_id: cred.verification_id,
        student_name: cred.student_name,
        course_id: cred.course_id,
        course_title: cred.course_title,
        credential_title: cred.credential_title,
        credential_type: cred.credential_type || cred.type,
        issue_date: cred.issue_date,
        expiration_date: cred.expiration_date,
        grade_percentage: cred.grade_percentage,
        status: cred.status,
        skills_validated: cred.skills_validated,
        verification_url: cred.verification_url,
      },
      cryptographic_verification: {
        verified: proof.verified && !revoked,
        algorithm: 'HMAC-SHA256',
        status: revoked ? 'REVOKED' : proof.verified ? 'VERIFIED_AUTHENTIC' : 'SIGNATURE_INVALID',
        reason: revoked ? 'REVOKED' : proof.reason || null,
        verified_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return serverError(res, error, 'api/verify');
  }
}
