import { useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { Avatar, GradientButton, PageWrapper } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useFollow } from "../hooks/useFollow";
import api from "../services/api.service"; // Cliente axios ou fetch
import type { SafeProfile } from "../schemas/authSchemas";

export const ProfileView = () => {
  const { id } = useParams<{ id: string }>(); // ID do perfil visitado
  const profileId = parseInt(id || "", 10);
  const navigate = useNavigate();
  const { isAuthenticated, profile: currentUser } = useAuth();
  const {
    followProfile,
    unfollowProfile,
    isFollowing,
    loadFollowersCount,
    loadFollowingCount,
  } = useFollow();
  const [visitedProfile, setVisitedProfile] = useState<SafeProfile | null>(
    null
  );
  const [followersCount, setFollowersCount] = useState(0); // Local, não usa context
  const [followingCount, setFollowingCount] = useState(0); // Local
  const [loading, setLoading] = useState(false);

  // Carrega dados do perfil visitado
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return;
      setLoading(true);
      try {
        const response = await api.get(`/users/${profileId}`); // Assume endpoint para perfil
        setVisitedProfile(response.data.data);
        // Carrega counts com os novos endpoints
        await loadFollowersCount(profileId);
        await loadFollowingCount(profileId);
        // Atualiza states locais com os counts do context (já setados por load)
        setFollowersCount(response.data.followersTotal || 0);
        setFollowingCount(response.data.followingTotal || 0);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        navigate("/"); // Redireciona se perfil não existir
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileId, navigate, loadFollowersCount, loadFollowingCount]);

  // Botão de seguir/deixar de seguir
  const handleFollowToggle = async () => {
    if (!isAuthenticated || !currentUser) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      if (isFollowing(profileId)) {
        await unfollowProfile(profileId);
        setFollowersCount((prev) => Math.max(0, prev - 1)); // Update local
      } else {
        await followProfile(profileId);
        setFollowersCount((prev) => prev + 1); // Update local
      }
      // Recarrega counts para sync
      await loadFollowersCount(profileId);
      await loadFollowingCount(profileId);
      // Busca os novos totais do backend
      try {
        const countsResponse = await api.get(`/users/${profileId}`);
        setFollowersCount(countsResponse.data.followersTotal || 0);
        setFollowingCount(countsResponse.data.followingTotal || 0);
      } catch (err) {
        // fallback: não atualiza se erro
      }
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error);
    } finally {
      setLoading(false);
    }
  };

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

          {/* Botão de seguir/deixar de seguir */}
          {isAuthenticated && currentUser?.id !== profileId && (
            <button
              onClick={handleFollowToggle}
              className={`mt-4 px-4 py-2 rounded-lg text-white transition-colors ${
                isFollowing(profileId)
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading
                ? "..."
                : isFollowing(profileId)
                ? "Deixar de seguir"
                : "Seguir"}
            </button>
          )}

          {/* Estatísticas de Follow */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => navigate(`/profile/${profileId}/followers`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
              disabled={loading}
            >
              <div className="text-lg font-bold text-gray-800">
                {loading ? "..." : followersCount}
              </div>
              <div className="text-xs text-gray-500">Seguidores</div>
            </button>
            <button
              onClick={() => navigate(`/profile/${profileId}/following`)}
              className="text-center hover:bg-gray-50 p-2 rounded transition-colors"
              disabled={loading}
            >
              <div className="text-lg font-bold text-gray-800">
                {loading ? "..." : followingCount}
              </div>
              <div className="text-xs text-gray-500">Seguindo</div>
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {visitedProfile.name && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaUser className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="font-medium text-gray-800">
                  {visitedProfile.name}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaEnvelope className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {visitedProfile.email}
              </p>
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
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileView;
