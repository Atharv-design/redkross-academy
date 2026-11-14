No team can detect everything. ATT&CK 20.1 lists 227 techniques and 479 sub-techniques in the Enterprise domain (counted from MITRE's STIX data on 2026-11-07) [R1]. Priorities should come from a threat model (Course 22 Module 2): which adversaries target your sector, which assets matter, which techniques appear in incidents similar to yours, and which techniques your existing controls already prevent.

**A practical method:**

1. Start from your crown-jewel assets and the business processes they support.
2. Collect intelligence on relevant threats: sector advisories, CERT-In and CISA alerts, your own incident history and purple-team results.
3. List the techniques those threats use, and keep the list short (10-30 techniques for a first cycle).
4. For each technique, record the telemetry it needs, the controls that already prevent it, and an owner.

Tamarind Freight, a fictional logistics firm, chose eleven techniques after a phishing-led ransomware threat assessment. They range from Spearphishing Attachment (T1566.001) to Clear Windows Event Logs (T1685.005).
