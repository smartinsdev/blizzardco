import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <main className="min-h-screen dragon">
      <div className="flex justify-center items-center pt-40">
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
