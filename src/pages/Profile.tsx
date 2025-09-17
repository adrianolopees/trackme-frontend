import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Avatar, AnimatedWrapper } from "../components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRequireProfile } from "../hooks/useRequireProfile";
import { useFollow } from "../hooks/useFollow";

export const Profile = () => {
  const profile = useRequireProfile();
  const navigate = useNavigate();
  const { logout, loginLoading } = useAuth();
  const { followersTotal, followingTotal } = useFollow();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AnimatedWrapper className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
              TrackMe
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="p-8">
            {/* Layout Mobile */}
            <div className="md:hidden">
              <h1 className="text-2xl font-bold mb-4 text-center">{profile.username}</h1>
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  src={profile.avatar}
                  size={64}
                  className="shadow-lg w-16 h-16 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-6 text-sm mb-2">
                    <button
                      onClick={() => navigate(`/users/${profile.id}/followers`)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <span className="font-semibold">{followersTotal}</span> seguidores
                    </button>
                    <button
                      onClick={() => navigate(`/users/${profile.id}/following`)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <span className="font-semibold">{followingTotal}</span> seguindo
                    </button>
                  </div>
                  <button
                    onClick={() => navigate("/profile-edit")}
                    className="text-blue-600 font-medium text-sm"
                  >
                    Editar perfil
                  </button>
                </div>
              </div>

              {/* Bio Section Mobile */}
              {(profile.name || profile.bio) && (
                <div className="space-y-2 mb-6">
                  {profile.name && (
                    <div className="font-bold text-lg text-gray-800">
                      {profile.name}
                    </div>
                  )}
                  {profile.bio && (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {profile.bio}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Layout Desktop */}
            <div className="hidden md:flex flex-col md:flex-row md:items-start gap-8">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start">
                <Avatar
                  src={profile.avatar}
                  size={140}
                  className="shadow-lg "
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                {/* Username and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <h1 className="text-3xl font-bold">{profile.username}</h1>

                  {/* Action Links */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate("/profile-edit")}
                      className="text-gray-700 hover:text-blue-600 font-medium text-sm cursor-pointer transition-colors duration-200"
                    >
                      Editar perfil
                    </button>
                    <button
                      onClick={() => navigate("/settings")}
                      className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    >
                      <FaCog size={16} />
                    </button>
                  </div>
                </div>

                {/* Stats - Instagram Style */}
                <div className="flex justify-center md:justify-start gap-10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-gray-900">
                      0
                    </span>
                    <span className="text-sm text-gray-600">publicações</span>
                  </div>
                  <button
                    onClick={() => navigate(`/users/${profile.id}/followers`)}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <span className="text-xl font-semibold text-gray-900">
                      {followersTotal}
                    </span>
                    <span className="text-sm text-gray-600">seguidores</span>
                  </button>
                  <button
                    onClick={() => navigate(`/users/${profile.id}/following`)}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer "
                  >
                    <span className="text-xl font-semibold text-gray-900">
                      {followingTotal}
                    </span>
                    <span className="text-sm text-gray-600">seguindo</span>
                  </button>
                </div>

                {/* Bio Section */}
                <div className="space-y-2">
                  {profile.name && (
                    <div className="font-bold text-lg text-gray-800">
                      {profile.name}
                    </div>
                  )}
                  {profile.bio && (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {profile.bio}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="flex justify-center">
              <div className="flex">
                <button className="relative px-6 py-4 text-sm font-semibold text-gray-800 group">
                  <span className="relative z-10">PUBLICAÇÕES</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-100 transition-transform duration-300"></div>
                </button>
                <button className="relative px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors group">
                  <span className="relative z-10">SALVOS</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid - Empty State */}
          <div className="p-16 text-center bg-white">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center shadow-lg">
              <FaUser size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Nenhuma publicação ainda
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Quando você publicar fotos e vídeos, elas aparecerão aqui. Comece
              compartilhando seus melhores momentos!
            </p>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
              disabled={loginLoading}
            >
              <FaSignOutAlt size={16} />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Profile;
