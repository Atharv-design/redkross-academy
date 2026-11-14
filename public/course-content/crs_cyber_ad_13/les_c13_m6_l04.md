sources

Three high-value, low-noise detections from authentication telemetry:

| Term | Meaning |
|---|---|
| failed-logon bursts | many failures for one account in a short window: password guessing, or a misconfigured service. Alert on a threshold, and correlate with lockouts (4740). |
| weak encryption types | any RC4 (arcfour-hmac) or DES where AES is expected: a possible downgrade or a legacy misconfiguration (Module 2). Because tickets are cracked offline, this is often the only timely signal. |
| privileged-logon sources | where do Tier 0 logons come from? Any Tier 0 logon from an unexpected host breaks the tier model (Module 4) and deserves investigation. |

The lab's auth_monitor.py implements all three against the JSON stream, so you see them computed from real events rather than described in the abstract.
