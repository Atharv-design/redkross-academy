NIST SP 800-61 Rev. 3 (April 2025) places incident response within cybersecurity risk management as a CSF 2.0 community profile [R1]; preparation corresponds to the Govern, Identify and Protect functions.

**Cloud preparation checklist:**

- IR roles: a pre-created incident-response role in every account and subscription (read-only investigation plus specific containment actions), usable through break-glass access that does not depend on the possibly compromised production identity.
- Logs: organisation trail, data events for critical stores, Azure Activity and Entra logs, flow logs - retained and protected (Module 5).
- Forensic account: a separate account/subscription to receive snapshots and log copies, with its own administrators.
- Runbooks: compromised access key; compromised console user or Entra account; compromised instance or container; public data exposure; malicious OAuth application; ransomware/destructive actions.
- Contacts: provider support (enterprise support case process), legal, privacy, regulators (CERT-In), communications.
- Exercises: tabletop and lab drills (the lab in L03-L04 is one).
