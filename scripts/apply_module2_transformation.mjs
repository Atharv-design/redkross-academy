import fs from 'fs';
import { module2Data } from '../src/services/db/curriculum/module2.js';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const filePath = 'src/services/db/curriculum/module2.js';
console.log('=== EXECUTING COMPLETE MODULE 2 ACADEMIC TRANSFORMATION ===\n');

const initialLength = module2Data.lessons.reduce((acc, l) => acc + l.content.length, 0);
console.log(`Initial total Module 2 content length: ${initialLength} chars`);

// -------------------------------------------------------------------------
// Helper: Clean and safely insert callout at line boundary
// -------------------------------------------------------------------------
function insertCallout(content, anchor, calloutText) {
  const clean = calloutText.trim();
  // If already properly placed on its own line, skip
  if (content.includes(`\n${clean}\n`)) return content;

  // Remove any previously inserted version that might be inline or duplicate
  const firstWords = clean.split(' ').slice(0, 4).join(' ');
  const escaped = firstWords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cleaner = new RegExp(`(?:\\n\\n)?>\\s*\\*\\*[^\\n]*${escaped}[^\\n]*\\n*`, 'gi');
  let sanitized = content.replace(cleaner, '');

  if (sanitized.includes(anchor)) {
    return sanitized.replace(anchor, `\n\n${clean}\n\n${anchor}`);
  }
  console.warn(`Anchor not found: "${anchor.substring(0, 40)}..."`);
  return sanitized;
}

// -------------------------------------------------------------------------
// 1. LESSON 2.1: The CIA Triad Deep Dive
// -------------------------------------------------------------------------
const l1 = module2Data.lessons[0];
l1.title = "2.1 The CIA Triad Deep Dive";
l1.images = [
  {
    id: "img_c1_m2_l1_1",
    title: "2.1 The CIA Triad Framework",
    url: "/assets/courses/cyber-01/module2lesson1photo1.jpg",
    caption: "The CIA Triad Architectural Framework — Overlapping Vectors Balancing Confidentiality, Integrity, and Availability.",
    alt: "The CIA Triad Architectural Framework"
  },
  {
    id: "img_c1_m2_l1_2",
    title: "2.1 Cyber Kill Chain Framework",
    url: "/assets/courses/cyber-01/module2lesson1photo2.jpg",
    caption: "The Six Sequential Links of the Lockheed Martin Cyber Kill Chain and Parallel Defensive Interception.",
    alt: "The Six Sequential Links of the Cyber Kill Chain"
  }
];

// Prune duplicate occurrence of Figure 2 at bottom if present
l1.content = l1.content.replace(
  /\n+!\[Figure 2:[^\]]+\]\(\/assets\/courses\/cyber-01\/module2lesson1photo2\.jpg\)\s*\n+\*Figure 2:[^*]+\*/g,
  (match, offset) => (offset > 1000 ? '' : match)
);

const l1Table = `Table 1: The CIA Triad Trade-Off & Priority Matrix
| Triad Dimension | Core Technical Objective | Common Adversarial Attack | Primary Defensive Countermeasure | Sectoral Priority Weighting |
| :--- | :--- | :--- | :--- | :--- |
| **Confidentiality** | Restrict data access strictly to authorized individuals and entities | Credential harvesting, eavesdropping, database exfiltration | AES-256 encryption, multi-factor authentication (MFA), strict RBAC | Defense, intelligence, luxury retail, legal services |
| **Integrity** | Guarantee data accuracy, completeness, and protection against unauthorized alteration | Man-in-the-Middle (MitM), SQL injection data poisoning, unauthorized firmware tampering | Cryptographic hashing (SHA-256), digital signatures, blockchain ledgers, file integrity monitoring (FIM) | Healthcare (patient records), banking, pharmaceutical manufacturing |
| **Availability** | Ensure critical systems, networks, and services remain accessible to authorized users when needed | Distributed Denial of Service (DDoS), ransomware encryption, physical infrastructure sabotage | High-availability server clusters, CDN traffic scrubbing, automated failover, immutable offsite backups | E-commerce, stock exchanges, emergency dispatch (911/112), utility power grids |`;

const l1Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Integrity & Availability Diagnostics',
  '# Step 1: Compute authoritative SHA-256 hash to verify data integrity',
  'sha256sum ./production_config.json',
  '',
  '# Step 2: Probe service availability and measure HTTP response latency',
  'curl -I -s -o /dev/null -w "HTTP Status: %{http_code} | Total Time: %{time_total}s\\n" https://api.corp.local/healthz',
  '```'
].join('\n');

// Replace tab-separated table in L1
l1.content = l1.content.replace(
  /Goal\tOne-line definition\tThe question it answers\tWhat it protects\tExample of failure\tKey methods[\s\S]*?Availability\tKeep it running\.[^\n]*/,
  l1Table
);

