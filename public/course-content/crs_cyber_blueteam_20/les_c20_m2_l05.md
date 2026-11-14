Typical controls, from least to most disruptive:

- collect a triage package (process list, network connections, autoruns, recent files, memory if justified - Course 09 Module 3);
- kill a process or quarantine a file;
- block a hash, domain or address;
- disable or reset an account, and revoke its sessions and tokens;
- network-isolate the host (EDR isolation keeps the management channel open);
- reimage the host.

**Principles:** preserve volatile evidence before disruptive actions where the risk allows. Contain the identity as well as the host (a stolen password works from any machine). Coordinate changes so that the attacker is not warned piecemeal while still active elsewhere. Get approval in proportion to impact (Module 6). On WS-07 the likely sequence is: collect a triage package; isolate WS-07; disable and reset svc-print and user07's credentials; remove the scheduled task; then scope FS-01 and other hosts for the same indicators.
