Some serialisation formats (notably Python pickle and formats built on it) can execute code when a file is loaded. Defences:

- prefer formats that store only tensors and metadata, such as safetensors, and quantised formats loaded by dedicated runtimes (the lab's model is GGUF served by Ollama);
- refuse or scan pickle-based files; use loaders' safe modes where offered;
- load untrusted models only in isolated sandboxes without credentials or network access;
- treat a model upload to your registry like a code change: review, scan, approve.
