**Common fields:** timestamp; source/provider; event type/ID; host; user (and domain/SID); source and destination IP and port; process image, command line, parent, process ID and GUID; URL/domain; outcome; bytes; rule or signature ID. Identifiers to correlate on: user, host, IP, process GUID, session ID, logon ID. Normalised schemas (Elastic Common Schema, OCSF and others) give these fields consistent names across sources (Module 3).

**Pitfall:** the same name can mean different things (src_ip in a VPN log is the user's external address; in a proxy log it is the internal workstation).
