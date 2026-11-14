Evidence must be collected so it can be trusted later:

- Order of volatility: memory and network state are lost first, then running processes, then disk, then logs held centrally, which are more durable.
- Integrity: hash every exported file (SHA-256), record the hash, and verify it before each use.
- Chain of custody: who collected or handled each item, when, how, and where it is stored.
- Minimal change: use read-only or approved tooling, and document every command run on a live system.
- Time: record the time zones and clock offsets of each source (Module 2).
- Legal: Indian courts admit electronic records under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023, with a certificate. Commentators note the certificate includes hash values (Course 01 Module 7, SME review).

Execution-tested example (LAB_ASSETS/C08/evidence_export.py) exports the raw WS-104 events for 06:00-09:00Z, writes a manifest and appends a custody record:

```text
------------------------------------------------------------- BEGIN OUTPUT
exported 32 events -> evidence\CASE-0001\WS-104_2026-11-03_events.jsonl
sha256 8521c97cab10c667d87b01db92fa9c45a5f130dfc314fb49c622eaf1f2919acf
$ sha256sum -c SHA256SUMS
WS-104_2026-11-03_events.jsonl: OK
(after changing 48200000 to 482000 in the file)
WS-104_2026-11-03_events.jsonl: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
--------------------------------------------------------------- END OUTPUT
(execution-tested; sha256sum from Git for Windows bash; CPython 3.14.4)
```

Changing one figure in the upload size was detected immediately. Running the export again produced the identical hash, because the query, ordering and line endings are fixed. Reproducibility is part of trustworthiness. On Windows, PowerShell's Get-FileHash -Algorithm SHA256 gives the same digest.
