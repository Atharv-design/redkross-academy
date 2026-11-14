Normalisation maps source-specific names to a common schema so one search covers all sources. The demo used Elastic Common Schema-style names [R1]:

```text
------------------------------------------------------------- BEGIN OUTPUT
{"@timestamp": "2026-11-03T06:46:21Z", "destination.ip": "10.40.0.5",
 "destination.port": 3389, "event.action": "drop", "event.module":
 "firewall", "host.name": "fw01", "network.transport": "tcp", "source.ip":
 "203.0.113.66"}
{"@timestamp": "2026-11-03T06:46:00Z", "event.action": "login",
 "event.module": "vpn", "event.outcome": "success", "source.ip":
 "203.0.113.66", "user.name": "gopal"}
--------------------------------------------------------------- END OUTPUT
(execution-tested; wrapped for width)
```

Now a single search on source.ip = "203.0.113.66" finds both the firewall drop of a remote desktop attempt and the successful VPN login - 21 seconds apart - from the same address. Other schemas include the Open Cybersecurity Schema Framework (OCSF) and vendor models; consistency matters more than which one you choose. Enrichment adds context at ingestion or search time: asset owner and criticality, user department, geolocation and ASN of IPs, threat-intel matches (Module 5), and vulnerability data.
