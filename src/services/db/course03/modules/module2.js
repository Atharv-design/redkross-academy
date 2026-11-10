/**
 * Course 03: Linux and Windows System Administration
 * Module 2: Linux Environment & File Hierarchy
 * High-Craft Academic Textbook Architecture
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
      "content": "## 2.1 Linux Distributions: Upstream Kernels, Package Formats & Enterprise Lineages\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D10: Linux Distribution Genealogy: Lineages, Package Formats & Init Systems](/assets/courses/cyber-03/c03_m02_l01_linux_distributions_genealogy.png)\n\n*Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).*\n\n### 2.1.1 What a distribution is\n\n\"Linux\" strictly names the kernel. A distribution (distro) packages the\nkernel with user-space software - a C library, core utilities (often GNU\ncoreutils), an init system (usually systemd), a package manager, default\nconfiguration and a security update process - into an installable operating\nsystem.\n\n### 2.1.2 Major families\n\n- **Debian family:** Debian, Ubuntu, Linux Mint, Kali Linux. Packages in .deb format, managed with apt/dpkg.\n- **Red Hat family:** Red Hat Enterprise Linux (RHEL), Fedora, CentOS Stream, Rocky Linux, AlmaLinux. Packages in .rpm format, managed with dnf/rpm.\n- **SUSE family:** SUSE Linux Enterprise, openSUSE (zypper).\n- **Independent:** Arch Linux (pacman, rolling release), Alpine Linux (musl libc, BusyBox, apk; very small; popular for containers - used in Course 02's labs).\n\n### 2.1.3 Release models\n\n- **Fixed / LTS:** Versions released on a schedule and supported for years with security fixes (for example Ubuntu LTS releases and RHEL). Preferred for servers.\n- **Rolling:** Continuous updates to the newest software (Arch, Debian testing/unstable, Fedora Rawhide). Newest features, more change and risk.\nSecurity point: what matters most is that the release you run still receives\nsecurity updates. Running an end-of-life release means known vulnerabilities\nstay unpatched.\n\n### 2.1.4 Identifying a system (execution-tested)\n\n```bash\ngrep -E '^(PRETTY_NAME|ID|VERSION_ID)=' /etc/os-release\n  uname -sr\n```\n\n```terminal\nPRETTY_NAME=\"Ubuntu 26.04 LTS\"\n  VERSION_ID=\"26.04\"\n  ID=ubuntu\n  Linux 6.6.114.1-microsoft-standard-WSL2\n```\n\n- **/etc/os-release:** Standard file describing the distribution (documented in os-release(5)) [C03-M02-R1].\n- **uname -sr:** Kernel name and release. Here the kernel is Microsoft's WSL2 kernel, while the user space is Ubuntu - a reminder that kernel and distribution are separate components.\n\n### 2.1.5 Choosing a distribution in an organisation\n\nConsider: support lifetime, vendor support contracts, security update\nprocess, hardening guidance available (for example CIS Benchmarks, Module 8),\ncompatibility with required software, skills of the team, and certification\nrequirements. Security distributions such as Kali Linux bundle testing tools\nand are for authorised testing workstations, not general servers.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D11: Software Supply Chain: Package Cryptographic Verification Pipeline (APT/RPM)](/assets/courses/cyber-03/c03_m02_l01_package_verification_pipeline.png)\n\n*Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
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
      "content": "## 2.2 The Shell: Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F2: How the Shell Processes a Command Line: Tokenization to execve](/assets/courses/cyber-03/C03-M02-F2.png)\n\n*Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.*\n\n### 2.2.1 Terminal, shell and command line\n\n- **Terminal:** The window or console that displays text and sends your keystrokes.\n- **Shell:** The program that reads your commands, interprets them and runs programs. Common shells: bash (default on many distributions), zsh, dash (/bin/sh on Debian/Ubuntu for scripts) and BusyBox ash on Alpine.\n- **Prompt:** Text such as mario@host:~$ showing user, host and current directory; \"$\" for normal users and \"#\" conventionally for root.\n\nExecution-tested: echo \"SHELL=$SHELL\" printed SHELL=/bin/bash, and bash\n--version reported GNU bash, version 5.3.9(1)-release.\n\n### 2.2.2 Anatomy of a command\n\n- **command:** options        arguments\n- **ls:** -la            /var/log\n  Options modify behaviour (short -l, combined -la, long --all); arguments\n  are what the command acts on.\n\n### 2.2.3 How the shell processes a line (simplified order)\n\n  1. Splits the line into words, respecting quotes.\n  2. Expands variables ($HOME), command substitution ($(date)), arithmetic\n     and globs (*.txt).\n  3. Sets up redirections (>, >>, <, 2>) and pipes (|).\n  4. Finds the command: shell builtin, alias, function, or an executable in\n     a directory listed in PATH.\n  5. Runs it and waits (unless & runs it in the background).\nThe bash manual describes these expansions in detail [C03-M02-R2].\n\n### 2.2.4 Variables and quoting\n\n  name=\"RedKross\"       Set a shell variable (no spaces around =).\n  echo \"$name\"          Double quotes: variables expand, spaces preserved.\n  echo '$name'          Single quotes: literal text, no expansion.\n  export PATH=\"$PATH:$HOME/bin\"   Environment variable inherited by child\n                        processes.\nSecurity habit: always quote variables (\"$file\") in commands and scripts.\nAn unquoted variable containing spaces or wildcards may be split or expanded\ninto multiple arguments - a common cause of scripts deleting the wrong\nfiles.\n\n### 2.2.5 Globbing (wildcards)\n\n  *       any characters      ls docs/*.txt\n  ?       one character       ls file?.log\n  [abc]   one listed character\nThe shell expands globs before running the command. Execution-tested:\nls docs/*.txt listed docs/notes.txt and docs/old-notes.txt.\n\n### 2.2.6 Pipes and redirection\n\n  cmd > file     write standard output to file (overwrite)\n  cmd >> file    append\n  cmd 2> err.txt redirect standard error\n  cmd > out 2>&1 redirect both output and errors\n  cmd < file     read standard input from file\n  cmd1 | cmd2    send cmd1's output to cmd2's input\nExecution-tested: grep INFO logs/app.log | wc -l printed 2 - grep selected\nlines containing INFO and wc -l counted them.\nCaution: > silently overwrites. In bash, set -o noclobber prevents\naccidental overwriting with >.\n\n### 2.2.7 Builtins and external commands\n\nExecution-tested: which ls printed /usr/bin/ls (an external program), while\ntype cd printed \"cd is a shell builtin\" - cd must be built in because a\nchild process cannot change its parent shell's directory.\n\n### 2.2.8 History and editing\n\nUp/down arrows recall commands; history lists them; Ctrl+R searches; Tab\ncompletes names. Security note: commands typed with passwords on the command\nline may be saved in ~/.bash_history and visible in process listings - pass\nsecrets through prompts or files with strict permissions instead.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D12: Standard Streams & Pipeline Mechanics: stdin (0), stdout (1), stderr (2)](/assets/courses/cyber-03/c03_m02_l02_standard_streams_redirection.png)\n\n*Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
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
      "content": "## 2.3 The Filesystem Hierarchy Standard (FHS 3.0): Root Topologies & Virtual FS\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F1: The Linux Filesystem Hierarchy Standard (FHS 3.0): Directory Topologies](/assets/courses/cyber-03/C03-M02-F1.png)\n\n*Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).*\n\n### 2.3.1 One tree\n\nLinux has a single directory tree starting at the root \"/\". Disks,\npartitions and network shares are mounted onto directories in this tree;\nthere are no drive letters. The Filesystem Hierarchy Standard (FHS) 3.0,\nmaintained by the Linux Foundation, defines where things belong\n[C03-M02-R3].\n\nExecution-tested top level on Ubuntu 26.04 (WSL2):\n  bin boot dev etc home init lib lib64 lost+found media mnt opt proc root\n  run sbin snap srv sys tmp usr var\n(init and snap are specific to WSL and Ubuntu's snap packaging.)\n\n### 2.3.2 Key directories and their security relevance\n\n- **/:** Root of the tree.\n  /bin, /sbin  Essential user and system binaries. On modern distributions\n             these are often symbolic links into /usr (\"merged /usr\"):\n             execution-tested, /bin -> usr/bin on Ubuntu 26.04.\n- **/usr:** Read-only shareable programs and data: /usr/bin, /usr/lib, /usr/share. Changes here outside the package manager are suspicious.\n- **/etc:** System-wide configuration (passwd, group, shadow, ssh/, sudoers, systemd/). A primary target for auditing and change monitoring.\n- **/var:** Variable data: /var/log (logs - Module 3), /var/lib (state data such as databases), /var/spool, /var/tmp.\n- **/home:** Users' home directories (/home/mario). Contains user configuration (\"dotfiles\") such as ~/.ssh and ~/.bash_history.\n- **/root:** Home directory of the root user.\n- **/tmp:** Temporary files, writable by everyone, usually cleared at boot. Execution-tested permissions drwxrwxrwt: the final \"t\" is the sticky bit, so users can delete only their own files (Module 3). World-writable locations are commonly used by attackers to stage files, which is why some hardening guides mount /tmp with noexec (Module 8).\n- **/dev:** Device files (disks /dev/sda, /dev/null, terminals).\n  /proc, /sys  Virtual file systems exposing kernel and process information\n             (Module 1).\n- **/boot:** Kernel images, initramfs, boot loader files.\n- **/opt:** Add-on application software.\n- **/srv:** Data served by the system (web, FTP).\n  /mnt, /media Mount points for temporary and removable media.\n- **/run:** Runtime data since boot (PID files, sockets).\n  /lib, /lib64 Shared libraries and kernel modules.\n\n### 2.3.3 Files and inodes\n\nEach file has metadata in an inode: type, permissions, owner, size,\ntimestamps and pointers to data blocks. The file name is just a directory\nentry pointing to the inode. Consequences:\n- Hard links: several names for one inode.\n- Symbolic links: special files containing a path to another file\n    (like /bin -> usr/bin).\n- Deleting a name removes the link; data is freed only when no names and no\n    open handles remain - relevant in forensics (Course 09).\n\n### 2.3.4 Everything is a file (mostly)\n\nRegular files, directories, symbolic links, device files, named pipes and\nsockets all appear in the tree. ls -l shows the type as the first character:\n- regular, d directory, l link, c character device, b block device, p pipe,\ns socket.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D13: Virtual Kernel Filesystems: /proc & /sys Memory Projections](/assets/courses/cyber-03/c03_m02_l03_proc_sys_virtual_filesystems.png)\n\n*Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
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
      "content": "## 2.4 Navigation and Paths: Absolute vs. Relative Resolution & Path Traversal Risks\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D14: Path Traversal Defense: Absolute vs. Relative Paths & Directory Canonicalization](/assets/courses/cyber-03/c03_m02_l04_path_traversal_canonicalization.png)\n\n*Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.*\n\n### 2.4.1 Absolute and relative paths\n\n- **Absolute:** Starts from root: /var/log/syslog\n- **Relative:** Starts from the current directory: logs/app.log\n- **.:** current directory\n- **..:** parent directory\n  ~         your home directory (expanded by the shell)\n\n### 2.4.2 Core navigation commands\n\n- **pwd:** print working directory (execution-tested: /home/mario)\n- **cd /var/log:** change to an absolute path\n- **cd ..:** up one level\n- **cd -:** back to the previous directory\n- **cd:** (no argument) home directory\n- **ls:** list directory contents\n- **ls -l:** long format: permissions, links, owner, group, size, modification time, name\n- **ls -a:** include hidden \"dot\" files\n- **ls -lh:** human-readable sizes\n- **ls -lt:** sort by modification time (newest first) - useful when looking for recently changed files\n\n### 2.4.3 Reading ls -l (execution-tested; spacing compressed)\n\n```terminal\ntotal 12\n  drwxr-xr-x 2 mario mario 4096 Nov 7 02:19 .\n  drwxr-xr-x 5 mario mario 4096 Nov 7 02:19 ..\n  -rw-r--r-- 1 mario mario 17 Nov 7 02:19 notes.txt\n```\n\n- **-rw-r--r--:** type (-) and permissions: owner rw-, group r--, others r-- (Module 3 explains permissions fully).\n- **1:** number of hard links.\n- **mario mario:** owner and group.\n- **17:** size in bytes (\"alpha\\nbeta\\ngamma\\n\" = 17 bytes).\n  Nov 7 02:19  last modification time.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D15: Inodes, Directory Entries & Filesystem Storage Allocation](/assets/courses/cyber-03/c03_m02_l04_inodes_and_disk_blocks.png)\n\n*Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
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
      "content": "## 2.5 Working with Files and Directories: Inodes, Links, Metadata & Deletion Lifecycles\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F3: Reading an ls -l Listing: Anatomy of Linux File Metadata](/assets/courses/cyber-03/C03-M02-F3.png)\n\n*Figure C03-M02-F3: Detailed breakdown of an 'ls -l' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.*\n\n### 2.5.1 Creating\n\n- **mkdir dir:** create a directory\n- **mkdir -p a/b/c:** create parents as needed\n  mkdir -p lab/{docs,logs,scripts}   brace expansion creates three at once\n                        (bash feature; execution-tested)\n- **touch file:** create an empty file or update its timestamp\n  printf 'a\\nb\\n' > f   create a file with exact content\n\n### 2.5.2 Copying, moving, renaming\n\n- **cp src dst:** copy a file\n- **cp -r srcdir dstdir:** copy recursively\n- **cp -a src dst:** archive mode: preserve permissions, ownership, timestamps (where permitted)\n- **mv old new:** rename or move (within one file system, just renames the directory entry)\nExecution-tested: cp docs/notes.txt docs/notes.bak then mv docs/notes.bak\ndocs/old-notes.txt left notes.txt and old-notes.txt in docs/.\n\n### 2.5.3 Deleting - safely\n\n- **rm file:** remove a file (no recycle bin)\n- **rm -r dir:** remove a directory and its contents\n- **rm -i file:** ask before each removal\n- **rmdir dir:** remove an empty directory\nSafe habits:\n- Run ls with the same pattern first to see what would be deleted.\n- Avoid rm -rf with variables; in scripts, guard with checks such as\n    [ -n \"$dir\" ] and use \"${dir:?}\" so an empty variable causes an error\n    instead of deleting the wrong place.\n- Prefer moving to a quarantine folder when unsure.\n- Never run commands pasted from untrusted sources as root.\n\n### 2.5.4 Identifying files\n\n- **file name:** determines type from content, not extension.\nExecution-tested:\n  docs/notes.txt:   ASCII text\n  scripts/hello.sh: POSIX shell script, ASCII text executable\nNote: \"executable\" here means file recognised a script (it starts with\n#!/bin/sh); it does not mean the execute permission is set - stat or ls -l\nshows permissions. Attackers sometimes disguise files with misleading\nextensions; file inspects the actual content.\n\n  stat -c '%n %s bytes perms=%A owner=%U' docs/notes.txt\n  -> docs/notes.txt 17 bytes perms=-rw-r--r-- owner=mario\n\n### 2.5.5 Finding files\n\n  find . -name '*.log'               by name (quote the pattern so the shell\n                                     does not expand it)\n  find /etc -type f -mmin -60        files modified in the last 60 minutes\n  find / -perm -4000 -type f 2>/dev/null   files with the setuid bit\n                                     (Module 3; an audit check)\n  find /home -type f -size +100M     large files\nExecution-tested: find . -name '*.log' printed ./logs/app.log.\n\n### 2.5.6 Disk usage\n\n- **du -sh dir:** total size of a directory (execution-tested: 32K for the lab folder)\n- **df -h:** free space per mounted file system\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D16: Hard Links vs. Symbolic Links: Inode Reference Counter vs. Path Pointers](/assets/courses/cyber-03/c03_m02_l05_hard_links_vs_symlinks.png)\n\n*Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
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
      "content": "## 2.6 Viewing, Searching & Documentation: Text Toolchains, Grep, Find & Man Sections\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D17: Linux Text Processing Pipeline: grep, awk, sed, cut, sort & uniq](/assets/courses/cyber-03/c03_m02_l06_text_toolchain_pipeline.png)\n\n*Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.*\n\n### 2.6.1 Viewing files\n\n- **cat file:** print the whole file\n- **less file:** page through (q quits, / searches)\n- **head -n 20 file:** first lines\n- **tail -n 20 file:** last lines\n- **tail -f file:** follow a growing file (watch logs live)\n- **wc -l file:** count lines\n\n### 2.6.2 Searching inside files with grep\n\n- **grep ERROR app.log:** lines containing ERROR\n- **grep -n ERROR app.log:** with line numbers (execution-tested: 2:2026-11-07 10:02 ERROR disk full)\n- **grep -i error app.log:** case-insensitive\n  grep -r \"PermitRootLogin\" /etc/ssh   recursive search\n- **grep -v INFO app.log:** lines NOT matching\n  grep -E 'ERROR|WARN' app.log  extended regular expressions\nCourse 04 Module 3 covers regular expressions in depth.\n\n### 2.6.3 Cutting fields\n\n/etc/passwd stores one account per line with colon-separated fields.\nExecution-tested:\n\n```bash\nhead -n 3 /etc/passwd | cut -d: -f1,3,6,7\n```\n\n```terminal\nroot:0:/root:/bin/bash\n  daemon:1:/usr/sbin:/usr/sbin/nologin\n  bin:2:/bin:/usr/sbin/nologin\n```\n\n  -d:        use colon as delimiter\n  -f1,3,6,7  username, UID, home directory, login shell\n\"nologin\" shells show service accounts that cannot log in interactively - a\ngood sign. Module 3 covers accounts.\n\n### 2.6.4 Getting help\n\n- **man ls:** the manual page (sections: 1 user commands, 5 file formats, 8 administration commands)\n- **man 5 passwd:** a specific section\n- **ls --help:** brief usage for most GNU tools\n  apropos keyword search manual descriptions\n- **help cd:** help for bash builtins\nLearning to read man pages is the single most useful habit for independent\nlearning on Linux.\n\n--------------------------------------------------------------------------------\n3. TECHNICAL DEEP DIVE: THE SHELL TOUR SCRIPT, LINE BY LINE\n--------------------------------------------------------------------------------\n\n3.1 Script location and status\nLAB_ASSETS/C03/rk_c03_shell_tour.sh - execution-tested on Ubuntu 26.04 LTS\n(WSL2), bash 5.3.9, as a normal (non-root) user. It creates ~/rk-lab-m02,\ndemonstrates the commands from this module and removes the folder.\n\n3.2 Selected lines explained\n\n```bash\n#!/bin/bash\n  set -e\n  mkdir -p ~/rk-lab-m02/{docs,logs,scripts}\n  cd ~/rk-lab-m02\n  printf 'alpha\\nbeta\\ngamma\\n' > docs/notes.txt\n  printf '2026-11-07 10:01 INFO start\\n2026-11-07 10:02 ERROR disk full\\n...' > logs/app.log\n  find . -print | sort\n  grep -n ERROR logs/app.log\n  grep INFO logs/app.log | wc -l\n  echo \"delta\" >> docs/notes.txt; tail -n 2 docs/notes.txt\n  cd ~; rm -r ~/rk-lab-m02\n```\n\n  #!/bin/bash     The \"shebang\": run this file with bash.\n- **set -e:** Stop at the first failing command - a safety habit so a failed cd does not lead to commands running in the wrong place.\n  mkdir -p ...{docs,logs,scripts}  brace expansion creates three folders.\n  printf '...\\n'  writes exact content with newline escapes (more\n                  predictable than echo for this purpose).\n  find . -print | sort   lists every path, sorted, as a simple tree view.\n  grep -n / | wc -l      search and count, as in L06.\n  >>              appends without destroying existing content.\n  cd ~; rm -r ... removes only the folder the script created, using an\n                  explicit path rather than a variable.\n\n3.3 Output (exact, selected)\n\n```terminal\n== tree-like listing\n  .\n  ./docs\n  ./docs/notes.txt\n  ./logs\n  ./logs/app.log\n  ./scripts\n  ./scripts/hello.sh\n  == grep ERROR\n  2:2026-11-07 10:02 ERROR disk full\n  == pipes: count INFO lines\n  2\n  == redirection\n  gamma\n  delta\n  == cleaned: removed\n```\n\n--------------------------------------------------------------------------------\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M02-CS1: The xz Utils supply-chain compromise, 2024 - why\ndistribution choice and release models matter\n------------------------------------------------------------------------\nContext: XZ Utils is a data compression library and tool shipped with many\nLinux distributions.\n\nWhat happened: on 29 March 2024 CISA reported that malicious code had been\nembedded in XZ Utils versions 5.6.0 and 5.6.1 (CVE-2024-3094) and\nrecommended downgrading to an uncompromised version such as 5.4.6 Stable,\nhunting for malicious activity and reporting findings [C03-M02-R4]. The\nissue was discovered by a developer who investigated unusual behaviour and\nperformance on a test system, and was disclosed before the affected versions\nreached most stable, long-term-support releases; Red Hat's advisory, linked\nby CISA, addressed users of Fedora 41 and Fedora Rawhide [C03-M02-R5].\n\nHow it relates to this module: the compromised versions were very new.\nDistributions with rolling or development release models picked up new\nupstream versions quickly, while stable/LTS releases, which adopt new\nversions more slowly, were largely not affected at the time of disclosure.\n\nLessons learned:\n- Release models are a risk decision: newest is not always safest for\n    production.\n- Knowing your distribution and exact package versions (L01; package\n    queries in Module 3) is how you answer \"are we affected?\" quickly.\n- Careful observation of anomalies on Linux systems (a developer noticing\n    something unusual) remains one of the best detection controls.\n- Open-source supply-chain security is covered in Course 12 and Course 21.\n\nCASE STUDY C03-M02-CS2 (FICTIONAL TEACHING SCENARIO): The empty variable\n------------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: an administrator at Orchid Payments (fictional) wrote a clean-up\nscript containing rm -rf $BUILD_DIR/* to clear a build folder.\n\nProblem: on one server, BUILD_DIR was not set. The shell expanded the line to\nrm -rf /*, and because the script ran as root, it began deleting the\nsystem.\n\nImpact: the server had to be rebuilt from backup.\n\nLessons: quote variables; use \"${BUILD_DIR:?BUILD_DIR not set}\" so the shell\nstops with an error if the variable is empty; use set -u to treat unset\nvariables as errors; avoid running scripts as root unless necessary; test on\nnon-production systems (Module 4).\n\n--------------------------------------------------------------------------------\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D18: Linux Man Pages: The 8 Standard Sections & Offline Documentation Search](/assets/courses/cyber-03/c03_m02_l06_man_sections_architecture.png)\n\n*Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with 'man -k' and 'whatis'.*\n\n### Platform Architectural Comparison: Linux vs. Windows NT\n\n| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n| :--- | :--- | :--- | :--- |\n| **Kernel Model** | Monolithic with Loadable Kernel Modules (`.ko`) | Hybrid Executive with Microkernel & signed drivers (`.sys`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n| **Primary Privilege Root** | `root` (UID 0) + POSIX Linux Capabilities | `NT AUTHORITY\\SYSTEM` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n| **Configuration Store** | Plaintext modular files under `/etc` and `/proc` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; `/etc` requires file integrity monitoring |\n| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (`setfacl`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (`set -euo pipefail`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n> [!WARNING]\n> **Operational Defense Invariant:**\n> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n"
    }
  ]
};
