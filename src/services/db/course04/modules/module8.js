/**
 * Course 04: Python for Cybersecurity — Module 8 Data
 * Module ID: mod_c4_8 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module8Data = {
  "id": "mod_c4_8",
  "title": "Module 8: Engineering & Capstone",
  "description": "Engineer production-grade defensive utilities using automated unittest suites, honest operator documentation, fail-closed exit contracts (0/1/2), static analysis/packaging (Bandit, mypy, pyproject.toml), and the rkloga 2.0 log-analysis capstone.",
  "order": 8,
  "quiz": {
    "id": "quiz_mod_c4_8",
    "title": "Module 8: Engineering & Capstone Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
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
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m8_l1",
      "title": "Lesson 8.1: Security Tool Testing Principles & Threat Verification",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Establishes deterministic security testing across normal, edge, malformed-input, and failure paths, analyzing silent detection blindness (Lotus Logistics CS2) and catastrophic deployment regressions (Knight Capital CS1).",
      "learning_objectives": [
        "Design security test matrices covering normal inputs, edge phrases, malformed/oversized inputs, and missing-resource failure paths.",
        "Prove rule precision cleanly using paired known-bad (must trigger) and known-good (must NOT trigger) samples.",
        "Diagnose silent detector regressions (Lotus Logistics CS2) using skipped-line telemetry and regex regression tests.",
        "Evaluate catastrophic real-world operational lessons from the 2012 Knight Capital $460M SEC enforcement case (CS1)."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-01",
          "figure_number": "Figure 8.1",
          "lesson_id": "les_c4_m8_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l01_security_tool_test_pyramid.png",
          "title": "Security Tool Test Pyramid: Unit, Integration, and End-to-End Layers (C04-M08-F2)",
          "purpose": "Illustrate the balanced testing hierarchy combining many fast deterministic unit tests (parse_line, analyse) with targeted file integration tests and CLI end-to-end checks.",
          "accessibility_description": "Three-tier pyramid diagram placing many fast unit tests on the wide base, fewer read_events+analyse integration checks in the middle, and selective CLI process tests at the apex.",
          "walkthrough_section": "Diagram Walkthrough: Security Tool Test Pyramid"
        },
        {
          "figure_id": "fig-04-08-02",
          "figure_number": "Figure 8.2",
          "lesson_id": "les_c4_m8_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l01_known_good_vs_known_bad_test_matrix.png",
          "title": "Four-Quadrant Detection Verification: Known-Bad, Known-Good, Malformed, and Failure Paths",
          "purpose": "Contrast positive intrusion assertions against benign baseline negative assertions, hostile input bounds, and operational I/O failure verification.",
          "accessibility_description": "Four-quadrant matrix mapping Expected Positive Findings (True Positives), Benign Single Failures (Zero Alerts), Hostile Overlong Strings (Safe Rejection), and Missing Files (Exit Code 2).",
          "walkthrough_section": "Diagram Walkthrough: Positive vs. Negative Detection Matrix"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-01",
          "title": "Figure 8.1: Security Tool Test Pyramid: Speed vs. Integration Scope",
          "url": "/assets/courses/cyber-04/c04_m8_l01_security_tool_test_pyramid.png",
          "caption": "Figure 8.1 (C04-M08-F2): Balanced three-tier testing pyramid pairing a broad base of fast pure unit tests (parse_line & analyse in < 5 ms) with targeted file integration checks and selective CLI end-to-end exit contract tests.",
          "alt": "Three-tier testing pyramid showing Unit Tests (Many & Fast: parse_line() & analyse() < 5 ms) at the wide base, Integration Tests (Targeted: read_events() + analyse()) in the middle, and CLI End-to-End (Selective: main(argv) -> Exit 0 / 1 / 2) at the apex."
        },
        {
          "id": "fig-04-08-02",
          "title": "Figure 8.2: Four-Quadrant Detection Verification Matrix",
          "url": "/assets/courses/cyber-04/c04_m8_l01_known_good_vs_known_bad_test_matrix.png",
          "caption": "Figure 8.2: 2x2 verification matrix balancing Known-Bad (Positive -> exit 1), Known-Good (Negative -> exit 0), Hostile / Malformed (5,000-char / bob; rm -rf -> Returns None Safely), and Operational Failure (Missing File -> Clean Error exit 2).",
          "alt": "Four-quadrant test matrix covering Known-Bad Positive (Spray + Success Log -> Alerts Fire exit 1), Known-Good Negative (Single Benign Failure -> 0 False Alerts exit 0), Hostile / Malformed (5,000-char / bob; rm -rf -> Returns None Safely), and Operational Failure (Missing File / Bad Args -> Clean Error exit 2)."
        }
      ],
      "content": "## 1. Why \"It Runs Once on My Laptop\" Fails Security Operations\n\nSecurity tools are trusted to report ground truth during live incidents. If an unverified edit quietly breaks a regular expression inside a log parser, the tool keeps running smoothly, exits cleanly, and writes **\"no findings\"** directly onto a compliance dashboard—masking real compromises for weeks. Worse, deploying dead or unreviewed code paths into automated response tooling can trigger catastrophic financial and operational outages.\n\nSoftware engineering turns one-off scripts into dependable defensive utilities used across enterprise security teams, DevSecOps pipelines (`Course 12`), and Detection-as-Code repositories (`Course 20`).\n\n## 2. Core Case Studies: The Price of Untested Code\n\n- **Knight Capital (`Case Study C04-M08-CS1`):** On **1 August 2012**, Knight Capital's automated market router malfunctioned during the first **45 minutes** after market open—sending over **4 million** unintended orders while attempting to fill 212 customer orders, trading more than **397 million** shares, and infamously wiping out over **\\$460 million** in firm capital. Per the US SEC enforcement release, code moved in **2005** had left behind a defective unused function; an incomplete late-July **2012** deployment activated that orphaned flag on one server while **97 internal warning emails** before market open went unheeded, ending in a **\\$12 million** regulatory penalty.\n- **Lotus Logistics (`Case Study C04-M08-CS2`, Fictional):** In this teaching scenario, a SOC team refactored a log-parser regex (\"tidying it up\"), confirmed the script exited without crashing, and unknowingly shipped a pattern that matched zero real log entries—printing `\"no findings\"` cleanly for two straight weeks.\n\n> [!CAUTION]\n> **Execution Does Not Equal Detection (`Scenario S1`):** Running `python scanner.py` cleanly proves only Python syntax validity. Every change to parsing or correlation rules requires testing against both **known-bad samples** (confirming expected alerts actually trigger) and **known-good samples** (confirming benign noise triggers nothing).\n\n## 3. What Every Security Utility Must Test\n\nDesign automated verification matrices spanning four mandatory quadrants rather than testing only the cheerful \"happy path\":\n\n- **Normal Valid Cases:** Standard authentication failure and accepted logon formats parse cleanly into structured event records.\n- **Boundary & Edge Phrases:** Multi-word protocol phrasing (`Failed password for invalid user admin`), timestamp ordering, and exact threshold boundaries (`threshold - 1` vs. `threshold`).\n- **Hostile & Malformed Input:** Unrecognized text lines, memory-exhausting 5,000-character log lines (`MAX_LINE = 2048`), and shell-metacharacter injection usernames (`bob; rm -rf /`).\n- **Operational Failure Paths:** Missing input files (`no_such_file.log`), unreadable permissions, and invalid CLI parameter combinations (`--spray-users 1`) returning explicit error exit code `2`.\n\n```python\n# Core deterministic testing invariants for security suites:\n# 1. Zero live network dependencies (offline synthetic inputs)\n# 2. Fixed UTC timestamps (repeatable window arithmetic)\n# 3. Temporary files purged reliably inside try / finally blocks\n```\n\n## 4. Verifying Regex Refactors Safely (`Scenario S1`)\n\nWhen a teammate edits a core regex and says *\"it still runs fine\"*, execute this five-step validation gate before merging:\n\n1. Run the existing automated unit suite cleanly (`python -m unittest -v`).\n2. Add new explicit positive and negative test cases covering every intended log variation.\n3. Evaluate known-bad captures verifying real detections fire at the exact expected timestamps.\n4. Compare `skipped_lines` counts before and after across sanitized production logs so unexpected format drops appear immediately.\n5. Roll out through staging/code review before touching production pipelines.\n\n## 5. Diagram Walkthrough: Security Tool Test Pyramid\n\n![Security Tool Test Pyramid: Speed vs. Integration Scope](/assets/courses/cyber-04/c04_m8_l01_security_tool_test_pyramid.png)\n*Security Tool Test Pyramid: Speed vs. Integration Scope.*\n\n**Figure 8.1** (`fig-04-08-01`) depicts `C04-M08-F2` as a three-tier verification pyramid:\n- **Wide Base (`Unit Tests (Many & Fast)`):** Exercises pure `parse_line() & analyse() (< 5 ms)` directly in memory with zero I/O latency (`Faster Speed & Higher Volume`).\n- **Middle & Apex (`Integration Tests` -> `CLI End-to-End`):** Layers targeted `read_events() + analyse()` file workflows beneath selective `main(argv) -> Exit 0 / 1 / 2` tests (`Wider System Scope`).\n\n## 6. Diagram Walkthrough: Positive vs. Negative Detection Matrix\n\n![Four-Quadrant Detection Verification Matrix](/assets/courses/cyber-04/c04_m8_l01_known_good_vs_known_bad_test_matrix.png)\n*Four-Quadrant Detection Verification Matrix.*\n\n**Figure 8.2** (`fig-04-08-02`) organizes regression verification across four mandatory quadrants:\n- **Positive vs. Negative (`Known-Bad` & `Known-Good`):** Verifies attack traces (`Spray + Success Log`) trigger `Alerts Fire! (exit 1)` while a `Single Benign Failure` keeps `0 False Alerts (exit 0)`.\n- **Adversarial & I/O Resilience (`Hostile / Malformed` & `Operational Failure`):** Ensures `5,000-char / bob; rm -rf` inputs resolve to `Returns None Safely` while missing logs or bad flags fail closed cleanly (`Clean Error (exit 2)`)."
    },
    {
      "id": "les_c4_m8_l2",
      "title": "Lesson 8.2: Automated Testing With unittest & Pure Function Design",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Constructs deterministic standard-library unittest suites across rkloga's ParseTests, AnalyseTests, and CliTests while showing why testable pure functions and main(argv) replace brittle scripts.",
      "learning_objectives": [
        "Structure unittest.TestCase subclasses cleanly using assertEqual, assertIsNone, and teardown-safe temporary files.",
        "Decouple CLI logic cleanly by passing argv lists into main(argv) so unit tests exercise CLI exits without slow subprocess spawning.",
        "Interpret unittest -v diagnostic output accurately (distinguishing deliberate negative-path ERROR log messages from test failures).",
        "Extend deterministic suites with parametrized subTest cases, out-of-order timestamps, IPv6 inputs, and pytest execution."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-03",
          "figure_number": "Figure 8.3",
          "lesson_id": "les_c4_m8_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l02_unittest_testcase_anatomy.png",
          "title": "rkloga unittest Architecture Across ParseTests, AnalyseTests, and CliTests",
          "purpose": "Map each of test_rkloga.py's 10 standard-library test cases directly onto rkloga.py's pure functions and CLI entry point.",
          "accessibility_description": "Architectural mapping linking ParseTests (4 methods) -> parse_line, AnalyseTests (3 methods) -> analyse, and CliTests (3 methods) -> main(argv).",
          "walkthrough_section": "Diagram Walkthrough: Mapping test_rkloga.py Classes"
        },
        {
          "figure_id": "fig-04-08-04",
          "figure_number": "Figure 8.4",
          "lesson_id": "les_c4_m8_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l02_isolated_fixtures_and_subtest.png",
          "title": "Deterministic Temp-File Fixtures and Parametrized subTest Isolation",
          "purpose": "Demonstrate how NamedTemporaryFile + try/finally unlink cleanly prevents state leakage between CLI tests while subTest isolates per-case failures.",
          "accessibility_description": "Execution timeline diagram showing isolated fixture creation, argv injection into main(), exit code verification, and deterministic finally-block cleanup.",
          "walkthrough_section": "Diagram Walkthrough: Isolated Fixtures & Cleanup"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-03",
          "title": "Mapping unittest Classes to Pure Security Utility Functions",
          "url": "/assets/courses/cyber-04/c04_m8_l02_unittest_testcase_anatomy.png",
          "caption": "Figure 8.3: Mapping test_rkloga.py classes (ParseTests, AnalyseTests, CliTests) to pure parsing, correlation, and CLI boundary functions in rkloga.py for 5 ms in-memory verification.",
          "alt": "Diagram aligning three unittest classes in test_rkloga.py — ParseTests (4 Tests), AnalyseTests (3 Tests), and CliTests (3 Tests) — with parse_line(text), analyse(events), and main(argv) in rkloga.py, noting all 10 tests run in-memory in 5 ms without subprocess overhead."
        },
        {
          "id": "fig-04-08-04",
          "title": "Deterministic Temp Fixtures & Parametrized subTest Isolation",
          "url": "/assets/courses/cyber-04/c04_m8_l02_isolated_fixtures_and_subtest.png",
          "caption": "Figure 8.4: Temp-file fixture lifecycle (write_temp, explicit handle close, main([path]) assertion, finally unlink) paired with self.subTest() isolation across multiple payload vectors.",
          "alt": "Two-panel diagram comparing a four-step temp-file fixture lifecycle in a try-finally block (write UTF-8 temp file, close handle first to avoid Windows locks, run main([path]) checking exit codes 1 or 2, unlink in finally) alongside a parametrized self.subTest() loop isolating one failing payload among passing cases."
        }
      ],
      "content": "## 1. Writing Deterministic Tests With Standard-Library `unittest`\n\nThird-party frameworks such as `pytest` offer concise fixtures and parameterized assertions, yet every standard CPython installation already ships with **`unittest`**—zero external dependencies, zero lockfile risk, and `pytest` executes `unittest.TestCase` classes seamlessly out of the box too.\n\nStudying the reference suite in `test_rkloga.py` shows how structuring your tool around pure functions and parameterized entry points makes comprehensive testing effortless.\n\n## 2. Core Design Rule: Testable Functions & `main(argv)`\n\nNotice how `rkloga.py` avoids binding command-line parsing globally to `sys.argv`:\n\n```python\ndef main(argv: list[str] | None = None) -> int:\n    p = argparse.ArgumentParser(description=\"Summarise SSH auth logs and flag spraying.\")\n    p.add_argument(\"logfile\", type=Path)\n    ...\n    args = p.parse_args(argv)\n```\n\nAccepting optional `argv: list[str] | None = None` lets test methods invoke CLI edge cases directly in Python memory—`rkloga.main([str(p), \"--spray-users\", \"1\"])`—without spawning slow external OS subprocesses for every case! Meanwhile, keeping `parse_line()` and `analyse()` pure (no file I/O, no `print()`, deterministic inputs to outputs) splits verification cleanly into `ParseTests`, `AnalyseTests`, and `CliTests`.\n\n## 3. Execution-Tested Suite (`test_rkloga.py`)\n\nExamine representative excerpts across all three test classes in `test_rkloga.py`:\n\n```python\nclass ParseTests(unittest.TestCase):\n    def test_garbage_and_oversized_lines_rejected(self):\n        self.assertIsNone(rkloga.parse_line(\"hello world\"))\n        self.assertIsNone(rkloga.parse_line(\"x\" * 5000))\n\n    def test_suspicious_user_text_rejected(self):\n        self.assertIsNone(rkloga.parse_line(F.format(3, \"bob; rm -rf /\")))\n\nclass CliTests(unittest.TestCase):\n    def test_missing_file_returns_2(self):\n        self.assertEqual(rkloga.main([\"no_such_file.log\"]), 2)\n```\n\nExecuting Python's standard test runner locally inside the `rkloga/` workspace confirms every assertion passes in **5 milliseconds**:\n\n```terminal\ntest_no_findings_for_single_failure (test_rkloga.AnalyseTests.test_no_findings_for_single_failure) ... ok\ntest_spray_detected_once (test_rkloga.AnalyseTests.test_spray_detected_once) ... ok\ntest_success_after_failure (test_rkloga.AnalyseTests.test_success_after_failure) ... ok\ntest_bad_arguments_return_2 (test_rkloga.CliTests.test_bad_arguments_return_2) ... ERROR window-min must be 1-1440 and spray-users 2-1000\nok\ntest_findings_return_1 (test_rkloga.CliTests.test_findings_return_1) ... ok\ntest_missing_file_returns_2 (test_rkloga.CliTests.test_missing_file_returns_2) ... ERROR file not found: no_such_file.log\nok\ntest_garbage_and_oversized_lines_rejected (test_rkloga.ParseTests.test_garbage_and_oversized_lines_rejected) ... ok\ntest_invalid_user_phrase (test_rkloga.ParseTests.test_invalid_user_phrase) ... ok\ntest_suspicious_user_text_rejected (test_rkloga.ParseTests.test_suspicious_user_text_rejected) ... ok\ntest_valid_failed_line (test_rkloga.ParseTests.test_valid_failed_line) ... ok\n\n----------------------------------------------------------------------\nRan 10 tests in 0.005s\n\nOK\n```\n\n> [!TIP]\n> Look closely at lines printed during `test_bad_arguments_return_2` and `test_missing_file_returns_2`: the text `ERROR file not found: no_such_file.log` is **rkloga's own deliberate diagnostic output** verifying error-path behavior—not a failing test (`ok` still follows immediately).\n\n## 4. Breaking Tests on Purpose & Scaling With `subTest` (`Practical P1`)\n\nIn **Practical C04-M08-P1**, deliberately mutate `\"Failed|Accepted\"` inside `LINE_RX` into `\"Failed\"`, then re-run `python -m unittest -v`. Instantly, both `test_success_after_failure` and `CliTests.test_findings_return_1` fail—proving hands-on how regression suites trap silent logic breaks in seconds rather than weeks!\n\nWhen extending `test_rkloga.py` cleanly toward the **rkloga 2.0 capstone** (requiring `>= 20` unit tests covering IPv6 logs, out-of-order timestamps, sliding boundaries, and Windows CSV parsing):\n\n- **Isolated Temporary Files (`try ... finally`):** Use `write_temp()` helpers pairing `tempfile.NamedTemporaryFile(..., delete=False)` with guaranteed `p.unlink()` cleanup in `finally:` blocks—essential on Windows where an open file descriptor locks deletion until closed cleanly.\n- **Parametrized `with self.subTest(...)`:** Test multiple malicious usernames (`=cmd`, `../../etc`, `x*5000`, `alice; id`) inside a clean loop so a single failure pinpoints exact failing data parameters without masking subsequent vectors.\n\n## 5. Diagram Walkthrough: Mapping `test_rkloga.py` Classes\n\n![Mapping unittest Classes to Pure Security Utility Functions](/assets/courses/cyber-04/c04_m8_l02_unittest_testcase_anatomy.png)\n*Figure 8.3: Mapping `test_rkloga.py` test classes to pure parsing, correlation, and CLI boundary functions in `rkloga.py`.*\n\n- **Architecture-to-suite alignment:** **Figure 8.3** aligns the left-hand `test_rkloga.py` test classes directly against the pure functions in `rkloga.py`: `ParseTests` (`4 Tests`) exercises `parse_line(text)` (`Regex + Bounds | No I/O`), `AnalyseTests` (`3 Tests`) exercises `analyse(events)` (`Spray & Post-Fail Rules | No I/O`), and `CliTests` (`3 Tests`) exercises `main(argv)` (`File I/O + Exit 0 / 1 / 2`).\n- **In-memory execution speed:** Keeping parsing and temporal analysis free of file or socket side effects allows all 10 `unittest` checks to execute in-memory via `argv=[...]` in `5 ms` with zero slow subprocess invocations.\n\n## 6. Diagram Walkthrough: Isolated Fixtures & Cleanup\n\n![Deterministic Temp Fixtures & Parametrized subTest Isolation](/assets/courses/cyber-04/c04_m8_l02_isolated_fixtures_and_subtest.png)\n*Figure 8.4: Four-step `try ... finally` temp-file fixture lifecycle paired with `self.subTest()` vector isolation.*\n\n- **Cross-platform fixture hygiene (left panel):** `CliTests` runs four deterministic steps: (1) write UTF-8 fixture data in `write_temp()`, (2) close the file handle first to prevent Windows file-lock errors, (3) call `main([path])` directly to verify exit code `1` or `2`, and (4) unlink the scratch path inside `finally:` so zero leftover files remain even on failed assertions.\n- **Parametrized failure isolation (right panel):** Wrapping `for bad_user in payloads:` with `with self.subTest():` executes every malicious input (`[=cmd]`, `[x * 5000]`, `[alice; id]`) independently, pinpointing `[x * 5000]` as `FAIL` while still reporting `[=cmd]` and `[alice; id]` as `PASS`."
    },
    {
      "id": "les_c4_m8_l3",
      "title": "Lesson 8.3: Security Tool Documentation & Honest Limitations",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Builds trustworthy operator documentation combining module/function docstrings, argparse help contracts, SOC README guides, CHANGELOG tracking, and explicit limitation disclosures.",
      "learning_objectives": [
        "Author informative module and function docstrings documenting purpose, inputs, return contracts, raised errors, and exit codes.",
        "Configure self-documenting argparse CLI flags and verify exact --help output contracts.",
        "Write clear README and CHANGELOG files tailored for incident responders and SOC operators (Scenario S3).",
        "Document technical limitations transparently (supported regex formats, skipped-line accounting, unbounded memory before deque, IPv6 pattern scope)."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-05",
          "figure_number": "Figure 8.5",
          "lesson_id": "les_c4_m8_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l03_tool_documentation_ecosystem.png",
          "title": "Layered Tool Documentation: Docstrings, --help, README, and CHANGELOG",
          "purpose": "Show how four complementary documentation artifacts serve developers, automation wrappers, SOC analysts, and incident change reviewers.",
          "accessibility_description": "Four-layer documentation chart mapping Source Docstrings (maintainers), argparse --help (CLI operators), README.md (SOC runbooks), and CHANGELOG.md (detection versioning).",
          "walkthrough_section": "Diagram Walkthrough: Operator Documentation Layers"
        },
        {
          "figure_id": "fig-04-08-06",
          "figure_number": "Figure 8.6",
          "lesson_id": "les_c4_m8_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l03_documenting_scope_and_limitations.png",
          "title": "Transparent Scope Boundaries: What rkloga Detects vs. Known Limitations",
          "purpose": "Contrast supported OpenSSH timestamps/detections against explicit limitations documented for safe SOC deployment and capstone hardening.",
          "accessibility_description": "Comparison diagram separating Verified Scope (ISO UTC OpenSSH lines, spray, success-after-failure) from Documented Limits (non-SSH syslog skipped, unbounded list before deque, permissive IPv6 pattern).",
          "walkthrough_section": "Diagram Walkthrough: Scope & Limitation Transparency"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-05",
          "title": "Five Layers of Python Security Tool Documentation",
          "url": "/assets/courses/cyber-04/c04_m8_l03_tool_documentation_ecosystem.png",
          "caption": "Figure 8.5: Five documentation layers spanning Code Level (Module & Function Docstrings), CLI Runtime (argparse --help), and Team & Audit Level (README.md & CHANGELOG.md).",
          "alt": "Five stacked horizontal pastel layer bars grouped by right-hand brackets into Code Level (Module Docstring for Maintainers & Auditors, Function Docstrings for Developers & Tests), CLI Runtime (argparse --help for CLI Operators), and Team & Audit Level (README.md for SOC Teams, CHANGELOG.md for Release Reviewers)."
        },
        {
          "id": "fig-04-08-06",
          "title": "Transparent Scope Boundaries: Supported Detection vs. Known Limits",
          "url": "/assets/courses/cyber-04/c04_m8_l03_documenting_scope_and_limitations.png",
          "caption": "Figure 8.6: Side-by-side boundary contract contrasting verified rkloga v1 capabilities with four documented limitations queued for rkloga 2.0.",
          "alt": "Two-panel comparison pairing Verified Scope (rkloga v1) — OpenSSH ISO UTC, Password Spray, Success After Fail, and Skipped Counter — against Honest Limits (Queued for v2.0) — BSD/EVTX Untested, Unbounded IP Lists needing deque eviction, Anytime SAF Match needing --saf-minutes cap, and Permissive IP Regex needing ipaddress validation."
        }
      ],
      "content": "## 1. Documentation Is Half of Defensive Reliability\n\nImagine an overworked SOC analyst pulling your script from an internal wiki at 02:00 AM during a live intrusion triage. If there is no module usage banner, `--help` prints cryptic internal variable names, `CHANGELOG.md` hides what thresholds changed last month, and nobody documented which log formats the script silently skips, responders will misinterpret `\"events=0\"` as system safety when the tool simply ignored syslog formatting!\n\nIn security engineering, honest documentation is part of the control boundary (`Scenario S3`).\n\n## 2. The Five Documentation Layers\n\nEvery shared Python security utility balances five distinct, non-redundant documentation layers:\n\n| Artifact Layer | Primary Audience | Required Content & Security Value |\n| :--- | :--- | :--- |\n| **Module Docstring** | Maintainers / Auditors | One-line purpose, exact CLI syntax (`python rkloga.py ...`), and authoritative exit codes (`0`, `1`, `2`) |\n| **Function Docstrings** | Developers / Test Writers | Contract behavior, typed parameters, `None`/empty return edge behavior, raised exceptions |\n| **`argparse --help`** | Live CLI Operators | Auto-generated flag specs (`--window-min`, `--spray-users`, `--json`), defaults, and positional args |\n| **`README.md`** | SOC Team / New Engineers | Installation (`venv`, zero deps), realistic usage runs, supported formats, **honest limitations**, security notes |\n| **`CHANGELOG.md`** | Release Reviewers / SIEMs | Versioned behavior shifts (threshold updates, regex additions, exit code changes) crucial when comparing historic alerts |\n\nInspect how `rkloga.py` implements module-level and `--help` contracts right out of the box:\n\n```python\n\"\"\"rkloga - RedKross log analyser (Course 04 Module 8 reference utility).\n\nParses OpenSSH-style authentication log lines, summarises failures and\nsuccesses, and flags password spraying and success-after-failure.\n\nUsage:\n    python rkloga.py LOGFILE [--window-min N] [--spray-users N] [--json]\n\nExit codes: 0 no findings, 1 findings, 2 usage/input error.\nTested: CPython 3.14.4, Windows 11, 2026-11-07.\n\"\"\"\n```\n\nRunning `python rkloga.py --help` produces machine-consistent guidance directly from `argparse`:\n\n```terminal\nusage: rkloga.py [-h] [--window-min WINDOW_MIN] [--spray-users SPRAY_USERS] [--json] logfile\n```\n\n## 3. Documenting Honest Limitations (`Scenario C04-M08-S3`)\n\nNever market a small tool as universal threat detection. Explicitly call out four architectural boundaries documented across `rkloga.py` and **Practical C04-M08-P2**:\n\n1. **Strict Line Grammar Coverage:** `LINE_RX` parses solely ISO-8601 UTC (`...Z sshd[PID]: Failed|Accepted ...`) OpenSSH patterns; traditional BSD syslog month-day headers (`Nov  7 ...`), Apache logs, or Windows EVTX exports fall cleanly into **`skipped_lines`** rather than crashing—making skipped-line growth an operational format-drift indicator.\n2. **Per-IP List Memory Before `deque`:** Base `rkloga.py` retains all historical failed `Event` objects in `failures[e.ip]` per run, using list comprehensions on each failure. On millions of rows, unbounded lists waste RAM—calling explicitly for `collections.deque` eviction in Capstone rkloga 2.0 (`Practical P2`).\n3. **Unbounded Success-After-Failure Span:** In the base reference tool, `elif failures.get(e.ip):` matches any `Accepted` event from an IP that previously failed *at any point inside the log file*, lacking a `--saf-minutes` recency cutoff.\n4. **Permissive Text IP Regex Prior to `ipaddress`:** `(?P<ip>[0-9a-fA-F:.]{2,45})` permits fast pre-filtering yet can accept malformed octets (`999.999.999.999`) unless paired with `ipaddress.ip_address()` semantic validation (`Practical P2`).\n\n> [!IMPORTANT]\n> **SOC One-Pager Checklist (`Scenario S3`):** When summarizing a security CLI for management or SOC teammates, always include: tool purpose, exact supported input formats, rules & defaults (`--window-min 5`, `--spray-users 3`), copyable command examples, exit-code actions (`0/1/2`), JSON/text schemas, explicit limitations, operational scheduling/monitoring of `exit 2`, and tool ownership/changelog history.\n\n## 4. Diagram Walkthrough: Operator Documentation Layers\n\n![Five Layers of Python Security Tool Documentation](/assets/courses/cyber-04/c04_m8_l03_tool_documentation_ecosystem.png)\n*Figure 8.5: Five complementary documentation layers organized across Code Level, CLI Runtime, and Team & Audit Level.*\n\n- **Audience-specific layering:** **Figure 8.5** separates responsibilities cleanly so no single artifact becomes cluttered: **Code Level** covers `Module Docstring` (`Purpose, CLI Usage & Exit 0/1/2` for maintainers and auditors) and `Function Docstrings` (`Types, None Edges & Exceptions` for developers and test writers).\n- **Runtime and operational handoff:** **CLI Runtime** relies on live `argparse --help` (`Live Flags, Defaults & Args`), while **Team & Audit Level** pairs `README.md` (`Setup, Real Runs & Honest Limits` for SOC teams) with `CHANGELOG.md` (`Rule, Regex & Exit Changes` for release reviewers).\n\n## 5. Diagram Walkthrough: Scope & Limitation Transparency\n\n![Transparent Scope Boundaries: Supported Detection vs. Known Limits](/assets/courses/cyber-04/c04_m8_l03_documenting_scope_and_limitations.png)\n*Figure 8.6: Verified `rkloga` v1 capabilities contrasted directly against documented architectural boundaries queued for `rkloga 2.0`.*\n\n- **Four paired capability-to-limit boundaries:** The green left panel confirms **Verified Scope (`rkloga` v1)** (`OpenSSH ISO UTC`, `Password Spray`, `Success After Fail`, and `Skipped Counter`), while dotted alignment lines connect each row to its **Honest Limits (`Queued for v2.0`)** counterpart on the right (`BSD / EVTX Untested`, `Unbounded IP Lists` needing `collections.deque` eviction, `Anytime SAF Match` needing a `--saf-minutes` cap, and `Permissive IP Regex` needing `ipaddress` validation).\n- **Visible failure accounting:** As highlighted in the bottom rule banner, unsupported log formats increment `skipped_lines` visibly rather than failing or dropping lines silently."
    },
    {
      "id": "les_c4_m8_l4",
      "title": "Lesson 8.4: Secure Error Handling, Fail-Closed Contracts & Exit Codes",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Prevents information disclosure and silent failures by replacing raw tracebacks with specific exception catching, secret-redacted logging, early bounds checks, and strict 0/1/2 exit codes.",
      "learning_objectives": [
        "Catch specific operational exceptions (FileNotFoundError, PermissionError, OSError) and report clean diagnostics instead of exposing raw stack traces.",
        "Prevent credential leakage inside error objects and URLs per the OWASP Logging Cheat Sheet (Scenario S2).",
        "Enforce fail-closed engineering so incomplete checks, invalid CLI arguments, or unreadable logs return explicit error status 2 rather than 'no findings' (0).",
        "Bound untrusted input memory and encoding faults safely via MAX_LINE caps and UTF-8 errors='replace' decoding."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-07",
          "figure_number": "Figure 8.7",
          "lesson_id": "les_c4_m8_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l04_exit_code_contract_fail_closed.png",
          "title": "Fail-Closed Exit Code Contract: Separating Clean (0), Findings (1), and Error (2) (C04-M08-F3)",
          "purpose": "Visualize how downstream schedulers and CI pipelines route rkloga return codes 0, 1, and 2 distinctly without confusing runtime failures for clean logs.",
          "accessibility_description": "Decision table flow routing exit 0 to Scheduler OK, exit 1 to Raise Incident Alert/Ticket, and exit 2 to Page Operator Fail-Closed Error.",
          "walkthrough_section": "Diagram Walkthrough: Fail-Closed Exit Code Contract"
        },
        {
          "figure_id": "fig-04-08-08",
          "figure_number": "Figure 8.8",
          "lesson_id": "les_c4_m8_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l04_traceback_suppression_secret_redaction.png",
          "title": "User-Safe Diagnostics vs. Traceback and API Token Leakage",
          "purpose": "Compare raw exception propagation leaking file layouts and query tokens against specific catch blocks emitting sanitized errors to stderr.",
          "accessibility_description": "Split flow contrasting Unsafe Raw Traceback (exposes filesystem paths, libraries, and access_token=...) against Hardened Try/Except (emits clean host/status error without secrets).",
          "walkthrough_section": "Diagram Walkthrough: Eliminating Error-Path Leaks"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-07",
          "title": "Fail-Closed Exit Code Contract for Security Automation",
          "url": "/assets/courses/cyber-04/c04_m8_l04_exit_code_contract_fail_closed.png",
          "caption": "Figure 8.7: Deterministic 0/1/2 exit code routing separating clean runs (0), security findings (1), and fail-closed operational errors (2).",
          "alt": "Three-branch exit routing diagram from Security CLI Run (main(argv)) into exit 0 — Clean Run (Logs parsed, 0 matches -> Record OK (No Alert)), exit 1 — Findings Detected (Spray or post-fail match -> Open Incident / Ticket), and exit 2 — Error (Fail Closed) (Missing file, bad args, OSError -> Page Ops! Never Assume Clean)."
        },
        {
          "id": "fig-04-08-08",
          "title": "Safe Error Diagnostics vs. Traceback & Token Leakage",
          "url": "/assets/courses/cyber-04/c04_m8_l04_traceback_suppression_secret_redaction.png",
          "caption": "Figure 8.8: Unhandled exception tracebacks leaking file layouts and query secrets contrasted against targeted catches emitting clean redacted stderr errors.",
          "alt": "Two-track comparison diagram contrasting Unsafe: Unhandled Exception & Query Secret (Token in URL + Fault -> Raw Traceback Printed -> SIEM / CI Secret Leak!) against Safe: Targeted Catch & Header Auth (Catch Specific Error -> Emit Sanitized Log -> Clean stderr + Exit 2), enforced via assertNotIn(secret, logs) and MAX_LINE = 2048 bounds."
        }
      ],
      "content": "## 1. Treating Error Paths as Attack Surfaces\n\nErrors are output, and **output can leak** (`Scenario S2`). Too many beginner Python scripts let uncaught exceptions print full Python tracebacks straight to terminal users or web responses—disclosing server directory layouts, third-party package versions, internal hostnames, or worse, literal API URLs packed with plaintext `?access_token=...` credentials.\n\nConversely, careless `except Exception:` blocks that print `pass` or exit `0` create equally dangerous **fail-open** security illusions where unreadable audit logs look identical to clean zero-finding audits.\n\n## 2. Fail-Closed Exception Handling & Clean User Diagnostics\n\nExamine how `main(argv)` inside `rkloga.py` isolates specific I/O failures instead of crashing with raw stack traces or catching `BaseException` blindly:\n\n```python\n    try:\n        events, skipped = read_events(args.logfile)\n    except FileNotFoundError:\n        log.error(\"file not found: %s\", args.logfile)\n        return 2\n    except PermissionError:\n        log.error(\"permission denied: %s\", args.logfile)\n        return 2\n    except OSError as exc:                       # other I/O problems, no traceback\n        log.error(\"cannot read %s: %s\", args.logfile, exc.strerror)\n        return 2\n```\n\nVerify both tested CLI behaviors captured directly against CPython:\n\n```terminal\npython rkloga.py sample_auth.log  -> findings printed, exit=1\npython rkloga.py nofile.log       -> \"ERROR file not found: nofile.log\", exit=2\n```\n\n- **Specific Exceptions Only:** Catching `FileNotFoundError`, `PermissionError`, and `OSError` handles expected I/O failure classes precisely without swallowing unexpected programming bugs (`NameError`, `TypeError`) during testing.\n- **Bound Input & Encoding Faults:** `read_events()` passes `encoding=\"utf-8\", errors=\"replace\"` and `parse_line()` rejects strings exceeding `MAX_LINE = 2048` immediately before touching `LINE_RX.match()`—preventing single stray non-UTF-8 bytes or multi-megabyte log bombs from crashing or choking incident triage.\n- **Early Argument Validation:** `if not (1 <= args.window_min <= 1440 and 2 <= args.spray_users <= 1000):` fails cleanly with exit `2` *before* touching filesystem paths.\n\n## 3. Never Leak Credentials in Logs (`Scenario S2` & OWASP)\n\nPer the **OWASP Logging Cheat Sheet**, sensitive credentials must never enter error messages or log streams:\n\n> [!WARNING]\n> **API Token Exception Leak (`Scenario S2`):** If `requests.get(f\"https://api.example/v1/feed?access_token={tok}\")` fails and code prints raw exception strings (`print(exc)`), the HTTP client exception typically embeds the complete URL—exposing `tok` cleanly in CI logs and SIEM archives! Always:\n> - Pass tokens inside `Authorization: Bearer ...` HTTP headers rather than URL query strings.\n> - Catch request exceptions cleanly, redacting URL queries/secrets and logging solely safe `host` + `status_code`.\n> - Immediately rotate any token that ever printed into logs.\n> - Write an automated unit test asserting sensitive test tokens never appear in captured logs (`assertNotIn`).\n\n## 4. The `0` / `1` / `2` Fail-Closed Exit Contract\n\nLook at line 122 of `rkloga.py`: `return 1 if result[\"findings\"] else 0`. Every automated security CLI must separate three distinct machine signals clearly (`C04-M08-F3`):\n\n- **`exit 0` (`No Findings`):** Input logs opened, parsed completely, and produced zero alerts—automated scheduler records **OK**.\n- **`exit 1` (`Findings Detected`):** Input logs analysed cleanly AND detections matched—scheduler triggers **alert / ticket creation**.\n- **`exit 2` (`Error / Fail Closed`):** Invalid arguments, missing file, permission denied, or malformed JSON rules—scheduler **pages operations**, never assuming clean endpoints!\n\n## 5. Diagram Walkthrough: Fail-Closed Exit Code Contract\n\n![Fail-Closed Exit Code Contract for Security Automation](/assets/courses/cyber-04/c04_m8_l04_exit_code_contract_fail_closed.png)\n*Figure 8.7: Fail-closed `0` / `1` / `2` CLI exit contract routing scheduler workflows cleanly.*\n\n- **Three non-overlapping scheduler paths:** Starting from **Security CLI Run** (`main(argv)`), `exit 0 — Clean Run` confirms logs parsed with zero matches (`Record OK (No Alert)`), `exit 1 — Findings Detected` signals a spray or post-fail match (`Open Incident / Ticket`), and `exit 2 — Error (Fail Closed)` flags missing files, bad arguments, or `OSError` (`Page Ops! Never Assume Clean`).\n- **Fail-closed safety invariant:** As emphasized along the bottom rule banner, runtime errors must always return exit `2`—never silent exit `0`—so broken log collection never looks like a healthy host.\n\n## 6. Diagram Walkthrough: Eliminating Error-Path Leaks\n\n![Safe Error Diagnostics vs. Traceback & Token Leakage](/assets/courses/cyber-04/c04_m8_l04_traceback_suppression_secret_redaction.png)\n*Figure 8.8: Unsafe query-token tracebacks contrasted with targeted exception catching and sanitized `stderr` logging.*\n\n- **Unsafe traceback leakage (top track):** Passing `?access_token=sk_live...` directly in URLs and letting unhandled faults print raw stack traces spills server paths, libraries, and plaintext API credentials straight into SIEM or CI logs.\n- **Hardened diagnostic boundary (bottom track):** Authenticating via `Authorization: Bearer` headers, catching specific `OSError` failures, logging solely redacted `host + status` context, returning clean `stderr` + exit `2`, and enforcing `assertNotIn(secret, logs)` with `MAX_LINE = 2048` prevents secret disclosure cleanly."
    },
    {
      "id": "les_c4_m8_l5",
      "title": "Lesson 8.5: Static Analysis, Type Checking & Python Packaging",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Adopts professional Python engineering hygiene using automated linters (Ruff/Flake8), static type checkers (mypy), security SAST scanners (Bandit/Semgrep), dependency auditing (pip-audit), and pyproject.toml packaging.",
      "learning_objectives": [
        "Distinguish code-style linters/formatters (Ruff, Flake8, Black) from static type checkers (mypy) and security SAST scanners (Bandit, Semgrep).",
        "Integrate supply-chain dependency vulnerability auditing (pip-audit) into Git pull-request and CI verification gates.",
        "Configure modern PEP 621 pyproject.toml metadata cleanly including console entry points ([project.scripts]).",
        "Evaluate how continuous integration combines static checks with automated unit tests before code ever reaches SOC endpoints."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-09",
          "figure_number": "Figure 8.9",
          "lesson_id": "les_c4_m8_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l05_ci_static_analysis_pipeline.png",
          "title": "Defense-in-Depth CI Quality Gate: Lint, Typecheck, Bandit SAST, Audit & unittest",
          "purpose": "Map the automated verification sequence running on every commit before merging security automation code.",
          "accessibility_description": "Linear CI stage flow moving commits sequentially through Ruff Lint/Format -> mypy Type Check -> Bandit/Semgrep SAST -> pip-audit -> python -m unittest.",
          "walkthrough_section": "Diagram Walkthrough: Continuous Security Quality Gates"
        },
        {
          "figure_id": "fig-04-08-10",
          "figure_number": "Figure 8.10",
          "lesson_id": "les_c4_m8_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l05_pyproject_toml_package_layout.png",
          "title": "Modern pyproject.toml Package Structure and Console Entry-Point Wiring",
          "purpose": "Diagram how pyproject.toml connects package metadata, runtime dependencies, and console script entry points cleanly into pip-installable CLI commands.",
          "accessibility_description": "Package layout diagram showing pyproject.toml [project] and [project.scripts] rkloga = 'rkloga:main' alongside README.md, src/ package code, and tests/.",
          "walkthrough_section": "Diagram Walkthrough: pyproject.toml Packaging Anatomy"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-09",
          "title": "Continuous Integration Quality & Security Gates",
          "url": "/assets/courses/cyber-04/c04_m8_l05_ci_static_analysis_pipeline.png",
          "caption": "Figure 8.9: Sequential five-gate CI quality pipeline spanning Lint & Format, mypy Type Check, Bandit/Semgrep SAST, pip-audit CVE checks, and unittest execution.",
          "alt": "Left-to-right five-gate CI pipeline from Commit / PR through 1. Lint & Format (Ruff / Black), 2. Type Check (mypy), 3. SAST Scan (Bandit / Semgrep), 4. CVE Audit (pip-audit), and 5. Unit Tests (unittest -v) to Safe to Merge, with a bottom fail line labeled Any Gate Fails -> Block Merge Automatically."
        },
        {
          "id": "fig-04-08-10",
          "title": "Modern pyproject.toml Package Structure and CLI Entry-Point Wiring",
          "url": "/assets/courses/cyber-04/c04_m8_l05_pyproject_toml_package_layout.png",
          "caption": "Figure 8.10: PEP 621 pyproject.toml manifest wiring [build-system], dependencies = [], and [project.scripts] entry point rkloga = 'rkloga:main' via pip install . into a venv CLI command.",
          "alt": "Three-stage packaging flow showing Repository Layout (pyproject.toml, rkloga.py, tests/test_rkloga.py, README.md & CHANGELOG.md) feeding PEP 621 Manifest ([build-system], [project] deps = [], [project.scripts] rkloga = 'rkloga:main') through pip install . to Installed Venv Command (rkloga sample_auth.log --json -> Calls sys.exit(main()))."
        }
      ],
      "content": "## 1. Professional Tooling Beyond Solo Scripts\n\nOnce security scripts enter shared team repositories or SOC automation hosts, style drift, silent type mismatches, subtle security anti-patterns, and stale dependency CVEs slowly accumulate. While beginners start cleanly with standard-library `unittest` and manual reviews, engineering teams reinforce trust using **static analysis tooling** and **declarative `pyproject.toml` packaging**.\n\n## 2. The Five Python Quality & Security Checkers\n\nNotice each category plays a distinct defensive engineering role:\n\n- **Linters (`Ruff`, `Flake8`, `Pylint`):** Catch unused variables, dead code (remember Knight Capital's fatal orphaned 2005 function!), unreachable branches, and bare `except:` anti-patterns automatically.\n- **Formatters (`Black`, `Ruff format`):** Enforce uniform whitespace, quoting, and line lengths automatically so Git diffs reflect real logic changes rather than stylistic formatting wars.\n- **Static Type Checkers (`mypy`):** Verify type hints across functions (`str | None` vs `str`, `Path` vs `str`, `list[Event]`) *without running code*—exposing forgotten `None` checks cleanly (`parse_line` returns `Event | None`; callers dereferencing `.user` without `if ev:` fail typecheck immediately).\n- **Security SAST Linters (`Bandit`, `Semgrep` — `Course 12`):** Scan Python Abstract Syntax Trees specifically for hazardous patterns taught throughout Course 04—`subprocess.run(..., shell=True)`, `pickle.loads()`, hardcoded passwords, `verify=False`, and `md5()` outside allowed scopes.\n- **Dependency Auditors (`pip-audit`, `Module 2`):** Scan virtual-environment packages and lockfiles against public vulnerability advisories before shipping updates cleanly.\n\n> [!NOTE]\n> Running **Bandit** locally over the Course 04 lab scripts makes a great verification check: clean defensive scripts produce zero high-severity warnings (`shell=True` / `pickle` / `verify=False`), whereas insecure counterexamples intentionally flag violations immediately!\n\n## 3. Declarative Packaging With `pyproject.toml`\n\nModern Python replaces imperative `setup.py` execution scripts with declarative **PEP 621 `pyproject.toml`** manifests. Defining console entry points turns raw `python path/to/rkloga.py` invocations into clean system-wide commands inside a virtual environment:\n\n```toml\n[build-system]\nrequires = [\"setuptools>=68\"]\nbuild-backend = \"setuptools.build_meta\"\n\n[project]\nname = \"rkloga\"\nversion = \"2.0.0\"\ndescription = \"RedKross SOC SSH and Windows log analysis utility\"\nreadme = \"README.md\"\nrequires-python = \">=3.10\"\ndependencies = []\n\n[project.scripts]\nrkloga = \"rkloga:main\"\n```\n\nWhen installed into an isolated virtual environment via `pip install .`, typing simply `rkloga sample_auth.log --json` calls `sys.exit(main())` seamlessly on Windows, macOS, and Linux. Keeping `dependencies = []` for pure standard-library tools maintains zero external supply-chain attack surface!\n\n## 4. Version Control & Continuous Integration (CI)\n\nEvery detection change flows through tracked Git commits, peer code review, and automated **Continuous Integration (CI)** runners checking:\n\n1. Formatting and lint hygiene (`ruff check .`).\n2. Static type invariants (`mypy rkloga.py`).\n3. SAST security checks (`bandit -r src/`).\n4. Dependency CVE verification (`pip-audit`).\n5. Automated `python -m unittest -v` execution proving zero functional regressions before merge.\n\n## 5. Diagram Walkthrough: Continuous Security Quality Gates\n\n![Continuous Integration Quality & Security Gates](/assets/courses/cyber-04/c04_m8_l05_ci_static_analysis_pipeline.png)\n*Figure 8.9: Automated five-gate pre-merge CI pipeline verifying style, types, SAST patterns, dependency CVEs, and `unittest` regressions.*\n\n- **Five defense-in-depth checkpoints:** Starting from **Commit / PR**, code passes sequentially through **1. Lint & Format** (`Ruff / Black` — `Dead code & bare except:`), **2. Type Check** (`mypy` — `Unchecked None errors`), **3. SAST Scan** (`Bandit / Semgrep` — `shell=True, pickle, verify=False`), **4. CVE Audit** (`pip-audit` — `Vulnerable packages`), and **5. Unit Tests** (`unittest -v` — `Logic & CLI regressions`) before reaching **Safe to Merge**.\n- **Fail-closed merge protection:** Along the bottom red collector path, failing any single gate routes directly to `Any Gate Fails -> Block Merge Automatically` so regressions never enter production branches.\n\n## 6. Diagram Walkthrough: `pyproject.toml` Packaging Anatomy\n\n![Modern pyproject.toml Package Structure and CLI Entry-Point Wiring](/assets/courses/cyber-04/c04_m8_l05_pyproject_toml_package_layout.png)\n*Figure 8.10: PEP 621 `pyproject.toml` manifest wiring console entry points from repository files into an installed virtual-environment command.*\n\n- **Declarative manifest wiring:** Inside **Repository Layout**, `pyproject.toml` sits beside `rkloga.py`, `tests/test_rkloga.py`, and `README.md & CHANGELOG.md`, declaring `[build-system]` (`setuptools >= 68`), `[project]` (`name = 'rkloga' | deps = []`), and `[project.scripts]` (`rkloga = 'rkloga:main'`).\n- **Installed invocation & zero-dependency hygiene:** Running `pip install .` turns `rkloga sample_auth.log --json` into a native venv command calling `sys.exit(main())`, while keeping `dependencies = []` eliminates third-party supply-chain exposure."
    },
    {
      "id": "les_c4_m8_l6",
      "title": "Lesson 8.6: Designing & Extending the rkloga 2.0 Capstone Utility",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Dissects rkloga's clean layered architecture (LINE_RX, frozen Event dataclass, pure parse_line/analyse, read_events I/O separation) and specifies rkloga 2.0 capstone engineering extensions for Windows Event CSVs, bounded deques, and public-IP IOC reports.",
      "learning_objectives": [
        "Deconstruct rkloga.py across its four distinct tested layers (CLI main, read_events I/O, pure parse_line, pure analyse).",
        "Trace rkloga execution across sample_auth.log producing spray, success_after_failure, and skipped_lines accounting in both text and JSON formats.",
        "Implement Capstone rkloga 2.0 upgrades: Windows Event CSV parser (4624/4625), bounded collections.deque sliding windows, brute-force rules, and ipaddress validation.",
        "Satisfy professional capstone rubric criteria across correctness, >=20 tests, CSV formula protection, documentation, and prioritized analysis reporting."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-08-11",
          "figure_number": "Figure 8.11",
          "lesson_id": "les_c4_m8_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l06_rkloga_layered_architecture.png",
          "title": "rkloga Reference Utility Layered Architecture and Test Mapping (C04-M08-F1)",
          "purpose": "Present the vertical separation of concerns inside rkloga.py from CLI argument parsing and I/O isolation down to pure regex parsing and temporal event correlation.",
          "accessibility_description": "Four-layer architectural stack linking main(argv) -> read_events(path) -> parse_line(text) -> analyse(events) -> text/JSON output, paired with CliTests, ParseTests, and AnalyseTests.",
          "walkthrough_section": "Diagram Walkthrough: rkloga Reference Architecture"
        },
        {
          "figure_id": "fig-04-08-12",
          "figure_number": "Figure 8.12",
          "lesson_id": "les_c4_m8_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m08_l06_rkloga2_sliding_deque_capstone.png",
          "title": "rkloga 2.0 Capstone Architecture: Multi-Parser Registry, Bounded Deque & Safe IOCs",
          "purpose": "Show how rkloga 2.0 extends the base engine via an SSH/WinCSV parser registry, O(1) evicted collections.deque sliding windows, and formula-safe defanged IOC exports.",
          "accessibility_description": "System architecture diagram routing SSH text logs and Windows CSV exports into normalized UTC Event streams -> per-IP/per-user bounded deque detectors -> JSON and safe CSV/defanged IOC reports.",
          "walkthrough_section": "Diagram Walkthrough: rkloga 2.0 Capstone Extensions"
        }
      ],
      "images": [
        {
          "id": "fig-04-08-11",
          "title": "Layered Architecture & Test Boundaries in rkloga.py",
          "url": "/assets/courses/cyber-04/c04_m8_l06_rkloga_layered_architecture.png",
          "caption": "Figure 8.11: Four-layer separation in rkloga.py pairing CLI and file I/O boundaries against pure 5 ms in-memory ParseTests and AnalyseTests.",
          "alt": "Vertical four-layer stack linking 1. main(argv) -> CliTests (I/O Boundary), 2. read_events(path) -> Isolates Disk Reads, 3. parse_line(text) -> ParseTests (Pure | No I/O), and 4. analyse(events) -> AnalyseTests (Pure | 5 ms)."
        },
        {
          "id": "fig-04-08-12",
          "title": "Capstone rkloga 2.0: Multi-Parser Registry, Bounded Deque & Safe Exports",
          "url": "/assets/courses/cyber-04/c04_m8_l06_rkloga2_sliding_deque_capstone.png",
          "caption": "Figure 8.12: rkloga 2.0 capstone pipeline combining SSH/Windows CSV normalization, O(1) popleft bounded sliding deques, ipaddress validation, and formula-safe defanged exports.",
          "alt": "Three-stage pipeline from 1. Parser Registry (--format) for OpenSSH and Windows CSV (4624/4625) to 2. O(1) Bounded Sliding Deque evicting expired timestamps via popleft() with ipaddress.is_global and Password Spray, Brute-Force, and SAF rules to 3. Safe Output & Integrity for JSON IOCs, defanged sharing, and formula-safe CSV exports."
        }
      ],
      "content": "## 1. Deconstructing the `rkloga.py` Reference Architecture\n\nInspect how every defensive Python skill taught across Modules 1–8 converges cleanly inside 126 readable lines of `rkloga.py`:\n\n- **Strict Anchored Grammar (`LINE_RX`):** Compiles once at module load, anchoring `^...$`, normalizing UTC `'Z'` timestamps, handling optional `invalid user ` phrases `(?:invalid user )?`, and constraining `(?P<user>[\\w.@-]{1,64})` cleanly so shell metacharacters or control bytes reject deterministically.\n- **Immutable Record (`@dataclass(frozen=True) Event`):** Replaces fragile indexed tuples with typed read-only objects holding `(ts, result, user, ip)` so downstream analysis never accidentally mutates events mid-correlation.\n- **Isolated I/O (`read_events(path)`):** Decodes cleanly using `errors=\"replace\"` while counting non-empty unmatched lines as `skipped`—never dropping unrecognized log anomalies silently!\n- **Pure Detection Core (`analyse(events, window, spray_users)`):** Sorts out-of-order log events chronologically first (`sorted(events, key=lambda e: e.ts)`), isolates per-IP failure histories (`defaultdict(list)`), flags distinct-user password **spraying** (`len(users) >= spray_users`) *once per IP* (`already`), and flags **`success_after_failure`** whenever a compromised IP subsequently authenticates cleanly.\n\nVerify both human text output and structured `--json` execution output on `sample_auth.log` (`5 lines`, including 1 injected `\"random noise line\"`):\n\n```terminal\nevents=4 failures=3 successes=1 skipped=1\nFINDING spray ip=203.0.113.7 time=2026-11-07T10:00:09+00:00\nFINDING success_after_failure ip=203.0.113.7 time=2026-11-07T10:07:20+00:00\n```\n\nRunning with `--json` produces exact machine-consumable output (`exit=1`):\n\n```json\n{\n  \"events\": 4,\n  \"failures\": 3,\n  \"successes\": 1,\n  \"findings\": [\n    {\n      \"type\": \"spray\",\n      \"ip\": \"203.0.113.7\",\n      \"users\": [\n        \"asha\",\n        \"ben\",\n        \"chen\"\n      ],\n      \"time\": \"2026-11-07T10:00:09+00:00\"\n    },\n    {\n      \"type\": \"success_after_failure\",\n      \"ip\": \"203.0.113.7\",\n      \"user\": \"chen\",\n      \"time\": \"2026-11-07T10:07:20+00:00\"\n    }\n  ],\n  \"skipped_lines\": 1\n}\n```\n\n> [!TIP]\n> Notice line 4 of `sample_auth.log` (`\"random noise line\"`): because `read_events` increments `skipped += 1` whenever `line.strip()` is non-empty and unparsed, JSON telemetry explicitly records `\"skipped_lines\": 1` instead of hiding parser misses silently.\n\n## 2. Fixing Limitations Cleanly (`Practical P2` & Capstone `rkloga 2.0`)\n\nYour Course 04 **Capstone Project** asks you to upgrade reference `rkloga` into **rkloga 2.0** for the **Kestrel Family Dental** SOC (`Courses 01 & 03`), meeting requirements **R1 through R7**:\n\n- **`R1` Multi-Format Parser Registry (`--format`):** Support `ssh` alongside Windows Security Event CSV exports (`TimeCreated, EventId, TargetUserName, IpAddress`) mapping `4625 -> Failed` and `4624 -> Accepted` via `csv.DictReader` and normalizing timestamps deterministically to UTC (`Module 3` + `Module 6`).\n- **`R2` Bounded Sliding-Window `collections.deque` & Expanded Rules:** Replace unbounded failure lists inside `analyse()` with per-IP `collections.deque` eviction loops—`while q and (e.ts - q[0].ts) > window: q.popleft()`—proving constant bounded memory even over **100,000 synthetic failures** (`Practical P2`), alongside per-user brute-force detection, time-bounded `--saf-minutes` success-after-failure, and `ipaddress.ip_address()` validation (`is_global`)!\n- **`R3` Safe IOC Extraction (`JSON` & Defanged Text):** Emit deduplicated global IPs with `first_seen` and `last_seen` timestamps alongside defanged analyst sharing formats (`[.]`) and formula-safe CSV exports (`=cmd` prefix protection).\n- **`R4–R7` Secure Engineering, Testing & Packaging:** Enforce `--output FILE` overwrite protection (refuse clobbering existing files unless `--force` passes), build **at least 20 passing unit tests** spanning known-good, known-bad, out-of-order timestamps, IPv6, formula injection, and error paths (`exit 2`), deliver complete `README.md` + `CHANGELOG.md` + 1–2 page SOC findings report, and optionally ship `pyproject.toml` + HMAC-signed report integrity.\n\n:::math-steps Bounding Sliding-Window Memory With collections.deque\nStep 01: Base rkloga keeps an unpruned failures[ip] list retaining all historic Event tuples in RAM\nStep 02: Across N = 100,000 high-frequency attack failures spanning 24 hours with a 5-minute window, list size grows linearly O(N) = 100,000 items (plus O(N^2) comprehension rescanning!)\nStep 03: Replace list with collections.deque() storing (ts, user) per source IP\nStep 04: On every incoming failure at time ts, popleft() all entries strictly older than (ts - window) in amortized O(1) per item\nResult: Memory stays strictly bounded to active failures inside the 5-minute window alone, converting quadratic O(N^2) lag into linear O(N) performance\n:::\n\n## 3. Capstone Evaluation Checklist\n\nVerify every deliverable meets **Competent (`>= 3/4`) or Distinguished (`4/4`)** rubric marks before submission (`Pass >= 60%` overall and zero criteria below `Competent`):\n\n1. **Correctness (25%):** All `R2` detections verified across SSH, Windows CSV, out-of-order logs, and IPv6 addresses.\n2. **Testing (20%):** `>= 20` deterministic `unittest` tests (`parse`, `analyse`, `cli`, `csv` safety, bounded `deque`), zero skipped assertions.\n3. **Secure Coding (20%):** Clean exit `0`/`1`/`2`, zero raw tracebacks, zero `shell=True` or `pickle`, bounded `MAX_LINE`, CSV `safe_cell()` guarding, optional HMAC signing.\n4. **Code Quality & Docs (25%):** Modular pure functions, docstrings, accurate `README.md` with honest limitations, and structured `CHANGELOG.md`.\n5. **Analysis Report (10%):** Findings explained clearly with prioritized remediation guidance for Kestrel Family Dental.\n\n## 4. Diagram Walkthrough: `rkloga` Reference Architecture\n\n![Layered Architecture & Test Boundaries in rkloga.py](/assets/courses/cyber-04/c04_m8_l06_rkloga_layered_architecture.png)\n*Figure 8.11: Four-layer separation in `rkloga.py` isolating CLI and disk I/O boundaries from pure in-memory parsing and event analysis.*\n\n- **Four-tier responsibility stack:** Vertical flow moves strictly from **1. `main(argv)`** (`argparse + File Exceptions + Exit 0 / 1 / 2`) down to **2. `read_events(path)`** (`UTF-8 Replace + Counts skipped_lines`), **3. `parse_line(text)`** (`LINE_RX Regex -> Frozen Event Record`), and **4. `analyse(events)`** (`Sort + Spray + Success-After-Fail`).\n- **Automated test boundary alignment:** Dashed links pair `main(argv)` with `CliTests` (`I/O Boundary`), `read_events` with `Isolates Disk Reads`, `parse_line` with `ParseTests` (`Pure | No I/O`), and `analyse` with `AnalyseTests` (`Pure | 5 ms`) so all `10` unit tests complete without touching disk.\n\n## 5. Diagram Walkthrough: `rkloga 2.0` Capstone Extensions\n\n![Capstone rkloga 2.0: Multi-Parser Registry, Bounded Deque & Safe Exports](/assets/courses/cyber-04/c04_m8_l06_rkloga2_sliding_deque_capstone.png)\n*Figure 8.12: Complete `rkloga 2.0` capstone pipeline from `--format` parser registry through `collections.deque` sliding eviction to safe IOC outputs.*\n\n- **Input normalization & O(1) bounded window:** **1. Parser Registry (`--format`)** unifies `OpenSSH Auth Logs` and `Windows CSV (4624 / 4625)` into `Normalized UTC Events`, feeding **2. O(1) Bounded Sliding Deque** (`collections.deque per IP`) where `popleft() > window` evicts stale timestamps (`09:55`) as new events (`10:05`) arrive while powering `Password Spray`, `Brute-Force`, `SAF (--saf-minutes)`, and `ipaddress.is_global` with fixed RAM over `100k` events.\n- **Hardened output generation:** **3. Safe Output & Integrity** emits `JSON + Public IOC First/Last Seen`, `Defanged Sharing (203[.]0[.]113[.]7)`, and `Formula-Safe CSV (= Guard) + Safe Overwrite` protection."
    }
  ]
};
