A good hypothesis is specific, testable and tied to a threat:

```text
Weak:   "Look for bad things on endpoints."
Better: "An adversary with a foothold may use a regular HTTPS beacon to
        C2; if so, some host-URL pair will show many requests at
        near-constant intervals, regardless of whether the domain is in a
        feed."
```

**Sources of hypotheses:** threat intelligence (Module 5; for example the Volt Typhoon advisory's guidance to review VPN logins for unusual frequency or duration and to check directories such as C:\windows\temp\ and C:\users\public\ for unexpected files [R1]); ATT&CK techniques lacking detections (Module 6 coverage gaps); incident findings ("did the same actor touch other hosts?"); and environment changes (new VPN, new cloud service). Before hunting, list data requirements: which source, which fields, which time range, and whether they are actually present. If they are not, the first finding is a telemetry gap.
