"use server";

import type { z } from "zod";
import { hashPassword } from "@/lib/password";
import { db } from "@/lib/prisma";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { RegisterSchema } from "@/schemas";

type RegisterResult = { success: boolean; message: string };

/**
 * Verifies the captcha and creates the account in one round trip. Splitting the
 * two across separate actions meant the browser paid for two sequential
 * requests before anything was written.
 */
export const register = async (
  values: z.infer<typeof RegisterSchema>,
  gRecaptchaToken: string
): Promise<RegisterResult> => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Ops! As credenciais fornecidas são inválidas.",
    };
  }

  if (!(await verifyRecaptcha(gRecaptchaToken))) {
    return {
      success: false,
      message: "Não foi possível validar o captcha. Tente novamente.",
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
