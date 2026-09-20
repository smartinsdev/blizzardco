"use server";

import type { z } from "zod";
import { hashPassword } from "@/lib/password";
import { db } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";

type RegisterResult = { success: boolean; message: string };

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<RegisterResult> => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Ops! As credenciais fornecidas são inválidas.",
    };
  }

  const { email, password, username } = validateFields.data;

  try {
    const existingUser = await db.accounts.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { success: false, message: "Ops! Está conta já está criada" };
    }

    await db.accounts.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
      },
    });

    return { success: true, message: "Bravo! Sua conta foi criada" };
  } catch (error) {
    console.error("register failed", error);

    return { success: false, message: "Internal Error" };
  }
};
