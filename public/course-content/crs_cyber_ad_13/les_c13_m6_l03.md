Events exist only if auditing is on. On Windows this is the advanced audit policy (Logon/Logoff, Account Logon, Account Management, Directory Service Changes), ideally delivered by GPO as part of a baseline (Modules 3-4). The principles:

- Audit the high-value categories (logon, account logon, account management, directory changes) on domain controllers.
- Avoid auditing everything: noise hides signal and costs storage.
- Forward events off the DC to a SIEM so an attacker cannot simply clear the local log.

In the lab, the domain controller was provisioned with JSON audit logging enabled (the auth_json_audit and related options), so authentication events are produced and captured as structured data ready to parse.
