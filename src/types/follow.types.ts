import type { SafeProfile } from "../schemas/authSchemas";

export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedProfiles {
  profiles: SafeProfile[];
  pagination: PaginationMeta;
}

export interface FollowContextData {
  followers: SafeProfile[];
  following: SafeProfile[];
  loading: boolean;
  followProfile: (targetProfileId: number) => Promise<void>;
  unfollowProfile: (targetProfileId: number) => Promise<void>;
  loadFollowers: (profileId?: number, page?: number) => Promise<void>;
  loadFollowing: (profileId?: number, page?: number) => Promise<void>;
  isFollowing: (targetProfileId: number) => boolean;
}

export interface FollowProviderProps {
  children: React.ReactNode;
}
