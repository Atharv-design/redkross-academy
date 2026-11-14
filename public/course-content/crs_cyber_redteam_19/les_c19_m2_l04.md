Technique selection chooses the specific ATT&CK techniques to emulate:

| Term | Meaning |
|---|---|
| relevance | pick techniques the profiled adversary actually uses. |
| coverage | span the tactics that matter (initial access through impact) rather than clustering in one. |
| detection | prefer techniques that test known or suspected detection gaps - the point is to learn where the blue team is blind. |
| feasibility | the technique can be emulated safely within the range and boundaries. |

Each selected technique is recorded with its ATT&CK ID, the target (in scope), the data source that should observe it, the detection expected, and the containment that should limit it. The lab's plan has seven steps spanning Reconnaissance to Collection, each mapped this way, so the plan doubles as a detection checklist.