// Insert CLI block in L1
if (!l1.content.includes('RedKross Academy Terminal Demonstration: Integrity & Availability Diagnostics')) {
  l1.content = l1.content.replace(
    '## Laboratory Exercise: Personal and Enterprise Triad Threat Modeling',
    `## Practical Terminal Demonstration: Integrity & Availability Diagnostics\n\nSecurity engineers routinely verify cryptographic file integrity digests and probe service availability endpoints directly from the command line:\n\n${l1Cli}\n\n## Laboratory Exercise: Personal and Enterprise Triad Threat Modeling`
  );
}

// Callouts in L1
l1.content = insertCallout(
  l1.content,
  'The CIA triad is not a theory. It is a filter.',
  '> **Formal Definition:** The CIA Triad is the foundational information security model balancing Confidentiality (secrecy), Integrity (trustworthiness), and Availability (accessibility) across all organizational systems.'
);
l1.content = insertCallout(
  l1.content,
  'Second, the word SECURITY sits in the middle',
  '> **Key Takeaway:** Security is not an off-the-shelf product; it is an active engineering balance between conflicting operational requirements.'
);

// -------------------------------------------------------------------------
// 2. LESSON 2.2: AAA Framework and Non-Repudiation (Corrected Title)
// -------------------------------------------------------------------------
const l2 = module2Data.lessons[1];
l2.title = "2.2 AAA Framework and Non-Repudiation";
l2.images = [
  {
    id: "img_c1_m2_l2_1",
    title: "2.2 The Triple-A Operational Flow",
    url: "/assets/courses/cyber-01/module2lesson2photo1.jpg",
    caption: "The Triple-A Operational Flow — Authentication, Authorization, and Accounting Architecture with Non-Repudiation Logging.",
    alt: "The Triple-A Operational Flow"
  },
  {
    id: "img_c1_m2_l2_2",
    title: "2.2 Kill Chain in Identity Management",
    url: "/assets/courses/cyber-01/module2lesson2photo2.jpg",
    caption: "The Cyber Kill Chain Framework in Identity and Access Management — Defensive Chokepoints Across the Access Pipeline.",
    alt: "Kill Chain in Identity Management"
  }
];

// Prune duplicate occurrence of Figure 2 at bottom in L2
l2.content = l2.content.replace(
  /\n+!\[Figure 2:[^\]]+\]\(\/assets\/courses\/cyber-01\/module2lesson2photo2\.jpg\)\s*\n+\*Figure 2:[^*]+\*/g,
  (match, offset) => (offset > 1000 ? '' : match)
);

const l2Table = `Table 1: The AAA Architecture & Non-Repudiation Matrix
| Security Pillar | Core Operational Question | Technical Verification Mechanism | Common Failure / Attack Vector | Standard Enterprise Protocol |
| :--- | :--- | :--- | :--- | :--- |
| **Identification** | "Who claims to be accessing the system?" | Username, email address, smart card UID, employee badge number | Account enumeration, social engineering | LDAP, Active Directory, SAML 2.0 |
| **Authentication** | "Can you prove that you are who you claim to be?" | Knowledge (passwords), Possession (hardware tokens/FIDO2), Inherence (biometrics) | Credential stuffing, brute-force attacks, SIM swapping | OIDC, Kerberos, RADIUS, FIDO2 / WebAuthn |
| **Authorization** | "What actions, files, and services are you permitted to access?" | Access Control Lists (ACLs), Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC) | Privilege escalation, broken object-level authorization (BOLA) | OAuth 2.0 Bearer tokens, XACML, AWS IAM Policies |
| **Accounting** | "What actions did you perform, and when did you perform them?" | Centralized event logging, session monitoring, telemetry aggregation | Log tampering, unmonitored shadow access, audit log overflow | Syslog, SIEM (Splunk, Elastic), Windows Event Forwarding |
| **Non-Repudiation** | "Can you deny having executed this specific transaction or action?" | Asymmetric digital signatures, cryptographically timestamped audit receipts, immutable write-once logs | Compromised private signing keys, unsigned transaction logs | Public Key Infrastructure (PKI), HMACs, WORM storage |`;

const l2Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Auditing AAA Logs & User Privileges',
  '# Step 1: Inspect authentication attempts and identify failed SSH logins',
  'grep "Failed password" /var/log/auth.log | tail -n 5',
  '',
  '# Step 2: Enumerate authorized administrative commands for current session',
  'sudo -l',
  '```'
].join('\n');

// Replace tab-separated table in L2
l2.content = l2.content.replace(
  /Concept\tThe question it answers\tWhat it does\tExample of failure\tKey method[\s\S]*?Non-Repudiation\tCan we prove it\?[^\n]*/,
  l2Table
);

