import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import type {
  FollowContextData,
  FollowProviderProps,
} from "../types/follow.types";
import type { SafeProfile } from "../schemas/authSchemas";

import {
  fetchFollowers,
  fetchFollowing,
  followProfile as followService,
  unfollowProfile as unfollowService,
} from "../services/follow.service";
import { requireProfile } from "../helpers/requireProfile";

export const FollowContext = createContext<FollowContextData>({
  followers: [],
  following: [],
  loading: false,
  followProfile: async () => {},
  unfollowProfile: async () => {},
  loadFollowers: async () => {},
  loadFollowing: async () => {},
  isFollowing: () => false,
});

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { profile, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState<SafeProfile[]>([]);
  const [following, setFollowing] = useState<SafeProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar seguidores
  const loadFollowers = async (profileId?: number, page: number = 1) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowers(targetId, page);
      setFollowers(data.profiles || []); // Garantia de array
    } catch (error) {
      toast.error("Erro ao carregar seguidores");
      console.error("Erro ao buscar seguidores:", error);
      setFollowers([]); // Reset em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar seguindo
  const loadFollowing = async (profileId?: number, page: number = 1) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowing(targetId, page);
      setFollowing(data.profiles || []); // Garantia de array
    } catch (error) {
      toast.error("Erro ao carregar seguindo");
      console.error("Erro ao buscar seguindo:", error);
      setFollowing([]); // Reset em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para seguir perfil
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
      await followService(targetProfileId);
      toast.success("Perfil seguido com sucesso!");

      // Recarrega a lista de seguindo
      await loadFollowing(profile.id);
    } catch (error) {
      toast.error("Erro ao seguir perfil");
      console.error("Erro ao seguir:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para deixar de seguir
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
      await unfollowService(targetProfileId);
      toast.success("Perfil deixado de seguir com sucesso!");

      await loadFollowing(profile.id);
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
    if (isAuthenticated && profile) {
      loadFollowing(profile.id);
      loadFollowers(profile.id);
    }
  }, [isAuthenticated, profile?.id]);

  return (
    <FollowContext.Provider
      value={{
        followers,
        following,
        loading,
        followProfile,
        unfollowProfile,
        loadFollowers,
        loadFollowing,
        isFollowing,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
