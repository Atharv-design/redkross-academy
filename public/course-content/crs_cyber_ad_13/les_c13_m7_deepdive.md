This deep dive runs a complete, if small, assessment of the lab domain using both tools, then drafts the remediation plan.

Configuration/hygiene review (dir_review.py, Module 5), execution-tested:

```output
AD HYGIENE REVIEW  (user objects: 10, findings: 5)
[HIGH  ] legacy-svc   SPN -> Kerberoastable (gMSA / 25+ char pw, AES)
[MEDIUM] Guest        password never expires
[MEDIUM] legacy-svc   password never expires
[LOW   ] legacy-svc   enabled but never logged on
[LOW   ] rohan        enabled but never logged on
exit=1  (a HIGH finding is present)
```

Activity review (auth_monitor.py, Module 6), execution-tested:

```output
all observed Kerberos auth used AES (no RC4/DES) - good
Tier 0 logons observed from: 172.17.0.2  (confirm source is a PAW)
(failed-logon burst for asha fires at --fail-threshold 4)
```

Access review (samba-tool group listmembers), execution-tested summary:

```output
Domain Admins : t0-admin (+ built-in Administrator)   OK (small, named)
Server-Admins : t1-srvadm                              OK
Helpdesk      : t2-help, asha                          review asha's need
```

Drafted remediation plan (the deliverable):

```output
# finding              sev    fix                          owner   verify
1 legacy-svc SPN       HIGH   move to gMSA; remove SPN     IdentityOps
                                                           re-run dir_review
2 Guest never-expire   MED    confirm Guest disabled;      IdentityOps
                              set policy                   re-run dir_review
3 legacy-svc dormant   LOW    disable; decommission        IdentityOps
4 asha in Helpdesk     LOW    confirm need with manager    AccessOwner
5 Tier 0 source check  INFO   verify logons from PAW only  SecOps  monitor
```

**Interpretation:**

- Finding 1 is the single priority: it is the only HIGH, it is the Kerberoasting precondition (Module 5), and closing it flips the tool's exit code to 0 - a measurable improvement.
- The access review adds a human finding (asha's Helpdesk membership) that no tool can decide: only the manager knows if it is still needed.
- Each item has a verification step; most are "re-run dir_review.py", which is why the tool's exit code is the programme's progress metric.

**Limitations:** a real assessment also reviews ACLs, GPO permissions, trusts and audit policy; the lab automates the account-level checks and demonstrates the end-to-end method - review, score, plan, verify - on them.
