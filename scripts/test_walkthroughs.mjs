import fs from 'fs';
import path from 'path';

const module1Path = path.resolve('src/services/db/course03/modules/module1.js');
let content = fs.readFileSync(module1Path, 'utf8');

// Define the 12 walkthrough blocks
const walkthroughs = {
  // Lesson 1.1 - Fig 1 (C03-M01-D01)
  d01: `

#### Visual Walkthrough & Architectural Breakdown

- **Hierarchical Tier Stack:** The operating system operates as a tiered hardware abstraction layer dividing user execution from physical silicon. At the highest level, unprivileged user-space applications (such as web browsers, shells, and database servers) execute in a restricted processor context without direct access to hardware bus lines or physical RAM addresses.
- **The System Call Boundary:** Applications interact with underlying system resources exclusively through the System Call Boundary. This hardware-enforced transition gate intercepts application requests, validates arguments, switches CPU execution modes, and safely routes execution to privileged kernel routines.
- **Kernel Core Subsystems:** Inside the privileged kernel boundary, specialized subsystems manage discrete resource domains: the Process Scheduler controls CPU execution time slices; the Virtual Memory Manager provisions isolated address spaces and coordinates paging; Filesystem Drivers translate abstract path operations into structured storage reads and writes; and the Network Stack encapsulates packet streams across socket interfaces.
- **Hardware Abstraction Layer (HAL) & Drivers:** Operating system device drivers communicate with physical hardware through the Hardware Abstraction Layer (HAL) and standardized driver interfaces. The HAL hides chipset-specific motherboard differences (such as APIC routing, PCIe bridge topologies, and DMA controllers), enabling uniform kernel subsystem operation across diverse vendor architectures.
- **Physical Hardware Foundation:** At the base of the stack, bare-metal physical resources—including multi-core CPUs, volatile RAM, NVMe storage controllers, Network Interface Cards (NICs), and hardware Trusted Platform Modules (TPM 2.0)—execute machine instructions and store encrypted runtime state under strict kernel arbitration.
- **Defensive Engineering Implication:** Enforcing strict hardware abstraction prevents compromised user-space applications (such as a memory-corrupted browser process) from directly manipulating peripheral registers or reading raw physical memory, confining potential compromise to the faulting process boundary unless a secondary kernel-mode vulnerability exists.`,

  // Lesson 1.1 - Fig 2 (C03-M01-D02)
  d02: `

#### Visual Walkthrough & Architectural Breakdown

- **Centralized Kernel Resource Arbitration:** The central kernel resource manager operates as an authoritative gatekeeper that allocates, schedules, arbitrates, and controls physical computing hardware, preventing competing processes from starving shared system resources or causing deadlock.
- **CPU Time-Slice Round-Robin Scheduling:** At the top of the architecture, the Process Scheduler assigns CPU access to runnable processes organized in a Run Queue (Ready Queue). Each process (e.g., PID 101, PID 102, PID 103) is granted an isolated execution time slice (typically 10 ms). When the timer interrupt fires, the CPU preempts the active task, preserves its execution context, and rotates to the next process in queue order.
- **Memory Allocation & Page Frame Management:** On the right, the Page Frame Arbiter tracks physical memory chunks using Page Frame Numbers (PFNs), distinguishing active allocations from free frames. A Page Allocation Table dynamically maps process-specific Virtual Pages (e.g., \`VP 0x0000\`, \`VP 0x1000\`) to allocated physical RAM frames (PFN 0, PFN 2), deferring physical memory allocation through demand paging until pages are actively accessed.
- **Block I/O & Storage Controller Scheduling:** At the bottom, the block storage subsystem manages read, write, and flush requests dispatched to NVMe, SSD, or HDD devices. The elevator/SCAN algorithm orders logical block addresses (LBAs) sequentially (e.g., LBA 1080 to 1320), minimizing disk head latency and maximizing storage bus throughput before signaling I/O completion via hardware interrupts.
- **Network Socket Buffer & Interrupt Handling:** On the left, incoming and outgoing network traffic traverses dedicated Ingress (Rx) and Egress (Tx) queues. The Network Interface Controller (NIC) asserts an interrupt request (IRQ) upon packet arrival, invoking the kernel interrupt handler to buffer packets into memory and schedule network socket processing.
- **Defensive Engineering Implication:** Uncontrolled process resource consumption can cause denial of service. The kernel's arbitration mechanisms enforce quotas, scheduling priorities, and buffer limits, ensuring that non-privileged user processes cannot exhaust network buffers, monopolize disk queues, or starve security telemetry daemons of CPU time slices.`,

  // Lesson 1.2 - Fig 1 (C03-M01-F1)
  f1: `

#### Visual Walkthrough & Architectural Breakdown

- **Hardware Privilege Ring Separation:** Modern x86-64 microprocessors enforce hardware execution boundaries through privilege rings. User Space operates in Ring 3 (restricted privilege), preventing user-mode processes—including web browsers, interactive shells, web servers, and EDR agent user interfaces—from executing privileged CPU instructions or directly accessing physical memory.
- **API Wrapper & Redirection Layer:** User applications rarely invoke hardware instructions directly; instead, they call high-level programming interfaces provided by standard system libraries (such as \`libc\` on Linux or \`kernel32.dll\` / \`ntdll.dll\` on Windows). These libraries assemble function parameters into designated CPU registers before triggering the mode transition.
- **System Call Boundary (Controlled Entry Gate):** The transition between unprivileged user code and privileged kernel execution is governed strictly by the System Call Boundary. This gate ensures that control transfer into supervisor mode can only occur at registered, immutable kernel entry points, preventing arbitrary jumps into kernel memory.
- **Kernel Space (Ring 0) Supervisor Subsystems:** Once execution enters Ring 0, the CPU grants unrestricted hardware access. Here, core operating system subsystems—including the Task Scheduler, Memory Manager, File System drivers, Network Stack, Security Reference Monitor (SRM), and dynamic device drivers/kernel modules—operate with full supervisor authority.
- **Hardware Foundation:** At the lowest layer, physical resources (CPU, RAM, NVMe/SSD, NIC, and TPM 2.0) are manipulated directly by Ring 0 instructions, shielded from direct user-space interaction.
- **Defensive Engineering Implication:** The Ring 3 / Ring 0 boundary establishes the primary fault and security isolation perimeter of an operating system. A crash or malicious memory corruption in a Ring 3 application generates an exception that terminates only the offending process; conversely, a flaw or unauthorized code execution in Ring 0 (such as a vulnerable kernel driver) compromises the integrity of the entire operating system.`,

  // Lesson 1.2 - Fig 2 (C03-M01-D03)
  d03: `

#### Visual Walkthrough & Architectural Breakdown

- **Stage 1 — Register Argument Loading (Ring 3):** The transition begins in user space where the application or standard library prepares the system call. The unique system call number is placed in the \`RAX\` register (e.g., syscall 257 for \`SYS_openat\`), while function arguments are placed into standardized parameter registers: \`RDI\` carries the directory file descriptor (\`dirfd\`), \`RSI\` carries the pointer to the target pathname string, and \`RDX\` carries access flags.
- **Stage 2 — Hardware Trap Gate & Mode Switch:** The processor executes the specialized \`syscall\` instruction (or \`sysenter\` on legacy architectures). The CPU hardware automatically switches its internal privilege state from Ring 3 to Ring 0, saves the return instruction pointer (\`RIP\`) into \`RCX\`, saves user processor flags into \`R11\`, switches the stack pointer from the user stack to the privileged kernel stack (\`RSP <- KSP\`), and transfers execution to the kernel entry handler (\`entry_SYSCALL_64\`).
- **Stage 3 — Kernel System Call Table Dispatch:** In Ring 0, the kernel's system call entry handler inspects the value stored in \`RAX\`. It performs bounds checking against the maximum syscall count and indexes the System Call Table (\`sys_call_table\`) to resolve the target kernel function pointer (e.g., index 257 resolves to \`sys_openat()\`, index 0 to \`sys_read()\`, and index 1 to \`sys_write()\`).
- **Stage 4 — Privileged Operation Execution:** The kernel executes the resolved routine (\`sys_openat()\`). It rigorously validates user-space memory pointers to ensure they reside within the calling process's readable address space, performs discretionary and mandatory access control checks, traverses the filesystem hierarchy, and generates a return status code (such as a non-negative file descriptor or a negative error code).
- **Stage 5 — Return to User Space via \`sysret\`:** Upon completion, the kernel writes the return value into \`RAX\`, executes the \`sysret\` instruction, restores the user stack pointer (\`RSP\`), drops processor privilege back to Ring 3, and resumes user-space execution at the instruction immediately following the original \`syscall\`.
- **Defensive Engineering Implication:** Because all interactions with files, memory, network sockets, and processes must traverse this 5-stage register pipeline, security monitoring mechanisms (such as Linux \`auditd\`, eBPF probes, and Windows ETW threat intelligence) attach telemetry sensors directly to this transition point to detect unauthorized access attempts and parameter tampering before kernel execution occurs.`,

  // Lesson 1.3 - Fig 1 (C03-M01-D04)
  d04: `

#### Visual Walkthrough & Architectural Breakdown

- **State 1 — NEW (Instantiation):** The process lifecycle begins when a program on disk is instantiated into memory via system calls (such as \`fork()\` / \`execve()\` on Linux or \`CreateProcess()\` on Windows). The OS allocates an initial Process Control Block (PCB or \`task_struct\`), assigns a unique Process Identifier (PID), and provisions initial address space structures before moving the process to the **READY** state.
- **State 2 — READY (In Run Queue):** In this state, the process is fully resident in memory, has acquired all required resources except CPU execution time, and sits in the scheduler's run queue waiting for its assigned core.
- **State 3 — RUNNING (CPU Dispatch):** When selected by the scheduler via **Scheduler Dispatch**, the process transitions to **RUNNING**, executing instructions on a physical CPU core. While running, three distinct events can transition the process out of this state:
  - *Timer Interrupt / Preemption:* The process's allocated time slice expires, forcing a voluntary or involuntary transition back to the **READY** queue.
  - *I/O Wait / Syscall:* The process requests a blocking operation (such as reading from disk, waiting for a network packet, or acquiring a mutex) and transitions to **BLOCKED / WAITING**.
  - *Exit / Signal:* The process completes execution or receives a terminating signal (\`SIGKILL\`, \`SIGTERM\`, or unhandled exception), transitioning to **TERMINATED / ZOMBIE**.
- **State 4 — BLOCKED / WAITING (I/O & Sleep):** In this sleep state, the process consumes no CPU cycles. It remains dormant until its asynchronous I/O completes or the awaited lock is released (**I/O Complete / Event**), at which point it returns strictly to the **READY** queue—it can never jump directly back onto the CPU.
- **State 5 — TERMINATED / ZOMBIE (Awaiting Cleanup):** When a process terminates, its virtual address space, open file descriptors, and allocated memory pages are immediately deallocated. However, its PCB remains in the system process table to hold its termination status and exit code. The process remains in this "Zombie" state until its parent process reads the status via \`wait()\` / \`waitpid()\`.
- **Defensive Engineering Implication:** Monitoring process state dynamics is vital for threat detection. An excessive accumulation of Zombie processes indicates a broken or misconfigured parent daemon failing to reap child processes, while processes fluctuating rapidly between NEW and RUNNING can indicate malicious fork bombs, rapid process injection, or evasive command-and-control beaconing.`,

  // Lesson 1.3 - Fig 2 (C03-M01-D05)
  d05: `

#### Visual Walkthrough & Architectural Breakdown

- **Linux Hierarchical Process Tree (Left):** Linux strictly enforces a unified, single-rooted hierarchical parent-child tree. Process initialization begins with \`kernel_task\` (PID 0), an internal kernel-space swapper process responsible for CPU scheduling and page swapping. During boot, PID 0 spawns \`systemd\` (PID 1), the first user-space initialization daemon that acts as the root ancestor of all subsequent user processes. All background services (\`sshd\` PID 842, \`systemd-journald\` PID 412) and interactive user shells (\`bash\` PID 1920) descend hierarchically from PID 1.
- **Linux Security Boundaries:** Because every user-space process on Linux maintains an explicit Parent Process Identifier (PPID), unauthorized background executions or reverse shells stand out immediately in process lineage triage (e.g., an unexpected \`sh\` or \`bash\` process spawned as a direct child of a web daemon such as \`nginx\` or \`apache2\`).
- **Windows NT Process Ancestry (Right):** Windows NT does not use a single user-space root; instead, it establishes specialized process hierarchies divided across system isolation boundaries. The Windows kernel process \`System\` (PID 4) initializes core device drivers and spawns the Session Manager Subsystem (\`smss.exe\`, PID 392), the master user-mode process responsible for bootstrapping Windows sessions.
- **Session 0 vs. Session 1 Isolation:** \`smss.exe\` spawns the Client/Server Runtime Subsystem (\`csrss.exe\`, PID 576) and divides execution between non-interactive service sessions and interactive user desktops:
  - *Session 0 (Background Services):* \`wininit.exe\` (PID 744) initializes core background security infrastructure, launching the Service Control Manager (\`services.exe\`, PID 856) to host system services and \`lsass.exe\` (PID 900) to govern local authentication, Kerberos ticketing, and security token creation.
  - *Session 1 (Interactive User):* \`winlogon.exe\` (PID 780) handles secure desktop logon, executing \`userinit.exe\` (PID 1024), which in turn launches the Windows Explorer shell (\`explorer.exe\`, PID 1340) and user applications.
- **Critical Security Anomaly & Triage:** Legitimate Windows system processes have immutable structural signatures: \`lsass.exe\` must always execute as a child of \`wininit.exe\` from the canonical directory \`C:\\Windows\\System32\\lsass.exe\`. The presence of a secondary \`lsass.exe\` executing from a user directory (such as \`C:\\Users\\Atharv\\lsass.exe\`) or spawned by an unexpected parent (such as \`cmd.exe\` or \`powershell.exe\`) is a definitive indicator of credential dumping malware or process masquerading.`,

  // Lesson 1.4 - Fig 1 (C03-M01-D06)
  d06: `

#### Visual Walkthrough & Architectural Breakdown

- **64-Bit Canonical Virtual Address Anatomy:** On 64-bit x86-64 processors, virtual addresses use a 48-bit canonical addressing scheme. Bits 63–48 (16 bits) represent sign extension, replicating bit 47 to ensure canonical form. The remaining 48 bits are divided into four 9-bit page table index fields ($4 \\times 9 = 36$ bits) and a 12-bit Byte Offset field ($2^{12} = 4,096$ bytes = 4 KB page size), defining a maximum virtual address space of 256 TB ($2^{48}$ bytes).
- **The 4-Level Page Table Walk:** When an application dereferences a virtual memory address, the hardware Memory Management Unit (MMU) executes a 4-level table walk guided by the physical base address stored in the CPU's \`CR3\` control register:
  - *Level 4 (PML4):* \`CR3\` points to the Page Map Level 4 table. The 9-bit PML4 index ($i_4$) selects one of 512 entries (each 8 bytes), resolving the physical base address of the Page Directory Pointer Table (PDPT).
  - *Level 3 (PDPT):* The 9-bit PDPT index ($i_3$) selects an entry resolving the physical base address of the Page Directory (PD).
  - *Level 2 (PD):* The 9-bit PD index ($i_2$) selects an entry resolving the physical base address of the Page Table (PT).
  - *Level 1 (PT):* The 9-bit PT index ($i_1$) selects the terminal Page Table Entry (PTE), which yields the physical Page Frame Number (PFN) and page protection flags (such as Present, Writable, User/Supervisor, and No-Execute).
- **Physical Address Assembly:** The MMU shifts the resolved PFN left by 12 bits and bitwise-ORs it with the original 12-bit Byte Offset (\`Physical Address = (PFN << 12) | Byte Offset\`), locating the exact physical byte within a 4 KB frame of physical RAM.
- **Page Fault Handler (#PF) & Demand Paging:** If the Present bit in any page table entry is cleared (0), the MMU halts execution and triggers a Page Fault exception (\`#PF\`). The OS kernel page fault handler intercepts the exception, locates the required page in secondary backing storage (a Linux swap partition or Windows \`pagefile.sys\`), loads the 4 KB page into an available physical RAM frame, marks the PTE as Present (1), and restarts the faulting CPU instruction seamlessly.
- **Defensive Engineering Implication:** Because each process maintains its own independent PML4 table referenced by a unique \`CR3\` register value, processes cannot address or read memory belonging to other processes or the kernel, establishing the foundational isolation boundary required for multi-tenant system defense.`,

  // Lesson 1.4 - Fig 2 (C03-M01-D07)
  d07: `

#### Visual Walkthrough & Architectural Breakdown

- **Address Space Layout Randomization (ASLR):** The top panel illustrates how ASLR neutralizes exploit techniques that rely on static memory locations (such as return-to-libc and Return-Oriented Programming). When an application executes, the operating system kernel randomizes the base memory addresses of its primary memory segments:
  - *Run 1:* \`vuln_app\` allocates its Stack at base \`0x7ffd_9c40_0000\`, its Heap at base \`0x55a2_1b80_0000\`, and its Code/Text segment at \`0x5555_4000_0000\`.
  - *Run 2 (Re-execution):* Upon restarting the exact same binary, the kernel shifts all segment offsets. The Stack relocates to \`0x7fff_e710_0000\`, the Heap shifts to \`0x55f9_7d20_0000\`, and the Code base moves to \`0x55f9_4000_0000\`.
  - *Exploit Impact:* An attacker relying on a hardcoded library address (e.g., jumping to \`system()\` at \`0x7ffff7e12340\`) will jump into unmapped or incorrect memory during subsequent runs, triggering a fatal access violation (\`SIGSEGV\`) rather than spawning a shell.
- **Data Execution Prevention (DEP / NX Bit):** The bottom panel illustrates hardware-enforced Data Execution Prevention, which enforces the mathematical $W \\oplus X$ (Write XOR Execute) principle. At the hardware page table level, a memory page can be Writable or Executable, but never both simultaneously:
  - *Code/Text (\`.text\`):* Marked Read=Yes, Write=No, Execute=Yes (RX). Houses immutable machine instructions.
  - *Data/Heap (\`.data\`, heap):* Marked Read=Yes, Write=Yes, Execute=No (RW-). Houses mutable variables, dynamic allocations, and buffers.
  - *Stack (\`stack\`):* Marked Read=Yes, Write=Yes, Execute=No (RW-). Houses local function variables, return pointers, and stack frames.
- **Shellcode Injection Defense Scenario:** When an adversary exploits a buffer overflow to inject raw shellcode into writable memory (such as the stack or heap) and redirects the CPU's instruction pointer (\`RIP\`) into that buffer, the CPU reads the No-Execute (NX) bit in the corresponding Page Table Entry. The processor immediately refuses to fetch instructions from the page, blocking code execution and terminating the process with an execution exception.
- **Defensive Engineering Implication:** Combined, ASLR and DEP eliminate trivial buffer overflow attacks. To achieve code execution on modern hardened systems, adversaries must find an information disclosure vulnerability to defeat ASLR entropy and construct complex ROP chains using existing executable memory pages to defeat DEP.`,

  // Lesson 1.5 - Fig 1 (C03-M01-F2)
  f2: `

#### Visual Walkthrough & Architectural Breakdown

- **Hardware Root of Trust & Dual-Chain Architecture:** System boot security begins in non-volatile motherboard firmware (UEFI ROM/NVRAM), anchored by the Platform Key (PK) and Key Exchange Key (KEK). Secure Boot acts as an active gatekeeper that verifies digital signatures before executing the next boot stage, while the hardware TPM 2.0 acts as a passive measurement recorder that cryptographic hashes each component into Platform Configuration Registers (PCRs).
- **Linux Secure Boot Chain (Left):**
  1. *UEFI Firmware:* Validates the signature of the Shim bootloader (\`BOOTX64.EFI\`) against the Microsoft 3rd Party UEFI Certificate Authority (CA) stored in NVRAM and extends its hash into TPM PCR[4].
  2. *Shim Loader:* Verifies the digital signature of the GRUB2 bootloader (\`grubx64.efi\`) using embedded distribution keys (e.g., Canonical, Red Hat) and extends PCR[7].
  3. *GRUB2 Bootloader:* Verifies the Linux Kernel image (\`vmlinuz\`) using distro kernel signing certificates and extends PCR[8].
  4. *Linux Kernel:* Loads and verifies the Initial RAM Filesystem (\`initramfs\`), extending PCR[9].
  5. *Initramfs:* Mounts the encrypted root filesystem (e.g., \`/dev/nvme0n1p2 -> /\`) and executes \`/sbin/systemd\` (PID 1).
- **Windows Boot Chain (Right):**
  1. *UEFI Firmware:* Validates the Windows Boot Manager (\`bootmgfw.efi\`) against the Microsoft Windows Production CA in firmware and records its measurement in PCR[4].
  2. *Windows Boot Manager:* Loads and cryptographically validates the Windows OS Loader (\`winload.efi\`), extending PCR[7].
  3. *Windows OS Loader:* Verifies the core kernel image (\`ntoskrnl.exe\`) and Early Launch Anti-Malware (ELAM) boot-start drivers, recording their integrity in PCR[8].
  4. *Windows Kernel:* Initializes memory management, the Local Security Authority (\`lsass.exe\`), and verified device drivers, measuring kernel state into PCR[9].
  5. *User-Mode Initialization:* Launches \`smss.exe\`, which bootstraps \`services.exe\` and user desktop subsystems.
- **TPM 2.0 PCR Mapping & Attestation:** Each component is measured sequentially into standard registers: PCR[0] records core firmware code; PCR[2] measures option ROMs; PCR[4] measures the initial boot manager/shim; PCR[7] measures the OS bootloader; PCR[8] measures the operating system kernel and early drivers; and PCR[9] records the OS loader environment and initramfs.
- **Defensive Engineering Implication:** This chain of custody prevents bootkits and firmware rootkits from achieving persistence. If an attacker replaces the kernel or injects an unsigned driver, Secure Boot immediately halts the boot process. Furthermore, Full Disk Encryption engines (such as BitLocker and LUKS TPM2) seal disk encryption keys against specific PCR state values—any unauthorized modification changes PCR hashes, preventing the TPM from unsealing encryption keys.`,

  // Lesson 1.5 - Fig 2 (C03-M01-D08)
  d08: `

#### Visual Walkthrough & Architectural Breakdown

- **Three-Tier Cryptographic Hierarchy:** UEFI Secure Boot organizes trust through a strict three-tier hierarchy of cryptographic keys and signature databases stored permanently in tamper-resistant UEFI NVRAM:
  - *Tier 1 — Platform Key (PK):* The apex root of trust installed by the hardware OEM (such as Dell, HP, or Lenovo). The PK controls the Secure Boot policy, authorizing all additions, modifications, or deletions to the Key Exchange Key (KEK) database.
  - *Tier 2 — Key Exchange Key (KEK):* Intermediate cryptographic authority authorized by the PK. The KEK contains certificates from operating system vendors (primarily Microsoft Corporation KEK and OEM-specific vendor keys). It possesses the authority to issue signed updates to the operational signature databases (\`db\` and \`dbx\`).
  - *Tier 3 — Authorized & Forbidden Databases (\`db\` / \`dbx\`):* The active evaluation databases checked during every system startup.
- **Authorized Signatures Database (\`db\`):** The whitelist containing valid X.509 certificates and SHA-256 hashes of approved boot components. Key entries include the **Microsoft Windows Production CA** (authorizing \`bootmgfw.efi\`) and the **Microsoft UEFI CA** (authorizing the Linux Shim loader). Any bootloader carrying a valid signature tracing back to an entry in \`db\` is considered trusted.
- **Forbidden Signatures Database (\`dbx\`):** The blacklist containing revoked certificates and blacklisted SHA-256 hashes of compromised or vulnerable boot binaries. Critical entries include revocations for **Boothole (\`CVE-2020-10713\`)**, which exploited buffer overflows in GRUB2 configuration parsers, and vulnerable legacy shim binaries.
- **Runtime Signature Validation Decision Logic:** When firmware encounters an executable EFI binary during boot:
  1. The firmware calculates the binary's cryptographic hash and checks the \`dbx\` database. If the hash or certificate matches an entry in \`dbx\`, **execution is blocked immediately**, regardless of any valid signature.
  2. If the binary is absent from \`dbx\`, firmware checks the \`db\` database. If a matching certificate or hash exists, **execution is allowed**.
  3. If no matching record exists in either database, firmware rejects the binary with a Secure Boot violation error.
- **Defensive Engineering Implication:** Maintaining up-to-date \`dbx\` revocation lists across enterprise fleets is critical. If enterprise systems fail to receive firmware updates that refresh \`dbx\`, adversaries with administrative or physical access can downgrade bootloaders to vulnerable, signed legacy versions (a bypass known as BlackLotus) to execute unauthorized kernel code despite Secure Boot being enabled.`,

  // Lesson 1.6 - Fig 1 (C03-M01-F3)
  f3: `

#### Visual Walkthrough & Architectural Breakdown

- **State 1 — INACTIVE (Dead):** The baseline resting state of a systemd unit. The service process is not executing, consumes no CPU or volatile RAM, and maintains no active PIDs in the kernel process table.
- **State 2 — ACTIVATING (Execution Bootstrap):** Initiated when an administrator, dependency event, or systemd timer executes \`systemctl start <service>\`. Systemd enters the activating phase, running optional pre-flight scripts defined in \`ExecStartPre=\` (such as checking database connectivity or creating runtime directories) and launching the primary daemon executable defined in \`ExecStart=\`.
- **State 3 — ACTIVE (Running):** Upon successful daemonization or readiness notification (e.g., \`sd_notify()\` under \`Type=notify\`), the service transitions to **ACTIVE**. The main process and any worker threads are fully operational, encapsulated in a dedicated control group (\`cgroup\`) that tracks and restricts their CPU, memory, and I/O consumption.
- **State 4 — DEACTIVATING (Graceful Teardown):** Triggered when an administrator invokes \`systemctl stop <service>\` or a system shutdown occurs. Systemd dispatches \`SIGTERM\` to the process group, executes cleanup scripts defined in \`ExecStop=\`, waits for processes to exit within a configured timeout (\`TimeoutStopSec=\`), and force-terminates any hung processes with \`SIGKILL\`, returning the unit to **INACTIVE**.
- **State 5 — FAILED (Crash or Abnormal Exit):** If the service encounters a critical runtime exception (such as a memory segmentation fault \`SIGSEGV\`, unhandled error, or non-zero exit code), it transitions directly into **FAILED**, recording error diagnostics into \`systemd-journald\`.
- **Automatic Failure Recovery Loop:** When \`Restart=on-failure\` is configured in the unit's \`[Service]\` section, systemd does not leave the service in the FAILED state. Instead, it enters a recovery delay defined by \`RestartSec=\` (e.g., 5 seconds) and transitions back into **ACTIVATING**, restoring service availability without human intervention.
- **Defensive Engineering Implication:** Administrators and incident responders use \`systemctl status <service>\` and \`journalctl -u <service> -e\` to inspect exit codes and state transitions. Monitoring for high-frequency oscillation between FAILED and ACTIVATING (restart storms) helps detect service configuration tampering, resource exhaustion, or denial-of-service attacks.`,

  // Lesson 1.6 - Fig 2 (C03-M01-D09)
  d09: `

#### Visual Walkthrough & Architectural Breakdown

- **Configuration Source — Windows Registry:** Windows services are centrally defined in the registry under \`HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\<ServiceName>\`. Key parameters include:
  - \`Start\` (\`REG_DWORD\`): Defines the startup behavior (0 = Boot, 1 = System, 2 = Automatic, 3 = Manual, 4 = Disabled).
  - \`Type\` (\`REG_DWORD\`): Governs the execution model. \`0x10\` designates a standalone process (\`Own Process\`); \`0x20\` designates a shared service hosted inside a multi-tenant host process (\`Share Process\`).
  - \`ImagePath\` (\`REG_EXPAND_SZ\`): Full filesystem path to the executable binary.
  - \`ServiceDll\` (\`REG_EXPAND_SZ\`): Points to the target DLL file when using the shared host execution model.
  - \`ObjectName\` (\`REG_SZ\`): The security account context under which the service runs (\`LocalSystem\`, \`NT AUTHORITY\\NetworkService\`, or a dedicated managed service account).
- **Central Dispatcher — Service Control Manager (\`services.exe\`):** Operating as a core system daemon in Session 0, the SCM reads service configuration parameters from the registry upon boot or when commanded via the Windows Service API. The SCM coordinates startup order, monitors process heartbeats, resolves dependencies, and applies recovery actions.
- **Standalone Execution Model (\`Type = 0x10\`):** Dedicated, high-privilege services execute as isolated standalone processes. Critical examples include \`lsass.exe\` (Local Security Authority Subsystem Service) and \`spoolsv.exe\` (Print Spooler), each executing within its own private address space running as \`LocalSystem\`.
- **Shared Host Execution Model (\`Type = 0x20\` via \`svchost.exe\`):** To conserve system memory and handle numerous background tasks efficiently, Windows groups related service DLLs inside shared instances of \`svchost.exe\`, segregated by privilege and function:
  - *Network Services Group (\`svchost.exe -k netsvcs\`):* Hosts network-facing DLLs such as \`Dnscache.dll\` (DNS Client) and \`LanmanWorkstation.dll\` (Workstation service).
  - *Restricted Local Services (\`svchost.exe -k LocalServiceAndNoImpersonation\`):* Hosts security and firewall DLLs such as \`BFE.dll\` (Base Filtering Engine) and \`MpsSvc.dll\` (Windows Defender Firewall) with restricted impersonation tokens.
- **Defensive Engineering & Threat Hunting Implication:** Adversaries frequently abuse Windows services for persistence and privilege escalation. Common attacks include unquoted service paths (where an unquoted \`ImagePath\` with spaces allows malicious binary planting) and service DLL hijacking (modifying \`ServiceDll\` to point to a malicious payload). Defenders inspect \`svchost.exe\` processes to verify that every active instance carries the legitimate parent PID of \`services.exe\` and maps exclusively to authorized Microsoft service DLLs.`
};

console.log('Defined all 12 walkthroughs successfully.');
