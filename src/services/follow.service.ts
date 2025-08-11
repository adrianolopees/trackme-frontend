import api from "../services/api.service";

import type { PaginatedProfiles } from "../types/follow.types";

// Buscar seguidores de um perfil
export const fetchFollowers = async (
  profileId: number,
  page: number = 1
): Promise<PaginatedProfiles> => {
  const { data } = await api.get(`/follow/${profileId}/followers?page=${page}`);

  return {
    profiles: data.data.followers,
    pagination: {
      total: data.data.total,
      totalPages: data.data.totalPages,
      currentPage: data.data.currentPage,
    },
  };
};

// Buscar perfis que o usuário está seguindo
export const fetchFollowing = async (
  profileId: number,
  page: number = 1
): Promise<PaginatedProfiles> => {
  const { data } = await api.get(`/follow/${profileId}/following?page=${page}`);

  return {
    profiles: data.data.followings,
    pagination: {
      total: data.data.total,
      totalPages: data.data.totalPages,
      currentPage: data.data.currentPage,
    },
  };
};

// Seguir um perfil
export const followProfile = async (targetProfileId: number): Promise<void> => {
  await api.post(`/follow/${targetProfileId}`);
};

// Deixar de seguir um perfil
export const unfollowProfile = async (
  targetProfileId: number
): Promise<void> => {
  await api.delete(`/follow/${targetProfileId}`);
};

// Novos métodos no service (follow.service.ts)
export const fetchFollowersCount = async (profileId: number) => {
  const response = await api.get(`/${profileId}/followers-count`);
  return response.data.data.followersTotal;
};

export const fetchFollowingCount = async (profileId: number) => {
  const response = await api.get(`/${profileId}/following-count`);
  return response.data.data.followingTotal;
};

// No useEffect: loadCounts(profile.id);
// Após follow/unfollow: loadCounts(profile.id); para atualizar
