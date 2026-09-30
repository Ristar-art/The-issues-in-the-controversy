# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

- SvelteKit + Vite app created via `sv` (Svelte CLI).
- Tailwind CSS v4 is integrated via the Vite plugin (`@tailwindcss/vite`), not via a standalone `tailwind.config.cjs`.
- The app is a content-heavy site about biblical prophecy with:
  - A single main landing page assembled in `src/routes/+page.svelte`.
  - SEO-focused `<svelte:head>` with extensive meta tags and three JSON-LD blocks.
  - A Strapi-backed search API and a separate filesystem-based article index.
  - A statically defined XML sitemap route.

## Common commands

From the repo root:

- Install dependencies:
  - `npm install`
- Start dev server:
  - `npm run dev`
  - Open browser automatically: `npm run dev -- --open`
- Build production bundle:
  - `npm run build`
- Preview production build locally:
  - `npm run preview`
- Typecheck / Svelte check (one-off):
  - `npm run check`
- Typecheck / Svelte check (watch mode):
  - `npm run check:watch`

There are currently **no test scripts** configured in `package.json`. If you add a test runner (e.g. Vitest/Playwright), also add the corresponding `npm run test` / `npm run test:unit` / `npm run test:e2e` commands here.

## Code structure and architecture

### Tooling and config

- `package.json`
  - Scripts:
    - `dev`: `vite dev`
    - `build`: `vite build`
    - `preview`: `vite preview`
    - `prepare`: `svelte-kit sync || echo ''`
    - `check`: `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`
    - `check:watch`: same as `check` but with `--watch`.
  - Dev dependencies: SvelteKit 2, Svelte 5, Vite 6, TypeScript 5, `@tailwindcss/vite`.
- `svelte.config.js`
  - Uses `adapter-auto` by default. If you deploy to a specific target (e.g. Vercel), you can switch to `@sveltejs/adapter-vercel` here.
  - Defines aliases:
    - `$components`: `src/components` (currently unused; most shared components are under `src/lib/components`).
    - `$lib`: `src/lib` (main shared component library).
    - `$stores`: `src/stores` (not yet present).
    - `$utils`: `src/utils` (not yet present).
    - `$routes`: `src/routes` (used in `+page.svelte`).
- `vite.config.ts`
  - Applies `tailwindcss()` and `sveltekit()` plugins.
  - Tailwind v4 is configured through this plugin-only approach.
- `tsconfig.json`
  - Extends `./.svelte-kit/tsconfig.json` and enables strict TypeScript, JS checking, bundler module resolution, and source maps.

### Routing and layout

- `src/routes/+layout.svelte`
  - Global layout for all routes.
  - Imports `HeaderBar` and `Navigation` from `$lib/components`.
  - Applies global styles from `src/routes/app.css`.
  - Exposes `children` via `$props()` and renders with `{@render children()}` (Svelte 5 runes-style API).
- `src/routes/+page.svelte`
  - Main landing page. Responsible for:
    - SEO and social metadata via `<svelte:head>`.
    - Three JSON-LD blocks (WebSite, WebPage, EducationalOrganization) embedded via `{@html ...}`.
    - Assembling the main sections of the page via component-like routes:
      - `HeroSection`, `KeySections`, `KeyTopics`, `Progress`, `Symbols`, `TheTruth`, `GovernmentSection` under `src/routes/`.
      - Reusable layout components from `$lib/components`: `FooterSection`, `CopyrightBar`, `SearchBar`.
      - `FeaturedVideos` route component.
  - Uses Tailwind via CDN for now (`<link ... tailwind.min.css>`), in addition to Tailwind integration at the Vite level.

### Components and shared UI (`src/lib`)

- `src/lib/index.ts`
  - Currently just a placeholder; export components here for `$lib` consumers if needed.
- `src/lib/components/Navigation.svelte`
  - Top navigation bar with logo image and static links.
  - Uses Tailwind utility classes; logo asset is served from `static/logoimage.jpg`.
- `src/lib/components/SearchBar.svelte`
  - Presentational search input with a `searchTerm` state and `searchResults` array.
  - `search()` function is currently mostly commented out; when enabled it should call `/api/search?q=...` and map the Strapi response to `item.attributes`.
  - This is a **client-side** search trigger; the backend endpoint is defined in `src/routes/api/search/+server.js`.
- `src/lib/components/AboutSection.svelte`
  - Section with an image and some placeholder “business” copy and progress bars.
  - Content is not yet fully aligned with the biblical theme; expect future refactors.

Other visual sections (currently implemented as **route components**, not under `$lib`) live in `src/routes`:

