Several ATT&CK techniques centre on identity and endpoints (all verified current at source 2026-11-08):

```text
T1078 Valid Accounts        using legitimate credentials to access, persist or
                            escalate - quiet because it looks legitimate. It spans
                            multiple tactics (including Initial Access and
                            Privilege Escalation).
T1087 Account Discovery     enumerating accounts and groups to find targets.
T1550 Use Alternate Authentication Material  authenticating with tokens/tickets
                            instead of a password (relevant to lateral movement,
                            Module 5).
```

These are "living off the land" with identity: they abuse legitimate mechanisms, so signature-based detection is weak and BEHAVIOURAL telemetry (anomalous logons, odd-hour access, new source hosts, bulk enumeration) is the key to catching them. The emulation plan includes these so their detections can be tested.
