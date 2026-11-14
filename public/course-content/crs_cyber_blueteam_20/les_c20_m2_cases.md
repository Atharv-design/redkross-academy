## Volt Typhoon and living off the land, 2024 Context: on 7 February 2024 CISA, the NSA, the FBI and partners published AA24-038A, "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure" [C20-M02-R1]. The advisory describes discovery with built-in tools such as wmic, netsh, ntdsutil and PowerShell. It notes that these techniques let the actors "camouflage their malicious activity with typical system and network behavior". It recommends central log storage and highlights Security Event ID 1102 (log clearing) as an indicator to review. The companion joint guidance on living-off-the-land techniques, of the same date, observes that many organisations lack the capabilities that support detection [C20-M02-R5]. Lessons: built-in tools are not detectable by hash or signature; they are detectable through lineage, command lines, identity context and baselines of normal administration. Central collection makes log clearing visible instead of effective.



## (FICTIONAL TEACHING SCENARIO): The exclude that hid everything

This scenario is fictional. To cut SIEM costs, a Tamarind contractor added a Sysmon exclude rule for process creation under "C:\Users\". Event volume fell by 60% and the change was praised. Three months later a purple-team replay showed that every user-launched script under Downloads, AppData and Public was invisible. The change had never been reviewed, because the Sysmon configuration lived on a file share, not in version control.

**Lessons:** sensor configuration is detection content; review it, test it and version it.
