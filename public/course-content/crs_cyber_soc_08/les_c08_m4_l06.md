Every false positive costs analyst time, and too many lead to alert fatigue, where real alerts are dismissed. The response is to fix the cause, not to mute the rule:

```text
- Improve logic: add conditions, such as a parent-child relation instead
  of process name alone.
- Add context exclusions that are narrow and specific, such as one signed
  binary on named hosts, never "exclude all of finance".
- Adjust thresholds based on measured baselines (Course 04 Module 6).
- Use suppressions with an owner, reason, ticket and expiry date. In the
  helper:
    SUPPRESS = [("R3", "user", "itadmin", "approved build account,
                 CHG-1042", "2026-12-31")]
- Track false-positive rate per rule (Module 1 metrics) and review tuning
  changes with detection engineering (Module 6).
```

**Dangerous anti-patterns:** wide wildcard exclusions, permanent suppressions, tuning by an analyst without peer review, and closing alerts as FP without recording why.
