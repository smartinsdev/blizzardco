"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

/**
 * The modal branch pulls in `react-hook-form`, `zod`, the resolver and the
 * Radix dialog. Loading it statically would put all of that in the bundle of
 * every route, since the header renders this component app-wide and almost
 * always in `redirect` mode. Deferring it keeps that cost on the path that
 * actually opens a dialog.
 */
const LoginDialog = dynamic(() =>
  import("./login-dialog").then((m) => m.LoginDialog)
);

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  if (mode === "modal") {
    return <LoginDialog asChild={asChild}>{children}</LoginDialog>;
  }

  return (
    <Link href="/auth/login" className="cursor-pointer hidden sm:block">
      {children}
    </Link>
  );
};
