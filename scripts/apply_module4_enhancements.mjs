import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module4.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 4.1 - Fig 1 (C03-M04-D28)
  {
    id: 'C03-M04-D28',
    caption: '*Figure C03-M04-D28: Step-by-step lifecycle of shell script execution: shebang parsing by kernel execve, environment variable inheritance, and exit code propagation.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Shebang Detection & Kernel execve:** Traces the initiation of script execution when a user or service invokes a binary path. The Linux kernel's \`execve\` system call reads the first two bytes of the file—the magic number \`0x23 0x21\` (ASCII \`#!\`). The kernel parses the remainder of the line to identify the absolute path to the designated interpreter (e.g., \`#!/bin/bash\` or \`#!/usr/bin/env bash\`) and passes the script file as an argument.
- **Fork-and-Exec Mechanics:** Illustrates process generation. The invoking shell executes \`fork()\` to duplicate the process table entry and resource limits into a child process PID, followed by \`execve()\` to replace the process address space with the fresh Bash execution environment.
- **Environment Variable Scoping & Inheritance:** Highlights the data boundary between shells. Exported variables (\`export VAR=value\`) pass into the child process's \`environ\` array, making them accessible to the script. Conversely, unexported local variables remain strictly scoped to the parent shell, preventing unintended credential leakage.
- **Termination & Exit Code Propagation:** Shows script termination via \`exit <status>\`. The Linux kernel releases allocated process resources, enters the zombie state, and transmits a \`SIGCHLD\` signal to the parent process. The parent harvests the numeric status code via \`waitpid()\`, populating the special shell variable \`$?\`.
- **Defensive Significance:** Emphasizes that failing to set an explicit interpreter via shebang forces the kernel to fall back to the system default shell (often \`/bin/sh\`), which can break Bash-specific security syntax and introduce execution divergences.`
  },

  // Lesson 4.1 - Fig 2 (C03-M04-D29)
  {
    id: 'C03-M04-D29',
    caption: '*Figure C03-M04-D29: Exit code taxonomy: standard 0-255 values, fatal signal encoding formula ($? = 128 + Signal), and conditional chaining (&&, ||).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Numeric Status Code Taxonomy (0–255):** Details the 8-bit unsigned integer return space in POSIX systems. Status code \`0\` uniquely signifies unconditional success (Truth in shell evaluation). Code \`1\` denotes general catchall application errors, \`2\` signifies misuse of shell builtins or syntax errors, \`126\` indicates an invocation target was found but lacks executable permissions, and \`127\` denotes "command not found" (a missing binary in \`$PATH\`).
- **Fatal Signal Encoding Formula:** Breaks down the high-order status range where processes terminate abnormally due to asynchronous OS signals:
  $$\\text{Exit Code} = 128 + \\text{Signal Number}$$
  Common operational signatures include \`130\` (\`128 + 2\`, SIGINT triggered by Ctrl+C), \`137\` (\`128 + 9\`, SIGKILL by the Linux OOM-killer or administrator), and \`143\` (\`128 + 15\`, SIGTERM graceful shutdown request).
- **Conditional Short-Circuit Chaining:** Visualizes boolean short-circuit evaluation operators:
  - **Logical AND (\`&&\`):** Evaluates the right-hand operand only if the left-hand command returns exit code \`0\`.
  - **Logical OR (\`||\`):** Evaluates the right-hand operand only if the left-hand command returns a non-zero exit code.
- **Defensive Scripting Invariant:** Demonstrates why administrators must avoid unhandled exit codes in automation pipelines; without explicit status checking, a failed preparatory step (such as mounting a backup drive) will silently fall through to subsequent destructive operations (such as purging older backups).`
  },

  // Lesson 4.2 - Fig 1 (C03-M04-F1)
  {
    id: 'C03-M04-F1',
    caption: '*Figure C03-M04-F1: Architecture of a production defensive script: strict error flags (set -euo pipefail), signal cleanup traps, input validation, and explicit exit codes.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Strict Mode Preamble (\`set -euo pipefail\`):** Establishes the defensive foundation in the script header:
  - \`set -e\`: Aborts execution immediately if any pipeline command returns a non-zero exit status, eliminating silent cascade failures.
  - \`set -u\`: Treats uninitialized or unbound variables as fatal errors, preventing catastrophic bugs such as \`rm -rf /tmp/$UNSET_VAR\` expanding to \`rm -rf /tmp/\` or \`rm -rf /\`.
  - \`set -o pipefail\`: Overrides default pipeline behavior. Instead of returning the exit status of the final command, the pipeline returns the exit code of the rightmost command that failed, preventing errors from being masked behind downstream utilities like \`grep\` or \`cat\`.
- **Signal Handling & Trap Cleanup Subsystem:** Visualizes the lifecycle trap: \`trap 'cleanup_handler' EXIT INT TERM HUP\`. Regardless of whether the script terminates normally, encounters an unexpected error, or receives an interrupt signal, the designated cleanup function executes reliably to unlink ephemeral sockets, drop locks, and remove temporary staging directories.
- **Defensive Input Validation Gate:** Shows incoming command-line arguments passed into rigorous validation guards (type-checking, regex boundaries, non-empty checks) before any operational logic executes.
- **Auditable Structured Output & Explicit Codes:** The architectural template routes informational messages to stdout and errors to stderr, concluding with unambiguous, explicit return codes (\`exit 0\` on verified completion vs \`exit 1\` on error).`
  },

  // Lesson 4.2 - Fig 2 (C03-M04-D30)
  {
    id: 'C03-M04-D30',
    caption: '*Figure C03-M04-D30: Race-condition and symlink-attack prevention using mktemp with umask 077 and atomic file replacement via mv.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Predictable Temporary File Vulnerability (Antipattern):** Illustrates an insecure script writing to static filenames in world-writable space (e.g., \`/tmp/backup_cache.txt\`). A local unprivileged attacker monitors the filesystem and instantiates a malicious pre-existing symbolic link pointing to \`/etc/shadow\`. When the elevated script executes, it follows the symlink and overwrites critical operating system credentials.
- **Secure Ephemeral Creation with mktemp:** Shows the remediation workflow utilizing \`mktemp -t script.XXXXXXXXXX\`. The utility automatically enforces a restrictive \`077\` umask, generates a cryptographically unpredictable 10-character alphanumeric suffix, and creates the file with exclusive creation flags (\`O_CREAT | O_EXCL\`) with \`0600\` permissions owned strictly by the executing user.
- **Atomic State Replacement with mv:** Depicts the update cycle for critical production configuration files. Instead of redirecting output directly into an active service file (which causes race conditions where downstream readers observe partially written, corrupted files), the script writes the complete payload to the secure temporary file and executes \`mv "$TMPFILE" "$TARGET_FILE"\`.
- **Kernel Inode Replacement Semantics:** Because \`mv\` maps to the POSIX \`rename()\` system call on the same filesystem mount, the target directory entry atomically points to the new inode in a single hardware cycle, guaranteeing that client processes observe either the old version or the complete new version—never an intermediate state.`
  },

  // Lesson 4.3 - Fig 1 (C03-M04-D31)
  {
    id: 'C03-M04-D31',
    caption: '*Figure C03-M04-D31: Diagnostic workflow combining bash -n dry-run syntax validation, bash -x execution tracing with $PS4 prompts, and line-level error isolation.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Static Pre-Flight Syntax Check (\`bash -n\`):** The diagnostic workflow initiates with dry-run parsing. Bash parses the complete Abstract Syntax Tree (AST) of the script, validating quote balancing, control structures (\`if...then...fi\`), and loop terminations without executing a single instruction. This catches fatal syntax errors in production maintenance scripts before any system commands run.
- **Dynamic Execution Tracing (\`bash -x\`):** Depicts runtime execution tracing. The shell prints every command to stderr after variable expansion, parameter substitution, and word splitting, but immediately prior to command execution. This reveals the exact literal strings passed to operating system binaries.
- **Customized Diagnostic Telemetry with $PS4:** Highlights the configuration of the fourth prompt variable:
  \`export PS4='+ [\${BASH_SOURCE}:\${LINENO}] \${FUNCNAME[0]:+\${FUNCNAME[0]}(): }'\`
  This transforms default single-plus traces into rich audit logs displaying the precise script source file, physical line number, and active call-stack function depth.
- **Line-Level Error Isolation:** Shows how pinpointing the exact failure point allows administrators to distinguish between script syntax failures, missing environmental dependencies, network socket timeouts, and authorization rejections.`
  },

  // Lesson 4.3 - Fig 2 (C03-M04-D32)
  {
    id: 'C03-M04-D32',
    caption: '*Figure C03-M04-D32: Common shell scripting security bugs detected by ShellCheck: unquoted variables (SC2086), globbing errors, and IFS word splitting.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Static Analysis Engine (ShellCheck):** Visualizes the automated code analysis pipeline. ShellCheck ingests raw shell source code and evaluates it against an extensive rulebase of Common Weakness Enumerations (CWEs) and POSIX compliance standards.
- **Unquoted Variable Vulnerability (SC2086):** Breaks down the most ubiquitous shell vulnerability: unquoted variable expansion (\`rm -rf $TARGET_DIR\`). If \`$TARGET_DIR\` contains whitespace (e.g., \`"my documents"\`), the shell's word-splitting phase decomposes the string into two distinct positional parameters: \`rm -rf my\` and \`rm -rf documents\`. If the variable is unset or contains paths like \`/ tmp/dir\`, catastrophic system deletion occurs.
- **Globbing & Metacharacter Injection:** Illustrates unexpected glob expansion. Passing unsanitized input containing asterisks (\`*\`) or question marks (\`?\`) triggers pathname expansion, causing commands to execute against unintended files matching the pattern.
- **Internal Field Separator (IFS) Exploitation:** Explains how non-standard IFS configurations alter word splitting across array definitions and read loops, corrupting structured string ingestion.
- **CI/CD Integration & Automated Defense:** Recommends integrating \`shellcheck -e SC... -S error\` into pre-commit git hooks and deployment pipelines to enforce strict coding hygiene across all enterprise infrastructure scripts.`
  },

  // Lesson 4.4 - Fig 1 (C03-M04-D33)
  {
    id: 'C03-M04-D33',
    caption: '*Figure C03-M04-D33: The 5-field cron time expression schema (* * * * *), system crontab locations (/etc/crontab, /etc/cron.d/), and user spools.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **The Five-Field Cron Time Schema:** Dissects the standard time-schedule string:
  $$\\text{Minute (0–59)} \\quad \\text{Hour (0–23)} \\quad \\text{Day of Month (1–31)} \\quad \\text{Month (1–12)} \\quad \\text{Day of Week (0–7)}$$
  (where both 0 and 7 represent Sunday). Special operators are mapped: \`*\` (every cycle), \`,\` (discrete value list), \`-\` (inclusive range), and \`/\` (step frequency, e.g., \`*/15\` for every 15 minutes).
- **System-Wide Crontab Architecture (\`/etc/crontab\` & \`/etc/cron.d/\`):** Highlights system scheduling directories. Unlike user crontabs, system configuration files introduce a mandatory 6th column: the target execution identity (e.g., \`root\`, \`backup\`, or \`www-data\`) followed by the command to execute.
- **User Crontab Spool (\`/var/spool/cron/crontabs/\`):** Illustrates individual user spools managed exclusively via the \`crontab -e\` interface. These files omit the user field, running commands implicitly under the privileges of the spool owner.
- **Periodic System Maintenance Links:** Shows how system daemons leverage \`/etc/cron.hourly/\`, \`cron.daily/\`, \`cron.weekly/\`, and \`cron.monthly/\`, where scripts are triggered sequentially by the \`run-parts\` script runner without requiring explicit timing strings.`
  },

  // Lesson 4.4 - Fig 2 (C03-M04-D34)
  {
    id: 'C03-M04-D34',
    caption: '*Figure C03-M04-D34: Privilege escalation vulnerabilities in cron jobs: minimal PATH environment, unquoted executable paths, and world-writable script files.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Minimal Environment & Relative Path Hijacking:** Illustrates how cron daemons execute jobs within a severely restricted environment (\`PATH=/usr/bin:/bin\`), ignoring interactive shell configurations (\`.bashrc\`, \`.profile\`). If a root-owned cron job references a bare binary (e.g., \`backup.sh\` instead of \`/usr/local/bin/backup.sh\`) or uses a relative path, an attacker can manipulate directory permissions or drop a malicious Trojan binary into a writable directory earlier in the search path.
- **World-Writable File & Directory Hijacking:** Depicts a high-severity privilege escalation flaw where a root cron job executes a script residing in a world-writable directory (e.g., \`/tmp\` or \`/opt/scripts\` with permissions \`0777\`). An unprivileged local user modifies the script contents to append an administrative reverse shell or create a Setuid root binary.
- **Wildcard Injection in Scheduled Jobs:** Highlights the danger of running commands like \`tar * -cf backup.tar\` inside cron. An attacker creates files named \`--checkpoint=1\` and \`--checkpoint-action=exec=sh exploit.sh\` in the working directory; when tar expands the wildcard, it interprets the filenames as command-line flags, executing arbitrary root commands.
- **Defensive Invariant:** System administrators must audit scheduled tasks using tools like \`pspy\` and enforce strict \`0750\` or \`0700\` permissions owned by root on all scripts and parent directories executed by cron.`
  },

  // Lesson 4.5 - Fig 1 (C03-M04-F2)
  {
    id: 'C03-M04-F2',
    caption: '*Figure C03-M04-F2: cron runs crontab lines with a minimal environment; systemd timers activate service units with built-in logging, sandboxing, and catch-up.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Traditional Cron Scheduling Model (Left Panel):** Depicts cron's monolithic architecture. Cron spawns jobs directly as child processes with static, unlogged environments. Output is captured only via local mail systems (\`/usr/sbin/sendmail\`) or redirected text files. If the host machine is powered off or sleeping during the scheduled time, the job is permanently missed with zero catch-up capability.
- **Modern systemd Timer Architecture (Right Panel):** Details the decoupled unit architecture. A \`.timer\` unit monitors timing criteria and, upon trigger, activates a corresponding \`.service\` unit via the internal D-Bus messaging bus.
- **Unified Telemetry with journald:** Systemd routes all stdout and stderr streams directly into \`systemd-journald\`, timestamping every line, capturing process exit codes, and indexing records for rapid querying via \`journalctl -u <service_name>\`.
- **Built-in Security Sandboxing:** Demonstrates how timer-activated services can be hardened using declarative systemd directives: \`ProtectSystem=strict\` (read-only OS filesystem), \`ProtectHome=true\` (inaccessible user data), \`NoNewPrivileges=true\` (neutralizing SUID binaries), and \`PrivateTmp=true\` (isolated temporary namespaces).
- **Persistent Catch-Up Execution:** Shows the \`Persistent=true\` directive: when active, systemd records the last execution timestamp on disk. If the machine was offline when a timer was due, systemd detects the missed interval upon system boot and immediately triggers the service.`
  },

  // Lesson 4.5 - Fig 2 (C03-M04-D35)
  {
    id: 'C03-M04-D35',
    caption: '*Figure C03-M04-D35: Architectural decoupling of timer triggers from execution logic, contrasting Realtime (OnCalendar) and Monotonic (OnBootSec, OnUnitActiveSec) clocks.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Decoupled Unit Pairing:** Shows the structural separation between the timer trigger unit (\`backup.timer\`) and the execution payload unit (\`backup.service\`). The timer defines *when* to execute, while the service defines *what* binaries, resource constraints, and security sandboxes apply.
- **Realtime (Wall-Clock) Clocks (\`OnCalendar\`):** Details absolute calendar-based scheduling (e.g., \`OnCalendar=*-*-* 03:00:00\` for daily execution at 3:00 AM UTC). Systemd synchronizes with network time protocol (NTP) clocks and schedules tasks relative to absolute wall-clock time, ideal for off-peak enterprise maintenance and report generation.
- **Monotonic (Relative) Clocks:** Highlights elapsed-time scheduling based on hardware monotonic timers that continuously increment without jumping:
  - \`OnBootSec=15min\`: Triggers execution exactly 15 minutes after kernel initialization.
  - \`OnUnitActiveSec=1h\`: Schedules subsequent executions exactly one hour after the associated service was last transitioned to active.
- **Preventing Execution Thundering Herds:** Monotonic timers ensure that if a backup or indexing job takes 45 minutes to complete, the next job will not queue up on top of it, naturally spacing execution cycles and preventing CPU/memory saturation.`
  },

  // Lesson 4.6 - Fig 1 (C03-M04-F3)
  {
    id: 'C03-M04-F3',
    caption: '*Figure C03-M04-F3: Systems monitoring as an active feedback loop: measuring metrics, comparing thresholds, recording telemetry, alerting teams, acting, and reviewing.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Continuous Six-Stage Monitoring Loop:** Depicts telemetry and observability as an active, closed-loop cybernetic system:
  1. **Measure Metrics:** Telemetry collectors and agents poll hardware counters, kernel metrics (\`/proc\`, \`/sys\`), and service health endpoints.
  2. **Compare Thresholds:** Evaluation engines compare live metrics against predefined service-level objectives (SLOs) and anomaly baselines.
  3. **Record Telemetry:** Time-series databases (e.g., Prometheus, InfluxDB) persist metric values with retention policies for trend analysis.
  4. **Alert Teams:** Notification routers evaluate alert grouping and deduplication, transmitting actionable pages to on-call engineers via Slack, PagerDuty, or SMS.
  5. **Remediation Action:** Incident responders or automated runbooks execute corrective actions (restarting crashed daemons, scaling instances, rerouting traffic).
  6. **Review & Tune:** Post-incident review updates threshold configurations and alert sensitivities to prevent alert fatigue and eliminate monitoring blind spots.
- **Defensive Significance:** Without an active feedback loop, infrastructure failures remain undetected until catastrophic denial-of-service occurs or malicious actors exhaust resources unmonitored.`
  },

  // Lesson 4.6 - Fig 2 (C03-M04-D36)
  {
    id: 'C03-M04-D36',
    caption: '*Figure C03-M04-D36: Interpretation of Linux performance telemetry: 1/5/15 minute load averages, memory swap paging metrics, and disk queue saturation.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Load Average Metric Interpretation:** Deconstructs the three exponential moving average load figures reported by \`uptime\` and \`top\` (1-minute, 5-minute, and 15-minute). In Linux, load average reflects both processes actively consuming CPU (in \`R\` state) and processes waiting on uninterruptible disk I/O (in \`D\` state). A load of 4.0 on a 4-core CPU represents 100% saturation; a 1-minute load significantly higher than the 15-minute load signals a rapid resource spike.
- **Memory & Swap Paging Dynamics (\`vmstat\`):** Analyzes memory metrics. The diagram highlights the critical distinction between passive swap allocation and active swap paging. Non-zero values in \`si\` (swap in) and \`so\` (swap out) indicate active memory thrashing, where the kernel spends excessive CPU cycles moving memory pages to disk, severely degrading system responsiveness.
- **Storage Subsystem Queue Saturation (\`iostat\`):** Visualizes disk I/O telemetry: \`%util\` (percentage of time the block device was busy), \`aqu-sz\` (average queue size of requests waiting in the device scheduler), and \`await\` (total time in milliseconds for I/O requests to be serviced). Sustained high queue size paired with \`%util\` near 100% indicates severe storage bottlenecks.
- **Defensive Implication:** System administrators must identify whether high load is CPU-bound, memory-bound, or I/O-bound to respond appropriately—such as distinguishing an algorithmic CPU loop from disk starvation caused by malicious ransomware encryption.`
  }
];

let matchCount = 0;
for (const update of updates) {
  if (!content.includes(update.caption)) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
  matchCount++;
}

console.log('Successfully matched and formatted ' + matchCount + ' figures in Module 4.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module4.js!');
