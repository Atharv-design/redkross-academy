LAB_ASSETS/C14/actor_overlap.py reads MITRE ATT&CK Enterprise 20.1 (STIX bundle published by MITRE; collection modified 2026-11-05) and the techniques reported for MONSOON LANTERN. It follows revoked techniques to their replacements, compares exact sub-techniques and parent techniques with the "uses" relationships of every non-revoked, non-deprecated intrusion set, and ranks groups. Output (execution-tested, CPython 3.14.4, 2026-11-07; m04_overlap_output.txt):

```output
Observed techniques (9): T1041, T1053.005, T1059.001, T1204.002,
T1560.001, T1566.001, T1566.002, T1583.001, T1588.004

ATT&CK 20.1: 178 groups, 174 with technique mappings
group                            shared(parent) shared(exact)  Jaccard group techs
Mustang Panda                                 8             9    0.106          85
MuddyWater                                    8             8    0.116          68
Lazarus Group                                 8             8    0.085          93
APT38                                         8             8    0.069         115
Kimsuky                                       8             8    0.061         130
APT32                                         8             7    0.087          78
APT39                                         7             7    0.127          53
Wizard Spider                                 7             7    0.106          64
Sandworm Team                                 7             7    0.086          79
Earth Lusca                                   7             6    0.128          44
groups sharing >= 8 of 8 parent techniques: 6
groups sharing >= 7 of 8 parent techniques: 16
```

**Interpretation:**

- Six groups, which ATT&CK's own descriptions associate with several different countries, use every parent technique observed. The ranking changes with the metric: by exact matches Mustang Panda leads; by Jaccard similarity (which penalises large profiles) Earth Lusca and APT39 lead among the ten shown.
- The observed set is made of very common techniques (phishing, PowerShell, scheduled tasks). Common techniques discriminate poorly; rare, specific behaviours would discriminate better - and the data has none.
- Group profiles reflect published reporting: groups with large profiles match more often because more has been written about them.

**Limitations:** this is a deliberately naive method, shown to demonstrate its failure. Do not present such rankings to consumers as attribution.
