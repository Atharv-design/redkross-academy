> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the first-hour response

------------------------------------------------------------

**Objective:** Perform containment and preservation in the mock.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C11/run_lab.sh and response_lab.py.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** copy the C11 lab folder; start Docker.

**Explicit authorised scope:** the local moto mock only.

**Step-by-step instructions:**

1. Run sh run_lab.sh response_lab.py and compare with L03-L04.
2. Add steps: create (in the mock) an access key for ci-bot as the attacker did, then find and deactivate it by listing keys created after the first malicious event time.
3. Add a step that re-enables a stopped trail in the mock and checks IsLogging.
4. Write each action, its time and result to a case log file and hash the file.

**Expected observations:** all keys inactive, sessions denied, instance quarantined and snapshotted, case log hashed.

**Troubleshooting:** moto supports most but not every API; note gaps.

**Cleanup:** none.

**Learning outcome:** you can execute a cloud first-hour response in code.

## Practical 2: Write the IR runbooks

-------------------------------------------

**Objective:** Produce runbooks for three cloud incident types.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise.

**Step-by-step instructions:**

1. Write runbooks for: compromised Entra administrator; public storage exposure; ransomware deleting cloud resources.
2. For each: trigger, roles, containment, evidence, eradication, recovery, notification and verification steps.
3. Identify the preparation each runbook needs (IR roles, backups, log sources) and check that the reference architecture provides it.

**Expected observations:** each runbook depends on L01 preparation.

**Troubleshooting:** include provider support escalation.

**Cleanup:** none.

**Learning outcome:** you can prepare cloud incident procedures.
