"use server";

import type { z } from "zod";
import { createSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { LoginSchema } from "@/schemas";

type LoginResult = { success: boolean; message: string };

const invalidCredentials = (): LoginResult => ({
  success: false,
  message: "Usuário ou senha Inválida",
});

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<LoginResult> => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success)
    return { success: false, message: "Ops! Seu username ou senha inválidas" };

  const { username, password } = validateFields.data;

  try {
    const user = await db.accounts.findUnique({ where: { username } });
    if (!user) return invalidCredentials();

    if (password !== user.password) return invalidCredentials();

    await createSession({ username: user.username, email: user.email });

    return { success: true, message: "" };
  } catch (error) {
    console.error("login failed", error);

    return { success: false, message: "Internal Error" };
  }
};
