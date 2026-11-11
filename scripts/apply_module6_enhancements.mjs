import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module6.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 6.1 - Fig 1 (C03-M06-D46)
  {
    id: 'C03-M06-D46',
    caption: '*Figure C03-M06-D46: Architectural differences between legacy Windows PowerShell 5.1 (powershell.exe, Windows-only) and modern PowerShell 7+ (pwsh, cross-platform).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Runtime & Framework Substrate:** Contrasts the foundational runtimes powering both editions. Legacy Windows PowerShell 5.1 is tightly coupled to the proprietary, Windows-only .NET Framework (CLR 4.0), making it incapable of running on Linux or macOS. Modern PowerShell 7+ is built on top of high-performance, open-source .NET (CLR 8/9), enabling true cross-platform execution.
- **Process Binary & Side-by-Side Coexistence:** Highlights the binary separation:
  - Windows PowerShell 5.1 executes as \`powershell.exe\` (located immutably in \`C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\\`). It is considered an operating system component and receives only critical security fixes.
  - PowerShell 7+ executes as \`pwsh.exe\` on Windows and \`pwsh\` on Linux/macOS. It installs side-by-side in independent application directories (\`C:\\Program Files\\PowerShell\\7\\\`), eliminating breaking version collisions.
- **Encoding & Character Set Invariants:** Visualizes the default encoding shift. PowerShell 5.1 defaults to UTF-16LE or Windows-1252 for redirects, frequently introducing corrupt file headers when interfacing with Linux utilities. PowerShell 7+ standardizes on UTF-8 without Byte Order Mark (BOM) across all platforms.
- **Remoting & Parallel Processing Enhancements:** Details modern capabilities in \`pwsh\`, including native SSH-based PowerShell Remoting (replacing legacy WinRM requirements) and multithreaded pipeline scaling using \`ForEach-Object -Parallel\` for high-throughput security automation.`
  },

  // Lesson 6.1 - Fig 2 (C03-M06-D47)
  {
    id: 'C03-M06-D47',
    caption: '*Figure C03-M06-D47: The foundational discovery triumvirate of PowerShell: Get-Command (finds cmdlets), Get-Help (reads documentation), and Get-Member (inspects .NET objects).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **The Discovery Triumvirate Lifecycle:** Depicts the three interconnected cmdlets that make PowerShell self-documenting and discoverable without external web documentation:
- **Cmdlet Discovery via Get-Command:** The starting point of operational discovery. Queries the active cmdlet and function database using standard Verb-Noun grammar patterns (e.g., \`Get-Command *Firewall* -Verb Set, New\`). It allows engineers to discover available automation commands across newly installed modules without memorizing arbitrary utility names.
- **Documentation & Syntax via Get-Help:** The semantic guidance engine. Ingests cmdlet names and returns formal syntax diagrams, mandatory parameter lists, pipeline capabilities, and verified code demonstrations (e.g., \`Get-Help Set-NetFirewallRule -Examples\` or \`-ShowWindow\`).
- **Object Introspection via Get-Member:** The runtime object inspector. Pipelining any command into \`Get-Member\` (e.g., \`Get-Service | Get-Member\`) reflects the underlying .NET class type (\`System.ServiceProcess.ServiceController\`), listing all available Methods (actions) and Properties (attributes).
- **Defensive Significance:** Empowers incident responders and SOC analysts to quickly inspect live process, service, and network connection objects in memory to extract hidden metadata (such as binary hashes, thread IDs, and owner SIDs) without relying on third-party inspection tools.`
  },

  // Lesson 6.2 - Fig 1 (C03-M06-F1)
  {
    id: 'C03-M06-F1',
    caption: '*Figure C03-M06-F1: Bash pipelines pass raw text streams requiring fragile parsing; PowerShell passes strongly typed .NET objects with accessible properties.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **POSIX / Bash Text-Stream Pipeline (Left Panel):** Illustrates traditional Unix pipeline mechanics (\`ps aux | grep nginx | awk '{print $2}'\`). The operating system transmits unstructured, newline-delimited ASCII/UTF-8 byte streams across anonymous pipes. Downstream commands must write fragile string manipulation scripts (using \`sed\`, \`awk\`, and \`cut\`) that break if upstream utilities alter whitespace padding, date formats, or localized column headers.
- **PowerShell Object-Oriented Pipeline (Right Panel):** Depicts PowerShell's strongly typed .NET object pipeline (\`Get-Process nginx | Select-Object -ExpandProperty Id\`). Rather than passing text strings, cmdlets emit rich in-memory .NET objects (\`System.Diagnostics.Process\`).
- **Direct Property Access & Type Safety:** Demonstrates how downstream cmdlets directly address structured object members (\`$_.CPU\`, \`$_.WorkingSet\`, \`$_.Handles\`) with complete mathematical and type integrity (integers remain integers; timestamps remain \`System.DateTime\` objects).
- **Defensive Engineering Implication:** Eliminates parsing vulnerabilities and script breakage in automated incident response runbooks, ensuring that automated containment actions (such as killing rogue processes or isolating host NICs) execute with 100% precision without accidental targeting errors.`
  },

  // Lesson 6.2 - Fig 2 (C03-M06-D48)
  {
    id: 'C03-M06-D48',
    caption: '*Figure C03-M06-D48: Sequential object stream processing: filtering rows with Where-Object, shaping columns with Select-Object, and statistical aggregation with Measure-Object.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Sequential Pipeline Dataflow:** Visualizes the transformation of a stream of live objects through sequential filtering, projection, and aggregation stages:
- **Object Generation (Source):** \`Get-Process\` queries the Windows Executive process manager, emitting thousands of strongly typed process objects into the pipeline.
- **Row-Level Filtering with Where-Object:** Depicts the conditional filter gate (\`Where-Object { $_.WorkingSet -gt 100MB }\`). Only objects satisfying the predicate condition are permitted to pass downstream; non-matching objects are immediately garbage collected, conserving system memory.
- **Column-Level Projection with Select-Object:** Shows property shaping (\`Select-Object Name, Id, CPU, WorkingSet\`). Extracts specific object members, discards extraneous metadata, or defines calculated properties (e.g., converting bytes to megabytes on the fly).
- **Statistical Aggregation with Measure-Object:** Illustrates the terminal aggregation stage (\`Measure-Object -Property WorkingSet -Sum -Average -Maximum\`). The cmdlet computes statistical summaries across the incoming object collection, outputting total memory consumption and peak process metrics.
- **Operational Performance Best Practice:** Emphasizes "filter left, format right"—applying filtering cmdlets as early in the pipeline as possible to minimize object serialization overhead and maximize execution speed.`
  },

  // Lesson 6.3 - Fig 1 (C03-M06-D49)
  {
    id: 'C03-M06-D49',
    caption: '*Figure C03-M06-D49: Construction and memory layout of PowerShell collections: ordered arrays (@()), key-value hash tables (@{}), and structured custom objects ([PSCustomObject]@{}).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Ordered Array Memory Layout (\`@()\`):** Dissects the linear, zero-indexed array structure (\`[System.Object[]]\`). Elements are indexed sequentially (\`$arr[0]\`, \`$arr[1]\`). Highlights the critical memory pitfall: .NET arrays are fixed-size in memory; using \`+= \` in loops forces the runtime to allocate a completely new array and copy all elements on every iteration, leading to exponential $O(n^2)$ memory degradation on large datasets.
- **Key-Value Hashtables (\`@{ }\`):** Visualizes the dictionary structure (\`[System.Collections.Hashtable]\`). Key-value pairs are mapped into memory buckets using hash functions, providing rapid $O(1)$ lookups by key (e.g., \`$hash['SRV01']\`). Hashtables are ideal for lookup tables, caching host state, and parameter splatting.
- **Structured Custom Objects (\`[PSCustomObject]@{}\`):** Depicts the gold standard for defensive scripting output. Wraps key-value hashtables into first-class .NET objects where keys become strongly typed properties.
- **Pipeline Interoperability:** Shows how \`[PSCustomObject]\` instances naturally support pipelining into standard formatting, export, and analysis cmdlets (\`Export-Csv\`, \`ConvertTo-Json\`, \`Out-GridView\`), enabling seamless integration into enterprise logging pipelines.`
  },

  // Lesson 6.3 - Fig 2 (C03-M06-D50)
  {
    id: 'C03-M06-D50',
    caption: '*Figure C03-M06-D50: Error handling mechanics in PowerShell: converting non-terminating errors into terminating exceptions with -ErrorAction Stop, and handling with Try/Catch/Finally.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Non-Terminating Errors vs. Terminating Exceptions:** Details PowerShell's bifurcated error architecture. By default, cmdlets emit non-terminating errors (such as a missing file in \`Get-Item\`) to the error stream (Stream 2) and continue executing subsequent commands without interrupting script flow.
- **Error Promotion with \`-ErrorAction Stop\`:** Shows how appending \`-ErrorAction Stop\` (or setting \`$ErrorActionPreference = 'Stop'\`) forces the runtime to promote a non-terminating operational error into a terminating .NET exception (\`System.Management.Automation.ActionPreferenceStopException\`). This promotion is required to trigger \`try/catch\` blocks.
- **Try / Catch / Finally Control Flow:**
  - **Try Block:** Encloses critical operations that might fail (e.g., network socket calls, registry edits).
  - **Catch Block:** Intercepts the terminating exception, captures the error record in \`$_\`, and inspects \`$_.Exception.Message\` and \`$_.InvocationInfo\` to execute graceful recovery or logging.
  - **Finally Block:** Guarantees unconditional execution regardless of whether the try block succeeded or caught an error, ensuring database connections, network sockets, and file handles are safely released.
- **Defensive Scripting Invariant:** Uncaught non-terminating errors allow compromised or broken automation scripts to execute subsequent commands against unintended targets, potentially exacerbating outages or security incidents.`
  },

  // Lesson 6.4 - Fig 1 (C03-M06-F3)
  {
    id: 'C03-M06-F3',
    caption: '*Figure C03-M06-F3: Validation and read-only gathering happen first; destructive changes run only if ShouldProcess approves, supporting -WhatIf dry-runs.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Two-Phase Operational Design Pattern:** Details the defensive software engineering pattern mandated for any function performing destructive or state-altering system modifications:
- **Phase 1: Read-Only Discovery & Validation:** The function executes read-only queries (e.g., querying Active Directory accounts, inspecting firewall rules) and validates input parameters without altering system state.
- **Phase 2: ShouldProcess Decision Gate:** Highlights the condition:
  \`if ($PSCmdlet.ShouldProcess($TargetObject, $ActionDescription))\`
  This built-in method evaluates the user's intent and command-line flags before any change is made:
  - If \`-WhatIf\` is specified, PowerShell prints what action *would* be taken against the target object and bypasses the code block entirely.
  - If \`-Confirm\` is specified, PowerShell pauses execution and displays an interactive confirmation dialog prompting the administrator for explicit approval.
  - If no flags are passed (standard execution), \`ShouldProcess\` returns \`$true\` and executes the destructive modification.
- **Defensive Significance:** Implementing \`SupportsShouldProcess\` provides a native safety net across production environments, allowing administrators to simulate complex remediation scripts (such as disabling stale user accounts or revoking firewall permissions) before executing them live.`
  },

  // Lesson 6.4 - Fig 2 (C03-M06-D51)
  {
    id: 'C03-M06-D51',
    caption: '*Figure C03-M06-D51: Anatomy of an advanced PowerShell function: [CmdletBinding()], param() block validation ([ValidateNotNullOrEmpty()], [ValidateSet()]), and begin/process/end blocks.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Advanced Function Architecture:** Deconstructs the professional PowerShell cmdlet template:
- **CmdletBinding Attribute:** The \`[CmdletBinding(SupportsShouldProcess = $true)]\` declaration upgrades a basic function into an advanced cmdlet, automatically introducing standard common parameters (\`-Verbose\`, \`-Debug\`, \`-ErrorAction\`, \`-WhatIf\`, \`-Confirm\`).
- **Parameter Block Validation Attributes:** Dissects declarative parameter constraints inside \`param()\`:
  - \`[Parameter(Mandatory = $true, ValueFromPipeline = $true)]\`: Enforces required input and wires parameters to incoming pipeline objects.
  - \`[ValidateNotNullOrEmpty()]\`: Prevents execution against null or whitespace strings.
  - \`[ValidateSet('Audit', 'Enforce', 'Disabled')]\`: Restricts arguments strictly to an approved whitelist of strings.
  - \`[ValidatePattern('^\\d{1,3}(\\.\\d{1,3}){3}$')]\`: Enforces regex formatting on IP addresses.
- **Pipeline Execution Lifecycle Blocks:**
  - **begin { }:** Executes once before any pipeline objects arrive, initializing database connections, API tokens, and logging buffers.
  - **process { }:** Executes once for *every individual object* streaming through the pipeline, performing the core operational logic.
  - **end { }:** Executes once after all pipeline objects are consumed, closing connections and outputting aggregated metrics.
- **Defensive Invariant:** Advanced parameter validation acts as an input sanitization firewall, preventing command injection and malformed argument processing before any executable logic runs.`
  },

  // Lesson 6.5 - Fig 1 (C03-M06-D52)
  {
    id: 'C03-M06-D52',
    caption: '*Figure C03-M06-D52: Demystifying Execution Policies (Restricted, RemoteSigned, AllSigned): why execution policy is a user safety net, not a security boundary.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Execution Policy Levels:** Details the standard execution policy configurations:
  - **Restricted:** Default on Windows clients; permits interactive commands but blocks execution of any \`.ps1\` script files.
  - **RemoteSigned:** Standard on Windows Server; permits local scripts to run unsigned, but requires scripts downloaded from the internet to possess a valid digital signature from a trusted certificate authority.
  - **AllSigned:** Requires every script (local and remote) to be signed with a trusted digital certificate.
  - **Bypass / Unrestricted:** No restrictions; all scripts execute with optional warnings for internet downloads.
- **Why Execution Policy Is Not a Security Boundary:** Illustrates Microsoft's formal architectural position: execution policy is a user safety net designed to prevent accidental script execution, *not* an access control or sandbox boundary.
- **Adversary Bypass Demonstrations:** Visualizes trivial, non-privileged bypass vectors accessible to any standard user:
  - \`powershell.exe -ExecutionPolicy Bypass -File script.ps1\`
  - \`Get-Content script.ps1 | powershell.exe -\`
  - \`powershell.exe -EncodedCommand <Base64String>\`
  - In-memory download and execution via \`Invoke-Expression (IEX)\`.
- **Defensive Reality:** Security teams must never rely on execution policies to block malicious code; true code execution prevention requires AppLocker or Windows Defender Application Control (WDAC).`
  },

  // Lesson 6.5 - Fig 2 (C03-M06-D53)
  {
    id: 'C03-M06-D53',
    caption: '*Figure C03-M06-D53: Hardening PowerShell with Constrained Language Mode (CLM) coupled with AppLocker or Windows Defender Application Control (WDAC).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Language Mode Comparison (FullLanguage vs. ConstrainedLanguage):** Contrasts the unrestricted FullLanguage mode (which permits arbitrary .NET reflection, COM object creation, and direct Win32 API memory access) against Constrained Language Mode (CLM).
- **Constrained Language Mode (CLM) Restrictions:** Visualizes the lockdown of the PowerShell engine:
  - Disables direct invocation of unapproved .NET types and methods (e.g., \`[System.Runtime.InteropServices.Marshal]\` or \`[System.Reflection.Assembly]\`).
  - Blocks Win32 API calls via \`Add-Type\` and dynamic C# compilation.
  - Disables COM object manipulation and custom class declarations.
  - Restricts access strictly to core cmdlets and whitelisted primitive types.
- **Enforcement via WDAC and AppLocker:** Depicts the architectural linkage: when Windows Defender Application Control (WDAC) or AppLocker enforces code integrity on an endpoint, PowerShell automatically detects the policy and forces all untrusted, unsigned scripts into Constrained Language Mode.
- **Mitigating Living-off-the-Land (LotL) Attacks:** Explains how CLM effectively neutralizes memory-injection frameworks (such as PowerShell-based Cobalt Strike beacons or Mimikatz runners) by denying access to memory-manipulation .NET APIs.`
  },

  // Lesson 6.6 - Fig 1 (C03-M06-F2)
  {
    id: 'C03-M06-F2',
    caption: '*Figure C03-M06-F2: PowerShell defense-in-depth: delegation (JEA), application control (WDAC), safety nets, AMSI in-memory inspection, and script block logging.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Concentric Five-Layer PowerShell Security Architecture:** Depicts the layered defensive posture designed to neutralize malicious PowerShell tradecraft across the enterprise:
- **Layer 1: Least-Privilege Delegation (JEA):** Just Enough Administration (JEA) establishes non-administrative remote endpoints where operators connect and execute only a tightly whitelisted set of specific cmdlets and parameters without administrative credentials.
- **Layer 2: Application Control & Language Hardening (WDAC):** Windows Defender Application Control enforces code integrity and locks untrusted execution down to Constrained Language Mode (CLM).
- **Layer 3: Accidental Execution Guardrails:** Execution policies serve as a basic safety net preventing naive users from double-clicking untrusted scripts.
- **Layer 4: In-Memory Runtime Inspection (AMSI):** Antimalware Scan Interface inspects dynamically generated, in-memory script buffers immediately prior to execution, detecting obfuscated payloads.
- **Layer 5: Enterprise Telemetry & Auditing:** Script Block Logging (Event ID 4104), Module Logging (Event ID 4103), and Transcription forward complete execution records to central SIEM platforms for threat hunting.`
  },

  // Lesson 6.6 - Fig 2 (C03-M06-D54)
  {
    id: 'C03-M06-D54',
    caption: '*Figure C03-M06-D54: How Script Block Logging (Event ID 4104) and AMSI defeat obfuscation by capturing the final de-obfuscated code block directly at execution time.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Adversary Code Obfuscation Pipeline:** Traces a complex, multi-layered malicious payload utilizing string formatting, variable expansion, tick mark insertion (\`d\`o\`w\`n\`l\`o\`a\`d\`), XOR decryption, and Base64 encoding to evade traditional network-based and static disk-based antivirus scanners.
- **Abstract Syntax Tree (AST) Compilation:** Illustrates the PowerShell engine receiving the obfuscated input. Before the code can execute, the parser must unpack, resolve, and compile the instructions into a concrete in-memory Abstract Syntax Tree.
- **AMSI In-Memory Buffer Interception:** Visualizes the Antimalware Scan Interface hook. Immediately prior to execution, the compiled AST buffer is passed into \`AmsiScanBuffer\`. Security solutions (such as Microsoft Defender) evaluate the de-obfuscated plaintext code against heuristic signatures, terminating execution if malicious patterns are detected.
- **Script Block Logging (Event ID 4104):** Shows the PowerShell engine recording the exact, fully de-obfuscated script content into the \`Microsoft-Windows-PowerShell/Operational\` event log. Even if an adversary bypasses AMSI, the SIEM receives the full plaintext command string.
- **Defensive Investigation Value:** Proves why modern SOCs rely on Event ID 4104: obfuscation layers dissolve at runtime, giving defenders direct visibility into the adversary's true intent and actions.`
  }
];

// Apply updates
for (const update of updates) {
  let matched = false;
  if (content.includes(update.caption)) {
    matched = true;
  } else {
    const bareCaption = update.caption.replace(/^\*|\*$/g, '');
    if (content.includes(bareCaption)) {
      matched = true;
      update.caption = bareCaption;
    }
  }
  if (!matched) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
}

console.log('Successfully matched and formatted ' + updates.length + ' figures in Module 6.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module6.js!');
