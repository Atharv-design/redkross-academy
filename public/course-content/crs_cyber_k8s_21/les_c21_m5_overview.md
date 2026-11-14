## About this module

Once a workload is admitted and running, three questions remain: what can it talk to, what is it allowed to do on its node, and how would you know if it started doing something unexpected? This module answers them with NetworkPolicy (segmentation inside the cluster), Pod Security Standards enforced by Pod Security Admission (a baseline for every pod), and runtime detection from the API audit log and from node-level sensors. You will segment the Kestrel namespace and prove it with a reachability matrix, enforce the Restricted level, and write detections against a real audit log from a hardened lab cluster.

## Why it matters

By default every pod can reach every other pod: the Kubernetes documentation states that pods are non-isolated for ingress and egress until a NetworkPolicy selects them [R1]. A single compromised pod can then reach databases, internal APIs and the cluster's own control plane. The Hildegard campaign reported by Unit 42 in February 2021 moved from one exposed kubelet to others on the internal network and hid its processes on the node (case study CS1) - exactly the behaviours segmentation and runtime detection target.

## Where it is used

Platform baselines for every namespace, application team network designs, PCI DSS and similar segmentation evidence, SOC detection content for Kubernetes, and incident containment.

## Learning objectives

1. Explain the Kubernetes network model and NetworkPolicy semantics, including their dependence on the network plugin.
2. Design and test default-deny NetworkPolicies with explicit allows.
3. Apply Pod Security Standards with Pod Security Admission, including safe rollout and a cluster-wide default.
4. Describe pod hardening beyond the Restricted level.
5. Design an audit policy and write detections over API audit events.
6. Describe node-level runtime detection signals and containment options.

## Before you start

**Prerequisites:** C21-M01 to C21-M04; Course 08 Module 6 (detection logic) helps with L05.

**Estimated study time:** About 10 hours.
