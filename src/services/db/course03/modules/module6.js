/**
 * Course 03: Linux and Windows System Administration
 * Module 6: PowerShell Administration
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
      "content": "## 6.1 PowerShell Editions, Cmdlets & Help: Verb-Noun Syntax, Providers & Discovery\n\n![C03-M06-D46: PowerShell Evolution: Windows PowerShell 5.1 (.NET Framework) vs. PowerShell 7+ (.NET Core)](/assets/courses/cyber-03/c03_m06_l01_powershell_editions_evolution.png)\n\n*Figure C03-M06-D46: Architectural differences between legacy Windows PowerShell 5.1 (powershell.exe, Windows-only) and modern PowerShell 7+ (pwsh, cross-platform).*\n\nLESSON C03-M06-L01: PowerShell editions, cmdlets and help\n=========================================================\n\n2.1.1 Two editions\n  Windows PowerShell 5.1   Built into Windows, based on .NET Framework,\n                           executable powershell.exe. No longer receiving new\n                           features but supported as part of Windows.\n  PowerShell 7.x           Cross-platform (Windows, Linux, macOS), open\n                           source, based on modern .NET, executable pwsh.exe;\n                           installed separately. Microsoft recommends it for\n                           new work [C03-M06-R1].\nCheck your version: $PSVersionTable.PSVersion (execution-tested: 5.1 build\n26100 on the test machine).\n\nWindows PowerShell 2.0 was deprecated in 2017 and Microsoft removed it from\nWindows 11 version 24H2 (from August 2025 updates) and Windows Server 2025\n(from September 2025 updates); scripts requesting version 2 now fall back to\n5.1 [C03-M06-R2]. Removal matters for security because version 2 lacks the\nlogging and AMSI features described below.\n\n2.1.2 Cmdlets and naming\nCommands follow a Verb-Noun pattern: Get-Service, Stop-Process,\nSet-ItemProperty, New-LocalUser. Approved verbs (Get-Verb) make commands\npredictable. Parameters start with a dash and can be abbreviated if\nunambiguous; positional parameters can omit the name. Aliases exist for\nconvenience (ls, dir, cd, gcim) but should be avoided in scripts for\nreadability. Execution-tested: Get-Command -CommandType Cmdlet returned 643\ncmdlets on the test machine (the number depends on installed modules).\n\n2.1.3 Discovering commands and help\n  Get-Command *service*        find commands by name\n  Get-Command -Noun Process    by noun\n  Get-Help Get-Service -Full   full help (Update-Help downloads current help\n                               files)\n  Get-Help about_Pipelines     conceptual \"about\" topics\n  Get-Member                   shows an object's type, properties and methods\n\nExecution-tested:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-Process -Id $PID | Get-Member -MemberType Property | Select-Object -First 5 Name\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  BasePriority\n  Container\n  EnableRaisingEvents\n  ExitCode\n  ExitTime\n  --------------------------------------------------------------- END OUTPUT\n\n$PID is an automatic variable holding the current PowerShell process ID;\nGet-Member reveals what you can select, filter or sort on.\n\n\n![C03-M06-D47: PowerShell Discovery Model: Get-Command, Get-Help & Get-Member Taxonomy](/assets/courses/cyber-03/c03_m06_l01_discovery_command_help_member.png)\n\n*Figure C03-M06-D47: The foundational discovery triumvirate of PowerShell: Get-Command (finds cmdlets), Get-Help (reads documentation), and Get-Member (inspects .NET objects).*\n\n"
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
      "content": "## 6.2 The Object Pipeline: .NET Object Streams vs. Text Parsing & Memory Projection\n\n![C03-M06-F1: Text Pipeline vs. Object Pipeline: Linux String Streaming vs. .NET Object Projection](/assets/courses/cyber-03/C03-M06-F1.png)\n\n*Figure C03-M06-F1: Bash pipelines pass raw text streams requiring fragile parsing; PowerShell passes strongly typed .NET objects with accessible properties.*\n\nLESSON C03-M06-L02: The object pipeline\n=======================================\n\n2.2.1 Objects, not text\nIn bash, ps | grep matches text. In PowerShell, Get-Service | Where-Object\nStatus -eq 'Running' compares a property of each service object. No parsing\nis needed, and output is reliable regardless of column widths.\n\n2.2.2 Core pipeline cmdlets\n  Where-Object   filter       Where-Object { $_.StartMode -eq 'Auto' }\n                              ($_ is the current object)\n  Select-Object  choose       Select-Object Name, Status -First 5\n                 properties   (also calculated properties, below)\n  Sort-Object    order        Sort-Object Count -Descending\n  Group-Object   group        Group-Object StartName\n  Measure-Object count/sum    Measure-Object -Property Length -Sum\n  ForEach-Object act on each  ForEach-Object { $_.Name.ToUpper() }\n\n2.2.3 Calculated properties\n  Select-Object Name, @{Name='WS_MB'; Expression={[math]::Round($_.WorkingSet64/1MB)}}\ncreates a new property on the fly. Module 1 used this pattern to show\nprocess memory in MB (execution-tested).\n\n2.2.4 Output: format versus export\n  Format-Table / Format-List  for display only - they produce formatting\n                              objects, so never pipe them into further\n                              processing or export.\n  Export-Csv / ConvertTo-Json / Out-File / Set-Content\n                              for data. Use -NoTypeInformation with\n                              Export-Csv in Windows PowerShell 5.1.\nRule: filter left, format right - filter as early as possible, format only\nat the end.\n\n2.2.5 Worked example (execution-tested)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  Get-CimInstance Win32_Service |\n      Group-Object StartName |\n      Sort-Object Count -Descending |\n      Select-Object -First 3 Count, Name\n  ------------------------------------------------------------------ END CODE\nResult on the test machine: LocalSystem 183, NT AUTHORITY\\LocalService 69,\n27 with no account listed - four commands, no text parsing.\n\n2.2.6 Providers\nPowerShell exposes data stores as drives: FileSystem (C:), Registry (HKLM:,\nHKCU:), Environment (Env:), Certificate (Cert:), Variable, Function. The same\ncmdlets (Get-ChildItem, Get-Item, Set-Item) work across them - for example\nGet-ChildItem Cert:\\LocalMachine\\Root lists trusted root certificates.\n\n\n![C03-M06-D48: PowerShell Pipeline Filtering & Projection: Where-Object, Select-Object & Measure-Object](/assets/courses/cyber-03/c03_m06_l02_pipeline_filtering_projection.png)\n\n*Figure C03-M06-D48: Sequential object stream processing: filtering rows with Where-Object, shaping columns with Select-Object, and statistical aggregation with Measure-Object.*\n\n"
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
      "content": "## 6.3 Variables, Types & Control Flow: Primitives, Collections, Hash Tables & Loops\n\n![C03-M06-D49: PowerShell Data Structures: Arrays, Hash Tables & PSCustomObject Construction](/assets/courses/cyber-03/c03_m06_l03_data_structures_pscustomobject.png)\n\n*Figure C03-M06-D49: Construction and memory layout of PowerShell collections: ordered arrays (@()), key-value hash tables (@{}), and structured custom objects ([PSCustomObject]@{}).*\n\nLESSON C03-M06-L03: Variables, types and control flow\n=====================================================\n\n2.3.1 Variables and types\n  $name = 'RedKross'             string ('' literal, \"\" expands variables)\n  $count = 42                    Int32\n  [int]$top = 5                  type constraint\n  $now = Get-Date                DateTime object\n  $list = @('a','b','c')         array; $list[0], $list.Count\n  $h = @{ Host='srv1'; Port=443 }  hashtable; $h.Host, $h['Port']\n  [pscustomobject]@{ A=1; B=2 }   custom object (structured output)\nAutomatic variables: $_ (current pipeline object), $PSItem (same), $PID,\n$Error, $LASTEXITCODE (exit code of the last native program), $true, $false,\n$null.\n\n2.3.2 Operators\n  Comparison  -eq -ne -gt -ge -lt -le (case-insensitive by default; -ceq is\n              case-sensitive)\n  Pattern     -like 'svc*'  wildcard; -match '^\\d+$' regex\n  Membership  -in, -contains\n  Logical     -and, -or, -not (!)\n  Strings     -replace, -split, -join\nNote: = assigns; -eq compares. Writing if ($a = 5) is a bug.\n\n2.3.3 Control flow\n  if (...) { } elseif (...) { } else { }\n  switch ($x) { 'start' { } 'stop' { } default { } }\n  foreach ($s in $services) { }\n  for ($i = 0; $i -lt 10; $i++) { }\n  while (...) { }\n  try { } catch { } finally { }\n\n2.3.4 Strings and expansion safety\nDouble-quoted strings expand variables and subexpressions: \"Total:\n$($services.Count)\". When building commands from input, never concatenate\nuntrusted text into Invoke-Expression; pass values as parameters instead\n(the PowerShell equivalent of avoiding eval in bash).\n\n\n![C03-M06-D50: PowerShell Control Flow & Error Trapping: Try/Catch/Finally & $ErrorActionPreference](/assets/courses/cyber-03/c03_m06_l03_control_flow_try_catch.png)\n\n*Figure C03-M06-D50: Error handling mechanics in PowerShell: converting non-terminating errors into terminating exceptions with -ErrorAction Stop, and handling with Try/Catch/Finally.*\n\n"
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
      "content": "## 6.4 Advanced Functions & Validation: CmdletBinding, Pipeline Inputs & Error Traps\n\n![C03-M06-F3: ShouldProcess Flow in a Script: Implementing -WhatIf & -Confirm Safety Nets](/assets/courses/cyber-03/C03-M06-F3.png)\n\n*Figure C03-M06-F3: Validation and read-only gathering happen first; destructive changes run only if ShouldProcess approves, supporting -WhatIf dry-runs.*\n\nLESSON C03-M06-L04: Scripts, functions, validation and errors\n=============================================================\n\n2.4.1 Scripts and advanced functions\nA script is a .ps1 file. Adding [CmdletBinding()] and a param() block makes\nit behave like a cmdlet: common parameters (-Verbose, -Debug, -ErrorAction)\nand, with SupportsShouldProcess, -WhatIf and -Confirm [C03-M06-R3].\n\n2.4.2 Parameter validation attributes\n  [Parameter(Mandatory)]          must be supplied\n  [ValidateNotNullOrEmpty()]      not empty\n  [ValidateRange(1,50)]           numeric range\n  [ValidateSet('Dev','Prod')]     allowed values\n  [ValidatePattern('^[a-z]+$')]   regex\nValidation runs before the script body, so bad input never reaches your\nlogic. Execution-tested: -Top 99 was rejected with \"The 99 argument is\ngreater than the maximum allowed range of 50.\"\n\n2.4.3 Error handling\n  $ErrorActionPreference = 'Stop'   make non-terminating errors terminating\n                                    so try/catch catches them.\n  try { ... } catch { Write-Error \"...: $($_.Exception.Message)\"; exit 1 }\n  Set-StrictMode -Version Latest    errors on uninitialised variables and\n                                    other mistakes (similar to bash set -u).\n  Write-Verbose / Write-Warning / Write-Error   appropriate output streams.\nNative programs (like icacls) do not throw PowerShell exceptions; check\n$LASTEXITCODE after calling them.\n\n2.4.4 Execution-tested pitfall 1: -WhatIf leaks into module auto-loading\nThe first run of the example script with -WhatIf printed a dozen unexpected\nlines such as:\n  What if: Performing the operation \"Set Alias\" on target \"Name: gcim Value:\n  Get-CimInstance\".\nCause: -WhatIf sets $WhatIfPreference for the script, and that preference\nalso applied while PowerShell automatically loaded the CimCmdlets module and\ncreated its aliases.\n\n2.4.5 Execution-tested pitfall 2: Import-Module has no -WhatIf\nThe obvious fix, Import-Module CimCmdlets -WhatIf:$false, failed with\n\"A parameter cannot be found that matches parameter name 'WhatIf'\" - and the\nerror was reported against the script itself, which was misleading.\nImport-Module in Windows PowerShell 5.1 does not support -WhatIf. The working\nfix switches the preference off in a child scope just for the import:\n\n  ---------------------------------------------------------------- BEGIN CODE\n  & { $WhatIfPreference = $false; Import-Module CimCmdlets }\n  ------------------------------------------------------------------ END CODE\n\nLessons: test safety features themselves; read error messages critically;\nand use (Get-Command <cmd>).Parameters to check what a cmdlet supports.\n\n\n![C03-M06-D51: Advanced Function Architecture: [CmdletBinding()] & Parameter Validation Attributes](/assets/courses/cyber-03/c03_m06_l04_advanced_functions_validation.png)\n\n*Figure C03-M06-D51: Anatomy of an advanced PowerShell function: [CmdletBinding()], param() block validation ([ValidateNotNullOrEmpty()], [ValidateSet()]), and begin/process/end blocks.*\n\n\n\n:::math-steps\n### PowerShell Pipeline Memory Footprint vs. Streaming Object Throughput\nModeling object memory consumption during large pipeline iterations ($N = 100{,}000$ event objects).\n\n#### Step 1: In-Memory Array Buffering Overhead\nStoring $N$ objects in a memory variable ($arr = \\text{Get-WinEvent}$):\n$$M_{\\text{buffered}} = N \\times S_{\\text{obj}} = 100{,}000 \\times 2{,}048 \\text{ bytes} \\approx 204.8 \\text{ MB}$$\n\n#### Step 2: Streaming Pipeline Throughput\nPiping objects directly into $\\text{Where-Object}$ processes objects one at a time:\n$$M_{\\text{streaming}} = 1 \\times S_{\\text{obj}} + S_{\\text{CLR}} \\approx 12 \\text{ MB constant}$$\n\n#### Step 3: Performance Trade-off Ratio\n$$\\text{Memory Reduction} = \\frac{M_{\\text{buffered}} - M_{\\text{streaming}}}{M_{\\text{buffered}}} \\times 100\\% \\approx 94.1\\%$$\n:::\n\n"
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
      "content": "## 6.5 Safe Administration: Execution Policies, Code Signing & ShouldProcess (-WhatIf)\n\n![C03-M06-D52: PowerShell Execution Policies vs. True Security Boundaries: The Bypass Reality](/assets/courses/cyber-03/c03_m06_l05_execution_policies_reality.png)\n\n*Figure C03-M06-D52: Demystifying Execution Policies (Restricted, RemoteSigned, AllSigned): why execution policy is a user safety net, not a security boundary.*\n\nLESSON C03-M06-L05: Safe administration\n=======================================\n\n2.5.1 -WhatIf and -Confirm\nCmdlets that change state (Stop-Service, Remove-Item, Set-ADUser) usually\nsupport -WhatIf (show what would happen) and -Confirm (ask first). Use\n-WhatIf before any bulk change. Make your own scripts support them with\nSupportsShouldProcess and $PSCmdlet.ShouldProcess() around changes.\n\n2.5.2 Execution policy - a safety net, not a security boundary\nExecution policy controls whether scripts run and whether they must be\nsigned (Restricted, AllSigned, RemoteSigned, Unrestricted, Bypass), at scopes\nMachinePolicy, UserPolicy, Process, CurrentUser and LocalMachine.\nExecution-tested Get-ExecutionPolicy -List on the test machine:\nLocalMachine RemoteSigned; Process Bypass (set by the hosting session); all\nothers Undefined. Microsoft states that execution policy is not a security\nsystem that restricts user actions - users can bypass it, for example by\npasting script content - and that it helps prevent accidental execution\n[C03-M06-R4]. Real enforcement comes from application control (L05.4).\n\n2.5.3 Script signing\nSigning scripts with a code-signing certificate (Set-AuthenticodeSignature)\nlets AllSigned policies and application control verify publisher and\nintegrity (Course 15 explains digital signatures).\n\n2.5.4 Application control and Constrained Language Mode\nWith application control policies (Windows Defender Application Control /\nApp Control for Business, or AppLocker) enforcing, PowerShell runs untrusted\nscripts in Constrained Language Mode, which blocks access to arbitrary .NET\ntypes, COM objects and other powerful features while still allowing basic\nadministration. Execution-tested: $ExecutionContext.SessionState.LanguageMode\nreturned FullLanguage on the test machine, which has no application control\npolicy.\n\n2.5.5 Just Enough Administration (JEA)\nJEA provides PowerShell remoting endpoints where users can run only specific\ncommands, with parameters restricted, under a virtual or managed account -\nrole-based, least-privilege administration that is fully logged\n[C03-M06-R5]. Example use: let help-desk staff restart print services and\nreset specific accounts without being administrators.\n\n2.5.6 AMSI\nThe Antimalware Scan Interface lets security products inspect PowerShell\nscript content at run time - including content that was obfuscated or\nloaded only in memory - before it executes. It is supported in PowerShell\n5.0 and later, another reason to remove version 2.\n\n2.5.7 Remoting basics\nPowerShell remoting (WinRM; Enter-PSSession, Invoke-Command) runs commands on\nremote machines with Kerberos authentication in domains. Restrict who can use\nit, prefer JEA endpoints for delegated tasks, and log it.\n\n2.5.8 Government guidance\nThe joint Cybersecurity Information Sheet \"Keeping PowerShell: Security\nMeasures to Use and Embrace\" (NSA, CISA, and the New Zealand and UK NCSCs,\nJune 2022) recommends keeping PowerShell rather than removing it, and\nusing its security features: deep script block logging, module logging and\ntranscription (disabled by default), Constrained Language Mode with\napplication control, secure remoting, antimalware integration and upgrading\nto PowerShell 7 where possible [C03-M06-R6].\n\n\n![C03-M06-D53: Constrained Language Mode (CLM) & Application Whitelisting (WDAC/AppLocker)](/assets/courses/cyber-03/c03_m06_l05_clm_applocker_wdac.png)\n\n*Figure C03-M06-D53: Hardening PowerShell with Constrained Language Mode (CLM) coupled with AppLocker or Windows Defender Application Control (WDAC).*\n\n\n\n---\n\n## Technical Deep Dive: Production Implementation Analysis\n\n3. TECHNICAL DEEP DIVE: THE SERVICE REPORT SCRIPT, LINE BY LINE\n--------------------------------------------------------------------------------\n\n3.1 File and status\nLAB_ASSETS/C03/Get-RkServiceReport.ps1 - read-only reporting script.\nExecution-tested on Windows PowerShell 5.1 (Windows 11 build 26200).\n\n3.2 Code (abridged help block)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  [CmdletBinding(SupportsShouldProcess)]\n  param(\n      [Parameter(Mandatory)]\n      [ValidateNotNullOrEmpty()]\n      [string]$OutputFolder,\n\n      [ValidateRange(1, 50)]\n      [int]$Top = 5\n  )\n\n  Set-StrictMode -Version Latest\n  $ErrorActionPreference = 'Stop'\n  & { $WhatIfPreference = $false; Import-Module CimCmdlets }\n\n  try {\n      $services = Get-CimInstance -ClassName Win32_Service\n  }\n  catch {\n      Write-Error \"Could not query services: $($_.Exception.Message)\"\n      exit 1\n  }\n\n  $summary = $services |\n      Group-Object -Property StartName |\n      Sort-Object -Property Count -Descending |\n      Select-Object -First $Top -Property Count,\n          @{ Name = 'Account'; Expression = { if ($_.Name) { $_.Name } else { '(none listed)' } } }\n\n  $highPriv = $services |\n      Where-Object { $_.StartName -eq 'LocalSystem' -and\n                     $_.StartMode -eq 'Auto' -and $_.State -eq 'Running' } |\n      Select-Object Name, DisplayName, State, StartMode, PathName\n\n  Write-Verbose \"Total services: $($services.Count); running LocalSystem auto: $($highPriv.Count)\"\n\n  if ($PSCmdlet.ShouldProcess($OutputFolder, 'Write report files')) {\n      New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null\n      $summary  | Export-Csv -Path (Join-Path $OutputFolder 'accounts.csv') -NoTypeInformation\n      $highPriv | ConvertTo-Json -Depth 2 |\n          Set-Content -Path (Join-Path $OutputFolder 'localsystem-auto.json') -Encoding UTF8\n  }\n\n  [pscustomobject]@{\n      TotalServices          = $services.Count\n      RunningLocalSystemAuto = $highPriv.Count\n      TopAccounts            = ($summary | ForEach-Object { \"$($_.Account)=$($_.Count)\" }) -join '; '\n  }\n  ------------------------------------------------------------------ END CODE\n\n3.3 Explanation\n  [CmdletBinding(SupportsShouldProcess)]  enables -Verbose, -WhatIf,\n                         -Confirm and other common parameters.\n  param(...)             mandatory, non-empty output folder; Top limited to\n                         1-50.\n  Set-StrictMode / Stop  fail on mistakes and make errors catchable.\n  & { ... Import-Module }  the pitfall fix from L04.\n  try/catch              a clear message and exit code 1 if the query fails.\n  Group/Sort/Select      the pipeline from L02; the calculated property\n                         replaces empty account names with \"(none listed)\".\n  Where-Object           high-privilege, automatic, running services -\n                         candidates for review in hardening (Module 8).\n  ShouldProcess          wraps the only state-changing operations (creating\n                         folder and files); with -WhatIf they are described\n                         but not performed.\n  [pscustomobject]       structured result that other scripts can consume.\n\n3.4 Results (exact, selected)\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  == WhatIf run\n  What if: Performing the operation \"Write report files\" on target \"C:\\Users\\...\\Temp\\rk-report\".\n  TotalServices RunningLocalSystemAuto TopAccounts\n  ------------- ---------------------- -----------\n            300                     56 LocalSystem=183; NT AUTHORITY\\LocalService=69; ...\n  folder created? False\n  == real run (-Top 3)\n            300                     56 LocalSystem=183; NT AUTHORITY\\LocalService=69; (none listed)=27\n  folder created? True\n  accounts.csv:\n  \"Count\",\"Account\"\n  \"183\",\"LocalSystem\"\n  \"69\",\"NT AUTHORITY\\LocalService\"\n  \"27\",\"(none listed)\"\n  --------------------------------------------------------------- END OUTPUT\n\nInterpretation: 300 services, of which 56 run automatically as LocalSystem\nand were running - the list to review first. -WhatIf produced no files.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Practical Laboratory Exercises & Telemetry Triage\n\n5. PRACTICAL LEARNING\n--------------------------------------------------------------------------------\n\nPRACTICAL C03-M06-P1: Pipeline exploration and the service report script\n------------------------------------------------------------------------\nObjective: Build pipelines, then run, test and extend a safe script.\n\nDifficulty: Beginner.\n\nRequired tools: Windows PowerShell 5.1 (or PowerShell 7);\nLAB_ASSETS/C03/Get-RkServiceReport.ps1.\n\nPrerequisites: Lessons L01-L05.\n\nEnvironment setup: copy the script to a working folder. If your execution\npolicy blocks it, run it with powershell -ExecutionPolicy Bypass -File ...\n(this affects only that process).\n\nExplicit authorised scope: your own computer; the script is read-only\nexcept for the output folder you choose.\n\nStep-by-step instructions:\n  1. Using only pipelines, answer: How many services are running? Which five\n     processes use the most memory? Which services run as NetworkService?\n  2. Use Get-Member on Get-Service output and find a property that is not\n     shown by default.\n  3. Run the script with -WhatIf and confirm no folder is created.\n  4. Run it with -Verbose and an output folder in $env:TEMP; open the CSV in\n     a spreadsheet and the JSON in a text editor.\n  5. Try -Top 0 and -Top 51 and record the validation messages.\n  6. Extend the script: add a -StartMode parameter with\n     [ValidateSet('Auto','Manual','Disabled')] that filters $highPriv.\n  7. Add a check that flags services whose PathName contains a space and is\n     not quoted (see Module 5 L03) and include them in the JSON.\n\nExpected observations: as in section 3.4; numbers differ per machine.\n\nTroubleshooting: \"running scripts is disabled on this system\" - use the\n-ExecutionPolicy Bypass process option above; never change the machine-wide\npolicy to Unrestricted for this exercise.\n\nCleanup: delete the output folder.\n\nLearning outcome: you can build object pipelines and safe, testable scripts.\n\nPRACTICAL C03-M06-P2: Enable and observe PowerShell logging (lab VM or own\ncomputer)\n-------------------------------------------------------------------------\nObjective: Turn on script block logging and transcription and see what they\nrecord.\n\nDifficulty: Beginner/Intermediate.\n\nRequired tools: Windows 10/11 Pro, Enterprise or Education (for the Local\nGroup Policy Editor) or any edition via the registry; administrator rights;\na test virtual machine is preferred.\n\nPrerequisites: Lesson L06.\n\nEnvironment setup: a Windows VM you control, or your own computer if you\naccept the change (it is reversible).\n\nExplicit authorised scope: a machine you own or administer.\n\nStep-by-step instructions:\n  1. Export the current policy key (if it exists) as a backup:\n     reg export \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\" rk-ps-backup.reg\n     (If it does not exist, note that - cleanup will remove what you add.)\n  2. In gpedit.msc enable \"Turn on PowerShell Script Block Logging\" and \"Turn\n     on PowerShell Transcription\" (output directory, for example\n     C:\\RK-Transcripts). On Home editions, create the equivalent registry\n     values documented by Microsoft for these policies [C03-M06-R7].\n  3. Open a new PowerShell window and run a few commands, including\n     $x = 'hello'; Write-Output $x.\n  4. Find your commands in event ID 4104 (Get-WinEvent command in L06) and in\n     the transcript folder.\n  5. Reflect: what sensitive data could these logs capture? Who should be\n     able to read them?\n\nExpected observations: 4104 events contain the script block text;\ntranscripts show the session header, commands and output.\n\nTroubleshooting: if no events appear, open a new PowerShell process (policy\nis read at start-up) and confirm the policy registry values exist.\n\nCleanup: disable the policies (or delete the values you created; restore the\n.reg backup if you made one), delete the transcript folder, and close\nPowerShell windows.\n\nNon-lab alternative: use the execution-tested transcript output in L06 and\nanswer the reflection question.\n\nLearning outcome: you can configure and interpret PowerShell logging.\n\n--------------------------------------------------------------------------------\n\n"
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
      "content": "## 6.6 PowerShell Security & Telemetry: AMSI, Script Block Logging & Obfuscation Triage\n\n![C03-M06-F2: Layers of PowerShell Security: Delegation, App Control, Safety Nets, AMSI & Logging](/assets/courses/cyber-03/C03-M06-F2.png)\n\n*Figure C03-M06-F2: PowerShell defense-in-depth: delegation (JEA), application control (WDAC), safety nets, AMSI in-memory inspection, and script block logging.*\n\nLESSON C03-M06-L06: PowerShell logging\n======================================\n\n2.6.1 Three logging features\n  Module logging            Event ID 4103 in Microsoft-Windows-PowerShell/\n                            Operational: pipeline execution details for\n                            specified modules.\n  Script block logging      Event ID 4104: the text of script blocks as they\n                            are compiled - including de-obfuscated content.\n                            Microsoft documents that PowerShell automatically\n                            logs script blocks containing suspicious content\n                            at warning level even when the policy is not\n                            enabled; enabling the policy logs all script\n                            blocks [C03-M06-R7].\n  Transcription             Writes a text transcript of input and output for\n                            each session to a chosen folder (ideally a\n                            protected central share).\n\n2.6.2 Configuring logging\nGroup Policy: Computer Configuration > Administrative Templates > Windows\nComponents > Windows PowerShell (Turn on Module Logging; Turn on PowerShell\nScript Block Logging; Turn on PowerShell Transcription). The settings are\nstored under HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\.\nExecution-tested on the test machine: none of the three policy keys existed\n(logging policies not configured), yet a 4104 event was present in the\nOperational log - consistent with PowerShell's automatic logging of certain\nscript blocks. On a managed estate these policies should be enabled and the\nlogs forwarded to a SIEM (Course 08).\n\n2.6.3 Transcripts on demand (execution-tested)\n\n  ---------------------------------------------------------------- BEGIN CODE\n  $t = Join-Path $env:TEMP 'rk-transcript.txt'\n  Start-Transcript -Path $t\n  Get-Date -Format o\n  Stop-Transcript\n  Get-Content $t | Select-Object -First 4\n  Remove-Item $t\n  ------------------------------------------------------------------ END CODE\n\n  ------------------------------------------------------------- BEGIN OUTPUT\n  **********************\n  Windows PowerShell transcript start\n  Start time: 20261107023616\n  Username: RK-HOST\\Mario\n  --------------------------------------------------------------- END OUTPUT\n  (computer name shown as RK-HOST)\n\n2.6.4 Reading PowerShell events\n\n  ---------------------------------------------------------------- BEGIN CODE\n  $log = 'Microsoft-Windows-PowerShell/Operational'\n  Get-WinEvent -LogName $log -FilterXPath '*[System[EventID=4104]]' -MaxEvents 5 |\n      Select-Object TimeCreated, Id, LevelDisplayName\n  ------------------------------------------------------------------ END CODE\n(Reading event logs is covered fully in Module 7.)\n\n2.6.5 Privacy and protection of logs\nScript block logs and transcripts can capture secrets typed or embedded in\nscripts. Protect log storage, restrict access, and design scripts to avoid\nhandling plain-text secrets (use SecretManagement modules, credential\nobjects, managed identities - Course 11 and Course 12). Microsoft also\noffers Protected Event Logging, which encrypts sensitive event content.\n\n--------------------------------------------------------------------------------\n\n![C03-M06-D54: PowerShell Telemetry & De-obfuscation: AMSI Buffers, EID 4104 & Base64 Unpacking](/assets/courses/cyber-03/c03_m06_l06_amsi_script_block_deobfuscation.png)\n\n*Figure C03-M06-D54: How Script Block Logging (Event ID 4104) and AMSI defeat obfuscation by capturing the final de-obfuscated code block directly at execution time.*\n\n\n\n---\n\n## Real-World Case Studies & Forensic Incident Analysis\n\n4. REAL-WORLD CASE STUDIES\n--------------------------------------------------------------------------------\n\nCASE STUDY C03-M06-CS1: \"Keeping PowerShell\" - government guidance to secure\nrather than remove (June 2022)\n--------------------------------------------------------------------------\nContext: because attackers frequently use PowerShell after gaining access,\nsome organisations had considered removing or blocking it entirely - which\nalso removes a key administration and defence tool.\n\nWhat the guidance says: in June 2022 the NSA, CISA and the national cyber\nsecurity centres of New Zealand and the United Kingdom published the\nCybersecurity Information Sheet \"Keeping PowerShell: Security Measures to\nUse and Embrace\". It recommends keeping PowerShell and configuring its\nsecurity features: enabling deep script block logging, module logging and\nover-the-shoulder transcription (noting they are disabled by default), using\nConstrained Language Mode together with AppLocker or WDAC, securing\nremoting, integrating antimalware scanning, and moving to PowerShell 7\n[C03-M06-R6].\n\nHow it applies: these are exactly the features in L05-L06. Removing\nPowerShell 2.0 (now done by Microsoft) closes a path around those\nprotections.\n\nLessons learned:\n  - Visibility beats prohibition: logging lets defenders see both legitimate\n    and malicious use.\n  - Application control, not execution policy, provides enforcement.\n  - Least-privilege delegation (JEA) reduces the number of administrators.\n\nCASE STUDY C03-M06-CS2 (FICTIONAL TEACHING SCENARIO): The bulk change\nwithout -WhatIf\n---------------------------------------------------------------------\nThis scenario is fictional.\n\nContext: an administrator at Marigold Insurance Brokers (fictional) wanted\nto disable stale test accounts with:\n  Get-LocalUser | Where-Object LastLogon -lt (Get-Date).AddDays(-90) |\n      Disable-LocalUser\non a set of kiosk computers.\n\nProblem: accounts that had never logged on have an empty LastLogon value,\nwhich compared as \"less than\" the date in this filter, so the command also\ndisabled newly created service accounts, breaking kiosk applications. (The\ncomparison behaviour is real and was execution-tested by the content team in\nWindows PowerShell 5.1: $null -lt (Get-Date).AddDays(-90) returns True, and\nWhere-Object LastLogon -lt $date selects objects whose LastLogon is $null.)\n\nResponse: accounts were re-enabled; the script was rewritten to exclude\nempty values explicitly, to output a list first with -WhatIf, and to require\napproval before the real run.\n\nLessons: always preview bulk changes with -WhatIf; handle $null explicitly in\nfilters; test on a small set first.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Architectural Visual Synthesis & System State Analysis\n\n6. VISUAL LEARNING\n--------------------------------------------------------------------------------\n\nFIGURE C03-M06-F1: Text pipeline versus object pipeline\nPurpose: Contrast bash text pipes with PowerShell objects.\n\n  [BEGIN DIAGRAM]\n  BASH (text)\n  ps -eo user,comm | grep root | wc -l\n     \"root sshd\\n...\" -> text match -> count lines (fragile: depends on\n                                                  column layout)\n  POWERSHELL (objects)\n  Get-CimInstance Win32_Service | Where-Object StartName -eq 'LocalSystem' |\n      Measure-Object\n     [Service{Name,StartName,State,...}] -> property test -> Count\n     (robust: compares the StartName property directly)\n  [END DIAGRAM]\n\nCaption: Figure C03-M06-F1. Bash pipelines pass text; PowerShell passes\nobjects with properties.\nAccessibility description: Two pipelines. The bash one passes lines of text\nthrough grep and wc. The PowerShell one passes service objects through a\nWhere-Object property comparison to Measure-Object, with notes on fragility\nversus robustness.\n\nFIGURE C03-M06-F2: Layers of PowerShell security\nPurpose: Show how controls fit together.\n\n  [BEGIN DIAGRAM]\n  [Who can run what]   JEA endpoints, least-privilege accounts\n          |\n  [What code may run]  App Control (WDAC) / AppLocker -> Constrained\n                       Language Mode for untrusted code; signed scripts\n          |\n  [Accidental runs]    Execution policy (safety net only)\n          |\n  [Content inspection] AMSI -> antimalware engine\n          |\n  [Visibility]         Script block (4104), module (4103) logging,\n                       transcription -> SIEM\n          |\n  [Remove weak paths]  PowerShell 2.0 removed; upgrade to 7.x\n  [END DIAGRAM]\n\nCaption: Figure C03-M06-F2. PowerShell security combines delegation,\napplication control, safety nets, content inspection, logging and removal of\nlegacy versions.\nAccessibility description: A vertical stack of six layers: JEA and least\nprivilege; application control with Constrained Language Mode; execution\npolicy as a safety net; AMSI; logging to SIEM; removal of PowerShell 2.0.\n\nFIGURE C03-M06-F3: ShouldProcess flow in a script\nPurpose: Show how -WhatIf protects changes.\n\n  [BEGIN DIAGRAM]\n  [Script starts] -> [Validate parameters] -> [Gather data (read-only)]\n                                                      |\n                                    $PSCmdlet.ShouldProcess(target, action)?\n                                     | -WhatIf             | normal / -Confirm yes\n                                     v                     v\n                           \"What if: ...\" message   [Make the change]\n                           (no change)                      |\n                                     +---------> [Return structured result]\n  [END DIAGRAM]\n\nCaption: Figure C03-M06-F3. Validation and read-only gathering happen first;\nchanges run only if ShouldProcess approves.\nAccessibility description: A flow from script start through parameter\nvalidation and data gathering to a ShouldProcess decision. With -WhatIf, a\nmessage is printed and nothing changes; otherwise the change is made. Both\npaths return a structured result.\n\n--------------------------------------------------------------------------------\n\n\n\n---\n\n## Comprehensive Module Revision Guide & Key Invariants\n\n8. REVISION MATERIAL\n--------------------------------------------------------------------------------\n\n8.1 Detailed module summary\nPowerShell is an object-based shell and language: Windows PowerShell 5.1 is\nbuilt in; PowerShell 7 is cross-platform and recommended for new work;\nversion 2.0 was removed from current Windows in 2025. Commands are Verb-Noun\ncmdlets discovered with Get-Command, Get-Help and Get-Member. Pipelines pass\nobjects through Where-Object, Select-Object (with calculated properties),\nSort-Object, Group-Object, Measure-Object and ForEach-Object; format at the\nend and export with Export-Csv or ConvertTo-Json; providers expose the\nregistry, certificates and environment as drives. Variables are typed .NET\nobjects (arrays, hashtables, pscustomobject); comparison operators are -eq,\n-like, -match and others. Advanced scripts use [CmdletBinding()], param()\nwith validation attributes, Set-StrictMode, $ErrorActionPreference = 'Stop',\ntry/catch and ShouldProcess for -WhatIf/-Confirm; testing revealed that\nWhatIf preference can leak into module loading and that Import-Module lacks\n-WhatIf. Execution policy is a safety net, not a boundary; enforcement comes\nfrom application control with Constrained Language Mode, plus signing, JEA,\nAMSI and controlled remoting. Logging includes module logging (4103), script\nblock logging (4104, with automatic logging of suspicious blocks) and\ntranscription, configured by policy and forwarded centrally; logs must be\nprotected. Government guidance (2022) advises keeping and securing\nPowerShell.\n\n8.2 Important concepts\n  - Filter left, format right.\n  - Validate parameters; preview with -WhatIf.\n  - Execution policy is not security; application control is.\n  - Log deeply and protect the logs.\n\n8.3 Key technical takeaways\n  - Get-Command, Get-Help, Get-Member, Get-ExecutionPolicy -List.\n  - [CmdletBinding(SupportsShouldProcess)], $PSCmdlet.ShouldProcess().\n  - Get-WinEvent ... EventID 4104; Start-/Stop-Transcript.\n\n8.4 Glossary\n  AMSI              Antimalware Scan Interface.\n  Cmdlet            PowerShell command (Verb-Noun).\n  CLM               Constrained Language Mode.\n  Execution policy  Script-run safety setting.\n  JEA               Just Enough Administration.\n  Module logging    Event 4103 pipeline logging.\n  Pipeline          Chain passing objects between commands.\n  Provider          Adapter exposing a data store as a drive.\n  pscustomobject    Lightweight structured object.\n  Script block      Unit of PowerShell code.\n  ShouldProcess     Mechanism behind -WhatIf/-Confirm.\n  Transcription     Session input/output recording.\n  WinRM             Windows Remote Management (remoting transport).\n\n8.5 Common mistakes\n  - Exporting formatted output.\n  - Using = instead of -eq.\n  - Relying on execution policy for security.\n  - Running bulk changes without -WhatIf.\n  - Leaving logging disabled or logs unprotected.\n\n8.6 Revision questions\n  1. Write a pipeline listing stopped automatic services.\n  2. Explain the difference between 4103 and 4104 events.\n  3. Describe how JEA and Constrained Language Mode differ.\n  4. Explain the two pitfalls found while testing the course script.\n  5. Why is removing PowerShell 2.0 important?\n\n8.7 Further reading\n  - Microsoft Learn, about_Logging_Windows [C03-M06-R7].\n  - Microsoft Learn, JEA overview [C03-M06-R5].\n  - NSA/CISA/NCSC, Keeping PowerShell [C03-M06-R6].\n\n--------------------------------------------------------------------------------\n\n"
    }
  ]
};
