Every process has a parent. Joining child.ParentProcessGuid to parent.ProcessGuid rebuilds a tree that tells a story. Some useful heuristics:

- Office applications (WINWORD.EXE, EXCEL.EXE) seldom need to start shells or script hosts. Office -> PowerShell is a classic sign of a malicious document (ATT&CK T1566.001 then T1059.001).
- Shells starting discovery tools (whoami, net, nltest) can be administration or reconnaissance; context decides (T1069.002 Domain Groups).
- Shells creating scheduled tasks or services point to persistence (T1053.005).
- Archive tools reading network shares can be backup jobs or collection for exfiltration (T1560.001).

Each heuristic has legitimate exceptions. The tree gives the context: who the user is, which host it is, what came before and what came after. Parent spoofing exists, so where the sensor offers it, prefer the creator process recorded by the kernel to a claimed parent.
