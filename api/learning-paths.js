import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const settings = await sql`
      SELECT value FROM system_settings 
      WHERE key = 'public_catalog_enabled' 
      LIMIT 1
    `;
    const isCatalogEnabled = settings.length > 0 ? (settings[0].value === true || settings[0].value === 'true') : false;

    const paths = await sql`
      SELECT id, slug, title, short_desc, difficulty, estimated_weeks, total_hours, milestone_cert, featured, skills
      FROM learning_paths 
      ORDER BY featured DESC, estimated_weeks ASC
    `;

    return json(res, {
      learning_paths: paths,
      public_catalog_enabled: isCatalogEnabled,
      message: isCatalogEnabled ? 'Active' : 'Courses will be out soon'
    });
  } catch (error) {
    console.error('API /learning-paths error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
