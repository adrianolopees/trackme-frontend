import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../services/api.service";
import type { FollowersResponse } from "../schemas/followSchemas";

export function useFollowersInfiniteQuery(profileId: number) {
  return useInfiniteQuery<FollowersResponse>({
    queryKey: ["followers", profileId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/follow/${profileId}/followers`, {
        params: { page: pageParam, limit: 10 },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}
