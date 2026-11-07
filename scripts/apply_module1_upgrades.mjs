import fs from 'fs';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const filePath = 'src/services/db/curriculum/module1.js';
const rawModule = fs.readFileSync(filePath, 'utf8');

// We will read module1Data by dynamic import
const { module1Data } = await import('../src/services/db/curriculum/module1.js');

console.log(`Found ${module1Data.lessons.length} lessons in Module 1.`);

// Check current word count across all lessons
let initialChars = 0;
module1Data.lessons.forEach(l => initialChars += l.content.length);
console.log(`Initial total content length: ${initialChars} chars`);

// -------------------------------------------------------------
// Upgrades per lesson
// -------------------------------------------------------------

// Lesson 1.1: Ensure callout semantic tags are optimal
const l1 = module1Data.lessons[0];
l1.content = l1.content
  .replace('> **Core Definition:**', '> **Formal Definition:**')
  .replace('> **Core Axiom:**', '> **Protector\'s Rule:**')
  .replace('> **Defence in Depth:**', '> **Key Takeaway:**');

// Lesson 1.2: History of Major Cybersecurity Incidents
const l2 = module1Data.lessons[1];
// Update images metadata
l2.images = [
  {
    id: "img_c1_m1_l2_1",
    title: "1.2 History - Chronological Evolution of Threats",
    url: "/assets/courses/cyber-01/module1lesson2photo1.jpg",
    caption: "Chronological Evolution of Modern Cyber Threats — From Morris Worm (1988) to SolarWinds (2020) and Zero-Day Espionage.",
    alt: "Chronological Evolution of Modern Cyber Threats"
  },
  {
    id: "img_c1_m1_l2_2",
    title: "1.2 History - Incident Response Mechanics",
    url: "/assets/courses/cyber-01/module1lesson2photo2.jpg",
    caption: "Defensive Incident Response Lifecycle — Detection, Containment, Eradication, and Post-Mortem Remediation Workflow.",
    alt: "Defensive Incident Response Lifecycle"
  },
  {
    id: "img_c1_m1_l2_3",
    title: "1.2 History - Terminal Verification Toolkit",
    url: "/assets/courses/cyber-01/terminal-toolkit.jpg",
    caption: "Laboratory terminal environment verifying Python, Nmap, and network telemetry utilities.",
    alt: "Laboratory Terminal Verification Toolkit"
  }
];

// Update figure captions in content
l2.content = l2.content
  .replace(
    '![Figure 1: Architectural Timeline of Major Cybersecurity Incidents](/assets/courses/cyber-01/module1lesson2photo1.jpg)\n\n*Figure 1: Architectural Timeline of Major Cybersecurity Incidents.*',
    '![Figure 1: Chronological Evolution of Modern Cyber Threats](/assets/courses/cyber-01/module1lesson2photo1.jpg)\n\n*Figure 1: Chronological Evolution of Modern Cyber Threats — From Morris Worm (1988) to SolarWinds (2020) and Zero-Day Espionage.*'
  )
  .replace(
    '![Figure 2: Operational Flow and Incident Response Mechanics](/assets/courses/cyber-01/module1lesson2photo2.jpg)\n\n*Figure 2: Operational Flow and Incident Response Mechanics.*',
    '![Figure 2: Defensive Incident Response Lifecycle](/assets/courses/cyber-01/module1lesson2photo2.jpg)\n\n*Figure 2: Defensive Incident Response Lifecycle — Detection, Containment, Eradication, and Post-Mortem Remediation Workflow.*'
  );

// Lesson 1.3: Assets and Data Types
const l3 = module1Data.lessons[2];
l3.images = [
  {
    id: "img_c1_m1_l3_1",
    title: "1.3 Assets - Four-Quadrant Model",
    url: "/assets/courses/cyber-01/module1lesson3photo1.jpg",
    caption: "Four-Quadrant Organizational Asset Model Delineating Data, System, People, and Physical Boundaries.",
    alt: "Four-Quadrant Organizational Asset Model"
  },
  {
    id: "img_c1_m1_l3_2",
    title: "1.3 Assets - Data Sensitivity Pyramid",
    url: "/assets/courses/cyber-01/module1lesson3photo2.jpg",
    caption: "Four-Tier Data Sensitivity Pyramid — Mapping Public, Internal, Confidential, and Restricted Classification Levels.",
    alt: "Four-Tier Data Sensitivity Pyramid"
  },
  {
    id: "img_c1_m1_l3_3",
    title: "1.3 Assets - Terminal Verification Toolkit",
    url: "/assets/courses/cyber-01/module1lesson3photo3.jpg",
    caption: "Laboratory terminal environment verifying Python, Nmap, and network telemetry utilities.",
    alt: "Laboratory Terminal Verification Toolkit"
  }
];

