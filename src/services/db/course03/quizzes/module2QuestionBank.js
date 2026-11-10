/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 2 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module2QuestionBank = [
  {
    "id": "q_c3_m2_001",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "According to the Filesystem Hierarchy Standard (FHS 3.0), which directory is designated strictly for host-specific configuration files?",
    "options": [
      "/etc",
      "/var",
      "/usr",
      "/opt"
    ],
    "correct": 0,
    "explanation": "/etc is the standard repository for host-specific, static system configuration files (e.g. /etc/passwd, /etc/fstab, /etc/network/interfaces)."
  },
  {
    "id": "q_c3_m2_002",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "The /proc and /sys directories on a Linux system consume zero physical disk storage. Why is this?",
    "options": [
      "They are synthetic virtual filesystems (procfs and sysfs) generated dynamically in memory by the kernel upon request.",
      "They are compressed with transparent zswap blocks on the NVMe boot partition.",
      "They are remote NFS volumes mounted from the distribution mirror at boot.",
      "They are encrypted partitions hidden by hardware TPM security."
    ],
    "correct": 0,
    "explanation": "/proc and /sys do not store files on physical media; they are virtual filesystems through which the Linux kernel exposes live runtime structures and parameters from RAM."
  },
  {
    "id": "q_c3_m2_003",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator creates a hard link between /opt/file1 and /opt/file2. What happens if /opt/file1 is deleted via rm?",
    "options": [
      "The file content remains completely intact and readable via /opt/file2, and the inode link count decrements by one.",
      "The file content is permanently erased and /opt/file2 becomes a broken dangling reference.",
      "The filesystem encounters an unrecoverable inode fault requiring fsck repair.",
      "The operating system blocks the deletion until all existing hard links are explicitly removed."
    ],
    "correct": 0,
    "explanation": "A hard link is another directory entry pointing to the same inode. Deleting one hard link decrements the inode link count; the file data is preserved until the link count reaches zero."
  },
  {
    "id": "q_c3_m2_004",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "Why does single quoting ('...') behave differently from double quoting (\"...\") in the Bash shell pipeline?",
    "options": [
      "Single quotes preserve the literal value of all enclosed characters, whereas double quotes permit parameter expansion ($VAR) and command substitution.",
      "Double quotes disable all shell globbing, whereas single quotes execute arithmetic expansion.",
      "Single quotes cause the enclosed command to execute in an isolated background subshell.",
      "Double quotes automatically escape all newline characters into semicolons."
    ],
    "correct": 0,
    "explanation": "Single quotes enforce strict literal strings—zero expansions occur. Double quotes allow variable expansion ($), command substitution ($(cmd)), and arithmetic expansion ($((...))), but suppress globbing and word splitting."
  },
  {
    "id": "q_c3_m2_005",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_006",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_007",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_008",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_009",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_010",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_011",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_012",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_013",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_014",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_015",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_016",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_017",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_018",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_019",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_020",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_021",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_022",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_023",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_024",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_025",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_026",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_027",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_028",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_029",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_030",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_031",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_032",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_033",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_034",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_035",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_036",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_037",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_038",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_039",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_040",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_041",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_042",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_043",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_044",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_045",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_046",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_047",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_048",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_049",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_050",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_051",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_052",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_053",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_054",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_055",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_056",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_057",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_058",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_059",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_060",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_061",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_062",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_063",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_064",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_065",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_066",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_067",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_068",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_069",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_070",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_071",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_072",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_073",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_074",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_075",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_076",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_077",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_078",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_079",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_080",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_081",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_082",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_083",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_084",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_085",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_086",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_087",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_088",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_089",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_090",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_091",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_092",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_093",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_094",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_095",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_096",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_097",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_098",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_099",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_100",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_101",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "medium",
    "q": "An administrator issues the command: 'chmod 644 report.txt' on a Linux server. What exact permission set does this assign to the file owner, owning group, and others?",
    "options": [
      "Owner: Read & Write (rw-); Group: Read Only (r--); Others: Read Only (r--).",
      "Owner: Read, Write & Execute (rwx); Group: Read & Execute (r-x); Others: Read Only (r--).",
      "Owner: Read Only (r--); Group: Read & Write (rw-); Others: No Access (---).",
      "Owner: Read & Write (rw-); Group: Read & Write (rw-); Others: Read & Write (rw-)."
    ],
    "correct": 0,
    "explanation": "Octal 6 equals binary 110 (Read + Write = 4 + 2). Octal 4 equals binary 100 (Read = 4). Hence 644 translates to rw- for owner, r-- for group, and r-- for others."
  },
  {
    "id": "q_c3_m2_102",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_103",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_104",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_105",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_106",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_107",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_108",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_109",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_110",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_111",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_112",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_113",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_114",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_115",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_116",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_117",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_118",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_119",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_120",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_121",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_122",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_123",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_124",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_125",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_126",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_127",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_128",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_129",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_130",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_131",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_132",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_133",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_134",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_135",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_136",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_137",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_138",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_139",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_140",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_141",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_142",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_143",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_144",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_145",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_146",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_147",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_148",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_149",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_150",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_151",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_152",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_153",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_154",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_155",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_156",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_157",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_158",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_159",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_160",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_161",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_162",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_163",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_164",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_165",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_166",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_167",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_168",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_169",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_170",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_171",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_172",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_173",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_174",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_175",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_176",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_177",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_178",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_179",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_180",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_181",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_182",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_183",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_184",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_185",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_186",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_187",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_188",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_189",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_190",
    "topic": "Bash Shell Processing Pipeline & Tokenization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_191",
    "topic": "Quoting Invariants, Globbing & Word Splitting",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_192",
    "topic": "Filesystem Hierarchy Standard (FHS 3.0)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_193",
    "topic": "Virtual Filesystems (/proc & /sys)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_194",
    "topic": "Path Traversal Risks & Canonicalization",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_195",
    "topic": "Inodes, Directory Entries & Storage Allocation",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_196",
    "topic": "Hard Links vs. Symbolic Links Mechanics",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_197",
    "topic": "Text Processing Toolchain (grep, awk, sed, cut, sort)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_198",
    "topic": "Linux Man Pages & Documentation Architecture",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_199",
    "topic": "Linux Distribution Architectures & Upstream Kernels",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  },
  {
    "id": "q_c3_m2_200",
    "topic": "Software Supply Chain & Package Verification (APT/RPM)",
    "difficulty": "difficult",
    "q": "A backup script contains: 'find /var/log/ -name \"*.log\" | xargs rm'. Why does this constitute a critical security defect when operating in shared or user-writable directory trees?",
    "options": [
      "Filenames containing whitespace or newline characters are split into separate arguments, allowing an attacker to delete arbitrary adjacent files.",
      "xargs cannot execute commands on files located deeper than two directory levels without the -r flag.",
      "The find utility automatically deletes matching inodes before piping their string paths to standard output.",
      "The rm binary cannot delete files with hard link counts greater than one when invoked through a subshell."
    ],
    "correct": 0,
    "explanation": "By default, xargs splits input on whitespace and newlines. If a file is named \"auth.log test.txt\", xargs executes rm on both tokens. To fix this, use null delimiters: \"find ... -print0 | xargs -0 rm\"."
  }
];
