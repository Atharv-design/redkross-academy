> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Run the pipeline in both states

-----------------------------------------------------

**Objective:** Reproduce the blocked and approved releases.

**Difficulty:** Advanced.

**Required tools:** Docker; Git bash or Linux shell; LAB_ASSETS/C12.

**Prerequisites:** Lessons L01-L02.

**Environment setup:** cd LAB_ASSETS/C12/release

**Explicit authorised scope:** lab files only.

**Step-by-step instructions:**

1. Run sh run_release.sh and record the report (expect APPROVED).
2. Copy ../deps/requirements.txt over requirements.txt, rerun, and record the report (expect BLOCKED). Restore the file afterwards.
3. Introduce an f-string query into ../app/shipments.py, rerun and record which gates fail. Then revert.
4. Compare SBOM component lists between the two states.

**Expected observations:** APPROVED with 0 advisories; BLOCKED with the audit gate at exit 1 (17 unique advisories on 2026-11-07; counts change as databases update); in step 3 the SAST gate fails.

**Troubleshooting:** "permission denied" for cosign.key means the out folder was not created on the host, so check the mkdir line.

**Cleanup:** restore files and delete release/out.

**Learning outcome:** you can operate a gated release.

## Practical 2: Write the release security report

-------------------------------------------------------

**Objective:** Produce a full report from the pipeline evidence.

**Difficulty:** Advanced.

**Required tools:** text editor; pipeline outputs.

**Prerequisites:** Lesson L04.

**Environment setup:** outputs from P1.

**Explicit authorised scope:** lab release.

**Step-by-step instructions:**

1. Fill sections 1-9 of the L04 structure for the approved release.
2. Include the threat-model status from Module 2 (open high risks).
3. Write at least four limitation statements.
4. Add verification instructions a customer could follow (signature, digest).

**Expected observations:** a report under three pages that a non-specialist approver can read, with evidence files referenced by name and hash.

**Troubleshooting:** if a section has no evidence, say so. Do not imply coverage.

**Cleanup:** none.

**Learning outcome:** you can communicate release assurance honestly.
