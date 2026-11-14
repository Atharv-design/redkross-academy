> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by building, testing and documenting a cryptographic file utility.

​### Scenario

Tamarind Logistics (fictional) needs a small tool for finance to encrypt payroll exports before sending them through cloud storage, and to record integrity fingerprints for audit.

​### Requirements

```text
R1 Threat model with in-scope adversaries, non-goals and data lifetime.
R2 Design using a vetted library: password KDF meeting OWASP parameters,
   AEAD with unique nonces by construction, authenticated versioned
   header, bounded parameter parsing.
R3 CLI with encrypt, decrypt and hash commands; passphrase not on the
   command line; atomic output; exit codes 0/1/2.
R4 Test suite of at least 12 tests covering correctness, freshness,
   integrity, authentication, robustness and interface, plus at least
   one known-answer test vector.
R5 One extension: chunked streaming for files over 64 MiB, public-key
   recipients (X25519+HKDF), Argon2id, or Ed25519 signatures - with a
   format version change and tests.
R6 Security document (M08 L05 structure) with references and at least
   five limitations.
R7 Peer review record and responses.
```

​### Deliverables

Source code, tests and test output with versions, format specification, security document (max. 5 pages), peer review record.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Threat model (10%)        | Missing/vague   | Adversaries,    | Lifetimes, PQC  |
|                           |                 | non-goals clear | and ops risks   |
| Cryptographic design (25%)| Weak primitives | R2 met with     | Agility, bounds,|
|                           | or nonce risk   | rationale       | misuse-resistant|
| Implementation (15%)      | Custom crypto,  | Vetted library, | Clean API, no   |
|                           | unsafe errors   | R3 met          | footguns        |
| Testing (20%)             | Few happy-path  | R4 met, all     | Fuzzing/property|
|                           | tests           | pass            | tests, vectors  |
| Extension (10%)           | Absent/unsafe   | Correct with    | Matches vetted  |
|                           |                 | tests           | construction    |
| Documentation (20%)       | Marketing claims| R6 complete,    | Reviewer-ready, |
|                           |                 | honest limits   | ops guidance    |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Design reasoning, careful implementation, adversarial testing, clear technical writing, receiving review.
