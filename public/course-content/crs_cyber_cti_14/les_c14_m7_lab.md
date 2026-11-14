> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Map and grade

**Objective:** Map MONSOON LANTERN behaviour to ATT&CK 20.1 with evidence and assess Nilgiri's visibility.

**Difficulty:** Advanced.

**Required tools:** Python; attack_map.py; data/enterprise-attack.json; data/log_inventory.json.

**Prerequisites:** Lessons L01-L04.

**Environment setup:** as for Module 4.

**Explicit authorised scope:** public ATT&CK data and the synthetic case.

**Step-by-step instructions:**

1. Read reports.json and map each claim yourself before looking at the supplied techniques; compare and explain differences.
2. python attack_map.py ; record the summary.
3. Add "Module Load" and "Network Traffic Content" to the inventory and re-run; how many techniques improve?
4. For each BLIND technique, describe the external intelligence that provides visibility.
5. Load navigator/monsoon_lantern_layer.json into the ATT&CK Navigator (optional) and write the legend that states what a score means.

Expected observations (execution-tested for step 2): 1 COVERED, 6 PARTIAL, 2 BLIND. Step 3 is computed by your run; the instructor guide gives the reference.

**Troubleshooting:** an inventory name must match the ATT&CK data component name exactly (for example "Process Creation").

**Cleanup:** restore log_inventory.json after experiments.

**Learning outcome:** you can produce evidence-based visibility assessments.

## Practical 2: Write the use-case backlog

**Objective:** Turn the gap analysis into a prioritised defensive backlog.

**Difficulty:** Advanced.

**Required tools:** text editor or spreadsheet; outputs of P1.

**Prerequisites:** P1; Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** planning only.

**Step-by-step instructions:**

1. List at least six use cases (collection, detection, hunt, mitigation, external monitoring) with the techniques each improves.
2. Score each for threat relevance, visibility gain, cost and effort.
3. Choose the top three and write one acceptance test for each (what evidence shows it is done - for example a tested rule that fires on a replayed event, Course 20 Module 7).
4. Write a half-page summary for the CISO.

**Expected observations:** collection of Network Traffic Content and Module Load, scheduled-task telemetry, and lookalike-domain monitoring usually rank highest. This practical is analytic; there is no single tested output.

**Troubleshooting:** if every item scores high, add cost and dependencies.

**Cleanup:** none.

**Learning outcome:** you can turn intelligence into defensive work.
