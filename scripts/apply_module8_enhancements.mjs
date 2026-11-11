import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module8.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 8.1 - Fig 1 (C03-M08-F1)
  {
    id: 'C03-M08-F1',
    caption: '*Figure C03-M08-F1: Baselines are selected, reviewed, tested, deployed, audited, and corrected in a continuous loop with documented exceptions.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Continuous Six-Stage Hardening Lifecycle:** Depicts baseline hardening as an ongoing operational cycle rather than a one-time deployment event:
  1. **Select Baseline:** Security architects select authoritative consensus standards (e.g., CIS Benchmarks Level 1/2, DISA STIGs) matching the system role.
  2. **Review & Tailoring:** Systems and engineering teams review recommendations against organizational workload requirements, tailoring policies and establishing formally approved business exceptions.
  3. **Non-Production Testing:** Hardening configuration policies (via Ansible, Puppet, or GPO) are applied to isolated staging and pre-production test environments to identify service regressions.
  4. **Staged Deployment:** Approved baselines are rolled out through phased deployment rings across the fleet.
  5. **Continuous Automated Auditing:** Compliance scanners and configuration monitors periodically audit endpoints, comparing active configurations against the baseline.
  6. **Correction & Drift Remediation:** Configuration drift is automatically corrected, unapproved deviations are reverted, and documented exceptions are periodically recertified.
- **Defensive Significance:** Without continuous auditing and drift remediation, systems naturally degrade in security posture over time as ad-hoc administrative changes accumulate.`
  },

  // Lesson 8.1 - Fig 2 (C03-M08-D64)
  {
    id: 'C03-M08-D64',
    caption: '*Figure C03-M08-D64: Comparison of industry consensus baselines: CIS Benchmark Level 1 (essential defense), Level 2 (defense-in-depth), and military-grade DISA STIGs.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Consensus Hardening Standard Hierarchy:** Compares the three primary security configuration benchmarks across stringency, operational impact, and security depth:
- **CIS Benchmark Level 1 (Essential Defense Baseline):** Designed for standard enterprise workstations and servers. Focuses on surface reduction, disabling unused services, enforcing strong password policies, and restricting guest accounts. Designed for minimal to zero business functionality disruption.
- **CIS Benchmark Level 2 (Defense-in-Depth for High-Security Environments):** Intended for mission-critical, high-threat environments (financial transaction systems, domain controllers, healthcare records). Implements aggressive restrictions: strict auditing, disabling legacy protocols (NTLMv1, TLS 1.0/1.1), mandatory multi-factor authentication, and restricting administrative tools. May impact legacy application compatibility if deployed without testing.
- **DISA STIGs (Defense Information Systems Agency):** Highly prescriptive, military-grade configuration standards mandated for U.S. Department of Defense (DoD) networks. Features extensive auditing rules, rigorous cryptographic module validation (FIPS 140-2/3), physical port restrictions, and severe access containment.
- **Implementation Strategy:** Recommends enterprise organizations implement CIS Level 1 universally across 100% of hosts as a mandatory floor, applying Level 2 selectively to sensitive administrative and identity infrastructure.`
  },

  // Lesson 8.2 - Fig 1 (C03-M08-D65)
  {
    id: 'C03-M08-D65',
    caption: '*Figure C03-M08-D65: Safe rollout protocol: pre-change VM snapshots, canary deployment stages, automated health checks, and instant rollback procedures.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Defensive Deployment Safeguard Workflow:** Details the four-stage protocol engineered to prevent system outages during security configuration updates:
- **Stage 1: Pre-Change Snapshot & State Capture:** Prior to executing any hardening playbooks, automation scripts trigger storage-level virtual machine (VM) snapshots or filesystem copy-on-write snapshots (e.g., ZFS/Btrfs). Current configuration files and service states are backed up to out-of-band storage.
- **Stage 2: Canary Group Execution (1–5% Fleet):** Changes are applied strictly to an initial canary group consisting of non-critical test systems and early-adopter nodes.
- **Stage 3: Automated Health & Invariant Verification:** Automated synthetic transaction probes validate essential operating system services: network connectivity, DNS resolution, SSH/RDP accessibility, critical daemon status, and application transaction throughput.
- **Stage 4: Automated Rollback Trigger:**
  - If health checks succeed within the observation window, the rollout proceeds to broader deployment stages.
  - If any critical health check fails or an unexpected service interruption occurs, the automated orchestrator immediately halts the pipeline and executes snapshot reversion or configuration rollback, restoring full operational capability within minutes.
- **Operational Rule:** Never deploy hardening or kernel security policies globally without automated health-check gates and verified one-click rollback mechanisms.`
  },

  // Lesson 8.2 - Fig 2 (C03-M08-D66)
  {
    id: 'C03-M08-D66',
    caption: '*Figure C03-M08-D66: Blast radius containment: avoiding simultaneous global pushes to prevent enterprise-wide outages (CrowdStrike 2024 failure mode).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Global Push Antipattern (The Catastrophic Failure Mode):** Illustrates the catastrophic risk of simultaneous global pushes. When a faulty security content file, driver update, or flawed kernel parameter is deployed simultaneously to 100% of an enterprise fleet, single-point bugs propagate across all nodes instantly, causing simultaneous blue-screen crashes (BSODs) or kernel panics across millions of endpoints—mirroring the CrowdStrike Falcon incident of July 2024.
- **Phased Ring-Based Blast Radius Containment (Defensive Standard):** Contrasts the global failure mode against disciplined deployment ring architecture:
  - **Ring 0 (Internal Canary / Lab, 1%):** Initial deployment to non-production systems with continuous synthetic load.
  - **Ring 1 (Pilot Endpoints, 5%):** Deployment to IT and security operations staff endpoints, monitored over a 24-to-48-hour soaking period.
  - **Ring 2 (Regional Staging, 25%):** Gradual deployment across a single data center or regional business unit.
  - **Ring 3 (Broad Global Fleet, 100%):** Final rollout across all remaining production systems.
- **Automated Circuit Breaker Gates:** Depicts automated monitoring telemetry between rings: if crash rates or service anomaly metrics exceed 0.1%, deployment is halted automatically, containing the blast radius strictly to the active canary ring.`
  },

  // Lesson 8.3 - Fig 1 (C03-M08-F3)
  {
    id: 'C03-M08-F3',
    caption: '*Figure C03-M08-F3: Effective SSH settings (sshd -T) before and after hardening in the course lab: disabling passwords, banning root, and enforcing ed25519 keys.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Default Unhardened Configuration (\`sshd -T\` Output, Left Panel):** Exposes dangerous default SSH daemon configurations common on freshly installed systems:
  - \`PermitRootLogin yes\`: Permits attackers to execute brute-force attacks directly against the root superuser account over the network.
  - \`PasswordAuthentication yes\`: Accepts password-based credentials, exposing the host to credential stuffing and dictionary attacks.
  - \`X11Forwarding yes\` & \`AllowTcpForwarding yes\`: Leaves lateral pivoting channels enabled.
  - Weak legacy ciphers and MAC algorithms supported.
- **Hardened Production Profile (\`sshd -T\` Output, Right Panel):** Details the hardened state enforced in modern enterprise baselines:
  - \`PermitRootLogin no\`: Forces administrators to authenticate as named standard users and elevate privileges via \`sudo\`, generating an indelible audit trail.
  - \`PasswordAuthentication no\`: Disables all password prompts; authentication requires cryptographic SSH keys.
  - \`PubkeyAuthentication yes\` with Ed25519/ECDSA: Restricts public key algorithms strictly to modern high-performance elliptic-curve cryptography (\`ssh-ed25519\`), deprecating weak RSA keys.
  - \`ClientAliveInterval 300\` & \`ClientAliveCountMax 2\`: Enforces automatic disconnection of idle SSH sessions after 10 minutes of inactivity.
  - \`MaxAuthTries 3\`: Closes connections after three failed attempts, neutralizing automated brute-force tools.
- **Verification Command:** Emphasizes verifying running daemon settings with \`sshd -T\` (which prints the active, parsed runtime configuration) and validating syntax with \`sshd -t\` before restarting the service to avoid accidental lockout.`
  },

  // Lesson 8.3 - Fig 2 (C03-M08-D67)
  {
    id: 'C03-M08-D67',
    caption: '*Figure C03-M08-D67: Hardening the Linux kernel attack surface via /etc/sysctl.d/: disabling IP forwarding, enabling reverse path filtering, and restricting dmesg/ptrace.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Kernel Parameter Hardening Architecture (\`/etc/sysctl.d/99-security.conf\`):** Illustrates declarative kernel tuning modifying runtime variables in \`/proc/sys/\` without requiring kernel recompilation.
- **Network Attack Surface Reduction:**
  - \`net.ipv4.ip_forward = 0\`: Disables packet forwarding between interfaces, preventing multi-homed hosts from being used as unauthorized network routers.
  - \`net.ipv4.conf.all.rp_filter = 1\`: Enables strict Reverse Path Filtering, forcing the kernel to drop incoming packets whose source addresses are not routable via the receiving interface (neutralizing IP spoofing attacks).
  - \`net.ipv4.icmp_echo_ignore_broadcasts = 1\`: Drops broadcast ICMP pings, mitigating network Smurf amplification attacks.
  - \`net.ipv4.conf.all.accept_redirects = 0\`: Rejects ICMP redirect messages, preventing rogue gateways from poisoning local routing tables.
- **Memory & System Diagnostics Hardening:**
  - \`kernel.dmesg_restrict = 1\`: Restricts the kernel ring buffer (\`dmesg\`) exclusively to users with \`CAP_SYSLOG\`, preventing unprivileged users from extracting kernel memory addresses to defeat KASLR.
  - \`kernel.yama.ptrace_scope = 1\`: Restricts \`ptrace\` process debugging to direct parent processes, blocking unprivileged malware from reading memory or injecting shellcode into adjacent running applications.
  - \`kernel.kptr_restrict = 2\`: Masks kernel symbol addresses in \`/proc/kallsyms\`, denying exploit developers the address pointers needed for privilege escalation.`
  },

  // Lesson 8.4 - Fig 1 (C03-M08-D68)
  {
    id: 'C03-M08-D68',
    caption: '*Figure C03-M08-D68: Windows Defender Attack Surface Reduction (ASR) rules: blocking Office child processes, credential stealing from LSASS, and malicious scripts.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Adversary Attack Vectors (Left Panel):** Highlights three common exploitation vectors executed by malware and initial-access brokers:
  - Malicious Microsoft Office document (macro/exploit) attempting to spawn \`cmd.exe\` or \`powershell.exe\`.
  - Ransomware executable invoking WMI or \`vssadmin.exe\` to delete Volume Shadow Copies to prevent system recovery.
  - Password dumping utility (e.g., Mimikatz) injecting into or reading memory handles from \`lsass.exe\` to steal plaintext credentials.
- **Windows Defender ASR Engine (Center Panel):** Shows the kernel-level rule evaluation engine matching process actions against explicit rule GUIDs:
  - \`D4F940AB-401B-4EFC-AADC-AD5F3C50688A\`: Block all Office applications from creating child processes.
  - \`9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2\`: Block credential stealing from the Windows Local Security Authority subsystem (LSASS).
  - \`BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550\`: Block executable content from email client and webmail.
- **Operating Modes:** Details the deployment progression:
  - **Audit Mode:** Evaluates rules against live telemetry, logging Event ID 1121 without blocking execution, allowing enterprise teams to measure baseline false positives.
  - **Block Mode:** Actively denies unauthorized API calls and process spawning, logging Event ID 1122.
- **Blocked Attack Outcome (Right Panel):** Visualizes the defensive victory: malicious child processes are blocked pre-execution, shadow copies remain intact, LSASS memory is untouched, and zero adversary persistence is established.`
  },

  // Lesson 8.4 - Fig 2 (C03-M08-D69)
  {
    id: 'C03-M08-D69',
    caption: '*Figure C03-M08-D69: Hyper-V Virtualization-Based Security (VBS): moving credential secrets into isolated Virtual Trust Level 1 (VTL 1) beyond kernel Ring 0 reach.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Hardware Virtualization Substrate (Bottom Layer):** Illustrates the physical hardware foundation: 64-bit CPU with Second Level Address Translation (SLAT / EPT / NPT), Hardware Virtualization Extensions (Intel VT-x / AMD-V), and TPM 2.0 acting as the hardware root of trust.
- **Hyper-V Type-1 Bare-Metal Hypervisor:** Shows the hypervisor running directly on physical hardware beneath the operating system. Hyper-V partitions system memory into two cryptographically isolated trust levels using hardware Extended Page Tables.
- **Virtual Trust Level 0 (VTL 0, Normal World):** The standard operating system environment:
  - Ring 3 User Mode: User applications (browsers, Office, Explorer).
  - Ring 0 Kernel Mode: Windows Kernel (\`ntoskrnl.exe\`) and device drivers.
  - Standard \`lsass.exe\`: Operates merely as an unprivileged RPC proxy without holding raw cryptographic master keys.
- **Virtual Trust Level 1 (VTL 1, Secure World - VBS):** An isolated, hardened microkernel environment completely invisible and inaccessible to VTL 0.
  - Houses **Isolated LSA (\`Lsalso.exe\` / Credential Guard)**: Handles password verification, Kerberos ticket granting, and master DPAPI key storage.
  - Credential hashes and Kerberos keys reside exclusively inside VTL 1 protected memory.
- **The Ultimate Security Invariant:** Highlights the revolutionary defense: *Even if an adversary achieves full Ring 0 kernel compromise inside VTL 0 (via malicious driver or zero-day kernel exploit), hardware-enforced memory isolation prevents them from reading, tampering with, or dumping credentials from VTL 1!*`
  },

  // Lesson 8.5 - Fig 1 (C03-M08-F2)
  {
    id: 'C03-M08-F2',
    caption: '*Figure C03-M08-F2: Host defense-in-depth: identity governance, hardened configurations, stateful host firewalls, endpoint protection, and continuous monitoring.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Concentric Five-Layer Host Defense Architecture:** Details the nested defensive shields safeguarding the core host asset:
- **Layer 1: Perimeter - Identity & Access:** Enforces least-privilege accounts (role-based access), multi-factor authentication (MFA) for all administrative logins, unique randomized local administrator passwords via LAPS, and disabled guest/default accounts.
- **Layer 2: System Configuration Hardening:** Enforces verified configuration baselines (CIS Level 1), removes legacy daemons and unnecessary services, and secures kernel runtime parameters (ASLR, DEP, SMEP/SMAP, sysctl protections).
- **Layer 3: Network Boundary - Stateful Host Firewall:** Implements a default-deny inbound firewall (Linux nftables or Windows Defender Firewall) allowing only explicitly required ports (e.g., SSH, HTTPS) while dropping all unsolicited inbound connection requests.
- **Layer 4: Runtime Protection - Endpoint Detection & Response (EDR):** Provides behavioral heuristic analysis, AMSI in-memory script inspection, and exploit guards (ASR rules, credential access blocking).
- **Layer 5: Audit & Telemetry:** Centralizes event forwarding (WEF / syslog to SIEM), file integrity monitoring (AIDE / Tripwire), and automated audit scoring for continuous posture assessment.
- **Defensive Synergy:** Proves that an attacker penetrating an outer perimeter layer is immediately blocked or detected by subsequent independent defensive controls.`
  },

  // Lesson 8.5 - Fig 2 (C03-M08-D70)
  {
    id: 'C03-M08-D70',
    caption: '*Figure C03-M08-D70: Architectural comparison of host-based firewalls: Linux nftables netfilter hooks (input, forward, output) and Windows Defender Firewall network profiles (Domain, Private, Public).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Linux nftables / Netfilter Architecture (Left Panel):** Visualizes the packet processing pipeline inside the Linux kernel:
  - Packets traverse Netfilter kernel hooks: \`prerouting\` $\\rightarrow$ \`input\` (destined for local processes) / \`forward\` (routed to adjacent subnets) $\\rightarrow$ \`output\` (locally generated traffic) $\\rightarrow$ \`postrouting\`.
  - **Default Deny Policy:** Mandates setting the base chain policy to drop:
    \`type filter hook input priority 0; policy drop;\`
  - **Stateful Connection Tracking (\`conntrack\`):** Accepts packets belonging to existing flows with \`ct state established,related accept\`, while evaluating new incoming packets strictly against explicit port/source rules.
- **Windows Defender Firewall with Advanced Security (Right Panel):** Details the Windows firewall model structured around Network Location Profiles:
  - **Domain Profile:** Automatically applied when the device connects to an authenticated Active Directory domain network.
  - **Private Profile:** Applied to trusted home or private lab subnets.
  - **Public Profile:** Applied to untrusted networks (public Wi-Fi, internet), enforcing the strictest default-deny inbound posture.
  - **Stateful Packet Inspection (SPI):** Tracks connection states across Inbound Rules, Outbound Rules, and IPsec Connection Security Rules.
- **Shared Architectural Principle:** Both platforms enforce the golden rule of network hardening: Default-Deny Inbound coupled with stateful return-packet tracking.`
  },

  // Lesson 8.6 - Fig 1 (C03-M08-D71)
  {
    id: 'C03-M08-D71',
    caption: '*Figure C03-M08-D71: Automated Linux security auditing architecture: Lynis test execution engine, modular test plugins, hardening index calculation, and report generation.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Target System Auditing Scope (Left Block):** Highlights the audited Linux host assets inspected during an automated scan: installed system packages, active running services, kernel parameters, security configurations (SSH, logging, PAM), filesystem permissions, and network interface bindings.
- **Lynis Security Audit Engine (Center Block):** Depicts the core execution engine running over 260+ modular compliance checks across categorized domains:
  - Boot & Services (systemd units, bootloaders).
  - Kernel Hardening (sysctl settings, core dumps).
  - Memory Protections (ASLR, DEP).
  - SSH Configuration (authentication protocols, root login).
  - Logging & Telemetry (rsyslog, auditd).
  - File Permissions (SUID/SGID files, world-writable directories).
  - Network Interfaces (listening sockets, promiscuous mode).
- **Structured Output Streams (Right Block):**
  1. **Detailed Technical Log (\`/var/log/lynis.log\`):** Complete execution trace capturing all test outputs, diagnostic messages, and command evaluations.
  2. **Machine-Readable Data (\`/var/log/lynis-report.dat\`):** Key-value structured report for parsing by SIEM pipelines, Ansible, or central vulnerability dashboards.
  3. **Terminal Executive Summary:** Displays the definitive **Hardening Index** gauge (illustrating quantifiable posture improvement, e.g., 59/100 before hardening $\\rightarrow$ 84/100 after hardening), total tests performed, zero high-risk warnings, and actionable suggestion lists.`
  },

  // Lesson 8.6 - Fig 2 (C03-M08-D72)
  {
    id: 'C03-M08-D72',
    caption: '*Figure C03-M08-D72: The 15-point executive host audit rubric spanning identity, services, file integrity, logging, network attack surface, and rollback readiness.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **The 15-Item Enterprise Hardening Rubric Grid:** Organizes the definitive capstone audit checklist into five core security operational domains:
- **Domain 1: Identity & Access:**
  1. Standard user daily accounts enforced (no interactive daily root/admin use).
  2. Direct Root / Built-in Administrator remote login disabled.
  3. Strong password complexity policy & Windows LAPS / PAM modules deployed.
- **Domain 2: Service & Privilege Hardening:**
  4. Unnecessary services, legacy daemons, and cleartext protocols (telnet, rsh) removed.
  5. Services execute under isolated least-privilege service accounts (gMSA, system users).
  6. Strict sudoers command whitelist & UAC Admin Approval Mode enforced.
- **Domain 3: Filesystem & Storage Security:**
  7. Restrictive default umask (\`027\`) & hardened NTFS DACLs configured.
  8. SUID/SGID binaries audited and unauthorized elevation bits stripped.
  9. Full-disk hardware encryption active (BitLocker / LUKS with TPM 2.0).
- **Domain 4: Network & Firewall Defense:**
  10. Stateful host firewall with default-deny inbound policy active.
  11. SSH key-only authentication enforced with modern Ed25519 keys.
  12. Unused network protocols and legacy broadcast protocols (LLMNR, NetBIOS) disabled.
- **Domain 5: Telemetry, Patching & Operations:**
  13. High-fidelity security logging enabled (Process creation Event 4688 with command lines / auditd).
  14. Automated, phased patch deployment rings (WSUS / unattended-upgrades).
  15. Verified VM snapshot rollbacks & documented disaster recovery playbooks.
- **Compliance Certification:** Highlights the capstone audit summary: Total Controls: 15, Verified & Implemented: 15, yielding an Overall Status of **COMPLIANT** across enterprise host infrastructure.`
  }
];

// Apply updates
for (const update of updates) {
  let matched = false;
  if (content.includes(update.caption)) {
    matched = true;
  } else {
    const bareCaption = update.caption.replace(/^\*|\*$/g, '');
    if (content.includes(bareCaption)) {
      matched = true;
      update.caption = bareCaption;
    }
  }
  if (!matched) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
}

console.log('Successfully matched and formatted ' + updates.length + ' figures in Module 8.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module8.js!');
