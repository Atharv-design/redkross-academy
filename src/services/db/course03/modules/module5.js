/**
 * Course 03: Linux and Windows System Administration
 * Module 5: Windows Foundations & Architecture
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
      "content": "## 5.1 Windows Architecture: The NT Kernel, Executive Subsystems & Process Ancestry\n\n![C03-M05-F1: Windows NT Architecture Overview: User Mode Subsystems to Executive Kernel](/assets/courses/cyber-03/C03-M05-F1.png)\n\n*Figure C03-M05-F1: Windows user-mode components call into the kernel through ntdll; the executive includes the Configuration Manager, Object Manager, and Security Reference Monitor.*\n\nLESSON C03-M05-L01: Windows architecture\n========================================\n\n2.1.1 Editions and versions\nWindows client editions (Home, Pro, Enterprise, Education) and Windows\nServer editions share the Windows NT architecture. Features differ: for\nexample, Home cannot join an Active Directory domain and lacks the local\nGroup Policy editor; Enterprise adds advanced security features. Identify a\nsystem's build reliably (execution-tested):\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' |\n      Select-Object ProductName, DisplayVersion, CurrentBuild, EditionID\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  ProductName    : Windows 10 Home Single Language\n  DisplayVersion : 25H2\n  CurrentBuild   : 26200\n  EditionID      : CoreSingleLanguage\n  --------------------------------------------------------------- END OUTPUT\n\nNote the trap: this machine runs Windows 11 (build 26200; Windows 11 builds\nare 22000 and higher), yet the registry ProductName value still says\n\"Windows 10\". Microsoft did not update this legacy value. The CIM class\nWin32_OperatingSystem (Module 1) reported \"Microsoft Windows 11 Home Single\nLanguage\" on the same machine. Lesson: verify facts with more than one\nsource, and prefer build numbers.\n\n2.1.2 Kernel-mode components\n  Kernel (ntoskrnl.exe)  Scheduling, interrupts, synchronisation.\n  Executive              Services in the same image: object manager,\n                         memory manager, process and thread manager, I/O\n                         manager, configuration manager (registry), Security\n                         Reference Monitor (enforces access checks).\n  HAL (hal.dll)          Hardware Abstraction Layer.\n  Drivers                Device, file system and filter drivers.\n  win32k.sys             Kernel part of the windowing and graphics system.\n\n2.1.3 User-mode components\n  Environment subsystem  csrss.exe (Client/Server Runtime Subsystem) per\n                         session.\n  System processes       smss.exe, wininit.exe, winlogon.exe, services.exe,\n                         lsass.exe (Module 1).\n  lsass.exe              Local Security Authority Subsystem: authenticates\n                         users, enforces local security policy, creates access\n                         tokens, and holds credential material in memory -\n                         which is why it is heavily protected (L05).\n  Services               Background services, many in svchost.exe hosts.\n  Applications           User programs using the Windows API (kernel32,\n                         user32, advapi32 -> ntdll -> kernel).\n\n2.1.4 Sessions\nSession 0 hosts services and system processes and has no interactive\ndesktop (\"session 0 isolation\"), which prevents services from interacting\ndirectly with user desktops. Each interactive or Remote Desktop logon gets\nits own session (1, 2, ...) with its own csrss and winlogon.\n\n2.1.5 Key system folders\n  C:\\Windows\\System32           64-bit system binaries\n  C:\\Windows\\SysWOW64           32-bit system binaries on 64-bit Windows\n  C:\\Windows\\System32\\config    registry hive files\n  C:\\Windows\\System32\\winevt\\Logs  event log files (Module 7)\n  C:\\Program Files, C:\\Program Files (x86)  installed applications\n  C:\\ProgramData                machine-wide application data\n  C:\\Users\\<name>               profiles (AppData\\Local, Roaming,\n                                Desktop, Documents)\nWritable locations such as C:\\Users\\Public, %TEMP% and some ProgramData\nfolders are common places for malware to stage files; executables running\nfrom them deserve scrutiny.\n\n\n![C03-M05-D37: Windows Core System Process Tree: Session 0 vs. User Session 1 Hierarchy](/assets/courses/cyber-03/c03_m05_l01_windows_core_process_tree.png)\n\n*Figure C03-M05-D37: Standard Windows boot process hierarchy illustrating Session 0 service isolation (services.exe, lsass.exe) and interactive User Session 1 (explorer.exe).*\n\n"
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
      "content": "## 5.2 The Windows Registry: Hives, Keys, On-Disk Files & Persistence Hunting\n\n![C03-M05-F3: Windows Registry Hives, On-Disk Files & Persistence Locations](/assets/courses/cyber-03/C03-M05-F3.png)\n\n*Figure C03-M05-F3: HKLM hives and per-user hives with their on-disk backing files and critical security-relevant persistence locations.*\n\nLESSON C03-M05-L02: The registry\n================================\n\n2.2.1 What it is\nThe registry is a hierarchical database of configuration for Windows,\ndrivers, services and applications [C03-M05-R1]. It consists of keys (like\nfolders), subkeys, and values (name, type, data).\n\n2.2.2 Root keys\n  HKEY_LOCAL_MACHINE (HKLM)  machine-wide settings.\n  HKEY_USERS (HKU)           all loaded user profiles, by SID.\n  HKEY_CURRENT_USER (HKCU)   the current user's profile (a view of their key\n                             under HKU).\n  HKEY_CLASSES_ROOT (HKCR)   file associations and COM registration (merged\n                             view of HKLM and HKCU Software\\Classes).\n  HKEY_CURRENT_CONFIG        current hardware profile.\n\n2.2.3 Hives and files\nA hive is a section of the registry stored in a file:\n  HKLM\\SAM        C:\\Windows\\System32\\config\\SAM       local accounts and\n                                                       password hashes\n  HKLM\\SECURITY   ...\\config\\SECURITY                  local security policy\n                                                       and LSA secrets\n  HKLM\\SOFTWARE   ...\\config\\SOFTWARE                  installed software\n                                                       and OS settings\n  HKLM\\SYSTEM     ...\\config\\SYSTEM                    services, drivers,\n                                                       boot configuration\n  HKU\\<SID>       C:\\Users\\<name>\\NTUSER.DAT           per-user settings\nThe SAM and SECURITY hives are restricted even from administrators in normal\ntools; their protection matters because they contain credential material.\n\n2.2.4 Value types\n  REG_SZ          string\n  REG_EXPAND_SZ   string with environment variables (%SystemRoot%)\n  REG_MULTI_SZ    list of strings\n  REG_DWORD       32-bit number\n  REG_QWORD       64-bit number\n  REG_BINARY      raw bytes\n\n2.2.5 Tools (execution-tested where shown)\n  regedit                 graphical editor (use with great care).\n  reg query KEY /v NAME   command-line query. Example:\n    reg query \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\EventLog\" /v Start\n    -> Start    REG_DWORD    0x2      (2 = automatic, see L03)\n  PowerShell registry provider: HKLM:\\ and HKCU:\\ drives work with\n    Get-ChildItem, Get-ItemProperty, Set-ItemProperty, New-Item.\n  reg export KEY file.reg  back up a key before changing it.\nGolden rule: back up before editing, change one thing, document it, and\nprefer Group Policy or supported tools over manual edits.\n\n2.2.6 Security-relevant registry locations\n  Autostart (run at logon): HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\n                            and RunOnce; HKLM\\...\\Run and RunOnce.\n                            On the content team's laptop, the user Run key held\n                            10 entries - typical of a personal machine with\n                            several applications; each should be recognised.\n  Services and drivers:     HKLM\\SYSTEM\\CurrentControlSet\\Services\n  UAC configuration:        HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\\n                            Policies\\System (EnableLUA=1 and\n                            ConsentPromptBehaviorAdmin=5 on the test machine -\n                            UAC enabled with consent prompts for\n                            administrators, the default).\n  LSA protection:           HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa,\n                            value RunAsPPL (2 on the test machine; see L05).\nAutostart locations are a classic persistence technique (MITRE ATT&CK\nT1547.001, Registry Run Keys / Startup Folder [C03-M05-R2]). Tools such as\nSysinternals Autoruns enumerate all autostart locations in one view\n[C03-M05-R3].\n\n\n![C03-M05-D38: Registry Transaction Mechanics: Hive Flush, Transaction Logs (.LOG1, .LOG2) & Forensics](/assets/courses/cyber-03/c03_m05_l02_registry_transactions_forensics.png)\n\n*Figure C03-M05-D38: Write-ahead logging in the Windows registry: in-memory cell modification, transaction logging (.LOG1/.LOG2), and atomic hive sync.*\n\n"
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
      "content": "## 5.3 Windows Services: Service Control Manager, svchost Groups & Privilege Hijacking\n\n![C03-M05-D39: Windows Service Misconfigurations: Unquoted Service Paths & Insecure Permissions](/assets/courses/cyber-03/c03_m05_l03_unquoted_service_paths.png)\n\n*Figure C03-M05-D39: Privilege escalation via unquoted service paths: how CreateProcess searches whitespace-delimited paths to execute malicious binaries.*\n\nLESSON C03-M05-L03: Windows services\n====================================\n\n2.3.1 Recap and tools\nModule 1 introduced the Service Control Manager (services.exe). Tools:\n  services.msc                  graphical console\n  Get-Service / Start-Service / Stop-Service / Set-Service (PowerShell)\n  sc.exe query | qc | config | start | stop\n  Get-CimInstance Win32_Service (includes account and path)\nExecution-tested:\n  Get-Service -Name EventLog, Dnscache, Spooler -> all Running, StartType\n  Automatic on the test machine.\n\n2.3.2 Configuration in the registry\nEach service has a key under HKLM\\SYSTEM\\CurrentControlSet\\Services\\<name>\nwith values including ImagePath (binary), ObjectName (account), and Start:\n  0 Boot, 1 System (drivers), 2 Automatic, 3 Manual, 4 Disabled\nDelayed automatic start is stored separately (DelayedAutostart=1).\n\n2.3.3 Service accounts (least privilege)\n  LocalSystem       very high local privilege; acts as the computer on the\n                    network.\n  LocalService      minimal local privilege; anonymous on the network.\n  NetworkService    minimal local privilege; acts as the computer on the\n                    network.\n  Virtual accounts  per-service identities (NT SERVICE\\<name>).\n  Group managed     domain accounts whose passwords Windows rotates\n  service accounts  automatically (Course 13).\nModule 1's practical found 183 services configured as LocalSystem on the test\nmachine - a reminder of how much code runs with high privilege.\n\n2.3.4 Service security checks\n  - Disable services that are not needed (Print Spooler on servers that do\n    not print - see case study).\n  - Service binaries, their folders and service registry keys must be\n    writable only by administrators/SYSTEM.\n  - Unquoted ImagePath values containing spaces (for example\n    C:\\Program Files\\App Folder\\svc.exe without quotes) can cause Windows to\n    try shorter paths first; if a non-administrator can write to one of\n    those locations, privilege escalation may be possible. Hardening reviews\n    check for unquoted paths with spaces.\n  - Monitor new service installation (System log event 7045, Module 7).\n\n\n![C03-M05-D40: Windows Service Account Privilege Matrix: LocalSystem, NetworkService, LocalService & gMSAs](/assets/courses/cyber-03/c03_m05_l03_service_accounts_matrix.png)\n\n*Figure C03-M05-D40: Security comparison of Windows built-in service identities, detailing local privileges, network authentication capabilities, and modern gMSA adoption.*\n\n"
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
      "content": "## 5.4 Local Accounts, SIDs & Groups: Security Identifiers, RIDs & Built-in Identities\n\n![C03-M05-D41: Anatomy of a Windows Security Identifier (SID): S-1-5-21 Breakdown](/assets/courses/cyber-03/c03_m05_l04_sid_structure_breakdown.png)\n\n*Figure C03-M05-D41: Bit-level and textual dissection of a Windows Security Identifier (SID): revision, identifier authority, domain sub-authorities, and Relative Identifier (RID).*\n\nLESSON C03-M05-L04: Local accounts, SIDs and groups\n===================================================\n\n2.4.1 Local versus domain accounts\nLocal accounts exist only on one computer and are stored in its SAM. Domain\naccounts live in Active Directory and can log on to many computers (Course\n13). Microsoft accounts and Entra ID accounts are cloud identities that can\nsign in to Windows.\n\n2.4.2 Security identifiers (SIDs)\nWindows identifies every security principal (user, group, computer, service)\nby a SID such as S-1-5-21-<three domain or machine numbers>-1001. The final\nnumber is the relative identifier (RID). Names can change; SIDs do not.\nWell-known SIDs and RIDs [C03-M05-R4]:\n  S-1-5-18         Local System\n  S-1-5-19 / -20   LocalService / NetworkService\n  RID 500          built-in Administrator\n  RID 501          Guest\n  RID 503          DefaultAccount\n  RID 504          WDAGUtilityAccount\n  RID 1000+        accounts created later\n  S-1-5-32-544     BUILTIN\\Administrators group\n  S-1-5-32-545     BUILTIN\\Users\n  S-1-16-8192      Medium mandatory integrity level (L05)\n\nExecution-tested (machine-specific part of each SID replaced with <domain>):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Name               Enabled SID\n  ----               ------- ---\n  Administrator        False S-1-5-21-<domain>-500\n  DefaultAccount       False S-1-5-21-<domain>-503\n  Guest                False S-1-5-21-<domain>-501\n  Mario                 True S-1-5-21-<domain>-1001\n  WDAGUtilityAccount   False S-1-5-21-<domain>-504\n  --------------------------------------------------------------- END OUTPUT\n\nThe built-in Administrator and Guest accounts are disabled by default - good\npractice to keep. The human user is RID 1001.\n\n2.4.3 Built-in groups\n  Administrators     full control of the computer.\n  Users              standard users.\n  Remote Desktop     may sign in through RDP.\n  Users\n  Backup Operators   may back up and restore files regardless of\n                     permissions (powerful - treat as privileged).\n  Event Log Readers  may read event logs (useful for least-privilege\n                     monitoring accounts).\nExecution-tested: Get-LocalGroupMember -Group Administrators listed the\ndisabled built-in Administrator and the user Mario. On a personal computer\nthe first user is usually an administrator; in organisations, daily-use\naccounts should be standard users.\n\n2.4.4 Managing local accounts (PowerShell; require elevation)\n  New-LocalUser, Set-LocalUser, Disable-LocalUser, Remove-LocalUser\n  Add-LocalGroupMember -Group \"Administrators\" -Member name\n  Get-LocalUser / Get-LocalGroupMember (read-only, no elevation needed for\n  listing on the test machine)\nThese cmdlets are in the Microsoft.PowerShell.LocalAccounts module\n[C03-M05-R5].\n\n2.4.5 Local administrator password management\nIf every computer shares the same local administrator password, one\ncompromised machine exposes all. Windows LAPS (Local Administrator Password\nSolution), built into supported Windows versions, sets a unique, regularly\nrotated password for a local administrator account on each device and\nstores it in Active Directory or Microsoft Entra ID with access control\n[C03-M05-R6].\n\n\n![C03-M05-D42: Well-Known SIDs & Built-in Security Principals: SYSTEM, Admins & Users](/assets/courses/cyber-03/c03_m05_l04_well_known_sids_taxonomy.png)\n\n*Figure C03-M05-D42: Taxonomy of universal well-known Windows SIDs: Everyone (S-1-1-0), Authenticated Users (S-1-5-11), Built-in Administrators (S-1-5-32-544).*\n\n\n\n:::math-steps\n### Windows Security Identifier (SID) Binary Structure Arithmetic\nDissecting the binary byte representation of a domain Security Identifier ($S-1-5-21-3623811015-3361044348-30300820-500$).\n\n#### Step 1: Binary Header Structure\nThe binary SID begins with an 8-bit revision and an 8-bit sub-authority count ($N$):\n$$\\text{Byte 0: Revision} = 0x01$$\n$$\\text{Byte 1: Sub-Authority Count} = 5 \\; (0x05)$$\n\n#### Step 2: 48-Bit Identifier Authority\nBytes 2 through 7 encode the 6-byte big-endian Identifier Authority:\n$$\\text{Bytes 2-7: NT Authority} = 0x0000\\,0000\\,0005 \\; (\\text{SECURITY\\_NT\\_AUTHORITY})$$\n\n#### Step 3: Sub-Authority DWORD Array (32-Bit Little-Endian)\nEach sub-authority consumes 4 bytes. For 5 sub-authorities ($5 \\times 4 = 20$ bytes):\n$$\\text{Total Binary Size} = 1 + 1 + 6 + (5 \\times 4) = 28 \\text{ bytes}$$\n:::\n\n"
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
          "caption": "Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.",
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
      "content": "## 5.5 Tokens, UAC, Privileges & Integrity: Restricted Tokens & Integrity Levels\n\n![C03-M05-F2: Access Check: Security Reference Monitor (SRM), Tokens & Mandatory Integrity Control](/assets/courses/cyber-03/C03-M05-F2.png)\n\n*Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.*\n\nLESSON C03-M05-L05: Tokens, UAC, privileges and integrity levels\n================================================================\n\n2.5.1 Access tokens\nWhen a user logs on, LSASS creates an access token describing their security\ncontext: user SID, group SIDs, privileges and integrity level. Every process\nthe user starts carries a copy; the Security Reference Monitor compares the\ntoken with an object's security descriptor whenever the process requests\naccess [C03-M05-R7].\n\n2.5.2 User Account Control (UAC) and the split token\nWhen an administrator logs on with UAC enabled, Windows creates two tokens:\na filtered standard-user token used for normal work, and a full\nadministrator token used only after elevation (\"Run as administrator\" and a\nconsent prompt). Evidence from the non-elevated test session:\n  - Group list included \"NT AUTHORITY\\Local account and member of\n    Administrators group\" and BUILTIN\\Administrators - but the Administrators\n    group in a filtered token is marked \"deny only\", so it cannot be used to\n    grant access.\n  - whoami /priv listed only five privileges, of which only\n    SeChangeNotifyPrivilege was enabled - an elevated administrator token\n    would show many more (for example SeDebugPrivilege,\n    SeTakeOwnershipPrivilege).\nUAC is a convenience and defence-in-depth feature; Microsoft does not\nconsider it a security boundary in the strict sense, so organisations should\nstill use standard accounts for daily work.\n\n2.5.3 Privileges (user rights)\nPrivileges are system-wide rights assigned through local security policy,\ndistinct from object permissions. Powerful examples: SeDebugPrivilege\n(debug/inspect any process), SeBackupPrivilege and SeRestorePrivilege (read\nor write any file for backup purposes), SeTakeOwnershipPrivilege,\nSeImpersonatePrivilege (common for service accounts), SeLoadDriverPrivilege.\nAccounts holding these should be treated as administrators.\n\n2.5.4 Integrity levels (Mandatory Integrity Control)\nWindows adds a mandatory label to tokens and objects: Low, Medium, High,\nSystem. A process cannot write to objects at a higher level even if the ACL\nwould allow it. Execution-tested: the session's token included\n\"Mandatory Label\\Medium Mandatory Level\" (S-1-16-8192). Elevated processes run\nat High; browsers sandbox some components at Low or in AppContainers.\n\n2.5.5 Protecting LSASS\nBecause LSASS holds credential material, Windows offers protections such as\nrunning LSASS as a protected process (RunAsPPL), so that non-protected\nprocesses - even administrators' - cannot read its memory, and Credential\nGuard on supported editions. Microsoft documents the RunAsPPL setting\n[C03-M05-R8]; on the test machine RunAsPPL was set to 2, which Microsoft\ndocuments as LSA protection enabled without a UEFI lock.\n\n\n![C03-M05-D43: User Account Control (UAC) & Filtered Tokens: Standard vs. Elevated Contexts](/assets/courses/cyber-03/c03_m05_l05_uac_filtered_tokens.png)\n\n*Figure C03-M05-D43: How User Account Control creates split tokens at logon: a filtered standard user token for daily work and an elevated token activated via consent prompt.*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: READING YOUR OWN SECURITY CONTEXT\n--------------------------------------------------------------------------------\n\n3.1 Commands (execution-tested, non-elevated Windows PowerShell 5.1)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  whoami /groups /fo csv | ConvertFrom-Csv | Select-Object 'Group Name', Type\n  whoami /priv /fo csv | ConvertFrom-Csv | Select-Object 'Privilege Name', State\n  ------------------------------------------------------------------ END CODE\n\n  whoami /groups   lists group SIDs in the current token.\n  whoami /priv     lists privileges and whether each is enabled.\n  /fo csv | ConvertFrom-Csv  turns the text into PowerShell objects that can\n                   be filtered and selected.\n\n3.2 Output (selected, exact)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Group Name                                                    Type\n  Everyone                                                      Well-known group\n  NT AUTHORITY\\Local account and member of Administrators group Well-known group\n  RK-HOST\\docker-users                                          Alias\n  BUILTIN\\Administrators                                        Alias\n  BUILTIN\\Users                                                 Alias\n  NT AUTHORITY\\INTERACTIVE                                      Well-known group\n  CONSOLE LOGON                                                 Well-known group\n  NT AUTHORITY\\Authenticated Users                              Well-known group\n\n  Privilege Name                State\n  SeShutdownPrivilege           Disabled\n  SeChangeNotifyPrivilege       Enabled\n  SeUndockPrivilege             Disabled\n  SeIncreaseWorkingSetPrivilege Disabled\n  SeTimeZonePrivilege           Disabled\n  --------------------------------------------------------------- END OUTPUT\n\n3.3 Interpretation\n  - The user is a member of Administrators, but this is the filtered UAC\n    token: few privileges, Medium integrity. Run the same commands in an\n    elevated PowerShell (\"Run as administrator\") to see the difference -\n    many more privileges and \"Mandatory Label\\High Mandatory Level\".\n  - INTERACTIVE and CONSOLE LOGON show how the user logged on - such groups\n    let administrators write rules that differ for local and remote logons.\n  - docker-users is a local group created by Docker Desktop; software that\n    adds groups and members changes your security configuration and should\n    be documented.\n  - Disabled privileges are held but not active; a program must enable them\n    before use - an action EDR products monitor for sensitive privileges.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M05-P1: Audit your Windows security context and autostarts\n------------------------------------------------------------------------\nObjective: Inspect accounts, groups, token, UAC settings and autostart\nentries on your own computer.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell 5.1 (standard and elevated sessions);\noptional Sysinternals Autoruns from Microsoft.\n\nPrerequisites: Lessons L02, L04, L05.\n\nEnvironment setup: your own Windows computer.\n\nExplicit authorised scope: your own computer; read-only commands.\n\nStep-by-step instructions:\n  1. Run Get-LocalUser and Get-LocalGroupMember -Group Administrators;\n     record which accounts are enabled and which are administrators.\n  2. Run the whoami commands in section 3.1 in a normal PowerShell window,\n     then again in an elevated window. Record the differences in privileges\n     and integrity level.\n  3. Query UAC settings:\n     Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' |\n       Select-Object EnableLUA, ConsentPromptBehaviorAdmin\n  4. List autostart entries:\n     Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'\n     Get-ItemProperty 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'\n     For each entry, identify the program and whether you expect it.\n  5. Optional: run Autoruns (from Microsoft Sysinternals) and compare its\n     Logon tab with your list.\n  6. Write a short report: accounts, admin membership, UAC state, and any\n     autostart entries you could not explain.\n\nExpected observations: on a personal machine, the main user is usually an\nadministrator with a filtered token at Medium integrity; elevated sessions\nshow High integrity and many more privileges; Run keys contain application\nupdaters and helpers.\n\nTroubleshooting: Get-LocalGroupMember may fail on some systems with orphaned\nSIDs - use net localgroup Administrators instead. If an autostart entry is\nunknown, research its file path and publisher before removing anything.\n\nCleanup: none (read-only).\n\nLearning outcome: you can describe a Windows security context and spot\nunexpected autostart configuration.\n\nPRACTICAL C03-M05-P2: Lock down a folder with icacls\n----------------------------------------------------\nObjective: Create a folder accessible only to you, SYSTEM and\nAdministrators, verify it, and remove it.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell.\n\nPrerequisites: Lesson L06.\n\nEnvironment setup: none.\n\nExplicit authorised scope: a new folder in your own %TEMP% directory.\n\nStep-by-step instructions:\n  1. Run the commands in section 2.6.4, but stop before Remove-Item.\n  2. Create a file inside the folder; run icacls on the file and confirm it\n     inherited the folder's explicit ACEs (it should show (I) flags).\n  3. Grant BUILTIN\\Users read access to the folder only (not files) and\n     observe the flags:\n     icacls $d /grant \"Users:(RX)\"\n  4. Remove that grant: icacls $d /remove Users\n  5. Export the ACLs: icacls $d /save \"$env:TEMP\\rk-acl-backup.txt\" /t\n  6. Remove the folder and backup file.\n\nExpected observations: the file shows inherited entries from the folder;\nthe Users grant without (OI)(CI) applies only to the folder.\n\nTroubleshooting: \"Access is denied\" means you removed your own access - use\nan elevated PowerShell and icacls $d /reset or take ownership with\ntakeown /f (in your own temp folder only).\n\nCleanup: Remove-Item $d -Recurse -Force; Remove-Item\n\"$env:TEMP\\rk-acl-backup.txt\".\n\nLearning outcome: you can apply and verify least-privilege NTFS permissions.\n\n--------------------------------------------------------------------------------\n\n"
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
      "content": "## 5.6 NTFS Permissions: Security Descriptors, DACLs, ACE Evaluation & Share Overlays\n\n![C03-M05-D44: NTFS Security Descriptors: Owner, Group, DACL & SACL Architecture](/assets/courses/cyber-03/c03_m05_l06_ntfs_security_descriptor.png)\n\n*Figure C03-M05-D44: Internal structure of an NTFS Security Descriptor: Control flags, Owner SID, Primary Group SID, Discretionary ACL (permissions), and System ACL (auditing).*\n\nLESSON C03-M05-L06: NTFS permissions\n====================================\n\n2.6.1 Security descriptors and ACLs\nEach NTFS file and folder has a security descriptor containing an owner and\na discretionary access control list (DACL) of access control entries (ACEs).\nEach ACE allows or denies specific rights to a SID. A system ACL (SACL)\ndefines auditing (Module 7). Evaluation order: explicit deny, explicit allow,\ninherited deny, inherited allow - in practice \"deny wins\" among entries at\nthe same level, and no matching allow means no access [C03-M05-R9].\n\n2.6.2 Common rights\n  Full control (F), Modify (M), Read & execute (RX), Read (R), Write (W),\n  plus special permissions such as Delete, Change permissions, Take\n  ownership.\n\n2.6.3 Inheritance\nFolders pass ACEs to children according to flags:\n  (OI) object inherit - applies to files\n  (CI) container inherit - applies to subfolders\n  (IO) inherit only - not to the folder itself\n  (I)  this ACE was inherited from a parent\nBreaking inheritance creates islands of permissions that are hard to audit;\nuse it deliberately.\n\n2.6.4 Execution-tested icacls example (temporary folder, removed afterwards)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  $d = Join-Path $env:TEMP 'rk-acl-lab'; New-Item -ItemType Directory -Path $d -Force\n  icacls $d\n  icacls $d /inheritance:r /grant:r \"$($env:USERNAME):(OI)(CI)F\" \"SYSTEM:(OI)(CI)F\" \"Administrators:(OI)(CI)F\"\n  icacls $d\n  (Get-Acl $d).Access | Select-Object IdentityReference, FileSystemRights, IsInherited\n  Remove-Item $d -Recurse -Force\n  ------------------------------------------------------------------ END CODE\n\nOutput (exact; computer name shown as RK-HOST):\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  ...\\Temp\\rk-acl-lab NT AUTHORITY\\SYSTEM:(I)(OI)(CI)(F)\n                      BUILTIN\\Administrators:(I)(OI)(CI)(F)\n                      RK-HOST\\Mario:(I)(OI)(CI)(F)\n  Successfully processed 1 files; Failed processing 0 files\n  ...\\Temp\\rk-acl-lab BUILTIN\\Administrators:(OI)(CI)(F)\n                      NT AUTHORITY\\SYSTEM:(OI)(CI)(F)\n                      RK-HOST\\Mario:(OI)(CI)(F)\n  IdentityReference      FileSystemRights IsInherited\n  NT AUTHORITY\\SYSTEM         FullControl       False\n  BUILTIN\\Administrators      FullControl       False\n  RK-HOST\\Mario               FullControl       False\n  --------------------------------------------------------------- END OUTPUT\n\nLine by line:\n  First icacls    shows inherited (I) entries from the user's profile.\n  /inheritance:r  removes inherited ACEs.\n  /grant:r        grants the listed rights, replacing existing explicit\n                  grants for those principals; (OI)(CI)F = full control\n                  applying to files and subfolders.\n  Second icacls   no (I) flags: the ACEs are now explicit.\n  Get-Acl         the same data as .NET objects, with IsInherited False.\nThis pattern - remove inheritance, grant exactly what is needed - is how\nsensitive folders (for example a service's data folder) are locked down.\n\n2.6.5 Share permissions versus NTFS permissions\nWhen files are accessed over the network through an SMB share, two layers\napply: share permissions (on the share) and NTFS permissions (on the files).\nThe effective access is the more restrictive of the two. Common practice:\nset share permissions broadly (for example Authenticated Users: Change) and\ncontrol access precisely with NTFS permissions, or set both carefully.\n\n2.6.6 Least-privilege practices\n  - Grant permissions to groups, not individuals.\n  - Use Modify rather than Full control for users (Full control lets them\n    change permissions).\n  - Avoid granting Everyone or Authenticated Users write access to program\n    or service folders.\n  - Review effective access (Advanced Security Settings > Effective Access)\n    and audit with icacls /save or PowerShell exports.\n\n--------------------------------------------------------------------------------\n\n![C03-M05-D45: NTFS vs. Share Permissions: The Most Restrictive Intersection Rule](/assets/courses/cyber-03/c03_m05_l06_ntfs_vs_share_permissions.png)\n\n*Figure C03-M05-D45: Permission evaluation over the network: combining SMB Share permissions with underlying NTFS DACLs where the most restrictive permission always wins.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M05-CS1: PrintNightmare and CISA ED 21-04 (July 2021) -\ndisabling a service nobody needed\n---------------------------------------------------------------------\nContext: the Windows Print Spooler service runs by default on many Windows\nsystems, including servers that never print.\n\nWhat happened: a critical vulnerability in the Print Spooler service,\nCVE-2021-34527 (widely called \"PrintNightmare\"), was disclosed in mid-2021.\nOn 13 July 2021 CISA issued Emergency Directive 21-04 [C03-M05-R10].\n\nRequired actions (per the directive): disable the Print Spooler service on\nall Active Directory domain controllers by 14 July 2021; apply Microsoft's\nJuly 2021 cumulative updates to all Windows servers and workstations by 20\nJuly 2021; on other hosts, disable the service or restrict driver\ninstallation through Group Policy (Point and Print Restrictions) or a\nregistry setting; validate the settings; and ensure newly provisioned systems\nare configured before joining networks. The directive was later closed, with\nremaining requirements moved under CISA's Known Exploited Vulnerabilities\ndirective (BOD 22-01).\n\nLessons learned:\n  - Services that are not needed should be disabled - especially on the most\n    sensitive servers such as domain controllers.\n  - Services run with high privilege (Print Spooler runs as LocalSystem), so\n    their flaws are high impact.\n  - Mitigation can combine service configuration, Group Policy, registry\n    settings and patching (Modules 6-8 show how to apply and verify these at\n    scale).\n\nCASE STUDY C03-M05-CS2 (FICTIONAL TEACHING SCENARIO): Everyone: Full control\n----------------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: Peacock Finance (fictional) installed an accounting application in\nC:\\AcctApp. To stop permission errors, a technician granted Everyone: Full\ncontrol on the folder. The application's update service, running as\nLocalSystem, executed C:\\AcctApp\\updater.exe.\n\nProblem: any user could replace updater.exe; the next service run executed\nthe replacement as LocalSystem.\n\nResponse: permissions were reset to Administrators and SYSTEM (Full\ncontrol), Users (Read & execute), with a specific Modify grant only on the\napplication's data subfolder; the service account was reviewed; a script to\nfind service binaries in user-writable folders was added to the hardening\naudit (Module 8).\n\nLessons: folder permissions on service and program directories are a\nprivilege boundary; \"Everyone: Full control\" is almost never acceptable.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M05-F1: Windows architecture overview\nPurpose: Show user-mode and kernel-mode components.\n\n  [BEGIN DIAGRAM]\n  USER MODE\n  +-----------+ +-----------+ +---------------------+ +------------------+\n  | Apps      | | Services  | | System processes    | | Session (per     |\n  | (Win32    | | (svchost, | | smss, wininit,      | | logon): csrss,   |\n  | API)      | | others)   | | services, lsass     | | winlogon,explorer|\n  +-----+-----+ +-----+-----+ +----------+----------+ +--------+---------+\n        +-------------+------ ntdll.dll (system call stubs) ---+\n  ==========================================================================\n  KERNEL MODE (ntoskrnl.exe)\n  | Executive: Object Mgr | Memory Mgr | Process/Thread | I/O Mgr |       |\n  |            Config Mgr (registry) | SECURITY REFERENCE MONITOR         |\n  | Kernel | win32k.sys | Drivers (device, file system, filter)            |\n  | HAL (hardware abstraction layer)                                       |\n  [END DIAGRAM]\n\nCaption: Figure C03-M05-F1. Windows user-mode components call into the\nkernel through ntdll; the executive includes the configuration manager and\nSecurity Reference Monitor.\nAccessibility description: A two-layer diagram. User mode contains\napplications, services, system processes and per-session processes, all\ncalling ntdll. Kernel mode contains the executive (object, memory, process,\nI/O and configuration managers and the security reference monitor), the\nkernel, win32k and drivers, above the HAL.\n\nFIGURE C03-M05-F2: Access check\nPurpose: Show how a token is compared with a security descriptor.\n\n  [BEGIN DIAGRAM]\n  [Process token]                         [File security descriptor]\n   User SID S-1-5-21-..-1001               Owner: Administrators\n   Groups: Users, Authenticated Users,     DACL:\n     Administrators (deny-only if          ACE1 Allow SYSTEM      Full\n     filtered by UAC)                      ACE2 Allow Admins      Full\n   Privileges: SeChangeNotify ...          ACE3 Allow Mario       Modify\n   Integrity: Medium                       Label: Medium (no write-up)\n          \\                                     /\n           +---> SECURITY REFERENCE MONITOR <--+\n                 1. Mandatory integrity check\n                 2. Walk DACL: deny ACEs, then allow ACEs\n                 3. Grant requested rights only if all are allowed\n                        |\n                 ALLOW or ACCESS DENIED (and audit if SACL says so)\n  [END DIAGRAM]\n\nCaption: Figure C03-M05-F2. The Security Reference Monitor compares a\nprocess token with an object's security descriptor and integrity label.\nAccessibility description: A process token with user SID, groups,\nprivileges and integrity level on the left, and a file security descriptor\nwith owner, DACL entries and integrity label on the right, both feeding the\nSecurity Reference Monitor, which performs integrity and DACL checks and\nreturns allow or denied.\n\nFIGURE C03-M05-F3: Registry hives and files\nPurpose: Map logical keys to files.\n\n  [BEGIN DIAGRAM]\n  HKEY_LOCAL_MACHINE\n- **SAM       <-> C:\\Windows\\System32\\config\\SAM       (local accounts)**\n- **SECURITY  <-> ...\\config\\SECURITY                  (LSA policy)**\n- **SOFTWARE  <-> ...\\config\\SOFTWARE  -> ...\\CurrentVersion\\Run**\n- **SYSTEM    <-> ...\\config\\SYSTEM    -> CurrentControlSet\\Services**\n  HKEY_USERS\n- **S-1-5-21-...-1001 <-> C:\\Users\\Mario\\NTUSER.DAT**\n            = HKEY_CURRENT_USER -> Software\\...\\CurrentVersion\\Run\n  [END DIAGRAM]\n\nCaption: Figure C03-M05-F3. HKLM hives and per-user hives with their files\nand key security-relevant locations.\nAccessibility description: A tree for HKEY_LOCAL_MACHINE showing SAM,\nSECURITY, SOFTWARE and SYSTEM hives with their file paths, the SOFTWARE Run\nkey and SYSTEM Services key; and HKEY_USERS with a user SID mapped to\nNTUSER.DAT, equal to HKEY_CURRENT_USER, with its Run key.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nWindows NT architecture splits kernel mode (ntoskrnl with the executive -\nobject, memory, process, I/O and configuration managers and the Security\nReference Monitor - plus win32k, drivers and HAL) from user mode (csrss,\nsmss, wininit, winlogon, services, lsass, svchost-hosted services and\napplications via ntdll). Session 0 isolates services. The registry stores\nconfiguration in hives (SAM, SECURITY, SOFTWARE, SYSTEM, NTUSER.DAT) under\nroot keys HKLM, HKU, HKCU, HKCR; values have types; Run keys and the\nServices key are security-relevant; back up before editing. Legacy values can\nmislead (ProductName on Windows 11). Services are configured by start type\n(0-4), account (LocalSystem, LocalService, NetworkService, virtual, gMSA) and\nImagePath; unneeded services should be disabled (PrintNightmare, ED 21-04),\nbinaries protected and paths quoted. Principals are identified by SIDs with\nRIDs (500 Administrator, 501 Guest); built-in groups grant broad powers;\nWindows LAPS manages unique local admin passwords. Tokens carry SIDs,\nprivileges and integrity levels; UAC gives administrators a filtered token\nuntil elevation; LSASS protection (RunAsPPL) protects credentials. NTFS DACLs\nof ACEs with inheritance flags control access, managed with icacls and\nGet-Acl; share and NTFS permissions combine to the most restrictive.\n\n8.2 Important concepts\n  - SIDs, not names, identify principals.\n  - UAC filtered tokens and integrity levels add defence in depth.\n  - Service accounts, binaries and paths are privilege boundaries.\n  - Autostart locations must be inventoried.\n\n8.3 Key technical takeaways\n  - reg query / Get-ItemProperty; Get-LocalUser; Get-LocalGroupMember.\n  - whoami /groups /priv; icacls /inheritance:r /grant:r; Get-Acl.\n  - Start values 0-4 in the Services key.\n\n8.4 Glossary\n  ACE / DACL       Access control entry / discretionary ACL.\n  Access token     Security context of a process.\n  Hive             Registry section stored in a file.\n  Integrity level  Mandatory label (Low, Medium, High, System).\n  LAPS             Local Administrator Password Solution.\n  LSASS            Local Security Authority Subsystem Service.\n  RID              Relative identifier (last part of a SID).\n  RunAsPPL         Setting running LSASS as a protected process.\n  SAM              Security Accounts Manager database.\n  SID              Security identifier.\n  SRM              Security Reference Monitor.\n  UAC              User Account Control.\n  Session 0        Non-interactive session for services.\n\n8.5 Common mistakes\n  - Granting Everyone/Users write on program or service folders.\n  - Using administrator accounts for daily work.\n  - Editing the registry without backups or change records.\n  - Trusting a single registry value to identify the OS version.\n  - Leaving unneeded high-privilege services enabled.\n\n8.6 Revision questions\n  1. Describe the path from an application's API call to the kernel.\n  2. List four registry locations a defender should monitor and why.\n  3. Explain the UAC split token and its limits.\n  4. Interpret icacls output with (I)(OI)(CI)(M).\n  5. Why disable Print Spooler on domain controllers?\n\n8.7 Further reading\n  - Microsoft Learn, Windows registry documentation [C03-M05-R1].\n  - Microsoft Learn, Access tokens and access control [C03-M05-R7].\n  - CISA ED 21-04 [C03-M05-R10].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
