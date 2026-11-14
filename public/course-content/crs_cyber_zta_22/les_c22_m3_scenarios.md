Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A vendor says its product "makes you zero trust".

**Task:** Evaluate.

> [!TIP] Model answer
> Ask which tenets and pillars it addresses (e.g., PEP for private apps), which signals it consumes, how it integrates with the IdP and device management, how policies are expressed and logged, and its availability design. Zero trust is an architecture across pillars; a product can be a component.
>
> **Lesson:** map products to components and tenets.

## Scenario 2

Device posture service is down; users cannot reach any app.

**Task:** Design behaviour.

> [!TIP] Model answer
> Define per-resource fail behaviour in ADRs: restricted apps fail closed; internal apps may use cached posture for a short TTL or fail open with logging; make the posture service highly available and monitored.
>
> **Lesson:** decide failure modes in design, not during outages.

## Scenario 3

A legacy OAuth app holds tenant-wide mailbox access "for an old migration".

**Task:** Act.

> [!TIP] Model answer
> Inventory and review OAuth apps; remove or scope the permission (least privilege); require owner and expiry; monitor app permission grants and token use; apply to test/legacy tenants too.
>
> **Lesson:** workloads and apps need zero standing privilege.
