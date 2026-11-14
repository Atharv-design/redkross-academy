import { json, cors } from './_db.js';

/**
 * Retired. The old handler graded without authentication, read a table that does not
 * exist in schema.sql (question_options) and minted credentials with a random
 * "signature". All assessments now go through /api/assessment.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  return json(res, { error: 'This endpoint has been retired. Use /api/assessment.' }, 410);
}
