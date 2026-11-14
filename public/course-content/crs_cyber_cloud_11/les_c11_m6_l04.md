32 failures is not 32 equal problems. Triage:

| Term | Meaning |
|---|---|
| Critical exposure | SSH/RDP from the internet, public database, public storage, TLS 1.0 - fix first. |
| Data protection | encryption, versioning, deletion protection. |
| Operational | performance insights, enhanced monitoring, event notifications - real but lower risk; some may be accepted with a documented exception. |

Blind spots matter as much as findings. In the lab, the literal database password "ChangeMe123!" in main.tf was not flagged by checkov's secrets scan of the file, although trivy flagged a password set in a Dockerfile ENV (Module 7). No scanner covers everything: combine IaC scanning, secret scanning, CSPM and review, and test scanners with known-bad samples. False positives also occur (for example a check for "security group attached" on a module fragment); suppress them only with an inline justification and review.
