A reference architecture arranges the zones and the permitted flows between them. For a retail web application like the lab's:

```text
internet --(HTTPS 443)--> DMZ (web) --(8080)--> APP --(5432)--> DATABASE
users --(HTTPS 443)--> DMZ ;  management --(SSH 22)--> APP/DB (controlled)
DATABASE initiates nothing outbound; DMZ cannot reach DATABASE directly;
users never reach DATABASE or MANAGEMENT directly.
```

Each arrow is a permitted flow; everything else is denied. This diagram is the contract that the firewall policy (Module 2) and segmentation matrix (Module 4) enforce, and that monitoring (Module 7) watches for violations. Designing it first, then enforcing and monitoring it, is the method of the whole course.
