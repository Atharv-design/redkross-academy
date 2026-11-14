## Alert fatigue and the missed alarm Context: a repeated finding in post-incident reviews of major breaches is that the detection system DID fire an alert for the malicious activity, but it was lost among thousands of low-value alerts, or routed to a queue no one watched closely, because the sensors were not tuned and the team was overwhelmed. The technology detected the attack; the PROCESS - tuning, prioritisation, and staffing to act on alerts - failed. Industry guidance (and the NIST IDPS guide) stresses that deploying a sensor is only the start; the value comes from tuning and from an analyst workflow that can act on the alerts [C07-M03-R1]. Why it matters for this module: it shows that detection is a socio-technical system. An un-tuned sensor is arguably worse than none, because it creates false confidence and alert fatigue. Tuning and prioritisation are what turn detection into defence. Lessons: tune aggressively; suppress known-benign noise; prioritise by severity and asset criticality; and ensure every high-value alert reaches an analyst who can act. A detected-but-ignored alert is a missed detection.



## (FICTIONAL TEACHING SCENARIO): The scanner that alerted on itself

**Context:** Himalaya Retail (fictional) deployed an IDS and immediately received hundreds of "port scan" alerts every day. On investigation, most came from the company's OWN authorised vulnerability scanner doing its scheduled scans, plus the monitoring system's health checks.

**What happened:** analysts, flooded with these known-benign alerts, began ignoring the "port scan" category entirely - and nearly missed a genuine external scan buried among them. The sensor was accurate; the lack of tuning made it useless.

**Response:** the team suppressed alerts from the authorised scanner's and monitoring system's known addresses, tuned the scan threshold so health checks did not trip it, and created a higher-priority rule for scans from EXTERNAL sources against sensitive zones. Alert volume dropped by an order of magnitude and the remaining alerts were trustworthy.

**Lessons:** suppress known-benign sources; tune thresholds to the environment; raise priority for the contexts that matter (external source, sensitive target); and measure alert quality, not just quantity.
