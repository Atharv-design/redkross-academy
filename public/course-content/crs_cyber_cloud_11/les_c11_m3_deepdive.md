1. Address plan: 10.40.0.0/16 per workload VPC; /24 subnets per tier per zone; no overlap with on-premises 10.0.0.0/12.
2. Public subnets: application load balancer only; WAF attached with managed and custom rules; WAF logs to the log archive.
3. Private app subnets: instances without public IPs; IMDSv2 required, hop limit 1 (2 for container hosts); Session Manager for administration - no port 22.
4. Data subnets: database security group accepts 5432 only from the app tier's security group; no route to any gateway.
5. Private connectivity: S3 gateway endpoint with bucket policies requiring aws:SourceVpce; interface endpoints for KMS, SSM and Secrets Manager.
6. Egress: NAT gateway behind AWS Network Firewall with a domain allowlist (package mirrors, partner APIs).
7. Logging: VPC flow logs, firewall logs and DNS query logs centralised.
8. Guardrails: Config/Azure Policy rules for admin ports from 0.0.0.0/0, public IPs on instances and IMDSv1 (Module 6).
