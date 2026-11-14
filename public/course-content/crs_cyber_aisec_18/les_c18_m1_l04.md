Draw the application and mark every place where data of a different trust level enters the model's context:

| Term | Meaning |
|---|---|
| user -> app | the user's message (untrusted) |
| KB -> retrieval -> app | documents; internal ones trusted, imported ones (partner pages, web, e-mail) untrusted |
| app -> model | the assembled context - mixed trust in one string |
| model -> app | the output (untrusted until checked) |
| app -> tools | actions (privileged) |
| app -> UI | rendering (markdown, links, images) |

**The key insight:** the context window is a trust boundary inside the model. Anything that reaches the context - including text inside a document - can influence behaviour. Security therefore depends on controls OUTSIDE the model: what is retrieved and for whom, what tools may do, and how output is handled.
