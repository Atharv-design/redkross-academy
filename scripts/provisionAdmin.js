import { neon } from '@neondatabase/serverless';

/**
 * Super Admin Provisioning Script (Phase 4.2)
 * 
 * Strict Security Guardrails:
 * - NEVER run automatically on startup or deployment.
 * - Requires explicit execution by an infrastructure engineer or authorized deployment orchestrator.
 * - Expects environment variable `ADMIN_PROVISION_EMAIL` containing the verified identity to elevate.
 * - Never invents credentials or creates accounts without explicit input.
 * - Records all promotions in the `audit_logs` table for compliance.
 */

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3RwIaSv9ptBg@ep-proud-flower-a5ho5vpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
const targetEmail = process.env.ADMIN_PROVISION_EMAIL;

async function provision() {
  if (!targetEmail || !targetEmail.trim() || !targetEmail.includes('@')) {
    console.error('❌ ERROR: ADMIN_PROVISION_EMAIL environment variable is missing or invalid.');
    console.error('Usage: ADMIN_PROVISION_EMAIL="authorized.admin@domain.com" node scripts/provisionAdmin.js');
    process.exit(1);
  }

  const normalizedEmail = targetEmail.trim().toLowerCase();
  console.log(`🔒 Authenticating administrative provisioning for: ${normalizedEmail}...`);

  const sql = neon(DATABASE_URL);

  // Check if user exists
  const existing = await sql`
    SELECT id, email, full_name, role 
    FROM users 
    WHERE LOWER(email) = ${normalizedEmail} 
    LIMIT 1
  `;

  if (!existing || existing.length === 0) {
    console.error(`❌ User with email "${normalizedEmail}" not found in database.`);
    console.error('Please register or sign in as a student first via Firebase/OAuth before elevating to Super Admin.');
    process.exit(1);
  }

  const user = existing[0];
  if (user.role === 'super_admin') {
    console.log(`ℹ️ User ${normalizedEmail} is already a Super Admin.`);
    return;
  }

  // Elevate role
  await sql`
    UPDATE users 
    SET role = 'super_admin' 
    WHERE id = ${user.id}
  `;

  // Write to audit log
  await sql`
    INSERT INTO audit_logs (id, admin_id, action, target_type, target_id, details)
    VALUES (
      ${'audit_' + Date.now()},
      'SYSTEM_CLI_PROVISIONER',
      'ROLE_ELEVATION',
      'USER',
      ${user.id},
      ${JSON.stringify({
        email: normalizedEmail,
        previous_role: user.role,
        new_role: 'super_admin',
        timestamp: new Date().toISOString()
      })}
    )
  `;

  console.log(`✅ SUCCESS: User ${user.full_name} (${normalizedEmail}) has been elevated to Super Admin.`);
  console.log('Action logged to audit_logs.');
}

provision().catch((err) => {
  console.error('Provisioning failed:', err);
  process.exit(1);
});
