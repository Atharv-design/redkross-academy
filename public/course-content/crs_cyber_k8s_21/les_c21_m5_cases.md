## Hildegard, 2021 Context: on 3 February 2021 Unit 42 (Palo Alto Networks) reported Hildegard, malware attributed to the TeamTNT group and targeting Kubernetes [C21-M05-R4]. What happened: the report states the attackers gained initial access via a misconfigured kubelet that allowed anonymous access, using the kubelet API to run commands in running containers. The malware then used masscan to find other kubelets on the internal network (port 10250) and deployed cryptomining (XMRig) to their containers. It kept two command-and-control channels (a tmate reverse shell and IRC), searched for cloud, SSH, Docker and Kubernetes credentials, hid processes by modifying /etc/ld.so.preload, named its IRC agent "bioset" after a kernel worker process, and deleted its scripts after execution. Lessons for this module: - Segmentation: pods and nodes that cannot reach 10250 on other nodes stop that spread; restrict node ports with host firewalls and keep pod egress default-deny. - Runtime detection: internal scanning, new outbound channels, changes to ld.so.preload and miners are all node-sensor signals (L06). - Configuration: kubelet anonymous authentication and authorisation mode (Module 3 L05) were the root cause. The report notes managed services enforced kubelet authentication at the time.



## (FICTIONAL TEACHING SCENARIO): The policies that did nothing

**Context:** Kestrel Pay's (fictional) test cluster ran a network plugin without NetworkPolicy support. The team wrote and applied a full set of default-deny and allow policies, and an auditor accepted the YAML as segmentation evidence.

**What happened:** a penetration test months later reached the database from an unrelated pod. The policies existed in the API but no controller enforced them.

**Response:** the cluster moved to a plugin that enforces NetworkPolicy; a reachability matrix (like netpol_test.sh) became the required evidence for every release, run from the client pods; the auditor's checklist changed from "policy present" to "policy tested".

**Lessons:** configuration is not enforcement. Test the effect from the data plane.
