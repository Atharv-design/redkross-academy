/**
 * Course 03: Linux and Windows System Administration
 * Module 6: PowerShell Administration
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module6Data = {
  "id": "mod_c3_6",
  "title": "Module 6: PowerShell Administration",
  "description": "Enterprise administration through PowerShell: Windows PowerShell 5.1 vs. PowerShell 7, typed object pipelines, cmdlets, advanced script functions, parameter validation, safe execution (-WhatIf), Constrained Language Mode, and deep auditing with Script Block Logging.",
  "order": 6,
  "quiz": {
    "id": "quiz_mod_c3_6",
    "title": "Module 6: PowerShell Administration Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m6_001",
        "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
        "difficulty": "medium",
        "q": "In an advanced PowerShell function declared with [CmdletBinding(SupportsShouldProcess)], what happens when an administrator runs the command with the \"-WhatIf\" parameter?",
        "options": [
          "The cmdlet evaluates validation and displays what actions would occur without making any actual modifications to the system.",
          "The cmdlet prompts the user with an interactive Yes/No confirmation dialog before executing each step.",
          "The cmdlet launches an isolated Virtual Machine sandbox to run the command in test mode.",
          "The cmdlet records the command into the Windows Security event log without executing it."
        ],
        "correct": 0,
        "explanation": "-WhatIf simulates the execution: $PSCmdlet.ShouldProcess() prints an informational message describing the intended change and safely bypasses destructive actions."
      },
      {
        "id": "q_c3_m6_002",
        "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
        "difficulty": "difficult",
        "q": "What is the security impact of placing PowerShell into Constrained Language Mode (CLM) via AppLocker or WDAC?",
        "options": [
          "Direct .NET type manipulation, arbitrary C# compilation (Add-Type), and COM object creation are blocked, neutralizing memory injection techniques.",
          "PowerShell cmdlets are restricted to reading text files smaller than 1 megabyte.",
          "Scripts can only execute if the workstation is disconnected from the network.",
          "Users can no longer pipe objects between native PowerShell cmdlets."
        ],
        "correct": 0,
        "explanation": "CLM restricts PowerShell language features: unapproved scripts cannot instantiate arbitrary .NET types or call reflection APIs, neutralizing in-memory malware loaders."
      },
      {
        "id": "q_c3_m6_003",
        "topic": "Object Pipeline vs. Text Stream Mechanics",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_004",
        "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_005",
        "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_006",
        "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_007",
        "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_008",
        "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_009",
        "topic": "Execution Policies vs. True Security Boundaries",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_010",
        "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_011",
        "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_012",
        "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_013",
        "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_014",
        "topic": "Object Pipeline vs. Text Stream Mechanics",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_015",
        "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_016",
        "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_017",
        "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_018",
        "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_019",
        "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      },
      {
        "id": "q_c3_m6_020",
        "topic": "Execution Policies vs. True Security Boundaries",
        "difficulty": "medium",
        "q": "How does the PowerShell object pipeline fundamentally differ from traditional Unix/Linux text streaming pipelines?",
        "options": [
          "PowerShell passes strongly typed .NET objects with live accessible properties and methods, rather than raw unstructured text streams.",
          "PowerShell streams binary machine code directly to the CPU registers, eliminating kernel context switches.",
          "Linux pipelines can only pass numeric data, whereas PowerShell supports string characters.",
          "PowerShell pipelines store data on NVMe disk temporary files between each cmdlet execution."
        ],
        "correct": 0,
        "explanation": "PowerShell pipelines pass strongly typed .NET objects. Downstream cmdlets can directly access object properties (e.g. $_.Status) without requiring fragile string parsing or regex column extraction."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m6_l1",
      "title": "6.1 PowerShell Editions, Cmdlets & Help: Verb-Noun Syntax, Providers & Discovery",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Verb-Noun Syntax, Providers & Discovery.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Verb-Noun Syntax, Providers & Discovery.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l1_c03_m06_d46",
          "title": "C03-M06-D46: PowerShell Evolution: Windows PowerShell 5.1 (.NET Framework) vs. PowerShell 7+ (.NET Core)",
          "url": "/assets/courses/cyber-03/c03_m06_l01_powershell_editions_evolution.png",
          "caption": "Figure C03-M06-D46: Architectural differences between legacy Windows PowerShell 5.1 (powershell.exe, Windows-only) and modern PowerShell 7+ (pwsh, cross-platform).",
          "alt": "Comparison chart of Windows PowerShell 5.1 on .NET Framework versus PowerShell 7 on modern cross-platform .NET Core"
        },
        {
          "id": "img_c3_m6_l1_c03_m06_d47",
          "title": "C03-M06-D47: PowerShell Discovery Model: Get-Command, Get-Help & Get-Member Taxonomy",
          "url": "/assets/courses/cyber-03/c03_m06_l01_discovery_command_help_member.png",
          "caption": "Figure C03-M06-D47: The foundational discovery triumvirate of PowerShell: Get-Command (finds cmdlets), Get-Help (reads documentation), and Get-Member (inspects .NET objects).",
          "alt": "Diagram illustrating the PowerShell discovery workflow: finding commands with Get-Command, learning usage with Get-Help, and revealing object methods with Get-Member"
        }
      ],
      "content": "## 6.1 PowerShell Editions, Cmdlets & Help: Verb-Noun Syntax, Providers & Discovery\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-D46: PowerShell Evolution: Windows PowerShell 5.1 (.NET Framework) vs. PowerShell 7+ (.NET Core)](/assets/courses/cyber-03/c03_m06_l01_powershell_editions_evolution.png)\n\n*Figure C03-M06-D46: Architectural differences between legacy Windows PowerShell 5.1 (powershell.exe, Windows-only) and modern PowerShell 7+ (pwsh, cross-platform).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Runtime & Framework Substrate:** Contrasts the foundational runtimes powering both editions. Legacy Windows PowerShell 5.1 is tightly coupled to the proprietary, Windows-only .NET Framework (CLR 4.0), making it incapable of running on Linux or macOS. Modern PowerShell 7+ is built on top of high-performance, open-source .NET (CLR 8/9), enabling true cross-platform execution.\n- **Process Binary & Side-by-Side Coexistence:** Highlights the binary separation:\n  - Windows PowerShell 5.1 executes as `powershell.exe` (located immutably in `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\`). It is considered an operating system component and receives only critical security fixes.\n  - PowerShell 7+ executes as `pwsh.exe` on Windows and `pwsh` on Linux/macOS. It installs side-by-side in independent application directories (`C:\\Program Files\\PowerShell\\7\\`), eliminating breaking version collisions.\n- **Encoding & Character Set Invariants:** Visualizes the default encoding shift. PowerShell 5.1 defaults to UTF-16LE or Windows-1252 for redirects, frequently introducing corrupt file headers when interfacing with Linux utilities. PowerShell 7+ standardizes on UTF-8 without Byte Order Mark (BOM) across all platforms.\n- **Remoting & Parallel Processing Enhancements:** Details modern capabilities in `pwsh`, including native SSH-based PowerShell Remoting (replacing legacy WinRM requirements) and multithreaded pipeline scaling using `ForEach-Object -Parallel` for high-throughput security automation.\n\n### 2.1.1 Two editions\n\n- **Windows PowerShell 5.1:** Built into Windows, based on .NET Framework, executable powershell.exe. No longer receiving new features but supported as part of Windows.\n- **PowerShell 7.x:** Cross-platform (Windows, Linux, macOS), open source, based on modern .NET, executable pwsh.exe; installed separately. Microsoft recommends it for new work [C03-M06-R1].\nCheck your version: $PSVersionTable.PSVersion (execution-tested: 5.1 build\n26100 on the test machine).\n\nWindows PowerShell 2.0 was deprecated in 2017 and Microsoft removed it from\nWindows 11 version 24H2 (from August 2025 updates) and Windows Server 2025\n(from September 2025 updates); scripts requesting version 2 now fall back to\n5.1 [C03-M06-R2]. Removal matters for security because version 2 lacks the\nlogging and AMSI features described below.\n\n### 2.1.2 Cmdlets and naming\n\nCommands follow a Verb-Noun pattern: Get-Service, Stop-Process,\nSet-ItemProperty, New-LocalUser. Approved verbs (Get-Verb) make commands\npredictable. Parameters start with a dash and can be abbreviated if\nunambiguous; positional parameters can omit the name. Aliases exist for\nconvenience (ls, dir, cd, gcim) but should be avoided in scripts for\nreadability. Execution-tested: Get-Command -CommandType Cmdlet returned 643\ncmdlets on the test machine (the number depends on installed modules).\n\n### 2.1.3 Discovering commands and help\n\n  Get-Command *service*        find commands by name\n- **Get-Command -Noun Process:** by noun\n- **Get-Help Get-Service -Full:** full help (Update-Help downloads current help files)\n- **Get-Help about_Pipelines:** conceptual \"about\" topics\n- **Get-Member:** shows an object's type, properties and methods\n\nExecution-tested:\n\n```powershell\nGet-Process -Id $PID | Get-Member -MemberType Property | Select-Object -First 5 Name\n```\n\n```terminal\nBasePriority\n  Container\n  EnableRaisingEvents\n  ExitCode\n  ExitTime\n```\n\n$PID is an automatic variable holding the current PowerShell process ID;\nGet-Member reveals what you can select, filter or sort on.\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D47: PowerShell Discovery Model: Get-Command, Get-Help & Get-Member Taxonomy](/assets/courses/cyber-03/c03_m06_l01_discovery_command_help_member.png)\n\n*Figure C03-M06-D47: The foundational discovery triumvirate of PowerShell: Get-Command (finds cmdlets), Get-Help (reads documentation), and Get-Member (inspects .NET objects).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **The Discovery Triumvirate Lifecycle:** Depicts the three interconnected cmdlets that make PowerShell self-documenting and discoverable without external web documentation:\n- **Cmdlet Discovery via Get-Command:** The starting point of operational discovery. Queries the active cmdlet and function database using standard Verb-Noun grammar patterns (e.g., `Get-Command *Firewall* -Verb Set, New`). It allows engineers to discover available automation commands across newly installed modules without memorizing arbitrary utility names.\n- **Documentation & Syntax via Get-Help:** The semantic guidance engine. Ingests cmdlet names and returns formal syntax diagrams, mandatory parameter lists, pipeline capabilities, and verified code demonstrations (e.g., `Get-Help Set-NetFirewallRule -Examples` or `-ShowWindow`).\n- **Object Introspection via Get-Member:** The runtime object inspector. Pipelining any command into `Get-Member` (e.g., `Get-Service | Get-Member`) reflects the underlying .NET class type (`System.ServiceProcess.ServiceController`), listing all available Methods (actions) and Properties (attributes).\n- **Defensive Significance:** Empowers incident responders and SOC analysts to quickly inspect live process, service, and network connection objects in memory to extract hidden metadata (such as binary hashes, thread IDs, and owner SIDs) without relying on third-party inspection tools."
    },
    {
      "id": "les_c3_m6_l2",
      "title": "6.2 The Object Pipeline: .NET Object Streams vs. Text Parsing & Memory Projection",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of .NET Object Streams vs. Text Parsing & Memory Projection.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of .NET Object Streams vs. Text Parsing & Memory Projection.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l2_c03_m06_f1",
          "title": "C03-M06-F1: Text Pipeline vs. Object Pipeline: Linux String Streaming vs. .NET Object Projection",
          "url": "/assets/courses/cyber-03/C03-M06-F1.png",
          "caption": "Figure C03-M06-F1: Bash pipelines pass raw text streams requiring fragile parsing; PowerShell passes strongly typed .NET objects with accessible properties.",
          "alt": "Diagram comparing Linux text stream piping requiring regex/awk parsing with PowerShell typed object piping retaining property access"
        },
        {
          "id": "img_c3_m6_l2_c03_m06_d48",
          "title": "C03-M06-D48: PowerShell Pipeline Filtering & Projection: Where-Object, Select-Object & Measure-Object",
          "url": "/assets/courses/cyber-03/c03_m06_l02_pipeline_filtering_projection.png",
          "caption": "Figure C03-M06-D48: Sequential object stream processing: filtering rows with Where-Object, shaping columns with Select-Object, and statistical aggregation with Measure-Object.",
          "alt": "Pipeline flow diagram showing objects flowing through Where-Object filtering, Select-Object shaping, and Measure-Object aggregation"
        }
      ],
      "content": "## 6.2 The Object Pipeline: .NET Object Streams vs. Text Parsing & Memory Projection\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-F1: Text Pipeline vs. Object Pipeline: Linux String Streaming vs. .NET Object Projection](/assets/courses/cyber-03/C03-M06-F1.png)\n\n*Figure C03-M06-F1: Bash pipelines pass raw text streams requiring fragile parsing; PowerShell passes strongly typed .NET objects with accessible properties.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **POSIX / Bash Text-Stream Pipeline (Left Panel):** Illustrates traditional Unix pipeline mechanics (`ps aux | grep nginx | awk '{print $2}'`). The operating system transmits unstructured, newline-delimited ASCII/UTF-8 byte streams across anonymous pipes. Downstream commands must write fragile string manipulation scripts (using `sed`, `awk`, and `cut`) that break if upstream utilities alter whitespace padding, date formats, or localized column headers.\n- **PowerShell Object-Oriented Pipeline (Right Panel):** Depicts PowerShell's strongly typed .NET object pipeline (`Get-Process nginx | Select-Object -ExpandProperty Id`). Rather than passing text strings, cmdlets emit rich in-memory .NET objects (`System.Diagnostics.Process`).\n- **Direct Property Access & Type Safety:** Demonstrates how downstream cmdlets directly address structured object members (`$_.CPU`, `$_.WorkingSet`, `$_.Handles`) with complete mathematical and type integrity (integers remain integers; timestamps remain `System.DateTime` objects).\n- **Defensive Engineering Implication:** Eliminates parsing vulnerabilities and script breakage in automated incident response runbooks, ensuring that automated containment actions (such as killing rogue processes or isolating host NICs) execute with 100% precision without accidental targeting errors.\n\n### 2.2.1 Objects, not text\n\nIn bash, ps | grep matches text. In PowerShell, Get-Service | Where-Object\nStatus -eq 'Running' compares a property of each service object. No parsing\nis needed, and output is reliable regardless of column widths.\n\n### 2.2.2 Core pipeline cmdlets\n\n- **Where-Object (Filter):** `Where-Object { $_.StartMode -eq 'Auto' }` (`$_` is the current object).\n- **Select-Object (Choose):** `Select-Object Name, Status -First 5` (also supports calculated properties, below).\n- **Sort-Object (Order):** `Sort-Object Count -Descending`.\n- **Group-Object (Group):** `Group-Object StartName`.\n- **Measure-Object (Count/Sum):** `Measure-Object -Property Length -Sum`.\n- **ForEach-Object (Iterate):** `ForEach-Object { $_.Name.ToUpper() }`.\n\n### 2.2.3 Calculated properties\n\n```powershell\nSelect-Object Name, @{Name='WS_MB'; Expression={[math]::Round($_.WorkingSet64/1MB)}}\n```\nCreates a new property on the fly. Module 1 used this pattern to show\nprocess memory in MB (execution-tested).\n\n### 2.2.4 Output: format versus export\n\n- **Format-Table / Format-List:** for display only - they produce formatting objects, so never pipe them into further processing or export.\n  Export-Csv / ConvertTo-Json / Out-File / Set-Content\n                              for data. Use -NoTypeInformation with\n                              Export-Csv in Windows PowerShell 5.1.\nRule: filter left, format right - filter as early as possible, format only\nat the end.\n\n### 2.2.5 Worked example (execution-tested)\n\n```powershell\nGet-CimInstance Win32_Service |\n      Group-Object StartName |\n      Sort-Object Count -Descending |\n      Select-Object -First 3 Count, Name\n```\n\nResult on the test machine: LocalSystem 183, NT AUTHORITY\\LocalService 69,\n27 with no account listed - four commands, no text parsing.\n\n### 2.2.6 Providers\n\nPowerShell exposes data stores as drives: FileSystem (C:), Registry (HKLM:,\nHKCU:), Environment (Env:), Certificate (Cert:), Variable, Function. The same\ncmdlets (Get-ChildItem, Get-Item, Set-Item) work across them - for example\nGet-ChildItem Cert:\\LocalMachine\\Root lists trusted root certificates.\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D48: PowerShell Pipeline Filtering & Projection: Where-Object, Select-Object & Measure-Object](/assets/courses/cyber-03/c03_m06_l02_pipeline_filtering_projection.png)\n\n*Figure C03-M06-D48: Sequential object stream processing: filtering rows with Where-Object, shaping columns with Select-Object, and statistical aggregation with Measure-Object.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Sequential Pipeline Dataflow:** Visualizes the transformation of a stream of live objects through sequential filtering, projection, and aggregation stages:\n- **Object Generation (Source):** `Get-Process` queries the Windows Executive process manager, emitting thousands of strongly typed process objects into the pipeline.\n- **Row-Level Filtering with Where-Object:** Depicts the conditional filter gate (`Where-Object { $_.WorkingSet -gt 100MB }`). Only objects satisfying the predicate condition are permitted to pass downstream; non-matching objects are immediately garbage collected, conserving system memory.\n- **Column-Level Projection with Select-Object:** Shows property shaping (`Select-Object Name, Id, CPU, WorkingSet`). Extracts specific object members, discards extraneous metadata, or defines calculated properties (e.g., converting bytes to megabytes on the fly).\n- **Statistical Aggregation with Measure-Object:** Illustrates the terminal aggregation stage (`Measure-Object -Property WorkingSet -Sum -Average -Maximum`). The cmdlet computes statistical summaries across the incoming object collection, outputting total memory consumption and peak process metrics.\n- **Operational Performance Best Practice:** Emphasizes \"filter left, format right\"—applying filtering cmdlets as early in the pipeline as possible to minimize object serialization overhead and maximize execution speed."
    },
    {
      "id": "les_c3_m6_l3",
      "title": "6.3 Variables, Types & Control Flow: Primitives, Collections, Hash Tables & Loops",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Primitives, Collections, Hash Tables & Loops.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Primitives, Collections, Hash Tables & Loops.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l3_c03_m06_d49",
          "title": "C03-M06-D49: PowerShell Data Structures: Arrays, Hash Tables & PSCustomObject Construction",
          "url": "/assets/courses/cyber-03/c03_m06_l03_data_structures_pscustomobject.png",
          "caption": "Figure C03-M06-D49: Construction and memory layout of PowerShell collections: ordered arrays (@()), key-value hash tables (@{}), and structured custom objects ([PSCustomObject]@{}).",
          "alt": "Diagram illustrating PowerShell arrays, hash tables, and custom object property bags"
        },
        {
          "id": "img_c3_m6_l3_c03_m06_d50",
          "title": "C03-M06-D50: PowerShell Control Flow & Error Trapping: Try/Catch/Finally & $ErrorActionPreference",
          "url": "/assets/courses/cyber-03/c03_m06_l03_control_flow_try_catch.png",
          "caption": "Figure C03-M06-D50: Error handling mechanics in PowerShell: converting non-terminating errors into terminating exceptions with -ErrorAction Stop, and handling with Try/Catch/Finally.",
          "alt": "Flowchart showing error handling flow in PowerShell with Try, Catch, Finally blocks and ErrorAction Stop behavior"
        }
      ],
      "content": "## 6.3 Variables, Types & Control Flow: Primitives, Collections, Hash Tables & Loops\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-D49: PowerShell Data Structures: Arrays, Hash Tables & PSCustomObject Construction](/assets/courses/cyber-03/c03_m06_l03_data_structures_pscustomobject.png)\n\n*Figure C03-M06-D49: Construction and memory layout of PowerShell collections: ordered arrays (@()), key-value hash tables (@{}), and structured custom objects ([PSCustomObject]@{}).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Ordered Array Memory Layout (`@()`):** Dissects the linear, zero-indexed array structure (`[System.Object[]]`). Elements are indexed sequentially (`$arr[0]`, `$arr[1]`). Highlights the critical memory pitfall: .NET arrays are fixed-size in memory; using `+= ` in loops forces the runtime to allocate a completely new array and copy all elements on every iteration, leading to exponential $O(n^2)$ memory degradation on large datasets.\n- **Key-Value Hashtables (`@{ }`):** Visualizes the dictionary structure (`[System.Collections.Hashtable]`). Key-value pairs are mapped into memory buckets using hash functions, providing rapid $O(1)$ lookups by key (e.g., `$hash['SRV01']`). Hashtables are ideal for lookup tables, caching host state, and parameter splatting.\n- **Structured Custom Objects (`[PSCustomObject]@{}`):** Depicts the gold standard for defensive scripting output. Wraps key-value hashtables into first-class .NET objects where keys become strongly typed properties.\n- **Pipeline Interoperability:** Shows how `[PSCustomObject]` instances naturally support pipelining into standard formatting, export, and analysis cmdlets (`Export-Csv`, `ConvertTo-Json`, `Out-GridView`), enabling seamless integration into enterprise logging pipelines.\n\n### 2.3.1 Variables and types\n\n  $name = 'RedKross'             string ('' literal, \"\" expands variables)\n  $count = 42                    Int32\n  [int]$top = 5                  type constraint\n  $now = Get-Date                DateTime object\n  $list = @('a','b','c')         array; $list[0], $list.Count\n  $h = @{ Host='srv1'; Port=443 }  hashtable; $h.Host, $h['Port']\n  [pscustomobject]@{ A=1; B=2 }   custom object (structured output)\nAutomatic variables: $_ (current pipeline object), $PSItem (same), $PID,\n$Error, $LASTEXITCODE (exit code of the last native program), $true, $false,\n$null.\n\n### 2.3.2 Operators\n\n- **Comparison:** -eq -ne -gt -ge -lt -le (case-insensitive by default; -ceq is case-sensitive)\n- **Pattern:** -like 'svc*'  wildcard; -match '^\\d+$' regex\n- **Membership:** -in, -contains\n- **Logical:** -and, -or, -not (!)\n- **Strings:** -replace, -split, -join\nNote: = assigns; -eq compares. Writing if ($a = 5) is a bug.\n\n### 2.3.3 Control flow\n\n  if (...) { } elseif (...) { } else { }\n  switch ($x) { 'start' { } 'stop' { } default { } }\n  foreach ($s in $services) { }\n  for ($i = 0; $i -lt 10; $i++) { }\n  while (...) { }\n  try { } catch { } finally { }\n\n### 2.3.4 Strings and expansion safety\n\nDouble-quoted strings expand variables and subexpressions: \"Total:\n$($services.Count)\". When building commands from input, never concatenate\nuntrusted text into Invoke-Expression; pass values as parameters instead\n(the PowerShell equivalent of avoiding eval in bash).\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D50: PowerShell Control Flow & Error Trapping: Try/Catch/Finally & $ErrorActionPreference](/assets/courses/cyber-03/c03_m06_l03_control_flow_try_catch.png)\n\n*Figure C03-M06-D50: Error handling mechanics in PowerShell: converting non-terminating errors into terminating exceptions with -ErrorAction Stop, and handling with Try/Catch/Finally.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Non-Terminating Errors vs. Terminating Exceptions:** Details PowerShell's bifurcated error architecture. By default, cmdlets emit non-terminating errors (such as a missing file in `Get-Item`) to the error stream (Stream 2) and continue executing subsequent commands without interrupting script flow.\n- **Error Promotion with `-ErrorAction Stop`:** Shows how appending `-ErrorAction Stop` (or setting `$ErrorActionPreference = 'Stop'`) forces the runtime to promote a non-terminating operational error into a terminating .NET exception (`System.Management.Automation.ActionPreferenceStopException`). This promotion is required to trigger `try/catch` blocks.\n- **Try / Catch / Finally Control Flow:**\n  - **Try Block:** Encloses critical operations that might fail (e.g., network socket calls, registry edits).\n  - **Catch Block:** Intercepts the terminating exception, captures the error record in `$_`, and inspects `$_.Exception.Message` and `$_.InvocationInfo` to execute graceful recovery or logging.\n  - **Finally Block:** Guarantees unconditional execution regardless of whether the try block succeeded or caught an error, ensuring database connections, network sockets, and file handles are safely released.\n- **Defensive Scripting Invariant:** Uncaught non-terminating errors allow compromised or broken automation scripts to execute subsequent commands against unintended targets, potentially exacerbating outages or security incidents."
    },
    {
      "id": "les_c3_m6_l4",
      "title": "6.4 Advanced Functions & Validation: CmdletBinding, Pipeline Inputs & Error Traps",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of CmdletBinding, Pipeline Inputs & Error Traps.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of CmdletBinding, Pipeline Inputs & Error Traps.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l4_c03_m06_f3",
          "title": "C03-M06-F3: ShouldProcess Flow in a Script: Implementing -WhatIf & -Confirm Safety Nets",
          "url": "/assets/courses/cyber-03/C03-M06-F3.png",
          "caption": "Figure C03-M06-F3: Validation and read-only gathering happen first; destructive changes run only if ShouldProcess approves, supporting -WhatIf dry-runs.",
          "alt": "Flowchart showing ShouldProcess validation and decision flow supporting -WhatIf and -Confirm parameters in advanced functions"
        },
        {
          "id": "img_c3_m6_l4_c03_m06_d51",
          "title": "C03-M06-D51: Advanced Function Architecture: [CmdletBinding()] & Parameter Validation Attributes",
          "url": "/assets/courses/cyber-03/c03_m06_l04_advanced_functions_validation.png",
          "caption": "Figure C03-M06-D51: Anatomy of an advanced PowerShell function: [CmdletBinding()], param() block validation ([ValidateNotNullOrEmpty()], [ValidateSet()]), and begin/process/end blocks.",
          "alt": "Diagram illustrating advanced PowerShell function structure with parameter validation attributes and pipeline processing blocks"
        }
      ],
      "content": "## 6.4 Advanced Functions & Validation: CmdletBinding, Pipeline Inputs & Error Traps\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-F3: ShouldProcess Flow in a Script: Implementing -WhatIf & -Confirm Safety Nets](/assets/courses/cyber-03/C03-M06-F3.png)\n\n*Figure C03-M06-F3: Validation and read-only gathering happen first; destructive changes run only if ShouldProcess approves, supporting -WhatIf dry-runs.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Two-Phase Operational Design Pattern:** Details the defensive software engineering pattern mandated for any function performing destructive or state-altering system modifications:\n- **Phase 1: Read-Only Discovery & Validation:** The function executes read-only queries (e.g., querying Active Directory accounts, inspecting firewall rules) and validates input parameters without altering system state.\n- **Phase 2: ShouldProcess Decision Gate:** Highlights the condition:\n  `if ($PSCmdlet.ShouldProcess($TargetObject, $ActionDescription))`\n  This built-in method evaluates the user's intent and command-line flags before any change is made:\n  - If `-WhatIf` is specified, PowerShell prints what action *would* be taken against the target object and bypasses the code block entirely.\n  - If `-Confirm` is specified, PowerShell pauses execution and displays an interactive confirmation dialog prompting the administrator for explicit approval.\n  - If no flags are passed (standard execution), `ShouldProcess` returns `$true` and executes the destructive modification.\n- **Defensive Significance:** Implementing `SupportsShouldProcess` provides a native safety net across production environments, allowing administrators to simulate complex remediation scripts (such as disabling stale user accounts or revoking firewall permissions) before executing them live.\n\n### 2.4.1 Scripts and advanced functions\n\nA script is a .ps1 file. Adding [CmdletBinding()] and a param() block makes\nit behave like a cmdlet: common parameters (-Verbose, -Debug, -ErrorAction)\nand, with SupportsShouldProcess, -WhatIf and -Confirm [C03-M06-R3].\n\n### 2.4.2 Parameter validation attributes\n\n  [Parameter(Mandatory)]          must be supplied\n  [ValidateNotNullOrEmpty()]      not empty\n  [ValidateRange(1,50)]           numeric range\n  [ValidateSet('Dev','Prod')]     allowed values\n  [ValidatePattern('^[a-z]+$')]   regex\nValidation runs before the script body, so bad input never reaches your\nlogic. Execution-tested: -Top 99 was rejected with \"The 99 argument is\ngreater than the maximum allowed range of 50.\"\n\n### 2.4.3 Error handling\n\n  $ErrorActionPreference = 'Stop'   make non-terminating errors terminating\n                                    so try/catch catches them.\n  try { ... } catch { Write-Error \"...: $($_.Exception.Message)\"; exit 1 }\n- **Set-StrictMode -Version Latest:** errors on uninitialised variables and other mistakes (similar to bash set -u).\n  Write-Verbose / Write-Warning / Write-Error   appropriate output streams.\nNative programs (like icacls) do not throw PowerShell exceptions; check\n$LASTEXITCODE after calling them.\n\n### 2.4.4 Execution-tested pitfall 1: -WhatIf leaks into module auto-loading\n\nThe first run of the example script with -WhatIf printed a dozen unexpected\nlines such as:\n  What if: Performing the operation \"Set Alias\" on target \"Name: gcim Value:\n  Get-CimInstance\".\nCause: -WhatIf sets $WhatIfPreference for the script, and that preference\nalso applied while PowerShell automatically loaded the CimCmdlets module and\ncreated its aliases.\n\n### 2.4.5 Execution-tested pitfall 2: Import-Module has no -WhatIf\n\nThe obvious fix, Import-Module CimCmdlets -WhatIf:$false, failed with\n\"A parameter cannot be found that matches parameter name 'WhatIf'\" - and the\nerror was reported against the script itself, which was misleading.\nImport-Module in Windows PowerShell 5.1 does not support -WhatIf. The working\nfix switches the preference off in a child scope just for the import:\n\n```powershell\n& { $WhatIfPreference = $false; Import-Module CimCmdlets }\n```\n\nLessons: test safety features themselves; read error messages critically;\nand use (Get-Command <cmd>).Parameters to check what a cmdlet supports.\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D51: Advanced Function Architecture: [CmdletBinding()] & Parameter Validation Attributes](/assets/courses/cyber-03/c03_m06_l04_advanced_functions_validation.png)\n\n*Figure C03-M06-D51: Anatomy of an advanced PowerShell function: [CmdletBinding()], param() block validation ([ValidateNotNullOrEmpty()], [ValidateSet()]), and begin/process/end blocks.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Advanced Function Architecture:** Deconstructs the professional PowerShell cmdlet template:\n- **CmdletBinding Attribute:** The `[CmdletBinding(SupportsShouldProcess = $true)]` declaration upgrades a basic function into an advanced cmdlet, automatically introducing standard common parameters (`-Verbose`, `-Debug`, `-ErrorAction`, `-WhatIf`, `-Confirm`).\n- **Parameter Block Validation Attributes:** Dissects declarative parameter constraints inside `param()`:\n  - `[Parameter(Mandatory = $true, ValueFromPipeline = $true)]`: Enforces required input and wires parameters to incoming pipeline objects.\n  - `[ValidateNotNullOrEmpty()]`: Prevents execution against null or whitespace strings.\n  - `[ValidateSet('Audit', 'Enforce', 'Disabled')]`: Restricts arguments strictly to an approved whitelist of strings.\n  - `[ValidatePattern('^\\d{1,3}(\\.\\d{1,3}){3}$')]`: Enforces regex formatting on IP addresses.\n- **Pipeline Execution Lifecycle Blocks:**\n  - **begin { }:** Executes once before any pipeline objects arrive, initializing database connections, API tokens, and logging buffers.\n  - **process { }:** Executes once for *every individual object* streaming through the pipeline, performing the core operational logic.\n  - **end { }:** Executes once after all pipeline objects are consumed, closing connections and outputting aggregated metrics.\n- **Defensive Invariant:** Advanced parameter validation acts as an input sanitization firewall, preventing command injection and malformed argument processing before any executable logic runs."
    },
    {
      "id": "les_c3_m6_l5",
      "title": "6.5 Safe Administration: Execution Policies, Code Signing & ShouldProcess (-WhatIf)",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Execution Policies, Code Signing & ShouldProcess (-WhatIf).",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Execution Policies, Code Signing & ShouldProcess (-WhatIf).",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l5_c03_m06_d52",
          "title": "C03-M06-D52: PowerShell Execution Policies vs. True Security Boundaries: The Bypass Reality",
          "url": "/assets/courses/cyber-03/c03_m06_l05_execution_policies_reality.png",
          "caption": "Figure C03-M06-D52: Demystifying Execution Policies (Restricted, RemoteSigned, AllSigned): why execution policy is a user safety net, not a security boundary.",
          "alt": "Infographic contrasting PowerShell execution policies with true security boundaries, illustrating execution policy bypass techniques"
        },
        {
          "id": "img_c3_m6_l5_c03_m06_d53",
          "title": "C03-M06-D53: Constrained Language Mode (CLM) & Application Whitelisting (WDAC/AppLocker)",
          "url": "/assets/courses/cyber-03/c03_m06_l05_clm_applocker_wdac.png",
          "caption": "Figure C03-M06-D53: Hardening PowerShell with Constrained Language Mode (CLM) coupled with AppLocker or Windows Defender Application Control (WDAC).",
          "alt": "Diagram showing how AppLocker and WDAC enforce Constrained Language Mode to block arbitrary .NET method calls and COM objects"
        }
      ],
      "content": "## 6.5 Safe Administration: Execution Policies, Code Signing & ShouldProcess (-WhatIf)\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-D52: PowerShell Execution Policies vs. True Security Boundaries: The Bypass Reality](/assets/courses/cyber-03/c03_m06_l05_execution_policies_reality.png)\n\n*Figure C03-M06-D52: Demystifying Execution Policies (Restricted, RemoteSigned, AllSigned): why execution policy is a user safety net, not a security boundary.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Execution Policy Levels:** Details the standard execution policy configurations:\n  - **Restricted:** Default on Windows clients; permits interactive commands but blocks execution of any `.ps1` script files.\n  - **RemoteSigned:** Standard on Windows Server; permits local scripts to run unsigned, but requires scripts downloaded from the internet to possess a valid digital signature from a trusted certificate authority.\n  - **AllSigned:** Requires every script (local and remote) to be signed with a trusted digital certificate.\n  - **Bypass / Unrestricted:** No restrictions; all scripts execute with optional warnings for internet downloads.\n- **Why Execution Policy Is Not a Security Boundary:** Illustrates Microsoft's formal architectural position: execution policy is a user safety net designed to prevent accidental script execution, *not* an access control or sandbox boundary.\n- **Adversary Bypass Demonstrations:** Visualizes trivial, non-privileged bypass vectors accessible to any standard user:\n  - `powershell.exe -ExecutionPolicy Bypass -File script.ps1`\n  - `Get-Content script.ps1 | powershell.exe -`\n  - `powershell.exe -EncodedCommand <Base64String>`\n  - In-memory download and execution via `Invoke-Expression (IEX)`.\n- **Defensive Reality:** Security teams must never rely on execution policies to block malicious code; true code execution prevention requires AppLocker or Windows Defender Application Control (WDAC).\n\n### 2.5.1 -WhatIf and -Confirm\n\nCmdlets that change state (Stop-Service, Remove-Item, Set-ADUser) usually\nsupport -WhatIf (show what would happen) and -Confirm (ask first). Use\n-WhatIf before any bulk change. Make your own scripts support them with\nSupportsShouldProcess and $PSCmdlet.ShouldProcess() around changes.\n\n### 2.5.2 Execution policy - a safety net, not a security boundary\n\nExecution policy controls whether scripts run and whether they must be\nsigned (Restricted, AllSigned, RemoteSigned, Unrestricted, Bypass), at scopes\nMachinePolicy, UserPolicy, Process, CurrentUser and LocalMachine.\nExecution-tested Get-ExecutionPolicy -List on the test machine:\nLocalMachine RemoteSigned; Process Bypass (set by the hosting session); all\nothers Undefined. Microsoft states that execution policy is not a security\nsystem that restricts user actions - users can bypass it, for example by\npasting script content - and that it helps prevent accidental execution\n[C03-M06-R4]. Real enforcement comes from application control (L05.4).\n\n### 2.5.3 Script signing\n\nSigning scripts with a code-signing certificate (Set-AuthenticodeSignature)\nlets AllSigned policies and application control verify publisher and\nintegrity (Course 15 explains digital signatures).\n\n### 2.5.4 Application control and Constrained Language Mode\n\nWith application control policies (Windows Defender Application Control /\nApp Control for Business, or AppLocker) enforcing, PowerShell runs untrusted\nscripts in Constrained Language Mode, which blocks access to arbitrary .NET\ntypes, COM objects and other powerful features while still allowing basic\nadministration. Execution-tested: $ExecutionContext.SessionState.LanguageMode\nreturned FullLanguage on the test machine, which has no application control\npolicy.\n\n### 2.5.5 Just Enough Administration (JEA)\n\nJEA provides PowerShell remoting endpoints where users can run only specific\ncommands, with parameters restricted, under a virtual or managed account -\nrole-based, least-privilege administration that is fully logged\n[C03-M06-R5]. Example use: let help-desk staff restart print services and\nreset specific accounts without being administrators.\n\n### 2.5.6 AMSI\n\nThe Antimalware Scan Interface lets security products inspect PowerShell\nscript content at run time - including content that was obfuscated or\nloaded only in memory - before it executes. It is supported in PowerShell\n5.0 and later, another reason to remove version 2.\n\n### 2.5.7 Remoting basics\n\nPowerShell remoting (WinRM; Enter-PSSession, Invoke-Command) runs commands on\nremote machines with Kerberos authentication in domains. Restrict who can use\nit, prefer JEA endpoints for delegated tasks, and log it.\n\n### 2.5.8 Government guidance\n\nThe joint Cybersecurity Information Sheet \"Keeping PowerShell: Security\nMeasures to Use and Embrace\" (NSA, CISA, and the New Zealand and UK NCSCs,\nJune 2022) recommends keeping PowerShell rather than removing it, and\nusing its security features: deep script block logging, module logging and\ntranscription (disabled by default), Constrained Language Mode with\napplication control, secure remoting, antimalware integration and upgrading\nto PowerShell 7 where possible [C03-M06-R6].\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D53: Constrained Language Mode (CLM) & Application Whitelisting (WDAC/AppLocker)](/assets/courses/cyber-03/c03_m06_l05_clm_applocker_wdac.png)\n\n*Figure C03-M06-D53: Hardening PowerShell with Constrained Language Mode (CLM) coupled with AppLocker or Windows Defender Application Control (WDAC).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Language Mode Comparison (FullLanguage vs. ConstrainedLanguage):** Contrasts the unrestricted FullLanguage mode (which permits arbitrary .NET reflection, COM object creation, and direct Win32 API memory access) against Constrained Language Mode (CLM).\n- **Constrained Language Mode (CLM) Restrictions:** Visualizes the lockdown of the PowerShell engine:\n  - Disables direct invocation of unapproved .NET types and methods (e.g., `[System.Runtime.InteropServices.Marshal]` or `[System.Reflection.Assembly]`).\n  - Blocks Win32 API calls via `Add-Type` and dynamic C# compilation.\n  - Disables COM object manipulation and custom class declarations.\n  - Restricts access strictly to core cmdlets and whitelisted primitive types.\n- **Enforcement via WDAC and AppLocker:** Depicts the architectural linkage: when Windows Defender Application Control (WDAC) or AppLocker enforces code integrity on an endpoint, PowerShell automatically detects the policy and forces all untrusted, unsigned scripts into Constrained Language Mode.\n- **Mitigating Living-off-the-Land (LotL) Attacks:** Explains how CLM effectively neutralizes memory-injection frameworks (such as PowerShell-based Cobalt Strike beacons or Mimikatz runners) by denying access to memory-manipulation .NET APIs."
    },
    {
      "id": "les_c3_m6_l6",
      "title": "6.6 PowerShell Security & Telemetry: AMSI, Script Block Logging & Obfuscation Triage",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of AMSI, Script Block Logging & Obfuscation Triage.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of AMSI, Script Block Logging & Obfuscation Triage.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m6_l6_c03_m06_f2",
          "title": "C03-M06-F2: Layers of PowerShell Security: Delegation, App Control, Safety Nets, AMSI & Logging",
          "url": "/assets/courses/cyber-03/C03-M06-F2.png",
          "caption": "Figure C03-M06-F2: PowerShell defense-in-depth: delegation (JEA), application control (WDAC), safety nets, AMSI in-memory inspection, and script block logging.",
          "alt": "Layered security diagram showing the defensive rings of PowerShell from JEA to WDAC, AMSI, Script Block Logging, and legacy engine removal"
        },
        {
          "id": "img_c3_m6_l6_c03_m06_d54",
          "title": "C03-M06-D54: PowerShell Telemetry & De-obfuscation: AMSI Buffers, EID 4104 & Base64 Unpacking",
          "url": "/assets/courses/cyber-03/c03_m06_l06_amsi_script_block_deobfuscation.png",
          "caption": "Figure C03-M06-D54: How Script Block Logging (Event ID 4104) and AMSI defeat obfuscation by capturing the final de-obfuscated code block directly at execution time.",
          "alt": "Diagram showing an obfuscated PowerShell payload being unrolled and captured in Event ID 4104 logs and inspected by AMSI"
        }
      ],
      "content": "## 6.6 PowerShell Security & Telemetry: AMSI, Script Block Logging & Obfuscation Triage\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M06-F2: Layers of PowerShell Security: Delegation, App Control, Safety Nets, AMSI & Logging](/assets/courses/cyber-03/C03-M06-F2.png)\n\n*Figure C03-M06-F2: PowerShell defense-in-depth: delegation (JEA), application control (WDAC), safety nets, AMSI in-memory inspection, and script block logging.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Concentric Five-Layer PowerShell Security Architecture:** Depicts the layered defensive posture designed to neutralize malicious PowerShell tradecraft across the enterprise:\n- **Layer 1: Least-Privilege Delegation (JEA):** Just Enough Administration (JEA) establishes non-administrative remote endpoints where operators connect and execute only a tightly whitelisted set of specific cmdlets and parameters without administrative credentials.\n- **Layer 2: Application Control & Language Hardening (WDAC):** Windows Defender Application Control enforces code integrity and locks untrusted execution down to Constrained Language Mode (CLM).\n- **Layer 3: Accidental Execution Guardrails:** Execution policies serve as a basic safety net preventing naive users from double-clicking untrusted scripts.\n- **Layer 4: In-Memory Runtime Inspection (AMSI):** Antimalware Scan Interface inspects dynamically generated, in-memory script buffers immediately prior to execution, detecting obfuscated payloads.\n- **Layer 5: Enterprise Telemetry & Auditing:** Script Block Logging (Event ID 4104), Module Logging (Event ID 4103), and Transcription forward complete execution records to central SIEM platforms for threat hunting.\n\n### 2.6.1 Three logging features\n\n- **Module logging:** Event ID 4103 in Microsoft-Windows-PowerShell/ Operational: pipeline execution details for specified modules.\n- **Script block logging:** Event ID 4104: the text of script blocks as they are compiled - including de-obfuscated content. Microsoft documents that PowerShell automatically logs script blocks containing suspicious content at warning level even when the policy is not enabled; enabling the policy logs all script blocks [C03-M06-R7].\n- **Transcription:** Writes a text transcript of input and output for each session to a chosen folder (ideally a protected central share).\n\n### 2.6.2 Configuring logging\n\nGroup Policy: Computer Configuration > Administrative Templates > Windows\nComponents > Windows PowerShell (Turn on Module Logging; Turn on PowerShell\nScript Block Logging; Turn on PowerShell Transcription). The settings are\nstored under HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\.\nExecution-tested on the test machine: none of the three policy keys existed\n(logging policies not configured), yet a 4104 event was present in the\nOperational log - consistent with PowerShell's automatic logging of certain\nscript blocks. On a managed estate these policies should be enabled and the\nlogs forwarded to a SIEM (Course 08).\n\n### 2.6.3 Transcripts on demand (execution-tested)\n\n```powershell\n$t = Join-Path $env:TEMP 'rk-transcript.txt'\n  Start-Transcript -Path $t\n  Get-Date -Format o\n  Stop-Transcript\n  Get-Content $t | Select-Object -First 4\n  Remove-Item $t\n```\n\n```terminal\n**********************\n  Windows PowerShell transcript start\n  Start time: 20261107023616\n  Username: RK-HOST\\Mario\n```\n\n  (computer name shown as RK-HOST)\n\n### 2.6.4 Reading PowerShell events\n\n```powershell\n$log = 'Microsoft-Windows-PowerShell/Operational'\n  Get-WinEvent -LogName $log -FilterXPath '*[System[EventID=4104]]' -MaxEvents 5 |\n      Select-Object TimeCreated, Id, LevelDisplayName\n```\n\n(Reading event logs is covered fully in Module 7.)\n\n### 2.6.5 Privacy and protection of logs\n\nScript block logs and transcripts can capture secrets typed or embedded in\nscripts. Protect log storage, restrict access, and design scripts to avoid\nhandling plain-text secrets (use SecretManagement modules, credential\nobjects, managed identities - Course 11 and Course 12). Microsoft also\noffers Protected Event Logging, which encrypts sensitive event content.\n\n## 3. TECHNICAL DEEP DIVE: THE SERVICE REPORT SCRIPT, LINE BY LINE\n\n3.1 File and status\nLAB_ASSETS/C03/Get-RkServiceReport.ps1 - read-only reporting script.\nExecution-tested on Windows PowerShell 5.1 (Windows 11 build 26200).\n\n3.2 Code (abridged help block)\n\n```powershell\n[CmdletBinding(SupportsShouldProcess)]\n  param(\n      [Parameter(Mandatory)]\n      [ValidateNotNullOrEmpty()]\n      [string]$OutputFolder,\n\n      [ValidateRange(1, 50)]\n      [int]$Top = 5\n  )\n\n  Set-StrictMode -Version Latest\n  $ErrorActionPreference = 'Stop'\n  & { $WhatIfPreference = $false; Import-Module CimCmdlets }\n\n  try {\n      $services = Get-CimInstance -ClassName Win32_Service\n  }\n  catch {\n      Write-Error \"Could not query services: $($_.Exception.Message)\"\n      exit 1\n  }\n\n  $summary = $services |\n      Group-Object -Property StartName |\n      Sort-Object -Property Count -Descending |\n      Select-Object -First $Top -Property Count,\n          @{ Name = 'Account'; Expression = { if ($_.Name) { $_.Name } else { '(none listed)' } } }\n\n  $highPriv = $services |\n      Where-Object { $_.StartName -eq 'LocalSystem' -and\n                     $_.StartMode -eq 'Auto' -and $_.State -eq 'Running' } |\n      Select-Object Name, DisplayName, State, StartMode, PathName\n\n  Write-Verbose \"Total services: $($services.Count); running LocalSystem auto: $($highPriv.Count)\"\n\n  if ($PSCmdlet.ShouldProcess($OutputFolder, 'Write report files')) {\n      New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null\n      $summary  | Export-Csv -Path (Join-Path $OutputFolder 'accounts.csv') -NoTypeInformation\n      $highPriv | ConvertTo-Json -Depth 2 |\n          Set-Content -Path (Join-Path $OutputFolder 'localsystem-auto.json') -Encoding UTF8\n  }\n\n  [pscustomobject]@{\n      TotalServices          = $services.Count\n      RunningLocalSystemAuto = $highPriv.Count\n      TopAccounts            = ($summary | ForEach-Object { \"$($_.Account)=$($_.Count)\" }) -join '; '\n  }\n```\n\n### 3.3 Explanation\n\n- **CmdletBinding:** `[CmdletBinding(SupportsShouldProcess)]` enables `-Verbose`, `-WhatIf`, `-Confirm`, and other common parameters.\n- **param(...):** Mandatory, non-empty output folder; `Top` limited to 1–50.\n- **Set-StrictMode / Stop:** Fail on mistakes and make errors catchable.\n- **Dynamic Import:** `& { ... Import-Module }` implements the pitfall fix from Lesson 4.\n- **try/catch:** A clear message and exit code 1 if the query fails.\n- **Group/Sort/Select:** The pipeline from Lesson 2; the calculated property replaces empty account names with \"(none listed)\".\n- **Where-Object:** High-privilege, automatic, running services — candidates for review in hardening (Module 8).\n- **ShouldProcess:** Wraps the only state-changing operations (creating folder and files); with `-WhatIf` they are described but not performed.\n- **pscustomobject:** `[pscustomobject]` structured result that other scripts can consume.\n\n3.4 Results (exact, selected)\n\n```terminal\n== WhatIf run\n  What if: Performing the operation \"Write report files\" on target \"C:\\Users\\...\\Temp\\rk-report\".\n  TotalServices RunningLocalSystemAuto TopAccounts\n  ------------- ---------------------- -----------\n            300                     56 LocalSystem=183; NT AUTHORITY\\LocalService=69; ...\n  folder created? False\n  == real run (-Top 3)\n            300                     56 LocalSystem=183; NT AUTHORITY\\LocalService=69; (none listed)=27\n  folder created? True\n  accounts.csv:\n  \"Count\",\"Account\"\n  \"183\",\"LocalSystem\"\n  \"69\",\"NT AUTHORITY\\LocalService\"\n  \"27\",\"(none listed)\"\n```\n\n#### Architectural Telemetry Analysis\n\nand were running - the list to review first. -WhatIf produced no files.\n\n## 4. REAL-WORLD CASE STUDIES\n\n### CASE STUDY C03-M06-CS1: \"Keeping PowerShell\" - government guidance to secure rather than remove (June 2022)\nContext: because attackers frequently use PowerShell after gaining access,\nsome organisations had considered removing or blocking it entirely - which\nalso removes a key administration and defence tool.\n\nWhat the guidance says: in June 2022 the NSA, CISA and the national cyber\nsecurity centres of New Zealand and the United Kingdom published the\nCybersecurity Information Sheet \"Keeping PowerShell: Security Measures to\nUse and Embrace\". It recommends keeping PowerShell and configuring its\nsecurity features: enabling deep script block logging, module logging and\nover-the-shoulder transcription (noting they are disabled by default), using\nConstrained Language Mode together with AppLocker or WDAC, securing\nremoting, integrating antimalware scanning, and moving to PowerShell 7\n[C03-M06-R6].\n\nHow it applies: these are exactly the features in L05-L06. Removing\nPowerShell 2.0 (now done by Microsoft) closes a path around those\nprotections.\n\nLessons learned:\n- Visibility beats prohibition: logging lets defenders see both legitimate\n    and malicious use.\n- Application control, not execution policy, provides enforcement.\n- Least-privilege delegation (JEA) reduces the number of administrators.\n\n### CASE STUDY C03-M06-CS2 (FICTIONAL TEACHING SCENARIO): The bulk change without -WhatIf\nThis scenario is fictional.\n\nContext: an administrator at Marigold Insurance Brokers (fictional) wanted\nto disable stale test accounts with:\n  Get-LocalUser | Where-Object LastLogon -lt (Get-Date).AddDays(-90) |\n      Disable-LocalUser\non a set of kiosk computers.\n\nProblem: accounts that had never logged on have an empty LastLogon value,\nwhich compared as \"less than\" the date in this filter, so the command also\ndisabled newly created service accounts, breaking kiosk applications. (The\ncomparison behaviour is real and was execution-tested by the content team in\nWindows PowerShell 5.1: $null -lt (Get-Date).AddDays(-90) returns True, and\nWhere-Object LastLogon -lt $date selects objects whose LastLogon is $null.)\n\nResponse: accounts were re-enabled; the script was rewritten to exclude\nempty values explicitly, to output a list first with -WhatIf, and to require\napproval before the real run.\n\nLessons: always preview bulk changes with -WhatIf; handle $null explicitly in\nfilters; test on a small set first.\n\n## 5. PRACTICAL LEARNING\n\n### Technical Mathematical Specification: Enterprise Event Telemetry Sizing & Storage Quotas\n\nSecurity Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n\n\n![C03-M06-D54: PowerShell Telemetry & De-obfuscation: AMSI Buffers, EID 4104 & Base64 Unpacking](/assets/courses/cyber-03/c03_m06_l06_amsi_script_block_deobfuscation.png)\n\n*Figure C03-M06-D54: How Script Block Logging (Event ID 4104) and AMSI defeat obfuscation by capturing the final de-obfuscated code block directly at execution time.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Adversary Code Obfuscation Pipeline:** Traces a complex, multi-layered malicious payload utilizing string formatting, variable expansion, tick mark insertion (`d`o`w`n`l`o`a`d`), XOR decryption, and Base64 encoding to evade traditional network-based and static disk-based antivirus scanners.\n- **Abstract Syntax Tree (AST) Compilation:** Illustrates the PowerShell engine receiving the obfuscated input. Before the code can execute, the parser must unpack, resolve, and compile the instructions into a concrete in-memory Abstract Syntax Tree.\n- **AMSI In-Memory Buffer Interception:** Visualizes the Antimalware Scan Interface hook. Immediately prior to execution, the compiled AST buffer is passed into `AmsiScanBuffer`. Security solutions (such as Microsoft Defender) evaluate the de-obfuscated plaintext code against heuristic signatures, terminating execution if malicious patterns are detected.\n- **Script Block Logging (Event ID 4104):** Shows the PowerShell engine recording the exact, fully de-obfuscated script content into the `Microsoft-Windows-PowerShell/Operational` event log. Even if an adversary bypasses AMSI, the SIEM receives the full plaintext command string.\n- **Defensive Investigation Value:** Proves why modern SOCs rely on Event ID 4104: obfuscation layers dissolve at runtime, giving defenders direct visibility into the adversary's true intent and actions."
    }
  ]
};
