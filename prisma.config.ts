import { defineConfig } from "prisma/config";

// Next.js keeps local credentials in `.env.local`, which the Prisma CLI does
// not read on its own. Load it so `prisma migrate`/`db pull` see DATABASE_URL.
if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // No .env.local (e.g. CI): fall back to the ambient environment.
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
