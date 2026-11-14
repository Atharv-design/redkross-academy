Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An executive orders "wipe and reimage WS-104 now, we need it back by noon".

**Task:** Respond.

> [!TIP] Model answer
> **Explain the risk:** wiping destroys evidence needed to scope the incident, including what was exfiltrated and other footholds, and to meet legal duties. Propose isolating now (which stops harm), imaging memory and disk quickly, and giving the user a clean replacement device to keep business running. Then rebuild WS-104. Escalate the decision to the incident lead and record it.
>
> **Lesson:** offer a business-friendly alternative rather than a flat refusal.

## Scenario 2

The incident lead asks whether the 48.2 MB upload contained personal data. You do not know.

**Task:** Respond appropriately.

> [!TIP] Model answer
> State what is known (size, time, destination, process if known) and what is unknown. Propose how to find out: proxy content logs if any, DLP, files accessed on WS-104 before 08:12Z, and forensic analysis. Give a confidence level and a time estimate. Do not guess, because legal decisions (DPDP) depend on the answer. Flag that reporting decisions may need to proceed before certainty.
>
> **Lesson:** precise uncertainty is professional.

## Scenario 3

You find that the attacker may be reading the IT team's chat.

**Task:** Adjust communication.

> [!TIP] Model answer
> Move incident communication to a pre-arranged out-of-band channel, such as separate accounts, phone bridges or a separate tenant. Limit participants. Avoid discussing containment plans on the compromised platform. Consider that the attacker may already know about the investigation, and accelerate coordinated containment. Record the change.
>
> **Lesson:** assume compromise of shared tools.
