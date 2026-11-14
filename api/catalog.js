import { json, cors, serverError } from './_db.js';
import { optionalUser } from './_auth.js';
import { courseSettingsMap, grantedCourseIds } from './_lib/access.js';

/**
 * GET /api/catalog - public course availability (visibility + price), plus the
 * caller's unlocked courses when a valid token is sent. The client uses it to hide
 * courses, show "Coming soon" and price/lock badges; the enrol and assessment APIs
 * enforce the same rules on the server.
 */
export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    if (req.method !== 'GET') return json(res, { error: 'Method not allowed' }, 405);
    const settings = await courseSettingsMap();
    const ctx = await optionalUser(req);
    const unlocked = ctx ? await grantedCourseIds(ctx.user.id) : [];
    res.setHeader('Cache-Control', ctx ? 'private, no-store' : 'public, max-age=60');
    return json(res, { settings, unlocked_course_ids: unlocked, is_admin: Boolean(ctx?.isAdmin) });
  } catch (error) {
    return serverError(res, error, 'api/catalog');
  }
}
