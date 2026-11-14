The concrete Bluetooth threats a defender addresses:

```text
eavesdropping        capturing a weakly-protected link; defeated by Secure
                     Connections and strong keys.
MITM during pairing  interposing when "Just Works" or legacy pairing is used;
                     defeated by an authenticated association model + Secure
                     Connections.
impersonation/spoofing a device pretending to be a trusted peer; defeated by
                     authenticated pairing and bond management.
unwanted discovery   a permanently discoverable device inviting connection
                     attempts; defeated by on-demand, limited discoverability.
downgrade            forcing a weaker key size or legacy mode; defeated by
                     requiring large keys and Secure Connections, and patching.
stale bonds          old paired devices retaining access; defeated by pruning
                     bonds.
```

As with Wi-Fi, each threat maps to a specific control, and the defender's offline review checks those controls. Naming the threats explains the defences; the course never asks you to perform a Bluetooth attack. The lab's review turns the threat surface into a concrete, checkable configuration.
