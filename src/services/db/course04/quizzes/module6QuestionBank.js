/**
 * Course 04: Python for Cybersecurity — Module 6 Question Bank
 * 200 unique MCQs (100 medium, 100 difficult; 0 easy)
 */
export const module6QuestionBank = [
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
  },
  {
    "id": "q_c4_m6_021",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `pat = re.compile(r'^(\\S+) sshd\\[\\d+\\]: (Failed|Accepted) password for (\\S+) from (\\S+) port \\d+$')`, what four capture groups (`m[1]..m[4]`) are extracted cleanly?",
    "options": [
      "PID, port, digest, and verdict",
      "Timestamp string, verdict (`Failed`/`Accepted`), username, and source IP string",
      "Hostname, MD5, URL, and UID",
      "Timestamp, cipher, email, and domain"
    ],
    "correct": 1,
    "explanation": "m[1] matches timestamp, m[2] verdict, m[3] username, and m[4] source IP address."
  },
  {
    "id": "q_c4_m6_022",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Why should structured event tuples/records retain the raw original syslog line (or source file/line reference) alongside extracted `(ts, result, user, ip)` fields?",
    "options": [
      "So regex patterns can re-run during password hashing",
      "`datetime.fromisoformat` needs raw strings afterward",
      "So `Counter` calculates SHA-256 digests faster",
      "Regexes strip non-captured context (`port`, PID, subtle trailing warnings) and can have bugs; retaining exact raw lines preserves forensic chain-of-evidence and analyst auditability"
    ],
    "correct": 3,
    "explanation": "Analysts verifying high-severity alerts always inspect the unaltered raw evidence event alongside parsed summary fields."
  },
  {
    "id": "q_c4_m6_023",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, which two `collections` data structures tally failures per IP and distinct failed usernames per IP?",
    "options": [
      "`Counter` and `defaultdict(set)`",
      "`OrderedDict` and `namedtuple`",
      "`ChainMap` and `list`",
      "`tuple` and `frozenset`"
    ],
    "correct": 0,
    "explanation": "Counter aggregates failure totals cleanly per key, while defaultdict(set) deduplicates targeted usernames cleanly per source IP."
  },
  {
    "id": "q_c4_m6_024",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Verify why `203.0.113.7` triggered BOTH alerts in `m06_security_data.py` whereas `198.51.100.23` triggered neither alert in the printed output.",
    "options": [
      "`198.51.100.23` is allow-listed automatically",
      "`203.0.113.7` had 20 failures per user",
      "`198.51.100.23` used IPv6 timestamps",
      "`203.0.113.7` targeted 4 distinct users within 11s (`>= 3` within 60s -> SPRAY) and later logged an `Accepted` login as `chen` (`SUCCESS after failures`), whereas `198.51.100.23` failed twice against only 1 user (`asha`) over 6.5 min with zero `Accepted` success"
    ],
    "correct": 3,
    "explanation": "Horizontal multi-user spray plus subsequent compromise triggers both rules cleanly; low-volume single-user repeats remain below spray thresholds."
  },
  {
    "id": "q_c4_m6_025",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Among authentication rules covered in Lesson 6.4 (single failure, guessing, spraying, success after failures), which carries the highest immediate triage urgency?",
    "options": [
      "A single failed password attempt",
      "One routine syslog timestamp rollover",
      "A successful login from a source IP that recently logged prior authentication failures",
      "Two failures separated by 6 hours"
    ],
    "correct": 2,
    "explanation": "Success-after-failures indicates credential testing or brute-forcing may actually have gained active host access!"
  },
  {
    "id": "q_c4_m6_026",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Spot the edge-case flaw in checking `times[-1] - times[0] <= WINDOW` across all historic failures for an IP. If `203.0.113.7` sprayed 4 users in 11s at `10:00Z` AND failed once more at `12:00Z`, what happens?",
    "options": [
      "Both windows merge cleanly via `defaultdict`",
      "`Counter` resets automatically every 60 seconds",
      "Python throws `TypeError` after midnight",
      "`times[-1] - times[0]` grows to 2 hours (`> 1 min`), FALSE-NEGATIVELY suppressing the `10:00Z` spray! Sorting events through a chronological `collections.deque` sliding window fixes that cleanly"
    ],
    "correct": 3,
    "explanation": "Comparing only min-to-max timestamp breaks whenever an IP sends failures spread past one window width; sliding deque windows maintain true rolling density."
  },
  {
    "id": "q_c4_m6_027",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "How do **password spraying** and **vertical password guessing** differ in `m06_security_data.py`?",
    "options": [
      "Guessing targets multiple domains simultaneously via UDP",
      "Spraying encrypts logs; guessing compresses them",
      "Spraying tries one common password across many distinct accounts from an IP within a short window; guessing hammers failures against a single username",
      "There is zero difference in attacker pattern"
    ],
    "correct": 2,
    "explanation": "Spraying spreads attempts horizontally across usernames to dodge per-account lockouts; guessing concentrates failures vertically onto one user."
  },
  {
    "id": "q_c4_m6_028",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "In Scenario `C04-M06-S2`, your SSH spraying rule triggers constant false alarms naming your own **corporate VPN egress gateway IP**. Why does this occur, and how should engineering fix it properly?",
    "options": [
      "Increase the spray threshold to 5,000 accounts across all external IPs",
      "Convert timestamps back to naive local time",
      "The VPN/NAT gateway funnels dozens of real remote users behind one shared IP; fix it by extracting true client IPs from upstream VPN/IdP logs, separately baselining known aggregators, and focusing raw source-IP spray detection on direct external gateways!",
      "Disable `SUCCESS after failures` completely"
    ],
    "correct": 2,
    "explanation": "Shared NAT proxies mimic horizontal fan-out unless detection correlates true upstream client identity or models aggregator context."
  },
  {
    "id": "q_c4_m6_029",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Which standard-library container in Python's `collections` module is recommended in Practical C04-M06-P2 for maintaining an efficient `O(1)` sliding window of recent failure timestamps?",
    "options": [
      "`collections.deque`",
      "`collections.UserString`",
      "`hashlib.sha256`",
      "`ipaddress.IPv4Network`"
    ],
    "correct": 0,
    "explanation": "collections.deque supports O(1) append() on right and popleft() expiration on old window edges."
  },
  {
    "id": "q_c4_m6_030",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Analyze the time complexity of sliding a 5-minute window using `collections.deque` over `N` sorted authentication log lines compared to slicing full lists on every timestamp.",
    "options": [
      "`O(N^2)` in all cases",
      "`O(2^N)` due to `defaultdict(set)`",
      "`O(N)` amortized across the scan, since every event enters via `append()` once and exits via `popleft()` at most once!",
      "`O(1)` regardless of event count when unsorted"
    ],
    "correct": 2,
    "explanation": "Each record is pushed and popped at most once across the stream, yielding linear O(N) sliding correlation."
  },
  {
    "id": "q_c4_m6_031",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Why did `'999.10.1.1'` fail extraction from `REPORT` in `m06_security_data.py` even though regex `r'\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b'` matched it?",
    "options": [
      "`refang()` deleted all digits over 500",
      "The file extension `.1` was allow-listed",
      "`ipaddress.ip_address('999.10.1.1')` raised `ValueError` because valid IPv4 octets must lie within `0..255`",
      "SHA-256 prefix subtraction removed it"
    ],
    "correct": 2,
    "explanation": "Simple digit-count regexes accept impossible octets like 999; explicit validation with stdlib ipaddress rejects typos cleanly."
  },
  {
    "id": "q_c4_m6_032",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Why did `m06_security_data.py` print `public: []` even though `['10.20.4.17', '203.0.113.7']` both passed IPv4 validation cleanly?",
    "options": [
      "`refang()` failed to restore `'203.0.113.7'`",
      "Because `10.20.4.17` is RFC 1918 private space and `203.0.113.7` is inside RFC 5737 `203.0.113.0/24` documentation range—so `.is_global` returns `False` for both!",
      "`.is_global` throws `TypeError` on IPv4 strings",
      "Private ranges count as public only on Windows"
    ],
    "correct": 1,
    "explanation": "ipaddress.ip_address().is_global identifies genuine globally routable public addresses while excluding RFC 1918 private and RFC 5737 test/doc blocks."
  },
  {
    "id": "q_c4_m6_033",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "What is `d41d8cd98f00b204e9800998ecf8427e`, and why was it highlighted inside Case Study C04-M06-CS2?",
    "options": [
      "The SHA-256 of Linux `sshd`",
      "An internal Microsoft signing CA hash",
      "A private RFC 5737 IP address",
      "The legacy MD5 hash of a 0-byte empty file—loading it onto an EDR quarantine blocklist broke legitimate empty placeholder files everywhere!"
    ],
    "correct": 3,
    "explanation": "Empty-file digests appear harmlessly in incident noise and match millions of legitimate 0-byte files unless screened via known-benign exclusions."
  },
  {
    "id": "q_c4_m6_034",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Inspect line 96 of `m06_security_data.py`: `md5s = set(re.findall(r'\\b[a-fA-F0-9]{32}\\b', clean)) - {h[:32] for h in sha256s}`. Why is subtracting SHA-256 32-hex prefixes defensive good practice?",
    "options": [
      "In looser extraction regexes or compound strings (`sha256_suffix`), slicing/matching subsets of a 64-hex SHA-256 string could otherwise accidentally emit bogus duplicate 32-hex MD5 entries!",
      "MD5 digests are actually encrypted halves of SHA-256 digests",
      "Because Python forbids having both SHA-256 and MD5 sets in memory",
      "It turns empty-file MD5s into empty strings"
    ],
    "correct": 0,
    "explanation": "Guaranteeing MD5 regex matches aren't substrings of already-extracted 64-hex SHA-256 digests eliminates double-counting and corrupted hashes."
  },
  {
    "id": "q_c4_m6_035",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Why do threat analysts **defang** malicious URLs (`hxxp://update-check[.]example[.]net/api`) prior to pasting them into emails or tickets?",
    "options": [
      "To compress text size by half",
      "So `urllib.request.urlopen()` runs faster",
      "To prevent mail clients, chat apps, or humans from accidentally converting indicators into clickable links or resolving DNS queries",
      "To encrypt URLs inside TLS"
    ],
    "correct": 2,
    "explanation": "Defanging disarms active hyperlinks inside documents and chat tools while keeping IOCs readable to analysts."
  },
  {
    "id": "q_c4_m6_036",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Notice line 101 of `m06_security_data.py`: `domains = {d.lower() for d in domains} - ALLOW - {e.split('@')[1] for e in emails}`. Why subtract both lower-cased `ALLOW` AND contact email domains before exporting domain blocklists?",
    "options": [
      "Lower-casing normalizes mixed case (`EXAMPLE.NET` vs `example.net`) for accurate deduplication; subtracting `ALLOW` drops benign domains (`www.example.com`) and subtracting email domains avoids accidentally sinking SOC contact domains (`example.org`) found in report footers!",
      "`ALLOW` converts all email addresses into IPv4 strings",
      "`e.split('@')[1]` extracts passwords from reports",
      "Python sets are case-insensitive unless `.lower()` removes duplicates"
    ],
    "correct": 0,
    "explanation": "Analyst reports routinely mention benign test domains and vendor/SOC email contacts; failing to normalize and subtract them triggers self-blocking!"
  },
  {
    "id": "q_c4_m6_037",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Look at Scenario `C04-M06-S3`: an external threat report extracts `40` IPs where `12` are RFC 1918 private addresses (`10.x`, `192.168.x`). What should a SOC analyst do with those `12` private IPs?",
    "options": [
      "Push all `12` directly into external firewall perimeter drop rules",
      "Convert them to `example.com` domains",
      "Keep them strictly as victim/internal-host context (checking whether internal ranges happen to coincide) rather than external infrastructure blocks",
      "Defang them using MD5"
    ],
    "correct": 2,
    "explanation": "RFC 1918 space is non-routable on the public internet and collides arbitrarily across organizations; never treat private report IPs as external blocks."
  },
  {
    "id": "q_c4_m6_038",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "In Practical C04-M06-P1 step 5, what two classic false-positive artifacts appear in `text = 'Upgraded to version 1.2.3.4; see report.pdf and example.net.'`, and how should `extract_iocs()` defeat each?",
    "options": [
      "Strip trailing sentence periods (`'.'`) before validation, apply filename extension / valid-TLD checks so `'report.pdf'` does not match domain rules, and require context/manual review since `'1.2.3.4'` syntactically parses as a valid IPv4 while meaning a software version here!",
      "Encrypt the report with HMAC before running `re.findall`",
      "`ipaddress.ip_address('1.2.3.4')` returns `False` natively",
      "`refang()` removes `.pdf` files automatically"
    ],
    "correct": 0,
    "explanation": "Regex + ipaddress validate syntax cleanly, yet distinguishing software versions (`1.2.3.4`) and document filenames (`.pdf`) still requires normalization, extension filtering, and analyst context!"
  },
  {
    "id": "q_c4_m6_039",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Why must analysts NEVER test extracted IOC URLs or domains by clicking or fetching them directly from their regular corporate workstation?",
    "options": [
      "Visiting live adversary infrastructure risks payload infection and tips off attackers that their target is investigating; use isolated sandboxes or passive lookup feeds instead",
      "`defang()` slows browser rendering",
      "Corporate DNS blocks uppercase domains",
      "`urllib` requires admin elevation on ports 80/443"
    ],
    "correct": 0,
    "explanation": "Operational safety mandates checking suspicious indicators only inside approved, isolated analysis environments (Course 10)."
  },
  {
    "id": "q_c4_m6_040",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Connecting Course 01's **Pyramid of Pain** directly to Module 6, why is an investment in Lesson 6.4 (`deque` auth behavior rules) structurally more resilient than purely harvesting hashes/IPs (`Lesson 6.5`)?",
    "options": [
      "Adversaries swap hashes (1 added byte) and VPS IPs (minutes/hours) almost free (`bottom of Pyramid`), whereas behavioral detections (spraying cadence, success-after-failures) target attacker mechanics (`TTPs`) that are costly to change!",
      "`collections.deque` takes less disk space than MD5 strings",
      "IP addresses never expire once added to firewall rules",
      "MD5 strings automatically expire after 11 seconds"
    ],
    "correct": 0,
    "explanation": "Atomic hashes and IPs decay rapidly and yield easy attacker evasion; behavioral rules increase adversary cost cleanly."
  },
  {
    "id": "q_c4_m6_041",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "What digest algorithm matches Windows `Get-FileHash` / `certutil` output verified in Lesson 6.1 on `invoice.txt`?",
    "options": [
      "`CRC32`",
      "`MD5`",
      "`SHA-256` (`8252197b04a09ca7535bd7de5f2a1f5847381815f0e7740052d1b4645e37ba6e`)",
      "`Base64`"
    ],
    "correct": 2,
    "explanation": "Streamed Python hashlib.sha256 produced the identical 64-hex SHA-256 digest observed in Course 01."
  },
  {
    "id": "q_c4_m6_042",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Threat-intelligence platforms routinely index historical malware samples by **MD5** alongside SHA-256 even though MD5 collisions exist. Why does lookup indexing remain acceptable while signing/integrity validation does NOT?",
    "options": [
      "Searching a legacy threat DB for an already-known sample's MD5 label carries minor ambiguity risk compared to accepting untrusted downloads/certificates solely on MD5 integrity where an adversary crafts intentional collision pairs!",
      "MD5 cannot execute in `hashlib.new()` cleanly",
      "MD5 digests are 64 bytes longer than SHA-256",
      "Threat feeds encrypt MD5 tags via HMAC automatically"
    ],
    "correct": 0,
    "explanation": "Legacy sample correlation uses MD5 strictly as an identifier (supplemented with SHA-256); active integrity/authenticity checks demand collision-resistant SHA-256+."
  },
  {
    "id": "q_c4_m6_043",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Which standard-library Python function computes keyed cryptographic message tags in `m06_security_data.py`?",
    "options": [
      "`hmac.new(key, msg, hashlib.sha256)`",
      "`secrets.hash(key, msg)`",
      "`hashlib.hmac(msg)`",
      "`ipaddress.sign(msg)`"
    ],
    "correct": 0,
    "explanation": "Python's hmac.new(key, msg, digestmod) generates verified keyed HMAC digests."
  },
  {
    "id": "q_c4_m6_044",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Look at `hmac.compare_digest(a, b)` when verifying hex digests across Python components. Why should callers reject inputs unless both arguments share normalized encoding and type (`str` vs `str`, or `bytes` vs `bytes`) and are validated non-empty?",
    "options": [
      "`compare_digest` treats `'abc'` and `None` as equal",
      "`compare_digest` automatically hashes strings with MD5 if one argument is empty",
      "Mixing `bytes` and `str` raises `TypeError` immediately in `compare_digest` (failing closed cleanly!), and an empty signature header must never pass unauthenticated checks or bypass HMAC verification!",
      "`bytes` arguments ignore key secrets"
    ],
    "correct": 2,
    "explanation": "Type discipline and explicit missing-signature checks guarantee verification code never skips validation silently on missing headers or encoding bugs."
  },
  {
    "id": "q_c4_m6_045",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how is the string `'2026-11-07T10:00:01Z'` converted into a Python `datetime` object?",
    "options": [
      "`time.tzset(m[1])`",
      "`int(m[1])`",
      "`datetime.fromisoformat(m[1].replace('Z', '+00:00'))`",
      "`Counter(m[1])`"
    ],
    "correct": 2,
    "explanation": "Replacing 'Z' with '+00:00' produces an explicit timezone-aware UTC datetime cleanly across Python versions."
  },
  {
    "id": "q_c4_m6_046",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "A Windows SSH log collector ingests events stamped `2026-11-07 10:00:01` (no `Z`, naive timestamp recorded in local `UTC-5`) alongside Linux cloud logs stamped `2026-11-07T15:00:05Z` (`+00:00`). What happens if the pipeline skips explicit timezone assignment and calls `fromisoformat()` blindly?",
    "options": [
      "Python shifts `UTC-5` automatically using Windows locale",
      "Both timestamps become UTC midnight",
      "`defaultdict` ignores timezone differences",
      "Subtracting a naive Windows event from an aware Linux UTC event immediately crashes with `TypeError: can't subtract offset-naive and offset-aware datetimes` (or mis-orders attacks by 5 hours if coerced wrongly!)"
    ],
    "correct": 3,
    "explanation": "Assigning known host timezone -> `.astimezone(timezone.utc)` during ingest preserves true chronological order across distributed infrastructure."
  },
  {
    "id": "q_c4_m6_047",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, what value did `fails['203.0.113.7']` and `len(users_per_ip['203.0.113.7'])` equal?",
    "options": [
      "`4` failures and `4` distinct users",
      "`2` failures and `1` user",
      "`7` failures and `3` users",
      "`1` failure and `4` users"
    ],
    "correct": 0,
    "explanation": "Synthetic logs show 203.0.113.7 failed 4 times across 4 distinct accounts (asha, ben, chen, dev) in 11s."
  },
  {
    "id": "q_c4_m6_048",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Why does `defaultdict(set)` beat `defaultdict(list)` cleanly when measuring `distinct users` targeted by an external IP during password spraying?",
    "options": [
      "Because an IP guessing `'asha'` 500 times produces `len(list) == 500` (falsely firing spray rules!), whereas `set.add()` tracks strictly unique usernames (`len(set) == 1`) separating vertical guessing from horizontal spraying!",
      "`set` preserves duplicate attempts in arrival order",
      "`defaultdict(list)` cannot store strings",
      "`Counter` requires `set` inheritance"
    ],
    "correct": 0,
    "explanation": "Counting unique targeted accounts distinguishes broad spraying across many users from single-account credential guessing."
  },
  {
    "id": "q_c4_m6_049",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In the 8-step IOC extraction order (`C04-M06-F3`), what step happens FIRST on analyst text (`hxxp://update-check[.]example[.]net/api`) before regexes extract URLs and domains?",
    "options": [
      "Encrypt with HMAC",
      "Upload to public firewall blocks",
      "**Refang** (`hxxp -> http`, `[.] -> .`) inside the isolated parser",
      "Strip all dots"
    ],
    "correct": 2,
    "explanation": "Refanging reverses visual sharing disarming temporarily inside the parser so standard IP/URL/domain regexes and validators match accurately."
  },
  {
    "id": "q_c4_m6_050",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "When upgrading `extract_iocs()` in Practical P1 to handle IPv6 (`'2001:db8::1'`) alongside IPv4, why should regex candidates NEVER be accepted purely from string colons `':'` without `ipaddress.ip_address()` validation?",
    "options": [
      "`ipaddress` deletes compressed `::` zeros automatically",
      "Colon-separated timestamps (`'10:07:20'`), MAC addresses (`'aa:bb:cc:dd:ee:ff'`), or invalid `1:2:3::4::5` multi-`::` strings look superficially similar; `ipaddress.ip_address()` rejects every invalid syntax cleanly (`ValueError`)!",
      "IPv6 strings use big-endian `struct` tuples natively",
      "Timestamps always contain `::`"
    ],
    "correct": 1,
    "explanation": "Time strings and malformed double-`::` strings fool crude regexes; ipaddress enforces strict RFC 4291 syntax cleanly."
  },
  {
    "id": "q_c4_m6_051",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Why does Course 04 advise caution before issuing automatic indefinite perimeter blocks on cloud hosting or CDN IP addresses seen in a threat report?",
    "options": [
      "Shared hosting infrastructure often serves thousands of innocent organizations concurrently, causing severe collateral downtime",
      "Cloud IPs use private RFC 1918 space",
      "CDN IPs only accept UDP datagrams",
      "Firewalls automatically defang cloud IPs"
    ],
    "correct": 0,
    "explanation": "Shared hosting/CDN endpoints require nuanced context (domain/URI specificity, confidence, time limits) rather than broad permanent IP blocks."
  },
  {
    "id": "q_c4_m6_052",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "In Orchid Payments (`Case Study C04-M06-CS2`), what operational safeguard could have caught the empty-file MD5 poison indicator BEFORE thousands of endpoints quarantined legitimate placeholder files?",
    "options": [
      "Hashing placeholder files with `MD5` instead of `SHA-256`",
      "Turning off file-integrity logging across endpoints",
      "Staging newly ingested automated threat-feed indicators first in **monitor-only (`audit/log`) mode** alongside mandatory feed validation and known-benign hash/allowlist filters prior to automated EDR quarantine!",
      "Replacing `iter()` chunking with `read_bytes()`"
    ],
    "correct": 2,
    "explanation": "Combining feed sanitization, known-benign exclusion sets, and monitor-only staging stops automated feed errors from triggering fleet-wide outages."
  },
  {
    "id": "q_c4_m6_053",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "Which standard-library Python function reads `chunk` bytes repeatedly until `b''` in `sha256_file()`?",
    "options": [
      "`zip(fh, chunk)`",
      "`enumerate(fh, 65536)`",
      "`iter(lambda: fh.read(chunk), b'')`",
      "`map(sha256, fh)`"
    ],
    "correct": 2,
    "explanation": "iter(lambda: fh.read(chunk), b'') cleanly loops chunked reads in Python."
  },
  {
    "id": "q_c4_m6_054",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Verify why incremental chunk hashing (`h.update(chunk1); h.update(chunk2)`) equals whole-buffer hashing (`hashlib.sha256(chunk1 + chunk2)`), even though chunk boundaries (`65,536` bytes vs arbitrary lengths like `10,000` bytes) differ completely.",
    "options": [
      "SHA-256 resets state at each `update()` call",
      "SHA-256 concatenates separate digests per `update()`",
      "65,536 is the only valid SHA-256 chunk size",
      "`hashlib.sha256` internally buffers incoming slices cleanly into exact 64-byte compression blocks (padding ONLY inside `.digest()` / `.hexdigest()` at stream end!), making final digest invariant to chunk boundaries!"
    ],
    "correct": 3,
    "explanation": "Internal streaming buffers ensure h.update() boundaries never alter the cryptographic state progression or final Merkle–Damgård padding."
  },
  {
    "id": "q_c4_m6_055",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "How many hexadecimal characters long is the `SHA-256` HMAC output verified in `m06_security_data.py`?",
    "options": [
      "`64` characters",
      "`32` characters",
      "`128` characters",
      "`16` characters"
    ],
    "correct": 0,
    "explanation": "256 digest bits / 4 bits per hex digit = 64 hexadecimal characters (verified: `tag length: 64`)."
  },
  {
    "id": "q_c4_m6_056",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "You want to protect stored baseline snapshots in JSON on disk (`Module 7` preview) against local attacker edits. Why must the HMAC signing key NOT reside unencrypted in the exact same host directory alongside the baseline JSON?",
    "options": [
      "Anyone with write access to tamper with the baseline JSON could equally read the colocated HMAC key, recompute a forged signature, and pass verification unnoticed!",
      "`json.load()` cannot ignore key files",
      "`hmac.new` refuses relative key paths",
      "`secrets` keys expire after 60 seconds unless moved"
    ],
    "correct": 0,
    "explanation": "Trust in HMAC depends entirely on keeping the secret key inaccessible to whoever might modify the protected data."
  },
  {
    "id": "q_c4_m6_057",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `pat = re.compile(r'^(\\S+) sshd\\[\\d+\\]: ...$')`, what role do the `^` and `$` metacharacters serve?",
    "options": [
      "Escape UTC timezone offsets",
      "Match start and end of the entire line so arbitrary injected suffixes or prefixes cannot spoof captures cleanly",
      "Count unique failed logins automatically",
      "Convert naive datetimes into integers"
    ],
    "correct": 1,
    "explanation": "Start (^) and end ($) anchors enforce full-line structural conformance rather than allowing embedded substrings anywhere inside a log entry."
  },
  {
    "id": "q_c4_m6_058",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "If `m[4]` captures `from (\\S+) port \\d+` inside an SSH parser, why is adding `ipaddress.ip_address(m[4])` validation after regex capture safer than trusting `\\S+` blindly?",
    "options": [
      "`\\S+` matches spaces inside usernames",
      "`pat.match()` fails on IPv6 unless `\\S+` is deleted",
      "`ipaddress` converts timestamps to UTC",
      "`\\S+` matches arbitrary garbage, injected ANSI sequences, DNS error text, or truncated hostnames; checking `ipaddress.ip_address()` guarantees every event entering IP-keyed correlation dicts holds a valid normalized IP address!"
    ],
    "correct": 3,
    "explanation": "Strict regex structure paired with typed constructor validation prevents malformed or injected source tokens from polluting correlation keys."
  },
  {
    "id": "q_c4_m6_059",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "What behavioral signal in `m06_security_data.py` occurred at `10:07:20` for user `chen` from `203.0.113.7`?",
    "options": [
      "Empty-file MD5 collision",
      "`SUCCESS after failures` (`Accepted password` from an IP with prior failed logins)",
      "Password change expiration",
      "DNS defanging alert"
    ],
    "correct": 1,
    "explanation": "chen logged in successfully from 203.0.113.7 minutes after that exact IP sprayed four distinct accounts."
  },
  {
    "id": "q_c4_m6_060",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "In Practical C04-M06-P2 step 3, a spray detector is instructed: `'Alert once per IP per window when distinct users >= 3'`. Without alert deduplication tracking per active IP window, what happens if an IP sprays 50 consecutive accounts (`asha`, `ben`, ..., `user50`) inside 2 minutes?",
    "options": [
      "`deque.popleft()` deletes all alerts cleanly",
      "`fromisoformat` ignores timestamps past 3 attempts",
      "Only 1 user fits inside `defaultdict(set)`",
      "The detector emits 48 redundant duplicate spray alerts for the single attack burst (`users 3..50`), drowning analyst queues in alert fatigue unless active windows suppress repeat alerts cleanly!"
    ],
    "correct": 3,
    "explanation": "Tracking last-alerted cooldown/window state per IP emits one clear high-signal alert (plus summary count updates) instead of 48 duplicate tickets."
  },
  {
    "id": "q_c4_m6_061",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the domain extractor isolate `['update-check.example.net']` while removing `'www.example.com'` and `'example.org'`?",
    "options": [
      "Deleting all `.org` and `.com` strings globally",
      "Subtracting the `ALLOW` set (`www.example.com`) and domains parsed from `emails` (`soc@example.org`)",
      "Running `sha256` on domains",
      "Calling `defang()` before regex extraction"
    ],
    "correct": 1,
    "explanation": "Set subtraction after lowercase normalization removes known allowlisted domains and report contact email domains systematically."
  },
  {
    "id": "q_c4_m6_062",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Notice in `m06_security_data.py` that `defang(value)` calls `.replace('http', 'hxxp').replace('.', '[.]')`. What messy output bug happens if someone accidentally passes a URL containing `https://` *twice* through `defang()` or forgets `.replace('https', 'hxxps')` specificity on strings holding legitimate `'httpd'` paths?",
    "options": [
      "`defang()` deletes trailing paths automatically",
      "`[. ]` breaks UTF-8 strings",
      "`defang` converts IPv4 into MD5",
      "Unconstrained substring `.replace('http', 'hxxp')` mutates `'http'` inside unrelated words like `'/api/http_check'` into `'/api/hxxp_check'` and turns `[.]` into `[[.]]` if applied twice! Anchored scheme replacement (`re.sub(r'^http', 'hxxp', ...)`) is cleaner in production!"
    ],
    "correct": 3,
    "explanation": "Understanding minimal lab helpers vs anchored production helpers catches scheme-substring corruption and double-defanging artifacts cleanly."
  },
  {
    "id": "q_c4_m6_063",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Why should threat-intelligence systems record `first_seen`, `last_seen`, and `source` alongside every stored IOC rather than just a flat list of strings?",
    "options": [
      "Dates keep MD5 digests collision-free",
      "Indicators expire over time as IPs reassign and domains expire; provenance and recency govern confidence and retirement cleanly",
      "TLP bans storing bare domains without timestamps",
      "`Counter` requires `first_seen` to increment counts"
    ],
    "correct": 1,
    "explanation": "Recording lifecycle dates and feed provenance separates fresh actionable indicators from stale reassigned infrastructure."
  },
  {
    "id": "q_c4_m6_064",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Practical C04-M06-P1 requires loading an empty-file SHA-256 alongside empty-file MD5 `d41d8cd98f00b204e9800998ecf8427e` inside `KNOWN_BENIGN_HASHES`. Why compute it cleanly with `hashlib.sha256(b'').hexdigest()` at module setup rather than trusting memory or typing a 64-hex literal by hand?",
    "options": [
      "`hashlib.sha256(b'')` runs slower than `read_bytes`",
      "JSON omits typed literals over 32 characters",
      "Empty-file SHA-256 changes across OS versions",
      "Self-computing `hashlib.sha256(b'').hexdigest()` takes microseconds, is guaranteed zero-typo accurate, and documents clearly *what* the excluded digest represents!"
    ],
    "correct": 3,
    "explanation": "Programmatic derivation prevents transcription typos on 64-character hex digests and states intent transparently."
  },
  {
    "id": "q_c4_m6_065",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "Which standard-library Python helper was added in Python `3.11+` specifically as a fast C-level stream helper alongside manual 64 KiB `iter()` loops?",
    "options": [
      "`hmac.compare_digest()`",
      "`hashlib.file_digest()`",
      "`secrets.token_bytes()`",
      "`ipaddress.ip_network()`"
    ],
    "correct": 1,
    "explanation": "Python 3.11 introduced hashlib.file_digest(fileobj, 'sha256'), complementing the universal 64 KiB iter() loop pattern."
  },
  {
    "id": "q_c4_m6_066",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Compare how a forensic investigator verifies whether a 10 GiB evidence `.dd` image was corrupted during USB transfer vs. tampered with after landing on a compromised staging server holding unverified MD5 sidecars:",
    "options": [
      "Text-mode hashing detects tampering automatically",
      "Switching from USB to Ethernet prevents MD5 collisions",
      "Re-running `chunk=1024` reverses disk edits",
      "MD5 detects USB transfer corruption cleanly; if an attacker compromised the staging server holding both `.dd` and `.md5`, SHA-256 without separate off-host or signed HMAC/signature verification still fails against deliberate replacement!"
    ],
    "correct": 3,
    "explanation": "Unkeyed hashes confirm accidental transfer fidelity ONLY if the reference hash itself is recorded in an immutable/signed external source (Chain of Custody)."
  },
  {
    "id": "q_c4_m6_067",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Why must developers avoid using Python's built-in `random` module to generate HMAC secrets or authentication tokens?",
    "options": [
      "`random` cannot return `bytes`",
      "`random` is deterministic (non-cryptographic Mersenne Twister) and outputs become predictable from observed values; use `secrets` instead",
      "`random` requires network access",
      "`random` raises `TypeError` inside `hmac.new`"
    ],
    "correct": 1,
    "explanation": "The standard random module suits simulations/tests only; security secrets and keys require cryptographically unpredictable secrets."
  },
  {
    "id": "q_c4_m6_068",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "A webhook gateway signs payloads with HMAC-SHA256 using `'secret_v1'`, and you are rotating securely to `'secret_v2'` without dropping in-flight alerts during rollout. What verification flow preserves both zero downtime and timing safety?",
    "options": [
      "Switch to `==` during transition week",
      "Disable HTTPS certificates during key rollover",
      "Compare plaintext body instead of HMAC during rollout",
      "Evaluate `hmac.compare_digest` cleanly against *both* active valid keys `[current_key, previous_key]` during the bounded rotation window (without early exits revealing which key slot failed), then retire `previous_key` on schedule!"
    ],
    "correct": 3,
    "explanation": "Dual-key grace verification using constant-time compare_digest enables zero-downtime secret rotation cleanly."
  },
  {
    "id": "q_c4_m6_069",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `pat.match(line)`, how does Python's `re.Pattern.match()` differ subtly from `re.Pattern.search()`?",
    "options": [
      "`search()` uses UTC timestamps automatically",
      "`match()` checks strictly starting at index 0 of the line (`^`), whereas `search()` scans anywhere later in the string unless anchored",
      "`match()` validates IPv4 octets",
      "Both behave identically on unanchored strings"
    ],
    "correct": 1,
    "explanation": "Pairing pattern.match() alongside explicit ^ and $ anchors enforces whole-line conformance from character 0 through end-of-line."
  },
  {
    "id": "q_c4_m6_070",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Notice line 56: `ts = datetime.fromisoformat(m[1].replace('Z', '+00:00'))`. What if a corrupted syslog line matches `^(\\S+) sshd...` where `m[1]` equals `'UNKNOWN_TIME'`? What error stops an unguarded loop, and how should clean log parsers handle it?",
    "options": [
      "Raises `TypeError` silently",
      "`replace('Z', '+00:00')` catches `ValueError` automatically",
      "`fromisoformat` treats bad strings as `datetime.now()`",
      "`datetime.fromisoformat('UNKNOWN_TIME')` raises `ValueError`! Guard parsing with `try/except ValueError:` to increment malformed/unparsed telemetry without crashing the entire log-ingest batch on one bad line!"
    ],
    "correct": 3,
    "explanation": "Isolating per-line timestamp/IP parsing failures guarantees malformed log records count cleanly instead of aborting processing of subsequent valid attacks."
  },
  {
    "id": "q_c4_m6_071",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Why should threshold and time-window parameters (such as `>= 3` users in `1` minute or `5` minutes) be reviewed carefully per environment?",
    "options": [
      "Python caps `timedelta` at 60 minutes",
      "Choosing overly tight or loose thresholds directly balances missed true intrusions (false negatives) against analyst alert fatigue (false positives)",
      "`Counter` works only under 1-minute windows",
      "Larger windows convert `deque` into `MD5`"
    ],
    "correct": 1,
    "explanation": "Detection engineering tunes thresholds iteratively against host baseline noise and attack speed tradeoffs."
  },
  {
    "id": "q_c4_m6_072",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Consider Practical C04-M06-P2 step 4: alerting on `Accepted` logins where the source IP had failures within the previous `30` minutes. Why track *per-IP* recent failure timestamps in a dictionary before outputting JSONL alerts rather than trusting a boolean `'ever_failed'` set across all log history?",
    "options": [
      "Booleans consume more RAM than dictionaries",
      "Sorted logs reject boolean membership tests",
      "Dictionaries disable JSONL printing cleanly",
      "Without a bounded 30-minute expiration window, an IP failing once 3 months ago would alert falsely on every subsequent normal login forever (`infinite persistence`)!"
    ],
    "correct": 3,
    "explanation": "Recency lookback bounds prevent benign occasional typos days or weeks earlier from triggering high-priority breach alerts much later."
  },
  {
    "id": "q_c4_m6_073",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did `extract` handle the SHA-256 string `'0f343b0931126a20f133d67c2b018a3b1e9f2b2e9d3f4a1b2c3d4e5f60718293'` inside the output summary?",
    "options": [
      "Split it into two `md5` strings",
      "Printed `sha256: 1` cleanly without double-counting either half inside `md5s`",
      "Rejected it because `'0f'` is hex",
      "Defanged it with `[.]`"
    ],
    "correct": 1,
    "explanation": "The script verified `sha256: 1 | md5: ['d41d8cd98f00b204e9800998ecf8427e']` cleanly."
  },
  {
    "id": "q_c4_m6_074",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "What RFC defines `203.0.113.0/24` (containing `'203.0.113.7'` used throughout Module 6 labs), and why does `ipaddress.ip_address('203.0.113.7').is_global` evaluate to `False`?",
    "options": [
      "RFC 1918 private enterprise LAN block",
      "RFC 791 loopback network",
      "RFC 4291 IPv6 multicast block",
      "**RFC 5737** (`TEST-NET-3`), which reserves `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24` strictly for documentation/lab examples (`is_global == False` cleanly separates them from live routable public IPs!)"
    ],
    "correct": 3,
    "explanation": "Both 198.51.100.23 and 203.0.113.7 belong to RFC 5737 documentation blocks so documentation samples never collide with real routable customer infrastructure."
  },
  {
    "id": "q_c4_m6_075",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "What sharing governance framework (covered in Lesson 6.6 and Course 14) classifies who may see and redistribute cyber threat intelligence reports?",
    "options": [
      "PEP 476",
      "Traffic Light Protocol (**TLP**)",
      "RFC 5737",
      "POSIX umask"
    ],
    "correct": 1,
    "explanation": "Traffic Light Protocol (TLP:RED/AMBER/GREEN/CLEAR) defines clear audience dissemination restrictions across threat intelligence sharing."
  },
  {
    "id": "q_c4_m6_076",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "A threat analyst runs `extract_iocs()` on a `TLP:AMBER+STRICT` incident report containing internal victim private IPs (`10.20.4.17`) alongside an external C2 domain. Why could blindly forwarding the entire JSON dump to an industry ISAC feed violate both TLP rules and operational security?",
    "options": [
      "JSONL files strip `is_global` properties",
      "External receivers cannot refang `hxxp`",
      "ISAC platforms reject IPv4 strings",
      "`TLP:AMBER+STRICT` limits sharing strictly within the victim organization (not external ISAC partners), AND exporting raw unredacted RFC 1918 victim subnets exposes confidential internal network architecture!"
    ],
    "correct": 3,
    "explanation": "Intelligence hygiene enforces sharing classifications (TLP) alongside internal context scrubbing before external collaboration."
  },
  {
    "id": "q_c4_m6_077",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how does `sha256_file()` clean up its temporary directory `tmp` before printing `4. cleaned up: True`?",
    "options": [
      "Runs `rm -rf /tmp` via `shell=True`",
      "Iterates `tmp.iterdir()`, unlinks child files, and calls `tmp.rmdir()`",
      "Leaves temporary artifacts orphaned",
      "Renames `tmp` to `.tmp`"
    ],
    "correct": 1,
    "explanation": "Explicit child unlink + tmp.rmdir() cleans deterministic temp test spaces without dangerous shell globs."
  },
  {
    "id": "q_c4_m6_078",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Compare `hmac.digest(key, msg, 'sha256')` (or `.new().digest()`) vs. `.hexdigest()`. When sending HMAC tags inside compact binary frames (`struct`), vs. JSON webhook headers (`X-Signature-256`), which encoding fits each case cleanly?",
    "options": [
      "`hexdigest()` takes 256 bytes in ASCII",
      "Always use `.hexdigest()` inside `struct` as `32s`",
      "`digest()` drops key authentication completely",
      "Binary packets use raw `32`-byte `.digest()` (`32s` in `struct`), whereas HTTP JSON headers use ASCII printable `64`-char `.hexdigest()` cleanly!"
    ],
    "correct": 3,
    "explanation": "Binary wire protocols embed 32 raw bytes cleanly without ASCII bloat, whereas text protocols/headers serialize hex safely."
  },
  {
    "id": "q_c4_m6_079",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "What syslog verdict strings does `pat` accept inside group 2 `(Failed|Accepted)` in `m06_security_data.py`?",
    "options": [
      "`Error` or `Warning`",
      "`Failed` or `Accepted`",
      "`True` or `False`",
      "`200` or `404`"
    ],
    "correct": 1,
    "explanation": "Group 2 matches strict allowlisted SSH password verdicts Failed or Accepted."
  },
  {
    "id": "q_c4_m6_080",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Examine what happens if an unauthenticated user supplies username `'bob\n2026-11-07T10:08:00Z sshd[1]: Accepted password for root from 203.0.113.7 port 9'` into an upstream SSH service logging straight to text without escaping newlines (`CRLF` injection). How does defensive downstream Python code remain protected?",
    "options": [
      "Only strip spaces using `.strip()`",
      "Use `defaultdict(int)` for timestamps",
      "Replace `splitlines()` with `read_bytes()`",
      "Upstream loggers must sanitize/escape control characters (`\\r`, `\\n`, ANSI CSI — covered further in Module 7!), while downstream parsers enforce strict field validation, anomaly checks on suspicious ports/PIDs, and never execute raw log text"
    ],
    "correct": 3,
    "explanation": "Defense-in-depth combines producer log control-character sanitization with strict schema/type validation in downstream parsers."
  },
  {
    "id": "q_c4_m6_081",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "What output did `m06_security_data.py` report for `distinct users per IP`?",
    "options": [
      "`{'203.0.113.7': 1, '198.51.100.23': 4}`",
      "`{'203.0.113.7': 4, '198.51.100.23': 1}`",
      "`{'203.0.113.7': 2, '198.51.100.23': 2}`",
      "`{}`"
    ],
    "correct": 1,
    "explanation": "203.0.113.7 targeted 4 distinct accounts (asha, ben, chen, dev); 198.51.100.23 targeted only 1 account (asha twice)."
  },
  {
    "id": "q_c4_m6_082",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "In Practical C04-M06-P2 step 5 (`Output alerts as JSON lines`), why does **JSON Lines (`NDJSON`, one JSON object per line)** vastly outperform wrapping a whole growing alert stream into one giant `[ {...}, {...} ]` JSON array file?",
    "options": [
      "Standard JSON arrays prohibit nested timestamps",
      "Single JSON arrays compress poorly in UTF-8",
      "JSONL strips quotes from strings automatically",
      "JSON Lines permits atomic line-by-line appending (`fh.write(json.dumps(alert) + '\\n')`) and streaming `for line in fh:` ingestion in $O(1)$ memory without rewriting or re-parsing an entire array bracket file!"
    ],
    "correct": 3,
    "explanation": "NDJSON / JSON Lines is append-friendly and stream-parseable cleanly line-by-line (used identically in Module 7 FIM/alert logs!)."
  },
  {
    "id": "q_c4_m6_083",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did `refang(text)` prepare `'hxxp://update-check[.]example[.]net/api'` for URL and domain regex matching?",
    "options": [
      "Encoding string into base64",
      "Replacing `'hxxp'` -> `'http'` and `'[.]'` -> `'.'`",
      "Hashing text via SHA-256",
      "Converting dots into commas"
    ],
    "correct": 1,
    "explanation": "refang reverses common sharing obfuscation tokens inside the parser prior to URL/domain matching and ipaddress validation."
  },
  {
    "id": "q_c4_m6_084",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Suppose an external threat report uses uppercase `'HXXPS://C2[.]EVIL[.]EXAMPLE/payload)'` AND ends the URL right before a closing markdown parenthesis `')'`. Why did `m06_security_data.py` use `r'https?://[^\\s)]+'` AND why would case-sensitive `replace('hxxp', 'http')` miss `'HXXPS'` unless normalized cleanly?",
    "options": [
      "IPv6 parsing handles uppercase `'HXXPS'`",
      "`https?://` converts uppercase `'HXXPS'` natively",
      "`refang` removes parentheses automatically",
      "The `[^\\s)]+` class excludes whitespace and closing parenthesis `)` cleanly, while `.replace('hxxp', ...)` IS case-sensitive unless handled with case-insensitive `re.sub(r'hxxp(s?)', r'http\\1', ..., flags=re.I)`!"
    ],
    "correct": 3,
    "explanation": "Real threat feeds use hxxp, hXXp, [dot], (.) and trailing punctuation; case-insensitive normalization + boundary stripping prevent quiet misses."
  },
  {
    "id": "q_c4_m6_085",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Why should newly imported external IOC lists run in monitor-only (alerting) mode before enforcing automated blocking rules?",
    "options": [
      "So private RFC 1918 IPs propagate publicly first",
      "To give attackers extra warning",
      "Because `SHA-256` fails during the first 24 hours",
      "To verify false-positive rate against internal benign traffic/placeholders before risking production outages"
    ],
    "correct": 3,
    "explanation": "Staging feeds in monitor-only catches empty-file hashes, CDN IPs, and vendor domains before disrupting legitimate operations."
  },
  {
    "id": "q_c4_m6_086",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Compare how **MD5** appears in two opposite places in `m06_security_data.py`: Lesson 6.1 marks MD5 unsafe for integrity, yet Lesson 6.5 still extracts `md5s`. Why does supporting MD5 extraction remain useful even after retiring MD5 from integrity checks?",
    "options": [
      "`sha256_file` requires computing MD5 first",
      "Threat reports encrypt URLs using MD5",
      "Extracting MD5 lets analysts look up historical threat intelligence bulletins that only list MD5 hashes, WITHOUT ever trusting an MD5 match as cryptographic proof of authentic non-tampered software!",
      "MD5 digests are stronger inside JSON files than disk files"
    ],
    "correct": 2,
    "explanation": "Defensive consumers must parse legacy threat-intel identifiers for triage visibility while banning weak hashes from authentication/integrity trust decisions."
  },
  {
    "id": "q_c4_m6_087",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "What happens if an empty 0-byte file is passed to `sha256_file(empty_path)`?",
    "options": [
      "Raises `ZeroDivisionError`",
      "First `fh.read(chunk)` returns `b''` matching the sentinel, exiting cleanly and returning the canonical SHA-256 digest of empty bytes `b''`",
      "Loops infinitely until interrupted",
      "Returns `None`"
    ],
    "correct": 1,
    "explanation": "iter(..., b'') handles 0-byte files cleanly on iteration 0 and emits hashlib.sha256(b'').hexdigest()."
  },
  {
    "id": "q_c4_m6_088",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Why must an HMAC signature tag (`tag = hmac.new(key, msg, hashlib.sha256).hexdigest()`) cover EVERY critical metadata header (`timestamp`, `event_id`, `tenant`) bound alongside `msg` rather than signing ONLY `payload`?",
    "options": [
      "If `timestamp` sits outside the HMAC input, an adversary can replay an old signed message and freely update the unsigned timestamp to look brand new today!",
      "`hmac.new` truncates strings longer than 64 bytes",
      "`hashlib.sha256` fails on timestamps containing colons",
      "`compare_digest` checks JSON structure independently"
    ],
    "correct": 0,
    "explanation": "Signing `f'{timestamp}.{raw_body}'` binds replay timestamp freshness cryptographically straight into the unforgeable HMAC tag."
  },
  {
    "id": "q_c4_m6_089",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In Lesson 6.3, what character inside ISO-8601 string `'2026-11-07T10:00:01Z'` denotes Coordinated Universal Time (`UTC`)?",
    "options": [
      "`T`",
      "`sshd`",
      "`01`",
      "`Z` (`Zulu` / `+00:00`)"
    ],
    "correct": 3,
    "explanation": "Trailing Z explicitly signifies UTC offset +00:00 in ISO-8601 logs."
  },
  {
    "id": "q_c4_m6_090",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Suppose an incoming syslog batch arrives out of chronological order (e.g., logs buffered from two web servers synced slightly asynchronously). Why must Practical P2 sort parsed events by UTC timestamp *before* feeding them into a `deque` sliding window?",
    "options": [
      "`deque` refuses unsorted items with `TypeError`",
      "`Counter` counts inversely unless sorted",
      "Sliding window expiration logic (`while win[0][0] < ts - window: win.popleft()`) assumes monotonically advancing timestamps; out-of-order late events would get falsely expired immediately or trigger incorrect time deltas!",
      "`fromisoformat` sorts strings automatically"
    ],
    "correct": 2,
    "explanation": "Chronological ordering ensures sliding deque expiration aligns strictly with true event timeline deltas."
  },
  {
    "id": "q_c4_m6_091",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how long did the `203.0.113.7` spray burst (`4` distinct users) take between its first (`10:00:01Z`) and fourth (`10:00:12Z`) attempt?",
    "options": [
      "`1` minute",
      "`11` seconds",
      "`7` minutes `20` seconds",
      "`6.5` minutes"
    ],
    "correct": 1,
    "explanation": "10:00:12Z - 10:00:01Z = 11 seconds (`SPRAY? 203.0.113.7: 4 users in 11s`)."
  },
  {
    "id": "q_c4_m6_092",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Look at `(times[-1] - times[0]).seconds` in line 71 of `m06_security_data.py` vs `.total_seconds()`. If someone copies `.seconds` into a `timedelta` rule checking durations greater than `1 day` (`1 day, 11 seconds`), what subtle Python bug strikes?",
    "options": [
      "`timedelta.seconds` drops full `days` cleanly (returning `11` instead of `86411`!), whereas `.total_seconds()` accounts for the complete `timedelta` span across days accurately!",
      "`.seconds` throws `AttributeError` past 60s",
      "`.total_seconds()` returns strings instead of numbers",
      "`timedelta` cannot store values above 24 hours"
    ],
    "correct": 0,
    "explanation": "Using timedelta.total_seconds() prevents multi-day rollover truncation bugs silently introduced by timedelta.seconds!"
  },
  {
    "id": "q_c4_m6_093",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Which standard-library Python function validates candidate IPv4 and IPv6 strings cleanly inside `extract_iocs()`?",
    "options": [
      "`hashlib.sha256(cand)`",
      "`socket.inet_ntoa(cand)`",
      "`re.fullmatch(r'\\d+', cand)`",
      "`ipaddress.ip_address(cand)`"
    ],
    "correct": 3,
    "explanation": "ipaddress.ip_address parses both valid IPv4 and IPv6 addresses and exposes .is_global, .is_private, and canonical compressed formatting."
  },
  {
    "id": "q_c4_m6_094",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "When extracting URLs from unstructured prose (`'See http://bad.example/api.'`), what artifact remains at the end of `'http://bad.example/api.'` unless explicitly trimmed before deduplication?",
    "options": [
      "Defanging strips `.net` automatically",
      "`urlparse` removes periods from hostnames automatically",
      "A trailing sentence period `'.'`, causing identical URLs ending sentences and mid-sentence URLs to look like two distinct entries unless trailing punctuation (`'.,;:'`) is stripped cleanly!",
      "JSON fails to serialize URLs containing slashes"
    ],
    "correct": 2,
    "explanation": "Prose punctuation (`example.net.`, `'http://x/a,'`) clings to greedy regexes unless trimmed cleanly during normalization (Stage 4 of F3!)."
  },
  {
    "id": "q_c4_m6_095",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "When validating files in `C04-M06-P1`, why should domain-extraction exclude file extensions such as `.pdf` or `.docx` (e.g., `'report.pdf'`)?",
    "options": [
      "DNS resolves `.pdf` files automatically",
      "Because plain filename strings like `'report.pdf'` syntactically match `[a-z0-9-]+\\.[a-z]{2,}` domain regexes cleanly despite not being network domains!",
      "`ipaddress` rejects `.pdf` strings natively",
      "`ALLOW` lists block `.exe` downloads automatically"
    ],
    "correct": 1,
    "explanation": "Checking against common non-TLD document extensions or ICANN TLD allowlists prevents false domain detections on ordinary file attachments."
  },
  {
    "id": "q_c4_m6_096",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In `m06_security_data.py`, `invoice.txt` originally read `b'Invoice 1042: pay INR 25,000 to account 1234\\n'`. Suppose someone writes a test comparing the digest on Windows (`CRLF` if generated via Notepad `\\r\\n`) against Unix (`LF` `\\n`). Why will SHA-256 differ completely across identical visible numbers?",
    "options": [
      "Hashing hashes raw bytes (`0x0d 0x0a` vs `0x0a`): even a single extra `\\r` byte triggers full SHA-256 avalanche output divergence—matching cross-platform tools ONLY when exact binary bytes match!",
      "`hashlib` encrypts CRLF differently on Windows",
      "`Get-FileHash` normalizes line endings before SHA-256",
      "Account numbers alter endianness on Linux"
    ],
    "correct": 0,
    "explanation": "Every byte including line-ending conventions participates in cryptographic hashes; unexpected mismatches frequently trace back to CRLF vs LF differences."
  },
  {
    "id": "q_c4_m6_097",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Which combination properly verifies an incoming webhook payload digest in Python?",
    "options": [
      "`sha256_file` without any secret key",
      "`hashlib.md5(raw_body).hexdigest()` checked with `==`",
      "`random.seed(raw_body)` checked with `!=`",
      "`hmac.new(secret_key, raw_body, hashlib.sha256).hexdigest()` verified via `hmac.compare_digest()`"
    ],
    "correct": 3,
    "explanation": "Secret-keyed HMAC-SHA256 computed on exact raw bytes + constant-time hmac.compare_digest() delivers full authenticity and side-channel safety."
  },
  {
    "id": "q_c4_m6_098",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Why does combining horizontal spraying detection (`distinct users >= 3`) + vertical guessing volume + `SUCCESS after failures` correlation provide stronger SOC coverage than tuning only one generic `'failed logins > 10'` counter?",
    "options": [
      "`Counter` stops counting after 10 items cleanly",
      "Three rules decrease CPU memory dynamically",
      "Smart attackers deliberately keep per-account failures low (1–2 tries per user across 50 accounts = spraying) specifically to evade naive `'failed > 10'` per-user thresholds, while `SUCCESS after failures` pins active compromise directly!",
      "IPv4 addresses rotate every 10 failures"
    ],
    "correct": 2,
    "explanation": "Multi-dimensional behavioral correlation detects low-and-slow spraying and compromised accounts that simple total failure caps miss completely."
  },
  {
    "id": "q_c4_m6_099",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In `extract_iocs()`, what happens when mixed-case indicator `'UPDATE-CHECK.EXAMPLE.NET'` arrives alongside `'update-check.example.net'`?",
    "options": [
      "`set` treats `'A'` and `'a'` identically by default",
      "Normalizing domains to `.lower()` during Stage 4 ensures set deduplication merges both into one canonical lowercase entry cleanly",
      "`refang` converts lowercase domains into uppercase",
      "Both trigger `ValueError` in `ipaddress`"
    ],
    "correct": 1,
    "explanation": "DNS hostnames are case-insensitive, so .lower() normalization prevents duplicate entries and guarantees accurate allow-list matching."
  },
  {
    "id": "q_c4_m6_100",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Synthesizing Module 6 end-to-end: A threat feed alerts on SHA-256 hashes, HMAC-signed webhook payloads stream UTC sshd logs (`+00:00`), and IOC extractors filter RFC 5737 / private IPs and `d41d8cd9...`. Which design weakness remains if analysts still block shared CDN IPs indefinitely with no `first_seen`/`last_seen` expiry?",
    "options": [
      "Stale atomic IOCs decay rapidly and shared cloud proxies host benign tenants simultaneously—causing growing self-inflicted outages while behavioral rules remain vital to catch rotating attackers!",
      "HMAC keys stop working after `first_seen`",
      "`SHA-256` collides across CDN nodes after 24 hours",
      "`deque` sliding windows drop `last_seen` timestamps"
    ],
    "correct": 0,
    "explanation": "Responsible security engineering respects indicator lifespan, context, and behavioral depth rather than relying blindly on permanent static blocks."
  },
  {
    "id": "q_c4_m6_101",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "Why does `m06_security_data.py` compute SHA-256 of `invoice.txt` using `'rb'` mode inside `path.open('rb')`?",
    "options": [
      "`'r'` mode reads chunks backward",
      "`rb` mode compresses text strings by 50%",
      "`sha256` refuses plain text paths",
      "Binary reading avoids decoding errors and OS newline mutation across platforms"
    ],
    "correct": 3,
    "explanation": "Hashing exact raw disk bytes preserves deterministic digests identical to external forensic tools."
  },
  {
    "id": "q_c4_m6_102",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In `hashlib.md5(f.read_bytes()).hexdigest()`, why did Module 6's text immediately warn `'not unsuitable everywhere, MUST NOT protect integrity against adversaries'`? Identify one safe legacy use vs. one broken use:",
    "options": [
      "Safe: signing TLS certificates cleanly; Broken: lookup indexing",
      "Safe: hashing admin passwords; Broken: checking log lengths",
      "Safe: indexing historical malware records in TI databases where SHA-256 also tracks identity; Broken: verifying software updates, CAs, or evidence files where an adversary could generate colliding binaries!",
      "Safe: webhook signatures; Broken: empty files"
    ],
    "correct": 2,
    "explanation": "Historical malware matching tolerates MD5 as a search key; any adversarial authenticity or tamper-detection guarantee demands collision resistance."
  },
  {
    "id": "q_c4_m6_103",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Which standard-library Python function computes constant-time equality across hexadecimal HMAC digests?",
    "options": [
      "`secrets.compare_hashes(a, b)`",
      "`hmac.compare_digest(a, b)`",
      "`hashlib.equals(a, b)`",
      "`str.__eq__(a, b)`"
    ],
    "correct": 1,
    "explanation": "hmac.compare_digest prevents timing leakage during secret/MAC checks."
  },
  {
    "id": "q_c4_m6_104",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "A script converts an expected HMAC digest cleanly into lowercase hex (`tag`) while an incoming client webhook sends uppercase hex (`HEADER.upper()`). What happens if `hmac.compare_digest(tag, incoming)` runs directly before normalizing case?",
    "options": [
      "ASCII byte verification treats `'a'` vs `'A'` as distinct bytes, failing valid signatures unpredictably (`False`)—normalize hex case/encoding cleanly BEFORE calling `compare_digest`!",
      "`compare_digest` normalizes hex case automatically",
      "`compare_digest` raises `SyntaxError` on uppercase strings",
      "SHA-256 outputs uppercase by default"
    ],
    "correct": 0,
    "explanation": "compare_digest operates identically on exact byte/Unicode values; decode or normalize case consistently (and validate hex characters) first."
  },
  {
    "id": "q_c4_m6_105",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "Which Python regex flag or construct is used inside `pat = re.compile(...)` to match SSH `Failed` and `Accepted` events strictly against entire syslog lines?",
    "options": [
      "`eval()` on timestamps",
      "`re.MULTILINE` without anchors",
      "`str.find('password')`",
      "Leading `^` and trailing `$` anchors wrapping explicit syslog structure tokens"
    ],
    "correct": 3,
    "explanation": "Full-line anchoring rejects lines containing arbitrary embedded fake strings inside extra tokens."
  },
  {
    "id": "q_c4_m6_106",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Suppose an attacker creates Linux user account `'chen from 10.0.0.1'` containing spaces on a misconfigured system. Look at group 3 `for (\\S+) from (\\S+)` in `pat`. What protects the parser cleanly from mis-extracting `'10.0.0.1'` into `ip`?",
    "options": [
      "Group 3 `\\S+` matches spaces automatically",
      "`pat.match` trims spaces before comparing",
      "`\\S+` refuses spaces, so the extra space inside `'chen from ...'` fails `pat.match(line)` completely, routing that line cleanly to the `unmatched_lines` audit anomaly metric instead of poisoning parsed tuples!",
      "Regex ignores `'from'` keywords dynamically"
    ],
    "correct": 2,
    "explanation": "Strict token boundaries (`\\S+`) reject malformed or unexpected whitespace rather than silently misassigning capture fields!"
  },
  {
    "id": "q_c4_m6_107",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the failure tally report counts per source IP (`203.0.113.7` vs `198.51.100.23`)?",
    "options": [
      "`{'203.0.113.7': 2, '198.51.100.23': 4}`",
      "`{'203.0.113.7': 4, '198.51.100.23': 2}`",
      "`{'203.0.113.7': 7}`",
      "`{'198.51.100.23': 1}`"
    ],
    "correct": 1,
    "explanation": "Counter output printed `2. failures per IP: {'203.0.113.7': 4, '198.51.100.23': 2}`."
  },
  {
    "id": "q_c4_m6_108",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Contrast `timedelta(minutes=1)` (`demo`) against `Practical C04-M06-P2`'s sliding `5-minute` failure window and `30-minute` post-failure success lookback. Suppose an automated sprayer pauses intentionally `90` seconds between guesses (`10:00Z, 10:01:30Z, 10:03:00Z`). How do the two configs respond?",
    "options": [
      "The narrow 1-minute window misses the slow `90s`-paced spray (each failure only shares at most 1 neighbor inside 60s), whereas P2's 5-minute sliding window captures all 3 distinct users cleanly inside 3 minutes (`180s <= 300s`)!",
      "Both trigger SPRAY alerts identically",
      "5-minute windows reject slow attempts over 60 seconds",
      "`deque` only retains items inside 10 seconds"
    ],
    "correct": 0,
    "explanation": "Extending time windows catches intentionally throttled low-and-slow credential sprays, balanced carefully against false positives."
  },
  {
    "id": "q_c4_m6_109",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "What happened to the malformed candidate `'999.10.1.1'` during `m06_security_data.py` IOC validation?",
    "options": [
      "Passed into `urls`",
      "Converted to `255.10.1.1`",
      "Printed under `public:`",
      "Rejected cleanly (`ValueError`) by `ipaddress.ip_address()`"
    ],
    "correct": 3,
    "explanation": "Octet 999 exceeds 255, so stdlib ipaddress validation drops typos before downstream reporting."
  },
  {
    "id": "q_c4_m6_110",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Examine `ipaddress.ip_address('2001:db8::1').is_global` (`Practical C04-M06-P1` IPv6 test sample!). Just like `203.0.113.7` in RFC 5737, why is `'2001:db8::/32'` special for security pipelines?",
    "options": [
      "It is Linux loopback IPv6",
      "Python's `ipaddress` does not recognize `::` compression",
      "`2001:db8::/32` is reserved under RFC 3849 strictly for IPv6 documentation examples, meaning `.is_global` flags it `False` rather than falsely exporting doc examples as external attacker targets!",
      "It matches every MAC address"
    ],
    "correct": 2,
    "explanation": "Validating syntax cleanly while distinguishing documentation/private/reserved blocks via .is_global prevents shipping lab ranges to live firewalls."
  },
  {
    "id": "q_c4_m6_111",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Which standard-library Python tool helps keep IOC lists free of duplicate repeated addresses automatically?",
    "options": [
      "`Counter`",
      "`set`",
      "`hmac`",
      "`shutil`"
    ],
    "correct": 1,
    "explanation": "Sets deduplicate candidate IOC strings cleanly before sorted serialization."
  },
  {
    "id": "q_c4_m6_112",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "A junior engineer strips out *all* `domains` extraction because `'attackers change domains constantly—only behavioral auth logs matter'`. Why is removing atomic IOC enrichment completely ALSO flawed compared to pairing BOTH (`Lesson 6.6`)?",
    "options": [
      "Behavioral detection alerts on unknown activity (`TTP`), while validated fresh IOCs accelerate rapid automated triage, historical pivot hunting (`who else clicked that C2 URL?`), and short-lived automated containment—both work synergistically!",
      "`Counter` breaks without domains",
      "Domains occupy top apex on Pyramid of Pain",
      "SHA-256 digests expire faster than behavioral timeouts"
    ],
    "correct": 0,
    "explanation": "Behavioral detections catch active techniques robustly; high-confidence fresh IOCs support fast scoping, retro-hunting, and layered tactical blocking."
  },
  {
    "id": "q_c4_m6_113",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "Using `sha256_file(path)`, what value did the unchanged Course 01 invoice text (`pay INR 25,000`) start with?",
    "options": [
      "`a1387dd9...`",
      "`d56abccd...`",
      "`d41d8cd9...`",
      "`8252197b...`"
    ],
    "correct": 3,
    "explanation": "Verified stdout recorded SHA-256 `8252197b04a09ca7535bd7de5f2a1f5847381815f0e7740052d1b4645e37ba6e` (MD5 `a1387dd9...`)."
  },
  {
    "id": "q_c4_m6_114",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Why does `chunk = 65536` (`64 KiB`) perform fast in `sha256_file()` compared to choosing `chunk = 1` (reading 1 byte per OS `read()` syscall)?",
    "options": [
      "SHA-256 produces wrong hashes when fed 1 byte at a time",
      "65,536 bytes turns off OS page caching",
      "Reading `1` byte at a time forces billions of expensive user-to-kernel OS syscall context switches on gigabyte files, whereas `64 KiB` amortizes OS read overhead into minimal memory buffers cleanly!",
      "`iter()` drops odd-numbered byte reads"
    ],
    "correct": 2,
    "explanation": "Moderate chunking (64 KiB–1 MiB) hits the engineering sweet spot between tiny O(1) RAM and fast sequential kernel I/O throughput."
  },
  {
    "id": "q_c4_m6_115",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Why are plaintext secret tokens or keys NEVER hardcoded cleanly alongside verification scripts checked into repositories?",
    "options": [
      "`hmac.new()` refuses literal strings",
      "Anyone with repository read access steals the HMAC secret and can forge valid signed alerts indefinitely",
      "Git overwrites 32-byte tokens with SHA-1",
      "`secrets` blocks reading files under `.git`"
    ],
    "correct": 1,
    "explanation": "Anyone possessing an HMAC key shares full signing ability; protect keys strictly outside code repositories in secret stores or env injection."
  },
  {
    "id": "q_c4_m6_116",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Suppose an engineer calls `hmac.new(key, msg, hashlib.md5)` for webhook authentication `'just to save CPU cycles'`. While HMAC strengthens MD5 against standard collision attacks, why does cybersecurity policy still standardize on **`HMAC-SHA256`** cleanly?",
    "options": [
      "Standardizing uniformly on SHA-256 (`256-bit` key/output size, modern compliance baselines, FIPS/NIST readiness, negligible modern CPU penalty) eliminates weak-primitive exceptions and review rejections cleanly!",
      "MD5 tags take 256 characters",
      "Python deleted `hmac` MD5 support in 3.10",
      "`compare_digest()` rejects 32-char MD5 strings"
    ],
    "correct": 0,
    "explanation": "Zero reason exists to deploy legacy MD5 in newly engineered HMAC designs when HMAC-SHA256 executes at hardware gigabytes/sec."
  },
  {
    "id": "q_c4_m6_117",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how were unmatched syslog lines prevented from crashing the extraction loop?",
    "options": [
      "`events.append()` catches syntax errors automatically",
      "`pat` rewrites non-matching lines dynamically",
      "Regex converts mismatched dates into HTTP `404`",
      "`if m:` skips formatting mismatches cleanly cleanly (though production parsers should also count unmatched anomalies)"
    ],
    "correct": 3,
    "explanation": "Checking `if m:` protects against AttributeError on m[1]; adding an `else: unmatched += 1` metric ensures silent schema drops never go unnoticed."
  },
  {
    "id": "q_c4_m6_118",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Look at `fromisoformat(m[1].replace('Z', '+00:00'))`. Why is keeping `ts.tzinfo` explicitly checked (`assert ts.tzinfo is not None`) a helpful defensive assertion in multi-source SIEM ingestion pipelines?",
    "options": [
      "It sorts strings backwards automatically",
      "It converts local EST time into Linux PID numbers",
      "It guarantees fail-fast rejection if a second regex rule forgets `+00:00`, preventing subtle mixed naive/aware crashes minutes later during cross-source sliding-window sorting!",
      "`tzinfo` replaces HMAC signatures"
    ],
    "correct": 2,
    "explanation": "Enforcing tz-awareness at parse boundary eliminates runtime TypeError bombs inside later multi-feed correlation stages."
  },
  {
    "id": "q_c4_m6_119",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Which rule checks for `'1 IP failing across >= 3 distinct accounts within 1 minute'`?",
    "options": [
      "Empty-file exclusion rule",
      "Horizontal password spraying rule",
      "Defanging validation rule",
      "Chunked SHA-256 rule"
    ],
    "correct": 1,
    "explanation": "Targeting multiple distinct usernames rapidly from one origin characterizes password spraying."
  },
  {
    "id": "q_c4_m6_120",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Why could relying solely on `if result == 'Accepted' and ip in users_per_ip:` trigger noise over a busy week of logs if `users_per_ip` never forgets months-old failures (`Scenario vs Practical P2`)?",
    "options": [
      "Every normal employee mistyping once on Monday would cause their Friday legitimate login from home to raise a high-severity `SUCCESS after failures` page—unless scoped via P2's bounded **30-minute recent-failure window** (`and` failure threshold)! ",
      "`users_per_ip` automatically drops items past 24 hours",
      "`Accepted` entries overwrite `Counter` dictionaries",
      "`ip in users_per_ip` performs `O(N^2)` regex checks"
    ],
    "correct": 0,
    "explanation": "Bounding failure history to a relevant recent window (e.g., 30 minutes or >= threshold failures) keeps success-after-failure signals ultra-high precision."
  },
  {
    "id": "q_c4_m6_121",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Which extracted URL appeared in `m06_security_data.py` after refanging `hxxp://update-check[.]example[.]net/api`?",
    "options": [
      "`ftp://203.0.113.7`",
      "`https://www.example.com`",
      "`http://soc.example.org`",
      "`http://update-check.example.net/api`"
    ],
    "correct": 3,
    "explanation": "Section 3 outputs `URLs: ['http://update-check.example.net/api']` cleanly before re-defanging it for sharing."
  },
  {
    "id": "q_c4_m6_122",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Why did `m06_security_data.py` extract `'domains: ['update-check.example.net']'` *after* refanging URLs/text, rather than extracting domains *before* calling `refang()`?",
    "options": [
      "Regex flags (`re.I`) crash on square brackets inside input strings",
      "`defang()` removes hyphens automatically",
      "Because `[.]` brackets inside `'update-check[.]example[.]net'` break normal domain character regexes `[a-z0-9-]+\\.[a-z]{2,}` until `refang()` restores canonical dots first!",
      "`ALLOW` only supports strings containing `'hxxp'`"
    ],
    "correct": 2,
    "explanation": "Refanging first ensures obfuscated `[.]` and `hxxp` forms collapse into unified standard shapes processed once cleanly by downstream extractors."
  },
  {
    "id": "q_c4_m6_123",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Before pasting extracted IOC domains or URLs into a company incident report or chat channel, which helper step from `C04-M06-F3` should execute last?",
    "options": [
      "Run `urllib.request.urlopen()` on every extracted domain from your laptop",
      "**Defang** (`defang()` converting `http` -> `hxxp`, `.` -> `[.]`) so copy-paste readers cannot trigger accidental links",
      "Delete all timestamps",
      "Upload raw internal RFC 1918 IPs publicly"
    ],
    "correct": 1,
    "explanation": "Re-defanging human-readable reports prevents accidental link navigation in chat clients, browsers, and ticketing UIs."
  },
  {
    "id": "q_c4_m6_124",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Inspect why Course 04 stresses `'Never \"test\" an IOC URL by visiting it directly from an ordinary workstation'`. Even issuing a quiet automated `urllib.request.urlopen(url)` check from your corporate laptop carries two severe downsides:",
    "options": [
      "(1) Fetching directly risks zero-day exploit/payload exposure on unisolated corporate machines AND (2) egress logs/attacker HTTP analytics tip off the threat actor via corporate IP reconnaissance (`OPSEC leak`)!",
      "`urlopen` converts `defang` outputs silently",
      "Workstation Python lacks `hashlib` support",
      "`timeout=5` drops HTTP headers on C2 endpoints"
    ],
    "correct": 0,
    "explanation": "Active probing exposes analyst workstations and leaks organizational awareness directly to adversary C2 logs—always isolate inside approved sandboxes."
  },
  {
    "id": "q_c4_m6_125",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "What digest family do `sha256` and `sha512` belong to in Python's `hashlib`?",
    "options": [
      "`CRC`",
      "`MD5`",
      "`SHA-1`",
      "`SHA-2`"
    ],
    "correct": 3,
    "explanation": "SHA-256 and SHA-512 are members of the modern SHA-2 cryptographic hash family."
  },
  {
    "id": "q_c4_m6_126",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "How does SHA-256 compare against HMAC-SHA256 when distributing an incident forensics zip file cleanly via email vs. an automated API upload?",
    "options": [
      "HMAC encrypts the ZIP contents cleanly without passwords",
      "Plain SHA-256 prevents arbitrary edits automatically over cleartext HTTP",
      "Emailing ZIP + plain SHA-256 in same unencrypted message lets a MITM swap BOTH cleanly, whereas sharing trusted SHA-256 over a **separate authenticated channel** OR signing with an **HMAC secret / digital signature** prevents undetected forgery!",
      "Chunk size 65,536 prevents file tampering"
    ],
    "correct": 2,
    "explanation": "Integrity verification requires trusting the reference hash independently—either via out-of-band verification or secret-keyed HMAC/PKI signatures."
  },
  {
    "id": "q_c4_m6_127",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Why does `hmac.new(key, msg, hashlib.sha256).hexdigest()` print `False` in `m06_security_data.py` when `203` changes to `198`?",
    "options": [
      "`198` is an RFC 5737 invalid digit",
      "Modifying any signed message byte alters the cryptographic HMAC completely, failing `hmac.compare_digest` verification",
      "`compare_digest` ignores odd bytes",
      "`secrets` rotates keys between lines"
    ],
    "correct": 1,
    "explanation": "Tampering any single byte of payload breaks tag agreement without the secret key."
  },
  {
    "id": "q_c4_m6_128",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Explain why symmetric `HMAC` proves **authentication + integrity** between two shared-key systems, yet **does NOT** provide cryptographic *non-repudiation* against a third party:",
    "options": [
      "Since BOTH sender and verifier hold the identical shared HMAC secret key, either party could mathematically create a valid tag—true non-repudiation requires asymmetric private-key signatures (`Course 15`)!",
      "Because SHA-256 outputs only 32 characters",
      "`hmac.compare_digest` reverses secret keys",
      "`secrets.token_bytes(32)` expires after verification"
    ],
    "correct": 0,
    "explanation": "Symmetric shared secrets cannot arbitrate disputes between key holders; asymmetric PKI signatures isolate signing ability exclusively to the sender's private key."
  },
  {
    "id": "q_c4_m6_129",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how many failed events vs. accepted events exist across the `LOG` sample (`lines 43–49`)?",
    "options": [
      "`2` Failed and `2` Accepted",
      "`4` Failed and `3` Accepted",
      "`7` Failed and `0` Accepted",
      "`6` Failed (`4` from `203.0.113.7`, `2` from `198.51.100.23`) and `1` Accepted (`chen` from `203.0.113.7`)"
    ],
    "correct": 3,
    "explanation": "Six Failed password attempts plus one Accepted password login total 7 parsed log lines."
  },
  {
    "id": "q_c4_m6_130",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Suppose an SSH log line arrives: `'2026-11-07T10:00:01Z sshd[1]: Failed password for invalid user guest from 203.0.113.7 port 50005'`. Look at `pat` in `m06_security_data.py`. What happens on that line, and what lesson does it enforce?",
    "options": [
      "Regex matches `'invalid user guest'` inside `(\\S+)` seamlessly",
      "`pat` captures `'invalid'` as the username cleanly",
      "Because `'invalid user guest'` contains spaces where `pat` expected a single `(\\S+)` token, `pat.match()` returns `None`! Counting unmatched lines surfaces such valid-but-unhandled syslog variants immediately instead of dropping brute-force attacks silently!",
      "`datetime.fromisoformat` strips `'invalid user'`"
    ],
    "correct": 2,
    "explanation": "OpenSSH logs `Failed password for invalid user <name>` for non-existent users! Unmatched-line monitoring catches real-world regex coverage gaps immediately!"
  },
  {
    "id": "q_c4_m6_131",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "What happened over the 6.5-minute span for `198.51.100.23` targeting `'asha'` in `m06_security_data.py`?",
    "options": [
      "`4` failures across `4` users",
      "`2` failures against `1` distinct user—staying below the spray threshold yet modeling low-volume guessing trends",
      "`SUCCESS after failures` triggered immediately",
      "Zero events matched regex"
    ],
    "correct": 1,
    "explanation": "Vertical repeat attempts against one account contrast cleanly against multi-user horizontal spraying."
  },
  {
    "id": "q_c4_m6_132",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Suppose two accounts target the exact same host: IP A sprays `15` users in 2 minutes with `0` successes, while IP B fails `4` users in 30 seconds and scores `1 Accepted` login on `chen`. If an overworked SOC only has time to inspect 1 incident immediately, why does IP B's `SUCCESS after failures` win?",
    "options": [
      "IP A shows failed automated reconnaissance (`attempted impact`), whereas IP B demonstrates a **successful authenticated compromise indicator** (`active breach risk`) demanding immediate session/credential containment!",
      "`Counter` prints higher numbers for `Accepted`",
      "IP A cannot be blocked because of RFC 5737",
      "`deque` deletes alerts without `Accepted`"
    ],
    "correct": 0,
    "explanation": "Risk triage prioritizes confirmed post-failure authentication success over noisy blocked failed attempts."
  },
  {
    "id": "q_c4_m6_133",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the extractor isolate `emails: ['soc@example.org']` separately from threat domains?",
    "options": [
      "Replaced `@` with `[.]`",
      "Deleted all words containing `@`",
      "Hashed `soc@example.org` into MD5",
      "Matched emails via regex and subtracted `{e.split('@')[1] for e in emails}` from `domains` so contact domains aren't misclassified as attacker C2 domains"
    ],
    "correct": 3,
    "explanation": "Subtracting email domains keeps SOC and vendor support domains from triggering false domain alerts."
  },
  {
    "id": "q_c4_m6_134",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Look at regex `r'\\b[a-fA-F0-9]{64}\\b'` vs `r'\\b[a-fA-F0-9]{32}\\b'` in `m06_security_data.py`. What subtle false positive matches `{32}` or `{64}` regexes cleanly unless excluded or context-filtered?",
    "options": [
      "`refang` creates 32-hex URLs",
      "IPv4 addresses match 64-hex patterns",
      "32-hex uppercase/lowercase UUID strings (without hyphens) or random CI git commit SHA-1/nonce strings (`32` or `64` hex digits that also happen to match `[a-f0-9]{32}`) unless deduplicated or contextualized cleanly!",
      "`hmac.compare_digest` strips hex strings"
    ],
    "correct": 2,
    "explanation": "Pure hex strings frequently represent trace IDs, correlation UUIDs, or non-malware nonces—feed verification and empty-hash exclusions add needed precision."
  },
  {
    "id": "q_c4_m6_135",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Why do security logs and threat intelligence sharing guides recommend tracking **indicator expiration** (`TTL` / retirement window)?",
    "options": [
      "Because Python `set` objects overflow past 100 strings",
      "Because threat actors discard IPs quickly and innocent new owners inherit reassigned cloud IP addresses over time",
      "Because SHA-256 digests change values monthly",
      "Because `datetime` refuses years above 2026"
    ],
    "correct": 1,
    "explanation": "Retiring stale atomic IPs/domains preserves signal quality and prevents blocking newly innocent cloud tenants."
  },
  {
    "id": "q_c4_m6_136",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "An external threat feed gives you an IOC hash (`d41d8cd98f00b204e9800998ecf8427e`), IP (`10.20.4.17`), and domain (`www.example.com`). Which combination of Module 6 gates stops EVERY SINGLE ONE of these three items before harming production?",
    "options": [
      "Known-benign hash exclusion (stops empty-file MD5 `d41d8cd9...`), `ipaddress.is_global` filtering (stops private RFC 1918 `10.20.4.17`), and normalized `ALLOW` allow-listing (stops benign `www.example.com`)!",
      "`SHA-256` chunking only",
      "Converting UTC to local naive timestamps",
      "Replacing `hmac.compare_digest` with `==`"
    ],
    "correct": 0,
    "explanation": "Layered IOC filtering—benign hash exclusion, routable-global checks, and normalized allow-lists—defends production systems systematically."
  },
  {
    "id": "q_c4_m6_137",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "medium",
    "q": "Which standard-library Python module hosts `sha256()`, `sha512()`, `sha3_256()`, and legacy `md5()`?",
    "options": [
      "`struct`",
      "`collections`",
      "`secrets`",
      "`hashlib`"
    ],
    "correct": 3,
    "explanation": "hashlib provides secure cryptographic hash and XOF implementations in Python's standard library."
  },
  {
    "id": "q_c4_m6_138",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Compare two integrity checks on a software installer: checking `.sha256` downloaded over `http://` right next to the installer vs. verifying a GPG signature / authenticated `https://` release manifest (`Course 04 + Course 15`). Why does unauthenticated HTTP digest verification fail?",
    "options": [
      "`http://` changes SHA-256 to MD5 on proxies",
      "Windows `certutil` refuses `http://` hashes",
      "An active adversary along the `http://` link swaps BOTH the installer binary AND the `.sha256` file so both still match perfectly after tampering!",
      "`64 KiB` chunks fail across `http://`"
    ],
    "correct": 2,
    "explanation": "Plain hash integrity is only meaningful if the reference digest arrives over a separate authenticated/signed channel."
  },
  {
    "id": "q_c4_m6_139",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "How many random bytes (`bits`) does `secrets.token_bytes(32)` generate for the HMAC key in `m06_security_data.py`?",
    "options": [
      "`16` bytes (`64` bits)",
      "`32` bytes (`256` bits)",
      "`64` bytes (`512` bytes)",
      "`8` bytes (`32` bits)"
    ],
    "correct": 1,
    "explanation": "32 bytes x 8 bits/byte = 256-bit secret key matching SHA-256 security margins."
  },
  {
    "id": "q_c4_m6_140",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Review why `m06_security_data.py` computes `hmac.new(key, msg, hashlib.sha256)` using raw `bytes` literals (`b'{\"alert\":...}'`) cleanly instead of ambiguous strings. What happens if `hmac.new()` receives an unencoded `str` directly in Python 3?",
    "options": [
      "Python raises `TypeError` immediately (`bytes or bytearray expected`), forcing callers to encode deterministically (`utf-8`) before computing cryptographic signatures!",
      "It encodes strings silently as UTF-16LE",
      "It strips whitespace automatically",
      "It falls back to MD5 quietly"
    ],
    "correct": 0,
    "explanation": "Cryptographic primitives in hashlib and hmac enforce strict bytes discipline, preventing silent encoding ambiguity across systems."
  },
  {
    "id": "q_c4_m6_141",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "What benefits arise from compiling syslog regexes once outside the line loop (`pat = re.compile(...)`) vs. recompiling inside `for line in ...`?",
    "options": [
      "`re.compile` converts strings into `deque`",
      "Regex compilation automatically creates UTC `tzinfo`",
      "Compiling outside disables anchored `^` checks",
      "Clarity and reuse of compiled automata across millions of log lines cleanly"
    ],
    "correct": 3,
    "explanation": "Pre-compiling regexes once communicates intent cleanly and improves loop readability/reuse on high-volume logs."
  },
  {
    "id": "q_c4_m6_142",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "A SIEM collects logs from endpoints that do NOT include explicit `'Z'` or offset metadata—printing local timestamps during Daylight Saving Time (`DST`) clock fallback (`01:30 AM` twice in one night!). Why does UTC logging + aware `datetime` cure DST confusion completely?",
    "options": [
      "UTC compresses dates to save disk bytes",
      "`fromisoformat` ignores 01:00–02:00 AM natively",
      "Coordinated Universal Time (`UTC`) has **zero DST jumps or ambiguous duplicate hours**, ensuring strict monotonic chronological ordering and accurate `timedelta` calculations 365 days/year!",
      "DST shifts IP addresses too"
    ],
    "correct": 2,
    "explanation": "Storing and correlating exclusively in monotonic UTC removes timezone ambiguity and DST fallback overlaps from forensic timelines."
  },
  {
    "id": "q_c4_m6_143",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In Practical C04-M06-P2 step 2, which standard container maintains the recent chronological event queue per IP within the 5-minute sliding window?",
    "options": [
      "`set`",
      "`collections.deque`",
      "`secrets`",
      "`ipaddress`"
    ],
    "correct": 1,
    "explanation": "A sorted pass with per-IP collections.deque cleanly expires old timestamps from the left in O(1) time."
  },
  {
    "id": "q_c4_m6_144",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Look at how Practical P2 tracks **distinct usernames inside a rolling 5-minute deque**: if `deque` stores `(ts, user)` tuples and IP `203.0.113.7` hits `['asha', 'asha', 'ben', 'chen']` inside 3 minutes, how do you test distinctness accurately after popping expired items?",
    "options": [
      "Evaluate `len({u for _, u in dq}) >= 3` (or update a reference-counted `Counter` of active users inside the sliding deque)—checking `len(dq)` alone would misfire falsely on vertical single-user `'asha'` repeats!",
      "`len(deque) >= 3` directly",
      "Divide `len(dq)` by 3 minutes",
      "Subtract `times[-1] - times[0]` globally"
    ],
    "correct": 0,
    "explanation": "Checking unique usernames across active window tuples keeps vertical repeated failures distinct from multi-user spraying."
  },
  {
    "id": "q_c4_m6_145",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Why is `'10.20.4.17'` printed in `IPv4:` yet absent from `public:` in `m06_security_data.py`?",
    "options": [
      "`999.10.1.1` blocked private parsing",
      "`10.20.4.17` failed `ipaddress` syntax validation",
      "`www.example.com` replaced it",
      "`10.20.4.17` is a private RFC 1918 address (`is_global == False`), not globally routable external infrastructure"
    ],
    "correct": 3,
    "explanation": "ipaddress recognizes RFC 1918 private blocks cleanly via .is_global == False."
  },
  {
    "id": "q_c4_m6_146",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Look at Practical P1 step 5 testing `'example.net.'` with a trailing period cleanly vs. an FQDN ending intentionally without punctuation inside prose. Why does `.rstrip('.,;:!?)]\"\\'')` clean regex URL/domain candidates before allow-list lookup and set deduplication?",
    "options": [
      "Trailing periods encrypt URLs inside `defang()`",
      "`ipaddress` forbids trailing slashes",
      "Trailing punctuation (`example.net.` vs `example.net`) otherwise creates mismatched strings that bypass exact allowlist subtraction `domains - ALLOW` and produce broken URLs!",
      "Regexes strip dots automatically in Python 3.12"
    ],
    "correct": 2,
    "explanation": "Canonical normalization (lowercase + stripping sentence punctuation + trimming ports/whitespace) ensures allow-lists and deduplication match reliably."
  },
  {
    "id": "q_c4_m6_147",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Which section of Module 6 warns against building detection solely on file hashes and IP addresses because adversaries rotate them rapidly?",
    "options": [
      "Lesson 6.1 (`Chunked SHA-256 math`)",
      "Lesson 6.6 (`Using indicators responsibly`, referencing Course 01's Pyramid of Pain)",
      "Lesson 6.2 (`HMAC tag length`)",
      "Lesson 6.3 (`UTC Z suffix`)"
    ],
    "correct": 1,
    "explanation": "Lesson 6.6 places atomic IOCs inside operational context alongside durable behavioral rules."
  },
  {
    "id": "q_c4_m6_148",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In digital forensics (`Lesson 6.1` + `Course 10`), suppose two files `payload_a.exe` and `payload_b.exe` share the exact same **MD5** (`a1387d...`) yet yield completely different **SHA-256** digests! What does that immediately reveal?",
    "options": [
      "Someone intentionally constructed an adversarial **MD5 hash collision pair** (or a rare test vector)—never trust the files as identical; inspect binary diff + cryptographic SHA-256 immediately!",
      "SHA-256 encountered a hardware bit error",
      "Windows swapped line endings on `SHA-256` only",
      "`64 KiB` chunking broke MD5 determinism"
    ],
    "correct": 0,
    "explanation": "Matching MD5 alongside differing SHA-256 strongly signals engineered collision manipulation; collision-resistant SHA-256 distinguishes true content."
  },
  {
    "id": "q_c4_m6_149",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Which standard-library Python statement verifies whether tampered alert JSON passes HMAC validation cleanly?",
    "options": [
      "`sha256_file(tampered_msg)`",
      "`tag == tampered_msg`",
      "`secrets.token_bytes(32) == key`",
      "`hmac.compare_digest(tag, hmac.new(key, tampered_msg, hashlib.sha256).hexdigest())`"
    ],
    "correct": 3,
    "explanation": "Recomputing expected HMAC with the secret key and comparing via compare_digest returns False cleanly on any tampered byte."
  },
  {
    "id": "q_c4_m6_150",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "When `pat.match(line)` matches `sshd[1]: Failed password...`, suppose an attacker logs in from `'127.0.0.1'` cleanly or injects fake text into an unvalidated syslog relay. Why must structured event parsers NEVER concatenate captured strings directly into downstream OS shells or unsanitized terminal output?",
    "options": [
      "Regex groups automatically turn into `timedelta`",
      "`splitlines()` removes shells automatically",
      "Usernames or raw fields can carry shell metacharacters (`; & |` - CWE-78) or ANSI terminal escapes (covered next in Module 7!), requiring allowlist validation, list-based APIs, and control-character sanitization!",
      "`fromisoformat()` escapes ANSI bytes"
    ],
    "correct": 2,
    "explanation": "Defense-in-depth treats parsed log capture strings (usernames, paths, domains) strictly as untrusted attacker-controllable data."
  },
  {
    "id": "q_c4_m6_151",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Which `collections` helper cleanly automatically initializes an empty `set()` whenever a previously unseen source IP fails login?",
    "options": [
      "`Counter()`",
      "`defaultdict(set)`",
      "`deque()`",
      "`dict.keys()`"
    ],
    "correct": 1,
    "explanation": "defaultdict(set) eliminates boilerplate existence checks (`if ip not in d: d[ip] = set()`) when tracking unique accounts per IP."
  },
  {
    "id": "q_c4_m6_152",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Trace why `domains = {d.lower() for d in domains} - ALLOW - {e.split('@')[1] for e in emails}` fails subtly if `emails` includes uppercase domain text (`'SOC@EXAMPLE.ORG'`) while `domains` got lowercased first!",
    "options": [
      "Lower-casing domains alone while keeping uppercase `EXAMPLE.ORG` inside `{e.split('@')[1] ...}` prevents set subtraction from removing `'example.org'`—always normalize email domains with `.lower()` identically (`e.split('@')[1].lower()`)!",
      "Python converts all email parts to lowercase inside sets automatically",
      "`ALLOW` deletes `@` addresses cleanly",
      "Domains cannot contain uppercase ASCII characters"
    ],
    "correct": 0,
    "explanation": "Symmetric canonicalization (.lower() on both sides—candidate set AND exclusion/allow-list sets!) prevents embarrassing case-mismatch leaks."
  },
  {
    "id": "q_c4_m6_153",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "In `defang(value)` inside `m06_security_data.py`, what output string replaces `'http://update-check.example.net/api'` safely for ticket distribution?",
    "options": [
      "`d41d8cd98f00b204e9800998ecf8427e`",
      "`https://update-check.example.net/api`",
      "`http://127.0.0.1/api`",
      "`hxxp://update-check[.]example[.]net/api`"
    ],
    "correct": 3,
    "explanation": "Output 3 verified: `defanged for sharing: ['hxxp://update-check[.]example[.]net/api']`."
  },
  {
    "id": "q_c4_m6_154",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In Practical C04-M06-P1, why is `hashlib.md5(b'').hexdigest()` equal to `d41d8cd98f00b204e9800998ecf8427e`, and why should automated malware triage drop **both** that MD5 and `hashlib.sha256(b'').hexdigest()` unconditionally before querying external threat APIs?",
    "options": [
      "MD5 of empty files equals the SHA-256 prefix",
      "0-byte files cannot be uploaded over HTTPS",
      "Sending millions of 0-byte empty-file hashes consumes paid threat-intel API quotas and matches innocent placeholders globally (`Orchid Payments CS2`) with zero signal value!",
      "`sha256_file` throws `ZeroDivisionError` on empty inputs"
    ],
    "correct": 2,
    "explanation": "Filtering known empty/benign hashes locally saves external quota and eliminates false-positive noise and self-inflicted outages."
  },
  {
    "id": "q_c4_m6_155",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "How does `hmac.compare_digest` behave compared to ordinary `==` when checking a forged HMAC tag sharing the first `32` hex characters identically?",
    "options": [
      "`compare_digest` returns `True` if at least 32 characters match",
      "`compare_digest` executes in uniform constant time hiding match offset, whereas `==` returns slower at byte 32 than byte 0, leaking match progress via timing!",
      "`==` is constant-time across strings over 32 bytes",
      "`compare_digest` trims hex prefixes past 32 bytes"
    ],
    "correct": 1,
    "explanation": "Constant-time comparison evaluates full buffer symmetry regardless of how early or late the mismatch occurs."
  },
  {
    "id": "q_c4_m6_156",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Look at why Section 2 converts timestamp strings BEFORE sorting or correlating: why would leaving timestamps as unparsed ISO-8601 strings and comparing string slices fail cleanly across timezone offsets (`+05:30` vs `Z`)?",
    "options": [
      "Lexicographical string sorting compares `'2026-11-07T15:00:00+05:30'` (`09:30Z`) AFTER `'2026-11-07T10:00:01Z'`, inverting actual chronology completely unless converted to numeric aware UTC `datetime`!",
      "ISO-8601 strings forbid `+` signs in Python",
      "`Counter` sorts lists alphabetically automatically",
      "Timezones only matter for IPv6 logs"
    ],
    "correct": 0,
    "explanation": "Different timezone offsets break naive lexical string comparison completely; parse into aware datetimes and normalize to `.astimezone(timezone.utc)` cleanly."
  },
  {
    "id": "q_c4_m6_157",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the alert summary quantify the gap from `10:00:12Z` spray end to `chen`'s `10:07:20Z` login?",
    "options": [
      "Cleared `users_per_ip` at `10:05:00Z`",
      "Skipped `chen` because > 1 minute passed",
      "Only counted `asha`",
      "Logged `SUCCESS after failures: chen from 203.0.113.7 at 10:07:20` cleanly (`7m 8s` past last failure)"
    ],
    "correct": 3,
    "explanation": "Checking success events against earlier failing IPs detects compromised follow-on logins cleanly across minutes."
  },
  {
    "id": "q_c4_m6_158",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Inspect line 97: `urls = set(re.findall(r'https?://[^\\s)]+', clean))`. Suppose a threat report writes markdown link `[beacon](hxxp://bad[.]example/a)`. What does `[^\\s)]+` accomplish cleanly, AND what still leaks inside regex capture on `'http://bad.example/a)'` vs `'\"http://bad.example/a\"'`?",
    "options": [
      "`refang` deletes quotation marks automatically",
      "`https?://` skips markdown syntax automatically",
      "`[^\\s)]+` stops cleanly before markdown `')'`, yet double quotes `'\"'`, trailing `','`, or `']'` remain attached unless stripped in normalization (`url.rstrip('.,;:\"'<>[]')`)!",
      "`ipaddress` validates URL strings"
    ],
    "correct": 2,
    "explanation": "Robust IOC pipelines always follow permissive candidate matching with strict delimiter trimming and urlparse sanity checks."
  },
  {
    "id": "q_c4_m6_159",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "When building Practical C04-M06-P1 as a reusable script taking a CLI filename argument, why output structured JSON instead of ad-hoc print lines?",
    "options": [
      "JSON suppresses UTF-8 encoding automatically",
      "Downstream SIEM, SOAR, and ticketing automations parse valid JSON schemas cleanly and deterministically without fragile stdout scraping",
      "JSON converts MD5 hashes into SHA-256 automatically",
      "`print()` disables `set` sorting"
    ],
    "correct": 1,
    "explanation": "Machine-readable JSON/JSONL interchange bridges security CLI tools reliably into larger automation pipelines."
  },
  {
    "id": "q_c4_m6_160",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "When distributing software hashes to users (`C04-M06-L01` + `Course 01`), why did Windows `Get-FileHash`, Windows `certutil -hashfile`, and Python `sha256_file()` produce the exact lowercase/uppercase hex sequence `8252197b...e37ba6e`?",
    "options": [
      "SHA-256 is an open deterministic standard algorithm (FIPS 180-4) operating cleanly on identical file octets regardless of vendor tool or OS!",
      "All three tools share Python's `hashlib` DLL",
      "Windows hashes paths rather than file contents",
      "64 KiB chunks synchronize random seeds"
    ],
    "correct": 0,
    "explanation": "Deterministic cryptographic standards yield identical verifiable fingerprints cleanly across operating systems and independent implementations."
  },
  {
    "id": "q_c4_m6_161",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "What minimum key byte size (`token_bytes(n)`) does `m06_security_data.py` demonstrate for strong HMAC-SHA256?",
    "options": [
      "`1` byte (`8` bits)",
      "`4` bytes (`32` bits)",
      "`8` bytes (`64` bits)",
      "`32` bytes (`256` bits)"
    ],
    "correct": 3,
    "explanation": "32 random bytes (256 bits) via secrets.token_bytes(32) aligns with full SHA-256 key strength."
  },
  {
    "id": "q_c4_m6_162",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "What distinguishes handling *synthetic* test logs (`m06_security_data.py`) vs. multi-line Java/Python stack-trace application logs when designing line-oriented regex parsers?",
    "options": [
      "`splitlines()` parses multi-line stack traces identically to single-line sshd",
      "UTC offsets disappear in multi-line logs",
      "Line-by-line regex `pat.match()` drops indented stack-trace continuation lines cleanly unless events preserve full grouped records or structured JSON logging (`NDJSON`) replaces fragile raw text parsing!",
      "`re.compile` rejects newlines unless empty"
    ],
    "correct": 2,
    "explanation": "Recognizing when structured JSON logs beat fragile line-regexes prevents silent blind spots across complex application telemetry."
  },
  {
    "id": "q_c4_m6_163",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "Why does Course 04 highlight `198.51.100.23` (`2` attempts against `'asha'` in 6.5 min) alongside `203.0.113.7`?",
    "options": [
      "Because `198.51.100.23` used HMAC",
      "To demonstrate contrasting baseline/low-volume guessing below spray threshold vs. genuine multi-user spray + breach",
      "Because `'asha'` triggered empty-file MD5",
      "To show `Counter` ignoring IP `198.51.100.23`"
    ],
    "correct": 1,
    "explanation": "Seeing non-alerting background noise alongside alerting intrusion lines illustrates threshold tuning cleanly."
  },
  {
    "id": "q_c4_m6_164",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "In `extract_iocs()` (`Practical P1`), you add IPv6 support validated via `ipaddress.ip_address()`. Suppose an incident ticket writes uncompressed `'2001:0db8:0000:0000:0000:0000:0000:0001'` on page 1 and compressed `'2001:db8::1'` on page 2. What nice property does `str(ipaddress.ip_address(cand))` give deduplication?",
    "options": [
      "`str(ipaddress.ip_address(...))` canonicalizes *both* variants directly into identical compressed string `'2001:db8::1'`, so Python `set` deduplication merges them automatically!",
      "`ipaddress` rejects leading zeros cleanly",
      "`ipaddress` preserves uncompressed strings separately",
      "IPv6 turns into IPv4 automatically"
    ],
    "correct": 0,
    "explanation": "Canonical RFC 5952 compression via str(ipaddress.ip_address()) ensures equivalent IPv6 representations deduplicate seamlessly."
  },
  {
    "id": "q_c4_m6_165",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "What should an enrichment tool keep alongside each extracted indicator (`Course 14`) so analysts know whether a match reflects active C2 vs. old stale noise?",
    "options": [
      "Naive local time strings",
      "Only the indicator's uppercase spelling",
      "Plain `==` signature output",
      "Confidence score, intelligence source, and `first_seen` / `last_seen` timestamps"
    ],
    "correct": 3,
    "explanation": "Provenance metadata transforms flat indicator strings into decision-ready threat intelligence."
  },
  {
    "id": "q_c4_m6_166",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Look at Microsoft Security Advisory `2718704` (`C04-M06-CS1`). Why is moving untrusted subordinate CAs (`Microsoft Enforced Licensing Intermediate PCA` x2 + `RA CA`) into the host's **Untrusted Certificates store** stronger than merely checking leaf certificate expiry?",
    "options": [
      "`secrets` rotates CA private keys automatically",
      "Untrusted store switches MD5 files cleanly into SHA-256",
      "Untrusted store overrides allowlists globally so *any* leaf certificate chaining through those compromised/weak intermediate CAs fails validation immediately—even before expiry date arrives!",
      "Expiry checks work only on loopback `127.0.0.1`"
    ],
    "correct": 2,
    "explanation": "Explicit revocation / Untrusted Certificate distrust functions as the emergency brake stopping fraudulent valid-looking leaf certs immediately."
  },
  {
    "id": "q_c4_m6_167",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "In `hmac.new(key, msg, hashlib.sha256).hexdigest()`, what do the three arguments supply respectively?",
    "options": [
      "URL string, timeout integer, and JSON dict",
      "Secret `bytes` key, payload `bytes` message, and cryptographic hash constructor",
      "UTC offset, regex pattern, and filename",
      "User password, salt count, and port"
    ],
    "correct": 1,
    "explanation": "hmac.new mixes key and message using the chosen hash construction (hashlib.sha256)."
  },
  {
    "id": "q_c4_m6_168",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Why must syslog parsing handle mixed or unknown character encodings cleanly (`open(..., encoding='utf-8', errors='replace')`) when reading real-world Linux `/var/log/auth.log` archives?",
    "options": [
      "SSH scanners routinely probe usernames containing arbitrary invalid raw Latin-1/binary bytes; without `errors='replace'`, `read()` crashes immediately with `UnicodeDecodeError` before your regex even sees the attack!",
      "`errors='replace'` validates TLS trust automatically",
      "`fromisoformat()` fixes encoding errors silently",
      "`utf-8` rejects ASCII syslog timestamps cleanly"
    ],
    "correct": 0,
    "explanation": "Resilient log ingestion guards explicitly against attacker-injected malformed encoding sequences."
  },
  {
    "id": "q_c4_m6_169",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the spray detector determine distinct targeted accounts per IP?",
    "options": [
      "Sorted lines alphabetically by username",
      "Inserted `user` into `users_per_ip[ip]` (`defaultdict(set)`) on every `Failed` login",
      "Counted port numbers in `Counter`",
      "Checked `ipaddress.is_global`"
    ],
    "correct": 1,
    "explanation": "Accumulating distinct user strings per IP in a set captures attacker fan-out cleanly."
  },
  {
    "id": "q_c4_m6_170",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "In Practical C04-M06-P2, imagine tuning your sliding window from `5` minutes to `60` minutes while keeping `distinct_users >= 3`. Trade off what increases simultaneously:",
    "options": [
      "False negatives surge dramatically while false positives vanish",
      "Time complexity rises cleanly to quadratic `O(N^2)`",
      "Detection recall improves against slow multi-hour spray bots, **yet** false positives also rise on shared offices/NAT gateways as routine human typos accumulate over longer windows!",
      "`datetime` drops timezone offsets past 30 minutes"
    ],
    "correct": 2,
    "explanation": "Longer correlation windows catch slower threats at the cost of accumulating higher benign baseline noise."
  },
  {
    "id": "q_c4_m6_171",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "What Python method on `ipaddress.ip_address('203.0.113.7')` differentiates routable internet addresses from private (`10.0.0.0/8`) and documentation (`203.0.113.0/24`) ranges cleanly?",
    "options": [
      "`.lower()`",
      "`.is_alpha`",
      "`.hexdigest()`",
      "`.is_global`"
    ],
    "correct": 3,
    "explanation": "ipaddress .is_global distinguishes globally routable internet space cleanly from private/documentation/loopback/link-local space."
  },
  {
    "id": "q_c4_m6_172",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Spot the edge-case subtle difference in `ipaddress.ip_address(cand).is_global` vs `.is_private` in Python 3.12+: why is checking `addr.is_global` safer than writing `not addr.is_private` when deciding which IPs belong to external threat infrastructure?",
    "options": [
      "`127.0.0.1` is neither public nor blocked cleanly unless explicitly tested; additionally carrier-grade NAT (`100.64.0.0/10`), multicast, unspecified `0.0.0.0`, and reserved blocks return `False` for `.is_global`, keeping non-routable junk cleanly out of external blocklists!",
      "`is_private` returns `True` for Google DNS `8.8.8.8`",
      "`is_global` throws `ValueError` on IPv6",
      "`not addr.is_private` is slower than `deque`"
    ],
    "correct": 0,
    "explanation": "Using `.is_global` cleanly rejects loopback, multicast, unspecified, reserved, CGNAT, RFC 1918, and RFC 5737 addresses all at once!"
  },
  {
    "id": "q_c4_m6_173",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "According to Orchid Payments (`CS2`), after validating incoming IOC feeds and maintaining a known-benign exclusion list, how should newly ingested rules initially run?",
    "options": [
      "Immediate host shutdown on match",
      "Monitor-only (logging/alerting) mode before activating automated blocking or quarantine",
      "Silent drop without logging",
      "Replacing SHA-256 with MD5"
    ],
    "correct": 1,
    "explanation": "Monitor-only canary staging reveals noise issues cleanly before automated quarantine touches production fleets."
  },
  {
    "id": "q_c4_m6_174",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In `m06_security_data.py`, line 30 reads `hashlib.md5(f.read_bytes()).hexdigest()`. Why would copying `.read_bytes()` onto a `50 GiB` forensic memory image inside `sha256_file()` crash production triage workers while line 22's `iter()` loop survives calmly?",
    "options": [
      "`md5()` reads files 50x faster using C threads",
      "`read_bytes()` strips trailing null bytes automatically",
      "`.read_bytes()` attempts allocating a single `50 GiB` Python bytes buffer upfront (crashing immediately with `MemoryError`), whereas chunked `iter(lambda: fh.read(65536), b'')` keeps peak RAM flat under `64 KiB`!",
      "MD5 rejects files over 2 GiB natively"
    ],
    "correct": 2,
    "explanation": "Chunked streaming decouples memory allocation cleanly from evidence file size—essential engineering for multi-gigabyte disk/RAM captures."
  },
  {
    "id": "q_c4_m6_175",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "What Python standard-library call should replace predictable `random` tokens when generating API secrets or HMAC keys?",
    "options": [
      "`ipaddress.ip_network()`",
      "`time.monotonic()`",
      "`Counter.most_common()`",
      "`secrets.token_bytes()` / `secrets.token_hex()`"
    ],
    "correct": 3,
    "explanation": "Always draw secret material from Python's cryptographic secrets module."
  },
  {
    "id": "q_c4_m6_176",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "A Windows security script parses ISO timestamps into naive datetimes and tries checking `if event_ts > datetime.now(timezone.utc) - timedelta(hours=1):`. What exact outcome saves you from silent corruption vs. what outcome creates silent bug if someone swaps `datetime.now()` (naive) on BOTH sides during DST fallback?",
    "options": [
      "Comparing aware vs. naive raises loud `TypeError`; using naive `datetime.now()` on both sides runs silently WITHOUT error while miscomputing DST offsets and cloud datacenter timezones by hours!",
      "Both fail immediately with `TypeError`",
      "Naive `datetime.now()` resolves UTC offsets automatically",
      "`timedelta` handles DST shifts silently"
    ],
    "correct": 0,
    "explanation": "Uniformly adopting UTC-aware datetimes everywhere avoids both mixed TypeError crashes and insidious local timezone / DST clock bugs."
  },
  {
    "id": "q_c4_m6_177",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "What happens if an attacker stops failing logins after 2 usernames (`'asha'`, `'ben'`) from `203.0.113.7` under a `>= 3 distinct users` threshold?",
    "options": [
      "SPRAY alert still fires on 2 users",
      "No spray alert fires (`threshold tuning tradeoff` balancing evasion vs. false positives)",
      "`Counter` throws `ValueError`",
      "Regex skips parsing `ben`"
    ],
    "correct": 1,
    "explanation": "Deterministic thresholds trade detectability below threshold against acceptable false-positive burden."
  },
  {
    "id": "q_c4_m6_178",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "In Practical P1 (`extract_iocs`), why should `defang` NOT blindly modify SHA-256 hex strings or email addresses if you only call `defang()` specifically on extracted URLs and domains (or store separate `defanged` fields)?",
    "options": [
      "`defang` converts hex letters `'a'..'f'` to `[a]`",
      "`sha256` hashes routinely contain `'http'` strings",
      "Defanging `example[.]net` only alters dots and `http` schemes cleanly (`JSON` preserves exact machine-searchable hashes/IPs while offering `'defanged'` strings specifically for human narrative copying!)",
      "Emails have no dots cleanly"
    ],
    "correct": 2,
    "explanation": "Keeping canonical validated machine values cleanly separated alongside defanged share fields serves automated pipelines and human readers without polluting either."
  },
  {
    "id": "q_c4_m6_179",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "If a threat bulletin uses `TLP:RED`, who is permitted to receive indicators extracted by your Python pipeline?",
    "options": [
      "Only DNS caching servers",
      "Any public community GitHub repository",
      "All third-party customers automatically",
      "Only the explicitly named recipients/meeting participants—not broadly across external teams or public feeds"
    ],
    "correct": 3,
    "explanation": "TLP:RED limits disclosure strictly to named participants on that specific exchange."
  },
  {
    "id": "q_c4_m6_180",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "Examine `m06_security_data.py` lines 27–32: first `f.write_bytes(b'...25,000...')` prints SHA-256 `8252197b...`, then `f.write_bytes(b'...95,000...')` prints `d56abccd...`. What important operational insight about `hashlib` object reuse does a beginner miss if they forget to call `hashlib.sha256()` FRESH per file?",
    "options": [
      "Reusing an old `h = hashlib.sha256()` variable across two files accumulates File 1 + File 2 concatenated digests cleanly, emitting completely bogus corruption alerts on File 2!",
      "`hashlib.sha256()` resets automatically when a file closes",
      "`sha256()` truncates after 32 KiB globally",
      "`update()` returns the final digest string cleanly"
    ],
    "correct": 0,
    "explanation": "Every independent artifact requires instantiating a brand-new hash context (`h = hashlib.sha256()`) inside the hashing function."
  },
  {
    "id": "q_c4_m6_181",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "When signing alert webhooks between internal microservices, why does HMAC-SHA256 protect both confidentiality-free integrity AND sender authenticity cleanly?",
    "options": [
      "HMAC encrypts payloads into unreadable ciphertext",
      "Only holders of the shared secret `key` can compute valid tags (`authenticity`), and changing any payload byte invalidates the tag (`integrity`)",
      "HMAC compresses payloads automatically",
      "HMAC skips timestamp checks cleanly"
    ],
    "correct": 1,
    "explanation": "Note HMAC itself does NOT encrypt plaintext payloads—pair HTTPS/TLS for confidentiality with HMAC where message signing is required!"
  },
  {
    "id": "q_c4_m6_182",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "difficult",
    "q": "Verify an essential architectural distinction: Does computing `hmac.new(key, json_bytes, hashlib.sha256)` over an alert webhook hide `json_bytes` from an on-path eavesdropper on plaintext HTTP?",
    "options": [
      "Yes — HMAC encrypts the body seamlessly",
      "Yes, when `secrets.token_bytes(32)` passes first",
      "No — HMAC produces an appended authentication **tag** alongside cleartext data (`confidentiality requires TLS/HTTPS` or AEAD encryption!); HMAC protects integrity + origin authenticity, NOT privacy!",
      "Only if verified with `compare_digest`"
    ],
    "correct": 2,
    "explanation": "Do not confuse MAC integrity tags with encryption: payloads signed by HMAC stay completely readable unless transported over TLS or encrypted separately."
  },
  {
    "id": "q_c4_m6_183",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did the log parser obtain timezone-aware UTC times cleanly from strings ending in `'Z'`?",
    "options": [
      "`Counter(ts_str)`",
      "`datetime.strptime(ts_str, '%Y')`",
      "`time.sleep()`",
      "`datetime.fromisoformat(ts_str.replace('Z', '+00:00'))`"
    ],
    "correct": 3,
    "explanation": "ISO-8601 replacement turns Z into +00:00 so aware UTC datetime objects compare cleanly everywhere."
  },
  {
    "id": "q_c4_m6_184",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "difficult",
    "q": "Suppose an attacker tries evading a `per-IP >= 3 distinct users` SSH spray rule using a rotating botnet of 100 unique IP addresses (`1 user per IP`). How does behavioral correlation catch that distributed spray cleanly using the exact same `collections` idioms (`Lesson 6.4`)?",
    "options": [
      "Pivot the grouping key from `per-IP` to **per-target host / per-subnet / global organization window** (`failures_by_host` + distinct targeted usernames across 100 distinct external IPs in 60s!), catching distributed sprays seamlessly!",
      "Switch from `defaultdict(set)` to `Counter()` per IP",
      "Sort logs alphabetically by username",
      "Apply `refang()` to all source IPs"
    ],
    "correct": 0,
    "explanation": "Adversaries evading single-IP thresholds trigger organizational distinct-user/password spikes when telemetry pivots onto target hosts and aggregate windows."
  },
  {
    "id": "q_c4_m6_185",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "medium",
    "q": "Look at `REPORT` in `m06_security_data.py`: what made `'www.example.com'` disappear from final `domains` output cleanly?",
    "options": [
      "It was shorter than 16 characters",
      "Membership inside the benign `ALLOW` exclusion set (`ALLOW = {'www.example.com'}`)",
      "It matched MD5 empty-file digest",
      "`refang` stripped `www.`"
    ],
    "correct": 1,
    "explanation": "Allow-list subtraction removes known safe corporate and test domains systematically."
  },
  {
    "id": "q_c4_m6_186",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Spot what could go wrong if you blindly subtracted corporate domain `'example.com'` *by substring match* (`'if allow in d'`) instead of strict set/suffix equality (`domains - ALLOW` or domain boundary matching) against C2 domain `'evil-example.com'`!",
    "options": [
      "Set subtraction splits subdomains automatically",
      "Suffix equality blocks `'update-check.example.net'` falsely",
      "Substring checks match `'example.com'` inside `'evil-example.com'` cleanly and silently allow attacker lookalike/typosquatting infrastructure right past your IOC filter!",
      "Lowercasing breaks substring lookups"
    ],
    "correct": 2,
    "explanation": "Substring allow-listing ('example.com' in candidate) lets attackers evade detections simply by registering evil-example.com! Always match exact domains or anchored `.parent` suffixes."
  },
  {
    "id": "q_c4_m6_187",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Which of these pairs accurately captures **Pyramid of Pain** intuition for Module 6 detection engineering?",
    "options": [
      "MD5 digests are harder to swap than TTPs",
      "File hashes hurt adversaries most; behaviors are effortless to swap",
      "Defanged URLs cannot match any detection",
      "Atomic hashes/IPs change easily (`low attacker pain`); behavioral sequences (`spraying`, `success-after-failure`) force tactic changes (`high attacker pain`)"
    ],
    "correct": 3,
    "explanation": "Layering durable TTP/behavioral detections above atomic hashes and IPs significantly increases adversary operational friction."
  },
  {
    "id": "q_c4_m6_188",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "In `m06_security_data.py`, `sha256_file(path, chunk=65536)` takes `path: Path` with type hints (`Course 04 M02`). What occurs cleanly if another caller passes a plain `str` filename instead of a `pathlib.Path` object?",
    "options": [
      "Python raises `AttributeError: 'str' object has no attribute 'open'` immediately—fixed defensively inside production helpers by writing `Path(path).open('rb')` cleanly at entry!",
      "`str.open('rb')` succeeds identically on Linux",
      "`iter()` casts strings into `Path` automatically",
      "`hashlib.sha256` reads string filenames directly"
    ],
    "correct": 0,
    "explanation": "Coercing inputs defensively via Path(path) handles both Path objects and legacy string paths reliably."
  },
  {
    "id": "q_c4_m6_189",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "When `tag = hmac.new(key, msg, hashlib.sha256).hexdigest()` executes, why can an attacker NOT produce a matching tag after swapping `203` for `198`?",
    "options": [
      "Because `198` creates invalid JSON",
      "Because generating a valid HMAC tag requires knowing the `32`-byte secret `key` mixed inside every digest round",
      "Because SHA-256 ignores numbers below 200",
      "Because `compare_digest` strips digits"
    ],
    "correct": 1,
    "explanation": "Without the secret key, adversaries cannot compute or forge matching tags for altered data."
  },
  {
    "id": "q_c4_m6_190",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Examine `2026-11-07T10:07:20Z sshd[3]: Accepted password for chen from 203.0.113.7 port 50010`. Why does `pat` match literal `port \\d+$` at the end even though the script didn't capture source port into `events`?",
    "options": [
      "`port \\d+` prevents regex capture groups globally",
      "Source port `50010` initializes `Counter`",
      "Validating trailing fixed structural literals (`port \\d+$`) anchors line integrity end-to-end so forged arbitrary text tacked after `203.0.113.7` fails `pat.match()` rather than slipping silently past an unanchored pattern!",
      "`fromisoformat()` requires `port \\d+` cleanly"
    ],
    "correct": 2,
    "explanation": "Matching expected trailing fields through `$` strengthens parser resistance against log-injection suffixes even when trailing tokens aren't extracted."
  },
  {
    "id": "q_c4_m6_191",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "In `m06_security_data.py`, how did `203.0.113.7` satisfy the spray rule condition (`>= 3 users within 1 minute`)?",
    "options": [
      "`4` successful logins within `1` minute",
      "`2` failed users within `6.5` minutes",
      "`1` failed user within `1` second",
      "`4` distinct failed users (`asha, ben, chen, dev`) within `11` seconds (`<= 60` s)"
    ],
    "correct": 3,
    "explanation": "Verified execution confirmed `SPRAY? 203.0.113.7: 4 users in 11s`."
  },
  {
    "id": "q_c4_m6_192",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Look at `REPORT` in `m06_security_data.py`: `'...from 10.20.4.17; payload SHA-256 ... also seen 203.0.113.7 ...'`. Why did `10.20.4.17` NOT trigger URL extraction even though it sits on the first line?",
    "options": [
      "`10.20.4.17` lacks a `'https?://'` scheme required by the URL extractor regex, so it routes solely into the `IPv4` validator cleanly!",
      "Semicolons delete IP addresses globally",
      "`refang` deleted `10.20.4.17`",
      "URLs cannot contain digits"
    ],
    "correct": 0,
    "explanation": "Distinct pattern groups separate typed artifacts cleanly (`IPv4`, `IPv6`, `URLs`, `domains`, `hashes`, `emails`) before validation and cross-filtering."
  },
  {
    "id": "q_c4_m6_193",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "What common hazard makes empty-file hash `d41d8cd98f00b204e9800998ecf8427e` dangerous if imported unvetted into EDR prevention?",
    "options": [
      "Empty files trigger `MemoryError` inside `sha256_file`",
      "Every zero-byte empty file anywhere across OS/apps computes that exact hash, causing mass benign file quarantines (`Case Study C04-M06-CS2`)",
      "It matches every valid IPv4 address",
      "It corrupts `secrets.token_bytes()`"
    ],
    "correct": 1,
    "explanation": "Never feed unvetted feeds directly into prevention; always exclude well-known benign empty/OS artifact digests."
  },
  {
    "id": "q_c4_m6_194",
    "topic": "C04-M06-L01: Hash Functions in Practice",
    "difficulty": "difficult",
    "q": "During forensic verification (`Lesson 6.1`), your colleague checks disk image integrity by running `sha256` on an unmounted read-only volume, while another script runs `.write_text()` first before hashing `'to normalize Windows quotes'`. What breaks completely?",
    "options": [
      "MD5 digests survive minor metadata edits",
      "`sha256_file` normalizes quotes cleanly",
      "Re-writing the evidence file destroys forensic chain-of-custody immutability AND invalidates every cryptographic digest (`avalanche mutation`!), making the artifact legally/technically contaminated!",
      "64 KiB streaming restores deleted blocks"
    ],
    "correct": 2,
    "explanation": "Forensic evidence must NEVER be mutated prior to or during hashing; always hash raw evidence read-only ('rb')."
  },
  {
    "id": "q_c4_m6_195",
    "topic": "C04-M06-L02: HMAC & Constant-Time Comparison",
    "difficulty": "medium",
    "q": "Why does Module 6 recommend authenticating alert pipelines with **HMAC-SHA256** whenever messages cross untrusted queues or webhooks?",
    "options": [
      "HMAC removes the need for TLS verification",
      "HMAC shrinks alert JSON by 90%",
      "HMAC automatically extracts IPv6 IOCs",
      "Only secret key holders can compute matching HMAC tags, defeating attacker message tampering cleanly"
    ],
    "correct": 3,
    "explanation": "HMAC assures receiving SOC systems that webhook/queue messages genuinely originated from an authorized signer untampered."
  },
  {
    "id": "q_c4_m6_196",
    "topic": "C04-M06-L03: Parsing Logs Into Events",
    "difficulty": "difficult",
    "q": "Compare how `m06_security_data.py` stores parsed fields as positional tuples `(ts, m[2], m[3], m[4])` vs. using a `@dataclass` / `NamedTuple` (`AuthEvent(ts, result, user, ip, raw_line)`) inside larger production parsers (`Course 04 M02`). What concrete bug class do named event types eliminate?",
    "options": [
      "Positional tuple index swaps (`e[2]` vs `e[3]` confusing `user` and `ip` silently!) vanish completely when accessing `.user` and `.ip` by explicit attribute name—while keeping `raw_line` cleanly accessible for evidence!",
      "`NamedTuple` automatically validates IPv4 syntax",
      "Tuples consume 10x less disk space than integers",
      "Dataclasses remove UTC offsets"
    ],
    "correct": 0,
    "explanation": "Named structures (NamedTuple / frozen dataclass) prevent subtle positional indexing mixups across large multi-module SOC engines."
  },
  {
    "id": "q_c4_m6_197",
    "topic": "C04-M06-L04: Aggregation & Time-Window Rules",
    "difficulty": "medium",
    "q": "What happens in Practical C04-M06-P2 step 1 if you try comparing an aware event timestamp against `datetime.utcnow()` cleanly on older code?",
    "options": [
      "`utcnow()` returns aware datetimes since Python 3.0",
      "Deprecated naive `datetime.utcnow()` raises `TypeError` against aware UTC datetimes—always use `datetime.now(timezone.utc)`!",
      "`Counter` fixes naive offsets automatically",
      "Only `timedelta` rejects comparisons"
    ],
    "correct": 1,
    "explanation": "Always generate current timestamps via datetime.now(timezone.utc) rather than naive legacy datetime.utcnow()."
  },
  {
    "id": "q_c4_m6_198",
    "topic": "C04-M06-L05: IOC Extraction & Validation",
    "difficulty": "difficult",
    "q": "Look at regex `r'\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b'` in `m06_security_data.py`. In threat extraction, what happens if you blindly extract IOCs from raw unread HTML email bodies without stripping MIME/HTML formatting tags first (`href=...`, `<span>`)?",
    "options": [
      "`ipaddress` parses HTML paragraphs safely",
      "`refang` strips HTML entities cleanly automatically",
      "HTML tags (`&quot;`, `</span>`, `=`) glue directly onto extracted URLs or domains unless HTML/transport decoding executes cleanly before candidate extraction!",
      "SHA-256 regexes match HTML `<script>` lines"
    ],
    "correct": 2,
    "explanation": "Pre-cleaning transport encoding (MIME quoted-printable, HTML tags/entities, URL percent decoding where needed) ensures accurate indicator extraction."
  },
  {
    "id": "q_c4_m6_199",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "medium",
    "q": "Which standard Python library module parses JSON strings safely and outputs formatted JSON / JSONL alerts cleanly in Module 6 practicals?",
    "options": [
      "`eval`",
      "`pickle`",
      "`marshal`",
      "`json`"
    ],
    "correct": 3,
    "explanation": "Standard json module safely serializes IOC dictionaries (Practical P1) and JSONL alert records (Practical P2)."
  },
  {
    "id": "q_c4_m6_200",
    "topic": "C04-M06-L06: Using Indicators Responsibly",
    "difficulty": "difficult",
    "q": "Synthesize all 6 lessons of Module 6 in one scenario: You digest incoming threat feeds in 64 KiB streams (`L01`), verify webhook integrity via HMAC-SHA256 + `compare_digest` (`L02`), ingest syslog events into aware UTC (`L03`), correlate sprays and successes (`L04`), filter `999.x`/RFC 5737/`d41d8cd9...` IOCs (`L05`), and stage feeds safely (`L06`). Which defense property ties ALL six together?",
    "options": [
      "End-to-end **data-pipeline skepticism**: verify cryptographic provenance safely, enforce explicit types/bounds/timezones at every stage boundary, filter false-positive noise systematically, and pair decaying atomic indicators with behavioral detections!",
      "Optimizing raw execution latency over input checks",
      "Disabling allow-lists for maximum alert volume",
      "Storing live C2 endpoints straight into clickable admin reports"
    ],
    "correct": 0,
    "explanation": "Module 6 establishes trustworthy defensive data engineering: unforgeable provenance, strict schema/timezone hygiene, validated IOC curation, and high-signal behavioral logic."
  }
];
