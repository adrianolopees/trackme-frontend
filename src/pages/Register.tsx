import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  type RegisterData,
  type RegisterFormData,
} from "../schemas/authSchemas";

import { useAuth } from "../hooks/useAuth";

import { FaUserPlus } from "react-icons/fa";

import {
  AuthFormLayout,
  AuthRedirectLinks,
  GradientButton,
  InputField,
  AnimatedWrapper,
} from "../components";

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword: _, ...rest } = data;

    const userData: RegisterData = rest;
    try {
      await register(userData);
      navigate("/profile-setup", { replace: true });
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <AnimatedWrapper className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <AuthFormLayout
        title="Crie sua conta"
        redirectLinks={<AuthRedirectLinks alternate="login" />}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <InputField
            type="text"
            placeholder="Nome completo"
            {...registerForm("name")}
            error={errors.name?.message}
            disabled={loading}
          />
          <InputField
            type="text"
            placeholder="Usuário"
            {...registerForm("username")}
            error={errors.username?.message}
            disabled={loading}
          />

          <InputField
            type="email"
            placeholder="Email"
            {...registerForm("email")}
            error={errors.email?.message}
            disabled={loading}
          />

          <InputField
            type="password"
            placeholder="Senha"
            {...registerForm("password")}
            error={errors.password?.message}
            disabled={loading}
          />

          <InputField
            type="password"
            placeholder="Confirmar senha"
            {...registerForm("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={loading}
          />

          <GradientButton
            type="submit"
            loading={loading}
            disabled={loading}
            icon={<FaUserPlus />}
            loadingText="Criando conta..."
          >
            Registrar
          </GradientButton>
        </form>
      </AuthFormLayout>
    </AnimatedWrapper>
  );
}

export default Register;
