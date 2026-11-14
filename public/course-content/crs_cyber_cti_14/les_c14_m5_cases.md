## GRIZZLY STEPPE and indicator caveats, 2016 Context: on 29 December 2016 DHS and the FBI published Joint Analysis Report JAR-16-20296A, "GRIZZLY STEPPE - Russian Malicious Cyber Activity" [C14-M05-R2]. Its indicators of compromise were provided in accompanying .csv and .stix files, together with a YARA rule. What the report advised: network administrators should review the IP addresses, file hashes and YARA signature, add the IPs to watchlists and review perimeter netflow or firewall logs. It warned that organisations "may find numerous instances of these IPs attempting to connect to their systems" and that "some traffic may correspond to malicious activity, and some may correspond to legitimate activity". Lessons: - Even authoritative indicator sets need local validation; the report itself recommended watchlisting and review, not blind blocking. - Address indicators without time, role and context generate investigation work in proportion to how widely the addresses are used. - Distribute indicators in machine-readable formats (the JAR used CSV and STIX) with enough context to triage.



## (FICTIONAL TEACHING SCENARIO): The update service outage

**Context:** Nilgiri Mutual (fictional) connected a free feed directly to its DNS resolver blocklist to "get protection quickly".

**What happened:** the feed's entry for a software update host (contacted by a malware sample in a sandbox) was blocked. For three days laptops failed to update; a patch for an actively exploited browser flaw did not install; the help desk could not explain why.

**Response:** feeds now pass through the pipeline (validation, allowlist, scoring) before any control; blocklists require activation thresholds and expiry; an allowlist of critical services is owned by IT operations and reviewed quarterly; sightings and false positives are reported back to the feed provider.

**Lessons:** unmanaged indicators can cause outages and weaken security. Treat IOC deployment as a change with risk.
