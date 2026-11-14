**Trigger:** SOC alert for staging and download of customers.csv from web01 (Module 6 timeline).

1. Declare and assemble. Incident lead, technical lead, legal and communications. Open a case and incident log. Note the CERT-In clock start (time noticed).
2. Preserve. Memory capture (Module 4) and live response (processes, connections, users); a VM snapshot or disk image (Module 2); copies of auth.log, journal, web logs and the pcap window (Module 6). Hash everything.
3. Analyse and scope. Build the timeline (login 05:49:12Z, sudo copy 05:50:03Z, download 05:51:40Z). Find the deploy key's origin, where else the key and the IP 172.31.0.20 were used, and other staged files. Sweep all servers for the indicators.
4. Contain. Block 172.31.0.20 (or the real external source); remove /srv/backup from the web root; disable the deploy account's key; isolate web01 if further activity is seen.
5. Eradicate. Rebuild web01 from a gold image; rotate all keys and secrets on it; review authorized_keys estate-wide; fix the misconfiguration that let deploy use sudo cp into the web root.
6. Recover. Restore content from a pre-incident backup; compare with the baseline (baseline_diff.py); return to service with enhanced monitoring for 30 days.
7. Notify. Legal decides on CERT-In, DPDP and customer notification based on the facts (the customer list was taken).
8. Lessons learned. Within 14 days, record root cause and actions.

Each step names an owner and the evidence produced. The playbook is a starting point, adapted to the facts of each incident.
