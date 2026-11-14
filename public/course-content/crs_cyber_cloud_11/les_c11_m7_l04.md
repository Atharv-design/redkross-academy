The best secret is the one that does not exist:

- EC2 instance profiles, ECS task roles, EKS IRSA/Pod Identity, Lambda execution roles give AWS workloads short-lived credentials.
- Azure managed identities give VMs, App Service, Functions and AKS workloads Entra tokens without secrets.
- CI/CD OIDC federation: the pipeline obtains a signed OIDC token from its platform and exchanges it for short-lived cloud credentials (AWS role trust on the identity provider with conditions on repository and branch; Entra workload identity federation). No long-lived cloud keys are stored in the CI system.
- Scope trust tightly: the condition should name the repository, branch or environment, not "any repository of this organisation".