// Insert CLI block in L2
if (!l2.content.includes('RedKross Academy Terminal Demonstration: Auditing AAA Logs & User Privileges')) {
  l2.content = l2.content.replace(
    '## Laboratory Exercise: Auditing Privileged Access and Telemetry',
    `## Practical Terminal Demonstration: Auditing Authentication & Privileges\n\nAuditing login telemetry and enumerating user privileges forms the daily routine of SOC identity analysts:\n\n${l2Cli}\n\n## Laboratory Exercise: Auditing Privileged Access and Telemetry`
  );
}

// Callouts in L2
l2.content = insertCallout(
  l2.content,
  'Three letters describe the first three steps: AAA.',
  '> **Formal Definition:** AAA (Authentication, Authorization, and Accounting) is the foundational identity and access governance framework establishing who a user is, what actions they are permitted to perform, and an undeniable audit trail of their activity.'
);
l2.content = insertCallout(
  l2.content,
  'This lesson is about that plumbing.',
  '> **Warning:** Without robust accounting and non-repudiation logging, an attacker or rogue insider can tamper with system records without leaving forensic traces, completely blinding incident response teams.'
);

// -------------------------------------------------------------------------
// 3. LESSON 2.3: Principle of Least Privilege (PoLP)
// -------------------------------------------------------------------------
const l3 = module2Data.lessons[2];
l3.title = "2.3 Principle of Least Privilege (PoLP)";
l3.images = [
  {
    id: "img_c1_m2_l3_1",
    title: "2.3 Least Privilege vs. Excessive Privilege",
    url: "/assets/courses/cyber-01/module2lesson3photo1.jpg",
    caption: "Least Privilege vs. Excessive Privilege — Blast Radius Containment and Role-Based Access Boundaries.",
    alt: "Least Privilege vs. Excessive Privilege"
  }
];

const l3Table1 = `Table 1: Least Privilege Enforcement vs. Excessive Privilege Exposure
| Operational Domain | Excessive Privilege (Anti-Pattern) | Least Privilege Best Practice | Blast Radius Reduction Impact |
| :--- | :--- | :--- | :--- |
| **Endpoint Workstations** | All employees operate as local machine Administrators | Users operate as standard unprivileged users; elevation requires temporary PAM approval | Ransomware cannot alter system binaries or install kernel rootkits |
| **Service Accounts** | Web application connects to database using the \`root\` / \`sa\` account | Application uses dedicated account granted strictly \`SELECT\` and \`INSERT\` on specific tables | SQL injection cannot drop database tables or execute OS shell commands |
| **Cloud Infrastructure** | Developers assigned blanket \`AdministratorAccess\` on cloud tenancy | Fine-grained IAM roles bound to specific resource ARNs with temporary session tokens | Compromised developer laptop cannot destroy production cloud storage or spin up crypto miners |
| **Network Administration** | Network engineers permanently retain domain admin credentials | Just-in-Time (JIT) access granted for specific maintenance windows with automatic revocation | Prevents credential theft through passive lateral movement |`;

const l3Table2 = `Table 2: Comparative Access Control Models: DAC vs. RBAC vs. ABAC vs. MAC
| Access Control Model | Decision Authority | Policy Granularity | Administrative Overhead | Primary Industry Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **DAC (Discretionary)** | Data owner determines permissions | File-by-file basis | High (decentralized, prone to permission creep) | Personal workstations, peer-to-peer file sharing |
| **RBAC (Role-Based)** | Central administrator assigns roles | Mapped to job functions | Moderate (structured, scalable) | Corporate enterprise IT, healthcare clinics, educational portals |
| **ABAC (Attribute-Based)** | Dynamic policy evaluation engine | Contextual (User, Resource, Environment, Time) | Complex setup, low ongoing maintenance | Cloud environments (AWS/Azure IAM), modern zero-trust microservices |
| **MAC (Mandatory)** | Central system security policy / OS kernel | Multi-level security labels (Top Secret, Secret, Unclassified) | Very High (rigid mathematical formal models) | Military, intelligence agencies, compartmentalized government networks |`;

const l3Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Least Privilege File Permissions & Process Sandboxing',
  '# Step 1: Enforce strict file permissions (Owner read/write only, zero group/other access)',
  'chmod 700 /var/secrets/api_token.key',
  'ls -l /var/secrets/api_token.key',
  '',
  '# Step 2: Execute service process using a dedicated low-privilege daemon user',
  'sudo -u nobody /usr/local/bin/telemetry_worker --dry-run',
  '```'
].join('\n');

// Insert tables in L3 before Risk Realization
if (!l3.content.includes('Table 1: Least Privilege Enforcement vs. Excessive Privilege Exposure')) {
  l3.content = l3.content.replace(
    '## Risk Realization: Incident Analysis of Excessive Privilege',
    `## Comparative Matrix: Least Privilege Enforcement\n\n${l3Table1}\n\n## Comparative Matrix: Access Control Models\n\n${l3Table2}\n\n## Risk Realization: Incident Analysis of Excessive Privilege`
  );
}

