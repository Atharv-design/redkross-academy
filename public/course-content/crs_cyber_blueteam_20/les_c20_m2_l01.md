Three common sources on Windows:

```text
Windows Security 4688  "A new process has been created". It requires the
          Audit Process Creation policy, and the command line is logged
          only if the separate setting "Include command line in process
          creation events" is enabled; both are off by default. Microsoft
          warns that command lines can contain passwords or user data,
          and anyone who can read the Security log can read them
          [R2].
Sysmon    a free Sysinternals service and driver. Event ID 1 (process
          creation) logs the full command line for the process and its
          parent, hashes, and a ProcessGuid that stays unique across a
          domain even when Windows reuses process IDs. Other useful
          events: 3 (network connection, disabled by default), 11 (file
          create), 12-14 (registry), 22 (DNS query) and 255 (Sysmon
          error). Timestamps are UTC. Microsoft notes that Sysmon "does
          not provide analysis of the events it generates, nor does it
          attempt to hide itself from attackers" [R3].
EDR       a commercial agent that collects similar events and adds
          analytics, prevention and response actions. Field names differ
          by vendor, so normalise them (Course 08 Module 3).
```

On Linux, the equivalents are auditd execve records, eBPF-based sensors and EDR agents. On macOS, the Endpoint Security framework feeds EDR products.

Configuration is part of detection. Sysmon's onmatch include and exclude filters decide what is logged, and exclude rules take precedence [R3]. A careless exclude (for example of every process under C:\Users\) can blind you to the most common malware location. Keep the sensor configuration in version control and review it like rule code.
