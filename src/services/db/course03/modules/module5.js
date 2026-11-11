/**
 * Course 03: Linux and Windows System Administration
 * Module 5: Windows Foundations & Architecture
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module5Data = {
  "id": "mod_c3_5",
  "title": "Module 5: Windows Foundations & Architecture",
  "description": "Internal architecture of the Windows NT executive: user mode vs. kernel mode, the Windows registry hives, Service Control Manager (services.exe), Security Identifiers (SIDs), User Account Control (UAC), access tokens, and NTFS discretionary access control lists (DACLs).",
  "order": 5,
  "quiz": {
    "id": "quiz_mod_c3_5",
    "title": "Module 5: Windows Foundations & Architecture Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m5_001",
        "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
        "difficulty": "difficult",
        "q": "Under Windows User Account Control (UAC), an administrative user logging on interactively receives two access tokens. What are they?",
        "options": [
          "A Filtered Standard Token (Medium Integrity, admin privileges stripped) and a linked Full Administrator Token (High Integrity, dormant until elevated).",
          "A local machine token and an Active Directory Kerberos token stored on the domain controller.",
          "A read-only NTFS token and a read-write registry token.",
          "A temporary guest token and a permanent supervisor token."
        ],
        "correct": 0,
        "explanation": "UAC generates a split token pair: the user operates daily with a restricted Medium-Integrity Filtered Token. The Full Administrator Token is activated only when elevated via a UAC consent prompt."
      },
      {
        "id": "q_c3_m5_002",
        "topic": "Windows Registry Hives, Files & Persistence Keys",
        "difficulty": "medium",
        "q": "Which on-disk file in C:\\Windows\\System32\\config stores the registry hive HKEY_LOCAL_MACHINE\\SAM containing local user account credentials?",
        "options": [
          "C:\\Windows\\System32\\config\\SAM",
          "C:\\Windows\\System32\\config\\SYSTEM",
          "C:\\Users\\Default\\NTUSER.DAT",
          "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx"
        ],
        "correct": 0,
        "explanation": "The HKLM\\SAM hive is backed on disk by C:\\Windows\\System32\\config\\SAM and is locked with exclusive kernel file handles to prevent unauthorized extraction."
      },
      {
        "id": "q_c3_m5_003",
        "topic": "Windows Registry Hives, Files & Persistence Keys",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_004",
        "topic": "Registry Transactions & Write-Ahead Logging",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_005",
        "topic": "Windows Service Architectures & SCM Dispatch",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_006",
        "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_007",
        "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_008",
        "topic": "Security Identifiers (SIDs) & Well-Known Principals",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_009",
        "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_010",
        "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_011",
        "topic": "Windows NT Executive & Kernel Mode Subsystems",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_012",
        "topic": "Windows Core Process Tree & Session 0 Isolation",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_013",
        "topic": "Windows Registry Hives, Files & Persistence Keys",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_014",
        "topic": "Registry Transactions & Write-Ahead Logging",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_015",
        "topic": "Windows Service Architectures & SCM Dispatch",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_016",
        "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_017",
        "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_018",
        "topic": "Security Identifiers (SIDs) & Well-Known Principals",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_019",
        "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      },
      {
        "id": "q_c3_m5_020",
        "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
        "difficulty": "medium",
        "q": "In Windows Security Identifier (SID) architecture, what is the significance of the Relative Identifier (RID) value '500'?",
        "options": [
          "It is universally assigned to the built-in local Administrator account on every Windows endpoint.",
          "It represents the default built-in Guest account across all Windows operating systems.",
          "It designates standard domain user accounts created through Active Directory Users and Computers.",
          "It marks the machine account SID of the local computer on the network."
        ],
        "correct": 0,
        "explanation": "The RID 500 is reserved across all Windows NT operating systems for the built-in local Administrator account (e.g. S-1-5-21-...-500)."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m5_l1",
      "title": "5.1 Windows Architecture: The NT Kernel, Executive Subsystems & Process Ancestry",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of The NT Kernel, Executive Subsystems & Process Ancestry.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of The NT Kernel, Executive Subsystems & Process Ancestry.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l1_c03_m05_f1",
          "title": "C03-M05-F1: Windows NT Architecture Overview: User Mode Subsystems to Executive Kernel",
          "url": "/assets/courses/cyber-03/C03-M05-F1.png",
          "caption": "Figure C03-M05-F1: Windows user-mode components call into the kernel through ntdll; the executive includes the Configuration Manager, Object Manager, and Security Reference Monitor.",
          "alt": "Layered diagram of Windows NT architecture showing user mode applications, subsystem DLLs, ntdll, executive kernel subsystems, and HAL"
        },
        {
          "id": "img_c3_m5_l1_c03_m05_d37",
          "title": "C03-M05-D37: Windows Core System Process Tree: Session 0 vs. User Session 1 Hierarchy",
          "url": "/assets/courses/cyber-03/c03_m05_l01_windows_core_process_tree.png",
          "caption": "Figure C03-M05-D37: Standard Windows boot process hierarchy illustrating Session 0 service isolation (services.exe, lsass.exe) and interactive User Session 1 (explorer.exe).",
          "alt": "Tree hierarchy diagram of core Windows system processes: smss, wininit, services, lsass, and userinit/explorer in separate sessions"
        }
      ],
      "content": "## 5.1 Windows Architecture: The NT Kernel, Executive Subsystems & Process Ancestry\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-F1: Windows NT Architecture Overview: User Mode Subsystems to Executive Kernel](/assets/courses/cyber-03/C03-M05-F1.png)\n\n*Figure C03-M05-F1: Windows user-mode components call into the kernel through ntdll; the executive includes the Configuration Manager, Object Manager, and Security Reference Monitor.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **User-Mode (Ring 3) Subsystem Architecture:** Traces user applications calling high-level Win32 subsystem APIs (in `kernel32.dll`, `user32.dll`, `advapi32.dll`). These DLLs translate requests and call into `ntdll.dll`, the native system service stub library.\n- **Hardware-Enforced Privilege Boundary:** Highlights the transition across the processor privilege boundary via CPU instructions (`syscall` on x64, `sysenter` on x86). This shifts execution from Ring 3 user mode to Ring 0 kernel mode, preventing user code from executing privileged instructions directly.\n- **Windows Executive Subsystems (`ntoskrnl.exe`):** Visualizes core kernel services:\n  - **Object Manager:** Manages uniform system object tracking, handles, reference counts, and the `\\Device`, `\\Driver`, and `\\BaseNamedObjects` namespaces.\n  - **Security Reference Monitor (SRM):** Enforces mandatory and discretionary access checks, validates access tokens against security descriptors, and emits security audit events.\n  - **Configuration Manager:** Manages the in-memory representation and disk persistence of Windows Registry hives.\n  - **Process and Thread Manager:** Schedules threads and allocates memory address spaces.\n  - **I/O Manager & Device Drivers:** Dispatches I/O Request Packets (IRPs) to kernel-mode drivers.\n- **Hardware Abstraction Layer (HAL):** Depicts the lowest kernel layer interfacing directly with the CPU and motherboard chipsets, isolating the Windows kernel from motherboard-specific differences.\n\n### 2.1.1 Editions and versions\n\nWindows client editions (Home, Pro, Enterprise, Education) and Windows\nServer editions share the Windows NT architecture. Features differ: for\nexample, Home cannot join an Active Directory domain and lacks the local\nGroup Policy editor; Enterprise adds advanced security features. Identify a\nsystem's build reliably (execution-tested):\n\n```powershell\nGet-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' |\n      Select-Object ProductName, DisplayVersion, CurrentBuild, EditionID\n```\n\n```terminal\nProductName    : Windows 10 Home Single Language\n  DisplayVersion : 25H2\n  CurrentBuild   : 26200\n  EditionID      : CoreSingleLanguage\n```\n\nNote the trap: this machine runs Windows 11 (build 26200; Windows 11 builds\nare 22000 and higher), yet the registry ProductName value still says\n\"Windows 10\". Microsoft did not update this legacy value. The CIM class\nWin32_OperatingSystem (Module 1) reported \"Microsoft Windows 11 Home Single\nLanguage\" on the same machine. Lesson: verify facts with more than one\nsource, and prefer build numbers.\n\n### 2.1.2 Kernel-mode components\n\n  Kernel (ntoskrnl.exe)  Scheduling, interrupts, synchronisation.\n- **Executive:** Services in the same image: object manager, memory manager, process and thread manager, I/O manager, configuration manager (registry), Security Reference Monitor (enforces access checks).\n  HAL (hal.dll)          Hardware Abstraction Layer.\n- **Drivers:** Device, file system and filter drivers.\n- **win32k.sys:** Kernel part of the windowing and graphics system.\n\n### 2.1.3 User-mode components\n\n- **Environment subsystem:** csrss.exe (Client/Server Runtime Subsystem) per session.\n- **System processes:** smss.exe, wininit.exe, winlogon.exe, services.exe, lsass.exe (Module 1).\n- **lsass.exe:** Local Security Authority Subsystem: authenticates users, enforces local security policy, creates access tokens, and holds credential material in memory - which is why it is heavily protected (L05).\n- **Services:** Background services, many in svchost.exe hosts.\n- **Applications:** User programs using the Windows API (kernel32, user32, advapi32 -> ntdll -> kernel).\n\n### 2.1.4 Sessions\n\nSession 0 hosts services and system processes and has no interactive\ndesktop (\"session 0 isolation\"), which prevents services from interacting\ndirectly with user desktops. Each interactive or Remote Desktop logon gets\nits own session (1, 2, ...) with its own csrss and winlogon.\n\n### 2.1.5 Key system folders\n\n  C:\\Windows\\System32           64-bit system binaries\n  C:\\Windows\\SysWOW64           32-bit system binaries on 64-bit Windows\n  C:\\Windows\\System32\\config    registry hive files\n  C:\\Windows\\System32\\winevt\\Logs  event log files (Module 7)\n  C:\\Program Files, C:\\Program Files (x86)  installed applications\n  C:\\ProgramData                machine-wide application data\n  C:\\Users\\<name>               profiles (AppData\\Local, Roaming,\n                                Desktop, Documents)\nWritable locations such as C:\\Users\\Public, %TEMP% and some ProgramData\nfolders are common places for malware to stage files; executables running\nfrom them deserve scrutiny.\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D37: Windows Core System Process Tree: Session 0 vs. User Session 1 Hierarchy](/assets/courses/cyber-03/c03_m05_l01_windows_core_process_tree.png)\n\n*Figure C03-M05-D37: Standard Windows boot process hierarchy illustrating Session 0 service isolation (services.exe, lsass.exe) and interactive User Session 1 (explorer.exe).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Early Boot Sequence to Kernel Initialization:** Traces the bootstrap workflow from UEFI firmware loading `bootmgr.efi` and `winload.efi` to initialize the kernel (`ntoskrnl.exe`) and load boot-critical storage and filesystem drivers.\n- **Session Manager Subsystem (`smss.exe`):** Highlights the first user-mode process spawned by the kernel. `smss.exe` configures system environment variables, starts the Master Session, defines the paging file, and launches individual session instances.\n- **Session 0 Isolation (Non-Interactive Services):** Details the security architectural boundary introduced in Windows Vista:\n  - Spawns `wininit.exe`, which instantiates the Service Control Manager (`services.exe`), Local Security Authority (`lsass.exe`), and Local Session Manager (`lsm.exe`).\n  - All background services run strictly in Session 0, completely isolated from user desktop interfaces. This mitigates \"Shatter attacks,\" where malicious user-mode processes injected window messages (such as `WM_COMMAND`) into interactive service dialogs to execute arbitrary Ring 0/SYSTEM code.\n- **Session 1+ Interactive Desktop Sessions:** Shows `winlogon.exe`, the Secure Attention Sequence handler, and `logonui.exe` presenting the login prompt. Upon successful authentication, `userinit.exe` runs user group policies and launches `explorer.exe` to present the desktop shell.\n- **Defensive Significance:** Understanding the canonical process tree allows security operations center (SOC) analysts to immediately detect anomalous parent-child relationships, such as `services.exe` or `lsass.exe` spawning interactive command shells (`cmd.exe` or `powershell.exe`)."
    },
    {
      "id": "les_c3_m5_l2",
      "title": "5.2 The Windows Registry: Hives, Keys, On-Disk Files & Persistence Hunting",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Hives, Keys, On-Disk Files & Persistence Hunting.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Hives, Keys, On-Disk Files & Persistence Hunting.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l2_c03_m05_f3",
          "title": "C03-M05-F3: Windows Registry Hives, On-Disk Files & Persistence Locations",
          "url": "/assets/courses/cyber-03/C03-M05-F3.png",
          "caption": "Figure C03-M05-F3: HKLM hives and per-user hives with their on-disk backing files and critical security-relevant persistence locations.",
          "alt": "Diagram mapping Windows registry hives to on-disk files in System32\\config and user profiles, detailing autostart persistence keys"
        },
        {
          "id": "img_c3_m5_l2_c03_m05_d38",
          "title": "C03-M05-D38: Registry Transaction Mechanics: Hive Flush, Transaction Logs (.LOG1, .LOG2) & Forensics",
          "url": "/assets/courses/cyber-03/c03_m05_l02_registry_transactions_forensics.png",
          "caption": "Figure C03-M05-D38: Write-ahead logging in the Windows registry: in-memory cell modification, transaction logging (.LOG1/.LOG2), and atomic hive sync.",
          "alt": "Diagram showing registry in-memory modification, write-ahead logging in .LOG files, and periodic flushing to primary hive files"
        }
      ],
      "content": "## 5.2 The Windows Registry: Hives, Keys, On-Disk Files & Persistence Hunting\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-F3: Windows Registry Hives, On-Disk Files & Persistence Locations](/assets/courses/cyber-03/C03-M05-F3.png)\n\n*Figure C03-M05-F3: HKLM hives and per-user hives with their on-disk backing files and critical security-relevant persistence locations.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Registry Root Hive Architecture:** Details the hierarchical key namespace: `HKEY_LOCAL_MACHINE` (HKLM) governing machine-wide hardware and operating system policies, and `HKEY_USERS` (HKU) maintaining individual user profiles. Symbolic links map convenience root keys, such as `HKEY_CURRENT_USER` (HKCU) resolving to the logged-in user's profile under `HKU\\<User-SID>`.\n- **On-Disk Backing Files:** Maps memory-mapped registry hives to physical system storage:\n  - System hives reside in `C:\\Windows\\System32\\config\\` as raw binary files: `SYSTEM`, `SOFTWARE`, `SAM`, and `SECURITY`.\n  - User hives reside in `C:\\Users\\<Username>\\NTUSER.DAT` (and user class registrations in `UsrClass.dat`).\n- **High-Value Persistence Attack Surfaces:** Visualizes the key locations monitored by EDR and threat hunters:\n  - `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` and `RunOnce` keys.\n  - Active Service entries in `HKLM\\SYSTEM\\CurrentControlSet\\Services\\`.\n  - Winlogon notification packages and Userinit execution paths.\n  - Image File Execution Options (IFEO) debugger hijacks and AppInit_DLLs injection keys.\n- **Privilege Separation & File Locks:** Shows that critical hives (`SAM` and `SECURITY`) maintain exclusive file locks held by the kernel, preventing standard user processes from reading raw NTLM password hashes from disk while the operating system is active.\n\n### 2.2.1 What it is\n\nThe registry is a hierarchical database of configuration for Windows,\ndrivers, services and applications [C03-M05-R1]. It consists of keys (like\nfolders), subkeys, and values (name, type, data).\n\n### 2.2.2 Root keys\n\n  HKEY_LOCAL_MACHINE (HKLM)  machine-wide settings.\n  HKEY_USERS (HKU)           all loaded user profiles, by SID.\n  HKEY_CURRENT_USER (HKCU)   the current user's profile (a view of their key\n                             under HKU).\n  HKEY_CLASSES_ROOT (HKCR)   file associations and COM registration (merged\n                             view of HKLM and HKCU Software\\Classes).\n- **HKEY_CURRENT_CONFIG:** current hardware profile.\n\n### 2.2.3 Hives and files\n\nA hive is a section of the registry stored in a file:\n  HKLM\\SAM        C:\\Windows\\System32\\config\\SAM       local accounts and\n                                                       password hashes\n  HKLM\\SECURITY   ...\\config\\SECURITY                  local security policy\n                                                       and LSA secrets\n  HKLM\\SOFTWARE   ...\\config\\SOFTWARE                  installed software\n                                                       and OS settings\n  HKLM\\SYSTEM     ...\\config\\SYSTEM                    services, drivers,\n                                                       boot configuration\n  HKU\\<SID>       C:\\Users\\<name>\\NTUSER.DAT           per-user settings\nThe SAM and SECURITY hives are restricted even from administrators in normal\ntools; their protection matters because they contain credential material.\n\n### 2.2.4 Value types\n\n- **REG_SZ:** string\n- **REG_EXPAND_SZ:** string with environment variables (%SystemRoot%)\n- **REG_MULTI_SZ:** list of strings\n- **REG_DWORD:** 32-bit number\n- **REG_QWORD:** 64-bit number\n- **REG_BINARY:** raw bytes\n\n### 2.2.5 Tools (execution-tested where shown)\n\n- **regedit:** graphical editor (use with great care).\n  reg query KEY /v NAME   command-line query. Example:\n    reg query \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\EventLog\" /v Start\n    -> Start    REG_DWORD    0x2      (2 = automatic, see L03)\n  PowerShell registry provider: HKLM:\\ and HKCU:\\ drives work with\n    Get-ChildItem, Get-ItemProperty, Set-ItemProperty, New-Item.\n- **reg export KEY file.reg:** back up a key before changing it.\nGolden rule: back up before editing, change one thing, document it, and\nprefer Group Policy or supported tools over manual edits.\n\n### 2.2.6 Security-relevant registry locations\n\n  Autostart (run at logon): HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\n                            and RunOnce; HKLM\\...\\Run and RunOnce.\n                            On the content team's laptop, the user Run key held\n                            10 entries - typical of a personal machine with\n                            several applications; each should be recognised.\n  Services and drivers:     HKLM\\SYSTEM\\CurrentControlSet\\Services\n  UAC configuration:        HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\\n                            Policies\\System (EnableLUA=1 and\n                            ConsentPromptBehaviorAdmin=5 on the test machine -\n                            UAC enabled with consent prompts for\n                            administrators, the default).\n  LSA protection:           HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa,\n                            value RunAsPPL (2 on the test machine; see L05).\nAutostart locations are a classic persistence technique (MITRE ATT&CK\nT1547.001, Registry Run Keys / Startup Folder [C03-M05-R2]). Tools such as\nSysinternals Autoruns enumerate all autostart locations in one view\n[C03-M05-R3].\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D38: Registry Transaction Mechanics: Hive Flush, Transaction Logs (.LOG1, .LOG2) & Forensics](/assets/courses/cyber-03/c03_m05_l02_registry_transactions_forensics.png)\n\n*Figure C03-M05-D38: Write-ahead logging in the Windows registry: in-memory cell modification, transaction logging (.LOG1/.LOG2), and atomic hive sync.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Registry Memory Model (HBINs & Cells):** Illustrates the internal structure of registry hives composed of 4096-byte hive bins (HBINs) containing key cells, value cells, and security descriptor cells.\n- **In-Memory Modification Workflow:** When a process invokes `RegSetValueEx`, the Configuration Manager updates the target cell in non-paged kernel pool memory and immediately marks the parent HBIN as dirty.\n- **Write-Ahead Logging via CLFS (.LOG1 / .LOG2):** Visualizes the durability mechanism. Before flushing changes to the primary hive file on disk, the Configuration Manager writes raw transaction records and dirty cell blocks to transaction log files (e.g., `SYSTEM.LOG1` and `SYSTEM.LOG2`) utilizing Common Log File System (CLFS) sequence numbers.\n- **Atomic Two-Phase Hive Synchronization:** Depicts the periodic flush daemon and clean shutdown sync. The kernel copies verified dirty cells into the master hive file and updates the base block sequence numbers. If a sudden power loss occurs during writing, the boot loader replays the transaction logs to restore hive consistency without corruption.\n- **Forensic Investigation Value:** For incident responders, uncommitted or deleted values often remain recoverable inside `.LOG1` and `.LOG2` transaction journals, enabling reconstruction of adversary persistence mechanisms that were subsequently unlinked from active keys."
    },
    {
      "id": "les_c3_m5_l3",
      "title": "5.3 Windows Services: Service Control Manager, svchost Groups & Privilege Hijacking",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Service Control Manager, svchost Groups & Privilege Hijacking.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Service Control Manager, svchost Groups & Privilege Hijacking.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l3_c03_m05_d39",
          "title": "C03-M05-D39: Windows Service Misconfigurations: Unquoted Service Paths & Insecure Permissions",
          "url": "/assets/courses/cyber-03/c03_m05_l03_unquoted_service_paths.png",
          "caption": "Figure C03-M05-D39: Privilege escalation via unquoted service paths: how CreateProcess searches whitespace-delimited paths to execute malicious binaries.",
          "alt": "Diagram illustrating unquoted service path execution hierarchy and insecure service DACL exploitation"
        },
        {
          "id": "img_c3_m5_l3_c03_m05_d40",
          "title": "C03-M05-D40: Windows Service Account Privilege Matrix: LocalSystem, NetworkService, LocalService & gMSAs",
          "url": "/assets/courses/cyber-03/c03_m05_l03_service_accounts_matrix.png",
          "caption": "Figure C03-M05-D40: Security comparison of Windows built-in service identities, detailing local privileges, network authentication capabilities, and modern gMSA adoption.",
          "alt": "Comparison table diagram contrasting LocalSystem, NetworkService, LocalService, and Group Managed Service Accounts (gMSA)"
        }
      ],
      "content": "## 5.3 Windows Services: Service Control Manager, svchost Groups & Privilege Hijacking\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-D39: Windows Service Misconfigurations: Unquoted Service Paths & Insecure Permissions](/assets/courses/cyber-03/c03_m05_l03_unquoted_service_paths.png)\n\n*Figure C03-M05-D39: Privilege escalation via unquoted service paths: how CreateProcess searches whitespace-delimited paths to execute malicious binaries.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Vulnerable Service Binary Configuration:** Illustrates an insecure service registration in `HKLM\\SYSTEM\\CurrentControlSet\\Services\\<ServiceName>\\ImagePath` where the file path contains whitespace but lacks enclosing literal double quotes (e.g., `C:\\Program Files\\Enterprise Software\\monitor.exe`).\n- **CreateProcess Ambiguity Resolution Pipeline:** Visualizes the sequential path resolution logic executed by the Windows API when an unquoted string with spaces is parsed:\n  1. `C:\\Program.exe` (Checks for binary match before the first space).\n  2. `C:\\Program Files\\Enterprise.exe` (Checks for binary match before the second space).\n  3. `C:\\Program Files\\Enterprise Software\\monitor.exe` (Target legitimate binary).\n- **Adversary Exploitation Vector:** Shows an unprivileged local attacker with write permissions to `C:\\` or `C:\\Program Files\\` dropping a malicious executable named `Program.exe`. When the Service Control Manager restarts or the machine reboots, SCM initiates the service under `NT AUTHORITY\\SYSTEM`, inadvertently launching the attacker's Trojan with full administrative privileges.\n- **Defensive Remediation Invariant:** Demonstrates the correct configuration: enclosing all path strings in literal quotes (`\"C:\\Program Files\\Enterprise Software\\monitor.exe\"`), forcing `CreateProcess` to treat the entire string as a single unambiguous file path.\n\n### 2.3.1 Recap and tools\n\nModule 1 introduced the Service Control Manager (services.exe). Tools:\n- **services.msc:** graphical console\n  Get-Service / Start-Service / Stop-Service / Set-Service (PowerShell)\n  sc.exe query | qc | config | start | stop\n  Get-CimInstance Win32_Service (includes account and path)\nExecution-tested:\n  Get-Service -Name EventLog, Dnscache, Spooler -> all Running, StartType\n  Automatic on the test machine.\n\n### 2.3.2 Configuration in the registry\n\nEach service has a key under HKLM\\SYSTEM\\CurrentControlSet\\Services\\<name>\nwith values including ImagePath (binary), ObjectName (account), and Start:\n  0 Boot, 1 System (drivers), 2 Automatic, 3 Manual, 4 Disabled\nDelayed automatic start is stored separately (DelayedAutostart=1).\n\n### 2.3.3 Service accounts (least privilege)\n\n- **LocalSystem:** very high local privilege; acts as the computer on the network.\n- **LocalService:** minimal local privilege; anonymous on the network.\n- **NetworkService:** minimal local privilege; acts as the computer on the network.\n- **Virtual accounts:** per-service identities (NT SERVICE\\<name>).\n- **Group managed:** domain accounts whose passwords Windows rotates\n- **service accounts:** automatically (Course 13).\nModule 1's practical found 183 services configured as LocalSystem on the test\nmachine - a reminder of how much code runs with high privilege.\n\n### 2.3.4 Service security checks\n\n- Disable services that are not needed (Print Spooler on servers that do\n    not print - see case study).\n- Service binaries, their folders and service registry keys must be\n    writable only by administrators/SYSTEM.\n- Unquoted ImagePath values containing spaces (for example\n    C:\\Program Files\\App Folder\\svc.exe without quotes) can cause Windows to\n    try shorter paths first; if a non-administrator can write to one of\n    those locations, privilege escalation may be possible. Hardening reviews\n    check for unquoted paths with spaces.\n- Monitor new service installation (System log event 7045, Module 7).\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D40: Windows Service Account Privilege Matrix: LocalSystem, NetworkService, LocalService & gMSAs](/assets/courses/cyber-03/c03_m05_l03_service_accounts_matrix.png)\n\n*Figure C03-M05-D40: Security comparison of Windows built-in service identities, detailing local privileges, network authentication capabilities, and modern gMSA adoption.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Built-in Service Identity Hierarchy:** Compares the four primary service account architectures across privilege, isolation, and authentication domains:\n  - **LocalSystem (`NT AUTHORITY\\SYSTEM`):** Grants total local control over the operating system, including `SeDebugPrivilege` and `SeTcbPrivilege`. When connecting to network resources across an Active Directory domain, it presents the computer's machine account credentials (`DOMAIN\\COMPUTER$`).\n  - **NetworkService (`NT AUTHORITY\\NETWORK SERVICE`):** Provides standard user-level local privileges while retaining the ability to authenticate over the network using the computer's Active Directory machine identity.\n  - **LocalService (`NT AUTHORITY\\LOCAL SERVICE`):** Implements least privilege locally and authenticates over the network as an anonymous / null session, providing maximum containment for network-facing daemons.\n  - **Group Managed Service Accounts (gMSA):** Enterprise Active Directory service identities with automatic, cryptographically secure 30-day password rotation managed by the KDS Root Key service.\n- **Credential Storage & Attack Surface Mitigation:** Highlights how gMSAs eliminate hardcoded service passwords in registry hives and configuration files, completely preventing Kerberoasting and credential dump theft against service accounts.\n- **Defensive Invariant:** Custom enterprise daemons must never run as `LocalSystem` unless operating at the kernel driver boundary; adopting `NetworkService`, `LocalService`, or gMSAs enforces strict least-privilege containment."
    },
    {
      "id": "les_c3_m5_l4",
      "title": "5.4 Local Accounts, SIDs & Groups: Security Identifiers, RIDs & Built-in Identities",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Security Identifiers, RIDs & Built-in Identities.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Security Identifiers, RIDs & Built-in Identities.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l4_c03_m05_d41",
          "title": "C03-M05-D41: Anatomy of a Windows Security Identifier (SID): S-1-5-21 Breakdown",
          "url": "/assets/courses/cyber-03/c03_m05_l04_sid_structure_breakdown.png",
          "caption": "Figure C03-M05-D41: Bit-level and textual dissection of a Windows Security Identifier (SID): revision, identifier authority, domain sub-authorities, and Relative Identifier (RID).",
          "alt": "Diagram breaking down a Windows SID: S prefix, revision number, identifier authority, domain sub-authorities, and relative identifier RID"
        },
        {
          "id": "img_c3_m5_l4_c03_m05_d42",
          "title": "C03-M05-D42: Well-Known SIDs & Built-in Security Principals: SYSTEM, Admins & Users",
          "url": "/assets/courses/cyber-03/c03_m05_l04_well_known_sids_taxonomy.png",
          "caption": "Figure C03-M05-D42: Taxonomy of universal well-known Windows SIDs: Everyone (S-1-1-0), Authenticated Users (S-1-5-11), Built-in Administrators (S-1-5-32-544).",
          "alt": "Taxonomy chart of well-known Windows SIDs including Everyone, Interactive, Local System, and Builtin Administrators"
        }
      ],
      "content": "## 5.4 Local Accounts, SIDs & Groups: Security Identifiers, RIDs & Built-in Identities\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-D41: Anatomy of a Windows Security Identifier (SID): S-1-5-21 Breakdown](/assets/courses/cyber-03/c03_m05_l04_sid_structure_breakdown.png)\n\n*Figure C03-M05-D41: Bit-level and textual dissection of a Windows Security Identifier (SID): revision, identifier authority, domain sub-authorities, and Relative Identifier (RID).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Formal SID Syntax Structure:** Deconstructs the string representation of a Windows Security Identifier:\n  $$\\text{S-1-5-21-1234567890-1234567890-1234567890-1001}$$\n  mapping each delimited token to its binary memory layout in the security reference monitor.\n- **Literal Prefix & Revision (`S-1`):** Identifies the string as a Security Identifier (`S`) and indicates the revision level (currently `1` across all modern Windows NT operating systems).\n- **Identifier Authority (`5`):** Specifies the issuing authority governing the identifier. Value `5` denotes `SECURITY_NT_AUTHORITY`, which encompasses all native Windows NT security identities and local/domain authorities.\n- **Domain Sub-Authorities (`21-XXXXX-YYYYY-ZZZZZ`):** Analyzes the enterprise domain or local machine unique identifier. Sub-authority `21` indicates a non-unique local computer or Active Directory domain identifier, followed by three 32-bit cryptographically pseudorandom integers uniquely distinguishing the security realm.\n- **Relative Identifier (RID, `1001`):** Highlights the unique user or group index allocated within the domain:\n  - **RID 500:** Built-in local Administrator account.\n  - **RID 501:** Built-in Guest account.\n  - **RID 512:** Active Directory Domain Admins group.\n  - **RID >= 1000:** Custom user accounts and security groups created by administrators.\n\n### 2.4.1 Local versus domain accounts\n\nLocal accounts exist only on one computer and are stored in its SAM. Domain\naccounts live in Active Directory and can log on to many computers (Course\n13). Microsoft accounts and Entra ID accounts are cloud identities that can\nsign in to Windows.\n\n### 2.4.2 Security identifiers (SIDs)\n\nWindows identifies every security principal (user, group, computer, service)\nby a SID such as S-1-5-21-<three domain or machine numbers>-1001. The final\nnumber is the relative identifier (RID). Names can change; SIDs do not.\nWell-known SIDs and RIDs [C03-M05-R4]:\n- **S-1-5-18:** Local System\n- **S-1-5-19 / -20:** LocalService / NetworkService\n- **RID 500:** built-in Administrator\n- **RID 501:** Guest\n- **RID 503:** DefaultAccount\n- **RID 504:** WDAGUtilityAccount\n- **RID 1000+:** Accounts created later for custom users and groups.\n- **S-1-5-32-544:** BUILTIN\\Administrators group\n- **S-1-5-32-545:** BUILTIN\\Users\n- **S-1-16-8192:** Medium mandatory integrity level (L05)\n\nExecution-tested (machine-specific part of each SID replaced with <domain>):\n\n```terminal\nName               Enabled SID\n  ----               ------- ---\n  Administrator        False S-1-5-21-<domain>-500\n  DefaultAccount       False S-1-5-21-<domain>-503\n  Guest                False S-1-5-21-<domain>-501\n  Mario                 True S-1-5-21-<domain>-1001\n  WDAGUtilityAccount   False S-1-5-21-<domain>-504\n```\n\nThe built-in Administrator and Guest accounts are disabled by default - good\npractice to keep. The human user is RID 1001.\n\n### 2.4.3 Built-in groups\n\n- **Administrators:** full control of the computer.\n- **Users:** standard users.\n- **Remote Desktop Users:** May sign in through RDP.\n- **Backup Operators:** May back up and restore files regardless of permissions (powerful - treat as privileged).\n- **Event Log Readers:** may read event logs (useful for least-privilege monitoring accounts).\nExecution-tested: Get-LocalGroupMember -Group Administrators listed the\ndisabled built-in Administrator and the user Mario. On a personal computer\nthe first user is usually an administrator; in organisations, daily-use\naccounts should be standard users.\n\n### 2.4.4 Managing local accounts (PowerShell; require elevation)\n\n  New-LocalUser, Set-LocalUser, Disable-LocalUser, Remove-LocalUser\n  Add-LocalGroupMember -Group \"Administrators\" -Member name\n  Get-LocalUser / Get-LocalGroupMember (read-only, no elevation needed for\n  listing on the test machine)\nThese cmdlets are in the Microsoft.PowerShell.LocalAccounts module\n[C03-M05-R5].\n\n### 2.4.5 Local administrator password management\n\nIf every computer shares the same local administrator password, one\ncompromised machine exposes all. Windows LAPS (Local Administrator Password\nSolution), built into supported Windows versions, sets a unique, regularly\nrotated password for a local administrator account on each device and\nstores it in Active Directory or Microsoft Entra ID with access control\n[C03-M05-R6].\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D42: Well-Known SIDs & Built-in Security Principals: SYSTEM, Admins & Users](/assets/courses/cyber-03/c03_m05_l04_well_known_sids_taxonomy.png)\n\n*Figure C03-M05-D42: Taxonomy of universal well-known Windows SIDs: Everyone (S-1-1-0), Authenticated Users (S-1-5-11), Built-in Administrators (S-1-5-32-544).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Universal Well-Known SID Taxonomy:** Organizes universal security identifiers hardcoded into the Windows operating system across all regional language localizations:\n  - **Everyone (`S-1-1-0`):** Encompasses all interactive, network, and guest users (excluding anonymous logon in modern hardened configurations).\n  - **Authenticated Users (`S-1-5-11`):** Encompasses any security principal whose credentials have been successfully authenticated by a domain controller or local SAM database (excluding Guest and anonymous sessions).\n  - **Interactive (`S-1-5-4`) & Network (`S-1-5-2`):** Dynamic identity tokens injected into access tokens depending on the logon session type.\n  - **Local System (`S-1-5-18`):** The operating system core service identity.\n- **Built-in Alias Identifiers (`S-1-5-32-XXX`):** Maps well-known local security groups issuing under sub-authority `32` (`SECURITY_BUILTIN_DOMAIN_RID`):\n  - `S-1-5-32-544`: Built-in Administrators group.\n  - `S-1-5-32-545`: Built-in Users group.\n  - `S-1-5-32-555`: Remote Desktop Users group.\n- **Defensive Significance in SIEM & Detection Engineering:** Highlights why detection rules must match well-known SIDs rather than account strings; adversary renames of the \"Administrator\" account to camouflage activity will still retain the immutable SID ending in RID `500` or group SID `S-1-5-32-544`."
    },
    {
      "id": "les_c3_m5_l5",
      "title": "5.5 Tokens, UAC, Privileges & Integrity: Restricted Tokens & Integrity Levels",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Restricted Tokens & Integrity Levels.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Restricted Tokens & Integrity Levels.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l5_c03_m05_f2",
          "title": "C03-M05-F2: Access Check: Security Reference Monitor (SRM), Tokens & Mandatory Integrity Control",
          "url": "/assets/courses/cyber-03/C03-M05-F2.png",
          "caption": "Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Security Reference Monitor (SRM) Dual Evaluation Pipeline:** Visualizes the kernel access validation sequence when a thread opens a handle to a secured kernel object (file, registry key, process, or mutex).\n- **Mandatory Integrity Control (MIC) Check:** Depicts the first security boundary:\n  - SRM compares the thread token's Integrity Level (Untrusted, Low, Medium, High, System) against the object's Mandatory Label.\n  - SRM enforces the \"No Write Up\" invariant: a process with Medium integrity (standard user or browser) is prohibited from acquiring write or modify handles to High-integrity objects (system files or administrative processes), preventing code injection and DLL planting.\n- **Discretionary Access Control (DACL) Evaluation:** Illustrates the four-step algorithmic evaluation of Access Control Entries (ACEs):\n  1. **Explicit Access Denied ACEs:** Evaluated first; if any explicit deny ACE matches the caller's SID and requested access rights, access is immediately DENIED.\n  2. **Explicit Access Allowed ACEs:** Evaluated next to accumulate granted access masks.\n  3. **Inherited Denied ACEs:** Evaluated if requested rights are not yet fully resolved.\n  4. **Inherited Allowed ACEs:** Evaluated last.\n- **Default-Deny Access Decision:** If the end of the DACL is reached before all requested rights are explicitly granted, the SRM terminates evaluation and returns `STATUS_ACCESS_DENIED`.",
          "alt": "Flowchart of Windows SRM access check comparing token SIDs and privileges with object DACL and integrity level"
        },
        {
          "id": "img_c3_m5_l5_c03_m05_d43",
          "title": "C03-M05-D43: User Account Control (UAC) & Filtered Tokens: Standard vs. Elevated Contexts",
          "url": "/assets/courses/cyber-03/c03_m05_l05_uac_filtered_tokens.png",
          "caption": "Figure C03-M05-D43: How User Account Control creates split tokens at logon: a filtered standard user token for daily work and an elevated token activated via consent prompt.",
          "alt": "Diagram illustrating UAC split token creation: full administrative token versus filtered standard token and secure desktop consent prompt"
        }
      ],
      "content": "## 5.5 Tokens, UAC, Privileges & Integrity: Restricted Tokens & Integrity Levels\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-F2: Access Check: Security Reference Monitor (SRM), Tokens & Mandatory Integrity Control](/assets/courses/cyber-03/C03-M05-F2.png)\n\n*Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.*\n\n### 2.5.1 Access tokens\n\nWhen a user logs on, LSASS creates an access token describing their security\ncontext: user SID, group SIDs, privileges and integrity level. Every process\nthe user starts carries a copy; the Security Reference Monitor compares the\ntoken with an object's security descriptor whenever the process requests\naccess [C03-M05-R7].\n\n### 2.5.2 User Account Control (UAC) and the split token\n\nWhen an administrator logs on with UAC enabled, Windows creates two tokens:\na filtered standard-user token used for normal work, and a full\nadministrator token used only after elevation (\"Run as administrator\" and a\nconsent prompt). Evidence from the non-elevated test session:\n- Group list included \"NT AUTHORITY\\Local account and member of\n    Administrators group\" and BUILTIN\\Administrators - but the Administrators\n    group in a filtered token is marked \"deny only\", so it cannot be used to\n    grant access.\n- whoami /priv listed only five privileges, of which only\n    SeChangeNotifyPrivilege was enabled - an elevated administrator token\n    would show many more (for example SeDebugPrivilege,\n    SeTakeOwnershipPrivilege).\nUAC is a convenience and defence-in-depth feature; Microsoft does not\nconsider it a security boundary in the strict sense, so organisations should\nstill use standard accounts for daily work.\n\n### 2.5.3 Privileges (user rights)\n\nPrivileges are system-wide rights assigned through local security policy,\ndistinct from object permissions. Powerful examples: SeDebugPrivilege\n(debug/inspect any process), SeBackupPrivilege and SeRestorePrivilege (read\nor write any file for backup purposes), SeTakeOwnershipPrivilege,\nSeImpersonatePrivilege (common for service accounts), SeLoadDriverPrivilege.\nAccounts holding these should be treated as administrators.\n\n### 2.5.4 Integrity levels (Mandatory Integrity Control)\n\nWindows adds a mandatory label to tokens and objects: Low, Medium, High,\nSystem. A process cannot write to objects at a higher level even if the ACL\nwould allow it. Execution-tested: the session's token included\n\"Mandatory Label\\Medium Mandatory Level\" (S-1-16-8192). Elevated processes run\nat High; browsers sandbox some components at Low or in AppContainers.\n\n### 2.5.5 Protecting LSASS\n\nBecause LSASS holds credential material, Windows offers protections such as\nrunning LSASS as a protected process (RunAsPPL), so that non-protected\nprocesses - even administrators' - cannot read its memory, and Credential\nGuard on supported editions. Microsoft documents the RunAsPPL setting\n[C03-M05-R8]; on the test machine RunAsPPL was set to 2, which Microsoft\ndocuments as LSA protection enabled without a UEFI lock.\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D43: User Account Control (UAC) & Filtered Tokens: Standard vs. Elevated Contexts](/assets/courses/cyber-03/c03_m05_l05_uac_filtered_tokens.png)\n\n*Figure C03-M05-D43: How User Account Control creates split tokens at logon: a filtered standard user token for daily work and an elevated token activated via consent prompt.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Split-Token Generation at Logon:** Traces the logon sequence of an administrative user. When authentication succeeds, LSASS does not issue a single full administrative token. Instead, it generates two linked tokens:\n  - **Full Elevated Token:** Contains full administrative privileges (`SeDebugPrivilege`, `SeTakeOwnershipPrivilege`), enabled group SID `S-1-5-32-544` (Administrators), and a High Integrity Level. This token is held dormant by the LSA.\n  - **Filtered Token (Standard User):** The default operational token. Administrative SIDs are marked with the `SE_GROUP_USE_FOR_DENY_ONLY` attribute, administrative privileges are stripped, and the integrity level is set to Medium.\n- **Daily Interactive Shell Execution:** Shows `explorer.exe` and all subsequent applications spawned by the user executing under the restricted filtered token, confining the blast radius of web browsers, email clients, and downloaded software.\n- **Elevation Request & Secure Desktop Isolation:** Depicts the UAC elevation boundary. When an executable requests administrative privileges (`requireAdministrator` in manifest), the Application Information service (`Appinfo`) invokes `consent.exe` on the Secure Desktop (Session-isolated desktop inaccessible to user-mode keyloggers and malware).\n- **Elevation Outcome:** Upon user approval, the dormant Full Elevated Token is bound to the target process, allowing authorized administrative utilities to execute with High integrity."
    },
    {
      "id": "les_c3_m5_l6",
      "title": "5.6 NTFS Permissions: Security Descriptors, DACLs, ACE Evaluation & Share Overlays",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Security Descriptors, DACLs, ACE Evaluation & Share Overlays.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Security Descriptors, DACLs, ACE Evaluation & Share Overlays.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m5_l6_c03_m05_d44",
          "title": "C03-M05-D44: NTFS Security Descriptors: Owner, Group, DACL & SACL Architecture",
          "url": "/assets/courses/cyber-03/c03_m05_l06_ntfs_security_descriptor.png",
          "caption": "Figure C03-M05-D44: Internal structure of an NTFS Security Descriptor: Control flags, Owner SID, Primary Group SID, Discretionary ACL (permissions), and System ACL (auditing).",
          "alt": "Diagram showing NTFS security descriptor components: control flags, owner SID, group SID, DACL with ACE entries, and SACL with audit entries"
        },
        {
          "id": "img_c3_m5_l6_c03_m05_d45",
          "title": "C03-M05-D45: NTFS vs. Share Permissions: The Most Restrictive Intersection Rule",
          "url": "/assets/courses/cyber-03/c03_m05_l06_ntfs_vs_share_permissions.png",
          "caption": "Figure C03-M05-D45: Permission evaluation over the network: combining SMB Share permissions with underlying NTFS DACLs where the most restrictive permission always wins.",
          "alt": "Venn diagram and logic flow showing effective permissions calculated as the most restrictive intersection of SMB share permissions and NTFS permissions"
        }
      ],
      "content": "## 5.6 NTFS Permissions: Security Descriptors, DACLs, ACE Evaluation & Share Overlays\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M05-D44: NTFS Security Descriptors: Owner, Group, DACL & SACL Architecture](/assets/courses/cyber-03/c03_m05_l06_ntfs_security_descriptor.png)\n\n*Figure C03-M05-D44: Internal structure of an NTFS Security Descriptor: Control flags, Owner SID, Primary Group SID, Discretionary ACL (permissions), and System ACL (auditing).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **NTFS Security Descriptor Binary Header:** Deconstructs the structure of a Windows Security Descriptor protecting NTFS filesystem objects:\n  - **Control Flags:** 16-bit word indicating structural attributes (e.g., `SE_DACL_PRESENT`, `SE_DACL_PROTECTED` to prevent parent inheritance, and `SE_DACL_AUTO_INHERITED`).\n  - **Owner SID Pointer:** Identifies the object creator or assigned owner. Crucially, the owner always possesses implicit `WRITE_DAC` and `READ_CONTROL` rights, allowing them to recover access even if the DACL explicitly denies everyone.\n  - **Primary Group SID Pointer:** Maintained for POSIX subsystem compatibility.\n- **Discretionary Access Control List (DACL):** Points to the ordered array of Access Control Entries (ACEs) defining who is permitted or denied specific file operations (Read Data, Write Data, Append, Delete, Execute).\n- **System Access Control List (SACL):** Details the audit policy array. SACL entries define which access attempts (Success or Failure) generate security event log entries (Windows Event ID 4663) in the Security event channel.\n- **ACE Memory Layout:** Shows the internal structure of individual ACE blocks: `AceType` (Allow, Deny, Audit), `AceFlags` (Container/Object Inherit), `AceSize`, 32-bit `AccessMask`, and the target principal SID.\n\n### 2.6.1 Security descriptors and ACLs\n\nEach NTFS file and folder has a security descriptor containing an owner and\na discretionary access control list (DACL) of access control entries (ACEs).\nEach ACE allows or denies specific rights to a SID. A system ACL (SACL)\ndefines auditing (Module 7). Evaluation order: explicit deny, explicit allow,\ninherited deny, inherited allow - in practice \"deny wins\" among entries at\nthe same level, and no matching allow means no access [C03-M05-R9].\n\n### 2.6.2 Common rights\n\n  Full control (F), Modify (M), Read & execute (RX), Read (R), Write (W),\n  plus special permissions such as Delete, Change permissions, Take\n  ownership.\n\n### 2.6.3 Inheritance\n\nFolders pass ACEs to children according to flags:\n  (OI) object inherit - applies to files\n  (CI) container inherit - applies to subfolders\n  (IO) inherit only - not to the folder itself\n  (I)  this ACE was inherited from a parent\nBreaking inheritance creates islands of permissions that are hard to audit;\nuse it deliberately.\n\n### 2.6.4 Execution-tested icacls example (temporary folder, removed afterwards)\n\n```powershell\n$d = Join-Path $env:TEMP 'rk-acl-lab'; New-Item -ItemType Directory -Path $d -Force\n  icacls $d\n  icacls $d /inheritance:r /grant:r \"$($env:USERNAME):(OI)(CI)F\" \"SYSTEM:(OI)(CI)F\" \"Administrators:(OI)(CI)F\"\n  icacls $d\n  (Get-Acl $d).Access | Select-Object IdentityReference, FileSystemRights, IsInherited\n  Remove-Item $d -Recurse -Force\n```\n\nOutput (exact; computer name shown as RK-HOST):\n\n```terminal\n...\\Temp\\rk-acl-lab NT AUTHORITY\\SYSTEM:(I)(OI)(CI)(F)\n                      BUILTIN\\Administrators:(I)(OI)(CI)(F)\n                      RK-HOST\\Mario:(I)(OI)(CI)(F)\n  Successfully processed 1 files; Failed processing 0 files\n  ...\\Temp\\rk-acl-lab BUILTIN\\Administrators:(OI)(CI)(F)\n                      NT AUTHORITY\\SYSTEM:(OI)(CI)(F)\n                      RK-HOST\\Mario:(OI)(CI)(F)\n  IdentityReference      FileSystemRights IsInherited\n  NT AUTHORITY\\SYSTEM         FullControl       False\n  BUILTIN\\Administrators      FullControl       False\n  RK-HOST\\Mario               FullControl       False\n```\n\nLine by line:\n- **First icacls:** Shows inherited (`I`) entries from the user's profile.\n- **/inheritance:r:** Removes inherited ACEs.\n- **/grant:r:** Grants the listed rights, replacing existing explicit grants for those principals; `(OI)(CI)F` = full control applying to files and subfolders.\n- **Second icacls:** No (`I`) flags: the ACEs are now explicit.\n- **Get-Acl:** The same data as .NET objects, with `IsInherited False`.\nThis pattern - remove inheritance, grant exactly what is needed - is how\nsensitive folders (for example a service's data folder) are locked down.\n\n### 2.6.5 Share permissions versus NTFS permissions\n\nWhen files are accessed over the network through an SMB share, two layers\napply: share permissions (on the share) and NTFS permissions (on the files).\nThe effective access is the more restrictive of the two. Common practice:\nset share permissions broadly (for example Authenticated Users: Change) and\ncontrol access precisely with NTFS permissions, or set both carefully.\n\n### 2.6.6 Least-privilege practices\n\n- Grant permissions to groups, not individuals.\n- Use Modify rather than Full control for users (Full control lets them\n    change permissions).\n- Avoid granting Everyone or Authenticated Users write access to program\n    or service folders.\n- Review effective access (Advanced Security Settings > Effective Access)\n    and audit with icacls /save or PowerShell exports.\n\n## 3. TECHNICAL DEEP DIVE: READING YOUR OWN SECURITY CONTEXT\n\n3.1 Commands (execution-tested, non-elevated Windows PowerShell 5.1)\n\n```powershell\nwhoami /groups /fo csv | ConvertFrom-Csv | Select-Object 'Group Name', Type\n  whoami /priv /fo csv | ConvertFrom-Csv | Select-Object 'Privilege Name', State\n```\n\n- **whoami /groups:** lists group SIDs in the current token.\n- **whoami /priv:** lists privileges and whether each is enabled.\n  /fo csv | ConvertFrom-Csv  turns the text into PowerShell objects that can\n                   be filtered and selected.\n\n3.2 Output (selected, exact)\n\n```terminal\nGroup Name                                                    Type\n  Everyone                                                      Well-known group\n  NT AUTHORITY\\Local account and member of Administrators group Well-known group\n  RK-HOST\\docker-users                                          Alias\n  BUILTIN\\Administrators                                        Alias\n  BUILTIN\\Users                                                 Alias\n  NT AUTHORITY\\INTERACTIVE                                      Well-known group\n  CONSOLE LOGON                                                 Well-known group\n  NT AUTHORITY\\Authenticated Users                              Well-known group\n\n  Privilege Name                State\n  SeShutdownPrivilege           Disabled\n  SeChangeNotifyPrivilege       Enabled\n  SeUndockPrivilege             Disabled\n  SeIncreaseWorkingSetPrivilege Disabled\n  SeTimeZonePrivilege           Disabled\n```\n\n3.3 Interpretation\n- The user is a member of Administrators, but this is the filtered UAC\n    token: few privileges, Medium integrity. Run the same commands in an\n    elevated PowerShell (\"Run as administrator\") to see the difference -\n    many more privileges and \"Mandatory Label\\High Mandatory Level\".\n- INTERACTIVE and CONSOLE LOGON show how the user logged on - such groups\n    let administrators write rules that differ for local and remote logons.\n- docker-users is a local group created by Docker Desktop; software that\n    adds groups and members changes your security configuration and should\n    be documented.\n- Disabled privileges are held but not active; a program must enable them\n    before use - an action EDR products monitor for sensitive privileges.\n\n## 4. REAL-WORLD CASE STUDIES\n\n### CASE STUDY C03-M05-CS1: PrintNightmare and CISA ED 21-04 (July 2021) - disabling a service nobody needed\nContext: the Windows Print Spooler service runs by default on many Windows\nsystems, including servers that never print.\n\nWhat happened: a critical vulnerability in the Print Spooler service,\nCVE-2021-34527 (widely called \"PrintNightmare\"), was disclosed in mid-2021.\nOn 13 July 2021 CISA issued Emergency Directive 21-04 [C03-M05-R10].\n\nRequired actions (per the directive): disable the Print Spooler service on\nall Active Directory domain controllers by 14 July 2021; apply Microsoft's\nJuly 2021 cumulative updates to all Windows servers and workstations by 20\nJuly 2021; on other hosts, disable the service or restrict driver\ninstallation through Group Policy (Point and Print Restrictions) or a\nregistry setting; validate the settings; and ensure newly provisioned systems\nare configured before joining networks. The directive was later closed, with\nremaining requirements moved under CISA's Known Exploited Vulnerabilities\ndirective (BOD 22-01).\n\nLessons learned:\n- Services that are not needed should be disabled - especially on the most\n    sensitive servers such as domain controllers.\n- Services run with high privilege (Print Spooler runs as LocalSystem), so\n    their flaws are high impact.\n- Mitigation can combine service configuration, Group Policy, registry\n    settings and patching (Modules 6-8 show how to apply and verify these at\n    scale).\n\n### CASE STUDY C03-M05-CS2 (FICTIONAL TEACHING SCENARIO): Everyone: Full control\nThis scenario is fictional.\n\nContext: Peacock Finance (fictional) installed an accounting application in\nC:\\AcctApp. To stop permission errors, a technician granted Everyone: Full\ncontrol on the folder. The application's update service, running as\nLocalSystem, executed C:\\AcctApp\\updater.exe.\n\nProblem: any user could replace updater.exe; the next service run executed\nthe replacement as LocalSystem.\n\nResponse: permissions were reset to Administrators and SYSTEM (Full\ncontrol), Users (Read & execute), with a specific Modify grant only on the\napplication's data subfolder; the service account was reviewed; a script to\nfind service binaries in user-writable folders was added to the hardening\naudit (Module 8).\n\nLessons: folder permissions on service and program directories are a\nprivilege boundary; \"Everyone: Full control\" is almost never acceptable.\n\n## 5. PRACTICAL LEARNING\n\n### Technical Mathematical Specification: Windows Security Identifier (SID) Structural Mathematics\n\nWindows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n\n\n![C03-M05-D45: NTFS vs. Share Permissions: The Most Restrictive Intersection Rule](/assets/courses/cyber-03/c03_m05_l06_ntfs_vs_share_permissions.png)\n\n*Figure C03-M05-D45: Permission evaluation over the network: combining SMB Share permissions with underlying NTFS DACLs where the most restrictive permission always wins.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Two-Tier Network Access Control Model:** Depicts an inbound network user connecting to a Windows shared folder over SMB (Server Message Block, port 445). The connection must traverse two distinct, independent authorization checkpoints.\n- **Layer 1: SMB Share Permissions:** Evaluated at the network protocol layer upon mounting the network share (e.g., `\\\\SERVER\\Finance`). Share permissions offer coarse control: Read, Change, and Full Control.\n- **Layer 2: Underlying NTFS Filesystem DACLs:** Evaluated at the local storage driver layer once the SMB service accesses physical files on disk. NTFS provides granular control: Read Attributes, Write Extended Attributes, Delete Subfolders and Files, Modify, and Full Control.\n- **The \"Most Restrictive Wins\" Intersection Invariant:** Formalizes the mathematical access decision:\n  $$\\text{Effective Permission} = \\text{Share Permissions} \\cap \\text{NTFS DACLs}$$\n  - **Scenario A:** Share = Full Control, NTFS = Read Only $\\rightarrow$ Effective Access = **Read Only**.\n  - **Scenario B:** Share = Read Only, NTFS = Full Control $\\rightarrow$ Effective Access = **Read Only**.\n  - **Scenario C:** Share = Change, NTFS = Modify $\\rightarrow$ Effective Access = **Modify**.\n- **Defensive Engineering Best Practice:** Explains enterprise best practice: set SMB Share permissions to \"Authenticated Users: Full Control\" and enforce precise least-privilege access entirely through granular NTFS DACLs, eliminating conflicting dual-layer policy divergence."
    }
  ]
};
