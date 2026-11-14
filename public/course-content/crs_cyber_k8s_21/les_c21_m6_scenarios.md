Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A team proposes to suppress all LOW and MEDIUM IaC findings permanently to "reduce noise".

**Task:** Respond with a better approach.

> [!TIP] Model answer
> Do not suppress by severity: some MEDIUM findings (missing logging) are critical to your detection capability. Review the rule set once, decide per rule whether it applies to your environment, disable inapplicable rules globally with a documented reason, fix or suppress individual findings with owner and expiry, and track trends. Add tests that the important rules still fire.
>
> **Lesson:** tune by rule and reason, not by severity.

## Scenario 2

Drift detection reports that a production Deployment's image tag was changed directly six times last month, always by the on-call group.

**Task:** Analyse and propose changes.

> [!TIP] Model answer
> Repeated direct changes by on-call show the normal path is too slow for incidents. Give on-call a fast Git path (pre-approved emergency change, automatic deploy, follow-up review), restrict direct write access in production to a break-glass role with alerts, make the GitOps controller revert unauthorised changes, and require images by digest (Module 7) so the change is reviewable. Review the six incidents for root causes.
>
> **Lesson:** make the right path the fast path, then enforce it.

## Scenario 3

Your IaC scanner reports zero findings on a new cloud landing zone.

**Task:** Explain what that does and does not prove, and how you would gain confidence.

> [!TIP] Model answer
> It proves only that the scanner's checks passed on the files scanned. It does not prove the checks cover your risks (the lab's IAM wildcard was missed), that values resolved at plan time are safe, or that reality matches the files. Gain confidence by listing required controls and mapping each to a rule, adding custom checks with tests for gaps, evaluating plan JSON, scanning the deployed environment, and running drift detection.
>
> **Lesson:** absence of findings is not presence of controls.
