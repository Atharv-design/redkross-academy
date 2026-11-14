LAB_ASSETS/C07/review.py consolidates the per-layer checks into one assessment. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
Network security assessment: control summary
--------------------------------------------------
Firewall policy
  before: 4 finding(s) (1 HIGH)            FAIL
  after : 0 finding(s)                     PASS
Segmentation (zero-trust flows)
  before: 3 violation(s)                   FAIL
  after : 0 violation(s)                   PASS
TLS configuration
  before: 6 finding(s) (5 HIGH, 1 MEDIUM)  FAIL
  after : 0 finding(s)                     PASS
Monitoring (flow telemetry)
  signals: 1 scan, 1 beacon, 3 seg-violations -> investigate/contain
--------------------------------------------------
Enforcing controls: 3/3 moved FAIL -> PASS.
Monitoring: detections firing; residual signals require response.
```

**Reading the assessment:**

- The three enforcing controls (firewall, segmentation, TLS) each moved from FAIL to PASS, with finding counts as evidence - the hardening is verified, not asserted.
- The monitoring layer is doing its job: the flow detections fire, surfacing a scan, a beacon and segmentation violations that require investigation and containment (Module 7). These are residual-risk signals, not static-policy failures - the network is watched, and the watch works.
- Every number in the summary is reproducible by re-running firewall.py, segmentation.py, tlscheck.py and flowcheck.py - the assessment is evidence, not opinion.

This is the whole course in one view: defence-in-depth across layers, each enforcing control hardened and verified FAIL->PASS, and monitoring confirmed to detect what the static controls cannot. Everything is offline, on assets you own.
