A hunt begins with an assumption that something may be present that detections did not report. It ends with a documented conclusion and improvements. It is not "looking at alerts", and it is not running every query in a downloaded pack. The PEAK framework (David Bianco with Ryan Fetterman, Splunk, April 2023) names three phases - Prepare, Execute, Act with Knowledge - and three hunt types [R2]:

| Term | Meaning |
|---|---|
| Hypothesis-driven | test a specific suspicion against data. |
| Baseline | (exploratory data analysis) define normal and look for deviations. |
| Model-assisted | (M-ATH) use machine-learning models of good or bad behaviour to surface candidates. |

Other methods, such as the TaHiTI methodology from the Dutch financial sector, use similar steps. The common thread is that hunts are planned, recorded and repeatable.
