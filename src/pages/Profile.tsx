import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Profile = () => {
  const navigate = useNavigate();
  const outLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4 ">Bem-vindo ao seu perfil!</h1>
      <p className="text-lg text-gray-700">
        Aqui você verá seus dados em breve...
      </p>
      <button
        onClick={outLogin}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sair
      </button>
    </motion.div>
  );
};

export default Profile;
