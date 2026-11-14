| Term | Meaning |
|---|---|
| Retrieval over-reach | the index returns content the user may not see (lab P4, naive 5/5). |
| Context leakage | secrets placed in prompts are revealed (LLM07, lab P2). |
| Memorisation | models can reproduce rare training examples. |
| Output channels | links and images that carry data to external hosts when rendered (lab P6). |
| Logs and analytics | prompts and outputs stored widely, with weak access control or long retention. |
| Third parties | prompts sent to vendors under terms the organisation did not review. |
| Classic bugs | multi-tenant isolation failures (Module 1 case). |

**The defender's principle:** the model will disclose what it is given to anyone who can ask, so control what it is given and who can ask.
