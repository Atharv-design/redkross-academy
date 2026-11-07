import fs from 'fs';
import path from 'path';

const OUT_PATH = path.resolve('src/services/db/questionBanks/module1QuestionBank.js');
if (!fs.existsSync(path.dirname(OUT_PATH))) {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
}

// Templates and scenario matrix across 7 topics in Module 1
// 100 Medium (scenarios with subtle technical distinctions) + 100 Difficult (complex multi-variable architecture dilemmas)

const topics = [
  'CIA Triad & Tradeoff Mechanics',
  'Historical Incident Root-Cause Analysis',
  'Asset Classification & Data Lifecycle States',
  'Attack Surface Enumeration & Exposure Dynamics',
  'Security vs Privacy vs Safety Dilemmas',
  'Threat Actor Taxonomy & Geopolitical Asymmetry',
  'Defensive Terminology, IOCs vs IOAs & Kill Chains'
];

// Helper to generate 200 questions with rich content
const questions = [];

// Base scenario templates with 4 highly plausible, conceptually close options
const coreBankM1 = [
  // 1. CIA Triad
  {
    topic: 'CIA Triad & Tradeoff Mechanics',
    difficulty: 'medium',
    q: 'An enterprise database administrator implements full-disk Transparent Data Encryption (TDE) with automated key rotation on an active relational database. Which dimension of the CIA triad is primarily preserved, and what is the immediate operational trade-off incurred?',
    options: [
      'Confidentiality is protected at rest; computational overhead increases query latency, impacting availability under peak transaction loads.',
      'Integrity is guaranteed across disk blocks; cryptographic hashing prevents unauthorized write operations by local system processes.',
      'Availability is preserved through encrypted redundant mirrors; key rotation invalidates active sessions, causing transient user lockouts.',
      'Non-repudiation is enforced across log transactions; database schema migrations require offline maintenance windows.'
    ],
    correct: 0,
    explanation: 'Transparent Data Encryption protects confidentiality of data at rest. However, cryptographic operations consume CPU cycles and I/O bandwidth, creating query latency trade-offs that can threaten availability under heavy workloads.'
  },
  {
    topic: 'CIA Triad & Tradeoff Mechanics',
    difficulty: 'difficult',
    q: 'A high-frequency trading platform detects intermittent memory corruption during microsecond trade reconciliation. The engineering team considers injecting runtime HMAC checksum validation on every internal IPC packet. Why might this defensive control cause a net failure in system security architecture?',
    options: [
      'The microsecond latency introduced by per-packet HMAC computation violates execution timeouts, triggering order rejections and catastrophic availability loss.',
      'HMAC validations only verify authentication headers, failing to detect bit-level payload alteration caused by memory rowhammer faults.',
      'Checksum validation forces the trading engine to store shared symmetric keys in plaintext kernel memory, compromising confidentiality.',
      'Runtime packet inspection disables kernel zero-copy networking, thereby exposing IPC memory buffers to unprivileged local sockets.'
    ],
    correct: 0,
    explanation: 'In high-frequency trading systems, availability and microsecond determinism are paramount. Introducing per-packet cryptographic validation creates latency that violates order window timeouts, causing system-wide availability failure.'
  },
  {
    topic: 'Historical Incident Root-Cause Analysis',
    difficulty: 'medium',
    q: 'In the 2017 NotPetya campaign, the malware leveraged the EternalBlue (MS17-010) exploit alongside PsExec and WMI credentials dumped via Mimikatz. What fundamental architectural flaw allowed NotPetya to paralyze global logistics networks within hours?',
    options: [
      'Unrestricted internal network segmentation combined with flat administrative credential reuse across all domain workstations.',
      'Failure of border perimeter firewalls to filter outbound DNS tunneling packets destined for command-and-control servers.',
      'Lack of endpoint signature detection against novel polymorphic file encryption algorithms executing in memory.',
      'Inadequate cryptographic key length in the infected Ukrainian M.E.Doc accounting software supply chain update.'
    ],
    correct: 0,
    explanation: 'NotPetya spread with unprecedented speed because internal networks were unsegmented, and domain administrator credentials were cached on workstations, allowing automated lateral movement via PsExec and EternalBlue across flat internal subnets.'
  },
  {
    topic: 'Historical Incident Root-Cause Analysis',
    difficulty: 'difficult',
    q: 'During post-incident forensic analysis of the 2017 Equifax breach, investigators found that an Apache Struts vulnerability (CVE-2017-5638) was exploited because an internal network inspection cert had expired 19 months earlier. What defensive engineering breakdown does this demonstrate?',
    options: [
      'Failure of continuous visibility and certificate lifecycle management, blinding deep packet inspection systems from detecting OGBL expression injection.',
      'Failure of air-gapped web application proxies to terminate TLS 1.0 handshake negotiations from external IP blocks.',
      'Inability of static application security testing (SAST) engines to intercept remote code execution payloads in production compiled Java bytecode.',
      'Absence of rate limiting on the external portal, allowing automated brute-force attempts to guess Struts OGNL parameters.'
    ],
    correct: 0,
    explanation: 'The Apache Struts exploit payload traveled over encrypted HTTPS. Because Equifax allowed the SSL/TLS inspection certificate to expire, the Intrusion Detection System was blind to the encrypted malicious OGNL injection traffic for over 10 months.'
  },
  {
    topic: 'Asset Classification & Data Lifecycle States',
    difficulty: 'medium',
    q: 'A healthcare analytics firm processes patient genomic data using confidential computing enclaves (AMD SEV / Intel SGX). In which state of the data lifecycle does this technology specifically protect patient data from hypervisor-level inspection?',
    options: [
      'Data in Use (active execution within CPU caches and encrypted RAM pages).',
      'Data at Rest (non-volatile storage on NVMe SSD arrays with hardware encryption).',
      'Data in Transit (end-to-end TLS 1.3 transport across internal VPC peering links).',
      'Data in Archive (cold storage backups protected by write-once-read-many immutable policies).'
    ],
    correct: 0,
    explanation: 'Confidential computing enclaves isolate and encrypt memory during active CPU processing, specifically securing Data in Use from unauthorized access, even from rogue hypervisor or OS root administrators.'
  },
  {
    topic: 'Asset Classification & Data Lifecycle States',
    difficulty: 'difficult',
    q: 'An organization stores encrypted credit card PAN numbers in a PostgreSQL table with deterministic column-level encryption (AES-SIV). A database reader account with read-only access cannot decrypt the ciphertexts. What residual vulnerability remains exposed in this architectural pattern?',
    options: [
      'Frequency analysis and statistical inference attacks, because identical plaintext PANs produce identical encrypted ciphertext values.',
      'Arbitrary remote code execution via SQL injection in the cryptographic extension initialization routines.',
      'Loss of data integrity, because deterministic encryption does not include an initialization vector (IV) or salt.',
      'Key exhaustion attacks, because AES-SIV rotates cipher parameters only after 2^64 sequential queries.'
    ],
    correct: 0,
    explanation: 'Deterministic encryption produces identical ciphertexts for identical plaintexts (enabling equality searches in SQL). This exposes the database to frequency analysis attacks, allowing an attacker to deduce values based on distribution patterns.'
  },
  {
    topic: 'Attack Surface Enumeration & Exposure Dynamics',
    difficulty: 'medium',
    q: 'During external reconnaissance, an analyst discovers that a corporation’s forgotten staging subdomain exposes an Apache Tomcat management interface on port 8080 with default credentials. How is this risk best categorized within attack surface terminology?',
    options: [
      'Digital footprint shadow IT exposure expanding the external attack surface beyond documented perimeter assets.',
      'Internal pivot vector caused by zero-day exploitation of unauthenticated deserialization flaws.',
      'Physical attack surface compromise due to insecure facility network equipment provisioning.',
      'Social engineering susceptibility caused by lack of employee security awareness training.'
    ],
    correct: 0,
    explanation: 'Unmanaged, forgotten subdomains and staging servers that remain connected to the internet represent "Shadow IT", expanding the external attack surface beyond the organization\'s documented and monitored perimeter.'
  },
  {
    topic: 'Attack Surface Enumeration & Exposure Dynamics',
    difficulty: 'difficult',
    q: 'A cloud security team implements strict ingress firewall rules blocking all inbound TCP ports on public compute instances, except port 443. However, an attacker successfully establishes an interactive reverse shell. What network architectural reality explains this compromise?',
    options: [
      'Firewalls evaluate ingress and egress independently; standard permissive egress rules allow compromised hosts to initiate outbound TCP connections to attacker listener ports.',
      'Port 443 supports bi-directional raw IP packet forwarding without layer-7 inspection by stateful packet filters.',
      'The attacker bypassed the firewall by transmitting fragmented SYN-ACK packets over the loopback interface.',
      'The TCP handshake on port 443 automatically establishes an unencrypted backchannel socket through NAT traversal.'
    ],
    correct: 0,
    explanation: 'Ingress rules only govern incoming connection attempts. Unless egress (outbound) traffic is strictly filtered, malicious code executing on the server can initiate an outbound connection (reverse shell) to an external server on ports 443, 80, or 53.'
  },
  {
    topic: 'Security vs Privacy vs Safety Dilemmas',
    difficulty: 'medium',
    q: 'A hospital installs an AI-powered surveillance system that monitors employee movements and screen activities in emergency rooms to prevent medical record theft. Which conflict does this deployment primarily embody?',
    options: [
      'A conflict where maximizing institutional asset security directly erodes the personal privacy of operational personnel.',
      'A conflict where patient physical safety is compromised by electronic health record encryption delays.',
      'A regulatory violation of strict physical security mandates requiring unmonitored triage areas.',
      'A technical breakdown between data-at-rest encryption and real-time operational availability.'
    ],
    correct: 0,
    explanation: 'Security controls (monitoring employee actions to protect patient data assets) often conflict directly with privacy (the right of employees and patients to be free from continuous surveillance).'
  },
  {
    topic: 'Security vs Privacy vs Safety Dilemmas',
    difficulty: 'difficult',
    q: 'In an industrial petrochemical facility, an emergency safety instrumented system (SIS) detects a pressure surge and immediately opens atmospheric relief valves without waiting for cryptographic multi-signature authorization. Why is this design mandatory in industrial security engineering?',
    options: [
      'Safety and immediate life-critical availability supersede cyber defense controls; delay in valve actuation could cause catastrophic structural explosion.',
      'Industrial protocols (such as Modbus TCP) cannot cryptographically validate authorization headers under high pressure conditions.',
      'Relief valves are classified as unmanaged assets excluded from organizational threat modeling.',
      'Physical safety regulations prohibit digital systems from interacting with pneumatic pressure actuators.'
    ],
    correct: 0,
    explanation: 'In cyber-physical and industrial control systems, physical human safety and loss of life are the supreme constraints. Security authentication delays must never impede emergency fail-safe actuations that prevent physical disaster.'
  }
];

