# cargopete.com

Petko (Pete) Pavlovski. Senior Rust engineer, Sofia.

Static site, one page, no framework at runtime. Built with Astro, deployed on Vercel,
apex `www.cargopete.com`.

## Design

Built to the [cargopete-style](https://github.com/cargopete/cargopete-style) house
skill. That means the palette is mandated rather than chosen:
`src/styles/global.css` carries the skill's `reference/tokens.css` verbatim between
two `MANDATED` markers. **Edit those tokens in the skill and re-copy them here** -
never in this repo - so every site in the house style stays identical.

Texture is flat: no gradients, no shadows, hairline borders and whitespace doing the
structural work. Dark by default with a light theme that is a faithful inversion.

The terminal transcript in the hero is real output, run on 21 August 2026. Both
commands can be pasted into a shell and reproduced. If the numbers drift, rerun them
and update the page rather than rounding.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # -> dist/
npm run check        # Astro types and content
```

Or with yatr: `yatr dev`, `yatr build`, `yatr ci`.

## Assets

Fonts are self-hosted, subset with `fonttools` to the glyphs the page uses. Together
they are 35KB, which is most of the page weight. Do not add a font CDN.

The favicon set is drawn, not imported. `public/favicon.svg` is the source of truth;
`scripts/make-favicon.py` reproduces the same geometry as PNG and ICO with no
dependencies beyond the standard library. Change both together, then run
`yatr favicon`.

## Budget

| | Before (Next.js) | Now |
|---|---|---|
| Transfer | 276 KB | 43 KB |
| Requests | 11 | 3 |
| Hosts | 1 | 1 |
| Runtime JS | React + framer-motion + lucide | 34 lines, inline |

Zero third-party requests is a rule, not a target. No analytics, no tag manager, no
font CDN.

## Deploy

Vercel auto-detects Astro: build `npm run build`, output `dist/`. Pushes to `main`
deploy. `vercel.json` sets the security headers and a one-year immutable cache on
`/fonts/*`.
