import crypto from 'crypto';

/**
 * Credential signing. CREDENTIAL_SIGNING_SECRET must be a long random value
 * (e.g. `openssl rand -hex 32`) kept only on the server. There is deliberately no
 * fallback: a default secret in source would let anyone mint "verified" credentials.
 */
function signingSecret() {
  const secret = process.env.CREDENTIAL_SIGNING_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('CREDENTIAL_SIGNING_SECRET is not configured (min 32 chars)');
  }
  return secret;
}

export function isSigningConfigured() {
  const secret = process.env.CREDENTIAL_SIGNING_SECRET;
  return Boolean(secret && secret.length >= 32);
}

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
  return crypto.createHmac('sha256', signingSecret()).update(payload).digest('hex');
}

/**
 * Verifies digital signature with constant-time equality check
 */
export function verifyCredentialSignature(cred) {
  if (!cred || !cred.digital_signature) {
    return { verified: false, reason: 'MISSING_SIGNATURE' };
  }
  if (!/^[0-9a-f]{64}$/i.test(cred.digital_signature)) {
    return { verified: false, reason: 'MALFORMED_SIGNATURE' };
  }
  try {
    const expected = signCredential(cred);
    const a = Buffer.from(cred.digital_signature, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length) {
      return { verified: false, reason: 'SIGNATURE_LENGTH_MISMATCH' };
    }
    const isValid = crypto.timingSafeEqual(a, b);
    return { verified: isValid, reason: isValid ? null : 'SIGNATURE_MISMATCH', algorithm: 'HMAC-SHA256' };
  } catch (err) {
    console.error('[credential verify]', err.message);
    return { verified: false, reason: 'VERIFICATION_UNAVAILABLE' };
  }
}

const B32 = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1 to avoid transcription errors

/** e.g. RK-C05-7KQ2-M9XA: course tag + 40 bits of CSPRNG output. */
export function newVerificationId(courseTag = 'RK') {
  const bytes = crypto.randomBytes(8);
  let out = '';
  for (let i = 0; i < 8; i++) out += B32[bytes[i] % 32];
  return `RK-${courseTag}-${out.slice(0, 4)}-${out.slice(4)}`;
}
