**Two questions:**

| Term | Meaning |
|---|---|
| Design effectiveness | Would the control, as designed, meet its objective? Assessed by walkthrough and document review. |
| Operating effectiveness | Did it operate consistently throughout the period? Assessed by testing instances. |

**Test methods:**

- inquiry, which is never enough alone;
- observation;
- inspection of records;
- re-performance (the auditor repeats the control);
- data analytics across the full population.

**Sampling:** when a population is large, select a sample, often 25 to 60 items for recurring controls depending on frequency and risk. Select it randomly or systematically, with a recorded method so others can repeat it. Define the tolerable exception rate in advance. For some controls, such as leaver removal, it is zero. Execution-tested (LAB_ASSETS/C17/grc_toolkit.py audit):

```text
------------------------------------------------------------- BEGIN OUTPUT
  population 240 accounts; sample 25 (seed 20261107)
  sample: USR-0009, USR-0017, USR-0019, USR-0020, USR-0039, USR-0048,
          USR-0055, USR-0056 ...
  exceptions in sample: none  rate 0%
  tolerable rate set in audit plan: 0% for leaver removal -> no
  exception noted
  full-population test (HR leaver list vs active accounts): 4 exceptions
  ['USR-0007', 'USR-0091', 'USR-0133', 'USR-0201']
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Reading it:**

- The seeded random sample (seed recorded, so the selection can be re-performed) found no exceptions.
- Comparing the full HR leaver list with all active accounts found 4 leavers still active (about 1.7% of 240).
- A clean sample does not prove a clean population. With 4 bad items in 240, a 25-item sample will often contain none of them. Where data is available, full-population analytics is stronger and often cheaper than sampling. Report the sample result accurately, but do not claim more than it shows.
