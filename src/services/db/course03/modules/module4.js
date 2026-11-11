/**
 * Course 03: Linux and Windows System Administration
 * Module 4: Linux Automation & Shell Scripting
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module4Data = {
  "id": "mod_c3_4",
  "title": "Module 4: Linux Automation & Shell Scripting",
  "description": "Industrial automation with Bash scripting: shebang declarations, strict error modes (set -euo pipefail), signal traps, safe temporary file handling, cron vs. systemd timer scheduling, and operational system health telemetry monitoring.",
  "order": 4,
  "quiz": {
    "id": "quiz_mod_c3_4",
    "title": "Module 4: Linux Automation & Shell Scripting Assessment",
    "pass_threshold": 80,
    "total_questions": 20,
    "questions": [
      {
        "id": "q_c3_m4_001",
        "topic": "Defensive Shell Scripting (set -euo pipefail)",
        "difficulty": "difficult",
        "q": "In a shell script without \"set -o pipefail\", what is the exit status ($?) of the pipeline: \"failing_cmd | grep pattern | wc -l\" if grep and wc succeed?",
        "options": [
          "0 (Success) — standard Bash pipelines report only the exit code of the final command, masking upstream errors.",
          "1 (Failure) — Bash automatically propagates the earliest non-zero exit code across the pipeline.",
          "127 (Command Not Found) — pipelines halt instantly upon any intermediate binary failure.",
          "The pipeline raises a SIGPIPE signal that kills the parent shell."
        ],
        "correct": 0,
        "explanation": "By default, a Bash pipeline's exit status is that of the LAST command. If \"failing_cmd\" exits with code 1 but \"wc -l\" exits with 0, $? is 0. \"set -o pipefail\" ensures the pipeline returns the rightmost non-zero exit code."
      },
      {
        "id": "q_c3_m4_002",
        "topic": "systemd Timers vs. cron (Realtime & Monotonic)",
        "difficulty": "medium",
        "q": "What is a major operational advantage of systemd timers over traditional crontab entries for enterprise maintenance jobs?",
        "options": [
          "Systemd timers offer integrated journald execution logging, failure dependencies (OnFailure), and sandboxing controls (ProtectSystem).",
          "Cron jobs can only run once per month, whereas systemd timers run continuously.",
          "Systemd timers do not require systemd to be installed on the Linux host.",
          "Cron cannot execute shell scripts written in Python or Bash."
        ],
        "correct": 0,
        "explanation": "systemd timers provide enterprise advantages: built-in execution logging in journalctl, catching up missed runs (Persistent=true), sandboxing, and execution failure alerts via OnFailure."
      },
      {
        "id": "q_c3_m4_003",
        "topic": "Defensive Shell Scripting (set -euo pipefail)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_004",
        "topic": "Signal Trapping & Cleanup Invariants",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_005",
        "topic": "Atomic File Operations & Secure mktemp",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_006",
        "topic": "Script Debugging & Live Tracing (set -x, $PS4)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_007",
        "topic": "ShellCheck Static Analysis & Common Anti-Patterns",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_008",
        "topic": "cron Spool Architecture & Security Pitfalls",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_009",
        "topic": "systemd Timers vs. cron (Realtime & Monotonic)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_010",
        "topic": "Continuous Systems Monitoring & Telemetry Metrics",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_011",
        "topic": "Shell Scripting Fundamentals & Shebang Parsing",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_012",
        "topic": "Subshells, Environment Inheritance & Exit Codes",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_013",
        "topic": "Defensive Shell Scripting (set -euo pipefail)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_014",
        "topic": "Signal Trapping & Cleanup Invariants",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_015",
        "topic": "Atomic File Operations & Secure mktemp",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_016",
        "topic": "Script Debugging & Live Tracing (set -x, $PS4)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_017",
        "topic": "ShellCheck Static Analysis & Common Anti-Patterns",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_018",
        "topic": "cron Spool Architecture & Security Pitfalls",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_019",
        "topic": "systemd Timers vs. cron (Realtime & Monotonic)",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      },
      {
        "id": "q_c3_m4_020",
        "topic": "Continuous Systems Monitoring & Telemetry Metrics",
        "difficulty": "medium",
        "q": "What is the architectural purpose of declaring 'set -euo pipefail' at the beginning of a production Bash automation script?",
        "options": [
          "Exits immediately if any command fails (-e), if any unset variable is referenced (-u), and preserves non-zero pipeline errors (-o pipefail).",
          "Enables asynchronous parallel execution of background subshells while suppressing standard error streams.",
          "Forces the script to run strictly in POSIX sh compatibility mode while ignoring bash builtins.",
          "Restricts filesystem operations to the current working directory using a temporary chroot jail."
        ],
        "correct": 0,
        "explanation": "Strict mode \"set -euo pipefail\" is essential in defensive scripting: -e exits on command failure, -u treats unset variables as fatal errors, and -o pipefail prevents pipeline masking."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c3_m4_l1",
      "title": "4.1 Shell Scripting Fundamentals: Shebangs, Subshells, Exit Codes & Variables",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Shebangs, Subshells, Exit Codes & Variables.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Shebangs, Subshells, Exit Codes & Variables.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l1_c03_m04_d28",
          "title": "C03-M04-D28: Bash Script Execution Lifecycle: Shebang, Fork, Environment & Exit Status",
          "url": "/assets/courses/cyber-03/c03_m04_l01_script_execution_lifecycle.png",
          "caption": "Figure C03-M04-D28: Step-by-step lifecycle of shell script execution: shebang parsing by kernel execve, environment variable inheritance, and exit code propagation.",
          "alt": "Flowchart showing kernel parsing shebang line, invoking interpreter, setting up environment, executing lines, and returning exit code"
        },
        {
          "id": "img_c3_m4_l1_c03_m04_d29",
          "title": "C03-M04-D29: Linux Exit Codes & Status Handling: Bitwise Signal Encoding ($? = 128 + N)",
          "url": "/assets/courses/cyber-03/c03_m04_l01_exit_codes_bitwise_signals.png",
          "caption": "Figure C03-M04-D29: Exit code taxonomy: standard 0-255 values, fatal signal encoding formula ($? = 128 + Signal), and conditional chaining (&&, ||).",
          "alt": "Diagram illustrating exit code conventions: 0 for success, 1-2 for general errors, 126-127 for command not found, and 128+N for signal termination"
        }
      ],
      "content": "## 4.1 Shell Scripting Fundamentals: Shebangs, Subshells, Exit Codes & Variables\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-D28: Bash Script Execution Lifecycle: Shebang, Fork, Environment & Exit Status](/assets/courses/cyber-03/c03_m04_l01_script_execution_lifecycle.png)\n\n*Figure C03-M04-D28: Step-by-step lifecycle of shell script execution: shebang parsing by kernel execve, environment variable inheritance, and exit code propagation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Shebang Detection & Kernel execve:** Traces the initiation of script execution when a user or service invokes a binary path. The Linux kernel's `execve` system call reads the first two bytes of the file—the magic number `0x23 0x21` (ASCII `#!`). The kernel parses the remainder of the line to identify the absolute path to the designated interpreter (e.g., `#!/bin/bash` or `#!/usr/bin/env bash`) and passes the script file as an argument.\n- **Fork-and-Exec Mechanics:** Illustrates process generation. The invoking shell executes `fork()` to duplicate the process table entry and resource limits into a child process PID, followed by `execve()` to replace the process address space with the fresh Bash execution environment.\n- **Environment Variable Scoping & Inheritance:** Highlights the data boundary between shells. Exported variables (`export VAR=value`) pass into the child process's `environ` array, making them accessible to the script. Conversely, unexported local variables remain strictly scoped to the parent shell, preventing unintended credential leakage.\n- **Termination & Exit Code Propagation:** Shows script termination via `exit <status>`. The Linux kernel releases allocated process resources, enters the zombie state, and transmits a `SIGCHLD` signal to the parent process. The parent harvests the numeric status code via `waitpid()`, populating the special shell variable `$?`.\n- **Defensive Significance:** Emphasizes that failing to set an explicit interpreter via shebang forces the kernel to fall back to the system default shell (often `/bin/sh`), which can break Bash-specific security syntax and introduce execution divergences.\n\n### 2.1.1 What a script is\n\nA shell script is a text file containing shell commands, run as a program.\nThe first line, the shebang, tells the kernel which interpreter to use:\n\n```bash\n#!/usr/bin/env bash    # find bash on PATH (portable across systems)\n#!/bin/sh              # POSIX shell (dash on Debian/Ubuntu; fewer features)\n```\n\nMake it executable with `chmod 755 script.sh` (or `700` if only the owner should run it) and run `./script.sh`, or run `bash script.sh` without execute permission.\n\n### 2.1.2 Variables and parameters\n\n```bash\nname=\"value\"           # assign (no spaces around =)\n\"$name\" / \"${name}\"    # use (quote it)\n$1, $2 ...             # positional arguments\n$#                     # number of arguments\n\"$@\"                   # all arguments, each kept separate (always quote)\n$?                     # exit status of the last command\n$$                     # PID of the script\n${1:-80}               # default value 80 if $1 is unset or empty\n${var:?message}        # abort with message if var is unset or empty\nreadonly NAME=...      # constant\n```\n\n### 2.1.3 Exit codes\n\nEvery command returns an exit status: 0 means success, non-zero means failure\n(conventionally 1 for general errors, 2 for usage errors). Scripts should\nreturn meaningful codes so schedulers and monitoring tools can react - the\ncourse's example script returns 0 (all good), 1 (threshold exceeded) and 2\n(invalid input).\n\n### 2.1.4 Conditions\n\n  if [[ -f \"$file\" ]]; then ... elif ...; else ...; fi\n  Test operators: -f file exists, -d directory, -r readable, -s non-empty,\n  -z \"$s\" empty string, -n \"$s\" non-empty, == and != (strings), =~ (regex,\n  bash [[ ]] only), and arithmetic with (( a >= b )).\n  case \"$x\" in start) ...;; stop) ...;; *) ...;; esac\n\n### 2.1.5 Loops\n\n  for f in /var/log/*.log; do echo \"$f\"; done\n  while read -r line; do ...; done < file\n  until ping -c1 -W1 host >/dev/null; do sleep 5; done\nAlways use read -r so backslashes in input are not interpreted.\n\n### 2.1.6 Functions\n\n  log() { echo \"$(date -Is) $*\"; }\nFunctions group logic, take arguments ($1...) and return status with return\nN. Use local for variables inside functions.\n\n### 2.1.7 Command substitution and process substitution\n\n  today=\"$(date +%F)\"            capture output\n  done < <(df -P | tail -n +2)   feed a command's output into a loop without\n                                 a pipe (so variables set inside the loop\n                                 survive - a pipe would run the loop in a\n                                 subshell)\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D29: Linux Exit Codes & Status Handling: Bitwise Signal Encoding ($? = 128 + N)](/assets/courses/cyber-03/c03_m04_l01_exit_codes_bitwise_signals.png)\n\n*Figure C03-M04-D29: Exit code taxonomy: standard 0-255 values, fatal signal encoding formula ($? = 128 + Signal), and conditional chaining (&&, ||).*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Numeric Status Code Taxonomy (0–255):** Details the 8-bit unsigned integer return space in POSIX systems. Status code `0` uniquely signifies unconditional success (Truth in shell evaluation). Code `1` denotes general catchall application errors, `2` signifies misuse of shell builtins or syntax errors, `126` indicates an invocation target was found but lacks executable permissions, and `127` denotes \"command not found\" (a missing binary in `$PATH`).\n- **Fatal Signal Encoding Formula:** Breaks down the high-order status range where processes terminate abnormally due to asynchronous OS signals:\n  $$\\text{Exit Code} = 128 + \\text{Signal Number}$$\n  Common operational signatures include `130` (`128 + 2`, SIGINT triggered by Ctrl+C), `137` (`128 + 9`, SIGKILL by the Linux OOM-killer or administrator), and `143` (`128 + 15`, SIGTERM graceful shutdown request).\n- **Conditional Short-Circuit Chaining:** Visualizes boolean short-circuit evaluation operators:\n  - **Logical AND (`&&`):** Evaluates the right-hand operand only if the left-hand command returns exit code `0`.\n  - **Logical OR (`||`):** Evaluates the right-hand operand only if the left-hand command returns a non-zero exit code.\n- **Defensive Scripting Invariant:** Demonstrates why administrators must avoid unhandled exit codes in automation pipelines; without explicit status checking, a failed preparatory step (such as mounting a backup drive) will silently fall through to subsequent destructive operations (such as purging older backups)."
    },
    {
      "id": "les_c3_m4_l2",
      "title": "4.2 Writing Safe Defensive Scripts: Error Flags, Signal Trapping & Atomic Files",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Error Flags, Signal Trapping & Atomic Files.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Error Flags, Signal Trapping & Atomic Files.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l2_c03_m04_f1",
          "title": "C03-M04-F1: Anatomy of a Safe Defensive Script: Strict Mode, Validation & Traps",
          "url": "/assets/courses/cyber-03/C03-M04-F1.png",
          "caption": "Figure C03-M04-F1: Architecture of a production defensive script: strict error flags (set -euo pipefail), signal cleanup traps, input validation, and explicit exit codes.",
          "alt": "Structural diagram breaking down a defensive Bash script: shebang, strict mode flags, signal trap handler, argument validation, core logic, and cleanup"
        },
        {
          "id": "img_c3_m4_l2_c03_m04_d30",
          "title": "C03-M04-D30: Atomic File Operations & Secure Temporary Files (mktemp & Umask 077)",
          "url": "/assets/courses/cyber-03/c03_m04_l02_atomic_files_mktemp.png",
          "caption": "Figure C03-M04-D30: Race-condition and symlink-attack prevention using mktemp with umask 077 and atomic file replacement via mv.",
          "alt": "Diagram illustrating insecure predictable temp files versus atomic creation with mktemp and mv to prevent symlink attacks"
        }
      ],
      "content": "## 4.2 Writing Safe Defensive Scripts: Error Flags, Signal Trapping & Atomic Files\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-F1: Anatomy of a Safe Defensive Script: Strict Mode, Validation & Traps](/assets/courses/cyber-03/C03-M04-F1.png)\n\n*Figure C03-M04-F1: Architecture of a production defensive script: strict error flags (set -euo pipefail), signal cleanup traps, input validation, and explicit exit codes.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Strict Mode Preamble (`set -euo pipefail`):** Establishes the defensive foundation in the script header:\n  - `set -e`: Aborts execution immediately if any pipeline command returns a non-zero exit status, eliminating silent cascade failures.\n  - `set -u`: Treats uninitialized or unbound variables as fatal errors, preventing catastrophic bugs such as `rm -rf /tmp/$UNSET_VAR` expanding to `rm -rf /tmp/` or `rm -rf /`.\n  - `set -o pipefail`: Overrides default pipeline behavior. Instead of returning the exit status of the final command, the pipeline returns the exit code of the rightmost command that failed, preventing errors from being masked behind downstream utilities like `grep` or `cat`.\n- **Signal Handling & Trap Cleanup Subsystem:** Visualizes the lifecycle trap: `trap 'cleanup_handler' EXIT INT TERM HUP`. Regardless of whether the script terminates normally, encounters an unexpected error, or receives an interrupt signal, the designated cleanup function executes reliably to unlink ephemeral sockets, drop locks, and remove temporary staging directories.\n- **Defensive Input Validation Gate:** Shows incoming command-line arguments passed into rigorous validation guards (type-checking, regex boundaries, non-empty checks) before any operational logic executes.\n- **Auditable Structured Output & Explicit Codes:** The architectural template routes informational messages to stdout and errors to stderr, concluding with unambiguous, explicit return codes (`exit 0` on verified completion vs `exit 1` on error).\n\n### 2.2.1 Strict mode\n\n- **set -e:** exit on the first unhandled failing command\n- **set -u:** treat unset variables as errors\n- **set -o pipefail:** a pipeline fails if any command in it fails (not only the last)\nTogether: set -euo pipefail. These options are documented in the Bash\nReference Manual's \"The Set Builtin\" section [C03-M04-R1]. They are not\nperfect - set -e has subtle exceptions inside conditions - but they turn many\nsilent failures into visible ones.\n\n### 2.2.2 Quoting and word splitting\n\nUnquoted variables are split on IFS (the internal field separator) and\nexpanded as globs. Quote \"$var\" and \"$@\". Some scripts set IFS=$'\\n\\t' to\navoid splitting on spaces - but this changes how read splits fields too, as\nthe bug in L03 shows.\n\n### 2.2.3 Validating input\n\nNever trust arguments, environment variables or file contents. Check type,\nrange and format before use:\n  if ! [[ \"$THRESHOLD\" =~ ^[0-9]+$ ]] || (( THRESHOLD < 1 || THRESHOLD > 99 )); then\n      echo \"usage: $0 [threshold 1-99]\" >&2; exit 2\n  fi\nValidation also prevents command injection when values are later used in\ncommands. Prefer arrays and quoted arguments over building command strings,\nand avoid eval.\n\n### 2.2.4 Least privilege for scripts\n\n- Run as the least-privileged user that works (the lab timer runs the\n    check as nobody).\n- Scripts run by root must be owned by root and not writable by others\n    (a writable root script is a direct privilege escalation path - the same\n    issue as the writable service binary in Module 1).\n- Use absolute paths for commands in privileged scripts, or set a safe\n    PATH at the top.\n- Create temporary files with mktemp, not predictable names in /tmp, and\n    remove them with a trap: tmp=$(mktemp); trap 'rm -f \"$tmp\"' EXIT\n\n### 2.2.5 Logging\n\nWrite results somewhere durable: logger -t TAG \"message\" sends to the\njournal/syslog, where it can be centrally collected. Include timestamps (date\n-Is gives ISO 8601) and enough context to act on.\n\n### 2.2.6 Secrets\n\nDo not hard-code passwords or API keys in scripts or pass them as arguments\n(visible in ps output and shell history). Use files with 600 permissions,\nenvironment files loaded by systemd (EnvironmentFile=), or a secrets manager\n(Course 12).\n\n### 2.2.7 Static analysis\n\nShellCheck is a widely used open-source linter that flags quoting errors,\nunsafe constructs and common bugs in shell scripts [C03-M04-R2]. (It was not\ninstalled on the content team's test system; install it from your\ndistribution's repository, for example apt install shellcheck.)\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D30: Atomic File Operations & Secure Temporary Files (mktemp & Umask 077)](/assets/courses/cyber-03/c03_m04_l02_atomic_files_mktemp.png)\n\n*Figure C03-M04-D30: Race-condition and symlink-attack prevention using mktemp with umask 077 and atomic file replacement via mv.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Predictable Temporary File Vulnerability (Antipattern):** Illustrates an insecure script writing to static filenames in world-writable space (e.g., `/tmp/backup_cache.txt`). A local unprivileged attacker monitors the filesystem and instantiates a malicious pre-existing symbolic link pointing to `/etc/shadow`. When the elevated script executes, it follows the symlink and overwrites critical operating system credentials.\n- **Secure Ephemeral Creation with mktemp:** Shows the remediation workflow utilizing `mktemp -t script.XXXXXXXXXX`. The utility automatically enforces a restrictive `077` umask, generates a cryptographically unpredictable 10-character alphanumeric suffix, and creates the file with exclusive creation flags (`O_CREAT | O_EXCL`) with `0600` permissions owned strictly by the executing user.\n- **Atomic State Replacement with mv:** Depicts the update cycle for critical production configuration files. Instead of redirecting output directly into an active service file (which causes race conditions where downstream readers observe partially written, corrupted files), the script writes the complete payload to the secure temporary file and executes `mv \"$TMPFILE\" \"$TARGET_FILE\"`.\n- **Kernel Inode Replacement Semantics:** Because `mv` maps to the POSIX `rename()` system call on the same filesystem mount, the target directory entry atomically points to the new inode in a single hardware cycle, guaranteeing that client processes observe either the old version or the complete new version—never an intermediate state."
    },
    {
      "id": "les_c3_m4_l3",
      "title": "4.3 Testing and Debugging Scripts: Tracing, Dry-Runs & ShellCheck Static Analysis",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Tracing, Dry-Runs & ShellCheck Static Analysis.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Tracing, Dry-Runs & ShellCheck Static Analysis.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l3_c03_m04_d31",
          "title": "C03-M04-D31: Script Debugging Workflows: Tracing (set -x), Subshell Traps & Error Pinpointing",
          "url": "/assets/courses/cyber-03/c03_m04_l03_debugging_tracing_workflow.png",
          "caption": "Figure C03-M04-D31: Diagnostic workflow combining bash -n dry-run syntax validation, bash -x execution tracing with $PS4 prompts, and line-level error isolation.",
          "alt": "Workflow diagram showing bash -n syntax checks, bash -x tracing with line numbers, and error trapping"
        },
        {
          "id": "img_c3_m4_l3_c03_m04_d32",
          "title": "C03-M04-D32: Static Script Analysis with ShellCheck: Common Anti-Patterns & Defenses",
          "url": "/assets/courses/cyber-03/c03_m04_l03_shellcheck_antipatterns.png",
          "caption": "Figure C03-M04-D32: Common shell scripting security bugs detected by ShellCheck: unquoted variables (SC2086), globbing errors, and IFS word splitting.",
          "alt": "Diagram detailing ShellCheck findings: unquoted variable expansion, command substitution pitfalls, and subshell variable scoping"
        }
      ],
      "content": "## 4.3 Testing and Debugging Scripts: Tracing, Dry-Runs & ShellCheck Static Analysis\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-D31: Script Debugging Workflows: Tracing (set -x), Subshell Traps & Error Pinpointing](/assets/courses/cyber-03/c03_m04_l03_debugging_tracing_workflow.png)\n\n*Figure C03-M04-D31: Diagnostic workflow combining bash -n dry-run syntax validation, bash -x execution tracing with $PS4 prompts, and line-level error isolation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Static Pre-Flight Syntax Check (`bash -n`):** The diagnostic workflow initiates with dry-run parsing. Bash parses the complete Abstract Syntax Tree (AST) of the script, validating quote balancing, control structures (`if...then...fi`), and loop terminations without executing a single instruction. This catches fatal syntax errors in production maintenance scripts before any system commands run.\n- **Dynamic Execution Tracing (`bash -x`):** Depicts runtime execution tracing. The shell prints every command to stderr after variable expansion, parameter substitution, and word splitting, but immediately prior to command execution. This reveals the exact literal strings passed to operating system binaries.\n- **Customized Diagnostic Telemetry with $PS4:** Highlights the configuration of the fourth prompt variable:\n  `export PS4='+ [${BASH_SOURCE}:${LINENO}] ${FUNCNAME[0]:+${FUNCNAME[0]}(): }'`\n  This transforms default single-plus traces into rich audit logs displaying the precise script source file, physical line number, and active call-stack function depth.\n- **Line-Level Error Isolation:** Shows how pinpointing the exact failure point allows administrators to distinguish between script syntax failures, missing environmental dependencies, network socket timeouts, and authorization rejections.\n\n### 2.3.1 Test deliberately\n\nFor every script, test: the normal case, the alert/failure case, invalid\ninput, missing dependencies, and what happens when run by an unprivileged\nuser. Record expected exit codes.\n\n### 2.3.2 Debugging tools\n\n- **bash -n script.sh:** syntax check without running\n- **bash -x script.sh:** trace each command as it executes\n  set -x / set +x        trace part of a script\n  echo \"debug: $var\" >&2 print diagnostics to standard error\n\n### 2.3.3 A real bug found by testing (execution-tested)\n\nThe course example script (LAB_ASSETS/C03/rk_disk_check.sh) first contained:\n\n```powershell\nIFS=$'\\n\\t'\n  ...\n  while read -r fs size used avail pct mount; do\n```\n\nThe first test run printed lines like \"ok  %\" with empty mount names and\npercentages. Cause: with IFS set to only newline and tab, read no longer\nsplit df's space-separated columns, so the whole line went into the first\nvariable and the others were empty. The fix sets IFS just for the read\ncommand:\n\n```bash\nwhile IFS=\" \" read -r fs size used avail pct mount; do\n```\n\nLessons: safety settings have side effects; and only a test that checks the\nactual output - not just \"did it run without error?\" - catches this kind of\nbug. The script exited 0 with wrong output, which is the worst kind of\nfailure.\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D32: Static Script Analysis with ShellCheck: Common Anti-Patterns & Defenses](/assets/courses/cyber-03/c03_m04_l03_shellcheck_antipatterns.png)\n\n*Figure C03-M04-D32: Common shell scripting security bugs detected by ShellCheck: unquoted variables (SC2086), globbing errors, and IFS word splitting.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Static Analysis Engine (ShellCheck):** Visualizes the automated code analysis pipeline. ShellCheck ingests raw shell source code and evaluates it against an extensive rulebase of Common Weakness Enumerations (CWEs) and POSIX compliance standards.\n- **Unquoted Variable Vulnerability (SC2086):** Breaks down the most ubiquitous shell vulnerability: unquoted variable expansion (`rm -rf $TARGET_DIR`). If `$TARGET_DIR` contains whitespace (e.g., `\"my documents\"`), the shell's word-splitting phase decomposes the string into two distinct positional parameters: `rm -rf my` and `rm -rf documents`. If the variable is unset or contains paths like `/ tmp/dir`, catastrophic system deletion occurs.\n- **Globbing & Metacharacter Injection:** Illustrates unexpected glob expansion. Passing unsanitized input containing asterisks (`*`) or question marks (`?`) triggers pathname expansion, causing commands to execute against unintended files matching the pattern.\n- **Internal Field Separator (IFS) Exploitation:** Explains how non-standard IFS configurations alter word splitting across array definitions and read loops, corrupting structured string ingestion.\n- **CI/CD Integration & Automated Defense:** Recommends integrating `shellcheck -e SC... -S error` into pre-commit git hooks and deployment pipelines to enforce strict coding hygiene across all enterprise infrastructure scripts."
    },
    {
      "id": "les_c3_m4_l4",
      "title": "4.4 Scheduling with cron: Spool Architectures, Syntax & Security Vulnerabilities",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Spool Architectures, Syntax & Security Vulnerabilities.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Spool Architectures, Syntax & Security Vulnerabilities.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l4_c03_m04_d33",
          "title": "C03-M04-D33: Cron Spool Architecture & Crontab Syntax: Minute, Hour, Day, Month, Weekday",
          "url": "/assets/courses/cyber-03/c03_m04_l04_cron_spool_syntax.png",
          "caption": "Figure C03-M04-D33: The 5-field cron time expression schema (* * * * *), system crontab locations (/etc/crontab, /etc/cron.d/), and user spools.",
          "alt": "Diagram breaking down the 5 fields of a crontab line: minute, hour, day of month, month, day of week, user, and command"
        },
        {
          "id": "img_c3_m4_l4_c03_m04_d34",
          "title": "C03-M04-D34: Cron Security Pitfalls: World-Writable Scripts, Environment Stripping & Symlinks",
          "url": "/assets/courses/cyber-03/c03_m04_l04_cron_security_pitfalls.png",
          "caption": "Figure C03-M04-D34: Privilege escalation vulnerabilities in cron jobs: minimal PATH environment, unquoted executable paths, and world-writable script files.",
          "alt": "Security diagram illustrating cron privilege escalation via writable scripts and PATH hijacking"
        }
      ],
      "content": "## 4.4 Scheduling with cron: Spool Architectures, Syntax & Security Vulnerabilities\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-D33: Cron Spool Architecture & Crontab Syntax: Minute, Hour, Day, Month, Weekday](/assets/courses/cyber-03/c03_m04_l04_cron_spool_syntax.png)\n\n*Figure C03-M04-D33: The 5-field cron time expression schema (* * * * *), system crontab locations (/etc/crontab, /etc/cron.d/), and user spools.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **The Five-Field Cron Time Schema:** Dissects the standard time-schedule string:\n  $$\\text{Minute (0–59)} \\quad \\text{Hour (0–23)} \\quad \\text{Day of Month (1–31)} \\quad \\text{Month (1–12)} \\quad \\text{Day of Week (0–7)}$$\n  (where both 0 and 7 represent Sunday). Special operators are mapped: `*` (every cycle), `,` (discrete value list), `-` (inclusive range), and `/` (step frequency, e.g., `*/15` for every 15 minutes).\n- **System-Wide Crontab Architecture (`/etc/crontab` & `/etc/cron.d/`):** Highlights system scheduling directories. Unlike user crontabs, system configuration files introduce a mandatory 6th column: the target execution identity (e.g., `root`, `backup`, or `www-data`) followed by the command to execute.\n- **User Crontab Spool (`/var/spool/cron/crontabs/`):** Illustrates individual user spools managed exclusively via the `crontab -e` interface. These files omit the user field, running commands implicitly under the privileges of the spool owner.\n- **Periodic System Maintenance Links:** Shows how system daemons leverage `/etc/cron.hourly/`, `cron.daily/`, `cron.weekly/`, and `cron.monthly/`, where scripts are triggered sequentially by the `run-parts` script runner without requiring explicit timing strings.\n\n### 2.4.1 How cron works\n\nThe cron daemon wakes every minute and runs jobs whose schedule matches.\nSchedules live in:\n- **User crontabs:** edited with crontab -e; listed with crontab -l; stored under /var/spool/cron/ (path varies).\n- **/etc/crontab and:** system jobs; these include a user field.\n  /etc/cron.d/\n  /etc/cron.hourly, .daily, .weekly, .monthly\n                       directories of scripts run by run-parts (via cron\n                       or anacron).\nThe crontab(5) manual page defines the format [C03-M04-R3].\n\n### 2.4.2 Schedule format\n\n  minute hour day-of-month month day-of-week  command\n  0 2 * * *        02:00 every day\n  */15 * * * *     every 15 minutes\n  30 6 * * 1-5     06:30 Monday to Friday\n  @reboot          once at start-up\nSpecify paths fully; cron runs with a minimal environment (short PATH, no\ninteractive shell settings).\n\n### 2.4.3 Execution-tested example\n\nInside the scheduling lab, a temporary user crontab entry was installed and\nremoved (the user had no crontab beforehand):\n\n```terminal\n* * * * * date -Is >> /tmp/rk_cron_demo.txt\n  waiting up to 70 seconds for one run...\n  2026-11-07T02:28:01+00:00\n  == cron entry removed: no crontab for mario\n```\n\nThe job ran at the start of the next minute (02:28:01), as expected.\n\n### 2.4.4 Output and failure notification\n\nCron emails a job's output to the owner if mail is configured; otherwise it\nis lost. Do not rely on that: redirect output to a log or use logger, and\nmonitor for missing runs. The GitLab case study shows what happens when\nfailure notifications silently stop.\n\n### 2.4.5 Access control\n\n/etc/cron.allow and /etc/cron.deny can restrict which users may use cron.\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D34: Cron Security Pitfalls: World-Writable Scripts, Environment Stripping & Symlinks](/assets/courses/cyber-03/c03_m04_l04_cron_security_pitfalls.png)\n\n*Figure C03-M04-D34: Privilege escalation vulnerabilities in cron jobs: minimal PATH environment, unquoted executable paths, and world-writable script files.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Minimal Environment & Relative Path Hijacking:** Illustrates how cron daemons execute jobs within a severely restricted environment (`PATH=/usr/bin:/bin`), ignoring interactive shell configurations (`.bashrc`, `.profile`). If a root-owned cron job references a bare binary (e.g., `backup.sh` instead of `/usr/local/bin/backup.sh`) or uses a relative path, an attacker can manipulate directory permissions or drop a malicious Trojan binary into a writable directory earlier in the search path.\n- **World-Writable File & Directory Hijacking:** Depicts a high-severity privilege escalation flaw where a root cron job executes a script residing in a world-writable directory (e.g., `/tmp` or `/opt/scripts` with permissions `0777`). An unprivileged local user modifies the script contents to append an administrative reverse shell or create a Setuid root binary.\n- **Wildcard Injection in Scheduled Jobs:** Highlights the danger of running commands like `tar * -cf backup.tar` inside cron. An attacker creates files named `--checkpoint=1` and `--checkpoint-action=exec=sh exploit.sh` in the working directory; when tar expands the wildcard, it interprets the filenames as command-line flags, executing arbitrary root commands.\n- **Defensive Invariant:** System administrators must audit scheduled tasks using tools like `pspy` and enforce strict `0750` or `0700` permissions owned by root on all scripts and parent directories executed by cron."
    },
    {
      "id": "les_c3_m4_l5",
      "title": "4.5 Modern Scheduling with systemd Timers: Unit Synchronization & Monotonic Delays",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Unit Synchronization & Monotonic Delays.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Unit Synchronization & Monotonic Delays.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l5_c03_m04_f2",
          "title": "C03-M04-F2: cron versus systemd Timers: Unit Synchronization, Logging & Sandboxing",
          "url": "/assets/courses/cyber-03/C03-M04-F2.png",
          "caption": "Figure C03-M04-F2: cron runs crontab lines with a minimal environment; systemd timers activate service units with built-in logging, sandboxing, and catch-up.",
          "alt": "Comparison diagram of cron versus systemd timers showing unit synchronization, journald logging, and sandbox isolation"
        },
        {
          "id": "img_c3_m4_l5_c03_m04_d35",
          "title": "C03-M04-D35: systemd Timer Pair Architecture: Monotonic vs. Realtime Clock Triggers",
          "url": "/assets/courses/cyber-03/c03_m04_l05_timer_pair_monotonic_realtime.png",
          "caption": "Figure C03-M04-D35: Architectural decoupling of timer triggers from execution logic, contrasting Realtime (OnCalendar) and Monotonic (OnBootSec, OnUnitActiveSec) clocks.",
          "alt": "Diagram showing systemd timer pair architecture with OnCalendar wall-clock triggers and OnBootSec monotonic timers"
        }
      ],
      "content": "## 4.5 Modern Scheduling with systemd Timers: Unit Synchronization & Monotonic Delays\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-F2: cron versus systemd Timers: Unit Synchronization, Logging & Sandboxing](/assets/courses/cyber-03/C03-M04-F2.png)\n\n*Figure C03-M04-F2: cron runs crontab lines with a minimal environment; systemd timers activate service units with built-in logging, sandboxing, and catch-up.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Traditional Cron Scheduling Model (Left Panel):** Depicts cron's monolithic architecture. Cron spawns jobs directly as child processes with static, unlogged environments. Output is captured only via local mail systems (`/usr/sbin/sendmail`) or redirected text files. If the host machine is powered off or sleeping during the scheduled time, the job is permanently missed with zero catch-up capability.\n- **Modern systemd Timer Architecture (Right Panel):** Details the decoupled unit architecture. A `.timer` unit monitors timing criteria and, upon trigger, activates a corresponding `.service` unit via the internal D-Bus messaging bus.\n- **Unified Telemetry with journald:** Systemd routes all stdout and stderr streams directly into `systemd-journald`, timestamping every line, capturing process exit codes, and indexing records for rapid querying via `journalctl -u <service_name>`.\n- **Built-in Security Sandboxing:** Demonstrates how timer-activated services can be hardened using declarative systemd directives: `ProtectSystem=strict` (read-only OS filesystem), `ProtectHome=true` (inaccessible user data), `NoNewPrivileges=true` (neutralizing SUID binaries), and `PrivateTmp=true` (isolated temporary namespaces).\n- **Persistent Catch-Up Execution:** Shows the `Persistent=true` directive: when active, systemd records the last execution timestamp on disk. If the machine was offline when a timer was due, systemd detects the missed interval upon system boot and immediately triggers the service.\n\n### 2.5.1 Concept\n\nA systemd timer (.timer unit) activates a matching service (.service unit)\non a schedule [C03-M04-R4]. Advantages over cron: logs in the journal\nautomatically, dependency handling, resource limits and sandboxing from the\nservice unit, Persistent=true to run missed jobs after downtime, and\nrandomised delays.\n\n### 2.5.2 Example units (execution-tested; LAB_ASSETS/C03/rk_c03_scheduling_lab.sh)\n\n```bash\n# /etc/systemd/system/rk-disk-check.service\n  [Unit]\n  Description=RedKross disk usage check (course lab)\n\n  [Service]\n  Type=oneshot\n  ExecStart=/usr/local/bin/rk_disk_check.sh 90\n  User=nobody\n  SuccessExitStatus=0 1\n\n  # /etc/systemd/system/rk-disk-check.timer\n  [Unit]\n  Description=Run RedKross disk check every 15 minutes (course lab)\n\n  [Timer]\n  OnCalendar=*:0/15\n  Persistent=true\n\n  [Install]\n  WantedBy=timers.target\n```\n\nLine by line:\n- **Type=oneshot:** The service runs to completion and exits.\n- **ExecStart=... 90:** Run the check with a 90% threshold.\n- **User=nobody:** Least privilege: no root needed to read usage.\n- **SuccessExitStatus=0 1:** Treat \"threshold exceeded\" (exit 1) as a normal result rather than a unit failure; alerting is done through the log message instead. (A design choice — you could instead let exit 1 mark the unit failed and alert on failed units.)\n- **OnCalendar=*:0/15:** Every 15 minutes (minute 0, 15, 30, 45).\n- **Persistent=true:** If the machine was off at a scheduled time, run once at the next boot.\n\n### 2.5.3 Observed results (exact)\n\n```terminal\n== timer\n  NEXT                        LEFT     LAST PASSED UNIT                ACTIVATES\n  Sat 2026-11-07 02:30:00 GMT 2min 18s -    -      rk-disk-check.timer rk-disk-check.service\n  == calendar check\n    Original form: *:0/15\n  Normalized form: *-*-* *:00/15:00\n      Next elapse: Sat 2026-11-07 02:30:00 GMT\n  == trigger one run now\n  2026-11-07T02:27:41+00:00 memory available 6840 MiB\n  2026-11-07T02:27:41+00:00 result: 2 file system(s) over threshold\n  rk-disk-check.service: Deactivated successfully.\n  Finished rk-disk-check.service - RedKross disk usage check (course lab).\n```\n\n  (spacing of the timer table compressed)\n\n- **systemctl list-timers:** shows next and last run times.\n- **systemd-analyze calendar:** validates and normalises an OnCalendar expression - test schedules before deploying.\n  The journal captured the script's output and systemd's own messages.\n\n### 2.5.4 Auditing schedules (defender's checklist)\n\nBecause attackers may add scheduled tasks for persistence (MITRE ATT&CK\ntechnique T1053 Scheduled Task/Job [C03-M04-R5]), administrators should\nregularly review:\n- **User & System Crontabs:** Audit crontab -l for each user (as root: crontab -u USER -l), /etc/crontab, /etc/cron.d/, and /etc/cron.* directories.\n- **systemd Timers & Unit Files:** Inspect systemctl list-timers --all and unit files in /etc/systemd/system and ~/.config/systemd/user.\n- **Queued at Jobs:** Check at jobs via atq, if the at daemon service is installed.\nCompare with an approved baseline and monitor changes with file integrity\nmonitoring (Course 04 Module 7).\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D35: systemd Timer Pair Architecture: Monotonic vs. Realtime Clock Triggers](/assets/courses/cyber-03/c03_m04_l05_timer_pair_monotonic_realtime.png)\n\n*Figure C03-M04-D35: Architectural decoupling of timer triggers from execution logic, contrasting Realtime (OnCalendar) and Monotonic (OnBootSec, OnUnitActiveSec) clocks.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Decoupled Unit Pairing:** Shows the structural separation between the timer trigger unit (`backup.timer`) and the execution payload unit (`backup.service`). The timer defines *when* to execute, while the service defines *what* binaries, resource constraints, and security sandboxes apply.\n- **Realtime (Wall-Clock) Clocks (`OnCalendar`):** Details absolute calendar-based scheduling (e.g., `OnCalendar=*-*-* 03:00:00` for daily execution at 3:00 AM UTC). Systemd synchronizes with network time protocol (NTP) clocks and schedules tasks relative to absolute wall-clock time, ideal for off-peak enterprise maintenance and report generation.\n- **Monotonic (Relative) Clocks:** Highlights elapsed-time scheduling based on hardware monotonic timers that continuously increment without jumping:\n  - `OnBootSec=15min`: Triggers execution exactly 15 minutes after kernel initialization.\n  - `OnUnitActiveSec=1h`: Schedules subsequent executions exactly one hour after the associated service was last transitioned to active.\n- **Preventing Execution Thundering Herds:** Monotonic timers ensure that if a backup or indexing job takes 45 minutes to complete, the next job will not queue up on top of it, naturally spacing execution cycles and preventing CPU/memory saturation."
    },
    {
      "id": "les_c3_m4_l6",
      "title": "4.6 System Monitoring: Resource Telemetry (top, vmstat, iostat) & Alerting Rules",
      "duration": "60 mins",
      "is_mandatory": true,
      "summary": "In-depth technical mastery of Resource Telemetry (top, vmstat, iostat) & Alerting Rules.",
      "learning_objectives": [
        "Master foundational architecture and operational mechanisms of Resource Telemetry (top, vmstat, iostat) & Alerting Rules.",
        "Inspect runtime telemetry and configuration parameters from live terminal sessions.",
        "Diagnose vulnerabilities, misconfigurations, and privilege escalation pathways.",
        "Apply hardened defensive baselines and verify mitigation efficacy."
      ],
      "images": [
        {
          "id": "img_c3_m4_l6_c03_m04_f3",
          "title": "C03-M04-F3: Monitoring Signal Flow: Measure, Compare, Record, Alert, Act & Review",
          "url": "/assets/courses/cyber-03/C03-M04-F3.png",
          "caption": "Figure C03-M04-F3: Systems monitoring as an active feedback loop: measuring metrics, comparing thresholds, recording telemetry, alerting teams, acting, and reviewing.",
          "alt": "Cyclical diagram of monitoring signal flow: measuring system metrics, comparing thresholds, recording data, alerting, acting, and post-incident review"
        },
        {
          "id": "img_c3_m4_l6_c03_m04_d36",
          "title": "C03-M04-D36: Linux Performance Telemetry: CPU Load Average, Memory Paging & Disk I/O Queues",
          "url": "/assets/courses/cyber-03/c03_m04_l06_performance_telemetry_metrics.png",
          "caption": "Figure C03-M04-D36: Interpretation of Linux performance telemetry: 1/5/15 minute load averages, memory swap paging metrics, and disk queue saturation.",
          "alt": "Dashboard diagram dissecting Linux performance metrics from uptime, top, vmstat, and iostat"
        }
      ],
      "content": "## 4.6 System Monitoring: Resource Telemetry (top, vmstat, iostat) & Alerting Rules\n\nOperating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\nConversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n![C03-M04-F3: Monitoring Signal Flow: Measure, Compare, Record, Alert, Act & Review](/assets/courses/cyber-03/C03-M04-F3.png)\n\n*Figure C03-M04-F3: Systems monitoring as an active feedback loop: measuring metrics, comparing thresholds, recording telemetry, alerting teams, acting, and reviewing.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Continuous Six-Stage Monitoring Loop:** Depicts telemetry and observability as an active, closed-loop cybernetic system:\n  1. **Measure Metrics:** Telemetry collectors and agents poll hardware counters, kernel metrics (`/proc`, `/sys`), and service health endpoints.\n  2. **Compare Thresholds:** Evaluation engines compare live metrics against predefined service-level objectives (SLOs) and anomaly baselines.\n  3. **Record Telemetry:** Time-series databases (e.g., Prometheus, InfluxDB) persist metric values with retention policies for trend analysis.\n  4. **Alert Teams:** Notification routers evaluate alert grouping and deduplication, transmitting actionable pages to on-call engineers via Slack, PagerDuty, or SMS.\n  5. **Remediation Action:** Incident responders or automated runbooks execute corrective actions (restarting crashed daemons, scaling instances, rerouting traffic).\n  6. **Review & Tune:** Post-incident review updates threshold configurations and alert sensitivities to prevent alert fatigue and eliminate monitoring blind spots.\n- **Defensive Significance:** Without an active feedback loop, infrastructure failures remain undetected until catastrophic denial-of-service occurs or malicious actors exhaust resources unmonitored.\n\n### 2.6.1 Load and uptime (execution-tested)\n\n  uptime -> 02:29:01 up 1:34, 2 users, load average: 0.00, 0.01, 0.01\nLoad average is the average number of processes running or waiting to run\n(and, on Linux, in uninterruptible I/O wait) over 1, 5 and 15 minutes.\nCompare it with the number of CPU cores (nproc): sustained load above the\ncore count means work is queuing.\n\n### 2.6.2 top (execution-tested, batch mode)\n\n  top -b -n 1 | head -7\n  Tasks:  39 total,   1 running,  38 sleeping,   0 stopped,   0 zombie\n  %Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa, ...\n  MiB Mem :   7784.1 total,   6573.1 free,    883.4 used,    524.3 buff/cache\nCPU fields: us user, sy system (kernel), ni niced, id idle, wa waiting for\nI/O, st stolen by the hypervisor. High wa suggests disk bottlenecks; high sy\ncan indicate heavy system-call activity. Interactive top sorts by CPU; press\nM to sort by memory, q to quit. htop is a friendlier alternative.\n\n### 2.6.3 vmstat (execution-tested)\n\n```terminal\nprocs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------\n   r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu\n   1  0      0 6733300   5828 531312    0    0   495   479  935    0  0  0 100  0  0  0\n   0  0      0 6734412   5828 532280    0    0     0     0  218  305  0  0 100  0  0  0\n```\n\nvmstat 1 2 prints two samples one second apart; the first line is an average\nsince boot, so read the second. r = runnable processes, b = blocked; si/so =\nswap in/out (non-zero values under load mean memory pressure); bi/bo = blocks\nread/written.\n\n### 2.6.4 Processes and memory\n\n  ps -eo pid,user,%cpu,%mem,comm --sort=-%mem | head   top memory users\n- **free -h:** memory summary (M1)\nOn the test system the top memory users were unattended-upgrades,\nnetworkd-dispatcher and squid - each a service worth knowing about.\n\n### 2.6.5 Disk\n\n- **df -h:** space per file system (the example script uses df -P for stable, parseable output)\n- **du -sh dir:** space used by a directory\n- **iostat -x:** per-device I/O statistics (sysstat package; not installed on the test system)\nFull disks stop logging and databases - itself a security problem, because\nevidence is lost.\n\n### 2.6.6 From observation to alerting\n\nIndividual commands answer \"what is happening now?\"; operations need\ncontinuous monitoring: agents (for example node exporters, endpoint agents)\ncollecting metrics, thresholds and anomaly detection, alerts routed to\npeople, and dashboards. The example script shows the core pattern: measure,\ncompare with a threshold, log, return a status. Course 08 builds on this with\ncentral log and alert pipelines.\n\n## 3. TECHNICAL DEEP DIVE: THE MONITORING SCRIPT, LINE BY LINE\n\n3.1 Script and status\nLAB_ASSETS/C03/rk_disk_check.sh. Execution-tested on Ubuntu 26.04 LTS (WSL2),\nbash 5.3.9, with the test harness LAB_ASSETS/C03/rk_c03_script_tests.sh.\n\n```powershell\n#!/usr/bin/env bash\n  set -euo pipefail\n  IFS=$'\\n\\t'\n\n  readonly THRESHOLD=\"${1:-80}\"\n  readonly LOG_TAG=\"rk-disk-check\"\n\n  if ! [[ \"$THRESHOLD\" =~ ^[0-9]+$ ]] || (( THRESHOLD < 1 || THRESHOLD > 99 )); then\n      echo \"usage: $0 [threshold 1-99]\" >&2\n      exit 2\n  fi\n\n  log() {\n      echo \"$(date -Is) $*\"\n      logger -t \"$LOG_TAG\" -- \"$*\" 2>/dev/null || true\n  }\n\n  alerts=0\n  while IFS=\" \" read -r fs size used avail pct mount; do\n      use=\"${pct%\\%}\"\n      if (( use >= THRESHOLD )); then\n          log \"ALERT ${mount} at ${use}% (threshold ${THRESHOLD}%) on ${fs}\"\n          alerts=$((alerts + 1))\n      else\n          log \"ok ${mount} ${use}%\"\n      fi\n  done < <(df -P -x tmpfs -x devtmpfs -x overlay -x squashfs | tail -n +2)\n\n  mem_avail_kb=$(awk '/^MemAvailable:/ {print $2}' /proc/meminfo)\n  log \"memory available $(( mem_avail_kb / 1024 )) MiB\"\n\n  if (( alerts > 0 )); then\n      log \"result: ${alerts} file system(s) over threshold\"\n      exit 1\n  fi\n  log \"result: all file systems below ${THRESHOLD}%\"\n```\n\n### 3.1 Explanation\n\n- **set -euo pipefail:** Strict mode (L02).\n- **IFS Configuration:** `IFS=$'\\n\\t'` provides safer splitting for the rest of the script; `read` overrides it locally (the L03 bug fix).\n- **Threshold Parameter:** `\"${1:-80}\"` sets the default threshold to 80.\n- **Input Validation:** `[[ =~ ^[0-9]+$ ]]` and `(( ))` validate digits and range; exit 2 on bad input with a message on standard error (`>&2`).\n- **log() Function:** Prints with an ISO timestamp and sends to the journal via `logger`; `\"|| true\"` prevents a missing logger from aborting the script under `set -e`.\n- **df -P -x ...:** POSIX-format output, excluding pseudo file systems (`tmpfs`, `overlay`, and so on) that are not real disks.\n- **tail -n +2:** Skips the header line.\n- **Process Substitution:** `< <( ... )` process substitution so `alerts=...` survives the loop.\n- **Parameter Expansion:** `\"${pct%\\%}\"` removes the trailing `%` sign.\n- **awk Telemetry Extraction:** `awk '/^MemAvailable:/'` extracts available memory from `/proc/meminfo` (Module 1).\n- **Meaningful Exit Codes:** `exit 1` / normal end indicate health status.\n\n3.2 Test results (exact, hostname shown as rk-host)\n\n```terminal\n== default threshold 80\n  2026-11-07T02:27:04+00:00 ok /mnt/wsl/docker-desktop/docker-desktop-user-distro 57%\n  2026-11-07T02:27:04+00:00 ALERT /mnt/wsl/docker-desktop/cli-tools at 100% (threshold 80%) on /dev/loop0\n  2026-11-07T02:27:04+00:00 ALERT /usr/lib/wsl/drivers at 82% (threshold 80%) on drivers\n  2026-11-07T02:27:04+00:00 ok / 1%\n  2026-11-07T02:27:04+00:00 ALERT /mnt/c at 82% (threshold 80%) on C:\\\n  2026-11-07T02:27:04+00:00 ALERT /mnt/d at 92% (threshold 80%) on D:\\\n  2026-11-07T02:27:04+00:00 memory available 6853 MiB\n  2026-11-07T02:27:04+00:00 result: 4 file system(s) over threshold\n  exit=1\n  == invalid input\n  exit=2\n  == journal entries\n  2026-11-07T02:27:04+00:00 rk-host rk-disk-check[562]: result: 7 file system(s) over threshold\n```\n\n  (selected lines; the threshold-1 test produced 7 alerts and exit 1; the\n  invalid-input test printed the usage message to standard error)\n\n3.3 Interpreting the results - and improving the script\n- The script correctly exited 1 when thresholds were exceeded and 2 for\n    invalid input.\n- On WSL2, df also shows Windows drives (/mnt/c, /mnt/d) and a read-only\n    Docker tools image at 100%. A read-only image being \"full\" is normal, so\n    a production version should exclude such mounts (for example with a\n    configurable exclude list) - otherwise the check raises alerts nobody\n    can act on, which trains people to ignore alerts (alert fatigue, Course\n    08).\n- Improvement ideas for the practical: add an exclude list, a separate\n    warning and critical threshold, and inode usage (df -i).\n\n## 4. REAL-WORLD CASE STUDIES\n\n### CASE STUDY C03-M04-CS1: GitLab.com database outage, 31 January 2017 - automation that failed silently\nContext: GitLab.com is a large hosted code platform. GitLab published a\ndetailed postmortem on 10 February 2017 [C03-M04-R6].\n\nWhat happened: according to the postmortem, while repairing database\nreplication, an engineer intended to remove the data directory on the\nsecondary database server but ran the command on the primary. About 300 GB\nof production data was removed before the command was stopped.\n\nWhy recovery was hard - the automation lessons:\n- Scheduled pg_dump backups had been failing because the job used\n    PostgreSQL 9.2 tools against a 9.6 database; the storage bucket for the\n    dumps was empty.\n- Cron failure emails that should have revealed this were rejected by the\n    receiving mail server because DMARC was not configured for them, so\n    nobody knew the backups had stopped (compare Course 01 Module 3 on DMARC).\n- Other mechanisms (disk snapshots) were not enabled for the database\n    servers; GitLab restored from a snapshot taken about six hours earlier,\n    and copying it took about 18 hours.\n\nImpact: GitLab.com was down for about 18 hours and lost database records\ncreated in roughly a six-hour window, estimated at least 5,000 projects,\n5,000 comments and about 700 user accounts; Git repositories and wikis were\nnot affected.\n\nImprovements GitLab listed: give backup and restore procedures an owner,\nmonitor them, test recovery automatically, publish backup status, and make\nthe host being operated on clearly visible.\n\nLessons for this module:\n- A scheduled job that \"runs\" is not a job that works; monitor outcomes.\n- Failure notification paths need testing too.\n- Scripts and commands that destroy data should show and confirm the\n    target host and path.\n\n### CASE STUDY C03-M04-CS2 (FICTIONAL TEACHING SCENARIO): The cron job nobody added\nThis scenario is fictional.\n\nContext: during a quarterly review at Lotus Logistics (fictional), an\nadministrator compared /etc/cron.d against the documented baseline.\n\nFinding: an unfamiliar file, /etc/cron.d/sys-update, ran a script from\n/var/tmp every ten minutes as root. No change ticket existed.\n\nResponse: the team preserved the file and script with hashes and timestamps,\nchecked package ownership (none), reviewed auth logs for root sessions\naround the file's creation time, isolated the server and escalated to\nincident response.\n\nLessons: scheduled tasks are a persistence mechanism (ATT&CK T1053);\nregular baseline comparison and file integrity monitoring of cron and\nsystemd directories detect them; never simply delete such files before\npreserving evidence (Course 09).\n\n## 5. PRACTICAL LEARNING\n\n### Technical Mathematical Specification: Process Exit Status Masking & Signal Arithmetic\n\nIn defensive automation, process exit statuses returned by the `wait()` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n\n\n![C03-M04-D36: Linux Performance Telemetry: CPU Load Average, Memory Paging & Disk I/O Queues](/assets/courses/cyber-03/c03_m04_l06_performance_telemetry_metrics.png)\n\n*Figure C03-M04-D36: Interpretation of Linux performance telemetry: 1/5/15 minute load averages, memory swap paging metrics, and disk queue saturation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Load Average Metric Interpretation:** Deconstructs the three exponential moving average load figures reported by `uptime` and `top` (1-minute, 5-minute, and 15-minute). In Linux, load average reflects both processes actively consuming CPU (in `R` state) and processes waiting on uninterruptible disk I/O (in `D` state). A load of 4.0 on a 4-core CPU represents 100% saturation; a 1-minute load significantly higher than the 15-minute load signals a rapid resource spike.\n- **Memory & Swap Paging Dynamics (`vmstat`):** Analyzes memory metrics. The diagram highlights the critical distinction between passive swap allocation and active swap paging. Non-zero values in `si` (swap in) and `so` (swap out) indicate active memory thrashing, where the kernel spends excessive CPU cycles moving memory pages to disk, severely degrading system responsiveness.\n- **Storage Subsystem Queue Saturation (`iostat`):** Visualizes disk I/O telemetry: `%util` (percentage of time the block device was busy), `aqu-sz` (average queue size of requests waiting in the device scheduler), and `await` (total time in milliseconds for I/O requests to be serviced). Sustained high queue size paired with `%util` near 100% indicates severe storage bottlenecks.\n- **Defensive Implication:** System administrators must identify whether high load is CPU-bound, memory-bound, or I/O-bound to respond appropriately—such as distinguishing an algorithmic CPU loop from disk starvation caused by malicious ransomware encryption."
    }
  ]
};
