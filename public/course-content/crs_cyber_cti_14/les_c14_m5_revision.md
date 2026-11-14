## Revision

### Summary

IOCs are atomic, computed or behavioural; the Pyramid of Pain (Bianco, 2013) ranks hashes, addresses, domains, artefacts, tools and TTPs by the cost to the adversary of changing them. The lifecycle is ingest, normalise, validate and allowlist, merge, enrich, score and age, deploy, observe, review and retire. Feeds contain public services, known-bad data (the empty-file MD5), shared hosting, stale entries and context that merges can hide. Score with type-specific half-lives and corroboration, activate above a threshold, and expire automatically. Match the right fields and count events once. In the lab, naive matching produced 81 events (73 false); the managed pipeline produced 8, all real, all from one workstation. GRIZZLY STEPPE warned that listed addresses could carry legitimate traffic.

### Important concepts

Pyramid of Pain; lifecycle; allowlist; half-life; sightings.

### Key technical takeaways

never connect a feed straight to a block list; log every drop with a reason; test matchers.

### Glossary

| Term | Meaning |
|---|---|
| Allowlist | Values that must never be treated as malicious. |
| Half-life | Time for an indicator's score to halve without new evidence. |
| Refang | Restore a defanged value (hxxp, [.]) to its real form. |
| Sighting | A recorded observation of an indicator. |

### Common mistakes

blocking feeds blindly; no expiry; merging away context; counting field matches as events.

### Revision questions

​1. List the lifecycle stages. 2. Compute the score of a 60-confidence domain last seen 30 days ago. 3. Explain why the URL was missed.

### Further reading

[R1]; [R2].

## References

- [R1] Bianco, D. "The Pyramid of Pain", Enterprise Detection and Response blog, 1 March 2013 (updated 17 January 2014). URL: [https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html) Accessed: 2026-11-07. Supports: L01, figure F1.
- [R2] DHS and FBI. Joint Analysis Report JAR-16-20296A "GRIZZLY STEPPE - Russian Malicious Cyber Activity", 29 December 2016. URL: [https://www.cisa.gov/sites/default/files/publications/JAR_16-20296A_GRIZZLY%20STEPPE-2016-1229.pdf](https://www.cisa.gov/sites/default/files/publications/JAR_16-20296A_GRIZZLY%20STEPPE-2016-1229.pdf) Accessed: 2026-11-07 (text extracted from the PDF). Supports: CS1.
- [R3] OASIS. "STIX Version 2.1", Sighting object (Errata 01, 2 April 2025). URL: [https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html) Accessed: 2026-11-07. Supports: sightings as structured feedback.
- [R4] Lab evidence. ioc_pipeline.py, m05_ioc_output.txt, m05_ioc_output_v1_doublecount.txt, `data/feed_*.csv,` proxy_log.jsonl, 2026-11-07.
