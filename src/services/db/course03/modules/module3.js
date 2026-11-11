/**
 * Course 03: Linux and Windows System Administration
 * Module 3: Linux Administration & Permissions
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module3Data = {
  "id": "mod_c3_3",
  "title": "Module 3: Linux Administration & Permissions",
  "description": "Administrative governance of Linux endpoints and servers: user account databases, shadow password hashes, standard and special permission bitmasks (SUID, SGID, Sticky), POSIX extended ACLs, sudo policy enforcement, package repository verification, and system logging.",
  "order": 3,
  "quiz": {
    "id": "quiz_mod_c3_3",
    "title": "Module 3: Linux Administration & Permissions Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
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
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m3_l1",
      "title": "3.1 Users and Groups: Account Databases, UIDs/GIDs & Shadow Password Cryptography",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Account Databases, UIDs/GIDs & Shadow Password Cryptography.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Account Databases, UIDs/GIDs & Shadow Password Cryptography.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l1_c03_m03_d19",
          "title": "C03-M03-D19: Linux Account Architecture: /etc/passwd & /etc/shadow Cryptographic Schema",
          "url": "/assets/courses/cyber-03/c03_m03_l01_account_databases_schemas.png",
          "caption": "Figure C03-M03-D19: Structural breakdown of fields in /etc/passwd and the cryptographic salt and password hash fields in /etc/shadow.",
          "alt": "Dissection diagram of /etc/passwd and /etc/shadow line fields showing username, UID, GID, home directory, shell, and salted SHA-512 password hashes"
        },
        {
          "id": "img_c3_m3_l1_c03_m03_d20",
          "title": "C03-M03-D20: Linux Identity Boundaries: UIDs, GIDs & Supplementary Group Memberships",
          "url": "/assets/courses/cyber-03/c03_m03_l01_uid_gid_identity_matrix.png",
          "caption": "Figure C03-M03-D20: Relationship between primary user identities (UIDs), primary groups, and supplementary groups defined in /etc/group.",
          "alt": "Diagram showing user identity with primary UID, primary GID, and multiple supplementary groups granting aggregated permissions"
        }
      ],
      "content": "## 3.1 Users and Groups: Account Databases, UIDs/GIDs & Shadow Password Cryptography\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-D19: Linux Account Architecture: /etc/passwd & /etc/shadow Cryptographic Schema](/assets/courses/cyber-03/c03_m03_l01_account_databases_schemas.png)\n\n*Figure C03-M03-D19: Structural breakdown of fields in /etc/passwd and the cryptographic salt and password hash fields in /etc/shadow.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **/etc/passwd User Record Architecture:** Displays the colon-delimited structure of the primary user database (`username:password_placeholder:UID:GID:GECOS:home_directory:login_shell`). The second field contains the literal character `x`, signaling to authentication modules (such as PAM) that the actual password hash is isolated in the shadow database. System accounts occupy UIDs 1–999, while human interactive user accounts begin at UID 1000 on modern Linux distributions.\n- **/etc/shadow Cryptographic Hash Subsystem:** Highlights the segregated password store accessible strictly by root (`0640` or `0600` permissions). The hash field is deconstructed into three modular segments: the algorithm identifier (e.g., `$6$` for SHA-512, `$y$` for yescrypt), the cryptographic salt string (high-entropy random characters), and the resulting one-way digest value.\n- **Salt Entropy & Defense Mechanics:** The cryptographic salt prevents precomputation attacks by ensuring that two users with identical plaintext passwords produce entirely distinct hash digests, effectively neutralizing offline rainbow table lookups.\n- **Aging & Expiration Fields:** Illustrates the trailing numerical fields regulating password policy: date of last password change (expressed in days since the Unix epoch), minimum password lifetime (preventing immediate cycling), maximum password lifetime (forcing periodic rotation), and account inactivity and expiration boundaries.\n- **Defensive Engineering Implication:** If `/etc/passwd` inadvertently contains raw password hashes rather than `x`, or if permissions on `/etc/shadow` become world-readable (`0644`), unprivileged attackers can copy the hashes offline and execute dictionary and brute-force cracking attacks using tools like Hashcat or John the Ripper.\n\n### 2.1.1 Accounts are numbers\n\nThe kernel identifies users by user ID (UID) and groups by group ID (GID);\nnames are for humans. Conventions on Debian/Ubuntu:\n- **UID 0:** Root superuser account (all-powerful).\n- **UID 1-999:** System and daemon service accounts.\n- **UID 1000+:** Standard human user accounts.\n\n### 2.1.2 The account files\n\n- **/etc/passwd:** One line per account, readable by everyone: name:x:UID:GID:comment:home:shell The \"x\" means the password hash is stored in /etc/shadow.\n- **/etc/shadow:** Password hashes and ageing data, readable only by root (and the shadow group). Fields include last change date (days since 1970-01-01), minimum and maximum age, warning period, and expiry.\n- **/etc/group:** Group definitions: name:x:GID:members.\n\nExecution-tested (Debian 13 container):\n\n```bash\ngroupadd finance\n  useradd -m -s /bin/bash -G finance asha\n  useradd -m -s /bin/bash ben\n  id asha; id ben\n  getent group finance\n```\n\n```terminal\nuid=1000(asha) gid=1001(asha) groups=1001(asha),1000(finance)\n  uid=1001(ben) gid=1002(ben) groups=1002(ben)\n  finance:x:1000:asha\n```\n\n- **groupadd finance:** create a group.\n- **useradd -m:** create the home directory; -s sets the login shell; -G adds supplementary groups. Debian also provides the friendlier interactive adduser.\n- **id:** shows UID, primary group and all groups.\n- **getent group:** queries the group database (works with directory services such as LDAP as well as local files).\nNote each user received a private primary group of the same name (\"user\nprivate groups\"), a Debian/Ubuntu default.\n\nThe shadow entry (hash field deliberately not displayed):\n  asha:20764:0:99999    last change 20764 days after 1970-01-01, minimum\n                        age 0, maximum 99999 (effectively never expires).\n\n### 2.1.3 Modifying, locking and expiring accounts\n\n- **passwd asha:** Set or change a password interactively.\n- **usermod -aG grp user:** Add user to a group (-a appends; omitting it replaces all supplementary groups).\n- **usermod -L user:** Lock the password (prefix \"!\" in shadow).\n- **chage -E 0 user:** expire the account (no logins of any kind via PAM)\n- **userdel -r user:** delete user and home directory (archive first!)\nExecution-tested: after usermod -L ben, passwd -S ben reported\n\"ben L 2026-11-07 0 99999 7 -1\" (L = locked), and after chage -E 0 ben,\nchage -l showed \"Account expires : Jan 01, 1970\".\nSecurity note: locking the password alone does not block SSH key logins;\nfor leavers, expire the account (chage -E 0), remove keys and revoke sudo.\n\n### 2.1.4 Service and system accounts\n\nAccounts such as www-data, syslog and nobody exist so services do not run\nas root. They should have shells like /usr/sbin/nologin (seen in Module 2's\n/etc/passwd output) and no passwords.\n\n### 2.1.5 Authentication plumbing (overview)\n\nLinux uses PAM (Pluggable Authentication Modules) to decide how logins are\nauthenticated (passwords, MFA modules, directory services) and NSS (Name\nService Switch, /etc/nsswitch.conf) to look up account information. Enterprise\nsystems often join a directory (Active Directory or LDAP, Course 13) through\nSSSD.\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D20: Linux Identity Boundaries: UIDs, GIDs & Supplementary Group Memberships](/assets/courses/cyber-03/c03_m03_l01_uid_gid_identity_matrix.png)\n\n*Figure C03-M03-D20: Relationship between primary user identities (UIDs), primary groups, and supplementary groups defined in /etc/group.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Subject Identity Context:** Highlights the kernel credentials assigned to a process token upon login, anchored by the primary User ID (UID 1002, e.g., `secops`). Every file created by this subject defaults to this owner UID.\n- **Primary Group Attribution:** Points from the user identity to the primary Group ID (GID 1002). In User Private Group (UPG) schemes, each user receives a unique matching group, ensuring that files created with default umasks remain unexposed to other system users.\n- **Supplementary Group Aggregation:** Shows additional group memberships defined in `/etc/group` (`group_name:password_placeholder:GID:member_list`). The diagram traces supplementary access vectors: the `sudo` group (GID 27) granting administrative command execution, the `adm` group (GID 4) permitting read access to protected logs, and the `docker` group (GID 999) granting write access to the Unix control socket.\n- **Kernel Credential Evaluation:** When a process executes a system call requesting filesystem access, the Linux kernel checks the process's effective UID against the file's owner, followed by the process's effective GID and all supplementary GIDs against the file's group.\n- **Security Boundary & Least Privilege:** Demonstrates why administrative group memberships must be closely monitored; granting access to secondary groups like `docker` or `disk` is functionally equivalent to granting full root privileges due to arbitrary container mounting or raw disk block device access."
    },
    {
      "id": "les_c3_m3_l2",
      "title": "3.2 Permissions and Ownership: Octal/Symbolic Representation & Access Decision Logic",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Octal/Symbolic Representation & Access Decision Logic.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Octal/Symbolic Representation & Access Decision Logic.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l2_c03_m03_f1",
          "title": "C03-M03-F1: Linux Permission Bits: Octal Bitmasks, Triads & Special Attributes",
          "url": "/assets/courses/cyber-03/C03-M03-F1.png",
          "caption": "Figure C03-M03-F1: Octal digits map to special bits and owner/group/other permissions; special bits appear as s or t in directory listings.",
          "alt": "Diagram mapping 4-digit octal permission values to binary bits, symbolic triads (rwx), and special bits (SUID, SGID, Sticky)"
        },
        {
          "id": "img_c3_m3_l2_c03_m03_d21",
          "title": "C03-M03-D21: Directory Permission Semantics: Read (List), Write (Create/Delete), Execute (Traverse)",
          "url": "/assets/courses/cyber-03/c03_m03_l02_directory_permissions_semantics.png",
          "caption": "Figure C03-M03-D21: Crucial operational distinction of r, w, x on directories: 'r' lists contents, 'w' creates/deletes entries, and 'x' enables traversing and accessing files.",
          "alt": "Diagram contrasting file permissions with directory permissions, emphasizing directory traverse requirement"
        }
      ],
      "content": "## 3.2 Permissions and Ownership: Octal/Symbolic Representation & Access Decision Logic\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-F1: Linux Permission Bits: Octal Bitmasks, Triads & Special Attributes](/assets/courses/cyber-03/C03-M03-F1.png)\n\n*Figure C03-M03-F1: Octal digits map to special bits and owner/group/other permissions; special bits appear as s or t in directory listings.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Four-Digit Octal Decomposition:** Deconstructs the full 12-bit POSIX permission word into four octal columns: Special Attributes (Bits 11–9), Owner Permissions (Bits 8–6), Group Permissions (Bits 5–3), and Other/World Permissions (Bits 2–0).\n- **Binary Weighting & Arithmetic Mapping:** Each triad represents a 3-bit binary vector where Read (`r`) carries weight 4 (`100_2`), Write (`w`) carries weight 2 (`010_2`), and Execute (`x`) carries weight 1 (`001_2`). The arithmetic sum of set bits determines the octal value (e.g., `r-x` = 4 + 0 + 1 = 5; `rwx` = 4 + 2 + 1 = 7).\n- **Special Bits Triad:** Analyzes the uppermost octal digit: Setuid (weight 4, `4000`), Setgid (weight 2, `2000`), and the Sticky Bit (weight 1, `1000`). Setting these bits alters runtime process credentials or filesystem deletion semantics.\n- **Visual Display Overrides in Directory Listings:** Shows how `ls -l` formats special bits over the execute character slots. SUID replaces the owner execute bit with `s` (or `S` if the underlying execute bit is not set). SGID replaces the group execute bit with `s` (or `S`). The Sticky Bit replaces the other execute bit with `t` (or `T`).\n- **Defensive Auditing Invariant:** System administrators must periodically execute `find / -perm -4000 -o -perm -2000` to catalog all binaries executing with elevated privileges and verify that no unauthorized SUID/SGID binaries have been introduced.\n\n### 2.2.1 The model\n\nEvery file has an owner (user), a group, and three sets of permissions:\n- **u:** user (owner)\n- **g:** group\n- **o:** others (everyone else)\nEach set has:\n- **r:** read     (files: read contents; directories: list names)\n- **w:** write    (files: modify; directories: create, delete, rename entries)\n- **x:** execute  (files: run; directories: enter/traverse, access entries)\nDirectory permissions often surprise people: deleting a file requires write\npermission on the directory, not on the file.\n\n### 2.2.2 Numeric (octal) notation\n\nr = 4, w = 2, x = 1; add them per set:\n  7 = rwx   6 = rw-   5 = r-x   4 = r--   0 = ---\n- **chmod 640 file:** -> owner rw-, group r--, others ---\n- **chmod 750 dir:** -> owner rwx, group r-x, others ---\n\n### 2.2.3 Symbolic notation\n\n- **chmod u+x file:** Add execute permission for owner.\n- **chmod o-r file:** Remove read permission for others.\n- **chmod g=rw file:** Set group permissions exactly to read and write.\n- **chmod a-w file:** Remove write permission for all users.\nExecution-tested:\n\n```terminal\n640 -rw-r----- /tmp/report.txt        (after chmod 640)\n  740 -rwxr----- /tmp/report.txt        (after chmod u+x,o-r)\n```\n\n  (stat -c '%a %A %n' prints octal mode, symbolic mode and name.)\n\n### 2.2.4 Ownership\n\n- **chown asha file:** Change file owner.\n- **chown asha:finance file:** Change file owner and primary group simultaneously.\n- **chgrp finance file:** Change primary group.\n- **chown -R ...:** recursively (use with care)\nOnly root can give files to another user (this prevents users from evading\ndisk quotas or framing others).\n\n### 2.2.5 umask\n\nThe umask removes permissions from the defaults applied when files (base\n666) and directories (base 777) are created.\nExecution-tested as user asha:\n  umask -> 0002; new file 664; new directory 775\n  after umask 027; new file 640\n0002 removes write for others; 027 removes write for group and all access for\nothers - a more restrictive default often recommended for servers. Set\nsystem-wide defaults in /etc/login.defs or PAM configuration, or per service\nwith systemd's UMask= option.\n\n### 2.2.6 Worked example: a shared team folder (execution-tested)\n\n```bash\nmkdir -p /srv/finance && chown root:finance /srv/finance && chmod 2770 /srv/finance\n  ls -ld /srv/finance\n  su asha -c 'echo \"Q3 budget\" > /srv/finance/budget.txt; ls -l /srv/finance/budget.txt'\n  su ben  -c 'cat /srv/finance/budget.txt'\n```\n\n```terminal\ndrwxrws--- 2 root finance 4096 Nov  7 02:23 /srv/finance\n  -rw-rw-r-- 1 asha finance 10 Nov  7 02:23 /srv/finance/budget.txt\n  cat: /srv/finance/budget.txt: Permission denied\n```\n\n#### Architectural Telemetry Analysis\n\n- **2770 Octal Bitmask:** The leading 2 sets the setgid bit on the directory (L03), shown as\n    \"s\" in the group position; 770 gives owner and group full access and\n    others none.\n- asha's new file automatically belongs to group finance (setgid\n    inheritance), so colleagues in finance can work on it.\n- ben is not in finance; even though the file itself is readable by others\n    (r-- in the last position, from umask 0002), he cannot traverse the\n    directory (others have no x on /srv/finance), so access is denied.\n    Directory permissions protected the file.\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D21: Directory Permission Semantics: Read (List), Write (Create/Delete), Execute (Traverse)](/assets/courses/cyber-03/c03_m03_l02_directory_permissions_semantics.png)\n\n*Figure C03-M03-D21: Crucial operational distinction of r, w, x on directories: 'r' lists contents, 'w' creates/deletes entries, and 'x' enables traversing and accessing files.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **File vs. Directory Operational Semantics:** Contrasts standard file permission behaviors (where `r` reads contents, `w` modifies file bytes, and `x` executes machine code) against directory permission semantics in the VFS layer.\n- **Directory Read (r) Semantics:** Grants permission to read the directory's internal table of filenames via the `getdents64` system call (e.g., executing `ls`). Without the execute bit, the user can see entry names but cannot query inode metadata (`stat`), file sizes, or permissions.\n- **Directory Write (w) Semantics:** Governs directory entry (dentry) modification. A user with write permission can create new files, rename existing files, or delete files inside the directory, regardless of who owns those files or whether the target files are marked read-only.\n- **Directory Execute (x) Traverse Invariant:** Controls directory traversal and inode path resolution. Execute permission is strictly required to `cd` into the directory, traverse through it to access subdirectories, or read the data of files whose names are known.\n- **Critical Security Scenario:** Illustrates the vulnerability where an unprivileged user with write access to a shared directory can delete a critical configuration file owned by root unless the Sticky Bit is explicitly enforced on the parent directory."
    },
    {
      "id": "les_c3_m3_l3",
      "title": "3.3 Special Permission Bits and POSIX ACLs: SUID/SGID Risks & Fine-Grained Access",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of SUID/SGID Risks & Fine-Grained Access.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of SUID/SGID Risks & Fine-Grained Access.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l3_c03_m03_f2",
          "title": "C03-M03-F2: How Access Is Decided for a File: Permission & ACL Evaluation Flowchart",
          "url": "/assets/courses/cyber-03/C03-M03-F2.png",
          "caption": "Figure C03-M03-F2: Linux checks owner, named-user ACLs, groups, and others in order, requiring traverse permission on every parent directory in the path.",
          "alt": "Flowchart illustrating Linux file access decision algorithm: parent directory traverse check, owner match, named user ACL, group match, and other fallback"
        },
        {
          "id": "img_c3_m3_l3_c03_m03_d22",
          "title": "C03-M03-D22: Special Permission Bits Security: SUID, SGID & Sticky Bit Threat Models",
          "url": "/assets/courses/cyber-03/c03_m03_l03_special_bits_threat_models.png",
          "caption": "Figure C03-M03-D22: Operational mechanics and privilege escalation attack surfaces of Setuid root binaries, Setgid shared collaboration directories, and Sticky Bit on /tmp.",
          "alt": "Diagram showing SUID process running with file owner privileges, SGID inheriting directory group ownership, and Sticky bit restricting file deletion"
        }
      ],
      "content": "## 3.3 Special Permission Bits and POSIX ACLs: SUID/SGID Risks & Fine-Grained Access\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-F2: How Access Is Decided for a File: Permission & ACL Evaluation Flowchart](/assets/courses/cyber-03/C03-M03-F2.png)\n\n*Figure C03-M03-F2: Linux checks owner, named-user ACLs, groups, and others in order, requiring traverse permission on every parent directory in the path.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Path Traversal Prerequisite:** The flowchart opens at the mandatory traversal validation step. The kernel evaluates whether the process possesses execute (`x`) permissions on every intermediate directory in the canonical path leading to the target inode. If traversal fails on any parent directory, an immediate `EACCES` (Permission Denied) error is returned before checking the file itself.\n- **Sequential Evaluation Hierarchy:** Depicts the strict top-down access check algorithm. The kernel tests the user against the first matching category and halts evaluation immediately—subsequent rules are ignored:\n  - **Step 1 (Owner Match):** If the process effective UID matches the file's owner UID, only the owner permission bits apply. If the requested operation is not permitted by the owner triad, access is denied immediately even if group or other bits allow it!\n  - **Step 2 (Extended Named-User ACLs):** If POSIX ACLs exist and a named-user entry matches the process UID, the requested access is evaluated against the named ACL entry intersecting with the ACL mask.\n  - **Step 3 (Group Match):** If the process GID or any of its supplementary GIDs match the file group (or a named group ACL), group permissions (masked by the ACL mask if present) are evaluated.\n  - **Step 4 (Other Fallback):** If neither owner nor group matches, the kernel falls back to the world/other permission triad.\n- **Defensive Implication:** Illustrates the \"owner trap\": an owner who sets permissions to `007` on their own file will be denied read/write access because the owner triad (`0`) matches and terminates evaluation before the world triad (`7`) is ever reached.\n\n### 2.3.1 setuid (4000)\n\nOn an executable, setuid makes the program run with the file owner's\nprivileges instead of the caller's. Execution-tested:\n  4755 -rwsr-xr-x /usr/bin/passwd\npasswd is owned by root and setuid so ordinary users can update their own\nentry in /etc/shadow, which only root can write. The program itself must\nenforce what users may do.\n\n> [!NOTE]\n> **Defensive Security Relevance:**\n> any setuid-root program is a potential privilege\n\nescalation path if it has a bug or can be misused. Hardening reviews list all\nsetuid files and compare them with a known-good baseline. On the Debian 13\ncontainer image the list was exactly:\n  chfn chsh gpasswd mount newgrp passwd su sudo umount   (all in /usr/bin)\nAn unexpected addition - for example a setuid copy of a shell in /tmp - is a\nserious red flag.\n\n### 2.3.2 setgid (2000)\n\nOn executables: run with the file's group. On directories: new files inherit\nthe directory's group (the finance example).\n\n### 2.3.3 Sticky bit (1000)\n\nOn directories: users can delete or rename only files they own. Execution-\ntested: 1777 drwxrwxrwt /tmp.\n\n### 2.3.4 POSIX access control lists (ACLs)\n\nACLs add entries for specific users or groups beyond owner/group/others.\nExecution-tested (acl package):\n\n```bash\nsetfacl -m u:ben:r /srv/finance/budget.txt\n  getfacl -p /srv/finance/budget.txt\n  setfacl -m u:ben:x /srv/finance\n  su ben -c 'cat /srv/finance/budget.txt'\n```\n\n```terminal\n# file: /srv/finance/budget.txt\n  # owner: asha\n  # group: finance\n  user::rw-\n  user:ben:r--\n  group::rw-\n  mask::rw-\n  other::r--\n\n  Q3 budget\n```\n\n  setfacl -m u:ben:r   modify ACL: add read for ben on the file.\n- **getfacl -p:** display the ACL (-p keeps absolute paths).\n  mask::               the maximum permissions granted to named users and\n                       groups; it can silently restrict ACL entries.\n  setfacl -m u:ben:x   give ben traverse (x) on the directory only - he can\n                       reach files he is explicitly granted, but cannot list\n                       the directory (no r).\nFiles with ACLs show a \"+\" after the permission string in ls -l. ACLs give\nprecise least-privilege access, but they are easy to overlook in reviews; an\naudit should include getfacl -R on sensitive trees.\n\n### 2.3.5 Beyond discretionary permissions\n\nMandatory access control systems - SELinux (default on Red Hat family) and\nAppArmor (default on Ubuntu and SUSE) - confine programs even when they run as\nroot (Course 01 Module 5, MAC). Check status with getenforce or sestatus\n(SELinux) and aa-status (AppArmor). Leave them enabled; disabling them to\n\"fix\" a problem removes a significant defence.\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D22: Special Permission Bits Security: SUID, SGID & Sticky Bit Threat Models](/assets/courses/cyber-03/c03_m03_l03_special_bits_threat_models.png)\n\n*Figure C03-M03-D22: Operational mechanics and privilege escalation attack surfaces of Setuid root binaries, Setgid shared collaboration directories, and Sticky Bit on /tmp.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **SUID (Set User ID, Octal 4000) Threat Model:** Depicts an unprivileged user executing a root-owned SUID binary (such as `/usr/bin/passwd`). The kernel assigns the process an Effective UID (EUID) of 0 while retaining the user's Real UID (RUID). If the binary contains buffer overflows, environment variable injection vulnerabilities, or invokes untrusted subshells, an attacker can hijack the root execution context to gain an interactive root shell.\n- **SGID (Set Group ID, Octal 2000) Collaborative Directory Architecture:** Shows a shared project directory configured with SGID (`chmod 2775 /srv/team`). When any team member creates a file or subdirectory inside, the kernel forces the newly created entry to inherit the group ownership of the parent directory rather than the creator's primary group, maintaining team read/write accessibility.\n- **Sticky Bit (Restricted Deletion Flag, Octal 1000) Protection Mechanics:** Visualizes world-writable directories such as `/tmp` and `/var/tmp` (`chmod 1777`). The sticky bit modifies the VFS deletion check: even though every user possesses write permission on the directory, the kernel restricts file deletion and renaming exclusively to the file's owner, the directory owner, or the root superuser.\n- **Mitigation & Hardening Controls:** Highlights critical defensive countermeasures, including mounting shared filesystems (`/tmp`, `/dev/shm`, user home directories) with the `nosuid` and `noexec` mount options in `/etc/fstab` to neutralize rogue SUID payloads."
    },
    {
      "id": "les_c3_m3_l4",
      "title": "3.4 Sudo and Privileged Administration: Sudoers Grammar, Least Privilege & Pitfalls",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Sudoers Grammar, Least Privilege & Pitfalls.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Sudoers Grammar, Least Privilege & Pitfalls.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l4_c03_m03_d23",
          "title": "C03-M03-D23: Sudo Architecture & Sudoers Grammar: Least-Privilege Rule Construction",
          "url": "/assets/courses/cyber-03/c03_m03_l04_sudoers_grammar_rules.png",
          "caption": "Figure C03-M03-D23: Grammar structure of /etc/sudoers rules: User_Alias, Host_Alias, Runas_Alias, Command_Alias, and restrictive command whitelisting.",
          "alt": "Diagram breaking down /etc/sudoers rule syntax into User, Host, RunAs operator, options, and permitted binary command paths"
        },
        {
          "id": "img_c3_m3_l4_c03_m03_d24",
          "title": "C03-M03-D24: Sudoers Drop-in Architecture: Modular Policy Governance in /etc/sudoers.d/",
          "url": "/assets/courses/cyber-03/c03_m03_l04_sudoers_dropin_architecture.png",
          "caption": "Figure C03-M03-D24: Best-practice sudo policy management utilizing isolated drop-in configuration files in /etc/sudoers.d/ validated with visudo -c.",
          "alt": "Diagram showing main /etc/sudoers including #includedir /etc/sudoers.d with separate drop-in files for each administrative service"
        }
      ],
      "content": "## 3.4 Sudo and Privileged Administration: Sudoers Grammar, Least Privilege & Pitfalls\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-D23: Sudo Architecture & Sudoers Grammar: Least-Privilege Rule Construction](/assets/courses/cyber-03/c03_m03_l04_sudoers_grammar_rules.png)\n\n*Figure C03-M03-D23: Grammar structure of /etc/sudoers rules: User_Alias, Host_Alias, Runas_Alias, Command_Alias, and restrictive command whitelisting.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Sudoers Rule Grammar Anatomy:** Dissects the formal syntax of administrative elevation rules: `User_Specification = (Runas_Specification:Group_Specification) Tag_Specification Command_Specification`. Every segment acts as a gatekeeper restricting where, as whom, and what an authorized user can execute.\n- **Alias Abstraction Hierarchy:** Illustrates how enterprise environments scale privilege management using structured alias blocks:\n  - **User_Alias:** Groups individual user accounts or netgroups under a logical administrative role (e.g., `ADMINS = alice, bob, %wheel`).\n  - **Host_Alias:** Restricts rule validity to specific network hosts or server tiers (e.g., `WEBSERVERS = web01, web02`).\n  - **Runas_Alias:** Defines authorized target execution identities, such as restricting execution to service accounts rather than root (e.g., `DBUSERS = postgres, mysql`).\n  - **Command_Alias:** Encapsulates explicit, fully qualified binary paths while strictly prohibiting wildcard abuse (e.g., `NETOPS = /usr/sbin/tcpdump, /usr/sbin/nft`).\n- **Execution Tags & Password Authentication:** Highlights execution tags such as `NOPASSWD:` and `PASSWD:`. Bypassing password challenges with `NOPASSWD` reduces administrative friction for automated scripts but introduces significant credential-stuffing and lateral movement risks.\n- **Defensive Command Whitelisting Invariant:** Emphasizes that shell escapes, script interpreters (Python, Perl, Bash), and editors (vi, nano) must never be granted in sudoers rules without restricted parameters, as attackers routinely exploit built-in shell spawn functions (GTFOBins) to escape to an unrestricted root prompt.\n\n### 2.4.1 Why not log in as root\n\nDirect root logins provide no individual accountability (who was \"root\"?)\nand give every command full power. Instead, administrators use personal\naccounts and elevate specific commands with sudo, which authenticates the\nuser, checks policy and logs each use.\n\n### 2.4.2 sudoers policy\n\nPolicy lives in /etc/sudoers and files in /etc/sudoers.d/. Always edit with\nvisudo, which checks syntax before saving - a broken sudoers file can lock\nall administrators out.\nRule format:\n- **who:** where=(as_whom)   what\n- **asha:** ALL=(root)        /usr/bin/systemctl status *\nExecution-tested:\n\n```bash\necho 'asha ALL=(root) /usr/bin/systemctl status *' > /etc/sudoers.d/asha-status\n  chmod 440 /etc/sudoers.d/asha-status\n  visudo -cf /etc/sudoers.d/asha-status\n  sudo -l -U asha\n```\n\n```terminal\n/etc/sudoers.d/asha-status: parsed OK\n  User asha may run the following commands on 7ae6376f613a:\n      (root) /usr/bin/systemctl status *\n```\n\n- **visudo -cf FILE:** check the syntax of one file without editing.\n- **sudo -l -U user:** list what a user may run (the hostname shown is the container's ID).\n- **chmod 440:** sudoers files must not be writable.\n\n### 2.4.3 Least-privilege sudo design\n\n- Grant specific commands, not ALL, wherever possible.\n- Use groups (%sysadmins ALL=(ALL) ALL) for full administrators, and keep\n    that group small.\n- Avoid NOPASSWD except for tightly scoped automation.\n- Beware commands that can spawn shells or edit arbitrary files (many\n    editors, pagers and interpreters can) - granting them is equivalent to\n    granting root. Use sudoedit for controlled file editing.\n- Log sudo use centrally; sudo records to the auth log/journal.\n\n### 2.4.4 Remote access: SSH basics for administrators\n\nAdministrators normally reach Linux servers with SSH. Good practice\n(configured in /etc/ssh/sshd_config, see sshd_config(5)): key-based\nauthentication, PermitRootLogin no, PasswordAuthentication no where keys are\nused, MFA for privileged access, and restricting which users may log in.\nModule 8 covers SSH hardening in a baseline.\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D24: Sudoers Drop-in Architecture: Modular Policy Governance in /etc/sudoers.d/](/assets/courses/cyber-03/c03_m03_l04_sudoers_dropin_architecture.png)\n\n*Figure C03-M03-D24: Best-practice sudo policy management utilizing isolated drop-in configuration files in /etc/sudoers.d/ validated with visudo -c.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Modular Drop-in Architecture:** Contrasts monolithic editing of `/etc/sudoers` against modern modular governance using `/etc/sudoers.d/`. The primary configuration file delegates to the drop-in directory using the directive `#includedir /etc/sudoers.d` (where the leading `#` is part of the syntax, not a comment).\n- **Automated Configuration Management Isolation:** Shows individual configuration management tools (Ansible, Puppet, Terraform) deploying isolated, role-specific policy files (e.g., `10-secops`, `20-monitoring`, `30-developers`) without colliding or overwriting adjacent team configurations.\n- **Naming Convention & Filename Invariant:** Illustrates the strict parser requirement: files containing periods (`.`) or ending with backup characters (such as `~`) are automatically skipped by the sudo parser. This prevents temporary editor files and package manager update artifacts (`.dpkg-old`, `.rpmnew`) from accidentally taking effect.\n- **Validation Pipeline with visudo:** Demonstrates the continuous validation workflow using `visudo -cf /etc/sudoers.d/<filename>`. Modifying sudoers files directly without syntax checking can corrupt the grammar, locking all administrative users out of root access across the entire fleet.\n- **Secure File Permissions:** Highlights the mandatory filesystem permission boundary: drop-in files must be owned by `root:root` with permissions set strictly to `0440` (`r--r-----`) to prevent unauthorized tampering."
    },
    {
      "id": "les_c3_m3_l5",
      "title": "3.5 Package Management and Supply Chain: Repositories, GPG Verification & APT/RPM",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Repositories, GPG Verification & APT/RPM.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Repositories, GPG Verification & APT/RPM.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l5_c03_m03_d25",
          "title": "C03-M03-D25: Linux Package Lifecycle: Repository Indexing, Download, Verification & Unattended Upgrades",
          "url": "/assets/courses/cyber-03/c03_m03_l05_package_lifecycle_unattended.png",
          "caption": "Figure C03-M03-D25: Linux package maintenance cycle showing repository sync, dependency resolution, CVE patch detection, and unattended-upgrades automation.",
          "alt": "Flowchart showing package management lifecycle from remote repository sync to automated unattended security upgrades"
        },
        {
          "id": "img_c3_m3_l5_c03_m03_d26",
          "title": "C03-M03-D26: Package Integrity Auditing: Verifying Installed File Checksums with dpkg -V / rpm -V",
          "url": "/assets/courses/cyber-03/c03_m03_l05_package_integrity_auditing.png",
          "caption": "Figure C03-M03-D26: File integrity verification checking installed binaries against package manager MD5/SHA-256 databases to detect rootkit tampering.",
          "alt": "Diagram illustrating package integrity verification using dpkg -V and rpm -V to detect tampered binary files"
        }
      ],
      "content": "## 3.5 Package Management and Supply Chain: Repositories, GPG Verification & APT/RPM\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-D25: Linux Package Lifecycle: Repository Indexing, Download, Verification & Unattended Upgrades](/assets/courses/cyber-03/c03_m03_l05_package_lifecycle_unattended.png)\n\n*Figure C03-M03-D25: Linux package maintenance cycle showing repository sync, dependency resolution, CVE patch detection, and unattended-upgrades automation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Repository Metadata Synchronization:** The cycle initiates with repository indexing (e.g., `apt update` or `dnf check-update`). The package manager retrieves upstream `InRelease` or `repomd.xml` manifests over HTTPS, establishing a synchronized local index of available software packages and security updates.\n- **Cryptographic Trust & GPG Signature Verification:** Details how the local package manager validates the digital signature of downloaded metadata against public GPG keys stored in `/etc/apt/trusted.gpg.d/` or `/etc/pki/rpm-gpg/`. This verification step defends against man-in-the-middle attacks and malicious repository mirroring.\n- **Dependency Resolution Engine:** Visualizes the package manager building a Directed Acyclic Graph (DAG) to resolve library dependencies, conflicts, and version constraints before installing or upgrading any system component.\n- **CVE Patch Detection & Classification:** Highlights the automated vulnerability identification process, where package changelogs and security advisories are evaluated to prioritize critical zero-day and remote code execution (RCE) security patches.\n- **Unattended-Upgrades Automation:** Depicts the background automation daemon periodically pulling, verifying, and applying security-only updates without administrative intervention, rebooting the system safely within designated maintenance windows if required.\n\n### 2.5.1 Why package managers matter\n\nPackage managers install software from signed repositories, track every\ninstalled file and dependency, and deliver security updates. Installing\nsoftware from random downloads bypasses all of this.\n\n### 2.5.2 Debian/Ubuntu (apt, dpkg)\n\n- **apt update:** refresh repository indexes\n- **apt list --upgradable:** what can be upgraded\n- **apt upgrade:** install upgrades\n  apt install pkg / apt remove pkg\n- **apt-cache policy pkg:** installed and candidate versions and sources\n- **dpkg -l pkg:** installed status and version\n- **dpkg -L pkg:** files a package installed\n- **dpkg -S /path/file:** which package owns a file\n- **unattended-upgrades:** automatic security updates (common on Ubuntu)\nExecution-tested:\n- **dpkg -l sudo:** -> ii sudo 1.9.16p2-3+deb13u2   (ii = installed)\n  apt-cache policy sudo -> Installed: 1.9.16p2-3+deb13u2 Candidate: same\nThe version string's \"+deb13u2\" shows a Debian 13 stable update - Debian\nbackports security fixes into stable versions rather than jumping to new\nupstream releases, so compare against the distribution's advisory, not only\nthe upstream version number.\n\n### 2.5.3 Red Hat family (dnf, rpm) - equivalents (Not execution-tested here)\n\n  dnf check-update; dnf upgrade; dnf install pkg; rpm -qa; rpm -qi pkg;\n  rpm -qf /path/file; dnf updateinfo list security.\n\n### 2.5.4 Repository trust\n\nRepositories are signed with GPG keys; apt and dnf verify signatures before\ninstalling. Adding third-party repositories means trusting their keys -\nreview and limit them.\n\n### 2.5.5 Verifying installed files\n\nPackage databases record checksums of installed files. Execution-tested:\n\n```bash\ndpkg -V sudo | grep -v '^missing'\n  echo \"# changed\" >> /etc/sudoers      # deliberate change, in the container\n  dpkg -V sudo | grep -v '^missing'\n```\n\n```terminal\n(no changed files)\n  ??5?????? c /etc/sudoers\n```\n\n- **dpkg -V:** verifies files against the package database; the \"5\" means the MD5 checksum differs; \"c\" marks a configuration file; \"?\" means a check could not be performed.\n  grep -v '^missing'  the slim Debian image deliberately excludes\n                 documentation files, so dpkg reported 188 \"missing\" doc\n                 entries; filtering them reveals the real change.\nOn RHEL-family systems, rpm -Va performs similar verification. Changed\nconfiguration files are often legitimate; changed binaries in /usr/bin are\nnot and warrant investigation. Note the limitation: an attacker with root\ncan also alter the package database, so verification is strongest when\ncompared with an offline or remote reference (file integrity monitoring,\nCourse 04 Module 7).\n\n### 2.5.6 Patch management practice\n\nTrack advisories (distribution security trackers, vendor notices, CISA KEV),\ntest updates, apply on a schedule with emergency fast-track for actively\nexploited issues, reboot or restart services where needed (a patched library\ndoes not protect already-running processes), and verify versions afterwards.\nModule 7 covers enterprise patch management.\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D26: Package Integrity Auditing: Verifying Installed File Checksums with dpkg -V / rpm -V](/assets/courses/cyber-03/c03_m03_l05_package_integrity_auditing.png)\n\n*Figure C03-M03-D26: File integrity verification checking installed binaries against package manager MD5/SHA-256 databases to detect rootkit tampering.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Baseline Package Manifest Database:** Highlights the authoritative local package database (`/var/lib/dpkg/info/` on Debian/Ubuntu or the RPM database on Red Hat/CentOS). The database maintains pre-computed cryptographic checksums (SHA-256/MD5), expected file sizes, symbolic link targets, and original file permissions for every installed binary and library.\n- **Integrity Verification Process:** Depicts the execution of verification commands (`dpkg -V` or `rpm -V`). The package manager scans the live filesystem, recomputes the hash of each binary on disk, and compares the runtime values against the trusted installation baseline.\n- **Discrepancy Flags & Rootkit Detection:** Deconstructs the single-character audit flags returned upon verification failure (e.g., `S` for file size change, `5` for MD5 digest mismatch, `T` for modification timestamp change, `M` for permission mode discrepancy, and `U/G` for ownership changes).\n- **Triage: Legitimate Configuration vs. Compromise:** Distinguishes between expected configuration modifications (files in `/etc/` that administrators legitimately adjust) versus catastrophic integrity violations in system binary directories (`/bin/`, `/sbin/`, `/usr/lib/`), which indicate binary trojanization or kernel rootkit implantation.\n- **Defensive Engineering Implication:** Automated integrity auditing provides high-confidence evidence during incident response, allowing responders to rapidly identify whether core utilities (such as `ps`, `netstat`, or `ls`) have been replaced to conceal malicious adversary processes."
    },
    {
      "id": "les_c3_m3_l6",
      "title": "3.6 System Services and Log Architecture: systemd-journald, rsyslog & Log Rotation",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of systemd-journald, rsyslog & Log Rotation.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of systemd-journald, rsyslog & Log Rotation.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m3_l6_c03_m03_f3",
          "title": "C03-M03-F3: Log Flow on a Modern Linux Host: journald, rsyslog & Central SIEM Forwarding",
          "url": "/assets/courses/cyber-03/C03-M03-F3.png",
          "caption": "Figure C03-M03-F3: Logs flow from kernel and applications into journald, optionally to rsyslog text files rotated by logrotate, and forward to central SIEM storage.",
          "alt": "Dataflow diagram showing log sources sending telemetry to systemd-journald, passing to rsyslog, logrotate, and remote SIEM"
        },
        {
          "id": "img_c3_m3_l6_c03_m03_d27",
          "title": "C03-M03-D27: Log Rotation Mechanics: logrotate States, Compression & Secure Permissions",
          "url": "/assets/courses/cyber-03/c03_m03_l06_logrotate_lifecycle_permissions.png",
          "caption": "Figure C03-M03-D27: Lifecycle of log rotation showing active log truncation, postrotate daemon HUP signals, gzip compression, and secure 0640 permissions.",
          "alt": "Diagram illustrating logrotate lifecycle: active file rename, empty file creation with strict permissions, compression of historical logs, and deletion after retention window"
        }
      ],
      "content": "## 3.6 System Services and Log Architecture: systemd-journald, rsyslog & Log Rotation\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M03-F3: Log Flow on a Modern Linux Host: journald, rsyslog & Central SIEM Forwarding](/assets/courses/cyber-03/C03-M03-F3.png)\n\n*Figure C03-M03-F3: Logs flow from kernel and applications into journald, optionally to rsyslog text files rotated by logrotate, and forward to central SIEM storage.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Log Generation Sources:** Traces system event generation across three primary telemetry producers: the Linux kernel via `/dev/kmsg`, standard userland applications and daemons emitting events over `/dev/log`, and systemd service units streaming stdout and stderr.\n- **Central Collection Hub (systemd-journald):** Shows journald acting as the high-speed, unified first-stage log collector. It enriches raw log records with indexed structured metadata (including `_PID`, `_UID`, `_SYSTEMD_UNIT`, and boot IDs) and stores them in indexed binary journals (`/run/log/journal/` for volatile memory or `/var/log/journal/` for persistent storage).\n- **Secondary Processing with rsyslog:** Illustrates journald forwarding streams through a local Unix domain socket to the `rsyslog` daemon. rsyslog filters events by facility and severity, writing human-readable text logs into classic log destinations (`/var/log/syslog`, `/var/log/auth.log`, and `/var/log/secure`).\n- **Logrotate Maintenance Lifecycle:** Depicts the scheduled rotation daemon managing text log files on disk, executing size-based and time-based truncation, compression, and archival to protect host storage from exhaustion.\n- **Encrypted Central SIEM Forwarding:** Shows the enterprise telemetry egress path: rsyslog streaming structured event records over TLS (port 6514) to a centralized Security Information and Event Management (SIEM) platform or log aggregator (such as Elasticsearch or Splunk) for correlation, threat hunting, and tamper-resistant retention.\n\n### 2.6.1 Service administration recap\n\nModule 1 introduced systemctl. Daily administration:\n  systemctl status | start | stop | restart | reload <unit>\n  systemctl enable --now <unit>      enable at boot and start immediately\n  systemctl disable --now <unit>     stop and prevent start at boot\n  systemctl list-units --type=service --state=failed\n  systemctl mask <unit>              prevent a unit from being started at all\n\n### 2.6.2 The systemd journal\n\nsystemd-journald collects logs from the kernel, services and applications\nin a structured binary journal [C03-M03-R6]. Query with journalctl:\n- **journalctl -u cron:** one unit\n- **journalctl -b:** since current boot\n- **journalctl -p warning -b:** priority warning and above\n  journalctl --since \"1 hour ago\"    time window\n- **journalctl -f:** follow live\n- **journalctl -o short-iso:** ISO 8601 timestamps\n- **journalctl --disk-usage:** space used\nExecution-tested on Ubuntu 26.04 (WSL2): journalctl --disk-usage reported\n\"Archived and active journals take up 136M in the file system\", and\njournalctl -u cron -n 2 -o short-iso showed:\n  2026-11-07T02:23:28+00:00 rk-host cron[106]: (CRON) INFO (pidfile fd = 3)\n  2026-11-07T02:23:28+00:00 rk-host cron[106]: (CRON) INFO (Running @reboot jobs)\n(hostname shown as rk-host.) Members of the adm or systemd-journal groups can\nread system logs without sudo.\n\n### 2.6.3 Classic log files in /var/log\n\nMany distributions also run rsyslog, writing text files (execution-tested\nlisting, selected):\n- **-rw-r----- 1 syslog adm:** ... auth.log    authentication and sudo\n- **-rw-rw---- 1 root:** utmp ... btmp        failed logins (binary; lastb)\n- **-rw-r----- 1 root:** adm  ... dmesg       kernel messages at boot\n- **drwxr-xr-x 2 root:** root ... apt/        package actions (history.log)\nOther common files: syslog (general), kern.log, wtmp (logins; last).\nRed Hat family uses /var/log/secure and /var/log/messages.\n\nExample auth.log entries (execution-tested, hostname shown as rk-host):\n  2026-11-07T02:23:30.156973+00:00 rk-host (systemd): pam_unix(systemd-user:session):\n    session opened for user mario(uid=1000) by mario\nEach entry gives timestamp (with time zone), host, program, PAM module and\nuser - the who/what/when needed for accountability (Course 01 Module 2).\n\n### 2.6.4 Log rotation and retention\n\nlogrotate (configuration in /etc/logrotate.conf and /etc/logrotate.d/)\nrotates, compresses and deletes old text logs; journald limits are set in\n/etc/systemd/journald.conf (SystemMaxUse=, MaxRetentionSec=). Retention must\nmeet policy and law - for example 180 days for covered entities under the\nCERT-In Directions - which usually means forwarding logs to central storage\nrather than keeping them only on the host (Course 08).\n\n### 2.6.5 Logs worth watching\n\n- Failed and successful logins, especially for privileged accounts.\n- sudo usage and failures.\n- New users or group changes (useradd, usermod in auth.log).\n- Service failures and new services.\n- Package installations (/var/log/apt/history.log, dnf history).\n- Journal integrity problems (the content team's journal reported a\n    corrupted user journal file after an unclean WSL shutdown - journald\n    rotates such files, but integrity issues should always be noted in an\n    investigation).\n\n## 3. TECHNICAL DEEP DIVE: THE ADMINISTRATION LAB SCRIPT\n\n3.1 Script and status\nLAB_ASSETS/C03/rk_c03_admin_lab.sh runs every example in this module inside a\nthrowaway debian:stable-slim container (Debian 13, sudo 1.9.16p2-3+deb13u2,\nacl package from Debian). Execution-tested on Docker 29.4.2, 2026-11-07. All\nchanges happen inside the container, which is deleted when the script ends\n(docker run --rm).\n\n3.2 Structure\n  docker run --rm -i debian:stable-slim bash -s <<'EOF' ... EOF\n      Starts a temporary container and feeds the lab commands to bash on\n      standard input. The quoted 'EOF' stops your local shell from expanding\n      variables before they reach the container.\n  apt-get -qq install -y sudo acl\n      Installs the two packages the lab needs (-qq quiet, -y assume yes).\n  Sections: users/groups; shared folder; chmod forms; umask; special bits;\n  ACL; sudo rule; lock/expire; packages and verification.\n\n3.3 Why practise in a container\nYou can safely act as root, create and break accounts, and alter files such\nas /etc/sudoers without any risk to your own computer. The same commands\napply on a real server - where you would be far more careful.\n\n## 4. REAL-WORLD CASE STUDIES\n\n### CASE STUDY C03-M03-CS1: Baron Samedit (CVE-2021-3156) - why sudo must be patched\nContext: sudo is installed on almost every Linux system and is central to\nprivileged administration.\n\nTechnical problem: on 26 January 2021 the sudo project published an advisory\nfor a heap-based buffer overflow, named \"Baron Samedit\" by its discoverers in\nthe Qualys Security Advisory team. The advisory states that it allowed local\nprivilege escalation to root by any local user, without authentication and\nwithout the user needing to be listed in sudoers. Affected versions were 1.7.7\nthrough 1.7.10p9, 1.8.2 through 1.8.31p2 and 1.9.0 through 1.9.5p1; fixed\nversions were 1.8.32 and 1.9.5p2 (or vendor-patched packages), with no\nworkaround [C03-M03-R7].\n\nHow it relates to this module: the flaw sat in a setuid-root program (L03),\nand every local account - including service accounts that an attacker might\ncompromise through a web application - became a potential route to root on\nunpatched systems.\n\nImpact: a widely deployed local privilege escalation; distributions shipped\nupdated sudo packages.\n\nDetection and response: inventory sudo versions (dpkg -l sudo / rpm -q sudo),\napply vendor updates, verify, and monitor for unusual sudo activity.\n\nLessons learned:\n- Even trusted core tools need timely patching; setuid programs are high\n    value.\n- Debian/RHEL backport fixes, so check the vendor advisory for the fixed\n    package version on your distribution (L05).\n- Minimise the number of local accounts and their capabilities; defence\n    in depth assumes some will be compromised.\n\n### CASE STUDY C03-M03-CS2 (FICTIONAL TEACHING SCENARIO): chmod -R 777\nThis scenario is fictional.\n\nContext: a developer at Tamarind Travels (fictional) could not get a web\napplication to write uploads, so ran chmod -R 777 /var/www.\n\nProblem: every account on the server could now modify the application's\ncode, configuration and uploaded files. Months later, an attacker who\ncompromised a low-privilege service account replaced a PHP file and gained\ncontrol of the website.\n\nLessons: diagnose permission problems precisely (which user does the web\nserver run as? which directory needs write?) and grant only that, for example\nchown www-data:www-data /var/www/app/uploads; chmod 750; keep code\nread-only to the service; audit for world-writable files with find / -xdev\n-type f -perm -0002.\n\n## 5. PRACTICAL LEARNING\n\n### Technical Mathematical Specification: POSIX Permission Bitmasks & umask Derivation\n\nPOSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n\n\n![C03-M03-D27: Log Rotation Mechanics: logrotate States, Compression & Secure Permissions](/assets/courses/cyber-03/c03_m03_l06_logrotate_lifecycle_permissions.png)\n\n*Figure C03-M03-D27: Lifecycle of log rotation showing active log truncation, postrotate daemon HUP signals, gzip compression, and secure 0640 permissions.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Scheduled Rotation Trigger:** The lifecycle initiates when `logrotate` executes via a cron job or systemd timer, parsing configuration directives in `/etc/logrotate.conf` and drop-in files in `/etc/logrotate.d/`. The rotation threshold evaluates whether conditions (e.g., `daily`, `weekly`, or exceeding a file size limit like `size 100M`) are satisfied.\n- **Log File Renaming & Truncation:** Details the file transition workflow. The active log file (e.g., `auth.log`) is renamed to `auth.log.1`. A brand-new active log file is instantiated with restrictive ownership and permissions (`create 0640 root adm`) so services can immediately continue writing without downtime.\n- **The postrotate Daemon HUP Signal:** Visualizes the `postrotate` script block executing `systemctl kill -s HUP <daemon>.service`. This SIGHUP signal informs the logging daemon that its open file descriptor has been moved, prompting it to close the old inode and reopen the newly created `auth.log` file without requiring a full service restart.\n- **Background Compression & Numbered Retention:** Illustrates older archives being compressed into gzip files (`auth.log.2.gz`, `auth.log.3.gz`) to minimize disk consumption. The `rotate <count>` parameter defines the retention window; once the count is exceeded, the oldest archive is permanently unlinked.\n- **Access Control & Log Confidentiality:** Emphasizes that newly generated log files maintain strict `0640` or `0600` permissions, preventing unprivileged local users from inspecting sensitive authentication logs, session tokens, and operational telemetry."
    }
  ]
};
