import crypto from 'crypto';

const SIGNING_SECRET = process.env.CREDENTIAL_SIGNING_SECRET || 'redkross_academy_tamperproof_signing_key_2026_default';

/**
 * Computes canonical payload digest string from verified credential attributes
 */
export function computeCredentialPayload(cred) {
  return [
    (cred.verification_id || cred.id || '').trim().toUpperCase(),
    (cred.student_name || '').trim(),
    (cred.user_id || '').trim(),
    (cred.course_id || '').trim(),
    cred.issue_date ? new Date(cred.issue_date).toISOString().split('T')[0] : '',
    String(Math.round(Number(cred.grade_percentage || 100)))
  ].join('|');
}

/**
 * Computes HMAC-SHA256 digital signature hex string
 */
export function signCredential(cred) {
  const payload = computeCredentialPayload(cred);
  return crypto
    .createHmac('sha256', SIGNING_SECRET)
    .update(payload)
    .digest('hex');
}

/**
 * Verifies digital signature with constant-time equality check
 */
export function verifyCredentialSignature(cred) {
  if (!cred || !cred.digital_signature) {
    return { verified: false, reason: 'MISSING_SIGNATURE' };
  }

  const expected = signCredential(cred);
  try {
    const a = Buffer.from(cred.digital_signature, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length) {
      return { verified: false, reason: 'SIGNATURE_LENGTH_MISMATCH' };
    }
    const isValid = crypto.timingSafeEqual(a, b);
    return {
      verified: isValid,
      algorithm: 'HMAC-SHA256',
      signature: cred.digital_signature,
      digest: expected
    };
  } catch (err) {
    return { verified: false, reason: 'VERIFICATION_EXCEPTION', error: err.message };
  }
}
