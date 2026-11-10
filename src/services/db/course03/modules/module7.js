/**
 * Course 03: Linux and Windows System Administration
 * Module 7: Enterprise Administration & Active Directory
 * Modular load-balanced data file.
 */

export const module7Data = {
  "id": "mod_c3_7",
  "title": "Module 7: Enterprise Administration & Active Directory",
  "description": "Enterprise infrastructure and directory services: Windows Event Log architecture, high-fidelity security audit event IDs, Windows Event Forwarding (WEF), Active Directory Domain Services (AD DS), Kerberos authentication, Group Policy Object (GPO) precedence (LSDOU), and patch rings.",
  "order": 7,
  "quiz": {
    "id": "quiz_mod_c3_7",
    "title": "Module 7: Enterprise Administration & Active Directory Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m7_001",
        "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
        "difficulty": "medium",
        "q": "Which Windows Security Event ID records that the security audit log was deliberately cleared by an administrator or threat actor?",
        "options": [
          "Event ID 1102 (The audit log was cleared)",
          "Event ID 4624 (An account was successfully logged on)",
          "Event ID 4672 (Special privileges assigned to new logon)",
          "Event ID 7045 (A new service was installed in the system)"
        ],
        "correct": 0,
        "explanation": "Event ID 1102 in the Security log records when the audit log is cleared. This is a critical high-priority alert for SOC analysts investigating defense evasion."
      },
      {
        "id": "q_c3_m7_002",
        "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
        "difficulty": "difficult",
        "q": "In Kerberos authentication, what ticket does the Client receive from the Authentication Service (AS) exchange, and what does it grant?",
        "options": [
          "A Ticket-Granting Ticket (TGT), which allows the client to request specific service tickets from the Ticket-Granting Service (TGS) without re-entering credentials.",
          "A Service Ticket (ST), which immediately decrypts files stored on the target SMB server.",
          "A digital certificate signed by the enterprise Public Key Infrastructure CA.",
          "A session token authorizing root shell access on all domain controllers."
        ],
        "correct": 0,
        "explanation": "During the initial AS exchange, the KDC issues a Ticket-Granting Ticket (TGT) encrypted with the KDC's krbtgt key. The client uses this TGT to obtain service tickets without exposing passwords."
      },
      {
        "id": "q_c3_m7_003",
        "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_004",
        "topic": "Process Tracking with Command Line Auditing (Event 4688)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_005",
        "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_006",
        "topic": "Enterprise SIEM Pipeline & Detection Rules",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_007",
        "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_008",
        "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_009",
        "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_010",
        "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_011",
        "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_012",
        "topic": "Enterprise Patch Management & WSUS Deployment Rings",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_013",
        "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_014",
        "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_015",
        "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_016",
        "topic": "Process Tracking with Command Line Auditing (Event 4688)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_017",
        "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_018",
        "topic": "Enterprise SIEM Pipeline & Detection Rules",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_019",
        "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      },
      {
        "id": "q_c3_m7_020",
        "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
        "difficulty": "medium",
        "q": "In Windows Security event triage, what does Event ID 4624 with Logon Type '10' specifically indicate?",
        "options": [
          "A successful interactive Remote Desktop Protocol (RDP) or Terminal Services logon session.",
          "A local interactive keyboard and console monitor logon session at the physical endpoint.",
          "A network authentication session accessing a shared network folder over SMB (port 445).",
          "A batch job scheduled task logon executed by the Task Scheduler engine."
        ],
        "correct": 0,
        "explanation": "Logon Type 10 represents a RemoteInteractive logon, most commonly Remote Desktop (RDP). Logon Type 2 is interactive console; Logon Type 3 is network access."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m7_l1",
      "title": "7.1 Windows Event Log Architecture: Channels, Providers, XML Schemas & EVTX Storage",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Channels, Providers, XML Schemas & EVTX Storage.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Channels, Providers, XML Schemas & EVTX Storage.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l1_c03_m07_f1",
          "title": "C03-M07-F1: Windows Event Log Pipeline: Providers, Channels, EVTX Architecture & Forwarding",
          "url": "/assets/courses/cyber-03/C03-M07-F1.png",
          "caption": "Figure C03-M07-F1: Windows components write to event channels governed by audit policy; events are forwarded to a central collector for retention and analysis.",
          "alt": "Pipeline diagram of Windows Event Logging: event providers publishing to channels, stored in EVTX files, and forwarded via WEF to central SIEM"
        },
        {
          "id": "img_c3_m7_l1_c03_m07_d55",
          "title": "C03-M07-D55: Windows Event XML Schema Breakdown: System Header & EventData Payload",
          "url": "/assets/courses/cyber-03/c03_m07_l01_event_xml_schema_breakdown.png",
          "caption": "Figure C03-M07-D55: Structural breakdown of Windows Event Log XML: standard <System> header metadata and specialized <EventData> parameter payload.",
          "alt": "Diagram dissecting Windows Event XML structure: Provider, EventID, TimeCreated, Security, and EventData payload fields"
        }
      ],
      "content": "## 7.1 Windows Event Log Architecture: Channels, Providers, XML Schemas & EVTX Storage\n\n![C03-M07-F1: Windows Event Log Pipeline: Providers, Channels, EVTX Architecture & Forwarding](/assets/courses/cyber-03/C03-M07-F1.png)\n\n*Figure C03-M07-F1: Windows components write to event channels governed by audit policy; events are forwarded to a central collector for retention and analysis.*\n\nLESSON C03-M07-L01: Windows event log architecture\n==================================================\n\n2.1.1 Logs and channels\nWindows records events in channels stored as .evtx files under\nC:\\Windows\\System32\\winevt\\Logs [C03-M07-R1]:\n  Windows Logs      Application, Security, Setup, System, Forwarded Events.\n  Applications and  Per-component channels such as\n  Services Logs     Microsoft-Windows-PowerShell/Operational,\n                    Microsoft-Windows-TaskScheduler/Operational,\n                    Microsoft-Windows-Windows Defender/Operational,\n                    Microsoft-Windows-Sysmon/Operational (if Sysmon is\n                    installed).\n\n2.1.2 Anatomy of an event\n  Log name, Source/Provider, Event ID, Level (Critical, Error, Warning,\n  Information, Verbose; Security events use Audit Success/Failure),\n  TimeCreated, Computer, User (where applicable), Task category, and\n  EventData fields (structured name/value data, visible in the XML view).\n\n2.1.3 Tools\n  Event Viewer (eventvwr.msc)   graphical browsing and custom views.\n  Get-WinEvent (PowerShell)     scripted queries; -FilterHashtable is fast.\n  wevtutil                      command-line management (query, export,\n                                clear, configure size).\n\n2.1.4 Execution-tested queries (Windows 11, standard session)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-WinEvent -ListLog Security, System, Application, 'Microsoft-Windows-PowerShell/Operational' |\n      Select-Object LogName, RecordCount, MaximumSizeInBytes, LogMode\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  LogName                                  RecordCount MaximumSizeInBytes  LogMode\n  System                                         34264           20971520 Circular\n  Application                                    20868           20971520 Circular\n  Microsoft-Windows-PowerShell/Operational         658           15728640 Circular\n  --------------------------------------------------------------- END OUTPUT\n\nObservations:\n  - The Security log did not appear: a non-elevated session cannot read it.\n    A direct query returned \"Attempted to perform an unauthorized\n    operation.\" Reading Security events requires administrator rights or\n    membership of Event Log Readers - a deliberate protection.\n  - Logs are 20 MB (System, Application) or 15 MB and \"Circular\": when full,\n    the oldest events are overwritten. On a busy server 20 MB may hold only\n    days of events, which is why central collection matters (L03).\n\nQuerying by ID (execution-tested):\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-WinEvent -FilterHashtable @{LogName='System'; Id=7045} -MaxEvents 2 |\n      ForEach-Object {\n          $x = [xml]$_.ToXml()\n          [pscustomobject]@{\n              Time      = $_.TimeCreated\n              Service   = ($x.Event.EventData.Data | Where-Object Name -eq 'ServiceName').'#text'\n              ImagePath = ($x.Event.EventData.Data | Where-Object Name -eq 'ImagePath').'#text'\n              StartType = ($x.Event.EventData.Data | Where-Object Name -eq 'StartType').'#text'\n              Account   = ($x.Event.EventData.Data | Where-Object Name -eq 'AccountName').'#text'\n          }\n      }\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  Time      : 07/11/2026 01:15:16\n  Service   : BioNTDrv\n  ImagePath : C:\\Program Files\\Dell\\SARemediation\\plugin\\biontdrv_wink.sys\n  StartType : demand start\n  Account   :\n\n  Time      : 07/11/2026 00:00:19\n  Service   : XBOX Input Service\n  ImagePath : \"C:\\Program Files\\XboxService\\x64\\XboxService.exe\"\n  StartType : auto start\n  Account   : LocalSystem\n  --------------------------------------------------------------- END OUTPUT\n\n  -FilterHashtable  filters inside the event log service - much faster than\n                    piping all events to Where-Object.\n  [xml]$_.ToXml()   converts the event to XML so named EventData fields\n                    (ServiceName, ImagePath...) can be read reliably instead\n                    of parsing message text.\nInterpretation: event 7045 (\"A service was installed in the system\") showed\na vendor support driver (.sys, demand start) and a games service running as\nLocalSystem. Both were legitimate software on this machine - but an analyst\nwould verify exactly these fields when 7045 appears unexpectedly on a\nserver, because installing a service is a common persistence and\nlateral-movement technique.\n\nOther System events seen on the machine: 7036 (service state changes) and\n6005/6006 (Event Log service started/stopped - effectively boot and clean\nshutdown markers); 6008 records an unexpected shutdown.\n\n\n![C03-M07-D55: Windows Event XML Schema Breakdown: System Header & EventData Payload](/assets/courses/cyber-03/c03_m07_l01_event_xml_schema_breakdown.png)\n\n*Figure C03-M07-D55: Structural breakdown of Windows Event Log XML: standard <System> header metadata and specialized <EventData> parameter payload.*\n\n"
    },
    {
      "id": "les_c3_m7_l2",
      "title": "7.2 Security-Relevant Event IDs: Logon Triage, Process Tracking & Audit Policies",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Logon Triage, Process Tracking & Audit Policies.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Logon Triage, Process Tracking & Audit Policies.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l2_c03_m07_d56",
          "title": "C03-M07-D56: High-Fidelity Security Event IDs: Logon Types & Lateral Movement Indicators",
          "url": "/assets/courses/cyber-03/c03_m07_l02_security_event_ids_matrix.png",
          "caption": "Figure C03-M07-D56: High-fidelity Windows Security event catalog: Logon Types (2 Interactive, 3 Network, 10 RDP), Account Changes (4720), and Log Cleared (1102).",
          "alt": "Reference matrix of critical Windows Security Event IDs: 4624, 4625, 4672, 4688, 4720, 7045, and 1102 with incident triage contexts"
        },
        {
          "id": "img_c3_m7_l2_c03_m07_d57",
          "title": "C03-M07-D57: Process Creation Auditing: Event 4688 with Full Command Line Telemetry",
          "url": "/assets/courses/cyber-03/c03_m07_l02_process_creation_event_4688.png",
          "caption": "Figure C03-M07-D57: Enabling command line auditing in Event 4688: capturing parent process ancestry, creator subject, and full argument strings for threat triage.",
          "alt": "Diagram illustrating Event 4688 process creation auditing with and without command-line process auditing enabled"
        }
      ],
      "content": "## 7.2 Security-Relevant Event IDs: Logon Triage, Process Tracking & Audit Policies\n\n![C03-M07-D56: High-Fidelity Security Event IDs: Logon Types & Lateral Movement Indicators](/assets/courses/cyber-03/c03_m07_l02_security_event_ids_matrix.png)\n\n*Figure C03-M07-D56: High-fidelity Windows Security event catalog: Logon Types (2 Interactive, 3 Network, 10 RDP), Account Changes (4720), and Log Cleared (1102).*\n\nLESSON C03-M07-L02: Security-relevant events and audit policy\n=============================================================\n\n2.2.1 Frequently used Security log events\nMicrosoft documents each audited event [C03-M07-R2]. Commonly monitored:\n  4624  An account was successfully logged on (with Logon Type: 2\n        interactive, 3 network, 4 batch, 5 service, 7 unlock, 10 remote\n        interactive/RDP, 11 cached)\n  4625  An account failed to log on (with failure reason/status codes)\n  4634 / 4647  Logoff / user-initiated logoff\n  4648  A logon was attempted using explicit credentials\n  4672  Special privileges assigned to new logon (administrator-equivalent\n        logons)\n  4688  A new process has been created (requires process-creation auditing;\n        command-line logging requires an additional policy)\n  4697  A service was installed in the system (Security log counterpart of\n        System 7045)\n  4698  A scheduled task was created\n  4720 / 4722 / 4725 / 4726  User account created / enabled / disabled /\n        deleted\n  4724  An attempt was made to reset an account's password\n  4728 / 4732 / 4756  Member added to a security-enabled global / local /\n        universal group\n  4740  A user account was locked out\n  1102  The audit log was cleared (a classic sign of anti-forensics)\nAnd from other channels: 4104 (PowerShell script block, Module 6), 7045\n(System), Windows Defender detections, Task Scheduler operational events.\n\n2.2.2 Audit policy\nSecurity events are written only if the audit policy enables the relevant\nsubcategory. Windows offers \"advanced audit policy configuration\" with\nsubcategories such as Logon, Process Creation, User Account Management and\nSecurity Group Management. View the effective policy with (requires\nelevation; Not execution-tested in this module's standard session):\n  auditpol /get /category:*\nConfigure through Group Policy (Computer Configuration > Windows Settings >\nSecurity Settings > Advanced Audit Policy Configuration). Microsoft\npublishes audit policy recommendations for domain controllers, servers and\nclients [C03-M07-R3]. Too little auditing loses evidence; too much floods\nstorage and analysts - choose subcategories deliberately.\n\n2.2.3 Enhancing visibility\n  - Command-line in process creation events: Group Policy \"Include command\n    line in process creation events\".\n  - Sysmon (Sysinternals System Monitor), a free Microsoft tool, adds rich\n    process, network, file and registry events configured by an XML rule\n    file [C03-M07-R4]; widely used in SOCs (Course 08, Course 20).\n  - PowerShell logging (Module 6).\n\n2.2.4 Time\nCorrelation requires accurate clocks: domain members synchronise time from\ndomain controllers (Windows Time service); standalone machines use an NTP\nsource. Indian covered entities must synchronise with NIC or NPL NTP\nservers under the CERT-In Directions (Course 01 Module 7).\n\n\n![C03-M07-D57: Process Creation Auditing: Event 4688 with Full Command Line Telemetry](/assets/courses/cyber-03/c03_m07_l02_process_creation_event_4688.png)\n\n*Figure C03-M07-D57: Enabling command line auditing in Event 4688: capturing parent process ancestry, creator subject, and full argument strings for threat triage.*\n\n"
    },
    {
      "id": "les_c3_m7_l3",
      "title": "7.3 Centralising Logs with WEF: Subscriptions, WinRM Transport & SIEM Aggregation",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Subscriptions, WinRM Transport & SIEM Aggregation.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Subscriptions, WinRM Transport & SIEM Aggregation.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l3_c03_m07_d58",
          "title": "C03-M07-D58: Windows Event Forwarding (WEF) Topology: Collector vs. Source-Initiated Subscriptions",
          "url": "/assets/courses/cyber-03/c03_m07_l03_wef_subscriptions_topology.png",
          "caption": "Figure C03-M07-D58: Centralized log aggregation with WEF: comparing Collector-Initiated push models with enterprise Source-Initiated (push over WinRM 5985/5986) architecture.",
          "alt": "Architecture diagram comparing collector-initiated versus source-initiated Windows Event Forwarding with WinRM and Kerberos/TLS"
        },
        {
          "id": "img_c3_m7_l3_c03_m07_d59",
          "title": "C03-M07-D59: Centralized SIEM Pipeline: Endpoints, WEF Collector & Real-Time Detection Rules",
          "url": "/assets/courses/cyber-03/c03_m07_l03_siem_forwarding_pipeline.png",
          "caption": "Figure C03-M07-D59: End-to-end telemetry pipeline from fleet endpoints through Windows Event Forwarding into an enterprise SIEM cluster with real-time detection rules.",
          "alt": "Dataflow diagram showing thousands of workstations and servers forwarding logs via WEF to SIEM indexers and SOC detection dashboards"
        }
      ],
      "content": "## 7.3 Centralising Logs with WEF: Subscriptions, WinRM Transport & SIEM Aggregation\n\n![C03-M07-D58: Windows Event Forwarding (WEF) Topology: Collector vs. Source-Initiated Subscriptions](/assets/courses/cyber-03/c03_m07_l03_wef_subscriptions_topology.png)\n\n*Figure C03-M07-D58: Centralized log aggregation with WEF: comparing Collector-Initiated push models with enterprise Source-Initiated (push over WinRM 5985/5986) architecture.*\n\nLESSON C03-M07-L03: Centralising logs\n=====================================\n\n2.3.1 Why centralise\nLocal logs are small, circular, and can be cleared by an attacker with\nadministrator rights (event 1102 records the clearing, but the evidence is\ngone). Central collection preserves evidence, enables correlation across\nsystems and supports retention requirements (for example 180 days for\nCERT-In covered entities).\n\n2.3.2 Methods\n  Windows Event Forwarding (WEF)  built-in: computers forward selected\n                                  events to a Windows Event Collector,\n                                  configured by Group Policy subscriptions\n                                  [C03-M07-R5].\n  Agents                          SIEM or EDR agents ship events (Wazuh,\n                                  vendor agents) - Course 08.\n  Syslog (Linux)                  rsyslog/journald forwarding (Module 3).\n\n2.3.3 Planning checklist\n  1. Which events? (Start with the list in L02 plus 4104 and Defender.)\n  2. From which systems? (Domain controllers and servers first, then\n     privileged workstations, then all endpoints.)\n  3. Volume and storage? Retention period?\n  4. Integrity and access control of the central store.\n  5. Time synchronisation.\n  6. Monitoring the pipeline itself - alert when a source stops sending\n     (Course 01 Module 6: controls fail silently).\n\n\n![C03-M07-D59: Centralized SIEM Pipeline: Endpoints, WEF Collector & Real-Time Detection Rules](/assets/courses/cyber-03/c03_m07_l03_siem_forwarding_pipeline.png)\n\n*Figure C03-M07-D59: End-to-end telemetry pipeline from fleet endpoints through Windows Event Forwarding into an enterprise SIEM cluster with real-time detection rules.*\n\n"
    },
    {
      "id": "les_c3_m7_l4",
      "title": "7.4 Active Directory Architecture: Forests, Domains, Trees, OUs & Kerberos Tickets",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Forests, Domains, Trees, OUs & Kerberos Tickets.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Forests, Domains, Trees, OUs & Kerberos Tickets.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l4_c03_m07_d60",
          "title": "C03-M07-D60: Active Directory Architecture: Forests, Domains, Trees & OU Tiering Models",
          "url": "/assets/courses/cyber-03/c03_m07_l04_ad_forests_domains_ous.png",
          "caption": "Figure C03-M07-D60: Hierarchical Active Directory Domain Services (AD DS) structure: Forest root domain, child trees, two-way transitive trusts, and OU tiering architecture.",
          "alt": "Hierarchical diagram of Active Directory forest, domains, tree trust boundaries, and Organizational Unit OU tiering architecture"
        },
        {
          "id": "img_c3_m7_l4_c03_m07_d61",
          "title": "C03-M07-D61: Kerberos Authentication Protocol Flow: AS-REQ/AS-REP, TGS-REQ/TGS-REP & AP-REQ",
          "url": "/assets/courses/cyber-03/c03_m07_l04_kerberos_authentication_flow.png",
          "caption": "Figure C03-M07-D61: Detailed 3-phase Kerberos v5 ticket exchange: Authentication Service (TGT request), Ticket-Granting Service (Service Ticket request), and Client Application session.",
          "alt": "Sequence diagram of Kerberos authentication showing AS-REQ, AS-REP with TGT, TGS-REQ, TGS-REP with service ticket, and AP-REQ to file server"
        }
      ],
      "content": "## 7.4 Active Directory Architecture: Forests, Domains, Trees, OUs & Kerberos Tickets\n\n![C03-M07-D60: Active Directory Architecture: Forests, Domains, Trees & OU Tiering Models](/assets/courses/cyber-03/c03_m07_l04_ad_forests_domains_ous.png)\n\n*Figure C03-M07-D60: Hierarchical Active Directory Domain Services (AD DS) structure: Forest root domain, child trees, two-way transitive trusts, and OU tiering architecture.*\n\nLESSON C03-M07-L04: Domains and directory concepts\n==================================================\n\n2.4.1 Workgroup versus domain\n  Workgroup  Each computer manages its own accounts and policy (the test\n             machine: PartOfDomain False, Workgroup WORKGROUP - execution-\n             tested via Win32_ComputerSystem). Fine for homes; unmanageable\n             at scale.\n  Domain     Computers trust a central directory (Active Directory Domain\n             Services) for accounts, authentication and policy.\n\n2.4.2 Active Directory building blocks (overview; Course 13 goes deep)\n  Domain controller (DC)    Server that hosts the directory database and\n                            authenticates users (Kerberos, NTLM) and answers\n                            LDAP queries.\n  Domain / forest           A domain is an administrative and replication\n                            boundary; a forest is a collection of domains\n                            sharing a schema and the top security boundary.\n  Organisational unit (OU)  A container for users, groups and computers\n                            used to delegate administration and link Group\n                            Policy.\n  Groups                    Security groups grant access; distribution\n                            groups are for email.\n  Sites                     Represent physical network locations for\n                            replication and authentication efficiency.\nDCs are the most valuable assets in a Windows enterprise: whoever controls\nthem controls every domain-joined computer (recall ED 21-04's insistence on\ndisabling Print Spooler on DCs, Module 5).\n\n2.4.3 Cloud identity\nMany organisations also use Microsoft Entra ID (formerly Azure AD) for cloud\napplications and device management, often synchronised with on-premises AD\n(\"hybrid identity\"). Devices can be Entra-joined and managed by Intune\nwithout an on-premises domain.\n\n\n![C03-M07-D61: Kerberos Authentication Protocol Flow: AS-REQ/AS-REP, TGS-REQ/TGS-REP & AP-REQ](/assets/courses/cyber-03/c03_m07_l04_kerberos_authentication_flow.png)\n\n*Figure C03-M07-D61: Detailed 3-phase Kerberos v5 ticket exchange: Authentication Service (TGT request), Ticket-Granting Service (Service Ticket request), and Client Application session.*\n\n\n\n:::math-steps\n### Kerberos v5 Ticket Validity Window & Skew Bounds\nCalculating ticket expiration and clock synchronization tolerance thresholds across Active Directory domain controllers.\n\n#### Step 1: Maximum Allowed Kerberos Clock Skew\nDefault Kerberos policy allows a maximum clock disparity of 5 minutes ($300$ seconds):\n$$|T_{\\text{Client}} - T_{\\text{KDC}}| \\le 300 \\text{ seconds}$$\n\n#### Step 2: Ticket-Granting Ticket (TGT) Lifetime\nDefault domain TGT validity duration:\n$$L_{\\text{TGT}} = 10 \\text{ hours} = 36{,}000 \\text{ seconds}$$\n\n#### Step 3: Maximum Renewal Window\n$$R_{\\text{TGT}} = 7 \\text{ days} = 604{,}800 \\text{ seconds}$$\n:::\n\n"
    },
    {
      "id": "les_c3_m7_l5",
      "title": "7.5 Group Policy Architecture: GPO Components, SYSVOL Replication & LSDOU Precedence",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of GPO Components, SYSVOL Replication & LSDOU Precedence.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of GPO Components, SYSVOL Replication & LSDOU Precedence.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l5_c03_m07_f2",
          "title": "C03-M07-F2: Group Policy Processing Order: The LSDOU Precedence Hierarchy",
          "url": "/assets/courses/cyber-03/C03-M07-F2.png",
          "caption": "Figure C03-M07-F2: Group Policy applies local, site, domain, then OU policies; later settings win unless Enforcement or Block Inheritance applies.",
          "alt": "Hierarchy diagram showing Group Policy processing order LSDOU: Local, Site, Domain, Organizational Unit, Enforced, and Block Inheritance"
        },
        {
          "id": "img_c3_m7_l5_c03_m07_d62",
          "title": "C03-M07-D62: Group Policy Architecture: Group Policy Container (AD) & Group Policy Template (SYSVOL)",
          "url": "/assets/courses/cyber-03/c03_m07_l05_gpo_gpc_gpt_sysvol.png",
          "caption": "Figure C03-M07-D62: Anatomy of a GPO: Active Directory Group Policy Container (GPC metadata) linked to SYSVOL Group Policy Template (GPT files and scripts).",
          "alt": "Diagram illustrating GPO split architecture between Active Directory GPC object and SYSVOL GPT filesystem folders"
        }
      ],
      "content": "## 7.5 Group Policy Architecture: GPO Components, SYSVOL Replication & LSDOU Precedence\n\n![C03-M07-F2: Group Policy Processing Order: The LSDOU Precedence Hierarchy](/assets/courses/cyber-03/C03-M07-F2.png)\n\n*Figure C03-M07-F2: Group Policy applies local, site, domain, then OU policies; later settings win unless Enforcement or Block Inheritance applies.*\n\nLESSON C03-M07-L05: Group Policy\n================================\n\n2.5.1 What Group Policy does\nGroup Policy applies settings to computers and users in a domain: security\noptions, audit policy, password policy (domain-level), software restriction,\nfirewall rules, scripts, registry settings and more [C03-M07-R6].\n\n2.5.2 Structure\n  Group Policy Object (GPO)   a named collection of settings with Computer\n                              Configuration and User Configuration parts.\n  Link                        a GPO applies when linked to a site, domain or\n                              OU.\n  Processing order (LSDOU)    Local policy, then Site, then Domain, then OU\n                              (parent to child). Later settings win on\n                              conflict, so OU-linked GPOs override\n                              domain-linked ones - unless a link is\n                              \"Enforced\", or inheritance is blocked.\n  Filtering                   security filtering (which groups the GPO\n                              applies to) and WMI filters.\n  Refresh                     computers apply policy at start-up and\n                              periodically (by default about every 90\n                              minutes with a random offset); gpupdate /force\n                              triggers it.\n\n2.5.3 Verifying what applied\n  gpresult /r            summary of applied GPOs for user and computer.\n  gpresult /h report.html  detailed HTML report.\n  rsop.msc               Resultant Set of Policy console.\nExecution-tested: gpresult /r ran on the workgroup machine and produced a\nreport header (\"Microsoft (R) Windows (R) Operating System Group Policy\nResult tool v2.0\"); with no domain, only local policy applies.\n\n2.5.4 Local Group Policy and Home editions\nStandalone Pro/Enterprise computers have a local policy editable with\ngpedit.msc; Windows Home editions do not include the editor (settings can be\napplied through the registry instead, as Module 6's practical noted).\n\n2.5.5 Security considerations\n  - GPOs are powerful: anyone who can edit a GPO linked to an OU can run code\n    on every computer in it. Restrict GPO edit rights and monitor changes.\n  - Document GPOs and test changes in a pilot OU first.\n  - Avoid storing passwords in GPO preferences (a historical weakness:\n    Microsoft security bulletin MS14-025 removed the ability to set\n    passwords in Group Policy Preferences).\n  - Modern alternative: MDM (Intune) configuration profiles for cloud-\n    managed devices.\n\n\n![C03-M07-D62: Group Policy Architecture: Group Policy Container (AD) & Group Policy Template (SYSVOL)](/assets/courses/cyber-03/c03_m07_l05_gpo_gpc_gpt_sysvol.png)\n\n*Figure C03-M07-D62: Anatomy of a GPO: Active Directory Group Policy Container (GPC metadata) linked to SYSVOL Group Policy Template (GPT files and scripts).*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: A SECURITY EVENT TRIAGE SCRIPT (ELEVATED)\n--------------------------------------------------------------------------------\n\n3.1 Purpose and status\nThe following script summarises key Security log events from the last 24\nhours. It must run elevated (the Security log requires it). Status: Not\nexecution-tested by the content team, because the test session was not\nelevated; the cmdlet usage follows Microsoft's Get-WinEvent documentation\n[C03-M07-R8]. Run it first on a test machine.\n\n  ---------------------------------------------------------------- BEGIN CODE\n  #Requires -RunAsAdministrator\n  $since = (Get-Date).AddHours(-24)\n  $ids   = 4624, 4625, 4672, 4720, 4728, 4732, 4740, 1102\n  $filter = @{ LogName = 'Security'; Id = $ids; StartTime = $since }\n  $events = Get-WinEvent -FilterHashtable $filter -ErrorAction SilentlyContinue\n  $events | Group-Object Id | Sort-Object Name |\n      Select-Object @{n='EventId'; e={$_.Name}}, Count\n  $events | Where-Object Id -eq 4625 | ForEach-Object {\n      $x = [xml]$_.ToXml()\n      [pscustomobject]@{\n          Time       = $_.TimeCreated\n          TargetUser = ($x.Event.EventData.Data | Where-Object Name -eq 'TargetUserName').'#text'\n          LogonType  = ($x.Event.EventData.Data | Where-Object Name -eq 'LogonType').'#text'\n          SourceIp   = ($x.Event.EventData.Data | Where-Object Name -eq 'IpAddress').'#text'\n      }\n  } | Select-Object -First 20\n  ------------------------------------------------------------------ END CODE\n\nLine by line:\n  #Requires -RunAsAdministrator  refuses to run unless elevated.\n  $ids     the event IDs from L02 most useful for a daily check.\n  -FilterHashtable with StartTime  efficient time-bounded query.\n  -ErrorAction SilentlyContinue  \"no events found\" is not an error here.\n  Group-Object Id  counts per event type - a quick health view: many 4625s\n           may indicate password guessing; any 1102 deserves immediate\n           attention; 4720/4728/4732 show account and group changes.\n  The 4625 block extracts target user, logon type and source address from\n           EventData (field names as documented for event 4625).\n\nInterpretation guidance: a cluster of 4625 events for many different user\nnames from one source address suggests password spraying (Course 01 Module\n3); repeated failures for one account followed by 4740 suggests guessing or\na stale saved password; 4672 for unexpected accounts suggests unexpected\nadministrator use.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M07-P1: Event log investigation on your own computer\n------------------------------------------------------------------\nObjective: Query and interpret Windows event logs.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell 5.1; administrator rights for the\nSecurity log steps (optional).\n\nPrerequisites: Lessons L01-L02.\n\nEnvironment setup: your own computer.\n\nExplicit authorised scope: your own computer's logs; read-only.\n\nStep-by-step instructions:\n  1. Run the -ListLog command from L01 and record sizes and modes. Why does\n     the Security log not appear in a standard session?\n  2. List the last five boots and shutdowns:\n     Get-WinEvent -FilterHashtable @{LogName='System'; Id=6005,6006,6008} -MaxEvents 5\n  3. Run the 7045 query from L01. For each service, check whether you\n     recognise the software and whether the account is appropriate.\n  4. Open Event Viewer, filter the System log for Error and Critical in the\n     last 7 days, and research the two most frequent sources.\n  5. (Elevated, optional) Run the triage script in section 3 on your own\n     machine and interpret the counts. Lock your screen and sign in again\n     first so that 4624/4634 events exist.\n  6. Write a short report: log configuration, notable events, questions you\n     would ask if this were a server.\n\nExpected observations: 6005/6006 pairs correspond to boots and clean\nshutdowns; 7045 shows software installations; Security queries fail without\nelevation.\n\nTroubleshooting: \"No events were found that match the specified selection\ncriteria\" is reported as an error by Get-WinEvent - add -ErrorAction\nSilentlyContinue when absence is acceptable.\n\nCleanup: none.\n\nLearning outcome: you can find and interpret Windows evidence.\n\nPRACTICAL C03-M07-P2: Design a patch and logging plan for a small enterprise\n---------------------------------------------------------------------------\nObjective: Plan update rings, prioritisation and log collection.\n\nDifficulty: Beginner/Intermediate.\n\nRequired tools: document or spreadsheet.\n\nPrerequisites: Lessons L03, L05, L06.\n\nEnvironment setup: none.\n\nExplicit authorised scope: fictional organisation.\n\nScenario (fictional): Banyan Microfinance (from Course 01's capstone) has\n650 Windows laptops, 25 Windows servers including 2 domain controllers and\nan internet-facing remote access gateway, and 10 Linux servers.\n\nStep-by-step instructions:\n  1. Define three or four deployment rings with membership and timing.\n  2. Define patch timelines by category (for example KEV-listed internet-\n     facing: within 72 hours; critical internal: 14 days; others: 30 days),\n     with justification.\n  3. List the metrics you will report monthly.\n  4. Choose which event IDs to forward from DCs, servers and laptops, and\n     estimate the order of priority.\n  5. State log retention and how you will meet the CERT-In 180-day\n     requirement.\n  6. Describe how you will detect configuration drift.\n\nExpected observations: DCs and the internet-facing gateway receive the\nfastest patching and most complete logging; laptops follow rings managed by\nIntune or Windows Update for Business; Linux servers use automated security\nupdates with verification.\n\nTroubleshooting: if timelines seem arbitrary, tie them to risk (Course 01\nModule 4) and regulator expectations.\n\nCleanup: none.\n\nLearning outcome: you can design enterprise patch and logging processes.\n\n--------------------------------------------------------------------------------\n\n"
    },
    {
      "id": "les_c3_m7_l6",
      "title": "7.6 Enterprise Patch & Configuration Management: WSUS, Deployment Rings & Drift",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of WSUS, Deployment Rings & Drift.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of WSUS, Deployment Rings & Drift.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m7_l6_c03_m07_f3",
          "title": "C03-M07-F3: Enterprise Patch Management Lifecycle: Phased Deployment Rings & Verification",
          "url": "/assets/courses/cyber-03/C03-M07-F3.png",
          "caption": "Figure C03-M07-F3: Patch management moves from inventory and prioritization through tested ring deployment to verification and operational metrics.",
          "alt": "Lifecycle flowchart of patch management showing asset inventory, vulnerability scoring, pilot/broad/production ring deployment, and audit verification"
        },
        {
          "id": "img_c3_m7_l6_c03_m07_d63",
          "title": "C03-M07-D63: Windows Server Update Services (WSUS) & Endpoint Ring Architecture",
          "url": "/assets/courses/cyber-03/c03_m07_l06_wsus_deployment_rings.png",
          "caption": "Figure C03-M07-D63: WSUS architecture: upstream Microsoft Update synchronization, downstream internal WSUS servers, and GPO client targeting into deployment rings.",
          "alt": "Diagram illustrating WSUS synchronization from Microsoft Update to internal corporate servers, distributing patches to Ring 0, Ring 1, and Ring 2 clients"
        }
      ],
      "content": "## 7.6 Enterprise Patch & Configuration Management: WSUS, Deployment Rings & Drift\n\n![C03-M07-F3: Enterprise Patch Management Lifecycle: Phased Deployment Rings & Verification](/assets/courses/cyber-03/C03-M07-F3.png)\n\n*Figure C03-M07-F3: Patch management moves from inventory and prioritization through tested ring deployment to verification and operational metrics.*\n\nLESSON C03-M07-L06: Patch and configuration management\n======================================================\n\n2.6.1 Windows servicing basics\nMicrosoft releases monthly cumulative security updates on the second\nTuesday of each month (\"Update Tuesday\" or \"Patch Tuesday\"), plus\nout-of-band updates for urgent issues. Cumulative updates include all\nprevious fixes, so a fully patched system needs only the latest one. Feature\nupdates (new Windows versions such as 24H2, 25H2) arrive on a separate\ncadence with defined support lifetimes.\n\nExecution-tested inventory:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-HotFix | Sort-Object InstalledOn -Descending |\n      Select-Object -First 3 HotFixID, Description, InstalledOn\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  HotFixID  Description     InstalledOn\n  --------  -----------     -----------\n  KB5127648 Security Update 19/10/2026 00:00:00\n  KB5127690 Update          19/10/2026 00:00:00\n  KB5127647 Security Update 14/10/2026 00:00:00\n  --------------------------------------------------------------- END OUTPUT\n\nGet-HotFix reads installed updates (Win32_QuickFixEngineering); it does not\nshow every component update (for example Microsoft Store apps or Defender\ndefinitions), so enterprises use management tools for complete compliance\ndata. Each KB number has a Microsoft support article listing its fixes.\n\n2.6.2 Tools\n  Windows Update / Windows Update for Business   policy-controlled updates\n                                                 with deferral rings.\n  Windows Autopatch                              Microsoft-managed rings.\n  WSUS                                           on-premises approval and\n                                                 distribution.\n  Microsoft Configuration Manager / Intune       inventory, deployment,\n                                                 compliance reporting.\n  Linux equivalents                              apt/dnf with automation\n                                                 (unattended-upgrades,\n                                                 Ansible), Module 3.\n\n2.6.3 A patch management process\n  1. Inventory: know every system and its software (Course 01 Module 1).\n  2. Monitor: vendor advisories (Microsoft Security Update Guide), CISA KEV.\n  3. Prioritise by risk: exposure, exploitation status, asset criticality\n     (Course 01 Module 4) - KEV-listed internet-facing flaws first.\n  4. Test: pilot ring of representative systems.\n  5. Deploy in rings: pilot -> broad -> critical servers, with rollback\n     plans (lesson from CrowdStrike, Module 1).\n  6. Verify: compliance reports, version checks, reboots completed.\n  7. Exceptions: documented, time-limited, with compensating controls.\n  8. Measure: time to patch by severity; percentage compliant.\nNIST SP 800-40 Rev. 4 frames enterprise patch management as preventive\nmaintenance and recommends planning it as a programme with defined\nprocesses and metrics [C03-M07-R7].\n\n2.6.4 Configuration management and drift\nPatching fixes code; configuration management keeps settings correct.\n  Baselines   documented secure configurations (Module 8: Microsoft Security\n              Baselines, CIS Benchmarks).\n  Enforcement Group Policy, Intune, PowerShell Desired State Configuration\n              (DSC), Ansible (in the RedKross blueprint's tool map for\n              Course 03).\n  Drift       the gradual divergence of real systems from the baseline\n              through manual changes and installs; detect it with periodic\n              compliance scans and file integrity monitoring, then correct\n              it automatically or through change control.\n  Change      every configuration change should be requested, approved,\n  control     tested, implemented, verified and recorded (Course 17).\n\n--------------------------------------------------------------------------------\n\n![C03-M07-D63: Windows Server Update Services (WSUS) & Endpoint Ring Architecture](/assets/courses/cyber-03/c03_m07_l06_wsus_deployment_rings.png)\n\n*Figure C03-M07-D63: WSUS architecture: upstream Microsoft Update synchronization, downstream internal WSUS servers, and GPO client targeting into deployment rings.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M07-CS1: Microsoft Exchange on-premises vulnerabilities and\nCISA ED 21-02 (March 2021) - patching under pressure\n-------------------------------------------------------------------------\nContext: many organisations ran on-premises Microsoft Exchange servers\nexposed to the internet for email and web access.\n\nWhat happened: in early March 2021 Microsoft released security updates for\ncritical vulnerabilities in on-premises Exchange that were being actively\nexploited. On 3 March 2021 CISA issued Emergency Directive 21-02, later\nsupplemented on 31 March and 13 April 2021 [C03-M07-R9].\n\nRequired actions (per the directive): identify all on-premises Exchange\nservers and collect and review artefacts for signs of compromise (agencies\nwithout that expertise were to disconnect instead); apply Microsoft's\nupdates immediately and remove from the network any server that could not\nbe updated; disconnect servers with indicators of compromise and not rejoin\nthem until rebuilt; report compromises; and later run Microsoft's detection\ntools and implement additional hardening, logging and identity controls.\nMicrosoft 365 / cloud-hosted Exchange was not known to be affected. The\ndirective was eventually closed, with remaining requirements moved under\nBOD 22-01.\n\nLessons learned:\n  - Inventory first: you cannot patch servers you do not know about.\n  - For actively exploited internet-facing flaws, patching may come too\n    late - assume compromise and investigate (logs and artefacts), not just\n    update.\n  - Logging and central collection (L01-L03) determine whether\n    investigation is possible.\n  - Moving a service to a managed cloud offering shifts some patching\n    responsibility to the provider (shared responsibility, Course 11).\n\nCASE STUDY C03-M07-CS2 (FICTIONAL TEACHING SCENARIO): The GPO linked to the\nwrong OU\n---------------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: at Sunrise Polytechnic (fictional), an administrator created a GPO\nthat disabled USB storage and set aggressive screen locks, intended for the\n\"Exam Lab Computers\" OU.\n\nProblem: the GPO was accidentally linked at the domain level and enforced.\nWithin 90 minutes, every staff laptop - including the finance team's -\nreceived the settings; a finance manager could not complete a bank\nsubmission that required a USB token.\n\nResponse: the link was removed; gpupdate /force was pushed; the change\nprocess was updated to require linking new GPOs first to a pilot OU,\nreviewing gpresult on test machines, and peer review of link location.\n\nLessons: GPO scope is powerful; understand LSDOU, enforcement and filtering;\ntest before broad application.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M07-F1: Windows event log pipeline\nPurpose: Show sources, channels and collection.\n\n  [BEGIN DIAGRAM]\n  [Kernel/services] [Security subsystem LSASS] [PowerShell] [Defender] [Apps]\n         |                  |  (audit policy decides     |          |\n         v                  v   what is written)         v          v\n  System log         Security log (admin only)   Operational channels  Application\n         \\                  |                         /                /\n          +----- .evtx files (circular, size-limited) ----------------+\n                            |\n             Windows Event Forwarding / SIEM agent\n                            |\n             CENTRAL COLLECTOR / SIEM  (retention, correlation, alerting;\n                                        monitor for silent sources)\n  [END DIAGRAM]\n\nCaption: Figure C03-M07-F1. Windows components write to channels governed by\naudit policy; events are forwarded to a central collector for retention and\nanalysis.\nAccessibility description: Sources at the top - kernel and services, the\nsecurity subsystem, PowerShell, Defender and applications - write to the\nSystem, Security, operational and Application logs, stored as size-limited\nevtx files, which are forwarded through WEF or an agent to a central SIEM.\n\nFIGURE C03-M07-F2: Group Policy processing order (LSDOU)\nPurpose: Show precedence.\n\n  [BEGIN DIAGRAM]\n  1 LOCAL policy        (lowest precedence)\n        |\n  2 SITE-linked GPOs\n        |\n  3 DOMAIN-linked GPOs  e.g. \"Default Domain Policy\"\n        |\n  4 OU-linked GPOs      parent OU -> child OU   (highest precedence;\n        |                                        last writer wins)\n  Exceptions: \"Enforced\" links cannot be overridden lower down;\n              \"Block inheritance\" on an OU stops non-enforced parent GPOs.\n  Verify on a target: gpresult /r  or  gpresult /h report.html\n  [END DIAGRAM]\n\nCaption: Figure C03-M07-F2. Group Policy applies local, site, domain then OU\npolicies; later settings win unless enforcement or blocking applies.\nAccessibility description: A vertical sequence of four levels - local, site,\ndomain and OU - with notes that the last applied wins, enforced links cannot\nbe overridden, blocked inheritance stops parent GPOs, and gpresult verifies\nresults.\n\nFIGURE C03-M07-F3: Patch management lifecycle with rings\nPurpose: Show the end-to-end process.\n\n  [BEGIN DIAGRAM]\n  [Inventory] -> [Monitor advisories + KEV] -> [Prioritise by risk]\n                                                      |\n       v\n  [Test] -> [Ring 0 pilot (IT)] -> [Ring 1 early adopters] -> [Ring 2 broad]\n                                                                   |\n                                         [Ring 3 critical servers / DCs]\n                                                                   |\n  [Verify compliance + reboots] -> [Exceptions with compensating controls]\n                 |\n            [Metrics: time-to-patch, % compliant] -> back to Inventory\n  [END DIAGRAM]\n\nCaption: Figure C03-M07-F3. Patch management moves from inventory and\nprioritisation through tested ring deployment to verification and metrics.\nAccessibility description: A flow: inventory, monitor advisories, prioritise,\ntest, then rings 0 to 3, then verification, exceptions and metrics, looping\nback to inventory.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nWindows writes events to channels (Application, Security, System, Setup,\nForwarded, and operational channels such as PowerShell) stored as\nsize-limited, often circular .evtx files; Event Viewer, Get-WinEvent\n(-FilterHashtable, XML EventData) and wevtutil query them. The Security log\nrequires elevation. Key events include 4624/4625 (logon types), 4672, 4688,\n4697/7045, 4698, 4720-4726, 4728/4732/4756, 4740, 1102, 4104 and 6005/6006/\n6008; audit policy determines what is recorded, and Sysmon and command-line\nlogging add visibility. Logs must be centralised (WEF or agents) for\nretention, integrity and correlation, with monitoring of silent sources and\nsynchronised time. Domains (AD DS: DCs, domains, forests, OUs, groups, sites)\ncentralise identity; Entra ID provides cloud identity. Group Policy applies\nGPOs linked to sites, domains and OUs in LSDOU order, with enforcement,\nblocking and filtering, verified with gpresult; GPO edit rights are\nprivileged. Windows servicing delivers monthly cumulative updates; patch\nmanagement runs inventory, monitoring (KEV), risk-based prioritisation,\ntesting, ring deployment, verification, exceptions and metrics (NIST SP\n800-40 Rev. 4). Configuration management enforces baselines and detects\ndrift. ED 21-02 showed that actively exploited internet-facing flaws require\ninvestigation as well as patching.\n\n8.2 Important concepts\n  - Audit policy defines evidence.\n  - Central logs survive attackers and time.\n  - GPO scope and edit rights are powerful.\n  - Patch by risk, verify by evidence.\n\n8.3 Key technical takeaways\n  - Get-WinEvent -ListLog / -FilterHashtable / [xml]$_.ToXml().\n  - gpresult /r, gpupdate /force, auditpol /get (elevated).\n  - Get-HotFix for update inventory (partial view).\n\n8.4 Glossary\n  Audit policy     Settings deciding which security events are logged.\n  Circular log     Log overwriting oldest events when full.\n  Cumulative update  Update containing all previous fixes.\n  Domain controller  Server hosting AD DS and authenticating users.\n  Drift            Divergence of configuration from baseline.\n  EventData        Structured fields within an event.\n  GPO              Group Policy Object.\n  LSDOU            Local, Site, Domain, OU processing order.\n  OU               Organisational unit.\n  Patch Tuesday    Second Tuesday monthly security release.\n  Ring deployment  Staged rollout to groups of systems.\n  Sysmon           Sysinternals System Monitor.\n  WEF              Windows Event Forwarding.\n  WSUS             Windows Server Update Services.\n\n8.5 Common mistakes\n  - Relying on default local log sizes.\n  - Parsing message text instead of EventData fields.\n  - Linking GPOs broadly without pilot testing.\n  - \"Patched\" claims without verification.\n  - Treating patching as the end of an incident for exploited flaws.\n\n8.6 Revision questions\n  1. List eight Security event IDs and their meaning.\n  2. Explain why 1102 is significant.\n  3. Describe LSDOU with an example conflict.\n  4. Design a four-ring update plan.\n  5. Explain the difference between patch and configuration management.\n\n8.7 Further reading\n  - Microsoft Learn, Security auditing event reference [C03-M07-R2].\n  - NIST SP 800-40 Rev. 4 [C03-M07-R7].\n  - CISA ED 21-02 [C03-M07-R9].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
