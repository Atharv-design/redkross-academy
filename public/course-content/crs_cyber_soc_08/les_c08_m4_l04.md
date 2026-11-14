Validation means looking at the evidence behind an alert and asking what else would be true if the alert were real, and whether that is present. For R1 (Word spawning PowerShell on WS-104 at 06:14):

- Was a document opened just before? Yes: invoice.docm was downloaded from banyan-payroll-update.example at 06:12, a look-alike of the company name.
- Did PowerShell do anything? The command line contains -NoP -W Hidden -EncodedCommand (hidden window, encoded script), which is suspicious.
- Did the host make new network connections afterwards? Yes: from 06:17, 18 requests of exactly 220 bytes to cdn-telemetry-sync.example.
- Is there an approved business reason? Ask the user or the application owner. Some finance macros do launch scripts legitimately.

Corroboration across sources turns "suspicious" into "confirmed". Refutation is also valuable. If the parent were an approved add-in with a signed script, the alert would be a benign true positive.

A query pitfall to avoid (execution-tested): an analyst looking for all non-beacon activity on WS-104 wrote

```text
SELECT COUNT(*) FROM events WHERE host='WS-104' AND NOT (url LIKE '%ping%')
```

which returned 31. The correct query returned 40:

```text
... AND (url IS NULL OR url NOT LIKE '%ping%')
```

In SQL, a comparison with NULL is neither true nor false, so events without a URL (Windows and Sysmon events, including the 06:14 PowerShell start) silently disappeared. Other SIEM languages have similar behaviour with missing fields. Before you conclude "nothing happened", check that your filter cannot exclude the evidence.
