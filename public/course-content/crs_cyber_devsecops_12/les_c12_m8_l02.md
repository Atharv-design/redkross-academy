Execution-tested (sh run_release.sh with the upgraded pins requests==2.33.0 and PyYAML==6.0.3):

```text
------------------------------------------------------------- BEGIN OUTPUT
RELEASE SECURITY REPORT - shipments 1.0.0 (Tamarind Logistics, FICTIONAL)
artefact sha256: f0ea650ffbd1b39c90a213f6900f39420d2c8d1ac30e02aa5ef37942c7025c8b
tools: 1.184.0 | pip-audit 2.10.1
GATES
  PASS  security unit tests  (exit 0)
  PASS  SAST (semgrep --error)  (exit 0)
  PASS  dependency audit (pip-audit)  (exit 0)
  PASS  secret scan (gitleaks)  (exit 0)
  PASS  SBOM generated  (exit 0)
  PASS  signature verifies  (exit 0)
SAST findings: 0
Dependency advisories (unique): 0 across 6 resolved packages
SBOM: CycloneDX 1.6, 7 components
Non-permissive / review-needed licences: certifi (Mozilla Public License
2.0 (MPL 2.0))
DECISION: RELEASE APPROVED (all gates passed)
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; one line wrapped)
```

The same pipeline with the deliberately outdated Module 5 pins (execution-tested):

```text
FAIL  dependency audit (pip-audit)  (exit 1)
Dependency advisories (unique): 17 across 6 resolved packages
Non-permissive / review-needed licences: certifi (MPL 2.0); chardet (LGPL)
DECISION: RELEASE BLOCKED
```

**Reading the results:**

- The decision followed the gates mechanically. One failing gate blocked the release, while the others still reported, so the team saw the full picture.
- The 17 unique advisories match Module 5's count for the same pins, which is consistent evidence across runs.
- The SBOM component list for the approved release was PyYAML 6.0.3, certifi 2026.10.23, charset-normalizer 3.5.2, idna 3.20, pip 25.0.1, requests 2.33.0 and urllib3 2.8.0. It includes pip, which exists in the environment but is not used by the application. Decide whether such entries belong in your shipped SBOM, and document the choice.
- "Approved" covers only what the gates check. Design flaws, missing threat-model mitigations and runtime configuration need their own evidence (L04).
