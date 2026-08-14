/**
 * PTI — Persistent Traversal Identity
 * Reference implementation (JavaScript, ESM build)
 *
 * Four core functions: encode, decode, fromHex, toHex
 * Three utility functions: truncate, rotationOrbit, family
 *
 * PTI addresses are strings. Leading zeros are meaningful.
 * Valid address: 8 characters, each digit 0–7.
 */

/**
 * Encode an RGB color as an 8-digit PTI address.
 * @param {number} r - Red channel (0–255)
 * @param {number} g - Green channel (0–255)
 * @param {number} b - Blue channel (0–255)
 * @returns {string} 8-digit PTI address
 */
export function encode(r, g, b) {
    let result = '';
    for (let i = 7; i >= 0; i--) {
        result += 4 * ((r >> i) & 1) + 2 * ((g >> i) & 1) + ((b >> i) & 1);
    }
    return result;
}

/**
 * Decode a PTI address to an RGB color.
 * @param {string} addr - 8-digit PTI address
 * @returns {{ r: number, g: number, b: number }}
 */
export function decode(addr) {
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < 8; i++) {
        const t = parseInt(addr[i]);
        r += Math.floor(t / 4) * 2 ** (7 - i);
        g += Math.floor((t % 4) / 2) * 2 ** (7 - i);
        b += (t % 2) * 2 ** (7 - i);
    }
    return { r, g, b };
}

/**
 * Convert a hex color string to a PTI address.
 * @param {string} hex - e.g. "#FF0000" or "FF0000"
 * @returns {string} 8-digit PTI address
 */
export function fromHex(hex) {
    const h = hex.replace('#', '');
    return encode(
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16)
    );
}

/**
 * Convert a PTI address to a hex color string.
 * @param {string} addr - 8-digit PTI address
 * @returns {string} e.g. "#FF0000"
 */
export function toHex(addr) {
    const { r, g, b } = decode(addr);
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}

/**
 * Truncate a PTI address to a shallower depth.
 * The truncated address is the canonical cyclic representative at that depth.
 * @param {string} addr - 8-digit PTI address
 * @param {number} depth - target depth: 1, 2, 4, or 8
 * @returns {string} depth-digit prefix
 */
export function truncate(addr, depth) {
    return addr.slice(0, depth);
}

/**
 * Return the rotation orbit of a PTI address (the full PTI palette).
 * @param {string} addr - 8-digit PTI address
 * @returns {string[]} array of 8 addresses (may contain duplicates for short-period addresses)
 */
export function rotationOrbit(addr) {
    const result = [];
    let cur = addr;
    for (let i = 0; i < 8; i++) {
        result.push(cur);
        cur = cur.slice(1) + cur[0];
    }
    return result;
}

/**
 * Return all depth-8 addresses with a given prefix (a PTI address family).
 * @param {string} prefix - depth-d prefix (1, 2, or 4 digits)
 * @returns {string[]} all 8^(8-prefix.length) addresses in this family
 */
export function family(prefix) {
    const remaining = 8 - prefix.length;
    const results = [];
    const total = Math.pow(8, remaining);
    for (let i = 0; i < total; i++) {
        let suffix = i.toString(8).padStart(remaining, '0');
        results.push(prefix + suffix);
    }
    return results;
}
