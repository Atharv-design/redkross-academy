Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Users intermittently fail to authenticate to one application with a "clock skew too great" error.

**Task:** Explain the Kerberos cause and the fix, and which role is the domain time source.

> [!TIP] Model answer
> Kerberos tickets carry timestamps and the KDC rejects those outside the allowed skew (five minutes by default), so a client or server whose clock has drifted fails authentication. Fix by synchronising time: ensure the affected hosts sync to the domain hierarchy, which is anchored by the PDC emulator FSMO role (Module 1). Do not widen the skew window as a workaround.
>
> **Lesson:** Kerberos depends on synchronised clocks; the PDC emulator is the time source.

## Scenario 2

A reviewer finds that an application's service account is set to "support RC4 encryption".

**Task:** Explain the risk and give a safe remediation sequence.

> [!TIP] Model answer
> RC4 service tickets are far easier to crack offline than AES, so an RC4 service account is a soft Kerberoasting target. Remediate safely: set a long random password (or move to a group managed service account), enable AES on the account, test the application with AES, then remove RC4 support; confirm from telemetry that new tickets use AES (Module 6). Document the change so it is not reverted.
>
> **Lesson:** remove RC4; fix the root cause instead of downgrading.

## Scenario 3

A developer proposes authenticating an internal web app with LDAP simple binds over plain port 389 "because it is inside the firewall".

**Task:** Explain the problem and give two better options.

> [!TIP] Model answer
> A simple bind over port 389 sends the DN and password in cleartext; anyone who can see the traffic (a compromised switch, a rogue host, a packet capture) reads the password, and "inside the firewall" is not a security boundary. Better: use LDAPS (636) or StartTLS so the bind is inside TLS; or, best, use SASL/GSSAPI so no password crosses the wire at all. Also apply least privilege to the bind account.
>
> **Lesson:** never send simple binds in the clear; prefer GSSAPI or at least TLS.
