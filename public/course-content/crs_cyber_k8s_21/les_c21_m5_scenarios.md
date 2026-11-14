Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An application team says their service "needs to talk to the internet" and asks for an egress allow to 0.0.0.0/0.

**Task:** Respond with a safer design.

> [!TIP] Model answer
> Find out which destinations it needs (a payment API, a package mirror). Prefer an egress gateway or proxy with a domain allowlist and logging, and allow pod egress only to that proxy; if direct egress is unavoidable, allow the specific IP ranges and ports published by the provider and review them on a schedule. Block cloud metadata endpoints and internal ranges in the same policy. Monitor egress volumes.
>
> **Lesson:** name destinations; route the rest through a controlled egress.

## Scenario 2

Your SIEM receives a HIGH AD2 alert: a service account in namespace payments listed secrets in kube-system, HTTP 200.

**Task:** Describe triage and containment.

> [!TIP] Model answer
> **Confirm:** identify the actor (service account, or impersonation by whom), source IPs and user agent; check whether it is a known operator. Scope: which secrets were listed (all in kube-system) and what they grant; other actions by the same identity; which pods use that service account.
>
> **Contain:** remove the binding that allowed it, and isolate the pods using that service account (NetworkPolicy deny) after preserving evidence; rotate every exposed secret, starting with tokens and credentials granting broader access. Review how the grant was created (AD3 history).
>
> **Lesson:** secrets read means secrets rotated; fix the grant and its origin.

## Scenario 3

Management asks why the cluster needs a node sensor when it already has audit logs.

**Task:** Answer with examples.

> [!TIP] Model answer
> The audit log records API calls: exec, secret reads, bindings, admission decisions. It does not see a miner started by a vulnerable web app, a reverse shell, an ld.so.preload change, internal scanning or reads of the cloud metadata service from inside a container - Hildegard did most of its work that way. A node sensor sees processes, files and connections with pod context. Both feed the SOC; each covers the other's blind spots.
>
> **Lesson:** control plane and data plane need separate eyes.
