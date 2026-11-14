Prioritise by impact and by how deterministic the mitigation is:

1. Deterministic first: ACL retrieval, tool policy in code, output filtering, no secrets in prompts.
2. Content hygiene: ingestion audit with human review; sanitising imported content; labelling provenance.
3. Probabilistic layers: delimiting and instructions - keep, but never rely on them.
4. Detection: canary and filter-hit alerts; blocked tool-call alerts.
5. Governance: release gates, regression suites, model approval.

Residual risk statement for BanyanBot hardened (lab evidence): failures in P2-P6 were 0/5 each, so true rates could be up to about 43% for the model-driven parts; deterministic controls are unit-tested; the sanitiser is pattern based and can be evaded by rewording (Module 3 P1 step 3); utility is below target (P1: 2/5 successful refunds). Recommendation: do not launch until 60+ run evaluation meets criteria and utility is fixed.
