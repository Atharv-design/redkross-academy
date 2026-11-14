> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Review and harden the Wi-Fi configuration

**Objective:** Review the weak configuration, harden it, and confirm PASS.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (wifireview.py, data/wifi_config.json, data/wifi_config_fixed.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; run wifireview.py on both configs.

**Explicit authorised scope:** the provided configuration (your own network's); offline, no radio activity.

**Step-by-step instructions:**

1. Run wifireview.py on wifi_config.json; record all findings and their severities.
2. For each HIGH finding, state the control and the fix.
3. Run wifireview.py on wifi_config_fixed.json; confirm 0 findings/PASS.
4. Compare the two configs field by field to see each fix.
5. Explain why WPA3+PMF+SAE+no-WPS is the modern baseline.

**Expected observations (execution-tested):** weak = 10 findings (6 HIGH) FAIL; hardened = 0 findings PASS.

**Troubleshooting:** if the fixed config still fails, confirm you passed the _fixed file.

**Cleanup:** none.

**Learning outcome:** you can review and harden a WLAN configuration and prove it.

## Practical 2: Choose the authentication mode

**Objective:** Decide Personal vs Enterprise for given scenarios and justify.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L02 and L06.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. For a corporate HQ WLAN, a small branch, and a guest network, choose Personal (PSK/SAE) or Enterprise (802.1X) and justify.
2. State the security advantages of Enterprise (per-identity auth, revocation).
3. For a Personal network, specify a passphrase policy.
4. State why PMF must be required in all cases.

**Expected observations:** Enterprise for corporate; Personal/SAE with a strong passphrase for guest/small; PMF required throughout.

**Troubleshooting:** if you chose Personal for corporate, reconsider revocation and accountability.

**Cleanup:** none.

**Learning outcome:** you can select and justify Wi-Fi authentication modes.