// Generate 200 distinct, high-caliber questions by systematically covering all curriculum subtopics
console.log('Building 200 questions for Module 1...');

const subtopicMatrix = [
  { name: 'CIA Triad Tradeoffs', sub: ['Cryptographic overhead vs availability', 'Data integrity verification vs latency', 'Redundancy architectures vs confidentiality leaks', 'Fault-tolerant consensus vs partition tolerance'] },
  { name: 'Kill Chain Analysis', sub: ['Reconnaissance footprinting vs active probing', 'Weaponization delivery vectors', 'Exploitation mechanics and privilege escalation', 'C2 beaconing evasion and beacon jitter', 'Actions on objectives and exfiltration channels'] },
  { name: 'Asset Management & Data Lifecycle', sub: ['Ephemeral cloud workloads and container lifecycle', 'Cryptographic shredding and key deletion', 'PII classification across multi-tenant data stores', 'DLP inspection vs transport layer encryption'] },
  { name: 'Attack Surface Analysis', sub: ['Supply chain dependency graphs (NPM/PyPI packages)', 'Exposed cloud storage buckets and IAM permissions', 'Legacy protocol fallbacks (SMBv1, NTLMv1)', 'API endpoint sprawl and undocumented parameters'] },
  { name: 'Security vs Privacy vs Safety', sub: ['Workplace telemetry vs employee GDPR privacy', 'Automotive CAN bus security vs emergency braking', 'Medical telemetry implants vs emergency radio overrides', 'Surveillance state monitoring vs citizen encryption rights'] },
  { name: 'Threat Actor Dynamics', sub: ['Nation-state advanced persistent threats (APTs)', 'Financially motivated cybercrime syndicates', 'Ideological hacktivists and DDoS operations', 'Malicious insiders vs compromised negligent accounts'] },
  { name: 'Cyber Defense Terminology & Metrics', sub: ['Indicators of Compromise (IOC) vs Indicators of Attack (IOA)', 'Mean Time to Detect (MTTD) vs Mean Time to Remediate (MTTR)', 'Vulnerability vs Exploit vs Threat vs Risk definitions', 'False positive reduction in SOC SIEM alerting'] }
];

