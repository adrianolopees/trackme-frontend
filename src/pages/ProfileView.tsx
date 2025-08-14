import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { Avatar, GradientButton, PageWrapper } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useFollow } from "../hooks/useFollow";
import api from "../services/api.service";
import type { SafeProfile } from "../schemas/profileSchemas";

export const ProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(id || "", 10);
  const navigate = useNavigate();
  const { isAuthenticated, profile: currentUser } = useAuth();
  const {
    followProfile,
    unfollowProfile,
    isFollowing,
    loading: followLoading,
  } = useFollow();

  const [visitedProfile, setVisitedProfile] = useState<SafeProfile | null>(
    null
  );
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [profileLoading, setProfileLoading] = useState(false);

  // Função para carregar o perfil e counts em uma única chamada
  const fetchProfileData = useCallback(async () => {
    if (!profileId) return;
    setProfileLoading(true);
    try {
      const response = await api.get(`/profiles/${profileId}`);
      const data = response.data.data;
      setVisitedProfile(data.data);
      setFollowersCount(data.followersTotal);
      setFollowingCount(data.followingsTotal);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      navigate("/");
    } finally {
      setProfileLoading(false);
    }
  }, [profileId, navigate]);

  // Carrega dados ao montar ou trocar o ID
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Seguir / deixar de seguir
  const handleFollowToggle = async () => {
    if (!isAuthenticated || !currentUser) {
      navigate("/login");
      return;
    }
    try {
      if (isFollowing(profileId)) {
        await unfollowProfile(profileId);
        setFollowersCount((prev) => Math.max(0, prev - 1));
      } else {
        await followProfile(profileId);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error);
    }
  }; // 💡 Exibe o botão apenas se não for o perfil do usuário logado
  const isOwner = currentUser?.id === profileId;
  const shouldShowFollowButton = isAuthenticated && !isOwner;

  if (!visitedProfile) {
    return <PageWrapper>Carregando...</PageWrapper>;
  }

  return (
    <PageWrapper>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Avatar
            src={visitedProfile.avatar}
            size={96}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {visitedProfile.username}
          </h1>
          <p className="text-gray-600">{visitedProfile.bio}</p>

          {/* Botão seguir/deixar de seguir */}
          {shouldShowFollowButton && (
            <button
              onClick={handleFollowToggle}
              className={`mt-4 px-4 py-2 rounded-lg text-white transition-colors ${
                isFollowing(profileId)
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={profileLoading || followLoading}
            >
              {followLoading
                ? "..."
                : isFollowing(profileId)
                ? "Deixar de seguir"
                : "Seguir"}
            </button>
          )}

          {/* Estatísticas */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => navigate(`/profile/${profileId}/followers`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
              disabled={profileLoading}
            >
              <div className="text-lg font-bold text-gray-800">
                {profileLoading ? "..." : followersCount}
              </div>
              <div className="text-xs text-gray-500">Seguidores</div>
            </button>
            <button
              onClick={() => navigate(`/profile/${profileId}/following`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
              disabled={profileLoading}
            >
              <div className="text-lg font-bold text-gray-800">
                {profileLoading ? "..." : followingCount}
              </div>
              <div className="text-xs text-gray-500">Seguindo</div>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <GradientButton
                type="button"
                loading={profileLoading}
                disabled={profileLoading}
                icon={<FiHome size={14} />}
              >
                Home
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileView;
