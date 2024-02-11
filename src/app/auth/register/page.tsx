import GoogleCaptchaWrapper from "@/app/GoogleCaptchaWrapper";
import { RegisterForm } from "@/components/auth/register-form";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RegisterPage = () => {
  return (
    <GoogleCaptchaWrapper>
      <main className="min-h-screen dragon">
        <div className="flex justify-center items-center pt-40">
          <RegisterForm />
        </div>
      </main>
    </GoogleCaptchaWrapper>
  );
};

export default RegisterPage;