// Insert CLI block in L3
if (!l3.content.includes('RedKross Academy Terminal Demonstration: Least Privilege File Permissions')) {
  l3.content = l3.content.replace(
    '## Laboratory Exercise: Auditing and Restricting User Rights',
    `## Practical Terminal Demonstration: Enforcing Least Privilege\n\nHardening file permissions and running services under unprivileged service users:\n\n${l3Cli}\n\n## Laboratory Exercise: Auditing and Restricting User Rights`
  );
}

// Callouts in L3
l3.content = insertCallout(
  l3.content,
  'Least privilege is the principle of giving every person',
  '> **Formal Definition:** The Principle of Least Privilege (PoLP) dictates that any subject (user, process, or system) must be granted strictly the minimal privileges essential to execute its authorized function, for only the required duration.'
);
l3.content = insertCallout(
  l3.content,
  'It is the simplest principle in cybersecurity',
  '> **Warning:** Granting pervasive administrative or root privileges to ease onboarding creates massive blast radiuses where a single compromised endpoint compromises the entire enterprise.'
);

// -------------------------------------------------------------------------
// 4. LESSON 2.4: Defense in Depth Architecture (Corrected Title)
// -------------------------------------------------------------------------
const l4 = module2Data.lessons[3];
l4.title = "2.4 Defense in Depth Architecture";
l4.images = [
  {
    id: "img_c1_m2_l4_1",
    title: "2.4 Multi-Layered Defense in Depth",
    url: "/assets/courses/cyber-01/module2lesson4photo1.jpg",
    caption: "Multi-Layered Defense in Depth Topology — Concentric Security Rings from Perimeter and Network to Endpoint, Application, and Data.",
    alt: "Multi-Layered Defense in Depth Topology"
  }
];

const l4Table = `Table 1: Concentric Rings of Defense in Depth Architecture
| Defense in Depth Ring | Primary Threat Vector Intercepted | Core Preventive Safeguard | Primary Detective & Telemetry Tooling |
| :--- | :--- | :--- | :--- |
| **1. Physical Security** | Facility trespass, unauthorized console access, hardware theft | Biometric locks, 24/7 CCTV surveillance, clean desk policies | Access badge logs, thermal motion sensors, guard logs |
| **2. Perimeter Security** | External port scanning, DDoS attacks, unauthorized perimeter ingress | Next-Gen Firewalls (NGFW), Web Application Firewalls (WAF), DDoS mitigation | Perimeter NetFlow collectors, firewall drop alerts |
| **3. Network Security** | Lateral movement, unencrypted packet sniffing, ARP spoofing | Internal VLAN segmentation, microsegmentation, 802.1X NAC | Network Intrusion Detection (Suricata/Snort), Zeek telemetry |
| **4. Endpoint Security** | Malware execution, malicious macros, living-off-the-land binaries | Endpoint Detection & Response (EDR), application allowlisting, OS hardening | Sysmon telemetry, process behavior analytics, memory inspection |
| **5. Application Security** | Code injection (SQLi, XSS), broken authentication, API abuse | Input validation, parameter binding, dependency vulnerability scanning | Dynamic Application Security Testing (DAST), WAF inspection |
| **6. Data Security** | Data exfiltration, unauthorized database dumping, laptop theft | AES-256 encryption at rest/in transit, Data Loss Prevention (DLP) | Database Activity Monitoring (DAM), DLP egress alerts |`;

const l4Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Inspecting Defense in Depth Controls',
  '# Step 1: Verify local host firewall status and default drop rules',
  'sudo ufw status verbose',
  '',
  '# Step 2: Audit open listening sockets to confirm internal service isolation',
  'ss -tulpn | grep LISTEN',
  '```'
].join('\n');

// Insert table in L4
if (!l4.content.includes('Table 1: Concentric Rings of Defense in Depth Architecture')) {
  l4.content = l4.content.replace(
    '## Core Engineering Properties: Redundancy, Diversity, and Independence',
    `## Comparative Matrix: Concentric Defensive Layers\n\n${l4Table}\n\n## Core Engineering Properties: Redundancy, Diversity, and Independence`
  );
}

// Insert CLI block in L4
if (!l4.content.includes('RedKross Academy Terminal Demonstration: Inspecting Defense in Depth Controls')) {
  l4.content = l4.content.replace(
    '## Laboratory Exercise: Mapping Concentric Enterprise Controls',
    `## Practical Terminal Demonstration: Verifying Multi-Layer Defenses\n\nDefenders audit host firewalls and listening network ports to confirm multi-layer containment:\n\n${l4Cli}\n\n## Laboratory Exercise: Mapping Concentric Enterprise Controls`
  );
}

