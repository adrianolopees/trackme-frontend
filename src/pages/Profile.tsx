import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import {
  Avatar,
  GradientButton,
  PageWrapper,
  ProfileSettingsButton,
} from "../components";
import { FiHome } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { useRequireProfile } from "../auth/hooks/useRequireProfile";
import { useFollow } from "../auth/hooks/useFollow";
import { FollowersList } from "../components/Follow/FollowersList";
import { FollowingList } from "../components/Follow/FollowingList";

<FollowersList />;
<FollowingList />;

export const Profile = () => {
  const navigate = useNavigate();
  const { logout, loading } = useAuth();
  const profile = useRequireProfile();
  const { followers, following } = useFollow();
  const [showFollowSection, setShowFollowSection] = useState(false);
  const [activeFollowTab, setActiveFollowTab] = useState<
    "followers" | "following"
  >("followers");

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, força a navegação
      navigate("/login");
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Avatar src={profile.avatar} size={96} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            {profile.username}
          </h1>
          <ProfileSettingsButton />
          <p className="text-gray-600">{profile.bio}</p>

          {/* Estatísticas de Follow */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => navigate(`/profile/${profile.id}/followers`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="text-lg font-bold text-gray-800">
                {followers.length}
              </div>
              <div className="text-xs text-gray-500">Seguidores</div>
            </button>
            <button
              onClick={() => navigate(`/profile/${profile.id}/following`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="text-lg font-bold text-gray-800">
                {following.length}
              </div>
              <div className="text-xs text-gray-500">Seguindo</div>
            </button>
          </div>
        </div>

        {/* Seção de Follow (colapsável) */}
        {showFollowSection && (
          <div className="mb-6 border-t pt-4">
            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                onClick={() => setActiveFollowTab("followers")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  activeFollowTab === "followers"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Seguidores
              </button>
              <button
                onClick={() => setActiveFollowTab("following")}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  activeFollowTab === "following"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Seguindo
              </button>
            </div>

            {/* Conteúdo das tabs */}
            <div className="max-h-48 overflow-y-auto">
              {activeFollowTab === "followers" ? (
                <FollowersList />
              ) : (
                <FollowingList />
              )}
            </div>

            {/* Botão para fechar */}
            <button
              onClick={() => setShowFollowSection(false)}
              className="w-full mt-3 text-xs text-gray-500 hover:text-gray-700 py-1"
            >
              Fechar
            </button>
          </div>
        )}

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
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <GradientButton
                type="submit"
                loading={loading}
                disabled={loading}
                icon={<FiHome size={14} />}
                loadingText="Entrando..."
              >
                Home
              </GradientButton>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
            disabled={loading}
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
