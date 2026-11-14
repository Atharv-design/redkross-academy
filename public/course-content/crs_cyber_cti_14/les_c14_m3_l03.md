Before treating an address as malicious, ask what kind of address it is:

- dedicated hosting or a virtual server rented by the actor;
- shared web hosting serving many unrelated sites;
- a content delivery network or cloud front end serving very many sites (blocking it breaks them all);
- residential or mobile ranges, which change hands quickly;
- a sinkhole operated by researchers or law enforcement.

**Useful context:** the autonomous system and provider, reverse DNS, the number of domains currently on the address (passive DNS), certificate names served, and history.

The lab's live lookup shows why. Run against example.com, a domain IANA reserves for documentation, live_context.py found two addresses, a certificate issued by "Cloudflare TLS Issuing ECC CA 3" and Cloudflare name servers: the domain sits behind a large CDN. The addresses identify the CDN's edge, shared with countless other sites, not a server owned by the domain holder. Blocking or attributing by such addresses is wrong.
