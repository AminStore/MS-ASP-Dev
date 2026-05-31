
# Bilingual Editorial Portfolio

A bilingual (English / Arabic with full RTL), light/dark themed personal portfolio built on the project's existing stack (TanStack Start + React 19 + TypeScript + Tailwind v4 + shadcn). Design direction: **Paper & Ink** editorial minimal — off-white `#f5f3ee` background, rich black ink, **Instrument Serif** display + **Work Sans** body, with **Tajawal** for Arabic.

## Stack adjustments vs. your brief

The repo is already TanStack Start (not Next.js / Vite-only). I'll keep that and adapt the stack to fit:

- Routing: TanStack Router (file-based) — equivalent to App Router for our needs.
- i18n: lightweight custom store (Zustand) + JSON dictionaries. `react-i18next` works but adds weight we don't need for one-person content; happy to swap if you prefer.
- State: **Zustand** for `theme` + `locale` (persisted to localStorage, SSR-safe).
- Animation: **Framer Motion** for section reveals + micro-interactions.
- 3D hero: **@react-three/fiber + drei** — subtle paper-grain / ink-particle field, lazy-loaded and disabled on `prefers-reduced-motion` / mobile.
- Forms: **react-hook-form + zod**.
- Icons: **lucide-react** (already common).
- Content: realistic placeholder content ("Your Name", sample projects) — easy to edit in one `content.ts` per locale.

## Sections

Single-page scroll with anchor nav + a separate `/projects/$slug` route for project detail (good for SEO + share previews).

1. Hero — name, role, tagline, CTA, 3D ink-particle backdrop
2. About — short bio + portrait
3. Skills — grouped tag clusters (no progress bars — fits editorial tone better; will mention but default to tags)
4. Projects — filterable grid; click → detail route
5. Experience — vertical timeline
6. Education — compact list
7. Contact — RHF + zod form (submits to a server function that just logs / returns ok for now)
8. Footer — socials, locale + theme toggles repeated

Header: logo mark, anchor nav, **Theme toggle**, **EN / ع toggle**, Resume download.

## Bilingual + RTL

- `<html lang>` and `dir` are set per render from the locale store via root route `head()`.
- Tailwind v4 logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`) used everywhere — no `left/right`.
- Font stack swaps automatically: `font-serif` (Instrument Serif) for EN headings; `font-arabic` (Tajawal) for AR headings + body.
- Translation file shape: `src/i18n/{en,ar}.ts` typed as `Dictionary`; `useT()` hook reads from store. Switching is instant (no route change, no flash).
- All copy, aria-labels, form messages, and meta tags translated.

## Theme

- `class="dark"` toggled on `<html>`.
- Initial value resolved in an inline script in the shell (`__root.tsx`) before hydration to prevent FOUC.
- Persisted to localStorage; respects `prefers-color-scheme` on first visit.

## Design tokens (`src/styles.css`)

Overwrite the default token set with Paper & Ink in oklch:

- Light: bg `#f5f3ee`, surface `#e8e4dd`, fg `#0d0d0d`, muted-fg `#2d2d2d`, accent ink `#0d0d0d`.
- Dark: bg `#0d0d0d`, surface `#1a1a1a`, fg `#f5f3ee`, muted-fg `#bdb7ad`, accent paper `#f5f3ee`.
- Radius `0.5rem` (slightly softer than default for editorial feel — sharp corners on primary blocks, soft on chips).
- Add: `--font-serif`, `--font-sans`, `--font-arabic`; load Instrument Serif + Work Sans + Tajawal via Google Fonts in root `head()`.

## Performance / a11y / SEO

- Lazy-load `Projects` filter logic and the 3D canvas with `React.lazy` + Suspense skeleton.
- `prefers-reduced-motion` short-circuits Framer Motion + 3D scene.
- `<main>` once in `__root.tsx` wrapping `<Outlet/>`; one `<h1>` per page.
- Per-route `head()` meta (title, description, og:title, og:description, og:url, canonical on leaves).
- JSON-LD `Person` on home, `CreativeWork` on project detail.
- Images: stored under `src/assets/` and imported; `<img>` with explicit width/height + `loading="lazy"`.
- shadcn primitives used for Dialog (project modal alternative), DropdownMenu (lang/theme), Form, Input, Textarea, Button — ARIA handled.

## File structure

```text
src/
  components/
    layout/         Header, Footer, ThemeToggle, LocaleToggle
    sections/       Hero, About, Skills, Projects, Experience, Education, Contact
    three/          InkParticles.tsx (lazy)
    ui/             (shadcn, existing)
  i18n/
    en.ts  ar.ts  types.ts  useT.ts
  store/
    theme.ts  locale.ts
  content/
    projects.ts  experience.ts  education.ts  skills.ts
  hooks/
    use-reduced-motion.ts
  lib/
    contact.functions.ts  (server fn: validate + log)
  routes/
    __root.tsx       (updated: <html dir/lang>, fonts, theme bootstrap, <main>, <Outlet/>)
    index.tsx        (composes all sections)
    projects.$slug.tsx
  styles.css         (Paper & Ink tokens, fonts, rtl helpers)
public/
  resume.pdf         (placeholder file you can replace)
```

## Build order

1. Tokens + fonts in `styles.css`; update `__root.tsx` (theme bootstrap script, `<main>`, fonts, locale-driven `lang`/`dir`).
2. Zustand `theme` + `locale` stores + `useT` hook + EN/AR dictionaries.
3. Header (nav + toggles + resume) and Footer.
4. Sections in order: Hero (without 3D), About, Skills, Experience, Education, Contact, Projects grid.
5. Project detail route + JSON-LD.
6. Lazy 3D ink-particle backdrop into Hero.
7. SEO meta per route + placeholder `public/resume.pdf`.
8. QA pass: tab through, toggle theme, toggle locale, verify RTL flips, reduced-motion path, mobile layout.

## Open questions (not blockers — defaults shown)

- Skills rendering: **tag clusters** (default) vs progress bars. Editorial tone favors tags; say the word and I'll switch.
- Projects interaction: **separate detail route** (better SEO, default) vs modal-only. Going with route.
- Contact form: stores submissions where? Default is **server function that returns ok and logs** (no DB). Wire to email/DB later if you enable Lovable Cloud.

Reply "go" to build, or tell me what to change.
