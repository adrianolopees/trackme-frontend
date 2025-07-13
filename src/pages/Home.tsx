// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/hooks/useAuth";
import { FaUser } from "react-icons/fa";
import GradientButton from "../components/GradientButton";

function Home() {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-blue-600">TrackMe</h1>

      {isAuthenticated && profile ? (
        // Usuário logado
        <div className="text-center">
          <p className="mb-6 text-gray-700 text-lg">
            Olá,{" "}
            <span className="font-semibold text-blue-600">
              {profile.name || profile.username}
            </span>
            !
          </p>
          <p className="mb-6 text-gray-600">Bem-vindo de volta ao TrackMe</p>
          <div className="flex gap-4">
            <Link to="/profile">
              <GradientButton
                type="submit"
                loading={loading}
                disabled={loading}
                icon={<FaUser />}
                loadingText="Entrando..."
              >
                ir para Perfil
              </GradientButton>
            </Link>
          </div>
        </div>
      ) : (
        // Usuário não logado
        <div className="text-center">
          <p className="mb-6 text-gray-700 text-lg">Bem-vindo! Comece agora:</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/login">
              <GradientButton
                type="submit"
                loading={loading}
                disabled={loading}
                icon={<FaUser />}
                loadingText="Entrando..."
              >
                Login
              </GradientButton>
            </Link>
            <Link
              to="/register"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      )}

      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          O que é o TrackMe?
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Transforme playlists em conexões.”
        </p>
      </div>
    </motion.div>
  );
}

export default Home;
