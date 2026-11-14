Drift is any difference between the declared configuration and reality.

**Causes:** emergency changes made directly ("kubectl edit", cloud console), other tools or controllers changing the same objects, failed or partial applies, and objects created outside Git entirely. Drift breaks every assurance built on review: the reviewed configuration is no longer what runs.

**Detection options:** "terraform plan -refresh-only" for Terraform; "kubectl diff" (server-side) for manifests; GitOps controllers that report "OutOfSync"; cloud configuration recorders. The lab's iac/drift.py compares a namespace with its manifests and reports three classes:

| Term | Meaning |
|---|---|
| CHANGED | a field declared in Git differs live |
| MISSING | declared in Git, absent live |
| UNMANAGED | live, not declared in Git |

It compares only fields that Git declares, because the API server adds defaults to every object; reporting every default would bury real drift.

Respond to each finding by choosing deliberately: reconcile (re-apply Git, the normal case), adopt (update Git to match reality, through review, when the change was right), or remove (unmanaged objects with no owner). Then fix the cause: restrict direct write access in production, give emergencies a fast path that still goes through Git, and alert on drift.
