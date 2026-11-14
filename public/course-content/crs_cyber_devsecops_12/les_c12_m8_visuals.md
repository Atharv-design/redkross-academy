## The lab release pipeline

![Gates run in three container images and on the host, each writing a result file; a report script reads them and decides whether the release is approved or blocked.](/assets/courses/cyber-12/C12-M08-F1.svg)
*Figure C12-M08-F1. Containers run the gates; results are collected and the report computes the decision (execution-tested).*

## Tooling contaminating the SBOM

![Two lines comparing an SBOM of 42 components when tools were installed in the release environment with 7 components when they were kept outside.](/assets/courses/cyber-12/C12-M08-F2.svg)
*Figure C12-M08-F2. Separating build tools from the product environment corrected the SBOM (execution-tested).*

## Findings lifecycle

![A sequence from detection through deduplication, triage, remediation and verification to closure and learning.](/assets/courses/cyber-12/C12-M08-F3.svg)
*Figure C12-M08-F3. A finding is closed only after the gate verifies the fix.*
