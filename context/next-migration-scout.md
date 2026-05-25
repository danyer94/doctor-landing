# Code Context

## Files Retrieved

1. `package.json` (lines 1-45) - npm/Vite scripts and current runtime/dev dependencies.
2. `package-lock.json` (lines 1-40) - confirms npm lockfile v3 and mirrors top-level dependency set.
3. `vite.config.ts` (lines 1-20) - Vite React plugin, inline PostCSS setup, dev port 5174.
4. `tsconfig.json` (lines 1-33) - strict TypeScript, bundler resolution, `@/* -> src/*` alias.
5. `tsconfig.node.json` (lines 1-10) - Vite config TS reference only.
6. `tailwind.config.js` (lines 1-122) - Tailwind content globs, custom theme tokens, plugins.
7. `postcss.config.js` (lines 1-6) - Tailwind + autoprefixer PostCSS config.
8. `eslint.config.js` (lines 1-33) - Vite-era flat ESLint config; only targets JS/JSX despite TS scripts.
9. `index.html` (lines 1-20) - root HTML shell, Spanish lang, metadata, Google fonts, Vite mount point.
10. `src/main.tsx` (lines 1-10) - Vite ReactDOM entry importing global CSS.
11. `src/App.tsx` (lines 1-30) - single-page component composition.
12. `src/styles/index.css` (lines 1-127) - Tailwind directives, global base styles, reusable component classes/utilities.
13. `src/styles/Stripe.css` (lines 1-264) - standalone CSS for the Stripe pricing/subscription UI.
14. `src/components/Navbar.tsx` (lines 1-123) - fixed nav, mobile menu state, scroll listener, anchor navigation.
15. `src/components/Hero.tsx` (lines 1-158) - hero section with Framer Motion and remote Unsplash image.
16. `src/components/About.tsx` (lines 1-101) - about section and local media image reference.
17. `src/components/Services.tsx` (lines 1-229) - service cards and feature blocks with Framer Motion.
18. `src/components/Stripe.tsx` (lines 1-226) - client Stripe pricing UI, checkout fetch, success/cancel query handling.
19. `src/components/Transformations.tsx` (lines 1-169) - transformation cards and remote Unsplash images.
20. `src/components/Testimonials.tsx` (lines 1-194) - testimonial cards and remote Unsplash images.
21. `src/components/Contact.tsx` (lines 1-278) - contact info/social links and non-submitting contact form.
22. `src/components/Footer.tsx` (lines 1-194) - footer link groups/social links.
23. `server.js` (lines 1-174) - Express/Stripe backend for checkout, portal, and webhook endpoints.
24. `.gitignore` (lines 1-29) - ignores `.env`, `node_modules`, build outputs, Pi state.
25. `.env` (keys only, no values read into report) - contains `STRIPE_SECRET` and `FRONT_DOMAIN`.
26. Asset paths from `public/` and `media/` - `public/vite.svg`, `media/logo.jpeg`, `media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg`, `media/images/WhatsApp Image 2025-04-06 at 10.28.58 PM.jpeg`.

## Current stack/deps

- App type: Vite 5 + React 18 + TypeScript single-page landing page.
- Package manager: npm (`package-lock.json` lockfileVersion 3).
- Scripts from `package.json` lines 6-10:
  - `dev`: `vite`
  - `build`: `tsc && vite build`
  - `lint`: `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`
  - `preview`: `vite preview`
- Runtime deps from `package.json` lines 12-24:
  - Used in current source: `framer-motion`, `react-icons`, `stripe` (server), `express`/`cors`/`dotenv` (server), `react`, `react-dom`.
  - Present but not found in current `src` imports/config: `@headlessui/react`, `aos`, `react-intersection-observer`, `tailwindcss-gradients`.
- Dev deps from `package.json` lines 26-43:
  - Vite-only: `@vitejs/plugin-react`, `vite`.
  - Tailwind/PostCSS: `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/typography`, `@tailwindcss/forms`, `@tailwindcss/aspect-ratio`.
  - TS/ESLint: `typescript`, `@typescript-eslint/*`, `eslint`, React hook/refresh plugins.

## Key Code

### Vite entry and single-page composition

`src/main.tsx` lines 1-10 is only a Vite boot file:

```tsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

In Next.js, do not migrate this file. Global CSS should be imported by `src/app/layout.tsx`.

`src/App.tsx` lines 12-26 is the whole landing page tree:

```tsx
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stripe />
        <About />
        <Services />
        <Transformations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
```

This maps directly to `src/app/page.tsx` or to a client component such as `src/components/LandingPage.tsx` rendered by `src/app/page.tsx`.

### HTML metadata/fonts

`index.html` lines 2-14 currently owns language, fonts, and SEO metadata:

```html
<html lang="es" class="scroll-smooth">
<title>Dr. Khristian González - Nutricionista</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
<meta name="description" content="Dr. Khristian González - Nutricionista especializado en pérdida de peso y nutrición deportiva..." />
<meta property="og:title" content="Dr. Khristian González - Nutricionista" />
<meta property="og:description" content="Especialista en nutrición deportiva y pérdida de peso..." />
```

Move this into `src/app/layout.tsx` via `metadata`, `<html lang="es" className="scroll-smooth">`, and preferably `next/font/google` for `Inter` and `Lexend` instead of raw `<link>` tags.

### Tailwind/custom CSS

`tailwind.config.js` lines 3-5 currently scans Vite paths:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

For a Next app with `src/app`, change this to include at least:

```js
"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
"./src/components/**/*.{js,ts,jsx,tsx,mdx}"
```

Keep the theme extensions from `tailwind.config.js` lines 7-115 and plugins from lines 117-121.

`src/styles/index.css` lines 1-127 should become/merge into `src/app/globals.css`. It defines project classes used across the components, especially:

- `.section-padding` and `.container-custom` (`src/styles/index.css` lines 24-31)
- button utilities (`src/styles/index.css` lines 33-50)
- `.glass-effect`, `.text-gradient`, scrollbar styling (`src/styles/index.css` lines 61-127)

`src/styles/Stripe.css` lines 1-264 is imported by `src/components/Stripe.tsx` line 2. It can stay as `src/styles/Stripe.css` if the component import path remains valid, or be folded into globals.

### Client-only components in Next App Router

These files need a client boundary (`'use client'`) because they use hooks, browser APIs, event handlers, or Framer Motion:

- `src/components/Navbar.tsx` lines 1-16 uses `useState`, `useEffect`, and `window` scroll listener; lines 72-109 use click handlers.
- `src/components/Stripe.tsx` lines 1, 99-133, 194-211 uses `useState`, `useEffect`, `fetch`, `window.location`, `URLSearchParams`.
- `src/components/Hero.tsx` lines 3 and 44-151 use `framer-motion`.
- `src/components/Services.tsx` lines 3 and 77-223 use `framer-motion`.
- `src/components/Transformations.tsx` lines 2 and 60-163 use `framer-motion`.
- `src/components/Testimonials.tsx` lines 2 and 70-188 use `framer-motion`.
- `src/components/Contact.tsx` lines 2 and 78-271 use `framer-motion` and a submit handler.
- `src/components/Footer.tsx` lines 2 and 77-188 use `framer-motion`; it also uses `new Date()` at line 174, which can cause hydration/timezone drift if rendered server-side.

Simplest safe migration: create a client `LandingPage` component containing the current `App.tsx` tree and mark all imported motion/hook components with `'use client'`. More optimized migration: keep `src/app/page.tsx` as a Server Component and only mark the individual interactive/motion components as client.

### Stripe/payment flow

`src/components/Stripe.tsx` lines 14-59 defines three plans with lookup keys:

- `basic_monthly`
- `pro_monthly`
- `enterprise_monthly`

The client currently hardcodes a separate local backend:

```tsx
// src/components/Stripe.tsx lines 110-126
const response = await fetch('http://localhost:4242/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lookup_key }),
});
window.location.href = url;
```

```tsx
// src/components/Stripe.tsx lines 173-179
<form action="http://localhost:4242/create-portal-session" method="POST">
  <input type="hidden" id="session-id" name="session_id" value={sessionId || ''} />
