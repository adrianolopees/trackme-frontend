import type { ReactNode } from "react";
import type { SafeProfile } from "../../schemas/authSchemas";

// Estados internos
export interface FollowState {
  [profileId: number]: {
    data: SafeProfile[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    total: number;
  };
}

export interface OperationState {
  [profileId: number]: boolean;
}

// Context Data
export interface FollowContextData {
  // Estados de dados
  followers: FollowState;
  following: FollowState;

  // Estados de operações específicas
  followLoading: OperationState;
  unfollowLoading: OperationState;

  // Métodos principais
  followProfile: (targetProfileId: number) => Promise<void>;
  unfollowProfile: (targetProfileId: number) => Promise<void>;
  loadFollowers: (
    profileId?: number,
    page?: number,
    limit?: number
  ) => Promise<void>;
  loadFollowing: (
    profileId?: number,
    page?: number,
    limit?: number
  ) => Promise<void>;

  // Métodos de utilidade
  isFollowing: (targetProfileId: number) => boolean;
  isLoadingFollow: (targetProfileId: number) => boolean;
  isLoadingUnfollow: (targetProfileId: number) => boolean;
  getFollowersFor: (profileId: number) => SafeProfile[];
  getFollowingFor: (profileId: number) => SafeProfile[];
  isLoadingFollowersFor: (profileId: number) => boolean;
  isLoadingFollowingFor: (profileId: number) => boolean;
}

// Provider Props
export interface FollowProviderProps {
  children: ReactNode;
}
