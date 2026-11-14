Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Leadership wants all high-severity alerts to auto-isolate hosts "to cut response time to zero".

**Task:** Respond with a design.

> [!TIP] Model answer
> Agree on the goal (fast containment) but not the mechanism. Automate enrichment and evidence collection immediately. Auto-isolate only a narrow class (tier-2 workstations, from specific high-fidelity rules with measured false-positive rates), with a per-hour cap and immediate notification. Put everything else behind approval with an on-call approver, and measure time to approval. Exclude tier-0 systems and device classes such as printers and OT. Review every automatic isolation, and expand the class only with evidence.
>
> **Lesson:** speed comes from removing toil, not from removing judgement.

## Scenario 2

A playbook step builds a firewall command by inserting the alert's "destination" field into a shell string.

**Task:** Identify the risk and fix the design.

> [!TIP] Model answer
> **This is command injection:** an attacker-controlled value could add commands. Use the firewall's API with structured parameters, not shell strings. Validate the value as an IP address or CIDR with a strict parser. Reject private, internal and allowlisted ranges, and cap the number of blocks per run. Log the request and the response.
>
> **Lesson:** alert content is data, never code.

## Scenario 3

At 03:00, a playbook hits its containment cap after isolating two hosts, and a third infected host is identified.

**Task:** Describe the right behaviour.

> [!TIP] Model answer
> The playbook should stop containment, keep collecting evidence and page the duty manager or incident commander with a summary. A human decides whether to raise the cap for this incident through the break-glass path. That decision and the reason are recorded in the audit log, and the playbook resumes with an explicit, time-limited approval.
>
> **Lesson:** caps hand control to people; they do not end the response.