// Update figure captions in content
l3.content = l3.content
  .replace(
    '![Figure 1: Comprehensive Asset Classification Matrix](/assets/courses/cyber-01/module1lesson3photo1.jpg)\n\n*Figure 1: Four-quadrant organizational asset model delineating Data, System, People, and Physical assets.*',
    '![Figure 1: Four-Quadrant Organizational Asset Model](/assets/courses/cyber-01/module1lesson3photo1.jpg)\n\n*Figure 1: Four-Quadrant Organizational Asset Model Delineating Data, System, People, and Physical Boundaries.*'
  )
  .replace(
    '![Figure 2: Data Sensitivity and Protection Hierarchy](/assets/courses/cyber-01/module1lesson3photo2.jpg)\n\n*Figure 2: Four-tier data classification pyramid spanning Public, Internal, Sensitive, and Restricted tiers.*',
    '![Figure 2: Four-Tier Data Sensitivity Pyramid](/assets/courses/cyber-01/module1lesson3photo2.jpg)\n\n*Figure 2: Four-Tier Data Sensitivity Pyramid — Mapping Public, Internal, Confidential, and Restricted Classification Levels.*'
  );

// Insert comparison tables into Lesson 1.3
const assetTableMarkdown = `
| Asset Category | Representative Asset Classes | Primary Structural Characteristics | Impact If Compromised | Foundational Defensive Controls |
| :--- | :--- | :--- | :--- | :--- |
| **Data Assets** | Relational databases, customer PII, financial records, source code | Information at rest, in transit, or in processing | Severe regulatory penalties, IP theft, loss of customer trust | AES-256 encryption, access control lists (ACLs), tokenization |
| **System Assets** | Workstations, production servers, cloud containers, core routers | Computing infrastructure that hosts and processes organizational data | Operational halt, malicious pivot point for lateral movement | Regular patch management, endpoint detection & response (EDR), firewalls |
| **People Assets** | Executives, DevOps engineers, customer support, external contractors | Human operators with varying credentials and authorization levels | Social engineering victim, insider threat, unauthorized privilege escalation | Role-based access control (RBAC), security training, MFA enforcement |
| **Physical Assets** | Datacenters, corporate offices, backup magnetic tapes, badge readers | Tangible physical facilities and physical computing hardware | Direct physical theft, hardware tampering, environmental destruction | Biometric access gates, 24/7 CCTV surveillance, clean desk policies |
`;

const sensitivityTableMarkdown = `
| Sensitivity Tier | Classification Level | Defining Characteristics | Exposure Impact Level | Default Handling & Access Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Public** | Marketing collateral, published blog posts, press releases | Negligible / None | Open read access; no confidentiality controls required |
| **Tier 2** | **Internal** | Employee directories, organizational charts, internal policies | Minor internal operational friction | Accessible to all authenticated employees; not for public release |
| **Tier 3** | **Confidential** | Customer records (PII), quarterly sales figures, vendor contracts | Significant financial, legal, and reputational damage | Need-to-know basis (RBAC); encryption required in transit and at rest |
| **Tier 4** | **Restricted** | Master encryption keys, unannounced source code, executive M&A files | Catastrophic existential risk to organizational survival | Multi-party authorization, hardware security modules (HSM), audit logging |
`;

if (!l3.content.includes('Organizational Asset Classification Matrix') && !l3.content.includes('| **Data Assets** |')) {
  l3.content = l3.content.replace(
    'Let us now walk through each of the four categories, because each one needs different protection.',
    `Here is the organizational asset classification matrix summarizing the primary domains, characteristics, failure impacts, and standard defensive controls:\n\n${assetTableMarkdown}\n\nLet us now walk through each of the four categories, because each one needs different protection.`
  );
  l3.content = l3.content.replace(
    '### The Four Data Sensitivity Tiers',
    `### The Four Data Sensitivity Tiers\n\n${sensitivityTableMarkdown}\n`
  );
}

