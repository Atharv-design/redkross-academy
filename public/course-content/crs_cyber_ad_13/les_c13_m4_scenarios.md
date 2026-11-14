Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An administrator says, "I only have one account and I use it for everything; it is easier."

**Task:** Explain the risk in tier terms and the change you would require.

> [!TIP] Model answer
> Using one account for everything means a high-privilege credential is exposed on an ordinary, internet-facing machine; a single phishing click there harvests domain-level credentials (CS2). Require separate accounts by tier: an everyday Tier 2 account for email and browsing, and a separate Tier 0 admin account used only from a privileged-access workstation. Add the admin account to Protected Users. The inconvenience is the control.
>
> **Lesson:** separate accounts by tier; never administer from an exposed machine.

## Scenario 2

A team proposes managing domain controllers with a remote-management tool installed on the help desk's ordinary workstations.

**Task:** Explain why this breaks the model and propose a compliant design.

> [!TIP] Model answer
> Installing DC-management tooling on help-desk (Tier 2) workstations means Tier 2 machines can control Tier 0, so compromising a help-desk laptop compromises the directory - a clean-source violation. Compliant design: administer domain controllers only from privileged-access workstations or a Tier 0 jump server that is itself a clean source, with the management tools there, and restrict which accounts may log on to DCs. Use just-in-time elevation where possible.
>
> **Lesson:** the management plane for Tier 0 must be a clean source, not a Tier 2 device.

## Scenario 3

Leadership asks, "We bought a security baseline. Are we secure now?"

**Task:** Explain what adopting a baseline does and does not give you, and what must follow.

> [!TIP] Model answer
> Adopting a baseline gives you a defined, testable target configuration and a head start over inventing settings, but it is not security by itself: you must tailor it to your environment, link or apply it, MEASURE compliance continuously, and manage exceptions deliberately (Module 7, Course 17). A baseline filed away and never measured drifts. Pair it with monitoring (Module 6) and periodic review.
>
> **Lesson:** a baseline is a target to measure against, not a finished state.
