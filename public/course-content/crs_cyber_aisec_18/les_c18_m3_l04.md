```text
Layer              BanyanBot defence   Purpose
Input              in_filter           block well-known direct phrases
                                       (easy to evade; reduces noise)
Retrieval          acl, sanitise       keep others' data and planted
                                       lines out of context
Prompt             delimit             mark documents as data
Action             tool_policy         deterministic checks on every
                                       tool call, in code
Output             out_filter          redact canaries/secrets, block
                                       unknown URLs and images, redact
                                       others' PII
Privilege          design              no secrets in prompts; tools
                                       execute with the user's authority
Monitoring         logs                record blocked inputs, tool
                                       denials, filter hits
```

The action and output layers matter most because they are deterministic: even when the model is influenced, the code decides what happens.
