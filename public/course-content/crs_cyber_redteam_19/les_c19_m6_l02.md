At a conceptual level, C2 architectures share common ideas (described here to inform DETECTION, not construction):

```text
beaconing      the implant checks in on an interval to receive commands, producing
               periodic outbound connections.
common protocols C2 commonly rides application-layer protocols (web, DNS) so it
               blends with legitimate traffic (ATT&CK T1071).
redirection    adversaries may route C2 through intermediaries to hide the true
               server (relevant to indicators and attribution).
resilience     multiple channels/fallbacks so losing one does not end control.
```

The defensive takeaway is that each of these leaves a signature: periodicity, unusual destinations, protocol anomalies. Defenders do not need the adversary's tooling to detect these; they need the network telemetry and the right analytics. The lab treats C2 purely as a set of indicators to detect and contain.
