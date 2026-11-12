/**
 * Course 04: Python for Cybersecurity — Module 4 Data
 * Module ID: mod_c4_4 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module4Data = {
  "id": "mod_c4_4",
  "title": "Module 4: Operating System Automation",
  "description": "Automate host inspection and evidence collection safely across Windows and Linux via os, platform, pathlib.rglob, and shutil; stop CWE-22 path traversal via resolve().is_relative_to(); eliminate CWE-78 OS command injection by replacing shell=True with argument lists, timeouts, and allowlists; and schedule resilient least-privilege tasks across Task Scheduler, cron, and systemd timers.",
  "order": 4,
  "quiz": {
    "id": "quiz_mod_c4_4",
    "title": "Module 4: Operating System Automation Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
      {
        "id": "q_c4_m4_001",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "medium",
        "q": "In `m04_os_automation.py`, which standard library attribute holds the absolute path to the currently running Python interpreter binary?",
        "options": [
          "`platform.python()`",
          "`sys.executable`",
          "`os.environ['BIN']`",
          "`Path.interpreter()`"
        ],
        "correct": 1,
        "explanation": "`sys.executable` guarantees child Python invocations run inside the exact active virtual environment or interpreter."
      },
      {
        "id": "q_c4_m4_002",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "difficult",
        "q": "A privileged Windows remediation script runs `os.environ.get('PATH', '').split(os.pathsep)`. Why is hardcoding `split(':')` instead of `os.pathsep` broken on Windows, AND why is trusting `PATH` in elevated scripts hazardous?",
        "options": [
          "Windows separates `PATH` with spaces, not colons or semicolons",
          "`os.pathsep` strips absolute paths automatically",
          "`os.environ` is empty under elevated accounts",
          "Windows `PATH` uses `';'` (whereas `'C:\\\\...'` contains colons in drive letters!), so `os.pathsep` is mandatory; furthermore an attacker-writable directory prepended onto `PATH` hijacks bare binary launches!"
        ],
        "correct": 3,
        "explanation": "Splitting on literal `:` fractures `C:\\` Windows drive prefixes immediately, and resolving unpinned command names along mutable `PATH` entries invites binary planting."
      },
      {
        "id": "q_c4_m4_003",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "medium",
        "q": "Which standard function locates whether an executable like `'python'` resolves on the active search path and returns its full path string or `None`?",
        "options": [
          "`os.find_bin('python')`",
          "`Path.search('python')`",
          "`shutil.which('python')`",
          "`subprocess.lookup('python')`"
        ],
        "correct": 2,
        "explanation": "`shutil.which('python')` checks executable resolution across `PATH` (or an explicit safe `path=` parameter)."
      },
      {
        "id": "q_c4_m4_004",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "difficult",
        "q": "When launching a privileged helper tool on Linux via a scheduled `cron` job running as root, why does relying on `shutil.which('systemctl')` WITHOUT an explicit `path=` or hardcoded `/usr/bin/systemctl` expose a trust gap if untrusted callers set environment variables?",
        "options": [
          "`shutil.which()` ignores `/usr/bin` on POSIX",
          "`systemctl` fails if invoked via absolute path",
          "Calling bare command names or unpinned `which()` reads `os.environ['PATH']`, which caller-supplied environments can poison—pinning absolute paths (or passing fixed trusted `path='/usr/bin:/bin'`) closes PATH hijacking!",
          "`shutil.which()` runs binaries automatically as root"
        ],
        "correct": 2,
        "explanation": "Privileged scripts treat all inherited environment variables (`PATH`, `PYTHONPATH`, `IFS`) as attacker-controlled until explicitly replaced or ignored."
      },
      {
        "id": "q_c4_m4_005",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "medium",
        "q": "In `m04_os_automation.py`, how did the script inspect OS family and release string (`Windows 11`) cleanly across platforms?",
        "options": [
          "`platform.system()` and `platform.release()`",
          "`os.uname_windows()`",
          "`sys.os_name`",
          "`subprocess.run(['ver'])`"
        ],
        "correct": 0,
        "explanation": "`platform.system()` (`'Windows'`, `'Linux'`, `'Darwin'`) and `platform.release()` provide consistent cross-platform OS metadata without spawning shells."
      },
      {
        "id": "q_c4_m4_006",
        "topic": "C04-M04-L01: Platform, Environment & PATH",
        "difficulty": "difficult",
        "q": "A collector script stored at `/opt/rk/collect.py` opens `'baseline.json'` using `Path('baseline.json')`. It works interactively when you run `cd /opt/rk && python collect.py`, yet crashes nightly under Windows Task Scheduler / `cron` with `FileNotFoundError`. Why?",
        "options": [
          "Schedulers encrypt relative `.json` filenames at midnight",
          "Task Scheduler drops files exceeding 100 bytes",
          "`Path.cwd()` returns `None` in non-interactive shells",
          "Scheduled tasks frequently spawn in default system working directories (`/` or `C:\\Windows\\System32`) rather than the script's directory—anchor static sidecar paths cleanly via `Path(__file__).resolve().parent / 'baseline.json'`!"
        ],
        "correct": 3,
        "explanation": "Anchoring companion files against `Path(__file__).resolve().parent` decouples scripts completely from fragile caller `cwd` assumptions."
      },
      {
        "id": "q_c4_m4_007",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "medium",
        "q": "Which `pathlib` call finds `'*.log'` files inside BOTH `work` and nested subdirectories such as `sub/c.log`?",
        "options": [
          "`work.glob('*.log')`",
          "`work.rglob('*.log')`",
          "`work.listdir('*.log')`",
          "`work.find('*.log')`"
        ],
        "correct": 1,
        "explanation": "`Path.rglob('*.log')` performs recursive subtree traversal equivalent to `glob('**/*.log')`."
      },
      {
        "id": "q_c4_m4_008",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "difficult",
        "q": "Look at `safe_join(base: Path, user_name: str)` in `m04_os_automation.py`: `target = (base / user_name).resolve(); if not target.is_relative_to(base.resolve()): raise ValueError(...)`. Suppose an analyst changes `base.resolve()` to plain `base` when `base` is `/tmp/rk` (where `/tmp` on macOS symlinks to `/private/tmp`). What breaks?",
        "options": [
          "Symlinks only expand on Windows FAT32 partitions",
          "Unresolved `base` disables `ValueError` exceptions",
          "`is_relative_to()` fails on EVERY valid file because `target.resolve()` resolved `/private/tmp/...` while un-resolved `base` remained `/tmp/...`!",
          "`base / user_name` turns `Path` into a string"
        ],
        "correct": 2,
        "explanation": "Canonicalize **both** sides (`target` and `base`) with `.resolve()` so OS directory symlinks (`/tmp` -> `/private/tmp`) never cause false rejections."
      },
      {
        "id": "q_c4_m4_009",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "medium",
        "q": "In `m04_os_automation.py`, which two methods paired inside `safe_join()` blocked `'../../Windows/win.ini'` cleanly?",
        "options": [
          "`Path.resolve()` and `is_relative_to()`",
          "`str.lower()` and `len()`",
          "`user_name.strip('.')` and `exists()`",
          "`os.system()` and `stat()`"
        ],
        "correct": 0,
        "explanation": "Canonical resolution + parent-tree containment reliably detects and stops `CWE-22` path traversal."
      },
      {
        "id": "q_c4_m4_010",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "difficult",
        "q": "An older Python 3.7 tutorial checked containment using `str((base / user_name).resolve()).startswith(str(base.resolve()))`. Why does that prefix check contain a classic security flaw when `base = Path('/srv/uploads')`?",
        "options": [
          "`startswith` ignores forward slashes completely",
          "`str.startswith` always returns `False` on Windows",
          "An attacker reaching sibling directory `/srv/uploads_backup/secrets.db` passes `.startswith('/srv/uploads')` cleanly because the string prefix matches without checking path segment boundaries—whereas `is_relative_to()` blocks it!",
          "Paths cannot convert cleanly to `str`"
        ],
        "correct": 2,
        "explanation": "Sibling directory prefix collisions (`/srv/uploads_backup` vs `/srv/uploads`) bypass naive string-prefix tests; `is_relative_to()` inspects true path segments safely."
      },
      {
        "id": "q_c4_m4_011",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "medium",
        "q": "When copying files during forensic incident collection (Practical P1), why is `shutil.copy2(src, dst)` preferred over basic `shutil.copy(src, dst)`?",
        "options": [
          "`copy2` preserves original file modification/access timestamps and metadata (`st_mtime`) cleanly on the evidence copy",
          "`copy2` compresses target files automatically",
          "`copy2` encrypts files during transfer",
          "`copy` only copies directories"
        ],
        "correct": 0,
        "explanation": "Preserving metadata (`mtime`) via `shutil.copy2` keeps timeline artifacts intact across collected copies."
      },
      {
        "id": "q_c4_m4_012",
        "topic": "C04-M04-L02: Directory Walks & Path Traversal",
        "difficulty": "difficult",
        "q": "In `m04_os_automation.py`, `p.stat().st_mtime` returns Unix epoch float seconds cleanly. If an investigator wants to compare file modification times from a Windows evidence disk collected in New York against UTC firewall logs in Frankfurt reliably, what conversion pattern prevents timezone off-by-hours errors?",
        "options": [
          "`datetime.fromtimestamp(t, tz=timezone.utc)` creating an explicit timezone-aware UTC object",
          "`datetime.fromtimestamp(t)` using local workstation clock",
          "`time.ctime(t)` formatting local strings cleanly",
          "Adding 3600 seconds manually on Linux"
        ],
        "correct": 0,
        "explanation": "Naive local `fromtimestamp(t)` depends silently on host timezone/DST rules; explicitly passing `tz=timezone.utc` guarantees globally consistent timelines."
      },
      {
        "id": "q_c4_m4_013",
        "topic": "C04-M04-L03: subprocess.run & Error Handling",
        "difficulty": "medium",
        "q": "In `subprocess.run([sys.executable, ...], capture_output=True, text=True, timeout=10, check=True)`, what does passing `check=True` accomplish?",
        "options": [
          "Validates Python syntax before running",
          "Disables standard error capturing",
          "Raises `subprocess.CalledProcessError` automatically if the child process exits with a non-zero return code",
          "Runs the command inside an elevated shell"
        ],
        "correct": 2,
        "explanation": "Without `check=True`, a failed child exiting `rc=3` silently returns without raising an error unless you explicitly inspect `result.returncode`."
      },
      {
        "id": "q_c4_m4_014",
        "topic": "C04-M04-L03: subprocess.run & Error Handling",
        "difficulty": "difficult",
        "q": "Inspect Section 6 of `m04_os_automation.py`: `subprocess.run(..., timeout=1)` raised `TimeoutExpired`, while `sys.exit(3)` with `check=True` raised `CalledProcessError`. Suppose a script invokes `subprocess.run(..., timeout=5, check=True)` on a helper that prints debug passwords cleanly if it crashes. When `check=True` logs or prints the exception directly, what secret-hygiene danger can `err.cmd` or `err.stderr` leak?",
        "options": [
          "`CalledProcessError` hides all CLI flags automatically",
          "Because `CalledProcessError` includes the full `cmd` argument list AND `stdout`/`stderr` attributes in its tracebacks/repr, passing API secrets on child CLI flags or printing verbose error streams exposes secrets straight into system logs and `ps` tables!",
          "`TimeoutExpired` leaks only return codes",
          "Subprocesses run inside encrypted RAM pages"
        ],
        "correct": 1,
        "explanation": "Never pass secrets in subprocess CLI argv (other users see them in `ps` / Task Manager and tracebacks capture `cmd`); pass secrets via restricted stdin/pipes/files cleanly."
      },
      {
        "id": "q_c4_m4_015",
        "topic": "C04-M04-L03: subprocess.run & Error Handling",
        "difficulty": "medium",
        "q": "What happens when a subprocess exceeds `timeout=1` inside `subprocess.run(..., timeout=1)`?",
        "options": [
          "Python terminates/kills the child process and raises `subprocess.TimeoutExpired`",
          "Python ignores it and waits forever cleanly",
          "Python retries three times automatically",
          "Exits the parent interpreter immediately with exit 0"
        ],
        "correct": 0,
        "explanation": "As demonstrated cleanly in `m04_os_automation.py` step 6, expiring kills the stalled child and raises `TimeoutExpired`."
      },
      {
        "id": "q_c4_m4_016",
        "topic": "C04-M04-L03: subprocess.run & Error Handling",
        "difficulty": "difficult",
        "q": "Notice Python 3's standard library offers native `pathlib.Path.rglob()`, `shutil.copy2()`, `shutil.make_archive()`, and `zipfile.ZipFile`. Why should scripts use these native Python APIs INSTEAD of calling `subprocess.run(['tar', ...])` or `subprocess.run(['cp', ...])` whenever possible?",
        "options": [
          "External `cp` returns JSON objects",
          "Subprocesses cannot copy binary files",
          "`shutil` runs 100x faster on kernel assembly",
          "Native stdlib APIs work identically across Windows and Linux, eliminate external binary `PATH` discrepancies, preserve typed exceptions, and eliminate child-process CLI/shell injection surfaces cleanly!"
        ],
        "correct": 3,
        "explanation": "Avoiding unnecessary external process spawns reduces cross-platform drift, failure modes, and injection surfaces simultaneously."
      },
      {
        "id": "q_c4_m4_017",
        "topic": "C04-M04-L04: Command Injection (CWE-78)",
        "difficulty": "medium",
        "q": "In `m04_os_automation.py` step 5, why did `user_input = 'report.txt & echo INJECTED'` print `INJECTED` on a separate second output line when passed to `subprocess.run(shell_cmd, shell=True)`?",
        "options": [
          "With `shell=True`, the system shell (`cmd.exe` / `/bin/sh`) interpreted `&` as a command separator and launched `echo INJECTED` as a second OS command",
          "`echo` runs substrings after ampersands automatically",
          "Python split the string internally on `&`",
          "`timeout=10` split stdout on whitespace"
        ],
        "correct": 0,
        "explanation": "Passing a string with `shell=True` invokes the system shell interpreter, turning injected shell metacharacters into new arbitrary commands (`CWE-78`)."
      },
      {
        "id": "q_c4_m4_018",
        "topic": "C04-M04-L04: Command Injection (CWE-78)",
        "difficulty": "difficult",
        "q": "Suppose an engineer removes `shell=True` cleanly: `subprocess.run(['grep', user_pattern, '/var/log/auth.log'], check=True)`. An attacker submits `user_pattern = '-f /etc/shadow'` or `'--help'`. Why does removing `shell=True` NOT stop this option injection bug, and what fix neutralizes it?",
        "options": [
          "Inside the child program itself, `grep` parses leading-hyphen strings as CLI flags (`-f` reads arbitrary file patterns!)—inserting `'--'` end-of-options marker (`['grep', '--', user_pattern, '/var/log/auth.log']`) alongside strict input allowlists stops flag smuggling cleanly!",
          "`grep` ignores options when `shell=False`",
          "Replace `'grep'` with `shell=True`",
          "Wrap `user_pattern` in `shlex.quote()`"
        ],
        "correct": 0,
        "explanation": "Never confuse shell safety (`shell=False`) with child argument safety: use `'--'` before user arguments and reject leading `-` via strict allowlists (better yet, search files natively in Python!)."
      },
      {
        "id": "q_c4_m4_019",
        "topic": "C04-M04-L04: Command Injection (CWE-78)",
        "difficulty": "medium",
        "q": "What does MITRE weakness identifier `CWE-78` categorize?",
        "options": [
          "Improper Neutralization of Special Elements used in an OS Command (OS Command Injection)",
          "Path Traversal",
          "Insecure Deserialization",
          "Catastrophic Regex Backtracking"
        ],
        "correct": 0,
        "explanation": "CWE-78 defines OS Command Injection—a perennial MITRE/CISA Top 25 software weakness."
      },
      {
        "id": "q_c4_m4_020",
        "topic": "C04-M04-L04: Command Injection (CWE-78)",
        "difficulty": "difficult",
        "q": "Examine `shlex.quote(arg)` from Python's stdlib: why do Python's own `subprocess` documentation and Module 4 warn engineers explicitly NOT to trust `shlex.quote()` on Windows automation?",
        "options": [
          "`shlex.quote()` throws `NotImplementedError` on Windows",
          "`shlex.quote()` strips numbers silently",
          "`shlex.quote()` implements POSIX `/bin/sh` single-quote syntax (`'foo'`), which Windows `cmd.exe` does NOT parse as neutral quotes—leaving `&`, `%VAR%`, and `|` exploitable! Argument lists (`shell=False`) avoid shells across ALL platforms.",
          "`cmd.exe` automatically sanitizes single quotes"
        ],
        "correct": 2,
        "explanation": "Cross-platform security relies on `shell=False` argument lists—not platform-specific shell escaping helpers."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m4_l1",
      "title": "4.1 Platform Inspection, Environment Variables, and Search-Path Hygiene",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Inspect host OS metadata portably via platform and sys, handle cross-OS path separators cleanly, and treat environment variables such as PATH and PYTHONPATH as untrusted in privileged automation.",
      "learning_objectives": [
        "Query OS architecture, Python runtime version, executable path, and cwd portably using platform, sys, and Path",
        "Differentiate Windows vs POSIX path list and directory separators (os.pathsep / os.sep)",
        "Recognize why PATH and PYTHONPATH act as attacker-influenced execution surfaces inside privileged scripts",
        "Resolve tool binaries deterministically using absolute paths or shutil.which() under controlled environments"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-01",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l01_cross_platform_os_abstraction.png",
          "caption": "Figure 4.1: Portable Python platform, sys, os, and pathlib inspection mapping identical logic across Windows 11 and Linux hosts.",
          "placement_hint": "After Section 3 (Inspecting Host OS and Runtime Metadata)"
        },
        {
          "id": "fig-04-04-02",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l01_untrusted_path_env_hijacking.png",
          "caption": "Figure 4.2: Relative binary resolution vulnerable to poisoned PATH directories versus pinned absolute executable resolution.",
          "placement_hint": "After Section 4 (Treating Environment Variables as Untrusted Input)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-01",
          "title": "Figure 4.1: Portable Python OS & Path Inspection Across Hosts",
          "url": "/assets/courses/cyber-04/c04_m04_l01_cross_platform_os_abstraction.png",
          "caption": "Figure 4.1: Portable Python platform, sys, os, and pathlib inspection mapping identical logic across Windows 11 and Linux hosts.",
          "alt": "Diagram showing one shared Python script mapping platform.system(), sys.executable, os.sep, and os.pathsep cleanly across Windows 11 (Windows/11, C:\\...\\python.exe, backslash, semicolon) and Linux/macOS (Linux or Darwin, /opt/rk-tools/venv/bin/python, slash, colon)"
        },
        {
          "id": "fig-04-04-02",
          "title": "Figure 4.2: Why Bare Command Names Risk PATH Hijacking",
          "url": "/assets/courses/cyber-04/c04_m04_l01_untrusted_path_env_hijacking.png",
          "caption": "Figure 4.2: Relative binary resolution vulnerable to poisoned PATH directories versus pinned absolute executable resolution.",
          "alt": "Side-by-side comparison contrasting bare subprocess.run(['tool_helper', '--status']) executing a planted fake binary from an earlier PATH or CWD folder before System32 is reached against pinning full executable paths, locking shutil.which search paths, and anchoring via Path(__file__).resolve().parent"
        }
      ],
      "lab_resources": [
        {
          "name": "m04_os_automation.py",
          "url": "/assets/courses/cyber-04/labs/m04_os_automation.py",
          "description": "Module 4 OS traversal, CWE-22 & subprocess security lab script"
        }
      ],
      "content": "## 1. Crossing OS Boundaries Without Introducing Trust Holes\n\nSecurity automation works constantly at the operating-system seam: discovering log directories across mixed Linux servers and Windows endpoints, resolving paths deterministically, inspecting environment variables, and checking installed utilities. Python's standard libraries (`os`, `platform`, `sys`, `pathlib`, `shutil`) eliminate brittle OS-specific shell scripts—yet crossing that OS boundary also exposes one critical threat surface every privileged tool faces: **environment variables and search paths (`PATH`, `PYTHONPATH`, `CWD`) may lie under a standard user's or attacker's influence**.\n\nAll code demonstrations and runtime traces throughout Module 4 come directly from our verified lab execution of `m04_os_automation.py` on Windows 11 under CPython 3.12.4 and CPython 3.14.4.\n\n## 2. Core Objectives for This Lesson\n\n- **Portable Runtime Discovery:** Query operating system identity (`platform`), Python interpreter (`sys.executable`), and process working directory (`Path.cwd()`) cleanly across Windows and POSIX hosts.\n- **Cross-Platform Separators:** Distinguish directory separators (`os.sep`) from search-path list delimiters (`os.pathsep`) without hardcoding platform assumptions.\n- **Untrusted Environment Discipline:** Explain why `PATH`, `PYTHONPATH`, and inherited shell variables must never be trusted inside elevated or scheduled security tools.\n- **Deterministic Executable Resolution:** Locate system binaries predictably with `shutil.which()` or hardcoded absolute paths instead of bare command names.\n\n## 3. Inspecting Host OS and Runtime Metadata\n\nSection 1 of `m04_os_automation.py` captures core host context cleanly using four standard modules:\n\n```python\nimport os\nimport platform\nimport shutil\nimport sys\nfrom pathlib import Path\n\nprint(\"1.\", platform.system(), platform.release(), \"| python:\", sys.version.split()[0])\nprint(\"   cwd is absolute:\", Path.cwd().is_absolute(), \"| PATH entries:\",\n      len(os.environ.get(\"PATH\", \"\").split(os.pathsep)))\nprint(\"   shutil.which('python') found:\", shutil.which(\"python\") is not None)\n```\n\n```terminal\n1. Windows 11 | python: 3.12.4\n   cwd is absolute: True | PATH entries: 89\n   shutil.which('python') found: True\n```\n\nNotice how each expression eliminates OS guesswork:\n\n- **`platform.system()` / `platform.release()`:** Returns `\"Windows\"`, `\"Linux\"`, or `\"Darwin\"` alongside the OS release string (`\"11\"` locally), letting cross-platform health scripts select native OS checks cleanly instead of probing fragile registry keys everywhere.\n- **`sys.executable`:** Holds the **exact absolute filesystem path** to the currently executing Python binary (`C:\\Program Files\\Python312\\python.exe` or `/opt/rk-tools/venv/bin/python`). When launching a Python worker subprocess, passing `[sys.executable, \"worker.py\"]` guarantees invoking the exact same virtual environment interpreter rather than randomly resolving `\"python\"` from `PATH`.\n- **`os.pathsep` vs. `os.sep`:** Path strings inside directories separate folders via `os.sep` (`\\` on Windows, `/` on Linux/macOS), whereas `PATH` environment lists join folders using **`os.pathsep`** (`;` on Windows, `:` on POSIX). Splitting `os.environ.get(\"PATH\", \"\")` cleanly on `os.pathsep` worked identically on our Windows lab host (89 entries locally; 41 entries on the CPython 3.14.4 baseline).\n\n![Figure 4.1: Portable Python OS & Path Inspection Across Hosts](/assets/courses/cyber-04/c04_m04_l01_cross_platform_os_abstraction.png)\n\n*Figure 4.1: Portable Python platform, sys, os, and pathlib inspection mapping identical logic across Windows 11 and Linux hosts.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Shared Cross-Host Introspection Helpers:** A single Python script reads `platform.system()`, `sys.executable`, `os.sep`, and `os.pathsep` without hardcoding OS assumptions.\n- **Host-Specific Values & Safe Child Launch:** On Windows 11, those resolve to `\"Windows\"` (`\"11\"`), `C:\\...\\python.exe`, `\"\\\\\"`, and `\";\"`, whereas on Linux/macOS they resolve to `\"Linux\"` or `\"Darwin\"`, `/opt/rk-tools/venv/bin/python`, `\"/\"`, and `\":\"`; launching child scripts via `[sys.executable, \"worker.py\"]` preserves the active virtual environment across every host.\n\n## 4. Treating Environment Variables as Untrusted Input\n\nCompare two scripts launched by a help-desk automation service running under elevated privileges:\n\n- **Fragile Bare Name:** Running `subprocess.run([\"tool_helper\", \"--status\"])` asks the OS loader to walk every directory in `os.environ[\"PATH\"]` from left to right. On Windows systems, older installers or misconfigured current directories (`CWD`) or user-writable `PATH` folders appearing before `C:\\Windows\\System32` allow an attacker who drops a fake `tool_helper.exe` into that writable folder to win execution under the elevated service!\n- **Explicit Safe Resolution:** Always resolve critical executables using **hardcoded absolute OS paths** (`Path(r\"C:\\Windows\\System32\\schtasks.exe\")` or `Path(\"/usr/bin/systemctl\")`), or query `shutil.which(\"git\", path=\"/usr/bin:/bin\")` against a sanitized fixed `path=` string containing strictly admin-owned directories. Likewise, never trust `PYTHONPATH` in privileged tasks (invoke `python -I` as covered in Module 2).\n\n> [!WARNING]\n> **Inherited `CWD` Traps:** Scheduled tasks and background services default to ambiguous working directories (often `C:\\Windows\\System32` or `/` or user folders). Never assume relative filenames like `\"rules.json\"` resolve next to your script—anchor script assets via `Path(__file__).resolve().parent / \"rules.json\"` and always validate user-supplied arguments explicitly!\n\n![Figure 4.2: Why Bare Command Names Risk PATH Hijacking](/assets/courses/cyber-04/c04_m04_l01_untrusted_path_env_hijacking.png)\n\n*Figure 4.2: Relative binary resolution vulnerable to poisoned PATH directories versus pinned absolute executable resolution.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Unsafe Bare Lookup (`subprocess.run([\"tool_helper\", \"--status\"])`):** Searching `PATH` left-to-right hits an earlier user-writable folder or `CWD` first, running a planted fake `tool_helper.exe` with elevated rights before `C:\\Windows\\System32\\tool_helper.exe` is ever reached.\n- **Safe Pinning & Script Anchoring:** Hardcode explicit absolute binary paths (`Path(r\"C:\\Windows\\System32\\schtasks.exe\")` or `Path(\"/usr/bin/systemctl\")`), restrict `shutil.which(\"git\", path=\"/usr/bin:/bin\")` search folders, and anchor script assets with `Path(__file__).resolve().parent` rather than trusting `CWD` or `PYTHONPATH`."
    },
    {
      "id": "les_c4_m4_l2",
      "title": "4.2 Walking Directories, Forensics Metadata, and Path Traversal Defense",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Recursively filter host telemetry files using Path.rglob() and stat() timestamps, preserve evidence timestamps via shutil.copy2(), and defeat CWE-22 path traversal using resolve().is_relative_to().",
      "learning_objectives": [
        "Walk directory trees recursively with Path.rglob() and query file size or modification times via stat().st_mtime",
        "Preserve forensic evidence metadata timestamps cleanly via shutil.copy2() inside isolated temporary workspaces",
        "Implement safe_join(base, user_name) combining Path.resolve() and is_relative_to() to enforce strict folder containment",
        "Explain why raw substring checks ('..' not in name or str.startswith) fail against canonical path traversal escapes (CWE-22)"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-03",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l02_path_traversal_containment.png",
          "caption": "Figure 4.3 (C04-M04-F2): Path resolution and containment gate allowing sub/c.log while rejecting ../../Windows/win.ini via ValueError.",
          "placement_hint": "After Section 4 (Path Traversal Containment: safe_join with resolve and is_relative_to)"
        },
        {
          "id": "fig-04-04-04",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l02_rglob_discovery_forensic_copy.png",
          "caption": "Figure 4.4: Recursive rglob discovery filtering bytes and st_mtime timestamps alongside safe shutil.copy2 evidence collection.",
          "placement_hint": "After Section 3 (Recursive Discovery with rglob and stat Inspection)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-03",
          "title": "Figure 4.3: Stopping Path Traversal with resolve() and is_relative_to()",
          "url": "/assets/courses/cyber-04/c04_m04_l02_path_traversal_containment.png",
          "caption": "Figure 4.3 (C04-M04-F2): Path resolution and containment gate allowing sub/c.log while rejecting ../../Windows/win.ini via ValueError.",
          "alt": "Flow diagram showing safe_join(base, user_name) resolving (base / user_name).resolve() and checking is_relative_to(base.resolve()), allowing sub/c.log inside the base directory while blocking ../../Windows/win.ini (resolved to C:\\Windows\\win.ini) with ValueError"
        },
        {
          "id": "fig-04-04-04",
          "title": "Figure 4.4: Recursive File Search & Safe Evidence Copying",
          "url": "/assets/courses/cyber-04/c04_m04_l02_rglob_discovery_forensic_copy.png",
          "caption": "Figure 4.4: Recursive rglob discovery filtering bytes and st_mtime timestamps alongside safe shutil.copy2 evidence collection.",
          "alt": "Three-stage pipeline scanning rk-m04- via work.rglob('*.log') to discover ['a.log', 'b.log', 'sub/c.log'], filtering stat() st_size > 100 down to ['b.log', 'c.log'], and contrasting shutil.copy resetting st_mtime to NOW against shutil.copy2 preserving original st_mtime metadata"
        }
      ],
      "lab_resources": [
        {
          "name": "m04_os_automation.py",
          "url": "/assets/courses/cyber-04/labs/m04_os_automation.py",
          "description": "Module 4 OS traversal, CWE-22 & subprocess security lab script"
        }
      ],
      "content": "## 1. Finding Changed Evidence Files Without Escaping Storage Boundaries\n\nIncident responders frequently need scripts that sweep logs across nested subdirectories, pick out artifacts modified within the past hour, and copy them cleanly to an analysis vault with timestamps preserved. Python provides `Path.rglob()`, `stat()`, and `shutil.copy2()` for clean cross-platform collection. However, the moment a filename comes from a compressed archive header, user input, HTTP query parameter, or help-desk ticket, concatenating `base / user_name` blindly risks **Directory / Path Traversal (`CWE-22`)**, exposing files anywhere on the disk.\n\n## 2. Core Objectives for This Lesson\n\n- **Recursive Discovery (`rglob`):** Walk nested directory trees cleanly and filter files by suffix, size (`st_size`), and modification time (`st_mtime`).\n- **Forensic Metadata Preservation (`copy2`):** Copy selected evidence files cleanly via `shutil.copy2()` without losing original timestamps.\n- **Canonical Containment (`safe_join`):** Defeat path traversal escapes cleanly by pairing `Path.resolve()` with `is_relative_to()` (`Python 3.9+`).\n- **Why Substring Filters Fail:** Explain why blocking `\"..\"` naively misses symlink escapes, OS separator ambiguity, and leading slashes.\n\n## 3. Recursive Discovery with `rglob` and `stat` Inspection\n\nInspect Section 2 of `m04_os_automation.py`, which builds a small directory tree inside a scratch folder (`rk-m04-*`) containing four synthetic files (`a.log` = 10 B, `b.log` = 2000 B, `notes.txt` = 5 B, and `sub/c.log` = 300 B) and sweeps it recursively:\n\n```python\nwork = Path(tempfile.mkdtemp(prefix=\"rk-m04-\"))\nfor name, size in [(\"a.log\", 10), (\"b.log\", 2000), (\"notes.txt\", 5), (\"sub/c.log\", 300)]:\n    p = work / name\n    p.parent.mkdir(parents=True, exist_ok=True)\n    p.write_bytes(b\"x\" * size)\nlogs = sorted(work.rglob(\"*.log\"))\nprint(\"2.\", [str(p.relative_to(work)).replace(\"\\\\\", \"/\") for p in logs],\n      \"| over 100 bytes:\", [p.name for p in logs if p.stat().st_size > 100])\n```\n\n```terminal\n2. ['a.log', 'b.log', 'sub/c.log'] | over 100 bytes: ['b.log', 'c.log']\n```\n\nLook closely at three subtle details in that 7-line sweep:\n\n- **`p.parent.mkdir(parents=True, exist_ok=True)`:** Creates missing intermediate folders (`sub/`) cleanly while avoiding `FileExistsError` if already created.\n- **`work.rglob(\"*.log\")` vs. `work.glob(\"*.log\")`:** Plain `.glob(\"*.log\")` matches strictly top-level files (`a.log`, `b.log`); recursive **`.rglob(\"*.log\")`** walks subdirectories arbitrarily deep to discover `sub/c.log` cleanly while excluding `notes.txt` (for large filtered directory walks where entire subtrees need pruning, `os.walk` offers low-level directory pruning).\n- **Inspecting Size & Timestamps (`stat()`):** `p.stat().st_size` reports byte count without reading contents, while `p.stat().st_mtime` returns Unix epoch float seconds (always convert to timezone-aware UTC via `datetime.fromtimestamp(t, tz=timezone.utc)`, explored thoroughly in Module 6). When collecting matching files for incident response, use **`shutil.copy2(src, dst)`** instead of `shutil.copy()` so original modification timestamps and metadata remain preserved on the evidence copy.\n\n![Figure 4.4: Recursive File Search & Safe Evidence Copying](/assets/courses/cyber-04/c04_m04_l02_rglob_discovery_forensic_copy.png)\n\n*Figure 4.4: Recursive rglob discovery filtering bytes and st_mtime timestamps alongside safe shutil.copy2 evidence collection.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Recursive Tree Sweep (`work.rglob('*.log')`):** Across `rk-m04-` containing `a.log` (`10 B`), `b.log` (`2000 B`), `notes.txt` (`5 B`), and `sub/c.log` (`300 B`), `rglob(\"*.log\")` skips `notes.txt` and descends into `sub/` to collect `['a.log', 'b.log', 'sub/c.log']` (unlike plain `glob()`, which misses `sub/c.log`), before `stat().st_size > 100` filters down to `['b.log', 'c.log']`.\n- **Forensic Metadata Preservation (`shutil.copy2` vs. `shutil.copy`):** `shutil.copy(src, dst)` copies file contents alone and resets `st_mtime` to current time, whereas `shutil.copy2(src, dst)` preserves original `st_mtime` metadata on the evidence copy.\n\n## 4. Path Traversal Containment: `safe_join` with `resolve` and `is_relative_to`\n\nWhen a collector script unpacks an archive or accepts a relative filename `user_name` meant to stay strictly inside `base`, look at Section 3 of `m04_os_automation.py`:\n\n```python\ndef safe_join(base: Path, user_name: str) -> Path:\n    target = (base / user_name).resolve()\n    if not target.is_relative_to(base.resolve()):\n        raise ValueError(f\"path escapes base folder: {user_name!r}\")\n    return target\n\nfor name in [\"sub/c.log\", \"../../Windows/win.ini\"]:\n    try:\n        print(\"3. ok:\", safe_join(work, name).name)\n    except ValueError as err:\n        print(\"3. blocked:\", err)\n```\n\n```terminal\n3. ok: c.log\n3. blocked: path escapes base folder: '../../Windows/win.ini'\n```\n\nUnderstand why BOTH `resolve()` and `is_relative_to()` are indispensable together (Figure 4.3 / `C04-M04-F2`):\n\n1. **`Path.resolve()` Canonicalizes Everything:** Collapses redundant `.`, resolves parent escapes `..`, expands symbolic links on disk to their real targets, and discards `base` if `user_name` sneakily started with `/` (`work / \"/etc/passwd\"`). Attempting to defend with string tricks like `if \"..\" in user_name:` misses URL-encoded variants, symlinks pointing outside `base`, and rooted strings `/etc/passwd`!\n2. **`is_relative_to(base.resolve())` Enforces True Tree Boundary:** Prior to Python 3.9, developers mistakenly wrote `str(target).startswith(str(base))`—which fails dangerously if `base` is `/var/app` and `target` escapes to `/var/app_secrets/key` (same string prefix, totally different directory!). `target.is_relative_to(base.resolve())` compares true **path component** ancestry cleanly, rejecting `/var/app_secrets/key` while also resolving `base` itself in case `/tmp` or a mount point is itself a symlink.\n\n> [!CAUTION]\n> **TOCTOU & `shutil.rmtree` Scope:** Never pass unvalidated user variables into `shutil.rmtree(path)`. If `path` resolves to an empty parent or root directory due to missing inputs, recursive deletion destroys host files catastrophically. Verify `safe_join`, confirm exact expected subdirectory names, and run cleanup only inside isolated `tempfile.mkdtemp()` locations.\n\n![Figure 4.3: Stopping Path Traversal with resolve() and is_relative_to()](/assets/courses/cyber-04/c04_m04_l02_path_traversal_containment.png)\n\n*Figure 4.3 (C04-M04-F2): Path resolution and containment gate allowing sub/c.log while rejecting ../../Windows/win.ini via ValueError.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Canonical Resolution & Containment Check (`safe_join`):** Calling `(base / user_name).resolve()` resolves relative `..` segments and symlinks before checking `target.is_relative_to(base.resolve())`, overcoming raw `\"..\"` string filters that miss symlinks, `/etc/passwd`, or lookalike prefix folders such as `/var/app_secrets`.\n- **Valid vs. Escape Branches:** `\"sub/c.log\"` resolves inside `.../rk-m04-xyz/sub/c.log` (`is_relative_to() -> True`) and is returned safely, whereas `\"../../Windows/win.ini\"` resolves outside base (`C:\\Windows\\win.ini`, `False`) and raises `ValueError` before any file operation occurs."
    },
    {
      "id": "les_c4_m4_l3",
      "title": "4.3 Executing Child Processes Safely with subprocess.run",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Manage child processes cleanly using subprocess.run with argv lists, capture_output=True, text=True, finite timeouts, and check=True while preferring native Python stdlib modules over external shell tools.",
      "learning_objectives": [
        "Invoke external utilities safely using argument lists ([program, arg1, arg2]) instead of formatted strings",
        "Capture child stdout/stderr streams cleanly as decoded text via capture_output=True and text=True",
        "Enforce deterministic process termination using finite timeout bounds handling TimeoutExpired",
        "Detect child execution failures via check=True / CalledProcessError and prefer stdlib pathlib/shutil over spawning ls/cp"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-05",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l03_subprocess_run_architecture.png",
          "caption": "Figure 4.5: Anatomy of a defensive subprocess.run() call tracing normal exit, TimeoutExpired kill, and CalledProcessError capture.",
          "placement_hint": "After Section 3 (Structured Process Control with subprocess.run)"
        },
        {
          "id": "fig-04-04-06",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l03_stdlib_native_vs_external_spawn.png",
          "caption": "Figure 4.6: Native Python stdlib operations (pathlib, shutil, zipfile) avoiding external binary spawn latency and surface exposure.",
          "placement_hint": "After Section 5 (Preferring Native Standard Libraries Over External Processes)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-05",
          "title": "Figure 4.5: How subprocess.run() Controls Child Commands Safely",
          "url": "/assets/courses/cyber-04/c04_m04_l03_subprocess_run_architecture.png",
          "caption": "Figure 4.5: Anatomy of a defensive subprocess.run() call tracing normal exit, TimeoutExpired kill, and CalledProcessError capture.",
          "alt": "Diagram showing subprocess.run([sys.executable, '-c', '...'], capture_output=True, text=True, timeout=10, check=True) branching into three outcomes: normal finish rc=0 returning stdout, hung process killed with TimeoutExpired after timeout=1, and exit code 3 raising CalledProcessError via check=True"
        },
        {
          "id": "fig-04-04-06",
          "title": "Figure 4.6: Use Built-In Python Tools Before Spawning External Programs",
          "url": "/assets/courses/cyber-04/c04_m04_l03_stdlib_native_vs_external_spawn.png",
          "caption": "Figure 4.6: Native Python stdlib operations (pathlib, shutil, zipfile) avoiding external binary spawn latency and surface exposure.",
          "alt": "Comparison mapping external commands ls/dir/find, cp/mv/rm -rf, zip -r/tar, and ping/cat to native Python standard library alternatives pathlib.Path.rglob()/stat(), shutil.copy2()/move()/rmtree(), zipfile/tarfile/make_archive(), and socket/urllib.request/path.open()"
        }
      ],
      "lab_resources": [
        {
          "name": "m04_os_automation.py",
          "url": "/assets/courses/cyber-04/labs/m04_os_automation.py",
          "description": "Module 4 OS traversal, CWE-22 & subprocess security lab script"
        }
      ],
      "content": "## 1. Launching External Tools Without Hanging or Losing Exit Signals\n\nEven though Python's standard library solves most text, file, hashing, and network tasks natively, security automation periodically orchestrates external compilers, OS firewall utilities, archive scanners, or system diagnostics. Calling legacy shortcuts like `os.system()` hides stdout, mixes shell interpreters silently, and hangs indefinitely if a remote host or external utility locks up. Modern Python standardizes process orchestration around a single clean, explicit primitive: **`subprocess.run()`**.\n\n## 2. Core Objectives for This Lesson\n\n- **Safe Process Arguments:** Pass `[program, arg1, arg2]` lists cleanly so the OS kernel skips intermediate shell parsing.\n- **Stream Capturing & Decoding:** Capture standard output and error cleanly using `capture_output=True` and `text=True`.\n- **Mandatory Timeouts:** Enforce explicit `timeout=` ceilings on every subprocess so frozen child tools abort via `subprocess.TimeoutExpired`.\n- **Fail-Loud Exit Verification:** Catch child failures systematically via `check=True` (`subprocess.CalledProcessError`) and favor Python stdlib over redundant OS binaries.\n\n## 3. Structured Process Control with `subprocess.run`\n\nExamine Sections 4 and 6 of `m04_os_automation.py` alongside our verified local Python 3.12.4 run:\n\n```python\nresult = subprocess.run([sys.executable, \"-c\", \"print('hello from child')\"],\n                        capture_output=True, text=True, timeout=10, check=True)\nprint(\"4. rc =\", result.returncode, \"| stdout:\", result.stdout.strip())\n```\n\n```terminal\n4. rc = 0 | stdout: hello from child\n```\n\nWalk carefully through each parameter on `subprocess.run()`:\n\n- **`[sys.executable, \"-c\", \"...\"]` (Argument List):** Passing a Python `list` sets `shell=False` (the safe default), handing the executable path and discrete arguments directly to OS process creation (`CreateProcess` on Windows, `execve` on POSIX) with **zero shell metacharacter interpretation**.\n- **`capture_output=True` & `text=True`:** Collects both `result.stdout` and `result.stderr` cleanly into memory decoded from UTF-8/OS text (use `text=False` when calling tools returning raw binary streams). Remember a subtle DoS guardrail when invoking verbose external tools: if a child dumps gigabytes of debug logs, `capture_output=True` buffers all of it in Python RAM—stream output to a bounded file or pipe line-by-line via `Popen` when invoking high-volume utilities.\n- **`timeout=10`:** Enforces a strict wall-clock ceiling; if the child fails to finish within 10 seconds, `subprocess.run` kills the process cleanly and raises `subprocess.TimeoutExpired`.\n- **`check=True`:** Forces Python to verify `result.returncode == 0`; any non-zero exit code immediately raises `subprocess.CalledProcessError(returncode, cmd)` instead of letting scripts celebrate `\"success\"` silently after a child utility crashed!\n\n![Figure 4.5: How subprocess.run() Controls Child Commands Safely](/assets/courses/cyber-04/c04_m04_l03_subprocess_run_architecture.png)\n\n*Figure 4.5: Anatomy of a defensive subprocess.run() call tracing normal exit, TimeoutExpired kill, and CalledProcessError capture.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Safe Launch Anatomy:** Passing an argument list (`[sys.executable, '-c', '...']`) skips the OS shell (`shell=False`), while `capture_output=True, text=True` captures decoded strings, `timeout=10` caps runtime, and `check=True` validates return codes.\n- **Three Deterministic Outcomes:** Normal completion yields `rc = 0` and captured `stdout` (`'hello from child'`), hanging beyond the limit (`timeout=1`) kills the child and raises `TimeoutExpired`, and a non-zero exit (`rc = 3`) raises `CalledProcessError` so errors never go unnoticed.\n\n## 4. Handling Timeouts and Non-Zero Exits Cleanly\n\nWatch Section 6 of `m04_os_automation.py` trigger both timeout and non-zero failure guards cleanly:\n\n```python\ntry:\n    subprocess.run([sys.executable, \"-c\", \"import time; time.sleep(5)\"], timeout=1)\nexcept subprocess.TimeoutExpired as err:\n    print(\"6. timeout after\", err.timeout, \"s\")\ntry:\n    subprocess.run([sys.executable, \"-c\", \"import sys; sys.exit(3)\"], check=True)\nexcept subprocess.CalledProcessError as err:\n    print(\"   non-zero exit detected:\", err.returncode)\n```\n\n```terminal\n6. timeout after 1.0 s\n   non-zero exit detected: 3\n```\n\nObserve why failing loudly on both errors matters: in Incident Response, if a backup verification or malware-hash binary times out against a stalled SMB share (`TimeoutExpired`), or returns non-zero code `3` (`CalledProcessError`), unattended pipelines without `timeout=` freeze forever (holding scheduler slots locked!) and pipelines without `check=True` fail silently!\n\n### Quantitative Availability Math: Timeout-Bound Blast Containment\n\nWhy does setting an explicit `timeout` convert unbounded outages into predictable execution windows? Look at an external wrapper processing $N = 20$ hosts serially where each unresponsive endpoint hangs indefinitely vs. bounding each call to $\\tau = 15\\text{ s}$:\n\n:::math-steps\nStep 01: Evaluate unguarded call duration when 1 of 20 target shares silently hangs\n$$T_{\\text{unbounded}} = \\lim_{t \\to \\infty} t = \\infty \\quad (\\text{stalls entire pipeline until manual kill})$$\nResult: One hung dependency blocks the remaining 19 hosts and starves scheduled runs indefinitely\n\nStep 02: Bound worst-case total run duration with strict per-call timeout tau = 15 s\n$$T_{\\text{max}} \\le N \\times \\tau = 20 \\times 15\\text{ s} = 300\\text{ s} = 5\\text{ minutes}$$\nResult: Even if every single host hangs completely, completion telemetry and non-zero alerts fire within 5 minutes\n:::\n\n## 5. Preferring Native Standard Libraries Over External Processes\n\nBefore reaching for `subprocess.run()` at all, ask whether Python's standard library solves the requirement natively:\n\n| Naive External Command | Superior Python Stdlib Equivalent | Engineering Gain |\n| :--- | :--- | :--- |\n| `ls`, `dir`, `find` | `pathlib.Path.rglob()`, `Path.stat()` | Zero OS shell variance, typed attributes, no line-parsing fragility |\n| `cp`, `mv`, `rm -rf` | `shutil.copy2()`, `shutil.move()`, `shutil.rmtree()` | Atomic portable calls, exact exceptions, no shell injection |\n| `zip -r` / `tar` | `zipfile.ZipFile`, `tarfile`, `shutil.make_archive()` | Eliminates CWE-78 command surface and binary PATH dependency completely |\n| `ping` output regexing / `cat` | `socket` / `urllib.request` / `with path.open()` | Structured exceptions and bounded memory without spawning processes |\n\nEvery avoided `subprocess` call removes an entire process spawn, avoids binary dependency drift across servers, and narrows your attack surface cleanly.\n\n![Figure 4.6: Use Built-In Python Tools Before Spawning External Programs](/assets/courses/cyber-04/c04_m04_l03_stdlib_native_vs_external_spawn.png)\n\n*Figure 4.6: Native Python stdlib operations (pathlib, shutil, zipfile) avoiding external binary spawn latency and surface exposure.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Filesystem & Archive Equivalents:** Replace `ls`, `dir`, or `find` with `pathlib.Path.rglob()` and `Path.stat()` (identical across Windows and Linux); replace `cp`, `mv`, or `rm -rf` with `shutil.copy2()`, `move()`, and `rmtree()`; and replace `zip -r` or `tar` with `zipfile.ZipFile`, `tarfile`, or `make_archive()` to remove command-injection risk and external binary dependencies.\n- **Network & Stream Equivalents:** Swap `ping` text parsing or `cat` for `socket`, `urllib.request`, and `with path.open()` to gain structured objects, predictable exceptions, and bounded memory usage without spawning child shells."
    },
    {
      "id": "les_c4_m4_l4",
      "title": "4.4 Eliminating OS Command Injection (CWE-78) and Option Injection",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Dissect why shell=True turns punctuation into second OS commands (CWE-78 Top 25), verify harmless injection contrast live, guard against option injection via -- delimiters, and enforce strict regex allowlists.",
      "learning_objectives": [
        "Prove empirically why shell=True lets &, ;, |, &&, and $() split strings into attacker-controlled subcommands",
        "Eliminate CWE-78 OS command injection systematically via argument lists, native APIs, and strict allowlists",
        "Prevent argument/flag smuggling (`--host` / `-rf`) using explicit `--` end-of-options markers and allowlist regexes",
        "Explain why os.system(), eval()/exec(), and cross-platform misuse of shlex.quote() on Windows cmd.exe introduce risk"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-07",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l04_shell_true_vs_argv_list.png",
          "caption": "Figure 4.7 (C04-M04-F1): Identical input 'report.txt & echo INJECTED' split by shell=True versus isolated intact inside an argv list.",
          "placement_hint": "After Section 3 (The Command Injection Flaw: Verified Demonstration)"
        },
        {
          "id": "fig-04-04-08",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l04_option_injection_and_allowlist_gate.png",
          "caption": "Figure 4.8: Multi-layer CWE-78 defense gate applying regex allowlisting, '--' option separator, and shell=False argv execution.",
          "placement_hint": "After Section 5 (Six Defensive Rules and Ticket-Driven Case Studies)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-07",
          "title": "Figure 4.7: Why shell=True Executes Injected Text (While Arg Lists Don't)",
          "url": "/assets/courses/cyber-04/c04_m04_l04_shell_true_vs_argv_list.png",
          "caption": "Figure 4.7 (C04-M04-F1): Identical input 'report.txt & echo INJECTED' split by shell=True versus isolated intact inside an argv list.",
          "alt": "Comparison sending user_input = 'report.txt & echo INJECTED' into shell=True (cmd.exe or /bin/sh splits at '&' and runs attacker command 'echo INJECTED') versus an argument list [sys.executable, ..., user_input] passing characters straight to sys.argv[1] as harmless text"
        },
        {
          "id": "fig-04-04-08",
          "title": "Figure 4.8: Three-Gate Defense Against Command & Flag Injection",
          "url": "/assets/courses/cyber-04/c04_m04_l04_option_injection_and_allowlist_gate.png",
          "caption": "Figure 4.8: Multi-layer CWE-78 defense gate applying regex allowlisting, '--' option separator, and shell=False argv execution.",
          "alt": "Three-gate validation funnel: Gate 1 strict allowlist re.fullmatch(r'[A-Za-z0-9._-]{1,64}', name) blocking 'alice & whoami', Gate 2 '--' end-of-options separator neutralizing '--exec=sh' in ['grep', '--', pattern, target_file], and Gate 3 pinned full binary path with shell=False"
        }
      ],
      "content": "## 1. How `shell=True` Turns Unvalidated Data Into Arbitrary Commands\n\nOperating System Command Injection (**MITRE CWE-78**) has remained entrenched inside the CWE Top 25 Most Dangerous Software Weaknesses year after year. Unlike obscure memory corruption bugs, CWE-78 strikes ordinary everyday scripts: a backup script formats a filename into a command string, an IT wrapper formats a help-desk username into `net user`, or a diagnostic page formats an IP address into `ping`. Whenever `subprocess.run(..., shell=True)` or `os.system()` receives strings mixed with attacker-controlled text, characters like `&`, `|`, `;`, `&&`, and `$()` transform inert string data directly into **executable commands running with the script's privileges**.\n\n## 2. Core Objectives for This Lesson\n\n- **Empirical Shell vs. List Contrast:** Execute Section 5 of `m04_os_automation.py` live to witness `&` inject an extra command cleanly under `shell=True` while remaining plain inert text inside an argument list.\n- **Six Non-Negotiable Safety Rules:** Master OWASP and Python `subprocess` Security Considerations covering argument lists, regex allowlists, `--` end-of-options markers, absolute binary paths, banning `os.system`/`eval`, and `shlex.quote` limits.\n- **Ticket-Driven Escalation Forensics:** Dissect the fictional Marigold Insurance Brokers case study demonstrating full local-administrator compromise via `net user {name}`.\n- **Validating Host Input Names:** Enforce tight allowlists (`re.fullmatch(r\"[A-Za-z0-9._-]{1,64}\", name)`) prior to any external tool dispatch.\n\n## 3. The Command Injection Flaw: Verified Demonstration\n\nCompare side by side how `m04_os_automation.py` handles the exact same string `user_input = \"report.txt & echo INJECTED\"` across both invocation styles:\n\n```python\nuser_input = \"report.txt & echo INJECTED\"\nshell_cmd = f\"echo processing {user_input}\"\nunsafe = subprocess.run(shell_cmd, shell=True, capture_output=True, text=True, timeout=10)\nprint(\"5. shell=True output lines:\", [l.strip() for l in unsafe.stdout.splitlines()])\n\nsafe = subprocess.run([sys.executable, \"-c\", \"import sys; print('processing', sys.argv[1])\",\n                       user_input], capture_output=True, text=True, timeout=10)\nprint(\"   list args output:\", safe.stdout.strip())\n```\n\n```terminal\n5. shell=True output lines: ['processing report.txt', 'INJECTED']\n   list args output: processing report.txt & echo INJECTED\n```\n\nInspect Figure 4.7 (`C04-M04-F1`) alongside those two lines:\n\n- **Under `shell=True`:** Python shipped `\"echo processing report.txt & echo INJECTED\"` as one unified string straight to `cmd.exe` (Windows) or `/bin/sh` (Linux). The shell lexer split the command line right at `&`, finishing Command 1 (`echo processing report.txt`) and launching **attacker Command 2 (`echo INJECTED`)** on a fresh execution step!\n- **With an Argument List (`shell=False`):** Python handed `user_input` straight to the child process's `sys.argv[1]` slot verbatim with **zero shell lexer involved**. The characters `& echo INJECTED` stayed inert printable text inside a single argument! Notice too that **`os.system()` always behaves like `shell=True`** internally and should never receive external input.\n\n![Figure 4.7: Why shell=True Executes Injected Text (While Arg Lists Don't)](/assets/courses/cyber-04/c04_m04_l04_shell_true_vs_argv_list.png)\n\n*Figure 4.7 (C04-M04-F1): Identical input 'report.txt & echo INJECTED' split by shell=True versus isolated intact inside an argv list.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Unsafe `shell=True` Execution:** Passing `f\"echo processing {user_input}\"` with `shell=True` delivers one concatenated command string to `cmd.exe` or `/bin/sh`, which splits at `&` into two separate commands—executing the injected `echo INJECTED` and yielding `['processing report.txt', 'INJECTED']`.\n- **Safe Argument-List Isolation (`shell=False`):** Passing `[sys.executable, ..., user_input]` bypasses the OS shell completely so `user_input` reaches `sys.argv[1]` as literal text (`processing report.txt & echo INJECTED`), leaving `&`, `|`, and `;` harmless.\n\n## 4. Six Defensive Rules Beyond Disabling `shell=True`\n\nSetting `shell=False` and using argument lists eliminates classic shell splitting (`&`, `|`, `;`, `$()`), **yet smart defenders still protect the child program itself** via six unified rules:\n\n1. **Always Use Argument Lists (`shell=False`):** Never assemble formatted command strings passed to `shell=True` or `os.system()` whenever *any* fragment touches external input.\n2. **Validate Against Strict Allowlists First:** Verify untrusted names with tight regex anchors before calling subprocesses—e.g. `re.fullmatch(r\"[A-Za-z0-9._-]{1,64}\", report_name)` rejects spaces, slashes, quotes, semicolons, and absurd lengths unconditionally. Notice `.fullmatch()` enforces end-to-end validation so `\"valid\\n& evil\"` cannot sneak past `$` quirks!\n3. **Neutralize Option/Flag Injection with `--`:** Even when `shell=False` protects the OS shell, what if an attacker passes `user_input = \"--checkpoint-action=exec=sh\"` or `\"-rf\"` into tools like `tar`, `git`, `grep`, or `ssh`? The child tool itself parses arguments starting with `-` as CLI flags! Inserting `\"--\"` right before user arguments (`[\"grep\", \"--\", pattern, target_file]`) instructs POSIX-compliant utilities to stop flag parsing cleanly and treat subsequent values strictly as data (alongside allowlists banning leading `-` cleanly).\n4. **Pin Absolute Binary Paths in Privileged Code:** Invoke explicit paths (`/usr/bin/tar`, `sys.executable`) rather than trusting inherited `PATH`.\n5. **Ban `os.system()`, `eval()`, and `exec()` on Untrusted Data:** All three hand arbitrary syntax straight into execution evaluators.\n6. **Know `shlex.quote()` Limits Across Platforms:** In rare cases on POSIX `/bin/sh` where shell features are genuinely unavoidable, `shlex.quote()` quotes strings for POSIX shells—**CRITICAL WARNING: `shlex.quote()` uses single-quote POSIX rules (`'...'`) which DO NOT protect Windows `cmd.exe` cleanly!** Argument lists remain universally superior across all platforms.\n\n## 5. Real-World Context & Ticket-Driven Case Study\n\nPublic vulnerability taxonomies explain why shell invocation mistakes continue ranking among the highest-impact defects in operational tooling.\n\n### Case Study C04-M04-CS1: CWE-78 in the MITRE / CISA CWE Top 25\n\nOS command injection (MITRE CWE-78) persistently ranks near the top of the CWE Top 25 Most Dangerous Software Weaknesses published jointly by MITRE and CISA. Network appliance web UIs, router management backends, CI/CD workflow runners, and quick IT glue scripts consistently suffer remote root compromise precisely because a programmer concatenated a ticket string or hostname straight into `shell=True`.\n\n### Case Study C04-M04-CS2 (Fictional Teaching Scenario): Marigold Insurance Brokers\n\n*Disclaimer: This teaching scenario is fictional.*\n\n- **Context:** An internal IT operations team at Marigold Insurance Brokers automated Active Directory/local workstation account unlocks by scheduling a script running with **local Administrator privileges** to poll help-desk tickets and unlock requested usernames: `subprocess.run(f\"net user {name} /active:yes\", shell=True)`.\n- **Exploitation:** A malicious insider or attacker able to submit a support ticket entered the requested username: `\"bob & net localgroup administrators bob /add\"`. When the scheduled administrator job interpolated `{name}` directly into `shell=True`, `cmd.exe` cleanly unlocked `bob` **and** executed the appended privilege escalation command promoting `bob` into the local `Administrators` group!\n- **Remediation Architecture:** (1) Enforce strict username allowlist validation (`re.fullmatch(r\"[A-Za-z0-9._-]{1,32}\", name)`), (2) switch execution exclusively to an explicit Python argument list (`[\"net\", \"user\", name, \"/active:yes\"]`)—or even better, native Directory/API bindings removing subprocesses cleanly, (3) isolate execution under a **delegated least-privilege service account** holding strictly `\"reset lockouts\"` delegation (never full local Administrator), and (4) emit immutable audit logs recording ticket ID, target identity, and exit status.\n\n![Figure 4.8: Three-Gate Defense Against Command & Flag Injection](/assets/courses/cyber-04/c04_m04_l04_option_injection_and_allowlist_gate.png)\n\n*Figure 4.8: Multi-layer CWE-78 defense gate applying regex allowlisting, '--' option separator, and shell=False argv execution.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three Sequential Defense Gates:** **Gate 1 (`Strict Allowlist`):** applies `re.fullmatch(r\"[A-Za-z0-9._-]{1,64}\", name)` (alongside rejecting leading `-` names) so command metacharacters like `\"alice & whoami\"` raise `ValueError`; **Gate 2 (`End-of-Options '--'`):** places `\"--\"` before arguments (`[\"grep\", \"--\", pattern, target_file]`) so flags like `\"--exec=sh\"` cannot act as CLI options; **Gate 3 (`Pinned Path + shell=False`):** executes a full binary path via an explicit argv list.\n- **Dangerous Primitives Banned:** Avoid `os.system()`, `eval()`, and `exec()` on untrusted input completely, and remember `shlex.quote()` uses POSIX quoting rules that do not protect Windows `cmd.exe`."
    },
    {
      "id": "les_c4_m4_l5",
      "title": "4.5 Scheduling Scripts Across Windows Task Scheduler, cron, and systemd",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Deploy repeatable Python security jobs on Windows Task Scheduler (schtasks) and Linux cron/systemd timers using absolute interpreter paths, dedicated low-privilege accounts, locked permissions, and heartbeat monitoring.",
      "learning_objectives": [
        "Create, query, and remove scheduled jobs cleanly with Windows schtasks and Linux cron/systemd timers",
        "Explain why scheduled task scripts writable by standard users create local privilege escalation vulnerabilities (ATT&CK T1053)",
        "Bind scheduled tasks explicitly to isolated venv Python interpreters, absolute script paths, and explicit working directories",
        "Prevent overlapping concurrent batch runs via scheduler settings or OS lockfiles and monitor missing heartbeats"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-09",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l05_safe_scheduled_automation_flow.png",
          "caption": "Figure 4.9 (C04-M04-F3): End-to-end hardened scheduling architecture from least-privilege account binding through monitoring.",
          "placement_hint": "After Section 5 (Hardening Scheduled Tasks Against Escalation and Drift)"
        },
        {
          "id": "fig-04-04-10",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l05_scheduler_privilege_escalation_risk.png",
          "caption": "Figure 4.10: Privilege escalation attack path when a SYSTEM scheduled task executes a user-writable Python file.",
          "placement_hint": "After Section 4 (Writable Script Folders and Local Privilege Escalation)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-09",
          "title": "Figure 4.9: Five Essential Rules for Safe Scheduled Python Tasks",
          "url": "/assets/courses/cyber-04/c04_m04_l05_safe_scheduled_automation_flow.png",
          "caption": "Figure 4.9 (C04-M04-F3): End-to-end hardened scheduling architecture from least-privilege account binding through monitoring.",
          "alt": "Five-step hardened scheduling pipeline showing: 1. Low-Privilege Account (rk_svc), 2. Admin-Locked Folders (Admins/SYSTEM only), 3. Exact Full Paths (/opt/rk-tools/venv/bin/python /opt/rk-tools/check.py), 4. Overlap Protection (Do not start a new instance / flock / PID lock), and 5. Error + Heartbeat Alerts"
        },
        {
          "id": "fig-04-04-10",
          "title": "Figure 4.10: How Writable Script Folders Cause Privilege Escalation",
          "url": "/assets/courses/cyber-04/c04_m04_l05_scheduler_privilege_escalation_risk.png",
          "caption": "Figure 4.10: Privilege escalation attack path when a SYSTEM scheduled task executes a user-writable Python file.",
          "alt": "Side-by-side comparison showing unsafe NT AUTHORITY\\SYSTEM scheduled task executing user-writable C:\\Scripts\\collect.py leading to attacker takeover versus locking ACLs to Administrators/SYSTEM, running as a read-only service account, pinning full paths, and checking script hashes"
        }
      ],
      "content": "## 1. Moving Security Automation From Interactive Consoles to Hardened Schedules\n\nAd-hoc scripts run manually help during an active fire, yet proactive cybersecurity relies on unattended cadence: hourly evidence hashes, nightly firewall-baseline diffs, certificate-expiration checks, and automated vulnerability feeds. Both Windows **Task Scheduler** and Linux **`cron` / `systemd` timers** run Python cleanly without manual babysitting—yet misconfigured schedules rank consistently among attackers' favorite escalation targets (**MITRE ATT&CK T1053: Scheduled Task/Job**). Whenever a privileged scheduled task calls a Python file in a user-writable directory, local unprivileged users gain instant privilege escalation.\n\n## 2. Core Objectives for This Lesson\n\n- **Windows & Linux Schedulers:** Create, inspect, and tear down scheduled Python automation cleanly via `schtasks` (Windows) and `cron` / `systemd` timers (Linux).\n- **Virtual-Env Binding & Quoting:** Point schedulers strictly at explicit absolute interpreter paths (inside the tool's `venv`) and absolute script locations.\n- **Writable-Folder Privilege Escalation:** Diagnose why a `SYSTEM` / `root` task invoking a user-writable folder (`C:\\Scripts` writable by `Users`) becomes trivial local elevation, and fix ACLs + account delegation cleanly.\n- **Concurrency Locks & Heartbeats:** Prevent overlapping runs via scheduler lock policies / PID lockfiles and alert automatically when scheduled heartbeats disappear.\n\n## 3. Windows Task Scheduler (`schtasks`) Tested Reference\n\nInspect the verified non-destructive `schtasks` creation, query, and deletion workflow documented in Course 04 on Windows 11 (notice paths containing spaces MUST wrap cleanly in escaped quotes):\n\n```powershell\nschtasks /Create /TN \"RK-C04-Demo\" /TR \"\\\"C:\\Python314\\python.exe\\\" -c \\\"print(1)\\\"\" /SC DAILY /ST 03:00 /F\nschtasks /Query /TN \"RK-C04-Demo\" /FO LIST\nschtasks /Delete /TN \"RK-C04-Demo\" /F\n```\n\n```terminal\nSUCCESS: The scheduled task \"RK-C04-Demo\" has successfully been created.\nNext Run Time: 08/11/2026 03:00:00\nStatus:        Ready\nSUCCESS: The scheduled task \"RK-C04-Demo\" was successfully deleted.\n```\n\nObserve an important blue-team reality check from Course 03 & Course 04 lab baselines: the Windows 11 test workstation already held **194 legitimate scheduled tasks** built into Windows and vendor software (`Get-ScheduledTask`), illustrating why defenders capture clean task baselines so unauthorized persistent `T1053` tasks stand out immediately.\n\n### Linux Scheduling (`cron` and `systemd` Timers)\n\nOn Linux servers, pair an isolated per-tool virtual environment (`Module 2`) with absolute paths in either `/etc/cron.d/` / `crontab` or a `systemd` service unit + timer (as built and verified in Course 03 Module 4):\n\n```ini\n# /etc/systemd/system/rk-check.service\n[Service]\nType=oneshot\nUser=rk_svc\nWorkingDirectory=/opt/rk-tools\nExecStart=/opt/rk-tools/venv/bin/python /opt/rk-tools/check.py\n```\n\nRunning `/opt/rk-tools/venv/bin/python` directly inside `ExecStart=` skips unreliable interactive shell initialization files and runs strictly inside the hash-pinned virtual environment cleanly!\n\n## 4. Writable Script Folders and Local Privilege Escalation\n\nExamine a classic audit finding (Scenario `C04-M04-S3`): a security auditor discovers a Windows Scheduled Task executing `C:\\Scripts\\collect.py` every 15 minutes as **`NT AUTHORITY\\SYSTEM`**, while NTFS permissions show `C:\\Scripts` grants Modify/Write access to built-in `Users`.\n\n- **Exact Blast Radius:** Any standard unprivileged workstation account or compromised browser process can overwrite `C:\\Scripts\\collect.py` (or drop a hijacked `logging.py` module alongside it—remember `sys.path[0]`!) and wait at most 15 minutes for Windows Task Scheduler to execute attacker Python straight as `SYSTEM`, achieving full host takeover!\n- **Complete Four-Step Remediation:**\n  1. Lock directory and file ACLs strictly to Administrators / SYSTEM (`icacls C:\\Scripts /inheritance:r ...` or `chown root:root && chmod 0755` on Linux) so non-admin users have zero write permissions anywhere along the script tree or its `venv`.\n  2. Drop task execution from `SYSTEM` down to a dedicated low-privilege service account holding **strictly minimum read permissions** over the log target.\n  3. Enforce absolute interpreter and script paths, hash/signature baselines over scripts, and monitor task definitions continuously against tampering.\n\n![Figure 4.10: How Writable Script Folders Cause Privilege Escalation](/assets/courses/cyber-04/c04_m04_l05_scheduler_privilege_escalation_risk.png)\n\n*Figure 4.10: Privilege escalation attack path when a SYSTEM scheduled task executes a user-writable Python file.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Vulnerable Attack Path (`NT AUTHORITY\\SYSTEM` + Weak ACL):** When a privileged scheduled task invokes `C:\\Scripts\\collect.py` every 15 minutes inside a folder where standard `Users` hold write permissions, an attacker edits `collect.py` (or plants a fake `logging.py` sibling module) and waits for the scheduler to run malicious code as `SYSTEM`.\n- **Hardened Remediation Stack:** Lock `C:\\Scripts` and `venv` ACLs strictly to `Administrators` / `SYSTEM`, lower the task identity to a read-only service user, pin absolute Python + script paths, and monitor script hashes continuously.\n\n## 5. Hardening Scheduled Tasks Checklist (Figure 4.9 / `C04-M04-F3`)\n\nApply all five scheduling controls uniformly across every host deployment:\n\n- **Dedicated Least-Privilege Account:** Avoid `SYSTEM` / `root` whenever read-only log audit or delegated API access suffices.\n- **Admin-Only Script & `venv` Permissions:** Lock directory ACLs so standard accounts cannot inject scripts or sibling `.py` modules.\n- **Explicit Absolute Paths & Working Directory:** Never trust inherited `%PATH%` or relative working paths; specify `WorkingDirectory` and full `python.exe` + script paths cleanly.\n- **Prevent Overlapping Runs:** Enable Task Scheduler's *\"Do not start a new instance\"* rule (or Linux `flock` / PID file lock) so slow jobs never pile up infinitely if a share stalls.\n- **Dual Telemetry (Errors + Missing Heartbeat):** Log start/end timestamps and errors to disk/syslog **and** configure dead man's switch alerts when expected runs stop checking in.\n\n![Figure 4.9: Five Essential Rules for Safe Scheduled Python Tasks](/assets/courses/cyber-04/c04_m04_l05_safe_scheduled_automation_flow.png)\n\n*Figure 4.9 (C04-M04-F3): End-to-end hardened scheduling architecture from least-privilege account binding through monitoring.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Five-Control Scheduling Pipeline:** **1. Low-Privilege Account** (`rk_svc` instead of `SYSTEM`/`root`), **2. Admin-Locked Folders** (strict Admins/`SYSTEM` ACLs over scripts and `venv`), **3. Exact Full Paths** (`/opt/rk-tools/venv/bin/python /opt/rk-tools/check.py`), **4. Overlap Protection** (`\"Do not start a new instance\"` or `flock`/PID lock), and **5. Error + Heartbeat Alerts** (logging failures plus alerting if scheduled check-ins go missing)."
    },
    {
      "id": "les_c4_m4_l6",
      "title": "4.6 Designing Idempotent, Dry-Run-Safe, Observable Automation",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Engineer production automation around idempotency (check-before-act), mandatory --dry-run preview modes, deterministic exit codes, finite timeouts, structured audit logs, and practical evidence-copier labs.",
      "learning_objectives": [
        "Design idempotent check-before-act workflows so repeated scheduled runs cause zero duplicate state corruption",
        "Implement safe --dry-run simulation paths enabling operators to preview destructive or state-changing actions",
        "Enforce unambiguous non-zero exit codes, structured timestamped logging, and secret redaction across CLI scripts",
        "Synthesize OS automation safeguards in Practical P1 (recent-evidence copier) and P2 (anti-injection wrapper)"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-04-11",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l06_idempotency_dry_run_lockfile.png",
          "caption": "Figure 4.11: Idempotent check-before-act decision tree with --dry-run preview branch and single-instance lock protection.",
          "placement_hint": "After Section 3 (Idempotency and Non-Destructive Dry Runs)"
        },
        {
          "id": "fig-04-04-12",
          "asset_path": "/assets/courses/cyber-04/c04_m04_l06_automation_exit_codes_telemetry.png",
          "caption": "Figure 4.12: Operational automation telemetry pipeline pairing exit-code propagation, finite timeouts, and cleanup guarantees.",
          "placement_hint": "After Section 4 (Timeouts, Exit Codes, and Operational Logging)"
        }
      ],
      "images": [
        {
          "id": "fig-04-04-11",
          "title": "Figure 4.11: Safe Repeat Automation: Lockfiles, --dry-run & Check-Before-Act",
          "url": "/assets/courses/cyber-04/c04_m04_l06_idempotency_dry_run_lockfile.png",
          "caption": "Figure 4.11: Idempotent check-before-act decision tree with --dry-run preview branch and single-instance lock protection.",
          "alt": "Flowchart running from 1. Single-Instance Lock Check (YES exits cleanly to avoid races) through 2. Idempotent Check-Before-Act (skipping duplicates instead of blindly appending rules) to 3. --dry-run flag splitting into preview log-only simulation versus safe shutil.copy2() execution"
        },
        {
          "id": "fig-04-04-12",
          "title": "Figure 4.12: Production Automation: Timeouts, Clean Logs & Exit Codes",
          "url": "/assets/courses/cyber-04/c04_m04_l06_automation_exit_codes_telemetry.png",
          "caption": "Figure 4.12: Operational automation telemetry pipeline pairing exit-code propagation, finite timeouts, and cleanup guarantees.",
          "alt": "Three-stage pipeline combining 1. Bounded Timeouts (timeout=30), 2. Clean Timestamped Logs (never logging passwords, tokens, or CLI secrets), and 3. Honest Exit Codes (0 on success vs sys.exit(1) on errors), above a full-width 4. Guaranteed Cleanup try/finally bar with shutil.rmtree(work)"
        }
      ],
      "lab_resources": [
        {
          "name": "m04_os_automation.py",
          "url": "/assets/courses/cyber-04/labs/m04_os_automation.py",
          "description": "Module 4 OS traversal, CWE-22 & subprocess security lab script"
        }
      ],
      "content": "## 1. Engineering Resilient Automation Scripts That Fail Safely\n\nRunning a script once from your laptop differs sharply from operating unattended automation across dozens of production endpoints over years. Hardware stutters, target folders shift, files disappear halfway through, and nervous engineers rerun crashed scripts twice by hand. Robust defensive automation absorbs retries safely (**idempotency**), previews destructive steps cleanly (**`--dry-run`**), never hangs indefinitely (**timeouts**), leaves verifiable telemetry (**timestamps + exit codes**), and cleans up temporary scratch state cleanly.\n\n## 2. Core Objectives for This Lesson\n\n- **Idempotent Execution:** Write check-before-act automation so executing the identical script two or ten times yields identical safe end state without duplicate artifacts or corruption.\n- **Safe `--dry-run` Previews:** Expose explicit simulation flags (`argparse` `--dry-run` mirroring PowerShell `-WhatIf`) before modifying permissions, copying volumes, or disabling accounts.\n- **Deterministic Exit & Log Hygiene:** Return explicit POSIX/Windows exit codes (`0` success, non-zero errors), log structured outcomes cleanly without secrets, and clean scratch directories deterministically.\n- **Capstone Practice Labs:** Complete Practical P1 (safe recent-evidence SHA-256 copier) and Practical P2 (hardening an injectable command wrapper + disposable schedule test).\n\n## 3. Idempotency and Non-Destructive Dry Runs\n\nAn operation is **idempotent** if running it $k \\ge 1$ times produces the exact same intended system state as running it once cleanly with zero side-effect duplication or errors:\n\n- **Non-Idempotent Bug:** Appending `\"allow ip 203.0.113.7\"` unconditionally to a blocklist file—running twice duplicates rules; deleting and recreating user accounts blindly breaks security SIDs/UIDs and history!\n- **Idempotent Design:** **Check current state before acting**—verify whether user `\"bob\"` is already present or whether rule entry X already exists in the destination baseline before adding or modifying; copy/overwrite manifests atomically via `shutil.copy2()` cleanly on mismatch rather than aborting or corrupting prior artifacts.\n- **Operator Preview (`--dry-run`):** Accept `--dry-run` via `argparse`, log `\"DRY-RUN: would copy sub/c.log -> vault/sub/c.log\"` cleanly, compute metrics accurately, and skip every disk/state write step cleanly until the analyst removes `--dry-run`.\n\n![Figure 4.11: Safe Repeat Automation: Lockfiles, --dry-run & Check-Before-Act](/assets/courses/cyber-04/c04_m04_l06_idempotency_dry_run_lockfile.png)\n\n*Figure 4.11: Idempotent check-before-act decision tree with --dry-run preview branch and single-instance lock protection.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Three-Step Decision Flow:** **1. Single-Instance Lock Check** exits immediately if another instance holds the lock (preventing race conflicts), **2. Idempotent Check-Before-Act** compares target state before writing so retries copy only missing or changed files instead of appending duplicates, and **3. `--dry-run` Flag Gate** routes simulations to preview logging (`\"DRY-RUN: would copy sub/c.log -> vault/sub/c.log\"`) with zero disk modifications versus live `shutil.copy2()` updates.\n\n## 4. Timeouts, Exit Codes, and Operational Logging Checklist\n\nVerify these six production properties across every automation script before moving to Module 5 networking:\n\n- **Finite Timeouts on Every External Boundary:** Subprocess runs (`timeout=30`), network sockets, HTTP clients, and file share probes must fail loudly cleanly rather than stalling unattended workers (Scenario `C04-M04-S2`).\n- **Meaningful Exit Codes:** Propagate `0` strictly on verified completion and `1`/`2` (explicit `sys.exit(1)`) on failed preconditions, unreachable shares, or runtime errors so schedulers and CI gates halt downstream dependents accurately.\n- **Overlap Guards:** Protect scheduled batch jobs from concurrent self-race corruption using scheduler serialization or OS lockfiles.\n- **Timestamped Audit Logs Without Secrets:** Record start time, resolved target parameters, counts processed, errors (`log.exception`), and exit status—never log tokens, passwords, or full `Authorization` headers in either log streams or process command-line arguments (`ps` / Task Manager exposes argv globally!).\n- **Strict Cleanup (`try / finally` or Context Managers):** Mirror `m04_os_automation.py` step 7 (`shutil.rmtree(work)` -> `7. cleaned up: True`) inside `tempfile.TemporaryDirectory()` so aborted crashes leave zero orphaned scratch debris behind.\n\n![Figure 4.12: Production Automation: Timeouts, Clean Logs & Exit Codes](/assets/courses/cyber-04/c04_m04_l06_automation_exit_codes_telemetry.png)\n\n*Figure 4.12: Operational automation telemetry pipeline pairing exit-code propagation, finite timeouts, and cleanup guarantees.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Bounded Execution & Log Hygiene:** Enforce finite timeouts (`timeout=30`) across child tools, network sockets, and shares (`1. Bounded Timeouts`), record start/end timestamps, counts, and errors without secrets (`2. Clean Timestamped Logs`), and propagate honest return codes (`Exit 0` on success vs. `sys.exit(1)` on errors, `3. Honest Exit Codes`).\n- **Guaranteed Cleanup (`4. Guaranteed Cleanup`):** `try / finally` blocks and `tempfile.TemporaryDirectory` invoke `shutil.rmtree(work)` even if a script crashes mid-run so temporary scratch folders never accumulate.\n\n## 5. Module 4 Practical Labs\n\nPerform both labs strictly inside isolated local test folders containing only synthetic scratch files you created yourself.\n\n### Practical C04-M04-P1: Safe Recent-Evidence Copier & Manifest Builder\n\n- **Objective:** Build an idempotent forensic collector copying files modified within the last $N$ minutes while enforcing path traversal defenses, `--dry-run`, and SHA-256 chain-of-custody logging.\n- **Prerequisites & Scope:** Complete Lessons 4.1–4.6; restrict source and destination strictly to scratch folders you create cleanly.\n- **Step-by-Step Procedure:**\n  1. Accept `source`, `dest`, `--minutes` (`int` validated cleanly in `[1, 1440]`), and optional `--dry-run` via `argparse`; verify `source` exists and is a directory.\n  2. Discover matching files recursively with `source.rglob(\"*\")`, keeping files whose `st_mtime` falls within the past `--minutes` cutoff (convert Unix float seconds to UTC cleanly via `datetime.fromtimestamp(t, tz=timezone.utc)`).\n  3. Build each relative destination path with `safe_join(dest, rel_path)` (`resolve()` + `is_relative_to()`), then copy files cleanly via `shutil.copy2()` (or print planned operations safely when `--dry-run` is active).\n  4. Compute each file's SHA-256 hex digest (`hashlib.sha256`, previewing Module 6) and write a structured UTF-8 JSON manifest capturing `relative_path`, `size`, `mtime`, and `sha256`.\n  5. Test edge cases deliberately using synthetic test filenames containing spaces, non-ASCII Unicode letters, and rejected traversal entries containing `\"..\"`, then remove test folders when verified.\n\n### Practical C04-M04-P2: Find and Eliminate Command Injection (`CWE-78`)\n\n- **Objective:** Reproduce the harmless `m04_os_automation.py` injection contrast, build a strictly validated allowlist wrapper, and practice safe scheduling + teardown.\n- **Authorised Scope:** Local machine only; harmless echo printing and a temporary personal scheduled test removed immediately afterward.\n- **Step-by-Step Procedure:**\n  1. Run `python m04_os_automation.py` cleanly and inspect Section 5 showing `INJECTED` running under `shell=True` versus intact plain text inside an argv list.\n  2. Experiment in a local copy using alternative harmless shell separator strings (`\"x | echo PIPED\"` on Windows, `\"x; echo PIPED\"` on POSIX `/bin/sh`) to verify metacharacter splitting under `shell=True`.\n  3. Implement `def run_report(name: str) -> str:` enforcing `re.fullmatch(r\"[A-Za-z0-9._-]{1,64}\", name)` first and raising `ValueError` on any violation before invoking `subprocess.run([sys.executable, ...], shell=False, timeout=10, check=True)`. Prove spaces, `&`, `|`, and `-leading` payloads fail cleanly before process creation.\n  4. Optionally create and trigger a harmless Task Scheduler / `cron` run referencing exact absolute paths (`schtasks /Create ...` / `/Query` / `crontab -e`), verify log output, and delete the test task immediately (`schtasks /Delete /TN ... /F`).\n\n## 6. Module 4 Consolidated Revision\n\nReview path containment, subprocess argument isolation, scheduler hardening, and idempotent operational safeguards before completing the Module 4 check.\n\n### Core Technical Takeaways\n\n- **Environment & Path Hygiene:** Treat `os.environ[\"PATH\"]` and `PYTHONPATH` as untrusted inside elevated runs; pin `sys.executable` and absolute tool paths, walk files cleanly via `Path.rglob()`, preserve metadata with `shutil.copy2()`, and gate untrusted path joins unconditionally with `resolve().is_relative_to()`.\n- **Process Orchestration (`CWE-78` Immunity):** Prefer native stdlib (`pathlib`, `shutil`, `zipfile`) first; whenever spawning processes is necessary, use `subprocess.run([prog, ...], capture_output=True, text=True, timeout=..., check=True)` with `shell=False`, allowlist validation (`re.fullmatch`), and `--` option barriers—never `os.system()`, `eval()`, or unvalidated `shell=True`.\n- **Hardened Operations:** Run scheduled automation via least-privilege accounts in admin-writable-only folders (`T1053` defense), enforce idempotency, provide `--dry-run`, emit meaningful exit codes, avoid secrets in logs or CLI flags, and alert on missing heartbeats.\n\n### Quick Revision Checkpoints\n\n1. Rewrite the unsafe snippet `os.system(f\"ping -c 1 {host}\")` securely using Python allowlist validation (`ipaddress` or strict hostname regex), explicit `--` barrier if needed, `subprocess.run` argument list, finite `timeout`, and `check=True`.\n2. Explain precisely why naive substring defense `if \"..\" in user_path:` fails to stop all `CWE-22` path traversal attacks while `Path.resolve()` paired with `.is_relative_to(base.resolve())` succeeds.\n3. Enumerate five mandatory hardening controls required whenever deploying a Python security script into Windows Task Scheduler or a Linux `systemd` timer."
    }
  ]
};
