"use client";

import { useState, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardBox } from "@/components/auth/card-box";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { login } from "@/actions/login";

import { toast } from "sonner";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      const res = await login(values);
      if (res?.success) {
        form.reset();
        redirect("/");
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
          {error && <FormError message={error} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            Entrar
          </Button>
        </form>
      </Form>
    </CardBox>
  );
}
