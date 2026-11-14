Open-source material changes or disappears. Preserve what you rely on:

- save the artefact (page, document, record) in a controlled store;
- compute a cryptographic hash (SHA-256) at collection;
- record the UTC time, the source URL, the collector, the requirement served and the purpose;
- make the record tamper-evident.

The lab's collect_log.py appends one JSON line per artefact and chains entries: each entry includes the previous entry's hash, and its own hash covers its fields. Verification recomputes the chain; editing any earlier entry breaks it (deep dive). This is simpler than a forensic evidence system (Course 09) but enough to show what was collected, when, and for which requirement.
