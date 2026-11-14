These two techniques target how Kerberos protects tickets (Module 2).

```text
Kerberoasting (MITRE ATT&CK T1558.003): any authenticated domain user can
request a service ticket for any account that has a Service Principal
Name. That ticket is encrypted with the service account's key (Module 2),
so the attacker takes it away and cracks it offline to recover the
password - especially fast if the ticket is RC4. Preconditions: an SPN on
an account with a weak or guessable password (worst on a normal user
account). Controls: long random passwords or gMSAs for SPN accounts;
AES-only; remove unnecessary SPNs; monitor service-ticket requests
[R1].
AS-REP roasting (MITRE ATT&CK T1558.004): if an account has "do not
require Kerberos pre-authentication" set, an attacker can request
authentication data for it and crack it offline without any valid
credentials at all. Precondition: the DONT_REQ_PREAUTH flag
(userAccountControl bit 0x400000). Control: do not disable pre-auth;
find and fix any account that has it disabled [R2].
```

Both are OFFLINE cracking attacks, so the defence is to make the secret uncrackable (length and randomness) and to remove the precondition (the SPN or the disabled pre-auth) where it is not needed.
