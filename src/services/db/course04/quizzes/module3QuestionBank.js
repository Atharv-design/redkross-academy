/**
 * Course 04: Python for Cybersecurity — Module 3 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module3QuestionBank = [
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
  },
  {
    "id": "q_c4_m3_021",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "When `json.loads()` decodes a JSON array containing `true` and `null`, what corresponding Python values does it return?",
    "options": [
      "`'true'` and `'null'` strings",
      "`True` and `None`",
      "`1` and `0`",
      "`True` and `{}`"
    ],
    "correct": 1,
    "explanation": "JSON `true`/`false` decode directly to Python `True`/`False`, and JSON `null` decodes to Python `None`."
  },
  {
    "id": "q_c4_m3_022",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, `json.loads(\"{'single': 'quotes'}\")` failed cleanly with `JSONDecodeError: Expecting property name enclosed in double quotes`. Which additional syntactic pattern valid inside Python dicts ALSO fails strict JSON parsing?",
    "options": [
      "Integer values with negative signs like `{\"temp\": -5}`",
      "Unicode escape sequences like `\"caf\\u00e9\"`",
      "Empty lists `[]`",
      "Trailing commas after the final item (`{\"a\": 1,}`) and `#` comments inside the JSON text"
    ],
    "correct": 3,
    "explanation": "RFC 8259 JSON forbids single quotes, trailing commas, `True`/`None` casing, and comments."
  },
  {
    "id": "q_c4_m3_023",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "How does `m03_files_data.py` safely inspect the optional `'user'` field on `alerts[0]` without crashing with `KeyError` when `'user'` is absent?",
    "options": [
      "`alerts[0].user`",
      "`alerts[0].get('user', 'n/a')`",
      "`alerts[0]['user']`",
      "`alerts[0].find('user')`"
    ],
    "correct": 1,
    "explanation": "SIEM alert payloads frequently vary by rule type; `.get(key, default)` safely handles missing optional keys."
  },
  {
    "id": "q_c4_m3_024",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Compare `json.loads(untrusted)` versus `pickle.loads(untrusted)` at an API boundary receiving alert bundles from an external partner organization. Why is `pickle.loads()` critically unsafe?",
    "options": [
      "`json.loads()` automatically verifies HMAC signatures",
      "`pickle` converts dictionaries silently into tuples",
      "`pickle` compresses payloads beyond 4 GB",
      "`pickle` can embed stack-VM opcodes invoking `__reduce__`, executing arbitrary Python/OS commands automatically during deserialization (`CWE-502`)"
    ],
    "correct": 3,
    "explanation": "Deserializing untrusted pickle streams yields immediate arbitrary code execution before inspection code ever runs; exchange passive JSON with schema validation instead."
  },
  {
    "id": "q_c4_m3_025",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Distinguish Python's `json.load()` vs `json.loads()` functions accurately.",
    "options": [
      "`loads()` streams from open file objects; `load()` parses strings",
      "`loads()` parses an in-memory JSON `str` (`bytes`/`str`); `load()` reads directly from a file-like handle",
      "`loads()` validates schemas automatically; `load()` does not",
      "`load()` is deprecated in Python 3.12"
    ],
    "correct": 1,
    "explanation": "Remember the trailing `'s'` stands for **string**: `loads`/`dumps` take/return strings, whereas `load`/`dump` read/write open file handles."
  },
  {
    "id": "q_c4_m3_026",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Notice that `json.loads('null')` or `json.loads('\"hello\"')` succeeds without raising `JSONDecodeError`. Why must defensive parsers still inspect parsed types before iterating alerts?",
    "options": [
      "`json.loads()` casts integers into booleans silently",
      "`json.loads()` only parses top-level objects `{...}`",
      "`json.loads()` executes JavaScript snippets inside strings",
      "`json.loads()` returns valid primitive roots (`None`, `str`, `int`) or unexpected nested types without crashing, so missing `isinstance(data, list)` checks trigger later `TypeError`/`AttributeError` bugs"
    ],
    "correct": 3,
    "explanation": "JSON safety means no code execution, NOT valid business schema—always check container types, required keys, and value domains post-parse."
  },
  {
    "id": "q_c4_m3_027",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "Why should Python regular expressions always be written as raw string literals (`r\"\\b\\d+\"`)?",
    "options": [
      "Raw strings run 10x faster inside C loops",
      "Raw strings prevent Python from interpreting sequences like `\\b` (backspace) or `\\n` before `re` sees the literal backslashes",
      "Regular expressions crash with `SyntaxError` unless prefixed with `r`",
      "`r\"...\"` disables greedy matching automatically"
    ],
    "correct": 1,
    "explanation": "In non-raw strings, `\\b` turns into ASCII byte `0x08` instead of reaching the regex engine as a word boundary token."
  },
  {
    "id": "q_c4_m3_028",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`'s sshd regex, notice `(?:invalid user )?` and `(?:\\.\\d{1,3}){3}`. What bug or nuisance would happen in `re.findall()` if `(?:...)` were replaced with plain capturing groups `(...)`?",
    "options": [
      "The regex fails to compile completely",
      "Named groups `(?P<user>...)` become unreadable",
      "`(...)` matches case-insensitively automatically",
      "`findall()` switches from returning full matched IP strings to returning ONLY the captured inner fragments (e.g., last octet `'.7'`!) and shifts numeric capture indices"
    ],
    "correct": 3,
    "explanation": "`re.findall()` alters its return behavior dramatically whenever capturing groups `(...)` exist inside the pattern—returning captured tuple fragments rather than whole matches!"
  },
  {
    "id": "q_c4_m3_029",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "In `pattern.match(line)` with named groups `(?P<user>\\S+)`, how does `m03_files_data.py` read the matched username concisely?",
    "options": [
      "`m['user']` (or `m.group('user')`)",
      "`m.user`",
      "`m.groups['user']`",
      "`m.find('user')`"
    ],
    "correct": 0,
    "explanation": "`re.Match` supports both `m.group('user')` and clean bracket lookup `m['user']` since Python 3.6."
  },
  {
    "id": "q_c4_m3_030",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Consider the sshd regex snippet `r'(?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3})'`. A malicious log entry contains `from 999.888.777.666 port 99999`. Does the regex match, and what defensive rule does this highlight?",
    "options": [
      "No, `re` detects octets over 255 natively",
      "It matches `'999.888.777.666'` only as a lazy match",
      "It matches only if anchors `^$` are omitted",
      "Yes, the regex matches shape cleanly! Always follow extraction with semantic validation (`ipaddress.ip_address(...)` and `0 <= port <= 65535`)"
    ],
    "correct": 3,
    "explanation": "Regular expressions verify character **shape** (`1-3 digits` separated by dots), NOT numeric byte range `0..255` or valid network addresses."
  },
  {
    "id": "q_c4_m3_031",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "Given string `'<a><b>'`, compare what `re.search(r'<.*>', text).group()` versus `re.search(r'<.*?>', text).group()` returns.",
    "options": [
      "Both return `'<a>'`",
      "Greedy returns `'<a>'`; lazy returns `'<a><b>'`",
      "Greedy `<.*>` returns `'<a><b>'`; lazy `<.*?>` returns `'<a>'`",
      "Lazy `<.*?>` raises `AttributeError`"
    ],
    "correct": 2,
    "explanation": "Greedy `*` consumes as far right as possible while still satisfying trailing `>`; lazy `*?` stops at the first `>` closing `'<a>'`."
  },
  {
    "id": "q_c4_m3_032",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Compare `pattern.match(text)` vs `pattern.search(text)` when `pattern = re.compile(r'port (\\d+)')` lacks a leading `^` anchor and `text = 'Failed password from 203.0.113.7 port 50122'`. What happens?",
    "options": [
      "Both find `'50122'` identically",
      "`match()` returns `None` because `'port '` is not at index 0 of `text`, whereas `search()` scans forward and matches `'port 50122'`",
      "`search()` raises `ValueError` unless `^` is present",
      "`match()` searches backwards from `$`"
    ],
    "correct": 1,
    "explanation": "Remember `re.match()` anchors implicitly at string index `0`, whereas `re.search()` finds the first occurrence anywhere inside `text`."
  },
  {
    "id": "q_c4_m3_033",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "What does CWE-1333 (`ReDoS` — Regular Expression Denial of Service) describe?",
    "options": [
      "A pattern whose backtracking search explores exponential paths on near-matching inputs, exhausting CPU",
      "Buffer overflow inside compiled C regex parsers",
      "Using raw strings inside file open functions",
      "SQL injection triggered by escaped regex quotes"
    ],
    "correct": 0,
    "explanation": "Catastrophic backtracking on crafted near-match strings freezes application worker threads at 100% CPU."
  },
  {
    "id": "q_c4_m3_034",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, testing `re.compile(r'^(a+)+$').match('a' * n + 'b')` took `0.008 s` at `n=18`, `0.036 s` at `n=20`, and `0.132 s` at `n=22`. Extrapolating cleanly with $2^{\\Delta n}$, roughly how long would a mere `n=40` mismatch string stall that single thread?",
    "options": [
      "About `0.5 seconds`",
      "About `12 seconds`",
      "Instantly (`0.000038 s`) because `n > 30` triggers Python NFA pruning",
      "Over `9 hours` (`~34,600 seconds`, scaling by $2^{18} = 262,144\\times$)"
    ],
    "correct": 3,
    "explanation": "Doubling steps per extra char scales work as $2^{n-1}$; adding 18 chars multiplies runtime by $2^{18} = 262,144\\times$, turning 0.13s into ~9.6 hours."
  },
  {
    "id": "q_c4_m3_035",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "How long did the July 2, 2019 Cloudflare global WAF outage triggered by a backtracking regex rule last?",
    "options": [
      "5 seconds",
      "6 hours",
      "27 minutes (13:42 to 14:09 UTC)",
      "3 days"
    ],
    "correct": 2,
    "explanation": "Cloudflare's incident post-mortem documented a 27-minute global outage followed by an audit of 3,868 rules and migration toward linear-time regex engines."
  },
  {
    "id": "q_c4_m3_036",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "In Practical P2, why does `r'^(\\w+\\s?)+$'` backtrack exponentially on `'word ' * 15 + '!'`, whereas `r'^\\w+(?:\\s\\w+)*$'` finishes in constant-rate microseconds?",
    "options": [
      "Non-capturing `(?:...)` switches Python from NFA to DFA automatically",
      "Making `\\s?` optional allows adjacent `\\w+` repetitions with zero delimiter to partition any uninterrupted word in $2^{k}$ ways, whereas mandatory `\\s` forces deterministic token boundaries",
      "Ending with `*` never backtracks in Python",
      "`!` is ignored inside `(?:\\s\\w+)*`"
    ],
    "correct": 1,
    "explanation": "Mandatory separating tokens (`\\s` before `\\w+`) eliminate ambiguous partition points between consecutive repetitions."
  },
  {
    "id": "q_c4_m3_037",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Why did Cloudflare plan migration toward engines such as Google's `RE2` or Rust's `regex` for evaluating WAF rules?",
    "options": [
      "They use deterministic finite-automata algorithms guaranteeing linear $O(n)$ runtime without catastrophic backtracking",
      "They allow recursive backreferences more easily",
      "They skip validating UTF-8 headers",
      "They auto-patch Python 2 runtimes"
    ],
    "correct": 0,
    "explanation": "Finite-automata engines track active NFA states in parallel across a single pass over the string, guaranteeing immunity from exponential backtracking."
  },
  {
    "id": "q_c4_m3_038",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Your security portal permits analysts to submit custom log-search regexes in a shared Flask web server. Beside moving to `google-re2`, what additional defensive engineering layers stop one malicious pattern from freezing all users?",
    "options": [
      "Run user regexes without length limits using Python's `re` on HTTP request threads directly",
      "Replace `re.compile()` with `re.search()` on raw strings",
      "Use `eval()` to rewrite regexes faster",
      "Enforce strict input line-length caps prior to matching, run untrusted searches inside isolated subprocesses with wall-clock timeouts, and restrict who can execute custom searches"
    ],
    "correct": 3,
    "explanation": "Defense-in-depth pairs linear-time `RE2` execution with bounded input length, isolated subprocess timeouts, and least-privilege query authorization."
  },
  {
    "id": "q_c4_m3_039",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, how does `log_file.stat().st_size` report the size of `auth.log` (`422 bytes`)?",
    "options": [
      "Reads every character in the file and sums lengths",
      "Counts only printable ASCII letters",
      "Queries OS file metadata via `os.stat` without loading file contents into Python memory",
      "Compresses the file temporarily first"
    ],
    "correct": 2,
    "explanation": "`Path.stat()` retrieves filesystem inode/directory byte size instantly in O(1) without reading the file bytes."
  },
  {
    "id": "q_c4_m3_040",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, why did `safe_cell` test `('\\t', '\\r')` alongside `('=', '+', '-', '@')` before CSV export?",
    "options": [
      "CSV headers prohibit tabs cleanly",
      "Leading whitespace control characters (`\\t`, `\\r`) can hide a trailing `=CMD(...)` or trick certain spreadsheet parsers into re-evaluating formula prefixes cleanly",
      "`DictWriter` crashes on `\\t` unless prefixed",
      "Excel treats `\\t` strictly as JSON"
    ],
    "correct": 1,
    "explanation": "OWASP's current CSV Injection standard explicitly includes tab (`\\t`) and carriage return (`\\r`) alongside `= + - @` as active formula/trigger prefixes."
  },
  {
    "id": "q_c4_m3_041",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "Which `Path` attribute returns just the filename extension (for example `'.log'`) from `Path('/var/log/auth.log')`?",
    "options": [
      "`p.suffix`",
      "`p.name`",
      "`p.stem`",
      "`p.parent`"
    ],
    "correct": 0,
    "explanation": "`p.suffix` gives `'.log'`, `p.stem` gives `'auth'`, `p.name` gives `'auth.log'`, and `p.parent` gives `Path('/var/log')`."
  },
  {
    "id": "q_c4_m3_042",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Consider writing `target = work / '/etc/passwd'` in Python `pathlib`. What surprising path does `target` actually resolve to?",
    "options": [
      "`work` joined inside `/tmp/rk-m03-.../etc/passwd`",
      "`work` joined with `_etc_passwd`",
      "Raises `ValueError` immediately",
      "`Path('/etc/passwd')`! When an operand after `/` begins with a root slash (`/` or `C:\\`), `pathlib` discards the left base path completely!"
    ],
    "correct": 3,
    "explanation": "Critical `pathlib` security gotcha: joining an untrusted string starting with `/` (`work / '/etc/passwd'`) discards `work`! Always `.resolve()` and check `.is_relative_to(base)`."
  },
  {
    "id": "q_c4_m3_043",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "How do you convert a Python `str` variable `msg = 'alert'` into UTF-8 `bytes` before writing to a network socket or binary digest?",
    "options": [
      "`msg.decode('utf-8')`",
      "`bytes(msg)` without arguments",
      "`msg.encode('utf-8')`",
      "`ascii(msg)`"
    ],
    "correct": 2,
    "explanation": "Text (`str`) is converted *to* raw octets via `.encode('utf-8')`; bytes are converted *to* text via `.decode('utf-8')`."
  },
  {
    "id": "q_c4_m3_044",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py` lines 28–31: notice the first open used `log_file.open('w', encoding='utf-8', newline='\\n')`, producing `422` bytes even on Windows 11. What size change occurs if `newline='\\n'` were omitted on Windows?",
    "options": [
      "Zero bytes change on all operating systems",
      "Windows default text I/O converts each `'\\n'` into `'\\r\\n'` (`CRLF`), growing a 5-line file by +5 bytes (from 422 to 427 bytes) and altering cryptographic hashes cross-OS",
      "File shrinks to 417 bytes",
      "`stat().st_size` reports characters instead of bytes"
    ],
    "correct": 1,
    "explanation": "Controlling `newline='\\n'` keeps line endings deterministic across Windows and Linux, ensuring identical byte counts and SHA-256 checksums."
  },
  {
    "id": "q_c4_m3_045",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "When exporting dictionaries via `csv.DictWriter(fh, fieldnames=['user', 'note'])`, which method writes the column title header line into the CSV?",
    "options": [
      "`writer.writeheader()`",
      "`writer.writerow()`",
      "`writer.headers = True`",
      "`writer.init()`"
    ],
    "correct": 0,
    "explanation": "Calling `writer.writeheader()` explicitly writes the configured `fieldnames` as the opening CSV header row."
  },
  {
    "id": "q_c4_m3_046",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "If a dictionary passed to `csv.DictWriter(fh, fieldnames=['host', 'owner'])` unexpectedly contains an extra key `'notes'` from an upstream JSON alert, what happens by default unless configured otherwise?",
    "options": [
      "Python silently ignores `'notes'` cleanly",
      "Writes `None` into `'owner'`",
      "`DictWriter` creates a 3rd unnamed column dynamically",
      "Python raises `ValueError: dict contains fields not in fieldnames: 'notes'` (default `extrasaction='raise'`)"
    ],
    "correct": 3,
    "explanation": "Default `extrasaction='raise'` enforces strict export column control; pass `extrasaction='ignore'` or curate explicit normalized row dicts first."
  },
  {
    "id": "q_c4_m3_047",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Which exception does Python's `json.loads()` raise when passed malformed JSON text such as missing quotes or trailing commas?",
    "options": [
      "`SyntaxError`",
      "`TypeError`",
      "`json.JSONDecodeError` (a subclass of `ValueError`)",
      "`LookupError`"
    ],
    "correct": 2,
    "explanation": "`json.JSONDecodeError` subclasses `ValueError` and provides `.msg`, `.lineno`, and `.colno` diagnostics cleanly."
  },
  {
    "id": "q_c4_m3_048",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Suppose an engineer receives an object `{'ports': {22, 443}, 'ts': datetime.now(timezone.utc)}` and calls `json.dumps(obj)`. Why does this fail, and what clean transformation prepares Python-only sets/timestamps for portable JSON exchange?",
    "options": [
      "`json.dumps` ignores sets silently",
      "`json` natively handles only primitive JSON structures (`dict`, `list`, `str`, `int`, `float`, `bool`, `None`); convert sets via `sorted(ports)` lists and datetimes via `.isoformat()` strings",
      "Use `pickle.dumps()` inside JSON headers",
      "Pass `encoding='ascii'` to convert sets automatically"
    ],
    "correct": 1,
    "explanation": "Canonicalizing sets into sorted lists and `datetime` objects into ISO 8601 UTC strings keeps cross-language JSON clean and deterministic."
  },
  {
    "id": "q_c4_m3_049",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "In `r'^(?P<ts>\\S+) sshd\\[\\d+\\]:'`, why are the square brackets around `\\d+` escaped as `\\[` and `\\]`?",
    "options": [
      "Without escaping, unescaped `[\\d+]` starts a character class matching single characters (`d`, `+`, digit) instead of literal brackets `[811]`",
      "Brackets define named capture groups automatically",
      "Unescaped brackets disable raw strings",
      "Square brackets match word boundaries"
    ],
    "correct": 0,
    "explanation": "`[...]` is a regex metacharacter denoting a character class; matching literal `[` or `]` in log headers requires `\\[` and `\\]`."
  },
  {
    "id": "q_c4_m3_050",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py` line 103: `re.findall(r'\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b', text)`. Why did the author add `\\b` word boundaries at both ends of the IP regex?",
    "options": [
      "`\\b` forces case-insensitive matching",
      "`\\b` converts IPv4 strings into IPv6 automatically",
      "`\\b` instructs `re` to allow newlines inside octets",
      "Without `\\b`, `'1234.5.6.7890'` would silently match the interior substring `'234.5.6.789'`, producing forged IPs sliced out of longer digit tokens or OIDs"
    ],
    "correct": 3,
    "explanation": "`\\b` stops malformed numbers (`1234.5.6.7890`) or version identifiers (`202610.0.1.5`) from yielding misleading truncated IP fragments."
  },
  {
    "id": "q_c4_m3_051",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "What simple refactor converts the vulnerable pattern `r'^(a+)+$'` into a pattern that handles arbitrarily long `'a' * 10000 + 'b'` strings in microseconds?",
    "options": [
      "`r'^(a*)+$'`",
      "`r'^(a+|a)+$'`",
      "`r'^a+$'` (removing redundant nested quantifier wrapping)",
      "`r'^([a]+)+$'`"
    ],
    "correct": 2,
    "explanation": "`^a+$` matches identically without nested branching, dropping mismatch inspection from exponential $O(2^n)$ down to instant fail."
  },
  {
    "id": "q_c4_m3_052",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Look at the two other vulnerable regex tropes: `(.*a)*` and `(?:[a-z]+|[a-z0-9]+)+$`. Why do BOTH risk catastrophic backtracking on crafted inputs?",
    "options": [
      "Both avoid anchoring at `^`",
      "Both combine repetition over an outer group containing overlapping inner quantifiers (`.*`, `[a-z]+` vs `[a-z0-9]+`), giving the engine exponential ways to re-slice a non-matching input",
      "Both require `re.MULTILINE` flags",
      "Character sets `[a-z]` only run in single threads"
    ],
    "correct": 1,
    "explanation": "Ambiguous inner choices wrapped inside outer `+` or `*` loops always risk exponential backtracking explosion on trailing mismatch characters."
  },
  {
    "id": "q_c4_m3_053",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In Practical P1 (`m03_files_data.py` extension), after regex parsing `Accepted publickey for ben from 10.20.4.17 port 51022`, what validation verifies `10.20.4.17` safely?",
    "options": [
      "`ipaddress.ip_address(ip)` inside `try / except ValueError:`",
      "`ip.count('.') == 3`",
      "`int(ip)`",
      "`safe_cell(ip)`"
    ],
    "correct": 0,
    "explanation": "`ipaddress.ip_address()` strictly rejects malformed octets such as `999.1.1.1` cleanly with `ValueError`."
  },
  {
    "id": "q_c4_m3_054",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py` line 101: `print('6.', m.group('ts')[11:19], m['user'], m['ip'], int(m['port']))`. If a forged log line somehow reads `port 99999`, does `re` reject it or pass it onward—and how do you fix that cleanly?",
    "options": [
      "`re` rejects integers > 65535 natively",
      "Replace `\\d+` with `\\d{2}`",
      "`m['port']` converts integers automatically",
      "`\\d+` matches `99999` cleanly and `int('99999')` succeeds! Pass `m['port']` through Module 2's `parse_port()` enforcing `0 <= port <= 65535`"
    ],
    "correct": 3,
    "explanation": "Every regex-extracted numeric token (`port`, `status`, `pid`, `bytes`) should pass explicit boundary checks after extraction."
  },
  {
    "id": "q_c4_m3_055",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, how did the final cleanup line verify its temporary workspace was completely removed (`8. cleaned up: True`)?",
    "options": [
      "`work.unlink()` followed by `work.is_file()`",
      "`work.rmdir()` without deleting files inside",
      "`shutil.rmtree(work)` followed by `not work.exists()`",
      "`del work`"
    ],
    "correct": 2,
    "explanation": "`Path.rmdir()` only deletes empty directories; `shutil.rmtree(work)` removes the non-empty directory tree cleanly before asserting `not work.exists()`."
  },
  {
    "id": "q_c4_m3_056",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "An investigator runs `with evidence.open('r', encoding='utf-8') as fh: lines = fh.read().splitlines()`. Later, the forensic archive proves `evidence` has CRLF vs LF differences across Linux copies. Why did calling `evidence.read_bytes()` preserve exact cryptographic evidence hashes better?",
    "options": [
      "Text mode deletes trailing blank lines",
      "Text-mode `open('r')` translates `\\r\\n` line endings into `'\\n'` by default unless `newline=''` or binary mode (`'rb'` / `.read_bytes()`) is used, changing hashed content!",
      "`.read_bytes()` converts UTF-8 to Latin-1",
      "`.read_bytes()` compresses whitespace"
    ],
    "correct": 1,
    "explanation": "Universal newline normalization in text mode silently modifies `\\r\\n` -> `\\n`, skewing SHA-256 chain-of-custody verification unless read cleanly in binary mode."
  },
  {
    "id": "q_c4_m3_057",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Notice line 40 of `m03_files_data.py`: `data = ('Pune - caf' + chr(0xE9) + chr(10)).encode('utf-8')`. What characters do `chr(0xE9)` and `chr(10)` represent?",
    "options": [
      "Small Latin `e` with acute accent (`é`) and newline (`\\n`)",
      "Euro sign `€` and space",
      "Null byte and carriage return",
      "Greek pi and tab"
    ],
    "correct": 0,
    "explanation": "Code point `0xE9` (`233`) is `'é'`, and code point `10` (`0x0A`) is ASCII Line Feed (`'\\n'`)."
  },
  {
    "id": "q_c4_m3_058",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Suppose a script decodes raw packet capture HTTP payload bytes using `.decode('utf-8', errors='backslashreplace')`. Why might forensics engineers choose `'backslashreplace'` over `'replace'`?",
    "options": [
      "`backslashreplace` deletes corrupted bytes completely",
      "`backslashreplace` converts every character into Base64",
      "`backslashreplace` preserves exact non-UTF-8 byte values visually (like `\\xff` instead of generic `?`), preventing loss of raw binary indicator evidence during triage!",
      "`replace` raises exceptions on invalid ASCII"
    ],
    "correct": 2,
    "explanation": "While `'replace'` collapses distinct bad bytes to uniform `\\ufffd`, `'backslashreplace'` displays exact hex escapes cleanly for artifact analysis."
  },
  {
    "id": "q_c4_m3_059",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "When filtering `rows = list(csv.DictReader(fh))` from `assets.csv` in `m03_files_data.py`, what Python comprehension extracted `['web-01', 'hr-portal']`?",
    "options": [
      "`[r[0] for r in rows if r[3] == 'high']`",
      "`rows.filter('high')`",
      "`{r['hostname'] for r in rows}`",
      "`[r['hostname'] for r in rows if r['criticality'] == 'high']`"
    ],
    "correct": 3,
    "explanation": "Each row yielded by `DictReader` is a dictionary keyed by CSV header column names (`'hostname'`, `'criticality'`)."
  },
  {
    "id": "q_c4_m3_060",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "A defender updates `safe_cell()` to strip `'='` characters (`value.lstrip('=')`) instead of prefixing a single quote `\"'\"`. Why is stripping inferior for security audit exports?",
    "options": [
      "Prefixing `'` neutralizes execution **without** corrupting raw forensic indicator text—stripping deletes `'='` characters from real Base64 padding, query params (`?token=abc`), or attacker strings!",
      "Leading `'` fails completely in LibreOffice",
      "`lstrip('=')` executes formulas inside Python",
      "Stripping turns CSV files into JSON"
    ],
    "correct": 0,
    "explanation": "Forensic audit exports should neutralize viewer interpretation rather than altering captured payload indicators silently."
  },
  {
    "id": "q_c4_m3_061",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, how did the script sum total alert events across `[{'count': 7}, {'count': 1}]` cleanly?",
    "options": [
      "`len(alerts)`",
      "`sum(a['count'] for a in alerts)`",
      "`alerts.count()`",
      "`sum(alerts)`"
    ],
    "correct": 1,
    "explanation": "Generator expression `sum(a['count'] for a in alerts)` aggregates integer counts across decoded dicts cleanly in O(1) extra memory."
  },
  {
    "id": "q_c4_m3_062",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "A partner team suggests speeding up internal API exchange by streaming compressed `pickle` blobs over HTTPS using TLS authentication instead of JSON. Under what realistic threat condition does `pickle` STILL present unacceptable blast radius?",
    "options": [
      "TLS automatically decrypts `pickle` to JSON on the wire",
      "`pickle` cannot store integers over 65535",
      "Compromising ANY single upstream producer account, signing bug, or intermediate queue immediately escalates to full remote code execution inside every downstream Python consumer!",
      "`pickle` crashes whenever strings contain `'é'`"
    ],
    "correct": 2,
    "explanation": "Zero-trust system architecture avoids parsing formats with embedded code-execution semantics across service boundaries whenever passive data formats like JSON suffice."
  },
  {
    "id": "q_c4_m3_063",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "What does the quantifier `{1,3}` mean inside `\\d{1,3}`?",
    "options": [
      "Match digit `1` or digit `3` only",
      "Match literal `{1,3}` characters",
      "Match at least 3 digits followed by 1 letter",
      "Match between 1 and 3 consecutive digits greedily"
    ],
    "correct": 3,
    "explanation": "Bounded repetition `{m,n}` requires at least $m$ and at most $n$ repetitions of the preceding atom."
  },
  {
    "id": "q_c4_m3_064",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, line 95–96 anchors the sshd regex with leading `^` AND trailing `$`. Suppose someone omits `$` on `port (?P<port>\\d+)` and parses `'... port 50122 ssh2'`. Even worse, suppose a log line reads `'... port 22 extra=malicious'`. How does omitting `$` break precision vs keeping it?",
    "options": [
      "Keeping `$` guarantees the entire line conforms from start to finish; omitting `$` silently matches partial prefixes while ignoring trailing injected tokens on forged lines!",
      "Omitting `$` prevents `port` from matching entirely",
      "`$` enables multiline matching implicitly",
      "Without `$`, named groups return integers instead of strings"
    ],
    "correct": 0,
    "explanation": "Full-line anchoring (`^...$`) enforces strict schema conformance across the entire log line so unexpected trailing suffixes cause explicit non-match rather than silent partial capture."
  },
  {
    "id": "q_c4_m3_065",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "When benchmarking worst-case regex performance in `m03_files_data.py`, why did the author test `'a' * n + 'b'` rather than `'a' * n`?",
    "options": [
      "`'b'` causes syntax errors in `re`",
      "`'a' * n` succeeds on the very first greedy attempt, whereas trailing `'b'` forces exhaustion of ALL failing backtrack combinations!",
      "`'a' * n` runs exponentially slower than `'b'`",
      "`re.compile()` only matches letters up to `'b'`"
    ],
    "correct": 1,
    "explanation": "Catastrophic backtracking occurs specifically on near-matching failure inputs where the engine finds a partial match and repeatedly tries every partition before failing."
  },
  {
    "id": "q_c4_m3_066",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Look at Cloudflare's July 2019 outage post-mortem findings: how many existing WAF rules did engineers manually audit right after recovering, and what process failures amplified a single bad regex into global downtime?",
    "options": [
      "12 rules; mitigated by changing UTF-8 defaults",
      "200 rules; caused by `pickle.loads()` inside DNS",
      "3,868 rules; amplified by prior removal of a CPU watchdog safeguard and deploying a single global push instead of staged rollouts!",
      "500,000 rules; triggered by `newline=''` errors"
    ],
    "correct": 2,
    "explanation": "Technical safeguards (watchdog/linear engine), rule audits (3,868 rules), CI performance benchmarks, and staged rollouts work together to contain availability blasts."
  },
  {
    "id": "q_c4_m3_067",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, `m.group('ts')[11:19]` slices `'2026-11-07T10:01:02Z'`. What value does `[11:19]` extract?",
    "options": [
      "`'2026-11-07'`",
      "`'T10:01:02'`",
      "`'10:01:02Z'`",
      "`'10:01:02'`"
    ],
    "correct": 3,
    "explanation": "Indices `0..10` span `'2026-11-07T'`; half-open slice `[11:19]` captures exactly `'10:01:02'`."
  },
  {
    "id": "q_c4_m3_068",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "During Practical P1 cleanup inspection, an analyst inserts a breakpoint *before* `shutil.rmtree(work)` to inspect `alerts.json` cleanly, then cancels via `Ctrl+C` before `shutil.rmtree(work)` runs. What pattern prevents leaked temporary artifacts on script aborts?",
    "options": [
      "Put `shutil.rmtree(work)` inside a `finally:` block or use `with tempfile.TemporaryDirectory(prefix='rk-m03-') as tmp:` context manager!",
      "Pass `cleanup=True` to `open()`",
      "Put `shutil.rmtree()` at the top of the file",
      "Use `pickle` instead of `mkdtemp`"
    ],
    "correct": 0,
    "explanation": "`tempfile.TemporaryDirectory()` acts as an automatic `with` context manager that deletes temporary folders deterministically on normal exit OR error."
  },
  {
    "id": "q_c4_m3_069",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "If `p = Path('/var/log/nginx/access.log')`, what does `p.parent.name` return?",
    "options": [
      "`'/var/log/nginx'`",
      "`'nginx'`",
      "`'access.log'`",
      "`'var'`"
    ],
    "correct": 1,
    "explanation": "`p.parent` is `Path('/var/log/nginx')`, and its `.name` component string is `'nginx'`."
  },
  {
    "id": "q_c4_m3_070",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Suppose two monitoring processes concurrently append alerts to `/var/log/sec.log` using `'a'` mode in separate Python interpreters. Should logs ever mix arbitrary mid-line, or how should structured multi-worker telemetry safely isolate records?",
    "options": [
      "Opening with `'a'` guarantees transaction locking across infinite megabytes",
      "Pass `safe=True` to `Path.open()`",
      "Concurrent `'w'`/`'a'` writers can interleave partial large buffers or corrupt JSON arrays; route workers through atomic queue/syslog sockets or per-worker unique log files (`tempfile`/`PID`)",
      "Use `read_text()` simultaneously across threads"
    ],
    "correct": 2,
    "explanation": "Plain file appends lack application-level multi-line atomicity for large payloads; dedicated sockets/syslog or per-worker atomic files prevent mangled logs."
  },
  {
    "id": "q_c4_m3_071",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Why must `b'abc' == 'abc'` evaluate to `False` in Python 3?",
    "options": [
      "Strings sort alphabetically before bytes",
      "Comparison requires lowercase `str`",
      "`b'abc'` is actually 4 bytes long",
      "`bytes` (raw octets) and `str` (Unicode code points) are distinct, non-equivalent types to prevent silent encoding bugs"
    ],
    "correct": 3,
    "explanation": "Strict Python 3 separation between raw `bytes` and decoded `str` prevents Python 2-era implicit encoding mixing bugs."
  },
  {
    "id": "q_c4_m3_072",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "An external log file begins with three hex bytes `EF BB BF` before `timestamp,user`. If opened with `encoding='utf-8'`, what subtle failure breaks column lookup `row['timestamp']` in `csv.DictReader`?",
    "options": [
      "UTF-8 leaves the invisible Byte Order Mark (`\\ufeff`) prepended to the first column header (`'\\ufefftimestamp'`), causing `KeyError: 'timestamp'`—solved cleanly using `encoding='utf-8-sig'`!",
      "Python throws `MemoryError` immediately",
      "`EF BB BF` converts commas into tabs",
      "`DictReader` strips all characters before index 3"
    ],
    "correct": 0,
    "explanation": "Excel-exported UTF-8 CSVs frequently start with a UTF-8 BOM (`\\ufeff`); passing `encoding='utf-8-sig'` strips optional BOM cleanly on read."
  },
  {
    "id": "q_c4_m3_073",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "Which standard-library class writes Python dictionaries cleanly as rows matching declared `fieldnames` in a CSV file?",
    "options": [
      "`csv.ListWriter`",
      "`csv.DictWriter`",
      "`json.CsvEncoder`",
      "`pathlib.TableWriter`"
    ],
    "correct": 1,
    "explanation": "`csv.DictWriter` aligns dictionary keys against `fieldnames` and automates RFC 4180 delimiter and quote escaping."
  },
  {
    "id": "q_c4_m3_074",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Why can prefixing `' '` (space) before `'=HYPERLINK(...)'` instead of `\"'\"` (single quote) sometimes FAIL to neutralize spreadsheet injection across every tool?",
    "options": [
      "Spaces raise `SyntaxError` in Python strings",
      "Spaces convert CSV files into TSV",
      "Some spreadsheet importers strip leading whitespace before checking `=`, whereas a leading single-quote `'` forces text mode explicitly while remaining visibly neutralized across cells",
      "Excel treats `' '` as multiplication"
    ],
    "correct": 2,
    "explanation": "Following OWASP/CWE-1236 defense guidance cleanly, escaping dangerous prefixes (`=`, `+`, `-`, `@`, `\\t`, `\\r`) with leading `'` (plus stripping risky leading control chars if needed) stays robust."
  },
  {
    "id": "q_c4_m3_075",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "In `json.dumps(alerts, indent=2)`, what does the `indent=2` argument achieve?",
    "options": [
      "Truncates nested dictionaries to 2 levels deep",
      "Strips optional keys missing from `alerts[0]`",
      "Multiplies every integer count by 2",
      "Pretty-prints nested objects and arrays cleanly with 2-space indentation per level"
    ],
    "correct": 3,
    "explanation": "Formatting human-auditable JSON config/evidence files with `indent=2` greatly improves incident readability."
  },
  {
    "id": "q_c4_m3_076",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Suppose a web webhook sends JSON payload `{\"amount\": 100, \"amount\": 0}` with duplicate keys, OR sends deeply nested arrays `[...1000 levels...]`. What defensive checks guard a Python JSON consumer against parsing surprises?",
    "options": [
      "Validate payload byte size before calling `json.loads()`, guard against `RecursionError` on deep nesting, and verify strict numeric ranges/schema after parsing (since `json.loads` silently keeps the last duplicate key!)",
      "`json.loads()` rejects duplicate keys by default automatically",
      "Switch immediately to `pickle.loads()`",
      "Disable UTF-8 checks on webhooks"
    ],
    "correct": 0,
    "explanation": "Python's default `json.loads` keeps later duplicate keys without error; checking payload size limits and validating post-parse object invariants prevents parser smuggling and resource exhaustion."
  },
  {
    "id": "q_c4_m3_077",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "In regex syntax, what does the character token `\\S+` match?",
    "options": [
      "One or more whitespace characters (spaces, tabs)",
      "One or more non-whitespace characters",
      "Zero or more uppercase letters only",
      "Literal backslash followed by `'S'`"
    ],
    "correct": 1,
    "explanation": "Uppercase shorthand classes invert lowercase ones: `\\s` = whitespace, `\\S` = any non-whitespace character."
  },
  {
    "id": "q_c4_m3_078",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Look carefully at `.` inside `re.compile(r'<.*>')`. Given `'<a>\\n<b>'`, does `r'<.*>'` span across the newline `\\n` by default?",
    "options": [
      "Yes, `.` always matches newlines",
      "`re.search` strips newlines automatically",
      "No! By default in Python, `.` matches any character **EXCEPT** `'\\n'`, so `<.*>` stops on line 1 unless `re.DOTALL` is explicitly enabled",
      "`. ` matches digits only"
    ],
    "correct": 2,
    "explanation": "Knowing whether `re.DOTALL` is off (default) prevents subtle missed multi-line payload extractions OR unexpected cross-line ReDoS bloat when turning `re.DOTALL` on unnecessarily."
  },
  {
    "id": "q_c4_m3_079",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Why should fixed regex patterns used inside a loop over 1,000,000 log lines be created with `re.compile(...)` outside the loop?",
    "options": [
      "`re.compile()` bypasses all Python backtracking",
      "`re.compile()` restricts inputs to 24 bytes",
      "`re.match()` refuses raw strings unless compiled",
      "Compiles the pattern object once and makes code cleaner, reusable, and explicitly typed rather than repeatedly checking compilation cache inside tight loops"
    ],
    "correct": 3,
    "explanation": "Explicit top-level or function-header `re.compile()` separates pattern definition cleanly from per-line matching."
  },
  {
    "id": "q_c4_m3_080",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Look at Practical P2's warning: 'Never test `n=50` on `^(a+)+$` without bounded timeouts.' Why does a test harness need non-linear *negative* (mismatch) test cases in CI alongside positive match tests?",
    "options": [
      "Positive strings execute in nanoseconds even on vulnerable nested-quantifier regexes—only adversarial near-matching strings that FAIL right at the final character (`$`) trigger exponential backtracking!",
      "Valid matches trigger ReDoS twice as fast as mismatches",
      "CI pipelines skip negative tests automatically",
      "Positive matches raise `RecursionError`"
    ],
    "correct": 0,
    "explanation": "Cloudflare's rule passed standard functional match tests before launch; failure-path backtracking on near-matching traffic caused global CPU saturation."
  },
  {
    "id": "q_c4_m3_081",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py` section 6, why were BOTH `'198.51.100.23'` and `'203.0.113.7'` safe for teaching log samples?",
    "options": [
      "They are real internet webmail providers",
      "They belong cleanly to IANA documentation/TEST-NET prefixes (`198.51.100.0/24` and `203.0.113.0/24`), avoiding collisions with live customer IPs",
      "They bypass firewall logging",
      "They match RFC 1918 private subnets"
    ],
    "correct": 1,
    "explanation": "RFC 5737 reserves `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24` specifically as safe non-routable documentation IP ranges."
  },
  {
    "id": "q_c4_m3_082",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "If `m03_files_data.py` prints `findall IPs: ['10.20.4.17', '198.51.100.23', '203.0.113.7']`, notice `'10.20.4.17'` appeared TWICE in `auth.log` and `'203.0.113.7'` appeared TWICE. Why did the printed list contain only 3 unique IPs in sorted order?",
    "options": [
      "`re.findall()` automatically deduplicates and sorts matches",
      "`auth.log` rejected duplicate logins on write",
      "The script wrapped `re.findall(...)` cleanly inside `sorted(set(...))`",
      "`set()` raises `TypeError` on unsorted lists"
    ],
    "correct": 2,
    "explanation": "`set(...)` collapses duplicates in O(N) hash time and `sorted(...)` produces a clean deterministic alphabetical list (noting lexicographic string ordering for IPs vs `ipaddress` key sorting)."
  },
  {
    "id": "q_c4_m3_083",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "What happens if an analyst tries `Path('missing_log.txt').open('r', encoding='utf-8')` when the file does not exist?",
    "options": [
      "Creates an empty file automatically",
      "Returns `None` silently",
      "Opens an in-memory temporary buffer",
      "Raises `FileNotFoundError` (`OSError` subclass)"
    ],
    "correct": 3,
    "explanation": "Read mode `'r'` fails loudly with `FileNotFoundError` instead of fabricating empty missing evidence files."
  },
  {
    "id": "q_c4_m3_084",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Why does `log_file.read_text(encoding='utf-8')` work safely on the 422-byte test file in `m03_files_data.py`, yet pose an availability vulnerability if called blindly on an API log upload endpoint accepting arbitrary files?",
    "options": [
      "Without a pre-check on `stat().st_size` or streaming chunk cap, an attacker uploading a 50 GB sparse file forces unconditional full-RAM allocation and process OOM crash!",
      "`read_text()` fails on files under 1 KB",
      "`read_text()` ignores UTF-8 errors automatically",
      "`read_text()` executes Python embedded inside `.log` comments"
    ],
    "correct": 0,
    "explanation": "Convenience helpers like `read_text()` buffer entire contents in RAM; always stream line-by-line or check size bounds on untrusted inputs."
  },
  {
    "id": "q_c4_m3_085",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "What value does `len(b'Pune - caf\\xc3\\xa9\\n')` evaluate to in Python?",
    "options": [
      "12",
      "13",
      "14",
      "20"
    ],
    "correct": 1,
    "explanation": "Count bytes explicitly: `'Pune - caf'` (10) + `\\xc3` (1) + `\\xa9` (1) + `\\n` (1) = 13 bytes total."
  },
  {
    "id": "q_c4_m3_086",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Look at `'café'.encode('latin-1')` vs `'café'.encode('utf-8')`. If File A was saved as single-byte `latin-1` (`b'caf\\xe9'`) and a forensic tool mistakenly opens it using `encoding='utf-8'`, what happens?",
    "options": [
      "UTF-8 prints `'café'` cleanly automatically",
      "`open()` automatically switches back to `latin-1`",
      "Raises `UnicodeDecodeError` because solitary byte `0xE9` is invalid in UTF-8 without continuation octets!",
      "Deletes the rest of the log silently"
    ],
    "correct": 2,
    "explanation": "Single-byte Latin-1 sequences with high bit set (`0xE9`) violate strict UTF-8 multi-byte prefix rules, triggering immediate `UnicodeDecodeError` unless handled cleanly."
  },
  {
    "id": "q_c4_m3_087",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "In `assets.csv`, suppose one line reads `web-02,10.0.1.11,\"IT, Core\",high`. How does `csv.DictReader` parse the `'owner'` field?",
    "options": [
      "`'\"IT'`",
      "Splits into two extra columns",
      "Raises `csv.Error`",
      "`'IT, Core'` (preserving the internal comma cleanly while stripping outer quotes)"
    ],
    "correct": 3,
    "explanation": "`csv.DictReader` honors RFC 4180 field quoting natively without fracturing comma-containing values."
  },
  {
    "id": "q_c4_m3_088",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Suppose a SOC export report includes legitimate negative numeric deltas (`-5` failed logins compared to yesterday) alongside attacker text usernames. How do security engineers balance usability vs CSV injection?",
    "options": [
      "Apply `safe_cell()` unconditionally to ALL untrusted text/string fields, and validate strictly numeric fields as real numeric values (or prefix only when untyped untrusted strings begin with formula triggers)",
      "Disable `safe_cell()` on all columns",
      "Encrypt every CSV cell individually",
      "Replace negative deltas with `0`"
    ],
    "correct": 0,
    "explanation": "Strict validation of pure numeric metrics paired with mandatory `safe_cell()` scrubbing on every free-text string neutralizes formula payloads reliably."
  },
  {
    "id": "q_c4_m3_089",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Which standard-library documentation explicitly states: 'The module is not secure. Only unpickle data you trust.'?",
    "options": [
      "`json`",
      "`pickle`",
      "`csv`",
      "`pathlib`"
    ],
    "correct": 1,
    "explanation": "Python's official `pickle` docs open with a stark red warning against unpickling any untrusted or externally sourced stream."
  },
  {
    "id": "q_c4_m3_090",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Suppose an attacker supplies a base64-decoded malicious pickle payload containing `cos\\nsystem\\n(S'whoami'\\ntR.` (`__reduce__` returning `(os.system, ('whoami',))`). When does OS command `'whoami'` actually execute?",
    "options": [
      "Only when the analyst later iterates or prints the loaded Python object",
      "Only if `safe=False` is passed to `pickle.loads()`",
      "**Inside `pickle.loads()` itself**—before the function even returns, completely bypassing downstream validation checks!",
      "Never on Windows hosts"
    ],
    "correct": 2,
    "explanation": "Because `pickle` executes instructions while constructing objects, placing `if isinstance(...)` checks AFTER `pickle.loads()` offers zero protection."
  },
  {
    "id": "q_c4_m3_091",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "What does the character anchor `^` match inside a default single-line regex like `r'^Failed'`?",
    "options": [
      "Any literal caret symbol `^`",
      "Negates `'Failed'` completely",
      "Word boundary anywhere in the middle of the string",
      "Start of the string (index 0)"
    ],
    "correct": 3,
    "explanation": "Outside bracket sets `[^...]`, `^` anchors matching strictly at the beginning of the string (or start of each line under `re.MULTILINE`)."
  },
  {
    "id": "q_c4_m3_092",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Look at a colleague's regex matching Windows paths: `re.compile('C:\\\\new\\\\test')` written WITHOUT the `r` prefix vs `re.compile(r'C:\\new\\test')`. Even with `r`, why does `re.compile(r'C:\\new\\test')` STILL fail to match `C:\\new\\test`?",
    "options": [
      "In regex syntax itself, `\\n` means newline and `\\t` means horizontal tab—so literal backslashes inside a regex MUST be doubled EVEN inside raw strings (`r'C:\\\\new\\\\test'`)!",
      "Windows paths cannot match regexes",
      "`r'...'` forbids colons",
      "`re.compile` converts backslashes into forward slashes automatically"
    ],
    "correct": 0,
    "explanation": "Two layers consume backslashes: Python string literals (eliminated by `r'...'`) AND the regex engine itself (which requires `\\\\` or `re.escape()` for literal `\\`)."
  },
  {
    "id": "q_c4_m3_093",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Before calling `re.match()` on untrusted HTTP User-Agent headers in a parser, what cheap pre-check directly bounds maximum per-request work?",
    "options": [
      "Convert header to uppercase first",
      "Reject or truncate inputs exceeding a small strict character ceiling (`if len(header) > 512:`)",
      "Wrap regex inside `try / except ZeroDivisionError`",
      "Run `pickle.dumps()` on the header"
    ],
    "correct": 1,
    "explanation": "Bounding input size caps maximum work before regex execution begins—turning potential multi-gigabyte or long-header DoS attempts away immediately."
  },
  {
    "id": "q_c4_m3_094",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Compare DFA-based `RE2` vs backtracking `re`: why can `RE2` NOT support arbitrary recursive lookaheads (`(?=...)`) or backreferences (`\\1`), and why is that trade-off ideal for security scanners?",
    "options": [
      "`RE2` lacks memory for ASCII digits",
      "`RE2` only parses CSV headers",
      "Backreferences (`\\1`) make pattern matching NP-complete—sacrificing exotic backreferences lets `RE2` guarantee deterministic linear $O(n)$ execution free of ReDoS!",
      "`RE2` runs strictly single-character matches"
    ],
    "correct": 2,
    "explanation": "Sacrificing NP-hard features (backreferences/lookarounds) buys mathematical guarantees of linear-time parsing across hostile untrusted inputs."
  },
  {
    "id": "q_c4_m3_095",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py` step 1, `if 'Failed' in line:` ran before printing line snippets. Why is performing a cheap literal substring pre-filter (`if 'Failed password' in line:`) BEFORE running a heavy regex useful on 10-million-line logs?",
    "options": [
      "It turns `'Failed'` into lowercase automatically",
      "Regexes crash whenever `'Failed'` is absent",
      "`in` decodes binary packets automatically",
      "Substring search bypasses non-matching lines at C speed in nanoseconds instead of compiling match groups for every harmless informational line"
    ],
    "correct": 3,
    "explanation": "Fast C-level `in` literal gating skips irrelevant lines cleanly, multiplying log-pipeline throughput cleanly."
  },
  {
    "id": "q_c4_m3_096",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "Look at step 2 of `m03_files_data.py`: `print(f\"1. line {number}: {line.rstrip()[:60]}...\")`. Why did the script call `.rstrip()` BEFORE slicing and formatting `line`?",
    "options": [
      "`.rstrip()` removes trailing `'\\n'` / `'\\r\\n'` line breaks cleanly so printed lines don't insert unexpected extra blank line spacing or stray `'\\r'` cursor resets",
      "`.rstrip()` reverses UTF-8 characters",
      "`.rstrip()` removes leading indentation four spaces at a time",
      "Slicing `[:60]` raises ValueError unless stripped first"
    ],
    "correct": 0,
    "explanation": "Iterating `for line in fh:` preserves trailing newline characters on each yielded string; stripping trailing whitespace formats clean output."
  },
  {
    "id": "q_c4_m3_097",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "When inspecting an incident folder safely using Python, what does `p.is_file()` return if `p` points to a directory rather than a regular file?",
    "options": [
      "`True`",
      "`False`",
      "Raises `IsADirectoryError`",
      "Returns the directory size in bytes"
    ],
    "correct": 1,
    "explanation": "`p.is_file()` returns `False` for directories and non-existent paths cleanly without raising exceptions."
  },
  {
    "id": "q_c4_m3_098",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "When `text = 'alert\\ruser=root'` contains an embedded carriage return `'\\r'`, why might a naive `print(text)` mislead a terminal analyst compared to `print(ascii(text))`?",
    "options": [
      "`'\\r'` turns green on PowerShell terminals",
      "`print()` crashes cleanly on `'\\r'`",
      "Terminal output interprets `'\\r'` as returning the cursor to column 0 and overwriting `'alert'` with `'user=root'`, masking injected log text unless inspected via `ascii()` or `repr()`!",
      "`ascii()` hides `'\\r'` silently"
    ],
    "correct": 2,
    "explanation": "Control character spoofing (`\\r`, ANSI escapes) can visually overwrite printed log fields; `ascii()`/`repr()` renders every escape plainly."
  },
  {
    "id": "q_c4_m3_099",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "In RFC 4180 CSV serialization (`csv.DictWriter`), if a value contains an internal double quote `\"`, how does Python represent it cleanly on disk?",
    "options": [
      "Escapes with backslash `\\\"`",
      "Encodes the cell as Base64",
      "Deletes double quotes silently",
      "Wraps the field in quotes and doubles internal quotes as `\"\"`"
    ],
    "correct": 3,
    "explanation": "Standard RFC 4180 escapes quotes inside quoted cells by doubling them (`\"\"`), matching `asha,\"'=HYPERLINK(\"\"http://example.com\"\",\"\"click\"\")\"` in our lab run."
  },
  {
    "id": "q_c4_m3_100",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Reviewing Module 3 end-to-end: an analyst receives untrusted partner data containing nested events, must parse it without remote code execution, validate IPs safely, and email an Excel-friendly CSV summary. Which exact pipeline sequence satisfies all security properties?",
    "options": [
      "Validate input size -> `json.loads()` -> verify types & `ipaddress` validity -> export CSV inside `with open(..., 'w', newline='', encoding='utf-8')` scrubbing every string through `safe_cell()`",
      "Load with `pickle.loads()`, split strings manually, write CSV directly",
      "Load with `eval()`, convert via `str()`, open CSV in `'w+'` mode without `safe_cell()`",
      "Load with `re.compile(r'^(.*)+$')`, serialize via `pickle`"
    ],
    "correct": 0,
    "explanation": "This pipeline enforces memory/encoding hygiene, safe JSON deserialization, post-parse schema/IP validation, and CWE-1236 formula neutralization cleanly."
  },
  {
    "id": "q_c4_m3_101",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "In `pathlib`, how do you retrieve the filename stem `'auth'` without its extension `'.log'` from `Path('/var/log/auth.log')`?",
    "options": [
      "`p.name`",
      "`p.stem`",
      "`p.suffix`",
      "`p.root`"
    ],
    "correct": 1,
    "explanation": "`Path.stem` returns the final path component excluding its trailing suffix (`'auth'`)."
  },
  {
    "id": "q_c4_m3_102",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Why does calling `p.read_text(encoding='utf-8')` on an untrusted 12 GB log inside an ingestion daemon risk crashing sibling worker threads before hitting Python parsing code?",
    "options": [
      "`read_text()` locks the directory globally across CPUs",
      "`read_text()` disables the Python GIL indefinitely",
      "`read_text()` tries to allocate a single contiguous multi-gigabyte string in heap RAM immediately instead of buffering small chunks during line iteration",
      "`read_text()` converts newlines into nulls"
    ],
    "correct": 2,
    "explanation": "Streaming via `for line in fh:` limits peak memory to one buffered line regardless of total file gigabytes."
  },
  {
    "id": "q_c4_m3_103",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "Which `Path` method retrieves the current user's OS home folder cleanly across Windows, Linux, and macOS?",
    "options": [
      "`Path.user()`",
      "`Path.root()`",
      "`Path.cwd()`",
      "`Path.home()`"
    ],
    "correct": 3,
    "explanation": "`Path.home()` resolves `$HOME` or `%USERPROFILE%` portably across all operating systems."
  },
  {
    "id": "q_c4_m3_104",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "An investigator uses `Path('/tmp/evidence/app.tar.gz').suffix`. What does `.suffix` return, and why should archive cleanup scripts inspect `.suffixes` carefully when parsing compound extensions?",
    "options": [
      "`.suffix` returns ONLY the last extension `'.gz'`, whereas `.suffixes` returns `['.tar', '.gz']`—important when validation allowlists check extension endings!",
      "`.suffix` returns `'.tar.gz'` cleanly",
      "`.suffix` raises `ValueError` on double extensions",
      "`.suffixes` strips directory paths recursively"
    ],
    "correct": 0,
    "explanation": "Understanding `.suffix` vs `.suffixes` prevents bypasses or bugs on compound archive extensions like `.tar.gz` or `.log.bak`."
  },
  {
    "id": "q_c4_m3_105",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "What does opening a file in `'a'` mode guarantee when writing a log line?",
    "options": [
      "Clears existing content first",
      "Writes new bytes strictly to the end of the file while preserving prior content",
      "Raises an error if the file already exists",
      "Opens file in read-only mode"
    ],
    "correct": 1,
    "explanation": "Append mode (`'a'`) preserves prior records and creates the file if missing."
  },
  {
    "id": "q_c4_m3_106",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Look at `Path('/opt/logs/a.log').unlink(missing_ok=True)`. Why is setting `missing_ok=True` safer in cleanup routines than bare `.unlink()`, yet risky if applied silently to delete critical evidence without verifying expected state?",
    "options": [
      "`missing_ok=True` skips deleting non-empty files",
      "`unlink()` deletes entire directories recursively",
      "`missing_ok=True` suppresses `FileNotFoundError` cleanly on idempotent temp cleanup, whereas genuine deletion operations on expected files should confirm existence/outcome explicitly",
      "`missing_ok=True` moves files into Recycle Bin"
    ],
    "correct": 2,
    "explanation": "`unlink(missing_ok=True)` keeps idempotent cleanup noise-free while real workflow steps shouldn't ignore missing inputs silently."
  },
  {
    "id": "q_c4_m3_107",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Which built-in function returns a printable ASCII-only representation by escaping non-ASCII characters (like `'\\xe9'`) and control escapes unambiguously?",
    "options": [
      "`str()`",
      "`int()`",
      "`bytes()`",
      "`ascii()`"
    ],
    "correct": 3,
    "explanation": "`ascii()` formats strings identically to `repr()` while escaping non-ASCII code points with `\\x`, `\\u`, or `\\U` escapes."
  },
  {
    "id": "q_c4_m3_108",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "An external threat feed mixes valid ASCII IOCs with a handful of malformed Windows-1252 bytes (`0x93`, `0x94`). If opened with `open(feed, encoding='utf-8', errors='ignore')` instead of `'replace'`, why is forensic auditability weaker?",
    "options": [
      "`errors='ignore'` silently deletes bad bytes with zero visible marker (`\\ufffd`), fusing adjacent characters together without any indicator that bytes vanished!",
      "`errors='ignore'` crashes on line 1",
      "`errors='ignore'` prints hexadecimal dumps automatically",
      "`errors='replace'` throws `UnicodeEncodeError`"
    ],
    "correct": 0,
    "explanation": "Silent byte deletion (`errors='ignore'`) alters adjacent tokens unpredictably; `errors='replace'` or `'backslashreplace'` plus replacement-count logging makes data loss visible."
  },
  {
    "id": "q_c4_m3_109",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "What occurs when calling `.write_bytes(data)` on a `Path` object if `data` is accidentally a Python `str` instead of `bytes`?",
    "options": [
      "Encodes automatically as UTF-16",
      "Raises `TypeError: a bytes-like object is required, not 'str'`",
      "Converts characters into hexadecimal text",
      "Succeeds silently for ASCII letters only"
    ],
    "correct": 1,
    "explanation": "Binary write operations reject undecoded strings strictly with `TypeError`, forcing explicit `.encode('utf-8')` conversion."
  },
  {
    "id": "q_c4_m3_110",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Suppose an attacker creates two user logins: `'admin'` (ASCII) vs `'аdmin'` containing Cyrillic small letter `а` (`U+0430`, UTF-8 bytes `0xD0 0xB0`). How can Python inspection detect this homoglyph spoofing cleanly in audit scripts?",
    "options": [
      "Run `name.lower()`—Unicode folding converts Cyrillic `а` into ASCII `a`",
      "Compare string lengths only (`len(a) == len(b)`)",
      "Compare `ascii(name)` (`'\\u0430dmin'`) or `name.isascii()` / `unicodedata` checks to spot unexpected non-ASCII code points hiding behind identical terminal glyphs!",
      "Strip UTF-8 headers"
    ],
    "correct": 2,
    "explanation": "`str.isascii()` and `ascii()` expose homoglyph lookalike code points immediately even when fonts render them identically."
  },
  {
    "id": "q_c4_m3_111",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "When calling `(work / 'note.bin').read_bytes()`, what Python object type does the method return?",
    "options": [
      "`str`",
      "`dict`",
      "`list[int]`",
      "`bytes`"
    ],
    "correct": 3,
    "explanation": "`Path.read_bytes()` reads the raw file contents strictly as an immutable `bytes` sequence."
  },
  {
    "id": "q_c4_m3_112",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Compare `data.decode('utf-8')` on an arbitrary binary Windows PE executable vs `open(pe_path, 'rb')`: why does attempting UTF-8 text decoding fail on binary artifacts almost immediately?",
    "options": [
      "Arbitrary machine instructions contain byte patterns like `0x90`, `0xFF`, `0xE8` violating UTF-8 multi-byte bit-prefix rules, immediately triggering `UnicodeDecodeError`!",
      "PE files contain null bytes everywhere which UTF-8 forbids",
      "UTF-8 only reads files ending in `.txt`",
      "Binary headers exceed 64 KB limits"
    ],
    "correct": 0,
    "explanation": "Executable binaries, captures, and encrypted blobs contain non-UTF-8 octet combinations and must always remain raw `bytes` via `'rb'`."
  },
  {
    "id": "q_c4_m3_113",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "In `csv.DictReader(fh)`, what type is each row object yielded during iteration (`for row in reader:`)?",
    "options": [
      "`list[str]`",
      "`dict[str, str]` keyed by column headers",
      "`tuple[str, ...]`",
      "Raw unparsed `str`"
    ],
    "correct": 1,
    "explanation": "`csv.DictReader` parses the first header line and returns one mapping `dict` per subsequent record."
  },
  {
    "id": "q_c4_m3_114",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "An analyst opens a vendor firewall export `rules.tsv` separated by tab characters (`\\t`) instead of commas using `csv.DictReader`. What keyword argument lets `csv.DictReader` parse TSV files cleanly while respecting RFC quoting?",
    "options": [
      "Split every line manually with `.split('\\t')`",
      "Set `encoding='tsv'`",
      "Pass `delimiter='\\t'` directly into `csv.DictReader(fh, delimiter='\\t')` alongside `newline=''`",
      "Replace tabs with commas first using `re.sub`"
    ],
    "correct": 2,
    "explanation": "`csv.DictReader` and `DictWriter` support `delimiter='\\t'` (or `'|'`, `';'`) natively without risking broken quoted strings."
  },
  {
    "id": "q_c4_m3_115",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "Why does `=CMD|' /C calc'!A0` or `=HYPERLINK(...)` inside a CSV file pose a security threat even though CSV is a plain-text format?",
    "options": [
      "Python's `csv` module runs `eval()` on strings starting with `=`",
      "CSV binaries embed ELF headers natively",
      "Linux `cat` runs shell commands after `=`",
      "Spreadsheet desktop software (Excel/LibreOffice) evaluates leading formula characters dynamically when users open CSV reports"
    ],
    "correct": 3,
    "explanation": "CSV itself has no execution engine—the hazard occurs downstream when spreadsheet software evaluates attacker-supplied prefixes inside unescaped cells (CWE-1236)."
  },
  {
    "id": "q_c4_m3_116",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "What happens in `m03_files_data.py` if an attacker submits the string `'\\t=1+1'` (starting with a horizontal tab before `'='`) to `safe_cell()`?",
    "options": [
      "`'\\t'` IS explicitly listed inside `('=', '+', '-', '@', '\\t', '\\r')`, so `safe_cell()` still prefixes a leading `'` safely (`\"'\\t=1+1\"`)",
      "`safe_cell()` ignores tabs, allowing Excel injection",
      "`csv.DictWriter` rejects `'\\t'` with `ValueError`",
      "Stripping `'\\t'` deletes `'=1+1'`"
    ],
    "correct": 0,
    "explanation": "Checking `'\\t'` and `'\\r'` alongside `=+-@` ensures whitespace-evasion formula payloads still get neutralized cleanly."
  },
  {
    "id": "q_c4_m3_117",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "Which standard OWASP vulnerability category does `safe_cell()` prevent in Python security reporting pipelines?",
    "options": [
      "Buffer Overflow (CWE-120)",
      "CSV / Spreadsheet Formula Injection (CWE-1236)",
      "Cross-Site Request Forgery (CWE-352)",
      "Integer Wraparound (CWE-190)"
    ],
    "correct": 1,
    "explanation": "Neutralizing spreadsheet formula triggers inside untrusted exported CSV fields addresses CWE-1236."
  },
  {
    "id": "q_c4_m3_118",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Suppose an organization replaces Excel completely with pure HTML dashboards in their browser rather than CSV downloads, yet renders attacker usernames via unsafe `innerHTML`. Does dropping CSV eliminate output-encoding risk automatically?",
    "options": [
      "Yes, browsers sanitize arbitrary HTML strings natively",
      "JSON prevents XSS inside `innerHTML`",
      "No! Data leaving a pipeline remains an output security boundary—CSV exports need formula neutralization (`safe_cell`), whereas HTML dashboards need contextual HTML escaping to prevent XSS!",
      "Spreadsheets are the only format requiring output encoding"
    ],
    "correct": 2,
    "explanation": "Module 3's core rule applies across every sink: outputs are consumed by another parser (Excel, HTML DOM, shell, SQL) and must be neutralized for that target context."
  },
  {
    "id": "q_c4_m3_119",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "How do you serialize a Python list of alert dictionaries cleanly to a formatted UTF-8 string?",
    "options": [
      "`json.loads(alerts, indent=2)`",
      "`pickle.dumps(alerts)`",
      "`csv.DictWriter(alerts)`",
      "`json.dumps(alerts, indent=2)`"
    ],
    "correct": 3,
    "explanation": "`json.dumps()` serializes Python data structures into a JSON string; passing `indent=2` produces clean indentation."
  },
  {
    "id": "q_c4_m3_120",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "In JSON Line-delimited logs (NDJSON / JSONL—common in Elastic, CloudTrail exports, and Wazuh), every line is a self-contained JSON object. Why does calling `json.loads(file.read_text())` directly on a `.jsonl` file raise `JSONDecodeError: Extra data`, and how do you parse `.jsonl` cleanly?",
    "options": [
      "Because multiple concatenated JSON objects in one text file are not a single JSON array; iterate `for line in fh:` line by line and call `json.loads(line)` on non-empty lines in O(1) memory!",
      "Because single quotes fail JSON",
      "Because `.jsonl` requires `pickle.load()`",
      "Because `json.loads()` accepts max 1 object per process"
    ],
    "correct": 0,
    "explanation": "Line-by-line streaming `json.loads(line)` parses arbitrary-size JSONL/NDJSON telemetry cleanly while keeping RAM bounded."
  },
  {
    "id": "q_c4_m3_121",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "What Python object does `json.loads('null')` return?",
    "options": [
      "`False`",
      "`None`",
      "`0`",
      "`''`"
    ],
    "correct": 1,
    "explanation": "JSON `null` maps natively to Python's `None` singleton."
  },
  {
    "id": "q_c4_m3_122",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Examine Scenario S3: a teammate pickles threat-intel dicts and sends `.pkl` files to a partner SOC. Beside partner security risk, why might `.pkl` break reliably EVEN among fully trusted partners six months later?",
    "options": [
      "Pickle refuses dictionaries larger than 1 MB",
      "JSON executes faster only on Linux",
      "Pickle embeds Python-internal class module paths and protocol versions that break cleanly when custom class definitions rename or Python major versions diverge—whereas JSON remains timeless and cross-language!",
      "Pickle drops Unicode characters automatically"
    ],
    "correct": 2,
    "explanation": "JSON separates wire data cleanly from internal Python implementation details and keeps partner exchange safe and interoperable."
  },
  {
    "id": "q_c4_m3_123",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Suppose an incoming JSON alert dictionary `a` guarantees `'rule'` exists, while `'user'` is present only on user-scoped events. What error occurs if code runs `a['user']` on `{'id': 1, 'rule': 'brute_force'}`?",
    "options": [
      "Returns `'n/a'`",
      "Returns `None`",
      "Raises `IndexError`",
      "Raises `KeyError: 'user'`"
    ],
    "correct": 3,
    "explanation": "Direct subscript `a['user']` fails with `KeyError` when absent; use `a.get('user', 'n/a')` cleanly."
  },
  {
    "id": "q_c4_m3_124",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "In Python's `json` module, `json.dumps(obj, sort_keys=True)` produces sorted object keys. Why is `sort_keys=True` valuable in digital forensics or signed/HMAC baseline manifests (previewing Module 7)?",
    "options": [
      "Deterministically canonicalizes dictionary key order so equivalent Python objects produce identical byte outputs and repeatable cryptographic hashes across runs!",
      "It encrypts keys via AES automatically",
      "It drops optional keys automatically",
      "It prevents `JSONDecodeError` on single quotes"
    ],
    "correct": 0,
    "explanation": "Canonical serialized ordering guarantees two dictionaries representing identical policy or baseline state yield the exact same SHA-256 / HMAC digest."
  },
  {
    "id": "q_c4_m3_125",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "In regular expressions, what does the token `\\d` match?",
    "options": [
      "Any letter `a-z`",
      "Any decimal digit (`0-9` in ASCII/Unicode)",
      "Non-digit character only",
      "Dot character `.`"
    ],
    "correct": 1,
    "explanation": "`\\d` matches decimal digits; its inverse `\\D` matches any non-digit character."
  },
  {
    "id": "q_c4_m3_126",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Watch carefully when converting user-supplied hostnames/URLs dynamically into regex searches: `re.compile(user_domain + '$')` where `user_domain = 'corp.example.com'`. Why could `'evil-corpxexample.com'` match unexpectedly, and how does `re.escape()` fix it?",
    "options": [
      "`re.escape()` turns lazy quantifiers greedy",
      "`$` forbids domain suffixes",
      "Unescaped dots `.` act as wildcards matching **ANY character** (like `'x'`); passing `re.escape(user_domain)` turns `.` cleanly into `\\.` so only literal dots match!",
      "`re.compile` escapes dots automatically"
    ],
    "correct": 2,
    "explanation": "Injecting unescaped `.`, `+`, `*`, or `(a+)+` strings into `re.compile()` causes both false-positive matching (`corpXexample`) and user-injected ReDoS bugs! Wrap literal fragments via `re.escape()`."
  },
  {
    "id": "q_c4_m3_127",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "What does the syntax `(?:invalid user )?` accomplish inside `m03_files_data.py`'s sshd regex?",
    "options": [
      "Creates a named capture group `'invalid user'`",
      "Repeats `'invalid user '` endlessly",
      "Negates `'invalid user '`",
      "Groups the optional phrase `'invalid user '` as a unit (`?` = 0 or 1 times) without creating a numbered capture group"
    ],
    "correct": 3,
    "explanation": "`(?:...)` groups tokens strictly for quantifiers/alternation cleanly without adding extra capture slots."
  },
  {
    "id": "q_c4_m3_128",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "An analyst scans a multiline syslog block string `text` using `re.findall(r'^sshd.*$', text)` expecting all 5 matching lines, yet gets `[]`! Why did `^` and `$` fail, and what flag changes `^`/`$` to match line boundaries within multi-line strings?",
    "options": [
      "By default `^` and `$` anchor strictly to string start/end; pass `flags=re.MULTILINE` (or better yet, stream line by line `for line in fh:`) so `^`/`$` match per newline boundary!",
      "Pass `re.IGNORECASE`",
      "Pass `re.VERBOSE`",
      "Replace `^` with `\\b`"
    ],
    "correct": 0,
    "explanation": "`re.MULTILINE` alters `^` and `$` to match line edges; streaming files line by line usually removes the need for holding whole files as one multiline string."
  },
  {
    "id": "q_c4_m3_129",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "Which quantifier symbol modifies greedy `*` (`.*`) into its lazy equivalent stopping at the earliest valid match?",
    "options": [
      "`!` (`.*!`)",
      "`?` (`.*?`)",
      "`+` (`.*+`)",
      "`$` (`.*$`)"
    ],
    "correct": 1,
    "explanation": "Adding `?` directly after `*`, `+`, `?`, or `{m,n}` converts greedy repetition into lazy (non-greedy) repetition."
  },
  {
    "id": "q_c4_m3_130",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Look at an unescaped IPv4 regex bug: `r'(\\d{1,3}.){3}\\d{1,3}'` written WITHOUT backslashes before `.`. Which unintended non-IP string falsely matches that pattern cleanly?",
    "options": [
      "`'10.20.4.17'` only",
      "Only IPv6 hex strings",
      "`'123a456b789c012'` or `'2026-11-07-01'` because unescaped `.` matches ANY character (`a`, `-`, space), not literal periods!",
      "None, `.` always matches literal periods inside parentheses"
    ],
    "correct": 2,
    "explanation": "Unescaped `.` inside regexes matches arbitrary non-newline characters; always write `\\.` when matching dotted IPv4 separators."
  },
  {
    "id": "q_c4_m3_131",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "What happened inside Python when `evil = re.compile(r'^(a+)+$')` ran on `'a' * 22 + 'b'` compared to `safe = re.compile(r'^a+$')`?",
    "options": [
      "Both ran in 0.132 s identically",
      "`^(a+)+$` succeeded and matched `'a'`",
      "`^a+$` crashed on `'b'`",
      "`^(a+)+$` took ~0.13 s exploring exponential backtracking partitions, while `^a+$` ran in microseconds (`~0.000038 s`)"
    ],
    "correct": 3,
    "explanation": "Removing redundant outer quantification eliminates ambiguous backtrack trees completely."
  },
  {
    "id": "q_c4_m3_132",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Python 3.11+ added *atomic grouping* `(?>...)` and *possessive quantifiers* (`++`, `*+`, `?+`) natively to `re`! What happens if you rewrite `^(a+)+$` or `(?>a+)b` with possessive `a++`?",
    "options": [
      "Once possessive `a++` consumes all consecutive `'a'`s, the engine is FORBIDDEN from giving back characters on backtrack—stopping exponential backtracking immediately if the remaining pattern fails!",
      "Python 3.11+ rejects possessive quantifiers completely",
      "Possessive quantifiers run on GPUs",
      "`++` doubles execution time automatically"
    ],
    "correct": 0,
    "explanation": "Possessive quantifiers (`++`) and atomic groups prevent the backtracking engine from endlessly re-splitting previously consumed spans (alongside linear `RE2` engines for total guarantee)."
  },
  {
    "id": "q_c4_m3_133",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "In the July 2, 2019 Cloudflare outage report, how did Cloudflare restore edge traffic availability at 14:07 UTC?",
    "options": [
      "Rewrote Python into Go across all regions in 2 minutes",
      "Disabled/bypassed the WAF rule evaluation globally while auditing 3,868 rules and restoring CPU protections",
      "Rebooted DNS root servers",
      "Blocked all HTTPS traffic cleanly"
    ],
    "correct": 1,
    "explanation": "Immediate mitigation bypassed the runaway regex WAF stage, followed by full rule auditing, CPU protections, staged rollouts, and RE2/Rust regex migration."
  },
  {
    "id": "q_c4_m3_134",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Suppose a team asks: 'Can we leave `^(a+)+$` unpatched in our Python parser if we simply run regex matching inside `try ... except:` with a standard `logging` check?' Why does `try/except` fail to stop ReDoS?",
    "options": [
      "`re` throws `BacktrackError` after 10 ms automatically",
      "`try/except` prevents backtracking automatically",
      "Backtracking burns 100% CPU silently inside C extensions **without throwing any Python exception**, pinning the thread until watchdogs or process timeouts kill the worker!",
      "ReDoS triggers `SyntaxError` at compile time"
    ],
    "correct": 2,
    "explanation": "ReDoS is a slow infinite-feeling CPU hang inside valid state exploration—exceptions never fire unless explicit watchdog signals or linear engines intervene."
  },
  {
    "id": "q_c4_m3_135",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, how did the script access the matched IP address cleanly from `m = pattern.match(line)`?",
    "options": [
      "`m.ip()`",
      "`line.split()[6]`",
      "`pattern.ip`",
      "`m['ip']`"
    ],
    "correct": 3,
    "explanation": "Because the regex defined named group `(?P<ip>...)`, `m['ip']` retrieves the extracted IP string cleanly."
  },
  {
    "id": "q_c4_m3_136",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py`'s `assets_csv` (`hostname,ip,owner,criticality`). If you open a real 2 GB CMDB asset CSV and want to filter `'high'` criticality hosts into a lookup set `high_hosts`, which structure stays in bounded memory while indexing O(1)?",
    "options": [
      "`high_hosts = {r['hostname'] for r in csv.DictReader(fh) if r.get('criticality') == 'high'}` streaming directly inside a `with` block without `list(...)`!",
      "`rows = list(csv.DictReader(fh))` keeping all non-high records in RAM too",
      "`fh.read_text().splitlines()`",
      "`pickle.load(fh)`"
    ],
    "correct": 0,
    "explanation": "Streaming a set comprehension directly over `csv.DictReader(fh)` retains ONLY matching target hostnames instead of holding all discarded rows in RAM."
  },
  {
    "id": "q_c4_m3_137",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "Which method checks whether a `Path` already exists on the filesystem (regardless of whether it is a file or directory)?",
    "options": [
      "`p.found()`",
      "`p.exists()`",
      "`p.openable()`",
      "`p.live()`"
    ],
    "correct": 1,
    "explanation": "`Path.exists()` returns `True` if the path exists cleanly as a regular file, directory, or valid symlink target."
  },
  {
    "id": "q_c4_m3_138",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "An evidence extractor unzips `archive.zip` member `'safe\\..\\..\\root\\.ssh\\authorized_keys'` running on Linux (`/` path separator). Why might naive Windows-style check `'/' not in member` or Linux string check fail across OSes, whereas `pathlib` `(base / norm).resolve().is_relative_to(base.resolve())` stops escapes?",
    "options": [
      "Windows always rejects backslashes in filenames",
      "`pathlib` forbids ZIP archives on Linux",
      "`resolve()` canonicalizes OS path separators, resolves `.`/`..`, expands symlinks, and verifies strict path-prefix tree containment rather than naive substring filtering!",
      "`is_relative_to()` checks regex backtracking limits"
    ],
    "correct": 2,
    "explanation": "Substring blacklists (`'..' in p`) fail easily against normalized separators, encoded characters, or symlink targets; canonical tree containment via `.resolve().is_relative_to()` is authoritative."
  },
  {
    "id": "q_c4_m3_139",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Why must you avoid `for line in fh:` on a binary `.png` or `.pcap` file opened with `'rb'` when you actually expect fixed packet headers?",
    "options": [
      "`0x0A` raises `UnicodeDecodeError` in `'rb'` mode",
      "`'rb'` forbids `for` loops completely",
      "`.pcap` files are always UTF-8 JSON",
      "Binary packets split unpredictably wherever random payload bytes happen to equal `0x0A` (`\\n`), fracturing binary frames midway!"
    ],
    "correct": 3,
    "explanation": "Binary protocols aren't text lines; read explicit byte header lengths (`fh.read(n)` / `struct.unpack`, Module 5) instead of scanning newlines."
  },
  {
    "id": "q_c4_m3_140",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "A Windows analyst runs PowerShell `python parse.py` on a log exported from Ubuntu (`UTF-8`). `open('ubuntu.log')` had NO `encoding=` argument specified. A French hostname (`café`) displays as `'cafÃ©'` instead of crashing. Why did mojibake (`Ã©`) occur without any `UnicodeDecodeError`?",
    "options": [
      "The two UTF-8 bytes `0xC3 0xA9` happen to BOTH be valid single-byte Windows `cp1252` characters (`0xC3` = `'Ã'`, `0xA9` = `'©'`), silently corrupting indicators without raising an error!",
      "Python's UTF-8 decoder turned `é` into two characters automatically",
      "`cp1252` fails on byte `0xC3`",
      "Ubuntu logs automatically write Latin-1"
    ],
    "correct": 0,
    "explanation": "Because nearly every byte `0x80..0xFF` represents some printable character in single-byte legacy codepages, omitting `encoding='utf-8'` often causes **silent mojibake corruption** rather than loud crashes!"
  },
  {
    "id": "q_c4_m3_141",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "If a CSV cell starts with `'@SUM(1+1)*cmd|...'`, does `safe_cell()` in `m03_files_data.py` neutralize it?",
    "options": [
      "No, `safe_cell()` only checks `'='`",
      "Yes, `'@'` is included inside `('=', '+', '-', '@', '\\t', '\\r')`, prefixing `'` safely",
      "Only if Excel macros are enabled",
      "Removes `'@'` completely"
    ],
    "correct": 1,
    "explanation": "`safe_cell()` catches all six primary OWASP CSV injection starter tokens uniformly."
  },
  {
    "id": "q_c4_m3_142",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Look at how `csv.DictWriter` handles missing header columns vs extra dictionary keys: what happens by default if a row dictionary `{'user': 'chen'}` is missing key `'note'` declared in `fieldnames=['user', 'note']`?",
    "options": [
      "Raises `KeyError: 'note'` cleanly",
      "Skips the entire row silently",
      "Fills missing `'note'` with `restval=''` (empty string) by default without crashing, whereas extra unknown keys trigger `ValueError` unless `extrasaction='ignore'` is passed",
      "Writes `'None'` literally in every missing column"
    ],
    "correct": 2,
    "explanation": "`DictWriter` fills missing fields with `restval` (default `''`) while rejecting undeclared extra keys by default (`extrasaction='raise'`)."
  },
  {
    "id": "q_c4_m3_143",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Which standard Python function encodes valid Python dicts and lists directly into an open file handle as UTF-8 JSON?",
    "options": [
      "`json.dumps(obj, fh)`",
      "`json.save(obj, fh)`",
      "`json.write(obj, fh)`",
      "`json.dump(obj, fh)`"
    ],
    "correct": 3,
    "explanation": "`json.dump(obj, fh)` writes serialized JSON directly to stream `fh` (`json.dumps` returns a `str`)."
  },
  {
    "id": "q_c4_m3_144",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Notice Python's `json.loads()` accepts non-standard `NaN` and `Infinity` floats by default (`allow_nan=True`), yet strict RFC 8259 JSON forbids them and downstream parsers (Postgres JSONB, Go, strict validators) reject them. How can you inspect/forbid invalid `NaN` tokens cleanly during `json.dumps()`?",
    "options": [
      "Pass `allow_nan=False` to `json.dumps(obj, allow_nan=False)` so `ValueError` surfaces loudly instead of emitting invalid non-standard JSON!",
      "Use `pickle.dumps()` instead",
      "`NaN` serializes safely as `\"NaN\"` string automatically",
      "Use `encoding='ascii'`"
    ],
    "correct": 0,
    "explanation": "`allow_nan=False` guarantees serialized JSON adheres strictly to RFC 8259 numeric standards across cross-language SIEM integrations."
  },
  {
    "id": "q_c4_m3_145",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "What does `[abc]` match inside a Python regular expression, compared to `[^abc]`?",
    "options": [
      "`[abc]` matches literal string `'abc'`; `[^abc]` fails",
      "`[abc]` matches any single character `a`, `b`, or `c`; `[^abc]` matches any single character **except** `a`, `b`, or `c`",
      "`[^abc]` matches `'abc'` strictly at string start",
      "Both behave identically"
    ],
    "correct": 1,
    "explanation": "Leading `^` inside brackets negates the character class cleanly (matching anything outside the set)."
  },
  {
    "id": "q_c4_m3_146",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Watch a subtle regex bug in web security filters: `re.search(r'[^\\n]+', input_line)` vs `[^<]+` for extracting delimited tokens without using wildcards `.`! Why is negated character class `[^>]+` inside `<([^>]+)>` far faster AND safer against ReDoS than `<.*?>`?",
    "options": [
      "`<.*?>` ignores closing `>` characters",
      "`[^>]+` executes using `pickle` bytecode",
      "`[^>]+` cannot match `>` at all—stopping deterministically right before `>` with zero backtracking ambiguity across malformed unclosed `<tag` strings!",
      "`[^>]+` matches across closing tags cleanly"
    ],
    "correct": 2,
    "explanation": "Replacing broad `.` wildcards with strict negated delimiter classes (`[^>]+`, `[^\\s]+`) both clarifies intent and eliminates huge classes of backtracking hazards."
  },
  {
    "id": "q_c4_m3_147",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Why should defensive scripts measure regex execution on worst-case *non-matching* inputs (e.g., `'word ' * 15 + '!'`) during testing?",
    "options": [
      "Valid matching inputs take longer than non-matching inputs",
      "Non-matching inputs test UTF-8 decoding only",
      "Valid inputs cannot trigger `re.match`",
      "Backtracking blowups typically occur specifically when patterns fail right near the end of long repetitive strings"
    ],
    "correct": 3,
    "explanation": "Near-match strings force exhaustive re-partitioning across all alternative branches before finally failing."
  },
  {
    "id": "q_c4_m3_148",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "A service accepts external user regexes cleanly using Python `re` inside a single main asyncio event loop with NO `RE2` binding. Why does even a *single* backtracking regex request stall ALL unrelated users cleanly on that server?",
    "options": [
      "CPU-bound backtracking inside synchronous Python C regex matching blocks the single OS thread running the entire event loop, dropping responsiveness to zero across every concurrent client!",
      "`re.compile()` deletes other sessions from memory",
      "Asyncio auto-kills synchronous calls after 5 ms",
      "`re` locks the filesystem globally"
    ],
    "correct": 0,
    "explanation": "Blocking an event-loop thread with synchronous ReDoS freezes every multiplexed connection; enforce linear `RE2` engines or isolated worker processes with timeouts."
  },
  {
    "id": "q_c4_m3_149",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, look at line 37: `len(log_file.read_text(encoding='utf-8').splitlines())` printed `lines: 5`. Why did `.splitlines()` yield `5` rather than `6` even though line 5 ended with `'\\n'`?",
    "options": [
      "`.splitlines()` drops the 1st header line",
      "`.splitlines()` does not include a trailing empty string after a final line terminator `'\\n'`, matching actual line count cleanly (unlike `.split('\\n')` which appends `''`!)",
      "`len()` ignores `'Connection closed'` lines",
      "Line 5 failed UTF-8 decoding"
    ],
    "correct": 1,
    "explanation": "`.splitlines()` handles `'\\n'`, `'\\r\\n'`, and trailing newlines cleanly without creating spurious empty trailing entries like `.split('\\n')`."
  },
  {
    "id": "q_c4_m3_150",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "Extending Practical P1 (`m03_files_data.py`), suppose an analyst adds an `Accepted publickey` regex and writes JSON `{'failures': {'asha': 2, 'admin': 1}, 'successes': {'ben': 1}}`. Why is sorting keys/counters or separating `valid` vs `invalid user` labels important before blocking IPs automatically?",
    "options": [
      "`json.dumps()` crashes on nested dicts otherwise",
      "JSON rejects integers > 1 inside nested dicts",
      "Mistaking an `invalid user` username count or conflating `10.20.4.17` successful admin logins with failures could either misclassify scanners or trigger false firewall self-lockouts!",
      "`dict` order changes every time Python opens a file"
    ],
    "correct": 2,
    "explanation": "Separating telemetry categories explicitly (failures vs successes, valid accounts vs invalid probing usernames) prevents noisy automated blocking mistakes."
  },
  {
    "id": "q_c4_m3_151",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "How do you list every `.log` file directly inside folder `log_dir` using `pathlib`?",
    "options": [
      "`log_dir.find('*.log')`",
      "`log_dir.match('*.log')`",
      "`log_dir.open('*.log')`",
      "`log_dir.glob('*.log')`"
    ],
    "correct": 3,
    "explanation": "`Path.glob('*.log')` yields matching `Path` objects inside `log_dir` lazily (`rglob` searches recursively into subdirectories, explored in Module 4)."
  },
  {
    "id": "q_c4_m3_152",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, `note.bin` was written with `write_bytes(b'Pune - caf\\xc3\\xa9\\n')`. If read back via `(work / 'note.bin').read_text(encoding='utf-8').strip()`, notice `'\\n'` disappeared. Could `.strip()` silently alter evidence if trailing spaces or control chars mattered?",
    "options": [
      "`.strip()` strips whitespace from **both** start and end (`' '`, `'\\t'`, `'\\r'`, `'\\n'`), whereas `.rstrip('\\r\\n')` strips ONLY line breaks while preserving meaningful leading/trailing spaces in payloads!",
      "No, `.strip()` preserves spaces",
      "`.strip()` strips non-ASCII accents too",
      "`.rstrip()` deletes digits"
    ],
    "correct": 0,
    "explanation": "When parsing exact tokens or payload hashes, `line.rstrip('\\r\\n')` cleanly trims line breaks without erasing significant leading/trailing spaces."
  },
  {
    "id": "q_c4_m3_153",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "In `assets.csv` (`m03_files_data.py`), which column did the list comprehension inspect to output `['web-01', 'hr-portal']`?",
    "options": [
      "`r['owner']`",
      "`r['criticality'] == 'high'`",
      "`r['ip'].startswith('10')`",
      "`r['hostname'].endswith('1')`"
    ],
    "correct": 1,
    "explanation": "Both `'web-01'` and `'hr-portal'` carried `'high'` criticality while `'printer-3'` carried `'low'`."
  },
  {
    "id": "q_c4_m3_154",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py`'s `writer.writerow({k: safe_cell(v) for k, v in row.items()})`. What `AttributeError` bug occurs if `row` contains an integer count column like `{'user': 'asha', 'failures': 7}` instead of pure strings, and how do you make the comprehension type-safe?",
    "options": [
      "Integers crash `csv.DictWriter` natively",
      "`row.items()` drops integer values silently",
      "Calling `value[0]` inside `safe_cell(7)` raises `TypeError: 'int' object is not subscriptable`! Guard `safe_cell` cleanly via `isinstance(value, str)` (or cast/format before indexing `value[0]`)",
      "`+` concatenates `'7'` automatically"
    ],
    "correct": 2,
    "explanation": "Mixed dict exports containing `int`/`None` break unguarded `value[0]` indexing unless `safe_cell` converts/guards non-strings cleanly."
  },
  {
    "id": "q_c4_m3_155",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "In JSON specification (RFC 8259), which quotation marks are valid around property keys and string values?",
    "options": [
      "Either single `'...'` or double `\"...\"`",
      "Unquoted keys followed by single quotes",
      "Backticks `` `...` `` only",
      "Strictly double quotes `\"...\"`"
    ],
    "correct": 3,
    "explanation": "Single-quoted keys immediately fail `json.loads()` with `JSONDecodeError: Expecting property name enclosed in double quotes`."
  },
  {
    "id": "q_c4_m3_156",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Why must analysts parsing YAML config/rule files (using PyYAML) face an analogous deserialization trap to `pickle`, requiring `yaml.safe_load()` instead of bare `yaml.load()`?",
    "options": [
      "Historically, unsafe full-loader YAML constructors (`!!python/object/apply:...`) could instantiate arbitrary Python callables similarly to `pickle`, whereas `yaml.safe_load()` restricts parsing strictly to safe passive data types!",
      "`yaml.safe_load()` removes indentation",
      "PyYAML requires UTF-16 by default",
      "`yaml.load()` only parses integers"
    ],
    "correct": 0,
    "explanation": "Unsafe deserializers (`pickle`, `marshal`, unsafely configured YAML `Loader`) turn text/binary inputs directly into code execution unless restricted to safe data-only parsers."
  },
  {
    "id": "q_c4_m3_157",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "What does the alternation operator `|` perform inside `r'(ssh|rdp|https)'`?",
    "options": [
      "Bitwise OR on ASCII values",
      "Matches either `'ssh'`, `'rdp'`, or `'https'` cleanly",
      "Requires all three words together",
      "Separates capture group names"
    ],
    "correct": 1,
    "explanation": "Remember `|` inside unparenthesized patterns has very low precedence (`^a|b$` means `^a` OR `b$`), so always wrap alternations tightly inside `(?:a|b)`!"
  },
  {
    "id": "q_c4_m3_158",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Spot the classic alternation-precedence bug in `r'^10\\.0\\.|192\\.168\\.'` intended to match internal private prefixes ONLY at the start of an IP string! Why does `'evil.com/192.168.1.1'` match falsely?",
    "options": [
      "`|` binds tighter than `^` automatically",
      "`192\\.168\\.` is invalid regex syntax",
      "`|` has lower precedence than `^`, so Python parses it as `(^10\\.0\\.) OR (192\\.168\\.)`—leaving the `192.168.` branch COMPLETELY unanchored! Always write `r'^(?:10\\.0\\.|192\\.168\\.)'`",
      "`^` forces trailing match automatically"
    ],
    "correct": 2,
    "explanation": "Unbracketed `|` splits anchors silently; wrap alternations inside `(?:...)` whenever anchored with `^` or `$` (or better yet use `ipaddress.is_private`!)."
  },
  {
    "id": "q_c4_m3_159",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "From `m03_files_data.py`, how did timing increase across `n=18`, `n=20`, `n=22` on `^(a+)+$`?",
    "options": [
      "Decreased linearly as `n` grew",
      "Timed out immediately at `n=18`",
      "Stayed constant near `0.000038 s`",
      "Roughly quadrupled for every 2 extra `'a'` characters (`0.008 s -> 0.036 s -> 0.132 s`)"
    ],
    "correct": 3,
    "explanation": "Doubling per single character translates to ~4x runtime growth per 2-character step."
  },
  {
    "id": "q_c4_m3_160",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "In `m03_files_data.py`, why can changing `(.*)+` even without adjacent identical tokens cause disaster inside HTML/HTTP inspection rules if `re.DOTALL` is accidentally active?",
    "options": [
      "Wildcard `.` overlaps with every character across multi-kilobyte payloads—creating polynomial or exponential backtrack paths across multiple occurrences of `.*` whenever a trailing literal misses!",
      "`re.DOTALL` slows ASCII digits by 100x",
      "`+` ignores wildcards under `re.DOTALL`",
      "`re.compile()` deletes newlines under `re.DOTALL`"
    ],
    "correct": 0,
    "explanation": "Even multiple flat `.*.*` sequences on huge strings trigger $O(k^m)$ quadratic/polynomial backtracking pauses; Cloudflare's 2019 outage famously stemmed from `.*(?:.*=.*)` style backtracking."
  },
  {
    "id": "q_c4_m3_161",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, why are synthetic alerts stored inside a temporary folder returned by `tempfile.mkdtemp()` rather than overwriting repo lab files?",
    "options": [
      "`pathlib` forbids reading files inside repo folders",
      "Leaves the source repository untouched, stays OS-portable, and isolates test outputs cleanly for removal via `shutil.rmtree()`",
      "`mkdtemp` runs scripts with elevated root rights",
      "`json.loads()` only accepts paths in `/tmp`"
    ],
    "correct": 1,
    "explanation": "Self-contained `tempfile` labs stay clean, repeatable, and non-destructive across workstations."
  },
  {
    "id": "q_c4_m3_162",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py` lines 28–31: line 28 opens `log_file` with `'w', encoding='utf-8', newline='\\n'`, and line 30 opens it with `'a', encoding='utf-8'`. Why might omitting `newline='\\n'` on that `'a'` append cause mixed LF + CRLF line endings on Windows?",
    "options": [
      "Mode `'a'` inherits `newline` from previous `'w'` opens automatically",
      "`'a'` omits newlines on line 5 silently",
      "Each `open()` sets newline translation independently—so opening `'a'` on Windows without `newline='\\n'` writes `\\r\\n` on line 5 while lines 1–4 end in `\\n`!",
      "Lines 1–4 become binary automatically"
    ],
    "correct": 2,
    "explanation": "Pass `newline='\\n'` consistently across text file writers whenever cross-OS deterministic line endings or reproducible cryptographic hashes are desired."
  },
  {
    "id": "q_c4_m3_163",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "Wait: what does `fh.seek(0)` do on a text stream vs why don't you usually need `.seek()` when closing a `with` block cleanly and reopening for a second pass?",
    "options": [
      "Deletes file bytes past index 0",
      "Reverses lines bottom-up",
      "Truncates the file size to 0",
      "Moves the read cursor back to byte offset 0 without reopening; useful on seekable disk files, though single-pass streaming avoids reading massive files twice"
    ],
    "correct": 3,
    "explanation": "Single-pass streaming over giant evidence logs eliminates redundant disk I/O entirely."
  },
  {
    "id": "q_c4_m3_164",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "Suppose a binary hash check needs UTF-8 bytes of a log message `msg = 'user=asha'` concatenated with a binary header `b'\\x01\\x00'`. Why does `b'\\x01\\x00' + msg` raise `TypeError`, and how do you combine them cleanly?",
    "options": [
      "Python forbids adding `bytes` and `str`; explicitly encode the text portion first (`b'\\x01\\x00' + msg.encode('utf-8')`) so all operands are raw octets!",
      "Cast the binary header to `str(b'\\x01\\x00')`",
      "Concatenate with `f'{hdr}{msg}'`",
      "Use `.split()` first"
    ],
    "correct": 0,
    "explanation": "Note calling `str(b'\\x01')` yields literal ASCII string `\"b'\\\\x01'\"`—a terrible bug! Always encode text cleanly via `.encode('utf-8')` when constructing binary buffers."
  },
  {
    "id": "q_c4_m3_165",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "Why does `m03_files_data.py` read CSV rows using `with assets_csv.open(newline='', encoding='utf-8') as fh:` rather than calling `.splitlines()` + `.split(',')`?",
    "options": [
      "`csv.DictReader` splits faster on empty lines only",
      "`csv.DictReader` handles quoted commas, doubled quotes, and header keys reliably",
      "`.splitlines()` fails on UTF-8 files",
      "`split(',')` returns sets instead of lists"
    ],
    "correct": 1,
    "explanation": "Real-world CSV exports routinely quote commas and line breaks inside text cells."
  },
  {
    "id": "q_c4_m3_166",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Why does calling `json.loads(text)` reject Python tuple syntax `(22, 443)` and Python `True` (capital T), forcing automated security tooling to verify valid JSON formatting before ingestion?",
    "options": [
      "`json` only parses strings inside Python 3.10",
      "`json.loads()` accepts `True` automatically",
      "Strict RFC 8259 JSON supports ONLY `[...]` arrays and lowercase `true`/`false`/`null` primitives—catching accidental serialization of Python `repr()` strings early with `JSONDecodeError`!",
      "Tuples convert silently into sets"
    ],
    "correct": 2,
    "explanation": "A frequent rookie bug is writing `str(my_dict)` to a `.json` file (`{'ok': True}` single-quoted); strictly using `json.dumps()` produces valid cross-tool JSON."
  },
  {
    "id": "q_c4_m3_167",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "Inside `(?P<port>\\d+)$`, what does the trailing `$` token enforce?",
    "options": [
      "Matches a literal dollar sign `$`",
      "Indicates currency formatting",
      "Multiplies digits by 100",
      "Anchors the match strictly at the end of the line/string"
    ],
    "correct": 3,
    "explanation": "`$` ensures no unexpected extra unparsed characters remain after the port number."
  },
  {
    "id": "q_c4_m3_168",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Identify which regex below stays strictly immune to exponential backtracking regardless of arbitrary mismatch strings: `A: r'^(a+)+$'`, `B: r'^([a-zA-Z0-9]+)*$'`, `C: r'^[a-zA-Z0-9]+$'`, `D: r'^(a|aa)+$'`.",
    "options": [
      "Pattern C (`r'^[a-zA-Z0-9]+$'`, flat unnested anchored character class)",
      "Pattern B",
      "Pattern A",
      "Pattern D"
    ],
    "correct": 0,
    "explanation": "Patterns A, B, and D all exhibit nested or overlapping ambiguous repetitions (`a|aa` under `+` backtracks identically in $O(2^n)$!), whereas flat Pattern C runs linearly."
  },
  {
    "id": "q_c4_m3_169",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "What output did `m03_files_data.py` print on line 66 (`findall IPs`) from the 5 synthetic `auth.log` lines?",
    "options": [
      "`['203.0.113.7', '198.51.100.23']`",
      "`['10.20.4.17', '198.51.100.23', '203.0.113.7']`",
      "`['999.1.1.1']`",
      "`['127.0.0.1']`"
    ],
    "correct": 1,
    "explanation": "Unique dotted-quad IPs extracted cleanly across failed, accepted, and closed syslog lines were those exact three sorted addresses."
  },
  {
    "id": "q_c4_m3_170",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "In `pathlib`, compare `p.write_text('hello', encoding='utf-8')` vs `with p.open('a', encoding='utf-8') as fh: fh.write(...)`. Which mistake wipes out previously collected alert entries on disk?",
    "options": [
      "Calling `.open('a')` twice",
      "Passing `encoding='utf-8'` to `open()`",
      "Calling `p.write_text(...)` repeatedly to add new alerts—`write_text()` opens internally in **`'w'` truncate mode** every call, erasing all prior text cleanly!",
      "Missing `fh.flush()` inside `with`"
    ],
    "correct": 2,
    "explanation": "`Path.write_text()` is strictly a whole-file replacement helper (`'w'`), never an append method; use `.open('a', encoding='utf-8')` to append logs."
  },
  {
    "id": "q_c4_m3_171",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Which method decodes a UTF-8 `bytes` object `raw` into a Python `str` while converting unrecognized octets to `?` (`\\ufffd`) instead of crashing?",
    "options": [
      "`raw.encode('utf-8', errors='replace')`",
      "`ascii(raw)`",
      "`raw.decode('ascii')`",
      "`raw.decode('utf-8', errors='replace')`"
    ],
    "correct": 3,
    "explanation": "`raw.decode('utf-8', errors='replace')` replaces malformed byte spans cleanly with Unicode replacement character `U+FFFD`."
  },
  {
    "id": "q_c4_m3_172",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "Suppose a CSV file holds `-27.5` inside an asset temperature sensor column vs `'=cmd|...'` inside a username column, and Excel users insist `-27.5` still plot mathematically. How does targeted schema-typed CSV serialization solve this cleanly without disabling CWE-1236 protection?",
    "options": [
      "Enforce numeric typing cleanly ONLY on validated float/int columns (`float(val)` succeeds -> numeric output), while running `safe_cell()` strictly on EVERY arbitrary text column!",
      "Turn off `safe_cell()` globally for all columns",
      "Replace all hyphens with underscores everywhere",
      "Export passwords inside comments"
    ],
    "correct": 0,
    "explanation": "Validating numeric sensor columns strictly as bounded floats guarantees an attacker string like `-1+cmd|...` fails float parsing while real numbers plot cleanly."
  },
  {
    "id": "q_c4_m3_173",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "Suppose `alerts.json` contains a list of two alert dicts (`count` = 7 and 1). If an analyst loads `alerts = json.loads(...)`, what expression safely checks whether optional key `'user'` exists on `alerts[0]`?",
    "options": [
      "`'user' in alerts`",
      "`'user' in alerts[0]`",
      "`alerts[0].has('user')`",
      "`alerts[0]['user'] is True`"
    ],
    "correct": 1,
    "explanation": "Checking `'user' in alerts[0]` (or using `.get('user')`) avoids raising `KeyError` on sparse telemetry schemas."
  },
  {
    "id": "q_c4_m3_174",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "Compare two scripts parsing partner JSON feeds: Script A sets no size limit and passes `raw.decode()` straight into `json.loads()`, whereas Script B validates max content length (e.g. `<= 10 MiB`), wraps `json.loads()` in `try/except json.JSONDecodeError`, and checks `isinstance(data, list)` + field types. Why does Script B block both availability and logic bugs?",
    "options": [
      "`json.loads()` takes infinite time on 1 KB files",
      "Script B skips UTF-8 decoding cleanly",
      "Pre-parse byte limits prevent RAM exhaustion from giant payloads, exception handling catches syntax abuse cleanly, and post-parse type validation stops unexpected root scalars (`None`, `int`) from breaking callers!",
      "Checking `isinstance` executes embedded JSON functions"
    ],
    "correct": 2,
    "explanation": "Defensive boundary parsing always checks **size**, **syntax exceptions**, and **data structure schema** before trusting parsed output."
  },
  {
    "id": "q_c4_m3_175",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "Inside `re.compile(...)`, what does `+` signify compared to `*`?",
    "options": [
      "`+` matches 0 or 1; `*` matches 1 or more",
      "Both require at least 1 character",
      "`+` adds literal strings; `*` multiplies digits",
      "`+` matches **1 or more** repetitions; `*` matches **0 or more** repetitions"
    ],
    "correct": 3,
    "explanation": "Mnemonic: `+` requires at least 1 match; `*` accepts zero matches (which can produce surprising empty-string matches cleanly!)."
  },
  {
    "id": "q_c4_m3_176",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Watch out when passing `r'\\d*'` (star quantifier) to `re.search(r'\\d*', 'abc')` vs `r'\\d+'`: what surprising truthy match object does `re.search(r'\\d*', 'abc')` return?",
    "options": [
      "Matches the **empty string `''` at index `0`**, returning a truthy `re.Match` object with `m.group() == ''`, fooling naive `if m:` checks!",
      "`None` cleanly",
      "Raises `ValueError`",
      "Matches `'abc'` completely"
    ],
    "correct": 0,
    "explanation": "Because `*` allows 0 repetitions, unanchored `*` patterns match an empty string cleanly on every input—use `+` (`1+`) and explicit context boundaries when requiring non-empty tokens."
  },
  {
    "id": "q_c4_m3_177",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "What staging lesson did Cloudflare highlight after its July 2019 outage caused by pushing a bad WAF rule worldwide simultaneously?",
    "options": [
      "Delete all WAF staging clusters permanently",
      "Roll out rule updates gradually in staged/canary deployments with automated performance profiling and CPU watchdogs",
      "Deploy directly to 100% of data centers faster",
      "Disable HTTPS certificates during deployments"
    ],
    "correct": 1,
    "explanation": "Staged rollouts catch CPU degradation on a small subset of traffic long before causing a worldwide blackout."
  },
  {
    "id": "q_c4_m3_178",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Notice a subtle nested-quantifier trap inside regexes validating hyphenated hostnames or tags: `r'^([a-z0-9]+-?)+$'` against `'aaaaaaaaaaaaaaaaaaaaaaaa!'`. Why does that `-?` look innocent yet fail identically to `^(a+)+$`?",
    "options": [
      "Hyphens disable anchors cleanly",
      "`$` prevents backtracking on alphanumeric strings",
      "Making the separator `-?` optional lets adjacent `[a-z0-9]+` blocks merge without hyphens cleanly in $2^{n-1}$ overlapping ways upon seeing trailing `'!'`—rewrite with a mandatory separator `r'^[a-z0-9]+(?:-[a-z0-9]+)*$'`!",
      "`!` clears CPU caches"
    ],
    "correct": 2,
    "explanation": "An *optional delimiter* between quantified groups is one of the commonest real-world ReDoS traps; always make inner separators mandatory outside optional trailing repetitions."
  },
  {
    "id": "q_c4_m3_179",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, how did the script inspect `alerts.json` without leaving open handles dangling?",
    "options": [
      "Invoked `subprocess.run(['cat', ...])`",
      "Left `fh.open()` unclosed at EOF",
      "Called `pickle.load()`",
      "Used `alerts_json.read_text(encoding='utf-8')`, which opens, decodes, and closes the file cleanly before returning its string"
    ],
    "correct": 3,
    "explanation": "`Path.read_text()` manages internal `with open(...)` closure cleanly for small configuration and alert files."
  },
  {
    "id": "q_c4_m3_180",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "difficult",
    "q": "Compare `sorted(set(re.findall(...)))` in `m03_files_data.py` on IPs `'10.20.4.17'`, `'198.51.100.23'`, `'203.0.113.7'` vs adding `'9.9.9.9'` into the log! Why does lexicographic `sorted()` put `'198.51.100.23'` BEFORE `'9.9.9.9'`, and how do you sort numerically by actual IP value?",
    "options": [
      "Alphabetical string comparison compares `'1' < '9'` first—parse unique candidates via `ipaddress.ip_address` and pass `key=ipaddress.ip_address` (handling IPv4 cleanly)!",
      "Strings sort `'9'` after `'1'` numerically automatically",
      "`set()` already sorts IPs numerically",
      "`sorted(..., reverse=True)` sorts numerically"
    ],
    "correct": 0,
    "explanation": "Parsing validated `IPv4Address` objects gives semantically accurate numeric sorting (`9.9.9.9` before `10.x`) alongside automatic invalid-octet rejection."
  },
  {
    "id": "q_c4_m3_181",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "medium",
    "q": "In `m03_files_data.py`, which mode prevented `log_file.open('a', ...)` from overwriting the initial 4 SSH log lines written in step 1?",
    "options": [
      "`'w'`",
      "`'a'` (append mode)",
      "`'rb'`",
      "`'x'`"
    ],
    "correct": 1,
    "explanation": "Line 28 opened `'w'` to create the initial 4-line log, and line 30 switched to `'a'` to append line 5 cleanly."
  },
  {
    "id": "q_c4_m3_182",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "difficult",
    "q": "An investigator reads raw HTTP headers cleanly with `errors='surrogateescape'` vs `errors='replace'`. If the script later calls `print(line)` or `json.dumps({'line': line})`, why can `'surrogateescape'` unexpectedly crash downstream JSON serialization with `UnicodeEncodeError`, making `errors='replace'` or `'backslashreplace'` far safer for pipelines?",
    "options": [
      "`surrogateescape` converts strings into integers",
      "`errors='replace'` throws away ASCII text",
      "`surrogateescape` stores un-decodable octets as invalid lone UTF-16 surrogates (`U+DC80..U+DCFF`), which UTF-8 encoders and JSON serializers strictly reject with `UnicodeEncodeError`!",
      "`json.dumps()` supports invalid surrogates natively"
    ],
    "correct": 2,
    "explanation": "Prefer `'replace'` or `'backslashreplace'` when passing parsed strings downstream into UTF-8 CSV/JSON logs cleanly."
  },
  {
    "id": "q_c4_m3_183",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "medium",
    "q": "Why does OWASP consider leading `'+'` and `'-'` inside exported CSV user strings risky just like `'='`?",
    "options": [
      "Only Windows PowerShell executes `-`",
      "`+` triggers JSON decoding errors",
      "`-` truncates rows in `DictWriter`",
      "Spreadsheet parsers treat `+1+1`, `-1+1`, or `+cmd|...` expressions as evaluable arithmetic/formula commands"
    ],
    "correct": 3,
    "explanation": "Excel and spreadsheet engines historically treat leading `=`, `+`, `-`, `@`, tab, and CR identically as formula entry prefixes."
  },
  {
    "id": "q_c4_m3_184",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "difficult",
    "q": "A SIEM connector receives JSON alerts containing attacker strings `\"msg\": \"foo\\nALERT user=admin\"` vs malformed JSON. Why is JSON better than plain text line concatenation for storing multi-line alert notes?",
    "options": [
      "JSON escapes embedded newlines (`\\n`), quotes (`\\\"`), and tabs inside distinct string values structurally—preventing an attacker's embedded newline from masquerading as a second independent log record (log injection)!",
      "JSON executes `\\n` automatically inside shells",
      "JSON removes newlines silently during `loads()`",
      "Plain text files prevent log injection cleanly"
    ],
    "correct": 0,
    "explanation": "Structured JSON serialization encapsulates control characters inside atomic JSON fields instead of forging separate plain-text log lines."
  },
  {
    "id": "q_c4_m3_185",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "medium",
    "q": "In `pattern.match(line)` from `m03_files_data.py`, how did `int(m['port'])` turn the captured port text into an integer cleanly?",
    "options": [
      "Regex groups always return `int` automatically when using `\\d+`",
      "Regex captures always return `str`, so `int(m['port'])` converts `'50122'` -> `50122` explicitly",
      "`m['port']` converts strings only with `re.INT`",
      "`match()` casts all named groups automatically"
    ],
    "correct": 1,
    "explanation": "Even when matching `\\d+`, regex captures return string slices requiring explicit numeric parsing and range validation."
  },
  {
    "id": "q_c4_m3_186",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "Look at `m03_files_data.py`'s line `from (?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3}) port (?P<port>\\d+)$`. What happens when a future Linux host enables IPv6 SSH logins (`from 2001:db8::7 port 50122`)?",
    "options": [
      "Matches cleanly into `m['ip']`",
      "Raises `re.error` at runtime",
      "Silently returns `None` (`if m:` skips the line!) because the pattern accepts strictly dotted-quad IPv4 syntax—reminding engineers to support and test IPv6 address tokens (`\\S+` + `ipaddress.ip_address`) cleanly!",
      "Converts IPv6 into IPv4 automatically"
    ],
    "correct": 2,
    "explanation": "Assuming IPv4-only dotted quads silently blinds detections across dual-stack IPv6 hosts; matching token `(?P<ip>\\S+)` validated by `ipaddress.ip_address()` handles both cleanly!"
  },
  {
    "id": "q_c4_m3_187",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Which weakness family in MITRE CWE classifies ReDoS vulnerabilities triggered by nested or overlapping backtracking quantifiers?",
    "options": [
      "CWE-78",
      "CWE-502",
      "CWE-22",
      "CWE-1333"
    ],
    "correct": 3,
    "explanation": "MITRE CWE-1333 defines 'Inefficient Regular Expression Complexity' (ReDoS)."
  },
  {
    "id": "q_c4_m3_188",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Compare timing of `^a+$` (`0.000038 s` in Python 3.12 / `0.000004 s` in Python 3.14) vs `^(a+)+$` (`0.132 s` / `0.127 s`) at `n=22`. Even BEFORE hitting hour-long stalls, what approximate slow-down ratio already shows up at just 22 characters?",
    "options": [
      "Over 3,400x slower (`0.132 / 0.000038` ~ 3,474x in CPython 3.12, > 30,000x in 3.14) from a pattern whose regex text looks virtually identical!",
      "Roughly 2x slower",
      "Roughly 10x slower",
      "Identical within noise margin"
    ],
    "correct": 0,
    "explanation": "Measuring empirically proves how dramatically redundant outer `+` quantification degrades efficiency even on tiny 23-byte strings."
  },
  {
    "id": "q_c4_m3_189",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "In Practical P2 (`C04-M03-P2`), why is capping `n <= 24` explicitly listed in the authorized workstation scope?",
    "options": [
      "Regexes fail syntax validation above `n=24`",
      "Testing `n=35..40` on `^(a+)+$` hangs your CPU for minutes to hours; keeping `n <= 24` demonstrates the exponential trend cleanly in under a second",
      "Python limits strings to 24 chars in REPL",
      "`time.perf_counter()` resets past `n=24`"
    ],
    "correct": 1,
    "explanation": "Bounded empirical benchmarking exposes exponential scaling safely without hanging the analyst's machine."
  },
  {
    "id": "q_c4_m3_190",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "Consider `with path.open('w', encoding='utf-8') as fh: ...`. If an unhandled `ZeroDivisionError` occurs halfway through writing JSON inside the `with` block, does Python still close `fh` cleanly, AND what state is the file in on disk?",
    "options": [
      "`fh` stays open leaked, and content reverts cleanly",
      "`with` rolls back disk writes like SQL transactions automatically",
      "`with` closes `fh` cleanly, **yet the file on disk remains half-written/corrupt!** For crash-safe updates, write to a temp file in the same directory and finish with `tmp.replace(target)` atomically!",
      "Raises `IOError` masking `ZeroDivisionError`"
    ],
    "correct": 2,
    "explanation": "Context managers close handles reliably—they do NOT roll back half-written files! Atomic write-to-temp + `Path.replace()` protects baselines and configs against torn writes."
  },
  {
    "id": "q_c4_m3_191",
    "topic": "C04-M03-L02: Text, Bytes & Encodings",
    "difficulty": "medium",
    "q": "Which error exception class occurs when calling `b'caf\\xc3\\xa9'.decode('ascii')`?",
    "options": [
      "`UnicodeEncodeError`",
      "`FileNotFoundError`",
      "`JSONDecodeError`",
      "`UnicodeDecodeError`"
    ],
    "correct": 3,
    "explanation": "Converting `bytes -> str` fails with `UnicodeDecodeError`, whereas `str -> bytes` fails with `UnicodeEncodeError`."
  },
  {
    "id": "q_c4_m3_192",
    "topic": "C04-M03-L03: CSV & Formula Injection",
    "difficulty": "difficult",
    "q": "An auditor inspects `report.csv` generated by `m03_files_data.py`: `asha,\"'=HYPERLINK(\"\"http://example.com\"\",\"\"click\"\")\"`. If the auditor re-reads `report.csv` back into Python via `csv.DictReader`, what string value does `row['note']` hold?",
    "options": [
      "`\"'=HYPERLINK(\\\"http://example.com\\\",\\\"click\\\")\"` (including the neutralizing leading single quote cleanly stripped of outer CSV escaping!)",
      "`\"=HYPERLINK(...)\"` without the apostrophe",
      "`'=HYPERLINK(\"\"http://example.com\"\",\"\"click\"\")'` with doubled quotes",
      "Executes a web request automatically"
    ],
    "correct": 0,
    "explanation": "`csv.DictReader` reverses RFC 4180 outer quoting and doubled inner quotes cleanly, preserving the exact string passed to `writer.writerow()` (so downstream consumers should strip or remember that leading `'` prefix)."
  },
  {
    "id": "q_c4_m3_193",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "In the clean data pipeline pattern (`C04-M03-F1`), which stage directly follows parsing (`csv`, `json`, `re`) before analysis and aggregation?",
    "options": [
      "Clean up temporary data",
      "Normalize parsed values (data types, UTC timestamps, lowercase names) and validate extracted fields (`ipaddress`)",
      "Serialize with `pickle`",
      "Skip invalid lines silently without counting"
    ],
    "correct": 1,
    "explanation": "Normalization ensures heterogeneous text representations share canonical comparable types and time zones prior to detection analysis."
  },
  {
    "id": "q_c4_m3_194",
    "topic": "C04-M03-L05: Regular Expressions",
    "difficulty": "difficult",
    "q": "An analyst writes `re.compile(r'([a-z]+):(\\d+)')` to parse `'user:1001'`, then later extracts `m.group(0)`, `m.group(1)`, and `m.group(2)`. What does `m.group(0)` always return cleanly?",
    "options": [
      "`'user'`",
      "`1001` as an integer",
      "`'user:1001'` (the **entire** regex match span), while `.group(1)` is `'user'` and `.group(2)` is `'1001'`",
      "A tuple `('user', '1001')`"
    ],
    "correct": 2,
    "explanation": "Group `0` always denotes the whole matched span; numbered parenthesized captures begin at group `1` (or prefer readable named groups `(?P<user>...)`)."
  },
  {
    "id": "q_c4_m3_195",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "medium",
    "q": "Which of the following is NOT an effective engineering defense against ReDoS on untrusted strings?",
    "options": [
      "Removing nested and overlapping quantifiers",
      "Using Google's linear-time `RE2` binding for user-supplied regexes",
      "Enforcing maximum input string length before calling `re.match()`",
      "Swallowing runtime hangs inside `try ... except:` without timeouts or input caps"
    ],
    "correct": 3,
    "explanation": "Python's standard `re` C engine freezes CPU without throwing exceptions on backtracking; caps, linear engines (`RE2`), or process timeouts are required."
  },
  {
    "id": "q_c4_m3_196",
    "topic": "C04-M03-L06: ReDoS & Cloudflare CS1",
    "difficulty": "difficult",
    "q": "Look at Practical P2's refactor: converting `r'^(\\w+\\s?)+$'` into `r'^\\w+(?:\\s\\w+)*$'`. Trace `'a a !'` step by step on the safe rewrite: does ANY step ever reconsider how preceding `'a '` tokens split?",
    "options": [
      "No! Each repetition `(?:\\s\\w+)` MUST start on literal whitespace `'\\s'` cleanly separating alphanumeric `'\\w+'` blocks—making word boundaries disjoint so failure at `'!'` rejects linearly without branching!",
      "Yes, twice per space",
      "Only if `\\w+` matches spaces",
      "Requires `re.MULTILINE` to become linear"
    ],
    "correct": 0,
    "explanation": "Disjoint character classes (`\\s` vs `\\w`) around boundaries lock partition choices deterministically, eliminating backtrack cascades cleanly."
  },
  {
    "id": "q_c4_m3_197",
    "topic": "C04-M03-P1 & P2: Data Pipeline Labs",
    "difficulty": "medium",
    "q": "Which exception does `m03_files_data.py` catch explicitly on line 90 when demonstrating why `'{'single': 'quotes'}'` is malformed JSON?",
    "options": [
      "`KeyError`",
      "`json.JSONDecodeError`",
      "`UnicodeDecodeError`",
      "`SyntaxError`"
    ],
    "correct": 1,
    "explanation": "`m03_files_data.py` catches `json.JSONDecodeError` and prints `err.msg`: `'Expecting property name enclosed in double quotes'`."
  },
  {
    "id": "q_c4_m3_198",
    "topic": "C04-M03-L01: pathlib & File Modes",
    "difficulty": "difficult",
    "q": "A developer concatenates strings manually: `report = folder + '\\\\' + name` and later switches servers to Ubuntu Linux. Why does `folder + '\\\\' + name` fail silently on Linux while `Path(folder) / name` works identically across both OSes?",
    "options": [
      "Windows only supports `'/'` in Python 3.12",
      "Linux forbids `Path` objects completely",
      "Linux interprets `'\\\\'` literally as part of a single flat filename (`folder\\name`) instead of a subdirectory path separator!",
      "`pathlib` automatically encrypts directory strings"
    ],
    "correct": 2,
    "explanation": "`pathlib.Path` generates native platform separators cleanly while avoiding literal backslash bugs across POSIX/Windows environments."
  },
  {
    "id": "q_c4_m3_199",
    "topic": "C04-M03-L04: JSON & Serialization Safety",
    "difficulty": "medium",
    "q": "In JSON, what Python type does `json.loads('42')` return?",
    "options": [
      "`str` `'42'`",
      "`bool`",
      "`float` `42.0`",
      "`int` `42`"
    ],
    "correct": 3,
    "explanation": "Unquoted integers in JSON parse cleanly to Python `int` (`42`); decimals parse to `float` (`42.0`)."
  },
  {
    "id": "q_c4_m3_200",
    "topic": "C04-M03-L01..L06: Module 3 Synthesis",
    "difficulty": "difficult",
    "q": "Synthesizing all four data-security rules of Module 3 across a SOC log pipeline: which design choice would simultaneously introduce THREE distinct security/availability defects at once?",
    "options": [
      "Streaming UTF-8 line-by-line, validating IPs via `ipaddress`, writing JSON with `indent=2`, and escaping CSV via `safe_cell()`",
      "Calling `.read_text()` on unbounded uploaded logs, parsing custom partner alerts with `pickle.loads()`, extracting strings using nested regex `^(.*)*x$`, and exporting raw usernames to `.csv` without `safe_cell()`!",
      "Opening files in `'rb'` mode with `with` blocks and `errors='replace'` logs",
      "Sorting deduplicated regex IPs after validation inside `tempfile.TemporaryDirectory`"
    ],
    "correct": 1,
    "explanation": "Unbounded `.read_text()` (OOM DoS), `pickle.loads()` (`CWE-502` RCE), nested quantifiers (`CWE-1333` ReDoS), and raw CSV output (`CWE-1236` Formula Injection) illustrate every major Module 3 anti-pattern together."
  }
];
