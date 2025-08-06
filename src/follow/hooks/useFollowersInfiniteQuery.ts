import { useInfiniteQuery } from "@tanstack/react-query";
import type { FollowersResponse } from "../../schemas/followSchemas";
import api from "../../auth/services/api.service"; // adaptado se você usa seu axios custom

export function useFollowersInfiniteQuery(profileId: number) {
  return useInfiniteQuery<FollowersResponse>({
    queryKey: ["followers", profileId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/follow/${profileId}/followers`, {
        params: { page: pageParam, limit: 10 },
      });

      return res.data.data; // a tipagem agora vem do Zod
    },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}
