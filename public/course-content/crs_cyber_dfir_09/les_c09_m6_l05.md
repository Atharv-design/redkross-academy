Flow records (NetFlow, IPFIX, cloud VPC flow logs) summarise conversations: addresses, ports, protocol, start and end times, packets and bytes. They are cheap to keep for months, so they often survive when pcaps do not. They show volume and timing (for example, 1.8 GB to an unfamiliar address at 02:05) but not content.

**Encryption:** most traffic now uses TLS. Without keys, examiners still see:

- IP addresses, ports, timing and sizes;
- DNS queries, unless DNS is encrypted (DoH/DoT);
- the TLS handshake, which may expose the Server Name Indication (SNI), unless Encrypted Client Hello is used, and certificate details in TLS 1.2 (encrypted in TLS 1.3).

Content can be decrypted only with keys: for example, session keys logged by the client (SSLKEYLOGFILE) in an authorised lab, or TLS-inspection proxies operated by the organisation under policy. Do not overstate: "1.8 GB was sent over TLS to X" is supportable; "the payroll database was sent" needs host evidence of what was read.

**Other network sources:** proxy and DNS logs (Course 08), firewall logs, IDS alerts and Zeek logs (conn.log, http.log, dns.log, ssl.log), which turn packets into searchable records. Zeek was not execution-tested here.
