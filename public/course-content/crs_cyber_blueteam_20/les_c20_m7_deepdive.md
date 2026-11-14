LAB_ASSETS/C20/purple.py (execution-tested, CPython 3.14.4) defines eight cases as synthetic events, replays them against two rule directories and runs a regression over tamarind_telemetry.jsonl. The tuned rules are in detections/tuned. The diff for the encoded-command rule:

```text
BEGIN CODE
-    selection:
-        Image|endswith: '\powershell.exe'
-        CommandLine|contains: ' -EncodedCommand '
-    condition: selection
+    selection_image:
+        Image|endswith:
+            - '\powershell.exe'
+            - '\pwsh.exe'
+    selection_flag:
+        CommandLine|contains:
+            - ' -EncodedCommand '
+            - ' -ec '
+            - ' -e '
+    condition: all of selection_*
END CODE
```

The Office rule gained '\pwsh.exe' in its Image list. Both tuned rules carry "modified: 2026-11-07", and the encoded-command rule moved from experimental to test.

```output
case   technique  variant                                          baseline  tuned
PT-01  T1059.001  encoded command, full parameter name             DETECTED  DETECTED
PT-02  T1059.001  encoded command, documented alias -ec (pwsh)     MISSED    DETECTED
PT-03  T1059.001  encoded command, documented alias -e (pwsh)      MISSED    DETECTED
PT-04  T1059.001  encoded command, Windows PowerShell, lower case  DETECTED  DETECTED
PT-05  T1566.001  Word starts Windows PowerShell                   DETECTED  DETECTED
PT-06  T1566.001  Word starts PowerShell 7                         MISSED    DETECTED
PT-07  T1053.005  task runs script from Public folder              DETECTED  DETECTED
PT-08  T1685.005  Security log cleared                             DETECTED  DETECTED
baseline: 5/8 cases detected
tuned: 8/8 cases detected

Regression on full dataset (hits per rule):
  rk_dns_long_txt_label.yml                baseline=82   tuned=82
  rk_office_spawns_powershell.yml          baseline=1    tuned=1
  rk_powershell_encoded_command.yml        baseline=1    tuned=1
  ... (all seven rules unchanged)
rules with changed hit counts: 0
```

**Also tested:** the tuned pack passes all 18 unit tests, and sigma-cli 4.0.0 reports 0 issues. The Splunk conversion of the tuned rule is:

```output
(Image IN ("*\\powershell.exe", "*\\pwsh.exe"))
  (CommandLine IN ("* -EncodedCommand *", "* -ec *", "* -e *"))
```

(The output is one line; it is wrapped here.) PT-04 passed in the baseline because Sigma string matching is case-insensitive (Module 4).

**Limitations:** replay tests rule logic only. A real pwsh.exe launch may be logged with a different Image path, or not at all if the sensor's configuration excludes it. Benign simulation in a lab tests that.
