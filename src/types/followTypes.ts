import type { PublicProfile } from "../schemas/profileSchemas";
import { type ReactNode } from "react";

export interface FollowContextData {
  followers: PublicProfile[];
  following: PublicProfile[];
  followersTotal: number;
  followingTotal: number;
  countsLoading: boolean;
  isFollowingLoading: boolean;
  isUnfollowingLoading: boolean;
  isFollowersListLoading: boolean;
  isFollowingListLoading: boolean;
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
  loadCounts: (profileId?: number) => Promise<void>;
}

export interface FollowProviderProps {
  children: ReactNode;
}
