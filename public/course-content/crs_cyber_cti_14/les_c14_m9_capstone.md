> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by producing a complete intelligence package for Nilgiri Mutual on MONSOON LANTERN, or on an instructor-supplied variant.

​### Scenario

It is 28 October 2026. The SOC has just seen the u017 contact. The CISO wants a flash brief within the day, the SOC wants usable indicators, the detection engineering lead wants to know what Nilgiri cannot see, and the board risk committee meets next week.

​### Requirements

```text
R1 Requirements: an updated requirements file (including SIRs for
   PIR-3) and a collection plan with gaps.
R2 Sources: a graded source table with corroboration analysis and a
   verified collection log for every artefact you rely on.
R3 Infrastructure: a disciplined cluster with edge evidence and an
   action per node.
R4 Campaign: Diamond events, timeline, competing hypotheses (ACH) and an
   attribution statement at the correct level.
R5 Indicators: pipeline output with your improvements (Module 5 P2),
   activation and expiry decisions, and the contact timeline (CT1).
R6 Structured: a validated STIX bundle (with at least one object type
   added by you) published to the lab TAXII server, with markings
   justified.
R7 Mapping: ATT&CK mapping with evidence, coverage analysis and a
   prioritised use-case backlog.
R8 Products: a flash brief passing brief_builder.py and peer review, and
   a one-page board assessment.
```

​### Deliverables

Requirements and collection plan, source table, collection log, cluster report, campaign analysis, pipeline code and outputs, STIX bundle and TAXII transcript, ATT&CK layer and backlog, flash brief, board assessment, and a one-page reflection on the weakest judgment in your package and how you would strengthen it.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Requirements & sources    | Topics, ungraded| PIR/SIR/EEI;    | Independence    |
| (15%)                     | sources         | grades; log     | analysis; plan  |
|                           |                 | verified        | per Berkeley    |
| Infrastructure & campaign | Naive cluster;  | Disciplined     | Edge weights    |
| (20%)                     | named actor     | cluster; Diamond| tuned and       |
|                           |                 | + ACH; level 1  | justified       |
| Indicators & structure    | Raw feeds;      | Managed pipeline| Tested pipeline |
| (20%)                     | invalid STIX    | valid bundle,   | changes; TAXII  |
|                           |                 | TAXII exchange  | access analysis |
| Mapping & use cases (15%) | Heat map only   | Evidence-backed | Investment case |
|                           |                 | mapping, gaps,  | with acceptance |
|                           |                 | backlog         | tests           |
| Products (20%)            | Long, unsourced | Checked brief;  | Decision-ready  |
|                           |                 | board page      | for each        |
|                           |                 |                 | audience        |
| Ethics & handling (10%)   | Personal data   | Minimised; TLP  | Legal check     |
|                           | retained        | correct         | documented      |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Analytic rigour, honest calibration, source discipline, privacy and legal awareness, writing for different audiences, tool building with tests.
