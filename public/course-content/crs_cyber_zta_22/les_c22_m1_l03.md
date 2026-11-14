| Term | Meaning |
|---|---|
| Assets | data, services, identities, keys, infrastructure, and the build pipeline (Course 12 M07). |
| Trust zones | groupings with similar trust and protection needs: user devices, internet edge, application tier, data tier, management plane, third-party connections, CI/CD. |
| Boundaries | every place where data or control crosses zones: the most important places to authenticate, authorise, validate and log. |

Classic perimeter architecture assumed "inside = trusted". Zero trust treats each request as untrusted until verified regardless of location (Module 3), but zones and boundaries remain useful for reasoning, limiting blast radius and placing enforcement. Pay particular attention to the management plane (admin consoles, hypervisors, cloud control planes, identity providers): compromise there defeats most other controls.
