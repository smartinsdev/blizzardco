"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

/**
 * Wraps only the subtree that calls `useGoogleReCaptcha`. Scoping it this way
 * keeps Google's script off the rest of the page, and `async`/`defer` keep it
 * from blocking the parser while it loads.
 */
export default function GoogleCaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}
      scriptProps={{ async: true, defer: true }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
