Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A new advisory describes attackers using a signed remote-administration tool for persistence. Your EDR has 90 days of process data.

**Task:** Plan the hunt.

> [!TIP] Model answer
> **Hypothesis:** the named tool (or a similar one) is installed or running on hosts where it is not approved, within 90 days. Data: process creation with signer and path, service creation, network connections to the tool's relay domains, and the software inventory, with a coverage check. Method: stack the tool's executions by host and user against the approved list; pivot on relay domains in DNS. Validate with a seeded or approved installation. Outputs: findings graded, a detection for unapproved installs, an allowlist of approved hosts, and a report.
>
> **Lesson:** turn advisories into scoped, data-checked hypotheses.

## Scenario 2

A junior hunter's report says "no compromise found" after running a downloaded query pack for two hours.

**Task:** Review the report.

> [!TIP] Model answer
> Ask for the hypotheses, scope, time window, data sources and coverage, the queries run, the validation performed and how candidates were graded. "No compromise found" should become "no evidence of X on N hosts over the window Y using sources Z, with these gaps". Recommend choosing the queries that fit the threat model rather than running a whole pack, and storing the hunt so that it can be repeated.
>
> **Lesson:** conclusions need denominators and validation.

## Scenario 3

Your hunt finds that 30% of workstations run an unapproved remote-support tool installed by a helpdesk contractor.

**Task:** Decide what to do with the finding.

> [!TIP] Model answer
> Treat it as a security finding even if no attacker is involved. Unmanaged remote-access tools are a common intrusion path. Confirm how and why it was installed, check its use for unusual sessions, and agree with IT on one approved tool. Remove or control the others. Create a detection for unapproved remote-access tools, and add a baseline of approved installations.
>
> **Lesson:** hunts often surface hygiene risks; route them to owners.
