import type { PublicProfile } from "../schemas/authSchemas";

export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedProfiles {
  profiles: PublicProfile[];
  pagination: PaginationMeta;
}

export interface FollowContextData {
  followers: PublicProfile[];
  following: PublicProfile[];
  followersTotal: number; // novo
  followingTotal: number; // novo
  loading: boolean;
  followProfile: (targetProfileId: number) => Promise<void>;
  unfollowProfile: (targetProfileId: number) => Promise<void>;
  loadFollowers: (
    profileId?: number,
    page?: number,
    append?: boolean
  ) => Promise<void>;
  loadFollowing: (
    profileId?: number,
    page?: number,
    append?: boolean
  ) => Promise<void>;
  isFollowing: (targetProfileId: number) => boolean;
  loadFollowersCount: (profileId?: number) => Promise<void>; // Novo: Tipagem para a função de count de followers
  loadFollowingCount: (profileId?: number) => Promise<void>; // Novo: Tipagem para a função de count de following
}

export interface FollowProviderProps {
  children: React.ReactNode;
}
