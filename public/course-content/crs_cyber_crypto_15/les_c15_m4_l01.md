| Term | Meaning |
|---|---|
| Pre-image resistance | given h, it is infeasible to find any m with H(m) = h. |
| Second pre-image resistance | given m1, it is infeasible to find m2 != m1 with H(m2) = H(m1). |
| Collision resistance | it is infeasible to find any pair m1 != m2 with H(m1) = H(m2). Because of the birthday bound, an n-bit hash gives at most about n/2 bits of collision resistance, so SHA-256 gives about 128. |
| Avalanche | a small input change flips about half the output bits. |

Execution-tested avalanche (LAB_ASSETS/C15/m04_hashing.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
  948908bd19ad82dc2f193448fe7828c9...
  1af9ffbe97eeeeb18717263481eeb9bf...
  differing bits: 127 of 256
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

Changing "1,234,567" to "1,234,568" in an invoice line changed 127 of 256 output bits, close to the expected half. There is no "nearby" hash that reveals a nearby input.
