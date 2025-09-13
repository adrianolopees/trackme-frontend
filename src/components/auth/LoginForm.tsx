import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormData } from "../../schemas/authSchemas";
import { useAuth } from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";

import {
  GradientButton,
  InputField,
} from "../index";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
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
      onSuccess?.(); // Fecha modal após sucesso
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error no login", error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-4"
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
          className="w-full"
        >
          Entrar
        </GradientButton>
      </form>

      {/* Switch to Register */}
      <div className="text-center">
        <p className="text-gray-600">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}