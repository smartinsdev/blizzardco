import "server-only";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("The environment variable DATABASE_URL is not set.");
}

// Prisma 7 talks to MySQL through a driver adapter instead of the Rust engine.
const createPrismaClient = () =>
  new PrismaClient({ adapter: new PrismaMariaDb(connectionString) });

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
