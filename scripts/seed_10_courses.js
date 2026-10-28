import { sql } from '../api/_db.js';

async function seed10Courses() {
  console.log('Seeding 10 courses with variants 1-10...');

  const courses = [
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
      card_variant: 'variant-01'
    },
    {
      id: 'crs_cyber_fund',
      slug: 'cybersecurity-fundamentals-architecture',
      title: 'Cybersecurity Fundamentals & Defensive Architecture',
      category: 'Architecture',
      difficulty: 'Beginner',
      price: 0,
      cert_price: 2999,
      estimated_duration: '10 Hours',
      rating: 4.85,
      enrolled_count: 2150,
      overview: 'Master defense-in-depth principles, zero trust architecture, enterprise cryptographic controls, and perimeter defense strategies.',
      card_variant: 'variant-02'
    },
    {
      id: 'crs_linux_fund',
      slug: 'linux-fundamentals-security-operations',
      title: 'Linux Fundamentals for Security Operations',
      category: 'OS Defense',
      difficulty: 'Beginner',
      price: 0,
      cert_price: 2499,
      estimated_duration: '12 Hours',
      rating: 4.88,
      enrolled_count: 1890,
      overview: 'Linux command line mastery for blue teams: auditd, syslog, systemd security, process triage, permissions, and bash automation.',
      card_variant: 'variant-03'
    },
    {
      id: 'crs_networking_fund',
      slug: 'networking-traffic-analysis',
      title: 'Networking Fundamentals & Traffic Analysis',
      category: 'Network Defense',
      difficulty: 'Intermediate',
      price: 1999,
      cert_price: 3499,
      estimated_duration: '15 Hours',
      rating: 4.92,
      enrolled_count: 1340,
      overview: 'Deep packet inspection with Wireshark and Zeek, TCP/IP flow reconstruction, and adversary C2 detection over DNS/HTTP.',
      card_variant: 'variant-04'
    },
    {
      id: 'crs_web_sec_fund',
      slug: 'web-application-defense-api',
      title: 'Web Application Defense & API Security',
      category: 'Application Defense',
      difficulty: 'Intermediate',
      price: 2999,
      cert_price: 3999,
      estimated_duration: '16 Hours',
      rating: 4.91,
      enrolled_count: 1120,
      overview: 'Defending against OWASP Top 10 vulnerabilities, web application firewalls (ModSecurity/Cloudflare), and OAuth 2.0 / API security hardening.',
      card_variant: 'variant-05'
    },
    {
      id: 'crs_incident_response',
      slug: 'enterprise-incident-response-playbooks',
      title: 'Enterprise Incident Response Playbooks',
      category: 'Incident Response',
      difficulty: 'Advanced',
      price: 4999,
      cert_price: 4999,
      estimated_duration: '20 Hours',
      rating: 4.96,
      enrolled_count: 980,
      overview: 'Rapid containment playbooks for ransomware outbreaks, business email compromise (BEC), supply chain attacks, and lateral movement.',
      card_variant: 'variant-06'
    },
    {
      id: 'crs_forensics_fund',
      slug: 'digital-forensics-evidence-analysis',
      title: 'Digital Forensics & Incident Evidence Analysis',
      category: 'Forensics',
      difficulty: 'Advanced',
      price: 4499,
      cert_price: 4499,
      estimated_duration: '18 Hours',
      rating: 4.89,
      enrolled_count: 760,
      overview: 'Disk forensics, memory volatility analysis, chain of custody preservation, timeline reconstruction, and court-admissible reporting.',
      card_variant: 'variant-07'
    },
    {
      id: 'crs_cloud_sec_fund',
      slug: 'cloud-security-aws-gcp',
      title: 'Cloud Security Fundamentals (AWS & GCP)',
      category: 'Cloud Defense',
      difficulty: 'Intermediate',
      price: 3499,
      cert_price: 4499,
      estimated_duration: '14 Hours',
      rating: 4.87,
      enrolled_count: 1040,
      overview: 'Securing AWS and GCP environments: CloudTrail, GuardDuty, VPC Flow Logs, IAM least privilege, and container runtime security.',
      card_variant: 'variant-08'
    },
    {
      id: 'crs_sec_governance',
      slug: 'security-governance-grc',
      title: 'Security Governance, Risk & Compliance (GRC)',
      category: 'Governance & Risk',
      difficulty: 'Advanced',
      price: 4499,
      cert_price: 4499,
      estimated_duration: '14 Hours',
      rating: 4.82,
      enrolled_count: 650,
      overview: 'Enterprise risk management: ISO 27001 implementation, SOC 2 compliance readiness, PCI-DSS requirements, and third-party risk assessments.',
      card_variant: 'variant-09'
    },
    {
      id: 'crs_threat_hunting',
      slug: 'advanced-threat-hunting-adversary-emulation',
      title: 'Advanced Threat Hunting & Adversary Emulation',
      category: 'Threat Defense',
      difficulty: 'Advanced',
      price: 4999,
      cert_price: 4999,
      estimated_duration: '16 Hours',
      rating: 4.95,
      enrolled_count: 820,
      overview: 'Proactive adversary hunting across live telemetry: memory dumps, YARA rules, Volatility 3 analysis, kernel tracing, and MITRE ATT&CK emulation.',
      card_variant: 'variant-10'
    }
  ];

  for (const c of courses) {
    await sql.query(`
      INSERT INTO courses (
        id, slug, title, version, category, difficulty, price, cert_price,
        estimated_duration, rating, enrolled_count, overview,
        learning_objectives, lead_author, total_tokens_reward, card_variant, created_at
      ) VALUES (
        $1, $2, $3, '1.0', $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, 400, $14, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        category = EXCLUDED.category,
        difficulty = EXCLUDED.difficulty,
        price = EXCLUDED.price,
        cert_price = EXCLUDED.cert_price,
        estimated_duration = EXCLUDED.estimated_duration,
        rating = EXCLUDED.rating,
        enrolled_count = EXCLUDED.enrolled_count,
        overview = EXCLUDED.overview,
        card_variant = EXCLUDED.card_variant;
    `, [
      c.id, c.slug, c.title, c.category, c.difficulty, c.price, c.cert_price,
      c.estimated_duration, c.rating, c.enrolled_count, c.overview,
      JSON.stringify(['Incident Triage', 'Log Correlation', 'Defensive Response']),
      JSON.stringify({ name: 'Sarah Chen, CISSP', title: 'Principal Incident Handler' }),
      c.card_variant
    ]);
  }

  const result = await sql.query('SELECT id, title, card_variant FROM courses ORDER BY card_variant ASC');
  console.log('Courses seeded in DB:');
  console.table(result);
  process.exit(0);
}

seed10Courses().catch((err) => {
  console.error('Error seeding courses:', err);
  process.exit(1);
});
