Poisoning means manipulating training or retrieval data to change behaviour. Controls:

- provenance and licence for datasets; prefer curated sources;
- review and hash curated data; detect changes (manifests);
- ingestion audits for retrieval content (Module 3, kb_audit.py);
- evaluation before and after data changes, with regression probes;
- separation of untrusted (imported) and trusted content, with labels carried to retrieval.

**Integrity is not safety:** in the lab, the planted partner page is listed as "OK" in the manifest because the manifest was written after it was added. A hash proves the file has not changed since approval - not that the approved content was safe. Approval must include review.
