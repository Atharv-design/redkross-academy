Mapping becomes a plan when you classify each entry point by the weakness it could enable, based on the sink the input reaches:

| Term | Meaning |
|---|---|
| input -> SQL query | => SQL injection (Module 5) |
| input -> HTML output | => cross-site scripting (Module 5) |
| client-supplied object id | => IDOR / broken access control (Module 4) |
| privileged function/page | => function-level access control (Module 4) |
| state-changing POST | => CSRF (Module 6) |
| input -> file path | => path traversal (Module 6) |
| input -> outbound request | => SSRF (Module 6) |
| session/identity handling | => authentication/session flaws (Module 3) |

This classification is a hypothesis list, not a conclusion - each must be verified safely (Modules 3-7) before it is a finding. In the lab, the eight entry points map cleanly onto the ten weaknesses the later modules confirm.
