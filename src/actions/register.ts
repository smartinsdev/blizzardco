"use server";

import { z } from "zod";
import { db } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success)
    return { message: "Ops! As credenciais fornecidas são inválidas." };

  const { email, password, username } = validateFields.data;

  if (!email || !password || !username)
    return {
      message: "Sem dados para enviar",
    };

  try {
    const existingUser = await db.accounts.findUnique({
      where: { username },
    });

    if (existingUser) return { message: "Ops! Está conta já está criada" };

    await db.accounts.create({
      data: {
        username,
        email,
        password,
      },
    });

    return { message: "Bravo! Sua conta foi criada" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name);
      console.log(error.cause);
      console.log(error.message);

      return { message: "Internal Error" };
    }
  }
};
