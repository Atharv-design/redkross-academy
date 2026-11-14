```text
Concept              AWS                          Azure
Top organisation     AWS Organizations (org,      Microsoft Entra tenant;
                     organisational units)        management groups
Billing/isolation    account                      subscription
boundary
Grouping             tags; resource groups        resource groups; tags
Identity             IAM (users, roles,           Microsoft Entra ID (users,
                     policies); IAM Identity      groups, service principals,
                     Center                       managed identities); Azure
                                                  RBAC
Guardrails           service control policies     Azure Policy; management
                     (SCPs)                       group policy assignments
Network              VPC, subnets, security       VNet, subnets, network
                     groups, route tables         security groups (NSGs)
Audit log            CloudTrail                   Activity log; Entra sign-in
                                                  and audit logs
Key management       AWS KMS                      Azure Key Vault
```

**Geography:** both providers have regions (independent geographic areas) and availability zones (separate data centres within a region). Data residency obligations (for example India's DPDP Act, Course 01 Module 7) influence region choice; resilience designs span zones and sometimes regions.

**Landing zones:** a planned multi-account (AWS) or multi-subscription (Azure) structure with separate environments (production, non-production), a dedicated security/log-archive account, central identity, and guardrails applied from the top. Separate accounts or subscriptions are the strongest isolation boundary customers control.
