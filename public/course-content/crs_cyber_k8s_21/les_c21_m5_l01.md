Kubernetes requires a flat network: every pod gets an address and can reach every other pod without NAT. Services give stable virtual addresses and DNS names (api.kestrel resolved in the lab). This makes service-to-service communication simple and lateral movement equally simple.

NetworkPolicy is the built-in segmentation API. Its semantics, from the documentation [R1]:

- It is implemented by the network plugin. Creating a NetworkPolicy without a controller that implements it has no effect.
- Pods are non-isolated by default for both ingress and egress.
- A pod becomes isolated for a direction when any policy selecting it lists that direction in policyTypes; then only traffic that some policy allows is permitted.
- Policies are additive: the allowed traffic is the union of all applicable policies, so order does not matter and there are no deny rules.
- Rules select peers by pod labels, namespace labels (every namespace has the label kubernetes.io/metadata.name) or IP blocks, and ports.

The lab's k3s cluster enforced policies through k3s's embedded network policy controller; the test matrix (section 3) proved enforcement rather than assuming it.

**Limits:** the standard API works at layers 3-4 (no HTTP paths or methods); it cannot select traffic of pods using hostNetwork; it has no built-in logging; and node-to-pod traffic handling varies by plugin. Some plugins add their own policy types with deny rules, layer-7 rules and logging.
