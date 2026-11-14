> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Build the evidence pack

---------------------------------------------

**Objective:** Produce a verifiable evidence pack for BanyanBot.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; Ollama with a local model; LAB_ASSETS/C18/banyanbot.

**Prerequisites:** Modules 2-7 practicals.

**Environment setup:** copy the folder; record versions.

**Explicit authorised scope:** the local bench only.

**Step-by-step instructions:**

1. Run the commands of section 3.
2. Hash every evidence file; build an appendix table (file, purpose, SHA-256).
3. Record model digest, runtime and Python versions, seeds and date.
4. Check that every claim you intend to make points to a file and line.

**Expected observations:** a complete, re-checkable pack.

**Troubleshooting:** if Ollama is slow, use fewer seeds for drafts and the full count for the final run.

**Cleanup:** keep the pack with your capstone; delete working copies later.

**Learning outcome:** you can produce assessment evidence.

## Practical 2: Failure-path register and report draft

------------------------------------------------------------

**Objective:** Document failure paths and draft the report.

**Difficulty:** Advanced.

**Required tools:** text editor; P1 evidence pack.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** none.

**Explicit authorised scope:** your own lab results.

**Step-by-step instructions:**

1. Write FP-1 to FP-5 from your own evidence using the hop format.
2. Add at least two new failure paths from probes you designed in Module 7.
3. For each, state controls per hop and their evidence type (deterministic test or probabilistic measurement).
4. Draft the executive summary and residual-risk statement.

**Expected observations:** every hop cites evidence; residual risk is stated with intervals.

**Troubleshooting:** if a hop lacks evidence, mark it "not tested".

**Cleanup:** none.

**Learning outcome:** you can document AI failure paths and mitigations.
