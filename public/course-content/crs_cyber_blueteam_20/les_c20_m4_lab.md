> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Write a rule with tests for password spraying

**Objective:** Close the "visible but no rule" gap for T1110.003 from Module 1 by writing a rule and tests.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C20; text editor.

**Prerequisites:** Lessons L01-L04.

**Environment setup:** copy detections/rules and detections/tests to a working folder.

**Explicit authorised scope:** synthetic dataset and test events only.

**Step-by-step instructions:**

1. Note that rk_sigma.py does not support correlation (counting). Write a simple Sigma rule rk_service_account_logon_failure that matches 4625 events for accounts starting "svc-" with logon type 3.
2. Write tests: one positive (svc-print 4625 type 3), two negatives (user03 4625 type 2; svc-print 4624 type 3), and one edge case of your choice.
3. Run python rk_sigma.py test <rules> <tests> and then scan the dataset.
4. Write in the rule's description how a SIEM correlation (for example five or more failures in five minutes followed by a success) would improve it, and why that cannot be tested with this tool.
5. Run coverage.py with your folders and confirm that T1110.003 moves from 1 to 3.

Expected observations (execution-tested with the instructor solution in detections/solutions): 22 cases, 0 failed; the new rule has 6 hits on the dataset, all logged on DC-01 for svc-print from 10.20.1.17 between 12:10:00 and 12:10:25; coverage.py reports T1110.003 at `3*` and "Coverage score 28 / 33 (85%)".

**Troubleshooting:** "unsupported logsource" - use product: windows and service: security.

**Cleanup:** none.

**Learning outcome:** you can deliver a tested detection for a coverage gap.

## Practical 2: Review workflow with a hook

**Objective:** Run the rule pack under Git with a pre-commit hook and practise review.

**Difficulty:** Advanced.

**Required tools:** Git; Python; LAB_ASSETS/C20/detections/pre-commit-hook.sh.

**Prerequisites:** Lesson L05.

**Environment setup:** create an empty folder; copy rules/, tests/ and rk_sigma.py into it; run git init; copy the hook to .git/hooks/pre-commit and make it executable.

**Explicit authorised scope:** a local lab repository.

**Step-by-step instructions:**

1. Commit the pack. Confirm that the hook prints "18 cases, 0 failed".
2. Create a branch, change ' -EncodedCommand ' to ' -Encoded ' and try to commit. Record the failure.
3. Write a review comment explaining the bug.
4. Optional: install sigma-cli in a virtual environment, run sigma check and sigma convert -t splunk --without-pipeline, and compare the queries with the YAML.
5. Write the three CI steps you would add on the server.

**Expected observations:** matches git_hook_output.txt: commit blocked with "FAIL rk_powershell_encoded_command long_flag".

**Troubleshooting:** the hook does not run - check that it is executable and named exactly pre-commit; on Windows use Git Bash.

**Cleanup:** delete the lab repository.

**Learning outcome:** you can operate a tested, reviewed detection workflow.
