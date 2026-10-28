import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const paths = await sql`
      SELECT * FROM learning_paths 
      ORDER BY featured DESC, estimated_weeks ASC
    `;

    return json(res, { learning_paths: paths });
  } catch (error) {
    console.error('API /learning-paths error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
