NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities", was published in February 2022 [R1]. It groups practices into four families:

| Term | Meaning |
|---|---|
| PO | Prepare the Organization. Define security requirements, roles, training, toolchains and criteria for security checks. |
| PS | Protect the Software. Protect code from unauthorised access and tampering, provide integrity verification for releases, and archive releases. |
| PW | Produce Well-Secured Software. Design to meet requirements, threat model, reuse secure components, follow secure coding, review and test code, and configure securely by default. |
| RV | Respond to Vulnerabilities. Identify and confirm vulnerabilities, remediate them, and analyse root causes to prevent recurrence. |

**The SSDF is outcome-based:** it says what to achieve, not which tool to use. It is widely used as the basis for secure-development attestations requested by customers and governments. Map your existing activities to SSDF practices to find gaps. This course's modules follow it: requirements and gates (PO, PW), threat modelling (PW), coding, analysis and dependencies (PW), secrets and pipeline integrity (PS), and vulnerability management (RV).
