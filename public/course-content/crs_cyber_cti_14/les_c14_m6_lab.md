> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Build and validate the bundle

**Objective:** Produce a valid STIX 2.1 bundle for MONSOON LANTERN and extend it.

**Difficulty:** Advanced.

**Required tools:** Python virtual environment with stix2 and stix2-patterns; stix_build.py; ioc_pipeline.py.

**Prerequisites:** Lessons L01-L03; Module 5.

**Environment setup:** python -m venv tivenv; then install stix2, medallion and taxii2-client with pip inside it.

**Explicit authorised scope:** local files only.

**Step-by-step instructions:**

1. python stix_build.py and record the object counts.
2. Open the bundle and find, for one indicator, its pattern, valid_until and confidence; explain where each value came from.
3. Add an Infrastructure object for the cluster from Module 3 and link indicators to it ("consists-of" or a suitable relationship); revalidate.
4. Add a Course of Action ("block at proxy for 30 days") related to the campaign; revalidate.
5. Introduce a deliberate pattern error and show that validation fails.

Expected observations (execution-tested for step 1): 38 objects with the counts in section 3; strict parse OK. Steps 3-5 depend on your edits.

**Troubleshooting:** "InvalidValueError" for a pattern means a quoting error (single quotes inside the brackets); relationships need existing source and target identifiers.

**Cleanup:** none.

**Learning outcome:** you can model and validate intelligence in STIX.

## Practical 2: Exchange over TAXII

**Objective:** Run the local TAXII 2.1 server, publish the bundle, poll it and test access control.

**Difficulty:** Advanced.

**Required tools:** the virtual environment; taxii/ folder (medallion_config.json, taxii_data.json, run_taxii.sh, taxii_exchange.py).

**Prerequisites:** P1; Lesson L04.

**Environment setup:** activate the environment so that "medallion" is on PATH; sh taxii/run_taxii.sh in a separate terminal (listens on 127.0.0.1:5005).

**Explicit authorised scope:** the local server only.

**Step-by-step instructions:**

1. python taxii/taxii_exchange.py
2. Poll with added_after set to a time after the publish and confirm no objects return; then publish again and repeat.
3. Make a raw request with curl with a wrong password and to the read-only collection; record status codes.
4. Change the configuration so that "isac-reader" may only read (hint: medallion 3 applies collection permissions to all users; discuss what that means for multi-tenant sharing and how a production server should scope permissions per user).
5. Stop the server (Ctrl+C) and note what happens to the data.

Expected observations (execution-tested for steps 1 and 3): the outputs in section 3; HTTP 401 and 403.

**Troubleshooting:** "No module parameter provided" - the configuration's backend needs both "module" and "module_class" (the lab hit this error first); connection refused - the server is not running.

**Cleanup:** stop the server.

**Learning outcome:** you can operate and assess a TAXII exchange.
