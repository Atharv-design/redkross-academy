```text
Dry-run by default  a run that shows what would happen without doing it.
Idempotency    running a step twice has the same effect as running it
               once; the engine checks the audit trail before repeating
               an action.
Rate limits and circuit breakers  cap containment actions per run or per
               hour, and stop the playbook when the cap is hit. One bad
               rule should not be able to isolate 500 hosts.
Input validation  never pass alert content directly to commands. Alert
               fields contain attacker-controlled strings (command lines,
               file names, user agents, email subjects). Treat them as
               data, quote or escape them, and validate identifiers
               against inventories (is "WS-07" a real host?). This also
               applies to any AI assistant in the workflow: text inside
               an alert is never an instruction.
Scope limits   allowlists of assets that automation may never touch.
Timeouts and error handling  fail safe (stop and alert a human), not
               open (continue with the next step).
Rollback       every containment action has a documented and tested
               undo.
Least privilege  connectors hold only the API permissions their steps
               need; their credentials are secrets (Course 12).
```