// Callouts in L4
l4.content = insertCallout(
  l4.content,
  'Defence in depth is the opposite of that.',
  '> **Formal Definition:** Defense in Depth is an architectural defensive strategy employing tiered, independent layers of technical, administrative, and physical controls so that the failure of any single barrier does not result in compromise.'
);
l4.content = insertCallout(
  l4.content,
  'This lesson is about building that castle.',
  '> **Key Takeaway:** A firewall without internal segmentation and endpoint monitoring is simply an eggshell: hard on the outside, completely soft and defenseless on the inside.'
);

// -------------------------------------------------------------------------
// 5. LESSON 2.5: Zero Trust Architecture (ZTA) (Corrected Title)
// -------------------------------------------------------------------------
const l5 = module2Data.lessons[4];
l5.title = "2.5 Zero Trust Architecture (ZTA)";
l5.images = [
  {
    id: "img_c1_m2_l5_1",
    title: "2.5 Zero Trust vs Traditional Perimeter",
    url: "/assets/courses/cyber-01/module2lesson5photo1.jpg",
    caption: "Architectural Paradigm Shift — Traditional Perimeter Castle Model vs. Zero Trust Microsegmentation (\"Never Trust, Always Verify\").",
    alt: "Zero Trust Architecture Paradigm Shift"
  }
];

const l5Table = `Table 1: Traditional Perimeter Security vs. Zero Trust Architecture (ZTA)
| Architectural Dimension | Traditional Castle-and-Moat Model | Zero Trust Architecture (NIST SP 800-207) | Adversarial Impact |
| :--- | :--- | :--- | :--- |
| **Trust Assumption** | Internal network users and endpoints are trusted by default | Zero implicit trust; all entities verified continuously regardless of location | Eliminates adversary free-roaming after initial perimeter breach |
| **Network Topology** | Flat internal network protected by external perimeter firewall | Microsegmented workload perimeters; software-defined perimeters (SDP) | Lateral movement is mathematically constrained to isolated micro-segments |
| **Authentication Timing** | One-time authentication at session login (VPN or domain login) | Continuous real-time authentication and authorization on every transaction | Stolen session cookies or dormant compromised credentials expire rapidly |
| **Access Decision Basis** | Static network location (IP subnet, physical Ethernet connection) | Dynamic multi-context evaluation (Device health, user risk score, location, behavior) | Compromised credentials from unmanaged device are blocked immediately |
| **Traffic Encryption** | Internal east-west network traffic is frequently unencrypted | End-to-end Mutual TLS (mTLS) enforced across all internal microservices | Network eavesdropping and packet sniffing yield zero usable data |`;

const l5Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Zero Trust mTLS & Certificate Verification',
  '# Step 1: Probe a microservice endpoint to verify Mutual TLS requirement',
  'openssl s_client -connect api.internal.corp:8443 -brief',
  '',
  '# Step 2: Verify TLS certificate validity, expiration, and issuer fingerprint',
  'openssl x509 -in /etc/ssl/certs/service_cert.pem -noout -subject -dates -fingerprint',
  '```'
].join('\n');

// Replace tab-separated table in L5
l5.content = l5.content.replace(
  /Pillar\tWhat it verifies\tThe old model\tZero trust[\s\S]*?Data\tWhat the data is[^\n]*/,
  l5Table
);

// Insert CLI block in L5
if (!l5.content.includes('RedKross Academy Terminal Demonstration: Zero Trust mTLS')) {
  l5.content = l5.content.replace(
    '## Laboratory Exercise: Designing Continuous Contextual Verification Rules',
    `## Practical Terminal Demonstration: Zero Trust Cryptographic Verification\n\nZero trust architecture demands mutual authentication and strict certificate validation between services:\n\n${l5Cli}\n\n## Laboratory Exercise: Designing Continuous Contextual Verification Rules`
  );
}

// Callouts in L5
l5.content = insertCallout(
  l5.content,
  'Imagine a company where nobody is trusted by default.',
  '> **Formal Definition:** Zero Trust Architecture (ZTA) replaces implicit perimeter trust with continuous, context-aware verification based on the core axiom: "Never Trust, Always Verify."'
);
l5.content = insertCallout(
  l5.content,
  'Then the breaches came. Target. SolarWinds.',
  '> **Warning:** Relying on internal network location as a guarantee of trust ensures that once an adversary breaches a single perimeter entry point, lateral movement across the internal network is completely uninhibited.'
);

