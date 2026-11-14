> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Validate the lab's segmentation

**Objective:** Validate the lab's connections against the zero-trust matrix and identify every violation and its risk.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (segmentation.py, data/rk_segmentation.json, data/connections.json).

**Prerequisites:** Lessons L02-L04, L06.

**Environment setup:** none (offline).

**Explicit authorised scope:** offline policy and connection documents only.

**Step-by-step instructions:**

1. Run python segmentation.py and record the three violations.
2. For each violation, state which boundary it crosses and the lateral-movement risk it represents.
3. In rk_segmentation.json, confirm the database is reachable only from app and mgmt.
4. State which hardened firewall rules (Module 2) enforce the denial of user->db and internet->db.
5. Explain how validation differs from enforcement.

**Expected observations (execution-tested):** 3 of 7 connections violate the policy (user->db, internet->db, user->mgmt); the database's only allowed sources are app and mgmt.

**Troubleshooting:** if a flow you expect to be allowed is a violation, check it is listed in the matrix; absence means denied.

**Cleanup:** none.

**Learning outcome:** you can validate network flows against a segmentation policy and interpret violations.

## Practical 2: Design a micro-segmentation improvement

**Objective:** Propose a tighter segmentation for a sensitive flow.

**Difficulty:** Intermediate.

**Required tools:** this module; the matrix.

**Prerequisites:** Lessons L02-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. Choose the app->db:5432 flow and propose how to restrict it further (specific hosts, not whole zones; one port; monitored).
2. Explain how micro-segmentation would reduce blast radius if one app server is compromised.
3. Write the allowed-flow entries for your tighter design.
4. State how you would validate it continuously.

**Expected observations:** a least-privilege, monitored, host-level flow with continuous validation.

**Troubleshooting:** if your design still allows a whole zone to the database, tighten it.

**Cleanup:** none.

**Learning outcome:** you can design and validate tighter (micro) segmentation.
