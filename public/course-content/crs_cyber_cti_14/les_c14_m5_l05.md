Indicators lose value at different rates. The lab pipeline uses:

```text
score = confidence x 0.5 ^ (days since last_seen / half-life)
        + 10 if reported by more than one feed
```

with half-lives of 14 days for addresses, 30 days for domains and URLs, and 365 days for file hashes, and an activation threshold of 40. These numbers are illustrative; set yours from measured false-positive rates and infrastructure lifetimes. The design principles matter more:

- every indicator expires unless re-observed;
- corroboration raises, but cannot replace, confidence;
- addresses decay fastest because they are reassigned.

Run the pipeline "as of" a later date and the list shrinks by itself: on 15 December 2026 only the two file hashes remain active (deep dive).
