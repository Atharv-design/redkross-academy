> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Operate the playbook engine safely

**Objective:** Run the engine through dry-run, blocked, approved and repeated executions, and read the audit trail.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C20.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** python make_telemetry.py; delete any old soar_audit.jsonl.

**Explicit authorised scope:** simulated connectors only; the engine never contacts a real system.

**Step-by-step instructions:**

1. python soar.py --selftest
2. python soar.py (dry run), then python soar.py --execute.
3. python soar.py --execute isolate_host:CASE-WS-07:<your name>
4. Repeat step 3. Explain the result.
5. Open soar_audit.jsonl and reconstruct who approved what and when.
6. Change ASSETS so that WS-07 is tier 0, delete the audit log, and repeat steps 2-3 with one approver, then with two distinct approvers.

**Expected observations:** matches the deep dive; with tier 0, one approver gives BLOCKED-NEEDS-APPROVAL(1/2) and two distinct approvers give SIMULATED-OK.

**Troubleshooting:** everything shows SKIP-ALREADY-DONE - delete soar_audit.jsonl to start again.

**Cleanup:** restore ASSETS; delete soar_audit.jsonl.

**Learning outcome:** you can operate and audit a gated playbook.

## Practical 2: Design a playbook for credential misuse

**Objective:** Design a safe playbook for the svc-print case.

**Difficulty:** Advanced.

**Required tools:** text editor; optional Python to extend soar.py.

**Prerequisites:** Lessons L02-L04; Module 4 P1 rule.

**Environment setup:** none.

**Explicit authorised scope:** design document; optional code changes run only with simulated connectors.

**Step-by-step instructions:**

1. Define the trigger (for example, the Module 4 P1 rule plus a successful logon within five minutes).
2. List the steps on the automation ladder: automated, approval or manual.
3. Specify the approval gate for disabling a service account, including the business owner of printing.
4. Specify input validation, the rate limit, timeouts and rollback.
5. Critique the WS-07 isolation trigger ("high severity and three or more rules"): give one case it misses and one it should not catch.
6. Optional: add a disable_account step to soar.py and unit-test the gate with --selftest additions.

**Expected observations:** a playbook in which enrichment and evidence collection are automatic; disabling svc-print needs approval from security and the service owner; and a rollback (re-enable with a new password) is defined.

**Troubleshooting:** if your design auto-disables accounts on one failed logon, revisit Lesson L02.

**Cleanup:** none.

**Learning outcome:** you can design proportionate, safe automation.