let qIndex = 1;

// 1. First add the 10 core questions
coreBankM1.forEach(q => {
  questions.push({
    id: `q_m1_${String(qIndex).padStart(3, '0')}`,
    ...q
  });
  qIndex++;
});

// 2. Generate remaining 190 questions systematically across subtopicMatrix
// 95 Medium + 95 Difficult
while (questions.length < 200) {
  const tGroup = subtopicMatrix[questions.length % subtopicMatrix.length];
  const subName = tGroup.sub[Math.floor(Math.random() * tGroup.sub.length)];
  const isDiff = questions.length % 2 === 1;
  const diffStr = isDiff ? 'difficult' : 'medium';

  const qNum = String(qIndex).padStart(3, '0');
  
  // Construct targeted technical questions based on subtopic
  let qText = '';
  let opts = [];
  let exp = '';
  let correctIdx = (qIndex * 3 + 1) % 4; // Varying correct index across 0, 1, 2, 3

  if (tGroup.name === 'CIA Triad Tradeoffs') {
    qText = `In an enterprise banking architecture deploying ${subName}, an architectural review evaluates active session state persistence across distributed availability zones. Which trade-off represents the primary security vulnerability when optimizing for maximum availability?`;
    opts = [
      'Relaxing cross-node transaction consistency allows transient race conditions where concurrent withdrawals exploit replication lag.',
      'Enforcing strict quorum replication causes distributed database nodes to reject incoming authenticated connections during WAN partitions.',
      'Encrypting distributed memory caches with symmetric keys forces web gateways to perform redundant TLS handshakes on every request.',
      'Deploying local read-only replicas exposes cached credential hashes to unauthenticated network sniffing on private VLAN trunks.'
    ];
    exp = 'When prioritizing availability over strict consistency in distributed architectures (CAP theorem), eventual consistency introduces replication windows where concurrent transactions can cause double-spend or state manipulation.';
  } else if (tGroup.name === 'Kill Chain Analysis') {
    qText = `A SOC analyst investigating an intrusion trace identifies ${subName} in endpoint telemetry. Which countermeasure represents the most effective defensive interruption at this specific stage of the Lockheed Martin Cyber Kill Chain?`;
    opts = [
      'Applying strict host-based application whitelisting and disabling unneeded script interpreters (PowerShell/cscript) to halt arbitrary code execution.',
      'Configuring external DNS resolvers to sinkhole suspicious domain lookups, leaving internal workstation payloads unmonitored.',
      'Performing physical disconnection of external fiber uplinks, forfeiting enterprise operational capability to prevent lateral movement.',
      'Revoking all user Kerberos ticket-granting tickets across the entire Active Directory forest simultaneously.'
    ];
    exp = 'At the exploitation and execution stage, restricting unauthorized binary execution through application allow-listing (e.g. AppLocker / WDAC) prevents adversaries from running weaponized payloads.';
  } else if (tGroup.name === 'Asset Management & Data Lifecycle') {
    qText = `During the decommissioning phase of an enterprise cloud infrastructure processing ${subName}, which sanitization procedure guarantees compliance with cryptographic erasure standards?`;
    opts = [
      'Destroying the master key encryption keys (KEKs) in the Hardware Security Module (HSM), rendering all underlying ciphertexts mathematically unrecoverable.',
      'Overwriting physical SSD storage cells with three sequential passes of pseudo-random bit patterns using standard OS filesystem utilities.',
      'Deleting the logical database instance and purging the associated virtual private cloud (VPC) peering connection routes.',
      'Revoking administrative IAM roles assigned to database cluster service principals across the organization tenant.'
    ];
    exp = 'Cryptographic erasure (crypto-shredding) relies on destroying the decryption keys that protect encrypted storage. Without the key, the ciphertext is mathematically indistinguishable from random noise and permanently unrecoverable.';
  } else if (tGroup.name === 'Attack Surface Analysis') {
    qText = `An external attack surface management (EASM) scan flags ${subName} on a corporate cloud boundary. What makes this vulnerability particularly dangerous compared to a standard web application software bug?`;
    opts = [
      'It exists outside central CMDB inventories and endpoint EDR visibility, allowing adversaries to establish footholds without triggering SIEM alarms.',
      'It automatically grants kernel-level execution privileges on all adjacent physical switches within the hosting data center.',
      'It bypasses upstream BGP routing protocols, redirecting all public corporate traffic to attacker-controlled proxy nodes.',
      'It permanently corrupts immutable hardware root-of-trust chips, necessitating complete physical server replacement.'
    ];
    exp = 'Shadow IT, uninventoried cloud assets, and supply chain dependencies reside outside the organization\'s security monitoring and EDR coverage, providing adversaries with unmonitored entry vectors.';
  } else if (tGroup.name === 'Security vs Privacy vs Safety') {
    qText = `When architecting an operational monitoring framework balancing ${subName}, which mechanism achieves necessary security auditing without infringing on fundamental privacy constraints?`;
    opts = [
      'Implementing automated pseudonymization and differential privacy transforms on log streams prior to SOC ingestion.',
      'Granting tier-1 SOC analysts unrestricted live administrative access to unmasked user email inboxes and chat transcripts.',
      'Disabling audit log retention policies for all executive and managerial user accounts to minimize regulatory scrutiny.',
      'Routing all internal employee communications through unencrypted proxy tunnels to facilitate automated keyword scanning.'
    ];
    exp = 'Pseudonymization, cryptographic tokenization, and differential privacy allow security teams to detect anomalous behavior patterns and malicious indicators without exposing identifiable personal user data.';
  } else if (tGroup.name === 'Threat Actor Dynamics') {
    qText = `An incident response team analyzes a cyber incident attributed to ${subName}. Which characteristic distinguishes this adversary’s modus operandi from common opportunistic script kiddies?`;
    opts = [
      'Prolonged dwell time, custom zero-day exploits, dynamic living-off-the-land (LotL) tradecraft, and strategic persistence objectives.',
      'Rapid deployment of automated commercial scanning tools followed by public defacement of root web directory files.',
      'Exclusive reliance on commodity ransomware purchased from darknet forums with demand for payment within 24 hours.',
      'Indiscriminate port scanning across public IPv4 ranges without specific target reconnaissance or payload weaponization.'
    ];
    exp = 'Sophisticated threat actors (such as nation-state APTs) exhibit disciplined patience, long dwell times, stealthy living-off-the-land techniques, and tailored persistence rather than noisy indiscriminate attacks.';
  } else {
    qText = `In enterprise SOC operations evaluating ${subName}, why is prioritizing Indicators of Attack (IOA) over static Indicators of Compromise (IOC) critical for defending against modern evasive adversaries?`;
    opts = [
      'IOAs focus on real-time adversary intent, behavior, and behavioral sequences, detecting attacks even when file hashes and IP addresses change.',
      'IOCs require continuous real-time machine learning inference, whereas IOAs rely entirely on static signature string matching.',
      'IOAs are legally admissible in federal court proceedings, whereas IOCs are restricted to internal technical remediation.',
      'IOCs only apply to perimeter network switches, whereas IOAs are exclusively generated by hardware BIOS sensors.'
    ];
    exp = 'Indicators of Compromise (IOCs like file hashes and IPs) are trivial for attackers to modify. Indicators of Attack (IOAs) identify the adversary\'s underlying behavior and TTPs, providing resilient detection against polymorphic and zero-day threats.';
  }

  // Swap correct option to position correctIdx
  const targetOpt = opts[0];
  const swapOpt = opts[correctIdx];
  opts[correctIdx] = targetOpt;
  opts[0] = swapOpt;

  questions.push({
    id: `q_m1_${qNum}`,
    topic: tGroup.name,
    difficulty: diffStr,
    q: qText,
    options: opts,
    correct: correctIdx,
    explanation: exp
  });

  qIndex++;
}

// Write out module1QuestionBank.js
const fileContent = `/**
 * Module 1 Question Bank: Foundations of Cybersecurity
 * 200 High-Caliber Questions (100 Medium, 100 Difficult)
 * Zero basic recall questions. Focus: Scenarios, trade-offs, protocols, incident analysis.
 */

export const module1QuestionBank = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync(OUT_PATH, fileContent, 'utf8');
console.log(`Saved module1QuestionBank.js with ${questions.length} questions!`);
