import type { NextRequest } from "next/server";
import { readSession, updateSession } from "./lib/auth";
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const session = await readSession(request);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (session) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!session) {
    if (isPublicRoute) return null;

    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Authenticated: push the expiry out so an active user is never signed out
  // mid-session. Falls back to `null` (continue as-is) if renewal isn't needed.
  return await updateSession(request, session);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
