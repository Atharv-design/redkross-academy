> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the BIA checks

---------------------------------------------------

**Objective:** Use the toolkit to test recovery capability against objectives.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py bia and record the issues.
2. Add a "stateless" flag to SYSTEMS and skip the RPO check for stateless systems. Mark the web cluster stateless and rerun.
3. Add a fourth process, "warehouse scanning" (MTD 12h, RTO 4h, RPO 0.5h), with dependencies of your choice, and resolve any gaps.
4. For the courier API gap, write three options with cost and risk.

**Expected observations:** the portal issue disappears once statelessness is modelled, and new gaps appear for warehouse scanning unless dependencies are fast.

**Troubleshooting:** keep hours as numbers; 0 means continuous replication.

**Cleanup:** none.

**Learning outcome:** you can test BIA consistency.

## Practical 2: Tabletop exercise - supplier-caused outage

----------------------------------------------------------------

**Objective:** Run a 60-minute tabletop based on a CrowdStrike-style event.

**Difficulty:** Professional.

**Required tools:** scenario injects; 4-8 participants.

**Prerequisites:** Lessons L04-L06.

**Environment setup:** assign roles (crisis lead, IT, operations, comms, legal, supplier manager).

**Explicit authorised scope:** discussion only.

**Step-by-step instructions:**

1. Inject 1: 06:00, all Windows depot PCs crash in a reboot loop.
2. Inject 2: 07:30, the vendor publishes remediation that needs manual steps per device and encryption recovery keys.
3. Inject 3: 09:00, customers ask about delayed deliveries and a media query arrives.
4. Record decisions: activate BC, use manual dispatch, prioritise devices, retrieve recovery keys, communicate, and decide whether any notification applies.
5. List at least five improvement actions with owners.

**Expected observations:** gaps in recovery key access, manual process readiness and supplier escalation.

**Troubleshooting:** keep to time and capture decisions, not perfect answers.

**Cleanup:** archive notes.

**Learning outcome:** you can exercise continuity plans.
