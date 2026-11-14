Treat detections as code with unit tests. LAB_ASSETS/C08/test_rules.py builds an in-memory SQLite table and asserts that each minisiem rule fires on a known-bad event and does not fire on a near miss:

| Term | Meaning |
|---|---|
| R1 | Word -> PowerShell must match; explorer.exe -> PowerShell must not. |
| R2 | five users failing then one success must match; four users must not (threshold boundary); eight failures with no success must not. |
| R6 | ten 220-byte requests must match; ten requests of varying size must not. |

```text
------------------------------------------------------------- BEGIN OUTPUT
Ran 7 tests in 0.009s
```

```text
OK
--------------------------------------------------------------- END OUTPUT
(execution-tested with CPython 3.14.4)
```

**Boundary tests matter:** they document the exact threshold and catch accidental changes during tuning. Beyond unit tests, replay historical data to estimate volume, and use safe emulation in a lab (for example scripts that create a test local account and remove it) to confirm end-to-end telemetry - a rule that is logically correct is useless if the event never reaches the SIEM. Emulation of attacker techniques must only be done in isolated labs you are authorised to use (Course 19).
