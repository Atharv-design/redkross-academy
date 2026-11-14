Models read and write tokens - sub-word units from a fixed vocabulary. Everything the model considers for one response must fit in its context window (measured in tokens): system prompt, conversation history, retrieved documents, tool results and the answer being generated. Security consequences:

- Everything in the window can influence the output; there is no separate "instruction channel".
- Long contexts cost money and time (OWASP LLM10 Unbounded Consumption); set token budgets per request and per user.
- Truncation decides what the model sees; if safety text is dropped when the window fills, behaviour changes.

In the lab, a BanyanBot request costs about 340-440 prompt tokens (see L04); the local model's metadata reports a much larger maximum context.
