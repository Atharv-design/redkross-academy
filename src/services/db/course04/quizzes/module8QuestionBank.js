/**
 * Course 04: Python for Cybersecurity — Module 8 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module8QuestionBank = [
  {
    "id": "q_c4_m8_001",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "In Case Study C04-M08-CS2 (Lotus Logistics, fictional), how did a regex 'cleanup' blind a SOC log parser for two straight weeks without raising any crashes?",
    "options": [
      "The regex triggered catastrophic ReDoS timeouts on startup",
      "The altered regex stopped matching real log lines, causing the script to exit cleanly every day with `'no findings'` instead of failing known-bad tests",
      "Python's `json.dumps()` stripped all alerts automatically",
      "Cron skipped running the parser on odd days"
    ],
    "correct": 1,
    "explanation": "A tool that runs cleanly without crashing proves only syntax validity; missing known-bad tests and unmonitored `skipped_lines` allowed silent blindness."
  },
  {
    "id": "q_c4_m8_002",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "According to the US SEC enforcement release on the **1 August 2012 Knight Capital** incident (`C04-M08-CS1`), what concrete combination caused over `$460 million` in losses in just 45 minutes?",
    "options": [
      "Knight Capital lacked `pyproject.toml` console entry points",
      "A Python regex looped indefinitely inside an SSH log file",
      "Attackers guessed an off-host HMAC key using Python `==` timing leaks",
      "Dead code from 2005 lingered in the router, a late-July 2012 deployment hit servers unevenly reactivating that defective flag, and 97 pre-open alert emails went unacted upon"
    ],
    "correct": 3,
    "explanation": "Knight Capital shows why engineers must delete dead code, test deployments end-to-end across all nodes, build actionable monitoring, and maintain kill switches."
  },
  {
    "id": "q_c4_m8_003",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "Why must a detection rule's automated test suite include BOTH **known-bad** samples AND **known-good** samples?",
    "options": [
      "Known-bad samples are needed only when `--json` is passed",
      "`unittest` blocks execution unless tests match 1:1",
      "Known-good tests automatically fix syntax errors in JSON configs",
      "Known-bad samples prove alerts trigger on attacks, while known-good samples (such as 1 benign failed login) prove normal traffic does not raise false alarms"
    ],
    "correct": 3,
    "explanation": "Testing only known-bad approves overly broad patterns that alert on everything; testing only known-good misses dead silent rules."
  },
  {
    "id": "q_c4_m8_004",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "In Scenario S1, a colleague tweaks `rkloga`'s `LINE_RX` regex and claims `'it still runs fine'`. Beyond running unit tests, what diagnostic comparison on sanitized real logs immediately proves a refactor didn't silently drop valid events?",
    "options": [
      "Measuring execution time improvement under 1 millisecond",
      "Checking whether `rkloga.py` returns exit code `0` on an empty string",
      "Comparing `skipped_lines` and parsed event counts before vs. after the regex change across identical real logs alongside known-bad test samples",
      "Running `Black` formatter over `rkloga.py`"
    ],
    "correct": 2,
    "explanation": "A sudden surge in `skipped_lines` (and drop in `events`) cleanly catches broken regex matching before staging hits production."
  },
  {
    "id": "q_c4_m8_005",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What three properties define clean, trustworthy automated unit tests for security software?",
    "options": [
      "Fast execution, independence between tests, and deterministic offline repeatability (fixed timestamps, zero live network calls, temp cleanup)",
      "Live internet queries, randomized sleeps, and persistent desktop files",
      "Catching `BaseException`, silent passes, and testing happy paths only",
      "Skipping missing-file tests so test stderr remains completely blank"
    ],
    "correct": 0,
    "explanation": "Fast, deterministic offline tests run in milliseconds on every commit without flaky network or wall-clock race failures."
  },
  {
    "id": "q_c4_m8_006",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Look at the **Test Pyramid** (`C04-M08-F2`): why should a log utility like `rkloga` keep MANY fast unit tests (`parse_line`, `analyse`) at the base and FEWER full CLI process / integration checks near the top?",
    "options": [
      "Unit tests cannot test `return 2` unless wrapped in subprocesses",
      "Pure unit tests exercise dozens of edge inputs (`>2,048` byte lines, time boundaries, injections) in under 5ms without disk I/O overhead, while targeted integration and CLI tests confirm wiring cleanly",
      "Integration tests cannot verify JSON schemas",
      "`unittest` limits `CliTests` to a maximum of 3 methods"
    ],
    "correct": 1,
    "explanation": "In-memory pure unit checks scale cleanly to complex matrices at near-zero runtime cost, reserving higher-cost file/CLI checks for integration contracts."
  },
  {
    "id": "q_c4_m8_007",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "Which of the following is a **failure-path** test case essential for a security log parser CLI?",
    "options": [
      "Passing a clean SSH login line matching `LINE_RX`",
      "Passing a non-existent logfile path (`no_such_file.log`) or invalid flag (`--spray-users 1`) and asserting exit code `2` cleanly",
      "Checking PEP 8 whitespace spacing with Black",
      "Printing docstring text to stdout"
    ],
    "correct": 1,
    "explanation": "Verifying that invalid arguments and missing inputs explicitly return error exit `2` prevents silent fail-open defects."
  },
  {
    "id": "q_c4_m8_008",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "In `test_rkloga.py`, notice `test_no_findings_for_single_failure` feeds 1 failed login for `'asha'` into `analyse(..., timedelta(minutes=5), 3)` and asserts `r['findings'] == []`. What failure mode does this negative check stop?",
    "options": [
      "Verifies `parse_line` accepts 5,000-byte strings",
      "Stops off-by-one threshold bugs or hardcoded alert placeholders (`spray` firing at count `1` instead of `>= 3`) from flooding SOC queues on isolated user typos",
      "Confirms exit code `2` on invalid IPs",
      "Tests Windows Event CSV column headers"
    ],
    "correct": 1,
    "explanation": "Boundary known-good cases verify detectors remain quiet below calibrated thresholds."
  },
  {
    "id": "q_c4_m8_009",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "How long did Knight Capital's post-open malfunctioning order storm last according to the US SEC report (`C04-M08-R4`)?",
    "options": [
      "Ten minutes",
      "Four days straight",
      "The first `45 minutes` after market open (`>4 million` orders across `397 million` shares)",
      "One full fiscal quarter"
    ],
    "correct": 2,
    "explanation": "SEC Press Release 2013-222 documents over `$460 million` lost in the first 45 minutes after market opening on 1 August 2012."
  },
  {
    "id": "q_c4_m8_010",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "In Practical P1 (`Break and repair`), a learner temporarily alters `LINE_RX` inside `rkloga.py` from `'Failed|Accepted'` to `'Failed'` and runs `python -m unittest -v`. Which two existing test methods in `test_rkloga.py` catch that break instantly?",
    "options": [
      "None of the 10 tests fail",
      "`ParseTests.test_valid_failed_line` and `CliTests.test_missing_file_returns_2`",
      "`AnalyseTests.test_spray_detected_once` and `ParseTests.test_garbage_and_oversized_lines_rejected`",
      "`AnalyseTests.test_success_after_failure` and `CliTests.test_findings_return_1` (because `OK` `Accepted password` stops matching, dropping `parse_line(OK)` to `None`)"
    ],
    "correct": 3,
    "explanation": "Mutating `Failed|Accepted` breaks parsing of `Accepted` lines (`OK`), crashing `.ts` attribute lookup on `None` inside `events` and blocking `success_after_failure` findings."
  },
  {
    "id": "q_c4_m8_011",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Why is `rkloga.py`'s entry function declared cleanly as `def main(argv: list[str] | None = None) -> int:` rather than `def main():` calling `parser.parse_args()` unconditionally?",
    "options": [
      "Python's `sys.exit()` fails unless `argv` is annotated as a `list[str]`",
      "Unit tests (`CliTests`) can pass synthetic argument lists like `rkloga.main(['no_such_file.log'])` and inspect return code `2` cleanly in-process without spawning external OS subprocesses",
      "`argparse` rejects positional arguments without `argv`",
      "Returning `int` prints stack traces automatically"
    ],
    "correct": 1,
    "explanation": "Testable CLI design injects `argv` directly (defaulting to `None`, which `argparse` reads from `sys.argv[1:]` in real CLI runs)."
  },
  {
    "id": "q_c4_m8_012",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Inspect `test_rkloga.py`'s local execution output (`Ran 10 tests in 0.005s / OK`). During the passing run, stderr contained `ERROR file not found: no_such_file.log`. What generated that line?",
    "options": [
      "`rkloga`'s own `log.error(...)` output emitted when `CliTests.test_missing_file_returns_2` deliberately tested missing-file handling (`ok` confirms the test passed cleanly!)",
      "An unhandled `FileNotFoundError` crashing `unittest`",
      "Corrupted sample file paths inside the repository",
      "Python `unittest` failing to import `rkloga`"
    ],
    "correct": 0,
    "explanation": "Testing negative error paths triggers the tool's genuine diagnostic logs while `assertEqual(..., 2)` asserts `'... ok'` cleanly."
  },
  {
    "id": "q_c4_m8_013",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "In `ParseTests.test_suspicious_user_text_rejected`, what string proves `LINE_RX` blocks shell/command injection text inside the username slot?",
    "options": [
      "`'invalid user admin'`",
      "`'bob; rm -rf /'` (rejected with `assertIsNone` because `[w.@-]{1,64}` forbids spaces and `;`)",
      "`'x' * 5000`",
      "`'hello world'`"
    ],
    "correct": 1,
    "explanation": "Restricting username grammar cleanly prevents hostile characters cleanly at `parse_line` ingestion (`assertIsNone`)."
  },
  {
    "id": "q_c4_m8_014",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Notice in `test_rkloga.py` how `write_temp(lines)` closes `NamedTemporaryFile` cleanly BEFORE returning `Path(fh.name)`, and every `CliTests` method deletes it inside `try ... finally: p.unlink()`. Why is closing BEFORE `main()` + `finally` deletion vital on Windows?",
    "options": [
      "Windows stores `NamedTemporaryFile` contents in RAM only after `unlink()`",
      "Windows denies concurrent unlink/re-read errors on open temporary file handles (`delete=False` + closing `with` block unlocks cleanly for `main()`, while `finally` unlinks even if assertions fail)",
      "`rkloga.py` skips reading files created with `delete=True` silently as `exit 0`",
      "`finally:` forces `argparse` to reset defaults"
    ],
    "correct": 1,
    "explanation": "Using `delete=False`, exiting the `with` writer cleanly, and unlinking in `finally:` guarantees cross-platform Windows/Linux test compatibility with zero leftover temp files."
  },
  {
    "id": "q_c4_m8_015",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Which standard-library assertion method in `unittest.TestCase` verifies that `rkloga.parse_line('hello world')` returns `None`?",
    "options": [
      "`self.assertEqual(None, 0)`",
      "`self.assertRaises(None)`",
      "`self.assertFalse(ValueError)`",
      "`self.assertIsNone(...)`"
    ],
    "correct": 3,
    "explanation": "`assertIsNone` strictly tests `expr is None` (distinguishing `None` cleanly from falsy `False`, `0`, or `''`)."
  },
  {
    "id": "q_c4_m8_016",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Why does calling `self.assertEqual(rkloga.parse_line('x' * 5000), None)` (or `assertIsNone`) protect future performance when a developer later modifies regex quantifiers?",
    "options": [
      "It validates Windows UTF-16 BOM headers",
      "5,000-byte strings verify IPv6 validation accuracy",
      "It forces `json.dumps` to wrap long outputs cleanly",
      "Asserting `len(line) > MAX_LINE` rejection locks in the 2,048-byte ceiling against adversarial ReDoS / memory exhaustion log floods"
    ],
    "correct": 3,
    "explanation": "`MAX_LINE` (`2048`) stops oversized log lines prior to regex matching."
  },
  {
    "id": "q_c4_m8_017",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "If a learner switches test runner commands from `python -m unittest -v` to third-party `pytest -v`, what rewrites are required inside `test_rkloga.py`?",
    "options": [
      "All `TestCase` subclasses must convert into `def test_*` functions first",
      "Zero rewrites — `pytest` natively discovers and runs standard-library `unittest.TestCase` classes automatically",
      "`assertEqual` throws `SyntaxError` under `pytest`",
      "`pytest` cannot import modules from the current folder"
    ],
    "correct": 1,
    "explanation": "`pytest` executes standard `unittest.TestCase` suites cleanly out of the box."
  },
  {
    "id": "q_c4_m8_018",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "In Capstone `I1` guidance, why is `with self.subTest(case=...):` preferred over an un-wrapped `for` loop testing 10 different hostile usernames (`'=cmd'`, `'../x'`, `'bob; id'`) inside one `def test_*` method?",
    "options": [
      "`subTest` spawns each payload in a Docker sandbox",
      "`subTest` skips assertions that fail once",
      "Python prohibits loops inside `unittest.TestCase` unless wrapped in `subTest`",
      "Without `subTest`, the very first assertion failure aborts the loop immediately, hiding which of the remaining 9 adversarial payloads also failed; `subTest` evaluates and reports every failing vector distinctly"
    ],
    "correct": 3,
    "explanation": "`subTest` isolates sub-assertions neatly inside parametrized security suites."
  },
  {
    "id": "q_c4_m8_019",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Why should you keep `parse_line()` and `analyse()` pure functions devoid of direct `Path.open()` or `print()` calls?",
    "options": [
      "Pure functions automatically write JSON files to `/tmp`",
      "Pure functions isolate deterministic business/detection rules from filesystem/console side effects, enabling blazing-fast unit tests over synthetic Python objects",
      "`frozen=True` dataclasses fail inside impure functions",
      "Python 3.12 requires pure functions for `re.compile()`"
    ],
    "correct": 1,
    "explanation": "Separating pure logic (`parse_line`, `analyse`) from I/O boundaries (`read_events`, `main`) makes tools modular and straightforward to test."
  },
  {
    "id": "q_c4_m8_020",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Look at `CliTests.test_bad_arguments_return_2`: why did that test STILL have to create a real temporary logfile `p = write_temp(...)` just to test `--spray-users 1` returning exit code `2`?",
    "options": [
      "Because `rkloga.main` prints `--help` unless a valid non-empty file exists on disk before parsing `--spray-users`",
      "`argparse` requires the mandatory positional argument `logfile`, AND the range check `if not (1 <= args.window_min <= 1440 and 2 <= args.spray_users <= 1000)` rejects `1` with exit `2` cleanly using a real fixture path",
      "Actually `read_events(args.logfile)` ran first before bounds checking",
      "Because `unittest` rejects lists of length 1"
    ],
    "correct": 1,
    "explanation": "`argparse` parses `logfile` positionally; providing a real file ensures the failure tested is genuinely the `--spray-users` bounds validator (`lines 98–100`) rather than `FileNotFoundError`!"
  },
  {
    "id": "q_c4_m8_021",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "How does `rkloga.py` generate its execution-tested `--help` usage message (`usage: rkloga.py [-h] [--window-min WINDOW_MIN] ...`) automatically?",
    "options": [
      "From `@dataclass(frozen=True)` docstrings",
      "By reading `README.md` at runtime",
      "From `argparse.ArgumentParser(description=...)` and each `p.add_argument(..., help=...)` definition",
      "From `LINE_RX` regex comments"
    ],
    "correct": 2,
    "explanation": "`argparse` synthesizes consistent `--help` output automatically directly from parser definitions, eliminating CLI-flag documentation drift."
  },
  {
    "id": "q_c4_m8_022",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Why does Lesson 8.3 insist on disclosing explicit **known limitations** cleanly inside `README.md` (e.g., `'rkloga recognizes only the OpenSSH ISO-UTC format in LINE_RX'`)?",
    "options": [
      "Python's `setuptools` refuses builds missing a `LIMITATIONS` section",
      "Undocumented format assumptions trick SOC analysts into interpreting `'0 findings'` on unsupported syslog/Windows files as `'no attack occurred'` when events silently went to `skipped_lines`",
      "Disclosing limitations disables static checks by `Bandit`",
      "SOC analysts skip reading `--help` whenever `README.md` lists limits"
    ],
    "correct": 1,
    "explanation": "Honest boundaries safeguard responders from misreading out-of-scope data formats as clean security audits."
  },
  {
    "id": "q_c4_m8_023",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "What documentation artifact tracks version-by-version shifts in detection rules, threshold defaults, or CLI contracts across time?",
    "options": [
      "`CHANGELOG.md`",
      "`LINE_RX`",
      "`__pycache__`",
      "`.jsonl` alerts"
    ],
    "correct": 0,
    "explanation": "Changelogs let responders compare historic incident reports against exact rule versions in effect at that timestamp."
  },
  {
    "id": "q_c4_m8_024",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "In Scenario S3 (your SOC manager requests a one-page operational brief for `rkloga`), which detail set MUST be included alongside purpose and usage examples?",
    "options": [
      "Supported formats, rule triggers & defaults (`--window-min 5`, `--spray-users 3`), exit code contracts (`0/1/2`), text/JSON schemas, honest limitations, operational monitoring of exit `2`, and owner/changelog",
      "Only raw Python source code pasted verbatim",
      "Developer home directories and temporary key passphrases",
      "Marketing slogans without command-line flags"
    ],
    "correct": 0,
    "explanation": "Operational SOC handoffs cover exact inputs, thresholds, exit signals, schemas, limits, failure escalation, and ownership."
  },
  {
    "id": "q_c4_m8_025",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Inspect `rkloga.py`'s module docstring at the top of the file: besides purpose and example usage syntax, what contract does it explicitly declare cleanly for operators?",
    "options": [
      "Exit codes (`0 no findings, 1 findings, 2 usage/input error`) and verified test environment details",
      "Hardcoded secret SSH passphrases",
      "List of external PyPI packages required",
      "IP addresses of company domain controllers"
    ],
    "correct": 0,
    "explanation": "Recording usage, scope, and exit contracts right in the module docstring helps maintainers and automation engineers verify behavior immediately."
  },
  {
    "id": "q_c4_m8_026",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Look carefully at the IP regex inside base `rkloga.py`: `(?P<ip>[0-9a-fA-F:.]{2,45})`. What specific IP-validation limitation must `README.md` disclose (and Capstone `rkloga 2.0` fix)?",
    "options": [
      "`{2,45}` drops all loopback IP addresses",
      "The regex matches IPv4 only and blocks all IPv6 hexadecimal colons",
      "The permissive character class allows syntactically invalid sequences like `'999.999.999.999'` or `':::'` through `parse_line`; parsing with `ipaddress.ip_address()` fixes semantic IPv4/IPv6 validation cleanly",
      "Regexes run slower when `ipaddress` is absent"
    ],
    "correct": 2,
    "explanation": "Character sets filter bad characters quickly but cannot enforce octet ranges `0–255` or valid IPv6 `::` compression rules without `ipaddress.ip_address()`."
  },
  {
    "id": "q_c4_m8_027",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "What should a clear **function docstring** (such as on `parse_line` or `read_events`) specify concisely?",
    "options": [
      "Passwords for production servers",
      "Every internal variable assignment inside every loop",
      "Git commit SHA hashes of coworkers",
      "What the function does, expected parameters, return value / `None` edge semantics, and notable exceptions"
    ],
    "correct": 3,
    "explanation": "Good function docstrings explain contract boundaries (`inputs -> outputs / errors`) so callers don't have to guess from source lines."
  },
  {
    "id": "q_c4_m8_028",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Notice base `rkloga.py` implements `elif failures.get(e.ip):` inside `analyse()`. If a user failed authentication from IP `203.0.113.7` on **Day 1** and succeeded legitimately on **Day 90** inside a multi-month archive file, what documented limitation triggers?",
    "options": [
      "`already` blocks `success_after_failure` past day 1",
      "Day 90 timestamps convert back to Day 1",
      "`sorted()` deletes entries older than 7 days",
      "Base `rkloga` has no configurable time limit on `success_after_failure`, whereas Capstone `rkloga 2.0` adds `--saf-minutes` recency bounding cleanly"
    ],
    "correct": 3,
    "explanation": "Documenting unlimited correlation spans clarifies false-positive risk across long multi-week files and defines the Capstone `--saf-minutes` enhancement."
  },
  {
    "id": "q_c4_m8_029",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why does `README.md` include security notes (e.g., authorized scope, safe input guarantees, no network callbacks) alongside installation steps?",
    "options": [
      "Operators and InfoSec reviewers need quick verification of privilege requirements, safety invariants, and unintended failure behavior before approving enterprise deployment",
      "Because `pip` blocks installation if security notes are missing",
      "To increase word counts for linters",
      "So `argparse` formats markdown headings"
    ],
    "correct": 0,
    "explanation": "Clear security documentation accelerates internal defensive tooling review and safe operator usage."
  },
  {
    "id": "q_c4_m8_030",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Suppose an engineer expands `rkloga` in v2.1 to drop failed attempts outside `--saf-minutes 60`, yet forgets to note this change in `--help`, `README.md`, or `CHANGELOG.md`. Why does undocumented detector behavior hurt incident forensics?",
    "options": [
      "`test_rkloga.py` crashes on missing `CHANGELOG.md`",
      "`argparse` refuses undocumented parameters at runtime",
      "JSON output truncates at `--saf-minutes`",
      "Analysts investigating why historic Day-2 logins stopped firing assume an intrusion missed logs rather than realizing tool semantics shifted silently"
    ],
    "correct": 3,
    "explanation": "Updating CLI defaults or detection semantics requires synchronized `--help`, README, and CHANGELOG updates so forensic timelines remain interpretable."
  },
  {
    "id": "q_c4_m8_031",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "In `rkloga.py`, what exact exit code contract separates `'nothing suspicious'`, `'security findings present'`, and `'tool could not run cleanly'`?",
    "options": [
      "`0` = error; `1` = clean; `2` = findings",
      "`0` = analysed cleanly with no findings; `1` = analysed cleanly with findings present; `2` = usage/input error (`fail closed`)",
      "`0` = both clean AND file missing; `1` = JSON syntax error",
      "`1` = error; `2` = warning; `3` = findings"
    ],
    "correct": 1,
    "explanation": "Distinct codes `0 / 1 / 2` guarantee cron wrappers and CI jobs never mistake unreadable files (`2`) for all-clear (`0`)."
  },
  {
    "id": "q_c4_m8_032",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Examine Scenario S2: an automation script calls an external security feed via URL `?access_token=...` and catches `Exception as exc: print(exc)`. Why does printing raw `exc` breach OWASP Logging standards?",
    "options": [
      "Because `Exception` disables TLS 1.3 verification",
      "Because `print(exc)` triggers SQL injection inside stderr",
      "HTTP client exceptions routinely embed the complete request URL—printing `exc` writes the live `access_token` plaintext into shared stdout/CI logs; put tokens in headers, log sanitized host/status only, rotate exposed tokens, and add unit assertions against secret logging",
      "Because `exc` converts URLs into shell commands"
    ],
    "correct": 2,
    "explanation": "Secrets in error messages are a classic OWASP leak channel; use header credentials, sanitize logs cleanly, rotate leaked keys, and assert zero secret output in tests."
  },
  {
    "id": "q_c4_m8_033",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "What does **fail closed** mean when building defensive Python checkers?",
    "options": [
      "Shut down the web server whenever `parse_line` returns `None`",
      "Close file handles inside `with` blocks only when files are empty",
      "Suppress `PermissionError` quietly and continue to `analyse([])`",
      "If a verification or scan cannot complete reliably (missing file, bad args, corrupt signature), exit with an explicit error status (`2`) rather than reporting `'clean / 0 findings'`"
    ],
    "correct": 3,
    "explanation": "Security automation must surface inability to check (`error = 2`) loudly rather than silently clearing potentially compromised systems."
  },
  {
    "id": "q_c4_m8_034",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Look at lines 101–111 of `rkloga.py`: `except FileNotFoundError`, `except PermissionError`, `except OSError as exc: log.error(..., exc.strerror)`. Why is this three-clause specific ladder vastly superior to `except Exception: return 2`?",
    "options": [
      "`exc.strerror` unlocks root file permissions automatically",
      "Catching `Exception` returns exit code `0` instead of `2`",
      "`OSError` catches invalid regex syntax too",
      "It handles expected OS filesystem faults cleanly with clear operator messages without hiding unexpected internal Python coding bugs (`NameError`, `TypeError`) if logic breaks"
    ],
    "correct": 3,
    "explanation": "Specific exception handlers mask zero unexpected internal bugs while guaranteeing clean traceback-free diagnostics on foreseeable I/O errors."
  },
  {
    "id": "q_c4_m8_035",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "How does `rkloga.py` keep a single corrupt non-UTF-8 byte sequence inside an authentication logfile from aborting analysis via `UnicodeDecodeError`?",
    "options": [
      "It catches `SyntaxError` around `for line in fh:`",
      "It opens files with `'rb'` and runs `eval()`",
      "`path.open(encoding='utf-8', errors='replace')` substitutes invalid bytes cleanly with `U+FFFD` rather than crashing mid-scan",
      "It passes `-X utf8=ignore` implicitly"
    ],
    "correct": 2,
    "explanation": "`errors='replace'` lets `read_events` process the remainder of a multi-gigabyte log cleanly while counting malformed non-matching lines as `skipped`."
  },
  {
    "id": "q_c4_m8_036",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Inspect lines 98–100 of `rkloga.py`: `if not (1 <= args.window_min <= 1440 and 2 <= args.spray_users <= 1000): ... return 2`. Why validate parameter bounds explicitly BEFORE attempting `read_events(args.logfile)`?",
    "options": [
      "Fail fast before wasting I/O on huge logs, AND block nonsense inputs like `--spray-users 0` (every single failure fires) or negative windows (`-5`) from breaking detector invariants",
      "Because `timedelta(minutes=-5)` raises `OverflowError` in Python",
      "Because `argparse` fails unless `1440` is checked manually",
      "To return exit code `1` immediately on missing files"
    ],
    "correct": 0,
    "explanation": "Early semantic parameter validation stops broken configs before reading gigabytes of telemetry."
  },
  {
    "id": "q_c4_m8_037",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Why must production tools avoid exposing full raw Python tracebacks to untrusted end users or web API clients?",
    "options": [
      "Tracebacks leak internal directory paths, installed library versions, line numbers, variable values, and sometimes embedded configuration strings or secrets",
      "Python limits stack traces to 3 lines on Linux",
      "Tracebacks modify JSON schemas permanently",
      "Tracebacks cause exit code `0` instead of `1` in Python"
    ],
    "correct": 0,
    "explanation": "Keeping detailed errors strictly in secure operator logs while showing clean summaries to callers limits reconnaissance value."
  },
  {
    "id": "q_c4_m8_038",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose an attacker floods a monitored service with a 50 MiB single malformed syslog line lacking newlines (`'A' * 52428800`). Look at `parse_line(line)` in `rkloga.py`: does checking `if len(line) > MAX_LINE: return None` BEFORE `LINE_RX.match(...)` avoid parsing that 50 MiB string with regex?",
    "options": [
      "Yes — `parse_line` returns `None` in O(1) before `LINE_RX.match()` ever inspects characters (and capping line iteration size at read time like `fh.readline(MAX_READ)` stops massive single-line RAM allocation too!)",
      "No — `LINE_RX.match` executes before `if len(line)` in Python",
      "Yes — `MAX_LINE` sets buffer caps automatically inside `path.open`",
      "No — `len(line)` throws `MemoryError` on ASCII strings"
    ],
    "correct": 0,
    "explanation": "Early length short-circuiting protects the regex engine, and capping buffered read lengths prevents huge single-line RAM exhaustion."
  },
  {
    "id": "q_c4_m8_039",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Look at line 126 of `rkloga.py`: `sys.exit(main())`. Why pass `main()`'s integer return straight into `sys.exit(...)`?",
    "options": [
      "So the OS shell, cron scheduler, or CI runner actually receives `0`, `1`, or `2` as the process exit status rather than ignoring `main()`'s return value and always exiting `0`",
      "Because Python requires `sys.exit()` to flush stdout JSON",
      "Because `main()` prints `None` without `sys.exit()`",
      "So `unittest` exits early after CLI checks"
    ],
    "correct": 0,
    "explanation": "Without `sys.exit(main())`, Python finishes `main()` and exits `0` to the OS shell even if `main()` returned `2`!"
  },
  {
    "id": "q_c4_m8_040",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Imagine a Bash wrapper script running `python rkloga.py /var/log/auth.log || echo 'ALERT'` where exit code `2` triggers on a missing `/var/log/auth.log`. Why should production automation explicitly check `rc=$?` (`0` vs `1` vs `2`) instead of a binary `if ! python ...` branch?",
    "options": [
      "Bash treats `2` identically to `0` inside `if !`",
      "A binary `||` branch lumps genuine intrusions (`1`) together with broken file paths / bad args (`2`), masking broken monitoring sensors or generating bogus breach pages instead of ops repair alerts",
      "`rkloga` only returns `1` on `--json` mode",
      "`argparse` exits `0` on `PermissionError`"
    ],
    "correct": 1,
    "explanation": "Handling `0` (clear), `1` (security finding), and `2` (sensor failure) distinctly ensures broken pipelines get fixed rather than misclassified."
  },
  {
    "id": "q_c4_m8_041",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which Python static analysis tool scans code specifically for common security issues (`shell=True`, `pickle`, weak hashes, hardcoded secrets) as taught in Lesson 8.5?",
    "options": [
      "`Black`",
      "`Bandit` (alongside multi-language `Semgrep` in Course 12)",
      "`venv`",
      "`pip freeze`"
    ],
    "correct": 1,
    "explanation": "`Bandit` inspects Python ASTs for known security hazards, whereas `Black` enforces code formatting."
  },
  {
    "id": "q_c4_m8_042",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "How does a static type checker (`mypy`) prevent crashes across `ev = rkloga.parse_line(line)` without executing a single line of Python?",
    "options": [
      "`parse_line` is annotated `-> Event | None`; if calling code accesses `ev.user` directly without an `if ev:` None-narrowing guard, `mypy` flags the unhandled `None` error statically before runtime",
      "`mypy` automatically executes `unit tests` in Docker",
      "`mypy` patches `Event` into `Event | str` at runtime",
      "`mypy` replaces `parse_line` return types with `Any`"
    ],
    "correct": 0,
    "explanation": "Type annotations enable `mypy` to verify Optional/Union `None` handling statically across entire repositories."
  },
  {
    "id": "q_c4_m8_043",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What is the modern standard configuration file (`PEP 621` / Python Packaging User Guide) used to declare package metadata, dependencies, and console entry points cleanly?",
    "options": [
      "`MANIFEST.ini`",
      "`alerts.jsonl`",
      "`requirements_unpinned.txt`",
      "`pyproject.toml`"
    ],
    "correct": 3,
    "explanation": "`pyproject.toml` declares project metadata, build backend, dependencies, and console `[project.scripts]` commands cleanly."
  },
  {
    "id": "q_c4_m8_044",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Which tool combination creates a balanced automated **Continuous Integration (CI)** safety pipeline prior to merging changes to a shared security tool?",
    "options": [
      "Linter/formatter (`Ruff`/`Black`) + static types (`mypy`) + security SAST (`Bandit`/`Semgrep`) + dependency CVE audit (`pip-audit`) + automated functional unit tests (`unittest`/`pytest`)",
      "Formatter (`Black`) alone without running tests or SAST",
      "`pip freeze` committed over source code",
      "Manual email approval skipping all tests"
    ],
    "correct": 0,
    "explanation": "Each static, dependency, and dynamic verification gate catches distinct failure classes—style/dead code, type errors, insecure sinks, known CVEs, and broken rule logic."
  },
  {
    "id": "q_c4_m8_045",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "In `pyproject.toml`, what does `[project.scripts]` containing `rkloga = 'rkloga:main'` accomplish after installing into a virtual environment?",
    "options": [
      "Schedules cron jobs automatically upon `pip install`",
      "Compiles Python scripts into C executables without Python installed",
      "Creates an executable `rkloga` console command in the venv's `bin/` / `Scripts/` folder that invokes `rkloga.main()` cleanly",
      "Publishes source code directly onto GitHub"
    ],
    "correct": 2,
    "explanation": "Entry-point scripts expose module `main` functions cleanly as first-class CLI commands."
  },
  {
    "id": "q_c4_m8_046",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Recall Knight Capital (`C04-M08-CS1`) where unused dormant code from 2005 lingered in production for seven years. How does running modern linters like **`Ruff`** or **`Pylint`** alongside strict Git code review mitigate this exact failure mode?",
    "options": [
      "Linters prevent all runtime exceptions automatically",
      "Linters rotate HMAC keys during builds",
      "Linters verify live market order limits at runtime",
      "Linters highlight dead/unused functions, unreachable code branches, and unreferenced configuration flags cleanly before orphaned code rots into ticking traps"
    ],
    "correct": 3,
    "explanation": "Static dead-code rules flag dormant paths immediately so teams prune deprecated flags rather than leaving legacy traps behind."
  },
  {
    "id": "q_c4_m8_047",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What distinguishes a **formatter** (`Black`, `Ruff format`) from a **security linter** (`Bandit`, `Semgrep`)?",
    "options": [
      "They perform identical regex checks",
      "Formatters fix SQL injection bugs automatically",
      "Security linters enforce PEP 8 comma spacing",
      "Formatters standardize cosmetic indentation/layout cleanly, whereas security linters inspect ASTs for exploitable anti-patterns like `shell=True`, `pickle`, and weak crypto"
    ],
    "correct": 3,
    "explanation": "Clean formatting eases human review; SAST scanners actively locate dangerous security sinks."
  },
  {
    "id": "q_c4_m8_048",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Why does specifying `dependencies = []` cleanly in `rkloga`'s `pyproject.toml` (using pure CPython standard library) represent a distinct security advantage for SOC incident response utilities?",
    "options": [
      "`pyproject.toml` forbids third-party dependencies for CLI tools",
      "`dependencies = []` disables Python's standard library too",
      "Empty dependencies force `pip` to disable TLS verification",
      "Zero external PyPI runtime dependencies eliminates third-party typosquatting risk, shrinks deployment footprints on locked-down triage hosts, and leaves zero external transitive CVEs for `pip-audit`"
    ],
    "correct": 3,
    "explanation": "Keeping response utilities standard-library-only gives portable zero-dependency execution across isolated IR environments with minimal supply-chain risk."
  },
  {
    "id": "q_c4_m8_049",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which tool covered in Module 2 and Lesson 8.5 checks installed packages in a Python environment against known vulnerability advisories?",
    "options": [
      "`pip-audit`",
      "`Black`",
      "`mypy`",
      "`unittest`"
    ],
    "correct": 0,
    "explanation": "`pip-audit` audits resolved packages against the PyPI/OSV vulnerability database."
  },
  {
    "id": "q_c4_m8_050",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Notice that in `rkloga.py`, line 12 declares `from __future__ import annotations`. Why is that line often included in packaged Python security tools (`pyproject.toml` `requires-python = '>=3.10'`)?",
    "options": [
      "It replaces `dataclasses.dataclass` automatically",
      "It enables `mypy` runtime type enforcement in production",
      "Postponed evaluation of annotations keeps modern type hint syntax cleanly lightweight at runtime and ensures uniform behavior across Python 3.10–3.14+",
      "It imports all stdlib modules cleanly"
    ],
    "correct": 2,
    "explanation": "Postponing annotation stringification supports clean forward references and lightweight union hints uniformly."
  },
  {
    "id": "q_c4_m8_051",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Why does `rkloga.py` mark `Event` using `@dataclass(frozen=True)`?",
    "options": [
      "Compresses `Event` directly to JSON Lines",
      "Encrypts timestamp attributes in RAM",
      "Generates boilerplate `__init__`/`__repr__`/`__eq__` cleanly while making every parsed `Event` immutable after creation so correlation functions cannot alter log history",
      "Creates database indexes automatically"
    ],
    "correct": 2,
    "explanation": "Frozen dataclasses create lightweight, hashable, read-only event records safe against accidental mutation."
  },
  {
    "id": "q_c4_m8_052",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In `rkloga.py`'s `analyse()`, why MUST line 56 sort events first (`for e in sorted(events, key=lambda e: e.ts):`) even before incrementing `failures[e.ip]` or checking `elif failures.get(e.ip):`?",
    "options": [
      "Because `e.ts.isoformat()` crashes on unsorted `Event` lists",
      "Because Python `defaultdict` requires keys in sorted order",
      "Syslog streams across multiple servers or buffers frequently arrive out of time order; sorting ensures a login occurring *before* later failures isn't misflagged as `'success_after_failure'`, and sliding time subtractions `e.ts - f.ts` remain valid",
      "`already = any(...)` works only if events sort descending"
    ],
    "correct": 2,
    "explanation": "Out-of-order log ingestion causes false `success_after_failure` inversions and negative window deltas (`e.ts - f.ts < 0`) unless sorted chronologically first!"
  },
  {
    "id": "q_c4_m8_053",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Look at `rkloga.py` execution against `sample_auth.log` (which contains 3 failures, 1 success, and 1 line `'random noise line'`). What exact summary line printed cleanly (`exit=1`)?",
    "options": [
      "`events=4 failures=3 successes=1 skipped=1`",
      "`events=5 failures=3 successes=1 skipped=0`",
      "`events=4 failures=4 successes=0 skipped=1`",
      "`events=3 failures=3 successes=1 skipped=2`"
    ],
    "correct": 0,
    "explanation": "4 valid SSH events parsed (3 failed + 1 accepted), while `'random noise line'` incremented `skipped` to `1`."
  },
  {
    "id": "q_c4_m8_054",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In `sample_auth.log` JSON output (`--json`), notice `spray` fired at `'2026-11-07T10:00:09+00:00'` with `users: ['asha', 'ben', 'chen']`, followed by `success_after_failure` at `'2026-11-07T10:07:20+00:00'` (`7m 11s` later). What happens to BOTH findings if Capstone adds `--window-min 5 --saf-minutes 3`?",
    "options": [
      "Both findings fire unchanged",
      "Neither finding fires",
      "`spray` still fires (`10:00:01` to `10:00:09` spans 8s <= 5 min), whereas `success_after_failure` (`10:07:20 - 10:00:09 = 7m 11s > 3m`) stops firing!",
      "`spray` stops firing while `success_after_failure` fires"
    ],
    "correct": 2,
    "explanation": "Elapsed spray span is 8 seconds (`<= 5 min`), while acceptance occurs 7m 11s after the final failure (`> 3 min`)."
  },
  {
    "id": "q_c4_m8_055",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Why does `rkloga`'s `read_events()` check `elif line.strip(): skipped += 1` instead of counting empty blank lines as skipped anomalies?",
    "options": [
      "Trailing blank newlines are harmless formatting, whereas non-empty unparsed lines represent format drift or unrecognized content worth counting cleanly",
      "`line.strip()` converts unmatched SSH lines into `Event` objects",
      "Empty lines crash `parse_line()` unless filtered",
      "JSON omits `skipped_lines` when `skipped == 0`"
    ],
    "correct": 0,
    "explanation": "Ignoring pure blank whitespace avoids inflating `skipped_lines` over harmless trailing file newlines."
  },
  {
    "id": "q_c4_m8_056",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Inspect line 59–64 of `rkloga.py`: when converting base `rkloga` cleanly into **Capstone `rkloga 2.0`** (`Practical P2`), why replace `failures[e.ip].append(e)` + `[f for f in failures[e.ip] ...]` with `collections.deque` + `while q and e.ts - q[0].ts > window: q.popleft()`?",
    "options": [
      "Because `deque` automatically sorts out-of-order events without `sorted()`",
      "Because Python lists cannot store frozen `@dataclass` instances past 1,000 items",
      "Base list comprehension rescans ALL historic failures per IP (`O(N^2)` work and unbounded `O(N)` RAM across 100k+ failures), whereas `popleft()` evicts expired items in `O(1)` amortized time keeping RAM bounded strictly to the active window",
      "Because `collections.deque` handles IPv6 validation natively"
    ],
    "correct": 2,
    "explanation": "Pruned `collections.deque` windows turn quadratic backlog rescanning on large flood logs cleanly into bounded linear streaming."
  },
  {
    "id": "q_c4_m8_057",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "In Capstone `rkloga 2.0` (`R1` / `Kestrel Family Dental`), which two Windows Security Event IDs must the CSV parser map onto `'Failed'` and `'Accepted'` logon verdicts?",
    "options": [
      "`200` -> `'Accepted'` and `404` -> `'Failed'`",
      "`4688` -> `'Failed'` and `1102` -> `'Accepted'`",
      "`4625` -> `'Failed'` and `4624` -> `'Accepted'` (across columns `TimeCreated, EventId, TargetUserName, IpAddress`)",
      "`0` -> `'Failed'` and `1` -> `'Accepted'`"
    ],
    "correct": 2,
    "explanation": "Course 03 Windows telemetry aligns directly: EID `4625` logs failed account logons and EID `4624` logs successful logons."
  },
  {
    "id": "q_c4_m8_058",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Look at Instructor Marking Guidance `I2` for Capstone `rkloga 2.0`: instructors test student solutions against hidden edge inputs containing an attacker username `'=cmd'` in CSV logs and IPv6 addresses. What bug fails a solution immediately on `'=cmd'`?",
    "options": [
      "Formatting `'=cmd'` cleanly inside `json.dumps()`",
      "Hashing `'=cmd'` with SHA-256",
      "Exporting `'=cmd'` directly into CSV reports without formula-injection sanitization (`'` prefixing, `safe_cell()`) OR letting permissive/over-strict user filters crash cleanly instead of handling/guarding safely",
      "Exposing `skipped_lines` in `--json` output"
    ],
    "correct": 2,
    "explanation": "When exporting attacker-controlled usernames like `'=cmd'` into CSV reports (`R4`), spreadsheet formula-injection protection (`'` guard) is mandatory."
  },
  {
    "id": "q_c4_m8_059",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Look at `LINE_RX` inside `rkloga.py`: `(?:invalid user )?`. What does `(?: ... )` accomplish vs. `( ... )`?",
    "options": [
      "Non-capturing optional group — accepts optional `'invalid user '` prefix before username without altering positional group numbering or polluting `groupdict()`",
      "Makes the entire timestamp optional",
      "Forces case-insensitive regex matching",
      "Allows usernames to contain spaces"
    ],
    "correct": 0,
    "explanation": "Non-capturing `(?:invalid user )?` handles OpenSSH's extra phrase for unknown accounts while keeping `(?P<user>...)` pure (`'chen'`, not `'invalid user chen'`)."
  },
  {
    "id": "q_c4_m8_060",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Examine `Practical P2`'s `--output FILE` safeguard: why must a production CLI writing a JSON report refuse to silently overwrite an existing `FILE` unless explicit `--force` passes?",
    "options": [
      "Existing files keep old JSON bytes appended at the bottom unless `--force` runs",
      "Python's `write_text` throws `IsADirectoryError` on existing files automatically",
      "Silent overwrite risks destroying prior forensic evidence or existing baselines on typos; fail-safe refusal (with clean error exit) protects analyst artifacts unless explicitly overridden",
      "`argparse` blocks output flags lacking `--force`"
    ],
    "correct": 2,
    "explanation": "Refusing accidental clobbering (`open(..., 'x')` or `path.exists()` check cleanly unless `--force`) preserves irreplaceable triage evidence."
  },
  {
    "id": "q_c4_m8_061",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "When `test_rkloga.py` verifies `rkloga.parse_line(F.format(2, 'invalid user admin')).user == 'admin'`, which test design category does this check belong to?",
    "options": [
      "Static style formatting",
      "Failure-path exit status testing",
      "Edge-case validation (proving OpenSSH's optional `'invalid user '` phrasing extracts `'admin'` accurately rather than `'invalid'`)",
      "Performance stress testing"
    ],
    "correct": 2,
    "explanation": "OpenSSH inserts `'invalid user '` specifically for non-existent local accounts—a classic protocol phrasing edge case."
  },
  {
    "id": "q_c4_m8_062",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Why must tests covering sliding correlation windows ALWAYS use explicit deterministic synthetic UTC timestamps (`2026-11-07T10:00:01Z`) instead of calling `datetime.now()` at test time?",
    "options": [
      "`datetime.now()` returns string objects unusable with `timedelta`",
      "Real-clock `datetime.now()` varies across CI machines, midnight rollovers, and slow test runners—causing flaky non-deterministic failures around window boundaries",
      "`unittest` prohibits importing `datetime`",
      "`datetime.now()` violates fail-closed error policies"
    ],
    "correct": 1,
    "explanation": "Fixed synthetic timestamps make temporal tests 100% reproducible across every timezone and hardware speed."
  },
  {
    "id": "q_c4_m8_063",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "In `test_rkloga.py`, why must test method names inside a `unittest.TestCase` subclass start with `test_` (for example `def test_findings_return_1(self):`)?",
    "options": [
      "`unittest`'s test loader discovers and executes strictly methods beginning with the `test_` prefix (helper methods like `events(self, lines)` run only when explicitly called)",
      "Python's syntax compiler raises `SyntaxError` inside `TestCase` otherwise",
      "Assertions only work when functions start with `test_`",
      "Otherwise methods exit with status `2`"
    ],
    "correct": 0,
    "explanation": "`events()` in `AnalyseTests` is a reusable fixture helper—not prefixed with `test_`, so `unittest` skips calling it directly as an independent test."
  },
  {
    "id": "q_c4_m8_064",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Suppose you add a test in Practical P1 verifying a spray spread across **6 minutes** fails to trigger `--window-min 5`. Look carefully at lines `61–62` in base `rkloga.py` (`if len(users) >= spray_users and not already:`): if users `'a'`, `'b'`, `'c'` fail at `t=0:00`, `t=3:00`, and `t=6:00`, why does base `rkloga` pass that non-alert test?",
    "options": [
      "Because `already` evaluates `True` at `t=6:00`",
      "Because `failures` clears automatically after 5 minutes",
      "At `t=6:00`, `recent = [f for f in failures[ip] if e.ts - f.ts <= timedelta(minutes=5)]` filters out `t=0:00` (`6 min > 5 min`), leaving strictly `{'b', 'c'}` (`len=2 < 3`)",
      "Wait — it WOULD false-alarm on base `rkloga`"
    ],
    "correct": 2,
    "explanation": "`recent` computes `e.ts - f.ts <= window`, dropping `'a'` (`6m > 5m`) cleanly so only 2 distinct users fall inside `(1:00..6:00]`."
  },
  {
    "id": "q_c4_m8_065",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Which document tells operators exact command examples (`python rkloga.py sample_auth.log --json`), supported log formats, limitations, and security reporting instructions?",
    "options": [
      "`test_rkloga.py`",
      "`LINE_RX` regex literal",
      "`README.md`",
      "`__init__.py`"
    ],
    "correct": 2,
    "explanation": "A crisp operator-focused `README.md` answers onboarding, invocation, boundary, and security reporting questions quickly."
  },
  {
    "id": "q_c4_m8_066",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "What real risk does adding `--window-min` to `argparse` with `help='spray window in minutes'` solve better than keeping a silent global magic number `WINDOW = 5` inside code?",
    "options": [
      "CLI flags automatically update `CHANGELOG.md`",
      "`argparse` flags compile faster than integer literals",
      "Defaults inside `argparse` eliminate `skipped_lines`",
      "Exposes configuration self-documenting in `--help` so analysts adjust thresholds per environment cleanly without mutating trusted tested Python source files"
    ],
    "correct": 3,
    "explanation": "Explicit documented CLI parameters preserve tested immutable code while supporting safe operational tuning."
  },
  {
    "id": "q_c4_m8_067",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "If `rkloga.py` is run against a real clean log containing zero findings (`events=100 failures=0 successes=100 skipped=0`), what integer exit status does `main()` return?",
    "options": [
      "`1`",
      "`0` (`return 1 if result['findings'] else 0`)",
      "`2`",
      "`None`"
    ],
    "correct": 1,
    "explanation": "Empty `findings` means zero detections occurred cleanly -> `exit 0`."
  },
  {
    "id": "q_c4_m8_068",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Notice that in `rkloga.py` lines 101–111, `read_events` runs inside `try/except (FileNotFoundError, PermissionError, OSError)`. What if `path` passed as `logfile` is actually an existing *directory* (`rkloga/`) on Linux/Windows—what exception catches it cleanly?",
    "options": [
      "`IsADirectoryError` / `PermissionError` both inherit from `OSError`, so the specific `PermissionError` / `OSError` handlers catch directories cleanly without raw tracebacks and exit `2`!",
      "Unrecognized `TypeError` crashes `rkloga` with traceback",
      "Python silently reads all files inside the directory as logs",
      "`argparse` refuses directories at `--json`"
    ],
    "correct": 0,
    "explanation": "`IsADirectoryError` and `PermissionError` are subclasses of `OSError`, caught gracefully by lines 106–111 -> `exit 2`!"
  },
  {
    "id": "q_c4_m8_069",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Notice Lesson 8.5 separates `Ruff`/`Flake8` from `Black` and `mypy`. What is `Black`'s sole job?",
    "options": [
      "Checking `list[Event]` type mismatches",
      "Validating whether API tokens leaked into logs",
      "Auditing PyPI transitive dependencies for CVEs",
      "Deterministic automatic Python code formatting so style remains uniform across every team member cleanly"
    ],
    "correct": 3,
    "explanation": "`Black` / `Ruff format` enforce uniform layout without altering behavior."
  },
  {
    "id": "q_c4_m8_070",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Suppose CI executes `bandit -r src/` and `mypy src/` BEFORE `python -m unittest`. If a developer accidentally writes `os.system(f'grep {user} auth.log')` in a quick debug helper and commits it, which checks reject the PR immediately?",
    "options": [
      "Only `Black` flags `os.system` whitespace",
      "`Bandit` / `Semgrep` flag `os.system` command-injection sinks (`B605`/`B607`) immediately even if unit tests didn't mock shell payloads against that helper",
      "`pip-audit` fails on unused imports",
      "Neither `Bandit` nor `Semgrep` checks `os.system`"
    ],
    "correct": 1,
    "explanation": "AST SAST checks act as automated security guardrails catching dangerous sinks (`os.system`, `shell=True`, `pickle.loads`, `verify=False`) before review."
  },
  {
    "id": "q_c4_m8_071",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "What command-line flag switches `rkloga.py` from human text output (`events=4 ...`) to machine-readable JSON output?",
    "options": [
      "`--format json`",
      "`--json`",
      "`--raw`",
      "`-v`"
    ],
    "correct": 1,
    "explanation": "`p.add_argument('--json', action='store_true')` switches output serialization cleanly to `json.dumps(result, indent=2)`."
  },
  {
    "id": "q_c4_m8_072",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Look at line 61 of `rkloga.py`: `already = any(x['type'] == 'spray' and x['ip'] == e.ip for x in findings)`. Suppose an IP sprays `30` distinct accounts inside 2 minutes (`asha, ben, chen, dan, ...`). How many `spray` entries appear in `findings` for that IP?",
    "options": [
      "`30` entries",
      "`28` entries (one per subsequent user after the 3rd)",
      "Exactly `1` (`already` suppresses repeated `spray` alerts after the 3rd distinct user `'chen'` triggers once for that IP)",
      "`0` because 30 exceeds `3`"
    ],
    "correct": 2,
    "explanation": "Suppression via `already` ensures `203.0.113.7` fires once rather than emitting 28 noisy duplicates (`test_spray_detected_once` verifies this on 4 users `a, b, c, d`)."
  },
  {
    "id": "q_c4_m8_073",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "Which real-world firm is studied in `Case Study C04-M08-CS1` to illustrate how incomplete deployments and unacted alert emails cost over `$460 million`?",
    "options": [
      "Lotus Logistics",
      "Target Corporation",
      "Cloudflare",
      "Knight Capital (1 August 2012, US SEC Press Release 2013-222)"
    ],
    "correct": 3,
    "explanation": "Knight Capital (M08) highlights deployment testing and dead code removal, whereas Target (M07) and Cloudflare (M03) cover alert fatigue and ReDoS respectively."
  },
  {
    "id": "q_c4_m8_074",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Look closely at `test_rkloga.py`: what happens if someone alters `Event` in `rkloga.py` removing `frozen=True` while tests pass? Wait — what guarantees immutability doesn't quietly regress if code or tests depend on `Event` safety?",
    "options": [
      "`sys.exit()` prevents mutable dataclasses",
      "`unittest` checks dataclass `frozen=True` flags implicitly",
      "`LINE_RX` locks dataclass attributes",
      "Adding a unit test asserting `with self.assertRaises(FrozenInstanceError): ev.user = 'x'` explicitly verifies immutability invariants (`fail on unintentional mutability`)"
    ],
    "correct": 3,
    "explanation": "Security properties (`immutability`, `redaction`, `exit codes`) stay preserved across refactors only when pinned by explicit unit assertions."
  },
  {
    "id": "q_c4_m8_075",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "From where must you run `python -m unittest -v` in Practical P1 so `import rkloga` inside `test_rkloga.py` succeeds directly?",
    "options": [
      "From `C:\\Windows\\System32` without `PYTHONPATH`",
      "Inside the `rkloga/` folder where `rkloga.py` and `test_rkloga.py` reside (or via `-s` discovery root / installed venv package)",
      "Inside `__pycache__`",
      "From any folder automatically without module path resolution"
    ],
    "correct": 1,
    "explanation": "Module troubleshooting notes: run `unittest` from inside the `rkloga` folder (or specify `-s rkloga`) so Python's module path locates `rkloga`."
  },
  {
    "id": "q_c4_m8_076",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "In `AnalyseTests.test_spray_detected_once`: `evs = self.events([F.format(i, u) for i, u in enumerate(['a', 'b', 'c', 'd'])])`. Notice `'d'` fails only `1 second` after `'c'`. Why didn't `test_rkloga.py` test `rkloga.parse_line(OK)` inside `ParseTests` ONLY, and instead kept `CliTests.test_findings_return_1` too?",
    "options": [
      "`CliTests` proves full end-to-end integration from disk file I/O -> `read_events` -> `parse_line` -> `analyse` -> integer `return 1`, catching interface bugs between layers that unit tests alone might miss",
      "Because `AnalyseTests` skips `Accepted` lines",
      "Because `OK` is not tested in `AnalyseTests`",
      "Because `unittest` skips `ParseTests` on Windows"
    ],
    "correct": 0,
    "explanation": "Layer unit tests + end-to-end `CliTests` implement the exact pyramid structure of `C04-M08-F2`."
  },
  {
    "id": "q_c4_m8_077",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why should Capstone `rkloga 2.0`'s `README.md` prominently display `skipped_lines` behavior?",
    "options": [
      "`README` omits `skipped_lines` on standard utilities",
      "To instruct users to delete `skipped_lines` from JSON results",
      "Because JSON syntax forbids integer fields",
      "Analysts must recognize that elevated `skipped_lines` indicates unsupported log formats, truncated lines (`>2048`), or hostile injected lines rather than harmless ignored whitespace"
    ],
    "correct": 3,
    "explanation": "Surfacing what was skipped makes silent coverage gaps transparent to SOC analysts."
  },
  {
    "id": "q_c4_m8_078",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Suppose an engineer expands `rkloga 2.0` to read Windows Security Event CSV files (`TimeCreated, EventId, TargetUserName, IpAddress`) cleanly. How can **Parser Registry** (`I1`: `{'ssh': parse_ssh, 'wincsv': parse_win_csv}`) plus clear CLI `--format` documentation keep the codebase modular?",
    "options": [
      "Duplicate the entire `analyse()` function twice for CSV vs SSH",
      "Both formats normalize completely into identical `Event` dataclasses, keeping `analyse()`, tests, and JSON/defang reporters clean and shared while `--help` documents valid `--format` keys (`choices=['ssh', 'wincsv']`)",
      "Hardcode Windows Event paths inside `LINE_RX`",
      "Reject `--json` whenever `--format wincsv` passes"
    ],
    "correct": 1,
    "explanation": "Normalizing distinct parsers onto a single canonical `Event` schema avoids duplicating correlation logic cleanly."
  },
  {
    "id": "q_c4_m8_079",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "When `rkloga.py` receives invalid CLI flag bounds (`--window-min 9999`), what happens cleanly?",
    "options": [
      "Clamps `9999` silently down to `1440` and exits `0`",
      "Logs `ERROR window-min must be 1-1440 and spray-users 2-1000` and returns exit `2` cleanly without reading logs or crashing",
      "Prints a full traceback ending in `ValueError`",
      "Runs with infinite time window"
    ],
    "correct": 1,
    "explanation": "Rejecting invalid bounds loudly (`exit 2`) prevents silent misconfiguration in automation."
  },
  {
    "id": "q_c4_m8_080",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Compare `logging.error('cannot read %s: %s', args.logfile, exc.strerror)` in `rkloga.py` against `traceback.print_exc()`. If an unexpected *internal bug* like `ZeroDivisionError` occurred inside `analyse()`, does `rkloga.py`'s `try ... except OSError` swallow it silently as `exit 0`?",
    "options": [
      "Yes — `main()` converts all exceptions to `1`",
      "Yes — `except OSError` catches `ZeroDivisionError` and exits `0`",
      "No — `except OSError` catches filesystem faults only (`return 2`); an uncaught internal exception exits non-zero loudly rather than reporting false clean status `0` (or can be wrapped carefully in an outer handler exiting `2` cleanly without secrets)",
      "`ZeroDivisionError` returns `'no findings'`"
    ],
    "correct": 2,
    "explanation": "Narrow exception catching catches anticipated I/O errors cleanly (`exit 2`) while ensuring unpredicted failures still exit non-zero loudly rather than pretending everything is fine."
  },
  {
    "id": "q_c4_m8_081",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What are `Ruff`, `Flake8`, and `Pylint` primarily classified as in modern Python toolchains?",
    "options": [
      "Dynamic runtime debuggers",
      "Linters catching coding bugs, unused code, and style violations automatically",
      "Network packet capture tools",
      "Log collectors"
    ],
    "correct": 1,
    "explanation": "Linters analyze source files statically for common coding mistakes, unused code, and style errors."
  },
  {
    "id": "q_c4_m8_082",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Suppose you bundle Capstone `rkloga 2.0` cleanly using `src/rkloga/` layout + `pyproject.toml`. Why must `.gitignore` explicitly exclude `__pycache__/`, `*.egg-info/`, `.venv/`, and synthetic test reports before committing to Git?",
    "options": [
      "Git cannot store `.py` files alongside `pyproject.toml`",
      "Because `pyproject.toml` refuses repositories containing README files unless `.gitignore` hides Python files",
      "Because `Bandit` scans only ignored folders",
      "Ignoring compiled bytecode, local virtualenvs, and scratch outputs keeps commits clean, prevents machine-specific artifacts or test logs from entering version control, and avoids bloated diffs"
    ],
    "correct": 3,
    "explanation": "Repo hygiene prevents committing bytecode caches, virtualenvs, or sensitive local sample scratch artifacts."
  },
  {
    "id": "q_c4_m8_083",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "In `rkloga.py`, which fields belong to every parsed `Event` object?",
    "options": [
      "`id: str`, `severity: str`, `rule: str`",
      "`ts: datetime`, `result: str`, `user: str`, `ip: str`",
      "`sha256: str`, `size: int`, `mtime: float`",
      "`event_id: int`, `host: str`, `port: int`"
    ],
    "correct": 1,
    "explanation": "Frozen dataclass `Event` holds normalized `(ts, result, user, ip)` across every log event."
  },
  {
    "id": "q_c4_m8_084",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Inspect line 45 of `rkloga.py`: `m = LINE_RX.match(line.rstrip('\\n'))`. Why call `.rstrip('\\n')` rather than leaving trailing newlines, and why use `\\r?\\n` vs `.rstrip('\\r\\n')` on logs exported across Windows CRLF line endings?",
    "options": [
      "`.rstrip()` strips attacker usernames too",
      "`.rstrip()` reverses UTF-8 characters cleanly",
      "`LINE_RX` cannot use `$` unless `\\n` is removed before `read_events` opens the file",
      "File iteration preserves `\\n` (`\\r\\n` on raw binary/non-universal CRLF); stripping line terminators allows `$` anchor in `LINE_RX` to match exact end of log line cleanly (note: `.rstrip('\\r\\n')` avoids Windows `\r` edge issues if logs contain raw CRLF!)"
    ],
    "correct": 3,
    "explanation": "Trailing newline stripping aligns the `$` regex anchor reliably against end-of-line payloads across platforms."
  },
  {
    "id": "q_c4_m8_085",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What fictional dental organization provides the SOC triage scenario (`Module 1 + Module 3 + Module 8 Capstone`) for **rkloga 2.0**?",
    "options": [
      "Tamarind Travels",
      "Kestrel Family Dental",
      "Orchid Payments",
      "Lotus Logistics"
    ],
    "correct": 1,
    "explanation": "Kestrel Family Dental (introduced in Courses 01/03) unifies Capstone `rkloga 2.0` across SSH and Windows logon analysis."
  },
  {
    "id": "q_c4_m8_086",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Look at Practical P1 step 3: you must add tests for **IPv6 addresses** and **out-of-order timestamps**. Suppose you feed `rkloga` an out-of-order log where `'10:07:20Z Accepted'` appears cleanly *above* `'10:00:01Z Failed'` inside the log file. How does `analyse()` handle it?",
    "options": [
      "It raises `ValueError` on non-monotonic lines",
      "It misses `success_after_failure` because `Accepted` came first in the file",
      "It prints `'skipped=2'` cleanly",
      "`sorted(events, key=lambda e: e.ts)` orders `10:00:01` before `10:07:20` first, so `success_after_failure` still triggers accurately regardless of file line permutation"
    ],
    "correct": 3,
    "explanation": "Chronological sorting before window correlation protects detection accuracy against out-of-order log delivery."
  },
  {
    "id": "q_c4_m8_087",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "How many built-in unit tests ship inside reference `test_rkloga.py`, and how many are required for Capstone **rkloga 2.0** (`R5`)?",
    "options": [
      "`3` in base; `5` in Capstone",
      "`10` tests in base `test_rkloga.py`; `>= 20` tests required in Capstone `rkloga 2.0` (covering known-good, known-bad, and failure paths)",
      "`20` in base; `200` in Capstone",
      "`0` in base; `10` in Capstone"
    ],
    "correct": 1,
    "explanation": "Reference `test_rkloga.py` proves 10 clean passing tests (`4 Parse + 3 Analyse + 3 Cli`), scaling to at least 20 in Capstone `R5`."
  },
  {
    "id": "q_c4_m8_088",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "In `test_rkloga.py`, examine `ParseTests`: `test_valid_failed_line`, `test_invalid_user_phrase`, `test_garbage_and_oversized_lines_rejected`, `test_suspicious_user_text_rejected`. Notice NO test exercises `parse_line('2026-11-07T10:00:01Z ... Accepted ... from 2001:db8::1 ...')`. What bug might sneak into `LINE_RX` later undetected unless an IPv6 unit test is added?",
    "options": [
      "IPv6 addresses exceed `MAX_LINE = 2048`",
      "Base `rkloga` crashes `test_valid_failed_line` cleanly",
      "IPv6 strings convert automatically into IPv4 under `datetime`",
      "A refactor narrowing IP capture to `[0-9.]{7,15}` breaks all IPv6 attack detection (`2001:db8::1`) silently with 10/10 base tests still passing"
    ],
    "correct": 3,
    "explanation": "Every supported requirement (like IPv6 log sources) needs an explicit test pin so later code cleanups never drop support silently."
  },
  {
    "id": "q_c4_m8_089",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "What should `rkloga`'s operator README warn regarding `LINE_RX` vs. unsupported log variants like traditional Apache HTTP or BSD syslog timestamps?",
    "options": [
      "Unsupported lines parse via fallback `pickle` loaders",
      "Unsupported line formats do NOT raise findings and instead accumulate inside `skipped_lines`—check `skipped_lines` during triage",
      "Apache logs convert automatically into SSH events",
      "Unsupported lines crash with exit `2`"
    ],
    "correct": 1,
    "explanation": "Documenting parser format assumptions prevents responders from misapplying an SSH detector onto Apache/IIS logs cleanly."
  },
  {
    "id": "q_c4_m8_090",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Look at Capstone `rkloga 2.0` rubric criterion **Documentation (10%)**: what differentiates **4 Distinguished** (`README + CHANGELOG + honest limitations + examples`) from **1 Developing**?",
    "options": [
      "Documentation applies strictly to `--help` text",
      "Distinguished means copying Python source code directly inside `README`",
      "Distinguished deletes `CHANGELOG.md` to save lines",
      "Developing lacks `README.md`; Distinguished complements `README` + `CHANGELOG` with candid documented limitations and verified CLI examples"
    ],
    "correct": 3,
    "explanation": "Candid scope boundaries plus reproducible CLI examples define mature engineering documentation."
  },
  {
    "id": "q_c4_m8_091",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Suppose an internal security scanner fails half-way through reading an evidence file due to `PermissionError`. Under `rkloga`'s fail-closed contract, what exit status and action occur?",
    "options": [
      "Print findings collected so far and exit `0`",
      "Log clear permission error cleanly without raw traceback -> exit `2` -> automation pages operator rather than treating as `'all clear'`",
      "Ignore the unreadable file and emit `'no findings'` (`exit 0`)",
      "Sleep 5 seconds and return `1`"
    ],
    "correct": 1,
    "explanation": "Partial unreadable telemetry cannot certify clean state; fail closed cleanly with `exit 2`."
  },
  {
    "id": "q_c4_m8_092",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Verify why logging `log.error('file not found: %s', args.logfile)` in `rkloga.py` avoids f-string security and performance caveats in `logging` (`%s` formatting):",
    "options": [
      "`%s` runs `html.escape` automatically",
      "`%s` encrypts filenames in logs",
      "`argparse` rejects f-strings inside `main()`",
      "`logging` defers formatting until level filtering passes AND prevents untrusted strings formatted into `%`-style logger format arguments from triggering format-string exceptions"
    ],
    "correct": 3,
    "explanation": "Passing untrusted values as positional `%s` logger arguments avoids eager formatting overhead and format-string confusion."
  },
  {
    "id": "q_c4_m8_093",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which combination represents Python linter + type checker + security linter?",
    "options": [
      "`unittest` + `json` + `csv`",
      "`Ruff` (linter) + `mypy` (type checker) + `Bandit` (security linter)",
      "`Black` + `socket` + `hmac`",
      "`Path` + `argparse` + `hashlib`"
    ],
    "correct": 1,
    "explanation": "Ruff checks code hygiene, mypy checks static typing, and Bandit flags security defects."
  },
  {
    "id": "q_c4_m8_094",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Imagine CI passes `Black`, `Ruff`, and `mypy`, yet `Bandit` fails on a line calling `pickle.loads(data)`. Should a team suppress the `Bandit` check or replace `pickle` cleanly before merging?",
    "options": [
      "Ask `mypy` to cast `pickle` as `dict`",
      "Add `# nosec` immediately without inspection",
      "Disable `Bandit` across the repository permanently",
      "Replace `pickle` with safe data parsing (`json` / `csv`) — `Bandit` caught an authentic arbitrary-code-execution deserialization vulnerability!"
    ],
    "correct": 3,
    "explanation": "Security linter alarms identify genuine code hazards (`Module 3` `pickle` RCE); remediate root causes cleanly rather than muting warnings blindly."
  },
  {
    "id": "q_c4_m8_095",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "In `sample_auth.log`, why did `2026-11-07T10:00:09Z sshd[1]: Failed password for invalid user chen from 203.0.113.7 port 50003` extract `user='chen'` cleanly into `Event` and JSON output?",
    "options": [
      "`read_events` split lines by space index `[8]`",
      "Optional non-capturing `(?:invalid user )?` consumed `'invalid user '`, letting `(?P<user>[\\w.@-]{1,64})` capture cleanly `'chen'`",
      "`analyse()` removed `'invalid user'` strings afterward",
      "`json.dumps()` formatted `chen` automatically"
    ],
    "correct": 1,
    "explanation": "Careful regex design cleanly normalizes both `'for asha'` and `'for invalid user chen'` onto identical `Event.user` strings."
  },
  {
    "id": "q_c4_m8_096",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "When upgrading `analyse()` to Capstone `rkloga 2.0` (supporting both SSH spray AND single-user brute force across 100,000 log lines), examine distinct-user spray counting via `Counter` on a sliding `deque` of `(ts, user)`: why maintain a `Counter` alongside `deque`?",
    "options": [
      "`len(deque)` counts distinct users directly anyway",
      "Because `collections.deque` cannot store tuples unless paired with `Counter`",
      "Because `Counter` automatically sorts events chronologically",
      "When expiring `(old_ts, old_user)` with `q.popleft()`, decrementing `cnt[old_user]` (deleting key at `0`) lets `len(cnt)` report active distinct users cleanly in `O(1)` time per event instead of rebuilding `{f.user for f in deque}` across huge windows"
    ],
    "correct": 3,
    "explanation": "Tracking active window counts inside an incremental `Counter` alongside bounded `deque` (`I1`) converts per-event distinct-user calculation into O(1)!"
  },
  {
    "id": "q_c4_m8_097",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "In Knight Capital (`C04-M08-CS1`), what preventive organizational rule addresses the fact that `97` internal warning emails fired before market open yet failed to halt disaster?",
    "options": [
      "Turn off email alerts completely",
      "Ensure critical error alerts are actionable with clear triage ownership, runbooks, and automated kill switches rather than ignorable flooded emails",
      "Wait 45 minutes before checking errors",
      "Store alerts inside local writable files"
    ],
    "correct": 1,
    "explanation": "Generating alerts nobody reads or acts upon is operationally equivalent to zero monitoring—connecting Module 7 alert fatigue cleanly to Module 8 deployment engineering."
  },
  {
    "id": "q_c4_m8_098",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Suppose two engineers review a security tool PR: one sees all `10` tests pass; the other checks `LINE_RX` and discovers an attacker username `admin@corp.example` passes while a hostile input `'a' * 65` fails silently into `skipped_lines`. Does `ParseTests` test 64-vs-65 char boundary behavior yet?",
    "options": [
      "65-character usernames crash `dataclass` cleanly",
      "Yes — `test_suspicious_user_text_rejected` already tests 65-character usernames",
      "`MAX_LINE` sets username cap to 64 automatically",
      "Base `ParseTests` tests `'x' * 5000` (`MAX_LINE = 2048`) cleanly; adding explicit boundary tests at `64` chars (pass) vs `65` chars (reject) locks username regex length invariants explicitly"
    ],
    "correct": 3,
    "explanation": "Boundary value tests (`64` accepted vs `65` rejected) verify subtle quantifier edges `{1,64}` cleanly."
  },
  {
    "id": "q_c4_m8_099",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Look at `test_rkloga.py`: what does `test_missing_file_returns_2` verify?",
    "options": [
      "`rkloga.parse_line('') is None`",
      "`rkloga.main(['no_such_file.log']) == 2`",
      "`rkloga.analyse([], timedelta(5), 3) == {}`",
      "`rkloga.read_events` deletes missing files"
    ],
    "correct": 1,
    "explanation": "Explicit CLI test ensuring nonexistent log files fail closed cleanly with `2`."
  },
  {
    "id": "q_c4_m8_100",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "In `AnalyseTests.test_spray_detected_once`: `evs = self.events([F.format(i, u) ...])`. Notice `self.events(...)` assumes `rkloga.parse_line(line)` returns an `Event` cleanly rather than `None`. Why would creating crafted `rkloga.Event(...)` dataclass instances directly inside `AnalyseTests` make failure diagnostics even clearer if `LINE_RX` breaks?",
    "options": [
      "`AnalyseTests` runs faster only when strings are parsed twice",
      "Creating `Event` directly skips timestamp sorting",
      "`Event` instances cannot be constructed outside `parse_line` because of `frozen=True`",
      "Direct `Event(...)` fixtures isolate `AnalyseTests` completely from regex changes (`LINE_RX`), ensuring regex edits break strictly `ParseTests`/`CliTests` rather than throwing confusing `NoneType` noise inside correlation logic tests"
    ],
    "correct": 3,
    "explanation": "True decoupled unit tests pass valid domain objects (`Event`) directly to isolate parser faults cleanly from correlation faults."
  },
  {
    "id": "q_c4_m8_101",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Which of these MUST appear inside an honest operator `README.md` for a log analysis CLI?",
    "options": [
      "Installation instructions, exact CLI invocation examples, exit code contract (`0/1/2`), supported formats, known limitations, and vulnerability/issue reporting contact",
      "Personal API tokens for quick testing",
      "Promises of 100% APT detection guarantee",
      "Raw compiled binary files"
    ],
    "correct": 0,
    "explanation": "Responsible tool authors document capabilities alongside explicit assumptions and limitations cleanly."
  },
  {
    "id": "q_c4_m8_102",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Compare two `CHANGELOG.md` entries for Capstone `rkloga 2.0`: which entry gives incident responders genuinely actionable forensic context?",
    "options": [
      "`v2.0.0: Updated README`",
      "`v2.0.0: Cleaned up code and fixed stuff`",
      "`v2.0.0: Added Windows CSV parser (EID 4624/4625); replaced unbounded IP list with deque eviction; bounded success-after-failure to --saf-minutes (default 60); enforced ipaddress validation (breaking: malformed 999.x IPs now increment skipped_lines)`",
      "`v2.0.0: Rewrote everything`"
    ],
    "correct": 2,
    "explanation": "Detailed behavioral changelog notes tell analysts precisely *why* historic skipped counts or alert counts shift after upgrades."
  },
  {
    "id": "q_c4_m8_103",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Which error pattern inside a user-facing security tool is SAFE and follows OWASP recommendations?",
    "options": [
      "Log detailed sanitized context for operators, emit a clear non-sensitive error message to users without tracebacks or secrets, and return explicit non-zero error exit status (`2`)",
      "Print the entire Python traceback with local variables to screen",
      "Catch all errors quietly (`except: pass`) and exit `0`",
      "Print full environment variables (`os.environ`) on errors"
    ],
    "correct": 0,
    "explanation": "Safe diagnostics tell callers enough cleanly without leaking paths, code internals, or secrets."
  },
  {
    "id": "q_c4_m8_104",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose `rkloga` adds `--output report.json` cleanly in Practical P2, and a CI runner passes a path inside a non-existent directory `/no/such/dir/report.json`. What clean handling should occur?",
    "options": [
      "Print findings cleanly to stdout and exit `0` claiming written",
      "Create random directories silently across `/`",
      "Catch `OSError`, emit clean `'ERROR cannot write report ...'` message without traceback, and fail closed returning exit code `2` cleanly",
      "Crash cleanly with `FileNotFoundError` stack trace"
    ],
    "correct": 2,
    "explanation": "Write failures share the exact same fail-closed contract: clean operator diagnostic + exit `2`, never pretending output succeeded."
  },
  {
    "id": "q_c4_m8_105",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What tool checks Python type annotations (`def parse_line(line: str) -> Event | None:`) statically without running code?",
    "options": [
      "`mypy`",
      "`Black`",
      "`Bandit`",
      "`pip-audit`"
    ],
    "correct": 0,
    "explanation": "`mypy` verifies type safety statically against type hints across functions and dataclasses."
  },
  {
    "id": "q_c4_m8_106",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Look at Instructor Marking Guidance `I2` for Capstone `rkloga 2.0`: points are explicitly deducted for any submission using `shell=True`, `pickle`, or exiting `0` on input errors. Notice how all three violations ALSO trigger automated checks in Module 8. Match each violation to its catch mechanism:",
    "options": [
      "All three are caught solely by `pyproject.toml`",
      "All three are caught automatically solely by `Black`",
      "`shell=True` & `pickle` -> caught by `Bandit`/`Semgrep` SAST; `exit 0` on errors -> caught by `CliTests` failure-path unit assertions (`test_missing_file_returns_2`)",
      "`exit 0` on errors triggers `pip-audit`"
    ],
    "correct": 2,
    "explanation": "Static security linters (`Bandit`/`Semgrep`) plus behavior tests (`unittest` exit-code checks) together guarantee secure engineering compliance."
  },
  {
    "id": "q_c4_m8_107",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "What was `'skipped_lines'` equal to in `rkloga`'s verified `--json` output across `sample_auth.log`?",
    "options": [
      "`1` (representing the line `'random noise line'`)",
      "`0`",
      "`4`",
      "`2`"
    ],
    "correct": 0,
    "explanation": "Five non-empty lines produced 4 recognized events plus 1 explicitly counted skipped line."
  },
  {
    "id": "q_c4_m8_108",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "When upgrading `rkloga 2.0` (`R3`) to output unique public IPs (`ipaddress.is_global`) along with `first_seen` and `last_seen`, why must private RFC 1918 (`10.x`, `192.168.x`) and loopback (`127.0.0.1`) addresses be filtered out cleanly before building the public IOC share list?",
    "options": [
      "Defanging `[.]` crashes on `192.168.x` addresses",
      "`is_global` converts private IPs directly into public ones",
      "Sending internal RFC 1918/loopback addresses inside threat-intel IOC share feeds wastes SOC partner time and leaks internal network topology; checking `ip_obj.is_global` isolates genuine external public peers cleanly",
      "`ipaddress` forbids reading loopback addresses"
    ],
    "correct": 2,
    "explanation": "External IOC sharing requires verified public/global indicators (`ipaddress.ip_address(ip).is_global`) rather than internal LAN addresses."
  },
  {
    "id": "q_c4_m8_109",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What happened in `Case Study C04-M08-CS2` (Lotus Logistics, fictional) after the SOC changed its log parser regex without known-bad sample tests?",
    "options": [
      "The tool silently returned `'no findings'` for two weeks even when malicious events occurred, because real log lines stopped matching",
      "The server crashed immediately with exit `2`",
      "Users lost root passwords",
      "`unittest` blocked deployment"
    ],
    "correct": 0,
    "explanation": "Never mistake zero crashes for functioning detection logic!"
  },
  {
    "id": "q_c4_m8_110",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Look at `rkloga`'s `main()` execution when analyzing clean traffic with zero findings vs. missing log file: why might an inexperienced team prefer hiding missing-file errors (`exit 0`) during noisy rollouts, and why must security leads forbid it?",
    "options": [
      "Because Python forbids `return 0` inside `except FileNotFoundError`",
      "Because `exit 2` takes 10x longer CPU time",
      "Treating unreadable logs as `'0 findings'` hides rotated paths, broken NFS mounts, and attacker log-deletion sabotage—creating silent detection blind spots indistinguishable from safe hosts",
      "Because missing files automatically delete `sample_auth.log`"
    ],
    "correct": 2,
    "explanation": "Always distinguish clean telemetry (`exit 0`) strictly from inaccessible/unverified state (`exit 2`)."
  },
  {
    "id": "q_c4_m8_111",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Which three test classes partition `test_rkloga.py`'s 10 unit checks cleanly?",
    "options": [
      "`ParseTests`, `AnalyseTests`, and `CliTests`",
      "`HashTests`, `HmacTests`, and `XssTests`",
      "`RegexTests`, `NetworkTests`, and `CsvTests`",
      "`LintTests`, `TypeTests`, and `BuildTests`"
    ],
    "correct": 0,
    "explanation": "Each class mirrors a corresponding architectural layer inside `rkloga.py` (`C04-M08-F1`)."
  },
  {
    "id": "q_c4_m8_112",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "In `Practical P2`, learners verify bounded `collections.deque` memory across **100,000 synthetic failures**. How should that test verify bounded state WITHOUT measuring OS heap bytes noisily?",
    "options": [
      "Catch `MemoryError` inside `try/except`",
      "Run `psutil` inside `argparse`",
      "Advance timestamps uniformly over hours with a 5-minute window and assert directly that `len(ip_deque)` never exceeds the few events falling inside that 5-minute span (`len(q) <= expected_max`), proving old records evicted cleanly!",
      "Assert `len(events) == 10` regardless of 100,000 lines"
    ],
    "correct": 2,
    "explanation": "Inspecting `deque` length directly proves mathematical `O(window)` eviction deterministically across all platforms."
  },
  {
    "id": "q_c4_m8_113",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "What line inside `rkloga.py` provides the help description when operators type `python rkloga.py --help`?",
    "options": [
      "`ArgumentParser(description='Summarise SSH auth logs and flag spraying.')` and each option's `help=` parameter",
      "`def parse_line` docstring",
      "`LINE_RX` regex comment",
      "`MAX_LINE = 2048`"
    ],
    "correct": 0,
    "explanation": "`argparse` formats `description=` and argument `help=` parameters directly into `--help`."
  },
  {
    "id": "q_c4_m8_114",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Why does Lesson 8.3 highlight **CHANGELOG tracking** specifically `'essential for detection tools'` (`5012`)?",
    "options": [
      "`Bandit` checks `CHANGELOG.md` spelling",
      "`pyproject.toml` reads `CHANGELOG.md` for package dependencies",
      "SOC dashboards and compliance teams comparing alert counts from last month vs. this month must know whether alert changes stem from new adversary scans or from rule/threshold edits in new code releases",
      "`CHANGELOG.md` replaces docstrings completely"
    ],
    "correct": 2,
    "explanation": "Correlation timelines require auditability across both data AND detector code changes."
  },
  {
    "id": "q_c4_m8_115",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "When `rkloga.py` prints JSON (`--json`) cleanly with findings present, does it still return exit code `1`?",
    "options": [
      "Yes — `return 1 if result['findings'] else 0` applies consistently regardless of text vs. `--json` display format (verified `exit=1` in output tests!)",
      "No — `--json` always overrides exit status to `0`",
      "Only if `skipped_lines > 0`",
      "`--json` returns `2` whenever findings exist"
    ],
    "correct": 0,
    "explanation": "Tested execution prints `=== rkloga ['rkloga.py', 'sample_auth.log', '--json'] (exit=1) ===`."
  },
  {
    "id": "q_c4_m8_116",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Notice that in `rkloga.py`, diagnostic errors print via `log.error(...)` (`logging` module -> `stderr`), whereas findings print via `print(...)` (`stdout`). Why is keeping diagnostics on **stderr** and results (`--json`) on **stdout** critical?",
    "options": [
      "`print()` refuses dictionaries unless piped",
      "`stderr` automatically strips secrets via OWASP rules",
      "Downstream automation piping `python rkloga.py auth.log --json | jq ...` or redirecting stdout to `report.json` receives clean valid JSON uncorrupted by diagnostic log messages",
      "JSON parsers delete lines starting with `ERROR`"
    ],
    "correct": 2,
    "explanation": "Separating machine data (`stdout`) cleanly from operator logs (`stderr`) makes CLI piping reliable across Unix and Windows tools."
  },
  {
    "id": "q_c4_m8_117",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Notice Lesson 8.5 states static quality tools (`Ruff`, `Black`, `mypy`, `Bandit`, `pip-audit`) are optional for first-week beginners yet standard across professional teams. What single file holds project package config and console scripts in modern Python?",
    "options": [
      "`pyproject.toml`",
      "`test_rkloga.py`",
      "`sample_auth.log`",
      "`alerts.jsonl`"
    ],
    "correct": 0,
    "explanation": "`pyproject.toml` unifies build systems, dependencies, tool configs (`ruff`, `mypy`), and console entry points."
  },
  {
    "id": "q_c4_m8_118",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "In a `Continuous Integration (CI)` workflow protecting `rkloga`, why run **deterministic unit tests (`unittest`) AND static security linters (`Bandit`)** rather than relying solely on code formatting checks?",
    "options": [
      "`unittest` automatically formats docstrings",
      "`Bandit` runs unit tests internally",
      "Formatting checks syntax tidiness only; unit tests verify behavioral detection/exit accuracy (`known-bad`/`known-good`/`exit 2`), while `Bandit` blocks dangerous sinks (`shell=True`/`pickle`) across untested branches",
      "`pip-audit` executes `LINE_RX`"
    ],
    "correct": 2,
    "explanation": "Style, security SAST, types, and behavioral unit suites target orthogonal risk surfaces cleanly."
  },
  {
    "id": "q_c4_m8_119",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Look at `rkloga.py` lines 68–73 (`analyse` return dict) + line 114 (`result['skipped_lines'] = skipped`): what five top-level JSON keys appear cleanly in `rkloga --json` output?",
    "options": [
      "`'events'`, `'failures'`, `'successes'`, `'findings'`, `'skipped_lines'`",
      "`'files'`, `'sig'`, `'alerts'`",
      "`'errors'`, `'warnings'`, `'exit_code'`",
      "`'added'`, `'removed'`, `'modified'`"
    ],
    "correct": 0,
    "explanation": "Tested JSON output verifies those exact five keys cleanly (`events=4`, `failures=3`, `successes=1`, `findings=[...]`, `skipped_lines=1`)."
  },
  {
    "id": "q_c4_m8_120",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In Capstone `rkloga 2.0`, suppose an attacker authenticates via Windows CSV export (`EventId=4624`, `TimeCreated='2026-11-07T10:05:00'`) lacking trailing `'Z'` or `'+00:00'` timezone offset. How does Instructor Guidance `I1` prevent `TypeError` when sorting/subtracting against UTC SSH timestamps?",
    "options": [
      "Compare ISO timestamps purely as text strings instead of `datetime`",
      "Drop `'Z'` from SSH timestamps so both are naive",
      "Parse with `fromisoformat()` and normalize any naive timestamps cleanly to UTC (`if ts.tzinfo is None: ts = ts.replace(tzinfo=timezone.utc)`, or `.astimezone(timezone.utc)`) so every `Event.ts` stays timezone-aware UTC",
      "Count Windows rows without timestamps into `skipped_lines` silently"
    ],
    "correct": 2,
    "explanation": "Enforcing uniform aware UTC normalization across every parser guarantees cross-format sorting and `timedelta` safety."
  },
  {
    "id": "q_c4_m8_121",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What happened when `Knight Capital` failed to verify deployment across every single production trading server in late July 2012?",
    "options": [
      "One node kept old dead 2005 code reactivated by the new flag, firing millions of erroneous trades once markets opened",
      "One server lost its SSH config only",
      "The company upgraded cleanly to Python 3.14",
      "Alert emails were deleted by antivirus"
    ],
    "correct": 0,
    "explanation": "Consistent verified rollout across ALL production servers is mandatory—partial deploys produce asymmetric catastrophic failures."
  },
  {
    "id": "q_c4_m8_122",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Why should a detection engineer write at least one dedicated unit test confirming `skipped_lines` increments accurately (`skipped == 1`) when non-empty unparsed garbage lines appear in input logs?",
    "options": [
      "Proves visibility telemetry itself never silently stops counting format drift or corrupted records if someone touches `read_events()`",
      "Because `unittest` rejects logs with garbage lines unless tested",
      "To force `exit 2` whenever 1 line skips",
      "So `parse_line` converts noise into warnings"
    ],
    "correct": 0,
    "explanation": "Testing meta-telemetry (`skipped_lines`) protects your detection health indicator from accidental silencing."
  },
  {
    "id": "q_c4_m8_123",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "In `test_rkloga.py`, what command runs verbose unit tests showing every individual test class and method status (`... ok`)?",
    "options": [
      "`python -m pip-audit`",
      "`python rkloga.py --test`",
      "`python -m json.tool`",
      "`python -m unittest -v`"
    ],
    "correct": 3,
    "explanation": "`python -m unittest -v` runs autodiscovery verbosely across all `test_*.py` suites cleanly."
  },
  {
    "id": "q_c4_m8_124",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Look at `test_rkloga.py` lines `19–33`: why do `ParseTests` methods pass synthetic inline strings directly into `rkloga.parse_line(...)` instead of creating temp files via `write_temp()`?",
    "options": [
      "Because `parse_line` fails on `.log` extensions",
      "Because `write_temp` accepts lists longer than 10 lines only",
      "Because `parse_line` is pure (`str -> Event | None`), bypassing disk I/O runs faster, keeps tests cleaner, and isolates regex testing cleanly from OS filesystem quirks",
      "Because `ParseTests` ignores file permissions"
    ],
    "correct": 2,
    "explanation": "Pure functions eliminate filesystem fixture setup cleanly everywhere file semantics aren't being tested directly."
  },
  {
    "id": "q_c4_m8_125",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why must CLI utilities include realistic usage commands cleanly inside `README.md` alongside `--help` flag listings?",
    "options": [
      "`argparse` crashes unless `README.md` contains examples",
      "Copy-pasteable examples (`python rkloga.py sample_auth.log --json`) speed incident triage under pressure while illustrating normal expected output and exit status",
      "GitHub refuses repositories without JSON examples",
      "`mypy` reads examples in `README.md` to infer types"
    ],
    "correct": 1,
    "explanation": "Under triage stress, verified concrete invocations eliminate guesswork cleanly."
  },
  {
    "id": "q_c4_m8_126",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Notice that in base `rkloga.py`, `skipped_lines` counts unparsed lines—yet `skipped_lines > 0` still exits `0` or `1` rather than `2`. How should honest documentation warn SOC operations about `skipped_lines` thresholds?",
    "options": [
      "Document clearly that high `skipped_lines` warrants operator review (format drift or truncated lines), and consider alerting externally whenever skipped percentage surges abnormally across known homogeneous logs",
      "Advise analysts to always treat `skipped_lines` as zero",
      "Promise `skipped_lines` never catches hostile log manipulation",
      "Hardcode exit `2` even on a single harmless informational banner line in `/var/log/auth.log`"
    ],
    "correct": 0,
    "explanation": "Mixed log files naturally carry harmless non-SSH daemon rows (`skipped`), yet unexpected sudden growth flags format breakages cleanly."
  },
  {
    "id": "q_c4_m8_127",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "In `rkloga.py`, why is `logging.basicConfig(level=logging.WARNING, ...)` configured rather than `print` for `ERROR` messages?",
    "options": [
      "`print()` cannot emit strings starting with `ERROR`",
      "`logging` disables `--json` automatically",
      "`basicConfig` deletes secrets using regex",
      "Logs structured leveled diagnostics cleanly to stderr with consistent prefix formatting (`ERROR ...`) separated cleanly from stdout results"
    ],
    "correct": 3,
    "explanation": "Standard `logging` routes leveled diagnostics cleanly onto `stderr` without polluting stdout pipelines."
  },
  {
    "id": "q_c4_m8_128",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose a script handles `--output FILE` in Capstone `rkloga 2.0`, and writes sensitive findings JSON onto a shared multi-user system directory `/tmp/out.json`. Beyond checking overwrite safety (`--force`), what defensive risk applies to predictable paths in shared `/tmp`?",
    "options": [
      "`json.dumps()` compresses `/tmp` files cleanly",
      "Predictable paths make SHA-256 collide in `/tmp`",
      "Symlink/clobber race attacks on shared world-writable dirs (`/tmp`)—write reports inside protected owner-only directories or use `os.open` / exclusive creation (`'x'`) cleanly rather than following pre-existing `/tmp` symlinks blindly",
      "`--json` forbids paths containing directories"
    ],
    "correct": 2,
    "explanation": "Using dedicated secure output directories or safe exclusive creation guards against symlink attacks in shared temp locations (`Module 4`)."
  },
  {
    "id": "q_c4_m8_129",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Compare `Semgrep` / `Bandit` vs `pytest` / `unittest`: which analyzes Python files statically BEFORE execution, and which checks runtime functional outcomes?",
    "options": [
      "Both execute code statically",
      "`Bandit`/`Semgrep` analyze source ASTs statically without execution; `unittest`/`pytest` execute code dynamically against fixtures and assert outputs",
      "`unittest` reads code without running functions",
      "`Bandit` spawns CLI subprocesses over sample logs"
    ],
    "correct": 1,
    "explanation": "Combining static SAST scanning with dynamic test execution provides defense-in-depth engineering confidence."
  },
  {
    "id": "q_c4_m8_130",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Look at an example `pyproject.toml`: `[project.scripts] rkloga = 'rkloga:main'`. Remember Python module entry behavior (`if __name__ == '__main__': sys.exit(main())`): how does a generated console script entry wrapper handle `main()`'s integer return value (`0/1/2`)?",
    "options": [
      "Standard Python console-script entry wrappers pass whatever `rkloga:main()` returns straight into `sys.exit(...)`, propagating `0`, `1`, and `2` faithfully to the OS shell!",
      "Entry wrappers force all return codes cleanly to `0`",
      "Entry wrappers require `main` to return `'OK'` string",
      "`argparse` blocks `pyproject.toml` console wrappers from returning `2`"
    ],
    "correct": 0,
    "explanation": "`main() -> int` works seamlessly both via `sys.exit(main())` locally AND via packaged `[project.scripts]` entry-point wrappers!"
  },
  {
    "id": "q_c4_m8_131",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Which standard-library Python collection fixes `rkloga`'s known memory-growth limitation across 100,000+ log lines cleanly in Capstone `rkloga 2.0` (`Practical P2`)?",
    "options": [
      "`itertools.cycle`",
      "`collections.ChainMap`",
      "`array.array`",
      "`collections.deque` (evicting old entries cleanly from the left via `popleft()` once outside `window`)"
    ],
    "correct": 3,
    "explanation": "`collections.deque` delivers amortized `O(1)` appends on right and `O(1)` time-window evictions (`popleft()`) on left."
  },
  {
    "id": "q_c4_m8_132",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Look at Capstone requirement `R2`: detecting **single-user brute force** alongside **password spraying**. Distinguish precisely how their grouping keys differ inside `analyse()`:",
    "options": [
      "Both group identically by `port`",
      "Spraying requires Windows CSV; brute force requires SSH",
      "**Spraying** groups failures by **`ip`** counting distinct **`users`** (`many accounts, one source IP`); **brute force** groups failures by **`user`** counting total attempts within window (`many tries against one account`)",
      "Brute force alerts on 1 failure, spraying on 100"
    ],
    "correct": 2,
    "explanation": "Horizontal spraying keys on `ip -> distinct users` cleanly, whereas vertical brute force keys on `user -> failure deque`."
  },
  {
    "id": "q_c4_m8_133",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What primary rule from `Knight Capital (C04-M08-CS1)` applies directly when maintaining an old script repository over multiple years?",
    "options": [
      "Keep all legacy functions forever inside comments",
      "Actively remove unused dead code and deprecated feature flags rather than letting dormant functions linger inside production files",
      "Disable automated alerts during upgrades",
      "Hardcode deployment versions in filenames"
    ],
    "correct": 1,
    "explanation": "Dead code creates unpredictable latent activation hazards when configuration flags shift."
  },
  {
    "id": "q_c4_m8_134",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "In `rkloga.py`, why is `already = any(x['type'] == 'spray' and x['ip'] == e.ip for x in findings)` tested by `AnalyseTests.test_spray_detected_once` with 4 distinct failed users (`a`, `b`, `c`, `d`)?",
    "options": [
      "The 3rd user (`c`) triggers `'spray'`; testing cleanly with a 4th user (`d`) verifies the suppression guard stops duplicate `'spray'` alerts cleanly after reaching threshold `3`",
      "Because `'d'` resets thresholds automatically",
      "Because `spray_users` defaults to `4`",
      "To verify `skipped_lines == 1`"
    ],
    "correct": 0,
    "explanation": "Using 4 inputs (`N + 1` beyond threshold `3`) specifically exercises post-trigger duplicate suppression."
  },
  {
    "id": "q_c4_m8_135",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "What does `unittest` output at the bottom after executing all 10 passing tests cleanly inside `test_rkloga.py`?",
    "options": [
      "`0 findings`",
      "`Passed 10/10` followed by `EXIT 1`",
      "`Skipped 1 line` followed by `DONE`",
      "`Ran 10 tests in ...s` followed by `OK`"
    ],
    "correct": 3,
    "explanation": "Standard `unittest` concludes passing runs with exact count, duration, and `OK` (`exit=0`)."
  },
  {
    "id": "q_c4_m8_136",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Notice in `test_rkloga.py`: `OK = '2026-11-07T10:05:00Z sshd[2]: Accepted password for chen from 203.0.113.7 port 5001'`. Suppose someone later modifies `test_findings_return_1` to delete the `finally: p.unlink()` cleanup block. What subtle bug plagues CI runners over months?",
    "options": [
      "`NamedTemporaryFile` raises `SyntaxError` without `unlink()`",
      "`CliTests` fails immediately on exit code `0`",
      "Leaked synthetic `.log` files accumulate endlessly across `%TEMP%`/`/tmp` on every test run, violating deterministic cleanliness and eventually filling container disks",
      "`rkloga.main` prints `'skipped=1'` on next test"
    ],
    "correct": 2,
    "explanation": "Deterministic temp cleanup prevents cumulative test-runner disk exhaustion and cross-run pollution."
  },
  {
    "id": "q_c4_m8_137",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why should tool developers never omit security caveats and scope boundaries cleanly out of README documentation to make a script 'sound more powerful'?",
    "options": [
      "Because Python docstrings limit characters to 80",
      "False confidence causes incident responders to miss attacks falling outside real parser coverage; candid limitations protect analytical integrity",
      "Because `argparse` strips exaggerated descriptions",
      "So `Bandit` ignores limitation files"
    ],
    "correct": 1,
    "explanation": "Security engineering prizes accurate operational boundaries far above hype."
  },
  {
    "id": "q_c4_m8_138",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Look at Lesson 8.3 and Scenario S3: what specific operational guidance regarding exit code `2` belongs in any one-page SOC runbook describing `rkloga`?",
    "options": [
      "Exit `2` (`error / cannot analyse`) MUST trigger operational alerting (`bad args, missing or unreadable log`), never automated suppression or assumption of `'clean host'`",
      "Exit `2` means zero threats present and can be ignored quietly",
      "Exit `2` automatically retries `--spray-users 1`",
      "Exit `2` only occurs during `--json` output"
    ],
    "correct": 0,
    "explanation": "Documenting exact scheduler actions per exit code (`0/1/2`) ensures SOC operations hook failures into repair ticketing properly."
  },
  {
    "id": "q_c4_m8_139",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Why did `test_bad_arguments_return_2` in `test_rkloga.py` pass `--spray-users 1` cleanly into `rkloga.main`?",
    "options": [
      "Because `test_rkloga` checks `--help`",
      "Because `argparse` rejects odd integers",
      "Because `1` switches to brute-force mode",
      "Because `rkloga` requires `2 <= spray_users <= 1000`, proving that passing `1` cleanly rejects invalid detector sensitivity with exit `2`"
    ],
    "correct": 3,
    "explanation": "Spray detection by definition probes *multiple* accounts (`>= 2`); `--spray-users 1` is nonsensical and caught early cleanly."
  },
  {
    "id": "q_c4_m8_140",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Consider `argparse`'s default behavior when a user passes an *unrecognized CLI flag* (`python rkloga.py sample_auth.log --invalid-flag`) vs. valid syntax failing custom bounds (`--spray-users 1`). What exit code does Python `argparse` itself emit cleanly upon usage syntax errors?",
    "options": [
      "Exit code `0` with warning",
      "Exit code `1`, colliding directly with security findings!",
      "Exit code `2`! Standard `argparse.parse_args()` aligns directly with `rkloga`'s `0/1/2` contract (`2` for any CLI/usage error) without colliding with `1` (findings)",
      "Exit code `-1`"
    ],
    "correct": 2,
    "explanation": "Using `0=clean`, `1=findings`, `2=error` meshes naturally with `argparse`'s built-in `SystemExit(2)` convention—preventing CLI typos (`2`) from falsely posing as security findings (`1`)!"
  },
  {
    "id": "q_c4_m8_141",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which pairing matches the Python quality tool directly to its responsibility?",
    "options": [
      "`Black` = SAST checks; `Bandit` = formatting",
      "`Ruff` = lint/style bugs; `Black` = formatting; `mypy` = type checking; `Bandit` = Python security issues; `pip-audit` = dependency CVEs",
      "`mypy` = packaging TOML; `Ruff` = unit test runner",
      "`pip-audit` = regex backtracking checks"
    ],
    "correct": 1,
    "explanation": "Every engineering tool serves a distinct, non-overlapping verification slice across the software lifecycle."
  },
  {
    "id": "q_c4_m8_142",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Look at Capstone Optional Requirement `R7`: pairing `pyproject.toml` entry point with an **HMAC-signed summary file**. Why sign the final forensic summary (`rkloga 2.0 --json`) with an operator HMAC key (`Module 6/7`) cleanly when submitting evidence during Kestrel Family Dental's IR triage?",
    "options": [
      "Proves downstream incident tickets, management, or legal auditors that the automated summary report was not altered in transit or on disk after `rkloga` produced it",
      "Encrypts the JSON report so analysts cannot read timestamps",
      "Speeds up `collections.deque` eviction",
      "Satisfies `Black` line lengths"
    ],
    "correct": 0,
    "explanation": "Binding Course 04 cryptographic integrity (`M06/M07`) onto capstone utility outputs protects chain-of-custody trust cleanly."
  },
  {
    "id": "q_c4_m8_143",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "In `rkloga.py`, which rule does `FINDING success_after_failure` detect?",
    "options": [
      "An unparsed noise line exceeding 2,048 characters",
      "Three distinct usernames failing from the same IP",
      "A single failed attempt against `'invalid user'`",
      "An `'Accepted'` logon event occurring from a source IP that previously generated one or more `'Failed'` events"
    ],
    "correct": 3,
    "explanation": "Failures followed by acceptance from one source IP frequently indicate an attacker breaking in after credential guessing."
  },
  {
    "id": "q_c4_m8_144",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Compare base `rkloga`'s line-by-line event list (`events, skipped = read_events(...)` -> `sorted(events)`) against streaming millions of records cleanly. When extending Capstone `rkloga 2.0` (`R2`), why does replacing inner list comprehensions `[f for f in failures[e.ip] ...]` with bounded `collections.deque` STILL dramatically accelerate analysis once sorted?",
    "options": [
      "Because `deque` stores compressed SHA-256 hashes instead of `Event` objects",
      "Because `deque` skips sorting completely",
      "Each event now pops only expired edges (`O(1)` amortized) and checks constant active windows rather than scanning all prior failures for that IP (`O(N^2)` worst case across sustained brute-force scans)",
      "`popleft()` automatically filters IPv4 private addresses"
    ],
    "correct": 2,
    "explanation": "Eliminating `O(N)` per-event linear rescans over growing per-IP failure lists drops correlation complexity from `O(N^2)` squarely to `O(N log N)`/`O(N)`."
  },
  {
    "id": "q_c4_m8_145",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What happened on `1 August 2012` at `Knight Capital` showing the need for **end-to-end deployment verification** and **kill switches**?",
    "options": [
      "DNS outages silenced Cloudflare for 27 minutes",
      "Misconfigured code reactivation flooded US equity exchanges with over 4 million orders, causing `$460M+` loss in 45 minutes and `$12M` SEC penalty",
      "An unencrypted backup exposed healthcare records",
      "An outdated regex matched all IPv6 packets"
    ],
    "correct": 1,
    "explanation": "Deployment verification across all fleet nodes + rapid kill switches are vital safeguards alongside unit testing."
  },
  {
    "id": "q_c4_m8_146",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "If you test `analyse()` solely on `sample_auth.log` (where `'asha'`, `'ben'`, `'chen'` occur inside 8 seconds), could an off-by-one window bug (`< window` vs `<= window` or treating `window_min` as seconds instead of minutes!) still pass `test_rkloga.py`?",
    "options": [
      "Wait — treating minutes as `seconds=5` WOULD fail `test_spray_detected_once` only if test failures span > 5s (`0..3s` stays under 5s!). Testing exact spread boundaries (e.g., `4m 59s` triggers while `5m 01s` cleanly does not!) is mandatory to catch unit bugs (`seconds` vs `minutes`)!",
      "No — `timedelta` refuses integers silently",
      "Yes — `test_rkloga.py` already runs 6-minute boundary spread tests",
      "Because `sample_auth.log` checks 6 minutes"
    ],
    "correct": 0,
    "explanation": "Testing tight sub-minute samples misses `seconds` vs `minutes` bugs—Practical P1 explicitly adds a 6-minute (`> 5 min`) spread test for this exact reason!"
  },
  {
    "id": "q_c4_m8_147",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "In `test_rkloga.py`, why is `self.assertEqual((ev.result, ev.user, ev.ip), ('Failed', 'asha', '203.0.113.7'))` clear and informative upon failure?",
    "options": [
      "Python requires tuple assertions in `ParseTests`",
      "Tuples automatically verify frozen dataclass immutability",
      "Tuple equality ignores string casing",
      "Tuple comparison verifies all three extracted capture fields cleanly in one assertion and prints exact left-vs-right diffs if any field breaks"
    ],
    "correct": 3,
    "explanation": "Explicit tuple assertions compare full expected field extractions clearly with readable failure diffs."
  },
  {
    "id": "q_c4_m8_148",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Notice in `test_rkloga.py` lines 13–16: `write_temp` uses `with tempfile.NamedTemporaryFile('w', delete=False, suffix='.log', encoding='utf-8') as fh:`. Why did the author pass `encoding='utf-8'` explicitly on file creation?",
    "options": [
      "Because `LINE_RX` requires UTF-8 BOM headers",
      "Because `NamedTemporaryFile` defaults to binary `bytes` if `'w'` lacks `'utf-8'`",
      "On Windows locales (`cp1252`), omitting `encoding='utf-8'` makes temp writers write platform-legacy encoding while `read_events()` reads UTF-8—explicit `encoding='utf-8'` guarantees portable Unicode behavior everywhere",
      "So `p.unlink()` succeeds on Windows"
    ],
    "correct": 2,
    "explanation": "Consistent explicit UTF-8 at both fixture creation and tool reading (`Module 3`) avoids Windows locale encoding mismatches cleanly."
  },
  {
    "id": "q_c4_m8_149",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "In `rkloga.py`, what two attack patterns does the module docstring document the utility detects cleanly?",
    "options": [
      "SQL injection and stored XSS",
      "Password spraying (`spray`) and success-after-failure (`success_after_failure`)",
      "File integrity drift and DNS tunneling",
      "Buffer overflows and ReDoS"
    ],
    "correct": 1,
    "explanation": "Module docstrings summarize primary tool purpose cleanly right at the top of source files."
  },
  {
    "id": "q_c4_m8_150",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Suppose you hand Capstone `rkloga 2.0` (`Kestrel Family Dental`) cleanly to a new junior analyst. Look at **Rubric Criterion 6 (`Analysis report — 10%`)**: what separates a `4 Distinguished` triage report from merely pasting `rkloga.py --json` stdout?",
    "options": [
      "Distinguished explains every triggered finding's forensic context (`IP`, `targeted users`, `compromised Chen login 7m after spray`, `skipped lines`) alongside prioritized actionable remediation steps (`lock compromised Chen account, block 203.0.113.7, audit sessions`)",
      "Printing ASCII bar charts without reading timestamps",
      "Submitting `--help` output as the incident report",
      "Leaving `findings` unannotated raw JSON"
    ],
    "correct": 0,
    "explanation": "Engineering tools support analysts—never replacing clear interpretation and prioritized incident response."
  },
  {
    "id": "q_c4_m8_151",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "Look at `rkloga.py` line 43: `if len(line) > MAX_LINE: return None`. What numeric byte/character limit is `MAX_LINE` set to?",
    "options": [
      "`65536` bytes",
      "`80` characters",
      "`64` characters",
      "`2048` characters"
    ],
    "correct": 3,
    "explanation": "`MAX_LINE = 2048` prevents excessively long hostile lines from choking regex parsing."
  },
  {
    "id": "q_c4_m8_152",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "In Scenario S2, why is rotating an API token *mandatory* right after discovering an exception traceback printed `?access_token=xyz123` into CI build logs, even after deploying the code fix?",
    "options": [
      "Because fixing the script invalidates existing tokens on remote APIs automatically",
      "Because `logging.basicConfig()` deletes expired tokens automatically",
      "Because log archives, artifact caches, and build systems already retain plaintext `xyz123` historically—fixing the formatter only prevents future leaks, leaving the exposed credential compromised until revoked and replaced",
      "Wait — only private repos need rotation, CI logs expire cleanly"
    ],
    "correct": 2,
    "explanation": "Treat any secret that ever entered logs, errors, or commits as permanently exposed and rotate immediately."
  },
  {
    "id": "q_c4_m8_153",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which Course 12 static security scanner complements Python-specific `Bandit` across polyglot security repositories?",
    "options": [
      "`Black`",
      "`Semgrep`",
      "`setuptools`",
      "`unittest`"
    ],
    "correct": 1,
    "explanation": "`Bandit` specializes in Python AST checks, while `Semgrep` runs custom multi-language security rules taught later in Course 12."
  },
  {
    "id": "q_c4_m8_154",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Suppose a Python package specifies `requires-python = '>=3.10'` in `pyproject.toml`, yet its author accidentally calls `datetime.UTC` (introduced in Python 3.11, whereas 3.10 uses `datetime.timezone.utc`). How do tests across CI version matrices prevent breaking users running Python 3.10?",
    "options": [
      "Running automated CI tests across supported matrix versions (`3.10`, `3.12`, `3.14`) alongside `mypy`/`Ruff` version targeting catches version-specific stdlib incompatibilities cleanly before release",
      "`pip-audit` translates `UTC` to `timezone.utc` automatically",
      "`Black` rewrites Python 3.11 attributes downward",
      "`pyproject.toml` isolates Python interpreters internally"
    ],
    "correct": 0,
    "explanation": "If you advertise `>=3.10` compatibility, test matrices (and Ruff `target-version = 'py310'`) verify you didn't leak 3.11+-only symbols (`Course 04 uses timezone.utc` safely everywhere!)."
  },
  {
    "id": "q_c4_m8_155",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Which layer of `rkloga.py` handles file opening, `errors='replace'`, and `skipped` counting (`C04-M08-F1`)?",
    "options": [
      "`Event` dataclass",
      "`parse_line(line: str)`",
      "`analyse(events, window, spray_users)`",
      "`read_events(path: Path) -> tuple[list[Event], int]`"
    ],
    "correct": 3,
    "explanation": "I/O stays cleanly isolated inside `read_events()`, feeding normalized objects to pure `analyse()`."
  },
  {
    "id": "q_c4_m8_156",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In `rkloga.py`'s `parse_line(line)` (`48`): `ts = datetime.fromisoformat(m['ts'].replace('Z', '+00:00'))`. Remember that Python 3.11+ `fromisoformat()` accepts `'Z'` natively while Python 3.10 raised `ValueError` on trailing `'Z'`. Why is `.replace('Z', '+00:00')` smart defensive engineering?",
    "options": [
      "`replace('Z', '+00:00')` skips leap seconds",
      "`'Z'` indicates naive local time unless replaced",
      "Guarantees 100% compatibility across Python `3.10` AND `3.11–3.14+` identically without changing any downstream logic",
      "Because `LINE_RX` captures `+00:00` literally"
    ],
    "correct": 2,
    "explanation": "Small explicit compatibility normalizations let defensive scripts run seamlessly across real client endpoints still running Python 3.10 LTS."
  },
  {
    "id": "q_c4_m8_157",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What should an engineer verify when a test intentionally injects `'bob; rm -rf /'` into `parse_line()`?",
    "options": [
      "The file `/tmp` gets wiped cleanly",
      "The hostile line is rejected safely (`None` returned) rather than misparsing malformed command-like tokens as valid usernames",
      "`rkloga` switches directly to `shell=True`",
      "All SSH events return `'Failed'`"
    ],
    "correct": 1,
    "explanation": "Validating strict rejection of suspicious characters stops messy downstream injection risks right at parser ingress."
  },
  {
    "id": "q_c4_m8_158",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "If a detector rule adds a new feature flag `--ignore-ip` in future versions and forgets to test known-bad IPs when `--ignore-ip` is omitted (`default=None`), what Lotus-Logistics-style disaster threatens production?",
    "options": [
      "A buggy default filter could inadvertently ignore ALL traffic (`if ip in ignore or not ignore:` typo!), silencing production alerts while positive tests only passing `--ignore-ip 1.2.3.4` looked fine",
      "`argparse` drops positional files automatically",
      "Unit tests ignore flag defaults silently",
      "`skipped_lines` reports false negatives"
    ],
    "correct": 0,
    "explanation": "Always test default flag configurations with known-bad samples so opt-in exclusion logic never breaks out-of-the-box detection."
  },
  {
    "id": "q_c4_m8_159",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "Why does `test_rkloga.py` conclude with `if __name__ == '__main__': unittest.main()`?",
    "options": [
      "Deletes temporary logs before tests start",
      "Compiles `rkloga.py` automatically",
      "Creates `pyproject.toml`",
      "Allows running tests directly via `python test_rkloga.py` in addition to `python -m unittest -v`, while safely remaining importable without auto-executing"
    ],
    "correct": 3,
    "explanation": "Standard `__main__` guard supports direct invocation cleanly alongside test-runner discovery."
  },
  {
    "id": "q_c4_m8_160",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Notice that `CliTests.test_findings_return_1` checks return code `1` cleanly, yet doesn't inspect stdout text inside that specific test method. How can an expanded `unittest` verify stdout JSON fields cleanly in Capstone `rkloga 2.0` (`--json` mode)?",
    "options": [
      "`unittest` blocks capturing `stdout` natively",
      "Print to disk manually and run `grep` via `os.system`",
      "Use `contextlib.redirect_stdout(io.StringIO())` around `rkloga.main([str(p), '--json'])`, assert exit `1`, parse captured output with `json.loads()`, and assert exact `findings` / `skipped_lines` structure!",
      "Convert `print` statements to `assertEqual` manually"
    ],
    "correct": 2,
    "explanation": "`io.StringIO` + `contextlib.redirect_stdout` verifies exact CLI text and `--json` payloads purely in memory cleanly."
  },
  {
    "id": "q_c4_m8_161",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Where do operators look first inside a repository for tool purpose, install steps, CLI examples, known limitations, and security reporting instructions?",
    "options": [
      "`LINE_RX` pattern",
      "`README.md`",
      "`test_rkloga.py` fixtures",
      "`__pycache__/*.pyc`"
    ],
    "correct": 1,
    "explanation": "`README.md` is the primary human landing manual for onboarding and triage."
  },
  {
    "id": "q_c4_m8_162",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Look at `rkloga.py`'s tested environment line in its module docstring (`Tested: CPython 3.14.4, Windows 11, 2026-11-07`). Why does recording the exact tested interpreter & OS date strengthen institutional trust during course/enterprise audits?",
    "options": [
      "Distinguishes verified execution-tested behavior from speculative untested snippets (`Course 04 execution-tested badge`), helping reviewers reproduce results under known platform versions",
      "Locks Python against running on Linux kernels",
      "Forces `unittest` to check system dates before passing",
      "Generates `pyproject.toml` classifiers automatically"
    ],
    "correct": 0,
    "explanation": "Reproducible verified environment documentation separates battle-tested tooling from unverified AI or draft code."
  },
  {
    "id": "q_c4_m8_163",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "In `rkloga.py`, which two flags accept integer ranges checked explicitly against upper and lower bounds before reading the file?",
    "options": [
      "`--saf-minutes` and `--help`",
      "`--json` and `logfile`",
      "`--format` and `--force`",
      "`--window-min` (`1–1440`) and `--spray-users` (`2–1000`)"
    ],
    "correct": 3,
    "explanation": "Checking `1 <= window_min <= 1440 and 2 <= spray_users <= 1000` rejects nonsensical timing/threshold extremes cleanly (`exit 2`)."
  },
  {
    "id": "q_c4_m8_164",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Look at `Scenario S2` again: an engineer fixes token exposure by moving the API token out of URL query strings into an HTTP header (`Authorization: Bearer ...`) and logging only `host` + `status_code`. Why add a unit test mocking failure and asserting `assertNotIn(fake_token, captured_logs)`?",
    "options": [
      "To convert `Bearer` tokens into HMAC tags cleanly",
      "Because HTTP headers refuse tokens unless tested in `unittest`",
      "Future library upgrades or debug handlers often dump raw HTTP request headers inside verbose exception strings; testing guarantees zero future secret regression into logs",
      "Because `assertNotIn` strips tokens in production automatically"
    ],
    "correct": 2,
    "explanation": "Negative log-sanitization assertions enforce secret hygiene continuously across dependency and code updates."
  },
  {
    "id": "q_c4_m8_165",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What advantage does packaging `rkloga` cleanly via `pyproject.toml` provide compared to asking SOC analysts to copy `.py` files manually into arbitrary directories?",
    "options": [
      "Automatically installs root malware scanners everywhere",
      "Versioned repeatable installs inside isolated venvs, clean console entry command (`rkloga`), tracked metadata, and dependency hygiene (`pip-audit`)",
      "Disables Python exception handling",
      "Encrypts `test_rkloga.py` with SHA-256"
    ],
    "correct": 1,
    "explanation": "Standard packaging yields reproducible installation, clean versioning, and reliable CLI execution across environments."
  },
  {
    "id": "q_c4_m8_166",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Examine how all four Course 04 Phases prepare a developer cleanly for `Bandit` & `mypy` checks in Module 8: if a developer uses `subprocess.run(['ping', host], timeout=10)` with type hint `host: str` cleanly vs `subprocess.run(f'ping {host}', shell=True)`, what happens under `Bandit`?",
    "options": [
      "Safe argument-list `subprocess.run(['ping', host], ...)` passes cleanly without triggering Bandit's high-severity `B602` (`shell=True`) command-injection violation (`Module 4 + Module 8`)",
      "Both trigger identical high-severity `Bandit` failures",
      "`shell=True` passes `Bandit` cleanly if `timeout=10` passes",
      "`mypy` bans importing `subprocess`"
    ],
    "correct": 0,
    "explanation": "Secure coding patterns learned in Modules 1–7 align 100% with modern AST security scanners taught in Module 8."
  },
  {
    "id": "q_c4_m8_167",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "In `rkloga`'s verified plain-text run on `sample_auth.log`, what two findings printed with timestamp?",
    "options": [
      "`No findings (exit 0)`",
      "`FINDING brute_force user=asha` only",
      "`FINDING hmac_tamper` and `FINDING xss`",
      "`FINDING spray ip=203.0.113.7 time=2026-11-07T10:00:09+00:00` and `FINDING success_after_failure ip=203.0.113.7 time=2026-11-07T10:07:20+00:00`"
    ],
    "correct": 3,
    "explanation": "Three distinct user failures (`asha`, `ben`, `chen`) trigger `spray` at `10:00:09`, and `chen` accepting at `10:07:20` triggers `success_after_failure`."
  },
  {
    "id": "q_c4_m8_168",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Examine Course Assessment Task **C04-CT1** (`read CSV of (hostname, ip), write JSON report of invalid rows and hosts with public IPs + 3 tests`) alongside Capstone `rkloga 2.0`: what Python standard-library combo cleanly parses the CSV, filters invalid rows safely without crashing, and flags public IPs?",
    "options": [
      "`pickle.load()` + string startswith `'192.168.'`",
      "`split(',')` + `eval()` + regex `[0-9.]+`",
      "`csv.DictReader` (using `newline=''`) + `ipaddress.ip_address()` inside `try/except ValueError` + `.is_global` property + `json.dumps()`",
      "`subprocess.run('ipconfig', shell=True)`"
    ],
    "correct": 2,
    "explanation": "Verified CT1 architecture unites M03 safe CSV parsing, M05 semantic `ipaddress` checks, and M08 deterministic 3-case testing (valid private, valid public, invalid row)."
  },
  {
    "id": "q_c4_m8_169",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "Why should regression tests for security tools be included in Continuous Integration (CI) pipelines running automatically on every Git pull request?",
    "options": [
      "Replaces `README.md` completely",
      "Catches silent regex breakages, edge regressions, and missing failure exit codes cleanly before flawed code reaches analysts or hosts",
      "Forces all functions to execute using `shell=True`",
      "Disables `argparse` validation flags"
    ],
    "correct": 1,
    "explanation": "Automated PR verification turns developer memory discipline into guaranteed structural enforcement."
  },
  {
    "id": "q_c4_m8_170",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Compare `Module 4` (`Course Task C04-CT2`: `subprocess.run(f'ping {host}', shell=True)`) testing requirements: what security-focused test case MUST accompany CT2's refactored safe ping wrapper (`['ping', '-c', '1', host]`)?",
    "options": [
      "Known-bad command-injection input like `'127.0.0.1; id'` or `'host && whoami'` MUST raise validation rejection *before* invoking `subprocess` (`verify validation blocks shell metacharacters completely`)",
      "Testing `'127.0.0.1'` alone confirms OS command injection is blocked",
      "Testing only `shell=False` without validating `host` stops arbitrary ping flag injection like `'-I'` too",
      "No tests apply to subprocess wrappers"
    ],
    "correct": 0,
    "explanation": "Testing hostile metacharacter strings verifies that strict host/IP pattern + `ipaddress` validation actually rejects payloads cleanly up front."
  },
  {
    "id": "q_c4_m8_171",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "What happens in `test_rkloga.py` when `parse_line('2026-11-07T10:00:01Z sshd[1]: Failed password for asha from 203.0.113.7 port 50001')` executes?",
    "options": [
      "Appends `'asha'` straight into `findings`",
      "Returns `None` because port exceeds `1024`",
      "Raises `TypeError` on `'Z'`",
      "Returns a frozen `Event(ts=2026-11-07T10:00:01+00:00, result='Failed', user='asha', ip='203.0.113.7')` cleanly"
    ],
    "correct": 3,
    "explanation": "Standard valid line parses cleanly into an aware UTC `Event` dataclass instance."
  },
  {
    "id": "q_c4_m8_172",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Look at `test_rkloga.py`'s `ParseTests.events` / `AnalyseTests.events`: `return [rkloga.parse_line(line) for line in lines]`. Suppose a future contributor edits one format string `F` in `AnalyseTests` and accidentally introduces garbage so `parse_line` returns `[Event, None, Event]`. Why does adding an assertion `assert all(e is not None for e in evs)` inside helper `.events()` avoid confusing `AttributeError: 'NoneType' object has no attribute 'ts'` inside `analyse`?",
    "options": [
      "Python skips `None` items in list comprehensions implicitly",
      "`sorted()` ignores `None` objects safely otherwise",
      "Pinpoints immediately *which test fixture failed parsing* instead of misleading developers to debug `analyse()` sorting over an unexpected `None`",
      "`assertIsNone` deletes bad fixtures cleanly"
    ],
    "correct": 2,
    "explanation": "Fail-fast fixture helpers report malformed test inputs right at construction time."
  },
  {
    "id": "q_c4_m8_173",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why does documenting exit codes (`0=clean, 1=findings, 2=error`) in BOTH `rkloga.py`'s docstring AND `README.md` prevent production surprises?",
    "options": [
      "Python converts exit `1` to `0` if undocumented",
      "Automation engineers wiring `cron`, Task Scheduler, or CI runners rely strictly on exact exit status semantics without guessing from `0` vs non-zero",
      "`--json` prints docstrings directly into stdout",
      "`unittest` checks exit docs cleanly"
    ],
    "correct": 1,
    "explanation": "Explicit documented return codes form the automation API contract between script authors and platform operators."
  },
  {
    "id": "q_c4_m8_174",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Why should Capstone `rkloga 2.0`'s README explicitly advise SOC analysts inspecting Windows CSV exports (`R1`) how timestamps missing explicit UTC offsets are interpreted?",
    "options": [
      "Because unannotated CSV `TimeCreated` strings (`local vs UTC`) risk 5–8 hour false correlation offsets when stitched next to UTC SSH logs—explicitly documenting required UTC export or assumed conversion protects timeline accuracy",
      "Because `csv.DictReader` ignores date columns alphabetically",
      "Windows Event IDs never contain timestamps",
      "JSON converts UTC back into local machine offsets automatically"
    ],
    "correct": 0,
    "explanation": "Mixed-timezone forensic correlation bugs frequently invalidate incident timelines unless CSV timezone assumptions are documented explicitly."
  },
  {
    "id": "q_c4_m8_175",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "According to `C04-M08-F3` (`Exit code contract`), what action should automated scheduling take when `rkloga` returns **exit 1**?",
    "options": [
      "Disable the script permanently",
      "Record scheduler status OK (`no findings`)",
      "Page operations for broken script syntax (`could not run`)",
      "Raise a security alert or incident ticket (`analysed cleanly, findings present`)"
    ],
    "correct": 3,
    "explanation": "`0` = scheduler OK, `1` = findings -> alert/ticket, `2` = error -> fail-closed ops page."
  },
  {
    "id": "q_c4_m8_176",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Compare two scripts encountering an unexpected JSON file format error: Script A catches `JSONDecodeError`, logs `ERROR invalid JSON config`, and returns `2`; Script B has zero `try/except` and crashes dumping full stack traceways including file directory paths and `sys.exit(1)`. Which defect makes Script B unsafe in automation?",
    "options": [
      "`JSONDecodeError` inherits from `FileNotFoundError` cleanly",
      "Script B fixes itself via `errors='replace'`",
      "Both leaking internal path/code details in tracebacks AND returning `1` (misleading wrappers expecting `1 = security findings` cleanly rather than `2 = broken input error`)",
      "Script A hides broken config silently by returning `0`"
    ],
    "correct": 2,
    "explanation": "Unhandled exceptions crash with Python default exit `1`—colliding directly with security-finding exit `1` AND exposing tracebacks!"
  },
  {
    "id": "q_c4_m8_177",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "What happens cleanly when an operator runs `pip install .` inside a virtual environment containing `rkloga`'s `pyproject.toml` (`[project.scripts] rkloga = 'rkloga:main'`)?",
    "options": [
      "Overwrites global OS system Python libraries unsafely",
      "Installs `rkloga` cleanly into the isolated venv so typing `rkloga sample_auth.log --json` runs directly without typing full script paths",
      "Bypasses SHA-256 package hashes",
      "Removes `test_rkloga.py` cleanly"
    ],
    "correct": 1,
    "explanation": "Isolated venv packaging gives repeatable command-line UX without polluting global interpreter state."
  },
  {
    "id": "q_c4_m8_178",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Why does modern Python engineering use `try` + `except OSError` AND static type hints (`-> Event | None`, `-> dict`, `-> int`) together inside security tools?",
    "options": [
      "Static typing stops developer contract mistakes (`None` dereferences, swapping `str` vs `Path`) pre-release, while runtime exception handling guards cleanly against live environment/disk faults in production",
      "Type hints replace runtime exception checks completely",
      "`try/except OSError` runs statically inside `mypy`",
      "`Bandit` checks only functions lacking type annotations"
    ],
    "correct": 0,
    "explanation": "Compile/static checking removes author logic mismatches; runtime error handling gracefully survives hostile inputs and failing disks."
  },
  {
    "id": "q_c4_m8_179",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Look at `rkloga.py`'s `LINE_RX`: what character-length range bounds `(?P<user>[\\w.@-]{1,64})`?",
    "options": [
      "Up to `2048` characters",
      "`2` to `45` characters (the `ip` group length bound)",
      "`1` to `5` characters (the `port` digit length bound)",
      "`1` to `64` characters"
    ],
    "correct": 3,
    "explanation": "Each named group specifies explicit strict length ranges: user `1..64`, IP pattern `2..45`, port `1..5`, whole line cap `2048`."
  },
  {
    "id": "q_c4_m8_180",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In Capstone `rkloga 2.0` (`R2–R4`), examine how Course 04 Phases integrate into one single tool: list how M03 (Files/CSV), M05/M06 (IP/UTC/defang/HMAC), M07 (alert rules/suppression), and M08 (testable layers/exit `0,1,2`) unite inside `rkloga 2.0`:",
    "options": [
      "Checking hard-coded ports strictly in M01 `if/elif` loops without file I/O",
      "Using `shell=True`, `pickle`, naive timestamps, and exit `0` on file errors",
      "Safe `DictReader` + CSV `'` formula guarding (`M03`), aware UTC + `ipaddress.is_global` + `[.]` defanging + optional HMAC signed summary (`M05/M06`), bounded sliding windows + duplicate spray suppression (`M07`), pure functions + `>=20` `unittest` + `pyproject.toml` + `0/1/2` exits (`M08`)",
      "Re-writing SSH logs in XML"
    ],
    "correct": 2,
    "explanation": "Every core security programming module across Course 04 builds directly into the engineered `rkloga 2.0` Capstone utility."
  },
  {
    "id": "q_c4_m8_181",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "What should an engineer check FIRST if a log detector exits cleanly yet `skipped_lines` suddenly jumps from `1%` yesterday to `99%` today?",
    "options": [
      "Celebrate cleanly because alerts dropped to zero",
      "Assume upstream log format shifted or regex broke (`Lotus Logistics` early warning) and inspect raw sample skipped lines immediately rather than celebrating `0` findings",
      "Delete lines above `MAX_LINE` permanently",
      "Disable `read_events` skipped tracking"
    ],
    "correct": 1,
    "explanation": "Monitoring `skipped_lines` exposes parser rot or vendor format changes before blind spots last weeks."
  },
  {
    "id": "q_c4_m8_182",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "difficult",
    "q": "Suppose you test a brand-new `success_after_failure` window cutoff `--saf-minutes 30` cleanly. What exact three-point boundary matrix validates `<`, `==`, and `>` threshold edge cases rigorously?",
    "options": [
      "(a) failure then success `29m 59s` later (alerts), (b) exact `30m 00s` boundary (document `<=` vs `<` behavior explicitly and verify!), (c) `30m 01s` later (does NOT alert)",
      "Testing `1s` only",
      "Testing `0s` and `5000h` only",
      "Testing missing file exit `2` only"
    ],
    "correct": 0,
    "explanation": "Testing `T - 1s`, `T`, and `T + 1s` eliminates subtle boundary inequalities (`<` vs `<=`)."
  },
  {
    "id": "q_c4_m8_183",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "medium",
    "q": "In `test_rkloga.py`, why is `self.assertEqual(r['findings'][0]['type'], 'success_after_failure')` written on `test_success_after_failure`?",
    "options": [
      "Tests oversized line rejection",
      "Verifies `'spray'` triggers on 1 user",
      "Tests CLI error return `2`",
      "Verifies cleanly that one failed attempt for `'chen'` followed by `'Accepted'` (`OK`) produces the `'success_after_failure'` finding type rather than silently ignoring it"
    ],
    "correct": 3,
    "explanation": "Targeted assertions verify expected detection dictionary fields directly."
  },
  {
    "id": "q_c4_m8_184",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Why does keeping `test_rkloga.py` completely free of live network requests (`urllib`, sockets) keep continuous integration reliable?",
    "options": [
      "Python `3.14` forbids `urllib` inside tests",
      "`unittest` disables `socket` automatically",
      "Sandboxed/offline CI environments without external DNS or volatile external hosts pass reproducibly in 5ms without network flakiness",
      "`main(argv)` cannot execute HTTP tests"
    ],
    "correct": 2,
    "explanation": "Deterministic synthetic unit tests never depend on external network availability (`Course 04` local-only principle)."
  },
  {
    "id": "q_c4_m8_185",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "If `README.md` lists `'Limitations: rkloga does not follow log rotation splits across archived .gz logs'`, what practical benefit gives this note?",
    "options": [
      "Stops Python from reading UTF-8",
      "Tells responders explicitly to decompress/concatenate rotated archives before analysis or handle boundary spray windows cleanly",
      "Forces `argparse` to fail on `.log` extensions",
      "Doubles detection speed"
    ],
    "correct": 1,
    "explanation": "Explicit boundary notes guide proper operational preparation before triage."
  },
  {
    "id": "q_c4_m8_186",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "difficult",
    "q": "Look at `rkloga.py`'s JSON schema: `{'events': ..., 'failures': ..., 'successes': ..., 'findings': [...], 'skipped_lines': ...}`. Why should `README.md` freeze and document these exact key names as part of the tool's API?",
    "options": [
      "Upstream SIEM ingestion scripts, SOAR playbooks, and automated tests parse those exact keys—silently renaming `'skipped_lines'` to `'ignored'` breaks downstream consumers unless versioned in `CHANGELOG.md`",
      "Because JSON requires alphabetical key freezing via `sort_keys`",
      "Because `pyproject.toml` parses JSON keys",
      "Because `--help` prints full output JSON dictionaries"
    ],
    "correct": 0,
    "explanation": "Output JSON keys form a machine interface contract just as critical as CLI flags and exit codes."
  },
  {
    "id": "q_c4_m8_187",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "medium",
    "q": "In `rkloga.py`, if a user has read permission denied (`chmod 000`) on `auth.log`, what exact error behavior happens?",
    "options": [
      "Invokes `sudo` automatically",
      "Prints Python permission traceback and exits `0`",
      "Returns `findings=[]` (`exit 0`)",
      "`except PermissionError` logs `'ERROR permission denied: ...'` cleanly without a raw traceback and returns exit code `2`"
    ],
    "correct": 3,
    "explanation": "Clean permission handling (`lines 106–108`) fails closed safely (`exit 2`)."
  },
  {
    "id": "q_c4_m8_188",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Suppose a future maintainer edits line 109 of `rkloga.py` changing `return 2` inside `except FileNotFoundError:` down to `return 0` so cron email stop paging on temporary host rebuilds. Why is that regression dangerous?",
    "options": [
      "Forces `test_valid_failed_line` to fail",
      "Causes Python `argparse` to fail parsing `--json`",
      "Permanently suppresses missing-audit-log incidents cleanly behind `'all clear'` status `0`—meaning compromised hosts deleting logs look healthy forever (`violates fail closed`)",
      "Makes `MAX_LINE` jump to 5,000"
    ],
    "correct": 2,
    "explanation": "Never silence security check errors behind exit `0`; missing logs must alarm operations loudly (`exit 2`)."
  },
  {
    "id": "q_c4_m8_189",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "Which of these represents the strongest baseline engineering hygiene habit before marking any Python security tool complete?",
    "options": [
      "Saving `tool_final_v2.py` straight onto Desktop with zero tests",
      "Version control (Git), automated tests passing (`unittest`), clean lint/type/SAST hygiene (`Ruff`, `mypy`, `Bandit`), dependency audit (`pip-audit`), and honest `README` documentation",
      "Wrapping entire files in global `try: ... except: pass`",
      "Adding external unpinned PyPI utilities via `sudo pip install`"
    ],
    "correct": 1,
    "explanation": "Disciplined software engineering converts working prototypes into dependable institutional tools."
  },
  {
    "id": "q_c4_m8_190",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "difficult",
    "q": "Why does `Knight Capital (C04-M08-CS1)` reinforce Module 8's CI/version-control discipline alongside automated testing?",
    "options": [
      "Controlled versioned releases, automated artifact verification across ALL target servers, pruning dead code, and tested end-to-end checks eliminate silent split-version deployment disasters",
      "Knight Capital lacked `pyproject.toml` comments",
      "Version control blocks Python exceptions cleanly",
      "Git deletes deprecated flags automatically at midnight"
    ],
    "correct": 0,
    "explanation": "Reliable software delivery ties code review, dead-code removal, automated test checks, and uniform deployment verification together."
  },
  {
    "id": "q_c4_m8_191",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Which standard-library check inside Capstone `rkloga 2.0` verifies whether extracted IP strings are genuinely routable public addresses rather than `10.0.0.5` or `127.0.0.1`?",
    "options": [
      "`ip.startswith('203.')`",
      "`LINE_RX.match(ip)`",
      "`len(ip) > 7`",
      "`ipaddress.ip_address(ip).is_global` (after parsing in `try/except ValueError`)"
    ],
    "correct": 3,
    "explanation": "`ipaddress.ip_address().is_global` handles IPv4 and IPv6 special/private/loopback exemptions accurately."
  },
  {
    "id": "q_c4_m8_192",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Examine `rkloga.py`'s calculation of `'failures'` (`line 70`): `'failures': sum(len(v) for v in failures.values())`. Notice what subtly breaks if Capstone blindly inserts `q.popleft()` eviction directly INSIDE the exact `failures` dict used in `sum(len(v) ...)` without separating total counts!",
    "options": [
      "No breakage — `'failures'` must equal `0` cleanly after 5 minutes",
      "Actually `deque` keeps popped items inside `sum()` automatically",
      "`popleft()` removes aged failures from the window `deque`, so summing `len(q)` at the end would only report *still-active-window* failures instead of total failures across the log unless total `fail_count += 1` tracks separately!",
      "`popleft()` raises `TypeError` inside generator sums"
    ],
    "correct": 2,
    "explanation": "Subtle capstone trap: maintain dedicated lifetime summary counters (`total_failures += 1`) cleanly separated from the `popleft()`-evicted active window `deque`!"
  },
  {
    "id": "q_c4_m8_193",
    "topic": "C04-M08-L01: Security Tool Testing Principles",
    "difficulty": "medium",
    "q": "In Capstone rubric **Testing (20%)**, what distinguishes **3 Competent (`>= 20 tests incl. good/bad/failure paths`)** from **1 Developing (`< 10 tests`)**?",
    "options": [
      "Only checking line count of `test_rkloga.py`",
      "Having `>= 20` passing tests actively spanning known-good, known-bad, and error-failure paths cleanly (`<= 10` untested paths sits below Competent)",
      "Running `Bandit` instead of unit tests",
      "Skipping missing-file tests cleanly"
    ],
    "correct": 1,
    "explanation": "Passing requires every rubric criterion cleanly at Competent (`>= 3`) or higher alongside `>= 60%` weighted total."
  },
  {
    "id": "q_c4_m8_194",
    "topic": "C04-M08-L02: unittest & Pure Function Design",
    "difficulty": "difficult",
    "q": "Suppose someone writes `assert True` inside a dummy placeholder unit test to boost count from 19 to 20. Why do senior reviewers & Capstone marking `I2` reject coverage padding immediately?",
    "options": [
      "Tests must pin real observable invariants (`outputs`, `state bounds`, `exit status`, `rejected bad payloads`) against known-bad/known-good behaviors—no-op assertions give zero regression safety",
      "`unittest` blocks `assert True` via `SyntaxError`",
      "`assert True` exits cleanly with status `2`",
      "20 tests must span exactly 20 separate files"
    ],
    "correct": 0,
    "explanation": "Meaningful assertions fail immediately when real behavior regresses (`broken regex -> failing test`)."
  },
  {
    "id": "q_c4_m8_195",
    "topic": "C04-M08-L03: Documentation & Honest Limitations",
    "difficulty": "medium",
    "q": "Why should Capstone `rkloga 2.0` (`R6`) document supported CLI options AND limitations identically in `--help` and `README.md`?",
    "options": [
      "Because `mypy` rejects diverging prose",
      "Because `--help` automatically writes `README.md`",
      "Because `CHANGELOG.md` validates `--help` syntax",
      "Consistent documentation prevents discrepancies between quick CLI flag usage and deep SOC deployment playbooks"
    ],
    "correct": 3,
    "explanation": "Synchronized docs eliminate mismatch surprises between quick CLI runs and reference runbooks."
  },
  {
    "id": "q_c4_m8_196",
    "topic": "C04-M08-L04: Secure Error Handling & Exit Codes",
    "difficulty": "difficult",
    "q": "Which three specific defenses summarized in Module 8 Lesson 4 keep errors, unexpected file formats, and oversized lines from becoming security leaks or crashes?",
    "options": [
      "Printing full environment variables, exiting `0` everywhere, and `shell=True`",
      "Using `except: pass`, skipping `argparse`, and unbounded `.read()`",
      "Catching specific exceptions cleanly (`return 2`, no raw tracebacks or leaked secrets), enforcing early CLI parameter bounds, and bounding input resources (`MAX_LINE = 2048` + `errors='replace'`)",
      "Re-raising `KeyboardInterrupt` inside `--json` strings"
    ],
    "correct": 2,
    "explanation": "Targeted exception guards, resource limits, secret redaction, and explicit `0/1/2` exits harden the CLI boundary end-to-end."
  },
  {
    "id": "q_c4_m8_197",
    "topic": "C04-M08-L05: Static Analysis, Types & Packaging",
    "difficulty": "medium",
    "q": "In Course 04, which complete test environment version validated every single Python program across Modules 1–8 cleanly?",
    "options": [
      "Python `2.7` legacy runtime",
      "CPython `3.14.4` (Windows 11, using Python standard library and verified local test outputs; compatible down through `3.10+`)",
      "Node.js `22.x` only",
      "CPython `3.6` alpha"
    ],
    "correct": 1,
    "explanation": "Course 04 content notes confirm CPython 3.14.4 execution testing with Python 3.10+ compatibility noted throughout."
  },
  {
    "id": "q_c4_m8_198",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "Check Capstone rubric **Correctness (25%)**: what extra edge conditions distinguish **4 Distinguished** (`All edge cases handled cleanly`) from basic **3 Competent**?",
    "options": [
      "Gracefully handling out-of-order timestamps, genuine IPv6 parsing (`ipaddress`), tight sliding-window time boundaries via `deque`, and formula-safe CSV handling without breaking base SSH detections",
      "Suppressing all alerts past 5 events forever",
      "Using `eval()` on Windows CSV `EventId` strings",
      "Skipping out-of-order entries into `skipped_lines`"
    ],
    "correct": 0,
    "explanation": "Chronological normalization, semantic IPv6 validation, bounded windows, and hostile-username safety separate Distinguished engineering from minimal happy-path scripts."
  },
  {
    "id": "q_c4_m8_199",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "medium",
    "q": "Which complete set of deliverables must learners turn in cleanly for Capstone `rkloga 2.0` (`C4.4`)?",
    "options": [
      "Raw third-party live internet packet captures",
      "Only one unannotated screenshot of CLI output",
      "Compiled `.exe` files without source code or tests",
      "Source code, deterministic tests (`>=20`), sample synthetic logs, `README.md`, `CHANGELOG.md`, and a `1–2` page analysis report interpreting findings on the provided samples"
    ],
    "correct": 3,
    "explanation": "Complete software engineering handoff combines verified code, regression tests, synthetic fixtures, docs, and clear operational analysis."
  },
  {
    "id": "q_c4_m8_200",
    "topic": "C04-M08-L06: Designing & Extending rkloga 2.0",
    "difficulty": "difficult",
    "q": "In grand synthesis across all 8 Modules of Course 04 (`Python for Cybersecurity`), why does transforming scripts cleanly into `rkloga 2.0` matter for Courses 06, 08, 09, 10, 12, and 20?",
    "options": [
      "Because every course after 04 only uses HTML templates",
      "Because Python scripts automatically replace enterprise firewalls and EDRs",
      "Understanding pure types/structures (M01), modular exceptions/venvs (M02), safe file/CSV/JSON/ReDoS-free regex (M03), injection-free OS/path automation (M04), socket/TLS networking (M05), streaming hashes/HMAC/UTC/IOCs (M06), tamper-evident FIM/suppression/sanitised alerts (M07), and tested fail-closed CLI engineering (M08) prepares you both to **build** trustworthy defenses and **audit** vulnerabilities everywhere",
      "Because Module 8 removes the need for error handling or input checks"
    ],
    "correct": 2,
    "explanation": "Course 04 bridges beginner syntax straight to reliable, testable, secure defensive software engineering used across SOC, DFIR, DevSecOps, and Detection-as-Code."
  }
];
