The pipeline used in the lab:

```text
dd if=suspect.dev bs=4M conv=noerror,sync status=none | tee evidence.dd |
sha256sum
- dd reads the source sequentially. "if" is the input, "bs" the block
  size.
- tee writes the byte stream to evidence.dd and passes it on to
  sha256sum.
- The data is read from the source once, which reduces wear on fragile
  media and saves time. The stream hash equals the hash of the file
  written, provided the write succeeded. Step 3 therefore re-hashes the
  file to prove it.
- Hashing the source separately (step 1) is possible here because the
  "device" is a file. On real evidence each extra read adds time and
  stress, so many tools compute source and image hashes during the
  single acquisition pass.
```

Dedicated tools (for example dc3dd, dcfldd, ewfacquire, FTK Imager and commercial imagers) add progress reporting, piecewise hashing, logging and E01 output. They were not execution-tested in this module. Whatever the tool, the evidence of integrity is the same: a documented hash of the source data and matching verification of each copy.

**Common errors:** imaging the wrong device (verify the serial number and size with lsblk or Disk Management); writing the image onto the evidence disk (always image to separate, wiped, verified media); and not recording time zones.
