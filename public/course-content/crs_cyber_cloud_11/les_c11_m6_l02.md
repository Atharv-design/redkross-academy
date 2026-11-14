CSPM tools read configuration through provider APIs and compare it with rules (CIS Benchmarks, provider best practice, internal standards):

- AWS: AWS Config rules and conformance packs, Security Hub standards.
- Azure: Azure Policy compliance, Microsoft Defender for Cloud recommendations and secure score.
- Third-party CSPM across clouds.
- Your own scripts with read-only APIs (Modules 2-4 labs).

**Operating model:** inventory every account and subscription automatically; run assessments continuously; send findings with resource, owner (from tags) and severity to a queue; measure time to remediate by severity; report trends. Read-only roles for scanners, deployed to every account from the organisation level.
