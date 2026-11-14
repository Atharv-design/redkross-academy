Threat modelling (Course 12 Module 2; Course 22 Module 7) asks, for each asset and trust boundary, what could go wrong and which control prevents, detects and responds to it. In the cloud, model at three levels:

1. Organisation: identity provider and administrator roles, the management account or root management group, guardrail policies, the log archive.
2. Account/subscription: control-plane permissions, network design, logging configuration, key management.
3. Workload: data stores, compute, secrets, external integrations.

A defender's threat-model table records, per asset:

```text
asset | classification | trust boundary | what could go wrong (STRIDE
category) | preventive control | detective control and log source |
response action | owner
```

Example rows for Tamarind Logistics' customer-exports bucket:

- Information disclosure across the internet boundary: control = Block Public Access at account level + bucket policy review (Module 4); detection = CloudTrail PutBucketPolicy / PutPublicAccessBlock alerts (Module 5); response = revert, review access logs; owner = data platform team.
- Tampering or deletion: control = versioning, least-privilege delete, backups in a separate account; detection = DeleteObject volume alerts; response = restore from versions; owner = data platform team.
- Spoofing of a workload identity: control = role-based access with short-lived credentials, no long-term keys; detection = use of keys from unexpected networks; response = deactivate keys, revoke sessions (Module 8).

Common cloud risk themes to cover in every model: excessive permissions, long-lived credentials, public exposure of storage or services, missing or disabled logging, unencrypted or wrongly shared data, unpatched workloads, insecure CI/CD, and dependence on a single account for both production and backups. Each theme maps to a later module and a control you can test.
