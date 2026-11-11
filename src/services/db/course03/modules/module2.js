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
      "content": "## 2.1 Linux Distributions: Upstream Kernels, Package Formats & Enterprise Lineages\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D10: Linux Distribution Genealogy: Lineages, Package Formats & Init Systems](/assets/courses/cyber-03/c03_m02_l01_linux_distributions_genealogy.png)\n\n*Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Upstream Kernel & Userland Foundation:** The Linux ecosystem originates from the upstream Linux kernel source (maintained at `kernel.org`) combined with the GNU userland toolchain (including GCC, glibc, binutils, and coreutils). Every downstream enterprise distribution derives its core execution capabilities from this shared foundation.\n- **Debian Enterprise Family:** Emphasizing stability, open-source rigor, and extensive package repositories, the Debian lineage packages software in `.deb` archives managed by `apt` and `dpkg`. Canonical's **Ubuntu** builds commercial workstation and cloud server platforms on this base, while specialized distributions like **Kali Linux** adapt it for offensive security penetration testing with pre-compiled toolchains.\n- **Red Hat Enterprise Lineage:** Architected for mission-critical enterprise data centers and regulated environments, the Red Hat family utilizes `.rpm` package archives managed by `dnf` and `rpm`. Upstream innovation begins in the community-driven **Fedora** distribution, which hardens into commercial **Red Hat Enterprise Linux (RHEL)**, subsequently tracked by 1:1 bug-for-bug binary-compatible enterprise distributions such as **Rocky Linux** and **AlmaLinux**.\n- **SUSE Commercial Lineage:** Serving commercial European enterprise and SAP enterprise infrastructure, the SUSE family pairs RPM packaging with the specialized `zypper` package manager, bridging open-source community testing in **openSUSE** with mission-critical **SUSE Linux Enterprise Server (SLES)** deployments.\n- **Specialized & Minimal Container Lineage:** Independent distributions diverge from traditional GNU/glibc architectures. **Alpine Linux** pairs the lightweight `musl libc` library with `BusyBox` and the `apk` package manager, running the lightweight `OpenRC` init system instead of systemd to achieve minimal container image sizes (under 10 MB) and a drastically reduced attack surface.\n- **Defensive Engineering Implication:** Administrators must recognize that package formats (`.deb`, `.rpm`, `.apk`) dictate dependency resolution algorithms, update cadence, and patch management strategies. Selecting minimal distributions like Alpine in containerized deployments eliminates unnecessary compilers and shell utilities, mitigating remote code execution exploit chains.\n\n### 2.1.1 What a distribution is\n\n\"Linux\" strictly names the kernel. A distribution (distro) packages the\nkernel with user-space software - a C library, core utilities (often GNU\ncoreutils), an init system (usually systemd), a package manager, default\nconfiguration and a security update process - into an installable operating\nsystem.\n\n### 2.1.2 Major families\n\n- **Debian family:** Debian, Ubuntu, Linux Mint, Kali Linux. Packages in .deb format, managed with apt/dpkg.\n- **Red Hat family:** Red Hat Enterprise Linux (RHEL), Fedora, CentOS Stream, Rocky Linux, AlmaLinux. Packages in .rpm format, managed with dnf/rpm.\n- **SUSE family:** SUSE Linux Enterprise, openSUSE (zypper).\n- **Independent:** Arch Linux (pacman, rolling release), Alpine Linux (musl libc, BusyBox, apk; very small; popular for containers - used in Course 02's labs).\n\n### 2.1.3 Release models\n\n- **Fixed / LTS:** Versions released on a schedule and supported for years with security fixes (for example Ubuntu LTS releases and RHEL). Preferred for servers.\n- **Rolling:** Continuous updates to the newest software (Arch, Debian testing/unstable, Fedora Rawhide). Newest features, more change and risk.\nSecurity point: what matters most is that the release you run still receives\nsecurity updates. Running an end-of-life release means known vulnerabilities\nstay unpatched.\n\n### 2.1.4 Identifying a system (execution-tested)\n\n```bash\ngrep -E '^(PRETTY_NAME|ID|VERSION_ID)=' /etc/os-release\n  uname -sr\n```\n\n```terminal\nPRETTY_NAME=\"Ubuntu 26.04 LTS\"\n  VERSION_ID=\"26.04\"\n  ID=ubuntu\n  Linux 6.6.114.1-microsoft-standard-WSL2\n```\n\n- **/etc/os-release:** Standard file describing the distribution (documented in os-release(5)) [C03-M02-R1].\n- **uname -sr:** Kernel name and release. Here the kernel is Microsoft's WSL2 kernel, while the user space is Ubuntu - a reminder that kernel and distribution are separate components.\n\n### 2.1.5 Choosing a distribution in an organisation\n\nConsider: support lifetime, vendor support contracts, security update\nprocess, hardening guidance available (for example CIS Benchmarks, Module 8),\ncompatibility with required software, skills of the team, and certification\nrequirements. Security distributions such as Kali Linux bundle testing tools\nand are for authorised testing workstations, not general servers.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D11: Software Supply Chain: Package Cryptographic Verification Pipeline (APT/RPM)](/assets/courses/cyber-03/c03_m02_l01_package_verification_pipeline.png)\n\n*Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Stage 1 — Repository Metadata Retrieval (`apt update`):** The client system queries the configured APT repository (e.g., `archive.ubuntu.com`) and downloads the cryptographically signed `InRelease` manifest. This index contains comprehensive repository metadata, suite definitions, a complete index of package filenames and versions, and corresponding SHA-256 cryptographic digests.\n- **Stage 2 — GPG Digital Signature Verification:** The APT client verifies the detached OpenPGP digital signature embedded within the `InRelease` file against trusted public verification keys stored in the local system directory `/etc/apt/trusted.gpg.d/`. Successful signature verification establishes that the repository manifest has not been altered or forged by a network adversary.\n- **Stage 3 — Package Archive Retrieval (`apt install`):** Once the repository metadata is verified, the client requests and downloads the exact binary package archive (`.deb`) listed in the manifest across network mirrors.\n- **Stage 4 — Cryptographic Integrity Verification (SHA-256):** Before executing any package installation scripts, the local package manager computes the SHA-256 checksum of the downloaded `.deb` file (`sha256sum package.deb`) and performs an exact bitwise comparison against the expected digest published in the signed `InRelease` manifest.\n- **Stage 5 — Execution Decision (Install vs. Abort):** If the computed hash matches the signed digest, APT extracts the `.deb` archive and unpacks executable binaries, libraries, and configuration files into their target filesystem directories (`/usr/bin`, `/usr/lib`). If the hash mismatches, installation is aborted immediately with a fatal security error (`E: Hash sum mismatch!`), preventing corrupted or tampered files from reaching disk.\n- **Defensive Engineering Implication:** This cryptographic chain of custody protects operating systems against Man-in-the-Middle (MITM) package tampering, mirror compromise, and cache poisoning. System administrators must avoid insecure practices like running `apt-key add` with arbitrary web keys or using the `[trusted=yes]` flag in repository sources, as disabling signature checks permits arbitrary root-level code execution via unsigned deb installation scripts."
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
      "content": "## 2.2 The Shell: Parsing Pipeline, Quoting Invariants, Globbing & Stream Redirection\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F2: How the Shell Processes a Command Line: Tokenization to execve](/assets/courses/cyber-03/C03-M02-F2.png)\n\n*Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Stage 1 — Read Line & Lexical Tokenization:** The shell reads the raw user input string (e.g., `grep \"hello world\" > out.txt`) and decomposes it into discrete lexical tokens—words and control operators—delimited by the internal field separator (`IFS`, defaulting to space, tab, and newline). Quoted strings preserve embedded spaces as a single token.\n- **Stage 2 — Shell Expansions & Quote Removal:** The shell executes macro expansions in a strict sequential order: Brace expansion (`{a,b}`), Tilde expansion (`~ -> /home/user`), Parameter and variable expansion (`$VAR`), Command substitution (`$(cmd)`), Arithmetic expansion (`$((1+1))`), Word splitting on expanded results, and Pathname expansion (globbing with `*`, `?`, `[]`). Once all substitutions complete, quote characters (`\"` and `'`) are stripped.\n- **Stage 3 — Redirection Processing & File Descriptor Setup:** The shell scans for redirection operators (`<`, `>`, `>>`, `2>&1`). It opens target files and updates the process's internal file descriptor table (e.g., assigning file descriptor 1 to `out.txt`), preparing the I/O channel before the command runs.\n- **Stage 4 — Command Identification & Resolution:** The shell resolves the command token in strict precedence order:\n  1. *Aliases:* Checks if an alias is defined (e.g., `ll -> ls -l`).\n  2. *Shell Builtins:* Checks for builtins that modify shell state internally (`cd`, `exit`, `export`, `set`).\n  3. *Shell Functions:* Checks for active in-memory functions (`myfunc()`).\n  4. *Executable Scan ($PATH):* Scans colon-delimited directories listed in `$PATH` sequentially until an executable binary (e.g., `/bin/grep`) is located.\n- **Stage 5 — Process Spawning via `fork()` & `execve()`:** The shell executes `fork()` to duplicate its execution context into an isolated child process, inheriting the configured file descriptor redirections. The child process then invokes `execve()`, replacing its memory space with the compiled binary code of the target program.\n- **Defensive Engineering Implication:** Understanding shell parsing sequence is vital for preventing command injection vulnerabilities. Because expansions occur prior to execution, unquoted variables in shell scripts allow malicious user inputs containing shell metacharacters (`;`, `|`, `$()`) to hijack control flow, emphasizing the defensive necessity of strict parameter quoting and defensive input validation.\n\n### 2.2.1 Terminal, shell and command line\n\n- **Terminal:** The window or console that displays text and sends your keystrokes.\n- **Shell:** The program that reads your commands, interprets them and runs programs. Common shells: bash (default on many distributions), zsh, dash (/bin/sh on Debian/Ubuntu for scripts) and BusyBox ash on Alpine.\n- **Prompt:** Text such as mario@host:~$ showing user, host and current directory; \"$\" for normal users and \"#\" conventionally for root.\n\nExecution-tested: echo \"SHELL=$SHELL\" printed SHELL=/bin/bash, and bash\n--version reported GNU bash, version 5.3.9(1)-release.\n\n### 2.2.2 Anatomy of a command\n\n- **command:** options        arguments\n- **ls:** -la            /var/log\n  Options modify behaviour (short -l, combined -la, long --all); arguments\n  are what the command acts on.\n\n### 2.2.3 How the shell processes a line (simplified order)\n\n  1. Splits the line into words, respecting quotes.\n  2. Expands variables ($HOME), command substitution ($(date)), arithmetic\n     and globs (*.txt).\n  3. Sets up redirections (>, >>, <, 2>) and pipes (|).\n  4. Finds the command: shell builtin, alias, function, or an executable in\n     a directory listed in PATH.\n  5. Runs it and waits (unless & runs it in the background).\nThe bash manual describes these expansions in detail [C03-M02-R2].\n\n### 2.2.4 Variables and quoting\n\n  name=\"RedKross\"       Set a shell variable (no spaces around =).\n  echo \"$name\"          Double quotes: variables expand, spaces preserved.\n  echo '$name'          Single quotes: literal text, no expansion.\n  export PATH=\"$PATH:$HOME/bin\"   Environment variable inherited by child\n                        processes.\nSecurity habit: always quote variables (\"$file\") in commands and scripts.\nAn unquoted variable containing spaces or wildcards may be split or expanded\ninto multiple arguments - a common cause of scripts deleting the wrong\nfiles.\n\n### 2.2.5 Globbing (wildcards)\n\n  *       any characters      ls docs/*.txt\n  ?       one character       ls file?.log\n  [abc]   one listed character\nThe shell expands globs before running the command. Execution-tested:\nls docs/*.txt listed docs/notes.txt and docs/old-notes.txt.\n\n### 2.2.6 Pipes and redirection\n\n  cmd > file     write standard output to file (overwrite)\n  cmd >> file    append\n  cmd 2> err.txt redirect standard error\n  cmd > out 2>&1 redirect both output and errors\n  cmd < file     read standard input from file\n  cmd1 | cmd2    send cmd1's output to cmd2's input\nExecution-tested: grep INFO logs/app.log | wc -l printed 2 - grep selected\nlines containing INFO and wc -l counted them.\nCaution: > silently overwrites. In bash, set -o noclobber prevents\naccidental overwriting with >.\n\n### 2.2.7 Builtins and external commands\n\nExecution-tested: which ls printed /usr/bin/ls (an external program), while\ntype cd printed \"cd is a shell builtin\" - cd must be built in because a\nchild process cannot change its parent shell's directory.\n\n### 2.2.8 History and editing\n\nUp/down arrows recall commands; history lists them; Ctrl+R searches; Tab\ncompletes names. Security note: commands typed with passwords on the command\nline may be saved in ~/.bash_history and visible in process listings - pass\nsecrets through prompts or files with strict permissions instead.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D12: Standard Streams & Pipeline Mechanics: stdin (0), stdout (1), stderr (2)](/assets/courses/cyber-03/c03_m02_l02_standard_streams_redirection.png)\n\n*Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **POSIX Standard Stream Triad:** Unix and Linux processes inherit three standard I/O streams referenced by integer file descriptors: File Descriptor 0 (`stdin`, read stream), File Descriptor 1 (`stdout`, standard output write stream), and File Descriptor 2 (`stderr`, diagnostic and error write stream).\n- **Ingress Channels into Process A:** A running command (such as `grep`) receives input data across File Descriptor 0. By default, `stdin` connects to keyboard input from the terminal emulator, but can be redirected to receive input from a file (`< file`) or from a preceding command via a pipe (`|`).\n- **Kernel Pipe Mechanism (Ring Buffer):** When commands are linked with a pipe (`Process A | Process B`), the kernel creates a unidirectional in-memory FIFO ring buffer (typically 64 KB). The standard output (`stdout`, FD 1) of Process A is connected directly to the write end of the pipe, while the standard input (`stdin`, FD 0) of Process B connects to the read end, enabling streaming data processing without intermediate disk writes.\n- **Diagnostic Stream Routing (FD 2):** Process A emits error messages and operational warnings across File Descriptor 2 (`stderr`), separated from data output. Three distinct routing paths are available:\n  - *Direct to Terminal:* By default, `stderr` prints unbuffered diagnostics directly to the terminal display.\n  - *File Redirection (`2> error.log`):* Isolates errors into a dedicated log file while allowing clean standard output to traverse the pipeline.\n  - *Stream Merging (`2>&1`):* Merges `stderr` into `stdout`, redirecting diagnostic error messages into the same downstream pipe or file.\n- **Practical Operational Sequences:** Demonstrates real-world security filtering: `grep \"error\" app.log | awk '{print $1}'` pipes matching error lines directly into `awk` for IP extraction; `grep \"error\" app.log 2> error.log` separates audit errors; and `grep \"error\" app.log 2>&1 | awk '{print}'` captures all operational telemetry into a unified analysis stream.\n- **Defensive Engineering Implication:** In incident response and automated administration, separating `stdout` from `stderr` is essential to prevent diagnostic error strings from contaminating structured data pipelines. Additionally, redirection operators must be handled securely in scripts to prevent inadvertent log truncation when using `>` instead of append (`>>`)."
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
      "content": "## 2.3 The Filesystem Hierarchy Standard (FHS 3.0): Root Topologies & Virtual FS\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F1: The Linux Filesystem Hierarchy Standard (FHS 3.0): Directory Topologies](/assets/courses/cyber-03/C03-M02-F1.png)\n\n*Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Unified Single-Root Topology:** The Filesystem Hierarchy Standard (FHS 3.0) arranges all storage devices, operating system files, and memory structures under a single root directory (`/`). Unlike Windows drive letters (`C:`, `D:`), secondary storage partitions and virtual interfaces are mounted into designated subdirectories across the root hierarchy.\n- **System Binaries & Library Separation (`/usr`):** Modern distributions implement the \"/usr-merge\" architecture: core user command binaries (`/usr/bin`), privileged system administration tools (`/usr/sbin`), and shared dynamic libraries (`/usr/lib`, `.so` files) reside inside `/usr`. Legacy root directories (`/bin`, `/sbin`, `/lib`) exist as symbolic links pointing directly into their `/usr` counterparts.\n- **Host Configuration Boundary (`/etc`):** The `/etc` tree contains static, plain-text host and service configuration files (such as SSH daemon directives, network interfaces, and systemd units). It houses critical identity databases: `/etc/passwd` (world-readable user accounts and UIDs) and `/etc/shadow` (heavily restricted encrypted password hashes, marked as a sensitive security asset).\n- **Virtual Kernel Projections (`/proc`, `/sys`, `/dev`):** Synthetic filesystems generated entirely in kernel memory: `/proc` exposes runtime process metadata and kernel tunables; `/sys` models peripheral device buses, drivers, and kernel objects; and `/dev` hosts device nodes (`/dev/sda`, `/dev/tty`) that act as character and block interfaces to physical hardware.\n- **Variable & Dynamic State (`/var`):** Houses frequently changing data: system audit telemetry and service logs in `/var/log` (`auth.log`, `syslog`), runtime lock and socket files in `/var/run` (symlinked to `/run`), and persistent temporary files in `/var/tmp`.\n- **User Homes & Mount Points:** User workspaces are isolated under `/home/<username>`, while the root superuser maintains an independent home directory at `/root` to allow administration during single-user rescue mode. Storage mount points are cleanly separated into `/mnt` (temporary manual mounts) and `/media` (automated removable media mounts).\n- **Defensive Engineering Implication:** The FHS defines critical boundary perimeters. Inode permissions must be hardened across `/etc/shadow` (mode 0640 or 0600) and `/proc/kallsyms` (restricted via `kernel.kptr_restrict`) to prevent unprivileged users from reading credential hashes or exploiting kernel address leaks for privilege escalation.\n\n### 2.3.1 One tree\n\nLinux has a single directory tree starting at the root \"/\". Disks,\npartitions and network shares are mounted onto directories in this tree;\nthere are no drive letters. The Filesystem Hierarchy Standard (FHS) 3.0,\nmaintained by the Linux Foundation, defines where things belong\n[C03-M02-R3].\n\nExecution-tested top level on Ubuntu 26.04 (WSL2):\n  bin boot dev etc home init lib lib64 lost+found media mnt opt proc root\n  run sbin snap srv sys tmp usr var\n(init and snap are specific to WSL and Ubuntu's snap packaging.)\n\n### 2.3.2 Key directories and their security relevance\n\n- **/:** Root of the tree.\n  /bin, /sbin  Essential user and system binaries. On modern distributions\n             these are often symbolic links into /usr (\"merged /usr\"):\n             execution-tested, /bin -> usr/bin on Ubuntu 26.04.\n- **/usr:** Read-only shareable programs and data: /usr/bin, /usr/lib, /usr/share. Changes here outside the package manager are suspicious.\n- **/etc:** System-wide configuration (passwd, group, shadow, ssh/, sudoers, systemd/). A primary target for auditing and change monitoring.\n- **/var:** Variable data: /var/log (logs - Module 3), /var/lib (state data such as databases), /var/spool, /var/tmp.\n- **/home:** Users' home directories (/home/mario). Contains user configuration (\"dotfiles\") such as ~/.ssh and ~/.bash_history.\n- **/root:** Home directory of the root user.\n- **/tmp:** Temporary files, writable by everyone, usually cleared at boot. Execution-tested permissions drwxrwxrwt: the final \"t\" is the sticky bit, so users can delete only their own files (Module 3). World-writable locations are commonly used by attackers to stage files, which is why some hardening guides mount /tmp with noexec (Module 8).\n- **/dev:** Device files (disks /dev/sda, /dev/null, terminals).\n  /proc, /sys  Virtual file systems exposing kernel and process information\n             (Module 1).\n- **/boot:** Kernel images, initramfs, boot loader files.\n- **/opt:** Add-on application software.\n- **/srv:** Data served by the system (web, FTP).\n  /mnt, /media Mount points for temporary and removable media.\n- **/run:** Runtime data since boot (PID files, sockets).\n  /lib, /lib64 Shared libraries and kernel modules.\n\n### 2.3.3 Files and inodes\n\nEach file has metadata in an inode: type, permissions, owner, size,\ntimestamps and pointers to data blocks. The file name is just a directory\nentry pointing to the inode. Consequences:\n- Hard links: several names for one inode.\n- Symbolic links: special files containing a path to another file\n    (like /bin -> usr/bin).\n- Deleting a name removes the link; data is freed only when no names and no\n    open handles remain - relevant in forensics (Course 09).\n\n### 2.3.4 Everything is a file (mostly)\n\nRegular files, directories, symbolic links, device files, named pipes and\nsockets all appear in the tree. ls -l shows the type as the first character:\n- regular, d directory, l link, c character device, b block device, p pipe,\ns socket.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D13: Virtual Kernel Filesystems: /proc & /sys Memory Projections](/assets/courses/cyber-03/c03_m02_l03_proc_sys_virtual_filesystems.png)\n\n*Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Synthetic In-Memory Projections:** The `/proc` (procfs) and `/sys` (sysfs) trees are not stored on physical block storage. They are synthetic, in-memory virtual filesystems generated dynamically by the Virtual Filesystem Switch (VFS) to project internal kernel data structures into the standard filesystem namespace. Reading a virtual file triggers an on-demand kernel function that serializes live memory state into ASCII text.\n- **Process State Projections (`/proc/<PID>/`):** For every running process in the system, the kernel instantiates a dynamic numerical directory matching its PID. Key virtual files include:\n  - `cmdline:` The exact command-line invocation string and arguments used to start the process.\n  - `status:` Comprehensive process metadata, including UIDs, GIDs, memory footprint (VmRSS, VmSize), and signal masks.\n  - `maps:` Detailed virtual memory space mappings showing loaded binary segments, shared libraries, heap, and stack regions.\n  - `fd/:` Directory of symbolic links representing all open file descriptors, sockets, and named pipes held by the process.\n- **Kernel Device & Tunable Model (`/sys/`):** `/sys` exposes a unified hardware and driver hierarchy managed by sysfs:\n  - `/sys/bus/:` Physical and logical buses (PCI, USB, I2C).\n  - `/sys/devices/:` Global device tree detailing all recognized hardware components.\n  - `/sys/class/:` Device classifications grouped by function (network interfaces, block storage devices, input peripherals).\n  - `/sys/kernel/:` Live kernel subsystems, memory management parameters, and security feature states.\n- **Execution Trace of a Kernel Variable Read:** The step-by-step walkthrough traces how reading `/proc/sys/net/ipv4/ip_forward` functions:\n  1. User-space shell issues a standard `read()` system call on the path string.\n  2. The VFS layer intercepts the path, recognizes it as a procfs virtual node, and routes the request to the network subsystem handler.\n  3. The kernel reads the live integer variable directly from volatile kernel RAM.\n  4. VFS converts the binary integer to ASCII and returns `1` to the user shell.\n- **Defensive Engineering Implication:** Forensic analysts utilize `/proc` to reconstruct malicious process behavior, unmask hidden command-line arguments in `/proc/<PID>/cmdline`, and recover deleted executables by reading `/proc/<PID>/exe`. System administrators use `/proc/sys/` to harden kernel security parameters (via `sysctl`) against network spoofing and SYN flood attacks."
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
      "content": "## 2.4 Navigation and Paths: Absolute vs. Relative Resolution & Path Traversal Risks\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D14: Path Traversal Defense: Absolute vs. Relative Paths & Directory Canonicalization](/assets/courses/cyber-03/c03_m02_l04_path_traversal_canonicalization.png)\n\n*Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Absolute Path Resolution Mechanics:** At the top of the architecture, an absolute path resolution begins strictly from the root directory (`/`). When resolving `/var/www/uploads/report.pdf`, the VFS traverses the filesystem graph hierarchically (`/` -> `/var` -> `/var/www` -> `/var/www/uploads` -> `report.pdf`), verifying search (`+x`) permissions on each intermediate directory. Because the resolved path resides within the intended base directory, access is safely approved.\n- **Relative Path Traversal Vulnerability:** At the bottom, an adversary attempts directory traversal by injecting relative path dot-dot sequences (`../../../../etc/passwd`). Starting from an application sandbox (e.g., `/var/www/uploads/`), each `..` navigates up to the parent directory: first to `/var/www/`, then to `/var/`, and finally to the filesystem root (`/`), escaping the intended application boundary and accessing sensitive operating system files (`/etc/passwd`).\n- **Defensive Canonicalization Pipeline (`realpath()`):** The central decision engine illustrates how operating systems and secure applications neutralize traversal exploits:\n  - *Step 1 — Path Normalization:* The input path string is passed to `realpath()` or `canonicalize_file_name()`. This kernel routine resolves all symbolic links, strips redundant directory separators (`//`), and evaluates all relative components (`.` and `..`), producing an absolute, fully resolved canonical target path.\n  - *Step 2 — Base Prefix Validation (Sandbox Enforcement):* The application evaluates whether the canonical target path begins with the authorized base directory prefix (`/var/www/uploads/`).\n- **Execution Decision Logic:**\n  - *Legitimate Input:* `/var/www/uploads/report.pdf` resolves canonically to `/var/www/uploads/report.pdf`. Because it starts with the authorized base prefix, access is **ALLOWED**.\n  - *Malicious Traversal Input:* `../../../../etc/passwd` resolves canonically to `/etc/passwd`. Because it fails the prefix check, access is **BLOCKED** and logged as a security violation.\n- **Defensive Engineering Implication:** Web applications, file upload daemons, and administrative scripts must never concatenate untrusted user input directly into file paths. Applying `realpath()` canonicalization combined with rigorous prefix validation eliminates path traversal vulnerabilities, preventing unauthorized access to configuration files, private keys, and system binaries.\n\n### 2.4.1 Absolute and relative paths\n\n- **Absolute:** Starts from root: /var/log/syslog\n- **Relative:** Starts from the current directory: logs/app.log\n- **.:** current directory\n- **..:** parent directory\n  ~         your home directory (expanded by the shell)\n\n### 2.4.2 Core navigation commands\n\n- **pwd:** print working directory (execution-tested: /home/mario)\n- **cd /var/log:** change to an absolute path\n- **cd ..:** up one level\n- **cd -:** back to the previous directory\n- **cd:** (no argument) home directory\n- **ls:** list directory contents\n- **ls -l:** long format: permissions, links, owner, group, size, modification time, name\n- **ls -a:** include hidden \"dot\" files\n- **ls -lh:** human-readable sizes\n- **ls -lt:** sort by modification time (newest first) - useful when looking for recently changed files\n\n### 2.4.3 Reading ls -l (execution-tested; spacing compressed)\n\n```terminal\ntotal 12\n  drwxr-xr-x 2 mario mario 4096 Nov 7 02:19 .\n  drwxr-xr-x 5 mario mario 4096 Nov 7 02:19 ..\n  -rw-r--r-- 1 mario mario 17 Nov 7 02:19 notes.txt\n```\n\n- **-rw-r--r--:** type (-) and permissions: owner rw-, group r--, others r-- (Module 3 explains permissions fully).\n- **1:** number of hard links.\n- **mario mario:** owner and group.\n- **17:** size in bytes (\"alpha\\nbeta\\ngamma\\n\" = 17 bytes).\n  Nov 7 02:19  last modification time.\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D15: Inodes, Directory Entries & Filesystem Storage Allocation](/assets/courses/cyber-03/c03_m02_l04_inodes_and_disk_blocks.png)\n\n*Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three-Tier Storage Abstraction:** The diagram illustrates the architectural separation enforced by POSIX filesystems between human-readable filenames, metadata structures, and physical data storage:\n  1. *Directory Entry (dentry):* A simple mapping table residing in directory data blocks that links a filename (`report.txt`) to an integer Inode Number (`#409218`). The filename itself is not stored inside the file's metadata structure.\n  2. *Inode Table Entry (`#409218`):* The authoritative metadata descriptor storing all attributes of the file except its name.\n  3. *Physical Disk Blocks:* The actual storage sectors on physical media (e.g., Block 801, Block 802, Block 803) containing the raw file payload.\n- **Inode Metadata Anatomy:** Inode `#409218` records critical operational attributes:\n  - *File Type:* Regular file (`-`), directory (`d`), or symlink (`l`).\n  - *Permissions:* Octal representation `0644` (`rw-r--r--`).\n  - *Ownership:* Owner UID (1001) and Group GID (1001).\n  - *File Size:* 14.2 KB (14,540 bytes).\n  - *Timestamps:* Access time (`atime`), modification time (`mtime`), and inode change time (`ctime`).\n  - *Hard Link Counter:* Value `1`, tracking active directory references pointing to this inode.\n- **Block Allocation & Pointer Hierarchy:** To map payload data across disk storage, the inode maintains direct and indirect block pointers:\n  - *Direct Pointers:* Point directly to physical storage sectors. In the diagram, Direct Block Pointers reference Block 801 (bytes 0–4,095), Block 802 (bytes 4,096–8,191), and Block 803 (bytes 8,192–14,539, where the EOF marker terminates storage).\n  - *Indirect Pointers:* For large files exceeding direct pointer capacity, Single, Double, and Triple indirect pointers point to intermediate index blocks storing arrays of block addresses.\n- **Path Resolution Flow:** When an application reads `report.txt`:\n  1. VFS looks up `report.txt` in the directory entry to retrieve Inode `#409218`.\n  2. The filesystem reads Inode `#409218` from the inode table, verifying read permissions.\n  3. The storage controller follows block pointers 801, 802, and 803 to fetch raw data blocks from disk and assemble the reconstructed file payload.\n- **Defensive Engineering Implication:** Because deleting a file (`rm`) simply unlinks its directory entry, the underlying data blocks remain physically present on disk until the inode's link count reaches zero and all open file handles are closed. Forensic incident responders leverage this decoupling to recover deleted attacker tools and malware artifacts by scanning unallocated inode tables and disk blocks."
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
      "content": "## 2.5 Working with Files and Directories: Inodes, Links, Metadata & Deletion Lifecycles\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-F3: Reading an ls -l Listing: Anatomy of Linux File Metadata](/assets/courses/cyber-03/C03-M02-F3.png)\n\n*Figure C03-M02-F3: Detailed breakdown of an 'ls -l' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Anatomy of Long-Listing Output:** The diagram breaks down a standard POSIX long-listing line (`-rwxr-xr-- 1 cadence engineering 4096 Nov 07 14:30 deploy.sh`) into its constituent metadata fields.\n- **File Type Character (Field 1):** The initial character defines the filesystem object type: a hyphen (`-`) indicates a regular file; a `d` denotes a directory; and an `l` designates a symbolic link.\n- **The Three Permission Triads (Fields 2–4):** The subsequent 9 characters define discretionary access rights split into three triads:\n  - *Owner Permissions (`rwx`):* User `cadence` holds full read (`r`), write (`w`), and execute (`x`) authority.\n  - *Group Permissions (`r-x`):* Members of group `engineering` possess read (`r`) and execute (`x`) permissions, with write access denied (`-`).\n  - *Other / World Permissions (`r--`):* All other system users have read-only access (`r`), with write and execute capabilities revoked (`--`).\n- **Hard Link Count (Field 5):** The integer `1` indicates that exactly one directory entry (dentry) currently references this inode. If hard links are created, this counter increments accordingly.\n- **Ownership Credentials (Fields 6 & 7):** `cadence` identifies the owning user account (UID), while `engineering` designates the primary owning group (GID) evaluated during group-level permission checks.\n- **Storage Metrics & Timestamps (Fields 8 & 9):** `4096` represents the file size in bytes (occupying exactly one 4 KB filesystem block). `Nov 07 14:30` displays the last modification timestamp (`mtime`), reflecting the moment the file's data contents were last updated.\n- **Filename (Field 10):** `deploy.sh` identifies the human-readable filename associated with the underlying inode. The `.sh` extension indicates a shell script, reinforced by its executable permissions (`rwxr-xr--`).\n- **Defensive Engineering Implication:** Security auditors scan `ls -l` output for dangerous permission misconfigurations. An executable deployment script with world-writable permissions (`-rwxrwxrwx` or `0777`) allows unauthorized local users to alter the script, resulting in immediate privilege escalation when executed by an administrator or cron job.\n\n### 2.5.1 Creating\n\n- **mkdir dir:** create a directory\n- **mkdir -p a/b/c:** create parents as needed\n  mkdir -p lab/{docs,logs,scripts}   brace expansion creates three at once\n                        (bash feature; execution-tested)\n- **touch file:** create an empty file or update its timestamp\n  printf 'a\\nb\\n' > f   create a file with exact content\n\n### 2.5.2 Copying, moving, renaming\n\n- **cp src dst:** copy a file\n- **cp -r srcdir dstdir:** copy recursively\n- **cp -a src dst:** archive mode: preserve permissions, ownership, timestamps (where permitted)\n- **mv old new:** rename or move (within one file system, just renames the directory entry)\nExecution-tested: cp docs/notes.txt docs/notes.bak then mv docs/notes.bak\ndocs/old-notes.txt left notes.txt and old-notes.txt in docs/.\n\n### 2.5.3 Deleting - safely\n\n- **rm file:** remove a file (no recycle bin)\n- **rm -r dir:** remove a directory and its contents\n- **rm -i file:** ask before each removal\n- **rmdir dir:** remove an empty directory\nSafe habits:\n- Run ls with the same pattern first to see what would be deleted.\n- Avoid rm -rf with variables; in scripts, guard with checks such as\n    [ -n \"$dir\" ] and use \"${dir:?}\" so an empty variable causes an error\n    instead of deleting the wrong place.\n- Prefer moving to a quarantine folder when unsure.\n- Never run commands pasted from untrusted sources as root.\n\n### 2.5.4 Identifying files\n\n- **file name:** determines type from content, not extension.\nExecution-tested:\n  docs/notes.txt:   ASCII text\n  scripts/hello.sh: POSIX shell script, ASCII text executable\nNote: \"executable\" here means file recognised a script (it starts with\n#!/bin/sh); it does not mean the execute permission is set - stat or ls -l\nshows permissions. Attackers sometimes disguise files with misleading\nextensions; file inspects the actual content.\n\n  stat -c '%n %s bytes perms=%A owner=%U' docs/notes.txt\n  -> docs/notes.txt 17 bytes perms=-rw-r--r-- owner=mario\n\n### 2.5.5 Finding files\n\n  find . -name '*.log'               by name (quote the pattern so the shell\n                                     does not expand it)\n  find /etc -type f -mmin -60        files modified in the last 60 minutes\n  find / -perm -4000 -type f 2>/dev/null   files with the setuid bit\n                                     (Module 3; an audit check)\n  find /home -type f -size +100M     large files\nExecution-tested: find . -name '*.log' printed ./logs/app.log.\n\n### 2.5.6 Disk usage\n\n- **du -sh dir:** total size of a directory (execution-tested: 32K for the lab folder)\n- **df -h:** free space per mounted file system\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D16: Hard Links vs. Symbolic Links: Inode Reference Counter vs. Path Pointers](/assets/courses/cyber-03/c03_m02_l05_hard_links_vs_symlinks.png)\n\n*Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Hard Link Architecture (`ln target hardlink`):** The top panel illustrates a hard link. Both directory entries—`original.txt` and `hardlink.txt`—point to the exact same physical Inode (`#5012`). The inode maintains a Link Count of `2`, referencing a single shared set of data blocks on disk.\n- **Hard Link Deletion Lifecycle:** When an administrator deletes `original.txt` via `rm`, the operating system merely removes that specific directory entry and decrements the inode's link count from `2` to `1`. The underlying file content remains completely intact and accessible through `hardlink.txt`. The physical disk blocks are freed only when the link count reaches `0` and no processes maintain open file handles to the inode.\n- **Hard Link Structural Invariants:** Because hard links point to physical inode numbers, they cannot cross filesystem partition boundaries (as inode numbers are unique only within a single filesystem) and cannot link to directories (to prevent infinite recursive loops in the filesystem graph).\n- **Symbolic Link Architecture (`ln -s target symlink`):** The bottom panel illustrates a symbolic (soft) link. `original.txt` and `symlink.txt` possess completely independent inodes:\n  - `original.txt` occupies Inode `#5012` with Link Count = 1, pointing to physical data blocks.\n  - `symlink.txt` occupies Inode `#9084` with Link Count = 1. Its data block does not contain file content; it stores a text string pointing to the target path (`\"original.txt\"`).\n- **Symbolic Link Deletion Lifecycle (Dangling Pointers):** When `original.txt` is deleted, Inode `#5012` is unlinked and its blocks are freed. However, `symlink.txt` remains on disk pointing to a non-existent path, becoming a broken or \"dangling pointer\" that returns `ENOENT` (No such file or directory) when dereferenced.\n- **Defensive Engineering Implication:** Attackers exploit symbolic links in shared temporary directories (`/tmp`) via symlink race condition attacks (TOCTOU). An attacker creates a symlink pointing to a sensitive file (e.g., `/etc/shadow`); if a privileged root process blindly writes to the symlink without verifying ownership, it overwrites critical system files. Modern kernels enforce `fs.protected_symlinks` and `fs.protected_hardlinks` sysctl directives to prevent unprivileged users from exploiting symlink targets they do not own."
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
      "content": "## 2.6 Viewing, Searching & Documentation: Text Toolchains, Grep, Find & Man Sections\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M02-D17: Linux Text Processing Pipeline: grep, awk, sed, cut, sort & uniq](/assets/courses/cyber-03/c03_m02_l06_text_toolchain_pipeline.png)\n\n*Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Stage 1 — Raw Log Ingestion:** The pipeline receives raw, unstructured web server access logs (`access.log`). These logs contain high-volume telemetry: automated web crawlers, static asset requests (`.css`, `.js`, `.png`), legitimate user transactions, and malicious probing attempts.\n- **Stage 2 — Noise Reduction (`grep -v`):** The raw stream passes through an inverted filter (`grep -v`) that strips out benign high-frequency noise, such as static asset requests, images, and authorized health-check pings, isolating anomalous activity.\n- **Stage 3 — Structured Field Extraction (`awk`):** The filtered text is processed by `awk`, which tokenizes each log line by whitespace delimiters. The directive `awk '{print $4, $1, $9}'` extracts only security-relevant attributes: timestamp, client source IP address, and HTTP response status code.\n- **Stage 4 — Pattern Normalization (`sed`):** Stream editor `sed` performs regular expression substitution, transforming raw HTTP response codes into readable security event labels (e.g., normalizing status `404` to `NOT_FOUND` and `403` to `FORBIDDEN`).\n- **Stage 5 — Threat Aggregation & Ranking (`sort | uniq -c | sort -nr`):** The processed stream is sorted, passed through `uniq -c` to calculate recurrence counts for identical event signatures, and piped to `sort -nr` to rank results in descending numerical order.\n- **Triage Result Interpretation:** The pipeline aggregates raw telemetry into prioritized incident indicators:\n  - *Count 3:* `404 (NOT_FOUND)` on `/admin.php` reveals an adversary actively scanning for administrative backdoors.\n  - *Count 1:* `403 (FORBIDDEN)` on `/etc/passwd` identifies an attempted local file inclusion (LFI) or path traversal attack.\n  - *Count 1:* `200 (OK)` on `/login` represents normal successful authentication.\n- **Defensive Engineering Implication:** Mastering text processing pipelines enables SOC analysts and incident responders to perform rapid triage directly on live production hosts without requiring third-party log forwarders. Building piped filters allows quick identification of credential stuffing attempts, directory brute-forcing, and anomalous web shell interactions during an ongoing security incident.\n\n### 2.6.1 Viewing files\n\n- **cat file:** print the whole file\n- **less file:** page through (q quits, / searches)\n- **head -n 20 file:** first lines\n- **tail -n 20 file:** last lines\n- **tail -f file:** follow a growing file (watch logs live)\n- **wc -l file:** count lines\n\n### 2.6.2 Searching inside files with grep\n\n- **grep ERROR app.log:** lines containing ERROR\n- **grep -n ERROR app.log:** with line numbers (execution-tested: 2:2026-11-07 10:02 ERROR disk full)\n- **grep -i error app.log:** case-insensitive\n  grep -r \"PermitRootLogin\" /etc/ssh   recursive search\n- **grep -v INFO app.log:** lines NOT matching\n  grep -E 'ERROR|WARN' app.log  extended regular expressions\nCourse 04 Module 3 covers regular expressions in depth.\n\n### 2.6.3 Cutting fields\n\n/etc/passwd stores one account per line with colon-separated fields.\nExecution-tested:\n\n```bash\nhead -n 3 /etc/passwd | cut -d: -f1,3,6,7\n```\n\n```terminal\nroot:0:/root:/bin/bash\n  daemon:1:/usr/sbin:/usr/sbin/nologin\n  bin:2:/bin:/usr/sbin/nologin\n```\n\n  -d:        use colon as delimiter\n  -f1,3,6,7  username, UID, home directory, login shell\n\"nologin\" shells show service accounts that cannot log in interactively - a\ngood sign. Module 3 covers accounts.\n\n### 2.6.4 Getting help\n\n- **man ls:** the manual page (sections: 1 user commands, 5 file formats, 8 administration commands)\n- **man 5 passwd:** a specific section\n- **ls --help:** brief usage for most GNU tools\n  apropos keyword search manual descriptions\n- **help cd:** help for bash builtins\nLearning to read man pages is the single most useful habit for independent\nlearning on Linux.\n\n## 3. TECHNICAL DEEP DIVE: THE SHELL TOUR SCRIPT, LINE BY LINE\n\n3.1 Script location and status\nLAB_ASSETS/C03/rk_c03_shell_tour.sh - execution-tested on Ubuntu 26.04 LTS\n(WSL2), bash 5.3.9, as a normal (non-root) user. It creates ~/rk-lab-m02,\ndemonstrates the commands from this module and removes the folder.\n\n3.2 Selected lines explained\n\n```bash\n#!/bin/bash\n  set -e\n  mkdir -p ~/rk-lab-m02/{docs,logs,scripts}\n  cd ~/rk-lab-m02\n  printf 'alpha\\nbeta\\ngamma\\n' > docs/notes.txt\n  printf '2026-11-07 10:01 INFO start\\n2026-11-07 10:02 ERROR disk full\\n...' > logs/app.log\n  find . -print | sort\n  grep -n ERROR logs/app.log\n  grep INFO logs/app.log | wc -l\n  echo \"delta\" >> docs/notes.txt; tail -n 2 docs/notes.txt\n  cd ~; rm -r ~/rk-lab-m02\n```\n\n  #!/bin/bash     The \"shebang\": run this file with bash.\n- **set -e:** Stop at the first failing command - a safety habit so a failed cd does not lead to commands running in the wrong place.\n  mkdir -p ...{docs,logs,scripts}  brace expansion creates three folders.\n  printf '...\\n'  writes exact content with newline escapes (more\n                  predictable than echo for this purpose).\n  find . -print | sort   lists every path, sorted, as a simple tree view.\n  grep -n / | wc -l      search and count, as in L06.\n  >>              appends without destroying existing content.\n  cd ~; rm -r ... removes only the folder the script created, using an\n                  explicit path rather than a variable.\n\n3.3 Output (exact, selected)\n\n```terminal\n== tree-like listing\n  .\n  ./docs\n  ./docs/notes.txt\n  ./logs\n  ./logs/app.log\n  ./scripts\n  ./scripts/hello.sh\n  == grep ERROR\n  2:2026-11-07 10:02 ERROR disk full\n  == pipes: count INFO lines\n  2\n  == redirection\n  gamma\n  delta\n  == cleaned: removed\n```\n\n## 4. REAL-WORLD CASE STUDIES\n\n### CASE STUDY C03-M02-CS1: The xz Utils supply-chain compromise, 2024 - why distribution choice and release models matter\nContext: XZ Utils is a data compression library and tool shipped with many\nLinux distributions.\n\nWhat happened: on 29 March 2024 CISA reported that malicious code had been\nembedded in XZ Utils versions 5.6.0 and 5.6.1 (CVE-2024-3094) and\nrecommended downgrading to an uncompromised version such as 5.4.6 Stable,\nhunting for malicious activity and reporting findings [C03-M02-R4]. The\nissue was discovered by a developer who investigated unusual behaviour and\nperformance on a test system, and was disclosed before the affected versions\nreached most stable, long-term-support releases; Red Hat's advisory, linked\nby CISA, addressed users of Fedora 41 and Fedora Rawhide [C03-M02-R5].\n\nHow it relates to this module: the compromised versions were very new.\nDistributions with rolling or development release models picked up new\nupstream versions quickly, while stable/LTS releases, which adopt new\nversions more slowly, were largely not affected at the time of disclosure.\n\nLessons learned:\n- Release models are a risk decision: newest is not always safest for\n    production.\n- Knowing your distribution and exact package versions (L01; package\n    queries in Module 3) is how you answer \"are we affected?\" quickly.\n- Careful observation of anomalies on Linux systems (a developer noticing\n    something unusual) remains one of the best detection controls.\n- Open-source supply-chain security is covered in Course 12 and Course 21.\n\n### CASE STUDY C03-M02-CS2 (FICTIONAL TEACHING SCENARIO): The empty variable\nThis scenario is fictional.\n\nContext: an administrator at Orchid Payments (fictional) wrote a clean-up\nscript containing rm -rf $BUILD_DIR/* to clear a build folder.\n\nProblem: on one server, BUILD_DIR was not set. The shell expanded the line to\nrm -rf /*, and because the script ran as root, it began deleting the\nsystem.\n\nImpact: the server had to be rebuilt from backup.\n\nLessons: quote variables; use \"${BUILD_DIR:?BUILD_DIR not set}\" so the shell\nstops with an error if the variable is empty; use set -u to treat unset\nvariables as errors; avoid running scripts as root unless necessary; test on\nnon-production systems (Module 4).\n\n## 5. PRACTICAL LEARNING\n\n### Technical Mathematical Specification: Linux File System Inode & Storage Allocation Ratios\n\nOn ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with `No space left on device`, creating subtle denial-of-service conditions.\n\n\n![C03-M02-D18: Linux Man Pages: The 8 Standard Sections & Offline Documentation Search](/assets/courses/cyber-03/c03_m02_l06_man_sections_architecture.png)\n\n*Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with 'man -k' and 'whatis'.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Standardized 8-Section Manual Taxonomy:** Linux offline documentation is structured into 8 standardized manual sections, providing authoritative reference guides across every layer of the operating system:\n  - *Section 1 — User Commands:* General executable commands and utilities for non-privileged users (e.g., `ls`, `grep`, `bash`).\n  - *Section 2 — System Calls:* Low-level kernel API entry points and wrapper functions invoked by programs to request OS services (e.g., `openat`, `read`, `fork`).\n  - *Section 3 — C Library Functions:* User-space library routines provided by the standard C library (`libc`), including memory allocation and string formatting (e.g., `printf`, `malloc`).\n  - *Section 4 — Special Files & Device Interfaces:* Manuals for synthetic device nodes and hardware abstractions residing in `/dev` (e.g., write-only bit bucket `/dev/null`, cryptographic entropy source `/dev/urandom`).\n  - *Section 5 — File Formats & Configuration Protocols:* Syntax and grammar specifications for plain-text system configuration files (e.g., user account format in `/etc/passwd`, scheduled job syntax in `crontab`).\n  - *Section 6 — Games & Demonstrations:* Documentation for terminal-based games and historic entertainment programs.\n  - *Section 7 — Miscellaneous Overviews & Conventions:* Conceptual architectures, network protocol overviews, and standards (e.g., regular expression syntax `regex`, IP/TCP protocol suites).\n  - *Section 8 — System Administration Commands:* Privileged daemons and root-level maintenance utilities (e.g., packet filtering with `iptables`, service management with `systemd`).\n- **Resolving Cross-Section Name Collisions:** Many system components share identical names across different sections. For example, `passwd` exists in Section 1 (the executable command `/usr/bin/passwd`) and Section 5 (the file format specification for `/etc/passwd`). Requesting `man 5 passwd` explicitly opens the file format specification rather than the command documentation.\n- **Discovery Toolchains (`whatis` & `man -k`):**\n  - *`whatis <command>`:* Queries the pre-indexed `whatis` database to display a concise, one-line functional summary of a utility.\n  - *`man -k <keyword>` (apropos):* Performs keyword searches across all manual page descriptions, allowing administrators to discover relevant tools (e.g., `man -k network` or `man -k firewall`) without knowing the exact utility name in advance.\n- **Defensive Engineering Implication:** In air-gapped or restricted forensic environments where internet access is prohibited, manual pages represent the authoritative ground truth for system binaries, configuration file grammars, and kernel syscall return codes, enabling defenders to verify expected binary behavior and syntax without external dependencies."
    }
  ]
};
