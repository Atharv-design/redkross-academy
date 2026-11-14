> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Match and assess a feed

---------------------------------------------

**Objective:** Run the IOC matcher and write an assessment of each result.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** python make_dataset.py; python minisiem.py load.

**Explicit authorised scope:** synthetic feed and dataset; do not submit the fictional indicators to public services.

**Step-by-step instructions:**

1. Run python ioc_match.py.
2. For each line, state action (enrich, hunt, block, ignore) and why.
3. Change AS_OF to 2026-11-15 and rerun; explain which statuses change.
4. Write the matches as a short enrichment note for the WS-104 case, respecting the TLP of each indicator.

**Expected observations:** at 2026-11-15 the 203.0.113.66 and look-alike entries remain or expire according to valid_until (2026-11-10 expires; 2026-11-30 does not).

**Troubleshooting:** "no such table" - load minisiem first.

**Cleanup:** none.

**Learning outcome:** you can apply intelligence proportionately.

## Practical 2: Write a STIX-style indicator

--------------------------------------------------

**Objective:** Express one finding as a STIX 2.1 indicator object.

**Difficulty:** Intermediate.

**Required tools:** text editor; optional Python json module to check syntax.

**Prerequisites:** Lesson L04.

**Environment setup:** none.

**Explicit authorised scope:** fictional values only.

**Step-by-step instructions:**

1. Create a JSON object with type "indicator", spec_version "2.1", an id of the form indicator--<UUID>, created/modified timestamps, name, pattern "[domain-name:value = 'cdn-telemetry-sync.example']", pattern_type "stix", valid_from, valid_until and confidence.
2. Validate the JSON syntax with python -m json.tool file.json.
3. Compare your property names against the STIX 2.1 specification section on Indicator [R3].

**Expected observations:** json.tool prints the object; property names match the specification. (Full STIX validation needs a dedicated validator - Not execution-tested here.)

**Troubleshooting:** generate a UUID with python -c "import uuid; print(uuid.uuid4())".

**Cleanup:** none.

**Learning outcome:** you can produce shareable structured intelligence.
