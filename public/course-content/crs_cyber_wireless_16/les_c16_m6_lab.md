> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Static review of the demo app

**Objective:** Run the static review and categorise the findings by MASVS.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (mobilecheck.py, demo_app/).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** offline; run mobilecheck.py on demo_app.

**Explicit authorised scope:** the provided demo app (yours); static, no execution.

**Step-by-step instructions:**

1. Run mobilecheck.py demo_app and record all findings.
2. Group the findings by MASVS category and by severity.
3. For the three insecure-data-handling findings (hardcoded key, external-storage token, logged token), state the exact fix.
4. Identify which findings are weakened platform defaults.
5. Confirm the review ran without building or executing anything.

**Expected observations (execution-tested):** 16 findings, 9 HIGH; categories span STORAGE/CRYPTO/NETWORK/PLATFORM/CODE.

**Troubleshooting:** if a file is not scanned, confirm demo_app has manifest.json, network_security_config.xml and src/.

**Cleanup:** none.

**Learning outcome:** you can perform and categorise a mobile static review.

## Practical 2: Remediation plan and dynamic-test design

**Objective:** Write a remediation plan and a dynamic-test plan for the demo app.

**Difficulty:** Advanced.

**Required tools:** this module; the mobilecheck output.

**Prerequisites:** Lessons L02-L06.

**Environment setup:** none (design/plan).

**Explicit authorised scope:** the demo app; design only.

**Step-by-step instructions:**

1. For each HIGH finding, write the concrete remediation (per Module 5's model).
2. Prioritise the findings and justify the order.
3. Design a dynamic test plan: how you would confirm the cleartext traffic and storage behaviour on a controlled device/emulator (proxy, storage inspection, log review), on an app you are authorised to test.
4. State the authorisation and data-handling rules for the dynamic test.

**Expected observations:** a prioritised remediation plan and a controlled, authorised dynamic-test plan.

**Troubleshooting:** if a dynamic step would touch a real/third-party app, re-scope to your own demo/test build.

**Cleanup:** none.

**Learning outcome:** you can plan remediation and safe dynamic testing.
