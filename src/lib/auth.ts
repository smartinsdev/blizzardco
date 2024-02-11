import type { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "./constants";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function signToken(username: string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(username)
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  return token;
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}
