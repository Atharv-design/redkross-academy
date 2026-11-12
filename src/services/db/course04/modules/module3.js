/**
 * Course 04: Python for Cybersecurity — Module 3 Data
 * Module ID: mod_c4_3 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module3Data = {
  "id": "mod_c4_3",
  "title": "Module 3: Files, Structured Data, and Regular Expressions",
  "description": "Handle filesystem evidence safely via pathlib and with-managed file streaming, prevent UnicodeDecodeError corruptions across bytes and UTF-8 text, process CSV and JSON without formula-injection (CWE-1236) or pickle deserialization (CWE-502) hazards, extract structured telemetry with regular expressions and post-regex validation, and defeat ReDoS (CWE-1333) catastrophic backtracking.",
  "order": 3,
  "quiz": {
    "id": "quiz_mod_c4_3",
    "title": "Module 3: Files, Structured Data, and Regular Expressions Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
      {
        "id": "q_c4_m3_001",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "medium",
        "q": "In `pathlib`, what does `work / 'auth.log'` perform when `work` is a `Path` object?",
        "options": [
          "Joins `'auth.log'` onto `work` using the active OS path separator cleanly",
          "Divides file sizes across directories",
          "Opens `'auth.log'` in binary write mode",
          "Validates whether `auth.log` exists on disk"
        ],
        "correct": 0,
        "explanation": "`pathlib.Path` overloads `/` to join path segments portably across Windows and POSIX filesystems."
      },
      {
        "id": "q_c4_m3_002",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "difficult",
        "q": "A triage script receives an external archive member name `'../../etc/cron.d/backdoor'` and builds `target = (base / name).resolve()`. Which verification method reliably stops symlink and parent-directory traversal?",
        "options": [
          "Check `not name.startswith('..')` on the raw string alone",
          "Replace `'..'` once via `name.replace('..', '')`",
          "Confirm `target.is_relative_to(base.resolve())` after resolving symlinks on both paths",
          "Pass `name` directly to `target.open('r')`"
        ],
        "correct": 2,
        "explanation": "Calling `.resolve()` on both `base` and `target` before testing `is_relative_to()` defeats URL encoding, nested `'....//'`, and symlink escapes."
      },
      {
        "id": "q_c4_m3_003",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "medium",
        "q": "Which file open mode in Python immediately truncates an existing file to zero bytes upon opening?",
        "options": [
          "'r'",
          "'a'",
          "'w'",
          "'x'"
        ],
        "correct": 2,
        "explanation": "`'w'` overwrites and erases any existing file contents immediately; never open primary forensic evidence with `'w'`."
      },
      {
        "id": "q_c4_m3_004",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "difficult",
        "q": "When writing a new output report inside a directory where accidentally overwriting an older audit artifact would destroy compliance records, why is mode `'x'` safer than testing `if not p.exists(): p.open('w')`?",
        "options": [
          "Mode `'x'` is atomic at the OS kernel level (`O_CREAT | O_EXCL`), failing with `FileExistsError` rather than suffering a check-then-act race condition",
          "Mode `'x'` compresses the output report with gzip automatically",
          "Mode `'x'` disables filesystem permissions on Linux",
          "Mode `'x'` opens files read-only by default"
        ],
        "correct": 0,
        "explanation": "Checking `.exists()` before `'w'` leaves a TOCTOU race window; exclusive creation `'x'` guarantees atomic failure if the filename already exists."
      },
      {
        "id": "q_c4_m3_005",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "medium",
        "q": "Why should every file handle be opened inside a `with path.open(...) as fh:` context manager?",
        "options": [
          "It encrypts file buffers before writing to disk",
          "It doubles UTF-8 decoding speed",
          "It ensures the OS file handle closes automatically even if an exception aborts parsing halfway",
          "It converts binary streams into JSON automatically"
        ],
        "correct": 2,
        "explanation": "Context managers run cleanup guarantees cleanly on normal exit and exception propagation alike, preventing resource exhaustion or write lock corruption."
      },
      {
        "id": "q_c4_m3_006",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "difficult",
        "q": "An analyst investigates a 30 GB proxy log on a 16 GB RAM workstation using `Path('proxy.log').read_text(encoding='utf-8').splitlines()`. Why does the script fail, and what fix keeps RAM near constant?",
        "options": [
          "`read_text()` loads the entire 30 GB string plus line list into memory; replace it with `with path.open(encoding='utf-8') as fh: for line in fh:`",
          "`splitlines()` discards UTF-8 headers; pass `chunksize=1024`",
          "`read_text()` fails only on Windows paths over 260 characters; switch to `open('r+')`",
          "Increase Python's recursion limit via `sys.setrecursionlimit(1000000)`"
        ],
        "correct": 0,
        "explanation": "Iterating directly over an open file object streams buffered lines lazily in O(1) memory instead of materializing gigabytes on the heap."
      },
      {
        "id": "q_c4_m3_007",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "medium",
        "q": "In `m03_files_data.py`, how did the script inspect its 422-byte synthetic log file while printing 1-indexed line numbers?",
        "options": [
          "`fh.seek(1)` inside a `while` loop",
          "`for line in fh.read().split(','):`",
          "`for number, line in enumerate(fh, start=1):`",
          "`json.load(fh)`"
        ],
        "correct": 2,
        "explanation": "`enumerate(fh, start=1)` yields human-friendly 1-based line numbers directly while streaming lines from the file handle."
      },
      {
        "id": "q_c4_m3_008",
        "topic": "C04-M03-L01: pathlib & File Modes",
        "difficulty": "difficult",
        "q": "Why does `m03_files_data.py` allocate `tempfile.mkdtemp(prefix='rk-m03-')` rather than writing temp evidence directly to a hardcoded `/tmp/test_auth.log` filename?",
        "options": [
          "`open()` refuses writing inside `/tmp` without admin rights",
          "Named temp files delete after every single `write()` call",
          "`mkdtemp()` encrypts files with OS user keys automatically",
          "Hardcoded predictable temporary paths invite symlink hijacking, multi-user overwrite collisions, and cross-run stale artifact pollution"
        ],
        "correct": 3,
        "explanation": "Randomly suffixed directories via `tempfile` eliminate predictable filename races and multi-run evidence contamination."
      },
      {
        "id": "q_c4_m3_009",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "medium",
        "q": "What Python type represents raw octets (`0..255`) stored on disk or transmitted across network sockets?",
        "options": [
          "`str`",
          "`bytes`",
          "`ascii`",
          "`dict`"
        ],
        "correct": 1,
        "explanation": "`bytes` holds immutable octet sequences, whereas `str` holds decoded Unicode text characters."
      },
      {
        "id": "q_c4_m3_010",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "difficult",
        "q": "In `m03_files_data.py`, encoding `'Pune - café\\n'` to UTF-8 produces `b'Pune - caf\\xc3\\xa9\\n'`. Why does calling `.decode('ascii')` on that byte buffer raise `UnicodeDecodeError` while `len('Pune - café\\n')` is 12 yet `len(data)` is 13?",
        "options": [
          "Non-ASCII code point `U+00E9` (`é`) encodes as the two bytes `0xC3 0xA9` in UTF-8, and strict 7-bit ASCII rejects any byte >= 128 (`0x80`)",
          "UTF-8 pads every string with a null terminator byte",
          "`ascii` forbids newline bytes (`\\n`)",
          "Python adds a 1-byte BOM automatically on `.encode('utf-8')`"
        ],
        "correct": 0,
        "explanation": "7-bit ASCII spans bytes `0x00..0x7F`; UTF-8 expands characters above `U+007F` into multi-byte sequences starting with high-bit octets."
      },
      {
        "id": "q_c4_m3_011",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "medium",
        "q": "Why is passing `encoding='utf-8'` explicitly to `.open()`, `.read_text()`, and `.write_text()` strongly recommended over relying on defaults?",
        "options": [
          "`encoding='utf-8'` disables regex backtracking",
          "Omitting `encoding` forces binary mode",
          "Platform default encodings vary (for instance `cp1252` on Windows vs UTF-8 on Linux), causing silent mojibake or crashes when scripts move across hosts",
          "Python forbids calling `open()` without `encoding=`"
        ],
        "correct": 2,
        "explanation": "Explicitly declaring `encoding='utf-8'` guarantees portable behavior across Linux servers, macOS laptops, and Windows jump hosts."
      },
      {
        "id": "q_c4_m3_012",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "difficult",
        "q": "An investigator scans a multi-gigabyte syslog dump containing mostly UTF-8 alerts plus three corrupted legacy Latin-1 bytes. How should the script open the file without halting triage OR losing awareness of corrupted records?",
        "options": [
          "Open using `errors='replace'` (or `'backslashreplace'`), stream all lines cleanly, and log/count occurrences where `\\ufffd` or non-UTF-8 escapes appeared",
          "Pass `errors='ignore'` silently with no log warnings",
          "Decode every line as UTF-16 first",
          "Catch `MemoryError` inside `except: pass`"
        ],
        "correct": 0,
        "explanation": "Controlled error handlers keep bulk ingestion resilient while logging replacement telemetry preserves chain-of-custody accuracy."
      },
      {
        "id": "q_c4_m3_013",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "medium",
        "q": "Which file mode must you use when hashing a `.pcap` packet capture, `.png` screenshot, or `.exe` malware sample?",
        "options": [
          "`'r'` with UTF-8",
          "`'a'` with `newline=''`",
          "`'w'` with `errors='replace'`",
          "`'rb'` (binary read mode)"
        ],
        "correct": 3,
        "explanation": "Binary artifacts must be opened in binary mode (`'rb'`) so zero character decoding or newline conversions corrupt their raw bytes."
      },
      {
        "id": "q_c4_m3_014",
        "topic": "C04-M03-L02: Text, Bytes & Encodings",
        "difficulty": "difficult",
        "q": "Why does `m03_files_data.py` wrap decoded text inside `ascii(...)` when displaying `b'Pune - caf\\xc3\\xa9\\n'` in terminal diagnostics (`'Pune - caf\\xe9'`)?",
        "options": [
          "`ascii()` converts UTF-8 files permanently to ASCII on disk",
          "`ascii()` (like `repr()`) escapes non-ASCII characters and hidden control sequences visibly so terminals cannot mask ANSI escapes, carriage returns (`\\r`), or homoglyphs",
          "`print()` throws `UnicodeEncodeError` on every Linux terminal",
          "`ascii()` computes SHA-256 checksums"
        ],
        "correct": 1,
        "explanation": "Diagnostic `ascii()`/`repr()` wrappers expose control characters (`\\r`, `\\x1b`) and lookalike Unicode glyphs cleanly during forensic analysis."
      },
      {
        "id": "q_c4_m3_015",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "medium",
        "q": "Why should security scripts parse CSV asset tables using `csv.DictReader` instead of `line.split(',')`?",
        "options": [
          "`csv.DictReader` maps column names cleanly AND parses quoted fields containing embedded commas or escaped inner quotes correctly",
          "`csv.DictReader` skips blank headers automatically",
          "`line.split(',')` returns tuples instead of lists",
          "`csv.DictReader` removes duplicate rows automatically"
        ],
        "correct": 0,
        "explanation": "Quoted descriptions like `'Facilities, Bldg 2'` break naive comma splits immediately, whereas `csv` implements RFC 4180 parsing cleanly."
      },
      {
        "id": "q_c4_m3_016",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "difficult",
        "q": "Python's `csv` module docs specify passing `newline=''` inside `open(path, 'w', newline='', encoding='utf-8')`. What breaks if an analyst omits `newline=''` on Windows when exporting quoted multi-line alert comments?",
        "options": [
          "The file opens read-only automatically",
          "Python's text I/O translates `\\r\\n` twice into blank extra rows (`\\r\\r\\n`) and corrupts embedded RFC 4180 multi-line quoted cells",
          "`csv` refuses to write headers",
          "UTF-8 characters turn into Base64"
        ],
        "correct": 1,
        "explanation": "Passing `newline=''` disables automatic text-layer newline translation so the `csv` writer handles RFC 4180 line endings accurately without double CRs."
      },
      {
        "id": "q_c4_m3_017",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "medium",
        "q": "According to OWASP CSV Injection guidance and `m03_files_data.py`, which leading characters trigger formula interpretation inside spreadsheet viewers?",
        "options": [
          "`/`, `.`, `?`, `#`",
          "`{`, `[`, `<`, `>`",
          "`=`, `+`, `-`, `@`, `\\t`, `\\r`",
          "`*`, `%`, `$`, `!`"
        ],
        "correct": 2,
        "explanation": "Spreadsheets evaluate cells starting with `=`, `+`, `-`, `@`, horizontal tab (`\\t`), or carriage return (`\\r`) as active formula expressions."
      },
      {
        "id": "q_c4_m3_018",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "difficult",
        "q": "Inspect line 59 of verified output (`asha,\"'=HYPERLINK(\"\"http://example.com\"\",\"\"click\"\")\"`). What two mechanisms acted together to generate this exact line?",
        "options": [
          "`DictWriter` automatically ran `safe_cell()` natively without custom user code",
          "`json.dumps()` escaped single quotes manually",
          "`safe_cell()` prepended `'` before `=` to neutralize formula execution, and `csv.DictWriter` wrapped the cell in outer quotes while doubling internal quotes (`\"\"`) per RFC 4180",
          "Windows Notepad rewrote commas into semicolons"
        ],
        "correct": 2,
        "explanation": "Note `csv.DictWriter` does NOT sanitize formulas itself—your application's `safe_cell()` adds the leading `'`, while `DictWriter` performs RFC 4180 quote doubling."
      },
      {
        "id": "q_c4_m3_019",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "medium",
        "q": "In Case Study C04-M03-CS2 (Peacock Finance fictional scenario), how did an attacker deliver a clickable phishing prompt inside an internal SOC weekly email report?",
        "options": [
          "Submitted `=HYPERLINK(\"http://phish.example\",\"Reset your account\")` as a login username exported unescaped to CSV",
          "Sent an executable macro directly inside an SMTP attachment",
          "Compromised Microsoft Excel's update server",
          "Used `pickle.dumps()` inside DNS logs"
        ],
        "correct": 0,
        "explanation": "Untrusted authentication usernames flowed raw into the exported CSV, causing the manager's spreadsheet app to render the formula as a live link."
      },
      {
        "id": "q_c4_m3_020",
        "topic": "C04-M03-L03: CSV & Formula Injection",
        "difficulty": "difficult",
        "q": "Look at `safe_cell(value)` in `m03_files_data.py`: `if value and value[0] in ('=', '+', '-', '@', '\\t', '\\r'): return \"'\" + value`. Why is writing `if value:` BEFORE `value[0]` mandatory?",
        "options": [
          "Without `if value:`, `'='` evaluates to `False`",
          "`value[0]` skips whitespace unless guarded",
          "`if value:` turns integers into strings",
          "Without `if value:`, an empty cell string `''` triggers `IndexError: string index out of range` at `value[0]`"
        ],
        "correct": 3,
        "explanation": "Empty strings evaluate falsy; short-circuiting `value and value[0]` prevents indexing empty cells and crashing mid-export."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m3_l1",
      "title": "3.1 Portable Paths, File Modes, and Memory-Safe Streaming",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Compose OS-independent paths using pathlib.Path, enforce deterministic with-block resource cleanup, pick safe file modes (r/w/a/x), stream multi-gigabyte logs line by line, and preserve raw evidence.",
      "learning_objectives": [
        "Construct cross-platform filesystem paths cleanly with pathlib.Path and temporary workspaces via tempfile.mkdtemp()",
        "Compare file open modes r, w, a, and x to avoid truncating evidence logs accidentally",
        "Stream large files line by line inside with context managers rather than loading multi-gigabyte text with read_text()",
        "Validate untrusted path inputs against base directories using Path.resolve() and is_relative_to()"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-01",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l01_safe_data_pipeline_overview.png",
          "caption": "Figure 3.1 (C04-M03-F1): End-to-end defensive data pipeline from streaming UTF-8 ingestion through validation to safe serialized output and cleanup.",
          "placement_hint": "After Section 3 (The Safe Security Data Pipeline Overview)"
        },
        {
          "id": "fig-04-03-02",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l01_context_manager_streaming_io.png",
          "caption": "Figure 3.2: Deterministic with-statement file handle cleanup versus full-file read_text() memory exhaustion.",
          "placement_hint": "After Section 5 (Line-by-Line Streaming and Evidence Preservation)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-01",
          "title": "Figure 3.1: 7-Stage Safe Security Data Pipeline",
          "url": "/assets/courses/cyber-04/c04_m03_l01_safe_data_pipeline_overview.png",
          "caption": "Figure 3.1 (C04-M03-F1): End-to-end defensive data pipeline from streaming UTF-8 ingestion through validation to safe serialized output and cleanup.",
          "alt": "Seven-stage defensive data pipeline flowing from 1. Locate Safely through 2. Stream UTF-8, 3. Parse with Stdlib, 4. Normalize Types, 5. Analyze & Correlate, and 6. Serialize Safely to 7. Clean Up Workspace"
        },
        {
          "id": "fig-04-03-02",
          "title": "Figure 3.2: with Streaming vs. Loading Entire Logs into RAM",
          "url": "/assets/courses/cyber-04/c04_m03_l01_context_manager_streaming_io.png",
          "caption": "Figure 3.2: Deterministic with-statement file handle cleanup versus full-file read_text() memory exhaustion.",
          "alt": "Side-by-side comparison contrasting read_text() trying to copy a 30 GiB proxy log into 16 GiB RAM at once against streaming line by line inside a with block using under 10 KiB RAM and auto-closing the handle"
        }
      ],
      "lab_resources": [
        {
          "name": "m03_files_data.py",
          "url": "/assets/courses/cyber-04/labs/m03_files_data.py",
          "description": "Module 3 pathlib, CSV, JSON & regex ReDoS lab script"
        }
      ],
      "content": "## 1. Where Digital Evidence Lives and Why File Hygiene Matters\n\nNearly every real security artifact resides in a file before it reaches a dashboard: authentication syslogs, firewall captures, asset management CSV tables, SIEM JSON event streams, and raw disk or memory slices. Yet hasty file-handling code causes silent operational disasters—loading a 30 GB proxy log into memory until the server crashes, overwriting an original incident log by opening it with `\"w\"`, leaving dangling file descriptors locked across exceptions, or joining untrusted user filenames blindly so `\"../../etc/passwd\"` escapes outside an upload sandbox.\n\nThroughout Module 3, every executable listing, output snapshot, and timing curve is backed directly by `m03_files_data.py`, verified locally under Python 3.12.4 and on CPython 3.14.4 (`Windows 11`). Notice how the script demonstrates clean lab discipline from line 17 to line 121: it creates an isolated workspace inside the OS temporary folder via `tempfile.mkdtemp(prefix=\"rk-m03-\")`, generates purely synthetic telemetry inside it, and removes that workspace completely upon completion.\n\n## 2. Core Objectives for This Lesson\n\n- **Cross-Platform Path Construction:** Manipulate directories, extensions, and files portably with `pathlib.Path` rather than fragile string concatenation (`/` vs. `\\`).\n- **Context Manager Safety (`with`):** Guarantee immediate file handle closure on both normal exits and mid-read exceptions.\n- **Explicit File Modes:** Choose accurately among `\"r\"`, `\"w\"`, `\"a\"`, and `\"x\"` without truncating digital evidence.\n- **Streaming Multi-Gigabyte Logs:** Process files line by line in $O(1)$ RAM instead of full-file memory loads.\n- **Path Traversal Guardrails:** Validate any externally supplied path fragment with `Path.resolve()` and `is_relative_to()`.\n\n## 3. The Safe Security Data Pipeline Overview\n\nClean defensive scripts follow a repeatable seven-stage architecture regardless of file format (cross-reference Figure 3.1 / `C04-M03-F1`):\n\n1. **Locate Input Safely:** Build target paths via `pathlib.Path` and verify untrusted paths stay strictly inside their intended base directory.\n2. **Stream with Explicit Encoding:** Open text sources with `encoding=\"utf-8\"` inside a `with` statement and iterate line by line when handling large logs.\n3. **Parse with Dedicated Standard Libraries:** Select `csv.DictReader`, `json.loads()`, or compiled `re` patterns rather than brittle manual splitting.\n4. **Normalize Types & Domain Semantics:** Cast strings to integers, lowercase identifiers consistently, validate extracted IP shapes via `ipaddress`, and unify timestamps to UTC.\n5. **Analyze & Correlate:** Aggregate counts, filter thresholds, and cross-reference critical asset inventories.\n6. **Serialize Output Defensively:** Neutralize CSV formula triggers before report export (`safe_cell`), write clean JSON (`json.dumps`), and strictly reject `pickle` on untrusted boundaries.\n7. **Clean Up Temporary Workspace:** Purge ephemeral artifacts deterministically (`shutil.rmtree(work)` -> `8. cleaned up: True`).\n\n![Figure 3.1: 7-Stage Safe Security Data Pipeline](/assets/courses/cyber-04/c04_m03_l01_safe_data_pipeline_overview.png)\n\n*Figure 3.1 (C04-M03-F1): End-to-end defensive data pipeline from streaming UTF-8 ingestion through validation to safe serialized output and cleanup.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Safe Ingestion & Parsing (Stages `1`–`4`):** Locate confined paths with `pathlib.Path`, stream UTF-8 inside `with` blocks in $O(1)$ RAM, parse via stdlib modules (`csv.DictReader`, `json.loads()`, `re`), and normalize integers, lowercase names, IPs, and UTC timestamps.\n- **Correlation, Safe Export & Cleanup (Stages `5`–`7`):** Correlate thresholds, neutralize spreadsheet formulas with `safe_cell` while refusing untrusted `pickle` payloads, and purge temporary workspaces cleanly using `shutil.rmtree(work)`.\n\n## 4. Portable Filesystem Paths with `pathlib.Path`\n\nModern Python replaces older `os.path.join()` string juggling with object-oriented `pathlib.Path` paths that adapt automatically between Windows backslashes and POSIX forward slashes. The forward-slash operator `/` is overloaded cleanly on `Path` objects to join subpaths reliably:\n\n```python\nimport tempfile\nfrom pathlib import Path\n\nwork = Path(tempfile.mkdtemp(prefix=\"rk-m03-\"))\nlog_file = work / \"auth.log\"\nprint(\"0. working folder created:\", work.name.startswith(\"rk-m03-\"))\n```\n\nEssential read-only `Path` attributes and helper methods belong in every analyst's vocabulary:\n\n- **`p.exists()` / `p.is_file()` / `p.is_dir()`:** Verify filesystem state before assuming a path points to a readable regular file.\n- **`p.name` / `p.suffix` / `p.stem` / `p.parent`:** Extract filename (`\"auth.log\"`), extension (`\".log\"`), filename root (`\"auth\"`), or parent directory cleanly without slicing strings manually.\n- **`p.stat().st_size`:** Query file size in bytes directly from OS metadata.\n- **`p.read_text(encoding=\"utf-8\")` / `p.write_text(...)` / `p.read_bytes()`:** Compact helpers reserved strictly for small configs or single-shot files that comfortably fit in RAM.\n\n## 5. `with` Context Managers, File Modes, and Line-by-Line Streaming\n\nInspect lines 22–37 of `m03_files_data.py` alongside the exact captured output from our Python 3.12.4 lab execution:\n\n```python\nlog_file = work / \"auth.log\"\nlines = [\n    \"2026-11-07T10:01:02Z sshd[811]: Failed password for asha from 203.0.113.7 port 50122\",\n    \"2026-11-07T10:01:09Z sshd[811]: Failed password for invalid user admin from 203.0.113.7 port 50130\",\n    \"2026-11-07T10:02:44Z sshd[815]: Accepted publickey for ben from 10.20.4.17 port 51022\",\n    \"2026-11-07T10:03:10Z sshd[817]: Failed password for asha from 198.51.100.23 port 40001\",\n]\nwith log_file.open(\"w\", encoding=\"utf-8\", newline=\"\\n\") as fh:\n    fh.write(\"\\n\".join(lines) + \"\\n\")\nwith log_file.open(\"a\", encoding=\"utf-8\") as fh:\n    fh.write(\"2026-11-07T10:04:00Z sshd[820]: Connection closed by 10.20.4.17\\n\")\nwith log_file.open(encoding=\"utf-8\") as fh:\n    for number, line in enumerate(fh, start=1):\n        if \"Failed\" in line:\n            print(f\"1. line {number}: {line.rstrip()[:60]}...\")\nprint(\"   size:\", log_file.stat().st_size, \"bytes; lines:\",\n      len(log_file.read_text(encoding=\"utf-8\").splitlines()))\n```\n\n```terminal\n0. working folder created: True\n1. line 1: 2026-11-07T10:01:02Z sshd[811]: Failed password for asha fro...\n1. line 2: 2026-11-07T10:01:09Z sshd[811]: Failed password for invalid ...\n1. line 4: 2026-11-07T10:03:10Z sshd[817]: Failed password for asha fro...\n   size: 422 bytes; lines: 5\n```\n\nObserve every critical guarantee demonstrated above:\n\n| Open Mode | Initial State if File Exists | Initial State if Absent | Primary Forensic / Engineering Use |\n| :--- | :--- | :--- | :--- |\n| `\"r\"` (default) | Opens read-only from byte 0 | Raises `FileNotFoundError` | Safely inspect evidence files without risk of accidental overwrite |\n| `\"w\"` | **Truncates to 0 bytes immediately** | Creates empty file | Write brand-new normalized output reports (never raw evidence!) |\n| `\"a\"` | Appends cleanly at EOF | Creates empty file | Append local execution or audit records |\n| `\"x\"` | **Raises `FileExistsError`** | Creates and opens new file | Prevent atomic race conditions or clobbering existing artifacts |\n\nAdding `\"b\"` (e.g., `\"rb\"`, `\"wb\"`) switches any mode into untranslated binary byte streams (Lesson 3.2). Furthermore, wrapping every open call inside `with log_file.open(...) as fh:` invokes Python's context manager protocol so the OS file handle is flushed and closed the instant execution leaves the block—even if a parsing error aborts halfway through.\n\n### Streaming Memory Efficiency Calculation\n\nSuppose an analyst must inspect a $30\\text{ GiB}$ proxy access log ($32{,}212{,}254{,}720\\text{ bytes}$) on a host workstation carrying $16\\text{ GiB}$ of RAM, averaging $\\bar{\\ell} = 256\\text{ bytes}$ per line:\n\n:::math-steps\nStep 01: Compute naive full-file memory footprint of `read_text()` or `.splitlines()`\n$$M_{\\text{eager}} \\ge S_{\\text{file}} + S_{\\text{str\\_overhead}} > 30\\text{ GiB} > 16\\text{ GiB}$$\nResult: Loading the whole file exceeds available RAM immediately and triggers an out-of-memory crash\n\nStep 02: Compute streaming iteration memory footprint via `for number, line in enumerate(fh, start=1):`\n$$M_{\\text{stream}} \\approx B_{\\text{io}} + \\bar{\\ell} \\approx 8\\text{ KiB} + 256\\text{ B} < 10\\text{ KiB}$$\nResult: Peak heap memory drops by more than three million times, scanning arbitrarily large logs cleanly\n:::\n\n![Figure 3.2: with Streaming vs. Loading Entire Logs into RAM](/assets/courses/cyber-04/c04_m03_l01_context_manager_streaming_io.png)\n\n*Figure 3.2: Deterministic with-statement file handle cleanup versus full-file read_text() memory exhaustion.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Full-File Exhaustion (`Unsafe: Load Everything via read_text()`):** Calling `log.read_text()` attempts to copy a `30 GiB` proxy log into `16 GiB` of RAM at once, triggering an out-of-memory crash while raw `open()` leaves descriptors dangling if errors interrupt execution.\n- **Bounded Context-Managed Streaming (`Safe: Stream Line by Line Inside 'with'`):** Iterating `for line in fh:` inside `with log_file.open(encoding=\"utf-8\") as fh:` processes one `~256 B` record at a time inside `< 10 KiB RAM` ($O(1)$ memory) and auto-closes the handle on completion or crash.\n\n## 6. Protecting Evidence and Preventing Path Traversal (`CWE-22`)\n\nAlways treat captured log files as read-only evidence (`\"r\"` or `\"rb\"`): perform transformations on extracted copies inside `tempfile.mkdtemp()` (never overwrite original evidence in place or predictably name temporary files inside shared `/tmp` folders where symlink races happen). And whenever a script accepts a filename or archive entry path from a user, HTTP header, or TAR/ZIP manifest, normalize and enforce containment inside `base_dir` via `Path.resolve()` and `is_relative_to()` (examined in depth with OS containment labs in Module 4):\n\n```python\nbase = Path(\"/var/sec/reports\").resolve()\ncandidate = (base / untrusted_name).resolve()\nif not candidate.is_relative_to(base):\n    raise ValueError(f\"Blocked path traversal attempt: {untrusted_name!r}\")\n```"
    },
    {
      "id": "les_c4_m3_l2",
      "title": "3.2 Text, Raw Bytes, and Encoding Integrity",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Separate abstract Unicode text (str) from transmitted bytes (bytes), enforce explicit UTF-8 encoding across operating systems, isolate binary artifacts with rb/wb, and surface noisy byte decoding errors visibly.",
      "learning_objectives": [
        "Explain why str holds Unicode characters while bytes hold raw octets requiring an explicit encoding mapping",
        "Specify encoding='utf-8' explicitly across reads and writes to prevent cross-OS platform defaults from silently corrupting logs",
        "Inspect binary evidence safely via read_bytes() / 'rb' mode and handle noisy legacy bytes via errors='replace' with telemetry",
        "Reveal invisible control characters and escape sequences in untrusted text using ascii() or repr()"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-03",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l02_utf8_bytes_vs_ascii_decode.png",
          "caption": "Figure 3.3: Multi-byte UTF-8 encoding of non-ASCII code points versus 7-bit ASCII decoding triggering UnicodeDecodeError.",
          "placement_hint": "After Section 4 (Multi-Byte UTF-8 Encoding vs. Strict ASCII Failure)"
        },
        {
          "id": "fig-04-03-04",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l02_text_vs_binary_file_modes.png",
          "caption": "Figure 3.4: Text I/O newline/encoding translation pipeline versus un-translated binary byte stream access for forensics.",
          "placement_hint": "After Section 5 (Binary Files, Error Strategies, and Control-Character Inspection)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-03",
          "title": "Figure 3.3: How UTF-8 Multi-Byte Text Differs from 7-Bit ASCII",
          "url": "/assets/courses/cyber-04/c04_m03_l02_utf8_bytes_vs_ascii_decode.png",
          "caption": "Figure 3.3: Multi-byte UTF-8 encoding of non-ASCII code points versus 7-bit ASCII decoding triggering UnicodeDecodeError.",
          "alt": "Vertical flow showing 12-character str 'Pune - café\\n' encoding to 13 UTF-8 bytes with 0xC3 0xA9, succeeding under decode('utf-8') and failing with UnicodeDecodeError under decode('ascii')"
        },
        {
          "id": "fig-04-03-04",
          "title": "Figure 3.4: Text Mode vs. Binary Forensics Mode",
          "url": "/assets/courses/cyber-04/c04_m03_l02_text_vs_binary_file_modes.png",
          "caption": "Figure 3.4: Text I/O newline/encoding translation pipeline versus un-translated binary byte stream access for forensics.",
          "alt": "Side-by-side comparison showing Text Mode decoding UTF-8 and translating newlines with error recovery vs Binary Mode passing raw octets 0..255 untouched for pcaps, executables, images, and archives"
        }
      ],
      "lab_resources": [
        {
          "name": "m03_files_data.py",
          "url": "/assets/courses/cyber-04/labs/m03_files_data.py",
          "description": "Module 3 pathlib, CSV, JSON & regex ReDoS lab script"
        }
      ],
      "content": "## 1. Why Confusion Between Text and Bytes Corrupts Evidence\n\nAt the storage and network hardware layer, files contain nothing except sequences of 8-bit numbers (`0..255`) called **bytes**. Characters, accents, logs, and JSON documents only become readable **text** (`str`) when software interprets those raw bytes through an explicit character mapping rule called an **encoding**. When one system exports Unicode filenames or alerts in UTF-8 and a downstream Windows script silently reads them using a single-byte legacy code page—or attempts strict ASCII decoding—logs either crash midway through incident triage or silently mangle non-English usernames and filenames.\n\n## 2. Core Objectives for This Lesson\n\n- **Model Separation:** Distinguish immutable Unicode `str` sequences (`\"café\"`) from raw octet `bytes` objects (`b'caf\\xc3\\xa9'`).\n- **Explicit Encoding Standard:** Always supply `encoding=\"utf-8\"` on `open()`, `.read_text()`, and `.write_text()` calls instead of relying on OS locale defaults.\n- **Binary Preservation (`rb` / `wb`):** Read raw artifacts (packet captures, firmware images, PE executables) exclusively in binary mode without text translation or newline conversion.\n- **Resilient Noise Handling & Inspection:** Recover safely from corrupt log octets using `errors=\"replace\"` (or `\"backslashreplace\"`) with explicit logging, and inspect invisible control bytes cleanly with `ascii()` / `repr()`.\n\n## 3. Two Fundamental Data Representations: `str` vs. `bytes`\n\nKeep Python 3's crisp boundary crystal clear:\n\n- **`str` (Text Sequence):** Ordered sequence of Unicode code points in memory. Each logical character counts as one element regardless of how many bytes it consumes on disk (`len(\"café\") == 4`). Operations like `.lower()`, `.splitlines()`, and regex text matching apply naturally to `str`.\n- **`bytes` (Octet Sequence):** Immutable sequence of raw byte integers (`0..255`), denoted with a leading `b` literal (`b'...'`). You **decode** raw `bytes` into `str` (`raw.decode(\"utf-8\")`) on input, and **encode** `str` into `bytes` (`text.encode(\"utf-8\")`) on output.\n\n## 4. Multi-Byte UTF-8 Encoding vs. Strict ASCII Failure\n\nRun Section 2 of `m03_files_data.py` directly to watch UTF-8 multi-byte encoding and strict 7-bit ASCII failure side by side:\n\n```python\ndata = (\"Pune - caf\" + chr(0xE9) + chr(10)).encode(\"utf-8\")   # e-acute, newline\n(work / \"note.bin\").write_bytes(data)\nprint(\"2. bytes:\", data, \"| decoded:\", ascii((work / \"note.bin\").read_bytes().decode(\"utf-8\").strip()))\ntry:\n    data.decode(\"ascii\")\nexcept UnicodeDecodeError as err:\n    print(\"   ascii decode fails:\", type(err).__name__)\n```\n\n```terminal\n2. bytes: b'Pune - caf\\xc3\\xa9\\n' | decoded: 'Pune - caf\\xe9'\n   ascii decode fails: UnicodeDecodeError\n```\n\nInspect closely what happened at the byte level:\n\n- **ASCII Characters Match 1:1:** Standard letters, spaces, and hyphens (`Pune - caf`) fall within code points `U+0000..U+007F` and encode identically in ASCII and UTF-8 using a single byte per character. Line feed (`chr(10)`) encodes cleanly as `\\n` (`0x0A`).\n- **Non-ASCII Unicode Expands in UTF-8:** Code point `U+00E9` (`é`) lies outside 7-bit ASCII (`> 0x7F`), so UTF-8 encodes it cleanly into the **two-byte sequence `\\xc3\\xa9`**. Counting lengths highlights the difference: `len(\"Pune - café\\n\") == 12` characters, whereas `len(data) == 13` bytes!\n- **ASCII Decoder Rejection:** Because ASCII rejects every byte with its high bit set (`>= 0x80`, i.e., `128..255`), calling `data.decode(\"ascii\")` halts immediately at byte `0xc3` (`195`) with `UnicodeDecodeError`.\n\n> [!WARNING]\n> **Platform Default Trap (`encoding=None`):** Omitting `encoding=\"utf-8\"` inside `open(\"alert.log\")` tells Python to ask the operating system's active locale—often UTF-8 on Linux/macOS, yet frequently single-byte `cp1252` on Windows builds (prior to opt-in UTF-8 mode). A script that runs cleanly on your macOS laptop can suddenly crash with `UnicodeDecodeError` or produce mojibake when deployed on a Windows jump box unless `encoding=\"utf-8\"` is written explicitly!\n\n![Figure 3.3: How UTF-8 Multi-Byte Text Differs from 7-Bit ASCII](/assets/courses/cyber-04/c04_m03_l02_utf8_bytes_vs_ascii_decode.png)\n\n*Figure 3.3: Multi-byte UTF-8 encoding of non-ASCII code points versus 7-bit ASCII decoding triggering UnicodeDecodeError.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Code Point Expansion (`12 Characters` -> `13 Bytes`):** Encoding `\"Pune - café\\n\"` with `.encode(\"utf-8\")` leaves ASCII bytes `1:1` while expanding `é` (`Unicode U+00E9`) into the two bytes `0xC3 0xA9` (`\\xc3\\xa9`) plus `0x0A` (`\\n`).\n- **Decoder Split (`.decode(\"utf-8\")` vs. `.decode(\"ascii\")`):** UTF-8 reconstructs `'Pune - caf\\xe9'` cleanly, whereas 7-bit ASCII accepts only `0..127` and raises `UnicodeDecodeError` immediately upon hitting `0xC3` (`195`).\n- **Portability Habit:** Always pass `encoding=\"utf-8\"` explicitly on `open()`, `read_text()`, and `write_text()`.\n\n## 5. Binary Files, Error Strategies, and Control-Character Inspection\n\nNot every file represents text at all. Attempting to open a `.pcap`, `.exe`, `.png`, `.zip`, or memory dump in text mode without `\"b\"` crashes or silently mangles byte sequences through OS newline translation (`\\r\\n` <-> `\\n`):\n\n- **Binary Forensics Mode (`\"rb\"` / `.read_bytes()`):** Open images, compressed archives, network captures, and hashing inputs strictly in binary mode (`with path.open(\"rb\") as fh:`) so Python hands your parser raw, untouched octets.\n- **Noisy Logs (`errors=\"replace\"` or `\"backslashreplace\"`):** Real-world syslog streams frequently contain corrupted packets or mixed legacy ISO-8859-1 hostnames alongside UTF-8 entries. Passing `open(path, encoding=\"utf-8\", errors=\"replace\")` substitutes undecodable bytes with the Unicode replacement glyph `\\ufffd` (`?`) so ingestion does not abort over a single malformed line—while `errors=\"backslashreplace\"` preserves the exact raw hex bytes as `\\xc3`-style escape text for forensic visibility. Whenever you use error replacement, count or log that replacement characters occurred so analysts know evidence lines were lossy!\n- **Revealing Hidden Escapes with `ascii()` / `repr()`:** Unprintable control characters (`\\r`, `\\x00`, ANSI escape codes `[31m`) become invisible or alter console display when passed directly to `print()`. Wrap suspicious strings in `ascii(text)` or `repr(text)` during investigation—just as `m03_files_data.py` printed `'Pune - caf\\xe9'`—so hidden byte escapes appear plainly on screen.\n\n![Figure 3.4: Text Mode vs. Binary Forensics Mode](/assets/courses/cyber-04/c04_m03_l02_text_vs_binary_file_modes.png)\n\n*Figure 3.4: Text I/O newline/encoding translation pipeline versus un-translated binary byte stream access for forensics.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Text Mode Decoding (`\"r\"` / `\"w\"` + `encoding=\"utf-8\"`):** Applies UTF-8 octet decoding and OS newline conversion (`\\r\\n <-> \\n`) for logs, JSON, and CSVs, using `errors=\"replace\"` or `\"backslashreplace\"` with loss logging and `ascii()` inspection on noisy telemetry.\n- **Binary Forensics Pass-Through (`\"rb\"` / `\"wb\"` / `.read_bytes()`):** Delivers raw octets (`0..255`) with zero character decoding or newline changes so `.pcap`, `.exe`, `.png`, `.zip`, and hash inputs stay byte-exact."
    },
    {
      "id": "les_c4_m3_l3",
      "title": "3.3 CSV Processing and Formula Injection Defense",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Parse RFC 4180 CSV inventories reliably using csv.DictReader with mandatory newline='', avoid fragile string.split(',') parsing, and neutralize CWE-1236 spreadsheet formula injection before exporting security reports.",
      "learning_objectives": [
        "Explain why naive line.split(',') breaks on quoted fields containing commas or embedded newlines",
        "Configure csv.DictReader and csv.DictWriter accurately using newline='' and explicit UTF-8 encodings",
        "Identify how untrusted fields starting with =, +, -, @, tab, or carriage return execute spreadsheet formulas (CSV Injection)",
        "Neutralize untrusted report cells cleanly via leading single-quote prefixing while preserving clean data values"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-05",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l03_csv_dictreader_quoting_mechanics.png",
          "caption": "Figure 3.5: Python csv.DictReader header-to-key mapping and RFC 4180 quoted-field parsing contrasted against broken split(',') logic.",
          "placement_hint": "After Section 3 (Reading Structured CSV Exports with DictReader)"
        },
        {
          "id": "fig-04-03-06",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l03_csv_formula_injection_neutralization.png",
          "caption": "Figure 3.6: Spreadsheet formula injection trigger characters versus safe_cell() neutralisation across Peacock Finance report exports.",
          "placement_hint": "After Section 5 (Case Study: The Report That Attacked Its Reader)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-05",
          "title": "Figure 3.5: Why csv.DictReader Beats Fragile line.split(\",\")",
          "url": "/assets/courses/cyber-04/c04_m03_l03_csv_dictreader_quoting_mechanics.png",
          "caption": "Figure 3.5: Python csv.DictReader header-to-key mapping and RFC 4180 quoted-field parsing contrasted against broken split(',') logic.",
          "alt": "Comparison diagram contrasting line.split(',') breaking a quoted CSV field 'Facilities, Bldg 2' into four columns against csv.DictReader with newline='' preserving headers and quoted commas"
        },
        {
          "id": "fig-04-03-06",
          "title": "Figure 3.6: Stopping CSV Formula Injection with safe_cell()",
          "url": "/assets/courses/cyber-04/c04_m03_l03_csv_formula_injection_neutralization.png",
          "caption": "Figure 3.6: Spreadsheet formula injection trigger characters versus safe_cell() neutralisation across Peacock Finance report exports.",
          "alt": "Comparison diagram showing spreadsheet formula trigger characters (=, +, -, @, tab, return) running attacker formulas on raw export versus safe_cell() prefixing a single quote so spreadsheets render plain text"
        }
      ],
      "lab_resources": [
        {
          "name": "m03_files_data.py",
          "url": "/assets/courses/cyber-04/labs/m03_files_data.py",
          "description": "Module 3 pathlib, CSV, JSON & regex ReDoS lab script"
        }
      ],
      "content": "## 1. Why Comma-Separated Exports Require Real Parsers and Export Hygiene\n\nVulnerability scanners, EDR dashboards, IAM directories, and CMDB asset databases export tabular inventories primarily as **Comma-Separated Values (CSV)**. Because CSV looks deceptively readable in plain text editors, beginners routinely split lines using `line.split(\",\")`. That shortcut collapses silently the instant an asset owner field holds `\"Facilities, Bldg 2\"`, a firewall rule description quotes commas internally, or an audit comment spans embedded line breaks. Simultaneously, any security report written out to CSV for spreadsheet review carries a second hidden threat: **spreadsheet formula injection (CWE-1236)**, turning malicious usernames or HTTP paths into active formulas when an analyst opens the report in Excel or LibreOffice.\n\n## 2. Core Objectives for This Lesson\n\n- **Structured CSV Reading:** Parse tabular files cleanly using `csv.DictReader` while preserving row header semantics.\n- **Mandatory `newline=\"\"` Idiom:** Explain why Python's `csv` module explicitly requires `newline=\"\"` during file opening.\n- **Escaping Naive Splits:** Contrast fragile `line.split(\",\")` heuristics against RFC 4180 quote handling (`\"\"`).\n- **CSV Formula Injection (`CWE-1236`) Defense:** Neutralize untrusted text beginning with `=`, `+`, `-`, `@`, `\\t`, or `\\r` via safe leading single-quote prefixing.\n\n## 3. Reading Structured CSV Exports with `csv.DictReader`\n\nPython's built-in `csv` module handles quoting, delimiters, embedded commas inside quotes, and multi-line field entries automatically. Inspect Section 3 of `m03_files_data.py`:\n\n```python\nassets_csv = work / \"assets.csv\"\nassets_csv.write_text(\n    \"hostname,ip,owner,criticality\\n\"\n    \"web-01,10.0.1.10,IT,high\\n\"\n    \"hr-portal,10.0.2.20,HR,high\\n\"\n    \"printer-3,10.0.9.3,Facilities,low\\n\",\n    encoding=\"utf-8\")\nwith assets_csv.open(newline=\"\", encoding=\"utf-8\") as fh:\n    rows = list(csv.DictReader(fh))\nhigh = [r[\"hostname\"] for r in rows if r[\"criticality\"] == \"high\"]\nprint(\"3. rows:\", len(rows), \"| high criticality:\", high)\n```\n\n```terminal\n3. rows: 3 | high criticality: ['web-01', 'hr-portal']\n```\n\nLook closely at three engineering advantages of `csv.DictReader`:\n\n- **Column Names Over Numeric Indices:** Writing `r[\"criticality\"]` and `r[\"hostname\"]` decouples your logic from physical column placement. If a scanner export swaps column 3 and column 4 next month, index-based code (`row[3]`) breaks silently while `DictReader` continues targeting `\"criticality\"` accurately.\n- **Why `newline=\"\"` Is Mandatory:** Python's built-in file universal-newline layer automatically translates `\\r\\n` to `\\n` unless disabled with `newline=\"\"`. The `csv` module performs its *own* RFC 4180 newline handling so line breaks quoted inside `\"multi\\nline notes\"` stay intact; passing `newline=\"\"` lets `csv.DictReader` and `csv.DictWriter` preserve quoted newlines accurately and avoid doubled blank rows on Windows.\n- **Streaming Large CSV Exports:** Notice `rows = list(...)` works cleanly for a compact 3-row asset table, whereas for a 5-million-row firewall CSV export you should stream `for row in csv.DictReader(fh):` directly without allocating `list(...)`.\n\n![Figure 3.5: Why csv.DictReader Beats Fragile line.split(\",\")](/assets/courses/cyber-04/c04_m03_l03_csv_dictreader_quoting_mechanics.png)\n\n*Figure 3.5: Python csv.DictReader header-to-key mapping and RFC 4180 quoted-field parsing contrasted against broken split(',') logic.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Quoted-Comma Failure (`Unsafe: Naive line.split(\",\")`):** Splitting blindly on every comma breaks `\"Facilities, Bldg 2\"` into `['\"Facilities', ' Bldg 2\"']`, corrupting three columns into four while index lookups (`row[2]`) break whenever column order shifts.\n- **RFC 4180 Header Mapping (`Safe: csv.DictReader (with newline=\"\")`):** Opening with `newline=\"\"` and iterating `csv.DictReader(fh)` builds clean dictionaries (`{\"hostname\": \"web-01\", \"ip\": \"10.0.1.10\", \"owner\": \"Facilities, Bldg 2\"}`), preserving quoted commas/newlines so code reads safely by header name `r[\"owner\"]`.\n\n## 4. Writing Reports Safely Against CSV Formula Injection\n\nWhen an attacker sends a malicious payload inside a HTTP User-Agent string, login username, DNS label, or ticket note—and a defensive Python script exports those untrusted fields unescaped into a `.csv` file—opening that CSV inside Microsoft Excel, Google Sheets, or LibreOffice Calc prompts the spreadsheet engine to **evaluate cells starting with formula prefixes as active formulas** rather than literal text! Classic dangerous leading characters include `=`, `+`, `-`, `@`, horizontal tab (`\\t`), and carriage return (`\\r`).\n\nInspect Section 4 of `m03_files_data.py`, demonstrating how `safe_cell()` neutralizes an untrusted `=HYPERLINK(...)` attack payload before passing rows to `csv.DictWriter`:\n\n```python\ndef safe_cell(value: str) -> str:\n    \"\"\"Prefix a quote if a cell would start a spreadsheet formula.\"\"\"\n    if value and value[0] in (\"=\", \"+\", \"-\", \"@\", \"\\t\", \"\\r\"):\n        return \"'\" + value\n    return value\n\nreport = [{\"user\": \"asha\", \"note\": \"=HYPERLINK(\\\"http://example.com\\\",\\\"click\\\")\"},\n          {\"user\": \"ben\", \"note\": \"normal text\"}]\nout_csv = work / \"report.csv\"\nwith out_csv.open(\"w\", newline=\"\", encoding=\"utf-8\") as fh:\n    writer = csv.DictWriter(fh, fieldnames=[\"user\", \"note\"])\n    writer.writeheader()\n    for row in report:\n        writer.writerow({k: safe_cell(v) for k, v in row.items()})\nprint(\"4.\", out_csv.read_text(encoding=\"utf-8\").splitlines()[1])\n```\n\n```terminal\n4. asha,\"'=HYPERLINK(\"\"http://example.com\"\",\"\"click\"\")\"\n```\n\nTrace every single detail of that serialized output line:\n\n1. **Neutralization (`safe_cell`):** Because `\"=HYPERLINK...\"` starts with `\"=\"`, `safe_cell` prepends `'`, transforming the value into `'=HYPERLINK(\"http://example.com\",\"click\")`.\n2. **Automatic CSV Quoting:** `csv.DictWriter` sees internal commas and double quotes, automatically wraps the whole cell in outer `\"...\"`, and doubles internal quotes (`\"\"`) per RFC 4180.\n3. **Rendering Safety:** Spreadsheet engines strip the leading apostrophe text-escape marker conceptually and display the raw text harmlessly instead of executing external formulas or phishing links.\n\n> [!NOTE]\n> **Negative Numbers & Numeric Columns:** If a strictly numeric column carries legitimate negative numbers (such as `-42` or `-3.5`), validate and emit numeric types selectively where appropriate while keeping `safe_cell()` mandatory across every free-text field (usernames, URLs, paths, alerts, User-Agents). Notice also that `safe_cell` checks `if value` first so empty strings `\"\"` do not raise `IndexError` when accessing `value[0]`!\n\n## 5. Case Study: The Report That Attacked Its Reader\n\nExamine how an unescaped string cell exported from a security audit script transforms a routine spreadsheet report into an attacker payload vector.\n\n### Case Study C04-M03-CS2 (Fictional Teaching Scenario): Peacock Finance\n\n*Disclaimer: This scenario is fictional and illustrates OWASP CSV Injection (CWE-1236) in SOC reporting workflows.*\n\n- **Context:** A SOC engineering script at Peacock Finance exported weekly failed-authentication usernames from Linux bastion hosts into a `.csv` summary report emailed to IT operations managers every Monday morning.\n- **Exploitation:** An external brute-force probe submitted the crafted username string `=HYPERLINK(\"http://phish.example\",\"Reset your account\")` against an SSH/portal endpoint. The Python exporter passed the unescaped username straight into `csv.DictWriter`. When an operations manager opened the CSV attachment in a desktop spreadsheet application, Excel interpreted the active `HYPERLINK` formula directly, hiding the formula syntax and presenting an authoritative clickable `\"Reset your account\"` link inside the official internal SOC report.\n- **Remediation:** The security team deployed `safe_cell()` across every exported text column (`{k: safe_cell(str(v)) for k, v in row.items()}`), added automated unit tests verifying dangerous prefixes (`=`, `+`, `-`, `@`, `\\t`, `\\r`), and updated analyst awareness training emphasizing that external-facing telemetry inside spreadsheet reports must remain untrusted.\n\n![Figure 3.6: Stopping CSV Formula Injection with safe_cell()](/assets/courses/cyber-04/c04_m03_l03_csv_formula_injection_neutralization.png)\n\n*Figure 3.6: Spreadsheet formula injection trigger characters versus safe_cell() neutralisation across Peacock Finance report exports.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Formula Trigger Prefixes (`Top Banner`):** Spreadsheet parsers can evaluate cells starting with `=`, `+`, `-`, `@`, `tab` (`\\t`), or `return` (`\\r`) as active commands.\n- **Unescaped Exposure (`Unsafe Export: Payload Runs!`):** Writing `=HYPERLINK(\"http://example.com\",\"click\")` directly into `report.csv` allows desktop spreadsheet apps to render an active clickable link inside official reports.\n- **Neutralizing Prefix (`Safe Export: safe_cell() Neutralizes Text`):** Prepending a leading single quote `'` produces `asha,'=HYPERLINK(\"http://example.com\",\"click\")`, forcing spreadsheets to display inert plain text."
    },
    {
      "id": "les_c4_m3_l4",
      "title": "3.4 JSON Serialization and Why Never to Unpickle Untrusted Data",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Decode, validate, query with .get(), and serialize JSON telemetry accurately via Python's json module, diagnose JSONDecodeError traps, and reject pickle deserialization on untrusted data boundaries (CWE-502).",
      "learning_objectives": [
        "Map bidirectional conversions accurately across JSON types and Python dict/list/bool/None primitives",
        "Handle optional JSON telemetry keys defensively via .get() and catch malformed syntax cleanly with json.JSONDecodeError",
        "Contrast json.loads() safe passive data construction with pickle bytecode execution leading to arbitrary code execution",
        "Enforce explicit schema validation after parsing structured partner exchange artifacts"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-07",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l04_json_type_mapping_schema.png",
          "caption": "Figure 3.7: Cross-language JSON-to-Python type conversion table, missing-key .get() defense, and strict double-quote syntax validation.",
          "placement_hint": "After Section 3 (JSON Type Mapping, Queries, and Diagnostics)"
        },
        {
          "id": "fig-04-03-08",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l04_json_data_vs_pickle_code_execution.png",
          "caption": "Figure 3.8: Security boundary contrasting passive JSON AST value instantiation against active pickle stack-VM opcode execution.",
          "placement_hint": "After Section 5 (Deserialization Security: Why Never Unpickle Untrusted Inputs)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-07",
          "title": "Figure 3.7: JSON to Python Types, Safe .get(), and Syntax Rules",
          "url": "/assets/courses/cyber-04/c04_m03_l04_json_type_mapping_schema.png",
          "caption": "Figure 3.7: Cross-language JSON-to-Python type conversion table, missing-key .get() defense, and strict double-quote syntax validation.",
          "alt": "Mapping table converting six JSON types (object, array, string, number, true/false, null) to Python equivalents alongside defensive a.get('user', 'n/a') lookups and double-quote syntax validation"
        },
        {
          "id": "fig-04-03-08",
          "title": "Figure 3.8: Safe Passive JSON vs. Executable Pickle Untrusted Risk",
          "url": "/assets/courses/cyber-04/c04_m03_l04_json_data_vs_pickle_code_execution.png",
          "caption": "Figure 3.8: Security boundary contrasting passive JSON AST value instantiation against active pickle stack-VM opcode execution.",
          "alt": "Side-by-side comparison contrasting passive json.loads() decoding plain dict and list structures against pickle.loads() executing stack-VM opcodes like __reduce__ to invoke os.system() or subprocess"
        }
      ],
      "content": "## 1. Exchanging Nested Security Telemetry Cleanly\n\nFlat CSV rows strain quickly when security telemetry becomes hierarchical: one SIEM alert might list an IP, variable optional user keys, nested MITRE ATT&CK technique tags, and arrays of child alerts. **JavaScript Object Notation (JSON)** provides a standardized, human-readable, language-independent text tree that maps almost directly onto Python's core data structures. Yet Python also ships another serialization library—**`pickle`**—whose deceptive convenience creates one of Python's sharpest remote-code-execution traps (`CWE-502`) whenever applied across untrusted boundaries.\n\n## 2. Core Objectives for This Lesson\n\n- **JSON-to-Python Type Mapping:** Translate objects, arrays, booleans, and nulls cleanly via `json.loads` / `json.dumps`.\n- **Resilient Querying & Error Isolation:** Access heterogeneous alert objects safely with `.get()` and handle syntax failures via `json.JSONDecodeError`.\n- **Syntax Discipline:** Recognize common manual JSON errors (single quotes, trailing commas, unquoted keys) vs. valid Python dictionary literals.\n- **Deserialization Security Boundary:** Prove why `json.loads()` constructs passive data safely whereas unpickling untrusted bytes executes attacker-chosen code (`CWE-502`).\n\n## 3. JSON Type Mapping, Queries, and Diagnostics\n\nPython's standard `json` module parses UTF-8 JSON text streams into pure Python data values and serializes supported Python containers cleanly back out:\n\n| JSON Representation | Example JSON Value | Decoded Python Type | Example Python Object |\n| :--- | :--- | :--- | :--- |\n| Object | `{\"id\": 1, \"ok\": true}` | `dict` | `{'id': 1, 'ok': True}` |\n| Array | `[22, 443]` | `list` | `[22, 443]` |\n| String | `\"brute_force\"` | `str` | `'brute_force'` |\n| Number | `7` / `0.95` | `int` / `float` | `7` / `0.95` |\n| Boolean | `true` / `false` | `bool` | `True` / `False` |\n| Null | `null` | `NoneType` | `None` |\n\nInspect Section 5 of `m03_files_data.py` alongside the verified output captured locally:\n\n```python\nalerts_json = work / \"alerts.json\"\nalerts_json.write_text(json.dumps([\n    {\"id\": 1, \"rule\": \"brute_force\", \"src\": \"203.0.113.7\", \"count\": 7},\n    {\"id\": 2, \"rule\": \"new_admin\", \"user\": \"chen\", \"count\": 1},\n], indent=2), encoding=\"utf-8\")\nalerts = json.loads(alerts_json.read_text(encoding=\"utf-8\"))\nprint(\"5.\", [a[\"rule\"] for a in alerts], \"| total events:\", sum(a[\"count\"] for a in alerts))\nprint(\"   first alert has 'user'?\", \"user\" in alerts[0], \"->\", alerts[0].get(\"user\", \"n/a\"))\ntry:\n    json.loads(\"{'single': 'quotes'}\")\nexcept json.JSONDecodeError as err:\n    print(\"   invalid JSON:\", err.msg)\n```\n\n```terminal\n5. ['brute_force', 'new_admin'] | total events: 8\n   first alert has 'user'? False -> n/a\n   invalid JSON: Expecting property name enclosed in double quotes\n```\n\nNotice two crucial defensive coding takeaways here:\n\n- **Inconsistent Schema Keys:** `alerts[0]` carries `\"src\"` and no `\"user\"` key, while `alerts[1]` carries `\"user\"` and no `\"src\"` key. Real SIEM alerts vary constantly between event types; calling `a.get(\"user\", \"n/a\")` prevents unexpected `KeyError` crashes midway through dashboard batching.\n- **`loads`/`dumps` vs. `load`/`dump`:** Append `s` (`loads`, `dumps`) when working with **strings** (`str` in memory); omit `s` (`json.load(fh)`, `json.dump(obj, fh)`) when streaming directly from/to open file handles. Remember also that JSON requires **strict double quotes `\"...\"`**, forbids trailing commas, and forbids `#` comments—Python literals like `{'single': 'quotes'}` immediately trigger `json.JSONDecodeError`.\n\n![Figure 3.7: JSON to Python Types, Safe .get(), and Syntax Rules](/assets/courses/cyber-04/c04_m03_l04_json_type_mapping_schema.png)\n\n*Figure 3.7: Cross-language JSON-to-Python type conversion table, missing-key .get() defense, and strict double-quote syntax validation.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Type Conversion Mapping (`JSON Value -> Python Type`):** Decodes objects `{\"id\": 1}` to `dict`, `[22, 443]` arrays to `list`, strings to `str`, numbers (`7 / 0.95`) to `int / float`, `true / false` to `bool` (`True / False`), and `null` to `None`.\n- **Missing-Key Defense (`Handle Missing Alert Keys with .get()`):** Because `alerts[0]` holds `\"src\"` without `\"user\"`, direct subscripting `a[\"user\"]` throws `KeyError`, whereas `a.get(\"user\", \"n/a\")` safely returns `\"n/a\"`.\n- **Strict Grammar Enforcement (`Strict JSON Syntax Only!`):** Single quotes (`{'single': 'quotes'}`), trailing commas, and `#` comments trigger `json.JSONDecodeError` immediately.\n\n## 4. Schema Validation After Parsing Untrusted JSON\n\nAlthough `json.loads()` never executes code directly, valid JSON can still arrive with unexpected shapes (e.g., an attacker sends an integer `42` or string `\"admin\"` where your code expects a JSON array `[...]`, or embeds deeply nested objects). Always verify expected types (`isinstance(alerts, list)`, key presence, value bounds) *after* `json.loads()` returns—never assume an external API returned a well-typed dictionary without checking.\n\n## 5. Deserialization Security: Why Never Unpickle Untrusted Inputs\n\nIn contrast to JSON, Python's `pickle` module serializes arbitrary Python class graphs into a compact stack-based virtual-machine bytecode stream. When you call `pickle.loads(data)`, the pickle unpickler acts like an interpreter executing opcode instructions—including `__reduce__` instructions capable of calling `os.system`, `subprocess.Popen`, or `eval` automatically *while reconstructing the object*, long before your script inspects the return value!\n\nLook cleanly at Python's official security notice in the `pickle` standard library documentation: **\"The `pickle` module is not secure. Only unpickle data you trust.\"**. Contrast every property before choosing a data interchange format:\n\n| Criterion | `json` (`json.loads`) | `pickle` (`pickle.loads`) |\n| :--- | :--- | :--- |\n| Parsing mechanism | Passive grammar building plain data primitives | **Executes stack-VM callables (`__reduce__` -> RCE / `CWE-502`)** |\n| Interoperability | Cross-language standard (Go, Rust, JS, SIEM APIs) | Python-version / class-path coupled |\n| Partner / API exchange safety | Safe parser (follow with schema validation) | **Critically unsafe across any untrusted or cross-org boundary** |\n| Complex types (`datetime`, `set`, `bytes`) | Convert explicitly (ISO 8601 strings, lists, base64/hex) | Native support (only inside strict self-contained trusted cache boundaries) |\n\nRule of thumb: **exchange data, never code**. Whenever communicating with external partners, reading web payloads, or storing long-lived forensic artifacts across Python versions, serialize strictly with UTF-8 JSON (or validated CSV) paired with SHA-256 or HMAC integrity checks when authenticity matters.\n\n![Figure 3.8: Safe Passive JSON vs. Executable Pickle Untrusted Risk](/assets/courses/cyber-04/c04_m03_l04_json_data_vs_pickle_code_execution.png)\n\n*Figure 3.8: Security boundary contrasting passive JSON AST value instantiation against active pickle stack-VM opcode execution.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Passive Data Decoding (`Safe: json.loads() Parses Data Only`):** Evaluates UTF-8 JSON grammar strictly into plain `dict` and `list` primitives—never invoking functions—ready for structural `isinstance()` verification across API and partner boundaries.\n- **Executable Bytecode Risk (`Danger: pickle.loads() Executes Code!`):** Processes untrusted bytes through a stack virtual-machine engine that runs opcodes such as `__reduce__` *during* load, enabling `os.system()` / `subprocess` remote code execution before caller validation."
    },
    {
      "id": "les_c4_m3_l5",
      "title": "3.5 Regular Expressions and Post-Match Domain Validation",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Build maintainable compiled regular expressions with raw strings, character classes, anchors, non-capturing vs named groups, differentiate greedy vs lazy quantifiers, and validate extracted IPs and ports strictly after matching.",
      "learning_objectives": [
        "Construct compiled patterns via re.compile() using raw r'...' literals, anchors (^, $, \\b), and escaping",
        "Extract fields ergonomically via named groups (?P<name>...) and omit noisy capture clutter via non-capturing groups (?:...)",
        "Distinguish greedy (* / +) from lazy (*? / +?) matching cleanly across delimited tags or fields",
        "Enforce semantic validation (ipaddress, parse_port) after regex shape matching so invalid octets like 999.1.1.1 are rejected"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-09",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l05_sshd_named_regex_anatomy.png",
          "caption": "Figure 3.9 (C04-M03-F2): Token-by-token anatomy of the compiled sshd failed-password regex highlighting named and non-capturing groups.",
          "placement_hint": "After Section 4 (Parsing sshd Logs with Compiled Named Groups)"
        },
        {
          "id": "fig-04-03-10",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l05_greedy_vs_lazy_and_validation.png",
          "caption": "Figure 3.10: Greedy <.*> versus lazy <.*?> matching scope and mandatory post-regex semantic validation filtering 999.1.1.1.",
          "placement_hint": "After Section 5 (Greedy vs. Lazy Quantifiers and Post-Regex Validation)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-09",
          "title": "Figure 3.9: Token-by-Token Anatomy of the sshd Regex Pattern",
          "url": "/assets/courses/cyber-04/c04_m03_l05_sshd_named_regex_anatomy.png",
          "caption": "Figure 3.9 (C04-M03-F2): Token-by-token anatomy of the compiled sshd failed-password regex highlighting named and non-capturing groups.",
          "alt": "Six color-coded token cards breaking down the sshd regex pattern from anchored ^(?P<ts>\\S+) and escaped sshd\\[\\d+\\]: through optional (?:invalid user )? and named captures user, ip, and port up to $"
        },
        {
          "id": "fig-04-03-10",
          "title": "Figure 3.10: Greedy vs. Lazy Quantifiers & Post-Regex Validation",
          "url": "/assets/courses/cyber-04/c04_m03_l05_greedy_vs_lazy_and_validation.png",
          "caption": "Figure 3.10: Greedy <.*> versus lazy <.*?> matching scope and mandatory post-regex semantic validation filtering 999.1.1.1.",
          "alt": "Two-panel comparison contrasting greedy r'<.*>' vs lazy r'<.*?>' on '<a><b>' alongside a two-stage IP validation pipeline rejecting '999.1.1.1' and port '999999' via ValueError after regex shape matching"
        }
      ],
      "content": "## 1. Extracting Structured Signals from Messy Plain-Text Logs\n\nCountless security data sources—Linux SSH daemon logs, firewall drops, proxy headers, and custom appliance outputs—do not arrive neatly formatted as JSON or CSV. Instead, critical observables (`timestamp`, `username`, `src_ip`, `src_port`) sit embedded inside irregular human-readable sentences. Python's standard `re` module lets analysts write concise pattern extractors that parse exact structures out of unstructured text—provided we pair pattern precision with mandatory post-match semantic validation.\n\n## 2. Core Objectives for This Lesson\n\n- **Core Regex Building Blocks:** Combine character classes (`\\d`, `\\S`, `\\w`), anchors (`^`, `$`, `\\b`), quantifiers (`*`, `+`, `?`, `{m,n}`), and raw `r\"...\"` strings without backslash corruption.\n- **Grouping Architecture:** Extract named dictionaries smoothly via `(?P<name>...)` while keeping optional helper phrases noise-free using `(?:...)`.\n- **Greedy vs. Lazy Semantics:** Predict accurately when `<.*>` swallows across multiple tags versus when `<.*?>` stops cleanly at the earliest closing boundary.\n- **Shape vs. Validity Separation:** Explain why regex patterns check **textual shape** only and require post-match checks (`ipaddress.ip_address()`, `parse_port()`) to reject invalid inputs like `999.1.1.1`.\n\n## 3. Essential Regex Tokens and Raw String Discipline\n\nAlways construct regular expressions using Python **raw string literals (`r\"...\"`)**. Inside ordinary strings, Python interprets `\\b` as ASCII Backspace (`0x08`) and `\\d` cleanly or unpredictably depending on sequence; prefixing `r` guarantees every backslash reaches `re.compile()` verbatim:\n\n- **Character Classes:** `\\d` (digit `[0-9]`), `\\w` (word character—letters, digits, underscore), `\\s` (whitespace), `\\S` (any non-whitespace character), `.` (any character except newline by default), and custom sets `[abc]` or negated sets `[^abc]`.\n- **Anchors (Zero-Width Positions):** `^` (start of string/line), `$` (end of string/line), and `\\b` (word boundary preventing `10.0.0.1` inside `9910.0.0.123` from falsely matching).\n- **Quantifiers:** `*` (0 or more), `+` (1 or more), `?` (0 or 1 optional), `{m,n}` (between $m$ and $n$ repetitions).\n- **Grouping Constructs:** `(...)` standard capture group, `(?:...)` **non-capturing group** (groups tokens for repetition or alternation without polluting `.groups()`), `(?P<name>...)` **named capture group** (`m[\"ip\"]`), and `|` alternation.\n\n## 4. Parsing `sshd` Logs with Compiled Named Groups\n\nInspect Section 6 of `m03_files_data.py`, compiling a single crisp pattern once outside the loop before matching each line of `auth.log`:\n\n```python\npattern = re.compile(\n    r\"^(?P<ts>\\S+) sshd\\[\\d+\\]: Failed password for (?:invalid user )?\"\n    r\"(?P<user>\\S+) from (?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3}) port (?P<port>\\d+)$\"\n)\nfor line in log_file.read_text(encoding=\"utf-8\").splitlines():\n    m = pattern.match(line)\n    if m:\n        print(\"6.\", m.group(\"ts\")[11:19], m[\"user\"], m[\"ip\"], int(m[\"port\"]))\n```\n\n```terminal\n6. 10:01:02 asha 203.0.113.7 50122\n6. 10:01:09 admin 203.0.113.7 50130\n6. 10:03:10 asha 198.51.100.23 40001\n```\n\nWalk piece by piece across Figure 3.9 (`C04-M03-F2`) to see why every character matters:\n\n1. **`^(?P<ts>\\S+)`:** Anchors cleanly to column 0 (`^`) and captures non-whitespace timestamp characters into group `\"ts\"`.\n2. **`sshd\\[\\d+\\]:`:** Escapes literal brackets (`\\[` and `\\]`), matching exact PID tags such as `sshd[811]:`. Remember unescaped `[` opens a character set!\n3. **`(?:invalid user )?`:** Optional **non-capturing** group handling line 2 (`Failed password for invalid user admin ...`—classic account enumeration probe!) without inserting an awkward `None` / `\"invalid user \"` group slot between timestamp and username.\n4. **`(?P<user>\\S+)`:** Captures `\"asha\"` cleanly on normal accounts and `\"admin\"` cleanly when preceded by `invalid user `.\n5. **`(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3})`:** Matches four 1–3 digit blocks separated by escaped dots (`\\.`)—again using non-capturing `(?:...)` for the repeated `.octet` blocks so `.findall()` returns clean strings rather than single trailing octets!\n6. **`port (?P<port>\\d+)$`:** Anchors cleanly to `$` at line end, matching digits into `\"port\"`.\n\nNotice the subtle difference between **`re.match()`**, **`re.search()`**, and **`re.findall()`**: `pattern.match(line)` only attempts matching starting at index `0` (already implied when leading `^` is present), `pattern.search(line)` scans anywhere across the line for the first match, and `pattern.findall(text)` returns a list of every non-overlapping match string (returning only group values if capturing parentheses appear).\n\n![Figure 3.9: Token-by-Token Anatomy of the sshd Regex Pattern](/assets/courses/cyber-04/c04_m03_l05_sshd_named_regex_anatomy.png)\n\n*Figure 3.9 (C04-M03-F2): Token-by-token anatomy of the compiled sshd failed-password regex highlighting named and non-capturing groups.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Six Color-Coded Pattern Components:** Splits the sample `sshd[811]` entry across `^(?P<ts>\\S+)` (anchored start + timestamp `ts`), `sshd\\[\\d+\\]:` (escaped literal PID brackets), `(?:invalid user )?` (optional non-capturing probe prefix), `(?P<user>\\S+)` (`\"admin\"`), `(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3})` (`\"203.0.113.7\"`), and `port (?P<port>\\d+)$` (`\"50130\"` anchored at line end `$`).\n- **Pre-Compiled Raw Pattern Usage:** Authoring raw `r\"...\"` strings and pre-compiling once via `re.compile()` lets parsers retrieve extracted fields directly through `m[\"user\"]`, `m[\"ip\"]`, and `m[\"port\"]`.\n\n## 5. Greedy vs. Lazy Quantifiers and Post-Regex Validation\n\nObserve lines 103–106 of `m03_files_data.py`:\n\n```python\nprint(\"   findall IPs:\", sorted(set(re.findall(r\"\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b\",\n                                             log_file.read_text(encoding=\"utf-8\")))))\nprint(\"   greedy:\", re.search(r\"<.*>\", \"<a><b>\").group(), \"| lazy:\",\n      re.search(r\"<.*?>\", \"<a><b>\").group())\n```\n\n```terminal\n   findall IPs: ['10.20.4.17', '198.51.100.23', '203.0.113.7']\n   greedy: <a><b> | lazy: <a>\n```\n\nBy default, `*`, `+`, and `{m,n}` are **greedy**: `<.*>` consumes as far right as possible while still allowing a final `>`, spanning all the way from `<` in `<a>` to `>` in `<b>`. Appending `?` (`*?`, `+?`) selects **lazy (non-greedy)** matching: `<.*?>` stops at the earliest `>`, capturing strictly `<a>`.\n\n> [!IMPORTANT]\n> **Regex Checks Text Shape—Never Domain Validity:** Look closely at `\\d{1,3}(?:\\.\\d{1,3}){3}` above. That shape pattern matches `\"203.0.113.7\"` cleanly, **yet it equally matches `\"999.1.1.1\"` or `\"000.888.999.001\"`**, and `port (?P<port>\\d+)` happily captures `\"999999\"`! Never treat a regex match alone as proof of valid network telemetry. Always follow extraction immediately with semantic validators (`ipaddress.ip_address(m[\"ip\"])`, `parse_port(m[\"port\"])`) inside a `try / except ValueError` guard before storing results or triggering firewall blocks!\n\n![Figure 3.10: Greedy vs. Lazy Quantifiers & Post-Regex Validation](/assets/courses/cyber-04/c04_m03_l05_greedy_vs_lazy_and_validation.png)\n\n*Figure 3.10: Greedy <.*> versus lazy <.*?> matching scope and mandatory post-regex semantic validation filtering 999.1.1.1.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Quantifier Scope (`1. Greedy vs. Lazy Matching`):** On `\"<a><b>\"`, greedy `r\"<.*>\"` stretches across both elements up to the final `>` (`\"<a><b>\"`), whereas lazy `r\"<.*?>\"` stops at the earliest closing `>` to capture `\"<a>\"`.\n- **Two-Stage Validation (`2. Shape Check Is NOT Enough!`):** Digit-shape regex allows both `\"203.0.113.7\"` and `\"999.1.1.1\"`; applying `ipaddress.ip_address()` and `parse_port()` afterward accepts `\"203.0.113.7\"` while raising `ValueError` to reject `\"999.1.1.1\"` and port `\"999999\"`."
    },
    {
      "id": "les_c4_m3_l6",
      "title": "3.6 Regex Performance, Catastrophic Backtracking, and ReDoS Defense",
      "duration": "55 mins",
      "is_mandatory": true,
      "summary": "Diagnose exponential NFA backtracking (CWE-1333 / ReDoS), measure real O(2^n) runtime scaling, dissect the 27-minute July 2, 2019 Cloudflare global WAF outage, and engineer linear-time alternatives.",
      "learning_objectives": [
        "Explain how backtracking NFA engines explore exponential branch permutations on near-matching failure strings",
        "Measure timing collapse empirically between nested quantifiers ^(a+)+$ and flat ^a+$ patterns across growing lengths",
        "Analyze root causes, impact (27-minute downtime, 3,868 rules audited), and remediations from the July 2, 2019 Cloudflare outage",
        "Eliminate nested/overlapping quantifiers, bound untrusted string lengths, and adopt linear-time engines (RE2) for user regexes"
      ],
      "diagram_slots": [
        {
          "id": "fig-04-03-11",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l06_redos_backtracking_growth_curve.png",
          "caption": "Figure 3.11 (C04-M03-F3): Execution-tested exponential CPU growth on ^(a+)+$ versus constant-microsecond linear execution on ^a+$.",
          "placement_hint": "After Section 3 (Measuring Exponential Backtracking Empirically)"
        },
        {
          "id": "fig-04-03-12",
          "asset_path": "/assets/courses/cyber-04/c04_m03_l06_nfa_backtracking_vs_dfa_re2.png",
          "caption": "Figure 3.12: Backtracking NFA search-tree explosion contrasted against deterministic linear-time DFA/RE2 scanning and ReDoS defenses.",
          "placement_hint": "After Section 5 (Case Study: The July 2019 Cloudflare Global WAF Outage)"
        }
      ],
      "images": [
        {
          "id": "fig-04-03-11",
          "title": "Figure 3.11: Exponential ReDoS Growth vs. Flat Regex Speed",
          "url": "/assets/courses/cyber-04/c04_m03_l06_redos_backtracking_growth_curve.png",
          "caption": "Figure 3.11 (C04-M03-F3): Execution-tested exponential CPU growth on ^(a+)+$ versus constant-microsecond linear execution on ^a+$.",
          "alt": "Side-by-side timing plots comparing nested ^(a+)+$ surging from 0.008 s at n=18 to 0.036 s at n=20 and 0.132 s at n=22 (~9.6 hours at n=40) against flat ^a+$ failing in 0.000038 s at n=22"
        },
        {
          "id": "fig-04-03-12",
          "title": "Figure 3.12: Backtracking NFA Explosion vs. Linear RE2 & ReDoS Defenses",
          "url": "/assets/courses/cyber-04/c04_m03_l06_nfa_backtracking_vs_dfa_re2.png",
          "caption": "Figure 3.12: Backtracking NFA search-tree explosion contrasted against deterministic linear-time DFA/RE2 scanning and ReDoS defenses.",
          "alt": "Comparison of a backtracking NFA engine retrying overlapping paths backward on r'^(\\w+\\s?)+$' (citing the 27-minute July 2, 2019 Cloudflare global outage) against linear O(n) RE2 scanning on r'^\\w+(?:\\s\\w+)*$' and four Python ReDoS defenses"
        }
      ],
      "lab_resources": [
        {
          "name": "m03_files_data.py",
          "url": "/assets/courses/cyber-04/labs/m03_files_data.py",
          "description": "Module 3 pathlib, CSV, JSON & regex ReDoS lab script"
        },
        {
          "name": "m03_output.txt",
          "url": "/assets/courses/cyber-04/labs/m03_output.txt",
          "description": "Module 3 expected synthetic lab output sample"
        }
      ],
      "content": "## 1. When One Benign-Looking Regular Expression Brings Down a Network\n\nRegular expressions are routinely treated purely as syntax helpers, yet their execution time is itself a critical **availability and denial-of-service property**. An innocent pattern containing overlapping or nested quantifiers can scan benign log strings in microseconds while exploding into exponential CPU deadlock—known as **Regular Expression Denial of Service (ReDoS, CWE-1333)**—the instant a deliberately near-matching string or crafted HTTP header forces Python's backtracking engine through billions of failed combinations.\n\n## 2. Core Objectives for This Lesson\n\n- **Backtracking NFA Mechanics:** Explain why Python's standard `re` engine tries alternative splits when a pattern fails near the end of a string.\n- **Exponential Scaling Proof:** Measure real microsecond-to-hour blowups empirically using `m03_files_data.py` (`^(a+)+$` vs. `^a+$`).\n- **Real-World Incident Forensics:** Analyze the July 2, 2019 Cloudflare global WAF outage (`27 minutes`, `3,868` audited rules, migration to linear-time engines).\n- **Engineering Linear-Time Defenses:** Refactor nested quantifiers safely, anchor patterns cleanly, impose input byte caps, and isolate or swap engines (`RE2` / Rust `regex`) on untrusted paths.\n\n## 3. Measuring Exponential Backtracking Empirically\n\nExamine Section 7 of `m03_files_data.py`, safely bounded at $n \\in \\{18, 20, 22\\}$ characters so the demonstration finishes cleanly in under one second:\n\n```python\nevil = re.compile(r\"^(a+)+$\")\nfor n in (18, 20, 22):\n    start = time.perf_counter()\n    evil.match(\"a\" * n + \"b\")          # cannot match; backtracks exponentially\n    elapsed = time.perf_counter() - start\n    print(f\"7. n={n}: {elapsed:.3f} s\")\nsafe = re.compile(r\"^a+$\")\nstart = time.perf_counter()\nsafe.match(\"a\" * 22 + \"b\")\nprint(f\"   simple pattern n=22: {time.perf_counter() - start:.6f} s\")\n```\n\nInspect our verified Python 3.12.4 lab capture alongside CPython 3.14.4 reference runs (`0.009 s -> 0.032 s -> 0.127 s`, `0.000004 s` simple pattern):\n\n```terminal\n7. n=18: 0.008 s\n7. n=20: 0.036 s\n7. n=22: 0.132 s\n   simple pattern n=22: 0.000038 s\n```\n\nWhy did appending just two extra `'a'` characters roughly **quadruple** execution time every step while switching to `^a+$` dropped runtime by over three thousand times? On string `\"a\" * n + \"b\"`, the trailing `\"b\"` makes matching `$` impossible—yet the backtracking engine must prove *every single way* of partitioning $n$ `'a'` characters among the outer `(...)+` repetitions of `a+` fails before admitting no match! Across $n$ identical `'a'` characters, there exist $2^{n-1}$ distinct partition combinations (each cut between characters either starts a new outer group or stays in the current inner `a+`).\n\n### Mathematical Scaling Analysis\n\nLet us extrapolate the verified timing benchmark mathematically to understand why security scanners freeze for hours on tiny payloads:\n\n:::math-steps\nStep 01: Model worst-case branch count for nested quantifier pattern on mismatch string\n$$T(n) \\propto 2^{n-1}$$\nResult: Increasing length by two characters multiplies work by four (matching 0.008 -> 0.036 -> 0.132 s)\n\nStep 02: Extrapolate runtime at n = 40 using the measured t(22) = 0.132 s baseline\n$$t(40) \\approx t(22) \\times 2^{40 - 22} = 0.132\\text{ s} \\times 2^{18} = 0.132 \\times 262{,}144 \\approx 34{,}603\\text{ s}$$\nResult: Just 40 characters stall a single worker thread for roughly 9.6 hours whereas a flat pattern runs in microseconds\n:::\n\n![Figure 3.11: Exponential ReDoS Growth vs. Flat Regex Speed](/assets/courses/cyber-04/c04_m03_l06_redos_backtracking_growth_curve.png)\n\n*Figure 3.11 (C04-M03-F3): Execution-tested exponential CPU growth on ^(a+)+$ versus constant-microsecond linear execution on ^a+$.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Nested Pattern `^(a+)+$` (`n = 18` to `n = 22`):** On `\"a\" * n + \"b\"`, measured runtime climbs sharply across `n = 18` (`0.008 s`), `n = 20` (`0.036 s`), and `n = 22` (`0.132 s`)—roughly **4x slower per +2 characters**, extrapolating to **~9.6 hours** at `n = 40`.\n- **Flat Pattern `^a+$` & Root Mechanism:** At `n = 22`, `^a+$` finishes in `0.000038 s` (over **3,400x faster**). Whereas `^(a+)+$` explores $2^{n-1}$ ways to partition `'a'` characters before admitting the trailing `'b'` fails, flat `^a+$` rejects cleanly on the very first mismatch pass.\n\n## 4. Eliminating Catastrophic Patterns in Practice\n\nSpotting ReDoS hinges on recognizing **nested quantifiers** (`(a+)+`, `(.*a)*`, `(\\w+\\s?)+`) and **overlapping alternations under repetition** (`([a-zA-Z]+|[a-zA-Z]+_)+`). Consider the practical rewrite explored in Practical P2 (`C04-M03-P2`):\n\n- **Vulnerable Word-List Pattern:** `r\"^(\\w+\\s?)+$\"` — notice `\\s?` is *optional* (0 spaces), meaning consecutive words with no spaces allow two `\\w+` groups to partition `\"wordwordword\"` in $O(2^n)$ exponential ways upon encountering `\"!\"` at the end!\n- **Safe Non-Ambiguous Rewrite:** `r\"^\\w+(?:\\s\\w+)*$\"` — here the separator `\\s` inside `(?:\\s\\w+)*` is **mandatory** between word groups, forcing a unique boundary before every repeated block and holding runtime strictly linear!\n\n## 5. Case Study: Cloudflare Global Outage (July 2, 2019)\n\nGlobal production incidents prove that even a single catastrophic backtracking expression can exhaust host CPU cores across distributed edge infrastructure.\n\n### Case Study C04-M03-CS1: One Regular Expression Halted Worldwide HTTP Traffic\n\n- **Context:** Cloudflare's global Web Application Firewall (WAF) executes curated regex signatures inline against HTTP/HTTPS requests across millions of customer web properties worldwide.\n- **Incident Sequence (UTC):** According to Cloudflare's post-incident report, at `13:42 UTC` on July 2, 2019, engineering deployed a single managed WAF rule update containing a sub-expression that matched `.` and backtracked excessively (`.*(?:.*=.*)` style overlapping wildcards) on normal incoming HTTP payloads. CPU utilization spiked globally toward 100% across edge servers handling HTTPS traffic. At `14:07 UTC`, Cloudflare bypassed the WAF globally; CPU and traffic stabilized by `14:09 UTC` after a **27-minute global outage**.\n- **Technical & Process Root Causes:** An internal CPU-protection safeguard (watchdog timer) had inadvertently been stripped during an earlier refactoring, and rules deployed globally at once instead of staged canary rollouts.\n- **Remediation & Four Permanent Defenses:** Cloudflare restored CPU safeguards immediately, audited all **3,868** existing WAF regex rules manually for backtracking hazards, instituted worst-case regex performance benchmarking in CI tests alongside staged rollouts, and initiated migration toward linear-time finite-automata regex engines (**Google RE2** / Rust `regex`, which guarantee $O(n)$ linear runtime proportional strictly to input size with zero exponential backtracking).\n\nApply the identical four-layer defense inside Python services:\n\n1. **Eliminate Ambiguous Quantifiers:** Never nest quantifiers over overlapping character sets (`(a+)+`, `(\\w+\\s?)+`).\n2. **Anchor Explicitly & Cap Input Lengths:** Reject abnormally long header/field strings (`if len(line) > MAX_LEN:`) *before* passing untrusted text to `re.match()`.\n3. **Test Worst-Case Failure Strings (`\"a\"*n + \"!\"`):** Remember patterns often run fast on valid inputs yet explode only on *near-matching* invalid payloads!\n4. **Use RE2 / Timeout Subprocesses for User-Supplied Patterns:** Never let untrusted analysts or portal users execute arbitrary Python `re` strings in a shared web worker process; either bind Google's `re2` (`google-re2`) for guaranteed linear-time execution or isolate matching inside a dedicated time-bounded child worker.\n\n![Figure 3.12: Backtracking NFA Explosion vs. Linear RE2 & ReDoS Defenses](/assets/courses/cyber-04/c04_m03_l06_nfa_backtracking_vs_dfa_re2.png)\n\n*Figure 3.12: Backtracking NFA search-tree explosion contrasted against deterministic linear-time DFA/RE2 scanning and ReDoS defenses.*\n\n#### Visual Walkthrough & Architectural Breakdown\n\n- **Backtracking NFA vs. Linear RE2:** A vulnerable nested pattern (`r\"^(\\w+\\s?)+$\"`) branches across overlapping paths and retries backward repeatedly, whereas an unambiguous pattern (`r\"^\\w+(?:\\s\\w+)*$\"`) or **RE2** scans left-to-right once in $O(n)$ time with zero backtracking CPU lockups.\n- **Incident Proof & Four Defenses:** The July 2, 2019 Cloudflare outage spiked global CPUs to 100% for 27 minutes from a single backtracking rule; Python services prevent this by eliminating nested quantifiers like `(a+)+`, rejecting overly long inputs before `re.match()`, testing mismatch payloads (`\"a\"*n + \"!\"`) in CI, and running user-supplied patterns under `google-re2` or subprocess timeouts.\n\n## 6. Module 3 Practical Labs\n\nExecute both labs cleanly on synthetic datasets inside your local practice folder (`c04-m03`).\n\n### Practical C04-M03-P1: Run and Extend the Safe Data Pipeline\n\n- **Objective:** Extend `m03_files_data.py` to parse both failed and successful SSH events cleanly, enforce post-regex semantic IP validation, serialize JSON summaries, and neutralize exported CSV alerts.\n- **Step-by-Step Procedure:**\n  1. Run `python m03_files_data.py` directly and cross-check all 8 sections against our captured terminal transcript (`0. working folder created: True` .. `8. cleaned up: True`).\n  2. Add a second compiled regex extracting `Accepted publickey for (?P<user>\\S+) from (?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3})` lines and confirm it reports successful login `ben` from `10.20.4.17`.\n  3. Pass every regex-extracted IP string through `ipaddress.ip_address()` inside `try / except ValueError:` and prove forged octets like `999.1.1.1` are rejected visibly.\n  4. Before cleanup (`shutil.rmtree`), write a JSON summary (`{\"failures\": {...}, \"successes\": {...}}`) using `json.dumps(..., indent=2)` and print its parsed keys cleanly.\n  5. Export per-user failure totals to a CSV report via `csv.DictWriter` with `newline=\"\"` and `safe_cell()` shielding every text cell.\n\n### Practical C04-M03-P2: Measure and Eliminate Catastrophic Backtracking\n\n- **Objective:** Measure exponential runtime explosion on a ReDoS-prone word pattern and prove linear speed after refactoring.\n- **Authorised Scope Boundary:** Keep test input lengths at **$n \\le 24$** on your personal machine (`Ctrl+C` interrupts longer runs immediately).\n- **Step-by-Step Procedure:**\n  1. Using `time.perf_counter()`, measure `re.match(r\"^(a+)+$\", \"a\" * n + \"b\")` for $n \\in \\{16, 18, 20, 22, 24\\}$.\n  2. Tabulate observed times and confirm each $+2$ increment roughly quadruples elapsed duration.\n  3. Benchmark `r\"^a+$\"` across the identical input lengths and compare microsecond speed.\n  4. Measure the vulnerable space-optional word pattern `r\"^(\\w+\\s?)+$\"` on `\"word \" * 15 + \"!\"`, rewrite it with mandatory inter-word delimiters (`r\"^\\w+(?:\\s\\w+)*$\"`), and confirm near-zero millisecond execution on the identical mismatch string.\n\n## 7. Module 3 Consolidated Revision\n\nConsolidate file-streaming safeguards, encoding checks, CSV/JSON serialization rules, and ReDoS boundaries before advancing to Operating System Automation.\n\n### Core Technical Takeaways\n\n- **Resource & Evidence Safety:** Use `pathlib.Path`, `with path.open(..., encoding=\"utf-8\")`, line-by-line streaming for huge logs, read-only handling of raw evidence, `tempfile.mkdtemp()` scratch folders, and `resolve().is_relative_to()` path traversal checks.\n- **Encoding Explicitness:** Treat bytes (`bytes`) and Unicode text (`str`) distinctly; pass `encoding=\"utf-8\"` universally on text streams, `\"rb\"` on binaries, `errors=\"replace\"` + audit counts on messy logs, and `ascii()` / `repr()` for raw inspection.\n- **Safe Structured Formats:** Read CSV with `csv.DictReader` + `newline=\"\"` and scrub exported cells via `safe_cell()` against `=`, `+`, `-`, `@`, `\\t`, `\\r` formula triggers; serialize telemetry via `json`, check shapes post-decode, and strictly ban `pickle` across untrusted boundaries.\n- **Precision Parsing & ReDoS Immunity:** Author raw compiled patterns (`r\"...\"`) with named groups, distinguish greedy (`*`) from lazy (`*?`) scope, semantically validate extracted values (`ipaddress`, port bounds), and eliminate nested quantifiers (`^(a+)+$`, `(\\w+\\s?)+`) via linear alternatives, length limits, and `RE2`.\n\n### Quick Revision Checkpoints\n\n1. Write a compiled regex matching `\"user=NAME ip=IP\"` tokens via named groups, then write the follow-up Python code verifying extracted IP octets validly represent an IPv4/IPv6 host.\n2. Explain specifically why omitting `newline=\"\"` inside `open(..., mode=\"w\")` breaks `csv.DictWriter` outputs containing quoted line breaks or creates blank rows on Windows.\n3. Contrast `json.loads(payload)` and `pickle.loads(payload)` across interoperability, schema safety, and arbitrary code execution risk (`CWE-502`).\n4. List three independent engineering controls learned from the July 2, 2019 Cloudflare outage to protect a Python log search portal supporting custom patterns."
    }
  ]
};
