/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 3 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module3QuestionBank = [
  {
    "id": "q_c3_m3_001",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "In /etc/shadow, what is the role of the cryptographic salt string positioned before the hashed password value?",
    "options": [
      "It introduces unique random entropy so identical user passwords produce completely different hash outputs, defeating pre-computed rainbow table attacks.",
      "It encrypts the password hash with the host's TPM 2.0 endorsement key.",
      "It limits the maximum password length to 64 alphanumeric characters.",
      "It records the timestamp of the last password modification in epoch days."
    ],
    "correct": 0,
    "explanation": "Salting prevents dictionary and rainbow table attacks. Even if two users choose the same password, unique salts ensure their stored cryptographic hashes are completely distinct."
  },
  {
    "id": "q_c3_m3_002",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "An unprivileged user attempts to execute \"cat /srv/secure/data.txt\". The user has read access on data.txt, but lacks execute (traverse) permission on the directory /srv/secure. What is the result?",
    "options": [
      "Permission denied (EACCES) — traversing a path requires execute (x) permission on every parent directory in the path.",
      "The cat utility reads the file successfully because file-level permissions supersede parent directory permissions.",
      "The kernel prompts the user for their account password via PAM.",
      "The file is copied into /tmp where the user reads it."
    ],
    "correct": 0,
    "explanation": "Traverse permission (x) is mandatory on EVERY directory along the entire path. Without execute rights on /srv/secure, the kernel blocks directory lookup, returning Permission Denied."
  },
  {
    "id": "q_c3_m3_003",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_004",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_005",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_006",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_007",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_008",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_009",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_010",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_011",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_012",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_013",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_014",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_015",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_016",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_017",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_018",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_019",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_020",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_021",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_022",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_023",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_024",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_025",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_026",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_027",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_028",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_029",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_030",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_031",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_032",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_033",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_034",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_035",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_036",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_037",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_038",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_039",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_040",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_041",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_042",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_043",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_044",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_045",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_046",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_047",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_048",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_049",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_050",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_051",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_052",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_053",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_054",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_055",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_056",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_057",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_058",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_059",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_060",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_061",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_062",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_063",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_064",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_065",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_066",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_067",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_068",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_069",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_070",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_071",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_072",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_073",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_074",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_075",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_076",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_077",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_078",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_079",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_080",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_081",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_082",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_083",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_084",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_085",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_086",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_087",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_088",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_089",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_090",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_091",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_092",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_093",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_094",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_095",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_096",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_097",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_098",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_099",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_100",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "medium",
    "q": "Which special permission bit on a Linux executable file causes the process to run with the effective privileges of the file owner rather than the executing user?",
    "options": [
      "Setuid (SUID) bit, represented by an octal value of 4000 or an \"s\" in the owner execute slot.",
      "Setgid (SGID) bit, represented by an octal value of 2000 or an \"s\" in the group execute slot.",
      "Sticky bit, represented by an octal value of 1000 or a \"t\" in the other execute slot.",
      "Immutable bit, configured via chattr +i to prevent process deletion."
    ],
    "correct": 0,
    "explanation": "The SUID (Set User ID) bit sets the Effective UID (EUID) of the running process to the owner of the binary file (e.g. /usr/bin/passwd running as root)."
  },
  {
    "id": "q_c3_m3_101",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_102",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_103",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_104",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_105",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_106",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_107",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_108",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_109",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_110",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_111",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_112",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_113",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_114",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_115",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_116",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_117",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_118",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_119",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_120",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_121",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_122",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_123",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_124",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_125",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_126",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_127",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_128",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_129",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_130",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_131",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_132",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_133",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_134",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_135",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_136",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_137",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_138",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_139",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_140",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_141",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_142",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_143",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_144",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_145",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_146",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_147",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_148",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_149",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_150",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_151",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_152",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_153",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_154",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_155",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_156",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_157",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_158",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_159",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_160",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_161",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_162",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_163",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_164",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_165",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_166",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_167",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_168",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_169",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_170",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_171",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_172",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_173",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_174",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_175",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_176",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_177",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_178",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_179",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_180",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_181",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_182",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_183",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_184",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_185",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_186",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_187",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_188",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_189",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_190",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_191",
    "topic": "Linux Account Databases & Shadow Password Cryptography",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_192",
    "topic": "Primary & Supplementary Group Identities",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_193",
    "topic": "Octal & Symbolic File Permissions",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_194",
    "topic": "Directory Permission Semantics (Traverse vs List)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_195",
    "topic": "Special Permission Bits (SUID, SGID, Sticky)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_196",
    "topic": "POSIX Extended Access Control Lists (ACLs)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_197",
    "topic": "Sudo Architecture & Sudoers Grammar",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_198",
    "topic": "Sudo Least Privilege & Drop-in Configurations",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_199",
    "topic": "Package Integrity Verification (dpkg -V / rpm -V)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  },
  {
    "id": "q_c3_m3_200",
    "topic": "Linux Logging Architecture (journald, rsyslog, logrotate)",
    "difficulty": "difficult",
    "q": "A system auditor reviews '/etc/sudoers.d/deploy' and finds: 'devops ALL=(ALL) /usr/bin/vi /etc/nginx/nginx.conf'. How can an operator with this privilege trivially escalate to an unconstrained root shell?",
    "options": [
      "Inside the vi editor, executing the command \":!/bin/bash\" spawns an interactive root shell with full supervisor privileges.",
      "vi automatically deletes /etc/shadow if opened with elevated rights without the -R read-only flag.",
      "The sudo command ignores command-line path arguments when the executable is an interactive text editor.",
      "The devops user can append an SUID bit to the vi binary directly from within the editor status bar."
    ],
    "correct": 0,
    "explanation": "Interactive editors like vi, nano, and less possess shell escape features (e.g. :!sh). Granting sudo rights to run vi as root allows trivial escape to an unconstrained root shell (see GTFOBins)."
  }
];
