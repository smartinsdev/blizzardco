import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Este campo é obrigatório. Por favor, preencha-o." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Este campo deve conter apenas letras e números.",
    }),
  password: z
    .string()
    .min(1, { message: "Este campo é obrigatório. Por favor, preencha-o." }),
});

export const RegisterSchema = z.object({
  email: z.email({
    message: "Este campo é obrigatório. Por favor, preencha-o.",
  }),
  password: z.string().min(5, {
    message: "Este campo deve ter no mínimo 5 caracteres",
  }),
  username: z
    .string()
    .min(1, {
      message: "Este campo é obrigatório. Por favor, preencha-o.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Este campo deve conter apenas letras e números.",
    }),
});

export const RecaptcharSchema = z.object({
  gRecaptchaToken: z.string(),
});
