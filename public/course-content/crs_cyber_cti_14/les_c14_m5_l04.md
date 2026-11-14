Context turns a value into intelligence:

- who reported it, with what grade, and when (Module 2);
- what it is: role (lure, C2, payload host), campaign, kill-chain phase;
- infrastructure context: hosting type, fan-out, certificate, first and last seen (Module 3);
- internal sightings: has anything here contacted it, when, from where;
- recommended action and expiry.

Enrichment is also where merging can mislead. When the pipeline merges 198.51.100.77 from three feeds it keeps the highest confidence and latest last_seen - but the free feed's description ("old scanner") referred to different activity months earlier. Keep per-source context rather than collapsing it to one description.
