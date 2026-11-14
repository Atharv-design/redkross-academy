LAB_ASSETS/C12/app/test_shipments.py turns the Module 1 requirements into tests. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
test_missing_and_forbidden_look_the_same ... ok
test_other_user_denied ... ok
test_owner_can_read ... ok
test_note_is_html_escaped ... ok
test_same_password_different_salt ... ok
test_verify_and_reject ... ok
test_malformed_ids_rejected ... ok
test_valid_id_accepted ... ok
----------------------------------------------------------------------
Ran 8 tests in 0.252s
OK
--------------------------------------------------------------- END OUTPUT
(execution-tested, CPython 3.14.4; test names shortened)
```

**Design points:**

- test_malformed_ids_rejected uses subTest to check many invalid inputs in one test: empty, too short, lower case, trailing space, appended punctuation, None and an integer. Each must raise ValidationError, so the validation runs before any database query.
- Authorisation tests cover the positive case (owner can read), the negative case (other user denied) and the information-leak case (identical errors).
- The scrypt tests take most of the 0.25 seconds. A slow hash is deliberately expensive; in large suites, mark such tests or lower cost parameters only in test configuration.
- The tests run in the pull-request gate (Module 1 policy), so removing the owner check would fail the build. The requirement is enforced, not just documented.

REQ-LOG-01 (no secrets in logs) is left for Practical P2.
