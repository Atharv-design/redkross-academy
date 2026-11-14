Design to remediate payroll-export's findings:

1. Classification: restricted (payroll, bank details, national IDs).
2. Keys: a dedicated KMS CMK "payroll-fle" in the security account; key policy allows Encrypt/GenerateDataKey for the payroll-export workload role and Decrypt only for the payroll processing role; key administration by sec-keys group, which has no data access; rotation enabled; CloudTrail/Activity logging of key use to the SIEM.
3. Envelope encryption per export file (AES-256-GCM DEK, wrapped by the CMK; AAD = export id + purpose; Course 15 M02 and M08 patterns).
4. Transport: delivery to the payroll provider via SFTP replaced by an API with mTLS and signed requests, or an object store with pre-signed, short-lived URLs and access logging.
5. Logging: export, key use and delivery events to the central SIEM with 365-day retention (>= 180-day CERT-In requirement).
6. Admin access: FIDO2 + JIT for payroll IT admins (Module 2).
7. Validation: arch_review.py rerun shows 0 findings for payroll-export; test that the data admin role cannot call Decrypt; test that tampered files fail authentication.
