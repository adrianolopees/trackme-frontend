import type { PublicProfile } from "../schemas/profileSchemas";

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
  loadFollowersCount: (profileId?: number) => Promise<void>;
  loadFollowingCount: (profileId?: number) => Promise<void>;
}

export interface FollowProviderProps {
  children: React.ReactNode;
}
