Not all MFA is equal. In rough order of resistance to phishing and relay:

```text
password only             lowest assurance; reused and phished.
SMS / voice OTP           vulnerable to SIM swap and relay.
TOTP app codes            relayable by real-time phishing proxies.
push with number matching resists simple fatigue attacks; still relayable
                          in some flows.
FIDO2 / passkeys, smart cards  phishing-resistant: authentication is bound
                          to the site origin (Course 01 M05; Course 15 M05).
```

Architecture rules (aligned with NIST SP 800-63B-4 concepts, Course 01): require phishing-resistant MFA for administrators and access to restricted data; require MFA on every internet-facing access path - remote desktop portals, VPNs, webmail, admin consoles - with no "temporary" exceptions lacking expiry (British Library and Change Healthcare cases); protect recovery and enrolment flows as strongly as login. In the lab policy model (LAB_ASSETS/C22/zt_pdp.py) authentication strengths are password 1, OTP 2, push with number matching 2, FIDO2 3; restricted resources require 3. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
priya  shipment-portal-admin  fido2  managed=True risk=low -> ALLOW
       entitled; auth 3; device managed+compliant; risk low
priya  shipment-portal-admin  otp    managed=True risk=low -> STEP_UP
       auth strength 2 < required 3
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4; wrapped)
```

The same entitled administrator is asked to step up when using OTP - the policy demands phishing-resistant authentication for a restricted admin portal.
