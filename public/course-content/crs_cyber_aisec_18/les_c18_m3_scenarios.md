Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A vendor claims its system prompt "prevents all prompt injection".

**Task:** Respond and propose an evaluation.

> [!TIP] Model answer
> No prompt can guarantee that; models follow text probabilistically. Ask for, or run with permission, a benign probe suite (direct, indirect via planted test content, data, agency, output) over many runs with canaries and simulated tools; require deterministic controls for data access and actions; review results by category.
>
> **Lesson:** claims need measurements.

## Scenario 2

Your assistant summarises incoming customer e-mails and can create refund tickets.

**Task:** Design mitigations.

> [!TIP] Model answer
> **Treat e-mail as untrusted:** the summariser has no tools; ticket creation is a separate step with structured fields validated in code (customer from the authenticated mailbox mapping, amount limits, human approval above a threshold); strip links and hidden content; log and alert on unusual tickets; run probes with benign planted e-mails.
>
> **Lesson:** separate reading untrusted content from acting.

## Scenario 3

Monitoring shows output-filter hits for the system canary three times this week.

**Task:** Respond.

> [!TIP] Model answer
> The output layer worked, but the model is being induced to reveal the system prompt. Review logs for the requests and users involved; check for other leaked content; remove any real secrets from the prompt; adjust input and retrieval controls; add regression probes; consider rate limiting the users concerned.
>
> **Lesson:** filter hits are detection signals.
