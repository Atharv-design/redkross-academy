1. Scope: which cluster, namespaces, add-ons and pipelines; what is out of scope (for example the managed control plane).
2. Baseline: run the same evidence collection you will run at the end. A "before" picture turns claims into measured improvement.
3. Prioritise by exposure and blast radius: identity and API access first (anonymous access, RBAC, tokens), then data at rest (secrets encryption), then workload baselines (Pod Security, NetworkPolicy), then supply chain (admission of images), then observability (audit logging) - adjusted to your threats.
4. Change in small, reviewed steps through Git, with a rollback plan. Some controls need a control-plane restart (the lab's audit logging, encryption and admission configuration were start-up flags).
5. Verify each control by its effect, not by its configuration.
6. Re-run the full evidence collection; investigate every remaining failure; fix or accept with an owner and expiry.
7. Report and schedule the next run.

Standards such as the CIS Kubernetes Benchmark and the NSA/CISA Kubernetes Hardening Guidance [R2] supply checklists; this method turns them into evidence.
