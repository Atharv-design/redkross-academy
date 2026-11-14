Matching seems trivial and is not:

- Match the right field. A URL indicator never matches a proxy log that records only host names; the lab's first version never matched the payload URL. The fixed version also matches the URL's host.
- Count events, not field matches. The first version counted an event twice when its host and destination address were the same value (198.51.100.77 showed 12 events instead of 6).
- Decide what a match means: an alert to triage, a block, or a hunt lead. Blocks need the strictest quality.
- Retro-hunt: search history for new indicators; the 28 October events were found this way.
- Record sightings with outcomes and feed them back to sources and sharing partners (STIX Sighting, Module 6). Sightings are the best evidence that an indicator is real and current.
