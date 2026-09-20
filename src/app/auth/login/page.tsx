import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { sanitizeCallbackUrl } from "@/routes";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Acesse sua conta Blizzard Conquer e continue sua jornada pelas terras geladas.",
};

const LoginPage = ({ searchParams }: PageProps<"/auth/login">) => {
  return (
    <main className="min-h-screen trojan">
      <div className="flex justify-center items-center pt-40">
        {/* `searchParams` is only known per request, so reading it has to sit
            behind a boundary or the whole route loses its static shell. The
            fallback is the same form with the default destination, so the
            static shell already paints a usable login box. */}
        <Suspense fallback={<LoginForm />}>
          <LoginFormWithCallback searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
};

async function LoginFormWithCallback({
  searchParams,
}: Pick<PageProps<"/auth/login">, "searchParams">) {
  const { callbackUrl } = await searchParams;

  return <LoginForm callbackUrl={sanitizeCallbackUrl(callbackUrl)} />;
}

export default LoginPage;
