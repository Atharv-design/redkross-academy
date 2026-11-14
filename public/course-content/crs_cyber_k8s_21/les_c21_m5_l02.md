**A namespace baseline:**

1. default-deny-all: podSelector {} with policyTypes [Ingress, Egress] and no rules - every pod isolated both ways.
2. allow-dns-egress: every pod may reach the cluster DNS pods (selected by namespace label kubernetes.io/metadata.name: kube-system and pod label k8s-app: kube-dns) on UDP and TCP 53. Without this, name resolution fails and applications break in confusing ways.
3. Explicit allows per flow, written as a pair: ingress on the server (api accepts from app=frontend on 8080) and egress on the client (frontend may reach app=api on 8080).

Note what the baseline also blocks: egress to the Kubernetes API server. Most application pods never need it; those that do get a specific egress rule (and a service account, Module 4).

Test with a matrix, before and after every change, from the actual client pods. A useful rule: a connection that returns any HTTP status is reachable at the network level, even if it was a 401. The lab's first probe script reported the API server as "blocked" because it received 401 and treated anything except 200 as blocked; the corrected netpol_test.sh reports "REACHABLE (HTTP 401)" for that case and "BLOCKED" only when no answer arrives. Getting the measurement right is part of the control.
