**Four objects:**

| Term | Meaning |
|---|---|
| Role | rules in one namespace |
| ClusterRole | rules that can be cluster-wide, for cluster-scoped resources, or reused across namespaces |
| RoleBinding | grants a Role or ClusterRole to subjects within ONE namespace |
| ClusterRoleBinding | grants a ClusterRole to subjects in ALL namespaces |

A rule lists apiGroups, resources (including subresources such as pods/exec and pods/log), optional resourceNames and verbs (get, list, watch, create, update, patch, delete, deletecollection, plus special verbs bind, escalate and impersonate). Subjects are users, groups or service accounts.

**Properties that drive design:**

- RBAC is additive. There are no deny rules; the effective permission is the union of all bindings.
- A RoleBinding that references a ClusterRole grants that ClusterRole's rules only inside the binding's namespace - the standard way to reuse "view" or "edit" per namespace.
- resourceNames narrows a rule to named objects, but cannot restrict list or create (the name is not known in advance).
- Wildcards (`"*"`) grant future resources and verbs too.

The lab's ci-deployer role shows narrow design: get, patch and update on the Deployment named api only. "kubectl auth can-i" confirmed it could patch deployments/api but not deployments/other, and could not delete api or read secrets (m04_can_i_output.txt).
