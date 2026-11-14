Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

EDR shows a suspicious PowerShell process on a server, and IT wants to reboot now.

**Task:** Decide the sequence.

> [!TIP] Model answer
> Ask for a short delay. Isolate the server via EDR first if the risk is ongoing, since isolation keeps memory. Capture memory with an approved tool to external storage and hash it. Collect live artefacts. Then reboot or contain as the incident lead decides. Record approvals and times.
>
> **Lesson:** memory first, but never at the cost of uncontrolled harm.

## Scenario 2

psscan shows a process that pslist does not.

**Task:** Explain possibilities.

> [!TIP] Model answer
> The process may have exited (psscan finds freed structures with exit times); it may have been hidden by unlinking from the active list (a rootkit); or it may be a false positive from smear or a carved fragment. Check exit times, its threads, handles and network objects, and compare with other sources.
>
> **Lesson:** differences are leads to explain, not conclusions.

## Scenario 3

You have no memory tool approved for a Linux server.

**Task:** Collect what you can.

> [!TIP] Model answer
> Run a minimal, trusted live-response collection (as in the lab, ideally from read-only trusted media): processes, command lines, network sockets, open files, logged-in users, kernel version and modules, and clock offset. Write the output externally and hash it. Copy the binaries of any deleted running processes via /proc/<pid>/exe. Document the footprint. Request an approved memory tool for the future.
>
> **Lesson:** partial volatile evidence beats none.
