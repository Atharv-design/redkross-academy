Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A colleague wants to lower scrypt to N=2^12 "because users complain".

**Task:** Respond.

> [!TIP] Model answer
> Decline lowering below OWASP minimums. Measure the actual delay (well under a second at N=2^17 for one file on the lab machine), and explain the guessing-cost trade-off. If latency matters, use the equivalent OWASP trade-off (N=2^14 with p=5), or Argon2id with documented parameters.
>
> **Lesson:** security parameters change with evidence, not complaints.

## Scenario 2

Finance needs to send encrypted files to 20 partners.

**Task:** Recommend an approach.

> [!TIP] Model answer
> Shared passphrases do not scale and give no per-partner revocation. Use public-key recipients (X25519 or certificates) or a managed secure file-exchange service with per-partner access, audit and expiry. Sign files for authenticity. Keep rkcrypt for ad hoc cases.
>
> **Lesson:** choose the tool for the trust model.

## Scenario 3

An auditor asks how you know rkcrypt works.

**Task:** Answer.

> [!TIP] Model answer
> Point to the design document with its references, the 11 automated tests (correctness, freshness, integrity, authentication, robustness, CLI) with recorded results and versions, the use of a vetted library (pyca/cryptography) without custom primitives, a peer review record, and the stated limitations.
>
> **Lesson:** evidence, not assertion.
