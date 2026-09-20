# Blizzard Conquer

Blizzard Conquer is the web portal for a fantasy MMORPG community. It provides a themed landing page for the game, account registration and login against the existing game database, session-based route protection, and a download hub for the game client and supporting files.

The interface is written in Brazilian Portuguese; the code, comments, and this document are in English.

> **Project status:** The current implementation contains the public landing page, the authentication flow, and the download page. Navigation entries for Shopping, Wiki, and Support are present in the menu but do not yet have corresponding routes.

## Features

- **Game landing page** with separate desktop and mobile layouts, a poster-first background video, custom Google fonts, and a call to action for account registration.
- **Account registration** validated with Zod, protected by reCAPTCHA v3 verified server-side, writing bcrypt-hashed passwords to the `accounts` table.
- **Username/password login** through a Server Action that issues an HTTP-only JWT session cookie.
- **Password migration path**: rows that still hold a legacy plaintext password are compared in constant time, accepted once, and re-hashed in place on that login. Both the "no such user" and the "wrong legacy password" paths burn an equivalent bcrypt comparison so response time does not reveal which usernames exist.
- **Login rate limiting** — 10 attempts per IP per 5 minutes, checked before any hashing work.
- **Server-rendered session**: the header's auth slot is a Server Component behind `<Suspense>`, so the signed-in state arrives in the same response as the page instead of after hydration.
- **Sliding session expiration**: a 7-day cookie re-issued by the proxy once it passes its halfway point, so an active user is never signed out mid-session.
- **Route protection** through `src/proxy.ts`:
  - `/`, `/download`, and `/opengraph-image` are public.
  - `/auth/login` and `/auth/register` redirect visitors who already have a session.
  - Any other matched route redirects anonymous visitors to `/auth/login?callbackUrl=…`, and that value is narrowed to a same-origin path before anything navigates to it.
- **SEO surface**: per-page metadata with a title template, `robots.ts`, `sitemap.ts`, and a generated Open Graph card.
- **Error handling**: route-level `error.tsx`, a `global-error.tsx` that catches failures in the root layout itself, and a themed `not-found.tsx`.
- **Download center** with sections for game clients (Dropbox, Mega, 4shared) and utilities (patch, Adobe Flash Player).
- **Reusable UI foundation** based on shadcn/ui conventions, Radix primitives, Tailwind CSS v4, and Sonner toasts.

## Stack

- **Language:** TypeScript 7 (strict), with `.mjs` configuration files
- **Framework / runtime:** Next.js 16.3 with the App Router and React 19.3
- **Styling:** Tailwind CSS v4 in its CSS-first setup — no `tailwind.config.ts`; the theme lives in `src/app/globals.css`
- **UI:** shadcn/ui patterns, Radix UI primitives, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, Sonner
- **Forms and validation:** React Hook Form, `@hookform/resolvers`, and Zod 4
- **Authentication:** custom JWT sessions using `jose`, HTTP-only cookies, bcrypt password hashing, and route protection in `proxy.ts`
- **Database:** MySQL/MariaDB through Prisma 7, using the `@prisma/adapter-mariadb` driver adapter
- **Tooling:** Biome for linting and formatting, pnpm for package management
- **Integrations:** Google reCAPTCHA v3
- **Assets and fonts:** Next Image, Next Font (Poppins, Cinzel, Bangers), and an MP4 background video with a WebP poster

## Project Structure

```text
.
├── prisma/
│   ├── migrations/            # 0_init (baseline of the existing game DB) + schema changes
│   └── schema.prisma          # MySQL schema for accounts, game data, shop, payments, servers, and rankings
├── public/                    # Background video, poster image, and static assets
├── src/
│   ├── actions/               # Server actions: login, register, logout
│   ├── app/                   # App Router routes and file conventions
│   │   ├── auth/login/        # Login page (reads ?callbackUrl behind Suspense)
│   │   ├── auth/register/     # Registration page with the reCAPTCHA provider
│   │   ├── download/          # Client and utility download page
│   │   ├── error.tsx          # Route-level error boundary
│   │   ├── global-error.tsx   # Catches failures in the root layout itself
│   │   ├── not-found.tsx      # 404 page
│   │   ├── opengraph-image.tsx# Generated social card
│   │   ├── robots.ts          # robots.txt
│   │   ├── sitemap.ts         # sitemap.xml
│   │   ├── globals.css        # Tailwind v4 entry point and theme tokens
│   │   ├── layout.tsx         # Root layout, NavBar, fonts, metadata, toaster
│   │   └── page.tsx           # Public game landing page
│   ├── assets/                # Imported download and UI artwork
│   ├── components/            # auth/, header/, and ui/ (shadcn) components
│   ├── generated/prisma/      # Generated Prisma Client (git-ignored)
│   ├── lib/                   # auth, password, prisma, rate-limit, recaptcha, fonts, constants, utils
│   ├── schemas/               # Zod schemas for login, registration, and reCAPTCHA
│   ├── proxy.ts               # Session-aware route protection (formerly middleware.ts)
│   └── routes.ts              # Route lists, default redirect, callbackUrl sanitizer
├── biome.json                 # Lint and format configuration
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # cacheComponents and package-import optimization
├── prisma.config.ts           # Prisma CLI config; loads .env.local
└── tsconfig.json              # Strict TypeScript with the @/* alias
```

