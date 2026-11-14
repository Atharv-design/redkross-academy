> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Model the campaign

**Objective:** Build Diamond events and a campaign timeline for MONSOON LANTERN from the lab data.

**Difficulty:** Advanced.

**Required tools:** text editor or spreadsheet; data/ files; outputs of Modules 2-3 and 5 (ioc_pipeline.py for the proxy-log events).

**Prerequisites:** Lessons L02-L04.

**Environment setup:** python make_ti_data.py (if needed).

**Explicit authorised scope:** synthetic data only.

**Step-by-step instructions:**

1. Write at least four Diamond events (E1-E3 above plus one of your own, for example the 20 October blocked visit) with all four core features and the meta-features you can fill.
2. Mark each feature value with its source and grade.
3. Draw the activity thread and the timeline.
4. Write three competing hypotheses about the campaign's purpose and score at least six pieces of evidence against them (ACH).
5. Identify the evidence that would best discriminate between the hypotheses and the collection that could obtain it.

**Expected observations:** the adversary vertex remains unknown; most evidence is consistent with several hypotheses; the discriminating evidence (post-compromise behaviour, objectives) is exactly what is missing. This practical is analytic; there is no single tested output.

**Troubleshooting:** if every hypothesis scores the same, your evidence is not discriminating - say so explicitly.

**Cleanup:** none.

**Learning outcome:** you can structure a campaign without overclaiming.

## Practical 2: Test the overlap shortcut

**Objective:** Run and critique technique-overlap matching.

**Difficulty:** Advanced.

**Required tools:** Python; actor_overlap.py; data/enterprise-attack.json.

**Prerequisites:** Lesson L05.

**Environment setup:** the ATT&CK STIX file in data/ (download from MITRE's attack-stix-data repository if missing).

**Explicit authorised scope:** public ATT&CK data and the synthetic case.

**Step-by-step instructions:**

1. python actor_overlap.py ; record the top ten and the counts.
2. Run it with a rarer, more specific technique set of your choice (pass technique IDs as arguments) and compare the counts.
3. Write a paragraph explaining why the first result is not attribution, citing the counts.
4. List three kinds of evidence that would raise an association with a known intrusion set to moderate confidence.

Expected observations (execution-tested for step 1): six groups share all eight parent techniques; sixteen share seven or more. Step 2 depends on your technique choice.

**Troubleshooting:** "UnicodeDecodeError" means the file was opened without UTF-8 (the script opens it correctly); a missing file error means the ATT&CK data was not downloaded.

**Cleanup:** none.

**Learning outcome:** you can explain, with data, why overlap is not attribution.
