Beyond pairing and key agreement, Bluetooth device hardening covers:

```text
discoverability    make the device discoverable only ON DEMAND and for a limited
                   time, not permanently - a permanently discoverable device
                   advertises itself to every attacker in range.
default PINs       never rely on fixed legacy PINs like "0000" or "1234"; use
                   authenticated pairing instead.
encryption key size require the largest key size supported (up to 16 bytes); a
                   small minimum key size weakens the link and has enabled
                   downgrade attacks.
bonded devices     periodically review and prune the list of bonded (paired)
                   devices; remove stale or unknown bonds.
minimise radios    disable Bluetooth when not needed; limit services/profiles to
                   those required.
patching           keep device firmware current (pairing and protocol
                   vulnerabilities are patched over time).
```

Each is a concrete configuration item. Together with an authenticated association model and Secure Connections, they harden a device against the Bluetooth threat surface. The lab checks association model, Secure Connections, discoverability, default PIN, key size and bond review.
