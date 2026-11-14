Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The business wants a 1-hour RTO for everything.

**Task:** Respond.

> [!TIP] Model answer
> Run a BIA to show impacts over time per process. Price the recovery strategies for 1-hour and longer RTOs, and agree tiered RTOs by criticality. Fund fast recovery where the impact justifies it, and use workarounds elsewhere. Record the decisions.
>
> **Lesson:** RTOs are business decisions with costs.

## Scenario 2

Backups exist but have never been restored.

**Task:** Plan assurance.

> [!TIP] Model answer
> Schedule component restore tests for critical data, measure time against RTO and age against RPO, and verify integrity and immutability (not reachable from the domain). Fix what fails, report results to the committee, and update the BIA's achievable figures.
>
> **Lesson:** an untested backup is a hope, not a control.

## Scenario 3

After ransomware, leadership wants to restore last night's backup immediately.

**Task:** Advise.

> [!TIP] Model answer
> First confirm the backup predates the compromise and is free of persistence. Preserve evidence. Restore into a clean, isolated environment, recover identity first, reset credentials, scan, and reconnect in stages with monitoring (Course 09 Module 7). Communicate realistic timelines.
>
> **Lesson:** speed without cleanliness invites reinfection.
