1. Standards: CIS Benchmarks for AWS and Azure plus Tamarind's data, identity, network and logging standards (Modules 2-5) as policy.
2. Prevent: SCPs and Azure Policy deny for critical patterns; account defaults for BPA, EBS encryption and IMDSv2.
3. Shift left: checkov (or equivalent) and secret scanning in every IaC pull request; failing critical checks block merge.
4. Detect: AWS Config/Security Hub and Defender for Cloud across all accounts and subscriptions; findings to the queue with owner tags.
5. Respond: SLAs - critical exposure 24 hours, high 7 days, medium 30 days; auto-remediation for a few safe cases (re-enable BPA).
6. Verify: re-scan plus test by effect; evidence attached.
7. Govern: exceptions as code with expiry; monthly posture report by account and owner.
