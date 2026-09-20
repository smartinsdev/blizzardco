import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import {
  AuthActions,
  AuthActionsFallback,
} from "@/components/header/auth-actions";
import NavBar from "@/components/header/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Blizzard Conquer",
  description:
    "Explore vastas terras geladas, enfrente inimigos poderosos e descubra segredos antigos. Crie sua conta e comece sua jornada em Blizzard Conquer.",
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
