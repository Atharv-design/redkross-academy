Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

**Management asks:** "Is the assistant secure? Yes or no."

**Task:** Answer using the lab results.

> [!TIP] Model answer
> **Avoid a yes/no:** in tested categories the hardened configuration had no failures in five runs each, which bounds the failure rate below about 43% - not enough for launch; deterministic controls for data access and tools are unit-tested; utility is below target. Recommend 60-run evaluation, fixing utility, and a release gate; state residual risks.
>
> **Lesson:** give evidence-based, qualified answers with a decision path.

## Scenario 2

A tester proposes using real customer records to make probes realistic.

**Task:** Respond.

> [!TIP] Model answer
> **Decline:** use fictional or synthetic records and canaries; real personal data in tests creates privacy risk and is unnecessary because canaries prove exposure equally well. If production-like data is essential, obtain privacy approval, minimise and protect it.
>
> **Lesson:** realism comes from structure, not from real data.

## Scenario 3

After a model upgrade, P3 failures rise from 0/60 to 4/60.

**Task:** Decide and report.

> [!TIP] Model answer
> 4/60 (about 7%, 95% CI roughly 3-16%) is a regression: block the upgrade or keep the previous model; analyse failing runs; adjust defences (for example sanitising and retrieval scope); re-run; report the regression, its evidence and the decision.
>
> **Lesson:** release gates turn measurements into decisions.
