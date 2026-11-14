A shift report hands over situational awareness at the end of a shift. It is short, structured and actionable. Example for the course dataset:

```text
---------------------------------------------------------------- BEGIN CODE
SOC SHIFT REPORT - Banyan Microfinance (FICTIONAL)
Shift: 2026-11-03 03:00-11:00Z (08:30-16:30 IST)   Analysts: T1 x2, T2 x1
1. Headline: SEV1 incident CASE-0001 open - WS-104 compromise via
   malicious document; persistence and probable exfiltration (48.2 MB).
2. Active incidents:
   CASE-0001 SEV1 - WS-104 isolated 09:05Z (approved by IR lead); creds
   reset and sessions revoked for divya, gopal; svc_update disabled;
   domains blocked. CERT-In report submitted 10:40Z by Legal (deadline
   14:30Z). Open: content of upload; link to VPN spray (hypothesis).
3. Alerts: 7 rule hits, all assigned to CASE-0001 or CASE-0002. Two 4625
   failures (ben, hema 04:05Z) closed as benign (typing errors).
4. Hunts: H1-H3 run; no other hosts affected in proxy data (gap: hosts
   bypassing proxy not covered).
5. Platform health: all four log sources ingesting; no parse errors.
6. Handover actions: (a) T2 to complete WS-104 memory analysis with
   forensics; (b) monitor 203.0.113.66 and new look-alike domains;
   (c) review R4 threshold after incident.
7. Escalations/decisions pending: DPDP assessment (Legal) once upload
   content known.
------------------------------------------------------------------ END CODE
```

**Notes:** actions and times in this report after 08:17Z (isolation 09:05Z, CERT-In submission 10:40Z) are part of the fictional teaching scenario, not events in the dataset. The structure: headline first; incidents with status and next step; queue summary; hunts; health; handover actions with owners; pending decisions. A good report is readable in two minutes.
