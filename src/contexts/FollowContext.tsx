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
  fetchFollowersCount,
  fetchFollowingCount,
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
  loadFollowersCount: async () => {}, // Novo
  loadFollowingCount: async () => {}, // Novo
});

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const { profile } = useAuth();
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
        setFollowers((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowers(data.profiles || []);
      }
      setFollowersTotal(data.pagination.total);
    } catch (error) {
      toast.error("Erro ao carregar seguidores");
      console.error("Erro ao buscar seguidores:", error);
      if (!append) setFollowers([]);
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
        setFollowing((prev) => [...prev, ...(data.profiles || [])]);
      } else {
        setFollowing(data.profiles || []);
      }
      setFollowingTotal(data.pagination.total);
    } catch (error) {
      toast.error("Erro ao carregar seguindo");
      console.error("Erro ao buscar seguindo:", error);
      if (!append) setFollowing([]);
      setFollowingTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Nova: Carrega só o total de followers
  const loadFollowersCount = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const count = await fetchFollowersCount(targetId);
      setFollowersTotal(count);
    } catch (error) {
      toast.error("Erro ao carregar total de seguidores");
      console.error("Erro ao buscar total de seguidores:", error);
      setFollowersTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Nova: Carrega só o total de following
  const loadFollowingCount = async (profileId?: number) => {
    if (!requireProfile(profile)) return;

    const targetId = profileId || profile.id;
    setLoading(true);
    try {
      const count = await fetchFollowingCount(targetId);
      setFollowingTotal(count);
    } catch (error) {
      toast.error("Erro ao carregar total de seguindo");
      console.error("Erro ao buscar total de seguindo:", error);
      setFollowingTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Função para seguir perfil (já atualizada, OK)
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

      // Otimização opcional: Update local instantâneo
      setFollowingTotal((prev) => prev + 1); // Seu following +1

      // Recarrega lista e counts async
      loadFollowing(profile.id); // Lista
      loadFollowingCount(profile.id); // Seu count
      loadFollowersCount(targetProfileId); // Count do target (se exibindo perfil do target)
    } catch (error) {
      toast.error("Erro ao seguir perfil");
      console.error("Erro ao seguir:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para deixar de seguir (atualizada para counts)
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

      // Otimização opcional: Update local instantâneo
      setFollowingTotal((prev) => Math.max(0, prev - 1)); // Seu following -1

      // Recarrega lista e counts async
      loadFollowing(profile.id); // Lista
      loadFollowingCount(profile.id); // Seu count
      loadFollowersCount(targetProfileId); // Count do target (se necessário)
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
      // Opcional: Adicione se quiser listas iniciais (ex: para isFollowing funcionar logo)
      // loadFollowers(profile.id);
      // loadFollowing(profile.id);
    }
  }, [profile?.id]);

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
