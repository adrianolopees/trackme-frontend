import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import GradientButton from "../components/GradientButton";
import { FaUserPlus } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(""); // adicionando erro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Removed redundant SubmitEvent interface

  interface AxiosErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // limpa erro anterior, se houver

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Cadastro feito com sucesso!");

      // Redireciona sem delay, como no seu exemplo que funcionava
      navigate("/login");
    } catch (err) {
      const error = err as AxiosErrorResponse;
      const msg = error.response?.data?.message || "Erro ao registrar.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
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

      {error && <p className="text-red-500 mb-2">{error}</p>}

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
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nome completo (opcional)"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <GradientButton
          type="submit"
          loading={loading}
          disabled={loading}
          icon={<FaUserPlus />}
        >
          Registrar
        </GradientButton>
      </form>
      <ToastContainer />
    </motion.div>
  );
}

export default Register;
