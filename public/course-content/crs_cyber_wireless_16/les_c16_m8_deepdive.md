Running review.py (execution-tested, CPython 3.14.4, 2026-11-08; abridged):

```output
== Wireless and mobile consolidated review ==

[enforcing controls - FAIL (insecure) -> PASS (hardened)]
  Wi-Fi      (wifireview): insecure 10 findings, 6 HIGH -> FAIL ;
                           hardened 0 -> PASS
  Bluetooth  (btreview)  : insecure  6 findings, 3 HIGH -> FAIL ;
                           hardened 0 -> PASS
  API        (apicheck)  : insecure  7 findings, 5 HIGH -> FAIL ;
                           hardened 0 -> PASS
  => 3/3 control domains enforced FAIL -> PASS

[assessment findings - to remediate]
  Mobile app (mobilecheck): 16 findings, 9 HIGH (STORAGE/CRYPTO/NETWORK/
                            PLATFORM/CODE)
  Rogue APs  (roguescan)  : 2 evil-twin AP(s) on SSID HimalayaCorp
                            (unknown BSSIDs; one OPEN, one WPA2)

SUMMARY: 3/3 enforcing control domains PASS after hardening;
         18 detective findings to remediate (16 app, 2 rogue AP).
```

**Reading the consolidated review:**

- ENFORCING EVIDENCE: all three configuration domains (Wi-Fi, Bluetooth, API) fail insecure and pass hardened - reproducible proof the controls work. These become the secure baseline's acceptance tests.
- DETECTIVE FINDINGS: the mobile-app static review (16 findings, 9 HIGH, mostly insecure data handling) and the rogue-AP scan (2 evil-twins) are findings to remediate - fix the app per Modules 5-6, and investigate/remove the rogue APs per Modules 1, 3.
- COVERAGE: wireless, Bluetooth, app and API - the whole course in one assessment.

Everything was produced offline against the lab's own configurations, demo app and synthetic/observed data - no radio activity against others, no third-party API called, nothing exploited. This is the capstone deliverable's evidence.