// -------------------------------------------------------------------------
// 6. LESSON 2.6: Fail-Safe Defaults & Complete Mediation
// -------------------------------------------------------------------------
const l6 = module2Data.lessons[5];
l6.title = "2.6 Fail-Safe Defaults & Complete Mediation";
l6.images = [
  {
    id: "img_c1_m2_l6_1",
    title: "2.6 Secure vs Insecure Defaults",
    url: "/assets/courses/cyber-01/module2lesson6photo1.jpg",
    caption: "Secure vs. Insecure Defaults — Default-Deny Access Mediation vs. Permissive System Exposure.",
    alt: "Secure vs. Insecure Defaults"
  }
];

const l6Table = `Table 1: Fail-Safe Defaults vs. Permissive Configurations Matrix
| System Component | Insecure Permissive Default (Anti-Pattern) | Fail-Safe Secure Default (Best Practice) | Failure State Consequence |
| :--- | :--- | :--- | :--- |
| **Network Firewall** | Default Policy: \`ACCEPT\` (Traffic allowed unless explicitly blocked) | Default Policy: \`DROP\` (Traffic rejected unless explicitly allowlisted) | If a rule parser crashes, traffic is blocked rather than exposing internal servers |
| **New User Provisioning** | New accounts inherit broad baseline permissions across shared folders | New accounts start with zero access rights; permissions granted per request | Accidental employee onboarding errors do not expose confidential financial data |
| **API Endpoint Router** | Unknown routes return full stack traces and verbose error messages | Unknown routes return generic \`404 Not Found\` or \`400 Bad Request\` | Attackers cannot fingerprint backend database drivers or framework versions |
| **File Creation Mask** | Default \`umask 000\` (Files created world-readable and world-writable) | Default \`umask 027\` (Files created readable only by owner and authorized group) | Prevents local unprivileged users from reading newly created configuration secrets |`;

const l6Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Enforcing Fail-Safe Default-Deny Policies',
  '# Step 1: Check system file creation mask (umask) and enforce restrictive default',
  'umask 027',
  'touch test_file.txt && ls -l test_file.txt && rm test_file.txt',
  '',
  '# Step 2: Enforce default-drop firewall policy for incoming network traffic',
  'sudo iptables -P INPUT DROP',
  'sudo iptables -P FORWARD DROP',
  'sudo iptables -L -n -v | head -n 5',
  '```'
].join('\n');

// Replace tab-separated table in L6
l6.content = l6.content.replace(
  /Area\tSecure default\tInsecure default[\s\S]*?Remote access\tDisabled by default\.[^\n]*/,
  l6Table
);

// Insert CLI block in L6
if (!l6.content.includes('RedKross Academy Terminal Demonstration: Enforcing Fail-Safe Default-Deny Policies')) {
  l6.content = l6.content.replace(
    '## Laboratory Exercise: Auditing System Defaults and Network Listeners',
    `## Practical Terminal Demonstration: Enforcing Default-Deny Controls\n\nDefenders configure system umasks and firewall policies to fail closed by default:\n\n${l6Cli}\n\n## Laboratory Exercise: Auditing System Defaults and Network Listeners`
  );
}

// Callouts in L6
l6.content = insertCallout(
  l6.content,
  'Secure defaults is the principle that the safe choice should be the default choice.',
  '> **Formal Definition:** The Principle of Fail-Safe Defaults mandates that system access and configuration states default to closed or denied, ensuring that errors or unconfigured parameters fail securely rather than permissively.'
);
l6.content = insertCallout(
  l6.content,
  'That laptop is not secure. It is a security risk',
  '> **Warning:** Systems designed to fail open or pre-configured with generic vendor credentials (e.g., admin/admin) account for the overwhelming majority of mass botnet exploitations in Internet history.'
);

// -------------------------------------------------------------------------
// 7. LESSON 2.7: Separation of Duties & Dual Control (Corrected Title)
// -------------------------------------------------------------------------
const l7 = module2Data.lessons[6];
l7.title = "2.7 Separation of Duties & Dual Control";
l7.images = [
  {
    id: "img_c1_m2_l7_1",
    title: "2.7 Institutional Checks and Balances",
    url: "/assets/courses/cyber-01/module2lesson7photo1.jpg",
    caption: "Institutional Checks and Balances — Multi-Party Custody and Multi-Signature Transaction Flow to Prevent Unilateral Fraud.",
    alt: "Institutional Checks and Balances"
  }
];

