Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A rule is urgently needed during an incident, but it fails G4 because it is noisy.

**Task:** Decide how to release it.

> [!TIP] Model answer
> Release it under a documented, time-limited exception: the incident ticket as the reason, the incident commander as the owner, an expiry of days not months, and routing to the incident team rather than the general queue. Narrow its scope if possible (affected hosts only). After the incident, tune it to meet the budget or retire it.
>
> **Lesson:** exceptions are a controlled path, not a bypass.

## Scenario 2

The board asks, "Are we protected now?" after the Tamarind incident.

**Task:** Draft a three-sentence answer.

> [!TIP] Model answer
> "The intrusion on one finance workstation has been contained, and we can now detect the same techniques on all workstations for process activity and on a quarter of them for security logs. Security-log forwarding to every workstation is the most important remaining gap, and we are asking for approval to fix it this quarter. We will report coverage and test results with denominators every month."
>
> **Lesson:** honest, decision-oriented, measurable.

## Scenario 3

Your IDS dashboard shows normal alert volume, but inspected-TLS sessions fell from 40% to 0% last night.

**Task:** Respond.

> [!TIP] Model answer
> Treat it as a monitoring outage. Check the inspection device's certificates, licences and policy changes, restore inspection and confirm with a known test session. Assess what passed uninspected during the gap (flows, DNS, endpoint telemetry for that period). Add a health alert on the inspected-session ratio and on certificate expiry.
>
> **Lesson:** watch the inputs, not only the alerts (compare GAO-18-559).
