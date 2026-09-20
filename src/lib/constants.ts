export const SESSION_COOKIE_NAME = "session";

/**
 * Session lifetime, in seconds. Shared by the JWT `exp` claim and the cookie so
 * the two can never drift apart.
 */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Only re-issue the cookie once a session is past its halfway point. Renewing
 * on every request costs an HS256 signature plus a `Set-Cookie` per navigation
 * (prefetches included) and buys nothing: an active user's session is refreshed
 * long before it can lapse either way.
 */
export const SESSION_RENEW_AFTER_SECONDS = SESSION_MAX_AGE_SECONDS / 2;

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}
