import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import {
  AuthActions,
  AuthActionsFallback,
} from "@/components/header/auth-actions";
import NavBar from "@/components/header/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/constants";
import { poppins } from "@/lib/fonts";

const description =
  "Explore vastas terras geladas, enfrente inimigos poderosos e descubra segredos antigos. Crie sua conta e comece sua jornada em Blizzard Conquer.";

export const metadata: Metadata = {
  // Resolves the relative URLs below (and the generated OG image) against the
  // real host. Set NEXT_PUBLIC_SITE_URL in the deploy environment; without it
  // social crawlers would be handed localhost links.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Blizzard Conquer",
    template: "%s | Blizzard Conquer",
  },
  description,
  openGraph: {
    title: "Blizzard Conquer",
    description,
    url: "/",
    siteName: "Blizzard Conquer",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={poppins.className}>
        <NavBar
          authSlot={
            <Suspense fallback={<AuthActionsFallback />}>
              <AuthActions />
            </Suspense>
          }
        />
        {children}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
