# RedKross Academy — Course 03: Linux and Windows System Administration
## Production Vector Diagram Prompts Catalog (White Background Edition)

> [!IMPORTANT]
> **Design & Style Invariants:**
> - **Background:** Pure Stark White (`#FFFFFF`) — zero dark mode constraints, optimized for high-contrast presentation and technical documentation clarity.
> - **Aesthetic:** Modern technical vector, clean architectural flowcharts, precise block diagrams, high contrast dark typography (`#0F172A`, `#1E293B`).
> - **Accents:** Professional cybersecurity palette — Warm Amber (`#D97706`), Deep Navy (`#1E3A8A`), Emerald (`#16A34A`), and Alert Crimson (`#DC2626`).
> - **Coverage:** Exactly **96 diagrams** across **48 lessons** (2 diagrams per lesson across all 8 modules). All 24 source figures from `FIGURES/C03` are seamlessly integrated and elevated.

---


## Module 1: Operating System Foundations

### Lesson 1.1

#### C03-M01-D01: Operating System Architecture: Hardware Abstraction & Core Subsystems
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l01_hardware_abstraction_layers.png`
- **Caption:** *Figure C03-M01-D01: Hierarchical abstraction stack showing physical hardware mediated by the OS kernel, device drivers, and user applications.*
- **Alt Text:** Diagram showing hardware abstraction layers from CPU, RAM, storage, and NICs up to user applications
- **White Background Generation Prompt:**

```text
Professional technical architecture diagram, clean stark white background (#FFFFFF). Layered operating system stack from bottom to top: Bottom layer represents physical hardware (CPU, RAM, NVMe storage, network interface controller, hardware TPM 2.0) with subtle slate-gray borders (#E2E8F0) and dark gray text. Middle layer represents the Operating System Kernel & Device Drivers with warm amber accents (#D97706) showing process scheduler, virtual memory manager, filesystem drivers, and network stack. Top layer represents User Space Applications (web browser, terminal shell, database service) with deep charcoal containers. Bidirectional arrows with clean labels connect layers: 'Hardware Abstraction Layer (HAL)', 'Device Driver Interfaces', and 'System Call Boundary'. Crisp modern flat vector style, bold dark text (#0F172A), sharp borders, perfect alignment, zero gradients, technical documentation quality.
```

#### C03-M01-D02: OS Resource Arbitration: CPU, Memory, I/O & Storage Queues
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l01_resource_arbitration_queues.png`
- **Caption:** *Figure C03-M01-D02: Resource arbitration matrix illustrating how the OS kernel schedules competing process demands across CPU time slices, RAM pages, and disk queues.*
- **Alt Text:** Diagram illustrating OS resource arbitration across CPU scheduling, memory pages, and I/O device queues
- **White Background Generation Prompt:**

```text
Modern vector systems diagram, pristine white background (#FFFFFF). Center hub represents the OS Kernel Resource Manager in an octagonal slate container (#1E293B) with white text. Radiating outward to four distinct resource quadrants: Top: CPU Time-Slice Scheduling (showing round-robin run queue with process IDs PID 101, PID 102, PID 103). Right: Memory Allocation & Page Frame Arbiter (showing physical RAM blocks and page allocation table). Bottom: Block I/O & Storage Controller (showing I/O scheduler elevator queue). Left: Network Socket Buffer & Interrupt Handler (showing packet ingress/egress queues). High-contrast dark charcoal outlines (#334155), subtle blue (#2563EB) and amber (#D97706) accent badges, crisp vector icons, razor-sharp typography, clean enterprise technical aesthetic.
```

### Lesson 1.2

#### C03-M01-F1: Kernel Space and User Space: CPU Rings & Syscall Boundary
- **Asset Slug:** `/assets/courses/cyber-03/C03-M01-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M01-F1.txt`
- **Caption:** *Figure C03-M01-F1: Applications run in restricted user space (Ring 3) and request services from the privileged kernel (Ring 0) through system calls; drivers run in kernel space.*
- **Alt Text:** Diagram showing CPU rings, user space applications, syscall interface, kernel subsystems, and physical hardware
- **White Background Generation Prompt:**

```text
Technical systems diagram, pure white background (#FFFFFF). Two large distinct rectangular zones separated by a prominent dashed security boundary line labelled 'SYSTEM CALL BOUNDARY (Controlled Entry Gate)'. Top zone: 'USER SPACE (Ring 3) - Restricted Privilege' containing 4 distinct rounded blocks: 'Web Browser', 'Terminal Shell', 'Web Server (nginx)', and 'Security Agent UI'. Downward arrows labelled 'libc / Windows API (kernel32.dll -> ntdll.dll)' pass through the syscall gate. Bottom zone: 'KERNEL SPACE (Ring 0) - Full Supervisor Privilege' containing core subsystems: 'Scheduler', 'Memory Manager', 'File Systems', 'Network Stack', and 'Security Reference Monitor'. Below kernel space is 'Device Drivers & Kernel Modules', pointing down to 'Physical Hardware (CPU, RAM, Disk, NIC, TPM 2.0)'. High contrast, clean vector styling, dark slate boxes with amber highlight borders (#D97706), precise technical typography.
```

#### C03-M01-D03: CPU Mode Transition: User-to-Kernel Trap Gate & Register Preservation
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l02_cpu_mode_transition_trap.png`
- **Caption:** *Figure C03-M01-D03: Step-by-step CPU mode transition sequence executing a system call via software interrupt/syscall instruction, kernel stack switch, and return.*
- **Alt Text:** Sequence flow diagram showing user space syscall instruction, hardware mode bit flip, kernel stack switch, ISR dispatch, and sysret
- **White Background Generation Prompt:**

```text
Engineering sequence flow diagram, solid white background (#FFFFFF). Step-by-step horizontal or vertical workflow: Step 1: User process loads syscall arguments into CPU registers (RAX, RDI, RSI, RDX). Step 2: CPU executes 'syscall' / 'sysenter' instruction; hardware switches CPU mode bit from Ring 3 to Ring 0 and switches to the kernel stack. Step 3: Kernel System Call Handler looks up function pointer in System Call Table (sys_call_table). Step 4: Kernel executes requested operation (e.g. sys_openat). Step 5: Kernel saves return status in RAX, executes 'sysret' instruction, restoring CPU to Ring 3. Numbered circular step markers (1 to 5) in amber (#D97706) and deep blue (#1E40AF). Clear vector boxes, high-contrast text, arrows indicating register state preservation, clean white academic layout.
```

### Lesson 1.3

#### C03-M01-D04: Process State Machine: Creation, Execution, Blocking & Zombie Lifecycles
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l03_process_state_machine.png`
- **Caption:** *Figure C03-M01-D04: Finite state transition diagram of OS processes showing Ready, Running, Blocked/Waiting, Terminated, and Zombie states.*
- **Alt Text:** Finite state machine diagram of an operating system process moving between Ready, Running, Waiting, and Terminated states
- **White Background Generation Prompt:**

```text
State transition diagram, pristine white background (#FFFFFF). Five state nodes formatted as rounded rectangles with solid dark borders: 1. 'NEW (fork/CreateProcess)', 2. 'READY (In Run Queue)', 3. 'RUNNING (CPU Dispatch)', 4. 'BLOCKED / WAITING (I/O, Lock, Sleep)', 5. 'TERMINATED / ZOMBIE (Awaiting Parent waitpid)'. Directed arrows indicate transitions: 'Scheduler Dispatch' (Ready -> Running), 'Timer Interrupt / Preemption' (Running -> Ready), 'I/O Wait / Syscall' (Running -> Blocked), 'I/O Complete / Event' (Blocked -> Ready), 'Exit / Signal (SIGKILL/SIGTERM)' (Running -> Terminated). Clear amber accents (#D97706) for active state, crimson (#DC2626) for termination. High-contrast typography (#0F172A), sharp vector styling, zero clutter.
```

#### C03-M01-D05: Comparative Process Trees: Linux systemd (PID 1) vs. Windows Core Architecture
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l03_process_trees_linux_windows.png`
- **Caption:** *Figure C03-M01-D05: Side-by-side hierarchical process ancestry trees for Linux (systemd PID 1) and Windows NT (System PID 4, smss.exe, csrss.exe, services.exe, lsass.exe).*
- **Alt Text:** Diagram comparing Linux process tree anchored at systemd with Windows process tree showing smss, csrss, wininit, services, and lsass
- **White Background Generation Prompt:**

```text
Comparative dual-panel hierarchy diagram, clean white background (#FFFFFF). Left side: 'Linux Process Tree' rooted at 'kernel_task (PID 0)' branching to 'systemd (PID 1)', which spawns 'sshd (PID 842)', 'systemd-journald (PID 412)', and user sessions 'bash (PID 1920)'. Right side: 'Windows NT Process Ancestry' rooted at 'System (PID 4)' and temporary 'smss.exe (Session Manager)', which launches 'csrss.exe (Client/Server Runtime)', 'wininit.exe', which spawns 'services.exe (Service Control Manager)' and 'lsass.exe (Local Security Authority)', and 'winlogon.exe' spawning 'userinit.exe' and 'explorer.exe'. Tree nodes have neat rectangular boxes with PID tags and executable names. Connecting tree branches drawn with crisp solid dark lines. Annotations highlight security anomalies (e.g. 'A second lsass.exe in C:\Users\ is malicious'). High-contrast professional styling.
```

### Lesson 1.4

#### C03-M01-D06: Virtual Memory Architecture: Page Tables, Paging & Physical RAM Mapping
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l04_virtual_memory_paging.png`
- **Caption:** *Figure C03-M01-D06: Multi-level page table translation mapping a 48-bit virtual address through PML4, Page Directory, and Page Table to a 4 KB physical RAM frame.*
- **Alt Text:** Diagram of multi-level virtual memory translation showing virtual address bits, page table directory walk, and physical memory frames
- **White Background Generation Prompt:**

```text
Technical systems diagram, bright white background (#FFFFFF). Horizontal layout showing virtual memory address translation: Left: 64-bit Virtual Address breakdown showing 16-bit Sign Extension, 9-bit PML4 Index, 9-bit Directory Pointer Index, 9-bit Directory Index, 9-bit Table Index, and 12-bit Byte Offset (4096 bytes). Center: 4-level Page Table walking hierarchy with crisp tabular boxes (PML4 -> PDPT -> PD -> PT) connected by pointer arrows. Right: Physical Memory (RAM) divided into 4 KB Page Frames, and secondary NVMe Swap/Pagefile. Clear annotations indicate 'Page Fault Handler' and 'CR3 Register'. Color accents in navy blue (#1E3A8A) and amber (#D97706), dark crisp labels, clean white background, textbook diagram quality.
```

#### C03-M01-D07: Exploit Mitigations in Memory: ASLR Layout Randomization & DEP/NX Bit
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l04_aslr_dep_mitigations.png`
- **Caption:** *Figure C03-M01-D07: Memory protection mechanisms: Address Space Layout Randomization (ASLR) shifting stack/heap/code bases, and Data Execution Prevention (DEP/NX) enforcing W^X.*
- **Alt Text:** Diagram illustrating ASLR randomization of memory bases and DEP/NX bit enforcing Write XOR Execute
- **White Background Generation Prompt:**

```text
Security architecture infographic, stark white background (#FFFFFF). Top panel: 'Address Space Layout Randomization (ASLR)' comparing two executions of the same program. Run 1 shows Stack at 0x7ffd... and Heap at 0x55a2...; Run 2 shows Stack shifted to 0x7fff... and Heap shifted to 0x55f9..., illustrating randomized memory base offsets defeating fixed-address return-to-libc attacks. Bottom panel: 'Data Execution Prevention (DEP / NX Bit)' showing the W^X (Write XOR Execute) principle. Memory pages categorized into: Code Segment (Readable + Executable, Non-Writable), Data/Heap/Stack Segments (Readable + Writable, Non-Executable with red shield symbol). Shellcode injection attempt blocked with a prominent red security barrier. Sharp borders, clear annotations, dark slate typography.
```

### Lesson 1.5

#### C03-M01-F2: Boot Chains Compared: UEFI Secure Boot, Shim & Kernel Hand-off
- **Asset Slug:** `/assets/courses/cyber-03/C03-M01-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M01-F2.txt`
- **Caption:** *Figure C03-M01-F2: Linux and Windows boot chains from UEFI firmware to the service manager, with Secure Boot cryptographic verification and TPM 2.0 measurement.*
- **Alt Text:** Diagram comparing Linux and Windows boot chains with UEFI Secure Boot signatures and TPM measurements
- **White Background Generation Prompt:**

```text
Dual-track sequential flow diagram, pure white background (#FFFFFF). Shared top stage: 'UEFI Firmware (ROM/NVRAM)' with 'Platform Key (PK)' and 'Key Exchange Key (KEK)'. Branching into two parallel vertical verification tracks: Left track: 'Linux Boot Chain' showing UEFI verifying Shim (signed by Microsoft 3rd Party UEFI CA), Shim verifying GRUB2 (signed by distribution key), GRUB2 verifying Linux Kernel (vmlinuz), Kernel loading initramfs, mounting root filesystem, and executing systemd (PID 1). Right track: 'Windows Boot Chain' showing UEFI verifying Windows Boot Manager (bootmgfw.efi), which loads winload.efi, which verifies kernel (ntoskrnl.exe) and boot-start drivers (ELAM), launching smss.exe and services.exe. Gold padlock icons indicate cryptographic signature verification at every hop; blue microchip icon indicates TPM 2.0 PCR measurements. Crisp, high-contrast technical line art.
```

#### C03-M01-D08: Secure Boot Cryptographic Key Hierarchy: PK, KEK, db & dbx Revocation
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l05_uefi_key_hierarchy.png`
- **Caption:** *Figure C03-M01-D08: UEFI Secure Boot trust hierarchy showing Platform Key (PK), Key Exchange Key (KEK), Allowed Signatures Database (db), and Revocation List (dbx).*
- **Alt Text:** Hierarchy diagram showing UEFI PK, KEK, db allowed database, and dbx revoked binary hash database
- **White Background Generation Prompt:**

```text
Cryptographic trust hierarchy diagram, stark white background (#FFFFFF). Top root node: 'Platform Key (PK)' (OEM / Hardware vendor root of trust). Branching down to: 'Key Exchange Key (KEK)' (Microsoft Corporation KEK & OEM KEK). Branching down to two operational databases: Green shield container: 'Authorized Signatures Database (db)' containing valid X.509 certificates and SHA-256 hashes of approved bootloaders (Microsoft Windows Production CA, Microsoft UEFI CA for Shim). Red shield container: 'Forbidden Signatures Database (dbx)' containing revoked certificates and blacklisted hashes of vulnerable bootloaders (e.g. Boothole CVE-2020-10713, vulnerable shim binaries). Clean vector layout, clear signature validation arrows, bold dark text.
```

### Lesson 1.6

#### C03-M01-F3: Service Lifecycle States: systemd Unit Transitions & Failure Recovery
- **Asset Slug:** `/assets/courses/cyber-03/C03-M01-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M01-F3.txt`
- **Caption:** *Figure C03-M01-F3: A systemd unit moves from loaded to active, restarts on failure if configured (Restart=on-failure), and returns to inactive when stopped.*
- **Alt Text:** State machine diagram showing systemd unit states: inactive, activating, active, deactivating, and failed with automatic restart loops
- **White Background Generation Prompt:**

```text
State transition flowchart, crisp white background (#FFFFFF). Circular and rounded rectangular states for systemd service lifecycle: 'INACTIVE (Dead)', transitioning via 'systemctl start' to 'ACTIVATING (ExecStartPre / ExecStart)', transitioning on successful daemonization to 'ACTIVE (Running)'. From Active, on normal shutdown via 'systemctl stop', transitions through 'DEACTIVATING (ExecStop)' back to 'INACTIVE'. On abnormal crash (SIGSEGV, non-zero exit code), transitions to 'FAILED'; if 'Restart=on-failure' is set in unit file, an automatic restart delay timer loops back into 'ACTIVATING'. States highlighted with subtle color tints: Green border for Active (#16A34A), Red border for Failed (#DC2626), Amber border for Activating (#D97706). Clean dark typography, high-contrast vector arrows.
```

#### C03-M01-D09: Windows Service Control Manager (services.exe) & svchost Isolation Groups
- **Asset Slug:** `/assets/courses/cyber-03/c03_m01_l06_windows_scm_svchost_architecture.png`
- **Caption:** *Figure C03-M01-D09: Windows Service Control Manager architecture illustrating service registry keys, SCM dispatch, and svchost.exe shared process hosting.*
- **Alt Text:** Diagram showing Windows SCM reading registry service entries, dispatching standalone services and svchost shared service groups
- **White Background Generation Prompt:**

```text
Technical systems diagram, pure white background (#FFFFFF). Left: Windows Registry hive 'HKLM\SYSTEM\CurrentControlSet\Services' showing individual service definition subkeys (Start, Type, ImagePath, ServiceDll, ObjectName). Center: 'Service Control Manager (services.exe)' acting as the central service dispatcher. Right: Service execution hosts divided into two groups: Top box: 'Standalone Service Processes' (e.g. lsass.exe, spoolsv.exe running as LocalSystem). Bottom box: 'Shared Service Hosts (svchost.exe)' showing grouped service instances (svchost.exe -k netsvcs, svchost.exe -k LocalServiceAndNoImpersonation) hosting specific service DLLs. Dark slate outline containers, crisp technical labels, amber and navy accent lines.
```


## Module 2: Linux Environment & File Hierarchy

### Lesson 2.1

#### C03-M02-D10: Linux Distribution Genealogy: Lineages, Package Formats & Init Systems
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l01_linux_distributions_genealogy.png`
- **Caption:** *Figure C03-M02-D10: Major Linux enterprise lineages stemming from upstream kernels into Debian (Ubuntu, Kali), Red Hat (RHEL, Fedora, Rocky), and independent distributions (Alpine).*
- **Alt Text:** Genealogy chart of Linux distributions showing Debian, Red Hat, SUSE, and Alpine lineages with package managers and init systems
- **White Background Generation Prompt:**

```text
Genealogy tree diagram, clean white background (#FFFFFF). Top central node: 'Upstream Linux Kernel (kernel.org) + GNU Toolchain'. Branching into four major historical distribution branches: 1. 'Debian Family' (Debian -> Ubuntu -> Kali Linux / Linux Mint; .deb packages, apt/dpkg). 2. 'Red Hat Family' (Fedora -> Red Hat Enterprise Linux -> Rocky Linux / AlmaLinux; .rpm packages, dnf/rpm). 3. 'SUSE Family' (openSUSE -> SUSE Linux Enterprise Server; RPM, zypper). 4. 'Specialized / Minimal Family' (Alpine Linux; musl libc + busybox, apk packages, OpenRC). Each family card includes badges for package format, package manager, and default target environment. Clean horizontal flow, distinctive branch lines, high-contrast dark text.
```

#### C03-M02-D11: Software Supply Chain: Package Cryptographic Verification Pipeline (APT/RPM)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l01_package_verification_pipeline.png`
- **Caption:** *Figure C03-M02-D11: Cryptographic verification workflow when installing packages via APT: InRelease file, repository GPG key, SHA-256 package digests, and file extraction.*
- **Alt Text:** Flowchart showing APT package verification from repository metadata GPG signatures to SHA-256 package hashes and disk extraction
- **White Background Generation Prompt:**

```text
Security workflow diagram, pure white background (#FFFFFF). Step-by-step pipeline from left to right: 1. Client runs 'apt update' fetching 'InRelease' metadata file containing repository package hashes. 2. Client verifies GPG digital signature on InRelease against trusted public keys stored in '/etc/apt/trusted.gpg.d/'. 3. Client runs 'apt install package.deb' downloading the .deb archive. 4. Client computes SHA-256 hash of the downloaded package and verifies it matches the signed InRelease digest. 5. If hash matches, package is extracted to filesystem; if hash mismatches, installation aborts with security warning. Crisp vector icons for GPG key, cryptographic hash, and archive box. High-contrast labels, green verification checks, dark slate borders.
```

### Lesson 2.2

#### C03-M02-F2: How the Shell Processes a Command Line: Tokenization to execve
- **Asset Slug:** `/assets/courses/cyber-03/C03-M02-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M02-F2.txt`
- **Caption:** *Figure C03-M02-F2: The shell splits, expands, sets up redirections and pipes, locates commands, and runs them via the execve system call.*
- **Alt Text:** Pipeline diagram of Bash command processing: reading input, tokenization, expansions, redirection setup, PATH search, and fork/execve
- **White Background Generation Prompt:**

```text
Sequential processing pipeline diagram, stark white background (#FFFFFF). Six sequential processing stages arranged horizontally or as an annotated flow: 1. 'Read Line & Tokenize': Splits raw command string into words and operators based on IFS whitespace. 2. 'Quote Removal & Expansions': Performs Brace expansion, Tilde expansion, Parameter/Variable expansion ($VAR), Command substitution ($(cmd)), Arithmetic expansion ($((1+1))), Word splitting, Pathname expansion (globbing * ? []). 3. 'Redirections Setup': Processes input/output redirections (<, >, >>, 2>&1) modifying file descriptor table. 4. 'Command Lookup': Checks for alias, shell builtin (cd, exit), function, or searches directories in $PATH for executable binary. 5. 'Fork & Execve': Calls fork() to create child process, clones file descriptors, and invokes execve() to load binary into memory. Crisp numbered stage badges, dark text, amber connector arrows.
```

#### C03-M02-D12: Standard Streams & Pipeline Mechanics: stdin (0), stdout (1), stderr (2)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l02_standard_streams_redirection.png`
- **Caption:** *Figure C03-M02-D12: POSIX standard streams showing File Descriptors 0, 1, and 2, pipeline pipes (|), and redirection operators (> file, 2>&1).*
- **Alt Text:** Diagram of standard input 0, standard output 1, and standard error 2 connected across processes via pipes and file redirections
- **White Background Generation Prompt:**

```text
Technical flow diagram, pure white background (#FFFFFF). Central process box: 'Process A (e.g. grep)'. Three attached standard file descriptors: Left: 'FD 0: stdin (Standard Input)' receiving input from keyboard or pipe. Top-Right: 'FD 1: stdout (Standard Output)' streaming normal data to screen or pipe '|' into 'Process B (e.g. awk)'. Bottom-Right: 'FD 2: stderr (Standard Error)' streaming diagnostics/errors directly to terminal or redirected to error log file '2> error.log' or merged '2>&1'. Pipe mechanism illustrated as a kernel ring buffer connecting stdout of Process A directly to stdin of Process B. Clear vector pipes, high contrast text (#0F172A), amber and navy highlight lines.
```

### Lesson 2.3

#### C03-M02-F1: The Linux Filesystem Hierarchy Standard (FHS 3.0): Directory Topologies
- **Asset Slug:** `/assets/courses/cyber-03/C03-M02-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M02-F1.txt`
- **Caption:** *Figure C03-M02-F1: Key FHS directories with security boundaries, virtual filesystems (/proc, /sys), and configuration locations (/etc).*
- **Alt Text:** Tree diagram of Linux Filesystem Hierarchy Standard from root / showing bin, etc, home, proc, sys, var, and usr
- **White Background Generation Prompt:**

```text
Hierarchical filesystem tree diagram, crisp white background (#FFFFFF). Root node at top: '/ (Root Directory)'. Branching out into organized category boxes: 1. 'System Binaries & Libraries': '/usr/bin' (user commands), '/usr/sbin' (system administration binaries), '/usr/lib' (shared objects). Note showing /bin and /sbin as symlinks to /usr. 2. 'Host Configuration': '/etc' (host-specific plain text configurations; /etc/passwd, /etc/shadow). 3. 'Virtual Kernel Filesystems': '/proc' (process state & kernel tuning), '/sys' (device model & kernel objects), '/dev' (device nodes). 4. 'Variable & State Data': '/var/log' (system telemetry), '/var/run' (runtime PID files symlinked to /run), '/var/tmp'. 5. 'User & Mount Points': '/home' (user homes), '/root' (superuser home), '/mnt' & '/media'. Red warning badges on sensitive paths (/etc/shadow, /proc/kallsyms). Clean dark tree branches, high-contrast typography.
```

#### C03-M02-D13: Virtual Kernel Filesystems: /proc & /sys Memory Projections
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l03_proc_sys_virtual_filesystems.png`
- **Caption:** *Figure C03-M02-D13: Synthetic filesystems /proc and /sys as runtime window interfaces into kernel data structures and process memory tables.*
- **Alt Text:** Diagram illustrating how /proc and /sys project internal kernel memory structures into directory trees on demand
- **White Background Generation Prompt:**

```text
Architectural concept diagram, solid white background (#FFFFFF). Top panel: 'Linux Kernel Memory (RAM)' containing active kernel data structures (Process Control Blocks task_struct, IP routing tables, device trees). Bottom panel: 'User Space Shell & Applications' running cat, ls, sysctl. In between: 'Virtual Filesystem Switch (VFS) Synthetic Projections': '/proc/<PID>/' showing dynamic virtual files (cmdline, status, maps, fd/) synthesized on demand by the kernel without taking disk storage; and '/sys/' projecting device bus trees and kernel tunables. A read command ('cat /proc/sys/net/ipv4/ip_forward') illustrated showing the kernel directly retrieving the integer value from RAM. Clean vector illustration, dark slate containers, amber highlight lines.
```

### Lesson 2.4

#### C03-M02-D14: Path Traversal Defense: Absolute vs. Relative Paths & Directory Canonicalization
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l04_path_traversal_canonicalization.png`
- **Caption:** *Figure C03-M02-D14: Absolute versus relative path resolution mechanics and directory traversal risks (../../etc/passwd) neutralized by realpath() canonicalization.*
- **Alt Text:** Diagram contrasting absolute path resolution with relative path traversal vulnerabilities and canonicalization checks
- **White Background Generation Prompt:**

```text
Security path resolution diagram, clean white background (#FFFFFF). Two contrasting paths through the filesystem tree: Top path: 'Absolute Path Resolution' starting strictly at '/' and resolving down sequentially to '/var/www/uploads/report.pdf'. Bottom path: 'Relative Path Traversal Attack & Canonicalization': Showing an adversarial input '../../../../etc/passwd'. Arrow shows the attacker escaping the intended '/var/www/uploads/' directory sandbox. In the center, a security barrier represents 'realpath() / canonicalize_file_name()' resolving the canonical target and enforcing a prefix validation check (Target must start with Base Directory). Attack vector blocked with red alert sign; approved path marked with green shield. High-contrast technical layout.
```

#### C03-M02-D15: Inodes, Directory Entries & Filesystem Storage Allocation
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l04_inodes_and_disk_blocks.png`
- **Caption:** *Figure C03-M02-D15: Filesystem architecture separating directory entries (filenames + inode pointers) from inodes (metadata + block pointers) and data blocks.*
- **Alt Text:** Diagram showing directory entry linking filename to inode number, inode containing metadata and block pointers to physical disk blocks
- **White Background Generation Prompt:**

```text
Technical systems diagram, bright white background (#FFFFFF). Three interconnected tabular structures from left to right: 1. 'Directory Entry (dentry)': Tabular row showing Filename ('report.txt') pointing to Inode Number ('#409218'). 2. 'Inode Table Entry (#409218)': Contains File Metadata: File Type, Permissions (0644), Owner UID (1001), Group GID (1001), File Size (14.2 KB), Timestamps (atime, mtime, ctime), Hard Link Count (1), and Direct Block Pointers (Block 801, Block 802, Block 803) and Indirect Block Pointers. 3. 'Physical Storage Disk Blocks': Data blocks on disk containing the raw file contents. Connecting arrows show dentry pointing to inode, and inode pointing to disk blocks. Clean lines, dark text, blue and amber accents.
```

### Lesson 2.5

#### C03-M02-F3: Reading an ls -l Listing: Anatomy of Linux File Metadata
- **Asset Slug:** `/assets/courses/cyber-03/C03-M02-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M02-F3.txt`
- **Caption:** *Figure C03-M02-F3: Detailed breakdown of an 'ls -l' line: file type character, owner/group/other permission triads, link count, owner, group, size, timestamp, and filename.*
- **Alt Text:** Diagram dissecting an ls -l long listing showing file type, permission triads, link count, owner, group, file size, timestamp, and filename
- **White Background Generation Prompt:**

```text
Anatomy breakdown diagram, solid white background (#FFFFFF). Large monospace terminal string prominently centered: '-rwxr-xr-- 1 cadence engineering 4096 Nov 07 14:30 deploy.sh'. Callout brackets and leader lines pointing upward and downward to detailed explanations: 1. '-' = File Type (regular file; 'd' = directory, 'l' = symlink). 2. 'rwx' = Owner Permissions (Read, Write, Execute). 3. 'r-x' = Group Permissions (Read, Execute, No Write). 4. 'r--' = Other/World Permissions (Read Only). 5. '1' = Hard Link Count. 6. 'cadence' = Owner Username. 7. 'engineering' = Owning Group. 8. '4096' = File Size in Bytes. 9. 'Nov 07 14:30' = Last Modification Timestamp (mtime). 10. 'deploy.sh' = File Name. Clean technical brackets, high contrast dark text, amber badges for permission groupings.
```

#### C03-M02-D16: Hard Links vs. Symbolic Links: Inode Reference Counter vs. Path Pointers
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l05_hard_links_vs_symlinks.png`
- **Caption:** *Figure C03-M02-D16: Comparison of hard links sharing the same inode and incrementing link count versus symbolic links acting as independent files pointing to a pathname.*
- **Alt Text:** Diagram comparing hard links sharing inode and disk blocks with symbolic links pointing to target filenames
- **White Background Generation Prompt:**

```text
Comparative architecture diagram, pure white background (#FFFFFF). Top panel: 'Hard Link (ln target hardlink)' showing two filenames ('original.txt' and 'hardlink.txt') pointing to the exact same Inode (#5012) with 'Link Count = 2'. Deleting 'original.txt' decrements the link count to 1, leaving data fully accessible via 'hardlink.txt'. Cannot cross filesystems. Bottom panel: 'Symbolic Link (ln -s target symlink)' showing 'symlink.txt' having its own unique Inode (#9084) whose data block contains the string path 'original.txt'. If 'original.txt' is deleted, the symlink becomes a broken/dangling pointer. Can cross filesystems. Crisp vector boxes, dark slate labels, clear pointer arrows, textbook styling.
```

### Lesson 2.6

#### C03-M02-D17: Linux Text Processing Pipeline: grep, awk, sed, cut, sort & uniq
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l06_text_toolchain_pipeline.png`
- **Caption:** *Figure C03-M02-D17: Linux command-line text processing pipeline transforming raw log lines through filtering, column extraction, editing, sorting, and deduplication.*
- **Alt Text:** Pipeline diagram illustrating text filtering with grep, extraction with awk, pattern editing with sed, and aggregation with sort and uniq
- **White Background Generation Prompt:**

```text
Horizontal data pipeline infographic, bright white background (#FFFFFF). Flow of data through 5 sequential filtering stages: Stage 1: Raw Web Access Logs (auth.log / access.log). Stage 2: 'grep -v' (filters out noise / whitelisted IPs). Stage 3: 'awk' (extracts specific columns: timestamp, IP, status code). Stage 4: 'sed' (substitutes patterns, strips formatting). Stage 5: 'sort | uniq -c | sort -nr' (aggregates frequencies, counts unique attacker IPs, and sorts in descending order). Illustrated with sample log data snippet transforming into a clean sorted threat intelligence summary table. Clean vector pipeline arrows, high-contrast dark typography, amber accents.
```

#### C03-M02-D18: Linux Man Pages: The 8 Standard Sections & Offline Documentation Search
- **Asset Slug:** `/assets/courses/cyber-03/c03_m02_l06_man_sections_architecture.png`
- **Caption:** *Figure C03-M02-D18: Organization of the 8 standard Linux manual sections (man 1 to man 8) and search discovery with 'man -k' and 'whatis'.*
- **Alt Text:** Grid diagram illustrating the 8 standard sections of the Linux manual from user commands to system administration daemons
- **White Background Generation Prompt:**

```text
Technical grid diagram, crisp white background (#FFFFFF). Eight organized section cards arranged in a 2x4 or 4x2 matrix: Section 1: User Commands (ls, grep, bash). Section 2: System Calls (openat, read, fork). Section 3: C Library Functions (printf, malloc). Section 4: Special Files & Devices (/dev/null, /dev/urandom). Section 5: File Formats & Conventions (/etc/passwd, crontab). Section 6: Games. Section 7: Miscellaneous & Overviews (regex, protocols, man-pages). Section 8: System Administration Commands (iptables, fdisk, systemd). Bottom callout illustrates search discovery: 'man -k keyword' (apropos) and 'whatis command'. High-contrast dark boxes, amber section numbers, clean documentation aesthetic.
```


## Module 3: Linux Administration & Permissions

### Lesson 3.1

#### C03-M03-D19: Linux Account Architecture: /etc/passwd & /etc/shadow Cryptographic Schema
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l01_account_databases_schemas.png`
- **Caption:** *Figure C03-M03-D19: Structural breakdown of fields in /etc/passwd and the cryptographic salt and password hash fields in /etc/shadow.*
- **Alt Text:** Dissection diagram of /etc/passwd and /etc/shadow line fields showing username, UID, GID, home directory, shell, and salted SHA-512 password hashes
- **White Background Generation Prompt:**

```text
Technical field breakdown diagram, solid white background (#FFFFFF). Top block: '/etc/passwd' line dissection: 'cadence:x:1001:1001:Cadence Vance,SOC:/home/cadence:/bin/bash' with callout lines labeling Username, Password Placeholder ('x'), User ID (UID), Group ID (GID), GECOS user comments, Home Directory, and Login Shell. Bottom block: '/etc/shadow' line dissection: 'cadence:$6$salt1234$hashvalue...:19670:0:90:7:::'. Callout lines break down the password hash field: '$6$' = Algorithm ID (6 = SHA-512; 1 = MD5, y = yescrypt), 'salt1234' = Cryptographic Salt (random entropy preventing rainbow table attacks), followed by the one-way hash string, password aging parameters (last change, min days, max days, warning). High-contrast dark text, sharp borders, red lock icon on /etc/shadow indicating root-only 0640 permissions.
```

#### C03-M03-D20: Linux Identity Boundaries: UIDs, GIDs & Supplementary Group Memberships
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l01_uid_gid_identity_matrix.png`
- **Caption:** *Figure C03-M03-D20: Relationship between primary user identities (UIDs), primary groups, and supplementary groups defined in /etc/group.*
- **Alt Text:** Diagram showing user identity with primary UID, primary GID, and multiple supplementary groups granting aggregated permissions
- **White Background Generation Prompt:**

```text
Entity relationship diagram, stark white background (#FFFFFF). Center: User Account ('secops', UID 1002). Pointing to Primary Group: 'secops' (GID 1002) which determines default file ownership on creation. Pointing to Supplementary Groups: 'sudo' (GID 27; grants elevation rights), 'adm' (GID 4; grants system log read access), and 'docker' (GID 999; grants socket access). Group table shows schema from '/etc/group' ('group_name:password_placeholder:GID:member_list'). Venn diagram or multi-hub topology illustrating aggregated permissions inherited from supplementary memberships. Dark slate containers, clean vector lines, amber accents.
```

### Lesson 3.2

#### C03-M03-F1: Linux Permission Bits: Octal Bitmasks, Triads & Special Attributes
- **Asset Slug:** `/assets/courses/cyber-03/C03-M03-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M03-F1.txt`
- **Caption:** *Figure C03-M03-F1: Octal digits map to special bits and owner/group/other permissions; special bits appear as s or t in directory listings.*
- **Alt Text:** Diagram mapping 4-digit octal permission values to binary bits, symbolic triads (rwx), and special bits (SUID, SGID, Sticky)
- **White Background Generation Prompt:**

```text
Permission matrix diagram, pristine white background (#FFFFFF). Layout showing 4-digit octal permissions (e.g. 0755, 4750). Four vertical columns: 1. Special Bits (SUID=4, SGID=2, Sticky=1). 2. Owner Triad (Read=4, Write=2, Execute=1; Total 0-7). 3. Group Triad (Read=4, Write=2, Execute=1; Total 0-7). 4. Other Triad (Read=4, Write=2, Execute=1; Total 0-7). Below each column, binary bit representations ('r=100_2=4', 'w=010_2=2', 'x=001_2=1'). Bottom section shows how special bits override execution characters: 's' in owner execute slot (SUID), 's' in group execute slot (SGID), and 't' in other execute slot (Sticky bit on /tmp). Clean mathematical layout, bold high-contrast text, amber and navy accents.
```

#### C03-M03-D21: Directory Permission Semantics: Read (List), Write (Create/Delete), Execute (Traverse)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l02_directory_permissions_semantics.png`
- **Caption:** *Figure C03-M03-D21: Crucial operational distinction of r, w, x on directories: 'r' lists contents, 'w' creates/deletes entries, and 'x' enables traversing and accessing files.*
- **Alt Text:** Diagram contrasting file permissions with directory permissions, emphasizing directory traverse requirement
- **White Background Generation Prompt:**

```text
Comparison matrix diagram, pure white background (#FFFFFF). Two contrasting panels: Left: 'File Permissions' (r = read file content, w = modify file bytes, x = execute program). Right: 'Directory Permissions' (r = list directory filenames with ls; w = create, rename, or delete files inside directory; x = traverse/pass through directory to access inodes). Critical scenario highlighted: 'A user with read (r--) but no execute (--x) on a directory can see filenames but cannot stat, read, or write any file inside!'. Another scenario: 'A user with write (w) on a directory can delete a read-only (r--) file owned by another user!'. High-contrast warning callouts, clean vector folder icons, dark slate borders.
```

### Lesson 3.3

#### C03-M03-F2: How Access Is Decided for a File: Permission & ACL Evaluation Flowchart
- **Asset Slug:** `/assets/courses/cyber-03/C03-M03-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M03-F2.txt`
- **Caption:** *Figure C03-M03-F2: Linux checks owner, named-user ACLs, groups, and others in order, requiring traverse permission on every parent directory in the path.*
- **Alt Text:** Flowchart illustrating Linux file access decision algorithm: parent directory traverse check, owner match, named user ACL, group match, and other fallback
- **White Background Generation Prompt:**

```text
Decision flowchart diagram, crisp white background (#FFFFFF). Top step: 'Path Traversal Check': Verifies the process user has execute ('x') permission on EVERY parent directory from '/' to the target file. If NO, immediately 'Permission Denied (EACCES)'. If YES, proceed to target file access check: Step 1: Does process UID match file Owner UID? If YES, evaluate Owner bits only. If requested access permitted -> GRANT; else -> DENY. Step 2: Does an Extended ACL match the named user? If YES, evaluate named ACL mask. Step 3: Does process GID match file Group or any Supplementary Group? If YES, evaluate Group bits/ACL. Step 4: If no owner or group match, evaluate Other/World bits. Diamond decision nodes, rectangular outcome boxes (Green = Access Granted, Red = Access Denied). Clean arrows, high-contrast dark text.
```

#### C03-M03-D22: Special Permission Bits Security: SUID, SGID & Sticky Bit Threat Models
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l03_special_bits_threat_models.png`
- **Caption:** *Figure C03-M03-D22: Operational mechanics and privilege escalation attack surfaces of Setuid root binaries, Setgid shared collaboration directories, and Sticky Bit on /tmp.*
- **Alt Text:** Diagram showing SUID process running with file owner privileges, SGID inheriting directory group ownership, and Sticky bit restricting file deletion
- **White Background Generation Prompt:**

```text
Security concept diagram, solid white background (#FFFFFF). Three horizontal scenario panels: 1. 'SUID (Set User ID, 4000)': User executes binary (e.g. /usr/bin/passwd owned by root). Effective UID (EUID) temporarily switches to root (UID 0), granting write access to /etc/shadow. Threat callout: vulnerable SUID binaries allow arbitrary root privilege escalation. 2. 'SGID (Set Group ID, 2000)': On a shared folder (/srv/team), any new file created automatically inherits the group ownership of the directory, rather than the primary group of the creating user. 3. 'Sticky Bit (1000)': On public directories (/tmp, permissions 1777), any user can create files, but only the file owner or root can delete or rename them, preventing malicious file replacement. Red and amber warning shields, clear vector illustrations, dark text.
```

### Lesson 3.4

#### C03-M03-D23: Sudo Architecture & Sudoers Grammar: Least-Privilege Rule Construction
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l04_sudoers_grammar_rules.png`
- **Caption:** *Figure C03-M03-D23: Grammar structure of /etc/sudoers rules: User_Alias, Host_Alias, Runas_Alias, Command_Alias, and restrictive command whitelisting.*
- **Alt Text:** Diagram breaking down /etc/sudoers rule syntax into User, Host, RunAs operator, options, and permitted binary command paths
- **White Background Generation Prompt:**

```text
Grammar breakdown diagram, bright white background (#FFFFFF). Monospace sudoers directive prominently displayed: 'webadmin ALL = (root) NOPASSWD: /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx'. Annotated callout boxes pointing to syntax segments: 1. 'webadmin' = User or %Group specification. 2. 'ALL' = Host specification (can be restricted to specific hostnames). 3. '(root)' = RunAs specification (user/group under which command runs). 4. 'NOPASSWD:' = Tag flag (bypasses password prompt for automated tasks). 5. '/usr/bin/systemctl restart nginx' = Strict absolute command path with exact arguments. Contrasting anti-pattern box below: 'DANGEROUS: webadmin ALL=(ALL) ALL' or 'webadmin ALL=(root) /usr/bin/vi' (which allows shell escapes '!/bin/sh'). Clean formatting, red danger warnings, dark typography.
```

#### C03-M03-D24: Sudoers Drop-in Architecture: Modular Policy Governance in /etc/sudoers.d/
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l04_sudoers_dropin_architecture.png`
- **Caption:** *Figure C03-M03-D24: Best-practice sudo policy management utilizing isolated drop-in configuration files in /etc/sudoers.d/ validated with visudo -c.*
- **Alt Text:** Diagram showing main /etc/sudoers including #includedir /etc/sudoers.d with separate drop-in files for each administrative service
- **White Background Generation Prompt:**

```text
Configuration architecture diagram, pure white background (#FFFFFF). Main configuration file: '/etc/sudoers' ending with directive '#includedir /etc/sudoers.d'. Branching into distinct isolated drop-in files: 1. '/etc/sudoers.d/01-helpdesk' (password reset commands only). 2. '/etc/sudoers.d/02-monitoring' (read-only telemetry commands). 3. '/etc/sudoers.d/03-web-deploy' (nginx reload only). Note highlighting security invariants: files in sudoers.d must NOT contain periods (.), must have 0440 root permissions, and must ALWAYS be validated via 'visudo -c -f /etc/sudoers.d/<file>'. Clean file icons, green security badges, dark slate outlines.
```

### Lesson 3.5

#### C03-M03-D25: Linux Package Lifecycle: Repository Indexing, Download, Verification & Unattended Upgrades
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l05_package_lifecycle_unattended.png`
- **Caption:** *Figure C03-M03-D25: Linux package maintenance cycle showing repository sync, dependency resolution, CVE patch detection, and unattended-upgrades automation.*
- **Alt Text:** Flowchart showing package management lifecycle from remote repository sync to automated unattended security upgrades
- **White Background Generation Prompt:**

```text
Cyclical workflow diagram, clean white background (#FFFFFF). Circular 5-stage lifecycle: 1. 'Repository Synchronization': Periodic download of signed package indexes. 2. 'Vulnerability & Patch Detection': Detection of updated security packages addressing disclosed CVEs. 3. 'Automated Staging': Download to local cache (/var/cache/apt/archives). 4. 'Cryptographic Verification & Install': dpkg installs verified binaries and triggers systemd service restart. 5. 'Audit & Telemetry': Execution logged to '/var/log/unattended-upgrades/unattended-upgrades.log' and obsolete packages cleaned via 'apt autoremove'. Dark circular layout, amber and green accent arrows, sharp typography.
```

#### C03-M03-D26: Package Integrity Auditing: Verifying Installed File Checksums with dpkg -V / rpm -V
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l05_package_integrity_auditing.png`
- **Caption:** *Figure C03-M03-D26: File integrity verification checking installed binaries against package manager MD5/SHA-256 databases to detect rootkit tampering.*
- **Alt Text:** Diagram illustrating package integrity verification using dpkg -V and rpm -V to detect tampered binary files
- **White Background Generation Prompt:**

```text
Security verification diagram, solid white background (#FFFFFF). Top: Reference database stored in package manager metadata (/var/lib/dpkg/info/*.md5sums). Center: System auditor executes 'dpkg -V coreutils' or 'rpm -V coreutils'. Verification engine compares cryptographic hashes and permission bits of files currently residing on disk against the authoritative database. Result 1 (Unmodified): Clean exit with zero output (verified intact). Result 2 (Tampered / Backdoored binary): Outputs '..5....T. /bin/ls' indicating MD5 checksum mismatch ('5') and modification time mismatch ('T'), revealing unauthorized binary tampering or rootkit insertion. High contrast, red security alert flag, crisp technical layout.
```

### Lesson 3.6

#### C03-M03-F3: Log Flow on a Modern Linux Host: journald, rsyslog & Central SIEM Forwarding
- **Asset Slug:** `/assets/courses/cyber-03/C03-M03-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M03-F3.txt`
- **Caption:** *Figure C03-M03-F3: Logs flow from kernel and applications into journald, optionally to rsyslog text files rotated by logrotate, and forward to central SIEM storage.*
- **Alt Text:** Dataflow diagram showing log sources sending telemetry to systemd-journald, passing to rsyslog, logrotate, and remote SIEM
- **White Background Generation Prompt:**

```text
Telemetry dataflow diagram, pristine white background (#FFFFFF). Left: Log Sources: 'Kernel Space (dmesg / /dev/kmsg)', 'System Daemons (sshd, sudo via /dev/log)', 'User Sessions', 'Audit Subsystem (auditd)'. Ingestion layer: 'systemd-journald' storing structured binary logs in '/run/log/journal/' (ephemeral) or '/var/log/journal/' (persistent). Downstream distribution layer: 1. Local text log engine: 'rsyslog' writing to '/var/log/auth.log' and '/var/log/syslog', managed by 'logrotate' (daily/weekly compression and retention). 2. Remote forwarding: TLS-encrypted syslog / Beats / Fluentbit streaming events to 'Central SOC SIEM Collector'. Dark slate containers, blue and amber pipeline arrows, high-contrast labels.
```

#### C03-M03-D27: Log Rotation Mechanics: logrotate States, Compression & Secure Permissions
- **Asset Slug:** `/assets/courses/cyber-03/c03_m03_l06_logrotate_lifecycle_permissions.png`
- **Caption:** *Figure C03-M03-D27: Lifecycle of log rotation showing active log truncation, postrotate daemon HUP signals, gzip compression, and secure 0640 permissions.*
- **Alt Text:** Diagram illustrating logrotate lifecycle: active file rename, empty file creation with strict permissions, compression of historical logs, and deletion after retention window
- **White Background Generation Prompt:**

```text
Cyclical timeline diagram, crisp white background (#FFFFFF). Timeline showing log rotation across 4 generations: Day 1: Active log 'auth.log' (uncompressed, writable by daemon). Day 2 (Rotation Trigger): logrotate renames 'auth.log' to 'auth.log.1', creates fresh 'auth.log' with strict ownership 'root:adm' and mode 0640, and sends SIGHUP signal to rsyslog to reopen file descriptors. Day 3: 'auth.log.1' is compressed with gzip to 'auth.log.2.gz'. Day 30: 'auth.log.30.gz' exceeds retention policy and is securely purged. Note warning against world-readable log permissions (e.g. leaking password hashes or API tokens). Clear vector file icons, dark typography, neat timeline markers.
```


## Module 4: Linux Automation & Shell Scripting

### Lesson 4.1

#### C03-M04-D28: Bash Script Execution Lifecycle: Shebang, Fork, Environment & Exit Status
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l01_script_execution_lifecycle.png`
- **Caption:** *Figure C03-M04-D28: Step-by-step lifecycle of shell script execution: shebang parsing by kernel execve, environment variable inheritance, and exit code propagation.*
- **Alt Text:** Flowchart showing kernel parsing shebang line, invoking interpreter, setting up environment, executing lines, and returning exit code
- **White Background Generation Prompt:**

```text
Technical flow diagram, pure white background (#FFFFFF). Step 1: User runs './backup.sh'. Kernel reads first two bytes '0x23 0x21' (ASCII '#!'). Step 2: Kernel parses interpreter path '#!/usr/bin/env bash' and executes interpreter binary, passing script as argument. Step 3: Shell creates subshell process, inherits exported environment variables (PATH, USER) but NOT unexported local variables. Step 4: Shell parses script commands line by line. Step 5: Final command terminates, setting special parameter '$?'. Step 6: Script explicitly calls 'exit 0' (success) or 'exit 1-255' (failure condition). Clear numbered steps, high-contrast text, dark outlines with amber accents.
```

#### C03-M04-D29: Linux Exit Codes & Status Handling: Bitwise Signal Encoding ($? = 128 + N)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l01_exit_codes_bitwise_signals.png`
- **Caption:** *Figure C03-M04-D29: Exit code taxonomy: standard 0-255 values, fatal signal encoding formula ($? = 128 + Signal), and conditional chaining (&&, ||).*
- **Alt Text:** Diagram illustrating exit code conventions: 0 for success, 1-2 for general errors, 126-127 for command not found, and 128+N for signal termination
- **White Background Generation Prompt:**

```text
Reference taxonomy chart, solid white background (#FFFFFF). Horizontal table or card grid showing standard Linux Exit Codes: '0' = Success / Normal Termination; '1' = General catchall error; '2' = Misuse of shell builtins; '126' = Command invoked cannot execute (permission denied); '127' = Command not found ($PATH miss); '128' = Invalid argument to exit. Special callout box: 'Signal Termination Encoding (128 + N)': When a process is killed by signal N, exit status is 128 + N. Example 1: Killed by SIGKILL (9) -> Exit Code 137. Example 2: Killed by SIGTERM (15) -> Exit Code 143. Example 3: Killed by SIGSEGV (11) -> Exit Code 139. Conditional logic box showing 'cmd1 && cmd2' (runs cmd2 only if cmd1 exits 0) versus 'cmd1 || cmd2' (runs cmd2 only if cmd1 exits non-zero). Crisp layout, dark text.
```

### Lesson 4.2

#### C03-M04-F1: Anatomy of a Safe Defensive Script: Strict Mode, Validation & Traps
- **Asset Slug:** `/assets/courses/cyber-03/C03-M04-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M04-F1.txt`
- **Caption:** *Figure C03-M04-F1: Architecture of a production defensive script: strict error flags (set -euo pipefail), signal cleanup traps, input validation, and explicit exit codes.*
- **Alt Text:** Structural diagram breaking down a defensive Bash script: shebang, strict mode flags, signal trap handler, argument validation, core logic, and cleanup
- **White Background Generation Prompt:**

```text
Structural architecture diagram, bright white background (#FFFFFF). Vertical layout of an industrial-grade defensive shell script, segmented into 6 functional blocks with clear code callouts: 1. 'Shebang & Strict Mode': '#!/usr/bin/env bash' followed by 'set -euo pipefail' (exits on error, exits on unset variable, preserves pipeline error codes). 2. 'Signal Trap & Cleanup': 'trap cleanup EXIT INT TERM' with a cleanup() function guaranteeing temporary files are unlinked. 3. 'Constants & Environment': Setting strict PATH, umask 077, and read-only constants. 4. 'Input Validation & Pre-flight Checks': Verifies required commands, privileges (root check), and CLI parameters. 5. 'Structured Logging & Core Operations': Log function emitting ISO-8601 timestamps and severities. 6. 'Explicit Return Code': Controlled exit with non-zero on error. Clean dark card containers, amber badges, razor-sharp typography.
```

#### C03-M04-D30: Atomic File Operations & Secure Temporary Files (mktemp & Umask 077)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l02_atomic_files_mktemp.png`
- **Caption:** *Figure C03-M04-D30: Race-condition and symlink-attack prevention using mktemp with umask 077 and atomic file replacement via mv.*
- **Alt Text:** Diagram illustrating insecure predictable temp files versus atomic creation with mktemp and mv to prevent symlink attacks
- **White Background Generation Prompt:**

```text
Security comparison diagram, crisp white background (#FFFFFF). Left panel: 'Insecure Anti-Pattern (CVE Risk)' showing a script writing to predictable '/tmp/backup.tmp'. Adversary pre-creates a symlink '/tmp/backup.tmp -> /etc/shadow'; when the script runs as root, it blindly overwrites the shadow file. Right panel: 'Defensive Atomic Pattern': Step 1: Script sets 'umask 077' (restricting permissions to user-only 0600). Step 2: Calls 'TEMP_FILE=$(mktemp /tmp/backup.XXXXXXXXXX)' generating unguessable random entropy. Step 3: Script writes data to TEMP_FILE. Step 4: Performs atomic rename 'mv -f "$TEMP_FILE" "/etc/service/live.conf"' utilizing atomic POSIX rename system call, ensuring zero race conditions or incomplete file reads. Red threat icons, green security shields, dark text.
```

### Lesson 4.3

#### C03-M04-D31: Script Debugging Workflows: Tracing (set -x), Subshell Traps & Error Pinpointing
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l03_debugging_tracing_workflow.png`
- **Caption:** *Figure C03-M04-D31: Diagnostic workflow combining bash -n dry-run syntax validation, bash -x execution tracing with $PS4 prompts, and line-level error isolation.*
- **Alt Text:** Workflow diagram showing bash -n syntax checks, bash -x tracing with line numbers, and error trapping
- **White Background Generation Prompt:**

```text
Technical troubleshooting workflow diagram, pure white background (#FFFFFF). Three progressive debugging stages: 1. 'Static Syntax Validation': Running 'bash -n script.sh' (checks grammar, unclosed quotes, missing 'fi' or 'done' without executing commands). 2. 'Live Execution Tracing': Running 'bash -x script.sh' with custom prompt 'export PS4="+ ${BASH_SOURCE}:${LINENO}: "'. Shows terminal output trace printing expanded commands prefixed with exact script line numbers. 3. 'ERR Trap Post-Mortem': Handler 'trap "echo ERROR on line $LINENO" ERR' capturing unexpected non-zero exits instantly. Vector icons for code terminal, magnifying glass, and debug bug. High-contrast dark boxes, amber indicator dots.
```

#### C03-M04-D32: Static Script Analysis with ShellCheck: Common Anti-Patterns & Defenses
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l03_shellcheck_antipatterns.png`
- **Caption:** *Figure C03-M04-D32: Common shell scripting security bugs detected by ShellCheck: unquoted variables (SC2086), globbing errors, and IFS word splitting.*
- **Alt Text:** Diagram detailing ShellCheck findings: unquoted variable expansion, command substitution pitfalls, and subshell variable scoping
- **White Background Generation Prompt:**

```text
Code review infographic, stark white background (#FFFFFF). Table or split-panel showing 4 critical ShellCheck warnings: 1. 'SC2086: Double quote to prevent globbing and word splitting': Shows 'rm -rf $DIR' (danger: if DIR=' /', deletes root!) vs 'rm -rf "$DIR"'. 2. 'SC2181: Check exit code directly': Shows 'cmd; if [ $? -eq 0 ]' vs 'if cmd; then'. 3. 'SC2046: Quote this to prevent word splitting': Shows 'kill $(cat pidfile)' vs 'xargs'. 4. 'SC2155: Declare and assign separately to avoid masking return values': Shows 'local var=$(cmd)' vs 'local var; var=$(cmd)'. Code blocks styled with clear monospace font, red highlight for insecure code, green highlight for safe code, dark text.
```

### Lesson 4.4

#### C03-M04-D33: Cron Spool Architecture & Crontab Syntax: Minute, Hour, Day, Month, Weekday
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l04_cron_spool_syntax.png`
- **Caption:** *Figure C03-M04-D33: The 5-field cron time expression schema (* * * * *), system crontab locations (/etc/crontab, /etc/cron.d/), and user spools.*
- **Alt Text:** Diagram breaking down the 5 fields of a crontab line: minute, hour, day of month, month, day of week, user, and command
- **White Background Generation Prompt:**

```text
Syntactic breakdown diagram, bright white background (#FFFFFF). Central large banner displaying cron format: '* * * * * user command'. Five callout brackets pointing to the time fields: 1. 'Minute (0-59)'. 2. 'Hour (0-23)'. 3. 'Day of Month (1-31)'. 4. 'Month (1-12 or JAN-DEC)'. 5. 'Day of Week (0-7, 0 and 7 = SUN)'. Example expressions shown: '*/15 * * * *' (every 15 minutes), '0 2 * * 1' (every Monday at 02:00). Bottom section shows filesystem spool architecture: User crontabs in '/var/spool/cron/crontabs/<user>' (managed strictly via 'crontab -e') and System crontabs in '/etc/cron.d/', '/etc/cron.daily/'. Clean tabular boxes, amber accent brackets, dark typography.
```

#### C03-M04-D34: Cron Security Pitfalls: World-Writable Scripts, Environment Stripping & Symlinks
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l04_cron_security_pitfalls.png`
- **Caption:** *Figure C03-M04-D34: Privilege escalation vulnerabilities in cron jobs: minimal PATH environment, unquoted executable paths, and world-writable script files.*
- **Alt Text:** Security diagram illustrating cron privilege escalation via writable scripts and PATH hijacking
- **White Background Generation Prompt:**

```text
Threat modeling diagram, pure white background (#FFFFFF). Three prominent attack scenarios targeting root cron jobs: 1. 'World-Writable Script File': Root crontab runs '/opt/scripts/backup.sh'. If permissions are 0777 or owned by an unprivileged user, an attacker edits the script to inject a reverse root shell. 2. 'PATH Hijacking': Cron executes commands with minimal default PATH ('/usr/bin:/bin'). If a script calls 'tar' without an absolute path and sets 'PATH=.:$PATH', attacker places a malicious 'tar' binary in the working directory. 3. 'Missing Standard Error Redirection': Silent failures due to unmonitored stderr. Hardening rules shown in green container: enforce root ownership (0700/0750), use absolute paths, and log output with '>> /var/log/cron.log 2>&1'. Sharp vector graphics, dark slate labels.
```

### Lesson 4.5

#### C03-M04-F2: cron versus systemd Timers: Unit Synchronization, Logging & Sandboxing
- **Asset Slug:** `/assets/courses/cyber-03/C03-M04-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M04-F2.txt`
- **Caption:** *Figure C03-M04-F2: cron runs crontab lines with a minimal environment; systemd timers activate service units with built-in logging, sandboxing, and catch-up.*
- **Alt Text:** Comparison diagram of cron versus systemd timers showing unit synchronization, journald logging, and sandbox isolation
- **White Background Generation Prompt:**

```text
Side-by-side comparison diagram, crisp white background (#FFFFFF). Left panel: 'cron Architecture': Crontab file executed directly by crond daemon. Minimal environment variables, output discarded or emailed via local mail, zero resource limits, zero process sandboxing, missed execution if machine is powered off. Right panel: 'systemd Timer Architecture': Two synchronized units: 'backup.timer' (defines schedule via OnCalendar= or OnBootSec=, Persistent=true catch-up) activating 'backup.service' (contains execution logic). Major enterprise advantages highlighted: 1. Native journald logging ('journalctl -u backup.service'). 2. Failure dependencies ('OnFailure=alert.service'). 3. Sandboxing directives ('ProtectSystem=strict', 'NoNewPrivileges=true'). High-contrast cards, green checkmarks on systemd, amber comparison accents.
```

#### C03-M04-D35: systemd Timer Pair Architecture: Monotonic vs. Realtime Clock Triggers
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l05_timer_pair_monotonic_realtime.png`
- **Caption:** *Figure C03-M04-D35: Architectural decoupling of timer triggers from execution logic, contrasting Realtime (OnCalendar) and Monotonic (OnBootSec, OnUnitActiveSec) clocks.*
- **Alt Text:** Diagram showing systemd timer pair architecture with OnCalendar wall-clock triggers and OnBootSec monotonic timers
- **White Background Generation Prompt:**

```text
Technical architecture diagram, solid white background (#FFFFFF). Left: Unit file 'log-cleanup.timer' specifying schedule. Shows two trigger types: 1. 'Realtime (Wall Clock)': 'OnCalendar=*-*-* 03:00:00' with 'Persistent=true' (triggers at 3 AM; if system was asleep, runs immediately upon wake). 2. 'Monotonic (Relative Time)': 'OnBootSec=15min' (runs 15 minutes after boot) and 'OnUnitActiveSec=1h' (runs every 1 hour after previous completion). Center: Event dispatch bus activating Right: Unit file 'log-cleanup.service' executing the task inside an isolated cgroup. Clean vector clock icons, code snippets in clear monospace font, dark containers with amber highlight borders.
```

### Lesson 4.6

#### C03-M04-F3: Monitoring Signal Flow: Measure, Compare, Record, Alert, Act & Review
- **Asset Slug:** `/assets/courses/cyber-03/C03-M04-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M04-F3.txt`
- **Caption:** *Figure C03-M04-F3: Systems monitoring as an active feedback loop: measuring metrics, comparing thresholds, recording telemetry, alerting teams, acting, and reviewing.*
- **Alt Text:** Cyclical diagram of monitoring signal flow: measuring system metrics, comparing thresholds, recording data, alerting, acting, and post-incident review
- **White Background Generation Prompt:**

```text
Continuous feedback loop diagram, pure white background (#FFFFFF). Circular 6-stage operational cycle: 1. 'MEASURE': Gathering telemetry (CPU load, memory usage, disk space via df/vmstat/iostat). 2. 'COMPARE': Evaluating against defined engineering thresholds (e.g. disk usage > 85%, load average > core count). 3. 'RECORD': Storing historical metrics in time-series database (Prometheus / journald). 4. 'ALERT': Emitting actionable notifications (PagerDuty, Slack, email) without alert fatigue. 5. 'ACT': Automated self-healing remediation or on-call engineer intervention. 6. 'REVIEW': Post-incident review tuning thresholds to prevent recurring false alarms. Clean circular arrows, dark slate nodes, amber accent badges, sharp enterprise styling.
```

#### C03-M04-D36: Linux Performance Telemetry: CPU Load Average, Memory Paging & Disk I/O Queues
- **Asset Slug:** `/assets/courses/cyber-03/c03_m04_l06_performance_telemetry_metrics.png`
- **Caption:** *Figure C03-M04-D36: Interpretation of Linux performance telemetry: 1/5/15 minute load averages, memory swap paging metrics, and disk queue saturation.*
- **Alt Text:** Dashboard diagram dissecting Linux performance metrics from uptime, top, vmstat, and iostat
- **White Background Generation Prompt:**

```text
Dashboard infographic, bright white background (#FFFFFF). Three diagnostic telemetry panels: 1. 'CPU Load Average (/proc/loadavg)': 1-min, 5-min, 15-min metrics explained relative to CPU core count (Load 4.0 on 4-core CPU = 100% capacity; Load 12.0 on 4-core = heavy saturation). 2. 'Memory Saturation (vmstat)': Differentiating benign disk caching from dangerous page swapping ('si' swap-in and 'so' swap-out metrics indicating thrashing). 3. 'Disk I/O Latency (iostat)': '%util' device saturation and 'await' transaction latency indicating storage bottlenecks. Clean gauges, high-contrast monospace sample terminal outputs, dark text, amber warning thresholds.
```


## Module 5: Windows Foundations & Architecture

### Lesson 5.1

#### C03-M05-F1: Windows NT Architecture Overview: User Mode Subsystems to Executive Kernel
- **Asset Slug:** `/assets/courses/cyber-03/C03-M05-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M05-F1.txt`
- **Caption:** *Figure C03-M05-F1: Windows user-mode components call into the kernel through ntdll; the executive includes the Configuration Manager, Object Manager, and Security Reference Monitor.*
- **Alt Text:** Layered diagram of Windows NT architecture showing user mode applications, subsystem DLLs, ntdll, executive kernel subsystems, and HAL
- **White Background Generation Prompt:**

```text
Comprehensive systems architecture diagram, clean white background (#FFFFFF). Divided horizontally by the User-Mode / Kernel-Mode boundary: Top Half: 'User Mode (Ring 3)' showing Applications (Office, Browser, Services), Environment Subsystems (Win32 Subsystem, Subsystem DLLs: kernel32.dll, user32.dll, advapi32.dll), and 'ntdll.dll' (Native API system call dispatch stub). Bottom Half: 'Kernel Mode (Ring 0)': Top section: 'Executive Subsystems (ntoskrnl.exe)' containing Object Manager, Security Reference Monitor (SRM), Process & Thread Manager, Virtual Memory Manager, I/O Manager, Configuration Manager (Registry), and Local Procedure Call (ALPC). Below Executive: 'Microkernel' (thread scheduling, interrupt handling). Below Kernel: 'Hardware Abstraction Layer (HAL.dll)' interfacing with Physical Hardware. High contrast, dark boxes, amber divider line, clear technical labels.
```

#### C03-M05-D37: Windows Core System Process Tree: Session 0 vs. User Session 1 Hierarchy
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l01_windows_core_process_tree.png`
- **Caption:** *Figure C03-M05-D37: Standard Windows boot process hierarchy illustrating Session 0 service isolation (services.exe, lsass.exe) and interactive User Session 1 (explorer.exe).*
- **Alt Text:** Tree hierarchy diagram of core Windows system processes: smss, wininit, services, lsass, and userinit/explorer in separate sessions
- **White Background Generation Prompt:**

```text
Process hierarchy tree diagram, pure white background (#FFFFFF). Root process: 'System (PID 4)'. Spawns temporary master 'smss.exe (Session Manager)'. smss.exe spawns: 1. 'Session 0 (Isolated Non-Interactive Services)': smss launches 'wininit.exe', which spawns 'services.exe (SCM)', 'lsass.exe (LSA)', and 'lsm.exe (Local Session Manager)'. services.exe spawns multiple 'svchost.exe' instances. 2. 'Session 1 (Interactive User Session)': smss launches 'csrss.exe (Session 1)' and 'winlogon.exe'. winlogon.exe launches 'userinit.exe', which starts 'explorer.exe' (Desktop shell). Callout note: 'Session 0 Isolation prevents shatter attacks where user apps inject into system services'. Clean tree branches, dark slate rectangular nodes, amber PID tags.
```

### Lesson 5.2

#### C03-M05-F3: Windows Registry Hives, On-Disk Files & Persistence Locations
- **Asset Slug:** `/assets/courses/cyber-03/C03-M05-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M05-F3.txt`
- **Caption:** *Figure C03-M05-F3: HKLM hives and per-user hives with their on-disk backing files and critical security-relevant persistence locations.*
- **Alt Text:** Diagram mapping Windows registry hives to on-disk files in System32\config and user profiles, detailing autostart persistence keys
- **White Background Generation Prompt:**

```text
Technical mapping diagram, crisp white background (#FFFFFF). Left panel: 'Registry Logical View': HKEY_LOCAL_MACHINE (HKLM) and HKEY_USERS (HKU), and virtual link roots (HKCU, HKCR, HKCC). Center panel: 'On-Disk Backing Files': HKLM\SYSTEM -> 'C:\Windows\System32\config\SYSTEM'; HKLM\SAM -> 'C:\Windows\System32\config\SAM'; HKLM\SECURITY -> 'C:\Windows\System32\config\SECURITY'; HKLM\SOFTWARE -> 'C:\Windows\System32\config\SOFTWARE'; HKCU -> 'C:\Users\<User>\NTUSER.DAT'. Right panel: 'Threat Hunting Autostart & Persistence Keys': Highlighting Run/RunOnce keys ('...\CurrentVersion\Run'), Winlogon Shell, Startup folders, and Services keys. Red warning badges on SAM and SECURITY hives indicating privileged credentials. Dark containers, amber connector lines, high contrast.
```

#### C03-M05-D38: Registry Transaction Mechanics: Hive Flush, Transaction Logs (.LOG1, .LOG2) & Forensics
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l02_registry_transactions_forensics.png`
- **Caption:** *Figure C03-M05-D38: Write-ahead logging in the Windows registry: in-memory cell modification, transaction logging (.LOG1/.LOG2), and atomic hive sync.*
- **Alt Text:** Diagram showing registry in-memory modification, write-ahead logging in .LOG files, and periodic flushing to primary hive files
- **White Background Generation Prompt:**

```text
Forensic dataflow diagram, solid white background (#FFFFFF). Step 1: Process calls RegSetValueEx(). Step 2: Configuration Manager modifies Registry Cell in volatile RAM cache. Step 3: Write-Ahead Logging: Transaction write commits to primary transaction log file ('SOFTWARE.LOG1' or 'SOFTWARE.LOG2'). Step 4: Lazy Writer or explicit flush writes dirty memory pages to primary hive file ('SOFTWARE'). Step 5: Forensic insight callout: 'Deleted keys and timestamps remain in transaction logs and unallocated hive slack space, enabling incident responders to recover wiped malware persistence entries'. Clean vector disk icons, flow arrows, dark slate typography.
```

### Lesson 5.3

#### C03-M05-D39: Windows Service Misconfigurations: Unquoted Service Paths & Insecure Permissions
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l03_unquoted_service_paths.png`
- **Caption:** *Figure C03-M05-D39: Privilege escalation via unquoted service paths: how CreateProcess searches whitespace-delimited paths to execute malicious binaries.*
- **Alt Text:** Diagram illustrating unquoted service path execution hierarchy and insecure service DACL exploitation
- **White Background Generation Prompt:**

```text
Security threat diagram, stark white background (#FFFFFF). Top panel: 'Unquoted Service Path Attack': Service binary path configured as: 'C:\Program Files\Enterprise App\service.exe' WITHOUT quotes. Windows CreateProcess attempts execution sequentially: 1. 'C:\Program.exe' (Attacker places malicious executable here). 2. 'C:\Program Files\Enterprise.exe'. 3. 'C:\Program Files\Enterprise App\service.exe'. If attacker has write access to C:\, malicious Program.exe executes with LocalSystem rights upon reboot! Bottom panel: 'Remediation': Wrapping path in quotes ('"C:\Program Files\Enterprise App\service.exe"') forces exact literal path resolution. Red danger skull on unquoted path, green padlock on quoted path, clear high-contrast typography.
```

#### C03-M05-D40: Windows Service Account Privilege Matrix: LocalSystem, NetworkService, LocalService & gMSAs
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l03_service_accounts_matrix.png`
- **Caption:** *Figure C03-M05-D40: Security comparison of Windows built-in service identities, detailing local privileges, network authentication capabilities, and modern gMSA adoption.*
- **Alt Text:** Comparison table diagram contrasting LocalSystem, NetworkService, LocalService, and Group Managed Service Accounts (gMSA)
- **White Background Generation Prompt:**

```text
Comparison matrix chart, bright white background (#FFFFFF). Four structured identity cards: 1. 'NT AUTHORITY\SYSTEM (LocalSystem)': Broadest local privileges (SE_DEBUG, SE_TCB, etc.), full filesystem/registry access; presents machine account credentials (DOMAIN\COMPUTER$) on network. Highest risk. 2. 'NT AUTHORITY\NetworkService': Restricted local rights (equivalent to standard user); authenticates across Active Directory domain as computer machine account. 3. 'NT AUTHORITY\LocalService': Restricted local rights; presents anonymous unauthenticated credentials on network. 4. 'Group Managed Service Accounts (gMSA)': Modern enterprise standard; automatic 30-day password rotation by Domain Controller, zero interactive logon rights, constrained delegation. Clear badges for Local Privilege, Network Identity, and Risk Tier. High-contrast dark styling.
```

### Lesson 5.4

#### C03-M05-D41: Anatomy of a Windows Security Identifier (SID): S-1-5-21 Breakdown
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l04_sid_structure_breakdown.png`
- **Caption:** *Figure C03-M05-D41: Bit-level and textual dissection of a Windows Security Identifier (SID): revision, identifier authority, domain sub-authorities, and Relative Identifier (RID).*
- **Alt Text:** Diagram breaking down a Windows SID: S prefix, revision number, identifier authority, domain sub-authorities, and relative identifier RID
- **White Background Generation Prompt:**

```text
Dissection diagram, pure white background (#FFFFFF). Prominent display of textual SID string: 'S-1-5-21-3623811015-3361044348-30300820-1001'. Color-coded brackets and callouts: 1. 'S' = Identifies string as a SID. 2. '1' = Revision Version (universally 1). 3. '5' = Identifier Authority (5 = SECURITY_NT_AUTHORITY). 4. '21' = Sub-Authority (21 = SECURITY_NT_NON_UNIQUE, indicating local machine or domain). 5. '3623811015-3361044348-30300820' = Domain / Machine Specific Sub-Authority (96-bit unique installation identifier). 6. '1001' = Relative Identifier (RID): Built-in Administrator is always RID 500, Guest is RID 501, standard user accounts begin at RID 1000+. Clean dark boxes, amber and blue accents, high-contrast labels.
```

#### C03-M05-D42: Well-Known SIDs & Built-in Security Principals: SYSTEM, Admins & Users
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l04_well_known_sids_taxonomy.png`
- **Caption:** *Figure C03-M05-D42: Taxonomy of universal well-known Windows SIDs: Everyone (S-1-1-0), Authenticated Users (S-1-5-11), Built-in Administrators (S-1-5-32-544).*
- **Alt Text:** Taxonomy chart of well-known Windows SIDs including Everyone, Interactive, Local System, and Builtin Administrators
- **White Background Generation Prompt:**

```text
Reference taxonomy chart, crisp white background (#FFFFFF). Two-column technical card grid: Column 1: 'Universal Well-Known SIDs': S-1-0-0 (Nobody), S-1-1-0 (Everyone / World), S-1-2-0 (Local / Console), S-1-3-0 (Creator Owner), S-1-5-7 (Anonymous Logon), S-1-5-11 (Authenticated Users), S-1-5-18 (LocalSystem), S-1-5-19 (LocalService), S-1-5-20 (NetworkService). Column 2: 'Built-in Aliases (S-1-5-32-XXX)': S-1-5-32-544 (Administrators), S-1-5-32-545 (Users), S-1-5-32-546 (Guests), S-1-5-32-555 (Remote Desktop Users). Clear descriptions of authorization implications. Dark slate outlines, amber highlight badges, high-contrast text.
```

### Lesson 5.5

#### C03-M05-F2: Access Check: Security Reference Monitor (SRM), Tokens & Mandatory Integrity Control
- **Asset Slug:** `/assets/courses/cyber-03/C03-M05-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M05-F2.txt`
- **Caption:** *Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.*
- **Alt Text:** Flowchart of Windows SRM access check comparing token SIDs and privileges with object DACL and integrity level
- **White Background Generation Prompt:**

```text
Technical authorization flowchart, solid white background (#FFFFFF). Left: 'Subject (Process Access Token)' containing: User SID, Group SIDs (enabled/deny-only), Assigned Privileges (e.g. SeDebugPrivilege), and Integrity Level (e.g. Medium). Right: 'Target Securable Object (File, Registry Key, Service)' containing Security Descriptor: Owner SID, Discretionary ACL (DACL) with ACE entries, System ACL (SACL), and Mandatory Integrity Label (e.g. High). Center: 'Security Reference Monitor (SRM)': Evaluates two checks: 1. Integrity Check: Does token integrity meet or exceed object integrity? (No-Write-Up rule). 2. DACL Check: Traverses ACE entries sequentially; checks Explicit Deny, then Explicit Allow. If matching Allow found without Deny -> Access Granted (Green shield); else -> Access Denied (Red shield). Sharp vector layout, high contrast.
```

#### C03-M05-D43: User Account Control (UAC) & Filtered Tokens: Standard vs. Elevated Contexts
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l05_uac_filtered_tokens.png`
- **Caption:** *Figure C03-M05-D43: How User Account Control creates split tokens at logon: a filtered standard user token for daily work and an elevated token activated via consent prompt.*
- **Alt Text:** Diagram illustrating UAC split token creation: full administrative token versus filtered standard token and secure desktop consent prompt
- **White Background Generation Prompt:**

```text
Security process diagram, clean white background (#FFFFFF). Top: User logs on with administrative credentials. Local Security Authority (LSA) creates two access tokens: 1. 'Full Administrator Token' (linked, dormant, High Integrity, administrative group SIDs enabled, full privileges). 2. 'Filtered Standard Token' (active, Medium Integrity, administrative SIDs marked Deny-Only, privileges stripped: SeDebugPrivilege, SeTakeOwnership removed). Normal applications (explorer.exe, browsers) run under Filtered Token. Bottom: When user launches administrative tool (regedit, elevated PowerShell), Application Information Service (appinfo) triggers UAC Consent Prompt on Secure Desktop. Upon user confirmation, elevated process launches with the Full Administrator Token. Clean vector shields, high contrast dark text.
```

### Lesson 5.6

#### C03-M05-D44: NTFS Security Descriptors: Owner, Group, DACL & SACL Architecture
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l06_ntfs_security_descriptor.png`
- **Caption:** *Figure C03-M05-D44: Internal structure of an NTFS Security Descriptor: Control flags, Owner SID, Primary Group SID, Discretionary ACL (permissions), and System ACL (auditing).*
- **Alt Text:** Diagram showing NTFS security descriptor components: control flags, owner SID, group SID, DACL with ACE entries, and SACL with audit entries
- **White Background Generation Prompt:**

```text
Data structure diagram, bright white background (#FFFFFF). Main container represents 'NTFS Security Descriptor': 1. 'Header & Control Flags' (self-relative, DACL present, auto-inherited). 2. 'Owner SID' (principal who can always modify permissions). 3. 'Primary Group SID' (POSIX subsystem compatibility). 4. 'Discretionary Access Control List (DACL)': Array of Access Control Entries (ACEs) defining who can access the file. 5. 'System Access Control List (SACL)': Array of System Audit ACEs generating Event 4663 audit records upon access. Individual ACE expanded below showing ACE Type (ACCESS_ALLOWED_ACE_TYPE or ACCESS_DENIED_ACE_TYPE), Inheritance Flags (CI, OI), Access Mask (Read, Write, Delete), and Trustee SID. Clean tabular boxes, dark text, blue and amber outlines.
```

#### C03-M05-D45: NTFS vs. Share Permissions: The Most Restrictive Intersection Rule
- **Asset Slug:** `/assets/courses/cyber-03/c03_m05_l06_ntfs_vs_share_permissions.png`
- **Caption:** *Figure C03-M05-D45: Permission evaluation over the network: combining SMB Share permissions with underlying NTFS DACLs where the most restrictive permission always wins.*
- **Alt Text:** Venn diagram and logic flow showing effective permissions calculated as the most restrictive intersection of SMB share permissions and NTFS permissions
- **White Background Generation Prompt:**

```text
Decision logic diagram, pure white background (#FFFFFF). Client connects over network via SMB (port 445). Two gateway security layers: Layer 1: 'SMB Share Permissions' (e.g. Share set to 'Everyone: Read-Only'). Layer 2: 'Underlying NTFS Permissions' (e.g. NTFS folder set to 'Sales Group: Full Control / Modify'). Center calculation node: 'Effective Permission Evaluation': The operating system enforces the **MOST RESTRICTIVE** intersection of both layers! Result: Client has Read-Only access (Share bottleneck prevents Write). Contrasting Scenario 2: Share = Full Control, NTFS = Read-Only -> Effective = Read-Only. Clear mathematical logic, red and green indicator badges, dark text, clean vector arrows.
```


## Module 6: PowerShell Administration

### Lesson 6.1

#### C03-M06-D46: PowerShell Evolution: Windows PowerShell 5.1 (.NET Framework) vs. PowerShell 7+ (.NET Core)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l01_powershell_editions_evolution.png`
- **Caption:** *Figure C03-M06-D46: Architectural differences between legacy Windows PowerShell 5.1 (powershell.exe, Windows-only) and modern PowerShell 7+ (pwsh, cross-platform).*
- **Alt Text:** Comparison chart of Windows PowerShell 5.1 on .NET Framework versus PowerShell 7 on modern cross-platform .NET Core
- **White Background Generation Prompt:**

```text
Architectural comparison chart, crisp white background (#FFFFFF). Left column: 'Windows PowerShell 5.1 (Desktop Edition)': Built on legacy .NET Framework 4.8; binary 'powershell.exe'; bundled into Windows OS; Windows-only; legacy WMI cmdlets. Deprecated feature warning: PowerShell 2.0 engine removed in Windows 11 24H2. Right column: 'PowerShell 7.x (Core Edition)': Built on high-performance cross-platform .NET 8/9; binary 'pwsh' / 'pwsh.exe'; runs on Linux, macOS, and Windows; asynchronous parallel execution (ForEach-Object -Parallel); modern SSH remoting. Feature comparison matrix showing command compatibility, speed, and platform support. High-contrast cards, dark text, blue and amber badges.
```

#### C03-M06-D47: PowerShell Discovery Model: Get-Command, Get-Help & Get-Member Taxonomy
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l01_discovery_command_help_member.png`
- **Caption:** *Figure C03-M06-D47: The foundational discovery triumvirate of PowerShell: Get-Command (finds cmdlets), Get-Help (reads documentation), and Get-Member (inspects .NET objects).*
- **Alt Text:** Diagram illustrating the PowerShell discovery workflow: finding commands with Get-Command, learning usage with Get-Help, and revealing object methods with Get-Member
- **White Background Generation Prompt:**

```text
Workflow discovery triangle, solid white background (#FFFFFF). Three interconnected discovery pillars: 1. 'Get-Command (Verb-Noun Discovery)': Discovers available cmdlets by noun or verb ('Get-Command -Verb Get -Noun *Service*'). 2. 'Get-Help (Syntactic Documentation)': Displays parameters, full descriptions, and operational code samples ('Get-Help Get-Service -Examples'). 3. 'Get-Member (Object Introspection)': Pipes live command output to reveal underlying .NET TypeName, Methods, and Properties ('Get-Service | Get-Member'). Triangular flow with arrows indicating iterative discovery cycle. Modern flat vector styling, dark slate boxes with amber borders, sharp typography.
```

### Lesson 6.2

#### C03-M06-F1: Text Pipeline vs. Object Pipeline: Linux String Streaming vs. .NET Object Projection
- **Asset Slug:** `/assets/courses/cyber-03/C03-M06-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M06-F1.txt`
- **Caption:** *Figure C03-M06-F1: Bash pipelines pass raw text streams requiring fragile parsing; PowerShell passes strongly typed .NET objects with accessible properties.*
- **Alt Text:** Diagram comparing Linux text stream piping requiring regex/awk parsing with PowerShell typed object piping retaining property access
- **White Background Generation Prompt:**

```text
Comparison diagram, pure white background (#FFFFFF). Top panel: 'Linux / Bash Text Pipeline': 'ps aux | grep nginx | awk "{print \$2}"'. Data flows as raw ASCII character bytes. Disadvantage: If column spacing changes or output format varies across distribution versions, the parsing script breaks silently. Bottom panel: 'PowerShell Object Pipeline': 'Get-Process -Name nginx | Where-Object CPU -gt 10 | Select-Object Id, CPU, WorkingSet'. Data flows as live, structured 'System.Diagnostics.Process' .NET objects. Properties (Id, ProcessName, Threads, Handles) are accessed directly as typed data fields with zero regex or text parsing overhead. Crisp vector illustration, dark slate containers, amber highlight badges.
```

#### C03-M06-D48: PowerShell Pipeline Filtering & Projection: Where-Object, Select-Object & Measure-Object
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l02_pipeline_filtering_projection.png`
- **Caption:** *Figure C03-M06-D48: Sequential object stream processing: filtering rows with Where-Object, shaping columns with Select-Object, and statistical aggregation with Measure-Object.*
- **Alt Text:** Pipeline flow diagram showing objects flowing through Where-Object filtering, Select-Object shaping, and Measure-Object aggregation
- **White Background Generation Prompt:**

```text
Data pipeline flowchart, bright white background (#FFFFFF). Stream of typed objects flowing from left to right: Source: 'Get-Service' emitting 150 System.ServiceProcess.ServiceController objects. Step 1: 'Where-Object Status -eq "Running"' filters stream down to 64 running service objects (row filtering). Step 2: 'Select-Object DisplayName, ServiceName, StartType' extracts only requested properties into lightweight PSCustomObject instances (column projection). Step 3: 'Measure-Object' calculates count, sum, average. Step 4: Final output formatted cleanly into console or exported to 'Export-Csv' or 'ConvertTo-Json'. Clear vector funnel and pipeline icons, high-contrast text, dark outlines.
```

### Lesson 6.3

#### C03-M06-D49: PowerShell Data Structures: Arrays, Hash Tables & PSCustomObject Construction
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l03_data_structures_pscustomobject.png`
- **Caption:** *Figure C03-M06-D49: Construction and memory layout of PowerShell collections: ordered arrays (@()), key-value hash tables (@{}), and structured custom objects ([PSCustomObject]@{}).*
- **Alt Text:** Diagram illustrating PowerShell arrays, hash tables, and custom object property bags
- **White Background Generation Prompt:**

```text
Data structures diagram, stark white background (#FFFFFF). Three structural containers: 1. 'Array (@(1, 2, 3))': Ordered indexed collection of objects, zero-indexed ($arr[0]). Fixed size in .NET memory (resizing clones array). 2. 'Hash Table (@{Key="Val"})': Key-value lookup dictionary utilizing hash codes ($hash["Key"]). Fast O(1) lookup. 3. '[PSCustomObject]@{...}': Custom .NET object property bag. Contains named member properties (Hostname, Status, IPAddress), methods, and custom format types. Code snippet illustrates converting a hash table into a strongly typed PSCustomObject ready for pipeline export. Dark slate boxes, clean code styling, amber and blue accents.
```

#### C03-M06-D50: PowerShell Control Flow & Error Trapping: Try/Catch/Finally & $ErrorActionPreference
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l03_control_flow_try_catch.png`
- **Caption:** *Figure C03-M06-D50: Error handling mechanics in PowerShell: converting non-terminating errors into terminating exceptions with -ErrorAction Stop, and handling with Try/Catch/Finally.*
- **Alt Text:** Flowchart showing error handling flow in PowerShell with Try, Catch, Finally blocks and ErrorAction Stop behavior
- **White Background Generation Prompt:**

```text
Error handling flowchart, crisp white background (#FFFFFF). Top block: 'Try Block': Executes operational code (e.g. Restart-Service). Crucial flag callout: '-ErrorAction Stop' (converts standard non-terminating warning into a terminating exception, allowing Catch to intercept). Branching condition: 'Did an exception occur?': If NO -> Skips Catch block, proceeds directly to Finally. If YES -> Control transfers immediately into 'Catch [System.Exception] Block': Logs error details to telemetry ($_ contains current error record, $.Exception.Message, $.InvocationInfo.Line). Both paths terminate in 'Finally Block' (always executes, cleaning up open file handles, database connections, or remote PSSessions). Green, red, and blue blocks with dark text, sharp borders.
```

### Lesson 6.4

#### C03-M06-F3: ShouldProcess Flow in a Script: Implementing -WhatIf & -Confirm Safety Nets
- **Asset Slug:** `/assets/courses/cyber-03/C03-M06-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M06-F3.txt`
- **Caption:** *Figure C03-M06-F3: Validation and read-only gathering happen first; destructive changes run only if ShouldProcess approves, supporting -WhatIf dry-runs.*
- **Alt Text:** Flowchart showing ShouldProcess validation and decision flow supporting -WhatIf and -Confirm parameters in advanced functions
- **White Background Generation Prompt:**

```text
Decision workflow diagram, solid white background (#FFFFFF). Phase 1: 'Validation & Information Gathering': Script parses parameters, validates target existence, and gathers current state in read-only mode. Phase 2: 'ShouldProcess Evaluation': Script encounters '$PSCmdlet.ShouldProcess($Target, "Stop Service")'. Two paths: Path A (User passed '-WhatIf'): Function outputs 'What if: Performing the operation "Stop Service" on target "Spooler"' and SKIPS destructive execution. Path B (Normal execution or user passed '-Confirm'): Checks confirmation threshold; if approved, executes the destructive command. If rejected, skips operation. Highlighted pitfall: 'Gathering state inside an unchecked loop causes unintended side effects during -WhatIf'. Clean flowchart, green checkmarks, amber warning shields, dark text.
```

#### C03-M06-D51: Advanced Function Architecture: [CmdletBinding()] & Parameter Validation Attributes
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l04_advanced_functions_validation.png`
- **Caption:** *Figure C03-M06-D51: Anatomy of an advanced PowerShell function: [CmdletBinding()], param() block validation ([ValidateNotNullOrEmpty()], [ValidateSet()]), and begin/process/end blocks.*
- **Alt Text:** Diagram illustrating advanced PowerShell function structure with parameter validation attributes and pipeline processing blocks
- **White Background Generation Prompt:**

```text
Structural code architecture diagram, pure white background (#FFFFFF). Large rectangular function container 'function Set-RkSecurityBaseline': 1. '[CmdletBinding(SupportsShouldProcess)]': Endows function with standard cmdlet behaviors (-Verbose, -Debug, -WhatIf, -Confirm). 2. 'param() Block': Shows decorated parameters: '[Parameter(Mandatory, ValueFromPipeline)] [string]$ComputerName', '[ValidateSet("Low", "Medium", "High")] [string]$Level', '[ValidateNotNullOrEmpty()] [string[]]$Services'. 3. 'Pipeline Processing Blocks': 'begin {}' (initializes resources once), 'process {}' (executes once per pipeline input object), 'end {}' (finalizes reports and cleans up). Clean dark card layout, monospace code labels, amber accent borders.
```

### Lesson 6.5

#### C03-M06-D52: PowerShell Execution Policies vs. True Security Boundaries: The Bypass Reality
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l05_execution_policies_reality.png`
- **Caption:** *Figure C03-M06-D52: Demystifying Execution Policies (Restricted, RemoteSigned, AllSigned): why execution policy is a user safety net, not a security boundary.*
- **Alt Text:** Infographic contrasting PowerShell execution policies with true security boundaries, illustrating execution policy bypass techniques
- **White Background Generation Prompt:**

```text
Security clarification infographic, stark white background (#FFFFFF). Left panel: 'Execution Policy Modes (User Safety Net)': Restricted (no scripts execute), RemoteSigned (local scripts run, downloaded scripts require trusted digital signature), AllSigned (all scripts require trusted code-signing certificate), Bypass (nothing is blocked). Center: 'Crucial Security Reality': Execution Policy is designed to prevent accidental script execution by administrators—it is NOT a security boundary! Right panel: 'Adversarial Bypass Vectors': Attackers bypass policy trivially: 'powershell -ExecutionPolicy Bypass -File script.ps1', 'powershell -Command "[script content]"', or 'Get-Content script.ps1 | powershell -'. Bottom panel shows True Security Boundaries: AppLocker / WDAC application control and Constrained Language Mode (CLM). Dark slate text, amber warnings.
```

#### C03-M06-D53: Constrained Language Mode (CLM) & Application Whitelisting (WDAC/AppLocker)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l05_clm_applocker_wdac.png`
- **Caption:** *Figure C03-M06-D53: Hardening PowerShell with Constrained Language Mode (CLM) coupled with AppLocker or Windows Defender Application Control (WDAC).*
- **Alt Text:** Diagram showing how AppLocker and WDAC enforce Constrained Language Mode to block arbitrary .NET method calls and COM objects
- **White Background Generation Prompt:**

```text
Security architecture diagram, bright white background (#FFFFFF). Left: Windows Defender Application Control (WDAC) / AppLocker policy active on host. When an unapproved script or user attempts to launch PowerShell, the engine automatically enters 'Constrained Language Mode (CLM)' ($ExecutionContext.SessionState.LanguageMode). Right: Restrictions enforced under CLM: 1. Direct .NET type manipulation BLOCKED (cannot call [System.Reflection.Assembly]::Load() to inject memory beacons). 2. COM objects BLOCKED (cannot instantiate WScript.Shell). 3. Add-Type compilation BLOCKED (cannot compile inline C#). Approved, signed administrative scripts run in FullLanguage mode. Clear security shields, red blocked action icons, dark typography.
```

### Lesson 6.6

#### C03-M06-F2: Layers of PowerShell Security: Delegation, App Control, Safety Nets, AMSI & Logging
- **Asset Slug:** `/assets/courses/cyber-03/C03-M06-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M06-F2.txt`
- **Caption:** *Figure C03-M06-F2: PowerShell defense-in-depth: delegation (JEA), application control (WDAC), safety nets, AMSI in-memory inspection, and script block logging.*
- **Alt Text:** Layered security diagram showing the defensive rings of PowerShell from JEA to WDAC, AMSI, Script Block Logging, and legacy engine removal
- **White Background Generation Prompt:**

```text
Concentric ring or layered pyramid defense diagram, clean white background (#FFFFFF). Five defense-in-depth rings from outer perimeter to inner core: Layer 1 (Delegation): 'Just Enough Administration (JEA)' restricting cmdlets via non-admin endpoints. Layer 2 (Application Control): 'WDAC / AppLocker' enforcing Constrained Language Mode. Layer 3 (Safety Nets): 'Execution Policy & -WhatIf'. Layer 4 (Content Inspection): 'Antimalware Scan Interface (AMSI)' scanning decrypted script buffers in memory before execution. Layer 5 (Deep Auditing & Telemetry): 'Script Block Logging (Event ID 4104)' and 'Module Logging & Transcription'. Base callout: 'Legacy Engine Removal' (uninstalling PowerShell 2.0 to prevent evasion). Crisp vector icons for each layer, dark slate borders, amber highlight accents.
```

#### C03-M06-D54: PowerShell Telemetry & De-obfuscation: AMSI Buffers, EID 4104 & Base64 Unpacking
- **Asset Slug:** `/assets/courses/cyber-03/c03_m06_l06_amsi_script_block_deobfuscation.png`
- **Caption:** *Figure C03-M06-D54: How Script Block Logging (Event ID 4104) and AMSI defeat obfuscation by capturing the final de-obfuscated code block directly at execution time.*
- **Alt Text:** Diagram showing an obfuscated PowerShell payload being unrolled and captured in Event ID 4104 logs and inspected by AMSI
- **White Background Generation Prompt:**

```text
Threat detection workflow diagram, solid white background (#FFFFFF). Top: Adversary executes heavily obfuscated PowerShell command: 'powershell -enc JABzACAAPQAgAE4AZQB3AC0ATwBiAGoAZQBjAHQA...' utilizing Base64 encoding, tick marks (`e`x`e`c), environment variable concatenation, and XOR masking. Center: PowerShell Engine parser unrolls and compiles the tokens in memory. Hook 1: 'AMSI (AmsiScanBuffer)' receives the final, fully decoded plain text script buffer in memory and queries the installed EDR/AV before execution. Hook 2: 'Script Block Logging (Event ID 4104)' writes the exact cleartext code block into the Microsoft-Windows-PowerShell/Operational event log, completely neutralizing obfuscation! Red threat icon, green detection checkmarks, high-contrast text.
```


## Module 7: Enterprise Administration & Active Directory

### Lesson 7.1

#### C03-M07-F1: Windows Event Log Pipeline: Providers, Channels, EVTX Architecture & Forwarding
- **Asset Slug:** `/assets/courses/cyber-03/C03-M07-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M07-F1.txt`
- **Caption:** *Figure C03-M07-F1: Windows components write to event channels governed by audit policy; events are forwarded to a central collector for retention and analysis.*
- **Alt Text:** Pipeline diagram of Windows Event Logging: event providers publishing to channels, stored in EVTX files, and forwarded via WEF to central SIEM
- **White Background Generation Prompt:**

```text
Enterprise telemetry dataflow diagram, pristine white background (#FFFFFF). Left: 'Event Providers': Kernel, Security Subsystem (LSA), Service Control Manager, PowerShell, User Applications. Governed by: 'Advanced Security Audit Policy'. Center: 'Windows Event Log Channels & EVTX Storage': Stored on disk in 'C:\Windows\System32\winevt\Logs\': 'Security.evtx', 'System.evtx', 'Application.evtx', and Analytic/Debug Operational logs. Each event formatted with structured XML schema (EventID, TimeCreated, Computer, Security UserID, EventData fields). Right: 'Windows Event Forwarding (WEF)' transmitting events over Kerberos/TLS-encrypted WinRM to a 'Central Collector' and enterprise 'SIEM / Data Lake'. Dark containers, blue and amber pipeline arrows, sharp typography.
```

#### C03-M07-D55: Windows Event XML Schema Breakdown: System Header & EventData Payload
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l01_event_xml_schema_breakdown.png`
- **Caption:** *Figure C03-M07-D55: Structural breakdown of Windows Event Log XML: standard <System> header metadata and specialized <EventData> parameter payload.*
- **Alt Text:** Diagram dissecting Windows Event XML structure: Provider, EventID, TimeCreated, Security, and EventData payload fields
- **White Background Generation Prompt:**

```text
Technical schema breakdown diagram, pure white background (#FFFFFF). Two segmented code blocks showing structured XML event anatomy: Top block: '<System> Header (Universal Schema)': Contains Provider Name, EventID (e.g. 4624), Version, Level, Task, Opcode, Keywords, TimeCreated (SystemTime ISO-8601), EventRecordID, Correlation ActivityID, Execution ProcessID/ThreadID, Channel (Security), and Computer FQDN. Bottom block: '<EventData> Payload (Event-Specific Schema)': Dissecting Logon Event 4624 showing Data fields: TargetUserName ('cadence'), TargetDomainName ('REDKROSS'), LogonType ('2' = Interactive Console), AuthenticationPackageName ('Negotiate'), and IpAddress ('127.0.0.1'). Clean brackets, high-contrast monospace text, amber and slate borders.
```

### Lesson 7.2

#### C03-M07-D56: High-Fidelity Security Event IDs: Logon Types & Lateral Movement Indicators
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l02_security_event_ids_matrix.png`
- **Caption:** *Figure C03-M07-D56: High-fidelity Windows Security event catalog: Logon Types (2 Interactive, 3 Network, 10 RDP), Account Changes (4720), and Log Cleared (1102).*
- **Alt Text:** Reference matrix of critical Windows Security Event IDs: 4624, 4625, 4672, 4688, 4720, 7045, and 1102 with incident triage contexts
- **White Background Generation Prompt:**

```text
Security reference matrix, stark white background (#FFFFFF). Tabular grid of high-fidelity audit event IDs categorized into 4 operational domains: 1. 'Authentication & Logon': Event 4624 (Successful Logon with LogonType: 2=Interactive, 3=Network SMB, 10=Remote Desktop), Event 4625 (Logon Failure / Brute-force), Event 4672 (Special Privileges Assigned / Admin Logon). 2. 'Process Tracking': Event 4688 (New Process Created; highlights command-line auditing requirement). 3. 'Persistence & Services': Event 7045 (New Service Installed in System log), Event 4697 (Service Installed in Security log). 4. 'Defense Evasion': Event 1102 (The audit log was cleared - critical alert!), Event 4720 (User account created). Clear icon badges, high-contrast dark text, amber highlights.
```

#### C03-M07-D57: Process Creation Auditing: Event 4688 with Full Command Line Telemetry
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l02_process_creation_event_4688.png`
- **Caption:** *Figure C03-M07-D57: Enabling command line auditing in Event 4688: capturing parent process ancestry, creator subject, and full argument strings for threat triage.*
- **Alt Text:** Diagram illustrating Event 4688 process creation auditing with and without command-line process auditing enabled
- **White Background Generation Prompt:**

```text
Threat detection diagram, bright white background (#FFFFFF). Left panel: 'Default Incomplete Event 4688': Captures only Process Name ('powershell.exe'). Lacks arguments; analyst cannot determine if activity is administrative or malicious. Center: 'Enabling Policy': Group Policy 'Include command line in process creation events' enabled. Right panel: 'Full High-Fidelity Event 4688': Captures full execution telemetry: Subject User ('REDKROSS\jsmith'), Creator Process Name ('C:\Windows\System32\cmd.exe'), Process ID, New Process Name ('powershell.exe'), and full 'CommandLine' parameter string: 'powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ...'. Callout shows how SOC analysts trace the malicious parent-child execution chain. Dark slate boxes, green audit shield, high contrast.
```

### Lesson 7.3

#### C03-M07-D58: Windows Event Forwarding (WEF) Topology: Collector vs. Source-Initiated Subscriptions
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l03_wef_subscriptions_topology.png`
- **Caption:** *Figure C03-M07-D58: Centralized log aggregation with WEF: comparing Collector-Initiated push models with enterprise Source-Initiated (push over WinRM 5985/5986) architecture.*
- **Alt Text:** Architecture diagram comparing collector-initiated versus source-initiated Windows Event Forwarding with WinRM and Kerberos/TLS
- **White Background Generation Prompt:**

```text
Enterprise network topology diagram, clean white background (#FFFFFF). Top panel: 'Collector-Initiated (Pull Model)': Windows Event Collector (WEC) connects outbound to every workstation. Inefficient, firewall-unfriendly for mobile laptops. Bottom panel: 'Source-Initiated (Push Model - Enterprise Standard)': Group Policy configures endpoints with subscription manager ('Server=http://wec.domain.local:5985/wsman/SubscriptionManager/WEC'). Endpoints connect inbound to WEC over HTTP (WinRM port 5985, authenticated via Kerberos) or HTTPS (port 5986 via Mutual TLS). WEC aggregates forwarded events in 'ForwardedEvents.evtx' and pushes to enterprise SIEM (Splunk, Elastic, Sentinel). Clean vector endpoints, firewall icon, dark text, blue and amber lines.
```

#### C03-M07-D59: Centralized SIEM Pipeline: Endpoints, WEF Collector & Real-Time Detection Rules
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l03_siem_forwarding_pipeline.png`
- **Caption:** *Figure C03-M07-D59: End-to-end telemetry pipeline from fleet endpoints through Windows Event Forwarding into an enterprise SIEM cluster with real-time detection rules.*
- **Alt Text:** Dataflow diagram showing thousands of workstations and servers forwarding logs via WEF to SIEM indexers and SOC detection dashboards
- **White Background Generation Prompt:**

```text
End-to-end dataflow pipeline diagram, solid white background (#FFFFFF). Left: 5,000 Enterprise Endpoints (Workstations, Domain Controllers, File Servers) capturing local security logs. Center-Left: Group Policy managing WEF subscriptions. Center: Clustered Windows Event Collectors (WEC) normalizing XML events. Center-Right: Log Shipper / Ingestion Agent (Beats, Logstash, Fluentbit) transmitting data to Right: Enterprise SIEM / Data Lake (Elasticsearch, Splunk, Azure Sentinel). Top Right: SOC Analyst Cockpit showing real-time Sigma / YARA-L detection rules alerting on credential dumping (lsass read), lateral movement (PsExec), and log tampering (1102). High contrast, dark boxes, amber accents.
```

### Lesson 7.4

#### C03-M07-D60: Active Directory Architecture: Forests, Domains, Trees & OU Tiering Models
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l04_ad_forests_domains_ous.png`
- **Caption:** *Figure C03-M07-D60: Hierarchical Active Directory Domain Services (AD DS) structure: Forest root domain, child trees, two-way transitive trusts, and OU tiering architecture.*
- **Alt Text:** Hierarchical diagram of Active Directory forest, domains, tree trust boundaries, and Organizational Unit OU tiering architecture
- **White Background Generation Prompt:**

```text
Active Directory structural hierarchy diagram, pure white background (#FFFFFF). Top: 'Forest Root Domain (corp.redkross.org)' defining the enterprise security boundary and global Schema / Configuration partitions. Branching down via two-way transitive Kerberos trust relationships to Child Domain ('apac.corp.redkross.org'). Inside the domain, an enterprise 'Organizational Unit (OU) Tiering Model' (Enterprise Access Model): Tier 0 (Domain Controllers, PKI, Identity Admins), Tier 1 (Enterprise Member Servers, Database Clusters), Tier 2 (Workstations, Laptops, Standard Endpoints). Note explaining that accounts in higher tiers must never log on to lower-tier systems to prevent credential theft. Triangle domain icons, clean tree lines, dark typography.
```

#### C03-M07-D61: Kerberos Authentication Protocol Flow: AS-REQ/AS-REP, TGS-REQ/TGS-REP & AP-REQ
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l04_kerberos_authentication_flow.png`
- **Caption:** *Figure C03-M07-D61: Detailed 3-phase Kerberos v5 ticket exchange: Authentication Service (TGT request), Ticket-Granting Service (Service Ticket request), and Client Application session.*
- **Alt Text:** Sequence diagram of Kerberos authentication showing AS-REQ, AS-REP with TGT, TGS-REQ, TGS-REP with service ticket, and AP-REQ to file server
- **White Background Generation Prompt:**

```text
Cryptographic sequence diagram, stark white background (#FFFFFF). Three actors: Client Workstation, Key Distribution Center (KDC on Domain Controller: Authentication Service AS & Ticket Granting Service TGS), and Application Server (File Server SMB). Phase 1 (Logon): Client sends AS-REQ (encrypted timestamp); KDC returns AS-REP containing Ticket-Granting Ticket (TGT) encrypted with KDC secret key (krbtgt) and Client/TGS session key. Phase 2 (Request Service Access): Client sends TGS-REQ (presenting TGT + Authenticator); KDC returns TGS-REP containing Service Ticket encrypted with Target Service secret key. Phase 3 (Connect): Client sends AP-REQ to File Server presenting Service Ticket; File Server validates ticket and grants session access. Clean vector keys, ticket icons, numbered steps, dark text.
```

### Lesson 7.5

#### C03-M07-F2: Group Policy Processing Order: The LSDOU Precedence Hierarchy
- **Asset Slug:** `/assets/courses/cyber-03/C03-M07-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M07-F2.txt`
- **Caption:** *Figure C03-M07-F2: Group Policy applies local, site, domain, then OU policies; later settings win unless Enforcement or Block Inheritance applies.*
- **Alt Text:** Hierarchy diagram showing Group Policy processing order LSDOU: Local, Site, Domain, Organizational Unit, Enforced, and Block Inheritance
- **White Background Generation Prompt:**

```text
Hierarchy precedence diagram, crisp white background (#FFFFFF). Four sequential processing stages arranged vertically or as an escalating ladder: 1. 'Local Group Policy' (applied first, lowest precedence). 2. 'Site-level GPOs' (applied second, overrides Local). 3. 'Domain-level GPOs' (applied third, overrides Site). 4. 'Organizational Unit (OU) GPOs' (applied fourth, closest OU wins, highest natural precedence). Right-side callout panels: 'Override Rule 1: Enforced (No Override)': If a higher-level GPO (e.g. Domain Root) is set to 'Enforced', its settings win over all subsequent child OU GPOs! 'Override Rule 2: Block Inheritance': A child OU can block upstream GPOs unless they are Enforced. Clean step hierarchy, dark text, green and red indicator badges.
```

#### C03-M07-D62: Group Policy Architecture: Group Policy Container (AD) & Group Policy Template (SYSVOL)
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l05_gpo_gpc_gpt_sysvol.png`
- **Caption:** *Figure C03-M07-D62: Anatomy of a GPO: Active Directory Group Policy Container (GPC metadata) linked to SYSVOL Group Policy Template (GPT files and scripts).*
- **Alt Text:** Diagram illustrating GPO split architecture between Active Directory GPC object and SYSVOL GPT filesystem folders
- **White Background Generation Prompt:**

```text
Technical split architecture diagram, bright white background (#FFFFFF). Dual components of a single GPO: Left: 'Group Policy Container (GPC)': Stored as an LDAP object in Active Directory ('CN={GUID},CN=Policies,CN=System,DC=corp...'). Contains version number, status flags, and extension GUIDs. Right: 'Group Policy Template (GPT)': Stored as a physical folder on Domain Controller shared filesystem ('\\domain\SYSVOL\domain\Policies\{GUID}\'). Contains 'gpt.ini' (version number matching GPC), 'Machine\' subfolder (Registry.pol, startup scripts), and 'User\' subfolder (logon scripts). Synchronization arrow shows DFSR replicating SYSVOL across all Domain Controllers. Clean file and directory icons, dark slate containers, amber accents.
```

### Lesson 7.6

#### C03-M07-F3: Enterprise Patch Management Lifecycle: Phased Deployment Rings & Verification
- **Asset Slug:** `/assets/courses/cyber-03/C03-M07-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M07-F3.txt`
- **Caption:** *Figure C03-M07-F3: Patch management moves from inventory and prioritization through tested ring deployment to verification and operational metrics.*
- **Alt Text:** Lifecycle flowchart of patch management showing asset inventory, vulnerability scoring, pilot/broad/production ring deployment, and audit verification
- **White Background Generation Prompt:**

```text
Lifecycle workflow diagram, solid white background (#FFFFFF). Continuous 5-stage deployment loop: 1. 'Asset Inventory & Scanning': Discovering all endpoints, OS versions, and missing KBs via WSUS/Intune. 2. 'Prioritization & Risk Scoring': Triaging vendor updates, zero-days, and CISA Known Exploited Vulnerabilities (KEV) catalog. 3. 'Phased Ring Deployment': Staged rollout across Ring 0 (IT & Lab testing, 48 hrs) -> Ring 1 (Pilot Business Users, 5-10%, 5 days) -> Ring 2 (Broad Production Fleet, 100%). 4. 'Verification & Telemetry': Verifying patch installation via Get-HotFix and compliance reporting. 5. 'Rollback Readiness': Documented procedure to uninstall faulty updates (wusa /uninstall /kb:XXXXXXX). Clean circular flow, dark boxes, amber badges, sharp typography.
```

#### C03-M07-D63: Windows Server Update Services (WSUS) & Endpoint Ring Architecture
- **Asset Slug:** `/assets/courses/cyber-03/c03_m07_l06_wsus_deployment_rings.png`
- **Caption:** *Figure C03-M07-D63: WSUS architecture: upstream Microsoft Update synchronization, downstream internal WSUS servers, and GPO client targeting into deployment rings.*
- **Alt Text:** Diagram illustrating WSUS synchronization from Microsoft Update to internal corporate servers, distributing patches to Ring 0, Ring 1, and Ring 2 clients
- **White Background Generation Prompt:**

```text
Network distribution diagram, pure white background (#FFFFFF). Top: 'Microsoft Update Cloud'. Downloading approved cumulative updates to: 'Internal Upstream WSUS Server' located in corporate data center. WSUS server manages approvals based on test gates. Client targeting configured via Group Policy ('Specify intranet Microsoft update service location'): Clients sorted into three deployment rings: Ring 0: IT Canary Test Workstations (receives Day 1 updates). Ring 1: Pilot Department Workstations (receives Day 5 updates). Ring 2: Core Enterprise Production Fleet (receives Day 14 updates). Clean vector server and laptop icons, dark lines, green approved patch badges, high-contrast labels.
```


## Module 8: System Hardening & Auditing

### Lesson 8.1

#### C03-M08-F1: System Hardening Lifecycle: Threat Modeling, Baselines, Staging, Audit & Exceptions
- **Asset Slug:** `/assets/courses/cyber-03/C03-M08-F1.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M08-F1.txt`
- **Caption:** *Figure C03-M08-F1: Baselines are selected, reviewed, tested, deployed, audited, and corrected in a continuous loop with documented exceptions.*
- **Alt Text:** Cyclical diagram of the hardening lifecycle from baseline selection to test staging, production deployment, auditing, and exception logging
- **White Background Generation Prompt:**

```text
Continuous lifecycle diagram, clean white background (#FFFFFF). Circular 6-stage systems engineering loop: 1. 'SELECT BASELINE': Choose consensus standards (CIS Benchmark Level 1/2, DISA STIG, Microsoft Security Baselines). 2. 'REVIEW & TAILOR': Adapt baseline to organizational constraints; identify necessary exemptions. 3. 'TEST & STAGE': Deploy to non-production staging lab; test application compatibility and monitor error logs. 4. 'DEPLOY IN RINGS': Roll out via GPO / Ansible across staged canary deployment rings. 5. 'AUDIT & SCORE': Run automated compliance audits (Lynis, OpenSCAP, Nessus); calculate hardening index. 6. 'CORRECT & DOCUMENT EXCEPTIONS': Remediate configuration drift and formally document business exceptions with compensating controls. Crisp circular arrows, dark slate nodes, amber badges.
```

#### C03-M08-D64: Consensus Security Baselines: CIS Benchmark Levels 1 & 2 vs. DISA STIGs
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l01_cis_benchmarks_disa_stigs.png`
- **Caption:** *Figure C03-M08-D64: Comparison of industry consensus baselines: CIS Benchmark Level 1 (essential defense), Level 2 (defense-in-depth), and military-grade DISA STIGs.*
- **Alt Text:** Comparison chart detailing CIS Benchmark Level 1, CIS Benchmark Level 2, and DISA STIG hardening profiles
- **White Background Generation Prompt:**

```text
Comparison matrix chart, stark white background (#FFFFFF). Three progressive hardening tiers: 1. 'CIS Benchmark Level 1 (Practical Enterprise Baseline)': Essential security controls; minimal performance overhead; zero disruption to standard business applications (e.g. disable guest account, enforce password complexity, enable firewall). 2. 'CIS Benchmark Level 2 (Defense-in-Depth / High Security)': Stricter hardening for high-value servers handling regulated data; may restrict legacy software functionality (e.g. restrict debug rights, enforce strict TLS cipher suites, disable LLMNR/NetBIOS). 3. 'DISA STIG (Military / National Security)': Department of Defense Security Technical Implementation Guides; extreme lockdown, FIPS-validated cryptography, rigorous auditing. High-contrast cards, green, amber, and red shield badges, dark typography.
```

### Lesson 8.2

#### C03-M08-D65: Safe Baseline Deployment Architecture: Snapshots, Phased Rollouts & Rollback Playbooks
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l02_safe_deployment_rollback.png`
- **Caption:** *Figure C03-M08-D65: Safe rollout protocol: pre-change VM snapshots, canary deployment stages, automated health checks, and instant rollback procedures.*
- **Alt Text:** Flowchart showing pre-change snapshot creation, canary testing, automated health monitoring, and rollback execution if services fail
- **White Background Generation Prompt:**

```text
Deployment safeguard workflow diagram, bright white background (#FFFFFF). Step 1: 'Pre-Flight Preparation': Take hypervisor snapshot / volume shadow copy / configuration backup (exporting GPO / backup /etc). Step 2: 'Canary Deployment': Apply hardened baseline to 5% test canary pool. Step 3: 'Automated Telemetry Health Check': Monitor error logs, service uptime, and user ticket queues for 72 hours. Decision Diamond: 'Did critical services fail or crash?': If YES -> 'EXECUTE IMMEDIATE ROLLBACK': Revert hypervisor snapshot or apply rollback GPO; restore service continuity in minutes. If NO -> 'EXPAND TO BROAD FLEET': Promote baseline to 100% production fleet. Clear decision branches, green checkmarks, red rollback path, dark slate containers.
```

#### C03-M08-D66: The Blast Radius Containment Model: Mitigating Configuration Catastrophes
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l02_blast_radius_containment.png`
- **Caption:** *Figure C03-M08-D66: Blast radius containment: avoiding simultaneous global pushes to prevent enterprise-wide outages (CrowdStrike 2024 failure mode).*
- **Alt Text:** Diagram contrasting dangerous global simultaneous push with safe staged canary deployment rings containing blast radius
- **White Background Generation Prompt:**

```text
Comparative architectural infographic, solid white background (#FFFFFF). Top panel: 'Failure Mode: Global Simultaneous Push (The CrowdStrike 2024 Disaster)': Single unvalidated driver/config update pushed to 100% of 8.5 million systems worldwide at once. Bug in update triggers blue screen kernel panic (BSOD); total catastrophic global outage. Red explosion hazard icon. Bottom panel: 'Defensive Engineering: Blast Radius Containment': Staged rollout separated by time gates. Canary ring (1%) catches fault immediately; deployment aborts automatically; 99% of enterprise fleet remains fully operational and protected. Clean vector diagrams, red warning banner, green security shields, dark text.
```

### Lesson 8.3

#### C03-M08-F3: SSH Settings Before & After Hardening: Lab Evidence & Verified Directives
- **Asset Slug:** `/assets/courses/cyber-03/C03-M08-F3.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M08-F3.txt`
- **Caption:** *Figure C03-M08-F3: Effective SSH settings (sshd -T) before and after hardening in the course lab: disabling passwords, banning root, and enforcing ed25519 keys.*
- **Alt Text:** Comparison table of sshd settings before and after hardening showing PermitRootLogin, PasswordAuthentication, and KexAlgorithms
- **White Background Generation Prompt:**

```text
Before-and-after comparison table, pure white background (#FFFFFF). Two contrasting columns comparing OpenSSH server configuration: Left Column: 'Default / Unhardened (Before)': PermitRootLogin yes, PasswordAuthentication yes (vulnerable to internet brute-forcing), MaxAuthTries 6, X11Forwarding yes, legacy ciphers enabled. Right Column: 'Hardened Production Baseline (After)': PermitRootLogin no, PasswordAuthentication no (strict public key authentication only), KbdInteractiveAuthentication no, MaxAuthTries 3, X11Forwarding no, PubkeyAcceptedAlgorithms ssh-ed25519, ClientAliveInterval 300, ClientAliveCountMax 0. Verification callout showing command 'sshd -T' confirming active configuration. High-contrast red and green indicator badges, dark text, sharp borders.
```

#### C03-M08-D67: Linux Kernel Sysctl Hardening: Network Stack & Memory Attack Surface Reduction
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l03_sysctl_kernel_hardening.png`
- **Caption:** *Figure C03-M08-D67: Hardening the Linux kernel attack surface via /etc/sysctl.d/: disabling IP forwarding, enabling reverse path filtering, and restricting dmesg/ptrace.*
- **Alt Text:** Reference diagram detailing defensive kernel sysctl parameters: ip_forward, rp_filter, kptr_restrict, and yama ptrace_scope
- **White Background Generation Prompt:**

```text
Technical parameter reference chart, crisp white background (#FFFFFF). Four key defensive sysctl parameter categories: 1. 'Network Spoofing & Redirection Defense': 'net.ipv4.ip_forward = 0' (prevents host routing traffic), 'net.ipv4.conf.all.rp_filter = 1' (reverse path filtering drops spoofed packets), 'net.ipv4.conf.all.accept_redirects = 0' (blocks ICMP redirect route manipulation). 2. 'Kernel Pointer Leak Prevention': 'kernel.kptr_restrict = 2' (hides kernel memory pointers from unprivileged users in /proc/kallsyms). 3. 'Kernel Ring Buffer Defense': 'kernel.dmesg_restrict = 1' (prevents unprivileged users reading kernel dmesg logs). 4. 'Process Memory Snooping Defense': 'kernel.yama.ptrace_scope = 2' (blocks ptrace memory injection across processes). Clean dark cards, code styling, amber badges.
```

### Lesson 8.4

#### C03-M08-D68: Windows Attack Surface Reduction (ASR) Rules: Office, Scripting & LSASS Protection
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l04_windows_asr_rules.png`
- **Caption:** *Figure C03-M08-D68: Windows Defender Attack Surface Reduction (ASR) rules: blocking Office child processes, credential stealing from LSASS, and malicious scripts.*
- **Alt Text:** Diagram illustrating Attack Surface Reduction ASR rules blocking child process creation from Office and credential stealing from lsass.exe
- **White Background Generation Prompt:**

```text
Threat defense diagram, bright white background (#FFFFFF). Left: Common attack vectors blocked by ASR: 1. Malicious Word doc spawning cmd.exe/powershell.exe. 2. Ransomware executable using WMI to delete shadow copies. 3. Malware injecting into lsass.exe to dump passwords. Center: 'Windows Defender ASR Filter': Evaluates rules by GUID: 'Block Office applications from creating child processes (D4F940AB-...)', 'Block credential stealing from Windows Local Security Authority subsystem (9e6c4e1f-...)', 'Block executable content from email client (BE9BA2D9-...)'. Modes shown: Audit Mode (logs event 1121 without blocking) vs. Block Mode (blocks execution and logs event 1122). Right: Blocked attack indicators with red stop shields. Clean dark styling, high contrast.
```

#### C03-M08-D69: Virtualization-Based Security (VBS) & Credential Guard: Isolating LSASS in Virtual Trust Level 1
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l04_vbs_credential_guard.png`
- **Caption:** *Figure C03-M08-D69: Hyper-V Virtualization-Based Security (VBS): moving credential secrets into isolated Virtual Trust Level 1 (VTL 1) beyond kernel Ring 0 reach.*
- **Alt Text:** Architectural diagram of Virtualization-Based Security VBS separating Normal World VTL 0 from Secure World VTL 1 with Credential Guard
- **White Background Generation Prompt:**

```text
Hardware virtualization architecture diagram, solid white background (#FFFFFF). Base layer: 'Hardware (CPU with SLAT, TPM 2.0, VT-x/AMD-V)'. Hypervisor layer: 'Hyper-V Hypervisor' partitioning system into two isolated virtual trust levels: Left side: 'Virtual Trust Level 0 (Normal World)': Ring 3 contains normal User Apps; Ring 0 contains Windows Kernel (ntoskrnl.exe) and standard 'lsass.exe'. Right side: 'Virtual Trust Level 1 (Secure World)': Runs isolated microkernel and 'Isolated LSA (LsaIso.exe)'. Credential hashes and Kerberos keys are stored exclusively in VTL 1. Even if an attacker gains root/kernel-mode Ring 0 code execution in VTL 0, they CANNOT read memory inside VTL 1! Red barrier line, gold security vault icon, dark text.
```

### Lesson 8.5

#### C03-M08-F2: Layers of Host Defense: Identity, Configuration, Firewall, EDR & Telemetry
- **Asset Slug:** `/assets/courses/cyber-03/C03-M08-F2.png`
- **Source Figure Reference:** `FIGURES/C03/C03-M08-F2.txt`
- **Caption:** *Figure C03-M08-F2: Host defense-in-depth: identity governance, hardened configurations, stateful host firewalls, endpoint protection, and continuous monitoring.*
- **Alt Text:** Layered security diagram illustrating defense-in-depth host protection from identity to configuration, firewall, EDR, and continuous monitoring
- **White Background Generation Prompt:**

```text
Defense-in-depth layered diagram, pure white background (#FFFFFF). Five concentric defensive shield layers protecting the host asset at the core: Layer 1 (Identity & Access): Least privilege accounts, MFA, unique local passwords (LAPS), disabled unused accounts. Layer 2 (System Configuration): Hardened baselines (CIS Level 1), removed unnecessary services, secure kernel parameters. Layer 3 (Host Firewall): Default-deny stateful firewall (nftables / Windows Defender Firewall) restricting inbound connections. Layer 4 (Endpoint Detection & Response): Behavioral telemetry, AMSI, exploit guards. Layer 5 (Continuous Monitoring): Centralized audit logging, integrity monitoring (AIDE / Tripwire), scheduled audit scoring. Crisp vector shields, dark slate borders, amber and blue accents, high-contrast text.
```

#### C03-M08-D70: Host Firewall Architecture: Linux nftables/iptables vs. Windows Defender Firewall with Advanced Security
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l05_host_firewalls_nftables_defender.png`
- **Caption:** *Figure C03-M08-D70: Architectural comparison of host-based firewalls: Linux nftables netfilter hooks (input, forward, output) and Windows Defender Firewall network profiles (Domain, Private, Public).*
- **Alt Text:** Diagram comparing Linux nftables netfilter hooks with Windows Defender Firewall network location profiles and stateful rule processing
- **White Background Generation Prompt:**

```text
Comparison architecture diagram, clean white background (#FFFFFF). Left panel: 'Linux nftables / Netfilter Architecture': Network packet hooks in kernel space: 'prerouting', 'input' (local host packets), 'forward' (routed packets), 'output' (locally generated packets), and 'postrouting'. Default policy enforced: 'type filter hook input priority 0; policy drop;' (default deny). Right panel: 'Windows Defender Firewall with Advanced Security': Network location profiles: Domain Profile, Private Profile, Public Profile (strictest). Stateful packet inspection checking inbound rules, outbound rules, and connection security rules (IPsec). Clean vector firewall icons, packet flow arrows, dark slate containers, amber accents.
```

### Lesson 8.6

#### C03-M08-D71: Automated Security Auditing with Lynis: Architecture, Compliance Tests & Hardening Index
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l06_lynis_auditing_architecture.png`
- **Caption:** *Figure C03-M08-D71: Automated Linux security auditing architecture: Lynis test execution engine, modular test plugins, hardening index calculation, and report generation.*
- **Alt Text:** Workflow diagram of Lynis security scanner executing automated compliance tests, outputting suggestions, and computing the hardening index
- **White Background Generation Prompt:**

```text
Auditing workflow diagram, crisp white background (#FFFFFF). Central engine: 'Lynis Security Audit Engine' running in modular test categories: Boot & Services, Kernel Hardening, Memory Protections, Users & Groups, SSH Configuration, Logging, File Permissions, Network Interfaces, Cryptography. Output streams: 1. Detailed log file: '/var/log/lynis.log'. 2. Machine-readable report: '/var/log/lynis-report.dat'. 3. Terminal Executive Summary displaying 'Hardening Index' (e.g. 59 before -> 82 after), Tests Performed count, Warning count (high risk), and Suggestions list (actionable hardening steps). Clean speedometer/gauge icon, dark typography, green and amber badges.
```

#### C03-M08-D72: Enterprise Hardening Capstone: The 15-Item Comprehensive Host Audit Rubric
- **Asset Slug:** `/assets/courses/cyber-03/c03_m08_l06_capstone_audit_rubric.png`
- **Caption:** *Figure C03-M08-D72: The 15-point executive host audit rubric spanning identity, services, file integrity, logging, network attack surface, and rollback readiness.*
- **Alt Text:** Audit checklist matrix diagram showing the 15-point host hardening rubric across Linux and Windows systems
- **White Background Generation Prompt:**

```text
Executive audit checklist rubric, pure white background (#FFFFFF). Grid of 15 structured audit checklist cards grouped into 5 domains: Domain 1 (Identity & Access): 1. Standard user daily accounts. 2. Root/Administrator remote login disabled. 3. Password policy & LAPS. Domain 2 (Service Hardening): 4. Unnecessary services disabled. 5. Least-privilege service accounts. 6. Sudo/UAC restrictions. Domain 3 (Filesystem & Storage): 7. Restrictive umask & DACLs. 8. SUID/SGID review. 9. Full disk encryption (BitLocker/LUKS). Domain 4 (Network & Firewall): 10. Default-deny host firewall. 11. SSH key-only auth. 12. Unused network protocols disabled. Domain 5 (Telemetry & Operations): 13. High-fidelity logging enabled. 14. Automated security updates. 15. Verified rollback and snapshot playbooks. High-contrast checklist design, green tick badges, dark slate containers.
```

