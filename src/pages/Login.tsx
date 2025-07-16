import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../auth/hooks/useAuth";
import GradientButton from "../components/GradientButton";
import { PageWrapper } from "../components";
import InputField from "../components/InputField";
import AuthRedirectLinks from "../components/AuthRedirectLinks";
import AuthFormLayout from "../components/AuthFormLayout";

function Login() {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
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
      await login(form);
      // Navegação será feita pelo useEffect quando isAuthenticated mudar
      navigate("/profile");
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
          onSubmit={handleSubmit}
        >
          <InputField
            type="text"
            name="identifier"
            placeholder="Email ou usuário"
            value={form.identifier}
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
