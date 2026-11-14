> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Lint and fix the lab firewall policy

**Objective:** Find the weaknesses in the pre-hardening policy, evaluate key flows, and confirm the hardened policy passes.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (firewall.py, data/rk_firewall.json, data/rk_firewall_fixed.json).

**Prerequisites:** Lessons L01-L04.

**Environment setup:** none (offline).

**Explicit authorised scope:** offline policy documents only.

**Step-by-step instructions:**

1. Run python firewall.py --lint and record the four findings.
2. Evaluate flows: python firewall.py --eval user db tcp 5432 and --eval internet db tcp 5432; note which rule decides each.
3. Run python firewall.py --lint --rules data/rk_firewall_fixed.json and confirm zero findings.
4. Evaluate the same flows against the hardened policy and note they are now denied (explicit deny / default-deny).
5. For each pre-hardening finding, state the fix the hardened policy applied.

**Expected observations (execution-tested):** pre-hardening has 4 findings (1 HIGH, no default-deny); user->db allowed by the broad rule; hardened policy denies it and passes with 0 findings.

**Troubleshooting:** if a flow is "no rule matched", that is the implicit deny - add an explicit default-deny to make it unambiguous.

**Cleanup:** none.

**Learning outcome:** you can lint, evaluate and harden a firewall policy.

## Practical 2: Write a change request

**Objective:** Practise safe firewall change control.

**Difficulty:** Intermediate.

**Required tools:** this module; the policies.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise only.

**Step-by-step instructions:**

1. Write a change request to remove the over-broad user rule and add the least-privilege replacements, including justification and rollback.
2. State the validation you would run before and after (the lint gate).
3. Explain how you would check the change does not shadow or contradict existing rules.
4. Note what you would log and monitor after the change.

**Expected observations:** a reviewed, validated, reversible change that improves least privilege and passes the lint gate.

**Troubleshooting:** if the change adds an any-any or broad rule, reconsider.

**Cleanup:** none.

**Learning outcome:** you can manage a firewall change safely with validation.
