AWS describes the split as security "of" the cloud (the provider: hardware, facilities, the virtualisation layer, managed service infrastructure) and security "in" the cloud (the customer). For Amazon EC2 the customer manages the guest operating system, applications and security groups; for Amazon S3 the customer manages its data, encryption choices and IAM permissions [R2]. Microsoft's model is similar in principle.

**A practical responsibility matrix:**

```text
Layer                    IaaS (VM)     PaaS (managed DB)   SaaS (e-mail)
Physical, hypervisor     Provider      Provider            Provider
OS patching              Customer      Provider            Provider
Application/runtime      Customer      Shared              Provider
Network rules            Customer      Customer (access    Provider (+tenant
                                       rules)              settings)
Identity and access      Customer      Customer            Customer
Data classification,     Customer      Customer            Customer
retention, encryption
choices
Logging configuration    Customer      Customer            Customer
and review
```

Two rows never move to the provider: identity and access, and data. That is why most cloud incidents in this course are identity or configuration failures rather than provider failures.

**Inherited controls:** audits of a provider (for example SOC 2 or ISO/IEC 27001 reports) cover the provider's layers only. Customers must still evidence their own layers (Module 6, Module 8).
