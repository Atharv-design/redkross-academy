> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Sample versus full population

---------------------------------------------------

**Objective:** Explore sampling risk using the toolkit.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lesson L04.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py audit and record the sample and full results.
2. Modify the code to repeat the 25-item sample with 1,000 different seeds, and count how often at least one exception is found.
3. Repeat with sample sizes 40 and 60.
4. Write two sentences on what a "no exception" sample result means.

**Expected observations:** with 4 exceptions in 240 items, a 25-item sample detects at least one in roughly a third of runs (about 1 - C(236,25)/C(240,25), approximately 0.36). Larger samples detect more often: the computed hypergeometric probabilities are 0.36, 0.52 and 0.69 for samples of 25, 40 and 60 (execution-tested calculation). Full-population testing always finds all four. Confirm with your simulation.

**Troubleshooting:** use random.Random(seed).sample for reproducibility.

**Cleanup:** none.

**Learning outcome:** you can explain sampling risk.

## Practical 2: Write an audit finding and management response

-------------------------------------------------------------------

**Objective:** Produce a finding from the lab result.

**Difficulty:** Professional.

**Required tools:** text editor.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Write the finding with all seven elements (L05) for the four leaver accounts.
2. Rate it, and justify the rating with risk criteria from Module 2.
3. Write a management response with interim and permanent actions.
4. Define the re-test you will perform before closure.

**Expected observations:** a high rating (access to customer data by former staff); re-test by full-population reconciliation after automation.

**Troubleshooting:** keep the condition factual; put opinions in effect and recommendation.

**Cleanup:** none.

**Learning outcome:** you can write actionable findings.
