Improving rk-weak-hash-md5 so that explicitly non-security uses are not flagged:

```text
---------------------------------------------------------------- BEGIN CODE
- id: rk-weak-hash-md5
  languages: [python]
  severity: WARNING
  message: MD5 is unsuitable for security; use scrypt (passwords) or sha256.
  patterns:
    - pattern: hashlib.md5(...)
    - pattern-not: hashlib.md5(..., usedforsecurity=False)
------------------------------------------------------------------ END CODE
```

Rule test file (test_md5.py), annotated for "semgrep --test":

```text
---------------------------------------------------------------- BEGIN CODE
import hashlib
# ruleid: rk-weak-hash-md5
hashlib.md5(b"pw")
# ok: rk-weak-hash-md5
hashlib.md5(b"partner-file", usedforsecurity=False)
------------------------------------------------------------------ END CODE
```

Execution-tested (LAB_ASSETS/C12/sast/ruletest, semgrep 1.184.0): "semgrep --test ." reported "1/1: All tests passed". The rule flagged the plain md5 call and ignored the usedforsecurity=False call. Keep rules in a repository with their tests and changelog, version them, and review rule changes the same way as detection rules (Course 08 Module 6).
