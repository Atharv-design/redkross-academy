Security requirements state what the software must do, or never do, to stay secure. Good requirements are:

- specific: "Passwords are stored with a memory-hard, salted hash (scrypt or Argon2id)", not "store passwords securely";
- testable: each has an acceptance test, preferably automated;
- traceable: linked to a risk, regulation or standard;
- prioritised by the risk of the feature.

The OWASP Application Security Verification Standard (ASVS) is a catalogue of verifiable requirements for web applications and services. Version 5.0.0 was published on 30 May 2025 [R2]. It defines verification levels, from a baseline for all applications to the most demanding level for critical systems. Teams select the level per application and copy the relevant requirements into their backlog as acceptance criteria. Examples for the Tamarind shipment service (Module 3 implements them):

```text
REQ-AUTH-01  Passwords are hashed with scrypt with a unique random salt.
             Comparison is constant-time.
REQ-AUTHZ-01 Every shipment read checks that the requesting user owns the
             shipment. A request for another user's shipment returns the
             same response as a missing shipment.
REQ-VAL-01   Tracking IDs are validated against an allowlist pattern
             (TL- followed by 8 digits) before use.
REQ-ENC-01   User-supplied text is HTML-encoded when rendered.
REQ-LOG-01   Authentication failures are logged without passwords or
             tokens.
```

Each requirement maps to a unit test in LAB_ASSETS/C12/app/test_shipments.py. Of the five, REQ-LOG-01 is the one left as an exercise.