- `HeroSection.svelte`, `KeyTopics.svelte`, `Progress.svelte`, `Symbols.svelte`, `TheTruth.svelte`, `GovernmentSection.svelte`, `KeySections.svelte`, `FeaturedVideos.svelte`.
- These are purely presentational sections structured with Tailwind-like classes and static content; they can be refactored into `$lib/components` if they need to be shared across multiple routes later.

### Search architecture

There are **two different search-related mechanisms** in this repo:

1. **Strapi-powered search API**
   - `src/routes/api/search/+server.js`
     - `GET` handler expects `?q=...` query parameter.
     - If `q` is missing, returns `{ error: 'Search query is required' }` with status `400`.
     - Calls Strapi using environment variables from `$env/static/private`:
       - `STRAPI_API_URL`
       - `STRAPI_API_TOKEN`
     - Uses Strapi filter: `.../api/articles?filters[title][$contains]=${query}`.
     - Returns `json(data)` from the Strapi response; frontends should expect an array of Strapi entities and typically read `item.attributes`.
   - `src/routes/search.json/search/[slug]/+page.svelte`
     - A simple client page that binds `searchTerm`, calls `/api/search`, and renders a list of results linking to `/{result.slug}`.
     - This page expects each result’s `attributes` to contain `slug` and `title`.

2. **Filesystem-based article index**
   - `src/routes/search.json/+server.js`
     - Defines `getPosts()` which uses `import.meta.glob('/src/articles/*.md', { eager: true })` to load markdown files.
     - For each `.md` file, it extracts `metadata` and a derived `slug` (filename without extension) and returns an array of `{ slug, ...metadata }`.
     - `GET` returns `json(posts)`.
   - This can be used to power client-side search/autocomplete over local markdown articles at `/search.json`.

When extending search, be aware of:

- The **Strapi** endpoint (`/api/search`) for remote CMS content.
- The **local markdown** index (`/search.json`) for on-disk articles.
- The `SearchBar.svelte` component is currently wired toward `/api/search`; if you want unified search, you may need to reconcile these two data sources.

### Sitemap generation

- `src/routes/sitemap.xml/+server.js`
  - Async `GET` handler that returns XML sitemap.
  - `baseUrl` comes from `SITE_URL` in `src/lib/seo.js` (set via `VITE_SITE_URL`), not hard-coded.
  - `STATIC_PAGES` lists canonical paths with `changefreq` and `priority`; every entry must resolve to a real route, since a sitemap full of 404s costs crawl budget. `articlePages()` appends published Firestore pages from the `pages` collection.
  - Serializes `<urlset>` manually and returns a `Response` with `Content-Type: application/xml` and `Cache-Control: max-age=3600`.

If you change main routes or add new content sections with dedicated URLs, update `STATIC_PAGES` here to keep the sitemap accurate.

### SEO

- `src/lib/seo.js`
  - Single source of truth: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `DEFAULT_IMAGE` and its dimensions, and `absolute()` for building crawler-safe absolute URLs.
  - Moving to a real domain means setting `VITE_SITE_URL`; nothing else needs editing.
- `src/lib/components/Seo.svelte`
  - The one place the `<head>` tags live. Each public page renders exactly one, supplying its own title/description/image; canonical, Open Graph and Twitter tags are derived.
- `src/routes/robots.txt/+server.js`
  - Served from a route rather than `static/` so the sitemap line follows `SITE_URL`. Disallows `/admin/` and `/login`.

### Static assets

- `static/`
  - Contains all images and public assets (favicon, OG image, etc.). `robots.txt` is deliberately **not** here — it is a route, so it can interpolate `SITE_URL`.
  - Section components reference images like `/thetrhoneroom.jpg`, `/Beast.webp`, `/triquetra-9228907_1280.webp`, `/law-753482_1280.webp`, etc.
  - Meta tags in `+page.svelte` reference `logoimage.jpg` and other icons; ensure corresponding files exist in `static/` when adjusting branding.

## Notes for future changes

- **Environment variables for Strapi**: When editing `src/routes/api/search/+server.js` or adding new CMS-backed endpoints, use `$env/static/private` for secrets and ensure deploy-time configuration provides `STRAPI_API_URL` and `STRAPI_API_TOKEN`.
- **Aliasing consistency**: New shared components should generally be placed under `src/lib/components` and imported via `$lib/components/...` rather than placing many presentational components directly under `src/routes/`.
- **SEO / JSON-LD**: The main page has custom JSON-LD. When altering structure or canonical URLs, double-check that the hard-coded `siteUrl` and `pageUrl` in `+page.svelte` stay in sync with your deployment URL and routing.
