Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A business unit asks you to "approve" a vendor product before any requirements exist.

**Task:** Respond.

> [!TIP] Model answer
> Elicit requirements first (data, users, obligations, risks, integrations); evaluate the product against them (Course 17 M07 for vendor risk); document the decision in an ADR.
>
> **Lesson:** requirements before products.

## Scenario 2

A legacy app requires a flat network and cannot be changed for 18 months.

**Task:** Propose a transition architecture.

> [!TIP] Model answer
> Place the legacy segment in its own zone behind an identity-aware gateway or jump host with MFA; restrict east-west traffic to the minimum flows; monitor heavily; record an ADR, risk entry and dated exception; fund replacement.
>
> **Lesson:** contain what you cannot yet change.

## Scenario 3

Diagrams are outdated and nobody owns them.

**Task:** Fix.

> [!TIP] Model answer
> Assign owners per system; adopt diagrams-as-code partly generated from inventory; date and version views; require updates in change management; review quarterly and before major incidents exercises.
>
> **Lesson:** architecture documentation is operational equipment.
