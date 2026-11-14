An assessment should leave behind a secure baseline:

| Term | Meaning |
|---|---|
| Wi-Fi | WPA3 (or WPA2-AES with PMF), no WPS, strong admin/firmware, guest isolation (Module 2). |
| Bluetooth | Secure Connections, no Just Works for sensitive pairing, non-discoverable, minimal services (Module 4). |
| mobile app | private encrypted storage, keystore keys, TLS-only, strong crypto, unexported components, least privilege, release flags (Modules 5-6). |
| mobile API | validated short-lived tokens, TLS everywhere, per-object authorisation, rate limiting, minimal data (Module 7). |
| monitoring | rogue-AP detection and logging (Modules 1, 3) feeding operations. |

The enforcing reviews become the baseline's acceptance tests: a configuration is acceptable when its review PASSES. This turns the assessment into durable security.
