"use server";

import type { z } from "zod";
import { createSession } from "@/lib/auth";
import {
  hashPassword,
  isBcryptHash,
  legacyPasswordMatches,
  verifyPassword,
  wastePasswordComparison,
} from "@/lib/password";
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

    const stored = user?.password ?? "";
    // No such user, or the column still holds its "" default — which must never
    // authenticate anyone. Either way, spend the same time a real comparison
    // would, so the response doesn't reveal which usernames exist.
    if (!user || stored.length === 0) {
      await wastePasswordComparison(password);
      return invalidCredentials();
    }

    if (isBcryptHash(stored)) {
      if (!(await verifyPassword(password, stored))) {
        return invalidCredentials();
      }
    } else {
      // Legacy row: `accounts.password` still holds plaintext. Accept it this
      // once, then upgrade it in place so this branch never runs again for this
      // account. Migrating lazily avoids a forced password reset for everyone.
      //
      // On failure, spend the same ~210ms the bcrypt path costs: returning
      // straight away would make a legacy account answer visibly faster than a
      // migrated one, which is itself worth knowing to an attacker.
      if (!legacyPasswordMatches(password, stored)) {
        await wastePasswordComparison(password);
        return invalidCredentials();
      }

      await db.accounts.update({
        where: { id: user.id },
        data: { password: await hashPassword(password) },
      });
    }

    await createSession({ username: user.username, email: user.email });

    return { success: true, message: "" };
  } catch (error) {
    console.error("login failed", error);

    return { success: false, message: "Internal Error" };
  }
};
