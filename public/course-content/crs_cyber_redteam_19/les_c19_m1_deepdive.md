Running roe.py over an incomplete then a complete RoE (execution-tested, CPython 3.14.4, 2026-11-08):

```output
== roe_incomplete.json ==
  [HIGH  ] authorisation      no authorising party / signed authorisation recorded
  [HIGH  ] time window        engagement time window not fully defined
  [HIGH  ] contacts           no emergency contacts for deconfliction/stop
  [MEDIUM] deconfliction      deconfliction method / operator tagging not required
  [HIGH  ] stop conditions    no stop conditions defined
  [MEDIUM] data handling      data handling (storage/encryption/retention) incomplete
  [HIGH  ] isolation          isolation not required (must run in an isolated range)
  [HIGH  ] no real user data   use of real user data not prohibited
  [MEDIUM] simulation only     engagement not marked simulation-only
  [LOW   ] reporting           executive and technical reporting not both committed
  10 finding(s), 6 HIGH -> FAIL (do NOT start the engagement)

== roe_complete.json ==
  no findings - all required controls present
  RESULT: PASS (engagement may proceed within scope)
```

**Reading the gate:**

- The incomplete RoE is missing the engagement's legal and safety backbone - authorisation, window, contacts, stop conditions, isolation and the no-real-data prohibition - so the gate FAILS and the engagement must not begin.
- The complete RoE records every control, so the gate PASSES and the engagement may proceed, strictly within the authorised scope.

This is governance made enforceable: the engagement is a checkable precondition away from starting, not a matter of intention. Everything in later modules runs inside this PASS. The review read only a JSON file - no system was touched.
