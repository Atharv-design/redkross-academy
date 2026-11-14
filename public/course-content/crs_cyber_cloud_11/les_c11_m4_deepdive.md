1. Classification drives controls (Course 22 Module 5): restricted data uses customer-managed keys with separated custody.
2. Access: identity-based only; Azure Shared Key disabled; SAS only via user delegation with maximum 1-hour expiry for exports.
3. Exposure: account-level Block Public Access; Azure anonymous access disallowed and public network access disabled for restricted accounts; private endpoints (Module 3).
4. Encryption: SSE-KMS per data class; TLS 1.2 minimum; bucket policies deny non-TLS requests.
5. Keys: key administrators in the security team; usage by workload roles only; rotation on; deletion alarms.
6. Recovery: versioning and soft delete everywhere; backups copied to a separate backup account with vault lock; quarterly restore tests.
7. Retention: lifecycle rules matching the records schedule; personal data deleted when purpose ends.
8. Verification: data_lab.py-style audits run daily across accounts; checkov in CI (Module 6).
