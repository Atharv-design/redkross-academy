instructions The model sees one token stream (Module 2). Training teaches it to prefer system instructions and to treat quoted material as content, but that preference is statistical. Consequences:

- Prompt-level defences ("documents are data") reduce some failures and can even change which failures occur; they never reach zero reliably.
- Results differ by model, version, prompt wording and sampling.
- Hidden placement (HTML comments, white text, metadata) and visible placement behave differently for different models - test both.

**Design rule:** assume that any text the model reads can influence it, and make sure that influence cannot exceed what the output is allowed to do.
