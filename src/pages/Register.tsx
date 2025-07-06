// src/pages/Register.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import GradientButton from "../components/GradientButton";

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

      // Se o registro retornar token (login automático), vai para profile
      // Senão, vai para login
      if (isAuthenticated) {
        navigate("/profile-setup");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Erro já tratado no contexto com toast
      console.error("Erro no registro:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">Crie sua conta</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={handleChange}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          disabled={loading}
          minLength={6}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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

      <p className="mt-4 text-sm">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Faça login
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

export default Register;
