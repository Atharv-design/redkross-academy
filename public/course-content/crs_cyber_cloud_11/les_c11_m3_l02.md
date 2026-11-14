| Term | Meaning |
|---|---|
| AWS security group | stateful, attached to network interfaces, allow rules only; rules can reference other security groups as sources. |
| AWS network ACL | stateless, per subnet, ordered allow and deny rules; a coarse second layer. |
| Azure NSG | stateful, attached to subnets or NICs, ordered priority rules with allow and deny; application security groups let rules reference workload groups. |

**Rules of thumb:**

- Admin ports (22, 3389) and database ports never from 0.0.0.0/0; use Session Manager, Azure Bastion or a ZTNA/bastion pattern instead.
- Reference security groups (or ASGs) rather than IP ranges between tiers: "db accepts 5432 from the web tier's group".
- Restrict egress rules too; the AWS default allows all outbound.
- Tag rules with owner and ticket; review regularly; alert on changes that open admin ports to the internet (Module 5).
