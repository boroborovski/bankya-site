# Astro CMS Boilerplate — Planning Knowledge Base

## Project Goal

A personal boilerplate GitHub repo using Astro + Keystatic CMS + Tailwind CSS + Svelte, designed to quickly spin up multiple websites. Each site gets its own GitHub repo forked/copied from this boilerplate.

---

## Chosen Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Astro (minimal starter) | `npm create astro@latest` |
| Styling | Tailwind CSS v4 | Config-free by default in v4 |
| Component reference | Flowbite (free tier) | Copy-paste Tailwind blocks, MIT license, no lock-in |
| Interactive components | Svelte (Astro islands) | Tiny bundle, compiles to vanilla JS |
| CMS | Keystatic | Git-based, local mode now, GitHub mode later |
| Deployment | Static now, Vercel later | Hybrid mode needed for Keystatic GitHub mode |
| Per-site repos | Yes | Each site = independent GitHub repo |

---

## CMS Strategy: Two Phases

### Phase 1 — Local Mode (now)
- Astro `output: static`
- Keystatic runs only during `npm run dev`
- Edit content locally, commit and push to deploy
- No backend, no cost, fully static output

### Phase 2 — GitHub Mode (later, per site)
- Swap Keystatic to `githubMode` via env variable
- Add `@astrojs/vercel` adapter
- Switch Astro to `output: hybrid`
- `/keystatic` admin UI works in production via Vercel serverless function
- GitHub OAuth handles authentication
- Edits commit directly to the site's repo and trigger redeploy

The boilerplate will be architected so this switch is a one-day job, not a rewrite.

---

## Keystatic Content Schema

### Collections (repeating content)
- `posts` — blog posts
- `team` — team member profiles
- `services` — service/offering pages

### Singletons (one-off pages/config)
- `homepage` — hero, banners, CTA sections
- `settings` — site name, logo, navigation, footer

---

## Project Structure

```
astro-boilerplate/
├── src/
│   ├── components/        # reusable UI (.astro + .svelte)
│   ├── layouts/           # page layouts (base, blog, landing)
│   ├── pages/             # Astro pages + content routes
│   └── content/           # Astro content collections config
├── content/               # actual content files (md/json)
│   ├── posts/
│   ├── team/
│   ├── services/
│   └── singletons/
├── public/                # static assets
├── keystatic.config.ts    # CMS schema definition
├── astro.config.mjs
└── .env.example           # KEYSTATIC_GITHUB_* vars documented but empty
```

### Component split
- `.astro` — static layout, wrappers, cards, sections (no JS output)
- `.svelte` — interactive islands only (modals, carousels, mobile menu, forms)

---

## Hosting & Costs (Phase 2)

| Item | Cost |
|------|------|
| Domain (Cloudflare registrar) | ~$10-12/year per .com |
| Vercel Pro (all sites under one team) | $20/month |
| SSL certificates | Free (auto via Let's Encrypt) |
| Keystatic CMS | Free |

- Vercel Hobby plan is free but prohibits commercial use
- Cloudflare is recommended for DNS — at-cost domains, fast DNS, free DDoS protection

---

## Key Decisions & Rationale

- **No starter theme** — starting from Astro minimal to own every decision, avoid retrofitting someone else's structure
- **Flowbite is not a dependency** — it's a copy-paste reference, no lock-in
- **Svelte not React** — lighter bundles, better fit for mostly-static marketing sites
- **Tailwind v4** — no config file needed for basic use, simpler setup
- **Git-based CMS** — content lives in repo, no external database, simpler per-site independence
- **Per-site GitHub repos** — clean isolation, each site connects its own Keystatic admin later

---

## Next Steps

1. Scaffold boilerplate with `npm create astro@latest` (minimal)
2. Add Tailwind v4
3. Add Keystatic in local mode
4. Add Svelte integration
5. Define content collections (posts, team, services, homepage, settings)
6. Build base layouts (base, landing, blog)
7. Add a handful of Flowbite-inspired components (hero, features, team, banner, footer)
8. Document the Phase 2 upgrade path (Vercel + GitHub mode)
