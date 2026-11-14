Command-and-control and exfiltration need outbound paths. Controls:

- default-deny egress from server tiers; allow-list destinations (package mirrors, partner APIs) via proxies;
- internal-only networks for data tiers (as in the lab);
- protective DNS / DNS filtering and logging (Course 08 telemetry);
- TLS inspection where lawful and appropriate, with privacy safeguards;
- monitoring for unusual outbound volumes and beacons (Course 08 M08).

Egress control would have limited many incidents in this library - from beaconing malware to large uploads.
