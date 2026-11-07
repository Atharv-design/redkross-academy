/**
 * 20 Default Cybersecurity Questions Generator
 * Ensures every course module can have an instant, high-quality 20-question exam.
 */
export function generate20ModuleQuestions(moduleTitle = 'Core Defensive Security') {
  return [
    {
      id: `q_${Date.now()}_1`,
      text: `In ${moduleTitle}, what is the primary role of continuous telemetry monitoring?`,
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'To maintain full operational visibility over host and network state changes', is_correct: true },
        { id: 'opt_2', text: 'To encrypt all local storage drives automatically', is_correct: false },
        { id: 'opt_3', text: 'To replace hardware firewalls with software scripts', is_correct: false },
        { id: 'opt_4', text: 'To eliminate the need for administrative access controls', is_correct: false }
      ],
      explanation: 'Continuous telemetry provides defenders with real-time detection telemetry across endpoints and network segments.'
    },
    {
      id: `q_${Date.now()}_2`,
      text: 'Which defensive security framework aligns adversary tactics and techniques to specific defensive countermeasures?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'MITRE ATT&CK Framework', is_correct: true },
        { id: 'opt_2', text: 'PCI-DSS Compliance Checklist', is_correct: false },
        { id: 'opt_3', text: 'OSI 7-Layer Reference Architecture', is_correct: false },
        { id: 'opt_4', text: 'IEEE 802.11 Wireless Standard', is_correct: false }
      ],
      explanation: 'MITRE ATT&CK is the globally accessible knowledge base of adversary tactics, techniques, and procedures based on real-world observations.'
    },
    {
      id: `q_${Date.now()}_3`,
      text: 'What does the Principle of Least Privilege (PoLP) dictate?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Accounts and processes should only possess the minimum permissions necessary to perform their authorized tasks', is_correct: true },
        { id: 'opt_2', text: 'All users must share a single administrative password', is_correct: false },
        { id: 'opt_3', text: 'Root privileges should be granted during initial onboarding', is_correct: false },
        { id: 'opt_4', text: 'Network access must be unrestricted during daylight hours', is_correct: false }
      ],
      explanation: 'Least privilege prevents lateral movement and limits the blast radius when an individual credential is compromised.'
    },
    {
      id: `q_${Date.now()}_4`,
      text: 'When reviewing Windows Security Event Logs, which Event ID indicates an unauthorized attempt at account logon failure?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Event ID 4625 (An account failed to log on)', is_correct: true },
        { id: 'opt_2', text: 'Event ID 4624 (Successful Logon)', is_correct: false },
        { id: 'opt_3', text: 'Event ID 1102 (Audit log cleared)', is_correct: false },
        { id: 'opt_4', text: 'Event ID 7045 (New Service installed)', is_correct: false }
      ],
      explanation: 'Event ID 4625 logs failed authentication attempts, providing the logon type, failure reason, and requesting client machine IP.'
    },
    {
      id: `q_${Date.now()}_5`,
      text: 'Which protocol is commonly used to securely ingest enterprise log streams into a centralized SIEM platform?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'TLS-Encrypted Syslog (RFC 5424 over port 6514)', is_correct: true },
        { id: 'opt_2', text: 'Unencrypted Telnet (port 23)', is_correct: false },
        { id: 'opt_3', text: 'Cleartext FTP (port 21)', is_correct: false },
        { id: 'opt_4', text: 'TFTP over UDP', is_correct: false }
      ],
      explanation: 'Secure syslog over TLS ensures log integrity and confidentiality during transit from endpoints to the SIEM.'
    },
    {
      id: `q_${Date.now()}_6`,
      text: 'What is the primary indicator of a Pass-the-Hash (PtH) attack in Windows environments?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Authentication events using NTLM Logon Type 3 with stolen password hashes without plaintext disclosure', is_correct: true },
        { id: 'opt_2', text: 'CPU utilization dropping to 0%', is_correct: false },
        { id: 'opt_3', text: 'DNS queries failing to resolve', is_correct: false },
        { id: 'opt_4', text: 'Printer spooler restarts', is_correct: false }
      ],
      explanation: 'Pass-the-Hash abuses NTLM authentication by supplying the hashed credential directly without needing to crack the plaintext password.'
    },
    {
      id: `q_${Date.now()}_7`,
      text: 'According to RFC 3227, what is the first priority when collecting digital evidence from a live machine?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Most volatile data (Registers, CPU cache, and system memory / RAM)', is_correct: true },
        { id: 'opt_2', text: 'Cold archival storage tapes', is_correct: false },
        { id: 'opt_3', text: 'Printed network diagrams', is_correct: false },
        { id: 'opt_4', text: 'Solid-state storage drives', is_correct: false }
      ],
      explanation: 'Order of Volatility mandates collecting data that vanishes when power is severed before moving to persistent media.'
    },
    {
      id: `q_${Date.now()}_8`,
      text: 'What does an EDR network quarantine do during an active intrusion?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Blocks all inbound/outbound communication except the secure management tunnel to the EDR console', is_correct: true },
        { id: 'opt_2', text: 'Instantly formats all hard disk drives', is_correct: false },
        { id: 'opt_3', text: 'Shuts down the physical power supply', is_correct: false },
        { id: 'opt_4', text: 'Sends an unencrypted broadcast message to the whole subnet', is_correct: false }
      ],
      explanation: 'EDR isolation halts lateral movement and exfiltration while preserving forensic access for incident responders.'
    },
    {
      id: `q_${Date.now()}_9`,
      text: 'Why should incident responders calculate cryptographic hashes (SHA-256) of forensic disk images?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'To prove chain of custody and verify that evidence was not altered after acquisition', is_correct: true },
        { id: 'opt_2', text: 'To compress the image size by 90%', is_correct: false },
        { id: 'opt_3', text: 'To hide the evidence from defense attorneys', is_correct: false },
        { id: 'opt_4', text: 'To convert the raw disk image into an executable file', is_correct: false }
      ],
      explanation: 'Matching cryptographic hashes provide mathematical proof of integrity for legal admissibility.'
    },
    {
      id: `q_${Date.now()}_10`,
      text: 'What is a Sigma rule used for in security engineering?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'A vendor-agnostic signature format for log detections that translates into queries for Splunk, Elastic, and QRadar', is_correct: true },
        { id: 'opt_2', text: 'A network routing algorithm for BGP tables', is_correct: false },
        { id: 'opt_3', text: 'A database index optimization rule', is_correct: false },
        { id: 'opt_4', text: 'A password complexity enforcement policy', is_correct: false }
      ],
      explanation: 'Sigma enables security teams to share detection logic regardless of the specific SIEM backend deployed.'
    },
    {
      id: `q_${Date.now()}_11`,
      text: 'What does the Mark-of-the-Web (Zone.Identifier) alternate data stream signify in Windows NTFS?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'It identifies files downloaded from untrusted Internet sources to enforce Protected View and SmartScreen', is_correct: true },
        { id: 'opt_2', text: 'It indicates that the file is an authorized system driver', is_correct: false },
        { id: 'opt_3', text: 'It encrypts the file with BitLocker', is_correct: false },
        { id: 'opt_4', text: 'It triggers automatic execution on boot', is_correct: false }
      ],
      explanation: 'Windows applies ZoneId=3 to downloaded files, signaling defensive safeguards to block macros and prompt user confirmation.'
    },
    {
      id: `q_${Date.now()}_12`,
      text: 'What is the purpose of Living off the Land (LotL) techniques by adversaries?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Abusing legitimate, pre-installed administrative binaries (LOLBins) to evade antivirus signatures', is_correct: true },
        { id: 'opt_2', text: 'Planting physical hardware bugs inside server chassis', is_correct: false },
        { id: 'opt_3', text: 'Using solar power for cyber attacks', is_correct: false },
        { id: 'opt_4', text: 'Attacking only agricultural and manufacturing networks', is_correct: false }
      ],
      explanation: 'LOLBins like PowerShell, certutil, and wmic allow adversaries to operate without downloading custom malware tools.'
    },
    {
      id: `q_${Date.now()}_13`,
      text: 'Which port is utilized by default for Kerberos authentication services?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'TCP/UDP Port 88', is_correct: true },
        { id: 'opt_2', text: 'TCP Port 443', is_correct: false },
        { id: 'opt_3', text: 'TCP Port 22', is_correct: false },
        { id: 'opt_4', text: 'UDP Port 53', is_correct: false }
      ],
      explanation: 'Port 88 is the standard port for Kerberos Key Distribution Center (KDC) ticket granting operations.'
    },
    {
      id: `q_${Date.now()}_14`,
      text: 'What is "Kerberoasting" (MITRE ATT&CK T1558.003)?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Requesting Kerberos TGS tickets for accounts with SPNs and cracking the encrypted service passwords offline', is_correct: true },
        { id: 'opt_2', text: 'Overheating a domain controller server', is_correct: false },
        { id: 'opt_3', text: 'Flooding the KDC with UDP SYN packets', is_correct: false },
        { id: 'opt_4', text: 'Modifying DNS records on Active Directory', is_correct: false }
      ],
      explanation: 'Any valid domain user can request a service ticket for an SPN and crack its ticket offline without triggering lockouts.'
    },
    {
      id: `q_${Date.now()}_15`,
      text: 'What is the primary indicator of DNS tunneling in network telemetry?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Unusually high volumes of TXT/A queries with long, high-entropy subdomain strings destined for an external nameserver', is_correct: true },
        { id: 'opt_2', text: 'Standard reverse lookup queries for internal IP addresses', is_correct: false },
        { id: 'opt_3', text: 'Zero outbound network connections', is_correct: false },
        { id: 'opt_4', text: 'HTTP 404 response codes from web servers', is_correct: false }
      ],
      explanation: 'DNS tunneling encodes C2 payloads or stolen data into subdomains to bypass egress packet filtering on port 53.'
    },
    {
      id: `q_${Date.now()}_16`,
      text: 'Which Windows forensic artifact records application execution paths and run counts to assist with prefetch caching?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Windows Prefetch files (.pf)', is_correct: true },
        { id: 'opt_2', text: 'Windows hosts file', is_correct: false },
        { id: 'opt_3', text: 'Pagefile.sys only', is_correct: false },
        { id: 'opt_4', text: 'Desktop shortcuts (.lnk)', is_correct: false }
      ],
      explanation: 'Prefetch files verify whether a binary was executed on a system, even if the original executable was deleted.'
    },
    {
      id: `q_${Date.now()}_17`,
      text: 'What is "Timestomping" in adversary defense evasion?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Modifying NTFS file timestamps ($STANDARD_INFORMATION) to disguise malware as legitimate older system files', is_correct: true },
        { id: 'opt_2', text: 'Syncing system clocks with a rogue NTP server', is_correct: false },
        { id: 'opt_3', text: 'Overclocking CPU frequencies', is_correct: false },
        { id: 'opt_4', text: 'Delaying sleep commands in script loops', is_correct: false }
      ],
      explanation: 'Timestomping is designed to defeat forensic chronological triage by making backdoors appear to pre-date the intrusion.'
    },
    {
      id: `q_${Date.now()}_18`,
      text: 'What does a hardware write blocker do during dead-box forensic disk acquisition?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Intercepts and blocks any write commands from the acquisition host to the original evidence drive', is_correct: true },
        { id: 'opt_2', text: 'Converts SATA connections into NVMe protocols', is_correct: false },
        { id: 'opt_3', text: 'Removes file system passwords from encrypted drives', is_correct: false },
        { id: 'opt_4', text: 'Automatically cleans corrupted drive sectors', is_correct: false }
      ],
      explanation: 'Hardware write blockers physically prevent accidental alteration of evidentiary media during imaging.'
    },
    {
      id: `q_${Date.now()}_19`,
      text: 'What is the role of a YARA condition statement?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'It defines the exact boolean logic criteria under which a signature match is reported', is_correct: true },
        { id: 'opt_2', text: 'It sets the execution speed of the virus scanner', is_correct: false },
        { id: 'opt_3', text: 'It specifies the author copyright text', is_correct: false },
        { id: 'opt_4', text: 'It deletes matched files automatically', is_correct: false }
      ],
      explanation: 'The condition section combines string identifiers and file characteristics to determine whether a file matches the rule.'
    },
    {
      id: `q_${Date.now()}_20`,
      text: 'In the NIST SP 800-61r2 incident response cycle, what is the primary goal of Post-Incident Activity?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Documenting lessons learned, updating standard operating procedures, and hardening defenses to prevent recurrence', is_correct: true },
        { id: 'opt_2', text: 'Assigning personal blame to system administrators', is_correct: false },
        { id: 'opt_3', text: 'Calculating marketing PR damages', is_correct: false },
        { id: 'opt_4', text: 'Purchasing new hardware without forensic analysis', is_correct: false }
      ],
      explanation: 'Lessons Learned meetings evaluate response efficacy, root causes, detection gaps, and update playbooks for future resilience.'
    }
  ];
}
