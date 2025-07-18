import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../auth/hooks/useAuth";
import { Avatar, FullPageSpinner, PageWrapper } from "../components";

export const Profile = () => {
  const navigate = useNavigate();
  const { profile, logout, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, força a navegação
      navigate("/login");
    }
  };

  // Loading state
  if (loading) {
    return <FullPageSpinner />;
  }

  // Se não está autenticado, redirecionar
  if (!isAuthenticated || !profile) {
    return;
  }

  return (
    <PageWrapper>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Avatar src={profile?.avatar} size={96} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
          <p className="text-gray-600">Seu perfil TrackMe</p>
        </div>

        <div className="space-y-4 mb-6">
          {profile.name && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaUser className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="font-medium text-gray-800">{profile.name}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaUser className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Usuário</p>
              <p className="font-medium text-gray-800">{profile.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaEnvelope className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
            disabled={loading}
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
