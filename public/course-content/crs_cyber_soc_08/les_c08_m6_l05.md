MITRE ATT&CK is a knowledge base of adversary tactics (goals) and techniques (how) based on real-world observations [R2]. ATT&CK content version 20.1 has 15 Enterprise tactics; in the 2026 releases the former Defense Evasion tactic was split into Stealth (TA0005) and Defense Impairment (TA0112). Some techniques moved accordingly: clearing Windows event logs is now T1685.005 "Clear Windows Event Logs" under Defense Impairment (sub-technique of T1685 Disable or Modify Tools), whereas older material cites T1070.001 [R3]. Always check the version you map to and record it. Mapping the Banyan storyline (techniques verified on attack.mitre.org, 2026-11-07):

```text
Event (dataset)                  Technique                       Tactic
invoice.docm download/open       T1566.001 Spearphishing Attach. Initial Access
Word spawns PowerShell (R1)      T1204.002 Malicious File        Execution
                                 T1059.001 PowerShell            Execution
regular HTTPS beacon (R6)        T1071.001 Web Protocols         Command and
                                                                 Control
VPN spray (R2)                   T1110.003 Password Spraying     Credential
                                                                 Access
VPN login with gopal's password  T1078 Valid Accounts;           Initial Access
                                 T1133 External Remote Services
svc_update created (4720, R3)    T1136.001 Local Account         Persistence
added to Administrators (4732)   T1098.007 Additional Local or   Persistence,
                                 Domain Groups                   Priv. Esc.
48.2 MB upload (R4)              T1567.002 Exfiltration to Cloud Exfiltration
                                 Storage (if the site is a
                                 storage service - hypothesis)
Security log cleared (R5)        T1685.005 Clear Windows Event   Defense
                                 Logs                            Impairment
```

**Mapping is a judgment:** tag what the rule actually detects, not everything the attacker might be doing. Coverage analysis then asks, per technique relevant to your threats: do we collect the data source, do we have a detection, has it been tested? Tools such as the ATT&CK Navigator display coverage as a heat map. Beware of "coverage theatre" - one weak rule per technique coloured green.
