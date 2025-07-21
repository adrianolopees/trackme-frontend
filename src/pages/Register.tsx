import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import type { RegisterData } from "../auth/types/auth.types";

import { useAuth } from "../auth/hooks/useAuth";
import {
  AuthFormLayout,
  AuthRedirectLinks,
  InputField,
  PageWrapper,
  GradientButton,
} from "../components";

// Validação com Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(100, "Nome muito longo"),
    username: z
      .string()
      .min(3, "Usuário muito curto")
      .max(20, "Usuário muito longo")
      .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e underscore"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres") // 6 é muito pouco hoje em dia
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Deve conter maiúscula, minúscula e número"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuth();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword: _, ...rest } = data;
    const userData: RegisterData = rest;
    try {
      await register(userData);
      navigate("/profile-setup");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Erro ao criar conta");
    }
  };

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}

export default Register;
