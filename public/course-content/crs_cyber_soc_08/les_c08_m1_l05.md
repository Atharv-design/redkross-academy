```text
MTTD   mean time to detect (event to alert/notice).
MTTA   mean time to acknowledge (alert to analyst picks it up).
MTTR   mean time to respond/resolve (alert to containment or closure).
Volume and false-positive rate per rule.
Coverage: share of critical assets and ATT&CK techniques with telemetry
and detections (Course 20 Module 7).
```

**Pitfalls:** metrics drive behaviour - rewarding fast closure encourages closing real alerts as false positives; medians resist outliers better than means; always pair speed with quality reviews.

Execution-tested metric calculation (LAB_ASSETS/C08/soc_metrics.py; see deep dive).
