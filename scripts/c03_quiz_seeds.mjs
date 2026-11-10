/**
 * RedKross Academy - Course 03 Quiz Seeds
 * Contains exact MCQs and Scenarios from Section 7 of Modules 1-8 and Part C of
 * COURSE_03_Linux_and_Windows_System_Administration.txt
 */

export const C03_SEEDS = {
  // Module 1 Seeds
  1: [
    {
      topic: 'Kernel Space vs. User Space & System Calls',
      difficulty: 'medium',
      q: 'How does a user-space program ask the kernel to open a file or perform I/O?',
      options: [
        'Through a system call (syscall)',
        'By writing directly to the physical disk controller hardware registers',
        'By editing kernel page table structures in volatile memory',
        'Through a legacy BIOS real-mode interrupt'
      ],
      correct: 0,
      explanation: 'System calls are the controlled, architecturally enforced boundary through which user-space programs request services from the privileged kernel.'
    },
    {
      topic: 'Kernel-Mode Failure Forensics (CrowdStrike 2024)',
      difficulty: 'difficult',
      q: 'Why was the 2024 CrowdStrike Channel 291 fault able to crash entire Windows systems with blue screens (BSOD)?',
      options: [
        'The faulting code ran in kernel mode (Ring 0), where an invalid memory read exception stops the entire operating system kernel.',
        'The driver operated entirely in user space and exhausted memory allocation tables.',
        'The update deleted the SYSTEM and SAM hives from the Windows registry.',
        'The driver was an autonomous self-propagating worm that exhausted network sockets.'
      ],
      correct: 0,
      explanation: 'Kernel-mode faults cannot be isolated or contained like user-space crashes. When kernel code attempts an invalid memory read, the kernel initiates a bugcheck/BSOD to prevent silent memory corruption.'
    },
    {
      topic: 'Process & Thread Lifecycle & Ancestry Trees',
      difficulty: 'medium',
      q: 'On a Windows system, the wininit.exe process has a parent process ID that does not exist in the active process table. This phenomenon is:',
      options: [
        'Normal, because the temporary smss.exe instance that initialized the session terminates immediately after launching wininit.exe.',
        'An indicator of disk driver corruption within the NTFS volume.',
        'Always malicious, proving unauthorized process hollowing by malware.',
        'Architecturally impossible on modern Windows NT versions.'
      ],
      correct: 0,
      explanation: 'smss.exe starts a temporary per-session instance that launches wininit.exe and then immediately exits, leaving wininit without an active running parent process.'
    },
    {
      topic: 'Memory Exploit Mitigations (ASLR & DEP/NX)',
      difficulty: 'medium',
      q: 'What is the defensive function of Address Space Layout Randomization (ASLR)?',
      options: [
        'It randomizes the memory base addresses of code, stack, and heap segments upon every program execution.',
        'It cryptographically encrypts physical RAM bytes to prevent hardware cold-boot attacks.',
        'It automatically zeroes unused memory pages to mitigate side-channel data leaks.',
        'It verifies the digital signatures of device drivers prior to loading them into Ring 0.'
      ],
      correct: 0,
      explanation: 'ASLR randomizes memory layout offsets every time an executable runs, preventing attackers from predicting fixed memory addresses for return-to-libc or ROP chain exploits.'
    },
    {
      topic: 'Virtual Memory Management & Paging',
      difficulty: 'medium',
      q: 'A memory region displayed as \"r-xp\" in /proc/<pid>/maps has which access permissions?',
      options: [
        'Readable and executable, but strictly non-writable (private mapping).',
        'Writable and executable, representing an unsafe memory region.',
        'Network shared memory mapped across multiple container namespaces.',
        'Swapped memory pages compressed in swap partitions.'
      ],
      correct: 0,
      explanation: 'In /proc/<pid>/maps, r = read, x = execute, - = no write (non-writable), and p = private (copy-on-write mapping).'
    },
    {
      topic: 'UEFI Secure Boot, Shim & Kernel Hand-off',
      difficulty: 'medium',
      q: 'What does UEFI Secure Boot cryptographically verify before transferring execution control?',
      options: [
        'Digital signatures of boot components against trusted keys stored in NVRAM (PK, KEK, db).',
        'User account password hashes stored within local firmware chips.',
        'TLS digital certificates presented by local network gateway routers.',
        'Total storage capacity of NVMe solid-state drives.'
      ],
      correct: 0,
      explanation: 'Secure Boot verifies the digital signature of the initial bootloader and subsequent boot stages against an authorized signature database (db) stored in protected firmware NVRAM.'
    },
    {
      topic: 'Process & Thread Lifecycle & Ancestry Trees',
      difficulty: 'medium',
      q: 'On most modern enterprise Linux distributions, which daemon occupies Process ID 1 (PID 1)?',
      options: [
        'systemd',
        'The monolithic Linux kernel',
        'The interactive bash login shell',
        'The crond background scheduler daemon'
      ],
      correct: 0,
      explanation: 'systemd is the standard initialization daemon and occupies PID 1 on Debian, Ubuntu, RHEL, CentOS, Fedora, and openSUSE distributions.'
    },
    {
      topic: 'Windows SCM & svchost Architecture',
      difficulty: 'medium',
      q: 'Which built-in Windows service account possesses the broadest local privileges on the system?',
      options: [
        'NT AUTHORITY\\SYSTEM (LocalSystem)',
        'NT AUTHORITY\\LocalService',
        'NT AUTHORITY\\NetworkService',
        'A standard Virtual Service Account (NT SERVICE\\<Name>)'
      ],
      correct: 0,
      explanation: 'LocalSystem has comprehensive local privileges (including SeDebugPrivilege, SeTcbPrivilege) with unrestricted access to local filesystem and registry assets.'
    },
    {
      topic: 'systemd Unit Lifecycle & Failure Recovery',
      difficulty: 'difficult',
      q: 'A systemd service restarts automatically after its main worker process is terminated via kill -9. Which unit configuration directive produced this self-healing behavior?',
      options: [
        'Restart=on-failure (or Restart=always) configured within the [Service] section of the unit file.',
        'The unit was marked with \"systemctl enable\" in the multi-user.target directory.',
        'A cron job detected the process failure and triggered a reload.',
        'The Linux kernel automatically clones terminated processes if they own network sockets.'
      ],
      correct: 0,
      explanation: 'Restart=on-failure instructs systemd to monitor the process exit code; if the process exits abnormally (such as being killed by SIGKILL), systemd automatically initiates a restart.'
    },
    {
      topic: 'Process & Thread Lifecycle & Ancestry Trees',
      difficulty: 'medium',
      q: 'Which Linux signal requests a process to terminate cleanly and allows the process to intercept the signal and execute cleanup routines?',
      options: [
        'SIGTERM (Signal 15)',
        'SIGKILL (Signal 9)',
        'SIGSTOP (Signal 19)',
        'SIGSEGV (Signal 11)'
      ],
      correct: 0,
      explanation: 'SIGTERM (15) is the standard termination request signal. Unlike SIGKILL (9), SIGTERM can be caught and handled by application code to perform safe cleanup and flush buffers.'
    }
  ],

  // Module 2 Seeds
  2: [
    {
      topic: 'Filesystem Hierarchy Standard (FHS 3.0)',
      difficulty: 'medium',
      q: 'According to the Filesystem Hierarchy Standard (FHS 3.0), which directory is designated strictly for host-specific configuration files?',
      options: [
        '/etc',
        '/var',
        '/usr',
        '/opt'
      ],
      correct: 0,
      explanation: '/etc is the standard repository for host-specific, static system configuration files (e.g. /etc/passwd, /etc/fstab, /etc/network/interfaces).'
    },
    {
      topic: 'Virtual Filesystems (/proc & /sys)',
      difficulty: 'medium',
      q: 'The /proc and /sys directories on a Linux system consume zero physical disk storage. Why is this?',
      options: [
        'They are synthetic virtual filesystems (procfs and sysfs) generated dynamically in memory by the kernel upon request.',
        'They are compressed with transparent zswap blocks on the NVMe boot partition.',
        'They are remote NFS volumes mounted from the distribution mirror at boot.',
        'They are encrypted partitions hidden by hardware TPM security.'
      ],
      correct: 0,
      explanation: '/proc and /sys do not store files on physical media; they are virtual filesystems through which the Linux kernel exposes live runtime structures and parameters from RAM.'
    },
    {
      topic: 'Hard Links vs. Symbolic Links Mechanics',
      difficulty: 'medium',
      q: 'An administrator creates a hard link between /opt/file1 and /opt/file2. What happens if /opt/file1 is deleted via rm?',
      options: [
        'The file content remains completely intact and readable via /opt/file2, and the inode link count decrements by one.',
        'The file content is permanently erased and /opt/file2 becomes a broken dangling reference.',
        'The filesystem encounters an unrecoverable inode fault requiring fsck repair.',
        'The operating system blocks the deletion until all existing hard links are explicitly removed.'
      ],
      correct: 0,
      explanation: 'A hard link is another directory entry pointing to the same inode. Deleting one hard link decrements the inode link count; the file data is preserved until the link count reaches zero.'
    },
    {
      topic: 'Bash Shell Processing Pipeline & Tokenization',
      difficulty: 'difficult',
      q: 'Why does single quoting (\'...\') behave differently from double quoting (\"...\") in the Bash shell pipeline?',
      options: [
        'Single quotes preserve the literal value of all enclosed characters, whereas double quotes permit parameter expansion ($VAR) and command substitution.',
        'Double quotes disable all shell globbing, whereas single quotes execute arithmetic expansion.',
        'Single quotes cause the enclosed command to execute in an isolated background subshell.',
        'Double quotes automatically escape all newline characters into semicolons.'
      ],
      correct: 0,
      explanation: 'Single quotes enforce strict literal strings—zero expansions occur. Double quotes allow variable expansion ($), command substitution ($(cmd)), and arithmetic expansion ($((...))), but suppress globbing and word splitting.'
    }
  ],

  // Module 3 Seeds
  3: [
    {
      topic: 'Linux Account Databases & Shadow Password Cryptography',
      difficulty: 'medium',
      q: 'In /etc/shadow, what is the role of the cryptographic salt string positioned before the hashed password value?',
      options: [
        'It introduces unique random entropy so identical user passwords produce completely different hash outputs, defeating pre-computed rainbow table attacks.',
        'It encrypts the password hash with the host\'s TPM 2.0 endorsement key.',
        'It limits the maximum password length to 64 alphanumeric characters.',
        'It records the timestamp of the last password modification in epoch days.'
      ],
      correct: 0,
      explanation: 'Salting prevents dictionary and rainbow table attacks. Even if two users choose the same password, unique salts ensure their stored cryptographic hashes are completely distinct.'
    },
    {
      topic: 'Octal & Symbolic File Permissions',
      difficulty: 'medium',
      q: 'An unprivileged user attempts to execute \"cat /srv/secure/data.txt\". The user has read access on data.txt, but lacks execute (traverse) permission on the directory /srv/secure. What is the result?',
      options: [
        'Permission denied (EACCES) — traversing a path requires execute (x) permission on every parent directory in the path.',
        'The cat utility reads the file successfully because file-level permissions supersede parent directory permissions.',
        'The kernel prompts the user for their account password via PAM.',
        'The file is copied into /tmp where the user reads it.'
      ],
      correct: 0,
      explanation: 'Traverse permission (x) is mandatory on EVERY directory along the entire path. Without execute rights on /srv/secure, the kernel blocks directory lookup, returning Permission Denied.'
    }
  ],

  // Module 4 Seeds
  4: [
    {
      topic: 'Defensive Shell Scripting (set -euo pipefail)',
      difficulty: 'difficult',
      q: 'In a shell script without \"set -o pipefail\", what is the exit status ($?) of the pipeline: \"failing_cmd | grep pattern | wc -l\" if grep and wc succeed?',
      options: [
        '0 (Success) — standard Bash pipelines report only the exit code of the final command, masking upstream errors.',
        '1 (Failure) — Bash automatically propagates the earliest non-zero exit code across the pipeline.',
        '127 (Command Not Found) — pipelines halt instantly upon any intermediate binary failure.',
        'The pipeline raises a SIGPIPE signal that kills the parent shell.'
      ],
      correct: 0,
      explanation: 'By default, a Bash pipeline\'s exit status is that of the LAST command. If \"failing_cmd\" exits with code 1 but \"wc -l\" exits with 0, $? is 0. \"set -o pipefail\" ensures the pipeline returns the rightmost non-zero exit code.'
    },
    {
      topic: 'systemd Timers vs. cron (Realtime & Monotonic)',
      difficulty: 'medium',
      q: 'What is a major operational advantage of systemd timers over traditional crontab entries for enterprise maintenance jobs?',
      options: [
        'Systemd timers offer integrated journald execution logging, failure dependencies (OnFailure), and sandboxing controls (ProtectSystem).',
        'Cron jobs can only run once per month, whereas systemd timers run continuously.',
        'Systemd timers do not require systemd to be installed on the Linux host.',
        'Cron cannot execute shell scripts written in Python or Bash.'
      ],
      correct: 0,
      explanation: 'systemd timers provide enterprise advantages: built-in execution logging in journalctl, catching up missed runs (Persistent=true), sandboxing, and execution failure alerts via OnFailure.'
    }
  ],

  // Module 5 Seeds
  5: [
    {
      topic: 'Access Tokens, UAC Filtered Tokens & Integrity Levels',
      difficulty: 'difficult',
      q: 'Under Windows User Account Control (UAC), an administrative user logging on interactively receives two access tokens. What are they?',
      options: [
        'A Filtered Standard Token (Medium Integrity, admin privileges stripped) and a linked Full Administrator Token (High Integrity, dormant until elevated).',
        'A local machine token and an Active Directory Kerberos token stored on the domain controller.',
        'A read-only NTFS token and a read-write registry token.',
        'A temporary guest token and a permanent supervisor token.'
      ],
      correct: 0,
      explanation: 'UAC generates a split token pair: the user operates daily with a restricted Medium-Integrity Filtered Token. The Full Administrator Token is activated only when elevated via a UAC consent prompt.'
    },
    {
      topic: 'Windows Registry Hives, Files & Persistence Keys',
      difficulty: 'medium',
      q: 'Which on-disk file in C:\\Windows\\System32\\config stores the registry hive HKEY_LOCAL_MACHINE\\SAM containing local user account credentials?',
      options: [
        'C:\\Windows\\System32\\config\\SAM',
        'C:\\Windows\\System32\\config\\SYSTEM',
        'C:\\Users\\Default\\NTUSER.DAT',
        'C:\\Windows\\System32\\winevt\\Logs\\Security.evtx'
      ],
      correct: 0,
      explanation: 'The HKLM\\SAM hive is backed on disk by C:\\Windows\\System32\\config\\SAM and is locked with exclusive kernel file handles to prevent unauthorized extraction.'
    }
  ],

  // Module 6 Seeds
  6: [
    {
      topic: 'Execution Safety (-WhatIf, -Confirm & SupportsShouldProcess)',
      difficulty: 'medium',
      q: 'In an advanced PowerShell function declared with [CmdletBinding(SupportsShouldProcess)], what happens when an administrator runs the command with the \"-WhatIf\" parameter?',
      options: [
        'The cmdlet evaluates validation and displays what actions would occur without making any actual modifications to the system.',
        'The cmdlet prompts the user with an interactive Yes/No confirmation dialog before executing each step.',
        'The cmdlet launches an isolated Virtual Machine sandbox to run the command in test mode.',
        'The cmdlet records the command into the Windows Security event log without executing it.'
      ],
      correct: 0,
      explanation: '-WhatIf simulates the execution: \$PSCmdlet.ShouldProcess() prints an informational message describing the intended change and safely bypasses destructive actions.'
    },
    {
      topic: 'Constrained Language Mode (CLM) & WDAC/AppLocker',
      difficulty: 'difficult',
      q: 'What is the security impact of placing PowerShell into Constrained Language Mode (CLM) via AppLocker or WDAC?',
      options: [
        'Direct .NET type manipulation, arbitrary C# compilation (Add-Type), and COM object creation are blocked, neutralizing memory injection techniques.',
        'PowerShell cmdlets are restricted to reading text files smaller than 1 megabyte.',
        'Scripts can only execute if the workstation is disconnected from the network.',
        'Users can no longer pipe objects between native PowerShell cmdlets.'
      ],
      correct: 0,
      explanation: 'CLM restricts PowerShell language features: unapproved scripts cannot instantiate arbitrary .NET types or call reflection APIs, neutralizing in-memory malware loaders.'
    }
  ],

  // Module 7 Seeds
  7: [
    {
      topic: 'High-Fidelity Security Event IDs (Logon Types 2/3/10)',
      difficulty: 'medium',
      q: 'Which Windows Security Event ID records that the security audit log was deliberately cleared by an administrator or threat actor?',
      options: [
        'Event ID 1102 (The audit log was cleared)',
        'Event ID 4624 (An account was successfully logged on)',
        'Event ID 4672 (Special privileges assigned to new logon)',
        'Event ID 7045 (A new service was installed in the system)'
      ],
      correct: 0,
      explanation: 'Event ID 1102 in the Security log records when the audit log is cleared. This is a critical high-priority alert for SOC analysts investigating defense evasion.'
    },
    {
      topic: 'Kerberos v5 Authentication (AS, TGS, AP Exchanges)',
      difficulty: 'difficult',
      q: 'In Kerberos authentication, what ticket does the Client receive from the Authentication Service (AS) exchange, and what does it grant?',
      options: [
        'A Ticket-Granting Ticket (TGT), which allows the client to request specific service tickets from the Ticket-Granting Service (TGS) without re-entering credentials.',
        'A Service Ticket (ST), which immediately decrypts files stored on the target SMB server.',
        'A digital certificate signed by the enterprise Public Key Infrastructure CA.',
        'A session token authorizing root shell access on all domain controllers.'
      ],
      correct: 0,
      explanation: 'During the initial AS exchange, the KDC issues a Ticket-Granting Ticket (TGT) encrypted with the KDC\'s krbtgt key. The client uses this TGT to obtain service tickets without exposing passwords.'
    }
  ],

  // Module 8 Seeds
  8: [
    {
      topic: 'Windows Attack Surface Reduction (ASR) Rules',
      difficulty: 'difficult',
      q: 'Which Microsoft Defender Attack Surface Reduction (ASR) rule protects against credential-dumping tools like Mimikatz?',
      options: [
        'Block credential stealing from the Windows Local Security Authority subsystem (lsass.exe)',
        'Block Office applications from creating child processes',
        'Block executable content from email client and webmail',
        'Block untrusted and unsigned processes that run from USB'
      ],
      correct: 0,
      explanation: 'The ASR rule \"Block credential stealing from the Windows Local Security Authority subsystem (lsass.exe)\" prevents untrusted processes from opening LSASS memory handles to steal credentials.'
    },
    {
      topic: 'Consensus Security Baselines (CIS Level 1 & 2, DISA STIG)',
      difficulty: 'medium',
      q: 'Which consensus security baseline provides essential baseline hardening controls that can be applied with minimal risk of breaking standard enterprise application functionality?',
      options: [
        'CIS Benchmark Level 1 Profile',
        'CIS Benchmark Level 2 Profile',
        'DISA STIG Military Lockdown Baseline',
        'NSA Extreme Zero-Trust Enclave Specification'
      ],
      correct: 0,
      explanation: 'CIS Level 1 profiles are designed to provide rapid, essential cybersecurity protection without severely inhibiting enterprise utility or requiring custom application modifications.'
    }
  ]
};
