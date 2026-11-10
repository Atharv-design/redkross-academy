/**
 * Course 03: Linux and Windows System Administration
 * Module 2: Linux Environment & File Hierarchy
 * Modular load-balanced data file.
 */

export const module2Data = {
  "id": "mod_c3_2",
  "title": "Module 2: Linux Environment & File Hierarchy",
  "description": "Mastering the Linux operating environment: distribution architectures (Debian, RHEL, Alpine), shell command execution mechanics, the Filesystem Hierarchy Standard (FHS 3.0), hard vs. symbolic links, navigation, file operations, and telemetry filtering.",
  "order": 2,
  "quiz": {
    "id": "quiz_mod_c3_2",
    "title": "Module 2: Linux Environment & File Hierarchy Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
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
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m2_l1",
      "title": "2.1 Linux Distributions: Upstream Kernels, Package Formats & Enterprise Lineages",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Upstream Kernels, Package Formats & Enterprise Lineages.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Upstream Kernels, Package Formats & Enterprise Lineages.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l1_c03_m02_d10",
          "title": "C03-M02-D10: Linux Distribution Genealogy: Lineages, Package Formats & Init Systems",
          "url": "/assets/courses/cyber-03/c03_m02_l01_linux_distributions_genealogy.png",
          "caption": "Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).",
          "alt": "Genealogy chart of Linux distributions showing Debian, Red Hat, SUSE, and Alpine lineages with package managers and init systems"
        },
        {
          "id": "img_c3_m2_l1_c03_m02_d11",
          "title": "C03-M02-D11: Software Supply Chain: Package Cryptographic Verification Pipeline (APT/RPM)",
          "url": "/assets/courses/cyber-03/c03_m02_l01_package_verification_pipeline.png",
          "caption": "Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.",
          "alt": "Flowchart showing APT package verification from repository metadata GPG signatures to SHA-256 package hashes and disk extraction"
        }
      ],
      "content": "## 2.1 Linux Distributions: Upstream Kernels, Package Formats & Enterprise Lineages\n\n![C03-M02-D10: Linux Distribution Genealogy: Lineages, Package Formats & Init Systems](/assets/courses/cyber-03/c03_m02_l01_linux_distributions_genealogy.png)\n\n*Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).*\n\nLESSON C03-M02-L01: Linux distributions\n=======================================\n\n2.1.1 What a distribution is\n\"Linux\" strictly names the kernel. A distribution (distro) packages the\nkernel with user-space software - a C library, core utilities (often GNU\ncoreutils), an init system (usually systemd), a package manager, default\nconfiguration and a security update process - into an installable operating\nsystem.\n\n2.1.2 Major families\n  Debian family   Debian, Ubuntu, Linux Mint, Kali Linux. Packages in .deb\n                  format, managed with apt/dpkg.\n  Red Hat family  Red Hat Enterprise Linux (RHEL), Fedora, CentOS Stream,\n                  Rocky Linux, AlmaLinux. Packages in .rpm format, managed\n                  with dnf/rpm.\n  SUSE family     SUSE Linux Enterprise, openSUSE (zypper).\n  Independent     Arch Linux (pacman, rolling release), Alpine Linux\n                  (musl libc, BusyBox, apk; very small; popular for\n                  containers - used in Course 02's labs).\n\n2.1.3 Release models\n  Fixed / LTS     Versions released on a schedule and supported for years\n                  with security fixes (for example Ubuntu LTS releases and\n                  RHEL). Preferred for servers.\n  Rolling         Continuous updates to the newest software (Arch, Debian\n                  testing/unstable, Fedora Rawhide). Newest features, more\n                  change and risk.\nSecurity point: what matters most is that the release you run still receives\nsecurity updates. Running an end-of-life release means known vulnerabilities\nstay unpatched.\n\n2.1.4 Identifying a system (execution-tested)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  grep -E '^(PRETTY_NAME|ID|VERSION_ID)=' /etc/os-release\n  uname -sr\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  PRETTY_NAME=\"Ubuntu 26.04 LTS\"\n  VERSION_ID=\"26.04\"\n  ID=ubuntu\n  Linux 6.6.114.1-microsoft-standard-WSL2\n  --------------------------------------------------------------- END OUTPUT\n\n  /etc/os-release  Standard file describing the distribution (documented in\n                   os-release(5)) [C03-M02-R1].\n  uname -sr        Kernel name and release. Here the kernel is Microsoft's\n                   WSL2 kernel, while the user space is Ubuntu - a reminder\n                   that kernel and distribution are separate components.\n\n2.1.5 Choosing a distribution in an organisation\nConsider: support lifetime, vendor support contracts, security update\nprocess, hardening guidance available (for example CIS Benchmarks, Module 8),\ncompatibility with required software, skills of the team, and certification\nrequirements. Security distributions such as Kali Linux bundle testing tools\nand are for authorised testing workstations, not general servers.\n\n\n![C03-M02-D11: Software Supply Chain: Package Cryptographic Verification Pipeline (APT/RPM)](/assets/courses/cyber-03/c03_m02_l01_package_verification_pipeline.png)\n\n*Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.*\n\n"
    },
    {
      "id": "les_c3_m2_l2",
      "title": "2.2 The Shell: Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l2_c03_m02_f2",
          "title": "C03-M02-F2: How the Shell Processes a Command Line: Tokenization to execve",
          "url": "/assets/courses/cyber-03/C03-M02-F2.png",
          "caption": "Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.",
          "alt": "Pipeline diagram of Bash command processing: reading input, tokenization, expansions, redirection setup, PATH search, and fork/execve"
        },
        {
          "id": "img_c3_m2_l2_c03_m02_d12",
          "title": "C03-M02-D12: Standard Streams & Pipeline Mechanics: stdin (0), stdout (1), stderr (2)",
          "url": "/assets/courses/cyber-03/c03_m02_l02_standard_streams_redirection.png",
          "caption": "Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).",
          "alt": "Diagram of standard input 0, standard output 1, and standard error 2 connected across processes via pipes and file redirections"
        }
      ],
      "content": "## 2.2 The Shell: Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection\n\n![C03-M02-F2: How the Shell Processes a Command Line: Tokenization to execve](/assets/courses/cyber-03/C03-M02-F2.png)\n\n*Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.*\n\nLESSON C03-M02-L02: The shell\n=============================\n\n2.2.1 Terminal, shell and command line\n  Terminal   The window or console that displays text and sends your\n             keystrokes.\n  Shell      The program that reads your commands, interprets them and runs\n             programs. Common shells: bash (default on many distributions),\n             zsh, dash (/bin/sh on Debian/Ubuntu for scripts) and BusyBox ash\n             on Alpine.\n  Prompt     Text such as mario@host:~$ showing user, host and current\n             directory; \"$\" for normal users and \"#\" conventionally for root.\n\nExecution-tested: echo \"SHELL=$SHELL\" printed SHELL=/bin/bash, and bash\n--version reported GNU bash, version 5.3.9(1)-release.\n\n2.2.2 Anatomy of a command\n  command  options        arguments\n  ls       -la            /var/log\n  Options modify behaviour (short -l, combined -la, long --all); arguments\n  are what the command acts on.\n\n2.2.3 How the shell processes a line (simplified order)\n  1. Splits the line into words, respecting quotes.\n  2. Expands variables ($HOME), command substitution ($(date)), arithmetic\n     and globs (*.txt).\n  3. Sets up redirections (>, >>, <, 2>) and pipes (|).\n  4. Finds the command: shell builtin, alias, function, or an executable in\n     a directory listed in PATH.\n  5. Runs it and waits (unless & runs it in the background).\nThe bash manual describes these expansions in detail [C03-M02-R2].\n\n2.2.4 Variables and quoting\n  name=\"RedKross\"       Set a shell variable (no spaces around =).\n  echo \"$name\"          Double quotes: variables expand, spaces preserved.\n  echo '$name'          Single quotes: literal text, no expansion.\n  export PATH=\"$PATH:$HOME/bin\"   Environment variable inherited by child\n                        processes.\nSecurity habit: always quote variables (\"$file\") in commands and scripts.\nAn unquoted variable containing spaces or wildcards may be split or expanded\ninto multiple arguments - a common cause of scripts deleting the wrong\nfiles.\n\n2.2.5 Globbing (wildcards)\n  *       any characters      ls docs/*.txt\n  ?       one character       ls file?.log\n  [abc]   one listed character\nThe shell expands globs before running the command. Execution-tested:\nls docs/*.txt listed docs/notes.txt and docs/old-notes.txt.\n\n2.2.6 Pipes and redirection\n  cmd > file     write standard output to file (overwrite)\n  cmd >> file    append\n  cmd 2> err.txt redirect standard error\n  cmd > out 2>&1 redirect both output and errors\n  cmd < file     read standard input from file\n  cmd1 | cmd2    send cmd1's output to cmd2's input\nExecution-tested: grep INFO logs/app.log | wc -l printed 2 - grep selected\nlines containing INFO and wc -l counted them.\nCaution: > silently overwrites. In bash, set -o noclobber prevents\naccidental overwriting with >.\n\n2.2.7 Builtins and external commands\nExecution-tested: which ls printed /usr/bin/ls (an external program), while\ntype cd printed \"cd is a shell builtin\" - cd must be built in because a\nchild process cannot change its parent shell's directory.\n\n2.2.8 History and editing\nUp/down arrows recall commands; history lists them; Ctrl+R searches; Tab\ncompletes names. Security note: commands typed with passwords on the command\nline may be saved in ~/.bash_history and visible in process listings - pass\nsecrets through prompts or files with strict permissions instead.\n\n\n![C03-M02-D12: Standard Streams & Pipeline Mechanics: stdin (0), stdout (1), stderr (2)](/assets/courses/cyber-03/c03_m02_l02_standard_streams_redirection.png)\n\n*Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).*\n\n"
    },
    {
      "id": "les_c3_m2_l3",
      "title": "2.3 The Filesystem Hierarchy Standard (FHS 3.0): Root Topologies & Virtual FS",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Root Topologies & Virtual FS.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Root Topologies & Virtual FS.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l3_c03_m02_f1",
          "title": "C03-M02-F1: The Linux Filesystem Hierarchy Standard (FHS 3.0): Directory Topologies",
          "url": "/assets/courses/cyber-03/C03-M02-F1.png",
          "caption": "Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).",
          "alt": "Tree diagram of Linux Filesystem Hierarchy Standard from root / showing bin, etc, home, proc, sys, var, and usr"
        },
        {
          "id": "img_c3_m2_l3_c03_m02_d13",
          "title": "C03-M02-D13: Virtual Kernel Filesystems: /proc & /sys Memory Projections",
          "url": "/assets/courses/cyber-03/c03_m02_l03_proc_sys_virtual_filesystems.png",
          "caption": "Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.",
          "alt": "Diagram illustrating how /proc and /sys project internal kernel memory structures into directory trees on demand"
        }
      ],
      "content": "## 2.3 The Filesystem Hierarchy Standard (FHS 3.0): Root Topologies & Virtual FS\n\n![C03-M02-F1: The Linux Filesystem Hierarchy Standard (FHS 3.0): Directory Topologies](/assets/courses/cyber-03/C03-M02-F1.png)\n\n*Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).*\n\nLESSON C03-M02-L03: The filesystem hierarchy\n============================================\n\n2.3.1 One tree\nLinux has a single directory tree starting at the root \"/\". Disks,\npartitions and network shares are mounted onto directories in this tree;\nthere are no drive letters. The Filesystem Hierarchy Standard (FHS) 3.0,\nmaintained by the Linux Foundation, defines where things belong\n[C03-M02-R3].\n\nExecution-tested top level on Ubuntu 26.04 (WSL2):\n  bin boot dev etc home init lib lib64 lost+found media mnt opt proc root\n  run sbin snap srv sys tmp usr var\n(init and snap are specific to WSL and Ubuntu's snap packaging.)\n\n2.3.2 Key directories and their security relevance\n  /          Root of the tree.\n  /bin, /sbin  Essential user and system binaries. On modern distributions\n             these are often symbolic links into /usr (\"merged /usr\"):\n             execution-tested, /bin -> usr/bin on Ubuntu 26.04.\n  /usr       Read-only shareable programs and data: /usr/bin, /usr/lib,\n             /usr/share. Changes here outside the package manager are\n             suspicious.\n  /etc       System-wide configuration (passwd, group, shadow, ssh/,\n             sudoers, systemd/). A primary target for auditing and change\n             monitoring.\n  /var       Variable data: /var/log (logs - Module 3), /var/lib (state\n             data such as databases), /var/spool, /var/tmp.\n  /home      Users' home directories (/home/mario). Contains user\n             configuration (\"dotfiles\") such as ~/.ssh and ~/.bash_history.\n  /root      Home directory of the root user.\n  /tmp       Temporary files, writable by everyone, usually cleared at boot.\n             Execution-tested permissions drwxrwxrwt: the final \"t\" is the\n             sticky bit, so users can delete only their own files (Module 3).\n             World-writable locations are commonly used by attackers to stage\n             files, which is why some hardening guides mount /tmp with noexec\n             (Module 8).\n  /dev       Device files (disks /dev/sda, /dev/null, terminals).\n  /proc, /sys  Virtual file systems exposing kernel and process information\n             (Module 1).\n  /boot      Kernel images, initramfs, boot loader files.\n  /opt       Add-on application software.\n  /srv       Data served by the system (web, FTP).\n  /mnt, /media Mount points for temporary and removable media.\n  /run       Runtime data since boot (PID files, sockets).\n  /lib, /lib64 Shared libraries and kernel modules.\n\n2.3.3 Files and inodes\nEach file has metadata in an inode: type, permissions, owner, size,\ntimestamps and pointers to data blocks. The file name is just a directory\nentry pointing to the inode. Consequences:\n  - Hard links: several names for one inode.\n  - Symbolic links: special files containing a path to another file\n    (like /bin -> usr/bin).\n  - Deleting a name removes the link; data is freed only when no names and no\n    open handles remain - relevant in forensics (Course 09).\n\n2.3.4 Everything is a file (mostly)\nRegular files, directories, symbolic links, device files, named pipes and\nsockets all appear in the tree. ls -l shows the type as the first character:\n- regular, d directory, l link, c character device, b block device, p pipe,\ns socket.\n\n\n![C03-M02-D13: Virtual Kernel Filesystems: /proc & /sys Memory Projections](/assets/courses/cyber-03/c03_m02_l03_proc_sys_virtual_filesystems.png)\n\n*Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.*\n\n"
    },
    {
      "id": "les_c3_m2_l4",
      "title": "2.4 Navigation and Paths: Absolute vs. Relative Resolution & Path Traversal Risks",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Absolute vs. Relative Resolution & Path Traversal Risks.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Absolute vs. Relative Resolution & Path Traversal Risks.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l4_c03_m02_d14",
          "title": "C03-M02-D14: Path Traversal Defense: Absolute vs. Relative Paths & Directory Canonicalization",
          "url": "/assets/courses/cyber-03/c03_m02_l04_path_traversal_canonicalization.png",
          "caption": "Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.",
          "alt": "Diagram contrasting absolute path resolution with relative path traversal vulnerabilities and canonicalization checks"
        },
        {
          "id": "img_c3_m2_l4_c03_m02_d15",
          "title": "C03-M02-D15: Inodes, Directory Entries & Filesystem Storage Allocation",
          "url": "/assets/courses/cyber-03/c03_m02_l04_inodes_and_disk_blocks.png",
          "caption": "Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.",
          "alt": "Diagram showing directory entry linking filename to inode number, inode containing metadata and block pointers to physical disk blocks"
        }
      ],
      "content": "## 2.4 Navigation and Paths: Absolute vs. Relative Resolution & Path Traversal Risks\n\n![C03-M02-D14: Path Traversal Defense: Absolute vs. Relative Paths & Directory Canonicalization](/assets/courses/cyber-03/c03_m02_l04_path_traversal_canonicalization.png)\n\n*Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.*\n\nLESSON C03-M02-L04: Navigation and paths\n========================================\n\n2.4.1 Absolute and relative paths\n  Absolute  Starts from root: /var/log/syslog\n  Relative  Starts from the current directory: logs/app.log\n  .         current directory\n  ..        parent directory\n  ~         your home directory (expanded by the shell)\n\n2.4.2 Core navigation commands\n  pwd                 print working directory (execution-tested:\n                      /home/mario)\n  cd /var/log         change to an absolute path\n  cd ..               up one level\n  cd -                back to the previous directory\n  cd                  (no argument) home directory\n  ls                  list directory contents\n  ls -l               long format: permissions, links, owner, group, size,\n                      modification time, name\n  ls -a               include hidden \"dot\" files\n  ls -lh              human-readable sizes\n  ls -lt              sort by modification time (newest first) - useful when\n                      looking for recently changed files\n\n2.4.3 Reading ls -l (execution-tested; spacing compressed)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  total 12\n  drwxr-xr-x 2 mario mario 4096 Nov 7 02:19 .\n  drwxr-xr-x 5 mario mario 4096 Nov 7 02:19 ..\n  -rw-r--r-- 1 mario mario 17 Nov 7 02:19 notes.txt\n  --------------------------------------------------------------- END OUTPUT\n\n  -rw-r--r--   type (-) and permissions: owner rw-, group r--, others r--\n               (Module 3 explains permissions fully).\n  1            number of hard links.\n  mario mario  owner and group.\n  17           size in bytes (\"alpha\\nbeta\\ngamma\\n\" = 17 bytes).\n  Nov 7 02:19  last modification time.\n\n\n![C03-M02-D15: Inodes, Directory Entries & Filesystem Storage Allocation](/assets/courses/cyber-03/c03_m02_l04_inodes_and_disk_blocks.png)\n\n*Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.*\n\n\n\n:::math-steps\n### Ext4 Direct and Indirect Inode Capacity Calculation\nComputing the maximum file size addressable through an Ext4 inode with 12 direct block pointers and triple indirect pointers.\n\n#### Step 1: Direct Block Capacity\nAn Ext4 inode contains 12 direct pointers. With 4 KB ($4096$ byte) filesystem blocks:\n$$\\text{Direct Capacity} = 12 \\times 4096 = 49{,}152 \\text{ bytes} = 48 \\text{ KB}$$\n\n#### Step 2: Single Indirect Block Capacity\nA single indirect block stores 4-byte block addresses: $4096 / 4 = 1024$ pointers:\n$$\\text{Single Indirect} = 1024 \\times 4096 = 4{,}194{,}304 \\text{ bytes} = 4 \\text{ MB}$$\n\n#### Step 3: Double and Triple Indirect Addressing\n$$\\text{Double Indirect} = 1024^2 \\times 4096 = 4{,}294{,}967{,}296 \\text{ bytes} = 4 \\text{ GB}$$\n$$\\text{Triple Indirect} = 1024^3 \\times 4096 = 4{,}398{,}046{,}511{,}104 \\text{ bytes} = 4 \\text{ TB}$$\n:::\n\n"
    },
    {
      "id": "les_c3_m2_l5",
      "title": "2.5 Working with Files and Directories: Inodes, Links, Metadata & Deletion Lifecycles",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Inodes, Links, Metadata & Deletion Lifecycles.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Inodes, Links, Metadata & Deletion Lifecycles.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l5_c03_m02_f3",
          "title": "C03-M02-F3: Reading an ls -l Listing: Anatomy of Linux File Metadata",
          "url": "/assets/courses/cyber-03/C03-M02-F3.png",
          "caption": "Figure C03-M02-F3: Detailed breakdown of an 'ls -l' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.",
          "alt": "Diagram dissecting an ls -l long listing showing file type, permission triads, link count, owner, group, file size, timestamp, and filename"
        },
        {
          "id": "img_c3_m2_l5_c03_m02_d16",
          "title": "C03-M02-D16: Hard Links vs. Symbolic Links: Inode Reference Counter vs. Path Pointers",
          "url": "/assets/courses/cyber-03/c03_m02_l05_hard_links_vs_symlinks.png",
          "caption": "Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.",
          "alt": "Diagram comparing hard links sharing inode and disk blocks with symbolic links pointing to target filenames"
        }
      ],
      "content": "## 2.5 Working with Files and Directories: Inodes, Links, Metadata & Deletion Lifecycles\n\n![C03-M02-F3: Reading an ls -l Listing: Anatomy of Linux File Metadata](/assets/courses/cyber-03/C03-M02-F3.png)\n\n*Figure C03-M02-F3: Detailed breakdown of an 'ls -l' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.*\n\nLESSON C03-M02-L05: Working with files and directories\n======================================================\n\n2.5.1 Creating\n  mkdir dir             create a directory\n  mkdir -p a/b/c        create parents as needed\n  mkdir -p lab/{docs,logs,scripts}   brace expansion creates three at once\n                        (bash feature; execution-tested)\n  touch file            create an empty file or update its timestamp\n  printf 'a\\nb\\n' > f   create a file with exact content\n\n2.5.2 Copying, moving, renaming\n  cp src dst            copy a file\n  cp -r srcdir dstdir   copy recursively\n  cp -a src dst         archive mode: preserve permissions, ownership,\n                        timestamps (where permitted)\n  mv old new            rename or move (within one file system, just\n                        renames the directory entry)\nExecution-tested: cp docs/notes.txt docs/notes.bak then mv docs/notes.bak\ndocs/old-notes.txt left notes.txt and old-notes.txt in docs/.\n\n2.5.3 Deleting - safely\n  rm file               remove a file (no recycle bin)\n  rm -r dir             remove a directory and its contents\n  rm -i file            ask before each removal\n  rmdir dir             remove an empty directory\nSafe habits:\n  - Run ls with the same pattern first to see what would be deleted.\n  - Avoid rm -rf with variables; in scripts, guard with checks such as\n    [ -n \"$dir\" ] and use \"${dir:?}\" so an empty variable causes an error\n    instead of deleting the wrong place.\n  - Prefer moving to a quarantine folder when unsure.\n  - Never run commands pasted from untrusted sources as root.\n\n2.5.4 Identifying files\n  file name   determines type from content, not extension.\nExecution-tested:\n  docs/notes.txt:   ASCII text\n  scripts/hello.sh: POSIX shell script, ASCII text executable\nNote: \"executable\" here means file recognised a script (it starts with\n#!/bin/sh); it does not mean the execute permission is set - stat or ls -l\nshows permissions. Attackers sometimes disguise files with misleading\nextensions; file inspects the actual content.\n\n  stat -c '%n %s bytes perms=%A owner=%U' docs/notes.txt\n  -> docs/notes.txt 17 bytes perms=-rw-r--r-- owner=mario\n\n2.5.5 Finding files\n  find . -name '*.log'               by name (quote the pattern so the shell\n                                     does not expand it)\n  find /etc -type f -mmin -60        files modified in the last 60 minutes\n  find / -perm -4000 -type f 2>/dev/null   files with the setuid bit\n                                     (Module 3; an audit check)\n  find /home -type f -size +100M     large files\nExecution-tested: find . -name '*.log' printed ./logs/app.log.\n\n2.5.6 Disk usage\n  du -sh dir    total size of a directory (execution-tested: 32K for the lab\n                folder)\n  df -h         free space per mounted file system\n\n\n![C03-M02-D16: Hard Links vs. Symbolic Links: Inode Reference Counter vs. Path Pointers](/assets/courses/cyber-03/c03_m02_l05_hard_links_vs_symlinks.png)\n\n*Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: THE SHELL TOUR SCRIPT, LINE BY LINE\n--------------------------------------------------------------------------------\n\n3.1 Script location and status\nLAB_ASSETS/C03/rk_c03_shell_tour.sh - execution-tested on Ubuntu 26.04 LTS\n(WSL2), bash 5.3.9, as a normal (non-root) user. It creates ~/rk-lab-m02,\ndemonstrates the commands from this module and removes the folder.\n\n3.2 Selected lines explained\n\n  ---------------------------------------------------------------- BEGIN CODE\n  #!/bin/bash\n  set -e\n  mkdir -p ~/rk-lab-m02/{docs,logs,scripts}\n  cd ~/rk-lab-m02\n  printf 'alpha\\nbeta\\ngamma\\n' > docs/notes.txt\n  printf '2026-11-07 10:01 INFO start\\n2026-11-07 10:02 ERROR disk full\\n...' > logs/app.log\n  find . -print | sort\n  grep -n ERROR logs/app.log\n  grep INFO logs/app.log | wc -l\n  echo \"delta\" >> docs/notes.txt; tail -n 2 docs/notes.txt\n  cd ~; rm -r ~/rk-lab-m02\n  ------------------------------------------------------------------ END CODE\n\n  #!/bin/bash     The \"shebang\": run this file with bash.\n  set -e          Stop at the first failing command - a safety habit so a\n                  failed cd does not lead to commands running in the wrong\n                  place.\n  mkdir -p ...{docs,logs,scripts}  brace expansion creates three folders.\n  printf '...\\n'  writes exact content with newline escapes (more\n                  predictable than echo for this purpose).\n  find . -print | sort   lists every path, sorted, as a simple tree view.\n  grep -n / | wc -l      search and count, as in L06.\n  >>              appends without destroying existing content.\n  cd ~; rm -r ... removes only the folder the script created, using an\n                  explicit path rather than a variable.\n\n3.3 Output (exact, selected)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  == tree-like listing\n  .\n  ./docs\n  ./docs/notes.txt\n  ./logs\n  ./logs/app.log\n  ./scripts\n  ./scripts/hello.sh\n  == grep ERROR\n  2:2026-11-07 10:02 ERROR disk full\n  == pipes: count INFO lines\n  2\n  == redirection\n  gamma\n  delta\n  == cleaned: removed\n  --------------------------------------------------------------- END OUTPUT\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M02-P1: Run and extend the shell tour\n---------------------------------------------------\nObjective: Practise navigation, file operations, searching and redirection.\n\nDifficulty: Beginner.\n\nRequired tools: a Linux shell (WSL2 Ubuntu, a VM, or a container such as\ndocker run -it --rm debian:stable-slim bash).\n\nPrerequisites: Lessons L02-L06.\n\nEnvironment setup: copy LAB_ASSETS/C03/rk_c03_shell_tour.sh to your Linux\nhome directory.\n\nExplicit authorised scope: your own Linux environment, as a normal user. The\nscript works only inside ~/rk-lab-m02.\n\nStep-by-step instructions:\n  1. Read the script, then run: bash rk_c03_shell_tour.sh\n  2. Compare your output with section 3.3.\n  3. Comment out the final cleanup line, run again, and then by hand:\n     a) cd into ~/rk-lab-m02 using an absolute path, then go back using cd -.\n     b) Create docs/archive/2026 with one command.\n     c) Copy all .txt files into docs/archive/2026.\n     d) Append three more log lines, one containing WARN.\n     e) Use grep -E to show ERROR or WARN lines with line numbers.\n     f) Use find to list files modified in the last 10 minutes.\n     g) Use file on every file under the folder.\n  4. Remove the folder safely: first ls -R ~/rk-lab-m02, then rm -r\n     ~/rk-lab-m02.\n\nExpected observations: commands behave as in L02-L06; find -mmin -10 lists\neverything you just created.\n\nExplanation: you have practised the commands analysts use daily.\n\nTroubleshooting: \"No such file or directory\" usually means you are in a\ndifferent directory - run pwd. If brace expansion does not work, you are\nusing sh/dash rather than bash.\n\nCleanup: step 4.\n\nLearning outcome: you can work confidently with files in the shell.\n\nPRACTICAL C03-M02-P2: Explore the filesystem hierarchy as an auditor\n--------------------------------------------------------------------\nObjective: Inspect key directories and identify security-relevant\nproperties.\n\nDifficulty: Beginner.\n\nRequired tools: Linux shell (non-root).\n\nPrerequisites: Lesson L03.\n\nEnvironment setup: your Linux environment.\n\nExplicit authorised scope: your own system; read-only commands.\n\nStep-by-step instructions:\n  1. Run ls -ld /etc /var/log /tmp /home /usr/bin /bin and explain each\n     permission string and owner.\n  2. Determine whether /bin is a directory or a symbolic link on your\n     distribution.\n  3. List accounts with an interactive shell:\n     grep -vE 'nologin|false' /etc/passwd | cut -d: -f1,7\n  4. Find setuid files: find / -perm -4000 -type f 2>/dev/null\n     Record the list (Module 3 explains why these matter).\n  5. Find files changed in /etc in the last day: find /etc -type f -mtime -1\n     2>/dev/null\n  6. Write five lines describing what you found and what an auditor should\n     check.\n\nExpected observations (content team, Ubuntu 26.04 WSL2): /bin -> usr/bin;\n/tmp drwxrwxrwt root root; /var/log drwxrwxr-x root syslog; /etc drwxr-xr-x\nroot root. Setuid lists on Ubuntu typically include passwd, sudo, su, mount\nand similar tools.\n\nExplanation: knowing the normal state lets you spot abnormal additions.\n\nTroubleshooting: permission-denied messages are expected for some paths;\n2>/dev/null discards them.\n\nCleanup: none.\n\nLearning outcome: you can navigate the hierarchy with an auditor's eye.\n\n--------------------------------------------------------------------------------\n\n"
    },
    {
      "id": "les_c3_m2_l6",
      "title": "2.6 Viewing, Searching & Documentation: Text Toolchains, Grep, Find & Man Sections",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Text Toolchains, Grep, Find & Man Sections.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Text Toolchains, Grep, Find & Man Sections.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m2_l6_c03_m02_d17",
          "title": "C03-M02-D17: Linux Text Processing Pipeline: grep, awk, sed, cut, sort & uniq",
          "url": "/assets/courses/cyber-03/c03_m02_l06_text_toolchain_pipeline.png",
          "caption": "Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.",
          "alt": "Pipeline diagram illustrating text filtering with grep, extraction with awk, pattern editing with sed, and aggregation with sort and uniq"
        },
        {
          "id": "img_c3_m2_l6_c03_m02_d18",
          "title": "C03-M02-D18: Linux Man Pages: The 8 Standard Sections & Offline Documentation Search",
          "url": "/assets/courses/cyber-03/c03_m02_l06_man_sections_architecture.png",
          "caption": "Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with 'man -k' and 'whatis'.",
          "alt": "Grid diagram illustrating the 8 standard sections of the Linux manual from user commands to system administration daemons"
        }
      ],
      "content": "## 2.6 Viewing, Searching & Documentation: Text Toolchains, Grep, Find & Man Sections\n\n![C03-M02-D17: Linux Text Processing Pipeline: grep, awk, sed, cut, sort & uniq](/assets/courses/cyber-03/c03_m02_l06_text_toolchain_pipeline.png)\n\n*Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.*\n\nLESSON C03-M02-L06: Viewing, searching and getting help\n=======================================================\n\n2.6.1 Viewing files\n  cat file          print the whole file\n  less file         page through (q quits, / searches)\n  head -n 20 file   first lines\n  tail -n 20 file   last lines\n  tail -f file      follow a growing file (watch logs live)\n  wc -l file        count lines\n\n2.6.2 Searching inside files with grep\n  grep ERROR app.log          lines containing ERROR\n  grep -n ERROR app.log       with line numbers (execution-tested:\n                              2:2026-11-07 10:02 ERROR disk full)\n  grep -i error app.log       case-insensitive\n  grep -r \"PermitRootLogin\" /etc/ssh   recursive search\n  grep -v INFO app.log        lines NOT matching\n  grep -E 'ERROR|WARN' app.log  extended regular expressions\nCourse 04 Module 3 covers regular expressions in depth.\n\n2.6.3 Cutting fields\n/etc/passwd stores one account per line with colon-separated fields.\nExecution-tested:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  head -n 3 /etc/passwd | cut -d: -f1,3,6,7\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  root:0:/root:/bin/bash\n  daemon:1:/usr/sbin:/usr/sbin/nologin\n  bin:2:/bin:/usr/sbin/nologin\n  --------------------------------------------------------------- END OUTPUT\n\n  -d:        use colon as delimiter\n  -f1,3,6,7  username, UID, home directory, login shell\n\"nologin\" shells show service accounts that cannot log in interactively - a\ngood sign. Module 3 covers accounts.\n\n2.6.4 Getting help\n  man ls          the manual page (sections: 1 user commands, 5 file\n                  formats, 8 administration commands)\n  man 5 passwd    a specific section\n  ls --help       brief usage for most GNU tools\n  apropos keyword search manual descriptions\n  help cd         help for bash builtins\nLearning to read man pages is the single most useful habit for independent\nlearning on Linux.\n\n--------------------------------------------------------------------------------\n\n![C03-M02-D18: Linux Man Pages: The 8 Standard Sections & Offline Documentation Search](/assets/courses/cyber-03/c03_m02_l06_man_sections_architecture.png)\n\n*Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with 'man -k' and 'whatis'.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M02-CS1: The xz Utils supply-chain compromise, 2024 - why\ndistribution choice and release models matter\n------------------------------------------------------------------------\nContext: XZ Utils is a data compression library and tool shipped with many\nLinux distributions.\n\nWhat happened: on 29 March 2024 CISA reported that malicious code had been\nembedded in XZ Utils versions 5.6.0 and 5.6.1 (CVE-2024-3094) and\nrecommended downgrading to an uncompromised version such as 5.4.6 Stable,\nhunting for malicious activity and reporting findings [C03-M02-R4]. The\nissue was discovered by a developer who investigated unusual behaviour and\nperformance on a test system, and was disclosed before the affected versions\nreached most stable, long-term-support releases; Red Hat's advisory, linked\nby CISA, addressed users of Fedora 41 and Fedora Rawhide [C03-M02-R5].\n\nHow it relates to this module: the compromised versions were very new.\nDistributions with rolling or development release models picked up new\nupstream versions quickly, while stable/LTS releases, which adopt new\nversions more slowly, were largely not affected at the time of disclosure.\n\nLessons learned:\n  - Release models are a risk decision: newest is not always safest for\n    production.\n  - Knowing your distribution and exact package versions (L01; package\n    queries in Module 3) is how you answer \"are we affected?\" quickly.\n  - Careful observation of anomalies on Linux systems (a developer noticing\n    something unusual) remains one of the best detection controls.\n  - Open-source supply-chain security is covered in Course 12 and Course 21.\n\nCASE STUDY C03-M02-CS2 (FICTIONAL TEACHING SCENARIO): The empty variable\n------------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: an administrator at Orchid Payments (fictional) wrote a clean-up\nscript containing rm -rf $BUILD_DIR/* to clear a build folder.\n\nProblem: on one server, BUILD_DIR was not set. The shell expanded the line to\nrm -rf /*, and because the script ran as root, it began deleting the\nsystem.\n\nImpact: the server had to be rebuilt from backup.\n\nLessons: quote variables; use \"${BUILD_DIR:?BUILD_DIR not set}\" so the shell\nstops with an error if the variable is empty; use set -u to treat unset\nvariables as errors; avoid running scripts as root unless necessary; test on\nnon-production systems (Module 4).\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M02-F1: The Linux filesystem hierarchy (simplified)\nPurpose: Show key directories and their purposes.\n\n  [BEGIN DIAGRAM]\n  /  (root of the single tree)\n- **bin -> usr/bin   essential commands (merged /usr)**\n- **boot             kernel, initramfs, boot loader**\n- **dev              device files (/dev/sda, /dev/null)**\n- **etc              SYSTEM CONFIGURATION  <- audit and monitor changes**\n  |   |-- passwd, group, shadow, sudoers, ssh/, systemd/\n- **home             users' homes (/home/mario: dotfiles, ~/.ssh)**\n- **proc, sys        virtual kernel/process information**\n- **root             root user's home**\n- **run              runtime data since boot**\n- **tmp              world-writable temp (sticky bit)  <- watch for staging**\n- **usr              programs and libraries (read-only, package-managed)**\n  |   |-- bin, lib, share\n- **var              variable data**\n- **log          LOGS  <- investigations start here**\n- **lib          application state**\n  [END DIAGRAM]\n\nCaption: Figure C03-M02-F1. Key FHS directories with security notes.\nAccessibility description: A tree starting at root with children bin (link\nto usr/bin), boot, dev, etc (marked for auditing, containing passwd, group,\nshadow, sudoers, ssh and systemd), home, proc and sys, root, run, tmp (marked\nworld-writable), usr (with bin, lib and share), and var (with log marked as\nwhere investigations start, and lib).\n\nFIGURE C03-M02-F2: How the shell processes a command line\nPurpose: Show parsing order.\n\n  [BEGIN DIAGRAM]\n  You type:   grep -n \"ERROR\" $LOG | wc -l > count.txt\n      |\n  1. Split into words and operators (respect quotes)\n      |\n  2. Expand: $LOG -> logs/app.log ; globs ; $(...)\n      |\n  3. Set up pipe (|) and redirection (> count.txt)\n      |\n  4. Find commands: grep (/usr/bin/grep), wc (/usr/bin/wc) via PATH\n      |\n  5. Run: grep's stdout --pipe--> wc's stdin ; wc's stdout --> count.txt\n  [END DIAGRAM]\n\nCaption: Figure C03-M02-F2. The shell splits, expands, sets up redirections\nand pipes, locates commands and runs them.\nAccessibility description: A five-step vertical flow from a typed command\nline through word splitting, expansion, pipe and redirection set-up, command\nlookup via PATH, and execution with output flowing through the pipe to a\nfile.\n\nFIGURE C03-M02-F3: Reading an ls -l line\nPurpose: Label each field.\n\n  [BEGIN DIAGRAM]\n  -rw-r--r--  1  mario  mario   17  Nov 7 02:19  notes.txt\n  | |  |  |   |    |      |     |        |           |\n  | |  |  |   |    |      |     |        |           +-- name\n  | |  |  |   |    |      |     |        +-- modification time\n  | |  |  |   |    |      |     +-- size (bytes)\n  | |  |  |   |    |      +-- group\n  | |  |  |   |    +-- owner\n  | |  |  |   +-- hard link count\n  | |  |  +-- others' permissions (r--)\n  | |  +-- group permissions (r--)\n  | +-- owner permissions (rw-)\n  +-- file type (- regular, d dir, l link)\n  [END DIAGRAM]\n\nCaption: Figure C03-M02-F3. Fields of a long directory listing.\nAccessibility description: The line \"-rw-r--r-- 1 mario mario 17 Nov 7\n02:19 notes.txt\" with arrows labelling type, owner, group and other\npermissions, link count, owner, group, size, time and name.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nA Linux distribution combines the kernel with user-space tools, package\nmanagement, an init system and an update process; families include Debian/\nUbuntu (apt), Red Hat (dnf), SUSE, Arch and Alpine; fixed/LTS releases suit\nproduction, rolling releases bring the newest code (relevant to the 2024 xz\nUtils compromise). /etc/os-release and uname identify a system. The shell\nsplits, expands (variables, globs, substitution), redirects, pipes and runs\ncommands found via PATH; quoting controls expansion; builtins like cd run\ninside the shell. The FHS defines one tree from /: /etc configuration,\n/var/log logs, /home user data, /tmp world-writable with sticky bit, /usr\npackage-managed programs (with /bin often linked into /usr), /proc and /sys\nvirtual information. Files are inodes referenced by names; links and types\nappear in ls -l. Core commands: pwd, cd, ls, mkdir, touch, cp, mv, rm, file,\nstat, find, du, df, cat, less, head, tail, wc, grep, cut, man. Safe habits:\npreview before deleting, quote variables, use ${var:?}, set -e/-u, avoid\nroot.\n\n8.2 Important concepts\n  - Kernel and distribution are separate components.\n  - Quoting and expansion determine what a command actually receives.\n  - Know where configuration, logs and user data live.\n  - Destructive commands need guards.\n\n8.3 Key technical takeaways\n  - ls -l fields; file vs permissions; stat formatting.\n  - find -name, -mmin, -perm, -size; grep -n -i -v -E -r.\n  - >, >>, 2>, |, $(...).\n\n8.4 Glossary\n  Absolute path    Path from /.\n  bash             GNU Bourne-Again Shell.\n  Distribution     Packaged Linux operating system.\n  FHS              Filesystem Hierarchy Standard.\n  Glob             Wildcard pattern expanded by the shell.\n  Inode            File metadata structure.\n  LTS              Long-term support release.\n  PATH             Variable listing directories searched for commands.\n  Pipe             Connects one command's output to another's input.\n  Redirection      Sending input/output to/from files.\n  Relative path    Path from the current directory.\n  Rolling release  Continuously updated distribution.\n  Sticky bit       Directory permission restricting deletion to owners.\n  Symbolic link    File pointing to another path.\n\n8.5 Common mistakes\n  - Forgetting quotes around variables and patterns.\n  - Using > when >> was meant.\n  - Running unknown scripts as root.\n  - Assuming file extensions reveal content.\n  - Ignoring permission-denied errors when a search seems empty.\n\n8.6 Revision questions\n  1. Explain three differences between Debian-family and Red Hat-family\n     systems.\n  2. Describe the shell's expansion steps with an example.\n  3. Why might /tmp be mounted noexec?\n  4. Write a find command for setuid files and explain it.\n  5. Explain hard and symbolic links.\n\n8.7 Further reading\n  - Filesystem Hierarchy Standard 3.0 [C03-M02-R3].\n  - GNU Bash Reference Manual, \"Shell Expansions\" [C03-M02-R2].\n  - CISA alert on CVE-2024-3094 [C03-M02-R4].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
