> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Run the course rules and gate

---------------------------------------------------

**Objective:** Reproduce the findings and the gate behaviour.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C12/sast.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** from LAB_ASSETS/C12 (Git bash or Linux):

```text
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd):/lab" -w /lab/sast \
  python:3.12-slim sh -c "pip install -q semgrep && semgrep scan \
  --config rules.yml --metrics=off --error legacy_reports.py; echo \$?"
```

**Explicit authorised scope:** the lab files.

**Step-by-step instructions:**

1. Run the command and record the findings and exit code.
2. Remove --error and confirm the exit code becomes 0.
3. Change the nosemgrep comment to a bare "# nosemgrep" and discuss the risk.
4. Fix the three flagged functions using the safe patterns, rerun, and confirm exit 0 with --error.

**Expected observations:** 3 findings and exit 1; exit 0 without --error; 0 findings after the fixes.

**Troubleshooting:** if pip is slow, pin a version (semgrep==1.184.0) and reuse the container image.

**Cleanup:** containers are removed with --rm.

**Learning outcome:** you can operate SAST as a real gate.

## Practical 2: Write and test a new rule

-----------------------------------------------

**Objective:** Encode an organisation standard as a Semgrep rule.

**Difficulty:** Advanced.

**Required tools:** as P1.

**Prerequisites:** Lesson L02; Technical deep dive.

**Environment setup:** as P1.

**Explicit authorised scope:** your own rule and test files.

**Step-by-step instructions:**

1. Standard: "requests calls must set a timeout". Write rule rk-requests-no-timeout matching requests.$M(...) where the arguments do not include timeout=..., using patterns plus pattern-not.
2. Create a test file with ruleid and ok annotations.
3. Run semgrep --test --config rules.yml and record the result.
4. Add the rule to the gate and run it on a sample module.

**Expected observations:** calls without timeout are flagged and calls with timeout are not.

**Troubleshooting:** use "requests.$M(..., timeout=$T, ...)" in pattern-not.

**Cleanup:** none.

**Learning outcome:** you can turn coding standards into automated checks.
