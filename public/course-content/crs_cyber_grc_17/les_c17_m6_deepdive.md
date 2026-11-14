Many access, change and configuration controls can be tested completely with data, as the toolkit does in miniature:

| Term | Meaning |
|---|---|
| Leavers | HR leavers (ID, leave date) joined with directory accounts (enabled, last logon). Exception: enabled and leave date more than 1 day before the extract date. |
| Privileged | members of admin groups compared with the approved privileged-user list. |
| MFA | admin accounts compared with MFA enrolment and conditional access coverage. |
| Changes | production deployments joined with change tickets. Exception: a deployment with no approved ticket. |
| Patching | vulnerability scan results joined with the asset inventory. Exception: a critical vulnerability older than 14 days. |
| Backups | backup job logs per critical system. Exception: no successful backup within the RPO window. |

**Practice points:**

- Obtain extracts directly, or watch them being run (reliability). Record the query and extract time.
- Reconcile population completeness. Does the account list match the totals from the directory console?
- Minimise personal data in working files, and protect them.
- Script the test so it can be re-run each quarter (continuous assurance), and keep the script with the working papers.
- Investigate each exception with the owner. Some will be legitimate, such as a documented exception (Module 4).
