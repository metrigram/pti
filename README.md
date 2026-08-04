# PTI — Persistent Traversal Identity

**PTI is a structured 8-digit address for every RGB color.**

Every one of the 16.7 million RGB colors gets a unique address derived from its path through a recursive subdivision of the RGB cube. The address is hierarchically interpretable, machine-precise, and composable — a color representation built for structured naming, not just storage.

```js
pti.encode(255, 0, 0) // → "44444444" (pure Red)
pti.encode(0, 255, 255) // → "33333333" (pure Cyan)
pti.fromHex("#FF8000") // → "64444444"
pti.rotationOrbit("01234567") // → 8 structurally related colors (a PTI palette)
```

---

## Install

Reference implementation, no published package yet: [`javascript/pti.js`](javascript/pti.js) or
[`python/pti.py`](python/pti.py) (same API in both).

---

## API

```js
pti.encode(r, g, b) // RGB → 8-digit PTI address (string)
pti.decode("44444444") // PTI address → { r, g, b }
pti.fromHex("#FF0000") // hex color → PTI address
pti.toHex("44444444") // PTI address → hex color
pti.truncate("34213421", 4) // depth-8 → depth-4 prefix ("3421")
pti.rotationOrbit("34213421") // all 8 rotations of an address
pti.family("34", 2) // all colors in a depth-2 address family
```

---

## How It Works

PTI addresses an RGB color by recording which octant of the RGB cube it falls into at each of 8 successive halvings. Each digit (0–7) encodes one step: which corner of the current sub-cube the color is closer to. The result is a structured 8-character string that reads like a path.

`44444444` is pure Red because every subdivision step goes toward the Red corner.  
`01234567` is a specific dark, saturated blue that visits every anchor direction exactly once.

For the full specification and formal proofs, see the paper.

---

## Paper

> Hector M. Trevino. *PTI: A Hierarchical Symbolic Color Addressing System.* [arXiv:2608.02460](https://arxiv.org/abs/2608.02460)

```bibtex
@misc{trevino2026pti,
  author = {Trevino, Hector M.},
  title = {{PTI}: A Hierarchical Symbolic Color Addressing System},
  year = {2026},
  note = {arXiv:2608.02460}
}
```

---

## Interactive Explorer

[metrigram.com/pti/orbit-explorer.html](https://metrigram.com/pti/orbit-explorer.html) — explore PTI palettes interactively

[metrigram.com/pti/color-explorer.html](https://metrigram.com/pti/color-explorer.html) — browse the full color space by drilling down through address prefixes

---

## License

Code: [MIT](LICENSE)  
Paper and written content: [CC BY 4.0](LICENSE)
