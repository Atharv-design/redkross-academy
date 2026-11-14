OWASP LLM06 describes damage caused when an LLM-based system has more functionality, permissions or autonomy than needed. Reduce each:

| Term | Meaning |
|---|---|
| Functionality | expose only the tools a use case needs (a refund assistant does not need "delete account"). |
| Permissions | tools act with the session user's rights, narrow API scopes, never shared admin credentials. |
| Autonomy | consequential or irreversible actions require explicit user confirmation or human approval. |

**Lab evidence of why:** in three of five naive P5 runs the executed refund was for BT-2002 - another customer's order mentioned only in the planted partner page - at Rs 4999, far above any order value. With no policy, the model's proposal became the action.
