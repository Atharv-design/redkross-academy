## Hunting living-off-the-land activity - joint guidance, 2024

**Context:** in February 2024 CISA, the NSA, the FBI, the US Department of Energy, EPA and TSA, Australia's ACSC, Canada's CCCS and the UK and New Zealand NCSCs published "Identifying and Mitigating Living Off the Land Techniques". A revised version is dated March 2025 [R1]. The guidance draws on incident response and red-team assessments. Its detection best practices are:

1. detailed logging aggregated in an out-of-band, centralised, write-once-read-many location;
2. established and continuously maintained baselines of network, user, administrative and application activity;
3. automation (such as machine-learning models) to compare current activity against baselines;
4. noise reduction by tuning on priority and continuous review;
5. user and entity behaviour analytics (UEBA).

It also advises learning which LOLBins are used normally, by whom and with which command lines, and alerting on use outside that baseline.

**Lessons:** against LOTL, the hunter's main tool is knowledge of normal. Baseline hunts are an investment that turns later hypothesis hunts and detections from guesswork into comparisons.

## (FICTIONAL TEACHING SCENARIO): The hunt that found nothing - correctly

This scenario is fictional. After a sector advisory about scheduled-task persistence, a Tamarind hunter ran H1 across the estate and found only the backup task. Instead of closing the ticket as "clean", the hunter reported that twelve hosts had no Security telemetry, which triggered the telemetry fix from Module 1. When the hunt was repeated a month later with full coverage, it found a forgotten contractor's task running an unsigned updater from AppData. It was benign but unmanaged, and it was removed.

**Lesson:** a null result with stated gaps is a useful product; "clean" without denominators is not.
