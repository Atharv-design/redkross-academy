The ATT&CK Navigator displays layers - JSON files that assign scores, colours and comments to techniques. attack_map.py writes navigator/monsoon_lantern_layer.json (layer format 4.5) with score 3 for covered, 2 partial, 1 blind and the evidence in each comment; load it in the Navigator to show the picture. Limits to state whenever you show a layer:

- ATT&CK is not a checklist; coverage of every cell is neither possible nor the goal.
- A coloured cell is a claim; say what it means (data available, rule exists, rule tested).
- Technique-level colouring hides procedure differences: detecting one way of using PowerShell is not detecting all of them.
- Mappings are versioned; re-check after each ATT&CK release.
