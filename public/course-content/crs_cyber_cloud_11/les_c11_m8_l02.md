**Typical triggers:** a detection from Module 5, a native service finding, a provider abuse notice, a leaked-key notification, unusual billing. Analysis questions:

1. Which identity? (userIdentity, Entra sign-in, application ID)
2. How did it authenticate, from where, since when? (first use, source IP, MFA, user agent)
3. What did it do? (all control-plane events by that identity; resources created, especially new identities, keys and roles)
4. What data did it touch? (data events, storage logs, MailItemsAccessed)
5. Is it still active, and has it created persistence (new keys, users, roles, trust policy changes, OAuth consents)?
6. Which accounts, regions and subscriptions are in scope?

Build a timeline in UTC; record queries and results; keep analysis copies of logs in the forensic account.
