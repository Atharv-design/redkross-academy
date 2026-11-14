Some valuable logs are not on by default, cost money, or depend on licence:

- CloudTrail data events (S3 object reads, Lambda invocations) - enable for restricted buckets at least.
- S3 server access logs and Azure Storage diagnostic logs (the Module 6 checkov scan flags missing S3 access logging and Azure queue logging).
- VPC/VNet flow logs.
- Database audit logs.
- Microsoft Purview Audit events. CISA's playbook notes that users must enable SearchQueryInitiated logging for both Exchange and SharePoint because it is disabled by default [R3].

Write a logging standard listing each source, whether it is required, its destination, retention and owner, and check it automatically (Module 6).
