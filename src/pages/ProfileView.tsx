import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { Avatar, GradientButton, AnimatedWrapper } from "../components";
import api from "../services/apiService";
import type { SafeProfile } from "../schemas/profileSchemas";
import { FollowButton } from "../components/Follow/FollowButton";

export const ProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(id || "", 10);
  const navigate = useNavigate();

  const [visitedProfile, setVisitedProfile] = useState<SafeProfile | null>(
    null
  );
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [profileLoading, setProfileLoading] = useState(false);

  // Carrega perfil e contagens
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

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (!visitedProfile) {
    return <AnimatedWrapper>Carregando...</AnimatedWrapper>;
  }

  return (
    <AnimatedWrapper className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
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

          {/* Botão seguir/deixar de seguir com update instantâneo */}
          <FollowButton
            targetProfileId={profileId}
            onFollow={() => setFollowersCount((prev) => prev + 1)}
            onUnfollow={() =>
              setFollowersCount((prev) => Math.max(0, prev - 1))
            }
          />

          {/* Estatísticas */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => navigate(`/users/${profileId}/followers`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
              disabled={profileLoading}
            >
              <div className="text-lg font-bold text-gray-800">
                {profileLoading ? "..." : followersCount}
              </div>
              <div className="text-xs text-gray-500">Seguidores</div>
            </button>
            <button
              onClick={() => navigate(`/users/${profileId}/following`)}
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
            <Link to="/me">
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
    </AnimatedWrapper>
  );
};

export default ProfileView;
