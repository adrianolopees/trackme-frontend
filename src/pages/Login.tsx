import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/authSchemas";

import { useAuth } from "../hooks/useAuth";

import { FaUser } from "react-icons/fa";

import {
  AuthFormLayout,
  AuthRedirectLinks,
  GradientButton,
  InputField,
  PageWrapper,
} from "../components/index";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error no login", error.message);
      }
    }
  };

  return (
    <PageWrapper>
      <AuthFormLayout
        title="Entrar no TrackMe"
        redirectLinks={<AuthRedirectLinks alternate="register" />}
      >
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
            disabled={loading}
          />
          <InputField
            type="password"
            placeholder="Senha"
            {...registerForm("password")}
            error={errors.password?.message}
            required
            disabled={loading}
          />
          <GradientButton
            type="submit"
            loading={loading}
            disabled={loading}
            icon={<FaUser />}
            loadingText="Entrando..."
          >
            Entrar
          </GradientButton>
        </form>
      </AuthFormLayout>
    </PageWrapper>
  );
}

export default Login;
