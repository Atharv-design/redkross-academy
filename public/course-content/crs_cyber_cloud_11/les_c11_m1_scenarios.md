Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A business unit wants to run production and its backups in the same AWS account to save effort.

**Task:** Advise.

> [!TIP] Model answer
> Keep backups in a separate account (ideally a separate OU with restricted administrators and guardrails preventing deletion), with immutable or locked backups, so that compromise or error in production cannot destroy backups too; document it in the threat model.
>
> **Lesson:** account boundaries are blast-radius boundaries (Module 8 case).

## Scenario 2

A provider announces a vulnerability in a managed service you use, already fixed on its side.

**Task:** List your actions.

> [!TIP] Model answer
> Read the bulletin; identify affected resources from inventory; perform any customer actions (rotate keys or secrets, update clients, change settings); review logs for the exposure window; restrict network access if not already; record actions and update the risk register.
>
> **Lesson:** provider fixes do not replace customer duties.

## Scenario 3

An auditor asks you to show who is responsible for patching the operating system of your Azure App Service application.

**Task:** Answer and state your evidence.

> [!TIP] Model answer
> For App Service (PaaS) the provider patches the underlying operating system; the customer is responsible for the application, its dependencies and configuration. Evidence: the provider's documentation and audit reports for the platform layer, plus the team's own dependency scanning and configuration records for the application layer.
>
> **Lesson:** be precise about the layer.
