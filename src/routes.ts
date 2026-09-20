/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/download"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

/**
 * Narrows a `?callbackUrl=` value to a same-origin path before anything
 * navigates to it. The value reaches us straight from the URL bar, so an
 * absolute `https://evil.com`, a protocol-relative `//evil.com`, or the `/\`
 * form that some browsers normalise to `//` would each turn the login page into
 * an open redirect. Anything that isn't a plain path falls back to the default.
 */
export function sanitizeCallbackUrl(
  value: string | string[] | undefined
): string {
  // A repeated `?callbackUrl=` yields an array; there is no sane way to pick
  // one, so treat it as absent.
  if (typeof value !== "string") return DEFAULT_LOGIN_REDIRECT;
  if (!value.startsWith("/")) return DEFAULT_LOGIN_REDIRECT;
  if (value.startsWith("//") || value.startsWith("/\\")) {
    return DEFAULT_LOGIN_REDIRECT;
  }

  return value;
}
