> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Design secure wireless for the lab organisation

**Objective:** Produce a secure WLAN design covering mode, authentication, segmentation and detection.

**Difficulty:** Intermediate.

**Required tools:** this module; the lab zone model (Module 1).

**Prerequisites:** Lessons L01-L06.

**Environment setup:** none (design exercise; no wireless activity).

**Explicit authorised scope:** design only.

**Step-by-step instructions:**

1. Choose the security mode and authentication for corporate and guest Wi-Fi and justify each.
2. Specify how wireless is segmented from sensitive zones (guest isolated; corporate least-privilege).
3. Specify rogue-AP detection against an AP inventory.
4. List three configuration-hardening items (WPS disabled, defaults changed, firmware patched, protected management frames).
5. Explain how your design prevents a rogue AP from reaching the database.

**Expected observations:** WPA3-Enterprise corporate Wi-Fi, isolated guest Wi-Fi, segmentation, and rogue-AP detection against an inventory.

**Troubleshooting:** if your design gives wireless users flat internal access, apply segmentation.

**Cleanup:** none.

**Learning outcome:** you can design a secure, segmented, monitored WLAN.

## Practical 2: Rogue-AP detection logic

**Objective:** Specify how to detect a rogue or evil-twin AP.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. Describe the authoritative AP inventory (approved SSID/BSSID list).
2. Write the rule for a rogue AP (an SSID/BSSID not in the inventory).
3. Write the rule for a possible evil twin (an approved SSID broadcast from an unexpected BSSID).
4. Explain how correlating wireless with wired observations strengthens detection.

**Expected observations:** detection built on a known-good baseline and deviation, mirroring IDS and flow monitoring.

**Troubleshooting:** if your detection has no baseline inventory, add one.

**Cleanup:** none.

**Learning outcome:** you can specify rogue-AP detection logic.
