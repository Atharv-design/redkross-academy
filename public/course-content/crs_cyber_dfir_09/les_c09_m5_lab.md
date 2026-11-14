> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

## Practical 1: Read-only triage of your own Windows machine

------------------------------------------------------------------

**Objective:** Run read-only queries on a Windows machine you own and interpret the results.

**Difficulty:** Advanced.

**Required tools:** Windows 10/11, PowerShell 5.1+.

**Prerequisites:** Lessons L01-L03; Technical deep dive.

**Environment setup:** a normal (non-admin) PowerShell window, then optionally an administrator window.

**Explicit authorised scope:** your own machine only. Do not query computers you do not own or administer. Do not export other users' data.

**Step-by-step instructions:**

1. Run the three commands in the deep dive.
2. Record log sizes and modes, and estimate how many days the System log covers (oldest event date).
3. Compare ProductName with CurrentBuild and explain any mismatch.
4. As administrator, count today's 4624 events by logon type: Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624; StartTime=(Get-Date).Date} | ForEach-Object { ([xml]$_.ToXml()).Event. EventData.Data | Where-Object Name -eq 'LogonType' } | Group-Object '#text' | Select Name,Count
5. Explain each logon type you see, using Lesson L02.

**Expected observations:** the System log is circular; types 2, 5 and 7 are common on personal machines. (Step 4 is Not execution-tested in this module's build, which lacked admin rights. Verify the command on your machine.)

**Troubleshooting:** "unauthorized operation" means you need an elevated window.

**Cleanup:** none (read-only).

**Learning outcome:** you can triage Windows artefacts safely.

## Practical 2: Reconstruct activity from an artefact table

-----------------------------------------------------------------

**Objective:** Build a timeline from supplied artefact extracts.

**Difficulty:** Advanced.

**Required tools:** spreadsheet or text editor.

**Prerequisites:** Lesson L06.

**Environment setup:** use this fictional extract (times UTC):

```text
4624 type 10 user=ops_admin ip=203.0.113.90 logonid=0x5A1F 01:58:10
4672 logonid=0x5A1F 01:58:10
Prefetch RCLONE.EXE-1A2B3C4D.pf last run 02:05:44 count 1
BAM C:\ProgramData\rc\rclone.exe 02:05:44 (SID of ops_admin)
ShellBags C:\Finance\Payroll accessed 02:03 (ops_admin)
SRUM rclone.exe bytes sent 1,812,330,112 (hour 02:00-03:00)
4634 logonid=0x5A1F 02:31:02
1102 02:31:40
```

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Order the events and group them by session.
2. Write three findings, each with its sources and confidence.
3. State what is not shown, such as which files were sent and the destination.
4. List the next artefacts or logs you would request.

**Expected observations:** an RDP session from an external IP with privileges, browsing of payroll, execution of rclone with about 1.8 GB sent, then logoff and log clearing. Destination unknown: request firewall/proxy logs and the rclone configuration file.

**Troubleshooting:** if two sources disagree on time, note both.

**Cleanup:** none.

**Learning outcome:** you can turn artefacts into supported findings.
