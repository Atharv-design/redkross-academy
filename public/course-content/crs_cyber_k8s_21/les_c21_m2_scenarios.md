Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A team's gate blocks every release because of 30 unfixable HIGH findings in the base image. They ask to disable the gate.

**Task:** Propose a better policy.

> [!TIP] Model answer
> Keep the gate but make it precise: block only fixable CRITICAL/HIGH and secrets; warn on unfixable findings; require a base-image change review when unfixable CRITICAL/HIGH counts exceed a threshold; allow exceptions only with owner, reason and expiry. Reduce the base (slim or distroless) so fewer findings exist, automate rebuilds when the base publishes fixes, and report trend metrics instead of absolute counts.
>
> **Lesson:** precise gates plus smaller bases, not no gates.

## Scenario 2

A new critical vulnerability is announced in a compression library at 09:00. The CISO asks at 10:00 which production images are affected.

**Task:** Describe how you answer, and what you need to have prepared.

> [!TIP] Model answer
> Query stored SBOMs (or the registry's scan database) for the package and vulnerable versions, joined to the inventory of what is deployed where (image digests per cluster and namespace). Rank by exposure: internet-facing, data sensitivity, whether the vulnerable function is used. Report the list with confidence and gaps (images without SBOMs). Preparation needed: an SBOM per released digest, a mapping from running workloads to digests, and an owner per image.
>
> **Lesson:** SBOMs plus deployment inventory turn a crisis into a query.

## Scenario 3

A developer argues that distroless images "make debugging impossible".

**Task:** Respond with a workable operating model.

> [!TIP] Model answer
> Agree that "exec sh" disappears and replace it: Kubernetes ephemeral debug containers (kubectl debug) with a separate tools image attached to the pod's namespaces, node-level tools for platform staff, better logs and metrics, and a debug build variant that never ships to production. Gate debug access with RBAC and audit it (Module 5 detects exec). The lack of a shell in production is the point: an intruder also has none.
>
> **Lesson:** move debugging tools out of the production image, under control.
