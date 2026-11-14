Harden across the course's themes, each change tied to a module:

```text
Authentication (Module 2)
  - confirm AES in use; plan to disable RC4/DES where supported.
Administration and accounts (Modules 3-5)
  - remove unnecessary SPNs; move service accounts to gMSAs or enforce a
    25+ char PSO; ensure no SPN-bearing account is in a privileged group;
    disable dormant accounts; fix any never-expire or disabled-pre-auth
    flags; keep privileged groups small and named.
Enterprise model (Module 4)
  - add administrative accounts (t0-admin, t1-srvadm) to Protected Users;
    document the PAW and clean-source target state; note LAPS for member
    hosts.
Monitoring (Module 6)
  - confirm auditing is on and events are captured; define the three
    detections and their thresholds; document off-host forwarding for
    production.
```

Each item is a line in the report with a control reference and a risk.
