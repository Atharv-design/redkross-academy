1. Ingest: from feeds, reports, sharing communities and internal investigations, recording the source of every row.
2. Normalise: canonical forms (lower-case domains and hashes, refang "hxxp" and "[.]", trimmed whitespace).
3. Validate: syntax (is it an address?), known-bad data (the MD5 of an empty file), and allowlists of services that must never be blocked.
4. Merge and de-duplicate across sources, keeping every source.
5. Enrich: add context (L04).
6. Score and age (L05).
7. Deploy: to the controls that can use the type, with an expiry.
8. Observe: record sightings and outcomes (true or false positive).
9. Review and retire: expire automatically; revoke when wrong.

Every stage has an owner and a log; "who added this indicator and why?" must always be answerable.