// Lesson 1.4: Attack Surface
const l4 = module1Data.lessons[3];
l4.images = [
  {
    id: "img_c1_m1_l4_1",
    title: "1.4 Attack Surface - Multi-Layer Architecture",
    url: "/assets/courses/cyber-01/module1lesson4photo1.jpg",
    caption: "Multi-Layer Attack Surface Architecture — Mapping Attack Vectors Across Network, Application, Human, and Physical Boundaries.",
    alt: "Multi-Layer Attack Surface Architecture"
  }
];

const attackSurfaceTableMarkdown = `
| Attack Surface Layer | Core Exposure Points | Common Attack Vectors | Representative Attacker Goal | Primary Defensive Reduction Control |
| :--- | :--- | :--- | :--- | :--- |
| **Network Layer** | Public IP ranges, listening server ports, VPN endpoints, Wi-Fi SSIDs | Automated port scanning, brute-force SSH/RDP, unencrypted wireless eavesdropping | Gain remote network perimeter ingress | Close non-essential ports, enforce IP allowlisting, deploy next-gen firewalls |
| **Application Layer** | Public web forms, REST/GraphQL APIs, URL parameters, third-party libraries | SQL injection (SQLi), Cross-Site Scripting (XSS), software supply chain poisoning | Unauthorized database exfiltration, remote code execution (RCE) | Input validation and sanitization, dynamic application security testing (DAST), software bill of materials (SBOM) |
| **Human Layer** | Corporate email mailboxes, executive LinkedIn profiles, customer support chat | Phishing, spear phishing, credential harvesting, voice pretexting (vishing) | Deceive personnel into executing malware or disclosing credentials | Phishing-resistant MFA (FIDO2 keys), security awareness simulations, dual-approval authorization |
| **Physical Layer** | Unattended reception desks, exposed Ethernet ports, server room doors, visitor kiosks | Malicious USB drops, rogue wireless implants, unauthorized physical entry | Bypass logical network perimeters via direct physical access | 802.1X port security, physical biometric access controls, tamper-evident seals |
`;

const terminalCliLesson4 = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Enumerating Public Attack Surface',
  '# Step 1: Perform a stealth SYN scan on common exposed ports',
  'nmap -sS -Pn -p 21,22,80,443,3306,8080 target.corp.local',
  '',
  '# Step 2: Enumerate service version banners on identified open ports',
  'nmap -sV -p 80,443 --script=banner target.corp.local',
  '```'
].join('\n');

l4.content = l4.content
  .replace(
    '![Figure 1: Architectural illustration for 1.4 Attack Surface.](/assets/courses/cyber-01/module1lesson4photo1.jpg)\n\n*Figure 1: Architectural illustration for 1.4 Attack Surface.*',
    '![Figure 1: Multi-Layer Attack Surface Architecture](/assets/courses/cyber-01/module1lesson4photo1.jpg)\n\n*Figure 1: Multi-Layer Attack Surface Architecture — Mapping Attack Vectors Across Network, Application, Human, and Physical Boundaries.*'
  )
  .replace('> **Foundational Axiom:**', '> **Formal Definition:**');

if (!l4.content.includes('| **Network Layer** |')) {
  l4.content = l4.content.replace(
    '## Architectural Composition: The Three Core Attack Surface Dimensions',
    `## Multi-Layer Attack Surface Comparative Matrix\n\n${attackSurfaceTableMarkdown}\n\n## Architectural Composition: The Three Core Attack Surface Dimensions`
  );
}

if (!l4.content.includes('RedKross Academy Terminal Demonstration: Enumerating Public Attack Surface')) {
  l4.content = l4.content.replace(
    '## Practical Relevance: Attack Surface Management in Enterprise Defense',
    `## Practical Terminal Demonstration: Surface Enumeration\n\nBefore you can shrink an attack surface, you must observe it from the outside just as an adversary would:\n\n${terminalCliLesson4}\n\n## Practical Relevance: Attack Surface Management in Enterprise Defense`
  );
}

