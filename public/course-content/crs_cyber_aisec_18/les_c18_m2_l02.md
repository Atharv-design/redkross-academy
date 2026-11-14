Chat APIs take a list of messages with roles - typically system, user and assistant (and tool results). The application decides what goes in each:

| Term | Meaning |
|---|---|
| system | developer instructions (role, rules, tool descriptions) and, in many RAG designs, retrieved documents |
| user | the person's message |
| assistant | earlier model replies |
| tool | results returned from tool execution |

Roles help the model weight instructions, but they are a convention the model was trained on, not an enforcement mechanism. A document placed in the system message is still just text. BanyanBot's naive configuration appends documents after the word "Information:"; its delimited configuration wraps each in <document> tags with a rule that document text is data (Module 3 measures how much that helps).
