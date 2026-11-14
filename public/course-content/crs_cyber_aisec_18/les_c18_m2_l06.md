An agent repeats a loop: plan, call a tool, read the result, decide the next step - sometimes for many steps, sometimes delegating to other agents.

**New risks:**

- Tool results are new untrusted content in the context (a web page, an e-mail, a ticket can carry instructions).
- Chains of actions amplify errors; one bad step leads to the next.
- Cost and time can grow without limit (LLM10).

**Controls:** least-privilege tool sets per task; step and budget limits; human approval for consequential actions; read-only defaults; separate agents for reading untrusted content and for taking privileged actions; full action logs and kill switches.
