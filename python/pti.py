"""
PTI — Persistent Traversal Identity
Reference implementation (Python)
"""


def encode(r, g, b):
    """Encode an RGB color as an 8-digit PTI address string."""
    result = []
    for i in range(7, -1, -1):
        result.append(4 * ((r >> i) & 1) + 2 * ((g >> i) & 1) + ((b >> i) & 1))
    return ''.join(map(str, result))


def decode(addr):
    """Decode a PTI address string to (r, g, b). Mirrors Algorithm 2 (PTI-Decode)."""
    r = g = b = 0
    for i in range(8):
        t = int(addr[i])
        r += (t // 4) * 2 ** (7 - i)
        g += ((t % 4) // 2) * 2 ** (7 - i)
        b += (t % 2) * 2 ** (7 - i)
    return r, g, b

def from_hex(hex_str):
    """Convert a hex color string to a PTI address."""
    h = hex_str.lstrip('#')
    return encode(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def to_hex(addr):
    """Convert a PTI address to a hex color string."""
    r, g, b = decode(addr)
    return f'#{r:02X}{g:02X}{b:02X}'


def truncate(addr, depth):
    """Truncate a PTI address to a shallower depth."""
    return addr[:depth]


def rotation_orbit(addr):
    """Return the rotation orbit of a PTI address (all 8 cyclic rotations)."""
    result = []
    cur = addr
    for _ in range(8):
        result.append(cur)
        cur = cur[1:] + cur[0]
    return result


def family(prefix, depth=None):
    """Return all depth-8 addresses with the given prefix."""
    if depth is None:
        depth = len(prefix)
    remaining = 8 - depth
    return [prefix + oct(i)[2:].zfill(remaining) for i in range(8 ** remaining)]
