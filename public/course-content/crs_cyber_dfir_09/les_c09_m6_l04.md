When traffic is unencrypted, transferred files can be reconstructed from the capture. tshark's --export-objects option (protocols include http, smb, tftp, imf and dicom) writes each object to a folder. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
== original file hash (on server)
04e8f300af28e28154b7a1300cbbd7b15b449e79285b7a5565fc1f5edfa226ec
  /srv/backup/customers.csv
-- export HTTP objects
customers.csv
missing.zip
04e8f300af28e28154b7a1300cbbd7b15b449e79285b7a5565fc1f5edfa226ec
  /tmp/obj/customers.csv
-- pcap file hash
6e2cf6fe84d9c063c39f8ce9b1e3c1ca996d1b25e0bdf01a20e181c124528a21
  rk_c09_lab.pcap
--------------------------------------------------------------- END OUTPUT
(execution-tested; wrapped)
```

The SHA-256 of the file carved from the capture equals the hash of the file on the server. That supports the finding that this exact file crossed the network to 172.31.0.20. Two cautions:

- A "missing.zip" object was also exported. It is not a ZIP file; it is the body of the server's 404 error page, saved under the requested name. Exported objects are named from the URI, not from their content. Always check the response code and the file's actual type (file command, magic bytes) before reporting "a ZIP was downloaded".
- Hashing the pcap itself (6e2cf6fe...) protects the capture; the carved file's hash identifies the content. Record both.
