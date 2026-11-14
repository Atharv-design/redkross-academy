Two ATT&CK techniques in the plan centre on lateral movement (verified current at source 2026-11-08):

```text
T1021 Remote Services   moving between hosts via legitimate remote-management or
                        access services using valid credentials. The hop looks
                        like administration, so the signal is the UNUSUAL path
                        (e.g. workstation-to-workstation admin) and timing.
T1550 Use Alternate Authentication Material  authenticating with tokens or tickets
                        rather than a password, so no password is entered on the
                        target. The signal is a logon using non-interactive auth
                        material with no matching interactive logon.
```

Both abuse legitimate authentication, so detection is behavioural and relies on correlating authentication and network telemetry across hosts. The emulation plan includes both so their detection opportunities can be tested.
