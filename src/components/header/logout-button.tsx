"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { cinzel } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function LogoutButton() {
  const [isSigningOut, startSignOut] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startSignOut(async () => {
      await logout();
      router.push("/");
      // The header's session slot is rendered on the server, so re-fetching the
      // tree is what swaps "Logout" back to "Entrar".
      router.refresh();
    });
  };

  return (
    <Button
      size="lg"
      disabled={isSigningOut}
      className={cn("hidden sm:block font-bold", cinzel.className)}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