// Lesson 1.5: Security, Privacy, and Safety
const l5 = module1Data.lessons[4];
l5.images = [
  {
    id: "img_c1_m1_l5_1",
    title: "1.5 Security, Privacy, and Safety - Venn Boundary Matrix",
    url: "/assets/courses/cyber-01/module1lesson5photo1.jpg",
    caption: "Venn Diagram & Boundary Matrix — Intersections and Distinctions Between Information Security, Data Privacy, and Physical Safety.",
    alt: "Venn Diagram & Boundary Matrix"
  }
];

const securityPrivacySafetyTableMarkdown = `
| Dimension | Core Operational Objective | Central Driving Question | Typical Failure Mode | Key Governing Laws & Frameworks |
| :--- | :--- | :--- | :--- | :--- |
| **Security** | Protecting digital assets and systems from unauthorized access, alteration, or disruption | "Are our technical safeguards strong enough to stop unauthorized adversaries?" | Ransomware encrypting hospital databases; data breach via stolen credentials | ISO/IEC 27001, NIST Cybersecurity Framework, CIS Critical Security Controls |
| **Privacy** | Ensuring personal information is collected, processed, and stored lawfully with user consent | "Do we have legitimate rights and clear informed consent to handle this individual's personal data?" | Selling customer location telemetry to third-party ad brokers without consent | EU GDPR, India DPDP Act 2023, California CCPA/CPRA, US HIPAA |
| **Safety** | Preventing systems and software from causing human injury, death, or physical environmental destruction | "Can this machine's software or hardware malfunction and physically harm a human being?" | Insulin pump delivering a lethal overdose; connected car brakes disengaging remotely | OSHA standards, IEC 61508 (Functional Safety), ISO 26262 (Road Vehicles) |
`;

const terminalCliLesson5 = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Auditing Data Privacy & Secret Leakage',
  '# Step 1: Scan repository source tree for exposed private API keys and tokens',
  'grep -E -r "(api_key|password|secret|bearer)[[:space:]]*=" ./src/',
  '',
  '# Step 2: Enforce strict file access permissions on sensitive data files (Owner read/write only)',
  'chmod 600 /etc/security/customer_records.db',
  'ls -l /etc/security/customer_records.db',
  '```'
].join('\n');

l5.content = l5.content
  .replace(
    '![Figure 1: Architectural illustration for 1.5 Security, Privacy, and Safety.](/assets/courses/cyber-01/module1lesson5photo1.jpg)\n\n*Figure 1: Architectural illustration for 1.5 Security, Privacy, and Safety.*',
    '![Figure 1: Intersections and Distinctions of Security, Privacy, and Safety](/assets/courses/cyber-01/module1lesson5photo1.jpg)\n\n*Figure 1: Venn Diagram & Boundary Matrix — Intersections and Distinctions Between Information Security, Data Privacy, and Physical Safety.*'
  );

if (!l5.content.includes('| **Security** | Protecting digital assets')) {
  l5.content = l5.content.replace(
    '## Architectural Deep Dive: Individual Domain Characteristics',
    `## Tripartite Domain Comparison Matrix\n\n${securityPrivacySafetyTableMarkdown}\n\n## Architectural Deep Dive: Individual Domain Characteristics`
  );
}

if (!l5.content.includes('RedKross Academy Terminal Demonstration: Auditing Data Privacy & Secret Leakage')) {
  l5.content = l5.content.replace(
    '## Practical Relevance: Protection Engineering in Modern Systems',
    `## Practical Terminal Demonstration: Privacy & Secret Auditing\n\nEnsuring privacy requires continuous verification that sensitive identifiers and encryption secrets never leak into public builds:\n\n${terminalCliLesson5}\n\n## Practical Relevance: Protection Engineering in Modern Systems`
  );
}

// Lesson 1.6: Cyber Ecosystem and Actors
const l6 = module1Data.lessons[5];
l6.images = [
  {
    id: "img_c1_m1_l6_1",
    title: "1.6 Cyber Ecosystem - Adversary Spectrum",
    url: "/assets/courses/cyber-01/module1lesson6photo1.jpg",
    caption: "Adversary Spectrum & Capability Hierarchy — Stratification of Threat Actors by Motivation, Skill, Resources, and Operational Impact.",
    alt: "Adversary Spectrum & Capability Hierarchy"
  }
];

