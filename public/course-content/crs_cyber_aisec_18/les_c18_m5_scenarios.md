Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer assistant can open pull requests and merge them automatically.

**Task:** Reduce its agency.

> [!TIP] Model answer
> Remove merge permission; allow only opening draft pull requests on branches; require human review and passing CI; restrict repository scope; log all actions; rate-limit; never give it deployment credentials.
>
> **Lesson:** agency should stop where human judgement is required.

## Scenario 2

Marketing wants the chatbot to render rich HTML answers.

**Task:** Advise.

> [!TIP] Model answer
> Do not render model HTML. Use a safe markdown subset rendered by the application with sanitisation, link allowlists and no remote images, under a strict content security policy; use templates for rich components.
>
> **Lesson:** output is untrusted input to the browser.

## Scenario 3

A customer complains the chatbot promised a discount that does not exist.

**Task:** Respond and prevent recurrence.

> [!TIP] Model answer
> Handle the customer fairly (the organisation owns the statement), find the cause in logs (source document, generation error), correct the source or switch the topic to structured answers, add an accuracy probe, and review disclaimers and escalation routes.
>
> **Lesson:** reliance makes accuracy a security and legal concern.