## How It Works

### Rendering

`next.config.mjs` enables `cacheComponents`, so a route keeps a prerendered static shell even when part of it reads the request. Anything request-bound — the header's session slot, the login page's `searchParams` — sits behind a `<Suspense>` boundary and streams in around that shell.

### Authentication

Forms use React Hook Form with the Zod schemas in `src/schemas/`, then call a Server Action in `src/actions/`. `login` re-validates the input, applies the IP rate limit, looks the account up through Prisma, and verifies the password with bcrypt. `src/lib/auth.ts` signs the session with `jose` and stores it in an HTTP-only `session` cookie whose lifetime and JWT `exp` claim come from the same constant.

Server Components read the session through `getCurrentUser()`, which is wrapped in React's `cache()` so several components in one render share a single cookie read and signature verification. `src/proxy.ts` runs outside the render pipeline and reads the cookie straight off the request instead.

### Database

The Prisma schema maps the pre-existing MySQL game database — account, arena, clan, server, shop, payment, ranking, and game-event tables. Several legacy tables are marked `@@ignore` because they expose no valid unique identifier. Prisma 7 reaches the database through the MariaDB driver adapter rather than the old Rust query engine, and the client is generated into `src/generated/prisma/` (git-ignored, regenerated by `postinstall` and `build`).

`prisma/migrations/0_init` is a baseline of the existing database rather than a schema this project created.

## Getting Started

### Prerequisites

- Node.js 20.19+, 22.12+, or 24+ (Prisma 7's floor; Next 16 itself needs 20.9+)
- pnpm 10 or newer
- A MySQL or MariaDB database matching `prisma/schema.prisma`
- Google reCAPTCHA v3 site and secret keys for the registration flow

### Installation

```bash
git clone https://github.com/smartinsdev/blizzardco.git
cd blizzardco
pnpm install
```

`postinstall` generates the Prisma Client, so `src/generated/prisma/` appears after the install.

### Environment

Create `.env.local` in the project root:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
JWT_SECRET_KEY="replace-with-a-long-random-secret"
NEXT_PUBLIC_RECAPTCHA_KEY="your-recaptcha-v3-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-v3-secret-key"
NEXT_PUBLIC_SITE_URL="https://your-domain.example"
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma connection string; the app throws at startup without it |
| `JWT_SECRET_KEY` | Yes | Signs and verifies session cookies; throws when missing or empty |
| `NEXT_PUBLIC_RECAPTCHA_KEY` | Registration | reCAPTCHA v3 site key, used in the browser |
| `RECAPTCHA_SECRET_KEY` | Registration | Server-side key; without it captcha verification always fails, which blocks registration |
| `NEXT_PUBLIC_SITE_URL` | Deploys | Absolute origin for metadata, the sitemap, and robots.txt; falls back to `http://localhost:3000` |

`prisma.config.ts` loads `.env.local` explicitly, so the Prisma CLI sees `DATABASE_URL` without a separate `.env`. Never commit these files.

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
pnpm build
pnpm start
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server |
| `pnpm build` | Generates Prisma Client, then builds the application |
| `pnpm start` | Starts the production server |
| `pnpm lint` | Runs Biome's lint and format checks |
| `pnpm lint:fix` | Applies Biome's safe fixes |
| `pnpm format` | Formats the codebase with Biome |

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Blizzard Conquer landing page | Public |
| `/download` | Game client and utility downloads | Public |
| `/auth/login` | User login | Redirects signed-in users to `/` |
| `/auth/register` | Account registration | Redirects signed-in users to `/` |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Generated metadata routes | Public |
| `/shopping`, `/wiki`, `/support` | Planned navigation destinations | Not implemented |

Because there are no protected routes yet, the proxy's redirect-to-login branch only fires for paths that do not exist — it is in place for the sections still to be built.

## Agent Tooling

`AGENTS.md` (re-exported by `CLAUDE.md`) carries instructions for AI coding agents, chiefly that this Next.js version differs from what a model is likely to have memorized and that the bundled docs under `node_modules/next/dist/docs/` are the source of truth. `.agents/skills/` holds pinned skills tracked by `skills-lock.json`; the `.claude/` symlinks into it are git-ignored.

## Notes for Contributors

- **Rate limiting is per process.** `src/lib/rate-limit.ts` keeps fixed-window counters in memory, so behind more than one instance each gets its own counters. Move it to a shared store (Redis) before scaling out.
- **`x-forwarded-for` is trusted.** `clientIp()` assumes a proxy that overwrites that header. It is a throttling key, never identity.
- **Legacy passwords still exist.** Any `accounts` row written outside this app may hold plaintext; it is upgraded to bcrypt on that account's next successful login. Do not remove that branch until the column has been fully migrated.
- **The download links are placeholders.** Every `href` on `/download` is still `#link-do-jogo`. Replace them with real, verified URLs before publishing the page.
- **There is no test suite.** Add coverage for the Zod schemas, the server actions, session handling, and the proxy's route rules as the project grows.

## License

No license file is currently included in the repository.
