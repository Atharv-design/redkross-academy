A detection that fires constantly is ignored; one that never fires is useless. Tuning is deliberate:

- Set thresholds from your own baseline (how many failures are normal for a busy service account?), not from a default.
- Allow-list known-benign patterns explicitly (and review the list), never by weakening the rule globally.
- Prefer detections tied to a control: "RC4 where we mandate AES" is high-signal because policy says AES; "a Tier 0 logon from a non-PAW" is high-signal because the tier model says it should not happen.

In the lab you will see the failed-logon detection change behaviour as you move the threshold, which is exactly the tuning decision a detection engineer makes.