```

For Next, change these to same-origin route handlers, for example `/api/create-checkout-session` and `/api/create-portal-session`.

`server.js` line ranges to migrate:

- Env setup: `server.js` lines 7-8 uses `STRIPE_SECRET` and `FRONT_DOMAIN`.
- Product lookup/creation: `server.js` lines 14-66.
- Checkout route: `server.js` lines 75-107.
- Billing portal route: `server.js` lines 109-124.
- Webhook route: `server.js` lines 126-169.
- Standalone server start: `server.js` lines 171-174; this does not map to serverless Next and should be removed/replaced by route handlers.

Important server caveats:

1. Do not expose `STRIPE_SECRET` to the browser. Keep it only in Next server route handlers.
2. `FRONT_DOMAIN` is currently used for success/cancel/return URLs (`server.js` lines 98-99 and 116). In Next/Vercel, either keep `FRONT_DOMAIN` in `.env.local` or compute the origin from request headers.
3. `server.js` hardcodes a webhook secret (`server.js` line 131: `whsec_12345`). Move this to `STRIPE_WEBHOOK_SECRET`.
4. Current Express middleware parses JSON before the webhook route (`server.js` lines 72-73 before lines 126-169). Stripe webhooks require the raw body; implement the Next webhook route with `await request.text()` or `arrayBuffer()` and `stripe.webhooks.constructEvent`.
5. `ensureProductsAndPrices()` runs on startup and checkout (`server.js` lines 77-78 and 171-172). In serverless Next this startup side effect is not reliable. Prefer pre-created Stripe products/prices and store lookup keys or price IDs in env/config. If preserving current behavior, call it only inside the checkout route and handle concurrency/race risks.
6. CORS from `server.js` lines 68-70 is unnecessary if the frontend uses same-origin Next API routes.

## Source files and asset paths to migrate

### Source files

Recommended target layout under `doctor-landing-nextjs`:

```text
doctor-landing-nextjs/
  src/
    app/
      layout.tsx            # replaces index.html metadata/html shell
      page.tsx              # renders landing page
      globals.css           # merge from src/styles/index.css
      api/
        create-checkout-session/route.ts
        create-portal-session/route.ts
        webhook/route.ts
    components/
      Navbar.tsx
      Hero.tsx
      About.tsx
      Services.tsx
      Stripe.tsx
      Transformations.tsx
      Testimonials.tsx
      Contact.tsx
      Footer.tsx
    styles/
      Stripe.css            # optional; or merge into globals.css
    lib/
      stripe.ts             # optional shared Stripe server helper
```

Migrate/copy:

- `src/components/*.tsx` -> `doctor-landing-nextjs/src/components/*.tsx`
- `src/styles/index.css` -> merge into `doctor-landing-nextjs/src/app/globals.css`
- `src/styles/Stripe.css` -> `doctor-landing-nextjs/src/styles/Stripe.css` if retaining `import '../styles/Stripe.css'` from `Stripe.tsx`
- `tailwind.config.js` -> copy theme/plugins into the Next Tailwind config and update content globs
- `postcss.config.js` -> Next-compatible as-is if the generated app uses Tailwind v3/PostCSS style config
- `index.html` metadata -> `src/app/layout.tsx`
- `server.js` routes -> Next route handlers under `src/app/api/*/route.ts`

Do not migrate:

- `src/main.tsx` (Vite-only ReactDOM mount)
- `vite.config.ts`
- `tsconfig.node.json`
- `index.html` as a file
- `public/vite.svg` unless intentionally keeping the Vite favicon/template artifact
- `dist/`, `node_modules/`, `.atl/`, `.pi/`

### Assets

Current static assets found:

```text
public/vite.svg                                            # 4 KB, referenced by index.html line 5; likely template artifact
media/logo.jpeg                                            # 1024x1024, ~300 KB, not referenced in current source
media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg # 959x960, ~44 KB, referenced by About.tsx lines 46-49
media/images/WhatsApp Image 2025-04-06 at 10.28.58 PM.jpeg # 709x709, ~36 KB, not referenced in current source
```

In Next, assets must be inside the target app's `public/` directory to be referenced by URL. Recommended copy target:

```text
doctor-landing-nextjs/public/media/logo.jpeg
doctor-landing-nextjs/public/media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg
doctor-landing-nextjs/public/media/images/WhatsApp Image 2025-04-06 at 10.28.58 PM.jpeg
```

Then fix the local image string in `src/components/About.tsx` lines 46-49 from the current backslash-relative path:

```tsx
src="media\images\WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg"
```

to a public-root, forward-slash path:

```tsx
src="/media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg"
```

For a cleaner migration, rename image files to URL-safe slugs (example: `/media/images/khristian-portrait-1.jpeg`) and update references. If using `next/image`, either import local images or configure dimensions; for remote Unsplash images, add `images.unsplash.com` to `next.config.*` `images.remotePatterns`.

Remote images currently used:

- `src/components/Hero.tsx` lines 110-113: one Unsplash image.
- `src/components/Transformations.tsx` lines 10-29 and 105-117: six Unsplash before/after images.
- `src/components/Testimonials.tsx` lines 19, 27, 35 and 135-138: three Unsplash avatars.

## Architecture

Current data/render flow:

1. Vite loads `index.html` and mounts React into `#root` via `src/main.tsx` lines 1-10.
2. `src/App.tsx` lines 12-26 renders one route/page composed of section components.
3. Navigation is anchor-only (`#about`, `#services`, `#transformations`, `#testimonials`, `#contact`); there is no React Router and no file-based routing.
4. Styling is mixed:
   - Tailwind utility classes in components.
   - Shared Tailwind component classes from `src/styles/index.css`.
   - Plain CSS module-like global classes for the Stripe section from `src/styles/Stripe.css`.
