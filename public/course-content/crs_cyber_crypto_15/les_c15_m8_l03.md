Key functions in rkcrypt.py:

```text
derive_key(passphrase, salt, log2n, r, p)
    hashlib.scrypt(..., n=2**log2n, r=r, p=p, maxmem=2**30, dklen=32).
    Empty passphrases are rejected. maxmem allows the 128 MiB that
    N=2^17 needs.
encrypt_bytes(data, passphrase)
    Fresh salt and nonce from os.urandom. The header is packed with
    struct.Struct(">4sBBBB16s12s") (36 bytes). The output is
    header + AESGCM(key).encrypt(nonce, data, header).
decrypt_bytes(blob, passphrase)
    Checks the minimum length (header + tag), magic, KDF ID and
    parameter bounds, then decrypts with the header as AAD. InvalidTag
    becomes RkcryptError("authentication failed: ..."), with no detail on
    the cause.
main(argv)
    The passphrase comes from the environment (for automation) or
    getpass (interactive, not echoed). Output is written to a temporary
    file and then os.replace, so a failed run never leaves a partial
    plaintext file in place of the target. Exit codes follow R5.
```

**Deliberate limits:** the whole file is held in memory, with MAX_SIZE of 64 MiB. Large files would need a chunked AEAD design with per-chunk nonces and an authenticated chunk index, which is a capstone extension.
