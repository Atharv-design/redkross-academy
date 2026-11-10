/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 7 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module7QuestionBank = [
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
  },
  {
    "id": "q_c3_m7_021",
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
    "id": "q_c3_m7_022",
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
    "id": "q_c3_m7_023",
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
    "id": "q_c3_m7_024",
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
    "id": "q_c3_m7_025",
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
    "id": "q_c3_m7_026",
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
    "id": "q_c3_m7_027",
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
    "id": "q_c3_m7_028",
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
    "id": "q_c3_m7_029",
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
    "id": "q_c3_m7_030",
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
    "id": "q_c3_m7_031",
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
    "id": "q_c3_m7_032",
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
    "id": "q_c3_m7_033",
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
    "id": "q_c3_m7_034",
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
    "id": "q_c3_m7_035",
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
    "id": "q_c3_m7_036",
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
    "id": "q_c3_m7_037",
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
    "id": "q_c3_m7_038",
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
    "id": "q_c3_m7_039",
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
    "id": "q_c3_m7_040",
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
    "id": "q_c3_m7_041",
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
    "id": "q_c3_m7_042",
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
    "id": "q_c3_m7_043",
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
    "id": "q_c3_m7_044",
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
    "id": "q_c3_m7_045",
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
    "id": "q_c3_m7_046",
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
    "id": "q_c3_m7_047",
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
    "id": "q_c3_m7_048",
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
    "id": "q_c3_m7_049",
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
    "id": "q_c3_m7_050",
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
    "id": "q_c3_m7_051",
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
    "id": "q_c3_m7_052",
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
    "id": "q_c3_m7_053",
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
    "id": "q_c3_m7_054",
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
    "id": "q_c3_m7_055",
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
    "id": "q_c3_m7_056",
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
    "id": "q_c3_m7_057",
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
    "id": "q_c3_m7_058",
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
    "id": "q_c3_m7_059",
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
    "id": "q_c3_m7_060",
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
    "id": "q_c3_m7_061",
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
    "id": "q_c3_m7_062",
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
    "id": "q_c3_m7_063",
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
    "id": "q_c3_m7_064",
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
    "id": "q_c3_m7_065",
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
    "id": "q_c3_m7_066",
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
    "id": "q_c3_m7_067",
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
    "id": "q_c3_m7_068",
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
    "id": "q_c3_m7_069",
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
    "id": "q_c3_m7_070",
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
    "id": "q_c3_m7_071",
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
    "id": "q_c3_m7_072",
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
    "id": "q_c3_m7_073",
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
    "id": "q_c3_m7_074",
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
    "id": "q_c3_m7_075",
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
    "id": "q_c3_m7_076",
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
    "id": "q_c3_m7_077",
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
    "id": "q_c3_m7_078",
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
    "id": "q_c3_m7_079",
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
    "id": "q_c3_m7_080",
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
    "id": "q_c3_m7_081",
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
    "id": "q_c3_m7_082",
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
    "id": "q_c3_m7_083",
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
    "id": "q_c3_m7_084",
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
    "id": "q_c3_m7_085",
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
    "id": "q_c3_m7_086",
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
    "id": "q_c3_m7_087",
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
    "id": "q_c3_m7_088",
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
    "id": "q_c3_m7_089",
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
    "id": "q_c3_m7_090",
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
    "id": "q_c3_m7_091",
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
    "id": "q_c3_m7_092",
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
    "id": "q_c3_m7_093",
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
    "id": "q_c3_m7_094",
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
    "id": "q_c3_m7_095",
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
    "id": "q_c3_m7_096",
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
    "id": "q_c3_m7_097",
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
    "id": "q_c3_m7_098",
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
    "id": "q_c3_m7_099",
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
    "id": "q_c3_m7_100",
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
    "id": "q_c3_m7_101",
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
    "id": "q_c3_m7_102",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_103",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_104",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_105",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_106",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_107",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_108",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_109",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_110",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_111",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_112",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_113",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_114",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_115",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_116",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_117",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_118",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_119",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_120",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_121",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_122",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_123",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_124",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_125",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_126",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_127",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_128",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_129",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_130",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_131",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_132",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_133",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_134",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_135",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_136",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_137",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_138",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_139",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_140",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_141",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_142",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_143",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_144",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_145",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_146",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_147",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_148",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_149",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_150",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_151",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_152",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_153",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_154",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_155",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_156",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_157",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_158",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_159",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_160",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_161",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_162",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_163",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_164",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_165",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_166",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_167",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_168",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_169",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_170",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_171",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_172",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_173",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_174",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_175",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_176",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_177",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_178",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_179",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_180",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_181",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_182",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_183",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_184",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_185",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_186",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_187",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_188",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_189",
    "topic": "Kerberos v5 Authentication (AS, TGS, AP Exchanges)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_190",
    "topic": "Group Policy Architecture (GPC, GPT, SYSVOL Replication)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_191",
    "topic": "Group Policy Precedence (LSDOU, Enforced, Block Inheritance)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_192",
    "topic": "Enterprise Patch Management & WSUS Deployment Rings",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_193",
    "topic": "Windows Event Log Architecture, Channels & EVTX Storage",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_194",
    "topic": "Event XML Schema (<System> Header & <EventData> Payload)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_195",
    "topic": "High-Fidelity Security Event IDs (Logon Types 2/3/10)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_196",
    "topic": "Process Tracking with Command Line Auditing (Event 4688)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_197",
    "topic": "Windows Event Forwarding (WEF) & WinRM Subscriptions",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_198",
    "topic": "Enterprise SIEM Pipeline & Detection Rules",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_199",
    "topic": "Active Directory Architecture (Forests, Domains, Trees, OUs)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  },
  {
    "id": "q_c3_m7_200",
    "topic": "Tiered Administration (Tier 0/1/2 Architecture)",
    "difficulty": "difficult",
    "q": "In an Active Directory domain with Group Policy configured at Local, Site, Domain, and Organizational Unit (OU) levels, how is policy conflict resolved by default according to the LSDOU rule?",
    "options": [
      "The setting in the policy applied latest (the closest OU containing the target object) overrides conflicting settings from upstream levels.",
      "The Site-level policy always wins because it governs the physical network subnet boundary.",
      "The Domain-level policy takes precedence over all child OUs unless an administrator explicitly creates a local policy.",
      "Group Policy merges conflicting registry keys into an array without overwriting previous values."
    ],
    "correct": 0,
    "explanation": "Group Policy applies in order: Local, Site, Domain, Organizational Unit (LSDOU). Later settings overwrite earlier settings. Therefore, the closest OU containing the object wins, unless upstream policies are set to \"Enforced\"."
  }
];
