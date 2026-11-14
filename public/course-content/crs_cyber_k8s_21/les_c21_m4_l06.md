RBAC answers "may this identity do this verb on this resource"; it cannot say "only images from our registry" or "never hostNetwork". Admission control can. Options:

- Built-in plugins (PodSecurity in Module 5, NodeRestriction, ResourceQuota, LimitRanger).
- ValidatingAdmissionPolicy: policies in the CEL expression language, evaluated inside the API server. Stable since Kubernetes v1.30 [R4]. No extra service to run or secure.
- Admission webhooks: external services (for example OPA Gatekeeper or Kyverno) for logic CEL cannot express, such as signature verification (Module 7). Webhooks add availability and security concerns: a failing webhook with failurePolicy Fail blocks deployments; one with Ignore is silently bypassed; the webhook service itself becomes a target (Module 8, CS1).

A policy is bound with a ValidatingAdmissionPolicyBinding that sets scope (for example a namespace label) and validationActions: Deny rejects the request, Warn returns a warning to the client and Audit records the failure in the audit event. Deny and Warn may not be combined [R4]. Roll out new policies with Warn and Audit, review what would have failed, fix workloads, then switch to Deny.

Two operational facts from the lab:

- The lab policy rk-image-policy (k8s/admission/image-policy.yaml) matched both Pods and Deployments. Matching Pods alone would let a Deployment be accepted while its ReplicaSet could never create pods - a confusing failure far from the person who caused it.
- The "reason" field changes the response: validations with reason Forbidden returned "Error from server (Forbidden)"; the hostNetwork validation without a reason was reported as "is invalid".

Admission evaluates requests, not existing objects: running workloads are not re-checked when you add a policy, and an apply that changes nothing sends no request at all (Module 7 output shows "unchanged").
