import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { cinzel } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

/**
 * Reads the session on the server, so the header renders in the same response
 * as the page instead of waiting for hydration and a round trip to
 * `/api/session`. Reading the request means this can't be prerendered, which is
 * why the layout keeps it behind a `<Suspense>` boundary: everything around it
 * still comes from the static shell.
 */
export async function AuthActions() {
  const user = await getCurrentUser();

  if (user) return <LogoutButton />;

  return (
    <LoginButton asChild mode="redirect">
      <Button
        size="lg"
        className={cn("hidden sm:block font-bold", cinzel.className)}
      >
        Entrar
      </Button>
    </LoginButton>
  );
}

/** Holds the slot's width while the session streams in, so nothing shifts. */
export function AuthActionsFallback() {
  return <div aria-hidden className="hidden sm:block h-11 w-28" />;
}
