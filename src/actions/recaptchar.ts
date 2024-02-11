"use server";

import { RecaptcharSchema } from "@/schemas";
import { z } from "zod";

const verifyEndpoint = "https://www.google.com/recaptcha/api/siteverify";

export const recaptcha = async (value: z.infer<typeof RecaptcharSchema>) => {
  const validateField = RecaptcharSchema.safeParse(value);

  if (!validateField.success) return { success: false };

  const { gRecaptchaToken } = validateField.data;

  const captchaResponse = await fetch(verifyEndpoint, {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!, // See prior section
      response: gRecaptchaToken, // the user's generated "Captcha" token
    }),
  });

  const captchaData = await captchaResponse.json();

  if (!captchaData.success) return { success: false };

  return { success: true };
};
