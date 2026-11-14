Detection after the fact leaves an exposure window. Preventive guardrails:

- SCPs: deny DeletePublicAccessBlock, deny leaving approved regions, deny disabling logging, deny creating IAM users with keys.
- Azure Policy with Deny effect: storage public access disallowed, minimum TLS 1.2, no public IPs on NICs in production, required tags; DeployIfNotExists for diagnostic settings.
- Account-level defaults: S3 Block Public Access, EBS encryption by default, IMDSv2 by default.
- CI gates: IaC scan must pass (or have approved exceptions) before apply; plans reviewed by a second person.
- Drift detection: compare live configuration with IaC state; changes made outside the pipeline raise findings (Course 21 Module 6).

**Exceptions:** each with a reason, owner, compensating control and expiry, stored as code next to the resource.
