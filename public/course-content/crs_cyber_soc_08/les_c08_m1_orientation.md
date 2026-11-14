## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

**Shared lab dataset:** LAB_ASSETS/C08/ contains

| Term | Meaning |
|---|---|
| make_dataset.py | generates banyan_events.jsonl - 340 normalised events (Windows security, Sysmon-style endpoint, proxy, VPN) for one fictional day at "Banyan Microfinance", with a hidden intrusion storyline; deterministic (fixed seed). |
| minisiem.py | a teaching SIEM built on SQLite: load, search, rules. |
| rk_office_spawns_shell.yml | a Sigma rule validated and converted with sigma-cli 4.0.0 (pySigma 2.0.2, Splunk backend 3.0.0). |

All were execution-tested with CPython 3.14.4 on 2026-11-07. Every name, host, domain (.example) and address (RFC 1918 / RFC 5737) is fictional. Event field names follow Windows and Sysmon conventions but the dataset is synthetic - it is not exported from a real product.

**Access classification note:** per the blueprint, Course 08 offers "PAID professional labs; free intro". Module 1 is suitable as the free introduction.
