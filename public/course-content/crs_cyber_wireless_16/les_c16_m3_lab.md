> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Detect rogue and evil-twin APs

**Objective:** Classify a provided scan against the authorised inventory.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (roguescan.py, data/authorized_aps.json, data/observed_aps.json).

**Prerequisites:** Lessons L03-L04.

**Environment setup:** offline; run roguescan.py.

**Explicit authorised scope:** the provided inventory and scan; offline, no radio activity.

**Step-by-step instructions:**

1. Run roguescan.py and record each AP's classification.
2. For each evil-twin, note the BSSID, security and signal, and why it is flagged.
3. Explain why the OPEN strong-signal twin is especially dangerous.
4. State the correct response (investigate/remove physically - not attack).
5. Explain why maintaining a BSSID inventory is essential to detection.

**Expected observations (execution-tested):** 2 evil-twins flagged; authorised BSSIDs OK; foreign network informational.

**Troubleshooting:** if an authorised AP is flagged, check the inventory BSSIDs match the scan.

**Cleanup:** none.

**Learning outcome:** you can detect impostor APs from a scan and an inventory.

## Practical 2: Produce a wireless assessment summary

**Objective:** Combine configuration review and rogue detection into an assessment.

**Difficulty:** Intermediate.

**Required tools:** Python 3; wifireview.py, roguescan.py, data/.

**Prerequisites:** Modules 2-3.

**Environment setup:** offline; run both tools.

**Explicit authorised scope:** the provided data; offline.

**Step-by-step instructions:**

1. Run wifireview.py on the weak and hardened configs; record the before/after.
2. Run roguescan.py; record the impostor findings.
3. Write a one-page assessment: configuration status (FAIL -> PASS with evidence), rogue/evil-twin findings, and prioritised remediation.
4. State the authorisation/scope under which the assessment was done (offline, owned data).

**Expected observations:** config FAIL -> PASS; 2 evil-twins to investigate; a clear remediation list.

**Troubleshooting:** ensure each claim traces to a tool output.

**Cleanup:** none.

**Learning outcome:** you can produce an evidence-based wireless assessment.
