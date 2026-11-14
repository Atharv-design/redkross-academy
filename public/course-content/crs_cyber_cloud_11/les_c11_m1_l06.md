Providers occasionally have vulnerabilities or outages in shared services. Customers cannot patch the provider, but they can:

- subscribe to provider security bulletins and service health notifications for the services they use;
- know where long-lived secrets (database keys, storage account keys, access keys) exist so they can rotate them quickly;
- prefer identity-based authentication (roles, managed identities) over shared keys, which can be revoked per identity;
- restrict network access to managed services (private endpoints, firewall rules) so that leaked keys are less useful;
- keep logs that would show unexpected access during the exposure window;
- include provider incidents in incident response plans (Module 8).
