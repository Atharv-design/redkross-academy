Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A team wants to deploy an IPS in blocking mode on day one with broad rules.

**Task:** Explain the risk and a safer rollout.

> [!TIP] Model answer
> **Risk:** broad IPS rules in blocking mode will produce false positives that block legitimate traffic, causing outages and eroding trust in the system. Safer rollout: deploy in DETECTION (alert-only) mode first; tune rules against real traffic to cut false positives; then enable BLOCKING only for high-confidence, well-tested signatures, starting with the most reliable; monitor for blocked legitimate traffic and keep a fast rollback. Expand blocking gradually.
>
> **Lesson:** start IPS in alert mode, tune, then block only high-confidence rules.

## Scenario 2

Analysts ignore the "port scan" alert category because it is mostly the company's own scanner.

**Task:** Describe how to tune this.

> [!TIP] Model answer
> **Tune it:** suppress alerts from the authorised scanner's and monitoring system's known source addresses so they do not generate scan alerts; adjust the scan threshold so scheduled health checks do not trip it; and add a higher-priority rule for scans from EXTERNAL sources or against sensitive zones, which are the ones that matter. This cuts noise dramatically while preserving detection of real external scans. Track alert quality, not just volume.
>
> **Lesson:** suppress known-benign sources and prioritise high-value contexts rather than disabling a whole category.

## Scenario 3

A novel attack with no signature evades the signature-based IDS.

**Task:** Explain what detection approach could catch it and the trade-off.

> [!TIP] Model answer
> Anomaly-based detection could catch it: by modelling normal behaviour and flagging deviations (unusual ports, volumes, destinations, timing), it can detect novel activity that has no signature - for example the scan and beacon patterns in the lab. The trade-off is more false positives, because "abnormal" is not always "malicious", so it needs a good baseline and tuning. Use it alongside signatures (which handle known threats precisely).
>
> **Lesson:** anomaly detection catches the novel at the cost of more false positives; combine it with signatures.
