**A good probe has:**

- a clear objective tied to a category (LLM07, LLM01, ...);
- a benign mechanism: a canary value that must not appear, a simulated tool whose ledger shows whether an action would have happened, a fictional record whose disclosure is harmless;
- an objective check in code (string present? tool executed?), not a human impression;
- variants: direct and indirect; visible and hidden placement; different wording;
- a matching utility probe, so that "secure" does not mean "useless".

BanyanBot's six probes follow this pattern: SYS-CANARY-3141 for prompt leakage, CANARY-PAPAYA for indirect injection, fictional customer data for disclosure, the simulated refund ledger for agency, an unknown .example host for output handling, and an in-policy refund for utility.
