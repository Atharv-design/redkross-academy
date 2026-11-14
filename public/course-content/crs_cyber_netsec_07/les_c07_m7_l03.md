Flow telemetry reveals several attack patterns behaviourally:

```text
Port scan / host sweep  one source contacting many ports (or many hosts) in a
  short time - reconnaissance.
Beaconing               a host contacting one destination at a regular
  interval - malware command-and-control.
Exfiltration            unusually large outbound transfers, especially to new
  or unusual destinations.
Lateral movement / policy violation  flows that cross segmentation boundaries
  that should be denied (e.g. a user host reaching the database).
```

The lab's flowcheck.py detects three of these against the telemetry: the port scan, the beaconing host, and segmentation violations (flows the zero-trust matrix forbids). These are the same behavioural detections an IDS or a SIEM correlation rule performs, and they are the raw material of threat hunting (Course 20).
