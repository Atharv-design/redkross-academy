Every enforcement component must have a defined behaviour when it cannot reach the component it depends on:

| Term | Meaning |
|---|---|
| Fail closed | deny when the decision cannot be made. Safest for restricted resources; needs a break-glass path so that an outage does not stop critical operations. |
| Fail open | allow when the decision cannot be made. Preserves availability; acceptable only for low-sensitivity resources, with alerting and short duration. |
| Cached decisions | reuse recent decisions for a bounded time. A middle path; bound the cache lifetime and never cache DENY reversals or revocations away. |

**Break-glass:** a small number of emergency accounts with phishing-resistant credentials held under dual control, monitored use that alerts immediately, and a post-use review (Module 2). Security agents and their updates are also components with failure modes. Kernel-level agents can stop a host; update channels can reach every host at once. Architecture controls: staged (canary) rollout rings, the ability for the organisation to choose when updates apply where the product allows it, health checks between rings, tested rollback and recovery procedures, and diversity for the most critical systems where justified.
