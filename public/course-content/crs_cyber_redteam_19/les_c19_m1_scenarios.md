Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A client says "just test everything, we trust you" with no written scope.

**Task:** Explain why you cannot start and what you require.

> [!TIP] Model answer
> You cannot start because there is no authorisation or scope, and the same actions without authorisation are unlawful (IT Act, 2000). You require: written authorisation from a party entitled to grant it; an explicit in-scope and out-of-scope list; a window; stop conditions, deconfliction and contacts; safety controls (isolation/no-destruction/no-real-data for high-risk work); and data-handling and reporting terms. Run the RoE gate; proceed only on PASS.
>
> **Lesson:** "trust us" is not authorisation; require a complete, signed RoE.

## Scenario 2

During a test, you notice an action is about to affect a production system not in scope.

**Task:** Explain what stop conditions and deconfliction require you to do.

> [!TIP] Model answer
> The out-of-scope production system is a stop condition: halt immediately, do not perform the action, and notify the engagement and client contacts via the deconfliction channel. Record what happened. Resume only after confirming scope and authorisation. Deconfliction also ensures the client can tell this was the test, not a real incident.
>
> **Lesson:** stop on out-of-scope or unexpected impact and deconflict at once.

## Scenario 3

A draft RoE omits operator tagging and stop conditions.

**Task:** Explain the risks and why the RoE gate should fail it.

> [!TIP] Model answer
> Without operator tagging, defenders cannot tell the test from a real attack, so a test action can trigger a full real-incident response, or a genuine attacker could hide behind the exercise. Without stop conditions, there is no agreed trigger to halt on unexpected impact or out-of-scope activity. Both are core safety controls, so the RoE gate should FAIL the draft until they are added.
>
> **Lesson:** deconfliction and stop conditions are mandatory; the gate must enforce them.
