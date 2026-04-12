# Astro CMS Boilerplate

A personal boilerplate for spinning up marketing websites quickly. Built with Astro, Keystatic CMS, Tailwind CSS v4, and Svelte.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 5 |
| Styling | Tailwind CSS v4 |
| CMS | Keystatic (local mode → GitHub mode) |
| Interactive components | Svelte islands |
| Adapter | Node.js (swap for Vercel in production) |

## Getting Started

```bash
npm install
git init && git add . && git commit -m "Initial commit"
npm run dev
```

> **Note:** A git repository with at least one commit is required for Keystatic to work.

Visit `http://localhost:4321` for the site and `http://localhost:4321/keystatic` for the CMS admin.

## Project Structure

```
astro-boilerplate/
├── content/                   # Content files managed by Keystatic
│   ├── posts/                 # Blog posts (.mdoc)
│   ├── team/                  # Team member profiles (.yaml)
│   ├── services/              # Service pages (.mdoc)
│   └── singletons/            # Homepage + site settings (.yaml)
├── public/                    # Static assets
│   └── images/
├── src/
│   ├── components/
│   │   ├── islands/           # Svelte interactive islands
│   │   │   └── MobileMenu.svelte
│   │   ├── sections/          # Page sections (Hero, Features, Team, Banner)
│   │   └── ui/                # UI primitives (Header, Footer)
│   ├── layouts/
│   │   ├── BaseLayout.astro   # HTML shell, SEO meta, OG tags
│   │   ├── LandingLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   └── styles/
│       └── global.css         # Tailwind entry point
├── astro.config.mjs
├── keystatic.config.ts        # CMS schema (collections + singletons)
└── .env.example               # Environment variables for Phase 2
```

## CMS Content Schema

### Collections
| Collection | Description |
|-----------|-------------|
| `posts` | Blog posts with title, date, author, cover image, and Markdoc content |
| `team` | Team members with name, role, bio, and photo |
| `services` | Services with title, summary, icon, and Markdoc content |

### Singletons
| Singleton | Description |
|-----------|-------------|
| `homepage` | Hero section content (headline, CTA, image) |
| `settings` | Site name, description, logo, social links, footer text |

## Available Components

| Component | Type | Description |
|-----------|------|-------------|
| `Hero` | Section | Full-width hero with optional image, headline, CTA buttons |
| `Features` | Section | 2/3/4 column feature grid with icons |
| `Team` | Section | Team member cards grid |
| `Banner` | Section | Dismissible info/warning/success banner |
| `Header` | UI | Sticky nav with desktop links and mobile menu |
| `Footer` | UI | 3-column footer with links and social |
| `MobileMenu` | Svelte island | Animated slide-in mobile nav drawer |

## Commands

```bash
npm run dev        # Start dev server + Keystatic admin at /keystatic
npm run build      # Build for production
npm run preview    # Preview production build locally
```

## Upgrading to Production (Phase 2)

To enable the Keystatic admin in production via Vercel:

1. **Install Vercel adapter**
   ```bash
   npm install @astrojs/vercel
   ```

2. **Update `astro.config.mjs`**
   ```js
   import vercel from '@astrojs/vercel'
   // replace: adapter: node({ mode: 'standalone' })
   adapter: vercel()
   ```

3. **Update `keystatic.config.ts`**
   ```ts
   storage: {
     kind: 'github',
     repo: 'your-org/your-repo',
   }
   ```

4. **Create a GitHub OAuth App**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Set callback URL to: `https://your-domain.com/api/keystatic/github/oauth/callback`

5. **Set environment variables in Vercel**
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=
   KEYSTATIC_GITHUB_CLIENT_SECRET=
   KEYSTATIC_SECRET=
   ```

6. Deploy — the `/keystatic` admin will be live in production.

## Using This Boilerplate for a New Site

1. Fork or copy this repo into a new GitHub repository
2. Clone it locally
3. Run `npm install && npm run dev`
4. Update `site` in `astro.config.mjs` to your domain
5. Edit content via `http://localhost:4321/keystatic`
6. Push to deploy
