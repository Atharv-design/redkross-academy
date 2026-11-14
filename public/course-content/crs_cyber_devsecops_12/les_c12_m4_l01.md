SAST tools parse code into a syntax tree and analyse it at increasing depth:

| Term | Meaning |
|---|---|
| Pattern matching | find syntactic shapes, for example "execute called with an f-string". Fast, precise and easy to explain, but limited to the shape. |
| Data-flow analysis | track how values move between variables and functions. |
| Taint analysis | mark sources (request parameters, file contents), sinks (SQL execution, shell, HTML output) and sanitisers (validators, encoders). Report when a source reaches a sink without a sanitiser. |
| Semantic/type-aware | use type information and framework models to reduce noise. |

**Strengths:** early, cheap, complete coverage of the code examined, and precise locations. Limits: no runtime context, so it misses configuration and deployment issues; business-logic and design flaws (Module 2) are largely invisible; and there are false positives and negatives. Combine it with tests, dependency scanning (Module 5), DAST and review.
