"use server";

import { encrypt } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { LoginSchema } from "@/schemas";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success)
    return { message: "Ops! Seu username ou senha inválidas" };

  const { username, password } = validateFields.data;

  try {
    const user = await db.accounts.findUnique({ where: { username } });
    if (!user) {
      return { success: false, message: "Usuário ou senha Inválida" };
    }
    if (password !== user.password) {
      return { success: false, message: "Usuário ou senha Inválida" };
    }

    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const payload = { username: user.username, email: user.email };
    const session = await encrypt({ payload, expires });

    // Save the session in a cookie
    cookies().set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.cause);
      console.log(error.message);

      return { message: "Internal Error" };
    }
  }
};
