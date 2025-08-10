import type { SafeProfile } from "../schemas/authSchemas";

export interface FollowContextData {
  followers: SafeProfile[];
  following: SafeProfile[];
  loading: boolean;
  followProfile: (targetProfileId: number) => Promise<void>;
  unfollowProfile: (targetProfileId: number) => Promise<void>;
  loadFollowers: (profileId?: number) => Promise<void>;
  loadFollowing: (profileId?: number) => Promise<void>;
  isFollowing: (targetProfileId: number) => boolean;
}

export interface FollowProviderProps {
  children: React.ReactNode;
}
