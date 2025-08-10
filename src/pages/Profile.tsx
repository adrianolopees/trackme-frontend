import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import {
  Avatar,
  GradientButton,
  PageWrapper,
  ProfileSettingsButton,
} from "../components";
import { FiHome } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRequireProfile } from "../hooks/useRequireProfile";
import { useFollow } from "../hooks/useFollow";

export const Profile = () => {
  const profile = useRequireProfile();
  const navigate = useNavigate();
  const { logout, loading } = useAuth();
  const { followers, following } = useFollow();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
