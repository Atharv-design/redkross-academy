The cluster is the last place to enforce supply-chain policy. Layers:

1. Registry allowlist: only approved registries and repositories (the Module 4 policy rk-image-policy).
2. Immutable references: first-party images must be pinned by digest (the lab's rk-digest-policy, a ValidatingAdmissionPolicy).
3. Signature and attestation verification at admission: an admission webhook such as the Sigstore policy-controller or Kyverno's image verification checks signatures against trusted keys or identities before admitting the pod. (Not execution-tested in this course; follow the project documentation, and treat the webhook as critical infrastructure - Module 8 CS1.)
4. Node configuration: nodes pull only from approved registries (registry mirrors, credentials scoped per namespace).

Operational lessons from the lab:

- The first attempt to deploy by digest failed with ErrImageNeverPull: the image had been imported into the node by tag, so the digest reference had no local match. Deploying from the internal registry (configured as a k3s registry mirror) fixed it and is how production works.
- "kubectl apply" of an unchanged manifest sends no request, so the admission policy is not evaluated ("unchanged (server dry run)"). Test policies with new objects or real changes.
- Rollouts need graceful termination: old pods of the tag-based revision stayed "Terminating" for the full 30-second grace period because the simple Python server ignores SIGTERM.