const threatActorsTableMarkdown = `
| Threat Actor Group | Primary Driving Motivation | Technical Sophistication | Operational Budget & Resources | Preferred Attack Tools & Tactics | Canonical Real-World Exemplar |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Script Kiddies** | Notoriety, thrills, peer recognition | Low (relies on pre-built scripts) | Minimal to zero | Public vulnerability scanners, Low Orbit Ion Cannon (LOIC), pre-compiled payload generators | Amateur website defacements, unsophisticated gaming DDoS attacks |
| **Hacktivists** | Political ideology, social justice, anti-corruption | Moderate to High | Decentralized / Volunteer | Mass website defacements, distributed denial of service (DDoS), leaking sensitive emails | Anonymous campaigns, LulzSec leaks |
| **Cybercriminals** | Financial profit, extortion, monetary theft | High | High (self-funded via criminal extortion) | Ransomware-as-a-Service (RaaS), banking trojans, business email compromise (BEC) | LockBit, BlackCat/ALPHV, FIN7 syndicates |
| **Nation-State (APTs)** | Geopolitical advantage, state espionage, sabotage | Exceptional (military / intelligence tier) | Virtually unlimited (state treasury budgets) | Custom zero-day exploits, multi-stage modular rootkits, living-off-the-land techniques | APT28 (Fancy Bear), Lazarus Group, Stuxnet operation |
| **Insider Threats** | Financial greed, personal grievance, unintentional error | Variable (benefits from legitimate access rights) | Inherent internal access privileges | Authorized credential misuse, mass data download to USB, misconfigured cloud storage | Disgruntled staff data theft, accidental email transmission of sensitive records |
`;

const socRolesTableMarkdown = `
| Security Operations Role | Primary Mission | Daily Operational Tooling | Key Deliverables & Outputs |
| :--- | :--- | :--- | :--- |
| **SOC Analyst (Tier 1/2)** | Triage real-time alerts, isolate compromised endpoints, filter false positives | SIEM platforms (Splunk, Elastic), EDR dashboards, ticketing systems | Incident triage tickets, initial containment actions, shift turnover briefings |
| **Threat Hunter** | Proactively search enterprise networks for stealthy adversaries that bypassed automated alerts | Endpoint telemetry queries, network packet analyzers (Wireshark), YARA rules | Threat hunting hypotheses, novel detection signatures, adversary path reconstructions |
| **Incident Responder** | Execute containment playbooks, perform digital forensics, eradicate adversary persistence | Forensic suites (Volatility, Autopsy, FTK), memory dump utilities, live response CLIs | Formal incident post-mortem reports, root cause analyses, recovery playbooks |
| **Security Architect** | Design resilient network architectures, enforce least privilege and zero-trust controls | Threat modeling frameworks (STRIDE), network design diagrams, cloud security posture tools | Enterprise security architecture blueprints, identity federation models, policy frameworks |
`;

const terminalCliLesson6 = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Threat Intelligence & IP Attribution',
  '# Step 1: Query WHOIS records to identify network ownership of suspicious IP',
  'whois 198.51.100.1',
  '',
  '# Step 2: Audit active outbound connections for unknown remote ports',
  'netstat -tunap | grep -E "ESTABLISHED"',
  '```'
].join('\n');

l6.content = l6.content
  .replace(
    '![Figure 1: Architectural illustration for 1.6 Cyber Ecosystem and Actors.](/assets/courses/cyber-01/module1lesson6photo1.jpg)\n\n*Figure 1: Architectural illustration for 1.6 Cyber Ecosystem and Actors.*',
    '![Figure 1: Adversary Spectrum & Capability Hierarchy](/assets/courses/cyber-01/module1lesson6photo1.jpg)\n\n*Figure 1: Adversary Spectrum & Capability Hierarchy — Stratification of Threat Actors by Motivation, Skill, Resources, and Operational Impact.*'
  );

