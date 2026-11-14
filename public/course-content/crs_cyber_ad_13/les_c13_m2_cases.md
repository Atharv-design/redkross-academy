## The MS14-068 Kerberos vulnerability, 2014 Context: in November 2014 Microsoft fixed MS14-068 (CVE-2014-6324), a flaw in the Windows Kerberos KDC. The KDC failed to validate the signature on the Privilege Attribute Certificate (PAC) - the part of a ticket that carries the user's group memberships - correctly. An attacker with any valid domain account could forge a ticket claiming membership of privileged groups such as Domain Admins, and the KDC would accept it [C13-M02-R4]. Why it matters for this module: it shows the whole trust model in one bug. Kerberos services trust the ticket because they trust the KDC's signatures; break the signature check and an ordinary user becomes a domain admin without ever knowing a privileged password. The only fix was the patch - no configuration mitigated it fully. Lessons: tickets are only as trustworthy as the KDC's cryptography; keep domain controllers patched as a first-order identity control; the PAC is a security-critical part of a ticket, not a detail.



## (FICTIONAL TEACHING SCENARIO): The app that forced RC4

**Context:** Sahyadri Logistics (fictional) runs an old shipment-tracking web app that authenticates users through Kerberos. Its service account was configured years ago to use RC4, and a well-meaning administrator set "this account supports RC4" to "fix" intermittent logon errors.

**What happened:** a routine review (Module 5's dir_review.py style) and the authentication monitor (Module 6) together showed that service tickets for this app's SPN were being issued with RC4, not AES. Because RC4 tickets are far easier to crack offline, the account was a soft target for Kerberoasting.

**Response:** the team set the account to a long random password, enabled AES on the account, tested the app with AES, and then removed RC4 support; monitoring confirmed subsequent tickets used AES256. They documented the app change so the "fix" would not be reapplied.

**Lessons:** "support RC4" flags are a liability; fix the root cause (clock skew, SPN or password issues) rather than downgrading cryptography; verify the encryption type from telemetry, do not assume it.
