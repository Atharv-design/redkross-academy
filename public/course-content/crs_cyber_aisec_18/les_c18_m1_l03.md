| Term | Meaning |
|---|---|
| Data | training and fine-tuning data; retrieval knowledge base; user conversations; logs; embeddings |
| Model | weights, configuration, version and digest |
| Prompts | system prompt and templates (may contain business logic) |
| Tools | APIs the model can call, and their credentials |
| Outputs | answers, generated code, actions taken |
| Platform | inference servers, vector databases, orchestration code, CI/CD, secrets |
| Reputation | what the organisation is held responsible for (Module 5's Air Canada case) |

In BanyanBot the assets are: seven KB documents (two are customer records with personal data), the system prompt with a confidential reference code (the lab's canary), two tools (refund and e-mail), the conversation, and the local model qwen3:4b.
