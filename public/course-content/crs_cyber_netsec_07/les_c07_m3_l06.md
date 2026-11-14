Two classic patterns a network defender watches for:

| Term | Meaning |
|---|---|
| PORT SCAN | one source contacting many distinct destination ports (or many hosts) in a short time - reconnaissance mapping what is open. Detected by counting distinct ports/hosts per source within a window. |
| BEACONING | a host contacting one destination at a regular, near-constant interval - a hallmark of malware calling home to a command-and-control server. Detected by finding repeated contacts with low variance in the interval. |

Both are behavioural (anomaly-style) and both need thresholds tuned so normal traffic (which is bursty and irregular) does not trigger them. The lab's telemetry embeds one of each, and flowcheck.py (Module 7) detects them: a scan of 60 ports in under a minute, and a host beaconing to the internet at a 60-second interval. Recognising these patterns - and tuning the thresholds so only genuine instances fire - is core network detection.
