import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiUsers } from "react-icons/fi";
import PageWrapperFollow from "../Layout/PageWrapperFollow";
import { FollowersSkeleton, ProfileListItem } from "../index";

import type { SafeProfile } from "../../schemas/authSchemas";

import type {
  PaginatedProfiles,
  PaginationMeta,
} from "../../types/follow.types";

interface FollowListProps {
  profileId: number;
  type: "followers" | "following";
  fetchFunction: (
    profileId: number,
    page: number
  ) => Promise<PaginatedProfiles>;
}

const FollowList = ({ profileId, type, fetchFunction }: FollowListProps) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<SafeProfile[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isFollowers = type === "followers";
  const title = isFollowers ? "Seguidores" : "Seguindo";
  const emptyMessage = isFollowers
    ? "Nenhum seguidor ainda"
    : "Não está seguindo ninguém";
  const searchPlaceholder = isFollowers
    ? "Buscar seguidores..."
    : "Buscar usuários...";

  useEffect(() => {
    loadProfiles();
  }, [profileId, currentPage]);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const { profiles, pagination } = await fetchFunction(
        profileId,
        currentPage
      );
      setProfiles(profiles);
      setPagination(pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapperFollow>
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
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">
                {profiles.length} {isFollowers ? "seguidores" : "seguindo"}
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
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="px-4 py-2">
          {loading ? (
            <FollowersSkeleton />
          ) : filteredProfiles.length === 0 ? (
            // Estado vazio
            <div className="text-center py-12">
              <FiUsers size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                {searchTerm
                  ? `Nenhum ${isFollowers ? "seguidor" : "usuário"} encontrado`
                  : emptyMessage}
              </p>
            </div>
          ) : (
            // Lista de Usuários
            <div className="space-y-1">
              {filteredProfiles.map((profile) => (
                <ProfileListItem
                  key={profile.id}
                  profile={profile}
                  onClick={() => navigate(`/profile/${profile.id}`)}
                />
              ))}
            </div>
          )}
          {pagination && currentPage < pagination.totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded"
            >
              Carregar mais
            </button>
          )}
        </div>
      </div>
    </PageWrapperFollow>
  );
};

export default FollowList;
