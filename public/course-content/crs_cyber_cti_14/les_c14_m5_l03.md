The lab's free feed contains typical defects (deliberately):

- 8.8.8.8 "seen in malware sandbox": a public DNS resolver contacted by many programs, malicious or not;
- update.microsoft.com "contacted by sample": malware often checks connectivity against popular services;
- d41d8cd98f00b204e9800998ecf8427e "malware": the MD5 of an empty file;
- 198.51.100.77 "old scanner" seen in March, months before the campaign: the same address, a different context;
- 203.0.113.200 "botnet" last seen a year ago: stale.

The vendor feed lists 192.0.2.10, which "hosted lure briefly" - the shared hosting address from Module 3. And one feed reports portal-nilgiri-claims.example with last_seen 29 October, a day after the analysis date of 28 October: feeds and logs are not aligned in time, which the pipeline shows as an age of -1 day.

Handle them with allowlists (owned and reviewed, with a reason for each entry), known-bad-data lists, context checks (Module 3 fan-out), and source weights based on past accuracy.
