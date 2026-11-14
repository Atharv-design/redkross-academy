A four-level scheme (Course 17 M02) with handling rules:

| Term | Meaning |
|---|---|
| Public | no restrictions beyond integrity. |
| Internal | staff only; SSO; standard logging. |
| Confidential | need-to-know; MFA; encryption at rest and in transit; central logging; DLP for exports. |
| Restricted | personal data at scale, payroll, credentials, keys: phishing-resistant MFA, managed devices, customer-managed keys with separated custody, access reviews, masked data in non-production, strict retention, enhanced monitoring. |

Classification should be applied to data stores and flows in the data-flow view (Module 1) and enforced by guardrails (L06). Personal data adds DPDP obligations: purpose limitation, minimisation, security safeguards, breach intimation (Course 01 M07).

**Minimise first:** data you do not collect or keep cannot leak - legacy copies inflated exposure in the British Library case (Module 1).
