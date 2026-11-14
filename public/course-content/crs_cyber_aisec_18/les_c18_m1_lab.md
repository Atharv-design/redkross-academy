> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Threat-model BanyanBot

--------------------------------------------

**Objective:** Produce a complete defender's threat-model table.

**Difficulty:** Advanced.

**Required tools:** text editor or spreadsheet; LAB_ASSETS/C18/banyanbot (read the code).

**Prerequisites:** Lessons L03-L06.

**Environment setup:** none needed to read the code.

**Explicit authorised scope:** the BanyanBot bench on your own computer.

**Step-by-step instructions:**

1. Draw the data flow with every trust boundary from L04.
2. For each asset of L03, add rows with OWASP category, preventive and detective controls and an owner.
3. Map each row to probe P1-P6 or write a new probe description.
4. Mark which controls are inside the model (prompt) and which are code.

**Expected observations:** 12-20 rows; most strong controls are code.

**Troubleshooting:** if a row has no test, it is not finished.

**Cleanup:** none.

**Learning outcome:** you can threat-model an LLM application.

## Practical 2: AI asset inventory and lifecycle checklist

----------------------------------------------------------------

**Objective:** Create an inventory and lifecycle checklist for an AI feature.

**Difficulty:** Advanced.

**Required tools:** spreadsheet.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** none.

**Explicit authorised scope:** BanyanBot or an AI feature you own.

**Step-by-step instructions:**

1. List data, model, prompts, tools, outputs and platform components with owner and classification.
2. Record the model name, version and digest (python supply_check.py prints it for the local model).
3. For each lifecycle stage, list the security activities done and missing.

**Expected observations:** gaps usually in data provenance and monitoring.

**Troubleshooting:** include logs and conversation history as data.

**Cleanup:** none.

**Learning outcome:** you can inventory an AI system for governance.
