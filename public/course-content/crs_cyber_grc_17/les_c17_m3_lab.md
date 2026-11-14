> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Close CSF coverage gaps

---------------------------------------------

**Objective:** Use the toolkit to find and close mapping gaps.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lessons L02, L05.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py csf and record the gaps.
2. Write new controls TL-13 to TL-17 that address GV.OC, GV.RR, ID.IM, PR.IR, RS.AN, RS.MI and RC.CO. One control may cover several.
3. Add them to CONTROLS with mappings and rerun until 22/22.
4. For two of the new controls, write the test procedure and evidence.

**Expected observations:** 22/22 coverage. Note that coverage does not mean effectiveness.

**Troubleshooting:** category IDs must match exactly (for example "RS.MI").

**Cleanup:** none.

**Learning outcome:** you can find and close framework gaps.

## Practical 2: Current and Target Profile

------------------------------------------------

**Objective:** Produce a mini CSF profile and roadmap.

**Difficulty:** Professional.

**Required tools:** spreadsheet; the CSF 2.0 publication [R1].

**Prerequisites:** Lesson L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional company.

**Step-by-step instructions:**

1. Select 10 CSF categories most relevant to Tamarind's top risks (Module 2).
2. For each, rate current and target state (0-3 with defined criteria).
3. Prioritise the gaps by risk and cost, and write a 12-month roadmap with owners.
4. Note which Indian obligations (CERT-In, DPDP) each roadmap item supports.

**Expected observations:** GV and RS/RC items often feature, because governance and recovery communication are common gaps.

**Troubleshooting:** keep the criteria observable.

**Cleanup:** none.

**Learning outcome:** you can use profiles to plan.
