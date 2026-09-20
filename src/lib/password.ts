import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { compare, hash } from "bcryptjs";

/** ~210ms per hash on this codebase's runtime — see the notes in `login`. */
const SALT_ROUNDS = 12;

/**
 * bcrypt digests are self-describing: `$2<variant>$<cost>$<salt><digest>`.
 * `accounts.password` may still hold a legacy plaintext value, so every read of
 * that column has to ask this question before choosing how to compare.
 */
const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$/;

export function isBcryptHash(value: string): boolean {
  return BCRYPT_HASH.test(value);
}

export function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export function verifyPassword(
  password: string,
  digest: string
): Promise<boolean> {
  return compare(password, digest);
}

/**
 * A valid bcrypt digest of a value nobody can supply, used to spend the same
 * ~210ms on the "no such user" path as on a real comparison. Without it, the
 * response time tells an attacker which usernames exist.
 */
const DUMMY_DIGEST =
  "$2b$12$aLWGsWFTC/4HAxfSsANygekRkPv3iRm9T5uRr4DZVDl1IbFXMwRnK";

/** Burns a comparison so an early return doesn't leak timing. */
export async function wastePasswordComparison(password: string) {
  await compare(password, DUMMY_DIGEST);
}

/**
 * Constant-time equality for a legacy plaintext `accounts.password` value.
 *
 * A plain `===` returns as soon as two bytes differ, which leaks how much of a
 * guess was correct. `timingSafeEqual` needs both sides to be the same length,
 * so each is reduced to a 32-byte digest first — that also keeps the stored
 * password's length from leaking.
 */
export function legacyPasswordMatches(
  password: string,
  stored: string
): boolean {
  const digest = (value: string) =>
    createHash("sha256").update(value, "utf8").digest();

  return timingSafeEqual(digest(password), digest(stored));
}
