/**
 * Course 03: Linux and Windows System Administration
 * Module 1: Operating System Foundations
 * Modular load-balanced data file.
 */

export const module1Data = {
  "id": "mod_c3_1",
  "title": "Module 1: Operating System Foundations",
  "description": "Foundations of modern operating systems: CPU privilege rings (kernel space vs. user space), process creation and scheduling, memory hierarchies and paging, virtual address spaces, UEFI Secure Boot architectures, and service lifecycle management under systemd and Windows SCM.",
  "order": 1,
  "quiz": {
    "id": "quiz_mod_c3_1",
    "title": "Module 1: Operating System Foundations Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m1_001",
        "topic": "Kernel Space vs. User Space & System Calls",
        "difficulty": "medium",
        "q": "How does a user-space program ask the kernel to open a file or perform I/O?",
        "options": [
          "Through a system call (syscall)",
          "By writing directly to the physical disk controller hardware registers",
          "By editing kernel page table structures in volatile memory",
          "Through a legacy BIOS real-mode interrupt"
        ],
        "correct": 0,
        "explanation": "System calls are the controlled, architecturally enforced boundary through which user-space programs request services from the privileged kernel."
      },
      {
        "id": "q_c3_m1_002",
        "topic": "Kernel-Mode Failure Forensics (CrowdStrike 2024)",
        "difficulty": "difficult",
        "q": "Why was the 2024 CrowdStrike Channel 291 fault able to crash entire Windows systems with blue screens (BSOD)?",
        "options": [
          "The faulting code ran in kernel mode (Ring 0), where an invalid memory read exception stops the entire operating system kernel.",
          "The driver operated entirely in user space and exhausted memory allocation tables.",
          "The update deleted the SYSTEM and SAM hives from the Windows registry.",
          "The driver was an autonomous self-propagating worm that exhausted network sockets."
        ],
        "correct": 0,
        "explanation": "Kernel-mode faults cannot be isolated or contained like user-space crashes. When kernel code attempts an invalid memory read, the kernel initiates a bugcheck/BSOD to prevent silent memory corruption."
      },
      {
        "id": "q_c3_m1_003",
        "topic": "Process & Thread Lifecycle & Ancestry Trees",
        "difficulty": "medium",
        "q": "On a Windows system, the wininit.exe process has a parent process ID that does not exist in the active process table. This phenomenon is:",
        "options": [
          "Normal, because the temporary smss.exe instance that initialized the session terminates immediately after launching wininit.exe.",
          "An indicator of disk driver corruption within the NTFS volume.",
          "Always malicious, proving unauthorized process hollowing by malware.",
          "Architecturally impossible on modern Windows NT versions."
        ],
        "correct": 0,
        "explanation": "smss.exe starts a temporary per-session instance that launches wininit.exe and then immediately exits, leaving wininit without an active running parent process."
      },
      {
        "id": "q_c3_m1_004",
        "topic": "Memory Exploit Mitigations (ASLR & DEP/NX)",
        "difficulty": "medium",
        "q": "What is the defensive function of Address Space Layout Randomization (ASLR)?",
        "options": [
          "It randomizes the memory base addresses of code, stack, and heap segments upon every program execution.",
          "It cryptographically encrypts physical RAM bytes to prevent hardware cold-boot attacks.",
          "It automatically zeroes unused memory pages to mitigate side-channel data leaks.",
          "It verifies the digital signatures of device drivers prior to loading them into Ring 0."
        ],
        "correct": 0,
        "explanation": "ASLR randomizes memory layout offsets every time an executable runs, preventing attackers from predicting fixed memory addresses for return-to-libc or ROP chain exploits."
      },
      {
        "id": "q_c3_m1_005",
        "topic": "Virtual Memory Management & Paging",
        "difficulty": "medium",
        "q": "A memory region displayed as \"r-xp\" in /proc/<pid>/maps has which access permissions?",
        "options": [
          "Readable and executable, but strictly non-writable (private mapping).",
          "Writable and executable, representing an unsafe memory region.",
          "Network shared memory mapped across multiple container namespaces.",
          "Swapped memory pages compressed in swap partitions."
        ],
        "correct": 0,
        "explanation": "In /proc/<pid>/maps, r = read, x = execute, - = no write (non-writable), and p = private (copy-on-write mapping)."
      },
      {
        "id": "q_c3_m1_006",
        "topic": "UEFI Secure Boot, Shim & Kernel Hand-off",
        "difficulty": "medium",
        "q": "What does UEFI Secure Boot cryptographically verify before transferring execution control?",
        "options": [
          "Digital signatures of boot components against trusted keys stored in NVRAM (PK, KEK, db).",
          "User account password hashes stored within local firmware chips.",
          "TLS digital certificates presented by local network gateway routers.",
          "Total storage capacity of NVMe solid-state drives."
        ],
        "correct": 0,
        "explanation": "Secure Boot verifies the digital signature of the initial bootloader and subsequent boot stages against an authorized signature database (db) stored in protected firmware NVRAM."
      },
      {
        "id": "q_c3_m1_007",
        "topic": "Process & Thread Lifecycle & Ancestry Trees",
        "difficulty": "medium",
        "q": "On most modern enterprise Linux distributions, which daemon occupies Process ID 1 (PID 1)?",
        "options": [
          "systemd",
          "The monolithic Linux kernel",
          "The interactive bash login shell",
          "The crond background scheduler daemon"
        ],
        "correct": 0,
        "explanation": "systemd is the standard initialization daemon and occupies PID 1 on Debian, Ubuntu, RHEL, CentOS, Fedora, and openSUSE distributions."
      },
      {
        "id": "q_c3_m1_008",
        "topic": "Windows SCM & svchost Architecture",
        "difficulty": "medium",
        "q": "Which built-in Windows service account possesses the broadest local privileges on the system?",
        "options": [
          "NT AUTHORITY\\SYSTEM (LocalSystem)",
          "NT AUTHORITY\\LocalService",
          "NT AUTHORITY\\NetworkService",
          "A standard Virtual Service Account (NT SERVICE\\<Name>)"
        ],
        "correct": 0,
        "explanation": "LocalSystem has comprehensive local privileges (including SeDebugPrivilege, SeTcbPrivilege) with unrestricted access to local filesystem and registry assets."
      },
      {
        "id": "q_c3_m1_009",
        "topic": "systemd Unit Lifecycle & Failure Recovery",
        "difficulty": "difficult",
        "q": "A systemd service restarts automatically after its main worker process is terminated via kill -9. Which unit configuration directive produced this self-healing behavior?",
        "options": [
          "Restart=on-failure (or Restart=always) configured within the [Service] section of the unit file.",
          "The unit was marked with \"systemctl enable\" in the multi-user.target directory.",
          "A cron job detected the process failure and triggered a reload.",
          "The Linux kernel automatically clones terminated processes if they own network sockets."
        ],
        "correct": 0,
        "explanation": "Restart=on-failure instructs systemd to monitor the process exit code; if the process exits abnormally (such as being killed by SIGKILL), systemd automatically initiates a restart."
      },
      {
        "id": "q_c3_m1_010",
        "topic": "Process & Thread Lifecycle & Ancestry Trees",
        "difficulty": "medium",
        "q": "Which Linux signal requests a process to terminate cleanly and allows the process to intercept the signal and execute cleanup routines?",
        "options": [
          "SIGTERM (Signal 15)",
          "SIGKILL (Signal 9)",
          "SIGSTOP (Signal 19)",
          "SIGSEGV (Signal 11)"
        ],
        "correct": 0,
        "explanation": "SIGTERM (15) is the standard termination request signal. Unlike SIGKILL (9), SIGTERM can be caught and handled by application code to perform safe cleanup and flush buffers."
      },
      {
        "id": "q_c3_m1_011",
        "topic": "Kernel Space vs. User Space & System Calls",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_012",
        "topic": "Process & Thread Lifecycle & Ancestry Trees",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_013",
        "topic": "Virtual Memory Management & Paging",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_014",
        "topic": "Memory Exploit Mitigations (ASLR & DEP/NX)",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_015",
        "topic": "UEFI Secure Boot, Shim & Kernel Hand-off",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_016",
        "topic": "systemd Unit Lifecycle & Failure Recovery",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_017",
        "topic": "Windows SCM & svchost Architecture",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_018",
        "topic": "Kernel-Mode Failure Forensics (CrowdStrike 2024)",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_019",
        "topic": "OS Abstraction & Hardware Privilege Rings",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      },
      {
        "id": "q_c3_m1_020",
        "topic": "Kernel Space vs. User Space & System Calls",
        "difficulty": "medium",
        "q": "During a server performance triage, an engineer notes high 'system' CPU time compared to 'user' CPU time. Which operational condition explains excessive kernel-space CPU consumption?",
        "options": [
          "High frequency of system calls, context switching, and hardware device interrupt handling.",
          "Execution of computationally intensive cryptography algorithms entirely inside user space.",
          "Memory leaks isolated within standard web browser JavaScript execution threads.",
          "Static file caching on SSD NVMe partitions operating under write-back caching."
        ],
        "correct": 0,
        "explanation": "System CPU time represents CPU cycles spent in kernel space executing system calls, handling device interrupts, and performing context switches. High system CPU indicates heavy I/O or syscall overhead."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m1_l1",
      "title": "1.1 What an Operating System Does: Hardware Abstraction, Resources & Privilege",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Hardware Abstraction, Resources & Privilege.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Hardware Abstraction, Resources & Privilege.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l1_c03_m01_d01",
          "title": "C03-M01-D01: Operating System Architecture: Hardware Abstraction & Core Subsystems",
          "url": "/assets/courses/cyber-03/c03_m01_l01_hardware_abstraction_layers.png",
          "caption": "Figure C03-M01-D01: Hierarchical abstraction stack showing physical hardware mediated by the OS kernel, device drivers, and user applications.",
          "alt": "Diagram showing hardware abstraction layers from CPU, RAM, storage, and NICs up to user applications"
        },
        {
          "id": "img_c3_m1_l1_c03_m01_d02",
          "title": "C03-M01-D02: OS Resource Arbitration: CPU, Memory, I/O & Storage Queues",
          "url": "/assets/courses/cyber-03/c03_m01_l01_resource_arbitration_queues.png",
          "caption": "Figure C03-M01-D02: Resource arbitration matrix illustrating how the OS kernel schedules competing process demands across CPU time slices, RAM pages, and disk queues.",
          "alt": "Diagram illustrating OS resource arbitration across CPU scheduling, memory pages, and I/O device queues"
        }
      ],
      "content": "## 1.1 What an Operating System Does: Hardware Abstraction, Resources & Privilege\n\n![C03-M01-D01: Operating System Architecture: Hardware Abstraction & Core Subsystems](/assets/courses/cyber-03/c03_m01_l01_hardware_abstraction_layers.png)\n\n*Figure C03-M01-D01: Hierarchical abstraction stack showing physical hardware mediated by the OS kernel, device drivers, and user applications.*\n\nLESSON C03-M01-L01: What an operating system does\n=================================================\n\n2.1.1 Core responsibilities\n  Process management   Creating, scheduling and terminating programs.\n  Memory management    Giving each process its own address space and\n                       protecting it from others.\n  File systems         Organising persistent data and enforcing permissions\n                       (Modules 2-3 and 5).\n  Device management    Drivers that control disks, network cards, USB and\n                       displays.\n  Security             Authentication, access control, auditing.\n  Networking           The protocol stacks studied in Course 02.\n  User interfaces      Shells, graphical desktops.\n\n2.1.2 The two platforms in this course\n  Linux     A kernel first released by Linus Torvalds in 1991, combined with\n            user-space software (often GNU tools) into distributions such as\n            Ubuntu, Debian, Red Hat Enterprise Linux and Alpine (Module 2).\n            Dominant on servers, cloud, containers and embedded devices.\n  Windows   Microsoft's operating system family, built on the Windows NT\n            architecture. Dominant on enterprise desktops and in Active\n            Directory environments; widely used on servers.\nBoth run on the same hardware and solve the same problems with different\ndesigns and vocabularies. Professionals need both.\n\n\n![C03-M01-D02: OS Resource Arbitration: CPU, Memory, I/O & Storage Queues](/assets/courses/cyber-03/c03_m01_l01_resource_arbitration_queues.png)\n\n*Figure C03-M01-D02: Resource arbitration matrix illustrating how the OS kernel schedules competing process demands across CPU time slices, RAM pages, and disk queues.*\n\n"
    },
    {
      "id": "les_c3_m1_l2",
      "title": "1.2 Kernel Space and User Space: CPU Rings, Traps & System Call Interfaces",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of CPU Rings, Traps & System Call Interfaces.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of CPU Rings, Traps & System Call Interfaces.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l2_c03_m01_f1",
          "title": "C03-M01-F1: Kernel Space and User Space: CPU Rings & Syscall Boundary",
          "url": "/assets/courses/cyber-03/C03-M01-F1.png",
          "caption": "Figure C03-M01-F1: Applications run in restricted user space (Ring 3) and request services from the privileged kernel (Ring 0) through system calls; drivers run in kernel space.",
          "alt": "Diagram showing CPU rings, user space applications, syscall interface, kernel subsystems, and physical hardware"
        },
        {
          "id": "img_c3_m1_l2_c03_m01_d03",
          "title": "C03-M01-D03: CPU Mode Transition: User-to-Kernel Trap Gate & Register Preservation",
          "url": "/assets/courses/cyber-03/c03_m01_l02_cpu_mode_transition_trap.png",
          "caption": "Figure C03-M01-D03: Step-by-step CPU mode transition sequence executing a system call via software interrupt/syscall instruction, kernel stack switch, and return.",
          "alt": "Sequence flow diagram showing user space syscall instruction, hardware mode bit flip, kernel stack switch, ISR dispatch, and sysret"
        }
      ],
      "content": "## 1.2 Kernel Space and User Space: CPU Rings, Traps & System Call Interfaces\n\n![C03-M01-F1: Kernel Space and User Space: CPU Rings & Syscall Boundary](/assets/courses/cyber-03/C03-M01-F1.png)\n\n*Figure C03-M01-F1: Applications run in restricted user space (Ring 3) and request services from the privileged kernel (Ring 0) through system calls; drivers run in kernel space.*\n\nLESSON C03-M01-L02: Kernel space and user space\n===============================================\n\n2.2.1 Privilege levels\nModern processors have hardware privilege levels. On x86-64 processors\nthese are \"rings\": ring 0 is the most privileged, used for the kernel; ring\n3 is used for ordinary applications. (ARM processors use \"exception levels\"\nwith the same idea.) Code in ring 3 cannot directly access hardware or other\nprocesses' memory; attempting to do so causes a fault that the kernel\nhandles.\n\n  Kernel space (kernel mode)  The OS kernel and device drivers run here\n                              with full access to hardware and all memory.\n  User space (user mode)      Applications, shells and most services run\n                              here with restricted rights.\n\n2.2.2 System calls\nUser-space programs ask the kernel for services through system calls: open\na file, create a process, send network data, allocate memory. The processor\nswitches to kernel mode, the kernel checks permissions and performs the\noperation, then returns to user mode.\n  Linux     Programs usually call C library functions (glibc, musl) that\n            invoke system calls such as openat, read, write, clone, execve\n            and mmap. The kernel's system call interface is documented in\n            the Linux man-pages project (man 2 syscalls) [C03-M01-R1].\n  Windows   Applications call documented Windows APIs (for example\n            CreateFileW in kernel32.dll), which call lower-level functions\n            in ntdll.dll, which transition into the kernel (ntoskrnl.exe).\n            Microsoft documents the user-mode/kernel-mode split in its driver\n            documentation [C03-M01-R2].\nSecurity relevance: system calls are a natural monitoring point. Linux\nauditing (auditd) and EDR products observe them to detect suspicious\nbehaviour (Course 20).\n\n2.2.3 Kernel architecture\n  Monolithic kernel   Core services and drivers run in kernel space in one\n                      large program. Linux is monolithic but modular: drivers\n                      can be loaded as kernel modules at runtime (lsmod,\n                      modprobe).\n  Hybrid kernel       Windows NT is commonly described as hybrid: a kernel\n                      and executive in kernel mode, with many subsystems and\n                      services in user mode.\n  Microkernel         Minimal kernel; most services run in user space\n                      (for example seL4, QNX). Smaller trusted code base.\n\n2.2.4 Drivers: the most privileged third-party code\nDevice drivers and security agents often run in kernel mode, so a bug in\nthem can crash or compromise the whole system. Controls include:\n  - Windows requires kernel-mode drivers to be signed, and Microsoft\n    maintains a vulnerable driver blocklist that can be enforced to stop\n    known-bad drivers from loading [C03-M01-R3].\n  - Linux supports kernel module signature verification and \"lockdown\"\n    modes that restrict what even root can do to the running kernel.\n  - Change management for driver and agent updates, including staged\n    rollouts (CrowdStrike case study).\n\n2.2.5 Administrators and the kernel\n\"Root\" (Linux) and members of the Administrators group (Windows) are user-\nspace identities with very broad rights - they can load drivers, change\nsystem files and read most data. Least privilege (Course 01 Module 2)\ntherefore means minimising who and what runs as root/Administrator, not just\nprotecting the kernel.\n\n\n![C03-M01-D03: CPU Mode Transition: User-to-Kernel Trap Gate & Register Preservation](/assets/courses/cyber-03/c03_m01_l02_cpu_mode_transition_trap.png)\n\n*Figure C03-M01-D03: Step-by-step CPU mode transition sequence executing a system call via software interrupt/syscall instruction, kernel stack switch, and return.*\n\n"
    },
    {
      "id": "les_c3_m1_l3",
      "title": "1.3 Processes and Threads: Identification, Tree Hierarchies & State Transitions",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Identification, Tree Hierarchies & State Transitions.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Identification, Tree Hierarchies & State Transitions.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l3_c03_m01_d04",
          "title": "C03-M01-D04: Process State Machine: Creation, Execution, Blocking & Zombie Lifecycles",
          "url": "/assets/courses/cyber-03/c03_m01_l03_process_state_machine.png",
          "caption": "Figure C03-M01-D04: Finite state transition diagram of OS processes showing Ready, Running, Blocked/Waiting, Terminated, and Zombie states.",
          "alt": "Finite state machine diagram of an operating system process moving between Ready, Running, Waiting, and Terminated states"
        },
        {
          "id": "img_c3_m1_l3_c03_m01_d05",
          "title": "C03-M01-D05: Comparative Process Trees: Linux systemd (PID 1) vs. Windows Core Architecture",
          "url": "/assets/courses/cyber-03/c03_m01_l03_process_trees_linux_windows.png",
          "caption": "Figure C03-M01-D05: Side-by-side hierarchical process ancestry trees for Linux (systemd PID 1) and Windows NT (System PID 4, smss.exe, csrss.exe, services.exe, lsass.exe).",
          "alt": "Diagram comparing Linux process tree anchored at systemd with Windows process tree showing smss, csrss, wininit, services, and lsass"
        }
      ],
      "content": "## 1.3 Processes and Threads: Identification, Tree Hierarchies & State Transitions\n\n![C03-M01-D04: Process State Machine: Creation, Execution, Blocking & Zombie Lifecycles](/assets/courses/cyber-03/c03_m01_l03_process_state_machine.png)\n\n*Figure C03-M01-D04: Finite state transition diagram of OS processes showing Ready, Running, Blocked/Waiting, Terminated, and Zombie states.*\n\nLESSON C03-M01-L03: Processes and threads\n=========================================\n\n2.3.1 Definitions\n  Program   An executable file on disk (for example /usr/bin/ls or\n            C:\\Windows\\System32\\notepad.exe).\n  Process   A running instance of a program: its own virtual address space,\n            open files/handles, security identity (user), environment and\n            one or more threads.\n  Thread    A unit of execution within a process; threads share the\n            process's memory. The scheduler assigns threads to CPU cores.\n  PID       Process identifier, a number unique among currently running\n            processes (reused after a process ends).\n  PPID      Parent process identifier: the process that created this one.\n\n2.3.2 Creating processes\n  Linux     A process calls fork() (or clone()) to create a copy of itself,\n            and the child usually calls execve() to replace its program with\n            a new one. The first user-space process (PID 1) is the init\n            system - systemd on most distributions.\n  Windows   CreateProcess creates a new process directly. The System process\n            (PID 4) hosts kernel threads; the Session Manager (smss.exe)\n            starts early user-mode components.\n\n2.3.3 Real process trees (execution-tested)\nWindows 11, Windows PowerShell 5.1:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  $f = \"Name='services.exe' or Name='lsass.exe' or Name='wininit.exe' or Name='smss.exe'\"\n  Get-CimInstance Win32_Process -Filter $f |\n      Select-Object Name, ProcessId, ParentProcessId\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Name         ProcessId ParentProcessId\n  ----         --------- ---------------\n  smss.exe          1012               4\n  wininit.exe       1644            1264\n  services.exe      1716            1644\n  lsass.exe         1744            1644\n  --------------------------------------------------------------- END OUTPUT\n\nInterpretation:\n  - smss.exe's parent is PID 4 (System).\n  - wininit.exe's parent PID 1264 no longer exists: during boot, smss starts\n    a temporary copy of itself for the session, which launches wininit and\n    then exits. A missing parent is therefore normal for wininit.\n  - services.exe (Service Control Manager) and lsass.exe (Local Security\n    Authority, which handles authentication) are children of wininit.exe.\n  Security relevance: knowing the normal parent-child relationships of core\n  Windows processes lets analysts spot anomalies - for example a second\n  \"lsass.exe\" running from an unusual path or with an unexpected parent is\n  a classic indicator worth investigating (Course 08). PIDs differ on every\n  boot.\n\nLinux (Debian 13 container; only a few processes exist inside a container):\n\n  ---------------------------------------------------------------- BEGIN CODE\n  ps -eo pid,ppid,user,stat,comm\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n    PID  PPID USER     STAT COMMAND\n      1     0 root     Ss   sh\n     10     1 root     R    ps\n  --------------------------------------------------------------- END OUTPUT\n\n  -e        all processes\n  -o ...    choose columns: PID, parent PID, user, state, command name\n  STAT      S = sleeping (waiting), R = running, s = session leader,\n            Z = zombie (finished but not yet collected by its parent),\n            D = uninterruptible sleep (usually waiting on I/O).\nIn a container, PID 1 is whatever command started the container (here a\nshell); on a full system it is systemd.\n\n2.3.4 The /proc file system (Linux)\nLinux exposes kernel information about processes as files under /proc. For\nexample (execution-tested in the Debian 13 container):\n\n  ---------------------------------------------------------------- BEGIN CODE\n  grep -E \"^(Name|State|PPid|Uid|VmRSS|Threads)\" /proc/1/status\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Name:   sh\n  State:  S (sleeping)\n  PPid:   0\n  Uid:    0       0       0       0\n  VmRSS:      1836 kB\n  Threads:        1\n  --------------------------------------------------------------- END OUTPUT\n\n  Uid    Real, effective, saved and filesystem user IDs (0 = root).\n  VmRSS  Resident set size: physical memory currently used.\n/proc/<pid>/cmdline holds the full command line, /proc/<pid>/exe links to\nthe executable, and /proc/<pid>/fd lists open files - all valuable during\ninvestigations. The proc(5) manual page documents these files\n[C03-M01-R4].\n\n2.3.5 Scheduling and priority\nThe scheduler shares CPU time between runnable threads. Linux uses \"nice\"\nvalues (-20 highest priority to 19 lowest) and the current default\nscheduler (EEVDF in recent kernels); Windows uses priority classes and\nlevels. Administrators adjust priority with nice/renice (Linux) or Task\nManager/PowerShell (Windows).\n\n2.3.6 Signals and termination\n  Linux    Signals notify processes: SIGTERM (15) asks a process to exit\n           cleanly; SIGKILL (9) forces termination and cannot be caught;\n           SIGHUP (1) often means \"reload configuration\". Commands: kill,\n           pkill.\n  Windows  Stop-Process / taskkill end processes; services are stopped via\n           the Service Control Manager.\n\n2.3.7 Process identity and privilege\nEvery process runs with a security identity:\n  Linux    UID/GID plus capabilities (fine-grained root powers such as\n           CAP_NET_ADMIN, which the Course 02 routing lab granted to a\n           container).\n  Windows  An access token containing the user's security identifier (SID),\n           group SIDs, privileges and an integrity level (Module 5).\nChild processes normally inherit the parent's identity, which is why a\ncompromised browser cannot directly modify system files - unless it runs\nas an administrator.\n\n\n![C03-M01-D05: Comparative Process Trees: Linux systemd (PID 1) vs. Windows Core Architecture](/assets/courses/cyber-03/c03_m01_l03_process_trees_linux_windows.png)\n\n*Figure C03-M01-D05: Side-by-side hierarchical process ancestry trees for Linux (systemd PID 1) and Windows NT (System PID 4, smss.exe, csrss.exe, services.exe, lsass.exe).*\n\n"
    },
    {
      "id": "les_c3_m1_l4",
      "title": "1.4 Memory Management: Virtual Addressing, Paging & Exploit Mitigations (ASLR & DEP/NX)",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Virtual Addressing, Paging & Exploit Mitigations (ASLR & DEP/NX).",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Virtual Addressing, Paging & Exploit Mitigations (ASLR & DEP/NX).",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l4_c03_m01_d06",
          "title": "C03-M01-D06: Virtual Memory Architecture: Page Tables, Paging & Physical RAM Mapping",
          "url": "/assets/courses/cyber-03/c03_m01_l04_virtual_memory_paging.png",
          "caption": "Figure C03-M01-D06: Multi-level page table translation mapping a 48-bit virtual address through PML4, Page Directory, and Page Table to a 4 KB physical RAM frame.",
          "alt": "Diagram of multi-level virtual memory translation showing virtual address bits, page table directory walk, and physical memory frames"
        },
        {
          "id": "img_c3_m1_l4_c03_m01_d07",
          "title": "C03-M01-D07: Exploit Mitigations in Memory: ASLR Layout Randomization & DEP/NX Bit",
          "url": "/assets/courses/cyber-03/c03_m01_l04_aslr_dep_mitigations.png",
          "caption": "Figure C03-M01-D07: Memory protection mechanisms: Address Space Layout Randomization (ASLR) shifting stack/heap/code bases, and Data Execution Prevention (DEP/NX) enforcing W^X.",
          "alt": "Diagram illustrating ASLR randomization of memory bases and DEP/NX bit enforcing Write XOR Execute"
        }
      ],
      "content": "## 1.4 Memory Management: Virtual Addressing, Paging & Exploit Mitigations (ASLR & DEP/NX)\n\n![C03-M01-D06: Virtual Memory Architecture: Page Tables, Paging & Physical RAM Mapping](/assets/courses/cyber-03/c03_m01_l04_virtual_memory_paging.png)\n\n*Figure C03-M01-D06: Multi-level page table translation mapping a 48-bit virtual address through PML4, Page Directory, and Page Table to a 4 KB physical RAM frame.*\n\nLESSON C03-M01-L04: Memory management\n=====================================\n\n2.4.1 Virtual memory\nEach process sees its own private virtual address space. The memory\nmanagement unit (MMU) in the CPU, programmed by the kernel, translates\nvirtual addresses to physical RAM in fixed-size pages (commonly 4 KiB). This\ngives:\n  - Isolation: one process cannot read another's memory unless the kernel\n    allows sharing.\n  - Flexibility: processes can use more memory than physically present,\n    with less-used pages moved to disk (swap on Linux, the page file on\n    Windows).\n  - Sharing: read-only code of common libraries is shared between processes.\n\n2.4.2 Seeing memory (execution-tested)\nLinux: free -h and /proc/meminfo (Debian 13 container on a WSL2 kernel):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n                 total        used        free      shared  buff/cache   available\n  Mem:           7.6Gi       803Mi       6.4Gi       3.7Mi       639Mi       6.8Gi\n  Swap:          2.0Gi          0B       2.0Gi\n  --------------------------------------------------------------- END OUTPUT\n\n\"available\" estimates memory that can be given to new programs without\nswapping, including reclaimable cache - a better guide than \"free\". Linux\nuses spare RAM as file cache, so low \"free\" memory is normal.\n\nWindows: Get-Process lists working set (physical memory in use) per process.\nOn the content team's laptop the largest was vmmemWSL (the WSL2 virtual\nmachine) at about 1.5 GB, followed by \"Memory Compression\", a Windows\nmechanism that compresses pages in RAM before writing them to the page file.\n\n2.4.3 Process memory layout\nA process's address space contains regions for program code (text),\ninitialised and uninitialised data, the heap (dynamic allocations), stacks\n(one per thread), memory-mapped files and shared libraries. On Linux,\n/proc/<pid>/maps lists regions with permissions:\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  642555848000-64255584a000 r--p 00000000 08:30 1260230   /usr/bin/head\n  64255584a000-642555851000 r-xp 00002000 08:30 1260230   /usr/bin/head\n  642555854000-642555855000 r--p 0000b000 08:30 1260230   /usr/bin/head\n  642555855000-642555856000 rw-p 0000c000 08:30 1260230   /usr/bin/head\n  --------------------------------------------------------------- END OUTPUT\n  (execution-tested; addresses differ on every run - see ASLR below;\n  spacing compressed)\n\nPermissions r (read), w (write), x (execute), p (private). Notice that the\nexecutable code region is r-x (readable and executable, not writable) and\nthe data region is rw- (writable, not executable).\n\n2.4.4 Memory protections\n  W^X / DEP / NX   Memory should be writable or executable, not both. CPUs\n                   provide a no-execute bit; Windows calls the protection\n                   Data Execution Prevention (DEP). This blocks a classic\n                   technique of placing code in a data buffer and running\n                   it.\n  ASLR             Address Space Layout Randomisation places code, libraries,\n                   heap and stack at unpredictable addresses each run, making\n                   memory-corruption exploits harder. The maps output above\n                   shows randomised high addresses.\n  Stack canaries,  Compiler and OS mitigations that detect or prevent\n  CFG/CET          control-flow hijacking (Control Flow Guard and hardware\n                   shadow stacks on Windows; similar features on Linux).\nWindows Exploit Protection lets administrators view and configure these\nmitigations system-wide and per program [C03-M01-R5]. Memory-safety bugs\nremain a major source of vulnerabilities, which is why secure coding\n(Course 12) and memory-safe languages matter.\n\n2.4.5 Memory and investigations\nBecause running processes, network connections and some credentials exist\nonly in RAM, incident responders may capture memory before powering off a\nsystem (Course 09 Module 4).\n\n\n![C03-M01-D07: Exploit Mitigations in Memory: ASLR Layout Randomization & DEP/NX Bit](/assets/courses/cyber-03/c03_m01_l04_aslr_dep_mitigations.png)\n\n*Figure C03-M01-D07: Memory protection mechanisms: Address Space Layout Randomization (ASLR) shifting stack/heap/code bases, and Data Execution Prevention (DEP/NX) enforcing W^X.*\n\n\n\n:::math-steps\n### Virtual Memory Address Translation & Page Table Indexing\nCalculating the physical page frame and offset for a 48-bit canonical virtual address ($0x0000\\,7FFF\\,5FC0\\,1040$) on x86-64 hardware.\n\n#### Step 1: 4 KB Page Frame Offset Calculation\nEvery physical page frame is 4 KB ($4096 = 2^{12}$ bytes). The lowest 12 bits of the virtual address dictate the byte offset within the page:\n$$\\text{Offset} = \\text{Virtual Address} \\pmod{4096} = 0x040_{16} = 64_{10}$$\n\n#### Step 2: Virtual Page Number (VPN) Extraction\nDividing the address by 4096 isolates the 36-bit Virtual Page Number:\n$$\\text{VPN} = \\lfloor \\frac{0x7FFF5FC01040}{4096} \\rfloor = 0x7FFF5FC01_{16}$$\n\n#### Step 3: Multi-Level Page Directory Traversal\nEach 9-bit slice maps to one level of the 4-level page table hierarchy (PML4, PDPT, PD, PT):\n$$\\text{PML4 Index} = (\\text{VPN} \\gg 27) \\land 0x1FF = 255_{10}$$\n$$\\text{PDPT Index} = (\\text{VPN} \\gg 18) \\land 0x1FF = 511_{10}$$\n$$\\text{PD Index} = (\\text{VPN} \\gg 9) \\land 0x1FF = 382_{10}$$\n$$\\text{PT Index} = \\text{VPN} \\land 0x1FF = 1_{10}$$\n\n#### Step 4: Physical Address Synthesis\nThe CPU hardware adds the 12-bit offset to the physical base address retrieved from the final Page Table Entry:\n$$\\text{Physical Address} = (\\text{PFN} \\times 4096) + \\text{Offset}$$\n:::\n\n"
    },
    {
      "id": "les_c3_m1_l5",
      "title": "1.5 The Boot Process: UEFI, Shim, Secure Boot Verification & Kernel Initialization",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of UEFI, Shim, Secure Boot Verification & Kernel Initialization.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of UEFI, Shim, Secure Boot Verification & Kernel Initialization.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l5_c03_m01_f2",
          "title": "C03-M01-F2: Boot Chains Compared: UEFI Secure Boot, Shim & Kernel Hand-off",
          "url": "/assets/courses/cyber-03/C03-M01-F2.png",
          "caption": "Figure C03-M01-F2: Linux and Windows boot chains from UEFI firmware to the service manager, with Secure Boot cryptographic verification and TPM 2.0 measurement.",
          "alt": "Diagram comparing Linux and Windows boot chains with UEFI Secure Boot signatures and TPM measurements"
        },
        {
          "id": "img_c3_m1_l5_c03_m01_d08",
          "title": "C03-M01-D08: Secure Boot Cryptographic Key Hierarchy: PK, KEK, db & dbx Revocation",
          "url": "/assets/courses/cyber-03/c03_m01_l05_uefi_key_hierarchy.png",
          "caption": "Figure C03-M01-D08: UEFI Secure Boot trust hierarchy showing Platform Key (PK), Key Exchange Key (KEK), Allowed Signatures Database (db), and Revocation List (dbx).",
          "alt": "Hierarchy diagram showing UEFI PK, KEK, db allowed database, and dbx revoked binary hash database"
        }
      ],
      "content": "## 1.5 The Boot Process: UEFI, Shim, Secure Boot Verification & Kernel Initialization\n\n![C03-M01-F2: Boot Chains Compared: UEFI Secure Boot, Shim & Kernel Hand-off](/assets/courses/cyber-03/C03-M01-F2.png)\n\n*Figure C03-M01-F2: Linux and Windows boot chains from UEFI firmware to the service manager, with Secure Boot cryptographic verification and TPM 2.0 measurement.*\n\nLESSON C03-M01-L05: The boot process\n====================================\n\n2.5.1 Firmware: BIOS and UEFI\nWhen powered on, the CPU runs firmware stored on the motherboard. Legacy\nBIOS has largely been replaced by UEFI (Unified Extensible Firmware\nInterface), which initialises hardware, then loads a boot loader from an EFI\nSystem Partition (ESP) on disk.\n\n2.5.2 Secure Boot and measured boot\n  UEFI Secure Boot   Firmware verifies digital signatures of the boot loader\n                     (and the boot loader verifies the next stage) against\n                     trusted keys stored in firmware, so unsigned or tampered\n                     boot code is refused [C03-M01-R6].\n  Measured boot      Each stage records a cryptographic hash of the next stage\n  (TPM)              into a Trusted Platform Module (TPM). The measurements\n                     can be checked later (attestation) or used to protect\n                     secrets - for example BitLocker can release its key only\n                     if measurements match.\nBoth defend against bootkits - malware that runs before the OS and can hide\nfrom it. Neither helps if signed but vulnerable boot components remain\ntrusted, which is why revocation updates (the Secure Boot forbidden\nsignature database, \"dbx\") matter.\n\n2.5.3 Linux boot sequence\n  1. UEFI firmware loads the boot loader (on many distributions a small\n     signed \"shim\", then GRUB 2; or systemd-boot).\n  2. The boot loader loads the Linux kernel image and an initial RAM file\n     system (initramfs) containing drivers needed to mount the real root\n     file system.\n  3. The kernel initialises hardware, mounts the root file system and starts\n     PID 1 - systemd on most modern distributions.\n  4. systemd starts units in dependency order until it reaches the default\n     target (for example multi-user.target for servers or graphical.target\n     for desktops).\nExecution-tested on Ubuntu 26.04 LTS (WSL2): systemctl get-default returned\ngraphical.target, and systemd-analyze reported \"Startup finished in 1.191s\n(userspace)\" (WSL2 skips firmware and boot loader stages, so only user-space\ntime is shown).\n\n2.5.4 Windows boot sequence\n  1. UEFI firmware loads the Windows Boot Manager (bootmgfw.efi) from the\n     ESP, which reads the Boot Configuration Data (BCD).\n  2. The Windows OS Loader (winload.efi) loads the kernel (ntoskrnl.exe),\n     the hardware abstraction layer and boot-start drivers. Early Launch\n     Anti-Malware (ELAM) drivers can start before other drivers to vet them.\n  3. The kernel initialises and starts the Session Manager (smss.exe).\n  4. smss starts wininit.exe (session 0, services) and csrss/winlogon for\n     user sessions.\n  5. wininit starts services.exe (Service Control Manager) and lsass.exe.\n  6. winlogon presents the sign-in screen; after authentication, the user's\n     shell (explorer.exe) starts.\nMicrosoft documents the secured boot process, including Secure Boot, Trusted\nBoot, ELAM and Measured Boot [C03-M01-R6]. This sequence is why the process\ntree in L03 looks the way it does.\n\n2.5.5 Security checkpoints during boot\n  - Firmware passwords and settings protection.\n  - Secure Boot enabled with current revocation lists.\n  - Full-disk encryption (BitLocker, LUKS) with TPM.\n  - Restricting boot from removable media.\n  - Logging boot events (Windows event logs; Linux journal).\n\n\n![C03-M01-D08: Secure Boot Cryptographic Key Hierarchy: PK, KEK, db & dbx Revocation](/assets/courses/cyber-03/c03_m01_l05_uefi_key_hierarchy.png)\n\n*Figure C03-M01-D08: UEFI Secure Boot trust hierarchy showing Platform Key (PK), Key Exchange Key (KEK), Allowed Signatures Database (db), and Revocation List (dbx).*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: A SERVICE LIFECYCLE FROM CREATION TO REMOVAL\n--------------------------------------------------------------------------------\n\n3.1 Lab (execution-tested)\nScript: LAB_ASSETS/C03/rk_c03_service_lab.sh. Environment: Ubuntu 26.04 LTS\non WSL2, systemd 259, run as root with sudo on a system you administer.\n\n3.2 The unit file\n\n  ---------------------------------------------------------------- BEGIN CODE\n  [Unit]\n  Description=RedKross demo service (course lab)\n  After=network.target\n\n  [Service]\n  Type=simple\n  ExecStart=/bin/sh -c 'while true; do echo \"rk-demo heartbeat\"; sleep 5; done'\n  Restart=on-failure\n  User=nobody\n\n  [Install]\n  WantedBy=multi-user.target\n  ------------------------------------------------------------------ END CODE\n\nLine by line:\n  [Unit] Description    Human-readable name shown in status and logs.\n  After=network.target  Ordering: start after basic networking is set up\n                        (ordering only - it does not create a dependency).\n  [Service] Type=simple The process started by ExecStart is the main\n                        process.\n  ExecStart=...         The command to run: a loop writing a heartbeat line\n                        every 5 seconds. Standard output goes to the journal.\n  Restart=on-failure    Restart the service if it exits abnormally (for\n                        example killed by a signal).\n  User=nobody           Run as the unprivileged \"nobody\" account rather than\n                        root - least privilege.\n  [Install] WantedBy=   If enabled, start as part of multi-user.target at\n                        boot. (The lab does not enable it, so it will not\n                        survive a reboot.)\n\n3.3 The lifecycle and observed output (exact)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  * rk-demo.service - RedKross demo service (course lab)\n       Loaded: loaded (/etc/systemd/system/rk-demo.service; disabled; preset: enabled)\n       Active: active (running) since Sat 2026-11-07 02:14:52 GMT; 6s ago\n     Main PID: 479 (sh)\n        Tasks: 2 (limit: 9329)\n       Memory: 1.5M (peak: 2.1M)\n       CGroup: /system.slice/rk-demo.service\n  == is-active: active / is-enabled: disabled\n  == journal\n  2026-11-07T02:14:52+00:00 rk-host systemd[1]: Started rk-demo.service - RedKross demo service (course lab).\n  2026-11-07T02:14:52+00:00 rk-host sh[479]: rk-demo heartbeat\n  2026-11-07T02:14:57+00:00 rk-host sh[479]: rk-demo heartbeat\n  == killing main process to test Restart=on-failure\n  NRestarts=1\n  state: active\n  == after stop: inactive\n  == removed: 0 unit files remain\n  --------------------------------------------------------------- END OUTPUT\n  (The status line's leading bullet character is shown as \"*\"; some lines\n  omitted for width; the machine's hostname is shown as rk-host.)\n\nWhat happened:\n  1. systemctl daemon-reload made systemd read the new unit file.\n  2. systemctl start launched the process (PID 479) in its own control group\n     (cgroup) - the kernel feature systemd uses to track every process a\n     service creates and to apply resource limits.\n  3. \"disabled\" means it would not start at boot; \"preset: enabled\" is the\n     distribution's default policy for new units.\n  4. The journal shows systemd starting the unit and the service's own\n     output, each with timestamps and PIDs - the same structure analysts\n     read during investigations.\n  5. Killing the main process with SIGKILL counted as a failure, so systemd\n     restarted it (NRestarts=1) - an availability feature, and also a\n     reminder that simply killing a malicious process may not be enough if\n     something restarts it.\n  6. Stop, removal and daemon-reload returned the system to its original\n     state.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M01-P1: Map the process tree and core services on your own\ncomputer\n------------------------------------------------------------------------\nObjective: Identify core OS processes, their parents and accounts, and\nservices' start types and accounts.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell 5.1 (Windows) and/or a Linux shell.\n\nPrerequisites: Lessons L03 and L06.\n\nEnvironment setup: your own computer, standard user PowerShell.\n\nExplicit authorised scope: your own computer only. These commands are\nread-only.\n\nStep-by-step instructions (Windows):\n  1. Run the Win32_Process command from L03 and record PIDs and parents of\n     smss, wininit, services and lsass.\n  2. Run: Get-CimInstance Win32_Process -Filter \"Name='svchost.exe'\" |\n     Measure-Object  and record how many svchost processes run.\n  3. Run: Get-CimInstance Win32_Service | Group-Object StartName |\n     Sort-Object Count -Descending | Select-Object Count, Name\n     and record how many services run as LocalSystem, LocalService and\n     NetworkService.\n  4. Pick three services and run sc.exe qc <name> for each; record start\n     type, binary path and account.\nStep-by-step instructions (Linux):\n  5. Run: ps -eo pid,ppid,user,comm --forest | head -40 (procps ps; Not\n     execution-tested with --forest by the content team) and identify PID 1.\n  6. Run: systemctl list-units --type=service --state=running and pick three\n     services; run systemctl status <name> and record the account (look for\n     the User= setting with systemctl show -p User <name>).\n\nExpected observations: Windows runs many svchost instances and a large share\nof services as LocalSystem; Linux shows systemd as PID 1 with services as\nchildren. On the content team's Windows 11 laptop (execution-tested) there\nwere 95 svchost.exe processes, and Win32_Service reported 183 services\nconfigured as LocalSystem, 69 as NT AUTHORITY\\LocalService, 21 as NT\nAuthority\\NetworkService and 27 with no account listed (for example\nper-user service templates). Your numbers will differ.\n\nExplanation of results: the counts show how much privileged code runs in the\nbackground - a reason to disable unneeded services.\n\nTroubleshooting: if Win32_Service queries are slow, wait; they enumerate\nevery service. If ps lacks --forest (BusyBox), use pstree if installed.\n\nCleanup: none (read-only).\n\nLearning outcome: you can describe what runs on a system and with what\nprivilege.\n\nPRACTICAL C03-M01-P2: Run the systemd service lifecycle lab\n-----------------------------------------------------------\nObjective: Create, observe, stress and remove a service safely.\n\nDifficulty: Beginner.\n\nRequired tools: a Linux system with systemd that you administer (WSL2 Ubuntu\nwith systemd, a VM or a lab machine); the script\nLAB_ASSETS/C03/rk_c03_service_lab.sh.\n\nPrerequisites: Lesson L06; deep dive section 3.\n\nEnvironment setup: copy the script to the Linux system. On WSL2 you can\nreach Windows files under /mnt/c/.\n\nExplicit authorised scope: a Linux system you own or administer. The script\ncreates and removes only rk-demo.service.\n\nStep-by-step instructions:\n  1. Read the script fully before running it (good practice for any script\n     you run as root).\n  2. Run: sudo sh rk_c03_service_lab.sh\n  3. Compare your output with section 3.3.\n  4. Edit the unit section to set Restart=no; run again; explain what\n     changes after the kill step.\n  5. Optional: add the hardening options NoNewPrivileges=yes and\n     ProtectSystem=strict to the [Service] section, run again, and confirm\n     the service still works. Look up both options in the systemd.exec(5)\n     manual page and explain them.\n\nExpected observations: step 3 matches section 3.3 (PIDs and times differ).\nWith Restart=no the service remains failed/inactive after the kill.\n\nExplanation: restart policy is an availability control; sandboxing options\nreduce what a compromised service can do.\n\nTroubleshooting:\n  - \"System has not been booted with systemd\": enable systemd in WSL by\n    adding [boot] systemd=true to /etc/wsl.conf and restarting WSL\n    (documented by Microsoft for WSL), or use a VM.\n  - If the script stops midway, remove the unit manually: sudo rm\n    /etc/systemd/system/rk-demo.service && sudo systemctl daemon-reload.\n\nCleanup: the script removes the unit; confirm with systemctl status rk-demo\n(it should report the unit could not be found).\n\nLearning outcome: you can manage a service's full lifecycle and read its\nlogs.\n\n--------------------------------------------------------------------------------\n\n"
    },
    {
      "id": "les_c3_m1_l6",
      "title": "1.6 Services and Background Daemons: systemd Units & Windows SCM Architecture",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of systemd Units & Windows SCM Architecture.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of systemd Units & Windows SCM Architecture.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m1_l6_c03_m01_f3",
          "title": "C03-M01-F3: Service Lifecycle States: systemd Unit Transitions & Failure Recovery",
          "url": "/assets/courses/cyber-03/C03-M01-F3.png",
          "caption": "Figure C03-M01-F3: A systemd unit moves from loaded to active, restarts on failure if configured (Restart=on-failure), and returns to inactive when stopped.",
          "alt": "State machine diagram showing systemd unit states: inactive, activating, active, deactivating, and failed with automatic restart loops"
        },
        {
          "id": "img_c3_m1_l6_c03_m01_d09",
          "title": "C03-M01-D09: Windows Service Control Manager (services.exe) & svchost Isolation Groups",
          "url": "/assets/courses/cyber-03/c03_m01_l06_windows_scm_svchost_architecture.png",
          "caption": "Figure C03-M01-D09: Windows Service Control Manager architecture illustrating service registry keys, SCM dispatch, and svchost.exe shared process hosting.",
          "alt": "Diagram showing Windows SCM reading registry service entries, dispatching standalone services and svchost shared service groups"
        }
      ],
      "content": "## 1.6 Services and Background Daemons: systemd Units & Windows SCM Architecture\n\n![C03-M01-F3: Service Lifecycle States: systemd Unit Transitions & Failure Recovery](/assets/courses/cyber-03/C03-M01-F3.png)\n\n*Figure C03-M01-F3: A systemd unit moves from loaded to active, restarts on failure if configured (Restart=on-failure), and returns to inactive when stopped.*\n\nLESSON C03-M01-L06: Services and their lifecycle\n================================================\n\n2.6.1 What a service is\nA service (a \"daemon\" in Unix tradition) is a background process that starts\nautomatically, usually without a logged-in user, to provide a function:\nlogging, time synchronisation, web serving, scheduled jobs, security\nagents.\n\n2.6.2 Linux: systemd units\nsystemd manages services as units described in unit files [C03-M01-R7].\nKey concepts:\n  Unit types     .service (processes), .socket, .timer (scheduling, Module\n                 4), .target (groups of units), .mount and more.\n  Locations      /usr/lib/systemd/system (package defaults) and\n                 /etc/systemd/system (administrator overrides - these take\n                 precedence).\n  States         loaded/not-found; active (running), inactive, failed;\n                 enabled (starts at boot) or disabled.\n  Commands       systemctl start | stop | restart | reload | status |\n                 enable | disable | is-active | is-enabled; journalctl -u\n                 <unit> for logs.\n\nRunning services on the content team's Ubuntu system (execution-tested,\nselected lines):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  UNIT                        LOAD   ACTIVE SUB     DESCRIPTION\n  chrony.service              loaded active running chrony, an NTP client/server\n  cron.service                loaded active running Regular background program processing daemon\n  rsyslog.service             loaded active running System Logging Service\n  --------------------------------------------------------------- END OUTPUT\n\n2.6.3 Windows: the Service Control Manager\nThe Service Control Manager (services.exe) starts, stops and monitors\nservices. Each service has [C03-M01-R8]:\n  Start type      Automatic, Automatic (Delayed Start), Manual, Disabled\n                  (and boot/system start for drivers).\n  Account         LocalSystem (very powerful), LocalService, NetworkService,\n                  a virtual service account, a managed service account, or a\n                  named user.\n  Binary path     The executable and arguments; many Windows services run\n                  inside shared svchost.exe host processes.\n  Recovery        Actions on failure (restart, run a program, reboot).\n\nExecution-tested example:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  sc.exe qc EventLog\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  SERVICE_NAME: EventLog\n          TYPE               : 20  WIN32_SHARE_PROCESS\n          START_TYPE         : 2   AUTO_START\n          ERROR_CONTROL      : 1   NORMAL\n          BINARY_PATH_NAME   : C:\\WINDOWS\\System32\\svchost.exe -k LocalServiceNetworkRestricted -p\n          DISPLAY_NAME       : Windows Event Log\n          SERVICE_START_NAME : NT AUTHORITY\\LocalService\n  --------------------------------------------------------------- END OUTPUT\n\n  sc.exe qc     \"query configuration\" of a service (use sc.exe in\n                PowerShell because \"sc\" is an alias for Set-Content).\n  TYPE 20       The service shares a svchost.exe process with others.\n  START_TYPE 2  Starts automatically at boot.\n  SERVICE_START_NAME  The Event Log service runs as the limited LocalService\n                account rather than LocalSystem - least privilege by design.\n\n2.6.4 Service security\n  - Run services with the least-privileged account that works (dedicated\n    accounts, LocalService, systemd User= and sandboxing options such as\n    ProtectSystem= and NoNewPrivileges=).\n  - Disable services that are not needed (attack surface; Course 01 Module 1).\n  - Protect service binaries and configuration from modification by\n    non-administrators: a writable service executable or an unquoted path\n    containing spaces can let a low-privileged user get code run with the\n    service's privileges - a common audit finding (Module 8).\n  - Monitor creation of new services - attackers often install services for\n    persistence (Windows event ID 7045 in the System log, Module 7; systemd\n    unit file changes on Linux).\n\n--------------------------------------------------------------------------------\n\n![C03-M01-D09: Windows Service Control Manager (services.exe) & svchost Isolation Groups](/assets/courses/cyber-03/c03_m01_l06_windows_scm_svchost_architecture.png)\n\n*Figure C03-M01-D09: Windows Service Control Manager architecture illustrating service registry keys, SCM dispatch, and svchost.exe shared process hosting.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M01-CS1: The CrowdStrike Falcon content update, 19 July 2024 -\nwhen kernel-mode code fails\n-------------------------------------------------------------------------\nContext: CrowdStrike Falcon is an endpoint security sensor that includes a\nWindows kernel-mode component.\n\nTechnical problem: CrowdStrike's root cause analysis states that a content\nupdate (Channel File 291) caused a mismatch: the validator checked 21 input\nfields but the sensor's integration code supplied 20 to the content\ninterpreter, which then read beyond the end of its input - an out-of-bounds\nmemory read - and a runtime bounds check was missing [C03-M01-R9].\n\nHow it occurred, in OS terms: the faulting code ran in kernel mode. A memory\nerror in user space normally terminates one program; in kernel mode there is\nno safe way to continue, so Windows stopped with a bug check (\"blue screen\")\nand could enter a boot loop because the faulty component loaded again at\nstart-up.\n\nImpact: Microsoft estimated that 8.5 million Windows devices were affected -\nless than one percent of all Windows machines - but many were in airlines,\nbanks, hospitals and broadcasters, causing widespread disruption\n[C03-M01-R10].\n\nResponse: CrowdStrike reverted the content update; recovery for many devices\nrequired booting into safe mode or the recovery environment and removing the\nfaulty file, sometimes needing BitLocker recovery keys. CrowdStrike reported\nadding bounds checking and further validation, and staged deployment of\ncontent updates.\n\nLessons learned:\n  - Kernel-mode software has the power to stop the whole system; treat its\n    updates with the same change control as OS updates (staged rollout,\n    canary groups).\n  - Recovery plans must include access to encryption recovery keys and\n    out-of-band recovery procedures.\n  - CrowdStrike and its reviewers stated the bug was not exploitable for\n    code execution - an availability failure, not a breach - showing that\n    the CIA triad's \"A\" can be lost through defenders' own tools.\n\nCASE STUDY C03-M01-CS2 (FICTIONAL TEACHING SCENARIO): The backup agent that\nran as LocalSystem\n--------------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: Marigold Insurance Brokers (fictional) installed a backup agent\nservice whose installer configured it to run as LocalSystem from\nC:\\Apps\\Backup Agent\\bin\\agent.exe. The folder permissions allowed all\nauthenticated users to modify files.\n\nProblem: during an internal audit, the security team found that any\nstandard user could replace agent.exe; the next service restart would then\nrun the replacement with LocalSystem privileges.\n\nResponse: permissions were corrected (only Administrators and SYSTEM may\nwrite), the service was reconfigured to run under a dedicated low-privilege\nservice account with only the rights it needed, and service binary\npermissions were added to the hardening checklist.\n\nLessons: services inherit their account's privilege; the security of a\nservice depends on who can modify its binary and configuration.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M01-F1: Kernel space and user space\nPurpose: Show privilege separation and system calls.\n\n  [BEGIN DIAGRAM]\n  USER SPACE (ring 3)  - restricted\n  +----------+  +-----------+  +-------------+  +--------------------+\n  | Browser  |  | Shell     |  | Web server  |  | Security agent UI  |\n  +----+-----+  +-----+-----+  +------+------+  +---------+----------+\n       |  libc / Windows API (kernel32 -> ntdll) |          |\n       +--------------------+--------------------+----------+\n                            | SYSTEM CALLS (controlled entry)\n  ==========================v========================================\n  KERNEL SPACE (ring 0) - full privilege\n  | Scheduler | Memory manager | File systems | Network stack | Security|\n  | Device drivers / kernel modules / kernel-mode security agents     |\n                            |\n                        HARDWARE (CPU, RAM, disk, NIC, TPM)\n  [END DIAGRAM]\n\nCaption: Figure C03-M01-F1. Applications run in restricted user space and\nrequest services from the privileged kernel through system calls; drivers\nrun in kernel space.\nAccessibility description: A layered diagram. The top layer, user space,\ncontains applications that call libraries. Arrows labelled system calls\ncross a boundary into kernel space, which contains scheduler, memory\nmanager, file systems, network stack and security, above a layer of device\ndrivers, above hardware.\n\nFIGURE C03-M01-F2: Boot chains compared\nPurpose: Show Linux and Windows boot stages and trust checks.\n\n  [BEGIN DIAGRAM]\n        LINUX                                 WINDOWS\n  [UEFI firmware]  -- Secure Boot verifies -- [UEFI firmware]\n        |                                          |\n  [shim + GRUB 2]  (or systemd-boot)          [Windows Boot Manager]\n        |                                          |  reads BCD\n  [kernel + initramfs]                        [winload.efi -> ntoskrnl.exe,\n        |                                      HAL, ELAM, boot drivers]\n  [PID 1: systemd]                                 |\n        |                                     [smss.exe]\n  [units -> default.target]                        |\n  (multi-user / graphical)                    [wininit.exe] [winlogon.exe]\n                                                   |\n                                         [services.exe] [lsass.exe]\n  Measured boot: each stage hashed into the TPM (both platforms)\n  [END DIAGRAM]\n\nCaption: Figure C03-M01-F2. Linux and Windows boot chains from UEFI firmware\nto the service manager, with Secure Boot verification and TPM measurement.\nAccessibility description: Two vertical chains. Linux: UEFI, shim and GRUB,\nkernel and initramfs, systemd, then units up to the default target.\nWindows: UEFI, Boot Manager, winload and kernel with ELAM and boot drivers,\nsmss, wininit and winlogon, then services.exe and lsass.exe. A note says\nmeasured boot records each stage in the TPM.\n\nFIGURE C03-M01-F3: Service lifecycle states (systemd)\nPurpose: Show states and transitions from the lab.\n\n  [BEGIN DIAGRAM]\n   [unit file created] --daemon-reload--> [loaded, inactive, disabled]\n                                               |  start\n                                               v\n          stop <------------------------- [active (running)]\n           |                                   |  main process killed\n           v                                   v\n   [inactive] <---- stop ---- [restarting] <- (Restart=on-failure)\n           |                                   |\n           | rm unit + daemon-reload           +--> back to active\n           v\n   [not found]          enable/disable controls start at boot\n  [END DIAGRAM]\n\nCaption: Figure C03-M01-F3. A systemd unit moves from loaded to active,\nrestarts on failure if configured, and returns to inactive when stopped.\nAccessibility description: A state diagram: a created unit becomes loaded\nand inactive after daemon-reload; start makes it active; a killed main\nprocess leads to restarting and back to active; stop leads to inactive;\nremoving the unit leads to not found.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nThe OS manages processes, memory, files, devices, security and networking.\nThe kernel runs in privileged kernel mode (ring 0); applications run in\nuser mode (ring 3) and request services by system calls (Linux libc to\nkernel; Windows API to ntdll to ntoskrnl). Linux is a modular monolithic\nkernel; Windows NT is a hybrid. Drivers and kernel agents are the most\nprivileged third-party code, so signing, blocklists and staged rollouts\nmatter (CrowdStrike 2024: 8.5 million devices). Processes are running\nprograms with PIDs, parents, threads and security identities; core Windows\nprocesses have a predictable tree (System -> smss -> wininit -> services/\nlsass), and Linux starts with PID 1 systemd; /proc exposes process detail.\nVirtual memory gives isolation via pages; protections include W^X/DEP,\nASLR and control-flow mitigations. Boot runs from UEFI firmware with Secure\nBoot signature checks and TPM measured boot through boot loaders to the\nkernel and service manager. Services are managed by systemd units\n(start/stop/enable, Restart=, User=, sandboxing, journal) or the Windows\nService Control Manager (start types, accounts, svchost). Service privilege,\nbinary permissions and new-service creation are key security checks.\n\n8.2 Important concepts\n  - Privilege boundaries: kernel/user, root/user, service accounts.\n  - Normal process trees make anomalies visible.\n  - Memory protections raise the cost of exploitation.\n  - Boot integrity is protected by Secure Boot and measured boot.\n\n8.3 Key technical takeaways\n  - ps -eo, /proc/<pid>/status|maps, free -h; Get-CimInstance\n    Win32_Process; sc.exe qc.\n  - systemctl status/start/stop/enable; journalctl -u.\n  - Use sc.exe (not sc) in PowerShell.\n\n8.4 Glossary\n  ASLR            Address space layout randomisation.\n  cgroup          Linux control group used to track and limit processes.\n  DEP / NX        Non-executable memory protection.\n  ELAM            Early Launch Anti-Malware (Windows boot).\n  initramfs       Initial RAM file system used during Linux boot.\n  Kernel mode     Privileged CPU mode for the kernel and drivers.\n  LocalSystem     Highly privileged Windows service account.\n  PID / PPID      Process ID / parent process ID.\n  Process         Running instance of a program.\n  SCM             Windows Service Control Manager (services.exe).\n  Secure Boot     UEFI signature verification of boot components.\n  System call     Request from user space to the kernel.\n  systemd         Linux init system and service manager (PID 1).\n  Thread          Unit of execution within a process.\n  TPM             Trusted Platform Module.\n  Unit file       systemd configuration file describing a unit.\n  Virtual memory  Per-process address space mapped to physical memory.\n\n8.5 Common mistakes\n  - Running services as root/LocalSystem by default.\n  - Treating low \"free\" memory on Linux as a problem.\n  - Killing suspicious processes before collecting evidence.\n  - Deploying kernel-mode updates everywhere at once.\n  - Typing sc instead of sc.exe in PowerShell.\n\n8.6 Revision questions\n  1. Describe what happens during a system call.\n  2. Draw the normal Windows core process tree.\n  3. Explain how ASLR and DEP work together.\n  4. Compare the Linux and Windows boot sequences.\n  5. Write a hardened systemd unit for a simple service.\n\n8.7 Further reading\n  - Microsoft Learn, \"Secure the Windows boot process\" [C03-M01-R6].\n  - systemd.service(5) and systemd.exec(5) manual pages [C03-M01-R7].\n  - CrowdStrike root cause analysis [C03-M01-R9].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
