import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  type RegisterData,
  type RegisterFormData,
} from "../../schemas/authSchemas";

import { useAuth } from "../../hooks/useAuth";
import { FaUserPlus } from "react-icons/fa";

import { GradientButton, InputField } from "../index";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const navigate = useNavigate();
  const { register, registerLoading } = useAuth();

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
      onSuccess?.(); // Fecha modal
      navigate("/profile-setup", { replace: true });
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          type="text"
          placeholder="Nome completo"
          {...registerForm("name")}
          error={errors.name?.message}
          disabled={registerLoading}
        />
        <InputField
          type="text"
          placeholder="Usuário"
          {...registerForm("username")}
          error={errors.username?.message}
          disabled={registerLoading}
        />

        <InputField
          type="email"
          placeholder="Email"
          {...registerForm("email")}
          error={errors.email?.message}
          disabled={registerLoading}
        />

        <InputField
          type="password"
          placeholder="Senha"
          {...registerForm("password")}
          error={errors.password?.message}
          disabled={registerLoading}
        />

        <InputField
          type="password"
          placeholder="Confirmar senha"
          {...registerForm("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={registerLoading}
        />

        <GradientButton
          type="submit"
          loading={registerLoading}
          disabled={registerLoading}
          icon={<FaUserPlus />}
          loadingText="Criando conta..."
          className="w-full"
        >
          Registrar
        </GradientButton>
      </form>

      {/* Switch to Login */}
      <div className="text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}
