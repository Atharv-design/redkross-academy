Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

At 02:00 an alert shows an admin account logging in from a new country. The admin is known to travel.

**Task:** Triage it.

> [!TIP] Model answer
> **Enrich:** travel calendar or manager confirmation, device, MFA method, impossible travel versus VPN or proxy, actions after login. Validate: contact the admin through a known channel, not a reply to the login. Check privileged actions. If unconfirmed, escalate and recommend session revocation per playbook. Document either way.
>
> **Lesson:** known behaviour still needs evidence because the risk is high.

## Scenario 2

A rule detecting PowerShell with -EncodedCommand fires 200 times a day from a management tool.

**Task:** Handle the false positives without losing coverage.

> [!TIP] Model answer
> Identify the tool's binary, signer, parent process and host set. Create a narrow exclusion for that signed parent on managed servers, with a ticket and expiry. Keep the rule for all other parents. Measure the FP rate after the change. Consider asking the tool owner to avoid encoded commands.
>
> **Lesson:** exclude the specific cause, not the technique.

## Scenario 3

You cannot decide whether an alert is malicious after 30 minutes, and the shift ends in 20 minutes.

**Task:** Decide what to do.

> [!TIP] Model answer
> Escalate or hand over formally. Document what was checked, the evidence, the open questions and the next steps in the case. Brief the incoming analyst directly, and raise priority if risk is high. Never close an undetermined alert to clear the queue.
>
> **Lesson:** time boxes end in escalation, not silence.
