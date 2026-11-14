## Revision

### Summary

Validate inputs at trust boundaries with allowlists, precise patterns (fullmatch), canonicalisation and schemas. Keep data separate from code with parameterised SQL, argument-list subprocess calls with "--", auto-escaping templates and no untrusted deserialisation. Encode output for its context (html.escape for HTML). Store passwords with slow salted hashes (scrypt in the lab), compare in constant time, manage sessions securely, throttle logins and prefer an identity provider. Authorise every object server-side, deny by default, and give identical responses for missing and forbidden. Handle errors, logging and defaults securely. The 8 execution-tested security unit tests enforce these requirements in the pipeline. MOVEit (AA23-158A) shows the impact of one injection flaw at scale.

### Important concepts

allowlists; separation of data and code; per-object authorisation.

### Key technical takeaways

re.fullmatch; ? placeholders; html.escape; hashlib.scrypt; hmac.compare_digest; secrets.

### Glossary

| Term | Meaning |
|---|---|
| Canonicalisation | Converting input to a standard form before checks. |
| Constant-time comparison | Comparison whose duration does not reveal content. |
| IDOR | Insecure direct object reference. |
| Output encoding | Converting data so it is displayed, not interpreted. |
| Parameterised query | Query with data passed separately from SQL text. |
| Salt | Random value making each password hash unique. |

### Common mistakes

denylists; client-side authorisation; fast password hashes.

### Revision questions

​1. Rewrite an f-string query safely. 2. Explain the "same error" rule. 3. List four session security settings.

### Further reading

CISA AA23-158A [R1]; OWASP Cheat Sheet Series [R2].

## References

- [R1] CISA and FBI. "#StopRansomware: CL0P Ransomware Gang Exploits CVE-2023-34362 MOVEit Vulnerability", AA23-158A, 7 June 2023. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a) Accessed: 2026-11-07. Supports: actor, CVE, SQL injection, LEMURLOOT, start date.
- [R2] OWASP. "OWASP Cheat Sheet Series". URL: [https://cheatsheetseries.owasp.org/](https://cheatsheetseries.owasp.org/) Accessed: 2026-11-07. Supports: validation, injection prevention, password storage and authorisation guidance.
- [R3] Python Software Foundation. "hashlib - Secure hashes and message digests" (scrypt). URL: [https://docs.python.org/3/library/hashlib.html](https://docs.python.org/3/library/hashlib.html) Accessed: 2026-11-07. Supports: hashlib.scrypt API.
- [R4] Lab evidence. app/shipments.py, app/test_shipments.py and unittest_output.txt (CPython 3.14.4), 2026-11-07.
