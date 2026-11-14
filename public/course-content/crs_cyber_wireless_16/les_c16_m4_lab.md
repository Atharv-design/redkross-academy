> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Review and harden the Bluetooth configuration

**Objective:** Review the weak Bluetooth device, harden it, and confirm PASS.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (btreview.py, data/bt_config.json, data/bt_config_fixed.json).

**Prerequisites:** Lessons L02-L05.

**Environment setup:** offline; run btreview.py on both configs.

**Explicit authorised scope:** the provided configuration (your own device's); offline, no Bluetooth activity.

**Step-by-step instructions:**

1. Run btreview.py on bt_config.json; record all findings and severities.
2. For each HIGH finding, state the control and the fix.
3. Run btreview.py on bt_config_fixed.json; confirm 0 findings/PASS.
4. Compare the two configs field by field.
5. Explain why Just Works and LE legacy pairing are high severity.

**Expected observations (execution-tested):** weak = 6 findings (3 HIGH) FAIL; hardened = 0 findings PASS.

**Troubleshooting:** if the fixed config still fails, confirm you passed the _fixed file.

**Cleanup:** none.

**Learning outcome:** you can review and harden a Bluetooth/BLE configuration.

## Practical 2: Choose the association model

**Objective:** Select the right pairing model for devices with different I/O.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. For a headset (no display/input), a smartwatch (display + button), and a keyboard (input only), choose an association model and justify.
2. State which choices provide MITM protection and which do not.
3. Explain why LE Secure Connections should be required regardless.
4. State a discoverability and key-size policy.

**Expected observations:** authenticated models (Numeric Comparison/Passkey) where I/O allows; Just Works only where unavoidable; Secure Connections throughout.

**Troubleshooting:** if you chose Just Works for a device with a display, reconsider.

**Cleanup:** none.

**Learning outcome:** you can select Bluetooth pairing based on device I/O and risk.
