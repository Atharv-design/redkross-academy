Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Developers want SSH from home to private instances.

**Task:** Propose an alternative.

> [!TIP] Model answer
> Use Session Manager (or Azure Bastion / a ZTNA broker) with SSO, MFA and session logging; no inbound port 22; least-privilege SSM permissions per environment; just-in-time access for production.
>
> **Lesson:** remove admin ports from the internet entirely.

## Scenario 2

A posture scan shows IMDSv1 allowed on 200 instances.

**Task:** Plan the migration.

> [!TIP] Model answer
> Inventory instances and the software querying metadata (CloudWatch metric MetadataNoToken shows IMDSv1 use); update SDKs/agents; set HttpTokens=required in launch templates and an account default; migrate in waves with monitoring; enforce with Config/SCP conditions; raise hop limit only for container hosts that need it.
>
> **Lesson:** measure, migrate, enforce.

## Scenario 3

A security group allows all outbound traffic from the database tier.

**Task:** Assess and fix.

> [!TIP] Model answer
> Databases rarely need internet egress; unrestricted egress aids data exfiltration and tool download. Restrict egress to required destinations (patch repositories via endpoints/proxy, replication peers), remove the default allow-all, log denied flows.
>
> **Lesson:** egress is part of least privilege.
