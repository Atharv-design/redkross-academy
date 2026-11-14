Standards make policies concrete and testable:

```text
STD-AC-02  "Multi-factor authentication must be enforced for (a) all
           remote access to the corporate network, (b) all
           administrative access to production systems, and (c) all
           internet-facing applications holding confidential data.
           Phishing-resistant methods (FIDO2/passkeys) are required for
           (b)."
```

**Good standards:**

- say who, what, when and how much (for example "within 14 days", "minimum TLS 1.2");
- trace to a policy statement and to framework mappings (Module 3);
- can be tested by someone other than the owner;
- are reviewed more often than policies, because technology changes faster.

Avoid "where possible", "appropriate" and "industry best practice" without definition. These words make requirements untestable. If a requirement cannot be met everywhere, say so explicitly and route the remainder through exceptions.
