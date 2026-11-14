Kubernetes Secrets protect data only as well as their surroundings:

- RBAC: restrict get, list and watch on secrets to the workloads that use them and to a small operations group; remember that workload creators can mount them (K04).
- Encryption at rest with KMS (Module 3), followed by a rewrite.
- Delivery: volumes are preferable to environment variables, which leak into crash dumps, child processes and "describe" output of some tools. Mark stable secrets immutable.
- Source of truth: never commit plain secrets to Git. Use an external secret manager with a synchroniser or CSI driver, or encrypted manifests (sealed or SOPS-encrypted files) that only the cluster can decrypt. (Not execution-tested in this course; follow the vendor's documentation.)
- Audit: log secret access at Metadata level (never Request level, which would record values) - the Module 5 audit policy does exactly that.
- Rotation: design for rotation on a schedule and immediately after exposure.
