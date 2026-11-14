The following descriptions come from widely used documentation and training. Behaviour varies by Windows version, and none was execution-tested here beyond UserAssist decoding.

```text
Prefetch (C:\Windows\Prefetch\*.pf)  created on client Windows when a
         program runs. It holds the executable name, run count, recent
         run times (several on Windows 8 and later) and files referenced.
         It is often disabled on servers. It is strong evidence of
         execution.
Amcache.hve  application inventory with paths, SHA-1 hashes of
         executables and first-seen information. It suggests presence and
         often execution. Interpret it with care.
ShimCache (AppCompatCache, SYSTEM hive)  records executables the
         compatibility subsystem saw. On Windows 10 and later, presence
         is not proof of execution. Use it for existence and timeline
         context.
BAM/DAM (SYSTEM\...\Services\bam\State\UserSettings\<SID>)  last
         execution time per user for some executables.
UserAssist (NTUSER.DAT)  GUI program launches by the user, with run
         counts and last-run time. Value names are ROT13-encoded.
SRUM (C:\Windows\System32\sru\SRUDB.dat)  per-application resource and
         network usage over about 30 days.
```

Execution-tested decoding (LAB_ASSETS/C09/userassist_rot13.py, synthetic values):

```text
------------------------------------------------------------- BEGIN OUTPUT
P:\Hfref\qrzb\Qbjaybnqf\vaibvpr_ivrjre.rkr
  -> C:\Users\demo\Downloads\invoice_viewer.exe
{1NP14R77-02R7-4R5Q-O744-2RO1NR5198O7}\abgrcnq.rkr
  -> {1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\notepad.exe
--------------------------------------------------------------- END OUTPUT
(execution-tested, CPython 3.14.4)
```

ROT13 is obfuscation, not protection. Even the GUID's hex letters were rotated. The decoded GUID is a Windows "known folder" identifier, which corresponds to the System32 folder. Resolve it before reporting the path. Execution in the registry is evidence that a launch was recorded, not of who sat at the keyboard.
