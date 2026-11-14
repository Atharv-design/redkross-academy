## Revision

### Summary

VPCs and VNets divide private address space into subnets; routing decides exposure (AWS public subnets route to an internet gateway; Azure uses system routes and UDRs). Security groups are stateful allow-lists that can reference other groups; NSGs are stateful with priorities and deny rules; NACLs add stateless subnet filtering. Admin and database ports must never face the internet; use Session Manager or Bastion. Private connectivity (gateway and interface endpoints, Azure Private Endpoints) plus endpoint-restricted resource policies keeps data off the internet. Egress control, cloud firewalls, DNS control and flow logs limit and reveal misuse. IMDSv2 protects instance-role credentials with PUT-issued session tokens, 401 for token-less requests, X-Forwarded-For rejection and a hop limit of 1. The lab classified subnets by route, found SSH open to the internet and remediated it. The Capital One case shows how edge misconfiguration and workload credentials combine.

### Important concepts

routing defines exposure; group-referenced rules; private endpoints; IMDSv2.

### Key technical takeaways

describe_route_tables and describe_security_groups audits; aws:SourceVpce; HttpTokens=required.

### Glossary

| Term | Meaning |
|---|---|
| IMDS | Instance metadata service. |
| Interface endpoint | PrivateLink private IP for a service. |
| NACL | Stateless subnet network ACL. |
| NSG | Azure network security group. |
| Private Endpoint | Azure private IP for a PaaS resource. |
| UDR | Azure user-defined route. |

### Common mistakes

"temporary" open admin rules; allow-all egress; IMDSv1 left enabled; public IPs on servers.

### Revision questions

​1. Why classify subnets by route? 2. Explain IMDSv2's three protections. 3. Design private access to a key vault.

### Further reading

AWS IMDS documentation [R2]; DOJ case page [R1].

## References

- [R1] US Department of Justice, Western District of Washington. "United States v. Paige Thompson". URL: [https://www.justice.gov/usao-wdwa/united-states-v-paige-thompson](https://www.justice.gov/usao-wdwa/united-states-v-paige-thompson) Accessed: 2026-11-07. Supports: misconfigured WAF; conviction June 2022.
- [R2] AWS. "Configure the instance metadata service options" (EC2 User Guide). URL: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) Accessed: 2026-11-07. Supports: PUT token up to 6 h, 401, X-Forwarded-For rejection, hop limit 1.
- [R3] OCC. "OCC Assesses $80 Million Civil Money Penalty Against Capital One", 6 August 2020. URL: [https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html](https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html) Accessed: 2026-11-07 (verified for Course 21).
- [R4] Lab evidence. network_lab.py and network_lab_output.txt (boto3 1.43.126, moto 5.2.5), 2026-11-07.
