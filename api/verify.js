import { sql, json, cors } from './_db.js';
import { verifyCredentialSignature, signCredential } from './_crypto.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const { id } = req.query;

    if (!id) {
      return json(res, { error: 'Verification ID required' }, 400);
    }

    // Clean input ID
    const cleanId = id.trim();

    const credentials = await sql`
      SELECT * FROM credentials 
      WHERE LOWER(verification_id) = LOWER(${cleanId}) OR id = ${cleanId}
      LIMIT 1
    `;

    if (!credentials || credentials.length === 0) {
      return json(res, { found: false, message: 'No credential matches this verification identifier.' }, 404);
    }

    const cred = credentials[0];

    // Ensure digital signature exists (backfill signature if older record)
    if (!cred.digital_signature) {
      cred.digital_signature = signCredential(cred);
      // Persist signature asynchronously
      sql`UPDATE credentials SET digital_signature = ${cred.digital_signature} WHERE id = ${cred.id}`.catch(console.error);
    }

    // Verify cryptographic signature integrity
    const verificationProof = verifyCredentialSignature(cred);

    return json(res, {
      found: true,
      credential: cred,
      cryptographic_verification: {
        verified: verificationProof.verified,
        algorithm: 'HMAC-SHA256',
        signature: cred.digital_signature,
        status: verificationProof.verified ? 'VERIFIED_AUTHENTIC' : 'SIGNATURE_INVALID',
        verified_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('API /verify error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
