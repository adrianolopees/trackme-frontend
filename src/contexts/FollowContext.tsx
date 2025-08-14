import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/follow.types";
import type { PublicProfile } from "../schemas/profileSchemas";

import { followService } from "../services/follow.service";
import { requireProfile } from "../helpers/requireProfile";

export const FollowContext = createContext<FollowContextData>(
  {} as FollowContextData
);

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { profile, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState<PublicProfile[]>([]);
  const [following, setFollowing] = useState<PublicProfile[]>([]);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingTotal, setFollowingTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadFollowers = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!requireProfile(profile)) return;
    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await followService.fetchFollowers(targetId, page);

      if (append && page > 1) {
        setFollowers((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowers(data.profiles || []);
      }
      setFollowersTotal(data.pagination.total);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
      if (!append) setFollowers([]);
      setFollowersTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowing = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!requireProfile(profile)) return;
    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await followService.fetchFollowing(targetId, page);

      if (append && page > 1) {
        setFollowing((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowing(data.profiles || []);
      }
      setFollowingTotal(data.pagination.total);
    } catch (error) {
      console.error("Erro ao buscar seguindo:", error);
      if (!append) setFollowing([]);
      setFollowingTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowersCount = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const count = await followService.fetchFollowersCount(targetId);
      setFollowersTotal(count);
    } catch (error) {
      console.error("Erro ao carregar quantidade de seguidores!", error);
      setFollowersTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowingCount = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const count = await followService.fetchFollowingCount(targetId);
      setFollowingTotal(count);
    } catch (error) {
      console.error("Erro ao buscar total de seguindo:", error);
      setFollowingTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const followProfile = async (targetProfileId: number) => {
    if (
      !requireProfile(profile, () =>
        toast.error("Você precisa estar logado para seguir")
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await followService.followProfile(targetProfileId);
      setFollowing((prev) => [
        ...prev,
        { id: targetProfileId } as PublicProfile,
      ]);
    } catch (error) {
      toast.error("Erro ao seguir perfil");
      console.error("Erro ao seguir:", error);
    } finally {
      setLoading(false);
    }
  };

  const unfollowProfile = async (targetProfileId: number) => {
    if (
      !requireProfile(profile, () =>
        toast.error("Você precisa estar logado para deixar de seguir alguém")
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await followService.unfollowProfile(targetProfileId);
      setFollowing((prev) => prev.filter((p) => p.id !== targetProfileId));
    } catch (error) {
      toast.error("Erro ao deixar de seguir");
      console.error("Erro ao deixar de seguir:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função utilitária para verificar se está seguindo
  const isFollowing = (targetProfileId: number): boolean => {
    if (!Array.isArray(following)) return false;
    return following.some((p) => p.id === targetProfileId);
  };

  // Carrega dados iniciais apenas se estiver autenticado
  useEffect(() => {
    if (profile) {
      loadFollowersCount(profile.id);
      loadFollowingCount(profile.id);
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
        loading,
        followProfile,
        unfollowProfile,
        loadFollowers,
        loadFollowing,
        isFollowing,
        loadFollowersCount, // Novo
        loadFollowingCount, // Novo
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
