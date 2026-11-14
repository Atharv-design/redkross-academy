Sigma is an open, vendor-neutral YAML format for log detections. The specification is maintained by SigmaHQ; version 2.1.0 of the rules specification was released on 2025-08-02 [R1]. It defines three mandatory sections: title, logsource and detection (with a condition inside detection). Recommended metadata: id (a UUID that never changes), status, description, author, date and modified, tags (ATT&CK tactics and techniques), falsepositives and level. The Tamarind archive rule:

```text
BEGIN CODE
title: Archive tool run against a network share
id: 1402e423-da6d-5f06-ad2f-862888667ab0
status: experimental
tags:
    - attack.collection
    - attack.t1560.001
logsource:
    category: process_creation
    product: windows
detection:
    selection_tool:
        Image|endswith:
            - '\tar.exe'
            - '\7z.exe'
            - '\rar.exe'
    selection_unc:
        CommandLine|contains: ' \\\\'
    condition: all of selection_*
falsepositives:
    - Backup or migration jobs; these should run from service accounts on servers.
level: medium
END CODE
```

(Some metadata lines are omitted here; the full rule is in detections/rules.) The lab generated the UUIDs deterministically with uuid5 so that every learner gets the same IDs. In production, generate a random UUID once per rule and never reuse it.
