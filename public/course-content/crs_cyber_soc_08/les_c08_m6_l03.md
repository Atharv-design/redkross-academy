Sigma is an open, generic YAML format for describing log-based detections, which tools such as pySigma and sigma-cli convert into SIEM-specific queries [R1]. Main fields: title, id (UUID), status, description, references, author, date, tags (ATT&CK), logsource (category/product/service), detection (named selections and a condition), falsepositives, level. Course rule 1 (LAB_ASSETS/C08/rk_office_spawns_shell.yml):

```text
---------------------------------------------------------------- BEGIN CODE
title: Office Application Spawning Script Interpreter
logsource:
  category: process_creation
  product: windows
detection:
  selection_parent:
    ParentImage|endswith: '\WINWORD.EXE'
  selection_child:
    Image|endswith:
      - '\powershell.exe'
      - '\cmd.exe'
  condition: selection_parent and selection_child
tags:
  - attack.execution
  - attack.t1204.002
  - attack.t1059.001
level: high
------------------------------------------------------------------ END CODE
```

The "|endswith" modifier matches the end of the field; a list under one field means OR; separate selections combined with "and" mean both must hold. Validated with sigma-cli 4.0.0 (pySigma 2.0.2): "Found 0 errors, 0 condition errors and 0 issues." Converted with the Splunk backend 3.0.0 to:

```text
ParentImage="*\\WINWORD.EXE" (Image IN ("*\\powershell.exe", "*\\cmd.exe"))
```

(execution-tested).

Course rule 2 (rk_security_log_cleared.yml) detects Security event 1102 with logsource product windows, service security, and tag attack.t1685.005. It also checked with 0 issues. Converted with --without-pipeline, the Splunk output was simply

```text
EventID=1102
```

(execution-tested). Note what is missing: nothing restricts the search to the Security log. Without a processing pipeline that maps logsource to the right index or source type, the query could match an unrelated event 1102 from another log. Production conversions must use a pipeline matched to your data (sigma-cli lists them with "sigma list pipelines"). Converting the same rule with "-p splunk_windows" gave

```text
source="WinEventLog:Security" EventCode=1102
```

(execution-tested) - the pipeline added the log source and renamed EventID to the Splunk field EventCode. Use a pipeline only if it matches how your own data is indexed.
