/**
 * Course 03: Linux and Windows System Administration
 * Module 8: System Hardening & Auditing
 * Modular load-balanced data file.
 */

export const module8Data = {
  "id": "mod_c3_8",
  "title": "Module 8: System Hardening & Auditing",
  "description": "Defensive systems hardening and compliance auditing: consensus security baselines (CIS, DISA STIGs), safe rollback strategies, Linux service and kernel hardening, Windows Attack Surface Reduction (ASR) & Credential Guard, host firewalls (nftables / Defender), and automated audit scoring with Lynis.",
  "order": 8,
  "quiz": {
    "id": "quiz_mod_c3_8",
    "title": "Module 8: System Hardening & Auditing Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m8_001",
        "topic": "Windows Attack Surface Reduction (ASR) Rules",
        "difficulty": "difficult",
        "q": "Which Microsoft Defender Attack Surface Reduction (ASR) rule protects against credential-dumping tools like Mimikatz?",
        "options": [
          "Block credential stealing from the Windows Local Security Authority subsystem (lsass.exe)",
          "Block Office applications from creating child processes",
          "Block executable content from email client and webmail",
          "Block untrusted and unsigned processes that run from USB"
        ],
        "correct": 0,
        "explanation": "The ASR rule \"Block credential stealing from the Windows Local Security Authority subsystem (lsass.exe)\" prevents untrusted processes from opening LSASS memory handles to steal credentials."
      },
      {
        "id": "q_c3_m8_002",
        "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
        "difficulty": "medium",
        "q": "Which consensus security baseline provides essential baseline hardening controls that can be applied with minimal risk of breaking standard enterprise application functionality?",
        "options": [
          "CIS Benchmark Level 1 Profile",
          "CIS Benchmark Level 2 Profile",
          "DISA STIG Military Lockdown Baseline",
          "NSA Extreme Zero-Trust Enclave Specification"
        ],
        "correct": 0,
        "explanation": "CIS Level 1 profiles are designed to provide rapid, essential cybersecurity protection without severely inhibiting enterprise utility or requiring custom application modifications."
      },
      {
        "id": "q_c3_m8_003",
        "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_004",
        "topic": "Blast Radius Containment & Change Management",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_005",
        "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_006",
        "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_007",
        "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_008",
        "topic": "Windows Attack Surface Reduction (ASR) Rules",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_009",
        "topic": "Virtualization-Based Security (VBS) & Credential Guard",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_010",
        "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_011",
        "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_012",
        "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_013",
        "topic": "Hardening Principles & Threat Surface Reduction",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_014",
        "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_015",
        "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_016",
        "topic": "Blast Radius Containment & Change Management",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_017",
        "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_018",
        "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_019",
        "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      },
      {
        "id": "q_c3_m8_020",
        "topic": "Windows Attack Surface Reduction (ASR) Rules",
        "difficulty": "medium",
        "q": "Which OpenSSH server configuration directive in /etc/ssh/sshd_config effectively prevents password-guessing brute-force attacks across public networks?",
        "options": [
          "PasswordAuthentication no",
          "PermitRootLogin yes",
          "X11Forwarding no",
          "MaxAuthTries 10"
        ],
        "correct": 0,
        "explanation": "Setting \"PasswordAuthentication no\" disables password logins entirely, forcing clients to authenticate using cryptographic SSH key pairs (e.g. Ed25519)."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m8_l1",
      "title": "8.1 Hardening Principles and Baselines: Threat Models, Attack Surfaces & CIS Standards",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Threat Models, Attack Surfaces & CIS Standards.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Threat Models, Attack Surfaces & CIS Standards.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l1_c03_m08_f1",
          "title": "C03-M08-F1: System Hardening Lifecycle: Threat Modeling, Baselines, Staging, Audit & Exceptions",
          "url": "/assets/courses/cyber-03/C03-M08-F1.png",
          "caption": "Figure C03-M08-F1: Baselines are selected, reviewed, tested, deployed, audited, and corrected in a continuous loop with documented exceptions.",
          "alt": "Cyclical diagram of the hardening lifecycle from baseline selection to test staging, production deployment, auditing, and exception logging"
        },
        {
          "id": "img_c3_m8_l1_c03_m08_d64",
          "title": "C03-M08-D64: Consensus Security Baselines: CIS Benchmark Levels 1 & 2 vs. DISA STIGs",
          "url": "/assets/courses/cyber-03/c03_m08_l01_cis_benchmarks_disa_stigs.png",
          "caption": "Figure C03-M08-D64: Comparison of industry consensus baselines: CIS Benchmark Level 1 (essential defense), Level 2 (defense-in-depth), and military-grade DISA STIGs.",
          "alt": "Comparison chart detailing CIS Benchmark Level 1, CIS Benchmark Level 2, and DISA STIG hardening profiles"
        }
      ],
      "content": "## 8.1 Hardening Principles and Baselines: Threat Models, Attack Surfaces & CIS Standards\n\n![C03-M08-F1: System Hardening Lifecycle: Threat Modeling, Baselines, Staging, Audit & Exceptions](/assets/courses/cyber-03/C03-M08-F1.png)\n\n*Figure C03-M08-F1: Baselines are selected, reviewed, tested, deployed, audited, and corrected in a continuous loop with documented exceptions.*\n\nLESSON C03-M08-L01: Hardening principles and secure baselines\n=============================================================\n\n2.1.1 Principles\n  Minimise       remove unneeded software, services, accounts, features,\n                 ports (attack surface reduction, Course 01 Module 1).\n  Least          accounts and services get only the rights they need.\n  privilege\n  Secure         change insecure defaults (passwords, protocols, sharing).\n  defaults\n  Defence in     several layers: firewall, endpoint protection, logging,\n  depth          encryption.\n  Maintain       patch, monitor drift, review.\n  Verify         test that settings are actually applied.\n\n2.1.2 What a baseline is\nA secure configuration baseline is a documented set of settings that a\nclass of system must meet - for example \"Windows 11 Enterprise workstation\nbaseline v3\" - with each setting's value, rationale and how to check it. The\nCIS Critical Security Controls include \"Secure Configuration of Enterprise\nAssets and Software\" as Control 4 (Course 01 Module 6).\n\n2.1.3 Authoritative sources\n  CIS Benchmarks            consensus-developed configuration guides for\n                            many operating systems and applications, with\n                            Level 1 (practical, low-impact) and Level 2\n                            (defence-in-depth, may affect functionality)\n                            profiles [C03-M08-R2].\n  Microsoft Security        Microsoft-recommended Group Policy settings for\n  Baselines                 Windows, Edge and Microsoft 365 Apps, distributed\n                            with the Security Compliance Toolkit, which also\n                            includes Policy Analyzer to compare GPOs with\n                            baselines [C03-M08-R3].\n  DISA STIGs                US Department of Defense Security Technical\n                            Implementation Guides - detailed and strict.\n  Vendor hardening guides   distribution and product documentation (for\n                            example Ubuntu, Red Hat security guides).\n  Automated content         SCAP/OpenSCAP content (in the RedKross blueprint\n                            tool map for GRC) evaluates systems against\n                            machine-readable benchmarks.\nChoose a source appropriate to your risk and regulatory needs, record which\nversion you use, and track updates.\n\n\n![C03-M08-D64: Consensus Security Baselines: CIS Benchmark Levels 1 & 2 vs. DISA STIGs](/assets/courses/cyber-03/c03_m08_l01_cis_benchmarks_disa_stigs.png)\n\n*Figure C03-M08-D64: Comparison of industry consensus baselines: CIS Benchmark Level 1 (essential defense), Level 2 (defense-in-depth), and military-grade DISA STIGs.*\n\n"
    },
    {
      "id": "les_c3_m8_l2",
      "title": "8.2 Applying Baselines Safely: Staging, Phased Rollouts, Snapshots & Rollback Plans",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Staging, Phased Rollouts, Snapshots & Rollback Plans.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Staging, Phased Rollouts, Snapshots & Rollback Plans.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l2_c03_m08_d65",
          "title": "C03-M08-D65: Safe Baseline Deployment Architecture: Snapshots, Phased Rollouts & Rollback Playbooks",
          "url": "/assets/courses/cyber-03/c03_m08_l02_safe_deployment_rollback.png",
          "caption": "Figure C03-M08-D65: Safe rollout protocol: pre-change VM snapshots, canary deployment stages, automated health checks, and instant rollback procedures.",
          "alt": "Flowchart showing pre-change snapshot creation, canary testing, automated health monitoring, and rollback execution if services fail"
        },
        {
          "id": "img_c3_m8_l2_c03_m08_d66",
          "title": "C03-M08-D66: The Blast Radius Containment Model: Mitigating Configuration Catastrophes",
          "url": "/assets/courses/cyber-03/c03_m08_l02_blast_radius_containment.png",
          "caption": "Figure C03-M08-D66: Blast radius containment: avoiding simultaneous global pushes to prevent enterprise-wide outages (CrowdStrike 2024 failure mode).",
          "alt": "Diagram contrasting dangerous global simultaneous push with safe staged canary deployment rings containing blast radius"
        }
      ],
      "content": "## 8.2 Applying Baselines Safely: Staging, Phased Rollouts, Snapshots & Rollback Plans\n\n![C03-M08-D65: Safe Baseline Deployment Architecture: Snapshots, Phased Rollouts & Rollback Playbooks](/assets/courses/cyber-03/c03_m08_l02_safe_deployment_rollback.png)\n\n*Figure C03-M08-D65: Safe rollout protocol: pre-change VM snapshots, canary deployment stages, automated health checks, and instant rollback procedures.*\n\nLESSON C03-M08-L02: Applying baselines safely\n=============================================\n\n2.2.1 Process\n  1. Select the baseline and profile (for example CIS Level 1).\n  2. Review every setting against business needs; mark settings that\n     conflict with requirements.\n  3. Test on representative systems; record breakages.\n  4. Deploy in rings (Module 7) through Group Policy, Intune, configuration\n     management (Ansible, DSC) or image builds.\n  5. Document exceptions: setting, reason, compensating control, owner,\n     expiry (Course 01 Module 4: risk acceptance).\n  6. Audit continuously and correct drift.\n\n2.2.2 Common pitfalls\n  - Applying a whole benchmark blindly to production and breaking\n    applications (then rolling everything back).\n  - Hardening once at build time and never checking again.\n  - Treating a tool's score as the goal instead of risk reduction.\n  - Not recording the baseline version, so audits cannot tell what was\n    intended.\n\n\n![C03-M08-D66: The Blast Radius Containment Model: Mitigating Configuration Catastrophes](/assets/courses/cyber-03/c03_m08_l02_blast_radius_containment.png)\n\n*Figure C03-M08-D66: Blast radius containment: avoiding simultaneous global pushes to prevent enterprise-wide outages (CrowdStrike 2024 failure mode).*\n\n"
    },
    {
      "id": "les_c3_m8_l3",
      "title": "8.3 Linux Hardening Essentials: SSH Daemons, Kernel Sysctl & Legacy Protocols",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of SSH Daemons, Kernel Sysctl & Legacy Protocols.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of SSH Daemons, Kernel Sysctl & Legacy Protocols.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l3_c03_m08_f3",
          "title": "C03-M08-F3: SSH Settings Before & After Hardening: Lab Evidence & Verified Directives",
          "url": "/assets/courses/cyber-03/C03-M08-F3.png",
          "caption": "Figure C03-M08-F3: Effective SSH settings (sshd -T) before and after hardening in the course lab: disabling passwords, banning root, and enforcing ed25519 keys.",
          "alt": "Comparison table of sshd settings before and after hardening showing PermitRootLogin, PasswordAuthentication, and KexAlgorithms"
        },
        {
          "id": "img_c3_m8_l3_c03_m08_d67",
          "title": "C03-M08-D67: Linux Kernel Sysctl Hardening: Network Stack & Memory Attack Surface Reduction",
          "url": "/assets/courses/cyber-03/c03_m08_l03_sysctl_kernel_hardening.png",
          "caption": "Figure C03-M08-D67: Hardening the Linux kernel attack surface via /etc/sysctl.d/: disabling IP forwarding, enabling reverse path filtering, and restricting dmesg/ptrace.",
          "alt": "Reference diagram detailing defensive kernel sysctl parameters: ip_forward, rp_filter, kptr_restrict, and yama ptrace_scope"
        }
      ],
      "content": "## 8.3 Linux Hardening Essentials: SSH Daemons, Kernel Sysctl & Legacy Protocols\n\n![C03-M08-F3: SSH Settings Before & After Hardening: Lab Evidence & Verified Directives](/assets/courses/cyber-03/C03-M08-F3.png)\n\n*Figure C03-M08-F3: Effective SSH settings (sshd -T) before and after hardening in the course lab: disabling passwords, banning root, and enforcing ed25519 keys.*\n\nLESSON C03-M08-L03: Linux hardening essentials\n==============================================\n\n2.3.1 Software and updates\n  - Install only required packages; remove compilers and tools not needed\n    on production servers where practical.\n  - Enable security updates (unattended-upgrades on Debian/Ubuntu, dnf-\n    automatic on RHEL-family) with monitoring (Module 3).\n\n2.3.2 Accounts and authentication\n  - No shared accounts; sudo with named commands; root login disabled over\n    SSH (L03.3); lock unused accounts; strong password policy via PAM or,\n    better, key/MFA-based access.\n\n2.3.3 SSH server hardening\nOpenSSH reads /etc/ssh/sshd_config and, on Debian/Ubuntu, drop-in files in\n/etc/ssh/sshd_config.d/ - the first value obtained for a setting wins\n[C03-M08-R4]. Recommended settings for many servers:\n  PermitRootLogin no              administrators log in as themselves\n  PasswordAuthentication no       keys (or certificates/MFA) instead\n  KbdInteractiveAuthentication no unless used for MFA\n  X11Forwarding no                unless required\n  AllowAgentForwarding no         unless required\n  MaxAuthTries 3                  fewer attempts per connection\n  LoginGraceTime 30               shorter unauthenticated window\n  AllowGroups ssh-users           (optional) only named groups may log in\nAlways validate with sshd -t (syntax) and sshd -T (effective configuration)\nbefore restarting, and keep an existing session open while testing so you\ncannot lock yourself out.\n\nExecution-tested (Debian 13 container, OpenSSH 10.0):\n  Defaults (sshd -T): maxauthtries 6; permitrootlogin without-password;\n                      passwordauthentication yes; x11forwarding yes\n  After the drop-in: maxauthtries 3; permitrootlogin no;\n                     passwordauthentication no; x11forwarding no\n(\"without-password\", also spelled prohibit-password, allows root login with\nkeys but not passwords - better than yes, weaker than no.)\n\n2.3.4 File system and permissions\n  - Audit world-writable files and setuid/setgid binaries against a baseline\n    (Module 3).\n  - Restrictive umask (027) for system accounts and services.\n  - Consider mount options nodev, nosuid, noexec for /tmp, /var/tmp and\n    removable media where compatible.\n  - Protect sensitive files: /etc/shadow 640 root:shadow (Debian) or 000\n    (RHEL), sshd_config not world-readable where policy requires.\n\n2.3.5 Kernel and network parameters\nsysctl settings such as disabling IP forwarding on non-routers\n(net.ipv4.ip_forward=0), enabling reverse-path filtering, and restricting\nkernel pointer exposure; CIS Benchmarks list recommended values.\n\n2.3.6 Mandatory access control and logging\nKeep SELinux or AppArmor enforcing; enable auditd with rules for sensitive\nfiles and privileged commands; forward logs centrally (Module 3, Module 7).\n\n\n![C03-M08-D67: Linux Kernel Sysctl Hardening: Network Stack & Memory Attack Surface Reduction](/assets/courses/cyber-03/c03_m08_l03_sysctl_kernel_hardening.png)\n\n*Figure C03-M08-D67: Hardening the Linux kernel attack surface via /etc/sysctl.d/: disabling IP forwarding, enabling reverse path filtering, and restricting dmesg/ptrace.*\n\n"
    },
    {
      "id": "les_c3_m8_l4",
      "title": "8.4 Windows Hardening Essentials: ASR Rules, BitLocker, VBS & Credential Guard",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of ASR Rules, BitLocker, VBS & Credential Guard.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of ASR Rules, BitLocker, VBS & Credential Guard.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l4_c03_m08_d68",
          "title": "C03-M08-D68: Windows Attack Surface Reduction (ASR) Rules: Office, Scripting & LSASS Protection",
          "url": "/assets/courses/cyber-03/c03_m08_l04_windows_asr_rules.png",
          "caption": "Figure C03-M08-D68: Windows Defender Attack Surface Reduction (ASR) rules: blocking Office child processes, credential stealing from LSASS, and malicious scripts.",
          "alt": "Diagram illustrating Attack Surface Reduction ASR rules blocking child process creation from Office and credential stealing from lsass.exe"
        },
        {
          "id": "img_c3_m8_l4_c03_m08_d69",
          "title": "C03-M08-D69: Virtualization-Based Security (VBS) & Credential Guard: Isolating LSASS in Virtual Trust Level 1",
          "url": "/assets/courses/cyber-03/c03_m08_l04_vbs_credential_guard.png",
          "caption": "Figure C03-M08-D69: Hyper-V Virtualization-Based Security (VBS): moving credential secrets into isolated Virtual Trust Level 1 (VTL 1) beyond kernel Ring 0 reach.",
          "alt": "Architectural diagram of Virtualization-Based Security VBS separating Normal World VTL 0 from Secure World VTL 1 with Credential Guard"
        }
      ],
      "content": "## 8.4 Windows Hardening Essentials: ASR Rules, BitLocker, VBS & Credential Guard\n\n![C03-M08-D68: Windows Attack Surface Reduction (ASR) Rules: Office, Scripting & LSASS Protection](/assets/courses/cyber-03/c03_m08_l04_windows_asr_rules.png)\n\n*Figure C03-M08-D68: Windows Defender Attack Surface Reduction (ASR) rules: blocking Office child processes, credential stealing from LSASS, and malicious scripts.*\n\nLESSON C03-M08-L04: Windows hardening essentials\n================================================\n\n2.4.1 Baseline via Group Policy or Intune\nImport Microsoft Security Baselines into test GPOs (or Intune security\nbaselines), compare with existing policy using Policy Analyzer, pilot, then\ndeploy.\n\n2.4.2 Key areas\n  Accounts      standard users for daily work; Windows LAPS; disable built-in\n                Administrator and Guest (default); restrict local admin\n                membership (Module 5).\n  Credentials   LSA protection (RunAsPPL), Credential Guard where supported\n                (Module 5).\n  Legacy        SMBv1 removed (on the test machine the SMBv1 client driver\n  protocols     service mrxsmb10 was absent - not installed, as on current\n                Windows by default); disable NTLMv1 and LM; remove PowerShell\n                2.0 (Module 6).\n  Remote access RDP disabled unless needed (test machine: fDenyTSConnections\n                = 1, RDP disabled); if enabled, require Network Level\n                Authentication and restrict by firewall and group.\n  Services      disable unneeded services (Print Spooler on DCs and servers\n                that do not print - Module 5).\n  Logging       advanced audit policy, PowerShell logging, central collection\n                (Modules 6-7).\n  Encryption    BitLocker with TPM on laptops and where risk requires.\n  Boot          Secure Boot on; firmware passwords on managed devices\n                (Module 1).\n  Code control  application control (WDAC/App Control for Business or\n                AppLocker) - addresses NSA/CISA misconfiguration #10,\n                \"unrestricted code execution\".\n\n\n![C03-M08-D69: Virtualization-Based Security (VBS) & Credential Guard: Isolating LSASS in Virtual Trust Level 1](/assets/courses/cyber-03/c03_m08_l04_vbs_credential_guard.png)\n\n*Figure C03-M08-D69: Hyper-V Virtualization-Based Security (VBS): moving credential secrets into isolated Virtual Trust Level 1 (VTL 1) beyond kernel Ring 0 reach.*\n\n\n\n:::math-steps\n### Lynis Hardening Index Weighted Mathematical Formulation\nCalculating the aggregate system security posture score from automated compliance audit findings.\n\n#### Step 1: Test Result Scoring Weights\n$$\\text{Score} = \\sum_{i=1}^{T} w_i \\cdot c_i$$\nwhere $w_i \\in \\{1, 2, 3\\}$ is test criticality and $c_i \\in \\{0, 0.5, 1\\}$ is compliance status.\n\n#### Step 2: Normalization to 100-Point Index\n$$\\text{Hardening Index} = \\left( \\frac{\\sum_{i=1}^{T} w_i \\cdot c_i}{\\sum_{i=1}^{T} w_i} \\right) \\times 100$$\n\n#### Step 3: Before-and-After Lab Evaluation\n$$\\text{Index}_{\\text{Before}} = 59 \\implies 59\\% \\text{ compliance}$$\n$$\\text{Index}_{\\text{After}} = 82 \\implies 82\\% \\text{ compliance}$$\n$$\\Delta \\text{Posture} = +23\\% \\text{ attack surface reduction}$$\n:::\n\n"
    },
    {
      "id": "les_c3_m8_l5",
      "title": "8.5 Host Firewalls and Endpoint Protection: Stateful Rulesets, EDR & Default Deny",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Stateful Rulesets, EDR & Default Deny.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Stateful Rulesets, EDR & Default Deny.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l5_c03_m08_f2",
          "title": "C03-M08-F2: Layers of Host Defense: Identity, Configuration, Firewall, EDR & Telemetry",
          "url": "/assets/courses/cyber-03/C03-M08-F2.png",
          "caption": "Figure C03-M08-F2: Host defense-in-depth: identity governance, hardened configurations, stateful host firewalls, endpoint protection, and continuous monitoring.",
          "alt": "Layered security diagram illustrating defense-in-depth host protection from identity to configuration, firewall, EDR, and continuous monitoring"
        },
        {
          "id": "img_c3_m8_l5_c03_m08_d70",
          "title": "C03-M08-D70: Host Firewall Architecture: Linux nftables/iptables vs. Windows Defender Firewall with Advanced Security",
          "url": "/assets/courses/cyber-03/c03_m08_l05_host_firewalls_nftables_defender.png",
          "caption": "Figure C03-M08-D70: Architectural comparison of host-based firewalls: Linux nftables netfilter hooks (input, forward, output) and Windows Defender Firewall network profiles (Domain, Private, Public).",
          "alt": "Diagram comparing Linux nftables netfilter hooks with Windows Defender Firewall network location profiles and stateful rule processing"
        }
      ],
      "content": "## 8.5 Host Firewalls and Endpoint Protection: Stateful Rulesets, EDR & Default Deny\n\n![C03-M08-F2: Layers of Host Defense: Identity, Configuration, Firewall, EDR & Telemetry](/assets/courses/cyber-03/C03-M08-F2.png)\n\n*Figure C03-M08-F2: Host defense-in-depth: identity governance, hardened configurations, stateful host firewalls, endpoint protection, and continuous monitoring.*\n\nLESSON C03-M08-L05: Host firewalls and endpoint protection\n==========================================================\n\n2.5.1 Host firewalls\n  Windows Defender Firewall   profiles Domain/Private/Public; default block\n                              inbound (Course 01 Module 6 deep dive). Test\n                              machine (execution-tested): all three profiles\n                              enabled.\n  Linux                       nftables (modern framework), iptables\n                              compatibility (Course 02 Module 7), ufw\n                              (Ubuntu front end), firewalld (RHEL-family).\nServer policy: default deny inbound; allow only required services from\nrequired sources (for example SSH only from the management subnet); log\ndenials. Host firewalls complement network firewalls (defence in depth) and\nprotect hosts on untrusted networks.\n\n2.5.2 Endpoint protection\nModern endpoint protection combines signature and behaviour-based\nanti-malware, cloud intelligence, exploit and ransomware protections, and\noften EDR (endpoint detection and response) for investigation and response\n(Course 20). Microsoft Defender Antivirus settings can be read with\nGet-MpPreference and Get-MpComputerStatus (execution-tested, standard\nsession):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  ASR rules configured: 0\n  PUA protection: 2\n  Cloud protection (MAPSReporting): 2\n  Controlled folder access: 1\n  Tamper protection: True\n  Engine: 1.1.26100.4\n  --------------------------------------------------------------- END OUTPUT\n\nInterpretation (values as documented by Microsoft [C03-M08-R5]):\n  - Tamper protection True: settings are protected from being changed by\n    malicious software - good.\n  - Controlled folder access 1: enabled - protected folders can be modified\n    only by allowed applications (ransomware defence).\n  - PUA protection 2: audit mode - potentially unwanted applications are\n    logged but not blocked; consider enabling (1) after review.\n  - MAPSReporting 2: advanced cloud-delivered protection participation.\n  - Attack Surface Reduction rules: none configured. ASR rules block\n    behaviours commonly used by malware (for example Office applications\n    creating child processes, credential theft from LSASS). Enterprises\n    usually deploy them first in audit mode, review, then block\n    [C03-M08-R6].\n  - Secure Boot and BitLocker status could not be read in the standard\n    session (\"Access was denied\") - elevation is required for those checks.\n\n2.5.3 Linux endpoint protection\nOptions include EDR agents from security vendors, open-source tools such as\nClamAV (signature scanning) and host intrusion detection/FIM tools (for\nexample Wazuh agents, AIDE), plus auditd. Linux servers are frequently\ntargeted for cryptocurrency mining and ransomware, so \"Linux does not need\nprotection\" is a misconception.\n\n\n![C03-M08-D70: Host Firewall Architecture: Linux nftables/iptables vs. Windows Defender Firewall with Advanced Security](/assets/courses/cyber-03/c03_m08_l05_host_firewalls_nftables_defender.png)\n\n*Figure C03-M08-D70: Architectural comparison of host-based firewalls: Linux nftables netfilter hooks (input, forward, output) and Windows Defender Firewall network profiles (Domain, Private, Public).*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: THE BEFORE/AFTER HARDENING LAB\n--------------------------------------------------------------------------------\n\n3.1 Script and status\nLAB_ASSETS/C03/rk_c03_hardening_lab.sh - execution-tested in a throwaway\ndebian:stable-slim container (Debian 13; Lynis 3.1.4 and OpenSSH 10.0 from\nDebian repositories), Docker 29.4.2, 2026-11-07.\n\n3.2 The SSH drop-in file\n\n  ---------------------------------------------------------------- BEGIN CODE\n  # /etc/ssh/sshd_config.d/50-redkross-hardening.conf\n  PermitRootLogin no\n  PasswordAuthentication no\n  KbdInteractiveAuthentication no\n  X11Forwarding no\n  MaxAuthTries 3\n  LoginGraceTime 30\n  AllowAgentForwarding no\n  ------------------------------------------------------------------ END CODE\n\nWhy a drop-in file: package upgrades may update the main sshd_config; a\nseparate file keeps local hardening clear, reviewable and deployable by\nconfiguration management. Debian's main sshd_config includes\n/etc/ssh/sshd_config.d/*.conf near the top so drop-ins take effect (first\nvalue wins).\n\n3.3 Verification commands\n  sshd -t     test configuration syntax (\"sshd config syntax OK\" printed by\n              the script when it succeeds).\n  sshd -T     print the effective configuration; grep for the settings you\n              changed. This is stronger evidence than reading the file,\n              because it shows what sshd will actually use.\n\n3.4 Results summary (exact)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  == BEFORE\n    Warnings (1):\n    Suggestions (39):\n    Hardening index : 59 [###########         ]\n  maxauthtries 6\n  permitrootlogin without-password\n  passwordauthentication yes\n  x11forwarding yes\n  == VERIFY\n  maxauthtries 3\n  permitrootlogin no\n  passwordauthentication no\n  x11forwarding no\n  == AFTER\n    Warnings (1):\n    Suggestions (37):\n    Hardening index : 61 [############        ]\n  --------------------------------------------------------------- END OUTPUT\n\n3.5 Applying this to a real server\n  - Make sure key-based login works for your administrator account BEFORE\n    disabling passwords.\n  - Keep a second session open; restart sshd (systemctl restart ssh on\n    Debian/Ubuntu, sshd on RHEL-family); test a new login; only then close\n    the old session.\n  - Record the change and the evidence (sshd -T output) in the change\n    ticket.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M08-P1: Before/after Linux hardening with Lynis\n-------------------------------------------------------------\nObjective: Audit, harden, verify and re-audit a Linux system safely.\n\nDifficulty: Beginner/Intermediate.\n\nRequired tools: Docker; POSIX shell; LAB_ASSETS/C03/rk_c03_hardening_lab.sh.\n\nPrerequisites: Lessons L03, L06; Module 3.\n\nEnvironment setup: start Docker; copy the script.\n\nExplicit authorised scope: the disposable container created by the script.\n\nStep-by-step instructions:\n  1. Run sh rk_c03_hardening_lab.sh and compare your results with section\n     3.4 (your Lynis version and index may differ if packages changed).\n  2. Start an interactive container (docker run --rm -it debian:stable-slim\n     bash), install lynis, and run lynis audit system. Read the full list of\n     suggestions; choose five you would implement on a production server and\n     two you would not, with reasons.\n  3. Implement your five, re-run Lynis, and record evidence for each change\n     using direct commands (not only the index).\n  4. Write a one-page hardening record: baseline used, changes, evidence,\n     exceptions.\n\nExpected observations: modest index changes; direct verification shows each\nsetting.\n\nTroubleshooting: if apt is slow, retry; if sshd -T fails with \"Missing\nprivilege separation directory\", create /run/sshd (the script does this).\n\nCleanup: exit the container (it is deleted).\n\nLearning outcome: you can perform and document a hardening cycle.\n\nPRACTICAL C03-M08-P2: Windows endpoint protection review (own computer)\n-----------------------------------------------------------------------\nObjective: Assess Windows protection settings and recommend improvements.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell (standard and elevated).\n\nPrerequisites: Lessons L04-L05.\n\nEnvironment setup: your own Windows computer.\n\nExplicit authorised scope: your own computer; read-only commands. Do not\nchange Defender settings on a managed (work) device.\n\nStep-by-step instructions:\n  1. Run the Get-MpPreference / Get-MpComputerStatus commands behind section\n     2.5.2:\n     $p = Get-MpPreference; $s = Get-MpComputerStatus\n     $p.AttackSurfaceReductionRules_Ids; $p.PUAProtection;\n     $p.EnableControlledFolderAccess; $s.IsTamperProtected\n  2. In an elevated session, run Confirm-SecureBootUEFI and\n     Get-BitLockerVolume -MountPoint C: | Select-Object ProtectionStatus,\n     EncryptionPercentage.\n  3. Check firewall profiles (Get-NetFirewallProfile) and RDP state\n     (fDenyTSConnections).\n  4. Compare results with checklist items 6, 7, 8, 11 and 12 in L06.\n  5. Write recommendations (for example enable PUA blocking; consider ASR\n     rules in audit mode; enable BitLocker on laptops).\n\nExpected observations: on the content team's personal laptop, tamper\nprotection and Controlled Folder Access were on, PUA was in audit mode, no\nASR rules were configured and RDP was disabled. Results vary by device.\n\nTroubleshooting: \"Access denied\" for Secure Boot/BitLocker queries means you\nneed an elevated session; if Defender is replaced by another product, use\nthat product's console.\n\nCleanup: none.\n\nLearning outcome: you can evaluate endpoint protection posture with\nevidence.\n\n--------------------------------------------------------------------------------\n\n"
    },
    {
      "id": "les_c3_m8_l6",
      "title": "8.6 Auditing and the Hardening Capstone: Automated Scoring (Lynis) & Audit Rubrics",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Automated Scoring (Lynis) & Audit Rubrics.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Automated Scoring (Lynis) & Audit Rubrics.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m8_l6_c03_m08_d71",
          "title": "C03-M08-D71: Automated Security Auditing with Lynis: Architecture, Compliance Tests & Hardening Index",
          "url": "/assets/courses/cyber-03/c03_m08_l06_lynis_auditing_architecture.png",
          "caption": "Figure C03-M08-D71: Automated Linux security auditing architecture: Lynis test execution engine, modular test plugins, hardening index calculation, and report generation.",
          "alt": "Workflow diagram of Lynis security scanner executing automated compliance tests, outputting suggestions, and computing the hardening index"
        },
        {
          "id": "img_c3_m8_l6_c03_m08_d72",
          "title": "C03-M08-D72: Enterprise Hardening Capstone: The 15-Item Comprehensive Host Audit Rubric",
          "url": "/assets/courses/cyber-03/c03_m08_l06_capstone_audit_rubric.png",
          "caption": "Figure C03-M08-D72: The 15-point executive host audit rubric spanning identity, services, file integrity, logging, network attack surface, and rollback readiness.",
          "alt": "Audit checklist matrix diagram showing the 15-point host hardening rubric across Linux and Windows systems"
        }
      ],
      "content": "## 8.6 Auditing and the Hardening Capstone: Automated Scoring (Lynis) & Audit Rubrics\n\n![C03-M08-D71: Automated Security Auditing with Lynis: Architecture, Compliance Tests & Hardening Index](/assets/courses/cyber-03/c03_m08_l06_lynis_auditing_architecture.png)\n\n*Figure C03-M08-D71: Automated Linux security auditing architecture: Lynis test execution engine, modular test plugins, hardening index calculation, and report generation.*\n\nLESSON C03-M08-L06: Auditing and the hardening checklist\n========================================================\n\n2.6.1 Automated auditing tools\n  Lynis               open-source security auditing tool for Linux/Unix\n                      (CISOfy; in the RedKross blueprint tool map for Course\n                      03). Runs hundreds of tests and gives warnings,\n                      suggestions and a hardening index [C03-M08-R7].\n  OpenSCAP            evaluates systems against SCAP content (for example\n                      CIS or STIG profiles).\n  Microsoft Policy    compares Windows GPOs and local policy with Microsoft\n  Analyzer / Intune   baselines; Intune reports baseline compliance.\n  compliance\n\n2.6.2 Interpreting a Lynis audit (execution-tested)\nDefault Debian 13 container, Lynis 3.1.4 (lynis audit system --quick):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Hardening index : 59 [###########         ]\n  Tests performed : 234\n  Warnings (1):\n  ! klogd is not running, which could lead to missing kernel messages in log files [LOGG-2138]\n  Suggestions (39):\n  * This release is more than 4 months old. Check the website or GitHub to see if\n    there is an update available. [LYNIS]   (line wrapped for width)\n  * Install libpam-tmpdir to set $TMP and $TMPDIR for PAM sessions [DEB-0280]\n  * Install apt-listbugs to display a list of critical bugs prior to each APT installation. [DEB-0810]\n  * Install apt-listchanges to display any significant changes prior to any upgrade via APT. [DEB-0811]\n  --------------------------------------------------------------- END OUTPUT\n\nReading it critically:\n  - The warning about klogd reflects the container context (no kernel\n    logging daemon inside a container); on a full server it would matter.\n    Context determines relevance.\n  - \"Release more than 4 months old\" refers to the Lynis version packaged by\n    Debian; distribution packages lag upstream releases - a trade-off\n    between stability and newest checks (compare Module 2's release models).\n  - Each suggestion has a test ID (for example DEB-0280) and a link\n    explaining it; evaluate each against your baseline rather than\n    implementing everything.\n\nAfter applying the SSH drop-in, installing libpam-tmpdir and apt-listchanges,\nand tightening sshd_config permissions, the re-audit showed:\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Warnings (1):\n  Suggestions (37):\n  Hardening index : 61 [############        ]\n  --------------------------------------------------------------- END OUTPUT\n\nThe index moved only from 59 to 61 even though the SSH configuration changed\nsubstantially (verified directly with sshd -T). The lesson: the index is a\nrough guide; the real evidence is direct verification of each control.\n\n2.6.3 Cross-platform hardening audit checklist\n  +----+---------------------------------------+---------------------------+\n  | #  | Check                                 | Evidence (example)        |\n  +----+---------------------------------------+---------------------------+\n  | 1  | Supported OS version, fully patched   | os-release / build; patch |\n  |    |                                       | report; Get-HotFix        |\n  | 2  | Only required software and services   | package list; service     |\n  |    |                                       | list vs approved list     |\n  | 3  | No shared/unused accounts; admins     | account list; group       |\n  |    | minimal; LAPS (Windows)               | membership; LAPS status   |\n  | 4  | Privilege: sudo rules / UAC / no daily| sudo -l -U; whoami /groups|\n  |    | admin use                             |                           |\n  | 5  | Remote access hardened (SSH, RDP)     | sshd -T; RDP/NLA settings |\n  | 6  | Host firewall default-deny inbound    | nft list / Get-NetFirewall|\n  |    |                                       | Profile                   |\n  | 7  | Endpoint protection active, tamper-   | Get-MpComputerStatus; EDR |\n  |    | protected, updated                    | console                   |\n  | 8  | Legacy protocols disabled (SMBv1,     | feature/driver state;     |\n  |    | NTLMv1, PS 2.0, Telnet)               | policy                    |\n  | 9  | Permissions: no world-writable or     | find -perm; icacls on     |\n  |    | user-writable service/program paths  | service paths             |\n  | 10 | Logging enabled and forwarded;        | audit policy; journald/   |\n  |    | time synchronised                     | rsyslog config; NTP status|\n  | 11 | Disk encryption where required        | BitLocker / LUKS status   |\n  | 12 | Secure Boot enabled                   | Confirm-SecureBootUEFI /  |\n  |    |                                       | mokutil --sb-state        |\n  | 13 | Scheduled tasks and autostarts match  | crontab/timers; Autoruns  |\n  |    | baseline                              |                           |\n  | 14 | Backups exist and restores tested     | backup reports; test log  |\n  | 15 | Exceptions documented with expiry     | exception register        |\n  +----+---------------------------------------+---------------------------+\nThis checklist is the basis of the course capstone (Part C).\n\n--------------------------------------------------------------------------------\n\n![C03-M08-D72: Enterprise Hardening Capstone: The 15-Item Comprehensive Host Audit Rubric](/assets/courses/cyber-03/c03_m08_l06_capstone_audit_rubric.png)\n\n*Figure C03-M08-D72: The 15-point executive host audit rubric spanning identity, services, file integrity, logging, network attack surface, and rollback readiness.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M08-CS1: NSA and CISA \"Top Ten Cybersecurity\nMisconfigurations\" (AA23-278A, October 2023)\n---------------------------------------------------------------------\nContext: NSA and CISA red and blue teams assessed many large organisations\nand published the misconfigurations they found most often.\n\nWhat they reported: on 5 October 2023 NSA and CISA released advisory\nAA23-278A listing ten common misconfigurations [C03-M08-R1]:\n  1. Default configurations of software and applications\n  2. Improper separation of user/administrator privilege\n  3. Insufficient internal network monitoring\n  4. Lack of network segmentation\n  5. Poor patch management\n  6. Bypass of system access controls\n  7. Weak or misconfigured multifactor authentication (MFA) methods\n  8. Insufficient access control lists (ACLs) on network shares and services\n  9. Poor credential hygiene\n  10. Unrestricted code execution\n\nHow it maps to this course:\n  1 -> L01-L04 baselines; 2 -> Modules 3 and 5 (sudo, UAC, admin separation);\n  3 -> Modules 3, 6, 7 (logging); 4 -> Course 02 Module 6; 5 -> Module 7;\n  6 -> Module 5 (service paths, permissions); 7 -> Course 01 Module 5; 8 ->\n  Module 5 (NTFS and share permissions); 9 -> LAPS, no shared accounts; 10 ->\n  application control (L04) and Constrained Language Mode (Module 6).\n\nLessons learned:\n  - Most successful attacks exploit ordinary weaknesses, not exotic ones.\n  - A hardening programme organised around such lists gives measurable\n    progress.\n  - Verification matters as much as policy: assessors found these issues in\n    organisations that had policies.\n\nCASE STUDY C03-M08-CS2 (FICTIONAL TEACHING SCENARIO): The benchmark that\nbroke payroll\n----------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: Orchid Payments (fictional) applied a complete CIS Level 2 profile\nto all Windows servers in one change window to pass an audit.\n\nProblem: several settings (restricting older authentication protocols and\nremoving a legacy component) broke a payroll integration that relied on\nthem. Payroll ran late; the team rolled back the whole baseline, leaving all\nservers unhardened for weeks.\n\nResponse: the team restarted with Level 1, tested each group of settings in\na pilot, documented two exceptions with compensating controls and expiry\ndates, and asked the payroll vendor for a supported, secure integration.\n\nLessons: test and stage baselines; record exceptions instead of abandoning\nthe whole baseline; plan legacy remediation.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M08-F1: Hardening lifecycle\nPurpose: Show baselines as a continuous process.\n\n  [BEGIN DIAGRAM]\n  [Select baseline + version] -> [Review vs business needs] -> [Test in lab]\n            ^                                                      |\n            |                                                      v\n  [Update baseline] <- [Correct drift] <- [Audit continuously] <- [Deploy in\n   (new versions,       (auto or via       (Lynis, OpenSCAP,       rings via\n    threats)             change control)    Policy Analyzer,       GPO/Intune/\n                                            Intune compliance)     Ansible)\n                         [Exceptions: reason, compensating control, expiry]\n  [END DIAGRAM]\n\nCaption: Figure C03-M08-F1. Baselines are selected, reviewed, tested,\ndeployed, audited and corrected in a continuous loop with documented\nexceptions.\nAccessibility description: A loop: select baseline, review, test, deploy in\nrings, audit continuously, correct drift, update baseline, back to select.\nA note shows exceptions with reasons, compensating controls and expiry.\n\nFIGURE C03-M08-F2: Layers of host defence\nPurpose: Show how host controls stack.\n\n  [BEGIN DIAGRAM]\n  | Logging & monitoring: audit policy/auditd, PowerShell logs,   |\n  | central SIEM                                                  |\n  |  +---------------------------------------------------------+  |\n  |  | Endpoint protection: AV/EDR, ASR, tamper protection,    |  |\n  |  | Controlled Folder Access                                 |  |\n  |  |  +---------------------------------------------------+  |  |\n  |  |  | Host firewall: default deny inbound               |  |  |\n  |  |  |  +---------------------------------------------+  |  |  |\n  |  |  |  | Configuration: baseline, services, SSH/RDP,  |  |  |  |\n  |  |  |  | legacy protocols off, app control            |  |  |  |\n  |  |  |  |  +---------------------------------------+  |  |  |  |\n  |  |  |  |  | Identity & privilege: no daily admin,  |  |  |  |  |\n  |  |  |  |  | sudo/UAC, LAPS, LSA protection         |  |  |  |  |\n  |  |  |  |  |   [ OS + DATA: patched, encrypted ]    |  |  |  |  |\n  |  |  |  |  +---------------------------------------+  |  |  |  |\n  [END DIAGRAM]\n\nCaption: Figure C03-M08-F2. Host defence layers from identity and\nconfiguration through firewall and endpoint protection to monitoring.\nAccessibility description: Nested boxes. Innermost: patched and encrypted\nOS and data. Then identity and privilege, configuration hardening, host\nfirewall, endpoint protection, and outermost logging and monitoring.\n\nFIGURE C03-M08-F3: SSH settings before and after (lab evidence)\nPurpose: Visualise the verified change.\n\n  [BEGIN DIAGRAM]\n   setting                 BEFORE (default)        AFTER (drop-in)\n   ----------------------  ----------------------  ----------------\n   permitrootlogin         without-password        no\n   passwordauthentication  yes                     no\n   x11forwarding           yes                     no\n   maxauthtries            6                       3\n   Lynis hardening index   59                      61\n   Lynis suggestions       39                      37\n  [END DIAGRAM]\n\nCaption: Figure C03-M08-F3. Effective SSH settings (sshd -T) and Lynis\nresults before and after hardening in the course lab.\nAccessibility description: A three-column table comparing four SSH settings\nand two Lynis metrics before and after hardening.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nHardening minimises attack surface, enforces least privilege, replaces\ninsecure defaults, layers defences, maintains and verifies. Baselines (CIS\nBenchmarks Levels 1/2, Microsoft Security Baselines with Policy Analyzer,\nDISA STIGs, vendor guides, SCAP content) document required settings; apply\nthem through review, testing, ring deployment, documented exceptions and\ncontinuous audit. Linux essentials: minimal packages and automatic security\nupdates, named accounts with sudo, SSH hardening via drop-in files verified\nwith sshd -t/-T (PermitRootLogin no, PasswordAuthentication no, X11Forwarding\nno, MaxAuthTries 3), permission and setuid audits, mount options, sysctl,\nSELinux/AppArmor, auditd and central logs. Windows essentials: baselines via\nGPO/Intune, standard users and LAPS, LSA protection, legacy protocols off\n(SMBv1, NTLMv1, PowerShell 2.0), RDP restricted, unneeded services off,\nlogging, BitLocker, Secure Boot, application control. Host firewalls default\ndeny inbound; endpoint protection includes tamper protection, Controlled\nFolder Access, PUA blocking, ASR rules and EDR - as the test laptop's\nsettings illustrated. Lynis audits Linux (index 59 -> 61 in the lab) but\nscores need critical interpretation and direct verification. A 15-item\nchecklist structures audits. NSA/CISA AA23-278A lists the ten most common\nmisconfigurations.\n\n8.2 Important concepts\n  - Verify settings directly; scores are guides.\n  - Stage baselines; record exceptions.\n  - Protect the protections (tamper protection, admin separation).\n  - Hardening is continuous.\n\n8.3 Key technical takeaways\n  - sshd -t / sshd -T; drop-ins in /etc/ssh/sshd_config.d/.\n  - lynis audit system [--quick].\n  - Get-MpPreference / Get-MpComputerStatus; Confirm-SecureBootUEFI and\n    Get-BitLockerVolume (elevated).\n\n8.4 Glossary\n  ASR rules          Defender Attack Surface Reduction rules.\n  Baseline           Required secure configuration for a system class.\n  CIS Benchmark      Consensus configuration guide (Levels 1 and 2).\n  Controlled folder  Defender ransomware protection for folders.\n  access\n  Drop-in file       Additional configuration file included by a main file.\n  Hardening          Reducing attack surface and strengthening config.\n  Hardening index    Lynis aggregate score.\n  Lynis              Open-source security auditing tool.\n  OpenSCAP           SCAP-based compliance scanner.\n  PUA                Potentially unwanted application.\n  Security baseline  Microsoft-recommended policy settings (SCT).\n  STIG               Security Technical Implementation Guide.\n  Tamper protection  Defender feature preventing setting changes.\n\n8.5 Common mistakes\n  - Applying entire benchmarks untested.\n  - Disabling SSH passwords before testing keys.\n  - Treating audit scores as objectives.\n  - Ignoring context in tool findings.\n  - Permanent, undocumented exceptions.\n\n8.6 Revision questions\n  1. Explain the difference between CIS Level 1 and Level 2.\n  2. Write an SSH drop-in for a bastion host and the verification steps.\n  3. Interpret three Defender preference values.\n  4. Map five AA23-278A items to controls from this course.\n  5. Design a monthly hardening audit process.\n\n8.7 Further reading\n  - CISA/NSA AA23-278A [C03-M08-R1].\n  - CIS Benchmarks [C03-M08-R2].\n  - Microsoft Security Compliance Toolkit [C03-M08-R3].\n  - Lynis documentation [C03-M08-R7].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
