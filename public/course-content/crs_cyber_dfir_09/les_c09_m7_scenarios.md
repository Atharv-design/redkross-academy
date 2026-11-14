Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

You confirm a web shell on one server; logs suggest the attacker is quiet.

**Task:** Decide on containment timing.

> [!TIP] Model answer
> Preserve evidence (memory, logs, the web shell) immediately. Sweep the estate for the web shell's indicators and for the access path. If no active damage is seen and the risk is accepted by the incident lead (recorded), plan coordinated containment of all footholds shortly. Contain immediately if data theft or spread is seen. Block the known infrastructure as part of coordinated action.
>
> **Lesson:** timing is a recorded risk decision.

## Scenario 2

The business wants the restored ERP back today; eradication validation is unfinished.

**Task:** Advise.

> [!TIP] Model answer
> Explain the re-compromise risk. Propose conditions: restore from a pre-compromise backup; verify against the baseline; reset credentials used by the ERP; restrict access (VPN with MFA, allowlist); enhanced monitoring; and a defined rollback plan. Let the business owner accept residual risk in writing if pressing ahead.
>
> **Lesson:** recovery is a risk decision with clear conditions.

## Scenario 3

After the incident, a manager wants to skip the lessons-learned meeting.

**Task:** Respond.

> [!TIP] Model answer
> **Explain the value:** reduced repeat incidents, regulatory expectations and insurer interest. Offer a short, blameless format focused on actions with owners. Note that root-cause actions (patching, MFA, telemetry) are only tracked if recorded.
>
> **Lesson:** lessons learned is where incidents stop recurring.
