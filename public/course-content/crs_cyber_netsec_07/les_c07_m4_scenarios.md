Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A validation finds observed user->db traffic although the design forbids it.

**Task:** Explain what has happened and the remediation.

> [!TIP] Model answer
> There is a gap between the intended segmentation policy (user->db denied) and enforcement (the firewall/ACL is actually allowing it) - a misconfiguration or a change that undid the control. Remediation: fix the enforcing policy to explicitly deny user->db and end with default-deny; confirm with a re-validation that the flow is now denied; add automated validation to the change pipeline so a future gap is caught; and monitor for any user->db attempt.
>
> **Lesson:** design must be validated against enforcement; fix the enforcing control and automate ongoing validation.

## Scenario 2

An auditor asks how segmentation would have contained a workstation compromise.

**Task:** Explain using the lab architecture.

> [!TIP] Model answer
> In the lab architecture, the user zone has no permitted flow to the database or the management plane. So a compromised workstation cannot reach the database directly (user->db is denied) or the management plane (user->mgmt is denied); to reach data it would have to cross the app tier's controlled, monitored boundary. Segmentation thus contains the compromise to the user zone and the few flows it is allowed, dramatically limiting blast radius and giving monitoring a chance to catch the attempt.
>
> **Lesson:** least-privilege segmentation denies the lateral paths a compromised host would use, containing the breach.

## Scenario 3

A team has a segmentation design but never checks it against the live network.

**Task:** Explain the risk and what to add.

> [!TIP] Model answer
> **Risk:** a segmentation design that is never validated drifts from reality - a firewall change, a new application path, or a misconfiguration can open a forbidden flow without anyone noticing, silently undoing the containment.
>
> **Add access-policy validation:** regularly (ideally automatically) compare the intended allowed-flow matrix against observed telemetry and device configuration, flag any violation, and fix it. Make validation part of the change process.
>
> **Lesson:** validate segmentation continuously against reality; a design alone does not guarantee enforcement.