const l7Table = `Table 1: Separation of Duties & Dual Custody Implementation Matrix
| High-Risk Operational Workflow | Single-Point Vulnerability (Risk) | Separated Distinct Roles | Fraud & Error Prevention Mechanism |
| :--- | :--- | :--- | :--- |
| **Financial Wire Disbursal** | Rogue employee initiates and authorizes £250,000 corporate payment to personal account | Role A: Accounts Payable Clerk (Initiator)<br/>Role B: Finance Director (Approver) | Requires two distinct cryptographic signatures on banking portal before funds transfer |
| **Production Code Deployment** | Malicious developer pushes backdoor directly into live banking production application | Role A: Software Engineer (Author)<br/>Role B: Senior QA / Security Engineer (Reviewer) | Protected Git branches enforce mandatory pull request approval by non-authors |
| **Master Cryptographic Key Generation** | Administrator retains master private key and can decrypt all customer backups | Role A: Security Officer A (Holds Key Component 1)<br/>Role B: Security Officer B (Holds Key Component 2) | Shamir's Secret Sharing: Key reconstructed only when both key custodians enter passes |
| **Database Audit Log Archival** | Database administrator deletes transaction logs to cover tracks of unauthorized query | Role A: Database Administrator (Manages database)<br/>Role B: Independent SOC Auditor (Maintains log pipeline) | Write-Once-Read-Many (WORM) storage prevents DBAs from modifying external syslog |`;

const l7Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Multi-Party Dual Control in Source Control',
  '# Step 1: Inspect cryptographic GPG signature on release commit',
  'git log --show-signature -1',
  '',
  '# Step 2: Verify git commit signature against public key ring',
  'git verify-commit HEAD',
  '```'
].join('\n');

// Insert table in L7
if (!l7.content.includes('Table 1: Separation of Duties & Dual Custody Implementation Matrix')) {
  l7.content = l7.content.replace(
    '## Single-Point Collusion Attacks vs. Distributed Administrative Verification',
    `## Comparative Matrix: Separation of Duties Across Critical Operations\n\n${l7Table}\n\n## Single-Point Collusion Attacks vs. Distributed Administrative Verification`
  );
}

// Insert CLI block in L7
if (!l7.content.includes('RedKross Academy Terminal Demonstration: Multi-Party Dual Control in Source Control')) {
  l7.content = l7.content.replace(
    '## Laboratory Exercise: Deconstructing and Segregating Administrative Workflows',
    `## Practical Terminal Demonstration: Cryptographic Multi-Party Dual Control\n\nVerifying developer signatures and multi-custody commits via GPG and git verification:\n\n${l7Cli}\n\n## Laboratory Exercise: Deconstructing and Segregating Administrative Workflows`
  );
}

// Callouts in L7
l7.content = insertCallout(
  l7.content,
  'Separation of duties is the principle that breaks that loop.',
  '> **Formal Definition:** Separation of Duties (SoD) is an organizational governance and technical safeguard requiring that critical, high-risk operational steps be partitioned among distinct individuals to prevent single-handed fraud and unchecked errors.'
);
l7.content = insertCallout(
  l7.content,
  'This lesson is about dividing work so that no single person can both cause a problem and hide it.',
  '> **Key Takeaway:** Concentrating unchecked authority in a single employee or administrator is not efficiency; it is an architectural flaw that invites extortion, error, and unilateral compromise.'
);

// -------------------------------------------------------------------------
// 8. LESSON 2.8: Applied Case Analyses of Core Principles (Corrected Title)
// -------------------------------------------------------------------------
const l8 = module2Data.lessons[7];
l8.title = "2.8 Applied Case Analyses of Core Principles";
l8.images = [
  {
    id: "img_c1_m2_l8_1",
    title: "2.8 Unified Security Principles Radar",
    url: "/assets/courses/cyber-01/module2lesson8photo1.jpg",
    caption: "Unified Security Principles Radar — Interdependent Foundation of Core Principles in Enterprise Cyber Defense.",
    alt: "Unified Security Principles Radar"
  }
];

const l8Table = `Table 1: Forensic Principle Failure Matrix in Landmark Breaches
| Landmark Incident | Primary Security Principle Violated | Specific Architectural Failure Point | Resulting Adversarial Exploitation | Corrective Defensive Redesign |
| :--- | :--- | :--- | :--- | :--- |
| **Target Corporation (2013)** | Least Privilege & Network Segmentation (Defense in Depth) | Third-party HVAC vendor credentials allowed direct pivot into Point-of-Sale (POS) network | Attackers exfiltrated 40M payment cards through unsegmented billing subnet | Isolate external vendor portals into restricted zero-trust DMZs with microsegmentation |
| **Morris Worm (1988)** | Fail-Safe Defaults & Input Validation (Complete Mediation) | \`fingerd\` daemon listening on open port with unbounded memory buffer | Self-propagating buffer overflow crashed 10% of the early ARPANET | Enforce memory-safe compilation, default-deny listening ports, strict buffer limits |
| **SolarWinds (2020)** | Separation of Duties & Software Pipeline Integrity | Build pipeline lacked independent dual-custody verification of compiled DLL artifacts | Nation-state actors injected Sunburst backdoor into trusted Orion updates | Multi-party build signing, hermetic build environments, reproducible builds |
| **Stuxnet (2010)** | Complete Mediation & Air-Gap Defense in Depth | Industrial centrifuges trusted unsigned Programmable Logic Controller (PLC) code updates | Malware manipulated uranium centrifuges while spoofing normal telemetry to operators | Cryptographic PLC code signing, hardware-enforced unidirectional data diodes |`;

