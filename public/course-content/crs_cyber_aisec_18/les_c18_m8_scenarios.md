Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The product owner wants the report to say "no vulnerabilities found".

**Task:** Respond.

> [!TIP] Model answer
> **Decline the wording:** the evidence shows observed failure paths in weaker configurations, zero failures in limited runs for the hardened one (bounded, not zero risk) and a utility gap. Offer accurate wording: "no failures observed in N runs per category; deterministic controls tested; residual risks and limits as listed".
>
> **Lesson:** accuracy protects the organisation.

## Scenario 2

A new failure path appears in production: a customer reports seeing a canary-like internal code.

**Task:** Act.

> [!TIP] Model answer
> **Treat as an incident:** collect the conversation and logs, identify the path (which input and retrieved documents), disable or restrict the feature if needed, rotate any real secret exposed, add a regression probe, fix the hop that failed, re-run the suite, and report.
>
> **Lesson:** failure paths are incident playbooks.

## Scenario 3

A vendor offers its own evaluation report for its AI product.

**Task:** Explain how to use it.

> [!TIP] Model answer
> **Use it as input:** check scope, method, runs, model versions and dates; verify it covers your configuration, data and tools; run your own probes on your integration; request evidence for deterministic controls; record gaps as residual risk.
>
> **Lesson:** vendor evidence does not cover your integration.
