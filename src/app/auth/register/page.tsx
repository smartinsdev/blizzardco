import type { Metadata } from "next";
import GoogleCaptchaWrapper from "@/components/auth/google-captcha-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta gratuita em Blizzard Conquer e comece sua jornada pelas terras geladas.",
};

const RegisterPage = () => {
  return (
    <main className="min-h-screen dragon">
      <div className="flex justify-center items-center pt-40">
        <GoogleCaptchaWrapper>
          <RegisterForm />
        </GoogleCaptchaWrapper>
      </div>
    </main>
  );
};

export default RegisterPage;
