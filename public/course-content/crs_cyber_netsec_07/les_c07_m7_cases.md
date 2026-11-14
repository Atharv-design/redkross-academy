## Flow telemetry and beaconing detection Context: command-and-control beaconing - malware on an internal host contacting its operator's server at regular intervals - is one of the most reliable network indicators of compromise, and flow telemetry is well suited to detecting it, because the regular timing and destination show up in flow metadata even when the payload is encrypted. Network security monitoring programmes and threat- hunting teams routinely hunt for beaconing by looking for repeated contacts with low timing variance to external destinations, and investigations of major intrusions have found that the C2 beaconing was visible in flow/DNS data for some time before detection [C07-M07-R1][C07-M07-R2]. Why it matters for this module: flow telemetry gives scalable, privacy- preserving visibility of exactly the patterns attackers produce - beaconing, scanning, exfiltration - and detecting them early shortens attacker dwell time. The lab reproduces a detectable beacon. Lessons: collect flow (and DNS) telemetry broadly; hunt for beaconing by timing regularity to external destinations; correlate network signals; and act on them to cut attacker dwell time.



## (FICTIONAL TEACHING SCENARIO): The beacon that gave it away

**Context:** at Himalaya Retail (fictional), a user workstation (10.4.0.21 in the lab telemetry) was compromised by malware, which began beaconing to an external server every 60 seconds - the exact pattern in the lab data.

**What happened:** the workstation looked normal to the user, but its regular, low-variance outbound contacts to one external host stood out clearly in flow telemetry. The same external host was also scanning the DMZ. Network monitoring flagged the beacon and the scan; correlating them pointed to a coordinated intrusion.

**Response:** the team contained it - isolated the workstation to a quarantine segment and blocked its outbound flow to the external host, blocked/limited the scanning source at the perimeter, preserved flow and host evidence, and began investigation and eradication. Segmentation had already prevented the workstation from reaching the database directly (user->db is denied), limiting the damage while response proceeded.

**Lessons:** beaconing is a strong, detectable indicator in flow data; correlate related signals; contain fast at the network layer (isolate host, block flow); and lean on segmentation to limit what a compromised host could reach.
