Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A project asks for design approval next week with no threat model and says "we will add one later".

**Task:** Decide and explain.

> [!TIP] Model answer
> Do not approve; a threat model is an entry criterion. Offer conditional progress only for low-risk components, or a time-boxed review session to produce the model with the team; record the decision in the review log.
>
> **Lesson:** entry criteria protect the review's value.

## Scenario 2

An auditor asks you to prove that restricted admin access requires phishing-resistant MFA.

**Task:** Describe the evidence you would provide.

> [!TIP] Model answer
> The PDP rule and its unit test (OTP request -> STEP_UP; FIDO2 -> ALLOW), IdP configuration export checked by a tool, sign-in logs showing the authentication method for admin sessions over a period, and a dated test by effect with a non-phishing-resistant method being refused - all hashed and stored.
>
> **Lesson:** combine configuration, test-by-effect and operational evidence.

## Scenario 3

Your matrix shows 100% VALIDATED, but the newest evidence is 14 months old.

**Task:** Assess and recommend.

> [!TIP] Model answer
> Treat the status as stale: evidence older than the defined cadence is no longer evidence of current state. Re-run automated tests now, set a maximum evidence age (for example 30 days for restricted systems), and report the evidence-age metric to the board.
>
> **Lesson:** assurance has a shelf life.
