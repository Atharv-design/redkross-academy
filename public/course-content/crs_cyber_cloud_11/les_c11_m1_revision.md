## Revision

### Summary

NIST SP 800-145 defines cloud computing by five characteristics, three service models and four deployment models, each with security consequences. AWS and Azure organise resources into organisations/tenants, accounts/subscriptions and regions/zones; landing zones separate environments and centralise identity, logging and guardrails. Shared responsibility divides security "of" and "in" the cloud: customers always own identity and access, data and logging configuration. Every control-plane action is an authenticated API call, which makes identity the main perimeter and control-plane logs essential. A defender's threat model maps assets and trust boundaries to preventive and detective controls, log sources, responses and owners. Provider-side issues such as ChaosDB (August 2021) require customer action - key rotation, log review and stronger authentication choices.

### Important concepts

shared responsibility; control versus data plane; landing zones.

### Key technical takeaways

responsibility matrices; threat-model tables with log sources; organisation guardrails.

### Glossary

| Term | Meaning |
|---|---|
| Availability zone | Separate data centre(s) within a region. |
| Control plane | APIs that manage resources and permissions. |
| Data plane | Operations on data and workloads. |
| Landing zone | Pre-planned multi-account/subscription structure. |
| SCP | AWS service control policy. |
| Shared responsibility | Division of security duties. |

### Common mistakes

assuming provider certificates cover customer layers; one account for everything; spreadsheet asset inventories.

### Revision questions

​1. Map the five NIST characteristics to security consequences. 2. What remains with the customer in SaaS? 3. Write three threat-model rows for a database.

### Further reading

NIST SP 800-145 [R1]; AWS shared responsibility [R2].

## References

- [R1] NIST. SP 800-145, "The NIST Definition of Cloud Computing", P. Mell and T. Grance, September 2011. URL: [https://csrc.nist.gov/pubs/sp/800/145/final](https://csrc.nist.gov/pubs/sp/800/145/final) Accessed: 2026-11-07.
- [R2] AWS. "Shared Responsibility Model". URL: [https://aws.amazon.com/compliance/shared-responsibility-model/](https://aws.amazon.com/compliance/shared-responsibility-model/) Accessed: 2026-11-07. Supports: of/in the cloud; EC2 and S3 customer duties.
- [R3] Wiz. "ChaosDB: How we hacked thousands of Azure customers' databases", 26 August 2021. URL: [https://www.wiz.io/blog/chaosdb-how-we-hacked-thousands-of-azure-customers-databases](https://www.wiz.io/blog/chaosdb-how-we-hacked-thousands-of-azure-customers-databases) Accessed: 2026-11-07. Supports: feature default-on February 2021, primary key exposure, disabled within 48 hours, >30% notified to rotate.
- [R4] Course 22 Module 7 and Course 12 Module 2 (threat modelling method within this library).
