The defences across these advanced risks share the course's themes applied rigorously:

| Term | Meaning |
|---|---|
| XXE | disable external entities/DTDs; prefer JSON. |
| deserialization | never deserialize untrusted data with code-capable formats; use JSON; sign and restrict types if needed. |
| business logic | enforce every rule server-side; validate state transitions; apply limits and idempotency; never trust client business values. |
| API object access | enforce object-level authorisation on every request. |
| API data exposure | return only needed fields; accept only expected fields (prevent mass assignment); validate input. |
| API abuse | rate-limit and quota; authenticate and authorise every call. |

The unifying rule, again, is that the server enforces security from trustworthy state; the client - whether browser or API consumer - is untrusted. The lab's business-logic fix (server-side price lookup) models the principle for the whole module.
