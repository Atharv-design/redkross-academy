| Term | Meaning |
|---|---|
| Macro-segmentation | separate environments and zones: production vs non-production, corporate vs OT, user devices vs servers, management plane separate (Module 1 zones). |
| Micro-segmentation | restrict flows between individual workloads or tiers: web may call app on 8080; app may call db on 5432; nothing else. |
| Identity-based segmentation | policies expressed in workload identities or labels (service accounts, tags) rather than IP ranges - robust to autoscaling and cloud. |

Start with the crown jewels and the management plane; isolate legacy and OT in enclaves with gateways; then progressively tighten east-west traffic using observed flows (monitor mode before enforce mode).
