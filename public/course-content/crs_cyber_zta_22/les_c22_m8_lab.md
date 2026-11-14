> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Check and fix the roadmap

-----------------------------------------------

**Objective:** Use roadmap_check.py to make the draft roadmap consistent.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; LAB_ASSETS/C22/roadmap_check.py, roadmap.json, requirements.json.

**Prerequisites:** Lessons L02-L05.

**Environment setup:** copy the files to a working folder.

**Explicit authorised scope:** fictional roadmap files only.

**Step-by-step instructions:**

1. Run python roadmap_check.py roadmap.json requirements.json; record the 6 findings and exit code 1.
2. Fix each finding in a copy; justify each change in one sentence.
3. Re-run to 0 findings; compare with roadmap_fixed.json.
4. Add a check: every phase must contain at least one initiative that reduces a HIGH risk from your threat model (Module 7 P2).

**Expected observations:** 6 findings before; 0 after.

**Troubleshooting:** phases are integers; dependencies are initiative IDs.

**Cleanup:** delete working copies.

**Learning outcome:** you can keep a roadmap consistent by construction.

## Practical 2: Reference architecture and executive summary

------------------------------------------------------------------

**Objective:** Produce the capstone deliverables in draft (completed in Part C, C4).

**Difficulty:** Specialization.

**Required tools:** text or diagramming tool; the C22 lab outputs.

**Prerequisites:** all lessons; Modules 1-7 practicals.

**Environment setup:** gather your outputs from Modules 1-7.

**Explicit authorised scope:** fictional Tamarind organisation only.

**Step-by-step instructions:**

1. Write the reference architecture sections L01 1-7 for Tamarind.
2. Assess maturity for the eight ZTMM areas with evidence references.
3. Build your roadmap JSON and pass roadmap_check.py.
4. Run control_matrix.py and state current status.
5. Write a one-page executive summary that asks for a specific decision.

**Expected observations:** every initiative links to evidence; the summary fits on one page.

**Troubleshooting:** if the summary needs tool names to make sense, rewrite it in outcomes.

**Cleanup:** none.

**Learning outcome:** you can deliver architecture to decision-makers.
