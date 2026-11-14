Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Flow data shows an internal host contacting one external IP every 60 seconds.

**Task:** Explain what this likely is and the containment steps.

> [!TIP] Model answer
> This is likely command-and-control beaconing - malware on the internal host contacting its operator's server at a regular interval (the low timing variance is the tell). Containment: isolate the host (quarantine segment or block its switch port) to stop it acting while preserving it for investigation; block the outbound flow to the external IP at the firewall; preserve flow/host evidence; and begin investigation and eradication. Check whether other hosts beacon to the same destination.
>
> **Lesson:** regular-interval outbound contacts signal C2; isolate the host, block the flow, preserve evidence and investigate.

## Scenario 2

A team wants to capture full packets everywhere, permanently, for monitoring.

**Task:** Explain the problems and the better approach.

> [!TIP] Model answer
> **Problems:** capturing full packets everywhere permanently is enormously storage-heavy, raises serious privacy concerns (it records content), and much payload is encrypted anyway - it does not scale for broad monitoring. Better approach: use flow telemetry (NetFlow/IPFIX) network-wide for scalable, privacy-preserving pattern detection, plus DNS and firewall logs, and reserve targeted packet capture for deep investigation of specific suspicious activity.
>
> **Lesson:** monitor broadly with flow telemetry; use packet capture selectively for deep dives.

## Scenario 3

Monitoring finds a flow from a user host to the database, which policy forbids.

**Task:** Explain the significance and the response.

> [!TIP] Model answer
> **Significance:** a user->database flow violates the segmentation policy and is a prime lateral-movement path - either a compromised workstation attempting to reach data or a serious misconfiguration that opened the path. Response: investigate the host and the flow; contain (isolate the host, ensure the enforcing firewall denies user->db); confirm no data was accessed; fix the segmentation gap and re-validate; and preserve evidence. Treat it as a potential incident, not just a policy note.
>
> **Lesson:** a forbidden flow is a lateral-movement signal; investigate, contain, fix the gap and validate.
