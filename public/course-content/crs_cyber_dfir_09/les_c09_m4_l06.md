**Memory contains timestamps:** process creation and exit times, connection creation times on some OS versions, registry key last-write times from cached hives, and file object times. A memory timeline merges these. Volatility 3 offers a timeliner plugin that collects timestamps from plugins that support it (Not execution-tested). Combine the memory timeline with the disk timeline (Module 3) and logs (Module 6) into a super-timeline, remembering that:

- memory times come from the suspect system's clock. Record its offset from a reliable source during acquisition;
- exited processes may still appear with exit times (psscan);
- smear can produce impossible orderings, so check them against other sources.

A short example of reasoning: process X (PID 4412) was created at 10:02:13Z by winword.exe, and network object 10.0.0.5:51544 -> 198.51.100.7:443 was created at 10:02:15Z, owned by PID 4412. Together they suggest that the document's macro launched X, which connected out. This illustrates the method only; it is not output from this course's labs.
