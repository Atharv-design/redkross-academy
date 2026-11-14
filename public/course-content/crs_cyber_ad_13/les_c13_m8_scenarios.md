Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Your capstone lab runs on one container, so you cannot create a real privileged-access workstation.

**Task:** Explain how you handle this in the hardening work and the report.

> [!TIP] Model answer
> Do the hardening you can (Protected Users for admin accounts, least privilege, removing SPNs) and DOCUMENT the PAW and clean-source requirement as a forward-plan item, naming the control it implements and the residual risk of administering Tier 0 from a general host in the lab. State plainly that a single container cannot physically separate tiers, so this item is open and belongs in a production rollout. Honest residual risk is expected.
>
> **Lesson:** implement what the lab allows; document the rest as forward-plan residual risk.

## Scenario 2

Leadership will read only the first page of your audit report.

**Task:** Describe what the executive summary must convey.

> [!TIP] Model answer
> The executive summary must convey, in plain risk terms: the scope (your contained lab), the most important finding and its business risk (a Kerberoastable account was a path toward domain compromise), the quick wins already delivered with proof (the finding is closed, verified by re-test), and the forward plan with its main projects and rough cost/owner. It should lead with risk and outcomes, not tool names, and let leadership decide and fund in one page.
>
> **Lesson:** lead with risk, proof of quick wins, and a funded forward plan.

## Scenario 3

An auditor asks you to prove that the Kerberoastable account is no longer a risk.

**Task:** Describe the evidence you would present.

> [!TIP] Model answer
> **Present the before-and-after evidence:** the BEFORE dir_review.py output showing the HIGH Kerberoastable finding and exit code 1; the action taken (SPN removed or account moved to a gMSA, with the command and timestamp); and the AFTER output showing the finding absent and the exit code changed. Add the activity evidence (all-AES authentication) and note the account is disabled/decommissioned. The traceable control -> finding -> fix -> proof chain is the demonstration.
>
> **Lesson:** closure is proven by before/after evidence, not assertion.
