An endpoint that stops reporting is either broken or being attacked.

**Monitor:**

- heartbeat and event volume per host (a sudden drop to zero);
- Sysmon service state (Event ID 4) and errors (Event ID 255);
- Security log cleared (1102) - ATT&CK T1685.005 in version 20.1;
- audit policy changes (4719) and EDR tamper alerts.

AA24-038A lists Security Event ID 1102 among the indicators defenders should review [R1]. On WS-07, the 1102 at 12:40 did not erase the evidence because the events had already been forwarded. Central collection is the main defence against log clearing.