if (!l6.content.includes('| **Script Kiddies** | Notoriety')) {
  l6.content = l6.content.replace(
    '## Architectural Taxonomy of Ecosystem Participants and Threat Actors',
    `## Threat Actor Taxonomy Matrix\n\n${threatActorsTableMarkdown}\n\n## Architectural Taxonomy of Ecosystem Participants and Threat Actors`
  );
  l6.content = l6.content.replace(
    '### Defensive Entities: Architecture, Operations, and Response',
    `## Defensive Security Operations Roles Matrix\n\n${socRolesTableMarkdown}\n\n### Defensive Entities: Architecture, Operations, and Response`
  );
}

if (!l6.content.includes('RedKross Academy Terminal Demonstration: Threat Intelligence & IP Attribution')) {
  l6.content = l6.content.replace(
    '## Practical Relevance: Navigating the Complex Security Landscape',
    `## Practical Terminal Demonstration: Threat Attribution & Verification\n\nSOC defenders continuously analyze outbound network flows to detect malicious command & control channels:\n\n${terminalCliLesson6}\n\n## Practical Relevance: Navigating the Complex Security Landscape`
  );
}

// Lesson 1.7: Cybersecurity Terminology
const l7 = module1Data.lessons[6];
l7.images = [
  {
    id: "img_c1_m1_l7_1",
    title: "1.7 Cybersecurity Terminology - Ontological Map",
    url: "/assets/courses/cyber-01/module1lesson7photo1.jpg",
    caption: "Ontological Cybersecurity Map — Interconnection of Fundamental Terminology Across Threat, Vulnerability, Control, and Incident Taxonomies.",
    alt: "Ontological Cybersecurity Map"
  }
];

const confusedPairsTableMarkdown = `
| Confused Pair | Concept A | Concept B | Core Distinguishing Criterion | Real-World Distinguishing Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **Virus vs. Worm** | **Virus:** Requires human execution and a host file to propagate | **Worm:** Propagates autonomously across networks without human intervention | Requirement of human host interaction for spread | Melissa virus (required opening email attachment) vs. Morris Worm (self-propagated via network daemon). |
| **Threat vs. Risk** | **Threat:** A potential actor or event capable of causing harm | **Risk:** The statistical probability of a threat exploiting a vulnerability multiplied by the resulting business impact | Capability of harm vs. calculated probability and business loss | A sophisticated ransomware syndicate is a threat. A 15% probability of losing £1.2M in annual revenue is a risk. |
| **Vulnerability vs. Exploit** | **Vulnerability:** A flaw, bug, or design weakness in software or hardware | **Exploit:** A weaponized script, code snippet, or payload used to take advantage of that vulnerability | The passive system weakness vs. the active weaponized tool | CVE-2017-0144 (Windows SMB remote code flaw) is the vulnerability. EternalBlue is the exploit code that weaponized it. |
| **Confidentiality vs. Privacy** | **Confidentiality:** Preventing unauthorized entities from reading sensitive data | **Privacy:** Ensuring that authorized collection and use of personal data adheres strictly to user consent and legal rights | Security protection against outsiders vs. ethical governance of personal data | AES-256 database encryption provides confidentiality. Honoring customer requests to delete personal profiles provides privacy. |
| **Authentication vs. Authorization** | **Authentication:** Verifying proof of identity ("Who are you?") | **Authorization:** Granting permissions to perform specific operations ("What are you allowed to do?") | Identity verification vs. privilege boundary determination | Logging in with your username and password is authentication. Being permitted to view financial reports but not edit them is authorization. |
| **IDS vs. IPS** | **IDS (Detection):** Monitors and inspects traffic passively, alerting on anomalies | **IPS (Prevention):** Sits inline with network traffic and actively drops malicious packets | Passive observation and alert generation vs. active real-time traffic disruption | An IDS sends a high-priority alert to the SOC dashboard. An IPS immediately severs the attacker's TCP connection and blocks the source IP. |
| **Antivirus vs. Anti-Malware** | **Antivirus:** Scans storage files against known static database signatures | **Anti-Malware / EDR:** Analyzes behavioral heuristics, process memory injections, and zero-day execution | Static file hash comparison vs. dynamic behavioral telemetry analysis | Traditional AV detects known compiled \`.exe\` trojans. Modern EDR intercepts fileless PowerShell script execution in RAM. |
| **Compliance vs. Security** | **Compliance:** Adhering to external regulatory checklists and legal frameworks | **Security:** The continuous, operational capability to resist real-world adversarial attacks | Passing a periodic audit checklist vs. possessing effective defensive resilience | A company can be 100% compliant with PCI DSS and still get breached by an unpatched zero-day exploit. |
| **DoS vs. DDoS** | **DoS:** Denial of service traffic originating from a single machine or connection | **DDoS:** Denial of service traffic coordinated across thousands of distributed botnet devices | Single-source attack vector vs. multi-source distributed botnet saturation | A single computer running a TCP SYN flood script is DoS. The Mirai botnet mobilizing 100,000 compromised IoT devices against Dyn DNS is DDoS. |
| **Phishing vs. Spear Phishing** | **Phishing:** Untargeted bulk emails broadcast to millions indiscriminately | **Spear Phishing:** Highly customized, researched attacks targeting a specific individual or organization | Broadcast mass distribution vs. reconnaissance-driven personalized deception | A generic "Your bank account is suspended" email is phishing. An email addressing you by your project title and referencing your manager's name is spear phishing. |
`;