5. Animations are mostly Framer Motion viewport animations, meaning most visual sections need client-side execution in Next App Router.
6. Stripe checkout is split from the SPA:
   - Frontend `Stripe.tsx` sends POSTs to `http://localhost:4242`.
   - `server.js` runs an Express backend on port 4242 and talks to Stripe using server env vars.
   - Success/cancel return to `FRONT_DOMAIN` with query params read by `Stripe.tsx` lines 199-210.

Routing/app entry implications for Next:

- Target app likely only needs one route: `/` via `src/app/page.tsx`.
- The current `App.tsx` can become `LandingPage.tsx`; `page.tsx` can render `<LandingPage />`.
- `src/app/layout.tsx` replaces `index.html` and should set `lang="es"`, global fonts/classes, and metadata.
- `src/main.tsx` and `ReactDOM.createRoot` disappear.
- Add `id="hero"` during migration if preserving the Navbar `href="#hero"` from `src/components/Navbar.tsx` lines 18-23; current `Hero` section lacks `id="hero"` (`src/components/Hero.tsx` line 35).
- Footer link `#blog` has no corresponding section (`src/components/Footer.tsx` line 37); legal links are placeholders (`src/components/Footer.tsx` lines 40-43).
- Contact form does not submit anywhere; it prevents default (`src/components/Contact.tsx` lines 191-194). Do not assume it sends email/leads unless you add a new API.

## Exact recommended migration steps

1. From the parent directory, scaffold the target Next project:

   ```bash
   cd "D:/Personal/Trabajo/Con Khristian/Landing-Page"
   npx create-next-app@latest doctor-landing-nextjs --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
   ```

2. Install only deps needed by the migrated app:

   ```bash
   cd doctor-landing-nextjs
   npm install framer-motion react-icons stripe
   npm install -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
   ```

   Do not install Vite packages. Defer `@headlessui/react`, `aos`, `react-intersection-observer`, and `tailwindcss-gradients` unless a later implementation actually uses them.

3. Copy source components/styles:

   ```bash
   mkdir -p src/components src/styles
   cp ../doctor-landing/src/components/*.tsx src/components/
   cp ../doctor-landing/src/styles/Stripe.css src/styles/Stripe.css
   ```

   Merge `../doctor-landing/src/styles/index.css` into `src/app/globals.css` instead of replacing the generated file blindly.

4. Create `src/components/LandingPage.tsx` from `src/App.tsx` lines 1-30, or move the tree into `src/app/page.tsx`. Recommended structure:

   - `src/app/page.tsx` remains minimal and renders `<LandingPage />`.
   - `src/components/LandingPage.tsx` contains the current `App.tsx` section order.

5. Add client boundaries:

   - Put `'use client'` at the top of `LandingPage.tsx` for the fastest low-risk migration, or at least at the top of each component listed in “Client-only components in Next App Router”.
   - If optimizing later, move static sections back to Server Components only after verifying Framer Motion/client dependencies.

