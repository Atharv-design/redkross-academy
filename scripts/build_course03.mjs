/**
 * RedKross Academy - Course 03 Master Builder
 * Compiles "COURSE_03_Linux_and_Windows_System_Administration.txt" into modular database files:
 * - src/services/db/course03/modules/module1.js to module8.js
 * - src/services/db/course03/quizzes/module1QuestionBank.js to module8QuestionBank.js
 * - src/services/db/course03/course03Engine.js
 * - src/services/db/course03/index.js
 * - scripts/course03_white_diagram_prompts.md
 */

import fs from 'fs';
import path from 'path';

console.log('=== REDKROSS ACADEMY: COURSE 03 BUILD ENGINE ===');

const sourcePath = 'RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_03_Linux_and_Windows_System_Administration.txt';
const fullText = fs.readFileSync(sourcePath, 'utf8');

// Ensure output directories exist
['src/services/db/course03', 'src/services/db/course03/modules', 'src/services/db/course03/quizzes'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Master Module Specs
const MODULE_SPECS = [
  {
    num: 1,
    id: 'mod_c3_1',
    slug: 'operating-system-foundations',
    title: 'Module 1: Operating System Foundations',
    marker: 'MODULE C03-M01: Operating system foundations',
    description: 'Foundations of modern operating systems: CPU privilege rings (kernel space vs. user space), process creation and scheduling, memory hierarchies and paging, virtual address spaces, UEFI Secure Boot architectures, and service lifecycle management under systemd and Windows SCM.',
    lessons: [
      { num: 1, id: 'les_c3_m1_l1', code: 'C03-M01-L01', title: '1.1 What an Operating System Does: Hardware Abstraction, Resources & Privilege', duration: '45 mins' },
      { num: 2, id: 'les_c3_m1_l2', code: 'C03-M01-L02', title: '1.2 Kernel Space and User Space: CPU Rings, Traps & System Call Interfaces', duration: '50 mins' },
      { num: 3, id: 'les_c3_m1_l3', code: 'C03-M01-L03', title: '1.3 Processes and Threads: Identification, Tree Hierarchies & State Transitions', duration: '50 mins' },
      { num: 4, id: 'les_c3_m1_l4', code: 'C03-M01-L04', title: '1.4 Memory Management: Virtual Addressing, Paging & Exploit Mitigations (ASLR & DEP/NX)', duration: '55 mins' },
      { num: 5, id: 'les_c3_m1_l5', code: 'C03-M01-L05', title: '1.5 The Boot Process: UEFI, Shim, Secure Boot Verification & Kernel Initialization', duration: '55 mins' },
      { num: 6, id: 'les_c3_m1_l6', code: 'C03-M01-L06', title: '1.6 Services and Background Daemons: systemd Units & Windows SCM Architecture', duration: '60 mins' }
    ]
  },
  {
    num: 2,
    id: 'mod_c3_2',
    slug: 'linux-environment-and-file-hierarchy',
    title: 'Module 2: Linux Environment & File Hierarchy',
    marker: 'MODULE C03-M02: Linux environment',
    description: 'Mastering the Linux operating environment: distribution architectures (Debian, RHEL, Alpine), shell command execution mechanics, the Filesystem Hierarchy Standard (FHS 3.0), hard vs. symbolic links, navigation, file operations, and telemetry filtering.',
    lessons: [
      { num: 1, id: 'les_c3_m2_l1', code: 'C03-M02-L01', title: '2.1 Linux Distributions: Upstream Kernels, Package Formats & Enterprise Lineages', duration: '45 mins' },
      { num: 2, id: 'les_c3_m2_l2', code: 'C03-M02-L02', title: '2.2 The Shell: Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection', duration: '50 mins' },
      { num: 3, id: 'les_c3_m2_l3', code: 'C03-M02-L03', title: '2.3 The Filesystem Hierarchy Standard (FHS 3.0): Root Topologies & Virtual FS', duration: '50 mins' },
      { num: 4, id: 'les_c3_m2_l4', code: 'C03-M02-L04', title: '2.4 Navigation and Paths: Absolute vs. Relative Resolution & Path Traversal Risks', duration: '45 mins' },
      { num: 5, id: 'les_c3_m2_l5', code: 'C03-M02-L05', title: '2.5 Working with Files and Directories: Inodes, Links, Metadata & Deletion Lifecycles', duration: '55 mins' },
      { num: 6, id: 'les_c3_m2_l6', code: 'C03-M02-L06', title: '2.6 Viewing, Searching & Documentation: Text Toolchains, Grep, Find & Man Sections', duration: '55 mins' }
    ]
  },
  {
    num: 3,
    id: 'mod_c3_3',
    slug: 'linux-administration-and-permissions',
    title: 'Module 3: Linux Administration & Permissions',
    marker: 'MODULE C03-M03: Linux administration',
    description: 'Administrative governance of Linux endpoints and servers: user account databases, shadow password hashes, standard and special permission bitmasks (SUID, SGID, Sticky), POSIX extended ACLs, sudo policy enforcement, package repository verification, and system logging.',
    lessons: [
      { num: 1, id: 'les_c3_m3_l1', code: 'C03-M03-L01', title: '3.1 Users and Groups: Account Databases, UIDs/GIDs & Shadow Password Cryptography', duration: '50 mins' },
      { num: 2, id: 'les_c3_m3_l2', code: 'C03-M03-L02', title: '3.2 Permissions and Ownership: Octal/Symbolic Representation & Access Decision Logic', duration: '55 mins' },
      { num: 3, id: 'les_c3_m3_l3', code: 'C03-M03-L03', title: '3.3 Special Permission Bits and POSIX ACLs: SUID/SGID Risks & Fine-Grained Access', duration: '55 mins' },
      { num: 4, id: 'les_c3_m3_l4', code: 'C03-M03-L04', title: '3.4 Sudo and Privileged Administration: Sudoers Grammar, Least Privilege & Pitfalls', duration: '50 mins' },
      { num: 5, id: 'les_c3_m3_l5', code: 'C03-M03-L05', title: '3.5 Package Management and Supply Chain: Repositories, GPG Verification & APT/RPM', duration: '50 mins' },
      { num: 6, id: 'les_c3_m3_l6', code: 'C03-M03-L06', title: '3.6 System Services and Log Architecture: systemd-journald, rsyslog & Log Rotation', duration: '60 mins' }
    ]
  },
  {
    num: 4,
    id: 'mod_c3_4',
    slug: 'linux-automation-and-shell-scripting',
    title: 'Module 4: Linux Automation & Shell Scripting',
    marker: 'MODULE C03-M04: Linux automation',
    description: 'Industrial automation with Bash scripting: shebang declarations, strict error modes (`set -euo pipefail`), signal traps, safe temporary file handling, cron vs. systemd timer scheduling, and operational system health telemetry monitoring.',
    lessons: [
      { num: 1, id: 'les_c3_m4_l1', code: 'C03-M04-L01', title: '4.1 Shell Scripting Fundamentals: Shebangs, Subshells, Exit Codes & Variables', duration: '45 mins' },
      { num: 2, id: 'les_c3_m4_l2', code: 'C03-M04-L02', title: '4.2 Writing Safe Defensive Scripts: Error Flags, Signal Trapping & Atomic Files', duration: '55 mins' },
      { num: 3, id: 'les_c3_m4_l3', code: 'C03-M04-L03', title: '4.3 Testing and Debugging Scripts: Tracing, Dry-Runs & ShellCheck Static Analysis', duration: '50 mins' },
      { num: 4, id: 'les_c3_m4_l4', code: 'C03-M04-L04', title: '4.4 Scheduling with cron: Spool Architectures, Syntax & Security Vulnerabilities', duration: '50 mins' },
      { num: 5, id: 'les_c3_m4_l5', code: 'C03-M04-L05', title: '4.5 Modern Scheduling with systemd Timers: Unit Synchronization & Monotonic Delays', duration: '50 mins' },
      { num: 6, id: 'les_c3_m4_l6', code: 'C03-M04-L06', title: '4.6 System Monitoring: Resource Telemetry (top, vmstat, iostat) & Alerting Rules', duration: '60 mins' }
    ]
  },
  {
    num: 5,
    id: 'mod_c3_5',
    slug: 'windows-foundations-and-architecture',
    title: 'Module 5: Windows Foundations & Architecture',
    marker: 'MODULE C03-M05: Windows foundations',
    description: 'Internal architecture of the Windows NT executive: user mode vs. kernel mode, the Windows registry hives, Service Control Manager (services.exe), Security Identifiers (SIDs), User Account Control (UAC), access tokens, and NTFS discretionary access control lists (DACLs).',
    lessons: [
      { num: 1, id: 'les_c3_m5_l1', code: 'C03-M05-L01', title: '5.1 Windows Architecture: The NT Kernel, Executive Subsystems & Process Ancestry', duration: '50 mins' },
      { num: 2, id: 'les_c3_m5_l2', code: 'C03-M05-L02', title: '5.2 The Windows Registry: Hives, Keys, On-Disk Files & Persistence Hunting', duration: '55 mins' },
      { num: 3, id: 'les_c3_m5_l3', code: 'C03-M05-L03', title: '5.3 Windows Services: Service Control Manager, svchost Groups & Privilege Hijacking', duration: '55 mins' },
      { num: 4, id: 'les_c3_m5_l4', code: 'C03-M05-L04', title: '5.4 Local Accounts, SIDs & Groups: Security Identifiers, RIDs & Built-in Identities', duration: '50 mins' },
      { num: 5, id: 'les_c3_m5_l5', code: 'C03-M05-L05', title: '5.5 Tokens, UAC, Privileges & Integrity: Restricted Tokens & Integrity Levels', duration: '55 mins' },
      { num: 6, id: 'les_c3_m5_l6', code: 'C03-M05-L06', title: '5.6 NTFS Permissions: Security Descriptors, DACLs, ACE Evaluation & Share Overlays', duration: '60 mins' }
    ]
  },
  {
    num: 6,
    id: 'mod_c3_6',
    slug: 'powershell-administration',
    title: 'Module 6: PowerShell Administration',
    marker: 'MODULE C03-M06: PowerShell',
    description: 'Enterprise administration through PowerShell: Windows PowerShell 5.1 vs. PowerShell 7, typed object pipelines, cmdlets, advanced script functions, parameter validation, safe execution (`-WhatIf`), Constrained Language Mode, and deep auditing with Script Block Logging.',
    lessons: [
      { num: 1, id: 'les_c3_m6_l1', code: 'C03-M06-L01', title: '6.1 PowerShell Editions, Cmdlets & Help: Verb-Noun Syntax, Providers & Discovery', duration: '45 mins' },
      { num: 2, id: 'les_c3_m6_l2', code: 'C03-M06-L02', title: '6.2 The Object Pipeline: .NET Object Streams vs. Text Parsing & Memory Projection', duration: '50 mins' },
      { num: 3, id: 'les_c3_m6_l3', code: 'C03-M06-L03', title: '6.3 Variables, Types & Control Flow: Primitives, Collections, Hash Tables & Loops', duration: '50 mins' },
      { num: 4, id: 'les_c3_m6_l4', code: 'C03-M06-L04', title: '6.4 Advanced Functions & Validation: CmdletBinding, Pipeline Inputs & Error Traps', duration: '55 mins' },
      { num: 5, id: 'les_c3_m6_l5', code: 'C03-M06-L05', title: '6.5 Safe Administration: Execution Policies, Code Signing & ShouldProcess (-WhatIf)', duration: '55 mins' },
      { num: 6, id: 'les_c3_m6_l6', code: 'C03-M06-L06', title: '6.6 PowerShell Security & Telemetry: AMSI, Script Block Logging & Obfuscation Triage', duration: '60 mins' }
    ]
  },
  {
    num: 7,
    id: 'mod_c3_7',
    slug: 'enterprise-administration-and-active-directory',
    title: 'Module 7: Enterprise Administration & Active Directory',
    marker: 'MODULE C03-M07: Enterprise administration',
    description: 'Enterprise infrastructure and directory services: Windows Event Log architecture, high-fidelity security audit event IDs, Windows Event Forwarding (WEF), Active Directory Domain Services (AD DS), Kerberos authentication, Group Policy Object (GPO) precedence (LSDOU), and patch rings.',
    lessons: [
      { num: 1, id: 'les_c3_m7_l1', code: 'C03-M07-L01', title: '7.1 Windows Event Log Architecture: Channels, Providers, XML Schemas & EVTX Storage', duration: '50 mins' },
      { num: 2, id: 'les_c3_m7_l2', code: 'C03-M07-L02', title: '7.2 Security-Relevant Event IDs: Logon Triage, Process Tracking & Audit Policies', duration: '55 mins' },
      { num: 3, id: 'les_c3_m7_l3', code: 'C03-M07-L03', title: '7.3 Centralising Logs with WEF: Subscriptions, WinRM Transport & SIEM Aggregation', duration: '55 mins' },
      { num: 4, id: 'les_c3_m7_l4', code: 'C03-M07-L04', title: '7.4 Active Directory Architecture: Forests, Domains, Trees, OUs & Kerberos Tickets', duration: '60 mins' },
      { num: 5, id: 'les_c3_m7_l5', code: 'C03-M07-L05', title: '7.5 Group Policy Architecture: GPO Components, SYSVOL Replication & LSDOU Precedence', duration: '55 mins' },
      { num: 6, id: 'les_c3_m7_l6', code: 'C03-M07-L06', title: '7.6 Enterprise Patch & Configuration Management: WSUS, Deployment Rings & Drift', duration: '55 mins' }
    ]
  },
  {
    num: 8,
    id: 'mod_c3_8',
    slug: 'system-hardening-and-auditing',
    title: 'Module 8: System Hardening & Auditing',
    marker: 'MODULE C03-M08: System hardening',
    description: 'Defensive systems hardening and compliance auditing: consensus security baselines (CIS, DISA STIGs), safe rollback strategies, Linux service and kernel hardening, Windows Attack Surface Reduction (ASR) & Credential Guard, host firewalls (nftables / Defender), and automated audit scoring with Lynis.',
    lessons: [
      { num: 1, id: 'les_c3_m8_l1', code: 'C03-M08-L01', title: '8.1 Hardening Principles and Baselines: Threat Models, Attack Surfaces & CIS Standards', duration: '50 mins' },
      { num: 2, id: 'les_c3_m8_l2', code: 'C03-M08-L02', title: '8.2 Applying Baselines Safely: Staging, Phased Rollouts, Snapshots & Rollback Plans', duration: '55 mins' },
      { num: 3, id: 'les_c3_m8_l3', code: 'C03-M08-L03', title: '8.3 Linux Hardening Essentials: SSH Daemons, Kernel Sysctl & Legacy Protocols', duration: '55 mins' },
      { num: 4, id: 'les_c3_m8_l4', code: 'C03-M08-L04', title: '8.4 Windows Hardening Essentials: ASR Rules, BitLocker, VBS & Credential Guard', duration: '55 mins' },
      { num: 5, id: 'les_c3_m8_l5', code: 'C03-M08-L05', title: '8.5 Host Firewalls and Endpoint Protection: Stateful Rulesets, EDR & Default Deny', duration: '55 mins' },
      { num: 6, id: 'les_c3_m8_l6', code: 'C03-M08-L06', title: '8.6 Auditing and the Hardening Capstone: Automated Scoring (Lynis) & Audit Rubrics', duration: '60 mins' }
    ]
  }
];

console.log('Total modules mapped:', MODULE_SPECS.length);
console.log('Total lessons mapped:', MODULE_SPECS.reduce((acc, m) => acc + m.lessons.length, 0));
