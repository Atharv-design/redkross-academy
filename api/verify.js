import { sql, json, cors } from './_db.js';

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

    return json(res, {
      found: true,
      credential: credentials[0]
    });
  } catch (error) {
    console.error('API /verify error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
