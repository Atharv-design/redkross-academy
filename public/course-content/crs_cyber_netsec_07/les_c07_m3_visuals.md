## IDS versus IPS

![A comparison of an out-of-line IDS that only alerts and an in-line IPS that can block, with the cost of false positives for each.](/assets/courses/cyber-07/C07-M03-F1.svg)
*Figure C07-M03-F1. IDS alerts; IPS can block but a false positive harms availability, so IPS rules must be high-confidence [R1].*

## Signatures versus anomalies

![A contrast of signature-based detection (precise, misses novel) and anomaly-based detection (catches novel, more false positives), recommending both.](/assets/courses/cyber-07/C07-M03-F2.svg)
*Figure C07-M03-F2. The two detection approaches are complementary [R1].*

## Tuning separates signal from noise

![Two tuned thresholds showing normal traffic staying below them and the embedded scan and beacon crossing them to alert.](/assets/courses/cyber-07/C07-M03-F3.svg)
*Figure C07-M03-F3. Thresholds tuned so genuine patterns fire and normal traffic stays quiet - the false-positive/false-negative balance.*
