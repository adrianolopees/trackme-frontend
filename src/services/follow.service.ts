import api from "../services/api.service";

import type { PaginatedProfiles } from "../types/follow.types";

export const followService = {
  async fetchFollowers(
    profileId: number,
    page: number = 1
  ): Promise<PaginatedProfiles> {
    const { data } = await api.get(
      `/follow/${profileId}/followers?page=${page}`
    );

    return {
      profiles: data.data.followers,
      pagination: {
        total: data.data.total,
        totalPages: data.data.totalPages,
        currentPage: data.data.currentPage,
      },
    };
  },

  async fetchFollowing(
    profileId: number,
    page: number = 1
  ): Promise<PaginatedProfiles> {
    const { data } = await api.get(
      `/follow/${profileId}/following?page=${page}`
    );

    return {
      profiles: data.data.followings,
      pagination: {
        total: data.data.total,
        totalPages: data.data.totalPages,
        currentPage: data.data.currentPage,
      },
    };
  },

  async followProfile(targetProfileId: number): Promise<void> {
    await api.post(`/follow/${targetProfileId}`);
  },

  async unfollowProfile(targetProfileId: number): Promise<void> {
    await api.delete(`/follow/${targetProfileId}`);
  },

  // Novos métodos no service (follow.service.ts)
  async fetchFollowersCount(profileId: number) {
    const response = await api.get(`/follow/${profileId}/followers-count`);
    return response.data.data.followersTotal;
  },

  async fetchFollowingCount(profileId: number) {
    const response = await api.get(`/follow/${profileId}/following-count`);
    return response.data.data.followingTotal;
  },
};
// No useEffect: loadCounts(profile.id);
// Após follow/unfollow: loadCounts(profile.id); para atualizar
