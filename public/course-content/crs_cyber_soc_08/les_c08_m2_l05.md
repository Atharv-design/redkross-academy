Store and compare in UTC; display in local time if needed. India Standard Time is UTC+05:30. Execution-tested (CPython 3.14.4):

```text
IST 11:42 as UTC: 2026-11-03T06:12:00+00:00
same instant: True   (an IST firewall event and a UTC proxy event)
comparing naive and aware datetimes -> TypeError: can't compare
offset-naive and offset-aware datetimes
```

**Other timestamp problems:** clocks drifting without NTP (the CERT-In Directions require synchronisation with NIC/NPL NTP servers or traceable sources); different meanings (event time versus ingestion time); precision differences; logs with no year (classic syslog). Record which timestamp a timeline uses.
