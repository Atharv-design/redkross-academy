/**
 * RedKross Academy — High-Fidelity Initial Seed Fixtures
 * Matches PRD Appendix B (Course Catalogue), Appendix A (State Rules), and Section 8 (Token Economy)
 */

export const INITIAL_USERS = [
  {
    id: 'usr_student_01',
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
    role: 'super_admin',
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
          title: 'Module 1 Evaluation: SOC Fundamentals & Log Correlation',
          passing_score: 75,
          total_questions: 4,
          token_bounty: 100,
          questions: [
            {
              id: 'q_1_1',
              text: 'Which Windows Event ID indicates a successful account logon?',
              type: 'single_choice',
              points: 25,
              options: [
                { id: 'opt_1', text: 'Event ID 4624', is_correct: true },
                { id: 'opt_2', text: 'Event ID 4625', is_correct: false },
                { id: 'opt_3', text: 'Event ID 4688', is_correct: false },
                { id: 'opt_4', text: 'Event ID 7045', is_correct: false }
              ],
              explanation: 'Windows Event ID 4624 records successful logons, whereas 4625 logs failed logon attempts.'
            },
            {
              id: 'q_1_2',
              text: 'In Windows Event 4624, what does Logon Type 10 indicate?',
              type: 'single_choice',
              points: 25,
              options: [
                { id: 'opt_5', text: 'Interactive Console Logon (Keyboard & Monitor)', is_correct: false },
                { id: 'opt_6', text: 'Remote Desktop (RDP / Terminal Services)', is_correct: true },
                { id: 'opt_7', text: 'Network Share Access (SMB)', is_correct: false },
                { id: 'opt_8', text: 'Service Account Startup', is_correct: false }
              ],
              explanation: 'Logon Type 10 specifically designates Remote Interactive logons via Remote Desktop Protocol (RDP).'
            },
            {
              id: 'q_1_3',
              text: 'Which defensive component is primarily responsible for automating repetitive triage actions like IP enrichment and sandbox submissions?',
              type: 'single_choice',
              points: 25,
              options: [
                { id: 'opt_9', text: 'EDR (Endpoint Detection and Response)', is_correct: false },
                { id: 'opt_10', text: 'SOAR (Security Orchestration, Automation, and Response)', is_correct: true },
                { id: 'opt_11', text: 'IDS/IPS (Intrusion Detection System)', is_correct: false },
                { id: 'opt_12', text: 'Honeypot Decoy', is_correct: false }
              ],
              explanation: 'SOAR platforms execute automated playbooks to enrich IP indicators and orchestrate multi-tool responses.'
            },
            {
              id: 'q_1_4',
              text: 'Why should a SOC analyst preserve volatile RAM before powering down an infected machine during incident response?',
              type: 'single_choice',
              points: 25,
              options: [
                { id: 'opt_13', text: 'To avoid damaging the physical hard drive hardware', is_correct: false },
                { id: 'opt_14', text: 'Because memory contains injected malware payloads, encryption keys, and active network connections that disappear upon reboot', is_correct: true },
                { id: 'opt_15', text: 'Because Windows will refuse to boot if powered down abruptly', is_correct: false },
                { id: 'opt_16', text: 'To maintain anti-virus definition updates', is_correct: false }
              ],
              explanation: 'RAM contains critical transient evidence: decrypted communication keys, in-memory malware DLLs, and socket connections.'
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
    - 'C:\\Windows\\System32\\'
    - 'C:\\Windows\\SysWOW64\\'
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
          passing_score: 75,
          total_questions: 3,
          token_bounty: 100,
          questions: [
            {
              id: 'q_2_1',
              text: 'In the MITRE ATT&CK framework, what is the key difference between a "Tactic" and a "Technique"?',
              type: 'single_choice',
              points: 34,
              options: [
                { id: 'opt_17', text: 'A Tactic is the adversary\'s tactical goal (WHY), while a Technique is how they achieve it (HOW)', is_correct: true },
                { id: 'opt_18', text: 'Tactics are for hardware, Techniques are for software', is_correct: false },
                { id: 'opt_19', text: 'Tactics are defensive measures, while Techniques are offensive', is_correct: false },
                { id: 'opt_20', text: 'There is no difference; they are interchangeable', is_correct: false }
              ],
              explanation: 'Tactics represent the adversary\'s technical objective (e.g. Persistence), while Techniques explain the exact method (e.g. Registry Run Keys).'
            },
            {
              id: 'q_2_2',
              text: 'If Microsoft Word (winword.exe) spawns powershell.exe with an encoded base64 argument, what does this strongly indicate?',
              type: 'single_choice',
              points: 33,
              options: [
                { id: 'opt_21', text: 'Normal Microsoft Office automatic template updates', is_correct: false },
                { id: 'opt_22', text: 'A malicious macro execution or document exploit initiating a payload stage', is_correct: true },
                { id: 'opt_23', text: 'Windows Defender scanning the document', is_correct: false },
                { id: 'opt_24', text: 'Network latency during cloud document synchronization', is_correct: false }
              ],
              explanation: 'Office binaries spawning script engines like PowerShell or cmd.exe are classic indicators of weaponized macro documents.'
            },
            {
              id: 'q_2_3',
              text: 'Which command line tool is commonly misused by attackers to clear Windows Event Logs (Technique T1070.001)?',
              type: 'single_choice',
              points: 33,
              options: [
                { id: 'opt_25', text: 'wevtutil cl <logname>', is_correct: true },
                { id: 'opt_26', text: 'ipconfig /flushdns', is_correct: false },
                { id: 'opt_27', text: 'netstat -ano', is_correct: false },
                { id: 'opt_28', text: 'tasklist /v', is_correct: false }
              ],
              explanation: 'wevtutil.exe with the "cl" parameter (clear-log) purges Windows event records to conceal attacker activity.'
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
          passing_score: 75,
          total_questions: 3,
          token_bounty: 100,
          questions: [
            {
              id: 'q_3_1',
              text: 'According to RFC 3227 Order of Volatility, which data source should be acquired FIRST during a forensic investigation?',
              type: 'single_choice',
              points: 34,
              options: [
                { id: 'opt_29', text: 'Physical Hard Disk Drive', is_correct: false },
                { id: 'opt_30', text: 'System RAM / Volatile Memory', is_correct: true },
                { id: 'opt_31', text: 'Tape Backups', is_correct: false },
                { id: 'opt_32', text: 'Archived Syslog Files', is_correct: false }
              ],
              explanation: 'System memory (RAM) is lost immediately upon system shutdown and must always be acquired before static disk storage.'
            },
            {
              id: 'q_3_2',
              text: 'Why do forensic examiners compute SHA-256 hashes of disk and memory images immediately upon acquisition?',
              type: 'single_choice',
              points: 33,
              options: [
                { id: 'opt_33', text: 'To prove that the evidence has remained pristine and unchanged throughout the investigation', is_correct: true },
                { id: 'opt_34', text: 'To encrypt the evidence with a password', is_correct: false },
                { id: 'opt_35', text: 'To compress the image file size for storage', is_correct: false },
                { id: 'opt_36', text: 'To upload it automatically to antivirus databases', is_correct: false }
              ],
              explanation: 'Cryptographic hashes provide mathematical verification that digital evidence was not altered after acquisition.'
            },
            {
              id: 'q_3_3',
              text: 'What is the primary advantage of EDR software-based network isolation over pulling the physical power cord?',
              type: 'single_choice',
              points: 33,
              options: [
                { id: 'opt_37', text: 'It maintains secure telemetry and remote live forensic capability while blocking lateral spread', is_correct: true },
                { id: 'opt_38', text: 'It speeds up Windows boot time', is_correct: false },
                { id: 'opt_39', text: 'It saves electric power in the data center', is_correct: false },
                { id: 'opt_40', text: 'It prevents hardware overheating', is_correct: false }
              ],
              explanation: 'EDR isolation severs malicious traffic while preserving the defender\'s management tunnel for live remediation.'
            }
          ]
        }
      }
    ],
    final_assessment: {
      id: 'exam_soc_cert',
      title: 'RedKross Certified SOC Analyst (RCSA) — Final Comprehensive Examination',
      passing_score: 80, // PRD strict 80% passing threshold
      duration_minutes: 45,
      total_questions: 10,
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
          text: 'An analyst detects PowerShell executing with the flag "-EncodedCommand" followed by a long base64 string. What is the analyst\'s first decoding and analysis step?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_1', text: 'Decode the UTF-16LE base64 string to inspect the plaintext script logic without executing it', is_correct: true },
            { id: 'f_opt_2', text: 'Run the command on their local SOC workstation to see what happens', is_correct: false },
            { id: 'f_opt_3', text: 'Delete the PowerShell executable from the infected machine', is_correct: false },
            { id: 'f_opt_4', text: 'Ignore it because PowerShell is a legitimate administrative tool', is_correct: false }
          ],
          explanation: 'PowerShell -EncodedCommand expects UTF-16LE encoded strings. Defenders decode this safely to extract the adversary\'s payload parameters.'
        },
        {
          id: 'fe_2',
          text: 'Which Windows Security Event ID signifies the installation of a new Windows Service (Persistence T1543.003)?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_5', text: 'Event ID 7045 (System log) / Event ID 4697 (Security log)', is_correct: true },
            { id: 'f_opt_6', text: 'Event ID 1102 (The audit log was cleared)', is_correct: false },
            { id: 'f_opt_7', text: 'Event ID 4624 (Logon success)', is_correct: false },
            { id: 'f_opt_8', text: 'Event ID 4720 (User account created)', is_correct: false }
          ],
          explanation: 'Event ID 7045 / 4697 logs whenever a new service is installed, frequently used by adversaries for persistent SYSTEM execution.'
        },
        {
          id: 'fe_3',
          text: 'What is the primary indicator of a "Pass-the-Hash" attack in Windows authentication logs?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_9', text: 'Logon Type 3 with NTLM authentication using high-privilege domain administrator credentials between internal workstations', is_correct: true },
            { id: 'f_opt_10', text: 'A user entering their password incorrectly 3 times', is_correct: false },
            { id: 'f_opt_11', text: 'A computer rebooting without warning', is_correct: false },
            { id: 'f_opt_12', text: 'A network cable being unplugged', is_correct: false }
          ],
          explanation: 'Pass-the-Hash relies on NTLM network authentication (Logon Type 3) using stolen hashes without knowing the cleartext password.'
        },
        {
          id: 'fe_4',
          text: 'What does the term "Living off the Land" (LotL) refer to in defensive cybersecurity?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_13', text: 'Using legitimate, pre-installed operating system binaries (LOLBins) to carry out malicious actions', is_correct: true },
            { id: 'f_opt_14', text: 'Operating data centers using renewable solar energy', is_correct: false },
            { id: 'f_opt_15', text: 'Conducting physical penetration tests against agricultural facilities', is_correct: false },
            { id: 'f_opt_16', text: 'Recompiling open-source kernels from source code', is_correct: false }
          ],
          explanation: 'LOLBins (e.g. certutil, bitsadmin, msiexec) allow attackers to execute commands and download tools while evading simple signature-based detection.'
        },
        {
          id: 'fe_5',
          text: 'Which defensive metric calculates the duration between an attacker\'s initial compromise and when the SOC identifies the intrusion?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_17', text: 'MTTD (Mean Time to Detect) / Dwell Time', is_correct: true },
            { id: 'f_opt_18', text: 'MTTR (Mean Time to Repair)', is_correct: false },
            { id: 'f_opt_19', text: 'RTO (Recovery Time Objective)', is_correct: false },
            { id: 'f_opt_20', text: 'SLA (Service Level Agreement)', is_correct: false }
          ],
          explanation: 'Dwell Time / MTTD is the critical measure of how long an adversary remains undetected within an organization.'
        },
        {
          id: 'fe_6',
          text: 'When investigating suspected credential dumping from LSASS memory, which Sysmon Event ID tracks abnormal access to lsass.exe?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_21', text: 'Sysmon Event ID 10 (ProcessAccess)', is_correct: true },
            { id: 'f_opt_22', text: 'Sysmon Event ID 1 (ProcessCreate)', is_correct: false },
            { id: 'f_opt_23', text: 'Sysmon Event ID 7 (ImageLoaded)', is_correct: false },
            { id: 'f_opt_24', text: 'Sysmon Event ID 13 (RegistryEvent)', is_correct: false }
          ],
          explanation: 'Sysmon Event ID 10 alerts when an unprivileged or suspicious process opens a handle to lsass.exe with PROCESS_VM_READ access rights.'
        },
        {
          id: 'fe_7',
          text: 'What is the role of an Indicator of Compromise (IOC) in threat hunting?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_25', text: 'Forensic artifacts (such as file hashes, malicious IPs, or domain names) that provide evidence of security intrusions', is_correct: true },
            { id: 'f_opt_26', text: 'A marketing metric for SOC revenue generation', is_correct: false },
            { id: 'f_opt_27', text: 'A hardware standard for network router cables', is_correct: false },
            { id: 'f_opt_28', text: 'A software license key for SIEM deployment', is_correct: false }
          ],
          explanation: 'IOCs are forensic signatures used to search logs and telemetry across enterprise fleets for confirmed adversarial presence.'
        },
        {
          id: 'fe_8',
          text: 'In the NIST SP 800-61 Incident Handling Lifecycle, what phase immediately follows "Containment, Eradication & Recovery"?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_29', text: 'Post-Incident Activity / Lessons Learned', is_correct: true },
            { id: 'f_opt_30', text: 'Preparation', is_correct: false },
            { id: 'f_opt_31', text: 'Detection and Analysis', is_correct: false },
            { id: 'f_opt_32', text: 'Legal Prosecution', is_correct: false }
          ],
          explanation: 'Post-Incident Activity (Lessons Learned) analyzes what happened, why it happened, and how to improve defenses to prevent recurrence.'
        },
        {
          id: 'fe_9',
          text: 'Why must a SOC maintain an out-of-band communication channel (e.g. signal or separate phone bridge) during active ransomware incidents?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_33', text: 'Because internal corporate email and messaging systems may be compromised and monitored by the threat actor', is_correct: true },
            { id: 'f_opt_34', text: 'To save on long-distance phone charges', is_correct: false },
            { id: 'f_opt_35', text: 'Because corporate firewalls always block voice calls automatically', is_correct: false },
            { id: 'f_opt_36', text: 'Because cloud tools do not work during weekends', is_correct: false }
          ],
          explanation: 'Adversaries who achieve domain dominance often read internal incident emails to anticipate defender containment steps.'
        },
        {
          id: 'fe_10',
          text: 'What is the purpose of the "Traffic Light Protocol" (TLP) in threat intelligence sharing?',
          type: 'single_choice',
          points: 10,
          options: [
            { id: 'f_opt_37', text: 'To facilitate and control the sharing of sensitive information by specifying who can view and distribute the data (TLP:RED, AMBER, GREEN, CLEAR)', is_correct: true },
            { id: 'f_opt_38', text: 'To adjust the speed of network routers during peak traffic hours', is_correct: false },
            { id: 'f_opt_39', text: 'To indicate which analysts are available for shift changes', is_correct: false },
            { id: 'f_opt_40', text: 'To benchmark internet connection bandwidth', is_correct: false }
          ],
          explanation: 'TLP labels (RED, AMBER+STRICT, AMBER, GREEN, CLEAR) inform recipients how widely threat intelligence can be disseminated.'
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
