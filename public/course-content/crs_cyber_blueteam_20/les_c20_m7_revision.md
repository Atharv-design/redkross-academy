## Revision

### Summary

Purple teaming joins emulation and detection in short fix cycles. Validation ranges from telemetry replay (safe, logic only) through benign simulation (sensors) to authorised adversary emulation. ATT&CK provides the test plan, but versions drift. In 20.1, Defense Evasion became Stealth and Defense Impairment, and T1070.001 became T1685.005, so tags are migrated with revoked-by data and linted. Variants come from documentation (pwsh's -e and -ec aliases; case-insensitive parameters), alternative binaries and parents. Tamarind's pack detected 5/8 cases; two tuned rules reached 8/8, with all unit tests passing and no change in reference-day hit counts. The new " -e " match brings a documented false-positive risk. AA24-326A shows the real-world cost of untested, single-sensor detection.

### Important concepts

replay versus emulation; version pinning; regression testing.

### Key technical takeaways

generate variants from documentation; lock gains with tests; root-cause each miss.

### Glossary

| Term | Meaning |
|---|---|
| Adversary emulation | Reproducing a threat's behaviour under authorisation. |
| Purple team | Collaborative red and blue validation. |
| Regression test | A check that a change broke nothing that worked. |
| Revoked-by | STIX relationship pointing to a replacement object. |
| Telemetry replay | Feeding recorded or synthetic events to detections. |

### Common mistakes

testing only the author's example; ignoring ATT&CK changes; tuning without a regression set.

### Revision questions

​1. Compare the three validation methods. 2. Explain PT-06's miss. 3. Describe the five-step tuning routine.

### Further reading

[R1]; [R3].

## References

- [R1] CISA. AA24-326A "Enhancing Cyber Resilience: Insights from CISA Red Team Assessment of a US Critical Infrastructure Sector Organization", 21 November 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-326a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-326a) Accessed: 2026-11-07. Supports: EDR over-reliance, IDS gap, LDAP, alerts not reviewed, legacy hosts.
- [R2] MITRE. Enterprise ATT&CK 20.1 STIX data (revoked-by relationships) and tactics list. URL: [https://github.com/mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) Accessed: 2026-11-07. Supports: T1070.001 -> T1685.005; T1562.001 -> T1685; T1562.002 -> T1685.001; TA0005 Stealth; TA0112 Defense Impairment.
- [R3] Microsoft. "about_Pwsh" (PowerShell 7.6). URL: [https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pwsh](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pwsh) Accessed: 2026-11-07. Supports: -EncodedCommand | -e | -ec; case-insensitive parameters.
- [R4] Microsoft. "about_PowerShell_exe" (Windows PowerShell 5.1). URL: [https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_exe?view=powershell-5.1](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_exe?view=powershell-5.1) Accessed: 2026-11-07. Supports: parameter list without short aliases.
- [R5] Lab evidence. purple.py, purple_output.txt, sigma_cli_tuned_output.txt, 2026-11-07.
