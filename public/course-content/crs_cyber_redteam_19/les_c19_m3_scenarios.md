Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A target identifier in your notes is a public IP you are unsure about.

**Task:** Explain what scope enforcement does and why.

> [!TIP] Model answer
> **Scope enforcement is fail-safe:** because you cannot prove the public IP is in the authorised scope, it is treated as OUT-OF-SCOPE and refused. The tool will not proceed against it, preventing an unauthorised action against a system (possibly a third party) you are not permitted to touch. Confirm scope with the authorised inventory before acting.
>
> **Lesson:** anything not provably in scope is out of scope; refuse it.

## Scenario 2

A client disputes a finding weeks after the engagement.

**Task:** Explain how evidence management lets you uphold or withdraw it.

> [!TIP] Model answer
> Evidence management means the finding was recorded with the action, the in-scope asset, the operator, the time and the proof, in a tamper-evident log. Verifying the chain of custody shows the record is intact and attributed, so you can uphold the finding with confidence; if the evidence does not support it, you withdraw it honestly. Either way the decision rests on trustworthy evidence.
>
> **Lesson:** integrity-protected, attributed evidence makes findings defensible.

## Scenario 3

A junior tester proposes deleting a file to "prove" they had access.

**Task:** Explain controlled validation and why this is wrong.

> [!TIP] Model answer
> Deleting a file is destructive and unnecessary - controlled validation proves a finding with the minimum, non-destructive, reversible action. To show access, record minimal proof (e.g. that the resource is reachable/readable) without altering or destroying anything. Destroying data could cause real harm, breach the no-destruction safety control, and taint the engagement.
>
> **Lesson:** prove risk with minimal, non-destructive evidence, never by causing damage.
