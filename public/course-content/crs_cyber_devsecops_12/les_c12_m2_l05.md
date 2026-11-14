A user story describes intended use: "As a customer, I can view my shipment". An abuse case describes misuse the system must resist, written so it becomes a requirement and a test:

```text
Abuse case AC-01: A logged-in customer requests a shipment that belongs
to someone else.
  Expected behaviour: the request is refused with the same response as
  for a non-existent shipment, and the attempt is logged.
  Mitigation: an owner check on every read (REQ-AUTHZ-01).
  Test: test_other_user_denied and
  test_missing_and_forbidden_look_the_same (Module 3 lab).
Abuse case AC-02: A client sends a tracking ID in an unexpected format
or of excessive length.
  Expected behaviour: rejected before any database access.
  Mitigation: allowlist validation (REQ-VAL-01).
  Test: test_malformed_ids_rejected.
Abuse case AC-03: The build installs a package with the expected name
from an unexpected source.
  Expected behaviour: the build resolves dependencies only from the
  approved index, with pinned hashes, and fails otherwise.
  Mitigation: a single index configuration and hash-checking mode
  (Module 5).
  Test: a pipeline check that rejects unpinned or unhashed requirements.
```

Abuse cases keep the focus defensive and verifiable: each ends in expected behaviour, a mitigation and a test, not in a description of attack technique.
