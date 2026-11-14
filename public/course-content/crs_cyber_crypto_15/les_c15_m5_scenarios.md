Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A public website works in browsers but fails in a Python client with "unable to get local issuer certificate".

**Task:** Diagnose.

> [!TIP] Model answer
> The server probably omits the intermediate. Browsers can sometimes fetch missing intermediates (AIA) or cache them, but Python does not. Check with openssl s_client -showcerts. Fix by serving the full chain. Do not disable verification.
>
> **Lesson:** send the chain.

## Scenario 2

CT monitoring shows a certificate for your domain from a CA you do not use.

**Task:** Respond.

> [!TIP] Model answer
> Treat it as possible mis-issuance or unauthorised issuance. Verify the details (SANs, dates), check internal teams and vendors, and contact the CA to revoke it if unauthorised. Add CAA records restricting issuers. Investigate DNS and domain-validation compromise. Report to browser root programmes if the CA misbehaved.
>
> **Lesson:** CT makes mis-issuance visible, so act on it.

## Scenario 3

A team wants one wildcard certificate for every internal service.

**Task:** Advise.

> [!TIP] Model answer
> A single wildcard key shared across services means one compromise exposes all of them, and rotation is hard. Prefer per-service certificates from an automated private CA with short lifetimes, and use wildcards sparingly with tight key custody.
>
> **Lesson:** limit blast radius.
