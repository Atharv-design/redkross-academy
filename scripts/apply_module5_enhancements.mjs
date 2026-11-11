import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module5.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 5.1 - Fig 1 (C03-M05-F1)
  {
    id: 'C03-M05-F1',
    caption: '*Figure C03-M05-F1: Windows user-mode components call into the kernel through ntdll; the executive includes the Configuration Manager, Object Manager, and Security Reference Monitor.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **User-Mode (Ring 3) Subsystem Architecture:** Traces user applications calling high-level Win32 subsystem APIs (in \`kernel32.dll\`, \`user32.dll\`, \`advapi32.dll\`). These DLLs translate requests and call into \`ntdll.dll\`, the native system service stub library.
- **Hardware-Enforced Privilege Boundary:** Highlights the transition across the processor privilege boundary via CPU instructions (\`syscall\` on x64, \`sysenter\` on x86). This shifts execution from Ring 3 user mode to Ring 0 kernel mode, preventing user code from executing privileged instructions directly.
- **Windows Executive Subsystems (\`ntoskrnl.exe\`):** Visualizes core kernel services:
  - **Object Manager:** Manages uniform system object tracking, handles, reference counts, and the \`\\Device\`, \`\\Driver\`, and \`\\BaseNamedObjects\` namespaces.
  - **Security Reference Monitor (SRM):** Enforces mandatory and discretionary access checks, validates access tokens against security descriptors, and emits security audit events.
  - **Configuration Manager:** Manages the in-memory representation and disk persistence of Windows Registry hives.
  - **Process and Thread Manager:** Schedules threads and allocates memory address spaces.
  - **I/O Manager & Device Drivers:** Dispatches I/O Request Packets (IRPs) to kernel-mode drivers.
- **Hardware Abstraction Layer (HAL):** Depicts the lowest kernel layer interfacing directly with the CPU and motherboard chipsets, isolating the Windows kernel from motherboard-specific differences.`
  },

  // Lesson 5.1 - Fig 2 (C03-M05-D37)
  {
    id: 'C03-M05-D37',
    caption: '*Figure C03-M05-D37: Standard Windows boot process hierarchy illustrating Session 0 service isolation (services.exe, lsass.exe) and interactive User Session 1 (explorer.exe).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Early Boot Sequence to Kernel Initialization:** Traces the bootstrap workflow from UEFI firmware loading \`bootmgr.efi\` and \`winload.efi\` to initialize the kernel (\`ntoskrnl.exe\`) and load boot-critical storage and filesystem drivers.
- **Session Manager Subsystem (\`smss.exe\`):** Highlights the first user-mode process spawned by the kernel. \`smss.exe\` configures system environment variables, starts the Master Session, defines the paging file, and launches individual session instances.
- **Session 0 Isolation (Non-Interactive Services):** Details the security architectural boundary introduced in Windows Vista:
  - Spawns \`wininit.exe\`, which instantiates the Service Control Manager (\`services.exe\`), Local Security Authority (\`lsass.exe\`), and Local Session Manager (\`lsm.exe\`).
  - All background services run strictly in Session 0, completely isolated from user desktop interfaces. This mitigates "Shatter attacks," where malicious user-mode processes injected window messages (such as \`WM_COMMAND\`) into interactive service dialogs to execute arbitrary Ring 0/SYSTEM code.
- **Session 1+ Interactive Desktop Sessions:** Shows \`winlogon.exe\`, the Secure Attention Sequence handler, and \`logonui.exe\` presenting the login prompt. Upon successful authentication, \`userinit.exe\` runs user group policies and launches \`explorer.exe\` to present the desktop shell.
- **Defensive Significance:** Understanding the canonical process tree allows security operations center (SOC) analysts to immediately detect anomalous parent-child relationships, such as \`services.exe\` or \`lsass.exe\` spawning interactive command shells (\`cmd.exe\` or \`powershell.exe\`).`
  },

  // Lesson 5.2 - Fig 1 (C03-M05-F3)
  {
    id: 'C03-M05-F3',
    caption: '*Figure C03-M05-F3: HKLM hives and per-user hives with their on-disk backing files and critical security-relevant persistence locations.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Registry Root Hive Architecture:** Details the hierarchical key namespace: \`HKEY_LOCAL_MACHINE\` (HKLM) governing machine-wide hardware and operating system policies, and \`HKEY_USERS\` (HKU) maintaining individual user profiles. Symbolic links map convenience root keys, such as \`HKEY_CURRENT_USER\` (HKCU) resolving to the logged-in user's profile under \`HKU\\<User-SID>\`.
- **On-Disk Backing Files:** Maps memory-mapped registry hives to physical system storage:
  - System hives reside in \`C:\\Windows\\System32\\config\\\` as raw binary files: \`SYSTEM\`, \`SOFTWARE\`, \`SAM\`, and \`SECURITY\`.
  - User hives reside in \`C:\\Users\\<Username>\\NTUSER.DAT\` (and user class registrations in \`UsrClass.dat\`).
- **High-Value Persistence Attack Surfaces:** Visualizes the key locations monitored by EDR and threat hunters:
  - \`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\` and \`RunOnce\` keys.
  - Active Service entries in \`HKLM\\SYSTEM\\CurrentControlSet\\Services\\\`.
  - Winlogon notification packages and Userinit execution paths.
  - Image File Execution Options (IFEO) debugger hijacks and AppInit_DLLs injection keys.
- **Privilege Separation & File Locks:** Shows that critical hives (\`SAM\` and \`SECURITY\`) maintain exclusive file locks held by the kernel, preventing standard user processes from reading raw NTLM password hashes from disk while the operating system is active.`
  },

  // Lesson 5.2 - Fig 2 (C03-M05-D38)
  {
    id: 'C03-M05-D38',
    caption: '*Figure C03-M05-D38: Write-ahead logging in the Windows registry: in-memory cell modification, transaction logging (.LOG1/.LOG2), and atomic hive sync.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Registry Memory Model (HBINs & Cells):** Illustrates the internal structure of registry hives composed of 4096-byte hive bins (HBINs) containing key cells, value cells, and security descriptor cells.
- **In-Memory Modification Workflow:** When a process invokes \`RegSetValueEx\`, the Configuration Manager updates the target cell in non-paged kernel pool memory and immediately marks the parent HBIN as dirty.
- **Write-Ahead Logging via CLFS (.LOG1 / .LOG2):** Visualizes the durability mechanism. Before flushing changes to the primary hive file on disk, the Configuration Manager writes raw transaction records and dirty cell blocks to transaction log files (e.g., \`SYSTEM.LOG1\` and \`SYSTEM.LOG2\`) utilizing Common Log File System (CLFS) sequence numbers.
- **Atomic Two-Phase Hive Synchronization:** Depicts the periodic flush daemon and clean shutdown sync. The kernel copies verified dirty cells into the master hive file and updates the base block sequence numbers. If a sudden power loss occurs during writing, the boot loader replays the transaction logs to restore hive consistency without corruption.
- **Forensic Investigation Value:** For incident responders, uncommitted or deleted values often remain recoverable inside \`.LOG1\` and \`.LOG2\` transaction journals, enabling reconstruction of adversary persistence mechanisms that were subsequently unlinked from active keys.`
  },

  // Lesson 5.3 - Fig 1 (C03-M05-D39)
  {
    id: 'C03-M05-D39',
    caption: '*Figure C03-M05-D39: Privilege escalation via unquoted service paths: how CreateProcess searches whitespace-delimited paths to execute malicious binaries.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Vulnerable Service Binary Configuration:** Illustrates an insecure service registration in \`HKLM\\SYSTEM\\CurrentControlSet\\Services\\<ServiceName>\\ImagePath\` where the file path contains whitespace but lacks enclosing literal double quotes (e.g., \`C:\\Program Files\\Enterprise Software\\monitor.exe\`).
- **CreateProcess Ambiguity Resolution Pipeline:** Visualizes the sequential path resolution logic executed by the Windows API when an unquoted string with spaces is parsed:
  1. \`C:\\Program.exe\` (Checks for binary match before the first space).
  2. \`C:\\Program Files\\Enterprise.exe\` (Checks for binary match before the second space).
  3. \`C:\\Program Files\\Enterprise Software\\monitor.exe\` (Target legitimate binary).
- **Adversary Exploitation Vector:** Shows an unprivileged local attacker with write permissions to \`C:\\\` or \`C:\\Program Files\\\` dropping a malicious executable named \`Program.exe\`. When the Service Control Manager restarts or the machine reboots, SCM initiates the service under \`NT AUTHORITY\\SYSTEM\`, inadvertently launching the attacker's Trojan with full administrative privileges.
- **Defensive Remediation Invariant:** Demonstrates the correct configuration: enclosing all path strings in literal quotes (\`"C:\\Program Files\\Enterprise Software\\monitor.exe"\`), forcing \`CreateProcess\` to treat the entire string as a single unambiguous file path.`
  },

  // Lesson 5.3 - Fig 2 (C03-M05-D40)
  {
    id: 'C03-M05-D40',
    caption: '*Figure C03-M05-D40: Security comparison of Windows built-in service identities, detailing local privileges, network authentication capabilities, and modern gMSA adoption.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Built-in Service Identity Hierarchy:** Compares the four primary service account architectures across privilege, isolation, and authentication domains:
  - **LocalSystem (\`NT AUTHORITY\\SYSTEM\`):** Grants total local control over the operating system, including \`SeDebugPrivilege\` and \`SeTcbPrivilege\`. When connecting to network resources across an Active Directory domain, it presents the computer's machine account credentials (\`DOMAIN\\COMPUTER$\`).
  - **NetworkService (\`NT AUTHORITY\\NETWORK SERVICE\`):** Provides standard user-level local privileges while retaining the ability to authenticate over the network using the computer's Active Directory machine identity.
  - **LocalService (\`NT AUTHORITY\\LOCAL SERVICE\`):** Implements least privilege locally and authenticates over the network as an anonymous / null session, providing maximum containment for network-facing daemons.
  - **Group Managed Service Accounts (gMSA):** Enterprise Active Directory service identities with automatic, cryptographically secure 30-day password rotation managed by the KDS Root Key service.
- **Credential Storage & Attack Surface Mitigation:** Highlights how gMSAs eliminate hardcoded service passwords in registry hives and configuration files, completely preventing Kerberoasting and credential dump theft against service accounts.
- **Defensive Invariant:** Custom enterprise daemons must never run as \`LocalSystem\` unless operating at the kernel driver boundary; adopting \`NetworkService\`, \`LocalService\`, or gMSAs enforces strict least-privilege containment.`
  },

  // Lesson 5.4 - Fig 1 (C03-M05-D41)
  {
    id: 'C03-M05-D41',
    caption: '*Figure C03-M05-D41: Bit-level and textual dissection of a Windows Security Identifier (SID): revision, identifier authority, domain sub-authorities, and Relative Identifier (RID).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Formal SID Syntax Structure:** Deconstructs the string representation of a Windows Security Identifier:
  $$\\text{S-1-5-21-1234567890-1234567890-1234567890-1001}$$
  mapping each delimited token to its binary memory layout in the security reference monitor.
- **Literal Prefix & Revision (\`S-1\`):** Identifies the string as a Security Identifier (\`S\`) and indicates the revision level (currently \`1\` across all modern Windows NT operating systems).
- **Identifier Authority (\`5\`):** Specifies the issuing authority governing the identifier. Value \`5\` denotes \`SECURITY_NT_AUTHORITY\`, which encompasses all native Windows NT security identities and local/domain authorities.
- **Domain Sub-Authorities (\`21-XXXXX-YYYYY-ZZZZZ\`):** Analyzes the enterprise domain or local machine unique identifier. Sub-authority \`21\` indicates a non-unique local computer or Active Directory domain identifier, followed by three 32-bit cryptographically pseudorandom integers uniquely distinguishing the security realm.
- **Relative Identifier (RID, \`1001\`):** Highlights the unique user or group index allocated within the domain:
  - RID \`500\`: Built-in local Administrator account.
  - RID \`501\`: Built-in Guest account.
  - RID \`512\`: Active Directory Domain Admins group.
  - RID \`>= 1000\`: Custom user accounts and security groups created by administrators.`
  },

  // Lesson 5.4 - Fig 2 (C03-M05-D42)
  {
    id: 'C03-M05-D42',
    caption: '*Figure C03-M05-D42: Taxonomy of universal well-known Windows SIDs: Everyone (S-1-1-0), Authenticated Users (S-1-5-11), Built-in Administrators (S-1-5-32-544).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Universal Well-Known SID Taxonomy:** Organizes universal security identifiers hardcoded into the Windows operating system across all regional language localizations:
  - **Everyone (\`S-1-1-0\`):** Encompasses all interactive, network, and guest users (excluding anonymous logon in modern hardened configurations).
  - **Authenticated Users (\`S-1-5-11\`):** Encompasses any security principal whose credentials have been successfully authenticated by a domain controller or local SAM database (excluding Guest and anonymous sessions).
  - **Interactive (\`S-1-5-4\`) & Network (\`S-1-5-2\`):** Dynamic identity tokens injected into access tokens depending on the logon session type.
  - **Local System (\`S-1-5-18\`):** The operating system core service identity.
- **Built-in Alias Identifiers (\`S-1-5-32-XXX\`):** Maps well-known local security groups issuing under sub-authority \`32\` (\`SECURITY_BUILTIN_DOMAIN_RID\`):
  - \`S-1-5-32-544\`: Built-in Administrators group.
  - \`S-1-5-32-545\`: Built-in Users group.
  - \`S-1-5-32-555\`: Remote Desktop Users group.
- **Defensive Significance in SIEM & Detection Engineering:** Highlights why detection rules must match well-known SIDs rather than account strings; adversary renames of the "Administrator" account to camouflage activity will still retain the immutable SID ending in RID \`500\` or group SID \`S-1-5-32-544\`.`
  },

  // Lesson 5.5 - Fig 1 (C03-M05-F2)
  {
    id: 'C03-M05-F2',
    caption: "Figure C03-M05-F2: The Security Reference Monitor compares a process token with an object's security descriptor (DACL) and integrity label to grant or deny access.",
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Security Reference Monitor (SRM) Dual Evaluation Pipeline:** Visualizes the kernel access validation sequence when a thread opens a handle to a secured kernel object (file, registry key, process, or mutex).
- **Mandatory Integrity Control (MIC) Check:** Depicts the first security boundary:
  - SRM compares the thread token's Integrity Level (Untrusted, Low, Medium, High, System) against the object's Mandatory Label.
  - SRM enforces the "No Write Up" invariant: a process with Medium integrity (standard user or browser) is prohibited from acquiring write or modify handles to High-integrity objects (system files or administrative processes), preventing code injection and DLL planting.
- **Discretionary Access Control (DACL) Evaluation:** Illustrates the four-step algorithmic evaluation of Access Control Entries (ACEs):
  1. **Explicit Access Denied ACEs:** Evaluated first; if any explicit deny ACE matches the caller's SID and requested access rights, access is immediately DENIED.
  2. **Explicit Access Allowed ACEs:** Evaluated next to accumulate granted access masks.
  3. **Inherited Denied ACEs:** Evaluated if requested rights are not yet fully resolved.
  4. **Inherited Allowed ACEs:** Evaluated last.
- **Default-Deny Access Decision:** If the end of the DACL is reached before all requested rights are explicitly granted, the SRM terminates evaluation and returns \`STATUS_ACCESS_DENIED\`.`
  },

  // Lesson 5.5 - Fig 2 (C03-M05-D43)
  {
    id: 'C03-M05-D43',
    caption: '*Figure C03-M05-D43: How User Account Control creates split tokens at logon: a filtered standard user token for daily work and an elevated token activated via consent prompt.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Split-Token Generation at Logon:** Traces the logon sequence of an administrative user. When authentication succeeds, LSASS does not issue a single full administrative token. Instead, it generates two linked tokens:
  - **Full Elevated Token:** Contains full administrative privileges (\`SeDebugPrivilege\`, \`SeTakeOwnershipPrivilege\`), enabled group SID \`S-1-5-32-544\` (Administrators), and a High Integrity Level. This token is held dormant by the LSA.
  - **Filtered Token (Standard User):** The default operational token. Administrative SIDs are marked with the \`SE_GROUP_USE_FOR_DENY_ONLY\` attribute, administrative privileges are stripped, and the integrity level is set to Medium.
- **Daily Interactive Shell Execution:** Shows \`explorer.exe\` and all subsequent applications spawned by the user executing under the restricted filtered token, confining the blast radius of web browsers, email clients, and downloaded software.
- **Elevation Request & Secure Desktop Isolation:** Depicts the UAC elevation boundary. When an executable requests administrative privileges (\`requireAdministrator\` in manifest), the Application Information service (\`Appinfo\`) invokes \`consent.exe\` on the Secure Desktop (Session-isolated desktop inaccessible to user-mode keyloggers and malware).
- **Elevation Outcome:** Upon user approval, the dormant Full Elevated Token is bound to the target process, allowing authorized administrative utilities to execute with High integrity.`
  },

  // Lesson 5.6 - Fig 1 (C03-M05-D44)
  {
    id: 'C03-M05-D44',
    caption: '*Figure C03-M05-D44: Internal structure of an NTFS Security Descriptor: Control flags, Owner SID, Primary Group SID, Discretionary ACL (permissions), and System ACL (auditing).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **NTFS Security Descriptor Binary Header:** Deconstructs the structure of a Windows Security Descriptor protecting NTFS filesystem objects:
  - **Control Flags:** 16-bit word indicating structural attributes (e.g., \`SE_DACL_PRESENT\`, \`SE_DACL_PROTECTED\` to prevent parent inheritance, and \`SE_DACL_AUTO_INHERITED\`).
  - **Owner SID Pointer:** Identifies the object creator or assigned owner. Crucially, the owner always possesses implicit \`WRITE_DAC\` and \`READ_CONTROL\` rights, allowing them to recover access even if the DACL explicitly denies everyone.
  - **Primary Group SID Pointer:** Maintained for POSIX subsystem compatibility.
- **Discretionary Access Control List (DACL):** Points to the ordered array of Access Control Entries (ACEs) defining who is permitted or denied specific file operations (Read Data, Write Data, Append, Delete, Execute).
- **System Access Control List (SACL):** Details the audit policy array. SACL entries define which access attempts (Success or Failure) generate security event log entries (Windows Event ID 4663) in the Security event channel.
- **ACE Memory Layout:** Shows the internal structure of individual ACE blocks: \`AceType\` (Allow, Deny, Audit), \`AceFlags\` (Container/Object Inherit), \`AceSize\`, 32-bit \`AccessMask\`, and the target principal SID.`
  },

  // Lesson 5.6 - Fig 2 (C03-M05-D45)
  {
    id: 'C03-M05-D45',
    caption: '*Figure C03-M05-D45: Permission evaluation over the network: combining SMB Share permissions with underlying NTFS DACLs where the most restrictive permission always wins.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Two-Tier Network Access Control Model:** Depicts an inbound network user connecting to a Windows shared folder over SMB (Server Message Block, port 445). The connection must traverse two distinct, independent authorization checkpoints.
- **Layer 1: SMB Share Permissions:** Evaluated at the network protocol layer upon mounting the network share (e.g., \`\\\\SERVER\\Finance\`). Share permissions offer coarse control: Read, Change, and Full Control.
- **Layer 2: Underlying NTFS Filesystem DACLs:** Evaluated at the local storage driver layer once the SMB service accesses physical files on disk. NTFS provides granular control: Read Attributes, Write Extended Attributes, Delete Subfolders and Files, Modify, and Full Control.
- **The "Most Restrictive Wins" Intersection Invariant:** Formalizes the mathematical access decision:
  $$\\text{Effective Permission} = \\text{Share Permissions} \\cap \\text{NTFS DACLs}$$
  - **Scenario A:** Share = Full Control, NTFS = Read Only $\\rightarrow$ Effective Access = **Read Only**.
  - **Scenario B:** Share = Read Only, NTFS = Full Control $\\rightarrow$ Effective Access = **Read Only**.
  - **Scenario C:** Share = Change, NTFS = Modify $\\rightarrow$ Effective Access = **Modify**.
- **Defensive Engineering Best Practice:** Explains enterprise best practice: set SMB Share permissions to "Authenticated Users: Full Control" and enforce precise least-privilege access entirely through granular NTFS DACLs, eliminating conflicting dual-layer policy divergence.`
  }
];

// Verify caption matching in content
for (const update of updates) {
  let matched = false;
  if (content.includes(update.caption)) {
    matched = true;
  } else {
    // Check if caption exists without stars or with slightly different spacing
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

console.log('Successfully matched and formatted ' + updates.length + ' figures in Module 5.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module5.js!');
