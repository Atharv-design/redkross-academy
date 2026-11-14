Open-source licences grant rights with conditions. Broad families:

| Term | Meaning |
|---|---|
| Permissive | MIT, BSD, Apache-2.0. Keep notices. Apache-2.0 includes a patent grant and requires stating changes. |
| Weak copyleft | LGPL, MPL-2.0. Modifications to the library or file must be shared under the same licence. Linking terms vary. |
| Strong copyleft | GPL, AGPL. Derived works distributed (or, for AGPL, offered over a network) must be licensed under the same terms. |
| Unknown or none | no licence means no rights granted. Escalate. |

Execution-tested licence listing (pip-licenses on the installed tree):

```text
------------------------------------------------------------- BEGIN OUTPUT
 Name      Version     License
 PyYAML    6.0.1       MIT License
 certifi   2026.10.23  Mozilla Public License 2.0 (MPL 2.0)
 chardet   3.0.4       GNU Library or Lesser General Public License (LGPL)
 idna      2.10        BSD License
 requests  2.25.0      Apache Software License
 urllib3   1.26.4      MIT License
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

**Observations:** the two transitive packages with weak-copyleft licences, certifi (MPL-2.0) and chardet (LGPL), would not have appeared in a manifest-only review. Licence metadata from package indexes can be incomplete or imprecise, so confirm important cases from the project's licence file. Licence policy (which families are allowed for which products) is a legal decision. Engineering's job is to provide an accurate inventory and flag exceptions automatically.
