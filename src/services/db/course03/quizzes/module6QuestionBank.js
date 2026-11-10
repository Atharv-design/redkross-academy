/**
 * RedKross Academy - Course 03: Linux and Windows System Administration
 * Module 6 Question Bank
 * Total Questions: 200 (100 Medium, 100 Difficult)
 * Balanced scenario-driven assessment pool.
 */

export const module6QuestionBank = [
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
  },
  {
    "id": "q_c3_m6_021",
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
    "id": "q_c3_m6_022",
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
    "id": "q_c3_m6_023",
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
    "id": "q_c3_m6_024",
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
    "id": "q_c3_m6_025",
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
    "id": "q_c3_m6_026",
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
    "id": "q_c3_m6_027",
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
    "id": "q_c3_m6_028",
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
    "id": "q_c3_m6_029",
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
    "id": "q_c3_m6_030",
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
    "id": "q_c3_m6_031",
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
    "id": "q_c3_m6_032",
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
    "id": "q_c3_m6_033",
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
    "id": "q_c3_m6_034",
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
    "id": "q_c3_m6_035",
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
    "id": "q_c3_m6_036",
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
    "id": "q_c3_m6_037",
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
    "id": "q_c3_m6_038",
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
    "id": "q_c3_m6_039",
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
    "id": "q_c3_m6_040",
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
    "id": "q_c3_m6_041",
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
    "id": "q_c3_m6_042",
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
    "id": "q_c3_m6_043",
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
    "id": "q_c3_m6_044",
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
    "id": "q_c3_m6_045",
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
    "id": "q_c3_m6_046",
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
    "id": "q_c3_m6_047",
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
    "id": "q_c3_m6_048",
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
    "id": "q_c3_m6_049",
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
    "id": "q_c3_m6_050",
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
    "id": "q_c3_m6_051",
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
    "id": "q_c3_m6_052",
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
    "id": "q_c3_m6_053",
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
    "id": "q_c3_m6_054",
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
    "id": "q_c3_m6_055",
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
    "id": "q_c3_m6_056",
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
    "id": "q_c3_m6_057",
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
    "id": "q_c3_m6_058",
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
    "id": "q_c3_m6_059",
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
    "id": "q_c3_m6_060",
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
    "id": "q_c3_m6_061",
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
    "id": "q_c3_m6_062",
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
    "id": "q_c3_m6_063",
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
    "id": "q_c3_m6_064",
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
    "id": "q_c3_m6_065",
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
    "id": "q_c3_m6_066",
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
    "id": "q_c3_m6_067",
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
    "id": "q_c3_m6_068",
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
    "id": "q_c3_m6_069",
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
    "id": "q_c3_m6_070",
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
    "id": "q_c3_m6_071",
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
    "id": "q_c3_m6_072",
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
    "id": "q_c3_m6_073",
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
    "id": "q_c3_m6_074",
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
    "id": "q_c3_m6_075",
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
    "id": "q_c3_m6_076",
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
    "id": "q_c3_m6_077",
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
    "id": "q_c3_m6_078",
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
    "id": "q_c3_m6_079",
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
    "id": "q_c3_m6_080",
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
    "id": "q_c3_m6_081",
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
    "id": "q_c3_m6_082",
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
    "id": "q_c3_m6_083",
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
    "id": "q_c3_m6_084",
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
    "id": "q_c3_m6_085",
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
    "id": "q_c3_m6_086",
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
    "id": "q_c3_m6_087",
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
    "id": "q_c3_m6_088",
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
    "id": "q_c3_m6_089",
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
    "id": "q_c3_m6_090",
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
    "id": "q_c3_m6_091",
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
    "id": "q_c3_m6_092",
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
    "id": "q_c3_m6_093",
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
    "id": "q_c3_m6_094",
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
    "id": "q_c3_m6_095",
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
    "id": "q_c3_m6_096",
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
    "id": "q_c3_m6_097",
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
    "id": "q_c3_m6_098",
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
    "id": "q_c3_m6_099",
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
    "id": "q_c3_m6_100",
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
    "id": "q_c3_m6_101",
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
    "id": "q_c3_m6_102",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_103",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_104",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_105",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_106",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_107",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_108",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_109",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_110",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_111",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_112",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_113",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_114",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_115",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_116",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_117",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_118",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_119",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_120",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_121",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_122",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_123",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_124",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_125",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_126",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_127",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_128",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_129",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_130",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_131",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_132",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_133",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_134",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_135",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_136",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_137",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_138",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_139",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_140",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_141",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_142",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_143",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_144",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_145",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_146",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_147",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_148",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_149",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_150",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_151",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_152",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_153",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_154",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_155",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_156",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_157",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_158",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_159",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_160",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_161",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_162",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_163",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_164",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_165",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_166",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_167",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_168",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_169",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_170",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_171",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_172",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_173",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_174",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_175",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_176",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_177",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_178",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_179",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_180",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_181",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_182",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_183",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_184",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_185",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_186",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_187",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_188",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_189",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_190",
    "topic": "Object Pipeline vs. Text Stream Mechanics",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_191",
    "topic": "Pipeline Filtering & Projection (Where-Object, Select-Object)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_192",
    "topic": "PowerShell Data Structures (Arrays, Hash Tables, PSCustomObject)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_193",
    "topic": "Error Handling (Try/Catch/Finally & $ErrorActionPreference)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_194",
    "topic": "Advanced Functions ([CmdletBinding()] & Validation Attributes)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_195",
    "topic": "Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_196",
    "topic": "Execution Policies vs. True Security Boundaries",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_197",
    "topic": "Constrained Language Mode (CLM) & WDAC/AppLocker",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_198",
    "topic": "PowerShell Telemetry (AMSI, Script Block Logging 4104)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_199",
    "topic": "PowerShell 5.1 vs. PowerShell 7+ Architecture",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  },
  {
    "id": "q_c3_m6_200",
    "topic": "PowerShell Discovery (Get-Command, Get-Help, Get-Member)",
    "difficulty": "difficult",
    "q": "An attacker attempts to evade detection by passing an obfuscated Base64 script to 'powershell.exe -enc ...'. Which telemetry feature defeats this obfuscation by capturing the fully decoded code block at runtime?",
    "options": [
      "Script Block Logging (Event ID 4104), which logs the complete de-obfuscated script text in memory immediately prior to execution.",
      "PowerShell Execution Policy set to RemoteSigned, which halts unsigned Base64 strings automatically.",
      "Windows Defender Firewall, which inspects stdin buffers for Base64 headers.",
      "Antivirus signature scanning of the temporary .ps1 file generated on disk."
    ],
    "correct": 0,
    "explanation": "Script Block Logging (Event ID 4104) captures the actual de-obfuscated script content that the PowerShell engine parses and executes in memory, regardless of layer-upon-layer of encoding or obfuscation."
  }
];
