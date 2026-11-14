LAB_ASSETS/C08/ioc_match.py (execution-tested):

- The feed fields mirror STIX ideas (type, value, confidence, valid_until, source, context, TLP) but it is a teaching structure, not STIX JSON.
- Domain matching uses the parameterised pattern "%://<domain>/%", so "evil.example" does not match "notevil.example" or a path containing the name - a real issue with naive substring matching.
- IPs are matched exactly, with a parameterised query.
- Expiry is checked against an explicit AS_OF date, so results are reproducible; in production you would use the current date.
- Expired indicators are still reported when they match, with a warning, because history can matter in investigations - but they must not trigger automatic action.

**Extension ideas:** subdomain matching (use the hostname, not the whole URL); scoring = confidence x source reliability x recency; writing matches back as alert enrichment.
