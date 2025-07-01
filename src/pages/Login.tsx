import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Import para feedback e animações
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import GradientButton from "../components/GradientButton";
import { FaUser } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // atualiza os estados conforme o tonto digita

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ao enviar essa merda
  interface LoginResponse {
    token: string;
    [key: string]: unknown;
  }

  interface ErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        form
      );
      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("Login feito com sucesso!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      toast.error(error.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
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
          className="bg-gray-100 p-2 border-none rounded outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-100 p-2 border-none rounded outline-none"
          required
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
        <Link to="/register" className="text-blue-600 underline">
          Cadastre-se
        </Link>
      </p>
      <ToastContainer />
    </motion.div>
  );
}

export default Login;
