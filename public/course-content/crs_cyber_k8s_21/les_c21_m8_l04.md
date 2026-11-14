**Good evidence is:**

- reproducible: produced by a versioned script that anyone with access can run again (the lab's evidence.py);
- specific: each result states what was tested and what was observed ("unauthenticated GET /api/v1/namespaces -> HTTP 401"), not "OK";
- timestamped (UTC) and tied to an identified system (node, API address, server version);
- integrity-protected: evidence.py writes the report and a JSON record containing the report's SHA-256; store both in a write-once location or sign them;
- honest about limits: what the test cannot see, and what was assumed.

Separate observation from inference in reports: "the privileged pod was denied by PodSecurity baseline:latest in an unlabelled namespace" (observation) supports "new namespaces are protected by a cluster default" (inference).

Evidence tools have bugs like any software. The first run of evidence.py on the hardened cluster reported C05 failing because of "evidence-probe-ns=none": the namespace created by its own C04 test was still terminating. The fix skips terminating namespaces. Review an unexpected failure before acting on it, and keep tool fixes in version history.