const l8Cli = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Incident Forensic Correlation',
  '# Step 1: Extract security incidents and authorization anomalies from system logs',
  'journalctl -u ssh.service --since "1 hour ago" --no-pager | grep -E "(Failed|Accepted)"',
  '',
  '# Step 2: Correlate active process hierarchy to detect unexpected parent-child spawns',
  'ps -eo pid,ppid,user,args --forest | head -n 20',
  '```'
].join('\n');

// Replace tab-separated table in L8
l8.content = l8.content.replace(
  /Principle\tWhat it protects\tCase that violated it\tThe control that would have stopped it[\s\S]*?Separation of Duties\tNo single person[^\n]*/,
  l8Table
);

// Insert CLI block in L8
if (!l8.content.includes('RedKross Academy Terminal Demonstration: Incident Forensic Correlation')) {
  l8.content = l8.content.replace(
    '## Laboratory Exercise: Forensic Principle Auditing of Past Vulnerabilities',
    `## Practical Terminal Demonstration: Incident Forensic Correlation\n\nReconstructing security incidents requires correlating authorization logs and process trees from the command line:\n\n${l8Cli}\n\n## Laboratory Exercise: Forensic Principle Auditing of Past Vulnerabilities`
  );
}

// Callouts in L8
l8.content = insertCallout(
  l8.content,
  'This lesson is where the seven principles stop being a list',
  '> **Formal Definition:** Forensic Principle Analysis is the systematic investigation of security failures to identify which fundamental architectural tenets were violated and determine the precise controls required to eliminate the root cause.'
);
l8.content = insertCallout(
  l8.content,
  'If you can answer those three questions for each case',
  '> **Protector\'s Rule:** Attack technologies, malware variants, and software frameworks will evolve continuously; however, every incident remains an exploitation of seven immutable architectural principles.'
);

// -------------------------------------------------------------------------
// Write back to module2.js
// -------------------------------------------------------------------------
const newCode = `export const module2Data = ${JSON.stringify(module2Data, null, 2)};\n`;
fs.writeFileSync(filePath, newCode, 'utf8');

const finalLength = module2Data.lessons.reduce((acc, l) => acc + l.content.length, 0);
console.log(`Successfully written Module 2 transformations! Final length: ${finalLength} chars (Net gain: +${finalLength - initialLength} chars)`);

// -------------------------------------------------------------------------
// Verification pass
// -------------------------------------------------------------------------
console.log('\n--- VERIFICATION PASS FOR ALL 8 LESSONS ---');
let violationsFound = false;

module2Data.lessons.forEach((l, idx) => {
  const html = renderMarkdownToHtml(l.content);
  
  // Real leaked URLs check (must not be part of ![alt](url) or [text](url))
  const lines = l.content.split('\n');
  const leakedUrls = lines.filter(line => line.includes('/assets/courses/') && !line.includes('![') && !line.includes('['));
  
  const unparsedCaption = html.includes('*Figure') || l.content.includes('Architectural illustration for');
  const tableCount = (html.match(/ACADEMIC REFERENCE/g) || []).length;
  const dlCount = (html.match(/<dl class=/g) || []).length;
  const calloutCount = (html.match(/<blockquote/g) || []).length;
  const codeCount = (html.match(/<pre class=/g) || []).length;

  console.log(`Lesson ${idx + 1}: [${l.id}] "${l.title}"`);
  console.log(`  - Tables: ${tableCount}, Description Lists: ${dlCount}, Callouts: ${calloutCount}, Code blocks: ${codeCount}`);

  if (leakedUrls.length > 0) {
    console.error(`  ❌ VIOLATION: Leaked raw URL in L${idx + 1}:`, leakedUrls);
    violationsFound = true;
  }
  if (unparsedCaption) {
    console.error(`  ❌ VIOLATION: Unparsed figure caption in L${idx + 1}`);
    violationsFound = true;
  }
  if (tableCount === 0) {
    console.error(`  ❌ VIOLATION: Expected comparison table in L${idx + 1}`);
    violationsFound = true;
  }
  if (calloutCount === 0) {
    console.error(`  ❌ VIOLATION: Expected semantic callout in L${idx + 1}`);
    violationsFound = true;
  }
  if (codeCount === 0) {
    console.error(`  ❌ VIOLATION: Expected terminal CLI block in L${idx + 1}`);
    violationsFound = true;
  }
});

if (violationsFound) {
  console.error('\n❌ MODULE 2 TRANSFORMATION HAD VIOLATIONS.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 8 MODULE 2 LESSONS PASSED WITH ZERO VIOLATIONS!');
}
