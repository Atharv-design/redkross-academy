A security document for a cryptographic tool should contain:

1. Purpose and scope: what the tool protects, and against whom.
2. Threat model and non-goals (L01).
3. Design: algorithms, parameters and rationale with references (OWASP, NIST, RFCs), and the file format specification.
4. Key and passphrase guidance: length (for example 4+ random words or a generated passphrase), storage in a password manager, sharing by a separate channel, and rotation.
5. Operations: exit codes, logging (never log passphrases), error meanings, and compatibility and versioning policy.
6. Limitations: in-memory size limit, no sender authentication, endpoint exposure, passphrase strength dependence, and Python memory handling (keys cannot be reliably wiped from memory in Python).
7. Testing evidence: the test list, results, environment and versions.
8. Review and maintenance: who reviewed it, the library update process, and how to report vulnerabilities.

Honest limitations are part of security. A reader should be able to decide whether the tool fits their risk.
