**Indicator types:**

| Term | Meaning |
|---|---|
| atomic | a single value: IP address, domain, URL, e-mail address |
| computed | derived from data: file hashes (SHA-256, MD5), fuzzy hashes, certificate fingerprints |
| behavioural | patterns of activity: "Office application starts PowerShell with an encoded command" (Module 7, Course 20) |

David Bianco's Pyramid of Pain (March 2013) ranks indicator types by how much pain denying them causes the adversary, from bottom to top: hash values, IP addresses, domain names, network and host artefacts, tools, and tactics, techniques and procedures (TTPs) at the apex [R1]. Hashes change with one recompiled byte; addresses and domains cost little to replace; changing tools or behaviour costs much more. IOC operations work in the lower layers - useful, quick, but short-lived - and should feed the behaviour-based detection of Module 7.
