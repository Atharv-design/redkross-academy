Logging is a pipeline with five stages, each a design decision:

| Term | Meaning |
|---|---|
| Generate | which events each system records (authentication, authorisation decisions, configuration and policy changes, privileged actions, data access for restricted stores, errors). |
| Collect | agents or native forwarding to collectors; buffering when the network is down; at least two collectors. |
| Transport | encrypted (TLS), authenticated sources, back-pressure handling. |
| Store | a central store with write-once or immutable retention, access separated from the administrators of the logged systems. |
| Use | search, correlation and detection (Course 08), dashboards, investigation, evidence export (Course 09). |

**Design rules:**

- An enterprise-approved logging policy states sources, events, retention and owners. NIST's log-management planning guide (SP 800-92 Rev. 1, initial public draft, October 2023) and the ASD-led joint guidance "Best Practices for Event Logging and Threat Detection" (August 2024) are good starting points [C22-M06-R3, R4].
- Retention follows law and need: Indian CERT-In directions require ICT system logs to be kept for 180 days within India [R7]; many investigations need a year or more.
- Time: every source synchronised to a common reference (NTP from approved servers); without it, timelines across systems are unreliable.
- Integrity: an attacker with administrator rights on a server should not be able to alter the central copy of its logs; immutability and separated access deliver that.
- Health: alert when a source stops sending. A silent source looks identical to a quiet one unless you monitor the pipeline itself.
