Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The posture tool reports 4,000 findings across 30 accounts.

**Task:** Plan the first month.

> [!TIP] Model answer
> Triage by severity and exposure: fix internet-exposed critical findings first (admin ports, public data, public databases) with owners and 24-hour targets; deploy preventive guardrails for those patterns so they cannot recur; group remaining findings by rule and owner; accept or fix low-value checks with documented exceptions; report progress weekly.
>
> **Lesson:** prevention plus prioritisation beats a long list.

## Scenario 2

A team says the scanner "passed", so their Terraform is secure.

**Task:** Respond.

> [!TIP] Model answer
> A pass means the checks it runs passed; scanners have blind spots (the lab password) and do not test runtime effect. Add secret scanning, review, and post-deployment verification; record the scanner version and rule set.
>
> **Lesson:** absence of findings is not proof of security.

## Scenario 3

A provider announces a new secure default for new resources.

**Task:** Decide what to do.

> [!TIP] Model answer
> Adopt it for new resources; run a posture check for existing resources that still have the old setting; remediate or document exceptions; add a guardrail so the setting cannot be reverted.
>
> **Lesson:** new defaults do not fix old resources (Power Apps).
