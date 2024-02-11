"use server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getSession() {
  const token = cookies().get("user-token")?.value;

  if (!token) return null;

  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) return null;

  return verifiedToken.jti;
}
