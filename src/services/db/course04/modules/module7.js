/**
 * Course 04: Python for Cybersecurity — Module 7 Data
 * Module ID: mod_c4_7 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module7Data = {
  "id": "mod_c4_7",
  "title": "Module 7: Defensive Automation",
  "description": "Build tamper-evident File Integrity Monitoring (FIM) baselines signed with canonical HMAC-SHA256, engineer declarative detection rules with suppression windows, and sanitize alert pipelines against ANSI, CSV, and HTML XSS injection.",
  "order": 7,
  "quiz": {
    "id": "quiz_mod_c4_7",
    "title": "Module 7: Defensive Automation Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
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
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m7_l1",
      "title": "Lesson 7.1: File Integrity Monitoring (FIM) Concepts & Change Sets",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Constructs cross-platform filesystem snapshots using normalized POSIX relative paths and SHA-256 digests, partitioning baseline changes cleanly into Added, Removed, Modified, and Unchanged sets.",
      "learning_objectives": [
        "Build deterministic filesystem snapshots using sorted relative POSIX paths (replacing backslashes) and 64 KiB chunked SHA-256 digests.",
        "Compute exact Added, Removed, Modified, and Unchanged sets using Python dictionary key set algebra.",
        "Integrate optional size and mtime pre-checks alongside fnmatch exclusions for volatile paths cleanly.",
        "Explain production FIM tooling workflows (AIDE, OSSEC, Wazuh) and compliance controls such as PCI DSS file integrity monitoring."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-01",
          "figure_number": "Figure 7.1",
          "lesson_id": "les_c4_m7_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l01_fim_workflow_snapshot_compare.png",
          "title": "End-to-End File Integrity Monitoring Snapshot and Comparison Loop (C04-M07-F1)",
          "purpose": "Trace the complete operational loop from initial signed snapshot capture through periodic rescanning, key-set comparison, baseline tamper rejection, and controlled accept rotation.",
          "accessibility_description": "Circular workflow diagram showing Init Snapshot -> HMAC Sign -> Periodic Rescan -> Verify Signature -> Compare Sets -> Alert on Diff or Accept Change.",
          "walkthrough_section": "Diagram Walkthrough: FIM Operational Lifecycle"
        },
        {
          "figure_id": "fig-04-07-02",
          "figure_number": "Figure 7.2",
          "lesson_id": "les_c4_m7_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l01_fim_set_difference_change_detection.png",
          "title": "Key-Set Partitioning Across Old and New FIM Baselines",
          "purpose": "Visualize how baseline dictionary key sets partition monitored filesystem trees into mutually exclusive Removed, Modified, Unchanged, and Added categories.",
          "accessibility_description": "Venn-style key-set partition diagram separating old.keys() and new.keys() into Removed (left), Unchanged vs Modified (intersection), and Added (right).",
          "walkthrough_section": "Diagram Walkthrough: Baseline Set Algebra"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-01",
          "title": "Figure 7.1: File Integrity Monitoring (FIM) Snapshot & Verification Loop",
          "url": "/assets/courses/cyber-04/c04_m7_l01_fim_workflow_snapshot_compare.png",
          "caption": "Figure 7.1 (C04-M07-F1): Clockwise 6-stage FIM sensor loop covering baseline snapshot capture, HMAC signing, 64 KiB periodic rescans, fail-closed signature verification, key-set diffing, and approved baseline re-signing.",
          "alt": "Circular 6-step FIM workflow looping around a FIM Sensor Loop shield: 1. Init Snapshot (SHA-256 + POSIX paths), 2. Sign Baseline (HMAC-SHA256 Tag), 3. Periodic Rescan (64 KiB Read), 4. Verify Signature (branching Tampered -> Reject & Alert!), 5. Diff Key Sets (Added / Removed / Modified), and 6. Triage Change (branching Unauthorized -> Alert! or Approved -> Re-Sign back to Step 2)."
        },
        {
          "id": "fig-04-07-02",
          "title": "Figure 7.2: FIM Baseline Comparison: Key-Set Change Partitioning",
          "url": "/assets/courses/cyber-04/c04_m7_l01_fim_set_difference_change_detection.png",
          "caption": "Figure 7.2: Overlapping key-set algebra partitioning monitored paths between old.keys() and new.keys() into Removed (O - N), Added (N - O), Modified (old[k] != new[k]), and Unchanged (old[k] == new[k]).",
          "alt": "Venn diagram comparing old.keys() (Baseline) and new.keys() (Current Scan) across Removed (O - N, hosts Missing!), Added (N - O, cron.evil New Drop!), and shared intersection O & N split between Modified (sshd_config) and Unchanged (Verified Clean)."
        }
      ],
      "content": "## 1. Detecting Unauthorized Filesystem State With Deterministic Snapshots\n\nIncident responders rarely discover an intrusion by reading source code line by line; instead, they ask a concrete forensic question: which files changed between last known-good maintenance and right now? Production platforms such as `AIDE`, `OSSEC`, and `Wazuh` answer this continuously via **File Integrity Monitoring (FIM)**, a requirement embedded inside PCI DSS cardholder environment compliance as well as endpoint hardening baselines in Course 03 Module 8.\n\nBuilding a custom Python FIM engine demonstrates why defensive automation depends on deterministic normalization and set algebra rather than fragile filename matching.\n\n## 2. Core Definitions & Set Algebra\n\n- **File Integrity Monitoring (FIM):** Automated security control that captures cryptographic fingerprints and metadata for critical files at rest, re-scans periodically, and alerts on unauthorized creation, deletion, or modification.\n- **Canonical Relative Path:** Path string normalized via POSIX forward slashes (`str(p.relative_to(root)).replace(\"\\\\\", \"/\")`) so baselines generated on Windows match verification checks on Linux or macOS without platform separator skew.\n- **Change-Set Partition:** Mutual exclusion split dividing every key in `old.keys() | new.keys()` cleanly into `Added`, `Removed`, `Modified`, or `Unchanged`.\n\nLet $O = \\text{keys}(\\text{old})$ be the baseline path set and $N = \\text{keys}(\\text{new})$ be the current snapshot path set. Set theory gives the exact mutually exclusive partition of monitored state:\n\n$$\n\\text{Added} = N \\setminus O, \\qquad \\text{Removed} = O \\setminus N, \\qquad \\text{Modified} = \\{ p \\in O \\cap N \\mid \\text{old}[p] \\neq \\text{new}[p] \\}\n$$\n\n:::math-steps Partitioning Monitored Host Files Across Baselines\nStep 01: Define the baseline manifest size |O| = 124 critical system and webroot files, and rescan snapshot size |N| = 126 files\nStep 02: Compute common paths in the intersection |O \\cap N| = 122 files present during both scans\nStep 03: Evaluate Added files as N \\setminus O = 126 - 122 = 4 newly created files (e.g., cron.evil webshells)\nStep 04: Evaluate Removed files as O \\setminus N = 124 - 122 = 2 deleted files (e.g., purged audit binaries)\nStep 05: Compare cryptographic hashes across the 122 shared paths; suppose 3 digests differ, leaving 122 - 3 = 119 Unchanged paths\nResult: Complete partition holds cleanly: 4 + 2 + 3 + 119 = 128 distinct union paths (|O \\cup N| = 128)\n:::\n\n## 3. Execution-Tested Snapshot & Compare Implementation\n\nSection 1 of `m07_defensive.py` constructs an in-memory snapshot and computes all three change sets using bounded 64 KiB SHA-256 reads (`Module 6`):\n\n```python\nimport hashlib\nfrom pathlib import Path\n\ndef sha256(path: Path) -> str:\n    h = hashlib.sha256()\n    with path.open(\"rb\") as fh:\n        for block in iter(lambda: fh.read(65536), b\"\"):\n            h.update(block)\n    return h.hexdigest()\n\ndef snapshot(root: Path) -> dict[str, str]:\n    files: dict[str, str] = {}\n    for p in sorted(root.rglob(\"*\")):\n        if p.is_file():\n            files[str(p.relative_to(root)).replace(\"\\\\\", \"/\")] = sha256(p)\n    return files\n\ndef compare(old: dict[str, str], new: dict[str, str]) -> dict[str, list[str]]:\n    return {\n        \"added\": sorted(new.keys() - old.keys()),\n        \"removed\": sorted(old.keys() - new.keys()),\n        \"modified\": sorted(k for k in old.keys() & new.keys() if old[k] != new[k]),\n    }\n```\n\nWhen executed against the synthetic host workspace containing `sshd_config`, `hosts`, and later inserting `cron.evil` while modifying `sshd_config` (`PermitRootLogin yes`) and deleting `hosts`, CPython produces exact deterministic output:\n\n```terminal\n1. baseline files: ['hosts', 'sshd_config']\n   baseline signature valid: True\n   changes: {'added': ['cron.evil'], 'removed': ['hosts'], 'modified': ['sshd_config']}\n```\n\n> [!TIP]\n> Notice why `snapshot()` stores keys relative to `root` (`\"sshd_config\"` rather than `\"C:\\\\Temp\\\\rk-m07-...\\\\sshd_config\"`). Using relative POSIX keys ensures snapshots survive host migrations, read-only container mount path shifts, and cross-platform incident analysis without throwing spurious diffs.\n\n## 4. Extending Baselines With Size, Mtime, and Volatile Exclusions\n\nReal servers often house tens of thousands of log files, session stores, and caches (`Scenario S1`). Practical `C04-M07-P1` upgrades the naive `{path: sha256}` map to a structured metadata dictionary:\n\n```python\n{\n    \"sshd_config\": {\n        \"sha256\": \"e3b0c442...\",\n        \"size\": 418,\n        \"mtime_ns\": 1762511420000000000\n    }\n}\n```\n\nAt scan time, pairing size/mtime comparison with configurable `fnmatch` exclude rules (`--exclude \"*.log\"`, `--exclude \"tmp/*\"`) keeps noise manageable. However, an attacker with root privileges can backdate file modification timestamps (`touch -r`) or preserve file size via padding—meaning security tools must still verify `SHA-256` on sensitive binaries, configuration directories, and webroots rather than trusting `mtime` alone.\n\n## 5. Diagram Walkthrough: FIM Operational Lifecycle\n\n![File Integrity Monitoring (FIM) Snapshot & Verification Loop](/assets/courses/cyber-04/c04_m7_l01_fim_workflow_snapshot_compare.png)\n*File Integrity Monitoring (FIM) Snapshot & Verification Loop.*\n\n**Figure 7.1** (`fig-04-07-01`) traces `C04-M07-F1` clockwise around the `FIM Sensor Loop`:\n- **Steps 1–3 (`Init Snapshot -> Sign Baseline -> Periodic Rescan`):** Walk targets into normalized `SHA-256 + POSIX paths` (`1`), seal the manifest with an `HMAC-SHA256 Tag` (`2`), and schedule bounded `64 KiB Read` rescans (`3`).\n- **Steps 4–6 (`Verify Signature -> Diff Key Sets -> Triage Change`):** Authenticate the manifest first—branching immediately on mismatch to **`Tampered -> Reject & Alert!`** (`4`)—then partition `Added / Removed / Modified` changes (`5`) and branch either to **`Unauthorized -> Alert!`** or rotate safely on maintenance via **`Approved -> Re-Sign`** back into Step 2 (`6`).\n\n## 6. Diagram Walkthrough: Baseline Set Algebra\n\n![FIM Baseline Comparison: Key-Set Change Partitioning](/assets/courses/cyber-04/c04_m7_l01_fim_set_difference_change_detection.png)\n*FIM Baseline Comparison: Key-Set Change Partitioning.*\n\n**Figure 7.2** (`fig-04-07-02`) maps the Venn partition separating `old.keys() (Baseline)` and `new.keys() (Current Scan)`:\n- **Disjoint Crescents (`Removed` & `Added`):** Left crescent isolates deletions **`Removed (O - N)`** (e.g., missing `hosts`), while the right crescent isolates newly created paths **`Added (N - O)`** (e.g., dropped `cron.evil`).\n- **Shared Intersection (`O & N`):** Paths present in both snapshots split cleanly by SHA-256 comparison—mismatched digests raise **`Modified`** alerts (e.g., altered `sshd_config`), while equal hashes confirm **`Unchanged` (`Verified Clean`)**."
    },
    {
      "id": "les_c4_m7_l2",
      "title": "Lesson 7.2: Signing Baselines & Separating Trust Boundaries",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Prevents attackers from rewriting local baselines cleanly using canonical JSON serialization (sort_keys=True), HMAC-SHA256 verification, and off-host key/baseline separation (Tamarind Travels CS2).",
      "learning_objectives": [
        "Explain why unsigned FIM baselines allow compromised hosts to conceal webshells and trojanized binaries by regenerating local hashes.",
        "Enforce deterministic canonical serialization (json.dumps(..., sort_keys=True)) before computing or verifying HMAC signatures.",
        "Verify baseline envelopes in constant time using hmac.compare_digest and fail closed when tampering or bad encodings occur.",
        "Design off-host baseline storage and central signing-key custody so root/www-data compromise cannot forge clean reports."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-03",
          "figure_number": "Figure 7.3",
          "lesson_id": "les_c4_m7_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l02_canonical_json_hmac_baseline.png",
          "title": "Deterministic JSON Serialization and HMAC Baseline Tamper Proofing",
          "purpose": "Illustrate how canonical sort_keys=True JSON serialization produces identical byte streams across processes so HMAC-SHA256 detects any unauthorized file modification or manifest edit.",
          "accessibility_description": "Data flow diagram contrasting non-canonical unordered JSON key variance against canonical sorted UTF-8 bytes feeding HMAC-SHA256 and constant-time comparison.",
          "walkthrough_section": "Diagram Walkthrough: Canonical Signing & Tamper Detection"
        },
        {
          "figure_id": "fig-04-07-04",
          "figure_number": "Figure 7.4",
          "lesson_id": "les_c4_m07_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l02_key_separation_offhost_trust_model.png",
          "title": "Local Self-Signed Baseline Failure vs. Off-Host Key Trust Separation",
          "purpose": "Compare the Tamarind Travels anti-pattern (baseline and key inside compromised webroot) against isolated central key storage and append-only off-host baseline verification.",
          "accessibility_description": "Split security boundary architecture contrasting an attacker forging both webroot files and local baseline versus failing against an isolated central verification collector.",
          "walkthrough_section": "Diagram Walkthrough: Off-Host Trust Boundaries"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-03",
          "title": "Figure 7.3: Canonical JSON Signing (sort_keys=True) & HMAC Verification",
          "url": "/assets/courses/cyber-04/c04_m7_l02_canonical_json_hmac_baseline.png",
          "caption": "Figure 7.3: Canonical sort_keys=True UTF-8 serialization produces identical byte streams for HMAC-SHA256 signing and constant-time compare_digest() checks, failing closed (Exit 2) on tampered entries.",
          "alt": "Two-track cryptographic diagram contrasting random key order mismatching HMAC tags against canonical sort_keys=True bytes signed with HMAC-SHA256 and checked via compare_digest() (Valid: True vs. sshd_config tampering -> False -> Exit 2!)."
        },
        {
          "id": "fig-04-07-04",
          "title": "Figure 7.4: Self-Signed Webroot Trap vs. Off-Host Key Trust Separation",
          "url": "/assets/courses/cyber-04/c04_m7_l02_key_separation_offhost_trust_model.png",
          "caption": "Figure 7.4: Co-locating baseline.json and signing keys in a compromised webroot lets attackers forge clean scans, whereas moving keys (0400) and authoritative baselines off-host catches backdoors immediately.",
          "alt": "Side-by-side trust zone comparison showing an attacker inside a Shared Webroot altering index.php and re-signing baseline.json to stay hidden, versus an isolated Trust Boundary Firewall separating Host Webserver from an Off-Host Vault / SIEM storing Secret Key (0400) and catching hash mismatches."
        }
      ],
      "content": "## 1. When Compromised Hosts Rewrite Their Own Security Reports\n\nSuppose an intruder breaches an organization's application server, implants a PHP webshell inside `/var/www/html/`, and edits `index.php`. If your File Integrity Monitor stores an unsigned JSON baseline on that exact same web server and alerts solely when current files diverge from the local JSON file, what happens the instant the intruder updates the JSON baseline too? Your monitoring console reports green status while the host remains actively backdoored.\n\nThis exact failure mode unfolds in **Case Study C04-M07-CS2 (Tamarind Travels)** and motivates every cryptographic and architectural boundary inside Module 7.\n\n## 2. Core Case Study: Tamarind Travels Webroot Forgery\n\n- **Scenario Overview (`C04-M07-CS2`):** In this fictional teaching scenario, Tamarind Travels stored its FIM baseline inside the application webroot under the exact OS user that ran the public PHP web service.\n- **Exploitation Path:** An adversary exploited a web vulnerability, dropped malicious PHP backdoors, and immediately re-ran the local baseline initialization step—overwriting clean hashes with backdoored hashes. For an entire month, automated nightly FIM checks compared compromised disk files against the compromised baseline and emailed clean green reports.\n- **Root Architectural Defect:** Putting both monitored targets and baseline state—or both baseline and HMAC secret key—inside the identical compromise blast radius completely collapses integrity assurance.\n\n> [!CAUTION]\n> **Self-Signed Baselines Provide Zero Adversary Resistance:** Hashing a file protects against accidental bit rot, and signing a baseline with a key readable by the compromised host process (`www-data`) fails immediately upon local compromise. Always separate signing verification keys and authoritative baselines off-host.\n\n## 3. Canonical JSON Serialization & HMAC Signing\n\nNotice why signing JSON requires deterministic serialization: dictionaries inserted in differing orders or formatted with inconsistent spacing serialize to distinct byte strings, breaking signature verification randomly across runs. Section 1 of `m07_defensive.py` eliminates ambiguity via `sort_keys=True` and verifies with constant-time `hmac.compare_digest()` :\n\n```python\nimport hashlib\nimport hmac\nimport json\n\ndef sign(data: dict, key: bytes) -> str:\n    blob = json.dumps(data, sort_keys=True).encode(\"utf-8\")\n    return hmac.new(key, blob, hashlib.sha256).hexdigest()\n\n# Envelope saved as baseline.json:\nenvelope = {\"files\": base, \"sig\": sign(base, key)}\n\n# Tamper check on load:\nraw = json.loads(baseline_path.read_text(encoding=\"utf-8\"))\nvalid = hmac.compare_digest(sign(raw[\"files\"], key), raw[\"sig\"])\n```\n\nNow trace what happens in `m07_defensive.py` when an intruder replaces a single hash entry inside `baseline.json` (`sshd_config = \"0\"*64`) without possessing `key`:\n\n```terminal\n   baseline signature valid: True\n   changes: {'added': ['cron.evil'], 'removed': ['hosts'], 'modified': ['sshd_config']}\n   tampered baseline valid: False\n```\n\nEven though the tampered JSON file remains syntactically valid UTF-8 and valid JSON, changing `\"files\"` breaks the envelope signature immediately, forcing the FIM tool to abort comparison and raise exit status `2` (fail-closed integrity error) rather than reporting false cleanliness.\n\nLet $M = \\text{encode}(\\text{json.dumps}(\\text{files}, \\text{sort\\_keys}=\\text{True}))$ and let $\\sigma_{\\text{stored}}$ be the persisted hexadecimal HMAC tag. Verification accepts if and only if constant-time equality holds across all 64 hexadecimal nibbles (256 bits):\n\n$$\n\\text{Verify}(K, M, \\sigma_{\\text{stored}}) = \\text{compare\\_digest}\\!\\left(\\text{HMAC}_{\\text{SHA-256}}(K, M),\\; \\sigma_{\\text{stored}}\\right)\n$$\n\n## 4. Production Trust Separation & Key Hygiene\n\nTo remediate Tamarind Travels cleanly (`Practical C04-M07-P1`), combine four structural safeguards:\n\n- **Off-Host Authoritative Storage:** Push initial known-good manifests and periodic file digests to a remote collector or read-only central artifact repository rather than leaving mutable authority in the webroot.\n- **Dedicated Service Principal:** Run the FIM scanner under an unprivileged account granted read-only traversal over monitored targets (`root` or read ACLs), isolated completely from `www-data` or web application accounts.\n- **Baseline Rotation (`accept`):** Expose an explicit administrative subcommand (`python fim.py accept`) requiring the off-host operator HMAC key (`--key-file`) after verified OS upgrades or deployments so routine maintenance does not trigger permanent drift alerts.\n- **Out-of-Band Key Custody:** Never place `--key-file` in the same writable application folder as the baseline. Protect key paths with strict POSIX permissions (`0400` / `0600`) or inject verification keys solely inside an external SIEM/CI runner.\n\n## 5. Diagram Walkthrough: Canonical Signing & Tamper Detection\n\n![Canonical JSON Signing (sort_keys=True) & HMAC Verification](/assets/courses/cyber-04/c04_m7_l02_canonical_json_hmac_baseline.png)\n*Canonical JSON Signing (sort_keys=True) & HMAC Verification.*\n\n**Figure 7.3** (`fig-04-07-03`) contrasts unstable vs. canonical baseline serialization:\n- **Top Track (`Unsafe: Random Key Order`):** Identical logical dicts serialized with differing key ordering (`{\"a\":1, \"b\":2}` vs. `{\"b\":2, \"a\":1}`) hash to inconsistent bytes, triggering **`Digest Mismatch! False Alert`**.\n- **Bottom Track (`Safe: sort_keys=True + HMAC-SHA256`):** Canonical sorting locks deterministic `Same UTF-8 Bytes` before signing into `{\"files\": ..., \"sig\": \"64 hex\"}`—allowing `compare_digest()` to return `Valid: True` on clean manifests and fail closed (**`Tampered: False -> Exit 2!`**) if any hash is forged.\n\n## 6. Diagram Walkthrough: Off-Host Trust Boundaries\n\n![Self-Signed Webroot Trap vs. Off-Host Key Trust Separation](/assets/courses/cyber-04/c04_m7_l02_key_separation_offhost_trust_model.png)\n*Self-Signed Webroot Trap vs. Off-Host Key Trust Separation.*\n\n**Figure 7.4** (`fig-04-07-04`) contrasts deployment blast radii:\n- **Left Zone (`Unsafe: Shared Webroot Zone`):** Co-locating `index.php`, `baseline.json`, and the `HMAC Key (Shared)` inside one web server lets an attacker implant a webshell, regenerate a fake baseline, and force green scans (`Reports \"Clean\" — Backdoor Hidden!`).\n- **Right Zone (`Safe: Isolated Off-Host Trust`):** Placing `Secret Key (0400)` and the `Off-Host Baseline` behind an isolated `Trust Boundary / Firewall` prevents webshell attackers from forging signatures—triggering **`Hash Mismatch -> Intrusion Caught!`**."
    },
    {
      "id": "les_c4_m7_l3",
      "title": "Lesson 7.3: Declarative Detection Rules & Entity Keying",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Decouples detection signatures from engine code using declarative rule catalogs (RK-001 through RK-003), named regex captures, schema startup validation, and isolated (rule_id, entity) tracking keys.",
      "learning_objectives": [
        "Design declarative rule schemas separating metadata (id, title, severity, pattern, threshold) from Python evaluation loops.",
        "Extract targeted entities safely using regex named capture groups (?P<ip>...) and (?P<user>...) alongside composite (rule_id, entity) keys.",
        "Validate JSON rule files at startup cleanly (type checks, positive thresholds, precompiled regex verification, backslash escaping).",
        "Relate custom Python rule catalogs cleanly to enterprise Sigma detection rules and Wazuh/OSSEC rule hierarchies."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-05",
          "figure_number": "Figure 7.5",
          "lesson_id": "les_c4_m7_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l03_declarative_rules_engine_architecture.png",
          "title": "Declarative JSON Detection Rules Decoupled From Engine Logic",
          "purpose": "Demonstrate how analysts deploy and update JSON/YAML rule catalogs without mutating core Python sensor code, backed by schema validation at engine startup.",
          "accessibility_description": "Architecture diagram connecting an external rules.json catalog through schema/regex validator checks into an immutable rule engine evaluating incoming log lines.",
          "walkthrough_section": "Diagram Walkthrough: Declarative Rule Architecture"
        },
        {
          "figure_id": "fig-04-07-06",
          "figure_number": "Figure 7.6",
          "lesson_id": "les_c4_m07_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l03_entity_extraction_and_composite_keying.png",
          "title": "Named Capture Entity Extraction and (rule_id, entity) State Isolation",
          "purpose": "Explain why rule counters must be keyed by composite (rule_id, entity) tuples so different users, IPs, or rules never bleed state into one another.",
          "accessibility_description": "State map diagram showing log lines yielding named entity keys combined with rule IDs into isolated per-pair counters rather than a single global counter.",
          "walkthrough_section": "Diagram Walkthrough: Composite State Isolation"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-05",
          "title": "Figure 7.5: Decoupling Declarative JSON Detection Rules From Engine Code",
          "url": "/assets/courses/cyber-04/c04_m7_l03_declarative_rules_engine_architecture.png",
          "caption": "Figure 7.5: External rules.json catalogs (RK-001..RK-003) pass through a Startup Validator (JSON Schema, re.compile(), No eval!) before feeding an immutable Python rule evaluation engine.",
          "alt": "Layered architecture feeding rules.json (RK-001: Root SSH, RK-002: Sudo Fail x3, RK-003: Useradd) through a Startup Validator (JSON Schema, re.compile(), No eval(), failing closed on invalid rules) into an Immutable Python Engine processing a Syslog Stream into Structured Alerts."
        },
        {
          "id": "fig-04-07-06",
          "title": "Figure 7.6: Named Captures & Composite (rule_id, entity) State Isolation",
          "url": "/assets/courses/cyber-04/c04_m7_l03_entity_extraction_and_composite_keying.png",
          "caption": "Figure 7.6: Named captures (?P<user>) / (?P<ip>) route events into isolated composite (rule_id, entity) buckets so single failures from alice, bob, and chen never trigger a shared false-positive counter.",
          "alt": "Comparison contrasting a rule-only counter mixing alice: 1x, bob: 1x, and chen: 1x into counts['RK-002'] = 3 for a False Alert against composite (?P<user>) / (?P<ip>) buckets isolating ('RK-002', 'alice') at 1/3, ('RK-002', 'ben') at 1/3, and ('RK-001', '203.0.113.7') at 1/1 -> Alert."
        }
      ],
      "content": "## 1. Separating Detection Logic From Engine Code\n\nImagine hardcoding `if \"Accepted publickey for root\" in line:` deeply inside Python loops across dozens of monitoring scripts. Whenever an organization adds a web gateway, alters SSH logging syntax, or updates a threshold during an active brute-force wave, developers would have to rewrite, test, and redeploy Python code across the fleet.\n\nEnterprise platforms solve this cleanly via **declarative detection rules**—structured YAML or JSON rule catalogs popularized by **Sigma** (`Courses 08 and 20`) and **Wazuh**—which Python engines load, validate, compile, and execute uniformly without modifying a line of evaluation logic.\n\n## 2. Declarative Rule Anatomy (`RK-001` through `RK-003`)\n\nInspect how `m07_defensive.py` separates rule metadata, extraction patterns, severity rankings, and alert thresholds cleanly inside `RULES`:\n\n```python\nRULES = [\n    {\"id\": \"RK-001\", \"title\": \"Root SSH login\",\n     \"re\": re.compile(r\"Accepted \\S+ for root from (?P<ip>\\S+)\"),\n     \"threshold\": 1, \"severity\": \"high\"},\n    {\"id\": \"RK-002\", \"title\": \"Multiple sudo failures\",\n     \"re\": re.compile(r\"sudo: .*authentication failure.*user=(?P<user>\\S+)\"),\n     \"threshold\": 3, \"severity\": \"medium\"},\n    {\"id\": \"RK-003\", \"title\": \"Local user created\",\n     \"re\": re.compile(r\"useradd\\[\\d+\\]: new user: name=(?P<user>[^,]+)\"),\n     \"threshold\": 1, \"severity\": \"medium\"},\n]\n```\n\nNotice the engineering choices packed into just ten lines:\n\n- **Named Capture Groups (`(?P<name>...)`):** Every rule identifies a distinct **entity** (`ip` for root SSH access, `user` for `sudo` failures and `useradd` account creation) extractable through uniform dictionary logic: `(m.groupdict().get(\"ip\") or m.groupdict().get(\"user\") or \"-\")`.\n- **Single-Threshold Immediate Signals (`threshold: 1`):** High-consequence events—direct root login over SSH (`RK-001`) or local user provisioning (`RK-003`)—escalate immediately on first observation.\n- **Accumulation Signals (`threshold: 3`):** Routine human mistyping generates occasional `sudo` typos (`RK-002`); setting `threshold: 3` suppresses single accidental errors while catching sustained privilege-escalation attempts.\n\n## 3. Why Composite `(rule_id, entity)` Keying Is Mandatory\n\nSuppose you keyed alert counters solely by `rule_id` (`counts[\"RK-002\"]`) or solely by `entity` (`counts[\"ben\"]`). Both shortcuts introduce silent detection bugs:\n\n- **Per-Rule-Only Bug:** Two unrelated users failing `sudo` once (`alice`, `bob`) plus one typo by `chen` totals 3 failures under `\"RK-002\"`, falsely paging the SOC for an attack that no single user performed.\n- **Per-Entity-Only Bug:** If an account string collides across different rules—or a host IP triggers unrelated low-priority scans—unrelated triggers bleed together.\n\nKeying both counters and cooldown timestamps cleanly by the composite tuple **`key = (rule[\"id\"], entity)`** guarantees exact per-rule, per-actor state isolation.\n\n## 4. Loading External JSON Rules Safely (`Practical C04-M07-P2`)\n\nWhen loading declarative rule catalogs from external JSON files (`rules.json`), validate schemas strictly at startup before inspecting a single log byte (`C04-M07-P2`):\n\n1. **Structural Schema Check:** Verify top-level list type and require non-empty string keys (`id`, `title`, `pattern`, `severity`) plus integer `threshold >= 1`.\n2. **Regex Precompilation Verification:** Call `re.compile(rule[\"pattern\"])` inside `try/except re.error`; refuse to launch silently on broken patterns (fail closed).\n3. **JSON Backslash Escaping (`\\\\`):** Remind authors that inside `.json` files, literal regex backslashes must be escaped cleanly (`\"Accepted \\\\\\\\S+ for root\"` represents `\\S+` once parsed into Python strings, whereas writing `\"\\S+\"` inside raw JSON produces an invalid escape syntax error).\n4. **Severity Enum Validation:** Constrain `severity` strictly to trusted levels (`{\"low\", \"medium\", \"high\", \"critical\"}`).\n\n> [!IMPORTANT]\n> Never evaluate dynamic Python expressions (`eval()`, `exec()`) stored inside rule files. Declarative JSON/YAML patterns compiled safely via `re.compile()` eliminate arbitrary code execution risk when sharing third-party community detections.\n\n## 5. Diagram Walkthrough: Declarative Rule Architecture\n\n![Decoupling Declarative JSON Detection Rules From Engine Code](/assets/courses/cyber-04/c04_m7_l03_declarative_rules_engine_architecture.png)\n*Decoupling Declarative JSON Detection Rules From Engine Code.*\n\n**Figure 7.5** (`fig-04-07-05`) separates rule data from engine runtime:\n- **Config Layer (`rules.json (Analyst Editable)`):** Holds declarative patterns (`RK-001: Root SSH`, `RK-002: Sudo Fail (x3)`, `RK-003: Useradd`) outside Python code.\n- **Startup Gate & Engine:** The `Startup Validator` verifies `JSON Schema`, precompiles regexes (`re.compile()`), and forbids code execution (`No eval()!`)—branching cleanly to **`Invalid Rule -> Fail Closed`** on errors—so analysts **`Update rules without editing Python code!`** while the `Immutable Python Engine` converts incoming `Syslog Stream` lines into `Structured Alerts`.\n\n## 6. Diagram Walkthrough: Composite State Isolation\n\n![Named Captures & Composite (rule_id, entity) State Isolation](/assets/courses/cyber-04/c04_m7_l03_entity_extraction_and_composite_keying.png)\n*Named Captures & Composite (rule_id, entity) State Isolation.*\n\n**Figure 7.6** (`fig-04-07-06`) shows why per-rule global counts fail:\n- **Left Panel (`Unsafe: Rule-Only Counter`):** Merging single `sudo` typos from `alice: 1x`, `bob: 1x`, and `chen: 1x` into one shared bucket (`counts[\"RK-002\"] = 3`) fires a **`False Alert! Mixed 3 Users`**.\n- **Right Panel (`Safe: Composite (rule_id, entity) Keys`):** Named captures `(?P<user>) / (?P<ip>)` isolate state into separate tuple buckets—`('RK-002', 'alice')` (`1 / 3`), `('RK-002', 'ben')` (`1 / 3`), and `('RK-001', '203.0.113.7')` (`1 / 1 -> Alert!`)—guaranteeing **`Zero cross-actor contamination!`**."
    },
    {
      "id": "les_c4_m7_l4",
      "title": "Lesson 7.4: Thresholds, Windows & Alert Suppression Engineering",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Traces threshold accumulation and per-entity suppression windows step by step across synthetic authentication logs while deriving alert-fatigue lessons from the 2013 Target breach (CS1).",
      "learning_objectives": [
        "Evaluate threshold crossings combined with sliding time windows and post-alert suppression intervals cleanly.",
        "Trace the exact m07_defensive.py event timeline (+0s to +90s) showing suppression of noisy duplicate sudo failures.",
        "Calculate alert compression ratios and rate limits to prevent SIEM flooding (50,000 raw failures -> single correlated incident).",
        "Diagnose organizational alert fatigue mechanisms highlighted by the US Senate Commerce analysis of the 2013 Target breach."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-07",
          "figure_number": "Figure 7.7",
          "lesson_id": "les_c4_m7_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l04_rule_threshold_and_suppression_flow.png",
          "title": "Rule Matching, Threshold Counting, and Suppression Decision Flow (C04-M07-F2)",
          "purpose": "Follow every log event through regex matching, entity lookup, threshold accumulation, suppression cooldown checks, and conditional alert emission.",
          "accessibility_description": "Decision flowchart tracing Log Line -> Rule Regex Match -> Sanitise Entity -> Increment (rule, entity) -> Threshold Reached? -> Inside Suppression Window? -> Drop Duplicate or Emit Alert.",
          "walkthrough_section": "Diagram Walkthrough: Threshold & Suppression Decision Logic"
        },
        {
          "figure_id": "fig-04-07-08",
          "figure_number": "Figure 7.8",
          "lesson_id": "les_c4_m7_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l04_alert_fatigue_metrics_and_tuning.png",
          "title": "Time-Line Suppression Windows and Alert Fatigue Compression Metrics",
          "purpose": "Map the m07_defensive.py 0s..90s event timestamps against the 10-minute suppression guard and illustrate quantitative alert compression against high-volume noise.",
          "accessibility_description": "Horizontal timeline plotting RK-001 (+0s), RK-002 fires (+30s), RK-002 suppressed (+31s, +40s), and RK-003 fires (+90s) inside a 600s suppression envelope.",
          "walkthrough_section": "Diagram Walkthrough: Alert Compression Timeline"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-07",
          "title": "Figure 7.7: Rule Matching, Threshold Counting & Cooldown Suppression Flow",
          "url": "/assets/courses/cyber-04/c04_m7_l04_rule_threshold_and_suppression_flow.png",
          "caption": "Figure 7.7 (C04-M07-F2): Log line events match declarative regexes, sanitise extracted entities, increment (rule, entity) counters, verify threshold crossing, and bypass duplicate emission during the 10-minute cooldown window.",
          "alt": "Decision flowchart moving a Log Line through Regex Match + sanitise(entity) and count[(rule, entity)] += 1 to count >= threshold? (No -> Accumulate & Wait; Yes -> (t - prev) >= 10 min? with No -> Suppressed Muted, Yes -> Update last_alert & Emit Alert!)."
        },
        {
          "id": "fig-04-07-08",
          "title": "Figure 7.8: Suppression Cooldown Timeline & Alert Noise Compression",
          "url": "/assets/courses/cyber-04/c04_m7_l04_alert_fatigue_metrics_and_tuning.png",
          "caption": "Figure 7.8: Timeline mapping RK-001 (+0s) and RK-002 (+30s) alerts while muting duplicate RK-002 bursts at +31s and +40s inside the 600s cooldown (+630s), triggering RK-003 (+90s) independently and shrinking 50,000 raw failures to <= 3 alerts.",
          "alt": "Top timeline plotting RK-001 Alert 1 (+0s), RK-002 accumulation (+20s, +25s), RK-002 Alert 2 (+30s) starting a 10-min Cooldown Window (+630s) that mutes +31s and +40s while allowing RK-003 Alert 3 (+90s), above a bar showing 50,000 Raw Failures compressed to <= 3 Alerts (99.994% Less Noise!)."
        }
      ],
      "content": "## 1. When 50,000 Alerts Hide One Real Intrusion\n\nBetween 27 November and 15 December 2013, intruders exfiltrated massive cardholder records from Target Corporation systems. According to the **US Senate Committee on Commerce, Science, and Transportation Majority Staff report (26 March 2014)** (`Case Study C04-M07-CS1`), automated security tools *did* generate warning notifications—yet investigators missed or failed to act upon them amidst overwhelming operational alert noise.\n\nWriting a detector that throws an alert on every matching log line guarantees analyst exhaustion (**alert fatigue**). Defensive automation must count over time, correlate thresholds, and enforce **suppression windows** cleanly.\n\n## 2. Core Mathematical & Temporal Controls\n\n- **Detection Window:** Time span defining how recent failure observations must be to accumulate toward a multi-event threshold (`Practical P2` applies a sliding window `deque`).\n- **Suppression Window (`SUPPRESS`):** Cooldown period $W_{\\text{suppress}}$ (e.g., `timedelta(minutes=10)`) following an emitted alert for `(rule_id, entity)` during which duplicate triggers for the same incident are muted cleanly.\n- **Rate Limiting:** Global or per-channel hard cap limiting alert dispatch volume during catastrophic log bursts (e.g., capping notifications during a 50,000-line crash loop).\n\nGiven current event timestamp $t_{\\text{now}}$, entity emission history $t_{\\text{last}}$, and configured cooldown $W_{\\text{suppress}}$, the engine suppresses duplicate notification emission cleanly whenever:\n\n$$\nt_{\\text{last}} \\neq \\text{None} \\quad \\land \\quad (t_{\\text{now}} - t_{\\text{last}}) < W_{\\text{suppress}}\n$$\n\n:::math-steps Evaluating Alert Compression Under Suppression & Cooldown\nStep 01: Simulate a chatty application service failing sudo authentication 50,000 times uniformly over 25 minutes (Scenario S2)\nStep 02: Apply threshold rule RK-002 (threshold = 3); initial burst alerts immediately upon the 3rd event (timestamp t_last = +30s)\nStep 03: Without suppression, events 4 through 50,000 generate up to 49,997 redundant follow-up alerts if counter triggers remain armed\nStep 04: Apply suppression cooldown W_suppress = 10 minutes (600s); the 25-minute storm spans floor(1500 / 600) + 1 = 3 distinct 10-minute alert windows\nStep 05: Apply per-channel rate limiting + summary batching across those 3 windows\nResult: Compression from 50,000 raw failure messages down to at most 3 throttled, actionable incident alerts (99.994% noise reduction)\n:::\n\n## 3. Execution-Tested Suppression Trace (`m07_defensive.py`)\n\nExamine Section 2 of `m07_defensive.py` and trace every single timestamp across the synthetic 7-event stream (`offsets = (0, 20, 25, 30, 31, 40, 90)` seconds past `2026-11-07T10:00Z`):\n\n```python\nSUPPRESS = timedelta(minutes=10)\ncounts: dict[tuple[str, str], int] = {}\nlast_alert: dict[tuple[str, str], datetime] = {}\nalerts = []\n\nfor offset_s, msg in LOG:\n    t = t0 + timedelta(seconds=offset_s)\n    for rule in RULES:\n        m = rule[\"re\"].search(msg)\n        if not m:\n            continue\n        entity = sanitise(m.groupdict().get(\"ip\") or m.groupdict().get(\"user\") or \"-\")\n        key = (rule[\"id\"], entity)\n        counts[key] = counts.get(key, 0) + 1\n        if counts[key] >= rule[\"threshold\"]:\n            prev = last_alert.get(key)\n            if prev is None or (t - prev) >= SUPPRESS:\n                last_alert[key] = t\n                alerts.append({\n                    \"time\": t.isoformat(),\n                    \"rule\": rule[\"id\"],\n                    \"severity\": rule[\"severity\"],\n                    \"entity\": entity,\n                    \"title\": rule[\"title\"],\n                })\n```\n\nTrace the exact CPython execution output line by line:\n\n```terminal\n2. alerts raised: 3\n   RK-001 high 203.0.113.7\n   RK-002 medium ben\n   RK-003 medium svc?[31mbackup\n```\n\nInspect why precisely **3** alerts emerged from **7** suspicious events:\n\n| Offset | Event Summary | Key (`rule_id`, `entity`) | Count / Threshold | Suppression Decision | Output |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| `+0s` | `Accepted publickey for root from 203.0.113.7` | `('RK-001', '203.0.113.7')` | `1 / 1` (Reached) | `prev is None` -> Set `last_alert` | **Alert 1** (`high`) |\n| `+20s` | `sudo` auth failure (`user=ben`) | `('RK-002', 'ben')` | `1 / 3` (Below) | Threshold not met | *Accumulate* |\n| `+25s` | `sudo` auth failure (`user=ben`) | `('RK-002', 'ben')` | `2 / 3` (Below) | Threshold not met | *Accumulate* |\n| `+30s` | `sudo` auth failure (`user=ben`) | `('RK-002', 'ben')` | `3 / 3` (Reached) | `prev is None` -> Set `last_alert = +30s` | **Alert 2** (`medium`) |\n| `+31s` | `sudo` auth failure (`user=ben`) | `('RK-002', 'ben')` | `4 / 3` (Reached) | `1s < 600s` -> Suppressed | *Muted* |\n| `+40s` | `sudo` auth failure (`user=ben`) | `('RK-002', 'ben')` | `5 / 3` (Reached) | `10s < 600s` -> Suppressed | *Muted* |\n| `+90s` | `useradd` (`name=svc\\x1b[31mbackup`) | `('RK-003', 'svc?[31mbackup')` | `1 / 1` (Reached) | `prev is None` -> Set `last_alert = +90s` | **Alert 3** (`medium`) |\n\n> [!WARNING]\n> **Lifetime Counter vs. Sliding Window Nuance:** Notice that `counts` in the core teaching snippet increments monotonically until restart (`1 -> 2 -> 3`). In continuous daemons, combine this exact cooldown guard with `Practical P2` time-bounded eviction (`collections.deque`) so three `sudo` typos spread across six months never accumulate to trigger a false brute-force alert.\n\n## 4. Diagram Walkthrough: Threshold & Suppression Decision Logic\n\n![Rule Matching, Threshold Counting & Cooldown Suppression Flow](/assets/courses/cyber-04/c04_m7_l04_rule_threshold_and_suppression_flow.png)\n*Rule Matching, Threshold Counting & Cooldown Suppression Flow.*\n\n**Figure 7.7** (`fig-04-07-07`) renders `C04-M07-F2` as a two-gate decision pipeline:\n- **Match, Sanitise & Count:** Each incoming `Log Line` runs `Regex Match` + `sanitise(entity)` and increments `count[(rule, entity)] += 1`.\n- **Two Decision Gates:** Below `threshold`, the engine chooses `Accumulate & Wait`. Once threshold is met, checking `(t - prev) >= 10 min?` mutes repeats (`Suppressed (Muted)`) or moves forward to **`Update last_alert & Emit Alert!`**.\n\n## 5. Diagram Walkthrough: Alert Compression Timeline\n\n![Suppression Cooldown Timeline & Alert Noise Compression](/assets/courses/cyber-04/c04_m7_l04_alert_fatigue_metrics_and_tuning.png)\n*Suppression Cooldown Timeline & Alert Noise Compression.*\n\n**Figure 7.8** (`fig-04-07-08`) maps both individual timestamps and noise compression impact:\n- **Event Sequence (`+0s` to `+90s`):** `RK-001` fires immediately (`+0s`), `RK-002` waits (`1/3`, `2/3`) then fires **`Alert 2`** at `+30s`—opening its `10-min Cooldown Window (600s)` through `+630s` so `+31s` and `+40s` stay **`Muted!`**, while **`RK-003`** fires independently at `+90s` because it holds a separate `(rule, entity)` key.\n- **Volume Compression:** Pairing cooldowns with rate limiting turns **`50,000 Raw Failures`** into **`<= 3 Alerts` (`99.994% Less Noise!`)**."
    },
    {
      "id": "les_c4_m7_l5",
      "title": "Lesson 7.5: Safe Alert Pipelines, Sanitisation & XSS Defense",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Neutralizes adversarial terminal ANSI escapes, JSON serialization errors, CSV formula injection, and stored dashboard XSS (<script>) inside defensive alert pipelines.",
      "learning_objectives": [
        "Strip ASCII control bytes (\\x00-\\x1f, \\x7f) and bound field lengths safely via sanitise(text, limit=80) before logging or alerting.",
        "Explain how attacker-controlled usernames containing \\x1b[31m spoof ANSI terminal colors or clear analyst consoles.",
        "Enforce ASCII-safe JSON Lines output (ensure_ascii=True), html.escape() server rendering, and CSP protections against stored XSS.",
        "Redact bearer tokens, API secrets, and credentials out of alert payloads following the OWASP Logging Cheat Sheet."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-09",
          "figure_number": "Figure 7.9",
          "lesson_id": "les_c4_m7_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l05_safe_alert_sanitization_pipeline.png",
          "title": "Defense-in-Depth Safe Alert Generation Pipeline (C04-M07-F3)",
          "purpose": "Show how untrusted event fields pass sequentially through control-character stripping, secret redaction, ensure_ascii JSONL writing, viewer escaping, and rate-limited transport.",
          "accessibility_description": "Five-stage horizontal sanitization pipeline feeding untrusted log fields through Sanitise/Truncate, Secret Redactor, JSONL Writer, Viewer Escape, and Signed Rate-Limited Dispatch.",
          "walkthrough_section": "Diagram Walkthrough: Five-Stage Alert Sanitization"
        },
        {
          "figure_id": "fig-04-07-10",
          "figure_number": "Figure 7.10",
          "lesson_id": "les_c4_m7_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l05_ansi_escape_and_dashboard_xss_defense.png",
          "title": "Terminal ANSI Control Stripping and HTML Dashboard XSS Escaping",
          "purpose": "Compare raw terminal color/DOM payload execution against '?' control-byte replacement and html.escape() entity neutralization (&lt;script&gt;).",
          "accessibility_description": "Side-by-side transformation diagram showing raw ESC[31m and <script> payloads neutralized into safe inert strings at CLI and web dashboard boundaries.",
          "walkthrough_section": "Diagram Walkthrough: Multi-Renderer Escaping"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-09",
          "title": "Figure 7.9: Five-Stage Defense-in-Depth Safe Alert Generation Pipeline",
          "url": "/assets/courses/cyber-04/c04_m7_l05_safe_alert_sanitization_pipeline.png",
          "caption": "Figure 7.9 (C04-M07-F3): Untrusted log inputs traverse 1. Sanitise (strip control chars <=80), 2. Redact (Bearer [REDACTED]), 3. JSONL (ensure_ascii=True), 4. Escape (html.escape & '), and 5. Dispatch (Rate Cap + HMAC).",
          "alt": "Horizontal assembly pipeline moving Untrusted Log Input (\\x1b[31m, <script>, Bearer abc123) through 1. Sanitise (Strip \\x00-\\x1f, <=80), 2. Redact (Bearer [REDACTED]), 3. JSONL (ensure_ascii=True), 4. Escape (html.escape & '), and 5. Dispatch (Rate Cap + HMAC) into Safe Analyst Telemetry."
        },
        {
          "id": "fig-04-07-10",
          "title": "Figure 7.10: Neutralizing Terminal ANSI Spoofing & Dashboard Stored XSS",
          "url": "/assets/courses/cyber-04/c04_m7_l05_ansi_escape_and_dashboard_xss_defense.png",
          "caption": "Figure 7.10: Side-by-side surface escaping neutralizing terminal ANSI escape sequences (svc\\x1b[31mbackup -> svc?[31mbackup via sanitise) and browser DOM scripts (<script>alert(1)</script> -> &lt;script&gt;... via html.escape).",
          "alt": "Two-row output escaping chart showing Terminal Surface neutralizing svc\\x1b[31mbackup through sanitise() into plain safe text svc?[31mbackup, and Web Dashboard Surface neutralizing <script>alert(1)</script> through html.escape(quote=True) into inert HTML entity text."
        }
      ],
      "content": "## 1. When Security Alerts Attack the Analyst's Tools\n\nSecurity tools process completely untrusted strings: attacker-controlled SSH usernames, forged HTTP user agents, malicious LDAP lookups, and hostile process arguments. If a detection script takes an adversary's payload blindly from an authentication log and prints it directly into an operator's terminal, writes it into a CSV export, or embeds it inside an HTML incident dashboard, the defender's **own reporting pipeline becomes an attack vector**.\n\nFollowing the **OWASP Logging Cheat Sheet**, every field traveling from raw logs into defensive telemetry must be stripped, bounded, redacted, and escaped specifically for every downstream viewer.\n\n## 2. Defeating Terminal ANSI Escape Injection (`sanitise()`)\n\nLook closely at offset `+90s` inside `m07_defensive.py`:\n\n```python\nimport re\n\ndef sanitise(text: str, limit: int = 80) -> str:\n    return re.sub(r\"[\\x00-\\x1f\\x7f]\", \"?\", text)[:limit]\n```\n\nAnd inspect the adversarial username fed into the `useradd` log line: `\"svc\\x1b[31mbackup\"`. Character `\\x1b` (`ESC`, decimal `27`) starts an **ANSI escape sequence** instructing modern terminals to turn text bright red (`[31m`), overwrite previous log rows, inject fake URLs, or even clear screen buffers (`\\x1b[2J`). Because `sanitise()` strips all ASCII control bytes `0x00–0x1F` and `0x7F` before building alerts and truncates fields to `80` characters, `\\x1b` neutralizes cleanly into `\"?\"`:\n\n```terminal\n   RK-003 medium svc?[31mbackup\n3. alerts.jsonl lines: 3 | sanitised entity: svc?[31mbackup\n```\n\nEven before viewing the alert inside a terminal, storing it via `json.dumps(alert, ensure_ascii=True)` guarantees clean single-line JSON Lines (`alerts.jsonl`) free of stray newlines, null bytes, or unescaped Unicode directional overrides.\n\n> [!NOTE]\n> Stripping control bytes (`\\x00-\\x1f\\x7f`) handles terminal ANSI spoofing and CRLF newline log injection simultaneously—preventing an adversary from injecting a newline inside a username to forge fake `\"INFO baseline OK\"` entries into plain-text logs.\n\n## 3. Neutralizing Stored XSS in Alert Dashboards (`html.escape`)\n\nNow examine **Scenario S3** and **Practical C04-M07-P2**: an attacker connects over SSH passing username `\"<script>alert(1)</script>\"`, and a colleague's alert summary script builds an HTML email or web table via raw Python f-strings (`f\"<td>{alert['entity']}</td>\"`). When an analyst opens that HTML alert report in a browser, the script executes directly inside the authenticated SOC console (**Stored Cross-Site Scripting — XSS**), stealing session cookies or suppressing real incidents.\n\nCompare the unsafe pattern against Python standard-library remediation (`html.escape`):\n\n```python\nimport html\n\n# UNSAFE: interpolates attacker bytes straight into executable HTML markup\nunsafe_cell = f\"<td>{entity}</td>\"\n\n# SAFE: escapes &, <, >, \", and ' into inert HTML character references\nsafe_cell = f\"<td>{html.escape(entity, quote=True)}</td>\"\n```\n\nWhen rendered against `entity = \"<script>alert(1)</script>\"`, `html.escape()` converts `<` into `&lt;` and `>` into `&gt;`, forcing browsers to display the literal harmless characters `<script>alert(1)</script>` as inert table text rather than parsing an executable DOM script tag. Layering strict **Content Security Policy (CSP)** headers (`script-src 'self'`) alongside CSV formula prefixing (`Module 3` `safe_cell`) and ingestion sanitization secures all three major viewing surfaces—CLI terminal, CSV spreadsheet, and web browser.\n\n## 4. Secret Redaction & Rate-Limited Output\n\nThe OWASP Logging Cheat Sheet highlights one equally destructive hazard: defensive tools accidentally leaking credentials when printing failed API alert requests or database errors. Enforce all five pipeline rules (`C04-M07-F3`):\n\n- **Strip Control Bytes Early:** Apply `sanitise(value, limit=80)` to all untrusted strings prior to storage or printing.\n- **Redact Secrets Deterministically:** Mask `Authorization` headers, API keys, passwords, and webhook secrets (`Bearer [REDACTED]`) before writing alerts to JSONL or operator logs.\n- **Machine-Safe JSON Lines:** Persist structured alert streams using `json.dumps(alert, ensure_ascii=True)` one object per line.\n- **Context-Specific Viewer Escaping:** Apply `html.escape(..., quote=True)` for HTML reports and `'` formula prefixing for CSV outputs (`Module 3`).\n- **Rate Limiting & Authenticity:** Bound outgoing alert bursts cleanly and sign central alert webhooks with HMAC-SHA256 (`Lesson 7.2`).\n\n## 5. Diagram Walkthrough: Five-Stage Alert Sanitization\n\n![Five-Stage Defense-in-Depth Safe Alert Generation Pipeline](/assets/courses/cyber-04/c04_m7_l05_safe_alert_sanitization_pipeline.png)\n*Five-Stage Defense-in-Depth Safe Alert Generation Pipeline.*\n\n**Figure 7.9** (`fig-04-07-09`) traces `C04-M07-F3` across five sequential defense stages:\n- **Stage 1 & 2 (`1. Sanitise` & `2. Redact`):** Transform `Untrusted Log Input` (`\\x1b[31m`, `<script>`, `Bearer abc123`) by stripping ASCII control bytes (`Strip \\x00-\\x1f, <=80`) and scrubbing credentials (`Bearer [REDACTED]`).\n- **Stages 3–5 (`3. JSONL`, `4. Escape`, `5. Dispatch`):** Serialize clean lines (`ensure_ascii=True`), apply viewer escaping (`html.escape & '`), and enforce `Rate Cap + HMAC` before delivering **`Safe Analyst Telemetry`**.\n\n## 6. Diagram Walkthrough: Multi-Renderer Escaping\n\n![Neutralizing Terminal ANSI Spoofing & Dashboard Stored XSS](/assets/courses/cyber-04/c04_m7_l05_ansi_escape_and_dashboard_xss_defense.png)\n*Neutralizing Terminal ANSI Spoofing & Dashboard Stored XSS.*\n\n**Figure 7.10** (`fig-04-07-10`) contrasts renderer-specific escaping boundaries:\n- **Top Row (`Terminal Surface`):** Passing raw `svc\\x1b[31mbackup` renders spoofed red terminal output; routing through `sanitise() (\\x1b -> ?)` turns it into **`Plain Safe Text` (`svc?[31mbackup`)**.\n- **Bottom Row (`Web Dashboard Surface`):** Rendering unescaped `<script>alert(1)</script>` executes browser JavaScript; calling **`html.escape(quote=True)`** converts angle brackets into inert entity text (`&lt;script&gt;...`)."
    },
    {
      "id": "les_c4_m7_l6",
      "title": "Lesson 7.6: Deploying Defensive Sensors & Practical FIM/Rule Workflows",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Operates defensive FIM and rule automation safely in production using least-privilege scheduling, volatile path exclusions, dead-man heartbeats, exit-code contracts, and Detection-as-Code verification.",
      "learning_objectives": [
        "Separate sensor execution permissions, off-host verification keys, and append-only alert delivery pipelines.",
        "Diagnose noisy nightly FIM storms cleanly (distinguishing volatile cache/log paths from deployment manifests via fnmatch exclusions).",
        "Design distinct automation exit-code contracts (0 clean, 1 changes/findings, 2 invalid baseline/error) and dead-man's switch alerts.",
        "Execute full Detection-as-Code verification cycles combining positive triggers, negative known-good fixtures, and HTML report escaping."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-07-11",
          "figure_number": "Figure 7.11",
          "lesson_id": "les_c4_m7_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l06_least_privilege_sensor_deployment.png",
          "title": "Least-Privilege Sensor Architecture with Dead-Man Heartbeat Monitoring",
          "purpose": "Illustrate how an unprivileged scheduled sensor reads target files cleanly, writes append-only heartbeats/telemetry off-host, and triggers missing-heartbeat alarms if terminated.",
          "accessibility_description": "Deployment diagram showing read-only host access by a restricted service account forwarding signed alerts and periodic heartbeats to an off-host verifier.",
          "walkthrough_section": "Diagram Walkthrough: Least-Privilege Sensor Deployment"
        },
        {
          "figure_id": "fig-04-07-12",
          "figure_number": "Figure 7.12",
          "lesson_id": "les_c4_m7_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m07_l06_detection_as_code_validation_cycle.png",
          "title": "Detection-as-Code Lifecycle: Schema Check, Positive/Negative Tests, and Exit Contracts",
          "purpose": "Summarize Practicals P1 and P2 into a repeatable CI/scheduled workflow linking config validation, unit tests, exit codes 0/1/2, and clean operational handoff.",
          "accessibility_description": "Four-gate pipeline checking rule schema/regex compilation, positive & negative fixture tests, suppression & escaping verification, and strict 0/1/2 exit status propagation.",
          "walkthrough_section": "Diagram Walkthrough: Detection-as-Code Verification"
        }
      ],
      "images": [
        {
          "id": "fig-04-07-11",
          "title": "Figure 7.11: Least-Privilege Scheduled Sensor & Dead-Man Heartbeat Monitor",
          "url": "/assets/courses/cyber-04/c04_m7_l06_least_privilege_sensor_deployment.png",
          "caption": "Figure 7.11: Scheduled unprivileged service account (svc_fim) scans /etc and /var/www read-only, streams append-only signed telemetry off-host, and detects sensor tampering via missing Dead-Man's Switch heartbeats.",
          "alt": "Three-zone deployment diagram linking Target Host (/etc, /var/www Read-Only Filesystem Access) -> Sensor Service Account (svc_fim Unprivileged via cron/Task Scheduler with exit statuses 0 Clean, 1 Finding, 2 Error) -> Off-Host SIEM Collector (Append-Only Telemetry + Dead-Man's Switch flagging Missing Pulse if Kills Sensor stops periodic heartbeats)."
        },
        {
          "id": "fig-04-07-12",
          "title": "Figure 7.12: Detection-as-Code Lifecycle: Four Automated Quality Gates",
          "url": "/assets/courses/cyber-04/c04_m7_l06_detection_as_code_validation_cycle.png",
          "caption": "Figure 7.12: Automated four-gate Detection-as-Code pipeline routing rules.json + Commit through 1. Schema & Regex, 2. Unit Fixtures, 3. Escape & Cooldown, and 4. Exit Contracts (0/1/2) before production deployment.",
          "alt": "Four-gate pipeline checking rules.json + Commit across 1. Schema & Regex (JSON OK / re.compile()), 2. Unit Fixtures (Bad -> Alert | Good -> 0), 3. Escape & Cooldown (sanitise / html + Mute OK), and 4. Exit Contracts (0 Clean | 1 Alert | 2 Error) into Safe Production Sensor."
        }
      ],
      "content": "## 1. Operating Defensive Automation Without Blind Spots or Noise\n\nYou have built every core mechanism of defensive Python automation: deterministic FIM snapshots, canonical HMAC baseline signing, declarative rule matching, suppression cooldowns, and multi-layer alert sanitisation. Yet a script running manually once on a developer laptop does not protect an organization at 03:00 AM.\n\nPutting sensors into production requires solving three operational failure modes: **volatile directory storms**, **attacker sensor termination**, and **unverified rule regressions**.\n\n## 2. Taming Volatile File Storms (`Scenario C04-M07-S1`)\n\nSuppose a team enables FIM across an entire web server and immediately suffers **4,000 changed-file alerts every morning** (`Scenario S1`). Before tuning anything out silently, triage the diff methodically:\n\n1. **Inspect Unfiltered Paths First:** Verify whether any alert touches static binaries, `sshd_config`, cron folders, or authentication scripts—never discard alerts blindly.\n2. **Identify Benign Volatile Sources:** Distinguish legitimate write-heavy files (rotating `.log` streams, temporary caches, user upload directories, transient `.pid`/session sockets) from immutable application/code trees.\n3. **Move Mutable Data Outside Monitored Roots:** Relocate uploads and temporary caches into separate non-executable volumes rather than excluding wide wildcards inside executable code paths.\n4. **Apply Narrow Explicit Exclusions & Deployment Hooks:** Configure tight `--exclude` patterns (`fnmatch`) only for unavoidable non-executable caches, and teach release pipelines to call FIM baseline renewal (`accept`) during authorized deployments (`Practical C04-M07-P1`).\n\n> [!IMPORTANT]\n> Never exclude `*.php`, `*.py`, or entire executable folders simply to quiet noisy deployers. Automate legitimate `accept` signing steps inside authorized CI/CD release workflows instead.\n\n## 3. Least-Privilege Scheduling, Heartbeats & Dead-Man's Switches\n\nDeploying `fim.py` and rule scanners securely via Windows Task Scheduler or Linux `cron` / `systemd` timers (`Module 4`) follows clear privilege boundaries:\n\n- **Minimum Read Privilege:** Run monitoring scripts under a dedicated service user holding strictly read-only permissions across monitored directories—never full administrative write access if avoidable.\n- **Clean Temporary Resource Hygiene:** Always purge synthetic scratch files in `finally:` blocks (demonstrated by Step 4 of `m07_defensive.py` outputting `cleaned up: True`) so recurring schedules never fill `/tmp`.\n- **Explicit Exit Codes (`0` / `1` / `2`):** Reserve exit `0` for clean scan completion with zero alerts, `1` for findings or unauthorized diffs requiring analyst triage, and `2` for invalid signatures, missing files, or corrupt rule configurations (**fail closed**).\n- **Dead-Man's Switch Monitoring:** An attacker gaining root privileges on a sensor host will simply kill the `cron` job or stop the `systemd` timer. Configure central SIEM monitors to alert immediately whenever periodic sensor heartbeats or signed check-in confirmations go overdue.\n\n## 4. Detection-as-Code Verification (`Practical C04-M07-P2`)\n\nTreat every JSON detection rule and FIM exclusion change just like mission-critical software: enforce unit verification before merging to production:\n\n- **Schema & Compilation Gate:** Validate rule JSON syntax, regex compilation (`re.compile`), and mandatory non-negative thresholds on startup.\n- **Known-Bad Positive Fixtures:** Include synthetic log fixtures proving `RK-001`, `RK-002`, and `RK-003` actually fire when attack lines match.\n- **Known-Good Negative Fixtures:** Assert that two isolated `sudo` typos (`count < 3`) and legitimate clean scans yield zero false alarms and exit `0`.\n- **Pipeline Sanitisation Tests:** Run automated tests verifying `\\x1b[31m` escapes cleanly to `?` and `<script>` escapes safely to `&lt;script&gt;` inside HTML outputs.\n\n## 5. Diagram Walkthrough: Least-Privilege Sensor Deployment\n\n![Least-Privilege Scheduled Sensor & Dead-Man Heartbeat Monitor](/assets/courses/cyber-04/c04_m7_l06_least_privilege_sensor_deployment.png)\n*Least-Privilege Scheduled Sensor & Dead-Man Heartbeat Monitor.*\n\n**Figure 7.11** (`fig-04-07-11`) separates sensor permissions across three trust zones:\n- **Target Host & Unprivileged Service Account:** `svc_fim` runs scheduled sweeps (`cron / Task Scheduler`) over `/etc` and `/var/www` under `Read-Only Filesystem Access`, returning clean status contracts (`0 Clean`, `1 Finding`, `2 Error`).\n- **Off-Host SIEM Collector & `Dead-Man's Switch`:** Signed manifests and alerts land in `Append-Only Telemetry`, while missing periodic pulse beacons immediately trigger **`Missing Pulse -> Alert Tampering!`** if an intruder kills the local sensor (`Kills Sensor`).\n\n## 6. Diagram Walkthrough: Detection-as-Code Verification\n\n![Detection-as-Code Lifecycle: Four Automated Quality Gates](/assets/courses/cyber-04/c04_m7_l06_detection_as_code_validation_cycle.png)\n*Detection-as-Code Lifecycle: Four Automated Quality Gates.*\n\n**Figure 7.12** (`fig-04-07-12`) integrates Practicals `P1` and `P2` across four automated release gates on every `rules.json + Commit`:\n- **Gates 1 & 2 (`1. Schema & Regex` & `2. Unit Fixtures`):** Validate `JSON OK / re.compile()` first, then test synthetic fixtures (`Bad -> Alert | Good -> 0`).\n- **Gates 3 & 4 (`3. Escape & Cooldown` & `4. Exit Contracts`):** Verify `sanitise / html + Mute OK` alongside distinct automation return codes (`0 Clean | 1 Alert | 2 Error`) before promoting **`Safe Production Sensor!`**."
    }
  ]
};
