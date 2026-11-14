Windows provides built-in protections that enforce parts of this model:

```text
Protected Users  a security group (well-known RID 525) whose members get
                 strong, non-configurable protections: Kerberos only with
                 AES; no NTLM, DES or RC4; no delegation; and a TGT
                 lifetime capped at 240 minutes (four hours) with no
                 renewal beyond it [R2]. It is intended for
                 high-value accounts (admins), not for service or computer
                 accounts, which it can break.
LAPS             the (Windows) Local Administrator Password Solution:
                 manages each machine's local administrator password as a
                 unique, random, rotated secret stored in the directory,
                 removing the shared-local-admin-password weakness that
                 enables lateral movement [R3].
account hardening sensitive accounts marked "Account is sensitive and
                 cannot be delegated"; admin accounts kept out of services;
                 smart-card or MFA requirements; disabling RC4/DES.
```

These controls make the tier model's rules enforceable rather than merely documented.