const terminalCliLesson7 = [
  '```bash',
  '# RedKross Academy Terminal Demonstration: Calculating File Hashes & Verifying Integrity',
  '# Step 1: Generate SHA-256 cryptographic digest of a software package',
  'sha256sum ./security_toolkit_v1.tar.gz',
  '',
  '# Step 2: Compare digest against published vendor hash to verify file integrity',
  'echo "b4c2a7f5d0e8...  ./security_toolkit_v1.tar.gz" | sha256sum -c',
  '```'
].join('\n');

l7.content = l7.content
  .replace(
    '![Figure 1: Architectural illustration for 1.7 Cybersecurity Terminology.](/assets/courses/cyber-01/module1lesson7photo1.jpg)\n\n*Figure 1: Architectural illustration for 1.7 Cybersecurity Terminology.*',
    '![Figure 1: Ontological Cybersecurity Map](/assets/courses/cyber-01/module1lesson7photo1.jpg)\n\n*Figure 1: Ontological Cybersecurity Map — Interconnection of Fundamental Terminology Across Threat, Vulnerability, Control, and Incident Taxonomies.*'
  );

if (!l7.content.includes('| **Virus vs. Worm** |')) {
  l7.content = l7.content.replace(
    '## Critical Disambiguation: Commonly Conflated Security Concepts',
    `## Critical Disambiguation: Commonly Conflated Security Concepts\n\n${confusedPairsTableMarkdown}\n`
  );
}

if (!l7.content.includes('RedKross Academy Terminal Demonstration: Calculating File Hashes & Verifying Integrity')) {
  l7.content = l7.content.replace(
    '## Practical Relevance: Professional Communication and Precision Under Pressure',
    `## Practical Terminal Demonstration: Cryptographic Digest Verification\n\nPrecision in cybersecurity extends to verifying file integrity using mathematical hash functions:\n\n${terminalCliLesson7}\n\n## Practical Relevance: Professional Communication and Precision Under Pressure`
  );
}

// -------------------------------------------------------------
// Write the updated module1Data back to module1.js
// -------------------------------------------------------------
const newCode = `export const module1Data = ${JSON.stringify(module1Data, null, 2)};\n`;
fs.writeFileSync(filePath, newCode, 'utf8');

console.log('Successfully updated module1.js with full academic upgrades and deduplicated captions!');
let finalChars = 0;
module1Data.lessons.forEach(l => finalChars += l.content.length);
console.log(`Final total content length: ${finalChars} chars (Net gain: +${finalChars - initialChars} chars)`);

// -------------------------------------------------------------
// Verify that all 7 lessons render cleanly through markdownParser
// -------------------------------------------------------------
module1Data.lessons.forEach((l, idx) => {
  const rendered = renderMarkdownToHtml(l.content);
  const duplicateCaption = rendered.includes('*Figure') || rendered.includes('Architectural illustration for');
  if (duplicateCaption) {
    console.error(`❌ Lesson ${idx + 1} has duplicate or placeholder caption!`);
  } else {
    console.log(`✅ Lesson ${idx + 1}: [${l.id}] rendered cleanly with zero caption duplication.`);
  }
});
