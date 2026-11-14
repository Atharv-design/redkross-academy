In grc_toolkit.py, each risk carries:

```text
inherent L and I (1-5), and a control effect (L_red, I_red);
residual L' = max(1, L - L_red), I' = max(1, I - I_red).
```

**Example:** R01, ransomware with immutable offline backups and EDR, has L 3 to 2 and I 5 to 3, giving residual 6. Backups reduce impact more than likelihood. EDR reduces likelihood.

**Checks:**

- acceptance expiry: "accept" with accept_until earlier than the AS_OF date (2026-11-07) gives ACCEPTANCE EXPIRED;
- high residual not mitigated: residual >= 12 with treatment other than "mitigate" gives REVIEW.

The heat map places each risk at residual (likelihood, impact). Limitations to state in any real use:

```text
- Ordinal scores are not true numbers; multiplying them is a convention.
- Control-effect estimates must come from control testing, not optimism.
- Correlated risks (one control failure affecting many risks) are not
  modelled.
- A heat map hides the difference between a frequent small loss and a
  rare catastrophe.
Use the register to support judgment, not replace it.
```
