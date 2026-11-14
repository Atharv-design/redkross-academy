Different audiences need different views:

| Term | Meaning |
|---|---|
| Context view | the system, its users and external systems (who talks to it). |
| Logical view | components and responsibilities, independent of deployment. |
| Data-flow view | data movement across trust boundaries with classification labels (the threat-model DFD, Course 12 M02). |
| Deployment view | where components run: accounts/subscriptions, regions, networks, clusters. |
| Identity view | human and workload identities, roles, trust relations, federation, privileged paths. |
| Security-control view | which control enforces which requirement at which boundary. |

Keep views consistent and versioned with the code where possible (diagrams-as-code), and date them; stale diagrams mislead incident responders.
