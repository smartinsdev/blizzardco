# Blizzard Conquer

Blizzard Conquer is the web portal for a fantasy MMORPG community. It provides a themed landing page for the game, account registration and login, protected-route session handling, and a download hub for the game client and supporting files.

> **Project status:** The current implementation contains the public landing page, authentication flow, and download page. Navigation entries for Shopping, Wiki, and Support are present in the menu but do not yet have corresponding routes in the repository.

## Features

- **Game landing page** with responsive desktop and mobile layouts, atmospheric backgrounds, custom Google fonts, and a call to action for account registration.
- **Account registration** using username, email, and password validation with Zod and a Prisma-backed MySQL database.
- **Username/password login** with server actions and an HTTP-only JWT session cookie.
- **Route protection** through Next.js middleware:
  - `/` and `/download` are public.
  - `/auth/login` and `/auth/register` are authentication routes.
  - Other matched routes redirect unauthenticated visitors to login.
  - Authenticated visitors are redirected away from authentication pages.
- **Google reCAPTCHA v3 integration** for the registration experience.
- **Download center** with sections for game clients and utility downloads, including Dropbox, Mega, 4shared, patch, and Adobe Flash Player entries.
- **Reusable UI foundation** based on shadcn/ui conventions, Radix primitives, Tailwind CSS, form components, and toast notifications.
- **Game-oriented visual design** with dark mode styling, video backgrounds, responsive layouts, and themed assets.

## Stack

- **Language:** TypeScript, with a small amount of JavaScript configuration
- **Framework / runtime:** Next.js 14.1 with the App Router and React 18
- **Styling:** Tailwind CSS, PostCSS, `tailwindcss-animate`, CSS variables, and custom global styles
- **UI:** shadcn/ui patterns, Radix UI primitives, `class-variance-authority`, `clsx`, and `tailwind-merge`
- **Forms and validation:** React Hook Form, `@hookform/resolvers`, and Zod
- **Authentication:** Custom JWT sessions using `jose`, HTTP-only cookies, and Next.js middleware
- **Database:** MySQL accessed through Prisma ORM (`@prisma/client`)
- **Security / integrations:** Google reCAPTCHA v3
- **Assets and fonts:** Next Image, Next Font, Poppins, Cinzel, Bangers, and MP4 background videos

## Project Structure

```text
.
├── prisma/
│   └── schema.prisma          # MySQL schema for accounts, game data, shop, payments, servers, and rankings
├── public/                    # Background videos and static public assets
├── src/
│   ├── actions/               # Server actions for login, registration, logout, and reCAPTCHA
│   ├── app/                   # Next.js App Router layouts and routes
│   │   ├── auth/login/        # Login page
│   │   ├── auth/register/     # Registration page with reCAPTCHA provider
│   │   ├── download/          # Client and utility download page
│   │   ├── layout.tsx         # Root layout, navigation, fonts, metadata, and toaster
│   │   └── page.tsx           # Public game landing page
│   ├── assets/                # Imported download and UI artwork
│   ├── components/            # Auth, header, form, and reusable UI components
│   ├── hooks/                 # Client hooks such as useSession
│   ├── lib/                   # JWT authentication, Prisma client, constants, and utilities
│   ├── schemas/               # Zod schemas for login, registration, and reCAPTCHA
│   ├── middleware.ts          # Session-aware route protection
│   └── routes.ts              # Public/auth route lists and login redirect configuration
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Scripts and dependencies
├── tailwind.config.ts         # Tailwind theme, colors, animations, and content paths
└── tsconfig.json              # Strict TypeScript configuration with the @/* alias
```

## How It Works

The App Router renders the public landing page and download center, while the root layout adds the shared `NavBar`, Poppins font, dark theme, and toast provider. Authentication forms use React Hook Form and Zod schemas, then call server actions in `src/actions/` to query the `accounts` table through Prisma.

After a successful login, `src/lib/auth.ts` signs a short-lived JWT with `jose` and stores it in an HTTP-only `session` cookie. `src/middleware.ts` reads that session and applies the route rules declared in `src/routes.ts`, redirecting users to login when a protected route is requested.

The Prisma schema maps the existing MySQL game database, including account, arena, clan, server, shop, payment, ranking, and game-event tables. Several legacy tables are marked with `@@ignore` because they do not expose a valid unique identifier for Prisma Client.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (the repository includes `package-lock.json`)
- A MySQL database compatible with `prisma/schema.prisma`
- A Google reCAPTCHA v3 site key if using the registration flow

### Installation

```bash
git clone https://github.com/smartinsdev/blizzardco.git
cd blizzardco
npm install
```

Create a local `.env` file in the project root:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
JWT_SECRET_KEY="replace-with-a-long-random-secret"
NEXT_PUBLIC_RECAPTCHA_KEY="your-recaptcha-v3-site-key"
```

`DATABASE_URL` is required by Prisma, `JWT_SECRET_KEY` is required to create or verify sessions, and `NEXT_PUBLIC_RECAPTCHA_KEY` is used by the Google reCAPTCHA provider. Keep these values private where applicable and do not commit `.env` files.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

The build script generates the Prisma client before creating the Next.js production build.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Generates Prisma Client and builds the application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs the configured Next.js lint command |

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Blizzard Conquer landing page | Public |
| `/download` | Game client and utility downloads | Public |
| `/auth/login` | User login | Unauthenticated users |
| `/auth/register` | Account registration | Unauthenticated users |
| `/shopping` | Planned navigation destination | Not implemented in the current source |
| `/wiki` | Planned navigation destination | Not implemented in the current source |
| `/support` | Planned navigation destination | Not implemented in the current source |

## Notes for Contributors

- Authentication currently compares the submitted password directly with the stored `accounts.password` value. Before using this application in production, introduce a password-hashing strategy and migrate existing credentials safely.
- The session JWT currently uses a short ten-second lifetime and is refreshed by middleware. Review cookie settings, expiration policy, and error handling before production deployment.
- The download page still uses placeholder `#link-do-jogo` anchors. Replace them with real, verified download URLs before publishing the page.
- There is currently no test suite in `package.json`; add coverage for validation, server actions, authentication, and route protection as the project grows.

## License

No license file is currently included in the repository.
