> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Model the lab network into zones and flows

**Objective:** Produce the zone model and permitted-flow list for the lab network and identify the crown jewel and its allowed paths.

**Difficulty:** Intermediate.

**Required tools:** LAB_ASSETS/C07 (data/rk_segmentation.json); a text editor.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** none (offline reading and modelling).

**Explicit authorised scope:** offline design documents only.

**Step-by-step instructions:**

1. List the six zones and classify each by trust level.
2. From rk_segmentation.json, list the permitted zone-to-zone flows.
3. Identify the crown jewel (db) and every permitted path to it.
4. Name three boundary crossings that must be denied (e.g. user->db).
5. Draw the reference architecture (arrows = permitted flows).

**Expected observations (execution-tested basis):** db reachable only from app:5432 and mgmt:22; no user/internet path to db; three forbidden crossings are user->db, internet->db, user->mgmt.

**Troubleshooting:** if a flow seems missing, remember the default is deny - absence means denied.

**Cleanup:** none.

**Learning outcome:** you can model a network into zones and permitted flows.

## Practical 2: Threat-model a boundary

**Objective:** Threat-model the database boundary and justify its controls.

**Difficulty:** Intermediate.

**Required tools:** this module; the zone model.

**Prerequisites:** Lessons L01-L04.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. State the asset (customer database) and two adversaries (external attacker; compromised internal host).
2. List the only paths that should reach the database and why.
3. For each forbidden path (user->db, internet->db), state the control that denies it and the monitoring that detects an attempt.
4. Explain how defence in depth protects the database even if the web tier is compromised.

**Expected observations:** the database is protected by least-privilege flows, default-deny, and monitoring; a compromised DMZ still cannot reach it directly.

**Troubleshooting:** if your model allows a direct user->db path, revisit least privilege.

**Cleanup:** none.

**Learning outcome:** you can threat-model a boundary and justify its controls.
