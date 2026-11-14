Applications ask models for structured output (JSON matching a schema) so code can parse it. Tool calling extends this: the application describes tools; the model proposes a call with arguments; the APPLICATION decides whether to execute it and with what identity. BanyanBot's schema allows {answer, tool_calls[{name, args}]} with names restricted to issue_refund and send_email. Security consequences:

- The model never executes anything itself; the code that executes tools is the enforcement point (Module 5).
- Validate arguments as untrusted input (types, ranges, ownership).
- Execute with the user's authority, not a super-user's (confused deputy).
- Log every proposed and executed call.
