**Terraform's cycle:** write configuration (.tf files) -> init (download providers and modules, recorded in .terraform.lock.hcl) -> plan (compare configuration with recorded state and the real infrastructure, propose changes) -> apply (make the changes, update state). Security-relevant artefacts:

- Configuration: the reviewable intent. Scan it.
- Plan: the exact proposed change, exportable as JSON ("terraform show -json"). Policies evaluated on the plan see resolved values that configuration-level scans may not (variables, module outputs).
- State: a record of every managed resource and many of their attributes, often including secrets such as generated passwords. Store it in a remote backend with encryption, locking and tight access; never commit it.
- Provider and module sources: third-party code that runs with your cloud credentials. Pin versions, use the lock file, review module sources like dependencies (Course 12).
- Credentials: the pipeline that applies Terraform usually holds broad cloud permissions. Separate plan (read-only) and apply (privileged) roles, require approval for apply, and prefer short-lived federated credentials.

Kubernetes manifests follow the same pattern with "kubectl diff" and "kubectl apply" or a GitOps controller that continuously applies Git.
