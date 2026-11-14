Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A manager asks for "a single number that says how secure the cluster is".

**Task:** Respond and propose what to report instead.

> [!TIP] Model answer
> Explain that one number hides what matters and invites gaming. Offer a small dashboard: score on a stated control catalogue with trend; the list of failing controls with owners and dates; accepted risks with expiry; time to remediate regressions; and the coverage statement (what the catalogue does not test). Agree risk-based targets per control group.
>
> **Lesson:** report scores with denominators, trends and coverage.

## Scenario 2

The daily evidence run shows C06 failing for a namespace created yesterday by a new team.

**Task:** Describe the response and the preventive fix.

> [!TIP] Model answer
> Treat it as a regression: contact the team, apply the standard default-deny plus DNS policies (after confirming the flows they need), re-run evidence. Prevent: namespace creation through a template or controller that adds Pod Security labels and baseline NetworkPolicies automatically; an admission policy or periodic check that flags namespaces without them; onboarding documentation.
>
> **Lesson:** fix the instance, then make the secure default automatic.

## Scenario 3

An advisory like CVE-2025-1974 is published for an add-on. You have one hour before a management call.

**Task:** List what you will establish and how.

> [!TIP] Model answer
> **Establish:** whether the add-on runs in each cluster and which versions (inventory or kubectl query across clusters); whether the vulnerable component is enabled; exposure (who can reach it - pod network policies, external exposure); blast radius (its RBAC, especially secrets access); available fixes and mitigations from the advisory; whether there are indicators of compromise (the advisory may say there are none - then rely on audit logs and exposure analysis). Prepare: affected clusters, plan (mitigate now, patch by when), residual risk and the decision you need.
>
> **Lesson:** inventory, exposure, blast radius, action - in that order.
