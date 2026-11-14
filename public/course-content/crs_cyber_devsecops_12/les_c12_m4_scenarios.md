Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

SAST reports 2,000 legacy findings on a newly onboarded repository.

**Task:** Plan the rollout.

> [!TIP] Model answer
> Baseline the existing findings and block only new ones in pull requests. Triage legacy ERROR findings in internet-facing code first, with owners and SLAs. Tune noisy rules, track burn-down monthly, and run full scans nightly.
>
> **Lesson:** gate new risk, plan the backlog.

## Scenario 2

A developer asks to suppress rk-sql-fstring because "the table name is a constant".

**Task:** Decide.

> [!TIP] Model answer
> Check the code. If any part of the f-string can come from input now or later, it is a true positive: parameterise values. Identifiers such as table names cannot be bound as parameters, so allowlist them against a fixed set. If it is truly constant, rewrite it as a plain string to remove the f-string rather than suppressing it. Suppress only with a rule ID and reason if a rewrite is impossible.
>
> **Lesson:** prefer changing code to silencing tools.

## Scenario 3

Your organisation has a custom HTTP client wrapper that already enforces timeouts.

**Task:** Adapt rules to avoid false positives.

> [!TIP] Model answer
> Add pattern-not or pattern-not-inside clauses for calls through the wrapper, or target only direct `requests.*` calls. Add ok and ruleid tests. Document the wrapper as the paved road, and add a rule that flags direct requests usage in application code.
>
> **Lesson:** rules should reflect your paved roads.
