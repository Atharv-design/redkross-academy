NTFS, the Windows default, stores everything as files described in the Master File Table (MFT). Each file has at least one MFT record (typically 1,024 bytes) containing attributes [R1]:

| Term | Meaning |
|---|---|
| $STANDARD_INFORMATION (SI) | MACB timestamps and flags, which user-mode APIs can easily change. |
| $FILE_NAME (FN) | the name, the parent directory reference and another set of MACB timestamps. These are updated by the kernel in fewer circumstances and are harder to alter. |
| $DATA | content. Small files are stored "resident" inside the MFT record. Larger ones are "non-resident", stored in clusters described by runlists. Alternate data streams (ADS) are additional named $DATA attributes (for example Zone.Identifier, the "mark of the web"). |

Other system files include $LogFile (the transaction log), $UsnJrnl:$J (the update sequence number change journal, which records create, delete and rename events), $Bitmap (cluster allocation) and $Secure.

**Forensic points:**

- Comparing SI and FN timestamps helps detect timestomping, where the SI times have been altered (ATT&CK T1070.006).
- The USN journal can show that a file existed and was deleted, even after its MFT record has been reused.
- Resident data can survive in an MFT record after deletion.

NTFS images were not built in this lab, because creating NTFS without Windows tools (for example with ntfs-3g) and examining it is left as an extension exercise. Statements here are from documentation and are Not execution-tested.
