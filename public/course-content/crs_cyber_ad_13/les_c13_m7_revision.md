## Revision

### Summary

An assessment is a repeatable loop: plan and authorise scope; review configuration/hygiene (dir_review.py), activity (auth_monitor.py) and access (group membership, with the business); score findings HIGH/MEDIUM/LOW by impact and exploitability; write a remediation plan with evidence, owners, due dates and verification; apply fixes; and re-test to prove closure and measure the trend. The lab assessment found one HIGH (the Kerberoastable legacy-svc), confirmed all-AES activity and small named privileged groups, and drafted a plan whose top item flips the tool's exit code to 0 when closed. Tools provide the data and a first score; humans confirm real risk (expected conditions versus findings) and decide access needs. The programme's value is the trend - fewer HIGH findings, faster remediation - backed by re-test evidence, exactly what auditors and leadership fund.

### Important concepts

authorised scope; configuration/activity/access review; scoring; remediation plan; verification; the assessment loop.

### Key technical takeaways

combine both lab tools plus access data; attach evidence to every finding; gate on HIGH via the exit code; measure the trend.

### Glossary

| Term | Meaning |
|---|---|
| access review | confirming who holds which privileges and whether needed. |
| findings register | the scored list of findings with evidence. |
| remediation plan | findings turned into owned, dated, verifiable work. |
| re-test | re-running a check to prove a finding is closed. |
| scope | the authorised boundary and rules of an assessment. |

### Common mistakes

assessing without authorised scope; delivering tool dumps instead of a scored plan; no evidence or owners; never re-testing; letting a tool's label override contextual risk.

### Revision questions

​1. What must a remediation item contain? 2. How do you prove a finding is closed? 3. What three reviews feed the register?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] Microsoft. "Best Practices for Securing Active Directory". URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) Accessed: 2026-11-08. Supports: review of privileged groups, delegation, accounts; the recurring misconfigurations.
- [R2] Microsoft. "Audit policy recommendations" and AD security assessment guidance. URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations) Accessed: 2026-11-08. Supports: CS1, standard review items and evidence.
- [R3] CIS. "CIS Controls v8" (Control 5 Account Management, Control 6 Access Control Management). URL: [https://www.cisecurity.org/controls/v8](https://www.cisecurity.org/controls/v8) Accessed: 2026-11-08. Supports: access review and account-management control framing.
- [R4] Lab evidence. dir_review.py, auth_monitor.py and group enumeration output combined into the register in section 3 (Samba 4.22.11), 2026-11-08.
