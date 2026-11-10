/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 5 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module5QuestionBank = [
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
  },
  {
    "id": "q_c3_m5_021",
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
    "id": "q_c3_m5_022",
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
    "id": "q_c3_m5_023",
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
    "id": "q_c3_m5_024",
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
    "id": "q_c3_m5_025",
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
    "id": "q_c3_m5_026",
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
    "id": "q_c3_m5_027",
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
    "id": "q_c3_m5_028",
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
    "id": "q_c3_m5_029",
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
    "id": "q_c3_m5_030",
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
    "id": "q_c3_m5_031",
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
    "id": "q_c3_m5_032",
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
    "id": "q_c3_m5_033",
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
    "id": "q_c3_m5_034",
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
    "id": "q_c3_m5_035",
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
    "id": "q_c3_m5_036",
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
    "id": "q_c3_m5_037",
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
    "id": "q_c3_m5_038",
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
    "id": "q_c3_m5_039",
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
    "id": "q_c3_m5_040",
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
    "id": "q_c3_m5_041",
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
    "id": "q_c3_m5_042",
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
    "id": "q_c3_m5_043",
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
    "id": "q_c3_m5_044",
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
    "id": "q_c3_m5_045",
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
    "id": "q_c3_m5_046",
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
    "id": "q_c3_m5_047",
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
    "id": "q_c3_m5_048",
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
    "id": "q_c3_m5_049",
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
    "id": "q_c3_m5_050",
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
    "id": "q_c3_m5_051",
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
    "id": "q_c3_m5_052",
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
    "id": "q_c3_m5_053",
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
    "id": "q_c3_m5_054",
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
    "id": "q_c3_m5_055",
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
    "id": "q_c3_m5_056",
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
    "id": "q_c3_m5_057",
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
    "id": "q_c3_m5_058",
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
    "id": "q_c3_m5_059",
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
    "id": "q_c3_m5_060",
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
    "id": "q_c3_m5_061",
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
    "id": "q_c3_m5_062",
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
    "id": "q_c3_m5_063",
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
    "id": "q_c3_m5_064",
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
    "id": "q_c3_m5_065",
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
    "id": "q_c3_m5_066",
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
    "id": "q_c3_m5_067",
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
    "id": "q_c3_m5_068",
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
    "id": "q_c3_m5_069",
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
    "id": "q_c3_m5_070",
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
    "id": "q_c3_m5_071",
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
    "id": "q_c3_m5_072",
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
    "id": "q_c3_m5_073",
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
    "id": "q_c3_m5_074",
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
    "id": "q_c3_m5_075",
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
    "id": "q_c3_m5_076",
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
    "id": "q_c3_m5_077",
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
    "id": "q_c3_m5_078",
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
    "id": "q_c3_m5_079",
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
    "id": "q_c3_m5_080",
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
    "id": "q_c3_m5_081",
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
    "id": "q_c3_m5_082",
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
    "id": "q_c3_m5_083",
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
    "id": "q_c3_m5_084",
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
    "id": "q_c3_m5_085",
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
    "id": "q_c3_m5_086",
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
    "id": "q_c3_m5_087",
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
    "id": "q_c3_m5_088",
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
    "id": "q_c3_m5_089",
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
    "id": "q_c3_m5_090",
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
    "id": "q_c3_m5_091",
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
    "id": "q_c3_m5_092",
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
    "id": "q_c3_m5_093",
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
    "id": "q_c3_m5_094",
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
    "id": "q_c3_m5_095",
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
    "id": "q_c3_m5_096",
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
    "id": "q_c3_m5_097",
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
    "id": "q_c3_m5_098",
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
    "id": "q_c3_m5_099",
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
    "id": "q_c3_m5_100",
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
    "id": "q_c3_m5_101",
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
    "id": "q_c3_m5_102",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_103",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_104",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_105",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_106",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_107",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_108",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_109",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_110",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_111",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_112",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_113",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_114",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_115",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_116",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_117",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_118",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_119",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_120",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_121",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_122",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_123",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_124",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_125",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_126",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_127",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_128",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_129",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_130",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_131",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_132",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_133",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_134",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_135",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_136",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_137",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_138",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_139",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_140",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_141",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_142",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_143",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_144",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_145",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_146",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_147",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_148",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_149",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_150",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_151",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_152",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_153",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_154",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_155",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_156",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_157",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_158",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_159",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_160",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_161",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_162",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_163",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_164",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_165",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_166",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_167",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_168",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_169",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_170",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_171",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_172",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_173",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_174",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_175",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_176",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_177",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_178",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_179",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_180",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_181",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_182",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_183",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_184",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_185",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_186",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_187",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_188",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_189",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_190",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_191",
    "topic": "Windows NT Executive & Kernel Mode Subsystems",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_192",
    "topic": "Windows Core Process Tree & Session 0 Isolation",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_193",
    "topic": "Windows Registry Hives, Files & Persistence Keys",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_194",
    "topic": "Registry Transactions & Write-Ahead Logging",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_195",
    "topic": "Windows Service Architectures & SCM Dispatch",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_196",
    "topic": "Service Vulnerabilities (Unquoted Paths, Weak DACLs)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_197",
    "topic": "Service Accounts (SYSTEM, NetworkService, LocalService, gMSA)",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_198",
    "topic": "Security Identifiers (SIDs) & Well-Known Principals",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_199",
    "topic": "Access Tokens, UAC Filtered Tokens & Integrity Levels",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  },
  {
    "id": "q_c3_m5_200",
    "topic": "NTFS Permissions, DACLs, ACEs & Share Intersections",
    "difficulty": "difficult",
    "q": "A Windows service is configured with binary path 'C:\\Program Files\\Enterprise Network\\agent.exe' without quotation marks. How can an unprivileged local user exploit this for privilege escalation?",
    "options": [
      "Place a malicious executable named \"C:\\Program.exe\"; the Service Control Manager checks for that binary before parsing subsequent whitespace tokens.",
      "Modify the service StartType registry key in HKLM without requiring administrative permissions.",
      "Inject shellcode into svchost.exe because unquoted paths disable Address Space Layout Randomization (ASLR).",
      "Delete the \"agent.exe\" file because unquoted paths automatically downgrade NTFS permissions to Everyone: Full Control."
    ],
    "correct": 0,
    "explanation": "Windows CreateProcess interprets unquoted paths with spaces sequentially: it looks first for C:\\Program.exe, then C:\\Program Files\\Enterprise.exe. If an attacker can write to C:\\, Program.exe executes with the service's privileges."
  }
];
