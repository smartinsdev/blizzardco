"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RootError({
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
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">Algo deu errado</h1>
      <p className="text-muted-foreground max-w-md">
        Não conseguimos carregar esta página. Tente novamente em instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}
