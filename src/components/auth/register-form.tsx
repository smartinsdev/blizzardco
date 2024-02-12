"use client";

import { useState, useTransition } from "react";
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

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { toast } from "sonner";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { recaptcha } from "@/actions/recaptchar";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    if (!executeRecaptcha) {
      toast("Error ao executar o captchar");
      return;
    }

    startTransition(async () => {
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
      const recaptchaValid = await recaptcha({ gRecaptchaToken });
      if (recaptchaValid.success) {
        register(values).then((data) => {
          form.reset();
          toast(data?.message);
        });
      }
    });
  };

  return (
    <CardBox
      headerLabel="Bem vindo conquistador, aqui vamos começar sua jornada"
      backButtonLabel="Você já tem uma conta?"
      backButtonHref="/auth/login"
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o seu email"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Criar conta
          </Button>
        </form>
      </Form>
    </CardBox>
  );
}
