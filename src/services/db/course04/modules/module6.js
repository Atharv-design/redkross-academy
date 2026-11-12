/**
 * Course 04: Python for Cybersecurity — Module 6 Data
 * Module ID: mod_c4_6 | 6 Lessons | 20 Embedded Representative MCQs (from 200-question bank)
 */
export const module6Data = {
  "id": "mod_c4_6",
  "title": "Module 6: Security Data Processing",
  "description": "Compute constant-memory cryptographic digests and constant-time HMAC tags, transform raw syslog lines into timezone-aware detection time windows, and extract/validate/defang IOCs safely.",
  "order": 6,
  "quiz": {
    "id": "quiz_mod_c4_6",
    "title": "Module 6: Security Data Processing Assessment",
    "pass_threshold": 80,
    "passing_score": 80,
    "duration_minutes": 20,
    "total_questions": 20,
    "token_bounty": 150,
    "questions": [
      {
        "id": "q_c4_m6_001",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "medium",
        "q": "Why does `sha256_file()` in `m06_security_data.py` iterate in `65,536`-byte chunks instead of calling `path.read_bytes()` once?",
        "options": [
          "SHA-256 refuses inputs shorter than 64 KiB",
          "`read_bytes()` swaps hex characters backward",
          "Streaming chunks keeps memory usage fixed and small even when hashing multi-gigabyte disk or memory evidence files",
          "`iter()` increases disk fragmentation intentionally"
        ],
        "correct": 2,
        "explanation": "Bounded chunk streaming guarantees O(1) application RAM usage while producing the identical SHA-256 digest."
      },
      {
        "id": "q_c4_m6_002",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "difficult",
        "q": "Verify the memory math for digesting a `16 GiB` forensic capture via `sha256_file(path, chunk=65536)` compared to `path.read_bytes()`. Roughly how many chunk reads occur, and what happens to peak buffer memory?",
        "options": [
          "Peak buffer hits 16 GiB regardless because `hashlib.sha256` buffers every block before finalizing",
          "`262,144` chunk reads execute sequentially (`16 GiB / 64 KiB`), while peak Python read buffer remains bounded strictly at `64 KiB` plus tiny fixed SHA-256 state!",
          "Only 256 chunk reads occur because SHA-256 compresses memory",
          "Chunking alters the resulting digest on files over 4 GiB"
        ],
        "correct": 1,
        "explanation": "SHA-256 maintains a fixed internal compression state; h.update(block) folds each 64 KiB block incrementally with zero full-file retention."
      },
      {
        "id": "q_c4_m6_003",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "medium",
        "q": "Why must MD5 and SHA-1 NOT be trusted for file integrity verification whenever an adversary controls or chooses the file contents?",
        "options": [
          "Practical cryptographic collision attacks allow attackers to construct two distinct files producing the exact same MD5 or SHA-1 digest",
          "Python deleted `hashlib.md5` completely",
          "MD5 digests are 512 bytes long",
          "SHA-1 requires a secret key"
        ],
        "correct": 0,
        "explanation": "MD5 and SHA-1 suffer well-established collision attacks where adversaries forge harmless and malicious payloads sharing an identical digest."
      },
      {
        "id": "q_c4_m6_004",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "difficult",
        "q": "In `m06_security_data.py`, altering `'25,000'` to `'95,000'` inside `invoice.txt` transformed its SHA-256 prefix from `'8252197b...'` to `'d56abccd...'`, matching `Get-FileHash` and `certutil` digests cleanly. Which property did that test confirm?",
        "options": [
          "That chunk sizes change hex output",
          "That `md5` shares prefixes with `sha256`",
          "Determinism across OS tooling AND cryptographic avalanche sensitivity (a 1-bit/1-digit edit flips output bits unpredictably)",
          "That UTF-8 commas disable SHA-256 updates"
        ],
        "correct": 2,
        "explanation": "Cryptographic hashes produce deterministic platform-independent outputs with strong avalanche behavior across single-byte modifications."
      },
      {
        "id": "q_c4_m6_005",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "medium",
        "q": "Even when verifying passwords rather than forensic files, why should developers NOT store user passwords via plain `hashlib.sha256(password)`?",
        "options": [
          "SHA-256 only digests integers",
          "SHA-256 is an intentionally fast general integrity hash trivially cracked on GPUs without salt/memory hardness—passwords demand slow, salted KDFs like Argon2id or bcrypt",
          "SHA-256 raises `TypeError` on lowercase text",
          "MD5 is stronger for passwords"
        ],
        "correct": 1,
        "explanation": "Fast unkeyed/unsalted SHA-256 allows billions of password guesses per second; password verification needs slow salted key-derivation functions."
      },
      {
        "id": "q_c4_m6_006",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "difficult",
        "q": "With respect to Microsoft Security Advisory `2718704` (`C04-M06-CS1`), what verified remediation action did Microsoft publish on 3 June 2012, and why does Course 04 flag the widely reported Flame/MD5 attribution carefully?",
        "options": [
          "Microsoft outlawed SHA-256 globally; Flame is confirmed inside Python's docs",
          "Microsoft recommended passing `verify=False` during Windows Update",
          "Advisory `2718704` moved unauthorized Microsoft-derived intermediate CAs into the Untrusted Certificates store and warned against weak-cipher issuance, whereas the widely reported Flame/MD5 chosen-prefix link is external public research NOT explicitly written inside that primary Microsoft advisory",
          "Advisory `2718704` replaced `secrets.token_bytes` with `random.random`"
        ],
        "correct": 2,
        "explanation": "Exact source hygiene keeps primary-advisory facts distinct from secondary research attributions until independently primary-sourced."
      },
      {
        "id": "q_c4_m6_007",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "medium",
        "q": "Inside `for block in iter(lambda: fh.read(chunk), b''):`, what causes the `iter()` sentinel loop to terminate cleanly at end-of-file?",
        "options": [
          "`block` shrinks below 64 bytes",
          "Python throws `struct.error` on EOF",
          "`fh.read` returns `-1` at EOF",
          "`fh.read(chunk)` returns empty bytes `b''`, matching the sentinel argument"
        ],
        "correct": 3,
        "explanation": "Two-argument iter(callable, sentinel) stops iteration immediately when callable() returns a value equal to sentinel (b'')."
      },
      {
        "id": "q_c4_m6_008",
        "topic": "C04-M06-L01: Hash Functions in Practice",
        "difficulty": "difficult",
        "q": "Why must `sha256_file` open files in binary mode `'rb'` rather than text mode `'r'` when hashing arbitrary security artifacts or Windows scripts?",
        "options": [
          "Text mode fails with `UnicodeDecodeError` on binary executables AND silently translates `\\r\\n` into `\\n` across platforms, corrupting byte-for-byte hash equivalence!",
          "`hashlib` rejects files opened with `'r'` only on Linux",
          "Binary mode runs 100x slower unless chunked",
          "`'rb'` automatically excludes empty-file MD5 collisions"
        ],
        "correct": 0,
        "explanation": "Cryptographic file hashing operates on exact raw file octets; text-mode decoding or newline translation invalidates true file digests."
      },
      {
        "id": "q_c4_m6_009",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "medium",
        "q": "What vital security assurance does an HMAC (`hmac.new(key, msg, hashlib.sha256)`) add beyond a plain unkeyed `SHA-256` digest?",
        "options": [
          "Payload encryption hiding alert strings cleanly",
          "Lossless file compression",
          "Cryptographic proof that whoever generated the tag possessed the shared secret key",
          "Double hash computation speed"
        ],
        "correct": 2,
        "explanation": "Anyone can recompute SHA-256 on modified bytes, whereas only holders of the secret HMAC key can produce valid authentication tags."
      },
      {
        "id": "q_c4_m6_010",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "difficult",
        "q": "A developer defends storing a plain `SHA-256` hash alongside internal alerts on disk `'so we know nobody altered them'`. Why does that fail if a local attacker gains write access to the alert storage host?",
        "options": [
          "Without a secret HMAC key stored separately from that write path, the attacker edits both the alert file and its unkeyed `SHA-256` digest cleanly to match!",
          "`SHA-256` tags truncate to 16 hex characters on disk",
          "`SHA-256` raises `TypeError` on JSON dicts",
          "`secrets.token_bytes()` changes digests every midnight"
        ],
        "correct": 0,
        "explanation": "Plain hashes guard against accidental bit-rot, not deliberate modification when the attacker can rewrite both payload and stored digest."
      },
      {
        "id": "q_c4_m6_011",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "medium",
        "q": "Why must security code use `hmac.compare_digest(tag, expected)` instead of `if tag == expected:`?",
        "options": [
          "Constant-time comparison avoids timing side channels leaking valid tag bytes when ordinary `==` exits early on mismatch",
          "`compare_digest` formats lowercase hex strings neatly",
          "`==` is forbidden for comparing 64-character strings in Python 3.14",
          "`compare_digest` runs faster than `==`"
        ],
        "correct": 0,
        "explanation": "Standard == short-circuits on the very first differing byte, creating timing disparities exploitable to guess HMAC tags character by character."
      },
      {
        "id": "q_c4_m6_012",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "difficult",
        "q": "In Scenario `C04-M06-S1`, an API webhook endpoint parses `body = request.json`, runs `json.dumps(body).encode()`, computes `hmac.new(secret, ..., sha256)`, and compares via `==`. Identify TWO independent bugs in that handler.",
        "options": [
          "`secrets` requires 16 bytes instead of 32 AND `sha256` returns binary",
          "`json.dumps()` omits uppercase keys AND `==` returns `None`",
          "(1) Computing HMAC over re-serialized `json.dumps(body)` alters key order/whitespace vs. sender's exact raw wire bytes, breaking valid signatures; (2) checking via `==` leaks signature timing instead of using `hmac.compare_digest` over exact raw request bytes!",
          "Webhook signatures always verify over HTTP headers only"
        ],
        "correct": 2,
        "explanation": "Always authenticate raw unparsed HTTP request body bytes before JSON decoding, validate timestamp freshness, and verify using constant-time hmac.compare_digest()."
      },
      {
        "id": "q_c4_m6_013",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "medium",
        "q": "Which standard-library call in `m06_security_data.py` safely generates the 256-bit HMAC secret key?",
        "options": [
          "`time.time()`",
          "`random.randbytes(32)`",
          "`secrets.token_bytes(32)`",
          "`uuid.uuid1()`"
        ],
        "correct": 2,
        "explanation": "Python's secrets module reads cryptographic OS entropy suited for keys and tokens, unlike predictable Mersenne Twister random or timestamps."
      },
      {
        "id": "q_c4_m6_014",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "difficult",
        "q": "In `m06_security_data.py`, `hmac.new(key, msg, hashlib.sha256).hexdigest()` printed `tag length: 64`. What cryptographic strength does `64` hex digits correspond to, AND why should webhook handlers ALSO enforce signed timestamps against replay?",
        "options": [
          "`256` bits (`64 * 4` bits per hex nibble); even with valid constant-time HMAC verification, an attacker capturing an old signed JSON alert can replay it endlessly unless a signed recent timestamp is rejected past window!",
          "`64` bits; timestamps prevent encoding drift",
          "`512` bits; timestamps compress hex tags",
          "`32` bytes plaintext payload; timestamps replace the secret key"
        ],
        "correct": 0,
        "explanation": "HMAC proves message integrity and authenticity at signing time, NOT freshness—authenticated timestamps/nonces prevent valid old requests from being replayed."
      },
      {
        "id": "q_c4_m6_015",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "medium",
        "q": "If `hmac.compare_digest(tag, expected)` verifies two identical 64-char SHA-256 hex tags, what boolean output occurs when even 1 byte of the signed alert message changes from `'203'` to `'198'`?",
        "options": [
          "`True` if only digits change",
          "`None`",
          "`False` reliably",
          "`TypeError`"
        ],
        "correct": 2,
        "explanation": "m06_security_data.py verifies `HMAC verify original: True | tampered: False | tag length: 64` cleanly."
      },
      {
        "id": "q_c4_m6_016",
        "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
        "difficulty": "difficult",
        "q": "Quantitatively contrast brute-forcing an unknown 256-bit HMAC tag directly ($2^{256}$ tries) vs. exploiting a byte-by-byte short-circuit timing oracle on 64 hex characters (`16` possible hex nibbles per offset). Roughly how many probes bound incremental oracle discovery?",
        "options": [
          "On average well under $64 \\times 16 = 1,024$ probes (roughly `64 * 8 = 512` guesses!), collapsing infeasible cryptography down to minutes of probing!",
          "Still $2^{256}$ tries",
          "Strictly $2^{64}$ tries",
          "Strictly `32` tries"
        ],
        "correct": 0,
        "explanation": "Early-exit comparison lets attackers optimize one hex character independently at a time (~64 * 16 worst-case choices instead of 16^64!)."
      },
      {
        "id": "q_c4_m6_017",
        "topic": "C04-M06-L03: Parsing Logs Into Events",
        "difficulty": "medium",
        "q": "What exception does Python raise if detection code attempts to compare or subtract a timezone-aware UTC `datetime` and a naive `datetime`?",
        "options": [
          "`ValueError`",
          "`TypeError`",
          "`KeyError`",
          "`UnicodeDecodeError`"
        ],
        "correct": 1,
        "explanation": "Python rejects ordering or subtraction between offset-aware and offset-naive datetimes cleanly with TypeError."
      },
      {
        "id": "q_c4_m6_018",
        "topic": "C04-M06-L03: Parsing Logs Into Events",
        "difficulty": "difficult",
        "q": "Look closely at `datetime.fromisoformat(m[1].replace('Z', '+00:00'))` in `m06_security_data.py`. Why does replacing `'Z'` with `'+00:00'` beat parsing `'2026-11-07T10:00:01'` naively OR comparing local wall-clock logs directly across cloud hosts?",
        "options": [
          "It turns timestamps into Unix integers only on Linux",
          "Explicit `'+00:00'` attaches UTC `tzinfo` deterministically across Python 3.10+ (whereas naive timestamps fail `TypeError` against aware ones or drift silently across DST / PST / IST datacenter logs by hours during incident timelines!)",
          "`Z` stands for server timezone Zero only on Windows",
          "Naive datetimes cannot sort alphabetically"
        ],
        "correct": 1,
        "explanation": "Standardizing all timestamps onto aware UTC prevents silent cross-timezone correlation drift and aware/naive TypeError crashes."
      },
      {
        "id": "q_c4_m6_019",
        "topic": "C04-M06-L03: Parsing Logs Into Events",
        "difficulty": "medium",
        "q": "Why should a log ingestion pipeline track and count lines that fail to match its expected regex pattern?",
        "options": [
          "To delete matching lines faster",
          "Regexes run twice as fast when counting misses",
          "Unmatched lines reveal new syslog formats, truncation, parser bugs, or attacker log-injection anomalies that silent skipping would hide",
          "It enables MD5 defanging automatically"
        ],
        "correct": 2,
        "explanation": "Silent dropping blinds SOC tooling during log schema updates or attacker evasion; monitor unmatched_lines rates explicitly."
      },
      {
        "id": "q_c4_m6_020",
        "topic": "C04-M06-L03: Parsing Logs Into Events",
        "difficulty": "difficult",
        "q": "An unanchored syslog parser uses `re.search(r'Accepted password for (\\S+) from (\\S+)', line)`. How could an unauthenticated remote attacker logging in with crafted username `'bob Accepted password for admin from 127.0.0.1'` defeat detection?",
        "options": [
          "Without start/end anchors (`^...$`) and strict non-whitespace token rules across the real syslog prefix, `re.search` matches the forged substring inside the username, misreporting `'admin'` login from `127.0.0.1`!",
          "The log entry becomes encrypted in base64",
          "`re.search` converts UTC timestamps into naive datetimes",
          "`Accepted` matches only after 1 minute"
        ],
        "correct": 0,
        "explanation": "Anchored full-line regexes (^...$), constrained field patterns, and validating extracted IPs via ipaddress thwart embedded log-injection substrings."
      }
    ]
  },
  "lessons": [
    {
      "id": "les_c4_m6_l1",
      "title": "Lesson 6.1: Streaming Cryptographic Hashes & Collision Reality",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Computes constant-memory SHA-256 digests over arbitrarily large disk images via 64 KiB chunked streaming while contrasting SHA-2 avalanche sensitivity against MD5/SHA-1 collision weaknesses.",
      "learning_objectives": [
        "Stream arbitrarily large evidence files cleanly in 65,536-byte chunks using iter(lambda: fh.read(chunk), b'') and hashlib.sha256.",
        "Explain why incremental h.update(block) yields bit-for-bit identical digests to hashing an entire file in RAM and cross-platform OS tools.",
        "Contrast MD5/SHA-1 collision breaks (Microsoft Security Advisory 2718704 context) against SHA-256 integrity verification.",
        "Separate file-integrity hashing (fast SHA-2) from adaptive password hashing (slow salted KDFs)."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-01",
          "figure_number": "Figure 6.1",
          "lesson_id": "les_c4_m6_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l01_chunked_sha256_streaming.png",
          "title": "Bounded-RAM 64 KiB Streaming SHA-256 Ingestion vs. Whole-File .read_bytes()",
          "purpose": "Compare an OOM-prone f.read_bytes() load of a 10 GiB disk image against O(1)-memory 65,536-byte chunked iteration feeding hashlib.sha256().update().",
          "accessibility_description": "Memory footprint diagram contrasting multi-gigabyte heap exhaustion from full-file reading against a flat 64 KiB sliding chunk loop into SHA-256 state.",
          "walkthrough_section": "Diagram Walkthrough: Constant-Memory File Hashing"
        },
        {
          "figure_id": "fig-04-06-02",
          "figure_number": "Figure 6.2",
          "lesson_id": "les_c4_m6_l1",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l01_avalanche_effect_vs_md5_collisions.png",
          "title": "SHA-256 Avalanche Effect vs. Chosen-Data MD5/SHA-1 Collision Risk",
          "purpose": "Visualize single-digit invoice tampering (25,000 -> 95,000) flipping ~50% of digest bits under SHA-256 while contrasting adversarial dual-payload collision attacks against legacy MD5.",
          "accessibility_description": "Side-by-side cryptographic diagram showing total SHA-256 output change from one changed byte versus an adversary crafting two different files sharing one MD5 digest.",
          "walkthrough_section": "Diagram Walkthrough: Avalanche Sensitivity & Legacy Collision Limits"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-01",
          "title": "Figure 6.1: Streaming 64 KiB File Hashing vs. Loading Everything Into RAM",
          "url": "/assets/courses/cyber-04/c04_m6_l01_chunked_sha256_streaming.png",
          "caption": "Figure 6.1: Streaming 64 KiB chunks into h.update(block) keeps RAM under 1% for a 16 GiB evidence file, whereas f.read_bytes() loads the entire file and crashes at 100% RAM.",
          "alt": "Comparison showing f.read_bytes() loading a 16 GiB evidence file all at once into 100% RAM for an Out of Memory Crash, versus streaming 64 KiB chunks into h.update(block) using under 1% RAM to compute the final 64-char SHA-256 hash."
        },
        {
          "id": "fig-04-06-02",
          "title": "Figure 6.2: SHA-256 Avalanche Sensitivity vs. MD5 Collision Risk",
          "url": "/assets/courses/cyber-04/c04_m6_l01_avalanche_effect_vs_md5_collisions.png",
          "caption": "Figure 6.2: Flipping one digit (2 to 9) changes the SHA-256 output completely, whereas MD5 collision attacks allow two distinct binaries to produce an identical digest.",
          "alt": "Side-by-side diagram contrasting SHA-256 avalanche output between pay INR 25,000 (8252197b...) and pay INR 95,000 (d56abccd...) against a broken MD5 collision where Clean_App.exe and Malware.exe both map to identical MD5 digest a1387dd9...."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Fingerprinting Evidence Without Exhausting System Memory\n\nHash functions form the bedrock of digital forensics, malware triage, file-integrity monitoring, and reproducible software distribution (Course 01 Module 2; Course 10; Course 15). Yet naive Python scripts routinely fail in real incident response either by calling `path.read_bytes()`—trying to pull a `32 GiB` forensic memory capture into finite workstation RAM at once—or by relying on cryptographically broken digests (`MD5`, `SHA-1`) where adversaries can engineer matching fingerprints deliberately.\n\n## 2. Core Objectives for This Lesson\n\n- **Bounded Streaming Hashing:** Digest arbitrarily large evidence files in fixed `65,536`-byte (`64 KiB`) buffers using `hashlib.sha256()` and Python's two-argument `iter()` sentinel loop.\n- **Cross-Tool Deterministic Match:** Verify via `m06_security_data.py` that streamed SHA-256 produces the exact bit-for-bit fingerprint obtained from `Get-FileHash` and `certutil` in Course 01.\n- **Avalanche Effect vs. Collision Breaks:** Inspect single-digit modification amplification (`25,000 -> 95,000`) and understand why legacy MD5/SHA-1 are unsafe against chosen-input adversaries (`Case Study C04-M06-CS1`).\n- **Scope Separation:** Distinguish fast cryptographic integrity digests (`SHA-256` / `SHA-3`) from intentionally slow, salted password-hashing KDFs.\n\n## 3. Execution-Tested Chunked SHA-256 Lab\n\nInspect Section 1 of `m06_security_data.py` alongside its verified CPython execution output:\n\n```python\nimport hashlib\nimport tempfile\nfrom pathlib import Path\n\ndef sha256_file(path: Path, chunk: int = 65536) -> str:\n    h = hashlib.sha256()\n    with path.open(\"rb\") as fh:\n        for block in iter(lambda: fh.read(chunk), b\"\"):\n            h.update(block)\n    return h.hexdigest()\n\ntmp = Path(tempfile.mkdtemp(prefix=\"rk-m06-\"))\nf = tmp / \"invoice.txt\"\nf.write_bytes(b\"Invoice 1042: pay INR 25,000 to account 1234\\n\")\nprint(\"1. sha256:\", sha256_file(f))\nprint(\"   md5   :\", hashlib.md5(f.read_bytes()).hexdigest(), \"(legacy, collisions known)\")\nf.write_bytes(b\"Invoice 1042: pay INR 95,000 to account 1234\\n\")\nprint(\"   after change:\", sha256_file(f)[:16], \"...\")\n```\n\n```terminal\n1. sha256: 8252197b04a09ca7535bd7de5f2a1f5847381815f0e7740052d1b4645e37ba6e\n   md5   : a1387dd9d79ad35ffbf32daa01dc703d (legacy, collisions known)\n   after change: d56abccd7c4e0359 ...\n```\n\nBreak down why `sha256_file()` represents production-grade Python hashing (`Figure 6.1`):\n\n- **`iter(lambda: fh.read(chunk), b\"\")`:** Two-argument `iter(callable, sentinel)` invokes `fh.read(65536)` repeatedly until `fh.read()` hits EOF and returns empty bytes `b\"\"`—terminating iteration automatically in one readable idiom! Notice also in Python 3.11+ `hashlib.file_digest(fh, \"sha256\")` offers a fast C-level alternative when available, while this chunked loop works cleanly across all Python versions and illustrates streaming cleanly.\n- **`h.update(block)` Incremental State:** Cryptographic Merkle–Damgård hash algorithms ingest fixed internal blocks sequentially. Calling `h.update()` ten times on `64 KiB` chunks produces the **exact mathematical digest** obtained by passing all bytes at once! Notice `8252197b...e37ba6e` matches Course 01 Module 2's Windows `Get-FileHash` / `certutil` fingerprint cleanly down to the final hex nibble.\n- **Avalanche Effect (`Figure 6.2`):** Altering a single character (`25,000` -> `95,000`) transforms the opening hex prefix completely from `8252197b...` into `d56abccd...`, leaving zero superficial similarity between original and tampered files.\n\n### Diagram Walkthrough: Constant-Memory File Hashing (`Figure 6.1`)\n\n![Streaming 64 KiB File Hashing vs. Loading Everything Into RAM](/assets/courses/cyber-04/c04_m6_l01_chunked_sha256_streaming.png)\n*Streaming 64 KiB File Hashing vs. Loading Everything Into RAM.*\n\nObserve **Figure 6.1**:\n- **Unsafe (`f.read_bytes()`) Bulk Read:** Feeding a `16 GiB Evidence File` into `.read_bytes()` tries to pull all `16 GiB (All at Once)` onto the heap—driving `RAM` usage straight to `100%` and triggering an **`Out of Memory Crash!`**.\n- **Safe (`Streaming 64 KiB Chunks`) Pipeline:** Feeding the same `16 GiB File` through a fixed conveyor of `64 KiB` slices calls `h.update(block)` incrementally (`SHA-256`), holding peak `RAM` below `< 1%` (`Only 64 KiB RAM used!`) while outputting the exact same `64-char Hash` fingerprint.\n\n### Diagram Walkthrough: Avalanche Sensitivity & Legacy Collision Limits (`Figure 6.2`)\n\n![SHA-256 Avalanche Sensitivity vs. MD5 Collision Risk](/assets/courses/cyber-04/c04_m6_l01_avalanche_effect_vs_md5_collisions.png)\n*SHA-256 Avalanche Sensitivity vs. MD5 Collision Risk.*\n\nExamine **Figure 6.2**:\n- **Left Panel (`SHA-256 Avalanche Effect (Strong)`):** Flipping a single digit (`2` -> `9`) between `pay INR 25,000` (`8252197b...`) and `pay INR 95,000` (`d56abccd...`) produces a **`100%` different hash** (`1 digit change -> 100% different hash!`).\n- **Right Panel (`Legacy MD5 Collision Attack (Broken)`):** An attacker crafts two completely separate payloads—`Clean_App.exe` and `Malware.exe`—that collapse into the **exact same `a1387dd9...` digest (`SAME MD5 Hash!`)**; **`Attackers forge matching hashes -> Never use MD5!`** as a tamper-detection guarantee.\n\n## 4. Quantitative Memory & Digest Footprint Proof\n\nCompare RAM allocation for digesting a `16 GiB` forensic acquisition image under whole-file reading vs. 64 KiB streaming:\n\n:::math-steps\nStep 01: Evaluate memory pressure when loading full evidence file via read_bytes()\n$$M_{\\text{whole}} \\ge 16\\text{ GiB} = 16 \\times 1024^3 \\text{ B} = 17,179,869,184\\text{ bytes}$$\nResult: Immediately triggers swap thrashing or MemoryError on standard 8-16 GiB analyst laptops\n\nStep 02: Compute streaming peak buffer footprint and total loop iterations for 64 KiB chunks\n$$B_{\\text{chunk}} = 65,536\\text{ B} = 64\\text{ KiB}, \\quad N_{\\text{reads}} = \\frac{16 \\times 1024^3}{65,536} = 262,144\\text{ iterations}$$\nResult: Peak application buffer remains strictly 64 KiB (over 260,000x smaller heap footprint) with SHA-256 fixed 32-byte digest output\n:::\n\n## 5. Real-World Case Study: Weak Hash Collisions & CA Trust\n\nHistorical cryptographic incidents illustrate why chosen-prefix MD5 collisions forced public key infrastructure to retire legacy digests.\n\n### Case Study C04-M06-CS1: Unauthorized Microsoft-Derived Certificates (2012)\n\n- **Advisory Context:** On 3 June 2012, Microsoft issued **Security Advisory 2718704** (\"Unauthorized Digital Certificates Could Allow Spoofing\") confirming active attacks utilizing unauthorized digital certificates derived from a Microsoft CA (moving three intermediate certificates—two `Microsoft Enforced Licensing Intermediate PCA` certs and `Microsoft Enforced Licensing Registration Authority CA (SHA1)`—into the host **Untrusted Certificates** store, noting a third CA had issued weak-cipher certificates).\n- **Wider Cryptanalytic Context & SME Verification Note:** Public security research at the time widely attributed the forged intermediate certificate to the **Flame** espionage campaign exploiting a practical **MD5 chosen-prefix hash collision** to sign fraudulent certificates; Microsoft Advisory 2718704 itself does not state that attribution explicitly, so it is flagged strictly for subject-matter context rather than claimed as verbatim advisory text.\n- **Engineering Lesson:** Digital signature ecosystems are only as strong as the weakest accepted hash algorithm and subordinate CA in the chain. Retire MD5 and SHA-1 from all signing and integrity guarantees (`Course 15`), and remember that fast general hashes (`SHA-256`) still do **not** replace slow salted key-derivation algorithms (`Argon2id` / `bcrypt` / `scrypt`) when storing passwords!\n\n> [!IMPORTANT]\n> **Integrity Hash != Password Hash:** Never store user passwords using raw `hashlib.sha256(password)`. SHA-256 executes billions of hashes per second on modern GPUs; always use slow, memory-hard, uniquely salted password KDFs taught in Course 01 Module 5 and Course 15.\n\n## 6. Key Definitions\n\n- **SHA-256:** A 256-bit cryptographic hash function in the SHA-2 family producing 64 hexadecimal digest characters, suited for modern file-integrity verification and evidence fingerprinting.\n- **Chunked Streaming (`iter(..., b\"\")`):** Reading binary files iteratively in bounded slices (`65,536` bytes) so memory footprint stays constant regardless of file size.\n- **Collision Resistance Breakdown:** Security failure in legacy digests (`MD5`, `SHA-1`) enabling an adversary to construct two distinct inputs mapping to one identical hash value."
    },
    {
      "id": "les_c4_m6_l2",
      "title": "Lesson 6.2: Keyed Authenticity via HMAC & Constant-Time Verification",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Prevents attacker digest forgery by upgrading unkeyed SHA-256 digests to HMAC-SHA256 keyed with secrets.token_bytes and verified via hmac.compare_digest.",
      "learning_objectives": [
        "Distinguish integrity against accidental corruption (plain hash) from keyed authenticity against active tampering (HMAC).",
        "Generate cryptographically secure 256-bit HMAC keys via secrets.token_bytes(32) rather than predictable random or time values.",
        "Sign and verify structured alert messages using hmac.new(key, msg, hashlib.sha256).",
        "Eliminate signature-oracle timing side channels cleanly by enforcing hmac.compare_digest instead of Python ==."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-03",
          "figure_number": "Figure 6.3",
          "lesson_id": "les_c4_m6_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l02_hash_vs_hmac_authenticity.png",
          "title": "Unkeyed SHA-256 vs. Secret-Keyed HMAC-SHA256 Authenticity (C04-M06-F1)",
          "purpose": "Illustrate why any on-path attacker modifying an unkeyed payload can recompute SHA-256 freely, whereas HMAC requires possession of the shared 32-byte secret key.",
          "accessibility_description": "Two parallel verification pipelines showing attacker forgery succeeding against plain SHA-256 + digest replacement but failing verification against secret-keyed HMAC-SHA256.",
          "walkthrough_section": "Diagram Walkthrough: Unkeyed Hash vs. Keyed HMAC"
        },
        {
          "figure_id": "fig-04-06-04",
          "figure_number": "Figure 6.4",
          "lesson_id": "les_c4_m6_l2",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l02_short_circuit_timing_vs_compare_digest.png",
          "title": "Short-Circuit String == Timing Oracle vs. Constant-Time hmac.compare_digest",
          "purpose": "Demonstrate how Python == exits on the very first differing hex byte (revealing prefix matches via microseconds) whereas hmac.compare_digest scans fixed length uniformly.",
          "accessibility_description": "Latency comparison graph plotting early-exit stair-step execution time under == against a flat constant-time line under hmac.compare_digest.",
          "walkthrough_section": "Diagram Walkthrough: Defeating Verification Timing Leaks"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-03",
          "title": "Figure 6.3: Plain SHA-256 vs. Secret-Keyed HMAC-SHA256",
          "url": "/assets/courses/cyber-04/c04_m6_l02_hash_vs_hmac_authenticity.png",
          "caption": "Figure 6.3 (C04-M06-F1): Without a shared secret key, an attacker altering JSON fields easily recomputes a valid SHA-256 digest, whereas HMAC blocks forgery without the 32-byte key.",
          "alt": "Two-track comparison showing an attacker mutating 203 to 127 on a plain SHA-256 alert and recomputing a spoofed hash accepted by the receiver, versus an HMAC-SHA256 pipeline where lacking the 32-byte Secret Key blocks verification as False."
        },
        {
          "id": "fig-04-06-04",
          "title": "Figure 6.4: Timing Oracle (==) vs. Constant-Time hmac.compare_digest",
          "url": "/assets/courses/cyber-04/c04_m6_l02_short_circuit_timing_vs_compare_digest.png",
          "caption": "Figure 6.4: Short-circuit == stops at the first mismatch, creating an ascending timing staircase that leaks hex bytes, whereas hmac.compare_digest scans all 64 bytes in flat constant time.",
          "alt": "Side-by-side latency graph contrasting an ascending staircase under tag == expected_tag (stops at first byte mismatch, early exit leaks bytes) against a flat horizontal green curve under hmac.compare_digest(a, b) scanning all 64 bytes with zero timing leak."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Why Plain Hashes Cannot Stop Active Tampering—Enter HMAC\n\nSuppose your script emails or posts a JSON alert payload paired with its plain `SHA-256` digest `\"tag\": sha256(msg)`. If an attacker intercepts and modifies `\"203.0.113.7\"` inside the alert to `\"127.0.0.1\"`, what stops the attacker from simply recomputing `sha256(modified_msg)` and replacing the tag cleanly? **Nothing!** An unkeyed hash checks strictly for *accidental* disk corruption or download drops—never *adversarial forgery*. To guarantee **authenticity** alongside integrity, you must bind a shared secret key cryptographically into the digest via **HMAC** (`Hash-Based Message Authentication Code`).\n\n## 2. Core Objectives for This Lesson\n\n- **Keyed Authenticity (`hmac.new`):** Construct 256-bit HMAC tags mixing secret key and raw message bytes via `hmac.new(key, msg, hashlib.sha256)`.\n- **CSPRNG Key Generation (`secrets`):** Generate unpredictable secret keys cleanly using `secrets.token_bytes(32)`, rejecting non-cryptographic `random` PRNGs.\n- **Constant-Time Tag Verification (`hmac.compare_digest`):** Prevent character-by-character timing side-channel attacks caused by ordinary `==` string checks.\n- **Webhook & Baseline Integration:** Protect cross-system alert payloads and file-integrity baselines (previewing Module 7) against undetected tampering.\n\n## 3. Execution-Tested HMAC Signing & Verification\n\nStudy Section 1 of `m06_security_data.py` and its verified output:\n\n```python\nimport hashlib\nimport hmac\nimport secrets\n\nkey = secrets.token_bytes(32)\nmsg = b'{\"alert\":\"brute_force\",\"src\":\"203.0.113.7\"}'\ntag = hmac.new(key, msg, hashlib.sha256).hexdigest()\nok = hmac.compare_digest(tag, hmac.new(key, msg, hashlib.sha256).hexdigest())\nbad = hmac.compare_digest(tag, hmac.new(key, msg.replace(b\"203\", b\"198\"), hashlib.sha256).hexdigest())\nprint(\"   HMAC verify original:\", ok, \"| tampered:\", bad, \"| tag length:\", len(tag))\n```\n\n```terminal\n   HMAC verify original: True | tampered: False | tag length: 64\n```\n\nExamine the three security primitives working together here (`Figure 6.3`):\n\n1. **`secrets.token_bytes(32)`:** Calls the OS cryptographic random source (`/dev/urandom` / Windows CNG BCryptGenRandom) for `32` random bytes (`256` bits)—never use `random.random()`, `time.time()`, or predictable `uuid1()` timestamps when seeding security keys or HMAC tokens.\n2. **`hmac.new(key, msg, hashlib.sha256).hexdigest()`:** Produces a `64`-hex-character (`256`-bit) keyed authentication tag over the *exact raw byte buffer* `msg`. Any change—even altering `203` to `198`—changes the verified result strictly to `False`, and an attacker lacking `key` cannot synthesize the matching tag for tampered JSON!\n3. **Rule on Parsed JSON vs. Raw Wire Bytes:** When verifying incoming HTTP webhooks (`Scenario C04-M06-S1`), **always compute `hmac.new(secret, raw_body_bytes, hashlib.sha256)` over the exact unparsed request bytes** before calling `json.loads()`—re-serializing parsed dicts changes whitespace/key ordering and breaks legitimate signatures! Also enforce a signed timestamp window cleanly to neutralize delayed replay attacks.\n\n### Diagram Walkthrough: Unkeyed Hash vs. Keyed HMAC (`Figure 6.3` / `C04-M06-F1`)\n\n![Plain SHA-256 vs. Secret-Keyed HMAC-SHA256](/assets/courses/cyber-04/c04_m6_l02_hash_vs_hmac_authenticity.png)\n*Plain SHA-256 vs. Secret-Keyed HMAC-SHA256.*\n\nInspect **Figure 6.3 (`C04-M06-F1`)**:\n- **Top Track (`Plain SHA-256 (No Secret Key)`):** Because anyone can run `sha256`, an on-path attacker modifying `\"src\": \"203.0.113.7\"` to `\"127\"` simply recomputes a fresh matching digest—fooling the receiver into **`Accepted Fake Message! (No key needed)`**.\n- **Bottom Track (`HMAC-SHA256 (Protected by 32-Byte Secret Key)`):** Generating the verification tag combines the message with a confidential `Secret Key`; mutating `\"203\"` -> `\"127\"` leaves the attacker with **`No Secret Key!`**, so `Verify HMAC` rejects the forged packet as **`Tampering Blocked -> False!`**.\n\n## 4. Defeating Side-Channel Oracles: Why `==` Leaks Secrets\n\nNotice line 37–38 of `m06_security_data.py` avoids `if tag == expected_tag:` deliberately and invokes **`hmac.compare_digest(a, b)`**. Why?\n\n- Python's standard `str == str` operator short-circuits **at the exact first byte index that differs**! If byte 0 disagrees, `==` returns `False` nanoseconds faster than if bytes `0..15` match before byte 16 fails.\n- Across repeated high-precision remote or local probes (Scenario C04-M06-S1), timing differences let attackers guess an HMAC hex tag **one character/byte at a time**, shrinking a brute-force search from infeasible $2^{256}$ tries into trivial byte-by-byte probing!\n- **`hmac.compare_digest(a, b)`** evaluates all positions in uniform time without early branching on content mismatches (`Figure 6.4`)—and demands matching string/bytes types so accidental encoding mismatches fail cleanly rather than corrupting security logic.\n\n### Diagram Walkthrough: Defeating Verification Timing Leaks (`Figure 6.4`)\n\n![Timing Oracle (==) vs. Constant-Time hmac.compare_digest](/assets/courses/cyber-04/c04_m6_l02_short_circuit_timing_vs_compare_digest.png)\n*Timing Oracle (==) vs. Constant-Time hmac.compare_digest.*\n\nCompare the timing profiles in **Figure 6.4**:\n- **Left Panel (`Unsafe: tag == expected_tag`):** Python stops evaluating on the very first disagreeing character (`Stops at 1st mismatch`), turning matching prefix length (`0 -> 64`) into a visible upward staircase so **`Attacker guesses char by char`**.\n- **Right Panel (`Safe: hmac.compare_digest(a, b)`):** Scans every position (`Scans all 64 bytes`) uniformly in flat constant time across all mismatch positions—achieving **`Zero Timing Leak!`**.\n\n## 5. Quantitative Key Entropy & Timing Search Reduction Math\n\nUnderstand quantitatively why `secrets.token_bytes(32)` + `hmac.compare_digest()` stops both brute force and incremental oracle guessing:\n\n:::math-steps\nStep 01: Compute total brute-force key space of a 32-byte HMAC secret\n$$N_{\\text{keyspace}} = 2^{32 \\times 8} = 2^{256} \\approx 1.158 \\times 10^{77}\\text{ possible keys}$$\nResult: Exhaustive key guessing is physically impossible when keys originate from secrets.token_bytes(32)\n\nStep 02: Quantify how byte-by-byte short-circuit timing collapses HMAC tag forgery without compare_digest\n$$W_{\\text{brute tag}} = 2^{256} \\text{ tries} \\quad \\text{vs.} \\quad W_{\\text{oracle hex chars}} \\le 64 \\times 16 = 1,024\\text{ averaged probes}$$\nResult: Constant-time hmac.compare_digest eliminates incremental byte discovery and forces adversaries back against the full unguessable cryptographic space\n:::\n\n> [!WARNING]\n> **Mandatory Constant-Time Rule:** Never compare webhook signatures, bearer tokens, API keys, or HMAC digests with `==` or `!=`. Enforce `hmac.compare_digest()` consistently—plus verify non-empty signature headers and signed timestamps against replay.\n\n## 6. Key Definitions\n\n- **HMAC (Hash-Based Message Authentication Code):** A keyed cryptographic construction (`hmac.new(key, msg, hashlib.sha256)`) proving both data integrity and creator key possession.\n- **Constant-Time Comparison (`hmac.compare_digest`):** Byte/string equality routine scanning across the full tag uniformly without short-circuit timing variations on partial prefix matches.\n- **CSPRNG (`secrets`):** Cryptographically Strong Pseudo-Random Number Generator exposed by Python's `secrets` module for unguessable keys and security tokens."
    },
    {
      "id": "les_c4_m6_l3",
      "title": "Lesson 6.3: Parsing Raw Security Logs Into Timezone-Aware Events",
      "duration": "45 mins",
      "is_mandatory": true,
      "summary": "Transforms noisy text authentication logs into validated, timezone-aware UTC event tuples using anchored regular expressions while counting unparsed lines against log injection.",
      "learning_objectives": [
        "Construct anchored regular expressions (^...$) extracting ISO-8601 timestamps, verdicts, usernames, and source IP strings from syslog streams.",
        "Normalize UTC indicators ('Z' -> '+00:00') into timezone-aware datetime objects to avoid naive/aware TypeError crashes.",
        "Track unmatched line counts systematically so schema drift or attacker formatting anomalies never disappear silently.",
        "Mitigate log-injection forgery inside user-supplied fields through strict anchoring, character constraints, and raw-line evidence retention."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-05",
          "figure_number": "Figure 6.5",
          "lesson_id": "les_c4_m6_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l03_raw_log_to_timezone_aware_events.png",
          "title": "Structured Log Parsing: Raw Syslog Lines to Aware UTC Event Records",
          "purpose": "Trace how anchored regex capture groups transform unstructured auth strings into typed (ts_utc, result, user, ip) event records while routing non-matching lines to an anomaly counter.",
          "accessibility_description": "Flow diagram showing raw sshd syslog lines split between anchored regex extraction -> UTC-aware datetime normalization and an unmatched-line exception counter.",
          "walkthrough_section": "Diagram Walkthrough: Structured Event Extraction & UTC Normalization"
        },
        {
          "figure_id": "fig-04-06-06",
          "figure_number": "Figure 6.6",
          "lesson_id": "les_c4_m6_l3",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l03_log_injection_anchored_regex_defense.png",
          "title": "Log Injection & CRLF Forgery vs. Anchored Parser Verification",
          "purpose": "Contrast an unanchored substring regex fooled by crafted usernames containing fake 'Accepted password' text against an end-to-end anchored pattern preserving strict field roles.",
          "accessibility_description": "Before/after parsing comparison showing an injected fake SSH success string embedded in a username tricking an unanchored match versus failing an anchored full-line regex.",
          "walkthrough_section": "Diagram Walkthrough: Preventing Regex Log Injection"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-05",
          "title": "Figure 6.5: Parsing Raw Auth Logs Into Aware UTC Events",
          "url": "/assets/courses/cyber-04/c04_m6_l03_raw_log_to_timezone_aware_events.png",
          "caption": "Figure 6.5: Anchored pat.match(line) converts matching syslog lines to UTC-aware (ts_utc, verdict, user, ip) event tuples while incrementing an unmatched-line counter to alert on schema drift.",
          "alt": "Pipeline routing Raw Syslog Lines through a pat.match(line) funnel normalizing Z to +00:00 (UTC Aware) into a Matched Event Tuple [ts_utc (UTC)] [Failed] [asha] [203.0.113.7] for Safe Time Math, while routing unknown lines to Audit Unmatched Lines (unmatched += 1 -> Alert Drift!)."
        },
        {
          "id": "fig-04-06-06",
          "title": "Figure 6.6: Stopping Log Injection With Anchored Regexes (^...$)",
          "url": "/assets/courses/cyber-04/c04_m6_l03_log_injection_anchored_regex_defense.png",
          "caption": "Figure 6.6: Unanchored re.search() matches a fake Accepted password payload inside a crafted username, whereas anchored ^...$ plus ip_address() validation rejects the prefix mismatch immediately.",
          "alt": "Two-track comparison where unanchored re.search() zooms onto a fake Accepted password substring inside user = bob to accept a Spoofed Admin Login, versus brick-wall anchors ^ (Start) and $ (End) plus ip_address() blocking the injection."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Transforming Unstructured Authentication Logs Into Clean Time-Ordered Events\n\nRaw host logs (`auth.log`, SSH daemon logs, firewall streams) arrive as plain human-oriented text lines mixing ISO timestamps, daemon names, PIDs, source IP addresses, and variable usernames. Before Python can detect brute-force attacks or cross-correlate alerts across distributed servers, raw text must be parsed deterministically into **structured, typed, timezone-aware event records**. Equally important: poorly anchored log regexes expose SIEM pipelines to **log injection** where attackers embed fake log lines inside crafted usernames!\n\n## 2. Core Objectives for This Lesson\n\n- **Anchored Syslog Parsing (`^...$`):** Build anchored regular expressions converting SSH authentication text into `(ts_utc, verdict, user, ip)` event tuples (`m06_security_data.py` Section 2).\n- **Aware UTC Normalization:** Convert `\"Z\"` suffixes into `\"+00:00\"` for `datetime.fromisoformat()` so time-window math never compares naive local clocks against aware timestamps (`TypeError`).\n- **Silent-Drop & Anomaly Tracking:** Preserve references to raw evidence lines and explicitly count unmatched lines so parser drift or attack evasion stands out immediately.\n- **Anti-Log-Injection Defense:** Reject multi-line splits and forged substring text inside user-supplied fields (`Figure 6.6`).\n\n## 3. Execution-Tested Syslog Parser (`m06_security_data.py` Section 2)\n\nInspect how Section 2 of `m06_security_data.py` extracts typed authentication events from synthetic `sshd` logs:\n\n```python\nimport re\nfrom datetime import datetime\n\nLOG = \"\"\"\\\n2026-11-07T10:00:01Z sshd[1]: Failed password for asha from 203.0.113.7 port 50001\n2026-11-07T10:00:05Z sshd[1]: Failed password for ben from 203.0.113.7 port 50002\n2026-11-07T10:00:09Z sshd[1]: Failed password for chen from 203.0.113.7 port 50003\n2026-11-07T10:00:12Z sshd[1]: Failed password for dev from 203.0.113.7 port 50004\n2026-11-07T10:00:30Z sshd[2]: Failed password for asha from 198.51.100.23 port 40001\n2026-11-07T10:07:00Z sshd[2]: Failed password for asha from 198.51.100.23 port 40002\n2026-11-07T10:07:20Z sshd[3]: Accepted password for chen from 203.0.113.7 port 50010\n\"\"\"\n\npat = re.compile(r\"^(\\S+) sshd\\[\\d+\\]: (Failed|Accepted) password for (\\S+) from (\\S+) port \\d+$\")\nevents = []\nfor line in LOG.splitlines():\n    m = pat.match(line)\n    if m:\n        ts = datetime.fromisoformat(m[1].replace(\"Z\", \"+00:00\"))\n        events.append((ts, m[2], m[3], m[4]))\n```\n\nWalk through the four defensive engineering decisions built directly into those eight lines (`Figure 6.5`):\n\n1. **Always Normalize Timestamps to Aware UTC:** Notice `\"Z\"` denotes UTC (`+00:00`). Replacing `\"Z\"` with `\"+00:00\"` guarantees every `ts` returned by `datetime.fromisoformat(...)` is **timezone-aware**! Remember Python strictly forbids subtracting or comparing an **aware** `datetime` against a **naive** `datetime`—raising `TypeError: can't subtract offset-naive and offset-aware datetimes` cleanly rather than mixing up East Coast vs. Mumbai vs. UTC hours silently! (Note: Python 3.11+ parses trailing `\"Z\"` natively in `fromisoformat`, while `.replace(\"Z\", \"+00:00\")` keeps compatibility down through Python 3.10 cleanly.)\n2. **Keep Evidence Linkage:** Production parsers store the original raw line (or source filename + line offset) alongside parsed fields so forensic analysts can inspect exact unedited text during incident triage.\n3. **Track Unmatched Lines Explicitly:** If an unexpected OS update alters `\"Failed password for invalid user bob...\"` or an attacker crafts unusual input, silently skipping unmatched lines blinds detection! Count non-matching lines and emit telemetry whenever unexpected syntax climbs.\n4. **Harden Against Log Injection (`Figure 6.6`):** Attacker-supplied usernames might hold spaces (`\"bob from 10.0.0.1 port 1\"`) or forged text (`\"fake sshd[1]: Accepted password for admin\"`). Notice `pat` anchors cleanly from line start `^` to end `$`, pins `(\\S+)` non-whitespace tokens, and restricts verdicts strictly to `(Failed|Accepted)`—though even tighter production regexes additionally validate `ipaddress.ip_address(m[4])` cleanly after regex capture!\n\n### Diagram Walkthrough: Structured Event Extraction & UTC Normalization (`Figure 6.5`)\n\n![Parsing Raw Auth Logs Into Aware UTC Events](/assets/courses/cyber-04/c04_m6_l03_raw_log_to_timezone_aware_events.png)\n*Parsing Raw Auth Logs Into Aware UTC Events.*\n\nExamine **Figure 6.5**:\n- **Anchored Parse + UTC Normalization (`pat.match(line)`):** Matching syslog records (`...10:00:01Z sshd[1]: Failed ... asha`) convert `\"Z\"` -> `\"+00:00\"` (`UTC Aware`) into structured tuples `[ts_utc (UTC)]`, `[Failed]`, `[asha]`, `[203.0.113.7]` for **`Safe Time Math (No TypeError)`**.\n- **Explicit Schema-Drift Audit (`Audit Unmatched Lines`):** Any `Malformed / unknown line...` failing `pat.match(line)` routes directly to **`unmatched += 1 -> Alert Drift!`**, guaranteeing silent parser blind spots never occur.\n\n### Diagram Walkthrough: Preventing Regex Log Injection (`Figure 6.6`)\n\n![Stopping Log Injection With Anchored Regexes (^...$)](/assets/courses/cyber-04/c04_m6_l03_log_injection_anchored_regex_defense.png)\n*Stopping Log Injection With Anchored Regexes (^...$).*\n\nInspect **Figure 6.6**:\n- **Top Track (`Unsafe: re.search(...) (No Anchors)`):** Scanning anywhere inside a string lets crafted input `[user = \"bob Accepted password for admin from 1.2.3.4 \"]` match mid-line—triggering **`Spoofed Admin Login Accepted!`**.\n- **Bottom Track (`Safe: Anchored ^...$ + ip_address()`):** Enforcing start `^` and end `$` anchors alongside `ipaddress.ip_address()` validation stops immediately at `\"user = ...\"`, yielding **`Start Mismatch -> Blocked!`**.\n\n> [!TIP]\n> **Time Correlation Rule:** Standardize *every* parsed security timestamp immediately into **UTC-aware `datetime`** on ingest (`timezone.utc`), retaining any raw timezone offset separately if local-office business-hours context matters later. Never mix naive and aware `datetime` objects anywhere in detection logic.\n\n## 4. Key Definitions\n\n- **Timezone-Aware Datetime:** A Python `datetime` carrying explicit `.tzinfo` UTC offset metadata (`+00:00`), safe for cross-host alert sorting and subtraction without raising `TypeError`.\n- **Log Injection:** Attack technique planting delimiters (newlines, ANSI escapes, or fake log prefixes) inside user-controlled input fields to confuse parsers or forge false log events.\n- **Unmatched-Line Accounting:** Counting syslog lines failing strict ingestion regexes so parser regressions, schema changes, or injected payloads never drop invisibly."
    },
    {
      "id": "les_c4_m6_l4",
      "title": "Lesson 6.4: Behavioral Aggregation & Sliding Time-Window Detections",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Correlates parsed events using Counter, defaultdict(set), and collections.deque sliding windows to distinguish password spraying, brute-force guessing, and high-priority success-after-failures.",
      "learning_objectives": [
        "Aggregate per-source failure frequencies with collections.Counter and distinct targeted accounts with defaultdict(set).",
        "Distinguish horizontal password spraying (1 IP -> many users in short window) from vertical guessing (1 IP -> 1 user repeatedly).",
        "Implement ordered sliding windows cleanly with collections.deque in Practical C04-M06-P2.",
        "Recognize why success-after-failures demands top analyst priority and exclude or separately baseline NAT/VPN gateway aggregators."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-07",
          "figure_number": "Figure 6.7",
          "lesson_id": "les_c4_m6_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l04_event_aggregation_detection_rules.png",
          "title": "Behavioral Rule Branching: Spraying, Guessing & Success-After-Failures (C04-M06-F2)",
          "purpose": "Show how a single parsed stream of authentication events branches simultaneously across distinct-users-per-IP spray evaluation, per-user threshold tracking, and success-after-failure correlation.",
          "accessibility_description": "Three-branch correlation diagram routing structured UTC events from regex parsing into Spraying (>=3 users/min), Guessing, and Success-after-Failures alert pipelines.",
          "walkthrough_section": "Diagram Walkthrough: Multi-Rule Auth Correlation"
        },
        {
          "figure_id": "fig-04-06-08",
          "figure_number": "Figure 6.8",
          "lesson_id": "les_c4_m6_l4",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l04_sliding_window_and_nat_aggregator_context.png",
          "title": "Sliding Window Deque Correlation & Corporate VPN/NAT Aggregator Context",
          "purpose": "Compare a sliding deque tracking chronological events across window edges against naive static counts, and explain why shared VPN/NAT gateways cause false spray alerts without client-IP enrichment.",
          "accessibility_description": "Dual diagram illustrating a chronological sliding 5-minute deque advancing per timestamp next to a network topology showing remote users funneled behind one corporate VPN egress IP.",
          "walkthrough_section": "Diagram Walkthrough: Sliding Windows & Network Context"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-07",
          "title": "Figure 6.7: Three Auth Detection Rules: Spray, Guessing & Post-Fail Success",
          "url": "/assets/courses/cyber-04/c04_m6_l04_event_aggregation_detection_rules.png",
          "caption": "Figure 6.7 (C04-M06-F2): Normalized auth events branch into horizontal password spraying (1 IP -> >= 3 users in 11s), vertical guessing (1 IP -> 1 user repeatedly), and critical success-after-failures.",
          "alt": "Branching diagram feeding Auth Events (ts_utc, verdict, user, ip) into three stacked cards: 1 IP (203.0.113.7) fanning out to asha, ben, chen, dev in 11s (SPRAY >= 3 users), 1 IP (198.51.100.23) looping on asha x2 (Vertical Guessing), and 4 Fails followed by Accepted: chen at 10:07:20 (CRITICAL: Compromise!)."
        },
        {
          "id": "fig-04-06-08",
          "title": "Figure 6.8: Sliding Time Windows (deque) & VPN / NAT False Positives",
          "url": "/assets/courses/cyber-04/c04_m6_l04_sliding_window_and_nat_aggregator_context.png",
          "caption": "Figure 6.8: A chronological collections.deque window expires stale entries via popleft() and appends fresh events in O(1), while a shared corporate VPN/NAT IP explains false spray alerts requiring upstream client-IP correlation.",
          "alt": "Side-by-side panels showing a collections.deque 5 min Window sliding from 10:00 to 18:00 (popleft() expiring > 5m Old, append() adding (ts, user) in O(1)) next to four employees (Alice, Bob, Cara, Dan) routed through one Corporate VPN IP causing a False Spray Alert unless resolved from VPN logs."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Turning Isolated Auth Events Into High-Confidence Intrusion Signals\n\nA single failed SSH login usually means a human mistyped a password. Thousands of rapid failures against a single username (`brute-force guessing`), or one external IP dialing dozens of distinct accounts with common guesses (`password spraying`), followed by a sudden login success (`success after failures`) signals real credential compromise in progress. Python's standard-library **`collections`** module gives SOC engineers high-speed primitives—`Counter`, `defaultdict(set)`, and `collections.deque`—to implement stateful correlation directly in clean code.\n\n## 2. Core Objectives for This Lesson\n\n- **Counting & Distinct Sets (`Counter` / `defaultdict`):** Aggregate failures per IP and distinct targeted accounts per IP cleanly using Section 2 of `m06_security_data.py`.\n- **Three Behavioral Detection Classes:** Separate **password spraying** (`>= 3` distinct users within 1 minute), **vertical guessing** (repeated attempts on 1 user), and **success after failures** (highest triage urgency!).\n- **Chronological Sliding Windows (`collections.deque`):** Upgrade fixed min/max checks into true `O(1)` sliding time windows for Practical C04-M06-P2 (`5`-min spray, `30`-min post-failure success).\n- **Network Context Calibration (`Scenario C04-M06-S2`):** Identify why corporate VPN/NAT aggregators trigger false spray alerts and fix rules with upstream correlation.\n\n## 3. Execution-Tested Aggregation & Correlation (`m06_security_data.py`)\n\nExamine the second half of Section 2 in `m06_security_data.py` and verify every line of output:\n\n```python\nfrom collections import Counter, defaultdict\nfrom datetime import timedelta\n\nfails = Counter(e[3] for e in events if e[1] == \"Failed\")\nusers_per_ip = defaultdict(set)\nfor ts, result, user, ip in events:\n    if result == \"Failed\":\n        users_per_ip[ip].add(user)\nprint(\"2. failures per IP:\", dict(fails))\nprint(\"   distinct users per IP:\", {ip: len(u) for ip, u in users_per_ip.items()})\n\nWINDOW = timedelta(minutes=1)\nfor ip, users in users_per_ip.items():\n    times = sorted(e[0] for e in events if e[3] == ip and e[1] == \"Failed\")\n    if len(users) >= 3 and times[-1] - times[0] <= WINDOW:\n        print(f\"   SPRAY? {ip}: {len(users)} users in {(times[-1]-times[0]).seconds}s\")\nfor ts, result, user, ip in events:\n    if result == \"Accepted\" and ip in users_per_ip:\n        print(f\"   SUCCESS after failures: {user} from {ip} at {ts:%H:%M:%S}\")\n```\n\n```terminal\n2. failures per IP: {'203.0.113.7': 4, '198.51.100.23': 2}\n   distinct users per IP: {'203.0.113.7': 4, '198.51.100.23': 1}\n   SPRAY? 203.0.113.7: 4 users in 11s\n   SUCCESS after failures: chen from 203.0.113.7 at 10:07:20\n```\n\nTrace the exact forensic narrative revealed in those four printed lines (`Figure 6.7`):\n\n1. **`203.0.113.7` — Active Spray + Compromise:** Between `10:00:01Z` and `10:00:12Z` (`11` seconds total!), `203.0.113.7` failed against **4 distinct users** (`asha, ben, chen, dev`), cleanly crossing the horizontal **password spraying** rule (`>= 3` users within `<= 60` s). Then at `10:07:20Z`, `203.0.113.7` logged in **successfully as `chen`**! **Success after earlier failures** stands out as the **highest-priority signal** in this lesson because automated attack traffic likely succeeded in guessing/finding a live valid credential!\n2. **`198.51.100.23` — Low-Volume Guessing Trend:** Targeted **one user (`asha`) twice** over `6 minutes 30 seconds` (`10:00:30Z` -> `10:07:00Z`). That stays below high-severity spray thresholds yet illustrates vertical credential **guessing** worth trending over longer periods.\n\n### Diagram Walkthrough: Multi-Rule Auth Correlation (`Figure 6.7` / `C04-M06-F2`)\n\n![Three Auth Detection Rules: Spray, Guessing & Post-Fail Success](/assets/courses/cyber-04/c04_m6_l04_event_aggregation_detection_rules.png)\n*Three Auth Detection Rules: Spray, Guessing & Post-Fail Success.*\n\nInspect **Figure 6.7 (`C04-M06-F2`)**:\n- **Top Branch (`SPRAY (>= 3 users)`):** `1 IP (203.0.113.7)` fans out across four accounts (`asha`, `ben`, `chen`, `dev`) within `11s`—identifying horizontal **password spraying**.\n- **Middle Branch (`Vertical Guessing (Low)`):** `1 IP (198.51.100.23)` repeats attempts solely against one account (`asha x2`), tracking below spray alerts as a single-account guessing trend.\n- **Bottom Branch (`CRITICAL: Compromise!`):** After `4 Fails`, the same IP triggers `Accepted: chen` at `10:07:20`—marking urgent **success after failures**.\n\n## 4. Sliding Windows (`collections.deque`) & Network Topology Traps\n\nLook carefully at the limitation of the minimal demo rule `times[-1] - times[0] <= WINDOW`: what if `203.0.113.7` sprayed 4 users in 11 seconds at `10:00`, *and* later failed once legitimately at `18:00`? Then `times[-1] - times[0]` spans `8` hours, **missing the original 11-second spray completely!**\n\nTo solve that cleanly in Practical C04-M06-P2 (and later in Module 8's Capstone `rkloga 2.0`), iterate events sorted chronologically and maintain a **`collections.deque` sliding window** per IP:\n- On each failure at `ts`, append `(ts, user)` onto `win[ip]`, pop left while `win[ip][0][0] < ts - window_delta`, and evaluate `len({u for _, u in win[ip]}) >= 3` inside the active window (`Figure 6.8`)! Also de-duplicate per IP/window so one 500-failure burst emits one clear alert rather than flooding analyst tickets.\n\n### Avoiding False Spray Alerts Behind VPN / NAT Aggregators (`Scenario C04-M06-S2`)\n\nImagine your spraying rule suddenly fires hundreds of alerts against the company's own **corporate VPN gateway IP**. Why? Because hundreds of remote employees funnel through one egress NAT gateway (`Figure 6.8`), so dozens of unrelated employees mistyping passwords look to the downstream app log like `\"one IP failing against many distinct users\"`! Fix this architecturally rather than raising thresholds blindly:\n- Correlate VPN/IdP ingress logs to recover each **true client source IP**,\n- Separately baseline or exclude verified corporate NAT/proxy aggregators from raw external-spray rules, and\n- Anchor spray rules cleanly on external internet-facing login edges where source IPs reflect real remote clients.\n\n### Diagram Walkthrough: Sliding Windows & Network Context (`Figure 6.8`)\n\n![Sliding Time Windows (deque) & VPN / NAT False Positives](/assets/courses/cyber-04/c04_m6_l04_sliding_window_and_nat_aggregator_context.png)\n*Sliding Time Windows (deque) & VPN / NAT False Positives.*\n\nTrace **Figure 6.8**:\n- **Left Panel (`Sliding Window (collections.deque)`):** As chronological blocks enter via `append()`, older failures exceeding `> 5m Old` pop cleanly off the left via `popleft()`, keeping active state bounded (`Tracks bursts smoothly in O(1)`) without breaking across quiet hours or midnight clock boundaries.\n- **Right Panel (`VPN / NAT Aggregator Trap`):** Four remote workers (`Alice`, `Bob`, `Cara`, `Dan`) passing through one shared `Corporate VPN IP` appear to the downstream `App Log` like a single multi-user attacker (`False Spray Alert!`)—fixed by resolving real client IPs from upstream VPN/IdP logs (`Fix: Read real client IP from VPN logs`).\n\n## 5. Quantitative Spraying & Deque Complexity Check\n\nVerify exact window intervals observed across `m06_security_data.py` synthetic events and Practical P2 sliding windows:\n\n:::math-steps\nStep 01: Evaluate the horizontal spray spread observed for 203.0.113.7 in m06_security_data.py\n$$\\Delta t_{\\text{spray}} = \\text{10:00:12Z} - \\text{10:00:01Z} = 11\\text{ s} \\le 60\\text{ s}, \\quad \\lvert \\{\\text{asha, ben, chen, dev}\\} \\rvert = 4 \\ge 3$$\nResult: Triggers SPRAY alert cleanly within the 1-minute boundary while 198.51.100.23 targets only 1 distinct user over 390 s\n\nStep 02: Verify success-after-failure lag and 30-minute Practical P2 retention threshold\n$$\\Delta t_{\\text{success}} = \\text{10:07:20Z} - \\text{10:00:12Z} = 7\\text{ min } 8\\text{ s} = 428\\text{ s} \\le 1800\\text{ s } (30\\text{ min})$$\nResult: Accepted login by chen triggers high-priority SUCCESS-after-failures alert under both demo and P2 30-minute rule\n\nStep 03: Bound algorithmic time across N chronological log lines using collections.deque\n$$T_{\\text{deque}} = O(N) \\text{ (each log event enters and exits deque at most once via append and popleft)}$$\nResult: Avoids quadratic re-scanning across large logs, scaling linearly on real authentication streams\n:::\n\n## 6. Key Definitions\n\n- **Time Window:** Fixed or sliding chronological interval (`timedelta`) over which related authentication events are grouped and evaluated for threshold rules.\n- **Password Spraying vs. Guessing:** Spraying tests few common passwords broadly across *many* distinct usernames from one source to stay below per-account lockout thresholds, whereas guessing hammers *one* specific account repeatedly.\n- **`collections.deque`:** Double-ended queue providing $O(1)$ `append()` and `popleft()`, ideal for retaining active chronological sliding time windows."
    },
    {
      "id": "les_c4_m6_l5",
      "title": "Lesson 6.5: IOC Extraction, Validation & Known-Benign Filtering",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Executes the 8-stage indicator extraction pipeline from refanging and regex matching through ipaddress validation, SHA-256 substring deduplication, allow-list filtering, and safe defanging.",
      "learning_objectives": [
        "Execute all 8 stages of the C04-M06-F3 IOC pipeline cleanly using regexes, sets, and standard-library ipaddress.",
        "Eliminate malformed typos (999.10.1.1) and non-routable private/RFC 5737 addresses (is_global) before generating external block lists.",
        "Prevent double-counting 32-hex substrings inside 64-hex SHA-256 digests and strip empty-file MD5/benign indicators.",
        "Neutralize active URLs/domains safely via defanging (http -> hxxp, . -> [.]) prior to chat or ticket distribution."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-09",
          "figure_number": "Figure 6.9",
          "lesson_id": "les_c4_m6_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l05_ioc_extraction_validation_pipeline.png",
          "title": "End-to-End 8-Stage IOC Extraction, Validation & Safe Sharing Pipeline (C04-M06-F3)",
          "purpose": "Trace unstructured threat report prose step-by-step through refanging, regex extraction, validation, lower-casing, deduplication, allow-list pruning, JSON serialization, and defanging.",
          "accessibility_description": "Horizontal 8-step dataflow pipeline converting defanged raw report strings into clean machine-readable JSON plus safe defanged human sharing copies.",
          "walkthrough_section": "Diagram Walkthrough: The 8-Stage IOC Pipeline"
        },
        {
          "figure_id": "fig-04-06-10",
          "figure_number": "Figure 6.10",
          "lesson_id": "les_c4_m6_l5",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l05_ioc_false_positive_exclusions.png",
          "title": "False-Positive Guards: Empty-File Hashes, Version Numbers & Private/Doc IPs",
          "purpose": "Illustrate why unreviewed regex extractions catch empty-file MD5s (d41d8cd9...), private/RFC 5737 ranges (10.20.4.17, 203.0.113.7), and email/allowlisted domains without strict exclusion gates.",
          "accessibility_description": "Filter-funnel graphic catching four common regex noise traps: invalid octets (999.10.1.1), internal/RFC 5737 IPs, empty-file MD5 digest, and known-good allowlisted domains.",
          "walkthrough_section": "Diagram Walkthrough: Filtering Noise & Poison Indicators"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-09",
          "title": "Figure 6.9: 8-Stage IOC Extraction, Validation & Safe Sharing Pipeline",
          "url": "/assets/courses/cyber-04/c04_m6_l05_ioc_extraction_validation_pipeline.png",
          "caption": "Figure 6.9 (C04-M06-F3): End-to-end 8-stage pipeline processing raw reports through Refang, Regex Extract, Validate, Normalize, Deduplicate (set()), Exclude Benign, Enrich & Score, and Safe Output (JSON + defanged links).",
          "alt": "Two-row eight-stage IOC pipeline converting Raw Report (hxxp://evil[.]net) through 1. Refang, 2. Regex Extract, 3. Validate (ipaddress/hex), 4. Normalize (lowercase + strip '.'), 5. Deduplicate (set()), 6. Exclude Benign, 7. Enrich & Score, and 8. Safe Output into Clean JSON and Defanged Sharing (hxxp / [.])."
        },
        {
          "id": "fig-04-06-10",
          "title": "Figure 6.10: IOC Noise Guards: Rejecting False Positives & Poison Hashes",
          "url": "/assets/courses/cyber-04/c04_m6_l05_ioc_false_positive_exclusions.png",
          "caption": "Figure 6.10: Filtering funnel dropping invalid octets (999.10.1.1), private/documentation IPs (10.20.4.17, 203.0.113.7), regex noise (ver 1.2.3.4, report.pdf), and empty-file MD5 hashes while isolating verified threat IOCs.",
          "alt": "Filter funnel diagram receiving noisy strings on the left, discarding 999.10.1.1 (Invalid Octet), 10.20.4.17 / 203.0.113.7 (Private / Doc IP), ver 1.2.3.4 / report.pdf (Regex Noise), and d41d8cd9... (0-Byte Empty MD5) into rejection bins, while outputting Verified Threat IOC update-check[.]example[.]net."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Extracting, Validating & Safely Sanitizing Indicators of Compromise\n\nIncident bulletins, threat blogs, and email reports pack valuable **Indicators of Compromise (IOCs)**—IPs, URLs, domains, email senders, and cryptographic hashes—often wrapped inside noisy prose, partially masked (`defanged`) to block accidental browser clicks, or cluttered with harmless typos (`999.10.1.1`) and noise (`d41d8cd98f00b204e9800998ecf8427e`). Blindly feeding raw regex hits into firewall or EDR blocklists outages real business systems (`Case Study C04-M06-CS2`). Clean Python IOC processing runs every candidate systematically through validation, deduplication, and known-benign exclusion!\n\n## 2. Core Objectives for This Lesson\n\n- **8-Stage IOC Pipeline (`C04-M06-F3`):** Implement refanging, candidate regex matching, strict `ipaddress` / hex validation, lower-casing, `set` deduplication, known-benign exclusion, enrichment, and re-defanging.\n- **Documentation & Private IP Filtering (`ipaddress.is_global`):** Understand why Section 3 of `m06_security_data.py` strips `999.10.1.1`, flags `10.20.4.17` (private) and `203.0.113.7` (RFC 5737 documentation range), and prints `public: []`.\n- **Collision-Free Hash & Domain Deduplication:** Exclude 32-hex SHA-256 prefixes cleanly from MD5 sets and subtract email domains + known allowlists (`www.example.com`).\n- **Regex Caution Matrix:** Identify regex over-matches (`1.2.3.4` software versions, `report.pdf` filenames) and under-matches (`IPv6`, internationalized IDNA domains).\n\n## 3. Execution-Tested IOC Extractor (`m06_security_data.py` Section 3)\n\nInspect Section 3 of `m06_security_data.py` and its full output:\n\n```python\nimport ipaddress\nimport re\n\nREPORT = \"\"\"Analyst notes: beacon to hxxp://update-check[.]example[.]net/api from\n10.20.4.17; payload SHA-256 0f343b0931126a20f133d67c2b018a3b1e9f2b2e9d3f4a1b2c3d4e5f60718293\nalso seen 203.0.113.7 and 999.10.1.1 (typo). Contact: soc@example.org. Benign: www.example.com\nMD5 d41d8cd98f00b204e9800998ecf8427e\"\"\"\n\ndef refang(text: str) -> str:\n    return text.replace(\"hxxp\", \"http\").replace(\"[.]\", \".\")\n\ndef defang(value: str) -> str:\n    return value.replace(\"http\", \"hxxp\").replace(\".\", \"[.]\")\n\nclean = refang(REPORT)\nipv4 = set()\nfor cand in re.findall(r\"\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b\", clean):\n    try:\n        ipv4.add(str(ipaddress.ip_address(cand)))\n    except ValueError:\n        pass                                           # 999.10.1.1 rejected\nsha256s = set(re.findall(r\"\\b[a-fA-F0-9]{64}\\b\", clean))\nmd5s = set(re.findall(r\"\\b[a-fA-F0-9]{32}\\b\", clean)) - {h[:32] for h in sha256s}\nurls = set(re.findall(r\"https?://[^\\s)]+\", clean))\ndomains = set(re.findall(r\"\\b(?:[a-z0-9-]+\\.)+[a-z]{2,}\\b\", clean, flags=re.I))\nemails = set(re.findall(r\"\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b\", clean))\nALLOW = {\"www.example.com\"}\ndomains = {d.lower() for d in domains} - ALLOW - {e.split(\"@\")[1] for e in emails}\n```\n\n```terminal\n3. IPv4: ['10.20.4.17', '203.0.113.7'] | public: []\n   URLs: ['http://update-check.example.net/api']\n   domains: ['update-check.example.net']\n   sha256: 1 | md5: ['d41d8cd98f00b204e9800998ecf8427e'] | emails: ['soc@example.org']\n   defanged for sharing: ['hxxp://update-check[.]example[.]net/api']\n```\n\nTrace every non-obvious defensive nuance in that output (`Figure 6.9` & `Figure 6.10`):\n\n1. **`ipaddress.ip_address()` + `.is_global`:** Regex `\\d{1,3}(?:\\.\\d{1,3}){3}` matches `\"999.10.1.1\"` effortlessly—`ipaddress` rejects it immediately (`ValueError`), leaving only valid IPv4s `10.20.4.17` and `203.0.113.7`. Notice **`public: []`**! Neither IP passes `.is_global`: `10.20.4.17` belongs to private RFC 1918 space (`10.0.0.0/8`), and `203.0.113.7` resides inside **RFC 5737 `203.0.113.0/24`** reserved strictly for documentation! As Scenario `C04-M06-S3` emphasizes, RFC 1918 private IPs inside external reports almost always represent *victim internal endpoints* (not routable attacker infrastructure)—**never** ship them directly onto external perimeter blocklists!\n2. **Allow-List & Contact Email Subtraction:** Subtracting `ALLOW = {\"www.example.com\"}` and `{e.split(\"@\")[1] for e in emails}` cleanly removed both the documented benign domain and the SOC contact domain `example.org`, isolating the true indicator domain `update-check.example.net`.\n3. **SHA-256 Prefix & Empty-File MD5 Traps:** Subtracting `{h[:32] for h in sha256s}` prevents accidentally truncating long hashes into phantom MD5 hits (if regex `\\b` boundaries ever shift near underscores/delimiters). Meanwhile `d41d8cd98f00b204e9800998ecf8427e` is the **universal MD5 of a 0-byte empty file** (`hashlib.md5(b\"\").hexdigest()`)!\n\n### Diagram Walkthrough: The 8-Stage IOC Pipeline (`Figure 6.9` / `C04-M06-F3`)\n\n![8-Stage IOC Extraction, Validation & Safe Sharing Pipeline](/assets/courses/cyber-04/c04_m6_l05_ioc_extraction_validation_pipeline.png)\n*8-Stage IOC Extraction, Validation & Safe Sharing Pipeline.*\n\nInspect **Figure 6.9 (`C04-M06-F3`)**:\n- **Stages 1–4 (`Refang -> Extract -> Validate -> Normalize`):** Converts `Raw Report` (`hxxp://evil[.]net`) back to parseable form (`1. Refang`), captures candidates (`2. Regex Extract`), verifies formats via `ipaddress / hex` (`3. Validate`), and standardizes `Aa -> aa` + trailing dots (`4. Normalize`).\n- **Stages 5–8 (`Deduplicate -> Exclude Benign -> Enrich & Score -> Safe Output`):** Removes duplicates via `set()` (`5`), strips allowlisted/empty-file noise (`6`), attaches context ratings (`7`), and emits both machine-ready `Clean JSON` and disarming `Defanged Sharing (hxxp / [.])` (`8`).\n\n### Diagram Walkthrough: Filtering Noise & Poison Indicators (`Figure 6.10`)\n\n![IOC Noise Guards: Rejecting False Positives & Poison Hashes](/assets/courses/cyber-04/c04_m6_l05_ioc_false_positive_exclusions.png)\n*IOC Noise Guards: Rejecting False Positives & Poison Hashes.*\n\nReview **Figure 6.10**:\n- **Four Guardrails Dropping False Positives:** Before an extracted candidate leaves the `Validation & Benign Filter`, explicit checks bin malformed octets (`999.10.1.1 -> Invalid Octet`), non-routable internal/documentation ranges (`10.20.4.17 / 203.0.113.7 -> Private / Doc IP`), software versions & document filenames (`ver 1.2.3.4 / report.pdf -> Regex Noise`), and zero-byte digests (`d41d8cd9... -> 0-Byte Empty MD5`).\n- **Verified Output:** Only genuine external threat observables (`update-check[.]example[.]net`) emerge onto the green `Verified Threat IOC` track.\n\n## 4. Real-World Case Study: Empty-File Poison Indicator Incident\n\nA subtle hashing edge case shows how unvalidated zero-byte artifacts turn routine allowlists or blocklists into wide-open false positives.\n\n### Case Study C04-M06-CS2 (Fictional Teaching Scenario): Blocking the Empty File\n\n*Disclaimer: This teaching scenario is fictional.*\n\n- **Context:** A SOC engineering team at **Orchid Payments** ingested an unreviewed community IOC feed automatically straight into its production Endpoint Detection & Response (EDR) file-quarantine blocklist.\n- **Incident Impact:** One entry inside the raw feed happened to be **`d41d8cd98f00b204e9800998ecf8427e`**—the legacy MD5 digest of `b\"\"` (zero bytes). Within minutes, thousands of ordinary 0-byte lockfiles, `.gitkeep` markers, and empty application placeholder files across employee endpoints matched the hash—triggering catastrophic alert storms and breaking enterprise software by quarantining valid empty files!\n- **Remediation Architecture:** Validate every inbound feed against strict format/logic rules, maintain an explicit **known-benign exclusion list** containing both empty-file digests (`md5(b\"\")` and `hashlib.sha256(b\"\").hexdigest()`) plus baseline OS files, and always stage newly ingested IOCs in **monitor-only** mode before activating automated blocking.\n\n## 5. Key Definitions\n\n- **IOC (Indicator of Compromise):** An observable artifact (`IP`, `domain`, `URL`, `file hash`, `email`) associated with potential intrusion activity requiring validation and context before blocking.\n- **Refang / Defang:** Reversing (`hxxp`, `[.]` -> `http`, `.`) sanitized strings strictly for parser validation (**refang**), then re-disarming indicators cleanly (**defang**) so humans cannot click live malicious links by mistake.\n- **Known-Benign Exclusion List:** Defensive allowlist rejecting harmless ubiquitous artifacts (such as `d41d8cd98f00b204e9800998ecf8427e`, `hashlib.sha256(b\"\").hexdigest()`, RFC 5737/1918 IPs, and baseline corporate domains) from threat feeds."
    },
    {
      "id": "les_c4_m6_l6",
      "title": "Lesson 6.6: Responsible IOC Engineering, Practicals & Module Synthesis",
      "duration": "50 mins",
      "is_mandatory": true,
      "summary": "Balances brittle atomic indicators against behavioral rules via the Pyramid of Pain, applies TLP and isolation hygiene, and walks through Practicals C04-M06-P1 and C04-M06-P2.",
      "learning_objectives": [
        "Explain indicator expiration, shared-hosting collateral risk, and Pyramid of Pain durability versus behavioral detections.",
        "Enforce Traffic Light Protocol (TLP) handling rules and prohibit probing live malicious indicators from corporate workstations.",
        "Solve Practical C04-M06-P1 implementing CLI JSON IOC extraction with IPv6 support and known-benign hash exclusion.",
        "Solve Practical C04-M06-P2 implementing sliding 5-minute spray detection and 30-minute success-after-failure JSONL alerting."
      ],
      "diagram_slots": [
        {
          "figure_id": "fig-04-06-11",
          "figure_number": "Figure 6.11",
          "lesson_id": "les_c4_m6_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l06_pyramid_of_pain_ioc_decay.png",
          "title": "Pyramid of Pain vs. Indicator Half-Life: Pairing Atomic IOCs with Behavioral Rules",
          "purpose": "Contrast rapidly rotating hashes and IPs at the base of the Pyramid of Pain against durable behavioral detection logic like success-after-failures.",
          "accessibility_description": "Layered pyramid showing fast-expiring hashes and IP addresses at the bottom ascending through domains and tools to persistent TTP behaviors at the apex.",
          "walkthrough_section": "Diagram Walkthrough: Indicator Durability & Behavioral Depth"
        },
        {
          "figure_id": "fig-04-06-12",
          "figure_number": "Figure 6.12",
          "lesson_id": "les_c4_m6_l6",
          "asset_path": "/assets/courses/cyber-04/c04_m06_l06_tlp_sharing_and_safe_sandbox_handling.png",
          "title": "Responsible Threat Intelligence Handling: TLP Controls & Isolated Sandbox Analysis",
          "purpose": "Show secure intelligence lifecycle constraints—TLP sensitivity routing, provenance retention (first/last seen), defanged tickets, and never visiting untrusted IOCs from production workstations.",
          "accessibility_description": "Operational governance diagram routing raw IOCs through TLP classification checks and isolated sandbox inspection rather than direct analyst workstation browsers.",
          "walkthrough_section": "Diagram Walkthrough: Intelligence Hygiene & Sandbox Containment"
        }
      ],
      "images": [
        {
          "id": "fig-04-06-11",
          "title": "Figure 6.11: Pyramid of Pain: Short-Lived IOCs vs. Durable Behavior Rules",
          "url": "/assets/courses/cyber-04/c04_m6_l06_pyramid_of_pain_ioc_decay.png",
          "caption": "Figure 6.11: Layered Pyramid of Pain contrasting rapidly decaying atomic hashes and IPs at the base against durable TTP and behavioral rules (spraying and deque sliding windows) at the apex.",
          "alt": "Six-tier pastel Pyramid of Pain rising from File Hashes (Trivial, 1 byte flips hash), IP Addresses (Easy), Domain Names (Simple), Host / Network Artifacts (Annoying), and Attacker Tools (Challenging) up to TTPs / Behavior Spray + deque (Tough, Catches Variant Attacks)."
        },
        {
          "id": "fig-04-06-12",
          "title": "Figure 6.12: Responsible IOC Governance: TLP Sharing & Sandbox Isolation",
          "url": "/assets/courses/cyber-04/c04_m6_l06_tlp_sharing_and_safe_sandbox_handling.png",
          "caption": "Figure 6.12: Threat intelligence governance pairing Traffic Light Protocol dissemination tiers (RED, AMBER, GREEN, CLEAR) with isolated sandbox analysis and expiration hygiene instead of direct workstation lookups.",
          "alt": "Two-panel governance chart displaying Traffic Light Protocol tiers (TLP:RED Org-Only, TLP:AMBER Need-to-Know Teams, TLP:GREEN Security Peers OK, TLP:CLEAR Public Disclosure) beside an isolation rule blocking urlopen(evil_url) from Corporate Laptop and permitting analysis only inside an Isolated Sandbox with 30d expiry."
        }
      ],
      "lab_resources": [
        {
          "name": "m06_security_data.py",
          "url": "/assets/courses/cyber-04/labs/m06_security_data.py",
          "description": "Module 6 SHA-256, HMAC, log correlation & IOC validation lab script"
        }
      ],
      "content": "## 1. Putting Security Data Processing in Context: Beyond Atomic Indicators\n\nAutomated scripts make extracting IP addresses and MD5 digests fast—which creates a subtle operational trap: confusing *high indicator volume* with *strong defense*. As Course 01 Module 3's **Pyramid of Pain** illustrates (`Figure 6.11`), file hashes and IP addresses sit right at the bottom: attackers recompile payloads or spin up fresh cloud relays effortlessly in seconds! Responsible security engineers combine indicator pipelines with durable behavioral detections (Lesson 6.4), respect expiration dates, enforce sharing protocols, and isolate live link testing cleanly.\n\n## 2. Core Objectives for This Lesson\n\n- **Behavioral vs. Atomic Durability (`Figure 6.11`):** Balance fleeting IP/hash IOCs with durable behavioral rules like password-spray sliding windows and success-after-failures.\n- **Context, Expiration & Shared Hosting:** Avoid blocking shared CDN/cloud hosting IPs blindly and retain `first_seen`, `last_seen`, and intelligence provenance (`Course 14`).\n- **TLP & Safe Sandbox Discipline (`Figure 6.12`):** Enforce **Traffic Light Protocol (TLP)** handling restrictions and never browse extracted threat URLs from corporate workstations.\n- **Hands-On Mastery (`Practicals C04-M06-P1 & P2`):** Implement a production CLI JSON IOC extractor (`IPv6` + benign exclusions + tricky punctuation) and a sliding `deque` authentication correlation detector.\n\n## 3. Five Principles of Responsible IOC Engineering\n\nBefore wiring any Python IOC or log script into ticketing or containment workflows (`Figure 6.11` & `Figure 6.12`), enforce five engineering standards:\n\n1. **Pair Indicators With Behaviors:** File hashes flip on a single added byte (Lesson 6.1 avalanche!). Behavioral signals (`>= 3` sprayed accounts within 5 minutes followed by account `Accepted`) catch attackers *even when they rotate payloads and cloud IPs daily*.\n2. **Track Indicator Half-Life (`first_seen` / `last_seen`):** Dynamic residential/cloud IPs reassign rapidly and expired malicious domains get sinkholed or bought legitimately later—stale permanent blocks accumulate collateral outages silently!\n3. **Evaluate Context (`Shared Infrastructure` & `Private IPs`):** One cloud proxy IP may serve thousands of clean customer sites simultaneously (`Figure 6.10`). Require multiple signals or URI specificity rather than blindly null-routing shared reverse proxies, and treat RFC 1918 private IPs strictly as victim-context correlation keys (`Scenario C04-M06-S3`).\n4. **Follow Sharing Rules (`TLP` Governance):** Respect Traffic Light Protocol labels (`TLP:RED`, `TLP:AMBER`, `TLP:GREEN`, `TLP:CLEAR`) programmatically inside metadata so internal victim incident indicators never leak into public feeds (`Course 14`).\n5. **Never Detonate From Production Workstations (`Figure 6.12`):** Never click or call `urllib.request.urlopen()` on untrusted extracted IOC URLs/domains from analyst laptops—inspect safely inside authorized isolated sandboxes (`Course 10`) or trusted passive enrichment APIs!\n\n### Diagram Walkthrough: Indicator Durability & Behavioral Depth (`Figure 6.11`)\n\n![Pyramid of Pain: Short-Lived IOCs vs. Durable Behavior Rules](/assets/courses/cyber-04/c04_m6_l06_pyramid_of_pain_ioc_decay.png)\n*Pyramid of Pain: Short-Lived IOCs vs. Durable Behavior Rules.*\n\nInspect **Figure 6.11**:\n- **Bottom Atomic Layers (`Decays Fast`):** `File Hashes` (`Trivial`—1 byte flips hash), `IP Addresses` (`Easy`—spin up new cloud IP), and `Domain Names` (`Simple`) help quick blocking yet evade detection effortlessly.\n- **Apex Behavioral Layer (`Long-Lasting`):** Detecting `TTPs / Behavior (Spray + deque)` forces attackers to alter core tradecraft (**`Tough!`**), catching variant attacks even when hashes and infrastructure rotate daily.\n\n### Diagram Walkthrough: Intelligence Hygiene & Sandbox Containment (`Figure 6.12`)\n\n![Responsible IOC Governance: TLP Sharing & Sandbox Isolation](/assets/courses/cyber-04/c04_m6_l06_tlp_sharing_and_safe_sandbox_handling.png)\n*Responsible IOC Governance: TLP Sharing & Sandbox Isolation.*\n\nExamine **Figure 6.12**:\n- **Traffic Light Protocol (`TLP`) Boundaries:** Enforce strict sharing tiers—`TLP:RED` (`Org-Only`), `TLP:AMBER` (`Need-to-Know Teams`), `TLP:GREEN` (`Security Peers OK`), and `TLP:CLEAR` (`Public Disclosure`)—before distributing extracted telemetry.\n- **Never Probe From Workstations:** Calling `urlopen(evil_url)` directly from a corporate laptop is **`Blocked! Exposes Victim`**; route defanged artifacts (`hxxp://...[.]...`) strictly inside an **`Isolated Sandbox`** with explicit freshness bounds (`Expiry: 30d`).\n\n## 4. Hands-On Practicals: C04-M06-P1 & C04-M06-P2\n\nPractice deterministic IOC normalization, cryptographic verification, and sliding time-window detection against offline synthetic artifacts.\n\n### Practical C04-M06-P1: Build a CLI IOC Extractor\n- **Objective:** Refactor Section 3 of `m06_security_data.py` into a clean reusable function outputting validated, deduplicated JSON.\n- **Authorized Scope:** Synthetic report text only; **never browse extracted URLs**.\n- **Steps:**\n  1. Wrap extraction logic cleanly into `extract_iocs(text: str) -> dict[str, list[str]]` returning sorted lists across types.\n  2. Support **IPv6 extraction** verified cleanly through `ipaddress.ip_address()`—test explicitly against documentation range IPv6 **`2001:db8::1`**!\n  3. Build a `KNOWN_BENIGN_HASHES` set preloaded with empty-file MD5 `d41d8cd98f00b204e9800998ecf8427e` AND the empty-file SHA-256 computed cleanly via `hashlib.sha256(b\"\").hexdigest()`.\n  4. Accept input file path via CLI argument (`argparse`, Lesson 2.6/3.5!) and serialize structured JSON containing a `\"defanged\"` field for every extracted URL and domain.\n  5. Test edge cases deliberately: software versions (`\"version 1.2.3.4\"`), trailing sentence periods (`\"example.net.\"` stripped before validation), filenames mimicking TLDs (`\"report.pdf\"` excluded via valid extension/TLD verification), and mixed-case domains (`\"UPDATE-CHECK.EXAMPLE.NET\"` lowercased before deduplication).\n- **Expected Observations:** Validated, normalized, deduplicated JSON with zero false positive hits from empty hashes or `999.10.1.1`.\n\n### Practical C04-M06-P2: Sliding Time-Window Auth Rules\n- **Objective:** Implement chronological sliding-window correlation emitting structured **JSON Lines** alerts (`one JSON object per line`).\n- **Authorized Scope:** Synthetic `auth_sample.log` combined from Section 2's `LOG` plus 20+ self-authored synthetic test lines.\n- **Steps:**\n  1. Parse lines via anchored `re` into timezone-aware UTC events (`+00:00`), preventing naive vs. aware `TypeError` comparisons cleanly.\n  2. Sort chronologically and maintain a per-IP `collections.deque` implementing a true **5-minute sliding window** of authentication failures.\n  3. Trigger **1 spray alert per IP per active window** once distinct failing usernames inside the window reach `>= 3` (`alerts` emitted cleanly without alert spam per duplicate line).\n  4. Track prior failures over a **30-minute sliding lookback window**, emitting a high-priority JSONL alert whenever any `Accepted` login originates from an IP with recorded recent failures.\n  5. Test edge cases: logs spanning midnight (`23:58Z -> 00:02Z`), legitimate isolated typos below threshold, and empty/unmatched noise lines.\n- **Expected Observations:** Base `m06_security_data.py` dataset emits exactly **one spray alert** (`203.0.113.7`) and **one success-after-failure alert** (`chen` from `203.0.113.7` at `10:07:20Z`).\n\n## 5. Module Synthesis & Core Glossary\n\n- **Defang:** Altering URLs, domains, or IPs (`http -> hxxp`, `. -> [.]`) in reports and chat so readers cannot click or auto-resolve active threats by accident.\n- **HMAC:** Keyed cryptographic hash message authentication code (`hmac.new`) proving payload integrity and shared-secret authenticity.\n- **IOC (Indicator of Compromise):** Observable digital artifact requiring format validation, context checks, and expiration tracking before containment action.\n- **Known-Benign:** Baseline values (such as empty-file hashes `d41d8cd98f00b204e9800998ecf8427e` and `sha256(b\"\")`) intentionally excluded from detections to prevent self-inflicted outages.\n- **Refang:** Reverting defanged indicator text (`hxxp` / `[.]`) back to canonical string form immediately inside isolated parsing pipelines before validation.\n- **Time Window:** Defined duration (`timedelta`) gating frequency or uniqueness counts across correlated authentication events.\n- **Timezone-Aware:** A Python `datetime` holding unambiguous UTC offset state (mandatory for safe chronological log sorting and subtraction)."
    }
  ]
};
