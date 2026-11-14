After release, the pack needs to run and its inputs need to stay healthy:

- monitor telemetry sources for silence and for format changes (Modules 1 and 2);
- monitor detection health: a rule that has never fired in 90 days may be broken - test it with replay;
- track each rule's true-positive rate and analyst feedback;
- set owners and review dates for rules, exceptions and playbooks;
- monitor the monitoring infrastructure itself: certificates, licences, collector capacity, SIEM ingestion lag.

The Equifax case below shows what happens when the monitoring infrastructure fails silently.
