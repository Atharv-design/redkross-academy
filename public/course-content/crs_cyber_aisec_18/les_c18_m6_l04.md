- Pin Python and system packages by version and hash; generate SBOMs; scan for known vulnerabilities (Course 12).
- Keep inference servers patched; bind them to localhost or private networks with authentication - an inference API reachable without authentication lets anyone use your compute and models.
- Separate model-serving from application credentials; least privilege for model storage.
- Monitor resource use (LLM10) and restrict which models a server may load.

The lab's Ollama API listens on 127.0.0.1 only; supply_check.py reads its model list from there.
