> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Map the lab's wireless threat surface

**Objective:** Identify the threat surface from the lab's AP inventory and scan.

**Difficulty:** Beginner.

**Required tools:** LAB_ASSETS/C16 (data/authorized_aps.json, data/observed_aps.json, roguescan.py).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; open the JSON files and run roguescan.py.

**Explicit authorised scope:** the provided inventory and scan; offline only, no radio activity.

**Step-by-step instructions:**

1. List the authorised SSIDs and BSSIDs from authorized_aps.json.
2. In observed_aps.json, identify which observed APs are authorised, which are impostors (managed SSID on unknown BSSID), and which are foreign.
3. Run roguescan.py and confirm it flags the two evil-twins.
4. For each threat type (eavesdropping, evil-twin, deauth, WPS), name the defensive control.
5. Explain why the SSID is not a security boundary.

**Expected observations (execution-tested):** 2 evil-twin findings; one is OPEN (a credential trap); the authorised BSSIDs match the inventory.

**Troubleshooting:** if nothing is flagged, confirm you passed both JSON files in the right order (authorised first).

**Cleanup:** none.

**Learning outcome:** you can read a wireless threat surface from an inventory and scan.

## Practical 2: Explain the shared-medium threat model

**Objective:** Articulate why wireless defence differs from wired and map threats to controls.

**Difficulty:** Beginner.

**Required tools:** this module.

**Prerequisites:** Lessons L04-L06.

**Environment setup:** none.

**Explicit authorised scope:** written exercise.

**Step-by-step instructions:**

1. In your own words, state the three ways the shared medium changes the threat model.
2. Build a table mapping each Wi-Fi threat (eavesdropping, weak crypto, rogue AP, evil twin, deauth, WPS) to its defensive control.
3. State the defender's three goals and how each is achieved.
4. State the authorisation boundary for wireless assessment.

**Expected observations:** a clear threat-to-control table and a correct statement of the authorisation boundary.

**Troubleshooting:** if a threat has no control, revisit L05.

**Cleanup:** none.

**Learning outcome:** you can reason about the wireless threat model and lawful scope.
