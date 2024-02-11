"use server";

import { signToken } from "@/lib/auth";
import { USER_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { LoginSchema } from "@/schemas";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success)
    return { message: "Ops! Seu username ou senha inválidas" };

  const { username, password } = validateFields.data;

  const user = await db.accounts.findUnique({ where: { username } });
  if (!user) {
    return { success: false, message: "Usuário ou senha Inválida" };
  }
  if (password !== user.password) {
    return { success: false, message: "Usuário ou senha Inválida" };
  }

  const token = await signToken(user.username);

  cookies().set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });

  return { success: true };
};
