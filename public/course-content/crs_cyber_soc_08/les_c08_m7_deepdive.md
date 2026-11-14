Design choices in evidence_export.py (execution-tested):

- Raw events: it exports the original JSON stored in minisiem's raw column rather than parsed fields, so the export is not shaped by a parser's interpretation.
- Parameterised query with explicit host and time window: the custody record stores the query, so anyone can re-run it and compare hashes.
- ORDER BY ts plus newline="\n": the same data always produces the same bytes. The first test run wrote SHA256SUMS with Windows CRLF endings (Path.write_text translates "\n"), and "sha256sum -c" then failed with "No such file or directory" because the filename included a carriage return. Fixed by passing newline="\n". It is a small, real example of tooling details affecting evidence handling.
- Append-only custody log (custody.jsonl): each run adds an entry with UTC time, actor and action. In production, use a case-management system with access control and immutable storage, such as WORM or object lock.
- Streaming hash (65,536-byte blocks): it works for large files without loading them into memory.

**Limitations:** the export depends on the SIEM's own integrity (were logs complete and unaltered at ingestion?), and the actor name is hard-coded. Real evidence handling also covers disk and memory images (Course 09).
