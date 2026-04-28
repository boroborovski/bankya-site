# БПЛР–Банкя — Уебсайт

Website for **Болница за продължително лечение и рехабилитация – Банкя** (BPLR Bankya), a specialist rehabilitation hospital in Bankya, Bulgaria.

Built on top of the Astro CMS boilerplate using Astro 5, Keystatic CMS, Tailwind CSS v4, and Svelte.

----

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Astro 5 | SSR mode (`output: 'server'`) |
| Styling | Tailwind CSS v4 | Config-free, Vite plugin |
| Typography | `@tailwindcss/typography` | `prose` classes for rich content |
| CMS | Keystatic (local mode) | Git-based, no database |
| Interactive components | Svelte 5 islands | Runes syntax |
| Adapter | `@astrojs/node` | Swap for `@astrojs/vercel` in production |
| Rich content | Markdoc (`@markdoc/markdoc`) | Tables, images, YouTube embeds |

---

## Getting Started

```bash
npm install
npm run dev
```

- Site: `http://localhost:4321`
- CMS admin: `http://localhost:4321/keystatic`

> **Note:** A git repository with at least one commit is required for Keystatic to work. The repo already has commits so this is handled.

> **WSL2 users:** The project includes polling-based file watching (`usePolling: true`) so Keystatic image uploads are served immediately without a dev server restart.

---

## Project Structure

```
bankya-site/
├── content/                        # All CMS content (managed via Keystatic)
│   ├── patient-info/               # Za Pacienta sub-pages (.mdoc)
│   │   ├── obshta-informatsiya.mdoc
│   │   ├── klinichni-pateki.mdoc
│   │   ├── noi.mdoc
│   │   ├── platen-priem.mdoc
│   │   └── voenen-kontingent.mdoc
│   ├── posts/                      # Blog/news posts (.mdoc)
│   ├── services/                   # Services/activities (.mdoc)
│   ├── team/                       # Team member profiles (.yaml)
│   └── singletons/
│       ├── homepage.yaml           # Homepage content + section visibility
│       ├── about-page.yaml         # Za Nas page content
│       ├── settings.yaml           # Site-wide settings (contact info, social)
│       ├── page-heroes.yaml        # Hero banners for all inner pages
│       └── gallery.yaml            # Gallery images with categories
│
├── public/
│   └── images/                     # Uploaded images (managed by Keystatic)
│
├── src/
│   ├── components/
│   │   ├── islands/                # Svelte interactive components
│   │   │   ├── HeroSlider.svelte   # Auto-cycling homepage hero slider
│   │   │   ├── MobileMenu.svelte   # Animated mobile navigation drawer
│   │   │   ├── Gallery.svelte      # Gallery with categories, pagination, lightbox
│   │   │   ├── PatientAccordion.svelte  # Expandable accordion (legacy, unused)
│   │   │   └── ContactForm.svelte  # Contact/enquiry form
│   │   ├── sections/               # Astro page section components
│   │   │   ├── Hero.astro          # Page hero with optional buttons
│   │   │   ├── Features.astro      # Icon + text feature grid
│   │   │   ├── Stats.astro         # Statistics strip
│   │   │   ├── ContentSection.astro # Text + image + bullet points section
│   │   │   ├── CTASection.astro    # Call-to-action banner (blue or light)
│   │   │   ├── Team.astro          # Team member cards
│   │   │   ├── Timeline.astro      # Vertical timeline with year badges
│   │   │   ├── BlogGrid.astro      # News/blog post card grid
│   │   │   └── Banner.astro        # Dismissible info/warning/success banner
│   │   └── ui/
│   │       ├── TopBar.astro        # Blue top strip with phone, email, hours
│   │       ├── Header.astro        # Sticky nav with dropdown + mobile menu
│   │       └── Footer.astro        # 4-column footer with contact info
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, SEO meta, OG tags
│   │   ├── LandingLayout.astro     # Page layout with header + footer
│   │   └── BlogLayout.astro        # Blog post layout
│   ├── lib/
│   │   └── markdoc-config.ts       # Markdoc custom tags (YouTube embed)
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   ├── za-nas.astro            # About page
│   │   ├── deynosti.astro          # Services/activities page
│   │   ├── galeriya.astro          # Gallery page
│   │   ├── kontakti.astro          # Contact page
│   │   ├── za-pacienta/
│   │   │   ├── index.astro         # Patient info landing
│   │   │   └── [slug].astro        # Individual patient info pages
│   │   └── novini/
│   │       ├── index.astro         # News listing
│   │       └── [slug].astro        # Individual news post
│   └── styles/
│       └── global.css              # Tailwind entry + YouTube embed CSS
│
├── astro.config.mjs
├── keystatic.config.ts             # Full CMS schema
└── .env.example
```

---

## CMS Schema

### Collections (repeating content)

| Collection | Path | Description |
|-----------|------|-------------|
| `posts` | `content/posts/*` | News posts — title, date, author, cover image, Markdoc body |
| `team` | `content/team/*` | Team members — name, role, bio, photo |
| `services` | `content/services/*` | Services — title, summary, icon (emoji), order, Markdoc body |
| `patientInfo` | `content/patient-info/*` | Za Pacienta sub-pages — title, order, Markdoc body |

