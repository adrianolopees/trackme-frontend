import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiUsers, FiChevronRight } from "react-icons/fi";
import { fetchFollowing } from "../auth/services/follow.service";
import Avatar from "../components/Avatar/Avatar";

import type { SafeProfile } from "../schemas/authSchemas";
import { PageWrapper } from "../components";

const FollowersPage = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [followers, setFollowers] = useState<SafeProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadFollowers();
  }, [profileId]);

  const loadFollowers = async () => {
    try {
      setLoading(true);
      const data = await fetchFollowing(Number(profileId));
      setFollowers(data);
    } catch (error) {
      console.error("Erro ao carregar seguidores:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header Mobile - Sticky */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Seguidores
              </h1>
              <p className="text-sm text-gray-500">
                {followers.length} seguidores
              </p>
            </div>
          </div>

          {/* Busca */}
          <div className="mt-3">
            <div className="relative">
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar seguidores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lista de Seguidores */}
        <div className="px-4 py-2">
          {loading ? (
            // Carregando esqueleto
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFollowers.length === 0 ? (
            // Estado vazio
            <div className="text-center py-12">
              <FiUsers size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                {searchTerm
                  ? "Nenhum seguidor encontrado"
                  : "Nenhum seguidor ainda"}
              </p>
            </div>
          ) : (
            // Lista de Seguidores
            <div className="space-y-1">
              {filteredFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100"
                  onClick={() => navigate(`/profile/${follower.id}`)}
                >
                  <Avatar src={follower.avatar} size={48} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {follower.username}
                    </p>
                    {follower.name && (
                      <p className="text-sm text-gray-500 truncate">
                        {follower.name}
                      </p>
                    )}
                  </div>
                  <FiChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default FollowersPage;
