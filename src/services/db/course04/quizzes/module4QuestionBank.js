/**
 * Course 04: Python for Cybersecurity — Module 4 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module4QuestionBank = [
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
  },
  {
    "id": "q_c4_m4_021",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "In Case Study C04-M04-CS2 (Marigold Insurance Brokers fictional scenario), how did an attacker escalate privileges cleanly to local Administrator via help-desk tickets?",
    "options": [
      "Exploited a buffer overflow in `ipaddress`",
      "Overwrote Task Scheduler XML backups",
      "Submitted ticket username `'bob & net localgroup administrators bob /add'`, which ran via `subprocess.run(f'net user {name} /active:yes', shell=True)` as Administrator",
      "Uploaded a malicious `.pkl` ticket attachment"
    ],
    "correct": 2,
    "explanation": "Formatting untrusted ticket fields into an Administrator-privileged `shell=True` command gave any ticket submitter arbitrary administrative OS execution."
  },
  {
    "id": "q_c4_m4_022",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "In Marigold's fix (CS2), notice they wrote `re.fullmatch(r'[A-Za-z0-9._-]{1,32}', name)` rather than `re.match(r'^[A-Za-z0-9._-]{1,32}$', name)`. Why is `.fullmatch()` critically safer against trailing-newline bypasses in Python regex allowlists?",
    "options": [
      "`re.match` skips lowercase letters automatically",
      "`fullmatch` escapes shell characters automatically",
      "In Python `re`, trailing `$` STILL matches BEFORE a final `'\\n'` newline character (`'bob\\n& evil'` passes `$` unless guarded cleanly!), whereas `re.fullmatch()` requires matching the ENTIRE string up to EOF!",
      "`.match()` only validates strings under 16 bytes"
    ],
    "correct": 2,
    "explanation": "Classic Python `re` trap: `$` permits a trailing `\\n` (`\\Z` or `re.fullmatch` strips that loophole cleanly)!"
  },
  {
    "id": "q_c4_m4_023",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Why must scheduled tasks run Python scripts inside a dedicated admin-writable-only folder (`C:\\Scripts` restricted to Administrators/SYSTEM) rather than a directory writable by `Users`?",
    "options": [
      "If standard users can modify the script or drop a hijacked module in that folder, the scheduled task executes attacker code automatically under its elevated service/SYSTEM privileges!",
      "Python refuses importing modules from writable folders",
      "Task Scheduler ignores relative logs otherwise",
      "Windows locks `Users` write paths cleanly on Task Scheduler startup"
    ],
    "correct": 0,
    "explanation": "Writable script trees executed by high-privilege schedulers create textbook local privilege escalation (`CWE-732` / ATT&CK `T1053`)."
  },
  {
    "id": "q_c4_m4_024",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Look at how Windows `schtasks /Create /TN \"RK-C04-Demo\" /TR \"\\\"C:\\Python314\\python.exe\\\" -c \\\"print(1)\\\"\"` wrapped paths cleanly. Suppose a developer writes `/TR \"C:\\Program Files\\Python312\\python.exe C:\\sec tools\\scan.py\"` WITHOUT inner escaped quotes around executable/script paths containing spaces. What two hazards result?",
    "options": [
      "Task fails cleanly with SyntaxError",
      "Windows automatically removes spaces during creation",
      "Unquoted Windows spaces cause Windows CreateProcess path ambiguity: Windows probes `'C:\\Program.exe'` then `'C:\\sec.exe'` first, enabling **unquoted service/task path binary planting** alongside broken script paths!",
      "Python parses both files concurrently"
    ],
    "correct": 2,
    "explanation": "Always quote full executable and script paths containing whitespace inside Windows Task Scheduler `/TR` entries cleanly (or avoid spaces via `/opt/rk-tools/` / `C:\\rk-tools\\`)."
  },
  {
    "id": "q_c4_m4_025",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "When scheduling a Linux script with `cron` or a `systemd` timer that relies on third-party packages verified in Module 2, which interpreter path should appear in `ExecStart=` / crontab?",
    "options": [
      "Bare `python` relying on login profile `PATH`",
      "`sudo pip run check.py`",
      "Absolute path straight to the virtual environment interpreter (e.g., `/opt/rk-tools/venv/bin/python /opt/rk-tools/check.py`)",
      "`python -m shell`"
    ],
    "correct": 2,
    "explanation": "Bypassing `activate` and pointing straight to `/opt/.../venv/bin/python` ensures deterministic isolation inside `cron`/`systemd` non-login shells."
  },
  {
    "id": "q_c4_m4_026",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Why does disabling overlapping runs (e.g., Windows Task Scheduler 'Do not start a new instance' or Linux `flock`) matter critically for a 5-minute evidence scanner?",
    "options": [
      "Parallel Python interpreters share local variables globally",
      "`venv` deletes files accessed by two processes simultaneously",
      "Schedulers run overlapping tasks in reverse chronological order",
      "If a slow network share causes run #1 to take 20 minutes without overlap protection, runs #2, #3, #4 pile up every 5 minutes—racing on manifests/logs cleanly until host RAM/CPU collapses!"
    ],
    "correct": 3,
    "explanation": "Pile-up prevention + per-call finite timeouts keep degraded network targets from exhausting host resources cleanly."
  },
  {
    "id": "q_c4_m4_027",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "What defines an **idempotent** security automation script?",
    "options": [
      "Safe to execute repeatedly—checks existing state first so running twice achieves identical final state without duplicating records or breaking configuration",
      "Runs silently with bare `except: pass`",
      "Automatically installs `pip` upgrades on each run",
      "Runs only once per operating system installation"
    ],
    "correct": 0,
    "explanation": "Check-before-act logic guarantees safe retries after partial network or scheduler failures."
  },
  {
    "id": "q_c4_m4_028",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Compare two scripts implementing `--dry-run` (analogous to PowerShell `-WhatIf`) for cleaning stale evidence backups: Script A skips both file lookup logic AND validation completely inside `if dry_run: print('ok'); return`, whereas Script B performs full input parsing, path containment (`safe_join`), candidate discovery, and logs exact intended actions while gating ONLY the disk mutation step on `if not args.dry_run:`. Why is Script B far superior?",
    "options": [
      "Script B proves every permission, filter, `safe_join` check, and affected path cleanly BEFORE mutating state—catching bugs/wild-card errors safely during dry runs rather than masking them!",
      "Script A tests disk writes accidentally",
      "Script B deletes fewer directories by random sampling",
      "`if dry_run:` cannot print candidate paths"
    ],
    "correct": 0,
    "explanation": "A genuine dry run validates inputs, discovers exact targets, and prints precise planned changes cleanly without executing mutations."
  },
  {
    "id": "q_c4_m4_029",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In Practical P1 (Safe Evidence Copier), why does step 3 generate a JSON manifest storing `{relative_path, size, mtime, sha256}` alongside copied evidence files?",
    "options": [
      "JSON manifests encrypt files automatically",
      "`shutil.copy2()` omits filenames otherwise",
      "Provides tamper-evident integrity hashes (`sha256`) and immutable forensic timestamp/path provenance records cleanly",
      "Task Scheduler requires `.json` files inside `/tmp`"
    ],
    "correct": 2,
    "explanation": "Recording SHA-256 digests and relative paths/timestamps immediately upon acquisition establishes provable forensic integrity."
  },
  {
    "id": "q_c4_m4_030",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "In `m04_os_automation.py` step 2, look closely at `[str(p.relative_to(work)).replace('\\\\', '/') for p in logs]`. Why did the script replace backslashes `'\\\\'` with `'/'` manually after calling `.relative_to(work)`?",
    "options": [
      "`Path.relative_to()` fails on Linux otherwise",
      "On Windows, `str(Path('sub/c.log'))` renders `'sub\\\\c.log'`; normalizing path strings with `.as_posix()` (or `.replace('\\\\', '/')`) ensures deterministic cross-OS manifests matching `['a.log', 'b.log', 'sub/c.log']`!",
      "`replace('\\\\', '/')` prevents `CWE-22` path traversal",
      "`relative_to` prints absolute drive letters cleanly"
    ],
    "correct": 1,
    "explanation": "`Path.as_posix()` or explicit backslash normalization creates portable manifests (`sub/c.log`) across Windows and POSIX hosts."
  },
  {
    "id": "q_c4_m4_031",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "Which `os` constant equals `';'` on Windows and `':'` on Linux/macOS?",
    "options": [
      "`os.pathsep`",
      "`os.sep`",
      "`os.extsep`",
      "`os.linesep`"
    ],
    "correct": 0,
    "explanation": "`os.pathsep` separates directory search list entries in `PATH`/`PYTHONPATH`; `os.sep` separates path folders (`\\` vs `/`)."
  },
  {
    "id": "q_c4_m4_032",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "When launching an external utility via `subprocess.run(['/usr/bin/scan', target], env=clean_env)` from a security script, why might explicitly constructing a minimal `env={'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8'}` be safer than forwarding `os.environ` intact?",
    "options": [
      "`subprocess.run` refuses running if `os.environ` has > 20 keys",
      "Clean environments compress stdout faster",
      "`env={...}` runs commands inside kernel sandboxes automatically",
      "Strips untrusted caller variables (`LD_PRELOAD`, `PYTHONPATH`, hijacked `PATH`) AND ensures parent cloud API credentials in `os.environ` never leak into external third-party child binaries!"
    ],
    "correct": 3,
    "explanation": "Least-privilege child environments prevent both secret leakage *outward* to child utilities and loader/library hijacking *inward* via inherited env vars."
  },
  {
    "id": "q_c4_m4_033",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, how did the script inspect whether each `.log` file exceeded `100 bytes` cleanly?",
    "options": [
      "`len(p.read_bytes()) > 100`",
      "`p.stat().st_size > 100`",
      "`p.size() > 100`",
      "`os.len(p) > 100`"
    ],
    "correct": 1,
    "explanation": "`p.stat().st_size` inspects directory metadata without allocating file bytes in RAM."
  },
  {
    "id": "q_c4_m4_034",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Notice a classic symlink security nuance on Windows/Linux: suppose `base = Path('/var/app/extract')` holds a pre-existing symlink `/var/app/extract/link -> /etc` created inside an extracted archive BEFORE reading `safe_join(base, 'link/shadow')`. Does `safe_join` using `Path.resolve().is_relative_to(base.resolve())` catch this symlink escape cleanly?",
    "options": [
      "No, `resolve()` ignores symbolic links completely",
      "`is_relative_to()` creates missing symlinks automatically",
      "Only if you use `os.path.abspath()` instead",
      "Yes! `Path.resolve()` follows all intermediate symbolic links on disk down to `/etc/shadow`, and `is_relative_to('/var/app/extract')` returns `False`, raising `ValueError` before opening the file!"
    ],
    "correct": 3,
    "explanation": "Crucial distinction: `os.path.abspath()` only collapses `..` lexically without following symlinks, whereas `Path.resolve()` follows symlinks to catch symlink-escape attacks too!"
  },
  {
    "id": "q_c4_m4_035",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Without passing `text=True` (or `encoding='utf-8'`) inside `subprocess.run(..., capture_output=True)`, what type does `result.stdout` contain?",
    "options": [
      "`str` automatically",
      "`bytes` (raw un-decoded octets)",
      "`list[str]`",
      "`None`"
    ],
    "correct": 1,
    "explanation": "Setting `text=True` decodes stdout/stderr into `str`; leaving it unset returns raw `bytes` (useful when piping binary tool outputs)."
  },
  {
    "id": "q_c4_m4_036",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Compare `os.system('dir > out.txt')` with `subprocess.run(...)`. List TWO clear operational defects fixed immediately by `subprocess.run`:",
    "options": [
      "`os.system` fails on Python 3.12+; `subprocess` requires admin rights",
      "`os.system` automatically calls `resolve()` on file paths",
      "`os.system` ignores `timeout` only on Linux",
      "`os.system` always passes strings straight into a shell (enabling CWE-78) AND offers **no timeout parameter**, no captured stdout/stderr streams, and non-portable shell return code wrappers—all solved cleanly by `subprocess.run`!"
    ],
    "correct": 3,
    "explanation": "Standard security coding guides ban `os.system()` across modern Python codebases in favor of structured `subprocess.run()`."
  },
  {
    "id": "q_c4_m4_037",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Which function call from standard Python modules allows arbitrary Python code execution on untrusted strings and must be strictly avoided alongside `shell=True`?",
    "options": [
      "`int()`",
      "`eval()` / `exec()`",
      "`json.loads()`",
      "`ipaddress.ip_address()`"
    ],
    "correct": 1,
    "explanation": "Never feed untrusted input to `eval()`, `exec()`, `os.system()`, or `subprocess.run(..., shell=True)`."
  },
  {
    "id": "q_c4_m4_038",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "On Linux POSIX shells (`/bin/sh` or `bash`), besides `;`, `&`, and `|`, what command-substitution metacharacter pairs inside double-quoted shell strings `f\"ping -c 1 \\\"{host}\\\"\"` STILL allow attacker execution cleanly when `shell=True`?",
    "options": [
      "Square brackets `[host]`",
      "Trailing slashes `/`",
      "Single quotes inside double quotes",
      "`$(cmd)` and backticks `` `cmd` ``—shells evaluate command substitutions *inside* double quotes even when spaces are protected!"
    ],
    "correct": 3,
    "explanation": "Ad-hoc quoting (`f'\"{input}\"'`) never secures `shell=True`: double quotes still expand `$(...)`, backticks, and `$ENV` cleanly; drop `shell=True` completely."
  },
  {
    "id": "q_c4_m4_039",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "In the Module 4 test environment (`Course 04` / `Course 03 Module 4`), roughly how many built-in OS and software scheduled tasks existed on the clean baseline Windows 11 host?",
    "options": [
      "0",
      "194 scheduled tasks (`Get-ScheduledTask`)",
      "5",
      "10,000 tasks"
    ],
    "correct": 1,
    "explanation": "Normal OS baselines contain hundreds of legitimate entries (194 observed), making baseline inventory diffing vital for catching unauthorized persistence (ATT&CK T1053)."
  },
  {
    "id": "q_c4_m4_040",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Reviewing Scenario S3 cleanly: if an auditor restricts NTFS ACLs on `C:\\Scripts` so only Administrators/SYSTEM can write to `collect.py` AND switches the Scheduled Task account from `SYSTEM` to a dedicated read-only service user, which TWO security principles are simultaneously satisfied?",
    "options": [
      "Idempotency + DRY-RUN preview",
      "Thread safety + JSON formatting",
      "O(1) hash indexing + UTF-8 compatibility",
      "Script/integrity protection against tampering (closing local privilege escalation) AND Least Privilege (limiting blast radius if the script itself ever contains a parsing flaw)!"
    ],
    "correct": 3,
    "explanation": "Defense-in-depth combines protecting code/folder integrity (`chmod`/`icacls`) with dropping task identity down to least-privilege execution accounts."
  },
  {
    "id": "q_c4_m4_041",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Which exit status integer indicates clean normal completion by Unix, Windows, and CI runner conventions?",
    "options": [
      "`1`",
      "`0`",
      "`-1`",
      "`200`"
    ],
    "correct": 1,
    "explanation": "Exit code `0` means success cleanly; any non-zero integer (`1`, `2`, etc.) flags operational/usage errors."
  },
  {
    "id": "q_c4_m4_042",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Why must automation scripts NEVER pass secrets (such as `--api-key=secret123` or `--password=...`) as CLI arguments into a `subprocess.run()` command line?",
    "options": [
      "`argparse` truncates flags containing equals signs",
      "CLI strings exceed 64 characters automatically",
      "`subprocess.run` converts passwords to lowercase",
      "Every local user or monitoring tool on the host can often read process command-line strings (`ps aux`, `/proc/<pid>/cmdline`, Windows Task Manager / Sysmon Event 1), exposing secrets permanently in OS process logs!"
    ],
    "correct": 3,
    "explanation": "Process argument arrays are broadly visible metadata across hosts and EDR logs; pass tokens via locked permission files, OS credential vaults, or subprocess `input=` stdin pipes cleanly."
  },
  {
    "id": "q_c4_m4_043",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In Practical P2 (`C04-M04-P2`), what safe allowlist regex pattern validates report names inside `run_report(name)`?",
    "options": [
      "`r'.*'`",
      "`re.fullmatch(r'[A-Za-z0-9._-]{1,64}', name)`",
      "`r'^[a-z]+$'` without length check",
      "`r'report\\s+.*'`"
    ],
    "correct": 1,
    "explanation": "Strict bounded character allowlisting rejects spaces, path slashes, quotes, `&`, `|`, `;`, and oversized strings right at validation entry."
  },
  {
    "id": "q_c4_m4_044",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Wait: look carefully at `re.fullmatch(r'[A-Za-z0-9._-]{1,64}', name)` in Practical P2 if a caller passes `name = '..'` OR `name = '-rf'`. Notice BOTH `'.'` and `'-'` sit inside `[A-Za-z0-9._-]`! What additional check closes BOTH option smuggling and `'..'` cleanly?",
    "options": [
      "Nothing can break `.fullmatch`",
      "Pass strings directly to `shell=True`",
      "Remove alphanumeric digits",
      "Explicitly forbid leading `'-'` (`not name.startswith('-')` / pass `'--'` separator) AND reject `'.'` / `'..'` (or contain paths with `safe_join`)—demonstrating why regex allowlists pair cleanly with semantic checks!"
    ],
    "correct": 3,
    "explanation": "Deep security engineering always inspects character-class edges: `.` allows `'..'`, and `-` allows `'-flag'` unless specifically barred at index 0 or contained cleanly."
  },
  {
    "id": "q_c4_m4_045",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, why did `Path.cwd().is_absolute()` return `True`?",
    "options": [
      "Only because the script ran inside `rk-m04-`",
      "Because `Path.cwd()` always returns the resolved full current working directory starting from root/drive",
      "Because `cwd` checks `PATH` entries",
      "`cwd` fails cleanly without `is_absolute()`"
    ],
    "correct": 1,
    "explanation": "An absolute path specifies complete location from drive/root (`C:\\...` or `/...`), unambiguously resolving targets regardless of future `chdir()`."
  },
  {
    "id": "q_c4_m4_046",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Suppose `work.rglob('*.log')` runs over a folder tree containing 100,000 cache subfolders inside `.git/` or `node_modules/` that you want to **skip completely** instead of entering. When is dropping down to `os.walk(work)` cleaner/faster than `.rglob()`?",
    "options": [
      "`.rglob()` never inspects subdirectories",
      "`.rglob()` skips `.hidden` folders automatically on Windows",
      "`os.walk()` fixes path traversal automatically",
      "`os.walk()` lets you prune unwanted directory names directly in-place (`dirnames[:] = [d for d in dirnames if d not in {'node_modules', '.git'}]`) BEFORE descending inside them, saving millions of unnecessary filesystem stats!"
    ],
    "correct": 3,
    "explanation": "Remember `os.walk()` exposes mutable `dirnames` lists for clean subtree pruning when walking giant enterprise filesystems."
  },
  {
    "id": "q_c4_m4_047",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Which exception class should a caller catch specifically when `subprocess.run(..., check=True)` fails because the external tool exited with code `3`?",
    "options": [
      "`ValueError`",
      "`subprocess.CalledProcessError`",
      "`subprocess.TimeoutExpired`",
      "`ZeroDivisionError`"
    ],
    "correct": 1,
    "explanation": "`err.returncode`, `err.cmd`, `err.stdout`, and `err.stderr` are carried cleanly on `CalledProcessError`."
  },
  {
    "id": "q_c4_m4_048",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Suppose you invoke `subprocess.run(['missing_binary'], capture_output=True)` when `'missing_binary'` does not exist on the machine (`shell=False`). Which exception fires—`CalledProcessError` or `FileNotFoundError`—and why?",
    "options": [
      "`CalledProcessError` with returncode 127",
      "`TimeoutExpired`",
      "`FileNotFoundError` (`OSError` subclass)! Because `shell=False` tries creating the process directly via OS loader instead of running a shell returning exit 127!",
      "Returns `None` silently"
    ],
    "correct": 2,
    "explanation": "Always handle `(subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError)` or `(OSError, subprocess.SubprocessError)` cleanly around external tool calls."
  },
  {
    "id": "q_c4_m4_049",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Which three POSIX shell characters commonly chain or inject extra commands inside unguarded `shell=True` strings alongside `&`?",
    "options": [
      "`.`, `,`, and `_`",
      "`;`, `|`, and `&&` (plus `$(...)`)",
      "`+`, `=`, and `@`",
      "`a`, `b`, and `c`"
    ],
    "correct": 1,
    "explanation": "Shell command separators and pipes (`;`, `&`, `&&`, `|`, `||`) and subshells (`$(...)`) let untrusted text execute arbitrary commands under `shell=True`."
  },
  {
    "id": "q_c4_m4_050",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Examine Scenario S1: `subprocess.run(f'zip -r {archive} {folder}', shell=True)` where `folder` arrives from a web form. Beside rewriting it cleanly without `shell=True` and with `safe_join` + `'--'`, what third Python standard-library refactor removes external process execution risk *completely*?",
    "options": [
      "Replace the `zip` binary call cleanly with Python's built-in `zipfile.ZipFile` or `shutil.make_archive()`, eliminating command & option injection altogether!",
      "Pass `zip` string inside `eval()`",
      "Quote `{folder}` using double quotes inside `os.system()`",
      "Pass `shlex.quote()` on Windows `cmd.exe`"
    ],
    "correct": 0,
    "explanation": "When Python stdlib (`zipfile`, `shutil`, `pathlib`) performs the archive job directly inside Python, CWE-78 subprocess surface drops cleanly to zero."
  },
  {
    "id": "q_c4_m4_051",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Which `schtasks` subcommand inspected `Next Run Time: 08/11/2026 03:00:00` and `Status: Ready` cleanly in Lesson 4.5?",
    "options": [
      "`schtasks /Inspect`",
      "`schtasks /Audit`",
      "`schtasks /Show`",
      "`schtasks /Query /TN \"RK-C04-Demo\" /FO LIST`"
    ],
    "correct": 3,
    "explanation": "`/Query /FO LIST` displays exact schedule status, next run timestamp, and execution action (`Task To Run`) cleanly."
  },
  {
    "id": "q_c4_m4_052",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Why should a scheduled `systemd` timer + `oneshot` service specify `User=rk_svc` AND explicit `WorkingDirectory=/opt/rk-tools` inside its unit configuration?",
    "options": [
      "`systemd` runs every Python file inside `/tmp` otherwise",
      "`WorkingDirectory=` compiles Python bytecode faster",
      "Explicit `User=` drops privilege away from `root` to a dedicated account (`CWE-250` least privilege), while `WorkingDirectory=` keeps relative diagnostics predictable rather than defaulting to `/`!",
      "`systemd` disables UTF-8 unless `User=` is set"
    ],
    "correct": 2,
    "explanation": "Never leave unattended services defaulting to `root` or undefined directories cleanly—always lock account scope and working paths explicitly."
  },
  {
    "id": "q_c4_m4_053",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Why must an evidence backup collector verify whether destination disk space or target availability succeeds BEFORE mutating live manifests?",
    "options": [
      "Python refuses writing files if disk free space is queried",
      "Idempotent pre-flight checks fail cleanly with non-zero status and informative logs instead of creating torn partial states on failure",
      "Pre-flight checks replace checksums completely",
      "Exit code 0 ignores disk-full errors automatically"
    ],
    "correct": 1,
    "explanation": "Fail-fast preconditions paired with atomic manifest writes keep retry behavior cleanly idempotent."
  },
  {
    "id": "q_c4_m4_054",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Notice Lesson 4.6 pairs finite timeouts with `log.exception(...)` and non-zero exit codes. Suppose a wrapper script calls `subprocess.run(['vendor_tool'], timeout=30, check=True)` inside a `try/except:` block that logs the failure cleanly and then finishes normally with `print('done')` WITHOUT calling `sys.exit(1)`! Why does Task Scheduler / CI falsely turn green?",
    "options": [
      "Catching `CalledProcessError` or `TimeoutExpired` without re-raising or exiting non-zero causes Python to fall off the end of `__main__` returning **exit code `0`**—hiding failures from schedulers and CI monitors identically to bare `except: pass`!",
      "Printing `'done'` sets exit code 1 automatically",
      "`subprocess.run` exits the parent process automatically",
      "Schedulers inspect console stdout instead of exit status"
    ],
    "correct": 0,
    "explanation": "If a CLI wrapper catches a fatal child exception purely to log it nicely, it MUST finish with `raise SystemExit(1)` (or non-zero `return 1` -> `sys.exit(main())`) so orchestration systems notice the failure!"
  },
  {
    "id": "q_c4_m4_055",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 3, which input succeeded cleanly inside `safe_join(work, name)`?",
    "options": [
      "`'../../Windows/win.ini'`",
      "`'..\\\\..\\\\boot.ini'`",
      "`'/etc/passwd'`",
      "`'sub/c.log'`"
    ],
    "correct": 3,
    "explanation": "`'sub/c.log'` resolved inside `work` cleanly (`3. ok: c.log`), whereas `'../../Windows/win.ini'` failed containment with `ValueError`."
  },
  {
    "id": "q_c4_m4_056",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "In Practical P1, step 1 states: `accept source, destination and minutes as arguments and validate them (minutes is an integer 1-1440; source exists)`. Suppose someone omits the `1-1440` ceiling check and an attacker/typo passes `--minutes=999999999999`. What two faults happen cleanly unless bounded?",
    "options": [
      "`argparse` truncates integers at 1440 automatically",
      "`rglob` stops reading after 24 hours automatically",
      "`time.time() - minutes * 60` overflows `datetime.fromtimestamp()` (`OSError`/`OverflowError`) or copies 50 years of unrelated archives, exhausting destination disk!",
      "`minutes` turns into strings silently"
    ],
    "correct": 2,
    "explanation": "Always bound numeric operational parameters (e.g., lookback window `1..1440`, timeout `1..600`, max batch size) cleanly at CLI entry."
  },
  {
    "id": "q_c4_m4_057",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "What does `Path.cwd()` return inside an executing Python script?",
    "options": [
      "The directory where Python is installed",
      "A `Path` representing the current working directory from which the process is operating",
      "Only user home folders",
      "Always `'C:\\\\Windows\\\\System32'`"
    ],
    "correct": 1,
    "explanation": "`Path.cwd()` queries the OS process's current working directory."
  },
  {
    "id": "q_c4_m4_058",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Suppose an attacker supplies an archive containing path `'sub/../../../Windows/win.ini'`. Why did simple naive stripping `name.replace('../', '')` fail catastrophically in real security advisories (`'....//....//Windows/win.ini'`)?",
    "options": [
      "Removing `'../'` once inside nested `'....//'` collapses the outer `'..'` + `'/'` left behind directly back into `'../../'`! Canonical `.resolve()` + `.is_relative_to()` has ZERO recursive sanitizer bypasses!",
      "`.replace()` skips lowercase text",
      "`replace()` deletes `'sub/'` first",
      "Windows resolves `'....//'` identically to `'/'`"
    ],
    "correct": 0,
    "explanation": "Never hand-roll string `.replace('../', '')` blacklists; always canonicalize with `Path.resolve()` and enforce containment via `.is_relative_to()`."
  },
  {
    "id": "q_c4_m4_059",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "In `subprocess.run([sys.executable, '-c', code], ...)`, what is the default boolean value of `shell` in Python 3 if omitted?",
    "options": [
      "`shell=True`",
      "`None`",
      "`True` on Windows and `False` on Linux",
      "`shell=False`"
    ],
    "correct": 3,
    "explanation": "`subprocess.run()` defaults safely to `shell=False`; command injection vulnerabilities happen when authors explicitly add `shell=True`."
  },
  {
    "id": "q_c4_m4_060",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "An engineer invokes `subprocess.run(f'/usr/bin/sha256sum {filepath}')` WITH NO `shell=True` (`shell=False` default) on Linux, passing a single **string** rather than a `[program, arg]` **list**! What happens cleanly on Linux vs Windows?",
    "options": [
      "Works identically on Linux and Windows",
      "`subprocess.run` splits single strings safely with `shlex` automatically",
      "On POSIX Linux (`shell=False`), passing a single unified string looks literally for an executable file named `'/usr/bin/sha256sum foo.txt'` with spaces in its filename—immediately raising `FileNotFoundError`! Always pass an explicit argument **list** `[prog, arg]`!",
      "Raises `TypeError` on Windows"
    ],
    "correct": 2,
    "explanation": "Passing a list (`[prog, arg1, arg2]`) is portable and clean across both POSIX (`execve`) and Windows (`CreateProcess`) with `shell=False`."
  },
  {
    "id": "q_c4_m4_061",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Why should you prefer `subprocess.run([prog, arg], shell=False)` over `os.system(...)` whenever running external tools?",
    "options": [
      "`os.system` does not return numbers",
      "`subprocess.run` with an argument list bypasses shell parsing completely, supports explicit timeouts, captures stdout/stderr cleanly, and validates exit codes via `check=True`",
      "`os.system` runs only on Python 2",
      "`subprocess.run` bypasses Windows firewall prompts"
    ],
    "correct": 1,
    "explanation": "`os.system()` always executes via a shell and lacks timeout and stream control."
  },
  {
    "id": "q_c4_m4_062",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Even inside an isolated argument list (`shell=False`), suppose a tool wrapper passes `user_input = 'data.txt'` into `subprocess.run(['tar', '-xf', user_input])` vs `subprocess.run(['tar', '--', '-xf', user_input])` vs malicious `user_input = '--to-command=whoami'`. Why can some external binaries STILL trigger command execution even with `shell=False`?",
    "options": [
      "Certain rich CLI binaries (`tar --checkpoint-action=exec=...`, `git`, `find -exec`, `ssh -oProxyCommand=...`) have **built-in flag features that execute commands themselves**! Validate strictly against safe allowlists AND separate user data using `'--'`!",
      "`subprocess.run` converts `--` flags back into `shell=True`",
      "Only Windows binaries support CLI flags",
      "All Linux utilities block arbitrary flags under Python"
    ],
    "correct": 0,
    "explanation": "Option injection into powerful CLI flags (`tar`, `find`, `ssh`, `curl -K`) bypasses `shell=False` unless `'--'` and leading-dash blocking / allowlists protect arguments."
  },
  {
    "id": "q_c4_m4_063",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Under Linux, which modern alternative to classic `crontab` runs Python scripts cleanly via paired `.service` (`ExecStart=`, `User=`, `WorkingDirectory=`) and `.timer` unit files?",
    "options": [
      "`cron.exe`",
      "`venv.daemon`",
      "`shutil.schedule()`",
      "`systemd` service and timer units"
    ],
    "correct": 3,
    "explanation": "`systemd` timers provide built-in journal logging, exact account isolation (`User=`), resource limits, and randomized jitter cleanly."
  },
  {
    "id": "q_c4_m4_064",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Reviewing Windows Task Scheduler cleanup in Lesson 4.5 (`schtasks /Delete /TN \"RK-C04-Demo\" /F`): why do blue-team runbooks examine BOTH Task Scheduler entries AND modified NTFS permissions on scripts executed by `SYSTEM` during incident hunts?",
    "options": [
      "Attackers delete Task Scheduler entirely after login",
      "`schtasks /Delete` runs scripts before deleting them",
      "Even without adding a NEW scheduled task (`T1053`), if an existing `SYSTEM` task invokes a misconfigured user-writable Python file or folder (or drops a planted module alongside it!), modifying that script gives silent `SYSTEM` persistence without triggering new-task creation alerts!",
      "`Get-ScheduledTask` shows only disabled tasks"
    ],
    "correct": 2,
    "explanation": "Defenders audit both new scheduled tasks AND ACL integrity of every existing script/executable referenced by elevated tasks."
  },
  {
    "id": "q_c4_m4_065",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Look at Scenario S2: a nightly evidence-collection script occasionally hangs indefinitely when a remote SMB network share becomes unreachable. Which fix addresses that availability defect directly?",
    "options": [
      "Remove `try/except` cleanly",
      "Enforce finite timeouts on every network/external probe, verify share reachability first, log errors, exit non-zero, prevent overlap, and alert on missing completions",
      "Run twice simultaneously via `crontab`",
      "Switch from `pathlib` to `eval()`"
    ],
    "correct": 1,
    "explanation": "External dependencies fail regularly; timeouts, pre-checks, locking, exit codes, and dead man's switch alerts prevent infinite hangs."
  },
  {
    "id": "q_c4_m4_066",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose an idempotent firewall-sync script wants to ensure `'203.0.113.7'` is present cleanly inside `blocklist.json` even if two runs occur back-to-back or crash mid-write. Compare `open('blocklist.json', 'w')` vs writing `blocklist.json.tmp` and calling `tmp.replace(target)`. Why is temp-then-replace superior?",
    "options": [
      "Updating via a same-directory temp file followed by atomic `Path.replace()` ensures the live `blocklist.json` is never observed half-written/truncated if power fails or the process is killed midway!",
      "`tmp.replace(target)` skips `pathlib` bounds checks",
      "`'w'` mode preserves previous contents automatically if killed",
      "JSON ignores empty files cleanly"
    ],
    "correct": 0,
    "explanation": "Atomic same-filesystem rename (`Path.replace`) guarantees readers see either the clean old file or the complete new file—never corrupt partial writes."
  },
  {
    "id": "q_c4_m4_067",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, what output confirms the script cleaned up its scratch workspace at termination?",
    "options": [
      "`7. removed: 0`",
      "`rc = 0`",
      "`shutil.which` returned `None`",
      "`7. cleaned up: True`"
    ],
    "correct": 3,
    "explanation": "`shutil.rmtree(work)` deleted the folder cleanly and `not work.exists()` printed `7. cleaned up: True`."
  },
  {
    "id": "q_c4_m4_068",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Compare `m04_os_automation.py` lines 25 (`str(p.relative_to(work)).replace('\\\\', '/')`) on Linux vs Windows when building a cross-OS manifest. What built-in `pathlib.Path` property accomplishes `.replace('\\\\', '/')` directly without manual string replacement?",
    "options": [
      "`p.relative_to(work).raw()`",
      "`p.relative_to(work).name`",
      "`p.relative_to(work).as_posix()`",
      "`p.relative_to(work).resolve()`"
    ],
    "correct": 2,
    "explanation": "`Path.as_posix()` renders any relative `Path` cleanly using forward slashes (`'sub/c.log'`) identically on Windows, macOS, and Linux."
  },
  {
    "id": "q_c4_m4_069",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "Which environment variable tells Python to append extra folders onto module search `sys.path` if not cleared by isolated mode (`python -I`)?",
    "options": [
      "`PYTHONEXEC`",
      "`PYTHONPATH`",
      "`SYSPATH`",
      "`PATHSEP`"
    ],
    "correct": 1,
    "explanation": "`PYTHONPATH` can inject untrusted module folders ahead of the standard library unless stripped via `python -I` or clean environments."
  },
  {
    "id": "q_c4_m4_070",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "If `safe_join(base, user_name)` checks `(base / user_name).resolve().is_relative_to(base.resolve())`, what happens when `user_name` is an absolute Windows path `'C:\\\\Windows\\\\System32\\\\drivers\\\\etc\\\\hosts'` on Windows?",
    "options": [
      "`pathlib` discards `base` completely when joining an anchored drive/root path, `resolve()` keeps `'C:\\\\Windows\\\\...'`, and `.is_relative_to(base.resolve())` catches and blocks it immediately with `ValueError`!",
      "`base / 'C:\\\\...'` appends safely under `base`",
      "Raises `FileNotFoundError` only",
      "Converts `C:\\\\` into relative subfolder `C_Windows`"
    ],
    "correct": 0,
    "explanation": "Notice how `.resolve().is_relative_to()` defeats BOTH relative `'../../'` climbing AND absolute root-path replacement (`'/etc/passwd'` or `'C:\\\\...'`) identically!"
  },
  {
    "id": "q_c4_m4_071",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 4, what exit code did `result.returncode` report after printing `'hello from child'`?",
    "options": [
      "`1`",
      "`None`",
      "`3`",
      "`0`"
    ],
    "correct": 3,
    "explanation": "Normal termination printed `4. rc = 0 | stdout: hello from child`."
  },
  {
    "id": "q_c4_m4_072",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "A script calls `subprocess.run(['/usr/bin/myscan', target], capture_output=True, text=True, timeout=10)` WITHOUT `check=True`, and forgets to test `if res.returncode != 0:`. Suppose `myscan` crashes with fatal permission denied (`returncode=2` printed to `stderr`). What silently occurs?",
    "options": [
      "Python logs `stderr` automatically at ERROR level",
      "`capture_output=True` forces `check=True` implicitly",
      "`capture_output=True` swallowed `stderr` cleanly into `res.stderr` AND omitted `check=True`—so the script shows ZERO error output and continues pretending empty `res.stdout` means 'zero threats found'!",
      "`returncode=2` raises `PermissionError` automatically"
    ],
    "correct": 2,
    "explanation": "Silent security failure trap: capturing stderr + omitting `check=True` can mistake a failed permission check for 'clean scan'! Always pass `check=True` (or check returncode and log stderr cleanly)."
  },
  {
    "id": "q_c4_m4_073",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 5, what exact output did the safe argument-list run (`list args output`) print when given `'report.txt & echo INJECTED'`?",
    "options": [
      "`['processing report.txt', 'INJECTED']`",
      "`processing report.txt & echo INJECTED` (delivered intact as plain literal text inside `sys.argv[1]`)",
      "Raised `ValueError`",
      "`processing report.txt`"
    ],
    "correct": 1,
    "explanation": "With an argument list (`shell=False`), `& echo INJECTED` stayed completely inert literal text instead of spawning a second command."
  },
  {
    "id": "q_c4_m4_074",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "An automation helper needs to call `git log -n 5` against a repository branch string `branch` supplied via webhook payload. Compare `subprocess.run(['git', 'log', '-n', '5', branch])` vs `subprocess.run(['git', 'log', '-n', '5', '--', branch])` alongside regex allowlist validation. Why can passing an unvalidated `branch = '--upload-pack=sh'` trigger remote code execution on `git`?",
    "options": [
      "Because `git` subcommands recognize options like `--upload-pack=...` or `--output=...` anywhere in `argv` before `--`! Prefixing `'--'` AND rejecting leading hyphens with an allowlist neutralizes argument smuggling cleanly.",
      "`git` rejects strings starting with `--` automatically",
      "`git` executes shell pipes automatically even when `shell=False`",
      "Webhooks automatically escape hyphens"
    ],
    "correct": 0,
    "explanation": "Defense-in-depth pairs strict input character/prefix allowlists with POSIX `--` end-of-flags delimiters when invoking external CLI utilities."
  },
  {
    "id": "q_c4_m4_075",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Which MITRE ATT&CK technique tracks adversaries abusing Windows Task Scheduler, `cron`, or `systemd` timers to achieve persistent execution?",
    "options": [
      "T1003 (OS Credential Dumping)",
      "T1566 (Phishing)",
      "T1190 (Exploit Public-Facing Application)",
      "T1053 (Scheduled Task/Job)"
    ],
    "correct": 3,
    "explanation": "ATT&CK `T1053` covers Scheduled Task/Job creation and abuse (`schtasks`, `cron`, `at`, `systemd` timers)."
  },
  {
    "id": "q_c4_m4_076",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "When deploying a Windows scheduled Python task (`schtasks /Create ... /SC DAILY /ST 03:00`), how does setting `Start in (WorkingDirectory)` explicitly in Task Scheduler (`WorkingDirectory=` in `systemd`) work together with absolute script paths?",
    "options": [
      "`Start in` overwrites `sys.executable` globally",
      "Task Scheduler forbids absolute script paths when `Start in` is configured",
      "Explicit working directories prevent unpredictable `C:\\Windows\\System32` default paths from breaking logs or dropping temp outputs inside OS folders, while absolute interpreter + script paths isolate code cleanly!",
      "Both do nothing if `timeout=` is configured"
    ],
    "correct": 2,
    "explanation": "Never leave scheduler working directories unconfigured or pointed at shared/OS system directories."
  },
  {
    "id": "q_c4_m4_077",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "How do you signal a non-zero failure exit code cleanly from `main()` in Python automation scripts?",
    "options": [
      "`print('ERROR')` and return normally",
      "`sys.exit(1)` (or `return 1` passed into `raise SystemExit(main())`)",
      "`return -1` quietly without `sys.exit`",
      "`os.system('exit 1')`"
    ],
    "correct": 1,
    "explanation": "`sys.exit(1)` sets OS process returncode `1`, triggering alerts reliably in cron/Task Scheduler/CI."
  },
  {
    "id": "q_c4_m4_078",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Notice Lesson 4.6 warns against putting secrets on command lines (`argv`). Where else in Python automation might secrets leak invisibly unless specifically scrubbed?",
    "options": [
      "Inside structured log messages (`log.info`), unhandled HTTP URL query tokens inside traceback strings, and world-readable config/manifest JSON files with overly permissive defaults!",
      "Inside `sys.prefix` path hashes",
      "Inside integer exit codes (`0..255`)",
      "Inside `Path.suffix`"
    ],
    "correct": 0,
    "explanation": "Tracebacks, exception strings containing tokenized URLs (`?key=...`), argv lists, and loose file permissions (`umask` / ACLs) must all keep secrets out."
  },
  {
    "id": "q_c4_m4_079",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In Practical P1 (`Safe evidence copier`), if a file's `st_mtime` is compared against cutoff `now - minutes * 60`, what does `st_mtime` represent?",
    "options": [
      "File size in kilobytes",
      "Creation line number",
      "Windows NTFS security identifier",
      "Last content modification time in seconds since the Unix epoch (1970-01-01 UTC)"
    ],
    "correct": 3,
    "explanation": "`st_mtime` returns Unix timestamp seconds, which Practical P1 converts accurately into timezone-aware UTC `datetime`."
  },
  {
    "id": "q_c4_m4_080",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Wait: in Practical P1 (`copy2` recent evidence collector), what happens if destination `dest` accidentally resides **INSIDE** `source` (`python collect.py /logs /logs/evidence 60`) while running `source.rglob('*')`?",
    "options": [
      "`rglob` automatically skips destination subdirectories cleanly",
      "`shutil.copy2` aborts cleanly on nested subfolders automatically",
      "Every freshly copied file inside `/logs/evidence` immediately gets discovered on subsequent iterations or runs with current `mtime`, creating an **infinite recursive self-copying feedback loop** unless you ensure `not dest.resolve().is_relative_to(source.resolve())` cleanly!",
      "Generates `TimeoutExpired` after 1 second"
    ],
    "correct": 2,
    "explanation": "Validating at startup that output vault `dest` is NOT nested inside scanned `source` prevents recursive copying explosions and self-polluting manifests!"
  },
  {
    "id": "q_c4_m4_081",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, why did `PATH entries` report `89` entries locally while the CPython 3.14 reference host reported `41`?",
    "options": [
      "Python 3.12 doubles every `PATH` entry",
      "`os.environ['PATH']` reflects actual workstation installed software tools, which vary cleanly across real machines",
      "CWD appended 48 extra subdirectories automatically",
      "`os.pathsep` changed between Python versions"
    ],
    "correct": 1,
    "explanation": "Observing host-dependent differences demonstrates why environment variables vary across hosts and must never be blindly assumed identical."
  },
  {
    "id": "q_c4_m4_082",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "In `safe_join(base, user_name)` of `m04_os_automation.py`, what happens when `user_name = ''` (empty string) or `'.'`?",
    "options": [
      "`(base / '.').resolve()` equals `base.resolve()`, and in Python `base.resolve().is_relative_to(base.resolve())` returns `True`! If callers later call `.unlink()` or open as a file without verifying `.is_file()` or rejecting `target == base.resolve()`, they hit the directory itself!",
      "Raises `ValueError` because `base.resolve()` is NOT relative to `base.resolve()`",
      "Deletes `base` automatically",
      "Returns `None`"
    ],
    "correct": 0,
    "explanation": "Important boundary detail: `p.is_relative_to(p)` is `True` (a directory is trivially relative to itself)! If callers must return a child *file* inside `base`, also check `target != base.resolve()` and `not target.is_dir()` before acting."
  },
  {
    "id": "q_c4_m4_083",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Why does `m04_os_automation.py` line 42 call `[sys.executable, '-c', \"print('hello from child')\"]` instead of `['python', '-c', ...]`?",
    "options": [
      "`'python'` does not work inside `subprocess.run`",
      "`sys.executable` runs faster inside shells",
      "`sys.executable` enables `shell=True` automatically",
      "`sys.executable` uses the exact running interpreter cleanly even in environments where `'python'` isn't on `PATH` or points to a different Python install"
    ],
    "correct": 3,
    "explanation": "On Linux systems offering only `python3` or isolated `venv` runners without shell activation, bare `'python'` often fails or invokes the wrong runtime."
  },
  {
    "id": "q_c4_m4_084",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "A Windows remediation script runs `subprocess.run(['cmd.exe', '/c', 'dir', user_dir])` believing `shell=False` protects it cleanly! Why does wrapping `'cmd.exe /c'` inside an argument list REINTRODUCE Windows command injection?",
    "options": [
      "`cmd.exe` blocks argument lists safely cleanly",
      "`/c` prevents shell parsing completely",
      "Invoking `'cmd.exe'`, `'/bin/sh'`, or `'powershell.exe -Command'` manually inside an argv list explicitly spawns a shell interpreter yourself—defeating `shell=False` and re-opening CWE-78 `&`/`|`/`$(...)` injection!",
      "`dir` requires root permissions"
    ],
    "correct": 2,
    "explanation": "Spawning `sh -c`, `cmd /c`, or `powershell -Command` manually in an argv list behaves identically to `shell=True`! Either call native binaries directly or use `pathlib`."
  },
  {
    "id": "q_c4_m4_085",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Which `schtasks` flag deletes an existing Windows scheduled task cleanly during lab cleanup without prompting interactively for `[Y/N]` confirmation?",
    "options": [
      "`/Remove /Quiet`",
      "`/Delete /TN \"...\" /F`",
      "`/Clean /Yes`",
      "`/Purge`"
    ],
    "correct": 1,
    "explanation": "`/F` forces non-interactive deletion cleanly (`schtasks /Delete /TN \"RK-C04-Demo\" /F`)."
  },
  {
    "id": "q_c4_m4_086",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "An operations script logs `'SUCCESS'` on failure recovery because it wrapped `try: run_job() except TimeoutExpired as err: log.warning('timed out')` without exiting non-zero. What happens across monitoring and downstream dependent cron tasks?",
    "options": [
      "Downstream tasks seeing exit `0` proceed blindly on incomplete/missing data while scheduler dashboards report green `Ready / 0x0`, mirroring Course 04's silent-failure outage theme!",
      "Monitoring pages ops immediately on `WARNING` text",
      "`TimeoutExpired` forces exit 1 automatically even if caught",
      "Windows restarts the script every second cleanly"
    ],
    "correct": 0,
    "explanation": "Never disguise failed or aborted critical jobs with exit code `0`."
  },
  {
    "id": "q_c4_m4_087",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 2, how many `.log` files in total were found recursively via `work.rglob('*.log')`?",
    "options": [
      "2 (`a.log`, `b.log`)",
      "1 (`sub/c.log`)",
      "4 (including `notes.txt`)",
      "3 (`a.log`, `b.log`, `sub/c.log`, skipping `notes.txt`)"
    ],
    "correct": 3,
    "explanation": "`rglob('*.log')` matched all 3 `.log` files across root and `sub/` while omitting `notes.txt`."
  },
  {
    "id": "q_c4_m4_088",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "In Python automation calling external binaries, compare `shutil.which('python')` vs `shutil.which('python', path='/usr/local/bin:/usr/bin:/bin')`. How does supplying an explicit restricted `path=` string harden Linux binary lookup?",
    "options": [
      "Requires root `UID=0` permissions",
      "Searches current working directory `.` first cleanly",
      "Ignores attacker-poisoned `os.environ['PATH']` directories cleanly and searches strictly the administrator-specified trusted directories!",
      "Finds Python packages inside `site-packages`"
    ],
    "correct": 2,
    "explanation": "When absolute paths differ across minor OS distros, bounding `shutil.which(..., path=...)` strictly to admin-owned directories prevents hijacked environment `PATH` lookups."
  },
  {
    "id": "q_c4_m4_089",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` line 22, why is `p.parent.mkdir(parents=True, exist_ok=True)` passed cleanly before creating `work / 'sub/c.log'`?",
    "options": [
      "Deletes existing files inside `sub/` first",
      "Creates intermediate `'sub'` folder safely without crashing if `'sub'` already exists",
      "Sets execute permissions recursively",
      "Checks path traversal containment automatically"
    ],
    "correct": 1,
    "explanation": "`parents=True, exist_ok=True` behaves like idempotent `mkdir -p` safely across runs."
  },
  {
    "id": "q_c4_m4_090",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Wait: when running `subprocess.run([tool, arg], capture_output=True, text=True, timeout=5)`, suppose the child hangs indefinitely after opening a grand-child background process inheriting stdout/stderr pipes. Notice a subtlety: even after `TimeoutExpired` kills the immediate child, Python may wait on stdout/stderr pipe EOFs or orphaned grandchildren unless cleaned cleanly—so how should defensive runners isolate noisy or long-running external processes?",
    "options": [
      "Set finite timeouts, avoid unnecessary shells spawning orphan children (each shell adds a parent layer!), or launch isolated process groups / native Python libraries directly!",
      "Pass `timeout=None` so it finishes naturally",
      "Use `eval()` instead of `subprocess.run`",
      "Redirect output using `shell=True`"
    ],
    "correct": 0,
    "explanation": "Avoidance of intermediate shells (`shell=False`) ensures `TimeoutExpired` terminates the actual target executable rather than merely killing a wrapper shell while orphan children stay dangling!"
  },
  {
    "id": "q_c4_m4_091",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "In Marigold Insurance Brokers CS2, besides switching to an argument list and validating `^[A-Za-z0-9._-]{1,32}$`, what privilege change stopped account-unlock compromise from turning into local Administrator takeover?",
    "options": [
      "Running every 60 minutes instead of every 5 minutes",
      "Using `shlex.quote` inside `cmd.exe`",
      "Logging failed commands with bare `except:`",
      "Delegating ONLY narrow unlock rights to a non-admin dedicated service account (Least Privilege)"
    ],
    "correct": 3,
    "explanation": "Even if an unknown flaw hits a parser, running under minimal delegated rights prevents domain/local Administrator escalation."
  },
  {
    "id": "q_c4_m4_092",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "In Practical P2 step 2 (`x | echo PIPED`), what happens when `subprocess.run(f'echo processing {user_input}', shell=True)` executes on Windows or Linux?",
    "options": [
      "Prints literal `x | echo PIPED` cleanly",
      "Raises `CalledProcessError` immediately",
      "The shell interprets `|` as a Unix/Windows pipe, piping `echo processing x` stdout into a newly launched `echo PIPED` command!",
      "Strips characters past `|` silently"
    ],
    "correct": 2,
    "explanation": "Pipes (`|`), background operators (`&`), conditional chains (`&&`/`||`), and semicolons (`;`) all trigger unintended multi-command execution under `shell=True`."
  },
  {
    "id": "q_c4_m4_093",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Why should crontab / scheduled jobs log outputs explicitly to structured log files or syslog rather than relying on interactive terminal printing?",
    "options": [
      "`print()` raises exceptions inside background daemons",
      "Unattended scheduled processes lack interactive consoles—capturing timestamped logs preserves audit trails and error tracebacks cleanly",
      "Cron strips integers from `print()`",
      "Logs disable concurrent overlap checks"
    ],
    "correct": 1,
    "explanation": "Persistent log collection and missing-run alerts provide essential operational visibility for background jobs."
  },
  {
    "id": "q_c4_m4_094",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "A script automates creating 50 SOC audit folders and assigning read-only policies cleanly. Compare Script X (`mkdir(exist_ok=False)`) vs Script Y (`mkdir(exist_ok=True)` + checking policy state before applying changes). When a transient disk glitch stops run #1 at folder 24 and an operator retries run #2, which property makes Script Y recover smoothly?",
    "options": [
      "Idempotency cleanly handles already-created folders 1..24 without crashing on `FileExistsError`, completing folders 25..50 cleanly on retry!",
      "Path traversal containment",
      "Catastrophic backtracking",
      "Option injection shielding"
    ],
    "correct": 0,
    "explanation": "Idempotent design handles interrupted partial completions smoothly without human manual cleanup before retrying."
  },
  {
    "id": "q_c4_m4_095",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, which two files inside `work` had size strictly greater than `100 bytes`?",
    "options": [
      "`a.log` (10 B) and `notes.txt` (5 B)",
      "Only `b.log`",
      "All three `.log` files",
      "`b.log` (2000 B) and `sub/c.log` (300 B)"
    ],
    "correct": 3,
    "explanation": "`logs = sorted(work.rglob('*.log'))` filtered `st_size > 100`, printing `['b.log', 'c.log']`."
  },
  {
    "id": "q_c4_m4_096",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Consider `platform.system()` returning `'Windows'` vs `'Linux'`. A developer writes `if platform.system() == 'Windows': cleanup_win() else: cleanup_linux()` cleanly, yet later discovers macOS analysts running their script hit Linux-specific `/proc` code in `else:`. What defensive branching improves cross-platform portability?",
    "options": [
      "Match expected OS tokens explicitly (`if os_name == 'Windows': ... elif os_name == 'Linux': ... elif os_name == 'Darwin': ... else: raise NotImplementedError(...)`) so unsupported platforms fail loudly rather than misbehaving silently!",
      "Assume everything non-Windows is Ubuntu Linux cleanly",
      "Check `os.pathsep == ';'` everywhere",
      "Use `shell=True` to abstract OS commands automatically"
    ],
    "correct": 0,
    "explanation": "Explicit allowlisted OS dispatch (`Windows`, `Linux`, `Darwin`) paired with a fail-loud `else` avoids silent bugs across macOS/BSD hosts."
  },
  {
    "id": "q_c4_m4_097",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which standard library function safely removes a non-empty temporary workspace directory tree cleanly at the end of `m04_os_automation.py`?",
    "options": [
      "`work.rmdir()`",
      "`shutil.rmtree(work)`",
      "`work.unlink()`",
      "`os.delete(work)`"
    ],
    "correct": 1,
    "explanation": "`Path.rmdir()` only handles empty directories; `shutil.rmtree()` deletes entire directory trees cleanly."
  },
  {
    "id": "q_c4_m4_098",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Look at `m04_os_automation.py` line 61: `subprocess.run([sys.executable, '-c', 'import sys; sys.exit(3)'], check=True)`. What happens if someone ALSO needs to capture both `stdout` and `stderr` diagnostic text on failure cleanly inside `except subprocess.CalledProcessError as err:`?",
    "options": [
      "`capture_output=True` suppresses `CalledProcessError` automatically",
      "`check=True` clears `stdout` and `stderr` cleanly",
      "Pass `capture_output=True, text=True` alongside `check=True`—even when `CalledProcessError` raises, `err.stdout` and `err.stderr` remain populated cleanly for diagnostic logging!",
      "Requires passing `shell=True` first"
    ],
    "correct": 2,
    "explanation": "Combining `capture_output=True, text=True, timeout=..., check=True` preserves full decoded error streams right inside `err.stderr` when raising `CalledProcessError`."
  },
  {
    "id": "q_c4_m4_099",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Which statement best captures OWASP and Course 04 guidance on building external commands with user or ticket data?",
    "options": [
      "Always format strings cleanly with `f'...'` and enable `shell=True`",
      "Only trust `shlex.quote()` across Windows `cmd.exe`",
      "Escape `&` manually via `.replace('&', '')`",
      "Prefer native Python libraries first; when calling external programs is unavoidable, validate inputs via strict allowlists, use argument lists (`shell=False`), separate flags via `--`, and set finite timeouts"
    ],
    "correct": 3,
    "explanation": "Layered avoidance (`stdlib` -> allowlist -> `shell=False` argv -> `--` -> `timeout`) eliminates OS command injection systematically."
  },
  {
    "id": "q_c4_m4_100",
    "topic": "C04-M04-L01..L06: Module 4 Synthesis",
    "difficulty": "difficult",
    "q": "An auditor reviews a new Python script meant to run nightly as `SYSTEM` on Windows servers, archiving user-selected folders cleanly: `(a)` it uses `user_dir = args.folder`, `(b)` runs `subprocess.run(f'tar -cf out.tar {user_dir}', shell=True)` with no timeout, and `(c)` resides in a world-writable `C:\\Temp\\archive.py`. Identify ALL THREE critical flaws present simultaneously:",
    "options": [
      "`(1)` Local Privilege Escalation (`SYSTEM` executing script in writable `C:\\Temp`), `(2)` Uncontained Path Traversal / arbitrary file disclosure (`no safe_join`), and `(3)` OS Command Injection (`CWE-78` via `shell=True`) + hang risk (`no timeout`)",
      "No `--dry-run`, uses `Path.rglob()`, and returns exit 1",
      "`CWE-1333` ReDoS, `CWE-502` pickle, and `CWE-1236` CSV injection",
      "Missing docstrings, implicit returns, and Unicode mojibake"
    ],
    "correct": 0,
    "explanation": "Every layer in Module 4 exists to close these exact threats: lock folder permissions & drop `SYSTEM`, validate/contain paths cleanly, eliminate `shell=True` (use `tarfile`/`zipfile` or safe argv + timeout)!"
  },
  {
    "id": "q_c4_m4_101",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "In Python, which `os` attribute holds `'\\\\'` on Windows and `'/'` on Linux/macOS?",
    "options": [
      "`os.pathsep`",
      "`os.sep`",
      "`os.linesep`",
      "`os.dirsep`"
    ],
    "correct": 1,
    "explanation": "`os.sep` denotes directory path component separators (`\\` on Windows, `/` on POSIX)."
  },
  {
    "id": "q_c4_m4_102",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "A developer executes `subprocess.run(['git', '--version'])` on Windows inside a directory containing an attacker-planted `git.exe` alongside genuine `C:\\Program Files\\Git\\bin\\git.exe`. On default Windows `CreateProcess` search behavior, WHICH binary launches if `shell=False` searches CWD before PATH?",
    "options": [
      "Always `C:\\Program Files\\Git\\bin\\git.exe`",
      "Windows ignores `.exe` files in CWD",
      "Windows `SearchPath` / `CreateProcess` frequently searches the current working/application directory BEFORE `PATH`—launching the planted `git.exe` unless your Python caller pins an explicit trusted absolute executable path!",
      "`shell=False` skips CWD on Windows automatically"
    ],
    "correct": 2,
    "explanation": "On Windows especially, passing bare binary names invites current-directory executable planting; pass explicit full paths (or sanitized fixed `shutil.which(..., path=...)`)."
  },
  {
    "id": "q_c4_m4_103",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "Which standard expression safely retrieves an optional environment variable without crashing if it is unset?",
    "options": [
      "`os.environ['PATH']`",
      "`platform.env('PATH')`",
      "`sys.environ('PATH')`",
      "`os.environ.get('PATH', '')`"
    ],
    "correct": 3,
    "explanation": "`os.environ.get('KEY', default)` returns a safe fallback cleanly instead of raising `KeyError`."
  },
  {
    "id": "q_c4_m4_104",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "In Module 4, why should privileged Python scripts executed via Task Scheduler / `sudo` avoid reading arbitrary user-configurable `PATH` or `PYTHONPATH` settings cleanly?",
    "options": [
      "Environment inheritance lets an unprivileged invoking context steer bare binary lookups (`shutil.which`) or module imports (`import logging`) to attacker-owned directories!",
      "`os.environ` deletes `PATH` under `sudo` automatically on every host",
      "`sys.version` fails under modified `PATH`",
      "`platform.release()` returns empty strings"
    ],
    "correct": 0,
    "explanation": "Pin interpreter (`-I` / venv path), script path, and external tool paths explicitly cleanly independent of inherited environment variables."
  },
  {
    "id": "q_c4_m4_105",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which standard function moves a file or directory across folders safely on the filesystem in Python?",
    "options": [
      "`Path.transfer(dst)`",
      "`shutil.move(src, dst)`",
      "`os.relocate(src, dst)`",
      "`subprocess.run(['mv', ...])`"
    ],
    "correct": 1,
    "explanation": "`shutil.move` handles intra-filesystem renames and cross-filesystem copy-and-delete moves portably."
  },
  {
    "id": "q_c4_m4_106",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Why does calling `(base / user_name).resolve()` fail to guard containment cleanly if `user_name` comes from an attacker AND the script uses `os.path.normpath()` instead of `Path.resolve()`?",
    "options": [
      "`os.path.normpath` removes drive letters cleanly",
      "`Path.resolve()` is deprecated in Python 3.12",
      "`os.path.normpath` ONLY performs syntactic string folding (`a/../b` -> `b`) and NEVER checks the filesystem for symbolic links/junctions pointing outside `base`, whereas `Path.resolve()` traverses actual links!",
      "`os.path.normpath` raises `ValueError` on `'..'`"
    ],
    "correct": 2,
    "explanation": "Pure lexical normalization leaves symlink escapes undetected; `Path.resolve()` resolves real on-disk targets prior to `.is_relative_to()` verification."
  },
  {
    "id": "q_c4_m4_107",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which MITRE CWE tracks improper limitation of a pathname to a restricted directory ('Path Traversal', demonstrated cleanly by blocking `'../../Windows/win.ini'`)?",
    "options": [
      "CWE-78",
      "CWE-1333",
      "CWE-502",
      "CWE-22"
    ],
    "correct": 3,
    "explanation": "CWE-22 defines Path Traversal (also examined in web applications during Course 06)."
  },
  {
    "id": "q_c4_m4_108",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Wait: suppose `archive.zip` contains TWO entries in order: Entry 1 creates a symbolic link `sub/escape -> /etc`, and Entry 2 unpacks a payload to `sub/escape/cron.d`. How does calling `safe_join(work, member)` right *before* writing each entry protect extraction?",
    "options": [
      "Before extracting Entry 2, `(work / 'sub/escape/cron.d').resolve()` follows symlink `sub/escape` straight out to `/etc/cron.d`, so `is_relative_to(work.resolve())` returns `False` and aborts extraction immediately!",
      "`is_relative_to` ignores symlinks on Entry 2",
      "`zipfile` ignores directory names inside archives",
      "Symlinks only resolve when reading `.log` files"
    ],
    "correct": 0,
    "explanation": "Canonical resolution on every archive extraction entry defends cleanly against zip-slip and symlink-planting archive attacks (alongside rejecting symlink archive members altogether)."
  },
  {
    "id": "q_c4_m4_109",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "What object type does `subprocess.run(...)` return upon normal completion?",
    "options": [
      "An integer exit code directly",
      "A `subprocess.CompletedProcess` instance containing `.returncode`, `.stdout`, `.stderr`, and `.args`",
      "A raw `bytes` stdout buffer",
      "A `list[str]` of output lines"
    ],
    "correct": 1,
    "explanation": "`subprocess.run` returns a structured `CompletedProcess` object wrapping returncode and captured streams."
  },
  {
    "id": "q_c4_m4_110",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "If `subprocess.run([tool, arg], capture_output=True, text=True, timeout=10, encoding='utf-8', errors='replace')` invokes a legacy tool emitting malformed Windows-1252 bytes on stderr, why is adding `encoding='utf-8', errors='replace'` important alongside `text=True`?",
    "options": [
      "`text=True` disables timeouts automatically",
      "`errors='replace'` runs binaries faster",
      "Bare `text=True` uses OS locale encoding strictly, so any single invalid byte emitted by a noisy C utility crashes your parent Python parser with `UnicodeDecodeError` *before* even letting you check `returncode`!",
      "`capture_output=True` forces ASCII-only output automatically"
    ],
    "correct": 2,
    "explanation": "Explicit `encoding='utf-8', errors='replace'` keeps child output capture crash-free even when non-UTF-8 system messages arrive."
  },
  {
    "id": "q_c4_m4_111",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Which standard Python function replaces calling external `subprocess.run(['which', 'python'])` portably across Windows and Linux?",
    "options": [
      "`Path.locate('python')`",
      "`sys.which('python')`",
      "`os.path.bin('python')`",
      "`shutil.which('python')`"
    ],
    "correct": 3,
    "explanation": "`shutil.which()` works identically across Windows (`PATHEXT` handling) and POSIX without spawning subshells."
  },
  {
    "id": "q_c4_m4_112",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "A script passes sensitive CSV text into a child analyzer via stdin rather than CLI arguments: `subprocess.run([tool], input=secret_payload, text=True, capture_output=True, timeout=10)`. Why is passing data on `input=` stdin far safer than passing large data inside argv CLI elements?",
    "options": [
      "CLI arguments expose sensitive tokens to process-table observers (`ps` / Sysmon) AND hit strict OS `ARG_MAX` length limits (`Argument list too long`), whereas `input=` pipes streams privately cleanly over OS pipes!",
      "OS kernels allow infinite bytes inside argv elements",
      "`input=` compiles Python bytecode automatically",
      "`capture_output` disables `input=`"
    ],
    "correct": 0,
    "explanation": "Standard input pipes cleanly avoid both OS command-line size caps and cross-process CLI telemetry exposure."
  },
  {
    "id": "q_c4_m4_113",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Look at Rule 3 in Lesson 4.4: when passing a user-validated value into CLI tools like `grep` or `git`, what does inserting the standalone `'--'` token before the value prevent?",
    "options": [
      "Reduces timeout to 2 seconds",
      "Prevents strings starting with `'-'` from being parsed as command flags/options (option injection)",
      "Converts `shell=True` back into `shell=False`",
      "Encrypts stdout output"
    ],
    "correct": 1,
    "explanation": "Standard POSIX `--` signals end-of-options cleanly so trailing strings act strictly as positional arguments."
  },
  {
    "id": "q_c4_m4_114",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Careful Windows nuance: does every legacy Windows built-in CLI utility accept `'--'` cleanly as an end-of-options marker (`Option Injection` guard), or what extra control guarantees defense across *every* OS utility?",
    "options": [
      "Every Windows binary treats `--` identically to POSIX",
      "`shell=True` translates `--` for Windows cleanly",
      "Not every legacy tool respects `--` consistently (some Windows `/` flags ignore `--`)—therefore **ALWAYS** pair `--` (where supported) with **strict character/prefix allowlist validation** (`re.fullmatch` rejecting leading `-` and `/`) BEFORE calling `subprocess.run`!",
      "Pass `shlex.quote()` on Windows instead"
    ],
    "correct": 2,
    "explanation": "Strict input allowlists rejecting unintended option prefixes (`-`, `/`) protect tools consistently even when binaries deviate from POSIX getopt conventions."
  },
  {
    "id": "q_c4_m4_115",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 5, what exact python snippet ran cleanly inside the SAFE argument-list `subprocess.run` call?",
    "options": [
      "`os.system(user_input)`",
      "`subprocess.run(user_input, shell=False)`",
      "`f'echo processing {user_input}'` with `shell=True`",
      "`[sys.executable, '-c', \"import sys; print('processing', sys.argv[1])\", user_input]`"
    ],
    "correct": 3,
    "explanation": "Passing `user_input` as an element of the list delivered it intact into `sys.argv[1]` without invoking a shell."
  },
  {
    "id": "q_c4_m4_116",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Why does blacklisting only `['&', ';', '|']` inside user input before `subprocess.run(f'ping {host}', shell=True)` fail on BOTH Linux and Windows?",
    "options": [
      "Attackers immediately bypass tiny character blocklists cleanly via newlines `\\n`, `$(cmd)`, backticks `` `cmd` ``, `<` / `>` shell redirection, `%OSVAR%`, or caret `^` Windows escapes! Only **eliminating `shell=True`** plus strict allowlists closes CWE-78 cleanly.",
      "Backlists match case-sensitively only",
      "Python's `in` operator skips semicolons",
      "`ping` disables blacklists automatically"
    ],
    "correct": 0,
    "explanation": "Shell parsers contain dozens of subtle chaining, substitution, redirection, and newline tokens; blocklists fail repeatedly while `shell=False` argument lists + allowlists succeed cleanly."
  },
  {
    "id": "q_c4_m4_117",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "In Windows `schtasks /Create /TN \"RK-C04-Demo\" /TR \"...\" /SC DAILY /ST 03:00 /F`, what does `/SC DAILY /ST 03:00` specify?",
    "options": [
      "Run once after 300 seconds",
      "Run daily every day at `03:00`",
      "Run every 3 hours cleanly",
      "Scan directory `03:00`"
    ],
    "correct": 1,
    "explanation": "`/SC` selects schedule frequency (`DAILY`) and `/ST` sets `HH:MM` start time (`03:00`)."
  },
  {
    "id": "q_c4_m4_118",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Look at Scenario S3 (`SYSTEM` task executing `collect.py` in user-writable `C:\\Scripts`). Suppose an admin fixes ACLs on `collect.py` ONLY while leaving the parent folder `C:\\Scripts` writable by `Users`, OR leaving `rkutils.py` inside `C:\\Scripts` writable! Why can standard users STILL achieve `SYSTEM` escalation?",
    "options": [
      "NTFS blocks replacing read-only files inside writable folders completely",
      "`SYSTEM` runs only inside `venv` automatically",
      "On Windows/Linux, folder write permission lets attackers rename `collect.py`, drop a hijacked `logging.py` (`sys.path[0]`) beside `collect.py`, OR modify imported helper modules!",
      "Task Scheduler verifies SHA-256 hashes natively on all Python files"
    ],
    "correct": 2,
    "explanation": "Privilege escalation defenses require locking the **entire parent folder hierarchy**, imported local modules, `venv` interpreter tree, and target scripts—plus dropping the `SYSTEM` identity cleanly."
  },
  {
    "id": "q_c4_m4_119",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Which option in Course 03 Module 6 PowerShell workflows directly inspired adding `--dry-run` to defensive Python scripts in Lesson 4.6?",
    "options": [
      "`-Force`",
      "`-ErrorAction SilentlyContinue`",
      "`-Recurse`",
      "`-WhatIf`"
    ],
    "correct": 3,
    "explanation": "Python `--dry-run` fulfills the same pre-execution safety preview role as PowerShell `-WhatIf`."
  },
  {
    "id": "q_c4_m4_120",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Why should defensive scripts log structured run boundaries (`START target=... dry_run=...`, error events, and `END processed=... errors=... duration_s=...`) to persistent log streams cleanly?",
    "options": [
      "Enables post-incident auditing, performance drift detection, partial-batch diagnosis, and dead man's switch verification of healthy completion!",
      "Makes stdout faster to parse with regex backtracking",
      "Replaces all unit tests cleanly",
      "Allows running scripts safely under `Users`-writable folders"
    ],
    "correct": 0,
    "explanation": "Observable start/end heartbeats pair cleanly with non-zero exit codes so monitoring detects crashes, hangs, AND missing cron cycles."
  },
  {
    "id": "q_c4_m4_121",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In Practical P1 (`Safe evidence copier`), what valid integer range is specified for validating the lookback `--minutes` argument?",
    "options": [
      "`0..60`",
      "`1..1440` (one minute up to 24 hours)",
      "`-100..100000`",
      "Any positive float"
    ],
    "correct": 1,
    "explanation": "Bounding `1 <= minutes <= 1440` prevents zero/negative ranges or year-long sweeping accidents."
  },
  {
    "id": "q_c4_m4_122",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Look at Practical P1 step 5: testing file copy + manifest creation with Unicode filenames, spaces (`'incident report café.log'`), and rejecting `'..'`. Why can printing unescaped `stdout` of filenames fail mysteriously on misconfigured Windows consoles if `PYTHONIOENCODING` isn't UTF-8?",
    "options": [
      "`Path.rglob` skips Unicode filenames completely",
      "Spaces raise `SyntaxError` inside JSON manifests",
      "Writing JSON directly via `manifest_path.write_text(json.dumps(..., ensure_ascii=False), encoding='utf-8')` keeps UTF-8 intact on disk, while using `ascii(name)` in diagnostic logs avoids terminal `UnicodeEncodeError` cleanly!",
      "`shutil.copy2` strips accents from filenames automatically"
    ],
    "correct": 2,
    "explanation": "Pairing explicit `encoding='utf-8'` file outputs with `ascii()` safe terminal diagnostics handles messy international filenames smoothly across any OS host."
  },
  {
    "id": "q_c4_m4_123",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 1, how does `sys.version.split()[0]` format the Python version string cleanly?",
    "options": [
      "Prints full compiler copyright text cleanly",
      "Checks operating system kernel build",
      "Converts version to tuple `(3, 12, 4)`",
      "Extracts just the clean version triplet (e.g., `'3.12.4'`) from the longer `sys.version` build banner"
    ],
    "correct": 3,
    "explanation": "`sys.version` includes build date and compiler info; `.split()[0]` isolates the concise version string (`'3.12.4'`)."
  },
  {
    "id": "q_c4_m4_124",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Consider `logs = sorted(work.rglob('*.log'))`. What happens on Windows vs Linux if an evidence tree holds `'Alert.LOG'` (uppercase extension) when scanning via `.rglob('*.log')`?",
    "options": [
      "Linux `ext4` is **case-sensitive** (skipping `'Alert.LOG'` silently!), whereas Windows NTFS is typically case-insensitive—matching `p.is_file() and p.suffix.lower() == '.log'` over `rglob('*')` guarantees uniform evidence capture on Linux servers too!",
      "Identical matches always on Linux and Windows",
      "Windows skips lowercase `.log` files",
      "`rglob` automatically ignores case on Ubuntu"
    ],
    "correct": 0,
    "explanation": "Checking `p.suffix.lower() in {'.log', '.txt'}` over recursive walks avoids missing uppercase artifacts cleanly during Linux triage."
  },
  {
    "id": "q_c4_m4_125",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Why should security wrappers NEVER leave `timeout=None` (the default) when calling external tools via `subprocess.run`?",
    "options": [
      "`timeout=None` raises `TypeError` immediately",
      "If the child utility hangs waiting for an unreachable host, prompt, or lock, the Python pipeline freezes indefinitely",
      "`timeout=None` sets `shell=True` implicitly",
      "`timeout=None` deletes captured stderr"
    ],
    "correct": 1,
    "explanation": "Always specify a finite positive `timeout` on every subprocess call cleanly."
  },
  {
    "id": "q_c4_m4_126",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Wait: suppose a Python automation tool executes `[tool, arg]` via `subprocess.run` on a child script that pauses waiting for interactive keyboard confirmation (`Continue? [y/N]:`)! Without changing the child script, what happens with `timeout=10` vs adding `stdin=subprocess.DEVNULL`?",
    "options": [
      "`stdin=subprocess.DEVNULL` types `'y'` automatically cleanly",
      "`stdin=subprocess.DEVNULL` disables `TimeoutExpired`",
      "Passing `stdin=subprocess.DEVNULL` (or empty `input=''`) detaches child stdin from interactive terminal prompts immediately so hung prompts abort promptly instead of stalling cleanly up to timeout!",
      "`capture_output=True` redirects stdin automatically"
    ],
    "correct": 2,
    "explanation": "Detaching `stdin=subprocess.DEVNULL` prevents unattended background subprocesses from freezing unexpectedly on hidden interactive prompts."
  },
  {
    "id": "q_c4_m4_127",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Look at Rule 4 in Lesson 4.4: why should privileged security scripts specify absolute binary paths cleanly (such as `'/usr/bin/tar'` or `'C:\\\\Windows\\\\System32\\\\net.exe'`)?",
    "options": [
      "Relative paths run slower on SSDs",
      "Required for `timeout=` support",
      "Subprocesses reject environment variables otherwise",
      "Prevents an attacker who influences environment `PATH` or local working directories from tricking the script into launching a malicious lookalike binary"
    ],
    "correct": 3,
    "explanation": "Absolute executable paths close binary search-path hijacking (`PATH` / CWD planting) cleanly."
  },
  {
    "id": "q_c4_m4_128",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "In `m04_os_automation.py` step 5, `subprocess.run([sys.executable, '-c', 'import sys; print(\"processing\", sys.argv[1])', user_input])` worked cleanly. Suppose a developer mistakenly puts `user_input` INSIDE the Python code string (`[sys.executable, '-c', f\"print('{user_input}')\"]`) instead of passing `user_input` in `sys.argv[1]`! Why is THAT ALSO code injection?",
    "options": [
      "Even with `shell=False`, formatting untrusted data straight into a Python `-c` code string allows `user_input = \"'); import os; os.system('...') #\"` to inject arbitrary Python execution cleanly inside the child! Keep `-c` static and pass data strictly as `sys.argv[1]`!",
      "`-c` blocks f-strings natively cleanly",
      "`sys.argv[1]` converts strings to integers",
      "Child Python interprets `-c` inside bash automatically"
    ],
    "correct": 0,
    "explanation": "Code vs data separation applies to EVERY interpreter (`cmd.exe`, `/bin/sh`, SQL engines, `python -c`, `PowerShell -Command`)—pass untrusted inputs strictly as data arguments (`sys.argv`), NEVER code strings!"
  },
  {
    "id": "q_c4_m4_129",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Before running a newly scheduled security task permanently in production, what lifecycle check demonstrated cleanly in Lesson 4.5 verifies the Windows definition?",
    "options": [
      "Skip verification until Monday logs arrive",
      "Run `schtasks /Create` then `schtasks /Query /TN \"...\" /FO LIST` to confirm exact program command line, schedule time, and account state",
      "Delete `/FO LIST` immediately without inspecting",
      "Grant `Everyone` Full Control over scripts"
    ],
    "correct": 1,
    "explanation": "Inspecting registered tasks via `schtasks /Query` confirms exact command quoting, account context, and next scheduled trigger."
  },
  {
    "id": "q_c4_m4_130",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "Compare two scheduled task configurations running `/opt/rk/sync.py` nightly on Ubuntu Linux: Config A runs in root's crontab (`sudo crontab -e`) calling `python3 /opt/rk/sync.py`; Config B runs under a dedicated `rk_sync` service user via `systemd` timer executing `/opt/rk/venv/bin/python -I /opt/rk/sync.py`. What distinct vulnerabilities does Config B remove over Config A?",
    "options": [
      "Only fixes date formatting cleanly",
      "Eliminates UTF-8 log encoding completely",
      "Eliminates excessive root privilege (`User=rk_sync`), pins isolated `venv` runtime cleanly rather than `PATH` `python3`, enforces `-I` environment isolation, sets explicit `WorkingDirectory`, and captures clean journal telemetry!",
      "Prevents all regex matching automatically"
    ],
    "correct": 2,
    "explanation": "Hardened `systemd` service/timer + isolated `venv` + dedicated low-privilege user satisfies least privilege and runtime determinism cleanly."
  },
  {
    "id": "q_c4_m4_131",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "In Course 04 Scenario S1 / Practical P1, what happens to system state if an analyst runs an idempotent collector script twice in a row against unchanged logs?",
    "options": [
      "Appends duplicate files named `c_copy_copy.log` cleanly",
      "Returns exit code `3` intentionally",
      "Deletes destination vault automatically",
      "Produces identical clean state without duplicating records, losing timestamps, or crashing"
    ],
    "correct": 3,
    "explanation": "Repeated execution of idempotent automation preserves consistent clean state safely."
  },
  {
    "id": "q_c4_m4_132",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose two scheduled cron instances of a heavy backup script start simultaneously during a transient I/O stall. Using an OS advisory lockfile (`fcntl.flock` on Linux or lock-file creation mode `'x'` cleaned in `finally:` cleanly), should the second overlapping instance WAIT indefinitely or EXIT/SKIP visibly?",
    "options": [
      "Use non-blocking lock acquisition: if another legitimate run holds the active lock cleanly, log a clear warning (with lock PID/age check for dead locks) and exit safely so overlapping runs never corrupt manifests or multiply host load!",
      "Kill instance #1 immediately in mid-write cleanly",
      "Ignore lock files and write into the same directory",
      "Sleep infinitely with no log message"
    ],
    "correct": 0,
    "explanation": "Non-blocking lock checks + scheduler serialization + dead-lock age monitoring keep overlapping scheduled tasks from thrashing servers or tearing manifests."
  },
  {
    "id": "q_c4_m4_133",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 6, why did calling `subprocess.run([sys.executable, '-c', 'import sys; sys.exit(3)'], check=True)` jump into `except subprocess.CalledProcessError`?",
    "options": [
      "`sys.exit(3)` timed out cleanly",
      "`check=True` converts any non-zero child exit code (`3 != 0`) into a `CalledProcessError` exception automatically",
      "Child process printed `'3'` to stdout",
      "`capture_output=False` rejects integers above 1"
    ],
    "correct": 1,
    "explanation": "Raising `CalledProcessError` on non-zero return codes prevents wrappers from silently treating child failures as clean completions."
  },
  {
    "id": "q_c4_m4_134",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Look at Practical P2 step 3 (`re.fullmatch(r'[A-Za-z0-9._-]{1,64}', name)`): suppose you run a test table checking valid vs rejected inputs. Which tuple of malicious-looking test inputs MUST `run_report(name)` reject with `ValueError`?",
    "options": [
      "`'daily_audit-2026.csv'`",
      "`'web01_summary.log'`",
      "`('x & calc', 'x; id', 'x | echo PIPED', '../secret', '-rf', 'valid\\n& evil')`",
      "`'host.01'`"
    ],
    "correct": 2,
    "explanation": "Good negative test matrices explicitly target shell chains (`& ; |`), path traversal (`..`), trailing newlines (`\\n`), and leading hyphens (`-rf`)."
  },
  {
    "id": "q_c4_m4_135",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "Why should automated deployment checklists instruct teams to keep `venv` folders and source scripts cleanly separated from writable data/temp folders?",
    "options": [
      "Allows enabling `shell=True` cleanly",
      "Python forbids creating logs inside the same disk partition",
      "`rglob` cannot scan `venv` directories",
      "Simplifies enforcing strict read-only ACLs on executables (`C:\\rk-tools\\`, `/opt/rk-tools/`) while keeping dynamic log/cache writes quarantined in dedicated data paths"
    ],
    "correct": 3,
    "explanation": "Clean privilege boundaries separate immutable code/environments from writable runtime log/evidence folders."
  },
  {
    "id": "q_c4_m4_136",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Suppose an investigator filters files modified in the last 30 minutes via `cutoff = time.time() - 30 * 60` and inspects `p.stat()`. Notice `stat()` returns `st_mtime` alongside `st_ctime`. On Linux vs Windows, why must forensic collectors prefer `st_mtime` (or document OS semantics explicitly) when hunting recently written log content?",
    "options": [
      "On **POSIX/Linux**, `st_ctime` tracks *inode metadata change time* (`chmod`/`chown` updates it cleanly even without editing content!), whereas on **Windows** `st_ctime` tracks file creation time; `st_mtime` cleanly captures content modification everywhere!",
      "`st_ctime` means file content creation everywhere identically",
      "`st_mtime` ignores modifications made by root",
      "`st_ctime` resets to 0 on reboot"
    ],
    "correct": 0,
    "explanation": "Cross-OS forensic subtlety: `st_mtime` tracks content writes across both Windows and Linux cleanly, whereas `st_ctime` diverges structurally between NTFS and POSIX."
  },
  {
    "id": "q_c4_m4_137",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "Which standard parameter ensures `subprocess.run` collects child standard output AND error output onto `.stdout` and `.stderr` attributes concisely?",
    "options": [
      "`save_streams=True`",
      "`capture_output=True`",
      "`record=True`",
      "`shell=True`"
    ],
    "correct": 1,
    "explanation": "`capture_output=True` sets `stdout=subprocess.PIPE, stderr=subprocess.PIPE` cleanly since Python 3.7."
  },
  {
    "id": "q_c4_m4_138",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Notice a sneaky `subprocess` edge case when calling `.bat` or `.cmd` batch wrappers on Windows even WITH `shell=False` (`subprocess.run(['deploy.cmd', user_arg])`)! Why did CVE-2024-24576 / batch dispatch warn developers about `.bat`/`.cmd` files even under argv lists?",
    "options": [
      "`.cmd` files convert Python into PowerShell cleanly",
      "Windows rejects `.cmd` scripts under Python 3.12",
      "Windows CreateProcess executes `.bat`/`.cmd` batch scripts by **implicitly routing the command line through `cmd.exe`** regardless of `shell=False`—requiring pure executable binaries (`.exe`) or native Python code alongside strict allowlist validation!",
      "Passing a list protects `.bat` metacharacters universally"
    ],
    "correct": 2,
    "explanation": "Calling Windows batch wrappers (`.bat`/`.cmd`) implicitly wakes `cmd.exe`; always invoke direct compiled binaries (`sys.executable`, `schtasks.exe`) or pure Python stdlib modules cleanly with allowlisted arguments!"
  },
  {
    "id": "q_c4_m4_139",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "When auditing Task Scheduler actions (`schtasks /Query`), why does seeing an unquoted executable path with spaces or pointing into `C:\\Users\\Public\\` raise immediate red flags?",
    "options": [
      "Windows stores built-in OS tasks in `C:\\Users\\Public\\` cleanly",
      "Spaces prevent Task Scheduler from writing logs",
      "Task Scheduler ignores paths in `Public` cleanly",
      "World/user-writable paths like `Users\\Public` or `ProgramData` subfolders combined with scheduled persistence match common ATT&CK `T1053` malware/escalation paths"
    ],
    "correct": 3,
    "explanation": "Production automation belongs strictly in protected admin-owned application directories, never world-writable user/public staging folders."
  },
  {
    "id": "q_c4_m4_140",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "A collector processes 1,000 log files copying matching ones cleanly via `shutil.copy2()`. One file inside the batch throws `PermissionError` (e.g., open kernel lock on Windows). Notice exit policy nuance: how should the collector treat partial read locks?",
    "options": [
      "Log the exact failed path at `WARNING`/`ERROR` (`log.error`), record the skip inside the JSON manifest `'errors'` array, continue copying the remaining accessible artifacts cleanly, and exit non-zero (partial-failure code e.g. `2`) so analysts know evidence acquisition was incomplete!",
      "Catch `PermissionError: pass` quietly and exit `0`",
      "Delete already-copied evidence and return `0`",
      "Enable `shell=True` to bypass locks"
    ],
    "correct": 0,
    "explanation": "Preserve partial evidence while refusing to return silent green `0` when readable coverage failed—honesty + resilience together!"
  },
  {
    "id": "q_c4_m4_141",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, how did the script handle a simulated slow subprocess (`time.sleep(5)`) without stalling the whole demo?",
    "options": [
      "Killed OS cleanly with `taskkill` manually",
      "Passed `timeout=1` cleanly to `subprocess.run(...)` and caught `subprocess.TimeoutExpired`",
      "Ran inside `pickle` thread pools",
      "Disabled child sleeping via `shell=True`"
    ],
    "correct": 1,
    "explanation": "Printed `6. timeout after 1.0 s` cleanly when the 1-second timeout terminated `time.sleep(5)`."
  },
  {
    "id": "q_c4_m4_142",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Look at `m04_os_automation.py` line 15: `Path.cwd().is_absolute()`. If a scheduled wrapper changes directory temporarily or fails halfway through an explicit `os.chdir(sub)`, why do experienced Python engineers avoid `os.chdir()` completely in shared helper libraries?",
    "options": [
      "`os.chdir()` throws `SyntaxError` inside functions",
      "`os.chdir()` clears `sys.path` automatically",
      "`os.chdir()` mutates process-wide global state across ALL modules and threads concurrently—instead keep `Path` objects absolute from the start and leave `cwd` undisturbed (or pass explicit `cwd=` directly to `subprocess.run`)!",
      "`Path.cwd()` ignores `os.chdir()`"
    ],
    "correct": 2,
    "explanation": "Manipulating process-global CWD surprises sibling functions/threads cleanly; construct explicit absolute `Path` values and pass `cwd=target_dir` per `subprocess.run()` call."
  },
  {
    "id": "q_c4_m4_143",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which standard library function safely creates a new uniquely named scratch workspace inside the system temp folder cleanly as demonstrated in `m04_os_automation.py`?",
    "options": [
      "`Path('/tmp/test').mkdir()`",
      "`os.tmpfile()`",
      "`shutil.temp('rk-m04-')`",
      "`tempfile.mkdtemp(prefix='rk-m04-')` (or `tempfile.TemporaryDirectory` context manager)"
    ],
    "correct": 3,
    "explanation": "`tempfile` prevents symlink races and folder collisions securely."
  },
  {
    "id": "q_c4_m4_144",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Suppose a child tool called with `subprocess.run(..., capture_output=True, timeout=5)` gets killed by `TimeoutExpired` after 5 seconds cleanly. How can diagnostic logs STILL inspect whatever partial output `stdout`/`stderr` that child emitted right before stalling?",
    "options": [
      "`except subprocess.TimeoutExpired as err:` attaches partial captured bytes on `err.stdout` and `err.stderr` (note: check `err.stderr or b''` because attributes remain `bytes` or `None` even when `text=True` in some edge cases!)",
      "`TimeoutExpired` discards all buffered child output completely cleanly",
      "Re-run `subprocess.run` with `timeout=None`",
      "Check `result.stdout` cleanly anyway"
    ],
    "correct": 0,
    "explanation": "Inspecting `err.stdout`/`err.stderr` inside `TimeoutExpired` frequently shows the exact last prompt or frozen host IP where a hung child stalled!"
  },
  {
    "id": "q_c4_m4_145",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Under which rule is calling `os.system('tar -xf ' + fname)` categorically banned in defensive scripts?",
    "options": [
      "PEP 8 line lengths",
      "Rule 5: Never pass external data to `os.system()`, `shell=True`, `eval()`, or `exec()` (CWE-78 OS Command Injection)",
      "JSON strict quoting",
      "LEGB variable shadowing"
    ],
    "correct": 1,
    "explanation": "Eliminating shell evaluation closes OS command injection uniformly."
  },
  {
    "id": "q_c4_m4_146",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Suppose a web API parses incoming domain names `domain` before calling a diagnostic lookup utility via argument list (`shell=False`, strict `re.fullmatch(r'[A-Za-z0-9.-]{1,253}', domain)`). Why should the wrapper STILL ensure `not domain.startswith('-')` alongside using `'--'`?",
    "options": [
      "Domains regularly begin with hyphens in DNS RFCs",
      "`re.fullmatch` treats `'-'` as an alternation automatically",
      "Valid DNS labels never start with `'-'`, AND if an external lookup tool omits strict `'--'` flag termination or parses options leniently, rejecting leading `'-'` early enforces defense-in-depth!",
      "Regexes forbid periods inside character classes"
    ],
    "correct": 2,
    "explanation": "Combining tight domain regexes, explicit leading-dash rejection, `--` argument barriers, and `shell=False` stacks four clean independent guards."
  },
  {
    "id": "q_c4_m4_147",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "In Linux crontab expressions like `0 3 * * * /opt/rk-tools/venv/bin/python /opt/rk-tools/check.py >> /var/log/rk/check.log 2>&1`, what does `2>&1` accomplish?",
    "options": [
      "Runs two parallel workers cleanly",
      "Skips virtual environments automatically",
      "Sets exit code 2 on success",
      "Redirects `stderr` (descriptor 2) cleanly alongside `stdout` (descriptor 1) into the persistent log file so errors and warnings aren't lost"
    ],
    "correct": 3,
    "explanation": "Without redirecting stderr or using `logging` FileHandlers/journald, tracebacks and `log.warning` output disappear on headless cron jobs."
  },
  {
    "id": "q_c4_m4_148",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "Contrast two cleanup scripts sweeping `/var/rk-cache`: Script 1 runs `shutil.rmtree(cache_dir)` then recreates it; Script 2 deletes strictly validated child entries older than 7 days while skipping `.gitkeep` / active lockfiles inside `finally`-guarded cleanup. Why does Script 2 behave safer when other readers or permissions depend on `cache_dir`?",
    "options": [
      "Destroying and recreating a root cache folder silently wipes customized NTFS/POSIX ACL ownership permissions AND breaks active processes holding locks/handles inside that folder!",
      "Script 1 preserves folder ACLs cleanly automatically",
      "Script 2 bypasses `is_relative_to()` cleanly",
      "`shutil.rmtree` ignores subdirectories cleanly"
    ],
    "correct": 0,
    "explanation": "Modifying stale contents safely rather than destroying and recreating top-level service folders preserves explicit permissions and running worker handles."
  },
  {
    "id": "q_c4_m4_149",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, what two numbers demonstrate difference between system runtime (`3.12.4`) vs shell string behavior cleanly?",
    "options": [
      "Steps 1–2 only",
      "Step 5 contrasting 2 output lines (`['processing report.txt', 'INJECTED']`) under `shell=True` versus single safe line under argv list",
      "Steps 7–8",
      "IPv4 version bits"
    ],
    "correct": 1,
    "explanation": "Step 5 contrasts command injection live with harmless echo output cleanly."
  },
  {
    "id": "q_c4_m4_150",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "On a Linux jump host where Python 3.12 was compiled into `/usr/local/bin/python3` while `/usr/bin/python3` is older Python 3.8, why does hardcoding `#!/usr/bin/env python3` vs `/opt/rk/venv/bin/python` inside a `cron` job create unexpected module-not-found or syntax issues?",
    "options": [
      "`cron` executes shebang lines via Python 2 cleanly",
      "`/usr/bin/env` prevents `is_relative_to()` cleanly",
      "`cron` runs with minimal `PATH=/usr/bin:/bin` (omitting `/usr/local/bin` and your `venv`), resolving Python 3.8 instead unless the cron entry or shebang pins `/opt/rk/venv/bin/python` explicitly!",
      "`cron` disables shebangs on `.py` files"
    ],
    "correct": 2,
    "explanation": "Pinning exact `/opt/.../venv/bin/python /opt/.../tool.py` in scheduler configs removes `PATH` ambiguity completely."
  },
  {
    "id": "q_c4_m4_151",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "In `safe_join(base, user_name)`, which exception class did `m04_os_automation.py` raise when `'../../Windows/win.ini'` attempted to escape `base`?",
    "options": [
      "`FileNotFoundError`",
      "`TimeoutExpired`",
      "`SyntaxError`",
      "`ValueError`"
    ],
    "correct": 3,
    "explanation": "`safe_join()` rejected the escape cleanly with `ValueError(\"path escapes base folder: '../../Windows/win.ini'\")`."
  },
  {
    "id": "q_c4_m4_152",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Watch a sneaky Windows filesystem normalization edge case: suppose an attacker passes `'sub/c.log '` (trailing space) or `'CON'` / `'NUL'` reserved Windows device names inside `user_name` cleanly passing `safe_join(work, user_name)`! What problem hits Windows scripts unless filenames are also validated cleanly?",
    "options": [
      "Windows strips trailing dots/spaces (`'secret.txt '`) inconsistently and treats device names (`CON`, `NUL`, `AUX`) specially cleanly on open—pairing `safe_join()` with strict filename character allowlists avoids reserved-name hangs and bypasses!",
      "Trailing spaces fail `resolve()` cleanly everywhere",
      "Windows opens `CON` cleanly as JSON telemetry",
      "POSIX treats `NUL` identically cleanly"
    ],
    "correct": 0,
    "explanation": "Combining `safe_join` tree containment with filename allowlists rejects Windows reserved device stalls (`CON`/`NUL`/`PRN`) alongside traversal escapes cleanly."
  },
  {
    "id": "q_c4_m4_153",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "When an external helper prints nothing to stderr cleanly on success (`returncode == 0`), how does `m04_os_automation.py` clean whitespace around `result.stdout` cleanly (`'hello from child'`)?",
    "options": [
      "`result.stdout.replace(' ', '')`",
      "`result.stdout.strip()`",
      "`result.stdout.split()`",
      "`result.stdout.upper()`"
    ],
    "correct": 1,
    "explanation": "`.strip()` removes trailing newlines emitted by child `print()` output."
  },
  {
    "id": "q_c4_m4_154",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Suppose an internal security scanner dumps 2 GB of raw output cleanly to `stdout`, and a Python automation wrapper calls `subprocess.run([scanner], capture_output=True, timeout=60)`. Why might the wrapper still crash from RAM exhaustion BEFORE `timeout=60` expires?",
    "options": [
      "`timeout=60` disables RAM bounds on stdout cleanly",
      "`subprocess.run` writes stdout straight to `/tmp` automatically",
      "`capture_output=True` buffers the entire child stdout/stderr inside parent Python memory pipes—when massive verbose output is expected, redirect `stdout=open(bounded_log_path, 'wb')` or stream lines safely using `Popen` with hard byte caps!",
      "Python ignores stdout above 10 MB automatically"
    ],
    "correct": 2,
    "explanation": "Streaming or redirecting high-volume subprocess output to bounded file/pipe consumers prevents parent OOM crashes cleanly."
  },
  {
    "id": "q_c4_m4_155",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Why does calling `subprocess.run(['tool', '--', user_val])` work reliably against leading-hyphen option injection in POSIX utilities cleanly?",
    "options": [
      "`--` runs `tool` inside a container cleanly",
      "`--` enables `shell=True`",
      "`--` strips spaces from `user_val`",
      "`--` instructs POSIX `getopt`-based commands to stop treating subsequent arguments beginning with `'-'` as option flags"
    ],
    "correct": 3,
    "explanation": "`--` separates tool flags safely from positional filenames or search patterns."
  },
  {
    "id": "q_c4_m4_156",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Review Marigold Insurance Brokers CS2 cleanly: `'bob & net localgroup administrators bob /add'`. Why did passing that string through `re.fullmatch(r'[A-Za-z0-9._-]{1,32}', name)` reject it BEFORE even reaching `subprocess.run()`?",
    "options": [
      "Contains spaces, `&`, and `/`—all banned from `[A-Za-z0-9._-]`—so validation blocks the entire malicious ticket string at the front door!",
      "Exceeds 32 bytes only",
      "Contains uppercase letters",
      "Starts with `'b'`"
    ],
    "correct": 0,
    "explanation": "Allowlist validation catches injection payloads at ingestion cleanly *in addition* to safe `shell=False` argv dispatch."
  },
  {
    "id": "q_c4_m4_157",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "When verifying clean removal after running our Task Scheduler lab command `schtasks /Create /TN \"RK-C04-Demo\" ...`, which command tore down the demo task cleanly?",
    "options": [
      "`schtasks /End /TN \"RK-C04-Demo\"`",
      "`schtasks /Delete /TN \"RK-C04-Demo\" /F`",
      "`schtasks /Disable`",
      "`shutil.rmtree`"
    ],
    "correct": 1,
    "explanation": "Clean up every temporary scheduled task cleanly upon lab completion."
  },
  {
    "id": "q_c4_m4_158",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "A Windows administrator creates a scheduled task using `/TR \"\\\"C:\\Python 312\\python.exe\\\" script.py\"` WITHOUT setting `/StartIn` (`WorkingDirectory`). What two defects occur when Task Scheduler runs that job at `03:00 AM`?",
    "options": [
      "Task fails on spaces inside `Python 312`",
      "`/ST 03:00` fails without `/EndTime`",
      "Task Scheduler starts inside `C:\\Windows\\System32`, causing relative `'script.py'` to fail immediately with `can't open file 'C:\\Windows\\System32\\script.py'`—AND any sibling module reads target `System32` accidentally!",
      "Windows runs script as `Guest` automatically"
    ],
    "correct": 2,
    "explanation": "Both the script argument AND working directory (`Start in`) MUST use explicit absolute paths under Task Scheduler."
  },
  {
    "id": "q_c4_m4_159",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "In Lesson 4.6's operational checklist, which behavior ensures a scheduled script does not continue executing endlessly against stalled external services?",
    "options": [
      "Setting `shell=True` globally",
      "Writing temporary files with sequential names `1`, `2`, `3`",
      "Using bare `except: pass` cleanly",
      "Setting explicit finite timeouts on every network, file-share, and subprocess operation cleanly"
    ],
    "correct": 3,
    "explanation": "Finite timeouts cap hang duration deterministically."
  },
  {
    "id": "q_c4_m4_160",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "An automation lead asks whether `--dry-run` can skip `Path.resolve().is_relative_to()` validation so previews run slightly faster. Why is disabling validation during `--dry-run` counterproductive?",
    "options": [
      "Dry-run simulations exist specifically to validate parameters, test path containment, preview exact target files, and catch policy errors cleanly BEFORE performing mutations—skipping checks hides errors until live runs!",
      "`resolve()` takes 10 minutes per file cleanly",
      "`dry-run` fails syntax checks otherwise",
      "Python forbids calling `resolve()` under `argparse`"
    ],
    "correct": 0,
    "explanation": "Dry runs execute 100% of validation, resolution, and discovery logic identically—stopping strictly before destructive writes/state changes."
  },
  {
    "id": "q_c4_m4_161",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "Look at `m04_os_automation.py`: in step 3 (`for name in ['sub/c.log', '../../Windows/win.ini']`), how does `.name` convert the valid result path cleanly for `3. ok: c.log`?",
    "options": [
      "`safe_join(work, name).parent`",
      "`safe_join(work, name).name` (returning filename `'c.log'`)",
      "`safe_join(work, name).stem`",
      "`str(work)`"
    ],
    "correct": 1,
    "explanation": "`Path.name` extracts the final filename string (`'c.log'`) cleanly after `safe_join` verifies containment."
  },
  {
    "id": "q_c4_m4_162",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Inspect `m04_os_automation.py`: why does step 6 test `shutil.which('python') is not None` alongside calling `sys.executable` in steps 4–6 rather than calling `['python', ...]` directly inside `subprocess.run`?",
    "options": [
      "`shutil.which` converts `'python'` into `'cmd.exe'` automatically",
      "`shutil.which` sets `shell=True` automatically",
      "`sys.executable` guarantees running inside the EXACT current interpreter even if another older Python sits higher on `PATH` (or only `python3` exists cleanly, as on many Linux servers where bare `'python'` returns `None`!)",
      "`sys.executable` strips virtual environment packages cleanly"
    ],
    "correct": 2,
    "explanation": "On Linux distros without `python-is-python3`, `shutil.which('python')` often returns `None` while `sys.executable` always identifies `/.../venv/bin/python` accurately!"
  },
  {
    "id": "q_c4_m4_163",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 2, why did `b.log` (2000 B) and `sub/c.log` (300 B) appear inside `'over 100 bytes'`, while `notes.txt` (5 B) and `a.log` (10 B) did not?",
    "options": [
      "100 bytes excludes files > 1000",
      "`notes.txt` failed UTF-8 decoding",
      "`a.log` stayed inside `sub/`",
      "`rglob('*.log')` skipped `notes.txt`, and `st_size > 100` filtered out `a.log` cleanly"
    ],
    "correct": 3,
    "explanation": "Two layered filters cleanly selected `.log` suffix files exceeding 100 bytes (`['b.log', 'c.log']`)."
  },
  {
    "id": "q_c4_m4_164",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "When chaining external utilities in Python, compare running a bash pipeline `subprocess.run('grep Failed auth.log | wc -l', shell=True)` vs doing it purely in Python. Which benefit is MOST decisive from a reliability and security standpoint?",
    "options": [
      "Pure Python (`with open` + `sum(1 for line in fh if 'Failed' in line)`) removes `shell=True` CWE-78 risk completely, works cross-OS (Windows + Linux), avoids external PATH dependencies, and catches errors reliably without silent mid-pipe maskings (`pipefail`)!",
      "Bash runs faster on 1 KB files",
      "Bash pipes always exit non-zero on missing files cleanly",
      "Python streams require `shell=True` for `for line in fh:`"
    ],
    "correct": 0,
    "explanation": "Note even subtle POSIX pipelines fail silently without `set -o pipefail` when `grep` errors! Pure Python replaces fragile pipes cleanly."
  },
  {
    "id": "q_c4_m4_165",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "Why does OWASP rank CWE-78 (OS Command Injection) critically severe when discovered inside internal security automation or router management scripts?",
    "options": [
      "Only affects CSS stylesheets",
      "Successful command injection grants attackers direct OS execution under the script's account privileges (often root/SYSTEM/admin)",
      "Causes slower page sorting",
      "Triggers benign deprecation warnings"
    ],
    "correct": 1,
    "explanation": "Arbitrary OS command execution turns single input flaws directly into full host takeover."
  },
  {
    "id": "q_c4_m4_166",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "In Linux `systemd` security hardening for scheduled Python timers, notice directives like `NoNewPrivileges=yes`, `ProtectSystem=strict`, and `PrivateTmp=yes`. What defensive principle do these service sandboxing flags reinforce cleanly alongside running as non-root `User=rk_svc`?",
    "options": [
      "Removes the need for validating inputs in Python completely",
      "Enables `shell=True` safely on cron jobs",
      "Defense-in-depth containment—even if a parser bug inside the Python script were compromised cleanly, OS kernel namespaces block privilege gain, `/tmp` symlink spying, and read/write mounts across core OS trees!",
      "Compiles `.py` scripts to C automatically"
    ],
    "correct": 2,
    "explanation": "OS-level confinement cleanly caps blast radius underneath Python application-level defenses."
  },
  {
    "id": "q_c4_m4_167",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Why should a Python script scheduled every 10 minutes also include outcome monitoring (a dead man's switch / missing-run alert) beyond catching exceptions?",
    "options": [
      "Exceptions alert automatically even if power fails cleanly",
      "Dead man's switches fix syntax errors automatically",
      "Python logs erase after 5 minutes cleanly",
      "If the entire host hangs, someone accidentally deletes the scheduled task, or disk hits 100% preventing the script from starting, error-only alerts stay quiet while a dead man's switch catches silent disappearance!"
    ],
    "correct": 3,
    "explanation": "Detecting the *absence* of expected healthy completion heartbeats catches both silent failures and disabled scheduler jobs."
  },
  {
    "id": "q_c4_m4_168",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "Looking closely at Practical P1 (`safe_join` + `shutil.copy2` + SHA-256 manifest): suppose `source` holds a file `auth.log` containing 10 MB of active writes while `copy2` copies it cleanly, and you compute `sha256` from the **destination copy** inside `dest`. Why should forensic integrity hashing compare original `source` vs `dest` hashes where practical?",
    "options": [
      "Hashing BOTH source read and destination copy verifies zero silent corruption occurred during disk transfer—AND any mismatch flags a live modified log actively shifting mid-capture cleanly in the audit manifest!",
      "Hashes of identical files always differ after `shutil.copy2`",
      "`shutil.copy2` converts CRLF automatically on Windows",
      "JSON manifests forbid hex strings"
    ],
    "correct": 0,
    "explanation": "Comparing acquisition hashes detects disk/copy corruption or live file contention cleanly."
  },
  {
    "id": "q_c4_m4_169",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "Which standard Python function creates directory hierarchies safely without raising `FileExistsError` when directories already exist?",
    "options": [
      "`Path.mkdir(exist_ok=False)`",
      "`Path.mkdir(parents=True, exist_ok=True)`",
      "`os.mkfile()`",
      "`shutil.mkdirs()`"
    ],
    "correct": 1,
    "explanation": "Setting `parents=True, exist_ok=True` behaves idempotently cleanly across existing directories."
  },
  {
    "id": "q_c4_m4_170",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Look at `safe_join(work, 'sub\\\\..\\\\..\\\\Windows\\\\win.ini')` tested on Linux vs Windows! Notice on Linux `'\\\\'` is treated as an ordinary filename character, whereas on Windows `'\\\\'` separates directories. How can a cross-platform extractor reject BOTH Windows backslash traversal AND POSIX forward slash traversal uniformly on Linux servers too?",
    "options": [
      "Let Linux create weird files containing `..\\`",
      "Convert `/` to `\\\\` on Linux",
      "Reject unexpected `'\\\\'` characters explicitly cleanly (or normalize archive entry separators consistently before `safe_join(base, normalized)` alongside checking `is_relative_to`)!",
      "Trust `zipfile.extractall()` blindly on old Python versions"
    ],
    "correct": 2,
    "explanation": "Normalizing/validating cross-platform archive separators (`/` and `\\`) explicitly stops crafted cross-OS archive payloads early."
  },
  {
    "id": "q_c4_m4_171",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 6, what exact diagnostic printed when a child executed `time.sleep(5)` under `timeout=1`?",
    "options": [
      "`error: exit 1`",
      "`FileNotFoundError`",
      "`CalledProcessError`",
      "`6. timeout after 1.0 s`"
    ],
    "correct": 3,
    "explanation": "`TimeoutExpired` stores `err.timeout` (`1` / `1.0` depending on platform Python format), confirming deterministic hang termination."
  },
  {
    "id": "q_c4_m4_172",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Contrast `eval('1 + 2')` vs `ast.literal_eval(s)` when a script accidentally receives Python literal data (say `\"[22, 443]\"`) rather than JSON. Why is `eval()` dangerous whereas `ast.literal_eval()` (though JSON is cleaner still!) stays immune to code execution?",
    "options": [
      "`eval()` compiles and runs **arbitrary expressions/imports** (`__import__('os').system(...)`), whereas `ast.literal_eval()` strictly constructs literal constants (`str`, `bytes`, numbers, `tuple`, `list`, `dict`, `set`, `bool`, `None`)—yet **JSON (`json.loads`) remains superior** for data exchange cleanly!",
      "`eval()` checks types strictly cleanly",
      "`eval()` rejects underscores cleanly",
      "`ast.literal_eval` works only with `shell=True`"
    ],
    "correct": 0,
    "explanation": "Rule 5 bans `eval()`/`exec()` unconditionally on external data; prefer explicit typed conversion or `json.loads()` cleanly."
  },
  {
    "id": "q_c4_m4_173",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "When running a Windows Scheduled Task calling Python inside a virtual environment, why is referencing `C:\\rk-tools\\venv\\Scripts\\python.exe` cleanly better than bare `python.exe`?",
    "options": [
      "Enables interactive console input prompts during 3 AM runs",
      "Locks execution cleanly into the isolated hash-pinned `venv` and ignores global/system `PATH` surprises",
      "Converts Python automatically into C bytecode",
      "Skips Task Scheduler credential checks"
    ],
    "correct": 1,
    "explanation": "Explicit venv interpreter paths eliminate dependency mismatch and `PATH` hijack ambiguity."
  },
  {
    "id": "q_c4_m4_174",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "A defender designs an automated IP-block script (`block_ip.py`) integrated with a ticketing webhook. To prevent accidental corporate WAN outage if a bug loops all private IPs (`10.0.0.0/8`), what THREE defensive operational controls from Courses 01–04 should wrap `block_ip.py` before deploying?",
    "options": [
      "Run via `shell=True`, skip logs, disable errors",
      "Unpickle ticket payloads + infinite loop retries",
      "`(1)` Strict allowlist / non-routable deny-guard blocking `ip.is_private` / `ip.is_loopback` / critical corp assets (`allow-list`), `(2)` `--dry-run` staging + per-run max block cap (`blast-radius limit`), and `(3)` explicit audit logs + TTL auto-expiry!",
      "Hardcode admin passwords cleanly inside argv flags"
    ],
    "correct": 2,
    "explanation": "Defensive automation guards against self-DoS with asset allowlists, bounded change rates, `--dry-run` testing, and immutable audit trails."
  },
  {
    "id": "q_c4_m4_175",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 5, what exact shell line proved injection succeeded cleanly on the unguarded call?",
    "options": [
      "`['processing report.txt']` only",
      "`rc = 3`",
      "`5. list args output: INJECTED`",
      "`5. shell=True output lines: ['processing report.txt', 'INJECTED']`"
    ],
    "correct": 3,
    "explanation": "Printing `'INJECTED'` on a separate second line proved the `&` operator executed `echo INJECTED` as a second OS command."
  },
  {
    "id": "q_c4_m4_176",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Look carefully at `sys.version` vs `sys.version_info` when programmatically gating a script cleanly for Python `>= 3.10`. Why is `if sys.version_info < (3, 10):` vastly cleaner and bug-free compared to `if sys.version[:4] < '3.10':`?",
    "options": [
      "Comparing tuples `(3, 12, 4) >= (3, 10)` uses exact integer comparisons—whereas naive string comparisons miscompare `'3.9' > '3.10'` alphabetically because character `'9' > '1'`!",
      "`sys.version` starts with compiler copyright cleanly",
      "`sys.version_info` returns booleans automatically",
      "`platform.system()` holds Python version numbers"
    ],
    "correct": 0,
    "explanation": "Echoing Module 1's integer vs string lesson (`'9' > '100'`), always compare `sys.version_info` numeric tuples rather than version text slices!"
  },
  {
    "id": "q_c4_m4_177",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which standard `pathlib.Path` method (available cleanly since Python 3.9) verifies cleanly whether `target` lies inside directory tree `base`?",
    "options": [
      "`target.inside(base)`",
      "`target.is_relative_to(base)`",
      "`target.startswith(base)`",
      "`base.contains(target)`"
    ],
    "correct": 1,
    "explanation": "`target.is_relative_to(base)` performs true path-segment prefix comparison safely after calling `.resolve()`."
  },
  {
    "id": "q_c4_m4_178",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "difficult",
    "q": "Suppose a script invokes `[sys.executable, helper_path]` via `subprocess.run` cleanly inside a hardened directory where `PATH` was cleared (`env={}`). Why might some Windows Python scripts fail mysteriously with `WinError` or missing DLL/socket resolution when passing a completely **empty** `env={}`?",
    "options": [
      "Windows ignores `env={}` completely",
      "Linux requires `WINDIR` inside every environment",
      "Windows requires baseline OS environment variables like `SYSTEMROOT` and `COMSPEC` cleanly inside processes initializing WinSock/networking—always construct minimal clean `env` preserving strictly essential OS baseline keys (`SYSTEMROOT`, `TMP`, `PATH='/Windows/System32'`) rather than blind `{}`!",
      "`subprocess.run` sets `shell=True` whenever `env={}` is passed"
    ],
    "correct": 2,
    "explanation": "Sanitized least-privilege `env` allowlists drop secrets/untrusted overrides cleanly while retaining required OS baseline keys (`SYSTEMROOT` on Windows, `LANG`/`PATH=/usr/bin:/bin` on POSIX)."
  },
  {
    "id": "q_c4_m4_179",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "medium",
    "q": "In Scenario S1 (`zip -r {archive} {folder}`), what native Python stdlib modules eliminate needing to launch the external `zip` binary entirely?",
    "options": [
      "`pickle` or `csv`",
      "`logging` or `time`",
      "`ipaddress` or `re`",
      "`zipfile` or `shutil.make_archive`"
    ],
    "correct": 3,
    "explanation": "`zipfile` and `shutil.make_archive()` build archives natively in Python without spawning OS subprocesses cleanly."
  },
  {
    "id": "q_c4_m4_180",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "difficult",
    "q": "When hardening Linux scripts invoked by scheduled timers, why should file permissions be `0750` or `0700` owned by `root` (or `root:rk_svc` read-only for the script user cleanly) instead of `0777` or `0666`?",
    "options": [
      "`0777` grants write/modify access to every local user on the machine, turning scheduled tasks straight into local privilege escalation (`T1053` / `CWE-732`)!",
      "Python crashes on files ending in permissions `7`",
      "`0750` encrypts source files cleanly at rest",
      "`systemd` deletes files under `0777` automatically"
    ],
    "correct": 0,
    "explanation": "Strict ownership (`chown`) and read/exec-only script permissions cleanly protect scheduled jobs from local tampering (even better, keep the script un-modifiable by the runtime `rk_svc` user itself so a bug inside the runtime account cannot persist!)."
  },
  {
    "id": "q_c4_m4_181",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "medium",
    "q": "Why must temporary scratch workspaces created during an evidence script always be cleaned cleanly inside `finally:` or `tempfile.TemporaryDirectory()`?",
    "options": [
      "Python refuses exiting unless temp folders vanish",
      "Frees disk space, avoids clutter, and ensures sensitive extracted telemetry does not linger readable on host temp storage after abort or failure",
      "Prevents `Path.rglob()` from matching files twice cleanly",
      "Required for `check=True` syntax"
    ],
    "correct": 1,
    "explanation": "Deterministic cleanup removes sensitive intermediate artifacts regardless of exceptions cleanly."
  },
  {
    "id": "q_c4_m4_182",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "difficult",
    "q": "In Practical P2 (`C04-M04-P2`), after changing `user_input` cleanly to `'x ; echo INJECTED'` on Linux vs `'x & echo INJECTED'` across `shell=True`, why does a single `;` fail to inject cleanly inside Windows `cmd.exe` yet inject immediately inside POSIX `/bin/sh`?",
    "options": [
      "`;` fails injection on every OS",
      "`cmd.exe` escapes semicolons cleanly via `shlex`",
      "Different operating system shells parse DIFFERENT command-chaining metacharacters (`;` separates statements in `/bin/sh`, whereas `&` / `&&` / `|` separate statements in Windows `cmd.exe`!)—making cross-OS shell filtering brittle and proving `shell=False` argument lists are essential!",
      "`/bin/sh` treats `&` strictly as text"
    ],
    "correct": 2,
    "explanation": "OS shells differ subtly in metacharacter lexers (`;` vs `&` vs `%...%` vs `$(...)`), making manual filtering fragile while `shell=False` lists solve all platforms uniformly."
  },
  {
    "id": "q_c4_m4_183",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py`, how did the script determine whether an error-free run of `shutil.which('python')` located an interpreter binary cleanly?",
    "options": [
      "`shutil.which('python') == True`",
      "`shutil.which('python').exists()`",
      "`int(shutil.which('python')) > 0`",
      "`shutil.which('python') is not None`"
    ],
    "correct": 3,
    "explanation": "`shutil.which()` returns either the full executable string or `None`, making `is not None` the idiomatic null check."
  },
  {
    "id": "q_c4_m4_184",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "difficult",
    "q": "Look carefully at `safe_join(base, user_name)`: what happens on Linux if `work` does not exist yet or target subdirectories haven't been created yet—does `Path.resolve()` still collapse `..` cleanly even on non-existent target files?",
    "options": [
      "Yes! On modern Python 3.6+, `Path.resolve()` defaults to `strict=False` cleanly—collapsing lexical `..` segments cleanly and resolving existing parent symlinks even before creating the new leaf file!",
      "Raises `FileNotFoundError` unconditionally on non-existent targets cleanly",
      "Ignores `..` completely unless `strict=True`",
      "Returns `None` on non-existent paths"
    ],
    "correct": 0,
    "explanation": "Python 3 `Path.resolve()` (`strict=False` default) canonicalizes parent folders and `..` safely even when validating paths about to be written for the first time cleanly."
  },
  {
    "id": "q_c4_m4_185",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "When `subprocess.run` invokes a binary that prints `'processing report.txt & echo INJECTED'` inside `list args output`, why didn't `'INJECTED'` print on a second line?",
    "options": [
      "The child printed `&` only on Windows cleanly",
      "Without a shell interpreter (`shell=False`), `&` carried no command-chaining meaning and arrived intact inside `sys.argv[1]`",
      "The script blocked `'echo'` via `safe_join`",
      "`text=True` escaped `&` into `'&amp;'"
    ],
    "correct": 1,
    "explanation": "Data passed through `argv` lists bypasses shell metacharacter interpretation completely."
  },
  {
    "id": "q_c4_m4_186",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Suppose an engineer uses `subprocess.run(['python', '-c', code, '--', user_val])`, yet forgets and sets `shell=True` alongside passing a Python **list**! On Linux (`shell=True` + **list** `['echo', 'hi']`), what notoriously confusing Python behavior breaks expectations?",
    "options": [
      "Works safely identically to `shell=False`",
      "Raises `ValueError` immediately on all OSes",
      "On POSIX Linux, `subprocess.run(['prog', 'arg1'], shell=True)` runs `/bin/sh -c prog arg1` where `'arg1'` becomes `$0` of the shell rather than being passed to `'prog'`—ignoring extra arguments or misrouting completely! Never mix **lists** with `shell=True`!",
      "Executes elements recursively"
    ],
    "correct": 2,
    "explanation": "Remember cleanly: list args belong strictly with `shell=False` (the safe default); never combine lists with `shell=True`."
  },
  {
    "id": "q_c4_m4_187",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "When automating scheduled verification tasks, why should baselines like Windows' 194 built-in scheduled tasks (`Get-ScheduledTask`) be documented initially?",
    "options": [
      "So defenders disable all 194 Windows services cleanly",
      "Required for `schtasks /Create` syntax",
      "So Python scripts load all 194 tasks cleanly into `sys.path`",
      "Known-good task baselines let incident hunters spot newly planted unauthorized persistence (`ATT&CK T1053`) tasks immediately"
    ],
    "correct": 3,
    "explanation": "Comparing current schedules against clean baselines is core blue-team persistence detection."
  },
  {
    "id": "q_c4_m4_188",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "A SOC script writes diagnostic metrics to `metrics.json` every 5 minutes cleanly. Consider an error handler: `try: run() except Exception: log.exception('failed'); sys.exit(1)`. If a developer asks 'Wait—why not print a stack trace cleanly AND log API tokens so debugging is faster?', how do you refute logging API keys cleanly?",
    "options": [
      "Logs frequently ship out to centralized SIEMs, tickets, and readable files shared across far broader staff permissions than production secret stores (`CWE-532`)—log redacted prefixes/key IDs instead, never full secrets!",
      "API keys compress cleanly into JSON logs without risk",
      "`logging.ERROR` encrypts secrets automatically cleanly",
      "Stack traces skip string arguments automatically"
    ],
    "correct": 0,
    "explanation": "`CWE-532` (Insertion of Sensitive Information into Log File) turns crash debugging logs directly into credential leaks unless scrubbed intentionally."
  },
  {
    "id": "q_c4_m4_189",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "Look at `m04_os_automation.py`: which built-in stdlib module created the temporary test folder and removed it cleanly at script completion?",
    "options": [
      "`platform` + `subprocess`",
      "`tempfile` (`mkdtemp`) + `shutil` (`rmtree`)",
      "`json` + `csv`",
      "`re` + `ipaddress`"
    ],
    "correct": 1,
    "explanation": "`tempfile.mkdtemp(prefix='rk-m04-')` provisioned the scratch space and `shutil.rmtree(work)` deleted it completely."
  },
  {
    "id": "q_c4_m4_190",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Suppose an engineer writes `tmp_path = '/tmp/scan_' + user_id` cleanly on a multi-user Linux workstation instead of `tempfile.mkdtemp()`. Even without path traversal `'../'`, why does creating files under predictable shared `/tmp` filenames expose a classic local privilege/race flaw (`CWE-377`)?",
    "options": [
      "`'/tmp'` only stores binary files cleanly",
      "Linux forbids `'_'` characters inside `/tmp`",
      "An unprivileged local attacker watching predictable paths can pre-create a symbolic link `/tmp/scan_admin -> /etc/cron.d/pwn` before the script opens it, causing an elevated script to follow the symlink and overwrite arbitrary host files (`tempfile` creates private `0700` random dirs preventing this race)!",
      "`mkdtemp` assigns predictable timestamps only"
    ],
    "correct": 2,
    "explanation": "`tempfile` (`mkdtemp` / `NamedTemporaryFile` / `TemporaryDirectory`) creates unguessable private paths atomically via `O_EXCL` (`0700`/`0600`), defeating `CWE-377` symlink races."
  },
  {
    "id": "q_c4_m4_191",
    "topic": "C04-M04-L02: Directory Walks & Path Traversal",
    "difficulty": "medium",
    "q": "Which exception class catches both `TimeoutExpired` and `CalledProcessError` together inside `try / except ...:` cleanly if logging general child failures?",
    "options": [
      "`ValueError`",
      "`ImportError`",
      "`KeyError`",
      "`subprocess.SubprocessError` (base parent class of both `CalledProcessError` and `TimeoutExpired`)"
    ],
    "correct": 3,
    "explanation": "Checking `(subprocess.SubprocessError, OSError)` handles timeouts, non-zero exit status, and missing binaries (`FileNotFoundError`) uniformly."
  },
  {
    "id": "q_c4_m4_192",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "Examine `m04_os_automation.py`: `result = subprocess.run([sys.executable, '-c', \"print('hello from child')\"])`. Notice `'hello from child'` was trusted hardcoded Python inside `[...]`. What rule determines when `-c` inside a subprocess list is SAFE versus UNSAFE?",
    "options": [
      "`-c` is safe ONLY when the entire code snippet string is static hardcoded text (NEVER formatted with untrusted variables) while external data enters strictly via `sys.argv[1:]`!",
      "`-c` is safe with f-strings if `shell=False`",
      "`-c` should always wrap `eval()`",
      "`-c` requires `shell=True`"
    ],
    "correct": 0,
    "explanation": "Code strings (`-c`, SQL strings, `shell=True`) must remain 100% static; external values pass strictly through clean data channels (`sys.argv`, parameterized SQL, stdin JSON)."
  },
  {
    "id": "q_c4_m4_193",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Why should automated cron/Task Scheduler health scripts check *previous* exit telemetry or write local completion timestamps when pushing metrics?",
    "options": [
      "Eliminates the need for timeouts cleanly",
      "Enables external monitoring/dead man's switches to detect silent failures or disabled tasks rapidly",
      "Forces Python 2 compatibility cleanly",
      "Disables overlapping runs automatically without locks"
    ],
    "correct": 1,
    "explanation": "Completion timestamps let watchdogs fire pages when periodic runs quietly fail to appear."
  },
  {
    "id": "q_c4_m4_194",
    "topic": "C04-M04-L06: Idempotency, Dry Run & Exit Codes",
    "difficulty": "difficult",
    "q": "In Course 04 Scenario S2 (hanging network share collector), why does verifying share mount/reachability with a short explicit timeout BEFORE entering heavy file sweeps improve resilience?",
    "options": [
      "Mounts SMB shares automatically without credentials cleanly",
      "Converts `shutil.copy2` into non-blocking async automatically",
      "Fails fast in ~2 seconds with clear `'share unreachable'` telemetry + non-zero exit instead of thrashing nested directory retries for minutes on an offline mount!",
      "Clears `TimeoutExpired` exceptions silently"
    ],
    "correct": 2,
    "explanation": "Fail-fast dependency pre-checks localize root causes clearly in logs rather than timing out deep inside loops."
  },
  {
    "id": "q_c4_m4_195",
    "topic": "C04-M04-P1 & P2: OS Automation Labs",
    "difficulty": "medium",
    "q": "Wait: in Practical P1 step 2 (`copy files modified in the last N minutes preserving relative paths`), which function copies files while retaining original modification timestamps cleanly?",
    "options": [
      "`shutil.move`",
      "`Path.write_bytes`",
      "`Path.unlink`",
      "`shutil.copy2`"
    ],
    "correct": 3,
    "explanation": "`shutil.copy2(src, dst)` copies bytes and attempts preserving metadata/timestamps cleanly (avoiding destructive moves over primary evidence)."
  },
  {
    "id": "q_c4_m4_196",
    "topic": "C04-M04-L01: Platform, Environment & PATH",
    "difficulty": "difficult",
    "q": "Why does Python automation running under Windows/Linux services often suffer subtle bugs if code inspects `os.getlogin()` instead of `getpass.getuser()`?",
    "options": [
      "`os.getlogin()` reads an attached interactive terminal (`tty`) cleanly and routinely raises `OSError` inside detached cron/`systemd`/Task Scheduler backgrounds—use `getpass.getuser()` safely instead!",
      "`os.getlogin()` executes faster inside Task Scheduler",
      "`os.getlogin()` exposes user passwords cleanly",
      "`getpass.getuser()` sets `shell=True`"
    ],
    "correct": 0,
    "explanation": "Background automation lacks interactive TTY terminals; testing scheduled scripts headlessly catches console assumptions immediately cleanly."
  },
  {
    "id": "q_c4_m4_197",
    "topic": "C04-M04-L03: subprocess.run & Error Handling",
    "difficulty": "medium",
    "q": "In `m04_os_automation.py` step 6, what exit status code did `err.returncode` print when the child ran `sys.exit(3)` under `check=True`?",
    "options": [
      "`0`",
      "`3`",
      "`1`",
      "`-3`"
    ],
    "correct": 1,
    "explanation": "Verified output: `non-zero exit detected: 3`."
  },
  {
    "id": "q_c4_m4_198",
    "topic": "C04-M04-L04: Command Injection (CWE-78)",
    "difficulty": "difficult",
    "q": "A teammate says: 'Our Python script takes a ticket host string and removes spaces (`host = host.replace(' ', '')`) cleanly before running `subprocess.run(f'ping -c 1 {host}', shell=True)`. Is it safe now?' How can an attacker STILL exploit Linux `ping` command injection cleanly with **ZERO spaces**?!",
    "options": [
      "Zero-space strings cannot inject commands on Linux",
      "Removing spaces forces `shell=False` automatically",
      "On Linux `/bin/sh`, `;id` or `host;cat${IFS}/etc/passwd` or `$(whoami)` runs arbitrary commands cleanly using ZERO spaces (`${IFS}` acts as whitespace separator in shells, and `;` needs no spaces)! Drop `shell=True` unconditionally!",
      "`ping` disables `;` inside shells"
    ],
    "correct": 2,
    "explanation": "`${IFS}` and shell metacharacters like `;`, `|`, and `$(...)` require zero ASCII spaces—proving once again why string filtering cannot fix `shell=True` cleanly."
  },
  {
    "id": "q_c4_m4_199",
    "topic": "C04-M04-L05: Safe Scheduling & T1053",
    "difficulty": "medium",
    "q": "Which rule prevents unprivileged OS users from tampering with files imported via `sys.path[0]` alongside a scheduled `SYSTEM` Python script?",
    "options": [
      "Installing packages with `sudo pip` globally",
      "Setting `timeout=None` inside `subprocess.run`",
      "Using relative paths cleanly everywhere",
      "Locking BOTH the script file AND its entire parent directory hierarchy + `venv` write permissions strictly to administrators/root (paired with running under least privilege and `-I`)"
    ],
    "correct": 3,
    "explanation": "Protecting the parent folder prevents attackers from renaming files or dropping shadowed stdlib modules (`json.py`) alongside scheduled scripts."
  },
  {
    "id": "q_c4_m4_200",
    "topic": "C04-M04-L01..L06: Module 4 Synthesis",
    "difficulty": "difficult",
    "q": "Synthesizing Module 4 safely: you must build a nightly scheduled Linux utility collecting `.log` artifacts modified in the past 60 minutes from `/var/log/apps` into `/var/sec/vault` with manifest verification. Which integrated design meets EVERY Course 04 requirement cleanly?",
    "options": [
      "Run as `root` via `os.system('find /var/log/apps ...')` storing manifests via `pickle`",
      "Run as `root` inside `/tmp/collect.py` using `shell=True` + `tar -cf` without timeouts",
      "Run via `systemd` timer as dedicated `rk_collect` user pointing `/opt/rk/venv/bin/python -I /opt/rk/collect.py`; verify `vault` isn't inside `source`; discover files cleanly via `Path.rglob()`/`stat().st_mtime`; enforce `safe_join()` containment; preserve times via `shutil.copy2()`; emit timestamped UTC JSON manifest atomically with finite lock & non-zero errors on failures!",
      "Read logs using unbounded `.read_text()` into memory with bare `except: pass`"
    ],
    "correct": 2,
    "explanation": "Zero shells, least privilege (`rk_collect`), locked install tree + `-I`, traversal containment, preserved timestamps, atomic manifests, and observable fail-loud exits unify all six Module 4 lessons."
  }
];
