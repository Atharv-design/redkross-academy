## Revision

### Summary

Lateral movement (ATT&CK tactic Lateral Movement, TA0008) is how an adversary spreads from an initial foothold to its objective, abusing LEGITIMATE access - valid credentials, Remote Services (T1021) and alternate authentication material (T1550) - so movement blends with normal administration. It exploits TRUST RELATIONSHIPS (account trust like reused local admin, host/service trust like remote management, and domain trust): the more broadly a credential or trust is honoured, the farther an adversary can move. The structural defence is to NARROW that trust and VALIDATE SEGMENTATION - confirm, with an allowed-flow/default-deny matrix, that cross-segment and cross-tier paths which should be blocked actually are (reusing Course 07/13). Each hop is also a DETECTION OPPORTUNITY: it crosses a boundary and touches authentication and network telemetry, so behavioural, cross-host detections (an unusual remote-service logon path; a logon with alternate auth material and no interactive logon) catch the hops that remain. CONTAINMENT (segmentation, tiering, credential hygiene, Protected Users) and detection combine - block what you can, detect the rest. The lab's attackmap.py (Lateral Movement filter) maps T1021 and T1550 to their telemetry, detections and containment. The module is deliberately CONCEPTUAL and defensive - no intrusion how-to - with any emulation confined to the isolated, simulation-only range.

### Important concepts

lateral movement; trust relationships; segmentation validation; T1021/T1550; detection opportunities; containment.

### Key technical takeaways

narrow broad trust; validate that blocked paths are blocked; detect hops behaviourally across hosts; pair segmentation/credential containment with detection; keep it conceptual and isolated.

### Glossary

| Term | Meaning |
|---|---|
| lateral movement | moving from a foothold to other hosts/accounts toward a goal. |
| trust relationship | pre-existing access (account/host/domain) that movement abuses. |
| segmentation validation | confirming paths that should be blocked are blocked. |
| detection opportunity | a boundary crossing that telemetry can reveal. |
| credential hygiene | unique, least-privilege, protected credentials. |

### Common mistakes

broad flat trust; unvalidated segmentation; signature-only detection; detection without containment; treating intrusion as the deliverable.

### Revision questions

​1. What trust does lateral movement abuse? 2. What does segmentation validation confirm? 3. Give the detection and containment for T1021.

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] MITRE. "ATT&CK - Lateral Movement (TA0008); Remote Services (T1021)". URL: [https://attack.mitre.org/tactics/TA0008/](https://attack.mitre.org/tactics/TA0008/) Accessed: 2026-11-08. Supports: the tactic and techniques and their detection.
- [R2] MITRE. "ATT&CK - Use Alternate Authentication Material (T1550)". URL: [https://attack.mitre.org/techniques/T1550/](https://attack.mitre.org/techniques/T1550/) Accessed: 2026-11-08. Supports: alternate authentication material and its detection.
- [R3] NIST. "SP 800-207: Zero Trust Architecture" (segmentation and default- deny). URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-08. Supports: segmentation validation and narrowing trust.
- [R4] Lab evidence. attackmap.py (Lateral Movement filter) mapping T1021 and T1550 to telemetry, detection and containment (CPython 3.14.4), LAB_ASSETS/C19/data/attackmap_output.txt, 2026-11-08. Supports: the detection- opportunity deep dive.
