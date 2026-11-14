> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the provenance check

---------------------------------------------------------

**Objective:** Gate deployment on approved models and unchanged data.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; Ollama; LAB_ASSETS/C18/banyanbot (supply_check.py, approved_models.json, kb_manifest.json).

**Prerequisites:** Lessons L05-L06.

**Environment setup:** copy the folder; ensure Ollama is running.

**Explicit authorised scope:** your own machine's models and the fictional KB.

**Step-by-step instructions:**

1. Put your own model's name and digest in approved_models.json (from ollama list or the script's output); run python supply_check.py.
2. Edit a KB file in a copy; confirm CHANGED; restore; confirm OK.
3. Add a new file to kb/; confirm "NEW (unreviewed)"; remove it.
4. Extend the script to check that the Ollama API is bound to localhost (read OLLAMA_HOST if set) and to print the runtime version (/api/version).

**Expected observations:** only approved items pass.

**Troubleshooting:** digests change when a model is re-pulled with new content; that is the point.

**Cleanup:** restore kb/ and the approval file.

**Learning outcome:** you can verify AI components before deployment.

## Practical 2: Model adoption review

-------------------------------------------

**Objective:** Review a public model for adoption.

**Difficulty:** Advanced.

**Required tools:** web browser; text editor.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** none.

**Explicit authorised scope:** read public model cards and documentation only; do not download or run unreviewed models outside an isolated sandbox you own.

**Step-by-step instructions:**

1. Choose a public model; record publisher, licence, card contents, formats and revision.
2. Identify missing information and risks.
3. Write the AI-BOM entry and the approval conditions (format, sandbox evaluation, probes).

**Expected observations:** gaps in training-data description are common.

**Troubleshooting:** record what is not stated rather than guessing.

**Cleanup:** none.

**Learning outcome:** you can assess model provenance.
