## Flat trust and the spread of intrusions Context: post-incident analyses and defensive frameworks consistently find that broad, flat trust - reused local administrator passwords, over-privileged service accounts, and unsegmented networks - is what lets an intrusion spread from one foothold to an entire estate. ATT&CK's Lateral Movement tactic catalogues techniques such as Remote Services (T1021) and Use Alternate Authentication Material (T1550) that abuse this trust, and defensive guidance (segmentation, unique local admin passwords, privilege tiering) targets exactly these [C19-M05-R1][C19-M05-R2]. Why it matters for this module: it shows that narrowing trust (segmentation, tiering, credential hygiene) is the structural defence, and detecting the hops is the backstop - the two things this module validates and maps. Lessons: narrow trust to limit movement; validate segmentation; detect the hops that remain.



## (FICTIONAL TEACHING SCENARIO): The hop that should have been blocked

**Context:** in a fictional engagement for Aravalli Health, the emulation validates segmentation by attempting a workstation-to-workstation remote-service logon (T1021) in the isolated range.

**What happened:** mapping the technique (attackmap.py, Lateral Movement filter) defined the detection (unusual wks-to-wks remote logon) and containment (block wks-to-wks admin). When emulated, the SIEM DID alert on the hop - but segmentation did NOT block it, revealing that workstation-to-workstation administration was allowed, a trust that was too broad.

**Response:** the team recommended blocking workstation-to-workstation admin (segmentation/containment) so the hop becomes impossible, while keeping the detection as a backstop, and validating the fix by re-testing the blocked path.

**Lessons:** segmentation validation finds trust that is too broad; fix it structurally and keep the detection; re-test the boundary.
