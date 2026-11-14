> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

​### Objectives

Perform a complete, authorised, offline wireless-and-mobile assessment of your own lab environment - wireless (rogue detection and Wi-Fi hardening), Bluetooth, mobile app and mobile API - with enforcing FAIL-to-PASS evidence, detective findings, and a presented deliverable mapped to a secure baseline.

​### Scenario

You are the wireless-and-mobile security assessor for a fictional organisation. You assess its own network, Bluetooth configuration, mobile app and backend API, all provided as the lab's configurations, demo app and data. Everything is offline and authorised; no radio activity against others, no third-party API, and no access to systems you do not own are in scope.

​### Requirements

1. Scope/authorisation: confirm the work is on your own lab data, offline and do-no-harm (scope.md); state out-of-scope and stop conditions.
2. Wireless: run roguescan.py (evil-twin detection) and wifireview.py (insecure and hardened); record the rogue findings and the Wi-Fi FAIL -> PASS evidence.
3. Bluetooth: run btreview.py (insecure and hardened); record the Bluetooth FAIL -> PASS evidence.
4. Mobile app: run mobilecheck.py over the demo app; record the 16 findings by MASVS category and severity.
5. Mobile API: run apicheck.py (insecure and hardened); record the API FAIL -> PASS evidence.
6. Consolidate: run review.py; confirm 3/3 enforcing control domains PASS and list the detective findings.
7. Present: write the deliverable - scope, method/tools, findings by area with severity, enforcing evidence, remediation mapped to the secure baseline, and verification (re-run to PASS) - with a summary and the detail.
8. Mandatory gate: evidence that every step was performed offline on your own lab data, with no radio activity against others and no third-party system touched.

​### Deliverables

- Completed scope/authorisation statement.
- The saved tool outputs (roguescan, wifireview, btreview, mobilecheck, apicheck, review) from data/.
- A written assessment: scope; findings by area (Wi-Fi, Bluetooth, app, API, rogue APs) with severity; enforcing FAIL-to-PASS evidence for the three control domains; remediation mapped to the secure baseline; and verification.
- A short summary for decision-makers plus the detailed evidence for engineers.

​### Rubric (0-4 per criterion; Competent = 3)

```text
Scope and authorisation: own-data, offline, do-no-harm scope confirmed.
Wireless: evil-twin findings and Wi-Fi FAIL -> PASS evidence correct.
Bluetooth: Bluetooth FAIL -> PASS evidence correct.
Mobile app: 16 findings categorised by MASVS; insecure data handling identified.
Mobile API: API FAIL -> PASS evidence; client-untrusted reasoning sound.
Consolidation: 3/3 enforcing PASS plus detective findings presented.
Presentation: findings by area, enforcing evidence, prioritised remediation,
  both audiences.
Professionalism and ethics: offline, authorised, do-no-harm throughout; every
  claim traced to a saved output.
```

​### Professional skills

End-to-end wireless-and-mobile assessment, rogue/evil-twin detection, Wi-Fi and Bluetooth hardening, mobile static review and insecure-data-handling analysis, mobile API hardening, enforcing verification, and clear, authorised reporting.
