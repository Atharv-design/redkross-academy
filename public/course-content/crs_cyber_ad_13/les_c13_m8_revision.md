## Revision

### Summary

The capstone assembles the course into a hardened contained lab and an evidence-backed audit report. Scope and authorise the work (your own lab); capture the BEFORE state; apply the hardening checklist across authentication (AES), administration and accounts (remove SPNs, gMSAs/PSOs, disable dormant accounts, small privileged groups), the enterprise model (Protected Users for admins, PAW/LAPS as targets) and monitoring (auditing, detections, forwarding); evidence each change (action, before, after, timestamp); capture the AFTER state; and write a six-part report (scope, method, before, actions, after, residual/forward plan) for both a technical reviewer and leadership. The lab arc closes the single HIGH Kerberoastable finding and flips the exit code, proving improvement. Residual items - physical PAW separation, a second DC, full Windows controls - are stated honestly as the forward plan, and hardening is paired with a tested recovery plan (krbtgt double-rotation, DC rebuild). This is the artefact that gets identity security funded.

### Important concepts

contained lab; hardening checklist; evidence; before/after assessment; the six-part report; residual risk; recovery.

### Key technical takeaways

tie every change to a control and a risk; prove closure with before/after tool output and the exit code; state residual risk and a forward plan; pair hardening with recovery.

### Glossary

| Term | Meaning |
|---|---|
| audit report | the evidence-backed account of findings, actions and closure. |
| before/after | paired assessment runs proving improvement. |
| forward plan | the production work the lab cannot complete, by control. |
| recovery plan | the tested procedure to rebuild trust after compromise. |
| residual risk | the risk that remains and is accepted or deferred. |

### Common mistakes

connecting the lab to production; asserting fixes without evidence; hiding residual risk; a report of tool output; hardening with no recovery plan.

### Revision questions

​1. Name the six report sections. 2. What evidence proves a finding is closed? 3. Why state residual risk, and give two lab residual items.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] Microsoft. "Best Practices for Securing Active Directory". URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) Accessed: 2026-11-08. Supports: the hardening checklist and review items.
- [R2] Microsoft. "Active Directory Forest Recovery Guide". URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/ad-forest-recovery-guide](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/ad-forest-recovery-guide) Accessed: 2026-11-08. Supports: CS1, krbtgt rotation and DC rebuild in recovery.
- [R3] Microsoft. "Protected Users security group". URL: [https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group](https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group) Accessed: 2026-11-08. Supports: Protected Users as a hardening control for admin accounts.
- [R4] Lab evidence. Before/after dir_review.py and auth_monitor.py output and exit codes (Samba 4.22.11, CPython 3.14), 2026-11-08.
