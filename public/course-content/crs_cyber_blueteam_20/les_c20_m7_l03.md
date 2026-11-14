A rule is usually written from one example; adversaries use many. Derive variants systematically:

- Documented syntax alternatives. The PowerShell 7 documentation lists the parameter as "-EncodedCommand | -e | -ec" and states that "All parameters are case-insensitive" [R3]. The Windows PowerShell 5.1 page lists no short aliases for -EncodedCommand [R4], so test which abbreviations your estate's binaries accept in a lab rather than assuming.
- Alternative binaries: powershell.exe and pwsh.exe; cmd and other script hosts.
- Alternative parents: Word, Excel, Outlook and PowerPoint.
- Case and path variations; quoting; extra whitespace.
- Equivalent techniques that the same rule should not be expected to catch, documented as out of scope.

Each case states the technique ID, the synthetic events, the expected rule (or rules) and the pass criterion ("at least one rule fires at the intended severity").
