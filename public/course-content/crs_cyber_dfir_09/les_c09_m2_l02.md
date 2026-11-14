| Term | Meaning |
|---|---|
| Raw (dd, .img, .001) | a bit-for-bit copy with no metadata. It is universally readable. Hashes are recorded separately. |
| Expert Witness Format (E01/Ex01) | a forensic container that stores case metadata, compression and internal checksums. It is widely supported. The open-source library libewf reads it. |
| AFF4 | an open advanced format supporting large-scale and memory images. |
| VM disks (VMDK, VHDX, QCOW2) | native virtual formats, usually converted or read directly by forensic tools. |

Whatever the format, record the tool, version, block size, error handling, start and end times, source identifiers (serial number, model, capacity) and hashes.