### Singletons (one-off pages/config)

| Singleton | Label in admin | Description |
|-----------|---------------|-------------|
| `homepage` | Начална страница | Hero slides, stats strip, about section, CTA, **section visibility toggles** |
| `aboutPage` | Страница "За нас" | Mission text, stats, mineral water section, timeline events |
| `settings` | Настройки на сайта | Site name, logo, phone, email, address, hours, social URLs |
| `pageHeroes` | Заглавни банери (Hero) | Hero headline/subheadline/buttons for every inner page |
| `gallery` | Галерия | Images array with alt text, caption, and category |

---

## Pages

| URL | Page | Content source |
|-----|------|---------------|
| `/` | Homepage | `homepage` singleton + `services` + `posts` collections |
| `/za-nas` | За нас | `aboutPage` singleton + `team` collection |
| `/deynosti` | Дейности | `services` collection |
| `/za-pacienta` | За пациента (index) | `patientInfo` collection listing |
| `/za-pacienta/[slug]` | За пациента (detail) | Individual `patientInfo` entry (Markdoc) |
| `/galeriya` | Галерия | `gallery` singleton |
| `/novini` | Новини | `posts` collection listing |
| `/novini/[slug]` | Новина (detail) | Individual `post` entry (Markdoc) |
| `/kontakti` | Контакти | `settings` singleton + static ContactForm |

---

## Key Features

### Homepage
- Auto-cycling hero slider (HeroSlider Svelte island, 5s interval, pause on hover)
- Per-section visibility toggles in Keystatic — hide Stats, About, Services, CTA, or Blog sections with a checkbox
- All content (slides, stats, about text, CTA) editable via CMS

### Navigation
- Desktop: dropdown submenu under "За пациента" with direct links to sub-pages
- Mobile: slide-in drawer with expand/collapse for submenus
- Contact header strip (TopBar) with phone, email, working hours

### За пациента
- Each topic is a separate page with sidebar navigation
- Content is full Markdoc: supports headings, tables, bullet lists, images, YouTube embeds
- Prev/Next navigation between pages

### Gallery
- Uniform square grid (2 / 3 / 4 columns by breakpoint)
- Category filter tabs — assign a category to each image in Keystatic, tabs appear automatically
- "Load more" pagination (12 images per page by default)
- Lightbox with keyboard navigation (← → Esc)

### Rich Content (Markdoc)
Supported in `patientInfo` and `posts` content:
- Headings, paragraphs, bullet lists, numbered lists
- **Bold**, *italic*
- Tables
- Images
- YouTube embeds:
  ```
  {% youtube url="https://www.youtube.com/watch?v=VIDEO_ID" /%}
  ```
  Accepts full YouTube URL, `youtu.be/` short links, or bare video IDs. Renders as responsive 16:9 iframe.

### Hero Banners
All inner page heroes (За нас, За пациента, Дейности, Галерия, Новини, Контакти) are controlled from a single **Заглавни банери** singleton. Clear a button text field → that button disappears from the page.

---

## Commands

```bash
npm run dev        # Dev server at :4321 + Keystatic at /keystatic
npm run build      # Production build
npm run preview    # Preview production build
```

---

## Content Workflow

1. Run `npm run dev`
2. Open `http://localhost:4321/keystatic`
3. Edit content and save
4. Changes write to files in `content/` and `public/images/`
5. Commit the changes: `git add . && git commit -m "content update"`
6. The site reflects changes on next page load

> **Important:** Keystatic reads from the git working tree. Always commit content changes so they persist across server restarts and are included in deployments.

---

## Known Gotchas

- **Pin to Astro 5** — Astro 6 broke `@astrojs/svelte`, `@astrojs/node`, `@astrojs/react` compatibility with Keystatic (as of April 2026).
- **Vite cache** — after config changes: `rm -rf node_modules/.vite && npm run dev`
- **WSL2 file watching** — polling watcher is already configured in `astro.config.mjs`
- **`@keystatic/astro` must be excluded from Vite optimization** — already configured
- **React must be first** in integrations array — already ordered correctly

---

## Upgrading to Production (Phase 2)

To enable the Keystatic admin live in production via Vercel:

1. **Install Vercel adapter**
   ```bash
   npm install @astrojs/vercel
   ```

2. **Swap adapter in `astro.config.mjs`**
   ```js
   import vercel from '@astrojs/vercel'
   // replace: adapter: node({ mode: 'standalone' })
   adapter: vercel()
   ```

3. **Switch Keystatic storage in `keystatic.config.ts`**
   ```ts
   storage: {
     kind: 'github',
     repo: 'boroborovski/bankya-site',
   }
   ```

4. **Create a GitHub OAuth App**
   - GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://your-domain.com`
   - Callback URL: `https://your-domain.com/api/keystatic/github/oauth/callback`

5. **Set environment variables in Vercel dashboard**
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=...
   KEYSTATIC_GITHUB_CLIENT_SECRET=...
   KEYSTATIC_SECRET=<any random 32-char string>
   ```

6. Deploy — `/keystatic` admin works in production, saves commit directly to GitHub repo, triggers automatic redeploy.
