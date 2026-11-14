## RAG pipeline with access control

![Documents are audited and indexed with ACLs; queries are filtered by the user's ACL before ranking and placed in the context.](/assets/courses/cyber-18/C18-M02-F1.svg)
*Figure C18-M02-F1. Authorise before ranking; audit before indexing.*

## Who executes a tool call

![The model proposes a tool call; the application validates, checks policy, executes with the user's authority, logs, and returns the result.](/assets/courses/cyber-18/C18-M02-F2.svg)
*Figure C18-M02-F2. The model proposes; the application decides.*

## Retrieval with and without ACL (lab, P4)

![Two retrieval results for the same question; only the naive one includes the other customer's record.](/assets/courses/cyber-18/C18-M02-F3.svg)
*Figure C18-M02-F3. With ACLs, the other customer's record never enters the context.*
