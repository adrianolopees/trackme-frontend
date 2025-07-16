import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../auth/hooks/useAuth";
import {
  AuthFormLayout,
  AuthRedirectLinks,
  InputField,
  PageWrapper,
  GradientButton,
} from "../components";

function Register() {
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    bio: "",
    avatar: null as File | null, // Para o avatar, se necessário
  });

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(form);
      navigate("/profile-setup"); // Redireciona para configuração de perfil
    } catch (error) {
      // Erro já tratado no contexto com toast
      console.error("Erro no registro:", error);
    }
  };

  return (
    <PageWrapper>
      <AuthFormLayout
        title="Crie sua conta"
        redirectLinks={<AuthRedirectLinks alternate="login" />}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <InputField
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            minLength={6}
          />
          <InputField
            type="text"
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
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
