A findings lifecycle keeps work moving and auditable:

1. Detect. A gate or scan reports a finding with tool, rule, location and severity.
2. Deduplicate and enrich. Merge repeats (the 32 rows versus 17 advisories in Module 5). Add exposure, reachability and an owner.
3. Triage. Classify as true positive, false positive or accepted risk (Module 4 L04), with reasons.
4. Remediate. Fix in code, upgrade a dependency, or change configuration, with a test where behaviour changes.
5. Verify. Re-run the gate, and close the finding only when it reports clean. In the lab, upgrading the pins turned the audit gate from FAIL (exit 1) to PASS (exit 0).
6. Learn. If a class of finding repeats, add a rule, a paved-road library or training.

Track SLAs by severity and report ageing. Waivers carry an owner and expiry (Module 1) and appear in the release report.
