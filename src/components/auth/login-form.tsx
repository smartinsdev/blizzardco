"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { login } from "@/actions/login";
import { CardBox } from "@/components/auth/card-box";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

/**
 * `callbackUrl` is where the proxy wanted the visitor to land before it bounced
 * them here. The page sanitizes it; the modal passes nothing and falls back to
 * the default landing page.
 */
export function LoginForm({
  callbackUrl = DEFAULT_LOGIN_REDIRECT,
}: {
  callbackUrl?: string;
} = {}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      const res = await login(values);
      if (res?.success) {
        form.reset();
        router.push(callbackUrl);
        // The header's session slot is rendered on the server, so re-fetching
        // the tree is what switches it to "Logout".
        router.refresh();
      } else {
        setError(res?.message);
        form.reset();
      }
    });
  };

  return (
    <CardBox
      headerLabel="Bem vindo de volta conquistador"
      backButtonLabel="Você ainda não tem uma conta?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite seu username"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite sua senha"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error ? <FormError message={error} /> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            Entrar
          </Button>
        </form>
      </Form>
    </CardBox>
  );
}
