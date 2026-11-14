## Kerberoasting in ransomware intrusions Context: Kerberoasting (T1558.003) has become a routine step in ransomware and hands-on-keyboard intrusions, because it needs only an ordinary domain account and yields service-account passwords that are often over-privileged. MITRE ATT&CK documents the technique and its mitigations, and CISA's joint advisories on major ransomware operations repeatedly list Kerberoasting and the use of valid accounts among observed techniques [C13-M05-R1]. Why it matters for this module: the attack is cheap and quiet, and it depends entirely on a condition defenders can find and fix in advance - an SPN on an account with a weak password. The lab's review tool flags exactly that condition. Lessons: treat every SPN-bearing account as a target; enforce long random secrets or gMSAs; disable RC4; monitor service-ticket requests; and review regularly, because new SPNs appear as applications are deployed.



## (FICTIONAL TEACHING SCENARIO): The review that paid for itself

**Context:** Sahyadri Logistics (fictional) ran dir_review.py for the first time before a planned audit. It found the legacy-svc account carrying an SPN with a non-expiring password that had never been used interactively - three weaknesses at once (deep dive).

**What happened:** investigation showed the application that once used the account had been decommissioned a year earlier, but the account and its SPN remained, with a short password set at creation. Any domain user could have Kerberoasted it.

**Response:** the team removed the SPN, disabled the account, and added a monthly dir_review.py run that gates on HIGH findings (exit code 1) before change windows. They also moved the one service account still in use to a gMSA.

**Lessons:** dormant SPN accounts are pure risk with no benefit; a scheduled hygiene review turns an unknown attack path into a routine finding; decommission identities when you decommission applications.
