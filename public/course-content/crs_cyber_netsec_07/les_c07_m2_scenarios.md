Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A policy has no final deny-all rule.

**Task:** Explain the risk and the fix.

> [!TIP] Model answer
> **Risk:** without an explicit default-deny, traffic that matches no rule is handled by the device's default, which may be allow or is at best ambiguous - unmatched flows can be permitted, undermining the whole policy. Fix: add a final "deny any any any any" rule so anything not explicitly allowed is denied, making the policy's effect unambiguous and aligned with default-deny (NIST SP 800-41r1).
>
> **Lesson:** always end a policy with an explicit default-deny.

## Scenario 2

A reviewer finds a rule that can never match because an earlier rule covers it.

**Task:** Name the issue and what to do.

> [!TIP] Model answer
> This is a shadowed rule: an earlier, broader rule already matches all the traffic the later rule would, so the later rule can never fire. It is dead configuration that hides intent and can mislead reviewers; sometimes the broad earlier rule is itself the problem (too permissive). What to do: investigate why the shadowed rule exists; if the earlier rule is over-broad, narrow it; remove the dead rule or reorder so the specific rule takes effect; and re-lint.
>
> **Lesson:** remove or reorder shadowed rules and fix the over-broad rule that causes the shadow.

## Scenario 3

A team filters inbound traffic carefully but leaves outbound wide open.

**Task:** Explain why this is a problem and the remediation.

> [!TIP] Model answer
> **Problem:** unfiltered egress lets a compromised internal host do what attackers need - exfiltrate data, reach a command-and-control server, and pivot - with no restriction. Perimeter-in filtering alone ignores this. Remediation: apply default-deny to egress too, permitting only the specific outbound flows the business needs (e.g. app->internet:443 to an update service), and monitor outbound for anomalies.
>
> **Lesson:** filter egress with least privilege and default-deny, not just ingress.
