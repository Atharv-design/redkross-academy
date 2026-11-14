Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A product manager says "the model provider handles security, so our chatbot is secure".

**Task:** Respond.

> [!TIP] Model answer
> The provider secures its model service; the organisation owns its data, retrieval access control, prompts, tools and permissions, output handling, logging and compliance. Show the threat model and the controls the team must build and test.
>
> **Lesson:** shared responsibility applies to AI too.

## Scenario 2

A team wants to put the refund API key in the system prompt so the model can call the API directly.

**Task:** Advise.

> [!TIP] Model answer
> **No:** anything in the prompt can be revealed (LLM07) and the model should not hold credentials. The application calls the API with its own service identity after a deterministic policy check; the model only proposes the action.
>
> **Lesson:** keep secrets and authority outside the model.

## Scenario 3

You are asked to approve an AI feature with no evaluation plan.

**Task:** State your conditions.

> [!TIP] Model answer
> Require a threat model, a probe suite covering the relevant OWASP categories with pass criteria and multiple runs, utility tests, logging and monitoring, and a re-test on every model or prompt change before approval.
>
> **Lesson:** evaluation is part of the design.
