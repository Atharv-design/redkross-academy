In mTLS both sides present certificates. The server requests a client certificate and validates it against a client CA. mTLS is used for service-to-service authentication (service meshes), device identity, and partner APIs. Design points:

- Use a dedicated private CA or intermediate for client certificates, with the clientAuth EKU.
- Map certificate identities (SAN URI or DNS) to authorisation, since authentication alone is not enough.
- Use short lifetimes with automated issuance (SPIFFE/SPIRE, service-mesh CAs, cloud private CAs).
- Plan revocation and rotation, and log the client identity on every request.

**Configuration in Python's ssl:** server ctx.verify_mode = CERT_REQUIRED and ctx.load_verify_locations(client_ca); client ctx.load_cert_chain(cert, key). This is a documented pattern (Not execution-tested in this module's lab; Practical P2 adds it).
