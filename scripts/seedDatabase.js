/**
 * RedKross Academy - Master Database Seeder
 * 
 * Pre-populates a fresh PostgreSQL database with:
 * 1. Default Super Admin account (admin@redkross.org.in)
 * 2. System settings (public_catalog_enabled = true)
 * 3. Foundational courses, modules, and lessons
 * 
 * Usage:
 *   node scripts/seedDatabase.js
 */

import { sql } from '../api/_db.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedMaster() {
  console.log('====================================================');
  console.log('      REDKROSS ACADEMY - DATABASE INITIAL SEED      ');
  console.log('====================================================');

  try {
    // 1. Seed System Settings
    console.log('[1/3] Configuring default system settings...');
    await sql`
      INSERT INTO system_settings (key, value, updated_at)
      VALUES 
        ('public_catalog_enabled', 'true'::jsonb, NOW()),
        ('allow_student_registration', 'true'::jsonb, NOW()),
        ('proctoring_tab_lockout_hours', '24'::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE SET 
        value = EXCLUDED.value,
        updated_at = NOW();
    `;
    console.log('?" System settings synchronized.');

    // 2. Seed Super Admin
    console.log('[2/3] Provisioning default Super Admin identity...');
    const adminId = 'usr_super_admin_01';
    await sql`
      INSERT INTO users (
        id, email, full_name, avatar, headline, role, cadet_id, token_balance, streak_days, created_at, updated_at
      ) VALUES (
        ${adminId},
        'admin@redkross.org.in',
        'Super Admin',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        'Principal Security Architect & RedKross Academy Administrator',
        'super_admin',
        'RK-0001',
        5000,
        14,
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET
        role = 'super_admin',
        token_balance = GREATEST(users.token_balance, 5000);
    `;
    console.log('?" Super Admin account provisioned: admin@redkross.org.in');

    // 3. Seed Courses & Modules
    console.log('[3/3] Seeding foundation course catalog...');
    const sampleCourses = [
      {
        id: 'crs_soc_fundamentals',
        slug: 'soc-fundamentals-incident-response',
        title: 'SOC Fundamentals & Incident Response',
        category: 'SOC Operations',
        difficulty: 'Intermediate',
        price: 0,
        cert_price: 3999,
        estimated_duration: '14 Hours',
        rating: 4.9,
        enrolled_count: 1420,
        overview: 'Designed for cybersecurity operators and defensive practitioners. This course teaches the practical anatomy of a Security Operations Centre (SOC), modern alert correlation using SIEM, threat hunting workflows, and structured incident containment.',
        card_variant: 'variant-01',
        lead_author: JSON.stringify({
          name: 'Sarah Chen, CISSP',
          role: 'Principal Incident Handler, RedKross Lab',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
        }),
        what_you_will_learn: JSON.stringify([
          'Triage and classify critical SIEM alerts and telemetry signatures',
          'Coordinate rapid containment protocols against active adversary intrusions',
          'Deploy automated playbooks to remediate credential compromises'
        ]),
        learning_objectives: JSON.stringify([
          'SIEM Architecture & Alert Rules',
          'Incident Response Lifecycle (NIST SP 800-61)',
          'Live Memory & Disk Forensics Triage'
        ]),
        prerequisites: JSON.stringify([
          'Fundamental understanding of IP addressing, TCP/UDP packets, and subnets.',
          'Basic familiarity with command line interfaces (Bash or PowerShell).'
        ])
      },
      {
        id: 'crs_practical_cyber_def',
        slug: 'practical-cybersecurity-network-defense',
        title: 'Practical Cybersecurity & Network Defense',
        category: 'Defensive Cyber Operations',
        difficulty: 'Beginner',
        price: 0,
        cert_price: 2999,
        estimated_duration: '18 Hours',
        rating: 4.88,
        enrolled_count: 2450,
        overview: 'A high-impact, hands-on immersive curriculum providing defensive cyber operators with end-to-end operational tradecraft across packet inspection, firewall ACL hardening, IDS/IPS tuning, and perimeter defense.',
        card_variant: 'variant-02',
        lead_author: JSON.stringify({
          name: 'Col. Vikram Singh',
          role: 'Cyber Command Advisor, RedKross Lab',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        }),
        what_you_will_learn: JSON.stringify([
          'Analyze raw PCAP packet captures using Wireshark and Zeek',
          'Configure stateful firewalls and IDS/IPS inspection signatures',
          'Enforce Zero Trust microsegmentation across enterprise subnets'
        ]),
        learning_objectives: JSON.stringify([
          'Layer 2-7 Protocol Vulnerabilities',
          'Suricata / Snort Rule Writing',
          'Defensive Hardening against Common MITRE ATT&CK Techniques'
        ]),
        prerequisites: JSON.stringify([
          'Basic networking knowledge (OSI model, IP, TCP/UDP)',
          'Curiosity and commitment to defensive cyber operations'
        ])
      }
    ];

    for (const c of sampleCourses) {
      await sql`
        INSERT INTO courses (
          id, slug, title, category, difficulty, price, cert_price, estimated_duration, 
          rating, enrolled_count, overview, card_variant, lead_author, what_you_will_learn, 
          learning_objectives, prerequisites, created_at, updated_at
        ) VALUES (
          ${c.id}, ${c.slug}, ${c.title}, ${c.category}, ${c.difficulty}, ${c.price}, 
          ${c.cert_price}, ${c.estimated_duration}, ${c.rating}, ${c.enrolled_count}, 
          ${c.overview}, ${c.card_variant}, ${c.lead_author}::jsonb, ${c.what_you_will_learn}::jsonb, 
          ${c.learning_objectives}::jsonb, ${c.prerequisites}::jsonb, NOW(), NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          overview = EXCLUDED.overview,
          lead_author = EXCLUDED.lead_author,
          what_you_will_learn = EXCLUDED.what_you_will_learn,
          card_variant = EXCLUDED.card_variant;
      `;
    }
    console.log('?" Course catalog seeded.');

    console.log('\n====================================================');
    console.log('?" DATABASE SEEDING COMPLETED WITH ZERO ERRORS.');
    console.log('====================================================\n');
  } catch (err) {
    console.error('\n? Database seeding failed:', err.message);
    process.exit(1);
  }
}

seedMaster();
