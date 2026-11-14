Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A monitoring vendor asks for a ClusterRole with get, list and watch on `"*"` in all API groups "for full visibility".

**Task:** Respond and propose an alternative.

> [!TIP] Model answer
> **Refuse the wildcard:** it includes secrets (list reveals values) and every future resource. Ask which resources the product reads; build a ClusterRole listing them explicitly without secrets (or with secrets metadata only via a dedicated API if the product needs it), bind it to the vendor's own service account, disable token automount elsewhere, review the vendor's documented minimum permissions, and record the grant in the accepted register with an owner and review date.
>
> **Lesson:** visibility does not require secrets or wildcards.

## Scenario 2

A namespace's default service account has the "edit" ClusterRole bound by RoleBinding. Six workloads in the namespace mount the default token.

**Task:** Assess the risk and plan the change without outages.

> [!TIP] Model answer
> **High risk:** any compromise of any of the six workloads yields edit rights (create workloads, read secrets via mounting, modify services) in the namespace. Plan: inventory which workloads actually call the API (audit log by service account user agent and source); create one service account per workload with a minimal Role; switch workloads one by one; set automountServiceAccountToken: false on the default service account and on pods that need no API access; finally remove the edit binding; monitor for 403 errors after each step.
>
> **Lesson:** separate identities first, then remove the shared grant.

## Scenario 3

You plan to enforce a new admission policy forbidding containers without resource limits across 60 namespaces.

**Task:** Describe the rollout.

> [!TIP] Model answer
> Write the policy with a precise message and reason Forbidden; bind it with [Warn, Audit] across all namespaces; collect warnings and audit annotations for two weeks; publish a list of failing workloads to owners with a deadline; add LimitRange defaults where appropriate; fix templates in Git; then switch namespaces to Deny in waves, starting with those already compliant; keep an exception mechanism (a namespace label with an owner and expiry) for genuine cases.
>
> **Lesson:** observe, communicate, fix, then enforce.
