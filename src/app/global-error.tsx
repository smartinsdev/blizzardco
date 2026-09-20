"use client";

import { useEffect } from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { poppins } from "@/lib/fonts";

/**
 * Last line of defence: `error.tsx` sits *inside* the root layout, so anything
 * that throws while the layout itself renders — a missing `JWT_SECRET_KEY`, a
 * font that fails to load — never reaches it. This replaces the whole document,
 * which is why it has to bring its own `<html>` and `<body>`.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR" className="dark">
      <body className={poppins.className}>
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-semibold">Algo deu errado</h1>
          <p className="text-muted-foreground max-w-md">
            Não conseguimos carregar o site. Tente novamente em instantes.
          </p>
          <Button onClick={reset}>Tentar novamente</Button>
        </main>
      </body>
    </html>
  );
}
