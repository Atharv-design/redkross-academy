Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A new rule fires 5,000 times on day one.

**Task:** Respond.

> [!TIP] Model answer
> Disable or set to log-only via change control rather than flooding the queue; sample hits to find the common benign cause; narrow logic; re-test with historical replay before re-enabling; record why the pre-deployment replay missed it.
>
> **Lesson:** test volume before deployment.

## Scenario 2

An auditor's coverage report cites T1070.001 for your log-clearing rule.

**Task:** Update the mapping correctly.

> [!TIP] Model answer
> Check the ATT&CK version the auditor used; in v20.1 map to T1685.005 Clear Windows Event Logs (Defense Impairment); record the version in the rule and report; note the historical ID for traceability; review other mappings for the same restructuring.
>
> **Lesson:** mappings are versioned data.

## Scenario 3

Threat intel reports attackers using a renamed rclone binary to exfiltrate to cloud storage.

**Task:** Design a detection.

> [!TIP] Model answer
> **Behaviour rather than name:** process creation with OriginalFileName or hashes of rclone regardless of image name; command-line arguments typical of copy/sync to remote; network connections from unusual processes to cloud storage APIs; large outbound volume per process; map to T1567.002; test with a lab copy renamed; document false positives (IT backups).
>
> **Lesson:** anticipate the renaming the intelligence already describes.
