"""rkutils - small reusable helpers for RedKross Academy C04-M02.

Demonstrates a module with documented, type-hinted functions, input
validation, custom exceptions and a self-test guarded by __name__.
Tested: CPython 3.14.4, 2026-11-07.
"""
import ipaddress

__all__ = ["InvalidPortError", "parse_port", "classify_ip", "summarise"]

WELL_KNOWN_MAX = 1023


class InvalidPortError(ValueError):
    """Raised when a value is not a valid TCP/UDP port number."""


def parse_port(value: str | int) -> int:
    """Return value as an int port 0-65535, or raise InvalidPortError."""
    try:
        port = int(value)
    except (TypeError, ValueError) as exc:
        raise InvalidPortError(f"not a number: {value!r}") from exc
    if not 0 <= port <= 65535:
        raise InvalidPortError(f"out of range: {port}")
    return port


def classify_ip(text: str) -> str:
    """Classify an IP address string as private, loopback, global, etc."""
    ip = ipaddress.ip_address(text.strip())     # may raise ValueError
    if ip.is_loopback:
        return "loopback"
    if ip.is_private:
        return "private"
    if ip.is_global:
        return "global"
    return "special"


def summarise(*ports: int, label: str = "ports", **extra: str) -> str:
    """Summarise any number of ports; extra keyword fields are appended."""
    well_known = sum(1 for p in ports if p <= WELL_KNOWN_MAX)
    text = f"{label}: {len(ports)} total, {well_known} well-known"
    for key, val in sorted(extra.items()):
        text += f", {key}={val}"
    return text


if __name__ == "__main__":
    # Runs only when executed directly (python rkutils.py), not on import.
    assert parse_port("443") == 443
    assert classify_ip("10.1.2.3") == "private"
    print("rkutils self-test passed")
