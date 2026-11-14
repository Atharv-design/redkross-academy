LAB_ASSETS/C08/soc_metrics.py (execution-tested, CPython 3.14.4) computes MTTA and MTTR from synthetic case records and shows why medians matter.

```text
---------------------------------------------------------------- BEGIN CODE
from datetime import datetime
from statistics import mean, median
```

```text
CASES = [  # (created, acknowledged, resolved, disposition) - synthetic
    ("2026-11-03T06:15", "2026-11-03T06:20", "2026-11-03T07:05", "TP"),
    ("2026-11-03T07:00", "2026-11-03T07:02", "2026-11-03T07:10", "FP"),
    ("2026-11-03T08:20", "2026-11-03T08:21", "2026-11-03T08:30", "FP"),
    ("2026-11-03T09:00", "2026-11-03T11:30", "2026-11-03T15:00", "TP"),
    ("2026-11-03T10:00", "2026-11-03T10:04", "2026-11-03T10:20", "BTP"),
]
p = lambda s: datetime.fromisoformat(s)
ack = [(p(a) - p(c)).total_seconds() / 60 for c, a, r, d in CASES]
res = [(p(r) - p(c)).total_seconds() / 60 for c, a, r, d in CASES]
print(f"MTTA mean {mean(ack):.1f} min, median {median(ack):.1f} min")
print(f"MTTR mean {mean(res):.1f} min, median {median(res):.1f} min")
fp = sum(1 for *_, d in CASES if d == "FP") / len(CASES)
print(f"false-positive share {fp:.0%}")
------------------------------------------------------------------ END CODE
```

```text
------------------------------------------------------------- BEGIN OUTPUT
MTTA mean 32.4 min, median 4.0 min
MTTR mean 90.0 min, median 20.0 min
false-positive share 40%
--------------------------------------------------------------- END OUTPUT
```

**Interpretation:** one slow case (acknowledged after 150 minutes) pulls the mean MTTA to 32.4 minutes while the median is 4 minutes. Report both, and investigate the outlier - here a true positive that waited two and a half hours, exactly the case that matters most.
