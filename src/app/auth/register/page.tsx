import GoogleCaptchaWrapper from "@/components/auth/google-captcha-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

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
