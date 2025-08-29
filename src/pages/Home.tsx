import { useAuth } from "../hooks/useAuth";
import { FullPageSpinner, AuthButtons } from "../components";
import { FiShare2, FiUsers, FiUser, FiMusic } from "react-icons/fi";
import AnimatedWrapper from "../components/Layout/AnimatedWrapper";
import { Navigate } from "react-router-dom";

function Home() {
  const { isAuthenticated, loading } = useAuth();
  if (isAuthenticated) return <Navigate to="/Profile" replace />;

  return (
    <AnimatedWrapper className="flex flex-col justify-center items-center min-h-screen max-w-4xl bg-gray-50 p-4 md:py-12 md:px-8 ">
      {loading && <FullPageSpinner />}
      <h1 className="text-5xl md:text-7xl font-bold mb-1 md:mb-10 text-blue-600">
        TrackMe
      </h1>
      <p className="text-lg md:text-2xl mb-6 md:mb-8 text-gray-700  ">
        Bem-vindo! Comece agora:
      </p>

      {!isAuthenticated && !loading && <AuthButtons />}

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        O que é o TrackMe?
      </h2>

      <ul className=" text-gray-600 leading-relaxed">
        <li className="flex gap-3 ">
          <FiShare2 className="text-primary mt-1" size={18} />
          <span>Transforme playlists em conexões.</span>
        </li>
        <li className="flex gap-3">
          <FiUsers className="text-primary mt-1" size={18} />
          <span>Sua vibe atrai sua tribo.</span>
        </li>
        <li className="flex gap-3">
          <FiMusic className="text-primary mt-1" size={18} />
          <span>Mesma música, nova amizade.</span>
        </li>
        <li className="flex gap-3">
          <FiUser className="text-primary mt-1" size={18} />
          <span>Seu perfil, suas regras, sua essência.</span>
        </li>
      </ul>
    </AnimatedWrapper>
  );
}

export default Home;
