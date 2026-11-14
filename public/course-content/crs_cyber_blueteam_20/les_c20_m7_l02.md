Map each priority technique (Module 1) to test cases, and each test case to the rules expected to fire. ATT&CK releases change the plan. In Enterprise ATT&CK 20.1 the tactic Defense Evasion no longer exists: its content sits under Stealth (TA0005) and Defense Impairment (TA0112). Several techniques were revoked and re-issued. For example, Clear Windows Event Logs (formerly T1070.001) is now T1685.005, Disable or Modify Tools (T1562.001) is now T1685, and Disable Windows Event Logging (T1562.002) is now T1685.001 [R2]. In practice:

- Pin the ATT&CK version that your coverage reports use.
- Use the STIX "revoked-by" relationships to migrate tags automatically, then review the results.
- Lint the tags. In the lab, sigma-cli 3.0.2 flagged the old tags attack.defense-evasion and attack.t1070.001 as invalid. After migration, sigma-cli 4.0.0 reported no issues.
- Expect external content (community rules, vendor mappings, threat reports) to lag behind, and translate it.
