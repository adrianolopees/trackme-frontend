import React, { createContext, useState, useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import { useAuth } from "../hooks/useAuth";

import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/followTypes";
import type { PublicProfile } from "../schemas/profileSchemas";

import { followService } from "../services/followService";

export const FollowContext = createContext<FollowContextData>(
  {} as FollowContextData
);

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { showError } = useNotification();
  const { profile, isAuthenticated } = useAuth();

  const [followers, setFollowers] = useState<PublicProfile[]>([]);
  const [following, setFollowing] = useState<PublicProfile[]>([]);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingTotal, setFollowingTotal] = useState(0);

  const [countsLoading, setCountsLoading] = useState(false);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);
  const [isUnfollowingLoading, setIsUnfollowingLoading] = useState(false);
  const [isFollowersListLoading, setIsFollowersListLoading] = useState(false);
  const [isFollowingListLoading, setIsFollowingListLoading] = useState(false);

  const followProfile = async (targetProfileId: number) => {
    if (!profile) {
      showError("Você precisa estar logado para continuar!");
      return;
    }

    setIsFollowingLoading(true);
    try {
      await followService.followProfile(targetProfileId);
      // Atualiza estado apenas após sucesso da API
      setFollowing((prev) => [
        ...prev,
        { id: targetProfileId } as PublicProfile,
      ]);
      setFollowingTotal((prev) => prev + 1);
    } catch (error: unknown) {
      console.error("Erro ao seguir perfil:", error);
      showError(error instanceof Error ? error.message : "Erro inesperado!");
    } finally {
      setIsFollowingLoading(false);
    }
  };

  const unfollowProfile = async (targetProfileId: number) => {
    if (!profile) {
      showError("Você precisa estar logado para continuar!");
      return;
    }
    setIsUnfollowingLoading(true);
    try {
      await followService.unfollowProfile(targetProfileId);
      setFollowing((prev) => prev.filter((p) => p.id !== targetProfileId));
      setFollowingTotal((prev) => prev - 1);
    } catch (error: unknown) {
      console.error("Erro ao deixar de seguir perfil:", error);
      showError(error instanceof Error ? error.message : "Erro inesperado!");
    } finally {
      setIsUnfollowingLoading(false);
    }
  };

  const loadFollowers = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!profile) return;

    const targetId = profileId || profile.id;
    setIsFollowersListLoading(true);
    try {
      const data = await followService.fetchFollowers(targetId, page);

      if (append && page > 1) {
        setFollowers((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowers(data.profiles || []);
      }
      setFollowersTotal(data.pagination.total);
    } catch (error: unknown) {
      showError(error instanceof Error ? error.message : "Erro inesperado!");
      if (!append) setFollowers([]);
      setFollowersTotal(0);
    } finally {
      setIsFollowersListLoading(false);
    }
  };

  const loadFollowing = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!profile) return;

    const targetId = profileId || profile.id;
    setIsFollowingListLoading(true);
    try {
      const data = await followService.fetchFollowing(targetId, page);

      if (append && page > 1) {
        setFollowing((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowing(data.profiles || []);
      }
      setFollowingTotal(data.pagination.total);
    } catch (error: unknown) {
      showError(error instanceof Error ? error.message : "Erro inesperado!");
      if (!append) setFollowing([]);
      setFollowingTotal(0);
    } finally {
      setIsFollowingListLoading(false);
    }
  };

  const loadCounts = async (profileId?: number) => {
    if (!profile) return;

    const targetId = profileId || profile.id;
    setCountsLoading(true);
    try {
      const [followersCount, followingCount] = await Promise.all([
        followService.fetchFollowersCount(targetId),
        followService.fetchFollowingCount(targetId),
      ]);
      setFollowersTotal(followersCount);
      setFollowingTotal(followingCount);
    } catch (error: unknown) {
      console.error("Erro ao carregar contadores:", error);
      showError(error instanceof Error ? error.message : "Erro inesperado!");
      setFollowersTotal(0);
      setFollowingTotal(0);
    } finally {
      setCountsLoading(false);
    }
  };

  const isFollowing = (targetProfileId: number): boolean => {
    if (!Array.isArray(following)) return false;
    return following.some((p) => p.id === targetProfileId);
  };

  useEffect(() => {
    if (profile) {
      loadCounts(profile.id);
      loadFollowers(profile.id);
      loadFollowing(profile.id);
    }
  }, [isAuthenticated, profile?.id]);

  return (
    <FollowContext.Provider
      value={{
        followers,
        following,
        followersTotal,
        followingTotal,
        countsLoading,
        isFollowingLoading,
        isUnfollowingLoading,
        isFollowersListLoading,
        isFollowingListLoading,
        followProfile,
        unfollowProfile,
        loadFollowers,
        loadFollowing,
        isFollowing,
        loadCounts,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
