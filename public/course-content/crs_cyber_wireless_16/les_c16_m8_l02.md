The lab's review.py runs the whole assessment in one pass:

| Term | Meaning |
|---|---|
| enforcing controls | it re-runs the three configuration reviews - Wi-Fi (wifireview), Bluetooth (btreview) and API (apicheck) - over their insecure and hardened inputs, confirming each moves from FAIL to PASS. This is the enforcing evidence: proof the controls actually work. |
| detective findings | it reports the mobile-app static findings (mobilecheck: 16 findings, 9 HIGH) and the rogue/evil-twin findings (roguescan: 2 evil-twins), which are assessment findings to remediate. |

The result is a single consolidated view: three control domains enforced to PASS, plus the app and rogue findings to fix. The deep dive walks the output. The point is one reproducible assessment covering the whole course, produced offline.
