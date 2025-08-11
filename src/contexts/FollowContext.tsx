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
  followersTotal: 0,
  followingTotal: 0,
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
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingTotal, setFollowingTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Função para buscar seguidores
  const loadFollowers = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowers(targetId, page);

      if (append && page > 1) {
        // Adiciona os novos aos existentes
        setFollowers((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        // Substitui (primeira carga ou reset)
        setFollowers(data.profiles || []);
      }
      setFollowersTotal(data.pagination.total);
    } catch (error) {
      toast.error("Erro ao carregar seguidores");
      console.error("Erro ao buscar seguidores:", error);
      if (!append) setFollowers([]); // Reset apenas se não for append
      setFollowersTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar seguindo
  const loadFollowing = async (
    profileId?: number,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const data = await fetchFollowing(targetId, page);

      if (append && page > 1) {
        // Adiciona os novos aos existentes
        setFollowing((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        // Substitui (primeira carga ou reset)
        setFollowing(data.profiles || []);
      }
      setFollowingTotal(data.pagination.total);
    } catch (error) {
      toast.error("Erro ao carregar seguindo");
      console.error("Erro ao buscar seguindo:", error);
      if (!append) setFollowing([]); // Reset apenas se não for append
      setFollowingTotal(0); // Reset se erro
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
        followersTotal,
        followingTotal,
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
