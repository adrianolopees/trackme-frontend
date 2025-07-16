import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../auth/hooks/useAuth";
import GradientButton from "../components/GradientButton";

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
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-4">Entrar no TrackMe</h1>

      <form
        className="w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="identifier"
          placeholder="Email ou usuário"
          value={form.identifier}
          onChange={handleChange}
          className="bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-100 p-2 border-none rounded outline-none focus:ring-2 focus:ring-blue-500"
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

      <p className="mt-4 text-sm">
        Ainda não tem conta?{" "}
        <Link
          to="/register"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Cadastre-se
        </Link>
      </p>

      <p className="mt-2 text-sm">
        <Link to="/" className="text-gray-600 underline hover:text-gray-800">
          Voltar ao início
        </Link>
      </p>
    </motion.div>
  );
}

export default Login;
