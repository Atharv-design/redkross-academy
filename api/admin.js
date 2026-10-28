import { sql, json, cors } from './_db.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  try {
    const students = await sql`
      SELECT u.id, u.full_name, u.email, u.avatar, u.headline, u.role, u.streak_days, u.created_at,
             count(DISTINCT e.id) as enrolled_courses_count,
             count(DISTINCT c.id) as credentials_count,
             coalesce(sum(rl.amount), 0) as token_balance
      FROM users u
      LEFT JOIN enrolments e ON e.user_id = u.id
      LEFT JOIN credentials c ON c.user_id = u.id
      LEFT JOIN reward_ledger rl ON rl.user_id = u.id
      GROUP BY u.id, u.full_name, u.email, u.avatar, u.headline, u.role, u.streak_days, u.created_at
      ORDER BY u.created_at DESC
    `;

    const violations = await sql`
      SELECT ev.*, u.full_name as student_name, u.email as student_email, q.title as quiz_title
      FROM exam_violation_events ev
      LEFT JOIN enrolments e ON ev.enrolment_id = e.id
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN quizzes q ON ev.quiz_id = q.id
      ORDER BY ev.created_at DESC
      LIMIT 50
    `;

    const auditLogs = await sql`
      SELECT * FROM audit_logs 
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    const totalStudents = await sql`SELECT count(*) as count FROM users WHERE role = 'student'`;
    const totalEnrolments = await sql`SELECT count(*) as count FROM enrolments`;
    const totalCredentials = await sql`SELECT count(*) as count FROM credentials`;
    const totalTokens = await sql`SELECT coalesce(sum(amount), 0) as total FROM reward_ledger WHERE amount > 0`;
    const openTickets = await sql`SELECT count(*) as count FROM support_tickets WHERE status = 'Open'`;

    return json(res, {
      metrics: {
        total_students: parseInt(totalStudents[0].count),
        total_enrolments: parseInt(totalEnrolments[0].count),
        total_credentials_issued: parseInt(totalCredentials[0].count),
        total_tokens_circulated: parseInt(totalTokens[0].total),
        open_support_tickets: parseInt(openTickets[0].count),
        active_exam_incidents: violations.length
      },
      students,
      violations,
      audit_logs: auditLogs
    });
  } catch (error) {
    console.error('API /admin error:', error);
    return json(res, { error: error.message || 'Internal server error' }, 500);
  }
}