6. Move metadata/fonts:

   - Convert `index.html` lines 2-14 into `src/app/layout.tsx` metadata.
   - Use `next/font/google` for `Inter` and `Lexend`.
   - Ensure `<html lang="es" className="scroll-smooth">` matches the old shell.
   - Replace the Vite favicon (`index.html` line 5) with a real asset if available, probably `media/logo.jpeg` after copying to `public/`.

7. Port Tailwind config:

   - Copy `theme.extend` from `tailwind.config.js` lines 7-115.
   - Copy plugins from lines 117-121.
   - Update content globs from lines 3-5 to Next paths:

     ```js
     content: [
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     ]
     ```

8. Copy static assets into the new app's `public/`:

   ```bash
   mkdir -p public/media/images
   cp ../doctor-landing/media/logo.jpeg public/media/logo.jpeg
   cp "../doctor-landing/media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg" "public/media/images/WhatsApp Image 2025-04-06 at 10.28.31 PM.jpeg"
   cp "../doctor-landing/media/images/WhatsApp Image 2025-04-06 at 10.28.58 PM.jpeg" "public/media/images/WhatsApp Image 2025-04-06 at 10.28.58 PM.jpeg"
   ```

   Then update `About.tsx` lines 46-49 to use a `/media/...` URL with forward slashes.

9. Replace the Express backend with Next API route handlers:

   - `server.js` lines 75-107 -> `src/app/api/create-checkout-session/route.ts`
   - `server.js` lines 109-124 -> `src/app/api/create-portal-session/route.ts`
   - `server.js` lines 126-169 -> `src/app/api/webhook/route.ts`
   - Optional shared helper: `src/lib/stripe.ts` for Stripe initialization and product/price lookup.

10. Update `src/components/Stripe.tsx`:

    - Replace line 110 URL with `/api/create-checkout-session`.
    - Replace line 173 form action with `/api/create-portal-session` or submit via fetch.
    - Keep success/cancel query handling from lines 199-210, or migrate to `useSearchParams` inside a client component.

11. Create `doctor-landing-nextjs/.env.local` with server-only values:

    ```env
    STRIPE_SECRET=...
    FRONT_DOMAIN=http://localhost:3000
    STRIPE_WEBHOOK_SECRET=...
    ```

    Do not prefix `STRIPE_SECRET` with `NEXT_PUBLIC_`. For Vercel/production, set these in project environment variables and update `FRONT_DOMAIN` to the deployed domain.

12. Remove/avoid Vite-only artifacts in the Next project:

    - no `vite.config.ts`
    - no `src/main.tsx`
    - no `index.html`
    - no Vite scripts
    - no `@vitejs/plugin-react`/`vite` deps

13. Verify locally:

    ```bash
    npm run lint
    npm run build
    npm run dev
    ```

    Exercise `/`, anchor links, mobile nav, `/api/create-checkout-session`, checkout success/cancel query params, and billing portal flow.

14. Optional cleanup after green build:

    - Rename media files with spaces to slugs and update references.
    - Replace `<img>` with `next/image` where beneficial; configure Unsplash remote patterns first.
    - Replace placeholder contact/social values (`Contact.tsx` lines 28-68, `Navbar.tsx` line 60, `Footer.tsx` lines 47-71) with real values.
    - Decide whether Stripe pricing belongs in this landing page; currently it appears between Hero and About (`src/App.tsx` lines 17-19).

## Risks and open questions

- Most components are client-heavy because of Framer Motion; this limits Next server-rendering benefits until refactored.
- Stripe webhook handling must be fixed during migration because raw body verification is sensitive.
- The current `server.js` dynamic product/price creation is not ideal for serverless deployments.
- Current asset reference in `About.tsx` uses backslashes and root `media/`; it must be corrected for Next public serving.
- `eslint.config.js` imports `globals` but `globals` is not a direct dependency in `package.json`; use the generated Next ESLint setup instead of carrying this over.
- The contact form is UI-only; no backend lead submission exists.
- Engram save was requested if available, but this subagent toolset exposes no Engram/memory save tool.

## Start Here

Open `src/App.tsx` first. It shows the complete landing page composition and the only app route to recreate in Next. Then open `src/components/Stripe.tsx` and `server.js` together because they are the only true frontend/server integration that needs architectural migration.

## Supervisor coordination

No supervisor decision was needed. Skills loaded before inspection: `vercel-react-best-practices`, `react-doctor`, and `tailwind-patterns`.
