Every pod runs as a service account (default: the namespace's "default"). Unless disabled, the kubelet mounts a token, the cluster CA and the namespace into /var/run/secrets/kubernetes.io/serviceaccount. Modern clusters issue bound tokens through the TokenRequest API:

- audience-scoped (aud claim);
- time-limited (exp claim);
- bound to an object: the documentation states that if the referenced object no longer exists, or its uid does not match, the request is not authenticated [R2].

The lab proved the binding: a token read from a running pod listed pods (HTTP 200); after the pod was deleted the same token was refused (HTTP 401) (m04_bound_token_output.txt).

The lifetime surprised many readers. The token mounted in the default cluster had an exp one year after issue, with a warnafter claim 60 minutes after issue. This is the documented behaviour of the API server flag --service-account-extend-token-expiration (default true), which extends admission-injected tokens up to one year "to prevent unexpected failure during transition" from legacy tokens, while the kubelet refreshes the file well before warnafter [R3]. On the hardened lab cluster, started with the flag set to false, the mounted token's lifetime was 60 minutes. Tokens requested explicitly ("kubectl create token reporting --duration=10m") carried exactly the requested 10 minutes and no pod binding. Long-lived legacy tokens stored in Secrets of type kubernetes.io/service-account-token are no longer created automatically on current versions; the lab namespace contained no secrets at all.

**Practices:**

- Set automountServiceAccountToken: false on the ServiceAccount or pod unless the workload calls the API (the lab frontend pod had no token directory at all).
- One service account per workload, with only the permissions it needs.
- Never grant the "default" service account permissions.
- Treat any token visible in logs or images as exposed; bound tokens limit, but do not remove, the damage.
