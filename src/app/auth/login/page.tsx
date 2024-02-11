import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <main className="min-h-screen trojan">
      <div className="flex justify-center items-center pt-40">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
