A design review decides whether a design may proceed. Elements:

- Entry criteria: architecture views, data classification, threat model, requirements traceability, and results from automated checks (arch_review.py, resilience_review.py).
- Reviewers: security architecture, the service owner, operations, and privacy or legal where personal data is involved.
- Criteria: the organisation's architecture standards (Modules 2-6), zero trust maturity targets (CISA ZTMM, Module 3).
- Decisions: approve; approve with conditions (each with owner and date); reject with reasons. Exceptions carry an expiry and a compensating control.
- Records: an architecture decision record (ADR) per significant choice - context, decision, alternatives, consequences.

Reviews scale when the repeatable checks are automated (guardrails as code) and the review board spends its time on judgement: trade-offs, residual risk and exceptions.
