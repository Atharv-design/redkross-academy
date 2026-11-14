Severity describes how bad the detected behaviour would be if it is real. Detection engineers usually set it per rule: a cleared Security log is more severe than an unusual browser download. Confidence describes how likely the rule is to be right; a rule with many historical false positives has low confidence. Priority is the order in which the SOC works alerts, and it adds context: the same behaviour on a payments workstation matters more than on a kiosk. A common formula is

```text
priority = severity x confidence x asset criticality
```

with extra weight for privileged users, internet-facing systems or active campaigns. The formula is a starting point, not a substitute for judgment. An analyst who sees a low-priority alert that fits a pattern escalates it.
