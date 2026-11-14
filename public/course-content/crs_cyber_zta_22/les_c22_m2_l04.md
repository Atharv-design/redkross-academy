Device posture as an access condition: is the device known and managed (MDM/UEM), compliant (patched, disk encrypted, EDR healthy, firewall on), and not reported compromised? Signals come from device management and EDR and are evaluated by the IdP or access proxy at each session.

**Design patterns:**

- managed-device requirement for confidential/restricted apps;
- unmanaged (BYOD) devices allowed only to low-sensitivity apps or via browser isolation/virtual desktop;
- compliance failure leads to deny or remediation, not silent allow.

**Execution-tested decisions:**

```text
------------------------------------------------------------- BEGIN OUTPUT
ravi  payroll-app  push_number_match  managed=False risk=low -> DENY
      unmanaged device not allowed for this resource
asha  intranet     otp                managed=False risk=low -> ALLOW
      entitled; auth 2; device unmanaged (permitted here); risk low
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

The policy differentiates by resource sensitivity rather than blocking all personal devices: intranet is permitted from an unmanaged device; payroll is not.
