Behaviour is harder for an adversary to change than indicators (the Pyramid of Pain, Module 5). A tradecraft profile records, with sources:

- initial access: brand-impersonation lures, ISO archives with shortcut files (T1566.001, T1204.002);
- execution: PowerShell (T1059.001);
- persistence: scheduled tasks (T1053.005, community reporting);
- collection and exfiltration: archives sent over the command channel (T1560.001, T1041);
- resource development: lookalike domains, reused certificate (T1583.001, T1588.004);
- operational habits: registration days before use, one certificate across most lures, check-ins at regular intervals.

Profiles support detection (Module 7) and clustering of new events; they are weak evidence of identity because common techniques are common.
