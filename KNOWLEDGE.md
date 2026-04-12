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
- Astro `output: server` + `@astrojs/node` adapter (required even for local)
- Keystatic admin available at `/keystatic` during `npm run dev`
- Edit content locally → git commits → push to deploy
- **Requires a git repo with at least one commit** (`git init && git commit`)

### Phase 2 — GitHub Mode (later, per site)
- Swap `@astrojs/node` adapter for `@astrojs/vercel`
- Switch Keystatic storage to `kind: 'github'` with `repo: 'owner/repo'`
- Create GitHub OAuth app, set env vars in Vercel dashboard
- `/keystatic` admin UI works in production, commits directly to repo
- Triggers automatic redeploy on each content save

The boilerplate is architected so this switch is a one-day job, not a rewrite.

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
- **Svelte not React** — lighter bundles, better fit for mostly-static marketing sites (React is only added for Keystatic's admin UI)
- **Tailwind v4** — no config file needed for basic use, simpler setup
- **Git-based CMS** — content lives in repo, no external database, simpler per-site independence
- **Per-site GitHub repos** — clean isolation, each site connects its own Keystatic admin later

## Known Gotchas

- **Pin to Astro 5** — Astro 6 broke `@astrojs/svelte`, `@astrojs/node`, `@astrojs/react` compatibility with Keystatic (as of April 2026). Packages to pin: `astro@^5`, `@astrojs/svelte@^7`, `@astrojs/node@^9`, `@astrojs/react@^4`
- **`output: 'hybrid'` removed** — Astro 5 uses `'server'` instead; `'static'` is now the default but Keystatic requires `'server'`
- **Keystatic needs a git repo** — `git init` + at least one commit required or you get `BranchNotFound` white pages
- **Vite must dedupe yjs** — without `resolve: { dedupe: ['yjs', 'react', 'react-dom'] }` in Vite config, Keystatic crashes with white pages on singleton/collection editor pages
- **Don't manually create Keystatic routes** — the `@keystatic/astro` integration auto-registers `/keystatic/[...params]` and `/api/keystatic/[...params]`; creating them manually causes route collision errors
- **React integration order matters** — `react()` must come before `keystatic()` in the integrations array
- **Vite cache** — after config changes always clear `node_modules/.vite` and restart dev server

---

## Status

Boilerplate is built and working. Keystatic admin runs at `/keystatic` during `npm run dev`.

### What's built
- Astro 5 + Tailwind v4 + Svelte + React + Keystatic (local mode)
- Layouts: `BaseLayout`, `LandingLayout`, `BlogLayout`
- Components: `Hero`, `Features`, `Team`, `Banner`, `Header`, `Footer`
- Svelte island: `MobileMenu`
- Keystatic schema: posts, team, services collections + homepage, settings singletons
- Demo homepage wired up at `/`

### Next to build
- Blog listing + post pages (reading from Keystatic content)
- Services page
- Team page
- Contact form (Svelte island)
- Phase 2 upgrade: swap to Vercel adapter + Keystatic GitHub mode
