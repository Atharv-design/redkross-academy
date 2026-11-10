/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 8 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module8QuestionBank = [
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
  },
  {
    "id": "q_c3_m8_021",
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
    "id": "q_c3_m8_022",
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
    "id": "q_c3_m8_023",
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
    "id": "q_c3_m8_024",
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
    "id": "q_c3_m8_025",
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
    "id": "q_c3_m8_026",
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
    "id": "q_c3_m8_027",
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
    "id": "q_c3_m8_028",
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
    "id": "q_c3_m8_029",
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
    "id": "q_c3_m8_030",
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
    "id": "q_c3_m8_031",
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
    "id": "q_c3_m8_032",
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
    "id": "q_c3_m8_033",
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
    "id": "q_c3_m8_034",
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
    "id": "q_c3_m8_035",
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
    "id": "q_c3_m8_036",
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
    "id": "q_c3_m8_037",
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
    "id": "q_c3_m8_038",
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
    "id": "q_c3_m8_039",
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
    "id": "q_c3_m8_040",
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
    "id": "q_c3_m8_041",
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
    "id": "q_c3_m8_042",
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
    "id": "q_c3_m8_043",
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
    "id": "q_c3_m8_044",
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
    "id": "q_c3_m8_045",
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
    "id": "q_c3_m8_046",
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
    "id": "q_c3_m8_047",
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
    "id": "q_c3_m8_048",
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
    "id": "q_c3_m8_049",
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
    "id": "q_c3_m8_050",
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
    "id": "q_c3_m8_051",
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
    "id": "q_c3_m8_052",
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
    "id": "q_c3_m8_053",
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
    "id": "q_c3_m8_054",
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
    "id": "q_c3_m8_055",
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
    "id": "q_c3_m8_056",
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
    "id": "q_c3_m8_057",
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
    "id": "q_c3_m8_058",
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
    "id": "q_c3_m8_059",
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
    "id": "q_c3_m8_060",
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
    "id": "q_c3_m8_061",
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
    "id": "q_c3_m8_062",
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
    "id": "q_c3_m8_063",
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
    "id": "q_c3_m8_064",
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
    "id": "q_c3_m8_065",
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
    "id": "q_c3_m8_066",
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
    "id": "q_c3_m8_067",
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
    "id": "q_c3_m8_068",
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
    "id": "q_c3_m8_069",
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
    "id": "q_c3_m8_070",
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
    "id": "q_c3_m8_071",
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
    "id": "q_c3_m8_072",
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
    "id": "q_c3_m8_073",
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
    "id": "q_c3_m8_074",
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
    "id": "q_c3_m8_075",
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
    "id": "q_c3_m8_076",
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
    "id": "q_c3_m8_077",
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
    "id": "q_c3_m8_078",
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
    "id": "q_c3_m8_079",
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
    "id": "q_c3_m8_080",
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
    "id": "q_c3_m8_081",
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
    "id": "q_c3_m8_082",
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
    "id": "q_c3_m8_083",
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
    "id": "q_c3_m8_084",
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
    "id": "q_c3_m8_085",
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
    "id": "q_c3_m8_086",
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
    "id": "q_c3_m8_087",
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
    "id": "q_c3_m8_088",
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
    "id": "q_c3_m8_089",
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
    "id": "q_c3_m8_090",
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
    "id": "q_c3_m8_091",
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
    "id": "q_c3_m8_092",
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
    "id": "q_c3_m8_093",
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
    "id": "q_c3_m8_094",
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
    "id": "q_c3_m8_095",
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
    "id": "q_c3_m8_096",
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
    "id": "q_c3_m8_097",
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
    "id": "q_c3_m8_098",
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
    "id": "q_c3_m8_099",
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
    "id": "q_c3_m8_100",
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
    "id": "q_c3_m8_101",
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
    "id": "q_c3_m8_102",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_103",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_104",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_105",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_106",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_107",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_108",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_109",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_110",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_111",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_112",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_113",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_114",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_115",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_116",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_117",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_118",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_119",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_120",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_121",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_122",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_123",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_124",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_125",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_126",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_127",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_128",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_129",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_130",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_131",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_132",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_133",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_134",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_135",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_136",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_137",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_138",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_139",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_140",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_141",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_142",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_143",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_144",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_145",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_146",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_147",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_148",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_149",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_150",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_151",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_152",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_153",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_154",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_155",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_156",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_157",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_158",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_159",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_160",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_161",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_162",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_163",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_164",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_165",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_166",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_167",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_168",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_169",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_170",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_171",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_172",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_173",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_174",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_175",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_176",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_177",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_178",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_179",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_180",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_181",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_182",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_183",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_184",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_185",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_186",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_187",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_188",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_189",
    "topic": "Virtualization-Based Security (VBS) & Credential Guard",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_190",
    "topic": "Host Firewalls (nftables vs. Windows Defender Firewall)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_191",
    "topic": "Automated Auditing with Lynis & Hardening Index Scoring",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_192",
    "topic": "Enterprise Hardening Capstone: 15-Point Host Audit Rubric",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_193",
    "topic": "Hardening Principles & Threat Surface Reduction",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_194",
    "topic": "Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_195",
    "topic": "Safe Baseline Deployment & Snapshot Rollback Playbooks",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_196",
    "topic": "Blast Radius Containment & Change Management",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_197",
    "topic": "Linux SSH Daemon Hardening (Key-Only, PermitRootLogin no)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_198",
    "topic": "Linux Kernel Sysctl Hardening (rp_filter, ptrace_scope)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_199",
    "topic": "Linux Mandatory Access Control (AppArmor & SELinux)",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  },
  {
    "id": "q_c3_m8_200",
    "topic": "Windows Attack Surface Reduction (ASR) Rules",
    "difficulty": "difficult",
    "q": "A cybersecurity team runs an automated Lynis audit on a hardened Debian server. The hardening index rises from 59 to 82, but fails to reach 100. What is the correct architectural conclusion?",
    "options": [
      "The hardening index is a guideline; a score of 100 is neither realistic nor desirable because full lockdown disables legitimate services and management.",
      "The Lynis scanner is corrupted and requires uninstallation and reinstallation from source.",
      "The hardening deployment failed completely and must be rolled back immediately.",
      "The kernel was compromised by a rootkit that artificially capped the audit scoring algorithm."
    ],
    "correct": 0,
    "explanation": "Hardening indexes (Lynis, CIS) reflect an aggregate posture. Achieving 100 is typically impossible and counterproductive in production, as it requires disabling necessary network interfaces, file systems, and administrative functions."
  }
];
