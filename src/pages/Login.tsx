import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormData } from "../schemas/authSchemas";
import { useAuth } from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";

import {
  AuthLinksFooter,
  GradientButton,
  InputField,
  AnimatedWrapper,
} from "../components/index";

function Login() {
  const navigate = useNavigate();
  const { login, loginLoading } = useAuth();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/me", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error no login", error.message);
      }
    }
  };

  return (
    <AnimatedWrapper className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Entrar no TrackMe</h1>
      <form
        className="w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          type="text"
          placeholder="Email ou usuário"
          {...registerForm("identifier")}
          error={errors.identifier?.message}
          required
          disabled={loginLoading}
        />
        <InputField
          type="password"
          placeholder="Senha"
          {...registerForm("password")}
          error={errors.password?.message}
          required
          disabled={loginLoading}
        />
        <GradientButton
          type="submit"
          loading={loginLoading}
          disabled={loginLoading}
          icon={<FaUser />}
          loadingText="Entrando..."
        >
          Entrar
        </GradientButton>
      </form>
      <AuthLinksFooter alternate="register" />
    </AnimatedWrapper>
  );
}

export default Login;
