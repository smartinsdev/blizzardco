import "server-only";

import { RecaptcharSchema } from "@/schemas";

const verifyEndpoint = "https://www.google.com/recaptcha/api/siteverify";

/**
 * Verifies a reCAPTCHA v3 token with Google.
 *
 * Deliberately a plain server helper rather than a Server Action: it is only
 * ever called from inside another action, so there is no reason to expose it as
 * its own endpoint.
 */
export async function verifyRecaptcha(gRecaptchaToken: string) {
  const validateField = RecaptcharSchema.safeParse({ gRecaptchaToken });
  if (!validateField.success) return false;

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return false;
  }

  try {
    const captchaResponse = await fetch(verifyEndpoint, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: validateField.data.gRecaptchaToken,
      }),
    });

    const captchaData = (await captchaResponse.json()) as { success?: boolean };

    return captchaData.success === true;
  } catch (error) {
    console.error("recaptcha verification failed", error);
    return false;
  }
}
