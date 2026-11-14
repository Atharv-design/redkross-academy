## CISA red team assessment AA24-326A, 2024 Context: on 21 November 2024 CISA published "Enhancing Cyber Resilience: Insights from CISA Red Team Assessment of a US Critical Infrastructure Sector Organization" [C20-M07-R1]. Detection-related findings include: - the organisation "relied too heavily on host-based endpoint detection and response (EDR) solutions", and its EDR largely failed to protect it; - network defenders never properly implemented IDS or IPS to monitor the DMZ; - there were no detections for anomalous LDAP traffic, and Kerberos and Active Directory activity went unnoticed; - some red-team activity generated alerts that defenders did not review; - hosts running a legacy operating system had no EDR, and the red team persisted on them undetected for months. Lessons: these findings map directly onto this course. They show single-sensor dependence (Modules 1 and 3), missing analytics for identity protocols (Module 2), alert-handling gaps (Module 6) and blind populations (Module 1). The value of the assessment came from the collaboration afterwards: specific, prioritised gaps with owners.



## (FICTIONAL TEACHING SCENARIO): The rule that only knew one spelling

This scenario is fictional. Tamarind's encoded-command rule had a 100% unit-test pass rate for a year. When IT rolled out PowerShell 7, the first purple-team replay after the upgrade showed that pwsh.exe launches were invisible to two rules, and that the documented -ec alias was missed. Nobody had added variants to the test plan when the estate changed.

**Lessons:** tie the purple-team plan to change management. A new binary, an agent upgrade or an ATT&CK release triggers a retest.
