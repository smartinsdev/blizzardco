import "server-only";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { cache } from "react";
import {
  getJwtSecretKey,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  SESSION_RENEW_AFTER_SECONDS,
} from "./constants";

const key = new TextEncoder().encode(getJwtSecretKey());

export type SessionUser = {
  username: string;
  email: string | null;
};

export type Session = JWTPayload & {
  user: SessionUser;
};

function nextExpiry() {
  return new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
}

function cookieOptions(expires: Date) {
  return {
    expires,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  } as const;
}

export async function encrypt(payload: JWTPayload, expires: Date) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expires.getTime() / 1000))
    .sign(key);
}

export async function decrypt(input: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify<Session>(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    // Expired, tampered with, or signed by a previous secret. Callers only care
    // that there is no usable session, and throwing here would 500 every route.
    return null;
  }
}

/** Issues the session cookie. Only callable from a Server Action / Route Handler. */
export async function createSession(user: SessionUser) {
  const expires = nextExpiry();
  const token = await encrypt({ user }, expires);
  (await cookies()).set(SESSION_COOKIE_NAME, token, cookieOptions(expires));
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

/**
 * Reads the session from the ambient request (Server Components, Actions, Route
 * Handlers). Wrapped in `cache()` so several components in the same render
 * share one cookie read and one signature verification.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await decrypt(token);
});

/**
 * The narrow user shape the UI is allowed to see. Callers that only need to
 * know "who is signed in" use this instead of the raw session payload.
 *
 * This reads the request, so it can never be part of a route's static shell:
 * every caller has to sit behind a `<Suspense>` boundary.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Reads the session straight off the request. Proxy runs outside the render
 * pipeline, so it uses this instead of `getSession`.
 */
export async function readSession(
  request: NextRequest
): Promise<Session | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await decrypt(token);
}

/**
 * Sliding expiration: re-issues the cookie once the session is past halfway, so
 * an active user is never signed out mid-session without paying for a fresh
 * signature on every request. Returns `null` when there is nothing to renew —
 * no valid session, or one that is still young — which lets the caller fall
 * through to its own handling. `session` is optional: pass it when the caller
 * already decoded it.
 */
export async function updateSession(
  request: NextRequest,
  session?: Session | null
): Promise<NextResponse | null> {
  const current = session ?? (await readSession(request));
  if (!current) return null;

  // Cheap synchronous check before the expensive signing work below.
  const issuedAt = current.iat;
  if (
    issuedAt !== undefined &&
    Date.now() - issuedAt * 1000 < SESSION_RENEW_AFTER_SECONDS * 1000
  ) {
    return null;
  }

  const expires = nextExpiry();
  const res = NextResponse.next();
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: await encrypt({ user: current.user }, expires),
    ...cookieOptions(expires),
  });
  return res;
}
