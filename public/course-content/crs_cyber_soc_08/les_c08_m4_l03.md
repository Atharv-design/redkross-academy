**Typical enrichment sources:**

| Term | Meaning |
|---|---|
| Asset | CMDB or asset inventory: owner, function, criticality, location, OS, internet exposure. |
| Identity | directory and IdP: department, role, privileges, manager, account age, recent MFA changes. |
| Network | internal or external; geolocation and ASN; reputation and threat-intel matches (Module 5); first-seen date. |
| History | earlier alerts and cases for the entity; baseline behaviour, such as whether this user normally runs PowerShell. |
| Vulnerability | is the host missing patches relevant to the alert? |

Enrichment can be automated (Course 20 covers SOAR), but analysts must know where each value comes from and how fresh it is. A stale CMDB that lists a decommissioned server as "low criticality" is worse than no data.

Execution-tested example (LAB_ASSETS/C08/triage.py) enriches the minisiem rule hits with asset and user tables and computes the priority formula from L01:

```text
------------------------------------------------------------- BEGIN OUTPUT
10.8  R5 log_cleared             host=WS-104 (finance workstation)
      user=divya (payments approver) ip=n/a
 7.2  R2 vpn_spray_then_success  host=WS-107 (sales laptop) user=gopal
      (standard) ip=external (documentation range in this lab)
 7.2  R1 office_spawns_script    host=WS-104 (finance workstation)
      user=divya (payments approver) ip=n/a
 5.4  R3 new_local_admin         host=WS-104 ... (two hits)
 4.5  R4 large_upload            host=WS-104 ...
 3.6  R6 beacon_regular_small    host=WS-104 ... user=None (?)
--------------------------------------------------------------- END OUTPUT
(execution-tested with CPython 3.14.4; lines wrapped for width)
```

**Observations:**

- VPN events carry no host, so the helper maps the user to a primary device (PRIMARY_HOST). Real SOCs use DHCP, VPN and EDR data to make this link, and you should record which method was used.
- R6 has no user because the rule groups by host and URL. Missing fields are normal, and enrichment must tolerate them.
- The highest score (log cleared, 08:17) is the latest event in the attack. Priority ordering tells you where to start working, but the investigation must reconstruct the sequence from 06:12 onward.
