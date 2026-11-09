# Working on cargopete.com

Astro builds a static site for Vercel at `https://www.cargopete.com`. Fonts are self-hosted; the site has no analytics or third-party runtime requests.

## Develop

```sh
npm install
npm run dev
npm run build
npm run check
```

`npm run check` checks Astro types and content, the profile README against its source data, and the committed resume PDF. The existing `yatr` tasks remain available.

## Portfolio, GitHub profile and CV

`src/data/portfolio.ts` holds the project descriptions and evidence links used by the homepage and GitHub profile. `src/data/resume.ts` holds contact details and employment history, shared by the homepage, resume page, profile and PDF. Use fixed starting years rather than elapsed tenures and avoid undated activity counts.

After editing those files:

```sh
npm run profile
npm run resume-pdf
npm run social-card
npm run build
npm run check
```

Commit generated `README.md`, `public/social-card.png` and `public/resume/petko-pavlovski-resume.pdf` with their source changes. The PDF uses Playwright Chromium and must fit on one A4 page. Install the browser once with `npx playwright install chromium` if it is missing.

Project claims should link to public code or primary documentation. A working UI alone does not establish that a data service is healthy. Employer work is described at a high level; do not copy private implementation details into this repository.

## Writing

Posts live in `src/content/blog/`, with the schema in `src/content.config.ts`:

```yaml
---
title: "A title"
date: "2026-09-02"
description: "The listing subtitle and feed description."
tags: ["rust"]
draft: false
---
```

`draft: true` excludes the post from routing, listing, RSS and sitemap. `/rss.xml` and `/sitemap.xml` are generated endpoints. The homepage, `/resume/`, `/blog/` and each published post share the navigation and metadata layout.

## Design and assets

The site uses Foundry, the house style shared with Lodestar and nuthatch-indexer.com. `src/styles/global.css` carries the canonical tokens between the `FOUNDRY` markers; change the tokens in Foundry and copy them across. `src/styles/foundry.css` contains the components. Site-specific layout rules sit below the tokens, with rem typography and a 112.5% root. Retain readable contrast, keyboard focus, reduced-motion support and useful content without JavaScript.

The homepage retains Foundry’s workbench scenery behind the hero. Home, writing and resume pages retain ambient parts in the margins; posts remain still. `public/foundry/scenes.js` is vendored from Foundry and loaded after first paint. If WebGL or the import fails, all content remains available. Re-copy the module when Foundry changes.

`public/favicon.svg` is the source for the favicon set. Run `yatr favicon` after changing it. Social previews use the generated 1200 × 630 PNG from `scripts/social-card.mjs`.

## Publishing

The existing Vercel project serves `dist/` using `vercel.json`. Build and review the changes before publishing. After deployment, fetch the live homepage, resume and PDF to confirm the intended version is running.
