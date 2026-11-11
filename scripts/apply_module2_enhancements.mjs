import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module2.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 2.1 - Fig 1 (C03-M02-D10)
  {
    id: 'C03-M02-D10',
    caption: '*Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Upstream Kernel & Userland Foundation:** The Linux ecosystem originates from the upstream Linux kernel source (maintained at \`kernel.org\`) combined with the GNU userland toolchain (including GCC, glibc, binutils, and coreutils). Every downstream enterprise distribution derives its core execution capabilities from this shared foundation.
- **Debian Enterprise Family:** Emphasizing stability, open-source rigor, and extensive package repositories, the Debian lineage packages software in \`.deb\` archives managed by \`apt\` and \`dpkg\`. Canonical's **Ubuntu** builds commercial workstation and cloud server platforms on this base, while specialized distributions like **Kali Linux** adapt it for offensive security penetration testing with pre-compiled toolchains.
- **Red Hat Enterprise Lineage:** Architected for mission-critical enterprise data centers and regulated environments, the Red Hat family utilizes \`.rpm\` package archives managed by \`dnf\` and \`rpm\`. Upstream innovation begins in the community-driven **Fedora** distribution, which hardens into commercial **Red Hat Enterprise Linux (RHEL)**, subsequently tracked by 1:1 bug-for-bug binary-compatible enterprise distributions such as **Rocky Linux** and **AlmaLinux**.
- **SUSE Commercial Lineage:** Serving commercial European enterprise and SAP enterprise infrastructure, the SUSE family pairs RPM packaging with the specialized \`zypper\` package manager, bridging open-source community testing in **openSUSE** with mission-critical **SUSE Linux Enterprise Server (SLES)** deployments.
- **Specialized & Minimal Container Lineage:** Independent distributions diverge from traditional GNU/glibc architectures. **Alpine Linux** pairs the lightweight \`musl libc\` library with \`BusyBox\` and the \`apk\` package manager, running the lightweight \`OpenRC\` init system instead of systemd to achieve minimal container image sizes (under 10 MB) and a drastically reduced attack surface.
- **Defensive Engineering Implication:** Administrators must recognize that package formats (\`.deb\`, \`.rpm\`, \`.apk\`) dictate dependency resolution algorithms, update cadence, and patch management strategies. Selecting minimal distributions like Alpine in containerized deployments eliminates unnecessary compilers and shell utilities, mitigating remote code execution exploit chains.`
  },

  // Lesson 2.1 - Fig 2 (C03-M02-D11)
  {
    id: 'C03-M02-D11',
    caption: '*Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Stage 1 — Repository Metadata Retrieval (\`apt update\`):** The client system queries the configured APT repository (e.g., \`archive.ubuntu.com\`) and downloads the cryptographically signed \`InRelease\` manifest. This index contains comprehensive repository metadata, suite definitions, a complete index of package filenames and versions, and corresponding SHA-256 cryptographic digests.
- **Stage 2 — GPG Digital Signature Verification:** The APT client verifies the detached OpenPGP digital signature embedded within the \`InRelease\` file against trusted public verification keys stored in the local system directory \`/etc/apt/trusted.gpg.d/\`. Successful signature verification establishes that the repository manifest has not been altered or forged by a network adversary.
- **Stage 3 — Package Archive Retrieval (\`apt install\`):** Once the repository metadata is verified, the client requests and downloads the exact binary package archive (\`.deb\`) listed in the manifest across network mirrors.
- **Stage 4 — Cryptographic Integrity Verification (SHA-256):** Before executing any package installation scripts, the local package manager computes the SHA-256 checksum of the downloaded \`.deb\` file (\`sha256sum package.deb\`) and performs an exact bitwise comparison against the expected digest published in the signed \`InRelease\` manifest.
- **Stage 5 — Execution Decision (Install vs. Abort):** If the computed hash matches the signed digest, APT extracts the \`.deb\` archive and unpacks executable binaries, libraries, and configuration files into their target filesystem directories (\`/usr/bin\`, \`/usr/lib\`). If the hash mismatches, installation is aborted immediately with a fatal security error (\`E: Hash sum mismatch!\`), preventing corrupted or tampered files from reaching disk.
- **Defensive Engineering Implication:** This cryptographic chain of custody protects operating systems against Man-in-the-Middle (MITM) package tampering, mirror compromise, and cache poisoning. System administrators must avoid insecure practices like running \`apt-key add\` with arbitrary web keys or using the \`[trusted=yes]\` flag in repository sources, as disabling signature checks permits arbitrary root-level code execution via unsigned deb installation scripts.`
  },

  // Lesson 2.2 - Fig 1 (C03-M02-F2)
  {
    id: 'C03-M02-F2',
    caption: '*Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Stage 1 — Read Line & Lexical Tokenization:** The shell reads the raw user input string (e.g., \`grep "hello world" > out.txt\`) and decomposes it into discrete lexical tokens—words and control operators—delimited by the internal field separator (\`IFS\`, defaulting to space, tab, and newline). Quoted strings preserve embedded spaces as a single token.
- **Stage 2 — Shell Expansions & Quote Removal:** The shell executes macro expansions in a strict sequential order: Brace expansion (\`{a,b}\`), Tilde expansion (\`~ -> /home/user\`), Parameter and variable expansion (\`$VAR\`), Command substitution (\`$(cmd)\`), Arithmetic expansion (\`$((1+1))\`), Word splitting on expanded results, and Pathname expansion (globbing with \`*\`, \`?\`, \`[]\`). Once all substitutions complete, quote characters (\`"\` and \`'\`) are stripped.
- **Stage 3 — Redirection Processing & File Descriptor Setup:** The shell scans for redirection operators (\`<\`, \`>\`, \`>>\`, \`2>&1\`). It opens target files and updates the process's internal file descriptor table (e.g., assigning file descriptor 1 to \`out.txt\`), preparing the I/O channel before the command runs.
- **Stage 4 — Command Identification & Resolution:** The shell resolves the command token in strict precedence order:
  1. *Aliases:* Checks if an alias is defined (e.g., \`ll -> ls -l\`).
  2. *Shell Builtins:* Checks for builtins that modify shell state internally (\`cd\`, \`exit\`, \`export\`, \`set\`).
  3. *Shell Functions:* Checks for active in-memory functions (\`myfunc()\`).
  4. *Executable Scan ($PATH):* Scans colon-delimited directories listed in \`$PATH\` sequentially until an executable binary (e.g., \`/bin/grep\`) is located.
- **Stage 5 — Process Spawning via \`fork()\` & \`execve()\`:** The shell executes \`fork()\` to duplicate its execution context into an isolated child process, inheriting the configured file descriptor redirections. The child process then invokes \`execve()\`, replacing its memory space with the compiled binary code of the target program.
- **Defensive Engineering Implication:** Understanding shell parsing sequence is vital for preventing command injection vulnerabilities. Because expansions occur prior to execution, unquoted variables in shell scripts allow malicious user inputs containing shell metacharacters (\`;\`, \`|\`, \`$()\`) to hijack control flow, emphasizing the defensive necessity of strict parameter quoting and defensive input validation.`
  },

  // Lesson 2.2 - Fig 2 (C03-M02-D12)
  {
    id: 'C03-M02-D12',
    caption: '*Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **POSIX Standard Stream Triad:** Unix and Linux processes inherit three standard I/O streams referenced by integer file descriptors: File Descriptor 0 (\`stdin\`, read stream), File Descriptor 1 (\`stdout\`, standard output write stream), and File Descriptor 2 (\`stderr\`, diagnostic and error write stream).
- **Ingress Channels into Process A:** A running command (such as \`grep\`) receives input data across File Descriptor 0. By default, \`stdin\` connects to keyboard input from the terminal emulator, but can be redirected to receive input from a file (\`< file\`) or from a preceding command via a pipe (\`\|\`).
- **Kernel Pipe Mechanism (Ring Buffer):** When commands are linked with a pipe (\`Process A \| Process B\`), the kernel creates a unidirectional in-memory FIFO ring buffer (typically 64 KB). The standard output (\`stdout\`, FD 1) of Process A is connected directly to the write end of the pipe, while the standard input (\`stdin\`, FD 0) of Process B connects to the read end, enabling streaming data processing without intermediate disk writes.
- **Diagnostic Stream Routing (FD 2):** Process A emits error messages and operational warnings across File Descriptor 2 (\`stderr\`), separated from data output. Three distinct routing paths are available:
  - *Direct to Terminal:* By default, \`stderr\` prints unbuffered diagnostics directly to the terminal display.
  - *File Redirection (\`2> error.log\`):* Isolates errors into a dedicated log file while allowing clean standard output to traverse the pipeline.
  - *Stream Merging (\`2>&1\`):* Merges \`stderr\` into \`stdout\`, redirecting diagnostic error messages into the same downstream pipe or file.
- **Practical Operational Sequences:** Demonstrates real-world security filtering: \`grep "error" app.log \| awk '{print $1}'\` pipes matching error lines directly into \`awk\` for IP extraction; \`grep "error" app.log 2> error.log\` separates audit errors; and \`grep "error" app.log 2>&1 \| awk '{print}'\` captures all operational telemetry into a unified analysis stream.
- **Defensive Engineering Implication:** In incident response and automated administration, separating \`stdout\` from \`stderr\` is essential to prevent diagnostic error strings from contaminating structured data pipelines. Additionally, redirection operators must be handled securely in scripts to prevent inadvertent log truncation when using \`>\` instead of append (\`>>\`).`
  },

  // Lesson 2.3 - Fig 1 (C03-M02-F1)
  {
    id: 'C03-M02-F1',
    caption: '*Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Unified Single-Root Topology:** The Filesystem Hierarchy Standard (FHS 3.0) arranges all storage devices, operating system files, and memory structures under a single root directory (\`/\`). Unlike Windows drive letters (\`C:\`, \`D:\`), secondary storage partitions and virtual interfaces are mounted into designated subdirectories across the root hierarchy.
- **System Binaries & Library Separation (\`/usr\`):** Modern distributions implement the "/usr-merge" architecture: core user command binaries (\`/usr/bin\`), privileged system administration tools (\`/usr/sbin\`), and shared dynamic libraries (\`/usr/lib\`, \`.so\` files) reside inside \`/usr\`. Legacy root directories (\`/bin\`, \`/sbin\`, \`/lib\`) exist as symbolic links pointing directly into their \`/usr\` counterparts.
- **Host Configuration Boundary (\`/etc\`):** The \`/etc\` tree contains static, plain-text host and service configuration files (such as SSH daemon directives, network interfaces, and systemd units). It houses critical identity databases: \`/etc/passwd\` (world-readable user accounts and UIDs) and \`/etc/shadow\` (heavily restricted encrypted password hashes, marked as a sensitive security asset).
- **Virtual Kernel Projections (\`/proc\`, \`/sys\`, \`/dev\`):** Synthetic filesystems generated entirely in kernel memory: \`/proc\` exposes runtime process metadata and kernel tunables; \`/sys\` models peripheral device buses, drivers, and kernel objects; and \`/dev\` hosts device nodes (\`/dev/sda\`, \`/dev/tty\`) that act as character and block interfaces to physical hardware.
- **Variable & Dynamic State (\`/var\`):** Houses frequently changing data: system audit telemetry and service logs in \`/var/log\` (\`auth.log\`, \`syslog\`), runtime lock and socket files in \`/var/run\` (symlinked to \`/run\`), and persistent temporary files in \`/var/tmp\`.
- **User Homes & Mount Points:** User workspaces are isolated under \`/home/<username>\`, while the root superuser maintains an independent home directory at \`/root\` to allow administration during single-user rescue mode. Storage mount points are cleanly separated into \`/mnt\` (temporary manual mounts) and \`/media\` (automated removable media mounts).
- **Defensive Engineering Implication:** The FHS defines critical boundary perimeters. Inode permissions must be hardened across \`/etc/shadow\` (mode 0640 or 0600) and \`/proc/kallsyms\` (restricted via \`kernel.kptr_restrict\`) to prevent unprivileged users from reading credential hashes or exploiting kernel address leaks for privilege escalation.`
  },

  // Lesson 2.3 - Fig 2 (C03-M02-D13)
  {
    id: 'C03-M02-D13',
    caption: '*Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Synthetic In-Memory Projections:** The \`/proc\` (procfs) and \`/sys\` (sysfs) trees are not stored on physical block storage. They are synthetic, in-memory virtual filesystems generated dynamically by the Virtual Filesystem Switch (VFS) to project internal kernel data structures into the standard filesystem namespace. Reading a virtual file triggers an on-demand kernel function that serializes live memory state into ASCII text.
- **Process State Projections (\`/proc/<PID>/\`):** For every running process in the system, the kernel instantiates a dynamic numerical directory matching its PID. Key virtual files include:
  - \`cmdline:\` The exact command-line invocation string and arguments used to start the process.
  - \`status:\` Comprehensive process metadata, including UIDs, GIDs, memory footprint (VmRSS, VmSize), and signal masks.
  - \`maps:\` Detailed virtual memory space mappings showing loaded binary segments, shared libraries, heap, and stack regions.
  - \`fd/:\` Directory of symbolic links representing all open file descriptors, sockets, and named pipes held by the process.
- **Kernel Device & Tunable Model (\`/sys/\`):** \`/sys\` exposes a unified hardware and driver hierarchy managed by sysfs:
  - \`/sys/bus/:\` Physical and logical buses (PCI, USB, I2C).
  - \`/sys/devices/:\` Global device tree detailing all recognized hardware components.
  - \`/sys/class/:\` Device classifications grouped by function (network interfaces, block storage devices, input peripherals).
  - \`/sys/kernel/:\` Live kernel subsystems, memory management parameters, and security feature states.
- **Execution Trace of a Kernel Variable Read:** The step-by-step walkthrough traces how reading \`/proc/sys/net/ipv4/ip_forward\` functions:
  1. User-space shell issues a standard \`read()\` system call on the path string.
  2. The VFS layer intercepts the path, recognizes it as a procfs virtual node, and routes the request to the network subsystem handler.
  3. The kernel reads the live integer variable directly from volatile kernel RAM.
  4. VFS converts the binary integer to ASCII and returns \`1\` to the user shell.
- **Defensive Engineering Implication:** Forensic analysts utilize \`/proc\` to reconstruct malicious process behavior, unmask hidden command-line arguments in \`/proc/<PID>/cmdline\`, and recover deleted executables by reading \`/proc/<PID>/exe\`. System administrators use \`/proc/sys/\` to harden kernel security parameters (via \`sysctl\`) against network spoofing and SYN flood attacks.`
  },

  // Lesson 2.4 - Fig 1 (C03-M02-D14)
  {
    id: 'C03-M02-D14',
    caption: '*Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Absolute Path Resolution Mechanics:** At the top of the architecture, an absolute path resolution begins strictly from the root directory (\`/\`). When resolving \`/var/www/uploads/report.pdf\`, the VFS traverses the filesystem graph hierarchically (\`/\` -> \`/var\` -> \`/var/www\` -> \`/var/www/uploads\` -> \`report.pdf\`), verifying search (\`+x\`) permissions on each intermediate directory. Because the resolved path resides within the intended base directory, access is safely approved.
- **Relative Path Traversal Vulnerability:** At the bottom, an adversary attempts directory traversal by injecting relative path dot-dot sequences (\`../../../../etc/passwd\`). Starting from an application sandbox (e.g., \`/var/www/uploads/\`), each \`..\` navigates up to the parent directory: first to \`/var/www/\`, then to \`/var/\`, and finally to the filesystem root (\`/\`), escaping the intended application boundary and accessing sensitive operating system files (\`/etc/passwd\`).
- **Defensive Canonicalization Pipeline (\`realpath()\`):** The central decision engine illustrates how operating systems and secure applications neutralize traversal exploits:
  - *Step 1 — Path Normalization:* The input path string is passed to \`realpath()\` or \`canonicalize_file_name()\`. This kernel routine resolves all symbolic links, strips redundant directory separators (\`//\`), and evaluates all relative components (\`.\` and \`..\`), producing an absolute, fully resolved canonical target path.
  - *Step 2 — Base Prefix Validation (Sandbox Enforcement):* The application evaluates whether the canonical target path begins with the authorized base directory prefix (\`/var/www/uploads/\`).
- **Execution Decision Logic:**
  - *Legitimate Input:* \`/var/www/uploads/report.pdf\` resolves canonically to \`/var/www/uploads/report.pdf\`. Because it starts with the authorized base prefix, access is **ALLOWED**.
  - *Malicious Traversal Input:* \`../../../../etc/passwd\` resolves canonically to \`/etc/passwd\`. Because it fails the prefix check, access is **BLOCKED** and logged as a security violation.
- **Defensive Engineering Implication:** Web applications, file upload daemons, and administrative scripts must never concatenate untrusted user input directly into file paths. Applying \`realpath()\` canonicalization combined with rigorous prefix validation eliminates path traversal vulnerabilities, preventing unauthorized access to configuration files, private keys, and system binaries.`
  },

  // Lesson 2.4 - Fig 2 (C03-M02-D15)
  {
    id: 'C03-M02-D15',
    caption: '*Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Three-Tier Storage Abstraction:** The diagram illustrates the architectural separation enforced by POSIX filesystems between human-readable filenames, metadata structures, and physical data storage:
  1. *Directory Entry (dentry):* A simple mapping table residing in directory data blocks that links a filename (\`report.txt\`) to an integer Inode Number (\`#409218\`). The filename itself is not stored inside the file's metadata structure.
  2. *Inode Table Entry (\`#409218\`):* The authoritative metadata descriptor storing all attributes of the file except its name.
  3. *Physical Disk Blocks:* The actual storage sectors on physical media (e.g., Block 801, Block 802, Block 803) containing the raw file payload.
- **Inode Metadata Anatomy:** Inode \`#409218\` records critical operational attributes:
  - *File Type:* Regular file (\`-\`), directory (\`d\`), or symlink (\`l\`).
  - *Permissions:* Octal representation \`0644\` (\`rw-r--r--\`).
  - *Ownership:* Owner UID (1001) and Group GID (1001).
  - *File Size:* 14.2 KB (14,540 bytes).
  - *Timestamps:* Access time (\`atime\`), modification time (\`mtime\`), and inode change time (\`ctime\`).
  - *Hard Link Counter:* Value \`1\`, tracking active directory references pointing to this inode.
- **Block Allocation & Pointer Hierarchy:** To map payload data across disk storage, the inode maintains direct and indirect block pointers:
  - *Direct Pointers:* Point directly to physical storage sectors. In the diagram, Direct Block Pointers reference Block 801 (bytes 0–4,095), Block 802 (bytes 4,096–8,191), and Block 803 (bytes 8,192–14,539, where the EOF marker terminates storage).
  - *Indirect Pointers:* For large files exceeding direct pointer capacity, Single, Double, and Triple indirect pointers point to intermediate index blocks storing arrays of block addresses.
- **Path Resolution Flow:** When an application reads \`report.txt\`:
  1. VFS looks up \`report.txt\` in the directory entry to retrieve Inode \`#409218\`.
  2. The filesystem reads Inode \`#409218\` from the inode table, verifying read permissions.
  3. The storage controller follows block pointers 801, 802, and 803 to fetch raw data blocks from disk and assemble the reconstructed file payload.
- **Defensive Engineering Implication:** Because deleting a file (\`rm\`) simply unlinks its directory entry, the underlying data blocks remain physically present on disk until the inode's link count reaches zero and all open file handles are closed. Forensic incident responders leverage this decoupling to recover deleted attacker tools and malware artifacts by scanning unallocated inode tables and disk blocks.`
  },

  // Lesson 2.5 - Fig 1 (C03-M02-F3)
  {
    id: 'C03-M02-F3',
    caption: '*Figure C03-M02-F3: Detailed breakdown of an \'ls -l\' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Anatomy of Long-Listing Output:** The diagram breaks down a standard POSIX long-listing line (\`-rwxr-xr-- 1 cadence engineering 4096 Nov 07 14:30 deploy.sh\`) into its constituent metadata fields.
- **File Type Character (Field 1):** The initial character defines the filesystem object type: a hyphen (\`-\`) indicates a regular file; a \`d\` denotes a directory; and an \`l\` designates a symbolic link.
- **The Three Permission Triads (Fields 2–4):** The subsequent 9 characters define discretionary access rights split into three triads:
  - *Owner Permissions (\`rwx\`):* User \`cadence\` holds full read (\`r\`), write (\`w\`), and execute (\`x\`) authority.
  - *Group Permissions (\`r-x\`):* Members of group \`engineering\` possess read (\`r\`) and execute (\`x\`) permissions, with write access denied (\`-\`).
  - *Other / World Permissions (\`r--\`):* All other system users have read-only access (\`r\`), with write and execute capabilities revoked (\`--\`).
- **Hard Link Count (Field 5):** The integer \`1\` indicates that exactly one directory entry (dentry) currently references this inode. If hard links are created, this counter increments accordingly.
- **Ownership Credentials (Fields 6 & 7):** \`cadence\` identifies the owning user account (UID), while \`engineering\` designates the primary owning group (GID) evaluated during group-level permission checks.
- **Storage Metrics & Timestamps (Fields 8 & 9):** \`4096\` represents the file size in bytes (occupying exactly one 4 KB filesystem block). \`Nov 07 14:30\` displays the last modification timestamp (\`mtime\`), reflecting the moment the file's data contents were last updated.
- **Filename (Field 10):** \`deploy.sh\` identifies the human-readable filename associated with the underlying inode. The \`.sh\` extension indicates a shell script, reinforced by its executable permissions (\`rwxr-xr--\`).
- **Defensive Engineering Implication:** Security auditors scan \`ls -l\` output for dangerous permission misconfigurations. An executable deployment script with world-writable permissions (\`-rwxrwxrwx\` or \`0777\`) allows unauthorized local users to alter the script, resulting in immediate privilege escalation when executed by an administrator or cron job.`
  },

  // Lesson 2.5 - Fig 2 (C03-M02-D16)
  {
    id: 'C03-M02-D16',
    caption: '*Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Hard Link Architecture (\`ln target hardlink\`):** The top panel illustrates a hard link. Both directory entries—\`original.txt\` and \`hardlink.txt\`—point to the exact same physical Inode (\`#5012\`). The inode maintains a Link Count of \`2\`, referencing a single shared set of data blocks on disk.
- **Hard Link Deletion Lifecycle:** When an administrator deletes \`original.txt\` via \`rm\`, the operating system merely removes that specific directory entry and decrements the inode's link count from \`2\` to \`1\`. The underlying file content remains completely intact and accessible through \`hardlink.txt\`. The physical disk blocks are freed only when the link count reaches \`0\` and no processes maintain open file handles to the inode.
- **Hard Link Structural Invariants:** Because hard links point to physical inode numbers, they cannot cross filesystem partition boundaries (as inode numbers are unique only within a single filesystem) and cannot link to directories (to prevent infinite recursive loops in the filesystem graph).
- **Symbolic Link Architecture (\`ln -s target symlink\`):** The bottom panel illustrates a symbolic (soft) link. \`original.txt\` and \`symlink.txt\` possess completely independent inodes:
  - \`original.txt\` occupies Inode \`#5012\` with Link Count = 1, pointing to physical data blocks.
  - \`symlink.txt\` occupies Inode \`#9084\` with Link Count = 1. Its data block does not contain file content; it stores a text string pointing to the target path (\`"original.txt"\`).
- **Symbolic Link Deletion Lifecycle (Dangling Pointers):** When \`original.txt\` is deleted, Inode \`#5012\` is unlinked and its blocks are freed. However, \`symlink.txt\` remains on disk pointing to a non-existent path, becoming a broken or "dangling pointer" that returns \`ENOENT\` (No such file or directory) when dereferenced.
- **Defensive Engineering Implication:** Attackers exploit symbolic links in shared temporary directories (\`/tmp\`) via symlink race condition attacks (TOCTOU). An attacker creates a symlink pointing to a sensitive file (e.g., \`/etc/shadow\`); if a privileged root process blindly writes to the symlink without verifying ownership, it overwrites critical system files. Modern kernels enforce \`fs.protected_symlinks\` and \`fs.protected_hardlinks\` sysctl directives to prevent unprivileged users from exploiting symlink targets they do not own.`
  },

  // Lesson 2.6 - Fig 1 (C03-M02-D17)
  {
    id: 'C03-M02-D17',
    caption: '*Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Stage 1 — Raw Log Ingestion:** The pipeline receives raw, unstructured web server access logs (\`access.log\`). These logs contain high-volume telemetry: automated web crawlers, static asset requests (\`.css\`, \`.js\`, \`.png\`), legitimate user transactions, and malicious probing attempts.
- **Stage 2 — Noise Reduction (\`grep -v\`):** The raw stream passes through an inverted filter (\`grep -v\`) that strips out benign high-frequency noise, such as static asset requests, images, and authorized health-check pings, isolating anomalous activity.
- **Stage 3 — Structured Field Extraction (\`awk\`):** The filtered text is processed by \`awk\`, which tokenizes each log line by whitespace delimiters. The directive \`awk '{print $4, $1, $9}'\` extracts only security-relevant attributes: timestamp, client source IP address, and HTTP response status code.
- **Stage 4 — Pattern Normalization (\`sed\`):** Stream editor \`sed\` performs regular expression substitution, transforming raw HTTP response codes into readable security event labels (e.g., normalizing status \`404\` to \`NOT_FOUND\` and \`403\` to \`FORBIDDEN\`).
- **Stage 5 — Threat Aggregation & Ranking (\`sort \| uniq -c \| sort -nr\`):** The processed stream is sorted, passed through \`uniq -c\` to calculate recurrence counts for identical event signatures, and piped to \`sort -nr\` to rank results in descending numerical order.
- **Triage Result Interpretation:** The pipeline aggregates raw telemetry into prioritized incident indicators:
  - *Count 3:* \`404 (NOT_FOUND)\` on \`/admin.php\` reveals an adversary actively scanning for administrative backdoors.
  - *Count 1:* \`403 (FORBIDDEN)\` on \`/etc/passwd\` identifies an attempted local file inclusion (LFI) or path traversal attack.
  - *Count 1:* \`200 (OK)\` on \`/login\` represents normal successful authentication.
- **Defensive Engineering Implication:** Mastering text processing pipelines enables SOC analysts and incident responders to perform rapid triage directly on live production hosts without requiring third-party log forwarders. Building piped filters allows quick identification of credential stuffing attempts, directory brute-forcing, and anomalous web shell interactions during an ongoing security incident.`
  },

  // Lesson 2.6 - Fig 2 (C03-M02-D18)
  {
    id: 'C03-M02-D18',
    caption: '*Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with \'man -k\' and \'whatis\'.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Standardized 8-Section Manual Taxonomy:** Linux offline documentation is structured into 8 standardized manual sections, providing authoritative reference guides across every layer of the operating system:
  - *Section 1 — User Commands:* General executable commands and utilities for non-privileged users (e.g., \`ls\`, \`grep\`, \`bash\`).
  - *Section 2 — System Calls:* Low-level kernel API entry points and wrapper functions invoked by programs to request OS services (e.g., \`openat\`, \`read\`, \`fork\`).
  - *Section 3 — C Library Functions:* User-space library routines provided by the standard C library (\`libc\`), including memory allocation and string formatting (e.g., \`printf\`, \`malloc\`).
  - *Section 4 — Special Files & Device Interfaces:* Manuals for synthetic device nodes and hardware abstractions residing in \`/dev\` (e.g., write-only bit bucket \`/dev/null\`, cryptographic entropy source \`/dev/urandom\`).
  - *Section 5 — File Formats & Configuration Protocols:* Syntax and grammar specifications for plain-text system configuration files (e.g., user account format in \`/etc/passwd\`, scheduled job syntax in \`crontab\`).
  - *Section 6 — Games & Demonstrations:* Documentation for terminal-based games and historic entertainment programs.
  - *Section 7 — Miscellaneous Overviews & Conventions:* Conceptual architectures, network protocol overviews, and standards (e.g., regular expression syntax \`regex\`, IP/TCP protocol suites).
  - *Section 8 — System Administration Commands:* Privileged daemons and root-level maintenance utilities (e.g., packet filtering with \`iptables\`, service management with \`systemd\`).
- **Resolving Cross-Section Name Collisions:** Many system components share identical names across different sections. For example, \`passwd\` exists in Section 1 (the executable command \`/usr/bin/passwd\`) and Section 5 (the file format specification for \`/etc/passwd\`). Requesting \`man 5 passwd\` explicitly opens the file format specification rather than the command documentation.
- **Discovery Toolchains (\`whatis\` & \`man -k\`):**
  - *\`whatis <command>\`:* Queries the pre-indexed \`whatis\` database to display a concise, one-line functional summary of a utility.
  - *\`man -k <keyword>\` (apropos):* Performs keyword searches across all manual page descriptions, allowing administrators to discover relevant tools (e.g., \`man -k network\` or \`man -k firewall\`) without knowing the exact utility name in advance.
- **Defensive Engineering Implication:** In air-gapped or restricted forensic environments where internet access is prohibited, manual pages represent the authoritative ground truth for system binaries, configuration file grammars, and kernel syscall return codes, enabling defenders to verify expected binary behavior and syntax without external dependencies.`
  }
];

let matchCount = 0;
for (const update of updates) {
  if (!content.includes(update.caption)) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
  matchCount++;
}

console.log('Successfully matched and formatted ' + matchCount + ' figures in Module 2.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module2.js!');
