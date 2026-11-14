> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Escalate the Banyan incident

--------------------------------------------------

**Objective:** Produce an escalation, containment recommendation and reporting timeline.

**Difficulty:** Intermediate.

**Required tools:** text editor; LAB_ASSETS/C08 results from Modules 3-6.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** none.

**Explicit authorised scope:** the synthetic case only.

**Step-by-step instructions:**

1. Write the six-part escalation (L02) in under 250 words.
2. Produce a containment plan with order, owner, business impact and evidence considerations for each action.
3. Assume the SOC "noticed" the incident at 08:30Z. Compute the CERT-In 6-hour deadline in UTC and IST.
4. List which stakeholders are informed, by which channel, and when.

**Expected observations:** deadline 14:30Z = 20:00 IST.

**Troubleshooting:** IST is UTC+05:30 with no daylight saving.

**Cleanup:** none.

**Learning outcome:** you can escalate clearly and under time pressure.

## Practical 2: Export and verify evidence

------------------------------------------------

**Objective:** Use evidence_export.py and verify integrity.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08; sha256sum (Linux/WSL/Git bash) or PowerShell Get-FileHash.

**Prerequisites:** Lesson L05.

**Environment setup:** python make_dataset.py; python minisiem.py load.

**Explicit authorised scope:** synthetic data in your lab folder.

**Step-by-step instructions:**

1. Run python evidence_export.py CASE-0001 WS-104.
2. Verify with sha256sum -c SHA256SUMS (inside evidence/CASE-0001), or compare Get-FileHash output with the manifest.
3. Copy the export, change one character, and verify the copy against the manifest hash.
4. Run the export again and confirm the hash is unchanged. Inspect custody.jsonl.
5. Write a custody note for a colleague receiving the file.

**Expected observations:** 32 events; the hash matches the original run; the modified copy fails; custody.jsonl has one line per run.

**Troubleshooting:** "No such file" from sha256sum usually means CRLF line endings in the manifest.

**Cleanup:** delete the evidence folder when the exercise ends.

**Learning outcome:** you can produce verifiable evidence.
