SOC analysts usually recommend containment, and an authorised owner approves and executes it. Common options and their trade-offs:

```text
Network-isolate host (EDR)   stops spread and C2 and keeps memory for
                             forensics; disrupts the user.
Block domain/IP at proxy/DNS stops known C2 or exfiltration; the attacker
                             may switch infrastructure.
Disable account / reset      cuts credential use; resets may not end
password / revoke sessions   existing sessions or tokens, so revoke them
                             too.
Remove persistence           e.g. delete svc_update; do it after evidence
                             is captured, as part of eradication.
Power off                    usually not recommended first, because it
                             loses volatile evidence. Consider it only if
                             damage is ongoing, such as active
                             encryption.
```

**Principles:**

- Preserve evidence first where safe, but never let evidence collection delay containment of serious ongoing harm.
- Contain everything related at once when possible. Containing one host while the attacker holds other footholds warns them.
- Record who approved what, and when.
- Plan for business impact: isolating a payments approver needs a business workaround.

**For Banyan:** isolate WS-104; block both .example domains; disable svc_update (remove it after imaging); reset divya's and gopal's credentials and revoke their sessions and MFA tokens; block 203.0.113.66; hunt for the same indicators on other hosts (Module 8).
