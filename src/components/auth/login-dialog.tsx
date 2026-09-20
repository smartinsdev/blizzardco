"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

/**
 * Split out of `login-button` so the dialog and the form land in their own
 * chunk, loaded only when a caller asks for `mode="modal"`.
 */
export function LoginDialog({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        {/* Radix requires a title for the dialog to be announced correctly. */}
        <DialogTitle className="sr-only">Entrar</DialogTitle>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
