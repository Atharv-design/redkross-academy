Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The SOC receives your lab's four detections plus the burst within eleven minutes.

**Task:** Triage and escalate.

> [!TIP] Model answer
> Correlate by identity and source IP: one identity, one external IP, a chain of high-risk actions including disabling logging - declare an incident. Contain (deactivate keys, revoke sessions, restore logging, re-block the bucket), preserve logs, scope with other sources, follow Module 8.
>
> **Lesson:** correlated detections are an incident, not five tickets.

## Scenario 2

Finance wants to stop S3 data events to save money.

**Task:** Advise.

> [!TIP] Model answer
> Keep data events for restricted buckets and high-value stores (they answer "what was read?"); reduce cost with selectors (specific buckets, write-only where appropriate), and archive tiers; document the residual blind spot for unlogged buckets.
>
> **Lesson:** scope logging by risk, do not remove it blindly.

## Scenario 3

An attacker could disable logging in a member account if they become admin there.

**Task:** Prevent and detect.

> [!TIP] Model answer
> Use an organisation trail owned by the management/log account (member accounts cannot delete it), SCPs denying StopLogging/DeleteTrail, Object Lock on the archive; alert on any trail or diagnostic-setting change and on gaps in delivery.
>
> **Lesson:** protect the logs from the people they watch.
